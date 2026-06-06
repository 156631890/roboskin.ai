export type SeoTopicPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  intent: string;
  updated: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
  schemaType: 'WebPage' | 'TechArticle' | 'DefinedTerm';
  visualKey: 'technology' | 'applications' | 'resources' | 'answers';
  keywords: string[];
  quickAnswer: string[];
  sections: {
    heading: string;
    body: string[];
    bullets?: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedLinks: {
    label: string;
    href: string;
    description: string;
  }[];
  sources?: {
    label: string;
    href: string;
  }[];
  paperBriefIds?: string[];
};

export const seoTopicPages: SeoTopicPage[] = [
  {
    path: '/robot-skin',
    title: 'What Is Robot Skin? Tactile AI Surface Guide',
    description:
      'Robot skin is a tactile sensing surface for robots. Learn how robot skin relates to tactile AI, e-skin, humanoid hands, grippers, and contact-aware robotics.',
    h1: 'What is robot skin?',
    kicker: 'Core concept',
    intent: 'Definition and category overview for readers searching robot skin, robotic skin, or what is robot skin.',
    updated: '2026-06-06',
    priority: 0.88,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'technology',
    keywords: ['robot skin', 'robotic skin', 'what is robot skin', 'robot skin technology', 'tactile sensing surface'],
    quickAnswer: [
      'Robot skin is a tactile sensing surface that helps a robot detect contact, pressure, shear, slip, and interaction events across hands, grippers, arms, or curved body surfaces.',
      'A useful robot skin system is not only a soft cover. It includes sensor materials, signal conditioning, data handling, robot middleware, and control logic that can use touch information.',
      'The term overlaps with e-skin and tactile sensors, but robot skin is usually discussed in the context of robots that need distributed contact awareness.',
    ],
    sections: [
      {
        heading: 'What robot skin measures',
        body: [
          'Robot skin can measure contact location, pressure distribution, shear, slip, temperature, damage events, or other surface interactions depending on the sensor architecture. The exact signal matters more than the label.',
          'A fingertip skin for dexterous manipulation may need high-resolution force and slip information. A body surface for human-robot interaction may need broader coverage, lower resolution, and reliable contact-event detection.',
        ],
        bullets: [
          'Contact events across fingertips, palms, grippers, arms, and curved covers',
          'Pressure or force patterns rather than a single yes-or-no touch signal',
          'Slip, shear, vibration, or texture signals when manipulation requires them',
          'Timestamped data that can be logged, replayed, and used by controllers',
        ],
      },
      {
        heading: 'How robot skin fits the tactile AI stack',
        body: [
          'Robot skin becomes more useful when it is part of a tactile AI stack. The surface gathers signals, electronics condition those signals, software organizes them into robot-ready data, and control systems use the result for grasping, safety, or evaluation.',
          'That stack is why thin marketing copy often misses the point. The material layer is important, but calibration, mounting, latency, durability, and software interfaces determine whether the skin can support real robot behavior.',
        ],
      },
      {
        heading: 'Where robot skin is most searched',
        body: [
          'Search interest usually clusters around humanoid robot hands, robotic grippers, e-skin research, flexible tactile sensors, prosthetics, and physical AI. These are related but not identical questions.',
          'RoboSkin.ai separates those intents into definition, application, technology, comparison, and research pages so one page does not try to rank for every possible phrase.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is robot skin the same as e-skin?',
        answer:
          'Not exactly. E-skin means electronic skin, often a flexible sensor layer. Robot skin usually means e-skin or tactile sensing used on a robot surface with robot-specific constraints.',
      },
      {
        question: 'Does robot skin replace vision?',
        answer:
          'No. Vision helps a robot see a scene before contact. Robot skin helps detect what happens at the contact surface after the robot touches an object or person.',
      },
      {
        question: 'What makes robot skin difficult?',
        answer:
          'The hard parts are flexible mounting, durability, wiring, calibration, signal quality, data rate, and connecting touch data to robot control or evaluation workflows.',
      },
    ],
    relatedLinks: [
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How touch signals become useful robot behavior.' },
      { label: 'E-skin', href: '/e-skin', description: 'How electronic skin overlaps with robot skin.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'How robot skin applies to dexterous hands and grasping.' },
      { label: 'Soft robotic skin', href: '/applications/soft-robotic-skin', description: 'Flexible robot skin for soft and curved surfaces.' },
      { label: 'Robot skin vs e-skin', href: '/guides/robot-skin-vs-e-skin', description: 'A comparison page for overlapping terms.' },
      { label: 'Robot skin papers', href: '/research/robot-skin-papers', description: 'Research routes and source-backed briefs.' },
    ],
  },
  {
    path: '/tactile-ai',
    title: 'Tactile AI: Touch Data for Physical AI and Robots',
    description:
      'Tactile AI turns robot touch signals into useful behavior. Learn the tactile AI stack for robot skin, slip detection, contact-aware control, and physical AI.',
    h1: 'Tactile AI: touch data for physical AI',
    kicker: 'Core concept',
    intent: 'Definition and system map for tactile AI, touch data, physical AI tactile feedback, and robot control queries.',
    updated: '2026-06-06',
    priority: 0.86,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'resources',
    keywords: ['tactile AI', 'physical AI tactile feedback', 'robot touch data', 'contact-aware robotics', 'slip detection robot hand'],
    quickAnswer: [
      'Tactile AI is the sensing, data, and control workflow that turns touch signals into useful robot behavior.',
      'It can support grasp confidence, slip response, contact-aware motion, safer interaction, and evaluation analytics for physical AI systems.',
      'The phrase is broader than a single tactile sensor. It describes the full stack from contact surface to model, controller, benchmark, and feedback loop.',
    ],
    sections: [
      {
        heading: 'The tactile AI stack',
        body: [
          'A tactile AI stack starts with a contact surface and ends with an action or measurement loop. Between those endpoints, the system needs sensing materials, electronics, timestamps, calibration, feature extraction, model inputs, and robot middleware.',
          'If the robot cannot use the signal in a control or evaluation loop, the system is only collecting touch data. Tactile AI begins when that data changes what the robot can decide or verify.',
        ],
        bullets: [
          'Skin materials and sensor arrays collect local contact signals',
          'Signal processing filters, calibrates, timestamps, and compresses data',
          'Edge AI or analytics can classify slip, contact type, or grasp confidence',
          'Robot control uses tactile features for grasping, safety, and manipulation',
        ],
      },
      {
        heading: 'Why tactile AI matters for humanoids',
        body: [
          'Humanoid robots and dexterous hands operate in contact-rich settings. Vision can guide the robot toward an object, but a hand often blocks the camera once grasping begins.',
          'Touch data can reveal whether an object is seated correctly, sliding, deforming, or being squeezed too hard. That information matters for household tasks, warehouse handling, prosthetics, assistive devices, and research platforms.',
        ],
      },
      {
        heading: 'What to validate before claiming tactile AI',
        body: [
          'Tactile AI claims should be tied to measured tasks. A demo that classifies contact on a benchtop is different from a robot hand that adjusts grip during motion.',
          'Useful validation includes sensor drift, response time, synchronization with joint state, robustness after mounting, and whether the tactile signal improves a real robot behavior.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is tactile AI only machine learning?',
        answer:
          'No. Machine learning can be part of tactile AI, but the stack also includes sensor design, signal processing, calibration, middleware, control, logging, and validation.',
      },
      {
        question: 'How is tactile AI different from tactile sensing?',
        answer:
          'Tactile sensing measures touch. Tactile AI organizes and uses touch data so a robot can classify contact, adjust behavior, or evaluate a manipulation task.',
      },
      {
        question: 'What is the best first page to read after this?',
        answer:
          'Read the robot skin overview for the surface layer, then the robot hand tactile sensor and robot skin papers pages for application and research context.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'The surface layer that collects contact signals.' },
      { label: 'Physical AI touch data', href: '/guides/physical-ai-touch-data', description: 'Why contact data matters after vision is occluded.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'A hand-level tactile AI application.' },
      { label: 'Humanoid robot skin', href: '/applications/humanoid-robot-skin', description: 'Where tactile AI appears in humanoid hands and surfaces.' },
      { label: 'Technology context', href: '/technology', description: 'Existing stack explanation for tactile sensing layers.' },
      { label: 'Research notes', href: '/research', description: 'Source-backed tactile AI and e-skin briefs.' },
    ],
  },
  {
    path: '/e-skin',
    title: 'E-Skin in Robotics: Electronic Skin and Robot Skin',
    description:
      'E-skin, or electronic skin, is a flexible sensor surface. Learn how e-skin connects to robot skin, soft robotic skin, tactile sensors, and humanoid robots.',
    h1: 'E-skin in robotics',
    kicker: 'Core concept',
    intent: 'Definition page for e-skin, electronic skin, soft robotic skin, and flexible tactile sensor searches.',
    updated: '2026-06-06',
    priority: 0.84,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'answers',
    keywords: ['e-skin', 'electronic skin robotics', 'soft robotic skin', 'flexible tactile sensor', 'robotic electronic skin'],
    quickAnswer: [
      'E-skin, or electronic skin, is a flexible or soft sensor layer designed to measure contact-related signals on non-flat surfaces.',
      'In robotics, e-skin can cover fingertips, palms, gripper pads, prosthetics, arms, or safety surfaces.',
      'E-skin becomes robot skin when the surface is designed, mounted, interpreted, and validated for robot use.',
    ],
    sections: [
      {
        heading: 'What e-skin is designed to do',
        body: [
          'E-skin usually focuses on flexible sensing. It may measure pressure, strain, temperature, proximity, damage, shear, or multiple signals at once. The value comes from conforming to surfaces where rigid sensors are difficult to mount.',
          'Robotics adds extra constraints. The layer must survive bending, abrasion, cable routing, cleaning, attachment, replacement, and repeated contact events while still producing usable signals.',
        ],
        bullets: [
          'Flexible or soft sensor materials for curved surfaces',
          'Electronic readout from pressure, strain, temperature, or multimodal inputs',
          'Potential use on robot hands, prosthetics, soft grippers, and body covers',
          'Calibration and packaging requirements that change by robot geometry',
        ],
      },
      {
        heading: 'E-skin versus robot skin',
        body: [
          'E-skin is a material and sensing category. Robot skin is the robot-facing application of that category. A lab e-skin sample may be impressive without being ready for a robot hand or arm.',
          'A robot skin page should ask how the e-skin is mounted, how the signal is read, what data rate is available, how drift is handled, and what robot behavior uses the data.',
        ],
      },
      {
        heading: 'Where e-skin research is useful',
        body: [
          'E-skin research is useful for soft robotic skin, prosthetic feedback, large-area tactile arrays, humanoid robot hands, wearable sensing, and human-robot interaction surfaces.',
          'The best source-backed pages separate what a paper demonstrates from what readers should not infer. A research prototype is not automatically a deployable robot skin system.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What does e-skin stand for?',
        answer: 'E-skin stands for electronic skin, a flexible sensor layer that can measure contact-related or surface-related signals.',
      },
      {
        question: 'Is every e-skin a robot skin?',
        answer:
          'No. E-skin can be used in wearables, prosthetics, healthcare, or robotics. It becomes robot skin when it is integrated into a robot surface and connected to robot data or control needs.',
      },
      {
        question: 'What should e-skin pages cite?',
        answer:
          'They should cite the original paper or public source, then clearly separate reported claims from RoboSkin.ai analysis or application context.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'Robot-facing framing for tactile surfaces.' },
      { label: 'Soft robotic skin', href: '/applications/soft-robotic-skin', description: 'Where flexible e-skin becomes a robot surface.' },
      { label: 'Flexible tactile sensor array', href: '/guides/flexible-tactile-sensor-array', description: 'Array-level explanation for e-skin and robot skin.' },
      { label: 'Robot skin vs e-skin', href: '/guides/robot-skin-vs-e-skin', description: 'A direct comparison of the terms.' },
      { label: 'Single-material soft skin brief', href: '/research/single-material-soft-robotic-skin-2025', description: 'Source-backed soft robotic skin research note.' },
      { label: 'Glossary', href: '/glossary', description: 'Definitions for robot skin, tactile AI, and e-skin terms.' },
    ],
  },
  {
    path: '/applications/humanoid-robot-skin',
    title: 'Humanoid Robot Skin for Hands, Arms, and Contact-Aware Robots',
    description:
      'Humanoid robot skin helps robot hands and body surfaces detect contact. Learn use cases, tactile signals, evaluation questions, and related research routes.',
    h1: 'Humanoid robot skin',
    kicker: 'Application intent',
    intent: 'Application page for humanoid robot skin, robot hands, body contact sensing, and physical AI touch queries.',
    updated: '2026-06-06',
    priority: 0.82,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['humanoid robot skin', 'robot hand tactile sensor', 'humanoid tactile sensing', 'robot body contact sensing', 'dexterous robot hands'],
    quickAnswer: [
      'Humanoid robot skin is tactile sensing applied to hands, palms, arms, or other humanoid robot surfaces where contact awareness matters.',
      'The strongest use cases are dexterous manipulation, grasp stability, handovers, safety contact, and research evaluation for physical AI.',
      'A humanoid skin system must handle curved geometry, moving joints, cable routing, calibration, and synchronization with robot state.',
    ],
    sections: [
      {
        heading: 'Why humanoid hands need touch',
        body: [
          'A humanoid hand can move without understanding contact. Touch sensing helps it know whether an object is seated, sliding, deforming, or being pressed too hard.',
          'This matters because hands often occlude the object from cameras during manipulation. Tactile data gives the robot a local signal at the surface where the interaction is happening.',
        ],
        bullets: [
          'Detect early slip before a grasp fails',
          'Estimate contact location across fingertips, palm, and side surfaces',
          'Support safer force-limited interaction around people and objects',
          'Create tactile logs for evaluation, replay, and model improvement',
        ],
      },
      {
        heading: 'Humanoid surface constraints',
        body: [
          'Humanoid surfaces are difficult because they are curved, segmented, and mobile. A skin that works on a flat coupon can fail when wrapped around a finger joint or stretched over a palm.',
          'Teams should evaluate coverage, replacement strategy, signal drift, data rate, and how contact maps are registered to the robot model.',
        ],
      },
      {
        heading: 'How to evaluate a humanoid robot skin claim',
        body: [
          'The right question is not whether the skin detects touch in isolation. The useful question is whether it improves a humanoid task under realistic constraints.',
          'Evaluation should include grasp changes, handovers, occluded contact, repeated loading, surface wear, and synchronization with joint state or vision.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does a humanoid robot need full-body robot skin?',
        answer:
          'Not always. Hands, palms, arms, gripper-like end effectors, or high-contact body zones may matter more than uniform full-body coverage.',
      },
      {
        question: 'What is the difference between fingertip sensing and full-hand skin?',
        answer:
          'Fingertip sensing can support pinch tasks. Full-hand coverage can capture palm, side, and multi-contact patterns that appear in power grasps and handovers.',
      },
      {
        question: 'Which RoboSkin page should this link to?',
        answer:
          'Start with robot skin for the definition, tactile AI for the stack, and robot skin papers for source-backed research routes.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'Core definition for the surface layer.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How humanoid touch data becomes behavior.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Hand-specific sensing for grasp stability and slip.' },
      { label: 'Physical AI touch data', href: '/guides/physical-ai-touch-data', description: 'How contact logs support physical AI workflows.' },
      { label: 'Full-hand tactile sensing brief', href: '/research/full-hand-tactile-sensing-2025', description: 'Source-backed full-hand research analysis.' },
      { label: 'Applications overview', href: '/applications', description: 'Existing application route for category use cases.' },
    ],
  },
  {
    path: '/applications/robot-hand-tactile-sensor',
    title: 'Robot Hand Tactile Sensor Guide for Dexterous Grasping',
    description:
      'Robot hand tactile sensors help dexterous hands detect contact, slip, force patterns, and grasp stability. Learn where fingertip, palm, and full-hand sensing differ.',
    h1: 'Robot hand tactile sensor guide',
    kicker: 'Application intent',
    intent: 'Application page for robot hand tactile sensor, tactile robot hand, slip detection, and dexterous manipulation searches.',
    updated: '2026-06-06',
    priority: 0.81,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['robot hand tactile sensor', 'tactile robot hand', 'robot hand touch sensor', 'dexterous hand tactile sensing', 'robot hand slip detection'],
    quickAnswer: [
      'A robot hand tactile sensor measures contact at the hand surface so the robot can understand pressure, slip, grasp stability, and local interaction events.',
      'Fingertip sensors are useful for pinch and precision tasks, while palm and full-hand skin help with power grasps, handovers, and multi-contact manipulation.',
      'The strongest robot hand pages should discuss mounting, wiring, calibration, latency, signal interpretation, and whether tactile data improves a real manipulation task.',
    ],
    sections: [
      {
        heading: 'Where tactile sensing belongs on a robot hand',
        body: [
          'Robot hand sensing can live on fingertips, pads, palm surfaces, side surfaces, or a full-hand skin. The right layout depends on the manipulation problem rather than the keyword.',
          'Precision grasping may need dense fingertip data. Power grasping and handovers often need palm and side contact because the object touches more than the fingertips.',
        ],
        bullets: [
          'Fingertips for pinch, slip, and local force patterns',
          'Palm coverage for power grasps and object seating',
          'Side surfaces for handovers and multi-contact interaction',
          'Full-hand logs for replay, evaluation, and tactile AI training',
        ],
      },
      {
        heading: 'What a useful hand sensor must report',
        body: [
          'A useful tactile hand sensor reports more than a contact yes-or-no value. It should give the robot contact location, timing, pressure or force distribution, and enough signal quality to support decisions.',
          'Slip response is a common target, but teams should be precise. Detecting slip in a lab setup is different from using that signal to adjust grip during a moving, occluded, real-world task.',
        ],
      },
      {
        heading: 'Integration questions before buying or building',
        body: [
          'The hard engineering is often outside the sensing material. Cable routing, readout electronics, finger geometry, calibration, drift, cleaning, and replacement can decide whether the sensor survives on a robot hand.',
          'For SEO and buyer education, this page should link readers from broad robot skin definitions into practical hand-level constraints. That keeps the site useful instead of repeating the same definition under a new phrase.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a robot hand tactile sensor the same as robot skin?',
        answer:
          'It can be part of robot skin. Robot skin is the broader surface category, while a robot hand tactile sensor focuses on contact sensing for fingertips, palms, or full-hand manipulation.',
      },
      {
        question: 'Do robot hands need fingertip sensors or full-hand sensing?',
        answer:
          'It depends on the task. Fingertips are enough for some pinch grasps, but palm and full-hand sensing are more useful for power grasps, handovers, and multi-contact tasks.',
      },
      {
        question: 'What should a robot hand tactile sensor page prove?',
        answer:
          'It should explain what is measured, where the sensor is mounted, how the data reaches the robot stack, and which grasping or evaluation behavior improves because of touch.',
      },
    ],
    relatedLinks: [
      { label: 'Humanoid robot skin', href: '/applications/humanoid-robot-skin', description: 'How hand sensing fits broader humanoid surfaces.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How hand touch data becomes behavior.' },
      { label: 'Full-hand tactile sensing brief', href: '/research/full-hand-tactile-sensing-2025', description: 'A source-backed research route for full-hand sensing.' },
      { label: 'Robot skin papers', href: '/research/robot-skin-papers', description: 'Research routes for tactile sensing and e-skin.' },
    ],
  },
  {
    path: '/applications/soft-robotic-skin',
    title: 'Soft Robotic Skin for Flexible Contact Sensing',
    description:
      'Soft robotic skin uses flexible sensing surfaces for curved robots, grippers, prosthetics, and soft machines. Learn how it differs from generic e-skin.',
    h1: 'Soft robotic skin',
    kicker: 'Application intent',
    intent: 'Application page for soft robotic skin, flexible robot skin, soft gripper tactile sensing, and soft robotics e-skin queries.',
    updated: '2026-06-06',
    priority: 0.79,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['soft robotic skin', 'flexible robot skin', 'soft gripper tactile sensing', 'soft robotics e-skin', 'stretchable tactile sensor'],
    quickAnswer: [
      'Soft robotic skin is a flexible tactile surface designed for curved, deformable, or soft robot structures.',
      'It overlaps with e-skin, but the robotics question is whether the skin survives mounting, bending, repeated contact, and robot-level data use.',
      'The strongest use cases include soft grippers, prosthetic hands, humanoid surfaces, assistive robotics, and contact-rich research platforms.',
    ],
    sections: [
      {
        heading: 'Why soft surfaces change the problem',
        body: [
          'Soft robots and curved end effectors do not give engineers a flat, rigid mounting plane. A tactile layer may need to bend, stretch, compress, or wrap around geometry without losing signal quality.',
          'That is why soft robotic skin pages should discuss mechanics and packaging, not only sensor sensitivity. A skin that works as a flat sample can fail when mounted on a moving soft gripper.',
        ],
        bullets: [
          'Conformal contact on curved or deformable surfaces',
          'Repeated bending, compression, and abrasion during use',
          'Signal changes caused by stretch, mounting, or material drift',
          'Replacement and cleaning constraints for real robot operation',
        ],
      },
      {
        heading: 'Soft robotic skin versus e-skin',
        body: [
          'E-skin is the broader electronic skin category. Soft robotic skin is the robot-facing version of that idea when the robot body or end effector is flexible.',
          'A useful soft robotic skin article should connect material properties to robot tasks: gripping delicate objects, measuring deformation, detecting contact, or improving human-robot interaction.',
        ],
      },
      {
        heading: 'How to avoid overclaiming',
        body: [
          'Soft robotic skin research can be visually impressive, but search pages should keep boundaries clear. A material demo does not automatically prove full robot readiness.',
          'RoboSkin.ai should frame soft skin around evidence: what was tested, what surface was used, what signal was measured, and what remains unproven for robot deployment.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is soft robotic skin only for soft robots?',
        answer:
          'No. It can also be useful on rigid robots with curved or compliant contact surfaces, including gripper pads, palms, prosthetics, and safety covers.',
      },
      {
        question: 'How is soft robotic skin different from a flexible tactile sensor?',
        answer:
          'A flexible tactile sensor is usually the sensing element or array. Soft robotic skin is the integrated robot surface, including mounting, wiring, calibration, and use in robot tasks.',
      },
      {
        question: 'What should be cited on a soft robotic skin page?',
        answer:
          'Original papers or public lab reports should be cited, with clear separation between the reported result and RoboSkin.ai editorial interpretation.',
      },
    ],
    relatedLinks: [
      { label: 'E-skin', href: '/e-skin', description: 'Electronic skin context for flexible sensing.' },
      { label: 'Flexible tactile sensor array', href: '/guides/flexible-tactile-sensor-array', description: 'Array-level explanation for flexible tactile sensing.' },
      { label: 'Single-material soft skin brief', href: '/research/single-material-soft-robotic-skin-2025', description: 'A source-backed soft robotic skin research note.' },
      { label: 'Robot skin vs e-skin', href: '/guides/robot-skin-vs-e-skin', description: 'Terminology boundaries for overlapping phrases.' },
    ],
  },
  {
    path: '/guides/flexible-tactile-sensor-array',
    title: 'Flexible Tactile Sensor Array Guide for Robot Skin',
    description:
      'Flexible tactile sensor arrays measure contact across curved robot surfaces. Learn how arrays relate to robot skin, e-skin, calibration, and tactile AI.',
    h1: 'Flexible tactile sensor array guide',
    kicker: 'Technology guide',
    intent: 'Technology guide for flexible tactile sensor array, tactile sensor matrix, robot skin array, and e-skin sensor array searches.',
    updated: '2026-06-06',
    priority: 0.78,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'resources',
    keywords: ['flexible tactile sensor array', 'tactile sensor array', 'robot skin sensor array', 'tactile sensor matrix', 'flexible pressure sensor array'],
    quickAnswer: [
      'A flexible tactile sensor array is a grid or distributed set of sensing points that measures contact across a curved or deformable surface.',
      'In robot skin, arrays can help localize pressure, infer contact shape, detect slip patterns, and feed tactile AI pipelines.',
      'Array quality depends on resolution, readout stability, latency, calibration, durability, wiring, and how data maps to robot geometry.',
    ],
    sections: [
      {
        heading: 'What an array adds beyond a single sensor',
        body: [
          'A single touch sensor can tell a robot that contact happened. A tactile array can show where contact happened and how pressure changes across a surface.',
          'That spatial pattern is important for hands, grippers, and curved covers because contact rarely happens at one clean point. Objects press, slide, rotate, deform, and touch multiple regions at once.',
        ],
        bullets: [
          'Contact maps across fingertips, palms, pads, or body surfaces',
          'Pressure distribution instead of one scalar force value',
          'Potential slip, shear, vibration, or texture features when supported',
          'Robot geometry registration so data maps back to the physical surface',
        ],
      },
      {
        heading: 'Array tradeoffs',
        body: [
          'Higher resolution is not automatically better. More sensing points can increase wiring, readout complexity, data bandwidth, calibration work, and failure modes.',
          'Good array design starts from the robot task. A collision-aware body cover may need broad coverage and robust events. A dexterous fingertip may need finer spatial patterns and faster response.',
        ],
      },
      {
        heading: 'How arrays feed tactile AI',
        body: [
          'Tactile AI needs consistent, timestamped, robot-ready data. Array outputs often need filtering, normalization, calibration, compression, and synchronization with robot joint state or camera data.',
          'This is where a flexible array becomes more than hardware. The software path determines whether the robot can use the contact map for grasping, safety, or evaluation.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a tactile sensor array required for robot skin?',
        answer:
          'Not always. Some robot skin systems use sparse sensors or event-based contact detection. Arrays are useful when spatial contact patterns matter.',
      },
      {
        question: 'Does flexible mean stretchable?',
        answer:
          'No. Flexible can mean bendable or conformal. Stretchable means the sensor can elongate. These properties have different mechanical and calibration consequences.',
      },
      {
        question: 'What is the SEO role of this page?',
        answer:
          'It captures technology-specific searches and links them back to robot skin, e-skin, soft robotic skin, and tactile AI without duplicating those broader pages.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'The broader surface category.' },
      { label: 'Soft robotic skin', href: '/applications/soft-robotic-skin', description: 'Flexible skin applied to soft or curved robots.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How array data becomes robot behavior.' },
      { label: 'Graphene 3D force brief', href: '/research/graphene-liquid-metal-3d-force-2026', description: 'A source-backed tactile sensing research note.' },
    ],
  },
  {
    path: '/guides/physical-ai-touch-data',
    title: 'Physical AI Touch Data: Why Robots Need Tactile Signals',
    description:
      'Physical AI touch data helps robots understand contact after vision is occluded. Learn how tactile signals support grasping, safety, evaluation, and robot learning.',
    h1: 'Physical AI touch data',
    kicker: 'Technology guide',
    intent: 'Technology guide for physical AI touch data, tactile feedback for robots, robot touch data, and contact-aware AI searches.',
    updated: '2026-06-06',
    priority: 0.77,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'answers',
    keywords: ['physical AI touch data', 'robot touch data', 'tactile feedback for robots', 'contact-aware AI', 'tactile data for robot learning'],
    quickAnswer: [
      'Physical AI touch data is contact information collected from robot surfaces during real interaction with objects, people, tools, or environments.',
      'It complements vision because the robot often needs feedback at the exact surface where contact happens, especially when the hand blocks the camera.',
      'Useful touch data is timestamped, calibrated, mapped to robot geometry, and connected to control, evaluation, or learning workflows.',
    ],
    sections: [
      {
        heading: 'Why vision is not enough',
        body: [
          'Vision can help a robot identify an object and plan an approach. Once the robot touches the object, the hand, gripper, or tool may occlude the most important part of the scene.',
          'Touch data gives physical AI a local signal after contact. It can reveal slip, seating, deformation, force patterns, contact timing, and unexpected interaction events.',
        ],
        bullets: [
          'Grasp stability when cameras are blocked',
          'Safety contact during human-robot interaction',
          'Task evaluation through replayable tactile logs',
          'Feedback loops for manipulation and robot learning',
        ],
      },
      {
        heading: 'What makes touch data useful',
        body: [
          'Raw tactile signals are not automatically useful. They need consistent timing, calibration, coordinate mapping, metadata, and interfaces that robot software can consume.',
          'The best physical AI touch-data pages should focus on the data lifecycle: capture, condition, align, store, interpret, act, and evaluate.',
        ],
      },
      {
        heading: 'Where robot skin fits',
        body: [
          'Robot skin is one way to collect touch data at the surface. A tactile sensor array, soft skin, fingertip pad, or full-hand skin can all produce contact signals for a physical AI stack.',
          'This page should connect broad physical AI language to concrete robot skin implementation details, giving RoboSkin.ai a bridge between trending AI searches and its robotics-specific expertise.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is physical AI touch data only for training models?',
        answer:
          'No. It can be used for real-time control, safety events, grasp evaluation, debugging, benchmarking, and model training.',
      },
      {
        question: 'How does touch data relate to tactile AI?',
        answer:
          'Touch data is the input. Tactile AI is the workflow that processes and uses that input for robot decisions, evaluation, or learning.',
      },
      {
        question: 'Why add this page instead of another robot skin synonym page?',
        answer:
          'Because it captures a different search intent: people asking why touch data matters for physical AI, not just what robot skin means.',
      },
    ],
    relatedLinks: [
      { label: 'Tactile AI', href: '/tactile-ai', description: 'The stack that turns touch data into behavior.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'The surface layer that collects contact signals.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'A concrete hand-level source of touch data.' },
      { label: 'Technology context', href: '/technology', description: 'Existing RoboSkin.ai technology overview.' },
    ],
  },
  {
    path: '/guides/robot-skin-vs-e-skin',
    title: 'Robot Skin vs E-Skin: What Is the Difference?',
    description:
      'Compare robot skin and e-skin. Learn where the terms overlap, where they differ, and how tactile AI connects electronic skin to robot behavior.',
    h1: 'Robot skin vs e-skin',
    kicker: 'Comparison guide',
    intent: 'Comparison page for robot skin vs e-skin, robotic skin vs electronic skin, and terminology disambiguation searches.',
    updated: '2026-06-06',
    priority: 0.8,
    changeFrequency: 'monthly',
    schemaType: 'WebPage',
    visualKey: 'answers',
    keywords: ['robot skin vs e-skin', 'robotic skin vs electronic skin', 'robot skin e-skin difference', 'e-skin robotics', 'robot tactile skin'],
    quickAnswer: [
      'E-skin means electronic skin: a flexible sensor layer that can measure contact-related signals.',
      'Robot skin means tactile sensing applied to a robot surface, usually with robot-specific mounting, data, calibration, and control needs.',
      'The terms overlap when an e-skin layer is used as the tactile surface of a robot hand, gripper, prosthetic, arm, or body cover.',
    ],
    sections: [
      {
        heading: 'The practical difference',
        body: [
          'E-skin describes the sensing layer. Robot skin describes the robot application of that sensing layer. One is closer to materials and flexible electronics; the other is closer to robotics integration.',
          'A research article may show a flexible electronic skin sample. A robot skin system needs that sample to survive mounting, bending, wiring, calibration, data handling, and robot use.',
        ],
        bullets: [
          'Use e-skin when the focus is electronic skin material or flexible sensing',
          'Use robot skin when the focus is a robot surface that senses contact',
          'Use tactile AI when the focus is interpreting touch data for action or evaluation',
          'Use tactile sensor when the focus is the sensing element or array itself',
        ],
      },
      {
        heading: 'Where the terms overlap',
        body: [
          'The overlap is large. A soft e-skin wrapped around a robot fingertip is also robot skin. A flexible tactile array on a gripper pad may be described as electronic skin, tactile sensor array, or robot skin depending on the article.',
          'For search and content structure, the best solution is not to create duplicate pages for every synonym. It is to give each phrase a clear role and link them together.',
        ],
      },
      {
        heading: 'How RoboSkin.ai separates the intents',
        body: [
          'The robot skin page answers the core robotics definition. The e-skin page explains electronic skin. This comparison page resolves the overlap. Research briefs then show source-backed examples.',
          'That structure lets one strong page rank for a cluster of terms while avoiding thin pages that only swap wording.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Should I search robot skin or e-skin?',
        answer:
          'Search robot skin for robotics applications and e-skin for electronic skin materials or flexible sensing research. Search both when studying tactile surfaces for robots.',
      },
      {
        question: 'Can e-skin be used outside robotics?',
        answer:
          'Yes. E-skin also appears in wearables, health monitoring, prosthetics, human-machine interfaces, and flexible electronics research.',
      },
      {
        question: 'Why not create separate pages for robotic skin, robo skin, and robot skins?',
        answer:
          'Those are mostly wording variants. They should usually be covered inside one strong robot skin page instead of split into thin duplicate pages.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'Definition and robotics context.' },
      { label: 'E-skin', href: '/e-skin', description: 'Electronic skin and flexible sensor context.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How touch data becomes behavior.' },
      { label: 'Soft robotic skin', href: '/applications/soft-robotic-skin', description: 'A robot-facing application of flexible sensing.' },
      { label: 'Flexible tactile sensor array', href: '/guides/flexible-tactile-sensor-array', description: 'The array-level technology behind many skin systems.' },
      { label: 'Glossary', href: '/glossary', description: 'Broader terminology matrix.' },
    ],
  },
  {
    path: '/research/robot-skin-papers',
    title: 'Robot Skin Papers and Research Routes',
    description:
      'Browse source-backed robot skin papers and research routes for tactile sensing, e-skin, soft robotic skin, robot hands, and tactile AI.',
    h1: 'Robot skin papers and research routes',
    kicker: 'Research intent',
    intent: 'Research index for robot skin papers, tactile AI papers, e-skin research, and source-backed technical briefs.',
    updated: '2026-06-06',
    priority: 0.78,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'resources',
    keywords: ['robot skin papers', 'robot skin research', 'tactile AI papers', 'e-skin papers', 'robot tactile sensing research'],
    quickAnswer: [
      'This page organizes RoboSkin.ai research routes for robot skin, tactile AI, e-skin, soft robotic skin, tactile arrays, and robot hand sensing.',
      'It is not a claim that RoboSkin.ai produced the original papers. It is a source-backed editorial index that links public sources to practical robotics interpretation.',
      'Use it as a starting point for understanding which papers map to materials, sensor arrays, full-hand sensing, software pipelines, and application constraints.',
    ],
    sections: [
      {
        heading: 'How to read robot skin papers',
        body: [
          'A strong robot skin paper usually combines material behavior, sensor geometry, signal interpretation, and a use case. A weak reading only looks at the headline claim that robots can feel.',
          'Readers should separate reported experimental results from deployment assumptions. Performance in a lab sample does not automatically transfer to a full humanoid hand or industrial gripper.',
        ],
        bullets: [
          'Identify what signal is measured: pressure, shear, slip, temperature, damage, or multimodal input',
          'Check whether the result is shown on a flat sample, fingertip, full hand, gripper, or body surface',
          'Look for calibration, drift, durability, latency, and data-interface details',
          'Ask whether the tactile signal changes a robot behavior or only demonstrates sensing',
        ],
      },
      {
        heading: 'Research lanes to build next',
        body: [
          'The next useful expansion is not a pile of generic blog posts. RoboSkin.ai should build durable research lanes: materials and e-skin, robot hand tactile sensing, tactile AI software, datasets and benchmarks, and application-specific evaluation.',
          'Each lane can support a cluster of keywords while still giving readers a clear reason to stay on the page.',
        ],
      },
      {
        heading: 'Why source boundaries matter',
        body: [
          'Research pages should keep public source claims separate from RoboSkin.ai editorial analysis. That protects credibility and avoids implying product availability, customer use, benchmark values, or certification claims that are not published.',
          'This is also better for search quality. Pages with visible source boundaries, concrete evaluation questions, and internal links are more defensible than generic summaries.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this a complete database of robot skin papers?',
        answer:
          'No. It is an initial research route. The page should expand as more source-backed briefs are added and organized by material, sensor type, software stack, and application.',
      },
      {
        question: 'What papers should be added first?',
        answer:
          'Prioritize papers that explain full-hand tactile sensing, soft e-skin materials, large-area tactile arrays, ROS 2 or robot middleware pipelines, and tactile datasets.',
      },
      {
        question: 'How does this help SEO?',
        answer:
          'A research index can rank for paper and source queries, but more importantly it gives outside sites a useful page to cite instead of linking only to the homepage.',
      },
    ],
    relatedLinks: [
      { label: 'Research index', href: '/research', description: 'Existing source-backed technical briefs.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'Core definition and category page.' },
      { label: 'E-skin', href: '/e-skin', description: 'Electronic skin and soft sensor context.' },
      { label: 'Submit a source', href: '/contact?requestType=research', description: 'Suggest a paper or correction.' },
    ],
    sources: [
      {
        label: 'University of Cambridge graphene-based artificial skin report',
        href: 'https://www.cam.ac.uk/research/news/graphene-based-artificial-skin-brings-human-like-touch-closer-to-robots',
      },
      {
        label: 'University of Cambridge single-material electronic skin report',
        href: 'https://www.cam.ac.uk/stories/robotic-skin',
      },
    ],
    paperBriefIds: [
      'graphene-liquid-metal-3d-force-2026',
      'single-material-soft-robotic-skin-2025',
      'full-hand-tactile-sensing-2025',
    ],
  },
];

export function getSeoTopicPage(path: string) {
  return seoTopicPages.find((page) => page.path === path);
}
