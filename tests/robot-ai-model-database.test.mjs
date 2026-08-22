import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  filterRobotAiModels,
  robotAiModelCategories,
  robotAiModelEntries,
  tactileInputStatuses,
} from '../src/lib/robot-ai-models.ts';

const trustedPrimarySourceHosts = new Set([
  'arxiv.org',
  'adept-dexterity.github.io',
  'deepmind.google',
  'github.com',
  'huggingface.co',
  'icr-lab.github.io',
  'cocacola-lab.github.io',
  'jxbi1010.github.io',
  'octo-models.github.io',
  'openvla.github.io',
  'phanes-lab.github.io',
  'research.google',
  'research.nvidia.com',
  'sparsh-ssl.github.io',
  'tactile-reactive-dexterous.github.io',
  'univtac.github.io',
  'www.pi.website',
]);

test('robot AI model records are unique, typed, dated, and evidence bounded', () => {
  assert.ok(robotAiModelEntries.length >= 8, 'database must start with at least eight verified models');
  assert.ok(robotAiModelEntries.length <= 20, 'directory should remain curated rather than bulk generated');

  const ids = robotAiModelEntries.map((entry) => entry.id);
  assert.equal(new Set(ids).size, ids.length, 'model IDs must be unique');

  const coveredCategories = new Set();
  const coveredTactileStatuses = new Set();

  for (const entry of robotAiModelEntries) {
    assert.match(entry.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${entry.name} has an invalid ID`);
    assert.ok(robotAiModelCategories.includes(entry.category), `${entry.name} has an invalid category`);
    assert.ok(tactileInputStatuses.includes(entry.tactileInput), `${entry.name} has an invalid tactile-input status`);
    coveredCategories.add(entry.category);
    coveredTactileStatuses.add(entry.tactileInput);

    assert.match(entry.releaseDate, /^20\d{2}-\d{2}-\d{2}$/, `${entry.name} must use an ISO release date`);
    assert.equal(
      new Date(`${entry.releaseDate}T00:00:00Z`).toISOString().slice(0, 10),
      entry.releaseDate,
      `${entry.name} has an impossible release date`,
    );
    assert.ok(entry.releaseDate <= entry.sourceReviewed, `${entry.name} cannot be reviewed before release`);
    assert.match(entry.sourceReviewed, /^20\d{2}-\d{2}-\d{2}$/, `${entry.name} must carry a review date`);

    for (const [field, value] of Object.entries({
      name: entry.name,
      organization: entry.organization,
      outputType: entry.outputType,
      trainingDataSummary: entry.trainingDataSummary,
      realRobotEvaluation: entry.realRobotEvaluation,
      availability: entry.availability,
      license: entry.license,
      evidenceLimitations: entry.evidenceLimitations,
    })) {
      assert.equal(typeof value, 'string', `${entry.name}.${field} must be text`);
      assert.ok(value.trim().length > 2, `${entry.name}.${field} must not be empty`);
      assert.doesNotMatch(value, /\b(?:TBD|TODO|lorem ipsum)\b/i, `${entry.name}.${field} contains placeholder copy`);
    }

    assert.ok(entry.inputModalities.length > 0, `${entry.name} must state at least one input modality`);
    assert.ok(entry.embodiments.length > 0, `${entry.name} must state the evaluated embodiment or its disclosure limit`);
    assert.ok(entry.evidenceLimitations.length >= 120, `${entry.name} needs a substantive evidence boundary`);
    assert.ok(Array.isArray(entry.creatorOrganizations), `${entry.name} must use a structured creator list`);
    for (const organization of entry.creatorOrganizations) {
      assert.ok(organization.trim().length > 2, `${entry.name} has an empty creator organization`);
      assert.doesNotMatch(organization, /research team|authors? listed|unknown/i, `${entry.name} cannot publish a placeholder organization entity`);
    }

    const projectUrl = new URL(entry.projectUrl);
    assert.equal(projectUrl.protocol, 'https:', `${entry.name} project URL must use HTTPS`);

    if (entry.paperUrl !== null) {
      const paperUrl = new URL(entry.paperUrl);
      assert.equal(paperUrl.protocol, 'https:', `${entry.name} paper URL must use HTTPS`);
    } else {
      assert.match(
        `${entry.availability} ${entry.evidenceLimitations}`,
        /(?:no|not).*?(?:paper|research)/i,
        `${entry.name} must explicitly explain a missing paper`,
      );
    }

    const minimumSourceCount = entry.projectUrl === entry.paperUrl ? 1 : 2;
    assert.ok(
      entry.primarySources.length >= minimumSourceCount,
      `${entry.name} needs enough distinct primary or official sources for its available artifacts`,
    );
    assert.equal(
      new Set(entry.primarySources.map((source) => source.url)).size,
      entry.primarySources.length,
      `${entry.name} contains duplicate source URLs`,
    );
    assert.ok(
      entry.primarySources.some((source) => source.url === entry.projectUrl),
      `${entry.name} project URL must be represented in primarySources`,
    );
    if (entry.paperUrl) {
      assert.ok(
        entry.primarySources.some((source) => source.url === entry.paperUrl && source.type === 'paper'),
        `${entry.name} paper URL must be represented as a paper source`,
      );
    }

    for (const source of entry.primarySources) {
      const sourceUrl = new URL(source.url);
      assert.equal(sourceUrl.protocol, 'https:', `${entry.name} source must use HTTPS`);
      assert.ok(trustedPrimarySourceHosts.has(sourceUrl.hostname), `${entry.name} uses an unreviewed source host: ${sourceUrl.hostname}`);
      assert.ok(source.label.trim().length >= 5, `${entry.name} source needs a descriptive label`);
    }
  }

  for (const requiredCategory of ['VLM', 'VLA', 'embodied reasoning', 'world model', 'robot policy', 'tactile model']) {
    assert.ok(coveredCategories.has(requiredCategory), `initial database must cover ${requiredCategory}`);
  }
  assert.ok(coveredTactileStatuses.has('yes'), 'directory must include models with verified tactile input');
  assert.ok(coveredTactileStatuses.has('no'), 'directory must distinguish models without documented tactile input');
  assert.ok(
    robotAiModelEntries.some((entry) => /not disclosed|not publicly disclosed|not verified/i.test([
      entry.trainingDataSummary,
      entry.availability,
      entry.license,
      entry.evidenceLimitations,
    ].join(' '))),
    'unknown facts must be stated instead of inferred',
  );
  const openVla = robotAiModelEntries.find((entry) => entry.id === 'openvla-7b');
  assert.ok(openVla?.creatorOrganizations.includes('Physical Intelligence'), 'OpenVLA must retain the official Physical Intelligence affiliation');
  const dreamTac = robotAiModelEntries.find((entry) => entry.id === 'dream-tac');
  assert.deepEqual(dreamTac?.creatorOrganizations, [], 'unknown Dream-Tac organization entities must be omitted from schema');
});

test('robot AI model filtering preserves exact role, tactile, year, and text semantics', () => {
  assert.deepEqual(
    filterRobotAiModels(robotAiModelEntries, { category: 'tactile model' }).map((entry) => entry.id),
    ['univtac-encoder', 'touchworld', 'sparsh'],
  );
  assert.deepEqual(
    filterRobotAiModels(robotAiModelEntries, { tactileInput: 'yes' }).map((entry) => entry.id).sort(),
    ['adept', 'dream-tac', 'retouch', 'sparsh', 't-rex', 'tac4loco', 'tau-touch-augmented-vla', 'touchworld', 'unitacvla', 'univtac-encoder', 'vitar', 'vla-touch'],
  );
  assert.deepEqual(
    filterRobotAiModels(robotAiModelEntries, { query: 'franka duo' }).map((entry) => entry.id),
    ['gemini-robotics-2'],
  );
  assert.ok(
    filterRobotAiModels(robotAiModelEntries, { query: 'humanoid', year: '2025' }).some((entry) => entry.id === 'isaac-gr00t-n1'),
    'combined filters should find the 2025 humanoid entry',
  );
  assert.deepEqual(
    filterRobotAiModels(robotAiModelEntries, { query: 'MIT' }).map((entry) => entry.id).sort(),
    ['octo', 'openvla-7b', 't-rex', 'univtac-encoder', 'vla-touch'],
    'evidence search must include license text',
  );
  assert.deepEqual(
    filterRobotAiModels(robotAiModelEntries, { query: 'π0 (Pi Zero)' }).map((entry) => entry.id),
    ['pi0'],
    'short Unicode model names must remain directly searchable',
  );
  assert.deepEqual(
    filterRobotAiModels(robotAiModelEntries, { query: 'model card' }).map((entry) => entry.id),
    ['gemini-robotics-er-2', 't-rex'],
    'evidence search must include primary-source labels and types',
  );
  assert.equal(
    filterRobotAiModels(robotAiModelEntries, { query: '  ' }).length,
    robotAiModelEntries.length,
    'blank search must keep all server-rendered records visible',
  );
});

test('model explorer keeps complete rows in initial markup and exposes accessible controls', async () => {
  const component = await readFile(new URL('../src/components/RobotAiModelExplorer.tsx', import.meta.url), 'utf8');

  assert.match(component, /^'use client';/);
  assert.match(component, /filteredEntries\.map\(\(entry\) =>/);
  assert.match(component, /<table/);
  assert.match(component, /<caption className="sr-only">/);
  assert.match(component, /<th scope="row"/);
  assert.match(component, /<label className=/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /tabIndex=\{0\}/);
  assert.match(component, /md:min-w-\[1840px\]/);
  assert.match(component, /md:table-row/);
  assert.match(component, /md:hidden">Evidence boundary \/ sources/);
  assert.doesNotMatch(component, /className="w-full min-w-\[1840px\]/);
  assert.match(component, /entry\.trainingDataSummary/);
  assert.match(component, /entry\.realRobotEvaluation/);
  assert.match(component, /entry\.evidenceLimitations/);
  assert.match(component, /entry\.primarySources\.map/);
  assert.match(component, /organizations#organization-/);
  assert.match(component, /organizationByAlias/);
  assert.doesNotMatch(component, /ssr\s*:\s*false|next\/dynamic/);
});
