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
    updated: '2026-10-25',
    revisionNote: "October 25, 2026: added blank protocol, trial and slip-event records with filling instructions for a matched GelSight Mini / original DIGIT evaluation. This is a planning resource, not new hardware test evidence. Existing source review dates are retained. October 17, 2026: linked maintenance and cross-principle selection guidance. October 13, 2026: added source-linked limits on gel wear, reconstruction accuracy and software-derived force estimates.",
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
        contextLinks: [{ before: 'Use the ', label: 'tactile sensing introduction', href: '/technology', after: ' to distinguish raw contact observations from inferred quantities before comparing the outputs in this table.' },
          { before: 'If the shortlist extends beyond optical fingertips, use the ', label: 'optical versus capacitive tactile sensor guide', href: '/guides/optical-vs-capacitive-tactile-sensors', after: ' to compare sensing principles before choosing a model.' },
        ],
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
        contextLinks: [{ before: 'If the task requires learned representations or a policy, check the ', label: 'tactile datasets by learning task', href: '/datasets#choose-by-learning-task', after: ' for sensor and modality compatibility before treating an available collection as a reason to choose hardware.' }],
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
          { label: 'Download task evaluation template (CSV)', href: '/resources/tactile-sensor-evaluation-template.csv', download: true },
          { label: 'Use the tactile sensor calibration workflow', href: '/guides/tactile-sensor-calibration' },
          { label: 'Plan matched sensor and robot-task benchmarks', href: '/guides/tactile-sensor-benchmark-robot-manipulation' },
        ],
      },
      {
        id: 'comparison-records',
        heading: 'Download a GelSight Mini vs DIGIT evaluation record',
        body: [
          'Use these blank CSV files to turn the evaluation plan into a record for your own robot task. They contain no example measurements or device ranking. Complete the protocol before running trials, retain every attempted trial, and use the optional event log when evaluating slip detection. The files work in a spreadsheet or a CSV editor; completed records stay on your device.',
          'Assign a condition ID to each hardware, software and calibration configuration. Match task, objects, success criteria and controller budget where possible, and document any difference. A changed gel, model or acquisition mode needs a new condition or an explicitly versioned record. Keep planned stream settings separate from received-frame measurements.',
        ],
        table: {
          headers: ['Record', 'What to fill in', 'What it lets you check'],
          rows: [
            ['Protocol: one value column per sensor', 'Hardware revision and unit; mounting and gel state; task, split and success rule; calibration reference; timestamp and delay definitions.', 'Whether the two conditions answer the same question, and which differences prevent a direct comparison.'],
            ['Trials: one row per attempted trial', 'Condition and calibration IDs; raw evidence; received and invalid frames; measured rate and loop delay; outcome, exclusions and interventions.', 'Successes and failures against a declared denominator, with missing or invalid measurements kept visible.'],
            ['Slip events: optional, one row per annotated onset or unmatched alarm', 'Independent reference, onset interval, matched detector time, common clock and timing uncertainty; retain misses and false alarms.', 'Detection errors and delay separately from task recovery. An unknown onset is not a confirmed detection or a zero-delay event.'],
          ],
        },
        bullets: [
          'Read the instructions first. Blank means unmeasured or not yet entered; use not_applicable with a reason only when a field does not apply. Enter 0 only for an observed zero.',
          'For slip, define onset and the alarm-matching window before inspecting outcomes. Record non-slip observation time for false alarms, and keep missed events in the recall denominator.',
          'Calculate delay only from timestamps on an aligned clock. Keep capture-to-controller delay separate from slip-onset-to-detection delay; neither can be inferred from advertised camera FPS.',
          'Summarize separately by condition and declared held-out group. Report attempted, excluded and evaluable trial counts, the success fraction and an appropriate uncertainty interval; do not treat adjacent video frames as independent robot trials.',
        ],
        links: [
          { label: 'Download comparison protocol (CSV)', href: '/resources/gelsight-digit-comparison-protocol.csv', download: true },
          { label: 'Download blank trial log (CSV)', href: '/resources/gelsight-digit-comparison-trials.csv', download: true },
          { label: 'Download optional slip-event log (CSV)', href: '/resources/gelsight-digit-comparison-slip-events.csv', download: true },
          { label: 'Read field definitions and comparison instructions', href: '/resources/gelsight-digit-comparison-instructions.txt' },
        ],
      },
      {
        id: 'challenges-and-limitations',
        heading: 'Challenges & Limitations',
        body: [
          'Gel wear changes the sensing surface. The original DIGIT paper describes wear and manufacturing variation as reasons an optical tactile system may need recalibration or retraining after replacement. GelSight’s Mini documentation also warns that rough surfaces can shear the gel and sharp edges can damage its coating. Neither source establishes a service lifetime for your robot task.',
          'Reconstruction is not a certified accuracy specification. GelSight’s official Mini FAQ states that Mini is not a metrology device and does not provide a reconstruction-accuracy study. Its camera resolution and example point clouds therefore cannot establish geometric accuracy or superiority over DIGIT under matched conditions.',
          'Force is a derived output. The Mini documentation describes learning pressure force from height displacement; the DIGIT paper starts from tactile images for model-based manipulation. An available camera stream or reconstruction demo does not establish calibrated normal-force or shear-force accuracy on your unit. Validate the intended estimate against an independent reference.',
        ],
        links: [
          { label: 'DIGIT v1, sensor design and elastomer wear', href: 'https://arxiv.org/html/2005.14679v1#S3' },
          { label: 'GelSight Mini official FAQ, questions 5, 17, 23 and 26 (pinned source)', href: 'https://github.com/gelsightinc/gsrobotics/blob/321d6a22da64529138ff10237335038fd8c5189f/README.md' },
        ],
        contextLinks: [
          { before: 'For supported cleaning and replacement options, consult the ', label: 'optical tactile gel maintenance guide', href: '/guides/optical-tactile-sensor-maintenance', after: ' before budgeting spares and recalibration work.' },
        ],
      },
      {
        id: 'software-next-steps',
        heading: 'From sensor frames to a learning pipeline',
        body: [
          'First validate the official acquisition example for your device. For a ROS 2 application, preserve camera-frame semantics, sensor identity and capture timing; transporting an image does not turn it into a calibrated force array. The RoboSkin ROS 2 tutorial teaches a separate synthetic taxel-message pipeline and has no tested DIGIT or GelSight camera driver.',
          'Before storing demonstrations, define how tactile frames align with camera observations, robot state and action commands. The dataset directory and LeRobot guide help inspect episode and format contracts; neither guarantees that a chosen model accepts an extra tactile field.',
        ],
        contextLinks: [{ before: 'Follow the ', label: 'ROS 2 tactile message and replay tutorial', href: '/guides/ros2-tactile-sensing', after: ' to inspect timestamps, validity and recording semantics with synthetic data before designing a separate acquisition path for your optical sensor.' }],
        links: [
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
