# RoboSkin Authority Visual Assets Design

## Goal

Add generated bitmap visuals that make the RoboSkin.ai authority portal feel more credible and useful without turning the site into a stock-photo catalog.

## Approved Scope

The first batch focuses on authority portal visuals:

- Homepage hero: `authority-hero-tactile-stack.webp`
- Direct-answer visuals: `robot-skin-definition.webp`, `tactile-ai-loop.webp`
- Industry asset covers: `state-of-tactile-ai-cover.webp`, `humanoid-stack-map-cover.webp`, `roboskin-index-cover.webp`
- Research thumbnails: `research-graphene-liquid-metal.webp`, `research-soft-robotic-skin.webp`, `research-ros2-tactile-pipeline.webp`

## Visual Rules

Images should use a dark technical robotics palette that matches the current authority portal UI: near-black surfaces, blue/cyan tactile signal highlights, restrained amber/rose accents only where useful, and scientific hardware texture.

Generated images must not contain baked-in text, logos, watermarks, customer names, unsupported medical claims, or fake brand marks. Page text remains HTML/CSS so it is readable, accessible, crawlable, and editable.

## Integration

Assets will live under `public/generated/authority/`. Content records in `src/content/site.ts` will expose image paths and alt text. `src/components/IndustryVisuals.tsx` will render the images in homepage hero, direct-answer, industry-cover, and research-index sections while preserving existing internal links and structured-data behavior.

## Verification

Automated tests will confirm that every approved asset exists, is referenced from content, and is rendered by the homepage visual components. The normal `node --test tests\*.test.mjs`, `npm run lint`, and `npm run build` checks remain required before publishing.
