import type { SeoTopicPage } from './seo-topic-pages';

const nist = { label: 'Van Wyk and Falco (2018): slip detection protocol and operating-condition effects', href: 'https://www.nist.gov/publications/slip-detection-analysis-and-calibration-univariate-tactile-signals' };
const spatial = { label: 'Moussaoui et al. (2023): spatial calibration on the HRP-4C wrist, sections 3–5', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10181520/' };
const capacitive = { label: 'Maiolino et al.: capacitive skin integration, mechanics and thermal compensation', href: 'https://arxiv.org/html/1411.6837v1' };
const opentac = { label: 'OpenTac v1 (October 22, 2026): developable surfaces and partial readout', href: 'https://arxiv.org/html/2610.31661v1' };
const origami = { label: 'Xu et al. (March 25, 2026): origami capacitive e-skin and non-adjacent loads', href: 'https://www.nature.com/articles/s41528-026-00563-3' };
const digit = { label: 'Lambeta et al. (2020): original DIGIT design and manipulation experiment', href: 'https://arxiv.org/abs/2005.14679' };
const cmu = { label: 'CMU Softbotics: electronic skin research scope', href: 'https://engineering.cmu.edu/softbotics/research/electronic-skin.html' };

type Section = SeoTopicPage['sections'][number];
export const sensingIntegrationDepth: Record<string, Section[]> = {
  '/guides/flexible-tactile-sensor-array': [
    {
      id: 'array-measurement-contract', heading: 'Specify the array that is actually sampled',
      body: [
        'An array specification needs three maps: physical sensing locations, electrical readout addresses, and positions on the mounted robot. Keep a stable element ID across all three. An attractive interpolated heatmap does not reveal missing elements, simultaneous versus sequential acquisition, or which values were reconstructed.',
        'OpenTac illustrates why the readout qualifier matters. Its October 2026 preprint reports 67 full raster frames/s for a 1,024-taxel skin, versus 1,286 partial frames/s when reading 16 taxels per update. These are different acquisition budgets, not interchangeable whole-surface rates. The paper also limits its flex-PCB approach to planar or developable surfaces; bending is not evidence of stretchability. These are author reports, not RoboSkin measurements.',
      ],
      table: { headers: ['Required field', 'What to record', 'Decision it supports'], rows: [
        ['Coverage', 'Active patch geometry, seams, uncovered joints and installed orientation.', 'Whether likely contact can occur in an unobserved region.'],
        ['Acquisition', 'Element IDs, sample time, update mask, sequence number and scan mode.', 'Whether an old or unobserved value is being presented as fresh contact data.'],
        ['Measurement', 'Raw units, calibrated outputs, valid range and calibration version.', 'Whether a pressure, force or intensity comparison is meaningful.'],
        ['Spatial registration', 'Cell center and normal in a named robot frame; mapping revision.', 'Whether the controller can locate and orient the measured contact.'],
      ] },
      links: [opentac, { label: 'OpenTac manufacturing and readout evidence', href: '/research/opentac-custom-tactile-skins-readout-limits-2026' }],
    },
    {
      id: 'mounted-array-validation', heading: 'Validate geometry separately from force calibration',
      body: [
        'A force calibration maps a signal to a load under stated conditions. Spatial calibration locates the sensing element and its normal on the robot. Passing one does not establish the other. Moving a patch or replacing its mounting layer can change the spatial map even when its electronics are unchanged.',
        'The 2023 HRP-4C wrist study used a 6 × 22-cell array and reported a 4.2 mm mean position error against its reference. The separately discussed 1.7 mm is the excess above an ideal-cell error estimate, not the total measured error. Its smooth wrist-surface validation does not establish performance on every deforming robot. Retain the reference, geometry and error definition with any number used in a comparison.',
      ],
      subsections: [{ heading: 'A mounted-patch acceptance sequence', body: [
        'First inspect the no-contact baseline at the intended mounting states. Next apply known contacts at cell centers, edges and seams, and compare both the reported location and the intended output. Then repeat after remounting and across the relevant operating conditions. This is a proposed integration plan, not a universal standard or an experiment performed here.',
        'Treat unobserved cells as unknown, not zero pressure. Test contacts outside the adaptive readout region and inspect how the system reacquires them. Record loss of contact information separately from a confirmed absence of contact.',
      ] }],
      links: [spatial, { label: 'Design a calibration validation split', href: '/guides/tactile-sensor-calibration#validation-matrix' }, { label: 'Check robot-ready timestamps and frames', href: '/guides/ros2-tactile-sensing' }],
    },
  ],
  '/guides/slip-detection-robot-hand': [
    {
      id: 'slip-labels-and-splits', heading: 'Define slip labels before comparing accuracy',
      body: [
        'Incipient slip, gross sliding and a dropped object are different events. Define which one the detector predicts and how an independent reference identifies its onset. A sensor-derived label can be useful, but evaluating against the same signal that defines the label can hide common errors. Record ambiguous contacts and the rule for excluding them.',
        'Van Wyk and Falco’s 2018 study examined three tactile sensor technologies and varied window size, sample rate, material, sliding speed and sensor instance. Its finding is that these conditions affect detector performance; it is not a current certification of any commercial product or evidence that a classifier alone prevents drops.',
      ],
      table: { headers: ['Test split', 'What it tests', 'What it does not establish'], rows: [
        ['Separate complete grasp episodes', 'Performance without sharing adjacent windows from the same event across train and test.', 'Transfer to an unseen object or replacement sensor.'],
        ['Held-out objects or materials', 'Generalization across the explicitly withheld object properties.', 'Performance at every slip speed, load or surface condition.'],
        ['Held-out sensor instances', 'Sensitivity to manufacturing, mounting and surface differences.', 'Unchanged performance after arbitrary wear or cleaning.'],
        ['Closed-loop perturbation trials', 'Whether a specified response changes the final grasp outcome.', 'A general safety guarantee beyond the tested task.'],
      ] },
      links: [nist, { label: 'Calibration holdouts and uncertainty', href: '/guides/tactile-sensor-calibration#validation-matrix' }],
    },
    {
      id: 'slip-event-to-recovery', heading: 'Measure the path from an event to a useful recovery',
      body: [
        'Report false alarms per stated exposure, missed events per labeled slip event, and the distribution of detection delay relative to the reference onset. Window-level accuracy can look strong when long periods without slip dominate the dataset. Report the denominators rather than converting all three measurements into one percentage.',
        'Illustrative arithmetic, not a sensor result: collecting 50 samples at 1,000 samples/s takes about 50 ms. A sliding-window detector may update more often, but its input still contains that history. Transfer, inference, decision scheduling and actuator response add separate delays. Neither a sampling rate nor an inference-only timing proves that the gripper can respond before the object escapes.',
      ],
      subsections: [{ heading: 'Compare outcomes with the same recovery budget', body: [
        'Define the allowable grip change, robot motion and object-damage limit before the trial. Compare a baseline and a tactile-enabled controller with the same objects, perturbations and intervention rules. Count drops, damage, successful placements and human rescues separately; a stronger squeeze that prevents a drop but crushes the object is not a successful recovery.',
        'An alarm can also be caused by intentional sliding or a contact transition during placement. Log the task phase and the response chosen. When the sensor is stale or uncertain, use a separately engineered fallback rather than silently treating the estimate as reliable. This checklist is editorial evaluation guidance; no closed-loop trial was run for this page.',
      ] }],
      links: [{ label: 'Specify the complete timing chain', href: '/guides/how-to-choose-a-tactile-sensor#data-and-timing' }, { label: 'Design a gripper trial', href: '/applications/robot-gripper-tactile-sensor#gripper-trial-design' }],
    },
  ],
  '/applications/robot-gripper-tactile-sensor': [
    {
      id: 'gripper-state-evidence', heading: 'Specify what changes at each grasp phase',
      body: ['A useful integration brief connects an observation to a permitted action. The following is a proposed task breakdown, not a claim that every tactile gripper supports these signals or actions. A local pad measurement and a wrist load measurement answer different questions, so retain both frames and contact assumptions when combining them.'],
      table: { headers: ['Phase', 'Evidence to log', 'Decision and unresolved risk'], rows: [
        ['Close and seat', 'Which pad regions contact, jaw position and commanded load.', 'Whether the object is seated; a local contact does not rule out off-pad collision.'],
        ['Lift and hold', 'Reference object motion, tactile event time and controller action.', 'Whether a suspected slip needs a response; define allowable load and object damage separately.'],
        ['Transfer', 'Changes in contact during acceleration and external disturbance.', 'Whether the observation is slip, commanded motion or a changing contact geometry.'],
        ['Place and release', 'Support/contact transition, release command and final object state.', 'Whether unloading was intentional; avoid treating every falling signal as a fault.'],
      ] },
      subsections: [{ heading: 'The pad changes the grasp as well as the measurement', body: [
        'A sensor cover changes contact geometry, compliance and friction. If a new pad improves grasp success, that alone does not isolate the value of its data. Use the same physical pad in a signal-disabled baseline when feasible, and document any controller or grip-force differences. If that comparison cannot be made, report the mechanical and sensing change together.',
        'The original DIGIT work demonstrates a specific optical sensor and learned glass-marble manipulation system. It does not establish compatibility or a success rate for an arbitrary industrial gripper. Start from the exact jaw adapter, active surface, wiring route and output interface of the intended build.',
      ] }],
      links: [digit, { label: 'Match documented outputs before choosing a sensor', href: '/guides/tactile-sensor-for-robots#output-contract' }],
    },
    {
      id: 'gripper-trial-design', heading: 'Turn a demonstration into an acceptance trial',
      body: [
        'State the object families, initial poses, permitted retries and definition of successful placement before collecting results. Include difficult cases such as edge contacts or partial pad contact when they belong to the intended task. Count every initiated trial, including aborted attempts; give separate results for success on the first attempt and success after recovery.',
        'Keep a trial ledger containing object ID, pad and calibration revision, controller version, initial pose, disturbance, contact event, response time, final outcome and damage. Report maintenance interventions and missing records. This turns a video demonstration into a reviewable protocol without inventing a universal pass threshold.',
      ],
      subsections: [{ heading: 'Stop conditions and handoff', body: [
        'Decide in advance which uncertainty requires holding a trial: an unmapped contact region, saturated output, stale samples, an incompatible replacement pad or a failed independent reference. Qualification belongs to the complete installed configuration, so a passing sensor-only calibration is not the final acceptance decision.',
        'For a literature or vendor-evidence gap, prepare a source brief with the required signal and operating conditions. RoboSkin’s research service can organize public evidence; it does not physically qualify your gripper or certify its safety.',
      ] }],
      links: [{ label: 'Slip labels and recovery evaluation', href: '/guides/slip-detection-robot-hand#slip-event-to-recovery' }, { label: 'Download the blank acceptance record', href: '/tutorials/tactile-selection/acceptance-record.csv', download: true }, { label: 'Research-service scope', href: '/research-services' }],
    },
  ],
  '/applications/soft-robotic-skin': [
    {
      id: 'soft-skin-deformation', heading: 'Separate external contact from the robot’s own deformation',
      body: [
        'A soft structure can change its sensor readings when it bends or stretches without touching an object. Establish the no-contact response over the intended actuation range before assigning a change to external contact. Then repeat known contacts at multiple poses. Otherwise a model can learn actuator state or mounting strain while appearing to estimate contact.',
        'Use flexible for bending, stretchable for elongation, and compliant for deformation under load. A device may have one property without the others. OpenTac’s flex-PCB construction, for example, targets planar and developable surfaces; it is not a general stretchable coating for arbitrary soft-robot motion.',
      ],
      table: { headers: ['Condition', 'Comparison to make', 'Failure to investigate'], rows: [
        ['Actuation without contact', 'Reference pose or strain versus the unloaded sensor response.', 'Robot motion is classified as external touch.'],
        ['Known contact at different poses', 'Same reference contact under different installed geometries.', 'A flat calibration fails when the surface bends.'],
        ['Load and unload', 'Response at matched loads approached from both directions.', 'History-dependent output is hidden by a single fitted curve.'],
        ['Remount or replace', 'New configuration against the retained reference protocol.', 'A mechanically fitting replacement invalidates the learned map.'],
      ] },
      links: [opentac, capacitive, { label: 'Calibration reuse, checks and refitting', href: '/guides/tactile-sensor-calibration#calibration-release-decision' }],
    },
    {
      id: 'soft-skin-evidence', heading: 'Read a material result at its tested scale',
      body: [
        'The March 2026 origami capacitive e-skin paper reports a 60,000 mm² prototype and discusses multi-point sensing for non-adjacent loads. Its geometry and tested contact arrangement are part of the result. Neither surface area nor single-contact localization establishes that neighboring simultaneous contacts can be separated on a different robot.',
        'For an engineering comparison, request the contact shape, deformation state, loading direction, reference instrument and held-out conditions. Keep sensing response, mechanical recovery and full data-delivery delay separate. A fast electrical response does not establish that a deformed surface has mechanically returned to its baseline.',
        'The matrix above is a proposed evaluation plan. Choose acceptance limits from the actual task and damage constraints; the cited prototypes do not supply universal industrial, medical or human-contact safety limits. No material or robot was tested by RoboSkin for this guide.',
      ],
      links: [origami, { label: 'Register a mounted array to robot geometry', href: '/guides/flexible-tactile-sensor-array#mounted-array-validation' }, { label: 'Soft-skin research example and limitations', href: '/research/single-material-soft-robotic-skin-2025' }],
    },
  ],
  '/guides/robot-skin-vs-e-skin': [
    {
      id: 'skin-terms-evidence', heading: 'Use the experimental object to interpret the label',
      body: [
        'These terms are research and engineering vocabulary, not mutually exclusive certification classes. CMU’s electronic-skin research includes sensing, control, communications and human-machine interfaces. E-skin is therefore not restricted to a passive sensing film. In this guide, robot skin emphasizes installation and use on a robot; it does not imply that other e-skin systems lack electronics or processing.',
        'Read the methods before inferring readiness from a title. A paper can legitimately describe e-skin while testing a material coupon, a wearable interface or a robot-mounted array. Those experiments answer different questions, and none should be promoted to the next level without evidence.',
      ],
      table: { headers: ['Source demonstrates', 'Useful evidence', 'Next unresolved question'], rows: [
        ['A sensing material or coupon', 'Transduction and response under the described load and environment.', 'Does the installed cover preserve that response?'],
        ['A wearable interface', 'Input interpretation on a person under the stated study conditions.', 'Does it measure robot contact with the needed geometry and dynamics?'],
        ['A mounted robot surface', 'Coverage, wiring and spatially registered observations.', 'Can a controller use these observations within the required timing and fault limits?'],
        ['A closed-loop task', 'An action and outcome on the tested robot and objects.', 'Which conditions, replacements and new tasks remain outside validation?'],
      ] },
      links: [cmu, spatial],
    },
    {
      id: 'skin-brief-handoff', heading: 'Write a requirements brief that survives terminology changes',
      body: [
        'Specify the surface to cover, expected contact, measured quantity, allowed deformation, reference method and data interface. Then request evidence at the level of the intended use. This prevents a supplier’s broad skin label from standing in for a calibrated pressure map or a robot-control integration.',
        'An engineering brief might require contact location on a curved forearm; another might require a learned grasp policy using fingertip images. Those are illustrative requirements, not customer cases. They call for different evaluation protocols even if both suppliers use the term e-skin. Use the component-versus-system guide for ownership of calibration and maintenance, and the array guide for geometric registration.',
      ],
      links: [{ label: 'Component versus system responsibilities', href: '/guides/robot-skin-vs-tactile-sensor#integration-responsibilities' }, { label: 'Flexible array geometry and sampling', href: '/guides/flexible-tactile-sensor-array#array-measurement-contract' }],
    },
  ],
  '/guides/robot-skin-vs-tactile-sensor': [
    {
      id: 'integration-responsibilities', heading: 'Assign responsibilities beyond the sensor purchase',
      body: [
        'A sensor datasheet and a robot-skin acceptance record have different boundaries. The datasheet describes a device and its stated conditions. The installed-system record must connect that device to coverage, coordinate frames, software versions and a robot task. The following responsibility matrix is an editorial procurement tool, not a claim about any vendor’s service contract.',
      ],
      table: { headers: ['Layer', 'Evidence to hand over', 'Owner to name in the project'], rows: [
        ['Component', 'Revision, raw interface, valid range and supplied calibration.', 'Who confirms the delivered sensor matches the documentation?'],
        ['Installed surface', 'Active coverage, seams, mounting and protective material.', 'Who checks that the cover does not invalidate the measurement?'],
        ['Data path', 'Element identity, clock, units, frames, invalid flags and software versions.', 'Who detects stale samples and mapping changes?'],
        ['Robot behavior', 'Task protocol, allowed actions, failure response and outcome records.', 'Who qualifies the complete integration and its operating limits?'],
        ['Service', 'Replacement parts, calibration checks and configuration history.', 'Who decides whether a serviced system can return to use?'],
      ] },
      links: [capacitive, { label: 'Installed-array mapping requirements', href: '/guides/flexible-tactile-sensor-array#array-measurement-contract' }],
    },
    {
      id: 'component-to-system-example', heading: 'Why a component improvement can leave a system gap',
      body: [
        'Consider a hypothetical replacement fingertip with finer contact images. If its active area misses an edge contact, or its output arrives after the useful response window, the improved image does not solve the task. Conversely, a modest-resolution sensor can be sufficient when the required decision is a well-defined contact transition. These are decision examples, not a comparative hardware test.',
        'The capacitive iCub research documents system concerns including networking, surface mechanics and thermal drift. It supports evaluating the installation around a sensing element; it does not justify transferring one device’s performance to a different robot skin. Preserve which quantities were calibrated and on which installed revision.',
        'Before buying more sensors, identify the current bottleneck: an unobserved region, an unstable measurement, a data interface or an unvalidated action. The next useful evidence differs for each. Keep the sensor-selection worksheet for component decisions and the calibration record for the installed configuration.',
      ],
      links: [capacitive, { label: 'Choose a sensor against a task-specific acceptance record', href: '/guides/how-to-choose-a-tactile-sensor#acceptance-trial' }, { label: 'Plan calibration and holdouts', href: '/guides/tactile-sensor-calibration' }, { label: 'Optical-surface replacement boundaries', href: '/guides/optical-tactile-sensor-maintenance' }],
    },
  ],
  '/guides/robot-touch-sensor': [
    {
      id: 'touch-signal-contract', heading: 'Distinguish no contact from no valid measurement',
      body: [
        'A zero value is meaningful only when the interface defines it. It may mean no contact, a calibrated baseline, saturation in a transformed signal or an uninitialized field. Preserve a separate validity flag and acquisition time rather than converting missing samples to zero. Otherwise a robot can interpret a disconnected sensor as an empty contact surface.',
        'For a first integration, define four states: valid no-contact observation, valid contact observation, uncertain observation and unavailable data. Define the transition rule and the permitted downstream behavior for each. This is an interface-design checklist; it is not a safety-rated control design.',
      ],
      subsections: [{ heading: 'Make the first test diagnostic', body: [
        'Record raw samples alongside an independent reference event. Include contact, release and no-contact motion of the mechanism. Change one factor at a time when diagnosing a false trigger: mounting, cable motion, load direction or processing settings. Keep the original samples so a later threshold change can be evaluated without relabeling the test set to fit the result.',
        'The NIST slip study is a useful example of sensitivity to operating conditions, not a generic contact-switch specification. Your first contact test should answer its own narrower question before adding classification, force estimation or a grasp-recovery controller.',
      ] }],
      links: [nist, { label: 'Keep missing and invalid tactile samples visible', href: '/guides/python-tactile-data-processing' }, { label: 'Timing and frame checks for a robot data pipeline', href: '/guides/ros2-tactile-sensing' }],
    },
  ],
  '/guides/tactile-sensor-for-robots': [
    {
      id: 'output-contract', heading: 'Ask for an output contract, not just a sensor category',
      body: [
        'Before choosing a model, ask for one representative raw record and the transformation that produces the advertised output. Identify the reference frame, units, calibration version and invalid-data convention. An interface that returns an image can be entirely appropriate for a learned policy, but it is not automatically an interface that returns calibrated force.',
        'Separate three layers in the comparison: the physical transducer, the estimator and the task controller. Changing the estimator can alter the usable output without changing the sensor; changing the contact surface can invalidate the estimator while leaving the electrical interface intact. Record both hardware and processing versions.',
      ],
      table: { headers: ['Advertised output', 'Clarify before integration', 'Evidence to retain'], rows: [
        ['Force vector', 'Local or robot frame; normal/shear axes; total or per-element load.', 'Reference calibration and error over the intended contact conditions.'],
        ['Contact map', 'Measured elements, interpolation, timestamps and inactive regions.', 'Element geometry, update mask and mounted spatial calibration.'],
        ['Depth or shape', 'Coordinate convention, reconstruction model and surface baseline.', 'Held-out geometry tests; force accuracy is a separate claim.'],
        ['Slip or material class', 'Label definition, operating conditions and confidence interpretation.', 'Independent labels and task-relevant held-out evaluation.'],
      ] },
      links: [digit, { label: 'Compare array measurement contracts', href: '/guides/flexible-tactile-sensor-array#array-measurement-contract' }, { label: 'Move from output requirements to a shortlist', href: '/guides/how-to-choose-a-tactile-sensor#compare-measurement-claims' }],
    },
  ],
};
