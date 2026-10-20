import type { SeoTopicPage } from '@/content/seo-topic-pages';

const kit = { label: 'Loomia Smart Skin developer kit: product and specification table, checked October 20, 2026', href: 'https://www.loomia.com/samples/p/tactile-sensing-developer-kit' };
const guide = { label: 'Loomia developer kit user guide, V.01, July 2025', href: 'https://www.loomia.com/s/20250617_Tactile_Dev_Kit.pdf' };
const lel = { label: 'Loomia: Electronic Layer technology', href: 'https://www.loomia.com/' };
const fsr = { label: 'Loomia: custom flexible pressure sensors', href: 'https://www.loomia.com/flexible-fsr' };
const acquisition = { label: 'Loomia acquisition agreement update, October 13, 2026', href: 'https://www.loomia.com/blog/unichem-completes-signatures-with-key-parties-for-the-acquisition-of-us-based-loomia-full-scale-commercialization-of-robotic-e-skin' };
const strategy = { label: 'Loomia: Unichem acquisition and R&Y development plans', href: 'https://www.loomia.com/blog/unichem-acquires-us-deep-tech-company-loomia-and-through-strategic-rampy-alliance-accelerates-entry-into-the-humanoid-robot-electronic-skin-market-nbsp' };
const digit = { label: 'Original DIGIT sensor paper', href: 'https://arxiv.org/abs/2005.14679' };

export const loomiaSmartSkin: SeoTopicPage = {
  path: '/sensors/loomia-smart-skin',
  title: 'Loomia Smart Skin: Specs, Developer Kit & Limits',
  description: 'Review Loomia Smart Skin sensing, kit specifications, integration limits and the pending Unichem acquisition. Based on documents, not a bench test.',
  h1: 'Loomia Smart Skin, Explained',
  kicker: 'Sensor evidence / Soft electronic layers',
  intent: 'Help robot builders review Loomia Smart Skin and its developer kit using published specifications and clearly dated acquisition information.',
  published: '2026-10-20',
  updated: '2026-10-20',
  priority: 0.75,
  changeFrequency: 'monthly',
  schemaType: 'TechArticle',
  visualKey: 'technology',
  keywords: ['Loomia smart skin explained', 'Loomia tactile sensing developer kit review', 'Loomia Electronic Layer', 'flexible robotic skin', 'e-textile tactile sensing'],
  quickAnswer: [
    'Loomia Smart Skin applies soft electronics to robot contact sensing. The underlying Loomia Electronic Layer (LEL) is a flexible circuit platform that can integrate with textiles and other surfaces. E-textile describes the integration context, not a single measurement principle.',
    'This profile reviews manufacturer documents, not hardware tested by RoboSkin.ai. Published specifications and acquisition plans have different evidence boundaries; neither establishes performance on your robot.',
  ],
  sections: [
    {
      heading: 'Sensing principle: e-textiles and flexible circuits',
      body: [
        'The LEL platform supports sensing and other electronic functions in a thin, conformable structure. A custom pressure layer can be shaped and connected for the intended surface. Do not assume that every LEL component measures touch, temperature and shear simultaneously.',
        'The kit offers capacitive and force-sensitive resistor (FSR) components. Compression changes the electrical response of the active structure: capacitance in one design, resistance in the other. Electronics read that response; calibration is still needed to interpret a value as applied load.',
      ],
      links: [lel, fsr, guide],
    },
    {
      heading: 'Form factors and developer kit',
      body: [
        'The documented kit includes a three-finger glove, individual sensors, small and large pressure matrices, adhesive and non-adhesive versions, a static-weight jig and an Arduino. Arduino/Python scripts and a visualization tool support initial acquisition. The July 2025 guide describes four capacitive sensing points per glove fingertip.',
        'The product listing showed US$9,800 and Sold Out when checked on October 20, 2026, with preorders closed. This is a dated listing, not a quotation or delivery promise. Confirm the current revision, contents and availability directly with Loomia.',
      ],
      links: [guide, kit],
    },
    {
      heading: 'Specs: published figures and unresolved fields',
      body: ['These are manufacturer-listed values, not independent measurements. Feature size is not calibrated spatial resolution; data rate is not closed-loop robot bandwidth.'],
      table: {
        headers: ['Property', 'Capacitive', 'Resistive / FSR'],
        rows: [
          ['Minimum force', '0.01 N', '0.1 N'],
          ['Upper force entry', '1.0 N', 'Evaluated at 5 N; not a certified maximum'],
          ['Minimum feature size', '2.5 mm', '2.5 mm'],
          ['Thickness', '1 mm', '0.5 mm'],
          ['Listed data rate', '100 Hz', '10 Hz'],
          ['Operating temperature', 'Unconfirmed; listed as forthcoming', 'Unconfirmed; listed as forthcoming'],
          ['Certified IP rating', 'Unconfirmed', 'Unconfirmed'],
        ],
      },
      links: [kit],
    },
    {
      heading: 'Integration notes: from a bench trace to a robot',
      body: [
        'The user guide cautions against repeated flexing of FSR components, piercing or sewing through sensors, and removing and reapplying adhesive parts. Its serial readout and pressure visualization are acquisition tools, not a validated grasp controller.',
        'RoboSkin evaluation recommendation: record unloaded baselines, repeat known loads before and after mounting, then log sensor and robot timestamps together. Test curvature, cable movement and repeated contact on the intended surface. Keep raw readings, fitted force estimates and inferred slip labels separate so failures can be traced to their source.',
      ],
      links: [guide],
    },
    {
      heading: 'The Unichem acquisition: what changed in October 2026',
      body: [
        'Loomia’s October 13 update says Unichem signed a definitive agreement with key parties on October 12 to acquire all Loomia shares. Remaining shareholder signatures and regulatory acceptance were still conditions. The stated target close is January 4, 2027. As of this review, an agreement is established; completed ownership transfer is not.',
        'The disclosed earn-out ties performance compensation to annual production-order targets of 1,000 robots and 3,000 vehicles before December 30, 2028. Those are contractual targets, not orders already secured. The stated commercial direction combines flexible electronics with materials manufacturing for robotic hands, grippers, body coverings and vehicle interiors.',
        'The earlier Unichem/R&Y announcement identifies North American robotics and AI companies as prospective targets. Named companies must not be presented as confirmed customers. For buyers, the practical questions remain the exact orderable sensor, qualification data, support responsibility and a written delivery commitment.',
      ],
      links: [acquisition, strategy],
    },
    {
      heading: 'Strengths and limitations vs. optical and capacitive skins',
      body: [
        'The useful selection distinction is conformable electrical sensing versus an optical fingertip that images a deforming surface. Original DIGIT uses a camera and elastomer; its images can support geometry-related inference after processing. A pressure reading and a tactile image are different observations, so pixel counts and electrical feature sizes are not interchangeable performance scores.',
        'Loomia itself includes capacitive sensing, so “Loomia versus capacitive skin” is not a clean category comparison. Its product table describes the capacitive design as not yet matrixable and the resistive design as better suited to matrices but sensitive to high curvature. Treat these as revision-specific constraints.',
        'RoboSkin selection recommendation: compare the required contact area, curvature, maintainability, force calibration and signal latency on the same task. No matched Loomia-versus-DIGIT or GelSight bench test is presented here, and the documents reviewed do not establish a calibrated three-axis force output for every kit component.',
      ],
      links: [kit, digit],
    },
  ],
  faqs: [
    { question: 'What is Loomia smart skin?', answer: 'It is Loomia’s soft-electronics approach to adding contact sensing to surfaces. The broader Electronic Layer platform also supports non-sensing functions, so check the specific component.', sources: [lel] },
    { question: 'How does e-textile tactile sensing work?', answer: 'A compliant sensing structure turns contact into an electrical change. The readout, mounting and calibration determine what can be inferred; a textile-compatible circuit is not automatically a calibrated force sensor.', sources: [guide, fsr] },
    { question: 'Is there a Loomia developer kit?', answer: 'Yes. The official kit and user guide are documented above. Check the dated listing and ask Loomia for current ordering terms.', sources: [kit, guide] },
    { question: 'What does the Unichem acquisition mean for buyers?', answer: 'It describes a planned route toward manufacturing scale. The October update still lists closing conditions; it does not guarantee stock, qualification or a delivery date for a particular sensor.', sources: [acquisition] },
    { question: 'How does Loomia compare to GelSight or DIGIT?', answer: 'Compare the physical output needed for your task: electrical contact readings or camera-based deformation images. Integration effort and calibration matter alongside sensing area. This is a documentary comparison, not a measured ranking.', sources: [guide, digit] },
  ],
  relatedLinks: [
    { label: 'Original DIGIT sensor profile', href: '/sensors/digit', description: 'Compare an optical fingertip, image output and calibration needs.' },
    { label: 'Electronic skin technology', href: '/e-skin', description: 'Place flexible sensing inside the wider e-skin design space.' },
    { label: 'Humanoid robot skin', href: '/humanoid-robot-skin', description: 'Connect local sensing to body coverage and integration constraints.' },
  ],
  sources: [kit, guide, lel, fsr, acquisition, strategy, digit],
};
