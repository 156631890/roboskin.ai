# GSC tracking for the structure release

Implementation date: 2026-10-30. Production release: pending the three-batch PR, required CI and Vercel Ready verification. Do not interpret the implementation date as proof of deployment. The production verification artifact appends the actual UTC timestamp and merged commit after the live checks pass.

Property: `sc-domain:roboskin.ai`. Coverage export: 2026-10-30. GSC displayed report update: 2026-10-23. Performance baseline supplied by the site owner for the preceding 90 days: 125,000 impressions, 921 clicks, 0.74% CTR, average position 8.0. These are a supplied baseline, not a newly queried 14-day measurement.

## Fourteen-day comparison

Return 14 days after the verified production timestamp. Compare the changed canonical URLs and their primary queries over matched 14-day windows, with the same country, device and search-type filters. Keep the 90-day baseline as context; do not compare it directly with a 14-day window as if the periods were identical. Record clicks, impressions, CTR and average position for each changed URL. New pages have no comparable pre-release page history.

Targets: average position below 5.0 and CTR above 2%. These are evaluation targets, not promised outcomes. Impressions are a diagnostic, not the optimisation target. Indexing and ranking depend on Google recrawling and evaluating the pages; a successful deployment is not evidence of indexation or ranking improvement.

## Coverage decisions

The complete 52 + 30 + 11 URL export and per-URL decisions are in `gsc-url-disposition.csv`.

- 52 reported 404s: 45 unrecognised numeric-suffix URLs, five retired hashed fonts, one gated report route and `/guides`. None is linked by a current sitemap page or included as that missing URL in the current sitemap. Preserve genuine 404s; there is no documented equivalent legacy content justifying guessed redirects. Preserve the existing gated report behaviour and permissions.
- 30 crawled, not indexed: 23 non-HTML resources and seven HTML pages. The HTML pages have content, self-canonicals and internal links. Keep them indexable; no evidence supports blanket noindex. The VLA timeline receives the requested parent link. Existing research prose is retained.
- 11 canonical alternates: the actual GSC label is **Alternate page with proper canonical tag**, not an error asserting mismatched canonicals. Four service parameter variants and five contact parameter variants correctly canonicalise to their base pages. Two www variants resolve to the apex host and correct canonical. All 11 were checked in the live browser on 2026-10-30. No canonical changes are needed for these samples.
- The reported 14 redirects and two intentional noindex URLs remain unchanged.

No GSC validation restart or indexing request was submitted. No claim is made that Google has recrawled, accepted a repair or indexed the five new pages. No paid keyword metrics were fetched or fabricated.

## URLs to compare

`/sensors`, `/robot-vla-models`, `/robot-foundation-models`, `/datasets`, `/tactile-ai`, `/robot-skin`, `/benchmarks`, `/physical-ai-touch`, `/robot-grippers`, `/electronic-skin`, `/robot-tactile-sensors`, `/humanoid-robot-companies`, `/embodied-ai`.

Track the three self-canonical VLA child pages separately to check whether their impressions and queries become more distinct from the main VLA hub.
