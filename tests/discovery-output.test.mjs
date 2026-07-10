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
