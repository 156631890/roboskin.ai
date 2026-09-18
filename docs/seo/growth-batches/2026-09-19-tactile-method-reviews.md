# Tactile method reviews and search submission — 2026-09-19

## Scope and reason

The user approved three paper-specific reviews and improvements to two pages with search exposure, then requested submission to Bing and other search platforms. The existing synthesis at `/guides/tactile-feedback-for-physical-ai` remains the owner of the cross-paper touch-to-action question.

New method-intent URLs:

- `/research/slipsense-multimodal-slip-detection-2026`: independent slip labels, modality ablations, latency distributions and recovery failures.
- `/research/touch2trace-tactile-cable-tracing-2026`: observation/action contract, pretraining budget, frequency/history confounds and mechanical limits.
- `/research/visible-touch-contact-overlays-visuomotor-policies-2026`: sensor-camera projection, normalization, task stages, overlay ablations and release access.

Updated entry pages:

- `/tactile-ai`: choose an integration route by the decision the robot must make.
- `/datasets`: distinguish a described training collection from obtainable and licensed files; specify which missing data fields each method needs.
- The synthesis links to all three deeper reviews. New reviews link back to the synthesis and relevant existing hubs. Existing search titles are preserved.

The three method pages use TechArticle, not Dataset schema. No new dataset records are inferred. The existing Bench2Dex record and separate STAR candidate remain unchanged. Homepage brief count changes from 58 to 61. Research-index release remains a separate 30-record publication.

## Sources and editorial boundaries

See `../research-expansion-source-audit-2026-09-19.json` for retrieved URLs, hashes, version and access findings. All three records still expose v1. Their arXiv comments report CoRL 2026 acceptance; proceedings were not independently verified. Results belong to the paper authors, with no RoboSkin experiment or reproduction claim. Visible Touch's project/table discrepancy is explicit. Official code/data/asset releases and licenses remain unverified for these three methods.

## Search baseline and measurement

See `2026-09-19-search-expansion-baseline.json`. Live GSC Domain property, Web search, all countries/devices, August 19–September 15: 193 clicks and approximately 31,600 impressions (rounded UI). Tactile AI: 14 clicks/1,614 impressions; datasets: 5/2,641. The domain overview shows 114 indexed and 39 excluded URLs; this is not a sitemap-only count. New pages have no prelaunch performance history.

Hypothesis: practical method detail and explicit access boundaries will help named-paper searches and improve useful navigation from existing tactile/data pages. This is a hypothesis, not a causal conclusion from historical traffic.

- New pages use analytics cohort `2026-09-19-tactile-method-reviews`.
- Preserve the earlier `/tactile-ai` and dataset cohorts. Record this batch's new sections and inbound links as concurrent changes.
- First observation: September 20–26, retrieved after reporting settles. Full 28-day interval: September 20–October 17. No new scheduled task is created by this record.
- Separately record indexing, query/page impressions and clicks, research-source navigation, export preparation/download intent and provider-confirmed subscriptions. Export intent is not completed data use; signup UI success is not a provider-confirmed subscriber.
- Conversion/provider values unavailable at this baseline remain unavailable. Do not fill them with zero or treat overlapping rolling GSC windows as independent before/after samples.

## Validation before release

190 tests pass; lint and Next.js build pass; static export verifies 126 sitemap URLs, 130 protected entries including five redirect sources, five noindex pages, 193 graph entities, 30 research-index records and 50 RSS items. Generated agent Markdown contains 135 pages.

All three rendered articles have the correct canonical, one H1, TechArticle schema and valid internal destinations. Version-specific paper fragments were checked against retrieved HTML. At 390 px, all three articles plus `/tactile-ai` and `/datasets` retain a 390 px document width; wide tables scroll inside their containers. Desktop and mobile screenshots are retained under `.artifacts/search-expansion/`.

## Search-platform work

The logged-in Bing account did not include RoboSkin. A site-add request supplied an official `BingSiteAuth.xml`; its parsed XML is included in this release for ownership verification after deployment. Bing verification and sitemap submission must be recorded from actual platform responses, not inferred from the file's presence.

Google's existing Domain property is available. Submit the apex sitemap in that property after release. Existing IndexNow submission remains gated by a fresh, successful apex production verification for the exact deployed commit.

Official submission guidance checked on September 19:

- [IndexNow FAQ](https://www.indexnow.org/faq): one participating endpoint shares submissions across participating engines, currently including Bing, Yandex, Naver, Seznam, Yep and Amazon.
- [Yahoo submission help](https://help.yahoo.com/kb/search-for-desktop/SLN2217.html): submit through Bing Webmaster Tools.
- [DuckDuckGo sources](https://duckduckgo.com/duckduckgo-help-pages/results/sources/): traditional links and images are largely sourced from Bing; this is not a separate submission receipt.
- Yandex's independent webmaster workflow opened an account-login page. No password/MFA was attempted. Its separate dashboard remains pending login; IndexNow can still notify participating engines.

Post-release receipts belong in the current indexing submission log and local evidence directory. Submission acceptance, indexing, search visibility and conversion are separate outcomes.
