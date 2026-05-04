# RoboSkin Page Visual Assets Implementation Plan

> **For agentic workers:** Use checklist status while implementing and verify with fresh commands before claiming completion.

**Goal:** Add generated images to RoboSkin.ai secondary page heroes.

**Architecture:** Store final WebP assets in `public/generated/pages/`, centralize image metadata in `src/content/site.ts`, and render through `src/components/PageHeroVisual.tsx`.

---

### Task 1: Contract Test

**Files:**
- Create: `tests/page-visuals.test.mjs`

- [ ] Assert the nine page-level WebP assets exist.
- [ ] Assert `src/content/site.ts` exposes `pageVisuals`.
- [ ] Assert `PageHeroVisual` uses `next/image`.
- [ ] Assert target pages reference the correct visual key.
- [ ] Run the focused test and confirm it fails before implementation.

### Task 2: Generate and Persist Assets

**Files:**
- Create: `public/generated/pages/*.webp`

- [ ] Use built-in `image_gen` for one image per page family.
- [ ] Convert generated PNG outputs to 1600x900 WebP assets.
- [ ] Create a contact sheet for local visual review.

### Task 3: Wire Page Heroes

**Files:**
- Create: `src/components/PageHeroVisual.tsx`
- Modify: `src/content/site.ts`
- Modify: target page files under `src/app/`

- [ ] Add `PageVisual` type and `pageVisuals` metadata.
- [ ] Render page hero visuals on products, solutions, applications, technology, resources, downloads, comparison, implementation, case-studies, about, contact, glossary, and FAQ.
- [ ] Keep privacy and terms unchanged.

### Task 4: Verify and Publish

**Files:**
- Test: `tests/*.test.mjs`

- [ ] Run `node --test tests\page-visuals.test.mjs`.
- [ ] Run `node --test tests\*.test.mjs`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Commit, push to `main`, watch GitHub Pages, and verify live assets.
