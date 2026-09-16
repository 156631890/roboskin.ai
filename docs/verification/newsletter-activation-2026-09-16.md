# Newsletter activation verification — 2026-09-16

The owner authorized Buttondown setup, an owner-controlled test address, and the
subscription/confirmation/unsubscribe check. No campaign or imported list was used.
The previous account-review restriction disappeared after submission and reload.

## Verified provider flow

- `/settings/embedding` supplies the real public POST endpoint
  `https://buttondown.com/api/emails/embed-subscribe/roboskin`.
- Public subscriptions and the confirmation-triggered welcome email are enabled.
- An isolated browser, without the author's login, submitted the test address.
- Gmail received the confirmation email at 07:32:51 UTC. Before confirmation,
  Buttondown displayed **Unactivated**.
- Opening the delivered confirmation link produced the successful subscription
  receipt. The provider then displayed **Regular**, and Gmail received the welcome
  email at 07:34:11 UTC.
- The exact embed endpoint rejected an invalid address with HTTP 400 and
  `Subscription Error`. Repeating the confirmed address returned HTTP 200 without
  an additional subscriber record or another confirmation email during this check.
  A 200 response alone is not treated as proof of confirmation.
- The subscriber's management page completed unsubscribe; both the subscriber
  page and author dashboard displayed **Unsubscribed** on September 16.
- The public management entry point is `https://buttondown.com/portal`.
  Its sign-in email arrived at 07:36:28 UTC. Following that link opened the
  subscription dashboard with RoboSkin listed. The portal's category label is
  not used to infer subscription status; the management page and author dashboard
  provide that evidence.
- Both owner-controlled test subscribers (the supplied mailbox and its Gmail
  plus-address alias) must be excluded from audience growth. A private note on
  the original record identifies the integration test.

## Production check

The three public configuration variables were set in Vercel Production.
Commit `ee2389956fddc6ff90c9257686e9d64808f5d3c9` was automatically deployed to
`https://roboskin.ai`, deployment `dpl_8SPRCXjRVf2W8pxWj3HfEjZMX8MJ`.
The GitHub Quality gate `35070114654` passed, and `/deployment.json` matched.

- The public form posts to the verified embed endpoint. Its management and privacy
  links match the configured URLs. Consent is required.
- Desktop (1440 px) and mobile (390 px) layouts were checked. At 390 px the
  document width is exactly 390 px. No browser runtime errors were observed;
  existing CSS preload warnings were present.
- A real submission from the production footer restored the previously confirmed
  test subscriber to **Regular** without sending another confirmation email.
  The native endpoint therefore does not guarantee a fresh double opt-in for
  returning, previously confirmed addresses. Website copy reflects this behavior.
- A first-time Gmail plus-address signup from the production form created a
  separate **Unactivated** record. Gmail received its confirmation email at
  07:49:51 UTC. After opening that link, the provider displayed **Regular**, and
  Gmail received the welcome email at 07:54:03 UTC.
- The embed response displayed a generic successful-subscription message even
  before the new address was confirmed. Confirmation is therefore established
  from delivered mail and refreshed provider state, not that response text.
  An initially stale author list was refreshed before recording the final result.
- Both test records were unsubscribed through their subscriber management pages
  after verification. They remain excluded from growth metrics.

The activation date is September 16. D+7 is September 23 and D+28 is October 14.
This records a working subscription flow, not organic audience growth or a
campaign-delivery test.

The default transactional welcome email did not contain an unsubscribe link.
The tested removal path is the subscriber management page and public portal.
No editorial campaign was sent, so campaign delivery and its footer are outside
this verification. Confirmation and management URLs are private and are not
included in committed documentation or public site configuration.

## Website integration

The site keeps its existing static HTML POST form and analytics events. It does
not need a Buttondown API key or a server-runtime migration. Required build-time
variables are `NEXT_PUBLIC_NEWSLETTER_ENDPOINT`,
`NEXT_PUBLIC_NEWSLETTER_VERIFIED_ON`, and
`NEXT_PUBLIC_NEWSLETTER_UNSUBSCRIBE_URL`; the verified date is `2026-09-16`.

The form asks for explicit consent, links the privacy policy and management portal,
and explains that confirmation is required. It records signup attempts and
provider handoffs, not confirmed subscriptions. Mobile consent text wraps beside
its checkbox, and keyboard focus remains visible.

Run export verification with the same three public values used during the build.
Otherwise the checker correctly expects the closed fallback while inspecting an
enabled export. Missing or incomplete verified settings still keep signup closed.

Local evidence is in the ignored `.artifacts/resource-release-20260916/` directory
of the primary checkout: `newsletter-*.png`, `newsletter-build.log`,
`newsletter-tests.log`, and `newsletter-lint.log`. The activation batch records
the production date separately from the provider test date.
