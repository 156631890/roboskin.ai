import type { SeoTopicPage } from '@/content/seo-topic-pages';

export const sensorComparisonPages: SeoTopicPage[] = [
  {
    path: '/guides/gelsight-vs-digit',
    title: 'GelSight vs DIGIT: Optical Tactile Sensor Guide',
    description: 'Compare GelSight Mini and original DIGIT for robot touch: image output, mounting, calibration, software, reuse terms and a task-matched evaluation plan.',
    h1: 'GelSight vs DIGIT: choosing an optical tactile sensor',
    kicker: 'Sensor selection / Source-based comparison',
    intent: 'Help researchers choose between GelSight Mini and original DIGIT and plan a fair robot-task evaluation.',
    published: '2026-10-07',
    updated: '2026-10-07',
    priority: 0.8,
    changeFrequency: 'monthly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['gelsight vs digit', 'GelSight Mini vs DIGIT', 'optical tactile sensor comparison'],
    quickAnswer: [
      'GelSight Mini and the original DIGIT both use a camera to observe a deformable, illuminated gel. Start with DIGIT when evaluating a compact fingertip research design; start with GelSight Mini when evaluating its documented camera, reconstruction and robot-mounting workflow. Neither is a universal winner for robot manipulation.',
      'Here, GelSight means GelSight Mini, not every sensor based on GelSight technology. DIGIT means the original 2020 design, not Digit 360 or DIGIT Pinki. Both deliver tactile images; calibrated depth, force estimates and slip decisions require additional processing and validation.',
      'This is a comparison of primary documentation, not a hands-on review. RoboSkin.ai has not bench-tested these devices. The decision procedure below is an evaluation plan; it contains no measured ranking or current price claim.',
    ],
    sections: [
      {
        id: 'integration-comparison',
        heading: 'Compare the integration work, not just the camera',
        body: ['The official DIGIT interface and GelSight robotics examples establish different software starting points. Preserve the distinction between a hardware specification, a configured stream and a derived estimate when building your shortlist.'],
        table: {
          headers: ['Decision', 'GelSight Mini', 'Original DIGIT', 'Check before committing'],
          rows: [
            ['Direct observation', 'RGB images of gel deformation; official examples add marker tracking and 3D reconstruction.', 'RGB tactile frames through digit-interface; the paper studies a compact fingertip for in-hand manipulation.', 'Save raw images and an unloaded reference before adding learned outputs.'],
            ['Software starting point', 'gsrobotics documents camera capture, reconstruction examples and robot-adapter files.', 'digit-interface documents device discovery, connection by serial number and get_frame().', 'Pin the revision, dependencies, operating system and supported capture mode. Documentation is not a successful hardware run.'],
            ['Geometry and mounting', 'Check the Mini enclosure and adapter drawings against the gripper and workspace.', 'Check the original design files against fingertip spacing, cable routing and grasp clearance.', 'Fit the complete sensor and cable path, not only the active gel area.'],
            ['Image size and rate', 'The camera specifications and example reconstruction resolution describe different stages.', 'The original paper reports a hardware rate distinct from the default Python stream.', 'Record the actual stream, dropped frames and acquisition-to-action delay. Do not rank devices by unmatched FPS.'],
            ['Calibration and maintenance', 'Reconstruction settings, gel condition and reference geometry need to match the unit.', 'Lighting, gel condition and any image-to-depth or force model need a documented baseline.', 'Recheck after gel replacement or changed mounting; log invalid readings.'],
            ['Access and reuse', 'Confirm current device availability and the terms of each software artifact at the official source.', 'The reviewed original design and interface revisions use CC BY-NC 4.0 terms.', 'Hardware purchase, code, design files and trained weights can carry separate terms.'],
          ],
        },
        links: [
          { label: 'GelSight Mini specifications and source dates', href: '/sensors/gelsight-mini' },
          { label: 'Original DIGIT specifications and interface', href: '/sensors/digit' },
        ],
      },
      {
        id: 'choose-by-task',
        heading: 'Which sensor fits your robot task?',
        body: ['Use these as conditional starting points for investigation. A task label such as grasping or insertion does not establish that either device will work on your robot.'],
        table: {
          headers: ['Your task', 'Shortlist logic', 'Evidence you still need'],
          rows: [
            ['Compact multifinger manipulation', 'Inspect original DIGIT geometry and its research interface first if fingertip packaging is the binding constraint.', 'Finger clearance, cable strain, contact coverage and repeated trials on the intended hand.'],
            ['Surface geometry or a reconstruction prototype', 'Inspect the GelSight Mini reconstruction examples and calibration workflow first.', 'Reference-shape errors on your unit and gel; a depth image alone is not a validated measurement.'],
            ['Slip detection and grasp recovery', 'Either image stream can be a candidate input; choose around temporal signal quality and the complete control loop.', 'Independent slip-onset labels, false alarms, detection delay and recovery outcomes under matched loads.'],
            ['Insertion and alignment', 'Choose the geometry that observes the relevant contact while leaving room for the tool and fixture.', 'Pose or contact labels, jam conditions, controller limits and task success under occlusion.'],
            ['Palm or whole-body coverage', 'Reconsider whether discrete optical fingertips match the coverage requirement.', 'A layout and wiring comparison with arrays or other skin technologies; this two-device comparison is insufficient.'],
          ],
        },
        links: [
          { label: 'Compare sensors by task and coverage', href: '/sensors#task-selection' },
          { label: 'Choose fingertip, finger and palm sensing', href: '/applications/robot-hand-tactile-sensor' },
        ],
      },
      {
        id: 'evaluation-plan',
        heading: 'A fair comparison you can run on your robot',
        body: ['Keep a separate record for each device revision and configuration. Run a small loading and acquisition check before training a model or collecting a large dataset. These steps are a proposed protocol, not results from a RoboSkin experiment.'],
        bullets: [
          'Define one task, robot, object set, success condition and controller budget. Keep these matched across devices where physically possible; record unavoidable differences.',
          'Capture no-contact and reference-contact sequences. Record lighting, stream settings, gel state, timestamps and invalid frames alongside the raw observations.',
          'Calibrate only the quantities you will claim. Use known geometry for reconstruction and an independent force reference for force estimation.',
          'Keep complete contact sequences together when splitting data. Hold out objects, sessions or sensor units according to the transfer claim.',
          'Measure the complete loop: capture, transport, inference and controller response. Report task completion, recovery, failures and interventions with trial counts.',
          'Repeat after realistic contact wear or a gel change. Record the maintenance and recalibration effort together with performance.',
        ],
        links: [
          { label: 'Use the tactile sensor calibration workflow', href: '/guides/tactile-sensor-calibration' },
          { label: 'Plan matched sensor and robot-task benchmarks', href: '/guides/tactile-sensor-benchmark-robot-manipulation' },
        ],
      },
      {
        id: 'software-next-steps',
        heading: 'From sensor frames to a learning pipeline',
        body: [
          'First validate the official acquisition example for your device. For a ROS 2 application, preserve camera-frame semantics, sensor identity and capture timing; transporting an image does not turn it into a calibrated force array. The RoboSkin ROS 2 tutorial teaches a separate synthetic taxel-message pipeline and has no tested DIGIT or GelSight camera driver.',
          'Before storing demonstrations, define how tactile frames align with camera observations, robot state and action commands. The dataset directory and LeRobot guide help inspect episode and format contracts; neither guarantees that a chosen model accepts an extra tactile field.',
        ],
        links: [
          { label: 'ROS 2 message, timestamp and replay tutorial', href: '/guides/ros2-tactile-sensing' },
          { label: 'Select tactile datasets by learning task', href: '/datasets#choose-by-learning-task' },
          { label: 'Inspect the LeRobot episode format', href: '/guides/lerobot-dataset-format' },
        ],
      },
    ],
    faqs: [
      { question: 'Is DIGIT a GelSight sensor?', answer: 'The original DIGIT uses camera-based sensing of an illuminated elastomer associated with GelSight-style tactile sensing. That shared principle does not make DIGIT the same device as GelSight Mini. Compare named hardware revisions and their software.' },
      { question: 'Which is better, GelSight Mini or DIGIT?', answer: 'There is no matched, independent RoboSkin test establishing a winner. Compare the fit to your hand or gripper, accessible software, calibration effort and outcomes on the same task. The tables above explain when to investigate each workflow.' },
      { question: 'Can either sensor measure force directly?', answer: 'The documented camera interfaces produce images. A force estimate requires an additional mapping and independent calibration or validation; the sensor name and camera resolution do not establish force accuracy.' },
      { question: 'Does this comparison cover Digit 360?', answer: 'No. Digit 360 is a separate multisensory design. Its modalities, software and research results must be evaluated from its own sources rather than attributed to the original DIGIT.' },
    ],
    relatedLinks: [
      { label: 'Optical tactile sensor directory', href: '/sensors#optical-comparison', description: 'Broaden the shortlist to TacTip and other sensing approaches.' },
      { label: 'GelSight Mini', href: '/sensors/gelsight-mini', description: 'Review source-specific specifications and reconstruction settings.' },
      { label: 'Original DIGIT', href: '/sensors/digit', description: 'Review hardware, Python acquisition and reuse terms.' },
      { label: 'Tactile foundation models', href: '/tactile-foundation-models#sparsh-vs-unitouch', description: 'Choose between touch representations and multimodal alignment.' },
    ],
    sources: [
      { label: 'GelSight official robotics software: acquisition, reconstruction and adapters', href: 'https://github.com/gelsightinc/gsrobotics' },
      { label: 'Lambeta et al. (2020): original DIGIT paper', href: 'https://arxiv.org/abs/2005.14679' },
      { label: 'Original DIGIT Python interface, reviewed revision 87a28bb', href: 'https://github.com/facebookresearch/digit-interface/tree/87a28bbf2beee8008a5308e9a12d72e1bc4fefb9' },
      { label: 'Original DIGIT design files, reviewed revision de29222', href: 'https://github.com/facebookresearch/digit-design/tree/de292229d43eed1deba58b856b2fe1ee04097631' },
    ],
  },
];
