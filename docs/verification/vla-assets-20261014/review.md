# VLA assets — implementation and publication check

Reviewed on 2026-10-14. Stage: local production build / pre-publication, not a production deployment.

## State checked before edits

- Repository: `156631890/roboskin.ai`; default branch `main`.
- Fetched base and observed production `/deployment.json`: `28bdc27f068c8a72acacfe31bf7fe2803c60c89a`.
- Live `/vla`, `/vla/timeline`, `/vla/models` and `/vla/concepts` returned HTTP 404.
- Live `/robot-vla-models` already supplied a VLA guide, detailed evidence index and recent-paper summaries. These are preserved, with links to the new assets.
- Live `/glossary` and `/tactile-foundation-models` already supplied VLA / HFM definitions and the HFM disambiguation. Existing definitions and their URLs are preserved; only contextual cross-links were added.
- The primary checkout had unrelated uncommitted work. Implementation uses `E:/C-drive-migrated/roboskin-worktrees/vla-linkable-assets-20261014`, branch `codex/vla-linkable-assets-20261014`, based on current `origin/main`.
- No push, merge, production deployment, external message or search-engine submission was performed.

## Page scope

| URL | Topic / reader task | Type / language | Result |
| --- | --- | --- | --- |
| `/vla/models` | Compare VLA models, artifact access and contact-input configurations | Interactive research comparison / English | 18 source-linked rows; requested columns; filters and sorting |
| `/vla/timeline` | Read a dated research chronology | Curated chronology / English | 18 entries, first arXiv submission dates, paper links |
| `/vla/concepts` | Disambiguate VLA, VDA, world models and HFM | Concept comparison / English | Comparison table, explanatory prose, existing glossary / HFM cross-links |

The matrix and timeline share `src/lib/vla-catalog.ts`. Sources are attached to individual factual cells. The original VLA evidence directory remains the deeper reading destination rather than being replaced.

## Editorial decisions and limits

- Dates use the first arXiv submission, not code-release dates or later paper revisions. The selection runs from RT-1 (2022-12-13) to Vela (2026-10-04), with each date linked to submission history. It does not claim exhaustive coverage of the latest model worldwide.
- PaLM-E and original Diffusion Policy are labeled related planner / related policy, rather than silently counted as end-to-end language-conditioned VLAs.
- Unknown parameter totals, organizations and code are explicitly `not found`. An unavailable complete-model total is not inferred from a backbone count. Parameter sorting retains the source's counting scope and is not a compute comparison.
- Tactile input includes contact-force feedback with explicit row-level qualifiers. Octo's checkmark refers to its force/torque fine-tuned insertion variant, not its released base interface. ForceVLA2 consumes interaction force, not surface tactile images.
- Open code, partial release, closed / unreleased, and unknown availability remain separate states. Code licenses are not silently extended to weights, upstream models or datasets.
- Benchmarks retain their conditions and metric types. Diffusion Policy's reported improvement is not presented as a success rate. VLA-Touch's new matrix cell cites the manipulation component evaluation in paper v2, rather than mixing it with end-to-end or planning results. RDT cites a specific physical-task condition. GR00T N1 cites a simulation result. These cells are not a common leaderboard.
- VDA was ambiguous and a clarification was requested. Pending a different user definition, the page explicitly uses vision-conditioned diffusion action policy as a working definition. It states that the cited papers do not establish a standardized VDA class, and distinguishes diffusion from flow matching. No unsupported canonical expansion is asserted.
- Source review is manual and event-driven. No recurring job or promise of automatic refresh was created.

## Verification

- `npm run build`: passed, including static output and agent Markdown generation.
- `npm run lint`: passed.
- `npm test`: all 258 tests passed. New tests cover source/date invariants, requested seed coverage, filter intersections, empty results, reset, nonmutation, sorting and missing parameter counts. The protected URL contract was extended by the three new routes without removing any existing route.
- `npm run verify:export`: passed export contracts and on-page SEO checks, including canonical URLs, unique metadata, indexability and internal destinations / fragments.
- Exported HTML independently inspected: 18 matrix rows, 18 timeline entries and 4 concept rows are present without executing JavaScript. See `rendered-pages.json`.
- Primary-source HTTP check: all 56 unique source addresses returned HTTP 200. See `source-links.json`. This is availability evidence; the editorial claim checks above are separate.
- Browser verification on the local production export: tactile filter returned 6 rows; tactile + 2025 + partial release returned VLA-Touch only; incompatible filters displayed the empty-state message; reset restored 18 rows. Case-insensitive whitespace-trimmed OpenVLA search returned 2 rows; closed / unreleased returned 5 rows.
- Browser sorting: name, year and parameter count directions checked; chronology started with RT-1 and ended with Vela; unknown parameter totals remained last in both directions. Organization sorting is covered by the functional test.
- Mobile check at 390 CSS pixels: body width 390, table viewport 357, table content 2400; keyboard scrolling changed the table's horizontal offset. Concepts table also scrolls within its own region. Desktop and mobile visual inspection retained existing site typography, panels and colors. Temporary viewport override was reset.
- Timeline browser check: 18 entries and 18 paper links, with the expected first and last dates. Concepts browser check: 4 rows and links to the existing VLA, tactile world model and HFM glossary entries plus the HFM disambiguation section. No browser console errors were captured.

## Content-publish-check

Evidence is the final local export, local browser inspection, source-linked records and the adjacent verification JSON files. All outcomes below apply to each of the three new routes and the small cross-link changes on existing pages.

| Check | Result | Evidence / scope |
| --- | --- | --- |
| C01 URL and purpose | 通过 | New routes render in local production preview; existing URLs preserved |
| C02 Main intent | 通过 | Comparison, chronology and disambiguation have distinct reader tasks |
| C03 Title and H1 | 通过 | Exported metadata / H1 and SEO audit |
| C04 Description | 通过 | Unique descriptions match each page's contents |
| C05 User restrictions | 通过 | English, existing design, no traffic or revenue figures |
| C06 Added value | 通过 | Source-linked matrix, functional filters, shared chronology and role comparison |
| C07 Title promise | 通过 | Browser-tested comparison and rendered chronology / concept table |
| C08 Factual accuracy | 通过 | Primary sources, explicit missing fields, version / metric / variant boundaries |
| C09 Structure | 通过 | Existing definitions cross-linked; no replacement of the original guide |
| C11 Sources | 通过 | Cell-level primary citations, paper links, source availability record |
| C12 Responsibility | 通过 | Existing editorial team and methodology; author-reported results distinguished from reproduction |
| C13 Dates | 通过 | Visible review date and route metadata agree; historical dates link to arXiv |
| C14 Reading and indexing | 通过 | Core HTML, canonical / robots metadata, sitemap and export audit |
| C16 Internal links | 通过 | Existing and new routes / fragments pass the on-page audit |
| C17 Functionality | 通过 | Filters, sorts, empty state, reset and mobile horizontal scrolling verified |

C10 excluded: no new images or media. C15 excluded: these English assets have no corresponding translated versions; no hreflang pairs were invented.

Publication conclusion: pre-publication checks passed. Production publication and post-deployment verification were not performed; local results must not be represented as live-site results.

## Release recheck — October 15, 2026

The owner requested submission of important completed features. The branch was synchronized with main `4d08793c62cc60578bb61f73915f360f7a347283`, including the latest analytics fixes, Neuron AI article and PR #48. URL-list conflicts were resolved by preserving both the three new VLA routes and the new article; no existing protected route was removed.

- Final combined local build and export/on-page checks pass: 192 sitemap URLs, 196 protected entries and 6 intentional noindex URLs. All 267 tests pass. Lint passed on the VLA changes and separately on PR #48.
- The source-linked data and the previously inspected technical claims are unchanged. The October 14 source-review date is retained rather than relabeled as a new fact review.
- Browser recheck on the production export: tactile filtering returns 6 rows; tactile + 2025 + partial release returns VLA-Touch; incompatible filters show the empty state; reset restores all 18 rows; model-name ascending starts with Diffusion Policy.
- React review: the interactive matrix uses local state, labeled controls, stable row keys and immutable filtering/sorting. The core rows remain server-rendered; no new dependency, backend credential or API request is required for filtering.
- C01–C09, C11–C14, C16 and C17 remain passed for each of the three routes within the final pre-publication scope. C10 and C15 remain inapplicable for the reasons above. Live deployment identity, canonical/robots/sitemap and interactions are checked separately after merge.

This recheck authorizes no claim of indexing, traffic growth or independent model reproduction. Release and production verification results are recorded by merge SHA in the local maintenance checkpoint.
