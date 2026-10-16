# Paid weekly reports with Waffo

Implementation date: 2026-10-16. This is a disabled integration until the merchant, delivery service, database and current reviewed issue are configured. It has not processed a real payment. Do not interpret unit tests as Waffo sandbox certification.

## Product contract

- Owner-confirmed plan (2026-10-16): **US$9.90 per month**, before applicable tax, renewing monthly until canceled. **One new industry report each week.** Billing is fixed to `monthly`; a conflicting environment override or weekly Waffo product is rejected.
- Users verify their email, accept the exact interval/price, and open Waffo hosted checkout. The server pins the product, USD price, no trial, business reference and HTTPS return URL. The browser cannot provide price or product overrides.
- Use the same verified email for Waffo billing; the billing portal independently verifies the purchase email. Checkout return never grants access. Waffo's **Done** button returns to RoboSkin; closing checkout does not redirect automatically.
- Access requires an active/canceling authoritative order, the expected product/price/interval, a successful payment for the current period, and an unexpired period. Canceling retains the remaining paid period. Past-due, pending, canceled, expired, trial-only and mismatched records do not grant access.
- Signed webhooks reconcile the authoritative order under a database row lock. Mode/store are checked. Unique event keys, refund records and membership updates commit together; errors return non-2xx for retry. The same reconciliation runs before private report reads.
- Full refunds for the current successful payment end its entitlement. Partial and previous-period refunds do not revoke a subsequent paid period. Refund amounts that Waffo cannot identify suspend the affected payment conservatively; investigate in the Waffo dashboard. Do not manually fabricate a successful refund or subscription state.
- Reports are private database JSON, rendered with escaped React text. They are never in `public/`, static HTML, sitemap, RSS, agent Markdown or client bundles. Active members can read the archive. No report is automatically labeled reviewed.

## Configuration

Set these as server-only secrets/configuration in the existing **roboskin-ai** Vercel project. Use separate preview/test and production databases, API keys and auth secrets. Never prefix secrets with `NEXT_PUBLIC_` or commit `.env` files.

| Variable | Purpose |
| --- | --- |
| `ROBOSKIN_RUNTIME=server` | Enables Next server routes; default remains static export |
| `REPORTS_ENABLED=true` | Enables member sign-in/read APIs after complete configuration |
| `REPORTS_CHECKOUT_ENABLED=false` | Keep closed through verification; independently stops new purchases without blocking existing members/webhooks |
| `REPORTS_BILLING_INTERVAL` | Optional; omit or set `monthly`. Any other value prevents activation |
| `REPORTS_SITE_ORIGIN` | Exact HTTPS origin, no trailing slash; production `https://roboskin.ai` |
| `WAFFO_MODE` | `test` or `prod`; must match the API key's environment |
| `WAFFO_MERCHANT_ID`, `WAFFO_PRIVATE_KEY` | Server-side merchant signing credentials; escaped PEM newlines supported |
| `WAFFO_STORE_ID`, `WAFFO_PRODUCT_ID` | Dedicated RoboSkin report subscription product |
| `REPORTS_DATABASE_URL` | Private Postgres connection string with verified TLS; retain provider TLS configuration |
| `REPORTS_AUTH_SECRET` | Random secret, at least 32 characters; hashes sessions, codes and abuse identifiers |
| `RESEND_API_KEY`, `REPORTS_MAIL_FROM` | Transactional email API key and a verified sender domain |
| `REPORTS_CRON_SECRET` | Random secret, at least 32 characters; same value in GitHub Actions secret |

`REPORTS_ENABLED=true` fails the build if required configuration is incomplete. Static export with membership disabled remains supported. The default landing page is noindex and honestly shows checkout closed. Only member-safe fields are passed into the client component. Free Buttondown Newsletter settings are unchanged.

### Setup sequence

1. Complete Waffo merchant onboarding/KYB and payout setup. No code can substitute for this. In Waffo test mode create the dedicated digital report subscription: USD `9.90`, billing period `monthly`, no trial. Do not expose plan changes to other products.
2. Provision an existing or explicitly approved Postgres database and verified Resend sender. The code does not provision or purchase services. Load settings through your normal local/Vercel secret mechanism.
3. Run `node scripts/reports.mjs migrate` against the intended database. Re-running the initial migration is safe. For future schema changes add numbered migrations; never overwrite production tables.
4. Run `node scripts/reports.mjs check-waffo`. It checks price/product/interval and the read query against the current official schema without creating an order. Waffo documentation has inconsistent GraphQL examples; real sandbox validation is a release prerequisite.
5. Configure Waffo HTTP webhooks at `https://<preview-host>/api/waffo/webhook`, then production's corresponding URL. Subscribe to all `subscription.*` and `refund.*` events. Verification uses the official SDK RSA keys, raw bytes and the 45-minute retry tolerance, plus persistent event deduplication. Keep test and production keys/environment paired; the API environment is derived from the key, not the SDK's environment option.
6. Prepare the first real weekly report, verify primary sources and approval, and import it with the command below. Checkout rejects stale/missing issues (source cutoff older than 7 days).
7. In an HTTPS preview enable test checkout and run: sign-in/email delivery, checkout, activation, repeated/delayed webhook, renewal, cancellation at period end, overdue/recovery, current/previous/partial refund, expired access, billing portal, sign-out, and report email preference. A placeholder or dashboard sample event cannot stand in for an actual sandbox order. Verify tax and the exact renewal wording in Waffo's cashier.
8. After successful sandbox acceptance of the monthly plan, publish the Waffo product to production using production credentials. Configure the production webhook. Enable checkout only with a current issue and a named operational owner for weekly editorial delivery.
9. Have an identity with GitHub workflow permission install `docs/operations/report-delivery.workflow.yml` as `.github/workflows/report-delivery.yml`. The current publishing credential lacks that permission, so this PR contains a **non-executing template**, not an installed scheduled workflow. Set Actions secret `REPORTS_CRON_SECRET` and repository variable `REPORTS_DELIVERY_ENABLED=true`. The hourly workflow only dispatches the latest reviewed weekly issue, once per member. It does not create reports or send marketing. Run a manual dispatch and verify the receipt and inbox. Until installed and enabled, automatic email delivery is **not running**. An existing authorized external scheduler may instead POST to the same dispatch endpoint with the bearer secret.
10. Follow the repository's protected PR/production validation process. Main auto-deploys. Confirm production deployment SHA and run `node scripts/verify-production.mjs https://roboskin.ai` plus membership flow acceptance. Do not claim production readiness with missing credentials.

## Weekly editorial and delivery operation

Publish one issue per UTC Monday-start week. Prepare the report outside this repository (private local file), keeping original source links, cutoff date, analysis, practical implications and limitations. A reviewer must actually approve its contents before `approved: true` and their name/time are entered; structural validation is not fact checking. An example **shape**, not an approved or real report:

```json
{
  "weekStart": "YYYY-MM-DD (Monday)",
  "title": "A specific issue title",
  "summary": "An accurate short description; included in member notification emails",
  "sourceCutoff": "ISO date/time",
  "reviewedBy": "Actual reviewer",
  "reviewedAt": "ISO date/time",
  "publishedAt": "ISO date/time within the issue week",
  "approved": false,
  "content": {
    "introduction": "What this issue covers and excludes",
    "sections": [{
      "heading": "Development or decision question",
      "analysis": "What the sources substantiate",
      "implications": "What this may change for readers",
      "limitations": "What remains unverified or incomparable",
      "sourceIds": ["S1", "S2"]
    }],
    "sources": [
      {"id": "S1", "title": "Primary source", "url": "https://...", "checkedAt": "ISO date/time"},
      {"id": "S2", "title": "Primary source", "url": "https://...", "checkedAt": "ISO date/time"}
    ]
  }
}
```

Run `node scripts/reports.mjs validate <private-file.json>`, then `node scripts/reports.mjs publish <private-file.json>`. This second command changes the configured database and makes a published issue readable to members. Issue weeks are unique, immutable and cannot be silently overwritten. The worker uses the latest fresh issue, checks current paid access again, and sends a notice linking to authenticated report access. New paid members can read immediately and receive the notice on the next scheduled run. Email delivery preference is independent from renewal cancellation.

The worker processes up to 20 members per run to stay within server execution limits; increase scheduling frequency or introduce a durable queue before exceeding that capacity. Failed sends retry with a stable Resend idempotency key. An uncertain send older than 23 hours is held for operator reconciliation (provider idempotency lasts 24 hours); it is not resent blindly. `node scripts/reports.mjs delivery-status` prints aggregate states without customer addresses. Verify held deliveries in Resend, then reconcile the individual database record through an authorized operator. Database transaction or provider failures never produce a fabricated success receipt.

Monitor failed workflow runs, Waffo webhook deliveries, held emails and report freshness. A stale/missing issue makes dispatch fail visibly and closes new checkout requests. It does **not** silently cancel or refund existing recurring subscriptions. If weekly delivery cannot be maintained, the operator must contact affected customers and resolve cancellation/refunds in Waffo under the applicable terms. Code alone does not produce a weekly editorial service.

## Evidence and limitations

Official references checked on 2026-10-16:

- https://docs.waffo.ai/api-reference/endpoints/orders/create-checkout-session
- https://docs.waffo.ai/api-reference/webhooks
- https://docs.waffo.ai/api-reference/endpoints/graphql/orders-and-payments
- https://docs.waffo.ai/features/customer-portal
- Installed official `@waffo/pancake-ts` 0.26.0 API types and GraphQL guide.

Local integration tests use the actual SQL migration in PGlite/Postgres and injected payment/mail transports. Signature tests use a temporary RSA key through the SDK test API. No bypass key or mock provider exists in production routes. Tests do not prove external merchant permissions, live GraphQL schema, deliverability, tax configuration or the customer's portal experience; those require sandbox credentials and inbox access.
