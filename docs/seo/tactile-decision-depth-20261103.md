# Tactile selection and calibration depth — 2026-11-03

Format: content-workflow/v1. Owner: existing multi-site content task.
Base: 531a638d42eb3cb205420c36f83e8bab908475a4 (matches production at preflight).
Skill: latest user seo-geo, including the November 3 content-workflow revision.

## Project and intent

English research resources for robotics engineers, integrators and laboratories.
Primary business outcome: a qualified, appropriately scoped research-services inquiry.
Secondary outcome: useful worksheet downloads. No traffic, ranking, inquiry-volume,
search-volume or keyword-difficulty data was available in this pass.

One existing URL per intent:
- /guides/how-to-choose-a-tactile-sensor: evaluate and shortlist hardware.
- /guides/tactile-sensor-calibration: define, validate and release a calibration.

No new article URL. The hardware directory, hand taxel-density application page
and TacO benchmark guide retain their distinct comparison/detail roles.
PR36 and PR6 were read and do not touch these content sources. The old
roboskin-release checkout has unrelated dirty work and was not edited.

## Question coverage and incremental value

| Reader question | Previous coverage | Added answer |
|---|---|---|
| Can I compare pixels, taxels, newtons and Hz? | General cautions | Specification/evidence/remaining-unknown matrix |
| Where does response delay enter? | End-to-end timing recommendation | Sample/receipt/estimate/command/response chain, clock and stale-data checks |
| Which candidate should pass a shortlist? | Small acceptance trial | Hard gates vs preferences, confounders, two explicitly hypothetical decisions |
| What does a calibration transfer claim require? | Hold out contacts/sessions | Five-row validation matrix by claim and changed condition |
| Does low mean error establish accuracy? | Bias/MAE/RMSE definitions | Zero-bias arithmetic counterexample, invalid denominators and uncertainty distinction |
| When is zeroing enough? | Maintenance cautions | Reuse/check/refit/hold decision table and bounded release statement |

English public search observed November 3; search tool location was not fixed to
a country, so this is an exploratory comparison, not a US ranking report.
Three comparable resources inspected: PPS calibration white paper, Costanzo et
al. sensor calibration study and Trossen's tactile-control guide. PPS covers
surface measurement/calibration; Costanzo reports a specific design/procedure;
Trossen explains sensing/control and task evaluation. The new contribution is
an original, linked decision record connecting selection gates to claim-specific
calibration validation. No claim of unique coverage or zero competition is made.
The PPS evaluation article itself failed direct retrieval; only its search
snippet was observed, and it is not treated as a fully reviewed source.

## Claim/source ledger

All new references reviewed 2026-11-03. Literature is not a RoboSkin experiment.

| ID / use | Primary source and location | Scope and boundary |
|---|---|---|
| C1: pressure vs force/contact area | https://pressureprofile.com/calibration-white-paper, overview | Vendor technical discussion; not a universal commercial-modality taxonomy or vendor accuracy endorsement |
| C2: interface changes achievable acquisition timing | https://pmc.ncbi.nlm.nih.gov/articles/PMC6412380/, §2.5 | Authors' 2019 optical taxel system; no rate transferred to DIGIT/Mini |
| C3: task, representation, material confounders | https://arxiv.org/html/2605.21976v1, abstract, experiments, §6 | May 21, 2026 preprint; not a universal sensor ranking or a new release |
| C4: spatial and object validation | https://arxiv.org/html/2511.03078v1, §III-A/IV/V | DIGIT/Mini gradient/depth work; force reference integration remains future work in this version |
| C5: uncertainty types vs random/systematic | https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-2-classification-components-uncertainty, §2 | General metrology guidance, not a tactile sensor certification standard |
| C6: measurement model/correlations | https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-5-combined-standard-uncertainty, §5 | Do not add residual MAE and certificate uncertainty as interchangeable quantities |
| C7: coverage conditions | https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-6-expanded-uncertainty, §6 | Archived NIST guidance; no blanket 95% or safety claim |
| C8: nonlinear pad mechanics/loading history | Costanzo et al. above, §2.4/3 | Different sensor implementation; no numeric hysteresis claim for DIGIT/Mini |
| E1: timing record, gates, scenarios, worksheets | Editorial engineering synthesis, grounded in C1–C8 | Proposed workflow, not an executed experiment or formal standard |
| E2: residual example | Explicit hypothetical arithmetic: ±0.4 N, equal counts | Bias 0; MAE=RMSE=0.4 N; no hardware or customer result |

ROS documentation returned an access-denied protection page. No bypass was
attempted and no new ROS interface/version claim relies on that failed read.
Existing original tutorial source-review dates remain separate from this update.

## Four editing passes

1. Facts: primary-source conditions checked; omitted sensor rankings, rates,
   universal thresholds and commercial availability. Corrected creep versus
   stress relaxation to distinguish constant-load and constant-deformation tests.
2. Reader decisions: added falsifiable gates, specific unknowns and next evidence,
   not only longer explanations. Worksheets are header-only and carry no results.
3. Expression: English, defined quantities, concrete examples, no invented
   expert quotes or claimed hands-on experience; retained original useful content.
4. Search/conversion: existing URLs and H1s, updated descriptions/dateModified,
   nested H3s, reciprocal contextual links, original downloads plus new blank
   records, and the existing research-service route with physical-testing limits.

Review performed by Codex against the cited sources. Independent human fact
review/sign-off has not occurred and is not claimed. User publication authority
is recorded separately in the existing task; it is not evidence of human review.

## Preservation and verification plan

Preserve all old section IDs, paragraphs, tables, FAQs, imagery, original CSV
contracts, author/published dates, related links, forms and schema types. Metadata
descriptions, revision notes and modified dates intentionally change. The shared
ProgrammingArticle renderer gains optional H3 subsections; pages without that
data retain their existing output. Check representative other tutorial HTML.

Run existing tests/lint/build/export/SEO and exact-head CI. Verify both rendered
pages, old content, heading hierarchy, downloads, internal/source links, canonical,
robots, sitemap membership/date, schema dates and desktop/mobile presentation.
Production must match the merged source and /deployment.json before claiming live.
No outreach, paid report, model API experiment, new GSC request or account change.

Measure after a complete 28-day window: relevant query/page impressions and clicks,
worksheet use if an existing event is available, and qualified service inquiries.
No new tracking or automation is created. Fail/rollback triggers: content loss,
incorrect evidence, broken downloads or indexing regression attributable to this
change. Revert this content PR through the normal workflow to the recorded base;
do not restore an old site snapshot over later unrelated work.
