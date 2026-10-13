# RoboSkin.ai model-card standard

Standard introduced: 2026-10-12. Applies to editorial records for robot world models and vision-language-action (VLA) models. This is an authoring and evidence standard, not a claim that every existing record already exposes every field as a separate property.

The public explanation is [/methodology](https://roboskin.ai/methodology). The existing [/editorial-policy](https://roboskin.ai/editorial-policy) remains the policy for attribution, evidence boundaries, automation, independence, and corrections.

## Common eight-field card

Template clarified: 2026-10-13. Use these eight visible fields, in this order, for both world-model and VLA cards and for the future individual pages linked from `/world-models/tracker`. Keep the detailed evidence worksheet below with each record. This compact authoring template does not change the current strict tracker JSON schema.

| Field | Editorial key | Required meaning |
| --- | --- | --- |
| Model name | `model_name` | Source-published model and variant; retain its stable ID separately. |
| Organization | `organizations` | Source-attributed institutions or organizations; do not infer ownership from an author's current employer. |
| Paper link | `paper_url` | Primary paper URL, preferably with the inspected version; `null` plus a reason if no paper is verified. |
| Code link | `code_url` | Verified official implementation URL and release status; `null` plus a reason if unknown or unreleased. A project homepage is not a code release. |
| Datasets | `datasets` | Named training and evaluation datasets, their roles/versions and source URLs; an empty array means not yet documented, not “trained without data.” |
| Input modalities | `input_modalities` | Actual inference inputs; keep training-only supervision and predicted outputs in separate evidence fields. In particular, tracker `predicts` must never be reused as inputs. |
| Year | `year` | Four-digit year derived from the first paper submission/publication date, with `year_basis` and source date retained. If there is no paper, use a sourced model announcement and label that basis. Never use the ingestion or review year. |
| One-sentence summary | `one_sentence_summary` | One original, source-backed sentence stating the model's role, inputs and output or task boundary. No unsupported superlatives or cross-benchmark ranking. |

Blank worksheet (placeholders are not model facts):

```yaml
model_name: "<published name and variant>"
organizations: []
paper_url: null
code_url: null
datasets: [] # each item: name, role (training/evaluation), version, source_url
input_modalities: []
year: null
one_sentence_summary: "<one bounded, source-backed sentence>"
```

Retain supporting metadata alongside the worksheet: stable ID, `year_basis`, source date/version, claim-to-source references, source-review date, code/data access status, and reasons for unknown values. Display unknowns as “Not verified” or the more precise documented status; do not silently omit the visible field. For current records, map name/organizations to identity fields, paper/code to typed source links and artifact records, datasets to training/evaluation evidence, year to the correctly scoped source date, and the summary to a source-checked editorial description. When the current contract lacks a dedicated input-modality or summary field, retain it in the authoring worksheet until the P1 schema migration rather than overloading `predicts` or an evidence-rating `verdict`.

## Existing data contracts

Preserve stable IDs and public URLs. Use the current types and validators when editing production data; do not paste the full authoring template below into a strict runtime record.

| Current source | Purpose and relevant fields |
| --- | --- |
| `src/lib/robot-ai-models.ts` — `RobotAiModelEntry` | Shared model directory and VLA subset: `id`, `name`, `organization`, `creatorOrganizations`, `releaseDate`, `category`, `inputModalities`, `outputType`, `embodiments`, `trainingDataSummary`, `realRobotEvaluation`, `availability`, `license`, `paperUrl`, `projectUrl`, optional `researchUrl`, `tactileInput`, `evidenceLimitations`, `primarySources`, `sourceReviewed`. |
| `src/lib/robot-world-models.ts` — `RobotWorldModelEvidenceEntry` | Detailed world-model comparisons: `predictionTarget`, `actionConditioning`, `operationalRole`, `robotSensorTaskBoundary`, `realRobotEvidence`, separate `artifacts` summaries, `evidenceStatus`, `limitations`, `internalEvidencePath`, `primarySources`, and `sourceReviewed`, alongside identity and release date. |
| `src/lib/world-model-tracker.types.ts` — `TrackerEntry` | Dated tracker: `paperTitle`, `sourceUrl`, `institutions`, predicted output modalities in `predicts`, `tactileSensor`, `robotPlatform`, `realRobotEval`, `openSource`, `evidenceLevel`, `verdict`, `briefUrl`, `sources`, `lastVerified`, and `authorCheck`, alongside identity and first submission date. `src/lib/world-model-tracker-validation.mjs` enforces the current exact keys. |
| `src/lib/tactile-vla-evidence.ts` — `TactileVlaEvidenceEntry` | Integration record keyed by `modelId`: `integrationRole`, `touchPath`, `actionPath`, `evaluationBoundary`, `metricDefinition`, `artifactBoundary`, `evidenceBoundary`, `sourceUrls`, and `sourceReviewed`. |

Family, version, state representation, individual license provenance, and detailed evaluation conditions are not standalone properties in every existing contract. Record them in the corresponding supported description and a source-audit note until a separately reviewed schema change introduces structured fields. Never invent values to satisfy the template.

## Required editorial fields

Each question needs a sourced answer or an explicit uncertainty statement. “Unknown,” “not disclosed in the reviewed source,” “not verified,” and “not applicable” have different meanings. Identify which applies. Omission from a paper does not prove absence from a system.

| Field group | Required content and boundary | Current storage |
| --- | --- | --- |
| Stable identity | Existing `id`, published name, aliases when relevant, and owning organizations. Reuse the same identity across index, evidence card, and research brief. Distinguish similarly named systems. | `id` / `modelId`, `name`, `organization`, `creatorOrganizations`, `institutions`; source-audit note for aliases. |
| Family and category | State whether the record describes a VLA, world model, policy, representation encoder, reward model, or another supported category. Name a family or parent checkpoint only when documented. A shared family does not establish identical inputs, outputs, or performance. | `category`; supported role descriptions and source-audit note for family. |
| Model and source version | Identify the evaluated model variant or checkpoint separately from paper revision, project release, and repository commit. Pin a DOI, arXiv version, release tag, or commit where it is available and relevant. If the deployed checkpoint is unspecified, say so. | Source labels/URLs and availability or evidence descriptions; source-audit note. |
| Dates | Separate first publication or submission, model/artifact release, reviewed source version, source-review date, and material page modification. For `TrackerEntry.releaseDate`, use the first paper submission date, not ingestion or latest revision. Other release fields must retain the meaning stated by their source. | `releaseDate`, `sourceReviewed` / `lastVerified`; article modification/revision record and source-audit note. |
| Source provenance | Primary URL, source type, title/label, version inspected, relevant section/table/figure/file, review date, and the exact claim supported. Distinguish official announcements from measured paper results. Record source disagreements rather than silently combining versions. | `primarySources`, `sources`, `sourceUrl`, `paperUrl`, `projectUrl`, `sourceUrls`; detailed source-audit note. |
| Input modalities | List actual inference observations, language or task input, and temporal context. Separate live touch from tactile supervision, latent features, and predicted touch. Use `tactileInput: 'unclear'` when evidence is insufficient; an absent mention alone is not a confident `no`. | `inputModalities`, `tactileInput`, `touchPath`, conditioning descriptions. |
| State representation | Specify observed robot state, coordinates, units, history window, and encoded or latent state when documented. Separate measured state from predicted state; do not infer unreported dimensions or rates. | Input, prediction, conditioning, and action-path descriptions. |
| Action representation | Identify generated action type, coordinate/control space, units, chunk length, frequency, and controller handoff when reported. Separate model-only inference rate from end-to-end control rate. Record whether actions are inputs, outputs, both, or absent. | `outputType`, `actionConditioning.description`, `actionPath`, `operationalRole`. |
| Prediction target | State what is forecast: future observations, contact, tactile state, latent representation, reward, or another documented quantity. Include horizon and conditioning where known. `TrackerEntry.predicts` contains output modalities only, never a list of all inputs. | `predictionTarget`, `predicts`, `touchPath`. |
| Planning or policy role | Explain how a prediction is used: candidate evaluation, subgoal generation, joint action generation, policy conditioning, residual correction, or another source-supported role. Distinguish training-only objectives from deployed branches. | `operationalRole`, `actionConditioning.kind`, `integrationRole`, `actionPath`. |
| Embodiment | Actual robot, arm, hand/gripper, sensor configuration, controller, and tasks tested; distinguish training embodiments from evaluation embodiments. “Humanoid” or “multi-robot” is not sufficient hardware detail when the source provides more. | `embodiments`, `robotSensorTaskBoundary`, `robotPlatform`, `tactileSensor`, evaluation descriptions. |
| Training and evaluation data | Dataset names and versions, provenance, reported mixture or amount, task/episode/frame units, splits, and access conditions. Keep demonstrations, simulator samples, and evaluation rollouts separate. Do not infer a complete corpus from a small public sample. | `trainingDataSummary`, `artifacts.data`, `openSource.data`, evaluation descriptions. |
| Code | Official implementation URL and revision, release status, available components, and what was inspected or run. A project website or placeholder repository does not establish runnable training or inference code. | `artifacts.code`, `openSource.code`, `availability`, sources. |
| Weights | Checkpoint URL/version, model variant, access status, and verified scope. An API or waitlist is not a downloadable checkpoint. A weight file does not establish reproducibility without the matching implementation and configuration. | `artifacts.weights`, `openSource.weights`, `availability`. |
| Licenses | Record code, weights, and data terms separately, each with its source and scope. Identify gated or service terms where relevant. A paper license is not an artifact license; public access is not unrestricted permission to reuse. | `license`, `artifacts.license`, `openSource.license`, source-audit note for individual artifact terms. |
| Evaluation conditions | Source-reported versus independently run; physical versus simulated; tasks, objects, hardware, data split, trials per model-task-condition, baselines, intervention/reset policy, metric definition, aggregation, and uncertainty when reported. Unknown splits or counts remain unknown. | `realRobotEvaluation`, `realRobotEvidence`, `realRobotEval`, `evaluationBoundary`, `metricDefinition`, source-audit note. |
| Limitations | Unreported details, task/hardware/data boundaries, unavailable artifacts, failed or unperformed checks, conflicting evidence, and unsupported transfer or deployment claims. Do not turn non-disclosure into a measured failure. | `evidenceLimitations`, `limitations`, `evidenceBoundary`, `artifactBoundary`, `verdict`. |
| Status | Separate editorial review status, artifact release status, evidence class, and author-contact status. A reviewed record is not an endorsed or independently reproduced model. | `evidenceStatus`, `evidenceLevel`, `openSource`, `authorCheck`; editorial draft state in source-audit note. |

## Status interpretation

- Tracker artifact fields use `released`, `announced`, `none`, or `unknown`, independently for code, weights, and data. Use `none` only for an explicit unreleased/no-release finding within the reviewed scope; failure to locate an artifact is `unknown`. State the check date and scope.
- Tracker evidence level **A** means source-reported real-robot evaluation plus released code; **B** means real-robot evaluation plus explicitly unreleased code; **C** means simulation-only evidence; **D** means insufficient evidence for A/B/C, including unknown code status. These are availability labels, not quality grades, independent replications, or guarantees that the code reproduces the paper.
- `authorCheck` starts at `not-contacted`. Use `contacted`, `confirmed`, or `corrected` only with an actual correspondence record supporting that status. A public source review is not author confirmation.
- Preserve the world-model conditioning distinctions: `candidate-conditioned`, `joint-generation`, and `subtask-conditioned`. A subtask-conditioned predictor must not be described as comparing candidate action sequences unless the source establishes that behavior.
- A zero score, an unperformed evaluation, and an undisclosed result are separate cases. Use `null` where the existing runtime type permits it; otherwise use explicit evidence-boundary text. Never insert a fabricated number or date.

## Authoring template

The following is a blank editorial worksheet, not a real model, production JSON, or a factual example. Angle-bracket values are instructions; `null` means unfilled in this draft. Replace each with verified evidence or a precise uncertainty statement before publication, then map the worksheet into the existing runtime fields above. Do not add these keys to strict tracker JSON without an approved schema change.

```yaml
identity:
  id: "<existing stable ID, or justified new ID>"
  name: "<source-published name>"
  aliases: []
  family: null
  category: "<supported category based on model role>"
  organizations: []
versions:
  model_variant: null
  checkpoint: null
  paper_version: null
  repository_commit_or_tag: null
dates:
  first_publication: null
  artifact_release: null
  source_reviewed: null
  material_page_revision: null
provenance:
  - source_url: "<primary source URL>"
    source_type: "<paper / project / model card / official release / code>"
    source_title: "<exact source title>"
    source_version: null
    claim_supported: "<bounded claim>"
    locator: "<section, table, figure, or file>"
    reviewed_on: null
interface:
  inference_modalities: []
  training_only_modalities: []
  observed_robot_state: null
  state_coordinates_units_and_history: null
  action_input: null
  action_output: null
  action_chunk_and_control_rate: null
  prediction_target: null
  prediction_horizon: null
  action_conditioning: null
  planning_or_policy_role: null
  live_tactile_feedback: "<yes / no / unclear, with source boundary>"
embodiment:
  training_platforms: []
  evaluation_platforms: []
  sensors_and_controllers: []
data:
  training_sources_and_versions: []
  reported_amount_and_units: null
  evaluation_split: null
  provenance_limits: null
artifacts:
  code: { status: unknown, url: null, version: null, inspection: null }
  weights: { status: unknown, url: null, version: null, inspection: null }
  data: { status: unknown, url: null, version: null, inspection: null }
licenses:
  code: { terms: null, source_url: null, scope: null }
  weights: { terms: null, source_url: null, scope: null }
  data: { terms: null, source_url: null, scope: null }
evaluation:
  evidence_activity: "<source review / artifact inspection / execution / physical experiment>"
  reported_by: null
  physical_or_simulated: null
  tasks_and_conditions: []
  trials_per_model_task_condition: null
  baselines: []
  metric_definition: null
  aggregation: null
  intervention_and_reset_policy: null
  uncertainty: null
  result_and_source_locator: null
limitations:
  known_boundaries: []
  undisclosed_details: []
  unperformed_checks: []
status:
  editorial_state: draft
  evidence_class: "<existing classification, if applicable; justify from evidence>"
  author_check: not-contacted
revision_note: null
```

For a VLA, explicitly describe the observation/language → representation/planning → action interface and any separate tactile controller. Mark future-state prediction “not applicable” if that role is absent and the source supports the distinction. For a world model, explicitly describe the conditioning → future-state prediction → downstream action or planning path; do not assume it directly controls the robot.

## Publication and correction checks

1. Verify identity, dates, source version, and relevant citations. Keep prior stable URLs and match the card to its existing internal evidence path.
2. Verify that the visible card and structured data describe the same record. Model category and tactile status must follow the documented interface, not a title keyword alone.
3. Keep source-reported results, our interpretation, inspected artifacts, executed code, and physical testing separate. A successful website build verifies publication behavior, not scientific results.
4. Compare metrics only within compatible tasks and conditions. Preserve fixed-model results; do not merge each task’s best checkpoint into a fictional single-model score.
5. Check code, weights, data, and each license independently. Retain unknowns and record the limits of the check.
6. A material factual correction updates the affected article’s modified date and revision note and the relevant record’s review evidence. Typographic or navigation edits do not reset scientific publication or source-review dates. Update a source-review date only when a source check occurred.
7. Preserve a claim-to-source trail for corrections: affected URL/record, old claim, revised claim, primary evidence/version/locator, actual check date, and affected projections or pages. Contact requests use `/contact?requestType=research`; do not invent correspondence or reviewer approval.

## Basis of this standard

This standard was prepared from the repository’s README; the existing `src/app/editorial-policy/page.tsx` sections on source boundaries, evidence types, corrections, automation, and independence; the four model/evidence contracts listed above; and the tracker validator. It introduces no new model facts, external source-review dates, experimental results, or author confirmations. External model facts still require their own primary-source review when a record is added or substantively changed.
