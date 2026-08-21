import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('organization records normalize the twelve verified identities without placeholders', async () => {
  const source = await read('src/lib/research-organizations.ts');

  for (const id of [
    'google-deepmind',
    'google-research',
    'technische-universitaet-berlin',
    'stanford-university',
    'university-of-california-berkeley',
    'toyota-research-institute',
    'physical-intelligence',
    'massachusetts-institute-of-technology',
    'carnegie-mellon-university',
    'nvidia',
    'meta-fundamental-ai-research',
    'university-of-washington',
  ]) {
    assert.match(source, new RegExp(`id: '${id}'`));
  }

  assert.match(source, /aliases: \['UC Berkeley', 'Berkeley'\]/);
  assert.match(source, /aliases: \['MIT'\]/);
  assert.match(source, /aliases: \['FAIR at Meta', 'Meta FAIR', 'FAIR'\]/);
  assert.match(source, /Duplicate research-organization alias/);
  assert.match(source, /Unresolved robot AI organization label/);
  assert.doesNotMatch(source, /Research team listed|authors? listed|unknown organization/i);
});

test('model-organization relations preserve evidence strength and primary-source provenance', async () => {
  const source = await read('src/lib/research-organizations.ts');

  assert.match(source, /'developedBy'/);
  assert.match(source, /'coDevelopedBy'/);
  assert.match(source, /'contributedBy'/);
  assert.match(source, /evidenceUrls: string\[\]/);
  assert.match(source, /primarySourceUrls\.has\(evidenceUrl\)/);
  assert.match(source, /model\.creatorOrganizations\.map/);
  assert.match(source, /modelId: 'openvla-7b'[\s\S]*?relation: 'contributedBy'/);
  assert.match(source, /modelId: 'octo'[\s\S]*?relation: 'contributedBy'/);
  assert.match(source, /modelId: 'palm-e'[\s\S]*?relation: 'coDevelopedBy'/);
  assert.match(source, /modelId: 'isaac-gr00t-n1'[\s\S]*?relation: 'developedBy'/);
  assert.doesNotMatch(source, /modelId: 'dream-tac'/);
});

test('organization directory is server-rendered, evidence bounded, and schema connected', async () => {
  const [page, schema, seo, protectedUrls] = await Promise.all([
    read('src/app/organizations/page.tsx'),
    read('src/lib/research-organization-schema.ts'),
    read('src/lib/seo.ts'),
    read('config/protected-urls.json'),
  ]);

  assert.doesNotMatch(page, /^'use client';/);
  assert.match(page, /Robot AI research organizations, labs, and companies/);
  assert.match(page, /does not establish ownership, funding, endorsement, current employment/);
  assert.match(page, /id=\{`organization-\$\{organization\.id\}`\}/);
  assert.match(page, /Relationship source/);
  assert.match(page, /This is a source map, not a ranking/);

  assert.match(schema, /'@type': 'ItemList'/);
  assert.match(schema, /'CollegeOrUniversity'/);
  assert.match(schema, /'Organization'/);
  assert.match(schema, /sameAs: \[organization\.officialUrl\]/);
  assert.match(schema, /contributor:/);
  assert.doesNotMatch(schema, /funder|sponsor|parentOrganization|AggregateRating|Review/);

  assert.match(seo, /'\/organizations': \{[\s\S]*?index: true/);
  assert.match(protectedUrls, /https:\/\/roboskin\.ai\/organizations/);
});
