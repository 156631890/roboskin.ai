import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  robotWorldModelConditioningKinds,
  robotWorldModelEvidenceEntries,
} from '../src/lib/robot-world-models.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const trustedSourceHosts = new Set([
  'arxiv.org',
  'github.com',
  'phanes-lab.github.io',
  'vitacworld.github.io',
]);

const internalEvidencePaths = new Set([
  '/research/dream-tac-tactile-world-action-model-2026',
  '/research/feelworld-visuo-tactile-world-model-2026',
  '/research/hitac-wam-hierarchical-tactile-world-action-model-2026',
  '/news/touchworld-tactile-foundation-model-dexterous-manipulation-2026',
  '/guides/visuo-tactile-world-models-robot-manipulation',
]);

test('world-model evidence records are unique, source-bounded, and explicit about unknown artifacts', () => {
  assert.ok(robotWorldModelEvidenceEntries.length >= 5);
  assert.ok(robotWorldModelEvidenceEntries.length <= 8, 'the evidence center must remain curated');

  const ids = robotWorldModelEvidenceEntries.map((entry) => entry.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const requiredId of ['dream-tac', 'feelworld', 'hitac-wam', 'touchworld', 'vitacworld']) {
    assert.ok(ids.includes(requiredId), `${requiredId} is missing from the evidence center`);
  }

  for (const entry of robotWorldModelEvidenceEntries) {
    assert.match(entry.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(entry.releaseDate, /^20\d{2}-\d{2}-\d{2}$/);
    assert.match(entry.sourceReviewed, /^20\d{2}-\d{2}-\d{2}$/);
    assert.ok(entry.releaseDate <= entry.sourceReviewed);
    assert.ok(robotWorldModelConditioningKinds.includes(entry.actionConditioning.kind));
    assert.ok(entry.predictionTarget.length >= 80);
    assert.ok(entry.actionConditioning.description.length >= 100);
    assert.ok(entry.operationalRole.length >= 100);
    assert.ok(entry.robotSensorTaskBoundary.length >= 120);
    assert.ok(entry.realRobotEvidence.length >= 120);
    assert.ok(entry.limitations.length >= 160);
    assert.ok(internalEvidencePaths.has(entry.internalEvidencePath));
    assert.ok(entry.primarySources.some((source) => source.type === 'paper'));

    for (const source of entry.primarySources) {
      const url = new URL(source.url);
      assert.equal(url.protocol, 'https:');
      assert.ok(trustedSourceHosts.has(url.hostname), `${entry.name} uses an unreviewed source host`);
    }

    for (const value of Object.values(entry.artifacts)) {
      assert.ok(value.length >= 20);
      assert.doesNotMatch(value, /\b(?:TBD|TODO|coming eventually)\b/i);
    }
  }

  const conditioningKinds = new Set(robotWorldModelEvidenceEntries.map((entry) => entry.actionConditioning.kind));
  assert.deepEqual(
    [...conditioningKinds].sort(),
    ['candidate-conditioned', 'joint-generation', 'subtask-conditioned'],
  );
  assert.match(
    robotWorldModelEvidenceEntries.find((entry) => entry.id === 'vitacworld')?.artifacts.code ?? '',
    /GitHub Coming Soon/,
  );
  assert.match(
    robotWorldModelEvidenceEntries.find((entry) => entry.id === 'touchworld')?.realRobotEvidence ?? '',
    /without disclosing the exact clean-versus-perturbation split/,
  );
});

test('world-model evidence table is server rendered, accessible, and uses stable anchors', async () => {
  const component = await read('src/components/RobotWorldModelEvidenceTable.tsx');

  assert.doesNotMatch(component, /^'use client';/);
  assert.match(component, /entries\.map\(\(entry\) =>/);
  assert.match(component, /id=\{`world-model-\$\{entry\.id\}`\}/);
  assert.match(component, /id="world-model-evidence"/);
  assert.match(component, /<caption className="sr-only">/);
  assert.match(component, /scope="row"/);
  assert.match(component, /tabIndex=\{0\}/);
  assert.match(component, /This is not a leaderboard/);
  assert.match(component, /entry\.limitations/);
  assert.match(component, /entry\.primarySources\.map/);
  assert.match(component, /entry\.artifacts/);
  assert.match(component, /entry\.internalEvidencePath/);
});

test('world-model route and schema share one data source without creating a second URL', async () => {
  const [route, schema, topics] = await Promise.all([
    read('src/app/robot-world-models/page.tsx'),
    read('src/lib/robot-world-model-schema.ts'),
    read('src/content/seo-topic-pages.ts'),
  ]);

  assert.match(route, /robotWorldModelEvidenceEntries/);
  assert.match(route, /buildRobotWorldModelEvidenceJsonLd\(robotWorldModelEvidenceEntries\)/);
  assert.match(route, /<RobotWorldModelEvidenceTable entries=\{robotWorldModelEvidenceEntries\}/);
  assert.match(schema, /'@type': 'ItemList'/);
  assert.match(schema, /'@type': 'CreativeWork'/);
  assert.match(schema, /numberOfItems: entries\.length/);
  assert.match(schema, /citation: entry\.primarySources\.map/);
  assert.match(schema, /additionalProperty/);
  assert.match(schema, /PropertyValue/);
  assert.match(schema, /Source reviewed/);
  assert.doesNotMatch(schema, /dateModified:\s*entry\.sourceReviewed/);
  assert.doesNotMatch(schema, /AggregateRating|ratingValue|reviewRating|['"]@type['"]:\s*['"]Review['"]/);
  assert.equal((topics.match(/path: '\/robot-world-models'/g) ?? []).length, 1);
  assert.match(topics, /href: '\/robot-world-models#world-model-evidence'/);
});

test('llms-full publishes the same world-model evidence records and boundaries', async () => {
  const [llmsFull, exportVerifier, productionVerifier] = await Promise.all([
    read('src/lib/llms-full.ts'),
    read('scripts/verify-export.mjs'),
    read('scripts/verify-production.mjs'),
  ]);

  assert.match(llmsFull, /robotWorldModelEvidenceEntries/);
  assert.match(llmsFull, /Robot world-model evidence records/);
  assert.match(llmsFull, /## Robot World Model Evidence/);
  assert.match(llmsFull, /Action-conditioning class/);
  assert.match(llmsFull, /Robot, sensor, and task boundary/);
  assert.match(llmsFull, /Artifact license evidence/);
  assert.match(llmsFull, /canonicalUrl\(`\/robot-world-models#world-model-\$\{entry\.id\}`\)/);
  for (const verifier of [exportVerifier, productionVerifier]) {
    assert.match(verifier, /worldModelIds = \['dream-tac', 'feelworld', 'hitac-wam', 'touchworld', 'vitacworld'\]/);
    assert.match(verifier, /world-model-evidence/);
    assert.match(verifier, /Robot world-model evidence records/);
    assert.match(verifier, /GitHub Coming Soon/);
  }
});
