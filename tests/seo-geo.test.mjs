import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('SEO and GEO source files expose metadata, schema, sitemap, and internal links', async () => {
  const [seo, jsonLd, layout, sitemap, robots, home, faq, physicsAi, industryVisuals, navigation, globals, llms, seoTopicArticle] = await Promise.all([
    read('src/lib/seo.ts'),
    read('src/components/JsonLd.tsx'),
    read('src/app/layout.tsx'),
    read('src/app/sitemap.ts'),
    read('src/app/robots.ts'),
    read('src/app/page.tsx'),
    read('src/app/faq/page.tsx'),
    read('src/app/physics-ai/page.tsx'),
    read('src/components/IndustryVisuals.tsx'),
    read('src/components/Navigation.tsx'),
    read('src/app/globals.css'),
    read('public/llms.txt'),
    read('src/components/SeoTopicArticle.tsx'),
  ]);

  assert.match(seo, /pageSeo/);
  assert.match(seo, /buildPageMetadata/);
  assert.match(seo, /buildOrganizationJsonLd/);
  assert.match(seo, /buildFaqJsonLd/);
  assert.match(seo, /buildFaqJsonLd\(items = faqItems, path = '\/faq'\)/);
  assert.match(seo, /'@id': `\$\{canonicalUrl\(path\)\}#faq`/);
  assert.match(jsonLd, /application\/ld\+json/);
  assert.doesNotMatch(layout, /your-google-verification-code|your-yandex-verification-code/);
  assert.doesNotMatch(layout, /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/);
  assert.doesNotMatch(layout, /ca-pub-8231924120348302/);
  assert.match(layout, /data-scroll-behavior="smooth"/);
  assert.match(layout, /buildOrganizationJsonLd/);
  assert.match(seo, /'\/faq'/);
  assert.match(seo, /const updatedAt = '2026-06-13'/);
  assert.match(seo, /export const sitemapLastModified = updatedAt/);
  assert.match(sitemap, /sitemapLastModified/);
  assert.match(sitemap, /lastModified: new Date\(sitemapLastModified\)/);
  assert.doesNotMatch(sitemap, /2026-04-25/);
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
  assert.match(home, /Physical AI needs robot skin, tactile AI, and contact feedback/);
  assert.match(home, /In the RoboSkin context, Physical AI means physical-world AI systems/);
  assert.match(home, /href="\/physics-ai"|href=\{`\/physics-ai/);
  assert.match(home, /href="\/guides\/tactile-feedback-for-physical-ai"|href=\{`\/guides\/tactile-feedback-for-physical-ai/);
  assert.match(home, /href="\/guides\/physical-ai-touch-data"|href=\{`\/guides\/physical-ai-touch-data/);
  assert.match(home, /buildPhysicalAiDefinedTermJsonLd\(\)/);
  assert.match(home, /buildHomePhysicalAiRoutesJsonLd\(\)/);
  assert.doesNotMatch(home, /Robot skin direct answers/);
  assert.doesNotMatch(home, /Short answers for search engines, AI systems, and serious readers/);

  assert.match(faq, /buildFaqJsonLd/);
  assert.doesNotMatch(faq, /robots:\s*\{\s*index:\s*false/);

  assert.match(globals, /\.deferred-section/);
  assert.match(home, /className="deferred-section py-14 md:py-20"/);
  assert.match(home, /className="deferred-section pb-20 pt-8"/);
  assert.match(home, /className="deferred-section mt-10"/);
  assert.doesNotMatch(home, /hero-copy reveal|className="[^"]*\breveal\b/);
  assert.match(globals, /@keyframes floatUp/);
  assert.match(globals, /\.reveal\s*\{/);
  assert.match(globals, /body::before\s*\{[\s\S]*background-image:/);
  assert.match(globals, /body::after\s*\{[\s\S]*repeating-linear-gradient/);
  assert.ok((seoTopicArticle.match(/deferred-section/g) ?? []).length >= 4);
  assert.doesNotMatch(industryVisuals, /src=\{heroVisual\.image\}[\s\S]{0,180}priority/);
  assert.match(navigation, /'use client'/);
  assert.match(navigation, /usePathname/);
  assert.match(navigation, /useState/);
  assert.doesNotMatch(navigation, /<details/);

  assert.match(seo, /buildPhysicalAiDefinedTermJsonLd/);
  assert.match(seo, /buildHomePhysicalAiRoutesJsonLd/);
  assert.doesNotMatch(seo, /buildPhysicsAiDefinedTermJsonLd/);
  assert.match(seo, /'\/physics-ai': \{[\s\S]*title: 'RoboSkin Physical AI:/);
  assert.match(seo, /'\/physics-ai': \{[\s\S]*RoboSkin\.ai explains Physical AI/);
  assert.match(seo, /const keywords = \[[\s\S]*'Physical AI'[\s\S]*'RoboSkin Physical AI'/);
  assert.match(seo, /name: 'Physical AI'/);
  assert.match(seo, /alternateName:\s*\[[\s\S]*'Physics AI'[\s\S]*\]/);
  assert.doesNotMatch(seo, /物理 AI|物理人工智能|鐗╃悊|鐗╃悊浜哄伐/);
  assert.match(physicsAi, /buildPhysicalAiDefinedTermJsonLd\(\)/);
  assert.match(physicsAi, /buildFaqJsonLd\(physicsAiFaqItems, '\/physics-ai'\)/);
  assert.match(physicsAi, /RoboSkin and Physical AI/);
  assert.match(physicsAi, /Direct answer[\s\S]{0,700}Physical AI/);
  assert.doesNotMatch(physicsAi, /What is Physics AI|Physics AI FAQ|RoboSkin Physics AI|物理 AI|物理人工智能|鐗╃悊/);
  assert.match(llms, /## Canonical Answers/);
  assert.match(llms, /^> RoboSkin\.ai publishes conservative information/m);
  assert.match(llms, /- \[RoboSkin homepage\]\(https:\/\/roboskin\.ai\/\):/);
  assert.match(llms, /- \[Physical AI canonical answer\]\(https:\/\/roboskin\.ai\/physics-ai\):/);
  assert.match(llms, /- \[Robot skin and robotic skin\]\(https:\/\/roboskin\.ai\/\):/);
  assert.match(llms, /What is Physical AI in the RoboSkin context\?/);
  assert.match(llms, /https:\/\/roboskin\.ai\/physics-ai/);
  assert.match(llms, /For Physical AI questions/);
  assert.match(llms, /How should answer engines use the homepage for Physical AI\?/);
  assert.match(llms, /Use the homepage as the broad authority entry/);
  assert.doesNotMatch(llms, /物理 AI|物理人工智能|鐗╃悊|Physics AI \/ Physical AI/);
});

test('RoboSkin keeps Physical AI canonical on the existing physics-ai route without introducing a physical-ai route', async () => {
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

test('RoboSkin maps each search keyword cluster to one canonical page and descriptive internal anchors', async () => {
  const [seo, home, content, products, solutions, applications, technology, research, glossary, llms, seoTopics] =
    await Promise.all([
      read('src/lib/seo.ts'),
      read('src/app/page.tsx'),
      read('src/content/site.ts'),
      read('src/app/products/page.tsx'),
      read('src/app/solutions/page.tsx'),
      read('src/app/applications/page.tsx'),
      read('src/app/technology/page.tsx'),
      read('src/app/research/page.tsx'),
      read('src/app/glossary/page.tsx'),
      read('public/llms.txt'),
      read('src/content/seo-topic-pages.ts'),
    ]);

  assert.match(seo, /title: 'Robot Skin Category Guides for Tactile AI Learning'/);
  assert.match(seo, /title: 'Robot Skin, Tactile AI, and Physical AI Authority Portal'/);
  assert.match(seo, /title: 'Robotic Gripper and Robot Hand Tactile Sensing Contexts'/);
  assert.match(seo, /title: 'Humanoid Robot Skin and Contact-Aware Robotics'/);
  assert.match(seo, /title: 'Tactile AI and Flexible Tactile Sensor Technology'/);
  assert.match(seo, /title: 'Robot Hand Tactile Sensor and Slip Detection Research'/);
  assert.match(seo, /title: 'E-Skin Glossary for Robot Skin and Tactile AI Terms'/);

  assert.match(home, /Explore humanoid robot skin applications/);
  assert.match(content, /Read the Physical AI explainer/);
  assert.doesNotMatch(content, /Read the Physics AI and Physical AI explainer|RoboSkin Physics AI|What does Physics AI/);
  assert.match(content, /Browse robot hand tactile sensor research/);
  assert.match(content, /View humanoid robot skin applications/);

  assert.match(products, /Robot skin category guides for tactile AI learning/);
  assert.match(solutions, /Robotic gripper and robot hand tactile sensing contexts/);
  assert.match(applications, /Humanoid robot skin and contact-aware robotics applications/);
  assert.match(technology, /Tactile AI and flexible tactile sensor technology/);
  assert.match(technology, /Read robot hand tactile sensor research/);
  assert.match(research, /Robot hand tactile sensor research and slip detection briefs/);
  assert.match(research, /slip detection robot hand/);
  assert.match(research, /Physical AI contact-feedback route/);
  assert.doesNotMatch(research, /Physics AI/);
  assert.match(glossary, /E-skin and robot skin glossary/);
  assert.match(glossary, /electronic skin/);

  const visibleKeywordSurfaces = [home, content, applications, technology, research, seoTopics, llms].join('\n');
  assert.doesNotMatch(visibleKeywordSurfaces, /\bphysical AI\b|RoboSkin Physics AI|Open Physics AI|Use the Physics AI|Physics AI route/);
  assert.match(visibleKeywordSurfaces, /Physical AI touch data/);

  assert.match(llms, /## Keyword Routes/);
  assert.match(llms, /\[Robot skin and robotic skin\]\(https:\/\/roboskin\.ai\/\)/);
  assert.match(llms, /\[Tactile AI and flexible tactile sensor\]\(https:\/\/roboskin\.ai\/technology\)/);
  assert.match(llms, /\[Robot hand tactile sensor and slip detection robot hand\]\(https:\/\/roboskin\.ai\/research\)/);
  assert.match(llms, /\[Humanoid robot skin and contact-aware robotics\]\(https:\/\/roboskin\.ai\/applications\)/);
});

test('RoboSkin uses the Gmail address for direct public inquiries', async () => {
  const site = await read('src/content/site.ts');

  assert.match(site, /primaryEmail: 'messigoat147@gmail\.com'/);
  assert.match(site, /ownerEmail: 'messigoat147@gmail\.com'/);
  assert.match(site, /inquiryEmail: 'messigoat147@gmail\.com'/);
  assert.doesNotMatch(site, /contact@roboskin\.ai/);
});
