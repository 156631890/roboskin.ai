# RoboSkin.ai Growth Upgrade Handoff — 2026-08-16

## Production outcome

- Production: https://roboskin.ai
- Repository: `156631890/roboskin.ai`, branch `main`
- Deployment identity: `https://roboskin.ai/deployment.json` must match `git rev-parse HEAD`
- Verified production contract: 73 indexable URLs, 4 noindex URLs, exact sitemap, 19 research-index records, and 36 RSS items
- Latest research news: https://roboskin.ai/news/eit-pneumatic-hybrid-robot-skin-force-map-2026

## P0 — brand and measurement

- News, research detail, research index, contact, and supporting inner-page templates now use the same cold-lab editorial brand system as the homepage.
- Vercel Analytics is enabled in `src/app/layout.tsx`.
- `src/components/AnalyticsTracker.tsx` records referral landings, reading depth, source opens, article opens, research-data opens, WhatsApp intent, contact intent, and submit-source intent without passing user-entered names or email addresses.
- Contact and Newsletter components record submit, success, and WhatsApp fallback events.

## P1 — Newsletter, content, SEO, and GEO

- The footer contains a sitewide Weekly Robotics Research Brief request form.
- Contact submissions use a dedicated FormSubmit JSON endpoint in Vercel and are delivered to `messigoat147@gmail.com`; activation and a post-activation delivery test were both verified in Gmail on 2026-08-16. WhatsApp remains the failure fallback.
- Newsletter code now uses its own `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` and a provider-native POST form designed for Buttondown double opt-in. Until the owner finishes Buttondown username/password registration and the endpoint is configured, Newsletter requests continue to use the WhatsApp fallback.
- The August 2026 EIT-pneumatic robot-skin brief is source-backed, included in the homepage/news index, sitemap, Google News sitemap, RSS, and `public/llms.txt`.
- Large-term routing is preserved: `AI in robotics` -> `/ai-robotics`, broad `Physical AI` -> `/physical-ai`, tactile `Physical AI` -> `/physical-ai-touch`, `humanoid robot skin` -> `/humanoid-robot-skin`, `robot skin` -> `/robot-skin`, and `tactile sensor` -> `/guides/tactile-sensor-for-robots`.
- Daily research monitoring is implemented by `.github/workflows/daily-research-watch.yml` and `scripts/daily-research-watch.mjs`. It runs at 09:17 Asia/Shanghai, queries arXiv and Google Trends RSS, produces a review-only artifact, and never auto-publishes candidate text.

## P2 — outreach and AI citation

- Five messages were sent individually from `messigoat147@gmail.com` on 2026-08-16 to Robohub, RoboticsTomorrow, The Robot Report, Robotics & Automation News, and ManufacturingTomorrow.
- Gmail Sent Mail was visually checked for all five exact subjects.
- Full recipient, subject, body, and follow-up details are in `docs/outreach-batch-01.md`.
- Check replies before following up. Send at most one follow-up to unanswered targets between 2026-08-25 and 2026-08-28.
- AI discovery surfaces include `llms.txt`, structured article data, public CSV/JSON research-index routes, evidence boundaries, canonical URLs, and source links.

## P3 — quality and production gates

Run before every production claim:

```powershell
npm test
npm run lint
npm run build
npm run verify:export
node scripts/verify-production.mjs https://roboskin.ai
```

Mobile and desktop browser QA covered the homepage, news index, the new research-news article, contact, and priority guide pages. The checked pages have one H1, no horizontal overflow, labeled form controls, named buttons, image alternative text, and a skip-to-content link.

The Quality gate and daily-research workflows use `actions/checkout`, `actions/setup-node`, and `actions/upload-artifact` v7 so current GitHub-hosted runners no longer emit the Node.js 20 action-runtime deprecation warning.

## Mail and Newsletter status

Public DNS inspection on 2026-08-16 found no MX, SPF, DMARC, or DKIM records for `roboskin.ai`, so the owner approved `messigoat147@gmail.com` for public contact, legal, privacy, form-delivery, and Newsletter management. The site no longer presents the inactive domain mailboxes as live direct-contact routes.

The contact path is operational: FormSubmit is active, the obscured AJAX endpoint is stored as a sensitive Vercel environment variable for Production and Preview, and a post-activation message reached the approved Gmail inbox. The remaining Newsletter task is:

1. Complete the open Buttondown registration page by choosing the `roboskin` username and entering an owner-controlled password.
2. Set `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` in Vercel to the newsletter's embedded-subscribe endpoint.
3. Submit one owner-controlled test address, confirm the double-opt-in message, verify subscriber status, and verify the unsubscribe/portal route.

Do not claim Newsletter completion until the end-to-end confirmation and unsubscribe test passes.
