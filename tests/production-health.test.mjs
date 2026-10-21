import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { deploymentCandidate, verifyProductionHealth } from '../scripts/verify-production-health.mjs';

const expectedSha = 'a'.repeat(40);
const otherSha = 'b'.repeat(40);
const event = {
  repository: { full_name: '156631890/roboskin.ai' },
  deployment: { id: 123, sha: expectedSha, environment: 'Production – roboskin-ai', production_environment: false, creator: { login: 'vercel[bot]' } },
  deployment_status: { state: 'success', environment_url: 'https://unrelated-preview.example' },
};

function harness(overrides = {}) {
  let time = 0;
  const calls = [];
  return {
    calls,
    options: {
      event, checkedOutSha: expectedSha,
      readMainSha: async () => expectedSha,
      readProductionSha: async () => expectedSha,
      runVerifier: async (name, sha) => { calls.push({ name, sha }); },
      now: () => time,
      sleep: async (milliseconds) => { time += milliseconds; },
      readinessTimeoutMs: 30, pollIntervalMs: 10,
      ...overrides,
    },
  };
}

test('only successful deployments from the real production project qualify', () => {
  assert.equal(deploymentCandidate(event).sha, expectedSha, 'Vercel currently sets production_environment=false even for the production environment');
  for (const mutate of [
    (e) => { e.repository.full_name = 'other/repository'; },
    (e) => { e.deployment_status.state = 'pending'; },
    (e) => { e.deployment_status.state = 'failure'; },
    (e) => { e.deployment.environment = 'Production – roboskin-ai-vnqs'; },
    (e) => { e.deployment.environment = 'Preview – roboskin-ai'; },
    (e) => { e.deployment.creator.login = 'someone-else'; },
    (e) => { e.deployment.sha = 'main'; },
  ]) {
    const wrong = structuredClone(event);
    mutate(wrong);
    assert.equal(deploymentCandidate(wrong).sha, undefined);
  }
});

test('wrong events and checkout identities cannot run production verification', async () => {
  const wrong = structuredClone(event);
  wrong.deployment_status.state = 'error';
  const ignored = harness({ event: wrong, readMainSha: async () => { throw new Error('must not query'); } });
  assert.equal((await verifyProductionHealth(ignored.options)).status, 'ignored');
  assert.equal(ignored.calls.length, 0);
  const mismatch = harness({ checkedOutSha: otherSha });
  const result = await verifyProductionHealth(mismatch.options);
  assert.equal(result.status, 'failed');
  assert.equal(result.verified, false);
  assert.equal(mismatch.calls.length, 0);
});

test('an obsolete event is superseded without claiming successful verification', async () => {
  const h = harness({ readMainSha: async () => otherSha, readProductionSha: async () => { throw new Error('must not query'); } });
  const result = await verifyProductionHealth(h.options);
  assert.equal(result.status, 'superseded');
  assert.equal(result.ok, false);
  assert.equal(result.verified, false);
  assert.equal(h.calls.length, 0);
});

test('the runner waits for the event SHA on the fixed apex before both verifiers', async () => {
  let reads = 0;
  const h = harness({ readProductionSha: async () => ++reads === 1 ? otherSha : expectedSha });
  const result = await verifyProductionHealth(h.options);
  assert.equal(result.status, 'passed');
  assert.equal(result.baseUrl, 'https://roboskin.ai');
  assert.equal(result.attempts, 2);
  assert.equal(reads, 3, 'The apex identity must be rechecked after verification');
  assert.deepEqual(h.calls, [{ name: 'production', sha: expectedSha }, { name: 'agent-markdown', sha: expectedSha }]);
});

test('a SHA mismatch or transient outage can only wait for the bounded readiness window', async () => {
  for (const readProductionSha of [async () => otherSha, async () => { throw new Error('HTTP 503'); }]) {
    const h = harness({ readProductionSha });
    const result = await verifyProductionHealth(h.options);
    assert.equal(result.status, 'timed_out');
    assert.equal(result.attempts, 3);
    assert.equal(result.ok, false);
    assert.equal(h.calls.length, 0);
  }
});

test('production and Markdown verifier failures propagate and never become a pass', async () => {
  for (const failing of ['production', 'agent-markdown']) {
    const names = [];
    const h = harness({ runVerifier: async (name) => { names.push(name); if (name === failing) throw new Error(`${name} failed`); } });
    const result = await verifyProductionHealth(h.options);
    assert.equal(result.status, 'failed');
    assert.equal(result.ok, false);
    assert.equal(result.verified, false);
    assert.match(result.reason, new RegExp(`${failing} failed`));
    assert.equal(names.length, failing === 'production' ? 1 : 2);
  }
});

test('a rollout during verification is superseded rather than reported as current production success', async () => {
  let checks = 0;
  const h = harness({ readMainSha: async () => ++checks === 1 ? expectedSha : otherSha });
  const result = await verifyProductionHealth(h.options);
  assert.equal(result.status, 'superseded');
  assert.equal(result.ok, false);
  assert.equal(result.verifiers.length, 2);
});

test('an unexpected apex change after checks fails even if latest main is unchanged', async () => {
  let reads = 0;
  const h = harness({ readProductionSha: async () => ++reads === 1 ? expectedSha : otherSha });
  assert.equal((await verifyProductionHealth(h.options)).status, 'failed');
});

test('missing identity permissions are failures, not superseded or healthy results', async () => {
  const h = harness({ readMainSha: async () => { throw new Error('HTTP 403'); } });
  const result = await verifyProductionHealth(h.options);
  assert.equal(result.status, 'failed');
  assert.equal(h.calls.length, 0);
});

test('the CLI returns a failing exit code and writes evidence when no event is provided', async () => {
  const cwd = await mkdtemp(path.join(os.tmpdir(), 'roboskin-health-cli-'));
  const script = fileURLToPath(new URL('../scripts/verify-production-health.mjs', import.meta.url));
  const child = spawnSync(process.execPath, [script], { cwd, env: { ...process.env, GITHUB_EVENT_PATH: '', GITHUB_STEP_SUMMARY: '' }, encoding: 'utf8' });
  assert.equal(child.status, 1);
  const report = JSON.parse(await readFile(path.join(cwd, '.artifacts/production-health.json'), 'utf8'));
  assert.equal(report.status, 'failed');
  assert.equal(report.verified, false);
});

