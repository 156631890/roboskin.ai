# RoboSkin Page Visual Assets Design

## Goal

Extend the generated RoboSkin.ai visual system beyond the homepage so secondary pages do not feel text-only.

## Approved Scope

Add nine page-level bitmap assets under `public/generated/pages/` and reuse them across related page families:

- Products: `domain-use-visual.webp`
- Solutions and applications: `application-contexts.webp`
- Technology: `technology-signal-flow.webp`
- Resources and downloads: `resources-library.webp`
- Comparison: `comparison-matrix.webp`
- Implementation: `category-roadmap.webp`
- Case studies: `case-contexts.webp`
- About and contact: `about-contact-inquiry.webp`
- Glossary and FAQ: `glossary-faq-answers.webp`

Privacy and terms stay unmodified because they are legal pages.

## Visual Rules

Images use the existing dark technical robotics direction: near-black surfaces, blue/cyan tactile signal highlights, clean hardware context, and no baked-in public copy. Any page-specific language remains accessible HTML text.

## Integration

Expose the asset paths, alt text, and captions through `pageVisuals` in `src/content/site.ts`. Render each page hero with a shared `PageHeroVisual` component using `next/image`.

## Verification

Automated tests should confirm all approved assets exist and every target page references `PageHeroVisual` with the expected `pageVisuals` key. The normal test, lint, and static build checks remain required before publishing.
