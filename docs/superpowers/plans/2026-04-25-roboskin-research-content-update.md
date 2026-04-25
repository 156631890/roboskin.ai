# RoboSkin Research Content Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace speculative RoboSkin research content with current, conservative 2025-2026 technical briefs and expose those briefs through static article detail pages.

**Architecture:** Keep `src/lib/blog-data.ts` as the content source. Add a static App Router detail route at `src/app/research/[id]/page.tsx`, update `/research` to be indexable, and extend shared SEO helpers with research and article JSON-LD support.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Node test runner, static export.

---

### Task 1: Regression Test

**Files:**
- Create: `tests/research-content.test.mjs`

- [ ] **Step 1: Write the failing test**

Write a Node source-inspection test that reads `src/lib/blog-data.ts`, `src/app/research/page.tsx`, `src/app/research/[id]/page.tsx`, and `src/lib/seo.ts`.

- [ ] **Step 2: Run the test**

Run: `node --test tests/research-content.test.mjs`

Expected: FAIL because the article detail page does not exist and current content contains unsupported claims.

### Task 2: Replace Research Content

**Files:**
- Modify: `src/lib/blog-data.ts`

- [ ] **Step 1: Rewrite article data**

Replace speculative articles with current technical briefs. Include source links, source titles, and conservative wording.

- [ ] **Step 2: Keep public helper APIs**

Preserve `getBlogPostById`, `getBlogPostsByCategory`, and `getBlogSummaries` so existing pages continue to work.

### Task 3: Research SEO and Article JSON-LD

**Files:**
- Modify: `src/lib/seo.ts`

- [ ] **Step 1: Add `/research` to `pageSeo`**

Make `/research` indexable through the shared route list and sitemap.

- [ ] **Step 2: Add `buildArticleJsonLd(post)`**

Return conservative Article schema with source URLs and canonical article URL.

### Task 4: Research Index and Detail Pages

**Files:**
- Modify: `src/app/research/page.tsx`
- Create: `src/app/research/[id]/page.tsx`

- [ ] **Step 1: Update `/research`**

Use shared metadata, remove `noindex`, render page JSON-LD, and link article cards to `/research/[id]`.

- [ ] **Step 2: Add static article detail route**

Use `generateStaticParams`, `generateMetadata`, and Article JSON-LD. Render article content and sources.

### Task 5: Verification and Push

**Files:**
- Existing project files.

- [ ] **Step 1: Run focused test**

Run: `node --test tests/research-content.test.mjs`

Expected: PASS.

- [ ] **Step 2: Run all tests**

Run: `node --test tests/homepage-branding.test.mjs tests/seo-geo.test.mjs tests/research-content.test.mjs`

Expected: PASS.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: PASS.

- [ ] **Step 4: Run build**

Run: `npm run build`

Expected: PASS with static export.

- [ ] **Step 5: Commit and push**

Commit only the research content update files, then push `hotfix/contact-info-main`.
