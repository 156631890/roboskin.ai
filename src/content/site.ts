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
  { value: 'High-density', label: 'Spatial Resolution' },
  { value: 'Low-latency', label: 'Latency' },
  { value: 'Curve-ready', label: 'Stretchability' },
  { value: 'Source-backed', label: 'Claim Context' },
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
