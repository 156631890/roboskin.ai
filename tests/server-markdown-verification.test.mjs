import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { generateAgentMarkdown } from '../scripts/generate-agent-markdown.mjs';
import { verifyServerMarkdown } from '../scripts/verify-server-markdown.mjs';

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), 'roboskin-server-assets-'));
  const htmlRoot = path.join(root, '.next/server/app');
  const publicRoot = path.join(root, 'public');
  await mkdir(path.join(htmlRoot, 'guides'), { recursive: true });
  for (const pathname of ['/', '/tactile-ai', '/datasets', '/sensors', '/guides/lerobot-dataset-format', '/weekly-reports', '/hidden']) {
    const relative = pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`;
    const noindex = pathname === '/hidden' ? '<meta name="robots" content="noindex, follow"/>' : '';
    await writeFile(path.join(htmlRoot, relative), `<html><head><link rel="canonical" href="https://roboskin.ai${pathname}"/>${noindex}</head><body><main id="main-content"><h1>Verified resource</h1><a href="/research-index">Evidence</a></main></body></html>`);
  }
  await generateAgentMarkdown(publicRoot, { htmlRoot });
  return { htmlRoot, markdownRoot: path.join(publicRoot, '_agent-markdown') };
}

test('server artifact verifier checks actual output files from the current prerendered HTML', async () => {
  const result = await verifyServerMarkdown(await fixture());
  assert.equal(result.ok, true);
  assert.equal(result.publicPageCount, 5);
  assert.equal(result.markdownAssetCount, 6);
});

test('missing generated output fails the server gate', async () => {
  const dirs = await fixture();
  await rm(path.join(dirs.markdownRoot, 'datasets.md'));
  await assert.rejects(verifyServerMarkdown(dirs), /match this server build exactly/);
});

test('server artifact gate rejects HTML payloads even when the .md file exists', async () => {
  const dirs = await fixture();
  await writeFile(path.join(dirs.markdownRoot, 'datasets.md'), 'Canonical URL: https://roboskin.ai/datasets\n\n# Dataset\n<html>wrong body</html>');
  await assert.rejects(verifyServerMarkdown(dirs), /HTML or framework payload/);
});

test('stale noindex or member Markdown files cannot pass the server gate', async () => {
  for (const file of ['hidden.md', 'weekly-reports.md']) {
    const dirs = await fixture();
    await writeFile(path.join(dirs.markdownRoot, file), '# Old page');
    await assert.rejects(verifyServerMarkdown(dirs), /without stale, noindex or member pages/);
  }
});

test('a stale Markdown body at the same canonical URL fails against the current server HTML', async () => {
  const dirs = await fixture();
  const currentHtml = path.join(dirs.htmlRoot, 'datasets.html');
  const html = await readFile(currentHtml, 'utf8');
  await writeFile(currentHtml, html.replace('Verified resource', 'Updated dataset resource'));
  await assert.rejects(verifyServerMarkdown(dirs), /Markdown body must match the current server HTML exactly/);
});
