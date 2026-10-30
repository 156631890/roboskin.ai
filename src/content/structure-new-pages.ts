import type { SeoTopicPage } from '@/content/seo-topic-pages';
import release from '@/content/structure-release.json';

const shared = { updated: release.modifiedDate, published: release.modifiedDate, priority: 0.75, changeFrequency: 'monthly', schemaType: 'TechArticle', visualKey: 'technology' } as const;
const sensors = { label: 'tactile sensing', href: '/sensors', description: 'Sensing principles, specifications and task selection.' };
const datasets = { label: 'tactile datasets', href: '/datasets', description: 'Source-reviewed data for contact learning.' };
const skin = { label: 'robot skin', href: '/robot-skin', description: 'Robot coverings, integration and vendors.' };
const robotiq = { label: 'Robotiq adaptive gripper specifications', href: 'https://robotiq.com/hubfs/Product-sheets/Adaptive%20Grippers/Product-sheet-Adaptive-Grippers-EN.pdf' };

export const structureNewPages: SeoTopicPage[] = [
  {
    ...shared, path: '/robot-grippers', title: 'Robot Grippers: Types, Selection Guide (2026)',
    h1: 'Robot Grippers: Types, Selection Guide and Vendors',
    description: 'Compare robot gripper types and sourced models by payload, grip force, interface, contact sensing and price disclosure before selecting an end effector.',
    introduction: 'A robot gripper is the end effector that holds, releases or repositions an object at the end of a robot arm. Robot gripper selection starts with the object, contact geometry and load case, then the actuator and interface. The tables below separate gripper types from model-specific specifications so a payload rating is never mistaken for a measured grasp success rate.',
    kicker: 'End-effector selection', intent: 'Compare robot gripper types and select a sourced model for an actual contact task.', keywords: ['robot gripper', 'robot gripper types', 'gripper selection', 'tactile sensing'],
    quickAnswer: ['Choose the contact method from object geometry, surface leakage, fragility and the required placement accuracy.', 'Check the exact payload conditions, available grip force, tool mass and controller interface together. A form-fit payload is not a friction-grip guarantee.', 'Tactile sensor data can support contact detection or slip feedback, but the controller must actually consume it at the required latency.'],
    sections: [
      { heading: 'Robot gripper types and contact tradeoffs', body: ['The type comparison is an engineering selection framework. Numerical limits belong to individual products in the model table, not to the whole category.'], table: { headers: ['Type', 'Contact method', 'Useful object conditions', 'Main constraint', 'Tactile integration'], rows: [
        ['Parallel or adaptive fingers', 'Two opposing contact regions; adaptive links can wrap', 'Rigid parts and repeatable insertion geometry', 'Reach, friction, finger stiffness and jaw travel', 'Fingertip sensors or instrumented fingers'],
        ['Vacuum', 'Pressure difference across a sealed cup', 'Flat or sealable surfaces with accessible pickup area', 'Leakage, porosity, cup placement and loss of vacuum', 'Vacuum monitoring is not a spatial tactile map'],
        ['Soft fingers', 'Compliant fingers conform around the object', 'Fragile or variable shapes', 'Deformation changes pose and force transmission', 'Embedded or surface sensors require calibration under bending'],
        ['Magnetic', 'Magnetic attraction at the contact surface', 'Compatible ferromagnetic parts', 'Material compatibility, residual magnetism and release', 'Separate contact or force feedback may be needed'],
        ['Dexterous hand', 'Multiple articulated finger contacts', 'Reorientation and in-hand manipulation', 'Control, calibration and contact planning complexity', 'Distributed fingertips or skin; coverage is model-specific'],
      ] } },
      { heading: 'Selection sequence', body: ['Record object mass, dimensions, surface condition, centre of mass and the planned accelerations. Include gripper mass in the robot wrist load and moment budget. Check the manufacturer load case instead of translating a force rating directly into a payload.', 'Select jaw stroke or suction coverage, then confirm electrical supply, controller integration and mounting. Record force and slip observations with timestamps during a representative grasp test. Check release behaviour and dropped-part handling as well as successful pickup.'], table: { headers: ['Decision', 'Record before ordering', 'Reject the candidate when'], rows: [
        ['Payload', 'Mass, centre of mass, acceleration, orientation and tool mass', 'The documented load case does not cover the application'],
        ['Grip force', 'Adjustable range, contact area and permitted object deformation', 'Minimum force already damages the object or maximum force cannot retain it'],
        ['Interface', 'Protocol, controller support, update rate and power budget', 'Required feedback cannot reach the controller in time'],
        ['Contact points', 'Finger or cup geometry and accessible contact area', 'The object cannot be constrained without collision or leakage'],
        ['Price', 'Dated quote including tooling, controller, sensors and replacement pads', 'The integration cost exceeds the project budget'],
      ] } },
    ],
    faqs: [{ question: 'Does a soft gripper automatically measure touch?', answer: 'No. Mechanical compliance and tactile measurement are different properties. Check whether sensors are installed, which signals are exposed and how the controller uses them.' }, { question: 'Why are prices marked Not published?', answer: 'The reviewed manufacturer pages request a quote or do not disclose a usable model price. A reseller listing or an older quote is not silently substituted.' }],
    relatedLinks: [sensors, datasets, { label: 'robot tactile sensor models', href: '/robot-tactile-sensors', description: 'Model-specific sensing and integration fields.' }],
    sources: [robotiq, { label: 'OnRobot RG2-FT specifications', href: 'https://onrobot.com/en/products/rg2-ft-finger-gripper' }, { label: 'OnRobot VG10 specifications', href: 'https://onrobot.com/en/products/vg10-vacuum-gripper' }, { label: 'OnRobot Soft Gripper specifications', href: 'https://onrobot.com/en/products/soft-gripper' }],
  },
  {
    ...shared, path: '/electronic-skin', title: 'Electronic Skin (E-Skin): Materials and Uses', h1: 'Electronic Skin: Materials, Sensing Mechanisms and Uses',
    description: 'Electronic skin materials, sensing mechanisms and uses, with a comparison to robot skin and source-backed limits for pressure and contact measurements.',
    introduction: 'Electronic skin is a conformable sensing system that converts physical stimuli at a surface into electrical signals. Electronic skin can be mounted on a robot, a prosthesis or a wearable, so it is broader than a robotic covering. This page compares materials and measurement mechanisms; the robot skin guide covers whole-robot integration and vendor choices.',
    kicker: 'Materials and mechanisms', intent: 'Define electronic skin and distinguish its material-level sensing role from robot skin integration.', keywords: ['electronic skin', 'e-skin', 'electronic skin materials', 'robot skin'],
    quickAnswer: ['A flexible substrate alone is not electronic skin: the system needs sensing elements, electrical readout and a defined measurement.', 'Pressure, strain, temperature and vibration may require different sensing elements. One successful laboratory channel does not prove all of these capabilities.', 'Use robot skin for the complete installed covering and electronic skin for the sensing material or device architecture. The terms overlap when electronic skin is installed on a robot.'],
    sections: [
      { heading: 'Electronic skin versus robot skin', body: ['This distinction keeps material research separate from claims about a finished robotic system.'], table: { headers: ['Dimension', 'Electronic skin', 'Robot skin'], rows: [
        ['Primary scope', 'Conformable sensing materials, devices and readout', 'Covering installed on a physical robot'],
        ['Possible host', 'Robot, prosthesis, wearable or test fixture', 'Humanoid, robot arm, hand or other robot body'],
        ['Typical evidence', 'Sensitivity, range, hysteresis, drift and bending tests', 'Coverage, wiring, durability, calibration and controller use'],
        ['Mechanical requirement', 'Flexibility or stretchability appropriate to the device', 'Mounting, replaceability, abrasion resistance and safe contact'],
        ['What is not established', 'A material demonstration does not validate a robot policy', 'A soft cover does not establish distributed tactile sensing'],
      ] } },
      { heading: 'How the sensing mechanisms work', body: ['Piezoresistive devices change electrical resistance under deformation; capacitive devices change capacitance as electrode geometry or the dielectric changes. Piezoelectric devices generate charge under changing mechanical stress, while triboelectric devices use contact electrification and separation. The device structure and readout determine whether static pressure, dynamic contact or both can be measured. Sensor output still needs calibration, drift assessment and separation from bending or temperature effects.'], table: { headers: ['Mechanism', 'Typical material or structure', 'Measurement consideration'], rows: [
        ['Piezoresistive', 'Conductive composite, resistive network or patterned conductor', 'Separate contact response from strain, hysteresis and drift'],
        ['Capacitive', 'Electrodes with a compliant dielectric', 'Control parasitic capacitance, geometry and readout coupling'],
        ['Piezoelectric', 'Piezoelectric polymer or ceramic structures', 'Charge leakage and electronics affect low-frequency response'],
        ['Triboelectric', 'Paired contact surfaces with electrodes', 'Signal depends on contact history, separation and environment'],
      ] } },
      { heading: 'Materials and uses', body: ['Elastomers provide compliance; conductive fillers, films or patterned electrodes provide electrical pathways. Microstructured surfaces can change contact area and sensitivity, but quoted sensitivity must be tied to a pressure interval and loading method.', 'Robot contact patches, prosthetic interfaces and wearable measurement patches place different demands on packaging, wiring and durability. For a robot, evaluate repeated loading on the actual mounting surface and check how replacement or bending changes the calibration.'], table: { headers: ['Use', 'Relevant observation', 'Evidence to request'], rows: [
        ['Robot fingertips or body patches', 'Local pressure or distributed contact', 'Coverage map, timing, calibration and repeated-load data'],
        ['Prosthetic interfaces', 'Contact or fit at the interface', 'Mechanical compatibility and application-specific validation'],
        ['Wearable research patches', 'Deformation or surface stimuli', 'Drift, attachment conditions and comparison with a reference'],
      ] } },
    ],
    faqs: [{ question: 'Are electronic skin and robot skin synonyms?', answer: 'They overlap but are not interchangeable. Electronic skin describes the sensing device architecture; robot skin describes the installed covering and its integration on a robot.' }, { question: 'Does high sensitivity prove useful robot touch?', answer: 'No. The usable force or pressure range, spatial coverage, bandwidth, hysteresis, durability and controller integration must also match the task.' }],
    relatedLinks: [skin, sensors, { label: 'robot skin versus e-skin', href: '/guides/robot-skin-vs-e-skin', description: 'Terminology and integration boundaries.' }],
    sources: [{ label: 'Electronic skin pressure-sensor mechanisms and materials review', href: 'https://www.mdpi.com/1424-8220/20/16/4407' }, { label: 'Microstructured dielectric pressure sensors: original research', href: 'https://www.nature.com/articles/nmat2834' }, { label: 'Skin-inspired organic digital mechanoreceptor: original research', href: 'https://doi.org/10.1126/science.aaa9306' }],
  },
  {
    ...shared, path: '/robot-tactile-sensors', title: 'Robot Tactile Sensors: Models and Selection', h1: 'Robot Tactile Sensor Models: Specs and Selection',
    description: 'Robot tactile sensor models compared by sensing type, force range, sampling rate, interface and vendor, with sources and explicit unknown specifications.',
    introduction: 'A robot tactile sensor is a device that measures contact at a robot surface and exposes a signal for perception or control. Robot tactile sensor selection depends on the contact geometry, force range, sampling path and integration interface. The model library below preserves the source-review date for each record and separates published specifications from missing information.',
    kicker: 'Model library', intent: 'Select robot tactile sensor models using source-specific specifications, not a duplicate sensing-principles guide.', keywords: ['robot tactile sensor', 'tactile sensor models', 'sensor force range', 'tactile sensing'],
    quickAnswer: ['The library contains 17 existing sensor records. It is a tracked set, not a complete market census.', 'Specifications are taken from the linked manufacturer documentation or original research sources. No unreported rate, interface or force range is inferred from a related product.', 'Review is manual and event-driven: check a record when its source release changes or a correction arrives. There is no automatic refresh; the date on each row records the evidence actually reviewed.'],
    sections: [
      { heading: 'Choose the model after defining the measurement', body: ['Start with the required contact footprint and signal: a taxel array, a reconstructed surface, an estimated force or a dynamic vibration channel. Compare normal and shear force only when calibration, loading geometry and units match.', 'An image frame rate, USB transport rate and calibrated force update rate are different values. If the source does not establish the quantity required by your controller, record it as an unresolved integration requirement.'], table: { headers: ['Field', 'What to compare', 'What not to assume'], rows: [
        ['Type', 'Transduction principle and contact surface geometry', 'All sensors in one family have the same spatial resolution'],
        ['Force range', 'Normal and shear limits with the calibration conditions', 'A raw pressure count is calibrated force'],
        ['Sampling rate', 'Sensor refresh, transport and processing rate separately', 'A fast transport stream proves the same closed-loop bandwidth'],
        ['Interface', 'Electrical connection, API and timestamp behaviour', 'A public repository supports every hardware revision'],
        ['Vendor or research group', 'Exact model, release and available documentation', 'A laboratory prototype is currently orderable'],
      ] } },
      { heading: 'Verify a candidate in the intended contact task', body: ['Use a reference load and a repeatable fixture to record the unloaded baseline, loading and unloading curves, repeatability and drift. Check timestamp alignment with the robot state before comparing a policy result.', 'For slip detection, use independently labelled slip events. For insertion, record geometry and contact-force limits. Keep these task measurements alongside the model revision and mounting details so another run can reproduce the conditions.'] },
    ],
    faqs: [{ question: 'Why do some sensor fields say Not published?', answer: 'No applicable value was established in the reviewed source. This does not mean zero capability, nor that the manufacturer has no additional private documentation.' }, { question: 'Are the model rows ranked?', answer: 'No. They have different contact areas, sensing outputs and test protocols. The table is a selection record, not a shared performance leaderboard.' }],
    relatedLinks: [sensors, datasets, { label: 'tactile robotics benchmarks', href: '/benchmarks', description: 'Task protocols and comparison limits.' }],
    sources: [{ label: 'DIGIT original sensor paper', href: 'https://arxiv.org/abs/2005.14679' }, { label: 'Robotiq TSF-85 user guide', href: 'https://robotiq.com/hubfs/Tactile%20Sensor%20Fingertips/Tactile%20Sensors%20TSF-85%20-%20User%20Guide.pdf' }],
  },
  {
    ...shared, path: '/humanoid-robot-companies', title: 'Humanoid Robot Companies: Tracked Directory', h1: 'Humanoid Robot Companies: A Tracked Directory (2026)',
    description: 'Tracked humanoid robot companies: founding year, location, robot models, tactile approach, official sources and row-level verification dates.',
    introduction: 'The humanoid robot companies directory is a source-checked list of businesses developing physical humanoid robots. Humanoid robot companies differ in their robot embodiments, deployment claims and published tactile hardware. This directory records five companies with official product or company sources; inclusion is not a ranking, investment assessment or confirmation of general autonomy.',
    kicker: 'Company directory', intent: 'Track humanoid robot companies and distinguish published touch hardware from missing disclosure.', keywords: ['humanoid robot companies', 'humanoid company directory', 'humanoid tactile sensing'],
    quickAnswer: ['Five companies are currently tracked. Count each company once, even when it lists several robot models.', 'Each row links company or product sources and carries a Last verified date. Verification means an editorial source check, not a factory visit or hardware test.', 'Review is manual and event-driven when a company, model or sensor release changes. No automatic monitoring or daily revalidation is claimed.'],
    sections: [
      { heading: 'How companies enter the directory', body: ['Include a company when an official source identifies a physical humanoid model and the organisation responsible for it. Exclude software-only providers and speculative projects without an identifiable official product source.', 'Founding year and location are separate claims from product capability. The location field uses the cited company location; it is not an inference about where every robot is manufactured. Not published means the linked source did not establish the requested field.'], table: { headers: ['Field', 'Verification rule', 'Important limit'], rows: [
        ['Company and model', 'Official company or product page', 'An announcement is not proof of customer deployment'],
        ['Founded and location', 'Company history, contact page or company-issued announcement', 'A historical office address may not be the present headquarters'],
        ['Tactile approach', 'Explicitly documented sensors or contact feedback', 'A soft cover or dexterous hand alone does not prove tactile arrays'],
        ['Last verified', 'Date the cited page was checked', 'Does not imply independent testing or automatic monitoring'],
      ] } },
      { heading: 'Read tactile claims at the model level', body: ['A company can sell multiple hand configurations. Optional tactile arrays must stay labelled optional; they cannot be applied to every robot from that vendor. Force control also differs from measuring a spatial contact map.', 'For integration, request the sensor interface, calibrated range, bandwidth, replacement procedure and controller access for the exact configuration. Compare the published embodiment with the task and dataset before treating a demonstration as transferable evidence.'] },
    ],
    faqs: [{ question: 'Is this a complete list of humanoid robot companies?', answer: 'No. It is a five-company tracked directory with explicit inclusion rules and dated sources. It does not claim market coverage or a sales ranking.' }, { question: 'Does a published tactile approach prove autonomous manipulation?', answer: 'No. A sensor specification, a demonstration and a repeatable autonomous task evaluation are different evidence levels.' }],
    relatedLinks: [skin, sensors, { label: 'VLA robotics', href: '/robot-vla-models', description: 'Robot policy inputs and released model evidence.' }],
    sources: [{ label: 'Agility company history and locations', href: 'https://www.agilityrobotics.com/company-overview' }, { label: 'Apptronik company and Apollo announcement', href: 'https://apptronik.com/news-collection/apptronik-unveils-apollo' }, { label: 'Figure 03 tactile hardware announcement', href: 'https://www.figure.ai/news/introducing-figure-03' }, { label: '1X company history and location', href: 'https://www.1x.tech/about' }, { label: 'Unitree company history', href: 'https://www.unitree.com/about/' }],
  },
  {
    ...shared, path: '/embodied-ai', title: 'Embodied AI: Methods and Physical AI Compared', h1: 'Embodied AI Explained: Methods and How It Differs from Physical AI',
    description: 'Embodied AI defined through perception, action and feedback: core learning methods, evaluation limits and a comparison with Physical AI.',
    introduction: 'Embodied AI is artificial intelligence studied or deployed through an agent that perceives and acts in an environment with a body or simulated embodiment. Embodied AI connects observations to actions and evaluates their consequences. The definition includes simulated agents; a successful simulation is not by itself evidence that a physical robot will work outside the simulator.',
    kicker: 'Definition and methods', intent: 'Explain embodied AI methods and the difference from Physical AI without competing for a broad Physical AI hub.', keywords: ['embodied AI', 'embodied AI methods', 'embodied AI vs Physical AI'],
    quickAnswer: ['Embodiment constrains what an agent can observe, reach and do. Evaluate the policy together with its sensors, action space and environment.', 'Imitation learning, reinforcement learning, model-based planning and multimodal policies are methods that can be used in embodied systems. None alone establishes general capability.', 'Physical AI is commonly used for AI systems interacting with the physical world. The terms overlap in robotics, but their boundaries are not a universal technical standard.'],
    sections: [
      { heading: 'Embodied AI versus Physical AI', body: ['The table describes common usage rather than a formal taxonomy. State the embodiment and evaluation setting instead of relying on the label alone.'], table: { headers: ['Question', 'Embodied AI', 'Physical AI'], rows: [
        ['Emphasis', 'Intelligence shaped by perception, action and an environment', 'AI interacting with or modelling physical systems'],
        ['Does it require a physical robot?', 'No; simulated embodied agents are widely studied', 'Often physical deployment, though simulation is used for development'],
        ['Typical tasks', 'Navigation, instruction following and object manipulation', 'Robot operation, autonomous systems and physical-world control'],
        ['Shared robotics case', 'A robot policy learns from the results of its actions', 'The same policy drives a physical robot with sensor feedback'],
        ['Evidence boundary', 'State embodiment, observations, actions and evaluation environment', 'Separate simulation results from physical-system measurements'],
      ] } },
      { heading: 'Methods from observations to actions', body: ['Choose a method from the available demonstrations, reward information, dynamics model and compute budget. A language interface can specify a task while a separate controller still executes the physical motion.'], table: { headers: ['Method', 'Training or planning signal', 'What to report'], rows: [
        ['Imitation learning', 'Recorded demonstrations or action trajectories', 'Demonstration coverage, action representation and held-out tasks'],
        ['Reinforcement learning', 'Rewards from environment interaction', 'Reward definition, training environment and intervention policy'],
        ['Model-based planning', 'Predicted outcomes under candidate actions', 'Prediction horizon, model error and replanning conditions'],
        ['Vision-language-action policies', 'Images and instructions mapped to robot actions', 'Accepted inputs, embodiment adapter, released weights and task evidence'],
        ['Multimodal contact policies', 'Vision, proprioception and measured touch', 'Sensor calibration, timing and contribution relative to a no-touch baseline'],
      ] } },
      { heading: 'Evaluation follows the embodiment', body: ['Report task success criteria, the number of trials, objects, scene changes and human interventions. A policy evaluated on one hand or sensor cannot be assumed to transfer to a different action space or calibration.', 'Simulation is useful for controlled comparisons, but contact friction, deformation, latency and sensing errors can differ in the real world. For manipulation, carry the contact measurements and failure definitions into the physical evaluation.'] },
    ],
    faqs: [{ question: 'Is a chatbot automatically an embodied AI system?', answer: 'A text interface alone does not establish embodiment. Identify the environment, observations, action interface and feedback loop before applying the term.' }, { question: 'Where does tactile AI fit?', answer: 'Tactile AI interprets contact signals. It can supply observations, representations or feedback to an embodied policy; it does not replace the robot controller or establish task success by itself.' }],
    relatedLinks: [{ label: 'VLA robotics', href: '/robot-vla-models', description: 'Compare vision-language-action policy evidence.' }, { label: 'tactile AI', href: '/tactile-ai', description: 'From contact measurements to learned representations.' }, { label: 'Physical AI', href: '/physical-ai', description: 'Physical-world systems and the touch feedback loop.' }],
    sources: [{ label: 'Brooks: Intelligence without representation', href: 'https://doi.org/10.1016/0004-3702(91)90053-M' }, { label: 'Open X-Embodiment: datasets and RT-X models', href: 'https://arxiv.org/abs/2310.08864' }, { label: 'OpenVLA project and policy evidence', href: 'https://openvla.github.io/' }],
  },
];
