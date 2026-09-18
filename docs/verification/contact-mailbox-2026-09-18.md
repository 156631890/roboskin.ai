# Branded contact mailbox — 2026-09-18

RoboSkin's public contact, owner inquiry, research inquiry, legal and privacy
addresses now use `hello@roboskin.ai`. The shared site configuration supplies page
links, the footer, email drafts and Organization / ContactPoint structured data.
The privacy page names FormSubmit and Zoho Mail as the contact delivery services.
Account administration and historical outreach records are unchanged.

## Delivery configuration

The new FormSubmit receiver was activated for `https://roboskin.ai/`. A synthetic
post-activation submission returned HTTP 200 with `success: "true"`; its subject
and unique test marker were subsequently verified in the Zoho inbox on 2026-09-18
at 05:47 UTC. These configuration tests are not customer inquiries or conversions.

The Production `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` was updated to this verified
receiver before release. Its existing sensitive type and Production scope were
retained. The CLI could not edit the sensitive variable, so the documented Vercel
API was used to PATCH only its value. Other environment variables were verified
unchanged, including all three active Buttondown newsletter settings.

Sensitive variables are not readable through an environment pull; confirm the
receiver in the generated contact and research-inquiry bundles after deployment.
No endpoint identifiers, credentials or mailbox login details are stored here.

## Verification before publishing

- Isolated checkout based on production/main `63a9e9b`; only mailbox-related
  source, existing test assertions and this note are included in the release.
- 188 tests, ESLint, Next build with type checking, and static export verification
  pass with the Production newsletter configuration and the new contact receiver.
- The new Windows checkout initially converted LF files, including a PDF fixture,
  to CRLF. Restoring unchanged files from their Git blobs fixed all ten initial
  test failures. No test expectations or research content were changed for this.
- 121 sitemap URLs, 125 URL contract entries and 191 graph entities pass export
  checks. All 130 exported HTML pages omit the previous public Gmail address.
- The exported sample PDF retains its published SHA-256, and the contact bundle
  contains the verified new receiver configuration.
- The preceding local contact-page check covered desktop and 390 px mobile
  layouts, matching email links and no document overflow.

Production deployment readiness, the live commit marker, domain routing, rendered
contact links, generated receiver configuration and inbox delivery are checked
separately after publishing. Other preview hosts have not been activated or
verified as FormSubmit origins. No newsletter or promotional email is sent as
part of this change.
