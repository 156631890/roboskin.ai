# Tactile learning content update — September 18, 2026

## Scope and working copy

Owner request: refresh website content. Continue the existing authorization to commit and deploy verified changes. No outreach messages, third-party PR changes, or new tracking services are part of this batch.

Worktree: `C:\Users\Administrator\roboskin.ai\.worktrees\content-refresh-20260918`, branch `codex/content-refresh-20260918`, base `9e29a41100364cccabaf30e9ab42a746cdd729c7`. The original working directory and its outstanding edits are preserved. The verified public mailbox remains `hello@roboskin.ai`.

| Page | Reader need and search intent |
| --- | --- |
| `/research/dextouch-wm-human-touch-world-model-2026` | DexTouch-WM, human tactile demonstrations, tactile world models; distinguish better prediction from useful synthetic policy data |
| `/research/bench2dex-visuo-tactile-bimanual-benchmark-2026` | Bench2Dex benchmark, bimanual tactile simulation, HDF5 robot data; understand observations, evaluation, and available artifacts |
| `/guides/visuo-tactile-world-models-robot-manipulation` | Existing five-system comparison plus a separately scoped September data-transfer update |
| `/benchmarks` | Add simulation protocol context and the Bench2Dex resource review |
| `/tactile-ai` | Connect human and simulated touch to existing data-processing practice |
| `/` and `/research` | Surface the new reviews and replace the August homepage research watch |

The existing five-system guide title, description, comparison rows, and publication date are preserved. The September 8 metadata experiment therefore remains identifiable. Only substantially updated pages receive a September 18 modification date. The two new RoboSkin articles are published September 18; source publication dates remain explicit in their bodies.

The homepage brief count is corrected to the actual 41 research + 17 news entries, rather than incrementing the stale displayed count of 52. The separate 30-entry curated research-index release is unchanged. Existing editorial artwork is reused and labelled as illustration, not an experiment image.

## Source audit

### DexTouch-WM

- Record: https://arxiv.org/abs/2609.20649 ; v1 full text: https://arxiv.org/html/2609.20649v1 . Submitted September 17, 2026. Record says IROS 2026 RoBoWoMo workshop lightning talk, not main-conference acceptance.
- Read method, pretraining comparisons, downstream evaluation/training protocols, Tables I–IV, and conclusion.
- Human tactile acquisition: 360 raw taxels per hand at 60 Hz; model retains 320 (five 4×4 fingertip pads plus a 15×16 palm pad). Acquisition rate is not inference/control frequency. Common 67-D pose representation requires calibration and retargeting.
- Table I holds robot data fixed at 5 h. Robot-only to +100 h human: LPIPS 0.098→0.048, Contact-IoU 0.415→0.588, Contact-F1 0.551→0.706. No claim of monotonic improvement at all data scales or calibrated force units.
- Evaluation: ten matched rollouts per policy/task/environment, five raters per rollout. Normalized task scores are not success rates; raters are not independent robot trials.
- Table IV four-task real-robot means (200 real / 100 real + WM-Robot / 100 real + WM-Mix): FTP-1 0.731/0.688/0.694; π0.5 0.625/0.563/0.494; X-VLA 0.500/0.506/0.400. Synthetic sequences retain real initial observations and recorded actions. Prediction improvement does not establish reliable replacement of real training data.
- No official code/weights/data download identified in the reviewed paper and record. No model training, glove acquisition, hardware experiment, or independent replication performed by RoboSkin.

### Bench2Dex

- Record: https://arxiv.org/abs/2609.15726 ; v1 full text: https://arxiv.org/html/2609.15726v1 . Submitted September 14, 2026.
- Official project: https://bench2dex.github.io/ ; docs: https://bench2dex.github.io/doc/ . Read benchmark construction, experiment definitions, Table 2, HDF5 appendix, project page, and README.
- Code revision: `f96a8b2b4eb475483af66e9e03916b35bc43f1be`, https://github.com/Bench2Dex/Bench2Dex . Root MIT code license confirmed. Read `policy/ACT/utils.py`, `collector/hdf5_writer.py`, and `collector/config.py`.
- ACT loader `_resolve_effective_length` uses `meta/homing_start_sim_step` and `time/sim_step` with `searchsorted`; fallback to full length for missing/error/outside-interior boundary. Article distinguishes this from README's recommended preflight requirement. Homing should also be excluded from normalization statistics.
- Paper scale: 12 hands, 26 task–embodiment settings, about 1.3K simulated human-teleoperated demonstrations. No independent complete release recount.
- Tactile maps encode local simulated geometric contact, not a specific physical camera sensor or calibrated force. Full HDF5 schema is modality capability, not a promise about every hosted episode. README says depth is omitted in current practical storage workflow.
- Main results are not a tactile-enabled/disabled ablation. 26 settings × 50 rollouts × 4 channels × 4 policies = 20,800 evaluation episodes. No full task×hand factorial experiment or independent retraining replication.
- Table 2 None/Full counts, each denominator 1,300: ACT 383/169; DP 168/50; π0.5 355/256; GR00T N1.5 631/258. Full is independently sampled, not a paired monotonic difficulty shift. Stable terminal predicate dwell defaults to 0.5 s; LSCR is partial progress; high-speed diagnostics are not force measurements.
- README version combination: Python 3.11, Isaac Sim 5.1.0, Isaac Lab v2.3.2, torch 2.7.0, CUDA 12.8 wheels. Not installed or executed here; no promise of latest-version compatibility.
- HF listings public/ungated at inspection:
  - `Bench2Dex/teleopdata` revision `b195787c65046083e6a43776b67bdf1389dfa3eb`.
  - `Bench2Dex/Assets` revision `bf65215f844d1fca30750e4cc70d7266650abf0a`.
  - `Bench2Dex/policy_ckpt` revision `773e65842bd36de1cbe951b0f52c865a87d41732`.
- No top-level dataset/model cards or collection-wide license confirmed in these listings. Do not extend repository MIT to demonstrations, assets, weights, or upstream dependencies. No bulk dataset download, simulation run, checkpoint execution, or physical sensor validation.

Raw source pages, API metadata and selected code excerpts are stored in ignored `.artifacts/sources/`; third-party full text and datasets are not committed.

## Validation and release

The existing article template provides static HTML, canonical, TechArticle/Breadcrumb JSON-LD, author/source separation, illustrations with alt text, and horizontally scrolling tables. Sitemap and RSS derive new entries from the content collection. The protected URL list adds the two actual routes; its existing count assertion changes from 125 to 127. No tests duplicate the new static prose.

Local verification passed:

- 188 existing Node tests and ESLint.
- Next.js production build, including TypeScript checking, and 132 generated agent Markdown representations.
- Static-export verification: 123 sitemap URLs, 127 protected entries (including five redirects), five noindex URLs, 191 graph entities, unchanged 30-record research-index release, and 50 RSS items.
- The production-configured build requires the verifier to receive the same environment: `node --env-file=.env.production.local scripts/verify-export.mjs`. The first bare verifier invocation incorrectly expected the closed newsletter state because Node does not load Next's env files automatically; the matching-config run passed. No production variable or form behavior was changed.
- Both new articles: internal export targets resolve, one H1, correct canonical and September 18 publication/modification dates, TechArticle JSON-LD, sitemap and RSS entries. Two and three article tables respectively.
- Headless Chrome at 1440 and 390 px across seven affected routes: no page-wide overflow, no application/page errors, visible images loaded, wide tables contained. Local Python preview cannot serve Vercel Analytics; that platform-only 404 was identified and excluded from application-error assertions, with production checked separately.
- Mobile menu opens/closes, homepage research-watch link navigates to DexTouch-WM, and the article table actually scrolls horizontally.

Logs, DOM check results, and real desktop/mobile screenshots are retained in ignored `.artifacts/`. Production commit, deployment and domain checks are appended to the local release receipt after publication.

## Observation plan

No fresh Search Console query was performed for this batch. The August 13–September 9 historical window in `search-led-content-loop.md` is context, not a current traffic baseline or prediction. Capture a new pre/post publication window before attributing changes.

Review discovery, crawl and indexing status, then query/page impressions and clicks for the two named research topics. Separately monitor article visits, contextual clicks to world-model/data/benchmark pages, example downloads from linked tutorials, verified newsletter subscriptions, and research inquiries using the existing analytics. Assess over comparable 14/28-day windows; avoid changing guide titles again during the current experiment. No ranking or growth commitment is implied.
