import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const root = new URL('../public/resources/', import.meta.url);
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

test('published evidence files retain the bytes declared by each kit', async () => {
  for (const directory of ['robot-data/v2026.10.28/', 'tactile-icl/v2026.10.28/']) {
    const base = new URL(directory, root);
    const sums = (await readFile(new URL('SHA256SUMS.txt', base), 'utf8')).trim().split(/\r?\n/);
    for (const line of sums) {
      const [, expected, file] = line.match(/^([a-f0-9]{64})  ([\w.-]+)$/) || [];
      assert.ok(file, `Invalid checksum entry: ${line}`);
      assert.equal(sha256(await readFile(new URL(file, base))), expected, `${directory}${file}`);
    }
  }
});

test('recorded audit identifies the exact inspector and count semantics', async () => {
  const base = new URL('tactile-icl/v2026.10.28/', root);
  const report = JSON.parse(await readFile(new URL('input-audit.json', base), 'utf8'));
  assert.equal(report.inspector_sha256, sha256(await readFile(new URL('inspect_release.py', base))));
  assert.equal(report.evidence_type, 'offline_published_input_audit');
  assert.ok(Number.isFinite(Date.parse(report.executed_at_utc)));
  for (const key of ['A_observations_per_fingertip', 'B_released_observations_per_fingertip', 'C_observations_per_fingertip']) {
    assert.equal(report.totals[key], report.segments.reduce((sum, segment) => sum + segment[key], 0));
  }
  const overlap = report.episodes.reduce((sum, episode) => sum + episode.segments - 1, 0);
  assert.equal(report.totals.C_observations_per_fingertip - report.totals.raw_rows, overlap);
  const config = JSON.parse(await readFile(new URL('experiment-config.json', base), 'utf8'));
  assert.equal(config.status, 'proposed_not_executed');
  assert.equal(config.outcomes, null);
  assert.equal(config.model_snapshot, null);
});
