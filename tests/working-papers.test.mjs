import * as seoBudget from '../src/lib/seo-budget.mjs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import * as datasetEvidence from '../src/lib/dataset-evidence.mjs';
import { inspectWorkingPaper } from '../scripts/lib/working-paper-contract.mjs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root));
function load(relative, dependencies = {}) {
  const file = new URL(relative, root);
  const exports = {};
  const nativeRequire = createRequire(file);
  const require = (name) => Object.hasOwn(dependencies, name) ? dependencies[name] : nativeRequire(name);
  const { outputText } = ts.transpileModule(read(relative).toString('utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  new Function('exports', 'require', outputText)(exports, require);
  return exports;
}

const content = load('src/content/working-papers.ts');
const { interactionPaper: paper } = content;
const seo = load('src/lib/seo.ts', {
  '@/lib/schema-evidence': load('src/lib/schema-evidence.ts'),
  '@/lib/seo-budget.mjs': seoBudget,
  '@/lib/dataset-evidence.mjs': datasetEvidence,
  '@/content/site': load('src/content/site.ts'),
  '@/lib/research-index-release': load('src/lib/research-index-release.ts'),
});
const dependencies = {
  '@/components/JsonLd': load('src/components/JsonLd.tsx'),
  '@/content/working-papers': content,
  '@/lib/seo': seo,
};

test('working-paper routes are indexable with canonical research breadcrumbs', () => {
  const protectedUrls = JSON.parse(read('config/protected-urls.json'));
  for (const pathname of ['/papers', paper.path]) {
    const metadata = seo.buildPageMetadata(pathname);
    assert.equal(metadata.alternates.canonical, `https://roboskin.ai${pathname}`);
    assert.equal(metadata.robots.index, true);
    assert.equal(metadata.openGraph.type, 'website');
    assert.ok(protectedUrls.includes(metadata.alternates.canonical));
    assert.equal(seo.buildPageJsonLd(pathname)['@type'], 'WebPage');
  }
  assert.deepEqual(seo.buildBreadcrumbJsonLd(paper.path).itemListElement.map(({ name, item }) => [name, item]), [
    ['Home', 'https://roboskin.ai/'],
    ['Research', 'https://roboskin.ai/research'],
    ['Working Papers', 'https://roboskin.ai/papers'],
    ['Interaction as the Interface', `https://roboskin.ai${paper.path}`],
  ]);
});

test('rendered working papers retain evidence labels, versioned downloads, and honest schema', () => {
  for (const pathname of ['/papers', paper.path]) {
    const { default: Page } = load(`src/app${pathname}/page.tsx`, dependencies);
    const html = renderToStaticMarkup(createElement('main', null, createElement(Page)));
    const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const inspected = inspectWorkingPaper(html, jsonLd, pathname);
    assert.deepEqual(inspected.errors, []);
    if (pathname === paper.path) assert.deepEqual(inspected.downloads.sort(), Object.values(paper.downloads).sort());
  }
  const incorrect = inspectWorkingPaper('<main>Research proposal Version 0.2 Not peer reviewed</main>', [{
    ...seo.buildPageJsonLd(paper.path), author: { name: 'RoboSkin.ai Editorial Team' }, datePublished: paper.date,
  }, { '@type': 'ScholarlyArticle' }], paper.path);
  assert.ok(incorrect.errors.some((error) => error.includes('Article publication')));
  assert.ok(incorrect.errors.some((error) => error.includes('claim author')));
  assert.ok(incorrect.errors.some((error) => error.includes('claim datePublished')));
  assert.ok(incorrect.errors.some((error) => error.includes('missing versioned download')));
});

test('every linked release asset matches its version, byte count, and SHA-256 manifest', () => {
  assert.equal(paper.version, '0.2');
  const manifest = JSON.parse(read(`public${paper.downloads.manifest}`));
  assert.equal(manifest.release, `${paper.title} v${paper.version}`);
  assert.equal(manifest.date, paper.date);
  assert.match(manifest.status, /Research proposal; not peer reviewed/);
  assert.match(manifest.evidence, /synthetic.*No physical-robot evaluation/);
  assert.equal(manifest.author, undefined);
  assert.equal(manifest.doi, undefined);
  const prefix = paper.downloads.manifest.slice(0, paper.downloads.manifest.lastIndexOf('/') + 1);
  const linked = Object.values(paper.downloads).filter((pathname) => pathname !== paper.downloads.manifest).sort();
  assert.deepEqual(manifest.files.map((entry) => `${prefix}${entry.path}`).sort(), linked);
  for (const entry of manifest.files) {
    assert.match(entry.path, /^[A-Za-z0-9._-]+$/);
    const file = read(`public${prefix}${entry.path}`);
    assert.equal(file.length, entry.bytes, entry.path);
    assert.equal(createHash('sha256').update(file).digest('hex'), entry.sha256, entry.path);
  }
  assert.equal(read(`public${paper.downloads.pdf}`).subarray(0, 4).toString('ascii'), '%PDF');
  assert.equal(read(`public${paper.downloads.benchmark}`).readUInt32LE(0), 0x04034b50);
  assert.match(read(`public${paper.downloads.source}`).toString('utf8'), /Version 0\.2/);
});
