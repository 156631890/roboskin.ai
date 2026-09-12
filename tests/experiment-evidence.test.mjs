import assert from 'node:assert/strict';
import test from 'node:test';
import { buildExperimentCsv, experimentEvidence } from '../src/lib/experiment-evidence.mjs';
import { evidenceBatch, growthBatchForPath } from '../src/lib/growth-batches.mjs';

const parseRecord = (line) => [...line.matchAll(/"((?:[^"]|"")*)"(?:,|$)/g)]
  .map((match) => match[1].replaceAll('""', '"'));

test('each published evidence result has a unique anchor, versioned source, and explicit protocol boundaries', () => {
  assert.equal(new Set(experimentEvidence.map((entry) => entry.id)).size, experimentEvidence.length);
  for (const entry of experimentEvidence) {
    for (const field of ['study', 'version', 'setup', 'metric', 'result', 'comparator', 'sample', 'limitation', 'access', 'sourceLocation', 'reviewed']) {
      assert.ok(entry[field]?.trim(), `${entry.id} lacks ${field}`);
    }
    assert.match(entry.sourceUrl, /^https:\/\/arxiv\.org\/html\/\d{4}\.\d+v\d+#/);
    assert.match(entry.reviewUrl, /^\/(research|news)\//);
  }
});

test('filtered CSV round-trips all evidence fields and preserves source links and caveats', () => {
  const selection = experimentEvidence.filter((entry) => entry.study === 'TacVerse');
  const csv = buildExperimentCsv(selection);
  assert.ok(csv.startsWith('\uFEFF'));
  const [header, ...rows] = csv.slice(1).trimEnd().split('\r\n').map(parseRecord);
  assert.equal(rows.length, selection.length);
  for (const [index, values] of rows.entries()) {
    assert.equal(values.length, header.length);
    const record = Object.fromEntries(header.map((field, position) => [field, values[position]]));
    const original = selection[index];
    for (const [field, value] of Object.entries(original)) {
      assert.equal(record[field], field === 'reviewUrl' ? `https://roboskin.ai${value}` : value);
    }
    assert.equal(record.recordUrl, `https://roboskin.ai/benchmarks#result-${original.id}`);
  }
});

test('an empty export contains headers only and export text cannot start a spreadsheet formula', () => {
  assert.equal(buildExperimentCsv([]).trimEnd().split('\r\n').length, 1);
  const modified = { ...experimentEvidence[0], result: '=1+1', limitation: 'A "quoted", comma-separated limit' };
  const [header, row] = buildExperimentCsv([modified]).slice(1).trimEnd().split('\r\n').map(parseRecord);
  assert.equal(row[header.indexOf('result')], "'=1+1");
  assert.equal(row[header.indexOf('limitation')], modified.limitation);
});

test('batch attribution includes only the released route cohort', () => {
  for (const path of ['/benchmarks', '/sensors', '/sensors/digit', '/sensors/gelsight-mini', '/sensors/reskin']) {
    assert.equal(growthBatchForPath(path), evidenceBatch);
  }
  for (const path of ['/', '/datasets', '/sensors/not-published', '/news/example']) {
    assert.equal(growthBatchForPath(path), 'existing-site');
  }
});
