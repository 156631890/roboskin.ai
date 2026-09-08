# Search and backlink actions — 2026-09-08

## Verified baseline

Checkout: `C:/Users/Administrator/roboskin.ai`, branch `codex/ai-robotics-semantic-hub-20260821`.
Starting commit: `65d835c7c8dd4e785cc548ed5133efff5401764f`.

Live Google Search Console domain property `sc-domain:roboskin.ai`, Web search,
2026-08-09 through 2026-09-05 (28 days), read on September 8, last updated 7 hours
before inspection: 147 clicks, approximately 20,300 impressions (UI: 2.03万),
0.7% CTR, average position 9.1. Rounded figures must not be treated as an exact export.

| Page | Clicks | Impressions | UI CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| `/guides/visuo-tactile-world-models-robot-manipulation` | 1 | 1,855 | 0.1% | 7.7 |
| `/` | 50 | 1,481 | 3.4% | 7.5 |
| `/datasets` | 3 | 1,259 | 0.2% | 7.8 |
| `/robot-foundation-models` | 2 | 1,098 | 0.2% | 9.1 |
| `/robot-vla-models` | 1 | 1,054 | 0.1% | 9.1 |
| `/news/touchworld-tactile-foundation-model-dexterous-manipulation-2026` | 11 | 1,000 | 1.1% | 6.5 |
| `/tactile-ai` | 12 | 992 | 1.2% | 7.8 |
| `/research-index` | 3 | 901 | 0.3% | 8.8 |
| `/research` | 0 | 787 | 0% | 9.5 |

The world-model guide's disclosed query rows include “visuo-tactile world models”
(54 impressions, position 8.8), “vitacworld” (34, 7.6), “tactile world model”
(22, 8.1), and “vt-wm” (4, 8.3); all had zero disclosed clicks. The dataset page
only exposes seven query rows, including TactiDex and VTDexManip at one impression
each. Query rows are incomplete and do not explain all page impressions; do not
infer the hidden query mix or claim a proven CTR cause.

Three-month context, June 6–September 5: 322 clicks, approximately 35,800
impressions (UI: 3.58万), 0.9% CTR, position 8.8. These differently sized windows
are not a before/after experiment.

Ubersuggest's US-English estimate (latest keyword month August 2026): 23 organic
keywords, estimated monthly traffic 5, authority score 5, 6 backlinks / 3 referring
domains. This is a scoped third-party estimate, not global measured traffic.

## Focused onsite changes

- World-model guide: title now promises a five-system comparison; description
  names VT-WM, Dream-Tac, TouchWorld, ViTacWorld and FeelWorld and explains the
  comparison fields. All five already appear in the sourced comparison table.
- Dataset directory: title and description identify filters, download references
  and license checks. The short answer gives concrete dataset examples and keeps
  incomplete-release and unstated-license limitations explicit.
- Removed the stale “16-record” dataset kicker; the structured directory has 19
  entries. The replacement avoids another hard-coded count.
- Robot foundation-model directory: description identifies OpenVLA, Octo and RT-2
  and the practical code, weight, embodiment and evaluation fields already present.
- No new URL, redirect, canonical change or unsupported research claim. Existing
  research-review dates are retained; this is an editorial discovery improvement,
  not a claim that all primary-source releases were re-audited today.

## Public backlink recheck

All five known referring pages below returned HTTP 200 and exposed direct links
to RoboSkin in their public HTML. This is a verified subset, not an exhaustive
internet-wide backlink count: **5 placements, 8 direct links, 3 root domains**.

| Referring page | Direct links | Observed rel |
| --- | ---: | --- |
| [Awesome-Touch](https://github.com/linchangyi1/Awesome-Touch/blob/main/README.md) | 1 | nofollow |
| [Awesome Robot Learning](https://github.com/RayYoh/Awesome-Robot-Learning/blob/master/README.md) | 1 | nofollow |
| [Awesome-Embodied-AI](https://github.com/wadeKeith/Awesome-Embodied-AI/blob/main/README.md) | 1 | nofollow |
| [Robotics & Automation News](https://roboticsandautomationnews.com/2026/08/19/researchers-combine-eit-and-pneumatic-sensing-for-humanoid-robot-skin/104274/) | 1 | noopener; no nofollow/sponsored/ugc |
| [RoboticsTomorrow](https://www.roboticstomorrow.com/story/2026/08/hybrid-robot-skin-combines-eit-location-maps-with-pneumatic-force-sensing/26954/) | 4 | none |

**C28 correction:** [PR 5](https://github.com/wadeKeith/Awesome-Embodied-AI/pull/5)
was merged on 2026-08-25 at 16:38:41 UTC. Its public README links to
`https://roboskin.ai/guides/ros2-tactile-sensing`. This corrects the older pending
entry; it is not a new submission or a placement obtained on September 8.

Read-only audit of all 15 distinct GitHub PR/issue URLs in the outreach log:

- Merged: C13, C28.
- Open PRs: C02, C14, C18, C26.
- Open issues: C09, C10, C15, C16, C17, C20, C24, C25.
- Closed scope decline: C19. Respect the maintainer's decision; no retry.
- C09/C10 already have a final follow-up; do not send another.
- C24/C25 remain scope questions; no unsolicited PR while approval is absent.

GSC Links still reports 2 external links, 1 referring domain (`x.com`), and 1,267
internal links, matching the August 30 snapshot. The two targets remain legacy
redirect URLs. GSC sampling/processing and verified source-page HTML are separate
observations; no new Google-recognized referring domain is claimed.

## Prepared outreach

The Weekly Robotics and IEEE RAS Robot Learning TC original Gmail conversations
were read in full; each contains only the original sent message before drafting.
A targeted incoming-mail search after August 25 also returned no matching replies.
The TC Resources page returned 200 and contained no RoboSkin link.

Two personalized, one-time follow-ups were saved as unsent Gmail replies:

- M07 Weekly Robotics: a concrete article sidebar distinguishing frames,
  trajectories and evaluation trials; preserves the original 1,200–1,600-word
  original-article proposal. It does not claim a completed article or acceptance.
- C27 IEEE RAS Robot Learning TC: a ready-to-edit, one-line resource description
  and the canonical dataset URL; preserves disclosure and evidence limitations.

Exact bodies and draft identifiers are in the local
`output/seo-2026-09-08/outreach-drafts.md`. No email, GitHub comment or community
post was sent in this batch. Sending these two messages requires explicit user
authorization. Drafts and open PRs do not count as earned links.

## Validation and next measurement

Local validation passed: all 160 tests, ESLint, production build, and static-export
verification (110 sitemap URLs, 114 URL contract entries, 191 graph entities).
Validation/deployment evidence is recorded in `output/seo-2026-09-08/`.
After deployment, verify the exact production commit and three changed URLs,
then submit only those URLs to IndexNow. Acceptance is a receipt, not indexing
or ranking evidence.

Use September 9–October 6 as the first complete 28-day observation window,
retrieved after GSC data settles. Compare the three changed pages against the
baseline above, keeping country/device and query mix in mind. Treat changes as
observational, not proof of causality. Recheck links on or after September 19
as already planned; do not create duplicate follow-ups or background automations.
