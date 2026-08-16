export type TactileDatasetEntry = {
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

export const tactileDatasetEntries: TactileDatasetEntry[] = [
  {
    id: 'ht-bench',
    name: 'HT-Bench',
    institution: ['Beihang University', 'Rimbot', 'ShanghaiTech University', 'Tsinghua University', 'Chinese Academy of Sciences', 'BUPT'],
    year: 2026,
    robot: ['Dexterous full-hand platform'],
    sensor: ['Full-hand tactile sensing array'],
    modalities: ['Egocentric RGB', 'Full-hand tactile pressure maps'],
    sampleCount: '10M RGB frames; 7.8M tactile frames; 226 tasks',
    tasks: ['Tactile similarity retrieval', 'Masked tactile inpainting', 'Vision-to-tactile synthesis', 'Tactile frame prediction'],
    objectCategories: 'Home, electronics workbench, chemistry lab, retail, workbench, outdoor, and other scenes; object count not stated.',
    dataFormat: 'Synchronized egocentric RGB and full-hand tactile maps; the benchmark pipeline normalizes tactile maps to 224 x 224.',
    license: 'Dataset license not stated on the reviewed paper page',
    paperUrl: 'https://arxiv.org/abs/2606.19161',
    availability: 'The paper defines the benchmark; no dedicated public dataset download URL was verified on 2026-08-16.',
    sourceReviewed: '2026-08-16',
  },
  {
    id: 'rct',
    name: 'RCT: Robotic Contact Tactile',
    institution: ['TU Dresden', 'ScaDS.AI Dresden/Leipzig', 'LASR Lab'],
    year: 2026,
    robot: ['Robot arm with rotating three-sensor adapter'],
    sensor: ['DIGIT vision-based tactile sensor'],
    modalities: ['Tactile image', 'Material RGB image', 'Language descriptors', 'Normal force', 'Indentation depth'],
    sampleCount: '29,279 tactile frames; 1,832 contact sequences; 122 materials; 3 DIGIT sensors',
    tasks: ['Material generalization', 'Touch-to-text retrieval', 'Touch-to-vision retrieval', 'Sensor-disjoint evaluation'],
    objectCategories: '122 industrial reference materials in 7 categories.',
    dataFormat: 'Ordered contact sequences with material, category, sensor, position, depth, force, image, and descriptor metadata.',
    license: 'CC BY 4.0 dataset; Apache-2.0 code',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    paperUrl: 'https://arxiv.org/abs/2606.31694',
    projectUrl: 'https://faerber-lab.github.io/RCT/',
    githubUrl: 'https://github.com/faerber-lab/RCT',
    datasetUrl: 'https://figshare.com/s/a5ed417ba6602ccad0f6',
    availability: 'Dataset, split tools, and evaluation code are publicly linked by the official project page.',
    sourceReviewed: '2026-08-16',
  },
  {
    id: 'tactidex',
    name: 'TactiDex',
    institution: ['ShanghaiTech University', 'InstAdapt'],
    year: 2026,
    robot: ['Human demonstration capture', 'Bimanual Franka Inspire deployment'],
    sensor: ['Whole-hand tactile glove'],
    modalities: ['Whole-hand pressure map', 'Hand kinematics', 'Object 6D pose', 'Language description', 'Task-phase annotation'],
    sampleCount: 'Not stated on the reviewed project page',
    tasks: ['Single-hand dexterous manipulation', 'Bimanual manipulation', 'Human-to-robot skill transfer'],
    objectCategories: 'Household and tool objects shown in project demonstrations; total object count not stated.',
    dataFormat: 'Synchronized tactile pressure, hand-object kinematics, 6D pose, language, and hierarchical task annotations.',
    license: 'Dataset license not stated on the reviewed project page',
    paperUrl: 'https://arxiv.org/abs/2607.09190',
    projectUrl: 'https://tactidex.github.io/',
    availability: 'The official project page documents the benchmark and demonstrations; no separate dataset download URL was verified.',
    sourceReviewed: '2026-08-16',
  },
  {
    id: 'freetacman',
    name: 'FreeTacMan',
    institution: ['Shanghai Innovation Institute', 'The University of Hong Kong', 'Shanghai Jiao Tong University', 'Fudan University'],
    year: 2025,
    robot: ['Robot-free wearable gripper', 'Piper', 'Franka'],
    sensor: ['Modular LED-based visuo-tactile sensor'],
    modalities: ['Wrist RGB video', 'Visuo-tactile video', 'Tool-center-point pose', 'Gripper distance'],
    sampleCount: 'More than 3M visuo-tactile image pairs; more than 10K trajectories; 50 tasks',
    tasks: ['Contact-rich demonstrations', 'Imitation learning', 'Tactile pretraining', 'Visuo-tactile manipulation'],
    objectCategories: 'Fifty contact-rich task categories; examples include fragile handling, insertion, stamping, texture classification, and calligraphy.',
    dataFormat: 'MP4 wrist and tactile videos plus timestamped trajectory files containing TCP pose, quaternion, Euler angles, and gripper distance.',
    license: 'MIT License',
    licenseUrl: 'https://opensource.org/license/mit',
    paperUrl: 'https://arxiv.org/abs/2506.01941',
    projectUrl: 'https://opendrivelab.com/FreeTacMan',
    githubUrl: 'https://github.com/OpenDriveLab/FreeTacMan',
    datasetUrl: 'https://huggingface.co/datasets/OpenDriveLab/FreeTacMan',
    availability: 'The official project page links the dataset, code, hardware guide, and mirror.',
    sourceReviewed: '2026-08-16',
  },
  {
    id: 'humanoid-vta',
    name: 'Humanoid Visual-Tactile-Action Dataset',
    institution: ['Gwangju Institute of Science and Technology'],
    year: 2025,
    robot: ['Humanoid teleoperation platform', 'Two Inspire RH56-DFX dexterous hands'],
    sensor: ['1,062 tactile sensors per hand', 'Piezoresistive tactile carpet'],
    modalities: ['Egocentric RGB', 'Third-person RGB', 'Dense tactile pressure', 'Arm and finger proprioception', 'Robot action', 'External pressure heatmap'],
    sampleCount: '101.9K synchronized samples; approximately 77-80 episodes per task',
    tasks: ['Towel strong pressure', 'Towel weak pressure', 'Sponge strong pressure', 'Sponge weak pressure'],
    objectCategories: 'Two deformable soft objects (towel and sponge), with rigid-object comparison data described in the paper.',
    dataFormat: 'Synchronized visual, 2,124-channel hand tactile, proprioceptive, action, and external pressure signals; public file format not stated.',
    license: 'Dataset access terms not stated on the reviewed paper page',
    paperUrl: 'https://arxiv.org/abs/2510.25725',
    availability: 'The paper describes the dataset; no official public download URL was verified on 2026-08-16.',
    sourceReviewed: '2026-08-16',
  },
  {
    id: 'sparsh-x',
    name: 'Sparsh-X Multisensory Touch Resource',
    institution: ['FAIR at Meta', 'University of Washington', 'Carnegie Mellon University'],
    year: 2025,
    robot: ['Robot manipulation platforms used for insertion and in-hand rotation'],
    sensor: ['Digit 360'],
    modalities: ['Tactile image', 'Audio', 'Motion', 'Pressure'],
    sampleCount: 'Approximately 1M unlabeled contact-rich interactions',
    tasks: ['Physical-property inference', 'Plug insertion', 'In-hand rotation', 'Tactile adaptation'],
    objectCategories: 'Diverse manipulation interactions; object count and category inventory not stated on the reviewed paper page.',
    dataFormat: 'Four synchronized Digit 360 modalities; public file format not stated on the reviewed paper page.',
    license: 'Dataset license and download URL not stated on the reviewed paper page',
    paperUrl: 'https://arxiv.org/abs/2506.14754',
    availability: 'The paper documents the training resource; a dedicated public dataset URL was not verified.',
    sourceReviewed: '2026-08-16',
  },
];
