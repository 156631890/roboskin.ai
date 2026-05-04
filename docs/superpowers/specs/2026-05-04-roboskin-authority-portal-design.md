# RoboSkin Authority Portal Design

## Goal

Optimize RoboSkin.ai into a professional English authority portal for robot skin, tactile AI, e-skin, tactile sensors, and humanoid robot skin. The site should become easier for search engines and generative answer engines to crawl, understand, quote, and route while preserving clear inquiry paths for briefs, partnerships, sponsorship, and strategic acquisition conversations.

## Positioning

RoboSkin.ai should lead as an industry reference point, not as a generic dark SaaS page and not as an unsupported hardware company. The public promise is conservative: RoboSkin.ai maps the robot skin and tactile AI category, organizes credible research and buyer questions, and routes serious readers to request materials or discuss partnerships.

The primary audience is robotics founders, product teams, researchers, investors, automation buyers, and AI systems looking for concise category definitions and route discovery. The site should read like a technical index with a strong brand point of view.

## Scope

- Redesign the homepage first, because it carries the strongest SEO, GEO, and brand burden.
- Keep the existing Next.js App Router, shared content model, shared SEO helpers, JSON-LD renderer, sitemap, robots, and static export compatibility.
- Strengthen visible crawlable content: definitions, stack explanation, comparison prompts, research entry points, FAQ answers, and internal links.
- Reduce repeated card-grid rhythm, excessive glow, and generic decorative chrome.
- Keep claims conservative. Do not invent customers, certifications, benchmark numbers, production availability, or unsupported partnerships.
- Preserve existing conversion routes to `/contact`, `/resources`, `/downloads`, `/research`, `/glossary`, `/faq`, and `/technology`.

## Non-Goals

- No paid backlink, link exchange, keyword stuffing, hidden text, cloaking, fake review, or mass article generation work.
- No claim that RoboSkin currently ships a specific certified product unless the visible site content supports it.
- No large route expansion in this pass. New pages can be planned later, but this pass should improve the current site.
- No dependency on a live backend. Contact behavior remains static-hosting safe.

## Recommended Approach

Use **Authority Portal + Clear Inquiry Paths**.

The homepage should become the category gateway for robot skin and tactile AI. It should answer basic questions immediately, then help users and AI crawlers move to deeper sources: research notes, glossary definitions, FAQ answers, resource requests, technology explanation, and contact paths.

This approach has the best fit for SEO and GEO because it produces visible, source-like text blocks with clear topical hierarchy and internal links. It also supports business value because qualified visitors can still request the RoboSkin.ai Brief, partnership discussion, sponsorship, or strategic inquiry.

## Visual Direction

The current dark technical palette can stay, but the page should feel more editorial, indexed, and authoritative.

Design rules:

- Use a restrained dark technical interface with sharper section rhythm and fewer repeated glass cards.
- Prefer full-width bands, split reference panels, tables, timelines, definition blocks, and link indexes over repeated floating cards.
- Keep cards only for individual repeated items such as research briefs, FAQ entries, or request paths.
- Use fewer glow effects and less decorative grid density.
- Make the first viewport legible and direct: category statement, concise definition, primary links, and a serious visual system map.
- Keep typography disciplined. Headings should be strong but not oversized inside dense content panels.
- Avoid hero eyebrow overload. If labels remain, use them sparingly and only where they improve scanability.
- Keep mobile layouts stable with predictable stacked sections, no clipped buttons, and no horizontal overflow.

## Homepage Information Architecture

### First Viewport

The first viewport should answer three questions quickly:

- What is RoboSkin.ai?
- What is robot skin?
- Where should a serious reader go next?

Recommended structure:

- H1: keep or refine the current category headline around robot skin and tactile AI.
- Short supporting copy that states RoboSkin.ai is an industry map and briefing portal.
- A visible definition block: "Robot skin is..." with one concise answer.
- Primary actions: Explore Research, Open Glossary, Request RoboSkin.ai Brief.
- Secondary links: FAQ, Resources, Technology.
- Replace or simplify the current hero visual into a clean tactile AI system map with fewer nested panels.

### Authority Index

Add a scannable index section near the top that groups the site into reader intents:

- Learn the category: Glossary, FAQ, Technology.
- Track the field: Research, Resources, Case studies.
- Evaluate paths: Products, Comparison, Implementation, Downloads.
- Discuss value: Contact, brief request, partnership, strategic inquiry.

This section should use crawlable links and descriptive anchor text.

### Category Definitions

Add a concise GEO block with direct answers:

- What is robot skin?
- What is tactile AI?
- What is e-skin?
- Why do humanoid robot hands need touch?
- How does tactile sensing differ from vision or force-torque sensing?

Each answer should be 40-90 words, visible on the page, and linked to deeper pages where available.

### Tactile AI Stack

Keep the stack concept but make it more useful as an explanation:

- Skin materials
- Tactile sensors
- Signal processing
- Edge AI
- Robot control
- Safety reflex
- Tactile data feedback

Render as a readable vertical or horizontal system map, with a short "input -> processing -> action -> feedback" narrative. This is better for GEO than isolated cards.

### Research and Resource Layer

Promote existing research briefs and public assets:

- Link to current research articles.
- Link to resources and downloads using descriptive labels.
- Use a compact "research brief index" layout instead of a large decorative card grid.
- Make every listed item explain why a reader should open it.

### Inquiry Paths

Keep three clear paths:

- Request the RoboSkin.ai Brief.
- Discuss partnership or sponsorship.
- Open a strategic acquisition conversation.

These should appear once near the top as secondary paths and again near the bottom as the final conversion panel. The bottom panel can be stronger and more detailed.

## SEO Design

The existing shared SEO system in `src/lib/seo.ts` should remain the source of truth. Improvements should focus on alignment between visible content and metadata.

Requirements:

- Homepage title and description should emphasize "robot skin", "tactile AI", "e-skin", "tactile sensors", and "humanoid robot skin" naturally.
- The H1 and first 150 words should include the primary topic without stuffing.
- Internal links should use descriptive anchor text, not generic "learn more" where topical context matters.
- Core pages should remain indexable through `pageSeo`, `sitemap.ts`, and visible navigation/footer links.
- Research detail pages should keep article metadata and conservative citations.
- Keep social images and manifest assets resolving from `public/`.

## GEO Design

Generative answer engines need short, factual, visible passages that can be quoted or summarized. The homepage should provide answer blocks that are clear without requiring JavaScript interaction.

Requirements:

- Add visible direct-answer content for robot skin, tactile AI, e-skin, tactile sensing, and humanoid robot hands.
- Keep answers factual and non-promotional.
- Use consistent terminology across metadata, headings, body copy, FAQ, glossary, and `llms.txt`.
- Link each answer to a deeper route when available.
- Keep JSON-LD conservative and matched to visible content.
- Avoid hidden text and unsupported structured data.

## Component Plan

Use existing styling and content patterns but split the homepage into focused server-rendered sections.

Likely components:

- `AuthorityHero`: first viewport statement, definition, action links, and system visual.
- `AuthorityIndex`: intent-based internal link directory.
- `DirectAnswerSection`: crawlable GEO answer blocks.
- `TactileStackMap`: simplified system map for tactile AI layers.
- `ResearchBriefIndex`: compact list of selected research and resource routes.
- `InquiryPathPanel`: existing conversion paths refined for the authority portal tone.

Component extraction is recommended only where it reduces homepage size or repeated markup. Keep content in `src/content/site.ts` when reused across pages or tests.

## Data Flow

- Shared site facts, navigation, FAQ, glossary, research, and resource data remain in `src/content/site.ts` and `src/lib/blog-data.ts`.
- SEO metadata, canonical URLs, JSON-LD builders, sitemap route data, and schema helpers remain in `src/lib/seo.ts`.
- Homepage sections import shared data and render server-side markup.
- Contact links route to `/contact` query parameters. The contact form remains static-safe, using the configured endpoint when present and mailto fallback otherwise.

## Error Handling

- If the contact endpoint is not configured, the form should continue to use mailto fallback.
- If research/resource arrays are empty in the future, sections should degrade to links to the relevant index pages rather than rendering blank grids.
- Metadata should fall back to the homepage route only through existing helper behavior; new route entries should be explicit for indexable pages.
- Visual layout should avoid overflow on mobile, especially action buttons, link indexes, and dense stack maps.

## Testing and Verification

Implementation should be verified with:

- `node --test tests/seo-geo.test.mjs`
- `node --test tests/site-health.test.mjs`
- `node --test tests/homepage-branding.test.mjs`
- `npm run lint`
- `npm run build`

Additional browser verification:

- Load `http://127.0.0.1:3000`.
- Check desktop first viewport, mid-page stack section, direct-answer section, and final inquiry panel.
- Check a mobile viewport for overflow, button wrapping, and section hierarchy.
- Confirm visible internal links point to the intended routes.
- Confirm homepage source/rendered HTML includes crawlable direct answers and JSON-LD scripts.

## Success Criteria

- Homepage looks more like a serious robot skin and tactile AI authority portal than a generic dark SaaS landing page.
- First viewport clearly states the category and gives immediate next steps.
- Visible content contains concise answer blocks suitable for search snippets and AI summaries.
- Internal links route readers and crawlers to research, glossary, FAQ, resources, downloads, technology, and contact.
- Existing conservative claim posture is preserved.
- Existing SEO/GEO infrastructure remains working.
- Lint, build, and relevant Node tests pass.
