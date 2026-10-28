import test from 'node:test';
import assert from 'node:assert/strict';
import { canUseGeoInflow, geoBeforeSend, geoEvent } from '../src/lib/geoinflow.mjs';

test('collection is limited to configured production hosts', () => {
  const id = '46772108-3727-4782-9d30-39811bc79ffe';
  assert.equal(canUseGeoInflow(id, 'roboskin.ai'), true);
  for (const host of ['localhost', 'roboskin-preview.vercel.app', 'roboskin.ai.attacker.example']) assert.equal(canUseGeoInflow(id, host), false);
  assert.equal(canUseGeoInflow(undefined, 'roboskin.ai'), false);
});

test('payload filtering removes sensitive URL data and blocks private pages', () => {
  const payload = { hostname: 'roboskin.ai', url: '/contact?email=test@example.com#secret', referrer: 'https://chatgpt.com/c/private-conversation?token=secret', title: 'Contact', website: 'site-id' };
  assert.deepEqual(geoBeforeSend('event', payload), { ...payload, url: '/contact', referrer: 'https://chatgpt.com' });
  for (const url of ['/membership?token=secret', '/weekly-reports', '/api/login', '/auth/code', 'https://other.example/']) assert.equal(geoBeforeSend('event', { ...payload, url }), null);
  assert.equal(geoBeforeSend('event', { ...payload, hostname: 'localhost' }), null);
});

test('event bridge retains intent but never copies user text or contact details', () => {
  const event = geoEvent('WhatsApp Intent', { from: '/contact?email=test@example.com', target: '/123456789', label: 'Contact Jane', email: 'test@example.com', message: 'private' });
  assert.equal(event.name, 'WhatsApp Intent');
  assert.equal(event.data.from, '/contact');
  assert.equal(JSON.stringify(event).includes('test@example.com'), false);
  assert.equal(JSON.stringify(event).includes('Jane'), false);
  assert.equal(JSON.stringify(event).includes('123456789'), false);
  assert.equal(geoEvent('Contact Submitted', {}), null);
  assert.equal(geoEvent('Referral Landing', { source: 'ChatGPT' }).data.source, 'ChatGPT');
});
