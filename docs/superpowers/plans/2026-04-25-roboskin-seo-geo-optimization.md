# RoboSkin SEO and GEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve RoboSkin.ai organic discoverability with robust metadata, crawlable internal links, conservative structured data, sitemap/robots cleanup, and GEO-friendly factual content.

**Architecture:** Centralize SEO data and schema builders in `src/lib/seo.ts`, render JSON-LD through `src/components/JsonLd.tsx`, and update pages to consume shared metadata helpers. Validate behavior with Node source-inspection tests plus lint and static export build.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Node test runner, static export.

---

### Task 1: SEO Regression Test

**Files:**
- Create: `tests/seo-geo.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('SEO and GEO source files expose metadata, schema, sitemap, and internal links', async () => {
  const [seo, jsonLd, layout, sitemap, robots, home, faq] = await Promise.all([
    read('src/lib/seo.ts'),
    read('src/components/JsonLd.tsx'),
    read('src/app/layout.tsx'),
    read('src/app/sitemap.ts'),
    read('src/app/robots.ts'),
    read('src/app/page.tsx'),
    read('src/app/faq/page.tsx'),
  ]);

  assert.match(seo, /pageSeo/);
  assert.match(seo, /buildPageMetadata/);
  assert.match(seo, /buildOrganizationJsonLd/);
  assert.match(seo, /buildFaqJsonLd/);
  assert.match(jsonLd, /application\/ld\+json/);
  assert.doesNotMatch(layout, /your-google-verification-code|your-yandex-verification-code/);
  assert.match(layout, /buildOrganizationJsonLd/);
  assert.match(sitemap, /lastModified: new Date\('2026-04-25'\)/);
  assert.match(sitemap, /'\/faq'/);
  assert.doesNotMatch(robots, /\/_next\//);
  assert.match(home, /Robot skin FAQ/);
  assert.match(home, /href="\/faq"|href=\{`\/faq/);
  assert.match(home, /href="\/downloads"|href=\{`\/downloads/);
  assert.match(faq, /buildFaqJsonLd/);
  assert.doesNotMatch(faq, /robots:\s*\{\s*index:\s*false/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/seo-geo.test.mjs`

Expected: FAIL because `src/lib/seo.ts` and `src/components/JsonLd.tsx` do not exist yet.

### Task 2: Shared SEO Data and JSON-LD Renderer

**Files:**
- Create: `src/lib/seo.ts`
- Create: `src/components/JsonLd.tsx`

- [ ] **Step 1: Implement shared SEO helpers**

Create route-level metadata definitions, `buildPageMetadata`, and JSON-LD builders for organization, website, page, breadcrumbs, product list, and FAQ.

- [ ] **Step 2: Implement JSON-LD component**

Create a component that renders `<script type="application/ld+json">` with escaped JSON.

- [ ] **Step 3: Run focused test**

Run: `node --test tests/seo-geo.test.mjs`

Expected: still FAIL until pages are wired.

### Task 3: Wire Global Metadata, Sitemap, and Robots

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts`

- [ ] **Step 1: Replace layout metadata with shared helper**

Use shared metadata definitions and remove placeholder verification codes.

- [ ] **Step 2: Add organization and website JSON-LD globally**

Render JSON-LD in root layout for site-level entities.

- [ ] **Step 3: Make sitemap stable**

Use the shared route list, add `/faq`, `/comparison`, `/implementation`, and `/downloads`, and set `lastModified` to `new Date('2026-04-25')`.

- [ ] **Step 4: Keep static assets crawlable**

Do not disallow `/_next/` in `robots.ts`.

### Task 4: Page Metadata, FAQ Schema, and Internal Links

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/faq/page.tsx`
- Modify: core page metadata files under `src/app/*/page.tsx`

- [ ] **Step 1: Add homepage page schema and GEO Q&A**

Render page and breadcrumb JSON-LD and add a visible "Robot skin FAQ" section linking to FAQ, downloads, products, and contact.

- [ ] **Step 2: Make FAQ indexable**

Remove `noindex` from FAQ metadata and render FAQPage JSON-LD.

- [ ] **Step 3: Replace ad hoc page metadata**

Use shared `buildPageMetadata()` for indexable core routes.

### Task 5: Verification

**Files:**
- Existing tests and project config.

- [ ] **Step 1: Run focused SEO test**

Run: `node --test tests/seo-geo.test.mjs`

Expected: PASS.

- [ ] **Step 2: Run all Node tests**

Run: `node --test tests/homepage-branding.test.mjs tests/seo-geo.test.mjs`

Expected: PASS.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: PASS.

- [ ] **Step 4: Run build**

Run: `npm run build`

Expected: PASS and static export succeeds.
