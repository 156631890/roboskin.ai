import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('robot AI model directory exposes source-bounded entity schema', async () => {
  const schema = await read('src/lib/robot-ai-schema.ts');

  assert.match(schema, /buildRobotAiModelDirectoryJsonLd/);
  assert.match(schema, /'@type': 'ItemList'/);
  assert.match(schema, /'@type': 'CreativeWork'/);
  assert.match(schema, /numberOfItems: entries\.length/);
  assert.match(schema, /citation: entry\.primarySources\.map/);
  assert.match(schema, /abstract: entry\.evidenceLimitations/);
  assert.match(schema, /robotAiOrganizationRelations\.filter/);
  assert.match(schema, /creatorAliases\.map\(organizationReference\)/);
  assert.match(schema, /contributorAliases\.map\(organizationReference\)/);
  assert.match(schema, /canonicalUrl\('\/organizations'\)/);
  assert.match(schema, /#organization-\$\{organization\.id\}/);
  assert.doesNotMatch(schema, /dateModified:\s*entry\.sourceReviewed/);
  assert.doesNotMatch(schema, /name:\s*entry\.organization/);
  assert.doesNotMatch(schema, /'@type': 'Organization',\s*name/);
  assert.doesNotMatch(schema, /AggregateRating|ratingValue|reviewRating|['"]@type['"]:\s*['"]Review['"]/);
});
