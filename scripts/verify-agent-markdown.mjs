import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const canonicalOrigin = 'https://roboskin.ai';
const corePaths = ['/', '/tactile-ai', '/datasets', '/sensors', '/guides/lerobot-dataset-format'];
const browserAccept = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
const missingPath = '/__roboskin_markdown_verification_missing__';

export function assertMarkdown(response, pathname, expectedStatus = 200) {
  assert.equal(response.status, expectedStatus, `${pathname}: HTTP status`);
  assert.match(response.contentType, /^text\/markdown(?:;|$)/i, `${pathname}: expected Markdown MIME`);
  assert.doesNotMatch(response.body, /<!doctype\s+html|<html\b|<script\b|__next_f/i, `${pathname}: HTML or framework payload mislabeled as Markdown`);
  assert.match(response.body, /^#\s+\S/m, `${pathname}: missing Markdown H1`);
  assert.ok(response.vary.split(',').some((value) => ['accept', '*'].includes(value.trim().toLowerCase())), `${pathname}: missing Vary: Accept`);
  if (expectedStatus === 404) {
    assert.match(response.body, /^Status: 404 Not Found/, `${pathname}: missing explicit 404 identity`);
    for (const route of ['/sitemap.xml', '/llms.txt']) assert.ok(response.body.includes(`${canonicalOrigin}${route}`), `${pathname}: missing recovery link ${route}`);
  } else {
    assert.ok(response.body.startsWith(`Canonical URL: ${canonicalOrigin}${pathname}\n`), `${pathname}: incorrect canonical identity`);
    assert.match(response.body, /\]\(https:\/\//, `${pathname}: missing crawlable absolute resource links`);
  }
}

function assertHtml(response, pathname, { status = 200, noindex = false, negotiated = true } = {}) {
  assert.equal(response.status, status, `${pathname}: HTTP status`);
  assert.match(response.contentType, /^text\/html(?:;|$)/i, `${pathname}: expected HTML MIME`);
  assert.match(response.body, /<html\b/i, `${pathname}: missing HTML document`);
  assert.match(response.body, /<h1\b/i, `${pathname}: missing HTML H1`);
  if (noindex) assert.match(response.body, /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i, `${pathname}: missing noindex metadata`);
  if (negotiated) assert.ok(response.vary.split(',').some((value) => ['accept', '*'].includes(value.trim().toLowerCase())), `${pathname}: missing Vary: Accept`);
}

// Public-URL verifier. Callers with an already authorized preview transport may
// supply fetchImpl; this module neither obtains credentials nor changes access.
export async function verifyAgentMarkdown(baseUrl = canonicalOrigin, { fetchImpl = fetch } = {}) {
  const base = new URL(baseUrl);
  if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash) {
    throw new Error('Use an HTTP(S) base URL without credentials, a query, or a fragment.');
  }
  const checks = [];
  const failures = [];
  async function request(pathname, accept) {
    const response = await fetchImpl(new URL(pathname, base), {
      headers: { Accept: accept, 'User-Agent': 'RoboSkin-Markdown-Verification/1.0' },
      redirect: 'manual',
      signal: AbortSignal.timeout(30_000),
    });
    return {
      status: response.status,
      contentType: response.headers.get('content-type') || '',
      vary: response.headers.get('vary') || '',
      body: await response.text(),
    };
  }
  async function check(pathname, accept, validate) {
    const label = `${pathname} [${accept}]`;
    try {
      const response = await request(pathname, accept);
      const entry = { path: pathname, accept, status: response.status, contentType: response.contentType, vary: response.vary, bytes: Buffer.byteLength(response.body) };
      try { validate(response); entry.ok = true; }
      catch (error) { entry.ok = false; failures.push(`${label}: ${error.message.split('\n')[0]}`); }
      checks.push(entry);
      return response;
    } catch (error) {
      failures.push(`${label}: request failed (${error.name})`);
      checks.push({ path: pathname, accept, ok: false });
      return null;
    }
  }

  const first = await check(corePaths[0], 'text/html', (r) => assertHtml(r, corePaths[0]));
  if (!first || first.status !== 200) {
    return { base: base.origin, checkedAt: new Date().toISOString(), ok: false, requestCount: checks.length, checks, failures,
      limitation: 'The initial public HTML page is unavailable or protected. Authenticate the preview with an existing authorized transport before validating its representations.' };
  }
  for (const pathname of corePaths) {
    if (pathname !== corePaths[0]) await check(pathname, 'text/html', (r) => assertHtml(r, pathname));
    await check(pathname, 'text/markdown', (r) => assertMarkdown(r, pathname));
  }
  await check('/datasets', 'text/markdown;q=0, text/html;q=1', (r) => assertHtml(r, '/datasets'));
  await check('/datasets', browserAccept, (r) => assertHtml(r, '/datasets'));
  await check(missingPath, 'text/markdown', (r) => assertMarkdown(r, missingPath, 404));
  await check(missingPath, 'text/html', (r) => assertHtml(r, missingPath, { status: 404 }));
  // This endpoint has a POST handler only. A read-only GET must remain 405.
  await check('/api/membership', 'text/markdown', (r) => {
    assert.equal(r.status, 405, 'API method status changed');
    assert.doesNotMatch(r.contentType, /text\/markdown/i, 'API was rewritten to Markdown');
  });
  for (const accept of ['text/html', 'text/markdown']) {
    await check('/weekly-reports', accept, (r) => assertHtml(r, '/weekly-reports', { noindex: true, negotiated: false }));
  }
  await check('/downloads', 'text/markdown', (r) => assertHtml(r, '/downloads', { noindex: true, negotiated: false }));
  await check('/_agent-markdown/weekly-reports.md', 'text/plain', (r) => {
    assert.equal(r.status, 404, 'Excluded member page has a public Markdown asset');
  });
  return { base: base.origin, checkedAt: new Date().toISOString(), ok: failures.length === 0, requestCount: checks.length, checks, failures };
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  const result = await verifyAgentMarkdown(process.argv[2]);
  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) process.exitCode = 1;
}
