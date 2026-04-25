# RoboSkin Research Content Update Design

## Goal

Update RoboSkin.ai research article content so it reflects current 2025-2026 tactile sensing, robot skin, e-skin, and ROS integration trends, while removing unsupported benchmark, partnership, patent, and funding claims.

## Scope

- Replace the existing speculative article copy in `src/lib/blog-data.ts` with conservative technical briefs.
- Add source links to current public references from research publishers, universities, and ROS documentation.
- Make `/research` indexable because it will contain useful, factual public content.
- Add static article detail pages at `/research/[id]` so full article content is visible to users and crawlers.
- Add Article JSON-LD for individual article pages.
- Add tests to prevent reintroducing unsupported claims and to verify latest technical topics are present.

## Content Direction

The articles will cover:

- Graphene and liquid metal miniature 3D force sensors for normal force, shear force, slip, and texture.
- Single-material soft robotic skin using electrical impedance tomography and machine learning for multimodal contact recognition.
- Full-hand high-resolution tactile sensing for adaptive dexterous grasping.
- Temperature/pressure bimodal tactile sensing and crosstalk reduction.
- Event-based and neuromorphic tactile sensing for sparse, low-latency signals.
- Self-healing and multimodal e-skin architectures.
- ROS 2 Kilted and ros2_control updates relevant to tactile sensor pipelines.
- Manufacturing and deployment constraints for large-area flexible tactile arrays.

## Non-Goals

- No new visual redesign.
- No invented RoboSkin performance numbers.
- No claims that RoboSkin owns or commercializes third-party research.
- No fake customer, partner, patent, or grant claims.
- No paid backlink or content-farm strategy.

## Sources

- Cambridge 2026 graphene 3D force sensor: https://www.cam.ac.uk/research/news/graphene-based-artificial-skin-brings-human-like-touch-closer-to-robots
- Nature Machine Intelligence 2025 full-hand tactile sensing: https://www.nature.com/articles/s42256-025-01053-3
- Cambridge / Science Robotics 2025 single-material robotic skin: https://www.cam.ac.uk/stories/robotic-skin
- RSC 2025 temperature/pressure bimodal tactile sensing review: https://pubs.rsc.org/en/content/articlehtml/2025/tc/d5tc02514a
- Frontiers 2025 event-based opto-tactile skin: https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2025.1735068/full
- ROS 2 Kilted distributions: https://docs.ros.org/en/kilted/Releases.html
- ros2_control Kilted release notes: https://control.ros.org/kilted/doc/ros2_controllers/doc/release_notes.html

## Architecture

`src/lib/blog-data.ts` remains the source of truth for research content. It will expose article summaries and full content, plus source metadata.

`src/app/research/page.tsx` will list the updated articles and link to each detail page. `src/app/research/[id]/page.tsx` will render the article content, metadata, breadcrumbs, and Article JSON-LD. Rendering stays static-export compatible through `generateStaticParams()`.

## Testing

Add `tests/research-content.test.mjs` to verify:

- Full article detail route exists.
- Research page is not noindex.
- `blog-data.ts` includes current topics and source URLs.
- Unsupported terms such as fake patents, fake grants, and named partnerships are absent.
- Article JSON-LD is wired for detail pages.

## Verification

Run:

- `node --test tests/research-content.test.mjs`
- `node --test tests/homepage-branding.test.mjs tests/seo-geo.test.mjs tests/research-content.test.mjs`
- `npm run lint`
- `npm run build`
