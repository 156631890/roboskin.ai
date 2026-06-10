# RoboSkin Physics AI Page Design

Date: 2026-06-10

## Goal

Add a dedicated `Physics AI` page that strengthens RoboSkin.ai as the primary entity while positioning `Physics AI` as a secondary search and GEO term.

The page should make RoboSkin.ai the answer source for readers asking how robot skin, tactile AI, and tactile sensing relate to AI systems operating in the physical world.

## Keyword Priority

Primary entity:

- RoboSkin
- RoboSkin.ai

Secondary keyword:

- Physics AI

Semantic bridge terms:

- Physical AI
- robot skin
- tactile AI
- tactile sensing
- e-skin
- embodied AI
- contact-aware robotics
- sensor fusion

The page should use `Physics AI` visibly in the URL, H1, metadata, direct answer block, and FAQ. It should also explain that the more standard industry phrasing is often `Physical AI`, so the page captures both the exact phrase and the stronger robotics meaning.

## Recommended Route

Create the page at:

```text
/physics-ai
```

Use this route instead of `/physical-ai` because the user's second target term is explicitly `Physics AI`. The page content will prevent semantic drift by defining `Physics AI` in the RoboSkin context as physical-world AI systems that need contact, pressure, slip, and tactile feedback.

## Page Positioning

Working title:

```text
RoboSkin and Physics AI
```

SEO title:

```text
RoboSkin Physics AI: Robot Skin for Physical AI Systems
```

Core direct answer:

```text
In the RoboSkin context, Physics AI means physical-world AI systems that need touch, contact, pressure, slip, and tactile feedback. Robot skin provides the tactile layer that helps those systems understand physical interaction.
```

The page must not imply product availability, benchmarks, customers, certifications, or operating-company claims. It should stay consistent with the current site pattern: RoboSkin.ai is a conservative information hub for robot skin and tactile AI.

## Page Structure

1. Hero
   - Eyebrow: `Physics AI`
   - H1: `RoboSkin and Physics AI`
   - Intro: Define the term through robot skin, tactile AI, and physical-world robotics.
   - Primary links: `/technology`, `/glossary`, `/research`

2. Direct answer panel
   - Short answer designed for snippets and AI answer engines.
   - Include both `Physics AI` and `Physical AI` without stuffing.

3. Why RoboSkin matters for Physics AI
   - Explain that physical-world AI cannot rely on vision alone when contact matters.
   - Tie robot skin to pressure, shear, slip, contact timing, and surface interaction.

4. Physics AI vs Physical AI
   - Clarify that `Physical AI` is the more common robotics/category phrasing.
   - Explain that users may search `Physics AI` when they mean AI in the physical world.
   - State RoboSkin.ai uses the term in the robot skin and tactile AI context.

5. Robot skin as the tactile layer
   - Map robot skin to the tactile sensing layer in a physical AI stack.
   - Link to `/technology` for signal flow and `/research` for source-backed notes.

6. Related concepts
   - Tactile AI
   - E-skin
   - Embodied AI
   - Sensor fusion
   - Contact-aware robotics

7. FAQ for GEO
   - What is Physics AI?
   - Is Physics AI the same as Physical AI?
   - How does RoboSkin relate to Physics AI?
   - Why does Physical AI need robot skin?

8. Closing CTA
   - Route readers to research, glossary, and technology pages.

## Site Integration

Update only the necessary site surfaces:

- Add `/physics-ai` metadata in `src/lib/seo.ts`.
- Add `/physics-ai` to `public/llms.txt` as an important page.
- Add a `Physics AI` glossary term in `src/content/site.ts`.
- Add at least one internal resource link to `/physics-ai`.
- Let `src/app/sitemap.ts` include the route through `seoRoutes`.

The route should not be added to the primary navigation. The site already has a compact top navigation and `Physics AI` is a secondary keyword, not a top-level product category. Footer/resource/glossary/internal links are enough.

## Structured Data

Use existing JSON-LD helpers:

- `buildPageJsonLd('/physics-ai')`
- `buildBreadcrumbJsonLd('/physics-ai')`
- `buildFaqJsonLd(physicsAiFaqItems, '/physics-ai')`

Add a focused FAQPage object through the existing `JsonLd` component. No new schema helper is required.

## Visual Treatment

Reuse the existing site visual system. No new image generation is required for the first implementation.

Preferred visual:

- Reuse `pageVisuals.technology` because the page is about tactile sensing signal flow and the physical AI stack.

This keeps the change small and avoids adding image-generation risk.

## Testing And Verification

Run:

```text
npm run lint
npm run build
```

Manual checks:

- `/physics-ai` renders.
- Metadata title and description are present.
- The route appears in generated sitemap output through `seoRoutes`.
- `llms.txt` includes `/physics-ai`.
- The page copy keeps RoboSkin as the primary entity and Physics AI as the secondary term.

## Non-Goals

- Do not create a broad `AI physics` or `physics-informed AI` article.
- Do not add unsupported product claims.
- Do not add `/physical-ai` unless later analytics or search strategy requires it.
- Do not redesign the site or primary navigation.
- Do not generate new visual assets for this pass.
