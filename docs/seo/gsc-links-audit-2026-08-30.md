# Google Search Console Links Audit — 2026-08-30

## Scope

- Property inspected: `sc-domain:roboskin.ai`
- Report: Google Search Console > Links
- Inspection mode: read-only
- No Search Console setting, indexing request, or external publication was changed.

## Live GSC snapshot

The visible Links report showed:

| Metric | Live value |
| --- | ---: |
| External links | 2 |
| Top linking root domains | 1 |
| Internal links | 1,267 |

Visible external-link rows:

| Target URL shown by GSC | Links | Top linking root domain | Visible anchor text |
| --- | ---: | --- | --- |
| `https://roboskin.ai/guides/physical-ai-touch-data` | 1 | `x.com` | `roboskin ai guides physica` |
| `https://roboskin.ai/physics-ai` | 1 | `x.com` | `roboskin ai physics ai` |

Both target URLs are legacy redirect sources. Production resolves them to
`/physical-ai-touch` and `/physical-ai`, respectively.

## Verified public backlink position

Four published placements remain live across three unique referring root
domains, containing seven direct RoboSkin links in total:

| Referring page | Links | Link treatment verified on 2026-08-30 |
| --- | ---: | --- |
| [Awesome-Touch README](https://github.com/linchangyi1/Awesome-Touch/blob/main/README.md) | 1 | GitHub renders the outbound link with `rel="nofollow"` |
| [Awesome Robot Learning README](https://github.com/RayYoh/Awesome-Robot-Learning/blob/master/README.md) | 1 | GitHub renders the outbound link with `rel="nofollow"` |
| [Robotics & Automation News article](https://roboticsandautomationnews.com/2026/08/19/researchers-combine-eit-and-pneumatic-sensing-for-humanoid-robot-skin/104274/) | 1 | Followed editorial link; no `nofollow`, `sponsored`, or `ugc` attribute found |
| [RoboticsTomorrow article](https://www.roboticstomorrow.com/story/2026/08/hybrid-robot-skin-combines-eit-location-maps-with-pneumatic-force-sensing/26954/) | 4 | Four followed editorial links; no `nofollow`, `sponsored`, or `ugc` attribute found |

All four referring pages returned HTTP 200 during the audit. Their public
robots rules did not block the audited paths. RoboSkin landing pages returned
HTTP 200 directly or after the documented permanent redirects.

The Reddit placement remains excluded: anonymous access returned HTTP 403, so
its logged-in visibility is not sufficient evidence of a publicly crawlable
backlink.

## Interpretation

The gap is not evidence that RoboSkin blocks Google. The live site exposes
index/follow metadata, canonical URLs, and an allow-by-default robots policy.
The more likely explanation is the Links report's sampling and processing lag,
combined with source-page indexing or deduplication and GitHub's nofollow
treatment.

Google documents that the Links report is not a comprehensive list and may
omit URLs for reasons including non-indexed pages and deduplication:
<https://support.google.com/webmasters/answer/9049606?hl=en>.

## Export status and next check

The visible report was captured successfully. The `Export external links`
menu did not respond within two bounded browser-control attempts, so no CSV or
Google Sheets export is claimed or stored by this audit.

On 2026-09-19:

1. Reopen the domain property Links report.
2. Export both `Latest links` and `More sample links` if the menu responds.
3. Compare referring domains, linking pages, target URLs, and discovery dates
   against this snapshot.
4. Do not treat pending outreach, open pull requests, email receipt, or
   logged-in-only social content as earned crawlable backlinks.
