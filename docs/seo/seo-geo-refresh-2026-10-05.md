# SEO/GEO refresh — 2026-10-05

模块缺失：无。

## Scope and release status

RoboSkin.ai is an English research/resource website for robotics engineers and researchers. The primary reader task is to find and evaluate usable sensors, datasets, benchmarks and research evidence; research-service enquiries are secondary. This batch improves existing search presentation, schema modelling and resource navigation. It does not create new research results or author credentials.

Production and the fetched main branch were `0302d339a1a4d169fd23de1004429805ab8f04d0` when checked. The primary checkout contains unrelated uncommitted work and was preserved. Work is isolated in the existing PR #26 and PR #36 branches. Publishing and search-notification operations are already authorized; **content review is pending**, with no human reviewer or approval event invented. Local checks and preview deployments do not mean production has changed.

## Priorities implemented

1. **Search metadata and honest schema.** Full GET responses for all 185 sitemap URLs returned HTTP 200. The current-production HTML audit found 50 over-budget final titles, 27 over-budget descriptions and 209 schema domain/range/relationship diagnostics. PR #26 rewrites 77 metadata fields across 67 pages and repairs the schema builders. Hardware uses Product only where existing manufacturer evidence supports that relationship. Dataset affiliations remain source mentions; evidence and restrictions remain linked CreativeWorks. No price, stock, rating, fabricated creator or stronger experimental claim is added.
2. **Checks that actually run.** Validate titles including the 14-character brand suffix before build and audit the exported DOM afterward. Resolve the actual CLI entry file on Windows, including junction paths, so metadata checks, the HTML audit and Markdown generation cannot silently skip their entry points. Regression checks execute the commands through the checkout path. Metadata length limits of 70/160 Unicode code points are this project's editorial budgets, not Google ranking requirements.
3. **Existing topic navigation.** PR #36 clarifies two VLA inbound anchors and places links to the exact Bench2Dex dataset and benchmark rows early in the research review. It preserves the original simulation/physical boundary and scientific results. This is navigation work, not a demonstrated CTR improvement or a new competing article.

## Output preservation and review coverage

PR #26 changes final metadata/schema/intro output on 94 URLs. On all 185 pages, H1s, table/figure/form/video counts, existing internal-link destinations, image alt text, canonical and robots metadata are retained. There are **14 visible-text changes**, consisting of shorter introductory descriptions and resource labels derived from the edited SEO fields; these are included in the review material. Do not describe all visible body text as byte-identical.

`sitemap.xml`, `feed.xml`, `datasets.json`, `research-index.json` and `knowledge-graph.json` are byte-identical to the same-environment main export. No URL, download, source or research result is removed. The existing PNG social-card fix and editorial-accountability information from main are retained.

The local evidence directory is `.codex/maintenance/runs/seo-geo-refresh-20261005` in the primary checkout. `output-diff.json` lists every changed page/field and preservation result; `content-snapshot.json` includes all 94 changed pages' final body, title, description, JSON-LD, alt text, asset hashes and the full RSS output. `review.html` presents complete before/after metadata, visible-copy differences and schema. Its status is `review_pending`; a concrete human review must cover this version before release under the explicitly invoked seo-geo workflow.

## Validation and crawl layers

- Local PR #26: **227/227 tests**, lint, production build, Markdown generation and export verification passed. Markdown generation produced 195 files. Export verification covered 185 sitemap URLs, 189 protected contract entries including five redirect sources, six intentional noindex URLs, 193 graph entities, 30 research-index records and 50 RSS items. The final DOM audit has zero errors, including metadata budgets and schema diagnostics, and zero unverified schema references.
- Browser sampling covers `/datasets`, `/sensors`, `/robots`, `/robot-world-models`, `/physical-ai`, the Bench2Dex research review and the InterEvolve News article. Evidence is stored separately for desktop 1440 × 900, mobile 390 × 844 and No-JS. This is seven-page template evidence, not a claim that all 185 pages were manually browsed. Source/limit contracts and reading/navigation paths are retained; page-wide horizontal overflow is absent. Locally deferred sections use existing `content-visibility: auto`; scroll/anchor checks distinguish rendering deferral from missing HTML content.
- The local preview lacks the production newsletter configuration and displays its existing unavailable/RSS fallback. This is an environment difference, not evidence that production signup was removed. No form submission or test email was sent. The production form configuration and product code are retained.
- PR #36 head `92a3850af1fbac41513fb2ad46966cef90368eb1` passed its GitHub Quality gate and both Vercel preview checks. Its primary preview is protected by Vercel login; that protection was retained. These checks do not approve content or confirm production release. PR #26 must also pass CI on its final pushed head.
- Authenticated Google URL Inspection for the **current production** `/datasets` reported indexed, successful smartphone Googlebot crawl, crawl/index allowed and the inspected URL as Google's canonical. Last crawl displayed: 2026-10-04 20:43:37. The separate 2026-10-05 16:47 live test reported “URL can be indexed,” HTTP 200 and no JavaScript console messages; seven resources were not loaded. The candidate version is not live and has not been tested/indexed by Google. Other pages' Google Live/Indexed layers remain pending, not automatically passed.

## Search evidence and limits

The targeted GSC page filter `https://roboskin.ai/datasets` compared September 22–28 with September 15–21, Web search, all countries/devices. It reported clicks **1 vs 2**, impressions **192 vs 655**, CTR **0.5% vs 0.3%** and average position **7.8 vs 6.8**. Only seven disclosed query rows were visible, accounting for six versus 41 impressions; they do not represent all page impressions. This small seven-day sample cannot establish demand loss, competition, AI displacement or a title-related cause. It is not a full 28-day baseline. The site-level indexed/excluded report is a platform snapshot, not a direct subtraction from the sitemap URL count.

Ubersuggest authentication transport failed; no estimates from that tool were obtained or invented. No paid audit, outreach or social publication was started. A later outcome comparison should use complete equal 28-day windows with consistent property/search/country/device filters, disclosed-query limits and a resource-use metric. Rankings, recrawl, AI citations and conversions remain separate outcomes.

## Official basis and release continuation

Google's current [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) says normal SEO remains applicable and no special AI file or schema is required. [Mobile-first guidance](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) requires equivalent primary content; [Schema.org's data model](https://schema.org/docs/datamodel.html) defines applicable property domains and typed ranges. These pages were obtained/read on October 5; their saved HTML and source records are in the evidence directory. E-E-A-T is not a single measurable Google score.

After concrete human review, recheck exact heads, current main, checks, conflicts and review state; merge with the head-SHA guard and let main's existing automatic deployment run. Verify Vercel Ready, the production commit and `/deployment.json` agree, then run the production checker with the deployed merge SHA. Rebase/synchronize PR #36 after PR #26 is merged and require checks on the updated head. Compare deployed output with the approved content scope; submit only changed, verified live URLs once through the existing IndexNow process. Do not resubmit an unchanged sitemap or describe notification acceptance as indexing. Roll back only a confirmed release regression to the previously verified production version.
