import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const newsRecord = (source, id) => {
  const marker = `    id: '${id}',`;
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, `Missing news record ${id}`);

  const remainder = source.slice(start + marker.length);
  const nextRecord = /\r?\n  \{\r?\n    id: '/.exec(remainder);
  const end = nextRecord ? start + marker.length + nextRecord.index : source.length;
  return source.slice(start, end);
};

const sourceSection = (source, startMarker, endMarker) => {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(start, -1, `Missing source marker ${startMarker}`);
  assert.notEqual(end, -1, `Missing source marker ${endMarker}`);
  return source.slice(start, end);
};

test('the audited production URL inventory is protected', async () => {
  const protectedUrls = JSON.parse(await read('config/protected-urls.json'));
  const redirects = JSON.parse(await read('config/protected-redirects.json'));

  assert.equal(protectedUrls.length, 72);
  assert.equal(new Set(protectedUrls).size, protectedUrls.length);
  assert.ok(protectedUrls.every((url) => url.startsWith('https://roboskin.ai/')));
  assert.ok(protectedUrls.every((url) => !url.startsWith('https://www.roboskin.ai/')));
  assert.ok(protectedUrls.includes('https://roboskin.ai/news/service-robots-200000-units-logistics-tactile-ai'));
  assert.ok(protectedUrls.includes('https://roboskin.ai/news/electronic-skin-research-robot-skin-systems-problem'));
  for (const path of [
    '/guides/tactile-sensor-benchmark-robot-manipulation',
    '/guides/tactile-datasets-robot-learning',
    '/guides/tactile-foundation-models',
    '/news/underwater-self-healing-electronic-skin-nus-2026',
    '/news/touchworld-tactile-foundation-model-dexterous-manipulation-2026',
    '/news/color-changing-mechanochromic-tactile-sensor-2026',
    '/news/single-pixel-tactile-skin-compressive-sampling-2026',
  ]) {
    assert.ok(protectedUrls.includes(`https://roboskin.ai${path}`));
  }
  assert.deepEqual(redirects, {});
});

test('the two production-only news routes remain in local content and sitemap generation', async () => {
  const [newsData, sitemap] = await Promise.all([
    read('src/lib/news-data.ts'),
    read('src/app/sitemap.ts'),
  ]);

  for (const id of [
    'service-robots-200000-units-logistics-tactile-ai',
    'electronic-skin-research-robot-skin-systems-problem',
  ]) {
    assert.match(newsData, new RegExp(`id: '${id}'`));
  }

  assert.match(sitemap, /newsPosts\.map/);
  assert.match(sitemap, /`\/news\/\$\{post\.id\}`/);
});

test('the service-robot brief matches the audited IFR count and sample boundary', async () => {
  const newsData = await read('src/lib/news-data.ts');
  const serviceNews = newsRecord(newsData, 'service-robots-200000-units-logistics-tactile-ai');

  assert.match(
    serviceNews,
    /title: 'Service robot sales reached almost 200,000 units: logistics makes tactile AI practical'/,
  );
  assert.match(serviceNews, /excerpt:\s+'[^']*reached almost 200,000 units[^']*'/);
  assert.match(
    serviceNews,
    /content: `# Service robot sales reached almost 200,000 units: logistics makes tactile AI practical/,
  );
  assert.match(serviceNews, /professional service robot sales reached almost 200,000 units in 2024/);
  assert.doesNotMatch(serviceNews, /(?:passed|exceeded|more than) 200,000 units/);
  assert.match(serviceNews, /sample data from 294 suppliers/);
  assert.match(serviceNews, /not projected to the whole industry/);
  assert.match(serviceNews, /should not be compared directly across annual reports/);
});

test('the electronic-skin brief separates the joint study from its contextual source', async () => {
  const newsData = await read('src/lib/news-data.ts');
  const electronicSkinNews = newsRecord(
    newsData,
    'electronic-skin-research-robot-skin-systems-problem',
  );

  assert.match(electronicSkinNews, /joint Cambridge-UCL study/);
  assert.doesNotMatch(electronicSkinNews, /separately reported/);
  assert.doesNotMatch(electronicSkinNews, /These studies do not establish/);
  assert.match(
    electronicSkinNews,
    /separate 2026 Cambridge-only graphene\/liquid-metal 3D-force study included as contextual reading/,
  );
  assert.match(
    electronicSkinNews,
    /not evidence for the 2025 joint Cambridge-UCL hydrogel study/,
  );
  assert.match(
    electronicSkinNews,
    /\[Cambridge Engineering: 2026 graphene\/liquid-metal 3D-force study \(contextual reading\)\]\(https:\/\/elec\.eng\.cam\.ac\.uk\/news\/cambridge-research-breakthrough-gives-robots-a-human-like-sense-of-touch\/\)/,
  );
  assert.match(
    electronicSkinNews,
    /title: 'Cambridge Engineering: 2026 graphene\/liquid-metal 3D-force study \(contextual reading\)'/,
  );
});

test('NewsArticle JSON-LD uses the visible byline and a separate site publisher', async () => {
  const seo = await read('src/lib/seo.ts');
  const newsArticle = sourceSection(
    seo,
    'export function buildNewsArticleJsonLd',
    'export function buildGraphJsonLd',
  );

  assert.match(newsArticle, /author: buildEditorialTeamJsonLd\(post\.author\)/);
  assert.doesNotMatch(newsArticle, /author:\s*\{[^}]*name: site\.name/);
  assert.match(
    newsArticle,
    /publisher:\s*\{\s*'@id': `\$\{site\.url\}\/#organization`,\s*\}/,
  );
});

test('the production snapshot rejects non-apex loc entries instead of filtering them out', async () => {
  const urls = Array.from({ length: 64 }, (_, index) => `https://roboskin.ai/test-${index}`);
  urls.push('https://www.roboskin.ai/unexpected');
  const xml = `<urlset>${urls.map((url) => `<url><loc>${url}</loc></url>`).join('')}</urlset>`;
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => ({
    ok: true,
    status: 200,
    text: async () => xml,
  });

  try {
    await assert.rejects(
      import(new URL('../scripts/snapshot-production-urls.mjs?origin-contract-test', import.meta.url)),
      /Unexpected sitemap URL origin: https:\/\/www\.roboskin\.ai\/unexpected/,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('www root and deep paths have explicit permanent redirects', async () => {
  const vercel = JSON.parse(await read('vercel.json'));
  const redirects = vercel.redirects;

  assert.ok(redirects.some((rule) =>
    rule.source === '/' &&
    rule.destination === 'https://roboskin.ai' &&
    rule.permanent === true &&
    rule.has?.some((condition) => condition.type === 'host' && condition.value === 'www.roboskin.ai')
  ));
  assert.ok(redirects.some((rule) =>
    rule.source === '/:path*' &&
    rule.destination === 'https://roboskin.ai/:path*' &&
    rule.permanent === true
  ));
});

test('the export verifier checks protected URLs, canonicals, and generated outputs', async () => {
  const verifier = await read('scripts/verify-export.mjs');
  assert.match(verifier, /protected-urls\.json/);
  assert.match(verifier, /protected-redirects\.json/);
  assert.match(verifier, /canonicalFromHtml/);
  assert.match(verifier, /expectedCanonical/);
  assert.match(verifier, /research-index\.csv/);
  assert.match(verifier, /research-index\.json/);
  assert.match(verifier, /feed\.xml/);
  assert.match(verifier, /deployment\.json/);
  assert.match(verifier, /expectedSitemapUrls/);
  assert.match(verifier, /csvIds/);
  assert.match(verifier, /rssLinks/);
  assert.match(verifier, /JSON\.parse/);
});
