import test from 'node:test';
import assert from 'node:assert/strict';
import { createFormHandlers, validEmail, createBurstLimiter } from '../src/lib/form-handlers.mjs';
import { deliverInquiry } from '../src/lib/form-delivery.mjs';

const env = { SITE_ORIGIN: 'https://roboskin.ai', CONTACT_WEBHOOK_URL: 'https://test.example/receipt', TURNSTILE_SECRET_KEY: 'TEST_ONLY', TURNSTILE_HOSTNAME: 'roboskin.ai', NEWSLETTER_ENABLED: 'true', BUTTONDOWN_API_KEY: 'TEST_ONLY' };
const payload = { fullName: 'Synthetic test', company: '', email: 'synthetic@example.com', consent: true, requestType: 'commercial-research', researchQuestion: 'Synthetic research request; never delivered externally.', timeline: 'Exploring only', budget: 'Scope before budget', ndaRequired: true, challengeToken: 'TEST_ONLY' };
const request = (body = payload, origin = env.SITE_ORIGIN) => new Request(`${env.SITE_ORIGIN}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json', origin }, body: JSON.stringify(body) });
const make = (options = {}) => {
  const calls = [];
  const handler = createFormHandlers({ env: options.env || env, fetcher: async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body), headers: init.headers });
    if (url.includes('turnstile')) return Response.json(options.challenge || { success: true, hostname: 'roboskin.ai', action: options.kind || 'contact' });
    if (options.networkError) throw new Error('Synthetic network failure');
    return Response.json(options.response || { ok: true, status: 'accepted', receiptId: 'TEST_RECEIPT' }, { status: options.status || 200 });
  }});
  return { ...handler, calls };
};

test('missing configuration never returns success or calls a network', async () => {
  const h = make({ env: {} });
  assert.equal((await h.contact(request())).status, 503);
  assert.equal((await h.newsletter(request())).status, 503);
  assert.equal(h.calls.length, 0);
});
test('email validation accepts a plus tag and rejects invalid types or line breaks', () => {
  assert.equal(validEmail('research+brief@example.com'), true);
  for (const value of [null, [], 'wrong', 'one@@example.com', 'two\n@example.com', 'a..b@example.com']) assert.equal(validEmail(value), false);
});
test('consent, honeypot and origin failures never become a receipt', async () => {
  for (const body of [{ ...payload, consent: false }, { ...payload, website: 'spam' }, { ...payload, email: 'bad' }]) {
    const h = make(); assert.equal((await h.contact(request(body))).status, 400); assert.equal(h.calls.length, 0);
  }
  assert.equal((await make().contact(request(payload, 'https://outside.example'))).status, 403);
});
test('oversized body is bounded even without Content-Length', async () => {
  const h = make(); assert.equal((await h.contact(request({ ...payload, message: 'x'.repeat(17000) }))).status, 413); assert.equal(h.calls.length, 0);
});
test('a commercial inquiry retains decision scope and accepts a real delivery acknowledgement', async () => {
  const h = make(); const result = await h.contact(request()); const body = await result.json();
  assert.equal(result.status, 200); assert.equal(body.status, 'accepted'); assert.ok(body.receiptId);
  assert.equal(h.calls.length, 2); assert.equal(h.calls[1].body.researchQuestion, payload.researchQuestion);
  assert.equal(h.calls[1].body.ndaRequired, true); assert.equal(h.calls[1].body.challengeToken, undefined);
});
test('wrong anti-spam hostname or action fails closed', async () => {
  for (const challenge of [{ success: false }, { success: true, hostname: 'other.example', action: 'contact' }, { success: true, hostname: 'roboskin.ai', action: 'newsletter' }]) {
    const h = make({ challenge }); assert.equal((await h.contact(request())).status, 400); assert.equal(h.calls.length, 1);
  }
});
test('HTTP 200 without a delivery receipt and network errors do not confirm delivery', async () => {
  for (const options of [{ response: { ok: true } }, { response: { success: 'false' } }, { networkError: true }]) assert.equal((await make(options).contact(request())).status, 502);
});
test('existing FormSubmit AJAX acknowledgement is supported', async () => {
  assert.equal((await make({ response: { success: 'true' } }).contact(request())).status, 200);
});
test('newsletter requests double opt-in and reports pending, never subscribed', async () => {
  const h = make({ kind: 'newsletter', status: 201, response: { id: 'TEST_SUBSCRIBER', type: 'unactivated' } });
  const response = await h.newsletter(request()); const body = await response.json();
  assert.equal(response.status, 202); assert.equal(body.status, 'pending');
  assert.equal(h.calls[1].body.type, 'unactivated'); assert.equal(h.calls[1].headers['X-Buttondown-Collision-Behavior'], 'no_op');
  assert.ok(body.message.includes('unsubscribe'));
});
test('a duplicate preserves existing/unsubscribed state and makes no reminder call', async () => {
  const h = make({ kind: 'newsletter', status: 400, response: { code: 'email_already_exists' } });
  const response = await h.newsletter(request()); assert.equal((await response.json()).status, 'unchanged'); assert.equal(h.calls.length, 2);
});
test('provider refusal does not claim signup succeeded', async () => {
  for (const options of [{ status: 403 }, { status: 201, response: { id: 'TEST', type: 'regular' } }, { status: 400, response: { code: 'newsletter_not_accepting_subscribers' } }]) {
    assert.equal((await make({ kind: 'newsletter', ...options }).newsletter(request())).status, 502);
  }
});
test('burst control expires and browser delivery checks structured receipts', async () => {
  let now = 0; const limit = createBurstLimiter(() => now);
  for (let i = 0; i < 5; i++) assert.equal(limit('test'), true);
  assert.equal(limit('test'), false); now = 600001; assert.equal(limit('test'), true);
  await assert.rejects(deliverInquiry('/api/contact', payload, async () => Response.json({ ok: true })));
  assert.ok(await deliverInquiry('/api/contact', payload, async () => Response.json({ success: 'true' })));
});
