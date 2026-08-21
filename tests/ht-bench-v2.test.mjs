import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

function objectBlock(source, marker) {
  const start = source.indexOf(marker);
  assert.ok(start >= 0, `missing marker: ${marker}`);
  const end = source.indexOf('\n  {', start + marker.length);
  return source.slice(start, end < 0 ? source.length : end);
}

test('HT-Bench brief follows arXiv v2 Table 2 and preserves source discrepancies', async () => {
  const source = await read('src/lib/blog-data.ts');
  const brief = objectBlock(source, "id: 'ht-bench-full-hand-tactile-representations-2026'");

  assert.match(brief, /Updated technical brief - August 22, 2026 \(arXiv v2\)/);
  assert.match(brief, /standard-test full-map cIoU is 0\.628[\s\S]*0\.689/);
  assert.match(brief, /task-level OOD split[\s\S]*0\.446[\s\S]*0\.457/);
  assert.doesNotMatch(brief, /out-of-distribution[^.]*0\.628[^.]*0\.689/i);
  assert.doesNotMatch(brief, /0\.705/);

  assert.match(brief, /Table 2 reports HandTouch full-map RMSE of 0\.009 and full-map cIoU of 0\.912/);
  assert.match(brief, /Section 5\.1 instead states 0\.010 and 0\.911/);
  assert.match(brief, /small internal inconsistency/);
});

test('HT-Bench v2 real-robot results and scope remain source-bounded', async () => {
  const source = await read('src/lib/blog-data.ts');
  const brief = objectBlock(source, "id: 'ht-bench-full-hand-tactile-representations-2026'");

  for (const task of ['board cleaning', 'pear picking', 'water pouring', 'sand shoveling']) {
    assert.match(brief, new RegExp(task, 'i'));
  }
  assert.match(brief, /15 trials per method for each task/);
  assert.match(brief, /HandTouch mean is 68\.3%[\s\S]*50\.0%[\s\S]*18\.3 percentage points/);
  assert.match(brief, /does not report confidence intervals or a statistical-significance test/);
  assert.match(brief, /one reported egocentric\/full-hand tactile sensing pipeline/);
  assert.match(brief, /fingertip optical tactile sensors[\s\S]*force\/torque sensors[\s\S]*skin-like taxel arrays[\s\S]*non-hand embodiments/);
  assert.match(brief, /will release the data, evaluation protocols, pretrained weights, and training\/testing scripts/);
  assert.match(brief, /did not provide a dedicated downloadable package or official repository/);
});

test('HT-Bench dataset, benchmark, index, graph, and topic sources pin v2 and do not imply release', async () => {
  const [datasetsSource, benchmarksSource, indexSource, relations, topics] = await Promise.all([
    read('src/lib/tactile-datasets.ts'),
    read('src/lib/tactile-benchmarks.ts'),
    read('src/lib/research-index.ts'),
    read('src/lib/research-entity-relations.ts'),
    read('src/content/seo-topic-pages.ts'),
  ]);

  const dataset = objectBlock(datasetsSource, "id: 'ht-bench'");
  const benchmark = objectBlock(benchmarksSource, "id: 'ht-bench'");
  const index = objectBlock(indexSource, "id: 'ht-bench-full-hand-tactile-representations-2026'");

  for (const record of [dataset, benchmark, index]) {
    assert.match(record, /2026-08-22/);
  }
  for (const record of [dataset, benchmark]) {
    assert.match(record, /https:\/\/arxiv\.org\/abs\/2606\.19161v2/);
    assert.match(record, /will release/);
    assert.match(record, /no dedicated downloadable/i);
  }
  assert.doesNotMatch(dataset, /datasetUrl:/);
  assert.doesNotMatch(benchmark, /projectUrl:|codeUrl:/);
  assert.match(index, /68\.3%[\s\S]*50\.0%[\s\S]*15 trials/);

  assert.match(relations, /https:\/\/arxiv\.org\/abs\/2606\.19161v2/);
  assert.doesNotMatch(relations, /https:\/\/arxiv\.org\/abs\/2606\.19161(?!v2)/);
  assert.match(relations, /data, protocols, weights, and scripts[\s\S]*no separate downloadable package/);

  assert.match(topics, /https:\/\/arxiv\.org\/abs\/2606\.19161v2/);
  assert.doesNotMatch(topics, /https:\/\/arxiv\.org\/abs\/2606\.19161(?!v2)/);
});
