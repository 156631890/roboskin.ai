import assert from 'node:assert/strict';
import test from 'node:test';
import { getRelatedArticles } from '../src/lib/related-articles.ts';
import { blogPosts } from '../src/lib/blog-data.ts';
import { newsPosts } from '../src/lib/news-data.ts';

const ids = (posts) => posts.map((post) => post.id);
const research = (id) => blogPosts.find((post) => post.id === id);
const news = (id) => newsPosts.find((post) => post.id === id);
const fixture = (id, overrides = {}) => ({
  id, title: 'A tactile robotics study', category: 'Tactile AI',
  technicalFocus: ['tactile AI', 'robot skin'], date: '2026-10-01', ...overrides,
});

test('tactile world model reviews link to the matching model family instead of zero-score recent articles', () => {
  const hitac = 'hitac-wam-hierarchical-tactile-world-action-model-2026';
  const dream = 'dream-tac-tactile-world-action-model-2026';
  const feel = 'feelworld-visuo-tactile-world-model-2026';
  const dextouch = 'dextouch-wm-human-touch-world-model-2026';
  for (const id of [hitac, dream, feel]) {
    assert.deepEqual(new Set(ids(getRelatedArticles(research(id), blogPosts))),
      new Set([hitac, dream, feel, dextouch].filter((candidate) => candidate !== id)));
  }
});

test('an industrial safety brief does not inherit unrelated tactile hardware recommendations', () => {
  const related = ids(getRelatedArticles(news('iso-10218-2025-industrial-robot-safety-scope'), newsPosts));
  assert.deepEqual(related, ['copre-proprioceptive-contact-detection']);
});

test('magnetic sensor reviews stay connected to calibration and shared hardware methods', () => {
  const related = ids(getRelatedArticles(research('eflesh-customizable-magnetic-touch-sensing-2025'), blogPosts));
  assert.ok(related.includes('open-source-magnetic-tactile-calibration-2024'));
  assert.ok(related.includes('visible-touch-contact-overlays-visuomotor-policies-2026'));
  assert.ok(!related.includes('slipsense-multimodal-slip-detection-2026'));
});

test('humanoid benchmark recommendations prioritize the same embodiment over generic benchmark membership', () => {
  const related = getRelatedArticles(news('humanoidtoolbench-tool-selection-mobile-execution'), newsPosts);
  assert.equal(related[0].id, 'nist-humanoid-baseline-performance-benchmark-2026');
});

test('TACTIC links to tactile representation research instead of an unrelated humanoid benchmark', () => {
  const related = ids(getRelatedArticles(news('tactic-tactile-encoder-fusion-benchmark'), newsPosts));
  assert.ok(related.includes('tactile-jepa-topology-aware-electronic-skin-pretraining'));
  assert.ok(!related.includes('humanoidtoolbench-tool-selection-mobile-execution'));
});

test('TouchSight does not recommend HumanoidToolBench solely because both describe datasets', () => {
  const related = ids(getRelatedArticles(news('touchsight-twintouch-bare-hand-tactile-prediction'), newsPosts, newsPosts.length));
  assert.ok(!related.includes('humanoidtoolbench-tool-selection-mobile-execution'));
});

test('generic dataset and benchmark labels need an independent specific connection', () => {
  const source = fixture('source', { title: 'A tactile dataset benchmark', category: 'Tactile datasets', technicalFocus: ['robot datasets'] });
  const unrelated = fixture('unrelated', { title: 'Another tactile dataset benchmark', category: 'Tactile datasets', technicalFocus: ['robot datasets'] });
  assert.deepEqual(getRelatedArticles(source, [unrelated]), []);
});

test('broad site terms and category alone do not manufacture a recommendation', () => {
  assert.deepEqual(getRelatedArticles(fixture('source'), [fixture('unrelated')]), []);
  assert.deepEqual(getRelatedArticles(research('ros2-kilted-tactile-pipeline-2026'), blogPosts), []);
});

test('focus normalization handles case, hyphens and plurals without returning self or duplicates', () => {
  const source = fixture('source', { technicalFocus: ['CUSTOM optical sensor'] });
  const relevant = fixture('relevant', { technicalFocus: ['custom-optical sensors'] });
  const candidates = [source, fixture('unrelated'), relevant, relevant];
  assert.deepEqual(ids(getRelatedArticles(source, candidates)), ['relevant']);
  assert.deepEqual(getRelatedArticles(source, candidates, 0), []);
});

test('equal matches use publication date and stable ids, independent of source array order', () => {
  const source = fixture('source', { technicalFocus: ['magnetic tactile sensing'] });
  const candidates = [
    fixture('older', { technicalFocus: ['magnetic tactile sensing'], date: '2026-09-01' }),
    fixture('b', { technicalFocus: ['magnetic tactile sensing'] }),
    fixture('a', { technicalFocus: ['magnetic tactile sensing'] }),
  ];
  assert.deepEqual(ids(getRelatedArticles(source, candidates)), ['a', 'b', 'older']);
  assert.deepEqual(ids(getRelatedArticles(source, [...candidates].reverse())), ['a', 'b', 'older']);
  assert.deepEqual(ids(getRelatedArticles(source, candidates, 1)), ['a']);
});
