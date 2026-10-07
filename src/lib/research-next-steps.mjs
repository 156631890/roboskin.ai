// These are reading suggestions, not claims that a paper's files use a given format.
const resources = {
  datasets: { id: 'datasets', href: '/datasets', label: 'Check dataset access and reuse', description: 'Compare sensors, tasks, public files and dataset-specific license evidence.' },
  lerobot: { id: 'lerobot', href: '/guides/lerobot-dataset-format', label: 'Inspect an episode data contract', description: 'Learn LeRobot conventions and validation; check the paper’s own format separately.' },
  worksheet: { id: 'worksheet', href: '/tactile-ai#experiment-worksheet', label: 'Plan a reproducible comparison', description: 'Download a blank worksheet for inputs, splits, baselines and measured outcomes.' },
  worldModels: { id: 'world-models', href: '/guides/visuo-tactile-world-models-robot-manipulation', label: 'Compare contact prediction approaches', description: 'Separate predicted touch, planning and demonstrated robot-action evidence.' },
  models: { id: 'tactile-models', href: '/tactile-foundation-models', label: 'Compare tactile model roles', description: 'Check representations, access and transfer limits before choosing a model.' },
  slip: { id: 'slip', href: '/guides/slip-detection-robot-hand', label: 'Follow the slip-detection workflow', description: 'Connect contact signals to detection, recovery and task evaluation.' },
  sensors: { id: 'sensors', href: '/sensors#task-selection', label: 'Choose sensors for your task', description: 'Review task requirements before comparing hardware specifications.' },
  calibration: { id: 'calibration', href: '/guides/tactile-sensor-calibration', label: 'Define what needs calibration', description: 'Keep raw readings, inferred quantities and reference measurements separate.' },
  hands: { id: 'robot-hands', href: '/applications/robot-hand-tactile-sensor', label: 'Review hand coverage and integration', description: 'Work through fingertip, palm and multi-contact sensing requirements.' },
};

/** @type {Record<string, (keyof typeof resources)[]>} */
const articleResources = {
  'bench2dex-visuo-tactile-bimanual-benchmark-2026': ['datasets', 'lerobot', 'worksheet'],
  'dextouch-wm-human-touch-world-model-2026': ['worldModels', 'datasets', 'worksheet'],
  'univtac-platform-encoder-benchmark-2026': ['datasets', 'models', 'worksheet'],
  'slipsense-multimodal-slip-detection-2026': ['slip', 'sensors', 'worksheet'],
  'full-hand-tactile-sensing-2025': ['hands', 'calibration', 'worksheet'],
  'ht-bench-full-hand-tactile-representations-2026': ['datasets', 'hands', 'worksheet'],
  'adept-visuo-tactile-dexterity-rl-2026': ['hands', 'worldModels', 'worksheet'],
  'sparsh-x-multisensory-touch-representations-2025': ['models', 'datasets', 'worksheet'],
};

/** @param {string} articleId */
export function getResearchNextSteps(articleId) {
  return (Object.hasOwn(articleResources, articleId) ? articleResources[articleId] : []).map(key => resources[key]);
}

export const researchJourneyArticleIds = Object.keys(articleResources);
