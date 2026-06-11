import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('SEO and GEO source files expose metadata, schema, sitemap, and internal links', async () => {
  const [seo, jsonLd, layout, sitemap, robots, home, faq, physicsAi, industryVisuals, globals, llms] = await Promise.all([
    read('src/lib/seo.ts'),
    read('src/components/JsonLd.tsx'),
    read('src/app/layout.tsx'),
    read('src/app/sitemap.ts'),
    read('src/app/robots.ts'),
    read('src/app/page.tsx'),
    read('src/app/faq/page.tsx'),
    read('src/app/physics-ai/page.tsx'),
    read('src/components/IndustryVisuals.tsx'),
    read('src/app/globals.css'),
    read('public/llms.txt'),
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

  assert.match(home, /Find the right robot skin route/);
  assert.match(home, /Short answers to common robot skin and tactile AI questions/);
  assert.match(home, /Direct-answer coverage supports readers and answer engines/);
  assert.match(home, /href="\/faq"|href=\{`\/faq/);
  assert.match(home, /href="\/downloads"|href=\{`\/downloads/);
  assert.match(home, /href="\/glossary"|href=\{`\/glossary/);
  assert.match(home, /href="\/resources"|href=\{`\/resources/);
  assert.match(home, /href="\/technology"|href=\{`\/technology/);
  assert.match(home, /href="\/research"|href=\{`\/research/);
  assert.match(home, /href="\/contact\?requestType=research/);
  assert.match(home, /buildFaqJsonLd\(homeRobotSkinFaq, '\/'\)/);
  assert.match(home, /Open the robot skin glossary/);
  assert.match(home, /View RoboSkin resources/);
  assert.match(home, /Explore tactile AI technology/);
  assert.match(home, /Browse robot skin research/);
  assert.match(home, /Submit a source/);
  assert.doesNotMatch(home, /Robot skin direct answers/);
  assert.doesNotMatch(home, /Short answers for search engines, AI systems, and serious readers/);

  assert.match(faq, /buildFaqJsonLd/);
  assert.doesNotMatch(faq, /robots:\s*\{\s*index:\s*false/);

  assert.match(globals, /\.deferred-section/);
  assert.match(home, /className="deferred-section py-14 md:py-20"/);
  assert.match(home, /className="deferred-section pb-20 pt-8"/);
  assert.doesNotMatch(industryVisuals, /src=\{heroVisual\.image\}[\s\S]{0,180}priority/);

  assert.match(seo, /buildPhysicsAiDefinedTermJsonLd/);
  assert.match(physicsAi, /buildPhysicsAiDefinedTermJsonLd\(\)/);
  assert.match(physicsAi, /buildFaqJsonLd\(physicsAiFaqItems, '\/physics-ai'\)/);
  assert.match(llms, /## Canonical Answers/);
  assert.match(llms, /What is Physics AI in the RoboSkin context\?/);
  assert.match(llms, /https:\/\/roboskin\.ai\/physics-ai/);
  assert.match(llms, /The related industry phrase is often Physical AI/);
});

test('RoboSkin keeps Physics AI canonical without introducing a physical-ai route', async () => {
  const appEntries = await readdir(new URL('src/app/', root), { withFileTypes: true });
  const appRoutes = appEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const [seo, site, llms] = await Promise.all([
    read('src/lib/seo.ts'),
    read('src/content/site.ts'),
    read('public/llms.txt'),
  ]);

  assert.ok(appRoutes.includes('physics-ai'));
  assert.ok(!appRoutes.includes('physical-ai'));
  assert.doesNotMatch(`${seo}\n${site}\n${llms}`, /href=["']\/physical-ai|src\/app\/physical-ai/);
});
