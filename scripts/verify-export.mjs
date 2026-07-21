import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const canonicalOrigin = 'https://roboskin.ai';
const root = process.cwd();
const out = path.join(root, 'out');
const protectedUrls = JSON.parse(await readFile(path.join(root, 'config/protected-urls.json'), 'utf8'));
const noindexUrls = JSON.parse(await readFile(path.join(root, 'config/noindex-urls.json'), 'utf8'));
const redirects = JSON.parse(await readFile(path.join(root, 'config/protected-redirects.json'), 'utf8'));

const exists = async (file) => access(file).then(() => true, () => false);
const candidatesFor = (pathname) => {
  if (pathname === '/') return [path.join(out, 'index.html')];
  const relative = pathname.replace(/^\//, '');
  return [path.join(out, `${relative}.html`), path.join(out, relative, 'index.html')];
};
const canonicalFor = (pathname) => pathname === '/'
  ? canonicalOrigin
  : new URL(pathname, canonicalOrigin).href;
const canonicalFromHtml = (html) => html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
  ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1];

function parseJsonLd(html, label, failures) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) failures.push(`${label}: missing JSON-LD`);

  return blocks.flatMap((match, index) => {
    try {
      return [JSON.parse(match[1])];
    } catch (error) {
      failures.push(`${label}: JSON-LD block ${index + 1} is invalid (${error.message})`);
      return [];
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
  return rows.slice(1).map((row) => Object.fromEntries(columns.map((column, index) => [column, parseRow(row)[index]])));
}

const failures = [];
for (const absoluteUrl of protectedUrls) {
  const { pathname } = new URL(absoluteUrl);
  const candidates = candidatesFor(pathname);
  const outputFile = (await Promise.all(candidates.map(async (file) => [file, await exists(file)])))
    .find(([, present]) => present)?.[0];

  if (!outputFile) {
    if (!redirects[pathname]) failures.push(`${pathname}: missing export and redirect`);
    continue;
  }

  const html = await readFile(outputFile, 'utf8');
  const expectedPath = redirects[pathname] ?? pathname;
  const expectedCanonical = canonicalFor(expectedPath);
  const canonical = canonicalFromHtml(html);
  if (canonical !== expectedCanonical) failures.push(`${pathname}: expected canonical ${expectedCanonical}`);
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) failures.push(`${pathname}: expected one H1`);
  if ((html.match(/<title>/gi) ?? []).length !== 1) failures.push(`${pathname}: expected one title`);
  if (!/<meta name="robots" content="index, follow"/i.test(html)) failures.push(`${pathname}: missing indexable robots metadata`);
  const jsonLd = parseJsonLd(html, pathname, failures);
  if (/www\.roboskin\.ai|https:\/\/[^"'<]*\.vercel\.app/i.test(`${canonical ?? ''}${JSON.stringify(jsonLd)}`)) {
    failures.push(`${pathname}: canonical or JSON-LD leaks a non-apex host`);
  }
}

for (const absoluteUrl of noindexUrls) {
  const { pathname } = new URL(absoluteUrl);
  const candidates = candidatesFor(pathname);
  const outputFile = (await Promise.all(candidates.map(async (file) => [file, await exists(file)])))
    .find(([, present]) => present)?.[0];

  if (!outputFile) {
    failures.push(`${pathname}: missing noindex export`);
    continue;
  }

  const html = await readFile(outputFile, 'utf8');
  if (canonicalFromHtml(html) !== canonicalFor(pathname)) failures.push(`${pathname}: invalid noindex canonical`);
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) failures.push(`${pathname}: expected one H1`);
  if ((html.match(/<title>/gi) ?? []).length !== 1) failures.push(`${pathname}: expected one title`);
  if (!/<meta name="robots" content="noindex, follow"/i.test(html)) failures.push(`${pathname}: missing noindex, follow metadata`);
}

for (const file of ['sitemap.xml', 'research-index.csv', 'research-index.json', 'feed.xml', 'deployment.json']) {
  if (!(await exists(path.join(out, file)))) failures.push(`/${file}: missing generated output`);
}

if (failures.length === 0) {
  const deployment = JSON.parse(await readFile(path.join(out, 'deployment.json'), 'utf8'));
  if (typeof deployment.commitSha !== 'string' || deployment.commitSha.length === 0) failures.push('/deployment.json: missing commit identity');
  const sitemapXml = await readFile(path.join(out, 'sitemap.xml'), 'utf8');
  const sitemapLocs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  const sitemapUrls = new Set(sitemapLocs);
  const expectedSitemapUrls = new Set([
    ...protectedUrls.filter((url) => !redirects[new URL(url).pathname]),
    canonicalFor('/research-index'),
  ]);
  const unexpectedSitemapUrls = sitemapLocs.filter((url) => !expectedSitemapUrls.has(url));
  const missingSitemapUrls = [...expectedSitemapUrls].filter((url) => !sitemapUrls.has(url));
  const invalidSitemapUrls = sitemapLocs.filter((url) => new URL(url).origin !== canonicalOrigin);
  if (sitemapLocs.length !== sitemapUrls.size) failures.push('/sitemap.xml: duplicate loc entries');
  if (unexpectedSitemapUrls.length) failures.push(`/sitemap.xml: unexpected URLs ${unexpectedSitemapUrls.join(', ')}`);
  if (missingSitemapUrls.length) failures.push(`/sitemap.xml: missing URLs ${missingSitemapUrls.join(', ')}`);
  if (invalidSitemapUrls.length) failures.push(`/sitemap.xml: non-apex URLs ${invalidSitemapUrls.join(', ')}`);

  const indexData = JSON.parse(await readFile(path.join(out, 'research-index.json'), 'utf8'));
  const csv = await readFile(path.join(out, 'research-index.csv'), 'utf8');
  const csvRows = parseCsv(csv);
  const csvIds = csvRows.map((row) => row.id);
  const jsonIds = indexData.entries?.map((entry) => entry.id) ?? [];
  if (indexData.count !== 17 || jsonIds.length !== 17) failures.push('/research-index.json: expected 17 records');
  if (JSON.stringify(csvIds) !== JSON.stringify(jsonIds)) failures.push('/research-index.csv: IDs differ from JSON');
  for (const [index, entry] of (indexData.entries ?? []).entries()) {
    for (const [column, value] of Object.entries(entry)) {
      const expected = Array.isArray(value) ? value.join('; ') : String(value);
      if (csvRows[index]?.[column] !== expected) failures.push(`/research-index.csv: ${entry.id}.${column} differs from JSON`);
    }
  }

  const indexHtml = await readFile(path.join(out, 'research-index.html'), 'utf8');
  for (const entry of indexData.entries ?? []) {
    const visibleValues = [entry.url, entry.title, entry.sensorPrinciple, entry.formFactor, entry.dataOutput, entry.evidence, entry.limitations, entry.reviewedAt, ...entry.modalities, ...entry.applications];
    if (visibleValues.some((value) => !indexHtml.includes(String(value)))) {
      failures.push(`/research-index: visible fields are incomplete for ${entry.id}`);
    }
  }

  const rss = await readFile(path.join(out, 'feed.xml'), 'utf8');
  const rssItems = [...rss.matchAll(/<item>/g)];
  const rssLinks = [...rss.matchAll(/<link>([^<]+)<\/link>/g)].map((match) => match[1]);
  const rssGuids = [...rss.matchAll(/<guid isPermaLink="true">([^<]+)<\/guid>/g)].map((match) => match[1]);
  const invalidRssUrls = [...rssLinks, ...rssGuids].filter((url) => new URL(url).origin !== canonicalOrigin);
  if (!rss.startsWith('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0">') || !rss.endsWith('</rss>')) failures.push('/feed.xml: invalid RSS envelope');
  if (rssItems.length !== 32 || rssLinks.length !== 33 || rssGuids.length !== 32) failures.push('/feed.xml: expected 32 complete items');
  if (invalidRssUrls.length || /www\.roboskin\.ai|\.vercel\.app/.test(rss)) failures.push('/feed.xml: non-apex URL found');
}

if (failures.length > 0) {
  throw new Error(`Export verification failed:\n${failures.join('\n')}`);
}

console.log(`Verified ${protectedUrls.length} indexable URLs, ${noindexUrls.length} noindex URLs, exact sitemap, 17 data records, and 32 RSS items`);
