import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { buildWorldModelTrackerDataset, latestTrackerReview, selectTrackerEntries } from '../src/lib/world-model-tracker-tools.mjs';

const entries = JSON.parse(readFileSync(new URL('../src/lib/world-model-tracker.json', import.meta.url), 'utf8'));

test('tracker filters compose, preserve unknown code status, and sort null dates last', () => {
  assert.deepEqual(selectTrackerEntries(entries, { evidence: 'B', modality: 'action', code: 'announced' }).map((row) => row.id), ['agile-wam']);
  assert.equal(selectTrackerEntries(entries, { code: 'released' })[0].id, 'dream-tac');
  assert.equal(selectTrackerEntries(entries, { code: 'unknown' }).length, 5);
  assert.equal(selectTrackerEntries(entries, { modality: 'reward' }).length, 0);
  const sample = [{ ...entries[0], id: 'unknown-date', releaseDate: null }, ...entries];
  const sorted = selectTrackerEntries(sample);
  assert.equal(sorted[0].id, 'internw0');
  assert.equal(sorted.at(-1).id, 'unknown-date');
  assert.equal(sample[0].id, 'unknown-date', 'sorting does not mutate the data');
});

test('Dataset schema uses real sources and the compilation license, without fabricated downloads', () => {
  const schema = buildWorldModelTrackerDataset(entries);
  assert.equal(schema['@type'], 'Dataset');
  assert.equal(schema.license, 'https://creativecommons.org/licenses/by/4.0/');
  assert.equal(schema.dateModified, latestTrackerReview(entries));
  assert.equal(schema.url, 'https://roboskin.ai/world-models/tracker');
  assert.match(schema.description, /review preview/i);
  assert.equal(schema.citation.length, new Set(entries.flatMap((row) => row.sources)).size);
  assert.equal('distribution' in schema, false, 'T5 downloads have not been implemented');
  assert.deepEqual(JSON.parse(JSON.stringify(schema)), schema);
});
