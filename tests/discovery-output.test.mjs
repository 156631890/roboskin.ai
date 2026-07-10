import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('CSV and JSON routes serialize the shared research index', async () => {
  const [index, csvRoute, jsonRoute] = await Promise.all([
    read('src/lib/research-index.ts'),
    read('src/app/research-index.csv/route.ts'),
    read('src/app/research-index.json/route.ts'),
  ]);

  assert.match(index, /serializeResearchIndexCsv/);
  assert.match(csvRoute, /text\/csv/);
  assert.match(csvRoute, /researchIndexEntries/);
  assert.match(jsonRoute, /application\/json/);
  assert.match(jsonRoute, /researchIndexEntries/);
});

test('RSS is generated from research and news with apex URLs', async () => {
  const [feed, route] = await Promise.all([
    read('src/lib/feed.ts'),
    read('src/app/feed.xml/route.ts'),
  ]);

  assert.match(feed, /blogPosts/);
  assert.match(feed, /newsPosts/);
  assert.match(feed, /canonicalUrl/);
  assert.match(feed, /<rss version="2\.0">/);
  assert.match(route, /application\/rss\+xml/);
});

test('IndexNow requires a recent successful production verification report', async () => {
  const [configure, verify, submit] = await Promise.all([
    read('scripts/configure-indexnow.mjs'),
    read('scripts/verify-production.mjs'),
    read('scripts/submit-indexnow.mjs'),
  ]);

  assert.match(configure, /randomBytes\(16\)/);
  assert.match(configure, /indexnow-key\.txt/);
  assert.match(verify, /protected-urls\.json/);
  assert.match(verify, /www\.roboskin\.ai/);
  assert.match(verify, /production-verification\.json/);
  assert.match(submit, /api\.indexnow\.org\/indexnow/);
  assert.match(submit, /report\.ok/);
  assert.match(submit, /https:\/\/roboskin\.ai/);
  assert.match(submit, /30 \* 60 \* 1000/);
});

test('deployment and measurement are gated and reproducible', async () => {
  const [workflow, monitoring, outreach, gitignore] = await Promise.all([
    read('.github/workflows/deploy.yml'),
    read('docs/seo/search-console-monitoring.md'),
    read('docs/seo/research-index-outreach.md'),
    read('.gitignore'),
  ]);

  assert.match(workflow, /run: npm test/);
  assert.match(workflow, /run: npm run lint/);
  assert.match(workflow, /run: npm run verify:export/);
  assert.equal(workflow.match(/run: npm run build/g)?.length, 1);
  for (const day of ['Day 0', 'Day 7', 'Day 28', 'Day 90']) {
    assert.match(monitoring, new RegExp(day));
  }
  assert.match(monitoring, /5,240/);
  assert.match(monitoring, /48/);
  assert.match(monitoring, /0\.9%/);
  assert.match(outreach, /three legitimate referring domains/i);
  assert.match(outreach, /No paid links, automated posting, or fabricated endorsements/);
  assert.match(gitignore, /\.artifacts\//);
});
