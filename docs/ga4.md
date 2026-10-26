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

## Research service funnel

The resource allowlist includes the landscape sample page (`research-sample`),
its PDF link (`research-sample-pdf`), and the service entrance (`research-services`).
These remain internal click events. Direct arrivals are page views.

The research form emits four fixed events through the existing consent-controlled
GoogleAnalytics collector: `research_inquiry_start` on the first visible field
change, `research_inquiry_submit` on a submission attempt, `research_inquiry_error`
when the delivery cannot be confirmed, and `research_inquiry_accepted` only after
the existing transport validates an acknowledgement. A pending duplicate submit
does not emit another attempt. Consent is required at the time of the event;
earlier stages are never replayed after permission. Withdrawal removes collection.

Only `form_id=research-services` and `page_path=/research-services` are sent.
No names, emails, company names, budget values, research questions, receipt IDs,
challenge tokens, queries or fragments enter these events. The form's existing
delivery and Vercel Analytics behavior are retained. No automatic form tracking
or additional persistence is enabled.

An accepted event means the delivery service acknowledged the request. It does
not confirm inbox delivery, qualification, a unique prospect, an order or revenue.
Retries can be accepted separately; deduplicate real opportunities in the private
sales register. Qualify by an identifiable organization, a concrete research
decision within scope, timing and a confirmed commercial next step. Record paid
revenue from verified business records, not browser events. GA4's consented funnel
is a subset of activity and must not be used as the total number of inquiries.

Coverage starts only after this change is deployed; historical missing stages
cannot be reconstructed. Configure event-scoped dimensions or key events only in
the verified RoboSkin property if operationally needed. Do not assign monetary
value to an accepted form or label it as a purchase. Realtime receipt remains a
separate production check from the local transport/consent tests.
