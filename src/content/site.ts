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
      { href: '/solutions', label: 'Solutions' },
      { href: '/technology', label: 'Technology' },
      { href: '/resources', label: 'Resources' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
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

export const technologyLayers = [
  {
    title: 'Sensing layer',
    summary: 'Flexible tactile elements capture contact, pressure, and interaction events.',
  },
  {
    title: 'Signal and processing layer',
    summary: 'Local processing turns raw sensor output into cleaner robot-ready data.',
  },
  {
    title: 'Materials and form factor layer',
    summary: 'Mechanical design supports curved surfaces and application-driven layouts.',
  },
  {
    title: 'Integration layer',
    summary: 'The platform is organized around robotics workflows and engineering support.',
  },
];

export const resourceSections = [
  {
    title: 'Datasheets',
    items: [
      { title: 'RS-1000 Sensor Array', description: 'Request the current datasheet for the sensor array.', availability: 'Request only' },
      { title: 'Developer Kit', description: 'Ask for the latest hardware overview and integration notes.', availability: 'Request only' },
    ],
  },
  {
    title: 'Integration docs',
    items: [
      { title: 'Getting started guide', description: 'Request onboarding instructions for pilot projects.', availability: 'Request only' },
      { title: 'ROS / ROS2 support', description: 'Confirm compatibility details with engineering.', availability: 'Verified on request' },
    ],
  },
  {
    title: 'SDK access',
    items: [
      { title: 'Python SDK', description: 'Request access for evaluation and integration work.', availability: 'Request only' },
      { title: 'C++ SDK', description: 'Ask for the current tooling and example bundles.', availability: 'Request only' },
    ],
  },
  {
    title: 'Technical briefs',
    items: [
      { title: 'Materials overview', description: 'Summary of the tactile stack and integration approach.', availability: 'Request only' },
      { title: 'Benchmark methodology', description: 'Request the note that explains how measurements are taken.', availability: 'Request only' },
    ],
  },
];
