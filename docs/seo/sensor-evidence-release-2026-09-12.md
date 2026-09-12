# Sensor guides and experimental evidence — September 12, 2026

## Scope and release status

User-approved batch: one experimental-results module, three thoroughly sourced sensor guides, then email signup and separate batch measurement. This is a documentary research resource; RoboSkin.ai has not performed the cited experiments.

- New canonical guides: `/sensors/digit`, `/sensors/gelsight-mini`, `/sensors/reskin`.
- Updated hubs: `/sensors`, `/benchmarks#experiment-evidence`.
- Six results from three studies; study filtering and CSV export preserve the protocol, sample, interpretation, artifact access and limitations. The edge-contact TacPrint record is a subset of the 40-position experiment.
- Full CSV: `/experiment-results.csv`. Full machine-readable knowledge includes the same six records and boundaries.
- Publication receipt and actual search-submission outcomes are recorded in [the content batch](growth-batches/2026-09-12-evidence-sensors.json).
- Newsletter remains a separate [activation batch](growth-batches/2026-09-12-newsletter.json). Do not enable a guessed endpoint or count an attempted handoff as a subscriber.

## Demand and sources

English Google queries reviewed: “DIGIT tactile sensor Python interface”, “GelSight Mini sensor specifications calibration”, and “ReSkin sensor magnetic calibration”. Official projects, repositories and product documentation were visible. This was the current signed-in browser/China-region session, not a controlled US SERP. No keyword-volume or ranking forecast is asserted.

| Guide | Primary evidence | Material distinctions |
| --- | --- | --- |
| DIGIT | [2020 paper, Table I](https://arxiv.org/pdf/2005.14679#page=2), [official project](https://digit.ml/digit.html), official design and interface repositories | Paper hardware 60 FPS versus documented Python default 30 FPS; both reviewed repositories archived and CC BY-NC 4.0; historical $15 component estimate is not a retail price. |
| GelSight Mini | [Manufacturer datasheet, page 3](https://www.gelsight.com/wp-content/uploads/productsheet/Mini/GelSight_Datasheet_GSMini.pdf), [manufacturer web app](https://www.gelsightmini.com/), [gsrobotics](https://github.com/gelsightinc/gsrobotics) | Camera 8 MP/25 FPS versus 320×240 processing default; 18.6×14.3 mm FOV; preferred operating range differs from storage; coin-press test is not general durability. Exact pinned `LICENSE` fetched successfully and says GPL v3. |
| ReSkin | [Official project](https://reskin.dev/), [paper](https://arxiv.org/pdf/2111.00071), [official-linked author repository](https://github.com/raunaqbhirangi/reskin_sensor) | Five magnetometers, 15 magnetic channels plus five temperature readings; reported acquisition around 400 Hz; calibration/transfer depend on the skin and setup; Python library MIT. |

Pinned repository revisions reviewed:

- `facebookresearch/digit-interface`: `87a28bbf2beee8008a5308e9a12d72e1bc4fefb9`
- `facebookresearch/digit-design`: `de292229d43eed1deba58b856b2fe1ee04097631`
- `gelsightinc/gsrobotics`: `321d6a22da64529138ff10237335038fd8c5189f`
- `raunaqbhirangi/reskin_sensor`: `b82de2a9e9300af3062b3d635a85a2365af14a98`

The result module reuses the versioned source audit in [the September 11 release](research-content-release-2026-09-11.md): TacPrint Section IV-C/Figure 11; TacVerse Tables 2–3; TWINS Section 4.4. It preserves missing denominators and qualitative policy-evaluation boundaries. Supporting PDFs, extracted text, page images, repository snapshots and SERP text are local in `.artifacts/sensor-evidence-2026-09-12/` and `.artifacts/content-research-2026-09-11/`.

## Verification

- All 170 local tests passed; lint, production build and static export passed. GitHub's [Quality gate](https://github.com/156631890/roboskin.ai/actions/runs/34666942975) also passed. Logs reside in the current evidence folder.
- Static export check: 117 sitemap URLs; 121 protected URL entries; 5 noindex URLs; 191 graph entities; 30 research-index records; 50 RSS items.
- Desktop and 390 px mobile checks cover all three guides. One H1, self-canonical and working return-to-directory links; no document-width overflow on mobile. The module's 1,280 px table scrolls inside its own region.
- Browser filter changed 6 records to the 2 TacVerse records. The actual downloaded file matched those same two rows in the complete CSV, including all 17 columns, primary-source URLs and limitations.
- Captured browser events contained batch, path, study and record count. Verification events were intercepted locally; they are not organic traffic or conversions.
- Production content release: `a6b21607ee70885a429dcb4ab596f549e0b89fa3`; Vercel `dpl_3v4aoxvbuaqfq64LgR73UXiNUgF9`, READY at 2026-09-12 02:12:28 UTC. The full production verifier passed against this exact commit. Live CSV returned HTTP 200 with `text/csv; charset=utf-8` and matched the local six-record, 17-column file byte for byte.
- Live browser checks confirmed all three guide pages and a one-record TWINS filter/export preparation. Four controlled production page visits may appear in analytics; custom verification events were intercepted locally. No organic conversion is claimed from verification.
- IndexNow accepted all five changed canonical paths with HTTP 200. Google accepted indexing requests for all three new guide URLs. GSC accepted the updated sitemap on September 12 and reports Success, last read September 12, 117 discovered pages. Initial URL Inspection reported all three new URLs unknown/not indexed; request acceptance does not change that observed status into indexed.

## Measurement workflow

Keep content and newsletter activation dates separate. The initial GSC export covers August 13–September 9, 2026 (Web, all countries/devices). Whole-site totals are 24,640 impressions and 170 clicks. Existing cohort pages are `/sensors`: 869 impressions/3 clicks and `/benchmarks`: 840 impressions/3 clicks. These are pre-change baselines, not new-content outcomes. New pages were unpublished; their baseline is unavailable rather than an observed zero.

At each checkpoint, append a dated observation to the corresponding batch JSON rather than replacing the baseline:

1. **Indexing:** inspect each of the three new canonical URLs in GSC. Record inspection date, index status, selected canonical and last crawl when disclosed. Keep request acceptance separate. `site:` counts do not replace URL Inspection.
2. **Search:** export GSC Performance CSV with the actual date range, Web search type and consistent country/device filters. Use page rows for the exact cohort. Store impressions, clicks, CTR and position for each page and attach the raw export path. A missing disclosed row is `null` with an explanation, not automatically zero. Do not compare page-summed impressions with site-aggregated impressions as identical measures.
3. **Exports:** in Vercel Web Analytics, use batch `2026-09-12-evidence-sensors`. Record `Evidence CSV Prepared` separately from `Evidence CSV Download`. The first means client-side CSV preparation and a download trigger; the second is an all-records download-link intent. Neither proves an OS save, a unique researcher, or a retained lead. Direct requests to the static CSV can bypass client analytics.
4. **Email:** record `Newsletter Subscribe Attempt` and `Newsletter Provider Handoff` separately. Confirmed, pending and unsubscribed counts come from Buttondown; exclude the owner-controlled test. Store signup-source attribution only where the provider proves it. Site `source_batch` alone cannot prove which attempts became confirmed subscribers.
5. **Dates and unknowns:** record the provider/dashboard reporting time zone, interval, collection time and unavailable metrics. D+7 and D+28 dates are planned reviews, not an installed scheduler or completed observations. If GSC data lags, retain the actual available end date and collect the missing days later.

Expansion decisions follow the evidence: indexed but no impressions calls for intent/internal-link review; impressions with weak clicks calls for title/snippet review; useful reading/export activity supports a closely related guide. Repair indexing faults before expanding. Small counts or an incomplete reporting window are insufficient to declare a winner. No automatic content expansion or audience email campaign is configured.

## Newsletter checkpoint

Google SSO completed in the browser. Buttondown onboarding reached a mandatory account review that asks the owner to describe their identity and explicitly says to fill it personally. The review page is left open. Signup endpoint, account approval, confirmation delivery, confirmed status and unsubscribe have not yet been verified. The production fallback remains RSS until this flow works.

To resume: complete the review, verify the actual newsletter username and official embedded form, configure `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` in the local build and Vercel, then perform an owner-controlled signup → email confirmation → provider-state → unsubscribe test. Exclude that test from growth metrics. Do not send a campaign.

Checkout: `C:/Users/Administrator/roboskin.ai`, branch `codex/ai-robotics-semantic-hub-20260821`, content commit `a6b21607ee70885a429dcb4ab596f549e0b89fa3`, pushed to `origin/main`. The documentation receipt is a subsequent commit. The browser Buttondown target is `58D99EE4075DC8FB1E2075C434941921` at `/home`; recheck its current state before acting. Existing user authorization covers finishing this website subscription integration and publication. The missing step is owner-written account-review information and provider approval, not a new deployment permission.
