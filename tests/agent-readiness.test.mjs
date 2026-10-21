import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, access } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  htmlToMarkdown,
  generateAgentMarkdown,
  markdownRelativePathForHtml,
  publicCanonicalPath,
} from '../scripts/generate-agent-markdown.mjs';

const read = (relativePath) => readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');

test('exported HTML is converted into a canonical, compact Markdown representation', () => {
  const markdown = htmlToMarkdown(`
    <html>
      <head><title>Robot Skin | RoboSkin.ai</title></head>
      <body>
        <main id="main-content">
          <script type="application/ld+json">{"name":"ignore this block"}</script>
          <h1>Robot Skin</h1>
          <p>Source-backed tactile robotics research.</p>
          <a href="/research">Research</a>
          <table><thead><tr><th>Layer</th><th>Role</th></tr></thead><tbody><tr><td>Skin</td><td>Contact</td></tr></tbody></table>
        </main>
      </body>
    </html>
  `, '/robot-skin');

  assert.match(markdown, /^Canonical URL: https:\/\/roboskin\.ai\/robot-skin/m);
  assert.match(markdown, /# Robot Skin/);
  assert.match(markdown, /\[Research\]\(https:\/\/roboskin\.ai\/research\)/);
  assert.match(markdown, /\| Layer \| Role \|/);
  assert.doesNotMatch(markdown, /ignore this block|<script|__next_f/);
});

test('HTML output paths map to stable private Markdown asset paths', () => {
  assert.equal(markdownRelativePathForHtml('index.html'), 'index.md');
  assert.equal(markdownRelativePathForHtml('robot-skin.html'), 'robot-skin.md');
  assert.equal(markdownRelativePathForHtml('research/paper.html'), 'research/paper.md');
  assert.equal(markdownRelativePathForHtml('404.html'), '404.md');
});

const publicHtml = (pathname, body = '<h1>Source-reviewed tactile data</h1>', extraHead = '') =>
  `<html><head><link rel="canonical" href="https://roboskin.ai${pathname}"/>${extraHead}</head><body><main id="main-content">${body}</main></body></html>`;

test('only matching public canonical HTML can become a Markdown asset', () => {
  assert.equal(publicCanonicalPath(publicHtml('/datasets'), 'datasets.html'), '/datasets');
  assert.equal(publicCanonicalPath(publicHtml('/'), 'index.html'), '/');
  assert.equal(publicCanonicalPath(publicHtml('/datasets', '', '<meta name="robots" content="noindex, follow"/>'), 'datasets.html'), null);
  assert.equal(publicCanonicalPath(publicHtml('/datasets', '', '<meta name="googlebot" content="none"/>'), 'datasets.html'), null);
  assert.equal(publicCanonicalPath(publicHtml('/datasets'), 'stale-datasets.html'), null);
  assert.equal(publicCanonicalPath('<html><body>No canonical</body></html>', 'datasets.html'), null);
  assert.equal(publicCanonicalPath(publicHtml('/datasets').replace('https://roboskin.ai', 'https://example.com'), 'datasets.html'), null);
  for (const route of ['api/membership', 'private/report', 'weekly-reports', 'account', 'auth/session', '404', '_not-found']) {
    assert.equal(publicCanonicalPath(publicHtml(`/${route}`), `${route}.html`), null, route);
  }
});

test('server generation uses current prerendered HTML and removes stale or excluded assets', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'roboskin-markdown-'));
  const htmlRoot = path.join(root, '.next', 'server', 'app');
  const publicRoot = path.join(root, 'public');
  await mkdir(path.join(htmlRoot, 'guides'), { recursive: true });
  await mkdir(path.join(htmlRoot, 'private'), { recursive: true });
  await mkdir(path.join(publicRoot, '_agent-markdown'), { recursive: true });
  await writeFile(path.join(publicRoot, '_agent-markdown', 'stale.md'), 'Old content');
  await writeFile(path.join(htmlRoot, 'index.html'), publicHtml('/'));
  await writeFile(path.join(htmlRoot, 'guides', 'example.html'), publicHtml('/guides/example', '<h1>Verified guide</h1><p>Reviewed 2026-10-21.</p><a href="/datasets">Dataset evidence</a><script>private runtime payload</script>'));
  await writeFile(path.join(htmlRoot, 'private', 'report.html'), publicHtml('/private/report', '<p>Private content</p>'));
  await writeFile(path.join(htmlRoot, 'weekly-reports.html'), publicHtml('/weekly-reports'));
  await writeFile(path.join(htmlRoot, 'old.html'), publicHtml('/old', '', '<meta name="robots" content="noindex, follow"/>'));
  await writeFile(path.join(htmlRoot, '_not-found.html'), publicHtml('/'));
  const result = await generateAgentMarkdown(publicRoot, { htmlRoot });
  assert.equal(result.count, 2);
  const guide = await readFile(path.join(result.outputRoot, 'guides', 'example.md'), 'utf8');
  assert.match(guide, /^Canonical URL: https:\/\/roboskin.ai\/guides\/example\n/);
  assert.match(guide, /# Verified guide/);
  assert.match(guide, /Reviewed 2026-10-21/);
  assert.match(guide, /\[Dataset evidence\]\(https:\/\/roboskin.ai\/datasets\)/);
  assert.doesNotMatch(guide, /<!DOCTYPE|<html|<script|private runtime payload/i);
  for (const removed of ['stale.md', 'old.md', 'weekly-reports.md', 'private/report.md', '_not-found.md']) {
    await assert.rejects(access(path.join(result.outputRoot, removed)), { code: 'ENOENT' });
  }
  const notFound = await readFile(path.join(result.outputRoot, '404.md'), 'utf8');
  assert.match(notFound, /^Status: 404 Not Found/);
  assert.doesNotMatch(notFound, /Private content|<html/i);
  for (const route of ['/sitemap.xml', '/llms.txt', '/llms-full.txt', '/research-index', '/glossary']) {
    assert.ok(notFound.includes(`https://roboskin.ai${route}`), `Markdown recovery must retain ${route}`);
  }
});

test('static export generation keeps the same public Markdown output paths', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'roboskin-export-markdown-'));
  await writeFile(path.join(root, 'index.html'), publicHtml('/'));
  const result = await generateAgentMarkdown(root);
  assert.equal(result.count, 1);
  assert.match(await readFile(path.join(root, '_agent-markdown', 'index.md'), 'utf8'), /^Canonical URL: https:\/\/roboskin.ai\//);
});

test('Vercel negotiates Markdown without changing the browser HTML route', async () => {
  const [vercelSource, packageSource] = await Promise.all([
    read('vercel.json'),
    read('package.json'),
  ]);
  const vercel = JSON.parse(vercelSource);
  const packageJson = JSON.parse(packageSource);
  const markdownRoutes = vercel.routes.filter((route) =>
    route.has?.some((condition) => condition.type === 'header' && condition.key.toLowerCase() === 'accept')
      && route.dest?.startsWith('/_agent-markdown/'));

  assert.equal(vercel.buildCommand, 'npm run build');
  assert.equal(packageJson.scripts.postbuild, 'node scripts/generate-agent-markdown.mjs');
  assert.equal(markdownRoutes.length, 3);
  assert.ok(markdownRoutes.some((route) => route.dest === '/_agent-markdown/index.md'));
  assert.ok(markdownRoutes.some((route) => route.dest === '/_agent-markdown/$1.md'));
  const errorHandleIndex = vercel.routes.findIndex((route) => route.handle === 'error');
  const markdown404Index = vercel.routes.findIndex((route) =>
    route.dest === '/_agent-markdown/404.md' && route.status === 404);
  assert.ok(errorHandleIndex >= 0 && markdown404Index > errorHandleIndex);
  for (const route of markdownRoutes) {
    assert.equal(route.headers.Vary, 'Accept, Accept-Encoding');
    assert.ok(route.has[0].value.includes('text/markdown'));
    if (route.status !== 404) assert.equal(route.headers['Content-Type'], undefined, 'A missing representation must never relabel HTML as Markdown');
  }
  const contentRoute = markdownRoutes.find((route) => route.dest === '/_agent-markdown/$1.md');
  const pattern = new RegExp(contentRoute.src);
  assert.ok(pattern.test('/guides/lerobot-dataset-format'));
  for (const route of ['/api/membership', '/private/report', '/weekly-reports', '/account', '/auth/session']) {
    assert.equal(pattern.test(route), false, `${route} must not enter public Markdown negotiation`);
    const recoveryRoute = markdownRoutes.find((entry) => entry.status === 404);
    assert.equal(new RegExp(recoveryRoute.src).test(route), false, `${route} must keep its original error status and response type`);
  }
  const varyRoute = vercel.routes.find((route) => route.continue && route.transforms?.some((transform) => transform.target?.key === 'vary'));
  assert.deepEqual(varyRoute.transforms, [{
    type: 'response.headers', op: 'append', target: { key: 'vary' }, args: ['Accept', 'Accept-Encoding'],
  }], 'Append after the framework response so Next.js Vary fields and Accept are both preserved');
  const varyPattern = new RegExp(varyRoute.src);
  const noindexUrls = JSON.parse(await read('config/noindex-urls.json'));
  for (const url of noindexUrls) {
    const route = new URL(url).pathname;
    assert.equal(pattern.test(route), false, `${route} must keep its existing noindex HTML response`);
    assert.equal(varyPattern.test(route), false, `${route} does not negotiate a Markdown representation`);
  }
});

test('the 404 page gives agents and people explicit recovery routes', async () => {
  const notFound = await read('src/app/not-found.tsx');

  for (const route of ['/sitemap.xml', '/llms.txt', '/llms-full.txt', '/research-index', '/glossary']) {
    assert.match(notFound, new RegExp(route.replaceAll('/', '\\/').replace('.', '\\.')));
  }
  assert.match(notFound, /Page not found/);
  assert.match(notFound, /RoboSkin\.ai/);
});

test('Organization schema strengthens brand identity without inventing a postal address', async () => {
  const seo = await read('src/lib/seo.ts');

  assert.match(seo, /disambiguatingDescription:/);
  assert.match(seo, /identifier:\s*\{/);
  assert.match(seo, /propertyID: 'domain'/);
  assert.match(seo, /publishingPrinciples:/);
  assert.match(seo, /knowsAbout:/);
  assert.doesNotMatch(seo, /address:\s*\{[\s\S]*?'@type': 'PostalAddress'/);
});
