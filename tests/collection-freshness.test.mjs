import assert from 'node:assert/strict';
import test from 'node:test';
import { collectionUpdated } from '../src/lib/collection-freshness.mjs';

test('a new publication advances a collection date without using build time', () => {
  const entries = [{ date: '2026-10-28', updated: '2026-11-06' }, { date: '2026-11-05', updated: '2026-11-05' }];
  assert.equal(collectionUpdated('2026-11-04', entries), '2026-11-05');
  assert.equal(collectionUpdated('2026-11-04', entries.toReversed()), '2026-11-05');
  assert.equal(collectionUpdated('2026-11-04', [entries[0]]), '2026-11-04');
  assert.equal(collectionUpdated('2026-11-06', entries), '2026-11-06');
  assert.equal(collectionUpdated('2026-11-04', []), '2026-11-04');
});
