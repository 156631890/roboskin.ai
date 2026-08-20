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
  tagline: 'Robot Skin, Tactile AI & Physical AI Intelligence',
  description:
    'An independent research and intelligence platform mapping robot skin, tactile sensing, tactile AI, robot manipulation, humanoid touch, and Physical AI.',
  editorial: {
    name: 'RoboSkin.ai Editorial Team',
    path: '/editorial-policy',
    logo: '/apple-touch-icon.svg',
    lead: {
      name: 'Steven Yang',
      role: 'Founder & Editor',
      path: '/about#editorial-lead',
    },
  },
  contact: {
    primaryEmail: 'messigoat147@gmail.com',
    ownerEmail: 'messigoat147@gmail.com',
    inquiryEmail: 'messigoat147@gmail.com',
    legalEmail: 'messigoat147@gmail.com',
    privacyEmail: 'messigoat147@gmail.com',
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
    title: 'Core topics',
    links: [
      { href: '/robot-skin', label: 'Robot Skin' },
      { href: '/tactile-ai', label: 'Tactile AI' },
      { href: '/humanoid-robot-skin', label: 'Humanoid Robot Skin' },
      { href: '/physical-ai-touch', label: 'Physical AI + Touch' },
    ],
  },
  {
    title: 'Research',
    links: [
      { href: '/research-index', label: 'Research Index' },
      { href: '/datasets', label: 'Datasets' },
      { href: '/research', label: 'Research Briefs' },
      { href: '/news', label: 'News' },
    ],
  },
  {
    title: 'RoboSkin.ai',
    links: [
      { href: '/research-services', label: 'Research services' },
      { href: '/reports/tactile-ai-robot-skin-landscape-2026', label: 'Free sample report' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/editorial-policy', label: 'Editorial policy' },
    ],
  },
];

export const homeStats = [
  { value: '19', label: 'Structured tactile and robot-learning research records' },
  { value: '38', label: 'Source-backed research and robotics news briefs' },
  { value: '5', label: 'Visuo-tactile world-model papers compared' },
  { value: '2026', label: 'Current Physical AI and humanoid robotics watch' },
];

export const homeKnowledgeMap: ContentTile[] = [
  {
    title: 'Robot Skin',
    description: 'Technologies, sensing principles, surface architectures, e-skin relationships, and research routes.',
    href: '/robot-skin',
    ctaLabel: 'Map the sensing surface',
  },
  {
    title: 'Tactile AI',
    description: 'The complete path from calibrated touch data to representations, models, robot control, and evidence.',
    href: '/tactile-ai',
    ctaLabel: 'Explore tactile intelligence',
  },
  {
    title: 'Humanoid Robot Skin',
    description: 'Full-hand, whole-arm, and whole-body tactile sensing for manipulation, interaction, and contact awareness.',
    href: '/humanoid-robot-skin',
    ctaLabel: 'Open the humanoid stack',
  },
  {
    title: 'Tactile Models',
    description: 'Representation learning, tactile foundation models, visuo-tactile world models, policies, and transfer limits.',
    href: '/tactile-foundation-models',
    ctaLabel: 'Compare emerging models',
  },
  {
    title: 'Datasets & Benchmarks',
    description: 'A filterable, source-reviewed database of tactile robotics data, sensors, robots, tasks, formats, and licenses.',
    href: '/datasets',
    ctaLabel: 'Filter tactile datasets',
  },
  {
    title: 'Physical AI + Touch',
    description: 'How vision, language, proprioception, and touch combine in embodied perception, planning, and control.',
    href: '/physical-ai-touch',
    ctaLabel: 'Connect touch to Physical AI',
  },
];

export const homeBroadResearchLanes: ContentTile[] = [
  {
    title: 'Humanoid robots and robot hands',
    description:
      'Track tactile coverage, dexterous hands, grasp stability, slip, and contact feedback for humanoid robot manipulation.',
    href: '/humanoid-robots',
    ctaLabel: 'Explore humanoid robots',
  },
  {
    title: 'Robot learning, Physical AI, and embodied AI',
    description:
      'Map demonstrations, reinforcement learning, robot datasets, sim-to-real transfer, and tactile feedback into physical-world behavior.',
    href: '/robot-learning',
    ctaLabel: 'Map robot learning',
  },
  {
    title: 'Robot manipulation and tactile sensors',
    description:
      'Compare visual, acoustic, magnetic, and resistive tactile sensing by contact-rich manipulation task and evidence boundary.',
    href: '/robot-manipulation',
    ctaLabel: 'Map robot manipulation',
  },
  {
    title: 'VLA and visuo-tactile world models',
    description:
      'Follow action-conditioned contact prediction, world-action models, planning evidence, and the role of touch in robot policies.',
    href: '/robot-vla-models',
    ctaLabel: 'Map robot VLA models',
  },
];

export const homeResearchWatch = {
  eyebrow: 'August 2026 humanoid tactile watch',
  title: 'Tac4Loco turns plantar pressure into post-contact locomotion feedback',
  summary:
    'A new preprint equips a Unitree G1 with 60-element pressure insoles on each foot and feeds spatial and temporal load patterns into a locomotion policy. In the reported physical comparisons, Tac4Loco completed a ramp-to-foam transition in 10 of 10 trials versus 4 of 10 for the proprioception-only baseline.',
  relevance:
    'The result expands humanoid robot skin beyond hands and arms: foot pressure verifies partial, asymmetric, or compliant support after touchdown, while vision remains the complementary pre-contact channel.',
  sourceLabel: 'Primary source: Tac4Loco on arXiv',
  sourceUrl: 'https://arxiv.org/abs/2608.15766',
  sourceDate: '2026-08-16',
  reviewedAt: '2026-08-18',
};

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
  image: '/generated/brand/roboskin-tactile-material-study-v2.webp',
  imageAlt:
    'Robotic fingertip pressing a flexible tactile sensor sheet with a copper micro-grid on a precision research fixture.',
};

export const homeBrandAssets: HomeBrandAssets = {
  brandBoard: {
    image: '/generated/brand/roboskin-brand-board.webp',
    imageAlt:
      'RoboSkin.ai brand system board showing a tactile grid logo, cold blue signal palette, typography, report cover, and robotic skin imagery.',
  },
  hero: {
    image: '/generated/brand/roboskin-hero-editorial-v2.webp',
    imageAlt:
      'Graphite humanoid robotic hand with flexible tactile skin approaching a sculptural ceramic surface in a warm industrial studio.',
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
    summary: 'Definitions and technical explainers for rob×m8âÚ$z{-®éÜj×BFò6VæBW2rÀĞ¢7VÖÖ'“¢uF†R6ÆV&W7B–çV—&–W2W‡Æ–âv†WF†W"F†RvöÂ—26÷'&V7F–öâÂ6öÆÆ&÷&F–öâÂ÷"&W6V&6‚×6÷W&6R–×&÷fVÖVçBârÀĞ¢'VÆÆWG3¢°Ğ¢t6÷'&V7F–öâÂ6÷W&6RÂ÷"'FæW'6†—6öçFW‡BrÀĞ¢u&W6V&6‚6÷W&6W2Â6÷'&V7F–öç2Â÷"W6VgVÂFF—F–öç2rÀĞ¢t6öçFVçB÷"ÖVF–6öçFW‡Bf÷"&ö&÷B6¶–âæBF7F–ÆR’rÀĞ¢ÒÀĞ¢ÒÀĞ¥Ó°Ğ Ğ¦W‡÷'B6öç7Bf—FV×3¢f—FVÕµÒÒ°Ğ¢°Ğ¢VW7F–öã¢uv†B—2F†Rf7FW7Bv’FòVæFW'7FæBF†R6FVv÷'“òrÀĞ¢ç7vW#¢u7F'Bv—F‚F†RÆ–6F–öç2vRÂF†VâW6RF†R&W6V&6‚–æFW‚æBvÆ÷76'’FòVæFW'7FæB&ö&÷B6¶–âÂF7F–ÆR’ÂR×6¶–âÂæB&VÆFVBFW&Ö–æöÆöw’ârÀĞ¢7FÆ&VÃ¢tW‡Æ÷&R&W6V&6‚rÀĞ¢‡&Vc¢r÷&W6V&6‚rÀĞ¢ÒÀĞ¢°Ğ¢VW7F–öã¢uv†BFöW2‡—6–6Â’ÖVâ–âF†R&ö&õ6¶–â6öçFW‡CòrÀĞ¢ç7vW# Ğ¢t–âF†R&ö&õ6¶–â6öçFW‡BÂ‡—6–6Â’ÖVç2‡—6–6Â×v÷&ÆB’7—7FV×2F†BæVVB&ö&÷B6¶–âÂF7F–ÆR’Â6öçF7BfVVF&6²Â&W77W&RÂ6Æ—ÂæBF7F–ÆR6Vç6–ærârÀĞ¢7FÆ&VÃ¢u&VBF†R‡—6–6Â’W‡Æ–æW"rÀĞ¢‡&Vc¢r÷‡—6–72Ö’rÀĞ¢ÒÀĞ¢°Ğ¢VW7F–öã¢t†÷rFò’6²&÷WB&ö&õ6¶–âæ“òrÀĞ¢ç7vW#¢uW6RF†R6öçF7Bf÷&Òf÷"&W6V&6‚×6÷W&6R7VvvW7F–öç2Â6÷'&V7F–öç2Â6öçFVçB6öÆÆ&÷&F–öâÂ÷"vVæW&Âæ÷FW2ârÀĞ¢7FÆ&VÃ¢u6VæB&W6V&6‚–çV—'’rÀĞ¢‡&Vc¢rö6öçF7C÷&WVW7EG—S×&W6V&6‚rÀĞ¢ÒÀĞ¢°Ğ¢VW7F–öã¢tFò–÷R7W÷'B$õ2÷"$õ3#òrÀĞ¢ç7vW#¢uF†—26—FRÖ’F—67W72$õ2"2&W6V&6‚æBFW&Ö–æöÆöw’6öçFW‡BÂ'WB—BFöW2æ÷B6Æ–ÒÆFf÷&Ò6ö×F–&–Æ—G’Â7W÷'BÂ÷"&öGV7Bf–Æ&–Æ—G’ârÀĞ¢7FÆ&VÃ¢u&VBF†R&W6V&6‚æ÷FRrÀĞ¢‡&Vc¢r÷&W6V&6‚÷&÷3"Ö¶–ÇFVB×F7F–ÆR×—VÆ–æRÓ##brÀĞ¢ÒÀĞ¢°Ğ¢VW7F–öã¢t&RF†W&RV&Æ–2&W6÷W&6W3òrÀĞ¢ç7vW#¢u–W2âV&Æ–2vW2&÷f–FR6FVv÷'’wV–FW2Â&W6V&6‚&÷WFW2ÂvÆ÷76'’FVf–æ—F–öç2ÂæB6÷W&6RÖ&6¶VB6öçFW‡BârÀĞ¢7FÆ&VÃ¢uf–Wr&W6÷W&6W2rÀĞ¢‡&Vc¢r÷&W6÷W&6W2rÀĞ¢ÒÀĞ¢°Ğ¢VW7F–öã¢uv†B–æf÷&ÖF–öâ6†÷VÆB’–æ6ÇVFR–âF†Rf—'7BÖW76vSòrÀĞ¢ç7vW#¢u7FFRv†WF†W"–÷W"–çV—'’—2&÷WB6÷'&V7F–öâÂ6÷W&6R7VvvW7F–öâÂ'FæW'6†—Â6öçFVçB6öÆÆ&÷&F–öâÂ÷"vVæW&ÂVW7F–öâârÀĞ¢7FÆ&VÃ¢t6öçF7BrÀĞ¢‡&Vc¢rö6öçF7BrÀĞ¢ÒÀĞ¢°Ğ¢VW7F–öã¢tFöW2&ö&õ6¶–âæ’6Æ–Ò7F—fR&öGV7Bf–Æ&–Æ—G“òrÀĞ¢ç7vW#¢tæòâ&ö&õ6¶–âæ’—2÷6—F–öæVB2&W6V&6‚æB6FVv÷'’–æf÷&ÖF–öâÖÂæ÷B2V&Æ–26FÆöröbf–Æ&ÆR&ö&÷B6¶–â&öGV7G2ârÀĞ¢7FÆ&VÃ¢uf–WrwV–FR&÷WFW2rÀĞ¢‡&Vc¢r÷&öGV7G2rÀĞ¢ÒÀĞ¢°Ğ¢VW7F–öã¢t†÷r6†÷VÆB6Æ–×2&R–çFW'&WFVCòrÀĞ¢ç7vW#¢uG&VBV&Æ–26öçFVçB2VGV6F–öæÂ6öçFW‡BâFòæ÷B–æfW"&Væ6†Ö&²fÇVW2Â6W'F–f–6F–öç2Â7W7FöÖW"æÖW2Â÷"÷W&F–ærÖ6ö×ç’6Æ–×2VæÆW72F†W’&RW‡Æ–6—FÇ’V&Æ—6†VBârÀĞ¢ÒÀĞ¢°Ğ¢VW7F–öã¢uv†BVÖ–Â6†÷VÆB’W6Rf÷"F—&V7B–çV—&–W3òrÀĞ¢ç7vW#¢6—FRæ6öçF7Bç&–Ö'”VÖ–ÂÀĞ¢ÒÀĞ¥Ó°Ğ Ğ¦W‡÷'B6öç7BvÆ÷76'•FW&×3¢vÆ÷76'•FW&ÕµÒÒ°Ğ¢°Ğ¢FW&Ó¢u&ö&÷B6¶–ârÀĞ¢FVf–æ—F–öã¢tF7F–ÆR6Vç6–ær7W&f6RF†B†VÇ2&ö&÷BFWFV7B6öçF7BÂ&W77W&RÂ6†V"Â6Æ—Â÷"–çFW&7F–öâWfVçG27&÷72†æG2Âw&—W'2Â&×2Â÷"7W'fVB&öG’7W&f6W2ârÀĞ¢&VÆFVC¢²wF7F–ÆR6Vç6–ærrÂvR×6¶–ârÂv‡VÖæö–B&ö&÷B6¶–âuÒÀĞ¢‡&Vc¢r÷&ö&÷B×6¶–ârÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uF7F–ÆR’rÀĞ¢FVf–æ—F–öã¢u6ögGv&RæB6Vç6–ærv÷&¶fÆ÷w2F†BGW&âF÷V6‚FF–çFòW6VgVÂ&ö&÷B6–væÇ2f÷"w&7–ærÂ6öçF7B&W7öç6RÂÖæ—VÆF–öâÂ÷"WfÇVF–öâæÇ—F–72ârÀĞ¢&VÆFVC¢²w6Vç6÷"gW6–öârÂw&ö&÷BÆV&æ–ærrÂw6Æ—FWFV7F–öâuÒÀĞ¢‡&Vc¢r÷F7F–ÆRÖ’rÀĞ¢ÒÀĞ¢°¢FW&Ó¢u‡—6–6Â’rÀ¢FVf–æ—F–öã¢t–âF†R&ö&õ6¶–â6öçFW‡BÂ‡—6–6Â’ÖVç2‡—6–6Â×v÷&ÆB’7—7FV×2F†BæVVBF÷V6‚Â&W77W&RÂ6Æ—ÂæBF7F–ÆRfVVF&6²ârÀĞ¢&VÆFVC¢²w&ö&÷B6¶–ârÂwF7F–ÆR’rÂv6öçF7BÖv&R&ö&÷F–72uÒÀĞ¢‡&Vc¢r÷‡—6–72Ö’rÀ¢ÒÀ¢°¢FW&Ó¢u&ö&÷BÆV&æ–ærrÀ¢FVf–æ—F–öã¢uF†RW6RöbFF÷"W‡W&–Væ6RFòG&–â&ö&÷BW&6WF–öâÂ&VF–7F–öâÂ÷"7F–öâF‡&÷Vv‚FVÖöç7G&F–öç2Â&Wv&G2Â6VÆb×7WW'f—6–öâÂ6–×VÆF–öâÂ÷"×VÇF–ÖöFÂfVVF&6²ârÀ¢&VÆFVC¢²v–Ö—FF–öâÆV&æ–ærrÂw&V–æf÷&6VÖVçBÆV&æ–ærrÂw&ö&÷BFF6WG2uÒÀ¢‡&Vc¢r÷&ö&÷BÖÆV&æ–ærrÀ¢ÒÀ¢°¢FW&Ó¢t‡VÖæö–B&ö&÷BrÀ¢FVf–æ—F–öã¢t‡—6–6Â&ö&÷Bv†÷6R&öG’Æâ÷"6&–Æ—F–W2&RFW6–væVB&÷VæB‡VÖâ×66ÆRVçf—&öæÖVçG2ÂögFVâ6öÖ&–æ–ærÖö&–Æ—G’Â&×2Â†æG2÷"w&—W'2ÂW&6WF–öâÂ6öçG&öÂÂæB6fWG’7—7FV×2ârÀĞ¢&VÆFVC¢²v‡VÖæö–B&ö&÷F–72rÂwv†öÆRÖ&öG’6öçG&öÂrÂu‡—6–6Â’uÒÀĞ¢‡&Vc¢rö‡VÖæö–B×&ö&÷G2rÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uf—6–öâÖÆæwVvRÖ7F–öâÖöFVÂrÀĞ¢FVf–æ—F–öã¢t&ö&÷BÖöFVÂF†BW6W2f—7VÂö'6W'fF–öç2æBÆæwVvR–ç7G'V7F–öç2Fò&öGV6R÷"6öæF—F–öâ‡—6–6Â7F–öç3²–×ÆVÖVçFF–öç2F–ffW"–â7F–öâ&W&W6VçFF–öâÂVÖ&öF–ÖVçBÂFFÂæB6öçG&öÂ–çFW&f6RârÀĞ¢&VÆFVC¢²udÄrÂw&ö&÷Bf÷VæFF–öâÖöFVÂrÂvVÖ&öF–VB&V6öæ–æruÒÀĞ¢‡&Vc¢r÷&ö&÷B×fÆÖÖöFVÇ2rÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢u&ö&÷Bf÷VæFF–öâÖöFVÂrÀĞ¢FVf–æ—F–öã¢t'&öFÇ’G&–æVBÖöFVÂ–çFVæFVBf÷"&WW6R÷"FFF–öâ7&÷72×VÇF—ÆR&ö&÷BF6·2ÂVçf—&öæÖVçG2Â÷"VÖ&öF–ÖVçG2Âv—F‚F†R6Æ–ÖVB'&VGF‚&WV—&–ærF—&V7BG&ç6fW"Wf–FVæ6RârÀĞ¢&VÆFVC¢²wf—6–öâÖÆæwVvRÖ7F–öâÖöFVÂrÂw&ö&÷BÆV&æ–ærrÂv×VÇF’ÖVÖ&öF–ÖVçBÖöFVÂuÒÀĞ¢‡&Vc¢r÷&ö&÷B×fÆÖÖöFVÇ2rÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢u&ö&÷BÖæ—VÆF–öârÀĞ¢FVf–æ—F–öã¢uF†RW6Röb&ö&÷B&ÒÂ†æBÂw&—W"ÂFööÂÂ÷"v†öÆR&öG’Fò–çFVçF–öæÆÇ’6†ævRâö&¦V7B÷"Vçf—&öæÖVçBF‡&÷Vv‚‡—6–6Â7F–öâârÀĞ¢&VÆFVC¢²w&ö&÷Bw&7–ærrÂvFW‡FW&÷W2Öæ—VÆF–öârÂv6öçF7B×&–6‚Öæ—VÆF–öâuÒÀĞ¢‡&Vc¢r÷&ö&÷BÖÖæ—VÆF–öârÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢tR×6¶–ârÀĞ¢FVf–æ—F–öã¢tVÆV7G&öæ–26¶–ã¢fÆW†–&ÆR÷"6ögB6Vç6÷"Æ–W"FW6–væVBFòÖV7W&R6öçF7B×&VÆFVB6–væÇ2öâæöâÖfÆB7W&f6W2ârÀĞ¢&VÆFVC¢²vfÆW†–&ÆRF7F–ÆR6Vç6÷"rÂw6ögB&ö&÷F–26¶–ârÂv×VÇF–ÖöFÂ6Vç6–æruÒÀĞ¢‡&Vc¢röR×6¶–ârÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢u6Æ—FWFV7F–öârÀĞ¢FVf–æ—F–öã¢tFWFV7F–öâöbö&¦V7BÖ÷fVÖVçB&VÆF—fRFò&ö&÷Bf–ævW"÷"w&—W"ÂögFVâW6–ær6†V"Âf–'&F–öâÂFW‡GW&RÂ÷"WfVçBÖ&6VBF7F–ÆR6–væÇ2ârÀĞ¢&VÆFVC¢²vFW‡FW&÷W2Öæ—VÆF–öârÂvw&—6öçG&öÂrÂvWfVçBÖ&6VB6Vç6–æruÒÀĞ¢‡&Vc¢röwV–FW2÷6Æ—ÖFWFV7F–öâ×&ö&÷BÖ†æBrÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢t×VÇF–ÖöFÂF7F–ÆR6Vç6–ærrÀĞ¢FVf–æ—F–öã¢t6Vç6÷"&ö6‚F†B6GW&W2Ö÷&RF†âöæR7F–×VÇW2G—RÂ7V6‚2&W77W&RæBFV×W&GW&RÂv†–ÆRÖæv–ær7&÷77FÆ²æB6Æ–'&F–öâârÀĞ¢&VÆFVC¢²wFV×W&GW&R÷&W77W&R6Vç6–ærrÂv7&÷77FÆ²rÂw6–væÂFV6÷WÆ–æruÒÀĞ¢‡&Vc¢r÷&W6V&6‚÷FV×W&GW&R×&W77W&RÖ&–ÖöFÂÓ##RrÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢u$õ2"F7F–ÆR—VÆ–æRrÀĞ¢FVf–æ—F–öã¢t&ö&÷F–726ögGv&RF‚f÷"&V6÷&F–ærÂ&WÆ––ærÂG&ç6f÷&Ö–ærÂæB6öç7VÖ–ærF7F–ÆR6Vç6÷"FFv—F‚6öç6—7FVçBF–ÖW7F×2Âg&ÖW2ÂæBÖ–FFÆWv&R6WGF–æw2ârÀĞ¢&VÆFVC¢²u$õ2"¶–ÇFVBrÂw&÷6&s"rÂw&÷3%ö6öçG&öÂuÒÀĞ¢‡&Vc¢röwV–FW2÷&÷3"×F7F–ÆR×6Vç6–ærrÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢t6FVv÷'’6öçFW‡BrÀĞ¢FVf–æ—F–öã¢t6öç6W'fF—fRW‡ÆæF–öâöb†÷r&ö&÷B6¶–âFW&Ö–æöÆöw’ÂÆ–6F–öç2ÂæB&W6V&6‚6öçFW‡B&VÆFRv—F†÷WB–×Ç––ær&öGV7Bf–Æ&–Æ—G’ârÀĞ¢&VÆFVC¢²vÆ–6F–öç2rÂw&W6V&6‚&÷WFW2rÂw6÷W&6R6öçFW‡BuÒÀĞ¢‡&Vc¢röÆ–6F–öç2rÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uF7F–ÆR6Vç6–ærrÀĞ¢FVf–æ—F–öã¢uF†RÖV7W&VÖVçBöb‡—6–6Â6öçF7BF‡&÷Vv‚6–væÇ27V6‚2&W77W&RÂæ÷&ÖÂæB6†V"f÷&6RÂ6Æ—Âf–'&F–öâÂFV×W&GW&RÂFVf÷&ÖF–öâÂ÷"F7F–ÆR–ÖvW2ârÀĞ¢&VÆFVC¢²wF7F–ÆR6Vç6÷"rÂw&ö&÷B6¶–ârÂv6öçF7B6Vç6–æruÒÀĞ¢‡&Vc¢röwV–FW2÷F7F–ÆR×6Vç6÷"Öf÷"×&ö&÷G2rÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uF7F–ÆR6Vç6÷"rÀĞ¢FVf–æ—F–öã¢tFWf–6RF†B6öçfW'G26öçF7BB&ö&÷B7W&f6R–çFòVÆV7G&–6ÂÂ÷F–6ÂÂÖvæWF–2Â6÷W7F–2Â÷"÷F†W"ÖV7W&&ÆRö'6W'fF–öç2ârÀĞ¢&VÆFVC¢²wF†VÂrÂvf÷&6R6Vç6–ærrÂwf—6–öâÖ&6VBF7F–ÆR6Vç6÷"uÒÀĞ¢‡&Vc¢r÷6Vç6÷'2rÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uF†VÂrÀĞ¢FVf–æ—F–öã¢t7F–ÆÇ’–æFW†VBF7F–ÆR6Vç6–ærVÆVÖVçB–ââ'&’âVæÆ–¶R—†VÂÂ—G2‡—6–6ÂVçF—G’Â&W7öç6R&VÂ7&÷77FÆ²ÂæB6Æ–'&F–öâFWVæBöâF†R6Vç6÷"FW6–vâârÀĞ¢&VÆFVC¢²wF7F–ÆR'&’rÂw7F–Â&W6öÇWF–öârÂv7&÷77FÆ²uÒÀĞ¢‡&Vc¢r÷6Vç6÷'2rÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uF7F–ÆRÖæ—VÆF–öârÀĞ¢FVf–æ—F–öã¢u&ö&÷BÖæ—VÆF–öâF†BW6W2ÖV7W&VB6öçF7BFòW7F–ÖFR‡—6–6Â7FFRæBWFFRw&—Â÷6RÂG&¦V7F÷'’Âf÷&6RÂ÷"&V6÷fW'’7F–öç2ârÀĞ¢&VÆFVC¢²v6öçF7B×&–6‚Öæ—VÆF–öârÂw6Æ—FWFV7F–öârÂw&ö&÷B6öçG&öÂuÒÀĞ¢‡&Vc¢r÷F7F–ÆRÖÖæ—VÆF–öârÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢t6öçF7B×&–6‚Öæ—VÆF–öârÀĞ¢FVf–æ—F–öã¢tÖæ—VÆF–öâ6WGF–ær–âv†–6‚7W7F–æVB÷"&WVFVB‡—6–6Â6öçF7B—26VçG&ÂFòF6²7V66W72Â2–â–ç6W'F–öâÂ7W&f6RföÆÆ÷v–ærÂföÆF–ærÂ÷"–âÖ†æB&V÷&–VçFF–öâârÀĞ¢&VÆFVC¢²wF7F–ÆRÖæ—VÆF–öârÂvf÷&6R6öçG&öÂrÂvFW‡FW&÷W2Öæ—VÆF–öâuÒÀĞ¢‡&Vc¢r÷F7F–ÆRÖÖæ—VÆF–öârÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uf—7Vò×F7F–ÆRW&6WF–öârÀĞ¢FVf–æ—F–öã¢t¦ö–çB&ö6W76–æröbf—7VÂæBF7F–ÆRö'6W'fF–öç2FòW7F–ÖFRÖFW&–ÂÂ6öçF7BÂ÷6RÂ7F&–Æ—G’Â÷"÷F†W"‡—6–6Â7FFRârÀĞ¢&VÆFVC¢²w6Vç6÷"gW6–öârÂv×VÇF–ÖöFÂÆV&æ–ærrÂwF÷V6‚×f—6–öâÆ–væÖVçBuÒÀĞ¢‡&Vc¢r÷f—7Vò×F7F–ÆRrÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uf—7Vò×F7F–ÆRÖæ—VÆF–öârÀĞ¢FVf–æ—F–öã¢u&ö&÷BÖæ—VÆF–öâ–âv†–6‚&÷F‚f—7VÂ6öçFW‡BæBÖV7W&VBF÷V6‚–æfÇVVæ6R7F–öç27V6‚2&ö6‚Âw&77F&–Æ—¦F–öâÂ–ç6W'F–öâ6÷'&V7F–öâÂ÷"&V6÷fW'’ârÀĞ¢&VÆFVC¢²wF7F–ÆRÖæ—VÆF–öârÂwf—6–öâ×F÷V6‚gW6–öârÂw&ö&÷BöÆ–7’uÒÀĞ¢‡&Vc¢r÷f—7Vò×F7F–ÆRrÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uF7F–ÆR&W&W6VçFF–öâÆV&æ–ærrÀĞ¢FVf–æ—F–öã¢tÆV&æ–ær6ö×7BfVGW&W2g&öÒF7F–ÆRö'6W'fF–öç2f÷"F÷vç7G&VÒW&6WF–öâÂ&VF–7F–öâÂ&WG&–WfÂÂ÷"&ö&÷BÖ6öçG&öÂF6·2ârÀĞ¢&VÆFVC¢²wF7F–ÆRVæ6öFW"rÂw6VÆb×7WW'f—6VBÆV&æ–ærrÂv×VÇF–ÖöFÂÆ–væÖVçBuÒÀĞ¢‡&Vc¢r÷F7F–ÆRÖf÷VæFF–öâÖÖöFVÇ2rÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uF7F–ÆRf÷VæFF–öâÖöFVÂrÀĞ¢FVf–æ—F–öã¢t'&öFÇ’&WG&–æVBF7F–ÆR÷"×VÇF–ÖöFÂÖöFVÂ–çFVæFVBFòG&ç6fW"7&÷72×VÇF—ÆRF÷vç7G&VÒF6·2Â6Vç6÷'2Âö&¦V7G2Â÷"VÖ&öF–ÖVçG2Âv—F‚F†R6Æ–ÖVB'&VGF‚&WV—&–ærF—&V7BWf–FVæ6RârÀĞ¢&VÆFVC¢²wF7F–ÆR&W&W6VçFF–öârÂwG&ç6fW"ÆV&æ–ærrÂv×VÇF–ÖöFÂÖöFVÂuÒÀĞ¢‡&Vc¢r÷F7F–ÆRÖf÷VæFF–öâÖÖöFVÇ2rÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uF7F–ÆRv÷&ÆBÖöFVÂrÀĞ¢FVf–æ—F–öã¢tâ7F–öâÖ6öæF—F–öæVBÖöFVÂF†B&VF–7G2gWGW&RF7F–ÆR7FFRÂ6öçF7BÂf÷&6R×&VÆFVB6–væÇ2Â6Æ—Â–ÖvW2Â÷"ÆV&æVBF÷V6‚&W&W6VçFF–öç2ârÀĞ¢&VÆFVC¢²wv÷&ÆBÖöFVÂrÂwF7F–ÆR&VF–7F–öârÂw&ö&÷BÆææ–æruÒÀĞ¢‡&Vc¢röwV–FW2÷f—7Vò×F7F–ÆR×v÷&ÆBÖÖöFVÇ2×&ö&÷BÖÖæ—VÆF–öârÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uF7F–ÆRFF6WBrÀĞ¢FVf–æ—F–öã¢tfW'6–öæVB6öÆÆV7F–öâöbF7F–ÆRö'6W'fF–öç2æBÖWFFFÂ÷FVçF–ÆÇ’Æ–væVBv—F‚f—6–öâÂÆæwVvRÂf÷&6RÂ&ö&÷B7FFRÂ7F–öç2Âö&¦V7G2Â÷"F6·2ârÀĞ¢&VÆFVC¢²v6öçF7B6WVVæ6RrÂvFF7Æ—BrÂw&ö&÷BÆV&æ–æruÒÀĞ¢‡&Vc¢röFF6WG2rÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uF7F–ÆR&Væ6†Ö&²rÀĞ¢FVf–æ—F–öã¢t&W&öGV6–&ÆRWfÇVF–öâ6öçG&7BF†BFVf–æW2F7F–ÆR–çWG2ÂF6·2ÂFF7Æ—G2ÂÖWG&–72Â&6VÆ–æW2Â†&Gv&R6öæF—F–öç2ÂæBfW'6–öâârÀĞ¢&VÆFVC¢²vWfÇVF–öâ&÷Fö6öÂrÂwF6²7V66W72rÂvvVæW&Æ—¦F–öâuÒÀĞ¢‡&Vc¢rö&Væ6†Ö&·2rÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢uv†öÆRÖ&öG’F7F–ÆR6Vç6–ærrÀĞ¢FVf–æ—F–öã¢tF—7G&–'WFVB6öçF7B6Vç6–ær7&÷72Æ&vR&ö&÷B7W&f6W27V6‚2†æG2Â&×2ÂF÷'6òÂ÷"÷F†W"&öG’&Vv–öç2&F†W"F†â6–ævÆRf–ævW'F—÷"w&—W"BârÀĞ¢&VÆFVC¢²v‡VÖæö–B&ö&÷B6¶–ârÂw6fWG’6¶–ârÂvF—7G&–'WFVB6Vç6–æruÒÀĞ¢‡&Vc¢rö‡VÖæö–B×&ö&÷B×6¶–ârÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢u6ögBF7F–ÆR6Vç6÷"rÀĞ¢FVf–æ—F–öã¢tF7F–ÆR6Vç6÷"v—F‚6ö×Æ–çB÷"fÆW†–&ÆR–çFW&f6RF†B6â6öæf÷&ÒFò6öçF7BvVöÖWG'’v†–ÆRÖV7W&–ærFVf÷&ÖF–öâ÷"&VÆFVB‡—6–6Â6–væÇ2ârÀĞ¢&VÆFVC¢²vR×6¶–ârÂv6ö×Æ–çB6Vç6–ærrÂvfÆW†–&ÆR6Vç6÷"uÒÀĞ¢‡&Vc¢röÆ–6F–öç2÷6ögB×&ö&÷F–2×6¶–ârÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢u6†V"f÷&6RrÀĞ¢FVf–æ—F–öã¢tf÷&6R7F–ærFævVçF–ÆÇ’Æöær6öçF7B7W&f6S²–â&ö&÷F–2w&7–ær—B6â&÷f–FRWf–FVæ6R&÷WBÆöBÂ6Æ–F–ærÂæB–æ6—–VçB6Æ—ârÀĞ¢&VÆFVC¢²væ÷&ÖÂf÷&6RrÂw6Æ—FWFV7F–öârÂvw&77F&–Æ—G’uÒÀĞ¢‡&Vc¢röwV–FW2÷6Æ—ÖFWFV7F–öâ×&ö&÷BÖ†æBrÀĞ¢ÒÀĞ¢°Ğ¢FW&Ó¢t6öçF7B6WVVæ6RrÀĞ¢FVf–æ—F–öã¢uF†R÷&FW&VBF7F–ÆRö'6W'fF–öç2g&öÒöæR‡—6–6Â&W72Âw&7Â÷"6öçF–çV÷W26öçF7BWfVçBâ¶VW–ær6WVVæ6W2–çF7B†VÇ2&WfVçBæV"ÖGWÆ–6FRG&–â×FW7BÆV¶vRârÀĞ¢&VÆFVC¢²wF7F–ÆRFF6WBrÂvFFÆV¶vRrÂv†VÆBÖ÷WBWfÇVF–öâuÒÀĞ¢‡&Vc¢röFF6WG2rÀĞ¢ÒÀĞ¥Ó°Ğ Ğ¦W‡÷'B6öç7B66U7GVG•7VÖÖ&–W3¢66U7GVG•7VÖÖ'•µÒÒ°Ğ¢°Ğ¢F—FÆS¢u&ö&÷F–2w&—W"6FVv÷'’W‡Æ–æW"rÀĞ¢6öçFW‡C¢t&VFW"æVVFVB6öæ6—6Rv’FòVæFW'7FæB†÷rF7F–ÆR6Vç6–ærFW&×2V"–â&ö&÷F–2w&—W"æBÖæ—VÆF–öâF—67W76–öç2ârÀĞ¢&ö6ƒ¢uvR6öææV7FVBF†RF÷–2Fò&ö&÷B6¶–âFVf–æ—F–öç2Â6Æ—FWFV7F–öâÂ&W6V&6‚æ÷FW2ÂæB&VÆWfçBÆ–6F–öâ6öçFW‡BârÀĞ¢÷WF6öÖS¢t6ÆV&W"VGV6F–öæÂ&÷WFRf÷"VæFW'7FæF–ærF†R6FVv÷'’v—F†÷WB–æfW'&–ær&öGV7Bf–Æ&–Æ—G’ârÀĞ¢æ÷FS¢tæòV&Æ–2W&f÷&Öæ6RçVÖ&W'2Â7W7FöÖW"6Æ–×2Â÷"f–Æ&–Æ—G’6Æ–×2&R–×Æ–VBârÀĞ¢7FÆ&VÃ¢tW‡Æ÷&RÆ–6F–öç2rÀĞ¢‡&Vc¢röÆ–6F–öç2rÀĞ¢ÒÀĞ¢°Ğ¢F—FÆS¢t‡VÖæö–B&ö&÷B6¶–âFW&Ö–æöÆöw’&÷WFRrÀĞ¢6öçFW‡C¢t&W6V&6‚VF–Væ6RæVVFVB6öçFW‡Bf÷"6öçF7B6Vç6–ær7&÷72†æG2Â&×2ÂæB7W'fVB‡VÖæö–B7W&f6W2ârÀĞ¢&ö6ƒ¢uvRg&ÖVBF†RF÷–2F‡&÷Vv‚Æ–6F–öç2ÂF7F–ÆR’fö6'VÆ'’ÂæB6÷W&6RÖ&6¶VB&W6V&6‚&÷WFW2ârÀĞ¢÷WF6öÖS¢t6FVv÷'’&÷WFRF†B7W÷'G2&W6V&6‚F—66÷fW'’æBÖVF–W‡ÆæF–öâv—F†÷WB÷W&F–ærÖ6ö×ç’6Æ–×2ârÀĞ¢æ÷FS¢tÆ–6F–öâ×7V6–f–2fV6–&–Æ—G’6†÷VÆB&R7W÷'FVB'’W‡Æ–6—BW‡FW&æÂ6÷W&6W2Âæ÷B–æfW'&VBg&öÒF†—26—FRârÀĞ¢7FÆ&VÃ¢tW‡Æ÷&R&W6V&6‚rÀĞ¢‡&Vc¢r÷&W6V&6‚rÀĞ¢ÒÀĞ¢°Ğ¢F—FÆS¢u6÷W&6RÖ&6¶VB6FVv÷'’6†V6¶Æ—7BrÀĞ¢6öçFW‡C¢t&VFW"æVVFVBFò6W&FRW6VgVÂF7F–ÆR’FW&Ö–æöÆöw’g&öÒVç7W÷'FVBÖ&¶WF–ær6Æ–×2ârÀĞ¢&ö6ƒ¢uvR7VÖÖ&—¦VBVF–Væ6Rf—BÂ6FVv÷'’&VÆWfæ6RÂ6÷W&6R6öçFW‡BÂæB÷76–&ÆR6öçFVçB&÷WFW2ârÀĞ¢÷WF6öÖS¢t6ÆV&W"&W6V&6‚F‚f÷"6÷W&6RÖ&6¶VB6FVv÷'’Ö6öçFVçBÆææ–ærârÀĞ¢æ÷FS¢uF†R6†V6¶Æ—7BFW67&–&W2–æf÷&ÖF–öâ&÷WFW2Âæ÷B6öÖÖW&6–Â&öGV7B&öFÖârÀĞ¢7FÆ&VÃ¢u6VæB&W6V&6‚æ÷FRrÀĞ¢‡&Vc¢rö6öçF7C÷&WVW7EG—S×&W6V&6‚rÀĞ¢ÒÀĞ¥Ó°Ğ Ğ¦W‡÷'B6öç7BæWw4—FV×3¢æWw4—FVÕµÒÒ°Ğ¢°Ğ¢FFS¢s##bÓBÓrÀĞ¢F—FÆS¢u&W6V&6‚ÖW‡ç6–öârÀĞ¢7VÖÖ'“¢uvRW‡æFVBF†RV&Æ–26—FRv—F‚wV–FR×&÷WFRÂ6FVv÷'’×&öFÖÂæB&VfW&Væ6RÖÆ–'&'’vW2ârÀĞ¢‡&Vc¢röwV–FW2÷F7F–ÆR×6Vç6÷"Ö&Væ6†Ö&²×&ö&÷BÖÖæ—VÆF–öârÀĞ¢7FÆ&VÃ¢t6ö×&RF7F–ÆR6Vç6÷'2rÀĞ¢ÒÀĞ¢°Ğ¢FFS¢s##bÓBÓ’rÀĞ¢F—FÆS¢u&W6÷W&6W2WFFVBf÷"6FVv÷'’wV–Fæ6RrÀĞ¢7VÖÖ'“¢u&W6÷W&6RÆ—7F–æw2æ÷rV×†6—¦RV&Æ–2&W6V&6‚&÷WFW2ÂvÆ÷76'’FVf–æ—F–öç2ÂæB6÷W&6R6öçFW‡B–ç7FVBöbVç7W÷'FVB76WG2ârÀĞ¢‡&Vc¢r÷&W6÷W&6W2rÀĞ¢7FÆ&VÃ¢uf–Wr&W6÷W&6W2rÀĞ¢ÒÀĞ¢°Ğ¢FFS¢s##bÓBÓ‚rÀĞ¢F—FÆS¢u&W6V&6‚Öf—'7B6öçF7BwV–Fæ6RrÀĞ¢7VÖÖ'“¢uF†R6öçF7BvRV×†6—¦W26÷W&6R6÷'&V7F–öç2Â6öÆÆ&÷&F–öâÂæB&W6V&6‚Öæ÷FR–çV—&–W2ârÀĞ¢‡&Vc¢rö6öçF7BrÀĞ¢7FÆ&VÃ¢t6öçF7BrÀĞ¢ÒÀĞ¥Ó°Ğ 