# Metadata and structured-data publication contract

These are RoboSkin project audit thresholds, not Google ranking rules or a promise of rich results.

## Before writing or publishing

- Edit `seoTitle` / `seoDescription` in News and Research records. When absent, the title/excerpt fallback is validated too. Empty explicit fields fail.
- Shared topic pages and configured route metadata use the same budget. A final HTML title must be at most **70 Unicode code points**, including **` | RoboSkin.ai` (14)**. The normal unbranded field therefore has **56** available code points. Meta descriptions must be at most **160**.
- Rewrite at the editorial stage. Remove redundant modifiers, repeated keywords and unnecessary brand wording. Keep recognizable project names, meaningful results and essential conditions. Retain full paper names in `sourceTitle`, references and body, and keep the existing H1.
- Do not truncate strings, append ellipses, invent facts or convert simulated results into physical results. Keep trial counts, licensing/access restrictions and source evidence when relevant to a claim.
- Run `npm run check:seo-metadata` before publication. `prebuild` runs it automatically; metadata builders also fail closed. `npm run verify:export` reads the exported DOM, so root-layout templates, fallbacks and HTML entity decoding are checked independently.
- An unavoidable name-length exception belongs in `SEO_LENGTH_EXCEPTIONS` in `src/lib/seo-budget.mjs`: exact canonical path, field, full final value, specific reason, actual reviewer and review date. It applies only to that exact value and remains visible in the audit. Do not add pattern-based or blanket exemptions. There are no current exceptions.
- Preserve uniqueness, H1, canonical and internal-link checks. Do not alter thresholds to make a release pass.

## Schema modelling and verification

- Keep `reviewedBy` on the connected WebPage. Keep DefinedTerm taxonomy and page identity; put keywords and site membership on the WebPage.
- Preserve ItemList → ListItem → item. A CreativeWork's `isPartOf` cannot point to an ItemList. Use `mainEntityOfPage` for its presentation on a directory page.
- Source-listed dataset institutions are evidence mentions, not automatically creators. Only existing documented authors and licenses become Dataset.creator / license. Keep availability and experiment fields intact.
- Manufacturer relations use the existing source-reviewed relationship registry. Only hardware with such evidence is represented as Product. Research configurations stay noncommercial Things with linked CreativeWork evidence notes. Do not add offers, ratings, stock or prices.
- Evidence notes use `subjectOf` → CreativeWork (`text`, `citation`, `about`). World-model evidence sections use `hasPart` → WebPageElement (`name`, `text`). This preserves evidence without misusing `additionalProperty`.
- Tests execute the actual builders and serialize their output. The DOM audit combines all JSON-LD blocks on a page before resolving @ids and uses other exported pages only for otherwise unresolved references. Wrong local types cannot be hidden by a type on another page. Unresolved local references block publication; unresolved external references are reported as unverified.
- Vocabulary is pinned to Schema.org **30.1**, with the source release URL and SHA-256 in `config/schemaorg-vocabulary.json`. CI does not fetch a moving vocabulary. Download the official versioned JSON-LD and deliberately regenerate via `node scripts/update-schema-vocabulary.mjs /path/to/release.jsonld VERSION`; review the generated diff and rerun tests and export audit.
- The validator supports the Schema.org JSON-LD subset emitted by this project, class/property inheritance and typed property ranges. Schema.org's documented plain Text/URL fallback is allowed. This is not a general JSON-LD processor, an external-source truth checker or a Google rich-result eligibility test. Honest Product/Dataset markup can lack Google's recommended rich-result fields; do not fabricate data to satisfy them.

## Release evidence

1. `npm test` and `npm run lint`.
2. `npm run build` (including editorial prebuild) and `npm run verify:export` (including rendered DOM and schema checks).
3. CI must verify the exact PR head SHA. A local pass is separate evidence.
4. After authorized merge/deployment, verify the actual production commit and run `EXPECTED_COMMIT_SHA=<deployed SHA> node scripts/verify-production.mjs https://roboskin.ai`. It checks live metadata and schema along with existing production contracts.
5. Run a new Ahrefs crawl after deployment. Compare the new crawl date and URLs with the historical list. Local/CI success does not clear an old crawl or prove indexing, ranking, or rich-result eligibility.

Redirects, intentional noindex and multiple-sitemap notices retain their existing contracts and are outside this repair.
