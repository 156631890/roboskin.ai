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

  assert.match(blogData, /https:\/\/www\.cam\.ac\.uk\/research\/news\/graphene-based-artificial-skin/);
  assert.match(blogData, /https:\/\/www\.nature\.com\/articles\/s42256-025-01053-3/);
  assert.match(blogData, /https:\/\/www\.cam\.ac\.uk\/stories\/robotic-skin/);
  assert.match(blogData, /https:\/\/docs\.ros\.org\/en\/kilted\/Releases\.html/);

  assert.doesNotMatch(blogData, /MIT CSAIL|Stanford Bio-X|NASA-funded|US Patent|EU Patent|Japan Patent|Dow Chemical/);
  assert.doesNotMatch(researchPage, /robots:\s*\{\s*index:\s*false/);
  assert.match(researchPage, /buildPageMetadata\('\/research'\)/);
  assert.match(researchPage, /href=\{`\/research\/\$\{post\.id\}`\}/);

  assert.match(articlePage, /generateStaticParams/);
  assert.match(articlePage, /params:\s*Promise<\{\s*id:\s*string;\s*\}>/);
  assert.match(articlePage, /export async function generateMetadata/);
  assert.match(articlePage, /export default async function ResearchArticlePage/);
  assert.match(articlePage, /buildArticleJsonLd/);
  assert.match(articlePage, /getBlogPostById/);

  assert.match(seo, /'\/research'/);
  assert.match(seo, /buildArticleJsonLd/);
});
