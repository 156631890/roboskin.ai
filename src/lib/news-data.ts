export interface NewsSource {
  title: string;
  url: string;
}

export interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  updated: string;
  readTime: string;
  category: string;
  image: string;
  sourceTitle: string;
  sourceUrl: string;
  sources: NewsSource[];
  technicalFocus: string[];
}

export type NewsSummary = Pick<
  NewsPost,
  'id' | 'title' | 'excerpt' | 'category' | 'date' | 'updated' | 'readTime' | 'technicalFocus'
>;

export const newsPosts: NewsPost[] = [
  {
    id: 'underwater-self-healing-electronic-skin-nus-2026',
    title: 'Underwater self-healing electronic skin combines touch, damage detection, and repair',
    excerpt:
      'NUS researchers combined self-powered touch sensing, damage detection, and underwater self-repair in one electronic skin system for soft robotics and marine machines.',
    content: `# Underwater self-healing electronic skin combines touch, damage detection, and repair

**News brief - July 2026**

The National University of Singapore reported a self-healing magnetoelectric sensory system that can sense touch and proximity, detect damage, and recover after damage in both air and water. The research targets a practical weakness in electronic skin: a soft sensor may perform well when new but lose value quickly if a puncture, cut, or harsh environment disables it.

## What the researchers reported

The system combines a damage-sensing layer with an electromagnetic sensing layer. Both use a stretchable, self-healing elastomer with liquid-metal conductors. The NUS team demonstrated the technology in a smart diving glove and in a robotic hand that grasped objects under water while monitoring damage.

The university reports that the material reached up to 92% elastic recovery. Under mild heating, it reached about 82% healing efficiency in air after seven days and nearly 100% under water after ten days. After needle punctures, the sensor recovered its original electrical performance within seconds; larger cuts required contact pressure and a longer healing period.

## Why this matters for robot skin

Robot skin is exposed by design. It sits on hands, grippers, arms, soft bodies, and contact surfaces where abrasion, cuts, moisture, and repeated deformation are normal operating conditions. That makes recovery behavior as important as initial sensitivity.

The research also connects three functions that are often evaluated separately: sensing the environment, detecting damage to the sensor itself, and restoring useful operation. For field robots, this could reduce the gap between a laboratory material sample and a maintainable sensing surface.

## What this does not prove yet

The work does not establish commercial readiness, indefinite underwater service, or suitability for every marine robot. The reported healing conditions and time scales also differ by damage type. Readers should separate rapid electrical recovery after a puncture from longer material healing after a severe cut.

## Where this fits next

Compare this result with the [single-material soft robotic skin research brief](/research/single-material-soft-robotic-skin-2025), which examines multimodal sensing and damage awareness across a flexible surface. The broader [e-skin guide](/e-skin) explains how electronic skin relates to robot skin, tactile sensing, and Physical AI.

## Practical questions

- Why is underwater healing notable? Water can interfere with bonding and electronics, while underwater robots cannot always be recovered immediately for repair.
- Is self-healing the same as maintenance-free? No. Packaging, connectors, calibration, biofouling, and repeated damage still need evaluation.
- What should robot teams measure? Healing time, recovered signal quality, calibration drift, mechanical integrity, and performance after repeated damage cycles.

## Source boundary

This brief summarizes the NUS report and the associated Advanced Materials paper. Performance values belong to the cited study. RoboSkin.ai adds editorial context and is not affiliated with the researchers.

## Sources

- [NUS: Electronic skin that senses and self-heals under water](https://cde.nus.edu.sg/news/electronic-skin-that-senses-and-self-heals-under-water/)
- [Advanced Materials: A Self-Healing Magnetoelectric Sensor with Pain Sensing for Underwater Soft Electronics](https://doi.org/10.1002/adma.202523052)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-07-20',
    updated: '2026-07-20',
    readTime: '4 min read',
    category: 'Electronic skin',
    image: '/generated/research-self-healing-2025.svg',
    sourceTitle: 'NUS underwater self-healing electronic skin report',
    sourceUrl: 'https://cde.nus.edu.sg/news/electronic-skin-that-senses-and-self-heals-under-water/',
    sources: [
      {
        title: 'NUS: Electronic skin that senses and self-heals under water',
        url: 'https://cde.nus.edu.sg/news/electronic-skin-that-senses-and-self-heals-under-water/',
      },
      {
        title: 'Advanced Materials: Self-healing magnetoelectric sensor paper',
        url: 'https://doi.org/10.1002/adma.202523052',
      },
    ],
    technicalFocus: ['self-healing electronic skin', 'underwater robotics', 'damage sensing', 'soft robotics'],
  },
  {
    id: 'touchworld-tactile-foundation-model-dexterous-manipulation-2026',
    title: 'TouchWorld separates tactile prediction from fast contact correction in robot manipulation',
    excerpt:
      'The TouchWorld preprint proposes a hierarchical tactile foundation model that combines contact prediction with fast feedback for dexterous, contact-rich robot tasks.',
    content: `# TouchWorld separates tactile prediction from fast contact correction in robot manipulation

**News brief - July 2026**

TouchWorld is a July 2026 preprint that treats touch as both a prediction target and a fast feedback signal for dexterous robot manipulation. Its central idea is that high-level task reasoning and low-level contact correction should not be forced into one control loop running at one speed.

## What the preprint proposes

The system uses a hierarchy with vision-language subtask planning, tactile world-model prediction, visuo-tactile action generation, and a tactile-conditioned refinement policy. The high-level layer predicts executable subtasks and tactile subgoals. The lower-level policy uses recent tactile and proprioceptive feedback to correct local errors such as slip, misalignment, unstable grasping, or force mismatch.

Across six long-horizon, contact-rich manipulation tasks, the authors report 65.0% average success in the clean setting and 53.7% under human perturbations. Those results were 15.7 and 18.5 percentage points above the strongest baseline reported in the paper.

## Why this matters for tactile AI

Vision and language can describe a task and guide a hand toward an object, but they do not directly reveal hidden contact states. Once a plug meets a socket, a cup begins to slip, or a soft object deforms, the controller needs evidence from the physical interaction itself.

TouchWorld is useful as a systems idea because it assigns different jobs to different layers. A slower planner handles semantics and task phases, while a faster tactile pathway handles local contact errors. This is closer to how a practical robot stack may need to divide reasoning and response.

## What this does not prove yet

TouchWorld is a preprint, not a peer-reviewed final publication. Its reported success rates are specific to the paper's task suite, sensors, training data, baselines, and evaluation protocol. They should not be treated as a general benchmark for all robot hands or tactile foundation models.

## Where this fits next

The [Dream-Tac tactile world model brief](/research/dream-tac-tactile-world-action-model-2026) provides related context on predicting tactile futures. The [robot hand tactile sensor route](/applications/robot-hand-tactile-sensor) explains the sensing coverage and integration questions behind contact-rich manipulation.

## Practical questions

- Why split planning and tactile correction? Semantic reasoning and contact response operate at different time scales and use different evidence.
- Does a tactile foundation model replace robot control? No. It still depends on sensors, calibration, proprioception, action interfaces, and task-specific validation.
- What should readers watch next? Independent reproduction, cross-sensor transfer, unseen-object performance, latency, and robustness outside the six reported tasks.

## Source boundary

This brief summarizes an arXiv preprint and adds RoboSkin.ai analysis. The results have not been independently validated by RoboSkin.ai and should be interpreted within the authors' reported setup.

## Source

- [arXiv: TouchWorld - A Predictive and Reactive Tactile Foundation Model for Dexterous Manipulation](https://arxiv.org/abs/2607.07287)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-07-20',
    updated: '2026-07-20',
    readTime: '4 min read',
    category: 'Tactile AI',
    image: '/generated/research-ai-tactile-learning-2025.svg',
    sourceTitle: 'TouchWorld tactile foundation model preprint',
    sourceUrl: 'https://arxiv.org/abs/2607.07287',
    sources: [
      {
        title: 'arXiv: TouchWorld tactile foundation model preprint',
        url: 'https://arxiv.org/abs/2607.07287',
      },
    ],
    technicalFocus: ['TouchWorld', 'tactile foundation model', 'dexterous manipulation', 'contact-rich robotics'],
  },
  {
    id: 'color-changing-mechanochromic-tactile-sensor-2026',
    title: 'Color-changing tactile sensor turns robot contact into real-time pressure maps',
    excerpt:
      'A Queen Mary-led mechanochromic sensor converts contact, strain, and pressure into visible color fields that a standard camera can observe in real time.',
    content: `# Color-changing tactile sensor turns robot contact into real-time pressure maps

**News brief - July 2026**

Researchers led by Queen Mary University of London reported a tactile sensor that converts mechanical interaction directly into changing structural colors. A camera observes those color fields as contact, strain, and pressure maps, making the material itself part of the tactile encoding process.

## What the researchers reported

When pressure is applied to the soft sensing surface, the material produces spatially varying color patterns. The university report states that a standard low-cost USB camera can capture the signal in real time. The approach is designed to reduce dependence on dense electronic taxel arrays and heavy reconstruction pipelines.

The work uses mechanochromic materials: deformation changes their optical response, so mechanical cues become visible information. The researchers position the method for precision grippers, prosthetics, and surgical systems where small pressure changes matter.

## Why this matters for robot skin

Vision-based tactile sensors are already important in robotics, but many systems reconstruct contact geometry from internal images using significant calibration and computation. Encoding pressure into the optical signal could simplify part of that path.

The broader lesson is that tactile sensing does not have to begin with one electrical channel per sensing point. Materials can perform part of the encoding before software receives the data. That may create new trade-offs among spatial resolution, latency, camera bandwidth, lighting control, durability, and manufacturability.

## What this does not prove yet

The report does not establish that the sensor is ready for industrial deployment or that it outperforms every existing vision-based tactile sensor. Real robot use would still need evidence on repeatability, calibration drift, hysteresis, surface wear, contamination, camera placement, and performance across curved or large areas.

## Where this fits next

The [tactile sensing technology map](/technology) explains how a sensing surface connects to signal processing and robot control. The [robot gripper tactile sensor guide](/applications/robot-gripper-tactile-sensor) frames pressure mapping as one part of grasp stability, slip response, and integration.

## Practical questions

- What is mechanochromic sensing? It uses a material whose visible optical response changes under mechanical deformation.
- Why use a camera? A camera can capture a spatial field without routing a separate electrical channel from every sensing point.
- What should be compared next? Spatial resolution, response time, reconstruction cost, lighting sensitivity, durability, and calibration over repeated contact.

## Source boundary

This brief summarizes the Queen Mary University report and linked Science Advances work. RoboSkin.ai did not test the sensor and does not claim product availability or comparative performance.

## Sources

- [Queen Mary University of London: Robots can now see touch through a color-changing tactile sensor](https://www.qmul.ac.uk/news/latest-news/2026/science-and-engineering/se/robots-can-now-see-touch-thanks-to-a-new-colour-changing-tactile-sensor.html)
- [Science Advances paper DOI](https://doi.org/10.1126/sciadv.aee5236)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-07-20',
    updated: '2026-07-20',
    readTime: '4 min read',
    category: 'Tactile sensors',
    image: '/generated/pages/technology-signal-flow.webp',
    sourceTitle: 'Queen Mary color-changing tactile sensor report',
    sourceUrl: 'https://www.qmul.ac.uk/news/latest-news/2026/science-and-engineering/se/robots-can-now-see-touch-thanks-to-a-new-colour-changing-tactile-sensor.html',
    sources: [
      {
        title: 'Queen Mary University of London: Color-changing tactile sensor',
        url: 'https://www.qmul.ac.uk/news/latest-news/2026/science-and-engineering/se/robots-can-now-see-touch-thanks-to-a-new-colour-changing-tactile-sensor.html',
      },
      {
        title: 'Science Advances paper DOI',
        url: 'https://doi.org/10.1126/sciadv.aee5236',
      },
    ],
    technicalFocus: ['mechanochromic sensor', 'optical tactile sensing', 'pressure mapping', 'robot grippers'],
  },
  {
    id: 'single-pixel-tactile-skin-compressive-sampling-2026',
    title: 'Single-pixel tactile skin targets the wiring bottleneck in large-area robot touch',
    excerpt:
      'A flexible 10 x 10 tactile array uses compressive sampling and one summed output channel to reduce wiring and readout demands for responsive robot skin.',
    content: `# Single-pixel tactile skin targets the wiring bottleneck in large-area robot touch

**News brief - July 2026**

A Communications Engineering paper presents Single-Pixel Tactile Skin, a flexible tactile array that applies compressive sampling in hardware. Instead of reading every sensing element independently, the array combines programmable weighted signals into one output channel and reconstructs tactile images from repeated global measurements.

## What the paper reported

The prototype uses a flexible, daisy-chainable 10 x 10 array. Each sensing element applies a programmable analog weight, and the pixel currents are summed into a single channel. Sparse-recovery methods then reconstruct the contact image.

In the reported experiments, the system achieved at least 98% object-classification accuracy with 20 measurements, corresponding to an effective 3,500 frames per second. It also captured an 8 millisecond projectile impact in 23 reconstructed frames. The authors describe progressive reconstruction: a robot can localize contact from fewer measurements and refine the image as more data arrives.

## Why this matters for robot skin

Large-area tactile skin creates a scaling problem. More sensing points usually mean more wires, more readout channels, more bandwidth, and more failure points. A body-scale sensor cannot be evaluated only by sensitivity at one pixel; the data path must also remain practical as coverage grows.

Compressive sampling changes the trade-off. Rather than demanding a complete raster scan before acting, the system can use a coarse early estimate and improve it over time. That is relevant to robots that need a fast contact location first and detailed contact shape second.

## What this does not prove yet

The publisher labels the current article as an unedited early version. The reported classification and impact results are specific to the prototype and experimental setup. They do not yet prove performance on full robot bodies, in cluttered environments, or after long-term mechanical wear.

The architecture also introduces reconstruction assumptions and distributed electronics at each sensing element. Wiring is reduced, not eliminated, and teams would still need to evaluate power, synchronization, fault isolation, calibration, and latency in a complete robot.

## Where this fits next

The [robot skin definition guide](/robot-skin) explains why body coverage changes the sensing problem. The [ROS 2 tactile data pipeline](/research/ros2-kilted-tactile-pipeline-2026) adds the software side: timestamps, message structure, recording, and replay after tactile data leaves the surface.

## Practical questions

- What is the single pixel? It refers to the shared output used to reconstruct the array, not a skin with only one physical sensing location.
- Why use compressive sampling? It can recover useful spatial information from fewer global measurements than a complete point-by-point scan.
- What should be tested next? Larger arrays, multiple simultaneous contacts, damaged pixels, long-term drift, controller latency, and robot-scale integration.

## Source boundary

This brief summarizes the published paper and adds RoboSkin.ai systems context. All quantitative results belong to the cited study and have not been independently reproduced by RoboSkin.ai.

## Sources

- [Communications Engineering: Single-Pixel Tactile Skin via compressive sampling](https://www.nature.com/articles/s44172-026-00697-2)
- [arXiv preprint: Single-Pixel Tactile Skin via Compressive Sampling](https://arxiv.org/abs/2511.16898)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-07-20',
    updated: '2026-07-20',
    readTime: '5 min read',
    category: 'Robot skin systems',
    image: '/generated/research-scalable-manufacturing-2025.svg',
    sourceTitle: 'Communications Engineering single-pixel tactile skin paper',
    sourceUrl: 'https://www.nature.com/articles/s44172-026-00697-2',
    sources: [
      {
        title: 'Communications Engineering: Single-Pixel Tactile Skin via compressive sampling',
        url: 'https://www.nature.com/articles/s44172-026-00697-2',
      },
      {
        title: 'arXiv: Single-Pixel Tactile Skin preprint',
        url: 'https://arxiv.org/abs/2511.16898',
      },
    ],
    technicalFocus: ['single-pixel tactile skin', 'compressive sampling', 'large-area robot skin', 'tactile bandwidth'],
  },
  {
    id: 'service-robots-200000-units-logistics-tactile-ai',
    title: 'Service robot sales reached almost 200,000 units: logistics makes tactile AI practical',
    excerpt:
      'IFR sample data shows professional service robot sales reached almost 200,000 units in 2024, while Amazon Vulcan shows why contact sensing and tactile control matter in logistics.',
    content: `# Service robot sales reached almost 200,000 units: logistics makes tactile AI practical

**News brief - June 2026**

The International Federation of Robotics reported that professional service robot sales reached almost 200,000 units in 2024. Transportation and logistics remained the largest application group. This is relevant to tactile AI because logistics robots repeatedly handle packages, shelves, totes, and irregular contact conditions at operational scale.

## Source findings

IFR describes continuing growth in professional service robots, led by transport and logistics. Amazon separately introduced Vulcan, a warehouse robot designed to use touch while stowing and picking items. Amazon states that the system combines force feedback with other perception and planning methods so it can detect and respond to contact during manipulation.

IFR states that the 2024 figures are sample data from 294 suppliers. They are not projected to the whole industry and should not be compared directly across annual reports because the sample composition varies each year.

## RoboSkin analysis

The two sources describe different evidence: IFR reports market activity, while Amazon describes one deployed manipulation system. Together they show why touch is becoming an engineering interface rather than a laboratory accessory. A logistics robot must distinguish expected contact from a jam, excessive force, a shifted package, or a failed grasp.

## Engineering implications

Useful tactile systems need more than sensor sensitivity. They need calibrated contact values, timestamps, robot-frame context, replayable logs, controller thresholds, and maintainable hardware. Fleet scale also makes replacement, drift detection, and diagnostics important.

## What the sources do not prove

The sales total does not show that every service robot uses tactile sensing. Vulcan does not establish a universal sensor architecture for logistics. The cautious conclusion is that contact-aware manipulation has clear operational value where robots physically interact with cluttered inventory.

## Sources

- [IFR: Service robots see global growth boom](https://ifr.org/ifr-press-releases/news/service-robots-see-global-growth-boom)
- [Amazon: Vulcan robot uses touch for picking and stowing](https://www.aboutamazon.com/news/operations/amazon-vulcan-robot-pick-stow-touch)
- [Amazon Science: How Vulcan robots use touch](https://www.amazon.science/blog/how-amazons-vulcan-robots-use-touch-to-plan-and-execute-motions)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-06-22',
    updated: '2026-07-10',
    readTime: '4 min read',
    category: 'Industry data',
    image: '/generated/pages/application-contexts.webp',
    sourceTitle: 'IFR service robot market report',
    sourceUrl: 'https://ifr.org/ifr-press-releases/news/service-robots-see-global-growth-boom',
    sources: [
      {
        title: 'IFR: Service robots see global growth boom',
        url: 'https://ifr.org/ifr-press-releases/news/service-robots-see-global-growth-boom',
      },
      {
        title: 'Amazon: Vulcan robot uses touch for picking and stowing',
        url: 'https://www.aboutamazon.com/news/operations/amazon-vulcan-robot-pick-stow-touch',
      },
      {
        title: 'Amazon Science: How Vulcan robots use touch',
        url: 'https://www.amazon.science/blog/how-amazons-vulcan-robots-use-touch-to-plan-and-execute-motions',
      },
    ],
    technicalFocus: ['service robots', 'logistics robotics', 'Amazon Vulcan', 'tactile AI'],
  },
  {
    id: 'electronic-skin-research-robot-skin-systems-problem',
    title: 'Electronic skin research is becoming a robot skin systems problem',
    excerpt:
      'A joint Cambridge-UCL study shows that large-area e-skin progress depends on sensing, wiring, calibration, damage tolerance, and control integration working together.',
    content: `# Electronic skin research is becoming a robot skin systems problem

**News brief - June 2026**

Recent UK research highlights a shift from isolated tactile patches toward larger, conformable electronic skin systems. In one joint Cambridge-UCL study, researchers reported a single-material robotic skin that can sense multiple forms of contact across a flexible surface.

## Source findings

The joint project emphasizes a single-material approach, distributed sensing over complex shapes, and the practical difficulty of maintaining useful signals when a soft surface bends, stretches, or is damaged.

The third Cambridge Engineering source is a separate 2026 Cambridge-only graphene/liquid-metal 3D-force study included as contextual reading. It is not evidence for the 2025 joint Cambridge-UCL hydrogel study.

## RoboSkin analysis

The central engineering problem is no longer only whether a material changes electrically under pressure. A robot skin system also needs scalable electrodes, calibration, localization, multiplexing, noise control, packaging, repair strategy, data transport, and a controller that can act on the signal.

## Engineering implications

Researchers and engineers should compare e-skin work across the complete path from material response to robot behavior. Important questions include which modalities are separable, how spatial location is reconstructed, how drift is handled, what happens after damage, and whether the data can be synchronized with robot state.

## What the sources do not prove

This study does not establish immediate commercial readiness or one best architecture for all robot bodies. It supports a narrower conclusion: large-area robot skin must be evaluated as a sensing and integration system, not only as a material sample.

## Sources

- [University of Cambridge: Robotic skin gives robots a human-like sense of touch](https://www.cam.ac.uk/stories/robotic-skin)
- [UCL: Improved electronic skin gives robots a human touch](https://www.ucl.ac.uk/news/2025/jun/improved-electronic-skin-gives-robots-human-touch)
- [Cambridge Engineering: 2026 graphene/liquid-metal 3D-force study (contextual reading)](https://elec.eng.cam.ac.uk/news/cambridge-research-breakthrough-gives-robots-a-human-like-sense-of-touch/)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-06-22',
    updated: '2026-07-10',
    readTime: '4 min read',
    category: 'Electronic skin',
    image: '/generated/authority/research-soft-robotic-skin.webp',
    sourceTitle: 'University of Cambridge robotic skin research',
    sourceUrl: 'https://www.cam.ac.uk/stories/robotic-skin',
    sources: [
      {
        title: 'University of Cambridge: Robotic skin gives robots a human-like sense of touch',
        url: 'https://www.cam.ac.uk/stories/robotic-skin',
      },
      {
        title: 'UCL: Improved electronic skin gives robots a human touch',
        url: 'https://www.ucl.ac.uk/news/2025/jun/improved-electronic-skin-gives-robots-human-touch',
      },
      {
        title: 'Cambridge Engineering: 2026 graphene/liquid-metal 3D-force study (contextual reading)',
        url: 'https://elec.eng.cam.ac.uk/news/cambridge-research-breakthrough-gives-robots-a-human-like-sense-of-touch/',
      },
    ],
    technicalFocus: ['electronic skin', 'large-area sensing', 'damage tolerance', 'robot skin systems'],
  },
  {
    id: 'full-hand-tactile-sensing-robot-hands-vision-control',
    title: 'Full-hand tactile sensing moves robot hands beyond vision-only control',
    excerpt:
      'New research in full-hand tactile sensing shows why dexterous robot hands need distributed touch, not just cameras and joint feedback.',
    content: `# Full-hand tactile sensing moves robot hands beyond vision-only control

**News brief - June 2026**

Robot hands are getting better mechanically, but dexterous manipulation still depends on feedback from contact. A 2025 Nature Machine Intelligence study presented F-TAC Hand, a biomimetic robot hand with high-resolution tactile sensing across 70% of its surface.

The reported system used 0.1 mm spatial resolution and integrated 17 vision-based tactile sensors across six configurations. It preserved human-like hand motion with 15 degrees of freedom and the ability to perform all 33 human grasp types referenced in the study.

The key result is not the hardware specification alone. The researchers evaluated the system across 600 real-world trials and reported that tactile-informed control significantly outperformed non-tactile alternatives in complex manipulation tasks. That matters because real execution often breaks ideal grasp plans: objects shift, collide, rotate, or behave differently than expected.

Meta FAIR's tactile AI work points in the same direction. Meta Sparsh was trained on more than 460,000 tactile images and evaluated across six touch-centric tasks. Meta also introduced Digit 360, a tactile fingertip with more than 18 sensing features, force detection down to 1 millinewton, and an optical field of view with more than 8 million taxels.

## Key data points

- F-TAC Hand covers 70% of the hand surface with tactile sensing.
- Spatial resolution: 0.1 mm.
- Integrated 17 vision-based tactile sensors.
- Evaluated across 600 real-world trials.
- Meta Sparsh used more than 460,000 tactile images.
- Digit 360 reports force detection down to 1 millinewton and more than 8 million taxels.

| Metric | Reported value | Why it matters for robot skin |
| --- | --- | --- |
| F-TAC Hand tactile coverage | 70% of the hand surface | Coverage moves touch from a fingertip accessory to a hand-level sensing layer. |
| F-TAC Hand spatial resolution | 0.1 mm | Dense geometry can support in-hand pose and contact-shape reasoning. |
| Real-world evaluation | 600 trials | The paper gives readers more than a hardware description; it tests contact-rich behavior. |
| Meta Sparsh dataset | More than 460,000 tactile images | Tactile AI increasingly depends on representation learning, not only sensor construction. |
| Digit 360 optical field | More than 8 million taxels | High-dimensional touch data needs processing, compression, and task-aware interpretation. |

## RoboSkin analysis

The F-TAC Hand paper is important because it frames tactile sensing as embodied coverage. A fingertip sensor can help a gripper detect local contact, but dexterous hands use fingers, palm, thumb opposition, and changing contact patches. If a hand rolls, reorients, catches, or stabilizes an object, the informative contact may not be where a single sensor was placed.

The study's real value is the connection between coverage and control. The 70% surface coverage and 0.1 mm resolution are impressive, but the stronger question is what the controller can do with that information. The paper reports closed-loop tactile-informed behavior, real-world trials, and a statistically significant performance difference compared with non-tactile alternatives. That gives readers a better standard for evaluating future robot hand claims.

Meta's work adds the representation layer. Sparsh shows that touch data can be treated as a general-purpose perception problem across sensors and tasks. Digit 360 shows how much signal a fingertip can produce when a sensor captures multimodal contact. Digit Plexus then points toward hardware-software integration across fingertips, fingers, and palm.

For robot skin, this stack includes the elastomer or sensing surface, sensor placement, calibration, local processing, representation learning, robot middleware, and controller behavior. A site that only repeats "robots need touch" adds little value. A useful article tells readers where the data comes from, what its resolution or modality means, how it affects control, and what remains difficult.

## What this means for robot hands

Full-hand tactile sensing matters because dexterous manipulation uses more than fingertip contact. A robot hand may stabilize an object through the palm, side of a finger, thumb opposition, or a contact patch that shifts during motion. High-resolution touch is useful only when that distributed data changes control behavior.

For readers, the next useful route is the [robot hand tactile sensor route](/applications/robot-hand-tactile-sensor). That page frames fingertip, palm, full-hand, slip, and grasp-stability sensing as one evaluation problem instead of separate hardware facts.

## What this does not prove yet

The F-TAC Hand result does not prove that every robot hand needs the same sensor placement, coverage percentage, or vision-based tactile architecture. It also does not remove integration costs: calibration, wiring, compute load, cleaning, durability, and data handling still decide whether a tactile hand is practical outside a study.

## Where this fits next

The next step after full-hand sensing is model and middleware. [Dream-Tac tactile world model](/research/dream-tac-tactile-world-action-model-2026) explains why tactile data should support prediction, while the [ROS 2 tactile data pipeline](/research/ros2-kilted-tactile-pipeline-2026) explains why contact data must be replayable and synchronized.

## Practical questions

- Why is full-hand tactile sensing different from fingertip sensing? Full-hand sensing can expose palm, side-finger, and shifting contact patches that fingertip-only systems may miss.
- Does high-resolution touch replace vision? No. Vision still gives scene context; tactile sensing adds local contact evidence after the hand touches an object.
- What should readers compare next? Compare this news brief with the [Dream-Tac tactile world model](/research/dream-tac-tactile-world-action-model-2026) and the [ROS 2 tactile data pipeline](/research/ros2-kilted-tactile-pipeline-2026).

## What readers should take away

Full-hand tactile sensing matters because dexterous manipulation is distributed. A grasp may start at the fingertips, stabilize through the palm, and fail through slip or collision at an unexpected surface. Robot hands therefore need tactile coverage that matches the task, not merely a decorative sensor label.

The cautious conclusion is that high-resolution touch does not automatically solve manipulation. It adds data, and data must be calibrated, synchronized, interpreted, and acted on. The strongest robot skin systems will be judged by whether tactile feedback changes robot behavior under real execution noise.

## Source boundary

This article summarizes public research and Meta FAIR announcements. RoboSkin.ai adds editorial interpretation for robot skin and tactile AI readers; it does not claim affiliation with the cited projects.

## Sources

- [Nature Machine Intelligence: Embedding high-resolution touch across robotic hands](https://www.nature.com/articles/s42256-025-01053-3)
- [Meta FAIR: Advancing embodied AI through touch perception](https://ai.meta.com/blog/fair-robotics-open-source/)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-06-22',
    updated: '2026-06-27',
    readTime: '4 min read',
    category: 'Tactile AI',
    image: '/generated/research-ai-tactile-learning-2025.svg',
    sourceTitle: 'Nature Machine Intelligence full-hand tactile sensing study',
    sourceUrl: 'https://www.nature.com/articles/s42256-025-01053-3',
    sources: [
      {
        title: 'Nature Machine Intelligence: Embedding high-resolution touch across robotic hands',
        url: 'https://www.nature.com/articles/s42256-025-01053-3',
      },
      {
        title: 'Meta FAIR: Advancing embodied AI through touch perception',
        url: 'https://ai.meta.com/blog/fair-robotics-open-source/',
      },
    ],
    technicalFocus: ['full-hand tactile sensing', 'F-TAC Hand', 'Meta Sparsh', 'Digit 360'],
  },
  {
    id: 'global-robot-installations-542000-physical-ai-touch',
    title: 'Global robot installations passed 542,000 units: why Physical AI needs touch',
    excerpt:
      'IFR data shows 542,000 industrial robots were installed in 2024. For Physical AI, the next bottleneck is contact, tactile sensing, and robot skin.',
    content: `# Global robot installations passed 542,000 units: why Physical AI needs touch

**News brief - June 2026**

Global industrial robot deployment remains near record levels. According to the International Federation of Robotics, 542,000 industrial robots were installed worldwide in 2024, more than double the level recorded ten years earlier. Annual installations stayed above 500,000 units for the fourth consecutive year.

The regional pattern is also clear. Asia accounted for 74% of new industrial robot deployments in 2024, compared with 16% in Europe and 9% in the Americas. China remained the largest market, with 295,000 installations and 54% of global deployments. The global operational stock of industrial robots reached 4.664 million units, up 9% year over year.

For robot skin and tactile AI, this matters because scale changes the problem. When robots are deployed in larger numbers, the limiting factor is not only motion planning or visual recognition. Robots that work around parts, packages, tools, shelves, people, and deformable objects need local contact evidence. They need to know when they touched something, how hard they pressed, whether an object is slipping, and whether a grasp remains stable.

That is where tactile sensing becomes relevant to Physical AI. Vision can guide a robot toward a target, but contact-rich work happens after the hand, gripper, tool, or arm reaches the object. Robot skin gives Physical AI systems a contact layer that cameras alone cannot provide.

## Key data points

- 542,000 industrial robots installed worldwide in 2024.
- 4.664 million industrial robots in operational use.
- Asia represented 74% of new deployments.
- China installed 295,000 units, 54% of global deployments.
- IFR describes 2024 as the second-highest annual installation count in history.

| Metric | Reported value | Why it matters for robot skin |
| --- | --- | --- |
| 2024 global industrial robot installations | 542,000 units | Large installed fleets increase the number of contact-rich tasks that need sensing beyond vision. |
| Operational stock | 4.664 million units | A larger installed base makes maintenance, repeatability, and measurable contact feedback more important. |
| Asia share of new deployments | 74% | Tactile AI adoption will be shaped by Asian manufacturing, not only Western lab demonstrations. |
| China installations | 295,000 units | The largest robot market is also where high-volume tactile sensing cost constraints will be tested. |

## RoboSkin analysis

The useful reading of the IFR data is not simply that factories are buying more robots. The useful reading is that robot deployment is now large enough for edge cases to matter. A factory can tolerate a robot that works only under highly structured conditions when the task is narrow and the workcell is isolated. A broader fleet creates more contact variation: shifted parts, flexible packaging, worn fixtures, mixed bins, human intervention, and changing process conditions.

That is the point where Physical AI becomes more than a label. If a system acts in the physical world, it needs feedback from the physical world. Cameras provide global scene information, but they often lose the state that matters after contact starts. The robot may know that a part is present, yet still not know whether the fingers are centered, whether a surface is slipping, whether the contact force is rising too quickly, or whether a cable, gasket, cloth, or carton is deforming.

Industrial robot growth also changes the economics of touch. A single advanced tactile hand can be a research instrument. A multi-million-robot installed base needs sensors, calibration methods, replacement procedures, middleware conventions, and diagnostics that technicians can understand. Robot skin content therefore has to discuss systems, not only materials.

For readers comparing vision, force-torque sensing, and robot skin, the correct question is where the contact information is lost. A wrist force-torque sensor may show aggregate load but miss distributed finger contact. A camera may see object pose but not pressure, shear, or slip. A fingertip sensor may capture local geometry but miss palm contact.

## What readers should take away

The IFR installation numbers make tactile AI more relevant because scale punishes fragile assumptions. More robots in more factories means more contact cases that cannot be solved by rigid programming alone. Robot skin should be evaluated as part of a closed loop: contact surface, sensor modality, data quality, calibration, robot middleware, controller response, and evidence from the actual task.

The conservative conclusion is also important. A bigger robot market does not prove that every robot needs full-body e-skin. It proves that contact feedback deserves a more serious place in the automation roadmap.

## Source boundary

This article summarizes public IFR data and adds RoboSkin.ai editorial context for robot skin, tactile AI, and Physical AI. It does not imply that RoboSkin.ai produced the cited robotics statistics or measured robot performance.

## Sources

- [IFR: World Robotics 2025 industrial robots report](https://ifr.org/ifr-press-releases/news/global-robot-demand-in-factories-doubles-over-10-years)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-06-22',
    updated: '2026-06-22',
    readTime: '4 min read',
    category: 'Industry data',
    image: '/generated/pages/application-contexts.webp',
    sourceTitle: 'International Federation of Robotics World Robotics 2025 report',
    sourceUrl: 'https://ifr.org/ifr-press-releases/news/global-robot-demand-in-factories-doubles-over-10-years',
    sources: [
      {
        title: 'IFR: World Robotics 2025 industrial robots report',
        url: 'https://ifr.org/ifr-press-releases/news/global-robot-demand-in-factories-doubles-over-10-years',
      },
    ],
    technicalFocus: ['industrial robots', 'Physical AI', 'robot skin', 'tactile feedback'],
  },
];

export function getNewsPostById(id: string): NewsPost | undefined {
  return newsPosts.find((post) => post.id === id);
}

export function getNewsSummaries(): NewsSummary[] {
  return newsPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      updated: post.updated,
      readTime: post.readTime,
      technicalFocus: post.technicalFocus,
    }));
}
