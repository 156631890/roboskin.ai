# IROS 2026 Touch-to-Action Submission

## Status

Prepared on 2026-08-19 and refreshed on 2026-08-21 with HiTac-WAM evidence. Status reconciled against Gmail and the official workshop page on 2026-09-10: temporary email submission receipt confirmed; formal OpenReview registration and a paper acceptance decision remain unverified.

On 2026-08-21, the verified two-page PDF was emailed to official organizers Carlo Alessi and Gabriele Caddeo. Carlo confirmed on 2026-08-22 that the workshop could accept the submission by email for the moment. The later OpenReview activation issue remains unresolved in the latest available correspondence. The five-message organizer thread contains no later reply after the user's 2026-08-25 follow-up (Asia/Shanghai).

| Evidence | Date (UTC) | Gmail message ID | Result |
| --- | --- | --- | --- |
| Original delivery | 2026-08-21 13:38:40 | `1a0248b8f93eff98` | SENT; original PDF attachment recovered on 2026-09-10 |
| Organizer reply | 2026-08-22 03:23:19 | `1a0277e98548c257` | Temporary submission by email permitted; profile link requested |
| Organizer profile check | 2026-08-24 07:58:38 | `1a032c76bb487cfa` | Profile reported inactive |
| OpenReview activation status | 2026-08-24 15:32:27 | `1a03466d14fe807a` | Activation could not complete because affiliation/email verification did not match |
| Latest sent follow-up | 2026-08-24 17:18:37 | `1a034c7fec38c29d` | SENT; acknowledged the inactive profile and requested continued email receipt |

A targeted Gmail search on 2026-09-10 found no newer matching organizer or OpenReview response. This is a mailbox observation, not a fresh authenticated profile check or a submission decision. No email or new submission was sent during this reconciliation.

The official workshop page, re-read on 2026-09-10, still accepts 1-2 page mini-reviews and perspectives including references and lists tentative dates of 2026-09-07 for submission and 2026-09-22 for latest notification. The listed submission date has passed; no extension or rejection is inferred:

- https://iros-touch2action.github.io/
- https://openreview.net/group?id=IEEE.org%2FIROS%2F2026%2FWorkshop%2FTouch2Action

## Manuscript

Title: `When Is Touch Necessary? A Capability-First Evidence Standard for Tactile Robot Manipulation`

Workshop theme: `Theme V - Tactile Sensing in Robot Learning and Manipulation`

Editable generator:

- `scripts/generate-iros-perspective.py`

Original emailed PDF, restored from Gmail on 2026-09-10:

- `output/pdf/roboskin-iros-2026-touch-to-action-perspective.pdf`

A second copy is preserved outside the public repository in the local private archive. See [archive receipt](../seo/2026-09-10-evidence-archive.md) for its location and SHA-256. This is the original attachment, not a regenerated replacement.

The PDF contains:

- two pages including references;
- one original capability-first evidence-chain figure;
- a five-link evidence table;
- a reusable machine-readable evidence card;
- eight primary research references from 2025-2026, including HiTac-WAM (`arXiv:2608.19574`);
- explicit distinctions between preprint evidence, task metrics, generalization, and deployment claims.

## Verification - 2026-09-10

- Recovered the original 11,895-byte attachment and reopened it successfully with `pypdf`.
- Confirmed exactly two pages and computed the SHA-256 recorded in the archive receipt.
- Parsed the generator with Python `ast`; both changed HiTac-WAM passages match the original attachment's extracted text after whitespace normalization.
- Rendered both pages to PNG at 1.5x and inspected the title, columns, diagram, tables, references, footer, and page numbering. No clipped, overlapping, or missing content was observed.

## Required before submission

Before any further upload, reconcile the following with the current authenticated profile and organizer guidance:

1. whether the temporarily received email submission needs any further registration after the listed deadline;
2. the OpenReview profile displays the user-confirmed author name `Steven Yang`;
3. the profile affiliation and verified email are accurate and resolve the mismatch reported by OpenReview; the manuscript wording is `RoboSkin.ai, independent research intelligence platform`;
4. the corresponding email is `messigoat147@gmail.com`;
5. any required coauthor, conflict, venue-template, or profile fields are truthfully completed.

Do not submit until the author identity and OpenReview profile are confirmed. Do not invent an academic affiliation, ORCID, coauthor, funding source, or institutional relationship.
