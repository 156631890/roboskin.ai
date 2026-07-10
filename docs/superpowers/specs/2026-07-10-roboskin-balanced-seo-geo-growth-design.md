# RoboSkin Balanced SEO and GEO Growth Design

## Status

Approved in conversation on 2026-07-10.

## Goal

Grow RoboSkin.ai as an independent, English-language robot skin research publication for robotics researchers and engineers.

The first 90-day evaluation target is:

- At least 15,000 impressions in a rolling 28-day Google Search Console window.
- At least 150 clicks in the same window.
- At least 1.5 percent click-through rate.
- At least three legitimate external referring domains.
- One canonical host with no ongoing `www` and apex signal split.

These are evaluation targets, not ranking guarantees.

## Product Position

RoboSkin.ai remains an independent information resource. It is not presented as a hardware vendor, product catalog, or procurement channel.

The primary audience is global, English-speaking robotics researchers and engineers. Content should help them understand research papers, sensor architectures, data interfaces, engineering limits, and the relationship between robot skin and tactile AI.

Public authorship uses the institutional identity `RoboSkin.ai Editorial Team`. The site will not publish a personal editor identity. Institutional trust must therefore come from consistent authorship, source attribution, editorial methods, corrections, revision history, and accurate organization markup.

## Audited Baseline

The baseline was collected from the local repository, the production deployment, and the authenticated `sc-domain:roboskin.ai` Google Search Console property on 2026-07-10.

### Search Performance

Rolling 28-day performance through 2026-07-07:

- 5,240 impressions.
- 48 clicks.
- 0.9 percent CTR.
- 8.9 average position.

Three-month performance:

- 5,610 impressions.
- 60 clicks.
- 1.1 percent CTR.
- 8.9 average position.

Most recorded impressions arrived in the latest 28-day window, so the site is gaining discovery but converting search appearances poorly.

### Priority Pages

The first optimization batch is limited to pages with meaningful impressions and zero or very low clicks:

| Page | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: |
| Dream-Tac research brief | 556 | 0% | 7.0 |
| Single-material soft robotic skin, combined `www` and apex | 528 | 0% | 8.2-9.5 |
| Research index | 303 | 0% | 11.6 |
| FreeTacMan research brief | 193 | 0% | 7.8 |
| Robot skin papers route | 176 | 0% | 11.0 |
| Sparsh-X research brief | 142 | 0% | 7.2 |
| GenForce research brief | 126 | 0% | 6.8 |

The Dream-Tac page is primarily appearing for exact and near-exact paper-title queries, including variants of `Dream-Tac: A Unified Tactile World Action Model for Contact-Rich Robot Manipulation` and arXiv identifier queries.

### Indexing and Authority

- 63 pages are indexed.
- 21 known URLs are not indexed, but most are redirects, alternate canonicals, old static assets, or expected parameter variants.
- The meaningful discovered-but-not-indexed pages include `/applications`, `/faq`, `/glossary`, `/research/graphene-liquid-metal-3d-force-2026`, and `/research/temperature-pressure-bimodal-2025`.
- The only meaningful crawled-but-not-indexed content page is `/comparison`; the other examples are static assets.
- Google Search Console reports zero external links.
- Google Search Console still reports historical `www` URLs separately from apex URLs.

The absence of external referring domains is the main authority ceiling. More schema or more pages cannot substitute for externally useful, citable work.

### Repository and Deployment State

- The project is a Next.js App Router site using static export.
- Metadata, canonical URLs, robots rules, sitemap generation, JSON-LD, research citations, and `llms.txt` already exist.
- Existing tests, ESLint, and the production build passed during the audit.
- The local worktree contains uncommitted SEO and content changes that must be preserved.
- Production, GitHub `main`, and the local worktree are not identical.
- Production exposes 65 sitemap URLs, while the current local build exposes 63.
- Two production news URLs are absent from the current local data and would disappear on a direct local deployment:
  - `/news/service-robots-200000-units-logistics-tactile-ai`
  - `/news/electronic-skin-research-robot-skin-systems-problem`
- The Vercel production alias points to a deployment that is not reproducible solely from the current `main` branch.
- `https://www.roboskin.ai/` returns duplicate content instead of redirecting, while tested deep `www` routes redirect to the apex host.

## Selected Approach

Use a four-layer balanced growth program:

1. Search signal integrity.
2. GSC-driven click growth.
3. Institutional authority and an original research asset.
4. Discovery, deployment verification, and measurement.

The design keeps the current frontend and static architecture. It does not add a CMS, database, runtime search service, or broad visual redesign.

## Layer 1: Search Signal Integrity

### Canonical Host

`https://roboskin.ai` is the only canonical host.

- Every `www` path must permanently redirect to the matching apex path.
- The root `www` URL requires an explicit redirect because the current catch-all rule does not cover it correctly.
- Canonical tags, sitemap URLs, structured-data IDs, Open Graph URLs, feeds, data exports, and internal absolute URLs must use the apex host.
- Preview and generated Vercel hostnames must not appear in canonical metadata.

### URL Preservation

Maintain an explicit protected public URL contract.

- All current production sitemap URLs must continue to return useful content or an intentional permanent redirect.
- Restore the two production news pages to the local content source before the next production deployment.
- A protected URL may be removed only when a permanent redirect target is explicitly registered.
- Build tests must fail when a protected URL disappears from the generated static output or sitemap without a redirect.
- Contact query variants remain canonicalized to `/contact`; they are not separate index targets.

### Reproducible Deployment

- GitHub `main` becomes the source of truth for production.
- A production deployment must be traceable to a Git commit.
- Do not deploy an uncommitted `out` directory directly.
- Existing user worktree changes must be incorporated, not reset or overwritten.
- The production sitemap and generated route set must match the committed build.

## Layer 2: GSC-Driven Click Growth

Only the audited priority batch receives first-cycle search changes.

Each priority page receives the following bounded treatment:

1. Align the title with the real paper name or demonstrated search intent while retaining a clear RoboSkin analysis angle.
2. Add a 40-80 word answer-first introduction stating what the research is, what problem it addresses, and why it matters for robot skin or tactile AI.
3. Separate visible content into source findings, RoboSkin analysis, engineering implications, and what the source does not prove.
4. Add two to four contextually relevant internal links instead of linking every article to the full site.
5. Keep the H1, visible opening, metadata, author identity, dates, and structured data consistent.
6. Change one title or snippet treatment at a time and wait for a full crawl cycle before another revision.

The existing query ownership matrix remains the canonicalization mechanism for broad concepts. New synonym pages are not allowed unless GSC shows a distinct intent that no existing page satisfies.

## Layer 3: Institutional Authority and Original Research Asset

### Editorial Entity

Use `RoboSkin.ai Editorial Team` consistently in visible bylines, metadata, and structured data.

Enhance the institutional trust surface with:

- A stable editorial team identity.
- A clear research and source-review method.
- A corrections process.
- Published and modified dates.
- Revision notes where a material claim changes.
- Organization markup with an indexable logo and only factual properties.
- No invented credentials, affiliations, founding facts, awards, offices, or `sameAs` profiles.

Article and NewsArticle structured data must use an author that matches the visible byline. Publisher references must resolve to the single Organization node.

### RoboSkin Tactile Research Index

Create an original, source-backed research index derived from the existing research content rather than duplicating article bodies.

Each entry may contain:

- Paper or project title.
- Year.
- Institution or publisher.
- Public source URL.
- Sensor principle.
- Material or sensing architecture.
- Measurement modalities such as pressure, shear, slip, temperature, vibration, or proximity.
- Robot location or form factor.
- Data output and software interface.
- Application direction.
- Source-reported metrics with source attribution.
- Evidence level and limitations.
- Last editorial review date.

Publish the same data from one source through:

- An indexable `/research-index` page.
- `/research-index.csv`.
- `/research-index.json`.

The web page should remain useful without client-side filtering. Filters may enhance the interface but cannot hide the base table from static HTML.

Use Dataset and ItemList structured data only where it matches the visible index and downloadable files. The methodology and limitations must be visible.

### GEO Principles

- Prefer direct answers, stable entities, original tables, explicit citations, and clear limitations.
- Keep important information in visible text.
- Ensure structured data mirrors visible content.
- Treat `llms.txt` as navigation guidance, not a ranking factor.
- Do not add special AI schema or machine-readable files that have no documented search requirement.
- Do not publish thin synonym pages or unsupported summaries at scale.

The research index and supporting methodology are the primary link-earning assets. Implementation may prepare citation and outreach material, but it will not automate external posting, buy links, or fabricate endorsements.

## Layer 4: Discovery, Verification, and Measurement

### Generated Discovery Surfaces

Keep `src/app/sitemap.ts` as the sitemap source and generate the following from the same content data:

- Sitemap entries.
- An RSS feed at `/feed.xml` for research and news.
- The research index page and CSV/JSON exports.
- An IndexNow URL batch for changed public URLs.

IndexNow submission runs only after production verification succeeds. A failed IndexNow request is recorded and retried deliberately; it does not trigger an unsafe content rollback.

### Data Flow

The fixed publication flow is:

`research and news data -> visible pages and metadata -> sitemap, RSS, CSV, and JSON -> build checks -> preview deployment -> production deployment -> production verification -> IndexNow and webmaster submission -> 7/28/90-day review`

## Code Boundaries

Retain the current ownership boundaries:

- `src/lib/seo.ts`: metadata, canonical URLs, and JSON-LD builders.
- `src/lib/blog-data.ts`: research article content.
- `src/lib/news-data.ts`: news content, including restored production articles.
- `src/content/site.ts`: brand, navigation, contact, editorial team, and organization facts.
- `src/app/sitemap.ts`: generated sitemap entries.

Add the minimum focused modules:

- `src/lib/research-index.ts`: normalized research-index records derived from existing content and focused supplemental fields.
- `/research-index`: statically rendered index page.
- `/research-index.csv`: static CSV representation.
- `/research-index.json`: static JSON representation.
- `/feed.xml`: static RSS output.
- `scripts/verify-production.mjs`: production HTTP, metadata, canonical, sitemap, and JSON-LD checks.
- `scripts/submit-indexnow.mjs`: verified IndexNow submission for changed URLs.

Do not duplicate full article text in the research-index module.

## Deployment Sequence

1. Record the GSC baseline and production URL inventory.
2. Reconcile the local worktree with production URL requirements.
3. Restore the two missing news pages.
4. Implement canonical-host and URL-contract protections.
5. Implement the first GSC priority-page treatment.
6. Implement the editorial entity and research index.
7. Generate RSS and IndexNow support.
8. Run all local tests, lint, and production build.
9. Create a Vercel preview and crawl the preview.
10. Commit the complete implementation to `main`.
11. Deploy that commit to production.
12. Run production verification across the full sitemap and protected URL set.
13. Only after verification, submit IndexNow URLs, refresh the sitemap submission, and request recrawling for the priority URLs.

## Failure Handling

Block deployment when any of the following occurs:

- A protected public URL becomes a 404 or disappears from the sitemap without an approved redirect.
- A canonical URL points to `www`, a preview hostname, or the wrong path.
- A `www` redirect loops or fails to preserve the path.
- The research-index page, CSV, and JSON disagree on record identity or count.
- RSS output is invalid or contains noncanonical URLs.
- JSON-LD does not parse.
- Visible author, date, title, or claims disagree with structured data.
- Tests, ESLint, type checks, or the production build fail.

If production verification fails:

- Do not submit IndexNow or webmaster recrawl requests.
- Move the production alias back to the last verified deployment or revert the failing commit.
- Keep the failing deployment available for diagnosis without leaving it as production.

## Verification

### Automated

- `node --test tests/*.test.mjs`
- `npm run lint`
- `npm run build`
- Protected URL contract tests.
- Canonical-host and redirect tests.
- Metadata and JSON-LD consistency tests.
- Research index, CSV, JSON, and RSS consistency tests.
- Full preview and production sitemap HTTP checks.

### Browser

Check the homepage, primary concept pages, all first-batch GSC pages, and the research index at desktop and mobile viewports.

Verify:

- No text overflow or layout overlap.
- No blank or failed primary images.
- No unusable filter controls.
- Static research-index content is visible without client interaction.
- Canonical, robots, metadata, headings, and structured data are present in rendered output.

### Webmaster

- Confirm the apex sitemap is accepted in the `roboskin.ai` Domain property.
- Inspect the apex versions of the priority URLs.
- Monitor whether historical `www` page impressions consolidate toward apex URLs.
- Record IndexNow response codes and Bing Webmaster Tools data when available.
- Do not interpret recrawl requests as indexing guarantees.

## Measurement Plan

### Day 0

Record:

- 5,240 rolling 28-day impressions.
- 48 rolling 28-day clicks.
- 0.9 percent CTR.
- 8.9 average position.
- Zero GSC-reported external referring domains.
- Priority-page metrics and current `www`/apex splits.

### Day 7

Check:

- Production deployment identity.
- Protected URL health.
- Sitemap discovery.
- Apex canonical selection.
- Priority-page recrawl status.
- IndexNow acceptance.

### Day 28

Evaluate only pages that Google has recrawled after deployment.

- Compare priority-page CTR and position.
- Confirm whether apex URLs replaced historical `www` appearances.
- Do not apply a second title rewrite without a full crawl cycle.
- Record new referring domains and citations.

### Day 90

Evaluate the approved target:

- 15,000 or more rolling 28-day impressions.
- 150 or more rolling 28-day clicks.
- 1.5 percent or higher CTR.
- Three or more legitimate referring domains.
- No active `www`/apex search-signal split caused by site configuration.

If impressions grow but CTR remains below target, prioritize title and intent alignment. If CTR improves but impressions stall, prioritize external authority and deeper original index coverage. Do not respond by automatically publishing more pages.

## Non-Goals

- No site-wide visual redesign.
- No Chinese or multilingual site in this cycle.
- No CMS, database, or hosted search service.
- No personal editor identity.
- No invented organizational facts or credentials.
- No bulk AI-generated article expansion.
- No paid, fabricated, or automated link schemes.
- No removal of indexed URLs without an explicit redirect.
- No reliance on `llms.txt` as a Google ranking mechanism.

## Acceptance Criteria

- Production is reproducible from a Git commit on `main`.
- All current production sitemap URLs remain available or intentionally redirected.
- The two at-risk news URLs remain live after deployment.
- `www` root and deep paths permanently redirect to matching apex URLs.
- Canonicals, sitemap entries, feeds, exports, and structured-data IDs use the apex host.
- The seven GSC priority pages have query-aligned visible content and consistent metadata.
- Visible and structured authorship uses `RoboSkin.ai Editorial Team` consistently.
- The research index has visible methodology, limitations, and matching web/CSV/JSON data.
- RSS is valid and uses canonical URLs.
- IndexNow submission is gated by production verification.
- Existing tests, new focused tests, lint, build, preview checks, and production checks pass.
- Day 0, Day 7, Day 28, and Day 90 measurement procedures are documented and usable.

## Risks

- Rankings, rich results, AI citations, and backlinks cannot be guaranteed.
- Search Console data may lag several days and hide low-volume queries.
- Historical `www` data can remain visible after redirects while Google recrawls and consolidates signals.
- Institutional authorship is less personally authoritative than a named expert; methodology and transparent sourcing must compensate.
- A large research index can become stale. Every record needs a last-reviewed date and source boundary.
- IndexNow assists participating engines but does not replace Google crawling or Search Console.
- The three-referring-domain target requires genuine external distribution after the citable asset exists.
