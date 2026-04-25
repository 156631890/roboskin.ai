export interface BlogPost {
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
  technicalFocus: string[];
}

export type BlogSummary = Pick<
  BlogPost,
  'id' | 'title' | 'excerpt' | 'category' | 'date' | 'updated' | 'sourceTitle' | 'sourceUrl' | 'technicalFocus'
>;

export const blogPosts: BlogPost[] = [
  {
    id: 'graphene-liquid-metal-3d-force-2026',
    title: 'Graphene and liquid metal 3D force sensing for robot fingertips',
    excerpt:
      'A current technology brief on miniature tactile sensors that separate normal force, shear force, slip, and texture signals for dexterous robot hands.',
    content: `# Graphene and liquid metal 3D force sensing for robot fingertips

**Updated technical brief - April 2026**

## What changed

Graphene and liquid metal composite sensors are moving robot touch from simple pressure detection toward three-dimensional force sensing. Recent Cambridge work reports a miniaturized tactile sensor architecture based on graphene, deformable metal microdroplets, nickel particles, and skin-inspired microstructures.

The important technical shift is not a single sensitivity number. The shift is the ability to separate normal pressure from tangential shear, detect early slip, and estimate surface roughness in a compact package.

## Why this matters for robot skin

- Normal force tells a controller how hard the robot is pressing.
- Shear force indicates whether an object is sliding or about to slip.
- Texture response helps classify surfaces without relying only on vision.
- Smaller sensors make fingertip and curved-surface integration more realistic.

## Integration notes

For practical RoboSkin-style systems, this direction points toward tactile arrays that publish vector contact data instead of only scalar pressure maps. The engineering problem becomes calibration, mechanical packaging, thermal drift control, and clean signal routing on curved surfaces.

## What remains application-specific

Claims about exact force range, durability, and fingertip-level spatial resolution should be verified for each geometry and substrate. Public pages should describe the sensing approach, while datasheets and integration reviews should carry measured values.

## Source

[University of Cambridge: Graphene-based artificial skin brings human-like touch closer to robots](https://www.cam.ac.uk/research/news/graphene-based-artificial-skin-brings-human-like-touch-closer-to-robots)
`,
    author: 'RoboSkin technical team',
    date: '2026-04-25',
    updated: '2026-04-25',
    readTime: '5 min read',
    category: 'Tactile Hardware',
    image: '/generated/research-graphene-quantum-tunneling.svg',
    sourceTitle: 'University of Cambridge graphene-based artificial skin report',
    sourceUrl: 'https://www.cam.ac.uk/research/news/graphene-based-artificial-skin-brings-human-like-touch-closer-to-robots',
    technicalFocus: ['graphene and liquid metal', '3D force sensing', 'slip detection', 'robot fingertips'],
  },
  {
    id: 'single-material-soft-robotic-skin-2025',
    title: 'Single-material soft robotic skin and impedance-based multimodal touch',
    excerpt:
      'A 2025 update on single-material soft robotic skin using electrical impedance tomography and machine learning to identify multiple contact types.',
    content: `# Single-material soft robotic skin and impedance-based multimodal touch

**Updated technical brief - April 2026**

## What changed

Single-material soft robotic skin is becoming a serious alternative to patchwork sensor layouts. Cambridge and UCL researchers described a conductive hydrogel skin in which the whole surface acts as the sensor. The system uses electrical impedance tomography and machine learning to interpret touch, heat, damage, and multi-point contact patterns.

The most useful idea for product teams is architectural simplicity: fewer discrete sensing components can reduce wiring, assembly complexity, and failure points.

## Technical takeaways

- The skin can be molded over complex surfaces instead of only flat patches.
- Electrical pathways across the material carry spatial information.
- Machine learning helps identify which signal paths matter for a task.
- Multimodal recognition is possible, but the model and calibration are part of the sensor system.

## Deployment implications

For humanoid robot hands, large-area soft skins need robust attachment, repeatable calibration, and a service plan for damaged surfaces. The material is only one layer of the product; the useful system also needs electronics, firmware, data interfaces, and repeatable test methods.

## Source

[University of Cambridge: Single-material electronic skin gives robots the human touch](https://www.cam.ac.uk/stories/robotic-skin)
`,
    author: 'RoboSkin technical team',
    date: '2026-04-24',
    updated: '2026-04-25',
    readTime: '5 min read',
    category: 'Soft E-Skin',
    image: '/generated/research-self-healing-2025.svg',
    sourceTitle: 'University of Cambridge single-material electronic skin report',
    sourceUrl: 'https://www.cam.ac.uk/stories/robotic-skin',
    technicalFocus: ['single-material soft robotic skin', 'electrical impedance tomography', 'machine learning', 'multimodal touch'],
  },
  {
    id: 'full-hand-tactile-sensing-2025',
    title: 'Full-hand tactile sensing for adaptive dexterous grasping',
    excerpt:
      'A review of why high-resolution tactile coverage across robotic hands matters for adaptive grasping and real-world manipulation.',
    content: `# Full-hand tactile sensing for adaptive dexterous grasping

**Updated technical brief - April 2026**

## What changed

Research published in Nature Machine Intelligence in 2025 shows why full-hand tactile sensing matters. The reported F-TAC Hand integrates high-resolution tactile sensing across much of the hand surface and uses tactile feedback for adaptive manipulation.

The broader lesson is that tactile sensing should not be treated as a decorative add-on. For dexterous hands, contact feedback changes what the controller can do during real interactions.

## Technical takeaways

- Full-hand tactile coverage supports contact-aware grasp adjustment.
- High-resolution touch is valuable when visual information is blocked or incomplete.
- Sensor placement must preserve hand motion and mechanical compliance.
- Calibration and data reduction are critical because raw tactile streams are high dimensional.

## Product implication

RoboSkin content should emphasize staged integration: start with a fit check, confirm surface geometry, select a sensing layout, and validate the data pipeline before claiming deployment readiness.

## Source

[Nature Machine Intelligence: Embedding high-resolution touch across robotic hands enables adaptive human-like grasping](https://www.nature.com/articles/s42256-025-01053-3)
`,
    author: 'RoboSkin technical team',
    date: '2026-04-23',
    updated: '2026-04-25',
    readTime: '6 min read',
    category: 'Dexterous Manipulation',
    image: '/generated/research-multimodal-sensing-2025.svg',
    sourceTitle: 'Nature Machine Intelligence full-hand tactile sensing paper',
    sourceUrl: 'https://www.nature.com/articles/s42256-025-01053-3',
    technicalFocus: ['full-hand tactile sensing', 'adaptive grasping', 'dexterous manipulation', 'high-resolution touch'],
  },
  {
    id: 'temperature-pressure-bimodal-2025',
    title: 'Temperature/pressure bimodal sensing and the crosstalk problem',
    excerpt:
      'A practical brief on temperature/pressure bimodal tactile sensing, signal decoupling, and why crosstalk matters for robot skin.',
    content: `# Temperature/pressure bimodal sensing and the crosstalk problem

**Updated technical brief - April 2026**

## What changed

Temperature/pressure bimodal tactile sensing is a central e-skin direction because robots often need to understand both contact force and thermal conditions. A 2025 review in Journal of Materials Chemistry C highlights the practical issue: multimodal sensing is useful only when the signals can be separated reliably.

## Technical takeaways

- Pressure and temperature can be sensed through different physical mechanisms.
- Crosstalk occurs when one stimulus changes the signal assigned to another stimulus.
- Decoupled outputs can make calibration and interpretation cleaner.
- Material choice, sensor stack design, and signal processing must be designed together.

## Integration notes

For robotic skin, bimodal sensing should be specified as a system behavior: what variables are measured, how they are separated, how drift is handled, and what operating range has been verified.

## Source

[RSC Journal of Materials Chemistry C: Biological skin inspired temperature/pressure bimodal tactile sensing](https://pubs.rsc.org/en/content/articlehtml/2025/tc/d5tc02514a)
`,
    author: 'RoboSkin technical team',
    date: '2026-04-22',
    updated: '2026-04-25',
    readTime: '4 min read',
    category: 'Multimodal Sensing',
    image: '/generated/research-multimodal-sensing-2025.svg',
    sourceTitle: 'RSC temperature/pressure bimodal tactile sensing review',
    sourceUrl: 'https://pubs.rsc.org/en/content/articlehtml/2025/tc/d5tc02514a',
    technicalFocus: ['temperature/pressure bimodal', 'signal decoupling', 'crosstalk', 'multimodal e-skin'],
  },
  {
    id: 'event-based-opto-tactile-2025',
    title: 'Event-based tactile sensing for sparse, low-latency robot touch',
    excerpt:
      'A current note on event-based and neuromorphic tactile sensing, including opto-tactile skins and sparse contact event processing.',
    content: `# Event-based tactile sensing for sparse, low-latency robot touch

**Updated technical brief - April 2026**

## What changed

Event-based tactile sensing borrows ideas from neuromorphic vision: report changes as sparse events instead of streaming full frames or dense arrays continuously. A 2025 Frontiers article on event-based opto-tactile skin summarizes why this matters for robotics: lower data rates, fast response, and efficient processing of contact changes.

## Technical takeaways

- Event streams are useful for slip, vibration, and rapid contact changes.
- Sparse encoding can reduce bandwidth compared with dense polling.
- Opto-tactile skins can keep electronics away from the most compliant surface.
- The software stack must translate events into controller-friendly signals.

## Integration notes

Event-based touch should be evaluated against the robot task. A fast slip detector may matter more than a dense pressure map for one gripper, while a humanoid palm may require both.

## Source

[Frontiers in Neuroscience: An event-based opto-tactile skin](https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2025.1735068/full)
`,
    author: 'RoboSkin technical team',
    date: '2026-04-21',
    updated: '2026-04-25',
    readTime: '4 min read',
    category: 'Tactile AI',
    image: '/generated/research-neuromorphic-2026.svg',
    sourceTitle: 'Frontiers event-based opto-tactile skin article',
    sourceUrl: 'https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2025.1735068/full',
    technicalFocus: ['event-based', 'neuromorphic tactile sensing', 'opto-tactile skin', 'low-latency touch'],
  },
  {
    id: 'self-healing-multimodal-eskin-2026',
    title: 'Self-healing multimodal e-skin: useful direction, careful claims',
    excerpt:
      'A conservative update on self-healing e-skin architectures that combine tactile, pressure, thermal, and damage-related signals.',
    content: `# Self-healing multimodal e-skin: useful direction, careful claims

**Updated technical brief - April 2026**

## What changed

Self-healing e-skin remains a strong research direction because robot skin is exposed to abrasion, cuts, repeated compression, and bending. Recent work emphasizes stacked material architectures, liquid metal layers, polymer networks, and multimodal sensing.

## Technical takeaways

- Healing performance depends on damage type, temperature, humidity, and mechanical load.
- Structural recovery and signal recovery are separate claims.
- Multimodal sensing increases usefulness but also increases calibration complexity.
- Public content should avoid universal recovery claims unless measured on the exact device.

## Deployment implications

For commercial robotic skin, the useful question is not whether a sample can heal in a lab. The useful question is whether the installed surface can preserve calibration, electrical continuity, attachment, and serviceability after repeated real-world damage.

## Source

[Chemical Engineering Journal: A self-healing e-skin for quadruple-modal sensing](https://www.sciencedirect.com/science/article/pii/S1385894725132531)
`,
    author: 'RoboSkin technical team',
    date: '2026-04-20',
    updated: '2026-04-25',
    readTime: '4 min read',
    category: 'Soft E-Skin',
    image: '/generated/research-self-healing-2025.svg',
    sourceTitle: 'Chemical Engineering Journal self-healing e-skin article',
    sourceUrl: 'https://www.sciencedirect.com/science/article/pii/S1385894725132531',
    technicalFocus: ['self-healing e-skin', 'multimodal sensing', 'damage recovery', 'soft materials'],
  },
  {
    id: 'ros2-kilted-tactile-pipeline-2026',
    title: 'ROS 2 Kilted and tactile sensor data pipelines',
    excerpt:
      'A robotics software update on ROS 2 Kilted, rosbag2, ros2_control, force/torque broadcasters, and filter chains for tactile data workflows.',
    content: `# ROS 2 Kilted and tactile sensor data pipelines

**Updated technical brief - April 2026**

## What changed

ROS 2 Kilted Kaiju is the current stable ROS 2 distribution as of April 2026, while Jazzy and Humble remain supported long-term releases. For tactile sensing teams, the important updates are not marketing features. The practical updates are around middleware support, rosbag2 workflows, action data recording, and ros2_control sensor broadcasters.

## Technical takeaways

- ROS 2 Kilted adds current middleware support, including Zenoh as a Tier 1 RMW implementation.
- rosbag2 improvements help record, replay, inspect, and compare sensor sessions.
- ros2_control Kilted release notes include filter chains for force/torque sensor readings.
- Force/torque data can be transformed to target frames, which matters for robot hands and grippers.

## Integration notes

A tactile skin integration should define message formats, timestamps, coordinate frames, QoS settings, replay strategy, and calibration metadata. Without these, good hardware data becomes hard to debug.

## Sources

[ROS 2 Kilted distributions](https://docs.ros.org/en/kilted/Releases.html)

[ros2_control Kilted release notes](https://control.ros.org/kilted/doc/ros2_controllers/doc/release_notes.html)
`,
    author: 'RoboSkin technical team',
    date: '2026-04-19',
    updated: '2026-04-25',
    readTime: '5 min read',
    category: 'Robotics Software',
    image: '/generated/research-ai-tactile-learning-2025.svg',
    sourceTitle: 'ROS 2 and ros2_control Kilted documentation',
    sourceUrl: 'https://docs.ros.org/en/kilted/Releases.html',
    technicalFocus: ['ROS 2 Kilted', 'ros2_control', 'force/torque broadcaster', 'sensor data pipeline'],
  },
  {
    id: 'large-area-flexible-tactile-arrays-2025',
    title: 'Large-area flexible tactile arrays for curved robot surfaces',
    excerpt:
      'A deployment-focused article on large-area tactile arrays, curved-surface coverage, adjustable resolution, slippage detection, and manufacturing tradeoffs.',
    content: `# Large-area flexible tactile arrays for curved robot surfaces

**Updated technical brief - April 2026**

## What changed

Large-area flexible tactile arrays are becoming more relevant as robot skin moves beyond fingertip demos. Recent work on high-resolution skin-inspired flexible tactile sensors focuses on coverage, curved surfaces, slippage detection, gesture recognition, and manufacturability.

## Technical takeaways

- Curved-surface coverage is a core design problem, not a styling detail.
- Adjustable electrode geometry can trade resolution, routing complexity, and cost.
- Slip direction and velocity are useful control signals for manipulation.
- Durability testing must include repeated loading, bending, and attachment stress.

## Product implication

For RoboSkin content, large-area arrays should be positioned as integration programs rather than one-size-fits-all parts. Surface geometry, mounting, cabling, connector placement, and data rates determine whether the array is practical.

## Source

[ACS Applied Electronic Materials: Large-area high-resolution skin-inspired flexible tactile sensor for robotic electronic skin](https://pubs.acs.org/doi/10.1021/acsaelm.5c01200)
`,
    author: 'RoboSkin technical team',
    date: '2026-04-18',
    updated: '2026-04-25',
    readTime: '4 min read',
    category: 'Manufacturing',
    image: '/generated/research-scalable-manufacturing-2025.svg',
    sourceTitle: 'ACS large-area flexible tactile sensor article',
    sourceUrl: 'https://pubs.acs.org/doi/10.1021/acsaelm.5c01200',
    technicalFocus: ['large-area tactile array', 'curved robot surfaces', 'slip detection', 'manufacturing tradeoffs'],
  },
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getBlogSummaries(): BlogSummary[] {
  return blogPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      updated: post.updated,
      sourceTitle: post.sourceTitle,
      sourceUrl: post.sourceUrl,
      technicalFocus: post.technicalFocus,
    }));
}
