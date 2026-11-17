# FreeTacMan license wording correction — November 17, 2026

Scope: the FreeTacMan entry in `/datasets` (including its derived data/Markdown representations) and the live reading note at `/reports/tactile-ai-robot-skin-landscape-2026`. English research directory/report companion; reader task: distinguish hosted-data terms from repository-code terms.

The November 4 review recorded an MIT README / Apache-2.0 root LICENSE discrepancy. The current primary sources do not support that assertion. This correction does not establish when the upstream wording changed; it supersedes the earlier statement for the live entry without rewriting the historical review or fixed PDF.

## Primary evidence

- [Official README at 9285740](https://github.com/OpenDriveLab/FreeTacMan/blob/9285740a5d33385d3a9cf5ccdb185e3387b547bd/README.md): “This project is under the [Apache 2.0 License](LICENSE) unless specified otherwise.”
- [Root LICENSE at the same revision](https://github.com/OpenDriveLab/FreeTacMan/blob/9285740a5d33385d3a9cf5ccdb185e3387b547bd/LICENSE): Apache License, Version 2.0.
- [Official provider dataset card](https://huggingface.co/datasets/OpenDriveLab/FreeTacMan): `license: mit` in its metadata, checked November 17. This is a card declaration; no dataset payload or third-party asset rights were audited.

The scope remains public documentation only: no dataset download, code execution, hardware experiment, rights clearance or independent legal review. The unchanged UniVTAC entry concerns a different repository and is outside this correction.

## Exact changes and preservation

- Remove the unsupported current README conflict from the FreeTacMan license fields and live sample reading note.
- Record the actual November 17 code-documentation check inside the scoped code-license note.
- Preserve original scientific source-review dates, publication dates, titles, descriptions, URLs, record counts, all existing sections/controls/downloads/links, and historical PDF/snapshot bytes.
- Create the immutable `v2026.11.17` dataset export for the two corrected FreeTacMan fields and edition metadata. The November 17 compilation date applies to this new artifact; it does not refresh every dataset's scientific review date. The previous `v2026.11.15` export remains byte-for-byte unchanged.
- The November 4 review remains a dated historical record, explicitly superseded by this note for the affected assertion.

## Content check scope

Applicable: C01–C09, C11–C14, C16–C17. No new media, language counterpart, offering, tracking or interaction: C10/C15 are outside the changed scope. Final build/derived-output results and owner approval status are recorded in the PR. Source checks do not by themselves establish production publication or indexing. This version is a review draft until owner content confirmation; no agent claims human approval.

## Final prepublication checks

Objects: `/datasets` (tactile datasets; English directory for research selection) and `/reports/tactile-ai-robot-skin-landscape-2026` (tactile research sample; English report companion). Both retain their existing public indexing target. Scope is the changed license statements and derived exports, not a new whole-site fact audit.

| Item | Result | Evidence within changed scope |
| --- | --- | --- |
| C01 URL/purpose | 通过 | Existing paths and reader tasks preserved. |
| C02 primary intent | 通过 | Existing directory selection/report sample tasks preserved; no additional keyword-only page. |
| C03 title | 通过 | Existing titles preserved; export audit passes. |
| C04 description | 通过 | Existing descriptions preserved; export audit passes. |
| C05 restrictions | 通过 | No supplied word blacklist applies; code/data rights remain distinct, and no payload testing, legal clearance or human approval is claimed. |
| C06 useful increment | 通过 | Removes a demonstrably unsupported license conflict. |
| C07 promise | 通过 | Documentation review is explicitly distinguished from payload/code testing. |
| C08 factual accuracy | 通过 | Pinned official README/LICENSE and provider card checked; HTML/Markdown/new JSON agree. |
| C09 structure | 通过 | Two existing statements corrected; no filler or new article. |
| C11 sources | 通过 | Official sources above support the scoped statements; existing source links preserved. |
| C12 responsibility | 通过 | Existing RoboSkin responsibility and review limitations preserved; no invented human approval. |
| C13 dates | 通过 | Original page/scientific dates preserved; new export compilation and scoped code check dated truthfully. |
| C14 readability/indexing | 通过 | Final HTML contains content, H1, description and canonical; static export/on-page checks pass. Production publication remains pending. |
| C16 internal links | 通过 | Export audit verifies internal destinations/anchors, including new versioned JSON. |
| C17 affected functionality | 通过 | Dynamic exported data equals immutable new snapshot; 27 records and candidate/statistics boundaries retained. |

Validation on November 17: 359 tests passed, lint passed, production build passed, and `verify:export` passed (216 sitemap pages). Initial test failures included Windows CRLF-dependent source slicing and the expected stale immutable-snapshot mismatch. Only this isolated checkout was normalized for testing; assertions were not weakened. The new snapshot resolves the consistency failure. Final diff contains no unrelated normalization changes.

Final artifact checks confirm only the FreeTacMan `license` and `codeLicense` entry fields changed between editions; candidates/statistics/counts are unchanged. Thirteen tracked historical dataset/report artifacts were checked against the base Git bytes and preserved. Module loss: none. HTML and generated Markdown show the corrected terms and the exact new compilation edition. No forms, payments, outreach, index submission or production mutation was performed.

Conclusion: applicable prepublication content checks pass; owner review of this exact content version is still pending. After confirmation, recheck PR head/base and checks, merge with matching head, then verify the resulting production SHA and both changed pages/exports. Do not treat the current production health check as verification of this unpublished correction.
