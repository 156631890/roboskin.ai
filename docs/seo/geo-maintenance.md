# GEO maintenance and useful resource use

Protocol date: October 21, 2026. Fixed question set: `geo-questions-v1`.

The objective is to help relevant readers use a dataset, comparison, tutorial or
evaluation resource. Search clicks, AI mentions and publication counts are
intermediate signals. An accessible Markdown representation improves retrieval;
it does not establish indexing, an AI citation or useful human engagement.

## Responsibilities and cadence

| Activity | Owner and timing | Evidence and scope |
| --- | --- | --- |
| Release acceptance | The existing repository release process, after every production change | Verify the actual deployed commit and public HTML/Markdown behavior before recording release completion. |
| Research discovery | Existing daily research watch, 09:17 Asia/Shanghai | Primary-source candidates and the editorial review queue. This does not measure private analytics or AI-answer citations. |
| GEO review | Native local heartbeat, Tuesdays and Fridays at 09:30 Asia/Shanghai | Read available analytics, sample the fixed questions, inspect resource paths, and choose a supported maintenance action. |

**Scheduling status, October 21, 2026:** native local heartbeat `roboskin-geo` is
configured and active for the Tuesday/Friday schedule above. Creation and the
local configuration were confirmed; its first scheduled execution has not yet
occurred. Schedule configuration does not prove a completed review. Retain the
activation and subsequent run evidence in the local maintenance record and
verify the host timezone. Local runs depend on an available host and required
signed-in services. Keep the existing research-watch schedule, notification
preferences and unrelated automations.

Use the [search-led content loop](search-led-content-loop.md) to select work.
Each review checks the latest checkout, production commit, active experiments
and prior evidence first. Existing project authorization covers scoped technical
repairs and their normal verified release process. It does not authorize new
outreach, paid services, broader tracking or bulk content production. Follow the
existing maintenance lock and release rules for authorized remote writes.

## Fixed questions and resource mapping

Ask these exact English questions without inserting RoboSkin, a domain, a site
restriction or a suggested source. Keep IDs stable. Version any wording change
and retain earlier samples rather than silently replacing the baseline.

| ID | Question, version 1 | Intended answer URL | Useful next resource | Existing engagement signals |
| --- | --- | --- | --- | --- |
| Q1 | How should I plan a first tactile AI experiment for robot manipulation? | `/tactile-ai` | `/tactile-ai#experiment-worksheet`, then `/resources/tactile-experiment-worksheet.csv` | GA4 `resource_open` and `resource_download`, `resource_id=experiment-worksheet`; Vercel `Experiment Worksheet Download` |
| Q2 | Which visuotactile robot learning datasets provide usable data, code and clear licenses? | `/datasets` | Dataset comparison/export controls and `/resources/tactile-dataset-selection-checklist.csv` | Vercel `Dataset Compare`, `Dataset CSV Requested`, `Dataset Citation Copy`, `Dataset Checklist Download`; GA4 `resource_download`, `resource_id=dataset-checklist` |
| Q3 | How should I compare DIGIT, GelSight Mini and ReSkin for grasping and slip detection? | `/sensors` | `/guides/gelsight-vs-digit`, `/guides/slip-detection-robot-hand`, and the exact original sensor sources | GA4 `resource_open`, `resource_id=gelsight-digit-comparison` or `slip-guide`; Vercel `Sensor Guide Open` and `Source Open` where instrumented |
| Q4 | How should tactile sensor data be timestamped and validated in ROS 2? | `/guides/ros2-tactile-sensing` | The linked ROS 2 starter-kit contract and `/guides/python-tactile-data-processing` | Vercel `Tutorial Open`, `Tutorial Visit` and `Source Open` where instrumented; GA4 `resource_open`, `resource_id=python-guide` |
| Q5 | What should I check before converting tactile robot demonstrations to LeRobot format? | `/guides/lerobot-dataset-format` | Its local validation/loader examples and `/datasets` for source and license checks | Vercel `Tutorial Example Download` and `Tutorial Visit`; GA4 `resource_open`, `resource_id=dataset-directory` |
| Q6 | How do robot world models and vision-language-action models use tactile information, and what evidence supports their claims? | `/robot-world-models` and `/robot-vla-models` | `/guides/visuo-tactile-world-models-robot-manipulation` and `/vla/models` | GA4 `resource_open`, `resource_id=world-model-comparison` or `vla-model-comparison`; Vercel `Source Open` where instrumented |

These are destination and event mappings, not observed usage. An event is only
available for a matching instrumented interaction. A direct arrival need not
emit an internal `resource_open`. Verify the current instrumentation before
interpreting an absent event. Downloads, comparisons and source visits are
proxies for usefulness; task completion or successful reproduction needs separate
evidence, such as an actual run record or voluntary reader feedback.

## Real answer and citation samples

Use an available, authorized AI answer product with search enabled where that
mode is offered. Record the product and visible model/mode rather than assuming
an API response reproduces its consumer search behavior. Prefer a fresh
conversation for each question. Keep language, region and mode consistent when
comparing runs; record unavoidable changes and account personalization limits.

On each Tuesday/Friday review, attempt one answer per fixed question per selected
available product. Record every attempted sample, including a refusal, missing
search access or failure; do not reroll until RoboSkin appears. Access barriers
remain `unavailable`, not a zero citation. Do not buy access, bypass challenges
or claim an unexecuted sample was completed. Separate any brand-directed or
site-restricted diagnostic question from this non-branded set.

For each attempt retain:

- question ID/version and verbatim question;
- timestamp in UTC and Asia/Shanghai, product, visible model, mode, language,
  region and new/existing conversation status;
- the actual answer excerpt and a private evidence file or accessible answer
  reference, with account details and secrets excluded;
- exact cited URLs, the claim each citation supports, and whether opening the
  link confirmed the destination and supporting content;
- separate outcomes for linked RoboSkin citation, unlinked brand mention,
  other sources only, and unavailable/unverified output.

Report linked citations as the observed count over completed comparable samples,
alongside unavailable attempts. Do not label this small sample a market-wide
visibility share. Keep cited URL, supporting claim and usefulness distinct: a
brand mention is not a citation, and neither is a proven visit or conversion.
Retain a bad or unsupported citation as a quality issue rather than a success.

## Seven- and 28-day measurement boundaries

Use the latest complete seven- and 28-day periods for each provider, with exact
start/end dates, timezone, environment, filters and retrieval time. Compare each
with its immediately preceding equal-length period. GSC may have a different
settled end date; retain it rather than forcing all sources to appear current.
Rolling reviews overlap and are not independent experiments. For a release,
also preserve its first complete post-release cohort and concurrent changes.

| Source | What to retrieve | What it does not establish |
| --- | --- | --- |
| Vercel production analytics | Complete/referrer-filtered results for `chatgpt.com` and `chat.openai.com`, by referrer hostname and request path; provider visitors and page views; relevant existing resource events | Top-N absence is not zero. `requestPath` is not a confirmed session landing page. Provider visitors are not independently verified humans. |
| GA4 | Available source/medium and curated resource events for consenting production visits, preserving `resource_id`, `from_path` and `target_path` when exposed | Consent coverage differs from Vercel. Do not add their audiences or join aggregate events into an ordered user funnel. |
| Search Console | Same property, search type, page/query cohort, country and device; clicks, impressions, CTR and position | Disclosed query/page rows may not sum to property totals. Search clicks are not AI citations, sessions or completed resource tasks. |
| Citation sample ledger | Actual answers and opened source links under the fixed protocol | A crawler request, referrer hostname, UTM tag or build success is not proof of an AI-answer citation. |

Fetch all available matching rows or paginate; do not infer zero from a short
referrer leaderboard. Keep generic `openai.com` separate from ChatGPT. If UTM
dimensions require a paid plan or a provider is inaccessible, record
`unavailable` and the limitation; do not upgrade or fabricate a value. Record an
observed zero only when the query succeeded with the documented full scope.

The ChatGPT attribution repair applies to future observations and cannot restore
missing historical attribution. A missing referrer can use the implemented strict
single `utm_source=chatgpt.com` fallback; it remains a source signal, not proof of
a human visit or a source citation. Keep identifiable owner/test activity
separate. Do not send synthetic production events or bypass bot filtering to
make a chart move.

`resource_download` and `Dataset CSV Requested` measure interaction/request
intent, not a completed transfer or successful use. A clipboard citation event
does not prove a later publication cited the resource. Interpret these signals
alongside observable destination visits, actual artifact access, repeat use and
voluntary feedback without inventing joins or missing observations. Sparse
samples justify longer observation, not a causal growth claim.

## Technical acceptance after every release

Confirm the expected repository merge SHA, Vercel Ready deployment and production
`/deployment.json` agree. Use the project production verifier and the public HTTP
Markdown verifier against the actual production origin, retaining their results:

```sh
node scripts/verify-production.mjs https://roboskin.ai
node scripts/verify-agent-markdown.mjs https://roboskin.ai
```

Acceptance must cover:

- Markdown generated from the current server build, with no stale export assets
  or private/noindex page contents;
- ordinary HTML and explicit `Accept: text/markdown` for the homepage, Tactile AI,
  datasets, sensors and LeRobot guide, with correct status, MIME, canonical
  identity, useful body and source/resource links;
- `Vary: Accept` on both representations, preserving Next's existing RSC/router
  fields on HTML; Markdown must contain no HTML/framework payload;
- browser Accept and `text/markdown;q=0` retaining HTML; the implemented
  negotiation contract uses Markdown-first Accept forms, not full preference
  ranking for every possible Accept header;
- real 404 status and recovery links including `/sitemap.xml` and `/llms.txt`,
  plus unchanged API, member and intentional noindex responses;
- changed resource destinations, download controls, internal links, canonical,
  robots and sitemap behavior where the release affects them.

Use a focused server-build check as well as HTTP checks when changing generation
or negotiation. A static-export pass alone cannot validate the server deployment.
Do not weaken an assertion to hide a response regression. Distinguish local
checks, exact-commit CI, preview checks and actual production verification.

## Review record and next action

Keep private analytics, answer evidence and account-specific observations outside
Git in the existing maintenance evidence store. Each run records its timestamp,
actual checkout/production SHA, sample version, provider windows, evidence paths,
limitations, finding, action and the next observation date. Save sanitized
editorial decisions in the appropriate growth-batch record when useful.

Diagnose the weak stage: access/representation, answer accuracy, citation
coverage, relevant arrivals, or resource use. Choose one supported improvement to
the existing canonical answer before proposing another page. Useful changes can
clarify an answer, repair a resource, add a primary source or expose an existing
comparison, license or runnable example. Preserve active experiments and factual
boundaries. No code/content change is a valid result when the evidence is weak.

Never manufacture analytics, citations, publication dates, third-party approval
or experimental results. Completing this protocol does not by itself demonstrate
growth. Record actual schedule activation and subsequent runs separately from
the maintenance plan.
