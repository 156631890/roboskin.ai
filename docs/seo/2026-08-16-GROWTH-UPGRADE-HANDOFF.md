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
- Without a configured form backend, contact and Newsletter submissions open a prefilled WhatsApp message to the existing public contact number. Browser QA confirmed both generated URLs and no test message was sent.
- The August 2026 EIT-pneumatic robot-skin brief is source-backed, included in the homepage/news index, sitemap, Google News sitemap, RSS, and `public/llms.txt`.
- Large-term routing is preserved: `robotics` -> `/research`, `Physical AI` -> `/physics-ai`, `humanoid robot` -> `/applications/humanoid-robot-skin`, `robot skin` -> `/robot-skin`, and `tactile sensor` -> `/guides/tactile-sensor-for-robots`.
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

## Known infrastructure gap

Public DNS inspection on 2026-08-16 found no MX, SPF, DMARC, or DKIM records for `roboskin.ai`, and the current Gmail inbox had no messages addressed to `contact@roboskin.ai`. `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is also not configured, and the static production site does not expose `/api/contact`.

The WhatsApp fallback prevents immediate inquiry loss, but it is not a replacement for mail infrastructure or a subscriber database. The next owner-approved infrastructure task is:

1. Choose Google Workspace, Cloudflare Email Routing plus a sending provider, or another domain-mail provider.
2. Configure MX, SPF, DKIM, and DMARC.
3. Verify `contact@roboskin.ai`, `legal@roboskin.ai`, and `privacy@roboskin.ai` can receive mail.
4. Configure a consent-aware form/Newsletter endpoint and set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` in Vercel.
5. Submit test messages, verify delivery and unsubscribe handling, then update the privacy copy if the processor changes.

Do not silently point public domain addresses at a personal mailbox or create an external provider account without owner approval.
