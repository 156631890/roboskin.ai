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

export const site = {
  name: 'RoboSkin.ai',
  url: 'https://roboskin.ai',
  tagline: 'Robot skin and tactile AI information hub',
  description: 'A robot skin and tactile AI information asset built around the premium robot skin domain RoboSkin.ai.',
  contact: {
    primaryEmail: 'contact@roboskin.ai',
    ownerEmail: 'messigoat147@gmail.com',
    salesEmail: 'sales@roboskin.ai',
    legalEmail: 'legal@roboskin.ai',
    privacyEmail: 'privacy@roboskin.ai',
    whatsapp: '15755596955',
    whatsappDial: '8615755596955',
    wechat: '15755596955',
  },
  domainInquiry: {
    label: 'RoboSkin.ai domain inquiry',
    headline: 'RoboSkin.ai is available for acquisition or partnership inquiry.',
    summary: 'An exact-match .ai name for robot skin, tactile AI, humanoid robotics, e-skin research, and tactile sensing media.',
    href: '/contact?requestType=domain',
    ctaLabel: 'Inquire about RoboSkin.ai',
  },
};

export const primaryNavigation = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/applications', label: 'Applications' },
  { href: '/technology', label: 'Technology' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
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
  { value: 'High-density', label: 'Spatial Resolution' },
  { value: 'Low-latency', label: 'Latency' },
  { value: 'Curve-ready', label: 'Stretchability' },
  { value: 'Private brief', label: 'Deployment Fit' },
];

export const homeProofPoints: ContentTile[] = [
  {
    title: 'Evaluation-first positioning',
    description: 'The site explains how teams should evaluate surface geometry, signal outputs, interfaces, and pilot readiness before making claims.',
  },
  {
    title: 'Technical vocabulary buyers recognize',
    description: 'Robot skin, tactile AI, e-skin, slip detection, multimodal sensing, ROS 2 pipelines, and sensor fusion are used in practical context.',
  },
  {
    title: 'Verified-on-request discipline',
    description: 'Durability, operating range, latency, and resolution claims are routed to datasheets or integration reviews instead of broad public promises.',
  },
  {
    title: 'Searchable content clusters',
    description: 'Product, solution, research, glossary, comparison, and implementation pages now reinforce each other with natural internal links.',
  },
];

export const homeUseCases = [
  {
    title: 'Humanoid robot hands',
    text: 'Add touch feedback to dexterous manipulation, contact response, and force-limited control.',
  },
  {
    title: 'Industrial safety skins',
    text: 'Wrap collaborative robots in a visible contact layer that supports safer interaction.',
  },
  {
    title: 'Precision grasping',
    text: 'Improve slip awareness, fragile-object handling, and grip confidence for manipulation teams.',
  },
  {
    title: 'Assistive surfaces',
    text: 'Support safer force control and better surface feedback for medical and assistive devices.',
  },
];

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
    cta: 'Request a deck',
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
    summary: 'Public pages stay conservative while measurable details are confirmed in request-only material.',
    checkpoints: ['No invented benchmarks', 'No unsupported customer claims', 'Measured details on request', 'Application-specific validation'],
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
      'Keep the public story narrow; expand details in private technical material.',
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
    title: 'Domain acquisition',
    summary: 'Use this path if you want to buy RoboSkin.ai, discuss a serious offer, or evaluate the domain as a robotics or AI brand asset.',
    href: '/contact?requestType=domain',
    ctaLabel: 'Inquire about the domain',
  },
  {
    title: 'Partnership or content collaboration',
    summary: 'Use this path for content, research, media, or partnership ideas around robot skin and tactile AI.',
    href: '/contact?requestType=partnership',
    ctaLabel: 'Discuss collaboration',
  },
  {
    title: 'Research or information request',
    summary: 'Use this path if you found the site through research and want to suggest sources, corrections, or useful additions.',
    href: '/contact?requestType=research',
    ctaLabel: 'Send a research note',
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
      'A narrow public story, with deeper technical detail shared on request',
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
      'No invented benchmarks, customer logos, or certifications',
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
    answer: 'Public assets are intentionally limited. When an item is request-only, we route you to the correct request flow instead of listing dead downloads.',
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
    summary: 'We expanded the public site with decision-support pages and request hubs to reduce dead downloads and improve evaluation clarity.',
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
