import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const canonicalOrigin = 'https://roboskin.ai';
const base = new URL(process.argv[2] ?? canonicalOrigin);
const reportFile = new URL('../.artifacts/production-verification.json', import.meta.url);
const expectedCommitSha = process.env.EXPECTED_COMMIT_SHA
  ?? execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();

await rm(reportFile, { force: true });

const protectedUrls = JSON.parse(
  await readFile(new URL('../config/protected-urls.json', import.meta.url), 'utf8'),
);
const noindexUrls = JSON.parse(
  await readFile(new URL('../config/noindex-urls.json', import.meta.url), 'utf8'),
);
const protectedRedirects = JSON.parse(
  await readFile(new URL('../config/protected-redirects.json', import.meta.url), 'utf8'),
);
const expectedIndexNowKey = (await readFile(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8')).trim();

function canonicalFor(pathname) {
  return pathname === '/' ? canonicalOrigin : new URL(pathname, canonicalOrigin).href;
}

function canonicalFromHtml(html) {
  return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1];
}

function parseJsonLd(html, pathname) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) throw new Error(`${pathname} is missing JSON-LD`);
  return blocks.map((match, index) => {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      throw new Error(`${pathname} JSON-LD block ${index + 1} is invalid: ${error.message}`);
    }
  });
}

function parseCsv(csv) {
  const rows = csv.trim().split(/\r?\n/);
  const parseRow = (row) => {
    const cells = [];
    let cell = '';
    let quoted = false;

    for (let index = 0; index < row.length; index += 1) {
      const character = row[index];
      if (character === '"' && quoted && row[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') {
        quoted = !quoted;
      } else if (character === ',' && !quoted) {
        cells.push(cell);
        cell = '';
      } else {
        cell += character;
      }
    }
    cells.push(cell);
    return cells;
  };

  const columns = parseRow(rows[0]);
  return rows.slice(1).map((row) => {
    const cells = parseRow(row);
    return Object.fromEntries(columns.map((column, index) => [column, cells[index]]));
  });
}

function validateHtml(html, pathname, expectedPath = pathname, indexable = true) {
  const canonical = canonicalFromHtml(html);
  if (canonical !== canonicalFor(expectedPath)) throw new Error(`${pathname} canonical is ${canonical ?? 'missing'}`);
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) throw new Error(`${pathname} does not contain exactly one H1`);
  if ((html.match(/<title>/gi) ?? []).length !== 1) throw new Error(`${pathname} does not contain exactly one title`);
  const robotsPattern = indexable
    ? /<meta name="robots" content="index, follow"/i
    : /<meta name="robots" content="noindex, follow"/i;
  if (!robotsPattern.test(html)) throw new Error(`${pathname} has invalid robots metadata`);
  const jsonLd = parseJsonLd(html, pathname);
  if (/www\.roboskin\.ai|https:\/\/[^"'<]*\.vercel\.app/i.test(`${canonical}${JSON.stringify(jsonLd)}`)) {
    throw new Error(`${pathname} leaks a non-apex host in canonical or JSON-LD`);
  }
  if (/^\/(research|news)\//.test(pathname)) {
    if (!html.includes('RoboSkin.ai Editorial Team')) throw new Error(`${pathname} is missing the visible editorial author`);
    if (!html.includes('Published ') || !html.includes('Updated ')) throw new Error(`${pathname} is missing visible published or updated dates`);
  }
  return jsonLd;
}

async function fetchOk(pathname) {
  const url = new URL(pathname, base);
  const response = await fetch(url, {
    headers: { 'user-agent': 'RoboSkin deployment verifier/1.0' },
    signal: AbortSignal.timeout(15_000),
  });

  if (new URL(response.url).origin !== base.origin) {
    throw new Error(`${url.href} redirected outside the verified deployment to ${response.url}`);
  }
  if (!response.ok) throw new Error(`${url.href} returned ${response.status}`);
  return response;
}

const sitemapResponse = await fetchOk('/sitemap.xml');
if (!(sitemapResponse.headers.get('content-type') ?? '').includes('xml')) throw new Error('/sitemap.xml has an invalid content type');
const sitemapXml = await sitemapResponse.text();
const sitemapLocs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const sitemapUrls = new Set(sitemapLocs);
const expectedSitemapUrls = new Set([
  ...protectedUrls.filter((url) => !protectedRedirects[new URL(url).pathname]),
  canonicalFor('/research-index'),
]);
const unexpectedSitemapUrls = sitemapLocs.filter((url) => !expectedSitemapUrls.has(url));
const missingSitemapUrls = [...expectedSitemapUrls].filter((url) => !sitemapUrls.has(url));
const invalidSitemapUrls = sitemapLocs.filter((url) => new URL(url).origin !== canonicalOrigin);
if (sitemapLocs.length !== sitemapUrls.size) throw new Error('Production sitemap contains duplicate loc entries');
if (unexpectedSitemapUrls.length) throw new Error(`Production sitemap contains unexpected URLs: ${unexpectedSitemapUrls.join(', ')}`);
if (missingSitemapUrls.length) throw new Error(`Production sitemap is missing URLs: ${missingSitemapUrls.join(', ')}`);
if (invalidSitemapUrls.length) throw new Error(`Production sitemap contains non-apex URLs: ${invalidSitemapUrls.join(', ')}`);

for (const absoluteUrl of protectedUrls) {
  const pathname = new URL(absoluteUrl).pathname;
  const redirectTarget = protectedRedirects[pathname];
  const response = await fetchOk(pathname);
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) throw new Error(`${pathname} did not return HTML`);
  validateHtml(await response.text(), pathname, redirectTarget ?? pathname);
}

const [indexResponse, csvResponse, jsonResponse, rssResponse, deploymentResponse, keyResponse] = await Promise.all([
  fetchOk('/research-index'),
  fetchOk('/research-index.csv'),
  fetchOk('/research-index.json'),
  fetchOk('/feed.xml'),
  fetchOk('/deployment.json'),
  fetchOk('/indexnow-key.txt'),
]);
if (!(indexResponse.headers.get('content-type') ?? '').includes('text/html')) throw new Error('/research-index did not return HTML');
if (!(csvResponse.headers.get('content-type') ?? '').includes('text/csv')) throw new Error('/research-index.csv has an invalid content type');
if (!(jsonResponse.headers.get('content-type') ?? '').includes('application/json')) throw new Error('/research-index.json has an invalid content type');
if (!(rssResponse.headers.get('content-type') ?? '').includes('application/rss+xml')) throw new Error('/feed.xml has an invalid content type');
if (!(deploymentResponse.headers.get('content-type') ?? '').includes('application/json')) throw new Error('/deployment.json has an invalid content type');

const [indexHtml, csv, indexData, rss, deployment, deployedIndexNowKey] = await Promise.all([
  indexResponse.text(),
  csvResponse.text(),
  jsonResponse.json(),
  rssResponse.text(),
  deploymentResponse.json(),
  keyResponse.text(),
]);
if (deployedIndexNowKey.trim() !== expectedIndexNowKey) throw new Error('Deployed IndexNow key does not match the committed key');
const indexJsonLd = validateHtml(indexHtml, '/research-index');
if (!JSON.stringify(indexJsonLd).includes('"@type":"Dataset"') || !JSON.stringify(indexJsonLd).includes('"@type":"ItemList"')) {
  throw new Error('/research-index is missing Dataset or ItemList JSON-LD');
}
if (indexData.count !== 17 || indexData.entries?.length !== 17) throw new Error('Research index JSON does not contain 17 records');

const csvRows = parseCsv(csv);
const csvIds = csvRows.map((row) => row.id);
const jsonIds = indexData.entries.map((entry) => entry.id);
if (JSON.stringify(csvIds) !== JSON.stringify(jsonIds)) throw new Error('Research index CSV and JSON IDs differ');
for (const [index, entry] of indexData.entries.entries()) {
  for (const [column, value] of Object.entries(entry)) {
    const expected = Array.isArray(value) ? value.join('; ') : String(value);
    if (csvRows[index]?.[column] !== expected) throw new Error(`Research index CSV differs at ${entry.id}.${column}`);
  }
  const visibleValues = [entry.url, entry.title, entry.sensorPrinciple, entry.formFactor, entry.dataOutput, entry.evidence, entry.limitations, entry.reviewedAt, ...entry.modalities, ...entry.applications];
  if (visibleValues.some((value) => !indexHtml.includes(String(value)))) throw new Error(`Research index HTML is incomplete for ${entry.id}`);
}

const rssItems = [...rss.matchAll(/<item>/g)];
const rssLinks = [...rss.matchAll(/<link>([^<]+)<\/link>/g)].map((match) => match[1]);
const rssGuids = [...rss.matchAll(/<guid isPermaLink="true">([^<]+)<\/guid>/g)].map((match) => match[1]);
const invalidRssUrls = [...rssLinks, ...rssGuids].filter((url) => new URL(url).origin !== canonicalOrigin);
if (!rss.startsWith('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0">') || !rss.endsWith('</rss>')) throw new Error('RSS has an invalid envelope');
if (rssItems.length !== 32 || rssLinks.length !== 33 || rssGuids.length !== 32) throw new Error('RSS does not contain 32 complete items');
if (invalidRssUrls.length || /www\.roboskin\.ai|\.vercel\.app/.test(rss)) throw new Error('RSS contains a non-apex URL');

if (deployment.commitSha !== expectedCommitSha) {
  throw new Error(`Deployment commit ${deployment.commitSha ?? 'missing'} does not match expected ${expectedCommitSha}`);
}

if (base.origin === canonicalOrigin) {
  for (const pathname of ['/', '/research']) {
    const response = await fetch(new URL(pathname, 'https://www.roboskin.ai'), {
      redirect: 'manual',
      headers: { 'user-agent': 'RoboSkin deployment verifier/1.0' },
      signal: AbortSignal.timeout(15_000),
    });
    if (![301, 308].includes(response.status)) throw new Error(`www${pathname} returned ${response.status} instead of a permanent redirect`);
    const actualLocation = response.headers.get('location');
    if (actualLocation !== new URL(pathname, canonicalOrigin).href) throw new Error(`www${pathname} redirects to ${actualLocation ?? 'missing location'}`);
  }
}

for (const absoluteUrl of noindexUrls) {
  const pathname = new URL(absoluteUrl).pathname;
  const response = await fetchOk(pathname);
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) throw new Error(`${pathname} did not return HTML`);
  validateHtml(await response.text(), pathname, pathname, false);
}

const verifiedPaths = [
  ...new Set([
    ...protectedUrls.map((url) => new URL(url).pathname),
    ...noindexUrls.map((url) => new URL(url).pathname),
    '/research-index',
    '/research-index.csv',
    '/research-index.json',
    '/feed.xml',
  ]),
];
const sitemapSha256 = createHash('sha256').update(sitemapXml).digest('hex');
const report = {
  ok: true,
  baseUrl: base.origin,
  verifiedAt: new Date().toISOString(),
  commitSha: deployment.commitSha,
  sitemapSha256,
  verifiedPaths,
  protectedUrlCount: protectedUrls.length,
  noindexUrlCount: noindexUrls.length,
  researchIndexCount: indexData.entries.length,
};

await mkdir(new URL('../.artifacts/', import.meta.url), { recursive: true });
await writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`Verified ${base.origin} at ${deployment.commitSha}: ${protectedUrls.length} indexable URLs, ${noindexUrls.length} noindex URLs, exact sitemap, 17 data records, and 32 RSS items`);
