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
    'researchEntityRelations',
    'researchEntityRelationVocabulary',
    'researchProvenanceRelations',
    'researchSemanticRelations',
    'researchPaperSensorRelations',
    'researchSourceAffiliationRelations',
    'researchOrganizationPartOfRelations',
    'researchDatasetUsageRelations',
    'researchRobotEntries',
    'robotAiRobotRelations',
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
  assert.match(generatorSource, /Verified robot-platform records/);
  assert.match(generatorSource, /Verified model-robot relations/);
  assert.match(generatorSource, /## Verified Robot Platforms and Embodiments/);
  assert.match(generatorSource, /## Knowledge Graph v2 Relationship Vocabulary/);
  assert.match(generatorSource, /## Evidence-Backed Research Entity Relations/);
  assert.match(generatorSource, /Source-listed research affiliations/);
  assert.match(generatorSource, /Verified organization hierarchy relations/);
  assert.match(generatorSource, /Verified dataset sensor or robot relations/);
  assert.match(generatorSource, /Verified paper-sensor relations/);
  assert.match(generatorSource, /Research semantic relations/);
  assert.match(generatorSource, /introduces relations/);
  assert.match(generatorSource, /describesDataset relations/);
  assert.match(generatorSource, /usesDataset relations/);
  assert.match(generatorSource, /trainedOn relations/);
  assert.match(generatorSource, /evaluatedBy relations/);
  assert.match(generatorSource, /evaluatedOn requires explicit experiments/);
  assert.match(generatorSource, /trainedAcross requires explicit training-mixture evidence/);
  assert.match(generatorSource, /demonstratedOn records a source-backed demonstration/);
  assert.match(generatorSource, /relation\.evidenceUrls/);
  assert.match(generatorSource, /canonicalUrl\(`\/robots#robot-\$\{robot\.id\}`\)/);
  assert.match(generatorSource, /knowledge-graph\.json/);
});

test('curated llms file and homepage head expose machine-readable discovery', () => {
  assert.match(llmsSource, /https:\/\/roboskin\.ai\/llms-full\.txt/);
  assert.match(llmsSource, /https:\/\/roboskin\.ai\/research-index\.json/);
  assert.match(llmsSource, /https:\/\/roboskin\.ai\/knowledge-graph\.json/);
  assert.match(llmsSource, /104 source-reviewed knowledge entities/);
  assert.match(llmsSource, /23 papers, 1 documentation record, 13 datasets, 10 benchmarks, 13 sensors, 10 robot AI models, 23 verified organizations, and 11 normalized robot-platform records/);
  assert.match(llmsSource, /144 deduplicated primary and official source records/);
  assert.match(llmsSource, /20 model-organization relations/);
  assert.match(llmsSource, /22 model-robot relations/);
  assert.match(llmsSource, /46 research-provenance relations, and 11 semantic entity relations/);
  assert.match(llmsSource, /https:\/\/roboskin\.ai\/organizations/);
  assert.match(llmsSource, /https:\/\/roboskin\.ai\/robots/);
  assert.match(llmsSource, /863,040 EIT electrode configurations from 1,726,080 amplitude-and-phase channels/);
  assert.doesNotMatch(
    llmsSource,
    /single-material-soft-robotic-skin-2025\):[^\n]*\bpressure\b/i,
  );
  assert.match(layoutSource, /rel="describedby" type="text\/markdown" href="\/llms\.txt"/);
});
