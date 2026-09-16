import type { SeoTopicPage } from '@/content/seo-topic-pages';

export const sensorDetailPages: SeoTopicPage[] = [
  {
    path: '/sensors/digit',
    title: 'DIGIT Tactile Sensor: Specs, Python Interface & Limits',
    description: 'Evaluate the original DIGIT tactile sensor: paper specifications, Python stream settings, design files, calibration needs, repository status, and reuse terms.',
    h1: 'DIGIT tactile sensor: from RGB frames to robot touch',
    kicker: 'Sensor evidence / Vision-based fingertip',
    intent: 'Help robotics researchers evaluate the original DIGIT hardware and start with its documented Python interface.',
    published: '2026-09-12',
    updated: '2026-09-16',
    priority: 0.75,
    changeFrequency: 'monthly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['DIGIT tactile sensor', 'DIGIT sensor Python interface', 'DIGIT sensor specifications', 'DIGIT calibration'],
    quickAnswer: [
      'DIGIT is a compact optical tactile fingertip introduced by Lambeta and colleagues in IEEE Robotics and Automation Letters in 2020. An internal camera observes an illuminated deformable gel; the direct output is an image of contact-induced deformation.',
      'For initial software integration, the official digit-interface README documents a default 640 × 480 stream at 30 FPS. Table I of the original paper reports 60 FPS for the paper hardware. These describe different evidence: a documented default and a reported hardware configuration. Inspect the formats your physical unit actually supports.',
      'This guide covers the original DIGIT. Digit 360 and DIGIT Pinki have separate hardware designs and research claims. Source review is documentary; RoboSkin.ai has not built or bench-tested a unit.',
    ],
    sections: [
      {
        heading: 'Specifications with their source and scope',
        body: ['The paper provides a compact hardware reference. Use the manufacturer documentation for the revision you acquire, and record the image format, lighting, gel condition, and capture timestamps used in your experiment.'],
        table: {
          headers: ['Property', 'Reported value', 'Source and interpretation'],
          rows: [
            ['Housing / mass', '20 × 27 × 18 mm; 20 g', '2020 paper, Table I; original research design'],
            ['Sensing field', '19 × 16 mm', '2020 paper, Table I; distinct from housing dimensions'],
            ['Image resolution / rate', '640 × 480; 60 FPS', '2020 paper, Table I; not the Python default'],
            ['Default Python stream', '640 × 480 at 30 FPS', 'Official digit-interface README, Usage'],
            ['Measured output', 'Tactile RGB image', 'Contact geometry and force estimates require processing beyond image acquisition'],
          ],
        },
      },
      {
        heading: 'A practical route through the official interface',
        body: [
          'The official package is named digit-interface. Its documented workflow lists attached sensors using DigitHandler.list_digits(), connects a Digit instance by the serial number printed on the device, and retrieves an image with get_frame(). The example viewer uses show_view(). Follow the repository installation and device-access instructions for your operating system.',
          'Before collecting a dataset, inspect Digit.STREAMS and choose a supported resolution and frame rate explicitly. Save the serial number, stream format, illumination settings, unloaded reference image, gel replacement history, and robot timestamps with the recordings. This makes later differences between sensors and sessions interpretable.',
          'The interface and design repositories are archived as checked on September 12, 2026. Their instructions remain useful reference material, but compatibility with a current Python, operating system, camera stack, or replacement component needs local verification. We have reviewed the documentation rather than run a connected-sensor test.',
        ],
      },
      {
        heading: 'What the image establishes—and what needs calibration',
        body: [
          'The image can reveal where the gel contacts an object and how its appearance changes as contact moves. A depth map, force vector, slip decision, or grasp-success estimate is a separate model output. Evaluate that model using independent reference measurements appropriate to the claimed quantity.',
          'For geometric reconstruction, specify the reference objects and the part of the gel included in calibration. For force estimation, synchronize a force reference with the images. For a manipulation policy, compare trials on the same robot, objects, controller budget, and success criterion. Camera FPS is not the latency of that complete feedback loop.',
        ],
      },
      {
        heading: 'Hardware files, software, simulation, and reuse terms',
        body: [
          'The digit-design repository contains enclosure, elastomer, electronics, and firmware-binary resources, including a manufacturing quick-start document and component-substitution notes. Check those notes against the exact board revision before ordering parts.',
          'Both the reviewed design and Python-interface repositories carry Creative Commons Attribution-NonCommercial 4.0 terms. Publicly available files should not be treated as unrestricted commercial-use software or hardware designs. Commercial sensor purchase and reuse of repository material are separate questions.',
          'The official project also links TACTO, a tactile simulator. Simulated observations can support development, but their appearance and contact dynamics do not validate a physical sensor calibration or a robot policy. Keep simulation and physical results separate in your records.',
        ],
      },
      {
        heading: 'Choosing between DIGIT, GelSight Mini, and ReSkin',
        body: [
          'DIGIT is relevant when a compact visual fingertip and an established research interface fit the robot geometry. GelSight Mini offers a separate commercial optical-sensor workflow and replaceable gel cartridge. ReSkin uses magnetic measurements from a replaceable elastomer, producing a different observation space.',
          'Choose using mounting geometry, signal requirements, calibration effort, component access, and maintainable software. A camera pixel count cannot be compared directly with a magnetic channel count as a universal measure of tactile quality. The linked sensor guides preserve these distinctions.',
        ],
      },
      {
        "heading": "Prepare a calibration record before interpreting contact",
        "body": [
          "The calibration workflow separates no-contact image baselines, reference geometry for depth reconstruction and independently measured force targets. Use the blank record to retain units, repeats, environmental conditions and invalid samples. The workflow is source-based; no new hardware measurements are claimed."
        ],
        "links": [
          {
            "label": "Plan DIGIT and GelSight Mini calibration",
            "href": "/guides/tactile-sensor-calibration"
          },
          {
            "label": "Run tactile CSV quality checks and plots in Python",
            "href": "/guides/python-tactile-data-processing"
          }
        ]
      },
    ],
    faqs: [
      { question: 'Does DIGIT run at 30 or 60 FPS?', answer: 'The original paper reports 60 FPS at 640 × 480. The official Python README initializes a 640 × 480 stream at 30 FPS. Check the supported formats on the actual unit and explicitly record the mode used.' },
      { question: 'Does DIGIT output force directly?', answer: 'The documented interface returns camera frames. Calibrated force, depth, slip, and task outcomes depend on additional models, reference data, and validation.' },
      { question: 'Is DIGIT a $15 sensor?', answer: 'The paper lists $15 in component cost under an assumption of manufacturing 1,000 pieces. That is a historical research cost estimate, not a current retail price or the cost of a complete calibrated robot system.' },
      { question: 'Are DIGIT and Digit 360 the same sensor?', answer: 'No. This page covers the original 2020 DIGIT. Digit 360 and DIGIT Pinki are distinct designs; their sensing modalities and performance claims must be checked in their own sources.' },
    ],
    relatedLinks: [
      { label: 'Sensor directory', href: '/sensors#sensor-digit', description: 'Return to the original DIGIT directory record.' },
      { label: 'GelSight Mini guide', href: '/sensors/gelsight-mini', description: 'Review a commercial optical sensor and its software workflow.' },
      { label: 'ReSkin guide', href: '/sensors/reskin', description: 'Compare a magnetic skin and its calibration requirements.' },
      { label: 'Tactile datasets', href: '/datasets', description: 'Check collection units, sensor identities, access, and splits.' },
      { label: 'Experimental evidence', href: '/benchmarks#experiment-evidence', description: 'Read results alongside their protocol and evidence boundaries.' },
    ],
    sources: [
      { label: 'Lambeta et al.: original DIGIT paper, Table I and hardware evaluation', href: 'https://arxiv.org/pdf/2005.14679#page=2' },
      { label: 'DIGIT official project and related resources', href: 'https://digit.ml/digit.html' },
      { label: 'Official Python interface: reviewed revision 87a28bb', href: 'https://github.com/facebookresearch/digit-interface/tree/87a28bbf2beee8008a5308e9a12d72e1bc4fefb9' },
      { label: 'Official design files and CC BY-NC 4.0 license: reviewed revision de29222', href: 'https://github.com/facebookresearch/digit-design/tree/de292229d43eed1deba58b856b2fe1ee04097631' },
      { label: 'TACTO simulator linked by the official project', href: 'https://github.com/facebookresearch/tacto' },
    ],
  },
  {
    path: '/sensors/gelsight-mini',
    title: 'GelSight Mini: Specifications, Software & Calibration',
    description: 'Review GelSight Mini specifications, RGB and 3D workflows, calibration limits, replaceable gel, Python examples, and evidence for robotics use.',
    h1: 'GelSight Mini: specifications and a usable research workflow',
    kicker: 'Sensor evidence / Commercial optical touch',
    intent: 'Help researchers distinguish GelSight Mini manufacturer specifications from software reconstruction settings and experimental claims.',
    published: '2026-09-12',
    updated: '2026-09-16',
    priority: 0.75,
    changeFrequency: 'monthly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['GelSight Mini', 'GelSight Mini specifications', 'GelSight Mini calibration', 'GelSight Mini Python'],
    quickAnswer: [
      'GelSight Mini is a commercial optical tactile sensor. A camera observes an illuminated compliant gel as it conforms to a contacted surface. The official datasheet reports an 18.6 × 14.3 mm field of view, an 8 MP camera, and a 25 FPS camera frame rate.',
      'Those specifications are distinct from reconstruction settings: the reviewed gsrobotics examples use a configurable image-processing pipeline, with a 320 × 240 default configuration shown in the README. A sensor specification, a processed image size, and the spatial accuracy of a learned model are different measurements.',
      'The sources below provide a path from live RGB capture to example 3D reconstruction. RoboSkin.ai reviewed the manufacturer documents and code documentation; we have not acquired a sensor or independently reproduced its performance.',
    ],
    sections: [
      {
        heading: 'Manufacturer specifications with operating conditions',
        body: ['The following values are transcribed from page 3 of the official datasheet reviewed on September 12, 2026. They belong to GelSight Mini, and should not be copied onto other GelSight products or all optical tactile sensors.'],
        table: {
          headers: ['Property', 'Manufacturer-reported value', 'Interpretation'],
          rows: [
            ['Field of view', '18.6 mm horizontal × 14.3 mm vertical', 'Sensing view, not overall enclosure dimensions'],
            ['Camera', '8 MP; 25 FPS', 'Separate camera specifications; check the actual negotiated stream mode'],
            ['Gel thickness', '4.25 ± 0.20 mm', 'Gel thickness is not sensor thickness'],
            ['Illumination / gel', 'RGB LEDs; Lambertian silicone gel', 'Optical reconstruction depends on the gel and illumination state'],
            ['Preferred operating temperature', '0–30 °C', 'Datasheet environmental conditions'],
            ['Storage / humidity', '−25 to +60 °C; up to 80% RH, non-condensing', 'Storage range does not establish the same range for operation'],
            ['Gel durability', '1,000 coin presses', 'A named manufacturer test; not a general industrial cycle rating'],
          ],
        },
      },
      {
        heading: 'Start with image capture, then inspect the 3D pipeline',
        body: [
          'GelSight links a browser application for an initial live view. For programmable work, its gsrobotics repository documents live-view, dual-camera, 3D-viewer, and basic OpenCV demos, with installation instructions for Windows and Linux. The README also links case and gripper-adapter CAD models.',
          'A useful first session identifies the camera, captures an unloaded gel image, records a short contact sequence, and checks the saved frames before adding a robot controller. The 3D demo uses a supplied model and configuration for reconstruction. Preserve the model file, preprocessing, image dimensions, scale, and marker-handling settings with each experiment.',
          'The datasheet mentions ROS and ROS 2, including older distributions. Treat that as documented historical compatibility. Verify a maintained driver and dependency set for the distribution and operating system you actually use; this page does not certify every current ROS release.',
        ],
      },
      {
        heading: 'Calibration, force, and replacement gel',
        body: [
          'The official repository describes example reconstruction from RGB images and includes a reference calibrated model. The existence of that example does not establish a calibrated force vector for every purchased unit. For metric geometry, verify the image scale and reference depth on your device; for force, collect synchronized reference-force measurements.',
          'The cartridge is described as user-replaceable without tools. After a change, inspect unloaded appearance, focus, contact coverage, and reconstruction on reference shapes. Replacement can alter the image distribution seen by a model, even when the mechanical cartridge returns to a similar position.',
          'Marker motion can support shear estimation, but a visible marker displacement is not automatically a value in newtons. Record the calibration procedure and quantify its error independently from grasp or teleoperation success.',
        ],
      },
      {
        heading: 'Reading robotics evidence correctly',
        body: [
          'RoboSkin.ai covers studies using GelSight Mini in different roles. The spatial-tactile teleoperation article examines a specific mapping, display, apparatus, and human task. The SoftVTBench article distinguishes simulated visuo-tactile observations from a physical collection claim. Their outcomes should remain attached to those setups.',
          'When comparing a new policy with a published result, match the robot, sensor revision, gel, input processing, test objects, split, and success criterion. Use the experiment evidence module as a model for retaining these fields with each numerical result.',
        ],
      },
      {
        heading: 'Access and reproducibility checklist',
        body: [
          'Hardware is commercially offered by GelSight; use the manufacturer for current price, stock, and support. The reviewed gsrobotics repository is public and carries a GPL-3.0 license. That repository license does not automatically cover separately linked datasets or every third-party model.',
          'Before committing to a robot integration, check the mounting envelope and cable path, establish a repeatable capture configuration, validate the metric you need, and test the effect of gel replacement. Keep the official datasheet and a pinned software revision with the resulting experiment record.',
        ],
      },
      {
        "heading": "Prepare a calibration record before interpreting contact",
        "body": [
          "The calibration workflow separates no-contact image baselines, reference geometry for depth reconstruction and independently measured force targets. Use the blank record to retain units, repeats, environmental conditions and invalid samples. The workflow is source-based; no new hardware measurements are claimed."
        ],
        "links": [
          {
            "label": "Plan DIGIT and GelSight Mini calibration",
            "href": "/guides/tactile-sensor-calibration"
          },
          {
            "label": "Run tactile CSV quality checks and plots in Python",
            "href": "/guides/python-tactile-data-processing"
          }
        ]
      },
    ],
    faqs: [
      { question: 'What is the GelSight Mini sensing area?', answer: 'The reviewed manufacturer datasheet gives a field of view of 18.6 mm horizontally by 14.3 mm vertically. This is different from the enclosure dimensions and from an image-processing crop.' },
      { question: 'Does GelSight Mini provide RGB, depth, or force?', answer: 'The camera provides RGB observations. Official examples process these into 3D representations using a model. Calibrated force and task-specific accuracy require additional evidence; they should not be assumed from the live image or the datasheet.' },
      { question: 'Why do the specifications say 8 MP while examples use 320 × 240?', answer: 'The camera specification and a demo processing configuration describe different stages of the system. Record the actual capture format and reconstruction resolution, rather than treating either number as a force or depth accuracy measurement.' },
      { question: 'Can the gel be replaced?', answer: 'The manufacturer describes a tool-free, user-replaceable cartridge. Check the image reference and task calibration after replacement; mechanical replacement alone does not verify that a learned model transfers unchanged.' },
    ],
    relatedLinks: [
      { label: 'Sensor directory', href: '/sensors#sensor-gelsight-mini', description: 'Return to the GelSight Mini sensor record.' },
      { label: 'DIGIT guide', href: '/sensors/digit', description: 'Compare the original compact visual fingertip and its stream settings.' },
      { label: 'ReSkin guide', href: '/sensors/reskin', description: 'Review a magnetic alternative and its signal path.' },
      { label: 'Spatial-tactile teleoperation evidence', href: '/research/missing-touch-spatial-tactile-feedback-teleoperation-2026', description: 'Read the human-task protocol and its hardware boundary.' },
      { label: 'SoftVTBench evidence', href: '/research/softvtbench-deformation-aware-visuo-tactile-dataset-2026', description: 'Keep simulated data and physical hardware claims distinct.' },
      { label: 'Experimental evidence', href: '/benchmarks#experiment-evidence', description: 'Read numerical results with their sample and test conditions.' },
    ],
    sources: [
      { label: 'GelSight Mini official datasheet, specifications and environmental conditions on page 3', href: 'https://www.gelsight.com/wp-content/uploads/productsheet/Mini/GelSight_Datasheet_GSMini.pdf#page=3' },
      { label: 'GelSight Mini official application and product resources', href: 'https://www.gelsightmini.com/' },
      { label: 'GelSight gsrobotics examples and README: reviewed revision 321d6a2', href: 'https://github.com/gelsightinc/gsrobotics/tree/321d6a22da64529138ff10237335038fd8c5189f' },
      { label: 'GPL-3.0 license for the reviewed gsrobotics repository', href: 'https://github.com/gelsightinc/gsrobotics/blob/321d6a22da64529138ff10237335038fd8c5189f/LICENSE' },
    ],
  },
  {
    path: '/sensors/reskin',
    title: 'ReSkin Magnetic Tactile Sensor: Design, Data & Calibration',
    description: 'Understand ReSkin magnetic tactile sensing: replaceable elastomer, five-magnetometer design, 400 Hz research setup, Python data collection, and calibration evidence.',
    h1: 'ReSkin: magnetic touch with a replaceable skin',
    kicker: 'Sensor evidence / Magnetic tactile skin',
    intent: 'Explain ReSkin hardware, raw observations, software access, and the limits of cross-skin calibration claims.',
    published: '2026-09-12',
    updated: '2026-09-12',
    priority: 0.75,
    changeFrequency: 'monthly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['ReSkin sensor', 'ReSkin magnetic tactile sensor', 'ReSkin calibration', 'ReSkin sensor Python'],
    quickAnswer: [
      'ReSkin is a magnetic tactile skin introduced by Bhirangi, Hellebrekers, Majidi, and Gupta at CoRL 2021. A passive magnetized elastomer deforms during contact, and nearby magnetometers measure changes in the magnetic field. The electronics are separate from the replaceable contact surface.',
      'The original study describes a 20 × 20 mm sensing area and five three-axis magnetometers. Its electronics stream temperature plus three magnetic values per chip: 20 values altogether, of which 15 are magnetic channels. Force and contact location are learned from those measurements; they are not 20 direct force readings.',
      'The paper investigates models that remain useful across skin instances and can adapt using self-supervision. This supports studying replaceable tactile interfaces, while the performance of a new mounting, material batch, or robot task still needs evaluation. Our review does not include fabrication or an independent reproduction.',
    ],
    sections: [
      {
        heading: 'The original hardware and signal path',
        body: ['The quantities below refer to the original ReSkin sources. Related magnetic skins and later interfaces should be identified separately rather than inheriting these specifications.'],
        table: {
          headers: ['Quantity', 'Source-reported configuration', 'Scope'],
          rows: [
            ['Contact surface', 'Magnetized elastomer separated from the board', 'Paper, sensor design; permits replacement of the passive interface'],
            ['Sensing area', '20 × 20 mm', 'Original paper, Section 3'],
            ['Magnetometers', 'Five MLX90393 chips; four around a central chip', 'Three magnetic axes per chip'],
            ['Streamed values', 'Temperature, Bx, By, Bz for each of five chips', '20 values including temperature; 15 magnetic channels'],
            ['Sampling', 'Approximately 400 Hz in the described board/setup', 'Acquisition rate is separate from inference and robot-control latency'],
            ['Skin thickness', '2–3 mm in the Meta research announcement', 'Passive skin figure; not total integrated sensor thickness'],
          ],
        },
      },
      {
        heading: 'Collecting data with the released Python library',
        body: [
          'The project links the reskin_sensor repository, maintained by an original author. Its README documents the reskin_sensor package, a five-sensor board connected through a microcontroller, firmware-upload instructions, and a computer-side sensor test.',
          'ReSkinBase is documented for blocking, standalone collection. ReSkinProcess supports background collection while other code runs. Choose based on the acquisition architecture, then verify timestamps and synchronization against the robot state and reference instrumentation.',
          'For a repeatable experiment, preserve unloaded field readings, temperature channels, skin identity, mounting orientation, firmware version, sampling configuration, and the learned model. The released library handles access to observations; it does not by itself validate a force calibration or a manipulation policy.',
        ],
      },
      {
        heading: 'What calibration and transfer results mean',
        body: [
          'ReSkin tackles variation across fabricated skins and changes with wear. The study trains response models using multiple skins and evaluates generalization and self-supervised adaptation. An unseen-skin result is meaningful only with its training skins, held-out skins, reference measurements, and adaptation procedure specified.',
          'The original experimental setup fixes the board and skin on a printed mount, uses a robot-driven hemispherical indenter, and measures reference normal force with an ATI Nano17. The paper describes quasi-static measurements unless stated otherwise. These conditions differ from arbitrary sliding, impact, or full-hand manipulation.',
          'The widely quoted 1 mm localization at 90% accuracy is a study summary, not a universal tolerance for every installed skin. Likewise, reported durability over many contacts depends on the interaction and material conditions. Preserve the evaluation protocol whenever quoting those figures.',
        ],
      },
      {
        heading: 'Integration decisions before mounting a skin',
        body: [
          'A magnetic sensor depends on the relationship between the elastomer, board, and surrounding field. Fix the mounting geometry and characterize unloaded signals before and after replacement. Test whether nearby magnetic or moving metallic components affect the measurements in your intended setup.',
          'Separate three checks: whether contact is detectable, whether the calibrated quantity is accurate, and whether using that quantity improves robot behavior. A high acquisition rate can help capture changes, but it does not establish a low-latency control loop or robust slip recovery.',
          'Compared with an optical fingertip, ReSkin supplies sparse magnetic measurements rather than a dense contact image. Its replaceable surface can suit different collection geometries, while the choice should follow the signals and validation resources required by the task.',
        ],
      },
      {
        heading: 'Source access and practical limits',
        body: [
          'The official project links the paper and an author-maintained repository containing software and hardware-related resources. The reviewed reskin_sensor repository carries an MIT license. Check licenses separately for any external data, models, or components you add.',
          'The review confirms public documentation and repository access on September 12, 2026. It does not confirm current commercial stock, fabrication yield, or plug-and-play compatibility with an arbitrary gripper. Use the project sources to identify the exact board, firmware, and elastomer process before building.',
        ],
      },
    ],
    faqs: [
      { question: 'Does ReSkin use a camera?', answer: 'The original ReSkin uses magnetometers beneath a magnetized elastomer. Its raw observations are magnetic-field and temperature readings, rather than tactile camera images.' },
      { question: 'How many channels does the original board provide?', answer: 'The paper describes five chips, each sending temperature and three magnetic components. That is 20 streamed values, including 15 magnetic channels. Derived contact or force estimates are separate outputs of a model.' },
      { question: 'Does replacing ReSkin require no calibration?', answer: 'The research evaluates cross-skin models and self-supervised adaptation. It does not establish that every replacement on every robot preserves a calibrated response without checks.' },
      { question: 'Is 400 Hz the robot control rate?', answer: 'Approximately 400 Hz is the sampling rate in the paper setup. Transport, inference, filtering, controller timing, and actuation add separate delays and must be measured for the application.' },
    ],
    relatedLinks: [
      { label: 'Sensor directory', href: '/sensors#sensor-reskin', description: 'Return to the ReSkin sensor record.' },
      { label: 'DIGIT guide', href: '/sensors/digit', description: 'Compare an optical fingertip and its direct image output.' },
      { label: 'GelSight Mini guide', href: '/sensors/gelsight-mini', description: 'Review optical sensing, reconstruction, and calibration.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'Place replaceable skin within the wider contact-sensing system.' },
      { label: 'Experimental evidence', href: '/benchmarks#experiment-evidence', description: 'See how test conditions and uncertainty accompany reported results.' },
    ],
    sources: [
      { label: 'Bhirangi et al.: ReSkin paper, hardware and experimental setup', href: 'https://arxiv.org/abs/2111.00071' },
      { label: 'ReSkin official project, CoRL 2021', href: 'https://reskin.dev/' },
      { label: 'Author-maintained library and MIT license: reviewed revision b82de2a', href: 'https://github.com/raunaqbhirangi/reskin_sensor/tree/b82de2a9e9300af3062b3d635a85a2365af14a98' },
      { label: 'Meta research announcement: thickness, rate, and durability context', href: 'https://ai.meta.com/blog/reskin-a-versatile-replaceable-low-cost-skin-for-ai-research-on-tactile-perception/' },
    ],
  },
];
