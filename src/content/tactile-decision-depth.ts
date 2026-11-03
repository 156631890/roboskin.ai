import type { SeoTopicPage } from '@/content/seo-topic-pages';

type Section = SeoTopicPage['sections'][number];
const forceCalibration = 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6412380/';
const uncertaintyTypes = 'https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-2-classification-components-uncertainty';
const combinedUncertainty = 'https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-5-combined-standard-uncertainty';
const expandedUncertainty = 'https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-6-expanded-uncertainty';
const taco = 'https://arxiv.org/html/2605.21976v1';

export const selectionClaimSection: Section = {
  id: 'compare-measurement-claims',
  heading: 'Compare measurement claims, not headline specifications',
  body: [
    'A useful specification names an output, a reference, a tested operating range and an error measure. Put those four fields beside every candidate. If one supplier reports camera pixels and another reports force error, neither number answers the same question. First translate the task into an observation you can validate; then compare like quantities.',
    'Keep mechanical fit as a hard gate. A better reconstruction cannot recover a contact outside the active surface. Likewise, pressure inferred by dividing force by the full pad area is not a measured local pressure distribution: the actual contact area and load distribution matter. The table is an editorial comparison framework, not a rating of particular products.',
  ],
  table: { headers: ['Claim on the specification sheet', 'Evidence needed for comparison', 'What the claim leaves open'], rows: [
    ['Force range / force error', 'Normal and shear axes, coordinate frame, reference instrument, contact geometry and error across the claimed range.', 'Whether one calibration transfers to edges, different probes or a replacement pad.'],
    ['Taxel pitch / image resolution', 'Physical sampling layout separately from held-out contact localization or shape error.', 'Whether two nearby contacts can be distinguished; a larger output image is not an independent measurement.'],
    ['Refresh rate / frame rate', 'Which channels are updated, their sample times, delivery gaps and the age of data used by the controller.', 'Whole-array updates, reconstruction delay and contact-to-action response.'],
    ['Slip detection', 'An independent slip label, event definition, detection lead time, missed events and false alarms.', 'Whether the tested controller can recover before loss without damaging the object.'],
    ['Repeatability / durability', 'Repeated contact protocol, loading history, environmental conditions and checks after replacement or wear.', 'Accuracy against a reference, long-term lifetime and performance on untested objects.'],
  ] },
  links: [
    { label: 'Force, pressure and the measurement interface: PPS technical discussion', href: 'https://pressureprofile.com/calibration-white-paper' },
    { label: 'Taxels, coverage and hand-specific configurations', href: '/applications/robot-hand-tactile-sensor' },
    { label: 'Convert a claimed accuracy into a calibration test', href: '/guides/tactile-sensor-calibration#validation-matrix' },
  ],
};

export const selectionTimingSubsections: NonNullable<Section['subsections']> = [
  { heading: 'Separate sampling, data age and physical response', body: [
    'Record the contact reference event, sensor sample time, host receipt, completed estimate, issued command and observed robot response. State which clocks produced each time and how their offset was established. Subtracting timestamps from unrelated clocks can manufacture a delay. A host timestamp assigned after receipt also cannot recover the original exposure or acquisition time.',
    'Use the whole path to test the deadline; use the intermediate times to diagnose it. A high sample rate with an old queue can deliver frequent but stale observations. Report the distribution of data age and response time, with trial count and missed deadlines, rather than only an average or the reciprocal of frame rate. This logging plan is proposed evaluation work, not a RoboSkin timing measurement.',
  ] },
  { heading: 'Test the failure path, not only a clean recording', body: [
    'Specify what the application should do when a sample is late, missing, saturated or outside the calibrated range. Check whether the driver exposes these states or silently repeats a value. Evaluate the proposed behavior in an authorized test setup before connecting it to consequential actions. Increasing grip force is not a universal fallback for an uncertain contact.',
    'Costanzo and colleagues illustrate why the interface belongs in the evidence: their particular tactile sensor has different sampling limits through the gripper electronics and a direct PC connection. That is not a rate specification for DIGIT, GelSight or your controller. Ask for timing with your intended connection, processing and load.',
  ], links: [{ label: 'Costanzo et al., sensor integration and acquisition paths, section 2.5', href: forceCalibration }] },
];

export const selectionTrialSubsections: NonNullable<Section['subsections']> = [
  { heading: 'Separate hard gates from preferences', body: [
    'A candidate that cannot cover the required contact, expose the required quantity or meet a verified response constraint should not win because it scores well on price or pixel count. Mark each critical requirement pass, fail or unknown before weighting preferences. Unknown is a request for evidence, not an assumed pass and not a numerical zero that can be averaged away.',
    'Record a threshold, measurement protocol, responsible reviewer and evidence file for each gate. Only compare noncritical preferences after those gates are satisfied. Retain the reason for exclusions so a later hardware or software revision can be reassessed without repeating the entire search.',
  ] },
  { heading: 'Compare complete systems while exposing confounders', body: [
    'Replacing a fingertip can change friction, compliance and contact geometry as well as sensing. Where feasible, compare the same mounted sensor with its tactile input enabled and disabled to isolate the value of feedback. A separate comparison between complete sensor assemblies answers an integration question; it cannot attribute every improvement to sensing alone.',
    'TacO trains sensor-specific policies and reports task-dependent outcomes. Use it as evidence that the task and representation matter, not as a universal hardware ranking. Record controller changes, training effort and tuning budget alongside hardware. A stronger policy or a different surface can otherwise be mistaken for a better measurement.',
  ], links: [{ label: 'TacO: task, representation and material effects in the authors’ experiments', href: taco }] },
];

export const selectionDecisionSection: Section = {
  id: 'worked-shortlist-decisions', heading: 'Two examples of a defensible shortlist decision',
  body: ['These are hypothetical review scenarios, not customer cases or hardware results. They show how the same attractive specification can support one decision while leaving another unresolved.'],
  subsections: [
    { heading: 'Fragile picking: good contact images, missing recovery evidence', body: [
      'Suppose a candidate produces detailed contact images but has no independently checked slip labels, response-time record or damage evaluation. Keep it as a perception candidate; do not approve a fragile-picking claim. The next useful evidence is a bounded set of slips and non-slips with synchronized observations and action records, followed by a separate recovery comparison. Count damaged objects and human interventions even when the final placement succeeds.',
      'The rejection condition is specific: if the system detects the event only after the recovery window, better-looking images do not resolve the task. Revisit the processing path or task design before buying more sensing area.',
    ] },
    { heading: 'Insertion: a force model calibrated on the wrong contacts', body: [
      'Suppose a force model was validated under central normal loading, but insertion produces edge contacts and tangential loads. Treat those conditions as outside the demonstrated calibration. Require suitable axis references and held-out edge/contact-direction checks before using the output as a force estimate. An aggregate low error from central contacts cannot approve this use.',
      'If the hardware can observe useful misalignment cues without calibrated force, describe that narrower use honestly and evaluate it as such. Keep independent load limits and the task’s stop conditions separate from the learned cue. A source-based research brief can clarify evidence gaps; it cannot replace this physical acceptance work.',
    ] },
  ],
  links: [
    { label: 'Download a blank acceptance decision record (CSV)', href: '/tutorials/tactile-selection/acceptance-record.csv', download: true },
    { label: 'Read the acceptance-record field instructions', href: '/tutorials/tactile-selection/acceptance-record.md', download: true },
    { label: 'Read task-level benchmark conditions', href: '/guides/tactile-sensor-benchmark-robot-manipulation' },
    { label: 'Scope a source-backed sensor decision brief', href: '/research-services' },
  ],
};

export const calibrationValidationSection: Section & { id: string } = {
  id: 'validation-matrix', heading: 'Design the validation split around the claim',
  body: [
    'A calibration fit answers whether a model explains its calibration examples. Validation asks whether it works on the contacts you intend to use. Choose the deployment claim first, then reserve entire physical contacts and sessions for evaluation. Splitting neighboring frames from one indentation between training and test sets can make the test much easier than a new contact.',
    'The matrix below is a proposed test design. Change one factor at a time to diagnose a failure, then test relevant combinations to assess the installed system. Keep the held-out partition unchanged while selecting the model. If a failed evaluation is used to tune the model, create a fresh evaluation set before claiming transfer.',
  ],
  table: { headers: ['Proposed claim', 'Hold out or vary', 'What to report separately'], rows: [
    ['New contacts on the same mounted sensor', 'Whole contacts and acquisition sessions, including repeated unloaded baselines.', 'Contact count, session count, invalid samples and residuals by location.'],
    ['Performance across the sensing surface', 'Unseen positions including edges; independently specified reference geometry.', 'Spatial error map and contact-region errors, not only an image-wide average.'],
    ['Different object geometry or loading direction', 'Probe/object geometries, orientations and normal/shear load combinations.', 'Within-range versus out-of-range results; normal and shear errors in their defined axes.'],
    ['Stable behavior during a held contact', 'Dwell duration, loading/unloading phase and relevant temperature conditions.', 'Change at constant reference load, baseline drift and history dependence.'],
    ['Transfer after remounting or pad replacement', 'A separate installation or surface identity with its own reference checks.', 'Before/after results and whether the old calibration, a new offset or a refit was used.'],
  ] },
  links: [
    { label: '3D Cal: spatial sampling and evaluation on unseen objects', href: 'https://arxiv.org/html/2511.03078v1' },
    { label: 'Download the blank validation-plan worksheet (CSV)', href: '/tutorials/tactile-calibration/validation-plan.csv', download: true },
  ],
};

export const calibrationEvaluationSubsections: NonNullable<Section['subsections']> = [
  { heading: 'Read bias, spread and failure rate together', body: [
    'Illustrative arithmetic, not sensor measurements: residuals of −0.4, −0.4, +0.4 and +0.4 N have zero mean bias but MAE and RMSE of 0.4 N. A mean near zero can hide substantial errors of opposite sign. Also inspect errors by load, position and loading phase; a single overall metric can hide the condition that matters most.',
    'Report how many attempted contacts produced valid estimates and why the rest were excluded. Percentiles need their sample count and aggregation rule: a per-frame percentile weights long recordings more heavily than a per-contact summary. Neither a small observed maximum nor a high percentile proves a worst-case bound for future contacts.',
  ] },
  { heading: 'Do not confuse residual error with measurement uncertainty', body: [
    'A residual compares two estimates: the sensor output and its reference. A small residual is not proof that either is close to the unknown true value. Record uncertainty in the reference load or geometry, positioning and alignment, synchronization and relevant environmental effects. Repeatability alone does not include every contribution.',
    'NIST TN 1297 classifies uncertainty components by how they are evaluated: statistical analysis or other evidence. These categories are not synonyms for random and systematic error. For an uncertainty budget, define the measurement model and express each contribution in compatible output units through its sensitivity. Correlations matter; do not simply add a reference certificate value, an MAE and a repeatability number.',
    'Record the coverage factor and assumptions when using expanded uncertainty. A reported interval is not automatically a universal 95% guarantee. If uncertainty is too large to distinguish the intended acceptance limit, keep that decision unresolved or improve the reference and procedure. This guide does not issue a calibration certificate.',
  ], links: [
    { label: 'NIST TN 1297: uncertainty components and evaluation methods', href: uncertaintyTypes },
    { label: 'NIST TN 1297: combining components with a measurement model', href: combinedUncertainty },
    { label: 'NIST TN 1297: expanded uncertainty and coverage assumptions', href: expandedUncertainty },
  ] },
  { heading: 'Distinguish hysteresis, creep and drift before refitting', body: [
    'Compare loading and unloading at matched reference values to inspect hysteresis. Under constant load, track deformation to inspect creep; under constant deformation, track force to inspect relaxation. Repeat an unloaded or known-reference check over the session to inspect drift. Keep loading rate, dwell time and previous contacts in the record so these effects are not collapsed into unexplained noise.',
    'Costanzo and colleagues document material hysteresis and a nonlinear force–deformation relationship in their particular optical taxel design. This supports checking loading history; its numerical results cannot be assigned to DIGIT or GelSight Mini. A model trained only on increasing normal loads still needs independent evidence for unloading and tangential contact.',
  ], links: [{ label: 'Costanzo et al.: pad mechanics, hysteresis and calibration', href: forceCalibration }] },
];

export const calibrationReleaseSection: Section & { id: string } = {
  id: 'calibration-release-decision', heading: 'When should a calibration be reused, checked or refitted?',
  body: [
    'Treat a calibration as a versioned relationship between a particular sensor configuration and a stated operating envelope. A replacement pad is not automatically equivalent to the old pad, and a successful file load is not a transfer test. Use the following decision record after a maintenance or software change; it proposes a workflow rather than a universal recalibration schedule.',
  ],
  table: { headers: ['Observed situation', 'Decision to evaluate', 'Evidence to retain'], rows: [
    ['Configuration unchanged; reference checks meet predefined criteria', 'Reuse within the validated envelope, with planned monitoring.', 'Calibration ID, baseline and reference results, criteria and reviewer.'],
    ['Offset changes, but sensitivity and geometry are not yet checked', 'Investigate; do not assume that zeroing restores the whole mapping.', 'Before/after zero, known-load or geometry checks and change history.'],
    ['New gel, mount, crop, illumination or reconstruction revision', 'Validate transfer; refit if the mapping fails the intended criteria.', 'Exact configuration differences, held-out results and retained prior calibration.'],
    ['Unstable reference, untraceable labels or untested load direction', 'Hold the affected measurement claim until the missing evidence is resolved.', 'Failure examples, unknowns and the next discriminating measurement.'],
  ] },
  subsections: [{ heading: 'Write the release statement so another engineer can challenge it', body: [
    'Use a bounded statement: calibration ID; sensor and surface identity; target quantity and unit; tested area, load and environmental conditions; validation contacts and sessions; residual metrics and invalid rate; reference uncertainty; known exclusions; reviewer and date. Leave unknown fields blank or explicitly unknown. Do not substitute a broad label such as “robot ready” for those conditions.',
    'Finally, evaluate the robot task separately. A geometry reconstruction can pass its reference checks while a grasp policy still fails. Keep calibration acceptance, controller performance and any safety assessment as separate records. The purpose is to make the next engineering decision defensible, not to turn a calibration error into a universal manipulation-success claim.',
  ] }],
  links: [
    { label: 'Turn calibration evidence into a sensor shortlist', href: '/guides/how-to-choose-a-tactile-sensor#acceptance-trial' },
    { label: 'Discuss a source-backed evaluation brief; hardware testing is outside the service', href: '/research-services' },
  ],
};

export const decisionDepthSources = [
  { label: 'Costanzo et al. (2019): force/tactile sensor design and calibration — reviewed November 3, 2026', href: forceCalibration },
  { label: 'NIST TN 1297: classification of uncertainty components — reviewed November 3, 2026', href: uncertaintyTypes },
  { label: 'NIST TN 1297: combined standard uncertainty — reviewed November 3, 2026', href: combinedUncertainty },
  { label: 'NIST TN 1297: expanded uncertainty — reviewed November 3, 2026', href: expandedUncertainty },
];
