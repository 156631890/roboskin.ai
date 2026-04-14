# RoboSkin Visual Refresh Design

> **Goal:** Refresh the RoboSkin website so it feels like a credible, modern hardware company with a product-led structure, restrained color system, and clear conversion paths.

**Architecture:** Keep the current Next.js App Router structure and existing information architecture from the PRD, but replace the current neon-heavy visual language with a calmer product-brand system. The site should read as a serious B2B hardware company: one accent color, neutral surfaces, large type, more whitespace, and fewer decorative effects. The homepage should lead with product clarity, while product and solutions pages should feel like structured technical catalogs rather than marketing landing pages.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4

---

## Design Inputs

The direction is based on patterns seen in current robotics and deep-tech sites:

- `tacterion.com` for restrained enterprise presentation and clean spacing
- `contactile.com` for a problem-first tactile sensing message
- `gelsight.com/products` for product/catalog clarity
- `syntouchllc.com` for pragmatic service and application framing
- `touchtronix.io` for a product + solution hybrid structure

The shared pattern is consistent:

- limited color usage
- large headline hierarchy
- few CTAs per section
- clear product or solution segmentation
- less glow, less motion, less decorative noise

---

## Visual System

### Color Palette

Use a neutral-led palette with one controlled accent.

Recommended tokens:

- `bg`: `#F6F4EF`
- `surface`: `#FFFFFF`
- `surface-subtle`: `#EEEAE2`
- `text`: `#111318`
- `text-muted`: `#61656F`
- `border`: `#D9D3C8`
- `accent`: `#2E5BFF`
- `accent-soft`: `#DDE6FF`
- `accent-2`: `#0F766E` only as a secondary functional accent if needed

Rules:

- Do not use full-page neon gradients.
- Do not mix more than one saturated accent in a single section unless there is a functional reason.
- Use dark backgrounds only for hero and final CTA bands, not as the default page canvas.

### Typography

- Use the existing `Space Grotesk` family for headlines.
- Use a simple, highly legible sans for body text via the current system stack or the existing font fallback.
- Increase hierarchy contrast:
  - hero H1 very large
  - section headers bold and concise
  - body copy shorter and more spacious

### Shape and Surface

- Prefer flat cards with subtle borders over heavy glass effects.
- Use soft radii, not overly rounded pills everywhere.
- Shadows should be minimal and functional.
- Decorative glow should be removed except for a narrow accent treatment in hero or key CTA regions.

### Motion

- Keep only a small number of reveal animations.
- Prefer fade + 8-12px vertical rise.
- Remove pulsing glows, constant gradient animation, and other attention-grabbing motion.

---

## Layout Principles

### Homepage

The homepage becomes a product-led landing page:

1. Hero
   - One sentence about what RoboSkin is.
   - One sentence about who it is for.
   - Two CTAs only.

2. Product strip
   - Three offer levels displayed in a tight grid.
   - Each card states best fit, short summary, and one CTA.

3. Use cases
   - Three customer problems or application areas.
   - More descriptive than promotional.

4. Technology summary
   - A clean four-layer explanation of the sensing stack.

5. Final CTA
   - One strong conversion block.

The page should avoid any “stat wall” or large decorative dashboard treatment.

### Products

- Treat product cards like catalog entries.
- Keep the public lineup visually narrow.
- Highlight only the three primary offer levels.
- Specs should appear in compact lists with clear labels.
- Remove oversized imagery if it distracts from readability.

### Solutions

- Organize around customer problems.
- Each section should answer:
  - what is the problem
  - why tactile sensing helps
  - which product path is recommended
  - what the next step is

### Technology

- Use a four-layer model:
  - sensing layer
  - signal and processing layer
  - materials and form factor layer
  - integration layer
- Present this as a clean stack or grid, not a dense diagram.

### Resources

- Keep the page utility-first.
- Emphasize request flows over download theater.
- Use narrow cards and simple labels for availability.

### Contact

- Make the form feel like a serious engineering inquiry form, not a promotional lead form.
- Keep the hero simple.
- Preserve the form as the dominant element.

---

## Page-Specific Styling Direction

### Home Hero

- Background: warm off-white or very light neutral.
- Title: black or near-black.
- Accent: one cobalt blue CTA.
- Supporting visual: product cards or a restrained abstract panel, not a full-bleed lab collage.

### Product Cards

- White cards on a light neutral background.
- One thin accent line or tag.
- Specs in tidy rows.
- CTAs should not compete visually.

### Solutions Grid

- Slightly darker than the homepage body, but still neutral.
- Use problem-first framing and short copy blocks.

### Final CTA Bands

- Use a dark charcoal band with white text and a single accent button.
- This is the only place where a stronger color contrast is desirable.

---

## Implementation Boundaries

This design should not change:

- site routing
- content strategy from the PRD
- contact form behavior
- SEO metadata structure beyond styling-related adjustments

This design should change:

- color palette
- page backgrounds
- card treatment
- headline scale and spacing
- CTA presentation
- motion intensity

The existing design system should be simplified, not replaced with a brand-new visual identity.

---

## Acceptance Criteria

- The site no longer feels neon-heavy or overly glossy.
- The homepage reads like a product company, not a concept pitch.
- Product and solutions pages are easier to scan.
- There is one dominant accent color and a restrained neutral base.
- Cards, borders, and spacing feel more like a mature hardware brand.
- The contact flow is visually quieter and more trustworthy.

---

## Testing and Review

- Review the refreshed homepage and product pages on desktop and mobile.
- Confirm the hero, product strip, and final CTA are visually distinct.
- Confirm there are no excessive gradients, glows, or pulsing effects.
- Confirm text contrast remains accessible on light and dark sections.
- Confirm the site still feels consistent across public routes.
