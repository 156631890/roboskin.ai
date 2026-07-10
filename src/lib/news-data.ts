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

## Search intent FAQ

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
    author: 'RoboSkin technical editor',
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
    author: 'RoboSkin technical editor',
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
