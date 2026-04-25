# RoboSkin SEO and GEO Optimization Design

## Goal

Improve RoboSkin.ai's organic discoverability by making the site easier for search engines and AI answer engines to crawl, understand, cite, and navigate, without using manipulative ranking tactics.

## Scope

- Strengthen page metadata for core public routes.
- Add visible, factual, AI-citable content blocks.
- Add JSON-LD structured data that matches visible page content.
- Improve internal links between product, solution, technology, comparison, FAQ, downloads, and contact pages.
- Keep external links limited to trustworthy contextual references.
- Keep static export compatibility.

## Non-Goals

- No paid or bulk backlink work.
- No hidden text, keyword stuffing, cloaking, or fake reviews.
- No invented performance benchmarks, certifications, customers, or affiliations.
- No content farm or mass-generated article pages.

## Architecture

SEO data will live in a focused `src/lib/seo.ts` module. Pages will import helper functions from that module rather than duplicating metadata and schema logic.

Structured data will be rendered through a small server component so JSON-LD can be embedded consistently in page output. The schemas will cover organization, website, web pages, breadcrumbs, products, and FAQ content where the visible page content supports it.

GEO improvements will prioritize clear textual answers, definitions, comparison blocks, and factual cross-links. This follows current search guidance: crawlable links, visible text, helpful content, and structured data that matches the page.

## Files

- `src/lib/seo.ts`: central page metadata and JSON-LD builders.
- `src/components/JsonLd.tsx`: JSON-LD rendering component.
- `src/app/layout.tsx`: global metadata cleanup and organization/website schema.
- `src/app/sitemap.ts`: stable route list and last-modified values.
- `src/app/robots.ts`: crawler-safe rules for static export.
- `src/app/page.tsx`: homepage internal-link and GEO content improvements.
- `src/app/faq/page.tsx`: make FAQ indexable and add FAQ schema.
- Core route pages: replace ad hoc metadata with shared helper metadata.
- `tests/seo-geo.test.mjs`: file-level regression tests for metadata, sitemap, JSON-LD, and GEO content.

## Content Strategy

Primary keyword cluster:

- robot skin
- humanoid robot skin
- tactile AI
- tactile sensors
- e-skin
- robotic grippers
- tactile sensing

Supporting intent clusters:

- evaluation and datasheet requests
- developer kit and integration review
- ROS / ROS2 compatibility questions
- pilot and deployment planning
- robot hand and gripper touch feedback

The site will use these terms naturally in page titles, headings, descriptions, and body copy. It will not repeat keywords mechanically.

## Internal Links

Each core page should expose contextual links to the next logical step:

- Home links to products, solutions, technology, comparison, FAQ, downloads, and contact.
- Products links to comparison, implementation, resources, and contact.
- Solutions links to products, technology, implementation, and contact.
- Technology links to products, resources, FAQ, and contact.
- FAQ links to downloads, comparison, products, and contact.

Footer links remain as broad navigation; body links carry the topical context.

## External Links

External links should be few and relevant. Acceptable targets include canonical resources such as schema.org and official ROS documentation if referenced in visible content. Unsupported or promotional link exchanges are excluded.

## Testing

Add a Node test that reads relevant source files and verifies:

- Shared SEO helpers exist.
- Root layout no longer emits placeholder verification codes.
- JSON-LD is rendered.
- FAQ is indexable and includes FAQ schema.
- Sitemap contains core public routes and stable last-modified data.
- Homepage includes SEO/GEO cross-links and factual Q&A content.

Run:

- `node --test tests/seo-geo.test.mjs`
- `node --test tests/homepage-branding.test.mjs tests/seo-geo.test.mjs`
- `npm run lint`
- `npm run build`

## Risks

- Metadata and schema improve understanding, but they do not guarantee rankings.
- If public claims are too vague, AI systems may not cite the site. The fix is better factual content, not more schema.
- If structured data diverges from visible text, it can hurt rich result eligibility. The implementation must keep schemas conservative and page-specific.
