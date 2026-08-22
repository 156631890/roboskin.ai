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
  assert.match(index, /researchIndexUpdatedAt = '2026-08-22'/);
  assert.match(csvRoute, /text\/csv/);
  assert.match(csvRoute, /researchIndexEntries/);
  assert.match(jsonRoute, /application\/json/);
  assert.match(jsonRoute, /researchIndexEntries/);
  assert.match(jsonRoute, /updated: researchIndexUpdatedAt/);
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
  assert.match(feed, /\.slice\(0, 50\)/);
  assert.match(feed, /canonicalUrl/);
  assert.match(feed, /new Date\(item\.date\)\.toUTCString\(\)/);
  assert.doesNotMatch(feed, /new Date\(item\.updated\)\.toUTCString\(\)/);
  assert.match(feed, /<rss version="2\.0">/);
  assert.match(route, /application\/rss\+xml/);
  assert.match(layout, /rel="alternate" type="application\/rss\+xml"/);
  assert.match(llms, /https:\/\/roboskin\.ai\/feed\.xml/);
});

test('Google News sitemap includes only recent news and apex URLs', async () => {
  const [helper, route, crawlerRobots, vercel, layout, packageJson] = await Promise.all([
    read('src/lib/news-sitemap.ts'),
    read('src/app/news-sitemap.xml/route.ts'),
    read('public/crawler-robots.txt'),
    read('vercel.json'),
    read('src/app/layout.tsx'),
    read('package.json'),
  ]);

  assert.match(helper, /newsPosts/);
  assert.match(helper, /2 \* 24 \* 60 \* 60 \* 1000/);
  assert.match(route, /getRecentNewsPosts/);
  assert.match(route, /xmlns:news="http:\/\/www\.google\.com\/schemas\/sitemap-news\/0\.9"/);
  assert.match(route, /canonicalUrl\(`\/news\/\$\{post\.id\}`\)/);
  assert.match(route, /application\/xml/);
  assert.match(route, /recentPosts\.length === 0 && newsPosts\[0\]/);
  assert.match(route, /fallbackEntry/);
  assert.match(crawlerRobots, /https:\/\/roboskin\.ai\/news-sitemap\.xml/);
  assert.match(vercel, /"source": "\/news-sitemap\.xml"/);
  assert.match(layout, /@vercel\/analytics\/next/);
  assert.match(layout, /<Analytics \/>/);
  assert.match(packageJson, /"@vercel\/analytics"/);
});

test('crawler robots policy overrides the conflicting static RSC path without breaking /robots navigation', async () => {
  const [crawlerRobots, vercel, exportVerifier, productionVerifier] = await Promise.all([
    read('public/crawler-robots.txt'),
    read('vercel.json'),
    read('scripts/verify-export.mjs'),
    read('scripts/verify-production.mjs'),
  ]);
  const vercelConfig = JSON.parse(vercel);
  const route = vercelConfig.routes?.find((candidate) => candidate.src === '/robots\\.txt');

  assert.match(crawlerRobots, /^User-agent: \*/);
  assert.match(crawlerRobots, /^Allow: \/$/m);
  assert.match(crawlerRobots, /Sitemap: https:\/\/roboskin\.ai\/sitemap\.xml/);
  assert.match(crawlerRobots, /Sitemap: https:\/\/roboskin\.ai\/news-sitemap\.xml/);
  assert.doesNotMatch(crawlerRobots, /\$Sreact\.fragment|\/_next\//);
  assert.equal(route?.dest, '/crawler-robots.txt');
  assert.ok(route?.missing?.some((condition) =>
    condition.type === 'header' && condition.key.toLowerCase() === 'rsc'
  ));
  assert.equal(route?.headers?.['Content-Type'], 'text/plain; charset=utf-8');
  assert.match(exportVerifier, /crawler-robots\.txt/);
  assert.match(productionVerifier, /fetchOk\('\/robots\.txt'\)/);
  assert.match(productionVerifier, /crawlerRobots\.includes\('\$Sreact\.fragment'\)/);
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
  assert.match(verify, /noindex-urls\.json/);
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
  assert.match(verify, /knowledge-graph-contract\.json/);
  assert.match(verify, /knowledgeGraphContract\.version/);
  assert.match(verify, /knowledgeGraphContract\.counts/);
  assert.match(verify, /evidenceSourceIds/);
  assert.match(verify, /organization-directory/);
  assert.match(verify, /robot-directory/);
  assert.match(verify, /robotRelationEdges/);
  assert.match(verify, /evaluatedOnEdges/);
  assert.match(verify, /trainedAcrossEdges/);
  assert.match(verify, /demonstratedOnEdges/);
  assert.match(verify, /\/knowledge-graph\.json/);
  assert.match(verify, /\/organizations/);
  assert.match(verify, /\/robots/);
  assert.match(verify, /\/llms\.txt/);
  assert.match(verify, /\/llms-full\.txt/);
  assert.doesNotMatch(verify, /const expectedGraphCounts/);
  assert.match(verify, /actualLocation !== new URL\(pathname, canonicalOrigin\)\.href/);
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

test('deployment identity ignores empty platform commit variables', async () => {
  const previous = {
    vercel: process.env.VERCEL_GIT_COMMIT_SHA,
    github: process.env.GITHUB_SHA,
    explicit: process.env.COMMIT_SHA,
  };

  process.env.VERCEL_GIT_COMMIT_SHA = '';
  process.env.GITHUB_SHA = '';
  process.env.COMMIT_SHA = 'expected-commit';

  try {
    const { GET } = await import('../src/app/deployment.json/route.ts');
    assert.deepEqual(await (await GET()).json(), { commitSha: 'expected-commit' });
  } finally {
    for (const [name, value] of [
      ['VERCEL_GIT_COMMIT_SHA', previous.vercel],
      ['GITHUB_SHA', previous.github],
      ['COMMIT_SHA', previous.explicit],
    ]) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
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
  assert.match(workflow, /actions\/checkout@v7/);
  assert.match(workflow, /actions\/setup-node@v7/);
  assert.match(workflow, /actions\/upload-artifact@v7/);
  assert.match(workflow, /node-version: "22"/);
  assert.match(vercel, /"deploymentEnabled": true/);
  const vercelConfig = JSON.parse(vercel);
  assert.ok(vercelConfig.headers?.some((rule) =>
    rule.source === '/feed.xml' &&
    rule.headers?.some((header) =>
      header.key.toLowerCase() === 'content-type' &&
      header.value === 'application/rss+xml; charset=utf-8'
    )
  ));
  assert.match(packageJson, /"node": "22\.x"/);
  for (const day of ['Day 0', 'Day 7', 'Day 28', 'Day 90']) {
    assert.match(monitoring, new RegExp(day));
  }
  assert.match(monitoring, /5,240/);
  assert.match(monitoring, /48/);
  assert.match(monitoring, /0\.9%/);
  assert.match(monitoring, /7,974/);
  assert.match(monitoring, /2026-08-04/);
  assert.match(outreach, /three legitimate referring domains/i);
  assert.match(outreach, /19-record research index/i);
  assert.match(outreach, /No paid links, automated posting, or fabricated endorsements/);
  assert.match(gitignore, /\.artifacts\//);
});
