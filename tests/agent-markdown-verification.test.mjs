import assert from 'node:assert/strict';
import test from 'node:test';
import { assertMarkdown, verifyAgentMarkdown } from '../scripts/verify-agent-markdown.mjs';

const html = '<!DOCTYPE html><html><head><meta name="robots" content="noindex, follow"/></head><body><h1>Public page</h1></body></html>';
const representation = (pathname) => `Canonical URL: https://roboskin.ai${pathname}\n\n# Public resource\n\n[Sources](https://roboskin.ai/research-index)\n`;
const recovery = 'Status: 404 Not Found\n\n# Page not found\n\n[Map](https://roboskin.ai/sitemap.xml)\n[Resources](https://roboskin.ai/llms.txt)';

test('HTTP verifier rejects the observed HTML body with a Markdown MIME header', () => {
  assert.throws(() => assertMarkdown({ status: 200, contentType: 'text/markdown; charset=utf-8', vary: 'Accept', body: html }, '/datasets'), /mislabeled as Markdown/);
});

test('HTTP verifier checks public representations and preserves q=0, browser, API and member responses', async () => {
  const requests = [];
  const fetchImpl = async (url, options) => {
    const pathname = url.pathname;
    const accept = options.headers.Accept;
    requests.push({ pathname, accept, method: options.method || 'GET' });
    const headers = { Vary: 'Accept, Accept-Encoding', 'Content-Type': 'text/html; charset=utf-8' };
    if (pathname === '/api/membership') return new Response(null, { status: 405 });
    if (pathname === '/_agent-markdown/weekly-reports.md') return new Response(html, { status: 404, headers });
    if (pathname === '/weekly-reports' || pathname === '/downloads') return new Response(html, { headers });
    if (pathname.startsWith('/__roboskin_')) {
      if (accept === 'text/markdown') return new Response(recovery, { status: 404, headers: { ...headers, 'Content-Type': 'text/markdown; charset=utf-8' } });
      return new Response(html, { status: 404, headers });
    }
    if (accept === 'text/markdown') return new Response(representation(pathname), { headers: { ...headers, 'Content-Type': 'text/markdown; charset=utf-8' } });
    return new Response(html, { headers });
  };
  const result = await verifyAgentMarkdown('https://preview.example', { fetchImpl });
  assert.equal(result.ok, true, JSON.stringify(result.failures));
  assert.equal(result.requestCount, 19);
  assert.ok(requests.every(({ method }) => method === 'GET'));
  assert.ok(requests.some(({ accept }) => accept.includes('text/markdown;q=0')));
});

test('HTTP verifier stops at deployment protection without collecting response content', async () => {
  let calls = 0;
  const result = await verifyAgentMarkdown('https://preview.example', {
    fetchImpl: async () => { calls += 1; return new Response('Authentication required', { status: 401 }); },
  });
  assert.equal(result.ok, false);
  assert.equal(calls, 1);
  assert.match(result.limitation, /protected/);
  assert.doesNotMatch(JSON.stringify(result), /Authentication required/);
});
