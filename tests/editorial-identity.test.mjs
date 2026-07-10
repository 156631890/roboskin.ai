import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('visible content uses one institutional editorial team', async () => {
  const [site, blog, news, policy] = await Promise.all([
    read('src/content/site.ts'),
    read('src/lib/blog-data.ts'),
    read('src/lib/news-data.ts'),
    read('src/app/editorial-policy/page.tsx'),
  ]);

  assert.match(site, /name: 'RoboSkin\.ai Editorial Team'/);
  assert.match(site, /path: '\/editorial-policy'/);
  assert.match(site, /logo: '\/apple-touch-icon\.svg'/);
  assert.doesNotMatch(`${blog}\n${news}`, /RoboSkin technical editor/);
  assert.match(policy, /RoboSkin\.ai Editorial Team/);
  assert.match(policy, /Corrections and material revisions/);
  assert.match(policy, /Research review method/);
});

test('article authors and the publisher resolve to factual organization nodes', async () => {
  const seo = await read('src/lib/seo.ts');

  assert.match(seo, /#editorial-team/);
  assert.match(seo, /buildEditorialTeamJsonLd\(post\.author\)/);
  assert.match(seo, /#organization/);
  assert.match(seo, /'@type': 'ImageObject'/);
  assert.match(seo, /site\.editorial\.logo/);
  assert.match(seo, /creator: \{ '@id': `\$\{canonicalUrl\(site\.editorial\.path\)\}#editorial-team` \}/);
  assert.match(seo, /width: 180/);
  assert.match(seo, /height: 180/);
  assert.doesNotMatch(seo, /sameAs:/);
});

test('technical topic pages use the visible institutional editorial identity', async () => {
  const [topicSeo, topicArticle] = await Promise.all([
    read('src/lib/seo-topic.ts'),
    read('src/components/SeoTopicArticle.tsx'),
  ]);

  assert.match(topicSeo, /authors: \[\{ name: site\.editorial\.name/);
  assert.match(topicSeo, /const editorialTeamId = `\$\{canonicalUrl\(site\.editorial\.path\)\}#editorial-team`/);
  assert.match(topicSeo, /author: \{\s*'@id': editorialTeamId/);
  assert.match(topicArticle, /site\.editorial\.name/);
  assert.match(topicArticle, /Published \{page\.updated\} \| Updated \{page\.updated\}/);
});
