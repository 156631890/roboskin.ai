# Paid reports verification — 2026-10-16

Scope: email verification → Waffo checkout → authoritative paid access → private report reading → weekly notification. This is an implementation candidate, **not a live payment release**.

## Completed locally

| Check | Result / evidence |
| --- | --- |
| `npm test` | 286 passed, 0 failed, including 19 payment/report tests |
| `npm run lint` | Passed |
| Static `npm run build` | Passed on Next 15.5.28; 203 HTML/Markdown representations |
| `npm run verify:export` | Passed: 192 sitemap URLs, 196 protected contract entries, existing SEO/link checks |
| Server `next build` | Passed with isolated fake test configuration; no live credentials or requests |
| Running Next HTTP checks | Enabled sandbox page rendered; anonymous account/report/checkout rejected (401), invalid email rejected (400), foreign origin rejected (403), unsigned Waffo webhook rejected (400), unauthenticated delivery rejected (401); API responses no-store |
| Static membership HTML | Correct title, canonical, one H1, noindex, closed checkout, no email form |
| Private-content boundary | Test report body stays behind authenticated API; private fixture absent from exported HTML/JS/JSON/Markdown |
| Original workspace | 114 existing uncommitted changes, 0 staged; preserved |

The new tests run the real SQL migration in PGlite. They exercise one-time codes, exhausted attempts, session logout, checkout consent/freshness, persistent checkout references across timeout retries, official SDK request signing/price fields, RSA raw-body verification, 45-minute signature tolerance, event mode/store identity, duplicate events, out-of-order state, renewal, expiry, cancellation, partial/full/previous-period refunds, transactional rollback/retry, private report access, editorial validation, email preferences, email receipt validation and retry/hold behavior.

The original local Waffo tests used the official SDK with an injected HTTP transport. On October 16, after the owner signed in, the real Waffo test API successfully validated the RoboSkin monthly USD 9.90 product and the order-query GraphQL contract. A real sandbox checkout session was created and its hosted page displayed USD 9.90/month and the no-real-charge banner. No successful sandbox payment or callback is claimed yet. Chrome became available for browser verification during merchant setup.

Monthly-plan follow-up: config rejects a weekly environment override, the official SDK adapter rejects a weekly Waffo product, and a real-SQL delivery test verifies two successive weekly issues under one monthly payment without another checkout. This follow-up reruns tests, lint, static build and export checks. Server-build and running HTTP checks above are baseline evidence from `7757a67`; they are not a new live-payment acceptance result.

## Remaining release gates

The owner confirmed **US$9.90 per month, with one new report every week** on 2026-10-16. Configuration and checkout now accept monthly billing only; charging frequency is no longer an outstanding question.
- Waffo test credentials, a dedicated RoboSkin store, monthly USD 9.90 product and initial API schema checks are verified. Production onboarding, tax behavior, webhook registration and a successfully paid sandbox order remain unverified. No refund or charge was executed.
- Postgres, a verified Resend sender and scheduled delivery must be configured. No real member email was sent.
- GitHub rejected the initial branch push because the active OAuth credential lacks `workflow` scope. The original full candidate remains in local commit `f0cf6da`; the review branch contains the identical scheduler as a non-executing template in `docs/operations/report-delivery.workflow.yml`. It must be installed by an authorized identity before scheduling can run. No permission change or alternative credential was attempted.
- A current, actually reviewed first issue and ongoing weekly editorial responsibility are needed before taking payment. The scheduler delivers approved issues; it does not create or approve research automatically.
- Complete desktop/mobile checkout, email inbox, portal cancellation and report reading acceptance, then follow protected PR and production SHA verification. No production deployment is claimed.

## Content check

Pages: proposed `/weekly-reports`, affected `/terms`, `/privacy` and footer entry. English; membership availability/account task; membership landing intentionally noindex. Stage: local pre-release candidate. Sources: official Waffo docs/SDK, application behavior and test outputs. No paid report body was published.

| Item | Weekly reports | Terms / Privacy |
| --- | --- | --- |
| C01 URL/purpose | 通过 | 通过 |
| C02 Main intent | 通过 | 通过 |
| C03 Title/H1 | 通过 | 通过 |
| C04 Description | 通过 | 通过 |
| C05 Known restrictions | 通过 | 通过 |
| C06 Useful content | 通过 | 通过 |
| C07 Title/transaction promise | 不过 | 通过 |
| C08 Factual accuracy | 通过 | 通过 |
| C09 Structure | 通过 | 通过 |
| C11 Sources/links | 通过 | 通过 |
| C12 Responsibility | 通过 | 通过 |
| C13 Actual changed date | Not applicable (no publication date) | 通过 |
| C14 Final rendering/index intent | 不过 | 不过 |
| C16 Internal links | 通过 | 通过 |
| C17 Actual functionality | 不过 | 通过 |

C07/C17: closed state is honest; full paid transaction cannot yet be accepted without merchant/configuration/inbox evidence. C14: actual built HTML/HTTP and index intent verified, but browser rendering is unverified. C10/C15 excluded: no new media or language variants. **Current paid release is not cleared for production.** Draft code can be reviewed while these external requirements are completed.

## Merchant-readiness follow-up

The owner approved a seven-day full refund window for the first subscription payment, investigation/remedy for duplicate or incorrect charges and failed report delivery, and cancellation without an automatic refund of the current paid period. Terms now state that policy, the support channel, refund processing, account misuse and termination handling. The shared footer displays USD 9.90/month and links to availability. These changes are intended for a **public, checkout-closed onboarding release**; opening paid membership remains subject to all gates above.

The Waffo site precheck against the old production pages identified missing pricing, refund terms and misuse consequences. Both policy URLs returned HTTP 200. The required Cloudflare TXT record was added without changing routing or mail records; public DNS returned the record and Waffo displayed the RoboSkin domain as verified. Business review is not yet approved. Merchant credentials are stored outside the repository and are not included in evidence or commits.

Follow-up tests: 286 passed, lint passed, static build and export checks passed. Logs: `tests-merchant-readiness.log`, `lint-merchant-readiness.log`, `build-merchant-readiness.log`, `export-merchant-readiness.log` in the same local evidence directory. Browser preview and production SHA checks will be recorded separately; a closed onboarding release is not evidence of a completed payment integration.

## Dependency audit

Next/eslint-config-next updated from 15.5.20 to **15.5.28**, retaining the existing major/minor series. The runtime audit's critical count dropped from 1 to 0. It still reports 4 high and 1 moderate findings in existing Next image/CSS/source-map transitive dependencies (next, sharp, postcss, nanoid, source-map-js). The site has image optimization disabled, and membership accepts no CSS/source-map input. These are unresolved audit findings, not a clean security audit; evaluate before server production rollout. The newly added Waffo SDK/pg/PGlite have no reported findings in this audit. No blanket `audit fix --force` or framework major upgrade was performed.

Local raw logs: `Documents/roboskin-paid-subscription-20261016/` (`tests.log`, `build-static.log`, `verify-export.log`, `build-server.log`, `static-membership-check.json`, `server-http-check.json`, audit JSON). The first HTTP start hit an occupied/reserved local port; the successful check used an OS-assigned free port without stopping another process.
