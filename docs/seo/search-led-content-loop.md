# Search-led content decisions

Standing user direction, September 12, 2026: use the search baseline to expand topics that attract useful traffic, learn from stronger pages, and improve weak points. This is the current editorial prioritization rule for RoboSkin.ai.

## Current evidence and action queue

The September 12 GSC CSV export covers August 13–September 9, 2026, Web search, all countries and devices. Its daily chart totals are 24,640 impressions and 170 clicks. The export contains 111 page rows and 323 disclosed query rows. These row counts are not the site's indexed-page count. Live GSC recheck during this September 12 continuation showed the same reporting window and totals.

| Priority | Page/topic | Impressions | Clicks | Export CTR | Current action |
| --- | --- | ---: | ---: | ---: | --- |
| Expand existing answer | `/tactile-ai` | 1,196 | 14 | 1.17% | Add a practical first-experiment workflow and routes into verified sensors, datasets and reported evidence. Keep the current URL and search title. |
| Research next | TouchWorld brief | 813 | 8 | 0.98% | Prioritize source checks for training data, code/weights, reproduction and deployment questions. Add an update to the existing brief when new evidence supports it. |
| Research next | Dream-Tac brief | 736 | 6 | 0.82% | Prioritize action/prediction interfaces, availability and evaluation details; validate a distinct unmet intent before a child page. |
| Diagnose, preserve current experiment | World-model comparison guide | 2,431 | 3 | 0.12% | High visibility and weak clicks merit query/device/position review. Title and description changed September 8; retain them through the observation window. |
| Diagnose, preserve current experiment | `/datasets` | 1,814 | 3 | 0.17% | September 8 discovery and dataset-tool changes are still under observation. Check which queries and visitors use selection/export tools before another rewrite. |
| Diagnose query intent | `/robot-vla-models` | 1,928 | 5 | 0.26% | Check page-filtered queries and current search results before deciding between a definition, a comparison, or implementation guidance. |
| Diagnose, preserve current experiment | `/robot-foundation-models` | 1,517 | 2 | 0.13% | Description changed September 8. Observe the complete interval before replacing it again. |
| Observe recent release | DIGIT, GelSight Mini, ReSkin guides | unavailable | unavailable | unavailable | Released September 12, after the report ends. No success/failure conclusion or duplicate indexing request from this baseline. |

The homepage has 58 clicks/1,525 impressions; retain it as brand and navigation context rather than using it to declare a research format the winner. The `robotacdex` query has 3 clicks/15 impressions: its 20% CTR is a small-sample clue, not a scalable conversion claim.

Mobile QA of the expansion reproduced a shared topic layout defect: wide tables forced the prose column beyond a 390 px viewport while page-level overflow hiding concealed the excess width. The release adds a minimum-width constraint to that grid child so prose wraps and tables scroll inside their own container. This also affects other pages using `SeoTopicArticle`; retain it as a concurrent usability change when interpreting their results.

The live page filter `contains https://roboskin.ai/tactile-ai` returned the same 14 clicks and 1,196 impressions. Its first 10 of 18 disclosed queries include `tactile ai` (4 clicks/83 impressions), `tactile foundation model` (1/1), `tactile data` (0/9), and `evaluate data modul on tactile technology` (0/7). These support keeping the definition and adding data/evaluation guidance, but do not explain all 14 clicks or prove demand for a new URL. Evidence: `.artifacts/search-led-growth-2026-09-12/gsc-tactile-ai.txt` and `.png`.

## How to learn and decide

1. **Select on useful demand.** Check exact page rows, query intent and available conversion evidence. Separate brand navigation, broad discovery, named-paper queries and practical tasks. Clicks are an early signal; subscriptions and useful exports are separate outcomes.
2. **Inspect stronger pages before copying a format.** Tactile AI, TouchWorld and Dream-Tac combine recognizable subjects with direct explanations and primary-source boundaries. Treat this as a candidate pattern to test, not a proven cause of their clicks. Preserve accurate names, clear answers, source status and a useful next action when expanding.
3. **Expand the existing intent first.** Add a missing explanation, verified source update, comparison dimension, acquisition step or evaluation aid to the page that already owns the intent. Create a new canonical URL only for a distinct supported task with enough original value. Do not split spelling variants or add news solely to increase page count.
4. **Diagnose the weak stage.** Check crawl/canonical/index problems first. For impressions with few clicks, segment query, position, country and device and inspect the current result/snippet. For clicks with weak downstream use, inspect navigation, download and signup flows. Low aggregate CTR alone does not identify a title problem.
5. **Make one interpretable batch.** Record changed paths, publication date, baseline, hypothesis, primary metric and related releases. Keep title experiments stable long enough to obtain post-change data. The September 8 changes and the September 12 sensor release are distinct cohorts; new inbound links from Tactile AI are a known concurrent change for the sensor cohort.
6. **Review rather than extrapolate.** Compare matched reporting intervals; keep actual GSC end dates and delayed/incomplete data. Rolling windows that overlap are context, not independent before/after samples. Do not call a few clicks, a single export, or one AI citation a proven winner.
7. **Record the lesson.** Each observation states what happened, alternative explanations, next action, and whether the pattern is still a hypothesis. Retain negative findings and abandoned hypotheses. Reuse supported patterns; do not promote untested site observations into universal SEO rules.

## Repeated measurement

Export GSC Performance as CSV ZIP, retain its property/search/filter settings, then run:

```powershell
python scripts/summarize-gsc-export.py <export.zip> --output .artifacts/<observation-date>/gsc-summary.json
```

The script accepts the standard English/Chinese export filenames, preserves quoted/multiline CSV fields, records the archive hash and reporting window, and separates chart totals from disclosed page/query rows. It does not fill missing rows with zero or issue publication decisions. September 12 output was reconciled against the original export and live filtered-page totals.

Append an observation to the appropriate file in `docs/seo/growth-batches/`, retaining the baseline. Capture GSC indexing, impressions and clicks; Vercel reading and source-navigation events; CSV preparation/download intent; and provider-confirmed subscribers. Keep test visits separate. Missing provider data remains unavailable while Buttondown is awaiting owner review.

Review dates: September 19 for the first sensor/content check; October 10 for their full 28-day window. September 8 title/dataset changes use September 9–October 6 as their first complete 28-day interval, retrieved after GSC settles. The Tactile AI expansion uses September 13–19 and September 13–October 10. These are review dates and reporting windows; no new scheduled publisher is created.

Source research continues through the existing daily research watch. Its broad discovery coverage remains useful; editorial publication prioritizes this queue and the latest cohort observations. Empty or inconclusive feedback is a valid reason to continue observation.
