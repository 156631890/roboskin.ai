import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const paths = {
  benchmark: '/guides/tactile-sensor-benchmark-robot-manipulation',
  datasets: '/guides/tactile-datasets-robot-learning',
  models: '/guides/tactile-foundation-models',
  worldModels: '/guides/visuo-tactile-world-models-robot-manipulation',
};

test('tactile benchmark, dataset, foundation-model, and world-model guides form an indexable content cluster', async () => {
  const [topics, article, sitemap, site, llms, keywordMatrix, benchmarkRoute, datasetsRoute, modelsRoute, worldModelsRoute] = await Promise.all([
    read('src/content/seo-topic-pages.ts'),
    read('src/components/SeoTopicArticle.tsx'),
    read('src/app/sitemap.ts'),
    read('src/content/site.ts'),
    read('public/llms.txt'),
    read('docs/seo/keyword-query-matrix.md'),
    read('src/app/guides/tactile-sensor-benchmark-robot-manipulation/page.tsx'),
    read('src/app/guides/tactile-datasets-robot-learning/page.tsx'),
    read('src/app/guides/tactile-foundation-models/page.tsx'),
    read('src/app/guides/visuo-tactile-world-models-robot-manipulation/page.tsx'),
  ]);

  for (const path of Object.values(paths)) {
    assert.match(topics, new RegExp(`path: '${path}'`));
    assert.match(site, new RegExp(`href: '${path}'`));
    assert.match(llms, new RegExp(`https://roboskin\\.ai${path}`));
    assert.match(keywordMatrix, new RegExp(`https://roboskin\\.ai${path}`));
  }

  assert.match(benchmarkRoute, /getSeoTopicPage\('\/guides\/tactile-sensor-benchmark-robot-manipulation'\)/);
  assert.match(datasetsRoute, /getSeoTopicPage\('\/guides\/tactile-datasets-robot-learning'\)/);
  assert.match(modelsRoute, /getSeoTopicPage\('\/guides\/tactile-foundation-models'\)/);
  assert.match(worldModelsRoute, /getSeoTopicPage\('\/guides\/visuo-tactile-world-models-robot-manipulation'\)/);

  assert.match(topics, /TacO tactile sensor benchmark preprint/);
  assert.match(topics, /HT-Bench full-hand tactile representation benchmark preprint/);
  assert.match(topics, /10M egocentric RGB frames and 7\.8M full-hand tactile frames/);
  assert.match(topics, /visual, acoustic, magnetic, and resistive/);
  assert.match(topics, /29,279 tactile frames/);
  assert.match(topics, /contact-sequence overlap reduces tactile-to-text Recall@1 by 17\.7 percentage points/);
  assert.match(topics, /Sparsh-X[\s\S]*Dream-Tac[\s\S]*TouchWorld[\s\S]*MiTaS/);
  assert.match(topics, /path: '\/guides\/visuo-tactile-world-models-robot-manipulation'[\s\S]*VT-WM[\s\S]*Dream-Tac[\s\S]*TouchWorld[\s\S]*ViTacWorld[\s\S]*FeelWorld/);
  assert.match(topics, /10-step LPIPS from 0\.084 to 0\.058/);
  assert.match(topics, /81\.7% average zero-shot planning success/);
  assert.match(topics, /All five systems in this comparison are 2026 arXiv preprints/);
  assert.match(topics, /paperBriefIds: \['ht-bench-full-hand-tactile-representations-2026'/);

  assert.match(topics, /table\?: \{/);
  assert.match(article, /overflow-x-auto/);
  assert.match(article, /scope="col"/);
  assert.match(article, /scope="row"/);
  assert.match(article, /section\.table\.headers/);
  assert.match(article, /section\.table\.rows/);

  assert.match(sitemap, /const topicPages = seoTopicPages\.map/);
  assert.match(sitemap, /images: \[canonicalUrl\(pageVisuals\[page\.visualKey\]\.image\)\]/);
});
