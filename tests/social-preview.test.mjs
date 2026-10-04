import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import sharp from 'sharp';
import ts from 'typescript';
import * as datasetEvidence from '../src/lib/dataset-evidence.mjs';

const root = new URL('../', import.meta.url);

function load(relative, dependencies = {}) {
  const file = new URL(relative, root);
  const exports = {};
  const nativeRequire = createRequire(file);
  const require = (name) => Object.hasOwn(dependencies, name) ? dependencies[name] : nativeRequire(name);
  const { outputText } = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  new Function('exports', 'require', outputText)(exports, require);
  return exports;
}

const seo = load('src/lib/seo.ts', {
  '@/lib/dataset-evidence.mjs': datasetEvidence,
  '@/content/site': load('src/content/site.ts'),
  '@/lib/research-index-release': load('src/lib/research-index-release.ts'),
});

test('default sharing metadata uses a crawler-compatible raster image on every shared route', () => {
  for (const route of seo.seoRoutes) {
    const metadata = seo.buildPageMetadata(route.path);
    const [og] = metadata.openGraph.images;
    const [twitter] = metadata.twitter.images;
    assert.equal(og.url, '/og-image.png', route.path);
    assert.equal(og.type, 'image/png', route.path);
    assert.equal(metadata.twitter.card, 'summary_large_image', route.path);
    assert.equal(twitter.url, og.url, route.path);
    assert.ok(og.alt && twitter.alt, route.path);
  }
});

test('the default preview asset is a decodable PNG with the declared dimensions and a small payload', async () => {
  const bytes = readFileSync(new URL('public/og-image.png', root));
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.ok(bytes.length < 1_000_000, 'keep the shared card well below platform upload limits');
  const image = sharp(bytes);
  const metadata = await image.metadata();
  assert.equal(metadata.format, 'png');
  assert.equal(metadata.width, 1200);
  assert.equal(metadata.height, 630);
  await image.raw().toBuffer();
});

test('every News and Research preview has a decodable supported asset, including SVG illustration copies', async () => {
  const research = load('src/lib/blog-data.ts');
  const news = load('src/lib/news-data.ts');
  const dependencies = {
    '@/lib/seo': seo,
    '@/content/site': load('src/content/site.ts'),
    '@/lib/blog-data': research,
    '@/lib/news-data': news,
    '@/lib/topic-graph': {},
    '@/lib/tactile-datasets': {},
    ...Object.fromEntries(['ArticleBody', 'EditorialReview', 'JsonLd', 'ResearchResourceActions'].map(name => [`@/components/${name}`, {}])),
  };
  const images = new Set();
  for (const [kind, posts] of [['research', research.blogPosts], ['news', news.newsPosts]]) {
    const page = load(`src/app/${kind}/[id]/page.tsx`, dependencies);
    for (const post of posts) {
      const metadata = await page.generateMetadata({ params: Promise.resolve({ id: post.id }) });
      assert.equal(metadata.openGraph.type, 'article');
      assert.equal(metadata.openGraph.publishedTime, post.date);
      assert.equal(metadata.openGraph.modifiedTime, post.updated);
      assert.equal(metadata.alternates.canonical, `https://roboskin.ai/${kind}/${post.id}`);
      for (const image of [...metadata.openGraph.images, ...metadata.twitter.images]) images.add(typeof image === 'string' ? image : image.url);
      if (!post.image.endsWith('.svg')) assert.ok(images.has(post.image), post.id);
    }
  }
  for (const image of images) {
    assert.match(image, /\.(?:png|jpe?g|gif|webp)$/i);
    const bytes = readFileSync(new URL(`public${image}`, root));
    assert.ok(bytes.length < 5_000_000, image);
    const decoded = sharp(bytes);
    const metadata = await decoded.metadata();
    assert.ok(['png', 'jpeg', 'gif', 'webp'].includes(metadata.format), image);
    assert.ok(metadata.width >= 300 && metadata.height >= 157, image);
    await decoded.raw().toBuffer();
  }
});
