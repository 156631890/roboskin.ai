# Search baseline and referral measurement repair — 2026-09-08

## Scope and checkout

User approved execution of the two priority actions: high-impression page search
review and verification of visitor/tool analytics. Checkout:
`C:/Users/Administrator/roboskin.ai`, branch
`codex/ai-robotics-semantic-hub-20260821`, starting commit
`0407dfbf10b127aafdba375de80bb4acaf7aa32d`.

The earlier snippet improvements were already released in `8ecd16b`, followed
by the dataset-tool release in `0407dfb`. Do not describe those as new work in
this continuation. Both public URLs returned HTTP 200 and their current title,
description and canonical were rechecked. The production dashboard showed
`0407dfb` READY before this repair. No additional title experiment was started.

## Search Console baseline rechecked

Domain property `sc-domain:roboskin.ai`, Web, August 9–September 5, 2026.
September 8 read: 147 clicks, **20,289 impressions** (the UI's accessible label
provides the exact number behind 2.03万), 0.7% CTR, position 9.1. Last update
displayed five hours ago. This still predates today's releases.

| Page | Clicks | Impressions | Displayed CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| `/datasets` | 3 | 1,259 | 0.2% | 7.8 |
| `/guides/visuo-tactile-world-models-robot-manipulation` | 1 | 1,855 | 0.1% | 7.7 |

The dataset page exposes only seven queries, totaling 12 disclosed impressions:
`site:roboskin.ai` (5), `ai robotics training datasets` (2), and `tactidex`,
`vtdexmanip`, `tactile data`, `robotic dataset`, and
`robotics manipulation and motion datasets` (one each). All disclosed clicks are
zero. These rows do not explain the page's total impressions or prove a CTR cause.

World-model queries again include `visuo-tactile world models` (54 impressions,
8.8 position), `vitacworld` (34, 7.6), `tactile world model` (22, 8.1), and
`vt-wm` (4, 8.3), all with zero disclosed clicks. Its current comparison title
and named-system description already address those observed terms.

Retain September 9–October 6 as the first complete post-release 28-day window,
read after GSC settles. Compare the same page/query/country/device scope and
account for ranking changes. No causal improvement or new ranking is claimed.

## Vercel dashboard observations

Dashboard: https://vercel.com/stevens-projects-08c9c5b0/roboskin-ai/analytics

Read around 11:10–11:15 Asia/Shanghai on September 8. Selected environment:
Production; Last 7 Days; UI date label: `Sep 1, 11:00 - Sep 8, 11:59`.
This is a rolling window including the current partial day, not the GSC window.
The Hostnames panel showed `roboskin.ai` with 216 visitors.

| Dashboard scope | Visitors | Page views | Bounce rate |
| --- | ---: | ---: | ---: |
| Whole project, Production | 216 | 309 | 81% |
| `/datasets` filter | 14 | 14 | 79% |

Visible page visitors: homepage 37, robot foundation models 17, tactile AI 16,
datasets 14, humanoid robot skin 12, physical AI 11, world-model guide 10.
Visible referrers: google.com 46; bing.com 3; discourse.openrobotics.org,
gemini.google.com, github.com, google.com.hk and yandex.ru two each. These are
dashboard records, not proof of accepted submissions or publicly crawlable links.

The expanded Events list displayed these totals:

| Event | Total |
| --- | ---: |
| Reading Depth | 388 |
| Referral Landing | 52 |
| Research Brief Open | 4 |
| Research Data Open | 2 |
| Contact Form Submit | 1 |
| Contact Form Success | 1 |
| Contact Intent | 1 |
| Research Index Filter | 2 |
| Source Open | 2 |
| Submit Source Intent | 1 |

With `/datasets` selected, the full Events dialog contained Reading Depth (24)
and Referral Landing (1). Dataset Search, Dataset Filter, Dataset Compare,
Dataset CSV Requested, Dataset Citation Copy and Dataset Checklist Download
were absent at inspection. The tool was released only around one hour earlier;
absence does not establish instrumentation failure or lack of future demand.

Existing pageviews and custom-event ingestion are now confirmed at the dashboard.
Counts are provider-defined aggregates and may include owner/testing activity;
they are not independently verified unique human users or qualified leads.
Event visitor counts differ from pageview visitor counts (Reading Depth displayed
224 versus the project total of 216); do not divide those figures into a funnel.
The previous automated trace only confirmed script loading because Vercel filters
headless/automation traffic. No bot-filter bypass or synthetic production events
were used in this inspection.

## Referral Landing repair

The root tracker read the unchanged `document.referrer` every time `usePathname`
changed. A Google visitor navigating from `/datasets` to `/research-index` and
`/contact` therefore generated additional Referral Landing events attributed to
internal destinations. Historical event totals cannot be treated as arrivals.

Add a component-lifetime ref guard so only the first document landing can emit
this event. The root layout retains the tracker during client-side navigation.
Full document loads remain separate landings. Existing source classification,
reading-depth and click events are unchanged. No new personal properties,
dependencies, paid services or tracking providers were added.

Regression verification transpiles and executes the actual component with a small
hook harness: referral landing remains tied to the initial path across route
changes and effect replay; direct visits remain unattributed. The referral test
failed on the original implementation and passed after the guard was added.

All 166 tests and ESLint passed. Build, export and production release evidence
are recorded in `output/growth-tool-2026-09-08/analytics-release.md`.
This fix changes future event semantics; it does not rewrite historical data.

## Next evidence to collect

After organic usage accumulates, inspect the new dataset events and their path,
scope, result-count or dataset properties. Use consistent event totals over the
same window; do not infer an ordered user funnel from aggregate counts. Continue
the existing GSC observation window before changing titles again. No recurring
automation, email follow-up or new external submission was created here.
