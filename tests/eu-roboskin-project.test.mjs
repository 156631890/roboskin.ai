import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('the EU ROBOSKIN project has a crawlable source-backed route', async () => {
  const [route, topics] = await Promise.all([
    read('src/app/research/eu-roboskin-project/page.tsx'),
    read('src/content/seo-topic-pages.ts'),
  ]);

  assert.match(route, /getSeoTopicPage\('\/research\/eu-roboskin-project'\)/);
  assert.match(route, /buildSeoTopicMetadata/);
  assert.match(topics, /path: '\/research\/eu-roboskin-project'/);
  assert.match(topics, /FP7-231500/);
  assert.match(topics, /1 May 2009 to 30 April 2012/);
  assert.match(topics, /RoboSkin\.ai did not participate in the FP7 project/);
  assert.match(topics, /https:\/\/cordis\.europa\.eu\/project\/id\/231500/);
  assert.match(topics, /https:\/\/link\.springer\.com\/chapter\/10\.1007\/978-3-7091-1379-0_43/);
});

test('the historical project record receives multiple internal links', async () => {
  const [topics, researchPage] = await Promise.all([
    read('src/content/seo-topic-pages.ts'),
    read('src/app/research/page.tsx'),
  ]);
  const combined = `${topics}\n${researchPage}`;
  const links = combined.match(/href: '\/research\/eu-roboskin-project'/g) ?? [];

  assert.ok(links.length >= 3, `expected at least three internal links, found ${links.length}`);
});

