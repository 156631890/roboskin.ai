import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('knowledge graph is built from the existing reviewed collections with honest types', async () => {
  const graph = await read('src/lib/knowledge-graph.ts');

  for (const source of [
    'researchIndexEntries',
    'tactileDatasetEntries',
    'tactileBenchmarkEntries',
    'tactileSensorEntries',
    'robotAiModelEntries',
  ]) {
    assert.match(graph, new RegExp(`\\b${source}\\b`));
  }

  assert.match(graph, /entry\.evidence === 'documentation' \? 'documentation' : 'paper'/);
  assert.match(graph, /researchIndex: researchEntities\.length/);
  assert.match(graph, /papers,/);
  assert.match(graph, /documentation,/);
  assert.match(graph, /sourceDocuments: sources\.length/);
  assert.match(graph, /normalizeSourceUrl/);
  assert.match(graph, /createHash\('sha256'\)/);
  assert.match(graph, /relation: 'supportedBy'/);
  assert.match(graph, /relation: 'benchmarkedBy'/);
  assert.match(graph, /validateKnowledgeGraph/);
  assert.match(graph, /Source URLs must be deduplicated/);
  assert.match(graph, /Edge starts at missing entity/);
  assert.match(graph, /placeholderEntityName/);
  assert.doesNotMatch(graph, /type:\s*'organization'/);
});

test('knowledge graph JSON is a protected deterministic static output outside the HTML sitemap', async () => {
  const [route, verifier, sitemap] = await Promise.all([
    read('src/app/knowledge-graph.json/route.ts'),
    read('scripts/verify-export.mjs'),
    read('src/app/sitemap.ts'),
  ]);

  assert.match(route, /dynamic = 'force-static'/);
  assert.match(route, /JSON\.stringify\(knowledgeGraph, null, 2\)/);
  assert.match(route, /application\/json; charset=utf-8/);
  assert.match(verifier, /knowledge-graph\.json/);
  assert.match(verifier, /researchEntities: 67/);
  assert.match(verifier, /papers: 22/);
  assert.match(verifier, /documentation: 1/);
  assert.match(verifier, /sourceDocuments/);
  assert.match(verifier, /knowledge graph JSON must not be listed as an HTML page/);
  assert.doesNotMatch(sitemap, /knowledge-graph\.json/);
});

test('directory rows expose stable fragment targets without creating entity pages', async () => {
  const [datasets, benchmarks, sensors, models] = await Promise.all([
    read('src/components/TactileDatasetExplorer.tsx'),
    read('src/components/TactileBenchmarkExplorer.tsx'),
    read('src/components/TactileSensorExplorer.tsx'),
    read('src/components/RobotAiModelExplorer.tsx'),
  ]);

  assert.match(datasets, /id=\{`dataset-\$\{entry\.id\}`\}/);
  assert.match(benchmarks, /id=\{`benchmark-\$\{entry\.id\}`\}/);
  assert.match(sensors, /id=\{`sensor-\$\{entry\.id\}`\}/);
  assert.match(models, /id=\{`model-\$\{entry\.id\}`\}/);
});
