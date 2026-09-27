# Working papers release: 27 September 2026

## Scope

Add `/papers` and `/papers/interaction-as-the-interface`, linked from Research, the homepage, and the footer. Publish the existing v0.2 manuscript and its synthetic benchmark as a research proposal, with version history and evidence status.

The page uses WebPage metadata and does not assign research authorship, peer review, a DOI, or a journal. The manuscript states that it was prepared for RoboSkin.ai with AI assistance. The complete architecture and physical-robot performance remain untested.

## Versioned materials

Files are served from `/publications/interaction-as-the-interface/v0.2/`. `manifest.json` records exact sizes and SHA-256 values. The PDF and source are byte-identical to the audited v0.2 manuscript. The ZIP includes the original executable and five numerical CSV outputs, a portable JSON result record, and reproduction instructions. It excludes local audit logs and third-party papers.

The original JSON counter `total_unique_episode_scenarios` is preserved for traceability. The page and README explain that it means 600,000 episode-condition evaluations using 200,000 base random scenarios across three conditions. Confidence intervals describe Monte Carlo error only.

Git attributes preserve exact published bytes. Local tests validate the release manifest; production verification downloads and checks all linked materials against it.

## Verification before publication

- Full test suite: 203 passing tests.
- ESLint and production build: passed.
- Static export and rendered-page checks: 153 sitemap URLs, 157 protected URLs, valid canonicals and internal links.
- Browser inspection: listing and detail page at a 390 px mobile viewport and a 1280 px desktop viewport; visible research status and download controls.
- Independent scientific copy review: corrected the formula's stated assumptions to include p >= 0.5 and 0/1 reward units.

The site uses its existing GitHub quality gate and Vercel Git deployment. Merge/deployment SHA and production verification are recorded after publication in the local maintenance run evidence; this pre-publication note does not claim deployment completion.
