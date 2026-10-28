import type { SeoTopicPage } from '@/content/seo-topic-pages';
import selection from '../../public/resources/robot-data/v2026.10.28/selection-matrix.json';

type Section = SeoTopicPage['sections'][number];
const resource = '/resources/robot-data/v2026.10.28';
const droidRevision = 'https://github.com/droid-dataset/droid_policy_learning/blob/9a29c832b4c81bf38401111f5e4cdddaca217581';

export const robotDatasetStartingPoints: Section = {
  id: 'robot-data-starting-points',
  heading: 'Choose a dataset starting point for your task',
  body: [
    'For a cross-embodiment mixture, start with Open X-Embodiment; for varied scenes on a common Franka platform, inspect DROID; for WidowX manipulation, inspect BridgeData V2. Use the small LeRobot exercise to learn the storage contract, or the UniVTAC example to inspect simulated tactile context. These are different routes, not a ranking of interchangeable datasets.',
    'The five-entry shortlist below was source-checked on October 28, 2026. “Use when” and “first check” are RoboSkin selection guidance. Upstream descriptions remain attributed; only the specifically identified local exercises were run. Follow the original release for data and rights.',
  ],
  table: {
    headers: ['Starting point', 'Use when', 'Input boundary', 'First check'],
    rows: selection.records.map(row => [row.name, row.use_when, row.signals_and_actions, row.first_check]),
  },
  subsections: selection.records.map(row => ({
    heading: `${row.name}: access and evidence`,
    body: [row.format, row.rights, row.evidence, `Reconsider this route if: ${row.stop_if}`],
    links: [{ label: 'Original access route', href: row.access_url }, ...row.sources.filter(source => source.url !== row.access_url).map(source => ({ label: source.label, href: source.url }))],
  })),
  links: [
    { label: 'Download the five-entry selection matrix (CSV)', href: `${resource}/selection-matrix.csv`, download: true },
    { label: 'Read the versioned matrix with per-entry sources (JSON)', href: `${resource}/selection-matrix.json` },
    { label: 'For a broader source inventory, open the robotics dataset directory', href: '/robotics-datasets' },
    { label: 'For physical tactile data, compare the specialized tactile directory', href: '/datasets' },
  ],
};

export const robotDataPreflight: Section = {
  id: 'one-episode-preflight',
  heading: 'Make a decision from one inspected episode',
  body: [
    'Before downloading a full collection, choose one candidate and write down the target task, embodiment and policy interface. Inspect one accessible episode as a screening step. A clean episode can justify a larger sample; it cannot establish that an entire dataset is suitable.',
    'The downloadable decision record separates source claims from your observations and leaves unanswered fields empty. Keep the source revision and evidence location with each decision. Do not turn “not checked” into “absent,” or a file-format pass into training readiness.',
  ],
  table: {
    headers: ['Check', 'Evidence to retain', 'Decision it supports'],
    rows: [
      ['Access and rights', 'Exact release, file path, download result and dataset terms; code/model terms separately.', 'Can this candidate be inspected and reused for the intended purpose?'],
      ['Action target', 'Raw field → transform → training target → controller; units, frame, gripper range and temporal offset.', 'Can the policy consume and execute this target, or is an adapter still missing?'],
      ['Time and observations', 'Episode boundaries, camera/touch keys, valid masks, missing samples and the provenance of each timestamp.', 'Are the selected streams usable for this task? Nominal timestamps do not establish physical synchronization.'],
      ['Coverage and split', 'Objects, scenes, people/sessions, failed attempts, repeated trajectories and holdout grouping.', 'What is represented, and what new evidence is required before a transfer claim?'],
      ['Decision', 'Inspect further, adapt, hold or reject; link the reason to the evidence and name the next check.', 'A recorded selection decision; never a universal quality score.'],
    ],
  },
  links: [
    { label: 'Download the decision and action-contract workbook (ZIP, CSV files)', href: `${resource}/robot-data-decision-kit.zip`, download: true },
    { label: 'Run the existing LeRobot public-episode check', href: '/guides/lerobot-dataset-format#public-episode' },
    { label: 'Inspect the measured-motion versus commanded-action example', href: '/robot-teleoperation#trace-action-targets' },
    { label: 'Inspect the tactile demonstration audit', href: '/guides/tactile-in-context-learning-tactile-eta-vs-gpt-6-astra#published-input-audit' },
  ],
};

export const teleoperationActionTrace: Section = {
  id: 'trace-action-targets',
  heading: 'Trace the action target before collecting or converting data',
  body: [
    'A field named action is not a complete control specification. Trace one record through its producing software and training loader to the intended robot interface. Dimension, units, reference frame, absolute versus incremental meaning, rotation representation and observation-to-action timing all belong in that record.',
    'DROID provides a concrete source-inspected example. Its public schema lists a seven-element action and several action_dict fields. The pinned policy-learning example instead constructs a ten-element target: three Cartesian-position values, six values representing rotation, and one gripper position. It marks these targets absolute and leaves the gripper dimension out of normalization. This is a particular training pipeline, not a claim that every DROID user has the same target.',
  ],
  table: {
    headers: ['Evidence', 'What the inspected material says', 'What to do with it'],
    rows: [
      ['DROID serialized schema', 'Seven-element action; separate commanded Cartesian/joint position and velocity fields, plus observed state.', 'Record the exact raw field. The docs’ short “6x joint velocities” comment is insufficient to specify a controller and is not used here as a verified joint-action contract.'],
      ['DROID pinned transform', 'droid_dataset_transform builds 3 + 6 + 1 values from action_dict.cartesian_position and gripper_position.', 'Pin the transform and normalization. A ten-element rotation representation cannot be sent as ten robot joint commands.'],
      ['DROID pinned loader', 'The example selects two exterior cameras and filters for success trajectories by default. A later transform slices action[1:] within its prepared window.', 'Inspect camera selection, filtering and temporal alignment in the actual training recipe; source inspection alone does not validate a loaded batch.'],
      ['Tactile-ETA released demonstrations', 'Measured end-effector/joint transitions and recorded simulation steps; original actuator/tool commands are marked unavailable.', 'Useful for historical context; do not relabel measured displacement as the original control command.'],
    ],
  },
  subsections: [{
    heading: 'A practical collection checkpoint',
    body: [
      'Before a larger collection session, complete the action-contract sheet and replay a small pilot batch through the intended loader. Retain a visible success, a failure or intervention, and a missing/stale-data case where available. Keep attempts and exclusions in the ledger; do not collect only a polished demonstration video.',
      'Define acceptance thresholds from the target robot and task, then record who checked them and what is still unresolved. This is an engineering planning aid, not a safety certification or a claim that RoboSkin has tested your controller. The DROID findings above are source inspection on October 28, 2026; no DROID training or hardware run was performed.',
    ],
  }],
  links: [
    { label: 'DROID official data schema', href: 'https://droid-dataset.github.io/droid/the-droid-dataset.html' },
    { label: 'Pinned DROID target construction, lines 27–38', href: `${droidRevision}/robomimic/utils/rlds_utils.py#L27-L38` },
    { label: 'Pinned DROID loader and camera/filter settings', href: `${droidRevision}/examples/droid_dataloader.py` },
    { label: 'Tactile-ETA preparation: recorded motion and unavailable commands', href: 'https://github.com/No-518/Tactile-ETA/blob/e7e5efbd42d3be7532ff5eb940a3cb015c2f7818/scripts/univtac/prepare_demonstrations.py' },
    { label: 'Download the action-contract sheet (CSV)', href: `${resource}/action-contract.csv`, download: true },
    { label: 'Download the complete decision kit with instructions', href: `${resource}/robot-data-decision-kit.zip`, download: true },
    { label: 'Choose an existing dataset before scaling new collection', href: '/robot-learning#robot-data-starting-points' },
  ],
};
