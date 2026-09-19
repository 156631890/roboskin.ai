# Dataset distribution correction — September 19, 2026

## Report and observed cause

The owner forwarded Search Console warnings for missing `distribution.encodingFormat` and `distribution.contentUrl`. Production HTML was checked directly on September 19 before editing.

`/datasets` emitted 20 Dataset entities, six with incomplete DataDownload objects: Bench2Dex, UniVTAC, T-Rex, EgoTouch, SoftVTBench, and FreeTacMan. These objects contained only `url` and `description`. Their URLs identify Hugging Face repository landing pages or file listings, not the actual data payloads. Public-file availability does not make a provider landing page a downloadable distribution.

`/robotics-datasets` emitted three Dataset entities and no distributions. `/research-index` emitted one original RoboSkin Dataset with two complete distributions: `/research-index.csv` (`text/csv`) and `/research-index.json` (`application/json`). Both actual files returned HTTP 200 with the matching content types.

Primary guidance reviewed: https://developers.google.com/search/docs/appearance/structured-data/dataset#data-download . Google describes `distribution.contentUrl` as the link for the download, and `distribution.encodingFormat` as its file format. Dataset distribution is optional; when included, it must describe a real download.

## Implementation

- Remove the incomplete DataDownload objects from the shared external dataset catalog builder. Provider URLs remain as Dataset.url and as visible resource links. All Dataset entities, original creators, citations, access conditions, licenses, and catalog relationships are retained.
- Preserve the original research index CSV/JSON DataDownload objects without modification.
- Add an export-time check of nested Dataset distributions for an absolute HTTP(S) contentUrl and a nonempty encodingFormat. This structural guard cannot prove that an arbitrary remote URL really serves a file; future additions still need source and download verification.
- Update the existing behavioral test that previously allowed the incomplete object. Add coverage for both catalogs, complete research-index downloads, and malformed nested distribution fields.

No placeholder MIME type, invented upstream download, cosmetic date bump, new dataset release, page redesign, or research-content rewrite is introduced. The original workspace's outstanding changes are preserved in place; this patch starts from main `bad85c75551cbee2c8d0155e519a617e1ebb8eaf` in `.worktrees/dataset-schema-20260919`.

## Verification

- 193 Node tests passed, including the new regression cases; ESLint passed.
- Next.js production build and TypeScript checking passed.
- Static-export validation passed for 126 sitemap URLs, 130 protected entries, 193 graph entities, 30 research-index records, and 50 RSS items. The verifier used the same production environment file as the build.
- Direct inspection of generated JSON-LD confirmed 20 external tactile datasets, three general robotics datasets, and the original research-index dataset; no incomplete distribution objects remain. Both real index downloads and their MIME types were checked on the live site.

Production identity, post-release checks, and actual Search Console validation receipts are recorded under ignored `.artifacts/` after publication. Removing the source error does not instantly clear an older Search Console report; Google must recrawl and process the fix. Dataset discovery and ranking are not guaranteed by this correction.
