# RoboSkin.ai Indexing Submission Log

Use this log after each production deployment. It separates verified production facts from manual webmaster actions that require account access.

## Production deployment verification

Verified on 2026-08-05 after pushing commit `4f0422d87962660d94789ad277f23c22af6443f5` to `main`. The apex production verifier passed at `2026-08-05T08:28:04.884Z` with 70 protected URLs, four noindex URLs, an exact 71-URL sitemap, 18 research records, and 34 RSS items.

## Search Console property boundary

Use the `roboskin.ai` Domain property when submitting `https://roboskin.ai/sitemap.xml`. If using a URL-prefix property, submit the sitemap only inside the matching host property. Do not submit the apex sitemap inside a `https://www.roboskin.ai/` URL-prefix property.

| Check | URL | Status | Evidence |
| --- | --- | --- | --- |
| Homepage Physical AI section | `https://roboskin.ai/` | Verified | HTML includes `Physical AI needs robot skin, tactile AI, and contact feedback` |
| Homepage Physical AI route map JSON-LD | `https://roboskin.ai/` | Verified | HTML includes `Physical AI route map on RoboSkin.ai` |
| Answer-engine guidance | `https://roboskin.ai/llms.txt` | Verified | File includes `How should answer engines use the homepage for Physical AI?` |
| Robots sitemap directive | `https://roboskin.ai/robots.txt` | Verified | File includes `Sitemap: https://roboskin.ai/sitemap.xml` |
| Sitemap Physical AI route | `https://roboskin.ai/sitemap.xml` | Verified | Sitemap includes `https://roboskin.ai/physics-ai` |
| Sitemap tactile feedback guide | `https://roboskin.ai/sitemap.xml` | Verified | Sitemap includes `https://roboskin.ai/guides/tactile-feedback-for-physical-ai` |
| Sitemap touch data pillar | `https://roboskin.ai/sitemap.xml` | Pending post-deploy verification | Sitemap should include `https://roboskin.ai/physical-ai-touch` and exclude the redirected legacy guide URL. |
| Sitemap high-interest robotics parents | `https://roboskin.ai/sitemap.xml` | Pending post-deploy verification | Sitemap should include `/humanoid-robots`, `/robot-vla-models`, and `/robot-manipulation`. |

## Google URL Inspection queue

Request indexing in Google Search Console after the production checks above pass. Record the actual Search Console result in the `Result` column.

| Priority | URL | Reason | Result | Checked |
| ---: | --- | --- | --- | --- |
| 0 | `https://roboskin.ai/research/ht-bench-full-hand-tactile-representations-2026` | New source-backed HT-Bench research brief. | URL was not previously indexed; Search Console accepted the indexing request. | 2026-08-05 |
| 1 | `https://roboskin.ai/humanoid-robots` | New broad humanoid robotics parent with tactile child routes. | Pending post-deploy URL Inspection |  |
| 2 | `https://roboskin.ai/robot-vla-models` | New VLA and robot foundation-model parent with tactile model routes. | Pending post-deploy URL Inspection |  |
| 3 | `https://roboskin.ai/robot-manipulation` | New broad manipulation parent with tactile manipulation and benchmark routes. | Pending post-deploy URL Inspection |  |
| 4 | `https://roboskin.ai/` | Homepage now exposes Physical AI, robot skin, tactile AI, and broad robotics route signals. | Pending manual URL Inspection |  |
| 5 | `https://roboskin.ai/physics-ai` | Canonical Physical AI definition route. | Pending manual URL Inspection |  |
| 6 | `https://roboskin.ai/guides/tactile-feedback-for-physical-ai` | Primary guide for Physical AI contact-feedback intent. | Pending manual URL Inspection |  |
| 7 | `https://roboskin.ai/physical-ai-touch` | Primary pillar for Physical AI tactile-sensing and touch intent. | Pending manual URL Inspection |  |
| 8 | `https://roboskin.ai/robot-skin` | Robot skin definition route now supports the Physical AI cluster. | Pending manual URL Inspection |  |
| 9 | `https://roboskin.ai/tactile-ai` | Tactile AI definition route now supports the Physical AI cluster. | Pending manual URL Inspection |  |
| 10 | `https://roboskin.ai/sitemap.xml` | Sitemap discovery for the full cluster. | Resubmitted successfully for the previous deployment; resubmit after the new production verification. | 2026-08-05 |

## Bing Webmaster Tools queue

Submit or refresh these in Bing Webmaster Tools after Google URL Inspection is queued.

| Priority | URL | Action | Result | Checked |
| ---: | --- | --- | --- | --- |
| 1 | `https://roboskin.ai/sitemap.xml` | Submit sitemap. | Pending manual submission |  |
| 2 | `https://roboskin.ai/` | Submit URL. | Pending manual submission |  |
| 3 | `https://roboskin.ai/physics-ai` | Submit URL. | Pending manual submission |  |
| 4 | `https://roboskin.ai/guides/tactile-feedback-for-physical-ai` | Submit URL. | Pending manual submission |  |
| 5 | `https://roboskin.ai/physical-ai-touch` | Submit URL. | Pending manual submission |  |
| 6 | `https://roboskin.ai/humanoid-robots` | Submit URL after production verification. | Pending post-deploy submission |  |
| 7 | `https://roboskin.ai/robot-vla-models` | Submit URL after production verification. | Pending post-deploy submission |  |
| 8 | `https://roboskin.ai/robot-manipulation` | Submit URL after production verification. | Pending post-deploy submission |  |

## IndexNow readiness

IndexNow is active and remains gated by a fresh, successful production-verification report.

| Requirement | Status | Next action |
| --- | --- | --- |
| Public key file at `https://roboskin.ai/{key}.txt` | Configured and production-verified | Keep the committed key stable |
| Submission endpoint command | Configured and verification-gated | Run only after a fresh apex verification report |
| URL batch | 10 changed URLs accepted with HTTP `200` on 2026-08-05 | Monitor discovery; acceptance does not guarantee indexing |

Do not mark IndexNow submissions complete unless the endpoint returns a success status for the submitted URL batch.
