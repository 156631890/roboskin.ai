# Search resource access batch — September 19, 2026

Goal: increase useful organic visits that continue to primary code/data, a verified tutorial, an inventory download or a research inquiry. No traffic or ranking outcome is claimed at release.

## Evidence and decision

Live Search Console CSV export: Domain property `sc-domain:roboskin.ai`, Web search, all countries/devices, August 20–September 16, 2026. Daily chart totals: **194 clicks / 32,654 impressions**. The export contains 123 page rows and 377 disclosed query rows. It is not an indexed-page count. The accompanying JSON records the archive SHA-256 and exact baseline.

| Page | Clicks | Impressions | CTR | Average position | Action |
| --- | ---: | ---: | ---: | ---: | --- |
| UniVTAC research review | 1 | 1,197 | 0.08% | 7.34 | Update stale release details; surface versioned code/data access and an original file inventory; test a resource-focused search title/description. |
| Robot teleoperation | 1 | 615 | 0.16% | 10.29 | Answer the observed passive-observation comparison on the existing page; retain title/description. |
| Robot learning | 1 | 528 | 0.19% | 9.55 | Add a contextual link to the comparison; correct the current UniVTAC task-file count; retain title/description. |

Live query-filter checks confirmed `univtac` maps to the UniVTAC review (1 click, 306 impressions, UI position 6.9), with only 1 additional impression on the tactile-foundation-model page. The disclosed passive-observation-versus-teleoperation query maps to `/robot-teleoperation` (0/70, UI position 8.7) and `/robot-learning` (0/18, UI position 10.4). CSV line wrapping was normalized to spaces when applying the query filter; the unnormalized filter returned no data and is not used as a baseline.

Desktop accounts for 158 clicks/30,477 impressions; mobile 34/2,141; tablet 2/36. The US contributes 37 clicks/18,100 impressions. These are site-wide segments, not page-specific attribution or proof of a title problem. Disclosed queries do not explain all page impressions.

US-English SERP inspection was attempted on September 19. Google required human verification; the fallback Bing responses were empty or unrelated to the requested topic. These responses are not accepted as competitive/ranking evidence. Page selection therefore uses first-party query-to-page evidence and a directly verified source update, with SERP validation still outstanding. No search-volume/KD estimate or backlink deficit is inferred.

## Source checks and implementation

- UniVTAC main source revision: `0dafa10262e22f486f160a55d6f11aeab12d8e7b`. Read README, LICENSE, data/download.sh, docs/Installation.md and docs/Collection.md.
- UniVTAC isaac51 revision: `d541e5568227ca3b66104d294f63c80acad7c52c`. Read branch README and installer. The README has a stale main-branch label; the installer specifies the 5.1 / Lab 2.3 / Python 3.11 stack. No installation or throughput benchmark executed.
- Hugging Face `byml/UniVTAC` revision: `e1aee7b0c95543b535e0146b2de3ee1bc6ddaabd`. Provider file listing and card inspected. There are 800 task HDF5 paths per simulator version, plus 638 contact paths in 14 non-empty groups. File count is not frame count, outcome validation or corpus equivalence. This revision was already present in an earlier directory audit; this batch reconciles the article and per-component records with it, without claiming that the data were first released today.
- The upstream download script defaults to ModelScope, so a Hugging Face commit cannot be represented as its default-provider revision.
- R3M: https://arxiv.org/abs/2203.12601; UMI: https://arxiv.org/abs/2402.10329 and https://umi-gripper.github.io/; GELLO: https://arxiv.org/html/2309.13037v2. Read the primary descriptions, not just search snippets. No hardware tests or force/tactile default support inferred.

Updated the existing UniVTAC article, robot teleoperation and robot learning content. Synchronized the two UniVTAC dataset records, dataset-access evidence, benchmark and model availability records. Dataset directory snapshot advances to `v2026.09.19`; prior snapshots remain unchanged. The separately published research-index release remains `v2026.08.22`, including its original article title and dated paper review; this batch does not silently alter that release.

Added `/downloads/univtac-release-inventory-2026-09-19.csv`: 30 rows, editorial inventory under CC BY 4.0; no third-party sensor payloads and no new Dataset markup. To reproduce with Python 3.13.3 standard library:

```powershell
# Save the public provider JSON for the pinned dataset revision, then:
python scripts/summarize-univtac-release.py <provider-manifest.json> --checked-date 2026-09-19 --output <inventory.csv>
```

Input source: https://huggingface.co/api/datasets/byml/UniVTAC/revision/e1aee7b0c95543b535e0146b2de3ee1bc6ddaabd . The command was run against the saved provider listing and its output compared byte-for-byte with the published CSV. It summarizes file paths, not HDF5 contents or policy compatibility.

## Measurement and release checks

Existing Vercel Analytics is reused. `growthBatchForPath` assigns the three target pages to `2026-09-19-search-resource-access`; existing reading, source navigation and tutorial events remain. The inventory uses the existing `Research Data Open` event with CSV format and target path. A click event is download intent, not proof that every byte was saved. Test browsing is not a subscriber or consultation.

Primary observation window: September 20–October 17, 2026, retrieved once Search Console has settled. First diagnostic check: September 27. Compare matched 28-day windows by page/query/country/device, with daily exposure and other releases noted. Overlapping rolling windows are context, not independent before/after samples. Measure clicks, impressions, positions, CTR within comparable segments, resource navigation and inventory/tutorial use. Provider-confirmed subscriptions and qualified inquiries remain unavailable unless retrieved from their actual systems; never substitute zero.

Keep the September 8 title experiments and the September 15 VLA cohort stable. `/datasets`, `/benchmarks` and `/robot-foundation-models` receive factual UniVTAC record synchronization, a concurrent content change to retain in their observation notes; their titles/descriptions are unchanged.

Validation receipts and browser screenshots are stored in the task worktree `.artifacts/`. Production commit/deployment identity is checked after Git publication. No outreach messages, paid backlinks, external PRs or new tracking systems are part of this batch.

Local release checks passed: 193 existing tests, ESLint, Next.js production build including TypeScript, and export verification (126 sitemap URLs, 130 protected URL entries, 193 graph entities). The new contact-source URL adds one deduplicated source and two supported-by edges, so the graph count contract and existing assertions were synchronized to 253 sources / 584 edges / 338 supported-by edges. No new entity was invented. All 159 distinct internal paths/anchors on the six affected pages resolve. Browser checks passed for all six pages at 1440 px and 390 px, including actual CSV downloading and horizontal comparison-table scrolling. The local static server cannot serve Vercel's platform analytics script; its observed 404 is kept in the evidence and checked separately on production. There were no page JavaScript exceptions. Existing navigation-prefetch cancellations and the browser's download navigation cancellation are not treated as failed downloads.
