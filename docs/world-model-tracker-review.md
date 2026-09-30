# T2: Tactile world model tracker seed review

Status: **待人工审核 — data, modality mapping, evidence labels and editorial verdicts.**

This task only prepares data. It adds no route, public download, navigation link,
structured data or sitemap entry. Do not connect these seeds to a public indexed
page until editorial review. Existing pillar tables remain unchanged.

## Implementation and source boundary

- Follow the existing `src/lib/tactile-datasets.ts` / `robot-world-models.ts` convention:
  `src/lib/world-model-tracker.json` is the single source for the new tracker.
  `world-model-tracker.ts` validates it before exporting typed entries.
- All eight arXiv records and version-specific HTML papers were checked on
  2026-09-30, together with the linked official project pages and Dream-Tac repository.
  Records retain their exact paper version. `releaseDate` is the first submission,
  not the revision date; `lastVerified` is this source review, not author confirmation.
- Every record lists the primary pages actually used plus the existing site brief.
  Institutions retain source naming (including the DexTouch-WM paper's abbreviations).
  Findings are author-reported; no hardware experiment or model reproduction was run.
- `predicts` covers outputs, not conditioning inputs. `latent` describes an explicitly
  predicted latent representation in addition to its visual/tactile/action meaning.
  For HiTac-WAM the seed records the hierarchical tactile forecast head; reviewers
  should confirm whether the tracker should instead classify the entire video/action
  candidate-generation stack. `touch` includes contact signals in this restricted enum;
  InternW0's force channels are not represented by an invented `force` enum member.
- Release labels are artifact-specific. `released` requires a verified implementation;
  `announced` requires an explicit coming-soon statement; `none` requires an explicit
  no-release statement; an absent link or disabled button means `unknown`.
  A paper's license never becomes a code, data or weight license.
- The plan's A/B/C/D enum has no separate real-robot/unknown-code category. To avoid
  treating "not found" as "not released", such records retain `realRobotEval.has=true`
  and provisional **D**. B is used only with explicit coming-soon code evidence.
  This conservative mapping needs human review; D does not deny the robot experiments.
  Grades describe evidence availability, not a performance ranking or independent replication.
- No author has been contacted as part of T2. All `authorCheck` values remain `not-contacted`.

## Field evidence and evaluation scope

| Record | Primary evidence | Scope / review note |
| --- | --- | --- |
| Dream-Tac | [v1](https://arxiv.org/html/2606.08737v1), [official implementation](https://github.com/LYFCLOUDFAN/Dream-Tac) | Paper hardware/evaluation: Panda, Xense Photon, six tasks, 20 trials per method/task. Public implementation README and GitHub license metadata identify Apache-2.0 **code only**. |
| FeelWorld | [v1](https://arxiv.org/html/2607.24267v1) | Hierarchical visual/tactile prediction, Imeta-Y1 and DM point-cloud sensors; three tasks, 40 real-robot planning trials per task. No artifact release verified. |
| HiTac-WAM | [v1](https://arxiv.org/html/2608.19574v1) | Bilateral DM-Tac W2 on IMETA-Y1; three tasks, 30 trials per method/task. Review forecast-head versus whole-system modality scope. |
| TouchWorld | [v2](https://arxiv.org/html/2607.07287v2), [project](https://phanes-lab.github.io/TouchWorld-website/) | Six tasks on an unnamed humanoid with Wuji hands and JQ-Industries glove. 100 rollouts per task is a total; clean/perturbed split is undisclosed, so per-setting count stays null. |
| ViTacWorld | [v2](https://arxiv.org/html/2607.22530v2#S4), [project](https://vitacworld.github.io/) | September 28 v2 explicitly specifies **50** trials per policy, training stage and task across four tasks, superseding the old site's v1 10-trial account. Code says coming soon. Existing v1 pages are outside T2 scope. |
| DexTouch-WM | [v2](https://arxiv.org/html/2609.20649v2) | Ten collected robot tasks split into six pretraining and four downstream tasks; tracker counts four downstream evaluation tasks. Ten matched rollouts per policy/task/environment; five raters do not multiply rollout count. Shared 320-taxel training layout is distinct from the raw 360-taxel glove. |
| Agile-WAM | [v2](https://arxiv.org/html/2609.20761v2), [project](https://hanchuzhou.github.io/TARO_project_page/) | Five physical tasks, 20 evaluation episodes per policy/task; exclude nine simulation tasks. Flexiv Rizon 4 and ADI 32 x 32 piezoresistive sensor. Code explicitly coming soon. |
| InternW0 | [v1 sections 2 and 5](https://arxiv.org/html/2609.27656v1), [project](https://internrobotics.github.io/internw0) | Five real-robot tasks, 15 trials each; four dual-arm tasks and one dexterous-hand pipetting task. Pipetting's five stages are not five tasks. Sensor brand/model unverified; disabled artifact buttons do not establish a release. |

## Missing values for human follow-up

| Record | Null fields | Unknown release fields |
| --- | --- | --- |
| Dream-Tac | None | `openSource.data`, `openSource.weights` |
| FeelWorld | `openSource.license` | `openSource.code`, `.data`, `.weights` |
| HiTac-WAM | `openSource.license` | `openSource.code`, `.data`, `.weights` |
| TouchWorld | `realRobotEval.rolloutsPerSetting`, `openSource.license` | `openSource.code`, `.data`, `.weights` |
| ViTacWorld | `openSource.license` | `openSource.data`, `openSource.weights` |
| DexTouch-WM | `openSource.license` | `openSource.code`, `.data`, `.weights` |
| Agile-WAM | `openSource.license` | `openSource.data`, `openSource.weights` |
| InternW0 | `tactileSensor`, `openSource.license` | `openSource.code`, `.data`, `.weights` |

## Validation and later tasks

`node --test tests/world-model-tracker.test.mjs` validates the eight seeds, source
versions and internal brief references, key scientific boundaries, and malformed
imports. The project-wide test/lint/build/export gates and TypeScript check apply.
No new dependency is required. Validation checks structure and consistency; it
does not substitute for scientific source review.

T3/T5/T6/T10 should import the typed validated data rather than copy facts into
components. T6's "added in the last seven days" cannot be derived from publication
date or verification date; add explicit ingestion provenance in that task before
claiming weekly additions. Public dataset licensing and publication remain later tasks.
