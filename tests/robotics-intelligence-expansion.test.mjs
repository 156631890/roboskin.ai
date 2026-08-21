import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const topicRoutes = [
  '/robot-hands',
  '/robot-safety',
  '/robotics-datasets',
  '/robot-world-models',
  '/robot-teleoperation',
];

const researchIds = [
  'hitac-wam-hierarchical-tactile-world-action-model-2026',
  't-rex-tactile-reactive-dexterous-manipulation-2026',
  'robotacdex-humanoid-visual-tactile-action-dataset-2026',
  'tactidex-tactile-guided-dexterous-benchmark-2026',
];

const newsIds = [
  'gemini-robotics-2-whole-body-vla-dexterity-2026',
  'lerobot-v060-world-models-vla-evaluation-2026',
  'nist-humanoid-baseline-performance-benchmark-2026',
  'iso-10218-2025-industrial-robot-safety-scope',
];

test('robotics intelligence parents are crawlable and assigned to one canonical owner', async () => {
  const [topics, site, home, llms, matrix, monitoring, protectedUrls, verifier, seo] = await Promise.all([
    read('src/content/seo-topic-pages.ts'),
    read('src/content/site.ts'),
    read('src/app/page.tsx'),
    read('public/llms.txt'),
    read('docs/seo/keyword-query-matrix.md'),
    read('docs/seo/search-console-monitoring.md'),
    read('config/protected-urls.json'),
    read('scripts/verify-export.mjs'),
    read('src/lib/seo.ts'),
  ]);

  for (const route of topicRoutes) {
    const routeSource = await read(`src/app${route}/page.tsx`);
    assert.match(routeSource, new RegExp(`getSeoTopicPage\\('${route}'\\)`));
    assert.match(topics, new RegExp(`path: '${route}'`));
    assert.match(site, new RegExp(`href: '${route}'`));
    assert.match(home, /homeRoboticsIntelligence/);
    assert.match(llms, new RegExp(`https://roboskin\\.ai${route}`));
    assert.match(matrix, new RegExp(`https://roboskin\\.ai${route}`));
    assert.match(monitoring, new RegExp(`https://roboskin\\.ai${route}`));
    assert.match(protectedUrls, new RegExp(`https://roboskin\\.ai${route}`));
    assert.match(verifier, new RegExp(route));
    assert.match(seo, new RegExp(`canonicalUrl\\('${route}'\\)`));
  }

  assert.match(topics, /ISO 10218-1:2025/);
  assert.match(topics, /LeRobot v0\.6\.0/);
  assert.match(topics, /robot gripper/i);
  assert.match(topics, /teleoperation/i);
});

test('new paper entities remain primary-source bounded and enter the structured index', async () => {
  const [posts, index, llms, protectedUrls] = await Promise.all([
    read('src/lib/blog-data.ts'),
    read('src/lib/research-index.ts'),
    read('public/llms.txt'),
    read('config/protected-urls.json'),
  ]);

  for (const id of researchIds) {
    assert.match(posts, new RegExp(`id: '${id}'`));
    assert.match(index, new RegExp(`id: '${id}'`));
    assert.match(llms, new RegExp(`https://roboskin\\.ai/research/${id}`));
    assert.match(protectedUrls, new RegExp(`https://roboskin\\.ai/research/${id}`));
  }

  for (const arxivId of ['2606.17055', '2608.19574', '2606.31836', '2607.09190']) {
    assert.match(posts, new RegExp(`https://arxiv\\.org/abs/${arxivId}`));
  }

  assert.match(posts, /will be open-sourced soon/i);
  assert.match(posts, /preprint/i);
  assert.match(index, /does not establish current download access or a dataset license/);
});

test('official updates distinguish provider reports, proposals, and standards scope', async () => {
  const [news, llms, protectedUrls] = await Promise.all([
    read('src/lib/news-data.ts'),
    read('public/llms.txt'),
    read('config/protected-urls.json'),
  ]);

  for (const id of newsIds) {
    assert.match(news, new RegExp(`id: '${id}'`));
    assert.match(llms, new RegExp(`https://roboskin\\.ai/news/${id}`));
    assert.match(protectedUrls, new RegExp(`https://roboskin\\.ai/news/${id}`));
  }

  for (const source of [
    'https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/',
    'https://huggingface.co/blog/lerobot-release-v060',
    'https://www.nist.gov/el/intelligent-systems-division-73500/humanoid-robot-baseline-performance-benchmark',
    'https://www.iso.org/standard/73933.html',
  ]) {
    assert.match(news, new RegExp(source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(news, /provider-reported/i);
  assert.match(news, /proposal/i);
  assert.match(news, /did not access or reproduce the paid full text/i);
  assert.match(news, /does not give legal advice, certify a robot, or claim that robot skin satisfies any clause/i);
});
