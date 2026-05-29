# RoboSkin Brand Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the RoboSkin.ai homepage into a stronger dark technical brand experience while preserving IA, SEO, and conservative content contracts.

**Architecture:** Keep Next.js App Router and Tailwind v4. Add a small homepage brand asset contract in `src/content/site.ts`, consume it from `src/app/page.tsx` and existing visual components, and keep the shared styling in `src/app/globals.css`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, built-in ImageGen-generated WebP assets.

---

### Task 1: Brand Asset Contract Test

**Files:**
- Modify: `tests/homepage-branding.test.mjs`
- Modify: `src/content/site.ts`
- Modify: `src/app/page.tsx`
- Create: `public/generated/brand/roboskin-brand-board.webp`
- Create: `public/generated/brand/roboskin-hero-tactile-lab.webp`

- [ ] Add a failing test that requires the new brand assets, `homeBrandAssets`, and the homepage hero asset reference.
- [ ] Run `node --test tests/homepage-branding.test.mjs` and confirm it fails because the new asset files and content export do not exist.
- [ ] Generate and save the assets under `public/generated/brand/`.
- [ ] Add `homeBrandAssets` in `src/content/site.ts` and consume `homeBrandAssets.hero.image` from `src/app/page.tsx`.
- [ ] Re-run `node --test tests/homepage-branding.test.mjs` and confirm it passes.

### Task 2: Homepage Visual System

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/page.tsx`
- Modify: `src/components/Navigation.tsx`
- Modify: `src/components/IndustryVisuals.tsx`

- [ ] Replace the current blue grid background with a colder graphite, signal-line, and material-depth system.
- [ ] Recompose the homepage hero around a large brand image, fewer small labels, stronger typography, and the existing research/glossary/contact CTAs.
- [ ] Reduce repeated card-grid feeling by using editorial bands, bordered rows, and varied asset-led panels.
- [ ] Keep the tested strings: `Robot skin and tactile AI authority portal`, `What is robot skin?`, `Robot skin direct answers`, `Research and resource index`, `Tactile AI stack map`, `Suggest a Source`, and `Send a research note`.
- [ ] Preserve all existing links required by `tests/seo-geo.test.mjs`.

### Task 3: Verification

**Files:**
- No new source files.

- [ ] Run `node --test tests/*.test.mjs`.
- [ ] Run `npm install` if dependencies are missing.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Start the local Next dev server and inspect the homepage in the browser at desktop and mobile widths.
- [ ] Fix any contrast, wrapping, asset loading, console, lint, build, or mobile overflow issues before final handoff.
