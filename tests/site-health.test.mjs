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
  const [sitemap, seo, layout, contactForm, site, nextConfig, caseStudies, llms, domainSale] = await Promise.all([
    read('src/app/sitemap.ts'),
    read('src/lib/seo.ts'),
    read('src/app/layout.tsx'),
    read('src/components/ContactForm.tsx'),
    read('src/content/site.ts'),
    read('next.config.ts'),
    read('src/app/case-studies/page.tsx'),
    read('public/llms.txt'),
    read('public/domain-sale.html'),
  ]);

  assert.match(sitemap, /blogPosts/);
  assert.match(sitemap, /\/research\/\$\{post\.id\}/);
  assert.match(seo, /'\/glossary'/);
  assert.match(seo, /'\/case-studies'/);
  assert.match(contactForm, /NEXT_PUBLIC_CONTACT_FORM_ENDPOINT/);
  assert.match(contactForm, /mailto:/);
  assert.doesNotMatch(contactForm, /fetch\('\/api\/contact'/);
  assert.doesNotMatch(nextConfig, /ignoreBuildErrors:\s*true/);
  assert.doesNotMatch(nextConfig, /ignoreDuringBuilds:\s*true/);
  assert.match(caseStudies, /buildPageMetadata\('\/case-studies'\)/);
  assert.doesNotMatch(caseStudies, /robots:\s*\{\s*index:\s*false/);
  assert.match(llms, /https:\/\/roboskin\.ai\/research\/graphene-liquid-metal-3d-force-2026/);
  assert.match(domainSale, /mailto:messigoat147@gmail\.com/);
  assert.doesNotMatch(domainSale, /messigoat47@gmail\.com/);
  assert.match(site, /ownerEmail:\s*'messigoat147@gmail\.com'/);
  assert.match(site, /domainInquiry/);
  assert.match(contactForm, /Domain acquisition/);
  assert.match(contactForm, /messigoat147@gmail\.com|site\.contact\.ownerEmail/);
  assert.doesNotMatch(contactForm, /Robot platform|required[\s\S]*targetSurface/);
  assert.match(llms, /robot skin information hub|robot skin knowledge hub/i);
  assert.match(llms, /premium domain asset/i);
  assert.doesNotMatch(llms, /production availability|datasheets or integration reviews/i);
  assert.match(layout, /\/site\.webmanifest/);
  assert.ok(await exists('public/og-image.svg'));
  assert.ok(await exists('public/twitter-image.svg'));
  assert.ok(await exists('public/favicon.svg'));
  assert.ok(await exists('public/apple-touch-icon.svg'));
  assert.ok(await exists('public/generated/research-neuromorphic-2026.svg'));
});
