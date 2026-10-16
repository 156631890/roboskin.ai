import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID, generateKeyPairSync, sign } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';
import { verifyWebhook } from '@waffo/pancake-ts';
import { membershipConfig } from '../src/lib/membership/config.mjs';
import { createWaffo, entitlement, moneyCents } from '../src/lib/membership/waffo.mjs';
import { createMembershipService, cookieName } from '../src/lib/membership/service.mjs';
import { createMembershipHandlers } from '../src/lib/membership/handlers.mjs';
import { publishReport, validateReport, dispatchReports } from '../src/lib/membership/reports.mjs';
import { createMailer } from '../src/lib/membership/mail.mjs';

const migration = await readFile(new URL('../db/migrations/001-paid-reports.sql', import.meta.url), 'utf8');
const fixedNow = new Date('2026-10-16T02:00:00Z');
const config = { ready: true, enabled: true, checkoutEnabled: true, interval: 'weekly', mode: 'test',
  origin: 'https://roboskin.ai', storeId: 'STO_test', productId: 'PROD_test', authSecret: 'test-auth-secret-with-at-least-32-chars',
  cronSecret: 'test-cron-secret-with-at-least-32-chars' };
function issue() {
  return { weekStart: '2026-10-12', title: 'Fixture only: weekly report', summary: 'A test report, never published to production.',
    sourceCutoff: '2026-10-15T00:00:00Z', reviewedBy: 'Test fixture', reviewedAt: '2026-10-15T01:00:00Z', publishedAt: '2026-10-15T02:00:00Z', approved: true,
    content: { introduction: 'PRIVATE_REPORT_SENTINEL', sections: [{ heading: 'Research', analysis: 'Sourced fixture analysis', implications: 'Fixture implication', limitations: 'Fixture only', sourceIds: ['S1','S2'] }],
      sources: [{ id: 'S1', title: 'Fixture source', url: 'https://example.org/a', checkedAt: '2026-10-15T00:00:00Z' },
        { id: 'S2', title: 'Fixture source 2', url: 'https://example.org/b', checkedAt: '2026-10-15T00:00:00Z' }] } };
}
async function fixture(t) {
  const pg = new PGlite();
  await pg.exec(migration);
  const db = { query: (q, p) => pg.query(q, p), connect: async () => ({ query: (q,p) => pg.query(q,p), release() {} }) };
  t.after(() => pg.close());
  const emails = [], orders = new Map();
  let checkoutCalls = 0, clock = new Date(fixedNow);
  const mail = async message => { emails.push(message); return `email-${emails.length}`; };
  const waffo = { verify: JSON.parse, validateProduct: async () => {},
    checkout: async id => { checkoutCalls++; return { url: `https://pancake.waffo.ai/store/test/checkout/${id}`, expiresAt: new Date(+clock + 900000).toISOString() }; },
    order: async id => orders.get(id) || null };
  const dependencies = { db, waffo, mail, config: { ...config }, now: () => new Date(clock) };
  const service = createMembershipService(dependencies);
  const handlers = createMembershipHandlers(dependencies);
  async function login(email = 'member@example.org') {
    const result = await service.login(email, '127.0.0.1');
    const code = emails.at(-1).text.match(/code is (\d{8})/)[1];
    const token = await service.confirm(result.challenge, code, '127.0.0.1');
    return { token, user: await service.member(token) };
  }
  async function buy() {
    const auth = await login();
    const reportId = await publishReport(db, issue(), clock);
    await service.checkout(auth.user, 'weekly:9.90:USD:v1');
    const checkout = (await db.query('SELECT * FROM report_checkouts')).rows[0];
    const order = { id: 'ORD_test', orderMerchantExternalId: checkout.id, status: 'active', billingPeriod: 'weekly',
      subscriptionProduct: { id: 'PROD_test' }, priceSnapshot: { currency: 'USD', regularPhase: { subtotal: '9.90' } },
      currentPeriodStart: '2026-10-15T00:00:00Z', currentPeriodEnd: '2026-10-22T00:00:00Z', currentPeriodNumber: 1,
      payments: [{ id: 'PAY_1', status: 'succeeded', periodNumber: 1 }] };
    orders.set(checkout.id, order);
    const event = { mode: 'test', storeId: 'STO_test', eventType: 'subscription.activated', eventId: 'ORD_test',
      data: { orderId: order.id, orderMerchantExternalId: checkout.id } };
    await service.webhook(event);
    return { ...auth, reportId, checkout, order, event };
  }
  return { ...dependencies, service, handlers, emails, orders, login, buy, setNow: value => { clock = new Date(value); }, checkoutCalls: () => checkoutCalls };
}
function request(body, token, extra = {}) {
  return new Request('https://roboskin.ai/api/membership', { method: 'POST',
    headers: { origin: config.origin, 'content-type': 'application/json', ...(token ? { cookie: `${cookieName}=${token}` } : {}), ...extra }, body: JSON.stringify(body) });
}

test('membership is disabled by default and never invents a billing interval', () => {
  assert.equal(membershipConfig({}).ready, false);
  assert.equal(membershipConfig({}).interval, undefined);
  assert.equal(membershipConfig({ REPORTS_ENABLED: 'true', ROBOSKIN_RUNTIME: 'server' }).ready, false);
  assert.equal(moneyCents('9.90'), 990);
  for (const value of [9.9, '9.999', '-9.90', '9e2', 'NaN']) assert.equal(moneyCents(value), null);
});

test('official SDK verifies raw RSA signatures, rejects altered bodies and expired signatures', () => {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048, publicKeyEncoding: { type: 'spki', format: 'pem' }, privateKeyEncoding: { type: 'pkcs8', format: 'pem' } });
  const body = JSON.stringify({ eventType: 'subscription.activated', eventId: 'ORD_test', data: {} });
  const timestamp = Date.now();
  const signature = t => `t=${t},v1=${sign('RSA-SHA256', Buffer.from(`${t}.${body}`), privateKey).toString('base64')}`;
  assert.equal(verifyWebhook(body, signature(timestamp), { publicKey }).eventType, 'subscription.activated');
  assert.throws(() => verifyWebhook(`${body} `, signature(timestamp), { publicKey }));
  assert.throws(() => verifyWebhook(body, signature(timestamp - 46 * 60000), { publicKey }));
  assert.equal(verifyWebhook(body, signature(timestamp - 31 * 60000), { publicKey }).eventId, 'ORD_test');
});

test('official SDK checkout adapter pins product, tax category, amount, interval and idempotency key', async () => {
  const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048, privateKeyEncoding: { type: 'pkcs8', format: 'pem' } });
  const requests = [];
  let price = '9.90';
  const client = createWaffo({ ...config, merchantId: 'MER_3kF9mNpQrStUvWxYz1A2bC', privateKey }, async (url, options) => {
    const body = JSON.parse(options.body); requests.push({ url, options, body });
    if (url.endsWith('/graphql')) return Response.json({ data: { store: { prodEnabled: false, subscriptionProducts: [
      { id: 'PROD_test', billingPeriod: 'weekly', status: 'active', prices: [{ currency: 'USD', priceInfo: { amount: price } }] },
    ] } } });
    return Response.json({ data: { sessionId: 'fixture', checkoutUrl: 'https://pancake.waffo.ai/store/test/checkout/fixture', expiresAt: '2026-10-16T03:00:00Z' } });
  });
  await client.validateProduct();
  const result = await client.checkout('reference', 'member@example.org');
  const sent = requests.at(-1);
  assert.equal(sent.body.productId, 'PROD_test');
  assert.deepEqual(sent.body.priceSnapshot, { amount: '9.90', taxCategory: 'digital_goods', taxIncluded: false });
  assert.equal(sent.body.withTrial, false);
  assert.equal(sent.options.headers['X-Idempotency-Key'], 'roboskin-checkout-reference');
  assert.equal(new URL(result.url).searchParams.get('test'), 'true');
  price = '99.00';
  await assert.rejects(client.validateProduct());
});

test('email ownership requires a single-use code and invalid attempts survive transaction rollback', async t => {
  const f = await fixture(t);
  const challenge = await f.service.login('A@example.org', 'ip');
  const code = f.emails[0].text.match(/code is (\d{8})/)[1];
  for (let i=0; i<5; i++) await assert.rejects(f.service.confirm(challenge.challenge, '00000000', 'ip'), { status: 401 });
  await assert.rejects(f.service.confirm(challenge.challenge, code, 'ip'), { status: 401 });
  const { token } = await f.login('b@example.org');
  assert.equal((await f.service.member(token)).email, 'b@example.org');
  await f.service.logout(token);
  await assert.rejects(f.service.member(token), { status: 401 });
  const c2 = await f.service.login('c@example.org', 'other');
  const c2code = f.emails.at(-1).text.match(/code is (\d{8})/)[1];
  await f.service.confirm(c2.challenge, c2code, 'other');
  await assert.rejects(f.service.confirm(c2.challenge, c2code, 'other'), { status: 401 });
});

test('checkout requires exact recurring consent and a fresh issue, then reuses a durable session', async t => {
  const f = await fixture(t), { user } = await f.login();
  await assert.rejects(f.service.checkout(user, 'monthly:9.90:USD:v1'), { status: 400 });
  await assert.rejects(f.service.checkout(user, 'weekly:9.90:USD:v1'), { status: 503 });
  await publishReport(f.db, issue(), fixedNow);
  const a = await f.service.checkout(user, 'weekly:9.90:USD:v1');
  const b = await f.service.checkout(user, 'weekly:9.90:USD:v1');
  assert.equal(a.url, b.url); assert.equal(f.checkoutCalls(), 1);
  assert.equal(await f.service.access(user.id), null);
});

test('checkout timeout retains the reference for an idempotent retry', async t => {
  const f = await fixture(t), { user } = await f.login();
  await publishReport(f.db, issue(), fixedNow);
  const original = f.waffo.checkout; const references = [];
  f.waffo.checkout = async id => { references.push(id); if (references.length === 1) throw new Error('timeout'); return original(id); };
  await assert.rejects(f.service.checkout(user, 'weekly:9.90:USD:v1'));
  await f.service.checkout(user, 'weekly:9.90:USD:v1');
  assert.equal(references[0], references[1]);
});

test('signed event scope, unknown references and provider identity cannot grant access', async t => {
  const f = await fixture(t), a = await f.buy();
  await assert.rejects(f.service.webhook({ ...a.event, mode: 'prod' }), { status: 400 });
  await assert.rejects(f.service.webhook({ ...a.event, storeId: 'STO_other' }), { status: 400 });
  assert.deepEqual(await f.service.webhook({ ...a.event, data: { orderMerchantExternalId: randomUUID() } }), { ignored: true });
  a.order.subscriptionProduct.id = 'PROD_other';
  await assert.rejects(f.service.webhook({ ...a.event, eventId: 'different' }));
  assert.equal((await f.db.query('SELECT count(*)::int AS n FROM report_webhook_events')).rows[0].n, 1);
});

test('repeated and out-of-order events reconcile current state instead of resurrecting canceled access', async t => {
  const f = await fixture(t), a = await f.buy();
  assert.deepEqual(await f.service.webhook(a.event), { duplicate: true });
  assert.equal((await f.service.account(a.user.id)).subscription.status, 'active');
  a.order.status = 'canceling';
  await f.service.webhook({ ...a.event, eventType: 'subscription.canceling', eventId: 'cancel-1' });
  assert.ok(await f.service.access(a.user.id));
  a.order.status = 'canceled';
  await f.service.webhook({ ...a.event, eventType: 'subscription.canceled' });
  assert.equal(await f.service.access(a.user.id), null);
  await f.service.webhook({ ...a.event, eventType: 'subscription.renewed', eventId: 'old-renewal' });
  assert.equal(await f.service.access(a.user.id), null);
});

test('renewal requires payment for that period; overdue, trial and expired periods stay locked', async t => {
  const f = await fixture(t), a = await f.buy();
  for (const status of ['past_due','trialing','pending','expired','closed']) {
    assert.equal(entitlement({ ...a.order, status }, a.checkout, [], fixedNow), false);
  }
  assert.equal(entitlement({ ...a.order, currentPeriodNumber: 2 }, a.checkout, [], fixedNow), false);
  f.setNow('2026-10-22T00:00:00Z');
  assert.equal(await f.service.access(a.user.id), null);
  await assert.rejects(f.service.report(a.user.id, a.reportId), { status: 403 });
  Object.assign(a.order, { currentPeriodNumber: 2, currentPeriodStart: '2026-10-22T00:00:00Z', currentPeriodEnd: '2026-10-29T00:00:00Z', payments: [...a.order.payments, { id: 'PAY_2', periodNumber: 2, status: 'succeeded' }] });
  await f.service.webhook({ ...a.event, eventType: 'subscription.renewed', eventId: 'period-2' });
  assert.ok(await f.service.access(a.user.id));
});

test('partial refunds accumulate once, full current refund revokes access, previous refunds do not revoke renewal', async t => {
  const f = await fixture(t), a = await f.buy();
  const refund = id => ({ ...a.event, eventType: 'refund.succeeded', eventId: id,
    data: { ...a.event.data, paymentId: 'PAY_1', refundedAmount: '4.95', originalChargedAmount: '9.90' } });
  await f.service.webhook(refund('REF_1'));
  assert.ok(await f.service.access(a.user.id));
  await f.service.webhook(refund('REF_1'));
  assert.ok(await f.service.access(a.user.id));
  await f.service.webhook(refund('REF_2'));
  assert.equal(await f.service.access(a.user.id), null);
  a.order.currentPeriodNumber = 2;
  a.order.payments.push({ id: 'PAY_2', status: 'succeeded', periodNumber: 2 });
  await f.service.webhook({ ...a.event, eventType: 'subscription.renewed', eventId: 'period-2' });
  assert.ok(await f.service.access(a.user.id));
  await f.service.webhook({ ...refund('REF_failed'), eventType: 'refund.failed', data: { ...refund('').data, paymentId: 'PAY_2', refundedAmount: '9.90' } });
  assert.ok(await f.service.access(a.user.id));
});

test('provider failure rolls back webhook receipt so the same event can be retried', async t => {
  const f = await fixture(t), a = await f.buy();
  const original = f.waffo.order;
  f.waffo.order = async () => { throw new Error('unavailable'); };
  const event = { ...a.event, eventType: 'subscription.renewed', eventId: 'retry-me' };
  await assert.rejects(f.service.webhook(event));
  f.waffo.order = original;
  assert.deepEqual(await f.service.webhook(event), { processed: true });
});

test('HTTP boundary enforces origin, session, request size, no-cache and private report access', async t => {
  const f = await fixture(t), a = await f.buy();
  assert.equal((await f.handlers.membership(request({ action: 'report', id: a.reportId }))).status, 401);
  assert.equal((await f.handlers.membership(request({ action: 'report', id: a.reportId }, a.token, { origin: 'https://evil.example' }))).status, 403);
  assert.equal((await f.handlers.membership(request({ action: 'report', id: 'x'.repeat(9000) }, a.token))).status, 413);
  const response = await f.handlers.membership(request({ action: 'report', id: a.reportId }, a.token));
  assert.equal(response.status, 200);
  assert.match(response.headers.get('cache-control'), /private, no-store/);
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
  assert.equal((await response.json()).content.introduction, 'PRIVATE_REPORT_SENTINEL');
  const outsider = await f.login('unpaid@example.org');
  assert.equal((await f.handlers.membership(request({ action: 'report', id: a.reportId }, outsider.token))).status, 403);
  assert.equal((await f.handlers.dispatch(new Request('https://roboskin.ai/api/reports/dispatch', { method: 'POST' }))).status, 401);
  f.waffo.verify = () => { throw new Error('signature'); };
  assert.equal((await f.handlers.webhook(request(a.event))).status, 400);
});

test('private report validation rejects unapproved, future-review, stale and unsafe source content', () => {
  for (const change of [{ approved: false }, { weekStart: '2026-10-13' }, { reviewedAt: '2027-01-01' }, { sourceCutoff: '2026-10-01' }]) {
    assert.throws(() => validateReport({ ...issue(), ...change }, fixedNow));
  }
  const unsafe = issue(); unsafe.content.sources[0].url = 'javascript:alert(1)';
  assert.throws(() => validateReport(unsafe, fixedNow));
});

test('weekly delivery is once per paid member, respects opt-out and never emails private report text', async t => {
  const f = await fixture(t), a = await f.buy();
  await f.login('unpaid@example.org');
  const before = f.emails.length;
  assert.equal((await dispatchReports(f)).sent, 1);
  assert.equal((await dispatchReports(f)).sent, 0);
  assert.equal(f.emails.length, before + 1);
  assert.doesNotMatch(f.emails.at(-1).text, /PRIVATE_REPORT_SENTINEL/);
  assert.match(f.emails.at(-1).text, /Stopping report emails does not cancel billing/);
  await f.db.query('DELETE FROM report_deliveries');
  await f.service.preferences(a.user.id, false);
  assert.equal((await dispatchReports(f)).sent, 0);
  await assert.rejects(publishReport(f.db, issue(), fixedNow));
});

test('ambiguous mail errors retry with same key inside provider window, then hold rather than double-send', async t => {
  const f = await fixture(t); await f.buy();
  const keys = [];
  const failing = { ...f, mail: async message => { keys.push(message.key); throw new Error('timeout after provider accepted'); } };
  assert.equal((await dispatchReports(failing)).failed, 1);
  assert.equal((await dispatchReports(failing)).failed, 0);
  f.setNow('2026-10-16T03:00:00Z');
  assert.equal((await dispatchReports(failing)).failed, 1);
  assert.equal(keys[0], keys[1]);
  f.setNow('2026-10-17T02:00:00Z');
  assert.equal((await dispatchReports(failing)).held, 1);
  assert.equal(keys.length, 2);
});

test('stale reports stop dispatch and expose an operational failure', async t => {
  const f = await fixture(t); await f.buy();
  f.setNow('2026-10-23T02:00:00Z');
  assert.equal((await dispatchReports(f)).staleReport, true);
});

test('mail transport requires a provider receipt and sends a stable idempotency header', async () => {
  let sent;
  const mail = createMailer({ mailKey: 'fixture', mailFrom: 'reports@example.org' }, async (url, options) => { sent = { url, ...options }; return Response.json({ id: 'mail-1' }); });
  assert.equal(await mail({ to: 'member@example.org', subject: 'Report', text: 'Link', key: 'stable-key' }), 'mail-1');
  assert.equal(sent.headers['Idempotency-Key'], 'stable-key');
  await assert.rejects(createMailer({ mailKey: 'fixture' }, async () => Response.json({}))({ key: 'key' }));
});
