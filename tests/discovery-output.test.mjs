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
  const [feed, route, layout, llms] = await Promise.all([
    read('src/lib/feed.ts'),
    read('src/app/feed.xml/route.ts'),
    read('src/app/layout.tsx'),
    read('public/llms.txt'),
  ]);

  assert.match(feed, /blogPosts/);
  assert.match(feed, /newsPosts/);
  assert.match(feed, /canonicalUrl/);
  assert.match(feed, /new Date\(item\.date\)\.toUTCString\(\)/);
  assert.doesNotMatch(feed, /new Date\(item\.updated\)\.toUTCString\(\)/);
  assert.match(feed, /<rss version="2\.0">/);
  assert.match(route, /application\/rss\+xml/);
  assert.match(layout, /rel="alternate" type="application\/rss\+xml"/);
  assert.match(llms, /https:\/\/roboskin\.ai\/feed\.xml/);
});

test('IndexNow requires a recent successful production verification report', async () => {
  const [configure, verify, submit, deploymentRoute] = await Promise.all([
    read('scripts/configure-indexnow.mjs'),
    read('scripts/verify-production.mjs'),
    read('scripts/submit-indexnow.mjs'),
    read('src/app/deployment.json/route.ts'),
  ]);

  assert.match(configure, /randomBytes\(16\)/);
  assert.match(configure, /indexnow-key\.txt/);
  assert.match(verify, /protected-urls\.json/);
  assert.match(verify, /www\.roboskin\.ai/);
  assert.match(verify, /production-verification\.json/);
  assert.match(verify, /new URL\(response\.url\)\.origin/);
  assert.match(verify, /expectedSitemapUrls/);
  assert.match(verify, /unexpectedSitemapUrls/);
  assert.match(verify, /csvIds/);
  assert.match(verify, /rssLinks/);
  assert.match(verify, /JSON\.parse/);
  assert.match(verify, /commitSha/);
  assert.match(verify, /sitemapSha256/);
  assert.match(submit, /api\.indexnow\.org\/indexnow/);
  assert.match(submit, /report\.ok/);
  assert.match(submit, /report\.commitSha/);
  assert.match(submit, /report\.sitemapSha256/);
  assert.match(submit, /report\.verifiedPaths/);
  assert.match(submit, /https:\/\/roboskin\.ai/);
  assert.match(submit, /30 \* 60 \* 1000/);
  assert.match(deploymentRoute, /VERCEL_GIT_COMMIT_SHA/);
  assert.match(deploymentRoute, /GITHUB_SHA/);
});

test('deployment and measurement are gated and reproducible', async () => {
  const [workflow, vercel, packageJson, monitoring, outreach, gitignore] = await Promise.all([
    read('.github/workflows/deploy.yml'),
    read('vercel.json'),
    read('package.json'),
    read('docs/seo/search-console-monitoring.md'),
    read('docs/seo/research-index-outreach.md'),
    read('.gitignore'),
  ]);

  assert.match(workflow, /run: npm test/);
  assert.match(workflow, /run: npm run lint/);
  assert.match(workflow, /run: npm run verify:export/);
  assert.equal(workflow.match(/run: npm run build/g)?.length, 1);
  assert.doesNotMatch(workflow, /deploy-pages|upload-pages-artifact/);
  assert.match(workflow, /actions\/upload-artifact@v4/);
  assert.match(workflow, /node-version: "22"/);
  assert.match(vercel, /"deploymentEnabled": false/);
  assert.match(packageJson, /"node": "22\.x"/);
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
