# Sensor directory and research resource update, October 17, 2026

## Scope and baseline

Continue the authorized RoboSkin.ai publication and internal/source-link work. The initial production baseline was main commit `abf86cd17ed4540b838298050018e8296d873aea`. Before release, the branch was reconciled with `4fb701fc5f1686fb4ff2fdfa486fda492d377623`, preserving the subsequently published REKI section from PR #63. PR #55 contained the TSF-85 profile, thermal-sensing section, sensor-cost guidance and tactile-versus-force-torque section but had conflicts with later published work.

The live TSF-85 URL returned 404. Tactaxis had a published profile but no filterable sensor record. The directory contained 14 sensors. Existing homepage counts, structured data and the knowledge graph consume that inventory; all must agree after additions.

## Changes

- Resolve PR #55 against current main, preserving the October 17 guides, Tactaxis profile, N0 section and previous contextual links.
- Add TSF-85 and Tactaxis to the shared sensor inventory, profile links and task-selection candidates. Keep manufacturer specifications distinct from independently measured performance, and preserve unknown rates, prices and availability.
- Keep pressure refresh separate from transport/dynamic rates for TSF-85. Keep the April 2025 Tactaxis taxel specifications separate from the 2026 module announcement.
- Add early Bench2Dex links to its dataset and benchmark records. Adopt the two descriptive VLA inbound anchors previously proposed in draft PR #36; retain its existing title, definition, model index and code starting points. This does not merge the rest of that draft PR.
- Update the Cartesian Hand release status and add pinned code, CAD, build and license resources. Add contextual entrances from `/robot-hands` and `/robot-manipulation`, plus a tactile-selection route from the review.
- Extend the existing consent-controlled GA4 resource allowlist to the new guides/profiles, Bench2Dex and Cartesian Hand. Only fixed resource IDs and public paths are collected. These events indicate navigation, not downloads, successful reproduction, confirmed subscriptions or qualified inquiries.
- Preserve subsection text and section-level source/context links in the full Markdown knowledge export, including the new thermal and cost explanations.

## Newly verified primary evidence

Checked October 17, 2026:

- [TSF-85 user guide](https://robotiq.com/hubfs/Tactile%20Sensor%20Fingertips/Tactile%20Sensors%20TSF-85%20-%20User%20Guide.pdf) and [SDK revision 172a7c8](https://github.com/robotiq/tactile_sensors/tree/172a7c8bf1e419bb9d653a94d19d866e480acebd): 60 Hz pressure array, separate 1000 Hz dynamic channel, revision-level gripper compatibility and external acquisition limitations.
- [Melexis April 2025 e-guide](https://www.melexis.com/-/media/files/documents/info/robotic-e-guide.pdf#page=9) and [April 2026 OYMotion announcement](https://www.melexis.com/en/news/2026/21apr2026-melexis-and-oymotion-elevate-tactile-sensing-for-next-generation-robotic-hands): source-specific taxel specifications and module industrialization, without a verified retail SKU or price.
- [Cartesian Hand revision 83b738e](https://github.com/generalroboticslab/Cartesian_Hand/tree/83b738e8c7bf3b74e08e36250492d774aa432324), committed October 10: public control code, hardware guide, STEP/Fusion files and root Apache-2.0 license. The README explicitly says the rewritten stack did not produce the paper results, manipulation tasks have not completed on their physical objects, and mock/MuJoCo examples contain no objects. No software execution or hardware reproduction was performed here.

## Measurement and follow-up

The authenticated ChatSEO email received October 12 covers October 3–9: 141 clicks, 8,414 impressions and average position 7.3. It reports `bench2dex` at 12 clicks, `vla robotics project` at 5, and `cartesian hand` at 0, down 3. These are weekly query totals, not query-to-page attribution. Search type, country/device filters and a complete 28-day comparison were not supplied. They do not establish a CTR problem or causation.

Use this batch to improve resource access and factual freshness. Retain titles rather than starting another snippet experiment on this limited evidence. After publication and recrawl, compare equal complete 28-day windows with matching GSC filters and query-by-page rows. Review resource navigation separately from confirmed newsletter subscriptions or inquiries. Extend the observation window if samples remain small.

The graph contract is regenerated from the shared data, not estimated. A regression check requires every sensor profile and task candidate to resolve to a visible directory row and its profile link. Release validation also checks preserved content, HTML, sitemap and internal destinations. Production verification and the deployed commit belong in the PR/release result; local checks alone do not establish publication or ranking gains.
