# RoboSkin Site Authority Hardening Design

## Goal

Improve RoboSkin.ai's crawlability, AI-answer readiness, buyer trust, and static-hosting reliability without inventing performance claims or customer proof.

## Scope

- Include all indexable static pages and research article pages in sitemap output.
- Add public site assets referenced by metadata and layout so social cards, icons, and article images do not resolve to 404s.
- Add `llms.txt` and a glossary page so AI crawlers and search engines can understand the site, its terms, and its main routes.
- Convert the existing case study page from noindex to a conservative, indexable case-study page.
- Make the contact flow safe for static export by avoiding reliance on `/api/contact` from the client unless an external public endpoint is configured.
- Strengthen public content with evaluation criteria, data-flow explanation, fit criteria, and better CTA segmentation.
- Remove public personal email exposure and emphasize domain contact addresses.
- Re-enable production build enforcement for TypeScript and ESLint.

## Architecture

The site remains a static-export Next.js App Router site. Public data stays centralized in `src/content/site.ts`; metadata and structured data stay in `src/lib/seo.ts`; page-level UI composes those sources.

Static assets are simple repo-native SVG/text files in `public/`. The contact form uses `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` only when configured; otherwise it builds a mailto fallback using `contact@roboskin.ai`, which works on static hosting.

## Pages And Data

- `src/app/sitemap.ts` appends blog article routes and indexed page routes.
- `src/app/glossary/page.tsx` publishes concise definitions for robot skin, tactile AI, e-skin, ROS 2 tactile pipelines, slip detection, multimodal sensing, and integration terms.
- `src/app/case-studies/page.tsx` uses normal metadata and JSON-LD, while keeping summaries anonymous and conservative.
- `src/app/page.tsx`, `src/app/products/page.tsx`, and `src/app/technology/page.tsx` add proof-oriented sections: evaluation packet, measurable fit criteria, sensor data flow, and deployment readiness.
- `src/components/ContactForm.tsx`, `src/app/contact/page.tsx`, and `src/components/Footer.tsx` use domain email addresses and improved qualification fields.

## Error Handling

The contact form validates required fields in the browser. If a public endpoint is configured and fails, the UI presents a mailto fallback rather than claiming a submission was sent. Honeypot spam handling still short-circuits as success.

## Testing

Add a site health test that checks sitemap source coverage, public assets, `llms.txt`, strict build config, absence of public Gmail addresses, static-safe contact behavior, glossary presence, and indexable case studies.
