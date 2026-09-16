# Research resource forms: configuration and verification

Reviewed 2026-09-16. The default build remains a static export. Public directories, JSON/CSV downloads and the free sample remain available without accounts or email submission.

## Newsletter update — 2026-09-16

Buttondown's review restriction has cleared. The owner-controlled confirmation,
provider-state, duplicate, invalid-address and unsubscribe checks passed. The
public management portal's sign-in email and dashboard were also verified.
See [the verification record](verification/newsletter-activation-2026-09-16.md)
and [activation batch](seo/growth-batches/2026-09-12-newsletter.json) for release
state. The website uses the native static form; the optional API remains disabled.

## Original observations — 2026-09-13

- The local environment did not contain a configured contact endpoint or newsletter credentials. Only the presence of `VERCEL_OIDC_TOKEN` was observed; values were not copied.
- The logged-in Buttondown account displayed **Account under review**. The owner must complete the provider's account review. No review form was submitted by this task.
- Default preview: newsletter closed, RSS available. An unconfigured inquiry displays **not sent**, retains its contents, and offers explicit email/WhatsApp links.
- All delivery tests use injected mock transports. No test inquiry or subscription was sent to real inboxes.

## Existing static mode (least infrastructure change)

Contact and paid research inquiry reuse `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://formsubmit.co/ajax/<activated-id>`. A response needs a parsed provider receipt (`success: true` or `success: "true"`); an arbitrary HTTP 200/HTML page is a failure. Provider acceptance is not proof of mailbox delivery. Honeypots, validation and in-flight locking are included; hosted FormSubmit is responsible for server-side filtering.

Native Buttondown signup requires all three public settings, supplied at build time:

```dotenv
NEXT_PUBLIC_NEWSLETTER_ENDPOINT=https://buttondown.com/api/emails/embed-subscribe/<newsletter-name>
NEXT_PUBLIC_NEWSLETTER_VERIFIED_ON=<actual-YYYY-MM-DD>
NEXT_PUBLIC_NEWSLETTER_UNSUBSCRIBE_URL=<verified-https-Buttondown-management-URL>
```

Keep these unset until the account is approved and an owner-controlled address has completed confirmation, duplicate signup, provider rejection and unsubscribe checks. The native form posts to Buttondown and leaves the final result on its provider page; it never invents a local success receipt. `VERIFIED_ON` records a real end-to-end check, not a placeholder date. Invalid or incomplete settings keep signup closed.

## Optional Next server mode

`ROBOSKIN_RUNTIME=server` retains the Next route handlers rather than exporting only files. It is an opt-in alternative, not a required migration for the current static website.

```dotenv
ROBOSKIN_RUNTIME=server
SITE_ORIGIN=https://<exact-preview-or-production-host>
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site-key>
TURNSTILE_SECRET_KEY=<server-secret>
TURNSTILE_HOSTNAME=<exact-allowed-hostname>

# Enable contact only after configuring a delivery receiver:
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=/api/contact
CONTACT_WEBHOOK_URL=https://<delivery-receiver>
CONTACT_WEBHOOK_TOKEN=<optional-server-secret>

# Enable newsletter only after account and confirmation/unsubscribe checks:
NEWSLETTER_ENABLED=true
BUTTONDOWN_API_KEY=<server-secret>
```

Do not place server secrets in `NEXT_PUBLIC_*`. The build rejects enabled server forms without their runtime, delivery and Turnstile dependencies. Keep `NEWSLETTER_ENABLED` unset during infrastructure setup. The handler additionally fails with 503 if unavailable.

The webhook must accept the documented inquiry fields and return either a FormSubmit receipt or `{ "ok": true, "status": "accepted", "receiptId": "<nonempty-id>" }` after accepting delivery. The application returns its own request ID only after that receipt. HTTP 200 alone is insufficient. Failed or ambiguous delivery keeps the entered text; timeouts can be ambiguous, so retrying may create another inquiry.

Newsletter API creates an **unactivated** Buttondown subscriber. A successful response says **pending confirmation**, not subscribed. Collision behavior is `no_op`; existing, pending or unsubscribed addresses are not silently reactivated, and repeat requests do not send reminder emails. Preference/removal help remains available via Contact and unsubscribe links in provider emails.

Both APIs enforce exact Origin, JSON, a 16 KiB streamed body cap, email/consent validation, honeypot and Turnstile hostname/action validation. Burst limiting stores only a temporary hash per IP and form kind: five attempts per ten minutes, bounded to 5,000 entries per process. This limit is not shared across server instances; configure edge/shared limiting if deployment traffic requires it. Trust forwarding headers only from the hosting proxy.

## Deployment dependencies to resolve later

The existing `vercel.json` uses static export routing, including generated agent Markdown and a crawler robots rewrite. Server postbuild deliberately skips reading a previous `out` directory. Before any future server deployment, review routing/output settings and provide the agent Markdown and crawler-robots assets from that same build; validate API POST routing, redirects, canonical, sitemap and robots on an isolated preview. Do not assume an environment-variable switch alone completes this hosting migration. This task does not change the production deployment configuration.

## Local verification without email

```bash
npm test
npm run lint
npm run build
npm run verify:export
node scripts/preview-export.mjs
```

Preview: `http://127.0.0.1:3213`. The export preview accepts only GET/HEAD and rejects POST; it cannot deliver forms. Test success, duplicates, provider refusal, rate limits, invalid challenges and missing configuration in `tests/form-contract.test.mjs` and `tests/resource-conversion.test.mjs`, whose transports are mocked. There is no production bypass/test flag.

For server smoke testing, set `ROBOSKIN_RUNTIME=server` for both the build and `next start` processes while form activation stays disabled. Start Next on a separate local port and verify both POST endpoints return 503 with `ok:false`. Rebuild the default static export afterward before comparing static pages.
