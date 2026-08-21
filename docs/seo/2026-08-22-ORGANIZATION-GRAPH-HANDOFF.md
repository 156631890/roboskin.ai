# RoboSkin.ai organization graph handoff — 2026-08-22

## Outcome

This release adds the first normalized research-organization layer to RoboSkin.ai without creating thin entity pages or expanding the primary navigation.

- Public directory: `https://roboskin.ai/organizations`
- Machine graph: `https://roboskin.ai/knowledge-graph.json`
- Model directory: `https://roboskin.ai/robot-foundation-models`
- LLM snapshots: `https://roboskin.ai/llms.txt` and `https://roboskin.ai/llms-full.txt`

## Verified graph state

Knowledge graph version: `1.1.0`

| Measure | Count |
| --- | ---: |
| Knowledge entities | 79 |
| Existing non-organization research entities | 67 |
| Verified organizations | 12 |
| Deduplicated primary and official sources | 115 |
| Total edges | 162 |
| `supportedBy` edges | 137 |
| `benchmarkedBy` edges | 5 |
| Model-organization edges | 20 |
| `developedBy` edges | 5 |
| `coDevelopedBy` edges | 2 |
| `contributedBy` edges | 13 |

The 12 normalized organizations are Google DeepMind, Google Research, Technische Universität Berlin, Stanford University, University of California Berkeley, Toyota Research Institute, Physical Intelligence, Massachusetts Institute of Technology, Carnegie Mellon University, NVIDIA, Meta Fundamental AI Research, and the University of Washington.

## Evidence rules

Organization identity and model relationship evidence remain separate:

- An official organization page proves the public identity and official URL.
- An official provider model page or release can support `developedBy`.
- A joint primary paper can support `coDevelopedBy`.
- A paper or project-page author affiliation supports only `contributedBy`.
- A relationship does not establish ownership, funding, endorsement, current employment, legal-entity status, or affiliation with RoboSkin.ai.
- Dream-Tac still has no formal organization node because the current record does not publish a verified organization entity.

Every model-organization edge carries relationship evidence source IDs. The graph validator rejects missing, duplicate, unknown, or model-unattached relationship sources.

## SEO and GEO implementation

- `/organizations` is server-rendered static HTML with one H1, self-canonical metadata, breadcrumbs, visible official sources, stable entity anchors, and explicit evidence boundaries.
- JSON-LD includes `WebPage`, `BreadcrumbList`, `ItemList`, `Organization`, `CollegeOrUniversity`, and connected `CreativeWork` nodes.
- Strong model-provider relationships use normalized `creator` references; source-affiliation relationships use normalized `contributor` references.
- The model directory links all 20 source-listed organization occurrences to the normalized organization anchors.
- Research and research-index pages provide contextual internal links to the directory.
- The route is in the main XML sitemap and protected URL contract, but is intentionally absent from the already compact primary navigation and footer.
- `llms-full.txt` now exposes organization identity, aliases, official URLs, connected models, relationship type, relationship evidence, and evidence boundaries.

## Verification completed before release

- 90 Node tests
- ESLint
- TypeScript compiler
- Next.js static production build
- Export contract verification
- Desktop browser smoke test at 1920 × 911
- Mobile browser smoke test at 390 × 844
- No horizontal overflow on the organization or model directory page
- 20 visible organization links and 10 stable model anchors on the model directory

## Post-deployment Search Console actions

1. Resubmit `https://roboskin.ai/sitemap.xml` only after production serves the new release.
2. Request URL inspection for `https://roboskin.ai/organizations`.
3. Reinspect `https://roboskin.ai/robot-foundation-models` because its structured organization references changed.
4. Do not submit fragment URLs separately; Google indexes the canonical page, not each `#organization-*` anchor as an independent document.
5. After 7, 14, and 28 days, compare impressions, clicks, average position, and queries for the two pages. Do not attribute movement to this release without Search Console evidence.

## Next knowledge-graph node

The next high-value expansion should be verified robot and embodiment entities, not another batch of generic articles. Start with robots already named in the model records and only add a node after checking the official manufacturer or project page and the primary model source.

Candidate relationship design:

```text
model --evaluatedOn--> robot
model --trainedAcross--> embodiment family
robot --usesSensor--> tactile sensor
paper --evaluates--> model or robot
```

Before implementation, verify whether each source proves evaluation, training, demonstration, compatibility, or only a marketing appearance. Those claims must remain different relations.
