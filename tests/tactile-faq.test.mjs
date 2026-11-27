import assert from 'node:assert/strict';
import test from 'node:test';
import { createWindow } from '@mixmark-io/domino';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createTypeScriptLoader } from '../scripts/lib/load-typescript.mjs';

const load = createTypeScriptLoader();
const { faqItems: originalItems } = load('src/content/site.ts');
const { default: FaqPage, metadata } = load('src/app/faq/page.tsx');

test('the FAQ serves 50 distinct answers in linked sections, with its 13 original answers intact', () => {
  const html = renderToStaticMarkup(createElement(FaqPage));
  const { document } = createWindow(html);
  assert.equal(document.querySelectorAll('h1').length, 1);

  const sections = [...document.querySelectorAll('nav[aria-label="Question topics"] a')];
  assert.equal(sections.length, 6);
  for (const link of sections) {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    assert.equal(target?.querySelector('h2')?.id, target?.getAttribute('aria-labelledby'));
    assert.ok(target?.querySelector('h2')?.textContent.trim());
  }

  const entries = [...document.querySelectorAll('section article[id]')];
  assert.equal(entries.length, 50);
  assert.equal(new Set(entries.map((entry) => entry.id)).size, 50);
  assert.equal(new Set(entries.map((entry) => entry.querySelector('h3').textContent)).size, 50);
  for (const entry of entries) {
    assert.equal(entry.querySelector('h3 a').getAttribute('href'), `#${entry.id}`);
    assert.ok(entry.querySelector('p').textContent.trim().length > 75);
    assert.match(entry.querySelector('li a').getAttribute('href'), /^\//);
    assert.equal(document.getElementById(entry.id), entry);
  }

  assert.equal(originalItems.length, 13);
  for (const original of originalItems) {
    const entry = document.getElementById(original.id);
    assert.equal(entry?.querySelector('h3').textContent, original.question);
    assert.equal(entry?.querySelector('p').textContent, original.answer);
    assert.equal(entry?.querySelector('li a').getAttribute('href'), original.href);
  }
  for (const originalLink of ['/contact', '/contact?requestType=research', '/research', '/products']) {
    assert.ok(document.querySelector(`a[href="${originalLink}"]`));
  }
  assert.ok(document.getElementById('use-these-answers')?.querySelector('table'));
  assert.ok(document.querySelector('figure img'));

  const graph = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@graph'];
  assert.deepEqual(graph.find((node) => node['@type'] === 'FAQPage').mainEntity.map((item) => [
    item.name, item.acceptedAnswer.text,
  ]), entries.map((entry) => [
    entry.querySelector('h3').textContent, entry.querySelector('p').textContent,
  ]));
  assert.ok(graph.some((node) => node['@type'] === 'BreadcrumbList'));
  assert.equal(metadata.alternates.canonical, 'https://roboskin.ai/faq');
  assert.equal(metadata.robots.index, true);
});
