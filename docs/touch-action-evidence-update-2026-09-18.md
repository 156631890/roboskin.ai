# Tactile sensing to robot action: content and availability review

## Scope and working copy

- User requested a six-study evidence review, accurate resource availability, existing-page reuse, local preview and publication under the project's existing authorization.
- Worktree: `C:/Users/Administrator/roboskin.ai/.worktrees/touch-action-evidence-20260918`.
- Branch: `codex/touch-action-evidence-20260918`.
- Verified base: `6c90a7cbc9b9658ffb5f2c47b01a4ffb28c38a4c`, matching `origin/main` and production `/deployment.json` before implementation and again before publication.
- Primary checkout contains other tasks' uncommitted work and was not edited. No outreach messages, research experiments, dataset payload downloads or new analytics services are part of this task.

## Intent and page changes

The existing `/guides/tactile-feedback-for-physical-ai` already answered how tactile signals improve physical actions and how to evaluate the loop. It now contains **From Tactile Sensing to Robot Action: What the Evidence Shows**. No duplicate `/research/tactile-sensing-to-robot-action` route was created. The existing canonical and TechArticle template remain; only dateModified is updated, with no invented first-publication date.

The guide distinguishes classification, latency and task success; analyzes all six requested studies; provides a nine-column evidence table and a short selection checklist; and separates author-reported results, reported conference acceptance and independent reproduction. It reuses existing editorial imagery, not a purported experiment photograph.

Other changes:

- `/datasets`: one new Bench2Dex simulation-data record, original authors and version fields, explicit independent license fields, and a separate STAR paper-linked candidate section. Twenty catalog entries and one separate candidate; STAR is excluded from available-file filters, catalog statistics, knowledge-graph dataset entities and Dataset JSON-LD.
- `/datasets.json` and `/releases/datasets/v2026.09.18.json`: current records, evidence, recomputable statistics and separate candidates. The September 13 snapshot remains unchanged.
- `/benchmarks`: Bench2Dex evaluation record, with simulated contact semantics, dwell-based completion, trial denominators and no cross-hand zero-shot claim.
- Existing Bench2Dex research article, slip-detection guide, tactile-manipulation page and directory pages link back to the expanded guide. The guide links to the corresponding actual records and sections.
- Dataset CSV exports preserve the new provenance fields. Dataset JSON-LD uses verified original authors when available, omits unknown dataset licensing and uses a manifest URL without inventing a direct payload contentUrl. Methods in the guide and the STAR candidate do not receive Dataset schema.
- Knowledge-graph contract and machine-readable introduction reflect one new dataset and one new benchmark: 193 entities, 252 sources, 582 edges. The two records add seven supportedBy edges and one dataset-to-benchmark edge. The separate 30-record research-index release remains unchanged.

## Reopened primary sources

The six current arXiv records and six v1 HTML papers returned HTTP 200 on September 18, 2026. Each record listed v1 only at inspection. The machine-readable source audit records URLs, statuses and source HTML hashes in `touch-action-source-audit-2026-09-18.json`; full source captures remain ignored under `.artifacts/touch-action-sources/`.

| Study | Version / first submission | Reviewed evidence and limits |
| --- | --- | --- |
| Bench2Dex | 2609.15726v1 / September 14 | Methods, Sections 3–4, Appendix D, official project, GitHub README/LICENSE, Hugging Face dataset/asset/model manifests. 12 hand embodiments, 26 settings, ~1,300 simulated demonstrations. 50 rollouts per setting/channel/policy, 20,800 evaluations. Main comparison is not a tactile ablation. |
| SlipSense | 2609.15910v1 / September 14 | Sensor specification, labeling, Tables 1–2, Sections 5–7 and deployment appendix. 37 objects and >1.4M frames; ~96.7% default-window Macro F1. 76% within 23.1 ms including inference is not a maximum or full-loop time. Separate 100-pull experiment prevents 95 losses; detection-to-peak-force ~50 ms. Active-motion latency unresolved; TacV5 transfer is not arbitrary sensor transfer. |
| Touch2Trace | 2609.15921v1 / September 14 | Tables 1 and 3, Section 5 and frequency/history appendix. Matched TF-GMM 60 Hz result 0.2→20.1 cm; SR@10 93%, SR@20 57%; three seeds and 30 trials per condition, <5 s aborted starts excluded. Twelve demos / 10.1 min; frozen encoder outperforms fine-tuning in this setting. Frequency/history confound and fixed-hand scope explicit. |
| Visible Touch | 2609.14156v1 / September 12 | Section 4.2, Appendix F/Table 15 and official project. Thirty trials per condition/task; final tube insertion 0→16/30, charger insertion 2/30. Subtask picks are not complete-task success. Sensor/camera geometry and training still needed. |
| STAR | 2609.12549v1 / September 11 | Sections IV–VI, Tables I/III, robot/training appendix and `https://stardex-web.github.io/Star/`. 200 h / 10,576 trajectories / 65 tasks; timestamp alignment to 30 Hz, not raw tactile sampling. ~61% after 100 post-training demos per task; 20 evaluations per task. Evaluation objects occur in post-training. |
| PredTac | 2609.15198v1 / September 14 | Hardware, IV-F, Table III, V-C and limitations. Three real tasks × 30 trials/condition; 70.0% predicted vs 72.2% measured. Predictor requires tactile supervision; Barbed model sizes and update counts differ; descriptive proximity is not equivalence. |

SlipSense, Touch2Trace and Visible Touch arXiv comments report CoRL 2026 acceptance. Conference proceedings were not independently verified. No peer-reviewed acceptance was verified for Bench2Dex, STAR or PredTac. No independent reproduction of any six studies was established.

Visible Touch's project still shows anonymous/submitted wording and a 28.9-point miniVLA fine-tuning gain, while v1 reports 25.3 points. The review uses v1 consistently and states the discrepancy. The tube/charger final-stage counts agree. No working code or dataset link was identified on the reviewed project page.

No separate official project or code/data release is linked in the reviewed SlipSense, Touch2Trace or PredTac records. A supplemental HTTP search returned a Google shell rather than results and is not treated as evidence that no release exists. Their availability remains **unverified**, not categorically unavailable.

## Resource audit

- Bench2Dex code: `f96a8b2b4eb475483af66e9e03916b35bc43f1be`; root MIT license reopened and confirmed.
- Demonstrations: `Bench2Dex/teleopdata`, revision `b195787c65046083e6a43776b67bdf1389dfa3eb`; public and ungated. Provider manifest lists 5,201 paths, including 5,200 HDF5 paths and `.gitattributes`. These paths are not a verified unique-demonstration total. No top-level dataset card or license was found.
- Assets: revision `bf65215f844d1fca30750e4cc70d7266650abf0a`; no collection-wide license confirmed. Upstream assets may have separate terms.
- Policy weights: revision `773e65842bd36de1cbe951b0f52c865a87d41732`; no top-level weight license/model card confirmed.
- STAR: project and paper confirmed; no dataset download, released split manifest, code or dataset license verified. Candidate only.
- No HDF5 payload was downloaded, inspected for integrity, used for training or independently reproduced. Split protocols are distinguished from inspected split membership. Unknown metadata is not inferred.

## Validation

- 190 tests passed, including new checks that candidates stay out of Dataset schema/counts and code licensing is not inherited by publicly listed datasets.
- ESLint passed.
- Next.js production build and TypeScript checking passed; 132 agent Markdown representations generated.
- Static-export verification passed: 123 sitemap URLs, 127 protected URL entries, five noindex routes, 193 graph entities, 30 research-index entries, 50 RSS items.
- Six changed page routes have one H1, expected canonical, resolving internal links and fragment targets. Eighteen distinct external references on the guide returned HTTP 200.
- Rendered guide has nine evidence columns and six study rows, TechArticle JSON-LD and no Dataset node. Dataset page has 20 Dataset nodes; Bench2Dex lists its 24 original authors, version and manifest URL without a dataset-license claim; STAR has no Dataset node.
- Browser checked at a requested 1440 px desktop viewport (effective CSS width 1309 at the existing zoom) and 390 px mobile viewport. No document-wide horizontal overflow. Table scrollLeft changed to 450 inside its own region. Candidate remains separate and readable on mobile. Screenshots and DOM evidence retained in `.artifacts/`.
- Windows Git line-ending conversion initially caused source-parser and unchanged PDF-hash failures. Only untouched files in this isolated worktree were restored to their original Git blob bytes; no assertions were weakened and the PDF was not changed. A prior guide metric-topic assertion was retained through substantive evaluation guidance. Count fixtures were updated for the actual new graph records.

Local preview: `http://127.0.0.1:3218/guides/tactile-feedback-for-physical-ai` via the project's static preview server. Its form endpoints do not send requests. Production publication follows the existing Vercel workflow; final commit, deployment and production-page checks are retained in `.artifacts/release-receipt.json` after publication.
