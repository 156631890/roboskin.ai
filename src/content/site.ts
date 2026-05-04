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

export type FeaturedIndustryAsset = {
  kicker: string;
  title: string;
  summary: string;
  href: string;
  ctaLabel: string;
  code: string;
  accent: 'blue' | 'teal' | 'amber' | 'rose';
  includes: string[];
  image: string;
  imageAlt: string;
};

export type AuthorityLinkGroup = {
  title: string;
  summary: string;
  links: {
    label: string;
    href: string;
    description: string;
  }[];
};

export type DirectAnswerBlock = {
  question: string;
  answer: string;
  href: string;
  ctaLabel: string;
  image?: string;
  imageAlt?: string;
};

export type ResearchResourceEntry = {
  title: string;
  summary: string;
  href: string;
  label: string;
  image: string;
  imageAlt: string;
};

export type AuthorityHeroVisual = {
  image: string;
  imageAlt: string;
};

export const site = {
  name: 'RoboSkin.ai',
  url: 'https://roboskin.ai',
  tagline: 'Robot skin and tactile AI information hub',
  description: 'A robot skin and tactile AI information asset built around the premium robot skin domain RoboSkin.ai.',
  contact: {
    primaryEmail: 'contact@roboskin.ai',
    ownerEmail: 'messigoat147@gmail.com',
    inquiryEmail: 'contact@roboskin.ai',
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
  { value: 'Portal', label: 'Robot skin and tactile AI research map' },
  { value: 'Brief', label: 'State of Tactile AI request path' },
  { value: 'Map', label: 'Humanoid tactile stack and supplier categories' },
  { value: 'Index', label: 'Evaluation kit and benchmark directory concept' },
];

export const homeProofPoints: ContentTile[] = [
  {
    title: 'Evaluation-first positioning',
    description: 'The site explains surface geometry, signal-output concepts, interfaces, and source context so readers can avoid unsupported claims.',
  },
  {
    title: 'Technical vocabulary buyers recognize',
    description: 'Robot skin, tactile AI, e-skin, slip detection, multimodal sensing, ROS 2 pipelines, and sensor fusion are used in practical context.',
  },
  {
    title: 'Conservative claim discipline',
    description: 'Durability, operating range, latency, and resolution claims are routed to source-backed research notes or clearly labeled contact context instead of broad public promises.',
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

export const authorityHeroVisual: AuthorityHeroVisual = {
  image: '/generated/authority/authority-hero-tactile-stack.webp',
  imageAlt:
    'Humanoid robot hand with translucent tactile sensor skin and blue signal paths representing a tactile AI stack.',
};

export const authorityLinkGroups: AuthorityLinkGroup[] = [
  {
    title: 'Learn the category',
    summary: 'Definitions and technical explainers for robot skin, tactile AI, e-skin, and tactile sensing terms.',
    links: [
      {
        label: 'Open the robot skin glossary',
        href: '/glossary',
        description: 'Concise definitions for robot skin, tactile AI, e-skin, slip detection, and ROS 2 tactile pipelines.',
      },
      {
        label: 'Read the robot skin FAQ',
        href: '/faq',
        description: 'Short answers about evaluation, integration, public downloads, and request-only material.',
      },
      {
        label: 'Explore tactile AI technology',
        href: '/technology',
        description: 'A system view of sensing layers, signal processing, middleware, and validation fit.',
      },
    ],
  },
  {
    title: 'Track the field',
    summary: 'Research notes and industry assets for teams following the tactile AI stack.',
    links: [
      {
        label: 'Browse robot skin research',
        href: '/research',
        description: 'Technical briefs about tactile sensors, soft robotic skin, multimodal sensing, and robot hands.',
      },
      {
        label: 'View RoboSkin resources',
        href: '/resources',
        description: 'Briefs, stack maps, and category assets for serious robotics readers.',
      },
      {
        label: 'Review conservative case studies',
        href: '/case-studies',
        description: 'Anonymous evaluation paths without unsupported customer or performance claims.',
      },
    ],
  },
  {
    title: 'Evaluate paths',
    summary: 'Routes for teams comparing tactile sensor modules, developer kits, or custom skin programs.',
    links: [
      {
        label: 'Compare RoboSkin paths',
        href: '/comparison',
        description: 'Choose between sensor arrays, developer kits, and custom form-factor programs.',
      },
      {
        label: 'Plan implementation',
        href: '/implementation',
        description: 'Understand the evaluation, prototype, pilot, and deployment route.',
      },
      {
        label: 'Request technical downloads',
        href: '/downloads',
        description: 'Request datasheets, integration notes, benchmark methods, and SDK material.',
      },
    ],
  },
  {
    title: 'Discuss value',
    summary: 'Contact paths for brief requests, partnerships, sponsorship, and strategic conversations.',
    links: [
      {
        label: 'Request the RoboSkin.ai Brief',
        href: '/contact?requestType=brief&requestedAsset=RoboSkin.ai%20Brief',
        description: 'Ask for the industry brief, stack map, or manifesto.',
      },
      {
        label: 'Discuss partnership or sponsorship',
        href: '/contact?requestType=partnership',
        description: 'Open a conversation about research, reports, directories, or category partnerships.',
      },
      {
        label: 'Strategic acquisition conversation',
        href: '/contact?requestType=acquisition',
        description: 'Use this path for domain acquisition, licensing, or strategic buyer inquiries.',
      },
    ],
  },
];

export const directAnswerBlocks: DirectAnswerBlock[] = [
  {
    question: 'What is robot skin?',
    answer:
      'Robot skin is a tactile sensing surface that helps robots detect contact, pressure, shear, slip, and interaction events across hands, grippers, arms, or curved body surfaces. It gives physical AI systems a contact layer that vision alone cannot provide.',
    href: '/glossary',
    ctaLabel: 'Open the robot skin glossary',
    image: '/generated/authority/robot-skin-definition.webp',
    imageAlt: 'Flexible robotic skin sheet with glowing tactile sensor nodes detecting a contact point.',
  },
  {
    question: 'What is tactile AI?',
    answer:
      'Tactile AI is the sensing, data, and control workflow that turns touch signals into useful robot behavior. It can support grasp confidence, slip response, contact-aware motion, safety reflexes, and evaluation analytics for physical AI systems.',
    href: '/research',
    ctaLabel: 'Browse tactile AI research',
    image: '/generated/authority/tactile-ai-loop.webp',
    imageAlt: 'Robot hand tactile signals flowing through edge AI and controller modules in a feedback loop.',
  },
  {
    question: 'What is e-skin?',
    answer:
      'E-skin, or electronic skin, is a flexible or soft sensor layer designed to measure contact-related signals on non-flat surfaces. In robotics, e-skin can cover fingertips, palms, gripper pads, prosthetics, arms, or safety surfaces.',
    href: '/research/single-material-soft-robotic-skin-2025',
    ctaLabel: 'Read the e-skin brief',
  },
  {
    question: 'Why do humanoid robot hands need touch?',
    answer:
      'Humanoid robot hands need touch because dexterous manipulation depends on contact timing, pressure, shear, slip, and object stability. Vision can guide a hand toward an object, but tactile sensing helps the robot understand what happens during contact.',
    href: '/solutions',
    ctaLabel: 'View robot hand applications',
  },
  {
    question: 'How is tactile sensing different from vision or force-torque sensing?',
    answer:
      'Vision observes a scene from outside contact, while tactile sensing measures what happens at the contact surface. Force-torque sensors can measure aggregate loads, but robot skin can expose distributed contact patterns across fingertips, grippers, or curved surfaces.',
    href: '/technology',
    ctaLabel: 'Explore tactile AI technology',
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

export const manifesto = {
  title: 'The Tactile AI Manifesto',
  summary: 'AI can see. AI can speak. AI can reason. But to work safely in the physical world, AI must learn to feel.',
};

export const featuredIndustryAssets: FeaturedIndustryAsset[] = [
  {
    kicker: 'Annual brief',
    title: 'State of Tactile AI 2026',
    summary: 'A report-style entry point for robot hands, e-skin, flexible sensors, tactile data, and physical AI applications.',
    href: '/contact?requestType=brief&requestedAsset=State%20of%20Tactile%20AI%202026',
    ctaLabel: 'Request brief',
    code: 'REPORT-01',
    accent: 'blue',
    includes: ['Market themes', 'Research signals', 'Company categories', 'Buyer questions'],
    image: '/generated/authority/state-of-tactile-ai-cover.webp',
    imageAlt: 'Dark technical report cover background with robot hand, tactile sensor sheet, and blue data streams.',
  },
  {
    kicker: 'Stack map',
    title: 'Humanoid Tactile Stack Map',
    summary: 'A supply-chain map across sensors, materials, edge AI, datasets, grippers, prosthetics, simulation, and safety skins.',
    href: '/contact?requestType=brief&requestedAsset=Humanoid%20Tactile%20Stack%20Map',
    ctaLabel: 'Request map',
    code: 'MAP-07',
    accent: 'teal',
    includes: ['Stack layers', 'Supplier categories', 'Partner paths', 'Evaluation triggers'],
    image: '/generated/authority/humanoid-stack-map-cover.webp',
    imageAlt: 'Layered humanoid tactile stack modules connected by cyan signal paths.',
  },
  {
    kicker: 'Category narrative',
    title: 'The Tactile AI Manifesto',
    summary: 'A concise narrative for why embodied AI needs touch before it can work safely in contact-rich physical environments.',
    href: '/contact?requestType=brief&requestedAsset=Tactile%20AI%20Manifesto',
    ctaLabel: 'Request manifesto',
    code: 'MANIFESTO',
    accent: 'amber',
    includes: ['Core thesis', 'Messaging notes', 'Category language', 'Launch angle'],
    image: '/generated/authority/state-of-tactile-ai-cover.webp',
    imageAlt: 'Robot skin and tactile AI industry landscape rendered as a premium dark technical cover image.',
  },
  {
    kicker: 'Directory concept',
    title: 'RoboSkin Index',
    summary: 'A light product direction for comparing tactile sensor kits, benchmark methods, and robot skin evaluation paths.',
    href: '/contact?requestType=partnership&requestedAsset=RoboSkin%20Index',
    ctaLabel: 'Discuss index',
    code: 'INDEX-04',
    accent: 'rose',
    includes: ['Evaluation criteria', 'Kit directory', 'Benchmark prompts', 'Sponsor fit'],
    image: '/generated/authority/roboskin-index-cover.webp',
    imageAlt: 'Tactile sensor kit evaluation bench with robot fingertip, sensor tiles, and abstract benchmark grid.',
  },
];

export const researchResourceIndex: ResearchResourceEntry[] = [
  {
    title: 'Graphene and liquid metal 3D force sensing',
    summary: 'A technical brief on normal force, shear force, slip, and texture sensing for robot fingertips.',
    href: '/research/graphene-liquid-metal-3d-force-2026',
    label: 'Research brief',
    image: '/generated/authority/research-graphene-liquid-metal.webp',
    imageAlt: 'Macro robotic fingertip tactile sensor with graphene-like layers and liquid metal microchannels.',
  },
  {
    title: 'Single-material soft robotic skin',
    summary: 'A current note on soft e-skin architectures using impedance and machine learning for multimodal touch.',
    href: '/research/single-material-soft-robotic-skin-2025',
    label: 'E-skin brief',
    image: '/generated/authority/research-soft-robotic-skin.webp',
    imageAlt: 'Soft robotic skin sheet bending over a curved robot surface with teal tactile sensing highlights.',
  },
  {
    title: 'ROS 2 tactile pipeline context',
    summary: 'A source-backed route for recording, replaying, transforming, and consuming tactile sensor streams.',
    href: '/research/ros2-kilted-tactile-pipeline-2026',
    label: 'Pipeline brief',
    image: '/generated/authority/research-ros2-tactile-pipeline.webp',
    imageAlt: 'Robot hand tactile sensor connected to compact compute modules and blue middleware data lanes.',
  },
  {
    title: 'Humanoid tactile stack map',
    summary: 'A request path for mapping sensors, materials, middleware, edge AI, datasets, and evaluation triggers.',
    href: '/resources',
    label: 'Resource path',
    image: '/generated/authority/humanoid-stack-map-cover.webp',
    imageAlt: 'Humanoid tactile stack modules connected across sensor, edge AI, and feedback layers.',
  },
  {
    title: 'RoboSkin technical downloads',
    summary: 'Request datasheets, integration notes, benchmark methods, and SDK material for evaluation.',
    href: '/downloads',
    label: 'Request path',
    image: '/generated/authority/roboskin-index-cover.webp',
    imageAlt: 'Organized tactile sensor evaluation kit with robot fingertip and benchmark objects.',
  },
];

export const productCards = [
  {
    name: 'Startup or product brand',
    bestFor: 'Robotics, AI, and humanoid teams seeking a category-defining name',
    summary: 'A premium exact-match .ai domain for a robot skin, tactile AI, e-skin, or sensing intelligence brand.',
    inputsOutputs: 'Brand strategy, category positioning, domain acquisition path',
    specs: ['Exact-match robot skin phrase', 'AI-native extension', 'Memorable category signal', 'Useful for global robotics audiences'],
    evaluation: ['Brand fit for robot skin or tactile AI', 'Audience overlap with humanoid robotics', 'Search and media usefulness', 'Acquisition or partnership intent'],
    verificationNote: 'Best used when a team wants category ownership without implying current hardware availability on this site.',
    cta: 'Inquire about the domain',
  },
  {
    name: 'Research and lab initiative',
    bestFor: 'University labs, research groups, and technical education projects',
    summary: 'A focused domain and information hub for organizing robot skin research notes, terminology, and tactile sensing references.',
    inputsOutputs: 'Research routes, glossary context, source discovery',
    specs: ['Robot skin research framing', 'E-skin terminology support', 'Tactile AI context', 'Useful for explainers and bibliographies'],
    evaluation: ['Research scope and audience', 'Terminology coverage needs', 'Citation and route discovery goals', 'Editorial update cadence'],
    verificationNote: 'Best used when a group needs a clear public home for educational robot skin and tactile AI material.',
    cta: 'Explore research',
  },
  {
    name: 'Media or category content asset',
    bestFor: 'Publishers, analysts, communities, and category owners',
    summary: 'A concise domain asset for explaining robot skin applications, tactile AI trends, e-skin research, and robotics terminology.',
    inputsOutputs: 'Editorial positioning, category pages, partnership inquiry',
    specs: ['Short memorable name', 'Strong topical relevance', 'Research and glossary fit', 'Clear domain inquiry path'],
    evaluation: ['Content strategy fit', 'Partnership model', 'Research and glossary depth', 'Category ownership goals'],
    verificationNote: 'Best used when the goal is authoritative category context rather than vendor copy.',
    cta: 'Discuss collaboration',
  },
];

export const evaluationPoints: EvaluationPoint[] = [
  {
    title: 'Category orientation',
    summary: 'A concise route for readers comparing robot skin, tactile AI, e-skin, and related robotics terminology.',
    checkpoints: ['Research route discovery', 'Glossary definitions', 'Application context', 'Domain asset positioning'],
    href: '/applications',
    ctaLabel: 'Explore applications',
  },
  {
    title: 'Research context',
    summary: 'A practical route for understanding robot hands, grippers, curved surfaces, and tactile sensing vocabulary without product claims.',
    checkpoints: ['Humanoid robotics context', 'Surface and curvature terminology', 'Tactile data concepts', 'Source-backed research notes'],
    href: '/research',
    ctaLabel: 'Explore research',
  },
  {
    title: 'Evidence policy',
    summary: 'Public pages stay conservative and avoid implying availability, certification, benchmarks, or customer relationships.',
    checkpoints: ['No invented benchmarks', 'No unsupported customer claims', 'Clearly labeled domain context', 'Application-specific source framing'],
    href: '/faq',
    ctaLabel: 'Read the FAQ',
  },
];

export const solutionCards = [
  {
    title: 'Robotic grippers and manipulation',
    problem: 'Contact uncertainty slows automation and increases handling risk.',
    why: 'Tactile sensing improves grip control, slip detection, and task confidence.',
    path: 'Use this topic to understand how robot skin vocabulary appears in grasping and manipulation research.',
    note: 'Relevant to pick-and-place, bin picking, and fragile object handling discussions.',
  },
  {
    title: 'Humanoid robots',
    problem: 'Human-like motion needs contact feedback on hands and body surfaces.',
    why: 'Touch input helps controllers react to collisions, pose changes, and user contact.',
    path: 'Use this topic to frame humanoid robot skin, surface sensing, and contact-aware robotics research.',
    note: 'Useful for research platforms, media explainers, and category pages.',
  },
  {
    title: 'Prosthetics and medical robotics',
    problem: 'Assistive systems need safer force awareness and dependable surface feedback.',
    why: 'Tactile input can support control refinement and better interaction design.',
    path: 'Review terminology and source context before making application-specific claims.',
    note: 'Use only verified, application-specific claims in public materials.',
  },
  {
    title: 'Research and education',
    problem: 'Teams need a credible platform for experiments and curriculum work.',
    why: 'A focused information hub helps organize research notes, definitions, and category context.',
    path: 'Begin with the research index and glossary, then follow source-backed topic routes.',
    note: 'Ideal for labs, universities, explainers, and robotics category education.',
  },
];

export const technologyLayers: TechnologyLayer[] = [
  {
    title: 'Sensing layer',
    summary: 'Flexible tactile elements capture contact, pressure, and interaction events.',
    bullets: [
      'Define the sensing layout around the robot contact surface and expected interactions.',
      'Prioritize repeatability and mounting practicality over demo-only geometries.',
      'Route uncertain claims into source-backed research context instead of public promises.',
    ],
  },
  {
    title: 'Signal and processing layer',
    summary: 'Local processing turns raw sensor output into cleaner robot-ready data.',
    bullets: [
      'Clarify sampling, latency constraints, and where processing should live in your stack.',
      'Document what "robot-ready" signals mean for your controller and telemetry pipeline.',
      'Use source-backed information context when describing platform-specific interfaces.',
    ],
  },
  {
    title: 'Materials and form factor layer',
    summary: 'Mechanical design supports curved surfaces and application-driven layouts.',
    bullets: [
      'Map curvature, attachment methods, and packaging constraints early.',
      'Treat durability expectations as application-specific and supported by explicit source context.',
      'Use source-backed validation context before research, brand, or category planning.',
    ],
  },
  {
    title: 'Integration layer',
    summary: 'The site is organized around robotics workflows, research and category context.',
    bullets: [
      'Start with terminology and application context before making technical claims.',
      'Keep the public story narrow; expand details only when sources support them.',
      'Align category pages with research routes, glossary definitions, and domain inquiry context.',
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
    output: 'Task-specific criteria for research interpretation, category framing, or source review.',
  },
];

export const fitCriteria: FitCriterion[] = [
  {
    title: 'Geometry fit',
    description: 'Target surface area, curvature, attachment method, cable routing, and serviceability shape the relevant category or content route.',
  },
  {
    title: 'Signal fit',
    description: 'Teams should define whether they need pressure maps, shear, slip events, temperature, force/torque context, or lower-bandwidth contact events.',
  },
  {
    title: 'Software fit',
    description: 'Useful research context defines message formats, timestamps, coordinate frames, logging, replay, and calibration handling before planning claims.',
  },
  {
    title: 'Validation fit',
    description: 'Durability, latency, sensitivity, drift, and environmental claims should be measured against the exact robot and use case.',
  },
];

export const resourceSections: ResourceSection[] = [
  {
    title: 'Category guides',
    items: [
      {
        title: 'Robot skin overview',
        description: 'Read a plain-language route into robot skin, tactile AI, e-skin, and tactile sensing terminology.',
        availability: 'Public guide',
        ctaLabel: 'Explore',
        href: '/applications',
      },
      {
        title: 'RoboSkin.ai domain context',
        description: 'Understand how the domain can support a robotics brand, research hub, media property, or category landing page.',
        availability: 'Public guide',
        ctaLabel: 'Explore',
        href: '/products',
      },
    ],
  },
  {
    title: 'Research routes',
    items: [
      {
        title: 'Research index',
        description: 'Browse source-backed notes on robot skin, flexible tactile sensing, e-skin, and related robotics research.',
        availability: 'Public index',
        ctaLabel: 'Read',
        href: '/research',
      },
      {
        title: 'ROS 2 tactile pipeline context',
        description: 'Use the research route to understand robotics middleware terminology and tactile data pipeline concepts.',
        availability: 'Public note',
        ctaLabel: 'Read',
        href: '/research/ros2-kilted-tactile-pipeline-2026',
      },
    ],
  },
  {
    title: 'Terminology references',
    items: [
      {
        title: 'Glossary',
        description: 'Review definitions for robot skin, tactile AI, e-skin, slip detection, and multimodal tactile sensing.',
        availability: 'Public reference',
        ctaLabel: 'Read',
        href: '/glossary',
      },
      {
        title: 'FAQ',
        description: 'Read conservative guidance about what the site does and does not claim about robot skin and tactile AI.',
        availability: 'Public reference',
        ctaLabel: 'Read',
        href: '/faq',
      },
    ],
  },
  {
    title: 'Domain and collaboration',
    items: [
      {
        title: 'Domain inquiry',
        description: 'Use the contact route for acquisition, partnership, or content collaboration around RoboSkin.ai.',
        availability: 'Contact path',
        ctaLabel: 'Inquire',
        href: '/contact?requestType=domain',
      },
      {
        title: 'Research note submission',
        description: 'Suggest sources, corrections, or additions that improve robot skin and tactile AI category coverage.',
        availability: 'Contact path',
        ctaLabel: 'Send note',
        href: '/contact?requestType=research',
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
    sensorArray: 'Startup or product brand',
    developerKit: 'Research and lab initiative',
    customProgram: 'Media or category content asset',
  },
  {
    label: 'What it supports',
    sensorArray: 'Category-defining brand language',
    developerKit: 'Research routes and glossary context',
    customProgram: 'Editorial positioning and domain inquiry paths',
  },
  {
    label: 'Primary audience',
    sensorArray: 'Robotics and AI founders',
    developerKit: 'Labs and education teams',
    customProgram: 'Publishers, analysts, and category owners',
  },
  {
    label: 'Recommended if you need',
    sensorArray: 'A memorable robot skin domain',
    developerKit: 'A clear educational research hub',
    customProgram: 'A focused media or category landing page',
  },
];

export const deploymentStages: ImplementationStage[] = [
  {
    title: 'Orientation',
    summary: 'Clarify the category, audience, and information route before making claims about robot skin or tactile AI.',
    inputs: ['Audience type', 'Topic focus', 'Research or domain goal'],
    outputs: ['Category framing', 'Relevant research routes', 'Glossary starting points'],
  },
  {
    title: 'Research mapping',
    summary: 'Connect robot skin terminology to source-backed notes, application areas, and related glossary entries.',
    inputs: ['Research sources', 'Terminology questions', 'Application context'],
    outputs: ['Source list', 'Definition links', 'Topic gaps to improve'],
  },
  {
    title: 'Category page',
    summary: 'Shape a concise educational page around the topic without implying product availability or operating-company claims.',
    inputs: ['Page purpose', 'Audience need', 'Internal links'],
    outputs: ['Page outline', 'Conservative claim checklist', 'Contact route if relevant'],
  },
  {
    title: 'Domain inquiry',
    summary: 'Route acquisition, partnership, or content collaboration interest through clearly labeled contact context.',
    inputs: ['Inquiry type', 'Organization context', 'Intended use'],
    outputs: ['Domain inquiry path', 'Partnership context', 'Research note suggestions'],
  },
];

export const aboutSections: AboutSection[] = [
  {
    title: 'What this site publishes',
    summary: 'RoboSkin.ai publishes conservative robot skin and tactile AI information around a premium domain asset.',
    bullets: [
      'Robot skin, tactile AI, e-skin, and tactile sensing terminology',
      'Research routes, glossary definitions, and category context',
      'A narrow public story with clearly labeled domain inquiry context',
    ],
  },
  {
    title: 'How readers should use it',
    summary: 'Use the site for definitions, research discovery, and category framing rather than product availability claims.',
    bullets: [
      'Start with applications, research, and glossary routes',
      'Check whether a claim is supported by public source context',
      'Use contact paths only for domain, partnership, or research-note inquiries',
    ],
  },
  {
    title: 'Claims discipline',
    summary: 'Public copy stays conservative and avoids unsupported operating-company claims.',
    bullets: [
      'No invented benchmarks, customer logos, or certifications',
      'No implied product availability, customer support, or procurement route',
      'If a detail is uncertain, it belongs in source-backed context or not on the page',
    ],
  },
  {
    title: 'What to send us',
    summary: 'The clearest inquiries explain whether the goal is domain acquisition, collaboration, or research-source improvement.',
    bullets: [
      'Domain acquisition or partnership intent',
      'Research sources, corrections, or useful additions',
      'Content or media context for robot skin and tactile AI',
    ],
  },
];

export const faqItems: FaqItem[] = [
  {
    question: 'What is the fastest way to understand the category?',
    answer: 'Start with the applications page, then use the research index and glossary to understand robot skin, tactile AI, e-skin, and related terminology.',
    ctaLabel: 'Explore research',
    href: '/research',
  },
  {
    question: 'How do I ask about RoboSkin.ai?',
    answer: 'Use the Contact form for domain acquisition, partnership, content collaboration, or research-source suggestions.',
    ctaLabel: 'Send a domain or research inquiry',
    href: '/contact?requestType=domain',
  },
  {
    question: 'Do you support ROS or ROS2?',
    answer: 'This site may discuss ROS 2 as research and terminology context, but it does not claim platform compatibility, support, or product availability.',
    ctaLabel: 'Read the research note',
    href: '/research/ros2-kilted-tactile-pipeline-2026',
  },
  {
    question: 'Are there public resources?',
    answer: 'Yes. Public pages provide category guides, research routes, glossary definitions, and domain-asset context.',
    ctaLabel: 'View resources',
    href: '/resources',
  },
  {
    question: 'What information should I include in the first message?',
    answer: 'State whether your inquiry is about domain acquisition, partnership, content collaboration, or research-source suggestions.',
    ctaLabel: 'Contact',
    href: '/contact',
  },
  {
    question: 'Does RoboSkin.ai claim active product availability?',
    answer: 'No. RoboSkin.ai is positioned as an information hub and premium domain asset, not as a public catalog of available robot skin products.',
    ctaLabel: 'View domain use cases',
    href: '/products',
  },
  {
    question: 'How should claims be interpreted?',
    answer: 'Treat public content as educational context. Do not infer benchmark values, certifications, customer names, or operating-company claims unless they are explicitly published.',
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
    term: 'Category context',
    definition: 'A conservative explanation of how robot skin terminology, applications, research, and domain positioning relate without implying product availability.',
    related: ['applications', 'research routes', 'domain asset'],
    href: '/applications',
  },
];

export const caseStudySummaries: CaseStudySummary[] = [
  {
    title: 'Robotic gripper category explainer',
    context: 'A reader needed a concise way to understand how tactile sensing terms appear in robotic gripper and manipulation discussions.',
    approach: 'We connected the topic to robot skin definitions, slip detection, research notes, and relevant application context.',
    outcome: 'A clearer educational route for understanding the category without inferring product availability.',
    note: 'No public performance numbers, customer claims, or availability claims are implied.',
    ctaLabel: 'Explore applications',
    href: '/applications',
  },
  {
    title: 'Humanoid robot skin terminology route',
    context: 'A research audience needed context for contact sensing across hands, arms, and curved humanoid surfaces.',
    approach: 'We framed the topic through applications, tactile AI vocabulary, and source-backed research routes.',
    outcome: 'A category route that supports research discovery and media explanation without operating-company claims.',
    note: 'Application-specific feasibility should be supported by explicit external sources, not inferred from this site.',
    ctaLabel: 'Explore research',
    href: '/research',
  },
  {
    title: 'Domain asset positioning checklist',
    context: 'A potential buyer or partner needed to evaluate RoboSkin.ai as a robotics or AI category name.',
    approach: 'We summarized audience fit, category relevance, research context, and potential content uses.',
    outcome: 'A clearer domain inquiry path for acquisition, partnership, or category-content planning.',
    note: 'The checklist describes possible domain use cases, not a product roadmap.',
    ctaLabel: 'Inquire about RoboSkin.ai',
    href: '/contact?requestType=domain',
  },
];

export const newsItems: NewsItem[] = [
  {
    date: '2026-04-10',
    title: 'Content hub expansion (Comparison, Implementation, Downloads)',
    summary: 'We expanded the public site with domain use-case, category-roadmap, and learning-resource pages.',
    href: '/comparison',
    ctaLabel: 'Compare domain use cases',
  },
  {
    date: '2026-04-09',
    title: 'Resources updated for category guidance',
    summary: 'Resource listings now emphasize public research routes, glossary definitions, and domain context instead of unsupported assets.',
    href: '/resources',
    ctaLabel: 'View resources',
  },
  {
    date: '2026-04-08',
    title: 'Domain-first contact guidance',
    summary: 'The Contact page emphasizes domain acquisition, collaboration, and research-note inquiries.',
    href: '/contact',
    ctaLabel: 'Contact',
  },
];
