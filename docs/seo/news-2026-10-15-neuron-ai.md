# Neuron AI evidence review — October 15, 2026

## Publication scope

The user explicitly requested organizing the announcement and papers and publishing to the existing RoboSkin site. This change adds one English evidence review at `/news/neura-neuron-ai-touch-memory-pla`, using the established News template. It does not create a Neuron AI paper record: no public Neuron AI manuscript was located in the reviewed official pages and targeted arXiv/web searches.

Base: `main` at `28bdc27f068c8a72acacfe31bf7fe2803c60c89a`. Branch: `codex/neuron-ai-evidence-20261015`. No existing Neuron AI entry was found in the News data or research index.

## Sources and editorial decisions

Sources checked on October 15, 2026:

- [NEURA announcement, October 14](https://neura-robotics.com/neura-robotics-introduces-neuron-ai/): announcement date, data sources, five-embodiment claim, skill deployment and future laundry-handling demo. The October 20–22 event remains future; an eleven-minute handling sequence is not an eleven-minute wash-and-dry cycle.
- [Official Neuron AI description](https://neura-robotics.com/neuron-ai/): modalities, temporal context and on-robot inference claims. No measured latency or publicly reproducible comparison was verified.
- [OpenVLA](https://arxiv.org/abs/2406.09246): independent background on a documented, open VLA model; not a Neuron AI component or matched performance comparison.
- [MimicTouch](https://arxiv.org/abs/2310.16917): independent background on tactile demonstrations and online residual reinforcement learning. Dates distinguish first submission from later revision.
- [DexTouch-WM](https://arxiv.org/abs/2609.20649): independent background on human-to-robot tactile world modeling; prediction quality is kept separate from policy success.

The article separates manufacturer statements, the limits of this source review, independent papers, original analysis and an unperformed evaluation proposal. It does not assert model superiority, parameter counts, dataset size, tactile density, commercial availability, internal architecture or continuous online learning for Neuron AI. Lack of a located public artifact is not framed as proof that no internal research exists.

## Content and discovery

- Unique intent: understand Neuron AI's tactile/memory claims and identify the missing evidence needed for an engineering decision.
- Existing News template supplies self-canonical, article metadata, byline, publication and source dates, `NewsArticle`, `BreadcrumbList`, related resources and source links.
- Existing data pipelines include the article in News, homepage research flow, RSS, sitemaps and agent-readable Markdown.
- Internal links connect the article to VLA, visuo-tactile, Physical AI touch, robot learning, world models and the existing DexTouch-WM review.
- Original 1200 × 675 SVG and PNG explain observations, temporal context, action and evaluation questions. Alt text and caption explicitly identify editorial artwork; it is not a product photograph or architecture disclosure.

## Validation and release

- Local required quality gate passed: `npm test` (255/255), `npm run lint`, `npm run build` (214 static pages, 199 agent Markdown representations), and `npm run verify:export` (189 sitemap URLs, 193 protected URL entries, 194 graph entities, 30 research-index records, 50 RSS items).
- The first export verification identified the new URL as missing from the protected URL contract. Added the new article to that manifest without changing verification logic; the complete export and on-page audit then passed.
- Targeted HTML checks passed: one H1, self-canonical, indexable robots, unique 61-character title and 155-character description, `NewsArticle`/`BreadcrumbList`, three tables, all three independent paper links, correct social image and presence in homepage, News, both sitemaps and RSS.
- The 1200 × 675 image was rendered and visually inspected. Future-event and unperformed-experiment qualifiers were checked in the exported page.
- Production deployment and live acceptance: pending.
- No search-engine indexing or ranking outcome is claimed.
