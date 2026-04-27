export type ContentTile = {
  title: string;
  description: string;
  ctaLabel?: string;
  href?: string;
};

export type ComparisonRow = {
  label: string;
  sensorArray: string;
  developerKit: string;
  customProgram: string;
};

export type ImplementationStage = {
  title: string;
  summary: string;
  inputs: string[];
  outputs: string[];
};

export type ResourceItem = {
  title: string;
  description: string;
  availability: string;
  ctaLabel?: string;
  href?: string;
  includes?: string[];
};

export type ResourceSection = {
  title: string;
  items: ResourceItem[];
};

export type TechnologyLayer = {
  title: string;
  summary: string;
  bullets?: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
  ctaLabel?: string;
  href?: string;
};

export type AboutSection = {
  title: string;
  summary: string;
  bullets: string[];
};

export type CaseStudySummary = {
  title: string;
  context: string;
  approach: string;
  outcome: string;
  note: string;
  ctaLabel: string;
  href: string;
};

export type NewsItem = {
  date: string;
  title: string;
  summary: string;
  href?: string;
  ctaLabel?: string;
};

export type EvaluationPoint = {
  title: string;
  summary: string;
  checkpoints: string[];
  href: string;
  ctaLabel: string;
};

export type DataFlowStep = {
  title: string;
  summary: string;
  output: string;
};

export type FitCriterion = {
  title: string;
  description: string;
};

export type ContactPath = {
  title: string;
  summary: string;
  href: string;
  ctaLabel: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
  related: string[];
  href: string;
};

export type DecisionGuideQuestion = {
  prompt: string;
  signal: string;
  recommendation: string;
  href: string;
};

export const site = {
  name: 'RoboSkin.ai',
  url: 'https://roboskin.ai',
  tagline: 'Robot skin, tactile AI, e-skin, and contact-aware robotics',
  contact: {
    primaryEmail: 'contact@roboskin.ai',
    salesEmail: 'sales@roboskin.ai',
    legalEmail: 'legal@roboskin.ai',
    privacyEmail: 'privacy@roboskin.ai',
    whatsapp: '15755596955',
    whatsappDial: '8615755596955',
    wechat: '15755596955',
  },
};

export const primaryNavigation = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/resources', label: 'Resources' },
  { href: '/products', label: 'Products' },
  { href: '/technology', label: 'Technology' },
  { href: '/contact', label: 'Contact' },
];

export const footerNavigation = [
  {
    title: 'Platform',
    links: [
      { href: '/products', label: 'Products' },
      { href: '/comparison', label: 'Comparison' },
      { href: '/solutions', label: 'Solutions' },
      { href: '/technology', label: 'Technology' },
      { href: '/resources', label: 'Resources' },
      { href: '/implementation', label: 'Implementation' },
      { href: '/downloads', label: 'Downloads' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
      { href: '/case-studies', label: 'Case studies' },
      { href: '/research', label: 'Research' },
      { href: '/glossary', label: 'Glossary' },
      { href: '/news', label: 'News' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

export const homeStats = [
  { value: 'Portal', label: 'Robot skin and tactile AI research map' },
  { value: 'Brief', label: 'State of Tactile AI request path' },
  { value: 'Map', label: 'Humanoid tactile stack and supplier categories' },
  { value: 'Index', label: 'Evaluation kit and benchmark directory concept' },
];

export const homeProofPoints: ContentTile[] = [
  {
    title: 'Category-defining narrative',
    description: 'RoboSkin.ai frames robot skin and tactile AI as a required layer for physical AI systems that need contact awareness.',
  },
  {
    title: 'Searchable industry vocabulary',
    description: 'Robot skin, robotic skin, tactile AI, electronic skin, e-skin, tactile sensing, slip detection, and humanoid robot skin are organized in practical context.',
  },
  {
    title: 'Research and buyer utility',
    description: 'The site can grow into a reference hub for papers, labs, companies, products, datasets, patents, and procurement questions.',
  },
  {
    title: 'Strategic asset packaging',
    description: 'Brief requests, partner inquiries, sponsorship paths, and strategic acquisition inquiries are routed through one clear conversion system.',
  },
];

export const homeUseCases = [
  {
    title: 'Humanoid robot hands',
    text: 'Touch feedback for dexterous manipulation, grasp confidence, and contact-aware control.',
  },
  {
    title: 'Prosthetics and assistive robotics',
    text: 'Surface feedback for force awareness, safer interaction, and human-device interfaces.',
  },
  {
    title: 'Warehouse picking',
    text: 'Tactile signals for slip detection, fragile-object handling, and gripper evaluation.',
  },
  {
    title: 'Collaborative and medical robots',
    text: 'Contact-aware robot surfaces for safer proximity, manipulation, and procedure support.',
  },
];

export const tactileIndustryDirections: ContentTile[] = [
  {
    title: 'Robot skin industry portal',
    description: 'A global robot skin / tactile AI reference site covering research, companies, sensor technologies, use cases, and procurement guides.',
    href: '/research',
    ctaLabel: 'Explore research',
  },
  {
    title: 'Tactile AI industry report',
    description: 'An annual State of Tactile AI brief for robot hands, flexible sensors, e-skin, tactile datasets, and embodied AI applications.',
    href: '/contact?requestType=brief&requestedAsset=State%20of%20Tactile%20AI',
    ctaLabel: 'Request brief',
  },
  {
    title: 'Humanoid supply chain map',
    description: 'A Humanoid Tactile Stack Map across sensors, flexible materials, controllers, edge AI, datasets, simulation, grippers, prosthetics, and safety skins.',
    href: '/resources',
    ctaLabel: 'View map path',
  },
  {
    title: 'Tactile data and benchmark entry',
    description: 'A future-facing entry point for tactile datasets, benchmark methods, evaluation protocols, and robot touch data infrastructure.',
    href: '/downloads',
    ctaLabel: 'Request benchmark notes',
  },
  {
    title: 'B2B lead platform',
    description: 'A routing layer for robotics OEMs, gripper makers, warehouse automation teams, prosthetics companies, medical robotics groups, and flexible electronics suppliers.',
    href: '/contact?requestType=partnership',
    ctaLabel: 'Discuss partnership',
  },
  {
    title: 'Brand asset or domain sale',
    description: 'A stronger acquisition package built around the domain, industry content, email interest, and inquiry history instead of a bare domain listing.',
    href: '/contact?requestType=acquisition',
    ctaLabel: 'Strategic inquiry',
  },
  {
    title: 'Light product layer',
    description: 'A RoboSkin Index or Evaluation Kit Directory that helps enterprise teams shortlist tactile sensing approaches before vendor conversations.',
    href: '/products',
    ctaLabel: 'See evaluation paths',
  },
];

export const tactileAiStack: TechnologyLayer[] = [
  {
    title: 'Skin materials',
    summary: 'Flexible, soft, stretchable, or conformal surfaces that define where contact can be measured.',
  },
  {
    title: 'Tactile sensors',
    summary: 'Capacitive, piezoresistive, optical, magnetic, liquid metal, or multimodal sensor arrays for robot touch.',
  },
  {
    title: 'Signal processing',
    summary: 'Filtering, calibration, timestamping, and feature extraction that turn raw contact into usable streams.',
  },
  {
    title: 'Edge AI',
    summary: 'Local models and embedded processing for slip events, contact classification, and lower-latency response.',
  },
  {
    title: 'Robot control',
    summary: 'Middleware, controllers, and policies that use touch for grasping, safety, manipulation, and evaluation.',
  },
  {
    title: 'Safety reflex',
    summary: 'Contact-aware responses that help physical AI systems behave more safely around people and objects.',
  },
  {
    title: 'Tactile data feedback',
    summary: 'Logs, datasets, benchmarks, and replay loops that make robot touch measurable and improvable over time.',
  },
];

export const researchMapAreas: ContentTile[] = [
  {
    title: 'Papers and labs',
    description: 'Track tactile perception robotics, soft tactile sensors, multimodal e-skin, neuromorphic touch, and robot hand research.',
  },
  {
    title: 'Companies and products',
    description: 'Map tactile sensor arrays, robot hand sensors, gripper sensors, flexible electronics, prosthetics interfaces, and safety skin vendors.',
  },
  {
    title: 'Datasets and benchmarks',
    description: 'Follow tactile datasets, evaluation protocols, slip detection benchmarks, and multimodal manipulation tasks.',
  },
  {
    title: 'Patents and market signals',
    description: 'Watch filings, partnerships, hiring, production roadmaps, and humanoid robotics programs that point to tactile stack demand.',
  },
];

export const marketSignals: ContentTile[] = [
  {
    title: 'Humanoid programs need hands',
    description: 'Dexterous manipulation creates demand for tactile feedback beyond vision and force-torque sensing.',
  },
  {
    title: 'Automation needs safer contact',
    description: 'Grippers, cobots, and warehouse systems need better signals for slip, collision, proximity, and fragile handling.',
  },
  {
    title: 'Embodied AI needs new data',
    description: 'Tactile datasets and benchmark protocols will matter as physical AI moves from perception to contact-rich work.',
  },
  {
    title: 'Flexible electronics are maturing',
    description: 'Materials, sensor arrays, and embedded processing are moving tactile sensing closer to deployable robot surfaces.',
  },
];

export const contentRoadmapTopics = [
  'What is robot skin?',
  'What is tactile AI?',
  'Why humanoid robots need touch',
  'Robot skin vs electronic skin',
  'Tactile sensors for robot hands',
  'Slip detection in robotic manipulation',
  'The tactile AI stack',
  'How robot skin improves human-robot safety',
  'Best research labs working on robotic skin',
  'The future of e-skin in humanoid robotics',
];

export const manifesto = {
  title: 'The Tactile AI Manifesto',
  summary: 'AI can see. AI can speak. AI can reason. But to work safely in the physical world, AI must learn to feel.',
};

export const productCards = [
  {
    name: 'Tactile Sensor Module',
    bestFor: 'Robot hand and gripper programs',
    summary: 'Flexible tactile hardware for evaluation, demos, and pilot integration.',
    inputsOutputs: 'Surface integration, contact events, robot-ready signals',
    specs: ['High-density sensing layout', 'Flexible form factors', 'Private datasheet on request', 'Pilot support'],
    evaluation: ['Target surface size and curvature', 'Pressure and shear signal expectations', 'Mounting and cable-routing constraints', 'Calibration and replay plan'],
    verificationNote: 'Best used when a team needs a real tactile baseline before choosing a custom skin geometry.',
    cta: 'Request datasheet',
  },
  {
    name: 'Developer Kit',
    bestFor: 'Engineering teams that need a fast prototype path',
    summary: 'Hardware, examples, and integration notes for bringing tactile sensing into a stack quickly.',
    inputsOutputs: 'Sample sensors, examples, integration guidance',
    specs: ['Developer workflow', 'API access', 'Pilot-friendly setup', 'Request availability'],
    evaluation: ['Bring-up time', 'Example data flow', 'SDK and ROS 2 expectations', 'Bench-test repeatability'],
    verificationNote: 'Best used when software and controls teams need fast tactile data for early experiments.',
    cta: 'Talk to engineering',
  },
  {
    name: 'Custom Skin Program',
    bestFor: 'Programs with a specific robot, geometry, or environment',
    summary: 'Application-driven support for custom form factors, mounting constraints, and deployment fit.',
    inputsOutputs: 'Requirements review, geometry scoping, custom delivery',
    specs: ['Custom geometry', 'Program scoping', 'Engineering consultation', 'Quote on request'],
    evaluation: ['Robot geometry review', 'Attachment and serviceability plan', 'Environmental constraints', 'Pilot success criteria'],
    verificationNote: 'Best used when the robot surface, packaging, or operating environment makes an off-the-shelf array insufficient.',
    cta: 'Request custom review',
  },
];

export const decisionGuideQuestions: DecisionGuideQuestion[] = [
  {
    prompt: 'You need a baseline tactile surface for bench tests or an early pilot.',
    signal: 'Surface geometry is known and you want sensor data quickly.',
    recommendation: 'Start with the Tactile Sensor Module and request the current datasheet.',
    href: '/contact?requestType=datasheet',
  },
  {
    prompt: 'Your controls or software team needs examples, SDK notes, or ROS 2 discussion.',
    signal: 'Bring-up speed and integration documentation matter more than custom geometry.',
    recommendation: 'Start with the Developer Kit and ask for integration notes.',
    href: '/contact?requestType=integration',
  },
  {
    prompt: 'Your robot has curved surfaces, packaging constraints, or deployment conditions.',
    signal: 'Mounting, cable routing, serviceability, or validation will drive the design.',
    recommendation: 'Start with a Custom Skin Program review.',
    href: '/contact?requestType=integration',
  },
];
export const evaluationPoints: EvaluationPoint[] = [
  {
    title: 'Evaluation packet',
    summary: 'A concise package for teams comparing tactile sensor options before prototype or pilot work.',
    checkpoints: ['Datasheet request', 'Surface geometry fit check', 'Signal and interface review', 'Pilot success criteria'],
    href: '/downloads',
    ctaLabel: 'Request technical material',
  },
  {
    title: 'Integration review',
    summary: 'A practical review for teams with curved surfaces, robot hands, grippers, or custom mounting constraints.',
    checkpoints: ['Robot platform', 'Target surface and curvature', 'Data pipeline expectations', 'Timeline and deployment stage'],
    href: '/contact?requestType=integration',
    ctaLabel: 'Talk to engineering',
  },
  {
    title: 'Evidence policy',
    summary: 'Public pages describe what can be evaluated, while measurable details are confirmed in request-only material.',
    checkpoints: ['Measured benchmarks only', 'Verified customer claims only', 'Measured details on request', 'Application-specific validation'],
    href: '/faq',
    ctaLabel: 'Read the FAQ',
  },
];

export const solutionCards = [
  {
    title: 'Robotic grippers and manipulation',
    problem: 'Contact uncertainty slows automation and increases handling risk.',
    why: 'Tactile sensing improves grip control, slip detection, and task confidence.',
    path: 'Start with the sensor array or developer kit depending on geometry complexity.',
    note: 'Best fit for pick-and-place, bin picking, and fragile object handling.',
  },
  {
    title: 'Humanoid robots',
    problem: 'Human-like motion needs contact feedback on hands and body surfaces.',
    why: 'Touch input helps controllers react to collisions, pose changes, and user contact.',
    path: 'Use the custom integration program for form-factor-specific work.',
    note: 'Works well for research platforms and pre-production humanoid programs.',
  },
  {
    title: 'Prosthetics and medical robotics',
    problem: 'Assistive systems need safer force awareness and dependable surface feedback.',
    why: 'Tactile input can support control refinement and better interaction design.',
    path: 'Review integration requirements before selecting the sensor configuration.',
    note: 'Use only verified, application-specific claims in public materials.',
  },
  {
    title: 'Research and education',
    problem: 'Teams need a credible platform for experiments and curriculum work.',
    why: 'A focused tactile kit shortens setup time and keeps projects repeatable.',
    path: 'Begin with the developer kit and request technical documentation.',
    note: 'Ideal for labs, universities, and prototype demos.',
  },
];

export const technologyLayers: TechnologyLayer[] = [
  {
    title: 'Sensing layer',
    summary: 'Flexible tactile elements capture contact, pressure, and interaction events.',
    bullets: [
      'Define the sensing layout around the robot contact surface and expected interactions.',
      'Prioritize repeatability and mounting practicality over demo-only geometries.',
      'Route uncertain requirements into an engineering review instead of public claims.',
    ],
  },
  {
    title: 'Signal and processing layer',
    summary: 'Local processing turns raw sensor output into cleaner robot-ready data.',
    bullets: [
      'Clarify sampling, latency constraints, and where processing should live in your stack.',
      'Document what "robot-ready" signals mean for your controller and telemetry pipeline.',
      'Confirm interfaces and support details on request for a specific platform.',
    ],
  },
  {
    title: 'Materials and form factor layer',
    summary: 'Mechanical design supports curved surfaces and application-driven layouts.',
    bullets: [
      'Map curvature, attachment methods, and packaging constraints early.',
      'Treat durability expectations as application-specific and verified on request.',
      'Use pilot phases to validate fit and serviceability before wider rollout.',
    ],
  },
  {
    title: 'Integration layer',
    summary: 'The platform is organized around robotics workflows and engineering support.',
    bullets: [
      'Start with a scoped evaluation plan, then move to a pilot integration review.',
      'Keep public details practical; expand platform-specific details in technical material.',
      'Align on success criteria and next steps for prototype, pilot, and deployment.',
    ],
  },
];

export const sensorDataFlow: DataFlowStep[] = [
  {
    title: 'Contact surface',
    summary: 'Flexible tactile elements sit on the robot hand, gripper, arm, or curved body surface.',
    output: 'Local pressure, shear, slip, temperature, or contact-event signals depending on configuration.',
  },
  {
    title: 'Signal conditioning',
    summary: 'Electronics and firmware clean raw readings, align timestamps, and preserve calibration metadata.',
    output: 'Robot-ready tactile frames, event streams, or reduced contact features.',
  },
  {
    title: 'Robot middleware',
    summary: 'The integration layer maps tactile data into the team pipeline, including ROS 2, replay, logging, and controller interfaces when applicable.',
    output: 'Documented topics, coordinate frames, QoS expectations, and debug workflow.',
  },
  {
    title: 'Controller or analytics loop',
    summary: 'The robot stack uses tactile features for grip confidence, slip response, contact-aware motion, or evaluation analytics.',
    output: 'Task-specific success criteria for prototype, pilot, or deployment review.',
  },
];

export const fitCriteria: FitCriterion[] = [
  {
    title: 'Geometry fit',
    description: 'Target surface area, curvature, attachment method, cable routing, and serviceability determine the starting product path.',
  },
  {
    title: 'Signal fit',
    description: 'Teams should define whether they need pressure maps, shear, slip events, temperature, force/torque context, or lower-bandwidth contact events.',
  },
  {
    title: 'Software fit',
    description: 'Useful integrations define message formats, timestamps, coordinate frames, logging, replay, and calibration handling before pilot work.',
  },
  {
    title: 'Validation fit',
    description: 'Durability, latency, sensitivity, drift, and environmental claims should be measured against the exact robot and use case.',
  },
];

export const resourceSections: ResourceSection[] = [
  {
    title: 'Industry briefs',
    items: [
      {
        title: 'State of Tactile AI',
        description: 'Request the RoboSkin.ai brief on robot hands, flexible sensors, e-skin, tactile datasets, and physical AI applications.',
        availability: 'Brief request',
        ctaLabel: 'Request brief',
        href: '/contact?requestType=brief&requestedAsset=State%20of%20Tactile%20AI',
        includes: ['Market map', 'Research themes', 'Company categories', 'Buyer questions'],
      },
      {
        title: 'Humanoid Tactile Stack Map',
        description: 'Request the map of sensors, materials, edge AI, controllers, datasets, simulation, grippers, prosthetics, and safety skins.',
        availability: 'Map request',
        ctaLabel: 'Request map',
        href: '/contact?requestType=brief&requestedAsset=Humanoid%20Tactile%20Stack%20Map',
        includes: ['Stack layers', 'Supplier categories', 'Integration questions', 'Evaluation paths'],
      },
      {
        title: 'The Tactile AI Manifesto',
        description: 'A category narrative explaining why physical AI needs robot skin, tactile sensing, and contact-aware robotics.',
        availability: 'Public concept',
        ctaLabel: 'Request copy',
        href: '/contact?requestType=brief&requestedAsset=Tactile%20AI%20Manifesto',
        includes: ['Category framing', 'Core thesis', 'Messaging notes', 'Partner narrative'],
      },
      {
        title: 'RoboSkin Index concept',
        description: 'A future directory concept for evaluating tactile sensor kits, benchmark methods, and contact-rich robotics use cases.',
        availability: 'Concept request',
        ctaLabel: 'Discuss directory',
        href: '/contact?requestType=partnership&requestedAsset=RoboSkin%20Index',
        includes: ['Evaluation criteria', 'Directory structure', 'Sponsorship path', 'Partner fit'],
      },
    ],
  },
  {
    title: 'Datasheets',
    items: [
      {
        title: 'RS-1000 Sensor Array',
        description: 'Request the current datasheet for the sensor array.',
        availability: 'Request only',
        ctaLabel: 'Request',
        href: '/contact?requestType=datasheet',
      },
      {
        title: 'Developer Kit',
        description: 'Ask for the latest hardware overview and integration notes.',
        availability: 'Request only',
        ctaLabel: 'Request',
        href: '/contact?requestType=datasheet',
      },
    ],
  },
  {
    title: 'Integration docs',
    items: [
      {
        title: 'Getting started guide',
        description: 'Request onboarding instructions for pilot projects.',
        availability: 'Request only',
        ctaLabel: 'Request',
        href: '/contact?requestType=integration',
      },
      {
        title: 'ROS / ROS2 support',
        description: 'Confirm compatibility details with engineering.',
        availability: 'Verified on request',
        ctaLabel: 'Confirm',
        href: '/contact?requestType=integration',
      },
    ],
  },
  {
    title: 'SDK access',
    items: [
      {
        title: 'Python SDK',
        description: 'Request access for evaluation and integration work.',
        availability: 'Request only',
        ctaLabel: 'Request',
        href: '/contact?requestType=integration',
      },
      {
        title: 'C++ SDK',
        description: 'Ask for the current tooling and example bundles.',
        availability: 'Request only',
        ctaLabel: 'Request',
        href: '/contact?requestType=integration',
      },
    ],
  },
  {
    title: 'Technical briefs',
    items: [
      {
        title: 'Materials overview',
        description: 'Summary of the tactile stack and integration approach.',
        availability: 'Request only',
        ctaLabel: 'Request',
        href: '/contact?requestType=integration',
      },
      {
        title: 'Benchmark methodology',
        description: 'Request the note that explains how measurements are taken.',
        availability: 'Request only',
        ctaLabel: 'Request',
        href: '/contact?requestType=integration',
      },
    ],
  },
];

export const contactPaths: ContactPath[] = [
  {
    title: 'RoboSkin.ai Brief request',
    summary: 'Use this path for the State of Tactile AI brief, Humanoid Tactile Stack Map, manifesto copy, or research summary.',
    href: '/contact?requestType=brief',
    ctaLabel: 'Request brief',
  },
  {
    title: 'Partnership or sponsorship',
    summary: 'Use this path for research collaboration, sponsored reports, directory listings, data benchmark work, or ecosystem partnerships.',
    href: '/contact?requestType=partnership',
    ctaLabel: 'Discuss partnership',
  },
  {
    title: 'Strategic acquisition inquiry',
    summary: 'Use this path for domain acquisition, brand licensing, strategic buyer conversations, or packaging the site as an industry asset.',
    href: '/contact?requestType=acquisition',
    ctaLabel: 'Strategic inquiry',
  },
];

export const comparisonRows: ComparisonRow[] = [
  {
    label: 'Best starting point',
    sensorArray: 'Research and early pilots',
    developerKit: 'Fast prototype work',
    customProgram: 'Specific robot geometry or environment constraints',
  },
  {
    label: 'What you receive',
    sensorArray: 'Tactile array for evaluation and integration planning',
    developerKit: 'Hardware bundle plus onboarding and examples',
    customProgram: 'Requirements review, form factor scoping, and an integration plan',
  },
  {
    label: 'Integration effort',
    sensorArray: 'Moderate (depends on surface and mounting)',
    developerKit: 'Lowest (aimed at fast bring-up)',
    customProgram: 'Program-driven (managed with engineering)',
  },
  {
    label: 'Recommended if you need',
    sensorArray: 'A credible baseline for sensing and early data',
    developerKit: 'A short path to a working demo',
    customProgram: 'Custom geometry, packaging, or deployment constraints',
  },
];

export const deploymentStages: ImplementationStage[] = [
  {
    title: 'Evaluation',
    summary: 'Confirm fit, interfaces, and what technical material is available for review.',
    inputs: ['Use case and robot type', 'Target surface and geometry', 'Timeline and constraints'],
    outputs: ['Fit check', 'Recommended starting point', 'Request routing (datasheet, demo, integration review)'],
  },
  {
    title: 'Prototype',
    summary: 'Bring up a first integration path with the lowest-friction hardware option for your stage.',
    inputs: ['Sensor / kit selection', 'Bring-up plan', 'Interface expectations'],
    outputs: ['Working demo baseline', 'Early data validation notes', 'Integration questions list'],
  },
  {
    title: 'Pilot',
    summary: 'Define mounting, packaging, and data workflows that match your application environment.',
    inputs: ['Mechanical integration notes', 'Data pipeline requirements', 'Pilot success criteria'],
    outputs: ['Pilot plan', 'Packaging constraints', 'Verified next-step requirements'],
  },
  {
    title: 'Deployment',
    summary: 'Align on form factor, constraints, and support needed for a repeatable integration.',
    inputs: ['Custom form factor scoping', 'Deployment constraints', 'Support and validation needs'],
    outputs: ['Integration plan', 'Custom program scope (if needed)', 'Request-only verification checklist'],
  },
];

export const aboutSections: AboutSection[] = [
  {
    title: 'What we build',
    summary: 'Tactile sensing hardware and integration support for robotics teams that need credible, repeatable touch input.',
    bullets: [
      'Pressure-sensing arrays and application-driven form factors',
      'Integration guidance for evaluation, pilot, and deployment stages',
      'Practical public guidance, with deeper technical detail shared on request',
    ],
  },
  {
    title: 'How we work with teams',
    summary: 'We focus on fit, constraints, and next steps rather than broad claims.',
    bullets: [
      'Start with a fit check and request the right technical material',
      'Move to an integration review once geometry and interfaces are clear',
      'Use pilots to validate mounting, packaging, and data expectations',
    ],
  },
  {
    title: 'Claims discipline',
    summary: 'Public copy stays conservative. Application-specific details are confirmed on request.',
    bullets: [
      'Measured benchmarks, customer logos, and certifications only when verified',
      'Request-only assets are labeled and routed to a form, not fake downloads',
      'If you need a verification plan, we will scope it with engineering',
    ],
  },
  {
    title: 'What to send us',
    summary: 'The fastest way to get a useful answer is to provide constraints up front.',
    bullets: [
      'Robot platform and use case',
      'Target surface geometry, curvature, and mounting constraints',
      'Timeline and what success looks like for your evaluation or pilot',
    ],
  },
];

export const faqItems: FaqItem[] = [
  {
    question: 'What is the fastest way to evaluate fit?',
    answer: 'Start with a datasheet request and include your robot type, target surface, and timeline. If geometry is non-trivial, request an integration review instead.',
    ctaLabel: 'Request datasheet',
    href: '/contact?requestType=datasheet',
  },
  {
    question: 'How do I request an integration review?',
    answer: 'Use the Contact form and select the integration request type. Include geometry constraints and any interface or SDK expectations.',
    ctaLabel: 'Request integration review',
    href: '/contact?requestType=integration',
  },
  {
    question: 'Do you support ROS or ROS2?',
    answer: 'Compatibility is confirmed on request for a specific platform and pipeline. Use the Resources or Downloads hub to request the most relevant material.',
    ctaLabel: 'Request docs',
    href: '/downloads',
  },
  {
    question: 'Are there public downloads?',
    answer: 'Public assets are intentionally limited. Request-only items route to a form so the team can send the right material for your platform and use case.',
    ctaLabel: 'View downloads hub',
    href: '/downloads',
  },
  {
    question: 'What information should I include in the first message?',
    answer: 'Robot platform, target surface geometry, environment constraints, and timeline. If you have interface requirements, include them early.',
    ctaLabel: 'Contact',
    href: '/contact',
  },
  {
    question: 'Can you do custom form factors?',
    answer: 'Yes, via a scoped program. Start by describing the surface geometry and deployment constraints so engineering can recommend the right path.',
    ctaLabel: 'Compare offers',
    href: '/comparison',
  },
  {
    question: 'What does \"verified on request\" mean?',
    answer: 'It means the claim depends on the robot, integration, or environment. We confirm details in a technical brief or integration review rather than publishing broad statements.',
  },
  {
    question: 'What email should I use for direct inquiries?',
    answer: site.contact.primaryEmail,
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Robot skin',
    definition: 'A tactile sensing surface that helps a robot detect contact, pressure, shear, slip, or interaction events across hands, grippers, arms, or curved body surfaces.',
    related: ['tactile sensing', 'e-skin', 'humanoid robot skin'],
    href: '/technology',
  },
  {
    term: 'Tactile AI',
    definition: 'Software and sensing workflows that turn touch data into useful robot signals for grasping, contact response, manipulation, or evaluation analytics.',
    related: ['sensor fusion', 'robot learning', 'slip detection'],
    href: '/research',
  },
  {
    term: 'E-skin',
    definition: 'Electronic skin: a flexible or soft sensor layer designed to measure contact-related signals on non-flat surfaces.',
    related: ['flexible tactile sensor', 'soft robotic skin', 'multimodal sensing'],
    href: '/research/single-material-soft-robotic-skin-2025',
  },
  {
    term: 'Slip detection',
    definition: 'Detection of object movement relative to a robot finger or gripper, often using shear, vibration, texture, or event-based tactile signals.',
    related: ['dexterous manipulation', 'grip control', 'event-based sensing'],
    href: '/research/graphene-liquid-metal-3d-force-2026',
  },
  {
    term: 'Multimodal tactile sensing',
    definition: 'A sensor approach that captures more than one stimulus type, such as pressure and temperature, while managing crosstalk and calibration.',
    related: ['temperature/pressure sensing', 'crosstalk', 'signal decoupling'],
    href: '/research/temperature-pressure-bimodal-2025',
  },
  {
    term: 'ROS 2 tactile pipeline',
    definition: 'A robotics software path for recording, replaying, transforming, and consuming tactile sensor data with consistent timestamps, frames, and middleware settings.',
    related: ['ROS 2 Kilted', 'rosbag2', 'ros2_control'],
    href: '/research/ros2-kilted-tactile-pipeline-2026',
  },
  {
    term: 'Integration review',
    definition: 'A scoped technical discussion that maps robot geometry, interfaces, environment, timeline, and validation goals before selecting a sensor path.',
    related: ['evaluation', 'pilot', 'custom form factor'],
    href: '/implementation',
  },
];

export const caseStudySummaries: CaseStudySummary[] = [
  {
    title: 'Robotic gripper evaluation path',
    context: 'A manipulation team needed a fast way to assess whether tactile sensing would improve grip control and slip awareness.',
    approach: 'We scoped the contact surface, defined an evaluation plan, and routed the team to the most practical starting offer for early integration work.',
    outcome: 'A clear pilot path with defined integration questions and success criteria for the next stage.',
    note: 'No public performance numbers are implied; measured results are reviewed on request.',
    ctaLabel: 'Request integration review',
    href: '/contact?requestType=integration',
  },
  {
    title: 'Humanoid contact sensing scoping',
    context: 'A humanoid program needed contact feedback across curved surfaces and a realistic plan for mounting and routing constraints.',
    approach: 'We reviewed geometry and surface constraints, then defined a staged plan from evaluation to pilot, including request-only verification items.',
    outcome: 'A scoped integration plan and a decision framework for when custom form factors are required.',
    note: 'Application-specific feasibility is confirmed per platform and environment.',
    ctaLabel: 'Talk to engineering',
    href: '/contact?requestType=integration',
  },
  {
    title: 'Prototype to pilot readiness checklist',
    context: 'An OEM pilot required a repeatable integration path rather than a one-off demo.',
    approach: 'We aligned on packaging, serviceability, data expectations, and pilot success criteria before expanding scope.',
    outcome: 'A pilot checklist that reduces integration surprises and keeps the next step concrete.',
    note: 'Exact specs and interfaces are validated through request-only technical material.',
    ctaLabel: 'Request datasheet',
    href: '/contact?requestType=datasheet',
  },
];

export const newsItems: NewsItem[] = [
  {
    date: '2026-04-10',
    title: 'Content hub expansion (Comparison, Implementation, Downloads)',
    summary: 'We expanded the public site with decision-support pages and request hubs that make evaluation paths clearer.',
    href: '/comparison',
    ctaLabel: 'Compare offers',
  },
  {
    date: '2026-04-09',
    title: 'Resources updated for request-only routing',
    summary: 'Resource listings are now routed into the correct request flows instead of listing unsupported assets.',
    href: '/downloads',
    ctaLabel: 'View downloads hub',
  },
  {
    date: '2026-04-08',
    title: 'Integration-first contact guidance',
    summary: 'The Contact page emphasizes what to include for faster engineering responses and clearer next steps.',
    href: '/contact',
    ctaLabel: 'Contact',
  },
];
