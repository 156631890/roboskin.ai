import { getBlogPostById } from '@/lib/blog-data';
import { canonicalUrl } from '@/lib/seo';

export type EvidenceLevel = 'peer-reviewed' | 'preprint' | 'institutional' | 'documentation';

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
    formFactor: 'Cross-sensor tactile learning model',
    dataOutput: 'Reusable latent touch representations',
    applications: ['tactile perception', 'cross-sensor learning'],
    evidence: 'preprint',
    limitations: 'Preprint evidence; downstream performance depends on sensor coverage, task data, and evaluation protocol.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'genforce-transferable-force-sensing-2026',
    year: 2026,
    publisher: 'Nature Communications',
    sensorPrinciple: 'Transferable camera-based force estimation',
    modalities: ['three-axis force', 'tactile images'],
    formFactor: 'Vision-based tactile sensor',
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
