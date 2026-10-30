import test from 'node:test';
import assert from 'node:assert/strict';
import domino from '@mixmark-io/domino';
import { normalizeNotFoundHtml } from '../scripts/normalize-not-found.mjs';

test('404 metadata has one noindex-follow directive, no inherited canonical, and preserves recovery links', () => {
  const html = '<html><head><meta name="robots" content="noindex"/><meta name="robots" content="index, follow"/><meta name="googlebot" content="index, follow"/><link rel="canonical" href="https://roboskin.ai"/></head><body><h1>Page not found</h1><a href="/research-index">Research index</a></body></html>';
  const normalized = normalizeNotFoundHtml(html);
  const doc = domino.createDocument(normalized);
  assert.equal(doc.querySelectorAll('meta[name="robots"]').length, 1);
  assert.equal(doc.querySelector('meta[name="robots"]').getAttribute('content'), 'noindex, follow');
  assert.equal(doc.querySelectorAll('meta[name="googlebot"],link[rel="canonical"]').length, 0);
  assert.equal(doc.querySelector('a').getAttribute('href'), '/research-index');
  assert.equal(normalizeNotFoundHtml(normalized), normalized);
});
