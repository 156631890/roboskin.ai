import { createHash, randomUUID } from 'node:crypto';
import { isDeliveryReceipt } from './form-delivery.mjs';

const json = (status, body) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '600' } : {}) } });
const fail = (status, error) => json(status, { ok: false, error });
const emailPattern = /^[a-zA-Z0-9.'_%+\-!]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
export const validEmail = (email) => typeof email === 'string' && email.length <= 254 && emailPattern.test(email.trim()) && !email.includes('..');
const text = (v, max) => typeof v === 'string' && v.trim().length > 0 && v.length <= max;
const secureUrl = (v) => { try { const u = new URL(v); return u.protocol === 'https:' && !u.username && !u.password; } catch { return false; } };

/** Bounded per-process burst control; Turnstile also rejects reused tokens. */
export function createBurstLimiter(now = Date.now) {
  const buckets = new Map();
  return (key) => {
    const time = now();
    for (const [id, value] of buckets) if (value.until <= time) buckets.delete(id);
    if (!buckets.has(key)) {
      if (buckets.size >= 5000) return false;
      buckets.set(key, { until: time + 600000, count: 0 });
    }
    const bucket = buckets.get(key);
    bucket.count += 1;
    return bucket.count <= 5;
  };
}

/** Tests inject all transports. No test mode or bypass exists in production routes. */
export function createFormHandlers({ env = process.env, fetcher = fetch, limit = createBurstLimiter() } = {}) {
  async function prepare(request, kind) {
    const origin = env.SITE_ORIGIN || 'https://roboskin.ai';
    if (request.headers.get('origin') !== origin) return { error: fail(403, 'Submit this form from the website.') };
    if (!request.headers.get('content-type')?.startsWith('application/json')) return { error: fail(415, 'JSON required.') };
    if (Number(request.headers.get('content-length')) > 16384) return { error: fail(413, 'Request is too large.') };
    const reader = request.body?.getReader();
    let bytes = 0;
    const chunks = [];
    if (!reader) return { error: fail(400, 'Missing request.') };
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16384) { await reader.cancel(); return { error: fail(413, 'Request is too large.') }; }
      chunks.push(value);
    }
    let payload;
    try { payload = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return { error: fail(400, 'Invalid JSON.') }; }
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return { error: fail(400, 'Invalid request.') };
    if (payload.website) return { error: fail(400, 'Request rejected. Leave the website field empty.') };
    if (!validEmail(payload.email) || payload.consent !== true) return { error: fail(400, 'A valid email and consent are required.') };
    payload.email = payload.email.trim().toLowerCase();
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!limit(createHash('sha256').update(`${kind}:${ip}`).digest('hex'))) return { error: fail(429, 'Too many requests. Try again in ten minutes.') };
    if (!env.TURNSTILE_SECRET_KEY || !env.TURNSTILE_HOSTNAME) return { error: fail(503, 'Online submission is not configured. No request was sent.') };
    if (!text(payload.challengeToken, 2048)) return { error: fail(400, 'Complete the anti-spam check and retry.') };
    const check = await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: payload.challengeToken }), signal: AbortSignal.timeout(8000),
    });
    const challenge = await check.json();
    if (!check.ok || challenge.success !== true || challenge.hostname !== env.TURNSTILE_HOSTNAME || challenge.action !== kind) return { error: fail(400, 'The anti-spam check expired or failed. Please retry.') };
    return { payload, origin };
  }

  async function contact(request) {
    if (!secureUrl(env.CONTACT_WEBHOOK_URL)) return fail(503, 'Online submission is unavailable. No request was sent.');
    try {
      const ready = await prepare(request, 'contact');
      if (ready.error) return ready.error;
      const { payload } = ready;
      const commercial = payload.requestType === 'commercial-research';
      if (!['research', 'correction', 'partnership', 'other', 'commercial-research'].includes(payload.requestType)
        || !text(payload.fullName, 160) || (payload.company && !text(payload.company, 240))
        || !text(commercial ? payload.researchQuestion : payload.message, 6000)) return fail(400, 'Check the name, request type and message.');
      const receiptId = randomUUID();
      const fields = ['fullName', 'company', 'email', 'phone', 'requestType', 'requestedAsset', 'intendedUse', 'budgetSignal', 'message', 'role', 'projectType', 'robotPlatform', 'researchQuestion', 'timeline', 'budget', 'ndaRequired', 'consent'];
      const delivery = { receiptId };
      for (const field of fields) {
        const value = payload[field];
        if (value === undefined) continue;
        if (typeof value !== 'string' && typeof value !== 'boolean') return fail(400, 'Invalid field type.');
        if (typeof value === 'string' && value.length > (['message', 'researchQuestion'].includes(field) ? 6000 : 500)) return fail(400, 'A field is too long.');
        delivery[field] = typeof value === 'string' ? value.trim() : value;
      }
      const response = await fetcher(env.CONTACT_WEBHOOK_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...(env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${env.CONTACT_WEBHOOK_TOKEN}` } : {}) },
        body: JSON.stringify(delivery), signal: AbortSignal.timeout(10000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !isDeliveryReceipt(result)) return fail(502, 'Delivery could not be confirmed. Retry or send an email.');
      return json(200, { ok: true, status: 'accepted', receiptId });
    } catch { return fail(502, 'Delivery could not be confirmed. Your request may need to be retried.'); }
  }

  async function newsletter(request) {
    if (env.NEWSLETTER_ENABLED !== 'true' || !env.BUTTONDOWN_API_KEY) return fail(503, 'Newsletter is not open yet. No address was submitted.');
    try {
      const ready = await prepare(request, 'newsletter');
      if (ready.error) return ready.error;
      const { payload, origin } = ready;
      const path = typeof payload.path === 'string' && /^\/(?!\/)[a-zA-Z0-9/_-]*$/.test(payload.path) ? payload.path : '/';
      const response = await fetcher('https://api.buttondown.com/v1/subscribers', {
        method: 'POST', headers: { Authorization: `Token ${env.BUTTONDOWN_API_KEY}`, 'Content-Type': 'application/json', 'X-Buttondown-Collision-Behavior': 'no_op' },
        body: JSON.stringify({ email_address: payload.email, type: 'unactivated', referrer_url: `${origin}${path}` }), signal: AbortSignal.timeout(10000),
      });
      const result = await response.json().catch(() => null);
      if (response.status === 201 && result?.id && result.type === 'unactivated') return json(202, { ok: true, status: 'pending', message: 'Check your inbox for the confirmation email. You are not subscribed until you confirm. Every brief includes an unsubscribe link.' });
      if ((response.status === 400 && result?.code === 'email_already_exists') || response.status === 409) return json(200, { ok: true, status: 'unchanged', message: 'No subscription was changed. If you signed up before, check your original confirmation email or manage preferences from a previous brief. Contact us if you need help.' });
      if (response.status === 429) return fail(429, 'The provider is busy. Try again later.');
      return fail(502, 'Signup could not be confirmed. Try again later or use RSS.');
    } catch { return fail(502, 'Signup could not be confirmed. Try again later or use RSS.'); }
  }
  return { contact, newsletter };
}
