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
  researchUrl?: string;
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
    id: 'franka-panda-univtac-gelsight-mini-simulation-configuration',
    name: 'Franka Panda UniVTAC GelSight Mini simulation configuration',
    aliases: ['UniVTAC simulated Panda platform', 'UniVTAC Panda–GelSight Mini configuration'],
    kind: 'research configuration',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'UniVTAC primary paper', url: 'https://arxiv.org/abs/2602.10093' },
      { label: 'UniVTAC official repository', url: 'https://github.com/univtac/UniVTAC' },
    ],
    researchUrl: '/research/univtac-platform-encoder-benchmark-2026',
    description: 'The released UniVTAC benchmark configuration combining a simulated Franka Panda and parallel-jaw gripper with bilateral simulated GelSight Mini observations, head and wrist RGB, and robot-state and action channels.',
    evidenceBoundary: 'This is a simulation-only, paper-specific configuration rather than a stock Franka or GelSight product bundle. The current public collection and evaluation pipeline supports simulated GelSight Mini; ViTai GF225 and Xense WS are listed as planned. Simulation outcomes do not establish physical Panda compatibility, safety, sensor fidelity, or sim-to-real performance.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'tianji-marvin-univtac-gf225-configuration',
    name: 'Tianji Marvin UniVTAC GF225 configuration',
    aliases: ['UniVTAC physical Marvin platform', 'Tianji Marvin with bilateral ViTai GF225'],
    kind: 'research configuration',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'UniVTAC primary paper', url: 'https://arxiv.org/abs/2602.10093' },
      { label: 'UniVTAC official project', url: 'https://univtac.github.io/' },
      { label: 'Tianji Marvin Series official product page', url: 'https://en.tianjizn.com/products/marvin-series/' },
      { label: 'ViTai VT-GF225 official product page', url: 'https://vitai.site/product/vt-gf225' },
    ],
    researchUrl: '/research/univtac-platform-encoder-benchmark-2026',
    description: 'The physical UniVTAC evaluation configuration comprising one 7-DoF Tianji Marvin arm, a parallel gripper, one wrist RGB camera, and two ViTai GF225 tactile sensors sampled at 30 Hz.',
    evidenceBoundary: 'This is a paper-specific multi-vendor integration, so manufacturer remains unset for the combined configuration. The paper does not disclose the exact Marvin SKU or gripper model, and evidence is limited to three physical tasks, 20 rollouts per method-task, and human-observed binary success. Current product-family specifications must not be transferred to the undisclosed paper SKU.',
    sourceReviewed: '2026-08-22',
  },
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
    id: 'unitree-g1',
    name: 'Unitree G1',
    aliases: ['G1 humanoid'],
    kind: 'humanoid robot',
    manufacturer: 'Unitree Robotics',
    officialUrl: 'https://www.unitree.com/g1/',
    schemaSameAsUrl: 'https://www.unitree.com/g1/',
    identitySources: [
      { label: 'Unitree G1 official product page', url: 'https://www.unitree.com/g1/' },
    ],
    description: 'A humanoid robot platform represented here because Tac4Loco uses a G1 model for simulation training and a physical G1 for plantar-pressure locomotion evaluation.',
    evidenceBoundary: 'The official page establishes the G1 product identity but lists configuration-dependent G1 and G1 EDU specifications. Tac4Loco’s bilateral 60-element FSR insoles are a research-team integration, not evidence that plantar tactile sensing is standard equipment on every G1 configuration.',
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
    officialUrl: 'https://franka.de/documents',
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'Franka official end-of-life notice for the Franka Emika Robot', url: 'https://download.franka.de/End-of-Life-Franka-Emika-Robot_EN.pdf' },
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
    id: 'universal-robots-ur5',
    name: 'Universal Robots UR5',
    aliases: ['UR5', 'UR5 CB-Series'],
    kind: 'robot arm',
    manufacturer: 'Universal Robots',
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'Universal Robots official company history', url: 'https://www.universal-robots.com/about-us/history/' },
      { label: 'Universal Robots official UR5 technical specification', url: 'https://www.universal-robots.com/media/1828033/ur5_tech_spec_web_en.pdf' },
    ],
    description: 'The legacy six-axis UR5 collaborative robot arm named in Octo pretraining and real-robot evaluation evidence.',
    evidenceBoundary: 'The Octo paper says UR5, not UR5e, and does not disclose the CB controller revision. This entity remains separate from the existing e-Series UR5e entity and does not inherit UR5e force-sensing, repeatability, or other generation-specific specifications.',
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
    id: 'aloha-bimanual-teleoperation-setup',
    name: 'ALOHA bimanual teleoperation setup',
    aliases: ['ALOHA', 'A Low-cost Open-source Hardware System for Bimanual Teleoperation'],
    kind: 'research setup',
    manufacturer: null,
    officialUrl: 'https://tonyzhaozh.github.io/aloha/',
    schemaSameAsUrl: 'https://tonyzhaozh.github.io/aloha/',
    identitySources: [
      { label: 'ALOHA official project page', url: 'https://tonyzhaozh.github.io/aloha/' },
      { label: 'ALOHA official repository', url: 'https://github.com/tonyzhaozh/aloha' },
    ],
    description: 'The original open-source bimanual teleoperation workcell built from two ViperX follower arms, two WidowX leader arms, four RGB cameras, and a 50 Hz data-collection stack.',
    evidenceBoundary: 'ALOHA is a complete research workcell rather than an alias for one ViperX arm or a single-manufacturer product. Octo evidence concerns a target-data-fine-tuned policy with a reinitialized 14-dimensional action head, not zero-shot use of the base checkpoint; ALOHA 2 remains a separate later system.',
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
  {
    id: 'kuka-iiwa7-allegro-configuration',
    name: 'KUKA iiwa7 + Allegro Hand ADEPT configuration',
    aliases: ['ADEPT KUKA-Allegro setup', 'KUKA iiwa7 with Allegro Hand'],
    kind: 'research setup',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'ADEPT primary paper', url: 'https://arxiv.org/abs/2608.19182' },
      { label: 'ADEPT official project page', url: 'https://adept-dexterity.github.io/' },
    ],
    description: 'A fixed-workbench ADEPT research configuration combining a 7-DoF KUKA iiwa7 arm, a 16-DoF Allegro Hand, and two calibrated Intel RealSense RGB cameras for a 23-DoF vision-only student policy.',
    evidenceBoundary: 'This is a source-specific research setup, not a single-manufacturer product. The paper does not disclose the exact RealSense camera model, does not add tactile input to the KUKA branch, and does not establish transfer to another Allegro revision, iiwa model, mobile base, sensor layout, or task family.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'flexiv-rizon-sharpa-configuration',
    name: 'Flexiv Rizon + Sharpa hand ADEPT configuration',
    aliases: ['ADEPT Flexiv-Sharpa setup', 'Flexiv Rizon with Sharpa hand'],
    kind: 'research setup',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'ADEPT primary paper', url: 'https://arxiv.org/abs/2608.19182' },
      { label: 'ADEPT official project page', url: 'https://adept-dexterity.github.io/' },
    ],
    description: 'A fixed-workbench ADEPT research configuration combining a 7-DoF Flexiv Rizon arm, a 22-DoF five-finger Sharpa hand, two RGB cameras, and five fingertip vision-based tactile sensors for a 29-DoF student policy.',
    evidenceBoundary: 'The paper does not disclose the exact Sharpa hand revision, RGB camera models, or fingertip tactile-sensor product. This record must not be relabeled SharpaWave or treated as evidence for another Sharpa, Flexiv, optical-tactile, mobile, or humanoid configuration.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'dexmate-vega-1-sharpa-wave-configuration',
    name: 'Dexmate Vega-1 + dual Sharpa Wave T-Rex configuration',
    aliases: ['T-Rex bimanual dexterous platform', 'Bimanual Dexmate Vega-1 with two Sharpa Wave hands'],
    kind: 'research configuration',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'T-Rex primary paper', url: 'https://arxiv.org/abs/2606.17055' },
      { label: 'T-Rex official repository', url: 'https://github.com/ZhuoyangLiu2005/T-Rex' },
    ],
    description: 'The fixed-base bimanual research configuration used to collect the T-Rex tactile-reactive dataset and evaluate its VLA policy, combining a Dexmate Vega-1 with two 22-DoF Sharpa Wave hands and ten fingertip tactile sensors.',
    evidenceBoundary: 'This is a source-specific multi-vendor research integration, not a single product or compatibility claim. The sources do not establish equivalent behavior for another Vega-1 revision, Sharpa hand, tactile sensor, camera layout, mobile base, humanoid body, or independent implementation.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'realman-rm65b-vitar-tactile-configuration',
    name: 'RealMan RM65-B ViTaR tactile configuration',
    aliases: ['RM65-B/DH-gripper platform', 'ViTaR physical-robot platform'],
    kind: 'research configuration',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'ViTaR primary paper', url: 'https://arxiv.org/abs/2608.15816' },
      { label: 'ViTaR official project page', url: 'https://icr-lab.github.io/ViTaR/' },
    ],
    description: 'A mixed research configuration comprising a 6-DoF RealMan RM65-B arm, a DH Robotics PGIA-series parallel-jaw gripper, a custom rigid adapter with two mirror-symmetric 9DTact sensors, one wrist RealSense D455, and one fixed third-person D455.',
    evidenceBoundary: 'This is a paper-specific multi-vendor integration, not a standard single-manufacturer product. The custom adapter, dual 9DTact mounting, camera placement, calibration, 10 Hz controller, and software stack must not be represented as standard RM65-B or DH Robotics features. Evidence covers only the three physical tasks and protocol reported by ViTaR.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'xhand-ur7e-retouch-configuration',
    name: 'XHand–UR7e ReTouch tactile manipulation platform',
    aliases: ['XHand–UR7e platform', 'ReTouch real-world platform'],
    kind: 'research configuration',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'ReTouch primary paper, arXiv v2', url: 'https://arxiv.org/abs/2608.01824' },
    ],
    description: 'A mixed research platform comprising a UR7e arm, an XHand five-finger dexterous hand, one wrist RGB camera, and two fixed external RGB cameras. Each finger supplies 120 three-axis force taxels; demonstrations use a VIVE wrist tracker and MANUS glove.',
    evidenceBoundary: 'This record represents the exact ReTouch research configuration, not a standard product from one manufacturer. The paper does not disclose RGB-camera models, a complete tactile-sensor part number, force range, sampling rate, calibration uncertainty, or production certification. XHT retains 900 successful demonstrations and excludes interrupted or corrupted demonstrations, so that count is not an all-attempt failure rate.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'franka-research-3-dm-tac-ws-tau-configuration',
    name: 'Franka Research 3 + bilateral DM-Tac WS τ configuration',
    aliases: ['τ Franka tactile platform', 'Franka Research 3 with DM-Tac WS'],
    kind: 'research configuration',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'τ primary paper', url: 'https://arxiv.org/abs/2607.24485' },
      { label: 'τ official project page', url: 'https://cocacola-lab.github.io/tau-Page/' },
    ],
    description: 'A Franka Research 3 with a Franka Hand whose stock fingers are replaced by two DM-Tac WS vision-based tactile sensors, observed by two static RealSense D435i cameras and one wrist RealSense D405.',
    evidenceBoundary: 'This is the source-specific τ research setup, not a stock Franka product configuration. The paper reports approximately 40 FPS 320 × 240 tactile capture, 15 FPS camera capture, and a synchronized 10 Hz dataset, but does not disclose the deployed policy rate, exact action tensor, cross-sensor transfer, or production safety evidence.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'realman-rm75b-dm-tac-w-unitacvla-configuration',
    name: 'RealMan RM75B + bilateral DM-Tac W UniTacVLA configuration',
    aliases: ['UniTacVLA RM75B tactile platform', 'RM75B with bilateral DM-Tac W'],
    kind: 'research configuration',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'UniTacVLA primary paper', url: 'https://arxiv.org/abs/2606.31723' },
    ],
    description: 'A RealMan RM75B slave arm with a 3D-printed one-degree-of-freedom parallel gripper, two DM-Tac W fingertip sensors, a wrist RealSense D405, and a first-person RealSense L515, paired with another RM75B in an ALOHA-style teleoperation system.',
    evidenceBoundary: 'This is a paper-specific mixed research configuration rather than a commercial bundle or compatibility claim. The authors do not disclose tactile pixel resolution, policy and correction frequencies, action dimension, public calibration files, or cross-robot transfer. Results remain limited to eight paper-defined subtasks and clean or prescribed perturbation settings.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'franka-panda-robotiq-gelsight-vla-touch-configuration',
    name: 'Franka Panda + Robotiq 2F-140 + GelSight Mini VLA-Touch configuration',
    aliases: ['VLA-Touch Franka setup', 'Franka Panda VLA-Touch platform'],
    kind: 'research configuration',
    manufacturer: null,
    officialUrl: null,
    schemaSameAsUrl: null,
    identitySources: [
      { label: 'VLA-Touch primary paper', url: 'https://arxiv.org/abs/2507.17294' },
      { label: 'VLA-Touch official project page', url: 'https://jxbi1010.github.io/vla-touch-gh-pages/' },
    ],
    description: 'A Franka Emika Panda with a Robotiq 2F-140 gripper, one GelSight Mini mounted on one gripper finger, one fixed overhead RealSense camera, one wrist RealSense camera, and an RTX 4090 inference workstation.',
    evidenceBoundary: 'This is the exact source-specific VLA-Touch configuration, not a standard product bundle. Touch is unilateral, the RealSense camera models are not disclosed, and evidence covers three contact-rich task pipelines on one single-arm setup. It does not establish general compatibility, cross-task transfer, cross-sensor reliability, or a complete released deployment stack.',
    sourceReviewed: '2026-08-22',
  },
];

export const robotAiRobotRelations: RobotAiRobotRelation[] = [
  {
    modelId: 'univtac-encoder',
    robotId: 'franka-panda-univtac-gelsight-mini-simulation-configuration',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Simulated Franka Panda with a parallel-jaw gripper and bilateral simulated GelSight Mini observations'],
    evidenceUrls: ['https://arxiv.org/abs/2602.10093'],
    evidenceBoundary: 'The encoder is integrated into ACT and evaluated on eight simulated UniVTAC tasks using 100 rollouts per method-task. The author-reported 48.0% average applies to this simulated protocol and does not establish physical Panda performance, independent reproduction, or universal sensor support.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'univtac-encoder',
    robotId: 'tianji-marvin-univtac-gf225-configuration',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Tianji Marvin 7-DoF arm with a parallel gripper, wrist RGB camera, and bilateral ViTai GF225 sensors'],
    evidenceUrls: ['https://arxiv.org/abs/2602.10093'],
    evidenceBoundary: 'The paper reports 20 physical rollouts per method-task for Insert Tube, Insert USB, and Bottle Upright on this configuration, with human-observed binary success. The 68.3% tactile-policy average is author-reported and does not establish cross-robot transfer, independent replication, or production reliability.',
    sourceReviewed: '2026-08-22',
  },
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
    robotId: 'universal-robots-ur5',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['Universal Robots UR5 (represented in the Open X-Embodiment pretraining mixture)'],
    evidenceUrls: ['https://arxiv.org/abs/2405.12213'],
    evidenceBoundary: 'The Octo paper’s pretraining mixture includes Berkeley Autolab UR5 data. This records training coverage for a legacy UR5 without resolving the CB controller revision and does not imply that every Octo checkpoint or upstream Open X-Embodiment snapshot uses an identical UR5 contribution.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'octo',
    robotId: 'universal-robots-ur5',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Universal Robots UR5 (zero-shot evaluation; not normalized to UR5e)'],
    evidenceUrls: ['https://arxiv.org/abs/2405.12213'],
    evidenceBoundary: 'Octo is evaluated on two physical UR5 tasks with ten trials per task. “Zero-shot” means no target-task fine-tuning; it does not mean the UR5 embodiment was absent from pretraining, and the source does not identify this legacy UR5 as UR5e.',
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
    modelId: 'octo',
    robotId: 'aloha-bimanual-teleoperation-setup',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Trossen ViperX and ALOHA configurations (fine-tuned-policy evaluation)'],
    evidenceUrls: ['https://arxiv.org/abs/2405.12213'],
    evidenceBoundary: 'The Octo paper evaluates a physical Berkeley bimanual ALOHA setup after reinitializing a 14-dimensional action head and fine-tuning on target ALOHA demonstrations. This is not zero-shot base-checkpoint transfer, does not imply ALOHA data in Octo pretraining, and does not apply to ALOHA 2.',
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
    modelId: 't-rex',
    robotId: 'dexmate-vega-1-sharpa-wave-configuration',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['Fixed-base bimanual Dexmate Vega-1 with two 22-DoF Sharpa Wave hands'],
    evidenceUrls: ['https://arxiv.org/abs/2606.17055'],
    evidenceBoundary: 'The T-Rex paper reports tactile-reactive midtraining on data collected with this fixed-base bimanual configuration. The edge does not imply training across multiple robot platforms, release of the complete 100-hour corpus, or transfer to another hand, sensor, or embodiment.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 't-rex',
    robotId: 'dexmate-vega-1-sharpa-wave-configuration',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Fixed-base bimanual Dexmate Vega-1 with two 22-DoF Sharpa Wave hands'],
    evidenceUrls: ['https://arxiv.org/abs/2606.17055'],
    evidenceBoundary: 'The authors evaluate T-Rex on 12 contact-rich tasks with 16 randomized rollouts per task on this one research configuration. The source-reported 65% macro-average does not establish independent replication, cross-platform performance, or reliability outside the documented task and scoring protocol.',
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
  {
    modelId: 'tac4loco',
    robotId: 'unitree-g1',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['Unitree G1 model in MJLab simulation with 60 contact geometries per foot'],
    evidenceUrls: ['https://arxiv.org/abs/2608.15766'],
    evidenceBoundary: 'Tac4Loco is trained through reinforcement learning on a Unitree G1 model in MJLab simulation, with 60 simulated contact geometries per foot. This edge records simulated embodiment coverage and must not be interpreted as training on a physical G1 or as evidence for arbitrary G1 configurations.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'tac4loco',
    robotId: 'unitree-g1',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Physical Unitree G1 with bilateral 60-element FSR pressure insoles'],
    evidenceUrls: ['https://arxiv.org/abs/2608.15766'],
    evidenceBoundary: 'The trained actor is deployed and evaluated on one physical Unitree G1 with research-team bilateral 60-element FSR pressure insoles. Physical comparisons are source-reported, generally use ten trials per configuration, and do not establish transfer to other G1 variants, feet, sensors, payloads, or long-duration field use.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'adept',
    robotId: 'kuka-iiwa7-allegro-configuration',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['23-DoF KUKA iiwa7 plus 16-DoF Allegro Hand workbench configuration with two RGB cameras (vision-only student)'],
    evidenceUrls: ['https://arxiv.org/abs/2608.19182'],
    evidenceBoundary: 'ADEPT uses embodiment-specific simulation pretraining and downstream training for this KUKA-Allegro configuration. The KUKA student is vision-only, each downstream task is trained independently, and this relation does not imply physical-robot training, tactile input, or one checkpoint shared with the Flexiv-Sharpa setup.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'adept',
    robotId: 'kuka-iiwa7-allegro-configuration',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['23-DoF KUKA iiwa7 plus 16-DoF Allegro Hand workbench configuration with two RGB cameras (vision-only student)'],
    evidenceUrls: ['https://arxiv.org/abs/2608.19182'],
    evidenceBoundary: 'The paper reports ten physical trials for each KUKA-Allegro FMB star, square-and-round, and dish condition. These author-run results are vision-only and do not establish tactile benefit, independent replication, cross-embodiment transfer, or production reliability.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'adept',
    robotId: 'flexiv-rizon-sharpa-configuration',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['29-DoF Flexiv Rizon plus 22-DoF Sharpa hand workbench configuration with two RGB cameras and five fingertip vision-based tactile sensors'],
    evidenceUrls: ['https://arxiv.org/abs/2608.19182'],
    evidenceBoundary: 'ADEPT uses separate embodiment-specific simulation and downstream training for the Flexiv-Sharpa configuration. This relation does not imply training on a released tactile dataset, reuse of the KUKA checkpoint, or transfer to a different hand, arm, sensor, or task family.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'adept',
    robotId: 'flexiv-rizon-sharpa-configuration',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['29-DoF Flexiv Rizon plus 22-DoF Sharpa hand workbench configuration with two RGB cameras and five fingertip vision-based tactile sensors'],
    evidenceUrls: ['https://arxiv.org/abs/2608.19182'],
    evidenceBoundary: 'In one matched square-and-round insertion condition with ten physical trials per modality, the source reports 3/10 final success for vision-only and 8/10 for visuo-tactile. The result does not establish statistical significance or generalize to other tasks, robots, hands, sensors, or operating environments.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'vitar',
    robotId: 'realman-rm65b-vitar-tactile-configuration',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['6-DoF RealMan RM65-B with a DH Robotics PGIA-series parallel-jaw gripper, dual 9DTact sensors, and wrist plus third-person RealSense D455 cameras'],
    evidenceUrls: ['https://arxiv.org/abs/2608.15816'],
    evidenceBoundary: 'The paper reports three physical tasks with 20 binary-success trials per method-task pair on this configuration. It does not justify transfer to another RM65-B, gripper, sensor, camera layout, or task family.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'retouch',
    robotId: 'xhand-ur7e-retouch-configuration',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['UR7e arm with an XHand five-finger tactile dexterous hand, one wrist RGB camera, and two fixed external RGB cameras'],
    evidenceUrls: ['https://arxiv.org/abs/2608.01824'],
    evidenceBoundary: 'The paper supports 900 successful demonstrations collected on this platform, with 800 used in the common training pool and 100 held out for diagnostics. It does not disclose per-task counts or a public split manifest.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'retouch',
    robotId: 'xhand-ur7e-retouch-configuration',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['UR7e arm with an XHand five-finger tactile dexterous hand, one wrist RGB camera, and two fixed external RGB cameras'],
    evidenceUrls: ['https://arxiv.org/abs/2608.01824'],
    evidenceBoundary: 'The paper reports 20 rollouts per method-task under the seven-task standard protocol and 20 rollouts per method-setting under four challenges. Most reported scores are graded normalized task scores rather than binary completion.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'tau-touch-augmented-vla',
    robotId: 'franka-research-3-dm-tac-ws-tau-configuration',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['Franka Research 3 with a Franka Hand whose fingers are replaced by bilateral DM-Tac WS sensors, two RealSense D435i cameras, and one wrist RealSense D405'],
    evidenceUrls: ['https://arxiv.org/abs/2607.24485'],
    evidenceBoundary: 'The paper reports 100 synchronized teleoperated demonstrations per task across four tasks on this one configuration. TacAura was announced but no downloadable corpus or license was verified.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'tau-touch-augmented-vla',
    robotId: 'franka-research-3-dm-tac-ws-tau-configuration',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Franka Research 3 with a Franka Hand whose fingers are replaced by bilateral DM-Tac WS sensors, two RealSense D435i cameras, and one wrist RealSense D405'],
    evidenceUrls: ['https://arxiv.org/abs/2607.24485'],
    evidenceBoundary: 'The paper reports 20 physical trials per model-task pair across four tasks. Baselines marked with a dagger were adapted to this tactile setup, and the fixed τ variants must not be merged into one synthetic best-task checkpoint.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'unitacvla',
    robotId: 'realman-rm75b-dm-tac-w-unitacvla-configuration',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['RealMan RM75B with a 3D-printed parallel gripper, bilateral DM-Tac W fingertip sensors, a wrist RealSense D405, and a first-person RealSense L515'],
    evidenceUrls: ['https://arxiv.org/abs/2606.31723'],
    evidenceBoundary: 'The paper reports approximately one hour of demonstrations per subtask across eight subtasks on this configuration, but does not disclose trajectory counts, an aggregate duration, a split manifest, or a public dataset.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'unitacvla',
    robotId: 'realman-rm75b-dm-tac-w-unitacvla-configuration',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['RealMan RM75B with a 3D-printed parallel gripper, bilateral DM-Tac W fingertip sensors, a wrist RealSense D405, and a first-person RealSense L515'],
    evidenceUrls: ['https://arxiv.org/abs/2606.31723'],
    evidenceBoundary: 'The paper reports 50 trials for each of eight clean and eight perturbed subtask settings on this configuration. It publishes per-setting results but no aggregate mean and does not establish cross-robot or cross-sensor transfer.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'vla-touch',
    robotId: 'franka-panda-robotiq-gelsight-vla-touch-configuration',
    relation: 'trainedAcross',
    sourceEmbodimentLabels: ['Franka Emika Panda with a Robotiq 2F-140 gripper, one GelSight Mini on one gripper finger, and overhead plus wrist RealSense cameras'],
    evidenceUrls: ['https://arxiv.org/abs/2507.17294'],
    evidenceBoundary: 'The paper reports task-specific RDT fine-tuning without touch and interpolant-controller training from 380 demonstrations collected through the three task pipelines on this configuration. It does not establish a tactile-native base VLA or a complete public RDT checkpoint.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'vla-touch',
    robotId: 'franka-panda-robotiq-gelsight-vla-touch-configuration',
    relation: 'evaluatedOn',
    sourceEmbodimentLabels: ['Franka Emika Panda with a Robotiq 2F-140 gripper, one GelSight Mini on one gripper finger, and overhead plus wrist RealSense cameras'],
    evidenceUrls: ['https://arxiv.org/abs/2507.17294'],
    evidenceBoundary: 'The complete system is evaluated for 20 trials on each of Cup, Wipe, and Peel. The resulting 9/20, 12/20, and 7/20 end-to-end counts remain task- and hardware-specific and do not establish cross-task generalization.',
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
