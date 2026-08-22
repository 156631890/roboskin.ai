export const robotWorldModelConditioningKinds = [
  'candidate-conditioned',
  'joint-generation',
  'subtask-conditioned',
] as const;

export type RobotWorldModelConditioningKind = (typeof robotWorldModelConditioningKinds)[number];

export type RobotWorldModelPrimarySource = {
  label: string;
  url: string;
  type: 'paper' | 'project' | 'code';
};

export type RobotWorldModelEvidenceEntry = {
  id: string;
  name: string;
  releaseDate: string;
  predictionTarget: string;
  actionConditioning: {
    kind: RobotWorldModelConditioningKind;
    description: string;
  };
  operationalRole: string;
  robotSensorTaskBoundary: string;
  realRobotEvidence: string;
  artifacts: {
    paper: string;
    code: string;
    weights: string;
    data: string;
    license: string;
  };
  evidenceStatus: string;
  limitations: string;
  internalEvidencePath: string;
  primarySources: RobotWorldModelPrimarySource[];
  sourceReviewed: string;
};

export const robotWorldModelEvidenceEntries: RobotWorldModelEvidenceEntry[] = [
  {
    id: 'dream-tac',
    name: 'Dream-Tac',
    releaseDate: '2026-06-07',
    predictionTarget:
      'Joint action chunks, future visual observations, and future tactile observations in a shared diffusion latent space.',
    actionConditioning: {
      kind: 'joint-generation',
      description:
        'Actions and future observations are generated together. The source does not present Dream-Tac as an external simulator that scores a fixed set of candidate actions.',
    },
    operationalRole:
      'The joint visual-tactile future representation directly supports policy action generation. The paper does not report CEM or another candidate-search planner.',
    robotSensorTaskBoundary:
      'Franka Emika Panda; fixed third-person and wrist-mounted Intel RealSense D435i cameras; two Xense Photon fingertip sensors; Pick Baguette, Insert USB, Clean Whiteboard, Peel Cucumber, Play Mahjong, and Cut Banana.',
    realRobotEvidence:
      'The authors report 20 trials per method and task across six real-robot tasks. Dream-Tac reaches 83.3% mean success using the best-performing checkpoint under the paper\'s selection rule.',
    artifacts: {
      paper: 'Public arXiv v1 preprint.',
      code: 'Official public GitHub repository; no release or tag was verified on the review date.',
      weights: 'No public model checkpoint was verified.',
      data: 'No downloadable training-data package was verified; the repository expects user-provided preprocessed data paths.',
      license: 'Apache-2.0 for the official code repository; no separate model-weight or dataset license was verified.',
    },
    evidenceStatus: 'Preprint + public code + author-run real-robot evaluation',
    limitations:
      'The paper identifies limited tasks and objects, a simple adjacent-frame tactile-change gate, and high diffusion-model compute. The unaccelerated 10-step configuration is reported at about 5 Hz on an A800. These results do not establish cross-sensor or cross-robot transfer, independent replication, or safe deployment.',
    internalEvidencePath: '/research/dream-tac-tactile-world-action-model-2026',
    primarySources: [
      {
        label: 'Dream-Tac arXiv preprint',
        url: 'https://arxiv.org/abs/2606.08737',
        type: 'paper',
      },
      {
        label: 'Dream-Tac official repository',
        url: 'https://github.com/LYFCLOUDFAN/Dream-Tac',
        type: 'code',
      },
    ],
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'feelworld',
    name: 'FeelWorld',
    releaseDate: '2026-07-27',
    predictionTarget:
      'Future visual latents plus contact state, a force-related 3D tactile latent, and slip state under the current multimodal state, proprioception, and 7-dimensional robot action.',
    actionConditioning: {
      kind: 'candidate-conditioned',
      description:
        'The dynamics model rolls out candidate robot-action sequences and predicts their visual and hierarchical tactile consequences.',
    },
    operationalRole:
      'Contact-aware cross-entropy-method planning samples 400 candidate action sequences over a six-step imagined horizon, executes the first two actions, and then replans. It does not train a task-specific policy for the reported planning evaluation.',
    robotSensorTaskBoundary:
      'Imeta-Y1 robot; three RGB cameras; DM tactile sensors producing 3D tactile point clouds; chip grasping, fruit grasping, and USB insertion; 200 training trajectories and 40 test trajectories per task.',
    realRobotEvidence:
      'The authors report 40 real-robot planning trials per task. Contact-aware CEM reaches 82.5%, 87.5%, and 75.0% on the three tasks, or 81.7% on average.',
    artifacts: {
      paper: 'Public arXiv v1 preprint.',
      code: 'No official code repository was verified.',
      weights: 'No public model weights were verified.',
      data: 'No downloadable trajectory package was verified.',
      license: 'No reusable code, model, or dataset license was verified; the arXiv article license does not license research artifacts.',
    },
    evidenceStatus: 'Preprint + author-run real-robot planning evaluation',
    limitations:
      'The paper identifies the compute cost of CEM planning as a limitation for high-frequency real-time control. Evidence remains tied to one robot, one sensor layout, three tasks, author-defined labels, and the paper\'s planning protocol; LPIPS is not a direct force, slip, or safety metric.',
    internalEvidencePath: '/research/feelworld-visuo-tactile-world-model-2026',
    primarySources: [
      {
        label: 'FeelWorld arXiv preprint',
        url: 'https://arxiv.org/abs/2607.24267',
        type: 'paper',
      },
    ],
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'hitac-wam',
    name: 'HiTac-WAM',
    releaseDate: '2026-08-20',
    predictionTarget:
      'A 24-step bilateral tactile trajectory for each unexecuted action chunk: contact state, contact-conditioned 3D deformation, and slip risk.',
    actionConditioning: {
      kind: 'candidate-conditioned',
      description:
        'The system forecasts tactile consequences for four sampled video-action candidates before execution, then retains the selected forecast as an online reference.',
    },
    operationalRole:
      'Hierarchical tactile forecasts and visual task-progress estimates rank candidate chunks. During execution, persistent disagreement between predicted and measured touch triggers withdrawal and corrective replanning.',
    robotSensorTaskBoundary:
      'IMETA-Y1 robot; two Intel RealSense D435i cameras, one USB camera, and bilateral DM-Tac W2 sensors; chip grasping, blackboard erasing, and USB insertion; 200 episodes per task split 160/20/20 for training, validation, and test.',
    realRobotEvidence:
      'The main comparison uses 30 trials per method-task pair, 360 trials in total. The authors report 61.1% mean success for forecast-guided selection and 72.2% for the full verification-and-replanning system.',
    artifacts: {
      paper: 'Public arXiv v1 preprint.',
      code: 'No official project or code repository was verified.',
      weights: 'No public model weights were verified.',
      data: 'No downloadable episode package was verified.',
      license: 'No reusable code, model, or dataset license was verified; the arXiv article license does not license research artifacts.',
    },
    evidenceStatus: 'Preprint + author-run real-robot evaluation',
    limitations:
      'The paper does not separately evaluate forecast quality on model-generated action chunks, slip risk is not calibrated as an online alarm, anomaly statistics come from post-hoc trial-video inspection rather than exhaustive labels, and the fixed-budget comparison is descriptive. Transfer beyond one platform, sensor layout, and three task-specific predictors is not established.',
    internalEvidencePath: '/research/hitac-wam-hierarchical-tactile-world-action-model-2026',
    primarySources: [
      {
        label: 'HiTac-WAM arXiv preprint',
        url: 'https://arxiv.org/abs/2608.19574',
        type: 'paper',
      },
    ],
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'touchworld',
    name: 'TouchWorld',
    releaseDate: '2026-07-08',
    predictionTarget:
      'A short-horizon visual-tactile clip or terminal tactile subgoal for the executable subtask selected by the high-level planner.',
    actionConditioning: {
      kind: 'subtask-conditioned',
      description:
        'The tactile world model is conditioned on the current multimodal observation and an already selected executable subtask, not on competing candidate action sequences.',
    },
    operationalRole:
      'Predicted contact subgoals condition a nominal visuo-tactile policy; a faster tactile residual policy then corrects actions from measured tactile and proprioceptive feedback. The hierarchy separates subtask planning, prediction, nominal action, and reaction.',
    robotSensorTaskBoundary:
      'Unnamed humanoid platform with Wuji dexterous hands and a JQ-Industries tactile glove; Water Flower, Tabletop Clearing, Cup Insertion, Power Plug Insertion, Pot Wiping, and Tissue Pulling.',
    realRobotEvidence:
      'The paper reports 200 teleoperated training trajectories and 100 real-robot evaluation rollouts per task, without disclosing the exact clean-versus-perturbation split. Author-reported mean success is 65.0% clean and 53.7% under human perturbations.',
    artifacts: {
      paper: 'Public arXiv preprint, reviewed at v2.',
      code: 'No public training or inference code was verified.',
      weights: 'No public model weights were verified.',
      data: 'No downloadable TouchWorld robot-demonstration package was verified; EgoTouch is a separately identified pretraining source.',
      license: 'No reusable code, model, or robot-data license was verified; the arXiv article license does not license research artifacts.',
    },
    evidenceStatus: 'Preprint + official project page + author-run real-robot evaluation',
    limitations:
      'The authors identify a six-task scope, short-horizon subgoal prediction, sensor- and hand-specific calibration and adaptation requirements, and fixed multi-rate scheduling. Results come from one unnamed humanoid and tactile-glove layout and are not an independent benchmark or proof of transfer.',
    internalEvidencePath: '/news/touchworld-tactile-foundation-model-dexterous-manipulation-2026',
    primarySources: [
      {
        label: 'TouchWorld arXiv preprint',
        url: 'https://arxiv.org/abs/2607.07287',
        type: 'paper',
      },
      {
        label: 'TouchWorld official project page',
        url: 'https://phanes-lab.github.io/TouchWorld-website/',
        type: 'project',
      },
    ],
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'vitacworld',
    name: 'ViTacWorld',
    releaseDate: '2026-07-24',
    predictionTarget:
      'Temporally aligned third-person RGB, wrist RGB, and image-like tactile future observations under H-step relative end-effector motions and gripper commands.',
    actionConditioning: {
      kind: 'candidate-conditioned',
      description:
        'The model predicts policy-conditioned visual-tactile outcomes under supplied robot action chunks and can roll them forward autoregressively.',
    },
    operationalRole:
      'Generated dream rollouts augment downstream tactile-policy training and provide a pre-deployment imagined policy-evaluation signal. The source does not position ViTacWorld as an online planner or closed-loop controller.',
    robotSensorTaskBoundary:
      'Franka Panda, Robotiq 2F-85, fingertip Xense optical tactile sensors, Intel RealSense D435 external camera, and ZED Mini wrist camera; Charger Plugging, Cucumber Peeling, U-Block Insertion, and Cuboid Insertion.',
    realRobotEvidence:
      'The setup uses 300 real expert demonstrations plus 50 real policy rollouts per task. Each downstream policy is evaluated in 10 real-robot trials per task; the authors report tactile pi-0.5 mean success rising from 42.5% with expert data to 67.5% after first-round generated-rollout augmentation.',
    artifacts: {
      paper: 'Public arXiv v1 preprint.',
      code: 'The official project page displayed “GitHub Coming Soon” on the review date; no implementation repository was verified.',
      weights: 'No public model weights were verified.',
      data: 'No downloadable training mixture or generated-rollout package was verified.',
      license: 'No reusable code, model, or dataset license was verified because no method artifact was available.',
    },
    evidenceStatus: 'Preprint + official project page + author-run real-robot evaluation',
    limitations:
      'The paper states that successful dream-data selection still partly relies on manual inspection. Evidence is limited to one Franka setup, four tasks, 10 trials per policy-task pair, author-run evaluation, and unreleased code, weights, and data.',
    internalEvidencePath: '/guides/visuo-tactile-world-models-robot-manipulation',
    primarySources: [
      {
        label: 'ViTacWorld arXiv preprint',
        url: 'https://arxiv.org/abs/2607.22530',
        type: 'paper',
      },
      {
        label: 'ViTacWorld official project page',
        url: 'https://vitacworld.github.io/',
        type: 'project',
      },
    ],
    sourceReviewed: '2026-08-22',
  },
];
