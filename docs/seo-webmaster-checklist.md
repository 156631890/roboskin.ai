# RoboSkin.ai SEO and GEO Webmaster Checklist

Use this checklist after each production deployment. It covers crawl discovery, structured data validation, and AI-search monitoring for RoboSkin.ai.

## Submit and Monitor

- Google Search Console: submit `https://roboskin.ai/sitemap.xml`.
- Bing Webmaster Tools: submit `https://roboskin.ai/sitemap.xml`.
- Confirm `https://roboskin.ai/robots.txt` exposes the sitemap.
- Confirm `https://roboskin.ai/llms.txt` is reachable and includes canonical answer routes.
- Confirm the homepage includes the visible Physical AI route section and links to `/physics-ai`, `/guides/tactile-feedback-for-physical-ai`, and `/guides/physical-ai-touch-data`.
- Inspect these URLs after deployment:
  - `https://roboskin.ai/`
  - `https://roboskin.ai/physics-ai`
  - `https://roboskin.ai/robot-skin`
  - `https://roboskin.ai/tactile-ai`
  - `https://roboskin.ai/guides/tactile-feedback-for-physical-ai`
  - `https://roboskin.ai/guides/robot-skin-vs-tactile-sensor`
  - `https://roboskin.ai/research/graphene-liquid-metal-3d-force-2026`

## Validate Structured Data

- Run Google Rich Results Test on the homepage, the Physical AI page, one SEO topic page, and one research article.
- Confirm JSON-LD graphs expose visible page facts only.
- Confirm the homepage JSON-LD includes the Physical AI defined term and the `Physical AI route map on RoboSkin.ai` item list.
- Confirm `WebPage`, `BreadcrumbList`, `FAQPage`, `DefinedTerm`, `TechArticle`, and `Article` nodes use stable `@id` values.
- Confirm citations point to public source URLs and do not imply RoboSkin.ai product claims.

## Track AI Search and GEO Signals

- In Google Search Console, monitor impressions and queries for:
  - robot skin
  - tactile AI
  - Physical AI tactile feedback
  - robot skin vs tactile sensor
  - robot hand tactile sensor
  - slip detection robot hand
- In Bing Webmaster Tools, monitor Bing search and AI Performance reports when available.
- Check whether AI Overviews or AI Mode cite RoboSkin.ai for definition and comparison queries.
- Record cited pages and grounding queries in a monthly note before creating new keyword pages.

## Content Quality Review

- Verify every new research page has a public source and a clear "what not to infer" boundary.
- Verify every new topic page has a short answer, related routes, FAQ coverage, and at least one source or research path when appropriate.
- Avoid new pages that only swap synonyms without adding a distinct reader intent.
- Keep product availability, benchmark values, certifications, customer names, and deployment claims out of public copy unless explicitly supported.
