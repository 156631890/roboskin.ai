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
  assert.match(site, /logo: '\/favicon\.svg'/);
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
  assert.doesNotMatch(seo, /sameAs:/);
});
