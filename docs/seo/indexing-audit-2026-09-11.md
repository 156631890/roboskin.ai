# Google indexing audit — 2026-09-11

Checked on 2026-09-11, Asia/Shanghai, after the user reported few results for `site:roboskin.ai`.

## Finding

The main sitemap's Page Indexing report shows **101 indexed URLs out of 110 submitted URLs (91.8%)**, with nine not indexed. The report was last updated on **2026-09-04**. The domain-wide report shows 107 indexed URLs and 38 excluded URLs; this is a different population and must not be divided by the main sitemap's 110 URLs.

The evidence does not show a site-wide indexing configuration failure. Nine intended content pages remain unindexed. Their individual URL Inspection results, checked today, show no recorded last crawl.

Google's [site operator documentation](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site), fetched during this audit, explicitly says that `site:` does not necessarily return all indexed URLs. The live query displayed ten organic results on its first page and pagination through page seven. Neither visible results nor pagination is a reliable total index count. This was a personalised, English-language query in the existing browser session, not a controlled ranking test.

## Search Console evidence

Property: `sc-domain:roboskin.ai`.

| Scope | Indexed | Not indexed | Report date |
| --- | ---: | ---: | --- |
| All known URLs | 107 | 38 | 2026-09-04 |
| `https://roboskin.ai/sitemap.xml` | 101 | 9 | 2026-09-04 |

Domain-wide exclusions:

| Reason | Count | Interpretation |
| --- | ---: | --- |
| Page with redirect | 13 | None appear as exclusions in the main-sitemap filter. Do not remove redirects merely to reduce this count. |
| Alternate page with proper canonical | 7 | None appear as exclusions in the main-sitemap filter. |
| Not found (404) | 6 | Outside the main-sitemap exclusions; individual examples were not audited in this session. |
| Crawled, currently not indexed | 3 | Examples are `/feed.xml`, `/favicon.ico`, and `https://www.roboskin.ai/_next/static/media/f5271587012faf78-s.p.woff2`; these are not article pages. |
| Discovered, currently not indexed | 9 | All nine are in the current main sitemap. Individual inspection results follow. |

The historical failed validation shown for the three crawled exclusions started on 2026-06-27 and failed on 2026-07-01. It is not evidence of a new September content failure.

## Nine affected content URLs

All nine currently return HTTP 200, have a self-referencing canonical, allow indexing in HTML metadata, have no `X-Robots-Tag` restriction, and appear in the live sitemap. Each has incoming HTML links from other pages in the 110-page crawl.

| Path | Individual URL Inspection on 2026-09-11 | Distinct other sitemap pages linking to it |
| --- | --- | ---: |
| `/faq` | URL is not on Google; URL is unknown to Google | 3 |
| `/humanoid-robots` | Discovered, currently not indexed | 18 |
| `/news/eit-pneumatic-hybrid-robot-skin-force-map-2026` | Discovered, currently not indexed | 7 |
| `/news/twisted-yarn-textile-capacitive-robot-skin-2026` | Discovered, currently not indexed | 12 |
| `/research-services` | Discovered, currently not indexed | 109 |
| `/research/adept-visuo-tactile-dexterity-rl-2026` | URL is not on Google; URL is unknown to Google | 17 |
| `/research/graphene-liquid-metal-3d-force-2026` | Discovered, currently not indexed | 8 |
| `/research/tac4loco-plantar-tactile-humanoid-locomotion-2026` | Discovered, currently not indexed | 5 |
| `/research/vision-based-tactile-intelligence-robotics-survey-2026` | URL is not on Google; URL is unknown to Google | 35 |

The September 4 aggregate report and today's individual inspection differ in classification for FAQ, ADEPT, and the survey. Preserve both observations; do not infer an indexing loss or a technical cause from that discrepancy. All nine individual inspections report last crawl as not applicable.

For `/humanoid-robots`, Google identifies the sitemap, homepage, and `/physical-ai` as discovery sources. Lack of discovery links is therefore not supported as the explanation for this page. Incoming-link counts describe this audit's static HTML graph, not Google's crawl history or link equity.

## Technical verification

- Exact checkout: `C:/Users/Administrator/roboskin.ai`.
- Branch: `codex/ai-robotics-semantic-hub-20260821`.
- Local and production commit: `5f27fe4dfa03d8585c14a506b0a7f103bf78dd84`, confirmed using the live `/deployment.json`.
- Existing `node scripts/verify-production.mjs https://roboskin.ai` passed at `2026-09-11T08:02:17.129Z`.
- Verifier results: 110 sitemap URLs; 114 protected URL contract entries including five legacy redirect sources; four intentional noindex URLs; expected canonical metadata, content, sitemap membership, robots policy, and permanent www redirects passed.
- An additional HTTP/HTML crawl of all 110 sitemap URLs found zero response, canonical, robots-meta, or X-Robots-Tag issues in its checks.
- Live robots policy allows `/`, disallows `/api/`, `/private/`, and `/domain-sale.html`, and advertises both sitemaps.
- `/solutions` has no incoming link from another URL in this crawl's sitemap population. This is a separate architecture observation; it is not one of the nine unindexed pages and was not changed.

These HTTP checks ran from the local environment. Google URL Inspection read the indexed-status report; **Test Live URL was not run**. The audit does not establish Google's precise scheduling decision, current server-side Googlebot logs, or a content-quality diagnosis. There is no basis here to call this a penalty, a crawl-budget limit, or an external-link deficit.

## Recommended next actions

1. Prioritise `/humanoid-robots`, the ADEPT article, the vision-based tactile survey, and Tac4Loco for Test Live URL. If Google reports that they can be indexed, request indexing once and record the outcome. Avoid repeated submissions merely to try to change priority.
2. Review the remaining five URLs in the same way, ordered by their editorial or business value. Audit any actual failed live test before changing code.
3. Keep existing URLs, canonicals, and sitemap structure stable while gathering crawl feedback. All nine already have incoming links; adding more site-wide links without a reader-facing reason is not the immediate remedy.
4. Recheck this exact nine-URL cohort around 2026-09-18 to 2026-09-25. Record first crawl, selected canonical, indexed state, and subsequent impressions. The observation window is not a promise of indexing.
5. Evaluate search visibility of the 101 indexed pages using page/query performance data separately. This session did not measure current impressions, clicks, or CTR, so it does not establish a current ranking or CTR bottleneck.

No indexing requests, sitemap resubmissions, content changes, deployments, or outreach were performed. Only local audit evidence and this report were written. No additional code tests were needed because application code was unchanged.

## Evidence and continuation

Local, ignored evidence directory: `.artifacts/indexing-audit-2026-09-11/`.

- `sitemap-indexing.png` and `sitemap-indexing.txt`: sitemap-filtered Search Console report.
- `discovered-not-indexed.txt`: the nine-URL report examples.
- `inspection-*.txt`: all nine individual URL Inspection results.
- `live-crawl.json`: 110 URL responses, metadata, and incoming links.
- `google-site-query.png` and `google-site-query.txt`: observed Google query.
- `.artifacts/production-verification.json`: existing production verifier output.

The last successful step was individual inspection of all nine URLs plus complete production verification. No implementation fix or remote operation is in progress. Next executable diagnostic step is Test Live URL for `/humanoid-robots`; any later submission result must be recorded separately from indexing confirmation. This report is evidence and a recommendation, not standing authorisation for unrelated publishing or deployment.
