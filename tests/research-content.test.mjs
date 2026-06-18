import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('research content is current, conservative, source-backed, and crawlable', async () => {
  const [blogData, researchPage, articlePage, seo] = await Promise.all([
    read('src/lib/blog-data.ts'),
    read('src/app/research/page.tsx'),
    read('src/app/research/[id]/page.tsx'),
    read('src/lib/seo.ts'),
  ]);

  assert.match(blogData, /graphene and liquid metal/i);
  assert.match(blogData, /single-material soft robotic skin/i);
  assert.match(blogData, /full-hand tactile sensing/i);
  assert.match(blogData, /temperature\/pressure bimodal/i);
  assert.match(blogData, /event-based/i);
  assert.match(blogData, /ROS 2 Kilted/i);
  assert.match(blogData, /transferable force sensing/i);
  assert.match(blogData, /DexSkin/i);
  assert.match(blogData, /fluid-based robot skin/i);

  assert.match(blogData, /https:\/\/www\.cam\.ac\.uk\/research\/news\/graphene-based-artificial-skin/);
  assert.match(blogData, /https:\/\/www\.nature\.com\/articles\/s42256-025-01053-3/);
  assert.match(blogData, /https:\/\/www\.cam\.ac\.uk\/stories\/robotic-skin/);
  assert.match(blogData, /https:\/\/docs\.ros\.org\/en\/kilted\/Releases\.html/);
  assert.match(blogData, /https:\/\/www\.nature\.com\/articles\/s41467-026-68753-1/);
  assert.match(blogData, /https:\/\/arxiv\.org\/html\/2509\.18830v1/);
  assert.match(blogData, /https:\/\/link\.springer\.com\/article\/10\.1186\/s40648-025-00326-1/);
  assert.match(blogData, /Updated technical brief - May 2026/);
  assert.match(blogData, /Evaluation checklist/);
  assert.match(blogData, /\| Contact signal \| What it tells the robot \| Why it matters \|/);
  assert.match(blogData, /What not to infer/);
  assert.match(blogData, /RoboSkin technical editor/);
  assert.match(articlePage, /flushTable/);
  assert.match(articlePage, /Editorial review/);

  assert.doesNotMatch(blogData, /MIT CSAIL|Stanford Bio-X|NASA-funded|US Patent|EU Patent|Japan Patent|Dow Chemical/);
  assert.doesNotMatch(blogData, /Strategic acquisition|domain is available|Request Brief|messigoat/);
  assert.doesNotMatch(researchPage, /robots:\s*\{\s*index:\s*false/);
  assert.match(researchPage, /buildPageMetadata\('\/research'\)/);
  assert.match(researchPage, /href=\{`\/research\/\$\{post\.id\}`\}/);

  assert.match(articlePage, /generateStaticParams/);
  assert.match(articlePage, /params:\s*Promise<\{\s*id:\s*string;\s*\}>/);
  assert.match(articlePage, /export async function generateMetadata/);
  assert.match(articlePage, /authors:\s*\[\{\s*name: post\.author\s*\}\]/);
  assert.match(articlePage, /category: post\.category/);
  assert.match(articlePage, /keywords: post\.technicalFocus/);
  assert.match(articlePage, /publishedTime: post\.date/);
  assert.match(articlePage, /modifiedTime: post\.updated/);
  assert.match(articlePage, /section: post\.category/);
  assert.match(articlePage, /tags: post\.technicalFocus/);
  assert.match(articlePage, /export default async function ResearchArticlePage/);
  assert.match(articlePage, /buildArticleJsonLd/);
  assert.match(articlePage, /buildResearchArticlePageJsonLd/);
  assert.match(articlePage, /buildResearchArticleBreadcrumbJsonLd/);
  assert.match(
    articlePage,
    /buildGraphJsonLd\(\[[\s\S]*buildResearchArticlePageJsonLd\(post\)[\s\S]*buildResearchArticleBreadcrumbJsonLd\(post\)[\s\S]*buildArticleJsonLd\(post\)/,
  );
  assert.match(articlePage, /getBlogPostById/);

  assert.match(seo, /'\/research'/);
  assert.match(seo, /buildArticleJsonLd/);
  assert.match(seo, /export function buildResearchArticlePageJsonLd\(post: BlogPost\)/);
  assert.match(seo, /'@type': 'WebPage'[\s\S]*mainEntity:\s*\{\s*'@id': `\$\{url\}#article`/);
  assert.match(seo, /export function buildResearchArticleBreadcrumbJsonLd\(post: BlogPost\)/);
  assert.match(seo, /'@id': `\$\{url\}#breadcrumb`/);
  assert.match(seo, /name: 'Research'/);
  assert.match(seo, /item: canonicalUrl\('\/research'\)/);
});
