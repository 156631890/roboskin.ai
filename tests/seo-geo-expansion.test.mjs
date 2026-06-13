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
    indexingSubmissionLog,
    keywordQueryMatrix,
    searchConsoleMonitoring,
    research,
    glossary,
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
    read('docs/seo/indexing-submission-log.md'),
    read('docs/seo/keyword-query-matrix.md'),
    read('docs/seo/search-console-monitoring.md'),
    read('src/app/research/page.tsx'),
    read('src/app/glossary/page.tsx'),
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
  assert.match(seoTopic, /author:\s*\{\s*'@id': `\$\{site\.url\}\/#organization`/);
  assert.match(seoTopic, /reviewedBy:\s*\{\s*'@id': `\$\{site\.url\}\/#organization`/);
  assert.match(seoTopic, /mentions: page\.relatedLinks\.map/);
  assert.match(seoTopic, /const visual = pageVisuals\[page\.visualKey\]/);
  assert.match(seoTopic, /'@type': 'ImageObject'/);
  assert.match(seoTopic, /contentUrl: canonicalUrl\(visual\.image\)/);
  assert.match(seoTopic, /caption: visual\.caption/);
  assert.match(seoTopic, /const definedTermNode = page\.schemaType === 'DefinedTerm'/);
  assert.match(seoTopic, /mainEntity:\s*\{\s*'@id': `\$\{url\}#defined-term`/);
  assert.match(seoTopic, /'@id': `\$\{url\}#breadcrumb`/);
  assert.match(seoTopic, /'@graph': \[webPageNode, breadcrumbNode, faqNode, \.\.\.entityNodes\]/);

  assert.match(seoTopics, /path: '\/guides\/robot-skin-vs-tactile-sensor'/);
  assert.match(seoTopics, /robot skin vs tactile sensor/);
  assert.match(seoTopics, /path: '\/guides\/tactile-feedback-for-physical-ai'/);
  assert.match(seoTopics, /tactile feedback for Physical AI/);
  assert.match(seoTopics, /path: '\/guides\/tactile-feedback-for-physical-ai'[\s\S]*Physical AI tactile feedback evaluation metrics/);
  assert.match(seoTopics, /path: '\/robot-skin'[\s\S]*Robot skin sensor taxonomy/);
  assert.match(seoTopics, /path: '\/robot-skin'[\s\S]*href: '\/physics-ai'/);
  assert.match(seoTopics, /path: '\/tactile-ai'[\s\S]*href: '\/guides\/tactile-feedback-for-physical-ai'/);
  assert.match(seoTopics, /path: '\/guides\/physical-ai-touch-data'[\s\S]*Touch data pipeline for embodied AI/);
  assert.match(seoTopics, /latency, synchronization, drift, repeatability, and task outcome/);
  assert.match(seoTopics, /modality, coverage, geometry, durability, and data interface/);
  assert.match(seoTopics, /contact event, timestamp, body frame, calibrated value, and robot action/);
  assert.match(robotSkinVsTactileSensorRoute, /getSeoTopicPage\('\/guides\/robot-skin-vs-tactile-sensor'\)/);
  assert.match(tactileFeedbackPhysicalAiRoute, /getSeoTopicPage\('\/guides\/tactile-feedback-for-physical-ai'\)/);
  assert.match(research, /href: '\/guides\/physical-ai-touch-data'|href="\/guides\/physical-ai-touch-data"/);
  assert.match(glossary, /href: '\/physics-ai'|href="\/physics-ai"/);

  assert.match(sitemap, /pageVisuals/);
  assert.match(sitemap, /images:\s*\[canonicalUrl\(pageVisuals\[page\.visualKey\]\.image\)\]/);

  assert.match(webmasterChecklist, /Google Search Console/);
  assert.match(webmasterChecklist, /Bing Webmaster Tools/);
  assert.match(webmasterChecklist, /Rich Results Test/);
  assert.match(webmasterChecklist, /AI Overviews|AI Mode/);
  assert.match(webmasterChecklist, /https:\/\/roboskin\.ai\/sitemap\.xml/);
  assert.match(webmasterChecklist, /https:\/\/roboskin\.ai\/llms\.txt/);
  assert.match(webmasterChecklist, /homepage includes the visible Physical AI route section/);
  assert.match(webmasterChecklist, /Physical AI route map on RoboSkin\.ai/);

  assert.match(indexingSubmissionLog, /Production deployment verification/);
  assert.match(indexingSubmissionLog, /Google URL Inspection queue/);
  assert.match(indexingSubmissionLog, /Bing Webmaster Tools queue/);
  assert.match(indexingSubmissionLog, /IndexNow readiness/);
  assert.match(indexingSubmissionLog, /https:\/\/roboskin\.ai\/physics-ai/);
  assert.match(indexingSubmissionLog, /https:\/\/roboskin\.ai\/guides\/tactile-feedback-for-physical-ai/);
  assert.match(indexingSubmissionLog, /https:\/\/roboskin\.ai\/guides\/physical-ai-touch-data/);

  assert.match(keywordQueryMatrix, /physical ai robot skin/i);
  assert.match(keywordQueryMatrix, /physical ai tactile feedback/i);
  assert.match(keywordQueryMatrix, /robot skin for physical ai/i);
  assert.match(keywordQueryMatrix, /tactile ai robot skin/i);
  assert.match(keywordQueryMatrix, /robot touch data/i);
  assert.match(keywordQueryMatrix, /humanoid robot skin tactile sensor/i);
  assert.match(keywordQueryMatrix, /https:\/\/roboskin\.ai\/physics-ai/);
  assert.match(keywordQueryMatrix, /https:\/\/roboskin\.ai\/robot-skin/);
  assert.match(keywordQueryMatrix, /https:\/\/roboskin\.ai\/tactile-ai/);
  assert.match(keywordQueryMatrix, /https:\/\/roboskin\.ai\/guides\/physical-ai-touch-data/);

  assert.match(searchConsoleMonitoring, /physical ai robot skin/i);
  assert.match(searchConsoleMonitoring, /physical ai tactile feedback/i);
  assert.match(searchConsoleMonitoring, /robot skin for physical ai/i);
  assert.match(searchConsoleMonitoring, /tactile ai robot skin/i);
  assert.match(searchConsoleMonitoring, /robot touch data/i);
  assert.match(searchConsoleMonitoring, /humanoid robot skin tactile sensor/i);
});
