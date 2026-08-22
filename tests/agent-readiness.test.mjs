import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  htmlToMarkdown,
  markdownRelativePathForHtml,
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

test('Vercel negotiates Markdown without changing the browser HTML route', async () => {
  const [vercelSource, packageSource] = await Promise.all([
    read('vercel.json'),
    read('package.json'),
  ]);
  const vercel = JSON.parse(vercelSource);
  const packageJson = JSON.parse(packageSource);
  const markdownRoutes = vercel.routes.filter((route) =>
    route.has?.some((condition) => condition.type === 'header' && condition.key.toLowerCase() === 'accept')
      && route.headers?.['Content-Type'] === 'text/markdown; charset=utf-8');

  assert.equal(vercel.buildCommand, 'npm run build');
  assert.equal(packageJson.scripts.postbuild, 'node scripts/generate-agent-markdown.mjs');
  assert.equal(markdownRoutes.length, 2);
  assert.ok(markdownRoutes.some((route) => route.dest === '/_agent-markdown/index.md'));
  assert.ok(markdownRoutes.some((route) => route.dest === '/_agent-markdown/$1.md'));
  for (const route of markdownRoutes) {
    assert.equal(route.headers.Vary, 'Accept, Accept-Encoding');
    assert.ok(route.has[0].value.includes('text/markdown'));
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
