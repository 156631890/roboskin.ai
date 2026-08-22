import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('general robot-learning datasets remain separate from the tactile dataset directory', async () => {
  const [records, page, explorer, seo, graph] = await Promise.all([
    read('src/lib/robotics-datasets.ts'),
    read('src/app/robotics-datasets/page.tsx'),
    read('src/components/TactileDatasetExplorer.tsx'),
    read('src/lib/seo.ts'),
    read('src/lib/knowledge-graph.ts'),
  ]);

  for (const id of ['open-x-embodiment', 'droid', 'bridgedata-v2']) {
    assert.match(records, new RegExp(`id: '${id}'`));
  }
  assert.match(records, /no standardized tactile channel/);
  assert.match(records, /DROID appears|final third|16,000 failed trajectories|roughly 16,000 failed trajectories/);
  assert.match(records, /BridgeData V2[\s\S]*?60,096 trajectories/);
  assert.match(page, /buildRoboticsDatasetsJsonLd/);
  assert.match(page, /roboticsDatasetEntries/);
  assert.match(page, /cross-embodiment and manipulation datasets rather than tactile datasets/i);
  assert.match(explorer, /id=\{`dataset-\$\{entry\.id\}`\}/);
  assert.match(seo, /RoboSkin\.ai General Robotics Dataset Directory/);
  assert.match(graph, /pathname: '\/robotics-datasets'/);
  assert.match(graph, /canonicalUrl\(`\$\{pathname\}#dataset-\$\{entry\.id\}`\)/);
});

test('model-dataset and dataset-robot edges retain primary-source boundaries', async () => {
  const relations = await read('src/lib/research-entity-relations.ts');

  const semanticRelations = relations.match(
    /export const researchSemanticRelations[^=]*= \[([\s\S]*?)\n\];/,
  )?.[1] ?? '';
  assert.equal((semanticRelations.match(/relation: 'trainedOn'/g) ?? []).length, 11);
  assert.match(relations, /fromId: 'openvla-7b'[\s\S]*?toId: 'droid'[\s\S]*?removed for the final third/);
  assert.match(relations, /fromId: 'octo'[\s\S]*?toId: 'bridgedata-v2'[\s\S]*?does not disclose a V2-only weight/);
  assert.match(relations, /fromId: 'pi0'[\s\S]*?toId: 'droid'[\s\S]*?combined mixture weight is 9\.1%/);
  assert.match(relations, /fromId: 'droid'[\s\S]*?toId: 'franka-emika-panda'/);
  assert.match(relations, /fromId: 'bridgedata-v2'[\s\S]*?toId: 'trossen-widowx-250-6dof'/);
  assert.match(relations, /fromId: 't-rex'[\s\S]*?toId: 't-rex'[\s\S]*?approximately 50-hour subset/);
  assert.match(relations, /fromId: 'univtac-encoder'[\s\S]*?toId: 'univtac-encoder-pretraining-corpus'[\s\S]*?205,826-sample simulated corpus/);
  assert.doesNotMatch(
    semanticRelations,
    /fromId: 'octo',\n\s+toType: 'dataset',\n\s+toId: 'droid'/,
  );
});
