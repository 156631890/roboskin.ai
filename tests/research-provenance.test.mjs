import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('research organizations keep normalized university and lab identities separate and source bounded', async () => {
  const source = await read('src/lib/research-organizations.ts');
  const entries = source.match(/researchOrganizationEntries:[\s\S]*?= \[([\s\S]*?)\n\];\n\ntype ModelRelationPolicy/)?.[1] ?? '';

  for (const id of [
    'peking-university',
    'northwestern-university',
    'northwestern-center-for-robotics-and-biosystems',
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

  assert.ok([...entries.matchAll(/\n\s+id: '/g)].length >= 26);
  assert.match(entries, /id: 'peking-university',[\s\S]*?kind: 'university',[\s\S]*?https:\/\/english\.pku\.edu\.cn\/about\.html/);
  assert.match(entries, /id: 'northwestern-university',[\s\S]*?kind: 'university',[\s\S]*?https:\/\/www\.northwestern\.edu\/about\//);
  assert.match(entries, /id: 'northwestern-center-for-robotics-and-biosystems',[\s\S]*?kind: 'research lab',[\s\S]*?https:\/\/robotics\.northwestern\.edu\//);
  assert.match(entries, /id: 'lasr-lab',[\s\S]*?kind: 'research lab',[\s\S]*?officialUrl: 'https:\/\/lasr\.org\/'/);
  assert.match(entries, /id: 'mmint-lab',[\s\S]*?kind: 'research lab',[\s\S]*?https:\/\/www\.mmintlab\.com\/people\/nima-fazeli\//);
  assert.match(entries, /id: 'bristol-robotics-laboratory',[\s\S]*?kind: 'research lab',[\s\S]*?joint research partnership of UWE Bristol and the University of Bristol/);
  assert.doesNotMatch(entries, /id: 'lasr-lab',[\s\S]*?aliases: \[[^\]]*TU Dresden[^\]]*\]/);
  assert.doesNotMatch(entries, /id: 'mmint-lab',[\s\S]*?aliases: \[[^\]]*University of Michigan[^\]]*\]/);
  assert.doesNotMatch(entries, /id: 'bristol-robotics-laboratory',[\s\S]*?aliases: \[[^\]]*University of Bristol[^\]]*\]/);
});

test('research relations separate strict provenance from the v2 semantic vocabulary', async () => {
  const source = await read('src/lib/research-entity-relations.ts');

  assert.match(source, /researchProvenanceRelationTypes = \[[\s\S]*?'sourceAffiliation'[\s\S]*?'partOf'[\s\S]*?'usesSensor'[\s\S]*?'usesRobot'[\s\S]*?\] as const/);
  assert.match(source, /researchSemanticRelationTypes = \[[\s\S]*?'introduces'[\s\S]*?'describesDataset'[\s\S]*?'usesDataset'[\s\S]*?'trainedOn'[\s\S]*?'evaluatedBy'[\s\S]*?\] as const/);
  assert.match(source, /researchEntityRelationVocabulary: ResearchEntityRelationDefinition\[\]/);
  assert.match(source, /type EvidenceFields = \{[\s\S]*?evidenceUrls: string\[\][\s\S]*?sourceLabels: string\[\][\s\S]*?evidenceBoundary: string[\s\S]*?sourceReviewed: string/);
  assert.match(source, /fromType: SourceAffiliationEntityType[\s\S]*?toType: 'organization'/);
  assert.match(source, /fromType: 'organization'[\s\S]*?toType: 'organization'/);
  assert.match(source, /relation: 'usesSensor'[\s\S]*?fromType: 'paper' \| 'dataset'[\s\S]*?toType: 'sensor'/);
  assert.match(source, /relation: 'usesDataset'[\s\S]*?fromType: 'model'[\s\S]*?toType: 'dataset'/);
  assert.match(source, /Duplicate research-entity relation/);
  assert.match(source, /availablePrimarySources\.has\(evidenceUrl\)/);
  assert.match(source, /is not a primary source for/);
});

test('source affiliation batches preserve labels, primary sources, and conservative boundaries', async () => {
  const source = await read('src/lib/research-entity-relations.ts');

  for (const id of [
    'prism-contact-rich-industrial-skill-dataset-2026',
    'prism-industrial-skill',
    'missing-touch-spatial-tactile-feedback-teleoperation-2026',
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
    'peking-university',
    'northwestern-university',
    'northwestern-center-for-robotics-and-biosystems',
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
  assert.doesNotMatch(source, /deferredConcurrentSources|if \(deferredConcurrentSources\.has\(sourceKey\)\) continue/);
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

test('dataset usage edges distinguish sensor use, physical embodiments, and simulation-only embodiments', async () => {
  const source = await read('src/lib/research-entity-relations.ts');
  const usage = source.match(/researchDatasetUsageRelations:[\s\S]*?= \[([\s\S]*?)\n\];\n\nexport const researchPaperSensorRelations/)?.[1] ?? '';

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
  assert.equal([...usage.matchAll(/relation: 'usesRobot'/g)].length, 5);
  assert.match(usage, /fromId: 'droid',[\s\S]*?toId: 'franka-emika-panda'[\s\S]*?complete collection platform also includes the named Robotiq gripper/);
  assert.match(usage, /fromId: 'bridgedata-v2',[\s\S]*?toId: 'trossen-widowx-250-6dof'[\s\S]*?does not imply that every trajectory contains every optional camera/);
  assert.match(usage, /fromId: 'prism-industrial-skill',[\s\S]*?toId: 'franka-emika-panda'[\s\S]*?two physical Franka Emika Panda arms/);
  assert.match(usage, /fromId: 'robotacdex',[\s\S]*?toId: 'unitree-g1'[\s\S]*?one physical Unitree G1[\s\S]*?does not imply whole-body locomotion data/);
  assert.match(usage, /fromId: 'softvtbench',[\s\S]*?toId: 'franka-emika-panda'[\s\S]*?simulation-only embodiment relation/);
  assert.match(usage, /does not use a physical GelSight Mini/);
});

test('paper sensor edges preserve the two GenForce sensors and the Missing Touch GelSight Mini setup', async () => {
  const source = await read('src/lib/research-entity-relations.ts');
  const relations = source.match(/researchPaperSensorRelations:[\s\S]*?= \[([\s\S]*?)\n\];\n\nexport const researchSemanticRelations/)?.[1] ?? '';

  assert.equal([...relations.matchAll(/relation: 'usesSensor'/g)].length, 3);
  assert.match(relations, /fromId: 'missing-touch-spatial-tactile-feedback-teleoperation-2026'[\s\S]*?toId: 'gelsight-mini'/);
  assert.match(relations, /fromId: 'genforce-transferable-force-sensing-2026'[\s\S]*?toId: 'tactip'/);
  assert.match(relations, /fromId: 'genforce-transferable-force-sensing-2026'[\s\S]*?toId: 'uskin'/);
  assert.match(relations, /https:\/\/www\.nature\.com\/articles\/s41467-026-68753-1/);
  assert.doesNotMatch(relations, /digit-360/);
});
