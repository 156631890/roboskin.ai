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
    table?: {
      headers: string[];
      rows: string[][];
    };
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
    updated: '2026-07-10',
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
        heading: 'Robot skin sensor taxonomy',
        body: [
          'A practical robot skin taxonomy should classify a surface by modality, coverage, geometry, durability, and data interface before comparing sensitivity claims. Those dimensions tell readers whether a sensor belongs on a fingertip, palm, gripper pad, arm cover, soft robot, or full humanoid surface.',
          'The taxonomy also separates materials research from robot integration. A flexible e-skin sample, optical tactile pad, pressure matrix, or multimodal skin can all be relevant, but the useful category depends on how the signal survives mounting and reaches robot software.',
        ],
        bullets: [
          'Modality: pressure, shear, slip, strain, vibration, temperature, proximity, or multimodal contact',
          'Coverage: fingertip, full hand, gripper pad, arm surface, soft body, or large-area tactile skin',
          'Geometry and durability: flat sample, curved surface, jointed segment, replaceable layer, or wear-prone cover',
          'Data interface: analog readout, calibrated map, timestamped stream, middleware topic, or controller feature',
        ],
      },
      {
        heading: 'Where robot skin is used',
        body: [
          'Robot skin appears across humanoid robot hands, robotic grippers, e-skin research, flexible tactile sensors, prosthetics, and Physical AI. These areas overlap, but they raise different engineering questions.',
          'RoboSkin.ai separates definitions, applications, technologies, comparisons, and research so readers can move directly to the level of detail they need.',
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
      { label: 'Physical AI', href: '/physics-ai', description: 'Why Physical AI needs robot skin, tactile AI, and contact feedback.' },
      { label: 'E-skin', href: '/e-skin', description: 'How electronic skin overlaps with robot skin.' },
      { label: 'Robot skin vs tactile sensor', href: '/guides/robot-skin-vs-tactile-sensor', description: 'Clarify the system-versus-component distinction.' },
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
      'Tactile AI turns robot touch signals into useful behavior. Learn the tactile AI stack for robot skin, slip detection, contact-aware control, and Physical AI.',
    h1: 'Tactile AI: touch data for Physical AI',
    kicker: 'Core concept',
    intent: 'Definition and system map for tactile AI, touch data, Physical AI tactile feedback, and robot control queries.',
    updated: '2026-06-06',
    priority: 0.86,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'resources',
    keywords: ['tactile AI', 'Physical AI tactile feedback', 'robot touch data', 'contact-aware robotics', 'slip detection robot hand'],
    quickAnswer: [
      'Tactile AI is the sensing, data, and control workflow that turns touch signals into useful robot behavior.',
      'It can support grasp confidence, slip response, contact-aware motion, safer interaction, and evaluation analytics for Physical AI systems.',
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
      { label: 'Tactile feedback for Physical AI', href: '/guides/tactile-feedback-for-physical-ai', description: 'How tactile feedback loops support Physical AI systems.' },
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
          'When evaluating e-skin for a robot, ask how it is mounted, how the signal is read, what data rate is available, how drift is handled, and what robot behavior uses the data.',
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
    kicker: 'Application guide',
    intent: 'Application page for humanoid robot skin, robot hands, body contact sensing, and Physical AI touch queries.',
    updated: '2026-06-06',
    priority: 0.82,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['humanoid robot skin', 'robot hand tactile sensor', 'humanoid tactile sensing', 'robot body contact sensing', 'dexterous robot hands'],
    quickAnswer: [
      'Humanoid robot skin is tactile sensing applied to hands, palms, arms, or other humanoid robot surfaces where contact awareness matters.',
      'The strongest use cases are dexterous manipulation, grasp stability, handovers, safety contact, and research evaluation for Physical AI.',
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
        question: 'What should I read next?',
        answer:
          'Start with robot skin for the definition, tactile AI for the stack, and robot skin papers for source-backed research routes.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'Core definition for the surface layer.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How humanoid touch data becomes behavior.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Hand-specific sensing for grasp stability and slip.' },
      { label: 'Physical AI touch data', href: '/guides/physical-ai-touch-data', description: 'How contact logs support Physical AI workflows.' },
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
    kicker: 'Application guide',
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
      'A strong robot hand evaluation covers mounting, wiring, calibration, latency, signal interpretation, and whether tactile data improves a real manipulation task.',
    ],
    sections: [
      {
        heading: 'Where tactile sensing belongs on a robot hand',
        body: [
          'Robot hand sensing can live on fingertips, pads, palm surfaces, side surfaces, or a full-hand skin. The right layout depends on the manipulation problem rather than the label.',
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
          'This guide connects the broad robot skin category to practical hand-level constraints so teams can move from definition to integration and evaluation.',
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
    kicker: 'Application guide',
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
          'Soft robotic skin evaluation therefore needs mechanics and packaging, not only sensor sensitivity. A skin that works as a flat sample can fail when mounted on a moving soft gripper.',
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
          'A useful soft robotic skin analysis connects material properties to robot tasks: gripping delicate objects, measuring deformation, detecting contact, or improving human-robot interaction.',
        ],
      },
      {
        heading: 'How to avoid overclaiming',
        body: [
          'Soft robotic skin research can be visually impressive, but the evidence boundary must stay clear. A material demo does not automatically prove full robot readiness.',
          'RoboSkin.ai frames soft skin around what was tested, what surface was used, what signal was measured, and what remains unproven for robot deployment.',
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
        question: 'How does a tactile array fit into a robot skin system?',
        answer:
          'A tactile array provides spatial contact measurements. Robot skin adds the mounting, coverage, protection, calibration, data handling, and robot-level use around that sensing layer.',
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
    intent: 'Technology guide for Physical AI touch data, tactile feedback for robots, robot touch data, and contact-aware AI searches.',
    updated: '2026-06-06',
    priority: 0.77,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'answers',
    keywords: ['Physical AI touch data', 'robot touch data', 'tactile feedback for robots', 'contact-aware AI', 'tactile data for robot learning'],
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
          'Touch data gives Physical AI a local signal after contact. It can reveal slip, seating, deformation, force patterns, contact timing, and unexpected interaction events.',
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
          'A useful Physical AI touch-data workflow covers the full lifecycle: capture, condition, align, store, interpret, act, and evaluate.',
        ],
      },
      {
        heading: 'Where robot skin fits',
        body: [
          'Robot skin is one way to collect touch data at the surface. A tactile sensor array, soft skin, fingertip pad, or full-hand skin can all produce contact signals for a Physical AI stack.',
          'The practical connection is the data path from contact event and calibration through timestamps, robot state, control, and task-level evaluation.',
        ],
      },
      {
        heading: 'Touch data pipeline for embodied AI',
        body: [
          'A touch data pipeline for embodied AI should preserve each contact event, timestamp, body frame, calibrated value, and robot action so the signal can be replayed, compared, and used outside the original demo. Without that path, a tactile sensor produces measurements but not durable Physical AI evidence.',
          'The pipeline begins at the contact surface, moves through electronics and calibration, aligns with robot state, stores metadata, and then feeds control, evaluation, or learning. Each stage should be visible enough that another team can understand what was measured and what was inferred.',
        ],
        bullets: [
          'Capture: contact event, timestamp, body frame, calibrated value, and robot action',
          'Align: synchronize tactile data with joint state, vision, commands, and task phase',
          'Store: retain calibration metadata, sensor location, units, sampling rate, and failure notes',
          'Use: expose features for grasp control, safety checks, replay diagnostics, or learning systems',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Physical AI touch data only for training models?',
        answer:
          'No. It can be used for real-time control, safety events, grasp evaluation, debugging, benchmarking, and model training.',
      },
      {
        question: 'How does touch data relate to tactile AI?',
        answer:
          'Touch data is the input. Tactile AI is the workflow that processes and uses that input for robot decisions, evaluation, or learning.',
      },
      {
        question: 'Why treat Physical AI touch data separately from robot skin?',
        answer:
          'Robot skin describes the sensing surface. Physical AI touch data also includes timing, calibration, alignment, storage, interpretation, and how the signal changes a robot action or evaluation.',
      },
    ],
    relatedLinks: [
      { label: 'Tactile AI', href: '/tactile-ai', description: 'The stack that turns touch data into behavior.' },
      { label: 'Tactile feedback for Physical AI', href: '/guides/tactile-feedback-for-physical-ai', description: 'The contact-feedback loop that turns touch data into robot action.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'The surface layer that collects contact signals.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'A concrete hand-level source of touch data.' },
      { label: 'Technology context', href: '/technology', description: 'Existing RoboSkin.ai technology overview.' },
    ],
  },
  {
    path: '/applications/robot-gripper-tactile-sensor',
    title: 'Robot Gripper Tactile Sensor Guide for Contact-Aware Grasping',
    description:
      'Robot gripper tactile sensors help detect contact, pressure patterns, slip, and grasp stability. Learn what to evaluate before choosing tactile sensing for grippers.',
    h1: 'Robot gripper tactile sensor guide',
    kicker: 'Evaluation guide',
    intent: 'Buyer and evaluator page for robot gripper tactile sensor, tactile gripper, gripper slip detection, and contact-aware grasping queries.',
    updated: '2026-06-06',
    priority: 0.79,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['robot gripper tactile sensor', 'tactile gripper sensor', 'gripper slip detection', 'robot gripper touch sensor', 'contact-aware gripper'],
    quickAnswer: [
      'A robot gripper tactile sensor measures contact at the gripping surface so a robot can detect object seating, force patterns, slip, and unstable grasps.',
      'The best gripper sensor depends on the task: delicate handling may need fast slip signals, while broad industrial handling may need durable contact maps and simple replacement.',
      'Evaluation should cover mounting geometry, cable routing, protective layers, calibration drift, signal latency, and whether the controller actually changes behavior from tactile data.',
    ],
    sections: [
      {
        heading: 'What tactile sensing changes for grippers',
        body: [
          'A gripper can close around an object without knowing whether the object is seated, slipping, tilted, or being squeezed too hard. Tactile sensing adds local contact feedback at the surface where grasp failure begins.',
          'This is especially useful when cameras are blocked by fingers, jaws, or the object itself. The tactile signal can reveal contact transitions before the object visibly moves.',
        ],
        bullets: [
          'Contact confirmation before lift or transfer',
          'Slip detection before a drop',
          'Pressure maps for soft, fragile, or irregular objects',
          'Replayable tactile logs for failed grasps',
        ],
      },
      {
        heading: 'Gripper evaluation checklist',
        body: [
          'A gripper evaluation should not only list sensitivity. It must ask how the sensor survives real gripping: abrasion, replacement, cleaning, cable flex, protective skins, and jaw geometry.',
          'Teams should also check software. A sensor that produces a nice plot but cannot publish timestamped robot-ready data is not enough for production evaluation.',
        ],
      },
      {
        heading: 'How gripper sensing connects to the wider system',
        body: [
          'Robot skin defines the surface system, tactile AI explains how contact data is used, and slip detection covers one narrower manipulation problem.',
          'Together these views let teams evaluate the sensing layer, the data path, and the task outcome without collapsing them into one generic category.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do grippers need tactile sensors if they already have force control?',
        answer:
          'Force control helps with aggregate load. Tactile sensors can add local contact location, pressure distribution, slip, and surface interaction signals that force control alone may not capture.',
      },
      {
        question: 'What is the first gripper tactile feature to validate?',
        answer:
          'Validate contact and slip signals on the actual gripper geometry, with the protective layer and object set that matter for the task.',
      },
      {
        question: 'Is a tactile gripper the same as a robot hand tactile sensor?',
        answer:
          'They overlap, but gripper evaluation focuses on jaw pads, end effectors, replacement, industrial handling, and grasp reliability rather than full-hand dexterity.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'The broader tactile surface category.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How gripper touch data becomes decisions.' },
      { label: 'Slip detection robot hand', href: '/guides/slip-detection-robot-hand', description: 'A narrower slip-focused guide.' },
      { label: 'Flexible tactile sensor array', href: '/guides/flexible-tactile-sensor-array', description: 'Array tradeoffs for contact maps.' },
    ],
    sources: [
      {
        label: 'CMU tactile information review for robotic manipulation',
        href: 'https://publications.ri.cmu.edu/a-review-of-tactile-information-perception-and-action-through-touch',
      },
      {
        label: 'ACS large-area flexible tactile sensor article',
        href: 'https://pubs.acs.org/doi/10.1021/acsaelm.5c01200',
      },
    ],
    paperBriefIds: ['large-area-flexible-tactile-arrays-2025', 'graphene-liquid-metal-3d-force-2026'],
  },
  {
    path: '/guides/tactile-sensor-for-robots',
    title: 'Tactile Sensor for Robots: Selection and Evaluation Guide',
    description:
      'A tactile sensor for robots can measure pressure, force, slip, strain, or contact maps. Learn how to compare tactile sensors for robot hands, grippers, and robot skin.',
    h1: 'Tactile sensor for robots',
    kicker: 'Evaluation guide',
    intent: 'Evaluation page for tactile sensor for robots, robot tactile sensor, tactile sensing robotics, and sensor selection searches.',
    updated: '2026-06-06',
    priority: 0.8,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['tactile sensor for robots', 'robot tactile sensor', 'tactile sensing robotics', 'robot pressure sensor', 'tactile sensor selection'],
    quickAnswer: [
      'A tactile sensor for robots measures physical contact so the robot can understand touch at the surface, not only through vision or joint motion.',
      'Useful comparison criteria include signal type, coverage, resolution, latency, calibration, durability, robot software interface, and task-level benefit.',
      'The best sensor is task-specific: a fingertip, gripper pad, soft skin, and full-body contact surface do not need the same architecture.',
    ],
    sections: [
      {
        heading: 'Start with the task, not the sensor type',
        body: [
          'A robot tactile sensor can be capacitive, resistive, optical, magnetic, piezoelectric, fluidic, impedance-based, or hybrid. The architecture matters, but the first question is what the robot must do with touch.',
          'Pick the measurable outcome: safer contact, grasp stability, slip response, material handling, tactile logging, or research benchmarking.',
        ],
        bullets: [
          'Manipulation tasks need contact timing, force patterns, and slip cues',
          'Human-robot interaction surfaces need broad, robust contact events',
          'Research platforms need logged, calibrated, reproducible data',
          'Soft robots need flexible mounting and drift-aware interpretation',
        ],
      },
      {
        heading: 'Comparison dimensions',
        body: [
          'Sensor pages often over-focus on sensitivity. For robots, sensitivity is only one dimension. A robot program also needs geometry, replacement, data rate, synchronization, calibration, and controller integration.',
          'A lower-resolution sensor with stable timing and robust packaging can be more useful than a fragile high-resolution sample that cannot survive mounting.',
        ],
      },
      {
        heading: 'How to connect this to robot skin',
        body: [
          'Robot skin may use one tactile sensor type or combine many. Tactile sensors are the building blocks; robot skin is the surface-level system around them.',
          'Keeping those levels separate makes component selection and full-surface integration easier to evaluate.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a tactile sensor and robot skin?',
        answer:
          'A tactile sensor is the sensing element or array. Robot skin is the integrated surface system that includes mounting, electronics, data handling, and robot use.',
      },
      {
        question: 'Which tactile sensor is best for robots?',
        answer:
          'There is no universal best sensor. The correct choice depends on task, geometry, signal needs, durability, data rate, and software integration.',
      },
      {
        question: 'Should a tactile sensor page include research citations?',
        answer:
          'Yes. Cite public papers or documentation, then separate reported source claims from RoboSkin.ai interpretation.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'The integrated surface system.' },
      { label: 'Flexible tactile sensor array', href: '/guides/flexible-tactile-sensor-array', description: 'Array-level sensing tradeoffs.' },
      { label: 'Robot gripper tactile sensor', href: '/applications/robot-gripper-tactile-sensor', description: 'Gripper-specific evaluation.' },
      { label: 'Robot skin papers', href: '/research/robot-skin-papers', description: 'Source-backed research routes.' },
    ],
    sources: [
      {
        label: 'CMU tactile information review for robotic manipulation',
        href: 'https://publications.ri.cmu.edu/a-review-of-tactile-information-perception-and-action-through-touch',
      },
      {
        label: 'Nature Machine Intelligence full-hand tactile sensing paper',
        href: 'https://www.nature.com/articles/s42256-025-01053-3',
      },
    ],
    paperBriefIds: ['full-hand-tactile-sensing-2025', 'large-area-flexible-tactile-arrays-2025'],
  },
  {
    path: '/guides/robot-touch-sensor',
    title: 'Robot Touch Sensor Guide: From Contact Events to Tactile AI',
    description:
      'Robot touch sensors detect contact events, pressure, force, slip, and tactile patterns. Learn when a touch sensor becomes useful robot skin or tactile AI input.',
    h1: 'Robot touch sensor guide',
    kicker: 'Evaluation guide',
    intent: 'Evaluation page for robot touch sensor, robot touch sensing, robot pressure sensor, and contact sensor robotics searches.',
    updated: '2026-06-06',
    priority: 0.77,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'answers',
    keywords: ['robot touch sensor', 'robot touch sensing', 'robot pressure sensor', 'contact sensor robotics', 'robot tactile feedback'],
    quickAnswer: [
      'A robot touch sensor detects contact at or near the robot surface. It may report a simple event, a pressure value, a force vector, or a spatial tactile pattern.',
      'Touch sensing becomes more valuable when the signal is timestamped, mapped to robot geometry, and used for safety, manipulation, evaluation, or learning.',
      'Robot skin is the broader surface-level integration of touch sensors, packaging, electronics, data handling, and robot behavior.',
    ],
    sections: [
      {
        heading: 'Simple contact versus tactile sensing',
        body: [
          'A simple touch sensor can answer whether contact happened. A tactile sensor can answer more: where contact happened, how force is distributed, whether slip is beginning, or how contact changes over time.',
          'Both can be useful. The problem is when a page treats all touch sensors as if they support the same robot behavior.',
        ],
        bullets: [
          'Contact event sensors for safety and state transitions',
          'Pressure sensors for load and grip feedback',
          'Tactile arrays for contact maps',
          'Slip-sensitive systems for manipulation feedback',
        ],
      },
      {
        heading: 'What to ask before implementation',
        body: [
          'Teams should define what the controller or evaluator will do with the signal. If the signal only appears on a dashboard, it may not improve the robot.',
          'A useful touch sensor plan includes timing, frame mapping, calibration, logging, data storage, and a fallback behavior when readings are noisy.',
        ],
      },
      {
        heading: 'How to choose the right sensing route',
        body: [
          'The right route depends on the system boundary: gripper pads, full hands, tactile arrays, integrated robot skin, or a ROS 2 data pipeline.',
          'Choose the narrowest route that matches the component, surface, software layer, or robot task being evaluated.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a robot touch sensor always tactile AI?',
        answer:
          'No. It becomes part of tactile AI when touch data is processed and used for robot decisions, evaluation, or learning.',
      },
      {
        question: 'Can a simple contact sensor be enough?',
        answer:
          'Yes, for binary contact events or safety triggers. More complex manipulation usually needs richer tactile signals.',
      },
      {
        question: 'What should I evaluate next?',
        answer:
          'Use robot skin for the integrated surface concept, tactile sensor for robots for selection criteria, and ROS 2 tactile sensing for data pipelines.',
      },
    ],
    relatedLinks: [
      { label: 'Tactile sensor for robots', href: '/guides/tactile-sensor-for-robots', description: 'Selection criteria for robot tactile sensors.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'The broader surface system.' },
      { label: 'Physical AI touch data', href: '/guides/physical-ai-touch-data', description: 'Why touch data matters for robot learning.' },
      { label: 'ROS 2 tactile sensing', href: '/guides/ros2-tactile-sensing', description: 'Data and replay workflow for touch signals.' },
    ],
    sources: [
      {
        label: 'CMU tactile information review for robotic manipulation',
        href: 'https://publications.ri.cmu.edu/a-review-of-tactile-information-perception-and-action-through-touch',
      },
      {
        label: 'ROS 2 Kilted documentation',
        href: 'https://docs.ros.org/en/kilted/Releases.html',
      },
    ],
  },
  {
    path: '/guides/slip-detection-robot-hand',
    title: 'Slip Detection for Robot Hands and Tactile Grippers',
    description:
      'Slip detection helps robot hands and grippers react before an object drops. Learn the tactile signals, validation questions, and robot-control constraints.',
    h1: 'Slip detection for robot hands',
    kicker: 'Evaluation guide',
    intent: 'Manipulation page for slip detection robot hand, gripper slip detection, tactile slip sensing, and grasp stability searches.',
    updated: '2026-06-06',
    priority: 0.78,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['slip detection robot hand', 'gripper slip detection', 'tactile slip sensing', 'robot grasp stability', 'robot hand slip sensor'],
    quickAnswer: [
      'Slip detection uses tactile, force, vibration, optical, or multimodal signals to identify object motion at the contact surface before the grasp fails.',
      'For robot hands and grippers, slip detection only matters if the controller can react quickly enough to adjust grip, pose, or task state.',
      'Credible slip evaluation separates sensing demonstrations from closed-loop robot behavior under realistic grasp conditions.',
    ],
    sections: [
      {
        heading: 'What slip detection measures',
        body: [
          'Slip can appear as changing shear force, vibration, contact movement across a tactile array, optical pattern shift, or a learned event classification. The sensor type is less important than whether the signal predicts grasp failure early enough.',
          'The robot also needs context. A sliding object may require more normal force, a different finger pose, or a safe release depending on object fragility and task constraints.',
        ],
        bullets: [
          'Early slip onset before a visible drop',
          'Direction and speed of contact movement when available',
          'Confidence signal for controller decisions',
          'Replay logs that show whether reaction timing was fast enough',
        ],
      },
      {
        heading: 'Validation questions',
        body: [
          'Bench slip detection is not enough. Ask whether slip was detected during real manipulation, with the same skin, object set, and gripper geometry.',
          'Latency matters. A perfect classifier that fires too late will not save the grasp.',
        ],
      },
      {
        heading: 'Where slip detection fits',
        body: [
          'Slip detection is a specific manipulation problem within the broader robot skin and tactile sensing stack.',
          'It is most useful when teams can connect the contact signal to reaction latency, controller behavior, and grasp outcomes.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can slip detection work without tactile arrays?',
        answer:
          'Yes. Slip can be detected with force, vibration, optical, or event-based signals. Arrays are useful when contact movement across the surface matters.',
      },
      {
        question: 'What is the biggest slip-detection failure mode?',
        answer:
          'Late or poorly synchronized detection. The signal must arrive early enough and be connected to a controller response.',
      },
      {
        question: 'Should slip detection be tested on the final gripper?',
        answer:
          'Yes. Mounting, protective layers, object materials, and jaw geometry can all change slip signals.',
      },
    ],
    relatedLinks: [
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Hand-level tactile sensing context.' },
      { label: 'Robot gripper tactile sensor', href: '/applications/robot-gripper-tactile-sensor', description: 'Gripper-level contact sensing context.' },
      { label: 'Graphene 3D force brief', href: '/research/graphene-liquid-metal-3d-force-2026', description: 'Source-backed multi-axis force and slip research.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How slip signals become behavior.' },
    ],
    sources: [
      {
        label: 'NIST tactile slip detection for industrial robot grasping',
        href: 'https://www.nist.gov/publications/slip-detection-analysis-and-calibration-univariate-tactile-signals',
      },
      {
        label: 'University of Cambridge graphene-based artificial skin report',
        href: 'https://www.cam.ac.uk/research/news/graphene-based-artificial-skin-brings-human-like-touch-closer-to-robots',
      },
    ],
    paperBriefIds: ['graphene-liquid-metal-3d-force-2026', 'full-hand-tactile-sensing-2025'],
  },
  {
    path: '/guides/ros2-tactile-sensing',
    title: 'ROS 2 Tactile Sensing Pipeline Guide for Robot Skin Data',
    description:
      'ROS 2 tactile sensing needs timestamped messages, frame mapping, rosbag replay, and controller interfaces. Learn how robot skin data becomes usable.',
    h1: 'ROS 2 tactile sensing pipeline',
    kicker: 'Integration guide',
    intent: 'Software integration page for ROS 2 tactile sensing, robot skin ROS 2, tactile data pipeline, and rosbag tactile replay searches.',
    updated: '2026-06-06',
    priority: 0.76,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'resources',
    keywords: ['ROS 2 tactile sensing', 'robot skin ROS 2', 'tactile data pipeline', 'rosbag tactile data', 'robot tactile middleware'],
    quickAnswer: [
      'ROS 2 tactile sensing is the software workflow that publishes, synchronizes, records, replays, and consumes robot touch data.',
      'A serious tactile pipeline should define message format, timestamps, frame IDs, calibration metadata, raw-data logging, and controller-facing outputs.',
      'Without replayable data and clear coordinate mapping, robot skin becomes difficult to debug and weak as evidence for tactile AI claims.',
    ],
    sections: [
      {
        heading: 'Minimum tactile data contract',
        body: [
          'A robot skin signal should not be treated as a screenshot or isolated plot. It needs a data contract: what was measured, when it was measured, where it happened on the robot, and how another engineer can replay the event.',
          'ROS 2 gives robotics teams the vocabulary for topics, timestamps, frames, rosbag logs, controllers, and replayable experiments.',
        ],
        bullets: [
          'Message schema for pressure maps, force vectors, events, or features',
          'Timestamps aligned with robot state and other sensors',
          'Frame IDs that map tactile readings to robot geometry',
          'rosbag or equivalent logs for failed and successful grasps',
        ],
      },
      {
        heading: 'What to log',
        body: [
          'Teams should log raw tactile data when possible, not only classifications. A slip label is useful, but raw data helps explain false positives and compare controller timing.',
          'A useful log also includes joint state, command outputs, calibration context, and object/task metadata.',
        ],
      },
      {
        heading: 'Why software integration matters',
        body: [
          'Most robot skin pages talk about materials. A ROS 2 tactile sensing page proves that RoboSkin.ai understands the software layer that turns skin into robot-ready evidence.',
          'That layer makes timing, replay, calibration metadata, and controller-facing interfaces explicit enough to reproduce and evaluate.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does ROS 2 provide a standard robot skin message?',
        answer:
          'Not as a universal robot skin standard. Teams still need to define message schemas for their tactile output and document how each signal maps to the robot.',
      },
      {
        question: 'Why is rosbag replay important for tactile sensing?',
        answer:
          'Tactile events happen quickly. Replay lets engineers inspect contact signals, joint states, controller actions, and failures after the run.',
      },
      {
        question: 'Should tactile classifiers publish confidence values?',
        answer:
          'Yes. Confidence and raw-data traceability help engineers debug false events and decide how a controller should react.',
      },
    ],
    relatedLinks: [
      { label: 'Physical AI touch data', href: '/guides/physical-ai-touch-data', description: 'Why touch data matters for Physical AI workflows.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'The stack that uses robot touch signals.' },
      { label: 'ROS 2 pipeline brief', href: '/research/ros2-kilted-tactile-pipeline-2026', description: 'Source-backed ROS 2 tactile pipeline article.' },
      { label: 'Technology context', href: '/technology', description: 'Existing site-level technology overview.' },
    ],
    sources: [
      {
        label: 'ROS 2 documentation',
        href: 'https://docs.ros.org/',
      },
      {
        label: 'ROS 2 rosbag tutorial',
        href: 'https://docs.ros.org/en/rolling/Tutorials/Advanced/Recording-A-Bag-From-Your-Own-Node-CPP.html',
      },
      {
        label: 'ros2_control documentation',
        href: 'https://control.ros.org/',
      },
    ],
    paperBriefIds: ['ros2-kilted-tactile-pipeline-2026'],
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
          'The clearest explanation does not treat every synonym as a separate concept. It gives each term a practical role and connects the overlapping layers.',
        ],
      },
      {
        heading: 'How RoboSkin.ai separates the terms',
        body: [
          'The robot skin page answers the core robotics definition. The e-skin page explains electronic skin. This comparison page resolves the overlap. Research briefs then show source-backed examples.',
          'That structure gives readers one complete comparison instead of several thin explanations that only swap terminology.',
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
    title: 'Robot Skin Papers and Tactile Sensing Research Index',
    description:
      'Browse source-backed robot skin papers and research routes for tactile sensing, e-skin, soft robotic skin, robot hands, and tactile AI.',
    h1: 'Robot skin papers and tactile sensing research index',
    kicker: 'Research guide',
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
        heading: 'Research lanes to explore',
        body: [
          'Useful research lanes include materials and e-skin, robot hand tactile sensing, tactile AI software, datasets and benchmarks, and application-specific evaluation.',
          'Each lane gives readers a distinct path through materials, sensing, integration, and robot-learning evidence.',
        ],
      },
      {
        heading: 'Why source boundaries matter',
        body: [
          'This index keeps public source claims separate from RoboSkin.ai editorial analysis. That protects credibility and avoids implying product availability, customer use, benchmark values, or certification claims that are not published.',
          'Visible source boundaries and concrete evaluation questions also make the analysis easier to verify and cite than a generic summary.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this a complete database of robot skin papers?',
        answer:
          'No. It is an initial research route that can incorporate new source-backed briefs organized by material, sensor type, software stack, and application.',
      },
      {
        question: 'What papers should be added first?',
        answer:
          'Prioritize papers that explain full-hand tactile sensing, soft e-skin materials, large-area tactile arrays, ROS 2 or robot middleware pipelines, and tactile datasets.',
      },
      {
        question: 'Why use a research index?',
        answer:
          'A research index gives readers one source-backed route for comparing papers, sensing methods, evidence levels, and implementation limits.',
      },
    ],
    relatedLinks: [
      { label: 'Open the structured research index', href: '/research-index', description: 'Compare normalized sensing principles, modalities, evidence levels, and limitations.' },
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
      {
        label: 'Nature Machine Intelligence full-hand tactile sensing paper',
        href: 'https://www.nature.com/articles/s42256-025-01053-3',
      },
      {
        label: 'RSC temperature/pressure bimodal tactile sensing review',
        href: 'https://pubs.rsc.org/en/content/articlehtml/2025/tc/d5tc02514a',
      },
      {
        label: 'Frontiers event-based opto-tactile skin article',
        href: 'https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2025.1735068/full',
      },
      {
        label: 'Chemical Engineering Journal self-healing e-skin article',
        href: 'https://www.sciencedirect.com/science/article/pii/S1385894725132531',
      },
      {
        label: 'ROS 2 documentation',
        href: 'https://docs.ros.org/',
      },
      {
        label: 'ACS large-area flexible tactile sensor article',
        href: 'https://pubs.acs.org/doi/10.1021/acsaelm.5c01200',
      },
    ],
    paperBriefIds: [
      'graphene-liquid-metal-3d-force-2026',
      'single-material-soft-robotic-skin-2025',
      'full-hand-tactile-sensing-2025',
    ],
  },
  {
    path: '/guides/robot-skin-vs-tactile-sensor',
    title: 'Robot Skin vs Tactile Sensor: System and Component Difference',
    description:
      'Compare robot skin and tactile sensor terms. Learn when a robot needs a tactile sensor, when it needs robot skin, and how tactile AI connects the system.',
    h1: 'Robot skin vs tactile sensor',
    kicker: 'Comparison guide',
    intent: 'Comparison page for robot skin vs tactile sensor, robot tactile sensor, tactile sensing surface, and robot skin system searches.',
    updated: '2026-06-16',
    priority: 0.8,
    changeFrequency: 'monthly',
    schemaType: 'WebPage',
    visualKey: 'answers',
    keywords: ['robot skin vs tactile sensor', 'robot tactile sensor', 'tactile sensing surface', 'robot skin system', 'tactile sensor comparison'],
    quickAnswer: [
      'A tactile sensor is a component or array that measures contact signals such as pressure, force, shear, slip, strain, or temperature.',
      'Robot skin is the larger robot-facing system: a tactile surface, mounting layer, electronics, calibration, data pipeline, and control or evaluation workflow.',
      'A robot may use tactile sensors without having full robot skin. Robot skin usually includes tactile sensors but also adds coverage, packaging, software, and robot integration constraints.',
    ],
    sections: [
      {
        heading: 'Component versus system',
        body: [
          'A tactile sensor can be a fingertip pad, force cell, pressure matrix, optical tactile unit, flexible array, or multimodal sensing element. It answers what is measured at a contact point or surface.',
          'Robot skin answers a broader robotics question: how a robot surface senses contact across geometry, survives use, routes data, preserves calibration, and gives the robot a usable signal.',
        ],
        bullets: [
          'Use tactile sensor when evaluating the sensing component or output',
          'Use robot skin when evaluating coverage, mounting, durability, and robot integration',
          'Use tactile AI when the touch data changes behavior, classification, or evaluation',
          'Use e-skin when the focus is flexible electronic skin materials',
        ],
      },
      {
        heading: 'Why the distinction matters',
        body: [
          'Treating robot skin and tactile sensors as exact synonyms hides important system boundaries. A good tactile sensor can still fail as robot skin if it cannot be mounted, calibrated, protected, serviced, or synchronized with robot state.',
          'Likewise, a broad robot skin concept still depends on concrete sensor choices. The system needs enough signal quality, spatial coverage, data rate, and reliability for the task.',
        ],
      },
      {
        heading: 'How to evaluate claims',
        body: [
          'Ask whether the source demonstrates a component, a surface, or a robot behavior. A benchtop tactile sensor test is valuable, but it is not the same as a robot hand using robot skin to adjust grip during manipulation.',
          'A useful comparison should identify what was measured, how the sensor was mounted, whether data was logged, and whether the tactile signal changed a real robot decision.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is robot skin just many tactile sensors?',
        answer:
          'Not only. Arrays of tactile sensors can be part of robot skin, but robot skin also includes packaging, coverage, calibration, data handling, replacement strategy, and robot-facing interpretation.',
      },
      {
        question: 'Which term should I use?',
        answer:
          'Use tactile sensor for component selection and measurement questions. Use robot skin for full-surface robot integration, humanoid hands, grippers, and Physical AI contact feedback.',
      },
      {
        question: 'Can one page cover both terms?',
        answer:
          'Yes, when the page explains the distinction. Separate thin pages for every wording variant are weaker than one comparison page with clear related routes.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'System-level definition and category overview.' },
      { label: 'Tactile sensor for robots', href: '/guides/tactile-sensor-for-robots', description: 'Component selection and evaluation criteria.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How touch data becomes useful robot behavior.' },
      { label: 'Robot skin vs e-skin', href: '/guides/robot-skin-vs-e-skin', description: 'Adjacent terminology comparison.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Hand-level application context.' },
      { label: 'Research routes', href: '/research/robot-skin-papers', description: 'Source-backed research paths.' },
    ],
    sources: [
      {
        label: 'University of Cambridge graphene-based artificial skin report',
        href: 'https://www.cam.ac.uk/research/news/graphene-based-artificial-skin-brings-human-like-touch-closer-to-robots',
      },
      {
        label: 'Nature Machine Intelligence full-hand tactile sensing paper',
        href: 'https://www.nature.com/articles/s42256-025-01053-3',
      },
    ],
    paperBriefIds: ['graphene-liquid-metal-3d-force-2026', 'full-hand-tactile-sensing-2025'],
  },
  {
    path: '/guides/tactile-feedback-for-physical-ai',
    title: 'Tactile Feedback for Physical AI Robots',
    description:
      'Tactile feedback for Physical AI gives robots contact data after vision is blocked. Learn signals, feedback loops, evaluation questions, and robot skin routes.',
    h1: 'Tactile feedback for Physical AI',
    kicker: 'Physical AI guide',
    intent: 'Technology guide for tactile feedback for Physical AI, robot touch feedback, Physical AI tactile sensing, and contact feedback searches.',
    updated: '2026-06-16',
    priority: 0.82,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['tactile feedback for Physical AI', 'Physical AI tactile sensing', 'robot touch feedback', 'contact feedback robots', 'robot skin feedback loop'],
    quickAnswer: [
      'Tactile feedback for Physical AI is the contact signal loop that helps a robot understand what happens after it touches the world.',
      'The loop may include robot skin, fingertip sensors, force or pressure maps, slip events, timestamps, calibration metadata, and controller-facing features.',
      'Useful tactile feedback is not only sensing. It must arrive early enough, map to the robot body, and support grasping, safety, evaluation, or learning.',
    ],
    sections: [
      {
        heading: 'Why Physical AI needs contact feedback',
        body: [
          'Physical AI systems act in the real world, where vision can be blocked by a hand, object, tool, or body surface. Contact feedback gives the robot local evidence at the interaction surface.',
          'Robot skin and tactile sensors can reveal contact location, pressure, shear, slip, and other signals that help the robot decide whether a grasp is stable, unsafe, or changing.',
        ],
        bullets: [
          'Contact location and force patterns after visual occlusion',
          'Early slip events before an object visibly falls',
          'Safety contact and unexpected interaction signals',
          'Replayable tactile logs for evaluation and learning',
        ],
      },
      {
        heading: 'The feedback loop',
        body: [
          'A tactile feedback loop starts when the surface measures contact. Electronics and software timestamp the signal, map it to the robot, extract useful features, and expose those features to a controller, model, or evaluator.',
          'If any layer is missing, the robot may record touch but fail to use it. Physical AI evaluation therefore needs data contracts, latency, calibration, and task-level validation.',
        ],
      },
      {
        heading: 'What to verify',
        body: [
          'The key test is whether tactile feedback changes a robot outcome. A contact classifier is useful, but a stronger demonstration shows grip adjustment, safer contact, better replay diagnostics, or improved manipulation under occlusion.',
          'Claims should stay narrow unless a public source supports broader deployment readiness, benchmark values, or product availability.',
        ],
      },
      {
        heading: 'Physical AI tactile feedback evaluation metrics',
        body: [
          'Evaluation should measure latency, synchronization, drift, repeatability, and task outcome instead of only showing a clean contact map. Physical AI needs feedback that arrives in time, stays aligned with robot state, and changes a real action or evaluation result.',
          'Useful metrics also distinguish sensor quality from system quality. A high-resolution array is not enough if the signal drifts after mounting, loses timing, or cannot be mapped back to the robot body and task.',
        ],
        bullets: [
          'Latency: time from surface contact to controller-usable feature',
          'Synchronization: alignment with joint state, vision frames, commands, and tactile logs',
          'Drift and repeatability: stability after mounting, repeated loading, and surface wear',
          'Task outcome: grasp stability, slip recovery, safety response, replay diagnosis, or evaluation gain',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is tactile feedback for Physical AI the same as robot skin?',
        answer:
          'No. Robot skin can provide tactile feedback, but tactile feedback also includes the data path, timing, interpretation, and controller or evaluation loop.',
      },
      {
        question: 'Why is vision not enough for Physical AI?',
        answer:
          'Vision often loses direct information after contact because the robot hand or object blocks the camera. Tactile feedback measures the interaction where it happens.',
      },
      {
        question: 'What should I read next?',
        answer:
          'Start with the Physical AI explainer, then read robot skin, tactile AI, ROS 2 tactile sensing, and robot hand tactile sensor routes.',
      },
    ],
    relatedLinks: [
      { label: 'Physical AI explainer', href: '/physics-ai', description: 'Canonical RoboSkin.ai Physical AI route.' },
      { label: 'Physical AI touch data', href: '/guides/physical-ai-touch-data', description: 'Adjacent guide focused on touch data handling.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'Surface-level contact sensing route.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How touch signals become behavior.' },
      { label: 'ROS 2 tactile sensing', href: '/guides/ros2-tactile-sensing', description: 'Software pipeline and replay context.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Hand-level tactile feedback application.' },
    ],
    sources: [
      {
        label: 'University of Cambridge graphene-based artificial skin report',
        href: 'https://www.cam.ac.uk/research/news/graphene-based-artificial-skin-brings-human-like-touch-closer-to-robots',
      },
      {
        label: 'ROS 2 documentation',
        href: 'https://docs.ros.org/',
      },
    ],
    paperBriefIds: ['graphene-liquid-metal-3d-force-2026', 'ros2-kilted-tactile-pipeline-2026'],
  },
  {
    path: '/guides/tactile-sensor-benchmark-robot-manipulation',
    title: 'Tactile Sensor Benchmark for Robot Manipulation',
    description:
      'Compare visual, acoustic, magnetic, and resistive tactile sensors by manipulation task, signal, integration constraint, and evidence boundary.',
    h1: 'Tactile sensor benchmark for robot manipulation',
    kicker: 'Sensor comparison guide',
    intent: 'Comparison guide for tactile sensor benchmark, robot manipulation tactile sensor comparison, and robot touch sensor evaluation searches.',
    updated: '2026-07-20',
    priority: 0.84,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['tactile sensor benchmark', 'robot manipulation tactile sensor', 'tactile sensor comparison', 'robot touch sensor benchmark', 'visual tactile sensor'],
    quickAnswer: [
      'There is no universal best tactile sensor for robot manipulation. The useful choice depends on the contact event, task geometry, latency, coverage, and controller input the robot needs.',
      'The 2026 TacO preprint compares visual, acoustic, magnetic, and resistive sensing across unknown-mass pick-and-place, object reorientation, and plug insertion. Its central result is task dependence, not one modality winning every task.',
      'A defensible benchmark starts with the robot task, keeps mounting and control conditions visible, and measures whether tactile input changes manipulation outcomes under repeatable disturbances.',
    ],
    sections: [
      {
        heading: 'What a tactile benchmark should answer',
        body: [
          'A sensor specification sheet describes the component. A manipulation benchmark should show whether the resulting signal helps a robot complete a contact-rich task. That requires the sensor, mounting, calibration, data rate, controller, object set, and failure conditions to be reported together.',
          'TacO is useful because it compares four tactile modalities within three manipulation tasks. The paper reports that usefulness varies with task requirements and properties such as spatial resolution, shear sensing, and surface friction. That finding argues for task-first selection instead of a single leaderboard.',
        ],
        bullets: [
          'Define the contact event the robot must detect or regulate',
          'Separate sensor output quality from controller quality',
          'Keep object, mounting, surface, and disturbance conditions comparable',
          'Report task success and failure modes, not only clean sensor maps',
        ],
      },
      {
        heading: 'Four tactile sensing modalities at a glance',
        body: [
          'The table describes engineering tendencies, not TacO winners. Products and research prototypes within the same modality can differ greatly in spatial resolution, bandwidth, force range, shear sensitivity, footprint, and durability.',
        ],
        table: {
          headers: ['Modality', 'Primary signal route', 'Potential advantage', 'Constraint to test', 'Task-fit question'],
          rows: [
            ['Visual', 'A camera observes deformation, markers, or surface appearance inside the sensor.', 'Dense spatial contact geometry and deformation images.', 'Optical stack size, illumination stability, surface wear, frame rate, and compute.', 'Does the task need local contact shape or a dense pressure proxy?'],
            ['Acoustic', 'A microphone or vibration path records contact-generated sound.', 'Transient contact, vibration, impact, and texture cues at high temporal resolution.', 'Ambient noise, structural coupling, repeatable mounting, and signal interpretation.', 'Does the decision depend on fast slip, impact, or texture events?'],
            ['Magnetic', 'Magnetometers measure field changes caused by deformation of an embedded magnetic structure.', 'Compact multi-axis deformation or force-sensitive measurements.', 'Calibration, magnetic interference, temperature effects, and unit-to-unit variation.', 'Does the controller need directional force or shear information in a compact package?'],
            ['Resistive', 'Resistance changes under pressure or deformation across a sensing element or array.', 'Direct contact or pressure response in thin, potentially conformable layouts.', 'Hysteresis, drift, crosstalk, wiring density, and repeated-load behavior.', 'Is broad pressure coverage more important than dense contact geometry?'],
          ],
        },
      },
      {
        heading: 'Benchmark by manipulation task',
        body: [
          'TacO uses three tasks that stress different parts of the tactile pipeline. A team can reuse this structure even when its hardware, robot hand, or object set differs. The important step is to connect each task to a measurable tactile contribution.',
        ],
        table: {
          headers: ['Task', 'Contact problem', 'What to measure', 'Failure question'],
          rows: [
            ['Pick-and-place with unknown mass', 'The robot must establish and maintain a grasp without knowing object mass in advance.', 'Task success, grip adjustment, slip events, excess force, and response latency.', 'Did tactile input prevent slip or crushing when visual appearance did not reveal load?'],
            ['Object reorientation', 'Contacts move across the hand while object pose changes.', 'Pose completion, contact continuity, shear or slip response, and recovery attempts.', 'Could the system distinguish intended rolling or sliding from loss of control?'],
            ['Plug insertion', 'Small pose errors create contact forces that must guide alignment.', 'Insertion success, peak force, completion time, jamming, and corrective actions.', 'Did tactile input reveal useful alignment error before the controller jammed the plug?'],
          ],
        },
      },
      {
        heading: 'A minimum evaluation protocol',
        body: [
          'Run a vision-only or no-tactile baseline beside each tactile condition. Repeat trials across objects, starting poses, surface conditions, and disturbances that matter to deployment. Preserve raw tactile streams, calibrated values, robot state, commands, and outcomes so failures can be replayed.',
          'A fair modality comparison also exposes non-sensor differences. If one system uses a larger model, a faster controller, different fingertips, or extra object-specific tuning, the result is a system comparison rather than isolated sensor evidence.',
        ],
        bullets: [
          'Task success rate with uncertainty or trial counts',
          'Contact-to-feature and feature-to-action latency',
          'Calibration drift before and after repeated loading',
          'Performance on held-out objects, poses, and surface conditions',
          'Mounting, replacement, cleaning, wiring, and compute burden',
          'Replayable failures linked to tactile and robot-state logs',
        ],
      },
      {
        heading: 'Claim boundary',
        body: [
          'TacO is a 2026 preprint. Its comparison is evidence for the reported sensors, tasks, robot setup, and protocol; it does not establish a permanent ranking for every visual, acoustic, magnetic, or resistive tactile sensor.',
          'Use the paper as a benchmark design reference and verify code, data, hardware details, and later peer-reviewed revisions before treating a result as procurement evidence. A production decision also needs durability, replacement, environmental, and integration testing that a manipulation benchmark may not cover.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which tactile sensor modality is best for robot manipulation?',
        answer:
          'No modality is best for every task. Choose from the contact signal and task outcome required, then compare candidate sensors under the same mounting, controller, objects, and disturbances.',
      },
      {
        question: 'Can sensor resolution predict manipulation success?',
        answer:
          'Not by itself. Spatial resolution can matter, but latency, shear sensitivity, friction, force range, calibration, coverage, and controller design can change the result.',
      },
      {
        question: 'What is the most important tactile benchmark baseline?',
        answer:
          'Use the same manipulation system without tactile input or with the tactile pathway disabled. This shows whether touch changes the task outcome instead of merely producing an attractive signal visualization.',
      },
      {
        question: 'Is TacO a final industry standard?',
        answer:
          'No. It is a 2026 preprint and a useful task-based comparison framework. It should not be treated as a certification standard or universal modality ranking.',
      },
    ],
    relatedLinks: [
      { label: 'Tactile datasets for robot learning', href: '/guides/tactile-datasets-robot-learning', description: 'Compare dataset scope, splits, signals, and transfer limits.' },
      { label: 'Tactile foundation models', href: '/guides/tactile-foundation-models', description: 'Compare representation, world-model, and policy roles.' },
      { label: 'Tactile sensor for robots', href: '/guides/tactile-sensor-for-robots', description: 'Component selection and integration criteria.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Hand coverage, contact, and manipulation context.' },
      { label: 'Slip detection for robot hands', href: '/guides/slip-detection-robot-hand', description: 'Evaluate slip signals and closed-loop response.' },
      { label: 'Research index', href: '/research-index', description: 'Filter source-backed records by modality and evidence.' },
    ],
    sources: [
      { label: 'TacO tactile sensor benchmark preprint', href: 'https://arxiv.org/abs/2605.21976' },
      { label: 'Nature Machine Intelligence full-hand tactile sensing paper', href: 'https://www.nature.com/articles/s42256-025-01053-3' },
    ],
    paperBriefIds: ['open-source-magnetic-tactile-calibration-2024', 'full-hand-tactile-sensing-2025', 'event-based-opto-tactile-2025'],
  },
  {
    path: '/guides/tactile-datasets-robot-learning',
    title: 'Tactile Datasets for Robot Learning: 2026 Directory',
    description:
      'Compare tactile datasets for robot learning by signals, collection unit, split design, task fit, access evidence, and transfer limits.',
    h1: 'Tactile datasets for robot learning',
    kicker: '2026 dataset directory',
    intent: 'Resource guide for tactile datasets, robot learning touch data, visuo-tactile datasets, and tactile manipulation dataset searches.',
    updated: '2026-07-20',
    priority: 0.85,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'resources',
    keywords: ['tactile datasets', 'tactile dataset robot learning', 'visuo-tactile dataset', 'robot touch dataset', 'tactile manipulation dataset'],
    quickAnswer: [
      'A useful tactile dataset is defined by more than frame count. Check the physical collection event, sensor and robot state alignment, object and task diversity, split unit, access terms, and downstream evaluation.',
      'Contact sequences matter because adjacent tactile frames from the same press or trajectory are strongly related. Random frame splits can leak near-duplicate contact evidence into both training and test sets.',
      'Choose the dataset that matches the intended learning problem: material understanding, whole-hand contact, imitation learning, multisensory representation learning, or target-robot control.',
    ],
    sections: [
      {
        heading: 'How to read this directory',
        body: [
          'The entries below are research resources with different goals; they are not interchangeable rows in one leaderboard. Some emphasize tactile-language and material understanding, others whole-hand contact, data collection, humanoid action alignment, or multisensory representation learning.',
          'Before use, open the primary source and project page. Verify the actual downloadable files, license, sensor hardware, collection protocol, annotations, train-test splits, and version. A paper saying that a resource is open does not replace checking the current repository terms.',
        ],
      },
      {
        heading: 'Tactile dataset and resource comparison',
        body: [
          'This comparison records the main research unit and the limit a user should preserve. Counts are included only where the primary source states them clearly.',
        ],
        table: {
          headers: ['Resource', 'Signals and scale', 'Best-fit question', 'Evaluation unit', 'Evidence boundary'],
          rows: [
            ['RCT', '29,279 tactile frames from 122 industrial reference materials in 7 categories, collected with 3 DIGIT sensors; paired touch, image, language, and force context.', 'Material understanding and tactile-language retrieval.', 'Keep full press or contact sequences together; test held-out materials where possible.', 'A 2026 preprint. Reported performance is specific to its sensors, materials, models, and splits.'],
            ['TactiDex', 'Whole-hand tactile observations aligned with multi-granularity kinematic and object states for single-hand and bimanual tasks.', 'Contact-rich dexterity and transfer across manipulation settings.', 'Use the standardized task and transfer protocol described by the source.', 'A 2026 preprint and project resource; inspect the released tasks, files, and license before reuse.'],
            ['FreeTacMan', 'Paired visuo-tactile observations and interaction trajectories collected with a portable, human-operated workflow.', 'Scaling contact-rich demonstrations without occupying a robot arm for every collection session.', 'Split by task, object, trajectory, and operator conditions that match the transfer claim.', 'A 2025 preprint; human-device data still needs validation on the target robot embodiment.'],
            ['Humanoid visual-tactile-action dataset', 'Synchronized vision, tactile observations, and action context for humanoid contact-rich manipulation.', 'Learning policies that need touch aligned with the action that produced it.', 'Keep synchronized trajectory segments and embodiment conditions intact.', 'A preprint; transfer depends on robot geometry, sensor placement, action space, and task distribution.'],
            ['Sparsh-X research resource', 'Digit 360 tactile images, audio, motion, and pressure used for self-supervised multisensory touch representations.', 'Learning reusable tactile features across physical-property and manipulation tasks.', 'Evaluate downstream tasks and held-out conditions, not only pretraining loss.', 'A 2025 preprint tied to a multisensory sensor stack; cross-sensor transfer still requires evidence.'],
          ],
        },
      },
      {
        heading: 'Why contact-sequence splits matter',
        body: [
          'RCT reports 29,279 frames but also preserves full contact sequences. Frames from one press are correlated, so a random frame-level split can place nearly the same physical event in training and test data. The paper reports that removing contact-sequence overlap reduces tactile-to-text Recall@1 by 17.7 percentage points.',
          'The broader rule is to split at the level of the claim. For unseen-material performance, hold out materials. For unseen-object manipulation, hold out objects. For transfer across robots or sensors, hold out the target hardware. A large test set is not independent if the same contact event, object instance, or trajectory appears on both sides.',
        ],
        bullets: [
          'Record the physical unit: press, grasp, trajectory, object, task, operator, robot, and sensor',
          'Group correlated frames before creating train, validation, and test sets',
          'Publish split manifests or deterministic split code',
          'Report results for the hardest held-out condition relevant to the claim',
        ],
      },
      {
        heading: 'Dataset selection checklist',
        body: [
          'Start from the deployment mismatch you need to measure. A material dataset may be rich enough for tactile-language learning but unsuitable for action-conditioned robot control. A whole-hand trajectory dataset may support dexterity research but still mismatch a fingertip sensor, gripper geometry, or action space.',
        ],
        bullets: [
          'Access: files, repository status, license, citation, version, and checksum',
          'Hardware: sensor model, serial variation, placement, sampling rate, calibration, and units',
          'Alignment: timestamps for touch, vision, force, pose, joint state, and actions',
          'Coverage: objects, materials, tasks, contact types, operators, robots, and disturbances',
          'Splits: sequence, object, material, task, sensor, or embodiment independence',
          'Outcome: retrieval, classification, prediction, imitation, or real-robot task success',
        ],
      },
      {
        heading: 'What dataset size does not prove',
        body: [
          'Frame count does not establish diversity, independent evaluation, target-robot transfer, or production readiness. Ten thousand adjacent frames from a small set of presses can contain less independent evidence than a smaller collection spread across objects, sensors, and trajectories.',
          'Use this directory to locate sources, then document the exact dataset version and split used in your experiment. Do not compare headline metrics across resources unless the sensor inputs, tasks, models, and evaluation protocols are genuinely aligned.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best tactile dataset for robot learning?',
        answer:
          'There is no universal best dataset. Match the resource to the learning goal, sensor signals, robot embodiment, task, and evaluation split required by the deployment claim.',
      },
      {
        question: 'Why are random frame splits risky for tactile data?',
        answer:
          'Adjacent frames from the same press, grasp, or trajectory can be near duplicates. If they appear in both training and test sets, the metric can overstate generalization.',
      },
      {
        question: 'Does open source mean unrestricted commercial use?',
        answer:
          'No. Open access to a paper, project page, code, or files does not define commercial rights. Check the license for the exact dataset version and every bundled asset.',
      },
      {
        question: 'Should tactile datasets include robot actions?',
        answer:
          'They should when the goal is policy learning, action-conditioned prediction, or replay of manipulation. Material recognition or representation learning may use different labels and collection units.',
      },
    ],
    relatedLinks: [
      { label: 'Tactile foundation models', href: '/guides/tactile-foundation-models', description: 'See how tactile resources support representations, prediction, and control.' },
      { label: 'Tactile sensor benchmark', href: '/guides/tactile-sensor-benchmark-robot-manipulation', description: 'Connect data quality to task-level sensor evidence.' },
      { label: 'Physical AI touch data', href: '/guides/physical-ai-touch-data', description: 'Map contact events, timestamps, robot state, and actions.' },
      { label: 'ROS 2 tactile sensing', href: '/guides/ros2-tactile-sensing', description: 'Build replayable tactile logs and aligned robot data.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'Follow the sensing-to-behavior stack.' },
      { label: 'Research index', href: '/research-index', description: 'Browse source-backed tactile research records.' },
    ],
    sources: [
      { label: 'RCT dataset preprint', href: 'https://arxiv.org/abs/2606.31694' },
      { label: 'RCT dataset project page', href: 'https://faerber-lab.github.io/RCT/' },
      { label: 'TactiDex dataset preprint', href: 'https://arxiv.org/abs/2607.09190' },
      { label: 'TactiDex project page', href: 'https://tactidex.github.io/' },
      { label: 'FreeTacMan preprint', href: 'https://arxiv.org/html/2506.01941v1' },
      { label: 'Humanoid visual-tactile-action dataset preprint', href: 'https://arxiv.org/html/2510.25725v2' },
      { label: 'Sparsh-X multisensory touch preprint', href: 'https://arxiv.org/html/2506.14754v1' },
    ],
    paperBriefIds: ['freetacman-robot-free-visuotactile-data-collection-2025', 'humanoid-visual-tactile-action-dataset-2025', 'sparsh-x-multisensory-touch-representations-2025'],
  },
  {
    path: '/guides/tactile-foundation-models',
    title: 'Tactile Foundation Models for Robotics Compared',
    description:
      'Compare tactile foundation models and related robot-learning systems by representation, prediction, policy role, evidence, and transfer limits.',
    h1: 'Tactile foundation models for robotics compared',
    kicker: 'Tactile AI model guide',
    intent: 'Comparison guide for tactile foundation models, tactile AI models, tactile world models, and robot touch representation searches.',
    updated: '2026-07-20',
    priority: 0.86,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['tactile foundation models', 'tactile AI model', 'tactile world model', 'robot touch representation', 'tactile robot learning'],
    quickAnswer: [
      'Tactile foundation model is not one fixed architecture. Current systems may learn reusable touch representations, predict future tactile observations, combine vision-language planning with tactile control, or adapt heterogeneous sensor streams for imitation learning.',
      'Sparsh-X, Dream-Tac, TouchWorld, and MiTaS address different layers of the tactile AI stack. Their metrics are not a direct leaderboard because the sensors, tasks, training data, baselines, and outputs differ.',
      'Evaluate a model by the role touch plays, the transfer claim it tests, the robot task it changes, and the latency and hardware assumptions required at deployment.',
    ],
    sections: [
      {
        heading: 'Four different jobs for tactile learning',
        body: [
          'A reusable representation compresses raw tactile signals into features for later tasks. A world model predicts how touch may change after an action. A policy converts observations and goals into robot actions. A residual tactile controller makes fast local corrections around a slower plan.',
          'These roles can be combined, but they should not be confused. A model that improves material classification has not automatically demonstrated dexterous control. A policy with high task success has not automatically shown broad transfer across tactile sensors.',
        ],
      },
      {
        heading: 'Model and system comparison',
        body: [
          'The table compares architectural role and evidence boundary. It does not rank unlike systems by one score. MiTaS is included as a related tactile learning system, not labeled here as a general-purpose foundation model.',
        ],
        table: {
          headers: ['System', 'Primary level', 'Role of tactile data', 'Reported evaluation focus', 'Evidence boundary'],
          rows: [
            ['Sparsh-X', 'Self-supervised multisensory representation', 'Fuses Digit 360 image, audio, motion, and pressure into reusable touch features.', 'Physical-property inference and contact-rich manipulation tasks.', '2025 preprint; sensor stack and cross-hardware transfer assumptions must be checked.'],
            ['Dream-Tac', 'Tactile world-action model', 'Predicts future visual and tactile observations conditioned on robot actions.', 'Contact-rich manipulation where anticipating tactile futures can support action selection.', '2026 preprint; reported tasks and hardware do not establish universal world-model transfer.'],
            ['TouchWorld', 'Hierarchical planning and tactile control system', 'Combines vision-language planning, tactile world-model prediction, goal-conditioned action, and high-frequency tactile residual correction.', 'Six dexterous manipulation tasks in clean and perturbed conditions.', '2026 preprint; reported success rates are specific to its tasks, sensors, data, and baselines.'],
            ['MiTaS', 'Multi-resolution tactile imitation learning', 'Aligns vision-based and event-based tactile streams with different spatial and temporal properties.', 'Robot-hand imitation learning with heterogeneous tactile inputs.', '2026 preprint and related learning system; it does not by itself establish a general tactile foundation model.'],
          ],
        },
      },
      {
        heading: 'How to compare tactile models fairly',
        body: [
          'First match the output. Representation quality should be tested on held-out downstream tasks and conditions. World-model quality needs prediction metrics plus evidence that prediction improves action. Policy quality needs real-robot task outcomes, disturbances, baselines, and trial counts.',
          'Then expose the hardware contract. Note every tactile modality, sensor model, placement, sampling rate, calibration path, preprocessing step, and synchronization assumption. A model that accepts tactile images from one fingertip does not automatically accept whole-hand force arrays or acoustic touch streams.',
        ],
        bullets: [
          'Transfer across objects, tasks, sensors, placements, robots, and environments',
          'Ablation showing what tactile input adds beyond vision and proprioception',
          'Pretraining data composition and train-test independence',
          'Online latency, update rate, compute, and controller interface',
          'Recovery under slip, occlusion, contact uncertainty, and external disturbance',
          'Availability and license for model weights, code, data, and evaluation tasks',
        ],
      },
      {
        heading: 'Where TouchWorld fits',
        body: [
          'TouchWorld reports a hierarchical system with slower semantic planning and faster tactile correction. The preprint reports 65.0% success in clean conditions and 53.7% under perturbations across six tasks, with improvements of 15.7 and 18.5 percentage points over its strongest reported baseline.',
          'Those numbers are useful within the paper protocol, not as a general score for all tactile foundation models. The architectural lesson is more portable: semantic task reasoning and high-frequency contact correction operate on different time scales and may need separate pathways.',
        ],
      },
      {
        heading: 'What foundation does not guarantee',
        body: [
          'The word foundation does not guarantee sensor independence, zero-shot robot transfer, safe contact, low latency, public weights, or production readiness. Each of those needs separate evidence. A large pretraining corpus can still contain split leakage or narrow sensor coverage.',
          'For deployment, treat the model as one layer in a tactile system. The surface, calibration, synchronization, robot state, control loop, failure logging, and task benchmark still determine whether learned touch changes behavior reliably.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is a tactile foundation model?',
        answer:
          'It generally refers to a model trained on broad tactile data so its representations or learned dynamics can support multiple downstream touch tasks. The term is used inconsistently, so always inspect the exact transfer experiments.',
      },
      {
        question: 'Is a tactile world model the same as a tactile foundation model?',
        answer:
          'No. A tactile world model predicts future tactile observations or contact dynamics. It may be pretrained broadly, but world modeling describes its predictive role, not the breadth of its transfer evidence.',
      },
      {
        question: 'Can one tactile model work with every sensor?',
        answer:
          'Not without evidence. Tactile sensors expose different images, forces, events, audio, pressure arrays, rates, and calibration assumptions. Cross-sensor transfer must be designed and tested explicitly.',
      },
      {
        question: 'Should model comparisons use task success or offline metrics?',
        answer:
          'Use both when possible. Offline metrics diagnose representation or prediction quality; real-robot task success shows whether the tactile pathway changes manipulation under execution noise.',
      },
    ],
    relatedLinks: [
      { label: 'Tactile datasets for robot learning', href: '/guides/tactile-datasets-robot-learning', description: 'Compare training resources, splits, signals, and access evidence.' },
      { label: 'Tactile sensor benchmark', href: '/guides/tactile-sensor-benchmark-robot-manipulation', description: 'Evaluate the hardware and task layer beneath learned models.' },
      { label: 'TouchWorld news brief', href: '/news/touchworld-tactile-foundation-model-dexterous-manipulation-2026', description: 'Read the source-bounded summary of the 2026 preprint.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'Map sensors, data, models, control, and validation.' },
      { label: 'Physical AI touch data', href: '/guides/physical-ai-touch-data', description: 'Define replayable contact data for embodied systems.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Connect models to fingertip, palm, and whole-hand sensing.' },
    ],
    sources: [
      { label: 'Sparsh-X multisensory touch preprint', href: 'https://arxiv.org/html/2506.14754v1' },
      { label: 'Dream-Tac tactile world-action model preprint', href: 'https://arxiv.org/html/2606.08737v1' },
      { label: 'TouchWorld tactile foundation model preprint', href: 'https://arxiv.org/abs/2607.07287' },
      { label: 'MiTaS multi-resolution tactile imitation learning preprint', href: 'https://arxiv.org/html/2606.06281v1' },
    ],
    paperBriefIds: ['sparsh-x-multisensory-touch-representations-2025', 'dream-tac-tactile-world-action-model-2026', 'mitas-multi-resolution-tactile-imitation-learning-2026'],
  },
];

export function getSeoTopicPage(path: string) {
  return seoTopicPages.find((page) => page.path === path);
}
