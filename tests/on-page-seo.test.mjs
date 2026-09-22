import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';
import { inspectPage, validatePages } from '../scripts/audit-on-page-seo.mjs';

async function loadTypeScript(relative) {
  const source = await readFile(new URL(relative, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}

const { buildSectionIds, getArticleHeadings } = await loadTypeScript('../src/lib/article-headings.ts');
const { groupResourcePages } = await loadTypeScript('../src/content/resource-navigation.ts');
const markup = (pathname, options = {}) => `<!doctype html><html><head>
  <title>${options.title ?? `Title for ${pathname}`}</title>
  <meta name="description" content="${options.description ?? `Description for ${pathname}`}">
  <link rel="canonical" href="https://roboskin.ai${options.canonical ?? pathname}">
  <meta name="robots" content="${options.robots ?? 'index, follow'}">
  </head><body><main><h1>${pathname}</h1><p>Useful short answer.</p>${options.body ?? ''}</main></body></html>`;

test('on-page audit parses the DOM without counting hydration payloads as content', () => {
  const page = inspectPage(markup('/guide', { body: '<script>self.__next_f.push(["<h1>Duplicate</h1><a href=\"/missing\">bad</a>"]);</script>' }), '/guide');
  assert.equal(page.h1.length, 1);
  assert.equal(page.links.length, 0);
  assert.ok(page.bodyWords < 10);
  assert.deepEqual(validatePages(new Map([['/guide', page]]), ['/guide']).errors, []);
});

test('on-page audit catches a homepage canonical, noindex, and duplicate metadata in the sitemap', () => {
  const a = inspectPage(markup('/a', { title: 'Same title', description: 'Same description' }), '/a');
  const b = inspectPage(markup('/b', { title: 'Same title', description: 'Same description', canonical: '/', robots: 'noindex, follow' }), '/b');
  const { errors } = validatePages(new Map([['/a', a], ['/b', b]]), ['/a', '/b']);
  for (const message of ['canonical does not identify', 'sitemap page is noindex', 'duplicate title', 'duplicate description']) {
    assert.ok(errors.some((error) => error.includes(message)), message);
  }
});

test('on-page audit checks real destinations and decoded fragments while allowing files and external links', () => {
  const a = inspectPage(markup('/a', { body: '<a href="/b#existing">OK</a><a href="/b#missing">Bad anchor</a><a href="/missing">Bad page</a><a href="/report.pdf">PDF</a><a href="https://example.com/missing">External</a>' }), '/a');
  const b = inspectPage(markup('/b', { body: '<section id="existing">Target</section>' }), '/b');
  const result = validatePages(new Map([['/a', a], ['/b', b]]), ['/a', '/b'], new Set(['/report.pdf']));
  assert.deepEqual(result.errors, ['/a: missing anchor /b#missing', '/a: broken internal link /missing']);
  assert.equal(result.pages.find((page) => page.path === '/b').bodyInlinks, 1);
});

test('on-page audit reports absent descriptions and duplicate sitemap URLs', () => {
  const page = inspectPage(markup('/a').replace(/<meta name="description"[^>]+>/, ''), '/a');
  const { errors } = validatePages(new Map([['/a', page]]), ['/a', '/a']);
  assert.ok(errors.includes('Sitemap contains duplicate page URLs'));
  assert.ok(errors.includes('/a: expected one nonempty description'));
});

test('section IDs keep existing deep links and disambiguate repeated headings', () => {
  const sections = [{ heading: 'Methods' }, { heading: 'Methods' }, { heading: 'Other', id: 'section-methods' }];
  assert.deepEqual(buildSectionIds(sections), ['section-methods-2', 'section-methods-3', 'section-methods']);
  assert.deepEqual(buildSectionIds([{ heading: 'Café: input/output' }, { heading: '???' }]), ['section-cafe-input-output', 'section-overview']);
  const headings = getArticleHeadings('# Article\n\n## First result\nText\n## First result');
  assert.deepEqual(headings.map(({ id, line }) => ({ id, line })), [{ id: 'section-first-result', line: 2 }, { id: 'section-first-result-2', line: 4 }]);
});

test('resource directory includes every supplied page exactly once, including new uncategorized topics', () => {
  const paths = ['/robot-skin', '/sensors/digit', '/guides/python-tactile-data-processing', '/datasets', '/applications/soft-robotic-skin', '/research/robot-skin-papers', '/future-topic'];
  const groups = groupResourcePages(paths.map((path) => ({ path })));
  const grouped = groups.flatMap((group) => group.pages.map((page) => page.path));
  assert.deepEqual(grouped.slice().sort(), paths.slice().sort());
  assert.equal(new Set(grouped).size, paths.length);
});
