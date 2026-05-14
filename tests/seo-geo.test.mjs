import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('SEO and GEO source files expose metadata, schema, sitemap, and internal links', async () => {
  const [seo, jsonLd, layout, sitemap, robots, home, faq] = await Promise.all([
    read('src/lib/seo.ts'),
    read('src/components/JsonLd.tsx'),
    read('src/app/layout.tsx'),
    read('src/app/sitemap.ts'),
    read('src/app/robots.ts'),
    read('src/app/page.tsx'),
    read('src/app/faq/page.tsx'),
  ]);

  assert.match(seo, /pageSeo/);
  assert.match(seo, /buildPageMetadata/);
  assert.match(seo, /buildOrganizationJsonLd/);
  assert.match(seo, /buildFaqJsonLd/);
  assert.match(seo, /buildFaqJsonLd\(items = faqItems, path = '\/faq'\)/);
  assert.match(seo, /'@id': `\$\{canonicalUrl\(path\)\}#faq`/);
  assert.match(jsonLd, /application\/ld\+json/);
  assert.doesNotMatch(layout, /your-google-verification-code|your-yandex-verification-code/);
  assert.match(layout, /buildOrganizationJsonLd/);
  assert.match(seo, /'\/faq'/);
  assert.match(sitemap, /lastModified: new Date\('2026-04-25'\)/);
  assert.match(sitemap, /seoRoutes/);
  assert.doesNotMatch(robots, /\/_next\//);
  assert.match(home, /Robot skin FAQ/);
  assert.match(home, /href="\/faq"|href=\{`\/faq/);
  assert.match(home, /href="\/downloads"|href=\{`\/downloads/);
  assert.match(home, /Robot skin direct answers/);
  assert.match(home, /href="\/glossary"|href=\{`\/glossary/);
  assert.match(home, /href="\/resources"|href=\{`\/resources/);
  assert.match(home, /href="\/technology"|href=\{`\/technology/);
  assert.match(home, /href="\/research"|href=\{`\/research/);
  assert.match(home, /href="\/contact\?requestType=research/);
  assert.match(home, /buildFaqJsonLd\(homeRobotSkinFaq, '\/'\)/);
  assert.doesNotMatch(home, /Short answers for search engines, AI systems, and serious readers/);
  assert.match(home, /Short answers to common robot skin and tactile AI questions/);
  assert.match(home, /Open the robot skin glossary/);
  assert.match(home, /View RoboSkin resources/);
  assert.match(home, /Explore tactile AI technology/);
  assert.match(home, /Browse robot skin research/);
  assert.match(home, /Suggest a Source/);
  assert.match(home, /What is e-skin\?/);
  assert.match(home, /How is tactile sensing different from vision/);
  assert.match(faq, /buildFaqJsonLd/);
  assert.doesNotMatch(faq, /robots:\s*\{\s*index:\s*false/);
});
