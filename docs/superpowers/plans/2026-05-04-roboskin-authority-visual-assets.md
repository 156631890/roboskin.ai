# RoboSkin Authority Visual Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate and integrate the first RoboSkin.ai authority portal bitmap asset pack.

**Architecture:** Store final WebP assets in `public/generated/authority/`, expose paths and alt text from `src/content/site.ts`, and render them through existing homepage visual components. Keep text out of generated images and use HTML/CSS overlays for readable labels.

**Tech Stack:** Next.js App Router static export, React components, Node test runner, built-in image_gen.

---

### Task 1: Lock Visual Asset Contract

**Files:**
- Modify: `tests/homepage-branding.test.mjs`
- Modify: `.gitignore`

- [ ] Add a test that expects all nine approved `/generated/authority/*.webp` files to exist.
- [ ] Add assertions that homepage visual components reference `asset.image`, `entry.image`, direct-answer image fields, and the tactile stack hero image.
- [ ] Run `node --test tests\homepage-branding.test.mjs` and verify it fails because the assets and references are missing.

### Task 2: Generate Image Assets

**Files:**
- Create: `public/generated/authority/authority-hero-tactile-stack.webp`
- Create: `public/generated/authority/robot-skin-definition.webp`
- Create: `public/generated/authority/tactile-ai-loop.webp`
- Create: `public/generated/authority/state-of-tactile-ai-cover.webp`
- Create: `public/generated/authority/humanoid-stack-map-cover.webp`
- Create: `public/generated/authority/roboskin-index-cover.webp`
- Create: `public/generated/authority/research-graphene-liquid-metal.webp`
- Create: `public/generated/authority/research-soft-robotic-skin.webp`
- Create: `public/generated/authority/research-ros2-tactile-pipeline.webp`

- [ ] Use built-in `image_gen` once per final asset.
- [ ] Copy generated outputs from `C:\Users\Administrator\.codex\generated_images` into `public/generated/authority/`.
- [ ] Verify filenames and extensions match the test contract.

### Task 3: Wire Assets Into Content and Components

**Files:**
- Modify: `src/content/site.ts`
- Modify: `src/components/IndustryVisuals.tsx`
- Modify: `src/app/page.tsx`

- [ ] Add image and alt fields to authority content records.
- [ ] Render the tactile stack hero image in `TactileStackMap`.
- [ ] Render direct-answer images in `DirectAnswerSection`.
- [ ] Render research index and industry cover images in their existing cards.
- [ ] Keep all images decorative or descriptive through useful `alt` text and avoid baked-in text in images.

### Task 4: Verify and Publish

**Files:**
- Test: `tests/*.test.mjs`

- [ ] Run `node --test tests\*.test.mjs`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Confirm `out/index.html` references `/generated/authority/`.
- [ ] Commit and push to `main`, then verify the GitHub Pages deployment and live `https://roboskin.ai`.
