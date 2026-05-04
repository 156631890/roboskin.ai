import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const pageVisualAssets = [
  'public/generated/pages/domain-use-visual.webp',
  'public/generated/pages/application-contexts.webp',
  'public/generated/pages/technology-signal-flow.webp',
  'public/generated/pages/resources-library.webp',
  'public/generated/pages/comparison-matrix.webp',
  'public/generated/pages/category-roadmap.webp',
  'public/generated/pages/case-contexts.webp',
  'public/generated/pages/about-contact-inquiry.webp',
  'public/generated/pages/glossary-faq-answers.webp',
];

const pageContracts = [
  ['src/app/products/page.tsx', 'products'],
  ['src/app/solutions/page.tsx', 'applications'],
  ['src/app/applications/page.tsx', 'applications'],
  ['src/app/technology/page.tsx', 'technology'],
  ['src/app/resources/page.tsx', 'resources'],
  ['src/app/downloads/page.tsx', 'resources'],
  ['src/app/comparison/page.tsx', 'comparison'],
  ['src/app/implementation/page.tsx', 'implementation'],
  ['src/app/case-studies/page.tsx', 'caseStudies'],
  ['src/app/about/page.tsx', 'about'],
  ['src/app/contact/page.tsx', 'contact'],
  ['src/app/glossary/page.tsx', 'answers'],
  ['src/app/faq/page.tsx', 'answers'],
];

test('secondary page visual assets exist and are wired into page heroes', async () => {
  const [site, component, ...pages] = await Promise.all([
    read('src/content/site.ts'),
    read('src/components/PageHeroVisual.tsx'),
    ...pageContracts.map(([path]) => read(path)),
  ]);

  await Promise.all(pageVisualAssets.map((assetPath) => access(new URL(assetPath, root))));

  for (const assetPath of pageVisualAssets) {
    const publicPath = assetPath.replace('public', '');
    assert.match(site + component, new RegExp(publicPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(site, /pageVisuals/);
  assert.match(component, /PageHeroVisual/);
  assert.match(component, /next\/image/);

  pageContracts.forEach(([, visualKey], index) => {
    assert.match(pages[index], /PageHeroVisual/);
    assert.match(pages[index], new RegExp(`pageVisuals\\.${visualKey}`));
  });
});
