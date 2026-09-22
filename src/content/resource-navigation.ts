import type { SeoTopicPage } from '@/content/seo-topic-pages';

export const resourceGoals = [
  { href: '/products', label: 'Learn tactile sensing', description: 'Three learning paths from terminology to hardware and usable robot data.' },
  { href: '/solutions', label: 'Investigate a contact problem', description: 'Start with slip, missing body contact, calibration drift, or data access.' },
  { href: '/sensors', label: 'Compare sensor hardware', description: 'Find sensor principles, documented outputs, software, and source evidence.' },
  { href: '/datasets', label: 'Find data for a robot policy', description: 'Check modalities, file availability, licenses, tasks, and evaluation splits.' },
];

const groupDefinitions = [
  { id: 'foundations', title: 'Understand robot skin and touch', description: 'Definitions and system concepts before choosing a component or model.' },
  { id: 'hardware', title: 'Select and compare tactile sensors', description: 'Sensor hardware, measurement tradeoffs, and evidence for a shortlist.' },
  { id: 'applications', title: 'Match sensing to the robot and task', description: 'Hands, grippers, soft bodies, manipulation, and contact evaluation.' },
  { id: 'models-data', title: 'Compare models, datasets, and benchmarks', description: 'Training inputs, model roles, artifact access, and evaluation protocols.' },
  { id: 'engineering', title: 'Program, calibrate, and record data', description: 'Python, ROS 2, calibration, and dataset-format workflows.' },
  { id: 'papers', title: 'Trace the research and project history', description: 'Paper discovery and the sources behind named research projects.' },
];

export function resourceGroupFor(path: string) {
  if (path.startsWith('/research/')) return 'papers';
  if (['/robotics-programming', '/guides/ros2-tactile-sensing', '/guides/python-tactile-data-processing', '/guides/lerobot-dataset-format', '/guides/tactile-sensor-calibration'].includes(path)) return 'engineering';
  if (path.startsWith('/sensors') || ['/guides/tactile-sensor-for-robots', '/guides/tactile-sensor-benchmark-robot-manipulation', '/guides/flexible-tactile-sensor-array'].includes(path)) return 'hardware';
  if (path.startsWith('/applications/') || ['/humanoid-robot-skin', '/humanoid-robots', '/robot-hands', '/robot-manipulation', '/tactile-manipulation', '/robot-safety', '/guides/slip-detection-robot-hand'].includes(path)) return 'applications';
  if (/models|datasets|benchmarks/.test(path) || ['/robot-learning', '/robot-teleoperation', '/visuo-tactile'].includes(path)) return 'models-data';
  return 'foundations';
}

export function groupResourcePages(pages: SeoTopicPage[]) {
  return groupDefinitions.map((group) => ({
    ...group,
    pages: pages.filter((page) => resourceGroupFor(page.path) === group.id),
  })).filter((group) => group.pages.length > 0);
}
