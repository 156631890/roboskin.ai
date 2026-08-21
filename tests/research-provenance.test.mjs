import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('research organizations keep the eleven new identities separate and source bounded', async () => {
  const source = await read('src/lib/research-organizations.ts');
  const entries = source.match(/researchOrganizationEntries:[\s\S]*?= \[([\s\S]*?)\n\];\n\ntype ModelRelationPolicy/)?.[1] ?? '';

  for (const id of [
    'shanghaitech-university',
    'tsinghua-university',
    'tu-dresden',
    'scads-ai-dresden-leipzig',
    'lasr-lab',
    'beihang-university',
    'zhejiang-university',
    'university-of-michigan',
    'mmint-lab',
    'university-of-bristol',
    'bristol-robotics-laboratory',
  ]) {
    assert.match(entries, new RegExp(`id: '${id}'`));
  }

  assert.ok([...entries.matchAll(/\n\s+id: '/g)].length >= 23);
  assert.match(entries, /id: 'lasr-lab',[\s\S]*?kind: 'research lab',[\s\S]*?officialUrl: 'https:\/\/lasr\.org\/'/);
  assert.match(entries, /id: 'mmint-lab',[\s\S]*?kind: 'research lab',[\s\S]*?https:\/\/www\.mmintlab\.com\/people\/nima-fazeli\//);
  assert.match(entries, /id: 'bristol-robotics-laboratory',[\s\S]*?kind: 'research lab',[\s\S]*?joint research partnership of UWE Bristol and the University of Bristol/);
  assert.doesNotMatch(entries, /id: 'lasr-lab',[\s\S]*?aliases: \[[^\]]*TU Dresden[^\]]*\]/);
  assert.doesNotMatch(entries, /id: 'mmint-lab',[\s\S]*?aliases: \[[^\]]*University of Michigan[^\]]*\]/);
  assert.doesNotMatch(entries, /id: 'bristol-robotics-laboratory',[\s\S]*?aliases: \[[^\]]*University of Bristol[^\]]*\]/);
});

test('research provenance exposes only the four strict evidence-backed relation types', async () => {
  const source = await read('src/lib/research-entity-relations.ts');

  assert.match(source, /researchEntityRelationTypes = \[[\s\S]*?'sourceAffiliation'[\s\S]*?'partOf'[\s\S]*?'usesSensor'[\s\S]*?'usesRobot'[\s\S]*?\] as const/);
  assert.match(source, /type EvidenceFields = \{[\s\S]*?evidenceUrls: string\[\][\s\S]*?sourceLabels: string\[\][\s\S]*?evidenceBoundary: string[\s\S]*?sourceReviewed: string/);
  assert.match(source, /fromType: SourceAffiliationEntityType[\s\S]*?toType: 'organization'/);
  assert.match(source, /fromType: 'organization'[\s\S]*?toType: 'organization'/);
  assert.match(source, /fromType: 'dataset'[\s\S]*?toType: 'sensor' \| 'robot'/);
  assert.match(source, /Duplicate research-entity relation/);
  assert.match(source, /availablePrimarySources\.has\(evidenceUrl\)/);
  assert.match(source, /is not a primary source for/);
});

test('source affiliation batches preserve labels, primary sources, and conservative boundaries', async () => {
  const source = await read('src/lib/research-entity-relations.ts');

  for (const id of [
    'softvtbench-deformation-aware-visuo-tactile-dataset-2026',
    'softvtbench',
    'ht-bench-full-hand-tactile-representations-2026',
    'ht-bench',
    'tactidex-tactile-guided-dexterous-benchmark-2026',
    'tactidex',
    'rct',
    'vtdexmanip',
    'touch-and-go',
    'gelslim-4',
    'tactip',
  ]) {
    assert.match(source, new RegExp(`'${id}'`));
  }

  for (const id of [
    'beihang-university',
    'tsinghua-university',
    'carnegie-mellon-university',
    'zhejiang-university',
    'shanghaitech-university',
    'tu-dresden',
    'scads-ai-dresden-leipzig',
    'lasr-lab',
    'university-of-michigan',
    'mmint-lab',
    'university-of-bristol',
    'bristol-robotics-laboratory',
  ]) {
    assert.match(source, new RegExp(`organizationId: '${id}'`));
  }

  assert.match(source, /https:\/\/arxiv\.org\/abs\/2608\.18701/);
  assert.match(source, /currently normalized subset of the SoftVTBench paper/);
  assert.match(source, /larger author-affiliation list/);
  assert.match(source, /not a complete organization roster/);
  assert.match(source, /deferredConcurrentSources = new Set\([\s\S]*?'paper:softvtbench-deformation-aware-visuo-tactile-dataset-2026'[\s\S]*?'dataset:softvtbench'[\s\S]*?'benchmark:softvtbench'/);
  assert.doesNotMatch(source, /https:\/\/arxiv\.org\/abs\/2607\.04234/);
});

test('partOf edges keep only directly supported lab relationships', async () => {
  const source = await read('src/lib/research-entity-relations.ts');
  const partOf = source.match(/researchOrganizationPartOfRelations:[\s\S]*?= \[([\s\S]*?)\n\];\n\nexport const researchDatasetUsageRelations/)?.[1] ?? '';

  assert.equal([...partOf.matchAll(/relation: 'partOf'/g)].length, 2);
  assert.match(partOf, /fromId: 'lasr-lab',[\s\S]*?toId: 'tu-dresden'/);
  assert.match(partOf, /fromId: 'mmint-lab',[\s\S]*?toId: 'university-of-michigan'[\s\S]*?https:\/\/www\.mmintlab\.com\/people\/nima-fazeli\//);
  assert.doesNotMatch(partOf, /bristol-robotics-laboratory|university-of-bristol/);
});

test('dataset usage edges distinguish sensor use from simulation-only embodiment', async () => {
  const source = await read('src/lib/research-entity-relations.ts');
  const usage = source.match(/researchDatasetUsageRelations:[\s\S]*?= \[([\s\S]*?)\n\];\n\nexport const researchEntityRelations/)?.[1] ?? '';

  for (const pair of [
    ["fromId: 'rct'", "toId: 'digit'"],
    ["fromId: 'sparsh-x'", "toId: 'digit-360'"],
    ["fromId: 'tvl'", "toId: 'digit'"],
    ["fromId: 'softvtbench'", "toId: 'gelsight-mini'"],
  ]) {
    const start = usage.indexOf(pair[0]);
    assert.notEqual(start, -1);
    assert.match(usage.slice(start), new RegExp(pair[1]));
  }

  assert.equal([...usage.matchAll(/relation: 'usesSensor'/g)].length, 4);
  assert.equal([...usage.matchAll(/relation: 'usesRobot'/g)].length, 1);
  assert.match(usage, /fromId: 'softvtbench',[\s\S]*?toId: 'franka-emika-panda'[\s\S]*?simulation-only embodiment relation/);
  assert.match(usage, /does not use a physical GelSight Mini/);
});
