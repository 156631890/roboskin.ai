# Evidence resources: review version 2026.10.28

Status: **human approved; release verification in progress**. The owner reviewed and approved commit `371c0e551180243b5fdcb672e367ec9f04ef4766` and its final snapshot. The real approval event is retained in [approval.json](approval.json). The snapshot and original verification files below are immutable pre-approval records; their historical `review_pending` values do not supersede this approval. No production publication is claimed by this pre-release record.

Module omissions: **none**. All original learning and teleoperation sections were checked for exact retained text (normalizing line endings). Two learning research sections move later on the page; their IDs and sources remain. The tactile comparison retains its original numerical tables, methods, hardware limits, experimental protocol and source routes. No URL, image, form or business feature was removed. The comparison title now names both research systems accurately; its canonical URL remains unchanged.

| Page / primary intent | What changed | Full rendered text |
| --- | --- | --- |
| `/robot-learning` / robot learning data | Five source-linked starting points; access, rights, first checks and stopping conditions; decision kit. | [Review page](robot-learning.md) |
| `/robot-teleoperation` / robot teleoperation data | DROID stored-field versus transformed-target example; measured motion versus commanded action; action-contract sheet. | [Review page](robot-teleoperation.md) |
| Tactile in-context learning comparison | Executed two-episode input audit; per-segment records; runnable inspector and blank A/B/C experiment records. | [Review page](tactile-in-context-learning-tactile-eta-vs-gpt-6-astra.md) |

All three are English research/reference pages for engineers choosing or inspecting robot data. Existing canonical/index intent remains. No AI-detector score, ranking promise, paid research API or fabricated independent robot experiment is used.

## What the new experiment establishes

The actual offline run completed at `2026-10-28T01:49:42.709929+00:00` (09:49:42 Asia/Shanghai). Two pinned HDF5 files, the fixed demonstration JSON and 96 PNGs were downloaded before the run. The report retains their versions and hashes. The inspector decoded 2,780 source images across 695 rows, checked 24 action segments and matched 228 panels from 96 strips to source pixels. End-effector/joint boundary states and the shared selected tactile steps were checked.

Per-fingertip context appearances A/B/C total 48/66/717. The 717 includes 22 repeated segment-boundary rows. This is not a token, cost, latency or task-success comparison. B uses the released selection: optical features and peak selection were not recomputed. No simulator, policy, online controller, success predicate or physical robot was run. A/C were counted, not sent to a model. The authors' successful-demo labels are not independently validated by this check.

The five rejection tests use synthetic arrays to reject invalid timing, endpoints, paths, strip geometry/pixels and bad image decoding. They are code behavior tests, not more robot trials.

## Source and artifact contracts

- Five-entry matrix with source URLs and evidence levels: `public/resources/robot-data/v2026.10.28/selection-matrix.json`.
- Exact DROID transform: `9a29c832b4c81bf38401111f5e4cdddaca217581`, `robomimic/utils/rlds_utils.py`, lines 27–38. The source constructs 3 position + 6D rotation representation + 1 gripper targets. The inspected loader marks them absolute, selects two exterior views and filters successful trajectories by default. This was source inspection, not loader execution.
- Tactile-ETA source: `e7e5efbd42d3be7532ff5eb940a3cb015c2f7818`; UniVTAC data: `e1aee7b0c95543b535e0146b2de3ee1bc6ddaabd`.
- Executed output: `public/resources/tactile-icl/v2026.10.28/input-audit.json`; its inspector SHA-256 is verified by the site tests.
- Author paper results / observed input checks / proposed experiment: `claim-ledger.csv` keeps separate evidence types.
- New kits contain only RoboSkin code, reports, source references and templates. Source datasets/images are not redistributed. Source rights are stated individually and are not generalized to a mixture.
- The LeRobot 445-row / five-loader-sample result is the existing October 25 run. October 28 rechecks its pinned card; it does not claim another loader run.

The [snapshot](review-snapshot.json) binds full rendered body, title with site suffix, description, structured data, image alt text and every new linked resource hash. `feed` is null with a reason: no RSS item changes. [Snapshot checksum](review-snapshot.sha256). This file does not grant approval.

## Checks and limits

- `npm test`: 341/341 passed. Two initial Windows failures came from pre-existing LF-sensitive source slicing; unchanged source bytes were restored from Git in this isolated checkout, without changing assertions or the user's working copy.
- `npm run lint`, `npm run build`, `npm run verify:export`: passed. Export verification covers 203 sitemap routes, canonical/H1 metadata and internal destinations/anchors; 203 Markdown representations generated.
- Both ZIPs passed CRC checks; public/exported resource bytes agree; package checksums pass. Both kits were downloaded through the browser and matched their source ZIPs byte for byte. The extracted tactile kit was rerun offline against the original files: every report field except execution time matched the published output.
- All three pages were checked in the in-app browser at 1280 × 900 and 390 × 844. Headings/body fit; tables retain horizontal scrolling; anchor controls and resource destinations work. Screenshots are retained in the local run evidence. Initial Chrome screenshot timeouts were resolved by using the app preview. Long revision hashes on the narrow screen were replaced with short IDs in prose; full hashes remain in the report.
- React page review: existing server components and semantic links retained; no new hooks, client fetching or animation. Duplicate access/source links are removed before rendering to keep list keys unique.
- At the original snapshot, remote work was blocked by another task's maintenance lock. That task subsequently released its lock. This release acquired its own lock on October 28 at 02:29:36 UTC and synchronized main `c25ecf74b6c42c2afa05cc3ee518867ca5a10794`; the approved content is unchanged. Current-head remote CI remains a separate release requirement.
- Google Live/Indexed for this new revision: pending production publication. Existing indexed pages do not prove this new revision was indexed.
- New resource mappings use existing GA4 consent and fixed public IDs. Resource events record link interactions, not successful experiment execution or qualified enquiries. No new Vercel custom resource events are claimed.

## Content-publish-check

These judgments cover the three changed pages and new downloadable files at the local built-output stage, not production or human approval.

| Check | Learning | Teleoperation | Tactile comparison | Evidence |
| --- | --- | --- | --- | --- |
| C01 URL / purpose | 通过 | 通过 | 通过 | Existing routes, static output and canonical verified |
| C02 Primary intent | 通过 | 通过 | 通过 | Dataset choice / action trace / evidence comparison |
| C03 Title and H1 | 通过 | 通过 | 通过 | Final snapshot and SEO export audit |
| C04 Description | 通过 | 通过 | 通过 | No new promise beyond page contents |
| C05 Known constraints | 通过 | 通过 | 通过 | Zero new spending; no fabricated tests or removed research assets |
| C06 Useful increment | 通过 | 通过 | 通过 | Selection matrix / worked source example / executed audit |
| C07 Promise delivered | 通过 | 通过 | 通过 | Named selection routes and runnable scoped input audit |
| C08 Accurate outputs | 通过 | 通过 | 通过 | Source fields, audit output and limitations linked; no cross-study winner |
| C09 Structure | 通过 | 通过 | 通过 | Task-first navigation, tables, existing research retained |
| C10 Media | 通过 | 通过 | 通过 | Existing illustrative visuals retained; no new fake experiment imagery |
| C11 Sources | 通过 | 通过 | 通过 | Original release routes, pinned code and per-claim ledger |
| C12 Responsibility | 通过 | 通过 | 通过 | Existing editorial-team identity; no fabricated reviewer or endorsement |
| C13 Dates | 通过 | 通过 | 通过 | Substantive October 28 addition; earlier evidence dates retained |
| C14 Rendering / index | 通过 | 通过 | 通过 | Final HTML/Markdown and desktop/mobile rendering checked; production/indexed state excluded |
| C16 Internal links | 通过 | 通过 | 通过 | All destination/anchor checks passed |
| C17 Downloads | 通过 | 通过 | 通过 | Public/export hashes and ZIP CRCs pass; both ZIPs downloaded; extracted tactile code rerun offline |

C15 excluded: no translated version or language pairing added or changed. No site-specific prohibited-word list was supplied; factual limitations remain applicable under C05/C08.

Release conclusion at this record: **local built-output content checks and real human content approval pass; exact-head CI and production acceptance remain pending**. The release holds its own maintenance lock. Existing operational publishing authorization remains; approval is the current version's recorded human event, not the older PR 79 review.

After publication, record the actual production SHA and date before starting a 28-day observation window. Check index visibility and resource interactions after seven full days; compare GSC query/page cohorts after 28 complete days, keeping date/timezone and filters fixed. Low event counts and consent-limited GA4 data remain uncertainty, not zeros or proof of failure. Do not rewrite titles again without new evidence.
