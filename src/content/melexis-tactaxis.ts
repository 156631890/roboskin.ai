import type { SeoTopicPage } from '@/content/seo-topic-pages';

const launch = {
  label: 'Melexis, February 8, 2022: Tactaxis prototype announcement',
  href: 'https://www.melexis.com/en/news/2022/8feb2022-melexis-gives-robots-a-sense-of-touch',
};
const guide = {
  label: 'Melexis Robotics e-guide, April 2025: Tactaxis (pp. 8–9) and Triaxis Hall technology (p. 12)',
  href: 'https://www.melexis.com/-/media/files/documents/info/robotic-e-guide.pdf#page=9',
};
const modules = {
  label: 'Melexis, April 21, 2026: Tactaxis modules and OYMotion collaboration',
  href: 'https://www.melexis.com/en/news/2026/21apr2026-melexis-and-oymotion-elevate-tactile-sensing-for-next-generation-robotic-hands',
};

export const melexisTactaxis: SeoTopicPage = {
  path: '/sensors/melexis-tactaxis',
  title: 'Melexis Tactaxis: 3D Force Sensing Explained',
  description: 'Understand Melexis Tactaxis magnetic tactile sensing, dated specifications, prototype versus fingertip modules, integration limits and availability evidence.',
  h1: 'Melexis Tactaxis: magnetic 3D force sensing explained',
  kicker: 'Sensor evidence / Magnetic force sensing',
  intent: 'Help engineers interpret official Tactaxis specifications without mixing prototype results, later taxels and module announcements.',
  published: '2026-10-17',
  updated: '2026-10-17',
  priority: 0.75,
  changeFrequency: 'monthly',
  schemaType: 'TechArticle',
  visualKey: 'technology',
  keywords: ['Melexis Tactaxis sensor explained', 'Tactaxis 3D force sensor', 'magnetic tactile sensor', 'Triaxis tactile sensing'],
  quickAnswer: [
    'Tactaxis is Melexis magnetic tactile-sensing technology. A magnet embedded in a compliant elastomer moves relative to a Triaxis 3D magnetic sensing IC as contact loads the surface. The system relates that magnetic change to a three-axis contact-force signal.',
    'Keep the versions separate. The 2022 launch describes a prototype; the April 2025 e-guide publishes later taxel specifications; the April 2026 update describes fingertip-module industrialization with OYMotion. RoboSkin reviewed these documents, not a physical sensor.',
  ],
  sections: [
    {
      heading: 'Specifications with Their Source and Scope',
      body: ['The table preserves the values and dates in Melexis publications. These are manufacturer statements, not an independent characterization or a substitute for the datasheet of an orderable module.'],
      table: {
        headers: ['Property', 'Published value', 'Document and boundary'],
        rows: [
          ['Normal / shear force', 'Up to 5 N / 2 N', 'April 2025 e-guide, p. 8'],
          ['Force resolution', '30 mN', 'April 2025 e-guide; not accuracy'],
          ['Extended force range', 'Up to 15 N, with reduced accuracy', 'April 2025 e-guide, p. 9; not the nominal precision range'],
          ['Taxel dimensions', '6 × 6 × 4.4 mm', 'April 2025 e-guide; not fingertip-module dimensions'],
          ['Operating temperature', '−20 to +85 °C', 'April 2025 e-guide'],
          ['Earlier prototype', '5 × 5 × 5 mm; 2.7 mN resolution', 'February 2022 announcement only'],
          ['Module interface, rate and ordering code', 'Unavailable in the cited publications', 'Confirm with Melexis for the specific module'],
          ['Unit price and stock', 'Unavailable in the cited publications', 'No current quotation established'],
        ],
      },
      links: [guide, launch, modules],
    },
    {
      heading: 'Sensing Principle: Magnetic Displacement to Force',
      body: [
        'The elastomer provides a compliant contact interface. Its embedded magnet changes position under load, and the Triaxis Hall-effect sensing elements detect the resulting field changes. A calibrated relationship converts the magnetic observation to force; measuring three magnetic axes alone is not a force calibration.',
        'Melexis describes a gradiometric arrangement intended to reject stray magnetic fields. Treat that as a design property reported by the manufacturer, not evidence of immunity to every magnet, motor or installation condition. Ask for the applicable interference test and mounting constraints.',
      ],
      links: [launch, guide],
      contextLinks: [
        { before: 'For a separate magnetic design and its calibration boundaries, read the ', label: 'ReSkin sensor profile', href: '/sensors/reskin', after: '.' },
      ],
    },
    {
      heading: 'Variants and Modules: A Development Timeline',
      body: [
        'The February 2022 release is explicitly a working prototype. Its 2.7 mN figure must not be combined with the later e-guide dimensions to create a single specification for a purchasable part.',
        'On April 21, 2026, Melexis announced work with OYMotion and described Tactaxis-based fingertip modules moving into industrialization. This is newer availability context than the prototype announcement, but it does not provide a complete catalogue of module variants, public part numbers or shipment commitments.',
      ],
      links: [launch, modules],
    },
    {
      heading: 'Typical Applications and Selection Guidance',
      body: [
        'Melexis identifies robotic grasping, delicate-object handling and force feedback as applications. Its 2025 guide also discusses arrays for multi-finger hands, prosthetic devices and exoskeletons. These are proposed integration settings, not certification of any finished robot.',
        'Engineering interpretation: shortlist Tactaxis when a local normal-and-shear signal is the requirement. If the task instead requires a detailed contact image or a large pressure map, compare complete optical or capacitive implementations and the processing each output needs. A force-resolution value cannot be ranked directly against camera pixels or taxel density.',
      ],
      links: [launch, guide, modules],
    },
    {
      heading: 'Strengths, Limitations and Questions for Integration',
      body: [
        'The documented concept combines a soft contact surface with a magnetic readout, and the later module programme targets easier integration into robot hands. These are useful design directions; the reviewed material does not establish an installation-ready electrical and mechanical contract for every application.',
        'Before designing around a module, request its pinout and protocol, calibrated axes and coordinate frame, bandwidth and latency, cross-axis error, overload limits, lifetime evidence and replacement instructions. These are procurement questions, not claims that the product lacks those capabilities.',
        'The specification publications are not an independent optical-versus-capacitive-versus-magnetic benchmark. Compare candidates under the same forces, contact geometry, environment and task criteria.',
      ],
      links: [modules],
    },
    {
      heading: 'Pricing and Availability',
      body: [
        'The cited Melexis documents do not establish a public unit price, live inventory or lead time for a named Tactaxis module. Use the manufacturer inquiry route to obtain an orderable configuration and its current datasheet. The April 2026 industrialization announcement should not be rewritten as an in-stock retail offer.',
      ],
      links: [modules],
    },
  ],
  faqs: [
    { question: 'Is Tactaxis an optical tactile sensor?', answer: 'No. Melexis describes an elastomer-embedded magnet and Triaxis magnetic sensing. It does not use a camera to image the contact surface.' },
    { question: 'Why do Tactaxis sources report both 2.7 mN and 30 mN?', answer: 'The 2.7 mN value belongs to the February 2022 prototype announcement. The April 2025 e-guide reports 30 mN. Preserve the document date and hardware scope instead of combining the figures.' },
    { question: 'Is the 15 N figure the normal operating precision range?', answer: 'The April 2025 e-guide describes it as an extended range with reduced accuracy. It separately lists normal forces up to 5 N and shear forces up to 2 N.' },
    { question: 'Can I buy a Tactaxis fingertip module immediately?', answer: 'The April 2026 announcement describes module industrialization and OYMotion collaboration. The reviewed publications do not establish stock or delivery for an orderable part; obtain those details from Melexis.' },
  ],
  relatedLinks: [
    { label: 'Tactile sensor directory', href: '/sensors', description: 'Compare outputs, integration requirements and evidence across named sensors.' },
    { label: 'Optical vs capacitive tactile sensors', href: '/guides/optical-vs-capacitive-tactile-sensors', description: 'Compare alternative transducers by application and measurement needs.' },
    { label: 'Tactile sensing technology', href: '/technology', description: 'Understand how the sensing principle connects to a calibrated robot signal.' },
  ],
  sources: [launch, guide, modules],
};
