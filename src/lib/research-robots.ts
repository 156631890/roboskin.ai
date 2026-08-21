import { robotAiModelEntries } from '@/lib/robot-ai-models';

export const researchRobotKinds = [
  'humanoid robot',
  'robot arm',
  'mobile manipulator',
  'research configuration',
  'robot platform family',
  'research setup',
] as const;

export const robotModelRelationTypes = [
  'evaluatedOn',
  'trainedAcross',
  'demonstratedOn',
] as const;

export type ResearchRobotKind = (typeof researchRobotKinds)[number];
export type RobotModelRelationType = (typeof robotModelRelationTypes)[number];

export type ResearchRobotEntry = {
  id: string;
  name: string;
  aliases: string[];
  kind: ResearchRobotKind;
  manufacturer: string | null;
  officialUrl: string | null;
  schemaSameAsUrl: string | null;
  identitySources: {
    label: string;
    url: string;
  }[];
  description: string;
  evidenceBoundary: string;
  sourceReviewed: string;
};

export type RobotAiRobotRelation = {
  modelId: string;
  robotId: string;
  relation: RobotModelRelationType;
  sourceEmbodimentLabels: string[];
  evidenceUrls: string[];
  evidenceBoundary: string;
  sourceReviewed: string;
};

export const researchRobotEntries: ResearchRobotEntry[] = [
  {
    id: 'apptronik-apollo-2',
    name: 'Apptronik Apollo 2',
    aliases: ['Apollo 2'],
    kind: 'humanoid robot',
    manufacturer: 'Apptronik',
    officialUrl: 'https://apptronik.com/apollo/apollo-2',
    schemaSameAsUrl: 'https://apptronik.com/apollo/apollo-2',
    identitySources: [
      { label: 'Apptronik Apollo 2 official page', url: 'https://apptronik.com/apollo/apollo-2' },
    ],
    description: 'A modular humanoid platform offered in bipedal and wheeled-base configurations. The current directory records only model relationships supported by separate evaluation sources.',
    evidenceBoundary: 'The official product page establishes the Apollo 2 identity. It does not independently verify Gemini Robotics 2 performance, hand-specific results, autonomy, safety certification, deployment scale, or commercial availability in every configuration.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'franka-duo',
    name: 'Franka Duo',
    aliases: [],
    kind: 'research configuration',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'Google DeepMind Gemini Robotics 2 release', url: 'https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/' },
    ],
    description: 'A named dual-arm Franka research configuration shown with a Robotiq gripper in the Gemini Robotics 2 evaluation.',
    evidenceBoundary: 'The reviewed Google DeepMind source names the configuration “Franka Duo” but does not identify it as Franka Research 3 Duo, specify every component, or establish a generally available product with that exact name.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'fourier-gr-1',
    name: 'Fourier GR-1',
    aliases: ['GR-1'],
    kind: 'humanoid robot',
    manufacturer: 'Fourier',
    officialUrl: 'https://www.fftai.com/products-gr1',
    schemaSameAsUrl: 'https://www.fftai.com/products-gr1',
    identitySources: [
      { label: 'Fourier GR-1 official product page', url: 'https://www.fftai.com/products-gr1' },
    ],
    description: 'A general-purpose humanoid robot platform used for real-world and simulated GR00T N1 manipulation research.',
    evidenceBoundary: 'The official Fourier page establishes the platform identity. Model performance, training-data coverage, hand configuration, and task results are preserved separately in the GR00T N1 paper and NVIDIA publication.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: '1x-humanoid-family',
    name: '1X humanoid platform family',
    aliases: ['1X humanoid', '1X humanoids'],
    kind: 'robot platform family',
    manufacturer: '1X',
    officialUrl: 'https://www.1x.tech/about',
    schemaSameAsUrl: null,
    identitySources: [
      { label: '1X official company and robot history', url: 'https://www.1x.tech/about' },
    ],
    description: 'A family-level entity used when a model source names 1X humanoids without disclosing the exact 1X robot model or revision.',
    evidenceBoundary: 'This record deliberately does not resolve the GR00T N1 demonstration to NEO, EVE, NEO Beta, NEO Gamma, or another 1X product. The cited NVIDIA source supports only the family-level wording “1X humanoids.”',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'franka-emika-panda',
    name: 'Franka Emika Panda',
    aliases: ['Panda', 'Franka Panda', 'Franka Emika Robot (Panda)'],
    kind: 'robot arm',
    manufacturer: 'Franka Robotics',
    officialUrl: 'https://support.franka.de/docs/index.html',
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'Franka Control Interface documentation', url: 'https://support.franka.de/docs/index.html' },
    ],
    description: 'The older Franka research robot commonly called Panda. Exact experimental configurations can add cameras, grippers, tactile sensors, tables, or mobile fixtures.',
    evidenceBoundary: 'Franka documentation identifies the older Franka Robotics Robot as FER or Panda. This entity must not be conflated with Franka Research 3, a generic Franka arm, Franka Duo, or every DROID installation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'universal-robots-ur5e',
    name: 'Universal Robots UR5e',
    aliases: ['UR5e'],
    kind: 'robot arm',
    manufacturer: 'Universal Robots',
    officialUrl: 'https://www.universal-robots.com/manuals/latest/en/datasheets/ur5e/',
    schemaSameAsUrl: 'https://www.universal-robots.com/manuals/latest/en/datasheets/ur5e/',
    identitySources: [
      { label: 'Universal Robots UR5e official datasheet', url: 'https://www.universal-robots.com/manuals/latest/en/datasheets/ur5e/' },
    ],
    description: 'A six-axis collaborative robot arm represented in both single-arm and bimanual π0 configurations.',
    evidenceBoundary: 'The manufacturer datasheet establishes the UR5e identity. UR5 and UR5e are not treated as interchangeable, and the π0 paper—not this datasheet—supports the model-training and evaluation relationships.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'trossen-viperx-family',
    name: 'Trossen ViperX arm family',
    aliases: ['Trossen ViperX', 'ViperX'],
    kind: 'robot platform family',
    manufacturer: 'Trossen Robotics',
    officialUrl: 'https://docs.trossenrobotics.com/interbotix_xsarms_docs/',
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'Interbotix X-Series arms documentation', url: 'https://docs.trossenrobotics.com/interbotix_xsarms_docs/' },
    ],
    description: 'A family-level record for experiments that name ViperX arms without disclosing the exact ViperX-250, ViperX-300, or six-degree-of-freedom product code.',
    evidenceBoundary: 'The π0 and Octo sources use ViperX wording without enough evidence to resolve every setup to a product variant. ALOHA bimanual systems and mobile configurations remain configuration qualifiers, not aliases for a single arm.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'trossen-widowx-250-6dof',
    name: 'Trossen WidowX-250 6DOF',
    aliases: ['WidowX 250 6-DoF', 'WidowX-250 6DOF', 'BridgeData V2 WidowX'],
    kind: 'robot arm',
    manufacturer: 'Trossen Robotics',
    officialUrl: 'https://docs.trossenrobotics.com/interbotix_xsarms_docs/specifications/wx250s.html',
    schemaSameAsUrl: 'https://docs.trossenrobotics.com/interbotix_xsarms_docs/specifications/wx250s.html',
    identitySources: [
      { label: 'Trossen WidowX-250 6DOF documentation', url: 'https://docs.trossenrobotics.com/interbotix_xsarms_docs/specifications/wx250s.html' },
      { label: 'BridgeData V2 system setup', url: 'https://rail-berkeley.github.io/bridgedata/' },
    ],
    description: 'The six-degree-of-freedom WidowX-250 arm used by the BridgeData V2 setup and named in OpenVLA and Octo evaluations.',
    evidenceBoundary: 'BridgeData V2 confirms its data-collection arm, while each model paper controls the evaluation claim. This entity does not imply zero-shot success, cross-scene robustness, or compatibility with other WidowX variants.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'google-rt-mobile-manipulator',
    name: 'Google RT-series mobile manipulation robot',
    aliases: ['Google robot', 'RT-1 Robot', 'unnamed 7-DoF mobile manipulator'],
    kind: 'mobile manipulator',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'RT-2 primary paper', url: 'https://arxiv.org/abs/2307.15818' },
      { label: 'RT-2 official project', url: 'https://robotics-transformer2.github.io/' },
    ],
    description: 'An editorially normalized research-platform entity for the unnamed mobile manipulator shared by RT-series evaluations and called the Google robot or RT-1 Robot in later model papers.',
    evidenceBoundary: 'The reviewed sources do not disclose a manufacturer or commercial model. This record must not be relabeled as Everyday Robots, Franka, xArm, or another product, and the 13 physical training robots reported by RT-2 are not assumed to be one hardware family.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'palm-e-mobile-manipulator',
    name: 'PaLM-E mobile manipulator',
    aliases: ['PaLM-E mobile robot'],
    kind: 'mobile manipulator',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'PaLM-E primary paper', url: 'https://arxiv.org/abs/2303.03378' },
      { label: 'PaLM-E official project', url: 'https://palm-e.github.io/' },
    ],
    description: 'The real mobile-manipulation platform used in PaLM-E kitchen experiments, retained separately because the source does not establish a commercial robot model or exact equivalence with the RT-series platform.',
    evidenceBoundary: 'The PaLM-E paper supports a real mobile-manipulator environment but does not publish a vendor model. PaLM-E generates high-level textual decisions and relies on separate low-level policies for physical execution.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'language-table-setup',
    name: 'Language Table research setup',
    aliases: ['Language Table'],
    kind: 'research setup',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'PaLM-E primary paper', url: 'https://arxiv.org/abs/2303.03378' },
      { label: 'RT-2 primary paper', url: 'https://arxiv.org/abs/2307.15818' },
    ],
    description: 'A tabletop instruction-following research setup represented in both simulated evaluation and qualitative real-robot evidence.',
    evidenceBoundary: 'Simulation results and real-world demonstrations are not interchangeable. RT-2 evidence is limited to the RT-2-PaLI-3B checkpoint where stated, and PaLM-E quantitative results must retain their simulation or real-world qualifier.',
    sourceReviewed: '2026-08-22',
  },
];

export const robotAiRobotRelations: RobotAiRobotRelation[] = [
  {
    modelId: 'gemini-robotics-2',
    robotId: 'apptronik-apollo-2',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: [
      'Apptronik Apollo 2 humanoid with Inspire hands',
      'Apptronik Apollo 2 humanoid with SharpaWave hand',
    ],
    evidenceUrls: ['https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/'],
    evidenceBoundary: 'Google DeepMind reports task-level success rates for Inspire-hand whole-body manipulation and SharpaWave multi-finger tasks using the same Gemini Robotics 2 checkpoint. These are developer-reported results on selected tasks, not an independent benchmark or blanket Apollo 2 capability claim.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'gemini-robotics-2',
    robotId: 'franka-duo',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Franka Duo'],
    evidenceUrls: ['https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/'],
    evidenceBoundary: 'Google DeepMind reports success rates for pick-and-place, tool-kitting, and insertion tasks on a Franka Duo with a Robotiq gripper. The source does not establish independent replication or performance outside the reported checkpoint, hardware configuration, and tasks.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'rt-2',
    robotId: 'google-rt-mobile-manipulator',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Google RT-series 7-DoF mobile manipulator (hardware model not disclosed)'],
    evidenceUrls: ['https://arxiv.org/abs/2307.15818'],
    evidenceBoundary: 'The RT-2 paper reports about 6,000 evaluation trials on the authors’ unnamed seven-degree-of-freedom mobile manipulator. The result is tied to that platform and protocol and does not identify a commercial robot model.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'rt-2',
    robotId: 'language-table-setup',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Language Table setup (RT-2-PaLI-3B simulation and qualitative real-world evaluation)'],
    evidenceUrls: ['https://arxiv.org/abs/2307.15818'],
    evidenceBoundary: 'The quantitative Language Table result is a simulation evaluation for RT-2-PaLI-3B. It must not be generalized to all RT-2 checkpoints or presented as a real-robot success rate.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'rt-2',
    robotId: 'language-table-setup',
    relation: 'demonstratedOn',
    sourceEmbodimentLabels: ['Language Table setup (RT-2-PaLI-3B simulation and qualitative real-world evaluation)'],
    evidenceUrls: ['https://arxiv.org/abs/2307.15818'],
    evidenceBoundary: 'The paper shows qualitative real-world Language Table behavior for RT-2-PaLI-3B. The simulation metric is not transferred to this real setup.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'palm-e',
    robotId: 'palm-e-mobile-manipulator',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['Google mobile manipulator in the kitchen environment (hardware model not disclosed)'],
    evidenceUrls: ['https://arxiv.org/abs/2303.03378'],
    evidenceBoundary: 'The PaLM-E paper lists the real mobile-manipulator domain in its joint embodied training mixture. The relation does not imply that PaLM-E directly emits low-level motor commands.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'palm-e',
    robotId: 'palm-e-mobile-manipulator',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Google mobile manipulator in the kitchen environment (hardware model not disclosed)'],
    evidenceUrls: ['https://arxiv.org/abs/2303.03378'],
    evidenceBoundary: 'The paper evaluates embodied reasoning and long-horizon kitchen tasks on the real mobile manipulator while separate low-level policies execute generated decisions. This is not evidence of direct end-to-end motor control.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'palm-e',
    robotId: 'language-table-setup',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['Language Table setup (real and simulated)'],
    evidenceUrls: ['https://arxiv.org/abs/2303.03378'],
    evidenceBoundary: 'The PaLM-E training mixture includes Language Table data from simulated and real settings. This relationship records training coverage, not a claim of cross-platform deployment reliability.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'palm-e',
    robotId: 'language-table-setup',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Language Table setup (real and simulated)'],
    evidenceUrls: ['https://arxiv.org/abs/2303.03378'],
    evidenceBoundary: 'PaLM-E reports quantitative Language Table evaluation primarily in simulation and also presents real-tabletop behavior. The relation retains that mixed-domain boundary and does not turn simulation success into a real-robot metric.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'openvla-7b',
    robotId: 'trossen-widowx-250-6dof',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Trossen WidowX 250 6-DoF (zero-shot evaluation)'],
    evidenceUrls: ['https://arxiv.org/abs/2406.09246'],
    evidenceBoundary: 'The OpenVLA paper reports zero-shot evaluation on 17 BridgeData V2 WidowX tasks with 170 rollouts. BridgeData identifies the arm as a WidowX 250 6-DoF; the result remains specific to the paper protocol.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'openvla-7b',
    robotId: 'google-rt-mobile-manipulator',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Google RT-series mobile manipulator (zero-shot evaluation)'],
    evidenceUrls: ['https://arxiv.org/abs/2406.09246'],
    evidenceBoundary: 'The OpenVLA paper reports zero-shot evaluation on 12 Google-robot tasks with 60 rollouts. The hardware is normalized only to the unnamed RT-series platform family described by the source.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'openvla-7b',
    robotId: 'franka-emika-panda',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Franka Emika Panda tabletop setup (fine-tuned-policy evaluation)'],
    evidenceUrls: ['https://arxiv.org/abs/2406.09246'],
    evidenceBoundary: 'This relation concerns a policy fine-tuned with target demonstrations on the Franka-Tabletop setup. It is not a zero-shot result for the base OpenVLA checkpoint and does not cover every Franka installation.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'octo',
    robotId: 'trossen-widowx-250-6dof',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Trossen WidowX 250 6-DoF (zero-shot evaluation)'],
    evidenceUrls: ['https://arxiv.org/abs/2405.12213'],
    evidenceBoundary: 'The Octo paper lists the WidowX 250 6-DoF among its real-robot zero-shot setups. The result does not establish compatibility with other WidowX products or untested observation and action adapters.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'octo',
    robotId: 'google-rt-mobile-manipulator',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Google RT-series mobile manipulator / proprietary RT-1 Robot (zero-shot evaluation)'],
    evidenceUrls: ['https://arxiv.org/abs/2405.12213'],
    evidenceBoundary: 'The Octo paper identifies a proprietary RT-1 Robot as a zero-shot evaluation setup. The manufacturer and commercial product model remain undisclosed.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'octo',
    robotId: 'trossen-viperx-family',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Trossen ViperX and ALOHA configurations (fine-tuned-policy evaluation)'],
    evidenceUrls: ['https://arxiv.org/abs/2405.12213'],
    evidenceBoundary: 'Octo evaluates a target-data-fine-tuned policy on a ViperX setup. The ViperX embodiment was not present in Octo pretraining, so this is neither a base-checkpoint zero-shot result nor evidence that Octo was trained across ViperX.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'pi0',
    robotId: 'universal-robots-ur5e',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['Universal Robots UR5e (single and bimanual configurations)'],
    evidenceUrls: ['https://www.pi.website/download/pi0.pdf'],
    evidenceBoundary: 'The π0 report explicitly states that the model is trained jointly across the listed platforms, including single and bimanual UR5e configurations. This does not imply the same performance across both configurations or new UR products.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'pi0',
    robotId: 'universal-robots-ur5e',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Universal Robots UR5e (single and bimanual configurations)'],
    evidenceUrls: ['https://www.pi.website/download/pi0.pdf'],
    evidenceBoundary: 'The π0 report evaluates UR5e and bimanual UR5e tasks under its own pretraining and fine-tuning protocols. Results remain task-, dataset-, and configuration-specific.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'pi0',
    robotId: 'trossen-viperx-family',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['Trossen ViperX arms (bimanual and mobile configurations)'],
    evidenceUrls: ['https://www.pi.website/download/pi0.pdf'],
    evidenceBoundary: 'The π0 report says the joint training set includes bimanual and mobile setups using Trossen ViperX arms. It does not disclose an exact ViperX product code, and “based on ALOHA” does not make these setups identical to an original ALOHA system.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'isaac-gr00t-n1',
    robotId: 'fourier-gr-1',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Fourier GR-1 humanoid'],
    evidenceUrls: ['https://arxiv.org/abs/2503.14734'],
    evidenceBoundary: 'The GR00T N1 paper reports real-world language-conditioned bimanual manipulation and quantitative evaluation on Fourier GR-1. It does not transfer the same results to other humanoids or later GR00T versions.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'isaac-gr00t-n1',
    robotId: 'fourier-gr-1',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['Fourier GR-1 humanoid'],
    evidenceUrls: ['https://arxiv.org/abs/2503.14734'],
    evidenceBoundary: 'The GR00T N1 paper states that pretraining uses the authors’ GR-1 humanoid data. This records training-mixture coverage only; it does not imply that every GR-1 variant, downstream checkpoint, or reported evaluation uses the same data and hardware configuration.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'isaac-gr00t-n1',
    robotId: '1x-humanoid-family',
    relation: 'demonstratedOn',
    sourceEmbodimentLabels: ['1X humanoid'],
    evidenceUrls: ['https://research.nvidia.com/publication/2025-03_nvidia-isaac-gr00t-n1-open-foundation-model-humanoid-robots'],
    evidenceBoundary: 'NVIDIA’s official research page says GR00T N1 demonstrates language-conditioned bimanual household manipulation on 1X humanoids. The exact 1X model and a model-specific quantitative protocol are not disclosed in the reviewed source.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'dream-tac',
    robotId: 'franka-emika-panda',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Franka Emika Panda with dual RealSense D435i cameras and two Xense Photon fingertip sensors'],
    evidenceUrls: ['https://arxiv.org/abs/2606.08737'],
    evidenceBoundary: 'The Dream-Tac preprint explicitly identifies a Franka Emika Panda with two RealSense D435i cameras and two Xense Photon fingertip tactile sensors for six contact-rich tasks. The preprint does not establish independent replication or cross-robot transfer.',
    sourceReviewed: '2026-08-22',
  },
];

const validDate = /^20\d{2}-\d{2}-\d{2}$/;
const modelById = new Map(robotAiModelEntries.map((entry) => [entry.id, entry]));
const robotById = new Map(researchRobotEntries.map((entry) => [entry.id, entry]));

if (robotById.size !== researchRobotEntries.length) {
  throw new Error('Research robot IDs must be unique.');
}

const identityNames = new Set<string>();
for (const robot of researchRobotEntries) {
  if (!researchRobotKinds.includes(robot.kind)) throw new Error(`Unsupported research robot kind: ${robot.kind}`);
  if (!validDate.test(robot.sourceReviewed)) throw new Error(`Invalid source review date for robot ${robot.id}.`);
  if (robot.identitySources.length === 0) throw new Error(`Robot ${robot.id} needs an identity source.`);
  for (const name of [robot.name, ...robot.aliases]) {
    const normalized = name.trim().toLocaleLowerCase('en-US');
    if (identityNames.has(normalized)) throw new Error(`Duplicate research robot name or alias: ${name}`);
    identityNames.add(normalized);
  }
  for (const source of robot.identitySources) {
    if (new URL(source.url).protocol !== 'https:') throw new Error(`Robot ${robot.id} identity source must use HTTPS.`);
  }
  if (robot.officialUrl && new URL(robot.officialUrl).protocol !== 'https:') {
    throw new Error(`Robot ${robot.id} official URL must use HTTPS.`);
  }
  if (robot.schemaSameAsUrl) {
    if (new URL(robot.schemaSameAsUrl).protocol !== 'https:') {
      throw new Error(`Robot ${robot.id} schema sameAs URL must use HTTPS.`);
    }
    if (robot.schemaSameAsUrl !== robot.officialUrl) {
      throw new Error(`Robot ${robot.id} schema sameAs URL must match its exact official URL.`);
    }
  }
}

const relationKeys = new Set<string>();
const connectedRobotIds = new Set<string>();
for (const relation of robotAiRobotRelations) {
  const model = modelById.get(relation.modelId);
  const robot = robotById.get(relation.robotId);
  if (!model) throw new Error(`Robot relation references missing model ${relation.modelId}.`);
  if (!robot) throw new Error(`Robot relation references missing robot ${relation.robotId}.`);
  if (!robotModelRelationTypes.includes(relation.relation)) throw new Error(`Unsupported robot relation ${relation.relation}.`);
  if (!validDate.test(relation.sourceReviewed)) throw new Error(`Invalid source review date for ${relation.modelId} → ${relation.robotId}.`);
  if (relation.evidenceUrls.length === 0) throw new Error(`Robot relation ${relation.modelId} → ${relation.robotId} needs evidence.`);
  if (relation.sourceEmbodimentLabels.length === 0) throw new Error(`Robot relation ${relation.modelId} → ${relation.robotId} needs a source embodiment label.`);

  const key = `${relation.modelId}|${relation.relation}|${relation.robotId}`;
  if (relationKeys.has(key)) throw new Error(`Duplicate robot relation: ${key}`);
  relationKeys.add(key);
  connectedRobotIds.add(relation.robotId);

  const primarySourceUrls = new Set(model.primarySources.map((source) => source.url));
  for (const url of relation.evidenceUrls) {
    if (!primarySourceUrls.has(url)) {
      throw new Error(`Robot relation evidence ${url} is not a primary source for model ${model.id}.`);
    }
  }
  for (const label of relation.sourceEmbodimentLabels) {
    if (!model.embodiments.includes(label)) {
      throw new Error(`Robot relation label “${label}” is not an embodiment label for model ${model.id}.`);
    }
  }
}

for (const robot of researchRobotEntries) {
  if (!connectedRobotIds.has(robot.id)) throw new Error(`Robot ${robot.id} has no verified model relation.`);
}

export function getResearchRobotById(id: string) {
  return robotById.get(id);
}
