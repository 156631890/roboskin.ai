# Google Analytics 4

Production uses the RoboSkin.ai property in the Elosung Analytics account and the
RoboSkin.ai Web stream (`https://roboskin.ai`). The public measurement ID is supplied
by the Vercel **production-only** variable `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
No API secret is needed. Preview builds and local hosts must not collect into it.

The site asks visitors to allow or decline GA4. Before permission, no Google tag
is loaded. A footer control reopens the choice. Withdrawal disables measurement
and expires the site's `_ga` cookies. Vercel Web Analytics remains independent.

`GoogleAnalytics` owns page views: `send_page_view: false`, then one explicit
`page_view` for the initial page and each pathname change (including a return).
Keep **Enhanced measurement off** in Admin → Data streams → RoboSkin.ai Web;
enabling automatic history events would count navigation twice. No automatic
form/search/outbound data is collected. Queries and hashes are removed; external
referrers retain only their origin. Campaign query parameters are consequently
not reported. Advertising personalization and Google signals are disabled.

Validate a clean browser: no Google requests before consent or after decline;
allow, then check `g/collect` uses the configured ID, sanitized `dl`/`dr`, and one
`en=page_view` per navigation. Check GA4 Realtime for receipt, separately from
HTTP transport success. Standard reports can take 24–48 hours to populate.

Tests: `node --test tests/google-analytics.test.mjs`, then the project quality gate.
