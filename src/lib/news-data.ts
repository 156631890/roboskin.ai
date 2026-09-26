export interface NewsSource {
  title: string;
  url: string;
}

export interface NewsPost {
  id: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  updated: string;
  readTime: string;
  category: string;
  image: string;
  imageAlt?: string;
  imageCaption?: string;
  sourceDate?: string;
  evidenceStatus?: string;
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
    id: 'polyumi-visual-tactile-audio-demonstration-interface',
    title: 'PolyUMI records vision, touch and contact audio in one wireless interface',
    seoTitle: 'PolyUMI: Visual-Tactile-Audio Robot Demonstrations',
    seoDescription: 'PolyUMI combines optical touch, contact audio and wrist vision. Review its VisTA policy, slip results, build cost and current repository limits.',
    excerpt: 'Northwestern University and TU Darmstadt researchers share a transferable sensing finger and VisTA policy for multimodal demonstrations. The release is substantial, but its paper and repository specifications do not yet fully agree.',
    category: 'Multimodal tactile learning',
    image: '/generated/news/polyumi-visual-tactile-audio-demonstration-interface.png',
    imageAlt: 'Diagram showing wrist vision, an optical tactile finger and contact audio flowing from a handheld PolyUMI gripper into the VisTA robot policy.',
    imageCaption: 'Original RoboSkin.ai schematic of the PolyUMI sensing and policy pipeline. It is explanatory artwork, not an experimental photograph.',
    sourceTitle: 'PolyUMI: Accessible Visual-Tactile-Audio Data Collection for Object Inference and Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2609.29760',
    sources: [
      { title: 'PolyUMI arXiv v1 submission record', url: 'https://arxiv.org/abs/2609.29760' },
      { title: 'PolyUMI v1 methods and experiments', url: 'https://arxiv.org/html/2609.29760v1' },
      { title: 'Official PolyUMI and VisTA project page', url: 'https://polyumi-vista.github.io/' },
      { title: 'Official PolyUMI hardware and software repository', url: 'https://github.com/polyumi/PolyUMI-platform' },
    ],
    technicalFocus: ['visual-tactile-audio learning', 'multimodal demonstrations', 'optical tactile sensing', 'contact audio'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'Preprint · arXiv v1 · MIT repository with unresolved review placeholders',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-26',
    updated: '2026-09-26',
    readTime: '8 min read',
    content: `# PolyUMI records vision, touch and contact audio in one wireless interface

Researchers at Northwestern University, TU Darmstadt, Hessian.AI and the Robotics Institute Germany released PolyUMI on September 24, 2026. The wireless handheld interface records wrist vision, optical touch, contact audio and proprioception, then moves the same sensing finger to a robot end effector. A companion policy called VisTA fuses the synchronized streams for object inference and contact-rich manipulation. [Paper and version record](https://arxiv.org/abs/2609.29760).

## Key takeaways

- The sensing finger adds an estimated $235.96 in parts and four hours of assembly to the UMI workflow; moving it between the handheld collector and robot takes about ten minutes.
- In a ten-trial slip-control ablation, vision, touch and audio succeed 8/10 times, versus 2/10 for vision alone. This is a small task-specific experiment, not a general success rate.
- The public repository is useful but not yet a clean reproduction package: several author-specific dependencies remain placeholder links, and its README lists an older tactile stream specification than the paper. [Repository notes](https://github.com/polyumi/PolyUMI-platform).

## What changed

Portable demonstration tools usually record what a camera sees and how the tool moves. PolyUMI adds signals that expose the physical interaction itself. Its curved-mirror optical finger observes a deformable reflective skin; a piezo contact microphone records structure-borne vibration; a fisheye GoPro supplies wrist vision; and SLAM plus ArUco markers recover the handheld pose and gripper opening.

The paper reports 20 fps tactile video at 1152 by 648 pixels, 16 kHz mono contact audio and 60 fps wrist video at 1920 by 1080. The streams are aligned to a 10 Hz policy clock. Images use a two-step history, while audio becomes a log-Mel spectrogram covering roughly the latest 0.5 seconds. On the robot, those 10 Hz policy commands are interpolated into joint torques at 1 kHz by a Cartesian impedance controller.

VisTA does not collapse every sensor to one vector before fusion. Modality-specific encoders produce 294 tokens across vision, touch, audio and robot state. An eight-layer transformer mixes those tokens across sensor, space and time, and an 18-layer flow-matching model predicts chunks of 16 relative end-effector actions.

## Results under the reported conditions

The experiments answer different questions, so their numbers should not be combined into one headline score. A tactile-image classifier reaches 92.3% accuracy over five printed surface patterns. For a closed box holding gears, thin screws or thick screws, sensor combinations without audio reach 42% to 44% accuracy; adding contact audio lifts each tested combination to about 80%. Training uses 20 demonstrations per class and validation uses ten, repeated across three seeds. [Object-inference protocol](https://arxiv.org/html/2609.29760v1#S4.SS2).

Slip control is a ten-trial ablation. The robot must let a screwdriver rotate under gravity, then catch it within ten degrees of vertical. Vision-touch-audio succeeds 8/10, touch-audio 7/10, vision-touch and vision-audio 3/10 each, touch 3/10, vision 2/10 and audio alone 0/10.

For complete manipulation, VisTA reaches 75% full success on board wiping and 100% when partial completion is included. On lightbulb turning, however, every evaluated method reaches at least 80%, and the vision-only diffusion policy performs best. The authors explicitly interpret this as a task where clear visual state makes extra contact sensing less useful. [Official results summary](https://polyumi-vista.github.io/#experiments).

## What this means for robotics

RoboSkin analysis: PolyUMI's most important contribution is not a universal multimodal-policy win. It is a practical bridge between demonstration and deployment. Sharing the same finger preserves sensing geometry, while live contact audio gives the human demonstrator feedback during collection. That can reduce two shifts at once: what the operator can perceive and what the policy later observes.

The results also reinforce a useful design rule for [visuo-tactile learning](/visuo-tactile): choose sensors by hidden task state. Audio dominates the sealed-box classification, touch plus audio helps rapid slip control, and extra modalities add little when the goal remains visually obvious.

## Limitations and availability

PolyUMI is an arXiv v1 preprint, not an independently reproduced system. Manipulation trials use one Franka setup and modest evaluation counts. The off-the-shelf Franka Hand also required modification for 200 Hz continuous gripper positioning.

The GitHub repository carries an MIT license and includes hardware, firmware, ingestion, ROS 2 and policy tooling. But it is an anonymized review copy with no commit history. Its documentation says several private forks are represented by links that will not resolve until a camera-ready release, so a fresh clone cannot complete every documented setup step today. Training was only tested on an RTX 6000 Ada with 48 GB; the authors estimate at least 32 GB of GPU memory.

There is also a source mismatch worth checking before procurement: the paper and project page report 20 fps tactile video at 1152 by 648, while the current repository README says 10 fps at 540 by 480. That may reflect an older configuration, but no versioned explanation was visible. Teams should treat the manuscript specification as experimental context and verify the repository configuration they can actually build.

## Sources and related resources

- [PolyUMI arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.29760)
- [Full methods and evaluation](https://arxiv.org/html/2609.29760v1)
- [Official PolyUMI and VisTA project](https://polyumi-vista.github.io/)
- [Official MIT-licensed repository](https://github.com/polyumi/PolyUMI-platform)
- [RoboSkin tactile dataset directory](/datasets)
`,
  },
  {
    id: 'propra-fingertip-sensor-pretraining',
    title: 'PROPRA anchors pre-touch and tactile signals to robot state and future actions',
    seoTitle: 'PROPRA Pretrains Proximity and Tactile Robot Sensors',
    seoDescription: 'PROPRA aligns fingertip proximity and tactile histories with robot state and future actions. Check its four-task results, compute and code status.',
    excerpt: 'AIST researchers pretrain sparse fingertip signals against proprioception and upcoming actions. Average real-robot success reaches 75.0%, but the advantage varies by task and remains within seed variation.',
    category: 'Tactile representation learning',
    image: '/generated/news/propra-fingertip-sensor-pretraining.png',
    imageAlt: 'Diagram showing proximity sensing before contact and tactile sensing after contact anchored to robot state and future actions in PROPRA.',
    imageCaption: 'Original RoboSkin.ai schematic of PROPRA phase-dependent sensing. It is not a figure copied from the paper.',
    sourceTitle: 'Self-Supervised Anchoring of Fingertip Sensing to Proprioception and Proactive Actions for Robot Imitation Learning',
    sourceUrl: 'https://arxiv.org/abs/2609.29822',
    sources: [
      { title: 'PROPRA arXiv v1 submission record', url: 'https://arxiv.org/abs/2609.29822' },
      { title: 'PROPRA v1 methods, results and limitations', url: 'https://arxiv.org/html/2609.29822v1' },
      { title: 'Official PROPRA project and availability', url: 'https://tomohiromotoda.github.io/nia.propra/' },
    ],
    technicalFocus: ['fingertip proximity sensing', 'pressure tactile sensing', 'self-supervised pretraining', 'imitation learning'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'Preprint · arXiv v1 · code announced but not released',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-26',
    updated: '2026-09-26',
    readTime: '7 min read',
    content: `# PROPRA anchors pre-touch and tactile signals to robot state and future actions

Researchers at Japan's National Institute of Advanced Industrial Science and Technology and the CNRS-AIST Joint Robotics Laboratory introduced PROPRA on September 24, 2026. Short for PROprioceptive-and-PRoactive Anchoring, the method pretrains separate encoders for reflective proximity and pressure-sensitive tactile histories by aligning each with the robot's current state and upcoming actions. On four real-robot tasks, it reports a 75.0% average success rate. [Paper and version record](https://arxiv.org/abs/2609.29822).

## Key takeaways

- Proximity sensing becomes informative during approach, while tactile pressure responds after contact. PROPRA gives both a continuously changing sensorimotor anchor without directly forcing the two sensor embeddings together.
- Across three seeds and 20 trials per seed, PROPRA averages 75.0% versus 71.7% for image-anchored pretraining and 72.1% for image anchoring plus direct tactile-proximity pairing.
- The improvement is not uniform: the image anchor reaches 76.7% on OpenLid versus 73.3% for PROPRA, and code is still labeled “soon.” [Official project](https://tomohiromotoda.github.io/nia.propra/).

## Why naive sensor fusion is not enough

The AIST gripper carries three tactile and six proximity channels. Each encoder receives 0.5 seconds of history. Proximity varies as the fingers approach an object; tactile stays near baseline until contact. After contact, the relationship reverses. In the authors' demonstrations, at least one sensor stays near its stationary value in more than half of the pretraining samples.

That sparsity makes simple concatenation unreliable. Adding both raw histories to the vision-and-state diffusion policy raises average success from 30.4% to 40.4%, but MovePen falls from 31.7% to 20.0% and OpenLid also underperforms vision alone. More sensors can therefore create competition rather than useful context.

PROPRA aligns each sensor encoder independently to an anchor containing the current end-effector pose, gripper opening and next ten actions. The contrastive objective never directly pairs tactile and proximity. After pretraining, the frozen sensor encoders feed the imitation policy, while the anchor itself is removed.

## Results under the reported protocol

The real-robot evaluation uses a UR5e on PickCup, PickSponge, MovePen and OpenLid, with 20 demonstrations per task. Every policy condition is trained with three seeds and evaluated for 20 trials per seed. PROPRA reaches 81.7% on both pickup tasks, 63.3% on MovePen and 73.3% on OpenLid. The corresponding image-anchor scores are 75.0%, 75.0%, 60.0% and 76.7%. [Complete comparison table](https://arxiv.org/html/2609.29822v1#S6).

The 3.3-point average lead over the strongest image-anchored variant is modest, and the paper notes that per-task differences fall within variation across seeds. A fair reading is that PROPRA is competitive and strongest where sensor responses are sparse, not that it wins every manipulation setting.

Representation probes add a more specific result. Over the two seconds before contact, a linear predictor on the frozen proximity embedding achieves the highest time-to-contact R-squared on three of four tasks. On PickSponge it reaches 0.440 versus 0.377 for the image anchor. On MovePen, the image-plus-pair condition is slightly higher, 0.554 versus 0.544.

The authors also collect 100 additional execution episodes per task. After zero-point alignment to compensate for proximity-sensor drift, PROPRA remains positive on every task and seed when a predictor fitted on demonstrations is transferred without refitting. That preprocessing caveat matters: this is not calibration-free deployment.

## What this means for robotics

RoboSkin analysis: PROPRA offers a useful alternative to treating camera features as the universal alignment target. A robot's own state and intended action exist throughout the trajectory, including moments when an individual [tactile sensor](/sensors) is silent. This can be especially useful for custom fingertips that do not match large visual-tactile foundation-model hardware.

The paper also supplies a warning for multimodal [robot learning](/robot-learning): an added channel does not help just because it measures contact. The learning objective must tell the model when that channel carries information. Separating pre-touch and post-contact phases may matter as much as increasing sensor resolution.

## Limitations and availability

PROPRA is an arXiv v1 preprint evaluated on one gripper, one robot and four grasp-oriented tasks. It does not compare directly with large-scale tactile foundation models, and it requires the demonstrated robot states and future action segments used as anchors. Pretraining takes about three to four hours and policy training about eight hours on one NVIDIA H200 with 141 GB of memory, which is a demanding reference configuration rather than a minimum requirement.

The official project page provides the paper and videos under a CC BY-SA 4.0 page license, but its code link reads “soon.” No training repository, model weights, demonstration dataset or software license was verified on September 26. RoboSkin.ai has not reproduced the experiments.

## Sources and related resources

- [PROPRA arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.29822)
- [Full method, tables and limitations](https://arxiv.org/html/2609.29822v1)
- [Official PROPRA project](https://tomohiromotoda.github.io/nia.propra/)
- [RoboSkin tactile foundation models guide](/tactile-foundation-models)
`,
  },
  {
    id: 'whole-hand-force-regulation-without-tactile-sensors',
    title: 'Whole-hand force regulation tracks contact without tactile sensors',
    seoTitle: 'Whole-Hand Force Regulation Without Tactile Sensors',
    seoDescription: 'A 27-DoF arm-hand estimates contact from geometry and tracks force at about 84 Hz. Review its simulation gains, hardware runs and sensing limits.',
    excerpt: 'MIT, Seoul National University and Yonsei University researchers regulate contacts across finger sides, backs and palm from an object model and joint state. The approach is fast, but depends on pose tracking and quasi-static assumptions.',
    category: 'Dexterous grasp control',
    image: '/generated/news/whole-hand-force-regulation-without-tactile-sensors.png',
    imageAlt: 'Diagram of a dexterous hand estimating contacts across fingertips, finger backs and palm from an object model before solving force allocation.',
    imageCaption: 'Original RoboSkin.ai schematic of geometry-based whole-hand contact regulation. It is not a hardware photograph or measured force map.',
    sourceTitle: 'Real-Time Force Regulation for Whole-Hand Dexterous Grasping',
    sourceUrl: 'https://arxiv.org/abs/2609.30082',
    sources: [
      { title: 'Whole-hand force regulation arXiv v1 record', url: 'https://arxiv.org/abs/2609.30082' },
      { title: 'Full v1 controller and evaluation', url: 'https://arxiv.org/html/2609.30082v1' },
      { title: 'Official project, hardware runs and availability', url: 'https://sangminkim-99.github.io/reactive-grasp-whole-hand/' },
    ],
    technicalFocus: ['whole-hand contact estimation', 'force regulation', 'dexterous grasping', 'reactive regrasping'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'Preprint · arXiv v1 · code pending',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-26',
    updated: '2026-09-26',
    readTime: '7 min read',
    content: `# Whole-hand force regulation tracks contact without tactile sensors

Researchers at Seoul National University, Massachusetts Institute of Technology and Yonsei University released a real-time whole-hand force controller on September 24, 2026. It estimates contact across fingertips, finger sides, dorsal surfaces and the palm from a tracked object model and joint angles, then reallocates desired forces as those contacts change. The method explicitly does not use tactile sensing at the contacts. [Paper and version record](https://arxiv.org/abs/2609.30082).

## Key takeaways

- About 3,000 sampled hand-surface points are queried against the object's signed distance field every cycle. That geometric contact search takes under 1 ms on the reported GPU.
- In gravity-free simulation, whole-hand regulation reaches 88.6% success after a 90-degree perturbation versus 72.4% when contact candidates are restricted to fingertips.
- Hardware evidence consists of three uncut runs totaling about 200 seconds, 78 human-applied perturbations and eight object losses; the system autonomously recovers six losses. [Official hardware summary](https://sangminkim-99.github.io/reactive-grasp-whole-hand/#real-world).

## What changed

Grasp planners usually choose contacts once, then execute forces or impedance targets tied to that initial geometry. That becomes brittle when an object rolls, slides or gains new contacts against another part of the hand.

This controller treats contact as a live geometry query. The object mesh is converted to a signed distance field, and the measured hand configuration places sampled points from every link into that field. Points within a threshold become contact candidates. For each current set, a quadratic program allocates force under friction pyramids, minimum normal force, joint-torque limits and an actuation-consistency constraint.

The last constraint is important. An optimizer can request forces that satisfy object-level equations but cannot be generated by controlled finger torques. The method suppresses force components in the null space of the actuated contact Jacobian. It remains a conservative allocation rule, not proof that compliant physical contacts realize every desired vector.

Reactive reaching handles acquisition. It follows a tracked object until the thumb and two fingers make contact, hands control to force regulation, and returns to reaching after a detected loss. This creates an approach-hold-regrasp loop rather than evaluating a stored grasp alone.

## Simulation and hardware evidence

Simulation uses MuJoCo with gravity disabled, 79 YCB objects and ten power grasps per object. A six-direction load equal to 10% of object weight tests each initial grasp. For dynamic perturbations, five representative objects and 50 grasps per method are rotated up to 90 degrees; non-adaptive baselines allocate force only at initialization. Whole-hand online regulation beats fixed feedforward torque, fixed impedance and fingertip-only execution at every angle. [Simulation protocol](https://arxiv.org/html/2609.30082v1#S4.SS1).

Under constant synthetic pose errors up to 30 degrees and 5 mm, the feedforward baseline falls from 79% to 54%, while adaptive regulation stays between 87% and 93%. That test does not include time-varying noise, latency or complete tracking loss.

There is a measurable speed-coverage trade-off. Allowing one candidate per link gives a 227 Hz force solve and 90.9% success; five candidates peaks at 93.2%; seven slows to 66 Hz and falls to 91.9%. The selected five-contact setting runs the full quadratic program at about 84 Hz.

Hardware uses a 7-DoF Flexiv Rizon 4 arm, a 20-DoF Robotis 5F hand, one RealSense D455, an Intel i9-13900K and an RTX 4090. The hand's fingertip tactile sensors are present but unused. A Pringles can and two boxes are pushed or taken during the three runs. Six of eight losses are recovered; the other two leave the arm workspace. These demonstrations show autonomous transitions, but three runs are not a comparative hardware benchmark.

## What this means for robot skin

RoboSkin analysis: this work is a useful counterexample to the claim that every contact-control problem requires dense skin. If the object model, pose tracker and hand kinematics are reliable, geometry can infer likely contacts over surfaces that have no taxels at all.

That does not eliminate the case for [robot skin](/). It relocates it. A tactile layer can directly observe unexpected objects, normal uncertainty, local slip and contacts that the tracker cannot see. Geometry offers broad coverage; touch offers physical confirmation. A hybrid system could use this controller as a contact prior and tactile residuals to correct model error.

## Limitations and availability

The method requires an object model from CAD or a short RGB-D scan and a maintained six-degree-of-freedom pose. Heavy occlusion breaks contact estimation. Thin objects are especially sensitive because millimeter-scale pose error can flip a sampled point to the far side and reverse the estimated normal.

Force allocation is quasi-static. It does not explicitly compensate gravity, inertia or external wrenches, even though friction is expected to resist unmodeled loads. Simulation disables gravity, and hardware disturbances are manual rather than standardized.

The project supplies the paper, videos and detailed results. Its code link is labeled “Soon”; no repository, data package or software license was available on September 26. The project-page content is CC BY-SA 4.0, which licenses that page, not unreleased controller code. RoboSkin.ai has not reproduced the system.

## Sources and related resources

- [arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.30082)
- [Full controller and evaluation](https://arxiv.org/html/2609.30082v1)
- [Official project and uncut hardware runs](https://sangminkim-99.github.io/reactive-grasp-whole-hand/)
- [RoboSkin dexterous robot hands guide](/robot-hands)
`,
  },
  {
    id: 'res-hil-human-guided-residual-rl-manipulation',
    title: 'Res-HIL learns corrections around a frozen manipulation policy',
    seoTitle: 'Res-HIL: Human-Guided Residual RL for Manipulation',
    seoDescription: 'Res-HIL adds human-guided residual RL to a frozen ACT policy. Examine five contact-rich tasks, ten-minute results and release limits.',
    excerpt: 'Siemens and Technical University of Munich researchers use interventions both as corrective targets and reward shaping. The real-robot study is strong on task coverage, but still depends on one operator and unreleased code.',
    category: 'Human-in-the-loop learning',
    image: '/generated/news/res-hil-human-guided-residual-rl-manipulation.png',
    imageAlt: 'Diagram showing a frozen behavior-cloning policy, a learned residual correction and occasional human interventions controlling contact-rich robot tasks.',
    imageCaption: 'Original RoboSkin.ai schematic of the Res-HIL learning loop. It is explanatory artwork, not an experimental screenshot.',
    sourceTitle: 'Res-HIL: Human-Guided Residual Reinforcement Learning for Sample-Efficient Dexterous Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2609.30023',
    sources: [
      { title: 'Res-HIL arXiv v1 submission record', url: 'https://arxiv.org/abs/2609.30023' },
      { title: 'Res-HIL v1 method, evaluation and ablations', url: 'https://arxiv.org/html/2609.30023v1' },
      { title: 'Official Res-HIL project and videos', url: 'https://iavorskaiamariia.github.io/Res-HIL-website/' },
    ],
    technicalFocus: ['human-in-the-loop reinforcement learning', 'residual policy learning', 'contact-rich manipulation', 'robot interventions'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'Preprint · arXiv v1 · videos available, no code release verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-26',
    updated: '2026-09-26',
    readTime: '7 min read',
    content: `# Res-HIL learns corrections around a frozen manipulation policy

Researchers at Siemens and the Technical University of Munich introduced Res-HIL on September 24, 2026, for sample-efficient adaptation of contact-rich robot skills. Instead of replacing a behavior-cloning policy during online learning, the method freezes it and trains a residual correction. Human interventions supervise that correction and penalize the autonomous actions that led toward failure. [Paper and version record](https://arxiv.org/abs/2609.30023).

## Key takeaways

- Every online method starts from 20 demonstrations; frozen ACT and unguided ResFiT reference policies also receive 100-demonstration variants.
- After ten minutes, Res-HIL reports 100%, 64%, 50%, 66% and 92% success across five task conditions. HIL-SERL reaches 90%, 30%, 10%, 0% and 0% under the same table.
- Final evaluations use 50 fixed randomized configurations, three training repetitions and one intervention operator. That is substantial real-robot evidence, but not independent validation across people or platforms.

## What changed

Human-in-the-loop reinforcement learning can adapt a robot online, but changing the entire policy risks discarding useful behavior already learned from demonstrations. Residual learning preserves that base and learns only an additive correction. Res-HIL combines the two ideas while addressing an unstable start: the residual output layer is initialized to zero, so the deployed action initially equals the base action.

During training, the operator takes over when failure, damage or an unrecoverable deviation seems likely, and releases control after returning the robot to a recoverable state. The human action becomes a target residual relative to the frozen base. Res-HIL also applies decaying penalties to autonomous steps immediately before the first two intervention segments, turning each correction into both a supervised example and a reward-shaping signal.

Two replay buffers keep online experience separate from initial demonstrations and intervention transitions. Training batches draw equally from both. A TD3 actor-critic objective learns the residual at 7 Hz, behavior cloning matches human corrections, and a magnitude penalty discourages unnecessarily large changes.

## Results under the reported conditions

The five conditions are easy and hard peg insertion, vent-lid insertion, and cable manipulation with two or three cameras. The base ACT policy uses 20 demonstrations. Online budgets are 20 minutes for easy peg insertion and 45 minutes for the other tasks. Each evaluation uses the same 50 predefined randomized starts across methods, and every online experiment is repeated three times. [Protocol and full tables](https://arxiv.org/html/2609.30023v1#S4).

After ten minutes, Res-HIL is already the strongest reported method on every condition. Final success is 100%, 96%, 100%, 88% and 100%. The 20-demonstration ACT base reaches 36%, 28%, 44%, 46% and 70%; ACT with 100 demonstrations reaches 84%, 60%, 80%, 80% and 92%.

HIL-SERL eventually reaches 100%, 94% and 84% on the three insertion tasks but 0% on both cable conditions. Its vent score uses a stricter edge-first criterion; it would be 100% if pushing the lid directly through were counted. Res-HIL averages 5.46 seconds across successful task episodes, compared with 5.83 seconds for 100-demonstration ACT and 7.73 seconds for 20-demonstration ACT. HIL-SERL is faster on the insertion tasks it solves, so Res-HIL's strength is coverage rather than the fastest motion everywhere.

The ablation is narrower than the main evaluation. On easy peg insertion, removing zero initialization doubles convergence time from eight to 16 minutes. Removing intervention-aware reward shaping prevents convergence within 30 minutes and finishes at 92%. The paper says direct residual supervision is critical, but these component tests do not establish identical effects on the long-horizon cable tasks.

## What this means for robotics

RoboSkin analysis: Res-HIL is relevant to [contact-rich manipulation](/tactile-manipulation) even though its policy observes cameras and proprioception rather than tactile arrays. It treats rare contact failures as correction opportunities instead of asking a new policy to rediscover the entire behavior online.

For tactile systems, the same architecture could preserve a visual-proprioceptive base while a residual learns corrections from touch. But that extension remains an inference, not a result in this paper. The study does not test tactile input, force feedback or whether interventions transfer between operators.

The comparison with 100 demonstrations also needs context. The authors estimate collecting 100 demonstrations takes about 30 minutes for peg insertion, 45 minutes for vent insertion and 60 minutes for cable manipulation. Res-HIL reduces initial demonstrations, but it adds online robot time plus a human who monitors and occasionally takes control. Sample efficiency is therefore a trade between offline demonstration and supervised online interaction, not zero human effort.

## Limitations and availability

Res-HIL is an arXiv v1 preprint on one robot setup. All interventions come from the same operator under a stated qualitative criterion. The paper reports that intervention ratios fall during training, but operator-to-operator variation, delayed takeover and safety outside the tested fixtures remain unknown.

The paper acknowledges that concurrent FTC and HiL-ResRL methods were not reproduced because they appeared shortly before submission. Comparisons therefore cover the listed baselines rather than every current human-guided residual approach.

The official project page provides task videos and a method overview. No public code repository, checkpoint, training data or software license was verified on September 26. The paper itself is available under CC BY 4.0; that license does not make absent implementation artifacts available. RoboSkin.ai has not run the training system.

## Sources and related resources

- [Res-HIL arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.30023)
- [Full method, evaluation and ablations](https://arxiv.org/html/2609.30023v1)
- [Official Res-HIL project and videos](https://iavorskaiamariia.github.io/Res-HIL-website/)
- [RoboSkin robot manipulation guide](/robot-manipulation)
`,
  },
  {
    id: 'tactilestep-sole-pressure-humanoid-locomotion',
    title: 'TactileStep closes the loop on Unitree G1 sole pressure',
    seoTitle: 'TactileStep: Sole Tactile Feedback for Humanoid Locomotion',
    seoDescription: 'TactileStep uses 25 Hz pressure insoles on a Unitree G1. Examine its impact-force results, contact-area gains, energy trade-off and code status.',
    excerpt: 'Tsinghua University researchers feed force, center-of-pressure and contact-area features from pressure insoles into a humanoid parkour policy. Hardware measurements improve on several terrains, while long-term sensor behavior and faster motion remain untested.',
    category: 'Humanoid tactile sensing',
    image: '/generated/news/tactilestep-sole-pressure-humanoid-locomotion.png',
    imageAlt: 'Diagram showing sole pressure taxels becoming force, center-of-pressure and contact-area features for a Unitree G1 locomotion policy.',
    imageCaption: 'Original RoboSkin.ai schematic of the TactileStep information flow. Values are reported measurements; the robot drawing is explanatory, not experiment imagery.',
    sourceTitle: 'TactileStep: Sole Tactile Learning for Regulating Foot-Terrain Interaction in Humanoid Locomotion',
    sourceUrl: 'https://arxiv.org/abs/2609.28959',
    sources: [
      { title: 'TactileStep arXiv v1 submission record', url: 'https://arxiv.org/abs/2609.28959' },
      { title: 'TactileStep v1 methods, results and limitations', url: 'https://arxiv.org/html/2609.28959v1' },
      { title: 'Official TactileStep project and availability', url: 'https://tactilestep.github.io/' },
    ],
    technicalFocus: ['sole tactile sensing', 'humanoid locomotion', 'pressure insoles', 'sim-to-real reinforcement learning'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'CoRL 2026 project · arXiv v1 · code pending',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-25',
    updated: '2026-09-25',
    readTime: '7 min read',
    content: `# TactileStep closes the loop on Unitree G1 sole pressure

Tsinghua University researchers released TactileStep on September 24, 2026, as a sole-tactile learning framework for humanoid locomotion. The system equips a Unitree G1 with pressure insoles and exposes three contact features to the deployed policy: normalized normal force, center of pressure and contact-area ratio. In controlled hardware comparisons, the largest reported reduction in touchdown force is 48.8%, but that maximum comes from one terrain condition and should not be generalized to every step. [Paper and version record](https://arxiv.org/abs/2609.28959).

## Key takeaways

- The actor receives 16 tactile values from a two-frame history across both feet, alongside proprioception and depth. It does not consume the full pressure map.
- Hardware testing uses 20 samples per condition and a 25 Hz wireless insole. A separate 100 Hz check on two conditions supports the paper's rising-edge force estimate, but does not establish long-term sensor accuracy.
- TactileStep reduces impact and noise under the reported terrain-matched comparisons, yet its simulated policies generally use more energy and are slightly slower than the vision-based Hiking baseline. [Results and protocol](https://arxiv.org/html/2609.28959v1#S4).

## What changed

Humanoid parkour work often treats traversal as the outcome: the robot either clears the stairs or does not. TactileStep instead makes the quality of foot contact part of control. Its Isaac Sim tactile approximation distributes each foot's resultant normal contact force over 60 virtual taxels, diffuses that load spatially and converts the result into features that can also be computed from the real insole.

The policy organizes every foot cycle into swing, pre-landing, landing and stance. Phase-aware rewards discourage excessive downward motion before contact, reduce the touchdown transient and encourage broader, more centered support after landing. The deployed actor combines these pressure-derived features with joint history and depth observations; privileged foot velocity and phase labels are reserved for training critics.

This is an important integration detail for [humanoid robot skin](/humanoid-robot-skin): the authors avoid requiring a soft-body simulator to reproduce every taxel. They align compact contact statistics instead. That lowers simulation cost, but it also discards detailed shear and spatial-pressure structure that a richer foot skin might capture.

## Results under the reported conditions

Training uses 2,048 parallel Unitree G1 agents on one RTX 4090. Simulation evaluation contains 4,096 trials per policy and terrain; hardware evaluation contains 20 samples per condition. The external comparison is Hiking in the Wild, a perceptive vision-based parkour policy, plus ablations that remove tactile observations or contact-specific rewards.

On hardware, the largest force reduction occurs during platform ascent: mean touchdown force falls from 695.0 plus or minus 49.4 N for Hiking to 355.7 plus or minus 39.8 N for TactileStep, a 48.8% relative reduction. On stair descent, peak A-weighted noise falls from 97.2 plus or minus 1.2 dB to 67.1 plus or minus 1.4 dB, while contact-area ratio rises from 0.483 to 0.598, a 23.8% relative increase. The paper reports within-terrain comparisons because material and geometry affect all three metrics. [Hardware table](https://arxiv.org/html/2609.28959v1#S4.SS3).

The trade-off is visible in simulation. TactileStep matches or exceeds traversal success across six terrains, but usually has slightly higher velocity error, longer traversal time and higher energy. Stair ascent, for example, uses 1,126.3 plus or minus 66.6 J versus 802.2 plus or minus 97.0 J for the baseline. Lower impact is therefore not a free efficiency gain.

## What this means for robotics

RoboSkin analysis: TactileStep is strongest as evidence that distributed pressure can close the loop after vision has chosen a foothold. Geometry predicts where a foot may land; sole pressure reveals the contact that actually formed. That distinction matters for [physical AI touch](/physical-ai-touch) systems operating on edges, stairs or compliant structures.

The engineering lesson is also conservative. A 25 Hz sensing path can improve learned whole-body behavior when the policy uses phase-level contact features, but it is not equivalent to a high-bandwidth impact controller. Teams should budget separately for insole acquisition, wireless reliability, model inference and the lower-level joint controller.

## Limitations and availability

The work evaluates one Unitree G1 within bounded motion commands. Faster motion, deformable or granular ground, systematic recovery behavior, insole durability, drift and recalibration are not evaluated. The project page labels the work accepted at CoRL 2026; RoboSkin.ai has not independently reproduced it.

The wireless insole operates at 25 Hz with less than 1 ms of post-acquisition processing and communication delay; wired acquisition supports 100 Hz. In a two-condition validation, 100 Hz measurements were close but not identical to the 25 Hz values. This check addresses peak under-sampling, not every source of calibration error. [Sampling validation](https://arxiv.org/html/2609.28959v1#A3.SS3).

The official project page supplied paper, videos and tables on September 25, but displayed “Code Soon.” No repository, weights, training environments or sensor dataset were verified. [Official availability](https://tactilestep.github.io/).

## Sources and related resources

- [TactileStep arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.28959)
- [Full methods, evaluation and limitations](https://arxiv.org/html/2609.28959v1)
- [Official TactileStep project](https://tactilestep.github.io/)
- [RoboSkin tactile sensors guide](/sensors)
`,
  },
  {
    id: 'anthropomimetic-forearm-carpal-stiffness',
    title: 'An open robotic forearm tests how eight carpal bones redirect wrist stiffness',
    seoTitle: 'Open Anthropomimetic Forearm Tests Carpal Wrist Stiffness',
    seoDescription: 'An open robotic forearm uses eight carpal bones and 22 actuated muscles. Review the stiffness experiment, single-build limit, CAD, data and licenses.',
    excerpt: 'A University of Electro-Communications team compares anatomically shaped, fused and ellipsoidal wrist skeletons. Its open release includes CAD, printable parts, firmware and analysis data under file-specific licenses.',
    category: 'Soft robotic hardware',
    image: '/generated/news/anthropomimetic-forearm-carpal-stiffness.png',
    imageAlt: 'Diagram comparing independently articulated carpal bones, a fused proximal row and an ellipsoidal wrist skeleton under tendon loading.',
    imageCaption: 'Original RoboSkin.ai schematic of the three wrist configurations. It simplifies the anatomy and is not an experimental photograph.',
    sourceTitle: 'Anthropomimetic Soft Robotic Forearm with Independently Articulated Carpal Bones Enabling Human-Like Adaptive Stiffness Modulability',
    sourceUrl: 'https://arxiv.org/abs/2609.29176',
    sources: [
      { title: 'Anthropomimetic forearm arXiv v1 record', url: 'https://arxiv.org/abs/2609.29176' },
      { title: 'Full v1 paper, methods and limitations', url: 'https://arxiv.org/html/2609.29176v1' },
      { title: 'Official CAD, firmware, analysis and data repository', url: 'https://github.com/TogoLab/anthropomimetic-forearm-carpal-stiffness' },
    ],
    technicalFocus: ['anthropomimetic forearm', 'robot wrist stiffness', 'open robot hardware', 'compliant fingertips'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'Preprint · arXiv v1 · open hardware and data',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-25',
    updated: '2026-09-25',
    readTime: '7 min read',
    content: `# An open robotic forearm tests how eight carpal bones redirect wrist stiffness

Researchers at the University of Electro-Communications in Tokyo released an anthropomimetic soft robotic forearm on September 24, 2026, to test how carpal-bone structure changes wrist stiffness. The prototype reproduces eight independently movable carpal bones, 22 actuated muscles, 13 finger degrees of freedom and a three-degree-of-freedom wrist. Its open companion repository includes CAD, printable parts, firmware, measured data and analysis code. [Paper and version record](https://arxiv.org/abs/2609.29176).

## Key takeaways

- The study compares one anatomical wrist, a fused proximal carpal row and a geometric ellipsoidal skeleton under four muscle-activation patterns.
- With the anatomical skeleton, switching from finger-only to combined wrist-and-finger activation rotates the stiffness ellipse by 48.2 degrees; a permutation test reports p equals 0.0038.
- The release is unusually complete, but licenses differ by file: derived bone models and fingertip molds use CC BY-SA 2.1 JP, while the authors' other materials use CC BY 4.0. [Repository and license map](https://github.com/TogoLab/anthropomimetic-forearm-carpal-stiffness).

## What changed

Many robot wrists simplify the human carpus into one or two joints. This forearm instead uses CT-derived bone geometry, knitted polyethylene ligaments, tendon sheaths, a printed triangular fibrocartilage complex and dual-layer silicone fingertips. Nineteen muscles use tendon transmission; three intrinsic thumb muscles enable opposition. The assembled hand can grasp while its wrist moves, but the research question is mechanical rather than task-level autonomy.

To isolate morphology, every active muscle receives the same 0.6 N tension. A force gauge deflects the wrist 3 mm from 12 directions at 30-degree intervals, while motion capture samples at 100 Hz. The team runs eight trials per activation condition and direction, fits a stiffness ellipse, then separately records 20 repetitions per condition of motion between selected carpal bones.

That protocol matters when interpreting the result: the paper tests whether structure can redirect stiffness under uniform inputs. It does not optimize tendon forces or show an autonomous [robot hand](/robot-hands) choosing stiffness for a manipulation task.

## What the stiffness experiment found

For the anatomical skeleton, finger-muscle activation places the low-stiffness axis near the human dart-throwing direction. Combined wrist-and-finger activation instead aligns the high-stiffness axis with that direction. The observed 48.2-degree major-axis shift exceeded 4,982 of 5,000 shuffled-label outcomes.

Fusing the proximal row changes that behavior. Under finger activation, minimum-axis stiffness rises from 80.1 N/m for the anatomical skeleton to 149.5 N/m for the fused skeleton, and the low-stiffness direction moves away from the dart-throwing range. The ellipsoidal skeleton is stiffer overall, reaching major-axis values from 282.2 to 518.3 N/m under finger-only and wrist-only activation, but its ellipse orientation stays between about 86 and 96 degrees across conditions.

The carpal-motion test provides a narrower mechanistic result. Activation condition significantly changes relative rotation and translation at the proximal carpal row, while the midcarpal changes do not reach significance. The paper treats the latter as a supporting trend rather than a confirmed effect. [Stiffness and motion results](https://arxiv.org/html/2609.29176v1#S3).

## What this means for robotics

RoboSkin analysis: high stiffness alone is not the same as useful stiffness. The ellipsoidal wrist is strongest in absolute terms but least able to redirect its compliance. For contact-rich manipulation, morphology that changes where the hand yields may reduce how much active control is needed before [tactile feedback](/tactile-manipulation) reacts.

The open hardware is also valuable as a reproducibility package. Engineers can inspect the bone and jig CAD, bill of materials, Dynamixel firmware and analysis scripts instead of inferring construction from figures. That makes this closer to a buildable mechanical research artifact than most paper-only robot-hand releases.

## Limitations and availability

All stiffness measurements are quasi-static. The paper does not evaluate impacts, fast grasp corrections, hammering, autonomous manipulation success or repeated builds. Every reported result comes from one physical prototype. Assembly jigs and current control improve consistency within that build, but cannot establish inter-build variation.

The repository was publicly accessible on September 25 and contained analysis data, Python code, PlatformIO firmware, CAD, STL files, a bill of materials and video. Multiple licenses apply, so “open hardware” does not mean every file has the same reuse terms. Users must preserve the share-alike license for the derived BodyParts3D components where applicable. RoboSkin.ai did not fabricate or test the design.

## Sources and related resources

- [arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.29176)
- [Full paper and supplementary material](https://arxiv.org/html/2609.29176v1)
- [Official open-hardware repository](https://github.com/TogoLab/anthropomimetic-forearm-carpal-stiffness)
- [RoboSkin soft robotic skin overview](/applications/soft-robotic-skin)
`,
  },
  {
    id: 'camp-cooperative-arm-hand-motion-planning',
    title: 'CAMP plans arm motion and hand shape together in constrained spaces',
    seoTitle: 'CAMP Arm-Hand Motion Planning: Results and Code Status',
    seoDescription: 'CAMP coordinates a UR7e and LinkerHand through constrained spaces. Check its simulation protocol, 30 physical trials, planning time and code status.',
    excerpt: 'CAMP combines layered hand search, local arm relaxation and compact trajectory optimization. Its physical trials validate reaching prescribed configurations, not autonomous grasping or button actuation.',
    category: 'Dexterous motion planning',
    image: '/generated/news/camp-cooperative-arm-hand-motion-planning.png',
    imageAlt: 'Diagram of an arm and articulated hand changing posture together while passing through a narrow obstacle field.',
    imageCaption: 'Original RoboSkin.ai schematic of CAMP arm-hand coordination. It is not a simulation frame or real-robot result image.',
    sourceTitle: 'CAMP: Cooperative Arm-Hand Motion Planning in Constrained Spaces',
    sourceUrl: 'https://arxiv.org/abs/2609.29021',
    sources: [
      { title: 'CAMP arXiv v1 submission record', url: 'https://arxiv.org/abs/2609.29021' },
      { title: 'CAMP v1 methods, comparisons and physical trials', url: 'https://arxiv.org/html/2609.29021v1' },
      { title: 'Official CAMP project and demonstrations', url: 'https://camp-armhand.github.io/' },
      { title: 'Official CAMP code availability statement', url: 'https://camp-armhand.github.io/code.html' },
    ],
    technicalFocus: ['dexterous motion planning', 'arm-hand coordination', 'LinkerHand', 'constrained manipulation'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'Preprint · arXiv v1 · code not yet released',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-25',
    updated: '2026-09-25',
    readTime: '7 min read',
    content: `# CAMP plans arm motion and hand shape together in constrained spaces

Researchers from Harbin Institute of Technology, Great Bay University and collaborating institutions introduced CAMP on September 24, 2026, for cooperative arm-hand motion planning. Instead of fixing a hand shape while an arm finds a path, CAMP adjusts both throughout the route. On six simulated constrained tasks, reported planning success ranges from 84.2% to 98.5%. Physical evaluation uses a UR7e arm and 16-degree-of-freedom LinkerHand, but its success definitions stop at prescribed goal configurations. [Paper and version record](https://arxiv.org/abs/2609.29021).

## Key takeaways

- CAMP searches hand configurations along multiple arm guides, locally relaxes the arm when transitions are blocked and then jointly optimizes both trajectories.
- Simulation results average 10 batches of 100 trials per task. Solver time excludes setup, dense validation, collision-checker construction, file I/O and playback.
- Thirty physical trials test three reaching or pregrasp configurations. They do not measure autonomous object pickup, lifting or a real button press. [Physical protocol](https://arxiv.org/html/2609.29021v1#S4.SS4).

## What changed

Separate planning creates a geometric blind spot. An arm path that clears an obstacle may still leave no continuous sequence of finger configurations. Searching all 22 active joints at once preserves that coupling but makes global planning difficult.

CAMP represents the possible collision-free hand shapes at each arm configuration as a feasible hand fiber. It creates multiple arm-space guides, performs layered bidirectional hand search and permits small arm changes where adjacent hand layers cannot connect. Complete candidates are compressed into endpoint-preserving via-point movement primitives, then ranked through coarse-to-fine optimization.

Under the reported settings, a waypoint-wise trajectory would require 4,356 optimization variables after fixing endpoints. The movement-primitive form uses 500 weights while keeping independent trajectories for the six arm and 16 hand joints. This compression helps explain why the method can retain coordinated [dexterous manipulation](/robot-manipulation) without optimizing every waypoint directly.

## What do the simulation numbers mean?

Each task-method batch contains 100 randomized obstacle scenes. The authors repeat the main comparison over 10 batches. A success is a complete trajectory that reaches a manually screened goal configuration, satisfies constraints and passes exact MuJoCo collision checks. It is a planning metric, not physical task completion.

CAMP reports 98.5% mean success on Wall Traversal with 3.40 seconds mean solver time, 92.5% and 30.10 seconds on Narrow Passage Traversal, and 84.2% and 42.60 seconds on Cabinet Cylinder Pregrasp. It exceeds RRT-Connect, QRRT*, CHOMP and A-star-plus-CHOMP in reported success across all six tasks, though RRT-Connect is faster on the easiest wall case.

A 100-trial Ball-in-Box ablation separates the design choices. Removing arm relaxation lowers success from 92% to 74%. Replacing the compact representation with waypoint-wise variables yields 79% and increases mean solver time from 32.45 to 84.97 seconds. Using fine-only optimization yields 81% at 25.15 seconds. [Full comparisons and ablations](https://arxiv.org/html/2609.29021v1#S4).

## What happened on the physical robot?

The authors run 10 complete-system trials for each of three configurations. Ball-in-Box Pregrasp reaches its goal in 8 of 10 trials, Display Button Press in 9 of 10 and Cabinet Cylinder Pregrasp in 8 of 10. A 1 cm collision margin compensates for obstacle-modeling error.

The labels need careful reading. The two pregrasp tasks require reaching a goal pose but not grasping or lifting; later grasp motions shown for demonstration are manually adjusted. Display Button Press requires a fingertip to reach a target, and no physical button is actuated. Most failures are hand-obstacle collisions. The physical study therefore validates coordinated execution, not closed-loop contact manipulation.

## What this means for robotics

RoboSkin analysis: CAMP addresses the stage before touch. Better coordination can position a large articulated hand where [tactile sensing](/sensors) becomes useful, but the planner itself does not observe contact or adapt from tactile feedback. A production stack would still need scene updates, execution monitoring and a contact-aware controller after approach.

The planning-time definitions also matter. Teams integrating CAMP would need to add perception, scene construction, validation and command transfer to the reported solver times. Static known geometry is a narrower problem than moving clutter or a deforming object.

## Limitations and availability

The experiments use one arm-hand platform, static obstacles and known geometry. Goal configurations are generated with IK and manually screened. Physical failures remain sensitive to obstacle localization, camera calibration and execution error. No dynamic replanning or contact recovery is evaluated.

The official project page supplies videos and detailed tables, but identifies itself as an anonymous submission even though arXiv lists the authors. Its Code link states that implementation is planned after paper acceptance. No repository, license or downloadable planner was verified on September 25. [Official code statement](https://camp-armhand.github.io/code.html). RoboSkin.ai has not run CAMP.

## Sources and related resources

- [CAMP arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.29021)
- [Full CAMP methods and evaluation](https://arxiv.org/html/2609.29021v1)
- [Official project and videos](https://camp-armhand.github.io/)
- [RoboSkin robot-hands guide](/robot-hands)
`,
  },
  {
    id: 'support-enhanced-granular-jamming-gripper',
    title: 'A support rod turns granular jamming into a continuum-robot gripper',
    seoTitle: 'Support-Enhanced Granular-Jamming Gripper: Test Results',
    seoDescription: 'A granular-jamming gripper adds an internal support rod for a continuum robot. Review 10-trial tests, shape limits, 4.23 cm reaching RMSE and availability.',
    excerpt: 'The design couples a compliant membrane and particles with a direct load path at a bending robot tip. Mechanical tests are quantitative; the complete autonomous sequence is demonstrated without a reported success rate.',
    category: 'Adaptive grippers',
    image: '/generated/news/support-enhanced-granular-jamming-gripper.png',
    imageAlt: 'Diagram showing an unjammed particle-filled membrane conforming around an object before vacuum and an internal rod form a load path.',
    imageCaption: 'Original RoboSkin.ai schematic of the granular-jamming sequence. It is an explanatory graphic, not an experimental photograph.',
    sourceTitle: 'A Support-Enhanced Granular-Jamming Gripper for RL-based Grasping with Continuum Manipulators',
    sourceUrl: 'https://arxiv.org/abs/2609.29093',
    sources: [
      { title: 'Granular-jamming gripper arXiv v1 record', url: 'https://arxiv.org/abs/2609.29093' },
      { title: 'Full v1 design, tests and deployment paper', url: 'https://arxiv.org/html/2609.29093v1' },
    ],
    technicalFocus: ['granular-jamming gripper', 'continuum robot', 'mechanical adaptation', 'sim-to-real reinforcement learning'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'Preprint · arXiv v1 · paper-only release',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-25',
    updated: '2026-09-25',
    readTime: '7 min read',
    content: `# A support rod turns granular jamming into a continuum-robot gripper

Danyu Liu and colleagues released a support-enhanced granular-jamming gripper on September 24, 2026, for tendon-driven continuum manipulators. A flexible membrane and mobile particles conform during contact; vacuum locks that shape, while an internal rod promotes enclosure and carries load back to the bending robot tip. In a matched 10-trial mechanical test, the supported gripper completed 10 lifts and holds versus six without the rod. [Paper and version record](https://arxiv.org/abs/2609.29093).

## Key takeaways

- The reported 100% versus 60% result is one 10-trial configuration comparison with a common object, approach and vacuum condition. It is not a broad autonomous success rate.
- Shape tests vary sharply: sphere 10/10, hexagonal prism 9/10, cylinder and cube 8/10 each, and triangular pyramid 1/10.
- A reinforcement-learning controller reaches with 4.23 cm terminal RMSE over 16 physical rollouts, but it controls only the tendon-driven approach. Passive mechanics form the grasp and a task layer switches the vacuum. [Design and deployment results](https://arxiv.org/html/2609.29093v1#S6).

## What changed

Continuum manipulators reach through confined spaces by bending rather than rotating rigid joints, but that compliance makes their end-effector pose difficult to reproduce. A conventional rigid gripper can fail when tendon friction, hysteresis or external loading leaves a small residual error.

The proposed end effector adds a support rod inside a particle-filled membrane. Before vacuum, the rod provides a boundary against which the membrane can wrap, transmits continued approach force and helps develop a deeper enclosure. After evacuation, it creates a more direct load path instead of asking the membrane alone to retain the object.

The team compares natural-rubber and thermoplastic-polyurethane membranes, three particle types and three fill ratios. The selected design uses natural rubber, thermoplastic-rubber spheres and a 50% nominal filling ratio. The paper says the thermoplastic-rubber fill lowers gripper mass relative to polystyrene while retaining the same measured success, but does not report the absolute mass. [Configuration study](https://arxiv.org/html/2609.29093v1#S4.SS2).

## How much contact error can it absorb?

Mechanical characterization separates the gripper from the learned controller. A successful trial requires lifting an object clear of the table and retaining it through the lift. Ten trials are run per condition.

The internal-rod comparison improves from 6/10 to 10/10 under the selected configuration. Fill ratio is not monotonic: one-third, one-half and four-fifths fill produce 90%, 100% and 70%, respectively. Too little fill reduces load-bearing particles; too much restricts conformity.

Offset tests reveal an asymmetric graspable region rather than a circular tolerance around the nominal center. The rod approaches at roughly 30 to 40 degrees relative to the table, so the membrane, rod, object and table form better enclosures on one side. The plotted continuous field interpolates discrete tests; it is not a dense measurement at every position.

Object geometry remains a strong constraint. The triangular pyramid succeeds only once in 10 attempts because sharp edges and limited stable contact promote membrane folding and slip. Mechanical compliance enlarges a set of workable poses; it does not remove pose and geometry requirements.

## What does the learned controller contribute?

The policy observes four frames of gripper position, target displacement and four tendon lengths, then outputs absolute tendon-length commands. Training randomizes initial posture, target position, effective stiffness and actuation delay in a piecewise-constant-curvature simulation. Deployment replaces simulated positions with RGB-camera estimates and performs no physical fine-tuning.

Across 16 physical reaches to two target positions, terminal RMSE is 4.23 cm versus 2.51 cm in simulation. The complete reach-grasp-lift-transfer-release sequence is shown, but the paper does not report repeated end-to-end success. That distinction prevents one demonstration from being read as a reliability benchmark.

## What this means for robotics

RoboSkin analysis: this is physical intelligence at the contact interface. The learned policy only has to reach a finite region, while deformable material absorbs some residual error. That can be useful where a slender continuum robot cannot carry a heavy multi-fingered hand.

The current design does not include [tactile or pressure sensing](/tactile-ai). Vacuum timing is coordinated by the task layer, not inferred from a measured pressure map. Adding contact feedback, as the authors propose, could help decide when sufficient enclosure has formed and detect retention loss during transfer.

## Limitations and availability

Tests cover a limited set of objects, approach orientations and contact offsets. The support geometry is not optimized, broader three-dimensional pose variation is not evaluated and the absolute gripper mass is unreported. The paper's title page does not state affiliations; acknowledgements cite support involving the Hong Kong Centre for Logistics Robotics, the Chinese University of Hong Kong, Zhejiang University and China's National Natural Science Foundation. That funding statement is not used here to infer author employment.

The arXiv v1 paper was accessible on September 25. No official project page, CAD, bill of materials, controller repository, dataset or license for implementation assets was linked. RoboSkin.ai has not reproduced the hardware or policy.

## Sources and related resources

- [arXiv v1 record, submitted September 24, 2026](https://arxiv.org/abs/2609.29093)
- [Full gripper design and evaluation](https://arxiv.org/html/2609.29093v1)
- [RoboSkin soft robotic skin guide](/applications/soft-robotic-skin)
- [RoboSkin robot manipulation guide](/robot-manipulation)
`,
  },
  {
    id: 'internw0-contact-aware-world-model-pipetting',
    title: "InternW0 links asynchronous world prediction with contact-aware pipetting",
    seoTitle: "InternW0: Contact-Aware Pipetting Results and Model Access",
    seoDescription: "Inspect InternW0’s contact-aware pipetting, progress metrics, asynchronous action latency and EgoLab training data. Check what code and model assets are available.",
    excerpt: "Shanghai AI Laboratory combines slower world prediction with faster action updates and contact-aware post-training. Its laboratory results require careful separation of task progress, full completion and model-side latency.",
    category: "Contact-aware world models",
    image: "/generated/news/internw0-asynchronous-contact-control.png",
    imageAlt: "Diagram separating InternW0's slower video prediction, cached context updated by observations, and faster contact-aware action generation.",
    imageCaption: "Original RoboSkin.ai schematic based on InternW0 v1. The reported action-path timing excludes asynchronous video-plan generation. Not an experiment image.",
    sourceTitle: "InternW0: A Foundational Physical World Model for Efficient Real-World Interactions",
    sourceUrl: "https://arxiv.org/abs/2609.27656",
    sources: [{"title": "InternW0 v1 technical report and results", "url": "https://arxiv.org/html/2609.27656v1"}, {"title": "Official InternW0 project and availability", "url": "https://internrobotics.github.io/internw0"}],
    technicalFocus: ["robot world models", "contact-aware manipulation", "dexterous manipulation", "egocentric robot learning"],
    sourceDate: "2026-09-23",
    evidenceStatus: "Technical report · arXiv v1",
    author: "RoboSkin.ai Editorial Team",
    date: "2026-09-25",
    updated: "2026-09-25",
    readTime: "7 min read",
    content: `# InternW0 links asynchronous world prediction with contact-aware pipetting

Shanghai AI Laboratory's Physical Intelligence Team introduced InternW0, a foundational physical world model for efficient real-world interactions, in a technical report submitted to arXiv on September 23, 2026. The system separates slower video prediction from faster action generation and adds force and tactile channels during contact-aware post-training. Its dexterous pipetting experiment connects world-model research to tool contact, but the headline laboratory scores measure task progress rather than complete-workflow success. [Paper and submission record](https://arxiv.org/abs/2609.27656).

## Key takeaways

- InternW0 reuses predictive video context while updating actions from incoming observations. Force and tactile histories can condition the action expert during downstream post-training.
- The five-stage pipetting task reports 65.3% average progress over 15 trials, versus 46.7% for π0.5 and 18.7% for Fast-WAM. These percentages do not mean that the complete procedure succeeded that often.
- The paper reports 7,233.5 pretraining hours and 60.73 ms critical-path action latency on RTX 5090D. Neither figure describes a downloadable tactile dataset or an end-to-end robot control guarantee; official model and code buttons were disabled when checked. [Real-robot results](https://arxiv.org/html/2609.27656v1#S5), [efficiency](https://arxiv.org/html/2609.27656v1#S6) and [project page](https://internrobotics.github.io/internw0).

## How does the model keep predictions useful during contact?

A predicted future becomes less useful when an object slips or a tool encounters unexpected resistance. Regenerating an entire video prediction for every action update is expensive, however. InternW0 uses separate video and action experts in a mixture-of-transformers architecture to operate at different timescales.

The video expert produces longer-horizon context. Its internal attention keys and values are cached, then an observation-conditioned editor adapts how that context is exposed to each action chunk. Fresh visual observations can therefore change local control without requiring the full video predictor to finish another pass first. The video pathway uses a frozen Wan variational autoencoder, while a frozen DINOv3 encoder represents current visual observations.

For contact-rich post-training, the action expert additionally receives available force and tactile histories. It jointly predicts future actions and interaction signals; action channels are executed, while the predicted contact channels represent expected feedback. This is a task-specific extension of the action interface, not evidence that every pretraining trajectory includes tactile measurements. [Architecture and contact-aware post-training](https://arxiv.org/html/2609.27656v1#S2.SS1).

## What does the pipetting experiment establish?

The setup combines a 20-degree-of-freedom hand with a seven-degree-of-freedom arm and hybrid force-position control. Its five stages are pickup and reorientation, tip attachment, aspiration, dispensing, and tip ejection with return. The authors run 15 trials per real-world task with randomized initial object positions and orientations. For multi-stage tasks, the compared methods share the same vision-language model for subtask generation.

The 65.3% pipetting score is the proportion of correctly completed, ordered subtasks averaged over trials. Table 7 separately lists 46.7% for InternW0's final tip-ejection-and-return stage. Keeping both figures visible prevents average progress from being mistaken for full-sequence reliability. π0.5 also scores higher on the initial pickup and reorientation stage, 93.3% versus 86.7%, while InternW0 leads on the four subsequent stages. [Evaluation protocol and Table 7](https://arxiv.org/html/2609.27656v1#S5.SS1).

The related 15-stage metal-organic-framework preparation task follows the same distinction: InternW0 reports 68.4% average progress, but 26.7% at the final listed stage. These are manipulation measurements, not proof of chemical synthesis quality. Likewise, the pipetting results do not provide a volumetric-accuracy benchmark merely because the task is named quantitative pipetting.

RoboSkin analysis: these experiments make compliant tool interaction a useful evaluation target for [robot world models](/robot-world-models) and [tactile AI](/tactile-ai). They do not isolate the contribution of tactile input from pretraining, predictive modeling and low-level control. The reported comparison should therefore guide integration questions, not be read as a controlled measurement of the benefit of adding a particular touch sensor.

## What is in the reported training mixture?

Table 1 totals 7,233.5 hours and 811,969 episodes across seven datasets and 25 training domains. Those domains reflect data sources and configurations, rather than 25 distinct robot bodies. The mixture contains real-robot trajectories, simulated manipulation and EgoLab egocentric laboratory videos; it is not a 7,200-hour tactile corpus.

EgoLab contributes 275.4 hours and 3,192 episodes. Although hand trajectories are reconstructed to assist filtering, its pretraining contribution uses a video-only pathway without robot-action labels. Other [robotics datasets](/datasets) supply action supervision through a unified 37-dimensional interface with validity masks for missing channels. The report also states that dexterous-hand robot data is excluded from this pretraining corpus, making downstream specialization important to interpreting the pipetting example. [Data recipe](https://arxiv.org/html/2609.27656v1#S3).

## How fast is the action path?

On the same RTX 5090D hardware and numerical-precision setting used for its comparison, the paper reports 60.73 ms per critical-path action update, corresponding to a maximum model-side rate of 16.47 Hz. This includes observation encoding, context routing and action denoising, but excludes asynchronously scheduled video-plan generation. The reported 3.13-fold speedup is relative to Fast-WAM under that action-generation protocol.

Engineers still need to budget sensor acquisition, communication and actuator behavior. A model-side update rate is not the same as a tactile sampling rate or a certified contact-control loop. This distinction also matters when comparing [visuo-tactile world-model systems](/guides/visuo-tactile-world-models-robot-manipulation). [Timing definition](https://arxiv.org/html/2609.27656v1#S6.SS1).

## Limitations and availability

This is an arXiv v1 technical report, and RoboSkin has not independently reproduced its results. Laboratory evidence is limited to the reported tasks and trials; sustained operation, disturbance recovery and transfer to other instruments need further evaluation.

On September 25, the official project provided the paper and demonstration videos, but its GitHub, Hugging Face and ModelScope buttons were disabled rather than linked to releases. No downloadable InternW0 weights, complete implementation or EgoLab archive was verified there. The paper's CC BY 4.0 license does not establish a license for unreleased software, models or data. Reported training scale and accessible release assets must remain separate. [Official availability](https://internrobotics.github.io/internw0).

## Sources and related resources

- [InternW0 arXiv v1, submitted September 23, 2026](https://arxiv.org/abs/2609.27656)
- [Technical report and experimental tables](https://arxiv.org/html/2609.27656v1)
- [Official InternW0 project](https://internrobotics.github.io/internw0)
- [RoboSkin datasets directory](/datasets)
`,
  },
  {
    id: 'glotouch-global-local-haptic-search',
    title: 'GLoTouch lets one parallel gripper search and identify objects without external vision',
    seoTitle: 'GLoTouch: Haptic Object Search Without External Vision',
    seoDescription: 'GLoTouch pairs a passive probe with bilateral visuotactile sensing. Examine its 50-trial robot result, matching ablations and release limits.',
    excerpt: 'GLoTouch turns one parallel gripper into a long-range force probe and a local visuotactile matcher. It retrieved 38 of 50 model-specified targets on hardware, but requires known scene geometry and a target mesh.',
    category: 'Haptic perception',
    image: '/generated/news/glotouch-global-local-haptic-search.png',
    imageAlt: 'Diagram showing a gripper using a long probe for global force search, then bilateral tactile fingertips for local object matching and retrieval.',
    imageCaption: 'Original RoboSkin.ai explanation of GLoTouch. This is a schematic of the two-stage pipeline, not an experimental image.',
    sourceTitle: 'GLoTouch: Global-to-Local Haptic Perception Using a Parallel Gripper for Object Search, Recognition, and Grasping Without External Vision',
    sourceUrl: 'https://arxiv.org/abs/2609.27695',
    sources: [
      { title: 'GLoTouch arXiv submission record', url: 'https://arxiv.org/abs/2609.27695' },
      { title: 'GLoTouch v1 methods, tables and limitations', url: 'https://arxiv.org/html/2609.27695v1' },
    ],
    technicalFocus: ['haptic object search', 'visuotactile sensing', 'parallel grippers', 'blind object retrieval'],
    content: `# GLoTouch lets one parallel gripper search and identify objects without external vision

Zonglin Li and colleagues introduced GLoTouch on September 23, 2026, as an arXiv v1 preprint from an independent researcher, Shanghai Jiao Tong University and the University of Hong Kong. The system gives a standard parallel gripper two haptic roles: it first carries a passive probe to search a container with wrist force sensing, then puts the probe away and uses bilateral visuotactile fingertips to identify and retrieve the object matching a supplied 3D mesh. In 50 randomized real-robot trials, the complete pipeline retrieved 38 targets. [Paper and version record](https://arxiv.org/abs/2609.27695).

## Key takeaways

- GLoTouch retrieved 84 of 100 targets in simulation and 38 of 50 on a Flexiv robot. Each scene contained the same five 3D-printed object classes, and success required search, recognition, grasping and lifting.
- The local matcher needs no object-specific training, but it does need the target STL model, known container registration, known object count and objects that are reachable from above.
- The paper says code will be open-sourced. No repository, downloadable dataset or software license was linked from the v1 record on September 24. [Full methods and experiments](https://arxiv.org/html/2609.27695v1).

## What changed

Parallel grippers normally trade dexterity for simple, reliable grasping. GLoTouch extends their perceptual range without adding an actuated search hand. During global exploration, the Xense gripper holds a spherical-tipped probe that has no embedded sensor. A six-axis wrist force-torque sensor, robot kinematics and the known probe shape localize contact while the robot follows a coverage path. Multi-directional probing estimates candidate centers, contours and heights.

The robot then places the probe in a holder. Bilateral visuotactile depth maps and jaw aperture form a local TouchSet for each candidate. A finite-window matcher compares width, depth and acquisition mode against synthetic observations generated from the target STL. Candidates are ranked by matching loss before the gripper closes under a force limit.

This division matters: the probe covers a larger workspace, while the fingertips collect spatially resolved geometry only after an object is found. The same gripper remains available for the final grasp.

## Results under the reported conditions

In simulation, each of five targets was tested 20 times in randomized five-object layouts. GLoTouch completed 84 of 100 retrievals. A separate global-search ablation found all five objects within a 5-meter motion budget in 55% of 100 layouts, compared with 30% for random descent. That is a scene-discovery metric, not the end-to-end success rate.

The local matching component was also isolated on 60 target-and-phase samples from five physical objects. Width and action alone achieved 41 of 60 correct top-1 matches. Adding local depth raised this to 47 of 60; the complete matcher reached 54 of 60. The samples reuse different subsets of contact sequences, so 60 should not be read as 60 independently collected objects.

On hardware, every target was evaluated in 10 randomized scenes. The Flexiv arm and Xense gripper retrieved 38 of 50 targets, or 76%. Apple was retrieved in all 10 trials, while Train succeeded in 5 of 10. Confusion between Train and Truck, object motion during probing and toppling during clamping were reported failure modes.

## What this means for robotics

RoboSkin analysis: GLoTouch is a useful integration pattern for haptic search. It reserves high-resolution [visuotactile sensing](/sensors) for the stage where local geometry is valuable, and uses cheaper tool-mediated force contact for global coverage. A detachable probe may be easier to service than a large tactile array and leaves the end effector free for manipulation.

The method is not touch-only in the broadest sense: it relies on proprioception, wrist wrench sensing, known robot-to-container registration and a pre-existing target mesh. It also assumes top access and objects resting on the container floor. Deployments in cluttered bins would need safeguards for entanglement, stacked objects and accumulated pose error. Those integration conditions are at least as important as the recognition score for teams building [tactile manipulation](/tactile-manipulation) systems.

## Limitations and availability

This is a preprint, not an independently reproduced result, and RoboSkin.ai has not run the system. Evaluation uses one arm-gripper configuration and five printed objects. The global stage depends on a wrist force-torque sensor; the passive probe does not turn an otherwise sensorless gripper into a contact detector. The paper also assumes a known scene cardinality and does not evaluate transparent versus opaque objects as separate conditions because external vision is excluded from control.

The arXiv record and full v1 paper were accessible on September 24. The manuscript states that source code will be released, which is a future commitment rather than current availability. No official code repository, data archive or license was linked. The safest current description is paper-only, with videos and implementation assets not established as reusable resources.

## Sources

- [arXiv v1 record, submitted September 23, 2026](https://arxiv.org/abs/2609.27695)
- [Full GLoTouch v1 paper](https://arxiv.org/html/2609.27695v1)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-24',
    updated: '2026-09-24',
    readTime: '6 min read',
    sourceDate: '2026-09-23',
    evidenceStatus: 'Preprint · arXiv v1 · paper-only release',
  },
  {
    id: 'copre-proprioceptive-contact-detection',
    title: 'CoPRE detects weak robot contact from proprioception without force labels',
    seoTitle: 'CoPRE: Weak Contact Detection for Low-Cost Robot Arms',
    seoDescription: 'CoPRE learns contact-free joint response on ARX and G1 arms. Review its 90-trial protocol, force-reference caveat and public evidence files.',
    excerpt: 'CoPRE learns the expected joint-torque response from contact-free motion and scores the residual through a noise-weighted Jacobian. It improves recall on ARX and G1 arms, with robot-specific calibration and unquantified downstream task success.',
    category: 'Proprioceptive touch',
    image: '/generated/news/copre-proprioceptive-contact-detection.png',
    imageAlt: 'Diagram showing contact-free robot motion training a torque predictor, followed by residual scoring and a contact-triggered retreat.',
    imageCaption: 'Original RoboSkin.ai explanation of CoPRE. Forces and detector traces are schematic rather than measured trial data.',
    sourceTitle: 'CoPRE: Improving Sensitivity in Proprioceptive Contact Detection for Low-Cost Robot Arms',
    sourceUrl: 'https://arxiv.org/abs/2609.27381',
    sources: [
      { title: 'CoPRE arXiv submission record', url: 'https://arxiv.org/abs/2609.27381' },
      { title: 'CoPRE v1 methods, experiments and limitations', url: 'https://arxiv.org/html/2609.27381v1' },
      { title: 'Official CoPRE project and evidence page', url: 'https://copre-arm.github.io/' },
      { title: 'CoPRE evidence-file documentation', url: 'https://copre-arm.github.io/assets/data/README.txt' },
    ],
    technicalFocus: ['proprioceptive contact detection', 'sensorless touch', 'robot safety', 'humanoid arms'],
    content: `# CoPRE detects weak robot contact from proprioception without force labels

Researchers from Duke University, KTH Royal Institute of Technology and Carnegie Mellon University released Contact-free Proprioceptive Response Estimation, or CoPRE, on September 23, 2026. The arXiv v1 method trains on contact-free joint motion, predicts the torque response that should occur without contact and converts the residual into a contact score. It requires neither dedicated force sensors nor labeled collisions. Across 45 physical contact trials on each of two arms, CoPRE reported 74.1% recall on an ARX L5 and 82.2% on a Unitree G1 right arm. [Paper and version record](https://arxiv.org/abs/2609.27381).

## Key takeaways

- CoPRE excludes recent measured states from its prediction window so that contact does not immediately contaminate the nominal reference, then weights joint residuals by contact-free noise and the robot Jacobian.
- Under each platform's reported calibration protocol, the detector reached at least 90% detection at separately measured sliding-resistance references of 3.5 N on ARX and 5.5 N on G1. These are not force measurements at the instant of detection.
- The official page exposes videos and summary CSV files, but says those tables are manuscript transcriptions rather than raw logs. Placement and insertion demonstrations have no reported task-success rate. [Evidence documentation](https://copre-arm.github.io/assets/data/README.txt).

## What changed

Low-cost arms often estimate joint torque from motor current rather than dedicated torque sensors. A learned nominal model can flag contact when observed torque diverges from expectation, but a model that consumes very recent state may adapt to the collision itself and suppress the residual.

CoPRE addresses that leakage by predicting three steps ahead from an earlier state-and-command history. A 96-dimensional transformer estimates contact-free joint position, velocity and torque. Detection uses the final predicted torque, centers and scales its error with training residuals, and maps the result into Cartesian space with a noise-weighted Jacobian. Three consecutive threshold crossings confirm contact.

Training, checkpoint selection and threshold calibration all use separate contact-free recordings. The ARX windows use typical 32-millisecond intervals and the G1 windows 20 milliseconds. The method still needs a robot kinematic model for Jacobian scoring, even though it avoids a full analytical dynamics model.

## What the 90 physical trials show

Each arm pushed five book stacks at three speeds, with three repetitions for every resistance condition: 5 by 3 by 3 equals 45 physical contact trials per arm. The stacks had separately measured peak sliding resistances from 1.5 to 5.5 N. Those reference values characterize test conditions; the researchers did not track force during individual pushes.

On ARX, CoPRE recorded 74.1% recall, while both a learned torque-prediction baseline and a nominal inverse-dynamics baseline recorded zero under the combined calibration setting. CoPRE reached the study's F90 criterion at 3.5 N. Its held-out broad-motion confirmed-alarm time was 3.32%, versus 14.51% for the neural baseline and zero for dynamics. [Full evaluation table](https://arxiv.org/html/2609.27381v1#S5).

On G1, CoPRE recorded 82.2% recall, compared with 16.3% for the neural baseline and 42.2% for dynamics. Its F90 was 5.5 N, and broad-motion alarm time was 0.86%. The paper's 95% confidence intervals were 62.2% to 85.2% on ARX and 72.6% to 91.1% on G1. [Official result summary](https://copre-arm.github.io/assets/data/main-results.csv).

Calibration is part of the result. A retrospective ARX sweep increased recall from 74.1% to 95.6% when the allowed calibration alarm budget rose from zero to 1%, while held-out broad alarm time climbed from 3.32% to 12.41%. This is not a free sensitivity gain.

## What this means for robotics

RoboSkin analysis: CoPRE shows how proprioception can provide a useful contact channel when adding [tactile sensors](/sensors) is impractical. A contact event can stop motion, update a spatial belief and trigger a safer alternative. That makes the method relevant to [robot safety](/robot-safety) and contact-aware manipulation, especially on platforms that already expose joint state and motor-current-derived torque estimates.

It is not a substitute for calibrated force measurement. The detector produces a thresholded event rather than contact location, force vector or pressure map. Its strongest engineering value may be as a protective or task-state signal layered under a policy, not as complete tactile perception.

## Limitations and availability

This is an arXiv v1 preprint and RoboSkin.ai has not reproduced it. The detector needs robot-specific training and calibration. Generalization to new payloads, motion distributions and contacts on other arm links was not tested. Sustained contact may enter the history and reduce the residual. The two contact-guided tasks are qualitative demonstrations, so the paper does not establish a numerical task-success improvement.

The [official CoPRE page](https://copre-arm.github.io/) provides project videos, result summaries, ablation tables and a path-free index of the 90 recordings. Its own documentation says the CSV tables are presentation summaries, not raw logs, and that model seeds reuse physical trials. No training code, model checkpoint, raw experiment archive or software license was linked on September 24. Public evidence is therefore more substantial than a paper-only release but not a reproducible package.

## Sources

- [arXiv v1 record, submitted September 23, 2026](https://arxiv.org/abs/2609.27381)
- [Full CoPRE v1 paper](https://arxiv.org/html/2609.27381v1)
- [Official project and experiment page](https://copre-arm.github.io/)
- [Official notes on the downloadable evidence files](https://copre-arm.github.io/assets/data/README.txt)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-24',
    updated: '2026-09-25',
    readTime: '7 min read',
    sourceDate: '2026-09-23',
    evidenceStatus: 'Preprint · arXiv v1 · project evidence inspected',
  },
  {
    id: 'berkeley-quad-hand-asymmetric-qdd-design',
    title: 'Berkeley QUAD Hand trades finger symmetry for backdrivability and sustained force',
    seoTitle: 'Berkeley QUAD Hand: Asymmetric QDD Robot Hand Design',
    seoDescription: 'The Berkeley QUAD Hand combines eight actuators with 11 degrees of freedom. Review its grasp tests, backdrive force and 96-fold heat claim.',
    excerpt: 'The Berkeley QUAD Hand couples its middle and ring fingers so a larger quasi-direct-drive motor can provide closure and thermal headroom. Hardware tests show broad static grasp coverage, but not autonomous task performance.',
    category: 'Dexterous robot hands',
    image: '/generated/news/berkeley-quad-hand-asymmetric-qdd-design.png',
    imageAlt: 'Diagram of a four-finger robot hand with individually driven radial fingers and a mechanically coupled middle-ring finger pair.',
    imageCaption: 'Original RoboSkin.ai schematic of the Berkeley QUAD Hand actuation concept. It is not a CAD drawing or experiment image.',
    sourceTitle: 'A Quasi-Direct-Drive Underactuated Asymmetric Hand for Dexterous and Efficient Grasping and Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2609.27240',
    sources: [
      { title: 'Berkeley QUAD Hand arXiv submission record', url: 'https://arxiv.org/abs/2609.27240' },
      { title: 'Berkeley QUAD Hand v1 design and evaluations', url: 'https://arxiv.org/html/2609.27240v1' },
      { title: 'Official Berkeley QUAD Hand project page', url: 'https://benudavis.github.io/berkeley-quadhand/' },
    ],
    technicalFocus: ['quasi-direct-drive hands', 'underactuated fingers', 'backdrivability', 'dexterous grasping hardware'],
    content: `# Berkeley QUAD Hand trades finger symmetry for backdrivability and sustained force

Benjamin Davis, Chase Kidder and Hannah S. Stuart released the Berkeley QUAD Hand on September 23, 2026. The arXiv v1 hardware design uses four fingers, 11 degrees of freedom and eight actuators, assigning independent quasi-direct-drive motion to the radial side of the hand while mechanically coupling the middle and ring fingers around one larger motor. The prototype reached 29 of 33 Feix grasp-taxonomy poses and required as little as about 50 gram-force to backdrive some base joints. [Paper and version record](https://arxiv.org/abs/2609.27240).

## Key takeaways

- QUAD stands for Quasi-direct-drive, Underactuated, Asymmetric Design. The approximately 1-kilogram hand uses independent thumb and index motion for dexterity and a compliant middle-ring linkage for strength and enclosure.
- Static hardware tests reached 29 of 33 Feix grasps and 10 of 11 Kapandji opposition poses. These tests establish reachable postures, not autonomous manipulation success.
- The reported reduction of up to 96 times is calculated resistive heat energy under a five-minute sustained-load setup, not a universal efficiency advantage across tasks. [Hardware evaluation](https://arxiv.org/html/2609.27240v1).

## What changed

Most anthropomorphic hands make every finger mechanically similar. The QUAD Hand starts from the observation that human fingers play different roles. Its thumb, index and middle fingers handle more varied motion, while the ulnar side contributes closure and load support.

The thumb and index use compact SteadyWin GIM3505-08 quasi-direct-drive motors at their bases. A larger CubeMars AKE60-8 drives the middle and ring fingers through a preloaded six-bar transmission. Under light load, the ring finger mirrors the middle finger. When middle-fingertip load exceeds an approximately 3.2 N spring threshold, the linkage deflects and sweeps the ring finger inward toward the palm. The threshold is tunable through spring preload rather than a fixed sensor limit.

Distal joints on the actively controlled fingers use high-reduction servos, so the design is hybrid rather than fully direct drive. The underactuated ring finger adds flexion and cupping without another actuator, freeing enough palm volume for the larger ulnar motor.

## What the hardware tests establish

The grasp-taxonomy and Kapandji evaluations test kinematic coverage. QUAD formed 29 of 33 standardized grasps. It missed one Kapandji posture because the design has no fifth finger. These results support broad opposition and enclosure, but the poses were demonstrated statically and do not include perception, object uncertainty or dynamic task completion.

For backdrivability, a force gauge pressed each fingertip until the actuator visibly rotated, with 15 trials per tested joint. Thumb and index base joints averaged around 50 gram-force. The coupled middle and ring fingers were near 250 gram-force. The paper presents these values as a lower bound for active force sensitivity, not calibrated tactile sensing.

The sustained-load test applied 3 N at one fingertip for five minutes, plus a 6 N condition with both ulnar fingers loaded. Resistive heating was derived from measured quadrature-axis current and manufacturer phase resistance. Because the larger ulnar motor's phase resistance is much lower, the design reported up to a 96-fold reduction in calculated heat energy per finger. The comparison is specific to those actuators, loads, positions and the electrical-loss model.

## What this means for robotics

RoboSkin analysis: the interesting contribution is architectural, not a new grasp controller. Asymmetry gives the designer another way to allocate mass, palm volume and thermal capacity. Passive linkage behavior can respond immediately to contact, while backdrivable joints make active compliance easier to observe and control. This can complement [robot-hand](/robot-hands) tactile systems rather than replace them.

The approach also creates coupled-control questions. One actuator influences two fingers, and linkage geometry changes mechanical advantage across the workspace. A learning policy or controller must model that state-dependent coupling. Adding fingertip or palm [tactile sensing](/sensors) would help separate commanded motion from actual contact, which the authors identify as future work.

## Limitations and availability

This is an arXiv v1 preprint, and RoboSkin.ai has not reproduced the prototype. The hand was rapidly prototyped with 3D-printed ulnar transmission parts that yield before the larger motor reaches stall torque. Force tests cover one position per joint even though linkage mechanics vary with position. Peak fingertip force was deliberately not compared, and the approximately 5-kilogram lift shown in supplemental media is an example rather than a repeated benchmark.

The [official project page](https://benudavis.github.io/berkeley-quadhand/) provides videos, design illustrations, an interactive grasp viewer and the paper. On September 24 it did not expose a CAD download, bill of materials, control repository or hardware license. The paper is distributed under a Creative Commons manuscript license, but that does not license unprovided design files. Current availability is therefore documentation and media, not an open build package.

## Sources

- [arXiv v1 record, submitted September 23, 2026](https://arxiv.org/abs/2609.27240)
- [Full Berkeley QUAD Hand v1 paper](https://arxiv.org/html/2609.27240v1)
- [Official Berkeley QUAD Hand project page](https://benudavis.github.io/berkeley-quadhand/)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-24',
    updated: '2026-09-24',
    readTime: '6 min read',
    sourceDate: '2026-09-23',
    evidenceStatus: 'Preprint · arXiv v1 · project page inspected',
  },
  {
    id: 'lima-asynchronous-diffusion-dexterous-manipulation',
    title: 'LiMA separates slow visual imagination from faster dexterous action refinement',
    seoTitle: 'LiMA: Asynchronous Diffusion for Dexterous Manipulation',
    seoDescription: 'LiMA separates a slow visual Dreamer from a faster action Refiner. Review its 120-trial task result, 325 ms chunk latency and tactile gap.',
    excerpt: 'LiMA amortizes a slow world-action Dreamer across faster action refinements for bimanual dexterous tasks. It improves the latency-performance trade-off on one H100, but remains vision-only and generates chunks at 325 milliseconds.',
    category: 'Dexterous world-action models',
    image: '/generated/news/lima-asynchronous-diffusion-dexterous-manipulation.png',
    imageAlt: 'Diagram showing a slow visual future Dreamer sending intent to a faster motion Refiner for bimanual dexterous robot action chunks.',
    imageCaption: 'Original RoboSkin.ai explanation of LiMA. This schematic represents the asynchronous hierarchy, not a measured timing trace.',
    sourceTitle: 'LiMA: Bridging Long-term Imagination to Real-time Dexterous Manipulation via Asynchronous Diffusion',
    sourceUrl: 'https://arxiv.org/abs/2609.28431',
    sources: [
      { title: 'LiMA arXiv submission record', url: 'https://arxiv.org/abs/2609.28431' },
      { title: 'LiMA v1 methods, tables and limitations', url: 'https://arxiv.org/html/2609.28431v1' },
      { title: 'Official LiMA project page', url: 'https://ccdcs.github.io/LiMA_repo/' },
    ],
    technicalFocus: ['world-action models', 'asynchronous diffusion', 'bimanual dexterity', 'vision-language-action models'],
    content: `# LiMA separates slow visual imagination from faster dexterous action refinement

Researchers from Peking University and the Beijing Academy of Artificial Intelligence introduced LiMA on September 23, 2026. The arXiv v1 world-action model separates sparse long-horizon visual imagination from denser motion refinement, then links the two with a latent Schrödinger bridge. Across six bimanual tasks with 20 physical trials each, LiMA completed 85 of 120 trials, or 70.8%, while reporting an amortized 325-millisecond latency for each 32-step action chunk on an NVIDIA H100. [Paper and version record](https://arxiv.org/abs/2609.28431).

## Key takeaways

- A slow Future Dreamer generates long-horizon visual and action intent; a Motion Refiner repeatedly combines cached intent with the newest three-camera observation and robot state.
- LiMA reports 325 ms per 32-step chunk versus 600 ms for Cosmos-Policy under the same H100, batch-size and numerical-precision setup, a 45.8% reduction. This is chunk-generation latency, not latency per executed action.
- Despite language about reacting to physical changes, the released system is vision-and-proprioception based. The limitations section names tactile integration as future work. [Methods and limitations](https://arxiv.org/html/2609.28431v1).

## What changed

Video-generative robot policies can spend many denoising steps jointly producing future images and actions. LiMA divides that workload. Its Future Dreamer creates a sparse strategic latent from three camera views, language and robot state. The Motion Refiner remains active between Dreamer refreshes and generates a clean execution latent containing dual-arm actions, anthropomorphic-hand motion and near-term visual features.

The bridge between them is called I2SB, a latent Schrödinger Bridge Coupling. Instead of treating Dreamer output as an extra cross-attention condition, it models refinement as probabilistic transport from coarse intent to the execution trajectory. The default schedule refreshes the Dreamer once for every four Refiner updates.

The real system uses two six-degree-of-freedom UR5 arms, two 22-degree-of-freedom SharpaWave hands and three RealSense D435 cameras. Demonstrations come from VIVE wrist tracking and MetaGlove Pro finger retargeting. Each of the six tasks has 100 expert teleoperation demonstrations.

## Results and comparison conditions

The evaluation includes Stack Cup, Roll T-shirt, Cook Rice, Make Sandwich, Make Coffee and Assemble Package. With 20 trials per task, LiMA recorded success rates of 90%, 75%, 80%, 70%, 60% and 50%, respectively. That sums to 85 successes in 120 trials. The paper's 78.9% progress success rate averages completion of defined subtasks and should not be confused with full-task success.

The four baselines use the same task instructions, observations, hardware interfaces and task-specific dataset where fine-tuning is required. GR00T N1.6 completed 79 of 120 trials, InternVLA-A1 80, Cosmos-Policy 72 and VPP 66. LiMA therefore leads the paper's aggregate comparison, but not every task: it ties or trails a baseline on Roll T-shirt and Assemble Package.

Latency was measured end to end from receiving multi-view observations to decoding a 32-step action chunk. LiMA amortizes one Dreamer pass across four Refiner updates, producing the reported 325 ms. GR00T N1.6 and VPP were faster at 270 ms and 225 ms, while InternVLA-A1 took 360 ms and Cosmos-Policy 600 ms. Calling LiMA real-time therefore describes its asynchronous closed-loop design; it does not mean a new chunk arrives every control timestep.

In a Cook Rice visual-generalization test, LiMA retained 70% success with novel object instances over 20 trials. Other variations changed backgrounds, illumination and clutter. These are visual out-of-distribution tests, not tactile or force robustness tests.

## What this means for robotics

RoboSkin analysis: LiMA demonstrates a useful scheduling idea for [robot world models](/robot-world-models). A costly predictor does not need to run at the same cadence as every corrective action. Caching long-horizon intent and refining against current observations can reduce the cost of generative foresight without removing it.

For contact-rich dexterity, the sensory boundary matters. The Refiner can react only to changes visible to its cameras or reflected in robot state. Occluded slip, distributed hand contact and incipient jamming may not be visually identifiable. Connecting the fast branch to [tactile manipulation](/tactile-manipulation) signals would test whether the asynchronous architecture handles physical contact rather than only visual change.

## Limitations and availability

This is an arXiv v1 preprint whose manuscript is labeled CoRL 2026; RoboSkin.ai did not independently verify review status or reproduce the results. Experiments use one bimanual platform, six tasks, 100 demonstrations per task and an H100 GPU. Severe occlusion and low visual variance reduce performance. The latency comparison excludes model-specific compilation, quantization, operator fusion and multi-GPU optimization.

The [official LiMA page](https://ccdcs.github.io/LiMA_repo/) provides the paper, method graphics and task videos. On September 24 it did not link source code, training data, model weights or a project-specific license. The page template carries a Creative Commons notice, but that does not establish a software or dataset license for assets that were not released. Availability is currently paper and media only.

## Sources

- [arXiv v1 record, submitted September 23, 2026](https://arxiv.org/abs/2609.28431)
- [Full LiMA v1 paper](https://arxiv.org/html/2609.28431v1)
- [Official LiMA project page](https://ccdcs.github.io/LiMA_repo/)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-24',
    updated: '2026-09-24',
    readTime: '7 min read',
    sourceDate: '2026-09-23',
    evidenceStatus: 'Preprint · arXiv v1 · project page inspected',
  },
  {
    id: 'better-curriculum-tactile-reflex-fragile-grasping',
    title: 'A tactile reflex becomes the teacher for fragile grasping',
    seoTitle: 'Better Curriculum: Tactile Reflex Data for Fragile Grasping',
    seoDescription: 'A 25 Hz tactile reflex shapes demonstrations for fragile grasping. Review the 20-trial results, tactile-free deployment and disturbance limits.',
    excerpt: 'The Better Curriculum study uses a 25 Hz tactile controller during data collection, then trains vision-only ACT and pi0.5 policies. The gain is large on one cup task, but disturbance rejection still needs touch at runtime.',
    category: 'Tactile robot learning',
    image: '/generated/news/better-curriculum-tactile-reflex.png',
    imageAlt: 'Diagram showing a tactile reflex shaping demonstrations, a tactile-free student policy, and an optional deployment-time safety arbiter.',
    imageCaption: 'Original RoboSkin.ai explanation of the Better Curriculum study. This is a schematic, not an experiment image.',
    sourceTitle: 'What is the Better Curriculum: Controller-Shaped Grasping Behavior for Contact Force-Sensitive Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2609.25887',
    sources: [
      { title: 'Better Curriculum arXiv submission record', url: 'https://arxiv.org/abs/2609.25887' },
      { title: 'Better Curriculum v1 methods and results', url: 'https://arxiv.org/html/2609.25887v1' },
      { title: 'Official Better Curriculum project page', url: 'https://shayfeng.github.io/better-curriculum/' },
    ],
    technicalFocus: ['tactile reflex control', 'fragile-object grasping', 'demonstration data', 'vision-language-action models'],
    content: `# A tactile reflex becomes the teacher for fragile grasping

Ziyan Feng and colleagues introduced a different role for touch in a preprint submitted on September 22, 2026: use tactile feedback to shape demonstrations, then train a policy that does not require tactile input at inference. A deterministic 25 Hz controller called TactileReflex produced stable grasps of a thin plastic cup for both Action Chunking with Transformers (ACT) and pi0.5 students. The study also shows the boundary of that idea: a tactile-free student did not retain the controller's disturbance rejection. [Paper and version record](https://arxiv.org/abs/2609.25887).

## Key takeaways

- With 30 reflex-shaped demonstrations, ACT achieved 19 stable grasps in 20 nominal trials. ACT trained on 30 visually screened manual demonstrations achieved 3 in 20.
- The same data intervention produced 19 of 20 stable grasps with pi0.5, versus 1 of 20 for manual data. These are small physical trial sets on one fragile-cup setup, not a general manipulation benchmark.
- Under randomized lateral disturbances, the same reflex-data pi0.5 policy retained 11 of 20 grasps alone and 20 of 20 with a separate deployment-time tactile arbiter. [Disturbance experiment](https://arxiv.org/html/2609.25887v1).

## What changed

The bottleneck is placed at collection time. Manual gripper commands are delayed and coarse relative to the narrow contact range of a 3.5-gram plastic cup with a 0.3-millimeter wall. The Piper arm uses two MC-Tac vision-based tactile sensors on its gripper. During demonstration collection, TactileReflex adjusts the gripper at 25 Hz from a vision-tactile force proxy while the human controls the arm.

The resulting trajectory still trains a tactile-free student. The ACT model runs at 15 Hz; the two-billion-parameter pi0.5 model uses LoRA and generates actions at 20 Hz, with policy queries observed at roughly 1.7 to 1.8 Hz. The reported training and inference hardware includes one RTX 5090. [System description](https://arxiv.org/html/2609.25887v1).

## Results and the important comparison

The main ACT comparison uses 30 reflex demonstrations and 30 manual demonstrations selected by watching 100 manual trials. Outcomes were labeled stable, loose or dropped from video by five authors. In 20 nominal trials per policy, reflex data yielded 95% stable grasps, while manual data yielded 15%. Adding the tactile arbiter to the manual-data ACT policy raised stable grasps to 50%, still below the reflex-data result.

Could better screening explain the gap? The authors logged tactile contact for a fresh pool of 100 manual demonstrations, ranked them by contact quality and trained ACT once on the top 30. That policy recorded 6 stable grasps in 20 trials, versus 19 of 20 for reflex data. This is a useful control, but it is one training run and still does not randomize the order of data collection.

The unseen paper-cup test is exploratory: reflex-data pi0.5 reached 8 stable grasps in 10 trials and manual-data pi0.5 reached 3 in 10. The paper reports p=0.0698, so the result does not meet the study's conventional significance threshold.

## What this means for robotics

RoboSkin analysis: touch can improve a vision-only policy without becoming another runtime modality. That matters when production hardware cannot carry the training sensor, or when a fast controller can generate cleaner contact behavior than a human operator. It also reframes [robot demonstration data](/datasets): the controller that creates the trajectory can be as important as model size.

The disturbance result prevents a stronger conclusion. A learned feed-forward policy can imitate nominal force-sensitive behavior, but cannot react to an unobserved external push. Contact-critical systems may still need a low-latency loop, whether from [tactile sensors](/sensors), motor current or a force-torque sensor. The separation between learned motion and a runtime arbiter is closer to a safety architecture than a complete removal of touch.

## Limitations and availability

This is an arXiv v1 preprint and RoboSkin.ai has not reproduced it. The tactile controller signal is a dimensionless vision-tactile proxy, not a calibrated force measurement in Newtons. The approximately 0.5 N deformation observation describes the cup, not the controller's internal value. Collection order was not randomized, and the three outcome labels come from video rather than force ground truth.

The official project page exposes the paper, diagrams and videos. On September 23, it linked to an author's general GitHub profile but did not provide a dedicated code, dataset or model download, and no asset license was stated. Reproduction therefore requires details and artifacts beyond the visible project page.

## Sources

- [arXiv v1 record, submitted September 22, 2026](https://arxiv.org/abs/2609.25887)
- [Full Better Curriculum v1 paper](https://arxiv.org/html/2609.25887v1)
- [Official project page](https://shayfeng.github.io/better-curriculum/)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-23',
    updated: '2026-09-23',
    readTime: '6 min read',
    sourceDate: '2026-09-22',
    evidenceStatus: 'Preprint · arXiv v1 · project page inspected',
  },
  {
    id: 'visforce-visual-force-grounding-dexterous-manipulation',
    title: 'VisForce draws force goals into a dexterous robot policy',
    seoTitle: 'VisForce: Visual Force Grounding for Dexterous Manipulation',
    seoDescription: 'VisForce renders current and desired finger forces into images for pi0.5. Review 20-trial task results, cross-attention gains and sensing limits.',
    excerpt: 'VisForce overlays actuator-force cues at fingertips and combines current and goal images through cross-attention. Real-robot trials improve over four baselines, but the arrows are not measured contact-force vectors.',
    category: 'Force-aware VLA',
    image: '/generated/news/visforce-visual-force-grounding.png',
    imageAlt: 'Diagram showing current fingertip force cues and a desired-force goal image feeding cross-attention and a dexterous robot action policy.',
    imageCaption: 'Original RoboSkin.ai explanation of VisForce. Arrows are schematic conditioning cues, not reconstructed contact-force vectors.',
    sourceTitle: 'VisForce: Visual Grounding of Current and Desired Forces for Goal-Conditioned Dexterous Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2609.25785',
    sources: [
      { title: 'VisForce arXiv submission record', url: 'https://arxiv.org/abs/2609.25785' },
      { title: 'VisForce v1 methods, tables and limitations', url: 'https://arxiv.org/html/2609.25785v1' },
    ],
    technicalFocus: ['force-conditioned manipulation', 'vision-language-action models', 'dexterous hands', 'goal-conditioned control'],
    content: `# VisForce draws force goals into a dexterous robot policy

Jung-Woo Lee and Soo-Chul Lim released VisForce on September 22, 2026, as an arXiv v1 preprint. The method turns present and desired finger-force values into spatial cues drawn over robot images, then uses cross-attention to condition a pi0.5-based dexterous manipulation policy. It is a direct test of whether a vision-language-action model can use force more effectively when the signal is placed where the fingertip appears. [Paper and version record](https://arxiv.org/abs/2609.25785).

## Key takeaways

- VisForce draws current force cues over a wrist-camera image and desired forces over a segmented goal image. The two representations meet in a single cross-attention block.
- Across 20 real-robot trials per task, final success was 14 of 20 for cup insertion and pouring, 11 of 20 for tong-assisted bread transfer, and 8 of 20 for slip-modulated peg insertion.
- The rendered arrows use actuator forces and estimated finger directions. The paper explicitly says they are visual cues, not estimated contact-force vectors. [Method and experiments](https://arxiv.org/html/2609.25785v1).

## What changed

Many multimodal policies append force as a state vector. VisForce instead aligns the value with its visual location. A UR10 arm carries an Inspire RH56F1 six-degree-of-freedom hand and two Intel RealSense D405 cameras. Per-finger actuator forces are synchronized with images, states and actions: cameras run at 30 Hz, while the other streams are recorded at 200 Hz and matched by nearest timestamp.

Current-force arrows are placed at fingertip pixels in the wrist view. The desired force is rendered onto an object-only goal image. GroundingDINO and SAM2 isolate the goal object offline, while a MuJoCo model and edge-based Chamfer alignment connect the simulated hand to camera geometry. VisForce updates the SigLIP visual encoder and applies rank-16 LoRA to the larger model components.

## Results under the reported conditions

The study collects 25 to 30 demonstrations for each of four tasks and evaluates every policy in 20 independent trials. For medium-force grasping, VisForce lifts an egg in 14 of 20 trials and a toothpaste tube in 16 of 20. The visual-force plus text-goal baseline reaches 8 of 20 and 4 of 20 respectively; the state-force plus text-goal baseline reaches 7 and 1.

The three multi-stage tasks make desired force part of task progress. VisForce obtains 70% final success for cup insertion followed by bottle pouring, 55% for grasping tongs and transferring bread, and 40% for a slip-triggered peg-in-hole task with 1-millimeter clearance. The unmodified pi0.5 baseline records 20%, 5% and 5%. A visual-input ablation without cross-attention records 10%, 5% and 15%, suggesting that simply drawing arrows is not the whole contribution.

These are final-stage successes, not average subtask completion. The same hardware, training demonstrations and 20-trial count make the within-paper comparisons useful, while the limited task set and trial count leave wide uncertainty for deployment.

## What this means for robotics

RoboSkin analysis: visual grounding offers a practical interface between structured signals and pretrained visual backbones. Instead of asking a VLA to infer that the fifth number belongs to a particular finger, the representation encodes that relationship spatially. Similar interfaces could combine force, slip or [robot skin](/robot-skin) regions with goal images.

However, localization depends on calibration and hand geometry. The visual cue does not remove the need to understand what the underlying sensor measures. Actuator load can include transmission friction and dynamics that differ from fingertip contact. For direct contact-force control, a calibrated [tactile sensor](/sensors) or force-torque estimate may still be required.

## Limitations and availability

This is a preprint, not independent validation, and RoboSkin.ai has not reproduced it. Experiments use one arm-hand configuration, four tasks and up to 30 demonstrations per task. Goal segmentation is performed offline, so the reported setup does not establish an online open-world goal-generation pipeline. Inference used an NVIDIA RTX A6000; latency and control frequency during deployment were not reported as a full end-to-end budget.

The arXiv record and full text were publicly accessible on September 23. Neither linked a project page, code repository, dataset or model checkpoint. The paper's Creative Commons license covers the manuscript, not unlisted software or training assets. Availability should therefore be described as paper-only until an official release appears.

## Sources

- [arXiv v1 record, submitted September 22, 2026](https://arxiv.org/abs/2609.25785)
- [Full VisForce v1 paper](https://arxiv.org/html/2609.25785v1)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-23',
    updated: '2026-09-23',
    readTime: '6 min read',
    sourceDate: '2026-09-22',
    evidenceStatus: 'Preprint · arXiv v1 · paper-only release',
  },
  {
    id: 'cablevla-tactile-cable-routing-vla',
    title: 'CableVLA combines cable topology with tactile residual control',
    seoTitle: 'CableVLA: Tactile VLA Results for Cable Routing',
    seoDescription: 'CableVLA distills cable topology and tactile contact from simulation. Examine 345-rollout results, 96-taxel inputs and limited real transfer.',
    excerpt: 'CableVLA adds topology prediction and a contact-gated tactile residual to pi0.5. It improves a 345-rollout simulation benchmark, while real-robot transfer remains a 10-trial result.',
    category: 'Visuo-tactile robot learning',
    image: '/generated/news/cablevla-topology-tactile-residual.png',
    imageAlt: 'Diagram showing global cable topology and local tactile history feeding a contact-gated action residual for cable routing.',
    imageCaption: 'Original RoboSkin.ai explanation of CableVLA. This schematic separates simulation-supervised topology from the local tactile residual.',
    sourceTitle: 'CableVLA: Simulation-Privileged Global-Local Representation Learning for Cable Routing',
    sourceUrl: 'https://arxiv.org/abs/2609.25606',
    sources: [
      { title: 'CableVLA arXiv submission record', url: 'https://arxiv.org/abs/2609.25606' },
      { title: 'CableVLA v1 methods, tables and appendices', url: 'https://arxiv.org/html/2609.25606v1' },
    ],
    technicalFocus: ['cable routing', 'tactile representation learning', 'vision-language-action models', 'sim-to-real transfer'],
    content: `# CableVLA combines cable topology with tactile residual control

Researchers from Huazhong University of Science and Technology and Harbin Institute of Technology introduced CableVLA in an arXiv preprint submitted on September 22, 2026. Built around pi0.5, the framework distills global cable topology from simulation and learns local contact dynamics from tactile arrays. A contact gate then adds an eight-step force-tactile action residual to a frozen topology-conditioned policy. [Paper and version record](https://arxiv.org/abs/2609.25606).

## Key takeaways

- Across 345 MuJoCo rollouts, CableVLA reports 84.9% task success, versus 62.6% for the visual pi0.5-V baseline and 65.2% for the topology-only parent.
- Each tactile array contains 96 resistive taxels. TacSense uses 25 frames at 30 Hz and combines a spatial frame branch with a per-taxel temporal branch.
- Zero-shot real-hardware transfer reaches 4 successes in 10 trials under enhanced lighting, compared with 1 in 10 for the visual baseline. This is an early transfer result, not a robust real-world benchmark. [Evaluation tables](https://arxiv.org/html/2609.25606v1).

## What changed

Cable routing mixes two scales. The robot must reason about the cable's overall relation to clips and obstacles, then react locally when friction, slip or contact changes at the gripper. CableVLA separates those roles. TopoHead observes four visual frames and learns current and future topology from simulator-only node and relation labels. TacSense learns tactile dynamics from simulated kinematics and contact events in addition to the measured force map.

The downstream policy uses a RealMan RM75-6F arm, an Inspire-Robots EG2-4C2 gripper, bilateral Loong96 tactile arrays and a wrist force-torque sensor. A contact threshold of 0.049 N opens the gate for the force-tactile residual. That number is a routing threshold, not the full sensor response range: the hardware arrays were calibrated over 5 to 100 gram-force.

## Data and evaluation conditions

Topology pretraining uses 33,654 windows from 1,228 training episodes, plus 3,004 validation windows from 113 episodes. TacSense draws from 7,338 episodes across 57 simulated tasks, producing more than 2.19 million candidate windows. Policy adaptation uses 2,004 demonstrations divided by scene-layout pairs.

The 345-rollout benchmark is structured as 115 scenario-condition instances repeated three times. It includes 75 trials each for replay, in-distribution and out-of-distribution layouts, plus 30 each for weak light, strong light, low friction and camera-view changes. Success requires the target cable relations to hold for 2.5 seconds.

CableVLA's 84.9% aggregate success is 22.3 percentage points above pi0.5-V under those conditions. In a camera-view shift, the tactile residual succeeds in 23 of 30 trials versus 3 of 30 for its frozen parent. In a separate Isaac Sim transfer, CableVLA reaches 27 of 50, compared with 17 of 50 for the visual baseline.

Representation scores must not be confused with task success. TacSense reports slip-onset AUPRC of 0.8028 versus 0.1694 for a similarly sized CNN-LSTM, and slip-stop AUPRC of 0.3880 versus 0.1120. Those are simulated event-recognition tests, not physical cable-routing success rates.

## What this means for robotics

RoboSkin analysis: CableVLA is a useful architecture pattern for deformable-object manipulation. Global visual planning can remain relatively slow and semantic, while [tactile sensing](/sensors) supplies a gated correction only when contact begins. Freezing the parent policy also narrows what the local residual is allowed to change.

The data scale reveals the cost. Rich labels come from simulation, and the real system must reproduce camera geometry, tactile calibration and cable behavior closely enough for those representations to transfer. Teams comparing [robotics datasets](/datasets) should distinguish the millions of sampled windows from the smaller count of independent episodes and physical trials.

## Limitations and availability

This is an arXiv v1 preprint, and RoboSkin.ai has not run the code or hardware. The real test contains only 10 trials per method and still exposes a large simulation-to-real gap. The authors identify grasp alignment, viewpoint mismatch, arm compliance and cable dynamics as failure sources. Target-domain fine-tuning was not used in the zero-shot comparison.

As inspected on September 23, the arXiv record and full paper did not link a public code repository, project page, dataset download, checkpoints or an implementation license. The counts document internal research assets; they do not establish that those assets are downloadable.

## Sources

- [arXiv v1 record, submitted September 22, 2026](https://arxiv.org/abs/2609.25606)
- [Full CableVLA v1 paper](https://arxiv.org/html/2609.25606v1)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-23',
    updated: '2026-09-23',
    readTime: '6 min read',
    sourceDate: '2026-09-22',
    evidenceStatus: 'Preprint · arXiv v1 · paper-only release',
  },
  {
    id: 'cartesian-hand-all-linear-in-hand-manipulation',
    title: 'The Cartesian Hand replaces finger joints with seven linear axes',
    seoTitle: 'Cartesian Hand: Seven Linear Axes for In-Hand Manipulation',
    seoDescription: 'Duke researchers built a seven-axis all-linear robot hand. Review its 35-object tests, mechanics, cost estimate and open-source status.',
    excerpt: 'Two stacked parallel grippers and four sliding fingertips operate caps, tools and lab equipment. The mechanism succeeds in a configured 350-trial test, but it does not sense contact force or location.',
    category: 'Dexterous hand hardware',
    image: '/generated/news/cartesian-hand-linear-axes.png',
    imageAlt: 'Schematic of two stacked parallel grippers with four translating fingertips and seven labeled linear motion axes.',
    imageCaption: 'Original RoboSkin.ai diagram of the Cartesian Hand concept. It is not a CAD file or experiment image.',
    sourceTitle: 'The Cartesian Hand: In-Hand Manipulation with All-Linear Fingers',
    sourceUrl: 'https://arxiv.org/abs/2609.25696',
    sources: [
      { title: 'Cartesian Hand arXiv submission record', url: 'https://arxiv.org/abs/2609.25696' },
      { title: 'Cartesian Hand v1 methods and experiments', url: 'https://arxiv.org/html/2609.25696v1' },
      { title: 'Official Cartesian Hand project page', url: 'https://generalroboticslab.com/cartesian_handv1' },
    ],
    technicalFocus: ['dexterous robot hands', 'in-hand manipulation', 'prismatic joints', 'robot hardware'],
    content: `# The Cartesian Hand replaces finger joints with seven linear axes

Duke University's General Robotics Lab introduced the Cartesian Hand in a preprint submitted on September 22, 2026. Instead of imitating an articulated human hand, the 850-gram end effector stacks two independently actuated parallel grippers and lets four fingertips translate along fixed axes. The seven-degree-of-freedom mechanism targets objects with threads, pivots, guides, plungers and triggers. [Paper and version record](https://arxiv.org/abs/2609.25696).

## Key takeaways

- All seven joints are prismatic: four fingertip slides, two gripper openings and one axis that changes the separation between the grippers.
- The authors report 350 successful trials across 35 configured objects, with 10 trials per object. Objects began from prescribed positions, and new objects within an established category could require up to five setup trials.
- The hand uses joint feedback and contact detection but does not directly measure contact location or contact force. Its strength comes from mechanism-specific motion, not general tactile dexterity. [Methods and tests](https://arxiv.org/html/2609.25696v1).

## What changed

Most dexterous hands add rotary joints so fingers can wrap around objects. The Cartesian Hand assigns separate roles to two simple grippers. One section can hold the body of a bottle, pipette or tool while the other moves a cap, plunger, second handle or trigger. Because every joint translates along a fixed axis, the fingertip position is a linear function of joint position and the Jacobian does not change with configuration.

Seven Feetech-3915 servos drive rack-and-pinion stages and dovetail slides. The paper reports 65 millimeters of fingertip travel, 52 millimeters for each gripper opening and inter-gripper separation, and joint speeds around 60 millimeters per second. The closed assembly is approximately 166 by 100 by 76 millimeters. One gripper held a 2-kilogram bottle in a static test.

The authors estimate about USD 500 for a complete hand. Structural printing is estimated at roughly USD 30 in PLA or USD 50 in SLS Nylon 12, and PLA assembly takes about two hours after printing. These are author estimates, not independently audited production costs. A theoretical rack force near 170 N derives from rated servo stall torque before transmission losses; it is not a measured continuous fingertip force.

## What the 350 trials establish

The evaluation covers cap opening and closing, pipetting, pumping, two-handle tools, screwdrivers, triggers and in-grasp reorientation. Ten trials on each of 35 objects all succeeded after object-specific parameters were configured. During the in-hand procedure, the Franka Panda arm remains stationary and an external holder no longer supports the object after lift. [Experimental setup and results](https://arxiv.org/html/2609.25696v1#S5).

That repeatability is meaningful for a structured mechanism, but it is not zero-shot generalization. Initial object poses are prescribed. A new object in an existing mechanism category reuses the procedure, then changes settings such as grasp height, stroke or force limit; the paper allows up to five setup trials to find them.

The project also shows two Cartesian Hands on Duke Humanoid V2 uncapping a tube, pipetting and recapping. This is a qualitative transfer demonstration. The paper does not report a second 350-trial evaluation on the humanoid. [Paper's humanoid demonstration](https://arxiv.org/html/2609.25696v1#S5.SS4).

## What this means for robotics

RoboSkin analysis: dexterity does not always require anthropomorphic fingers. Many industrial and laboratory objects already constrain motion through threads, hinges and guides. Designing a hand around those mechanisms can simplify planning and make a small library of primitives reusable. The result belongs alongside underactuated and anthropomorphic designs in any [robot hand](/robot-hands) comparison.

It also highlights where touch would add value. Joint thresholds can detect resistance, but they cannot identify which surface made contact or separate desired tool load from a collision. Adding compact [tactile sensors](/sensors) could support automatic parameter selection, slip detection and safer force limiting without changing the linear kinematics.

## Limitations and availability

This is an arXiv v1 preprint and RoboSkin.ai has not built the hand. The object set is structured, the starting poses are controlled, and the procedures use manually selected parameters. The platform does not observe object pose, contact location or contact force. Claims should therefore remain about repeatable mechanism-specific manipulation, not open-world hand autonomy.

The paper says software and hardware design will be open-sourced. The official project page currently exposes specifications, videos and a link labeled Code to github.com/generalroboticslab/Cartesian_Hand. On September 23 that repository returned 404 through both the public GitHub page and API, so no files, revision or license could be verified. A future-release statement is not a current open-source release.

## Sources

- [arXiv v1 record, submitted September 22, 2026](https://arxiv.org/abs/2609.25696)
- [Full Cartesian Hand v1 paper](https://arxiv.org/html/2609.25696v1)
- [Official General Robotics Lab project page](https://generalroboticslab.com/cartesian_handv1)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-23',
    updated: '2026-09-25',
    readTime: '6 min read',
    sourceDate: '2026-09-22',
    evidenceStatus: 'Preprint · arXiv v1 · linked repository unavailable',
  },
  {
    id: 'spectrobot-high-bandwidth-single-point-tactile-sensing',
    title: 'SpectRobot turns single-point vibration into tactile policy input',
    seoTitle: 'SpectRobot Tactile Sensing: Bandwidth, Results and Data',
    seoDescription: 'SpectRobot converts one high-bandwidth tactile channel into spectrograms. Inspect its 80-trial tests, bandwidth limits, hardware and release status.',
    excerpt: 'Wormsensing and Hugging Face researchers encode remote vibration sensors as spectrograms for a robot policy. Longer history mattered more than extending the tested band from 10 to 100 kHz.',
    category: 'Tactile sensing hardware',
    image: '/generated/news/spectrobot-single-point-spectrogram.png',
    imageAlt: 'Diagram showing one mechanically coupled sensor converted into a time-frequency spectrogram and combined with vision in a robot policy.',
    imageCaption: 'Original RoboSkin.ai explanation of SpectRobot v1. The diagram summarizes the signal path and is not an experiment image.',
    sourceTitle: 'Learning tactile perception from high-bandwidth single-point sensing',
    sourceUrl: 'https://arxiv.org/abs/2609.24621',
    sources: [
      { title: 'SpectRobot arXiv submission record', url: 'https://arxiv.org/abs/2609.24621' },
      { title: 'SpectRobot v1 methods and results', url: 'https://arxiv.org/html/2609.24621v1' },
      { title: 'SpectRobot official project repository', url: 'https://github.com/spectrobot-project/spectrobot-project.github.io' },
      { title: 'SpectRobot public Hugging Face profile', url: 'https://huggingface.co/jogarulfop' },
    ],
    technicalFocus: ['high-bandwidth tactile sensing', 'vibration spectrograms', 'robot imitation learning', 'LeRobot'],
    content: `# SpectRobot turns single-point vibration into tactile policy input

Joseph Rigal, Emmanuel Virot and Caroline Pascal introduced SpectRobot in an arXiv preprint submitted on September 21, 2026. The Wormsensing and Hugging Face researchers convert a single mechanically coupled tactile signal into a fixed-size time-frequency spectrogram, then feed it through a standard image encoder alongside camera observations. The result is a practical test of whether temporal bandwidth can sometimes substitute for dense spatial coverage. [Paper and version record](https://arxiv.org/abs/2609.24621).

## Key takeaways

- SpectRobot samples signals as fast as 200 kS/s, but converts each history window into a 224 by 224 grayscale spectrogram delivered to the policy at roughly 30 Hz.
- In the controlled four-class sorting task, a vision-only policy achieved 23% success. Tactile configurations ranged from 48% to 82% across sensor types, with 80 physical trials per condition.
- Longer temporal history was the stronger result: roughly 0.3-second windows stayed near chance, while 2.3 to 2.9-second windows reached about 86% to 92%. The 10 and 100 kHz confidence intervals overlapped. [Methods and bandwidth study](https://arxiv.org/html/2609.24621v1#S3).

## What changed

Most robot touch systems add more sensing locations. SpectRobot instead asks how much interaction information can be recovered from one sensor mounted away from the contact surface but mechanically coupled to the gripper. Successive vibration samples are transformed into power-spectral-density images with a linear frequency axis. An Action Chunking with Transformers policy uses ResNet-18 encoders for the top camera, wrist camera and tactile spectrogram.

The physical task uses an SO-101 arm to pick up and shake opaque boxes. Four visually identical classes contain nothing, one plastic spacer, seven plastic spacers or seven metal nuts. A trial counts only if the robot grasps the box and deposits it in the correct bin. Each training dataset contains 40 demonstrations; each sensor condition is evaluated with 20 trials per class. [Experimental protocol](https://arxiv.org/html/2609.24621v1#S2).

## What the sensor comparison shows

The reported success rates are 82% for a MEMS accelerometer, 80% at best for the IEPE Dragonfly strain sensor, 73% for a PZT disk, 71% for an IEPE accelerometer, 67% for a passive Dragonfly, 58% for a metallic strain gauge and 48% for an IEPE load cell. The authors explicitly note that several 95% Wilson confidence intervals overlap, so this is not a statistically resolved hardware leaderboard.

The temporal ablation is more informative. At 10 kHz, success rose from about 31% with 0.36 seconds of history to about 86% with 2.9 seconds. At 100 kHz, it rose from about 32% with 0.29 seconds to about 92% with 2.3 seconds. Bandwidth and duration were not independently controlled because the same 224-pixel input grid was used. The safe conclusion is that longer context helped this shaking task; it is not that 100 kHz is generally unnecessary.

The authors also tested a roughly EUR 100 acquisition chain built around an ADS8688 converter and Teensy 4.1. Three sensors reached about 90% on a separately collected, comparable dataset. That is encouraging engineering evidence, but not a matched replacement test against the research-grade chain.

## What this means for robotics

RoboSkin analysis: SpectRobot offers a useful design alternative when abrasion, wiring or surface geometry makes a dense array difficult. It does not recover contact location from one channel, and piezoelectric measurements emphasize dynamics rather than true static load. A real system may still combine these signals with distributed [tactile sensors](/sensors), motor-current force estimates or [robot skin](/robot-skin).

The image-like interface may reduce software friction because it fits existing vision encoders and the [LeRobot workflow](/robotics-programming). Engineers still need synchronized acquisition, anti-alias filtering, stable mechanical coupling and dataset-level calibration checks. The [tactile calibration guide](/guides/tactile-sensor-calibration) explains why a shared tensor shape does not make different sensor installations interchangeable.

## Limitations and availability

The study is a preprint and RoboSkin.ai has not reproduced it. It evaluates one sorting task, one arm family and independently collected datasets for several grippers. Raw time signals were not retained in the reported pipeline, which limits reprocessing with alternative windows. Two authors work for Wormsensing, the Dragonfly sensor manufacturer; the paper discloses this conflict.

The paper states that code is available under Apache 2.0 and points to the SpectRobot GitHub organization. As inspected on September 22, that organization exposed an Apache-2.0 project website repository, but no separate training-code repository was visible. The linked Hugging Face profile did expose many named datasets and policy models, including September 21 task assets, but not a single curated release page. Readers should identify the exact dataset and checkpoint before attempting reproduction.

## Sources

- [SpectRobot arXiv record, submitted September 21, 2026](https://arxiv.org/abs/2609.24621)
- [SpectRobot v1 methods, results and availability statements](https://arxiv.org/html/2609.24621v1)
- [Official SpectRobot repository](https://github.com/spectrobot-project/spectrobot-project.github.io)
- [Public SpectRobot datasets and models profile](https://huggingface.co/jogarulfop)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: '2026-09-22',
    readTime: '6 min read',
    sourceDate: '2026-09-21',
    evidenceStatus: 'Preprint · arXiv v1',
  },
  {
    id: 'tactile-jepa-topology-aware-electronic-skin-pretraining',
    title: 'Tactile-JEPA pretrains electronic-skin encoders on taxel topology',
    seoTitle: 'Tactile-JEPA Results, Datasets, Code and Limitations',
    seoDescription: 'Tactile-JEPA uses local and global graph masks for distributed robot touch. Compare force, pose and policy results plus code and license limits.',
    excerpt: 'The self-supervised method learns from irregular taxel graphs across three public datasets. It leads several perception metrics, but MAE remains better on the reported policy RMSE.',
    category: 'Tactile representation learning',
    image: '/generated/news/tactile-jepa-taxel-graph-masking.png',
    imageAlt: 'Diagram of local and global masks sampled over an irregular tactile taxel graph before representation learning.',
    imageCaption: 'Original RoboSkin.ai diagram based on Tactile-JEPA v1. It explains graph masking and does not reproduce a paper figure.',
    sourceTitle: 'Tactile-JEPA: Topology-Aware Self-Supervised Representation Learning for Distributed Tactile Sensors',
    sourceUrl: 'https://arxiv.org/abs/2609.24385',
    sources: [
      { title: 'Tactile-JEPA arXiv submission record', url: 'https://arxiv.org/abs/2609.24385' },
      { title: 'Tactile-JEPA v1 experiments and tables', url: 'https://arxiv.org/html/2609.24385v1' },
      { title: 'Author-linked Tactile-JEPA code repository', url: 'https://github.com/E-Kovtun/tactile' },
    ],
    technicalFocus: ['distributed tactile sensors', 'electronic skin', 'self-supervised learning', 'taxel topology'],
    content: `# Tactile-JEPA pretrains electronic-skin encoders on taxel topology

Researchers from Sber AI, Skolkovo Institute of Science and Technology, HSE University and the Artificial Intelligence Research Institute released Tactile-JEPA as an arXiv preprint on September 21, 2026. The method pretrains encoders for distributed tactile sensors by masking connected and dispersed regions of an irregular taxel graph, rather than forcing electronic-skin signals onto a camera-like pixel grid. [Paper and version record](https://arxiv.org/abs/2609.24385).

## Key takeaways

- Tactile-JEPA learns from unlabeled time windows and taxel coordinates, predicting hidden taxel embeddings from visible context with both local and global graph masks.
- Across three public datasets, it reports a 6.3% reduction in force RMSE and a 20.8% reduction in in-hand orientation RMSE against the strongest comparison for those metrics.
- It is not best on every downstream result. On DECO-50 policy learning, MAE pretraining records 0.4400 normalized-action RMSE versus 0.4634 for Tactile-JEPA; lower is better. [Tables II and III](https://arxiv.org/html/2609.24385v1#S4).

## What changed

Distributed electronic skins produce multivariate time series from taxels placed across hands, feet or bodies. Their geometry is often sparse and irregular. Tactile-JEPA represents those taxels as a connectivity graph. A local target mask grows from a seed along connected neighbors; a global mask samples across the surface. The model receives the remaining context and predicts embeddings for the hidden regions. Equal local and global masking is intended to preserve fine contact details and whole-surface state.

The encoder is a small transformer with 12 blocks, 192-dimensional embeddings and three attention heads. The paper freezes pretrained encoders for most perception tests, then trains task-specific heads. Pretraining used four NVIDIA A100 80 GB GPUs and took 0.7 to 6.1 hours depending on the dataset and task. [Architecture and compute](https://arxiv.org/html/2609.24385v1#S3).

## Three datasets, three evidence types

| Dataset | Sensor and scale | Evaluated use |
| --- | --- | --- |
| Sparsh-skin | Xela uSkin, 368 three-axis taxels, 100 Hz, 4.6 hours | Object class, force and in-hand pose |
| Tactile socks | Two piezoresistive socks, 453 total taxels, 14 Hz, 5.9 hours | Human action and full-body pose |
| DECO-50 subset | Two Inspire hands, 2,124 taxels, 30 Hz, 16.6 hours | Visuo-tactile assembly policy |

On Sparsh-skin, Tactile-JEPA reports total force RMSE of 14.05 cN versus 15.00 cN for end-to-end training, the strongest alternative in that row. Orientation RMSE is 5.48 degrees versus 6.92 degrees for BYOL. On tactile socks, action accuracy is 96.91% versus 95.63% for DINO, and full-body pose RMSE is 13.42 radians versus 13.78. These are means across repeated training runs, and selected top-two comparisons use a one-sided Welch test with three pretraining seeds and no multiple-comparison correction.

The policy table requires a different reading. Tactile-JEPA improves over vision-only, random tactile embeddings and an end-to-end tactile encoder, but MAE is better on the reported DECO-50 action RMSE. The paper's stronger claim is stable performance across heterogeneous datasets: BYOL or MAE collapses on some datasets, while Tactile-JEPA trains under one mask configuration.

## What this means for robot skin

RoboSkin analysis: representing taxel layout explicitly is a sound fit for conformable [robot skin](/robot-skin), where physical neighbors need not share adjacent array indices. The local-global mask result also suggests that pretraining should preserve both a contact patch and the state of the wider surface. This is relevant to [tactile foundation models](/tactile-foundation-models), but the evidence is still sensor-family-specific rather than a universal encoder.

Integration is not plug-and-play. DECO-50 groups four or five neighboring taxels to make attention over 2,124 channels affordable. Magnetic data receives baseline correction; piezoresistive data uses different normalization. Dataset coordinates are also missing for DECO-50, so grouping and topology construction must be supplied by the implementation. The [datasets directory](/datasets) can help compare these data contracts before reuse.

## Limitations and availability

This is a preprint, and RoboSkin.ai has not rerun the experiments. All headline improvements are within the selected datasets, task heads and splits. The policy score is imitation-action error, not a physical task success rate. A lower action RMSE also does not by itself prove safer or more reliable contact.

The paper links a public repository. Inspection on September 22 found runnable JEPA-related modules and configurations, but the README primarily documents earlier Sparsh-X and Sparsh-Skin work, some example configs contain author-local checkpoint paths, and no paper-specific pretrained checkpoint was identified. The repository license is Creative Commons Attribution-NonCommercial 4.0, so public access does not imply unrestricted commercial use.

## Sources

- [Tactile-JEPA arXiv record, submitted September 21, 2026](https://arxiv.org/abs/2609.24385)
- [Tactile-JEPA v1 methods, datasets and results](https://arxiv.org/html/2609.24385v1)
- [Author-linked code repository and license](https://github.com/E-Kovtun/tactile)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: '2026-09-22',
    readTime: '6 min read',
    sourceDate: '2026-09-21',
    evidenceStatus: 'Preprint · arXiv v1 · code inspected',
  },
  {
    id: 'touch2robot-tactile-feedback-human-demonstrations',
    title: 'Touch2Robot adds simulated robot contact to human demonstrations',
    seoTitle: 'Touch2Robot: Tactile Demonstration Results and Limits',
    seoDescription: 'Touch2Robot visualizes predicted robot-hand contact during human demonstrations. Review replay, policy, contact F1 and release conditions.',
    excerpt: 'The system lets demonstrators see reconstructed robot contact in VR. It improves four-task replay and downstream scores, while contact fidelity remains partial.',
    category: 'Robot demonstration data',
    image: '/generated/news/touch2robot-demonstration-loop.png',
    imageAlt: 'Diagram showing human hand motion and tactile input feeding robot contact reconstruction and visual feedback during demonstration collection.',
    imageCaption: 'Original RoboSkin.ai explanation of the Touch2Robot loop. It is a schematic, not a captured user-study or robot image.',
    sourceTitle: 'Touch2Robot: Robot Touch in the Human Demonstration Loop',
    sourceUrl: 'https://arxiv.org/abs/2609.24660',
    sources: [
      { title: 'Touch2Robot arXiv submission record', url: 'https://arxiv.org/abs/2609.24660' },
      { title: 'Touch2Robot v1 methods and experiments', url: 'https://arxiv.org/html/2609.24660v1' },
      { title: 'Official Touch2Robot project page', url: 'https://touch2robot.github.io/' },
    ],
    technicalFocus: ['human demonstration data', 'tactile retargeting', 'dexterous manipulation', 'robot teleoperation'],
    content: `# Touch2Robot adds simulated robot contact to human demonstrations

ShanghaiTech University, Beijing Institute for General Artificial Intelligence, Shanghai Jiao Tong University and Beihang University researchers introduced Touch2Robot on September 21, 2026. The framework records human motion, glove touch and object motion, reconstructs how a target robot hand would contact the object, and displays that contact in virtual reality while the person demonstrates. The goal is not haptic feedback to the user; it is visual feedback about predicted robot touch. [Paper and version record](https://arxiv.org/abs/2609.24660).

## Key takeaways

- Across four real-world tasks, average replay completion rises from 37.9% with visual-only feedback to 72.1% with Touch2Robot under the paper's staged completion metric.
- Diffusion Policies trained on the resulting demonstrations average 62.0% completion, versus 32.9% for visual-feedback data with the same number of trajectories.
- Reconstructed contact reaches 44.19% F1 against physical robot tactile measurements. Better coverage comes with a higher 6.38% false-positive rate, so the system does not perfectly predict real contact. [Tables I to IV](https://arxiv.org/html/2609.24660v1#S4).

## What changed

Human demonstrations are scalable, but a human hand and a robot hand do not share the same kinematics or contact geometry. Touch2Robot trains object-specific reinforcement-learning teachers to reproduce object motion while favoring contact patterns aligned with the tactile glove. Those teachers are distilled into one retargeter conditioned on human observation and object geometry. During collection, the retargeted hand and tracked object are synchronized in simulation; predicted contacts are shown through a Meta Quest 3 at 30 Hz.

The physical evaluation uses an xArm6 with a LEAP Hand, TwinTac sensors and binary force-sensitive resistors. A MANUS glove records motion, a Juqiao tactile glove records human touch, and calibrated RGB cameras track the object with FoundationPose. The four tasks are pick-and-place, 180-degree object rotation, board wiping and drawer opening. [System and tasks](https://arxiv.org/html/2609.24660v1#S3).

## How to read the reported percentages

The evaluation metric is completion, not always binary success. Rotation, wiped area and drawer displacement are scaled toward a task goal. Pick-and-place awards 25% for each of reach, pick, move and place. Ten attempts per task are collected under each interface, then replayed on the physical robot without filtering demonstrations by replay outcome.

| Collection interface | Replay average | Time per replay-successful trajectory |
| --- | ---: | ---: |
| Offline retargeting | 28.3% | 66.0 s |
| Visual feedback | 37.9% | 58.6 s |
| Touch2Robot | 72.1% | 18.2 s |

The time figure divides demonstration time by the number of trajectories that replay successfully. It is not end-to-end dataset production time and does not include teacher training, retargeter training or system setup.

For downstream imitation learning, Touch2Robot data improves the mean from 32.9% to 62.0% over visual feedback. Variation is wide on some tasks, including a 69.0 plus or minus 47.7% drawer score. The four-task average should not hide that uncertainty.

## What this means for robotics data

RoboSkin analysis: the most useful idea is moving embodiment feedback into collection before a physical robot executes every demonstration. This could reduce wasted trajectories where human intent looks plausible but maps to unstable robot contact. It complements rather than replaces direct [robot teleoperation](/robot-teleoperation) because simulated contact is still an estimate.

The result also clarifies what a tactile demonstration contains. Touch2Robot keeps human tactile preference, predicted robot contact, object motion and eventual physical measurement as distinct signals. That separation is valuable when designing [robotics datasets](/robotics-datasets) or comparing with touch-rich resources in the [tactile dataset directory](/datasets).

## Limitations and availability

Contact fidelity remains incomplete: 44.19% F1 means reconstructed and measured contacts disagree often. The Touch2Robot variant also has a higher false-positive rate than the three reported baselines. The user study includes ten people on the rotation task, and cross-hand results for XHand and Shadow Hand are qualitative VR visualizations rather than physical cross-embodiment trials. Quantitative real-world tests use one LEAP Hand platform.

This is a preprint and RoboSkin.ai has not reproduced it. As checked September 22, the official project page provides videos, images and an appendix PDF, but no public code repository, dataset download or software license was identified. The paper does not establish that the full collection system can be reconstructed from public assets alone.

## Sources

- [Touch2Robot arXiv record, submitted September 21, 2026](https://arxiv.org/abs/2609.24660)
- [Touch2Robot v1 methods, tables and appendix](https://arxiv.org/html/2609.24660v1)
- [Official Touch2Robot project page](https://touch2robot.github.io/)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: '2026-09-22',
    readTime: '6 min read',
    sourceDate: '2026-09-21',
    evidenceStatus: 'Preprint · arXiv v1',
  },
  {
    id: 'when-touch-matters-cluttered-dexterous-grasping',
    title: 'When Does Touch Matter tests tactile and wrench feedback in clutter',
    seoTitle: 'When Does Touch Matter? Dexterous Grasping Results',
    seoDescription: 'A 200-trial study compares vision, wrench and 508-taxel feedback for cluttered dexterous grasping. Read matched results and limitations.',
    excerpt: 'A USC and University of New Mexico study holds demonstrations and control fixed while varying policy-visible sensing. The advantage grows in confined, cluttered scenes.',
    category: 'Dexterous manipulation benchmarks',
    image: '/generated/news/when-touch-matters-sensing-ablation.png',
    imageAlt: 'Diagram comparing vision-only, wrench, taxel and combined robot grasp policies across increasing clutter and contact ambiguity.',
    imageCaption: 'Original RoboSkin.ai summary of the paper’s sensing ablation. It is not a reconstruction of a physical trial.',
    sourceTitle: 'When Does Touch Matter? Charting the Vision-Interaction Gap in Cluttered Dexterous Grasping',
    sourceUrl: 'https://arxiv.org/abs/2609.24068',
    sources: [
      { title: 'When Does Touch Matter arXiv record', url: 'https://arxiv.org/abs/2609.24068' },
      { title: 'When Does Touch Matter v1 evaluation', url: 'https://arxiv.org/html/2609.24068v1' },
      { title: 'Official interaction-aware grasping project', url: 'https://interaction-dex-grasp.github.io/' },
    ],
    technicalFocus: ['dexterous grasping', 'distributed fingertip taxels', 'wrench estimation', 'cluttered manipulation'],
    content: `# When Does Touch Matter tests tactile and wrench feedback in clutter

University of Southern California and University of New Mexico researchers released “When Does Touch Matter?” on September 21, 2026. The study asks a narrow but important question: when does policy-visible interaction sensing improve on RGB-D geometry for target-oriented dexterous grasping in clutter? It holds demonstrations, action space and compliant control fixed while varying whether the learned policy sees estimated wrenches, fingertip taxels or both. [Paper and version record](https://arxiv.org/abs/2609.24068).

## Key takeaways

- The combined vision, wrench and taxel policy succeeds in 24/25 trials, versus 14/25 for vision-only, across five physical scene conditions.
- On the three nested confined conditions, the combined policy scores 15/15 while vision-only scores 6/15. On easier or less ambiguous conditions, the gap is small or absent.
- Every controlled policy still uses the same wrench-based compliant controller. The ablation changes what the learned policy observes, not whether the robot physically responds compliantly to contact. [Design and Table I](https://arxiv.org/html/2609.24068v1#S4).

## What changed

The xArm7 carries a 16-DoF LEAP Hand with four PaXini fingertip pads, providing 508 three-axis taxels. Motor currents and hand Jacobians estimate four fingertip wrenches and one aggregated wrist wrench. Two Intel RealSense cameras provide RGB-D views. Grounding DINO and SAM 2 produce target masks, which are converted into a 1,024-point target-context cloud.

A diffusion policy runs at 10 Hz and predicts 16 steps of end-effector pose and hand-joint references, executing eight before replanning. Taxels are encoded with a two-layer attention model; wrench and proprioception are supplied directly. All variants use the same 320 demonstrations, 90/10 split, 300 training epochs and compliance controller. [System details](https://arxiv.org/html/2609.24068v1#S4).

## Where the interaction gap appears

| Policy-visible input | Overall physical success |
| --- | ---: |
| Vision only | 14/25 (56%) |
| Vision plus wrench | 15/25 (60%) |
| Vision plus taxels | 18/25 (72%) |
| Vision plus wrench plus taxels | 24/25 (96%) |

The combined result is not simply the sum of two sensors. Estimated wrench exposes weak or obstructed loading and can trigger an early regrasp. The taxel field describes how support is distributed across fingers. In the three progressively harder conditions, the combined policy stays at 5/5 while the stronger single-interaction result reaches only 3/5, 4/5 and 3/5.

The study covers 200 physical trials across eight policy variants, five conditions and five trials per cell. That total sounds large, but the headline 24/25 comparison still has only five trials per scene. Manual resets introduce small placement variation, and confidence intervals are not reported for the success table.

An external vision-only ClutterDexGrasp reproduction is not included in the matched physical table. The authors report that its zero-shot hardware deployment produced unsafe rapid motion and downward pushing that required an emergency stop. Because it did not share the compliant controller, it should be treated as an implementation warning rather than a clean performance baseline.

## What this means for robot hands

RoboSkin analysis: the main contribution is a demand-conditioned comparison, not a claim that every grasp needs touch. Vision-only ties the combined policy at 4/5 in the open small-object scene. Interaction sensing becomes decisive when confinement, occlusion and grasp sensitivity accumulate. That distinction helps teams decide where [robot-hand tactile sensing](/robot-hands) is worth integration effort.

The ablation also warns against treating “force” and “tactile” as interchangeable. Wrench estimates provide compact load cues; distributed taxels provide contact geometry. The strongest policy uses both, which aligns with the design questions in the [tactile manipulation guide](/tactile-manipulation) and [robot gripper sensor guide](/applications/robot-gripper-tactile-sensor).

## Limitations and availability

The experiment uses one LEAP Hand embodiment, one PaXini sensor class and five engineered tabletop conditions. The thick fingertips limit access to narrow gaps. Complete target occlusion can defeat relocalization, and the policy can stall locally without explicit progress monitoring. Execution-time statistics condition on successful episodes and therefore have survivorship bias.

This is a preprint, and RoboSkin.ai has not reproduced the trials. As checked September 22, the official project page provides method explanations and evaluation videos, but no public code, trained policy or dataset download was identified. The paper says all trial videos will be released; readers should verify that the complete set is present before using it as an audit trail.

## Sources

- [When Does Touch Matter arXiv record, submitted September 21, 2026](https://arxiv.org/abs/2609.24068)
- [When Does Touch Matter v1 methods, tables and limitations](https://arxiv.org/html/2609.24068v1)
- [Official interaction-aware grasping project page](https://interaction-dex-grasp.github.io/)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: '2026-09-22',
    readTime: '6 min read',
    sourceDate: '2026-09-21',
    evidenceStatus: 'Preprint · arXiv v1',
  },
  {
    id: 'zerotouch-tactile-supervision-visual-grasp-control',
    title: 'ZeroTouch learns visual grasp-force control from tactile supervision',
    seoTitle: 'ZeroTouch: Visual Grasp Control, Force Errors and Limits',
    seoDescription: 'Read ZeroTouch’s tactile-supervised grasp results, validation versus test force errors, physical trial conditions and limits of visual load estimation.',
    excerpt: 'The Skoltech preprint uses tactile supervision to predict contact and stop gripper closure from vision and robot state. Its force estimates and physical grasp results answer different questions.',
    category: 'Tactile robot control',
    image: '/generated/news/zerotouch-training-deployment.png',
    imageAlt: 'Diagram separating tactile supervision during ZeroTouch training from RGB and robot-state inputs used for gripper closure at deployment.',
    imageCaption: 'Original RoboSkin.ai diagram based on ZeroTouch v1. Tactile input supplies training supervision; deployment uses predicted current and target compression. Not an experiment image.',
    sourceTitle: 'ZeroTouch: Tactile-Supervised Visual Contact Estimation for Contact-Rich Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2609.21726',
    sources: [{"title": "ZeroTouch arXiv submission record", "url": "https://arxiv.org/abs/2609.21726"}, {"title": "ZeroTouch v1 methods, tables and limitations", "url": "https://arxiv.org/html/2609.21726v1"}],
    technicalFocus: ["tactile supervision", "visual force estimation", "robot grasping", "contact-rich manipulation"],
    content: `# ZeroTouch learns visual grasp-force control from tactile supervision

Researchers at the Intelligent Space Robotics Laboratory of the Skolkovo Institute of Science and Technology introduced ZeroTouch in a September 18, 2026 preprint. Dmitriy Kosenkov and colleagues train a model with tactile measurements, then use wrist-camera RGB, gripper position and local gravity direction to estimate contact and stop gripper closure without tactile input. The study connects visual force prediction to physical grasp tests, while exposing the limits of inferring hidden loads from appearance. [Paper and submission record](https://arxiv.org/abs/2609.21726).

## Key takeaways

- ZeroTouch predicts a deformation map, six-axis force and torque, and a grasp-specific compression target; an upstream controller still supplies arm motion and grasp pose.
- Normal-force mean absolute error is 0.531 N on the validation set and 0.828 N on the final test set. The smaller number is not the held-out test result.
- Physical success is 19/20, 16/20 and 18/20 under three specified shifts. These are small, controlled lift-and-hold experiments, not general manipulation success rates. [Evaluation and results](https://arxiv.org/html/2609.21726v1#S5).

## What does the robot predict instead of measuring?

A frozen DINOv2 visual encoder supplies image features. Gripper position and gravity direction in the local gripper frame condition those features before attention associates visual regions with an 18 × 24 grid of tactile queries. The model predicts dense deformation and a six-axis wrench: three forces and three moments. A separate output estimates the desired compression for the selected grasp. The gravity input helps distinguish orientations that can look similar while producing different mechanical loads. [Framework](https://arxiv.org/html/2609.21726v1#S3).

During training, a DM-Tac W2 vision-based tactile sensor supplies deformation and wrench references. At deployment, the predicted current compression is compared with the predicted target to determine when closure stops. Under the paper's convention, stronger compression is more negative. This is contact-state estimation and gripper regulation; selecting the approach trajectory remains outside ZeroTouch's scope.

## Where does the desired force come from?

The target is empirical. During collection, closure is adjusted until a grasp lifts the object 5 cm, holds it for 2 seconds without observable slip, and returns it. For successful demonstrations, the target is the median normal force in a settled interval after closure, rather than the transient force peak. It is not a theoretical minimum-safe force or a globally optimal setting. [Target construction](https://arxiv.org/html/2609.21726v1#S3).

The dataset contains 270 episodes and 15,316 synchronized samples: 187 training episodes, 31 validation episodes, 46 final test episodes and six diagnostic episodes. Validation selects the model and checkpoint. Normalization uses training data only, and wrench error is averaged within each episode before averaging across episodes, so long recordings do not automatically dominate the reported score. [Dataset and evaluation](https://arxiv.org/html/2609.21726v1#S4).

## What do the error figures actually measure?

The abstract highlights a validation normal-force error reduction from 2.017 N for state-only input to 0.531 N for the full architecture. Table II reports 0.828 N on the final test set. The desired compression target has test error of 0.679 N and signed bias of −0.490 N, indicating a tendency toward stronger predicted compression under the negative-force convention. Several moment components deteriorate more than normal force. [Tables I and II](https://arxiv.org/html/2609.21726v1#S5).

Those distinctions matter because stopping depends on the crossing of two predictions. Their errors can partially cancel, allowing a useful stopping point even when neither force estimate is individually accurate. Successful closure therefore does not independently validate both estimates. The sensor itself supplies the force reference; the authors report no independent external force/torque calibration.

## How did it perform on physical grasps?

The tests change object identity, grasp placement or internal loading. Each method receives the same upstream arm motion and target grasp configuration; the comparison concerns gripper-closure control. A success requires a 5 cm lift and a secure 2-second hold. [Physical protocol and Table III](https://arxiv.org/html/2609.21726v1#S5).

| Evaluation condition | ZeroTouch | OpenVLA | SmolVLA |
| --- | --- | --- | --- |
| Unseen can | 19/20 | 5/20 | 2/20 |
| Familiar bottle, unseen off-center grasp | 16/20 | 8/20 | 5/20 |
| Water-filled bottle, empty-container training condition | 18/20 | 11/20 | 7/20 |

These results favor ZeroTouch within this protocol. They should not become a ranking of the models' complete vision-language-action capabilities: approach planning is controlled externally, and the paper's protocol does not test general instruction following.

## Limitations, access and engineering relevance

RoboSkin analysis: the valuable separation is between measured training supervision, inferred contact at runtime and the downstream stopping rule. It suggests a way to reuse tactile data when deployment hardware is constrained. The [tactile dataset directory](/datasets) and [calibration guide](/guides/tactile-sensor-calibration) provide context for inspecting those references.

Hidden loading remains a key limitation. A container can look similar while requiring different compression, and the authors explicitly acknowledge that insufficient visual evidence cannot reliably reveal its physical properties. The evaluated objects and load shifts are limited. [Limitations](https://arxiv.org/html/2609.21726v1#S6).

As checked September 21, no project-specific code, checkpoint or dataset download was verified in the paper or arXiv record. The work remains a preprint, and RoboSkin has not reproduced it. For another use of human touch data, compare the distinct action-conditioned experiments in [DexTouch-WM](/research/dextouch-wm-human-touch-world-model-2026); its objective differs from ZeroTouch's grasp-force estimator.

## Sources

- [ZeroTouch arXiv record: September 18, 2026](https://arxiv.org/abs/2609.21726)
- [ZeroTouch v1: methods, tables and limitations](https://arxiv.org/html/2609.21726v1)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: '2026-09-22',
    readTime: '6 min read',
    sourceDate: '2026-09-18',
    evidenceStatus: 'Preprint · arXiv v1',
  },
  {
    id: 'crisp-contact-simulation-geometry-solvers-release',
    title: 'CRISP details contact simulation for tight-tolerance robot assembly',
    seoTitle: 'CRISP Robot Simulation: Contact Results, Access and License',
    seoDescription: 'Inspect CRISP’s contact geometry, CANAL and SubADMM results, prebuilt packages and research-only license. Separate simulator evidence from real-robot claims.',
    excerpt: 'Seoul National University’s CRISP paper examines contact geometry and solver behavior in robot assembly. The public package provides examples and binaries under a restricted research license.',
    category: 'Robotics simulation tools',
    image: '/generated/news/crisp-geometry-solver-package.png',
    imageAlt: 'Diagram separating CRISP collision geometry and contact solvers from the public examples and prebuilt library package, with a research-only license note.',
    imageCaption: 'Original RoboSkin.ai explanation of CRISP’s architecture and public package. A schematic, not a simulator screenshot or physical experiment.',
    sourceTitle: 'CRISP: Contact-Rich Robotic Simulation Platform with Extensive Geometries and Contact Solvers',
    sourceUrl: 'https://arxiv.org/abs/2609.21761',
    sources: [{"title": "CRISP arXiv record", "url": "https://arxiv.org/abs/2609.21761"}, {"title": "CRISP v1 evaluation and appendices", "url": "https://arxiv.org/html/2609.21761v1"}, {"title": "Official CRISP project", "url": "https://inrol.github.io/crisp/"}, {"title": "CRISP public package and examples", "url": "https://github.com/INRoL/crisp"}, {"title": "CRISP version 1.1.0 assets", "url": "https://github.com/INRoL/crisp/releases/tag/v1.1.0"}, {"title": "Reviewed CRISP license", "url": "https://github.com/INRoL/crisp/blob/fc0684bdb3f325ab1586fc6df987c15839f08733/LICENSE"}],
    technicalFocus: ["contact-rich simulation", "robot assembly", "collision geometry", "contact solvers"],
    content: `# CRISP details contact simulation for tight-tolerance robot assembly

Somang Lee and colleagues in Seoul National University's Department of Mechanical Engineering describe CRISP, the Contact-Rich Simulation Platform, in a September 18, 2026 preprint. The physics engine combines several collision-geometry representations with contact solvers designed for tightly coupled interactions, including peg insertion and threaded assembly. Its public package makes the work inspectable through examples, but access is restricted to academic and noncommercial research. [Paper record](https://arxiv.org/abs/2609.21761) and [official project](https://inrol.github.io/crisp/).

The paper is the new research event covered here. It should not be confused with a first software launch: the inspected GitHub releases list version 1.1.0 on September 17, following earlier packages. This article distinguishes the paper's evaluation from the versioned software readers can obtain.

## Key takeaways

- CRISP supports meshes and function-based geometry, allowing collision representation and solver choice to be examined together rather than treating contact as one fixed approximation.
- The reported comparisons use MuJoCo 3.4.0 and Isaac Sim 4.5.0 under specified geometry, friction and timestep conditions; they do not establish universal simulator superiority.
- The public repository supplies example code and integration for a prebuilt library. Its restrictive license means public availability should not be described as a full open-source engine release. [Paper](https://arxiv.org/html/2609.21761v1), [repository](https://github.com/INRoL/crisp) and [license](https://github.com/INRoL/crisp/blob/fc0684bdb3f325ab1586fc6df987c15839f08733/LICENSE).

## Why geometry and solver choice belong together

A simulator must first locate contacts and then resolve the resulting motion, forces and constraints. Improving one stage does not automatically fix errors in the other. CRISP supports primitives, convex shapes, triangle meshes, signed distance fields and differentiable support functions. A signed distance field describes distance to a surface; a support function describes a convex shape in terms of directional support. These representations expose different information to collision detection. [Geometry and architecture](https://arxiv.org/html/2609.21761v1#S4).

For contact resolution, CRISP provides Cascaded Newton-based Augmented Lagrangian, or CANAL, and Subsystem-based Alternating Direction Method of Multipliers, or SubADMM. The former combines outer multiplier updates with inner Newton iterations; the latter separates dynamics and constraint updates. Official documentation says SubADMM's algorithm is parallelizable but CRISP does not currently exploit that parallelism. A related GPU paper is not evidence that this package supplies the same GPU implementation. [Solver documentation](https://inrol.github.io/crisp/docs/contact-solvers/).

## What did the assembly comparisons show?

The paper evaluates several contact scenarios on an AMD Ryzen 7 9800X3D CPU, using MuJoCo 3.4.0 and Isaac Sim 4.5.0 as comparison platforms. Geometry, physical parameters and timesteps are matched as closely as possible, but their representations and numerical methods remain different. [Evaluation](https://arxiv.org/html/2609.21761v1#S6).

For peg insertion, a 2.5 cm-radius, 10 cm-high peg enters a hole with 50–200 micrometers of tolerance. Friction is set to 0.01, initial tilt to 0.5 degrees and timestep to 2 ms. At 50 micrometers, the CANAL configuration using a differentiable support-function peg and torus-specialized hole reports average penetration of approximately 37.8 micrometers; the Isaac Sim configuration fails to assemble at that tolerance. None of the compared engines is strictly intersection-free. [Table II and Appendix D](https://arxiv.org/html/2609.21761v1).

That metric is the time average of each step's maximum penetration in a reduced two-dimensional representation. In the threaded bolt-nut test, the measurement instead averages maximum detected contact penetration during the middle of engagement, uses a 10 ms timestep, and sets friction to zero. Those are different measurement procedures, not interchangeable evidence of real manufacturing tolerances.

The paper also reports cases where CRISP's mesh discretization prevents assembly, and where SubADMM's limited convergence produces larger penetration. Its appendix acknowledges that tuning MuJoCo parameters can mitigate some observed artifacts. The robot demonstrations follow predefined joint keyframes with proportional-derivative control; they are not demonstrations of a learned policy transferring to a physical robot.

## What is actually available to download?

RoboSkin inspected repository revision \`fc0684bdb3f325ab1586fc6df987c15839f08733\` on September 21. The [README](https://github.com/INRoL/crisp/blob/fc0684bdb3f325ab1586fc6df987c15839f08733/README.md) identifies two assembly examples and CMake integration for a prebuilt package. The repository's engine directory is a download location, rather than the complete solver implementation source.

[Version 1.1.0 release assets](https://github.com/INRoL/crisp/releases/tag/v1.1.0) list Windows x86-64, Linux x86-64/AArch64 and macOS packages with checksum files. Setup requires CMake 3.20 or later, a C++20 compiler and an OpenGL-capable desktop. Default configuration fetches the latest engine package and Eigen 3.4.0. The examples use a Franka arm, Robotiq 2F-85 gripper and prescribed joint targets. [Installation guide](https://inrol.github.io/crisp/docs/installation/).

The license permits academic and noncommercial research but prohibits redistribution, modification and reverse engineering without written authorization. Those conditions are material for integration. RoboSkin verified the listed files and documentation, but did not install or run the engine.

## What should a reproduction record?

RoboSkin analysis: pinning the example repository alone is insufficient when CMake downloads the latest binary. Record the engine archive version, checksum, example revision, collision representation, timestep and solver settings together. Version 1.1.0 changes default budgets and replaces a shared iteration-limit option with separate CANAL and SubADMM options; old settings should not silently be assumed equivalent. [Release notes](https://inrol.github.io/crisp/docs/release-notes/).

For tactile research, better contact mechanics could improve the inputs to a sensor simulator, but CRISP's contact solver is not itself a calibrated tactile-image or pressure-array generator. Soft-body dynamics is listed as future work. Compare the [tactile benchmark directory](/benchmarks) and [sensor guide](/sensors) before equating collision accuracy with sensor fidelity. The platform paper remains a preprint; its earlier method publications do not independently validate every result in this release.

## Sources

- [CRISP arXiv v1](https://arxiv.org/html/2609.21761v1)
- [Official project and documentation](https://inrol.github.io/crisp/)
- [Public repository and versioned packages](https://github.com/INRoL/crisp)
- [Reviewed license](https://github.com/INRoL/crisp/blob/fc0684bdb3f325ab1586fc6df987c15839f08733/LICENSE)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: '2026-09-22',
    readTime: '6 min read',
    sourceDate: '2026-09-18',
    evidenceStatus: 'Preprint · arXiv v1',
  },
  {
    id: 'agile-wam-tactile-world-action-model-robot-control',
    title: 'Agile-WAM pairs fast touch prediction with robot actions',
    seoTitle: 'Agile-WAM: Tactile Robot Control, Results and Latency',
    seoDescription: 'Examine Agile-WAM’s five robot tasks, 63/100 trial result, conflicting latency figures and code status. Learn what its tactile world-action model changes.',
    excerpt: 'The UC Davis and Analog Devices preprint combines action generation with visual and tactile prediction. Its task results are promising, but its latency claims need a closer reading.',
    content: `# Agile-WAM pairs fast touch prediction with robot actions

Researchers at the University of California, Davis and Analog Devices introduced Agile-WAM, a tactile world-action model for contact-rich robot control, in a September 17, 2026 arXiv preprint. Led in the author list by Hanchu Zhou and Brendan Lynch, the study tests whether a compact model can generate robot actions while predicting how vision and touch will change. It reports nine simulated tasks and five physical manipulation tasks. [Paper and submission record](https://arxiv.org/abs/2609.20761).

The practical question is how to retain useful contact prediction without the cost of generating full future images. Agile-WAM predicts compact internal representations instead. The results justify examining that design, while inconsistencies between the abstract and tables make the exact evaluation conditions especially important.

## Key takeaways

- Table II reports 63 successful trials out of 100 across five physical tasks, compared with 48/100 for the authors’ tactile-enabled VITA baseline; performance does not improve on every task.
- Vision and touch use different prediction horizons: future vision aligns with the executed action segment, while touch predicts the next frame.
- Table III reports 10.35 ms inference on an RTX 4090, whereas the abstract states 11.9 ms. These are source-reported figures, and neither establishes a complete robot control-loop rate.

## What changes in the model?

A world-action model learns robot actions together with future observations. Agile-WAM combines an RGB image, a tactile observation and robot state into a shared latent representation. A lightweight flow-matching network transforms that representation into action, visual and tactile latents; an action decoder produces the commands. The visual encoder uses an ImageNet-pretrained ResNet-18, so “lightweight” does not mean that every component is trained without prior knowledge. [Method, Section III](https://arxiv.org/html/2609.20761v1).

The model predicts 16 actions and executes eight before replanning. Visual prediction targets the longer, eight-step horizon, while tactile prediction targets the next frame. The authors’ rationale is that adjacent images can be nearly identical even when contact changes abruptly. This is different from rendering a photorealistic future video or independently proving that an action is safe.

For the larger architectural context, see RoboSkin’s [visuo-tactile world-model comparison](/guides/visuo-tactile-world-models-robot-manipulation). Its planning and transfer distinctions also apply here.

## What happened on the physical robot?

The physical experiments use a seven-degree-of-freedom Flexiv Rizon 4, an Intel RealSense D405 wrist camera and an Analog Devices 32 × 32 piezoresistive pressure sensor on the gripper. Vision and tactile acquisition are reported at 30 Hz. Each task has 50 teleoperated training demonstrations and 20 evaluation episodes per policy. These physical pressure observations should not be confused with the simulation benchmark’s 10 × 14 × 3 tactile force field. [Experimental setup and Table II](https://arxiv.org/html/2609.20761v1).

| Physical task | Agile-WAM | VITA-VT tactile baseline |
| --- | --- | --- |
| Gear assembly | 16/20 | 11/20 |
| Peg insertion | 11/20 | 12/20 |
| Power-plug insertion | 13/20 | 7/20 |
| Ethernet-cable insertion | 6/20 | 3/20 |
| Ethernet-cable unplugging | 17/20 | 15/20 |

Summing the table gives 63/100 versus 48/100: a 15-percentage-point difference, or 31.25% relative improvement. The abstract instead states 29.4%; the displayed integer counts do not reproduce that exact percentage. RoboSkin reports the counts so readers can inspect the denominator. These small task cohorts do not establish a population-wide reliability improvement.

Peg insertion is a counterexample to an across-the-board gain: VITA-VT scores one additional success. Ethernet insertion remains difficult, with Agile-WAM succeeding in six of 20 trials. The simulation protocol also selects the highest success rate reached during training and averages across three seeds, which should be retained when comparing it with a fixed-checkpoint evaluation.

## How fast is it, and what does latency include?

Table III reports 10.35 ± 0.14 ms from observation input to action generation on one NVIDIA RTX 4090, using FP32, batch size one, a 16-action output and an average over 50 runs. The flow models use six integration steps; the diffusion baselines use 100 denoising steps. A speed comparison therefore includes different sampling budgets. [Inference protocol, Section IV-B2](https://arxiv.org/html/2609.20761v1).

The abstract and official project page instead quote 11.9 ms. The reviewed materials do not reconcile the two values, so this article does not select one as an independently verified measurement. The table’s 96.62 Hz figure is an inference-supported maximum, not a demonstrated rate for sensing, transport, actuation and feedback together. The physical sensors operate at 30 Hz, and eight actions are executed per plan.

## Why it matters for engineering

RoboSkin analysis: the useful idea is to match prediction horizons to each signal’s dynamics, rather than assume vision and pressure need identical timing. A reproduction should measure sensor-to-command latency, action timing and failure recovery together. The [ROS 2 tactile integration guide](/guides/ros2-tactile-sensing) explains the timestamp and transport checks that model-only timing leaves out.

The same analysis argues against assuming edge-device readiness from an RTX 4090 result. Performance on an embedded processor, unseen sensors or different contact materials remains a separate question.

## Limitations and availability

As checked on September 20, the [official project](https://hanchuzhou.github.io/TARO_project_page/) shows task demonstrations and labels its code “coming soon.” No linked checkpoint or experiment-dataset download was verified there. The arXiv record does not state peer-reviewed acceptance. RoboSkin reviewed the paper and project, but did not run the model or reproduce any robot trials.

Use the [benchmark directory](/benchmarks) to compare protocols and the [tactile sensor guide](/sensors) to check hardware assumptions. The cover is an original explanatory diagram, not an experimental image.

## Sources

- [Agile-WAM arXiv record, submitted September 17, 2026](https://arxiv.org/abs/2609.20761)
- [Agile-WAM v1: methods, task counts and inference table](https://arxiv.org/html/2609.20761v1)
- [Official project: demonstrations and code status](https://hanchuzhou.github.io/TARO_project_page/)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: '2026-09-22',
    readTime: '6 min read',
    category: 'Tactile robot control',
    image: '/generated/news/agile-wam-prediction-horizons.png',
    imageAlt: 'Diagram of Agile-WAM generating an action segment while predicting next-step touch and longer-horizon vision from current observations.',
    imageCaption: 'RoboSkin.ai explanatory diagram based on Agile-WAM v1. The two prediction horizons are schematic; this is not an experiment image.',
    sourceDate: '2026-09-17',
    evidenceStatus: 'Preprint · arXiv v1',
    sourceTitle: 'Agile-WAM: An Agile Tactile World Action Model for Contact-Rich Robot Control',
    sourceUrl: 'https://arxiv.org/abs/2609.20761',
    sources: [
      { title: 'Agile-WAM arXiv record', url: 'https://arxiv.org/abs/2609.20761' },
      { title: 'Agile-WAM v1 full paper', url: 'https://arxiv.org/html/2609.20761v1' },
      { title: 'Official Agile-WAM project', url: 'https://hanchuzhou.github.io/TARO_project_page/' },
    ],
    technicalFocus: ['tactile world-action model', 'contact-rich manipulation', 'robot control', 'inference latency'],
  },
  {
    id: 'touchsight-twintouch-bare-hand-tactile-prediction',
    title: 'TouchSight learns bare-hand touch prediction from glove recordings',
    seoTitle: 'TouchSight & TwinTouch-20H: Data, Results and Access',
    seoDescription: 'Explore TouchSight’s video-to-touch model and TwinTouch-20H. Separate measured glove labels, generated video, contact metrics and verified dataset access.',
    excerpt: 'The preprint combines measured glove signals with generated bare-hand video. Its 20-hour paired dataset and 500-hour training source describe different kinds of scale.',
    content: `# TouchSight learns bare-hand touch prediction from glove recordings

TouchSight, a video-based tactile prediction model from Danyan Zhou, Jinxuan Lu and colleagues at Tsinghua University, Xspark AI and collaborating universities, was submitted to arXiv on September 17, 2026. It learns from pressure-glove recordings and generated bare-hand imagery to estimate dense hand contact signals from egocentric RGB video. The accompanying TwinTouch-20H dataset tests how far measured tactile labels can travel when the glove’s visual appearance is removed. [Original paper record](https://arxiv.org/abs/2609.20414).

The distinction is consequential: the model predicts touch at inference, but its training still depends on instrumented recordings. An apparently bare hand in a generated clip is not evidence that its tactile labels were measured from an uninstrumented person.

## Key takeaways

- TwinTouch-20H pairs approximately 10 hours of original glove video with 10 hours of generated bare-hand video; these share measured tactile labels rather than representing 20 independent hours of contact collection.
- The model uses 500 hours of HumanTouch supervision in the paper, while the publicly described initial HumanTouch release is approximately 100 hours. Public files do not establish access to the full training corpus.
- Quantitative force evaluation, geometry-derived contact evaluation and qualitative results on natural bare-hand video are separate tests; none is a demonstrated robot-policy improvement.

## How are the paired videos constructed?

The authors select glove recordings across 52 interaction tasks and 10 scenes, then use Seedance 2.0 to replace glove appearance and vary the background. The original tactile labels are reused for the generated video. Reviewers overlay the original hand at 40% opacity to reject changes in pose, motion, objects or interaction, as well as incomplete glove removal and distorted hands. [Dataset construction, Section III](https://arxiv.org/html/2609.20414v1).

This supplies appearance variation without making a second physical measurement. HumanTouch episodes are split into training, validation and test sets before their generated counterparts inherit those assignments. Keeping each original and its derivative together is important: splitting paired views independently could let essentially the same interaction appear on both sides of evaluation.

For a broader data-selection workflow, see the [tactile dataset directory](/datasets). Treat paired recordings, frames, episodes and hours as distinct units when comparing resources.

## What does TouchSight predict?

TouchSight combines frozen DINOv3 visual features and geometry-aware VGGT features, temporal attention and region queries for fingers and palms. It consumes eight-frame RGB clips and does not require external hand-pose reconstruction at inference. Glove supervision uses 275 trusted taxels per hand: 80 finger taxels and 195 palm taxels. Another 85 physical channels and the layout’s padding are excluded from losses and metrics. [Method and Appendix A](https://arxiv.org/html/2609.20414v1).

Five additional hand–object interaction datasets contribute geometric contact labels, not measured forces. Their contact target marks a hand vertex when an object vertex is within 1 cm. These examples are excluded from the force loss. The model therefore learns from several supervision types; describing every label as a tactile measurement would obscure their origin.

## What do the reported results support?

On generated bare-hand TwinTouch test clips, Table III compares the full model with a version trained without generated visual augmentation. All values below are author-reported. Force-error values follow the paper’s glove-signal scale and must not be relabeled as newtons or kilopascals. [Evaluation definitions and Table III](https://arxiv.org/html/2609.20414v1).

| TwinTouch metric | Without generated augmentation | Full model |
| --- | --- | --- |
| Mean absolute error, lower is better | 1.851 | 1.671 |
| Active-taxel error, lower is better | 12.077 | 10.026 |
| Volumetric intersection-over-union, higher is better | 0.239 | 0.300 |
| Temporal Pearson correlation, higher is better | 0.255 | 0.272 |

The active-taxel metric evaluates locations above five raw glove units. Its larger error matters because averages across inactive regions can conceal weaker prediction where contact actually occurs. Separately, the OakInk2 contact test reports F1 of 0.373 versus 0.329 for HACO, but HACO has higher recall: 0.623 versus 0.311. “Better contact prediction” therefore depends on which metric and error tradeoff matter.

Natural videos from Ego-Exo4D, Ego4D and EgoDex lack measured tactile ground truth in this evaluation. Their visualizations provide qualitative generalization evidence, not a quantitative validation of physical force recovery on arbitrary bare hands.

## What can readers actually download?

The paper’s 500-hour HumanTouch training source, TwinTouch’s 20 hours of paired visual observations and the public HumanTouch subset are three different resources or scopes. SparkLab’s [official HumanTouch page](https://xsparkai.com/sparklab/humantouch/) describes an initial approximately 100-hour release and links ModelScope and Hugging Face.

On September 20, RoboSkin verified a public, ungated [Hugging Face file listing](https://huggingface.co/datasets/chuqiaoLyu/Xspark-HumanTouch/tree/81822a10cac5def2638db546eaeced581d71a8b5) containing Parquet, video and metadata files. Its [pinned README](https://huggingface.co/datasets/chuqiaoLyu/Xspark-HumanTouch/blob/81822a10cac5def2638db546eaeced581d71a8b5/README.md) still describes roughly 100 hours, warns that uploading is ongoing, and lists an AIGC edition as in preparation. The README defers licensing to [ModelScope, whose dataset page displays CC-BY-NC-4.0](https://www.modelscope.cn/datasets/chuqiaoLyu/Xspark-HumanTouch). That noncommercial condition matters for reuse; it does not license unreleased TwinTouch data or model weights. We did not decode the complete payload or independently total its duration.

No dedicated TwinTouch-20H download or TouchSight checkpoint/code release was verified in the paper and linked materials reviewed. The public HumanTouch files should not be presented as the complete 500-hour training set or as a confirmed TwinTouch release.

## Why the distinction matters

RoboSkin analysis: generated appearance may help reuse expensive measured labels, but the resulting predictions need provenance. Store whether each field is measured, geometry-derived, generated or predicted; preserve episode relationships and excluded sensor channels. The [LeRobot format guide](/guides/lerobot-dataset-format) and [tactile calibration guide](/guides/tactile-sensor-calibration) explain useful integration checks without certifying compatibility with this release.

TouchSight remains a preprint. The reviewed study does not demonstrate a robot policy trained on its predictions, and RoboSkin has not reproduced it. Compare [DexTouch-WM’s separate human-to-robot world-model experiments](/research/dextouch-wm-human-touch-world-model-2026) before equating a contact estimator with action-conditioned robot dynamics.

## Sources

- [TouchSight arXiv record, September 17, 2026](https://arxiv.org/abs/2609.20414)
- [TouchSight v1: TwinTouch construction, metrics and appendix](https://arxiv.org/html/2609.20414v1)
- [SparkLab HumanTouch acquisition and release description](https://xsparkai.com/sparklab/humantouch/)
- [HumanTouch public repository at the reviewed revision](https://huggingface.co/datasets/chuqiaoLyu/Xspark-HumanTouch/tree/81822a10cac5def2638db546eaeced581d71a8b5)
- [ModelScope HumanTouch repository and displayed data license](https://www.modelscope.cn/datasets/chuqiaoLyu/Xspark-HumanTouch)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: '2026-09-22',
    readTime: '6 min read',
    category: 'Tactile models and data',
    image: '/generated/news/touchsight-paired-data.png',
    imageAlt: 'Diagram showing 10 hours of original glove video paired with 10 hours of generated bare-hand video, sharing the original measured tactile labels.',
    imageCaption: 'RoboSkin.ai explanatory diagram of TwinTouch-20H’s paired visual data. The generated view reuses measured labels; it is not a second physical recording.',
    sourceDate: '2026-09-17',
    evidenceStatus: 'Preprint · arXiv v1',
    sourceTitle: 'TouchSight: Bare-Handed Tactile Prediction from Egocentric Video via Generative Visual Augmentation',
    sourceUrl: 'https://arxiv.org/abs/2609.20414',
    sources: [
      { title: 'TouchSight arXiv record', url: 'https://arxiv.org/abs/2609.20414' },
      { title: 'TouchSight v1 full paper', url: 'https://arxiv.org/html/2609.20414v1' },
      { title: 'Official HumanTouch acquisition and release page', url: 'https://xsparkai.com/sparklab/humantouch/' },
      { title: 'HumanTouch public file listing, pinned revision', url: 'https://huggingface.co/datasets/chuqiaoLyu/Xspark-HumanTouch/tree/81822a10cac5def2638db546eaeced581d71a8b5' },
      { title: 'ModelScope HumanTouch data license', url: 'https://www.modelscope.cn/datasets/chuqiaoLyu/Xspark-HumanTouch' },
    ],
    technicalFocus: ['tactile prediction', 'egocentric video', 'TwinTouch-20H', 'visuo-tactile datasets'],
  },
  {
    id: 'fibtac-pneumatic-fiber-gripper-tactile-sensing-2026',
    title: 'FibTac combines pneumatic gripping and tactile sensing',
    seoTitle: 'FibTac: Pneumatic Tactile Gripper and Lab Results',
    seoDescription:
      'Review Purdue’s FibTac gripper: fiber-based tactile sensing, liquid and underwater classification results, experiment sizes, payload, and public evaluation assets.',
    excerpt:
      'Purdue researchers use the same fiber array to grasp objects and sense contact. The peer-reviewed study reports air and water experiments, with separate protocols for objects, liquids, and granular media.',
    content: `# FibTac combines pneumatic gripping and tactile sensing

**Research news — paper published August 31, 2026; reviewed September 11, 2026**

FibTac is a pneumatic gripper that uses carbon fibers both to manipulate objects and to sense their interaction with the environment. Researchers at Purdue University describe the system in a peer-reviewed paper published in npj Robotics on August 31, 2026. Its useful distinction is the shared mechanical structure: the fibers do the grasping, while an internal camera reads their movement as tactile information. [Read the paper](https://www.nature.com/articles/s44182-026-00112-0).

The laboratory results cover chess-piece identification, liquid classification, granular-material classification, underwater object recognition, and water-flow estimation. These are separate experiments with different training sets and conditions. A single accuracy number would obscure what the gripper has actually demonstrated.

## How a fiber gripper senses touch

Carbon fibers are embedded in silicone inside a waterproof housing. Pneumatic pressure changes the fiber array’s configuration to grasp or release an object. The camera observes fiber-tip motion, which also changes when an object or surrounding medium resists that movement. Learned models use these image sequences for classification or regression.

This combines actuation and sensing in a compact contact structure. It also makes the signal depend on how the robot moves: liquid tests use active grasp–release cycles, whereas the granular tests move the gripper vertically with passive fibers. The sensing protocol is part of the measurement, not just a detail of the demonstration.

The authors report a payload up to 186 g and more than 3,000 actuation cycles without observable damage under their tested conditions. These establish a laboratory operating range; they do not establish an industrial lifetime or a payload rating across arbitrary objects. The [paper’s results and methods](https://www.nature.com/articles/s44182-026-00112-0#Sec2) describe the tested hardware and procedures.

## What the classification results measure

The following values are author-reported results from the paper. Clips, held-out samples, and online manipulation trials are kept separate because they are different evaluation units.

| Experiment | Classes and data protocol | Reported result | Interpretation |
| --- | --- | --- | --- |
| Chess-piece recognition | Six piece types; 105 clips per class, with 20% reserved for validation; a separate online manipulation evaluation uses 20 trials in total | 100% in the 20 online trials | A small online cohort, not 100% accuracy across arbitrary grasped objects |
| Liquid classification | Water, honey, syrup, dish liquid, oil, and an empty reference; 220 training and 20 test clips per class | Approximately 97.5% classification accuracy | Six classes include the empty reference; this is not six different liquids |
| Granular-material classification | Flour, beans, rice, oats, and sugar; 200 clips per class with 10% for validation, plus 20 test samples per class | Approximately 90% classification accuracy | Passive fibers sense resistance during robot-driven vertical movement |
| Underwater object classification | Four objects; 110 clips per object, including 10 validation and 10 test clips per object | 100% classification accuracy | A controlled four-object underwater experiment |

The chess experiment’s 20 online trials should not be substituted for the larger clip-based training and validation collection. Likewise, the underwater result does not imply that the gripper can identify unseen marine objects. These distinctions matter when comparing FibTac with other [robotic gripper tactile sensors](/applications/robot-gripper-tactile-sensor).

## Why motion and medium matter

For liquids, the gripper alternates grasp and release every second, collecting the resistance pattern over two cycles. For granular media, the robot moves vertically with a 4 cm amplitude and a 1.4-second period without pneumatic actuation. These motions actively expose material-dependent signals to the fiber array.

The flow experiment adds a different task: regression against measured water-flow conditions. The collection uses seven angles from 0° to 90° in 15° increments, 20 flow levels, and 12 clips per condition, allocated as nine training, one validation, and two test clips. The reference flow-meter values are volumetric flow in L/min; they should not be described as water velocity in m/s. See the [flow-sensing methods](https://www.nature.com/articles/s44182-026-00112-0).

For an engineering reader, this makes FibTac a candidate for studying coupled grasping and active tactile perception in wet or compliant environments. A comparison should match motion, fluid or material, camera settings, object set, and train/test separation before attributing a result solely to the sensor design.

## What can be inspected or reproduced today?

The authors’ [FibTac repository](https://github.com/xvvzhang/FibTac) provides evaluation notebooks for five tasks and links external data and checkpoints. At the reviewed revision, the repository describes validation/test assets rather than a complete training-data release. RoboSkin reviewed the repository and its instructions but did not download the external data or rerun the models.

The paper and repository point to different Google Drive folders. Both are source-provided links; their contents and equivalence were not independently verified in this review. A reproducer should first confirm that the selected notebook, checkpoint, and evaluation split belong together. The reviewed GitHub root did not contain a license file, so the paper’s open-access status should not be treated as a software or data license.

## Limits to carry into a comparison

The paper discusses practical constraints, including camera-cable fragility, the tradeoff between gripping strength and fine sensing, and generalization to unseen objects or environments. Those constraints are consequential for a combined actuator and sensor: changing stiffness or fiber geometry may improve one function while changing the other.

RoboSkin did not conduct these laboratory experiments. The article synthesizes the authors’ paper and public repository, and the cover is an illustration. For alternative contact structures, see [soft robotic skin](/applications/soft-robotic-skin) and the [tactile sensor benchmark guide](/benchmarks). For a different approach that reconstructs contact geometry from sparse electrical measurements, compare [TacPrint’s controlled grasping results](/research/tacprint-wearable-tactile-contact-reproduction-2026).

## Sources

- [Athar et al.: FibTac, npj Robotics, August 31, 2026](https://www.nature.com/articles/s44182-026-00112-0)
- [Purdue MARS Lab research listing](https://www.purduemars.com/research)
- [FibTac evaluation repository, reviewed revision](https://github.com/xvvzhang/FibTac/tree/3f2d29848c1d0eeddd89605259a19d1188241bb0)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-11',
    updated: '2026-09-11',
    readTime: '6 min read',
    category: 'Tactile grippers',
    image: '/generated/authority/research-soft-robotic-skin.webp',
    sourceTitle: 'FibTac: a fiber-based pneumatic gripper with embodied tactile sensing',
    sourceUrl: 'https://www.nature.com/articles/s44182-026-00112-0',
    sources: [
      { title: 'FibTac peer-reviewed paper', url: 'https://www.nature.com/articles/s44182-026-00112-0' },
      { title: 'Purdue MARS Lab', url: 'https://www.purduemars.com/research' },
      { title: 'FibTac evaluation repository', url: 'https://github.com/xvvzhang/FibTac/tree/3f2d29848c1d0eeddd89605259a19d1188241bb0' },
    ],
    technicalFocus: ['pneumatic gripper', 'vision-based tactile sensing', 'underwater sensing', 'soft robotic skin'],
  },
  {
    id: 'twins-aist-body-surface-tactile-demonstrations-2026',
    title: 'TWINS captures touch beyond the robot hand',
    seoTitle: 'AIST TWINS: Body-Surface Touch and Robot Demonstrations',
    seoDescription:
      'AIST’s TWINS uses 219 tactile cells to collect contact-rich demonstrations. Review its 40-demo study, tracking measurements, open hardware, and learning-code limits.',
    excerpt:
      'AIST’s wearable dual-arm system records pressure and proximity on the hands, arms, and chest. Its public hardware release makes the embodiment inspectable, while policy evidence remains qualitative.',
    content: `# TWINS captures touch beyond the robot hand

**Research news — preprint submitted August 3, 2026; release status reviewed September 11, 2026**

TWINS is a wearable demonstration system designed to capture manipulation that uses the arms and chest as well as the hands. A team at Japan’s National Institute of Advanced Industrial Science and Technology, AIST, pairs a human-operated wearable with a robot that shares its joint configuration and dimensions. Tactile cells record pressure and proximity across both systems’ contact surfaces. The [August 3 preprint](https://arxiv.org/abs/2608.01733) reports a small demonstration-learning study, not a peer-reviewed success-rate benchmark.

There is a concrete release update to accompany the paper: the [official project page](https://mmurooka.github.io/twins-project-page/) now links a hardware repository with robot descriptions and assembly resources. The project’s learning-code link still says “Coming soon” as of September 11. Those are different levels of access and should be evaluated separately.

## Why capture contact on the forearms and chest?

Holding a basket against the torso or receiving a ball with both arms uses contact away from the fingertips. A hand-only demonstration interface can capture joint motion while missing where the load touches the body. TWINS instead tries to preserve both the demonstrated geometry and the body-surface contact signals.

The wearable is supported by a chair. It is a dual-arm demonstration apparatus, not a freely walking full-body suit. Each arm has seven degrees of freedom, and the learning state includes 16 joint values when the two grippers are included. This makes it relevant to [body-surface robot skin](/humanoid-robot-skin), but the study does not demonstrate transfer to arbitrary walking humanoids.

## The sensor and collection budget

The paper describes Intouch Robotics e-Skin pressure and proximity sensing. Its sensor placement and recording protocol are explicit enough to distinguish physical cells from signal channels. [System design and experiments](https://arxiv.org/html/2608.01733v1).

| Quantity | Paper-reported configuration | What it means |
| --- | --- | --- |
| Cells on each arm | 15 at the gripper, 45 on the inner forearm, 18 on the upper arm | 78 cells per arm |
| Chest coverage | 63 cells | The two arms and chest total 219 cells |
| Tactile learning input | 438 values | Two measurements per cell: pressure and proximity |
| Recording frequency | 10 Hz | The stated data-acquisition rate |
| Demonstrations | 10 for each of four tasks, 40 in total | Collected by one operator, with an assistant presenting and removing objects |
| Collection time | Under 30 minutes for a set of 10 demonstrations | Not a claim that all 40 demonstrations took under 30 minutes |

The four tasks are Towel Hanging, Basket Holding, Ball Placing, and Adaptive Holding. The authors train Diffusion Policy using joint angles and tactile observations, with a state history of two steps and an action-prediction horizon of eight. This is a specific imitation-learning setup; it is not evidence of broad task generalization from 40 examples.

## What the experiments show—and what they do not measure

The paper reports qualitative execution of the four learned tasks. Its quantitative tracking measurement is a mean absolute error of 0.94° over the 14 arm joints, with a 95th-percentile error of 3.43°. The authors attribute much of the remaining error to approximately 0.4–0.6 seconds of tracking delay. These are joint-tracking measurements, not task-success percentages. [Evaluation section](https://arxiv.org/html/2608.01733v1#S4.SS4).

The observed policies change motion with body-surface contact events, supporting the feasibility of collecting and using this kind of demonstration. However, the paper does not provide a quantified task-success denominator or a matched tactile-disabled baseline. It therefore cannot establish a numerical improvement caused by touch, nor a reliable deployment success rate.

The authors also describe occasional object drops and the use of sponge padding to improve compliance. A robot that reproduces a demonstrated joint trajectory still needs suitable physical compliance and control when object size, contact location, or load changes. The paper should not be read as a validation of torque-controlled holding across those variations.

## Hardware is available; the learning release is incomplete

The [TWINS-Hardware repository](https://github.com/isri-aist/TWINS-Hardware) contains robot-description resources and links assembly instructions, a parts list, and 3D models. Its root license is CERN-OHL-W-2.0 at the reviewed revision. The repository was checked at commit fe9b8090edd8601798dbc618e1d9a9711a8c9697.

That is useful for understanding the mechanical embodiment. It does not establish that the experiment’s training implementation, checkpoints, or 40 demonstrations have been released. The official project page still labels the learning code as forthcoming. RoboSkin reviewed those listings but did not build the hardware, download all linked fabrication resources, or reproduce a policy.

For a lab considering a similar collection system, the first questions are practical: can the human demonstrate with the same reachable contact geometry, do pressure and proximity remain calibrated after mounting, and does the robot have enough compliance to tolerate imperfect replay? A follow-up evaluation should count attempted and successful trials, report object changes, and compare identical policies with and without the tactile input.

## Where TWINS fits in tactile robot learning

TWINS addresses demonstration capture over a large contact surface. [TacPrint](/research/tacprint-wearable-tactile-contact-reproduction-2026) addresses a related problem at the fingertip: transferring local contact geometry from a human demonstration to a robot. The two projects differ in sensor technology, embodiment, and evaluation protocol, so their reported measurements should not be ranked as if they were one benchmark.

For the surrounding architecture, see [robot teleoperation](/robot-teleoperation), [robot learning](/robot-learning), and [robot hands](/robot-hands). The evidence here is author-reported and preliminary; the contribution is a concrete interface for contact-rich demonstrations and an inspectable hardware release.

## Sources

- [Kitamura et al.: TWINS preprint, August 3, 2026](https://arxiv.org/abs/2608.01733)
- [TWINS full paper and experimental protocol](https://arxiv.org/html/2608.01733v1)
- [AIST authors’ TWINS project page](https://mmurooka.github.io/twins-project-page/)
- [TWINS-Hardware at the reviewed revision](https://github.com/isri-aist/TWINS-Hardware/tree/fe9b8090edd8601798dbc618e1d9a9711a8c9697)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-11',
    updated: '2026-09-11',
    readTime: '6 min read',
    category: 'Tactile robot learning',
    image: '/generated/authority/humanoid-stack-map-cover.webp',
    sourceTitle: 'TWINS: A Tactile Wearable Isomorphic Arm Networked System for Contact-Rich Manipulation Learning',
    sourceUrl: 'https://arxiv.org/abs/2608.01733',
    sources: [
      { title: 'TWINS preprint', url: 'https://arxiv.org/abs/2608.01733' },
      { title: 'Official TWINS project', url: 'https://mmurooka.github.io/twins-project-page/' },
      { title: 'TWINS hardware release', url: 'https://github.com/isri-aist/TWINS-Hardware/tree/fe9b8090edd8601798dbc618e1d9a9711a8c9697' },
    ],
    technicalFocus: ['body-surface tactile sensing', 'robot demonstrations', 'imitation learning', 'robot teleoperation'],
  },
  {
    id: 'gemini-robotics-2-whole-body-vla-dexterity-2026',
    title: 'Gemini Robotics 2 extends VLA control from whole-body motion to dexterous hands',
    seoTitle: 'Gemini Robotics 2: Whole-Body VLA and Dexterity',
    seoDescription:
      'An evidence-bounded review of Google DeepMind’s Gemini Robotics 2 VLA, ER 2 reasoning model, On-Device 2 model, official task results, access, and tactile gap.',
    excerpt:
      'Google DeepMind’s Gemini Robotics 2 model family connects whole-body humanoid control, dexterous manipulation, embodied reasoning, and on-device adaptation—but its public results are provider-reported, not independent benchmarks.',
    content: `# Gemini Robotics 2 extends VLA control from whole-body motion to dexterous hands

**Official model update review — source published July 30, 2026**

Google DeepMind introduced Gemini Robotics 2 as a family of models for robot control and embodied reasoning. The release separates three functions that are often collapsed into one “robot foundation model” label: a vision-language-action model that outputs robot actions, an embodied-reasoning model that plans and monitors longer tasks, and a smaller VLA intended to run locally on robot hardware.

The important shift is scope. DeepMind reports control across full humanoid bodies, multi-finger hands, parallel grippers, and multiple robots. That does not mean the system has solved general-purpose dexterity. The company’s own task chart shows wide variation, particularly for multi-finger tasks, and the public sources do not establish tactile sensing as an input modality.

## What is Gemini Robotics 2?

Gemini Robotics 2 is Google DeepMind’s July 2026 vision-language-action model for turning visual and language inputs into motor actions on humanoid and bi-arm robots. It is presented alongside Gemini Robotics ER 2 for high-level embodied reasoning and Gemini Robotics On-Device 2 for local manipulation inference.

| Model | Publicly described role | Distribution stated by DeepMind |
| --- | --- | --- |
| Gemini Robotics 2 | VLA for whole-body humanoid and bi-arm control, including hands and grippers | Available to early-access partners |
| Gemini Robotics ER 2 | Vision-language model for planning, communication, progress tracking, tool orchestration, and multi-robot coordination | Available through Google AI Studio and Gemini API; enterprise channel in private preview |
| Gemini Robotics On-Device 2 | Local VLA for general-purpose bi-arm manipulation and adaptation to new embodiments | Available only to selected trusted testers |

These access states matter. The release is not equivalent to a downloadable, reproducible open model package. Researchers can inspect the announcement, model cards, and safety report, but general access to the VLA and On-Device 2 weights or training data is not described.

## What the official task chart reports

DeepMind says one Gemini Robotics 2 checkpoint controlled three embodiments: an Apptronik Apollo 2 with Inspire hands, an Apollo 2 with SharpaWave hands, and a Franka Duo with a Robotiq gripper. The values below are transcribed from the company’s release chart and belong only to those reported task settings.

| Embodiment and task | Officially reported success rate |
| --- | ---: |
| Apollo 2 + Inspire hands: pick up from table | 68.4% |
| Apollo 2 + Inspire hands: pick up from floor | 45.7% |
| Apollo 2 + Inspire hands: pick up from shelf | 76.3% |
| Apollo 2 + SharpaWave hand: screw bulb | 36% |
| Apollo 2 + SharpaWave hand: unscrew bulb | 92% |
| Apollo 2 + SharpaWave hand: tie trash bag | 44% |
| Apollo 2 + SharpaWave hand: dustpan | 32% |
| Apollo 2 + SharpaWave hand: ziplock | 40% |
| Franka Duo + Robotiq gripper: general pick and place | 74.2% |
| Franka Duo + Robotiq gripper: diverse tool kitting | 78.9% |
| Franka Duo + Robotiq gripper: precise insertion | 89.6% |

These figures are useful because they show the difficulty gradient inside “dexterity.” They are not an independent leaderboard. The public announcement does not provide enough information to compare the percentages directly with a different lab’s policy, robot, object set, reset procedure, or success definition. DeepMind itself notes that multi-finger manipulation remains challenging.

## Whole-body control and embodied reasoning are different layers

The VLA maps observations and instructions to actions. ER 2 is presented as a higher-level agent that can break a longer goal into steps, communicate with humans, monitor progress, and coordinate tools or other robots. In the release architecture, the reasoning model can call the VLA rather than replacing the controller.

That division is relevant to [robot VLA models](/robot-vla-models) and [Physical AI](/physical-ai-touch): long-horizon planning does not remove the need for fast state estimation and low-level control. A robot still needs embodiment-specific balance, collision handling, force control, and hardware safety below the language-reasoning layer.

## What the on-device model adds

DeepMind describes On-Device 2 as taking text, images, and numerical proprioception and returning numerical robot actions. The company reports adaptation to new bi-arm embodiments with a few hours of data, typically fewer than 200 examples in its experiments. Its model card also states two important limitations: weaker generalization outside the training distribution and difficulty controlling high-degree-of-freedom robots.

Local inference may reduce dependence on network connectivity and latency, but “on-device” is not itself a latency guarantee. The public model card does not publish a universal end-to-end control frequency across supported robot hardware.

## The tactile question: dexterous is not the same as tactile

The release demonstrates hands and grippers, but the public announcement and On-Device 2 model card describe vision, language, and proprioception—not tactile arrays or robot-skin signals—as model inputs. RoboSkin.ai therefore does not classify this release as a tactile foundation model.

That boundary is strategically useful. Multi-finger tasks such as tying, sealing, and tool handling are exactly where contact state, shear, slip, and distributed force can matter. The release establishes a strong vision-to-action reference point; it does not show whether touch improves the reported tasks. A future comparison should document the sensor stack and test the same policy with and without tactile input.

For the contact layer, compare the [robot hands guide](/robot-hands), [tactile AI architecture](/tactile-ai), and [robot manipulation overview](/robot-manipulation).

## Safety evidence is also layered

DeepMind’s separate safety report evaluates agentic safety and uncertainty handling, including when an embodied-reasoning agent should refuse, ask for help, or call a safety tool. The report explicitly says it does not evaluate the certified functional-safety architecture, redundancy, or real-time guarantees needed for a compliant physical deployment.

That is the correct system boundary. Semantic safety can decide that a request is unsafe. Hardware and control safety must still make the robot stop predictably when a hazardous condition occurs. See the [robot safety map](/robot-safety) for the distinction between AI behavior, protective sensing, control functions, integration, and validation.

## Evidence boundary

This article analyzes Google DeepMind’s own release post, model cards, and safety report. The success rates are provider-reported results, not independent replications, and should not be transferred to other robots or task protocols. RoboSkin.ai did not test the models. No public source reviewed here establishes tactile input, model-weight access for the VLA, general commercial availability, or certified deployment safety.

## Sources

- [Google DeepMind: Gemini Robotics 2 brings whole body intelligence to robots](https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/)
- [Google DeepMind: Gemini Robotics ER 2 model card](https://deepmind.google/models/model-cards/gemini-robotics-er-2/)
- [Google DeepMind: Gemini Robotics On-Device 2 model card](https://deepmind.google/models/model-cards/gemini-robotics-on-device-2/)
- [Google DeepMind: Gemini Robotics 2 safety evaluations](https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-08-21',
    updated: '2026-08-21',
    readTime: '8 min read',
    category: 'Robot VLA models',
    image: '/generated/pages/technology-signal-flow.webp',
    sourceTitle: 'Gemini Robotics 2 brings whole body intelligence to robots',
    sourceUrl: 'https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/',
    sources: [
      {
        title: 'Google DeepMind: Gemini Robotics 2 release',
        url: 'https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/',
      },
      {
        title: 'Google DeepMind: Gemini Robotics ER 2 model card',
        url: 'https://deepmind.google/models/model-cards/gemini-robotics-er-2/',
      },
      {
        title: 'Google DeepMind: Gemini Robotics On-Device 2 model card',
        url: 'https://deepmind.google/models/model-cards/gemini-robotics-on-device-2/',
      },
      {
        title: 'Google DeepMind: Gemini Robotics 2 safety evaluations',
        url: 'https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf',
      },
    ],
    technicalFocus: ['Gemini Robotics 2', 'vision-language-action model', 'humanoid robots', 'dexterous manipulation'],
  },
  {
    id: 'lerobot-v060-world-models-vla-evaluation-2026',
    title: 'LeRobot v0.6 connects world models, VLAs, evaluation, and corrective data collection',
    seoTitle: 'LeRobot v0.6: World Models, VLAs and Evaluation',
    seoDescription:
      'Hugging Face LeRobot v0.6 adds world-model policies, five VLA integrations, reward models, six simulation benchmarks, richer datasets, and DAgger corrections.',
    excerpt:
      'LeRobot v0.6 turns more of the robot-learning loop into shared infrastructure: world-model policies, VLAs, reward models, datasets, simulation evaluation, deployment, and corrective demonstrations.',
    content: `# LeRobot v0.6 connects world models, VLAs, evaluation, and corrective data collection

**Open-source robotics release review — source published July 7, 2026**

Hugging Face released LeRobot v0.6.0 with a wider goal than adding another policy. The update connects model training, rollout, failure capture, human correction, dataset enrichment, reward estimation, and simulation evaluation inside one open-source robotics stack.

For robot learning, that integration may be more consequential than any individual model name. A vision-language-action policy becomes useful only when teams can record compatible observations and actions, evaluate the policy under controlled variation, preserve failures, and turn corrections into the next training set.

## What changed in LeRobot v0.6?

LeRobot v0.6 is the July 2026 release of Hugging Face’s open robotics framework. It adds three world-model policy integrations, five VLA integrations, a unified reward-model API, six simulation benchmark integrations, richer dataset support, and a dedicated rollout command with human correction strategies.

| Layer | Additions named in the official release | Role in the loop |
| --- | --- | --- |
| World-model policies | VLA-JEPA, LingBot-VA, FastWAM | Learn or use predicted future representations during policy training or design |
| VLA integrations | GR00T N1.7, MolmoAct2, EO-1, Multitask DiT, EVO1 | Convert visual and language context into robot actions |
| Reward models | Existing HIL-SERL and SARM plus Robometer and TOPReward | Estimate task progress or success from trajectories |
| Simulation benchmarks | LIBERO-plus, RoboTwin 2.0, RoboCasa365, RoboCerebra, RoboMME, VLABench | Test robustness, bimanual manipulation, household tasks, long horizons, memory, and reasoning |
| Dataset tooling | Depth, timestamped language annotations, configurable video encoding, parallel decoding | Record and load richer training observations |
| Deployment | lerobot-rollout strategies, including DAgger-style correction | Run policies and save failures or human interventions as data |

The word “integration” is important. LeRobot provides common interfaces and workflows around projects developed by multiple organizations. The release itself is not evidence that every model outperforms every previous policy.

## Three different uses of a robot world model

The release groups VLA-JEPA, LingBot-VA, and FastWAM under world-model policies, but they do not use prediction in the same way.

- VLA-JEPA predicts future representations during training, while the world-model component is removed at inference.
- LingBot-VA predicts video and actions autoregressively and can save predicted video for comparison with the actual rollout.
- FastWAM combines video-generation and action experts during training but skips explicit future generation at inference.

This distinction prevents a common SEO shortcut: “world model” is not one fixed architecture. For a useful comparison, record what the model predicts, whether prediction runs at test time, how actions condition the prediction, and whether the imagined state is evaluated against actual robot outcomes. The [robot world models guide](/robot-world-models) organizes those questions.

## Six simulation benchmark integrations

The new environments target different failure modes rather than one universal score. The official release describes LIBERO-plus as robustness testing under perturbations, RoboTwin 2.0 as bimanual manipulation, RoboCasa365 as kitchen-task coverage, RoboCerebra as long-horizon subgoal execution, RoboMME as memory testing, and VLABench as knowledge and reasoning for manipulation.

All six run through the lerobot-eval interface and have their own environment dependencies. A common CLI reduces integration friction; it does not make their tasks, observations, success criteria, or scores directly interchangeable. Benchmark reports should still identify the environment version, policy checkpoint, number of episodes, random seeds, and evaluation hardware.

## From deployment failure to training data

The dedicated lerobot-rollout command separates policy deployment from ordinary dataset recording. Its strategies include continuous recording, saving selected recent windows, episodic rollouts, and a DAgger-style mode in which an operator can interrupt a failed action, take control through a leader device, record the correction, and return control to the policy.

Intervention frames are tagged in the resulting dataset. That creates a concrete [robot teleoperation](/robot-teleoperation) path:

Robot policy rollout → observed failure → human correction → labeled intervention frames → fine-tuning → another rollout.

The quality of the correction still depends on timing, operator skill, sensor calibration, action alignment, and whether the corrected states cover the failures the deployed policy will actually encounter.

## Dataset changes and the tactile-data gap

The release adds end-to-end depth recording, timestamped language annotations, configurable video encoding, and faster multi-camera decoding. The language schema can carry subtasks, plans, corrections, speech, and visual question-answer pairs rather than one sentence for an entire episode.

Those improvements matter to [robotics datasets](/robotics-datasets), but the official release does not announce a standard tactile modality for LeRobot datasets. A tactile extension would still need to define sensor identity, taxel geometry, coordinate frames, calibration, units, sampling rate, timestamps, compression, missing samples, and alignment with cameras, proprioception, and actions. Adding an array without those fields produces bytes, not reusable tactile evidence.

## What the release does not prove

LeRobot v0.6 makes many models and benchmarks easier to run through common interfaces. It does not provide one independent comparison showing which VLA, world model, or reward model is best across real robots. The release’s speed claims and benchmark descriptions come from the project announcement and should be validated in each team’s environment.

Simulation success also does not establish real-world robustness. Camera calibration, latency, motor dynamics, contact, object variation, and safety behavior can change the outcome after deployment.

## Evidence boundary

This article summarizes Hugging Face’s official LeRobot v0.6.0 announcement and linked project repository. Model, dataset-loading, and benchmark claims are release-author claims unless a separate paper is named. RoboSkin.ai did not independently reproduce the six environments, speed measurements, model results, or hardware workflows. Availability may differ by model license, checkpoint, simulator dependency, and compute requirement.

## Sources

- [Hugging Face: LeRobot v0.6.0 — Imagine, Evaluate, Improve](https://huggingface.co/blog/lerobot-release-v060)
- [GitHub: huggingface/lerobot](https://github.com/huggingface/lerobot)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-08-21',
    updated: '2026-08-21',
    readTime: '7 min read',
    category: 'Robot learning',
    image: '/generated/authority/tactile-ai-loop.webp',
    sourceTitle: 'LeRobot v0.6.0: Imagine, Evaluate, Improve',
    sourceUrl: 'https://huggingface.co/blog/lerobot-release-v060',
    sources: [
      {
        title: 'Hugging Face: LeRobot v0.6.0 release',
        url: 'https://huggingface.co/blog/lerobot-release-v060',
      },
      {
        title: 'GitHub: huggingface/lerobot',
        url: 'https://github.com/huggingface/lerobot',
      },
    ],
    technicalFocus: ['LeRobot', 'robot world models', 'vision-language-action models', 'robot learning benchmarks'],
  },
  {
    id: 'nist-humanoid-baseline-performance-benchmark-2026',
    title: 'NIST proposes a baseline benchmark for comparable humanoid robot capabilities',
    seoTitle: 'NIST Humanoid Robot Baseline Benchmark Explained',
    seoDescription:
      'NIST’s 2026 proposal maps low-footprint locomotion, manipulation, loco-manipulation, whole-body control, and reasoning tasks for comparable humanoid evaluation.',
    excerpt:
      'NIST is developing a low-footprint baseline of measurable locomotion, manipulation, whole-body, and reasoning tasks—but the public page is a proposal, not a published humanoid leaderboard.',
    content: `# NIST proposes a baseline benchmark for comparable humanoid robot capabilities

**Official benchmark-project review — NIST page created April 20 and updated May 15, 2026**

The U.S. National Institute of Standards and Technology is developing a Humanoid Robot Baseline Performance Benchmark: a proposed set of low-footprint locomotion and manipulation tasks intended to make minimum physical capabilities more comparable across humanoid robots.

The most important word is “proposed.” NIST’s public project page describes the purpose, task dimensions, collaboration process, and planned apparatus distribution. It does not publish a completed standard, a final protocol, or ranked results for named humanoid platforms.

## What is the NIST humanoid benchmark proposal?

It is a NIST project to develop common, quantifiable tasks for assessing baseline humanoid mobility, manipulation, loco-manipulation, whole-body control, and limited reasoning. The design draws mainly from earlier standardized NIST test methods and is being developed with industry and research-community input.

NIST says the benchmark is intended to represent capabilities expected of commercially available humanoids across potential industrial, home, healthcare, and other applications. That application language describes the proposed performance task set; it does not make this page a safety certification or product-approval program.

## Capability areas on the public outline

| Capability area | What the NIST outline is intended to exercise | Evidence a useful result should preserve |
| --- | --- | --- |
| Mobility | Domain-agnostic basic humanoid locomotion | Course geometry, completion state, time, contacts, falls, assistance |
| Manipulation and dexterity | Basic object interaction and hand or end-effector capability | Object specification, grasp state, errors, resets, success definition |
| Loco-manipulation | Coordinated movement and manipulation in one task | Base and arm motion, balance events, task sequence, recovery behavior |
| Whole-body control | Operation in confined-space manipulation tasks | Clearance, body contacts, collision policy, pose constraints |
| Minimal reasoning | Task and scene understanding plus basic decisions | Instruction, scene variation, allowed interventions, failure taxonomy |

The right-hand column is RoboSkin.ai’s recommended reporting layer, not a claim that NIST has finalized those exact fields. It shows why a benchmark needs more than a success percentage if researchers want results that can be reproduced or compared.

## Why “low footprint” matters

Humanoid testing can become expensive when it requires a custom building, large course, or one-off instrumentation. NIST proposes a compact apparatus and says it plans to publish designs and 3D models for physical or virtual use. A limited number of apparatuses are planned for distribution to participating U.S. manufacturers and regional facilities.

If the apparatus and protocol become repeatable, smaller footprints could make baseline testing easier to reproduce across sites. Repeatability will still depend on versioned geometry, materials, setup, scoring, robot configuration, and disclosure of operator intervention.

## What the project can and cannot compare

A common task can compare observable capability more cleanly than a company demo made for one robot. It does not automatically explain why one robot succeeds. Two systems may differ in mechanical design, perception, teleoperation, autonomy, control rate, training data, or allowed resets.

For that reason, a useful [humanoid robots](/humanoid-robots) record should separate at least four things:

- the robot platform and end effector;
- the benchmark apparatus and protocol version;
- the autonomy and human-intervention conditions; and
- the metric, trial count, and failure categories.

Without those boundaries, a visually impressive run can be mistaken for a comparable benchmark result.

## Where tactile sensing fits—and where it is not required

The public NIST outline is capability-oriented and does not require one named sensing modality. It does not say that humanoids must use robot skin or tactile arrays to pass the proposed tasks.

Touch may still be relevant to manipulation, balance recovery, confined-space contact, and whole-body awareness. A [robot hand](/robot-hands) can use tactile sensing to estimate contact distribution or slip; a body surface can detect unintended contact; force-torque sensing can measure aggregate loads. But benchmark evidence should report which sensors were actually active rather than infer touch from successful motion.

That distinction supports a future research question: under the same protocol, does tactile feedback change success, contact errors, recovery, or damage rates? The benchmark proposal supplies a possible task structure, not the answer.

## Safety benchmark versus performance benchmark

The project is framed around baseline performance. Performance evaluation and safety conformity are not interchangeable. A humanoid can complete a manipulation task yet still need a separate risk assessment, protective functions, operating limits, and validation for its intended environment.

Use the [robot safety overview](/robot-safety) to keep capability metrics, functional safety, AI behavior, and application-specific compliance separate.

## Current status and evidence boundary

As of the NIST page update dated May 15, 2026, the apparatus was under development with participation being sought from manufacturers, researchers, and test facilities. NIST said designs and 3D models would be published and results would be collected under agreed data-sharing arrangements, with aggregate results intended to characterize the state of the art.

This article does not claim those planned artifacts or aggregate results are already available. It summarizes an official project page, not a final standard, peer-reviewed benchmark paper, or completed ranking. RoboSkin.ai has not participated in the protocol design or tested a humanoid on the apparatus.

## Source

- [NIST: Humanoid Robot Baseline Performance Benchmark](https://www.nist.gov/el/intelligent-systems-division-73500/humanoid-robot-baseline-performance-benchmark)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-08-21',
    updated: '2026-08-21',
    readTime: '6 min read',
    category: 'Robotics benchmarks',
    image: '/generated/pages/comparison-matrix.webp',
    sourceTitle: 'Humanoid Robot Baseline Performance Benchmark',
    sourceUrl: 'https://www.nist.gov/el/intelligent-systems-division-73500/humanoid-robot-baseline-performance-benchmark',
    sources: [
      {
        title: 'NIST: Humanoid Robot Baseline Performance Benchmark',
        url: 'https://www.nist.gov/el/intelligent-systems-division-73500/humanoid-robot-baseline-performance-benchmark',
      },
    ],
    technicalFocus: ['humanoid robot benchmark', 'loco-manipulation', 'whole-body control', 'robot evaluation'],
  },
  {
    id: 'iso-10218-2025-industrial-robot-safety-scope',
    title: 'ISO 10218:2025 separates industrial robot design from application integration',
    seoTitle: 'ISO 10218:2025 Industrial Robot Safety Scope',
    seoDescription:
      'A public-source guide to ISO 10218-1 and ISO 10218-2:2025, their industrial scope, exclusions, and what robot skin can—and cannot—prove about safety.',
    excerpt:
      'ISO 10218-1:2025 addresses the industrial robot before system integration, while Part 2 addresses applications and robot cells; neither makes a sensor alone a certified safety system.',
    content: `# ISO 10218:2025 separates industrial robot design from application integration

**Public standard-scope guide — ISO 10218-1:2025 published February 5, 2025**

ISO 10218 is a two-part international industrial-robot safety standard. Part 1 addresses the industrial robot as partly completed machinery before integration. Part 2 addresses industrial robot applications and robot cells after the robot is integrated into a working system.

That separation is the first thing a Robot Skin or Physical AI team should understand. A sensor can contribute contact information, but robot safety is evaluated at multiple levels: robot design, protective functions, system integration, the application, operating environment, foreseeable misuse, and validation.

## What does ISO 10218:2025 cover?

| Standard | Publicly described scope | Primary audience |
| --- | --- | --- |
| ISO 10218-1:2025 | Safety requirements for industrial robots as machines before application integration | Industrial robot manufacturers and robot safety engineers |
| ISO 10218-2:2025 | Safety requirements for industrial robot applications and robot cells | System integrators, application designers, and operators responsible for the complete cell |

Both parts are listed by ISO as 2025 publications. The ISO page identifies Part 1 as Edition 3 and gives its publication date as February 2025.

## Industrial scope is not every kind of robot

The public ISO scope for Part 1 excludes several categories, including medical and healthcare robots, service robots accessible to the public, consumer products, airborne or space robots, and systems that lift or transport people. It also excludes several special operating environments and application hazards.

This means “ISO 10218 compliant” should not be used as a generic label for every humanoid, home robot, prosthetic, or public-facing service robot. A robot’s intended use and access conditions determine which standards and regulations are relevant. ISO’s robotics overview separately lists ISO 13482 for personal-care robots and ISO/TS 15066 for collaborative robots, among other standards.

## Why Part 1 and Part 2 must stay separate

Part 1 can address the robot manufacturer’s design and information obligations, but a robot is rarely the whole production system. The integrator may add an end effector, workpiece, fixture, conveyor, process tool, mobile base, software, or shared workspace. Those additions create application hazards that cannot be validated from the robot specification alone.

The practical evidence chain is therefore:

Robot design → integration design → application hazards → protective measures → validation → operating information.

Skipping the integration layer is especially risky for Physical AI systems, because learned behaviors may interact with tools, objects, and people in ways that were not visible in a component demonstration.

## Robot skin and collision sensing: useful, but not proof by itself

[Robot skin](/robot-skin) can detect distributed contact or proximity. A tactile surface may support collision detection, contact-aware motion, or protective stopping. Those functions can be valuable inputs to a safety architecture.

However, a pressure map does not establish that the complete safety function is compliant. Teams still need to define and validate the signal path, diagnostic coverage, fault response, stopping behavior, timing, force or energy limits where applicable, environmental limits, maintenance, and integration with other protective measures.

The public ISO product page does not provide a basis for RoboSkin.ai to state exact clause requirements, force thresholds, separation distances, or required performance levels. Those details must be checked in the licensed standard and the standards or regulations applicable to the actual installation.

## Collaborative robots are an application, not a magic product class

A robot marketed as “collaborative” is not automatically safe for every close-proximity task. Collaboration depends on the application, tooling, workpiece, speed, force, workspace, possible contacts, and implemented protective measures. Sharp tools or hazardous processes can create risk even when the arm includes collision detection.

For AI-controlled robots, semantic safeguards add another layer but do not replace functional safety. An AI agent can refuse a dangerous instruction or request human help; the physical system still needs predictable protective behavior when sensing, communications, software, or actuation fails. The [robot safety map](/robot-safety) separates these layers.

## Which public sources should teams use?

Start with the official ISO pages to identify the edition, scope, status, and related standards. Use national standards bodies or recognized industry associations to locate adopted versions and training. For a real installation, obtain the applicable standard text and complete a documented risk assessment with qualified safety and integration personnel.

Avoid relying on a blog post—including this one—for compliance decisions. A search summary can explain the map; it cannot replace controlled engineering documentation.

## Evidence boundary

This article is based on ISO’s public product page and public robotics-sector overview. RoboSkin.ai did not access or reproduce the paid full text of ISO 10218-1:2025 or ISO 10218-2:2025. It does not give legal advice, certify a robot, or claim that robot skin satisfies any clause. The A3 article below is included as secondary industry context; ISO remains the primary source for the standard’s identity and public scope.

## Sources

- [ISO: ISO 10218-1:2025 — Safety requirements for industrial robots](https://www.iso.org/standard/73933.html)
- [ISO: Robotics standards overview](https://www.iso.org/cms/live/live/en/sites/isoorg/home/sectors/engineering/robotics.html)
- [Association for Advancing Automation: updated ISO 10218 overview](https://www.automate.org/robotics/news/updated-iso-10218-major-advancements-in-industrial-robot-safety-standards-now-available)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-08-21',
    updated: '2026-08-21',
    readTime: '6 min read',
    category: 'Robot safety',
    image: '/generated/pages/application-contexts.webp',
    sourceTitle: 'ISO 10218-1:2025 — Robotics — Safety requirements — Part 1: Industrial robots',
    sourceUrl: 'https://www.iso.org/standard/73933.html',
    sources: [
      {
        title: 'ISO: ISO 10218-1:2025',
        url: 'https://www.iso.org/standard/73933.html',
      },
      {
        title: 'ISO: Robotics standards overview',
        url: 'https://www.iso.org/cms/live/live/en/sites/isoorg/home/sectors/engineering/robotics.html',
      },
      {
        title: 'A3: updated ISO 10218 overview',
        url: 'https://www.automate.org/robotics/news/updated-iso-10218-major-advancements-in-industrial-robot-safety-standards-now-available',
      },
    ],
    technicalFocus: ['ISO 10218:2025', 'industrial robot safety', 'robot integration', 'robot skin safety'],
  },
  {
    id: 'twisted-yarn-textile-capacitive-robot-skin-2026',
    title: 'Twisted-yarn robot skin gains pressure sensitivity but loses proximity range',
    seoTitle: 'Twisted-Yarn Robot Skin: Pressure vs Proximity',
    seoDescription:
      'A 2026 preprint tests layered textile capacitive robot skin, exposing a tradeoff between pressure sensitivity and proximity sensing range.',
    excerpt:
      'A new textile capacitive robot-skin study shows that adding twisted-yarn layers improves pressure sensitivity and strength while shortening proximity range.',
    content: `# Twisted-yarn robot skin gains pressure sensitivity but loses proximity range

**Research news brief — August 18, 2026**

A preprint submitted on August 14 tests how yarn architecture changes the behavior of textile capacitive sensors for robotic skin. The researchers built one-, two-, and four-layer structures from silver-coated yarns insulated with polydimethylsiloxane (PDMS), then compared pressure, proximity, mechanical, cyclic, thermal, and robot-integration behavior.

The most useful result is a design tradeoff. More twisted-yarn layers increased electrode overlap, pressure sensitivity, tensile strength, and elongation. The same change reduced the reported proximity range. A robot-skin designer therefore cannot assume that the architecture with the strongest contact signal is also the best non-contact sensor.

## What the researchers changed

The study holds the basic material system constant and changes the number of twisted yarn layers. The reported effective electrode-overlap area grows from 0.25 mm² in the one-layer structure to 1.0 mm² with two layers and 4.0 mm² with four layers. That makes the four-layer overlap 16 times the one-layer value.

The paper evaluates applied stress from 0.4 to 3.9 MPa using the localized yarn-contact area. This normalization matters: those values should not be compared directly with pressure ranges calculated from a much larger indenter or skin-patch area.

| Reported item | One layer | Two layers | Four layers |
| --- | ---: | ---: | ---: |
| Effective overlap area | 0.25 mm² | 1.0 mm² | 4.0 mm² |
| Proximity range | 60 mm | 50 mm | 40 mm |
| Elongation at break | 37.5% | 62.5% | 85.0% |
| Maximum tensile load | 23.3 N | 42.7 N | 89.7 N |

## Pressure sensitivity and response

The four-layer configuration produced the highest reported pressure sensitivity: 0.1331 MPa⁻¹ at a 100 kHz excitation frequency. The authors attribute the improvement to the larger effective overlap area and stronger field interaction created by the layered twist.

The sensor's step-load rise and recovery times were both about 0.9 seconds. The paper also shows reproducible response to periodic excitation up to 5 Hz, but that should not be interpreted as full settling within every 200-millisecond cycle. Detecting a repeated modulation and completing a step response are different tests.

The four-layer device was cycled 15,000 times without the paper reporting substantial degradation. Tests from 25 to 90 °C produced no clear systematic drift in the reported setup. These are useful laboratory results, but they do not establish abrasion resistance, washability, connector lifetime, or long-duration performance on a moving robot.

## Why proximity moves in the opposite direction

In proximity mode, the human body acts as the approaching conductive object. The one-layer sensor detected approach at up to 60 mm, compared with 50 mm for two layers and 40 mm for four layers.

The paper relates the shorter range to the more compact field distribution in thicker layered structures. The result gives robot-skin teams a concrete selection question: is the surface intended to detect an approaching person before contact, or to resolve pressure more strongly after contact? The answer may favor a different yarn architecture—or a hybrid surface—rather than one universal stack.

## From one sensor to a robot-skin matrix

The researchers assembled a 4 × 4 textile matrix with an active area of about 30 × 30 mm² and roughly 10 mm spacing between sensing points. They mounted the system on a Franka Emika Panda arm for three demonstrations:

- mapping touch across the textile array;
- triggering an evasive robot motion when proximity crossed a threshold; and
- distinguishing a rigid gear contact from a human hand using threshold-based safety logic.

The paper reports about 403 milliseconds of end-to-end reaction latency in the prototype. That value includes the demonstrated sensing and control path; it is not a universal response time for textile robot skin. The demonstrations use threshold rules rather than a learned tactile model, so this work belongs primarily to the robot-skin and signal-to-control layers—not yet to tactile foundation models.

## What this adds to the tactile intelligence stack

The study is valuable because it connects yarn geometry to two different sensing modes and then carries the design into a robot experiment. It makes the chain visible: textile architecture changes capacitance, capacitance produces pressure or proximity signals, and threshold logic turns those signals into robot behavior.

For the broader system context, start with the [robot skin definition](/robot-skin), compare the [humanoid robot skin stack](/humanoid-robot-skin), and see how measured touch becomes inference and action in the [tactile AI guide](/tactile-ai). The [flexible tactile sensor array guide](/guides/flexible-tactile-sensor-array) explains scaling, wiring, calibration, and coverage tradeoffs.

## Evidence limits

This is an arXiv v1 preprint submitted to IEEE Transactions on Instrumentation and Measurement, not a final peer-reviewed journal article. The evidence comes from one research prototype and a small 4 × 4 matrix. The robot demonstrations show threshold-based behaviors, not learned generalization, certified safety, or whole-body humanoid deployment.

The study also does not establish manufacturing yield across large textile surfaces, repeatable performance over complex curvature, resistance to abrasion and contamination, or transfer across users and environmental conditions. Those questions remain necessary before treating the design as a deployable safety skin.

## Practical questions

- Does adding yarn layers improve every sensing mode? No. It improved the reported pressure sensitivity and mechanical strength but reduced proximity range.
- Is 5 Hz the same as a 200 ms response time? No. The paper reports detectable periodic response up to 5 Hz, while step rise and recovery were each about 0.9 seconds.
- Does the robot demo use tactile AI? It uses contact and proximity signals in a robot-control loop, but the demonstrated decision logic is threshold-based rather than a learned model.
- Is this full-body humanoid skin? No. It is a 4 × 4 textile prototype mounted on a Panda robot arm.

## Source boundary

This brief summarizes the authors' arXiv preprint and adds RoboSkin.ai analysis. All measurements belong to the reported experimental setup. The cover image is an editorial illustration, not a paper figure. RoboSkin.ai is not affiliated with the authors, their institutions, arXiv, or IEEE.

## Source

- [arXiv: Effect of Twisted-Yarn Architecture on Pressure and Proximity Sensing Characteristics of Textile Capacitive Sensors for Robotic Skin](https://arxiv.org/abs/2608.14406)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-08-18',
    updated: '2026-08-18',
    readTime: '7 min read',
    category: 'Robot skin research',
    image: '/generated/authority/news-textile-artificial-skin-2026.webp',
    sourceTitle: 'Effect of Twisted-Yarn Architecture on Pressure and Proximity Sensing Characteristics of Textile Capacitive Sensors for Robotic Skin',
    sourceUrl: 'https://arxiv.org/abs/2608.14406',
    sources: [
      {
        title: 'arXiv: Twisted-yarn textile capacitive sensors for robotic skin',
        url: 'https://arxiv.org/abs/2608.14406',
      },
    ],
    technicalFocus: ['robot skin', 'textile capacitive sensor', 'pressure sensing', 'proximity sensing'],
  },
  {
    id: 'eit-pneumatic-hybrid-robot-skin-force-map-2026',
    title: 'Hybrid robot skin combines EIT location maps with pneumatic force sensing',
    seoTitle: 'Hybrid EIT–Pneumatic Robot Skin Reconstructs Force Maps',
    seoDescription:
      'A 2026 preprint combines electrical impedance tomography and pneumatic sensing in a 3D-printed robot skin, reducing reported sensitivity non-uniformity.',
    excerpt:
      'A 2026 preprint combines electrical impedance tomography with pneumatic sensing to improve force reconstruction across a large-area humanoid robot skin.',
    content: `# Hybrid robot skin combines EIT location maps with pneumatic force sensing

**Research news brief — August 2026**

A May 2026 preprint proposes a hybrid robotic skin that combines electrical impedance tomography (EIT) with pneumatic pressure sensing. EIT supplies spatial information about where contact changes the conductive surface; four sealed pneumatic pads supply a more stable estimate of net force. The authors use the two signals together to correct a known weakness of large-area EIT skin: sensitivity can vary with contact location.

## What the researchers built

The prototype uses a rigid base, four soft air-tight pads, a continuous piezoresistive layer, and 32 boundary electrodes. Its parts were produced through 3D printing and spray coating. The reported chest-mounted version measures 280 × 280 mm and reconstructs EIT images at 100 Hz using a precomputed matrix.

The processing path is deliberately modest. A Tikhonov-regularized inverse reconstruction produces the spatial EIT map. Each pneumatic pad is calibrated against ground-truth force. The pad signal then rescales the reconstructed conductivity image so the final map retains location cues while using the pneumatic estimate for force magnitude.

## Reported result

In load-cell indentation experiments, the paper reports that the coefficient of variation for sensitivity non-uniformity fell from 0.31 for the EIT-only baseline to 0.14 for the hybrid method. That is a reduction in variation within the authors' test protocol, not a universal accuracy claim.

| Reported item | Value | Why it matters |
| --- | --- | --- |
| Humanoid chest skin area | 280 × 280 mm | Demonstrates a body-scale patch rather than a fingertip-only sensor. |
| EIT electrodes | 32 | Boundary measurements reconstruct contact over a continuous surface. |
| Pneumatic pads | 4 | Each pad contributes an independent net-force estimate. |
| EIT reconstruction rate | 100 Hz | Shows the reported visualization pipeline can run in real time. |
| Sensitivity variation | 0.31 → 0.14 coefficient of variation | The hybrid calibration reduced location-dependent non-uniformity in the reported indentation test. |

## Why the two modalities complement each other

EIT can infer where conductivity changed across a flexible surface, but inverse reconstruction is sensitive to nonlinearity, fabrication variation, and the gap between simulation and the physical skin. Pneumatic sensing is mechanically simple and sensitive to total load, but one air chamber cannot determine where inside that chamber contact occurred.

The hybrid design assigns each modality the job it handles better. EIT preserves spatial structure. Air pressure anchors the force estimate. For whole-body robot skin, that division may be more practical than expecting one sensing mechanism to deliver coverage, localization, force accuracy, compliance, and simple fabrication by itself.

## Multi-contact evidence

The authors also pressed two locations sequentially on the same pneumatic pad. The pressure signal followed the sum of the contacts, while the EIT image retained spatial cues. This supports a limited conclusion: the pad can continue estimating aggregate load during more than one contact. It does not mean the pneumatic channel alone separates the force applied at each individual point.

## What this does not prove yet

This is a preprint, not an independently replicated product benchmark. The paper identifies lower sensitivity near overlap regions between pads; because the current fusion relies heavily on the pneumatic estimate, errors there can bias reconstruction. The humanoid demonstration shows sensing and logging, but it does not evaluate a closed-loop safety controller, long-duration abrasion, cleaning, field repair, temperature drift, or production lifetime.

The 100 Hz value describes the reported EIT reconstruction pipeline. It should not be read as a complete end-to-end reflex latency, which would also include acquisition, transport, filtering, decision logic, and robot actuation.

## Where this fits in Physical AI

Physical AI needs contact data that can survive large surfaces, curved geometry, wiring limits, and real-time control. This paper is useful because it treats robot skin as a sensor-fusion system instead of a single material sample. The next evaluation step is to connect the force map to measurable robot behavior: contact-aware motion, collision response, stable physical interaction, or recovery after unexpected touch.

For comparison, use the [humanoid robot skin guide](/humanoid-robot-skin), the [flexible tactile sensor array guide](/guides/flexible-tactile-sensor-array), and the normalized [RoboSkin Tactile Research Index](/research-index).

## Practical questions

- Does EIT measure force directly? Not by itself. It reconstructs conductivity changes, and the mapping to physical force requires calibration or a learned model.
- Why add air pressure? The pneumatic pad provides a stable net-force cue that can correct location-dependent EIT magnitude errors.
- Can one pneumatic pad locate two contacts? No. Spatial separation comes from the EIT reconstruction; the pad mainly estimates their aggregate load.
- Is the skin ready for commercial humanoids? The preprint demonstrates a promising prototype, not production durability or a certified safety function.

## Source boundary

This article summarizes an arXiv preprint and adds RoboSkin.ai analysis for robot skin, tactile sensing, humanoid robotics, and Physical AI readers. All measured values belong to the authors' reported setup. The cover image is an editorial illustration, not a paper figure. RoboSkin.ai is not affiliated with the authors.

## Source

- [arXiv: EIT-Pneumatic Hybrid Robotic Skin for Practical and Accurate Force Map Reconstruction](https://arxiv.org/abs/2605.28468)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-08-16',
    updated: '2026-08-16',
    readTime: '6 min read',
    category: 'Robot skin research',
    image: '/generated/brand/roboskin-tactile-material-study-v2.webp',
    sourceTitle: 'EIT-Pneumatic Hybrid Robotic Skin for Practical and Accurate Force Map Reconstruction',
    sourceUrl: 'https://arxiv.org/abs/2605.28468',
    sources: [
      {
        title: 'arXiv: EIT-Pneumatic Hybrid Robotic Skin for Practical and Accurate Force Map Reconstruction',
        url: 'https://arxiv.org/abs/2605.28468',
      },
    ],
    technicalFocus: ['hybrid robot skin', 'electrical impedance tomography', 'pneumatic tactile sensing', 'humanoid robot skin'],
  },
  {
    id: 'self-powered-textile-artificial-skin-three-channel-robot-control-2026',
    title: 'Self-powered textile artificial skin uses three channels for touch and robot control',
    seoTitle: 'Three-Channel Textile Artificial Skin Controls a Robot Arm',
    seoDescription:
      'A Nano Energy paper reports a textile artificial skin that locates touch, measures pressure, and controls a robot arm with three signal channels.',
    excerpt:
      'A Nano Energy paper reports a textile artificial skin that locates touch, measures pressure, and controls a robot arm with a three-channel architecture.',
    content: `# Self-powered textile artificial skin uses three channels for touch and robot control

**News brief - July 2026**

A paper available online in Nano Energy on July 22 reports a textile-based artificial skin designed to reduce two practical burdens in wearable tactile interfaces: the number of signal channels and dependence on an external power source for touch localization. The research team combines triboelectric and resistive sensing in a fabric structure, then demonstrates the interface in robot-arm control and marine-debris classification.

## What the researchers reported

The textile artificial skin uses an S-shaped, series-connected triboelectric array above a resistive sensing layer. When a user touches the textile, voltage ratios measured at two terminal resistors identify the touch position. A third resistive channel measures contact pressure.

This division gives the system three signal channels for both spatial addressing and pressure sensing. The triboelectric layer generates its localization signal from mechanical interaction, while the carbon-nanotube and silicone resistive layer provides the pressure measurement.

The paper also describes a nylon textile structure intended to remain flexible and resist environmental interference. Deep-learning analysis was used to distinguish six types of debris in the reported marine-collection scenario, with a 94.5% success rate in that experiment.

## From touch input to robot-arm commands

The artificial skin was worn as a human-robot interface rather than installed as full-body robot skin. Touch position mapped to three-axis motion and rotational commands for a robot arm. Pressure magnitude controlled how long a command was executed.

That distinction matters. The work demonstrates a soft, wearable controller that converts touch and pressure into robot actions. It does not demonstrate a robot whose entire surface is covered by the textile or a robot that autonomously interprets distributed contact over its body.

## Why this matters for artificial skin

Large tactile arrays often face a wiring problem: increasing the number of sensing locations can increase channel count, connectors, acquisition hardware, and failure points. The three-channel architecture is therefore interesting as a readout strategy, not only as a new material.

The research also connects sensing to an application loop. Position and pressure are not presented as isolated bench signals; they become commands for a robotic system. For wearable teleoperation, field robotics, and other human-robot interfaces, that system-level connection may be as important as peak sensor sensitivity.

## What this does not prove yet

The paper was listed as an in-press journal pre-proof when this brief was prepared. The 94.5% result belongs to the authors' six-class debris experiment and should not be read as open-world recognition performance.

The term self-powered applies to the triboelectric sensing and addressing mechanism. It does not mean the robot arm, computing hardware, communications, or complete control system operates without external energy. The public report also does not establish long-term saltwater durability, field maintenance intervals, calibration stability, or performance after repeated damage.

## Where this fits next

The [flexible tactile sensor array guide](/guides/flexible-tactile-sensor-array) explains the trade-offs among taxel count, wiring, scan rate, calibration, and coverage. The [electronic skin overview](/e-skin) places textile and triboelectric approaches within the broader e-skin category. For deployment questions, compare the interface with the [robot hand tactile sensor guide](/applications/robot-hand-tactile-sensor) and the normalized records in the [RoboSkin Tactile Research Index](/research-index).

## Practical questions

- Why are three channels notable? They carry touch-location and pressure information without assigning one independent readout channel to every sensing position.
- Is the whole interface self-powered? No. The paper's self-powered claim concerns the triboelectric sensing mechanism, not every part of the robot-control stack.
- Is this full-body robot skin? No. The reported demonstration is a wearable textile human-robot interface.
- What should be tested next? Long-duration environmental exposure, calibration drift, latency, repeatability, scaling to more locations, and performance outside the six reported debris classes.

## Source boundary

This brief summarizes the publisher's abstract, highlights, and article metadata and adds RoboSkin.ai analysis. The reported architecture and results belong to the cited study. The cover image is an editorial illustration, not a photograph or figure from the experiment. RoboSkin.ai is not affiliated with the authors or publisher.

## Source

- [Nano Energy: A Self-powered Minimal-Channel Addressable Textile-Based Artificial Skin for Wearable Human-Robot Interfaces](https://doi.org/10.1016/j.nanoen.2026.112233)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-07-27',
    updated: '2026-07-27',
    readTime: '5 min read',
    category: 'Electronic skin',
    image: '/generated/authority/news-textile-artificial-skin-2026.webp',
    sourceTitle: 'Nano Energy textile-based artificial skin paper',
    sourceUrl: 'https://doi.org/10.1016/j.nanoen.2026.112233',
    sources: [
      {
        title: 'Nano Energy: Self-powered minimal-channel textile artificial skin',
        url: 'https://doi.org/10.1016/j.nanoen.2026.112233',
      },
    ],
    technicalFocus: [
      'textile artificial skin',
      'self-powered tactile sensing',
      'minimal-channel addressing',
      'wearable human-robot interface',
    ],
  },
  {
    id: 'underwater-self-healing-electronic-skin-nus-2026',
    title: 'Underwater self-healing electronic skin combines touch, damage detection, and repair',
    seoTitle: 'Underwater Self-Healing Electronic Skin for Soft Robots',
    seoDescription: 'NUS researchers combine touch sensing, damage detection, and underwater self-repair in an electronic skin for soft robots and marine machines.',
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
    seoTitle: 'TouchWorld Tactile Foundation Model for Robot Manipulation',
    excerpt:
      'The TouchWorld preprint proposes a hierarchical tactile foundation model that combines contact prediction with fast feedback for dexterous, contact-rich robot tasks.',
    content: `# TouchWorld separates tactile prediction from fast contact correction in robot manipulation

**News brief - July 2026**

TouchWorld is a July 2026 preprint that treats touch as both a prediction target and a fast feedback signal for dexterous robot manipulation. Its central idea is that high-level task reasoning and low-level contact correction should not be forced into one control loop running at one speed.

## What the preprint proposes

The system uses a hierarchy with vision-language subtask planning, tactile world-model prediction, visuo-tactile action generation, and a tactile-conditioned refinement policy. The high-level layer predicts executable subtasks and tactile subgoals. The lower-level policy uses recent tactile and proprioceptive feedback to correct local errors such as slip, misalignment, unstable grasping, or force mismatch.

The predictive component is first pretrained on [EgoTouch](/datasets#dataset-egotouch), a human bimanual dataset with synchronized egocentric and wrist video, hand pose, and wearable pressure maps, before robot-specific fine-tuning. The [TouchWorld model record](/robot-foundation-models#model-touchworld) connects that training claim to its exact primary-source boundary; it does not imply that every module is trained on EgoTouch or that the hosted dataset upload is complete.

The paper also defines a [six-task real-robot evaluation protocol](/benchmarks#benchmark-touchworld-real-robot) with clean and human-perturbation settings. It reports 200 teleoperated training trajectories and 100 evaluation rollouts per task. This is an author-defined, single-platform protocol rather than an independent cross-model leaderboard.

Across six long-horizon, contact-rich manipulation tasks, the authors report 65.0% average success in the clean setting and 53.7% under human perturbations. Those results were 15.7 and 18.5 percentage points above the strongest baseline reported in the paper.

## Why this matters for tactile AI

Vision and language can describe a task and guide a hand toward an object, but they do not directly reveal hidden contact states. Once a plug meets a socket, a cup begins to slip, or a soft object deforms, the controller needs evidence from the physical interaction itself.

TouchWorld is useful as a systems idea because it assigns different jobs to different layers. A slower planner handles semantics and task phases, while a faster tactile pathway handles local contact errors. This is closer to how a practical robot stack may need to divide reasoning and response.

## What this does not prove yet

TouchWorld is a preprint, not a peer-reviewed final publication. Its reported success rates are specific to the paper's task suite, sensors, training data, baselines, and evaluation protocol. They should not be treated as a general benchmark for all robot hands or tactile foundation models.

## Where this fits next

The [robot world models pillar](/robot-world-models) explains the broader prediction-and-control role. The [visuo-tactile world model guide](/guides/visuo-tactile-world-models-robot-manipulation) compares TouchWorld with Dream-Tac, ViTacWorld, FeelWorld, and VT-WM, while the [robot hand tactile sensor route](/applications/robot-hand-tactile-sensor) explains the sensing coverage and integration questions behind contact-rich manipulation.

## Practical questions

- Why split planning and tactile correction? Semantic reasoning and contact response operate at different time scales and use different evidence.
- Does a tactile foundation model replace robot control? No. It still depends on sensors, calibration, proprioception, action interfaces, and task-specific validation.
- What should readers watch next? Independent reproduction, cross-sensor transfer, unseen-object performance, latency, and robustness outside the six reported tasks.

## Source boundary

This brief summarizes an arXiv preprint and adds RoboSkin.ai analysis. The results have not been independently validated by RoboSkin.ai and should be interpreted within the authors' reported setup.

## Source

- [arXiv: TouchWorld - A Predictive and Reactive Tactile Foundation Model for Dexterous Manipulation](https://arxiv.org/abs/2607.07287)
- [TouchWorld official project page](https://phanes-lab.github.io/TouchWorld-website/)
- [arXiv: TouchAnything and the EgoTouch dataset](https://arxiv.org/abs/2605.13083)
- [TouchAnything official repository and EgoTouch release notes](https://github.com/Jianyi2004/TouchAnything)
- [EgoTouch official Hugging Face repository](https://huggingface.co/datasets/zhouzhoujy/EgoTouch)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-07-20',
    updated: '2026-08-22',
    readTime: '5 min read',
    category: 'Tactile AI',
    image: '/generated/research-ai-tactile-learning-2025.svg',
    sourceTitle: 'TouchWorld tactile foundation model preprint',
    sourceUrl: 'https://arxiv.org/abs/2607.07287',
    sources: [
      {
        title: 'arXiv: TouchWorld tactile foundation model preprint',
        url: 'https://arxiv.org/abs/2607.07287',
      },
      {
        title: 'TouchWorld official project page',
        url: 'https://phanes-lab.github.io/TouchWorld-website/',
      },
      {
        title: 'arXiv: TouchAnything and the EgoTouch dataset',
        url: 'https://arxiv.org/abs/2605.13083',
      },
      {
        title: 'TouchAnything official repository',
        url: 'https://github.com/Jianyi2004/TouchAnything',
      },
      {
        title: 'EgoTouch official Hugging Face repository',
        url: 'https://huggingface.co/datasets/zhouzhoujy/EgoTouch',
      },
    ],
    technicalFocus: ['TouchWorld', 'tactile foundation model', 'EgoTouch', 'tactile world model', 'dexterous manipulation', 'contact-rich robotics'],
  },
  {
    id: 'color-changing-mechanochromic-tactile-sensor-2026',
    title: 'Color-changing tactile sensor turns robot contact into real-time pressure maps',
    seoTitle: 'Color-Changing Tactile Sensor Maps Robot Contact Pressure',
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
    seoTitle: 'Single-Pixel Tactile Skin Reduces Robot Sensor Wiring',
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
    seoTitle: 'Service Robot Sales Near 200,000: Why Tactile AI Matters',
    seoDescription: 'IFR reports nearly 200,000 professional service robot sales in 2024. Amazon Vulcan shows why tactile control matters in logistics.',
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
    seoDescription: 'A Cambridge-UCL study shows why large-area e-skin depends on sensing, wiring, calibration, damage tolerance, and control integration.',
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
    seoTitle: 'Full-Hand Tactile Sensing for Vision-Free Robot Control',
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
    seoTitle: 'Global Robot Installations Pass 542,000: Why Touch Matters',
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
