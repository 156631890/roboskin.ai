# RoboSkin Taste UI Targeted Evolution Design

Date: 2026-06-10

## Goal

Use the installed Taste Skill guidance to improve the RoboSkin.ai interface without changing the site's information architecture, SEO structure, routes, or content strategy.

This is a targeted visual evolution, not a full redesign. The highest-value work is the homepage first viewport and the global shell patterns that make the rest of the site feel more deliberate.

## Inputs

User request:

```text
Use https://github.com/Leonxlnx/taste-skill to optimize the interface.
```

Installed and read local skills:

- `design-taste-frontend`
- `redesign-existing-projects`

Project stack:

- Next.js 15
- React 19
- Tailwind CSS 4
- `next/font`
- Existing fonts: Space Grotesk and Geist Mono
- No Motion, GSAP, icon library, shadcn, or external design-system dependency

## Design Read

RoboSkin.ai is an existing B2B robotics and tactile AI authority site for technical readers, AI-search readers, and research-oriented buyers. The right direction is a dark technical editorial system, not a generic AI landing page and not a consumer-style brand reset.

Dial settings:

- `DESIGN_VARIANCE: 6`
- `MOTION_INTENSITY: 3`
- `VISUAL_DENSITY: 4`

Rationale:

- Variance should rise enough to reduce templated repetition, but not so high that SEO content pages become experimental.
- Motion should stay restrained because the project has no motion dependency and the site is primarily informational.
- Density should stay moderate because the site is a research and glossary hub, not a dashboard.

## Current Audit

### Preserved Strengths

- Strong dark technical brand direction.
- Real generated visual assets already exist and match the robot skin subject.
- The homepage has useful SEO and GEO content, including direct answers, research routes, glossary routes, and internal links.
- The primary navigation is stable and readable.
- The site already uses semantic pages, sitemap generation, metadata, and JSON-LD helpers.

### Problems To Fix

The homepage first viewport has too much vertical dead space above the hero content. At common desktop sizes, the H1, supporting text, and image are visible, but the composition feels pushed down and heavy. On very tall screenshots, the empty top field dominates the page.

The homepage relies too heavily on one repeated formula:

```text
small cyan label -> large heading -> muted paragraph -> signal-panel cards
```

This makes the page feel more template-driven than it should.

The `.eyebrow` and `uppercase tracking` pattern appears too often across the homepage and shared homepage components. Taste Skill flags this as a common AI-generated design tell.

The hero currently has three CTA buttons. The third CTA wraps into a second row on desktop and makes the mobile first viewport feel heavier than necessary.

The global card language overuses glowing borders, dark panels, cyan accents, and grid textures. It is coherent, but too uniform.

Mobile needs special attention. The current mobile hero stacks content correctly, but the copy, CTA group, and image arrival make the first viewport dense and horizontally constrained.

## Scope

Modify only:

- `src/app/page.tsx`
- `src/components/Navigation.tsx`
- `src/components/IndustryVisuals.tsx`
- `src/app/globals.css`

Possible minor read-only references:

- `src/content/site.ts`
- existing generated assets under `public/generated`

Do not modify:

- Route structure
- Primary navigation labels
- SEO metadata
- JSON-LD helpers
- `sitemap.ts`
- Research article content
- Contact form field names or order
- Legal pages
- New image assets
- New dependencies

## Homepage Hero Design

The homepage hero should be tightened into a stronger first viewport.

Changes:

- Reduce top dead space by changing the hero grid alignment from vertically centered with excessive empty field to a more composed first-screen layout.
- Keep the three-line H1:
  - `Robot skin`
  - `and tactile AI`
  - `authority portal`
- Keep the main image, but make its frame feel integrated with the first viewport rather than placed low in the page.
- Keep the short introductory line, but treat it as a simple line of text, not a pill or heavy eyebrow.
- Reduce hero CTAs from three to two:
  - `Browse robot skin research`
  - `Open the robot skin glossary`
- Move `Submit a Source` out of the hero and into the later conversion section.
- Keep the `What is robot skin?` answer block, but make it visually quieter so it supports the H1 instead of creating a second mini-card.
- Ensure the first viewport shows a hint of the next section on desktop where practical.

Mobile behavior:

- One-column flow.
- Text first, image second.
- Two full-width CTAs with single-line labels.
- No horizontal overflow.
- No copy clipped at the right edge.

## Global UI System Design

### Color

Keep a single dark technical theme.

Accent family:

- Primary accent remains cyan-blue.
- Keep `#00e5ff` and `#00c8ff` as the recognizable RoboSkin accent.
- Reduce secondary accent variation in homepage components.
- Avoid adding new amber, rose, purple, or green accents in this pass.

Background:

- Keep off-black and blue-black values.
- Reduce visible scanline and grid intensity so text and imagery carry the page.
- Keep subtle texture because a completely flat dark background would feel unfinished.

### Typography

Keep Space Grotesk and Geist Mono. Do not add a new font dependency.

Adjustments:

- Tighten hero typography only where needed.
- Use `text-wrap: balance` and `text-wrap: pretty` where helpful.
- Reduce small all-caps labels on homepage sections.
- Keep mono labels for actual data, layer numbers, and index-like information.

### Buttons

Use the existing button classes, but refine them:

- Keep radius around 10 to 12px.
- Add visible focus states.
- Keep hover lift subtle.
- Keep active pressed feedback.
- Prevent desktop CTA wrapping.
- Make mobile CTA width and spacing intentional.

### Panels

Keep `signal-panel` and `glass-card`, but reduce their default visual weight:

- Softer grid opacity.
- Less glow.
- Slightly cleaner borders.
- Less repeated panel texture in nested content.

Do not remove the classes because many pages use them. Refine the class definitions instead.

## Homepage Section Design

### Authority Index

Keep the content and links. Change the visual rhythm from four equal boxes to a clearer directory surface.

Preferred design:

- One stronger section header without an eyebrow.
- Four groups remain, but their cards become quieter and more list-like.
- Links inside each group should read like navigable rows, not repeated mini-cards.

No route changes.

### Direct Answers

Keep direct-answer content for GEO value.

Changes:

- Remove repeated `Direct answer` labels on every item.
- Let the question itself lead.
- Use image-backed answers where already available.
- Keep internal CTAs.

### Research And Resource Index

Keep the two-column layout but increase contrast between the editorial note and the research list.

Changes:

- Reduce label density.
- Avoid another large `eyebrow` above the section.
- Preserve the existing research/resource links.

### Public Guide Assets

Keep the asset cover cards and existing images.

Changes:

- Reduce chip-like overlay feel.
- Keep asset images as the visual anchor.
- Avoid adding new colors beyond the existing accent system where possible.

### Market Signals

Replace the four equal glowing signal cards with a lighter editorial grid or compact signal list.

Goals:

- Reduce repeated card language.
- Keep all four text items.
- Make the section feel like analysis, not a generic features row.

### Final CTA

Make the conversion area simpler:

- One strong heading.
- One short paragraph.
- Clear routes for research, correction, and collaboration.
- Include the moved `Submit a Source` intent here.
- Avoid large nested cards inside a large card.

## Navigation Design

Preserve:

- Brand mark.
- `RoboSkin.ai` wordmark.
- Primary nav labels.
- `Suggest Source` CTA.
- Mobile menu behavior.

Refine:

- Keep desktop nav one line.
- Slightly reduce the active pill heaviness.
- Add better focus-visible styles.
- Keep navbar height under 80px.
- Make mobile menu items feel consistent with the updated button and panel system.

## Taste Skill Pre-Flight Requirements

Must satisfy:

- No new em dash characters in page copy or edited visible strings.
- One dark theme across the page.
- One accent family.
- No new purple AI gradient direction.
- No repeated small uppercase label above every homepage section.
- No three equal feature-card row as the dominant homepage rhythm.
- No desktop CTA wrapping.
- Hero content visible and balanced at `1440x900`.
- Mobile hero usable at `390x900`.
- No new fake numbers, fake customers, customer logos, or unsupported product claims.
- No new dependencies unless implementation proves a hard need.
- No hand-rolled decorative SVGs.

## Verification

Run:

```text
npm run lint
npm run build
```

Local smoke checks:

- `/` returns 200.
- `/physics-ai` returns 200.
- `/research` returns 200.
- `/contact` returns 200.

Screenshot checks:

- Capture `/` at `1440x900`.
- Capture `/` at `390x900`.
- Capture `/physics-ai` at desktop or mobile to ensure global style changes do not damage key SEO page layout.

Content and pattern checks:

```text
rg -n "\x{2013}|\x{2014}" src/app/page.tsx src/components/Navigation.tsx src/components/IndustryVisuals.tsx src/app/globals.css
rg -n "eyebrow|uppercase tracking" src/app/page.tsx src/components/IndustryVisuals.tsx
```

Expected:

- No new em dash or separator dash characters.
- Homepage section label count is lower than current baseline.
- Hero has two primary CTAs in the first viewport.
- The third source-submission intent appears later in the page.

## Non-Goals

- Do not redesign every page.
- Do not change copy strategy.
- Do not change route slugs.
- Do not change main navigation labels.
- Do not add a visual concept image pass.
- Do not add Motion, GSAP, or icon libraries.
- Do not add testimonials, logo walls, fake customer proof, or invented metrics.
- Do not change the recently added Physics AI SEO structure.
