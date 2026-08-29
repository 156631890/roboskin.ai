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
