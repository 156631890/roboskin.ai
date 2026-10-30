# RoboSkin structure change report

Base: `579c6d16f5d3c206b57dbb662fabba65decdc61d`. Actual editing time: 2026-10-30T09:40:10+00:00.

## Batch 1

| Page / field | Before | After |
|---|---|---|
| /sensors / title | Tactile Sensor Comparison: GelSight, DIGIT & TacTip &#124; RoboSkin.ai (65) | Tactile Sensing: Types, Specs, Comparison &#124; RoboSkin.ai (55) |
| /sensors / description | Compare GelSight Mini, DIGIT and TacTip, then shortlist tactile sensors for grasping, slip detection and insertion with source-specific limits. (143) | Tactile sensing explained: vision-based, magnetic and soft sensor types, published specs, and how to shortlist one for grasping or slip detection. (146) |
| /sensors / h1 | Tactile sensor comparison for robot manipulation (48) | Tactile Sensing — Sensor Types, Specifications and Comparison (61) |
| /robot-vla-models / title | VLA Robotics: Architecture, Open Models & Touch &#124; RoboSkin.ai (61) | VLA Robotics Models: Full Comparison (2026) &#124; RoboSkin.ai (57) |
| /robot-vla-models / description | How do vision-language-action models work? Compare VLA architectures, action chunks, open models, deployment tradeoffs and tactile feedback with source links. (158) | Every major VLA robotics model compared: parameter count, training data, open weights and whether it accepts tactile input, with links to primary sources. (154) |
| /robot-vla-models / h1 | VLA robotics: models, code and tactile feedback (47) | VLA Robotics Models: Architecture, Open Weights and Touch Input (63) |
| /robot-foundation-models / title | Robot Foundation Models: Data, Transfer & Evaluation &#124; RoboSkin.ai (66) | Robot Foundation Models (2026): Comparison &#124; RoboSkin.ai (56) |
| /robot-foundation-models / description | Compare OpenVLA, Octo, RT-2 and other robot AI models by training data, robot compatibility, code and weight access, tactile input, and evaluation evidence. (156) | Robot foundation models compared on training data, embodiment and released weights — plus which ones you can actually run today. (128) |
| /robot-foundation-models / h1 | Robot foundation models and the robot AI model stack (52) | Robot Foundation Models: What Each One Can Do (45) |
| /datasets / title | Visuo-Tactile Datasets: Downloads, Tasks & Licenses &#124; RoboSkin.ai (65) | Tactile Datasets for Robot Learning: Index &#124; RoboSkin.ai (56) |
| /datasets / description | Find tactile and visuo-tactile datasets for robot learning. Filter by sensor, robot and task; compare primary download links, license status and split design. (158) | Indexed tactile datasets for robot learning: sensor type, embodiment, size, license and download link, with the last-updated date on every record. (146) |
| /datasets / h1 | Tactile and visuo-tactile datasets for robot learning (53) | Tactile Datasets Index: What Each Dataset Contains (50) |
| /tactile-ai / title | Tactile AI: Models, Datasets & Robotics Research &#124; RoboSkin.ai (62) | Tactile AI: From Sensor Signal to Policy &#124; RoboSkin.ai (54) |
| /tactile-ai / description | Tactile AI turns robot touch signals into perception, learned representations, and action. Explore models, datasets, benchmarks, robot platforms, and Physical AI research. (171) | How tactile AI turns contact signals into robot policies: encoders, tactile foundation models and the sim-to-real gap, with cited papers. (137) |
| /tactile-ai / h1 | Tactile AI: touch data for Physical AI (38) | Tactile AI Explained: From Sensor Signal to Learned Policy (58) |
| /robot-skin / title | What Is Robot Skin? Types, Sensors & How It Works &#124; RoboSkin.ai (63) | Robot Skin: Materials, Sensors, Vendors &#124; RoboSkin.ai (53) |
| /robot-skin / description | Understand robot skin types, optical and magnetic sensing, conductive surfaces, and the steps from raw contact signals to calibrated robot feedback. (148) | Robot skin for humanoid robots: materials, embedded tactile sensing, vendor landscape and cost drivers — disambiguated from game skins. (135) |
| /robot-skin / h1 | What is robot skin? (19) | Robot Skin for Humanoid Robots: Materials, Sensing and Vendors (62) |
| /benchmarks / title | Tactile Robotics Benchmarks for Robot Learning &#124; RoboSkin.ai (60) | Tactile Robotics Benchmarks: Task Suites &#124; RoboSkin.ai (54) |
| /benchmarks / description | Compare tactile robotics benchmarks by task, sensor, robot, modality, metric, split protocol, access, and evidence boundary. (124) | Tactile robotics benchmarks compared: task suites, success metrics, hardware requirements and whether results are comparable across labs. (137) |
| /benchmarks / h1 | Tactile robotics benchmarks compared (36) | Tactile Robotics Benchmarks and Task Suites (2026) (50) |
| /physical-ai-touch / title | Physical AI Touch: Tactile Sensing Roadmap &#124; RoboSkin.ai (56) | Physical AI and Touch: Tactile Sensing Roadmap &#124; RoboSkin.ai (60) |
| /physical-ai-touch / description | Plan tactile sensing for embodied AI: choose contact signals, align robot data, test feedback and evaluate policies with a staged roadmap and source links. (155) | Why Physical AI needs tactile input, and a staged roadmap from sensor choice to closed-loop control — with the evidence behind each step. (137) |
| /physical-ai-touch / h1 | Physical AI and touch: a tactile sensing roadmap (48) | Physical AI Needs Touch: The Tactile Sensing Roadmap (52) |

## Interpretation of the supplied specification

- Exact supplied titles, descriptions and H1s take precedence over conflicting generic wording. The physical-ai-touch title and H1 retain the supplied Physical AI context.
- Keyword checks ignore letter case and accept the continuous singular substring in a supplied plural H1. Brand checks inspect the title main string, excluding the required suffix.
- Recorded modification dates come from this edit event. They do not advance on every page view or imply that underlying sources were rechecked. Per-record review dates remain intact.
- Missing values mean not published in the cited, reviewed material; no hardware measurements, pricing or benchmark equivalence are inferred.
- The requested search metrics and keyword volumes are user-provided baselines, not re-measured figures.

## Batch 1 validation

- TypeScript, production build and all eight rendered HTML acceptance checks passed.
- Schema tests: 14/14 passed; unique-model-owner regression passed.
- Full suite initially 343/345: one old mobile-label fixture corrected without removing coverage; the unchanged tutorial junction test is blocked by Windows sandbox junction creation. Linux CI remains the release gate.
- Existing model-owner export checks were updated to require one VLA-owned definition, preserving source citations and evidence-boundary checks.

## Batch 2 acceptance

Added four homepage Topic hubs before database counts, ordered research/news body backlinks with destination deduplication, and end-of-body hub links. No article source text was rewritten. The six primary navigation items are unchanged.

Production build, targeted lint, ordered-rule tests, structure acceptance and full export/on-page audit passed. The sitemap-wide scan covered all 203 pages: zero generic anchors, zero broken internal destinations/anchors, 89 marked link insertions. Exact source, destination, anchor and position are recorded in internal-links.csv.

## Batch 3: new pages and hierarchy

| Page / field | Before | After |
|---|---|---|
| /robot-grippers / title | No indexable page (404) | Robot Grippers: Types, Selection Guide (2026) &#124; RoboSkin.ai (59) |
| /robot-grippers / description | No indexable page (404) | Compare robot gripper types and sourced models by payload, grip force, interface, contact sensing and price disclosure before selecting an end effector. (152) |
| /robot-grippers / h1 | No indexable page (404) | Robot Grippers: Types, Selection Guide and Vendors (50) |
| /electronic-skin / title | No indexable page (404) | Electronic Skin (E-Skin): Materials and Uses &#124; RoboSkin.ai (58) |
| /electronic-skin / description | No indexable page (404) | Electronic skin materials, sensing mechanisms and uses, with a comparison to robot skin and source-backed limits for pressure and contact measurements. (151) |
| /electronic-skin / h1 | No indexable page (404) | Electronic Skin: Materials, Sensing Mechanisms and Uses (55) |
| /robot-tactile-sensors / title | No indexable page (404) | Robot Tactile Sensors: Models and Selection &#124; RoboSkin.ai (57) |
| /robot-tactile-sensors / description | No indexable page (404) | Robot tactile sensor models compared by sensing type, force range, sampling rate, interface and vendor, with sources and explicit unknown specifications. (153) |
| /robot-tactile-sensors / h1 | No indexable page (404) | Robot Tactile Sensor Models: Specs and Selection (48) |
| /humanoid-robot-companies / title | No indexable page (404) | Humanoid Robot Companies: Tracked Directory &#124; RoboSkin.ai (57) |
| /humanoid-robot-companies / description | No indexable page (404) | Tracked humanoid robot companies: founding year, location, robot models, tactile approach, official sources and row-level verification dates. (141) |
| /humanoid-robot-companies / h1 | No indexable page (404) | Humanoid Robot Companies: A Tracked Directory (2026) (52) |
| /embodied-ai / title | No indexable page (404) | Embodied AI: Methods and Physical AI Compared &#124; RoboSkin.ai (59) |
| /embodied-ai / description | No indexable page (404) | Embodied AI defined through perception, action and feedback: core learning methods, evaluation limits and a comparison with Physical AI. (136) |
| /embodied-ai / h1 | No indexable page (404) | Embodied AI Explained: Methods and How It Differs from Physical AI (66) |

VLA child canonical URLs remain self-referential. `/vla/models` changes its main title from `VLA Model Comparison: Tactile Inputs, Code & Benchmarks` to `VLA Model Index: Timeline and Weights`; its description and H1 remain unchanged. Timeline and concepts titles already omit the complete phrase “VLA robotics” and remain unchanged. All three receive the explicit parent link, and the hub receives the three subpage links. Their modification dates and the homepage date reflect this actual edit.

### Constraint reconciliation

The supplied embodied-AI title is 48 characters, or 62 including the mandatory suffix, despite the document’s stated count. The exact-copy instruction and strict 60-character limit cannot both hold. A clarification was offered with no answer returned; the strict length gate was applied using `Embodied AI: Methods and Physical AI Compared | RoboSkin.ai` (59). The H1 and assigned keyword/intent remain as supplied. No keyword targeting decision or new search-volume estimate was introduced.

### Content, data and rendering

The five pages are complete RSC articles with direct tables, definitions, sources and dated metadata. Four manufacturer-sourced gripper examples include payload conditions, force, interfaces, contact points and explicit price unknowns. Native HTML details groups provide type-filtered table views without client JavaScript or URL parameters. The sensor model library retains all 17 source-reviewed records and their evidence dates. Five humanoid companies have actual 2026-10-30 source checks; optional tactile hardware stays labelled optional and Figure’s historical office location is explicitly qualified. These directories state inclusion and manual, event-driven review rules, not a claim of automatic monitoring.

Electronic skin has a direct robot-skin distinction table and one mechanism overview paragraph. Embodied AI retains a long-tail methods/comparison scope. Research/news prose is unchanged apart from the separately rendered requested hub backlink and canonical model-entity link destinations. No client component, stylesheet or navigation item was added.

### 404 and verification

Page-level indexing metadata replaces inherited homepage robots/canonical defaults. Research and news retain their original explicit index/follow and Googlebot policy for valid records. Next 15 inserts noindex automatically; a narrowly scoped postbuild normalizer expresses default follow explicitly in the generated not-found artifacts, removes duplicate robots/Googlebot and homepage canonical, and preserves the Agent recovery UI. Dedicated tests cover idempotence and actual root/research/news 404 responses.

Static production build, 13-page structure acceptance, 208-page sitemap/metadata/internal-link audit and targeted regression tests passed. The protected URL contract now has 213 entries. The full local suite has one unchanged Windows junction-creation restriction after the affected postbuild fixture is updated; Linux CI is required before merging. Local browser access to the isolated preview is unavailable, so visual verification uses the Vercel PR preview. Ordinary shell outbound DNS is unavailable; the read-only production CI job runs the existing production verifier against the exact merged SHA and waits for the existing automatic Vercel deployment. No second deployment is created.

GSC export and dispositions are documented in gsc-tracking.md and gsc-url-disposition.csv. No requests to force indexation or restart validation were made. Raw rendered-HTML verification is in verify-output.txt; live output is retained as verify-output-live.txt when deployment completes.

Local server build and server Markdown comparison passed (208 public pages, 209 Markdown assets). The local HTTP probe could not connect to the started Next server in this isolated environment, so the real root/research/news 404 response check remains an explicit Linux CI gate; it is not reported as a local pass. Full ESLint completed without errors.
