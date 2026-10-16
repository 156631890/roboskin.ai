import type { SeoTopicPage } from '@/content/seo-topic-pages';

export const practicalSensingSources = {
  tsfProduct: { label: 'Robotiq: TSF-85 product information', href: 'https://robotiq.com/tactile-sensor-fingertips' },
  tsfGuide: { label: 'Robotiq: TSF-85 user guide, compatibility and sensing specifications', href: 'https://robotiq.com/hubfs/Tactile%20Sensor%20Fingertips/Tactile%20Sensors%20TSF-85%20-%20User%20Guide.pdf' },
  tsfDesign: { label: 'Robotiq: TSF-85 capacitive sensing design', href: 'https://blog.robotiq.com/how-robotiq-built-the-tsf-85-tactile-sensor-to-the-spec-of-the-human-hand' },
  tsfSdk: { label: 'Robotiq tactile_sensors: reviewed revision 172a7c8 (October 14, 2026)', href: 'https://github.com/robotiq/tactile_sensors/tree/172a7c8bf1e419bb9d653a94d19d866e480acebd' },
  forceComparison: { label: 'Robotiq comparison: published September 2014, updated December 2024', href: 'https://blog.robotiq.com/bid/72572/tactile-sensor-and-force-torque-sensor-what-s-the-difference' },
  forceAxes: { label: 'Robotiq: force and torque measurement axes', href: 'https://blog.robotiq.com/bid/72422/robot-force-torque-sensor-an-introduction' },
  enlight: { label: 'Flexiv: Enlight joint sensing at IROS, September 17, 2026', href: 'https://flexiv.com/news/Flexiv_IROS%202026' },
  touchTherm: { label: 'TouchTherm: arXiv 2610.01943v2, October 2, 2026', href: 'https://arxiv.org/abs/2610.01943v2' },
  roboTac: { label: 'Feng et al.: RoboTac, ACS Nano (2026), full paper', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13472318/' },
  f3t: { label: 'Yang et al.: F3T force and temperature decoupling preprint (2024)', href: 'https://arxiv.org/abs/2409.03421' },
  snu: { label: 'Kim et al.: interleaving memristive nanowires, Nature Materials', href: 'https://www.nature.com/articles/s41563-025-02373-w' },
  digitCost: { label: 'DIGIT paper (2020): Table I and batch manufacturing estimate', href: 'https://arxiv.org/pdf/2005.14679#page=2' },
  reskinCost: { label: 'Meta AI: ReSkin production-cost report (2021)', href: 'https://ai.meta.com/blog/reskin-a-versatile-replaceable-low-cost-skin-for-ai-research-on-tactile-perception/' },
  miniLaunch: { label: 'GelSight Mini: manufacturer launch announcement (2022)', href: 'https://www.gelsight.com/introducing-the-gelsight-mini-a-human-resolution-tactile-sensor-for-engineers-and-scientists/' },
  miniStore: { label: 'GelSight Mini: current manufacturer product page', href: 'https://www.gelsight.com/product/gelsight-mini-system/' },
  tacTipBuild: { label: 'TacTip: fabrication instructions and component stages', href: 'https://softroboticstoolkit.com/tactip/fabrication' },
};

export const thermalSensingSection: SeoTopicPage['sections'][number] = {
  id: 'temperature-and-thermal-sensing',
  heading: 'Temperature and Thermal Sensing',
  body: [
    'Thermal tactile sensing adds temperature or heat-transfer information to contact measurements. A pressure map says where a surface is loaded; thermal observations describe another part of the interaction. Temperature sensing in robot skin must distinguish a physical sensor reading from a reconstructed or simulated thermal field.',
  ],
  subsections: [
    {
      heading: 'Why robots need thermal touch',
      body: [
        'Thermal and mechanical cues can help distinguish contacted objects. The SNU-led study below combines both modalities for object recognition. For a robot builder, temperature could also inform a stop, release or grasp adjustment when handling a hot object. Those are application possibilities, not safety functions validated by the cited recognition experiment.',
        'Define the decision before adding the sensor: identify a material, detect a temperature limit, or adapt contact duration. Evaluate that decision with the intended objects and conditions; a temperature channel alone does not establish a safe grasp.',
      ],
      links: [practicalSensingSources.snu],
    },
    {
      heading: 'Key approaches and examples',
      body: [
        'TouchTherm is a digital-twin construction framework, not a commercial temperature-sensing skin. Its October 2026 preprint combines visual geometry, micro-height fields for optical tactile rendering and dynamic thermal reconstruction from infrared observations of cooling. On 20 objects, the authors report held-out surface-temperature MAE of 0.465 °C at 30 s and 0.592 °C at 45 s. These are reconstruction results at the stated horizons, not sensor resolution, contact-temperature accuracy or a robot control rate.',
        'RoboTac, reported by Feng and colleagues in ACS Nano in 2026, is a soft ionic skin designed to separate force and temperature responses. It uses capacitance for force and resistance for temperature. This is a physical sensing study; it should not be grouped with TouchTherm as another digital-twin method.',
        'F3T is a multilayer soft tactile unit described in a 2024 preprint. Its capacitive structure separates normal and tangential force, while an ion-gel temperature layer helps compensate temperature-induced changes. The claimed decoupling belongs to that device and method, not to every multimodal skin.',
        'The SNU-led Nature Materials study uses a memristive nanowire network that switches between thermal and mechanical sensing at 16 Hz. It reports 83% recognition accuracy across 20 household objects with a fingertip-mounted sensor. The publisher lists online publication on October 24, 2025 and the 2026 journal volume. Switching rate and the intrinsic response time of either mode are different quantities.',
      ],
      links: [practicalSensingSources.touchTherm, practicalSensingSources.roboTac, practicalSensingSources.f3t, practicalSensingSources.snu],
    },
    {
      heading: 'Challenges: calibration, thermal drift and response time',
      body: [
        'Force and temperature can affect the same electrical response, which is why F3T and RoboTac explicitly address separation of the two signals. Test the temperature channel while varying contact load, then test force readings across the intended temperature range.',
        'For an integration evaluation, record ambient and initial object temperature, contact duration, mounting, baseline drift and the time from contact to a usable estimate. Repeat after remounting or replacing the skin. Treat this as a proposed evaluation checklist; RoboSkin.ai has not bench-tested these devices.',
      ],
      links: [practicalSensingSources.f3t, practicalSensingSources.roboTac],
    },
  ],
  links: [
    { label: 'Compare sensing principles and force-torque measurements', href: '/technology#tactile-vs-force-torque' },
    { label: 'Read the existing TouchTherm research news brief', href: '/news/touchtherm-tactile-thermal-digital-twins' },
    { label: 'Check modality requirements for tactile foundation models', href: '/tactile-foundation-models' },
  ],
};

export const thermalSensingFaqs: SeoTopicPage['faqs'] = [
  { question: 'What is thermal tactile sensing?', answer: 'It combines touch with temperature or heat-transfer observations. The measured thermal signal and any inferred material or contact state should be identified separately.', sources: [practicalSensingSources.f3t] },
  { question: 'Why do robot skins need temperature sensing?', answer: 'Temperature adds information that a mechanical contact signal does not provide. It can support material recognition or temperature-aware behavior, but a complete safety or control function still needs application-specific validation.', sources: [practicalSensingSources.snu] },
  { question: 'What is TouchTherm?', answer: 'It is an October 2026 preprint about constructing visual, tactile and thermal object assets for simulation and rendering. Its temperature errors measure reconstructed surface fields, not the accuracy of a physical robot-skin sensor.', sources: [practicalSensingSources.touchTherm] },
  { question: 'Which thermal tactile sensors exist in 2026?', answer: 'Published research examples include RoboTac, F3T and the SNU-led memristive nanowire receptor. Their designs and evidence differ; publication does not establish commercial availability. TouchTherm belongs to simulation assets rather than this hardware list.', sources: [practicalSensingSources.roboTac, practicalSensingSources.f3t, practicalSensingSources.snu] },
];

export const tactileSensorCostSection: SeoTopicPage['sections'][number] = {
  id: 'tactile-sensor-cost',
  heading: 'How Much Do Tactile Sensors Cost?',
  body: [
    'There is no single comparable tactile-sensor price range. Published examples span low-cost research fabrication and commercial sensor systems, but the quoted amounts buy different things. The table keeps the date, quantity assumption and cost category attached to each figure. Sources were reviewed on October 16, 2026; historical figures are not current offers.',
  ],
  table: {
    headers: ['Example', 'Publicly reported amount (USD)', 'Date and scope', 'How to use the figure'],
    rows: [
      ['ReSkin research production', 'Less than $6 each at 100 units', 'Meta AI research announcement, 2021', 'Production-cost report; not a quote for an integrated robot system.'],
      ['Original DIGIT research design', 'About $15 per sensor at 1,000 units', '2020 paper, component / manufacturing estimate', 'Batch assumption matters; not the retail cost of a one-off DIY build.'],
      ['GelSight Mini commercial launch', '$499', 'Manufacturer launch announcement, 2022', 'Historical product price. Confirm the current configuration and quote before budgeting.'],
      ['Robotiq TSF-85 commercial fingertips', 'Not publicly disclosed on the reviewed product page', 'Manufacturer page reviewed October 16, 2026', 'Request a quote with fingertip quantity, connectivity hardware and gripper revision.'],
      ['TacTip DIY variants', 'No single kit price established by the reviewed fabrication guide', 'Variant-dependent fabrication workflow', 'Price the selected camera, printed parts, skin, lighting and assembly separately.'],
    ],
  },
  subsections: [
    {
      heading: 'Price tiers: DIY and research builds versus commercial products',
      body: [
        'Use the research figures as manufacturing context. A DIY budget needs a dated bill of materials, tooling, failed builds and assembly time. A commercial budget needs a supplier quote that states the sensor revision, included readout hardware, software, replacement parts, shipping and taxes. These categories cannot be combined into a market-wide minimum and maximum.',
      ],
      links: [practicalSensingSources.reskinCost, practicalSensingSources.digitCost, practicalSensingSources.miniLaunch, practicalSensingSources.miniStore, practicalSensingSources.tsfProduct, practicalSensingSources.tacTipBuild],
    },
    {
      heading: 'What drives the total cost?',
      body: [
        'Compare the work required by taxel density, sensing modalities, coverage, readout bandwidth, calibration and SDK support. More channels do not imply a fixed price premium. Ask which outputs and support are included, then budget mounting, data synchronization, reference measurements and replacement surfaces for your task.',
        'A useful planning equation is: hardware and spares + mounting and acquisition + calibration and software integration + maintenance. Fill it with actual quotes and estimated engineering hours; this guide does not invent a universal integration allowance.',
      ],
    },
    {
      heading: 'Cost comparison with force-torque sensors',
      body: [
        'Compare complete measurement functions. A wrist force-torque sensor and fingertip contact sensing expose different information, so the cheaper unit may not answer the task question. Define the required signal and coverage first, then compare two itemized integration plans. No current force-torque price is asserted here.',
      ],
      links: [practicalSensingSources.forceComparison],
    },
  ],
  links: [
    { label: 'Tactile sensors vs force-torque sensors: selection guidance', href: '/technology#tactile-vs-force-torque' },
    { label: 'Robotiq TSF-85 specifications, SDK and limitations', href: '/sensors/robotiq-tsf-85' },
    { label: 'Original DIGIT evidence and build resources', href: '/sensors/digit' },
  ],
};

export const tactileSensorCostFaqs: SeoTopicPage['faqs'] = [
  { question: 'How much does a tactile sensor cost?', answer: 'Reported examples include about $15 for original DIGIT at a 1,000-unit manufacturing scale and a $499 GelSight Mini launch price in 2022. These are different cost categories and historical figures, not a current retail range. Obtain a dated quote for the exact configuration.', sources: [practicalSensingSources.digitCost, practicalSensingSources.miniLaunch] },
  { question: 'Why are tactile sensors expensive?', answer: 'The useful comparison is total installed cost: the sensing surface, readout, mounting, calibration, software work, support and replacements. Ask for an itemized quote rather than assuming that taxel count alone determines price.' },
  { question: 'Are there affordable DIY tactile sensor options?', answer: 'TacTip fabrication instructions and original DIGIT design resources provide research build routes. Price the chosen variant and check its reuse terms. A batch manufacturing estimate does not establish what a one-off build will cost.', sources: [practicalSensingSources.tacTipBuild, practicalSensingSources.digitCost] },
  { question: 'What should a buyer budget for integration?', answer: 'Budget hardware and spares, mounting, acquisition, calibration references, engineering time and maintenance. Use project-specific quotes and hours. There is no verified universal percentage or fixed integration fee in the sources reviewed here.' },
];
