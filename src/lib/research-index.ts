import { getBlogPostById } from '@/lib/blog-data';
import { canonicalUrl } from '@/lib/seo';

export type EvidenceLevel = 'peer-reviewed' | 'preprint' | 'institutional' | 'documentation';

export const researchIndexUpdatedAt = '2026-07-21';

export interface ResearchIndexEntry {
  id: string;
  title: string;
  url: string;
  year: number;
  publisher: string;
  sourceTitle: string;
  sourceUrl: string;
  sensorPrinciple: string;
  modalities: string[];
  formFactor: string;
  dataOutput: string;
  applications: string[];
  evidence: EvidenceLevel;
  limitations: string;
  reviewedAt: string;
}

type ResearchIndexSupplement = Omit<
  ResearchIndexEntry,
  'id' | 'title' | 'url' | 'sourceTitle' | 'sourceUrl'
> & { id: string };

function toEntry(supplement: ResearchIndexSupplement): ResearchIndexEntry {
  const post = getBlogPostById(supplement.id);

  if (!post) {
    throw new Error(`Research index references missing article: ${supplement.id}`);
  }

  return {
    ...supplement,
    title: post.title,
    url: canonicalUrl(`/research/${post.id}`),
    sourceTitle: post.sourceTitle,
    sourceUrl: post.sourceUrl,
  };
}

const supplements: ResearchIndexSupplement[] = [
  {
    id: 'dream-tac-tactile-world-action-model-2026',
    year: 2026,
    publisher: 'arXiv',
    sensorPrinciple: 'Tactile world-action modeling',
    modalities: ['tactile observation', 'robot action'],
    formFactor: 'Contact-rich robot manipulation system',
    dataOutput: 'Predicted tactile observations conditioned on robot actions',
    applications: ['contact prediction', 'robot manipulation'],
    evidence: 'preprint',
    limitations: 'Preprint evidence; transfer across sensors, tasks, and deployment conditions still requires independent validation.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'single-material-soft-robotic-skin-2025',
    year: 2025,
    publisher: 'University of Cambridge',
    sensorPrinciple: 'Single-material conductive soft skin',
    modalities: ['pressure', 'temperature', 'damage location'],
    formFactor: 'Large-area conformable robotic skin',
    dataOutput: 'Electrical measurements interpreted across the skin surface',
    applications: ['robot body sensing', 'multimodal e-skin'],
    evidence: 'institutional',
    limitations: 'Institutional summary of research; application durability and production-scale integration are not established by the public story alone.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'freetacman-robot-free-visuotactile-data-collection-2025',
    year: 2025,
    publisher: 'arXiv',
    sensorPrinciple: 'Robot-free visuo-tactile data collection',
    modalities: ['vision-based touch', 'contact motion'],
    formFactor: 'Portable tactile data-collection workflow',
    dataOutput: 'Paired tactile observations and interaction trajectories',
    applications: ['tactile dataset collection', 'manipulation learning'],
    evidence: 'preprint',
    limitations: 'Preprint evidence; dataset diversity and transfer to other tactile hardware remain evaluation questions.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'sparsh-x-multisensory-touch-representations-2025',
    year: 2025,
    publisher: 'arXiv',
    sensorPrinciple: 'Multisensory tactile representation learning',
    modalities: ['tactile images', 'audio', 'motion', 'pressure'],
    formFactor: 'Digit 360 multisensory tactile representation model',
    dataOutput: 'Reusable latent touch representations',
    applications: ['physical property inference', 'contact-rich manipulation'],
    evidence: 'preprint',
    limitations: 'Preprint evidence; downstream performance depends on sensor coverage, task data, and evaluation protocol.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'genforce-transferable-force-sensing-2026',
    year: 2026,
    publisher: 'Nature Communications',
    sensorPrinciple: 'Cross-sensor force estimation through shared marker representations',
    modalities: ['three-axis force', 'optical and electronic tactile signals'],
    formFactor: 'Framework spanning GelSight, TacTip, and uSkin sensors',
    dataOutput: 'Estimated contact-force vectors',
    applications: ['force-aware manipulation', 'sensor transfer'],
    evidence: 'peer-reviewed',
    limitations: 'Published evaluation does not establish equivalent accuracy for every sensor geometry, material, or deployment environment.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'mitas-multi-resolution-tactile-imitation-learning-2026',
    year: 2026,
    publisher: 'arXiv',
    sensorPrinciple: 'Multi-resolution tactile imitation learning',
    modalities: ['vision-based touch', 'event-based touch'],
    formFactor: 'Tactile robot-hand learning pipeline',
    dataOutput: 'Time-aligned multisensor tactile features and robot actions',
    applications: ['imitation learning', 'dexterous manipulation'],
    evidence: 'preprint',
    limitations: 'Preprint evidence; benefits may depend on task dynamics, sensor timing, and the selected imitation-learning policy.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'ros2-kilted-tactile-pipeline-2026',
    year: 2026,
    publisher: 'Open Robotics documentation and RoboSkin.ai analysis',
    sensorPrinciple: 'ROS 2 tactile data transport and synchronization',
    modalities: ['pressure', 'shear', 'slip', 'temperature'],
    formFactor: 'Robot middleware pipeline',
    dataOutput: 'Timestamped tactile messages, transforms, and replayable logs',
    applications: ['robot integration', 'tactile dataset logging'],
    evidence: 'documentation',
    limitations: 'Architecture guidance rather than a benchmark; message design and timing requirements remain application-specific.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'humanoid-visual-tactile-action-dataset-2025',
    year: 2025,
    publisher: 'arXiv',
    sensorPrinciple: 'Dense humanoid-hand tactile sensing synchronized with vision, proprioception, and actions',
    modalities: ['egocentric vision', 'third-person vision', 'dense tactile pressure', 'arm and finger proprioception', 'robot actions'],
    formFactor: 'Teleoperated humanoid with two Inspire RH56-DFX dexterous hands and 1,062 tactile sensors per hand',
    dataOutput: '101.9K synchronized visual, 2,124-channel tactile, proprioceptive, and action samples',
    applications: ['soft-object manipulation learning', 'visual-tactile-action policy training', 'dense tactile representation research'],
    evidence: 'preprint',
    limitations: 'Collected on one humanoid embodiment, two soft objects, four strong- or weak-pressure tasks, and three operators; dense signals remained noisy and harder to optimize.',
    reviewedAt: '2026-07-21',
  },
  {
    id: 'wet-slippage-bionic-fingertip-eskin-2026',
    year: 2026,
    publisher: 'Scientific Reports',
    sensorPrinciple: 'Fingerprint-patterned ferroelectric piezoelectric microvibration sensing',
    modalities: ['dynamic slip microvibration', 'surface-material and wetness-dependent waveform'],
    formFactor: 'Fully printed flexible fingertip e-skin mounted on a soft robotic hand',
    dataOutput: 'Slip-voltage waveforms with FFT and STFT features for wetness and surface classification',
    applications: ['wet and oily slip detection', 'robotic grasp monitoring', 'surface-material classification'],
    evidence: 'peer-reviewed',
    limitations: 'Classification used 120 mixed-condition signals and a small set of food objects; closed-loop grip correction, abrasion, cleaning, and long-term surface wear were not demonstrated.',
    reviewedAt: '2026-07-21',
  },
  {
    id: 'spiking-touch-encoding-large-area-eskin-2026',
    year: 2026,
    publisher: 'Nature Communications',
    sensorPrinciple: 'Fiber Bragg Grating strain sensing with event-driven spiking neural decoding',
    modalities: ['contact strain', 'spike-encoded touch events', 'single- and multi-touch location'],
    formFactor: '135 cm2 silicone forearm-shaped e-skin with 21 FBGs on one optical fiber and a neuromorphic processor',
    dataOutput: 'FBG wavelength shifts converted to spike trains and decoded into two-dimensional contact positions',
    applications: ['large-area touch localization', 'energy-constrained robotic skin', 'safe human-robot interaction'],
    evidence: 'peer-reviewed',
    limitations: 'The work is a 135 cm2 contact-localization demonstrator; error increased with contact count and body-scale transfer was not shown.',
    reviewedAt: '2026-07-21',
  },
  {
    id: 'origami-capacitive-robotic-eskin-2026',
    year: 2026,
    publisher: 'npj Flexible Electronics',
    sensorPrinciple: 'Origami deformation transmission with capacitive normal-force, shear, and proximity sensing',
    modalities: ['normal force', 'shear force', 'contact location', 'conductive-object proximity'],
    formFactor: '60,000 mm2 multilayer origami e-skin mounted as four curved modules on a robotic arm',
    dataOutput: 'Capacitance vectors decoded into load location, force magnitude, shear direction, and proximity',
    applications: ['large-area robot skin', 'collision-aware human-robot interaction', 'multi-point touch localization'],
    evidence: 'peer-reviewed',
    limitations: 'Adjacent loads can merge, proximity sensing is limited to conductive objects, and the multilayer structure still requires broader deployment validation.',
    reviewedAt: '2026-07-21',
  },
  {
    id: 'slip-actuated-etextile-tactile-sensing-2025',
    year: 2025,
    publisher: 'Nature Communications',
    sensorPrinciple: 'Tribovoltaic dynamic-DC slip sensing paired with capacitive normal-force sensing',
    modalities: ['dynamic slip', 'normal force', 'sliding direction and velocity-dependent response'],
    formFactor: 'Stretchable PEDOT:PSS E-textile integrated on robotic fingers',
    dataOutput: 'Self-powered DC slip voltage and capacitive force signals used by a feedback controller',
    applications: ['closed-loop slip mitigation', 'dexterous grasp monitoring', 'robotic manipulation'],
    evidence: 'peer-reviewed',
    limitations: 'Tests used a specific titanium-textile interface and controlled gripper disturbances; durability and coating wear need broader deployment evidence.',
    reviewedAt: '2026-07-21',
  },
  {
    id: 'dexskin-high-coverage-conformable-robotic-skin-2025',
    year: 2025,
    publisher: 'arXiv',
    sensorPrinciple: 'Conformable parallel-plate capacitive taxel skin with cross-instance calibration',
    modalities: ['localized normal force', 'distributed multi-contact patterns'],
    formFactor: 'Tailorable soft skin covering the dome and 294 degrees around parallel-jaw gripper fingers',
    dataOutput: 'Per-taxel capacitance readings and calibrated normal-force heatmaps',
    applications: ['in-hand reorientation', 'elastic-band packaging', 'delicate object manipulation', 'robot learning'],
    evidence: 'preprint',
    limitations: 'Robot experiments used a parallel-jaw gripper; an angular blind spot remains, policy inputs ignore spatial structure, and grounding relies on external jumper wires.',
    reviewedAt: '2026-07-21',
  },
  {
    id: 'full-hand-tactile-sensing-2025',
    year: 2025,
    publisher: 'Nature Machine Intelligence',
    sensorPrinciple: 'Vision-based photometric-stereo sensing of elastomer deformation',
    modalities: ['distributed contact geometry', 'contact location', 'in-hand object pose'],
    formFactor: '15-DoF anthropomorphic hand with 17 vision-based tactile sensors covering 70% of the palmar surface',
    dataOutput: 'Tactile images reconstructed into normal maps, contact geometry, and object-pose estimates',
    applications: ['adaptive multi-object grasping', 'collision-aware replanning', 'dexterous manipulation'],
    evidence: 'peer-reviewed',
    limitations: 'Results come from one custom hand and one task family; the controller assumes known object geometry and coverage is not complete hand or body coverage.',
    reviewedAt: '2026-07-21',
  },
  {
    id: 'temperature-pressure-bimodal-2025',
    year: 2025,
    publisher: 'Journal of Materials Chemistry C',
    sensorPrinciple: 'Review of separate- and shared-output temperature and pressure sensor architectures and decoupling methods',
    modalities: ['pressure', 'temperature'],
    formFactor: 'Survey of flexible layered, sandwich, and stacked bimodal tactile sensors',
    dataOutput: 'Separate or algorithmically decoupled pressure and temperature measurements',
    applications: ['robot tactile and thermal perception', 'human-machine interaction', 'wearable and environmental monitoring'],
    evidence: 'peer-reviewed',
    limitations: 'This is a review rather than a single-device benchmark; crosstalk, environmental interference, interface compatibility, and long-term stability remain unresolved.',
    reviewedAt: '2026-07-21',
  },
  {
    // The DOI includes 2025, but Crossref records formal publication on 2026-01-23.
    id: 'event-based-opto-tactile-2025',
    year: 2026,
    publisher: 'Frontiers in Neuroscience',
    sensorPrinciple: 'Stereo Dynamic Vision Sensors observing deformation-induced light changes in a silicone optical waveguide',
    modalities: ['contact-change events', 'single-touch location'],
    formFactor: 'Flexible silicone optical-waveguide skin viewed laterally by two DVS cameras',
    dataOutput: 'Sparse polarity events clustered and triangulated into two-dimensional contact positions',
    applications: ['large-area soft-robot touch localization', 'low-bandwidth interactive surfaces'],
    evidence: 'peer-reviewed',
    limitations: 'The proof of concept used fixed-depth single presses, did not estimate force or multi-touch, and processed trials offline.',
    reviewedAt: '2026-07-21',
  },
  {
    id: 'large-area-flexible-tactile-arrays-2025',
    year: 2025,
    publisher: 'ACS Applied Electronic Materials',
    sensorPrinciple: 'Skin-inspired rhombic-grid electrode array for spatial contact-force sensing',
    modalities: ['contact-force distribution', 'time-varying contact and slip', 'gesture trajectory'],
    formFactor: 'Large-area high-resolution flexible tactile array designed for curved surfaces',
    dataOutput: 'Spatial contact-force maps and contact-motion direction and velocity estimates',
    applications: ['curved robotic skin', 'slip and gesture detection', 'human-machine interaction'],
    evidence: 'peer-reviewed',
    limitations: 'Published evidence covers controlled curved-surface tests; whole-robot mounting, connector and data-rate behavior, contamination, and field repair are not established.',
    reviewedAt: '2026-07-21',
  },
];

export const researchIndexEntries = supplements.map(toEntry);

const csvColumns: (keyof ResearchIndexEntry)[] = [
  'id',
  'title',
  'url',
  'year',
  'publisher',
  'sourceTitle',
  'sourceUrl',
  'sensorPrinciple',
  'modalities',
  'formFactor',
  'dataOutput',
  'applications',
  'evidence',
  'limitations',
  'reviewedAt',
];

function csvCell(value: string | number | string[]): string {
  const text = Array.isArray(value) ? value.join('; ') : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function serializeResearchIndexCsv(entries = researchIndexEntries): string {
  const rows = entries.map((entry) => csvColumns.map((column) => csvCell(entry[column])).join(','));
  return `${csvColumns.join(',')}\n${rows.join('\n')}\n`;
}
