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
referrers retain only their origin. The `roboskin-resources-20261007` campaign
accepts only four exact source/medium pairs: `x/social`, `reddit/social`,
`github/referral`, and `newsletter/email`. These approved labels are passed
as `campaign_source`, `campaign_medium`, and `campaign_name` at initialization.
Separately, when the browser supplies no referrer, exactly one
`utm_source=chatgpt.com` recovers the fixed source `chatgpt.com` and medium
`referral`, with no campaign name. This fallback never overrides an existing
referrer. Its other query values are discarded, including medium and campaign.
Unknown campaign values, duplicate required campaign parameters, `utm_term`,
`utm_content` and all other query values are discarded. Labels are held in memory, not
persisted separately. This intentionally does not support arbitrary campaigns.
Advertising personalization and Google signals are disabled.

With consent, curated internal resource links emit `resource_open` or
`resource_download`, with `resource_id`, `from_path`, and `target_path`.
No link text or form values are read. These are click events, not confirmation
of a completed download or a completed research task. Listeners are removed on
withdrawal. Page-view ownership and disabled Enhanced measurement are unchanged.
In GA4, use event counts for the two event names. Parameter-level reporting needs
matching event-scoped custom dimensions; their creation is separate from this code.

The resource allowlist also includes the VLA, robot foundation model and robot
world model directories, the robot skin and tactile AI guides, and benchmarks.
These use the existing `resource_open` event with a stable public resource ID.
The tactile experiment worksheet retains its separate ID when its fragment is
present. Table-of-contents jumps within the same resource page do not count as
new opens; explicit fragment resources such as the worksheet remain measurable.
Coverage added October 15, 2026 is prospective: historical missing resource
events cannot be recovered or compared as if they had been collected.
This does not change page-view counts or visitor counts, and does not establish
that a visitor completed a resource task.

Coverage added October 21, 2026 includes `/vla/models` with resource ID
`vla-model-comparison` and `/vla/timeline` with `vla-research-timeline`.
These measure internal link clicks after consent, including the next step from
`/tactile-ai`; direct arrivals are page views, not synthetic resource opens.
The same query removal and same-page anchor exclusions apply. These new events
and the ChatGPT source fallback cannot recover missing historical measurements.
GA4 covers consenting visits; do not add its users to Vercel visitor estimates
or treat referral clicks as the number of AI answers citing the site.

Validate a clean browser: no Google requests before consent or after decline;
allow, then check `g/collect` uses the configured ID, sanitized `dl`/`dr`, and one
`en=page_view` per navigation. Check GA4 Realtime for receipt, separately from
HTTP transport success. Standard reports can take 24–48 hours to populate.

Tests: `node --test tests/google-analytics.test.mjs`, then the project quality gate.
