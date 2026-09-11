# Tactile research content batch — September 11, 2026

## Purpose and selection

Publish four distinct English pages in the existing RoboSkin.ai editorial template, with primary-source evidence, quantitative tables, explicit experiment boundaries, and contextual internal links. This responds to the owner's request for real topical news and laboratory evidence. It is not a claim that adding pages will fix indexing or guarantee search traffic.

The preceding [indexing audit](indexing-audit-2026-09-11.md) found 101 of 110 sitemap URLs indexed in the September 4 Search Console report. The `site:` operator is not an exhaustive index count. Evaluate this batch separately through discovery, crawling, indexing, impressions, and clicks.

| New URL | Reader question | Source status and date |
| --- | --- | --- |
| `/news/fibtac-pneumatic-fiber-gripper-tactile-sensing-2026` | What does pneumatic fiber sensing demonstrate in air, liquids, and underwater tests? | Peer-reviewed npj Robotics paper, August 31, 2026 |
| `/news/twins-aist-body-surface-tactile-demonstrations-2026` | How can a demonstration system capture contact on the arms and chest, and what is released? | AIST authors' preprint, August 3, 2026; hardware checked September 11 |
| `/research/tacprint-wearable-tactile-contact-reproduction-2026` | Does reconstructed contact geometry improve a robot's grasp, and under which protocol? | arXiv v1 preprint, July 31, 2026 |
| `/research/tacverse-cross-sensor-tactile-dataset-2026` | Which sensor-transfer results, data, code, and splits can a lab inspect? | arXiv v1 preprint, June 24, 2026; artifacts checked September 11 |

All four RoboSkin publication/review dates are September 11, 2026. Original publication dates remain explicit in the articles. Existing illustrative covers are reused; they are not laboratory photographs. The site templates retain static HTML, canonicals, article structured data, author/source panels, topic routes, related articles, and mobile table scrolling.

ViTaR and EmArm were also considered during primary-source research, but existing directory/topic coverage made them weaker choices for this small batch. No search-volume or ranking forecast is asserted. The existing site's English research audience and tactile scope determine the output language and topic boundaries.

## Primary-source audit

### FibTac

- Paper: https://www.nature.com/articles/s44182-026-00112-0 — DOI 10.1038/s44182-026-00112-0; Purdue affiliations and August 31 publication date checked.
- Lab: https://www.purduemars.com/research
- Code/evaluation instructions: https://github.com/xvvzhang/FibTac/tree/3f2d29848c1d0eeddd89605259a19d1188241bb0
- Kept four classification cohorts separate: chess 20 online trials total; liquids approximately 97.5%; granular media approximately 90%; four underwater objects 100%. Article records class counts and clip/test protocols.
- Payload up to 186 g and more than 3,000 actuation cycles are author-reported laboratory observations, not industrial ratings.
- Flow collection has 7 angles × 20 levels × 12 clips; reference units are L/min, not m/s.
- Repository describes validation/test assets and checkpoints, not a full training-data release. Paper and README point to different Drive folders; contents were not downloaded or reconciled. No root code license identified.

### TWINS

- Paper: https://arxiv.org/abs/2608.01733 ; https://arxiv.org/html/2608.01733v1
- Project: https://mmurooka.github.io/twins-project-page/
- Hardware: https://github.com/isri-aist/TWINS-Hardware/tree/fe9b8090edd8601798dbc618e1d9a9711a8c9697 — root CERN-OHL-W-2.0 license checked.
- 2 × (15 + 45 + 18) + 63 = 219 physical cells; two measurements per cell = 438 channels. Acquisition 10 Hz.
- 10 demonstrations × 4 tasks = 40, single operator with assistant. Under 30 minutes refers to each ten-demonstration set.
- Tracking MAE 0.94°, 95th percentile 3.43°, delay approximately 0.4–0.6 seconds; these are not task-success statistics.
- Evaluation is qualitative. No task-success denominator or matched tactile-off baseline supports a quantitative tactile uplift claim.
- Chair-supported wearable, not a walking full-body suit. Hardware repository exists; project learning code remains “Coming soon.” Linked fabrication assets were not all downloaded; hardware and policies were not reproduced.

### TacPrint

- Paper: https://arxiv.org/abs/2607.29231 ; https://arxiv.org/html/2607.29231v1
- 24 physical capacitive taxels predict a 35 × 26 depth map. Dense prediction is not 910 physical measurements.
- Simulation-reference results: contact RMSE 0.223 ± 0.161 mm, centroid 1.213 ± 2.379 pixels, IoU 0.829 ± 0.169.
- Physical center depth: 0.085 ± 0.057 mm across 40 trials. Primary position: 0.250 ± 0.208 mm across 37; all 40: 0.285 ± 0.240 mm. Three boundary-truncated reference regions are excluded only from primary position measurement. ± denotes SD.
- Experiment 3: contact-only 15/40, raw taxels 27/40, dense depth 35/40. Edge subset: 4/20, 9/20, 17/20. Dense versus raw = +20 percentage points overall, +40 points at the edge. Edge trials are a subset, not additional trials.
- Success requires 50 mm lift and five-second hold on an orange model. Estimates are averaged over five seconds; adjustment count is uncapped. Dense depth uses more average corrections among successes (2.14 vs 1.07), so no faster-control claim is made.
- Separate LinkerHand replay results do not have clear trial denominators in the reviewed text and are not merged with Experiment 3.
- No official downloadable code/data release identified in the reviewed paper/record. No independent sensor build, data access, or replication.

### TacVerse

- Paper: https://arxiv.org/abs/2606.25877 ; https://arxiv.org/html/2606.25877v1
- Project: https://lannwei.github.io/Tactile_Database/
- Code: https://github.com/LannWei/Tactile_Database/tree/abe33c1e896d9529f0798cc75e36a63da9753e79
- Data: https://huggingface.co/datasets/Lan-2025/Tactile — metadata revision 0bc27afe0d8f6c878b79e1eb0825255541ccaceb; public listing, `gated: auto`, card license `cc-by-4.0`. Anonymous raw README returned HTTP 401. No gate was bypassed and no bulk dataset was downloaded.
- Seven paper-reported sensor counts sum to 106,800: 16,917 + 15,487 + 16,892 + 12,496 + 11,000 + 11,000 + 23,008.
- Task totals are another breakdown of the same data: 30,094 + 40,509 + 36,197 = 106,800.
- Tables 2/3, source GelSightMarker: shape within 95.5%, transfer to GelSightNoMarker 98.1%; grating within 90.3%, transfer to GelSightNoMarker 24.8%, MagicGripper 5.4%, ViTacTip 4.1%.
- Table 5 is a separate representation study: GelSightMarker shape ImageNet 95.8%, MAE 84.8%. No universal MAE advantage is claimed.
- Shape has exhaustive 7 × 7 transfer; grating and force have fixed sources. Few-shot is force-only and also uses labelled target validation.
- Paper describes whole-trial chronological 60/20/20 splits. Reviewed code partitions sorted `sample_id` values; mapping these identifiers to complete physical trials remains unverified without the gated raw files. This is not a finding of leakage.
- No root code license identified; dataset-card license is not extended to code. Existing dataset, benchmark, and topic-page access statements were updated and linked to the new article.

## Local evidence and verification

Primary HTML, extracted text, source searches, repository metadata, and code excerpts are saved locally under `.artifacts/content-research-2026-09-11/` (ignored by Git). These are supporting evidence, not redistributed research datasets.

The content adds four protected URLs. TacVerse's three official artifact URLs add three deduplicated source documents and five support edges. Generated output confirms 248 sources, 574 edges, and 329 support edges. The curated research-index entity inventory remains at its existing scope.

Pre-publication verification passed: 166 tests, ESLint, Next.js production build, and static-export verification covering 114 sitemap URLs, 118 protected entries (including five redirect sources), 191 graph entities, and 50 RSS items. The four rendered articles have one H1 each, the correct production canonical, complete tables, and internal targets that resolve in the export. Key sensor/image totals and success-rate differences were checked arithmetically. Browser checks at 390 px confirm no page-wide horizontal overflow; wide tables scroll inside their containers. Desktop and mobile screenshots are retained with the local evidence.

Release verification and submission outcomes are recorded in the dated release receipt after production checks. Submission acceptance must not be described as Google indexing or ranking.
