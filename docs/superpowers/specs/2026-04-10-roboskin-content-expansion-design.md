# RoboSkin Content Expansion Design

> **Goal:** Expand the RoboSkin website into a fuller B2B content site that explains the product, the deployment path, and the technical resources in enough detail to support evaluation and integration.

**Architecture:** Keep the current Next.js App Router structure and the existing dark, technical visual system. This work should extend the content model rather than introducing a new brand system. The site should remain product-led and engineering-first, but each major route needs deeper copy, clearer decision support, and more conversion-oriented detail. The implementation should centralize structured content in `src/content/site.ts` or a small set of adjacent content modules so new sections and pages can reuse the same source of truth.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4

---

## Scope

This expansion covers three layers:

1. **Existing route enrichment**
   - Home
   - Products
   - Solutions
   - Technology
   - Resources
   - About
   - FAQ
   - Research
   - Case Studies
   - News
   - Contact

2. **New content hub pages**
   - `comparison`
   - `implementation`
   - `downloads`

3. **Shared content model**
   - Reusable arrays and objects for specs, FAQ entries, comparison rows, implementation stages, resource items, and case study summaries

The design should not add unrelated product features, authentication, dashboards, or interactive tooling. The goal is content depth and conversion clarity.

---

## Content Strategy

The site should answer the questions a serious robotics buyer would ask:

- What is RoboSkin?
- Which product should I start with?
- What robot types and surfaces are supported?
- What is the path from evaluation to integration?
- What technical material can I request?
- What evidence exists for reliability and fit?

The writing style should be:

- specific
- technical
- restrained
- free of unsupported claims
- oriented toward engineering review

Avoid generic marketing language. Prefer measurable, operational phrasing such as:

- request datasheet
- review integration path
- compare offer levels
- confirm compatibility
- contact engineering

---

## Shared Content Model

Create or extend a structured content source so page copy is data-driven where it makes sense.

Recommended content groups:

- `homeProofPoints`
- `productDetails`
- `solutionMatrix`
- `faqItems`
- `comparisonRows`
- `implementationStages`
- `resourceItems`
- `caseStudySummaries`
- `newsHighlights`

Each group should be simple enough for pages to render without custom logic in every file. The data should live in a small, predictable set of modules, with `src/content/site.ts` remaining the primary entry point if the structure stays manageable.

Rules:

- Keep content arrays typed where practical.
- Avoid duplicating the same copy across multiple routes.
- Put canonical descriptions in one place and derive page sections from them.

---

## Existing Page Updates

### Homepage

The homepage should become a clearer evaluation landing page.

Add or expand:

- Hero subcopy that explains who the site is for
- A "Why RoboSkin" section with 3 to 4 engineering benefits
- A "How it works" section that explains the sensing stack in plain language
- A deployment path section that shows evaluation, pilot, and integration steps
- A stronger FAQ or objections section
- A final CTA that pushes to engineering or datasheet requests

Keep the current product strip and use-case sections, but add more specificity:

- which product fits which stage
- what each offer includes
- what the buyer gets next

### Products

Turn the products page into a compact catalog with more buyer support.

Add:

- a short "who should start here" intro under each offer
- supported use cases or robot types
- integration notes
- key specs or technical bullets
- a comparison cue that points users to the new comparison page

### Solutions

Make the solutions page more decision-oriented.

Add:

- a problem / impact / recommended path structure
- a deployment fit note for each solution
- a "start here" CTA that varies by solution type
- links to implementation and comparison pages

### Technology

Expand the technology route into a full stack explanation.

Add:

- sensing layer details
- signal processing summary
- materials and form factor guidance
- integration workflow
- a simple diagram or stacked layout if it improves scanability

### Resources

Transform resources into a more useful technical center.

Add:

- datasheet request tiles
- integration guide request tiles
- SDK access request tiles
- benchmark or methodology notes
- availability status for each item

### About

Add content that answers why the company exists and how it works with customers.

Include:

- company positioning
- engineering philosophy
- who the site serves
- a short collaboration model section

### FAQ

Expand the FAQ with practical buyer questions:

- what is the first step
- what data is available publicly
- how integration support works
- what custom programs include
- how to request technical review

### Research, Case Studies, and News

These routes should provide more depth without overpromising.

Add:

- a stronger index layout
- featured summaries
- category or topic grouping
- clearer metadata and summary text

The tone should remain credible and cautious, especially for research-related copy.

### Contact

Keep the form behavior intact, but add supporting content around it:

- what details to include
- what happens after submission
- which request types map to which use cases

---

## New Pages

### Comparison

Purpose:

- help users choose between the sensor array, developer kit, and custom integration program

Content blocks:

- feature comparison table
- best-fit guidance
- integration effort notes
- CTA to the right request flow

### Implementation

Purpose:

- show the deployment journey from evaluation to pilot to production

Content blocks:

- stage 1: evaluation
- stage 2: pilot
- stage 3: integration
- stage 4: deployment
- expected inputs and outputs at each stage

### Downloads

Purpose:

- serve as a central request hub for technical material

Content blocks:

- datasheets
- integration docs
- benchmark notes
- SDK access
- request-only items

If needed, downloads can be implemented as gated request cards instead of literal files.

---

## Page Behavior

All pages should preserve the current product-brand look:

- dark technical surfaces
- one main accent color
- strong typography hierarchy
- structured cards and sections
- minimal decorative motion

The content expansion should improve readability, not introduce visual clutter.

Specific behavior rules:

- Use compact cards for data-heavy sections.
- Avoid repeated CTA spam.
- Keep one primary CTA and one secondary CTA per major section where possible.
- Ensure new content still works on mobile with clean stacking.

---

## Navigation and Routing

Update navigation to surface the new content hubs where useful:

- `comparison`
- `implementation`
- `downloads`

Do not overload the top nav with too many items. If needed, place one or more of the new pages in the footer or secondary navigation while keeping the main top-level route list focused.

Update the sitemap if new public pages are added.

---

## Copy and Claims Policy

This site should stay disciplined about claims.

Rules:

- Do not invent performance figures, partnerships, certifications, or customer names.
- Use public-facing copy that can be supported by the product position.
- Label request-only assets clearly.
- Prefer "contact engineering" when technical validation is needed.

Where exact numbers are unavailable, use descriptive language rather than placeholder metrics.

---

## Acceptance Criteria

- The homepage has more depth and clearer buyer guidance.
- Product and solution pages explain fit, not just features.
- The resources area feels like a real technical content center.
- New pages help users compare offers and understand implementation.
- Content is centralized enough to avoid copy drift.
- The site still feels coherent and restrained, not noisy or promotional.
- No unsupported claims are introduced.

---

## Testing and Review

Validate the expansion with:

- `npm run lint`
- `npm run build`
- manual desktop review of home, products, solutions, resources, and the new pages
- manual mobile review of the new content blocks and navigation

Review checklist:

- content is not duplicated unnecessarily
- CTAs point to the correct request flows
- new pages are linked from visible entry points
- sitemap and metadata remain consistent
- layouts remain readable at common viewport sizes

