# RoboSkin News - 2026-09-25 batch

Status at preparation: four source-verified English articles and four original explanatory graphics are ready on `codex/news-2026-09-25`. Publication, CI, merge and production checks are recorded separately and must not be inferred from this preparation note.

## Deduplication scope

- Base commit: `247c2abdb7b5d908764f299780867a2e2bb4e112` on `main`.
- Checked the live News, Research, Datasets and Editorial Policy pages; the News model; the editorial log; prior batch reports; open pull requests; and same-day branch state.
- Excluded the previously published Agile-WAM, TouchSight, ZeroTouch, CRISP, SpectRobot, Tactile-JEPA, Touch2Robot, When Does Touch Matter?, Better Curriculum, VisForce, CableVLA, Cartesian Hand, GLoTouch, CoPRE, Berkeley QUAD Hand, LiMA and InternW0 events. Deduplication used paper IDs, official URLs, versions and the specific release event.
- The four selected events are arXiv v1 submissions from September 24, 2026 and were researched within 72 hours. Search results were used only for discovery; claims were checked against full papers and official project or repository pages where available.

## Selected articles

| Project | Primary event | Intended URL | Search intent |
| --- | --- | --- | --- |
| TactileStep | `arXiv:2609.28959v1`, 2026-09-24 03:13:38 UTC | `/news/tactilestep-sole-pressure-humanoid-locomotion` | How sole-pressure feedback changes Unitree G1 locomotion, including the 25 Hz hardware loop and its energy trade-off |
| Anthropomimetic soft robotic forearm | `arXiv:2609.29176v1`, 2026-09-24 07:49:09 UTC | `/news/anthropomimetic-forearm-carpal-stiffness` | How movable carpal bones redirect wrist stiffness and exactly which hardware and analysis artifacts are downloadable |
| CAMP | `arXiv:2609.29021v1`, 2026-09-24 04:45:36 UTC | `/news/camp-cooperative-arm-hand-motion-planning` | How cooperative arm-hand planning handles constrained spaces, with solver timing and physical-test scope separated |
| Support-enhanced granular-jamming gripper | `arXiv:2609.29093v1`, 2026-09-24 06:20:32 UTC | `/news/support-enhanced-granular-jamming-gripper` | What an internal support rod changes in a granular-jamming gripper and which end-to-end success evidence is still missing |

## Fact-check notes

### TactileStep

- Tsinghua University researchers evaluate a 29-DoF Unitree G1 policy with proprioception, depth and sole-contact features. The project page labels the work CoRL 2026; this record conservatively treats it as an arXiv preprint.
- Simulation models 60 taxels per sole and reduces them to force, center of pressure and contact area. Training uses 2,048 parallel agents on one RTX 4090.
- Hardware uses wireless insoles at 25 Hz. The paper separately evaluates 100 Hz and reports under 1 ms post-processing and communication latency; this does not make the deployed wireless sensing rate 100 Hz.
- The largest reported peak-force change is 695.0 plus or minus 49.4 N to 355.7 plus or minus 39.8 N on the platform-up condition, a 48.8% reduction over 20 samples per condition.
- Simulation energy is higher and speed slightly lower for the tactile policy. The paper does not systematically evaluate failures, recovery, sensor drift or recalibration.
- The official page says code is coming soon. No downloadable repository, data package or license was verified.

### Anthropomimetic soft robotic forearm

- University of Electro-Communications researchers compare an anatomical eight-carpal-bone wrist with a fused proximal row and a geometric ellipsoid joint in one 22-actuator prototype.
- The quasi-static protocol applies 0.6 N uniform tendon tension, 3 mm displacement in 12 directions and eight repeats per condition; motion capture runs at 100 Hz.
- For the anatomical wrist, finger activation reports 140.7 N/m major and 80.1 N/m minor stiffness; combined finger and wrist activation reports 156.1 and 90.8 N/m. The reported ellipse reorientation is 48.2 degrees with permutation `p = 0.0038`.
- The ellipsoid joint is stiffer, at 282 to 518 N/m major stiffness, but remains near the same orientation across activation states. Higher stiffness is therefore not interchangeable with adaptive orientation.
- Results are quasi-static and come from one physical build, without inter-build variability or dynamic impact tests.
- The official repository contains CAD, printable parts, firmware, analysis data and video. License notices distinguish derived bone and fingertip molds under CC BY-SA 2.1 JP from the authors' other materials under CC BY 4.0.

### CAMP

- CAMP is evaluated on a 6-DoF UR7e arm plus a 16-DoF LinkerHand, for 22 active joints, with an Intel i9-14900KF and RTX 5070 Ti.
- Six simulation scenarios use 10 batches of 100 trials. Reported success ranges from 84.2% to 98.5%; solver time ranges from 3.40 to 42.6 seconds depending on the scene.
- The paper's solver time excludes setup, path simplification, dense validation, collision-checker preparation, artifact I/O and playback. It is not full application latency.
- Physical evaluation uses 10 trials per scenario: 80% for ball pregrasp, 90% for display target reach and 80% for cabinet pregrasp. These tests stop at the planned goal pose; they do not include autonomous grasping, lifting or button pressing.
- Static, known geometry, a 1 cm collision margin and one robot-hand platform bound the evidence. Physical failures include hand-obstacle collisions.
- The official code page says implementation will be released after paper acceptance. No repository or license is currently linked.

### Support-enhanced granular-jamming gripper

- The gripper combines natural rubber, thermoplastic-rubber particles, nominal 50% fill and an internal support rod at the end of a tendon-driven continuum robot.
- In a matched 10-trial comparison, the supported gripper succeeds 10/10 times versus 6/10 without the rod. Fill-ratio tests report 90% at one-third, 100% at one-half and 70% at four-fifths fill.
- Ten trials per object shape produce 10/10 sphere, 9/10 hexagonal prism, 8/10 cylinder, 8/10 cube and 1/10 triangular-pyramid results. These are grasp trials, not a general manipulation benchmark.
- The reinforcement-learning policy controls tendon-driven reaching only; it does not close the loop over contact sensing or pneumatic jamming.
- Sixteen physical reaches over two targets report 4.23 cm terminal RMSE, compared with 2.51 cm in simulation. A complete transfer sequence is demonstrated, but the paper does not provide a repeated end-to-end task success rate.
- No official project page, code, CAD, data package or asset license is linked. Object range, approach direction and broader 3D pose variation remain limited.

## SEO, GEO and media

- Each article has a distinct reader intent, slug, H1, title, description, excerpt, source date, evidence status and fact-first lead.
- Key conclusions link to primary evidence near first use. Source-event dates and RoboSkin publication dates remain separate, and editorial analysis is explicitly labeled.
- Canonical, Open Graph, NewsArticle and BreadcrumbList reuse the existing News implementation. No hidden content, global SEO rewrite or ranking promise is introduced.
- Internal links point only to existing routes, including `/humanoid-robot-skin`, `/physical-ai-touch`, `/robot-hands`, `/robot-manipulation`, `/sensors` and `/tactile-manipulation`.
- Four original 1200 by 675 SVG/PNG explanatory schematics use the current visual system. Captions identify them as explanatory graphics rather than experiment imagery.
- Existing generators supply the News list, sitemap, Google News sitemap and RSS. The four formal URLs are added to the protected inventory.

## Source access and evidence level

Primary arXiv records and full v1 papers were inspected on September 25, 2026. The TactileStep and CAMP project pages and the anthropomimetic-forearm repository were also inspected. All four are treated as preprints. RoboSkin.ai did not reproduce the experiments.

## Implementation checklist

- Read the actual branch state, content model, editorial policy and scripts before editing; no `AGENTS.md` exists in the repository.
- Reuse the News route, real editorial byline, image pipeline, NewsArticle and BreadcrumbList implementation.
- Keep production canonical and indexability behavior unchanged and preserve preview protection.
- Use existing News, sitemap, News-sitemap and RSS generators. Do not alter global search settings or create an IndexNow key.
- Run lint, tests, build and export verification. Inspect every generated article's title, description, H1, canonical, robots, JSON-LD, dates, image, sources, internal links and slug uniqueness.
- Review the exact PR head, required checks and both Vercel checks before merging with an expected head SHA. Confirm both production projects and live formal URLs after merge.

## Validation record

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm test`: 200 of 200 tests passed.
- `npm run build`: passed; 171 static pages generated and 156 agent-readable Markdown representations produced.
- `npm run verify:export`: passed; verified 147 sitemap URLs, 151 protected URL entries, 193 graph entities, 30 research-index records and 50 RSS items.
- The full on-page audit passed across all 147 sitemap pages with unique titles and descriptions, one H1, self-referencing canonicals and valid internal destinations and anchors.
- Focused output checks confirmed each new page is `index, follow`, contains NewsArticle and BreadcrumbList, loads its lead image, and appears in News, the main sitemap, News sitemap and RSS.
- All four lead PNGs are 1200 by 675 pixels. Primary arXiv pages, both project sites and the public repository were accessible during research.
- Validation used Node.js 24.19.0 while the repository declares Node.js 22.x; no dependency or lockfile change was produced.
- GitHub CI, pull-request merge, production deployment and live verification remain separate steps and are not claimed by this local record.
