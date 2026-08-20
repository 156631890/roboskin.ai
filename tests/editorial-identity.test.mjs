import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('visible content uses one institutional editorial team with a named editorial lead', async () => {
  const [site, blog, news, policy, about] = await Promise.all([
    read('src/content/site.ts'),
    read('src/lib/blog-data.ts'),
    read('src/lib/news-data.ts'),
    read('src/app/editorial-policy/page.tsx'),
    read('src/app/about/page.tsx'),
  ]);

  assert.match(site, /name: 'RoboSkin\.ai Editorial Team'/);
  assert.match(site, /path: '\/editorial-policy'/);
  assert.match(site, /logo: '\/apple-touch-icon\.svg'/);
  assert.match(site, /name: 'Steven Yang'/);
  assert.match(site, /role: 'Founder & Editor'/);
  assert.doesNotMatch(`${blog}\n${news}`, /RoboSkin technical editor/);
  assert.match(policy, /RoboSkin\.ai Editorial Team/);
  assert.match(policy, /site\.editorial\.lead\.name/);
  assert.match(about, /Editorial leadership/);
  assert.match(about, /site\.editorial\.lead\.name/);
  assert.match(policy, /Corrections and material revisions/);
  assert.match(policy, /Research review method/);
});

test('article authors and the publisher resolve to factual organization nodes', async () => {
  const seo = await read('src/lib/seo.ts');
  const organizationStart = seo.indexOf('export function buildOrganizationJsonLd');
  const organizationEnd = seo.indexOf('\nexport function ', organizationStart + 1);
  const editorialStart = seo.indexOf('export function buildEditorialTeamJsonLd');
  const editorialEnd = seo.indexOf('\nexport function ', editorialStart + 1);
  const editorialIdentitySeo = `${seo.slice(organizationStart, organizationEnd)}\n${seo.slice(editorialStart, editorialEnd)}`;

  assert.match(seo, /#editorial-team/);
  assert.match(seo, /buildEditorialTeamJsonLd\(post\.author\)/);
  assert.match(seo, /#organization/);
  assert.match(seo, /'@type': 'ImageObject'/);
  assert.match(seo, /site\.editorial\.logo/);
  assert.match(seo, /creator: \{ '@id': `\$\{canonicalUrl\(site\.editorial\.path\)\}#editorial-team` \}/);
  assert.match(seo, /width: 180/);
  assert.match(seo, /height: 180/);
  assert.match(seo, /export function buildEditorialLeadJsonLd/);
  assert.match(seo, /'@type': 'Person'/);
  assert.match(seo, /#steven-yang/);
  assert.doesNotMatch(editorialIdentitySeo, /sameAs:/);
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
  assert.match(topicArticle, /page\.published/);
  assert.match(topicArticle, /Updated \{page\.updated\}/);
});
