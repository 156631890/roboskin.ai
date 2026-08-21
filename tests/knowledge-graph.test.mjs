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
    'researchOrganizationEntries',
    'robotAiOrganizationRelations',
  ]) {
    assert.match(graph, new RegExp(`\\b${source}\\b`));
  }

  assert.match(graph, /function researchEntityType/);
  assert.match(graph, /case 'institutional':[\s\S]*?throw new Error/);
  assert.match(graph, /researchIndex: researchEntities\.length/);
  assert.match(graph, /papers,/);
  assert.match(graph, /documentation,/);
  assert.match(graph, /sourceDocuments: sources\.length/);
  assert.match(graph, /normalizeSourceUrl/);
  assert.match(graph, /createHash\('sha256'\)/);
  assert.match(graph, /relation: 'supportedBy'/);
  assert.match(graph, /relation: 'benchmarkedBy'/);
  assert.match(graph, /organizationModelRelationTypes/);
  assert.match(graph, /evidenceSourceIds/);
  assert.match(graph, /must connect a model to an organization/);
  assert.match(graph, /uses an unsupported relation/);
  assert.match(graph, /validateKnowledgeGraph/);
  assert.match(graph, /Source URLs must be deduplicated/);
  assert.match(graph, /Edge starts at missing entity/);
  assert.match(graph, /placeholderEntityName/);
  assert.match(graph, /type:\s*'organization'/);
});

test('knowledge graph JSON is a protected deterministic static output outside the HTML sitemap', async () => {
  const [route, verifier, sitemap, contractJson] = await Promise.all([
    read('src/app/knowledge-graph.json/route.ts'),
    read('scripts/verify-export.mjs'),
    read('src/app/sitemap.ts'),
    read('config/knowledge-graph-contract.json'),
  ]);
  const contract = JSON.parse(contractJson);

  assert.match(route, /dynamic = 'force-static'/);
  assert.match(route, /JSON\.stringify\(knowledgeGraph, null, 2\)/);
  assert.match(route, /application\/json; charset=utf-8/);
  assert.match(verifier, /knowledge-graph\.json/);
  assert.match(verifier, /knowledge-graph-contract\.json/);
  assert.match(verifier, /graph\.version !== knowledgeGraphContract\.version/);
  assert.match(verifier, /Object\.entries\(knowledgeGraphContract\.counts\)/);
  assert.doesNotMatch(verifier, /const expectedGraphCounts/);
  assert.match(verifier, /knowledge graph JSON must not be listed as an HTML page/);
  assert.equal(typeof contract.version, 'string');
  assert.ok(contract.version.length > 0);
  assert.ok(Object.values(contract.counts).every((count) => Number.isInteger(count) && count > 0));
  assert.equal(contract.counts.knowledgeEntities, contract.counts.researchEntities + contract.counts.organizations);
  assert.equal(contract.counts.researchIndex, contract.counts.papers + contract.counts.documentation);
  assert.equal(contract.counts.edges, contract.counts.supportedByEdges + contract.counts.benchmarkedByEdges + contract.counts.organizationRelationEdges);
  assert.equal(contract.counts.organizationRelationEdges, contract.counts.developedByEdges + contract.counts.coDevelopedByEdges + contract.counts.contributedByEdges);
  assert.doesNotMatch(sitemap, /knowledge-graph\.json/);
});

test('directory rows expose stable fragment targets without creating thin entity pages', async () => {
  const [datasets, benchmarks, sensors, models, organizations] = await Promise.all([
    read('src/components/TactileDatasetExplorer.tsx'),
    read('src/components/TactileBenchmarkExplorer.tsx'),
    read('src/components/TactileSensorExplorer.tsx'),
    read('src/components/RobotAiModelExplorer.tsx'),
    read('src/app/organizations/page.tsx'),
  ]);

  assert.match(datasets, /id=\{`dataset-\$\{entry\.id\}`\}/);
  assert.match(benchmarks, /id=\{`benchmark-\$\{entry\.id\}`\}/);
  assert.match(sensors, /id=\{`sensor-\$\{entry\.id\}`\}/);
  assert.match(models, /id=\{`model-\$\{entry\.id\}`\}/);
  assert.match(organizations, /id=\{`organization-\$\{organization\.id\}`\}/);
});
