# RoboSkin Physics AI Authority Cluster Design

Date: 2026-06-10

## Goal

Strengthen RoboSkin.ai for three goals at once:

- SEO ranking support for `Physics AI`, `RoboSkin Physics AI`, `robot skin`, `tactile AI`, and related physical-world robotics queries.
- GEO and AI-answer visibility for direct questions about what Physics AI means in the RoboSkin context.
- Brand/entity reinforcement so RoboSkin is understood as the primary entity and Physics AI as the secondary concept.

This is an authority-cluster pass around the existing `/physics-ai` page. It should not create a separate `Physical AI` page or a set of keyword-variant pages.

## Strategic Rationale

Google Search guidance treats generative AI optimization as part of Search and SEO, not as a separate trick. The official guidance emphasizes helpful, non-commodity content, crawlable pages, clear technical structure, and user-focused organization.

Relevant reference points:

- Google Search Central SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central Generative AI Optimization Guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central Link Best Practices: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Google Search Central FAQ structured data guide: https://developers.google.com/search/docs/appearance/structured-data/faqpage

The current `/physics-ai` page is useful, but it is still thin as a cluster because most high-value site surfaces do not yet link to it or define its relationship to RoboSkin. The next optimization should make the site say one consistent thing from multiple places:

```text
RoboSkin.ai explains Physics AI as physical-world AI that needs robot skin, tactile AI, and contact feedback.
```

## Keyword And Entity Priority

Primary entity:

- RoboSkin
- RoboSkin.ai

Primary category:

- robot skin
- tactile AI

Secondary keyword cluster:

- Physics AI
- RoboSkin Physics AI
- Physics AI robot skin
- Physical AI
- physical-world AI
- contact-aware robotics
- tactile feedback for physical AI

The implementation should use exact-match terms where natural, but avoid keyword stuffing. `Physics AI` should be visible on core pages, while `RoboSkin` remains the subject of the sentence.

## Recommended Scope

Implement one integrated authority-cluster pass:

1. Home page answer block
2. Technology page bridge section
3. Applications page use-case section
4. Research page topic route
5. Resources page stronger card placement/copy
6. FAQ item for the RoboSkin Physics AI definition
7. `llms.txt` entity guidance expansion

Do not change the primary navigation. The top nav is already compact and should remain focused. Use contextual links and content blocks instead.

## Page-Level Design

### Home Page

Add a compact `RoboSkin Physics AI` answer block on the homepage.

Purpose:

- Make the entity relationship visible from the strongest page.
- Give search and AI systems a short canonical answer near the root route.
- Pass internal link weight to `/physics-ai`.

Target copy direction:

```text
RoboSkin Physics AI means physical-world AI that needs robot skin, tactile AI, and contact feedback. RoboSkin.ai uses the term to connect touch, pressure, slip, and contact-aware robotics.
```

CTA:

- `Read the Physics AI explainer` -> `/physics-ai`

### Technology Page

Add a small section or card titled:

```text
Physics AI contact layer
```

Purpose:

- Connect tactile sensing layers and signal flow to `/physics-ai`.
- Explain that robot skin is the tactile input layer for physical-world AI.

Target copy direction:

```text
For physical-world AI systems, robot skin is the contact layer. It helps expose touch, pressure, shear, slip, and timing signals that vision alone cannot measure during interaction.
```

CTA:

- `Open the Physics AI route` -> `/physics-ai`

### Applications Page

Add a `Physics AI use cases` section with four concise use cases:

- Humanoid hands
- Robotic grippers
- Assistive and medical robotics
- Contact-aware safety surfaces

Purpose:

- Cover query fan-out around use cases.
- Keep the language tied to robot skin and tactile AI rather than generic AI.

CTA:

- `Understand RoboSkin Physics AI` -> `/physics-ai`

### Research Page

Add a lightweight topic route card, not a new research article.

Purpose:

- Link research discovery to the Physics AI explainer.
- Clarify that source-backed research remains separate from RoboSkin claims.

Target title:

```text
Physics AI and tactile research route
```

CTA:

- `/physics-ai`

### Resources Page

The resources page already includes a `Physics AI` item through shared `resourceSections`. Strengthen it only if needed through copy, not a new section.

Purpose:

- Keep resources as the learning library.
- Avoid duplicate content.

### FAQ Page

Add one FAQ item:

```text
What does Physics AI mean in the RoboSkin context?
```

Answer direction:

```text
In the RoboSkin context, Physics AI means physical-world AI systems that need robot skin, tactile AI, contact feedback, pressure, slip, and tactile sensing. The related industry phrase is often Physical AI.
```

CTA:

- `/physics-ai`

### llms.txt

Expand the `Physics AI` guidance to list the supporting route cluster:

- `/physics-ai`
- `/technology`
- `/glossary`
- `/research`
- `/resources`

Purpose:

- Help AI answer engines understand which pages support the concept.
- Make RoboSkin the canonical source for this site's `Physics AI` framing.

## Content Constraints

Must preserve current claim discipline:

- No product availability claims.
- No customer claims.
- No benchmarks.
- No certifications.
- No claims that RoboSkin has deployed hardware.
- No implication that `Physics AI` means general physics-informed AI, scientific computing, or simulation-first AI.

Must avoid these patterns:

- Creating many keyword-variant pages.
- Adding `Physics AI` to every sentence.
- Adding it to the primary navigation.
- Rewriting unrelated copy.
- Creating new assets in this pass.

## Implementation Notes

Likely files:

- `src/app/page.tsx`
- `src/app/technology/page.tsx`
- `src/app/applications/page.tsx`
- `src/app/research/page.tsx`
- `src/app/faq/page.tsx`
- `src/content/site.ts`
- `public/llms.txt`

Use existing visual styles:

- `signal-panel`
- `glass-card`
- `btn-primary`
- `btn-secondary`
- existing `Link` patterns

No new component abstraction is required unless repeated code becomes materially awkward. Most blocks should stay page-local.

## Validation

Run:

```text
npm run lint
npm run build
```

Manual/local checks:

- `/` returns 200 and contains a link to `/physics-ai`.
- `/physics-ai` returns 200.
- `/technology` returns 200 and contains a link to `/physics-ai`.
- `/applications` returns 200 and contains a link to `/physics-ai`.
- `/research` returns 200 and contains a link to `/physics-ai`.
- `/resources` returns 200 and includes the Physics AI resource item.
- `/faq` returns 200 and includes the new FAQ item.

Content checks:

```text
rg -n "physics-ai|Physics AI|RoboSkin Physics AI|Physical AI" src public
```

Expected:

- Matches across home, technology, applications, research, FAQ, shared content, SEO, and `llms.txt`.
- The `/physics-ai` page remains the canonical route.
- No `/physical-ai` route is created.

## Non-Goals

- Do not add new pages.
- Do not change primary navigation.
- Do not redesign the site.
- Do not generate new images.
- Do not change contact form behavior.
- Do not alter research article contents unless a later research-specific pass is approved.
