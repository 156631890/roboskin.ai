import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

function record(source, id) {
  const start = source.indexOf(`    id: '${id}'`);
  assert.notEqual(start, -1, `missing reviewed record ${id}`);
  const next = source.indexOf("\n  {\n    id: '", start + id.length + 10);
  return source.slice(start, next === -1 ? source.length : next);
}

test('EgoTouch preserves scale, access, collection, and license boundaries', async () => {
  const datasets = await read('src/lib/tactile-datasets.ts');
  const egotouch = record(datasets, 'egotouch');

  for (const evidence of [
    '208 manipulation tasks across 1,891 episodes',
    'approximately 2 million frames',
    'Human-wearable bimanual collection; no robot platform',
    'HDF5',
    '30 FPS',
    'upload is in progress',
    'currently accessible files may be incomplete',
    'https://arxiv.org/abs/2605.13083',
    'https://github.com/Jianyi2004/TouchAnything',
    'https://huggingface.co/datasets/zhouzhoujy/EgoTouch',
  ]) {
    assert.match(egotouch, new RegExp(evidence.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(egotouch, /separate dataset-file license was not verified/);
  assert.match(egotouch, /GitHub repository is MIT licensed[\s\S]*not generalized[\s\S]*data files/);
  assert.doesNotMatch(egotouch, /licenseUrl:|projectUrl:/);
});

test('TouchWorld task suite remains an author-defined evaluation protocol', async () => {
  const benchmarks = await read('src/lib/tactile-benchmarks.ts');
  const protocol = record(benchmarks, 'touchworld-real-robot');

  for (const task of [
    'Water Flower',
    'Tabletop Clearing',
    'Cup Insertion',
    'Power Plug Insertion',
    'Pot Wiping',
    'Tissue Pulling',
  ]) {
    assert.match(protocol, new RegExp(task));
  }

  assert.match(protocol, /Author-defined real-robot manipulation evaluation protocol/);
  assert.match(protocol, /200 teleoperated training trajectories per task/);
  assert.match(protocol, /100 real-robot evaluation rollouts per task/);
  assert.match(protocol, /one unnamed humanoid/);
  assert.match(protocol, /not independent validation or a universal cross-model benchmark/);
  assert.doesNotMatch(protocol, /codeUrl:/);
});

test('TouchWorld connects to EgoTouch and its protocol with exact model evidence', async () => {
  const [relations, models] = await Promise.all([
    read('src/lib/research-entity-relations.ts'),
    read('src/lib/robot-ai-models.ts'),
  ]);

  assert.match(
    relations,
    /relation: 'trainedOn'[\s\S]*?fromId: 'touchworld'[\s\S]*?toId: 'egotouch'[\s\S]*?evidenceUrls: \['https:\/\/arxiv\.org\/abs\/2607\.07287'\][\s\S]*?does not imply that every TouchWorld module is trained on EgoTouch/,
  );
  assert.match(
    relations,
    /relation: 'evaluatedBy'[\s\S]*?fromId: 'touchworld'[\s\S]*?toId: 'touchworld-real-robot'[\s\S]*?evidenceUrls: \['https:\/\/arxiv\.org\/abs\/2607\.07287'\][\s\S]*?does not make the benchmark independent, universal, cross-sensor, cross-robot/,
  );

  const touchworld = record(models, 'touchworld');
  assert.match(touchworld, /url: 'https:\/\/arxiv\.org\/abs\/2607\.07287'/);
});

test('the existing TouchWorld canonical article exposes the complete internal evidence chain', async () => {
  const [news, topics, graph, researchIndex] = await Promise.all([
    read('src/lib/news-data.ts'),
    read('src/content/seo-topic-pages.ts'),
    read('src/lib/knowledge-graph.ts'),
    read('src/lib/research-index.ts'),
  ]);

  const touchworldNews = record(news, 'touchworld-tactile-foundation-model-dexterous-manipulation-2026');
  for (const href of [
    '/robot-foundation-models#model-touchworld',
    '/datasets#dataset-egotouch',
    '/benchmarks#benchmark-touchworld-real-robot',
    '/robot-world-models',
  ]) {
    assert.match(touchworldNews, new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(topics, new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(graph, /canonicalUrl\(`\$\{pathname\}#dataset-\$\{entry\.id\}`\)/);
  assert.match(graph, /canonicalUrl\(`\/benchmarks#benchmark-\$\{entry\.id\}`\)/);
  assert.doesNotMatch(researchIndex, /id: 'touchworld-tactile-foundation-model-dexterous-manipulation-2026'/);
  assert.equal(
    (news.match(/id: 'touchworld-tactile-foundation-model-dexterous-manipulation-2026'/g) ?? []).length,
    1,
  );
});
