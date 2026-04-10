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

export const site = {
  name: 'RoboSkin.ai',
  url: 'https://roboskin.ai',
  tagline: 'Tactile sensor skin for robotics',
  contact: {
    primaryEmail: 'contact@roboskin.ai',
    salesEmail: 'sales@roboskin.ai',
    legalEmail: 'legal@roboskin.ai',
    privacyEmail: 'privacy@roboskin.ai',
  },
};

export const primaryNavigation = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/technology', label: 'Technology' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
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
      { href: '/news', label: 'News' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

export const homeStats = [
  { value: '3', label: 'Core offers' },
  { value: '4', label: 'Solution areas' },
  { value: '1', label: 'Contact path' },
  { value: '0', label: 'Unsupported claims' },
];

export const homeProofPoints: ContentTile[] = [
  {
    title: 'Evaluation-first positioning',
    description: 'Make it easy to decide where to start: datasheet review, a pilot kit, or a custom integration review.',
  },
  {
    title: 'Engineering support path',
    description: 'Clarify what the team needs from you and what you can expect next from RoboSkin engineering.',
  },
  {
    title: 'Request-only assets, no dead downloads',
    description: 'Route missing public materials into a request flow instead of listing unsupported downloads.',
  },
  {
    title: 'Claims discipline',
    description: 'Keep public copy grounded in verified capabilities and clearly label what must be confirmed on request.',
  },
];

export const homeUseCases = [
  {
    title: 'Robotic grippers',
    text: 'Improve object handling, slip detection, and contact awareness for industrial manipulation.',
  },
  {
    title: 'Humanoid contact sensing',
    text: 'Add responsive touch feedback across hands, arms, and torso surfaces.',
  },
  {
    title: 'Prosthetics and medical devices',
    text: 'Support safer force control and better user experience for assistive systems.',
  },
];

export const productCards = [
  {
    name: 'RS-1000 Sensor Array',
    bestFor: 'Research teams and OEM pilots',
    summary: 'Flexible tactile array for proof-of-concept integration and early validation.',
    inputsOutputs: 'Surface integration, force events, local signal output',
    specs: ['High-density sensing layout', 'Flexible form factors', 'Integration support available', 'Verified specs only'],
    cta: 'Request datasheet',
  },
  {
    name: 'Developer Kit',
    bestFor: 'Engineering teams that need a fast prototype path',
    summary: 'Hardware and documentation bundle for initial robotics integration work.',
    inputsOutputs: 'Sample sensors, SDK access, integration guidance',
    specs: ['Developer workflow', 'API access', 'Pilot-friendly setup', 'Request availability'],
    cta: 'Talk to engineering',
  },
  {
    name: 'Custom Integration Program',
    bestFor: 'Programs with a specific robot, geometry, or environment',
    summary: 'Application-driven support for custom form factors and deployment constraints.',
    inputsOutputs: 'Requirements review, integration path, custom scoping',
    specs: ['Custom geometry', 'Program scoping', 'Engineering consultation', 'Quote on request'],
    cta: 'Request a demo',
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
