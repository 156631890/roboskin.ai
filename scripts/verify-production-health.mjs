import { execFile, execFileSync } from 'node:child_process';
import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const repository = '156631890/roboskin.ai';
const productionOrigin = 'https://roboskin.ai';
const shaPattern = /^[a-f0-9]{40}$/i;

export function deploymentCandidate(event) {
  if (event.repository?.full_name !== repository) return { reason: 'unrelated_repository' };
  if (event.deployment_status?.state !== 'success') return { reason: 'deployment_not_successful' };
  if (event.deployment?.environment !== 'Production – roboskin-ai') return { reason: 'unrelated_deployment_environment' };
  if (event.deployment?.creator?.login !== 'vercel[bot]') return { reason: 'unrelated_deployment_creator' };
  if (!shaPattern.test(event.deployment?.sha || '')) return { reason: 'invalid_deployment_sha' };
  return { sha: event.deployment.sha, deploymentId: event.deployment.id };
}

export async function verifyProductionHealth({
  event,
  checkedOutSha,
  readMainSha,
  readProductionSha,
  runVerifier,
  now = Date.now,
  sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
  readinessTimeoutMs = 180_000,
  pollIntervalMs = 10_000,
}) {
  const candidate = deploymentCandidate(event);
  const report = {
    status: 'ignored', ok: false, verified: false, baseUrl: productionOrigin,
    checkedAt: new Date(now()).toISOString(), expectedSha: candidate.sha,
    deploymentId: candidate.deploymentId, attempts: 0, verifiers: [],
  };
  const finish = (status, reason) => ({ ...report, status, reason, ok: status === 'passed', verified: status === 'passed' });
  if (!candidate.sha) return finish('ignored', candidate.reason);
  if (checkedOutSha !== candidate.sha) return finish('failed', 'The checked-out commit differs from the successful deployment event.');
  const deadline = now() + readinessTimeoutMs;
  try {
    while (true) {
      if (now() >= deadline) return finish('timed_out', 'The public apex did not serve the expected deployment within the readiness window.');
      report.attempts += 1;
      report.currentMainSha = await readMainSha({ timeoutMs: Math.min(10_000, deadline - now()) });
      if (!shaPattern.test(report.currentMainSha || '')) throw new Error('Latest main returned an invalid commit identity.');
      if (report.currentMainSha !== candidate.sha) return finish('superseded', 'Latest main points to a different commit; verification of this deployment event was skipped.');
      if (now() >= deadline) return finish('timed_out', 'The readiness window expired while checking latest main.');
      try {
        report.observedSha = await readProductionSha({ expectedSha: candidate.sha, attempt: report.attempts, timeoutMs: Math.min(10_000, deadline - now()) });
        delete report.lastReadinessError;
      } catch (error) {
        report.observedSha = null;
        report.lastReadinessError = error.message;
      }
      if (report.observedSha === candidate.sha) break;
      if (now() >= deadline) return finish('timed_out', 'The public apex did not serve the expected deployment within the readiness window.');
      await sleep(Math.min(pollIntervalMs, deadline - now()));
    }
  } catch (error) {
    return finish('failed', `Cannot establish deployment identity: ${error.message}`);
  }

  try {
    for (const verifier of ['production', 'agent-markdown']) {
      await runVerifier(verifier, candidate.sha);
      report.verifiers.push({ name: verifier, ok: true });
    }
  } catch (error) {
    report.verifiers.push({ name: report.verifiers.length ? 'agent-markdown' : 'production', ok: false });
    // A rollout during the longer verifier can invalidate its source contract.
    // Preserve its failure evidence, but do not call an obsolete SHA healthy.
    try {
      const latest = await readMainSha({ timeoutMs: 10_000 });
      if (shaPattern.test(latest || '')) report.currentMainSha = latest;
    } catch { /* Retain the verification failure. */ }
    if (report.currentMainSha !== candidate.sha) return finish('superseded', `Latest main changed during verification. The obsolete run stopped: ${error.message}`);
    return finish('failed', error.message);
  }

  try {
    report.currentMainSha = await readMainSha({ timeoutMs: 10_000 });
    if (!shaPattern.test(report.currentMainSha || '')) throw new Error('Latest main returned an invalid commit identity.');
    if (report.currentMainSha !== candidate.sha) return finish('superseded', 'Latest main changed during verification; this result is not a pass for current production.');
    report.observedSha = await readProductionSha({ expectedSha: candidate.sha, attempt: report.attempts + 1, timeoutMs: 10_000 });
    if (report.observedSha !== candidate.sha) return finish('failed', 'The public deployment changed during verification.');
  } catch (error) {
    return finish('failed', `Cannot confirm deployment identity after verification: ${error.message}`);
  }
  return finish('passed', 'Both production and Markdown HTTP verification passed for latest main on the public apex.');
}

async function readMainSha({ timeoutMs }) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'RoboSkin-production-health/1.0', 'X-GitHub-Api-Version': '2022-11-28' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(`https://api.github.com/repos/${repository}/git/ref/heads/main`, {
    headers, redirect: 'error', signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) throw new Error(`GitHub main lookup returned HTTP ${response.status}.`);
  return (await response.json()).object?.sha;
}

async function readProductionSha({ expectedSha, attempt, timeoutMs }) {
  const url = new URL('/deployment.json', productionOrigin);
  url.searchParams.set('geo_expected_sha', expectedSha);
  url.searchParams.set('geo_attempt', String(attempt));
  const response = await fetch(url, {
    headers: { Accept: 'application/json', 'Cache-Control': 'no-cache', 'User-Agent': 'RoboSkin-production-health/1.0' },
    redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) throw new Error(`Public deployment identity returned HTTP ${response.status}.`);
  if (!(response.headers.get('content-type') || '').includes('application/json')) throw new Error('Public deployment identity did not return JSON.');
  const sha = (await response.json()).commitSha;
  if (!shaPattern.test(sha || '')) throw new Error('Public deployment identity returned an invalid SHA.');
  return sha;
}

async function runVerifier(name, expectedSha) {
  const script = name === 'production' ? 'scripts/verify-production.mjs' : 'scripts/verify-agent-markdown.mjs';
  let result;
  let failure;
  try {
    result = await execFileAsync(process.execPath, [script, productionOrigin], {
      env: { ...process.env, EXPECTED_COMMIT_SHA: expectedSha }, timeout: 300_000, maxBuffer: 8 * 1024 * 1024,
    });
  } catch (error) {
    result = { stdout: error.stdout || '', stderr: error.stderr || '' };
    failure = error;
  }
  await writeFile(`.artifacts/production-health-${name}.log`, `${result.stdout}${result.stderr}`);
  if (name === 'agent-markdown' && result.stdout) await writeFile('.artifacts/agent-markdown-verification.json', result.stdout);
  if (failure) throw new Error(`${name} verifier failed (${failure.killed ? 'execution timeout' : `exit ${failure.code ?? 'unknown'}`}); see its saved log.`);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  await mkdir('.artifacts', { recursive: true });
  let report;
  try {
    if (!process.env.GITHUB_EVENT_PATH) throw new Error('GITHUB_EVENT_PATH is required; this runner accepts deployment events only.');
    const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
    report = await verifyProductionHealth({
      event, checkedOutSha: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
      readMainSha, readProductionSha, runVerifier,
    });
  } catch (error) {
    report = { status: 'failed', ok: false, verified: false, baseUrl: productionOrigin, reason: error.message };
  }
  await writeFile('.artifacts/production-health.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY,
    `Production response verification: **${report.status}**\n\n${report.reason}\n\nExpected SHA: \`${report.expectedSha || 'unavailable'}\`\n`);
  if (['failed', 'timed_out'].includes(report.status)) process.exitCode = 1;
}
