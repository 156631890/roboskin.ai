import type { SeoTopicPage } from '@/content/seo-topic-pages';

const miniSheet = {
  label: 'GelSight Mini product sheet, October 7, 2024: cartridge and operating specifications',
  href: 'https://www.gelsight.com/wp-content/uploads/productsheet/Mini/GS_Mini_Product_Sheet_10.07.24.pdf',
};
const miniFaq = {
  label: 'GelSight gsrobotics: manufacturer FAQ, especially questions 26 and 27',
  href: 'https://github.com/gelsightinc/gsrobotics/blob/main/README.md',
};
const miniGel = {
  label: 'GelSight Mini standard replacement cartridge and gel reformulation notice',
  href: 'https://www.gelsight.com/product/standard-silicone-replacement-gel/',
};
const digitPaper = {
  label: 'Lambeta et al., DIGIT (2020), mechanical and elastomer design',
  href: 'https://arxiv.org/pdf/2005.14679#page=3',
};
const digitDesign = {
  label: 'Official DIGIT design files: enclosure, elastomer and manufacturing resources',
  href: 'https://github.com/facebookresearch/digit-design',
};
const capacitivePaper = {
  label: 'Maiolino et al., A Flexible and Robust Large Scale Capacitive Tactile System for Robots',
  href: 'https://arxiv.org/html/1411.6837v1',
};
const pps = {
  label: 'PPS: RoboTact development kit and RoboTouch capacitive sensing',
  href: 'https://pressureprofile.com/sensors/robotact',
};

export const opticalTactileGuides: SeoTopicPage[] = [
  {
    path: '/guides/optical-tactile-sensor-maintenance',
    title: 'Optical Tactile Sensor Gel Replacement & Maintenance',
    description: 'Maintain GelSight Mini and original DIGIT gels using official sources: wear signs, replacement limits, cleaning, calibration checks and spare cartridges.',
    h1: 'How to Replace Optical Tactile Sensor Gel: Maintenance Guide',
    kicker: 'Engineering guide / Optical tactile sensor maintenance',
    intent: 'Help readers identify gel wear and follow the documented maintenance path for their exact optical tactile sensor.',
    published: '2026-10-17',
    updated: '2026-10-17',
    priority: 0.75,
    changeFrequency: 'monthly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['how to replace optical tactile sensor gel', 'optical tactile sensor maintenance', 'GelSight Mini replacement gel', 'DIGIT gel replacement'],
    quickAnswer: [
      'Gel replacement depends on the sensor. GelSight Mini documents a tool-free cartridge; the original DIGIT paper describes elastomer replacement using one screw. These are different assemblies, not a universal disassembly procedure.',
      'This guide follows public manufacturer documents and the original DIGIT paper. They establish replaceability but do not provide every release motion, fastener detail or tightening instruction. Obtain the instructions for your hardware revision before opening it. RoboSkin has not performed a hardware replacement.',
    ],
    sections: [
      {
        heading: 'When to Replace Your Sensor Gel',
        body: [
          'GelSight identifies rough contacts as a source of gel shearing and sharp edges as a cause of coating wear, cuts and tears. The DIGIT paper likewise describes damage to the image-transfer surface as a change in the sensor itself. Physical damage and persistent image degradation therefore deserve investigation before another measurement run.',
          'Debris is not the same as torn material. For Mini, use the documented cleaning method below before attributing an image defect to permanent wear. If damage remains or measurement quality is uncertain, ask the supplier whether the cartridge should be replaced; the reviewed sources do not define a universal image-error rejection threshold.',
        ],
        links: [miniFaq, digitPaper],
      },
      {
        heading: 'What You Need',
        body: [
          'Identify the exact sensor and replacement surface first. GelSight sells a standard Mini replacement cartridge and states that orders from January 3, 2025 use a reformulated gel. Preserve that version information when comparing recordings across replacements.',
          'The Mini product sheet says cartridge replacement needs no tools. Its focus accessory is a separate item, not evidence that the lens must be adjusted for every replacement. For original DIGIT, consult the design files and supplier instructions for the installed assembly. The paper alone does not specify a service screwdriver size or tightening torque.',
        ],
        links: [miniGel, miniSheet, digitDesign],
      },
      {
        heading: 'Step-by-Step Gel Replacement',
        body: [
          'Use these checkpoints to find the documented procedure, rather than transferring a removal motion from another sensor. The public evidence reviewed here stops short of a complete illustrated service manual.',
        ],
        table: {
          headers: ['Checkpoint', 'GelSight Mini', 'Original DIGIT'],
          rows: [
            ['1. Match the part', 'Use a cartridge explicitly sold for Mini.', 'Match the elastomer assembly to the original DIGIT revision.'],
            ['2. Confirm the release method', 'The sheet confirms tool-free replacement but omits the release motion.', 'Section III-A documents a single-screw replacement design, not a detailed service sequence.'],
            ['3. Replace using the supplied instructions', 'Follow the cartridge instructions or obtain them from GelSight before removal.', 'Use the design documentation and supplier instructions; do not infer screw location or torque from this guide.'],
            ['4. Check the measurement workflow', 'Return to the documented live-image or reconstruction workflow.', 'Return to the documented image interface, then validate any derived output.'],
          ],
        },
        links: [miniSheet, digitPaper, digitDesign],
      },
      {
        heading: 'Recalibration After Replacement',
        body: [
          'The DIGIT paper explains that variation between sensing surfaces can require recalibration or retraining. A mechanically replaceable surface does not establish that a previous depth, force or learned-policy model remains valid.',
          'Treat the post-replacement check as an experiment-specific acceptance decision. Retain the previous acquisition settings and calibration record so you can compare the replacement with the references used to qualify the system. No universal recalibration target, force sequence or pass threshold is supplied by the sources reviewed here. Follow the calibration procedure validated for your application.',
        ],
        links: [digitPaper],
      },
      {
        heading: 'Maintenance Tips to Extend Gel Life',
        body: [
          'For GelSight Mini specifically, the manufacturer FAQ recommends removing debris with a foam swab. For a dirty cartridge it permits a foam swab with a small amount of isopropyl alcohol (IPA). The FAQ gives no alcohol concentration or soaking time; this instruction should not be generalized to DIGIT or other coatings.',
          'Avoid interpreting a laboratory durability example as a replacement calendar. The 2024 Mini sheet lists 1,000 coin presses under its test conditions. That is not a promise of 1,000 robot grasps, and it predates the announced 2025 standard-gel reformulation.',
          'The reviewed documents provide no universal daily, weekly or monthly inspection interval. Use the supplier guidance for the supplied revision and the wear observed in the actual task to establish a local inspection schedule. Keep cleaning, damage and replacement records with the sensor data.',
        ],
        links: [miniFaq, miniSheet, miniGel],
      },
    ],
    faqs: [
      { question: 'How often should I replace tactile sensor gel?', answer: 'There is no universal replacement interval in the reviewed sources. Contact material, damage and the quality required by the application matter. A coin-press test is not a schedule for every robot task.' },
      { question: 'Can I repair a torn gel or must I replace it?', answer: 'The reviewed sources document replaceable surfaces, not a validated patching or recoating repair for a torn commercial cartridge. Ask the supplier for the supported replacement path; do not assume a patched surface preserves calibration.' },
      { question: 'Where do I buy replacement gels for GelSight or DIGIT sensors?', answer: 'GelSight lists a standard Mini replacement cartridge in its official store. For original DIGIT, confirm current cartridge availability and hardware compatibility directly with the supplier. Public DIGIT design files are a fabrication reference, not evidence of current stock.' },
      { question: 'Does replacing the gel affect calibration?', answer: 'It can. The original DIGIT paper identifies sensor variation as a reason recalibration or retraining may be necessary. Revalidate the output your application uses rather than assuming mechanical fit preserves measurement accuracy.' },
    ],
    relatedLinks: [
      { label: 'Original DIGIT sensor profile', href: '/sensors/digit', description: 'Identify the original hardware and its acquisition interface.' },
      { label: 'GelSight Mini sensor profile', href: '/sensors/gelsight-mini', description: 'Separate manufacturer specifications from reconstruction settings.' },
      { label: 'Tactile sensor calibration guide', href: '/guides/tactile-sensor-calibration', description: 'Plan reference measurements and retain a calibration record.' },
    ],
    sources: [miniSheet, miniFaq, miniGel, digitPaper, digitDesign],
  },
  {
    path: '/guides/optical-vs-capacitive-tactile-sensors',
    title: 'Optical vs Capacitive Tactile Sensors: Comparison',
    description: 'Compare optical and capacitive tactile sensors by signal, spatial detail, force calibration, maintenance, packaging and application-level cost.',
    h1: "Optical vs Capacitive Tactile Sensors: An Engineer's Comparison",
    kicker: 'Sensor selection / Optical and capacitive touch',
    intent: 'Help engineers choose a sensing principle using documented outputs and application requirements rather than unmatched specifications.',
    published: '2026-10-17',
    updated: '2026-10-17',
    priority: 0.75,
    changeFrequency: 'monthly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['optical vs capacitive tactile sensor', 'optical tactile sensors', 'capacitive tactile sensors', 'robot skin sensor comparison'],
    quickAnswer: [
      'An optical tactile fingertip uses an internal camera to observe a deforming contact surface. A capacitive tactile array measures electrical capacitance changes at sensing elements. Decide first whether the task needs detailed contact images, distributed pressure, or a validated force estimate.',
      'Neither principle alone establishes force range, service life, latency or installed cost. This is a source-based selection guide, not a matched hardware benchmark. The recommendations below are engineering interpretations of the cited designs.',
    ],
    sections: [
      {
        heading: 'How Optical Tactile Sensors Work',
        body: [
          'GelSight-family sensors and original DIGIT image an illuminated, compliant surface as contact deforms it. The acquired image is an observation; geometry, force and slip estimates depend on the processing and calibration used with that hardware.',
          'GelSight Mini lists an 18.6 × 14.3 mm field of view. Original DIGIT reports a 19 × 16 mm sensing field. These describe two specific fingertips, not a limit on optical sensor coverage. Camera pixels must not be counted as independently calibrated force taxels.',
        ],
        links: [miniSheet, digitPaper],
      },
      {
        heading: 'How Capacitive Tactile Sensors Work',
        body: [
          'In a compliant capacitive pressure sensor, contact changes the separation or geometry of electrodes and their dielectric, changing capacitance. Electronics read the elements, and calibration relates that signal to the intended pressure or force measurement.',
          'Maiolino and colleagues describe modular capacitive skin for curved robot surfaces, including temperature compensation. PPS offers RoboTact for fingers and grippers and documents RoboTouch arrays with embedded digital interfaces. These illustrate both distributed skin and local fingertip implementations; capacitive sensing is not restricted to whole-body coverage.',
        ],
        links: [capacitivePaper, pps],
      },
      {
        heading: 'Head-to-Head Comparison',
        body: [
          'Compare the complete measurement chain under the same contact conditions. The entries below identify what to inspect, rather than assign a technology-wide performance score. In particular, an image resolution and an electrode pitch are different quantities.',
        ],
        table: {
          headers: ['Decision', 'Optical tactile sensors', 'Capacitive tactile sensors'],
          rows: [
            ['Signal', 'Images of contact-surface deformation; derived outputs need processing.', 'Capacitance measurements; pressure or force requires the documented calibration.'],
            ['Spatial detail', 'Evaluate the smallest feature actually resolved across the contact surface.', 'Evaluate electrode layout, pitch and mechanical coupling between taxels.'],
            ['Force range', 'Check the gel and force-estimation calibration for the specific device.', 'Check the mechanical stack, electronics and calibrated range for the specific array.'],
            ['Durability and drift', 'Budget for surface wear and replacement; retain calibration history.', 'Check covering durability and temperature compensation; the cited iCub work addresses thermal drift.'],
            ['Form factor', 'Allow space for the optical path, camera, illumination and contact surface.', 'Consider conformable arrays plus their readout, wiring and protective stack.'],
            ['Cost', 'Quote the sensor, host processing, spare surfaces and validation effort.', 'Quote the array, readout, custom coverage, packaging and validation effort.'],
          ],
        },
        links: [digitPaper, miniSheet, miniFaq, capacitivePaper, pps],
      },
      {
        heading: 'Which One for Your Application?',
        body: [
          'These are starting points for a shortlist, inferred from the documented designs. Confirm each choice on the intended robot, objects and contact cycle.',
        ],
        table: {
          headers: ['Application', 'A useful starting point', 'Question that decides the choice'],
          rows: [
            ['Dexterous manipulation', 'Optical fingertips when local contact appearance is useful; capacitive fingertips when the required feedback is available from an array.', 'Does the observation improve the target task after accounting for mounting and processing?'],
            ['Whole-body robot skin', 'Modular capacitive coverage is a documented route in the iCub research.', 'Can the layout cover joints and curved surfaces with acceptable wiring and calibration effort?'],
            ['Industrial grippers', 'Shortlist both principles against the required contact signal.', 'What survives the real object edges, contamination and maintenance window?'],
          ],
        },
        links: [capacitivePaper, pps, digitPaper],
      },
      {
        heading: 'Maintenance and Cost: Compare the Installed System',
        body: [
          'GelSight explicitly provides replacement cartridges, and its FAQ relates gel damage to the contacted surface. Capacitive designs still have mechanical layers and electronics to qualify; temperature compensation in the iCub work is an example of an addressed error source, not proof that every capacitive product has the same drift.',
          'Do not label capacitive sensing maintenance-free or optical sensing universally fragile. Request a task-relevant endurance protocol, replacement procedure and calibration record for each candidate. No matched price or lifetime dataset was established from the sources used here.',
          'For a procurement comparison, ask for the same scope: usable sensing area, required readout, mounting, software access, spares and support. A low component cost in a research paper does not establish the delivered price of a working system.',
        ],
        links: [miniGel, miniFaq, capacitivePaper],
      },
    ],
    faqs: [
      { question: 'Which is more durable: optical or capacitive tactile sensors?', answer: 'The sensing principle alone is insufficient. Compare the supplied surface, packaging, objects and duty cycle using the same test. The cited sources do not provide a matched optical-versus-capacitive lifetime comparison.' },
      { question: 'Do optical tactile sensors need gel replacement?', answer: 'Some do: GelSight Mini documents a replaceable cartridge and original DIGIT documents a replaceable elastomer. The replacement interval and procedure depend on the hardware and use.' },
      { question: 'Which technology is cheaper for large-area robot skin?', answer: 'Modular capacitive skin is a documented route to covering curved surfaces, but that does not establish a universal price advantage. Compare quotations including coverage, readout, wiring, packaging and calibration.' },
      { question: 'Can capacitive sensors match optical resolution?', answer: 'Define resolution first. Compare resolved contact features or contact-localization error over the same area and loading conditions. Camera pixel count and taxel count alone do not answer that question.' },
    ],
    relatedLinks: [
      { label: 'Tactile sensor directory', href: '/sensors', description: 'Compare named sensors and follow their primary sources.' },
      { label: 'Tactile sensing principles', href: '/technology', description: 'Place optical and capacitive designs alongside other transducers.' },
      { label: 'Optical tactile sensor maintenance', href: '/guides/optical-tactile-sensor-maintenance', description: 'Review documented gel replacement and cleaning boundaries.' },
    ],
    sources: [miniSheet, digitPaper, capacitivePaper, pps, miniFaq, miniGel],
  },
];
