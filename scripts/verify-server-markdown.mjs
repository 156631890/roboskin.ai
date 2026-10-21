import assert from 'node:assert/strict';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { htmlToMarkdown, markdownRelativePathForHtml, publicCanonicalPath } from './generate-agent-markdown.mjs';

const corePaths = ['/', '/tactile-ai', '/datasets', '/sensors', '/guides/lerobot-dataset-format'];

async function listFiles(root, extension, relative = '') {
  const entries = await readdir(path.join(root, relative), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const name = path.join(relative, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(root, extension, name));
    else if (entry.isFile() && entry.name.endsWith(extension)) files.push(name.replaceAll('\\', '/'));
  }
  return files;
}

function inspectBody(markdown, pathname) {
  assert.ok(markdown.startsWith(`Canonical URL: https://roboskin.ai${pathname}\n`), `${pathname}: missing canonical Markdown identity`);
  assert.match(markdown, /^#\s+\S/m, `${pathname}: missing Markdown H1`);
  assert.doesNotMatch(markdown, /<!doctype\s+html|<html\b|<script\b|__next_f/i, `${pathname}: HTML or framework payload in Markdown`);
}

export async function verifyServerMarkdown({
  htmlRoot = path.resolve('.next/server/app'),
  markdownRoot = path.resolve('public/_agent-markdown'),
} = {}) {
  const htmlFiles = await listFiles(htmlRoot, '.html');
  const expected = new Map();
  for (const relative of htmlFiles) {
    const html = await readFile(path.join(htmlRoot, relative), 'utf8');
    const pathname = publicCanonicalPath(html, relative);
    if (pathname) expected.set(markdownRelativePathForHtml(relative), { pathname, markdown: htmlToMarkdown(html, pathname) });
  }
  assert.ok(expected.size > 0, 'The current server build contains no public canonical pages');
  for (const pathname of corePaths) assert.ok([...expected.values()].some((page) => page.pathname === pathname), `Server build is missing ${pathname}`);
  const actualFiles = await listFiles(markdownRoot, '.md');
  assert.deepEqual(actualFiles.sort(), [...expected.keys(), '404.md'].sort(), 'Markdown assets must match this server build exactly, without stale, noindex or member pages');
  for (const [relative, page] of expected) {
    const { pathname } = page;
    const markdown = await readFile(path.join(markdownRoot, relative), 'utf8');
    inspectBody(markdown, pathname);
    assert.equal(markdown, page.markdown, `${pathname}: Markdown body must match the current server HTML exactly`);
    if (corePaths.includes(pathname)) assert.match(markdown, /\]\(https:\/\//, `${pathname}: missing absolute resource links`);
  }
  const recovery = await readFile(path.join(markdownRoot, '404.md'), 'utf8');
  assert.match(recovery, /^Status: 404 Not Found\n/);
  assert.doesNotMatch(recovery, /<html\b|<script\b|__next_f/i);
  for (const route of ['/sitemap.xml', '/llms.txt', '/llms-full.txt', '/research-index', '/glossary']) {
    assert.ok(recovery.includes(`https://roboskin.ai${route}`), `404 recovery is missing ${route}`);
  }
  return { ok: true, checkedAt: new Date().toISOString(), runtime: 'server', publicPageCount: expected.size, markdownAssetCount: actualFiles.length, corePaths };
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  let report;
  try { report = await verifyServerMarkdown(); }
  catch (error) { report = { ok: false, runtime: 'server', checkedAt: new Date().toISOString(), error: error.message }; process.exitCode = 1; }
  await mkdir('.artifacts', { recursive: true });
  await writeFile('.artifacts/server-markdown-verification.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
}
