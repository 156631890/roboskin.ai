import assert from 'node:assert/strict';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { SEO_BUDGET, SEO_TITLE_SUFFIX, finalSeoTitle, seoLength, seoLengthIssues, assertSeoBudget, resolveArticleSeo } from '../src/lib/seo-budget.mjs';
import { inspectPage, validatePages } from '../scripts/audit-on-page-seo.mjs';
import { contentSeoRecords } from '../scripts/check-seo-metadata.mjs';

const html = (title, description) => `<html><head><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="https://roboskin.ai/news/test"></head><body><main><h1>Complete paper name stays here</h1></main></body></html>`;
const audit = (title, description) => validatePages(new Map([['/news/test', inspectPage(html(title, description), '/news/test')]]), ['/news/test']);
test('DOM gate accepts 70/160 and rejects 71/161 with page type and URL diagnostics', () => {
  assert.deepEqual(SEO_BUDGET, { title: 70, description: 160 });
  assert.deepEqual(audit('t'.repeat(70), 'd'.repeat(160)).errors, []);
  const report = audit('t'.repeat(71), 'd'.repeat(161));
  assert.deepEqual(report.lengthIssues.map(({ field, length, pageType, url }) => ({ field, length, pageType, url })), [
    { field: 'title', length: 71, pageType: 'News', url: 'https://roboskin.ai/news/test' },
    { field: 'description', length: 161, pageType: 'News', url: 'https://roboskin.ai/news/test' },
  ]);
  assert.equal(report.errors.length, 2);
});
test('editorial budget reserves the actual brand suffix and never cuts input', () => {
  // Whitespace normalization must not erase the leading separator space when computing the budget.
  const exact = 'a'.repeat(70 - [...SEO_TITLE_SUFFIX].length);
  assert.equal(seoLength(finalSeoTitle(exact)), 70);
  assert.equal(assertSeoBudget('/news/test', { title: exact, description: 'Valid' }).title, exact);
  assert.throws(() => assertSeoBudget('/news/test', { title: exact + 'b', description: 'Valid' }), /publication blocked/);
});
test('missing SEO fields use original title/excerpt; overlong or empty fallback blocks publication', () => {
  assert.deepEqual(resolveArticleSeo({ title: 'Paper', excerpt: 'Evidence' }), { title: 'Paper', description: 'Evidence' });
  assert.doesNotThrow(() => assertSeoBudget('/research/new', resolveArticleSeo({ title: 'Paper', excerpt: 'Evidence' })));
  for (const post of [{ title: 'x'.repeat(71), excerpt: 'Evidence' }, { title: 'Paper', excerpt: 'x'.repeat(161) }, { title: 'Paper', excerpt: '' }, { title: '', excerpt: 'Evidence' }]) {
    assert.throws(() => assertSeoBudget('/research/new', resolveArticleSeo(post)), /publication blocked/);
  }
  assert.equal(resolveArticleSeo({ title: 'Full paper', excerpt: 'Evidence', seoTitle: '', seoDescription: '' }).title, '');
});
test('DOM decodes HTML entities and counts Unicode code points instead of markup or UTF-16 units', () => {
  const title = '&#x1F916;'.repeat(69) + '&amp;';
  const description = '触'.repeat(159) + '&quot;';
  const page = inspectPage(html(title, description), '/news/test');
  assert.equal(seoLength(page.title), 70);
  assert.equal(seoLength(page.description), 160);
  assert.deepEqual(audit(title, description).errors, []);
  assert.equal(audit(title + 'é', description + '界').lengthIssues.length, 2);
});
test('exceptions require exact URL, field, text, reason and review; changing text invalidates them', () => {
  const title = 't'.repeat(71);
  const exception = { path: '/term', field: 'title', value: title, reason: 'Unabbreviated registered name', reviewedBy: 'Test reviewer', reviewedAt: '2026-09-29' };
  assert.equal(seoLengthIssues('/term', title, 'Description', [exception])[0].exception, exception);
  for (const changed of [{ ...exception, path: '/other' }, { ...exception, reason: '' }, { ...exception, reviewedBy: '' }, { ...exception, value: title + 'x' }]) assert.equal(seoLengthIssues('/term', title, 'Description', [changed])[0].exception, undefined);
});
test('every current News, Research and shared topic/page SEO record satisfies publication budgets', () => {
  for (const record of contentSeoRecords()) assert.doesNotThrow(() => assertSeoBudget(record.path, record), record.path);
});
test('the prebuild CLI runs through both real paths and the checkout path', () => {
  const script = fileURLToPath(new URL('../scripts/check-seo-metadata.mjs', import.meta.url));
  for (const entry of new Set([script, path.resolve('scripts/check-seo-metadata.mjs')])) {
    const result = spawnSync(process.execPath, [entry], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Editorial SEO budgets passed/);
  }
});
