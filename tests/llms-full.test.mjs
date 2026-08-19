import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const routeSource = await readFile(new URL('../src/app/llms-full.txt/route.ts', import.meta.url), 'utf8');
const generatorSource = await readFile(new URL('../src/lib/llms-full.ts', import.meta.url), 'utf8');
const llmsSource = await readFile(new URL('../public/llms.txt', import.meta.url), 'utf8');
const layoutSource = await readFile(new URL('../src/app/layout.tsx', import.meta.url), 'utf8');

test('llms-full route is statically generated as UTF-8 plain text', () => {
  assert.match(routeSource, /dynamic\s*=\s*['"]force-static['"]/);
  assert.match(routeSource, /buildLlmsFullText\(\)/);
  assert.match(routeSource, /text\/plain; charset=utf-8/);
});

test('llms-full generator uses the shared knowledge sources', () => {
  for (const source of [
    'seoTopicPages',
    'glossaryTerms',
    'tactileDatasetEntries',
    'tactileBenchmarkEntries',
    'tactileSensorEntries',
    'researchIndexEntries',
    'blogPosts',
    'newsPosts',
  ]) {
    assert.match(generatorSource, new RegExp(`\\b${source}\\b`));
  }
  assert.match(generatorSource, /Interpretation and Citation Rules/);
  assert.match(generatorSource, /Evidence boundary/);
  assert.match(generatorSource, /Primary source/);
});

test('curated llms file and homepage head expose machine-readable discovery', () => {
  assert.match(llmsSource, /https:\/\/roboskin\.ai\/llms-full\.txt/);
  assert.match(llmsSource, /https:\/\/roboskin\.ai\/research-index\.json/);
  assert.match(layoutSource, /rel="describedby" type="text\/markdown" href="\/llms\.txt"/);
});
