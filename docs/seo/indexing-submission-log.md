# RoboSkin.ai Indexing Submission Log

Use this log after each production deployment. It separates verified production facts from manual webmaster actions that require account access.

## Current verified submission — September 19, 2026

This section supersedes the old pending Bing queue below for the full sitemap and the URLs in this batch. Older rows remain historical evidence, not current status.

Content release `3e71cba7c568af68119fbdf5a03588b1c6b33cb2` passed the apex production verifier: 126 sitemap URLs, 130 protected entries including five redirects, five noindex routes, 193 graph entities and 50 RSS items. GitHub quality run [35372635812](https://github.com/156631890/roboskin.ai/actions/runs/35372635812) succeeded. Vercel production deployment `dpl_95Z8qdeamc8sZXrcxFK7c9aCGnnC` was Ready and the apex deployment identity matched that commit.

| Platform | Action performed | Actual result | Boundary |
| --- | --- | --- | --- |
| Bing Webmaster Tools | Added `https://roboskin.ai/`, served the official `BingSiteAuth.xml`, verified ownership, submitted `https://roboskin.ai/sitemap.xml` | Initially Submitted / Processing; subsequent live recheck: Success, 126 discovered URLs, one known sitemap, zero sitemap errors/warnings | Not an indexing confirmation. Bing's UI displayed September 18; local observation date was September 19 Asia/Shanghai. |
| Google Search Console | Resubmitted apex sitemap in `sc-domain:roboskin.ai` | Success confirmation; submitted/read September 19; 126 discovered pages | Discovered pages are not indexed pages. Before this submission, the domain overview showed 114 indexed / 39 excluded. |
| IndexNow global endpoint | Submitted eight changed canonical URLs after fresh exact-commit production verification | HTTP 200; command reported `IndexNow accepted 8 URLs with status 200` | Accepted for participating-engine notification, not proof of engine-by-engine indexing. |
| Yahoo Search | Followed the official submission route through Bing | Bing submission above is the applicable route | No separate Yahoo receipt is claimed. |
| DuckDuckGo | Checked official result-source documentation | Traditional links/images largely sourced from Bing | No separate submission or inclusion confirmation is claimed. |
| Yandex independent dashboard | Opened webmaster add-site flow | Account-login page; independent dashboard connection incomplete | IndexNow notification covers participating Yandex endpoint; separate webmaster reporting remains pending login. |

IndexNow paths: `/`, `/research`, `/research/slipsense-multimodal-slip-detection-2026`, `/research/touch2trace-tactile-cable-tracing-2026`, `/research/visible-touch-contact-overlays-visuomotor-policies-2026`, `/tactile-ai`, `/datasets`, `/guides/tactile-feedback-for-physical-ai`.

Evidence: `.artifacts/search-expansion/indexnow-receipt.json`, `indexnow-receipt.log`, `bing-sitemap-receipt.txt/.png`, `bing-sitemap-recheck.txt/.png`, `google-sitemap-receipt.txt/.png`, and `.artifacts/production-verification.json`. Source/measurement context is in `growth-batches/2026-09-19-tactile-method-reviews.md`. Production-verification artifacts are local and intentionally not committed.

Official guidance: [IndexNow participating endpoints and sharing](https://www.indexnow.org/faq), [Yahoo site submission](https://help.yahoo.com/kb/search-for-desktop/SLN2217.html), [DuckDuckGo result sources](https://duckduckgo.com/duckduckgo-help-pages/results/sources/). Currently listed IndexNow participants include Bing, Yandex, Naver, Seznam, Yep and Amazon. A global-endpoint receipt does not establish individual processing status for each participant.

## Production deployment verification

Verified on 2026-08-22 after deploying commit `522a182d5ba924c785f3bad41957aa310f8e59b3`. The apex production verifier passed at `2026-08-22T13:29:27.879Z` with 114 protected URLs, four noindex URLs, an exact 110-URL sitemap, 30 research records, 191 knowledge-graph entities, 69 organizations, and 24 robots. A live follow-up check reproduced sitemap SHA-256 `dd842129e560f8253e8c1cd46059b0de3764e57157fa31ae74629e4fef04c7d0` and confirmed the UniVTAC research URL and all high-interest robotics parent routes are present.

Verified on 2026-08-05 after pushing commit `4f0422d87962660d94789ad277f23c22af6443f5` to `main`. The apex production verifier passed at `2026-08-05T08:28:04.884Z` with 70 protected URLs, four noindex URLs, an exact 71-URL sitemap, 18 research records, and 34 RSS items.

## Search Console property boundary

Use the `roboskin.ai` Domain property when submitting `https://roboskin.ai/sitemap.xml`. If using a URL-prefix property, submit the sitemap only inside the matching host property. Do not submit the apex sitemap inside a `https://www.roboskin.ai/` URL-prefix property.

| Check | URL | Status | Evidence |
| --- | --- | --- | --- |
| Homepage Physical AI section | `https://roboskin.ai/` | Verified | HTML includes `Physical AI needs robot skin, tactile AI, and contact feedback` |
| Homepage Physical AI route map JSON-LD | `https://roboskin.ai/` | Verified | HTML includes `Physical AI route map on RoboSkin.ai` |
| Answer-engine guidance | `https://roboskin.ai/llms.txt` | Verified | File includes `How should answer engines use the homepage for Physical AI?` |
| Robots sitemap directive | `https://roboskin.ai/robots.txt` | Verified | File includes `Sitemap: https://roboskin.ai/sitemap.xml` |
| Sitemap Physical AI route | `https://roboskin.ai/sitemap.xml` | Verified 2026-08-22 | Sitemap includes `https://roboskin.ai/physical-ai` and excludes the `/physics-ai` redirect source |
| Sitemap tactile feedback guide | `https://roboskin.ai/sitemap.xml` | Verified | Sitemap includes `https://roboskin.ai/guides/tactile-feedback-for-physical-ai` |
| Sitemap touch data pillar | `https://roboskin.ai/sitemap.xml` | Verified 2026-08-22 | Sitemap includes `https://roboskin.ai/physical-ai-touch` and excludes the redirected `/guides/physical-ai-touch-data` URL |
| Sitemap high-interest robotics parents | `https://roboskin.ai/sitemap.xml` | Verified 2026-08-22 | Sitemap includes `/ai-robotics`, `/physical-ai`, `/humanoid-robots`, `/robot-learning`, `/robot-vla-models`, `/robot-foundation-models`, `/robot-manipulation`, `/robot-hands`, `/robot-safety`, `/robotics-datasets`, `/robot-world-models`, and `/robot-teleoperation` |

## Google URL Inspection queue

Request indexing in Google Search Console after the production checks above pass. Record the actual Search Console result in the `Result` column.

| Priority | URL | Reason | Result | Checked |
| ---: | --- | --- | --- | --- |
| 0 | `https://roboskin.ai/research/ht-bench-full-hand-tactile-representations-2026` | New source-backed HT-Bench research brief. | URL was not previously indexed; Search Console accepted the indexing request. | 2026-08-05 |
| 1 | `https://roboskin.ai/humanoid-robots` | New broad humanoid robotics parent with tactile child routes. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 2 | `https://roboskin.ai/robot-foundation-models` | New source-reviewed model-role, training-data, access, tactile-input, and evidence directory. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 3 | `https://roboskin.ai/robot-vla-models` | VLA-specific parent for observation-to-action interfaces and evaluation. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 4 | `https://roboskin.ai/robot-manipulation` | New broad manipulation parent with tactile manipulation and benchmark routes. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 5 | `https://roboskin.ai/robot-learning` | New source-backed learning parent for demonstrations, reinforcement, datasets, sim-to-real, and tactile learning. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 6 | `https://roboskin.ai/` | Homepage now exposes Physical AI, robot skin, tactile AI, and broad robotics route signals. | Pending manual URL Inspection |  |
| 7 | `https://roboskin.ai/physical-ai` | Canonical Physical AI definition route. | Pending manual URL Inspection |  |
| 8 | `https://roboskin.ai/guides/tactile-feedback-for-physical-ai` | Primary guide for Physical AI contact-feedback intent. | Pending manual URL Inspection |  |
| 8 | `https://roboskin.ai/physical-ai-touch` | Primary pillar for Physical AI tactile-sensing and touch intent. | Pending manual URL Inspection |  |
| 9 | `https://roboskin.ai/robot-skin` | Robot skin definition route now supports the Physical AI cluster. | Pending manual URL Inspection |  |
| 10 | `https://roboskin.ai/tactile-ai` | Tactile AI definition route now supports the Physical AI cluster. | Pending manual URL Inspection |  |
| 11 | `https://roboskin.ai/sitemap.xml` | Sitemap discovery for the full cluster. | Resubmitted successfully; last read 2026-08-22 with status `Success` and 104 discovered pages. | 2026-08-22 |
| 12 | `https://roboskin.ai/robot-hands` | New end-effector comparison parent connecting hands, grippers, tactile sensing, and manipulation. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 13 | `https://roboskin.ai/robot-world-models` | New predictive-model parent with VLA and visuo-tactile child routes. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 14 | `https://roboskin.ai/robotics-datasets` | New broad dataset-evaluation parent; tactile-only data remains on `/datasets`. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 15 | `https://roboskin.ai/robot-safety` | New scope-aware standards and safety-system map. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 16 | `https://roboskin.ai/robot-teleoperation` | New demonstration-acquisition and robot-learning data parent. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 17 | `https://roboskin.ai/research/hitac-wam-hierarchical-tactile-world-action-model-2026` | Current preprint entity page for hierarchical tactile forecasts and replanning. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 18 | `https://roboskin.ai/research/t-rex-tactile-reactive-dexterous-manipulation-2026` | Source-bounded entity page for tactile-reactive VLA manipulation. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 19 | `https://roboskin.ai/research/robotacdex-humanoid-visual-tactile-action-dataset-2026` | Dataset entity page with access status kept explicit. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 20 | `https://roboskin.ai/research/tactidex-tactile-guided-dexterous-benchmark-2026` | Benchmark entity page for tactile-guided dexterity. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 21 | `https://roboskin.ai/research/adept-visuo-tactile-dexterity-rl-2026` | New source-bounded ADEPT paper, policy, embodiment, and matched tactile-ablation entity. | Production and sitemap verified; pending manual URL Inspection | 2026-08-22 |
| 22 | `https://roboskin.ai/research/univtac-platform-encoder-benchmark-2026` | New source-bounded UniVTAC paper, encoder, dataset, and benchmark evidence page. | URL was not indexed at inspection; Search Console accepted the request and added it to the priority crawl queue. This is not an indexing confirmation. | 2026-08-22 |

## Bing Webmaster Tools queue

Submit or refresh these in Bing Webmaster Tools after Google URL Inspection is queued.

| Priority | URL | Action | Result | Checked |
| ---: | --- | --- | --- | --- |
| 1 | `https://roboskin.ai/sitemap.xml` | Submit sitemap. | Pending manual submission |  |
| 2 | `https://roboskin.ai/` | Submit URL. | Pending manual submission |  |
| 3 | `https://roboskin.ai/physical-ai` | Submit URL; verify `/physics-ai` returns a 301 first. | Pending manual submission |  |
| 4 | `https://roboskin.ai/guides/tactile-feedback-for-physical-ai` | Submit URL. | Pending manual submission |  |
| 5 | `https://roboskin.ai/physical-ai-touch` | Submit URL. | Pending manual submission |  |
| 6 | `https://roboskin.ai/humanoid-robots` | Submit URL after production verification. | Production verified; pending manual submission | 2026-08-22 |
| 7 | `https://roboskin.ai/robot-vla-models` | Submit URL after production verification. | Production verified; pending manual submission | 2026-08-22 |
| 8 | `https://roboskin.ai/robot-manipulation` | Submit URL after production verification. | Production verified; pending manual submission | 2026-08-22 |
| 9 | `https://roboskin.ai/robot-learning` | Submit URL after production verification. | Production verified; pending manual submission | 2026-08-22 |

## IndexNow readiness

IndexNow is active and remains gated by a fresh, successful production-verification report.

| Requirement | Status | Next action |
| --- | --- | --- |
| Public key file at `https://roboskin.ai/{key}.txt` | Configured and production-verified | Keep the committed key stable |
| Submission endpoint command | Configured and verification-gated | Run only after a fresh apex verification report |
| Latest URL batch | 15 changed URLs accepted with HTTP `200` during the 2026-08-22 release follow-up | Monitor discovery; acceptance does not guarantee indexing |
| Previous URL batch | 10 changed URLs accepted with HTTP `200` on 2026-08-05 | Retained as historical evidence |

Do not mark IndexNow submissions complete unless the endpoint returns a success status for the submitted URL batch.
