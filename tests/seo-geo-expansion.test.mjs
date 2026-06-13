import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('RoboSkin expands authority, topic graph, keyword coverage, image discovery, and webmaster operations', async () => {
  const [
    seo,
    seoTopic,
    seoTopics,
    site,
    sitemap,
    footer,
    editorialPolicy,
    llms,
    webmasterChecklist,
    robotSkinVsTactileSensorRoute,
    tactileFeedbackPhysicalAiRoute,
  ] = await Promise.all([
    read('src/lib/seo.ts'),
    read('src/lib/seo-topic.ts'),
    read('src/content/seo-topic-pages.ts'),
    read('src/content/site.ts'),
    read('src/app/sitemap.ts'),
    read('src/components/Footer.tsx'),
    read('src/app/editorial-policy/page.tsx'),
    read('public/llms.txt'),
    read('docs/seo-webmaster-checklist.md'),
    read('src/app/guides/robot-skin-vs-tactile-sensor/page.tsx'),
    read('src/app/guides/tactile-feedback-for-physical-ai/page.tsx'),
  ]);

  const appEntries = await readdir(new URL('src/app/', root), { withFileTypes: true });
  const appRoutes = appEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

  assert.ok(appRoutes.includes('editorial-policy'));
  assert.match(seo, /'\/editorial-policy': \{/);
  assert.match(seo, /title: 'RoboSkin Editorial Policy and Source Standards'/);
  assert.match(editorialPolicy, /buildPageMetadata\('\/editorial-policy'\)/);
  assert.match(editorialPolicy, /buildPageJsonLd\('\/editorial-policy'\)/);
  assert.match(editorialPolicy, /source boundaries/i);
  assert.match(editorialPolicy, /does not infer product availability/i);
  assert.match(site, /href: '\/editorial-policy', label: 'Editorial policy'/);
  assert.match(footer, /footerNavigation/);
  assert.match(llms, /\[Editorial policy and source standards\]\(https:\/\/roboskin\.ai\/editorial-policy\)/);

  assert.match(seoTopic, /const webPageNode = \{/);
  assert.match(seoTopic, /'@type': 'WebPage'/);
  assert.match(seoTopic, /const articleNode = page\.schemaType === 'TechArticle'/);
  assert.match(seoTopic, /mainEntityOfPage:\s*\{\s*'@id': `\$\{url\}#webpage`/);
  assert.match(seoTopic, /const definedTermNode = page\.schemaType === 'DefinedTerm'/);
  assert.match(seoTopic, /mainEntity:\s*\{\s*'@id': `\$\{url\}#defined-term`/);
  assert.match(seoTopic, /'@id': `\$\{url\}#breadcrumb`/);
  assert.match(seoTopic, /'@graph': \[webPageNode, breadcrumbNode, faqNode, \.\.\.entityNodes\]/);

  assert.match(seoTopics, /path: '\/guides\/robot-skin-vs-tactile-sensor'/);
  assert.match(seoTopics, /robot skin vs tactile sensor/);
  assert.match(seoTopics, /path: '\/guides\/tactile-feedback-for-physical-ai'/);
  assert.match(seoTopics, /tactile feedback for Physical AI/);
  assert.match(robotSkinVsTactileSensorRoute, /getSeoTopicPage\('\/guides\/robot-skin-vs-tactile-sensor'\)/);
  assert.match(tactileFeedbackPhysicalAiRoute, /getSeoTopicPage\('\/guides\/tactile-feedback-for-physical-ai'\)/);

  assert.match(sitemap, /pageVisuals/);
  assert.match(sitemap, /images:\s*\[canonicalUrl\(pageVisuals\[page\.visualKey\]\.image\)\]/);

  assert.match(webmasterChecklist, /Google Search Console/);
  assert.match(webmasterChecklist, /Bing Webmaster Tools/);
  assert.match(webmasterChecklist, /Rich Results Test/);
  assert.match(webmasterChecklist, /AI Overviews|AI Mode/);
  assert.match(webmasterChecklist, /https:\/\/roboskin\.ai\/sitemap\.xml/);
  assert.match(webmasterChecklist, /https:\/\/roboskin\.ai\/llms\.txt/);
});
