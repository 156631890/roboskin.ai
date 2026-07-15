# RoboSkin Authority and News Growth Design

## Status

Approved in conversation on 2026-07-15.

## Goal

Increase qualified organic discovery for RoboSkin.ai while preserving its position as an independent, English-language research and news resource for robot skin, tactile AI, e-skin, tactile sensing, and Physical AI.

The implementation must expand timely keyword coverage, improve answer-engine extractability, strengthen the site's original research asset, and prepare legitimate external outreach. It must not create thin synonym pages, fabricate authority signals, or reposition the site as a hardware vendor.

The existing 90-day evaluation targets remain:

- At least 15,000 impressions in a rolling 28-day Google Search Console window.
- At least 150 clicks in the same window.
- At least 1.5 percent click-through rate.
- At least three legitimate external referring domains.
- One canonical apex host with no new `www` signal split.

These are evaluation targets, not ranking guarantees.

## Audited Baseline

The baseline was collected from the clean local repository, production, and the authenticated `sc-domain:roboskin.ai` Google Search Console property on 2026-07-15. Search Console data was current through 2026-07-12.

### Search performance

| Window | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| Rolling 28 days | 60 | 6,632 | 0.9% | 8.9 |
| Three months | 82 | 7,142 | 1.1% | 8.9 |

Compared with the 2026-07-10 rolling-28-day baseline of 48 clicks and 5,240 impressions, clicks increased by 25 percent and impressions by approximately 26.6 percent. CTR and average position did not improve.

### High-impression opportunities

| Page | Clicks | Impressions | Current decision |
| --- | ---: | ---: | --- |
| `/research/dream-tac-tactile-world-action-model-2026` | 0 | 650 | Preserve the 2026-07-10 title experiment; add relevant inbound internal links. |
| `/research` | 0 | 504 | Strengthen discovery from new news and index content. |
| `/research/single-material-soft-robotic-skin-2025` on historical `www` | 0 | 305 | Keep the permanent redirect and allow canonical consolidation to continue. |
| `/research/freetacman-robot-free-visuotactile-data-collection-2025` | 0 | 226 | Support from the RCT news and dataset cluster. |
| `/research/robot-skin-papers` | 0 | 225 | Support from all three new research records and the news hub. |

The latest 28-day query report also showed 59 impressions and two clicks for `tactile ai`, 15 impressions and zero clicks for `freetacman`, and 15 impressions and zero clicks for `humanoid robot skin`. The `taktile company overview` query is irrelevant brand confusion and will not be targeted.

### Indexing and authority

- Google reported 64 indexed pages and 22 known but unindexed pages.
- Google Search Console reported zero external links.
- Production returned a permanent apex redirect for the `www` root.
- The production sitemap exposed 66 URLs.
- The current local baseline passed all 40 tests and ESLint.
- The local worktree was clean before this design document was added.

The primary constraint is no longer missing baseline SEO infrastructure. It is low CTR on existing impressions, a stale public-news cadence, and no measured external authority.

## Selected Approach

Use an authority growth flywheel with four connected parts:

1. Publish three timely, source-backed news analyses.
2. Extend the structured RoboSkin Tactile Research Index from seven to ten records.
3. Improve internal discovery and keyword ownership without rewriting recent title experiments.
4. Prepare a targeted external-outreach package without sending messages or posting externally.

The implementation retains the static Next.js architecture and existing editorial identity. It does not add a CMS, database, runtime search service, or broad visual redesign.

## Content and Keyword Architecture

### News batch

Publish three English news analyses from verified primary research sources.

| Working route | Primary query cluster | Supporting routes | Primary source |
| --- | --- | --- | --- |
| `/news/touchworld-predictive-reactive-tactile-foundation-model` | `tactile foundation model`, `predictive tactile control`, `tactile world model` | `/tactile-ai`, Dream-Tac, `/research/robot-skin-papers` | `https://arxiv.org/abs/2607.07287` |
| `/news/rct-touch-vision-language-dataset-tactile-generalization` | `tactile dataset`, `touch vision language dataset`, `tactile generalization` | FreeTacMan, `/guides/physical-ai-touch-data`, `/research-index` | `https://arxiv.org/abs/2606.31694` |
| `/news/me-sofs-soft-force-sensor-touch-to-action` | `mechanical soft force sensor`, `soft robot tactile sensing`, `touch to action sensor` | `/applications/soft-robotic-skin`, `/guides/tactile-feedback-for-physical-ai`, `/research-index` | `https://www.science.org/doi/10.1126/sciadv.aeb8052` |

Each article must contain:

- A 60-90 word answer-first opening.
- Visible publication and modification dates.
- Source findings separated from RoboSkin analysis.
- A compact table of source-reported metrics or architecture facts.
- Engineering implications for robot skin or tactile AI.
- An explicit limitations and evidence-boundary section.
- Two to four contextual internal links.
- Direct links to the primary source and any necessary institutional source.
- Consistent visible and structured authorship using `RoboSkin.ai Editorial Team`.

The article `date` must be the actual RoboSkin.ai publication date and must not be backdated to the source release. The source publication or preprint date appears separately in the visible source-findings section.

Word count is not an acceptance criterion. Completeness, source accuracy, useful differentiation, and clear evidence boundaries are.

### Keyword ownership

Add the three clusters to `docs/seo/keyword-query-matrix.md` before publishing the content.

Each news route owns its exact timely intent. Evergreen pages remain the canonical owners of broader concepts:

- `/tactile-ai` owns the general `tactile AI` concept.
- `/guides/physical-ai-touch-data` owns the general robot touch-data workflow.
- `/applications/soft-robotic-skin` owns the broad soft robotic skin application intent.
- `/research/robot-skin-papers` owns the research-navigation intent.

No new page may be created for spelling variants or close synonyms. Supporting pages use descriptive internal anchors to the single owning route.

### Existing CTR experiments

Do not perform a second title or meta-description rewrite on Dream-Tac, FreeTacMan, the single-material skin brief, or the papers route in this release. Their prior treatment was deployed on 2026-07-10, while the latest Search Console data ends on 2026-07-12.

This release may add contextually relevant inbound links to those pages. A second snippet decision requires at least one complete 7-14 day crawl and measurement window after the prior deployment.

## News Hub and Discovery

Upgrade `/news` from a compatibility surface to the active RoboSkin news hub.

- Give the page a clear research-news title, description, answer-first introduction, and visible category framing.
- Add `News` as a primary navigation destination and update repository route documentation accordingly.
- Feature the newest items on the homepage and link the hub from Research and Resources.
- Keep news cards statically rendered and crawlable without client-side interaction.
- Preserve all four existing news URLs.
- Generate sitemap entries, RSS items, and NewsArticle markup from the shared news data.

The hub must not present RoboSkin.ai as the originator of the cited research.

## GEO and Structured Answers

GEO work is based on visible answer quality and stable entities, not undocumented AI-specific markup.

- Important answers remain in visible HTML.
- Page titles, H1s, openings, authors, dates, and JSON-LD must agree.
- Research names, institutions, datasets, sensor architectures, and reported metrics use the source's terminology.
- Quantitative claims include nearby source attribution and do not imply deployment readiness unless the source demonstrates it.
- FAQs answer real reader questions and are not used to repeat keywords mechanically.
- `NewsArticle`, `TechArticle`, `Dataset`, and `ItemList` markup mirror visible content.
- `llms.txt` acts only as discovery guidance and contains canonical public routes.

No personal expert identity, affiliation, award, customer, or credential may be invented.

## Research Index Expansion

Extend the first edition of the RoboSkin Tactile Research Index from seven to ten records using the three new source-backed items.

Each new record must include:

- Stable ID and public source URL.
- Paper or project title, year, and institution or publisher.
- Sensor or model principle.
- Materials or sensing architecture where applicable.
- Measurement or data modalities.
- Robot location or form factor.
- Data output or software interface.
- Application direction.
- Source-reported metrics with attribution.
- Evidence level and explicit limitations.
- Last editorial review date.

Add a visible `July 2026 research update` section to `/research-index` comparing TouchWorld, RCT, and ME-SOFS by sensing or model role, data type, demonstrated task, evidence level, and main limitation.

The page, CSV, and JSON representations must be generated from the same records and expose the same ten identities. The update section must link to the three news analyses and their primary sources.

## External Outreach Package

Prepare outreach materials under `docs/seo/outreach/`.

The package contains:

- An English description of the RoboSkin Tactile Research Index and its methodology.
- At least 12 screened outreach targets across paper authors or labs, robotics newsletters, research-resource lists, and relevant technical communities.
- For each target: public contact or submission entry point, relevance, recommended angle, target asset, and status field.
- Separate templates for research inclusion and correction invitations, newsletter/resource suggestions, and community sharing.
- A concise correction invitation explaining that RoboSkin.ai is an independent editorial resource.

The implementation does not send email, submit forms, post to communities, buy links, exchange links, or fabricate endorsements.

## Code Boundaries

Keep changes within the existing ownership model:

- `src/lib/news-data.ts`: three new source-backed news records.
- `src/lib/research-index.ts`: three normalized index records and focused supplemental fields.
- `src/app/news/page.tsx`: active news-hub metadata and visible content.
- `src/components/Navigation.tsx` and `src/content/site.ts`: discoverable News navigation using existing patterns.
- `src/app/page.tsx`, `src/app/research/page.tsx`, and `src/app/resources/page.tsx`: bounded contextual discovery links where existing structures require them.
- `src/content/seo-topic-pages.ts`: only contextually necessary supporting links; no synonym pages.
- `public/llms.txt`: new canonical discovery routes.
- `docs/seo/keyword-query-matrix.md`: query ownership.
- `docs/seo/search-console-monitoring.md`: the 2026-07-15 baseline and future checkpoints.
- `docs/seo/outreach/`: preparation assets only.
- `README.md`: `/news` is no longer described as a legacy compatibility route.

Sitemap, RSS, CSV, JSON, and structured data continue to use existing generation paths. Do not duplicate full article text in the research-index module.

## Data Flow

The publication flow is:

`verified primary sources -> news records and normalized index records -> visible pages and metadata -> sitemap, RSS, CSV, JSON, and llms.txt -> tests and export checks -> preview -> production verification -> IndexNow for changed URLs -> 7/28/90-day review`

Discovery submission is blocked until production verification succeeds.

## Test-Driven Implementation

Add failing tests before implementation for:

1. The three new news IDs, routes, primary sources, dates, and keyword ownership.
2. Answer-first sections, evidence boundaries, bounded internal links, visible authorship, and source links.
3. Valid NewsArticle data matching visible title, author, dates, image, and canonical URL.
4. Ten matching research-index identities across the page, CSV, and JSON.
5. The visible July 2026 comparison update and Dataset/ItemList consistency.
6. News-hub navigation and crawlable discovery from the approved site surfaces.
7. Canonical apex URLs in sitemap, RSS, structured data, `llms.txt`, and generated exports.
8. Preservation of all protected production URLs and the four existing news routes.

The final local gate is:

```powershell
npm test
npm run lint
npm run build
npm run verify:export
```

Production verification must check the full sitemap, protected URL inventory, new news pages, ten-record research index, RSS media type, apex canonicals, JSON-LD parsing, and permanent `www` redirects.

## Failure Handling

Block release when any of the following occurs:

- A protected route disappears or becomes a 404 without an approved permanent redirect.
- A new article lacks a primary source or overstates a source finding.
- Visible authorship, dates, titles, or metrics disagree with structured data.
- The index page, CSV, and JSON disagree on record identity or count.
- Sitemap, RSS, structured data, or `llms.txt` emits a `www` or preview hostname.
- A news page cannibalizes an existing evergreen query owner.
- Tests, lint, build, export verification, preview verification, or production verification fail.

If production verification fails, do not submit IndexNow. Keep the last verified production deployment active while diagnosing the failed build.

## Measurement

### Day 7

- Confirm all three news URLs are discovered or indexed.
- Confirm the new routes appear in sitemap and RSS with apex canonicals.
- Check whether the ten-record index is recrawled.
- Check the prior CTR experiment pages without rewriting them prematurely.

### Day 28

- Record impressions, clicks, CTR, and average position for each new news route.
- Record query data for the three new clusters.
- Compare branded and non-branded click contribution.
- Check whether the research index earns impressions, citations, or external links.
- Decide whether a second CTR treatment is justified for the prior priority pages.

### Day 90

- Evaluate the rolling-28-day targets of 15,000 impressions, 150 clicks, 1.5 percent CTR, and three legitimate referring domains.
- Record outreach activity separately from earned links; a prepared or sent message is not counted as a referring domain.

## Out of Scope

- A CMS, database, or automated news scraper.
- Bulk AI-generated news or synonym pages.
- A vendor, product-catalog, or lead-generation repositioning.
- Automatic external email, posting, directory submission, or backlink acquisition.
- Paid links, link exchanges, fake citations, invented experts, or unsupported claims.
- Broad visual redesign or unrelated refactoring.

## Acceptance Criteria

- Three approved, source-backed news analyses are public and internally discoverable.
- `/news` functions as the active news hub and is present in primary navigation.
- The new keyword clusters have one documented owner each.
- Existing 2026-07-10 title experiments are not overwritten prematurely.
- The research index exposes the same ten records in visible HTML, CSV, and JSON.
- The July 2026 comparison update is visible, source-backed, and linked to the new analyses.
- NewsArticle, Dataset, and ItemList markup parse and match visible content.
- Sitemap, RSS, `llms.txt`, canonical tags, and exports use apex URLs.
- At least 12 screened outreach targets and reusable English templates are prepared without external transmission.
- All protected URLs and existing news pages remain intact.
- Tests, lint, build, export verification, preview verification, and production verification pass before discovery submission.
- IndexNow runs only after successful production verification.
- Day 7, Day 28, and Day 90 checks are documented without presenting rankings or backlinks as guaranteed outcomes.
