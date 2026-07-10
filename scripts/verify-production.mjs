import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const canonicalOrigin = 'https://roboskin.ai';
const base = new URL(process.argv[2] ?? canonicalOrigin);
const reportFile = new URL('../.artifacts/production-verification.json', import.meta.url);

await rm(reportFile, { force: true });

const protectedUrls = JSON.parse(
  await readFile(new URL('../config/protected-urls.json', import.meta.url), 'utf8'),
);
const protectedRedirects = JSON.parse(
  await readFile(new URL('../config/protected-redirects.json', import.meta.url), 'utf8'),
);

function canonicalFor(pathname) {
  return pathname === '/' ? canonicalOrigin : new URL(pathname, canonicalOrigin).href;
}

function canonicalFromHtml(html) {
  return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1];
}

async function fetchOk(pathname) {
  const url = new URL(pathname, base);
  const response = await fetch(url, {
    headers: { 'user-agent': 'RoboSkin deployment verifier/1.0' },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`${url.href} returned ${response.status}`);
  }

  return response;
}

const sitemapResponse = await fetchOk('/sitemap.xml');
const sitemapXml = await sitemapResponse.text();
const sitemapUrls = new Set(
  [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()),
);

for (const absoluteUrl of protectedUrls) {
  const pathname = new URL(absoluteUrl).pathname;
  const redirectTarget = protectedRedirects[pathname];

  if (!redirectTarget && !sitemapUrls.has(absoluteUrl)) {
    throw new Error(`${absoluteUrl} is missing from the production sitemap`);
  }

  const response = await fetchOk(pathname);
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('text/html')) {
    const html = await response.text();
    const expectedPath = redirectTarget ?? pathname;
    const actualCanonical = canonicalFromHtml(html);

    if (actualCanonical !== canonicalFor(expectedPath)) {
      throw new Error(`${pathname} canonical is ${actualCanonical ?? 'missing'}`);
    }
  }
}

const [indexResponse, csvResponse, jsonResponse, rssResponse] = await Promise.all([
  fetchOk('/research-index'),
  fetchOk('/research-index.csv'),
  fetchOk('/research-index.json'),
  fetchOk('/feed.xml'),
]);
const [indexHtml, csv, indexData, rss] = await Promise.all([
  indexResponse.text(),
  csvResponse.text(),
  jsonResponse.json(),
  rssResponse.text(),
]);

if (canonicalFromHtml(indexHtml) !== canonicalFor('/research-index')) {
  throw new Error('/research-index has an incorrect canonical');
}
if (indexData.count !== 7 || indexData.entries?.length !== 7) {
  throw new Error('Research index JSON does not contain seven records');
}
for (const entry of indexData.entries) {
  if (!indexHtml.includes(`/research/${entry.id}`)) {
    throw new Error(`Research index HTML is missing ${entry.id}`);
  }
}
if (csv.trim().split(/\r?\n/).length !== indexData.entries.length + 1) {
  throw new Error('Research index CSV and JSON record counts differ');
}
if (!rss.includes('<rss version="2.0">') || rss.includes('www.roboskin.ai')) {
  throw new Error('RSS is invalid or contains a www URL');
}

if (base.origin === canonicalOrigin) {
  for (const pathname of ['/', '/research']) {
    const response = await fetch(new URL(pathname, 'https://www.roboskin.ai'), {
      redirect: 'manual',
      headers: { 'user-agent': 'RoboSkin deployment verifier/1.0' },
      signal: AbortSignal.timeout(15_000),
    });

    if (![301, 308].includes(response.status)) {
      throw new Error(`www${pathname} returned ${response.status} instead of a permanent redirect`);
    }

    const expectedLocation = canonicalFor(pathname);
    const actualLocation = response.headers.get('location');

    if (actualLocation !== expectedLocation) {
      throw new Error(`www${pathname} redirects to ${actualLocation ?? 'missing location'}`);
    }
  }
}

const report = {
  ok: true,
  baseUrl: base.origin,
  verifiedAt: new Date().toISOString(),
  protectedUrlCount: protectedUrls.length,
  researchIndexCount: indexData.entries.length,
};

await mkdir(new URL('../.artifacts/', import.meta.url), { recursive: true });
await writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`Verified ${base.origin}: ${protectedUrls.length} protected URLs and ${indexData.entries.length} index records`);
