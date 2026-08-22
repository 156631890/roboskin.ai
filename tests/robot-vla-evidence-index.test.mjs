import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { robotAiModelEntries } from '../src/lib/robot-ai-models.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('the curated VLA index includes one source-bounded tactile VLA without turning unlike models into a leaderboard', async () => {
  const vlaEntries = robotAiModelEntries.filter((entry) => entry.category === 'VLA');
  assert.deepEqual(
    vlaEntries.map((entry) => entry.id),
    ['gemini-robotics-2', 'rt-2', 'openvla-7b', 'pi0', 'isaac-gr00t-n1', 't-rex'],
  );

  const tactileVlas = vlaEntries.filter((entry) => entry.tactileInput === 'yes');
  assert.deepEqual(tactileVlas.map((entry) => entry.id), ['t-rex']);

  const trex = tactileVlas[0];
  assert.match(trex.trainingDataSummary, /full 100-hour[\s\S]*5,464 episodes[\s\S]*approximately 50 hours/);
  assert.match(trex.evidenceLimitations, /not the complete 100-hour corpus/);
  assert.match(trex.availability, /pretrained and midtrained checkpoints/);
  assert.ok(trex.primarySources.some((source) => source.url === 'https://github.com/ZhuoyangLiu2005/T-Rex'));
  assert.ok(trex.primarySources.some((source) => source.url === 'https://huggingface.co/miniFranka/T-Rex_midtrain_mecka23k_ucb100_vqvae_epoch6'));
});

test('T-Rex model, public dataset subset, research platform, paper brief, and graph relations retain one evidence boundary', async () => {
  const [datasets, robots, relations, brief, index] = await Promise.all([
    read('src/lib/tactile-datasets.ts'),
    read('src/lib/research-robots.ts'),
    read('src/lib/research-entity-relations.ts'),
    read('src/lib/blog-data.ts'),
    read('src/lib/research-index.ts'),
  ]);

  assert.match(datasets, /id: 't-rex'[\s\S]*?5,464 episodes[\s\S]*?5,473,459 frames[\s\S]*?5,370 language-annotated trajectories[\s\S]*?207 objects/);
  assert.match(datasets, /public subset must not be described as the complete 100-hour corpus/);
  assert.match(datasets, /datasetUrl: 'https:\/\/huggingface\.co\/datasets\/zekaiwang\/trex_dataset'/);
  assert.match(robots, /id: 'dexmate-vega-1-sharpa-wave-configuration'[\s\S]*?source-specific multi-vendor research integration/);
  assert.match(robots, /modelId: 't-rex'[\s\S]*?relation: 'trainedAcross'/);
  assert.match(robots, /modelId: 't-rex'[\s\S]*?relation: 'evaluatedOn'/);
  assert.match(relations, /fromId: 't-rex-tactile-reactive-dexterous-manipulation-2026'[\s\S]*?toType: 'model'[\s\S]*?toId: 't-rex'/);
  assert.match(relations, /fromId: 't-rex-tactile-reactive-dexterous-manipulation-2026'[\s\S]*?toType: 'dataset'[\s\S]*?toId: 't-rex'/);
  assert.match(relations, /relation: 'trainedOn'[\s\S]*?fromId: 't-rex'[\s\S]*?toId: 't-rex'/);
  assert.match(relations, /relation: 'usesRobot'[\s\S]*?fromId: 't-rex'[\s\S]*?dexmate-vega-1-sharpa-wave-configuration/);
  assert.match(brief, /Artifact availability verified on August 22, 2026[\s\S]*?normalized T-Rex dataset record/);
  assert.match(index, /id: 't-rex-tactile-reactive-dexterous-manipulation-2026'[\s\S]*?5,464 episodes[\s\S]*?5,473,459 frames[\s\S]*?approximately 50 hours[\s\S]*?LeRobot v3\.0 subset/);
  assert.match(brief, /citationUrls:[\s\S]*?arxiv\.org\/abs\/2606\.17055[\s\S]*?tactile-reactive-dexterous\.github\.io[\s\S]*?github\.com\/ZhuoyangLiu2005\/T-Rex[\s\S]*?huggingface\.co\/datasets\/zekaiwang\/trex_dataset[\s\S]*?huggingface\.co\/miniFranka\/T-Rex_midtrain_mecka23k_ucb100_vqvae_epoch6/);
});

test('the VLA page is a server-rendered topical index that references canonical model entities', async () => {
  const [route, component, schema, topics, site] = await Promise.all([
    read('src/app/robot-vla-models/page.tsx'),
    read('src/components/VlaModelIndex.tsx'),
    read('src/lib/vla-model-schema.ts'),
    read('src/content/seo-topic-pages.ts'),
    read('src/content/site.ts'),
  ]);

  assert.match(route, /robotAiModelEntries\.filter\(\(entry\) => entry\.category === 'VLA'\)/);
  assert.match(route, /buildVlaModelIndexJsonLd\(vlaModelEntries\)/);
  assert.match(route, /<VlaModelIndex entries=\{vlaModelEntries\}/);
  assert.doesNotMatch(component, /^'use client';/);
  assert.match(component, /id=\{`vla-model-\$\{entry\.id\}`\}/);
  assert.match(component, /data-vla-model-record=\{entry\.id\}/);
  assert.match(component, /\/robot-foundation-models#model-\$\{entry\.id\}/);
  assert.match(component, /Training \/ data:[\s\S]*?entry\.trainingDataSummary/);
  assert.match(component, /entry\.primarySources\.map/);
  assert.match(schema, /'@type': 'ItemList'/);
  assert.match(schema, /#vla-model-index/);
  assert.match(schema, /#model-\$\{entry\.id\}/);
  assert.match(schema, /name: 'Vision-language-action model'/);
  assert.doesNotMatch(schema, /CreativeWork/);
  assert.match(topics, /path: '\/robot-vla-models'[\s\S]*?schemaType: 'TechArticle'/);
  assert.match(topics, /paperBriefIds: \['t-rex-tactile-reactive-dexterous-manipulation-2026'/);
  assert.match(topics, /path: '\/robot-vla-models'[\s\S]*?href: '\/physical-ai'[\s\S]*?href: '\/robot-world-models'[\s\S]*?href: '\/robotics-datasets'/);
  assert.match(site, /term: 'Robot foundation model'[\s\S]*?href: '\/robot-foundation-models'/);
  assert.match(site, /title: 'Robot VLA models and action policies'/);
});
