// A compact comparison view; existing detailed model records retain their own URLs.
// Every factual cell carries a primary source. Unknowns are intentionally explicit.
export type VlaFact = { text: string; source: string };
export type VlaAccess = 'open' | 'closed' | 'partial' | 'not-found';
export type VlaCatalogEntry = {
  id: string;
  name: string;
  date: string;
  paper: string;
  organization: VlaFact;
  role: 'VLA' | 'Related planner' | 'Related policy';
  code: string | null;
  parameters: VlaFact;
  parameterBillions: number | null;
  vision: boolean;
  language: boolean;
  tactile: boolean;
  modalities: VlaFact;
  access: VlaAccess;
  availability: VlaFact;
  benchmark: VlaFact;
  dataset: VlaFact;
  description: VlaFact;
  detail?: string;
};

export const vlaCatalogReviewed = '2026-10-16';
const fact = (text: string, source: string): VlaFact => ({ text, source });
const paper = (id: string) => `https://arxiv.org/abs/${id}`;
const full = (id: string) => `https://arxiv.org/html/${id}`;
const rt1 = 'https://robotics-transformer1.github.io/';
const rt2 = 'https://robotics-transformer2.github.io/';
const octo = 'https://octo-models.github.io/';
const oft = 'https://openvla-oft.github.io/';
const openpi = 'https://github.com/Physical-Intelligence/openpi';

export const vlaCatalog: VlaCatalogEntry[] = [
  {
    id: 'spark-0', name: 'Spark-0', date: '2026-10-15', paper: paper('2610.22342'), role: 'VLA',
    organization: fact('Xspark AI, Tsinghua University, HKU, HKUST (Guangzhou) and Peking University', 'https://arxiv.org/pdf/2610.22342v1'),
    code: null,
    parameters: fact('Qwen3-VL-4B backbone; total policy parameter count not verified.', 'https://arxiv.org/pdf/2610.22342v1'), parameterBillions: null,
    vision: true, language: true, tactile: true,
    modalities: fact('Vision, language and robot state, with optional online touch. Train-only contact and geometry supervision is removed at inference; tactile-conditioned operation retains regional force histories and 3D taxel inputs (Sections 4.2–4.4).', 'https://arxiv.org/pdf/2610.22342v1'),
    access: 'not-found',
    availability: fact('Paper public. Checked 2026-10-16: project fetch failed and paper-linked GitHub repository returned 404. Weights, usable code, full data and reuse licenses remain unverified; no training or commercial-use permission established.', paper('2610.22342v1')),
    benchmark: fact('Authors report vision-only and tactile-conditioned evaluations on different tracks; RoboSkin has not reproduced them. These are not interchangeable sensor configurations.', paper('2610.22342v1')),
    dataset: fact('Authors describe 1,000 hours of HumanTouch within a mixed pretraining corpus. This does not establish a full public download or supersede earlier HumanTouch subset checks.', paper('2610.22342v1')),
    description: fact('Touch serves as training supervision and optional deployment input. The authors describe one checkpoint using tactile placeholders for vision-only operation or live touch for tactile-conditioned operation; training supervision is not a requirement for a sensor at every deployment.', 'https://arxiv.org/pdf/2610.22342v1'),
  },
  {
    id: 'rt-1', name: 'RT-1', date: '2022-12-13', paper: paper('2212.06817'), role: 'VLA',
    organization: fact('Google Research / Robotics at Google', paper('2212.06817')),
    code: 'https://github.com/google-research/robotics_transformer',
    parameters: fact('35M', full('2212.06817v2')), parameterBillions: 0.035,
    vision: true, language: true, tactile: false,
    modalities: fact('Camera history and language instruction; no tactile input in the described model.', full('2212.06817v2')),
    access: 'open', availability: fact('Open code (Apache-2.0). Code access does not establish release of the full original training corpus or all checkpoints.', 'https://github.com/google-research/robotics_transformer'),
    benchmark: fact('97% success on the authors’ seen-task evaluation; not an unseen-task score.', rt1),
    dataset: fact('Authors’ real-robot demonstration collection.', paper('2212.06817')),
    description: fact('Scales instruction-conditioned robotic control with a transformer that emits discretized actions.', paper('2212.06817')),
  },
  {
    id: 'palm-e', name: 'PaLM-E', date: '2023-03-06', paper: paper('2303.03378'), role: 'Related planner',
    organization: fact('Google Research and TU Berlin', 'https://research.google/blog/palm-e-an-embodied-multimodal-language-model/'),
    code: null, parameters: fact('562B (largest reported variant)', paper('2303.03378')), parameterBillions: 562,
    vision: true, language: true, tactile: false,
    modalities: fact('Images, text and continuous state encodings; outputs text / plans for a separate low-level policy.', paper('2303.03378')),
    access: 'closed', availability: fact('Closed research model; public model code and weights not found in the reviewed project.', 'https://palm-e.github.io/'),
    benchmark: fact('not found — a single robot-action aggregate applicable to all variants; the paper separates embodied and question-answering evaluations.', paper('2303.03378')),
    dataset: fact('Embodied-task data mixed with language, vision and vision-language data.', paper('2303.03378')),
    description: fact('Grounds a language model in continuous observations for embodied reasoning and high-level planning.', paper('2303.03378')),
    detail: '/robot-foundation-models#model-palm-e',
  },
  {
    id: 'diffusion-policy', name: 'Diffusion Policy', date: '2023-03-07', paper: paper('2303.04137'), role: 'Related policy',
    organization: fact('Columbia University, Toyota Research Institute and MIT', 'https://diffusion-policy.cs.columbia.edu/'),
    code: 'https://github.com/real-stanford/diffusion_policy',
    parameters: fact('not found — no single size for the method’s architecture variants', paper('2303.04137')), parameterBillions: null,
    vision: true, language: false, tactile: false,
    modalities: fact('Visual / state-conditioned action diffusion; language and tactile input are not part of the original evaluated interface.', paper('2303.04137')),
    access: 'open', availability: fact('Open code (MIT), training configurations, data and checkpoint links.', 'https://github.com/real-stanford/diffusion_policy'),
    benchmark: fact('46.9% average improvement over prior methods across 12 tasks / 4 benchmarks, as reported in the abstract; this is an improvement, not a success rate.', paper('2303.04137')),
    dataset: fact('Benchmark demonstrations and authors’ real-world demonstrations; task-specific training.', 'https://diffusion-policy.cs.columbia.edu/'),
    description: fact('Generates action sequences by conditional denoising; an influential visuomotor policy rather than a language-conditioned VLA.', paper('2303.04137')),
  },
  {
    id: 'rt-2', name: 'RT-2', date: '2023-07-28', paper: paper('2307.15818'), role: 'VLA',
    organization: fact('Google DeepMind', 'https://deepmind.google/blog/rt-2-new-model-translates-vision-and-language-into-action/'),
    code: null, parameters: fact('12B / 55B (project’s main evaluated variants)', rt2), parameterBillions: 55,
    vision: true, language: true, tactile: false,
    modalities: fact('Robot images and natural-language instructions; no tactile input in the described interface.', paper('2307.15818')),
    access: 'closed', availability: fact('Closed research model; public policy implementation and weights not found. Language Table is a dataset release, not RT-2 code.', rt2),
    benchmark: fact('not found — a single aggregate shared by the variants and evaluation categories; use the paper’s per-condition results.', paper('2307.15818')),
    dataset: fact('Robot demonstrations co-fine-tuned with web-scale vision-language tasks.', paper('2307.15818')),
    description: fact('Represents robot actions as text tokens to transfer vision-language knowledge into control.', paper('2307.15818')),
    detail: '/robot-foundation-models#model-rt-2',
  },
  {
    id: 'octo', name: 'Octo', date: '2024-05-20', paper: paper('2405.12213'), role: 'VLA',
    organization: fact('UC Berkeley, Stanford, Carnegie Mellon and Google DeepMind', octo),
    code: 'https://github.com/octo-models/octo', parameters: fact('27M / 93M (Small / Base)', octo), parameterBillions: 0.093,
    vision: true, language: true, tactile: true,
    modalities: fact('Camera observations, language or goal images. Contact input only in the force/torque fine-tuned peg-insertion variant; base checkpoints do not consume touch.', octo),
    access: 'open', availability: fact('Open code (MIT) with base checkpoints and fine-tuning tools.', 'https://github.com/octo-models/octo'),
    benchmark: fact('0.72 average success in the project’s fine-tuning evaluation; separate from zero-shot results.', octo),
    dataset: fact('800k trajectories from Open X-Embodiment, plus target-task data for adaptation.', paper('2405.12213')),
    description: fact('Provides an adaptable generalist policy with a diffusion head and configurable observation / action spaces.', paper('2405.12213')),
    detail: '/robot-foundation-models#model-octo',
  },
  {
    id: 'openvla', name: 'OpenVLA', date: '2024-06-13', paper: paper('2406.09246'), role: 'VLA',
    organization: fact('Stanford, UC Berkeley, Toyota Research Institute, Google DeepMind, Physical Intelligence and MIT', 'https://openvla.github.io/'),
    code: 'https://github.com/openvla/openvla', parameters: fact('7B', paper('2406.09246')), parameterBillions: 7,
    vision: true, language: true, tactile: false,
    modalities: fact('RGB observations and instructions mapped to discretized actions; no live tactile input in the base release.', paper('2406.09246')),
    access: 'open', availability: fact('Open code (MIT) and weights; pretrained checkpoints inherit base-model restrictions.', 'https://github.com/openvla/openvla'),
    benchmark: fact('76.5% LIBERO mean success for the OpenVLA reference in the OFT paper; a later benchmark evaluation, not the original real-robot aggregate.', paper('2502.19645')),
    dataset: fact('970k real-world demonstrations from an Open X-Embodiment mixture.', paper('2406.09246')),
    description: fact('Makes a pretrained vision-language backbone available for robot action prediction and adaptation.', paper('2406.09246')),
    detail: '/robot-foundation-models#model-openvla-7b',
  },
  {
    id: 'rdt', name: 'RDT (RDT-1B)', date: '2024-10-10', paper: paper('2410.07864'), role: 'VLA',
    organization: fact('Tsinghua University', 'https://rdt-robotics.github.io/rdt-robotics/'),
    code: 'https://github.com/thu-ml/RoboticsDiffusionTransformer', parameters: fact('1.2B (diffusion model)', paper('2410.07864')), parameterBillions: 1.2,
    vision: true, language: true, tactile: false,
    modalities: fact('Images, language and robot state; the original model does not consume tactile feedback.', full('2410.07864v1')),
    access: 'open', availability: fact('Open code, model weights and released data under MIT according to the official repository.', 'https://github.com/thu-ml/RoboticsDiffusionTransformer'),
    benchmark: fact('50% Wash Cup success with unseen cup 2 in the paper’s ablation table; one physical-task condition, not an overall score.', full('2410.07864v1')),
    dataset: fact('Multi-robot pretraining collection and a separately collected bimanual fine-tuning dataset.', paper('2410.07864')),
    description: fact('Scales a diffusion transformer and unified action representation for bimanual manipulation.', paper('2410.07864')),
  },
  {
    id: 'pi0', name: 'π0 (pi0)', date: '2024-10-31', paper: paper('2410.24164'), role: 'VLA',
    organization: fact('Physical Intelligence', paper('2410.24164')),
    code: openpi, parameters: fact('3.3B total in the original paper', full('2410.24164v1')), parameterBillions: 3.3,
    vision: true, language: true, tactile: false,
    modalities: fact('Images, language and proprioception; no tactile input in the original policy.', full('2410.24164v1')),
    access: 'open', availability: fact('Open code (Apache-2.0) and base checkpoints through openpi; upstream model terms also apply.', openpi),
    benchmark: fact('not found — a single original-paper aggregate across its distinct zero-shot and fine-tuned task protocols.', full('2410.24164v1')),
    dataset: fact('Cross-embodiment robot demonstrations, including single-arm, dual-arm and mobile platforms.', paper('2410.24164')),
    description: fact('Combines pretrained vision-language knowledge with flow matching for continuous action chunks.', paper('2410.24164')),
    detail: '/robot-foundation-models#model-pi0',
  },
  {
    id: 'openvla-oft', name: 'OpenVLA-OFT', date: '2025-02-27', paper: paper('2502.19645'), role: 'VLA',
    organization: fact('Stanford University', oft), code: 'https://github.com/moojink/openvla-oft',
    parameters: fact('7B OpenVLA base; exact adapted total not found', paper('2502.19645')), parameterBillions: null,
    vision: true, language: true, tactile: false,
    modalities: fact('Images, instructions and optional proprioception; no tactile input in the reference recipe.', paper('2502.19645')),
    access: 'open', availability: fact('Open code (MIT) and checkpoints; inherited OpenVLA base-model restrictions remain relevant.', 'https://github.com/moojink/openvla-oft'),
    benchmark: fact('97.1% mean success across 4 LIBERO simulation suites in the OFT paper.', paper('2502.19645')),
    dataset: fact('OpenVLA initialization; LIBERO and ALOHA task demonstrations for separate fine-tuning experiments.', paper('2502.19645')),
    description: fact('Optimizes VLA fine-tuning with parallel decoding, action chunking and continuous-action regression.', paper('2502.19645')),
  },
  {
    id: 'gr00t-n1', name: 'GR00T N1', date: '2025-03-18', paper: paper('2503.14734'), role: 'VLA',
    organization: fact('NVIDIA', paper('2503.14734')), code: 'https://github.com/NVIDIA/Isaac-GR00T',
    parameters: fact('2.2B (GR00T-N1-2B release)', full('2503.14734v2')), parameterBillions: 2.2,
    vision: true, language: true, tactile: false,
    modalities: fact('Vision, language and robot state; no tactile input documented for the N1 release.', full('2503.14734v2')),
    access: 'open', availability: fact('Open code (Apache-2.0) and model links; consult the N1 checkpoint’s separate terms and version.', 'https://github.com/NVIDIA/Isaac-GR00T'),
    benchmark: fact('32.1% RoboCasa success with 100 demonstrations per task, paper Table 2; simulation only.', full('2503.14734v2')),
    dataset: fact('Real-robot trajectories, human video and synthetic data.', paper('2503.14734')),
    description: fact('Couples a vision-language reasoning module to a diffusion action module for humanoid control.', paper('2503.14734')),
    detail: '/robot-foundation-models#model-isaac-gr00t-n1',
  },
  {
    id: 'pi05', name: 'π0.5 (pi0.5)', date: '2025-04-22', paper: paper('2504.16054'), role: 'VLA',
    organization: fact('Physical Intelligence', paper('2504.16054')), code: openpi,
    parameters: fact('not found — exact total for the reviewed release', full('2504.16054v1')), parameterBillions: null,
    vision: true, language: true, tactile: false,
    modalities: fact('Images, language and robot state; the reference policy does not document live tactile input.', full('2504.16054v1')),
    access: 'open', availability: fact('Open code (Apache-2.0) and base checkpoints; the repository documents the supported flow-matching head.', openpi),
    benchmark: fact('not found — a single comparable aggregate for the varied home-task evaluation; inspect per-task results.', full('2504.16054v1')),
    dataset: fact('Co-training across robot embodiments, high-level semantic prediction and web-derived data.', paper('2504.16054')),
    description: fact('Studies open-world generalization through heterogeneous co-training and hierarchical action prediction.', paper('2504.16054')),
  },
  {
    id: 'vtla', name: 'VTLA', date: '2025-05-14', paper: paper('2505.09577'), role: 'VLA',
    organization: fact('Samsung R&D Institute China–Beijing, BAAI and Institute of Automation, Chinese Academy of Sciences', full('2505.09577v1')),
    code: null, parameters: fact('Qwen2-VL 7B backbone; complete model total not found', full('2505.09577v1')), parameterBillions: null,
    vision: true, language: true, tactile: true,
    modalities: fact('Visual, tactile and language inputs; temporally encoded tactile observations for insertion.', full('2505.09577v1')),
    access: 'not-found', availability: fact('not found — public implementation or checkpoint in the reviewed paper and project.', 'https://sites.google.com/view/vtla'),
    benchmark: fact('95% triangle / 100% pentagon physical insertion at 0.6 mm clearance, 20 trials per shape; paper Table 7.', full('2505.09577v1')),
    dataset: fact('Authors’ simulated vision–tactile–action–instruction insertion dataset and preference data.', paper('2505.09577')),
    description: fact('Applies preference learning to a vision–tactile–language policy for contact-rich insertion.', paper('2505.09577')),
  },
  {
    id: 'smolvla', name: 'SmolVLA', date: '2025-06-02', paper: paper('2506.01844'), role: 'VLA',
    organization: fact('Hugging Face with Sorbonne University, valeo.ai and ENS Paris-Saclay collaborators', full('2506.01844v1')),
    code: 'https://github.com/huggingface/lerobot', parameters: fact('450M (main model in paper v1)', full('2506.01844v1')), parameterBillions: 0.45,
    vision: true, language: true, tactile: false,
    modalities: fact('Camera images, language and robot state; no tactile input in the reported interface.', full('2506.01844v1')),
    access: 'open', availability: fact('Open LeRobot code (Apache-2.0), with model and dataset releases documented by the authors.', 'https://github.com/huggingface/lerobot'),
    benchmark: fact('87.3% LIBERO average for the 0.45B model in paper v1, Table 2; simulation, without robot-data pretraining in that experiment.', full('2506.01844v1')),
    dataset: fact('Community-collected LeRobot demonstrations; simulation experiments train on their benchmark datasets separately.', full('2506.01844v1')),
    description: fact('Explores a compact VLA and asynchronous inference using accessible robot hardware and community data.', paper('2506.01844')),
  },
  {
    id: 'vla-touch', name: 'VLA-Touch', date: '2025-07-23', paper: paper('2507.17294'), role: 'VLA',
    organization: fact('National University of Singapore', full('2507.17294v2')), code: 'https://github.com/jxbi1010/VLA-Touch',
    parameters: fact('not found — full modular system total; do not substitute the RDT backbone size', full('2507.17294v2')), parameterBillions: null,
    vision: true, language: true, tactile: true,
    modalities: fact('GelSight touch informs language-level planning and action refinement around a non-tactile RDT base policy.', full('2507.17294v2')),
    access: 'partial', availability: fact('Partial open code (MIT), controller/data links; the modified RDT inference script is still described as a future release.', 'https://github.com/jxbi1010/VLA-Touch'),
    benchmark: fact('12/20 Wipe completions for the tactile interpolant controller; manipulation component evaluation, not full planning-plus-execution success.', full('2507.17294v2')),
    dataset: fact('Task-specific tactile demonstrations and pretrained RDT / Octopi components; no single unified training corpus.', full('2507.17294v2')),
    description: fact('Adds tactile feedback at planning and execution levels without fine-tuning the base VLA.', paper('2507.17294')),
    detail: '/robot-vla-models#tactile-vla-vla-touch',
  },
  {
    id: 'omnivtla', name: 'OmniVTLA', date: '2025-08-12', paper: paper('2508.08706'), role: 'VLA',
    organization: fact('Paxini Tech. and Shanghai Jiao Tong University', full('2508.08706v1')), code: null,
    parameters: fact('not found — complete model total in the reviewed source', full('2508.08706v1')), parameterBillions: null,
    vision: true, language: true, tactile: true,
    modalities: fact('Vision, language and tactile signals, with separate paths for visual and force-based tactile sensors.', full('2508.08706v1')),
    access: 'not-found', availability: fact('not found — an official implementation / checkpoint link in the reviewed paper.', paper('2508.08706')),
    benchmark: fact('96.9% gripper / 100% dexterous-hand pick-and-place success in paper v1; different configurations, not one aggregate.', full('2508.08706v1')),
    dataset: fact('ObjTac for semantic tactile alignment, existing visuo-tactile data and robot task demonstrations.', full('2508.08706v1')),
    description: fact('Aligns heterogeneous tactile signals with vision and language for contact-aware action generation.', paper('2508.08706')),
  },
  {
    id: 'forcevla2', name: 'ForceVLA2', date: '2026-03-16', paper: paper('2603.15169'), role: 'VLA',
    organization: fact('Shanghai AI Laboratory, Tongji University, Shanghai Jiao Tong University and collaborators listed in the paper', full('2603.15169v1')), code: null,
    parameters: fact('not found — full adapted model total', full('2603.15169v1')), parameterBillions: null,
    vision: true, language: true, tactile: true,
    modalities: fact('Images, prompts, proprioception and real-time interaction force. Force feedback is not a surface tactile image.', full('2603.15169v1')),
    access: 'closed', availability: fact('Unreleased: the official project labels code and dataset “coming soon”.', 'https://sites.google.com/view/force-vla2/home'),
    benchmark: fact('66.0% mean success over 5 physical contact-rich tasks, 20 trials per task; paper Table 1.', full('2603.15169v1')),
    dataset: fact('ForceVLA2-Dataset: 1,000 trajectories with images, prompts, state and force.', paper('2603.15169')),
    description: fact('Combines force-aware prompting and hybrid force–position action control for contact-rich tasks.', paper('2603.15169')),
  },
  {
    id: 'vitar', name: 'ViTaR', date: '2026-08-16', paper: paper('2608.15816'), role: 'VLA',
    organization: fact('not found — institutional affiliation in the reviewed paper / project', 'https://icr-lab.github.io/ViTaR/'), code: null,
    parameters: fact('not found — full base-plus-adapter total', full('2608.15816v1')), parameterBillions: null,
    vision: true, language: true, tactile: true,
    modalities: fact('Real-time visuo-tactile observations select and scale residual corrections around frozen OpenVLA-OFT actions.', full('2608.15816v1')),
    access: 'closed', availability: fact('Unreleased: the official project labels code “Coming soon”.', 'https://icr-lab.github.io/ViTaR/'),
    benchmark: fact('61.3% UniVTAC average; 48.3% physical-robot average. Separate simulation and physical cohorts.', full('2608.15816v1')),
    dataset: fact('UniVTAC task demonstrations and local decision / branch data for residual adaptation.', full('2608.15816v1')),
    description: fact('Constrains touch to bounded residual selection and scaling around a frozen foundation policy.', paper('2608.15816')),
    detail: '/robot-vla-models#tactile-vla-vitar',
  },
  {
    id: 'vela', name: 'Vela', date: '2026-10-04', paper: paper('2610.05230'), role: 'VLA',
    organization: fact('Fudan University, Shanghai Innovation Institute, CUHK and NovaXBot', 'https://clementine24.github.io/Vela/'), code: null,
    parameters: fact('not found — complete model total', paper('2610.05230')), parameterBillions: null,
    vision: true, language: true, tactile: false,
    modalities: fact('Vision, language and robot state; no live tactile input documented in the reviewed architecture.', paper('2610.05230')),
    access: 'closed', availability: fact('Unreleased: the official project labels code “Coming soon”.', 'https://clementine24.github.io/Vela/'),
    benchmark: fact('45.3% LIBERO-X / 49.7% EBench success; separate simulation benchmarks.', 'https://clementine24.github.io/Vela/'),
    dataset: fact('Public and private cross-embodiment robot trajectories, followed by task-specific post-training.', paper('2610.05230')),
    description: fact('Represents future actions with adaptive-horizon curves instead of fixed-rate action chunks.', paper('2610.05230')),
    detail: '/robot-vla-models#vla-research-update',
  },
];

export type VlaSortKey = 'name' | 'organization' | 'date' | 'parameters';
export type VlaFilters = { year: string; access: string; tactileOnly: boolean; query: string };

export function selectVlaModels(entries: VlaCatalogEntry[], filters: VlaFilters, sort: VlaSortKey, direction: 'asc' | 'desc') {
  const query = filters.query.trim().toLowerCase();
  return entries.filter((entry) =>
    (filters.year === 'all' || entry.date.startsWith(filters.year)) &&
    (filters.access === 'all' || entry.access === filters.access) &&
    (!filters.tactileOnly || entry.tactile) &&
    (!query || `${entry.name} ${entry.organization.text} ${entry.description.text}`.toLowerCase().includes(query)),
  ).sort((a, b) => {
    let order: number;
    if (sort === 'parameters') {
      // Unknown totals stay last in either direction; backbone-only counts are unknown totals.
      if (a.parameterBillions === null) return b.parameterBillions === null ? a.name.localeCompare(b.name, 'en') : 1;
      if (b.parameterBillions === null) return -1;
      order = a.parameterBillions - b.parameterBillions;
    } else {
      const av = sort === 'organization' ? a.organization.text : a[sort];
      const bv = sort === 'organization' ? b.organization.text : b[sort];
      order = av.localeCompare(bv, 'en');
    }
    return (direction === 'asc' ? order : -order) || a.name.localeCompare(b.name, 'en');
  });
}
