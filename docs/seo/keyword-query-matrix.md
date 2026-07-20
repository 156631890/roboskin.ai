# RoboSkin.ai Keyword Query Matrix

Use this matrix to prevent keyword cannibalization. Each query cluster has one primary URL, supporting URLs, and a measurement rule. Do not create a new page when an existing canonical route already owns the intent.

## Priority query clusters

| Query cluster | Primary URL | Supporting URLs | Search intent | Measurement rule |
| --- | --- | --- | --- | --- |
| physical ai robot skin | `https://roboskin.ai/physics-ai` | `https://roboskin.ai/`, `https://roboskin.ai/robot-skin`, `https://roboskin.ai/guides/tactile-feedback-for-physical-ai` | Define how robot skin supports Physical AI systems. | Track impressions and average position for the query and close variants. |
| physical ai tactile feedback | `https://roboskin.ai/guides/tactile-feedback-for-physical-ai` | `https://roboskin.ai/physics-ai`, `https://roboskin.ai/tactile-ai`, `https://roboskin.ai/guides/physical-ai-touch-data` | Explain contact feedback loops, pressure, slip, and response paths for Physical AI. | Improve evidence and headings before creating any new page. |
| robot skin for physical ai | `https://roboskin.ai/robot-skin` | `https://roboskin.ai/physics-ai`, `https://roboskin.ai/`, `https://roboskin.ai/applications/humanoid-robot-skin` | Explain robot skin as the tactile surface and contact layer for embodied systems. | If the homepage ranks instead, add a stronger internal link to `/robot-skin`. |
| tactile ai robot skin | `https://roboskin.ai/tactile-ai` | `https://roboskin.ai/robot-skin`, `https://roboskin.ai/technology`, `https://roboskin.ai/guides/tactile-sensor-for-robots` | Explain the AI workflow that turns robot skin signals into behavior. | Compare CTR between `/tactile-ai` and `/technology` before title changes. |
| robot touch data | `https://roboskin.ai/guides/physical-ai-touch-data` | `https://roboskin.ai/guides/robot-touch-sensor`, `https://roboskin.ai/research`, `https://roboskin.ai/physics-ai` | Explain tactile logs, contact events, and touch signal datasets. | Add source-backed examples if impressions appear with low average position. |
| humanoid robot skin tactile sensor | `https://roboskin.ai/applications/humanoid-robot-skin` | `https://roboskin.ai/applications/robot-hand-tactile-sensor`, `https://roboskin.ai/robot-skin`, `https://roboskin.ai/research` | Match application-level humanoid and hand sensing searches. | If `/research` ranks first, link from the ranking research page to the humanoid route. |
| tactile sensor benchmark | `https://roboskin.ai/guides/tactile-sensor-benchmark-robot-manipulation` | `https://roboskin.ai/guides/tactile-sensor-for-robots`, `https://roboskin.ai/applications/robot-hand-tactile-sensor`, `https://roboskin.ai/research-index` | Compare sensor modalities through manipulation tasks and evaluation evidence. | Keep modality claims task-specific; improve source evidence before adding another sensor-comparison page. |
| tactile datasets robot learning | `https://roboskin.ai/guides/tactile-datasets-robot-learning` | `https://roboskin.ai/guides/physical-ai-touch-data`, `https://roboskin.ai/research/freetacman-robot-free-visuotactile-data-collection-2025`, `https://roboskin.ai/research-index` | Find and evaluate tactile datasets by signals, collection unit, split, and transfer fit. | Update the directory row only after verifying the primary source, access path, and license status. |
| tactile foundation models | `https://roboskin.ai/guides/tactile-foundation-models` | `https://roboskin.ai/tactile-ai`, `https://roboskin.ai/news/touchworld-tactile-foundation-model-dexterous-manipulation-2026`, `https://roboskin.ai/research/dream-tac-tactile-world-action-model-2026` | Compare tactile representation, prediction, policy, and control roles. | Do not create separate model-category pages until query evidence shows distinct intent. |

## Canonical ownership rules

| Rule | Action |
| --- | --- |
| Two URLs receive impressions for the same query cluster | Keep the primary URL as the only page with exact-match heading language. Use supporting pages to link to it. |
| A supporting page has higher position than the primary URL | Add a short contextual link from the supporting page to the primary URL using descriptive anchor text. |
| A query has impressions but no clicks | Rewrite the title and meta description only after confirming the page is indexed and has at least 20 impressions. |
| A query has no impressions after 28 days | Improve internal links, add evidence, or add a relevant image before creating a new page. |
| A new related query appears in Search Console | Add it to this matrix before adding content. |

## Weekly review order

1. Check Google Search Console query data for the six priority query clusters.
2. Check Bing Webmaster Tools for matching query and AI Performance data when available.
3. Record whether answer engines cite the homepage, `/physics-ai`, or a guide page.
4. Change one thing at a time: internal link, heading evidence, title/meta, or new content.
5. Wait at least one full crawl cycle before making another change to the same URL.
