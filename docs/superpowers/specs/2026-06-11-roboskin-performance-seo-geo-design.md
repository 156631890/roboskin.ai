# RoboSkin Performance, SEO, and GEO Optimization Design

## Goal

Improve RoboSkin.ai loading speed and answer-engine discoverability without changing the site's route strategy, brand focus, or conservative claim posture.

The work should make the existing site faster to render and easier for search engines and AI answer engines to understand, especially around the primary `robot skin` entity and the secondary `Physics AI` / `Physical AI` cluster.

## Current Context

RoboSkin.ai is a static-export Next.js site:

- `next.config.ts` uses `output: 'export'`.
- `images.unoptimized` is enabled, so there is no runtime Next image optimizer.
- Core SEO helpers already exist in `src/lib/seo.ts`.
- Pages already use canonical URLs, Open Graph metadata, sitemap entries, robots rules, breadcrumbs, FAQ schema, and `llms.txt`.
- `/physics-ai` is the canonical RoboSkin page for the `Physics AI` keyword variant while naturally covering `Physical AI`.
- The project has local SEO tests, including `tests/seo-geo.test.mjs`.

This means the next useful move is not a rewrite. It is a targeted pass on the critical rendering path and entity clarity.

## Non-Goals

- Do not create `/physical-ai`.
- Do not add keyword-stuffed pages or hidden text.
- Do not invent customers, benchmarks, certifications, awards, or product availability claims.
- Do not add dependencies.
- Do not change primary navigation labels.
- Do not replace the existing SEO helper architecture.
- Do not rely on Next response headers for cache policy because the site is statically exported and hosting behavior is platform-specific.

## Performance Design

### Image Priority

Keep `priority` only on true above-the-fold hero images. The homepage has one real LCP candidate: the main robot skin hero image.

The `TactileStackMap` image appears after the first viewport but currently uses `priority`. That should be changed to normal lazy loading so it does not compete with the hero image during initial load.

### Image Sizing

Keep `next/image` usage, but tune `sizes` strings so browsers do not over-request image candidates when layout width is narrower than `100vw`.

Because the generated WebP files are already small, the optimization target is resource priority and browser selection, not file recompression.

### Rendering Work

Add a restrained CSS helper for below-the-fold sections using `content-visibility: auto` and `contain-intrinsic-size`. Apply it to large homepage sections that are not needed for the first meaningful paint.

This should reduce initial rendering work while preserving the current visual layout once users scroll.

## SEO and GEO Design

### Physics AI Entity Clarity

Enhance structured data for `/physics-ai` so the page clearly expresses:

- RoboSkin.ai is the publisher.
- `/physics-ai` is the canonical page for RoboSkin's explanation of `Physics AI`.
- `Physics AI` is related to `Physical AI`.
- The page is about robot skin, tactile AI, tactile sensing, e-skin, contact feedback, pressure, slip, and physical-world AI systems.

This should use visible-page-aligned JSON-LD. The schema must not claim that `Physics AI` is the standard industry term. The page should continue to say the more common robotics phrase is often `Physical AI`.

### AI Answer Engine Guidance

Update `public/llms.txt` with a concise answer block for:

- What RoboSkin.ai is.
- Which page is canonical for Physics AI.
- How RoboSkin uses the `Physics AI` and `Physical AI` terms.
- Which supporting routes answer follow-up questions.

This helps AI systems extract the intended answer without confusing the site for a product vendor or benchmark source.

### Metadata Hygiene

Keep the current metadata helper. Make small changes only if they strengthen entity relationships or remove ambiguity.

Do not add a massive keyword list. Current keywords are already broad enough; the higher-value move is schema and visible answer consistency.

## Tests and Verification

Update existing tests instead of adding a new test framework.

Verification should include:

- `node --test tests/seo-geo.test.mjs`
- `npm run lint`
- `npm run build`
- Local route smoke checks for `/`, `/physics-ai`, `/research`, and `/contact`
- Pattern checks confirming no `/physical-ai` route or link was introduced

The existing `tests/seo-geo.test.mjs` has at least one stale assertion from the prior homepage UI polish. It should be updated to match current visible copy while still protecting SEO/GEO requirements.

## Files Likely To Change

- `src/components/IndustryVisuals.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/app/physics-ai/page.tsx`
- `src/lib/seo.ts`
- `public/llms.txt`
- `tests/seo-geo.test.mjs`

Do not change unrelated pages unless a verification failure proves a narrow change is required.

## Acceptance Criteria

- Homepage keeps the same user-facing route and content strategy.
- `/physics-ai` remains the only Physics AI canonical route.
- No `/physical-ai` route or internal link appears.
- Non-first-viewport homepage images no longer use high-priority loading.
- Below-the-fold homepage sections can be deferred by the browser without layout collapse.
- `llms.txt` gives clear RoboSkin and Physics AI extraction guidance.
- JSON-LD on `/physics-ai` has stronger entity context while matching visible content.
- SEO tests, lint, and production build pass.
- Local smoke routes return 200.

## Risks

- SEO and GEO changes can improve crawlability and answer extraction, but they do not guarantee rankings.
- `content-visibility` can create layout surprises if used on unstable sections. Apply it only to full-width sections with predictable intrinsic size.
- Static export limits server-level performance controls. CDN/cache headers should be handled at the hosting layer, not simulated inside app code.
