# Resource selection release — October 15, 2026

Base: `c5e99cd0221b379edfc721fa0818c8c326ac1d18`. The owner requested submission of important completed features. This release ports the dataset/sensor selection subset of local commit `4e6e8b8` onto current main. It does not publish the old branch wholesale. Primary-checkout edits and the old branch's uncommitted logs remain untouched.

## Scope and reader tasks

| URL | Topic and task | Page type / language |
| --- | --- | --- |
| `/datasets` | Tactile datasets: compare format, access, license, intended use and limitations | Interactive directory / English |
| `/robotics-datasets` | Robotics datasets: use the shared comparison and CSV fields | Interactive directory / English |
| `/sensors` | Tactile sensor selection: choose slip, dexterity or full-hand requirements | Interactive directory and comparison / English |

The 21 current tactile records, separate STAR candidate and ROMI-2K access boundaries are preserved. `/datasets.json` and the new immutable `v2026.10.15` snapshot add editorial selection guidance without rewriting scientific review/access dates. Prior snapshots are unchanged. The sensor worksheet has 17 columns and three blank planned-evaluation rows; it contains no invented measurements.

Selection advice is bounded interpretation of the existing source-linked records. Sensor task candidates retain their exact source records and distinguish raw signals, learned estimates and untested task performance. Lists are non-exhaustive and unranked. Dataset guidance separates simulation from physical observations, collection platforms from target robots, and paper-scale claims from hosted files. No new source download, independent reproduction or hardware test is asserted.

## Checks

- All 267 tests pass; lint, production build and export/on-page checks pass. Final output contains 192 sitemap URLs, 196 protected entries and 6 intentional noindex URLs.
- Final HTML for all three affected routes has the expected title, one H1 and self-canonical. Existing images, attribution, source links, FAQs and limitation sections remain. No duplicate element IDs remain. The new selector uses `#task-selector`; existing `#task-selection` links still reach the original evaluation criteria.
- Browser sensor filters return GelSight Mini / AnySkin / BioTac for slip; DIGIT / TacTip / DenseTact 2.0 for dexterity; ReSkin / AnySkin / uSkin for coverage. Reset restores 14 records.
- Browser dataset comparison selects UniVTAC encoder, T-Rex and EgoTouch; a fourth unselected checkbox is disabled. An empty-result search retains all three comparison cards and disables the empty results export.
- The actual browser-downloaded CSV has exactly those three rows. Intended use, limitations, audited format and dataset-file license match the new snapshot. EgoTouch's license stays unknown. The 11,529-byte local CSV filename includes `.html` because the preview uses exported HTML paths; canonical production routes retain the normal filename.
- At an observed 390 CSS-pixel viewport, dataset document width is 380 and the 1,560-pixel table scrolls inside its 346-pixel region. Temporary viewport overrides were reset. No browser error was captured in the checked flow.
- React review: filters use local state, comparison rows have stable IDs, selection is preserved across result filtering, and task changes reset only the related filters. No dependency or backend credential is added.

## Content publication checks

Stage: final local production export. Each applicable check passes separately for the three routes above and their affected export fields; live checks follow deployment.

| Check | `/datasets` | `/robotics-datasets` | `/sensors` | Evidence |
| --- | --- | --- | --- | --- |
| C01 URL and purpose | 通过 | 通过 | 通过 | Existing routes and final output retained |
| C02 Main intent | 通过 | 通过 | 通过 | Compare datasets or shortlist sensing approaches |
| C03 Title/H1 | 通过 | 通过 | 通过 | Final HTML and export audit |
| C04 Description | 通过 | 通过 | 通过 | Existing distinct, accurate descriptions |
| C05 Restrictions | 通过 | 通过 | 通过 | Unknowns retained; no performance ranking |
| C06 Added value | 通过 | 通过 | 通过 | Decision fields, task filters and worksheet |
| C07 Promises | 通过 | 通过 | 通过 | Working comparisons/exports; task plans not measured results |
| C08 Facts | 通过 | 通过 | 通过 | Existing source records and dates preserved; advisory boundaries explicit |
| C09 Structure | 通过 | 通过 | 通过 | Tool before background; contained tables/cards |
| C10 Media | 通过 | 通过 | 通过 | Existing labeled media unchanged |
| C11 Sources | 通过 | 通过 | 通过 | Source-linked records and candidate citations |
| C12 Responsibility | 通过 | 通过 | 通过 | Existing editorial attribution retained |
| C13 Dates | 通过 | 通过 | 通过 | Material UI/export revision dated October 15; source dates unchanged |
| C14 Reading/indexing | 通过 | 通过 | 通过 | Core HTML, canonical, sitemap and robots checks |
| C16 Internal links | 通过 | 通过 | 通过 | Export audit; both old and new task anchors retained |
| C17 Functionality | 通过 | 通过 | 通过 | Shared component tests, browser interactions, actual downloaded CSV |

C15 does not apply: no corresponding translated route or hreflang change. The ROS runtime harness and historical editorial-policy changes from the old branch are excluded. ROS execution remains unverified and is not a new capability of this release.
