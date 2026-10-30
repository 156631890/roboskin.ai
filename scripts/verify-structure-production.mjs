import { spawnSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { appendFile } from 'node:fs/promises';

const expected = process.env.EXPECTED_COMMIT_SHA;
if (!expected) throw new Error('EXPECTED_COMMIT_SHA is required');
let deployed;
for (let attempt = 0; attempt < 40; attempt++) {
  try {
    const response = await fetch('https://roboskin.ai/deployment.json', { cache: 'no-store', signal: AbortSignal.timeout(15000) });
    const record = await response.json();
    console.log(`Production deployment check ${attempt + 1}: ${JSON.stringify(record)}`);
    if (JSON.stringify(record).includes(expected)) { deployed = record; break; }
  } catch (error) { console.log(`Production deployment pending: ${error.message}`); }
  await delay(15000);
}
if (!deployed) throw new Error(`Production did not expose expected commit ${expected}; no deployment was triggered by this verifier`);
for (const args of [['scripts/verify-production.mjs', 'https://roboskin.ai'], ['scripts/verify-structure.mjs', '--batch', '3', '--base', 'https://roboskin.ai']]) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit', env: process.env });
  if (result.status !== 0) throw new Error(`${args[0]} failed with ${result.status}`);
}
await appendFile('docs/seo/structure-20261030/gsc-tracking.md', `\nProduction verified at ${new Date().toISOString()}. Commit: ${expected}. Deployment response: ${JSON.stringify(deployed)}.\n`);
