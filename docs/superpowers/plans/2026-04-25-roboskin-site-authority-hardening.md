# RoboSkin Site Authority Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden RoboSkin.ai for organic search, AI answer engines, buyer trust, and static hosting reliability.

**Architecture:** Keep the Next.js static-export architecture. Centralize reusable content in `src/content/site.ts`, reusable metadata in `src/lib/seo.ts`, static crawl assets in `public/`, and page-specific presentation in App Router pages.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Node test runner.

---

## File Structure

- Modify: `tests/site-health.test.mjs` - source-level regression checks for crawl health and static-hosting safety.
- Modify: `src/content/site.ts` - add glossary, evaluation, data-flow, and fit-criteria content; remove personal email from public data.
- Modify: `src/lib/seo.ts` - add glossary and case-study SEO entries and update social image references.
- Modify: `src/app/sitemap.ts` - include research detail pages and all indexable page routes.
- Modify: `src/app/layout.tsx` - reference existing static assets.
- Modify: `src/components/ContactForm.tsx` - support public endpoint or mailto fallback; add qualification fields.
- Modify: `src/components/Footer.tsx` - emphasize domain contact routes.
- Modify: `src/app/page.tsx` - add evaluation packet and trust-building content.
- Modify: `src/app/products/page.tsx` - show evaluation criteria and verification notes.
- Modify: `src/app/technology/page.tsx` - show data flow and fit criteria.
- Modify: `src/app/contact/page.tsx` - segment contact paths and remove personal email.
- Modify: `src/app/case-studies/page.tsx` - make anonymous case studies indexable with metadata and JSON-LD.
- Create: `src/app/glossary/page.tsx` - glossary page.
- Create: `public/llms.txt` - AI crawler guide.
- Create: `public/favicon.svg`, `public/apple-touch-icon.svg`, `public/og-image.svg`, `public/twitter-image.svg`, `public/generated/*.svg`, `public/site.webmanifest` - non-404 public assets.
- Modify: `next.config.ts` - stop suppressing TypeScript and ESLint build checks.
- Modify: `README.md` - document real public routes and static contact flow.

### Task 1: Site Health Test

**Files:**
- Create: `tests/site-health.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
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
  const [sitemap, seo, layout, contactForm, site, nextConfig, caseStudies, llms] = await Promise.all([
    read('src/app/sitemap.ts'),
    read('src/lib/seo.ts'),
    read('src/app/layout.tsx'),
    read('src/components/ContactForm.tsx'),
    read('src/content/site.ts'),
    read('next.config.ts'),
    read('src/app/case-studies/page.tsx'),
    read('public/llms.txt'),
  ]);

  assert.match(sitemap, /blogPosts/);
  assert.match(sitemap, /\/research\/\$\{post\.id\}/);
  assert.match(seo, /'\/glossary'/);
  assert.match(seo, /'\/case-studies'/);
  assert.match(contactForm, /NEXT_PUBLIC_CONTACT_FORM_ENDPOINT/);
  assert.match(contactForm, /mailto:/);
  assert.doesNotMatch(contactForm, /fetch\('\/api\/contact'/);
  assert.doesNotMatch(site, /gmail\.com/i);
  assert.doesNotMatch(nextConfig, /ignoreBuildErrors:\s*true/);
  assert.doesNotMatch(nextConfig, /ignoreDuringBuilds:\s*true/);
  assert.match(caseStudies, /buildPageMetadata\('\/case-studies'\)/);
  assert.doesNotMatch(caseStudies, /robots:\s*\{\s*index:\s*false/);
  assert.match(llms, /https:\/\/roboskin\.ai\/research\/graphene-liquid-metal-3d-force-2026/);
  assert.match(layout, /\/site\.webmanifest/);
  assert.ok(await exists('public/og-image.svg'));
  assert.ok(await exists('public/twitter-image.svg'));
  assert.ok(await exists('public/favicon.svg'));
  assert.ok(await exists('public/apple-touch-icon.svg'));
  assert.ok(await exists('public/generated/research-neuromorphic-2026.svg'));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests\site-health.test.mjs`

Expected: FAIL because `public/llms.txt`, SVG assets, glossary SEO, article sitemap entries, and static-safe contact behavior are not implemented yet.

### Task 2: Crawl Assets And Metadata

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/sitemap.ts`
- Create: `public/llms.txt`
- Create: public SVG and manifest files

- [ ] **Step 1: Implement metadata and sitemap**

Import `blogPosts` into `src/app/sitemap.ts`, append article routes, add `/glossary` and `/case-studies` to `pageSeo`, and change social metadata to SVG assets.

- [ ] **Step 2: Add public crawl assets**

Add text and SVG assets with repo-native markup. Add `site.webmanifest` pointing at `favicon.svg` and `apple-touch-icon.svg`.

- [ ] **Step 3: Run site health test**

Run: `node --test tests\site-health.test.mjs`

Expected: remaining failures only for pages/contact/content not yet implemented.

### Task 3: Contact And Trust Content

**Files:**
- Modify: `src/content/site.ts`
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/products/page.tsx`
- Modify: `src/app/technology/page.tsx`

- [ ] **Step 1: Update shared data**

Remove public Gmail exposure. Add evaluation, data-flow, glossary, and fit-criteria arrays to `src/content/site.ts`.

- [ ] **Step 2: Update contact form**

Use `process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`. If it is missing, route submissions to a mailto link with encoded body and clear feedback. Add robot platform, target surface, interface requirements, and consent fields.

- [ ] **Step 3: Update pages**

Render new proof-oriented sections on home, products, technology, and contact pages using shared data.

- [ ] **Step 4: Run tests**

Run: `node --test tests\homepage-branding.test.mjs tests\seo-geo.test.mjs tests\research-content.test.mjs tests\site-health.test.mjs`

Expected: all tests pass.

### Task 4: Glossary And Case Studies

**Files:**
- Create: `src/app/glossary/page.tsx`
- Modify: `src/app/case-studies/page.tsx`
- Modify: `README.md`

- [ ] **Step 1: Add glossary page**

Render definitions and internal links from `glossaryTerms`.

- [ ] **Step 2: Make case studies indexable**

Use `buildPageMetadata('/case-studies')`, page JSON-LD, breadcrumb JSON-LD, and conservative anonymous summaries.

- [ ] **Step 3: Update README**

Document current public routes and static contact behavior.

### Task 5: Production Checks

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Enable build enforcement**

Remove TypeScript and ESLint ignore settings.

- [ ] **Step 2: Run verification**

Run:

```bash
node --test tests\homepage-branding.test.mjs tests\seo-geo.test.mjs tests\research-content.test.mjs tests\site-health.test.mjs
npm run lint
npm run build
```

Expected: all pass with no hidden build checks.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: harden site authority and static contact flow"
```
