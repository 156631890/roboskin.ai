# RoboSkin.ai Keyword Query Matrix

Use this matrix to prevent keyword cannibalization. Each query cluster has one primary URL, supporting URLs, and a measurement rule. Do not create a new page when an existing canonical route already owns the intent.

## Strategic 20-cluster ownership

These are the agreed authority targets. Each cluster has one canonical owner; supporting pages add evidence and links without competing for the same definition-level intent.

| Tier | Keyword cluster | Canonical owner | Supporting route | Page role |
| --- | --- | --- | --- | --- |
| 1 | robot skin | `https://roboskin.ai/robot-skin` | `https://roboskin.ai/humanoid-robot-skin` | Primary technology and research definition. |
| 1 | tactile AI | `https://roboskin.ai/tactile-ai` | `https://roboskin.ai/tactile-foundation-models` | Primary sensing-to-action intelligence pillar. |
| 1 | humanoid robot skin | `https://roboskin.ai/humanoid-robot-skin` | `https://roboskin.ai/robot-skin` | Humanoid coverage, safety, hands, arms, and body stack. |
| 1 | robotic skin | `https://roboskin.ai/robot-skin` | `https://roboskin.ai/e-skin` | Synonym intent consolidated into the robot-skin pillar. |
| 1 | robot tactile sensing | `https://roboskin.ai/tactile-ai` | `https://roboskin.ai/guides/tactile-sensor-for-robots` | System-level sensing, representation, and control path. |
| 1 | tactile sensing robotics | `https://roboskin.ai/tactile-ai` | `https://roboskin.ai/technology` | Robotics sensing architecture and learning context. |
| 2 | tactile sensors for robots | `https://roboskin.ai/guides/tactile-sensor-for-robots` | `https://roboskin.ai/technology` | Sensor-selection and modality intent. |
| 2 | tactile sensor robot hand | `https://roboskin.ai/applications/robot-hand-tactile-sensor` | `https://roboskin.ai/humanoid-robot-skin` | Hand-level grasp, slip, and manipulation intent. |
| 2 | humanoid tactile sensing | `https://roboskin.ai/humanoid-robot-skin` | `https://roboskin.ai/applications/robot-hand-tactile-sensor` | Humanoid-specific tactile system intent. |
| 2 | electronic skin robotics | `https://roboskin.ai/e-skin` | `https://roboskin.ai/robot-skin` | Electronic-skin materials and robotics use. |
| 2 | robot e-skin | `https://roboskin.ai/e-skin` | `https://roboskin.ai/robot-skin` | E-skin terminology and technology route. |
| 2 | artificial skin for robots | `https://roboskin.ai/robot-skin` | `https://roboskin.ai/applications/soft-robotic-skin` | Artificial-skin category and soft-skin applications. |
| 2 | tactile manipulation | `https://roboskin.ai/guides/tactile-sensor-benchmark-robot-manipulation` | `https://roboskin.ai/tactile-ai` | Task-first manipulation and sensor evaluation. |
| 2 | visuo-tactile manipulation | `https://roboskin.ai/guides/visuo-tactile-world-models-robot-manipulation` | `https://roboskin.ai/tactile-foundation-models` | Vision-touch fusion, prediction, planning, and control. |
| 3 | tactile dataset robotics | `https://roboskin.ai/datasets` | `https://roboskin.ai/research-index` | Filterable, source-reviewed dataset directory. |
| 3 | tactile benchmark robotics | `https://roboskin.ai/guides/tactile-sensor-benchmark-robot-manipulation` | `https://roboskin.ai/datasets` | Benchmark design and task-specific comparison. |
| 3 | whole body tactile sensing | `https://roboskin.ai/humanoid-robot-skin` | `https://roboskin.ai/robot-skin` | Full-hand, arm, torso, and whole-body coverage. |
| 3 | soft tactile sensor | `https://roboskin.ai/applications/soft-robotic-skin` | `https://roboskin.ai/robot-skin` | Soft-material sensor applications and design tradeoffs. |
| 3 | tactile foundation model | `https://roboskin.ai/tactile-foundation-models` | `https://roboskin.ai/tactile-ai` | Model scope, representations, transfer, and evidence limits. |
| 3 | Physical AI tactile sensing | `https://roboskin.ai/physical-ai-touch` | `https://roboskin.ai/physics-ai` | Touch as a perception and feedback channel for Physical AI. |

## Priority query clusters

| Query cluster | Primary URL | Supporting URLs | Search intent | Measurement rule |
| --- | --- | --- | --- | --- |
| physical ai robot skin | `https://roboskin.ai/physics-ai` | `https://roboskin.ai/`, `https://roboskin.ai/robot-skin`, `https://roboskin.ai/guides/tactile-feedback-for-physical-ai` | Define how robot skin supports Physical AI systems. | Track impressions and average position for the query and close variants. |
| humanoid robot tactile sensing | `https://roboskin.ai/humanoid-robot-skin` | `https://roboskin.ai/`, `https://roboskin.ai/applications`, `https://roboskin.ai/applications/robot-hand-tactile-sensor` | Explain tactile coverage, robot hands, slip, and contact feedback for humanoid robots. | Strengthen the canonical pillar before adding another humanoid overview. |
| embodied ai touch | `https://roboskin.ai/physical-ai-touch` | `https://roboskin.ai/`, `https://roboskin.ai/physics-ai`, `https://roboskin.ai/tactile-ai` | Connect embodied or physical-world AI to tactile sensing and contact data. | Keep the broad definition on `/physics-ai`; keep tactile intent on `/physical-ai-touch`. |
| robot manipulation tactile sensor | `https://roboskin.ai/guides/tactile-sensor-benchmark-robot-manipulation` | `https://roboskin.ai/`, `https://roboskin.ai/applications/robot-hand-tactile-sensor`, `https://roboskin.ai/technology` | Compare tactile sensing methods by contact-rich manipulation task. | Add evidence to the benchmark instead of creating sensor-by-sensor thin pages. |
| VLA and world-action model for robots | `https://roboskin.ai/guides/visuo-tactile-world-models-robot-manipulation` | `https://roboskin.ai/`, `https://roboskin.ai/tactile-foundation-models`, `https://roboskin.ai/research/feelworld-visuo-tactile-world-model-2026` | Explain where touch, contact prediction, VLA context, and world-action models meet robot planning. | Preserve the guide as the comparison route and use research briefs for individual papers. |
| physical ai tactile feedback | `https://roboskin.ai/guides/tactile-feedback-for-physical-ai` | `https://roboskin.ai/physics-ai`, `https://roboskin.ai/tactile-ai`, `https://roboskin.ai/physical-ai-touch` | Explain contact feedback loops, pressure, slip, and response paths for Physical AI. | Keep this as a supporting feedback-loop page under the top-level pillar. |
| robot skin for physical ai | `https://roboskin.ai/robot-skin` | `https://roboskin.ai/physics-ai`, `https://roboskin.ai/`, `https://roboskin.ai/humanoid-robot-skin` | Explain robot skin as the tactile surface and contact layer for embodied systems. | If the homepage ranks instead, add a stronger internal link to `/robot-skin`. |
| tactile ai robot skin | `https://roboskin.ai/tactile-ai` | `https://roboskin.ai/robot-skin`, `https://roboskin.ai/technology`, `https://roboskin.ai/guides/tactile-sensor-for-robots` | Explain the AI workflow that turns robot skin signals into behavior. | Compare CTR between `/tactile-ai` and `/technology` before title changes. |
| robot touch data | `https://roboskin.ai/physical-ai-touch` | `https://roboskin.ai/guides/robot-touch-sensor`, `https://roboskin.ai/research`, `https://roboskin.ai/physics-ai` | Explain tactile logs, contact events, and touch signal datasets. | Add source-backed examples if impressions appear with low average position. |
| humanoid robot skin tactile sensor | `https://roboskin.ai/humanoid-robot-skin` | `https://roboskin.ai/applications/robot-hand-tactile-sensor`, `https://roboskin.ai/robot-skin`, `https://roboskin.ai/research` | Match application-level humanoid and hand sensing searches. | If `/research` ranks first, link from the ranking research page to the humanoid route. |
| tactile sensor benchmark | `https://roboskin.ai/guides/tactile-sensor-benchmark-robot-manipulation` | `https://roboskin.ai/guides/tactile-sensor-for-robots`, `https://roboskin.ai/applications/robot-hand-tactile-sensor`, `https://roboskin.ai/research-index` | Compare sensor modalities through manipulation tasks and evaluation evidence. | Keep modality claims task-specific; improve source evidence before adding another sensor-comparison page. |
| tactile datasets robot learning | `https://roboskin.ai/datasets` | `https://roboskin.ai/physical-ai-touch`, `https://roboskin.ai/research/freetacman-robot-free-visuotactile-data-collection-2025`, `https://roboskin.ai/research-index` | Find and evaluate tactile datasets by signals, collection unit, split, and transfer fit. | Update a database row only after verifying the primary source, access path, and license status. |
| tactile foundation models | `https://roboskin.ai/tactile-foundation-models` | `https://roboskin.ai/tactile-ai`, `https://roboskin.ai/guides/visuo-tactile-world-models-robot-manipulation`, `https://roboskin.ai/news/touchworld-tactile-foundation-model-dexterous-manipulation-2026` | Compare reusable tactile representations, policy roles, model scope, and transfer evidence. | Keep the exact foundation-model definition and representation comparison on this page. |
| visuo-tactile world models robot manipulation | `https://roboskin.ai/guides/visuo-tactile-world-models-robot-manipulation` | `https://roboskin.ai/research/feelworld-visuo-tactile-world-model-2026`, `https://roboskin.ai/research/dream-tac-tactile-world-action-model-2026`, `https://roboskin.ai/news/touchworld-tactile-foundation-model-dexterous-manipulation-2026` | Compare action-conditioned visual-tactile prediction, contact and slip state, rollout generation, planning, and control evidence. | Track visuo-tactile, tactile world model, robot world model, and contact-rich manipulation variants together; supporting paper pages must link back to this canonical comparison. |

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
