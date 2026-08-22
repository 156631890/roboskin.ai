import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

function recordById(source, id) {
  const start = source.indexOf(`id: '${id}'`);
  assert.notEqual(start, -1, `missing record ${id}`);
  const next = source.indexOf("    id: '", start + id.length + 10);
  return source.slice(start, next === -1 ? source.length : next);
}

test('RoboTacDex is a source-bounded tactile dataset record and remains distinct from GIST humanoid-vta', async () => {
  const datasets = await read('src/lib/tactile-datasets.ts');
  const robotacdex = recordById(datasets, 'robotacdex');
  const gist = recordById(datasets, 'humanoid-vta');

  for (const signal of [
    'Unitree G1',
    'BrainCo Revo2 Tactile',
    'More than 6,000 physical-robot trajectories',
    'approximately 25 hours',
    '19 tasks, an author-reported 23 skills, and 22 objects',
    'Figure 4 exposes 22 discernible atomic-skill labels',
    'Four-view RGB at 640 x 480',
    '100 Hz',
    'recorded locally at 30 Hz',
    'Dataset-file license not stated',
    'record access as announced, not released',
    'https://arxiv.org/abs/2606.31836',
  ]) {
    assert.match(robotacdex, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }

  assert.doesNotMatch(robotacdex, /projectUrl:|githubUrl:|datasetUrl:|licenseUrl:|101\.9K|Inspire RH56-DFX|2510\.25725/);
  assert.doesNotMatch(gist, /Unitree G1|RoboTacDex|BrainCo Revo2|2606\.31836/);
});

test('RoboTacDex article exposes the hardware, benchmark outcomes, and non-release boundary', async () => {
  const posts = await read('src/lib/blog-data.ts');
  const article = recordById(posts, 'robotacdex-humanoid-visual-tactile-action-dataset-2026');

  for (const signal of [
    'dual arms totaling 14 DoF',
    'two BrainCo Revo2 Tactile hands totaling 12 hand DoF as counted by the paper',
    'four 640 x 480 RGB-D views',
    'hand tactile and joint-state messages published over DDS at 100 Hz',
    '| Pick and place a pear | 0/10 | 3/10 | 9/10 |',
    '| Unscrew a bottle cap | 3/10 | 2/10 | 6/10 |',
    'adding tactile input did not improve the success rate',
    'not proof of a universal performance gain',
    'announced, not verified downloadable',
  ]) {
    assert.match(article, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }

  assert.match(article, /updated: '2026-08-22'/);
});

test('RoboTacDex connects the paper, tactile dataset, and physical Unitree G1 with bounded graph edges', async () => {
  const [relations, graph] = await Promise.all([
    read('src/lib/research-entity-relations.ts'),
    read('src/lib/knowledge-graph.ts'),
  ]);

  assert.match(relations, /relation: 'usesRobot'[\s\S]*?fromId: 'robotacdex'[\s\S]*?toId: 'unitree-g1'[\s\S]*?does not imply whole-body locomotion data/);
  assert.match(relations, /relation: 'introduces'[\s\S]*?fromId: 'robotacdex-humanoid-visual-tactile-action-dataset-2026'[\s\S]*?toId: 'robotacdex'[\s\S]*?does not promise current file access/);
  assert.match(graph, /tactileDatasetEntries\.map\(\(entry\) => \(\{ entry, pathname: '\/datasets' as const \}\)\)/);
  assert.match(graph, /canonicalUrl: canonicalUrl\(`\$\{pathname\}#dataset-\$\{entry\.id\}`\)/);
});
