# P0 definitions and internal-link validation

Date: 2026-10-12. Base: `6221d4cfb06041af216390a85d272a07eae64dff`.
Branch: `codex/core-definitions-p0-20261012`.
Stage: local production build and reviewable draft. No production deployment or human editorial approval is claimed.

## Scope and user task

All page copy is English. Existing URLs, page modules, comparison tables, sources and download routes are retained. The only new page URL is `/methodology`.

| URL | User task and relevant additions |
| --- | --- |
| `/technology` | Understand tactile sensing; five FAQs and four cited limitations; contextual routes to comparison, datasets and ROS. |
| `/e-skin` | Understand electronic skin, EIT versus iontronic mechanisms, and their evidence boundaries; five FAQs and three cited limitations. |
| `/tactile-foundation-models` | Compare model roles and distinguish the proposed HFM framework from benchmarked encoder capabilities; five FAQs and three cited limitations. |
| `/physical-ai-touch` | Understand contact feedback and active sensing; five FAQs and three cited limitations. |
| `/datasets` | Find ROMI-2K, inspect modalities, paper/version and artifact access, filter it by active perception, and export the directory record. |
| `/guides/gelsight-vs-digit` | Move from sensor comparison to the definition, compatible data and ROS practice through contextual paragraphs. |
| `/guides/ros2-tactile-sensing` | Connect the existing synthetic tutorial to sensing definitions, hardware selection and data-access evidence. Existing execution claims are unchanged. |
| `/glossary` | Find the HFM definition and the supporting paper version. |
| `/methodology` | Understand editorial standards, claim tracing, evidence activities, common model fields, update policy and corrections. |

## Facts and limitations

- `source-review-definitions.json` records the original sources for tactile limitations, EIT, iontronic sensing and active exploration, including the EIT paper's version-dependent title.
- `source-review-hfm-romi.json` records actual HFM/ROMA source reads, paper versions, official manifests and the release-status disagreement.
- HFM is a proposed broader framework; frozen-encoder benchmarks do not establish its complete architecture.
- ROMI-2K is recorded as **announced**, with **unknown dataset license**. Public model files and one demo scene are not described as a complete dataset release. Its handheld collector has no force sensor; force/torque belongs to tabletop collection. Counting units remain separate.
- The new dataset snapshot is `public/releases/datasets/v2026.10.12.json`. Prior snapshots remain unchanged. This P0 directory snapshot is not the P1 CC0 model-database release.
- The graph adds only ROMI-2K, four source documents and four source-support edges. Exact count contracts and machine-readable descriptions were updated without weakening their checks.

## Validation performed

| Check | Result and scope |
| --- | --- |
| Tests | 255/255 pass, including 17 rendered-content and ROMI evidence regressions. |
| Lint | Pass. |
| Production build | Pass; 197 agent Markdown representations generated. The later static `llms.txt` count correction was copied to the exported file and verified against the graph. |
| Export / on-page SEO | Pass: 187 sitemap URLs, 191 protected URL entries (including 5 redirect sources), 6 intentional noindex URLs, 194 graph entities. |
| Internal-link audit | 187 sitemap pages; 0 broken links, 0 redirect links, 0 unreachable pages; maximum homepage depth 2. |
| Contextual links | Each of the four definition pages plus datasets, GelSight/DIGIT and ROS has at least three paragraph links across distinct sections. Navigation and footer links do not satisfy this assertion. |
| FAQ output | Actual exported HTML contains exactly one FAQPage with five answers on each core definition page; every schema answer matches a visible paragraph. |
| HTTP / raw HTML | Nine affected routes return local HTTP 200 with the correct canonical and one H1. New text, source links, HFM and ROMI records are present in exported HTML. |
| Desktop / mobile | Browser inspected at 1132px and 390px widths; no document-level horizontal overflow. EIT/iontronic anchors work; methodology inherits the current design. |
| No JavaScript | Script execution disabled during a nine-route browser pass; headings, body paragraphs and the methodology footer entry remained present. Script execution and the temporary viewport override were restored. |
| Dataset interaction | Active perception filter returns ROMI-2K; CSV download contains one directory record with announced access / unknown license. `/datasets.json` equals the new preserved snapshot. |
| Browser logs | No captured browser errors during the checked flow. |

Local evidence is retained under `.artifacts/`: command logs, `internal-links.json`, desktop/mobile screenshots, browser/no-JS records, the downloaded CSV, and `review/manifest.json` with full HTML snapshots and SHA-256 hashes. These are local preview checks, not production or Google index checks.

## Content-publish-check matrix

This matrix covers only new or changed content and its directly affected outputs. It is an automated editorial/technical assessment, not a human approval event.

| Applicable checks | Result | Evidence |
| --- | --- | --- |
| C01 URL, C02 intent, C03 title/H1, C04 description | Pass | Existing routes preserved; new methodology metadata and canonical; exported-page and SEO verification. |
| C05 constraints, C06 useful additions, C07 promises, C08 facts | Pass | Required additions and bounded evidence above; no invented search volumes, rankings, DOI, model releases or independent experiments. |
| C09 structure, C10 retained media | Pass | Current modules/media retained; added sections, FAQs and paragraph links inspected on desktop/mobile. No new image rights claim introduced. |
| C11 sources, C12 responsibility, C13 dates | Pass | Versioned primary-source review files; visible editorial attribution and methodology; material revision notes; older source-review dates retained. |
| C14 readable output, C16 internal links, C17 function | Pass | Final raw HTML/browser/no-JS checks; complete link audit; actual filter/CSV and JSON snapshot validation. |

C15 is not applicable: no additional language version or hreflang change is introduced. Google Live/Indexed, production HTTP and production deployment are pending because this is a draft branch. No claim of ranking, rich-result eligibility, indexing or growth is made.

Before merging or publishing this material, obtain the real human content review required by the local `seo-geo` workflow. Agent source review and passing builds do not supply that approval. P1 is scheduled only in `docs/p1-tactile-ai-roadmap.md`; no P1 pages, automation, DOI deposit, model release or external outreach were performed.
