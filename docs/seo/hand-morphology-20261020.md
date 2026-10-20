# Hand morphology: existing-page review

Reviewed 2026-10-20 UTC. Main URL: https://roboskin.ai/robot-hands#anthropomorphic-vs-symmetric-tactile-hands. Supporting route: https://roboskin.ai/tactile-manipulation (one contextual link only).

Main topic: robot hand morphology and tactile in-hand rotation. English guide for hardware design, integration and tactile procurement teams. The useful increment is a source-bounded comparison and an editorial acceptance plan, not a new news article or a general hand ranking. Search volume, keyword difficulty and trend measurements are unknown. LEAP, TacTip and AnyRotate are project/product names, not generic query-volume evidence.

## Primary evidence

Read https://arxiv.org/abs/2610.26759 and https://arxiv.org/html/2610.26759v1. First submission: 2026-10-19 17:18:25 UTC. This is a newly reviewed source, not a claim that it was just published.

The review checked methods III-B/III-C/III-D, simulation and hardware protocols IV-A/IV-B, load definitions IV-C and discussion VI/VII. In particular, it separates the simulation observation ablations from full-tactile-only hardware evaluation, distinguishes learned tactile force estimates from independent force ground truth, and retains the hardware rotation-axis, duration, visual-counting and orientation-aggregation boundaries. No improvement percentages are promoted as hardware success rates. No raw image-to-action claim is made.

The acceptance plan is explicitly editorial guidance. It asks buyers to align the target task and objects, record separate progress/time/load outcomes, calibrate their own hardware and obtain matched hardware ablations before attributing a tactile benefit. It does not extrapolate to assembly, tool use or industrial endurance. No code, weights or runnable reproduction was verified; no claim of absence is made.

## Isolation and date handling

- Baseline: `ba8ad219b738dd217fa6f320ae6a5d3e5ac4f7d0` (PR #70), also the verified production source.
- Current source and open PRs #36/#26/#6 contain no matching paper or case. The existing Berkeley QUAD Hand item addresses a different asymmetric QDD design and is retained.
- Only one robot-hands section, its substantive review fields and one tactile-manipulation contextual link change. Removing these additions restores the baseline content source exactly. PR68/69/70 content is preserved.
- Robot-hands retains its original 2026-08-21 publication and advances its substantive update to October 20. Tactile-manipulation retains its existing date and revision note; a link addition does not fabricate another substantive review.
- Titles, descriptions, canonicals, index intent and existing schema types are retained. No new route or language version is created.

## Publication checks

| Check | robot-hands | tactile-manipulation | Evidence |
| --- | --- | --- | --- |
| C01 URL/purpose | 通过 | 通过 | Existing routes; stable hand-case anchor. |
| C02 intent | 通过 | 通过 | Hand selection case; relevant inbound context without duplicated case text. |
| C03 title/H1 | 通过 | 通过 | Existing accurate page topics retained. |
| C04 description | 通过 | 通过 | Existing descriptions remain supported by page content. |
| C05 restrictions | 通过 | 通过 | No fabricated tests, metrics, access or outreach. |
| C06 increment | 通过 | 通过 | Engineering acceptance plan and a useful reading path. |
| C07 promise | 通过 | 通过 | Selection and evidence boundaries answered; link reaches the promised checklist. |
| C08 facts | 通过 | 通过 | Primary methods/protocol checked; author attribution and unknowns explicit. |
| C09 structure | 通过 | 通过 | Compact case plus comparison table; single contextual link. |
| C11 sources | 通过 | 通过 | Direct versioned paper; supporting page directs to the full evidence case. |
| C12 responsibility | 通过 | 通过 | Existing editorial identity; no invented experiment or expert endorsement. |
| C13 dates | 通过 | 通过 | Actual source date and substantive update; original dates retained. |
| C14 rendering/index | 通过 | 通过 | Generated HTML, metadata, schema, sitemap, robots and desktop/mobile checks. |
| C16 internal links | 通过 | 通过 | TacTip record, measurement guide, research-services and case anchor resolve. |
| C17 function | 通过 | 通过 | Relevant navigation tested; no new hardware, download or form capability promised. |

C10 excluded: no images/media changed. C15 excluded: no corresponding language version changed.

Validation: 288 tests, lint, production build, static-export/on-page audit (198 sitemap pages) and two-page 1440/390 px checks. Prior FR-VLA/CEL/VLDA section hashes are checked separately, normalizing only the FR-VLA section ordinal introduced by the earlier VLDA insertion. The local CRLF-sensitive sensor-count test uses temporary newline normalization, restored without a tracked sensor/test change.

Execution evidence is retained under task `batch14`. This document records the pre-release gate; exact merge/deployment/custom-domain and production HTML checks are recorded after normal deployment. uAgentKit's hold remains unchanged, and no outreach is performed.
