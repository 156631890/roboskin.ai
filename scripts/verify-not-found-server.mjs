import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import domino from '@mixmark-io/domino';

const port = 3194;
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], { stdio: 'pipe', env: { ...process.env, ROBOSKIN_RUNTIME: 'server' } });
let serverOutput = '';
server.stdout.on('data', chunk => { serverOutput += chunk; });
server.stderr.on('data', chunk => { serverOutput += chunk; });
try {
  let ready = false;
  for (let i = 0; i < 40; i++) {
    try { await fetch(`http://127.0.0.1:${port}/`); ready = true; break; } catch { await delay(500); }
  }
  assert.ok(ready, `Next server did not start: ${serverOutput}`);
  for (const path of ['/__missing_structure_route__', '/research/__missing_article__', '/news/__missing_article__']) {
    const response = await fetch(`http://127.0.0.1:${port}${path}`, { redirect: 'manual' });
    const doc = domino.createDocument(await response.text());
    const robots = [...doc.querySelectorAll('meta[name="robots"]')].map(meta => meta.getAttribute('content'));
    console.log(JSON.stringify({ path, status: response.status, robots, googlebot: doc.querySelectorAll('meta[name="googlebot"]').length, canonical: doc.querySelectorAll('link[rel="canonical"]').length }));
    assert.equal(response.status, 404);
    assert.deepEqual(robots, ['noindex, follow']);
    assert.equal(doc.querySelectorAll('meta[name="googlebot"], link[rel="canonical"]').length, 0);
    assert.ok(doc.body.textContent.includes('Agent recovery'));
  }
} finally { server.kill(); }
