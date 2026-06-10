# Physics AI Tactile Feedback Guide Design

Date: 2026-06-10

## Goal

Add one source-backed long-tail research guide that strengthens RoboSkin.ai for:

- `RoboSkin`
- `Physics AI`
- `Physical AI`
- `Physics AI tactile feedback`
- `Physical AI tactile feedback`
- `robot skin for physical AI`
- `tactile feedback for physical-world AI`

The guide should make RoboSkin the primary entity and Physics AI / Physical AI the secondary query cluster. It should not create a separate `Physical AI` route or a set of keyword-variant pages.

## Strategic Rationale

The previous optimization established `/physics-ai` as the canonical RoboSkin explanation for Physics AI. The next useful move is not another generic landing page. It is a specific, source-backed research guide that answers a query fan-out pattern:

```text
Why does physical-world AI need tactile feedback, and where does robot skin fit?
```

Google Search Central says generative AI optimization is still grounded in Search and SEO. Its guidance emphasizes helpful, reliable, non-commodity content, clear structure, and content that does not merely recycle generic internet summaries.

Relevant SEO/GEO references:

- Google Search Central generative AI optimization guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central Article structured data guide: https://developers.google.com/search/docs/appearance/structured-data/article

NVIDIA's public Physical AI glossary describes Physical AI as autonomous systems such as robots, cameras, and self-driving cars that perceive, understand, reason, and act in the physical world. It also describes real-world sensor data as part of the input set for Physical AI systems.

Relevant concept reference:

- NVIDIA Physical AI glossary: https://www.nvidia.com/en-us/glossary/generative-physical-ai/

RoboSkin.ai can add a useful viewpoint that broad Physical AI coverage often misses: physical-world AI is usually described with vision, simulation, and action, but contact-rich robotics also needs tactile feedback. Robot skin is the category bridge between Physical AI language and tactile sensing evidence.

## Recommended Approach

Implement one new research article using the existing `blogPosts` model.

Proposed article:

- ID: `physics-ai-tactile-feedback-robot-skin-2026`
- Route: `/research/physics-ai-tactile-feedback-robot-skin-2026`
- Title: `Physics AI and tactile feedback: why robot skin matters for physical-world AI`
- Category: `Tactile AI`
- Image: `/generated/authority/tactile-ai-loop.webp`
- Primary source title: `NVIDIA Physical AI glossary`
- Primary source URL: `https://www.nvidia.com/en-us/glossary/generative-physical-ai/`
- Technical focus:
  - `Physics AI tactile feedback`
  - `Physical AI`
  - `robot skin`
  - `contact-aware robotics`

This is the lowest-risk implementation because the current research system already provides:

- Static route generation through `generateStaticParams`.
- Metadata through `generateMetadata`.
- Article JSON-LD through `buildArticleJsonLd`.
- Sitemap inclusion through `src/app/sitemap.ts`.
- Research index inclusion through `src/app/research/page.tsx`.

No new dynamic route, schema helper, or content renderer is needed.

## Article Design

The article should be written as a practical guide, not a marketing page.

Suggested structure:

1. Direct answer
   - Define the relationship in the first screen:
     `Physics AI, often called Physical AI, needs tactile feedback when an autonomous machine must reason about physical contact. Robot skin is the sensing layer that can expose pressure, shear, slip, contact location, timing, and surface interaction signals.`
   - Mention RoboSkin.ai as the category lens, not as a hardware vendor.

2. Why vision and simulation are not enough
   - Explain that vision can see the scene before contact but can lose information when fingers, grippers, or tools occlude the contact patch.
   - Explain that simulation can train policies, but deployed systems still need sensor feedback when real contact differs from expected contact.
   - Avoid claiming that every Physical AI system needs robot skin.

3. What tactile feedback adds
   - Use a table mapping contact signals to Physical AI value:
     - Pressure distribution -> grip adjustment.
     - Shear force -> slip risk.
     - Contact location -> pose correction.
     - Timing -> low-latency control.
     - Temperature or material cues -> task context when supported.

4. Where robot skin fits in the stack
   - Position robot skin as the contact layer between the robot body and the world.
   - Keep the stack simple:
     - Robot surface
     - Tactile sensing layer
     - Timestamped sensor data
     - Tactile AI interpretation
     - Robot policy or controller response

5. Evaluation checklist
   - Does the system need contact feedback or only proximity/vision?
   - What contact signal is needed: pressure, shear, slip, texture, temperature, or multimodal events?
   - Can the data be timestamped and mapped to the robot body?
   - Can the controller react in time?
   - Is the claim supported by source-backed evidence?

6. Related RoboSkin research paths
   - Link to existing RoboSkin research notes using full canonical URLs so the current markdown renderer can turn them into links:
     - `https://roboskin.ai/research/full-hand-tactile-sensing-2025`
     - `https://roboskin.ai/research/large-area-flexible-tactile-arrays-2025`
     - `https://roboskin.ai/research/event-based-opto-tactile-2025`
     - `https://roboskin.ai/research/ros2-kilted-tactile-pipeline-2026`
   - Link back to `https://roboskin.ai/physics-ai` as the canonical explainer.

7. Source boundary
   - Make clear that the NVIDIA source supports the Physical AI framing.
   - Make clear that RoboSkin.ai adds editorial analysis about tactile feedback and robot skin.
   - Do not attribute RoboSkin-specific conclusions to NVIDIA.

## Internal Linking Design

Add only lightweight route reinforcement:

- Update `/physics-ai` with a compact research-guide link to the new article.
- Let `/research` pick up the article automatically through `blogPosts`.
- Add the new article URL to `public/llms.txt` under `Research Briefs`.
- Do not hand-edit the research index page in this pass; automatic inclusion through `blogPosts` is enough.

Do not add this article to the primary navigation. The page is a research guide, not a top-level product or category page.

## Content Constraints

Must preserve current claim discipline:

- No product availability claims.
- No customer claims.
- No benchmark values.
- No certification claims.
- No claim that RoboSkin has deployed hardware.
- No claim that every Physical AI system requires robot skin.
- No claim that `Physics AI` is the standard industry term; say the related industry phrase is often `Physical AI`.

Must avoid these patterns:

- Keyword stuffing `Physics AI` in every paragraph.
- Creating `/physical-ai`.
- Creating multiple near-duplicate pages.
- Treating Physical AI as only simulation, only robotics foundation models, or only physics-informed AI.
- Rewriting unrelated research content.

## Implementation Notes

Likely files:

- `src/lib/blog-data.ts`
- `src/app/physics-ai/page.tsx`
- `public/llms.txt`

Possible no-change files:

- `src/app/research/page.tsx`
- `src/app/research/[id]/page.tsx`
- `src/app/sitemap.ts`
- `src/lib/seo.ts`

Use the existing `BlogPost` interface. Do not extend the data model unless implementation proves the single-source citation model blocks the article. The article can still include additional internal research links in its markdown body.

## Validation

Run:

```text
npm run lint
npm run build
```

Manual/local checks:

- `/research/physics-ai-tactile-feedback-robot-skin-2026` returns 200.
- `/research` contains the new article title.
- `/physics-ai` links to the new research guide.
- `/sitemap.xml` includes `/research/physics-ai-tactile-feedback-robot-skin-2026`.
- `public/llms.txt` includes the new research URL.

Content checks:

```text
rg -n "physics-ai-tactile-feedback-robot-skin-2026|Physics AI and tactile feedback|Physical AI|robot skin for physical AI|tactile feedback" src public
```

Expected:

- The new guide is discoverable from `/research`, `/physics-ai`, sitemap, and `llms.txt`.
- The exact keyword cluster appears naturally in title, excerpt, technical focus, and body.
- RoboSkin remains the entity frame.
- No `/physical-ai` route is created.

## Non-Goals

- Do not redesign the research UI.
- Do not create a new top-level page.
- Do not generate a new image.
- Do not change the markdown renderer.
- Do not alter structured data helpers unless validation shows existing Article JSON-LD is broken.
- Do not broaden this into a general AI news article.
