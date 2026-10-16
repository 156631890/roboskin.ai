import { membershipConfig, PORTAL_URL, BILLING_PERIODS } from './config.mjs';
import { database } from './database.mjs';
import { createWaffo } from './waffo.mjs';
import { createMailer } from './mail.mjs';
import { createMembershipService, MembershipError, cookieName, sameSecret } from './service.mjs';
import { dispatchReports } from './reports.mjs';

const headers = { 'Cache-Control': 'private, no-store, max-age=0', 'X-Robots-Tag': 'noindex, nofollow', 'Vary': 'Cookie', 'Referrer-Policy': 'no-referrer' };
const json = (data, status = 200, extra = {}) => Response.json(data, { status, headers: { ...headers, ...extra } });
async function rawBody(request, max) {
  const reader = request.body?.getReader();
  if (!reader) throw new MembershipError(400, 'Missing request body.');
  let bytes = 0;
  const chunks = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > max) { await reader.cancel(); throw new MembershipError(413, 'Request too large.'); }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}
function tokenFor(request) {
  return request.headers.get('cookie')?.split(';').map(part => part.trim()).find(part => part.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
}

// Dependency injection is confined to tests. Public handlers do not expose a test-auth or mock-payment switch.
export function createMembershipHandlers(options = {}) {
  const config = options.config || membershipConfig();
  let dependencies;
  function deps() {
    if (!config.ready) throw new MembershipError(503, 'Paid reports are not open yet. No payment was taken.');
    if (!dependencies) {
      const db = options.db || database(config.databaseUrl), waffo = options.waffo || createWaffo(config), mail = options.mail || createMailer(config);
      const service = createMembershipService({ db, waffo, mail, config, ...(options.now ? { now: options.now } : {}) });
      dependencies = { db, waffo, mail, service, config, ...(options.now ? { now: options.now } : {}) };
    }
    return dependencies;
  }
  const safe = handler => async request => {
    try { return await handler(request); }
    catch (error) {
      if (!(error instanceof MembershipError)) console.error('Paid reports request failed; inspect provider and database health.');
      return json({ error: error instanceof MembershipError ? error.message : 'The request could not be completed. Please retry shortly.' }, error instanceof MembershipError ? error.status : 503);
    }
  };
  return {
    membership: safe(async request => {
      if (request.headers.get('origin') !== config.origin) throw new MembershipError(403, 'Use the RoboSkin website to continue.');
      if (!request.headers.get('content-type')?.startsWith('application/json')) throw new MembershipError(415, 'JSON required.');
      let body;
      try { body = JSON.parse(await rawBody(request, 8192)); } catch (error) {
        if (error instanceof MembershipError) throw error;
        throw new MembershipError(400, 'Invalid request.');
      }
      if (!body || typeof body !== 'object' || Array.isArray(body)) throw new MembershipError(400, 'Invalid request.');
      const { service } = deps();
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
      if (body.action === 'login') return json(await service.login(body.email, ip));
      if (body.action === 'confirm') {
        const token = await service.confirm(body.challenge, body.code, ip);
        return json({ signedIn: true }, 200, { 'Set-Cookie': `${cookieName}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000` });
      }
      const token = tokenFor(request);
      if (body.action === 'logout') {
        await service.logout(token);
        return json({ signedIn: false }, 200, { 'Set-Cookie': `${cookieName}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0` });
      }
      const user = await service.member(token);
      await service.limit(`member:${user.id}`, 60, 600);
      if (body.action === 'account') return json({ email: user.email, emailDelivery: user.email_delivery,
        interval: config.interval, unit: BILLING_PERIODS[config.interval], mode: config.mode,
        checkoutEnabled: config.checkoutEnabled, portal: PORTAL_URL, ...await service.account(user.id) });
      if (body.action === 'checkout') return json(await service.checkout(user, body.consent));
      if (body.action === 'report') return json(await service.report(user.id, body.id));
      if (body.action === 'preferences') { await service.preferences(user.id, body.emailDelivery); return json({ saved: true }); }
      throw new MembershipError(400, 'Unknown action.');
    }),
    webhook: safe(async request => {
      const { service, waffo } = deps();
      const raw = await rawBody(request, 65536);
      let event;
      try { event = waffo.verify(raw, request.headers.get('x-waffo-signature')); }
      catch { throw new MembershipError(400, 'Invalid webhook signature.'); }
      return json(await service.webhook(event));
    }),
    dispatch: safe(async request => {
      if (!config.cronSecret || !sameSecret(request.headers.get('authorization'), `Bearer ${config.cronSecret}`)) throw new MembershipError(401, 'Unauthorized.');
      const result = await dispatchReports(deps());
      return json(result, result.failed || result.held || result.staleReport ? 503 : 200);
    }),
  };
}
