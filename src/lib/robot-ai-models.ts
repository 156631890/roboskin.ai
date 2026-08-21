export const robotAiModelCategories = [
  'VLM',
  'VLA',
  'embodied reasoning',
  'world model',
  'robot policy',
  'reward model',
  'tactile model',
] as const;

export const tactileInputStatuses = ['yes', 'no', 'unclear'] as const;

export type RobotAiModelCategory = (typeof robotAiModelCategories)[number];
export type TactileInputStatus = (typeof tactileInputStatuses)[number];

export type RobotAiPrimarySource = {
  label: string;
  url: string;
  type: 'paper' | 'project' | 'model card' | 'official release' | 'code';
};

export type RobotAiModelEntry = {
  id: string;
  name: string;
  organization: string;
  creatorOrganizations: string[];
  releaseDate: string;
  category: RobotAiModelCategory;
  inputModalities: string[];
  outputType: string;
  embodiments: string[];
  trainingDataSummary: string;
  realRobotEvaluation: string;
  availability: string;
  license: string;
  paperUrl: string | null;
  projectUrl: string;
  tactileInput: TactileInputStatus;
  evidenceLimitations: string;
  primarySources: RobotAiPrimarySource[];
  sourceReviewed: string;
};

export const robotAiModelEntries: RobotAiModelEntry[] = [
  {
    id: 'gemini-robotics-2',
    name: 'Gemini Robotics 2',
    organization: 'Google DeepMind',
    creatorOrganizations: ['Google DeepMind'],
    releaseDate: '2026-07-30',
    category: 'VLA',
    inputModalities: ['Text instruction', 'RGB image'],
    outputType: 'Motor-control actions',
    embodiments: [
      'Apptronik Apollo 2 humanoid with Inspire hands',
      'Apptronik Apollo 2 humanoid with SharpaWave hand',
      'Franka Duo',
    ],
    trainingDataSummary: 'The reviewed official model page and release post do not disclose the training-mixture composition, example count, or complete data provenance.',
    realRobotEvaluation: 'Google DeepMind reports developer-run whole-body, multi-finger, and parallel-gripper task trials on Apollo 2 and Franka Duo configurations.',
    availability: 'Private preview; organizations can join the official early-access waitlist.',
    license: 'Model weights and a reusable model license are not publicly disclosed; access is governed by private-preview terms.',
    paperUrl: null,
    projectUrl: 'https://deepmind.google/models/gemini-robotics/vla/',
    tactileInput: 'no',
    evidenceLimitations: 'The public model specification lists text and image inputs, not touch. Results are developer-reported on selected hardware and tasks; no public weights, training recipe, neutral cross-platform benchmark, or model-specific research paper was verified.',
    primarySources: [
      {
        label: 'Google DeepMind model page',
        url: 'https://deepmind.google/models/gemini-robotics/vla/',
        type: 'project',
      },
      {
        label: 'Google DeepMind release post',
        url: 'https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/',
        type: 'official release',
      },
    ],
    sourceReviewed: '2026-08-21',
  },
  {
    id: 'gemini-robotics-er-2',
    name: 'Gemini Robotics ER 2',
    organization: 'Google DeepMind',
    creatorOrganizations: ['Google DeepMind'],
    releaseDate: '2026-07-30',
    category: 'embodied reasoning',
    inputModalities: ['Text', 'Image', 'Video', 'Audio'],
    outputType: 'Text, structured plans, and tool or robot-function calls',
    embodiments: ['High-level orchestration for real and simulated robot policies; evaluated hardware inventory not fully disclosed'],
    trainingDataSummary: 'The model card says Gemini Robotics ER 2 uses Gemini 3.5 training data plus additional embodied-reasoning datasets; mixture sizes and item-level provenance are not disclosed.',
    realRobotEvaluation: 'The official release reports task orchestration with a real VLA, a simulated VLA, and human teleoperation, plus video progress and success-detection evaluations.',
    availability: 'Public preview through Google AI Studio and the Gemini API; private preview through Gemini Enterprise Agent Platform.',
    license: 'API access is subject to Google service terms; model weights are not released under an open model license.',
    paperUrl: null,
    projectUrl: 'https://deepmind.google/models/gemini-robotics/embodied-reasoning/',
    tactileInput: 'no',
    evidenceLimitations: 'The model card lists text, image, video, and audio inputs rather than touch, and output is text rather than low-level motor action. Google advises against safety-critical use; many limitations inherit from the Gemini 3.5 Flash model card, and no model-specific paper or weights were verified.',
    primarySources: [
      {
        label: 'Google DeepMind model page',
        url: 'https://deepmind.google/models/gemini-robotics/embodied-reasoning/',
        type: 'project',
      },
      {
        label: 'Google DeepMind model card',
        url: 'https://deepmind.google/models/model-cards/gemini-robotics-er-2/',
        type: 'model card',
      },
    ],
    sourceReviewed: '2026-08-21',
  },
  {
    id: 'rt-2',
    name: 'RT-2',
    organization: 'Google DeepMind',
    creatorOrganizations: ['Google DeepMind'],
    releaseDate: '2023-07-28',
    category: 'VLA',
    inputModalities: ['Robot-camera image', 'Natural-language instruction'],
    outputType: 'Tokenized robot actions',
    embodiments: [
      'Google RT-series 7-DoF mobile manipulator (hardware model not disclosed)',
      'Language Table setup (RT-2-PaLI-3B simulation and qualitative real-world evaluation)',
    ],
    trainingDataSummary: 'PaLM-E- and PaLI-X-based variants were co-fine-tuned on web-scale vision-language data and RT-1 robot demonstrations gathered with 13 robots over 17 months.',
    realRobotEvaluation: 'The paper reports 6,000 evaluation trials covering seen and unseen task conditions on the authors’ real-robot setup, alongside Language Table simulation tests.',
    availability: 'Paper and official technical description are public; model weights and a runnable training implementation were not released.',
    license: 'No public model-weight license was disclosed because weights were not released.',
    paperUrl: 'https://arxiv.org/abs/2307.15818',
    projectUrl: 'https://deepmind.google/blog/rt-2-new-model-translates-vision-and-language-into-action/',
    tactileInput: 'no',
    evidenceLimitations: 'RT-2 is a closed research model evaluated mainly within the authors’ mobile-manipulation environment. Its image-and-language interface does not document tactile input, and reported generalization should not be transferred to untested robots, sensors, tasks, or safety conditions.',
    primarySources: [
      {
        label: 'RT-2 paper',
        url: 'https://arxiv.org/abs/2307.15818',
        type: 'paper',
      },
      {
        label: 'Google DeepMind RT-2 release',
        url: 'https://deepmind.google/blog/rt-2-new-model-translates-vision-and-language-into-action/',
        type: 'official release',
      },
    ],
    sourceReviewed: '2026-08-21',
  },
  {
    id: 'palm-e',
    name: 'PaLM-E',
    organization: 'Google Research and Technische Universität Berlin',
    creatorOrganizations: ['Google Research', 'Technische Universität Berlin'],
    releaseDate: '2023-03-10',
    category: 'VLM',
    inputModalities: ['Text', 'RGB image', 'Robot state', 'Neural scene representation'],
    outputType: 'Autoregressive text, answers, and high-level robot decisions',
    embodiments: [
      'Google mobile manipulator in the kitchen environment (hardware model not disclosed)',
      'Language Table setup (real and simulated)',
      'Simulated task-and-motion-planning agent',
    ],
    trainingDataSummary: 'PaLM-E jointly trains embodied-task data with language, vision, and vision-language data by injecting continuous sensor encodings into a pretrained language model.',
    realRobotEvaluation: 'The paper and Google Research post describe evaluation in three robot environments, two using real robots, with a separate low-level language-to-action policy executing generated decisions.',
    availability: 'Paper and research description are public; model weights and a public inference endpoint were not released.',
    license: 'No public model-weight license was disclosed because weights were not released.',
    paperUrl: 'https://arxiv.org/abs/2303.03378',
    projectUrl: 'https://research.google/blog/palm-e-an-embodied-multimodal-language-model/',
    tactileInput: 'no',
    evidenceLimitations: 'PaLM-E produces text or high-level decisions and relies on a separate low-level policy for physical execution. The documented modalities do not include touch, weights are closed, and results from two real-robot environments do not establish deployment reliability across arbitrary embodiments.',
    primarySources: [
      {
        label: 'PaLM-E paper',
        url: 'https://arxiv.org/abs/2303.03378',
        type: 'paper',
      },
      {
        label: 'Google Research PaLM-E post',
        url: 'https://research.google/blog/palm-e-an-embodied-multimodal-language-model/',
        type: 'official release',
      },
    ],
    sourceReviewed: '2026-08-21',
  },
  {
    id: 'openvla-7b',
    name: 'OpenVLA 7B',
    organization: 'Stanford University, UC Berkeley, Toyota Research Institute, Google DeepMind, Physical Intelligence, and MIT',
    creatorOrganizations: ['Stanford University', 'UC Berkeley', 'Toyota Research Institute', 'Google DeepMind', 'Physical Intelligence', 'MIT'],
    releaseDate: '2024-06-13',
    category: 'VLA',
    inputModalities: ['Natural-language instruction', 'RGB robot observation'],
    outputType: 'Discretized robot actions',
    embodiments: [
      'Trossen WidowX 250 6-DoF (zero-shot evaluation)',
      'Google RT-series mobile manipulator (zero-shot evaluation)',
      'Franka Emika Panda tabletop setup (fine-tuned-policy evaluation)',
      'DROID Franka setup (fine-tuned-policy evaluation; exact arm variant not disclosed)',
    ],
    trainingDataSummary: 'The flagship 7B model was trained on 970,000 real-world robot trajectories from the Open X-Embodiment mixture, using a fused DINOv2/SigLIP visual encoder and Llama 2 language backbone.',
    realRobotEvaluation: 'The paper reports real-world evaluation across 29 manipulation tasks and multiple robot embodiments, comparing task success with generalist-policy baselines.',
    availability: 'Training and inference code plus pretrained checkpoints are public through the official project and repository.',
    license: 'Repository code is MIT; the maintainers state that pretrained models can inherit restrictions from their underlying base models, so each checkpoint’s terms must be checked.',
    paperUrl: 'https://arxiv.org/abs/2406.09246',
    projectUrl: 'https://openvla.github.io/',
    tactileInput: 'no',
    evidenceLimitations: 'The released flagship model is vision-language-action rather than tactile. Reported task success is tied to the paper’s action representation, data mixture, platforms, and protocol; “open source” does not remove inherited base-model license restrictions.',
    primarySources: [
      {
        label: 'OpenVLA paper',
        url: 'https://arxiv.org/abs/2406.09246',
        type: 'paper',
      },
      {
        label: 'OpenVLA project',
        url: 'https://openvla.github.io/',
        type: 'project',
      },
      {
        label: 'OpenVLA repository',
        url: 'https://github.com/openvla/openvla',
        type: 'code',
      },
    ],
    sourceReviewed: '2026-08-21',
  },
  {
    id: 'octo',
    name: 'Octo',
    organization: 'UC Berkeley, Stanford University, Carnegie Mellon University, and Google DeepMind',
    creatorOrganizations: ['UC Berkeley', 'Stanford University', 'Carnegie Mellon University', 'Google DeepMind'],
    releaseDate: '2024-05-20',
    category: 'robot policy',
    inputModalities: ['Natural-language instruction', 'Goal image', 'Camera-observation history', 'Optional task-specific observations after fine-tuning'],
    outputType: 'Continuous robot-action distributions through a diffusion head',
    embodiments: [
      'Trossen WidowX 250 6-DoF (zero-shot evaluation)',
      'Universal Robots UR5 (zero-shot evaluation; not normalized to UR5e)',
      'Google RT-series mobile manipulator / proprietary RT-1 Robot (zero-shot evaluation)',
      'Trossen ViperX and ALOHA configurations (fine-tuned-policy evaluation)',
      'Five additional real-robot setups with incomplete or family-level hardware disclosure',
    ],
    trainingDataSummary: 'Octo was pretrained on 800,000 robot trajectories drawn from 25 datasets in Open X-Embodiment, spanning heterogeneous robots, camera configurations, action spaces, and task labels.',
    realRobotEvaluation: 'The paper evaluates zero-shot control and approximately 100-demonstration fine-tuning across nine real-robot setups, including new observations, action spaces, and embodiments.',
    availability: 'Octo-Small and Octo-Base checkpoints, training code, fine-tuning code, and data loaders are public.',
    license: 'MIT License for the official repository; upstream datasets retain their own licenses and terms.',
    paperUrl: 'https://arxiv.org/abs/2405.12213',
    projectUrl: 'https://octo-models.github.io/',
    tactileInput: 'no',
    evidenceLimitations: 'The released pretrained interface is camera-based and does not document touch. One fine-tuning experiment adds force-torque input, which is not evidence of a general tactile model. Zero-shot performance degrades on novel scenes and behaviors in the paper’s own analysis.',
    primarySources: [
      {
        label: 'Octo paper',
        url: 'https://arxiv.org/abs/2405.12213',
        type: 'paper',
      },
      {
        label: 'Octo project',
        url: 'https://octo-models.github.io/',
        type: 'project',
      },
      {
        label: 'Octo repository',
        url: 'https://github.com/octo-models/octo',
        type: 'code',
      },
    ],
    sourceReviewed: '2026-08-21',
  },
  {
    id: 'pi0',
    name: 'π0 (Pi Zero)',
    organization: 'Physical Intelligence',
    creatorOrganizations: ['Physical Intelligence'],
    releaseDate: '2024-10-31',
    category: 'VLA',
    inputModalities: ['RGB images', 'Natural-language instruction', 'Low-dimensional robot state'],
    outputType: 'Continuous robot-action chunks generated by flow matching',
    embodiments: [
      'Universal Robots UR5e (single and bimanual configurations)',
      'Trossen ViperX arms (bimanual and mobile configurations)',
      'Franka arm (exact variant not disclosed)',
      'ARX and AgileX bimanual or mobile configurations',
      'Mobile Fibocom configuration',
      'ALOHA and DROID-compatible adaptations in the current OpenPI release',
    ],
    trainingDataSummary: 'The original report combines a pretrained vision-language backbone with diverse robot data from seven configurations and 68 tasks. Current OpenPI base checkpoints report pretraining on more than 10,000 hours of robot data.',
    realRobotEvaluation: 'The original release evaluates five complex real-world task families, including laundry folding, table bussing, grocery bagging, box assembly, and object retrieval.',
    availability: 'OpenPI publishes Apache-2.0 code, base checkpoints, and selected task-specific checkpoints; the maintainers warn that adaptation to a new platform may fail.',
    license: 'Apache-2.0 for the OpenPI repository; users must also follow the licenses attached to checkpoints, base-model components, and training datasets.',
    paperUrl: 'https://www.pi.website/download/pi0.pdf',
    projectUrl: 'https://www.pi.website/blog/pi0',
    tactileInput: 'no',
    evidenceLimitations: 'The published input schema uses images, language, and robot state rather than touch. Original comparisons use the authors’ scoring rubric and platforms; current open checkpoints and code have evolved since the 2024 report and do not guarantee reproduction on other hardware.',
    primarySources: [
      {
        label: 'π0 technical report',
        url: 'https://www.pi.website/download/pi0.pdf',
        type: 'paper',
      },
      {
        label: 'Physical Intelligence π0 release',
        url: 'https://www.pi.website/blog/pi0',
        type: 'official release',
      },
      {
        label: 'OpenPI repository',
        url: 'https://github.com/Physical-Intelligence/openpi',
        type: 'code',
      },
    ],
    sourceReviewed: '2026-08-21',
  },
  {
    id: 'isaac-gr00t-n1',
    name: 'Isaac GR00T N1',
    organization: 'NVIDIA',
    creatorOrganizations: ['NVIDIA'],
    releaseDate: '2025-03-17',
    category: 'VLA',
    inputModalities: ['Natural-language instruction', 'RGB image', 'Robot state'],
    outputType: 'Robot actions from a vision-language module and diffusion-transformer action module',
    embodiments: ['Fourier GR-1 humanoid', '1X humanoid', 'Multiple simulated robot embodiments'],
    trainingDataSummary: 'NVIDIA reports a mixture of egocentric human video, real robot trajectories, simulated robot trajectories, and synthetic data; complete example counts and item-level provenance are not disclosed in the research page.',
    realRobotEvaluation: 'The N1 research page reports language-conditioned bimanual household manipulation on Fourier GR-1 and 1X humanoids, plus simulation benchmarks across embodiments.',
    availability: 'The Isaac-GR00T repository publishes code and model checkpoints; the maintained family has advanced beyond the paper’s N1 release.',
    license: 'Repository code is Apache-2.0 and model weights use the NVIDIA Open Model License; exact terms must be checked for the selected version.',
    paperUrl: 'https://arxiv.org/abs/2503.14734',
    projectUrl: 'https://research.nvidia.com/publication/2025-03_nvidia-isaac-gr00t-n1-open-foundation-model-humanoid-robots',
    tactileInput: 'no',
    evidenceLimitations: 'The N1 report does not document tactile input. Real-robot evidence is developer-reported on named humanoids and household tasks; current repository defaults may implement later N1-family versions, so version-matched checkpoints and evaluations are required.',
    primarySources: [
      {
        label: 'GR00T N1 paper',
        url: 'https://arxiv.org/abs/2503.14734',
        type: 'paper',
      },
      {
        label: 'NVIDIA Research publication page',
        url: 'https://research.nvidia.com/publication/2025-03_nvidia-isaac-gr00t-n1-open-foundation-model-humanoid-robots',
        type: 'project',
      },
      {
        label: 'Isaac-GR00T repository',
        url: 'https://github.com/NVIDIA/Isaac-GR00T',
        type: 'code',
      },
    ],
    sourceReviewed: '2026-08-21',
  },
  {
    id: 'dream-tac',
    name: 'Dream-Tac',
    organization: 'Research team listed in the primary paper',
    creatorOrganizations: [],
    releaseDate: '2026-06-07',
    category: 'world model',
    inputModalities: ['Visual observation', 'Tactile observation', 'Robot state and action context'],
    outputType: 'Robot actions plus predicted future visual and tactile observations',
    embodiments: ['Franka Emika Panda with dual RealSense D435i cameras and two Xense Photon fingertip sensors'],
    trainingDataSummary: 'The preprint describes task-specific synchronized visual, tactile, and action demonstrations for six contact-rich tasks; the abstract does not disclose a universal dataset or total trajectory count.',
    realRobotEvaluation: 'The authors report six real-world contact-rich manipulation tasks and action-prediction comparisons, together with training and inference speed measurements.',
    availability: 'The official code repository is public; a separately licensed, generally reusable model checkpoint was not verified.',
    license: 'Apache-2.0 for the official code repository; model-weight and dataset licenses were not separately disclosed in the reviewed sources.',
    paperUrl: 'https://arxiv.org/abs/2606.08737',
    projectUrl: 'https://github.com/LYFCLOUDFAN/Dream-Tac',
    tactileInput: 'yes',
    evidenceLimitations: 'Dream-Tac is a 2026 preprint evaluated on six source-specific tasks and one research pipeline. Action accuracy and speed do not establish cross-sensor or cross-robot reliability, independent replication, safe deployment, or general-purpose foundation-model behavior.',
    primarySources: [
      {
        label: 'Dream-Tac preprint',
        url: 'https://arxiv.org/abs/2606.08737',
        type: 'paper',
      },
      {
        label: 'Dream-Tac official repository',
        url: 'https://github.com/LYFCLOUDFAN/Dream-Tac',
        type: 'code',
      },
    ],
    sourceReviewed: '2026-08-21',
  },
  {
    id: 'sparsh',
    name: 'Sparsh',
    organization: 'FAIR at Meta, University of Washington, and Carnegie Mellon University',
    creatorOrganizations: ['FAIR at Meta', 'University of Washington', 'Carnegie Mellon University'],
    releaseDate: '2024-10-31',
    category: 'tactile model',
    inputModalities: ['Short temporal window of vision-based tactile images'],
    outputType: 'Reusable tactile latent representation for downstream decoders and policies',
    embodiments: ['DIGIT and GelSight-family tactile sensors in TacBench', 'Franka robot arm in the bead-maze policy demonstration'],
    trainingDataSummary: 'The current project page describes about 661,000 curated tactile samples, while the initial paper abstract reports pretraining on more than 460,000 images; the difference reflects source/version scope and is retained explicitly.',
    realRobotEvaluation: 'Sparsh is evaluated through six TacBench tasks; the project also demonstrates frozen representations feeding a diffusion policy for a Franka bead-maze task.',
    availability: 'Official code, dataset links, paper, and model resources are public through the project page and repository.',
    license: 'CC BY-NC 4.0 in the official repository; downstream datasets and dependencies can have additional terms.',
    paperUrl: 'https://arxiv.org/abs/2410.24090',
    projectUrl: 'https://sparsh-ssl.github.io/',
    tactileInput: 'yes',
    evidenceLimitations: 'Sparsh is a representation family, not an end-to-end general robot controller. TacBench aggregates heterogeneous task metrics, so its reported average is not one universal score; evidence focuses on vision-based tactile sensors and does not prove transfer to arbitrary robot skin.',
    primarySources: [
      {
        label: 'Sparsh paper',
        url: 'https://arxiv.org/abs/2410.24090',
        type: 'paper',
      },
      {
        label: 'Sparsh project and TacBench',
        url: 'https://sparsh-ssl.github.io/',
        type: 'project',
      },
      {
        label: 'Sparsh official repository',
        url: 'https://github.com/facebookresearch/sparsh',
        type: 'code',
      },
    ],
    sourceReviewed: '2026-08-21',
  },
];

export type RobotAiModelFilters = {
  query?: string;
  category?: RobotAiModelCategory | 'all';
  tactileInput?: TactileInputStatus | 'all';
  year?: string | 'all';
};

export function filterRobotAiModels(
  entries: RobotAiModelEntry[],
  filters: RobotAiModelFilters,
) {
  const query = filters.query?.trim().toLocaleLowerCase() ?? '';
  const shortQueryPattern = query && query.length <= 3 && /^[a-z0-9]+$/i.test(query)
    ? new RegExp(`\\b${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    : null;

  return entries.filter((entry) => {
    const searchable = [
      entry.name,
      entry.organization,
      entry.category,
      entry.outputType,
      entry.trainingDataSummary,
      entry.realRobotEvaluation,
      entry.availability,
      entry.license,
      entry.evidenceLimitations,
      entry.tactileInput,
      entry.projectUrl,
      entry.paperUrl ?? '',
      entry.sourceReviewed,
      ...entry.inputModalities,
      ...entry.embodiments,
      ...entry.primarySources.flatMap((source) => [source.label, source.type, source.url]),
    ].join(' ').toLocaleLowerCase();

    const matchesQuery = !query || (shortQueryPattern ? shortQueryPattern.test(searchable) : searchable.includes(query));

    return matchesQuery
      && (!filters.category || filters.category === 'all' || entry.category === filters.category)
      && (!filters.tactileInput || filters.tactileInput === 'all' || entry.tactileInput === filters.tactileInput)
      && (!filters.year || filters.year === 'all' || entry.releaseDate.startsWith(`${filters.year}-`));
  });
}
