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

export type HomeBrandAssets = {
  brandBoard: {
    image: string;
    imageAlt: string;
  };
  hero: {
    image: string;
    imageAlt: string;
  };
};

export type PageVisual = {
  image: string;
  imageAlt: string;
  caption: string;
};

export const site = {
  name: 'RoboSkin.ai',
  url: 'https://roboskin.ai',
  tagline: 'Robot skin and tactile AI information hub',
  description: 'A public information hub for robot skin, tactile AI, e-skin, tactile sensing, and contact-aware robotics.',
  editorial: {
    name: 'RoboSkin.ai Editorial Team',
    path: '/editorial-policy',
    logo: '/favicon.svg',
  },
  contact: {
    primaryEmail: 'contact@roboskin.ai',
    ownerEmail: 'contact@roboskin.ai',
    inquiryEmail: 'contact@roboskin.ai',
    legalEmail: 'legal@roboskin.ai',
    privacyEmail: 'privacy@roboskin.ai',
    whatsapp: '15755596955',
    whatsappDial: '8615755596955',
    wechat: '15755596955',
  },
  domainInquiry: {
    label: 'RoboSkin.ai editorial inquiry',
    headline: 'RoboSkin.ai accepts source suggestions, corrections, and collaboration notes.',
    summary: 'A focused route for improving public robot skin, tactile AI, humanoid robotics, e-skin, and tactile sensing coverage.',
    href: '/contact?requestType=research',
    ctaLabel: 'Send a research note',
  },
};

export const primaryNavigation = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/news', label: 'News' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/applications', label: 'Use Cases' },
  { href: '/technology', label: 'Technology' },
  { href: '/resources', label: 'Library' },
  { href: '/about', label: 'About' },
];

export const footerNavigation = [
  {
    title: 'Research map',
    links: [
      { href: '/products', label: 'Guides' },
      { href: '/comparison', label: 'Comparison' },
      { href: '/solutions', label: 'Use cases' },
      { href: '/technology', label: 'Technology' },
      { href: '/resources', label: 'Library' },
      { href: '/implementation', label: 'Roadmap' },
      { href: '/downloads', label: 'References' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
      { href: '/case-studies', label: 'Context notes' },
      { href: '/research', label: 'Research' },
      { href: '/editorial-policy', label: 'Editorial policy' },
      { href: '/glossary', label: 'Glossary' },
      { href: '/news', label: 'News' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

export const homeStats = [
  { value: 'Map', label: 'Robot skin and tactile AI research routes' },
  { value: 'Guides', label: 'Plain-language explainers for tactile sensing concepts' },
  { value: 'Sources', label: 'Research notes with public references' },
  { value: 'Glossary', label: 'Definitions for robot skin and tactile AI terms' },
];

export const homeProofPoints: ContentTile[] = [
  {
    title: 'Evaluation-first positioning',
    description: 'The site explains surface geometry, signal-output concepts, interfaces, and source context so readers can avoid unsupported claims.',
  },
  {
    title: 'Technical vocabulary readers recognize',
    description: 'Robot skin, tactile AI, e-skin, slip detection, multimodal sensing, ROS 2 pipelines, and sensor fusion are used in practical context.',
  },
  {
    title: 'Conservative claim discipline',
    description: 'Durability, operating range, latency, and resolution claims are routed to source-backed research notes or clearly labeled contact context instead of broad public promises.',
  },
  {
    title: 'Searchable content clusters',
    description: 'Guide, use-case, research, glossary, comparison, and roadmap pages reinforce each other with natural internal links.',
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

export const homeBrandAssets: HomeBrandAssets = {
  brandBoard: {
    image: '/generated/brand/roboskin-brand-board.webp',
    imageAlt:
      'RoboSkin.ai brand system board showing a tactile grid logo, cold blue signal palette, typography, report cover, and robotic skin imagery.',
  },
  hero: {
    image: '/generated/brand/roboskin-hero-tactile-lab.webp',
    imageAlt:
      'Humanoid robotic hand and forearm covered with flexible tactile robot skin, blue sensor nodes, and signal paths in a dark robotics laboratory.',
  },
};

export const pageVisuals = {
  products: {
    image: '/generated/pages/domain-use-visual.webp',
    imageAlt:
      'Technical workbench showing RoboSkin.ai guide routes connected to robot skin, tactile AI, and research context.',
    caption: 'Guide-route visual for RoboSkin.ai research and category routes.',
  },
  applications: {
    image: '/generated/pages/application-contexts.webp',
    imageAlt:
      'Robot hand, gripper, and assistive surface examples connected by blue tactile sensing signals.',
    caption: 'Application-context visual for robot skin, e-skin, and tactile AI use cases.',
  },
  technology: {
    image: '/generated/pages/technology-signal-flow.webp',
    imageAlt:
      'Layered tactile sensor surface sending signals through processing boards and robot-ready data views.',
    caption: 'Technology visual showing tactile sensing layers and signal flow.',
  },
  resources: {
    image: '/generated/pages/resources-library.webp',
    imageAlt:
      'Organized robot skin learning library with technical cards, tactile sensor samples, and research screens.',
    caption: 'Resource-library visual for public learning routes and technical references.',
  },
  comparison: {
    image: '/generated/pages/comparison-matrix.webp',
    imageAlt:
      'Dark technical comparison matrix with robot skin routes, tactile sensor modules, and evaluation indicators.',
    caption: 'Comparison visual for evaluating RoboSkin.ai guide routes.',
  },
  implementation: {
    image: '/generated/pages/category-roadmap.webp',
    imageAlt:
      'Roadmap-style robotics bench showing tactile sensing stages from category orientation to inquiry path.',
    caption: 'Category-roadmap visual for robot skin implementation and positioning stages.',
  },
  caseStudies: {
    image: '/generated/pages/case-contexts.webp',
    imageAlt:
      'Three application-context panels showing robotic gripper, humanoid hand, and tactile sensor evaluation scenes.',
    caption: 'Case-context visual for conservative robot skin application summaries.',
  },
  about: {
    image: '/generated/pages/about-contact-inquiry.webp',
    imageAlt:
      'RoboSkin inquiry desk with robot hand, tactile skin sample, and organized technical contact materials.',
    caption: 'About-page visual for RoboSkin.ai as a conservative information resource.',
  },
  contact: {
    image: '/generated/pages/about-contact-inquiry.webp',
    imageAlt:
      'Research contact workstation with robot hand, tactile sensor sample, and contact cards.',
    caption: 'Contact-page visual for source suggestions, partnership, and research inquiries.',
  },
  answers: {
    image: '/generated/pages/glossary-faq-answers.webp',
    imageAlt:
      'Robot skin sample surrounded by concise tactile AI concept icons and answer-path nodes.',
    caption: 'Answer-page visual for glossary and FAQ routes.',
  },
} satisfies Record<string, PageVisual>;

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
        label: 'Start with what robot skin means',
        href: '/robot-skin',
        description: 'A focused definition page for robot skin, robotic skin, tactile surfaces, and contact-aware robotics.',
      },
      {
        label: 'Read the robot skin FAQ',
        href: '/faq',
        description: 'Short answers about evaluation, integration, public references, and claim limits.',
      },
      {
        label: 'Explore tactile AI technology',
        href: '/technology',
        description: 'A system view of sensing layers, signal processing, middleware, and validation fit.',
      },
      {
        label: 'Read the Physical AI explainer',
        href: '/physics-ai',
        description: 'A concise definition of Physical AI in the RoboSkin context: physical-world AI systems that need robot skin, tactile AI, and contact feedback.',
      },
      {
        label: 'Map Physical AI touch data',
        href: '/guides/physical-ai-touch-data',
        description: 'A guide to contact data for grasping, safety, evaluation, and robot learning workflows.',
      },
    ],
  },
  {
    title: 'Track the field',
    summary: 'Research notes and industry assets for teams following the tactile AI stack.',
    links: [
      {
        label: 'Browse robot hand tactile sensor research',
        href: '/research',
        description: 'Technical briefs about tactile sensors, soft robotic skin, multimodal sensing, and robot hands.',
      },
      {
        label: 'Read GSC-visible tactile AI briefs',
        href: '/news/full-hand-tactile-sensing-robot-hands-vision-control',
        description: 'A news brief on full-hand tactile sensing, robot hand control, and why vision-only manipulation needs contact feedback.',
      },
      {
        label: 'Track robot installation demand',
        href: '/news/global-robot-installations-542000-physical-ai-touch',
        description: 'A market signal linking industrial robot installations to Physical AI, tactile feedback, and robot skin evaluation.',
      },
      {
        label: 'Open Dream-Tac world-action model notes',
        href: '/research/dream-tac-tactile-world-action-model-2026',
        description: 'A high-impression research route for tactile world models, robot skin data, and Physical AI contact prediction.',
      },
      {
        label: 'Review single-material soft robotic skin',
        href: '/research/single-material-soft-robotic-skin-2025',
        description: 'A high-impression e-skin route for multimodal sensing, soft robotic skin, pressure, strain, and temperature.',
      },
      {
        label: 'Use the ROS 2 tactile sensor pipeline',
        href: '/research/ros2-kilted-tactile-pipeline-2026',
        description: 'A high-impression robotics software route for tactile messages, rosbag replay, and robot skin data evaluation.',
      },
      {
        label: 'Read GenForce transferable force sensing',
        href: '/research/genforce-transferable-force-sensing-2026',
        description: 'A high-impression route for transferable force sensing, tactile sensor calibration, and simulation-to-real limits.',
      },
      {
        label: 'Open robot skin paper routes',
        href: '/research/robot-skin-papers',
        description: 'A source-backed research index for robot skin papers, tactile AI papers, and e-skin research routes.',
      },
      {
        label: 'View RoboSkin library',
        href: '/resources',
        description: 'Briefs, stack maps, and reference paths for serious robotics readers.',
      },
      {
        label: 'Review context notes',
        href: '/case-studies',
        description: 'Application-context summaries without unsupported customer or performance claims.',
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
        label: 'Compare robot skin and e-skin',
        href: '/guides/robot-skin-vs-e-skin',
        description: 'Clarify where robot skin, e-skin, electronic skin, and tactile AI overlap.',
      },
      {
        label: 'Follow the category roadmap',
        href: '/implementation',
        description: 'Understand the source-backed path from orientation to research mapping and content improvement.',
      },
      {
        label: 'Review humanoid robot skin',
        href: '/applications/humanoid-robot-skin',
        description: 'A targeted application page for humanoid robot hands, arms, contact sensing, and tactile feedback.',
      },
      {
        label: 'Review robot hand tactile sensors',
        href: '/applications/robot-hand-tactile-sensor',
        description: 'A hand-level page for fingertip, palm, full-hand, slip, and grasp-stability sensing.',
      },
      {
        label: 'Open the reference library',
        href: '/downloads',
        description: 'Use public research notes, glossary routes, and educational references for evaluation context.',
      },
    ],
  },
  {
    title: 'Improve the resource',
    summary: 'Contact paths for source corrections, research suggestions, and editorial collaboration.',
    links: [
      {
        label: 'Submit source',
        href: '/contact?requestType=research',
        description: 'Send a public paper, correction, or useful reference for future updates.',
      },
      {
        label: 'Discuss editorial collaboration',
        href: '/contact?requestType=partnership',
        description: 'Open a conversation about research summaries, explainers, or category education.',
      },
      {
        label: 'General contact',
        href: '/contact?requestType=other',
        description: 'Use this path for notes that do not fit the research or collaboration categories.',
      },
    ],
  },
];

export const directAnswerBlocks: DirectAnswerBlock[] = [
  {
    question: 'What is robot skin?',
    answer:
      'Robot skin is a tactile sensing surface that helps robots detect contact, pressure, shear, slip, and interaction events across hands, grippers, arms, or curved body surfaces. It gives Physical AI systems a contact layer that vision alone cannot provide.',
    href: '/glossary',
    ctaLabel: 'Open the robot skin glossary',
    image: '/generated/authority/robot-skin-definition.webp',
    imageAlt: 'Flexible robotic skin sheet with glowing tactile sensor nodes detecting a contact point.',
  },
  {
    question: 'What is tactile AI?',
    answer:
      'Tactile AI is the sensing, data, and control workflow that turns touch signals into useful robot behavior. It can support grasp confidence, slip response, contact-aware motion, safety reflexes, and evaluation analytics for Physical AI systems.',
    href: '/research',
    ctaLabel: 'Browse tactile AI research',
    image: '/generated/authority/tactile-ai-loop.webp',
    imageAlt: 'Robot hand tactile signals flowing through edge AI and controller modules in a feedback loop.',
  },
  {
    question: 'What is RoboSkin Physical AI?',
    answer:
      'RoboSkin Physical AI means physical-world AI that needs robot skin, tactile AI, and contact feedback. RoboSkin.ai uses the term to connect touch, pressure, slip, and contact-aware robotics.',
    href: '/physics-ai',
    ctaLabel: 'Read the Physical AI explainer',
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
    href: '/applications',
    ctaLabel: 'View humanoid robot skin applications',
  },
  {
    question: 'How is tactile sensing different from vision or force-torque sensing?',
    answer:
      'Vision observes a scene from outside contact, while tactile sensing measures what happens at the contact surface. Force-torque sensors can measure aggregate loads, but robot skin can expose distributed contact patterns across fingertips, grippers, or curved surfaces.',
    href: '/technology',
    ctaLabel: 'Explore tactile AI technology',
  },
];

export const homePhysicalAiSignals: ContentTile[] = [
  {
    title: 'Robot skin is the contact layer',
    description:
      'Physical AI systems need local contact evidence when hands, grippers, tools, or body surfaces touch the world. Robot skin gives that evidence a surface layer.',
    href: '/robot-skin',
    ctaLabel: 'Read robot skin',
  },
  {
    title: 'Tactile AI turns touch into behavior',
    description:
      'Tactile AI connects pressure, shear, slip, calibration, timestamps, and controller-facing features so touch can support action, evaluation, or learning.',
    href: '/tactile-ai',
    ctaLabel: 'Open tactile AI',
  },
  {
    title: 'Contact feedback makes the route measurable',
    description:
      'The strongest Physical AI route links visible definitions to tactile feedback, touch data, source-backed research, and conservative claim boundaries.',
    href: '/guides/tactile-feedback-for-physical-ai',
    ctaLabel: 'Map feedback',
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
    summary: 'Contact-aware responses that help Physical AI systems behave more safely around people and objects.',
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
    description: 'Tactile datasets and benchmark protocols will matter as Physical AI moves from perception to contact-rich work.',
  },
  {
    title: 'Flexible electronics are maturing',
    description: 'Materials, sensor arrays, and embedded processing are moving tactile sensing closer to deployable robot surfaces.',
  },
];

export const manifesto = {
  title: 'Why tactile AI matters',
  summary: 'Robots need contact data, not just vision, when tasks involve grasping, sliding, pressure, or safe physical interaction.',
};

export const featuredIndustryAssets: FeaturedIndustryAsset[] = [
  {
    kicker: 'Guide',
    title: 'Tactile AI field overview',
    summary: 'A public entry point for robot hands, e-skin, flexible sensors, tactile data, and Physical AI applications.',
    href: '/resources',
    ctaLabel: 'View guide',
    code: 'GUIDE-01',
    accent: 'blue',
    includes: ['Market themes', 'Research signals', 'Application areas', 'Reader questions'],
    image: '/generated/authority/state-of-tactile-ai-cover.webp',
    imageAlt: 'Dark technical report cover background with robot hand, tactile sensor sheet, and blue data streams.',
  },
  {
    kicker: 'Explainer',
    title: 'Humanoid Tactile Stack Map',
    summary: 'A public learning map across sensors, materials, edge AI, datasets, grippers, prosthetics, simulation, and safety skins.',
    href: '/technology',
    ctaLabel: 'Read map',
    code: 'MAP-07',
    accent: 'teal',
    includes: ['Stack layers', 'Sensor categories', 'Data paths', 'Evaluation triggers'],
    image: '/generated/authority/humanoid-stack-map-cover.webp',
    imageAlt: 'Layered humanoid tactile stack modules connected by cyan signal paths.',
  },
  {
    kicker: 'Category note',
    title: 'Why tactile AI matters',
    summary: 'A concise explanation of why embodied AI needs touch for contact-rich physical environments.',
    href: '/applications',
    ctaLabel: 'Read note',
    code: 'NOTE-03',
    accent: 'amber',
    includes: ['Core idea', 'Terminology', 'Category language', 'Application context'],
    image: '/generated/authority/state-of-tactile-ai-cover.webp',
    imageAlt: 'Robot skin and tactile AI industry landscape rendered as a dark technical cover image.',
  },
  {
    kicker: 'Reference',
    title: 'Robot Skin Evaluation Index',
    summary: 'A public reference direction for comparing tactile sensor concepts, benchmark methods, and robot skin evaluation paths.',
    href: '/comparison',
    ctaLabel: 'Compare routes',
    code: 'INDEX-04',
    accent: 'rose',
    includes: ['Evaluation criteria', 'Sensor concepts', 'Benchmark prompts', 'Source context'],
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
    summary: 'A public route for mapping sensors, materials, middleware, edge AI, datasets, and evaluation triggers.',
    href: '/resources',
    label: 'Resource path',
    image: '/generated/authority/humanoid-stack-map-cover.webp',
    imageAlt: 'Humanoid tactile stack modules connected across sensor, edge AI, and feedback layers.',
  },
  {
    title: 'RoboSkin public references',
    summary: 'Use public research notes, glossary definitions, and educational references for evaluation context.',
    href: '/downloads',
    label: 'Reference path',
    image: '/generated/authority/roboskin-index-cover.webp',
    imageAlt: 'Organized tactile sensor evaluation kit with robot fingertip and benchmark objects.',
  },
];

export const productCards = [
  {
    name: 'Robot skin fundamentals',
    bestFor: 'Readers who need a clear starting point before reading technical papers',
    summary: 'A public guide route for robot skin, tactile AI, e-skin, and sensing intelligence concepts.',
    inputsOutputs: 'Definitions, category framing, research starting points',
    specs: ['Robot skin terminology', 'Tactile AI context', 'E-skin definitions', 'Useful for robotics audiences'],
    evaluation: ['Concept clarity', 'Audience fit', 'Source usefulness', 'Internal links to deeper notes'],
    verificationNote: 'Best used when a reader wants category understanding without product or procurement claims.',
    cta: 'Read the guide',
  },
  {
    name: 'Research and lab route',
    bestFor: 'University labs, research groups, and technical education projects',
    summary: 'A focused information route for organizing robot skin research notes, terminology, and tactile sensing references.',
    inputsOutputs: 'Research routes, glossary context, source discovery',
    specs: ['Robot skin research framing', 'E-skin terminology support', 'Tactile AI context', 'Useful for explainers and bibliographies'],
    evaluation: ['Research scope and audience', 'Terminology coverage needs', 'Citation and route discovery goals', 'Editorial update cadence'],
    verificationNote: 'Best used when a group needs a clear public home for educational robot skin and tactile AI material.',
    cta: 'Explore research',
  },
  {
    name: 'Applications and explainers',
    bestFor: 'Publishers, analysts, communities, and category owners',
    summary: 'A concise route for explaining robot skin applications, tactile AI trends, e-skin research, and robotics terminology.',
    inputsOutputs: 'Application context, category pages, research suggestions',
    specs: ['Strong topical relevance', 'Research and glossary fit', 'Practical examples', 'Clear correction path'],
    evaluation: ['Content usefulness', 'Research depth', 'Glossary coverage', 'Claim discipline'],
    verificationNote: 'Best used when the goal is source-backed category context rather than vendor copy.',
    cta: 'Discuss collaboration',
  },
];

export const evaluationPoints: EvaluationPoint[] = [
  {
    title: 'Category orientation',
    summary: 'A concise route for readers comparing robot skin, tactile AI, e-skin, and related robotics terminology.',
    checkpoints: ['Research route discovery', 'Glossary definitions', 'Application context', 'Source quality'],
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
    checkpoints: ['No invented benchmarks', 'No unsupported customer claims', 'Clearly labeled source context', 'Application-specific source framing'],
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
      'Align category pages with research routes, glossary definitions, and source suggestion context.',
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
        title: 'RoboSkin.ai source context',
        description: 'Understand how the site supports robotics education, research notes, and source-backed category pages.',
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
        title: 'Physical AI',
        description: 'Understand RoboSkin Physical AI as physical-world AI systems that need robot skin, tactile AI, contact feedback, pressure, slip, and tactile sensing.',
        availability: 'Public explainer',
        ctaLabel: 'Read',
        href: '/physics-ai',
      },
      {
        title: 'FAQ',
        description: 'Read guidance about how to interpret public robot skin and tactile AI source boundaries.',
        availability: 'Public reference',
        ctaLabel: 'Read',
        href: '/faq',
      },
    ],
  },
  {
    title: 'Corrections and collaboration',
    items: [
      {
        title: 'Correction inquiry',
        description: 'Use the contact route for corrections, partnership, or content collaboration around RoboSkin.ai.',
        availability: 'Contact path',
        ctaLabel: 'Send note',
        href: '/contact?requestType=research',
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
    title: 'Research correction',
    summary: 'Use this path to suggest a source, flag an unsupported claim, or improve a robot skin research note.',
    href: '/contact?requestType=research',
    ctaLabel: 'Send a research note',
  },
  {
    title: 'Editorial collaboration',
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
    sensorArray: 'Robot skin fundamentals',
    developerKit: 'Research and lab route',
    customProgram: 'Applications and explainers',
  },
  {
    label: 'What it supports',
    sensorArray: 'Basic category understanding',
    developerKit: 'Research routes and glossary context',
    customProgram: 'Editorial explainers and source suggestions',
  },
  {
    label: 'Primary audience',
    sensorArray: 'General robotics readers',
    developerKit: 'Labs and education teams',
    customProgram: 'Publishers, analysts, and category owners',
  },
  {
    label: 'Recommended if you need',
    sensorArray: 'A plain-language robot skin primer',
    developerKit: 'A clear educational research hub',
    customProgram: 'A focused media or category landing page',
  },
];

export const deploymentStages: ImplementationStage[] = [
  {
    title: 'Orientation',
    summary: 'Clarify the category, audience, and information route before making claims about robot skin or tactile AI.',
    inputs: ['Audience type', 'Topic focus', 'Research goal'],
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
    summary: 'Shape a concise educational page around the topic with visible sources and clear boundaries.',
    inputs: ['Page purpose', 'Audience need', 'Internal links'],
    outputs: ['Page outline', 'Conservative claim checklist', 'Contact route if relevant'],
  },
  {
    title: 'Editorial improvement',
    summary: 'Route source suggestions, corrections, or content collaboration interest through clearly labeled contact context.',
    inputs: ['Inquiry type', 'Organization context', 'Suggested source'],
    outputs: ['Research note suggestions', 'Correction queue', 'Partnership context'],
  },
];

export const aboutSections: AboutSection[] = [
  {
    title: 'What this site publishes',
    summary: 'RoboSkin.ai publishes source-backed robot skin and tactile AI context for readers who need a research map, not vendor copy.',
    bullets: [
      'Robot skin, tactile AI, e-skin, and tactile sensing terminology',
      'Research routes, glossary definitions, and category context',
      'A narrow public story with clearly labeled source and correction context',
    ],
  },
  {
    title: 'How readers should use it',
    summary: 'Use the site for definitions, research discovery, category framing, and source trails.',
    bullets: [
      'Start with applications, research, and glossary routes',
      'Check whether a claim is supported by public source context',
      'Use contact paths only for corrections, collaboration, or research-note inquiries',
    ],
  },
  {
    title: 'Claims discipline',
    summary: 'The site keeps claims narrow and separates public source evidence from RoboSkin.ai editorial interpretation.',
    bullets: [
      'No invented benchmarks, customer logos, or certifications',
      'No implied product availability, customer support, or procurement route',
      'If a detail is uncertain, it belongs in source-backed context or not on the page',
    ],
  },
  {
    title: 'Independence note',
    summary: 'RoboSkin.ai is an independent information resource. Its name should not be read as an affiliation claim with similarly named products, companies, labs, or research projects.',
    bullets: [
      'External citations are references, not endorsements',
      'Similar project names need source-level attribution',
      'Brand, product, or affiliation claims require explicit public support',
    ],
  },
  {
    title: 'What to send us',
    summary: 'The clearest inquiries explain whether the goal is correction, collaboration, or research-source improvement.',
    bullets: [
      'Correction, source, or partnership context',
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
    question: 'What does Physical AI mean in the RoboSkin context?',
    answer:
      'In the RoboSkin context, Physical AI means physical-world AI systems that need robot skin, tactile AI, contact feedback, pressure, slip, and tactile sensing.',
    ctaLabel: 'Read the Physical AI explainer',
    href: '/physics-ai',
  },
  {
    question: 'How do I ask about RoboSkin.ai?',
    answer: 'Use the Contact form for research-source suggestions, corrections, content collaboration, or general notes.',
    ctaLabel: 'Send a research inquiry',
    href: '/contact?requestType=research',
  },
  {
    question: 'Do you support ROS or ROS2?',
    answer: 'This site may discuss ROS 2 as research and terminology context, but it does not claim platform compatibility, support, or product availability.',
    ctaLabel: 'Read the research note',
    href: '/research/ros2-kilted-tactile-pipeline-2026',
  },
  {
    question: 'Are there public resources?',
    answer: 'Yes. Public pages provide category guides, research routes, glossary definitions, and source-backed context.',
    ctaLabel: 'View resources',
    href: '/resources',
  },
  {
    question: 'What information should I include in the first message?',
    answer: 'State whether your inquiry is about a correction, source suggestion, partnership, content collaboration, or general question.',
    ctaLabel: 'Contact',
    href: '/contact',
  },
  {
    question: 'Does RoboSkin.ai claim active product availability?',
    answer: 'No. RoboSkin.ai is positioned as a research and category information map, not as a public catalog of available robot skin products.',
    ctaLabel: 'View guide routes',
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
    term: 'Physical AI',
    definition: 'In the RoboSkin context, Physical AI means physical-world AI systems that need touch, pressure, slip, and tactile feedback.',
    related: ['robot skin', 'tactile AI', 'contact-aware robotics'],
    href: '/physics-ai',
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
    definition: 'A conservative explanation of how robot skin terminology, applications, and research context relate without implying product availability.',
    related: ['applications', 'research routes', 'source context'],
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
    title: 'Source-backed category checklist',
    context: 'A reader needed to separate useful tactile AI terminology from unsupported marketing claims.',
    approach: 'We summarized audience fit, category relevance, source context, and possible content routes.',
    outcome: 'A clearer research path for source-backed category-content planning.',
    note: 'The checklist describes information routes, not a commercial product roadmap.',
    ctaLabel: 'Send a research note',
    href: '/contact?requestType=research',
  },
];

export const newsItems: NewsItem[] = [
  {
    date: '2026-04-10',
    title: 'Research map expansion',
    summary: 'We expanded the public site with guide-route, category-roadmap, and reference-library pages.',
    href: '/comparison',
    ctaLabel: 'Compare guide routes',
  },
  {
    date: '2026-04-09',
    title: 'Resources updated for category guidance',
    summary: 'Resource listings now emphasize public research routes, glossary definitions, and source context instead of unsupported assets.',
    href: '/resources',
    ctaLabel: 'View resources',
  },
  {
    date: '2026-04-08',
    title: 'Research-first contact guidance',
    summary: 'The Contact page emphasizes source corrections, collaboration, and research-note inquiries.',
    href: '/contact',
    ctaLabel: 'Contact',
  },
];
