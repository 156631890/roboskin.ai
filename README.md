# RoboSkin Website

RoboSkin.ai is a Next.js App Router site for tactile sensing in robotics. The current structure focuses on credible product, solution, and contact paths instead of unsupported marketing claims.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4

## Development

```bash
npm install
npm run dev
```

## Build and checks

```bash
npm run lint
npm run build
```

## Public routes

- `/` Home
- `/products`
- `/solutions`
- `/technology`
- `/resources`
- `/downloads`
- `/comparison`
- `/implementation`
- `/research`
- `/research/[id]`
- `/glossary`
- `/case-studies`
- `/faq`
- `/about`
- `/contact`
- `/privacy`
- `/terms`

Legacy routes such as `/applications`, `/partners`, `/team`, `/news`, and `/careers` remain as compatibility pages and are excluded from the main navigation.

## Contact form

The contact flow is static-hosting safe. If `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is configured at build time, the browser posts submissions to that endpoint. If it is not configured, the form opens a prepared email to `contact@roboskin.ai`.

Environment variable:

```bash
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=
```

The repository still includes `/api/contact` for server-capable deployments, but the exported static site does not rely on it.

## Image generation

The site includes an image generation utility for rebuilding public assets.

```bash
npm run generate:images
```

Required environment variables:

```bash
GEMINI_API_KEY=
GEMINI_IMAGE_MODEL=gemini-2.0-flash-exp-image-generation
```

Generated assets are written to `public/generated/`.

If Gemini is unavailable, the script supports offline fallback:

```bash
GEMINI_OFFLINE_MODE=1 npm run generate:images
```

## Notes

- Shared site copy and contact details live in `src/content/site.ts`.
- Navigation and footer read from the same source of truth.
- Public pages are designed to avoid personal contact handles and unsupported claims.
- `public/llms.txt`, `sitemap.xml`, and the glossary are maintained as crawl and AI-answering aids.
