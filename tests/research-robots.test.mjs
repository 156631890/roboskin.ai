import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('robot platform records preserve exact, family, and undisclosed hardware boundaries', async () => {
  const source = await read('src/lib/research-robots.ts');
  const entryBlock = source.match(/researchRobotEntries:[\s\S]*?= \[([\s\S]*?)\n\];\n\nexport const robotAiRobotRelations/)?.[1] ?? '';
  const relationBlock = source.match(/robotAiRobotRelations:[\s\S]*?= \[([\s\S]*?)\n\];\n\nconst validDate/)?.[1] ?? '';

  assert.equal([...entryBlock.matchAll(/\n\s+id: '/g)].length, 11);
  assert.equal([...relationBlock.matchAll(/\n\s+modelId: '/g)].length, 22);
  for (const id of [
    'apptronik-apollo-2',
    'franka-duo',
    'fourier-gr-1',
    '1x-humanoid-family',
    'franka-emika-panda',
    'universal-robots-ur5e',
    'trossen-viperx-family',
    'trossen-widowx-250-6dof',
    'google-rt-mobile-manipulator',
    'palm-e-mobile-manipulator',
    'language-table-setup',
  ]) {
    assert.match(entryBlock, new RegExp(`id: '${id}'`));
  }

  assert.match(source, /robotModelRelationTypes = \[[\s\S]*?'evaluatedOn'[\s\S]*?'trainedAcross'[\s\S]*?'demonstratedOn'/);
  assert.match(source, /sourceEmbodimentLabels/);
  assert.match(source, /evidenceUrls/);
  assert.match(source, /is not a primary source for model/);
  assert.match(source, /is not an embodiment label for model/);
  assert.match(source, /Robot .* has no verified model relation/);
  assert.match(source, /does not resolve the GR00T N1 demonstration to NEO, EVE, NEO Beta, NEO Gamma/);
  assert.match(source, /does not disclose an exact ViperX product code/);
  assert.match(source, /UR5 and UR5e are not treated as interchangeable/);
  assert.match(relationBlock, /modelId: 'isaac-gr00t-n1',[\s\S]*?robotId: 'fourier-gr-1',[\s\S]*?relation: 'trainedAcross'/);
  assert.match(relationBlock, /pretraining uses the authors’ GR-1 humanoid data/);
  assert.doesNotMatch(entryBlock, /aliases:\s*\[[^\]]*'ViperX-300'/);
  assert.doesNotMatch(entryBlock, /aliases:\s*\[[^\]]*'NEO'/);
});

test('robot directory is indexable, structured, and internally connected without thin entity pages', async () => {
  const [page, schema, seo, protectedUrls, sitemap, modelExplorer, modelPage] = await Promise.all([
    read('src/app/robots/page.tsx'),
    read('src/lib/research-robot-schema.ts'),
    read('src/lib/seo.ts'),
    read('config/protected-urls.json'),
    read('src/app/sitemap.ts'),
    read('src/components/RobotAiModelExplorer.tsx'),
    read('src/app/robot-foundation-models/page.tsx'),
  ]);

  assert.match(page, /buildPageMetadata\('\/robots'\)/);
  assert.match(page, /buildResearchRobotDirectoryJsonLd/);
  assert.match(page, /id=\{`robot-\$\{robot\.id\}`\}/);
  assert.match(page, /Evaluated on/);
  assert.match(page, /Included in training/);
  assert.match(page, /Demonstrated on/);
  assert.match(page, /This is an evidence map, not a compatibility list/);
  assert.match(schema, /'@type': 'ItemList'/);
  assert.match(schema, /'@type': 'Thing'/);
  assert.match(schema, /numberOfItems: researchRobotEntries\.length/);
  assert.match(schema, /robot\.schemaSameAsUrl \? \{ sameAs: \[robot\.schemaSameAsUrl\] \}/);
  assert.match(schema, /buildResearchRobotWebPageJsonLd/);
  assert.match(schema, /mainEntity:[\s\S]*?robot-directory/);
  assert.doesNotMatch(schema, /robot\.officialUrl \? \{ sameAs/);
  assert.doesNotMatch(schema, /Product|Offer|AggregateRating/);
  assert.match(seo, /'\/robots': \{[\s\S]*?index: true/);
  assert.match(protectedUrls, /https:\/\/roboskin\.ai\/robots/);
  assert.doesNotMatch(sitemap, /knowledge-graph\.json/);
  assert.match(modelExplorer, /\/robots#robot-/);
  assert.match(modelPage, /robotAiRobotRelations/);
  assert.match(modelPage, /robots=\{researchRobotEntries\}/);
});

test('robot platform relationships are part of the graph, LLM outputs, and deployment gates', async () => {
  const [graph, llmsFull, llms, exportVerifier, productionVerifier] = await Promise.all([
    read('src/lib/knowledge-graph.ts'),
    read('src/lib/llms-full.ts'),
    read('public/llms.txt'),
    read('scripts/verify-export.mjs'),
    read('scripts/verify-production.mjs'),
  ]);

  assert.match(graph, /knowledgeGraphVersion = '2\.0\.0'/);
  assert.match(graph, /type: 'robot'/);
  assert.match(graph, /robotAiRobotRelations/);
  assert.match(graph, /must connect a model to a robot/);
  assert.match(graph, /sourceEmbodimentLabels/);
  assert.match(graph, /Robot relation .* lost its evidence boundary/);
  assert.match(graph, /robotRelationEdges/);
  assert.match(graph, /evaluatedOnEdges/);
  assert.match(graph, /trainedAcrossEdges/);
  assert.match(graph, /demonstratedOnEdges/);
  assert.match(llmsFull, /## Verified Robot Platforms and Embodiments/);
  assert.match(llmsFull, /Verified model-robot relations/);
  assert.match(llmsFull, /evaluatedOn requires explicit experiments/);
  assert.match(llms, /https:\/\/roboskin\.ai\/robots/);
  for (const verifier of [exportVerifier, productionVerifier]) {
    assert.match(verifier, /robotRelations/);
    assert.match(verifier, /robotRelationEdges/);
    assert.match(verifier, /evidence-backed relation lacks an evidence boundary|Evidence-backed edge lacks an evidence boundary/i);
    assert.match(verifier, /\/robots/);
    assert.match(verifier, /robot-directory/);
  }
});
