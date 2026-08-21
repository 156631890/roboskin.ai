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
    'robotAiModelEntries',
    'researchOrganizationEntries',
    'robotAiOrganizationRelations',
    'researchIndexEntries',
    'blogPosts',
    'newsPosts',
  ]) {
    assert.match(generatorSource, new RegExp(`\\b${source}\\b`));
  }
  assert.match(generatorSource, /Interpretation and Citation Rules/);
  assert.match(generatorSource, /Evidence boundary/);
  assert.match(generatorSource, /Primary source/);
  assert.match(generatorSource, /Robot AI model records/);
  assert.match(generatorSource, /## Robot AI Models/);
  assert.match(generatorSource, /## Verified Robot AI Research Organizations/);
  assert.match(generatorSource, /Verified model-organization relations/);
  assert.match(generatorSource, /relation\.evidenceUrls/);
  assert.match(generatorSource, /knowledge-graph\.json/);
});

test('curated llms file and homepage head expose machine-readable discovery', () => {
  assert.match(llmsSource, /https:\/\/roboskin\.ai\/llms-full\.txt/);
  assert.match(llmsSource, /https:\/\/roboskin\.ai\/research-index\.json/);
  assert.match(llmsSource, /https:\/\/roboskin\.ai\/knowledge-graph\.json/);
  assert.match(llmsSource, /79 source-reviewed knowledge entities/);
  assert.match(llmsSource, /22 papers, 1 documentation record, 12 datasets, 9 benchmarks, 13 sensors, 10 robot AI models, and 12 verified organizations/);
  assert.match(llmsSource, /115 deduplicated primary and official source records/);
  assert.match(llmsSource, /20 evidence-backed model-organization relations/);
  assert.match(llmsSource, /https:\/\/roboskin\.ai\/organizations/);
  assert.match(llmsSource, /863,040 EIT electrode configurations from 1,726,080 amplitude-and-phase channels/);
  assert.doesNotMatch(
    llmsSource,
    /single-material-soft-robotic-skin-2025\):[^\n]*\bpressure\b/i,
  );
  assert.match(layoutSource, /rel="describedby" type="text\/markdown" href="\/llms\.txt"/);
});
