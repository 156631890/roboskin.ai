export type RoboticsDatasetEntry = {
  id: string;
  name: string;
  institution: string[];
  year: number;
  robot: string[];
  sensor: string[];
  modalities: string[];
  sampleCount: string;
  tasks: string[];
  objectCategories: string;
  dataFormat: string;
  license: string;
  licenseUrl?: string;
  paperUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  datasetUrl?: string;
  availability: string;
  sourceReviewed: string;
};

export const roboticsDatasetEntries: RoboticsDatasetEntry[] = [
  {
    id: 'open-x-embodiment',
    name: 'Open X-Embodiment Dataset',
    institution: ['Open X-Embodiment Collaboration: 21 institutions and 34 contributing robotics laboratories reported by the primary paper'],
    year: 2023,
    robot: ['22 robot embodiments across 60 constituent datasets, including single-arm, bimanual, and quadruped platforms'],
    sensor: ['Dataset-dependent cameras and sensors; RGB, depth, and point-cloud coverage varies by constituent dataset, with no standardized tactile channel'],
    modalities: ['RGB image', 'Robot state', 'Robot action', 'Task or language annotation when available', 'Depth or point cloud in subsets'],
    sampleCount: 'The current Open X-Embodiment paper reports more than 1 million real-robot trajectories pooled from 60 datasets, covering 22 embodiments and 527 skills. Later model papers use different mixture snapshots, so their larger counts are not substituted for this dataset record.',
    tasks: ['Cross-embodiment robot manipulation', 'Language-conditioned robot control', 'Generalist policy pretraining and adaptation'],
    objectCategories: 'Common household and manipulation objects distributed across the constituent datasets; the aggregation does not publish one uniform object taxonomy.',
    dataFormat: 'RLDS episodes serialized as TFRecord. Camera counts, action spaces, state fields, task labels, and optional depth or point clouds remain dataset-specific.',
    license: 'The official repository licenses software under Apache-2.0 and other repository materials under CC BY 4.0. Users are also instructed to cite the constituent datasets, whose versions and component-level terms should be checked before reuse.',
    paperUrl: 'https://arxiv.org/abs/2310.08864v9',
    projectUrl: 'https://robotics-transformer-x.github.io/',
    githubUrl: 'https://github.com/google-deepmind/open_x_embodiment',
    datasetUrl: 'https://docs.google.com/spreadsheets/d/1rPBD77tk60AEIGZrGSODwyyzs5FgCU9Uz3h-3_t2A9g/edit#gid=0',
    availability: 'Public dataset inventory, cloud-download instructions, TFDS/RLDS loading examples, and model resources are linked from the official project and repository. This is a versioned aggregation rather than one sensor-homogeneous dataset.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'droid',
    name: 'DROID: Distributed Robot Interaction Dataset',
    institution: ['DROID Dataset Team: 18 research laboratories represented in the current paper; collection was distributed across North America, Asia, and Europe'],
    year: 2024,
    robot: ['Franka Emika Panda 7-DoF arm with Robotiq 2F-85 gripper on the standardized DROID platform'],
    sensor: ['Two external ZED 2 stereo cameras', 'Wrist-mounted ZED Mini stereo camera', 'Meta Quest 2 headset and controllers for teleoperation'],
    modalities: ['Stereo RGB video', 'Depth', 'Camera calibration', 'Robot joint and end-effector state', 'Robot action', 'Gripper state', 'Natural-language instruction', 'Episode and scene metadata'],
    sampleCount: '76,000 successful demonstration trajectories, about 350 hours, 564 scenes, 86 tasks, 52 buildings, and 50 collectors. The release also includes roughly 16,000 failed trajectories that are not counted in the 76,000 headline.',
    tasks: ['In-the-wild object manipulation', 'Language-conditioned imitation learning', 'Cross-scene and cross-object generalization', 'Target-domain co-training'],
    objectCategories: 'A long-tailed set of everyday objects across household, office, laboratory, and other real-world scenes; no single exhaustive category inventory is claimed here.',
    dataFormat: 'The official training release is provided in RLDS format, with a roughly 1.7 TB full set and a 100-trajectory example. Full-HD raw data and optional HDF5 training instructions are documented separately; later language and calibration annotations are published on Hugging Face.',
    license: 'CC BY 4.0 for the DROID dataset as stated by the current paper. The official policy-learning code is MIT licensed; that software license is not treated as the dataset license.',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    paperUrl: 'https://arxiv.org/abs/2403.12945v2',
    projectUrl: 'https://droid-dataset.github.io/',
    githubUrl: 'https://github.com/droid-dataset/droid_policy_learning',
    availability: 'The full RLDS dataset and raw data are publicly documented through official Google Cloud paths. The project also links a visualizer, quick-start notebook, hardware documentation, policy code, and updated annotations.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'bridgedata-v2',
    name: 'BridgeData V2',
    institution: ['University of California, Berkeley', 'Stanford University', 'Carnegie Mellon University', 'Google DeepMind'],
    year: 2023,
    robot: ['Trossen WidowX-250 6DOF arm'],
    sensor: ['Fixed over-the-shoulder RGB-D camera', 'Two position-randomized RGB cameras', 'Wrist RGB camera; multi-view and depth coverage varies by trajectory'],
    modalities: ['RGB image', 'Depth in a subset', 'Robot state', 'Robot action', 'Natural-language task label'],
    sampleCount: '60,096 trajectories across 24 environments and 13 skills: 50,365 teleoperated demonstrations plus 9,731 scripted pick-and-place rollouts. The paper reports interactions with more than 100 objects.',
    tasks: ['Pick and place', 'Pushing and reorientation', 'Sweeping', 'Drawer and door interaction', 'Object stacking', 'Cloth folding', 'Granular-media manipulation'],
    objectCategories: 'More than 100 objects across toy kitchens, tabletops, sinks, laundry setups, and other manipulation environments.',
    dataFormat: 'The raw release contains JPEG, PNG, and pickle files. An official 256 x 256 TensorFlow Datasets version uses RLDS; raw and processed inventories should not be assumed to have identical file counts.',
    license: 'CC BY 4.0 for the dataset as stated in the primary paper; the official training repository is MIT licensed.',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    paperUrl: 'https://arxiv.org/abs/2308.12952v3',
    projectUrl: 'https://rail-berkeley.github.io/bridgedata/',
    githubUrl: 'https://github.com/rail-berkeley/bridge_data_v2',
    datasetUrl: 'https://rail.eecs.berkeley.edu/datasets/bridge_release/data/',
    availability: 'The official project links the raw dataset, a processed TFDS/RLDS release, training code, pretrained checkpoints, and hardware setup instructions.',
    sourceReviewed: '2026-08-22',
  },
];
