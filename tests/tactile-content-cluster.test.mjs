import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const paths = {
  benchmark: '/guides/tactile-sensor-benchmark-robot-manipulation',
  datasets: '/guides/tactile-datasets-robot-learning',
  models: '/guides/tactile-foundation-models',
};

test('tactile benchmark, dataset, and foundation-model guides form an indexable content cluster', async () => {
  const [topics, article, sitemap, site, llms, keywordMatrix, benchmarkRoute, datasetsRoute, modelsRoute] = await Promise.all([
    read('src/content/seo-topic-pages.ts'),
    read('src/components/SeoTopicArticle.tsx'),
    read('src/app/sitemap.ts'),
    read('src/content/site.ts'),
    read('public/llms.txt'),
    read('docs/seo/keyword-query-matrix.md'),
    read('src/app/guides/tactile-sensor-benchmark-robot-manipulation/page.tsx'),
    read('src/app/guides/tactile-datasets-robot-learning/page.tsx'),
    read('src/app/guides/tactile-foundation-models/page.tsx'),
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

  assert.match(topics, /TacO tactile sensor benchmark preprint/);
  assert.match(topics, /visual, acoustic, magnetic, and resistive/);
  assert.match(topics, /29,279 tactile frames/);
  assert.match(topics, /contact-sequence overlap reduces tactile-to-text Recall@1 by 17\.7 percentage points/);
  assert.match(topics, /Sparsh-X[\s\S]*Dream-Tac[\s\S]*TouchWorld[\s\S]*MiTaS/);
  assert.match(topics, /paperBriefIds: \['freetacman-robot-free-visuotactile-data-collection-2025'/);

  assert.match(topics, /table\?: \{/);
  assert.match(article, /overflow-x-auto/);
  assert.match(article, /scope="col"/);
  assert.match(article, /scope="row"/);
  assert.match(article, /section\.table\.headers/);
  assert.match(article, /section\.table\.rows/);

  assert.match(sitemap, /const topicPages = seoTopicPages\.map/);
  assert.match(sitemap, /images: \[canonicalUrl\(pageVisuals\[page\.visualKey\]\.image\)\]/);
});
