import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const exists = async (path) => {
  await access(new URL(path, root));
  return true;
};

test('site authority health checks pass', async () => {
  const [sitemap, seo, layout, contactForm, contactRoute, site, nextConfig, caseStudies, llms, blogData] = await Promise.all([
    read('src/app/sitemap.ts'),
    read('src/lib/seo.ts'),
    read('src/app/layout.tsx'),
    read('src/components/ContactForm.tsx'),
    read('src/app/api/contact/route.ts'),
    read('src/content/site.ts'),
    read('next.config.ts'),
    read('src/app/case-studies/page.tsx'),
    read('public/llms.txt'),
    read('src/lib/blog-data.ts'),
  ]);

  assert.match(sitemap, /blogPosts/);
  assert.match(sitemap, /\/research\/\$\{post\.id\}/);
  assert.match(seo, /'\/glossary'/);
  assert.match(seo, /'\/case-studies'/);
  assert.match(contactForm, /NEXT_PUBLIC_CONTACT_FORM_ENDPOINT/);
  assert.match(contactForm, /mailto:/);
  assert.match(contactForm, /try\s*\{/);
  assert.match(contactForm, /catch\s*\(/);
  assert.match(contactForm, /window\.location\.href\s*=\s*buildMailtoHref\(form\)/);
  assert.doesNotMatch(contactForm, /fetch\('\/api\/contact'/);
  assert.doesNotMatch(nextConfig, /ignoreBuildErrors:\s*true/);
  assert.doesNotMatch(nextConfig, /ignoreDuringBuilds:\s*true/);
  assert.match(caseStudies, /buildPageMetadata\('\/case-studies'\)/);
  assert.doesNotMatch(caseStudies, /robots:\s*\{\s*index:\s*false/);
  assert.match(llms, /https:\/\/roboskin\.ai\/research\/graphene-liquid-metal-3d-force-2026/);
  assert.match(site, /ownerEmail:\s*'contact@roboskin\.ai'/);
  assert.match(site, /domainInquiry/);
  assert.doesNotMatch(contactForm, /Domain acquisition|Strategic acquisition|Request Brief/);
  assert.match(contactForm, /site\.contact\.ownerEmail/);
  assert.doesNotMatch(contactForm, /Robot platform|required[\s\S]*targetSurface/);
  assert.match(contactForm, /normalizeRequestType/);
  assert.match(contactForm, /datasheet[\s\S]*research/);
  assert.match(contactForm, /integration[\s\S]*partnership/);
  assert.match(contactForm, /demo[\s\S]*partnership/);
  assert.doesNotMatch(contactForm, /searchParams\.get\('requestType'\)\s*\?\?\s*'general'/);
  assert.match(contactRoute, /intendedUse/);
  assert.match(contactRoute, /budgetSignal/);
  assert.doesNotMatch(contactRoute, /payload\.useCase\?\.trim\(\)/);
  assert.match(llms, /robot skin information hub|robot skin knowledge hub/i);
  assert.doesNotMatch(llms, /premium domain asset|domain acquisition|for sale/i);
  assert.doesNotMatch(llms, /production availability|datasheets or integration reviews/i);
  assert.doesNotMatch(blogData, /RoboSkin-style systems|MIT CSAIL|Stanford Bio-X|NASA-funded|US Patent|EU Patent|Japan Patent|Dow Chemical/);
  assert.doesNotMatch(blogData, /RoboSkin-style systems/);
  assert.doesNotMatch(blogData, /datasheets and integration reviews/);
  assert.doesNotMatch(blogData, /Product implication/);
  assert.match(blogData, /Updated technical brief - May 2026/);
  assert.match(blogData, /Editorial review|Source boundary|Evaluation checklist|What not to infer/);
  assert.match(layout, /\/site\.webmanifest/);
  assert.ok(await exists('public/og-image.svg'));
  assert.ok(await exists('public/twitter-image.svg'));
  assert.ok(await exists('public/favicon.svg'));
  assert.ok(await exists('public/apple-touch-icon.svg'));
  assert.ok(await exists('public/generated/research-neuromorphic-2026.svg'));
});
