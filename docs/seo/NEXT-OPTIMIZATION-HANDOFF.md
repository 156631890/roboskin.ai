# RoboSkin.ai — Next Website Optimization Handoff

Last updated: 2026-07-27, Asia/Shanghai

This is the starting document for the next optimization session. Read it before editing code, content, metadata, Search Console settings, or outreach records.

## 1. Objective and working assumption

Primary objective: grow qualified organic traffic and topical authority for robot skin, tactile AI, e-skin, tactile sensing, and Physical AI.

Secondary objective: create credible paths for research corrections, editorial collaboration, and future commercial inquiries.

Do not silently reposition the site as a product vendor, manufacturer, or research institution. RoboSkin.ai is currently a source-backed editorial and research-information site. If the user wants lead generation, product sales, or a domain-sale strategy to become the primary objective, confirm that choice before rewriting the homepage or conversion paths.

## 2. Start here

| Item | Current state |
| --- | --- |
| Workspace | `C:\Users\Administrator\roboskin.ai` |
| Branch | `main` |
| Handoff commit | `d6e9776bf3fd8bcafd4437ac8a646ad1e9c446b3` |
| Production domain | https://roboskin.ai |
| Canonical host | `https://roboskin.ai` |
| Vercel project | `stevens-projects-08c9c5b0/roboskin-ai` |
| Current production deployment | `dpl_3SNd1hRZuYmXwGJwiEGDCxSpfagf` |
| Last quality-gate run | https://github.com/156631890/roboskin.ai/actions/runs/30235123348 |

First commands:

```powershell
Set-Location -LiteralPath 'C:\Users\Administrator\roboskin.ai'
git status --short
git pull --ff-only
git log -3 --oneline
```

Stop before editing if the worktree contains changes that are not understood. Existing changes belong to the user.

## 3. Executive status

The site is technically strong and has started to gain search visibility. It is not yet a mature traffic property.

- Technical and SEO infrastructure: strong.
- Content system: established.
- Search impressions: growing.
- Search click efficiency: weak on several high-impression pages.
- Referring-domain authority: still near zero.
- Conversion measurement: enabled but too early and too limited for decisions.

The next bottleneck is not page count. It is turning existing impressions into clicks and earning the first legitimate referring domains.

## 4. Current production baseline

The production verifier passed against the handoff commit:

```text
69 indexable URLs
4 noindex URLs
69 exact sitemap URLs
17 research-index data records
33 RSS items
apex canonicals and redirects verified
```

Verification command:

```powershell
node scripts/verify-production.mjs https://roboskin.ai
```

Local quality gate:

```powershell
npm ci
npm test
npm run lint
npm run build
npm run verify:export
```

Do not claim completion until the relevant local checks and the production verifier pass.

## 5. Search Console baseline

Search Console performance was last checked on 2026-07-27. Google data was complete through 2026-07-24.

Property:

https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aroboskin.ai

### Rolling 28 days

| Metric | Current | Earlier baseline through 2026-07-07 | Direction |
| --- | ---: | ---: | --- |
| Impressions | 7,974 | 5,240 | Up about 52% |
| Clicks | 85 | 48 | Up about 77% |
| CTR | 1.1% | 0.9% | Up 0.2 percentage points |
| Average position | 8.6 | 8.9 | Improved by 0.3 |

These rolling windows overlap. Treat the comparison as directional evidence, not a controlled experiment.

### Rolling three months

| Metric | Value |
| --- | ---: |
| Impressions | 9,974 |
| Clicks | 127 |
| CTR | 1.3% |
| Average position | 8.6 |

### Leading queries in the rolling 28-day window

| Query | Clicks | Impressions |
| --- | ---: | ---: |
| `roboskin` | 15 | 173 |
| `robot skin` | 9 | 202 |
| `robotic skin` | 5 | 44 |
| `tactile ai` | 2 | 66 |
| `"dream-tac" "unified tactile world action model"` | 0 | 56 |

The site has real category traction for `robot skin`, but branded and homepage traffic still account for too much of the click volume.

## 6. High-impression pages requiring patience

| URL | Impressions | Clicks | CTR | Current instruction |
| --- | ---: | ---: | ---: | --- |
| `/research` | 747 | 0 | 0% | Do not rewrite before the experiment gate |
| `/research/single-material-soft-robotic-skin-2025` | 598 | 4 | 0.67% | Preserve until post-treatment data is complete |
| `/research/dream-tac-tactile-world-action-model-2026` | 533 | 0 | 0% | Preserve until post-treatment data is complete |
| `/tactile-ai` | 493 | 3 | 0.61% | Preserve until post-treatment data is complete |
| `/robot-skin` | 490 | 9 | 1.84% | Use as the control page |
| `/research/robot-skin-papers` | 268 | 0 | 0% | Recheck hub-versus-bibliography intent |
| `/research/freetacman-robot-free-visuotactile-data-collection-2025` | 241 | 0 | 0% | Preserve until post-treatment data is complete |

The homepage received 48 of the site's 85 rolling-28-day clicks. Improving non-homepage click distribution is more important than creating many additional URLs.

Full monitoring source:

[search-console-monitoring.md](./search-console-monitoring.md)

## 7. Date gates

### Before 2026-08-04

Do not change the title, H1, or meta description of the high-impression pages listed above.

Allowed work:

- read-only Search Console review;
- production and sitemap verification;
- image-delivery investigation;
- accessibility investigation;
- checking outreach responses;
- drafting, but not publishing, a tightly sourced future news item;
- documenting evidence.

### On or after 2026-08-04

Export page-plus-query Search Console data for 2026-07-22 through the latest complete date.

Only consider a snippet treatment when a page has:

- at least 20 post-treatment impressions; and
- CTR below 1%; and
- a clear query-intent mismatch that can be fixed without changing the page's factual scope.

Change no more than three pages in one treatment batch. Record the exact old and new title, H1, and meta description. Keep `/robot-skin` unchanged as the control unless new evidence is overwhelming.

### Before 2026-08-10

Do not send follow-ups to the first outreach batch. Check for replies only.

### On or after 2026-08-10

Send at most one concise follow-up to each unanswered target. Do not send a second follow-up without explicit user approval.

## 8. Analytics status

Vercel Web Analytics is enabled.

Implementation:

- dependency: `@vercel/analytics` `^2.0.1`;
- integration: `src/app/layout.tsx`;
- dashboard: https://vercel.com/stevens-projects-08c9c5b0/roboskin-ai/analytics.

Initial seven-day sample observed on 2026-07-27:

| Metric | Value |
| --- | ---: |
| Visitors | 8 |
| Page views | 23 |
| Bounce rate | 75% |
| Visitors to the new textile e-skin article | 7 |

Referrer rows included one visitor each from GitHub, Google, and Vercel.

This sample is too small and may include testing or audit visits. Do not optimize based on the current bounce rate. Vercel Hobby does not expose custom analytics events; do not upgrade the account or add another analytics platform without user approval.

## 9. Performance and accessibility baseline

PageSpeed report generated on 2026-07-27:

https://pagespeed.web.dev/analysis/https-roboskin-ai/y6o7ggk1k7?form_factor=mobile

| Category | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 94 | 100 |
| Accessibility | 95 | 90 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Agentic browsing | 3/3 | 3/3 |

Mobile lab metrics:

| Metric | Value |
| --- | ---: |
| FCP | 1.0 s |
| LCP | 2.9 s |
| TBT | 30 ms |
| CLS | 0 |
| Speed Index | 3.7 s |

Desktop lab metrics:

| Metric | Value |
| --- | ---: |
| FCP | 0.3 s |
| LCP | 0.5 s |
| TBT | 0 ms |
| CLS | 0.001 |
| Speed Index | 0.7 s |

Likely low-risk performance work:

- inspect image delivery; Lighthouse estimated roughly 163 KiB mobile and 202 KiB desktop savings;
- reduce mobile LCP below 2.5 seconds if the change is small and measurable;
- fix undersized touch targets;
- fix heading-order violations;
- fix the desktop contrast issue and inconsistent same-purpose link treatment.

Do not launch a broad redesign. Performance and accessibility changes must remain targeted and visually verified.

Search Console has insufficient 90-day real-user data for both mobile and desktop Core Web Vitals. Do not describe Lighthouse lab results as field data.

## 10. Indexing status

Main sitemap:

https://roboskin.ai/sitemap.xml

News sitemap:

https://roboskin.ai/news-sitemap.xml

Current operational state:

- the main sitemap reports 69 discovered pages;
- the news sitemap was successfully submitted on 2026-07-27 and reported one discovered news page;
- the news-sitemap route retains a valid regular URL when no article is within Google's two-day news window;
- `robots.txt` lists both sitemaps.

The Search Console page-indexing report was still dated 2026-07-10 when last checked:

| Status | Count |
| --- | ---: |
| Indexed | 64 |
| Not indexed | 22 |
| Redirects | 8 |
| Alternate pages with correct canonical | 7 |
| Crawled, not indexed | 2 |
| Discovered, not indexed | 3 |
| 404 | 2 |

Fifteen of the 22 excluded rows were redirects or expected canonical alternatives. The report is stale and must not be used to claim current indexing failure. Recheck after Google refreshes it.

## 11. Latest content shipment

Published on 2026-07-27:

https://roboskin.ai/news/self-powered-textile-artificial-skin-three-channel-robot-control-2026

Primary source:

https://doi.org/10.1016/j.nanoen.2026.112233

Relevant implementation:

- `src/lib/news-data.ts`;
- `public/generated/authority/news-textile-artificial-skin-2026.webp`;
- `src/app/news-sitemap.xml/route.ts`;
- `public/llms.txt`;
- `config/protected-urls.json`.

The article is newer than the latest complete Search Console data. Do not judge its organic-search performance yet.

## 12. First outreach batch

Search Console still reports zero external links. One GitHub referrer visit in Vercel Analytics is not proof of an earned backlink.

Public issue status as of 2026-07-27:

| Target | URL | State | Replies |
| --- | --- | --- | ---: |
| Awesome-Touch | https://github.com/linchangyi1/Awesome-Touch/issues/38 | Open | 0 |
| Awesome-Tactile-Sensing | https://github.com/TX-Leo/Awesome-Tactile-Sensing/issues/1 | Open | 0 |
| Awesome-Tactile-Perception | https://github.com/xiaoen0/Awesome-Tactile-Perception/issues/1 | Open | 0 |

Two editorial emails were sent and confirmed by Gmail:

- Robohub: `editors@robohub.org`;
- The Robot Report: `scrowe@wtwhmedia.com`.

Follow-up date: 2026-08-10.

Sources of truth:

- [outreach-log.csv](./outreach/outreach-log.csv)
- [targets.md](./outreach/targets.md)
- [outreach/README.md](./outreach/README.md)

Rules:

- no paid links;
- no reciprocal-link promises;
- no fake research affiliation;
- no bulk or identical messages;
- no contacting a target whose scope does not match;
- do not mark a target `linked` without a live referring URL;
- preserve the primary-paper link and ownership disclosure in follow-ups.

## 13. Recommended next-session order

### Priority 0 — Re-establish the baseline

1. Read this handoff.
2. Check the current date against the gates above.
3. Confirm a clean worktree.
4. Verify the production deployment and CI.
5. Read the latest Search Console and outreach records before proposing edits.

### Priority 1 — Improve click efficiency

On or after 2026-08-04:

1. Export page-plus-query Search Console data.
2. Identify pages with at least 20 impressions and CTR below 1%.
3. Inspect the actual queries, not only page totals.
4. Select no more than three pages with a clear intent mismatch.
5. Make the smallest defensible title, H1, or description treatment.
6. Record the treatment date and exact changes in `search-console-monitoring.md`.
7. Preserve the treatment for at least 14 complete days.

### Priority 2 — Earn referring domains

1. Check the five first-batch contacts for replies.
2. On or after 2026-08-10, send one individualized follow-up.
3. Start a second batch only after learning from the first batch.
4. Optimize for three legitimate referring domains, not a high message count.

### Priority 3 — Target mobile LCP and accessibility

1. Re-run PageSpeed to establish a fresh lab result.
2. Identify the exact LCP element and oversized image.
3. Make one small image-delivery or preload change.
4. Fix the identified accessibility defects without redesigning adjacent UI.
5. Re-run mobile and desktop tests and record before/after values.

### Priority 4 — Clarify conversion only after confirming the business goal

If the user wants inquiries rather than only traffic:

1. ask what the visitor should request;
2. define one primary conversion;
3. make one corresponding CTA path;
4. measure a success-page view or another available non-Pro signal;
5. do not invent products, services, case studies, customers, or research credentials.

## 14. Do not do these things

- Do not create more pages merely to increase URL count.
- Do not rewrite all high-impression snippets in one batch.
- Do not change `/robot-skin` casually; it is the current control and best non-homepage performer.
- Do not treat the stale 2026-07-10 indexing report as current.
- Do not interpret eight Analytics visitors as a stable audience.
- Do not describe an open GitHub issue as an earned backlink.
- Do not republish a research paper's claims without checking the primary source.
- Do not call a sensing mechanism “self-powered” without clarifying whether the full system is powered.
- Do not install more analytics or upgrade Vercel without user approval.
- Do not perform a broad visual redesign during a CTR, indexing, or outreach task.

## 15. Files that define current behavior

| Area | Files |
| --- | --- |
| News and article data | `src/lib/news-data.ts` |
| Research data | `src/lib/research-data.ts`, `src/lib/research-index-data.ts` |
| Main sitemap | `src/app/sitemap.ts` |
| News sitemap | `src/app/news-sitemap.xml/route.ts` |
| Robots | `src/app/robots.ts` |
| Analytics integration | `src/app/layout.tsx`, `package.json` |
| Protected URL contract | `config/protected-urls.json` |
| Noindex contract | `config/noindex-urls.json` |
| Export verification | `scripts/verify-export.mjs` |
| Production verification | `scripts/verify-production.mjs` |
| Search monitoring | `docs/seo/search-console-monitoring.md` |
| Outreach log | `docs/seo/outreach/outreach-log.csv` |

## 16. Definition of done for the next optimization node

A next-node optimization is complete only when:

- the action obeys the date gates;
- the change is tied to a measured problem;
- unrelated code and content remain untouched;
- tests, lint, build, and export verification pass when code changes;
- the production deployment is Ready;
- `node scripts/verify-production.mjs https://roboskin.ai` passes at the deployed commit;
- Search Console or outreach records are updated when relevant;
- the final report separates completed actions, pending external responses, and unverified outcomes.

Suggested prompt for the next session:

```text
Open C:\Users\Administrator\roboskin.ai\docs\seo\NEXT-OPTIMIZATION-HANDOFF.md.
Follow its date gates and inspect current evidence before editing.
Optimize only the highest-priority measurable bottleneck, verify the result, and update the source-of-truth monitoring record.
```
