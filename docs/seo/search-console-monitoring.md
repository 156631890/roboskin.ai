# RoboSkin.ai Search Console Monitoring Table

Use this table weekly after the sitemap is submitted. Do not rewrite titles, add pages, or chase keywords until a row has at least one week of Search Console evidence.

## Day 0 baseline - 2026-07-10

| Window | Impressions | Clicks | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| Rolling 28 days through 2026-07-07 | 5,240 | 48 | 0.9% | 8.9 |
| Previous three months | 5,610 | 60 | 1.1% | 8.9 |

External links reported by GSC: 0.

## Current snapshot - 2026-07-27

Search Console data was current through 2026-07-24.

| Window | Impressions | Clicks | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| Rolling 28 days | 7,974 | 85 | 1.1% | 8.6 |
| Rolling three months | 9,974 | 127 | 1.3% | 8.6 |

Operational state:

- External links reported by GSC: 0.
- `https://roboskin.ai/sitemap.xml` was successful, last read on 2026-07-23, with 69 discovered pages.
- `https://roboskin.ai/news-sitemap.xml` was successfully submitted and read on 2026-07-27 after the new textile artificial-skin brief was published; Search Console reported one discovered page. The route now retains a valid latest-article URL without `news:news` metadata when no article is inside the two-day Google News window, so it can remain listed in `robots.txt`.
- The index coverage report was last updated on 2026-07-10 and showed 64 indexed pages and 22 excluded URLs, so it is not current enough for a release decision.
- Core Web Vitals had insufficient field data on both mobile and desktop.
- Vercel Web Analytics was not enabled, so the repository now includes the client integration but dashboard activation remains a manual account action.

High-impression pages in the rolling 28-day window:

| URL | Impressions | Clicks | CTR | Decision |
| --- | ---: | ---: | ---: | --- |
| https://roboskin.ai/research | 747 | 0 | 0% | Preserve the 2026-07-21 treatment through a full 14-day window. |
| https://roboskin.ai/research/single-material-soft-robotic-skin-2025 | 598 | 4 | 0.67% | Measure the 2026-07-10 treatment before another snippet change. |
| https://roboskin.ai/research/dream-tac-tactile-world-action-model-2026 | 533 | 0 | 0% | Preserve the 2026-07-21 treatment through a full 14-day window. |
| https://roboskin.ai/tactile-ai | 493 | 3 | 0.61% | Preserve the 2026-07-21 content and source update. |
| https://roboskin.ai/robot-skin | 490 | 9 | 1.84% | Use as the control; do not rewrite. |
| https://roboskin.ai/research/robot-skin-papers | 268 | 0 | 0% | Recheck intent separation after 2026-08-04. |
| https://roboskin.ai/research/freetacman-robot-free-visuotactile-data-collection-2025 | 241 | 0 | 0% | Preserve the 2026-07-21 treatment through a full 14-day window. |

CTR experiment gate:

- Do not perform another title, H1, or meta-description treatment on the rows above before 2026-08-04.
- On or after 2026-08-04, export page-plus-query data for 2026-07-22 through the latest complete date.
- Change a page only when it still has at least 20 post-treatment impressions and CTR below 1 percent.
- Keep `/research` as the latest analyzed-briefs hub and `/research/robot-skin-papers` as the bibliography and paper-navigation route.

## Production rollout - 2026-08-05

| Item | Record |
| --- | --- |
| Deployed source commit | `4f0422d87962660d94789ad277f23c22af6443f5` |
| Vercel production deployment | `dpl_He57vYNhVcyjSK3cspDA2UsnTwTU` at `https://roboskin-2p4iaripe-stevens-projects-08c9c5b0.vercel.app` |
| Production alias | `https://roboskin.ai` |
| Production verification | Passed at `2026-08-05T08:28:04.884Z`: 70 protected URLs, four noindex URLs, exact 71-URL sitemap, 18 research records, 34 RSS items, apex canonicals, and permanent `www` redirects |
| Verified sitemap SHA-256 | `7de80951b76e19b88c65490d2571b2ea845f1a6acf67da406f236565634f2626` |
| IndexNow | 10 changed URLs accepted with HTTP `200`; recorded at `2026-08-05T08:40Z` |
| Google Search Console | `https://roboskin.ai/sitemap.xml` resubmitted successfully and 71 pages discovered; the new HT-Bench brief was not previously indexed and its indexing request was accepted on 2026-08-05 |
| Earned-link outreach | Awesome-Touch maintainer-requested PR [#41](https://github.com/linchangyi1/Awesome-Touch/pull/41) is open and mergeable; the DOI is the primary link and the RoboSkin.ai brief is secondary with affiliation disclosed |

Measurement baseline: the 2026-07-22 through 2026-08-02 Search Console export contained 57 clicks, 4,246 impressions, 1.3% CTR, and average position 7.9. Review the new page and changed cluster after 7, 28, and 90 days; do not interpret submission acceptance as indexing or ranking.

## Production rollout - 2026-07-10

| Item | Record |
| --- | --- |
| Deployed source commit | `5cf019c7e61cec51a8ee01aa122d44aa1401059a` |
| GitHub quality gate | Run `29083902563` passed tests, lint, build, export verification, and artifact upload |
| Vercel production deployment | `dpl_H5jgSUL7u1KzPC1NJwH2oHDpatUQ` at `https://roboskin-bi8xj41dm-stevens-projects-08c9c5b0.vercel.app` |
| Production alias | `https://roboskin.ai` |
| Production verification | Passed at `2026-07-10T09:46:56.191Z`: 65 protected URLs, exact sitemap, seven research records, 28 RSS items, apex canonicals, and permanent `www` redirects |
| Verified sitemap SHA-256 | `391a2380605bdc569e51f6c2d047950435ab35803f09b2fce5d09f39c1c9b395` |
| IndexNow | 15 changed URLs accepted with HTTP `202` at `2026-07-10T09:47Z` |
| Google Search Console | Pending. The authenticated browser was blocked by enterprise network policy, so no GSC sitemap refresh or URL indexing request was claimed in this session. |

Manual GSC follow-up: submit or refresh `https://roboskin.ai/sitemap.xml`, inspect the apex `/research-index` URL and the seven priority pages, request indexing only when the live apex canonical is shown, and replace the pending record above with the actual submission time and inspection states.

## Day 7

Verify the deployed commit, protected URLs, sitemap discovery, apex canonical selection, priority-page recrawl state, and the recorded IndexNow response.

## Day 28

Compare CTR, clicks, impressions, and position only for priority pages recrawled after deployment. Do not rewrite a title a second time before a complete crawl cycle.

## Day 90

Evaluate the approved rolling-28-day target: 15,000 impressions, 150 clicks, 1.5% CTR, at least three legitimate referring domains, and no active configuration-driven `www`/apex split.

## Indexed status

| URL | Submitted in sitemap | Indexed | Last checked | Action |
| --- | --- | --- | --- | --- |
| https://roboskin.ai | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/physics-ai | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/robot-skin | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/tactile-ai | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/e-skin | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/humanoid-robot-skin | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/applications/robot-hand-tactile-sensor | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/applications/soft-robotic-skin | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/guides/flexible-tactile-sensor-array | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/physical-ai-touch | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/guides/tactile-feedback-for-physical-ai | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/guides/robot-skin-vs-e-skin | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/research/robot-skin-papers | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/research-index | Yes |  |  | Inspect URL, validate Dataset markup, then request indexing if available |
| https://roboskin.ai/applications/robot-gripper-tactile-sensor | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/guides/tactile-sensor-for-robots | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/guides/robot-touch-sensor | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/guides/slip-detection-robot-hand | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/guides/ros2-tactile-sensing | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/guides/tactile-sensor-benchmark-robot-manipulation | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/datasets | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/tactile-foundation-models | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/guides/visuo-tactile-world-models-robot-manipulation | Yes |  |  | Inspect URL after deployment, then request indexing if available |
| https://roboskin.ai/news/underwater-self-healing-electronic-skin-nus-2026 | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/news/touchworld-tactile-foundation-model-dexterous-manipulation-2026 | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/news/color-changing-mechanochromic-tactile-sensor-2026 | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/news/single-pixel-tactile-skin-compressive-sampling-2026 | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/news/full-hand-tactile-sensing-robot-hands-vision-control | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/news/global-robot-installations-542000-physical-ai-touch | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/research/dream-tac-tactile-world-action-model-2026 | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/research/single-material-soft-robotic-skin-2025 | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/research/ros2-kilted-tactile-pipeline-2026 | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/research/genforce-transferable-force-sensing-2026 | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/research/feelworld-visuo-tactile-world-model-2026 | Yes |  |  | Inspect URL after deployment, then request indexing if available |
| https://roboskin.ai/research/ht-bench-full-hand-tactile-representations-2026 | Yes | No at inspection | 2026-08-05 | Indexing requested successfully; monitor recrawl and coverage |
| https://roboskin.ai/research/sparsh-x-multisensory-touch-representations-2025 | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/research/freetacman-robot-free-visuotactile-data-collection-2025 | Yes |  |  | Inspect URL, then request indexing if available |
| https://roboskin.ai/research/mitas-multi-resolution-tactile-imitation-learning-2026 | Yes |  |  | Inspect URL, then request indexing if available |

## Query performance

| URL | Query | Impressions | Clicks | CTR | Avg position | Date range | Note |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| https://roboskin.ai/robot-skin | robot skin |  |  |  |  | Last 28 days | Core definition query |
| https://roboskin.ai/physics-ai | physical ai robot skin |  |  |  |  | Last 28 days | Physical AI canonical cluster query |
| https://roboskin.ai/guides/tactile-feedback-for-physical-ai | physical ai tactile feedback |  |  |  |  | Last 28 days | Contact-feedback guide query |
| https://roboskin.ai/robot-skin | robot skin for physical ai |  |  |  |  | Last 28 days | Robot skin as Physical AI contact layer |
| https://roboskin.ai/tactile-ai | tactile AI |  |  |  |  | Last 28 days | Core concept query |
| https://roboskin.ai/tactile-ai | tactile ai robot skin |  |  |  |  | Last 28 days | Tactile AI and robot skin workflow query |
| https://roboskin.ai/e-skin | e-skin robotics |  |  |  |  | Last 28 days | Electronic skin query |
| https://roboskin.ai/applications/robot-hand-tactile-sensor | robot hand tactile sensor |  |  |  |  | Last 28 days | Hand application query |
| https://roboskin.ai/physical-ai-touch | robot touch data |  |  |  |  | Last 28 days | Touch-data pipeline query |
| https://roboskin.ai/humanoid-robot-skin | humanoid robot skin tactile sensor |  |  |  |  | Last 28 days | Humanoid tactile-sensing application query |
| https://roboskin.ai/applications/robot-gripper-tactile-sensor | robot gripper tactile sensor |  |  |  |  | Last 28 days | Commercial application query |
| https://roboskin.ai/guides/slip-detection-robot-hand | slip detection robot hand |  |  |  |  | Last 28 days | Manipulation-intent query |
| https://roboskin.ai/guides/ros2-tactile-sensing | ROS 2 tactile sensing |  |  |  |  | Last 28 days | Software integration query |
| https://roboskin.ai/guides/tactile-sensor-benchmark-robot-manipulation | tactile sensor benchmark |  |  |  |  | Last 28 days | Manipulation benchmark query |
| https://roboskin.ai/datasets | tactile datasets robot learning |  |  |  |  | Last 28 days | Dataset-directory query |
| https://roboskin.ai/tactile-foundation-models | tactile foundation models |  |  |  |  | Last 28 days | Model-comparison query |
| https://roboskin.ai/guides/visuo-tactile-world-models-robot-manipulation | visuo-tactile world models |  |  |  |  | Last 28 days | Action-conditioned world-model comparison query |
| https://roboskin.ai/research/feelworld-visuo-tactile-world-model-2026 | FeelWorld tactile world model |  |  |  |  | Last 28 days | Latest-paper entity query |

## GSC high-impression low-click pages

| URL | Primary query cluster | Current action | Recheck window | Success signal |
| --- | --- | --- | --- | --- |
| https://roboskin.ai/research/dream-tac-tactile-world-action-model-2026 | Dream-Tac tactile world action model, robot skin, Physical AI | Title and snippet rewritten around predictive robot skin value | 7-14 days after deployment | CTR above 1 percent or first click appears |
| https://roboskin.ai/research/single-material-soft-robotic-skin-2025 | single-material soft robotic skin, multimodal e-skin | Title and snippet rewritten around e-skin sensing | 7-14 days after deployment | CTR above 1 percent or first click appears |
| https://roboskin.ai/news/full-hand-tactile-sensing-robot-hands-vision-control | full-hand tactile sensing, robot hands, tactile AI | News detail route and NewsArticle schema added | 7-14 days after deployment | Maintains impressions and increases clicks |
| https://roboskin.ai/research/ros2-kilted-tactile-pipeline-2026 | ROS 2 tactile sensor pipeline, robot skin data replay | Title and snippet rewritten around replayable robot skin data | 7-14 days after deployment | CTR above 1 percent or first click appears |
| https://roboskin.ai/research/genforce-transferable-force-sensing-2026 | GenForce transferable force sensing, tactile sensors | Title and snippet rewritten around robot skin force transfer | 7-14 days after deployment | CTR above 1 percent or first click appears |
| https://roboskin.ai/news/global-robot-installations-542000-physical-ai-touch | global robot installations 542000, Physical AI touch | News detail route and NewsArticle schema added | 7-14 days after deployment | Maintains impressions and increases clicks |
| https://roboskin.ai/research/sparsh-x-multisensory-touch-representations-2025 | Sparsh-X, multisensory touch, tactile AI | Title and snippet rewritten around tactile AI representation learning | 7-14 days after deployment | CTR above 1 percent or first click appears |
| https://roboskin.ai/research/freetacman-robot-free-visuotactile-data-collection-2025 | FreeTacMan, robot-free visuo-tactile data, tactile AI | Title and snippet rewritten around tactile AI datasets | 7-14 days after deployment | CTR above 1 percent or first click appears |
| https://roboskin.ai/research/mitas-multi-resolution-tactile-imitation-learning-2026 | MiTaS, multi-resolution tactile imitation learning, robot hands | Title and snippet rewritten around robot hand learning | 7-14 days after deployment | CTR above 1 percent or first click appears |

## CTR triage

| Condition | Decision |
| --- | --- |
| Indexed, 0 impressions after 28 days | Improve internal links or add a source-backed paragraph; do not rewrite title first |
| Impressions above 20, CTR below 1 percent | Rewrite title and meta description around the exact query wording |
| Impressions above 20, avg position below 20 | Add evidence, citations, and better section headings before adding a new page |
| Multiple URLs get impressions for the same query | Consolidate intent or add stronger canonical internal links |
| A non-target page ranks for a target query | Link from that ranking page to the intended topic page |
