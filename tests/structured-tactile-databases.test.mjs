import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('structured tactile databases and pillars are crawlable, source-bounded, and linked', async () => {
  const [
    topics,
    datasets,
    benchmarks,
    sensors,
    datasetRoute,
    benchmarkRoute,
    sensorRoute,
    manipulationRoute,
    visuoTactileRoute,
    seo,
    sitemap,
    homepage,
    glossary,
    topicGraph,
    llms,
    keywordMatrix,
  ] = await Promise.all([
    read('src/content/seo-topic-pages.ts'),
    read('src/lib/tactile-datasets.ts'),
    read('src/lib/tactile-benchmarks.ts'),
    read('src/lib/tactile-sensors.ts'),
    read('src/app/datasets/page.tsx'),
    read('src/app/benchmarks/page.tsx'),
    read('src/app/sensors/page.tsx'),
    read('src/app/tactile-manipulation/page.tsx'),
    read('src/app/visuo-tactile/page.tsx'),
    read('src/lib/seo.ts'),
    read('src/app/sitemap.ts'),
    read('src/app/page.tsx'),
    read('src/content/site.ts'),
    read('src/lib/topic-graph.ts'),
    read('public/llms.txt'),
    read('docs/seo/keyword-query-matrix.md'),
  ]);

  const countRecords = (source) => (source.match(/\n  \{\n    id: '/g) ?? []).length;
  assert.ok(countRecords(datasets) >= 12, 'dataset directory must contain at least 12 records');
  assert.ok(countRecords(benchmarks) >= 9, 'benchmark directory must contain at least 9 records');
  assert.ok(countRecords(sensors) >= 13, 'sensor directory must contain at least 13 records');

  for (const path of ['/benchmarks', '/sensors', '/tactile-manipulation', '/visuo-tactile']) {
    assert.match(topics, new RegExp(`path: '${path}'`));
    assert.match(llms, new RegExp(`https://roboskin\\.ai${path}`));
    assert.match(keywordMatrix, new RegExp(`https://roboskin\\.ai${path}`));
  }

  assert.match(datasetRoute, /TactileDatasetExplorer/);
  assert.match(benchmarkRoute, /TactileBenchmarkExplorer/);
  assert.match(sensorRoute, /TactileSensorExplorer/);
  assert.match(manipulationRoute, /getSeoTopicPage\('\/tactile-manipulation'\)/);
  assert.match(visuoTactileRoute, /getSeoTopicPage\('\/visuo-tactile'\)/);

  assert.match(seo, /buildTactileBenchmarksJsonLd/);
  assert.match(seo, /buildTactileSensorsJsonLd/);
  assert.match(seo, /'@type': 'ItemList'/);
  assert.match(sitemap, /seoTopicPages\.map/);

  assert.match(homepage, /const researchDatabases =/);
  assert.match(homepage, /href: '\/benchmarks'/);
  assert.match(homepage, /href: '\/sensors'/);
  assert.match(topicGraph, /href: '\/tactile-manipulation'/);
  assert.match(topicGraph, /href: '\/visuo-tactile'/);

  const glossaryRecordCount = (glossary.match(/\n    term: '/g) ?? []).length;
  assert.ok(glossaryRecordCount >= 20, 'glossary must contain at least 20 defined terms');

  for (const primarySource of [
    'https://arxiv.org/abs/2211.12498',
    'https://tactile-vlm.github.io/',
    'https://objectfolder.stanford.edu/',
    'https://sparsh-ssl.github.io/',
    'https://arxiv.org/abs/2409.08276',
  ]) {
    assert.ok(
      [datasets, benchmarks, sensors, topics].some((source) => source.includes(primarySource)),
      `missing primary source ${primarySource}`,
    );
  }

  assert.match(datasets, /Dataset license not stated/);
  assert.match(sensors, /Not publicly stated/);
  assert.match(benchmarks, /limitation:/);
});
