# Sensing integration editorial pass — evidence and boundaries

Schema: `content-workflow/v1`. Parent: site-content-depth-programme-20261103.md.
English pages for robot integrators and laboratories; primary outcome is a more
qualified research/evaluation decision, not a fabricated search metric.

## Scope and intent

Eight existing URLs retain their independent tasks: array integration, slip
evaluation, gripper trials, deforming surfaces, skin terminology, component/system
ownership, first contact signals, and output contracts. No new URL or duplicate
selection article. PR102 remains the owner of general selection and calibration.
Current parent SHA: 3323f05f17d719904c5095873c12f4a54182ba18.

## Evidence ledger, checked 2026-11-03 UTC

| Claim | Primary source and location | Scope and editorial use |
|---|---|---|
| Slip performance depends on window/rate/material/speed/instance | NIST Van Wyk/Falco 2018 publication and linked paper, abstract/methods: https://www.nist.gov/publications/slip-detection-analysis-and-calibration-univariate-tactile-signals | Historical three-technology evaluation; no present commercial ranking or claim that detection guarantees recovery |
| Partial versus full scanning | OpenTac v1, §4.7: https://arxiv.org/html/2610.31661v1 | 1,024 taxels; 67 full frames/s versus 1,286 partial updates/s at 16 taxels; no whole-system/control-rate inference |
| Flexible does not establish stretchable | OpenTac v1, §3 | Planar/developable flex-PCB surface boundary; no universal geometry claim |
| Spatial calibration differs from load calibration | Moussaoui et al. 2023, §3–5: https://pmc.ncbi.nlm.nih.gov/articles/PMC10181520/ | 6×22-cell HRP-4C wrist study; 4.2 mm mean reference error, 1.7 mm excess over ideal-cell estimate, smooth-surface limits |
| Mechanics and electronics both affect the installed system | Maiolino et al., §I/III/IV: https://arxiv.org/html/1411.6837v1 | iCub capacitive skin; specific compensation and mechanical design do not transfer as device-independent performance |
| Large-area prototype does not prove arbitrary multi-contact resolution | Xu et al., March 25 2026 abstract/results: https://www.nature.com/articles/s41528-026-00563-3 | 60,000 mm² prototype, non-adjacent multi-point loads; no universal robot or human safety conclusion |
| DIGIT demonstration scope | Lambeta et al. 2020: https://arxiv.org/abs/2005.14679 | Optical sensor and glass-marble in-hand learning; no arbitrary gripper compatibility or benchmark transfer |
| E-skin can include more than a passive film | CMU Softbotics: https://engineering.cmu.edu/softbotics/research/electronic-skin.html | Research scope includes processing/communication/interfaces; taxonomy is an explicit editorial convention |
| Event-to-action timing, trial ledger and responsibility tables | Original editorial analysis using the above measurement distinctions | Proposed decision tools, not performed experiments, standards or certification |
| 50 samples at 1,000 samples/s | Arithmetic example explicitly labeled illustrative | About 50 ms history; not observed sensor latency or a paper's test result |

Search-result inspection used the English task phrases “tactile slip detection
evaluation window size sampling rate unseen objects”, “flexible tactile array
robot skin spatial resolution scan rate calibration”, “robot gripper tactile
sensor integration evaluation contact slip” and terminology comparisons.
Comparable result types included NIST's experiment, the 2024 learned slip-severity
paper (arXiv:2411.07442), sensor vendor documentation, the HRP-4C calibration
paper and CMU's electronic-skin overview. These cover methods, devices or broad
concepts; this pass adds task-specific handoff records and evidence boundaries.
No exact rank, market-volume/KD or zero-competition conclusion is claimed.
Only primary sources support new technical claims.

## Four editorial passes

1. Facts: distinguished raw/derived outputs, partial/full sampling, slip/recovery,
   reported/illustrative numbers, and total/excess calibration error. Removed the
   universal “biggest failure” claim and passive-film-only e-skin definition.
2. Decisions: each new section has a different job. The slip page owns event labels
   and recovery; the gripper page owns trial phases and pad confounding; the array
   page owns geometry and readout; the soft-skin page owns deformation confounding.
3. Expression: replaced editor-facing FAQ questions with user questions. No fake
   customer case, expert quote, price, experience or performance claim. Retained
   valuable existing sections rather than replacing the page wholesale.
4. Search/conversion: contextual links connect each prerequisite to its actual
   owner page; existing source links, anchor IDs, visuals and downloads remain.
   Research-service link describes source research, not physical qualification.

Independent human fact review remains pending; no human signature is claimed.
Codex source checks and standing publication authorization are recorded separately.

## Release and measurement

Keep original H1/title/URLs, schema types and unknown publication dates. Set only
dateModified/lastmod for changed pages. Preserve prior sections and document exact
text corrections in the task record. Test rendered HTML and Markdown, old links,
image presence, heading hierarchy, all internal destinations/anchors, mobile and
desktop. Run the repository tests/lint/build/export/SEO, exact-head CI and final
production contract. Commit only content and editorial records.

No new tracking, GSC request, outreach or paid report. Reassess relevant query/page
performance after a complete 28-day window if authorized first-party data is
available; no outcome is implied by publication. Stop further batches if factual,
indexing or module-preservation regressions appear. Revert this PR through the
normal protected workflow if needed; never restore an old snapshot over later work.
