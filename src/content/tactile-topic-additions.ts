import type { SeoTopicPage } from '@/content/seo-topic-pages';

type Section = SeoTopicPage['sections'][number] & { id: string };

export const tactileSources = {
  lattice: { label: 'Bang et al.: magnetic lattice skin preprint (May 2026)', href: 'https://arxiv.org/abs/2605.28352' },
  mistac: { label: 'MISTac original preprint (August 14, 2026)', href: 'https://arxiv.org/abs/2608.14772' },
  hall: { label: 'Hall-effect surgical force sensor preprint (October 7, 2026)', href: 'https://arxiv.org/abs/2610.10346' },
  eluminator: { label: 'Wu et al.: luminescent e-skin, Nature Communications (May 26, 2026)', href: 'https://www.nature.com/articles/s41467-026-73073-5' },
  tutorial: { label: 'ICRA 2026 tutorial: author-maintained hardware and ROS 2 repository', href: 'https://github.com/MilanAmighi/Hands-on-tutorial-on-3D-tactile-sensor-integration-in-robotic-fingers' },
};

export const technologyAdditions: Section[] = [
  {
    id: 'tactile-sensor-mechanisms', heading: 'Six tactile sensor mechanisms: what changes at contact?',
    body: ['Transduction describes how contact becomes a signal. It does not establish the accuracy or suitability of a finished sensor. The table summarizes physical readouts; the final column gives questions to test on your own candidate.'],
    table: { headers: ['Mechanism', 'Physical readout', 'Check on the candidate'], rows: [
      ['Piezoresistive', 'Deformation changes resistance.', 'Loading history, drift and repeatability.'],
      ['Capacitive', 'Contact changes capacitance through geometry or material response.', 'Parasitic signals, crosstalk and mounting effects.'],
      ['Piezoelectric', 'Mechanical loading generates electrical charge.', 'Response to slow or sustained loads with the actual readout circuit.'],
      ['Triboelectric', 'Contact and separation produce charge transfer and induction.', 'Motion dependence and environmental sensitivity.'],
      ['Magnetic', 'A deforming magnetic interface changes measured field.', 'Nearby magnets, metal and motor operation.'],
      ['Optical', 'An imaging or light-sensing system observes contact-induced changes.', 'Optical access, surface wear and reconstruction calibration.'],
    ] },
    links: [
      { label: 'Research review: mechanisms and practical sensing constraints', href: 'https://link.springer.com/article/10.1007/s40820-025-01872-4' },
      { label: 'Follow the tactile sensor selection workflow', href: '/guides/how-to-choose-a-tactile-sensor' },
      { label: 'Compare optical and capacitive tactile sensors', href: '/guides/optical-vs-capacitive-tactile-sensors' },
      { label: 'Melexis Tactaxis: magnetic sensing and dated specifications', href: '/sensors/melexis-tactaxis' },
      { label: 'Further reading: Quality Magazine on tactile sensing and vision', href: 'https://www.qualitymag.com/articles/99943-how-tactile-sensing-fills-the-gap-vision-cant-measure' },
    ],
  },
  {
    id: 'tactile-super-resolution', heading: 'Tactile super-resolution explained',
    body: [
      'Tactile super-resolution estimates contact details finer than the spacing of physical sensing elements. Deformation can influence several neighboring sensors, producing a response pattern that a calibrated model can use to infer position. Increasing the size of a displayed map alone does not demonstrate better physical resolution.',
      'Bang and colleagues combine a soft multilayer lattice, embedded permanent magnets and distributed Hall-effect sensors. The lattice creates overlapping receptive fields; a CNN estimates contact location and normal force from experimental measurements. This is a particular learned reconstruction, not evidence that every magnetic skin resolves arbitrary contacts.',
      'As an evaluation checklist, ask for physical sensor pitch, held-out localization and force errors, contact geometry and load range. Test unseen positions, multiple contacts if claimed, and response after remounting. Compare against a simple baseline and keep reconstruction time separate from sensor sampling rate. These are recommended checks, not experiments performed by RoboSkin.ai.',
    ],
    links: [
      tactileSources.lattice,
      { label: 'Explain the magnetic sensing mechanism', href: '/e-skin#magnet-based-tactile-skin' },
      { label: 'TacPrint: sparse capacitive measurements and learned depth', href: '/research/tacprint-wearable-tactile-contact-reproduction-2026' },
    ],
  },
];

export const surgicalRoboticsSection: Section = {
  id: 'surgical-robotics', heading: 'Tactile sensing in minimally invasive surgery',
  body: [
    'Surgical robotics separates the operator from direct finger contact with tissue. Tactile sensing research explores how instruments can observe local contact, deformation or loading. Two recent approaches target different measurements: optical palpation and magnetic force sensing. Their results should not be treated as interchangeable tests of clinical performance.',
    'MISTac uses a replaceable 8 mm tip and a fiber-based optical path to keep larger imaging components away from the contact site. The authors report an in vivo study and a tissue-classification demonstration. This is preliminary research, not evidence of validated tumor diagnosis or routine human surgical use.',
    'The October 7 Hall-effect preprint places three millimeter-scale taxels on a surgical grasping surface. Deforming elastomer moves embedded magnets; calibrated readings estimate normal and shear loading. Validation used phantoms and ex vivo porcine tissue, including retraction and slip. Those conditions are narrower than a human clinical trial.',
  ],
  table: { headers: ['Research approach', 'Evidence reviewed', 'Do not infer'], rows: [
    ['MISTac optical tip', 'Miniaturized palpation sensor and in vivo tissue-data experiment.', 'Established diagnostic accuracy across patients or diseases.'],
    ['Hall-effect grasping surface', 'Calibrated normal/shear sensing with phantom and ex vivo evaluation.', 'Clinical clearance, sterilization lifetime or proven patient outcomes.'],
  ] },
  bullets: [
    'Before selecting hardware, specify tool dimensions, working range, loading direction and the feedback the operator or controller needs.',
    'Request evidence for sealing, cleaning or disposable interfaces, biocompatibility, latency and calibration under the intended conditions. Neither paper establishes all deployment requirements.',
    'Keep author-reported laboratory evidence separate from independently reproduced results. RoboSkin.ai has not performed these experiments.',
  ],
  links: [tactileSources.mistac, tactileSources.hall, { label: 'Build a sensor selection and evaluation plan', href: '/guides/how-to-choose-a-tactile-sensor' }],
};

export const eSkinAdditions: Section[] = [
  {
    id: 'magnet-based-tactile-skin', heading: 'Magnet-based tactile skin explained',
    body: [
      'A magnetic tactile skin couples a deformable magnetic interface to field sensors. Contact changes the interface geometry and the measured field; calibration or a learned mapping then estimates a contact property. Raw field readings are not automatically forces in newtons.',
      'ReSkin separates a replaceable soft magnetic interface from the electronics. The 2026 lattice-skin study instead describes permanent magnets in a printed soft structure above Hall-effect arrays. In both cases, inspect the specific geometry and response model rather than assuming that all magnetic skins share a calibration.',
      'For your installation, test unloaded readings with motors operating and compare response before and after remounting or pad replacement. Ask which force directions and contact patterns were included in calibration. A contact-localization result alone does not establish shear-force accuracy.',
    ],
    links: [
      { label: 'ReSkin author project and sensing architecture', href: 'https://reskin.dev/' },
      tactileSources.lattice,
      { label: 'How overlapping responses enable tactile super-resolution', href: '/technology#tactile-super-resolution' },
      { label: 'ReSkin hardware and evidence guide', href: '/sensors/reskin' },
    ],
  },
  {
    id: 'eluminator', heading: 'eLuminator: pixel-free pressure visualization',
    body: [
      'The NUS eLuminator study was published in Nature Communications on May 26, 2026; the university news release followed in September. Its soft mechano-electroluminescent layer turns pressure-induced deformation into visible light patterns without a discrete sensing-pixel array.',
      'The paper reports 30 micrometer spatial resolution, expressed as 847 dpi, for its pressure-mapping method. It also demonstrates visual force feedback with laparoscopic tools for surgical training. This figure characterizes the reported imaging experiment; it does not establish force accuracy, controller latency or clinical effectiveness.',
      'For a robot application, an integrator would still need to validate how the optical pattern is read, calibrated and delivered to the controller. Treat the result as a research example of pressure visualization, not a ready-to-install robot skin specification.',
    ],
    links: [tactileSources.eluminator, { label: 'NUS September 28 research announcement', href: 'https://news.nus.edu.sg/electronic-skin-see-touch/' }, { label: 'Compare surgical sensing approaches', href: '/applications#surgical-robotics' }],
  },
];

export const icraTutorialSection: Section = {
  id: 'icra-2026-hardware-tutorial', heading: 'Hardware follow-up: the ICRA 2026 tactile gripper tutorial',
  body: [
    'The tutorial authors provide a PincOpen two-finger gripper example with Melexis Tactaxis sensing. Their repository includes CAD, electronics, an assembly guide, a bill of materials, ROS 2 packages and Python examples. It is a concrete hardware follow-up to the synthetic message and replay exercises on this page.',
    'The repository documents a ROS 2 Humble environment and Ubuntu 22.04 testing by its authors. Check the current instructions and hardware revision before following it. RoboSkin.ai has reviewed the public documentation but has not built this gripper or verified its ROS runtime; the existing starter-kit exercise and this hardware project are separate implementations.',
  ],
  bullets: [
    'Start with the hardware assembly and wiring documents, then confirm axis conventions, units and zero-load behavior.',
    'Bring verified measurements into a timestamped data contract before recording, replaying or using them in a controller.',
    'Do not assume packages or launch files from one tutorial work unchanged with the other.',
  ],
  links: [tactileSources.tutorial, { label: 'University tutorial page', href: 'https://mech.vub.ac.be/multibody/ICRA_conference_workshop.htm' }],
};

export const robotechWatchSection: Section = {
  id: 'robotech-2026', heading: 'ROBOTECH 2026: a source-discovery watchlist',
  body: [
    'The organizer lists October 27–29, 2026 at Shenzhen World Exhibition & Convention Center (Bao’an). Checked October 12, 2026. The event covers embodied robotics and its supply chain; its dates and general scope do not confirm that a particular tactile supplier will exhibit.',
    'For tactile research discovery, collect an official exhibitor listing, an identifiable sensor model, a datasheet or paper, and a documented demonstration before adding a vendor to a technical comparison. A booth demo or exhibition listing does not validate throughput or force-measurement claims.',
  ],
  bullets: ['Record sensing principle, normal/shear outputs and active contact area.', 'Request calibration conditions, latency, driver access and replacement documentation.', 'Record the source date and distinguish supplier-reported measurements from independent tests.'],
  links: [{ label: 'ROBOTECH official event information', href: 'https://www.robotechasia.com/en-gb.html' }, { label: 'Use the tactile sensor evaluation worksheet', href: '/guides/how-to-choose-a-tactile-sensor#acceptance-trial' }],
};
