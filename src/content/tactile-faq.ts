import { faqItems, type FaqItem } from '@/content/site';

type FaqLink = { label: string; href: string };
type TactileFaqItem = FaqItem & {
  id: string;
  href: string;
  ctaLabel: string;
  source?: FaqLink | FaqLink[];
};

type FaqGroup = {
  id: string;
  shortTitle: string;
  title: string;
  questions: TactileFaqItem[];
};

const originalItems = new Map<string, TactileFaqItem>(faqItems.map((item) => [item.id, item]));

function original(id: string): TactileFaqItem {
  const item = originalItems.get(id);
  if (!item) throw new Error(`Unknown original FAQ: ${id}`);
  return item;
}

export const tactileFaqGroups: FaqGroup[] = [
  {
    id: 'touch-fundamentals',
    shortTitle: 'Touch fundamentals',
    title: 'What can a robot sense through touch?',
    questions: [
      original('robot-skin-vs-tactile-sensor'),
      original('simple-touch-sensor'),
      original('touch-in-physical-ai'),
      {
        id: 'force-vs-pressure',
        question: 'What is the difference between contact force and pressure?',
        answer: 'A force is a load, measured in newtons. Pressure is normal force per unit area, measured in pascals. The same normal force can produce very different pressure distributions on a wide pad and a narrow edge. Before comparing two systems, check whether each reports a total force, an average over a stated area, or a spatial pressure map.',
        href: '/glossary#measurement-language', ctaLabel: 'Compare tactile measurement terms',
      },
      {
        id: 'normal-vs-shear',
        question: 'How do normal force and shear force differ on a robot fingertip?',
        answer: 'Normal force acts perpendicular to the local contact surface; shear acts along it. A pressure-only map does not establish the direction or magnitude of shear. If a controller uses shear to detect a change in grip, confirm the reference frame and test both axes under representative normal loads.',
        href: '/guides/tactile-sensor-calibration', ctaLabel: 'Check force-axis calibration',
        source: { label: 'GelSight geometry and force study', href: 'https://www.mdpi.com/1424-8220/17/12/2762' },
      },
      {
        id: 'touch-vs-proprioception',
        question: 'How is tactile sensing different from robot proprioception?',
        answer: 'Proprioception describes the robot’s own state, such as joint position or velocity. A tactile sensor describes an interaction at its surface. A finger can stop moving because it touched an object, hit a travel limit, or met another constraint; a tactile measurement at that finger can help distinguish these cases, if the contact lies within its coverage.',
        href: '/tactile-ai', ctaLabel: 'See how robot observations are combined',
      },
      {
        id: 'touch-and-vision',
        question: 'When does touch add information that a robot camera cannot see?',
        answer: 'Touch is most useful when a decision depends on what happens at a contact the camera cannot observe directly, such as a covered fingertip beginning to slip. Vision still helps before contact and outside the touched area. To measure the extra value of touch, compare against a matched vision baseline with the same objects, visibility, and starting poses.',
        href: '/visuo-tactile', ctaLabel: 'Read the visuo-tactile guide',
        source: { label: 'Learning to grasp and regrasp with vision and touch', href: 'https://arxiv.org/abs/1805.11085' },
      },
      {
        id: 'robot-skin-vs-e-skin',
        question: 'Is electronic skin the same as robot skin?',
        answer: 'The terms overlap, but they describe different things. Electronic skin usually names a sensing material or device; robot skin describes a sensing surface installed as part of a robot. A flexible e-skin prototype becomes relevant to robot integration only when its sensing coverage, mounting, readout, and use on the robot are defined.',
        href: '/guides/robot-skin-vs-e-skin', ctaLabel: 'Compare electronic skin and robot skin',
        source: { label: 'Capacitive skin integrated on iCub', href: 'https://arxiv.org/abs/1411.6837' },
      },
    ],
  },
  {
    id: 'sensors-and-calibration',
    shortTitle: 'Sensors and calibration',
    title: 'How do I choose, mount, and calibrate tactile sensors?',
    questions: [
      original('choose-tactile-sensor'),
      original('tactile-image-force'),
      original('taxel-count'),
      {
        id: 'optical-vs-capacitive',
        question: 'Should I use an optical or capacitive tactile sensor?',
        answer: 'Shortlist an imaging optical fingertip if your task needs local contact shape or deformation images. Shortlist a capacitive array if the priority is distributed contact or normal pressure over a particular surface. Neither category guarantees accurate force or adequate speed. Compare candidate devices at the same contact geometry, calibrated output, and decision deadline.',
        href: '/guides/optical-vs-capacitive-tactile-sensors', ctaLabel: 'Compare optical and capacitive sensing',
        source: { label: 'Experimental comparison of tactile sensors for compliant hands', href: 'https://www.frontiersin.org/journals/robotics-and-ai/articles/10.3389/frobt.2021.704416/full' },
      },
      {
        id: 'gelsight-vs-digit',
        question: 'How should I compare GelSight Mini and DIGIT for a gripper retrofit?',
        answer: 'Use the exact hardware revisions and compare the mounted sensing area, finger clearance, cables, and available data or drivers. Run the same representative contact set on both. If the task requires forces rather than images, compare calibrated force estimates against the same reference. A sharper image does not settle the retrofit decision.',
        href: '/guides/gelsight-vs-digit', ctaLabel: 'Use the GelSight Mini and DIGIT evaluation plan',
        source: { label: 'Original DIGIT design and in-hand experiment', href: 'https://arxiv.org/abs/2005.14679' },
      },
      {
        id: 'eit-robot-skin',
        question: 'What does electrical impedance tomography measure in tactile skin?',
        answer: 'Electrical impedance tomography (EIT) systems use electrical measurements at electrodes to infer where deformation changed a sensing layer. The reconstructed map is an estimate, not an array of individually measured forces. One published preprint pairs EIT with pneumatic pressure to estimate a force map. Do not transfer that result to EIT-only skins without separate calibration evidence.',
        href: '/robot-skin', ctaLabel: 'Compare distributed robot-skin approaches',
        source: { label: 'EIT and pneumatic hybrid skin preprint', href: 'https://arxiv.org/abs/2605.28468' },
      },
      {
        id: 'fingertips-vs-palm',
        question: 'Should I instrument fingertips, the palm, or the entire hand first?',
        answer: 'Instrument the surfaces that actually carry contacts your controller needs to observe. Fingertips are a good starting point for pinching small objects; palm and finger-side coverage matter more when an object rolls, shifts, or rests against them. Mark expected contact zones for each task phase, including likely failures, before extending coverage.',
        href: '/applications/robot-hand-tactile-sensor', ctaLabel: 'Plan fingertip and palm coverage',
      },
      {
        id: 'skin-on-curved-surfaces',
        question: 'How do I evaluate a flexible tactile array on a curved robot surface?',
        answer: 'Calibrate and test the array in its installed curvature, not just flat on a bench. Measure idle offsets after bending, compare responses at the middle and edges, and press across tile seams to find blind zones. If covers or adhesive change how loads spread, repeat the comparison with the intended final stack.',
        href: '/guides/flexible-tactile-sensor-array', ctaLabel: 'Plan a flexible-array installation',
        source: { label: 'Large-scale capacitive skin design and tests', href: 'https://arxiv.org/abs/1411.6837' },
      },
      {
        id: 'calibrate-tactile-sensor',
        question: 'What is a practical first calibration for a robot tactile sensor?',
        answer: 'Start with an unloaded baseline and a reference that measures the same quantity you want to estimate. Apply known loads at representative positions and directions, and reserve separate validation presses. Record error, saturation, repeatability, and how readings change between loading and unloading. Repeat after mounting or replacing a part that changes the contact mechanics.',
        href: '/guides/tactile-sensor-calibration', ctaLabel: 'Run through the calibration checklist',
      },
      {
        id: 'optical-gel-replacement',
        question: 'What should I recheck after replacing an optical tactile sensor’s gel?',
        answer: 'Capture a new no-contact reference and repeat a known set of contacts before reusing thresholds or learned features. Surface wear, contamination, and cartridge changes can alter the image even when the control software is unchanged. Follow the exact device’s maintenance instructions; cleaning, replacement, and recalibration are separate decisions.',
        href: '/guides/optical-tactile-sensor-maintenance', ctaLabel: 'Read the model-specific gel maintenance guide',
      },
      {
        id: 'installed-cost',
        question: 'What should I include in the installed cost of a tactile sensor?',
        answer: 'Compare the whole setup at equal coverage, not only the price of one sensing unit. Count the pads, mounts, cables, readout or compute, calibration effort, replacement parts, and labor needed to restore a known working state. An inexpensive fingertip can be the wrong cost comparison if the task requires sensing across the palm.',
        href: '/guides/how-to-choose-a-tactile-sensor', ctaLabel: 'Build a task-based sensor shortlist',
      },
      {
        id: 'wrist-force-vs-fingertip-touch',
        question: 'Can a wrist force-torque sensor replace tactile fingertips?',
        answer: 'A wrist force-torque sensor can be sufficient when the controller needs the combined load at the wrist. It does not directly report how that load is distributed across fingertips or whether one finger is beginning to lose contact. Use per-finger sensing when those local differences change the action, or test whether a validated wrist-based inference is adequate for the narrower task.',
        href: '/applications/robot-gripper-tactile-sensor', ctaLabel: 'Match a gripper sensor to its contact task',
      },
    ],
  },
  {
    id: 'grasping-and-manipulation',
    shortTitle: 'Grasping and manipulation',
    title: 'When does tactile feedback improve robot manipulation?',
    questions: [
      original('test-slip-detection'),
      {
        id: 'grasp-fragile-objects',
        question: 'How can I test whether touch helps a gripper handle fragile objects?',
        answer: 'Define a successful grasp as both retaining the object and staying within a task-specific damage or deformation criterion. Compare the tactile policy with a fixed-force baseline using the same objects and motions. Record drops and damage separately; a grip that never slips but crushes the part is not an improvement.',
        href: '/applications/robot-gripper-tactile-sensor', ctaLabel: 'Plan an object-handling evaluation',
        source: { label: 'DiffTactile adaptive grasping experiment', href: 'https://difftactile.github.io/' },
      },
      {
        id: 'incipient-vs-gross-slip',
        question: 'What is the difference between incipient slip and gross slip?',
        answer: 'Incipient slip is local sliding within a contact patch while part of the patch still sticks. Gross slip describes sliding across the contact, often visible as relative motion between object and finger. A detector that finds gross motion is not necessarily an early-warning detector. Choose the event your application needs before labeling test data.',
        href: '/guides/slip-detection-robot-hand', ctaLabel: 'Compare slip signals and labeling choices',
        source: { label: 'GelSight geometry and slip study', href: 'https://arxiv.org/abs/1708.00922' },
      },
      {
        id: 'tactile-regrasp',
        question: 'Can touch tell a robot when to regrasp an object?',
        answer: 'Touch can provide evidence for a regrasp, such as an off-center contact or changing contact during a lift. It does not determine the next action on its own. Compare a policy that can adjust its grip with one that cannot, and record both successful recoveries and unnecessary regrasp attempts.',
        href: '/tactile-manipulation', ctaLabel: 'Explore touch-guided manipulation',
        source: { label: 'Calandra and colleagues’ grasp-and-regrasp study', href: 'https://arxiv.org/abs/1805.11085' },
      },
      {
        id: 'peg-in-hole-contact',
        question: 'When is tactile feedback useful for peg-in-hole insertion?',
        answer: 'It can help when the robot needs to distinguish a useful alignment contact from a jam after the peg reaches the opening. Define the actual decision: detect first touch, infer the direction of misalignment, or regulate insertion force. Compare against a vision or wrist-force baseline and report jam, force exceedance, and completion separately.',
        href: '/robot-manipulation', ctaLabel: 'Compare contact-rich manipulation methods',
      },
      {
        id: 'cable-handling',
        question: 'What should I measure when a robot follows or feeds a cable?',
        answer: 'Match the signal to the failure you care about. If the cable escapes the fingers, measure loss of contact and recovery. If it rotates or slides sideways, measure whether the contact estimate tracks that change. A local fingertip observation does not describe the entire cable shape; combine it with other observations if the global configuration matters.',
        href: '/tactile-manipulation#tactile-cable-shape-estimation', ctaLabel: 'Read the cable shape estimation research',
        source: { label: 'DiffTactile cable manipulation example', href: 'https://difftactile.github.io/' },
      },
      {
        id: 'in-hand-manipulation',
        question: 'How is tactile feedback used to move an object inside a robot hand?',
        answer: 'A policy can use the evolving contacts to adjust finger motion while the object rolls or slides inside the hand. The original DIGIT paper demonstrates this for glass marbles with a particular multi-finger setup. For a different hand, test unseen objects and record where contacts leave the sensor field rather than assuming the demonstration transfers.',
        href: '/robot-hands', ctaLabel: 'Explore how robot hands handle changing contact',
        source: { label: 'Original DIGIT in-hand manipulation experiment', href: 'https://arxiv.org/abs/2005.14679' },
      },
      {
        id: 'success-vs-force-error',
        question: 'Can a grasp succeed while missing its target force?',
        answer: 'Yes. A robot can lift an object even if it misses the specified force target. Log completion and force error separately, and decide which limit disqualifies a trial before testing. Keep predicted and measured force distinct. A policy can predict the right target while the gripper applies a different force.',
        href: '/news/tacinf-tactile-vla-grip-force-sim-to-real', ctaLabel: 'Read the Tacinf force-versus-completion analysis',
        source: { label: 'Tacinf preprint: predicted force and measured-force evaluation', href: 'https://arxiv.org/html/2611.29240v1' },
      },
      {
        id: 'skin-and-robot-safety',
        question: 'Does tactile skin make a robot safe to work around people?',
        answer: 'Skin may provide an observation used in contact detection, but a sensing capability does not establish safety for a whole robot or application. Coverage gaps, failed signals, timing, and what the robot does in response all matter. A research demonstration is not a substitute for a qualified assessment of the actual system and its intended use.',
        href: '/robot-safety', ctaLabel: 'Read the distinction between contact sensing and safety evidence',
      },
    ],
  },
  {
    id: 'software-and-control',
    shortTitle: 'Software and control',
    title: 'How do I use tactile data in ROS 2 and robot control?',
    questions: [
      original('sensor-update-rate'),
      original('tactile-data-without-robot'),
      {
        id: 'ros2-contact-timestamps',
        question: 'Which timestamp should I use to align tactile data with a camera in ROS 2?',
        answer: 'Prefer the acquisition time expressed in a documented clock domain. Host receipt time includes transport and queueing, so it is not interchangeable with the time of contact. Measure how the devices’ clocks relate, choose the permitted synchronization window, and count unmatched samples rather than hiding them in interpolation.',
        href: '/guides/ros2-tactile-sensing', ctaLabel: 'Inspect the ROS 2 timestamp and replay contract',
      },
      {
        id: 'tactile-csv-fields',
        question: 'What should a tactile CSV contain before I use it for analysis?',
        answer: 'Save a timestamp and its unit, a sensor or taxel identifier, an identifiable signal field, and the physical unit or a label that it is raw data. Keep the calibration version and coordinate convention alongside the data. Preserve missing samples and raw values so a later script can distinguish a real zero from a gap or a processed estimate.',
        href: '/guides/python-tactile-data-processing', ctaLabel: 'Start with the Python tactile CSV exercise',
      },
      {
        id: 'rosbag-replay',
        question: 'What can a ROS bag replay validate before a robot experiment?',
        answer: 'Replay can check whether software sees the expected topics, reconstructs timestamps, and produces the expected contact events from a known recording. It cannot reproduce an actuator’s reaction to a new command or establish that a physical grasp is stable. Record the bag and software versions so a comparison can be repeated.',
        href: '/guides/ros2-tactile-sensing', ctaLabel: 'Use the tactile replay checklist',
        source: { label: 'ROS 2 rosbag2 documentation', href: 'https://github.com/ros2/rosbag2' },
      },
      {
        id: 'missing-stale-touch',
        question: 'How should a tactile-processing pipeline handle missing or stale readings?',
        answer: 'Mark them invalid or stale rather than treating them as zero load or silently holding the last value. Measure age at the point of use, log gaps, and test the agreed fallback with representative timing faults. What the robot may do without fresh feedback is a system decision, not something an interpolation routine should decide.',
        href: '/guides/ros2-tactile-sensing', ctaLabel: 'Review missing-data handling in the ROS 2 guide',
      },
      {
        id: 'tactile-reflex-vs-policy',
        question: 'Should touch go into the main robot policy or a faster local control loop?',
        answer: 'It depends on the decision deadline. A local loop can handle a contact response that must happen before the higher-level policy can supply a fresh action; a higher-level policy may use tactile context to choose a new grasp or retry. Measure contact-to-action timing on both paths and define which takes priority when they disagree.',
        href: '/guides/tactile-feedback-for-physical-ai', ctaLabel: 'Map touch to the appropriate feedback path',
      },
    ],
  },
  {
    id: 'datasets-and-models',
    shortTitle: 'Datasets and models',
    title: 'Which tactile datasets and robot models fit my task?',
    questions: [
      original('download-tactile-datasets'),
      original('benchmark-transfer'),
      {
        id: 'dataset-for-grasp-policy',
        question: 'How do I choose a tactile dataset for training a grasp policy?',
        answer: 'Look for time-aligned tactile observations and robot actions with useful episode boundaries, outcome labels, and reuse rights. An image collection can help with representation learning, but it cannot supervise an action it never recorded. Start by loading one complete episode and checking that its fields describe the decision your policy must make.',
        href: '/datasets', ctaLabel: 'Filter tactile datasets by task and available data',
      },
      {
        id: 'touch-and-go-vs-objectfolder',
        question: 'What is the difference between Touch and Go and ObjectFolder?',
        answer: 'Touch and Go pairs human-collected touch with visual observations. ObjectFolder includes a simulated multisensory collection and a separate ObjectFolder Real collection, along with benchmarks. Choose the collection whose modality, collection procedure, and split match your question. Neither project name by itself establishes that it contains the robot actions needed for your policy.',
        href: '/datasets', ctaLabel: 'Compare tactile dataset collection and access',
        source: [
          { label: 'Touch and Go paper', href: 'https://papers.nips.cc/paper_files/paper/2022/hash/354892587fe39b17c2b727af02abff4a-Abstract-Datasets_and_Benchmarks.html' },
          { label: 'Stanford ObjectFolder collection definitions', href: 'https://objectfolder.stanford.edu/' },
        ],
      },
      {
        id: 'hold-out-contact-sequences',
        question: 'Why is a random frame split misleading for tactile data?',
        answer: 'Adjacent frames from the same press can look nearly identical. A random frame split can put near-duplicates in both train and test and make the result look like generalization. Keep whole contact sequences together, then hold out objects, materials, or sensors if that is the transfer claim you want to test.',
        href: '/benchmarks', ctaLabel: 'Compare what tactile benchmark splits actually test',
        source: { label: 'RCT preprint on contact-sequence leakage and held-out materials', href: 'https://arxiv.org/abs/2606.31694' },
      },
      {
        id: 'lerobot-tactile-episodes',
        question: 'What should I verify before converting tactile demonstrations to LeRobot?',
        answer: 'Pin the LeRobot dataset version, then map feature names, shapes, units, timing, action fields, and episode boundaries to the loader you will use. Convert a small sample first and read back a complete episode. A file that parses is not proof that tactile frames and action labels stayed aligned.',
        href: '/guides/lerobot-dataset-format', ctaLabel: 'Use the LeRobot tactile dataset validation guide',
        source: { label: 'Hugging Face LeRobotDataset v3 documentation', href: 'https://huggingface.co/docs/lerobot/lerobot-dataset-v3' },
      },
      {
        id: 'vla-touch-input',
        question: 'Do vision-language-action models use tactile input by default?',
        answer: 'No. VLA describes a model that uses vision and language to condition actions; it does not imply a tactile input. Check the observation contract, trained checkpoint, and policy evaluation. A robot platform may have touch hardware even if the tested model never received that signal.',
        href: '/vla/models', ctaLabel: 'Compare documented VLA model inputs',
        source: { label: 'OpenVLA project and model interface', href: 'https://openvla.github.io/' },
      },
      {
        id: 'world-model-vs-tactile-policy',
        question: 'How is a tactile world model different from a touch-enabled robot policy?',
        answer: 'A tactile world model predicts future observations or states, sometimes conditioned on candidate actions. A robot policy chooses an action; it can use touch without predicting future touch. Check whether prediction improved a decision on a robot or was evaluated only as a prediction on recorded data.',
        href: '/guides/visuo-tactile-world-models-robot-manipulation', ctaLabel: 'Compare tactile prediction and action evidence',
      },
      {
        id: 'tactile-encoder-transfer',
        question: 'Can a tactile encoder trained on one sensor work on another?',
        answer: 'It is possible, but sensor appearance, contact mechanics, and calibration may change together. Check for a genuinely held-out sensor, document whether the encoder was frozen or adapted, and compare against a relevant baseline on the target task. An improvement on a representation probe does not establish better closed-loop manipulation.',
        href: '/tactile-foundation-models', ctaLabel: 'Compare tactile representation and transfer evidence',
        source: { label: 'Binding Touch to Everything cross-sensor evaluation', href: 'https://openaccess.thecvf.com/content/CVPR2024/papers/Yang_Binding_Touch_to_Everything_Learning_Unified_Multimodal_Tactile_Representations_CVPR_2024_paper.pdf' },
      },
      {
        id: 'synthetic-tactile-data',
        question: 'When is simulated touch useful, and what still needs a real robot?',
        answer: 'Simulation is useful for testing software, generating controlled contact cases, and comparing policies under known assumptions. For a real deployment, separately check how the pad deforms, what signals the device produces, and whether the robot completes the task under setup variation. Matching a simulated image is weaker evidence than matching the intended physical outcome.',
        href: '/robot-world-models', ctaLabel: 'Read about robot model evaluation and physical transfer',
        source: { label: 'DiffTactile simulations and physical transfer experiments', href: 'https://difftactile.github.io/' },
      },
    ],
  },
  {
    id: 'research-and-sources',
    shortTitle: 'Research and sources',
    title: 'How do I verify a tactile robotics research claim?',
    questions: [
      {
        id: 'demo-vs-benchmark',
        question: 'What is the difference between a robot demo and a benchmark result?',
        answer: 'A demo shows that an outcome was possible in a particular setup. A benchmark adds an explicit procedure, trial set, metric, and ideally failure counts and baselines. Before quoting a result, identify the task, test conditions, and denominator; do not treat a short clip as a success rate.',
        href: '/guides/tactile-sensor-benchmark-robot-manipulation', ctaLabel: 'Use a comparable tactile benchmark protocol',
      },
      {
        id: 'cite-tactile-study',
        question: 'How should I cite a tactile robotics result without overstating it?',
        answer: 'Cite the exact paper version and identify the figure, table, or experiment that supports the result. Include the tested platform, baseline, and metric where they change the interpretation. If you use RoboSkin’s index to find a study, cite the original for the experimental claim and the index only for the organization or comparison it provides.',
        href: '/research/robot-skin-papers#paper-claim-trace', ctaLabel: 'Trace a claim back to the original paper',
      },
      original('roboskin-hardware'),
      original('submit-a-source'),
    ],
  },
];

export const tactileFaqItems = tactileFaqGroups.flatMap(({ questions }) => questions);
