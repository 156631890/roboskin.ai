export const tactileVlaIntegrationRoles = [
  'bounded residual modulation',
  'online tactile prediction refinement',
  'future-visual supervised tactile fusion',
  'predictive tactile residual control',
  'multi-rate tactile action refinement',
  'dual-level planning and action refinement',
] as const;

export type TactileVlaIntegrationRole = (typeof tactileVlaIntegrationRoles)[number];

export type TactileVlaEvidenceEntry = {
  modelId: string;
  integrationRole: TactileVlaIntegrationRole;
  touchPath: string;
  actionPath: string;
  evaluationBoundary: string;
  metricDefinition: string;
  artifactBoundary: string;
  evidenceBoundary: string;
  sourceUrls: string[];
  sourceReviewed: string;
};

export const tactileVlaEvidenceEntries: TactileVlaEvidenceEntry[] = [
  {
    modelId: 'vitar',
    integrationRole: 'bounded residual modulation',
    touchPath: 'A marker-derived contact descriptor helps choose whether to retain the frozen VLA action or select a structured residual; a bilateral tactile summary scales the chosen residual with a gain in [0, 1].',
    actionPath: 'Frozen OpenVLA-OFT chunk → retain or select one bounded 7D residual direction → apply the same scaled residual across the chunk. Touch cannot invent a new base direction or alter the candidate set.',
    evaluationBoundary: 'Seven UniVTAC tasks use 100 episodes per method-task pair; three physical RM65-B tasks use 20 trials per method-task pair.',
    metricDefinition: 'End-to-end binary task success. The reported 61.3% UniVTAC and 48.3% physical averages come from different cohorts and are not combined.',
    artifactBoundary: 'Paper and project page public; official page says code is coming soon. No runnable model, weights, EGM or RAM checkpoints, or exact branch corpus verified.',
    evidenceBoundary: 'Author-reported v1 preprint evidence. Imported, adapted, and newly evaluated baselines do not establish equal upstream data, seed, or interaction budgets; physical evidence is limited to one configuration and three tasks.',
    sourceUrls: ['https://arxiv.org/abs/2608.15816', 'https://icr-lab.github.io/ViTaR/'],
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'retouch',
    integrationRole: 'online tactile prediction refinement',
    touchPath: 'A finger- and patch-aware encoder processes the current tactile frame plus the preceding nine frames, forming a ten-frame input window of dense five-finger force taxels. The deployed Foresight Action Expert recursively refreshes predicted tactile latents as new touch arrives.',
    actionPath: 'Cached 9 Hz visual-language context → 36 Hz model-only Foresight Action Expert passes → regenerate the unexecuted suffix of a 16-step absolute joint-position chunk at offsets 4, 8, and 12.',
    evaluationBoundary: 'Seven standard tasks and four separate challenge settings use 20 real-robot rollouts per method-task or method-setting on one XHand–UR7e platform.',
    metricDefinition: 'A normalized task score. Only Button Press is binary; the other six standard tasks award weighted partial credit, so the reported 83.6% macro-average is not a full-completion rate.',
    artifactBoundary: 'Paper only. No official implementation, checkpoint, XHT-Dataset download, split manifest, evaluation log, or artifact license verified.',
    evidenceBoundary: 'Author-reported results with one on-site evaluator and no confidence intervals or independent replication. The 9 Hz and 36 Hz values are RTX 5090 model-only rates that exclude communication and controller scheduling.',
    sourceUrls: ['https://arxiv.org/abs/2608.01824'],
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'tau-touch-augmented-vla',
    integrationRole: 'future-visual supervised tactile fusion',
    touchPath: 'Bilateral vision-based tactile deformation is encoded and fused into a pretrained π0.5 policy. During training, current touch and subsequent actions predict future visual-feature change; that auxiliary JEPA-style branch is removed at inference.',
    actionPath: 'Multi-view RGB + language + proprioception + live bilateral touch → fused VLA representation → flow-matched future action chunk. Live touch remains an inference input even though the predictive supervision branch is removed.',
    evaluationBoundary: 'Four physical tasks use 20 trials per fixed model-task pair on one Franka Research 3 and bilateral DM-Tac WS configuration.',
    metricDefinition: 'Stage and full-task success. The best fixed variant by reported mean is τ-Wrist at 71.25%; a textual list mixing best task values from different variants is not treated as one checkpoint result.',
    artifactBoundary: 'Paper and project page public; code is labeled coming soon and links to a separate placeholder. No τ implementation, weights, TacAura download, or reuse license verified.',
    evidenceBoundary: 'Author-run preprint evidence with tactile baselines adapted to the local sensor setup. No cross-robot or cross-sensor transfer is tested, and “no deployment overhead” applies only to the removed auxiliary branch.',
    sourceUrls: ['https://arxiv.org/abs/2607.24485', 'https://cocacola-lab.github.io/tau-Page/'],
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'unitacvla',
    integrationRole: 'predictive tactile residual control',
    touchPath: 'Unified tactile tokens receive semantic contact-state supervision and coarse-to-fine future tactile prediction. Current and predicted tactile latents both condition a separate action-tactile mixed controller.',
    actionPath: 'π0.5 low-frequency action chunk → predicted tactile prior + current touch + robot-state update → bounded high-frequency residual correction. The paper does not disclose either rate or the action dimension.',
    evaluationBoundary: 'Eight physical subtasks are each tested in clean and perturbed settings with 50 trials per subtask-setting on one RM75B configuration.',
    metricDefinition: 'Per-subtask binary success rates. The paper table does not print an aggregate mean, so RoboSkin does not label a calculated overall average as author-reported.',
    artifactBoundary: 'Paper public; official repository is a one-line coming-soon project placeholder with no code, checkpoints, dataset, release, tag, or license.',
    evidenceBoundary: 'Author-reported v1 evidence on one custom gripper and sensor pair. Exact trajectory count, tactile resolution, action interface, control rates, severe-occlusion evidence, public data, and independent reproduction are unavailable.',
    sourceUrls: ['https://arxiv.org/abs/2606.31723', 'https://github.com/ZhangXD-666/UniTacVLA'],
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 't-rex',
    integrationRole: 'multi-rate tactile action refinement',
    touchPath: 'Ten fingertip deformation streams and derived wrench estimates provide a fast tactile-reactive path alongside head and wrist video, language, and robot state.',
    actionPath: 'Approximately 5 Hz slow VLA action generation → approximately 20 Hz tactile refinement → bimanual action chunks for a fixed Dexmate Vega-1 and dual Sharpa Wave configuration.',
    evaluationBoundary: 'Twelve contact-rich tasks use 16 randomized rollouts per task on one fixed-base bimanual platform.',
    metricDefinition: 'Source-defined progress or success rubrics with a reported 65% macro-average. This protocol is not a shared leaderboard with the other tactile VLA records.',
    artifactBoundary: 'MIT repository, checkpoints, training and inference code, and an approximately 50-hour public LeRobot subset are available; the public subset is not the complete reported 100-hour corpus.',
    evidenceBoundary: 'Developer-run preprint evidence on one platform. No independent reproduction or cross-platform evaluation is verified, and the released data boundary must remain separate from the full training-corpus claim.',
    sourceUrls: ['https://arxiv.org/abs/2606.17055', 'https://github.com/ZhuoyangLiu2005/T-Rex'],
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'vla-touch',
    integrationRole: 'dual-level planning and action refinement',
    touchPath: 'At the planning level, Octopi and marker tracking turn GelSight observations into linguistic tactile evidence for GPT-4o. At the execution level, marker-tracked touch conditions an interpolant controller around a non-tactile RDT-1B policy.',
    actionPath: 'Tactile-informed primitive instruction → RDT-1B 64-step source chunk → DINOv2, robot state, and tactile-conditioned interpolant refinement of the action chunk.',
    evaluationBoundary: 'Cup, Wipe, and Peel each use 20 end-to-end trials on one Franka Panda, Robotiq 2F-140, and unilateral GelSight Mini setup.',
    metricDefinition: 'Binary end-to-end counts for the complete system: 9/20 Cup, 12/20 Wipe, and 7/20 Peel. Separate planning and manipulation component tables are not merged into those counts.',
    artifactBoundary: 'MIT repository with partial controller and Octopi code plus linked data and controller checkpoints. Dataset and hosted checkpoint licenses are not verified, and the modified RDT inference implementation remains unreleased.',
    evidenceBoundary: 'A modular wrapper rather than a tactile-native foundation VLA. Evidence is task- and hardware-specific; it does not establish cross-task, cross-robot, or cross-sensor generalization or a complete reproducible deployment path.',
    sourceUrls: ['https://arxiv.org/abs/2507.17294', 'https://github.com/jxbi1010/VLA-Touch'],
    sourceReviewed: '2026-08-22',
  },
];

const seenModelIds = new Set<string>();

for (const entry of tactileVlaEvidenceEntries) {
  if (seenModelIds.has(entry.modelId)) {
    throw new Error(`Duplicate tactile VLA evidence record: ${entry.modelId}`);
  }
  seenModelIds.add(entry.modelId);
}
