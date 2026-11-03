# Sensor-system interpretation evidence — November 3, 2026

Schema: content-workflow/v1. Parent goal: individual review of every existing RoboSkin URL. This pass covers eight existing research interpretations; it does not complete the whole-site goal.

User authorization permits routine content changes and normal publication. Independent human factual sign-off remains pending; no human reviewer, laboratory work or reproduction is invented. No datasets, code, source images or paid services were downloaded or executed.

## Source-to-claim review

| Existing interpretation | Primary evidence read | Correction and decision value |
| --- | --- | --- |
| Magnetic calibration, arXiv 2405.18582v1 | Full May 28, 2024 preprint; setup, calibration and Table I | Separate robot/F-T reference setup, calibration without optional silicone pad, random split and squared-error units from absolute error or cover-ready accuracy |
| eFlesh, arXiv 2506.09994v1 | Full June 11, 2025 preprint; design, interference, consistency and limitations | Under-$5 magnet cost is not complete sensor cost; convex geometry, material/magnet coupling and limited consistency/interference tests belong in adoption scope |
| GenForce, Nature Communications s41467-026-68753-1 | Full January 28, 2026 paper; methods and limitations | Source force calibration, material priors and target location-paired images remain necessary; 132 synthetic marker pairings are not physical sensor trials; spatial representation constraint retained |
| DexSkin, arXiv 2509.18830v1 | Full September 23, 2025 preprint; section 4.2, Table 3, Appendix A.5 | Response alignment and per-taxel force calibration have different costs; 13/20→18/20 initial reorientation and 5/20→14/20 recovery are separate reported stages, not one success metric |
| Fluid-based skin, ROBOMECH 10.1186/s40648-025-00326-1 | Full November 1, 2025 paper; experiments and discussion | Pressure detection, thermal display and robot response are separate functions; channel ambiguity, gaps and flow coupling limit localization claims |
| Graphene/liquid metal, Cambridge research report | March 5, 2026 official institution report | Bound claims to described materials, electrode reconstruction and demonstrations. Publisher methods were inaccessible through the research tool; omit unverified performance and superiority metrics. Static shear is not itself proof of slip |
| F-TAC Hand, Nature Machine Intelligence s42256-025-01053-3 | Full June 9, 2025 article; system, coverage and methods | Full-hand name does not mean full coverage: approximately 70%, 17 sensors; 0.1 mm/pixel is visual scale, not force accuracy. Added task-led coverage review |
| Event-based optical touch, Frontiers 10.3389/fnins.2025.1735068 | Full paper, publisher date January 23, 2026; results/discussion | DOI/volume year is not publication date. Conditional localization error requires valid-estimate denominator; microsecond event capability does not establish complete-system latency. Separate sparse traffic and complete-system power |

All accessible source copies, timestamps, status and hashes are retained locally in batch49. Public ordinary HTTP requests returned full articles for the above paper sources; no authentication, CAPTCHA or access controls were changed. A Cambridge report is explicitly not treated as full publisher methods.

## Open evidence gaps, not completed reviews

Publisher sources for single-material skin, bimodal temperature/pressure, self-healing multimodal skin and large-area flexible arrays returned HTTP 403. The ROS release overview returned an access-denial page despite HTTP 200. These readings were not counted as successful full-source review, and no challenge was solved. The separate public ros2_control release-notes page was readable and can support a later, scoped software pass. Other official routes already linked from existing pages may be evaluated separately; unavailable content is not reconstructed.

## Intent and four editing passes

The existing eight URLs continue to own their paper-specific interpretation intent. General calibration, selection and slip concepts link to established guides instead of new competing pages. No search volume, rankings, low-competition claim or fabricated commercial outcome is supplied.

1. Facts: checked source dates, measurement type, conditions, denominators and limits. Unknown availability, production lifetime, licensing and independent reproduction stay unknown.
2. Depth: each interpretation answers an adoption question and adds a distinct comparison or acceptance framework. New tables are original editorial analysis, not additional experimental results.
3. Expression: remove generic editorial strategy and unsupported human-equivalent/readiness language. Separate reported results from proposed checks. Do not pad each article to a fixed word count.
4. Structure: preserve H1, URLs, original publication dates, old H2 anchors, images and source destinations. Retain and strengthen useful modules. Use real November 3 review dates, specific descriptions and contextual links to existing resources and research services.

## Release gates

Only blog content and evidence/register documents change. Fixed research records, dataset counts, application code, tests and unrelated PRs remain untouched. Required checks: existing tests/lint/build/export/SEO; per-page body and original module/link preservation; metadata, canonical, robots, sitemap, structured dates, HTML/Markdown; actual internal destinations; desktop/mobile rendering. Merge with exact reviewed head under normal protections, await the existing production deployment, and verify deployment SHA plus exact live body. Actual release results belong in the local release record. No outreach or GSC request accompanies this change.
