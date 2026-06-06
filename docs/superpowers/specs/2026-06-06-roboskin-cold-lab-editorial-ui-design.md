# RoboSkin Cold Lab Editorial UI Design

## Design Read

RoboSkin.ai is an existing robotics information hub for technical readers, researchers, and category observers tracking robot skin, tactile AI, e-skin, tactile sensors, and physical AI touch. Read this redesign as a targeted evolution of the current dark technical brand, not a new product positioning exercise.

The approved direction is A, cold lab editorial: image-led, precise, dark, restrained, and technical. The site should feel like a robotics lab publication with tactile signal instrumentation, not a generic AI SaaS page.

## Taste Skill Settings

- `DESIGN_VARIANCE: 7`: keep the asymmetric hero and add more section rhythm without breaking readability.
- `MOTION_INTENSITY: 4`: use light reveal, hover, focus, and pressed states only. Do not add a new motion dependency.
- `VISUAL_DENSITY: 4`: preserve the homepage as a useful information index, but reduce repetitive panels, badges, and equal card grids.

## Scope

Preserve URL structure, route slugs, primary navigation labels, JSON-LD behavior, metadata generation, contact form behavior, and the conservative claim standard. Keep the current generated RoboSkin image assets as the primary visual source.

Change the visual layer across:

- `src/app/page.tsx`
- `src/app/globals.css`
- `src/components/Navigation.tsx`
- `src/components/Footer.tsx`
- `src/components/IndustryVisuals.tsx`
- Shared visual treatment used by homepage panels and image-led sections

Do not rewrite the site content strategy, add new routes, introduce unsupported claims, change form fields, or replace the generated asset set.

## Visual System

Use a graphite black, deep lab navy, cold silver, and muted signal cyan system. Cyan is the single accent and should be used as a signal marker, not as a global glow on every component. Avoid purple-blue AI gradients, heavy neon bloom, warm luxury palettes, and repeated glass-card defaults.

Shape rules:

- Keep the existing compact technical radius scale.
- Buttons and panels should stay rectangular with softened corners, not oversized pills.
- Use image masks, editorial rows, divider lines, and plain lists where cards do not add hierarchy.

Typography rules:

- Keep the current `Space Grotesk` and `Geist Mono` stack.
- Make display text stronger through scale, line-height, and spacing, not through new fonts.
- Reduce uppercase eyebrow frequency.
- Prefer sentence case section language unless a small technical label is justified.

## Homepage Composition

The first viewport should become more image-led and less panel-led:

- Hero copy stays left aligned with a stronger editorial headline.
- Hero image keeps the current robotic tactile-skin asset and becomes the dominant brand signal.
- Hero supports two primary actions first: research and glossary.
- The third source-submission action becomes lower emphasis.
- The downstream stack or index preview remains visible after the hero so the first screen hints at the next section.

Downstream homepage sections should vary layout family:

- Stats become a quieter instrumentation strip, not four identical glowing cards.
- Authority index becomes a more editorial route map.
- Direct answers become image-supported answer rows with less repeated "Direct answer" labeling.
- Research and resources stay source-backed but use stronger image and list hierarchy.
- Market signals remain concise, with less equal-card sameness.
- Final CTA stays research and correction oriented, not sales oriented.

## Shared Component Direction

Navigation should feel precise and less pill-heavy while preserving the same links and active state. Mobile behavior remains unchanged.

Footer should use the same dark technical brand treatment as the header. Remove the inconsistent light icon surface and align link hover colors with the locked cyan accent.

`IndustryVisuals` should reduce repeated cyan labels and avoid multi-accent asset cards where possible. Existing asset accent data can remain in content, but the visual output should read as one coherent RoboSkin system.

## Accessibility and Interaction

All interactive elements need visible focus states, hover states, and pressed feedback. Button text must pass contrast against its background. Do not remove alt text from meaningful images. Do not hide navigation or reduce keyboard access.

Animations should respect `prefers-reduced-motion`. Use CSS transforms and opacity only. Do not add scroll listeners or JavaScript animation libraries for this pass.

## Verification

Run:

- `npm run lint`
- `npm run build`

Browser verification should cover:

- Desktop homepage around 1440px width
- Mobile homepage around 390px width
- Navigation open and close on mobile
- First viewport readability and CTA visibility
- No obvious text overlap, blank image areas, or broken visual hierarchy

Success means the homepage clearly reads as cold lab editorial, keeps existing RoboSkin information architecture, and removes the most obvious generic AI-tech patterns without expanding the product story.
