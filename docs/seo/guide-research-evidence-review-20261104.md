# Combined guide and research evidence review

November 4, 2026. Sixteen individually reviewed existing URLs. Draft groups60–64 are combined into one release to avoid repeated deployments; they are not separately released or counted. Human fact review pending. No new hardware, model or API experiments.


---

# Three existing guides: evidence after a successful setup

November 4, 2026; content-workflow/v1; the existing whole-site programme. No project installation, paid API, model request, new dataset payload or hardware test. Human factual sign-off pending. Preserve earlier actual test records with their original dates; this review does not rerun or relabel them.

## Owners and incremental decisions

- /guides/aspire-libero-pro-setup already explains host requirements, structural validation and saved-state wrapping. Add a small evaluation-stage table: discovery attempts, frozen-program evaluation and online adaptation are distinct denominators. Retain the v1.0 setup pin and separate it from the evolving project gallery; do not replace a documented setup with unexecuted current commands.
- /guides/lerobot-dataset-format already contains substantial actual, dated numeric and video checks. Preserve those assets and claims. Add the next missing step: a temporal sample at an episode boundary can contain padding, even though every raw row is valid. Explain which source behavior was inspected and how to review it without claiming a new loader experiment.
- /guides/3d-printed-tactile-sensors already distinguishes four fabrication routes. Add evidence levels for within-print decoding, replacement-print calibration and new geometry. This turns the existing general repeatability advice into an explicit experiment choice; avoid a second OpenTac summary.

## Sources inspected

ASPIRE: https://github.com/NVlabs/ASPIRE/blob/fa00f0ef2bc1d91d594b9aa502c22133c9f538f7/docs/libero-pro.md and docs/host-setup.md read in full. Structural smoke/nightly, saved versus seeded, GPU and gated-access explanations remain correct for that pin. https://arxiv.org/html/2607.00272v1 sections2.3/3.1/3.3 distinguish search from one selected program per task on held-out seeds; BEHAVIOR uses incremental block execution. https://research.nvidia.com/labs/gear/aspire/ now shows additional model/cost and online robot demonstrations with differing subsets; a dynamic gallery is not the pinned v1 protocol. No new benchmark number is necessary. No sandbox, API or physical claim.

LeRobot: https://huggingface.co/docs/lerobot/en/lerobot-dataset-v3 still contains the tasks.jsonl versus inspected implementation discrepancy, so keep its existing warning. Read v0.6.1 src/lerobot/datasets/lerobot_dataset.py and dataset_reader.py through official GitHub and the authorized GitHub API. DatasetReader._get_query_indices clamps requested indices to the current episode and emits per-feature *_is_pad booleans; get_item merges the flags. LeRobotDataset.__getitem__ delegates temporal expansion, video and transforms; get_raw_item does not. Source copies are retained locally, not executed. https://github.com/huggingface/lerobot/blob/v0.6.1/src/lerobot/datasets/dataset_reader.py is the new citation. Added example is a clearly hypothetical three-row window, not an observed run or statement that every downstream trainer honors masks.

Printed sensing: https://arxiv.org/html/2609.11077v1 sections5.3/8.3/8.4/9 reread. Same-geometry S2 and drifted S1 are single-DOF specimens; labeled camera calibration improves their reported errors. This is not arbitrary-geometry zero-shot transfer, full matrix force calibration, or multi-DOF lifetime validation. No need to add numerical errors. https://pmc.ncbi.nlm.nih.gov/articles/PMC5905869/ and https://hiro-group.ronc.one/gentacttoolbox/ checked for route and scope; GenTact still marks premade STL/electronics links coming soon. Date this observation. X-Hinges is an accepted UIST manuscript dated September10; October22 coverage is not first publication. No copied/adapted figures or commercial-license inference.

## Search and editing

November4 representative queries covered LeRobot temporal windows and splits, ASPIRE initialization/evaluation, and printed sensor variability. Comparable results include official Hugging Face docs, Phospho/Trossen data guides; NVIDIA's project, original paper and secondary ASPIRE reporting; original X-Hinges paper, Hackster and Fabbaloo fabrication summaries. Use primary material for technical claims. Existing pages already cover much of the common material; additions are bounded decision aids, not keyword padding. No measured search volume, localized rank, three independent matched benchmarks or traffic forecast.

Four passes: source/conditions; concrete reader decisions; readable nonrepetitive prose; metadata and truthful CTA. Existing original dates, headings, images, download assets, links and completed-test evidence must remain. Check rendered hierarchy, canonical/index/sitemap/schema, all internal destinations, desktop/mobile and production body/source identity. Shared technical checks do not complete individual factual review of other URLs. No outreach or GSC.

---

# Existing benchmark and world-model guide review

Workflow: content-workflow/v1. Reviewed November 4, 2026. Target: English-speaking robot integrators and researchers evaluating experimental claims. Existing canonical guides retain intent, assets, dates, anchors and conversion routes. No hardware/model/API runs, downloads, new licenses, outreach or GSC. Human factual sign-off remains pending; none claimed.

## Source and decision pass

- TacO v1, https://arxiv.org/html/2605.21976v1 : read methods and task tables. Task-specific sensor subsets and different gripper/teleoperation arrangements matter. Separately trained vision-only policies are not equivalent to masking a trained tactile input. Correct the FAQ and add an original three-comparison evaluation table.
- HT-Bench v2, https://arxiv.org/html/2606.19161v2 : read methods, Tables 2–4 and limits. Keep offline representation metrics distinct from four-task, 15-trial-per-method downstream evaluation. The retained Nature full-hand source https://www.nature.com/articles/s42256-025-01053-3 failed at the publisher's identity redirect; no bypass, new claim or full-text-access assertion.
- VT-WM v1, https://arxiv.org/html/2602.06001v1 : Sections 3.3, 4.1–4.3 distinguish relative trajectory-error reductions from open-loop planning. Preserve the abstract's 35% wording as a qualified source observation, not a newly computed universal effect.
- Dream-Tac v1, https://arxiv.org/html/2606.08737v1 : Section 4 and Table 1 support rounded success values and matched trial budget. Correct percentage-versus-percentage-point language. Retain compute speedups only as configuration-dependent author reports.
- TouchWorld v1, https://arxiv.org/html/2607.07287v1 : Sections 4.1–4.3 verify the existing clean/perturbation results and implementation-specific residual schedule. No invented controller frequency.
- ViTacWorld v1, https://arxiv.org/html/2607.22530v1 : Table 1 and Section 6 support the real-task evaluation scope and manual curation limitation.
- FeelWorld v1, https://arxiv.org/html/2607.24267v1 : methods/results support trial budget and CEM execution horizon. Preserve perceptual scores as perceptual scores.
- DexTouch-WM v1, https://arxiv.org/html/2609.20649v1 : Sections IV-C–E and Tables II–IV confirm the existing September discussion of normalized task scores and policy-dependent synthetic-data utility. No new claims or replacement of that section.

## Intent, editorial and SEO passes

Public English searches: “tactile sensor benchmark robot manipulation TacO comparison” and “visuo tactile world models robot manipulation comparison Dream Tac VT WM”. Comparable results included primary papers/projects, abstracts and review summaries; the existing RoboSkin guides also appeared. No search-volume, difficulty, ranking or traffic estimate is claimed. Read primary sources for facts; do not derive factual claims from competitor summaries. Increment: exact comparison design and execution contracts, rather than repeating abstract gains. Not a new URL or a leaderboard.

Retain all existing section headings, internal links, figures and source routes. Inline links next to added interpretation. New evaluation questions are editorial recommendations, not tests performed. Metadata remains truthful and the original datePublished unchanged. Run tests, lint, build, export/SEO, desktop/mobile, canonical/index/sitemap, schema, module/link retention and exact-source live verification. Rollback is the isolated content PR; whole-site review remains incomplete.

---

# Context and feedback guide review

content-workflow/v1, November 4, 2026. Existing canonical guides; no new page or experiment. Human fact review pending, not claimed. Goal remains the existing whole-site programme.

## Evidence and factual decisions

Tactile-ETA https://arxiv.org/html/2610.27613v1 : checked main task, representation and hardware tables, Appendix C execution evidence, D trial accounting and E/F hardware/tools. TacTalent https://arxiv.org/html/2610.26846v1 : checked input/control method, benchmark sampling, table means, relaxed Grasp Chip rule, latency limits and Appendix A demonstration counts. Preserve the already detailed comparison; add a short receipt-versus-outcome record that exposes a different engineering failure. No API test or claim of physical validation.

Read the existing local input-audit.json: status pass, executed October 28, 24 segments, 96 strips, 228 panels, 695 rows and 2,780 decoded images. Preserve the versioned report, code, CSV, ZIP, citation and all links byte-for-byte. This read is not a rerun, a full upstream download or a new controller reproduction.

The feedback guide's six v1 sources were reopened: Bench2Dex https://arxiv.org/html/2609.15726v1 ; SlipSense https://arxiv.org/html/2609.15910v1 ; Touch2Trace https://arxiv.org/html/2609.15921v1 ; Visible Touch https://arxiv.org/html/2609.14156v1 ; STAR https://arxiv.org/html/2609.12549v1 ; PredTac https://arxiv.org/html/2609.15198v1 . Existing numbers stay attributed and scoped. New decision detail comes from SlipSense Appendix G's speed-dependent delay and Touch2Trace Appendix G's pooled/resized input through a frozen encoder. Neither proves a universal timing bound or an intrinsic hardware-resolution threshold.

STAR and Visible Touch project pages were inaccessible to the current web reader. Do not bypass, infer closure or assert new release/license verification. Correct the FAQ to state the date of its existing manifest/access observation. Preserve the old pinned manifest and repository review as history, not a fresh payload audit.

## Four editing passes

Facts: retain primary-paper versions, denominators, current-versus-demonstration touch, no model update, separate simulated/physical evidence and original audit date. Reader decisions: add command/measurement/outcome separation and hardware-selection caveats. Expression: compact additions, no repeat of long numerical tables or stronger claims. SEO: keep canonical intent, H1, existing anchors/figures/downloads, source attribution, research/service routes and related guides; add only contextual links.

Search intent is comparison and evaluation, not procurement pricing or a new model release. Search volumes, KD and traffic unavailable; no estimates. These additions answer practical evaluation questions without introducing competing URLs. Run the standard tests/lint/build/export/SEO and old-module/link preservation, desktop/mobile, exact SHA/body production checks. No outreach, GSC, fee, account, credential or agreement action.

Search check November 4: tactile in context learning Tactile ETA TacTalent comparison; tactile feedback physical AI SlipSense Touch2Trace benchmark. Comparable results included official papers/projects, existing RoboSkin pages, a paired-paper newsletter and vendor physical-AI explanations. No independent matched comparison was established; use primary evidence and the existing guide intent, not competitor performance claims.

---

# Five existing research interpretations

content-workflow/v1, November 4, 2026. Readers: researchers and robot integrators evaluating the methods, not a new-release audience. Preserve canonical URLs, original publication dates, existing headings, figures and source links. Human factual sign-off pending. No hardware, simulation, model, API or dataset-payload execution.

## Claim-to-source decisions

- SlipSense https://arxiv.org/html/2609.15910v1 : methods, Tables 1/2/6, hardware deployment and resolution ablations rechecked. Existing detailed labels, OOD versus ID scores and delay tails remain. Added distinction between striding original signals and testing replacement hardware.
- Touch2Trace https://arxiv.org/html/2609.15921v1 : method, main tables and appendices B/G rechecked. Added compute-deadline and changed-training-budget context. Retain all distance/SR thresholds, excluded starts, pretraining and transfer limits.
- Visible Touch https://arxiv.org/html/2609.14156v1 : geometry, magnetic hardware, real-task and appendix tables rechecked. Added a proposed replacement/configuration record. Project reader failed; historical September access and project-v1 discrepancy remain dated. No current release/license assertion.
- FeelWorld https://arxiv.org/html/2607.24267v1 : Sections III/IV and Tables I–IV rechecked. Correct ambiguous “three-dimensional latent” language; add trial protocol and separate prediction/planning horizons. Metrics remain author reports.
- HT-Bench https://arxiv.org/html/2606.19161v2 : Sections 5.1–5.3 and Tables 2–4 rechecked. Add metric-definition and evaluation-region interpretation. Retain the already documented table/prose numerical discrepancy and bounded downstream results.

## Editing and release

Existing guides compare systems; these research pages own the paper-specific implementation details. No duplicate pages. Add concrete evaluation decisions, not generic introductory padding or rankings. The existing reported results remain the authors' findings; new checklists are proposals. Dates of historical repository/manifest checks are not promoted to current validation. Reader depth, source scope, expression and SEO reviewed separately.

Preserve all old module/link routes and complete tables. Check truthful descriptions, one H1, heading hierarchy, schema dates, canonical/index/sitemap, HTML/Markdown, contextual inbound/outbound links and desktop/mobile tables. Run repository tests/build and exact-source live verification before updating the completion count. No outreach, GSC or changes to other sites. Rollback is the isolated own-site content PR. Whole-site goal remains incomplete.

## Search intent check

November 4 searches for FeelWorld tactile planning/slip, HT-Bench retrieval/OOD and Visible Touch contact overlays returned primary papers, existing RoboSkin pages, project routes and automated summaries. Generic Visible Touch and FeelWorld names also collide with display products; unrelated product pages are not evidence. The refined Visible Touch query finds the paper, current RoboSkin interpretation and independent summaries. This revision serves paper-specific reproduction decisions, while the existing comparison guides retain cross-method intent. No search-volume, difficulty, traffic or ranking claims. Facts rely on primary papers, not summaries.

---

# Four dataset and evaluation interpretations

November 4, 2026; content-workflow/v1. Existing whole-site content programme. No simulator, hardware, model call, dataset download or resource agreement. Human factual sign-off remains pending.

## Primary-source review

- DexTouch-WM: https://arxiv.org/html/2609.20649v1 and https://arxiv.org/html/2609.20649v2 . Read methods and Tables I–V, especially IV-D/E. The original v1 conclusions and mixed policy-training outcomes remain. The September 18 v2 record is now explicitly identified. Added absolute-score calibration versus correlation, using the displayed FTP-1 Place Shoes example. Correlation between two imagined environments is distinct from correlation with real outcomes. Original September 18 artifact-access observation remains historical.
- Bench2Dex: https://arxiv.org/html/2609.15726v1 , official project, and https://bench2dex.github.io/Bench2Dex-Leaderboard/ . Read collection, encoding, metrics, task coverage and current protocol text. The old leaderboard URL now returns an explicit redirect. Search cache showed an older October 27 table; the fresh canonical route has evaluation groups and changed contributor protocol text. Do not publish cached live ranking or inherited episode counts. New section identifies version, observations, actual denominator, budget and checkpoint as comparison fields. Existing pinned code and September manifest checks are not relabeled as fresh executions.
- TactiDex: https://arxiv.org/html/2607.09190v1 and https://tactidex.github.io/ . Full methods, Table 2, selected 73 sequences, Appendix B and C.3 read. 757 human sequences/49 objects, 162 tactile elements/17 Hz versus120 Hz motion capture; quantitative simulation criteria differ from physical demonstrations. PeakSafe@3N concerns force error, not a universal contact limit. Physical hands have tactile sensing but the described execution does not feed it back into the policy. The project BibTeX identifies ACM MM2026 acceptance; attribute that note to the project. Project paper/video routes do not verify downloadable data or licenses.
- RoboTacDex: https://arxiv.org/abs/2606.31836 and https://arxiv.org/pdf/2606.31836 . HTML v1 returned404; normal public PDF was readable. Read collection, Table II, Figure7 and limitations. Keep19 tasks/23 reported skills versus22 visible labels discrepancy,30 Hz storage versus100 Hz published messages and fixed-lower-body scope. Arithmetic from displayed per-task counts gives13/40,13/40,25/40; preserve the source average row as source-reported. Tactile ablation is DP/UnscrewBottle, not all policies/tasks. Current arXiv still announces a planned release; do not infer global absence of a release from search failure.

## Intent, depth and expression

Searches for TactiDex transfer, RoboTacDex download and DexTouch/Bench2Dex evaluation surfaced author papers/projects, directories, current RoboSkin coverage and the evolving official leaderboard. Search also returned unrelated datasets; they do not resolve access or licensing. No keyword metrics or rankings claimed. Retain each paper-specific page as the owner; broader guides compare methods and supply natural internal routes.

Substantial existing content remains. Additions correct an interpretation or support a concrete decision; no thin news pages or generic padding. All numbers remain author reports or explicitly labeled arithmetic, never independent performance tests. Preserve original dates, anchors, images, links and valuable failure analysis. Check metadata/canonical/index/sitemap/schema, HTML/Markdown, sources and internal targets, desktop/mobile and exact production commit/body before counting these URLs. No outreach, GSC or changes to other sites.

Regression alignment: preserve the answer-first body before the new review note. Update the RoboTacDex date assertion to the actual revision while preserving its original date; align the existing world-model source-status assertion with the reviewed preprint scope (the page includes later evidence beyond its original five-system table). No generic checks weakened.
