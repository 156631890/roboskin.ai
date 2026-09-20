# Search entry routes — 2026-09-20

Visitors reaching concept and directory pages need a short path to specific sensors, datasets, practical tutorials and research comparisons. This batch improves five existing search entry pages without changing their recently reviewed titles, descriptions or canonical URLs.

## Changes

- `/robot-skin`: sensor comparison, DIGIT specifications and research evidence links.
- `/tactile-ai`: Python tutorial, dataset directory and tactile world-model comparison links.
- `/sensors`: direct DIGIT, GelSight Mini and ReSkin links.
- `/datasets`: direct RoboTacDex, TactiDex and SoftVTBench row anchors. The DIGIT filter now includes both original DIGIT label variants while keeping Digit360, Pinki and simulated sensors distinct.
- `/guides/visuo-tactile-world-models-robot-manipulation`: five research-role cards with primary-paper links, plus direct comparison, evaluation and update anchors. Roles reuse the existing sourced comparison; they are not a shared-benchmark ranking.

The batch adds 16 marked navigation positions: nine links to other site pages and seven same-page anchors. They render in exported HTML. `Search Route Open` records the source page, destination, label, hash and batch. Existing event types may also fire; do not sum these as unique visitors.

## Jev review

One TypeSafe request evaluated all 16 proposed navigation positions for relevance and anchor accuracy using public page excerpts. The returned model was `jev-1.13.0`; all decisions were `keep` (confidence 0.82–1.0). Request usage was 7,650 input and 601 output tokens, with approximately 1.45 seconds for the request and validation. This is a semantic review, not evidence of ranking improvement. Dollar cost was not measured.

## Validation before release

- 194 tests passed, including original DIGIT label equivalence and newer/simulated sensor separation.
- Lint, production build and export verification passed: 126 sitemap URLs and 130 protected URL contract entries.
- Static checks verified five canonical URLs, one H1 per page, all 16 navigation targets and five primary-paper links.
- Browser checks verified two DIGIT results, reset to 20 dataset rows, the RoboTacDex anchor and five model cards. A narrow viewport had no document overflow on the model guide; no captured console errors were observed there.

## Measurement

Compare the changed page/query pairs after 7 and 28 days using equal-length Search Console windows, while accounting for reporting delay. Prioritize robot skin, tactile AI, DIGIT tactile sensor, GelSight Mini, RoboTacDex, visuo-tactile world models and ViTacWorld. Track impressions, clicks, CTR and position separately from the new site navigation event and downstream resource use. These checks are a measurement plan, not scheduled automation or a traffic guarantee.

Recent title changes predate this batch but postdate parts of the available search reporting window. Allow them a full observation window before attributing low CTR to those titles or replacing them again. Release identity and production verification are recorded after deployment in local artifacts.
