import teleoperationRecording from './teleoperation-recording.json';
import datasetAcceptance from './dataset-acceptance.json';
import tactileSensorValidation from './tactile-sensor-validation.json';
import manipulationEvaluation from './manipulation-evaluation.json';
import tactileModelValidation from './tactile-model-validation.json';
import { topicFaqEntries } from '@/content/site';

export type TopicQuestion = {
  id: string;
  role: string;
  question: string;
  answer: string[];
  guide: string;
  sources: string[];
  queries?: string[];
};

const questionsByTopic = {
  'teleoperation-recording': teleoperationRecording,
  'dataset-acceptance': datasetAcceptance,
  'tactile-sensor-validation': tactileSensorValidation,
  'manipulation-evaluation': manipulationEvaluation,
  'tactile-model-validation': tactileModelValidation,
} satisfies Record<(typeof topicFaqEntries)[number]['slug'], TopicQuestion[]>;

export const topicFaqs = topicFaqEntries.map((topic) => ({ ...topic, questions: questionsByTopic[topic.slug] }));
export { topicFaqPath, topicFaqUpdated } from '@/content/site';

type Reference = { label: string; href: string };

export const topicFaqGuides: Record<string, Reference> = {
  teleop: { label: 'Robot teleoperation guide', href: '/robot-teleoperation' },
  robotlearning: { label: 'Robot learning guide', href: '/robot-learning' },
  datasets: { label: 'Robotics dataset selection guide', href: '/robotics-datasets' },
  tactiledata: { label: 'Tactile dataset directory', href: '/datasets' },
  lerobot: { label: 'LeRobot dataset format walkthrough', href: '/guides/lerobot-dataset-format' },
  calibration: { label: 'Tactile sensor calibration method', href: '/guides/tactile-sensor-calibration' },
  maintenance: { label: 'Optical tactile sensor maintenance', href: '/guides/optical-tactile-sensor-maintenance' },
  opticalcapacitive: { label: 'Optical vs capacitive sensor guide', href: '/guides/optical-vs-capacitive-tactile-sensors' },
  flex: { label: 'Flexible tactile array guide', href: '/guides/flexible-tactile-sensor-array' },
  ros2: { label: 'ROS 2 tactile sensing guide', href: '/guides/ros2-tactile-sensing' },
  manipulation: { label: 'Tactile manipulation guide', href: '/tactile-manipulation' },
  benchmarks: { label: 'Tactile benchmark directory', href: '/benchmarks' },
  benchmarkguide: { label: 'Tactile sensor benchmarking guide', href: '/guides/tactile-sensor-benchmark-robot-manipulation' },
  slip: { label: 'Robot hand slip-detection guide', href: '/guides/slip-detection-robot-hand' },
  worldguide: { label: 'Visuo-tactile world model guide', href: '/guides/visuo-tactile-world-models-robot-manipulation' },
  foundation: { label: 'Tactile foundation-model guide', href: '/tactile-foundation-models' },
};

export const topicFaqSources: Record<string, Reference> = {
  droid: { label: 'DROID dataset documentation', href: 'https://droid-dataset.github.io/droid/the-droid-dataset.html' },
  aloha: { label: 'ALOHA 2 teleoperation project', href: 'https://aloha-2.github.io/' },
  rlds: { label: 'RLDS episode and step definitions', href: 'https://github.com/google-research/rlds#dataset-format' },
  lerobot: { label: 'LeRobotDataset v3 format', href: 'https://huggingface.co/docs/lerobot/lerobot-dataset-v3' },
  dagger: { label: 'DAgger paper and interactive imitation setup', href: 'https://proceedings.mlr.press/v15/ross11a.html' },
  'ros-time': { label: 'ROS 2 clock and time design', href: 'https://design.ros2.org/articles/clock_and_time.html' },
  'ros-qos': { label: 'ROS 2 quality-of-service documentation source', href: 'https://github.com/ros2/ros2_documentation/blob/rolling/source/ROS-Framework/interfaces/topics/About-Quality-of-Service-Settings.rst' },
  'ros-camera': { label: 'ROS camera calibration tutorial source', href: 'https://github.com/ros-perception/image_pipeline/blob/rolling/camera_calibration/doc/tutorial_mono.rst' },
  rosbag: { label: 'rosbag2 recording and lost-message statistics', href: 'https://github.com/ros2/rosbag2' },
  'open-x': { label: 'Open X-Embodiment data and release documentation', href: 'https://github.com/google-deepmind/open_x_embodiment' },
  egotouch: { label: 'EgoTouch study and data description', href: 'https://arxiv.org/abs/2605.13083' },
  'fa-irb': { label: 'US informed-consent regulation for covered research', href: 'https://www.govinfo.gov/content/pkg/CFR-2025-title45-vol1/xhtml/CFR-2025-title45-vol1-sec46-116.html' },
  gelsight: { label: 'GelSight Mini manufacturer data sheet', href: 'https://www.gelsight.com/wp-content/uploads/productsheet/Mini/GelSight_Datasheet_GSMini.pdf' },
  icub: { label: 'iCub capacitive robot skin paper', href: 'https://arxiv.org/abs/1411.6837' },
  'gel-paper': { label: 'GelSight sensing and calibration paper', href: 'https://dspace.mit.edu/entities/publication/91f85d41-73e2-4433-af3e-c9a4f5bc982c' },
  luxtac: { label: 'LuxTac three-axis force sensing preprint', href: 'https://arxiv.org/abs/2611.23575' },
  opentac: { label: 'OpenTac custom tactile skin design', href: 'https://opentac.github.io/' },
  reskin: { label: 'ReSkin machine-learning tactile sensing paper', href: 'https://arxiv.org/abs/2111.00071' },
  'nist-uncertainty': { label: 'NIST Guidelines for Evaluating and Expressing Measurement Uncertainty', href: 'https://www.nist.gov/pml/nist-technical-note-1297' },
  rep103: { label: 'ROS REP 103 units and coordinate conventions', href: 'https://github.com/ros-infrastructure/rep/blob/master/rep-0103.rst' },
  bench2dex: { label: 'Bench2Dex benchmark preprint, version 1', href: 'https://arxiv.org/abs/2609.15726v1' },
  tactidex: { label: 'TactiDex physical benchmark project', href: 'https://tactidex.github.io/' },
  calandra: { label: 'More Than a Feeling tactile grasping and regrasping study', href: 'https://arxiv.org/abs/1805.11085' },
  rlbench: { label: 'RLBench official task and variation repository', href: 'https://github.com/stepjam/RLBench' },
  'nist-binomial': { label: 'NIST binomial confidence-interval methods', href: 'https://www.itl.nist.gov/div898/handbook/prc/section2/prc241.htm' },
  gelslip: { label: 'GelSight slip-detection study', href: 'https://arxiv.org/abs/1708.00922' },
  tacinf: { label: 'Tacinf grip-force and policy evaluation, version 1', href: 'https://arxiv.org/abs/2611.29240v1' },
  difftactile: { label: 'DiffTactile simulation project and tasks', href: 'https://difftactile.github.io/' },
  tacex: { label: 'TacEx soft-body and visuo-tactile simulation preprint', href: 'https://arxiv.org/abs/2411.04776' },
  unitacvla: { label: 'UniTacVLA preprint, version 1', href: 'https://arxiv.org/abs/2606.31723v1' },
  omnivtla: { label: 'OmniVTLA preprint, version 1', href: 'https://arxiv.org/abs/2508.08706v1' },
  dreamtac: { label: 'Dream-Tac world-action model preprint', href: 'https://arxiv.org/abs/2606.08737' },
  dextouch: { label: 'DexTouch-WM human-to-robot touch study, version 1', href: 'https://arxiv.org/abs/2609.20649v1' },
  vitacworld: { label: 'ViTacWorld project and evaluation', href: 'https://vitacworld.github.io/' },
  predtac: { label: 'PredTac predicted-touch evaluation, version 1', href: 'https://arxiv.org/abs/2609.15198v1' },
  tacverse: { label: 'TacVerse cross-sensor tactile dataset paper', href: 'https://arxiv.org/abs/2606.25877' },
  univtac: { label: 'UniVTac cross-sensor platform and benchmark paper', href: 'https://arxiv.org/abs/2602.10093' },
};
