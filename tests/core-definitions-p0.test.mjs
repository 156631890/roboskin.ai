import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import domino from '@mixmark-io/domino';
import ts from 'typescript';
import * as datasetEvidence from '../src/lib/dataset-evidence.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const modules = new Map();
const normalize = (value) => value.replace(/\s+/g, ' ').trim();
const definitionPaths = ['/technology', '/tactile-foundation-models', '/e-skin', '/physical-ai-touch'];
const workflowPaths = ['/datasets', '/guides/gelsight-vs-digit', '/guides/ros2-tactile-sensing'];
let currentPath = '/';

function TestLink({ href, children, ...props }) {
  return createElement('a', { ...props, href }, children);
}

// Exercise the actual route, content, renderer and JSON-LD builders. Only
// framework navigation/image transport and CSS are replaced for plain Node.
function load(relative) {
  const file = path.resolve(root, relative);
  if (modules.has(file)) return modules.get(file);
  const exports = {};
  modules.set(file, exports);
  const nativeRequire = createRequire(file);
  const require = (name) => {
    if (name === 'next/link') return TestLink;
    if (name === 'next/image') return () => null;
    if (name === 'next/navigation') return {
      usePathname: () => currentPath,
      notFound: () => { throw new Error(`Unexpected notFound in ${relative}`); },
    };
    if (name === '@/lib/dataset-evidence.mjs') return datasetEvidence;
    if (name.endsWith('.css')) return {};
    if (name.startsWith('@/') || name.startsWith('.')) {
      const candidate = name.startsWith('@/') ? path.join(root, 'src', name.slice(2)) : path.resolve(path.dirname(file), name);
      const resolved = ['.ts', '.tsx'].map((extension) => `${candidate}${extension}`).find(existsSync);
      if (resolved) return load(resolved);
      if (existsSync(candidate)) return nativeRequire(candidate);
    }
    return nativeRequire(name);
  };
  const { outputText, diagnostics } = ts.transpileModule(readFileSync(file, 'utf8'), {
    fileName: file,
    reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  assert.deepEqual(diagnostics.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error).map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')), [], relative);
  try {
    new Function('exports', 'require', outputText)(exports, require);
  } catch (error) {
    modules.delete(file);
    throw error;
  }
  return exports;
}

function renderRoute(pathname) {
  currentPath = pathname;
  const Page = load(`src/app${pathname}/page.tsx`).default;
  return domino.createDocument(renderToStaticMarkup(createElement(Page)));
}

function ancestor(node, predicate) {
  for (let parent = node.parentElement; parent; parent = parent.parentElement) {
    if (predicate(parent)) return parent;
  }
  return null;
}

function graphNodes(document) {
  const flatten = (node) => Array.isArray(node) ? node.flatMap(flatten) : node?.['@graph'] ? flatten(node['@graph']) : [node];
  return Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap((script) => flatten(JSON.parse(script.textContent)));
}

function contextLinks(document) {
  return Array.from(document.querySelectorAll('p a[href^="/"]')).flatMap((link) => {
    if (ancestor(link, (node) => ['nav', 'header', 'footer', 'aside'].includes(node.localName))) return [];
    const paragraph = ancestor(link, (node) => node.localName === 'p');
    const section = ancestor(link, (node) => node.localName === 'section');
    if (!section || !paragraph || normalize(paragraph.textContent).length - normalize(link.textContent).length < 20) return [];
    return [{ href: link.getAttribute('href'), section }];
  });
}

for (const pathname of definitionPaths) {
  test(`${pathname}: visible FAQ and one FAQPage contain the same 3–6 answers`, () => {
    const document = renderRoute(pathname);
    const faqNodes = graphNodes(document).filter((node) => node?.['@type'] === 'FAQPage');
    assert.equal(faqNodes.length, 1, 'Do not emit duplicate FAQPage nodes');
    const schemaAnswers = faqNodes[0].mainEntity.map((question) => ({
      question: normalize(question.name), answer: normalize(question.acceptedAnswer.text),
    }));
    assert.ok(schemaAnswers.length >= 3 && schemaAnswers.length <= 6, `FAQ count: ${schemaAnswers.length}`);
    assert.equal(new Set(schemaAnswers.map((item) => item.question)).size, schemaAnswers.length);
    const faqHeading = Array.from(document.querySelectorAll('h2')).find((heading) => /\bFAQ\b/i.test(heading.textContent));
    assert.ok(faqHeading, 'Visible FAQ heading is required');
    const faqSection = ancestor(faqHeading, (node) => node.localName === 'section');
    const visibleAnswers = Array.from(faqSection.querySelectorAll('h3')).map((heading) => {
      const item = ancestor(heading, (node) => ['section', 'article'].includes(node.localName));
      return { question: normalize(heading.textContent), answer: normalize(item.querySelector('p')?.textContent ?? '') };
    });
    assert.deepEqual(visibleAnswers, schemaAnswers, 'Rendered answers and schema must stay in sync');
  });

  test(`${pathname}: limitations retain at least three concrete, cited boundaries`, () => {
    const document = renderRoute(pathname);
    const heading = Array.from(document.querySelectorAll('h2')).find((node) => /challenges\s*&\s*limitations/i.test(node.textContent));
    assert.ok(heading, 'A visible limitations section is required');
    const section = ancestor(heading, (node) => node.localName === 'section');
    if (pathname === '/technology') {
      const items = Array.from(section.querySelectorAll('article'));
      assert.ok(items.length >= 3);
      for (const item of items) {
        assert.ok(item.querySelector('h3') && item.querySelector('p'));
        assert.ok(item.querySelector('a[href^="https://"]'), 'Each technical limitation needs a source');
      }
    } else {
      const page = load('src/content/seo-topic-pages.ts').getSeoTopicPage(pathname);
      const limitations = page.sections.find((item) => /challenges\s*&\s*limitations/i.test(item.heading));
      assert.ok(limitations.body.length >= 3);
      const paragraphs = Array.from(section.querySelectorAll('p'), (node) => normalize(node.textContent));
      for (const boundary of limitations.body) assert.ok(paragraphs.includes(normalize(boundary)), 'Declared limitations must render');
      assert.ok(section.querySelector('a[href^="https://"]'), 'Limitations must retain the cited primary evidence');
    }
  });
}

for (const pathname of [...definitionPaths, ...workflowPaths]) {
  test(`${pathname}: contextual internal links are distributed across at least three sections`, () => {
    const links = contextLinks(renderRoute(pathname));
    assert.ok(new Set(links.map(({ section }) => section)).size >= 3, 'Three links in one block or navigation do not satisfy contextual discovery');
    assert.ok(new Set(links.map(({ href }) => new URL(href, 'https://roboskin.ai').pathname)).size >= 3, 'Context should connect distinct useful destinations');
  });
}

test('dataset selection, sensor comparison and ROS 2 practice form a contextual reading loop', () => {
  for (const pathname of workflowPaths) {
    const targets = new Set(contextLinks(renderRoute(pathname)).map(({ href }) => new URL(href, 'https://roboskin.ai').pathname));
    for (const other of workflowPaths.filter((target) => target !== pathname)) {
      assert.ok(targets.has(other), `${pathname} needs a contextual route to ${other}`);
    }
  }
});

test('ROMI-2K announcements and model files do not become public dataset or license claims', async () => {
  const { tactileDatasetEntries } = load('src/lib/tactile-datasets.ts');
  const entry = tactileDatasetEntries.find((item) => item.id === 'romi-2k');
  assert.ok(entry, 'ROMI-2K must retain a distinct dataset record');
  const evidence = datasetEvidence.getDatasetEvidence(entry);
  assert.equal(evidence.access, 'announced');
  assert.equal(evidence.licenseStatus, 'unknown');
  assert.equal(evidence.dataLicenseUrl, undefined, 'Model-directory terms must not become a dataset license');
  const summary = datasetEvidence.summarizeDatasetEvidence([entry]);
  assert.equal(summary.access['public-files'] ?? 0, 0);
  assert.equal(summary.licenseDocumented, 0);
  const schema = load('src/lib/seo.ts').buildTactileDatasetsJsonLd([entry]);
  const dataset = schema['@graph'].find((node) => node['@type'] === 'Dataset');
  assert.ok(dataset);
  assert.equal(dataset.license, undefined);
  assert.equal(dataset.distribution, undefined, 'A model manifest or demo scene is not a complete dataset download');
  const response = await load('src/app/datasets.json/route.ts').GET().json();
  const exported = response.entries.find((item) => item.id === entry.id);
  assert.deepEqual(exported.evidence, evidence, 'Public JSON must preserve the same access and license boundary');
});
