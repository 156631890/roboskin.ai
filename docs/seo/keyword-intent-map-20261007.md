# Keyword intent implementation — 2026-10-07

This implementation uses the three owner-provided keyword documents as planning input. Their SERP observations are attributed research, not a new verification of rankings, search volume or difficulty. The private source documents and account analytics are excluded from Git.

The growth target is daily unique visitors. Vercel visitors are an instrument-specific estimate, not individually verified humans; Search Console clicks and pageviews remain separate metrics. Observe daily UV and compare complete 7-day and 28-day periods with the same timezone and provider. No traffic target is claimed as achieved by deployment.

## Scope and decisions

- Add one substantial GelSight Mini/original DIGIT comparison with integration decisions and a proposed matched evaluation procedure. No hardware testing or current price is claimed.
- Add Sparsh/UniTouch roles, task-based dataset selection, VLA selection gates and a DIGIT/ROS 2 integration boundary. Preserve the dated dataset and model access records.
- Reuse the existing UMI/GELLO comparison and preserve its old section anchor. Preserve existing routes, imagery, interactive directories, comparisons, downloads, sources and schema behavior.
- Keep the ROS 2, Python, LeRobot, world-model and robot-hand guides as the primary intent owners. Do not create competing best-2026 or UMI/GELLO pages.
- Review of the 12 proposed pillar routes found existing definition or subject coverage. Do not rewrite every title or indexed URL to repeat a query verbatim.
- The report's additional long tails are covered by these topic clusters where supported. Procurement/price, clinical and compliance expansion needs separate current evidence; it is not manufactured for keyword coverage.
- Entries 18/19 swap order between the supplied intent and deployment tables; this map follows the keyword text in the intent list.

## Search-intent ownership

| # | Query | Intent | Primary URL / section | This release |
| --- | --- | --- | --- | --- |
| 1 | what is robot skin | I | /robot-skin | retain existing owner |
| 2 | robot skin vs e-skin | C | /guides/robot-skin-vs-e-skin | retain existing owner |
| 3 | robot skin vs tactile sensor | C | /guides/robot-skin-vs-tactile-sensor | retain existing owner |
| 4 | types of robot skin | I | /robot-skin#robot-skin-types | expanded with four sensing routes in the resource-growth release |
| 5 | how does robot skin work | I | /robot-skin#robot-skin-integration | expanded with an integration and evidence checklist in the resource-growth release |
| 6 | what is tactile AI | I | /tactile-ai | retain existing owner |
| 7 | tactile AI stack explained | I | /tactile-ai | retain existing owner |
| 8 | tactile sensing vs tactile AI | C | /tactile-ai | retain existing owner |
| 9 | humanoid robot tactile sensing | I | /humanoid-robot-skin | retain existing owner |
| 10 | whole body tactile sensing humanoid | C | /humanoid-robot-skin | retain existing owner |
| 11 | tactile sensors for humanoid robots | C | /humanoid-robot-skin | retain existing owner |
| 12 | tactile foundation model | I | /tactile-foundation-models | expanded existing page |
| 13 | tactile foundation models compared | C | /tactile-foundation-models | expanded existing page |
| 14 | sparsh vs unitouch | C | /tactile-foundation-models#sparsh-vs-unitouch | expanded existing page |
| 15 | visuo-tactile world model explained | I | /guides/visuo-tactile-world-models-robot-manipulation | retain existing owner |
| 16 | visuo-tactile datasets | I | /datasets | retain existing owner |
| 17 | tactile robot dataset list | I | /datasets | retain existing owner |
| 18 | tactile sensing benchmark | I | /benchmarks | retain existing owner |
| 19 | best datasets for tactile robot learning | C | /datasets#choose-by-learning-task | expanded existing page |
| 20 | what is physical AI | I | /physical-ai | retain existing owner |
| 21 | physical AI vs embodied AI | C | /physical-ai | retain existing owner |
| 22 | tactile feedback in physical AI | I | /physical-ai-touch | retain existing owner |
| 23 | touch in VLA models | I | /physical-ai-touch | retain existing owner |
| 24 | robot VLA models list | I | /robot-vla-models | retain existing owner |
| 25 | best VLA models for robotics | C | /robot-vla-models#choose-a-vla | expanded existing page |
| 26 | VLA model comparison | C | /robot-vla-models | expanded existing page |
| 27 | tactile manipulation | I | /tactile-manipulation | retain existing owner |
| 28 | slip detection robotic grasping | I | /tactile-manipulation | retain existing owner |
| 29 | tactile feedback robot manipulation | I | /tactile-manipulation | retain existing owner |
| 30 | insertion with tactile feedback robot | I | /tactile-manipulation | retain existing owner |
| 31 | best tactile sensor for robot hand | C | /applications/robot-hand-tactile-sensor | retain existing owner |
| 32 | robot hand tactile sensor comparison | C | /applications/robot-hand-tactile-sensor | retain existing owner |
| 33 | dexterous hand tactile sensing | I | /robot-hands | retain existing owner |
| 34 | gelsight vs digit | C | /guides/gelsight-vs-digit | new comparison |
| 35 | digit vs tactip | C | /sensors#optical-comparison | retain existing owner |
| 36 | best optical tactile sensor | C | /sensors#task-selection | retain existing owner |
| 37 | tactile sensor comparison | C | /sensors | retain existing owner |
| 38 | reskin sensor review | I | /sensors/reskin | retain existing owner |
| 39 | tactile sensor types | I | /technology | retain existing owner |
| 40 | how do tactile sensors work | I | /technology | retain existing owner |
| 41 | tactile sensor transduction methods | I | /technology | retain existing owner |
| 42 | what is e-skin | I | /e-skin | retain existing owner |
| 43 | e-skin for robots | I | /e-skin | retain existing owner |
| 44 | robot teleoperation data collection | I | /robot-teleoperation | retain existing owner |
| 45 | UMI vs GELLO | C | /robot-teleoperation#section-umi-and-gello-collect-different-kinds-of-demonstrations | expanded existing page |
| 46 | tactile teleoperation | I | /robot-teleoperation | retain existing owner |
| 47 | visuo-tactile fusion explained | I | /visuo-tactile | retain existing owner |
| 48 | vision vs touch robot sensing | C | /visuo-tactile | retain existing owner |
| 49 | tactile sensing robot safety | I | /robot-safety | retain existing owner |
| 50 | ISO 10218 tactile sensors | I | /robot-safety | retain general context; specialist expansion deferred |
| 51 | tactile sensor ROS 2 tutorial | H | /guides/ros2-tactile-sensing | retain existing owner |
| 52 | how to calibrate tactile sensor | H | /guides/tactile-sensor-calibration | retain existing owner |
| 53 | python tactile data processing | H | /guides/python-tactile-data-processing | retain existing owner |
| 54 | lerobot dataset format tactile | H | /guides/lerobot-dataset-format | retain existing owner |
| 55 | how to integrate digit sensor ros2 | H | /sensors/digit#ros2-integration | expanded existing page |
| 56 | robot gripper tactile sensor | C | /applications/robot-gripper-tactile-sensor | retain existing owner |
| 57 | soft robotic skin applications | I | /applications/soft-robotic-skin | retain existing owner |
| 58 | tactile sensors for prosthetics | I | /applications | retain general context; specialist expansion deferred |
| 59 | tactile sensing research papers | I | /research-index | retain existing owner |
| 60 | robot skin glossary | I | /glossary | retain existing owner |

## Evidence and review boundary

New sensor comparison: official GelSight gsrobotics documentation, original DIGIT paper and the pinned interface/design revisions linked in the page. New model comparison: official Sparsh project and UniTouch repository reviewed October 7, 2026. Dataset recommendations reuse the existing source-reviewed records and retain their original review dates and unknown access/license fields. Editorial recommendations are conditional and are not measured rankings. AI assisted drafting and implementation; no new independent human expert review is claimed. Release authorization is the owner's existing instruction to modify, submit and deploy.

## Measurement checkpoints

The subsequent October 7 resource-growth release adds a blank experiment worksheet
to `/tactile-ai#experiment-worksheet`, contextual resource links on eight existing
research briefs, and consent-aware GA4 resource/campaign measurement. It does not
claim that the remaining mapped terms have all received individual deep rewrites.
See [release scope](resource-growth-20261007.md).

At 7 days, check UV data completeness, changed-page visits, internal navigation and resource use; inspect discovery and index status separately. At 28 days, compare same-provider daily UV and matched Search Console query/page cohorts. Segment search, referral and direct traffic; keep request bots and preview/test activity out where the provider supports it. Track download/source clicks as resource use, not unique people or completed research. Extend the observation window for sparse query data. No new recurring automation is created by this document.
