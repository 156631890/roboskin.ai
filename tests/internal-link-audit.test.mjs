import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { auditInternalLinks, auditLinkGraph, inspectLinks } from '../scripts/audit-internal-links.mjs';

const page = (pathname, body) => inspectLinks(`<title>${pathname}</title>${body}`, pathname);

test('link graph separates global navigation, article/main links and hydration; counts unique source pages', () => {
  const pages = new Map([
    ['/', page('/', '<header><a href="/guide">Menu</a></header><main><nav><a href="/guide">Breadcrumb</a></nav><article><a href="/guide">Guide</a><a href="/guide#details">Details</a></article><script>self.__next_f.push(["<a href=\"/missing\">fake</a>"])</script></main><footer><a href="/guide">Footer</a></footer>')],
    ['/guide', page('/guide', '<main><h1 id="details">Guide</h1><a href="/guide">Self</a></main>')],
    ['/404', page('/404', '<main><a href="/guide">Recovery</a></main>')],
  ]);
  const result = auditLinkGraph(pages, ['/', '/guide']);
  const guide = result.pages.find((item) => item.path === '/guide');
  assert.equal(guide.bodyInlinks, 1);
  assert.equal(guide.allInlinks, 1);
  assert.deepEqual(guide.bodyInlinkSources, ['/']);
  assert.equal(guide.crawlDepth, 1);
  assert.equal(result.summary.linksByScope.article, 2);
  assert.equal(result.summary.linksByScope.navigation, 1);
  assert.equal(result.summary.linksByScope.footer, 1);
  assert.deepEqual(result.brokenLinks, []);
});

test('audit checks query fragments, decoded IDs, missing routes and 404 templates, and resolves redirects', () => {
  const pages = new Map([
    ['/', page('/', '<main><a href="/guide?mode=full#caf%C3%A9">OK</a><a href="/guide?mode=full#absent">Bad anchor</a><a href="/guide#caf%C3%A9:~:text=hello">Text fragment</a><a href="/guide#:~:text=hello">Text only</a><a href="/old#caf%C3%A9">Old</a><a href="https://www.roboskin.ai/guide">Host alias</a><a href="/404">404</a><a href="/missing">Missing</a><a href="/paper.pdf#page=2">Download</a><a href="https://example.com/missing">External</a></main>')],
    ['/guide', page('/guide', '<main id="café">Guide</main>')],
    ['/404', page('/404', '<main>Not found</main>')],
  ]);
  const result = auditLinkGraph(pages, ['/', '/guide'], new Set(['/paper.pdf']), { '/old': '/guide' });
  assert.deepEqual(result.brokenLinks.map(({ reason }) => reason), ['missing-fragment', '404-page', 'missing-target']);
  assert.equal(result.redirectLinks.length, 2);
  assert.equal(result.redirectLinks[0].target, '/guide');
  assert.equal(result.pages.find((item) => item.path === '/guide').bodyInlinks, 1);
});

test('homepage depths distinguish navigation-only discovery, intermediate pages, and unreachable pages', () => {
  const pages = new Map([
    ['/', page('/', '<nav><a href="/directory">Directory</a></nav><main><a href="/intermediate">Continue</a></main>')],
    ['/directory', page('/directory', '<main><a href="/article">Article</a></main>')],
    ['/intermediate', page('/intermediate', '<main><a href="/article">Article</a></main>')],
    ['/article', page('/article', '<main>Article</main>')],
    ['/orphan', page('/orphan', '<main>Orphan</main>')],
  ]);
  const result = auditLinkGraph(pages, ['/', '/directory', '/article', '/orphan']);
  const records = Object.fromEntries(result.pages.map((item) => [item.path, item]));
  assert.equal(records['/directory'].crawlDepth, 1);
  assert.equal(records['/directory'].bodyCrawlDepth, null);
  assert.equal(records['/directory'].bodyInlinks, 0);
  assert.equal(records['/directory'].allInlinks, 1);
  assert.equal(records['/article'].crawlDepth, 2);
  assert.equal(records['/article'].bodyCrawlDepth, 2);
  assert.deepEqual(records['/article'].bodyInlinkSources, ['/directory']);
  assert.equal(records['/orphan'].crawlDepth, null);
  assert.deepEqual(result.summary.depthHistogram, { 0: 1, 1: 1, 2: 1, unreachable: 1 });
});

test('broken redirect chains cannot count as crawl paths', () => {
  const pages = new Map([['/', page('/', '<main><a href="/loop">Loop</a><a href="/gone">Gone</a></main>')]]);
  const result = auditLinkGraph(pages, ['/'], new Set(), { '/loop': '/loop-again', '/loop-again': '/loop', '/gone': '/missing' });
  assert.deepEqual(result.brokenLinks.map(({ reason }) => reason), ['redirect-cycle', 'missing-target']);
  assert.equal(result.redirectLinks.length, 2);
  assert.equal(result.pages[0].allOutlinks, 0);
});

test('export audit reads sitemap HTML and file assets from a custom directory', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'roboskin-links-'));
  try {
    await mkdir(path.join(directory, 'guide'));
    await writeFile(path.join(directory, 'sitemap.xml'), '<urlset><url><loc>https://roboskin.ai/</loc></url><url><loc>https://roboskin.ai/guide</loc></url></urlset>');
    await writeFile(path.join(directory, 'index.html'), '<main><a href="/guide#details">Guide</a><a href="/guide/index.html#absent">Bad direct-file anchor</a><a href="/paper.pdf">Download</a></main>');
    await writeFile(path.join(directory, 'guide', 'index.html'), '<main id="details">Guide</main>');
    await writeFile(path.join(directory, 'paper.pdf'), 'fixture');
    const report = await auditInternalLinks(directory, {});
    assert.equal(report.summary.sitemapPages, 2);
    assert.equal(report.summary.brokenLinks, 1);
    assert.equal(report.brokenLinks[0].reason, 'missing-fragment');
    assert.equal(report.pages.find((item) => item.path === '/guide').crawlDepth, 1);
  } finally {
    assert.equal(path.dirname(path.resolve(directory)), path.resolve(os.tmpdir()));
    assert.ok(path.basename(directory).startsWith('roboskin-links-'));
    await rm(directory, { recursive: true, force: true });
  }
});
