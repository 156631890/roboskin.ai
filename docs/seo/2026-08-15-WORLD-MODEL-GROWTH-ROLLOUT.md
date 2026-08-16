# RoboSkin.ai World-Model Growth Rollout

Date: 2026-08-15
Status: implementation in progress

## Decision

Create one independent evergreen query owner for visuo-tactile world models and one source-bounded FeelWorld research brief. Do not create broad pages for "world model," "Physical AI," or model-name synonyms merely to increase URL count.

New canonical routes:

- https://roboskin.ai/guides/visuo-tactile-world-models-robot-manipulation
- https://roboskin.ai/research/feelworld-visuo-tactile-world-model-2026

The foundation-model and reusable-representation intent now belongs to https://roboskin.ai/tactile-foundation-models; the former `/guides/tactile-foundation-models` URL permanently redirects there. The world-model guide owns action-conditioned visual-tactile prediction, contact and slip state, rollout generation, planning, and world-model evaluation intent.

## Baseline

The latest recorded rolling 28-day baseline before this rollout was 7,974 impressions, 85 clicks, 1.1% CTR, and average position 8.6. A narrower Search Console export for 2026-07-22 through 2026-08-02 contained 4,246 impressions, 57 clicks, 1.3% CTR, and average position 7.9.

The site already had strong technical discovery surfaces: apex canonicals, sitemap generation, TechArticle and Dataset JSON-LD, RSS, a structured CSV/JSON research index, and llms.txt. The content bottleneck was distinct demand coverage and click-worthy source-backed pages, not another generic technical-SEO layer.

## Google Trends research

Method: Google Trends, worldwide, past five years, web search, observed on 2026-08-15. Trend values are normalized within each comparison and are not search-volume estimates.

Reproducible comparison URLs:

- https://trends.google.com/trends/explore?date=today%205-y&q=robot%20skin,electronic%20skin,tactile%20sensor,physical%20AI,humanoid%20robot
- https://trends.google.com/trends/explore?date=today%205-y&q=robot%20hand,dexterous%20manipulation,tactile%20feedback,embodied%20AI,robot%20touch
- https://trends.google.com/trends/explore?date=today%205-y&q=world%20model,robot%20world%20model,visuo%20tactile,tactile%20world%20model,VLA%20model

The exported comparison used robot skin, electronic skin, tactile sensor, physical AI, and humanoid robot:

| Term | Approximate five-year mean | Peak | Peak week | Latest week, 2026-08-09 |
| --- | ---: | ---: | --- | ---: |
| robot skin | 2.1 | 23 | 2026-05-03 | 2 |
| electronic skin | 1.5 | 13 | 2026-05-10 | 2 |
| tactile sensor | 0.7 | 4 | 2026-05-10 | 1 |
| physical AI | 9.9 | 100 | 2026-05-31 | 18 |
| humanoid robot | 4.3 | 29 | 2026-06-28 | 8 |

Approximate means treat a Google Trends value below 1 as 0.5 only for this directional summary. They must not be reported as audience size.

Additional official Trends comparisons showed:

- Robot hand retained the strongest baseline in the manipulation set, ahead of embodied AI, robot touch, tactile feedback, and dexterous manipulation.
- Embodied AI and Physical AI were related rising concepts.
- World model accelerated sharply in 2026 and reached a normalized peak of 100 in the week of 2026-06-28.
- VLA model related queries included world model, vision-language model, vision-language-action, world-action model, and pi0.

The broad term "world model" is not sufficiently specific for RoboSkin.ai and can include unrelated intent. The implementation therefore targets the defensible intersection "visuo-tactile world models for robot manipulation" and supports it with primary robotics papers.

## Primary-source paper set

| Source | Submitted | Role in the guide | Source |
| --- | --- | --- | --- |
| Visuo-Tactile World Models | 2026-02-05 | Contact-physics world model and planning evidence | https://arxiv.org/abs/2602.06001 |
| Dream-Tac | 2026-06-07 | Action-conditioned visual and tactile future prediction | https://arxiv.org/abs/2606.08737 |
| TouchWorld | 2026-07-08; revised 2026-07-09 | Hierarchical prediction plus fast tactile residual correction | https://arxiv.org/abs/2607.07287 |
| ViTacWorld | 2026-07-24 | Scaled rollout generation, data augmentation, and policy evaluation | https://arxiv.org/abs/2607.22530 |
| FeelWorld | 2026-07-27 | Contact, force-related tactile latent, slip, and contact-aware planning | https://arxiv.org/abs/2607.24267 |

All five sources were arXiv preprints at review time. Every metric on RoboSkin.ai is labeled as source-reported and tied to the paper protocol.

## Discovery and citation surfaces

The rollout adds or updates:

- An explicit static route with canonical metadata and a single H1.
- TechArticle, WebPage, BreadcrumbList, FAQPage, ImageObject, publisher, author, reviewedBy, citation, about, and mentions JSON-LD through the existing topic-page graph.
- A source-backed FeelWorld TechArticle with its primary arXiv citation.
- The HTML research index plus matching CSV and JSON records.
- Sitemap, RSS, protected URL contract, and homepage authority links.
- llms.txt important-page, research-brief, keyword-route, and canonical-answer sections.
- Internal links from tactile AI, tactile datasets, tactile foundation models, Dream-Tac, and TouchWorld.
- A keyword ownership row that prevents the foundation-model and world-model routes from competing for the same exact intent.

## Measurement plan

Day 0:

- Verify both routes in the production export and on the apex domain.
- Confirm canonical, robots, one H1, JSON-LD, sitemap, RSS, research-index CSV/JSON parity, and deployment identity.
- Submit only verified changed URLs to IndexNow.

Day 7:

- Check discovery and indexing for both new routes.
- Record early impressions for visuo-tactile world model, tactile world model, robot world model, FeelWorld, and contact-rich manipulation variants.
- Do not rewrite the title based on a few days of zero impressions.

Day 28:

- Compare impressions, clicks, CTR, and average position against the pre-rollout baseline.
- If both the foundation-model and world-model URLs receive the same query, preserve the ownership matrix and strengthen the contextual link to the intended owner.
- If the guide receives at least 20 impressions with CTR below 1%, test one title or description change.

Day 90:

- Evaluate whether the cluster contributes to the standing target of 15,000 rolling-28-day impressions, 150 clicks, 1.5% CTR, and at least three legitimate referring domains.
- Keep the guide current only when a new primary source changes the comparison, evidence boundary, or evaluation protocol.

## Non-claims

Google Trends does not guarantee rankings or traffic. llms.txt does not force an AI system to cite the site. Structured data does not guarantee a rich result. The defensible objective is to make a distinct, source-backed answer crawlable, internally connected, machine-readable, and easier to quote accurately.
