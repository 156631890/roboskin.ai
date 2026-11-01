# Research hardware structured-data repair

## Evidence and scope

The October 31, 2026 Search Console email reports the Product snippet issue
`Either offers, review, or aggregateRating should be specified`. The email does
not supply affected URLs. Search Console opened to its signed-out introduction
in this session, so its URL samples and validation state remain unavailable.
No GSC validation or indexing request has been submitted.

An independent crawl of all **210 production sitemap URLs** confirmed the
following on production commit `3a14b59c1afa033a015f1f725b794f32e998724e`
(after PRs #99 and #100):

| Canonical page | Product nodes without offers/review/aggregateRating |
| --- | ---: |
| https://roboskin.ai/robots | 9 |
| https://roboskin.ai/sensors | 4 |
| https://roboskin.ai/organizations | 13 |

These are **26 node occurrences representing 13 distinct hardware entities**,
not 26 affected pages. `/organizations` repeats the nine robots and four sensors
for attribution. The remaining 207 sitemap pages, including all seven sensor
detail pages, contained no Product nodes. No crawl errors occurred. See
`baseline.json` for observed entity IDs, response status, canonical and scope.
This crawl is not a substitute for Google's affected-URL report, and does not
cover historical or parameter URLs outside the current sitemap.

## Semantic decision and changed fields

Product is not limited to pages that sell an item: genuine editorial review
pages can also qualify for Google's product snippets. These multi-entity
research catalogs contain neither offers nor rated product reviews. Merely
having a known manufacturer does not justify targeting a product rich result.

- Use `Thing` for all hardware research subjects, consistently in the robot,
  sensor and organization directory builders.
- Remove `manufacturer` from those subjects. It is a Product-only Schema.org
  property; leaving it on Thing would introduce a semantic error.
- Remove robot `category`; preserve the kind in its existing research evidence
  `CreativeWork.genre`, as well as the unchanged visible directory and graph.
- Preserve subject IDs, names, descriptions, aliases, identity URLs, list
  membership, evidence text, source citations and page associations.
- Preserve manufacturer evidence IDs. Robot/sensor research notes link through
  `subjectOf.hasPart` to the existing manufacturer-attribution CreativeWork.
  That work's `about` identifies the hardware, `mentions` references the actual
  organization, and its existing text and citations bound the attribution.
  `mentions` itself is not claimed to be a manufacturer predicate.
- The custom knowledge graph retains its exact `manufacturedBy` edges and
  evidence. No graph data, visible attribution, source URL or directory anchor
  is changed. No offers, prices, reviews or ratings are fabricated.

Official references checked for this repair:

- https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- https://schema.org/Thing
- https://schema.org/manufacturer
- https://schema.org/subjectOf
- https://schema.org/CreativeWork

## Regression and preservation checks

- 348 tests pass, including generated-schema semantics and a new nested/mixed
  Product-type regression fixture that is Schema.org-valid but violates this
  site's research-catalog policy.
- Lint, Next.js build, static-export verification and structure batch 3 pass.
- Static export checks cover 210 sitemap pages, 215 protected URL contract
  entries, 202 graph entities, source-linked directory records and LLM outputs.
- New research-catalog policy runs in both static on-page audit and production
  verification, including sensor detail paths. It rejects commercial/review
  types and unsupported commercial fields on these research routes.
- Knowledge graph, complete LLM text, SEO routes and topic content compare
  exactly with the base commit. Main content, links, anchors and metadata on
  the three repaired pages match the pre-fix production HTML. See
  `preservation.json` for the local static build's newsletter-setting limit.

## Release and Google validation

Use the existing Git integration for project `roboskin-ai`, project ID
`prj_aANbSFiAfhyi9F7fRLUzfzH4geFZ`, team
`team_f4eZTnVOClO7jVJlmtJJU0Us`, and production domain `roboskin.ai`.
Keep production environment settings, forms, tracking and deployment audience.
Require successful PR checks before merge; then verify `/deployment.json`
matches the merged SHA and check the actual public JSON-LD before taking any
GSC validation action.

After production verification, an authenticated GSC owner can open the Product
snippets issue, compare its URL samples with the live-crawl evidence, inspect
the live versions, and start Validate Fix. Record the returned state explicitly.
Until Google reports completion, report validation as pending/unverified.
Local tests, successful deployment, or a live Rich Results Test do not establish
that Google's historical issue validation has passed.

Rollback: revert this PR through a new reviewed commit if it causes a regression.
The pre-fix production deployment is `dpl_GuwmUYKi1ibvLXDMptLsuj8iw8LZ`.
Restoring the old schema also restores the Product snippet problem.
