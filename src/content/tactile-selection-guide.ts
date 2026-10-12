import type { SeoTopicPage } from '@/content/seo-topic-pages';

export const tactileSelectionGuide: SeoTopicPage = {
  path: '/guides/how-to-choose-a-tactile-sensor',
  title: 'How to Choose a Tactile Sensor: A Practical Guide',
  description: 'Choose a tactile sensor by task, force range, contact geometry, latency and integration. Build a shortlist with a downloadable evaluation worksheet.',
  h1: 'How to choose a tactile sensor',
  kicker: 'Selection workflow',
  intent: 'A practical decision process and acceptance worksheet for choosing tactile sensing hardware; complements the sensor-output overview.',
  published: '2026-10-12', updated: '2026-10-12',
  priority: 0.8, changeFrequency: 'monthly', schemaType: 'TechArticle', visualKey: 'technology',
  keywords: ['how to choose a tactile sensor', 'tactile sensor selection checklist', 'robot gripper sensor selection'],
  quickAnswer: [
    'Choose a tactile sensor by writing down the contact decision your robot must make, the quantity it needs to observe, and the conditions in which it must work. Then compare candidates using the same mounting, objects and task protocol.',
    'Start with contact geometry, force range and required outputs. Check timing, calibration, replacement and software access before running a small acceptance trial. A high taxel count or a striking demo is not a substitute for those checks.',
    'This is an editorial engineering checklist based on the linked research and documentation. RoboSkin.ai has not tested or ranked the hardware for this guide; thresholds must come from your application.',
  ],
  sections: [
    {
      id: 'define-the-decision', heading: '1. Define the decision that touch should change',
      body: [
        'Write a one-sentence requirement: “When this contact occurs, the robot should take this action within this time, while meeting this outcome.” For example, a gripper might need to detect an incipient slip and adjust its grip before an object is lost. Name the failure you want to reduce, rather than starting with a preferred sensing technology.',
        'Decide what evidence would make adding touch worthwhile. Record the current task result, failure types and interventions without the proposed tactile input. Use the same conditions when you evaluate the candidate. A sensor can produce attractive contact images without improving the decision your controller actually makes.',
      ],
      table: { headers: ['Task', 'Contact question', 'Acceptance evidence to collect'], rows: [
        ['Hold a fragile object', 'Is contact stable without excessive loading?', 'Slips, damage, reference force and recovery delay on representative objects.'],
        ['Align or insert a part', 'Where is contact, and does it indicate misalignment?', 'Completion, peak load, retries and failure examples at varied initial offsets.'],
        ['Detect body contact', 'Which covered surface was touched?', 'Missed contacts, false alarms and localization across the mounted surface.'],
        ['Record demonstrations', 'Which contact information must transfer to the robot?', 'Synchronized tactile samples, robot state, validity flags and held-out replay outcomes.'],
      ] },
    },
    {
      id: 'mechanical-fit', heading: '2. Eliminate candidates that do not fit the contact',
      body: [
        'Sketch the active sensing area on the actual finger, jaw or body panel. Include edge contacts, curvature, cable exits, mounting hardware and the thickness added by a protective layer. Ask whether the sensor changes the grasp geometry or blocks the camera view. A sensing area that fits on a CAD model may still miss the contact during a real grasp.',
        'Specify your expected load range and what happens during overload. Keep force in newtons separate from pressure in pascals: converting between them requires an appropriate contact area. Also distinguish spatial sampling, the smallest detectable change and measurement error. These describe different properties and should occupy separate rows in a comparison.',
      ],
      links: [{ label: 'Understand sensor outputs before comparing specifications', href: '/guides/tactile-sensor-for-robots' }],
    },
    {
      id: 'choose-a-mechanism', heading: '3. Match the sensing mechanism to the required observation',
      body: [
        'Use a mechanism to narrow a shortlist, then inspect the implementation. Optical, magnetic and electrical sensors can expose very different raw signals. Check whether the interface returns images, field readings, a pressure array or calibrated forces, and whether any advertised slip or material label requires an additional model.',
        'The original DIGIT study provides an optical fingertip example; ReSkin illustrates a magnetic interface that can be replaced separately from its electronics. These are source examples, not a recommendation that one family is universally better. Compare the software and calibration that turn each raw signal into your required observation.',
      ],
      links: [
        { label: 'Compare six tactile transduction mechanisms', href: '/technology#tactile-sensor-mechanisms' },
        { label: 'Compare documented sensor hardware', href: '/sensors' },
        { label: 'DIGIT original study', href: 'https://arxiv.org/abs/2005.14679' },
        { label: 'ReSkin author project and source code', href: 'https://reskin.dev/' },
      ],
    },
    {
      id: 'data-and-timing', heading: '4. Budget the complete data and response path',
      body: [
        'Ask for a sample recording before committing to an integration. It should let you identify time, sensor revision, units, geometry and invalid samples. Confirm how to obtain raw data, preserve calibration and detect a disconnected or stale sensor. Check the documentation and license for the exact driver or SDK you plan to use.',
        'Measure from physical contact to the resulting robot response. A frame-rate figure excludes some combination of capture, transfer, queuing, reconstruction and control. Record delay variation and the slow cases as well as the typical case. Select acceptable limits before testing, based on the task, rather than retrofitting a pass threshold to the result.',
      ],
      links: [{ label: 'ROS 2 tactile messages, timestamps and replay', href: '/guides/ros2-tactile-sensing' }],
    },
    {
      id: 'maintenance-and-cost', heading: '5. Include calibration, wear and total integration cost',
      body: [
        'Request a documented calibration procedure and find out which changes invalidate it: a new pad, remounting, changed temperature or a different loading direction. Include an unloaded baseline and a known reference contact in the evaluation. Check performance after the maintenance operations your team will actually perform.',
        'Compare the complete effort: hardware, spare contact surfaces, mounting, compute, cables, calibration equipment, driver work and servicing time. Obtain a current quote and replacement terms from the supplier. This guide does not assign prices or availability to research prototypes.',
      ],
      links: [{ label: 'Plan an optical tactile calibration workflow', href: '/guides/tactile-sensor-calibration' }],
    },
    {
      id: 'acceptance-trial', heading: '6. Run a bounded acceptance trial and keep the failures',
      body: [
        'Use a small representative object and contact set, including the cases that currently fail. Separate tuning trials from evaluation trials. Record sensor version, mount, software, conditions, trial count and pass criteria so a colleague can repeat the comparison. If possible, change only the sensing input while holding the rest of the system constant.',
        'Report task success with its denominator, plus damage, interventions, missed events, false alarms and response delay where relevant. Inspect edge contacts and repeated loading. A pass applies to the tested conditions; it is not evidence for arbitrary objects, environments or deployment duration.',
        'Download the blank worksheet below and fill in requirements before contacting a vendor or building a prototype. Leave an unknown as unknown. A candidate with an unmeasured critical requirement should remain on hold until the measurement is available.',
      ],
      links: [
        { label: 'Download the tactile sensor selection worksheet (CSV)', href: '/tutorials/tactile-selection/selection-worksheet.csv', download: true },
        { label: 'Compare published task-level sensor evidence', href: '/guides/tactile-sensor-benchmark-robot-manipulation' },
      ],
    },
    {
      id: 'special-cases', heading: 'Special cases: surgery, wearables and learned resolution',
      body: [
        'For surgical tools, start with the dedicated application notes and the exact experimental setting. A laboratory tissue experiment does not establish human clinical readiness. For wearable demonstration capture, inspect how mounting and contact representation transfer between a human and a robot.',
        'When a system advertises super-resolution, ask what is reconstructed and how it was evaluated. A dense predicted image is not a dense array of independent physical measurements. Keep the raw sampling layout, held-out localization error and downstream task result separate.',
      ],
      links: [
        { label: 'Surgical tactile sensing evidence and limitations', href: '/applications#surgical-robotics' },
        { label: 'TacPrint wearable sensing and contact reproduction', href: '/research/tacprint-wearable-tactile-contact-reproduction-2026' },
        { label: 'Tactile super-resolution explained', href: '/technology#tactile-super-resolution' },
      ],
    },
  ],
  faqs: [
    { question: 'Which tactile sensor should I choose first?', answer: 'Shortlist sensors that fit the contact surface and expose the observation your task needs. Compare the same geometry, load range, data interface and acceptance protocol. There is no universal winner across robot fingers, grippers and body surfaces.' },
    { question: 'Does higher resolution always mean better robot performance?', answer: 'No. Sampling density, reconstructed image size, localization error and task success are different measures. Extra detail only helps when the complete sensing and control pipeline can use it within the task constraints.' },
    { question: 'Can I compare an image-based sensor with a force sensor?', answer: 'Yes, at the task level. First identify what each output represents and what calibration or inference it needs. Do not rank raw camera pixel counts against force accuracy as though they shared a unit.' },
    { question: 'What should I ask a tactile sensor supplier?', answer: 'Ask for the exact hardware revision, active area, output format and units, calibration procedure, timing measurements, replacement process, software access and a representative recording. Request current pricing and availability separately.' },
  ],
  relatedLinks: [
    { label: 'Sensor-output overview', href: '/guides/tactile-sensor-for-robots', description: 'Understand what the hardware measures and what software infers.' },
    { label: 'Tactile sensor directory', href: '/sensors', description: 'Inspect documented hardware and original sources.' },
    { label: 'Magnet-based tactile skin', href: '/e-skin#magnet-based-tactile-skin', description: 'Follow deformation through magnetic sensing to an estimated contact.' },
  ],
  sources: [
    { label: 'DIGIT original sensor study', href: 'https://arxiv.org/abs/2005.14679' },
    { label: 'ReSkin author project', href: 'https://reskin.dev/' },
    { label: 'Tactile Robotics: An Outlook', href: 'https://arxiv.org/abs/2508.11261' },
  ],
};
