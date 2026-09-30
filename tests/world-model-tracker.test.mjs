import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { assertTrackerEntries } from '../src/lib/world-model-tracker-validation.mjs';

const entries = JSON.parse(readFileSync(new URL('../src/lib/world-model-tracker.json', import.meta.url), 'utf8'));

test('T2 contains all eight source-backed, uncontacted seed records', () => {
  assertTrackerEntries(entries);
  assert.deepEqual(entries.map((entry) => entry.id).sort(), ['agile-wam', 'dextouch-wm', 'dream-tac', 'feelworld', 'hitac-wam', 'internw0', 'touchworld', 'vitacworld']);
  for (const entry of entries) {
    assert.equal(entry.authorCheck, 'not-contacted');
    assert.match(entry.sourceUrl, /^https:\/\/arxiv\.org\/abs\/\d{4}\.\d{5}v\d+$/);
    const library = entry.briefUrl.startsWith('/research/') ? 'blog-data.ts' : entry.briefUrl.startsWith('/news/') ? 'news-data.ts' : '../content/seo-topic-pages.ts';
    const source = readFileSync(new URL(`../src/lib/${library}`, import.meta.url), 'utf8');
    assert.ok(source.includes(entry.briefUrl.split('/').at(-1)), `${entry.id}: missing brief route`);
  }
});

test('evaluation conditions and unknown release states retain their source boundaries', () => {
  const byId = Object.fromEntries(entries.map((entry) => [entry.id, entry]));
  assert.equal(byId.touchworld.realRobotEval.rolloutsPerSetting, null, '100 total is not a per-condition count');
  assert.equal(byId.vitacworld.realRobotEval.rolloutsPerSetting, 50, 'v2 replaces the historical 10-trial protocol');
  assert.equal(byId.internw0.realRobotEval.taskCount, 5, 'pipetting stages are not separate real-robot tasks');
  assert.equal(byId.internw0.tactileSensor, null, 'no guessed sensor model');
  for (const id of ['feelworld', 'hitac-wam', 'touchworld', 'dextouch-wm', 'internw0']) {
    assert.equal(byId[id].openSource.code, 'unknown');
    assert.equal(byId[id].evidenceLevel, 'D');
  }
  for (const entry of entries) {
    assert.equal(entry.openSource.data, 'unknown');
    assert.equal(entry.openSource.weights, 'unknown');
  }
});

test('validation rejects malformed imports and unsupported evidence grades', () => {
  const invalidEdits = [
    (data) => data.push(structuredClone(data[0])),
    (data) => { delete data[0].paperTitle; },
    (data) => { data[0].releaseDate = '2026-02-30'; },
    (data) => { data[0].lastVerified = '2025-01-01'; },
    (data) => { data[0].predicts = ['force']; },
    (data) => { data[0].predicts = ['touch', 'touch']; },
    (data) => { data[0].sources = []; },
    (data) => { data[0].sourceUrl = 'javascript:alert(1)'; },
    (data) => { data[0].sources.push('http://example.com'); },
    (data) => { data[0].realRobotEval.taskCount = 1.5; },
    (data) => { data[0].realRobotEval.has = false; },
    (data) => { data[0].openSource.code = 'unknown'; },
    (data) => { data[1].evidenceLevel = 'B'; },
    (data) => { data[0].evidenceLevel = 'C'; },
    (data) => { data[0].verdict = Array(31).fill('word').join(' '); },
    (data) => { data[0].briefUrl = '//external.example/research'; },
    (data) => { data[0].authorCheck = 'assumed'; },
  ];
  for (const edit of invalidEdits) {
    const copy = structuredClone(entries);
    edit(copy);
    assert.throws(() => assertTrackerEntries(copy), TypeError);
  }
  for (const value of [null, {}, [], [null]]) assert.throws(() => assertTrackerEntries(value), TypeError);
});
