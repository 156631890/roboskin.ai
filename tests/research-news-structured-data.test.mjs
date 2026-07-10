import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(path) {
  try {
    return await readFile(new URL(path, root), 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return '';
    }

    throw error;
  }
}

test('news detail pages are crawlable source-backed article pages with structured data', async () => {
  const [newsData, newsIndexPage, newsArticlePage, sitemap, seo, articleBody] = await Promise.all([
    read('src/lib/news-data.ts'),
    read('src/app/news/page.tsx'),
    read('src/app/news/[id]/page.tsx'),
    read('src/app/sitemap.ts'),
    read('src/lib/seo.ts'),
    read('src/components/ArticleBody.tsx'),
  ]);

  assert.match(newsData, /export interface NewsPost/);
  assert.match(newsData, /export const newsPosts: NewsPost\[\]/);
  assert.match(newsData, /full-hand-tactile-sensing-robot-hands-vision-control/);
  assert.match(newsData, /global-robot-installations-542000-physical-ai-touch/);
  assert.match(newsData, /sourceTitle/);
  assert.match(newsData, /sourceUrl/);
  assert.match(newsData, /technicalFocus/);
  assert.match(newsData, /F-TAC Hand/);
  assert.match(newsData, /International Federation of Robotics/);

  assert.match(newsIndexPage, /getNewsSummaries/);
  assert.match(newsIndexPage, /href=\{`\/news\/\$\{item\.id\}`\}/);
  assert.match(newsIndexPage, /Read news brief/);

  assert.match(articleBody, /export default function ArticleBody/);
  assert.match(articleBody, /flushTable/);

  assert.match(newsArticlePage, /generateStaticParams/);
  assert.match(newsArticlePage, /export async function generateMetadata/);
  assert.match(newsArticlePage, /getNewsPostById/);
  assert.match(newsArticlePage, /buildNewsArticlePageJsonLd/);
  assert.match(newsArticlePage, /buildNewsArticleBreadcrumbJsonLd/);
  assert.match(newsArticlePage, /buildNewsArticleJsonLd/);
  assert.match(
    newsArticlePage,
    /buildGraphJsonLd\(\[[\s\S]*buildNewsArticlePageJsonLd\(post\)[\s\S]*buildNewsArticleBreadcrumbJsonLd\(post\)[\s\S]*buildNewsArticleJsonLd\(post\)/,
  );

  assert.match(seo, /import type \{ NewsPost \} from '@\/lib\/news-data'/);
  assert.match(seo, /export function buildNewsArticlePageJsonLd\(post: NewsPost\)/);
  assert.match(seo, /export function buildNewsArticleBreadcrumbJsonLd\(post: NewsPost\)/);
  assert.match(seo, /export function buildNewsArticleJsonLd\(post: NewsPost\)/);
  assert.match(seo, /'@type': 'NewsArticle'/);
  assert.match(seo, /isAccessibleForFree: true/);
  assert.match(seo, /articleSection: post\.category/);
  assert.match(seo, /keywords: post\.technicalFocus/);

  assert.match(sitemap, /newsPosts/);
  assert.match(sitemap, /\/news\/\$\{post\.id\}/);
});

test('research article schema uses technical article signals for robot skin authority', async () => {
  const seo = await read('src/lib/seo.ts');

  assert.match(seo, /export function buildArticleJsonLd\(post: BlogPost\)/);
  assert.match(seo, /'@type': 'TechArticle'/);
  assert.match(seo, /isAccessibleForFree: true/);
  assert.match(seo, /articleSection: post\.category/);
  assert.match(seo, /keywords: post\.technicalFocus/);
  assert.match(seo, /citation: post\.sourceUrl/);
  assert.match(seo, /mainEntityOfPage/);
});

test('GSC-visible research pages use search-intent titles and snippets', async () => {
  const blogData = await read('src/lib/blog-data.ts');

  const expectedSignals = [
    [
      "title: 'Dream-Tac: A Unified Tactile World Action Model for Contact-Rich Robot Manipulation'",
      "Dream-Tac models action-conditioned tactile futures for contact-rich robot manipulation, showing why robot skin data needs prediction, not only reaction.",
    ],
    [
      "title: 'Single-material soft robotic skin for multimodal e-skin sensing'",
      "Single-material soft robotic skin connects e-skin, pressure, strain, temperature, damage sensing, and robot-ready tactile coverage across curved surfaces.",
    ],
    [
      "title: 'ROS 2 tactile sensor pipeline for robot skin data replay'",
      "A robotics software guide to ROS 2 tactile data messages, rosbag workflows, force-torque context, and replayable robot skin evaluation.",
    ],
    [
      "title: 'GenForce transferable force sensing for robot skin and tactile sensors'",
      "GenForce explores transferable force sensing across tactile sensors, reducing repeated calibration work for robot skin replacements and hardware changes.",
    ],
    [
      "title: 'Sparsh-X multisensory touch representations for tactile AI'",
      "Sparsh-X learns multisensory touch representations across tactile sensors, helping tactile AI reuse robot skin data beyond one hardware format and task.",
    ],
    [
      "title: 'FreeTacMan robot-free visuo-tactile data collection for tactile AI'",
      "A research note on FreeTacMan, robot-free visuo-tactile datasets, tactile AI data collection, and why robot skin models need contact diversity.",
    ],
    [
      "title: 'MiTaS multi-resolution tactile imitation learning for robot hands'",
      "A technical note on MiTaS, heterogeneous tactile sensors, GelSight and event-based touch fusion, and why tactile frequency matters for robot hand learning.",
    ],
  ];

  for (const [title, excerpt] of expectedSignals) {
    assert.match(blogData, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(blogData, new RegExp(excerpt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('answer-engine and monitoring files expose updated GSC-visible research and news routes', async () => {
  const [llms, monitoring] = await Promise.all([
    read('public/llms.txt'),
    read('docs/seo/search-console-monitoring.md'),
  ]);

  const expectedRoutes = [
    'https://roboskin.ai/news/full-hand-tactile-sensing-robot-hands-vision-control',
    'https://roboskin.ai/news/global-robot-installations-542000-physical-ai-touch',
    'https://roboskin.ai/research/dream-tac-tactile-world-action-model-2026',
    'https://roboskin.ai/research/single-material-soft-robotic-skin-2025',
    'https://roboskin.ai/research/ros2-kilted-tactile-pipeline-2026',
    'https://roboskin.ai/research/genforce-transferable-force-sensing-2026',
    'https://roboskin.ai/research/sparsh-x-multisensory-touch-representations-2025',
    'https://roboskin.ai/research/freetacman-robot-free-visuotactile-data-collection-2025',
    'https://roboskin.ai/research/mitas-multi-resolution-tactile-imitation-learning-2026',
  ];

  for (const route of expectedRoutes) {
    assert.match(llms, new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(monitoring, new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(llms, /Dream-Tac: A Unified Tactile World Action Model for Contact-Rich Robot Manipulation/);
  assert.match(llms, /Full-hand tactile sensing moves robot hands beyond vision-only control/);
  assert.match(monitoring, /GSC high-impression low-click pages/);
});

test('homepage authority routes promote news and GSC-visible article pages', async () => {
  const [siteContent, homePage] = await Promise.all([
    read('src/content/site.ts'),
    read('src/app/page.tsx'),
  ]);

  const priorityInternalRoutes = [
    '/news/full-hand-tactile-sensing-robot-hands-vision-control',
    '/news/global-robot-installations-542000-physical-ai-touch',
    '/research/dream-tac-tactile-world-action-model-2026',
    '/research/single-material-soft-robotic-skin-2025',
    '/research/ros2-kilted-tactile-pipeline-2026',
    '/research/genforce-transferable-force-sensing-2026',
  ];

  assert.match(siteContent, /\{ href: '\/news', label: 'News' \}/);

  for (const route of priorityInternalRoutes) {
    assert.match(siteContent, new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(siteContent, /GSC-visible tactile AI briefs/);
  assert.match(homePage, /<AuthorityIndex groups=\{authorityLinkGroups\} \/>/);
});

test('GSC priority articles include answer-first sections and crawlable internal links', async () => {
  const [blogData, newsData, articleBody] = await Promise.all([
    read('src/lib/blog-data.ts'),
    read('src/lib/news-data.ts'),
    read('src/components/ArticleBody.tsx'),
  ]);

  const priorityResearchSignals = [
    'What this means for robot skin',
    'What this does not prove yet',
    'Where this fits next',
    'Search intent FAQ',
    '[ROS 2 tactile sensor pipeline](/research/ros2-kilted-tactile-pipeline-2026)',
    '[Dream-Tac world-action model](/research/dream-tac-tactile-world-action-model-2026)',
    '[GenForce transferable force sensing](/research/genforce-transferable-force-sensing-2026)',
    '[robot skin vs e-skin guide](/guides/robot-skin-vs-e-skin)',
  ];

  const priorityNewsSignals = [
    'What this means for robot hands',
    'What this does not prove yet',
    'Where this fits next',
    'Search intent FAQ',
    '[Dream-Tac tactile world model](/research/dream-tac-tactile-world-action-model-2026)',
    '[ROS 2 tactile data pipeline](/research/ros2-kilted-tactile-pipeline-2026)',
    '[robot hand tactile sensor route](/applications/robot-hand-tactile-sensor)',
  ];

  for (const signal of priorityResearchSignals) {
    assert.match(blogData, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  for (const signal of priorityNewsSignals) {
    assert.match(newsData, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(articleBody, /href\.startsWith\('\/'\)/);
  assert.match(articleBody, /target=\{isExternal \? '_blank' : undefined\}/);
  assert.match(articleBody, /rel=\{isExternal \? 'noreferrer' : undefined\}/);
});

test('each audited priority article has explicit evidence boundaries and bounded internal links', async () => {
  const blogData = await read('src/lib/blog-data.ts');
  const priorityIds = [
    'dream-tac-tactile-world-action-model-2026',
    'single-material-soft-robotic-skin-2025',
    'freetacman-robot-free-visuotactile-data-collection-2025',
    'sparsh-x-multisensory-touch-representations-2025',
    'genforce-transferable-force-sensing-2026',
  ];
  const requiredHeadings = [
    'Source findings',
    'RoboSkin analysis',
    'Engineering implications',
    'What this does not prove yet',
  ];

  for (const id of priorityIds) {
    const start = blogData.indexOf(`id: '${id}'`);
    assert.notEqual(start, -1, `missing priority article ${id}`);
    const next = blogData.indexOf("    id: '", start + id.length + 10);
    const record = blogData.slice(start, next === -1 ? blogData.length : next);

    for (const heading of requiredHeadings) {
      const count = [...record.matchAll(new RegExp(`^## ${heading}$`, 'gm'))].length;
      assert.equal(count, 1, `${id} must contain one ${heading} heading`);
    }

    const internalLinks = record.match(/\]\(\/[a-z0-9/?=&.-]+\)/g) ?? [];
    assert.ok(internalLinks.length >= 2 && internalLinks.length <= 4, `${id} must contain 2-4 internal links`);

    const directAnswer = record.match(/\*\*Updated technical brief[^\n]*\*\*\r?\n\r?\n([^#][\s\S]*?)\r?\n\r?\n## Source findings/)?.[1];
    assert.ok(directAnswer, `${id} must open with an answer-first paragraph`);
    const wordCount = directAnswer.trim().split(/\s+/).length;
    assert.ok(wordCount >= 40 && wordCount <= 80, `${id} answer-first paragraph must contain 40-80 words`);
  }
});
