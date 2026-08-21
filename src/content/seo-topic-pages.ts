export type SeoTopicPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  intent: string;
  published?: string;
  updated: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
  schemaType: 'WebPage' | 'TechArticle' | 'DefinedTerm';
  visualKey: 'technology' | 'applications' | 'resources' | 'answers';
  keywords: string[];
  quickAnswer: string[];
  sections: {
    heading: string;
    body: string[];
    bullets?: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedLinks: {
    label: string;
    href: string;
    description: string;
  }[];
  sources?: {
    label: string;
    href: string;
  }[];
  paperBriefIds?: string[];
};

export const seoTopicPages: SeoTopicPage[] = [
  {
    path: '/ai-robotics',
    title: 'AI and Robotics: Models, Learning & Physical Action',
    description:
      'AI provides perception, reasoning, prediction, and learned policies; robotics provides sensors, control, actuators, safety, and a physical body. Map the closed loop from instruction to action and touch feedback.',
    h1: 'How artificial intelligence works in robots',
    kicker: 'AI and robotics hub',
    intent: 'Answer-first guide to AI in robotics, robot AI, embodied AI, VLMs, VLA models, world models, robot policies, control, and tactile feedback.',
    updated: '2026-08-21',
    priority: 0.94,
    changeFrequency: 'weekly',
    schemaType: 'WebPage',
    visualKey: 'technology',
    keywords: [
      'AI and robotics',
      'AI in robotics',
      'artificial intelligence and robotics',
      'robot AI',
      'embodied AI',
      'Physical AI',
      'robot learning',
      'robot VLA',
      'robot world model',
      'robot policy',
      'tactile AI',
    ],
    quickAnswer: [
      'Artificial intelligence and robotics are related but different. AI supplies methods for perception, prediction, learning, reasoning, and action selection; robotics supplies sensors, embodiment, actuators, control, integration, and physical safety.',
      'They form a closed loop when a robot observes its environment, an AI model or engineered policy selects an action, controllers execute it through the robot body, and new sensor feedback reports what actually happened.',
      'Touch closes the contact-specific part of that loop. Robot skin and tactile sensors measure physical interaction, while tactile AI interprets those signals so a policy or controller can respond.',
    ],
    sections: [
      {
        heading: 'AI and robotics are not the same thing',
        body: [
          'AI is a family of computational methods. Robotics is the engineering of machines that sense and act in the physical world. An AI system can operate entirely in software, and a robot can execute fixed, model-based, or manually programmed behavior without a learned AI model.',
          'The useful overlap is an embodied system in which perception and decision methods are connected to a specific robot, action interface, controller, operating environment, and evaluation protocol. Calling a system an AI robot does not by itself identify any of those contracts.',
        ],
        table: {
          headers: ['Question', 'AI layer', 'Robotics layer', 'Evidence boundary'],
          rows: [
            ['What is observed?', 'Represents images, language, audio, robot state, or touch.', 'Sensors capture signals with hardware-specific rates, calibration, geometry, and failure modes.', 'A supported input modality does not prove that the robot uses it effectively.'],
            ['What should happen next?', 'A model, planner, or learned policy proposes a state, subgoal, or action.', 'The robot exposes an action space constrained by its body, tools, workspace, and task.', 'A plausible plan is not evidence of successful physical execution.'],
            ['How is motion produced?', 'The policy may output waypoints, poses, action chunks, or lower-level commands.', 'Controllers, actuators, estimation, and safety functions turn commands into motion.', 'A model output should not be described as torque-level control unless that interface is actually documented.'],
            ['How is success known?', 'Models may classify outcomes, estimate value, or update a policy.', 'Measurements, task criteria, interventions, force, damage, and timing establish the result.', 'Provider demos and author-reported trials remain bounded to their stated protocol.'],
          ],
        },
      },
      {
        heading: 'The closed loop from instruction to physical feedback',
        body: [
          'A robot AI system is best understood as a loop rather than a single model: goal or instruction → multimodal observation → representation and state estimation → reasoning or planning → policy action → robot control → physical motion and contact → new observation.',
          'Different systems combine or omit stages. Some policies map observations directly to actions; others use semantic subgoals, explicit planners, predictive models, or separate fast controllers. RoboSkin.ai records the implemented interfaces rather than treating one architecture as universal.',
        ],
        bullets: [
          'Goals can come from language, a task specification, a human operator, or a programmed state machine.',
          'Observations can include vision, depth, audio, proprioception, force, torque, and tactile sensing.',
          'Policies select actions; low-level controllers track commands and respond at the robot and actuator level.',
          'Physical outcomes must return as measured feedback if the system is to detect error, contact, slip, or success.',
        ],
      },
      {
        heading: 'VLM, embodied reasoning, VLA, world model, policy, and control',
        body: [
          'These labels describe different jobs and should not be collapsed into one capability claim. Google DeepMind, for example, publicly distinguishes an embodied-reasoning model from a vision-language-action model in its Gemini Robotics architecture; other research systems use different boundaries.',
        ],
        table: {
          headers: ['Component', 'Primary job', 'Typical output', 'What the label does not prove'],
          rows: [
            ['Vision-language model (VLM)', 'Connect visual observations with language and semantic knowledge.', 'Text, labels, answers, scene descriptions, or representations.', 'That its output is grounded in a robot action space or can control hardware.'],
            ['Embodied reasoning (ER)', 'Reason about spatial state, affordances, task steps, or plans for an embodied agent.', 'Plan, subgoal, pose, code, tool call, or structured instruction.', 'That the proposed result can be executed safely or robustly by a specific robot.'],
            ['Vision-language-action model (VLA)', 'Map observations and instructions into robot actions or action chunks.', 'Discrete or continuous commands in a documented action representation.', 'Cross-robot transfer, high-frequency contact response, or general physical intelligence.'],
            ['World model', 'Predict future observations, states, contact, rewards, or outcomes under candidate actions.', 'A rollout, latent future, video, tactile state, or predicted transition.', 'That prediction alone selects or executes a successful action.'],
            ['Robot policy', 'Choose an action from the current observation, state, history, or goal.', 'Joint, pose, gripper, torque, or higher-level command.', 'That the policy is learned; classical and hybrid policies are also possible.'],
            ['Robot control', 'Estimate and regulate motion, force, balance, and actuator behavior.', 'Tracked trajectories, forces, torques, motor commands, or protective responses.', 'That a high-level AI model replaces control, integration, or safety engineering.'],
          ],
        },
      },
      {
        heading: 'Where robot learning and data fit',
        body: [
          'Robot learning uses data or interaction to improve a representation, predictor, reward model, policy, or controller. Demonstrations can come from teleoperation, scripted collection, existing datasets, simulation, autonomous rollouts, or corrections after failure.',
          'A larger dataset does not automatically imply broader capability. Evidence should identify embodiments, sensors, action spaces, tasks, environments, human interventions, splits, access terms, and whether evaluation occurred on a physical robot.',
        ],
        bullets: [
          'Use the robotics dataset route for broad demonstration, observation, action, access, and license fields.',
          'Use the robot teleoperation route to trace how human control becomes synchronized training data.',
          'Use the robot learning route for imitation, reinforcement, correction, transfer, and deployment evidence.',
          'Use the benchmark routes to keep dataset scale separate from evaluated robot performance.',
        ],
      },
      {
        heading: 'How touch closes the physical contact loop',
        body: [
          'Vision can describe a scene and guide an approach, but cameras may not directly measure local pressure, shear, slip, deformation, or hidden contact after a hand or tool reaches an object. Tactile sensing supplies that local measurement channel.',
          'Robot skin is the physical sensing surface. Tactile AI is the representation, inference, and action workflow that uses touch data. Depending on the system, touch can enter a multimodal policy, a predictive world model, a task evaluator, or a faster reactive correction loop. None of those roles should be inferred unless the source documents it.',
        ],
        table: {
          headers: ['Touch layer', 'Role in robot AI', 'Minimum evidence'],
          rows: [
            ['Robot skin or tactile sensor', 'Measures contact at a fingertip, palm, gripper, foot, arm, or body surface.', 'Sensor, modality, geometry, calibration, sampling, mounting, and repeatability.'],
            ['Tactile representation', 'Converts raw taxels, force, vibration, pressure, or tactile images into model-ready features.', 'Training data, held-out protocol, sensor dependence, and task-relevant information.'],
            ['Tactile policy or world model', 'Uses touch to select an action or predict contact evolution.', 'Action interface, comparison baseline, real-robot protocol, latency, and failure cases.'],
            ['Contact-aware control', 'Changes grip, motion, force, recovery, or stop behavior from measured contact.', 'End-to-end response time and a measured behavioral difference under the same conditions.'],
          ],
        },
      },
      {
        heading: 'Physical AI and embodied AI in this map',
        body: [
          'Physical AI is used here as a broad industry term for AI systems that perceive, reason, and act through physical machines. Embodied AI is a broader research framing that can include physical robots as well as simulated or virtual embodied agents. Robotics remains the engineering discipline that supplies the machine and its physical interfaces.',
          'These terms overlap, but there is no single model architecture implied by either label. The Physical AI page covers the broad system boundary; Physical AI and touch is the child route for tactile sensing and contact feedback.',
        ],
      },
      {
        heading: 'How to evaluate an AI robot claim',
        body: [
          'Start with the robot and task rather than the model name. Record what the system observed, what the model produced, what controller executed, what human help remained, and how outcomes were measured. Then test the scope of any generalization claim.',
        ],
        bullets: [
          'Identify the robot embodiment, end effector, sensors, compute path, and action representation.',
          'Separate training environments and objects from held-out evaluation conditions.',
          'Report trials, resets, interventions, failures, recovery, task time, force, and damage where relevant.',
          'Distinguish a project demonstration, provider-reported evaluation, preprint result, peer-reviewed result, and independent reproduction.',
          'Do not treat a VLM benchmark, simulated rollout, or generated video as real-robot task success.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between AI and robotics?',
        answer:
          'AI provides computational methods for perception, learning, prediction, reasoning, and action selection. Robotics engineers physical machines with sensors, actuators, controllers, integration, and safety. They overlap when AI methods are connected to a robot observation-and-action loop.',
      },
      {
        question: 'Do all robots use artificial intelligence?',
        answer:
          'No. Robots can use fixed logic, state machines, classical planning, feedback control, teleoperation, learned models, or hybrids. The presence of sensors and automation does not by itself prove that a robot uses AI.',
      },
      {
        question: 'Is a VLM the same as a robot VLA model?',
        answer:
          'No. A VLM connects vision and language, while a VLA model adds an action output tied to a documented robot action representation. A VLM can support reasoning or planning without directly controlling a robot.',
      },
      {
        question: 'Why does robot AI need tactile feedback?',
        answer:
          'Touch can measure local physical interaction that vision and language do not directly observe, including contact, pressure, shear, slip, and deformation. Its value depends on whether the signal is calibrated, synchronized, and used by evaluation, a model, a policy, or a controller.',
      },
      {
        question: 'Does a world model control a robot?',
        answer:
          'Not necessarily. A world model predicts possible future states or observations. A planner or policy may use that prediction to choose an action, while a controller executes commands on the robot.',
      },
    ],
    relatedLinks: [
      { label: 'Physical AI', href: '/physical-ai', description: 'The broad physical perception, reasoning, action, and feedback system.' },
      { label: 'Robot learning', href: '/robot-learning', description: 'How demonstrations, interaction, correction, and evaluation shape robot behavior.' },
      { label: 'Robot VLA models', href: '/robot-vla-models', description: 'Separate vision-language, reasoning, action policy, and embodiment evidence.' },
      { label: 'Robot foundation models', href: '/robot-foundation-models', description: 'Compare model roles, training data, embodiments, access, tactile input, and evidence boundaries.' },
      { label: 'Robot world models', href: '/robot-world-models', description: 'How predictive models differ from policies and controllers.' },
      { label: 'Robotics datasets', href: '/robotics-datasets', description: 'Compare broad observation, action, embodiment, task, access, and license fields.' },
      { label: 'Robot teleoperation', href: '/robot-teleoperation', description: 'Trace human demonstrations into robot-learning data.' },
      { label: 'Robot manipulation', href: '/robot-manipulation', description: 'Map grasping, insertion, tool use, policies, and contact-rich evaluation.' },
      { label: 'Humanoid robots', href: '/humanoid-robots', description: 'Connect embodiment, whole-body control, hands, safety, and sensing.' },
      { label: 'Robot hands', href: '/robot-hands', description: 'Compare end effectors, actuation, sensing, and dexterous task evidence.' },
      { label: 'Robot safety', href: '/robot-safety', description: 'Keep learned behavior separate from system integration and safety validation.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How touch signals become representations, predictions, and robot responses.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'The distributed physical surface for measuring contact.' },
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'The tactile-sensing child route for Physical AI.' },
      { label: 'Tactile manipulation', href: '/tactile-manipulation', description: 'How touch contributes to contact-rich robot tasks.' },
      { label: 'Visuo-tactile systems', href: '/visuo-tactile', description: 'How vision and touch complement one another before and after contact.' },
    ],
    sources: [
      { label: 'Google DeepMind Gemini Robotics architecture', href: 'https://deepmind.google/blog/gemini-robotics-brings-ai-into-the-physical-world/' },
      { label: 'Google DeepMind RT-2 paper', href: 'https://arxiv.org/abs/2307.15818' },
      { label: 'Open X-Embodiment paper', href: 'https://arxiv.org/abs/2310.08864' },
      { label: 'NVIDIA GR00T N1 paper', href: 'https://arxiv.org/abs/2503.14734' },
      { label: 'Hugging Face LeRobot v0.6 release', href: 'https://huggingface.co/blog/lerobot-release-v060' },
      { label: 'T-Rex tactile-reactive dexterous manipulation paper', href: 'https://arxiv.org/abs/2606.17055' },
    ],
  },
  {
    path: '/robot-foundation-models',
    title: 'Robot Foundation Models: Data, Transfer & Evaluation',
    description:
      'Compare robot foundation models, VLMs, VLA policies, embodied-reasoning systems, world models, and tactile models by data, embodiment, access, and real-robot evidence.',
    h1: 'Robot foundation models and the robot AI model stack',
    kicker: 'Source-reviewed model directory',
    intent: 'Technical guide and structured directory for robot foundation models, generalist robot models, robot AI models, multi-embodiment transfer, and evaluation evidence.',
    published: '2026-08-21',
    updated: '2026-08-21',
    priority: 0.9,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: [
      'robot foundation models',
      'foundation model robotics',
      'robot AI models',
      'generalist robot model',
      'multi-embodiment robot model',
      'robot VLA model',
      'embodied AI model',
      'robot world model',
      'tactile foundation model',
    ],
    quickAnswer: [
      'A robot foundation model is a broadly pretrained model intended to be adapted or reused across multiple robot tasks, environments, or embodiments. The label is an architectural and training claim, not proof of general-purpose robot capability.',
      'Robot AI systems contain different model roles. A VLM or embodied-reasoning model may interpret and plan, a VLA or policy may produce actions, and a world model may predict consequences. These roles can be combined but should not be treated as synonyms.',
      'Compare models by their inputs, action interface, training mixture, robot embodiments, access terms, real-robot evaluation, and evidence limitations. RoboSkin.ai also records whether tactile input is documented, absent, or unclear.',
    ],
    sections: [
      {
        heading: 'What qualifies as a robot foundation model?',
        body: [
          'The term usually describes a model pretrained on sufficiently broad data to support adaptation across more than one narrowly fixed task. Breadth can come from multiple tasks, robot bodies, environments, sensor streams, language supervision, web data, simulation, or combinations of those sources.',
          'There is no single universally accepted threshold for the label. A provider may call a model foundational while releasing limited training details or evaluation scope. RoboSkin.ai therefore records the claimed role separately from the evidence that readers can inspect.',
        ],
        bullets: [
          'Identify the base architecture and whether the released artifact is a VLM, VLA, policy, world model, representation, or orchestration model.',
          'Record how many embodiments and action spaces appear in training and evaluation without assuming that training diversity guarantees transfer.',
          'Separate an open paper, open code, downloadable weights, reusable data, API access, and private preview; they are different availability states.',
          'Keep provider-reported evaluations and independent reproductions distinct.',
        ],
      },
      {
        heading: 'Model roles in the robot AI stack',
        body: [
          'Robot foundation-model discussions often collapse several components into one list. A useful comparison starts by identifying what each artifact consumes and what it actually produces.',
        ],
        table: {
          headers: ['Model role', 'Typical inputs', 'Typical output', 'Key evaluation question'],
          rows: [
            ['Vision-language model', 'Images, video, text, and sometimes robot state.', 'Text, semantic representation, answer, or high-level decision.', 'Does the result remain grounded in the robot, scene, and task rather than only a language benchmark?'],
            ['Embodied-reasoning model', 'Multimodal observations, instructions, history, and tools.', 'Plan, subgoal, state estimate, code, or tool call.', 'Can a documented downstream policy and controller execute the proposal and detect failure?'],
            ['Vision-language-action model', 'Images or video, language, robot state, and action history.', 'Discrete or continuous robot actions or action chunks.', 'Which action space, robot bodies, task splits, interventions, and real-robot trials were tested?'],
            ['Robot policy', 'Observation, state, history, and goal.', 'Action for the robot or controller.', 'Is it generalist, task-specific, learned, classical, or a hybrid, and what transfer is demonstrated?'],
            ['World model', 'State or observation plus a candidate action or context.', 'Predicted future state, observation, reward, contact, or trajectory.', 'Does using the prediction improve planning or policy performance on a physical robot?'],
            ['Tactile model', 'Taxels, force, vibration, tactile images, or synchronized visual-touch data.', 'Contact representation, property estimate, prediction, or corrective action.', 'Does it transfer across sensors, tasks, objects, and robot bodies under a controlled protocol?'],
          ],
        },
      },
      {
        heading: 'Data, embodiment, and transfer are separate claims',
        body: [
          'Robot models learn from heterogeneous mixtures that can include web vision-language data, human video, teleoperated demonstrations, autonomous rollouts, simulation, synthetic trajectories, robot state, and tactile data. Each source contributes different information and different biases.',
          'Multi-embodiment training means that more than one robot body appears in the data. It does not automatically prove zero-shot control on an unseen robot. A transfer claim should state what was frozen, fine-tuned, adapted, remapped, or collected on the target platform.',
        ],
        bullets: [
          'Training data: source, scale, licensing, curation, task coverage, and robot distribution.',
          'Observation contract: cameras, language, proprioception, touch, history length, and calibration.',
          'Action contract: joints, end-effector poses, action chunks, torques, gripper state, or tool calls.',
          'Transfer contract: target robot, adaptation examples, fine-tuning method, and held-out conditions.',
          'Evaluation contract: trials, resets, intervention policy, success criteria, failures, timing, and damage.',
        ],
      },
      {
        heading: 'How to read the RoboSkin.ai model directory',
        body: [
          'The directory below is a source-reviewed comparison, not a leaderboard. It intentionally includes different model roles so readers can see where a model sits in the AI-to-robot loop, but it does not rank unlike tasks or reuse provider scores as a universal benchmark.',
          'Unknown facts remain unknown. When weights, licenses, training mixtures, sensor inputs, or independent tests cannot be verified, the record states that boundary instead of inferring it from a product announcement or demonstration video.',
        ],
      },
      {
        heading: 'Where touch fits in robot foundation models',
        body: [
          'Most broadly discussed robot models are organized around vision, language, and robot state. Touch can enter as an additional observation, a learned tactile representation, a predicted contact state, a reward or success signal, or a faster corrective policy after physical contact begins.',
          'A model should only be marked as tactile when its documented input or architecture actually uses touch, force, pressure, contact, or a tactile representation. Mounting a tactile sensor on the same robot is not enough if the model does not consume that signal.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is a robot foundation model?',
        answer:
          'It is a broadly pretrained model intended for reuse or adaptation across multiple robot tasks, environments, or embodiments. The term does not by itself prove generalization, safe deployment, or access to weights and training data.',
      },
      {
        question: 'Are all robot foundation models VLA models?',
        answer:
          'No. A robot foundation-model ecosystem can include VLMs, embodied-reasoning models, VLA policies, world models, reward models, and tactile representations. A VLA specifically produces robot actions from multimodal context.',
      },
      {
        question: 'What makes a robot model generalist?',
        answer:
          'Generalist is a claim about breadth across tasks, objects, environments, instructions, or robot embodiments. It should be evaluated against explicit held-out conditions rather than inferred from model size or dataset scale.',
      },
      {
        question: 'Does open source mean a robot model is fully reproducible?',
        answer:
          'No. Code, weights, datasets, hardware, licenses, calibration, action mappings, and evaluation protocols can have different access states. Reproduction requires enough of the complete system, not only a public repository.',
      },
      {
        question: 'How does tactile input change a robot AI model?',
        answer:
          'Tactile input can add local contact evidence such as pressure, force, slip, vibration, or deformation. It may support representation learning, contact prediction, policy correction, or evaluation, but each use must be verified from the model interface and experiment.',
      },
    ],
    relatedLinks: [
      { label: 'AI and robotics', href: '/ai-robotics', description: 'Place foundation models inside the full perception, reasoning, policy, control, and feedback loop.' },
      { label: 'Robot VLA models', href: '/robot-vla-models', description: 'Focus specifically on vision-language-action interfaces and evaluation.' },
      { label: 'Robot world models', href: '/robot-world-models', description: 'Separate future prediction from action selection and control.' },
      { label: 'Robot learning', href: '/robot-learning', description: 'Trace demonstrations, reinforcement, correction, transfer, and deployment.' },
      { label: 'Robotics datasets', href: '/robotics-datasets', description: 'Compare broad robot observations, actions, embodiments, access, and license evidence.' },
      { label: 'Tactile foundation models', href: '/tactile-foundation-models', description: 'Review touch representations, world models, policies, and transfer evidence.' },
      { label: 'Physical AI', href: '/physical-ai', description: 'Connect models to embodiment, control, safety, and physical feedback.' },
    ],
    sources: [
      { label: 'Open X-Embodiment and RT-X paper', href: 'https://arxiv.org/abs/2310.08864' },
      { label: 'OpenVLA paper', href: 'https://arxiv.org/abs/2406.09246' },
      { label: 'Octo paper', href: 'https://arxiv.org/abs/2405.12213' },
      { label: 'NVIDIA Isaac GR00T N1 paper', href: 'https://arxiv.org/abs/2503.14734' },
      { label: 'Sparsh tactile representation paper', href: 'https://arxiv.org/abs/2410.24090' },
    ],
  },
  {
    path: '/robot-skin',
    title: 'Robot Skin: Technologies, Sensors & Research',
    description:
      'Robot skin is a tactile sensing surface for robots. Learn how robot skin relates to tactile AI, e-skin, humanoid hands, grippers, and contact-aware robotics.',
    h1: 'What is robot skin?',
    kicker: 'Core concept',
    intent: 'Definition and category overview for readers searching robot skin, robotic skin, or what is robot skin.',
    updated: '2026-08-18',
    priority: 0.88,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'technology',
    keywords: ['robot skin', 'robotic skin', 'what is robot skin', 'robot skin technology', 'tactile sensing surface'],
    quickAnswer: [
      'Robot skin is a tactile sensing surface that helps a robot detect contact, pressure, shear, slip, and interaction events across hands, grippers, arms, or curved body surfaces.',
      'A useful robot skin system is not only a soft cover. It includes sensor materials, signal conditioning, data handling, robot middleware, and control logic that can use touch information.',
      'The term overlaps with e-skin and tactile sensors, but robot skin is usually discussed in the context of robots that need distributed contact awareness.',
    ],
    sections: [
      {
        heading: 'What robot skin measures',
        body: [
          'Robot skin can measure contact location, pressure distribution, shear, slip, temperature, damage events, or other surface interactions depending on the sensor architecture. The exact signal matters more than the label.',
          'A fingertip skin for dexterous manipulation may need high-resolution force and slip information. A body surface for human-robot interaction may need broader coverage, lower resolution, and reliable contact-event detection.',
        ],
        bullets: [
          'Contact events across fingertips, palms, grippers, arms, and curved covers',
          'Pressure or force patterns rather than a single yes-or-no touch signal',
          'Slip, shear, vibration, or texture signals when manipulation requires them',
          'Timestamped data that can be logged, replayed, and used by controllers',
        ],
      },
      {
        heading: 'How robot skin fits the tactile AI stack',
        body: [
          'Robot skin becomes more useful when it is part of a tactile AI stack. The surface gathers signals, electronics condition those signals, software organizes them into robot-ready data, and control systems use the result for grasping, safety, or evaluation.',
          'That stack is why thin marketing copy often misses the point. The material layer is important, but calibration, mounting, latency, durability, and software interfaces determine whether the skin can support real robot behavior.',
        ],
      },
      {
        heading: 'Robot skin sensor taxonomy',
        body: [
          'A practical robot skin taxonomy should classify a surface by modality, coverage, geometry, durability, and data interface before comparing sensitivity claims. Those dimensions tell readers whether a sensor belongs on a fingertip, palm, gripper pad, arm cover, soft robot, or full humanoid surface.',
          'The taxonomy also separates materials research from robot integration. A flexible e-skin sample, optical tactile pad, pressure matrix, or multimodal skin can all be relevant, but the useful category depends on how the signal survives mounting and reaches robot software.',
        ],
        bullets: [
          'Modality: pressure, shear, slip, strain, vibration, temperature, proximity, or multimodal contact',
          'Coverage: fingertip, full hand, gripper pad, arm surface, soft body, or large-area tactile skin',
          'Geometry and durability: flat sample, curved surface, jointed segment, replaceable layer, or wear-prone cover',
          'Data interface: analog readout, calibrated map, timestamped stream, middleware topic, or controller feature',
        ],
      },
      {
        heading: 'Where robot skin is used',
        body: [
          'Robot skin appears across humanoid robot hands, robotic grippers, e-skin research, flexible tactile sensors, prosthetics, and Physical AI. These areas overlap, but they raise different engineering questions.',
          'RoboSkin.ai separates definitions, applications, technologies, comparisons, and research so readers can move directly to the level of detail they need.',
        ],
      },
      {
        heading: 'Latest evidence: textile architecture changes the sensing tradeoff',
        body: [
          'An August 2026 preprint comparing one-, two-, and four-layer twisted-yarn capacitive sensors shows why robot skin must be specified as a system. Increasing yarn-layer overlap improved the reported pressure sensitivity and tensile behavior, but proximity range decreased from 60 mm for one layer to 40 mm for four layers.',
          'The result is not evidence for one universally superior geometry. It separates two task requirements: early approach detection before contact and stronger measurement after contact. The source is a small 4 × 4 research prototype, so whole-body scaling, abrasion, manufacturing yield, and field lifetime remain open questions.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is robot skin the same as e-skin?',
        answer:
          'Not exactly. E-skin means electronic skin, often a flexible sensor layer. Robot skin usually means e-skin or tactile sensing used on a robot surface with robot-specific constraints.',
      },
      {
        question: 'Does robot skin replace vision?',
        answer:
          'No. Vision helps a robot see a scene before contact. Robot skin helps detect what happens at the contact surface after the robot touches an object or person.',
      },
      {
        question: 'What makes robot skin difficult?',
        answer:
          'The hard parts are flexible mounting, durability, wiring, calibration, signal quality, data rate, and connecting touch data to robot control or evaluation workflows.',
      },
    ],
    relatedLinks: [
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How touch signals become useful robot behavior.' },
      { label: 'Physical AI', href: '/physical-ai', description: 'Place robot skin inside the broader physical perception, action, and feedback system.' },
      { label: 'E-skin', href: '/e-skin', description: 'How electronic skin overlaps with robot skin.' },
      { label: 'Robot skin vs tactile sensor', href: '/guides/robot-skin-vs-tactile-sensor', description: 'Clarify the system-versus-component distinction.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'How robot skin applies to dexterous hands and grasping.' },
      { label: 'Soft robotic skin', href: '/applications/soft-robotic-skin', description: 'Flexible robot skin for soft and curved surfaces.' },
      { label: 'Robot skin vs e-skin', href: '/guides/robot-skin-vs-e-skin', description: 'A comparison page for overlapping terms.' },
      { label: 'Robot skin papers', href: '/research/robot-skin-papers', description: 'Research routes and source-backed briefs.' },
      { label: 'EU FP7 ROBOSKIN project', href: '/research/eu-roboskin-project', description: 'Historical project identity, funding record, partners, and source boundaries.' },
      { label: 'Twisted-yarn textile robot skin', href: '/news/twisted-yarn-textile-capacitive-robot-skin-2026', description: 'August 2026 pressure, proximity, durability, and robot-integration evidence.' },
    ],
    sources: [
      { label: 'Nature Machine Intelligence full-hand tactile sensing paper', href: 'https://www.nature.com/articles/s42256-025-01053-3' },
      { label: 'University of Cambridge single-material robotic skin report', href: 'https://www.cam.ac.uk/stories/robotic-skin' },
      { label: 'Nature Communications GenForce article', href: 'https://www.nature.com/articles/s41467-026-68753-1' },
      { label: 'Twisted-yarn textile capacitive robotic-skin preprint', href: 'https://arxiv.org/abs/2608.14406' },
    ],
  },
  {
    path: '/tactile-ai',
    title: 'Tactile AI: Models, Datasets & Robotics Research',
    description:
      'Tactile AI turns robot touch signals into perception, learned representations, and action. Explore models, datasets, benchmarks, robot platforms, and Physical AI research.',
    h1: 'Tactile AI: touch data for Physical AI',
    kicker: 'Core concept',
    intent: 'Definition and system map for tactile AI, touch data, Physical AI tactile feedback, and robot control queries.',
    updated: '2026-08-18',
    priority: 0.95,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'resources',
    keywords: ['tactile AI', 'tactile intelligence', 'tactile perception', 'tactile learning', 'touch intelligence', 'tactile representation learning', 'multimodal tactile AI', 'robot tactile sensing'],
    quickAnswer: [
      'Tactile AI is the sensing, data, and control workflow that turns touch signals into useful robot behavior.',
      'It can support grasp confidence, slip response, contact-aware motion, safer interaction, and evaluation analytics for Physical AI systems.',
      'The phrase is broader than a single tactile sensor. It describes the full stack from contact surface to model, controller, benchmark, and feedback loop.',
    ],
    sections: [
      {
        heading: 'The tactile AI stack',
        body: [
          'A tactile AI stack starts with a contact surface and ends with an action or measurement loop. Between those endpoints, the system needs sensing materials, electronics, timestamps, calibration, feature extraction, model inputs, and robot middleware.',
          'If the robot cannot use the signal in a control or evaluation loop, the system is only collecting touch data. Tactile AI begins when that data changes what the robot can decide or verify.',
        ],
        bullets: [
          'Skin materials and sensor arrays collect local contact signals',
          'Signal processing filters, calibrates, timestamps, and compresses data',
          'Edge AI or analytics can classify slip, contact type, or grasp confidence',
          'Robot control uses tactile features for grasping, safety, and manipulation',
        ],
      },
      {
        heading: 'Why tactile AI matters for humanoids',
        body: [
          'Humanoid robots and dexterous hands operate in contact-rich settings. Vision can guide the robot toward an object, but a hand often blocks the camera once grasping begins.',
          'Touch data can reveal whether an object is seated correctly, sliding, deforming, or being squeezed too hard. That information matters for household tasks, warehouse handling, prosthetics, assistive devices, and research platforms.',
          'Touch is not limited to the hand. Plantar pressure arrays can expose the support realized beneath a humanoid foot after touchdown, giving a locomotion policy spatial evidence about partial, asymmetric, compliant, or shifting contact.',
        ],
      },
      {
        heading: 'What to validate before claiming tactile AI',
        body: [
          'Tactile AI claims should be tied to measured tasks. A demo that classifies contact on a benchtop is different from a robot hand that adjusts grip during motion.',
          'Useful validation includes sensor drift, response time, synchronization with joint state, robustness after mounting, and whether the tactile signal improves a real robot behavior.',
        ],
      },
      {
        heading: 'Tactile sensing and tactile AI are different layers',
        body: [
          'Tactile sensing is the measurement layer. Tactile AI is the larger perception-and-action system that turns those measurements into a representation, prediction, decision, or controller input. Keeping the boundary clear prevents a sensitive sensor demo from being described as an intelligent robot system without task evidence.',
        ],
        table: {
          headers: ['Layer', 'Primary job', 'Typical output', 'Evidence question'],
          rows: [
            ['Robot skin or tactile sensor', 'Measure physical contact at a surface.', 'Pressure map, force vector, slip event, vibration, temperature, or tactile image.', 'What is directly measured, at what rate, geometry, calibration, and repeatability?'],
            ['Signal and representation', 'Condition, synchronize, map, and encode raw touch.', 'Calibrated frames, events, tokens, contact graphs, or learned embeddings.', 'Does the representation preserve the contact information required by the task?'],
            ['Tactile model', 'Infer properties, predict contact futures, or select actions.', 'Class, latent state, future tactile observation, subgoal, or policy action.', 'Does it transfer across held-out objects, tasks, sensors, or robot embodiments?'],
            ['Robot control and evaluation', 'Use touch to change behavior or verify an outcome.', 'Grip correction, trajectory change, recovery event, task result, or replayable log.', 'What improves over vision-only or no-touch baselines on the real robot?'],
          ],
        },
      },
      {
        heading: 'How tactile data becomes robot action',
        body: [
          'The operational chain is contact → sensing → calibrated and timestamped data → tactile representation → model inference → controller or policy → robot action → measured outcome. Each transition has a contract: units, coordinate frame, sampling rate, latency, uncertainty, and failure behavior.',
          'A robust system keeps measured values separate from inferred values. For example, a pressure array may measure taxel response while a model estimates slip risk; the controller then decides whether to increase grip, regrasp, slow the motion, or stop. Logging all three levels makes the result auditable.',
        ],
        bullets: [
          'Synchronize touch with vision, proprioception, commands, and task phase',
          'Register fingertips, palms, arms, or skin patches to robot coordinates',
          'Expose uncertainty and latency, not only a clean contact visualization',
          'Measure whether the tactile pathway changes manipulation or safety behavior',
        ],
      },
      {
        heading: 'Relationship with VLA models, world models, and Physical AI',
        body: [
          'A vision-language-action model can provide semantic task context and propose actions, while tactile feedback supplies local physical evidence after contact. A tactile or visuo-tactile world model instead predicts how contact state may evolve under a candidate action. These roles can be combined, but a VLA label does not prove high-frequency touch control and a plausible world-model rollout does not prove safe execution.',
          'Physical AI is the broader embodied system: vision observes the scene, language represents goals and knowledge, proprioception describes the robot body, and touch grounds the interaction at the contact surface. Tactile AI is the part of that system responsible for interpreting and using touch.',
        ],
      },
      {
        heading: 'Current tactile AI research landscape',
        body: [
          'The systems below solve different parts of the stack and should not be collapsed into one leaderboard. The source status and hardware contract matter as much as a reported metric.',
        ],
        table: {
          headers: ['Research asset', 'Tactile AI role', 'Primary evidence', 'Boundary'],
          rows: [
            ['Sparsh-X', 'Self-supervised multisensory touch representation across image, audio, motion, and pressure.', 'Approximately 1M Digit 360 interactions plus physical-property and manipulation evaluations.', 'A 2025 preprint tied to its sensor, data, downstream tasks, and baselines.'],
            ['HT-Bench / HandTouch', 'Full-hand tactile representation benchmark and vector-quantized visuo-tactile encoder.', '10M RGB frames, 7.8M tactile frames, 226 tasks, and four evaluation tracks.', 'A 2026 preprint; it does not claim a universal benchmark across every sensor or embodiment.'],
            ['TouchWorld', 'Predictive tactile subgoals plus fast reactive tactile correction around higher-level planning.', 'Six source-reported dexterous manipulation tasks in clean and perturbed settings.', 'A 2026 preprint; reported success remains protocol-specific.'],
            ['Dream-Tac and FeelWorld', 'Action-conditioned prediction of future tactile or contact state for planning.', 'Source-reported contact-rich manipulation and planning experiments.', 'Prediction quality and task success are not universal hardware-transfer evidence.'],
            ['Tac4Loco', 'Spatiotemporal plantar pressure representation for post-contact humanoid locomotion feedback.', 'Unitree G1 simulation and physical comparisons across rigid, inclined, partial, compliant, and granular support.', 'A 2026 preprint on one robot and bilateral FSR insole layout; the gravel result is qualitative.'],
            ['EmArm', 'Whole-arm skin, proprioception, perception, and contact-aware control in one sensorimotor loop.', 'Peer-reviewed whole-arm localization, intent, manipulation, and replanning demonstrations.', 'One integrated platform does not establish identical performance on all humanoid surfaces.'],
          ],
        },
      },
      {
        heading: 'Research entities, datasets, benchmarks, and robot platforms',
        body: [
          'RoboSkin.ai tracks entities through their public research assets instead of presenting a vendor ranking. This keeps company, laboratory, sensor, and robot relationships traceable to primary sources.',
        ],
        table: {
          headers: ['Institution or group', 'Public asset', 'Sensor or robot context', 'Why it belongs in the map'],
          rows: [
            ['FAIR at Meta, University of Washington, and Carnegie Mellon University', 'Sparsh-X', 'Digit 360; insertion and in-hand rotation research', 'Multisensory representation learning and downstream manipulation.'],
            ['TU Dresden, ScaDS.AI, and LASR Lab', 'RCT dataset and benchmark', 'Three DIGIT sensors on a robot collection rig', 'Contact-sequence and held-out-material evaluation.'],
            ['ShanghaiTech University and InstAdapt', 'TactiDex', 'Whole-hand tactile glove; bimanual Franka Inspire deployment', 'Human-to-robot tactile skill transfer and benchmark structure.'],
            ['OpenDriveLab research consortium', 'FreeTacMan', 'Wearable collection hardware; Piper and Franka interfaces', 'Scalable visuo-tactile demonstrations and policy-learning data.'],
            ['HKUST (Guangzhou), University of Hong Kong, and Nanyang Technological University', 'Tac4Loco', 'Unitree G1 with 60-element FSR insole per foot', 'Post-contact support topology and temporal load transfer for humanoid locomotion.'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'Is tactile AI only machine learning?',
        answer:
          'No. Machine learning can be part of tactile AI, but the stack also includes sensor design, signal processing, calibration, middleware, control, logging, and validation.',
      },
      {
        question: 'How is tactile AI different from tactile sensing?',
        answer:
          'Tactile sensing measures touch. Tactile AI organizes and uses touch data so a robot can classify contact, adjust behavior, or evaluate a manipulation task.',
      },
      {
        question: 'What is the best first page to read after this?',
        answer:
          'Read the robot skin overview for the surface layer, then the robot hand tactile sensor and robot skin papers pages for application and research context.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'The surface layer that collects contact signals.' },
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'Why contact data matters after vision is occluded.' },
      { label: 'Tactile feedback for Physical AI', href: '/guides/tactile-feedback-for-physical-ai', description: 'How tactile feedback loops support Physical AI systems.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'A hand-level tactile AI application.' },
      { label: 'Humanoid robot skin', href: '/humanoid-robot-skin', description: 'Where tactile AI appears in humanoid hands and surfaces.' },
      { label: 'Technology context', href: '/technology', description: 'Existing stack explanation for tactile sensing layers.' },
      { label: 'Tactile datasets', href: '/datasets', description: 'Compare training resources, splits, signals, and transfer limits.' },
      { label: 'Tactile foundation models', href: '/tactile-foundation-models', description: 'Compare touch representations, prediction, and control roles.' },
      { label: 'Visuo-tactile world models', href: '/guides/visuo-tactile-world-models-robot-manipulation', description: 'Compare action-conditioned contact prediction and robot planning evidence.' },
      { label: 'Tac4Loco plantar tactile locomotion', href: '/research/tac4loco-plantar-tactile-humanoid-locomotion-2026', description: 'How bilateral foot-pressure maps become post-contact humanoid control evidence.' },
      { label: 'Research notes', href: '/research', description: 'Source-backed tactile AI and e-skin briefs.' },
    ],
    sources: [
      { label: 'Sparsh-X multisensory touch preprint', href: 'https://arxiv.org/html/2506.14754v1' },
      { label: 'HT-Bench full-hand tactile representation benchmark', href: 'https://arxiv.org/abs/2606.19161' },
      { label: 'TouchWorld predictive and reactive tactile foundation model', href: 'https://arxiv.org/abs/2607.07287' },
      { label: 'Dream-Tac tactile world-action model preprint', href: 'https://arxiv.org/html/2606.08737v1' },
      { label: 'MiTaS tactile imitation learning preprint', href: 'https://arxiv.org/html/2606.06281v1' },
      { label: 'Nature Sensors EmArm whole-arm tactile sensing article', href: 'https://www.nature.com/articles/s44460-026-00097-1' },
      { label: 'RCT official dataset and benchmark project', href: 'https://faerber-lab.github.io/RCT/' },
      { label: 'TactiDex official project page', href: 'https://tactidex.github.io/' },
      { label: 'FreeTacMan official project page', href: 'https://opendrivelab.com/FreeTacMan' },
      { label: 'Tac4Loco plantar pressure humanoid locomotion preprint', href: 'https://arxiv.org/abs/2608.15766' },
      { label: 'Tactile Robotics: An Outlook', href: 'https://arxiv.org/abs/2508.11261' },
    ],
    paperBriefIds: ['tac4loco-plantar-tactile-humanoid-locomotion-2026', 'ht-bench-full-hand-tactile-representations-2026', 'sparsh-x-multisensory-touch-representations-2025', 'dream-tac-tactile-world-action-model-2026', 'feelworld-visuo-tactile-world-model-2026'],
  },
  {
    path: '/e-skin',
    title: 'E-Skin in Robotics: Electronic Skin and Robot Skin',
    description:
      'E-skin, or electronic skin, is a flexible sensor surface. Learn how e-skin connects to robot skin, soft robotic skin, tactile sensors, and humanoid robots.',
    h1: 'E-skin in robotics',
    kicker: 'Core concept',
    intent: 'Definition page for e-skin, electronic skin, soft robotic skin, and flexible tactile sensor searches.',
    updated: '2026-07-21',
    priority: 0.84,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'answers',
    keywords: ['e-skin', 'electronic skin robotics', 'conformable electronic skin', 'flexible tactile sensor', 'robotic electronic skin'],
    quickAnswer: [
      'E-skin, or electronic skin, is a flexible or soft sensor layer designed to measure contact-related signals on non-flat surfaces.',
      'In robotics, e-skin can cover fingertips, palms, gripper pads, prosthetics, arms, or safety surfaces.',
      'E-skin becomes robot skin when the surface is designed, mounted, interpreted, and validated for robot use.',
    ],
    sections: [
      {
        heading: 'What e-skin is designed to do',
        body: [
          'E-skin usually focuses on flexible sensing. It may measure pressure, strain, temperature, proximity, damage, shear, or multiple signals at once. The value comes from conforming to surfaces where rigid sensors are difficult to mount.',
          'Robotics adds extra constraints. The layer must survive bending, abrasion, cable routing, cleaning, attachment, replacement, and repeated contact events while still producing usable signals.',
        ],
        bullets: [
          'Flexible or soft sensor materials for curved surfaces',
          'Electronic readout from pressure, strain, temperature, or multimodal inputs',
          'Potential use on robot hands, prosthetics, soft grippers, and body covers',
          'Calibration and packaging requirements that change by robot geometry',
        ],
      },
      {
        heading: 'E-skin versus robot skin',
        body: [
          'E-skin is a material and sensing category. Robot skin is the robot-facing application of that category. A lab e-skin sample may be impressive without being ready for a robot hand or arm.',
          'When evaluating e-skin for a robot, ask how it is mounted, how the signal is read, what data rate is available, how drift is handled, and what robot behavior uses the data.',
        ],
      },
      {
        heading: 'Where e-skin research is useful',
        body: [
          'E-skin research is useful for soft robotic skin, prosthetic feedback, large-area tactile arrays, humanoid robot hands, wearable sensing, and human-robot interaction surfaces.',
          'The best source-backed pages separate what a paper demonstrates from what readers should not infer. A research prototype is not automatically a deployable robot skin system.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What does e-skin stand for?',
        answer: 'E-skin stands for electronic skin, a flexible sensor layer that can measure contact-related or surface-related signals.',
      },
      {
        question: 'Is every e-skin a robot skin?',
        answer:
          'No. E-skin can be used in wearables, prosthetics, healthcare, or robotics. It becomes robot skin when it is integrated into a robot surface and connected to robot data or control needs.',
      },
      {
        question: 'What should e-skin pages cite?',
        answer:
          'They should cite the original paper or public source, then clearly separate reported claims from RoboSkin.ai analysis or application context.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'Robot-facing framing for tactile surfaces.' },
      { label: 'Soft robotic skin', href: '/applications/soft-robotic-skin', description: 'Where flexible e-skin becomes a robot surface.' },
      { label: 'Flexible tactile sensor array', href: '/guides/flexible-tactile-sensor-array', description: 'Array-level explanation for e-skin and robot skin.' },
      { label: 'Robot skin vs e-skin', href: '/guides/robot-skin-vs-e-skin', description: 'A direct comparison of the terms.' },
      { label: 'Single-material soft skin brief', href: '/research/single-material-soft-robotic-skin-2025', description: 'Source-backed soft robotic skin research note.' },
      { label: 'Glossary', href: '/glossary', description: 'Definitions for robot skin, tactile AI, and e-skin terms.' },
    ],
    sources: [
      { label: 'Nature Communications spiking touch e-skin article', href: 'https://www.nature.com/articles/s41467-026-68858-7' },
      { label: 'npj Flexible Electronics origami e-skin article', href: 'https://www.nature.com/articles/s41528-026-00563-3' },
      { label: 'University of Cambridge single-material robotic skin report', href: 'https://www.cam.ac.uk/stories/robotic-skin' },
    ],
  },
  {
    path: '/humanoid-robot-skin',
    title: 'Humanoid Robot Skin & Whole-Body Tactile Sensing',
    description:
      'Humanoid robot skin brings tactile sensing to hands, arms, and body surfaces. Map the whole-body tactile stack, safety boundaries, sensors, datasets, and research.',
    h1: 'Humanoid robot skin and whole-body tactile sensing',
    kicker: 'Application guide',
    intent: 'Application page for humanoid robot skin, robot hands, body contact sensing, and Physical AI touch queries.',
    updated: '2026-08-18',
    priority: 0.93,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['humanoid robot skin', 'humanoid tactile sensing', 'humanoid tactile sensors', 'whole-body tactile sensing', 'whole body tactile sensing', 'robot safety skin', 'distributed humanoid touch', 'dexterous robot hands', 'plantar tactile sensing', 'humanoid foot pressure sensor'],
    quickAnswer: [
      'Humanoid robot skin is tactile sensing applied to hands, palms, arms, feet, or other humanoid robot surfaces where contact awareness matters.',
      'The strongest use cases include dexterous manipulation, grasp stability, handovers, safety contact, plantar support, and research evaluation for Physical AI.',
      'A humanoid skin system must handle curved geometry, moving joints, cable routing, calibration, and synchronization with robot state.',
    ],
    sections: [
      {
        heading: 'Why humanoid hands need touch',
        body: [
          'A humanoid hand can move without understanding contact. Touch sensing helps it know whether an object is seated, sliding, deforming, or being pressed too hard.',
          'This matters because hands often occlude the object from cameras during manipulation. Tactile data gives the robot a local signal at the surface where the interaction is happening.',
        ],
        bullets: [
          'Detect early slip before a grasp fails',
          'Estimate contact location across fingertips, palm, and side surfaces',
          'Support safer force-limited interaction around people and objects',
          'Create tactile logs for evaluation, replay, and model improvement',
        ],
      },
      {
        heading: 'Humanoid surface constraints',
        body: [
          'Humanoid surfaces are difficult because they are curved, segmented, and mobile. A skin that works on a flat coupon can fail when wrapped around a finger joint or stretched over a palm.',
          'Teams should evaluate coverage, replacement strategy, signal drift, data rate, and how contact maps are registered to the robot model.',
        ],
      },
      {
        heading: 'The complete humanoid tactile stack',
        body: [
          'A humanoid tactile system is a chain, not a sheet of sensing material. Contact must survive mechanical coupling, sensor readout, signal conditioning, representation learning, and control before it can improve safety or manipulation.',
        ],
        table: {
          headers: ['Stage', 'System responsibility', 'Failure to test'],
          rows: [
            ['Physical contact', 'Define the object, body zone, direction, duration, and disturbance.', 'Bench presses may not represent sliding, impact, multi-contact, or human interaction.'],
            ['Robot skin', 'Conform to fingers, palms, arms, joints, or body panels while remaining serviceable.', 'Flat-sample performance may collapse after wrapping, stretching, wear, or replacement.'],
            ['Tactile sensor', 'Measure pressure, force, shear, slip, vibration, temperature, proximity, or contact geometry.', 'A modality name does not establish range, resolution, repeatability, or crosstalk.'],
            ['Signal processing', 'Calibrate, filter, timestamp, compress, and diagnose sensor state.', 'Drift or timing error can look like contact change.'],
            ['Tactile representation', 'Map distributed signals into robot coordinates, graphs, images, events, or learned features.', 'A model can learn sensor layout artifacts instead of transferable contact.'],
            ['AI model', 'Infer contact state, predict outcomes, or propose actions.', 'Offline accuracy may not improve real-robot behavior.'],
            ['Robot control', 'Change grip, motion, compliance, recovery, or stop behavior.', 'Latency can make an otherwise accurate signal unusable.'],
            ['Safety or manipulation outcome', 'Measure the intended task result under repeated and disturbed trials.', 'A research demonstrator is not automatically a certified safety system.'],
          ],
        },
      },
      {
        heading: 'Whole-arm tactile sensing extends coverage beyond the hand',
        body: [
          'A July 2026 Nature Sensors article reports EmArm, a robotic arm that combines large-area soft tactile skins, proprioception, and a closed-loop perception-action framework. The authors report submillimetre tactile localization, real-time feature extraction, touch-based intention recognition, contact-rich manipulation, and tactile-driven trajectory replanning under visual occlusion and environmental disturbances.',
          'The useful systems lesson is that body-scale robot skin needs a registered sensorimotor loop. Contact location must map to the arm geometry, synchronize with joint state, and reach a controller quickly enough to change motion. The paper demonstrates one integrated route; it does not establish the same accuracy, durability, or safety performance for every humanoid surface or deployment environment.',
        ],
        bullets: [
          'Register skin coordinates to links, joints, and robot frames',
          'Measure localization and control latency under realistic disturbances',
          'Test contact-aware replanning when vision is occluded',
          'Separate source-reported system results from broader humanoid safety claims',
        ],
      },
      {
        heading: 'Plantar tactile sensing verifies support after touchdown',
        body: [
          'Tac4Loco extends humanoid tactile sensing to the feet. The August 2026 preprint maps 60 FSR measurements per foot into shared ordinal pressure levels, learns spatial and temporal support features, and supplies those features to a Unitree G1 locomotion policy at 50 Hz.',
          'The reported physical comparisons include ramp edges, lateral ascent, slope transitions, a V-shaped trench, foam, and gravel. This is post-contact evidence: the insoles reveal the support realized after touchdown. They do not preview terrain, replace vision, or establish arbitrary-terrain generalization. The results remain tied to one preprint, robot, sensor layout, and small physical trial sets.',
        ],
        bullets: [
          'Map foot-pressure topology instead of collapsing contact into one total force value',
          'Synchronize bilateral pressure, proprioception, policy inference, and low-level motor control',
          'Test partial support, asymmetry, compliance, transitions, and sensor dropout separately',
          'Keep completion, survival, tracking, drift, and qualitative terrain evidence as distinct metrics',
        ],
      },
      {
        heading: 'How to evaluate a humanoid robot skin claim',
        body: [
          'The right question is not whether the skin detects touch in isolation. The useful question is whether it improves a humanoid task under realistic constraints.',
          'Evaluation should include grasp changes, handovers, occluded contact, repeated loading, surface wear, and synchronization with joint state or vision.',
        ],
      },
      {
        heading: 'Coverage should follow contact risk and task value',
        body: [
          'Whole-body tactile sensing does not require identical taxel density everywhere. Fingertips and palms may need high spatial and temporal detail for manipulation; forearms and upper arms may prioritize distributed collision localization; torso or shell panels may use lower-resolution contact events. Coverage, wiring, bandwidth, compute, replacement, and control value must be designed together.',
          'The evidence base is still heterogeneous. Full-hand systems, modular full-body e-skin, and whole-arm skin each answer different questions, so the site keeps them as related entity types rather than implying one standard humanoid skin architecture.',
        ],
      },
      {
        heading: 'Robot safety skin is a claim boundary, not a material label',
        body: [
          'A skin can contribute contact information to a safety strategy, but safety depends on the complete sensing, diagnostics, controller, stopping behavior, mechanical system, operating mode, and validation process. A paper showing contact localization or trajectory replanning should not be rewritten as a certification claim.',
          'For research comparison, report contact type, body coverage, latency, fault handling, repeated trials, disturbance conditions, and the exact robot response. For deployment, separate research evidence from any application-specific safety assessment.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does a humanoid robot need full-body robot skin?',
        answer:
          'Not always. Hands, palms, arms, gripper-like end effectors, or high-contact body zones may matter more than uniform full-body coverage.',
      },
      {
        question: 'What is the difference between fingertip sensing and full-hand skin?',
        answer:
          'Fingertip sensing can support pinch tasks. Full-hand coverage can capture palm, side, and multi-contact patterns that appear in power grasps and handovers.',
      },
      {
        question: 'What should I read next?',
        answer:
          'Start with robot skin for the definition, tactile AI for the stack, and robot skin papers for source-backed research routes.',
      },
    ],
    relatedLinks: [
      { label: 'Humanoid robots', href: '/humanoid-robots', description: 'Place robot skin inside the full humanoid perception, control, manipulation, and safety stack.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'Core definition for the surface layer.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How humanoid touch data becomes behavior.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Hand-specific sensing for grasp stability and slip.' },
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'How contact logs support Physical AI workflows.' },
      { label: 'Tactile robotics datasets', href: '/datasets', description: 'Compare full-hand and humanoid visual-tactile-action resources.' },
      { label: 'HT-Bench full-hand tactile benchmark', href: '/research/ht-bench-full-hand-tactile-representations-2026', description: 'Evaluate learned full-hand touch representations with egocentric vision.' },
      { label: 'Tac4Loco plantar tactile locomotion', href: '/research/tac4loco-plantar-tactile-humanoid-locomotion-2026', description: 'Unitree G1 foot-pressure feedback for support adaptation after touchdown.' },
      { label: 'Full-hand tactile sensing brief', href: '/research/full-hand-tactile-sensing-2025', description: 'Source-backed full-hand research analysis.' },
      { label: 'Applications overview', href: '/applications', description: 'Existing application route for category use cases.' },
    ],
    sources: [
      { label: 'Nature Machine Intelligence full-hand tactile sensing paper', href: 'https://www.nature.com/articles/s42256-025-01053-3' },
      { label: 'Nature Sensors EmArm whole-arm tactile sensing article', href: 'https://www.nature.com/articles/s44460-026-00097-1' },
      { label: 'Humanoid visual-tactile-action dataset preprint', href: 'https://arxiv.org/html/2510.25725v2' },
      { label: 'Tac4Loco plantar pressure humanoid locomotion preprint', href: 'https://arxiv.org/abs/2608.15766' },
      { label: 'Nature Communications spiking touch e-skin article', href: 'https://www.nature.com/articles/s41467-026-68858-7' },
    ],
    paperBriefIds: ['tac4loco-plantar-tactile-humanoid-locomotion-2026', 'ht-bench-full-hand-tactile-representations-2026', 'full-hand-tactile-sensing-2025', 'humanoid-visual-tactile-action-dataset-2025'],
  },
  {
    path: '/applications/robot-hand-tactile-sensor',
    title: 'Robot Hand Tactile Sensor Guide for Dexterous Grasping',
    description:
      'Robot hand tactile sensors help dexterous hands detect contact, slip, force patterns, and grasp stability. Learn where fingertip, palm, and full-hand sensing differ.',
    h1: 'Robot hand tactile sensor guide',
    kicker: 'Application guide',
    intent: 'Application page for robot hand tactile sensor, tactile robot hand, slip detection, and dexterous manipulation searches.',
    updated: '2026-07-21',
    priority: 0.81,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['robot hand tactile sensor', 'tactile robot hand', 'robot hand touch sensor', 'dexterous hand tactile sensing', 'robot hand slip detection'],
    quickAnswer: [
      'A robot hand tactile sensor measures contact at the hand surface so the robot can understand pressure, slip, grasp stability, and local interaction events.',
      'Fingertip sensors are useful for pinch and precision tasks, while palm and full-hand skin help with power grasps, handovers, and multi-contact manipulation.',
      'A strong robot hand evaluation covers mounting, wiring, calibration, latency, signal interpretation, and whether tactile data improves a real manipulation task.',
    ],
    sections: [
      {
        heading: 'Where tactile sensing belongs on a robot hand',
        body: [
          'Robot hand sensing can live on fingertips, pads, palm surfaces, side surfaces, or a full-hand skin. The right layout depends on the manipulation problem rather than the label.',
          'Precision grasping may need dense fingertip data. Power grasping and handovers often need palm and side contact because the object touches more than the fingertips.',
        ],
        bullets: [
          'Fingertips for pinch, slip, and local force patterns',
          'Palm coverage for power grasps and object seating',
          'Side surfaces for handovers and multi-contact interaction',
          'Full-hand logs for replay, evaluation, and tactile AI training',
        ],
      },
      {
        heading: 'What a useful hand sensor must report',
        body: [
          'A useful tactile hand sensor reports more than a contact yes-or-no value. It should give the robot contact location, timing, pressure or force distribution, and enough signal quality to support decisions.',
          'Slip response is a common target, but teams should be precise. Detecting slip in a lab setup is different from using that signal to adjust grip during a moving, occluded, real-world task.',
        ],
      },
      {
        heading: 'Integration questions before buying or building',
        body: [
          'The hard engineering is often outside the sensing material. Cable routing, readout electronics, finger geometry, calibration, drift, cleaning, and replacement can decide whether the sensor survives on a robot hand.',
          'This guide connects the broad robot skin category to practical hand-level constraints so teams can move from definition to integration and evaluation.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a robot hand tactile sensor the same as robot skin?',
        answer:
          'It can be part of robot skin. Robot skin is the broader surface category, while a robot hand tactile sensor focuses on contact sensing for fingertips, palms, or full-hand manipulation.',
      },
      {
        question: 'Do robot hands need fingertip sensors or full-hand sensing?',
        answer:
          'It depends on the task. Fingertips are enough for some pinch grasps, but palm and full-hand sensing are more useful for power grasps, handovers, and multi-contact tasks.',
      },
      {
        question: 'What should a robot hand tactile sensor page prove?',
        answer:
          'It should explain what is measured, where the sensor is mounted, how the data reaches the robot stack, and which grasping or evaluation behavior improves because of touch.',
      },
    ],
    relatedLinks: [
      { label: 'Humanoid robot skin', href: '/humanoid-robot-skin', description: 'How hand sensing fits broader humanoid surfaces.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How hand touch data becomes behavior.' },
      { label: 'Full-hand tactile sensing brief', href: '/research/full-hand-tactile-sensing-2025', description: 'A source-backed research route for full-hand sensing.' },
      { label: 'Tactile sensor benchmark', href: '/guides/tactile-sensor-benchmark-robot-manipulation', description: 'Compare sensor evidence by manipulation task.' },
      { label: 'Slip detection guide', href: '/guides/slip-detection-robot-hand', description: 'Evaluate slip signals and closed-loop grip response.' },
      { label: 'Robot skin papers', href: '/research/robot-skin-papers', description: 'Research routes for tactile sensing and e-skin.' },
    ],
    sources: [
      { label: 'Nature Machine Intelligence full-hand tactile sensing paper', href: 'https://www.nature.com/articles/s42256-025-01053-3' },
      { label: 'DexSkin conformable robotic skin preprint', href: 'https://arxiv.org/html/2509.18830v1' },
      { label: 'Scientific Reports wet-slippage fingertip e-skin article', href: 'https://www.nature.com/articles/s41598-026-41096-z' },
    ],
  },
  {
    path: '/applications/soft-robotic-skin',
    title: 'Soft Robotic Skin for Flexible Contact Sensing',
    description:
      'Soft robotic skin uses flexible sensing surfaces for curved robots, grippers, prosthetics, and soft machines. Learn how it differs from generic e-skin.',
    h1: 'Soft robotic skin',
    kicker: 'Application guide',
    intent: 'Application page for soft robotic skin, flexible robot skin, soft gripper tactile sensing, and soft robotics e-skin queries.',
    updated: '2026-07-21',
    priority: 0.79,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['soft robotic skin', 'flexible robot skin', 'soft gripper tactile sensing', 'soft robotics e-skin', 'stretchable tactile sensor'],
    quickAnswer: [
      'Soft robotic skin is a flexible tactile surface designed for curved, deformable, or soft robot structures.',
      'It overlaps with e-skin, but the robotics question is whether the skin survives mounting, bending, repeated contact, and robot-level data use.',
      'The strongest use cases include soft grippers, prosthetic hands, humanoid surfaces, assistive robotics, and contact-rich research platforms.',
    ],
    sections: [
      {
        heading: 'Why soft surfaces change the problem',
        body: [
          'Soft robots and curved end effectors do not give engineers a flat, rigid mounting plane. A tactile layer may need to bend, stretch, compress, or wrap around geometry without losing signal quality.',
          'Soft robotic skin evaluation therefore needs mechanics and packaging, not only sensor sensitivity. A skin that works as a flat sample can fail when mounted on a moving soft gripper.',
        ],
        bullets: [
          'Conformal contact on curved or deformable surfaces',
          'Repeated bending, compression, and abrasion during use',
          'Signal changes caused by stretch, mounting, or material drift',
          'Replacement and cleaning constraints for real robot operation',
        ],
      },
      {
        heading: 'Soft robotic skin versus e-skin',
        body: [
          'E-skin is the broader electronic skin category. Soft robotic skin is the robot-facing version of that idea when the robot body or end effector is flexible.',
          'A useful soft robotic skin analysis connects material properties to robot tasks: gripping delicate objects, measuring deformation, detecting contact, or improving human-robot interaction.',
        ],
      },
      {
        heading: 'How to avoid overclaiming',
        body: [
          'Soft robotic skin research can be visually impressive, but the evidence boundary must stay clear. A material demo does not automatically prove full robot readiness.',
          'RoboSkin.ai frames soft skin around what was tested, what surface was used, what signal was measured, and what remains unproven for robot deployment.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is soft robotic skin only for soft robots?',
        answer:
          'No. It can also be useful on rigid robots with curved or compliant contact surfaces, including gripper pads, palms, prosthetics, and safety covers.',
      },
      {
        question: 'How is soft robotic skin different from a flexible tactile sensor?',
        answer:
          'A flexible tactile sensor is usually the sensing element or array. Soft robotic skin is the integrated robot surface, including mounting, wiring, calibration, and use in robot tasks.',
      },
      {
        question: 'What should be cited on a soft robotic skin page?',
        answer:
          'Original papers or public lab reports should be cited, with clear separation between the reported result and RoboSkin.ai editorial interpretation.',
      },
    ],
    relatedLinks: [
      { label: 'E-skin', href: '/e-skin', description: 'Electronic skin context for flexible sensing.' },
      { label: 'Flexible tactile sensor array', href: '/guides/flexible-tactile-sensor-array', description: 'Array-level explanation for flexible tactile sensing.' },
      { label: 'Single-material soft skin brief', href: '/research/single-material-soft-robotic-skin-2025', description: 'A source-backed soft robotic skin research note.' },
      { label: 'Robot skin vs e-skin', href: '/guides/robot-skin-vs-e-skin', description: 'Terminology boundaries for overlapping phrases.' },
    ],
    sources: [
      { label: 'University of Cambridge single-material robotic skin report', href: 'https://www.cam.ac.uk/stories/robotic-skin' },
      { label: 'Nature Communications spiking touch e-skin article', href: 'https://www.nature.com/articles/s41467-026-68858-7' },
      { label: 'npj Flexible Electronics origami e-skin article', href: 'https://www.nature.com/articles/s41528-026-00563-3' },
    ],
  },
  {
    path: '/guides/flexible-tactile-sensor-array',
    title: 'Flexible Tactile Sensor Array Guide for Robot Skin',
    description:
      'Flexible tactile sensor arrays measure contact across curved robot surfaces. Learn how arrays relate to robot skin, e-skin, calibration, and tactile AI.',
    h1: 'Flexible tactile sensor array guide',
    kicker: 'Technology guide',
    intent: 'Technology guide for flexible tactile sensor array, tactile sensor matrix, robot skin array, and e-skin sensor array searches.',
    updated: '2026-07-21',
    priority: 0.78,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'resources',
    keywords: ['flexible tactile sensor array', 'tactile sensor array', 'robot skin sensor array', 'tactile sensor matrix', 'flexible pressure sensor array'],
    quickAnswer: [
      'A flexible tactile sensor array is a grid or distributed set of sensing points that measures contact across a curved or deformable surface.',
      'In robot skin, arrays can help localize pressure, infer contact shape, detect slip patterns, and feed tactile AI pipelines.',
      'Array quality depends on resolution, readout stability, latency, calibration, durability, wiring, and how data maps to robot geometry.',
    ],
    sections: [
      {
        heading: 'What an array adds beyond a single sensor',
        body: [
          'A single touch sensor can tell a robot that contact happened. A tactile array can show where contact happened and how pressure changes across a surface.',
          'That spatial pattern is important for hands, grippers, and curved covers because contact rarely happens at one clean point. Objects press, slide, rotate, deform, and touch multiple regions at once.',
        ],
        bullets: [
          'Contact maps across fingertips, palms, pads, or body surfaces',
          'Pressure distribution instead of one scalar force value',
          'Potential slip, shear, vibration, or texture features when supported',
          'Robot geometry registration so data maps back to the physical surface',
        ],
      },
      {
        heading: 'Array tradeoffs',
        body: [
          'Higher resolution is not automatically better. More sensing points can increase wiring, readout complexity, data bandwidth, calibration work, and failure modes.',
          'Good array design starts from the robot task. A collision-aware body cover may need broad coverage and robust events. A dexterous fingertip may need finer spatial patterns and faster response.',
        ],
      },
      {
        heading: 'How arrays feed tactile AI',
        body: [
          'Tactile AI needs consistent, timestamped, robot-ready data. Array outputs often need filtering, normalization, calibration, compression, and synchronization with robot joint state or camera data.',
          'This is where a flexible array becomes more than hardware. The software path determines whether the robot can use the contact map for grasping, safety, or evaluation.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a tactile sensor array required for robot skin?',
        answer:
          'Not always. Some robot skin systems use sparse sensors or event-based contact detection. Arrays are useful when spatial contact patterns matter.',
      },
      {
        question: 'Does flexible mean stretchable?',
        answer:
          'No. Flexible can mean bendable or conformal. Stretchable means the sensor can elongate. These properties have different mechanical and calibration consequences.',
      },
      {
        question: 'How does a tactile array fit into a robot skin system?',
        answer:
          'A tactile array provides spatial contact measurements. Robot skin adds the mounting, coverage, protection, calibration, data handling, and robot-level use around that sensing layer.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'The broader surface category.' },
      { label: 'Soft robotic skin', href: '/applications/soft-robotic-skin', description: 'Flexible skin applied to soft or curved robots.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How array data becomes robot behavior.' },
      { label: 'Graphene 3D force brief', href: '/research/graphene-liquid-metal-3d-force-2026', description: 'A source-backed tactile sensing research note.' },
    ],
    sources: [
      { label: 'ACS large-area flexible tactile array article', href: 'https://pubs.acs.org/doi/10.1021/acsaelm.5c01200' },
      { label: 'npj Flexible Electronics origami e-skin article', href: 'https://www.nature.com/articles/s41528-026-00563-3' },
      { label: 'Nature Communications spiking touch e-skin article', href: 'https://www.nature.com/articles/s41467-026-68858-7' },
    ],
  },
  {
    path: '/physical-ai-touch',
    title: 'Physical AI & Touch: Tactile Sensing for Embodied Systems',
    description:
      'Touch grounds Physical AI in real contact. Learn how tactile sensing combines with vision, language, proprioception, world models, robot learning, and control.',
    h1: 'Physical AI and touch',
    kicker: 'Technology guide',
    intent: 'Technology guide for Physical AI touch data, tactile feedback for robots, robot touch data, and contact-aware AI searches.',
    updated: '2026-08-16',
    priority: 0.92,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'answers',
    keywords: ['Physical AI tactile sensing', 'Physical AI touch', 'tactile Physical AI', 'embodied tactile intelligence', 'Physical AI touch data', 'robot touch data', 'multimodal Physical AI'],
    quickAnswer: [
      'Physical AI touch data is contact information collected from robot surfaces during real interaction with objects, people, tools, or environments.',
      'It complements vision because the robot often needs feedback at the exact surface where contact happens, especially when the hand blocks the camera.',
      'Useful touch data is timestamped, calibrated, mapped to robot geometry, and connected to control, evaluation, or learning workflows.',
    ],
    sections: [
      {
        heading: 'Why vision is not enough',
        body: [
          'Vision can help a robot identify an object and plan an approach. Once the robot touches the object, the hand, gripper, or tool may occlude the most important part of the scene.',
          'Touch data gives Physical AI a local signal after contact. It can reveal slip, seating, deformation, force patterns, contact timing, and unexpected interaction events.',
        ],
        bullets: [
          'Grasp stability when cameras are blocked',
          'Safety contact during human-robot interaction',
          'Task evaluation through replayable tactile logs',
          'Feedback loops for manipulation and robot learning',
        ],
      },
      {
        heading: 'What makes touch data useful',
        body: [
          'Raw tactile signals are not automatically useful. They need consistent timing, calibration, coordinate mapping, metadata, and interfaces that robot software can consume.',
          'A useful Physical AI touch-data workflow covers the full lifecycle: capture, condition, align, store, interpret, act, and evaluate.',
        ],
      },
      {
        heading: 'Where robot skin fits',
        body: [
          'Robot skin is one way to collect touch data at the surface. A tactile sensor array, soft skin, fingertip pad, or full-hand skin can all produce contact signals for a Physical AI stack.',
          'The practical connection is the data path from contact event and calibration through timestamps, robot state, control, and task-level evaluation.',
        ],
      },
      {
        heading: 'Touch data pipeline for embodied AI',
        body: [
          'A touch data pipeline for embodied AI should preserve each contact event, timestamp, body frame, calibrated value, and robot action so the signal can be replayed, compared, and used outside the original demo. Without that path, a tactile sensor produces measurements but not durable Physical AI evidence.',
          'The pipeline begins at the contact surface, moves through electronics and calibration, aligns with robot state, stores metadata, and then feeds control, evaluation, or learning. Each stage should be visible enough that another team can understand what was measured and what was inferred.',
        ],
        bullets: [
          'Capture: contact event, timestamp, body frame, calibrated value, and robot action',
          'Align: synchronize tactile data with joint state, vision, commands, and task phase',
          'Store: retain calibration metadata, sensor location, units, sampling rate, and failure notes',
          'Use: expose features for grasp control, safety checks, replay diagnostics, or learning systems',
        ],
      },
      {
        heading: 'The multimodal perception stack for Physical AI',
        body: [
          'Physical AI combines complementary channels rather than treating one sensor as sufficient. Vision describes visible geometry and motion, language encodes goals and semantic context, proprioception reports the robot body, and touch measures the contact that results when an action meets the world.',
        ],
        table: {
          headers: ['Channel', 'Best evidence', 'Typical blind spot', 'Role after fusion'],
          rows: [
            ['Vision', 'Scene, object, pose, motion, and free-space geometry.', 'Occlusion and hidden contact state.', 'Approach planning, object context, and visible outcome.'],
            ['Language', 'Task goals, instructions, concepts, and prior knowledge.', 'It does not directly measure the current physical interaction.', 'Semantic planning, task decomposition, and explanation.'],
            ['Proprioception', 'Joint state, robot pose, velocity, and internal body configuration.', 'It may not localize or characterize surface contact.', 'Embodiment state, control, and coordinate alignment.'],
            ['Touch', 'Local pressure, force, shear, slip, vibration, temperature, deformation, or contact geometry.', 'It is local, hardware-specific, and calibration-dependent.', 'Contact grounding, correction, recovery, and task verification.'],
          ],
        },
      },
      {
        heading: 'Touch in VLA models and world models',
        body: [
          'A VLA policy can connect visual observations and language goals to robot actions, but touch may require a faster feedback pathway than semantic planning. TouchWorld, for example, separates higher-level planning and tactile subgoal prediction from high-frequency tactile residual correction. That architecture is one research result, not a universal prescription.',
          'Visuo-tactile world models predict possible visual and contact futures under candidate actions. Their value must be tested twice: whether the predicted tactile state is physically informative, and whether using that prediction improves planning or control on the real robot. Offline image similarity alone is not a Physical AI benchmark.',
        ],
      },
      {
        heading: 'Minimum evidence for embodied tactile intelligence',
        body: [
          'A credible Physical AI touch claim should identify the measured signals, robot and sensor, data alignment, model role, control rate, baseline, task outcome, and transfer boundary. The most useful ablation compares vision-only, touch-only where meaningful, fused input, and no-feedback or reactive baselines under the same task protocol.',
        ],
        bullets: [
          'Held-out objects, surfaces, tasks, sensors, or embodiments matched to the transfer claim',
          'Latency from contact to controller-usable feature and robot response',
          'Failures under occlusion, slip, misalignment, force mismatch, and external disturbance',
          'Replayable logs that preserve observation, action, prediction, measured touch, and outcome',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Physical AI touch data only for training models?',
        answer:
          'No. It can be used for real-time control, safety events, grasp evaluation, debugging, benchmarking, and model training.',
      },
      {
        question: 'How does touch data relate to tactile AI?',
        answer:
          'Touch data is the input. Tactile AI is the workflow that processes and uses that input for robot decisions, evaluation, or learning.',
      },
      {
        question: 'Why treat Physical AI touch data separately from robot skin?',
        answer:
          'Robot skin describes the sensing surface. Physical AI touch data also includes timing, calibration, alignment, storage, interpretation, and how the signal changes a robot action or evaluation.',
      },
    ],
    relatedLinks: [
      { label: 'Physical AI', href: '/physical-ai', description: 'The broad parent route for physical perception, reasoning, policy, control, and feedback.' },
      { label: 'AI and robotics', href: '/ai-robotics', description: 'Map how AI models connect to robot embodiment, action, and measured outcomes.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'The stack that turns touch data into behavior.' },
      { label: 'Tactile feedback for Physical AI', href: '/guides/tactile-feedback-for-physical-ai', description: 'The contact-feedback loop that turns touch data into robot action.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'The surface layer that collects contact signals.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'A concrete hand-level source of touch data.' },
      { label: 'Tactile datasets', href: '/datasets', description: 'Compare robot touch datasets, splits, task fit, and transfer limits.' },
      { label: 'Tactile foundation models', href: '/tactile-foundation-models', description: 'Track representations, world models, policies, and transfer claims.' },
      { label: 'Humanoid robot skin', href: '/humanoid-robot-skin', description: 'Map touch across hands, arms, and humanoid surfaces.' },
      { label: 'Technology context', href: '/technology', description: 'Existing RoboSkin.ai technology overview.' },
    ],
    sources: [
      { label: 'Humanoid visual-tactile-action dataset preprint', href: 'https://arxiv.org/html/2510.25725v2' },
      { label: 'FreeTacMan visuo-tactile data collection preprint', href: 'https://arxiv.org/html/2506.01941v1' },
      { label: 'ROS 2 Kilted documentation', href: 'https://docs.ros.org/en/kilted/Releases.html' },
      { label: 'TouchWorld tactile foundation model preprint', href: 'https://arxiv.org/abs/2607.07287' },
      { label: 'FeelWorld visuo-tactile world model preprint', href: 'https://arxiv.org/abs/2607.24267' },
    ],
  },
  {
    path: '/applications/robot-gripper-tactile-sensor',
    title: 'Robot Gripper Tactile Sensor Guide for Contact-Aware Grasping',
    description:
      'Robot gripper tactile sensors help detect contact, pressure patterns, slip, and grasp stability. Learn what to evaluate before choosing tactile sensing for grippers.',
    h1: 'Robot gripper tactile sensor guide',
    kicker: 'Evaluation guide',
    intent: 'Buyer and evaluator page for robot gripper tactile sensor, tactile gripper, gripper slip detection, and contact-aware grasping queries.',
    updated: '2026-06-06',
    priority: 0.79,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['robot gripper tactile sensor', 'tactile gripper sensor', 'gripper contact sensing', 'robot gripper touch sensor', 'contact-aware gripper'],
    quickAnswer: [
      'A robot gripper tactile sensor measures contact at the gripping surface so a robot can detect object seating, force patterns, slip, and unstable grasps.',
      'The best gripper sensor depends on the task: delicate handling may need fast slip signals, while broad industrial handling may need durable contact maps and simple replacement.',
      'Evaluation should cover mounting geometry, cable routing, protective layers, calibration drift, signal latency, and whether the controller actually changes behavior from tactile data.',
    ],
    sections: [
      {
        heading: 'What tactile sensing changes for grippers',
        body: [
          'A gripper can close around an object without knowing whether the object is seated, slipping, tilted, or being squeezed too hard. Tactile sensing adds local contact feedback at the surface where grasp failure begins.',
          'This is especially useful when cameras are blocked by fingers, jaws, or the object itself. The tactile signal can reveal contact transitions before the object visibly moves.',
        ],
        bullets: [
          'Contact confirmation before lift or transfer',
          'Slip detection before a drop',
          'Pressure maps for soft, fragile, or irregular objects',
          'Replayable tactile logs for failed grasps',
        ],
      },
      {
        heading: 'Gripper evaluation checklist',
        body: [
          'A gripper evaluation should not only list sensitivity. It must ask how the sensor survives real gripping: abrasion, replacement, cleaning, cable flex, protective skins, and jaw geometry.',
          'Teams should also check software. A sensor that produces a nice plot but cannot publish timestamped robot-ready data is not enough for production evaluation.',
        ],
      },
      {
        heading: 'How gripper sensing connects to the wider system',
        body: [
          'Robot skin defines the surface system, tactile AI explains how contact data is used, and slip detection covers one narrower manipulation problem.',
          'Together these views let teams evaluate the sensing layer, the data path, and the task outcome without collapsing them into one generic category.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do grippers need tactile sensors if they already have force control?',
        answer:
          'Force control helps with aggregate load. Tactile sensors can add local contact location, pressure distribution, slip, and surface interaction signals that force control alone may not capture.',
      },
      {
        question: 'What is the first gripper tactile feature to validate?',
        answer:
          'Validate contact and slip signals on the actual gripper geometry, with the protective layer and object set that matter for the task.',
      },
      {
        question: 'Is a tactile gripper the same as a robot hand tactile sensor?',
        answer:
          'They overlap, but gripper evaluation focuses on jaw pads, end effectors, replacement, industrial handling, and grasp reliability rather than full-hand dexterity.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'The broader tactile surface category.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How gripper touch data becomes decisions.' },
      { label: 'Slip detection robot hand', href: '/guides/slip-detection-robot-hand', description: 'A narrower slip-focused guide.' },
      { label: 'Flexible tactile sensor array', href: '/guides/flexible-tactile-sensor-array', description: 'Array tradeoffs for contact maps.' },
    ],
    sources: [
      {
        label: 'CMU tactile information review for robotic manipulation',
        href: 'https://publications.ri.cmu.edu/a-review-of-tactile-information-perception-and-action-through-touch',
      },
      {
        label: 'ACS large-area flexible tactile sensor article',
        href: 'https://pubs.acs.org/doi/10.1021/acsaelm.5c01200',
      },
    ],
    paperBriefIds: ['large-area-flexible-tactile-arrays-2025', 'graphene-liquid-metal-3d-force-2026'],
  },
  {
    path: '/guides/tactile-sensor-for-robots',
    title: 'Tactile Sensor for Robots: Selection and Evaluation Guide',
    description:
      'A tactile sensor for robots measures pressure, force, slip, strain, or contact maps. Compare sensors for robot hands, grippers, and robot skin.',
    h1: 'Tactile sensor for robots',
    kicker: 'Evaluation guide',
    intent: 'Evaluation page for tactile sensor for robots, robot tactile sensor, tactile sensing robotics, and sensor selection searches.',
    updated: '2026-07-21',
    priority: 0.8,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['tactile sensor for robots', 'robot tactile sensor', 'tactile sensing robotics', 'robot sensor evaluation', 'tactile sensor selection'],
    quickAnswer: [
      'A tactile sensor for robots measures physical contact so the robot can understand touch at the surface, not only through vision or joint motion.',
      'Useful comparison criteria include signal type, coverage, resolution, latency, calibration, durability, robot software interface, and task-level benefit.',
      'The best sensor is task-specific: a fingertip, gripper pad, soft skin, and full-body contact surface do not need the same architecture.',
    ],
    sections: [
      {
        heading: 'Start with the task, not the sensor type',
        body: [
          'A robot tactile sensor can be capacitive, resistive, optical, magnetic, piezoelectric, fluidic, impedance-based, or hybrid. The architecture matters, but the first question is what the robot must do with touch.',
          'Pick the measurable outcome: safer contact, grasp stability, slip response, material handling, tactile logging, or research benchmarking.',
        ],
        bullets: [
          'Manipulation tasks need contact timing, force patterns, and slip cues',
          'Human-robot interaction surfaces need broad, robust contact events',
          'Research platforms need logged, calibrated, reproducible data',
          'Soft robots need flexible mounting and drift-aware interpretation',
        ],
      },
      {
        heading: 'Comparison dimensions',
        body: [
          'Sensor pages often over-focus on sensitivity. For robots, sensitivity is only one dimension. A robot program also needs geometry, replacement, data rate, synchronization, calibration, and controller integration.',
          'A lower-resolution sensor with stable timing and robust packaging can be more useful than a fragile high-resolution sample that cannot survive mounting.',
        ],
      },
      {
        heading: 'How to connect this to robot skin',
        body: [
          'Robot skin may use one tactile sensor type or combine many. Tactile sensors are the building blocks; robot skin is the surface-level system around them.',
          'Keeping those levels separate makes component selection and full-surface integration easier to evaluate.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a tactile sensor and robot skin?',
        answer:
          'A tactile sensor is the sensing element or array. Robot skin is the integrated surface system that includes mounting, electronics, data handling, and robot use.',
      },
      {
        question: 'Which tactile sensor is best for robots?',
        answer:
          'There is no universal best sensor. The correct choice depends on task, geometry, signal needs, durability, data rate, and software integration.',
      },
      {
        question: 'Should a tactile sensor page include research citations?',
        answer:
          'Yes. Cite public papers or documentation, then separate reported source claims from RoboSkin.ai interpretation.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'The integrated surface system.' },
      { label: 'Flexible tactile sensor array', href: '/guides/flexible-tactile-sensor-array', description: 'Array-level sensing tradeoffs.' },
      { label: 'Robot gripper tactile sensor', href: '/applications/robot-gripper-tactile-sensor', description: 'Gripper-specific evaluation.' },
      { label: 'Tactile sensor benchmark', href: '/guides/tactile-sensor-benchmark-robot-manipulation', description: 'Compare tactile sensing evidence by robot manipulation task.' },
      { label: 'Robot skin papers', href: '/research/robot-skin-papers', description: 'Source-backed research routes.' },
    ],
    sources: [
      {
        label: 'CMU tactile information review for robotic manipulation',
        href: 'https://publications.ri.cmu.edu/a-review-of-tactile-information-perception-and-action-through-touch',
      },
      {
        label: 'Nature Machine Intelligence full-hand tactile sensing paper',
        href: 'https://www.nature.com/articles/s42256-025-01053-3',
      },
    ],
    paperBriefIds: ['full-hand-tactile-sensing-2025', 'large-area-flexible-tactile-arrays-2025'],
  },
  {
    path: '/guides/robot-touch-sensor',
    title: 'Robot Touch Sensor Guide: From Contact Events to Tactile AI',
    description:
      'Robot touch sensors detect contact events, pressure, force, slip, and tactile patterns. Learn when a touch sensor becomes useful robot skin or tactile AI input.',
    h1: 'Robot touch sensor guide',
    kicker: 'Evaluation guide',
    intent: 'Evaluation page for robot touch sensor, robot touch sensing, robot pressure sensor, and contact sensor robotics searches.',
    updated: '2026-06-06',
    priority: 0.77,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'answers',
    keywords: ['robot touch sensor', 'robot touch sensing', 'robot pressure sensor', 'contact sensor robotics', 'robot tactile feedback'],
    quickAnswer: [
      'A robot touch sensor detects contact at or near the robot surface. It may report a simple event, a pressure value, a force vector, or a spatial tactile pattern.',
      'Touch sensing becomes more valuable when the signal is timestamped, mapped to robot geometry, and used for safety, manipulation, evaluation, or learning.',
      'Robot skin is the broader surface-level integration of touch sensors, packaging, electronics, data handling, and robot behavior.',
    ],
    sections: [
      {
        heading: 'Simple contact versus tactile sensing',
        body: [
          'A simple touch sensor can answer whether contact happened. A tactile sensor can answer more: where contact happened, how force is distributed, whether slip is beginning, or how contact changes over time.',
          'Both can be useful. The problem is when a page treats all touch sensors as if they support the same robot behavior.',
        ],
        bullets: [
          'Contact event sensors for safety and state transitions',
          'Pressure sensors for load and grip feedback',
          'Tactile arrays for contact maps',
          'Slip-sensitive systems for manipulation feedback',
        ],
      },
      {
        heading: 'What to ask before implementation',
        body: [
          'Teams should define what the controller or evaluator will do with the signal. If the signal only appears on a dashboard, it may not improve the robot.',
          'A useful touch sensor plan includes timing, frame mapping, calibration, logging, data storage, and a fallback behavior when readings are noisy.',
        ],
      },
      {
        heading: 'How to choose the right sensing route',
        body: [
          'The right route depends on the system boundary: gripper pads, full hands, tactile arrays, integrated robot skin, or a ROS 2 data pipeline.',
          'Choose the narrowest route that matches the component, surface, software layer, or robot task being evaluated.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a robot touch sensor always tactile AI?',
        answer:
          'No. It becomes part of tactile AI when touch data is processed and used for robot decisions, evaluation, or learning.',
      },
      {
        question: 'Can a simple contact sensor be enough?',
        answer:
          'Yes, for binary contact events or safety triggers. More complex manipulation usually needs richer tactile signals.',
      },
      {
        question: 'What should I evaluate next?',
        answer:
          'Use robot skin for the integrated surface concept, tactile sensor for robots for selection criteria, and ROS 2 tactile sensing for data pipelines.',
      },
    ],
    relatedLinks: [
      { label: 'Tactile sensor for robots', href: '/guides/tactile-sensor-for-robots', description: 'Selection criteria for robot tactile sensors.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'The broader surface system.' },
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'Why touch data matters for robot learning.' },
      { label: 'ROS 2 tactile sensing', href: '/guides/ros2-tactile-sensing', description: 'Data and replay workflow for touch signals.' },
    ],
    sources: [
      {
        label: 'CMU tactile information review for robotic manipulation',
        href: 'https://publications.ri.cmu.edu/a-review-of-tactile-information-perception-and-action-through-touch',
      },
      {
        label: 'ROS 2 Kilted documentation',
        href: 'https://docs.ros.org/en/kilted/Releases.html',
      },
    ],
  },
  {
    path: '/guides/slip-detection-robot-hand',
    title: 'Slip Detection for Robot Hands and Tactile Grippers',
    description:
      'Slip detection helps robot hands and grippers react before an object drops. Learn the tactile signals, validation questions, and robot-control constraints.',
    h1: 'Slip detection for robot hands',
    kicker: 'Evaluation guide',
    intent: 'Manipulation page for slip detection robot hand, gripper slip detection, tactile slip sensing, and grasp stability searches.',
    updated: '2026-06-06',
    priority: 0.78,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['slip detection robot hand', 'gripper slip detection', 'tactile slip sensing', 'robot grasp stability', 'robot hand slip sensor'],
    quickAnswer: [
      'Slip detection uses tactile, force, vibration, optical, or multimodal signals to identify object motion at the contact surface before the grasp fails.',
      'For robot hands and grippers, slip detection only matters if the controller can react quickly enough to adjust grip, pose, or task state.',
      'Credible slip evaluation separates sensing demonstrations from closed-loop robot behavior under realistic grasp conditions.',
    ],
    sections: [
      {
        heading: 'What slip detection measures',
        body: [
          'Slip can appear as changing shear force, vibration, contact movement across a tactile array, optical pattern shift, or a learned event classification. The sensor type is less important than whether the signal predicts grasp failure early enough.',
          'The robot also needs context. A sliding object may require more normal force, a different finger pose, or a safe release depending on object fragility and task constraints.',
        ],
        bullets: [
          'Early slip onset before a visible drop',
          'Direction and speed of contact movement when available',
          'Confidence signal for controller decisions',
          'Replay logs that show whether reaction timing was fast enough',
        ],
      },
      {
        heading: 'Validation questions',
        body: [
          'Bench slip detection is not enough. Ask whether slip was detected during real manipulation, with the same skin, object set, and gripper geometry.',
          'Latency matters. A perfect classifier that fires too late will not save the grasp.',
        ],
      },
      {
        heading: 'Where slip detection fits',
        body: [
          'Slip detection is a specific manipulation problem within the broader robot skin and tactile sensing stack.',
          'It is most useful when teams can connect the contact signal to reaction latency, controller behavior, and grasp outcomes.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can slip detection work without tactile arrays?',
        answer:
          'Yes. Slip can be detected with force, vibration, optical, or event-based signals. Arrays are useful when contact movement across the surface matters.',
      },
      {
        question: 'What is the biggest slip-detection failure mode?',
        answer:
          'Late or poorly synchronized detection. The signal must arrive early enough and be connected to a controller response.',
      },
      {
        question: 'Should slip detection be tested on the final gripper?',
        answer:
          'Yes. Mounting, protective layers, object materials, and jaw geometry can all change slip signals.',
      },
    ],
    relatedLinks: [
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Hand-level tactile sensing context.' },
      { label: 'Robot gripper tactile sensor', href: '/applications/robot-gripper-tactile-sensor', description: 'Gripper-level contact sensing context.' },
      { label: 'Graphene 3D force brief', href: '/research/graphene-liquid-metal-3d-force-2026', description: 'Source-backed multi-axis force and slip research.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How slip signals become behavior.' },
    ],
    sources: [
      {
        label: 'NIST tactile slip detection for industrial robot grasping',
        href: 'https://www.nist.gov/publications/slip-detection-analysis-and-calibration-univariate-tactile-signals',
      },
      {
        label: 'University of Cambridge graphene-based artificial skin report',
        href: 'https://www.cam.ac.uk/research/news/graphene-based-artificial-skin-brings-human-like-touch-closer-to-robots',
      },
    ],
    paperBriefIds: ['graphene-liquid-metal-3d-force-2026', 'full-hand-tactile-sensing-2025'],
  },
  {
    path: '/guides/ros2-tactile-sensing',
    title: 'ROS 2 Tactile Sensing Pipeline Guide for Robot Skin Data',
    description:
      'ROS 2 tactile sensing needs timestamped messages, frame mapping, rosbag replay, and controller interfaces. Learn how robot skin data becomes usable.',
    h1: 'ROS 2 tactile sensing pipeline',
    kicker: 'Integration guide',
    intent: 'Software integration page for ROS 2 tactile sensing, robot skin ROS 2, tactile data pipeline, and rosbag tactile replay searches.',
    updated: '2026-06-06',
    priority: 0.76,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'resources',
    keywords: ['ROS 2 tactile sensing', 'robot skin ROS 2', 'tactile data pipeline', 'rosbag tactile data', 'robot tactile middleware'],
    quickAnswer: [
      'ROS 2 tactile sensing is the software workflow that publishes, synchronizes, records, replays, and consumes robot touch data.',
      'A serious tactile pipeline should define message format, timestamps, frame IDs, calibration metadata, raw-data logging, and controller-facing outputs.',
      'Without replayable data and clear coordinate mapping, robot skin becomes difficult to debug and weak as evidence for tactile AI claims.',
    ],
    sections: [
      {
        heading: 'Minimum tactile data contract',
        body: [
          'A robot skin signal should not be treated as a screenshot or isolated plot. It needs a data contract: what was measured, when it was measured, where it happened on the robot, and how another engineer can replay the event.',
          'ROS 2 gives robotics teams the vocabulary for topics, timestamps, frames, rosbag logs, controllers, and replayable experiments.',
        ],
        bullets: [
          'Message schema for pressure maps, force vectors, events, or features',
          'Timestamps aligned with robot state and other sensors',
          'Frame IDs that map tactile readings to robot geometry',
          'rosbag or equivalent logs for failed and successful grasps',
        ],
      },
      {
        heading: 'What to log',
        body: [
          'Teams should log raw tactile data when possible, not only classifications. A slip label is useful, but raw data helps explain false positives and compare controller timing.',
          'A useful log also includes joint state, command outputs, calibration context, and object/task metadata.',
        ],
      },
      {
        heading: 'Why software integration matters',
        body: [
          'Most robot skin pages talk about materials. A ROS 2 tactile sensing page proves that RoboSkin.ai understands the software layer that turns skin into robot-ready evidence.',
          'That layer makes timing, replay, calibration metadata, and controller-facing interfaces explicit enough to reproduce and evaluate.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does ROS 2 provide a standard robot skin message?',
        answer:
          'Not as a universal robot skin standard. Teams still need to define message schemas for their tactile output and document how each signal maps to the robot.',
      },
      {
        question: 'Why is rosbag replay important for tactile sensing?',
        answer:
          'Tactile events happen quickly. Replay lets engineers inspect contact signals, joint states, controller actions, and failures after the run.',
      },
      {
        question: 'Should tactile classifiers publish confidence values?',
        answer:
          'Yes. Confidence and raw-data traceability help engineers debug false events and decide how a controller should react.',
      },
    ],
    relatedLinks: [
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'Why touch data matters for Physical AI workflows.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'The stack that uses robot touch signals.' },
      { label: 'ROS 2 pipeline brief', href: '/research/ros2-kilted-tactile-pipeline-2026', description: 'Source-backed ROS 2 tactile pipeline article.' },
      { label: 'Technology context', href: '/technology', description: 'Existing site-level technology overview.' },
    ],
    sources: [
      {
        label: 'ROS 2 documentation',
        href: 'https://docs.ros.org/',
      },
      {
        label: 'ROS 2 rosbag tutorial',
        href: 'https://docs.ros.org/en/rolling/Tutorials/Advanced/Recording-A-Bag-From-Your-Own-Node-CPP.html',
      },
      {
        label: 'ros2_control documentation',
        href: 'https://control.ros.org/',
      },
    ],
    paperBriefIds: ['ros2-kilted-tactile-pipeline-2026'],
  },
  {
    path: '/guides/robot-skin-vs-e-skin',
    title: 'Robot Skin vs E-Skin: What Is the Difference?',
    description:
      'Compare robot skin and e-skin. Learn where the terms overlap, where they differ, and how tactile AI connects electronic skin to robot behavior.',
    h1: 'Robot skin vs e-skin',
    kicker: 'Comparison guide',
    intent: 'Comparison page for robot skin vs e-skin, robotic skin vs electronic skin, and terminology disambiguation searches.',
    updated: '2026-06-06',
    priority: 0.8,
    changeFrequency: 'monthly',
    schemaType: 'WebPage',
    visualKey: 'answers',
    keywords: ['robot skin vs e-skin', 'robotic skin vs electronic skin', 'robot skin e-skin difference', 'e-skin robotics', 'robot tactile skin'],
    quickAnswer: [
      'E-skin means electronic skin: a flexible sensor layer that can measure contact-related signals.',
      'Robot skin means tactile sensing applied to a robot surface, usually with robot-specific mounting, data, calibration, and control needs.',
      'The terms overlap when an e-skin layer is used as the tactile surface of a robot hand, gripper, prosthetic, arm, or body cover.',
    ],
    sections: [
      {
        heading: 'The practical difference',
        body: [
          'E-skin describes the sensing layer. Robot skin describes the robot application of that sensing layer. One is closer to materials and flexible electronics; the other is closer to robotics integration.',
          'A research article may show a flexible electronic skin sample. A robot skin system needs that sample to survive mounting, bending, wiring, calibration, data handling, and robot use.',
        ],
        bullets: [
          'Use e-skin when the focus is electronic skin material or flexible sensing',
          'Use robot skin when the focus is a robot surface that senses contact',
          'Use tactile AI when the focus is interpreting touch data for action or evaluation',
          'Use tactile sensor when the focus is the sensing element or array itself',
        ],
      },
      {
        heading: 'Where the terms overlap',
        body: [
          'The overlap is large. A soft e-skin wrapped around a robot fingertip is also robot skin. A flexible tactile array on a gripper pad may be described as electronic skin, tactile sensor array, or robot skin depending on the article.',
          'The clearest explanation does not treat every synonym as a separate concept. It gives each term a practical role and connects the overlapping layers.',
        ],
      },
      {
        heading: 'How RoboSkin.ai separates the terms',
        body: [
          'The robot skin page answers the core robotics definition. The e-skin page explains electronic skin. This comparison page resolves the overlap. Research briefs then show source-backed examples.',
          'That structure gives readers one complete comparison instead of several thin explanations that only swap terminology.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Should I search robot skin or e-skin?',
        answer:
          'Search robot skin for robotics applications and e-skin for electronic skin materials or flexible sensing research. Search both when studying tactile surfaces for robots.',
      },
      {
        question: 'Can e-skin be used outside robotics?',
        answer:
          'Yes. E-skin also appears in wearables, health monitoring, prosthetics, human-machine interfaces, and flexible electronics research.',
      },
      {
        question: 'Why not create separate pages for robotic skin, robo skin, and robot skins?',
        answer:
          'Those are mostly wording variants. They should usually be covered inside one strong robot skin page instead of split into thin duplicate pages.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'Definition and robotics context.' },
      { label: 'E-skin', href: '/e-skin', description: 'Electronic skin and flexible sensor context.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How touch data becomes behavior.' },
      { label: 'Soft robotic skin', href: '/applications/soft-robotic-skin', description: 'A robot-facing application of flexible sensing.' },
      { label: 'Flexible tactile sensor array', href: '/guides/flexible-tactile-sensor-array', description: 'The array-level technology behind many skin systems.' },
      { label: 'Glossary', href: '/glossary', description: 'Broader terminology matrix.' },
    ],
  },
  {
    path: '/research/robot-skin-papers',
    title: 'Robot Skin Papers and Tactile Sensing Research Index',
    description:
      'Browse source-backed robot skin papers and research routes for tactile sensing, e-skin, soft robotic skin, robot hands, and tactile AI.',
    h1: 'Robot skin papers and tactile sensing research index',
    kicker: 'Research guide',
    intent: 'Research index for robot skin papers, tactile AI papers, e-skin research, and source-backed technical briefs.',
    updated: '2026-06-06',
    priority: 0.78,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'resources',
    keywords: ['robot skin papers', 'robot skin research', 'tactile AI papers', 'e-skin papers', 'robot tactile sensing research'],
    quickAnswer: [
      'This page organizes RoboSkin.ai research routes for robot skin, tactile AI, e-skin, soft robotic skin, tactile arrays, and robot hand sensing.',
      'It is not a claim that RoboSkin.ai produced the original papers. It is a source-backed editorial index that links public sources to practical robotics interpretation.',
      'Use it as a starting point for understanding which papers map to materials, sensor arrays, full-hand sensing, software pipelines, and application constraints.',
    ],
    sections: [
      {
        heading: 'How to read robot skin papers',
        body: [
          'A strong robot skin paper usually combines material behavior, sensor geometry, signal interpretation, and a use case. A weak reading only looks at the headline claim that robots can feel.',
          'Readers should separate reported experimental results from deployment assumptions. Performance in a lab sample does not automatically transfer to a full humanoid hand or industrial gripper.',
        ],
        bullets: [
          'Identify what signal is measured: pressure, shear, slip, temperature, damage, or multimodal input',
          'Check whether the result is shown on a flat sample, fingertip, full hand, gripper, or body surface',
          'Look for calibration, drift, durability, latency, and data-interface details',
          'Ask whether the tactile signal changes a robot behavior or only demonstrates sensing',
        ],
      },
      {
        heading: 'Research lanes to explore',
        body: [
          'Useful research lanes include materials and e-skin, robot hand tactile sensing, tactile AI software, datasets and benchmarks, and application-specific evaluation.',
          'Each lane gives readers a distinct path through materials, sensing, integration, and robot-learning evidence.',
        ],
      },
      {
        heading: 'Why source boundaries matter',
        body: [
          'This index keeps public source claims separate from RoboSkin.ai editorial analysis. That protects credibility and avoids implying product availability, customer use, benchmark values, or certification claims that are not published.',
          'Visible source boundaries and concrete evaluation questions also make the analysis easier to verify and cite than a generic summary.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this a complete database of robot skin papers?',
        answer:
          'No. It is an initial research route that can incorporate new source-backed briefs organized by material, sensor type, software stack, and application.',
      },
      {
        question: 'What papers should be added first?',
        answer:
          'Prioritize papers that explain full-hand tactile sensing, soft e-skin materials, large-area tactile arrays, ROS 2 or robot middleware pipelines, and tactile datasets.',
      },
      {
        question: 'Why use a research index?',
        answer:
          'A research index gives readers one source-backed route for comparing papers, sensing methods, evidence levels, and implementation limits.',
      },
    ],
    relatedLinks: [
      { label: 'Open the structured research index', href: '/research-index', description: 'Compare normalized sensing principles, modalities, evidence levels, and limitations.' },
      { label: 'Research index', href: '/research', description: 'Existing source-backed technical briefs.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'Core definition and category page.' },
      { label: 'EU FP7 ROBOSKIN project', href: '/research/eu-roboskin-project', description: 'Separate the historical research consortium from the independent RoboSkin.ai platform.' },
      { label: 'E-skin', href: '/e-skin', description: 'Electronic skin and soft sensor context.' },
      { label: 'Submit a source', href: '/contact?requestType=research', description: 'Suggest a paper or correction.' },
    ],
    sources: [
      {
        label: 'University of Cambridge graphene-based artificial skin report',
        href: 'https://www.cam.ac.uk/research/news/graphene-based-artificial-skin-brings-human-like-touch-closer-to-robots',
      },
      {
        label: 'University of Cambridge single-material electronic skin report',
        href: 'https://www.cam.ac.uk/stories/robotic-skin',
      },
      {
        label: 'Nature Machine Intelligence full-hand tactile sensing paper',
        href: 'https://www.nature.com/articles/s42256-025-01053-3',
      },
      {
        label: 'RSC temperature/pressure bimodal tactile sensing review',
        href: 'https://pubs.rsc.org/en/content/articlehtml/2025/tc/d5tc02514a',
      },
      {
        label: 'Frontiers event-based opto-tactile skin article',
        href: 'https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2025.1735068/full',
      },
      {
        label: 'Chemical Engineering Journal self-healing e-skin article',
        href: 'https://www.sciencedirect.com/science/article/pii/S1385894725132531',
      },
      {
        label: 'ROS 2 documentation',
        href: 'https://docs.ros.org/',
      },
      {
        label: 'ACS large-area flexible tactile sensor article',
        href: 'https://pubs.acs.org/doi/10.1021/acsaelm.5c01200',
      },
    ],
    paperBriefIds: [
      'graphene-liquid-metal-3d-force-2026',
      'single-material-soft-robotic-skin-2025',
      'full-hand-tactile-sensing-2025',
    ],
  },
  {
    path: '/guides/robot-skin-vs-tactile-sensor',
    title: 'Robot Skin vs Tactile Sensor: System and Component Difference',
    description:
      'Compare robot skin and tactile sensor terms. Learn when a robot needs a tactile sensor, when it needs robot skin, and how tactile AI connects the system.',
    h1: 'Robot skin vs tactile sensor',
    kicker: 'Comparison guide',
    intent: 'Comparison page for robot skin vs tactile sensor, robot tactile sensor, tactile sensing surface, and robot skin system searches.',
    updated: '2026-06-16',
    priority: 0.8,
    changeFrequency: 'monthly',
    schemaType: 'WebPage',
    visualKey: 'answers',
    keywords: ['robot skin vs tactile sensor', 'tactile sensor component', 'sensor versus system', 'robot skin system', 'robot skin integration'],
    quickAnswer: [
      'A tactile sensor is a component or array that measures contact signals such as pressure, force, shear, slip, strain, or temperature.',
      'Robot skin is the larger robot-facing system: a tactile surface, mounting layer, electronics, calibration, data pipeline, and control or evaluation workflow.',
      'A robot may use tactile sensors without having full robot skin. Robot skin usually includes tactile sensors but also adds coverage, packaging, software, and robot integration constraints.',
    ],
    sections: [
      {
        heading: 'Component versus system',
        body: [
          'A tactile sensor can be a fingertip pad, force cell, pressure matrix, optical tactile unit, flexible array, or multimodal sensing element. It answers what is measured at a contact point or surface.',
          'Robot skin answers a broader robotics question: how a robot surface senses contact across geometry, survives use, routes data, preserves calibration, and gives the robot a usable signal.',
        ],
        bullets: [
          'Use tactile sensor when evaluating the sensing component or output',
          'Use robot skin when evaluating coverage, mounting, durability, and robot integration',
          'Use tactile AI when the touch data changes behavior, classification, or evaluation',
          'Use e-skin when the focus is flexible electronic skin materials',
        ],
      },
      {
        heading: 'Why the distinction matters',
        body: [
          'Treating robot skin and tactile sensors as exact synonyms hides important system boundaries. A good tactile sensor can still fail as robot skin if it cannot be mounted, calibrated, protected, serviced, or synchronized with robot state.',
          'Likewise, a broad robot skin concept still depends on concrete sensor choices. The system needs enough signal quality, spatial coverage, data rate, and reliability for the task.',
        ],
      },
      {
        heading: 'How to evaluate claims',
        body: [
          'Ask whether the source demonstrates a component, a surface, or a robot behavior. A benchtop tactile sensor test is valuable, but it is not the same as a robot hand using robot skin to adjust grip during manipulation.',
          'A useful comparison should identify what was measured, how the sensor was mounted, whether data was logged, and whether the tactile signal changed a real robot decision.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is robot skin just many tactile sensors?',
        answer:
          'Not only. Arrays of tactile sensors can be part of robot skin, but robot skin also includes packaging, coverage, calibration, data handling, replacement strategy, and robot-facing interpretation.',
      },
      {
        question: 'Which term should I use?',
        answer:
          'Use tactile sensor for component selection and measurement questions. Use robot skin for full-surface robot integration, humanoid hands, grippers, and Physical AI contact feedback.',
      },
      {
        question: 'Can one page cover both terms?',
        answer:
          'Yes, when the page explains the distinction. Separate thin pages for every wording variant are weaker than one comparison page with clear related routes.',
      },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'System-level definition and category overview.' },
      { label: 'Tactile sensor for robots', href: '/guides/tactile-sensor-for-robots', description: 'Component selection and evaluation criteria.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How touch data becomes useful robot behavior.' },
      { label: 'Robot skin vs e-skin', href: '/guides/robot-skin-vs-e-skin', description: 'Adjacent terminology comparison.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Hand-level application context.' },
      { label: 'Research routes', href: '/research/robot-skin-papers', description: 'Source-backed research paths.' },
    ],
    sources: [
      {
        label: 'University of Cambridge graphene-based artificial skin report',
        href: 'https://www.cam.ac.uk/research/news/graphene-based-artificial-skin-brings-human-like-touch-closer-to-robots',
      },
      {
        label: 'Nature Machine Intelligence full-hand tactile sensing paper',
        href: 'https://www.nature.com/articles/s42256-025-01053-3',
      },
    ],
    paperBriefIds: ['graphene-liquid-metal-3d-force-2026', 'full-hand-tactile-sensing-2025'],
  },
  {
    path: '/guides/tactile-feedback-for-physical-ai',
    title: 'Tactile Feedback for Physical AI Robots',
    description:
      'Tactile feedback for Physical AI gives robots contact data after vision is blocked. Learn signals, feedback loops, evaluation questions, and robot skin routes.',
    h1: 'Tactile feedback for Physical AI',
    kicker: 'Physical AI guide',
    intent: 'Technology guide for tactile feedback for Physical AI, robot touch feedback, Physical AI tactile sensing, and contact feedback searches.',
    updated: '2026-06-16',
    priority: 0.82,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['tactile feedback for Physical AI', 'Physical AI tactile sensing', 'robot touch feedback', 'contact feedback robots', 'robot skin feedback loop'],
    quickAnswer: [
      'Tactile feedback for Physical AI is the contact signal loop that helps a robot understand what happens after it touches the world.',
      'The loop may include robot skin, fingertip sensors, force or pressure maps, slip events, timestamps, calibration metadata, and controller-facing features.',
      'Useful tactile feedback is not only sensing. It must arrive early enough, map to the robot body, and support grasping, safety, evaluation, or learning.',
    ],
    sections: [
      {
        heading: 'Why Physical AI needs contact feedback',
        body: [
          'Physical AI systems act in the real world, where vision can be blocked by a hand, object, tool, or body surface. Contact feedback gives the robot local evidence at the interaction surface.',
          'Robot skin and tactile sensors can reveal contact location, pressure, shear, slip, and other signals that help the robot decide whether a grasp is stable, unsafe, or changing.',
        ],
        bullets: [
          'Contact location and force patterns after visual occlusion',
          'Early slip events before an object visibly falls',
          'Safety contact and unexpected interaction signals',
          'Replayable tactile logs for evaluation and learning',
        ],
      },
      {
        heading: 'The feedback loop',
        body: [
          'A tactile feedback loop starts when the surface measures contact. Electronics and software timestamp the signal, map it to the robot, extract useful features, and expose those features to a controller, model, or evaluator.',
          'If any layer is missing, the robot may record touch but fail to use it. Physical AI evaluation therefore needs data contracts, latency, calibration, and task-level validation.',
        ],
      },
      {
        heading: 'What to verify',
        body: [
          'The key test is whether tactile feedback changes a robot outcome. A contact classifier is useful, but a stronger demonstration shows grip adjustment, safer contact, better replay diagnostics, or improved manipulation under occlusion.',
          'Claims should stay narrow unless a public source supports broader deployment readiness, benchmark values, or product availability.',
        ],
      },
      {
        heading: 'Physical AI tactile feedback evaluation metrics',
        body: [
          'Evaluation should measure latency, synchronization, drift, repeatability, and task outcome instead of only showing a clean contact map. Physical AI needs feedback that arrives in time, stays aligned with robot state, and changes a real action or evaluation result.',
          'Useful metrics also distinguish sensor quality from system quality. A high-resolution array is not enough if the signal drifts after mounting, loses timing, or cannot be mapped back to the robot body and task.',
        ],
        bullets: [
          'Latency: time from surface contact to controller-usable feature',
          'Synchronization: alignment with joint state, vision frames, commands, and tactile logs',
          'Drift and repeatability: stability after mounting, repeated loading, and surface wear',
          'Task outcome: grasp stability, slip recovery, safety response, replay diagnosis, or evaluation gain',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is tactile feedback for Physical AI the same as robot skin?',
        answer:
          'No. Robot skin can provide tactile feedback, but tactile feedback also includes the data path, timing, interpretation, and controller or evaluation loop.',
      },
      {
        question: 'Why is vision not enough for Physical AI?',
        answer:
          'Vision often loses direct information after contact because the robot hand or object blocks the camera. Tactile feedback measures the interaction where it happens.',
      },
      {
        question: 'What should I read next?',
        answer:
          'Start with the Physical AI explainer, then read robot skin, tactile AI, ROS 2 tactile sensing, and robot hand tactile sensor routes.',
      },
    ],
    relatedLinks: [
      { label: 'Physical AI explainer', href: '/physical-ai', description: 'Canonical RoboSkin.ai Physical AI route.' },
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'The pillar page for touch data in Physical AI.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'Surface-level contact sensing route.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'How touch signals become behavior.' },
      { label: 'ROS 2 tactile sensing', href: '/guides/ros2-tactile-sensing', description: 'Software pipeline and replay context.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Hand-level tactile feedback application.' },
    ],
    sources: [
      {
        label: 'University of Cambridge graphene-based artificial skin report',
        href: 'https://www.cam.ac.uk/research/news/graphene-based-artificial-skin-brings-human-like-touch-closer-to-robots',
      },
      {
        label: 'ROS 2 documentation',
        href: 'https://docs.ros.org/',
      },
    ],
    paperBriefIds: ['graphene-liquid-metal-3d-force-2026', 'ros2-kilted-tactile-pipeline-2026'],
  },
  {
    path: '/guides/tactile-sensor-benchmark-robot-manipulation',
    title: 'Tactile Sensor Benchmark for Robot Manipulation',
    description:
      'Compare visual, acoustic, magnetic, and resistive tactile sensors by manipulation task, signal, integration constraint, and evidence boundary.',
    h1: 'Tactile sensor benchmark for robot manipulation',
    kicker: 'Sensor comparison guide',
    intent: 'Comparison guide for tactile sensor benchmark, robot manipulation tactile sensor comparison, and robot touch sensor evaluation searches.',
    published: '2026-07-20',
    updated: '2026-08-05',
    priority: 0.84,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['tactile sensor benchmark', 'robot manipulation tactile sensor', 'tactile sensor comparison', 'robot touch sensor benchmark', 'visual tactile sensor'],
    quickAnswer: [
      'There is no universal best tactile sensor for robot manipulation. The useful choice depends on the contact event, task geometry, latency, coverage, and controller input the robot needs.',
      'The 2026 TacO preprint compares visual, acoustic, magnetic, and resistive sensing across unknown-mass pick-and-place, object reorientation, and plug insertion. Its central result is task dependence, not one modality winning every task.',
      'A defensible benchmark starts with the robot task, keeps mounting and control conditions visible, and measures whether tactile input changes manipulation outcomes under repeatable disturbances.',
    ],
    sections: [
      {
        heading: 'What a tactile benchmark should answer',
        body: [
          'A sensor specification sheet describes the component. A manipulation benchmark should show whether the resulting signal helps a robot complete a contact-rich task. That requires the sensor, mounting, calibration, data rate, controller, object set, and failure conditions to be reported together.',
          'TacO is useful because it compares four tactile modalities within three manipulation tasks. The paper reports that usefulness varies with task requirements and properties such as spatial resolution, shear sensing, and surface friction. That finding argues for task-first selection instead of a single leaderboard.',
        ],
        bullets: [
          'Define the contact event the robot must detect or regulate',
          'Separate sensor output quality from controller quality',
          'Keep object, mounting, surface, and disturbance conditions comparable',
          'Report task success and failure modes, not only clean sensor maps',
        ],
      },
      {
        heading: 'Separate sensor selection from representation learning',
        body: [
          'TacO and HT-Bench use the word benchmark at different layers. TacO compares how four tactile sensor modalities affect manipulation-policy performance across three tasks. HT-Bench evaluates learned full-hand tactile representations with egocentric vision across contact-geometry, cross-modal, temporal, and unseen-task tests.',
          'These sources should not be collapsed into one leaderboard. A sensor can produce a useful signal while a weak representation fails to preserve it, and a strong representation can still depend on a sensing layout that is impractical for another robot hand.',
        ],
        table: {
          headers: ['Benchmark layer', 'Primary source', 'What it evaluates', 'Do not infer'],
          rows: [
            ['Sensor and policy selection', 'TacO', 'Visual, acoustic, magnetic, and resistive tactile sensing across pick-and-place, reorientation, and insertion.', 'One modality is universally best for every task or sensor implementation.'],
            ['Learned full-hand representation', 'HT-Bench', '10M RGB frames and 7.8M tactile frames across 226 tasks, evaluated through retrieval, inpainting, synthesis, and prediction.', 'The reported encoder or sensing layout transfers to every robot hand and contact distribution.'],
          ],
        },
      },
      {
        heading: 'Four tactile sensing modalities at a glance',
        body: [
          'The table describes engineering tendencies, not TacO winners. Products and research prototypes within the same modality can differ greatly in spatial resolution, bandwidth, force range, shear sensitivity, footprint, and durability.',
        ],
        table: {
          headers: ['Modality', 'Primary signal route', 'Potential advantage', 'Constraint to test', 'Task-fit question'],
          rows: [
            ['Visual', 'A camera observes deformation, markers, or surface appearance inside the sensor.', 'Dense spatial contact geometry and deformation images.', 'Optical stack size, illumination stability, surface wear, frame rate, and compute.', 'Does the task need local contact shape or a dense pressure proxy?'],
            ['Acoustic', 'A microphone or vibration path records contact-generated sound.', 'Transient contact, vibration, impact, and texture cues at high temporal resolution.', 'Ambient noise, structural coupling, repeatable mounting, and signal interpretation.', 'Does the decision depend on fast slip, impact, or texture events?'],
            ['Magnetic', 'Magnetometers measure field changes caused by deformation of an embedded magnetic structure.', 'Compact multi-axis deformation or force-sensitive measurements.', 'Calibration, magnetic interference, temperature effects, and unit-to-unit variation.', 'Does the controller need directional force or shear information in a compact package?'],
            ['Resistive', 'Resistance changes under pressure or deformation across a sensing element or array.', 'Direct contact or pressure response in thin, potentially conformable layouts.', 'Hysteresis, drift, crosstalk, wiring density, and repeated-load behavior.', 'Is broad pressure coverage more important than dense contact geometry?'],
          ],
        },
      },
      {
        heading: 'Benchmark by manipulation task',
        body: [
          'TacO uses three tasks that stress different parts of the tactile pipeline. A team can reuse this structure even when its hardware, robot hand, or object set differs. The important step is to connect each task to a measurable tactile contribution.',
        ],
        table: {
          headers: ['Task', 'Contact problem', 'What to measure', 'Failure question'],
          rows: [
            ['Pick-and-place with unknown mass', 'The robot must establish and maintain a grasp without knowing object mass in advance.', 'Task success, grip adjustment, slip events, excess force, and response latency.', 'Did tactile input prevent slip or crushing when visual appearance did not reveal load?'],
            ['Object reorientation', 'Contacts move across the hand while object pose changes.', 'Pose completion, contact continuity, shear or slip response, and recovery attempts.', 'Could the system distinguish intended rolling or sliding from loss of control?'],
            ['Plug insertion', 'Small pose errors create contact forces that must guide alignment.', 'Insertion success, peak force, completion time, jamming, and corrective actions.', 'Did tactile input reveal useful alignment error before the controller jammed the plug?'],
          ],
        },
      },
      {
        heading: 'A minimum evaluation protocol',
        body: [
          'Run a vision-only or no-tactile baseline beside each tactile condition. Repeat trials across objects, starting poses, surface conditions, and disturbances that matter to deployment. Preserve raw tactile streams, calibrated values, robot state, commands, and outcomes so failures can be replayed.',
          'A fair modality comparison also exposes non-sensor differences. If one system uses a larger model, a faster controller, different fingertips, or extra object-specific tuning, the result is a system comparison rather than isolated sensor evidence.',
        ],
        bullets: [
          'Task success rate with uncertainty or trial counts',
          'Contact-to-feature and feature-to-action latency',
          'Calibration drift before and after repeated loading',
          'Performance on held-out objects, poses, and surface conditions',
          'Mounting, replacement, cleaning, wiring, and compute burden',
          'Replayable failures linked to tactile and robot-state logs',
        ],
      },
      {
        heading: 'Claim boundary',
        body: [
          'TacO is a 2026 preprint. Its comparison is evidence for the reported sensors, tasks, robot setup, and protocol; it does not establish a permanent ranking for every visual, acoustic, magnetic, or resistive tactile sensor.',
          'Use the paper as a benchmark design reference and verify code, data, hardware details, and later peer-reviewed revisions before treating a result as procurement evidence. A production decision also needs durability, replacement, environmental, and integration testing that a manipulation benchmark may not cover.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which tactile sensor modality is best for robot manipulation?',
        answer:
          'No modality is best for every task. Choose from the contact signal and task outcome required, then compare candidate sensors under the same mounting, controller, objects, and disturbances.',
      },
      {
        question: 'Can sensor resolution predict manipulation success?',
        answer:
          'Not by itself. Spatial resolution can matter, but latency, shear sensitivity, friction, force range, calibration, coverage, and controller design can change the result.',
      },
      {
        question: 'What is the most important tactile benchmark baseline?',
        answer:
          'Use the same manipulation system without tactile input or with the tactile pathway disabled. This shows whether touch changes the task outcome instead of merely producing an attractive signal visualization.',
      },
      {
        question: 'Is TacO a final industry standard?',
        answer:
          'No. It is a 2026 preprint and a useful task-based comparison framework. It should not be treated as a certification standard or universal modality ranking.',
      },
    ],
    relatedLinks: [
      { label: 'HT-Bench research brief', href: '/research/ht-bench-full-hand-tactile-representations-2026', description: 'Review the full-hand tactile representation benchmark and its transfer limits.' },
      { label: 'Tactile datasets for robot learning', href: '/datasets', description: 'Compare dataset scope, splits, signals, and transfer limits.' },
      { label: 'Tactile foundation models', href: '/tactile-foundation-models', description: 'Compare representation, world-model, and policy roles.' },
      { label: 'Tactile sensor for robots', href: '/guides/tactile-sensor-for-robots', description: 'Component selection and integration criteria.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Hand coverage, contact, and manipulation context.' },
      { label: 'Slip detection for robot hands', href: '/guides/slip-detection-robot-hand', description: 'Evaluate slip signals and closed-loop response.' },
      { label: 'Research index', href: '/research-index', description: 'Filter source-backed records by modality and evidence.' },
    ],
    sources: [
      { label: 'TacO tactile sensor benchmark preprint', href: 'https://arxiv.org/abs/2605.21976' },
      { label: 'HT-Bench full-hand tactile representation benchmark preprint', href: 'https://arxiv.org/abs/2606.19161' },
      { label: 'Nature Machine Intelligence full-hand tactile sensing paper', href: 'https://www.nature.com/articles/s42256-025-01053-3' },
    ],
    paperBriefIds: ['ht-bench-full-hand-tactile-representations-2026', 'open-source-magnetic-tactile-calibration-2024', 'full-hand-tactile-sensing-2025'],
  },
  {
    path: '/datasets',
    title: 'Tactile Robotics Datasets for Robot Learning',
    description:
      'Compare tactile datasets for robot learning by signals, collection unit, split design, task fit, access evidence, and transfer limits.',
    h1: 'Tactile datasets for robot learning',
    kicker: '12-record dataset directory',
    intent: 'Resource guide for tactile datasets, robot learning touch data, visuo-tactile datasets, and tactile manipulation dataset searches.',
    published: '2026-07-20',
    updated: '2026-08-19',
    priority: 0.92,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'resources',
    keywords: ['tactile dataset robotics', 'robot tactile dataset', 'visuo-tactile dataset', 'tactile manipulation dataset', 'tactile datasets for robot learning', 'tactile benchmark robotics'],
    quickAnswer: [
      'A useful tactile dataset is defined by more than frame count. Check the physical collection event, sensor and robot state alignment, object and task diversity, split unit, access terms, and downstream evaluation.',
      'Contact sequences matter because adjacent tactile frames from the same press or trajectory are strongly related. Random frame splits can leak near-duplicate contact evidence into both training and test sets.',
      'Choose the dataset that matches the intended learning problem: material understanding, whole-hand contact, imitation learning, multisensory representation learning, or target-robot control.',
    ],
    sections: [
      {
        heading: 'How to read this directory',
        body: [
          'The entries below are research resources with different goals; they are not interchangeable rows in one leaderboard. Some emphasize tactile-language and material understanding, others whole-hand contact, data collection, humanoid action alignment, or multisensory representation learning.',
          'Before use, open the primary source and project page. Verify the actual downloadable files, license, sensor hardware, collection protocol, annotations, train-test splits, and version. A paper saying that a resource is open does not replace checking the current repository terms.',
        ],
      },
      {
        heading: 'Tactile dataset and resource comparison',
        body: [
          'This comparison records the main research unit and the limit a user should preserve. Counts are included only where the primary source states them clearly.',
        ],
        table: {
          headers: ['Resource', 'Signals and scale', 'Best-fit question', 'Evaluation unit', 'Evidence boundary'],
          rows: [
            ['HT-Bench', '10M egocentric RGB frames and 7.8M full-hand tactile frames collected across 226 tasks.', 'Full-hand tactile representation learning, cross-modal alignment, and unseen-task evaluation.', 'Split by task and trajectory; test held-out tasks, objects, sensor units, or embodiments for the claimed transfer.', 'A 2026 preprint. Scale does not make temporally adjacent frames independent, and reported results are specific to the benchmark setup.'],
            ['RCT', '29,279 tactile frames from 122 industrial reference materials in 7 categories, collected with 3 DIGIT sensors; paired touch, image, language, and force context.', 'Material understanding and tactile-language retrieval.', 'Keep full press or contact sequences together; test held-out materials where possible.', 'A 2026 preprint. Reported performance is specific to its sensors, materials, models, and splits.'],
            ['TactiDex', 'Whole-hand tactile observations aligned with multi-granularity kinematic and object states for single-hand and bimanual tasks.', 'Contact-rich dexterity and transfer across manipulation settings.', 'Use the standardized task and transfer protocol described by the source.', 'A 2026 preprint and project resource; inspect the released tasks, files, and license before reuse.'],
            ['FreeTacMan', 'Paired visuo-tactile observations and interaction trajectories collected with a portable, human-operated workflow.', 'Scaling contact-rich demonstrations without occupying a robot arm for every collection session.', 'Split by task, object, trajectory, and operator conditions that match the transfer claim.', 'A 2025 preprint; human-device data still needs validation on the target robot embodiment.'],
            ['Humanoid visual-tactile-action dataset', 'Synchronized vision, tactile observations, and action context for humanoid contact-rich manipulation.', 'Learning policies that need touch aligned with the action that produced it.', 'Keep synchronized trajectory segments and embodiment conditions intact.', 'A preprint; transfer depends on robot geometry, sensor placement, action space, and task distribution.'],
            ['Sparsh-X research resource', 'Digit 360 tactile images, audio, motion, and pressure used for self-supervised multisensory touch representations.', 'Learning reusable tactile features across physical-property and manipulation tasks.', 'Evaluate downstream tasks and held-out conditions, not only pretraining loss.', 'A 2025 preprint tied to a multisensory sensor stack; cross-sensor transfer still requires evidence.'],
            ['Touch and Go', 'Approximately 13.9K detected touches across indoor and outdoor scenes with egocentric vision and GelSight recordings.', 'In-the-wild visuo-tactile representation learning and future-touch prediction.', 'Split by object, scene, video, or collection sequence for the intended claim.', 'The object-instance count is estimated in the paper and the collection is human-operated rather than robot-action data.'],
            ['TVL', '43,741 in-contact image-touch pairs with English tactile descriptions.', 'Touch-vision-language alignment and tactile description.', 'Keep HCT and SSVTP origins, contact events, and human versus generated labels visible.', 'The paper reports that 90% of labels are VLM-generated and documents occasional label errors.'],
            ['ObjectFolder Real / 2.0', '100 real household objects plus 1,000 neural objects with visual, acoustic, tactile, and geometric data.', 'Multisensory object recognition, reconstruction, and manipulation.', 'Separate real measurements from simulated neural-object rendering.', 'Synthetic and real results are not interchangeable; use the exact release and task protocol.'],
            ['TacVerse', '106,800 tactile images collected from seven vision-based tactile sensors.', 'Within-sensor learning, zero-shot cross-sensor transfer, and few-shot adaptation.', 'Hold out complete sensor domains according to the published protocol.', 'A 2026 preprint; no separate official download page was verified at review time.'],
            ['VTDexManip', 'Visual-tactile data from 10 daily manipulation tasks across 182 objects plus a six-task dexterous benchmark.', 'Visual-tactile pretraining and policy evaluation.', 'Use task, object, modality, and policy splits that match the transfer claim.', 'The official code is MIT-licensed; dataset-file rights need separate verification.'],
          ],
        },
      },
      {
        heading: 'Why contact-sequence splits matter',
        body: [
          'RCT reports 29,279 frames but also preserves full contact sequences. Frames from one press are correlated, so a random frame-level split can place nearly the same physical event in training and test data. The paper reports that removing contact-sequence overlap reduces tactile-to-text Recall@1 by 17.7 percentage points.',
          'The broader rule is to split at the level of the claim. For unseen-material performance, hold out materials. For unseen-object manipulation, hold out objects. For transfer across robots or sensors, hold out the target hardware. A large test set is not independent if the same contact event, object instance, or trajectory appears on both sides.',
        ],
        bullets: [
          'Record the physical unit: press, grasp, trajectory, object, task, operator, robot, and sensor',
          'Group correlated frames before creating train, validation, and test sets',
          'Publish split manifests or deterministic split code',
          'Report results for the hardest held-out condition relevant to the claim',
        ],
      },
      {
        heading: 'Dataset selection checklist',
        body: [
          'Start from the deployment mismatch you need to measure. A material dataset may be rich enough for tactile-language learning but unsuitable for action-conditioned robot control. A whole-hand trajectory dataset may support dexterity research but still mismatch a fingertip sensor, gripper geometry, or action space.',
        ],
        bullets: [
          'Access: files, repository status, license, citation, version, and checksum',
          'Hardware: sensor model, serial variation, placement, sampling rate, calibration, and units',
          'Alignment: timestamps for touch, vision, force, pose, joint state, and actions',
          'Coverage: objects, materials, tasks, contact types, operators, robots, and disturbances',
          'Splits: sequence, object, material, task, sensor, or embodiment independence',
          'Outcome: retrieval, classification, prediction, imitation, or real-robot task success',
        ],
      },
      {
        heading: 'What dataset size does not prove',
        body: [
          'Frame count does not establish diversity, independent evaluation, target-robot transfer, or production readiness. Ten thousand adjacent frames from a small set of presses can contain less independent evidence than a smaller collection spread across objects, sensors, and trajectories.',
          'Use this directory to locate sources, then document the exact dataset version and split used in your experiment. Do not compare headline metrics across resources unless the sensor inputs, tasks, models, and evaluation protocols are genuinely aligned.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best tactile dataset for robot learning?',
        answer:
          'There is no universal best dataset. Match the resource to the learning goal, sensor signals, robot embodiment, task, and evaluation split required by the deployment claim.',
      },
      {
        question: 'Why are random frame splits risky for tactile data?',
        answer:
          'Adjacent frames from the same press, grasp, or trajectory can be near duplicates. If they appear in both training and test sets, the metric can overstate generalization.',
      },
      {
        question: 'Does open source mean unrestricted commercial use?',
        answer:
          'No. Open access to a paper, project page, code, or files does not define commercial rights. Check the license for the exact dataset version and every bundled asset.',
      },
      {
        question: 'Should tactile datasets include robot actions?',
        answer:
          'They should when the goal is policy learning, action-conditioned prediction, or replay of manipulation. Material recognition or representation learning may use different labels and collection units.',
      },
    ],
    relatedLinks: [
      { label: 'Tactile benchmarks', href: '/benchmarks', description: 'Separate data access from evaluation tasks, splits, metrics, and baselines.' },
      { label: 'Tactile sensors', href: '/sensors', description: 'Compare the hardware and raw signals behind dataset records.' },
      { label: 'Tactile manipulation', href: '/tactile-manipulation', description: 'Connect aligned trajectories to closed-loop robot outcomes.' },
      { label: 'Visuo-tactile robotics', href: '/visuo-tactile', description: 'Review vision-touch alignment and multimodal model roles.' },
      { label: 'Tactile foundation models', href: '/tactile-foundation-models', description: 'See how tactile resources support representations, prediction, and control.' },
      { label: 'Visuo-tactile world models', href: '/guides/visuo-tactile-world-models-robot-manipulation', description: 'See how aligned trajectories support prediction, rollouts, and planning.' },
      { label: 'Tactile sensor benchmark', href: '/guides/tactile-sensor-benchmark-robot-manipulation', description: 'Connect data quality to task-level sensor evidence.' },
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'Map contact events, timestamps, robot state, and actions.' },
      { label: 'ROS 2 tactile sensing', href: '/guides/ros2-tactile-sensing', description: 'Build replayable tactile logs and aligned robot data.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'Follow the sensing-to-behavior stack.' },
      { label: 'Research index', href: '/research-index', description: 'Browse source-backed tactile research records.' },
    ],
    sources: [
      { label: 'HT-Bench full-hand tactile benchmark preprint', href: 'https://arxiv.org/abs/2606.19161' },
      { label: 'RCT dataset preprint', href: 'https://arxiv.org/abs/2606.31694' },
      { label: 'RCT dataset project page', href: 'https://faerber-lab.github.io/RCT/' },
      { label: 'TactiDex dataset preprint', href: 'https://arxiv.org/abs/2607.09190' },
      { label: 'TactiDex project page', href: 'https://tactidex.github.io/' },
      { label: 'FreeTacMan preprint', href: 'https://arxiv.org/html/2506.01941v1' },
      { label: 'Humanoid visual-tactile-action dataset preprint', href: 'https://arxiv.org/html/2510.25725v2' },
      { label: 'Sparsh-X multisensory touch preprint', href: 'https://arxiv.org/html/2506.14754v1' },
      { label: 'Touch and Go paper', href: 'https://arxiv.org/abs/2211.12498' },
      { label: 'TVL project page', href: 'https://tactile-vlm.github.io/' },
      { label: 'ObjectFolder project page', href: 'https://objectfolder.stanford.edu/' },
      { label: 'TacVerse preprint', href: 'https://arxiv.org/abs/2606.25877' },
      { label: 'VTDexManip project page', href: 'https://lqts.github.io/VTDexManip/' },
    ],
    paperBriefIds: ['ht-bench-full-hand-tactile-representations-2026', 'freetacman-robot-free-visuotactile-data-collection-2025', 'humanoid-visual-tactile-action-dataset-2025'],
  },
  {
    path: '/tactile-foundation-models',
    title: 'Tactile Foundation Models for Robotics',
    description:
      'Compare tactile foundation models and related robot-learning systems by representation, prediction, policy role, evidence, and transfer limits.',
    h1: 'Tactile foundation models for robotics compared',
    kicker: 'Tactile AI model guide',
    intent: 'Comparison guide for tactile foundation models, reusable touch representations, tactile AI models, and robot learning system roles.',
    published: '2026-07-20',
    updated: '2026-08-16',
    priority: 0.91,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['tactile foundation model', 'tactile AI model', 'multimodal tactile model', 'visuo-tactile model', 'tactile representation learning', 'robot touch representation'],
    quickAnswer: [
      'Tactile foundation model is not one fixed architecture. Current systems may learn reusable touch representations, predict future tactile observations, combine vision-language planning with tactile control, or adapt heterogeneous sensor streams for imitation learning.',
      'Sparsh-X, Dream-Tac, TouchWorld, and MiTaS address different layers of the tactile AI stack. Their metrics are not a direct leaderboard because the sensors, tasks, training data, baselines, and outputs differ.',
      'Evaluate a model by the role touch plays, the transfer claim it tests, the robot task it changes, and the latency and hardware assumptions required at deployment.',
    ],
    sections: [
      {
        heading: 'Four different jobs for tactile learning',
        body: [
          'A reusable representation compresses raw tactile signals into features for later tasks. A world model predicts how touch may change after an action. A policy converts observations and goals into robot actions. A residual tactile controller makes fast local corrections around a slower plan.',
          'These roles can be combined, but they should not be confused. A model that improves material classification has not automatically demonstrated dexterous control. A policy with high task success has not automatically shown broad transfer across tactile sensors.',
        ],
      },
      {
        heading: 'Model and system comparison',
        body: [
          'The table compares architectural role and evidence boundary. It does not rank unlike systems by one score. MiTaS is included as a related tactile learning system, not labeled here as a general-purpose foundation model.',
        ],
        table: {
          headers: ['System', 'Primary level', 'Role of tactile data', 'Reported evaluation focus', 'Evidence boundary'],
          rows: [
            ['Sparsh-X', 'Self-supervised multisensory representation', 'Fuses Digit 360 image, audio, motion, and pressure into reusable touch features.', 'Physical-property inference and contact-rich manipulation tasks.', '2025 preprint; sensor stack and cross-hardware transfer assumptions must be checked.'],
            ['Dream-Tac', 'Tactile world-action model', 'Predicts future visual and tactile observations conditioned on robot actions.', 'Contact-rich manipulation where anticipating tactile futures can support action selection.', '2026 preprint; reported tasks and hardware do not establish universal world-model transfer.'],
            ['TouchWorld', 'Hierarchical planning and tactile control system', 'Combines vision-language planning, tactile world-model prediction, goal-conditioned action, and high-frequency tactile residual correction.', 'Six dexterous manipulation tasks in clean and perturbed conditions.', '2026 preprint; reported success rates are specific to its tasks, sensors, data, and baselines.'],
            ['MiTaS', 'Multi-resolution tactile imitation learning', 'Aligns vision-based and event-based tactile streams with different spatial and temporal properties.', 'Robot-hand imitation learning with heterogeneous tactile inputs.', '2026 preprint and related learning system; it does not by itself establish a general tactile foundation model.'],
          ],
        },
      },
      {
        heading: 'How to compare tactile models fairly',
        body: [
          'First match the output. Representation quality should be tested on held-out downstream tasks and conditions. World-model quality needs prediction metrics plus evidence that prediction improves action. Policy quality needs real-robot task outcomes, disturbances, baselines, and trial counts.',
          'Then expose the hardware contract. Note every tactile modality, sensor model, placement, sampling rate, calibration path, preprocessing step, and synchronization assumption. A model that accepts tactile images from one fingertip does not automatically accept whole-hand force arrays or acoustic touch streams.',
        ],
        bullets: [
          'Transfer across objects, tasks, sensors, placements, robots, and environments',
          'Ablation showing what tactile input adds beyond vision and proprioception',
          'Pretraining data composition and train-test independence',
          'Online latency, update rate, compute, and controller interface',
          'Recovery under slip, occlusion, contact uncertainty, and external disturbance',
          'Availability and license for model weights, code, data, and evaluation tasks',
        ],
      },
      {
        heading: 'Where TouchWorld fits',
        body: [
          'TouchWorld reports a hierarchical system with slower semantic planning and faster tactile correction. The preprint reports 65.0% success in clean conditions and 53.7% under perturbations across six tasks, with improvements of 15.7 and 18.5 percentage points over its strongest reported baseline.',
          'Those numbers are useful within the paper protocol, not as a general score for all tactile foundation models. The architectural lesson is more portable: semantic task reasoning and high-frequency contact correction operate on different time scales and may need separate pathways.',
        ],
      },
      {
        heading: 'What foundation does not guarantee',
        body: [
          'The word foundation does not guarantee sensor independence, zero-shot robot transfer, safe contact, low latency, public weights, or production readiness. Each of those needs separate evidence. A large pretraining corpus can still contain split leakage or narrow sensor coverage.',
          'For deployment, treat the model as one layer in a tactile system. The surface, calibration, synchronization, robot state, control loop, failure logging, and task benchmark still determine whether learned touch changes behavior reliably.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is a tactile foundation model?',
        answer:
          'It generally refers to a model trained on broad tactile data so its representations or learned dynamics can support multiple downstream touch tasks. The term is used inconsistently, so always inspect the exact transfer experiments.',
      },
      {
        question: 'Is a tactile world model the same as a tactile foundation model?',
        answer:
          'No. A tactile world model predicts future tactile observations or contact dynamics. It may be pretrained broadly, but world modeling describes its predictive role, not the breadth of its transfer evidence.',
      },
      {
        question: 'Can one tactile model work with every sensor?',
        answer:
          'Not without evidence. Tactile sensors expose different images, forces, events, audio, pressure arrays, rates, and calibration assumptions. Cross-sensor transfer must be designed and tested explicitly.',
      },
      {
        question: 'Should model comparisons use task success or offline metrics?',
        answer:
          'Use both when possible. Offline metrics diagnose representation or prediction quality; real-robot task success shows whether the tactile pathway changes manipulation under execution noise.',
      },
    ],
    relatedLinks: [
      { label: 'Robot VLA models', href: '/robot-vla-models', description: 'Place tactile models inside the broader vision-language-action and robot foundation-model landscape.' },
      { label: 'Visuo-tactile world models', href: '/guides/visuo-tactile-world-models-robot-manipulation', description: 'Compare action-conditioned contact prediction, planning, and rollout evidence.' },
      { label: 'Tactile datasets for robot learning', href: '/datasets', description: 'Compare training resources, splits, signals, and access evidence.' },
      { label: 'Tactile sensor benchmark', href: '/guides/tactile-sensor-benchmark-robot-manipulation', description: 'Evaluate the hardware and task layer beneath learned models.' },
      { label: 'TouchWorld news brief', href: '/news/touchworld-tactile-foundation-model-dexterous-manipulation-2026', description: 'Read the source-bounded summary of the 2026 preprint.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'Map sensors, data, models, control, and validation.' },
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'Define replayable contact data for embodied systems.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Connect models to fingertip, palm, and whole-hand sensing.' },
    ],
    sources: [
      { label: 'Sparsh-X multisensory touch preprint', href: 'https://arxiv.org/html/2506.14754v1' },
      { label: 'Dream-Tac tactile world-action model preprint', href: 'https://arxiv.org/html/2606.08737v1' },
      { label: 'TouchWorld tactile foundation model preprint', href: 'https://arxiv.org/abs/2607.07287' },
      { label: 'MiTaS multi-resolution tactile imitation learning preprint', href: 'https://arxiv.org/html/2606.06281v1' },
    ],
    paperBriefIds: ['sparsh-x-multisensory-touch-representations-2025', 'dream-tac-tactile-world-action-model-2026', 'mitas-multi-resolution-tactile-imitation-learning-2026'],
  },
  {
    path: '/guides/visuo-tactile-world-models-robot-manipulation',
    title: 'Visuo-Tactile World Models for Robot Manipulation',
    description:
      'Compare 2026 visuo-tactile world models by predicted contact state, planning role, robot evidence, source-reported results, and transfer limits.',
    h1: 'Visuo-tactile world models for robot manipulation',
    kicker: '2026 world-model guide',
    intent: 'Technical comparison for visuo-tactile world models, tactile world models, robot world models, and contact-rich manipulation searches.',
    published: '2026-08-15',
    updated: '2026-08-15',
    priority: 0.87,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['visuo-tactile world models', 'tactile world model', 'robot world model', 'world model robot manipulation', 'contact-rich manipulation'],
    quickAnswer: [
      'A visuo-tactile world model predicts how visual and tactile state may change after a robot action. Touch grounds the imagined future in contact that cameras may miss, including contact onset, force-related state, slip, and hidden object motion.',
      'The useful test is not whether a generated rollout looks plausible. Evaluation should show physical consistency, tactile prediction, planning or policy improvement, real-robot outcomes, and transfer beyond the training objects, sensors, tasks, or embodiment.',
      'VT-WM, Dream-Tac, TouchWorld, ViTacWorld, and FeelWorld solve different parts of the problem. Their source-reported metrics are not a common leaderboard because their targets, tasks, baselines, horizons, sensors, and control roles differ.',
    ],
    sections: [
      {
        heading: 'What is a visuo-tactile world model?',
        body: [
          'A robot world model estimates a future state conditioned on the current observation and a candidate action. A visuo-tactile world model adds measured or predicted touch to that future. Depending on the system, the tactile target may be an image, a learned latent, contact state, force-related information, slip, or a tactile subgoal used by a policy.',
          'This matters most after contact begins. The hand can occlude the object, an insertion can look visually aligned while mechanically jammed, and a grasp can appear stable while beginning to slip. Touch does not make the prediction automatically correct, but it exposes physical interaction evidence that a visual-only model may not observe.',
        ],
      },
      {
        heading: '2026 visuo-tactile world model comparison',
        body: [
          'The rows below preserve the role and evidence boundary of each source. Relative improvements are included only when the arXiv abstract states them, and every number remains tied to the authors’ protocol.',
        ],
        table: {
          headers: ['System', 'World-model role', 'Source-reported evidence', 'What it does not establish'],
          rows: [
            ['VT-WM', 'Learns multi-task visual and tactile contact dynamics for imagination and planning.', 'The preprint reports 33% better object permanence, 29% better compliance with motion laws, and up to 35% higher zero-shot real-robot success.', 'The relative gains are tied to the reported tasks and baselines; they do not establish universal sensor or embodiment transfer.'],
            ['Dream-Tac', 'Jointly models robot actions, future visual observations, and tactile dynamics with contact-gated fusion.', 'Across six tasks, the preprint reports 31.7% average action-accuracy improvement, up to 2.9x faster training, and 1.8x faster inference.', 'The relative gains are tied to the reported tasks and baselines; faster inference does not by itself prove safe control or hardware transfer.'],
            ['TouchWorld', 'Combines predicted tactile subgoals with visuo-tactile action generation and fast tactile residual correction.', 'Across six tasks, the preprint reports 65.0% clean success and 53.7% under perturbations, 15.7 and 18.5 percentage points above its strongest reported baseline.', 'It is a hierarchical predictive-and-reactive system, not a common-score comparison with the other rows.'],
            ['ViTacWorld', 'Generates aligned visual-tactile-action rollouts for data augmentation and action-conditioned policy evaluation.', 'The preprint reports physically meaningful rollouts, downstream policy improvement, and policy evaluation using public real data plus simulation.', 'Its abstract does not provide one universal gain; simulation-to-real behavior and policy-evaluation accuracy remain setup-specific.'],
            ['FeelWorld', 'Predicts contact state, a force-related 3D tactile latent, slip, and visual futures for contact-aware planning.', 'The preprint reports 10-step LPIPS from 0.084 to 0.058, 61% lower LPIPS than the visual baseline after 80 steps, and 81.7% average zero-shot planning success.', 'LPIPS is not a direct force or safety metric, and the three reported task setups do not prove broad robot transfer.'],
          ],
        },
      },
      {
        heading: 'How predicted touch enters robot planning',
        body: [
          'A candidate action can be rolled through the model to produce an imagined visual and tactile sequence. A planner can then score that sequence for contact creation, stability, slip, task progress, or failure risk. ViTacWorld adds another use: generating rollouts to augment tactile policy data and evaluating candidate policies under controlled action sequences.',
          'Prediction and feedback have different jobs. TouchWorld explicitly separates slower semantic and predictive planning from high-frequency tactile residual correction. That division is important because an imagined contact future can guide an action, while measured touch still has to correct errors when the real object, friction, alignment, or force differs from the model.',
        ],
        bullets: [
          'Observe: synchronize vision, tactile data, robot state, and the action that caused contact',
          'Predict: generate future visual, contact, tactile, or slip state for candidate actions',
          'Score: define task progress and contact-risk costs that can be checked in the predicted rollout',
          'Act: execute only the selected action or short action chunk',
          'Correct: use fresh tactile feedback when real contact diverges from the prediction',
          'Log: preserve prediction error, measured touch, robot state, and outcome for later evaluation',
        ],
      },
      {
        heading: 'A minimum evaluation protocol',
        body: [
          'World-model evaluation needs both offline and embodied evidence. Image similarity can diagnose visual rollout quality, but contact prediction needs its own labels or measurements. Planning claims need repeated real-robot trials, comparable baselines, trial counts, held-out conditions, and failures that can be replayed.',
          'Split sequential tactile data by complete trajectory, object, task, sensor, or embodiment according to the transfer claim. Random frame splits can place nearly identical moments from one contact event on both sides of evaluation and make prediction look more general than it is.',
        ],
        bullets: [
          'Visual-only, tactile-reactive, and no-world-model baselines',
          'Contact onset, tactile-state, slip, and visual prediction reported separately',
          'Short- and long-horizon rollout error with uncertainty',
          'Real-robot success, failure mode, disturbance, and trial count',
          'Held-out objects, surfaces, tasks, sensors, and robot embodiments',
          'Online latency, planning budget, tactile update rate, and correction-loop rate',
        ],
      },
      {
        heading: 'Claim boundary for the 2026 evidence',
        body: [
          'All five systems in this comparison are 2026 arXiv preprints as reviewed on August 15, 2026. Their reported results are useful research evidence, but they are not independent validation, certification, production benchmarks, or proof that one model is best across robots.',
          'Do not compare isolated percentages across rows. Each paper uses different prediction targets, horizons, tasks, policies, sensors, baselines, and success definitions. Open the primary source, confirm the current version and released assets, then reproduce the relevant task and hardware contract before making an engineering decision.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is a visuo-tactile world model?',
        answer:
          'It is an action-conditioned model that predicts future visual and tactile state. The tactile output may represent contact, force-related state, slip, a tactile image, a learned latent, or a policy subgoal.',
      },
      {
        question: 'Why add touch to a robot world model?',
        answer:
          'Touch exposes contact dynamics that cameras may miss under occlusion or ambiguous alignment. It can help a model represent whether contact begins, remains stable, slips, jams, or changes after an action.',
      },
      {
        question: 'Is a tactile world model the same as a tactile foundation model?',
        answer:
          'No. World model describes an action-conditioned predictive role. Foundation model implies broad pretraining and transfer across downstream tasks. A system can be one, both, or neither depending on its actual training and evidence.',
      },
      {
        question: 'Which metric should compare visuo-tactile world models?',
        answer:
          'There is no single sufficient metric. Use modality-specific prediction error, physical consistency, planning or policy improvement, real-robot task outcomes, latency, and held-out transfer under the same protocol.',
      },
      {
        question: 'Are 2026 visuo-tactile world models production ready?',
        answer:
          'The sources reviewed here are preprints. Production readiness still needs independent reproduction plus evidence for latency, calibration drift, durability, failure recovery, sensor replacement, and the target robot environment.',
      },
    ],
    relatedLinks: [
      { label: 'Robot VLA models', href: '/robot-vla-models', description: 'Connect world-model prediction to the broader robot policy and embodied-reasoning stack.' },
      { label: 'FeelWorld research brief', href: '/research/feelworld-visuo-tactile-world-model-2026', description: 'Review hierarchical contact, tactile-state, slip, and planning evidence.' },
      { label: 'Tactile foundation models', href: '/tactile-foundation-models', description: 'Compare representations, policies, world-model roles, and transfer claims.' },
      { label: 'Dream-Tac research brief', href: '/research/dream-tac-tactile-world-action-model-2026', description: 'Read the action-conditioned tactile-future analysis.' },
      { label: 'TouchWorld news brief', href: '/news/touchworld-tactile-foundation-model-dexterous-manipulation-2026', description: 'See how predictive planning and fast tactile correction are separated.' },
      { label: 'Tactile datasets', href: '/datasets', description: 'Evaluate trajectories, sequence splits, signals, and transfer limits.' },
      { label: 'Robot hand tactile sensor', href: '/applications/robot-hand-tactile-sensor', description: 'Connect model inputs to fingertip, palm, and whole-hand sensing.' },
      { label: 'Research index', href: '/research-index', description: 'Browse structured source, evidence, modality, and limitation records.' },
    ],
    sources: [
      { label: 'Visuo-Tactile World Models preprint', href: 'https://arxiv.org/abs/2602.06001' },
      { label: 'Dream-Tac tactile world-action model preprint', href: 'https://arxiv.org/abs/2606.08737' },
      { label: 'TouchWorld predictive-and-reactive tactile model preprint', href: 'https://arxiv.org/abs/2607.07287' },
      { label: 'ViTacWorld scalable visuo-tactile world model preprint', href: 'https://arxiv.org/abs/2607.22530' },
      { label: 'FeelWorld hierarchical contact prediction preprint', href: 'https://arxiv.org/abs/2607.24267' },
    ],
    paperBriefIds: ['feelworld-visuo-tactile-world-model-2026', 'dream-tac-tactile-world-action-model-2026'],
  },
  {
    path: '/benchmarks',
    title: 'Tactile Robotics Benchmarks for Robot Learning',
    description:
      'Compare tactile robotics benchmarks by task, sensor, robot, modality, metric, split protocol, access, and evidence boundary.',
    h1: 'Tactile robotics benchmarks compared',
    kicker: 'Structured benchmark directory',
    intent: 'Research directory for tactile benchmark robotics, tactile sensing benchmarks, robot manipulation evaluation, and visuo-tactile benchmark searches.',
    published: '2026-08-19',
    updated: '2026-08-19',
    priority: 0.91,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'resources',
    keywords: ['tactile benchmark robotics', 'tactile sensing benchmark', 'robot tactile benchmark', 'tactile manipulation benchmark', 'visuo-tactile benchmark'],
    quickAnswer: [
      'A tactile robotics benchmark is a defined evaluation contract: task, sensor input, robot or collection platform, data split, metric, baseline, and version. A dataset becomes a benchmark only when it is paired with a reproducible protocol.',
      'Benchmark scores are not portable across different tactile sensors, robots, objects, control rates, or success definitions. Compare systems only inside the same protocol or reproduce both under one shared setup.',
      'For manipulation, always include an outcome-level baseline with touch disabled. Representation accuracy alone does not prove that tactile sensing improves robot behavior.',
    ],
    sections: [
      {
        heading: 'What makes a tactile benchmark credible?',
        body: [
          'A credible benchmark states what is held constant and what is allowed to vary. At minimum, it identifies the physical data unit, sensor and robot configuration, training information, split unit, metric, baseline, evaluation repetitions, and failure definition.',
          'Tactile data are unusually vulnerable to leakage because adjacent frames from the same press, grasp, or trajectory can be nearly identical. The correct split unit follows the claim: hold out presses for new-contact evaluation, materials for material generalization, sensors for cross-sensor transfer, and objects or tasks for manipulation transfer.',
        ],
        bullets: [
          'Input contract: raw tactile images, taxel arrays, force vectors, touch plus vision, or learned embeddings',
          'Independence unit: frame, contact sequence, object, material, task, sensor, robot, or laboratory',
          'Outcome: perception accuracy, prediction error, task success, recovery, latency, or safety event',
          'Reproducibility: released data, split manifest, evaluation code, hardware description, and version',
        ],
      },
      {
        heading: 'Benchmark families are not one leaderboard',
        body: [
          'The directory includes representation suites, multimodal understanding tests, cross-sensor transfer protocols, full-hand benchmarks, and closed-loop manipulation challenges. They answer different questions and should not be collapsed into a single ranking.',
        ],
        table: {
          headers: ['Benchmark family', 'Primary question', 'Typical unit', 'Useful output', 'Common mistake'],
          rows: [
            ['Representation', 'Does an encoder preserve contact information that transfers to downstream tasks?', 'Tactile frame, clip, or contact sequence', 'Frozen-encoder task metrics and data-efficiency curves', 'Treating average improvement across unlike tasks as one universal score'],
            ['Cross-sensor', 'Does a model survive a change in sensor design or instance?', 'Held-out sensor or sensor instance', 'Zero-shot gap and few-shot recovery', 'Mixing frames from the same physical contact across train and test'],
            ['Multimodal', 'Can touch align with vision, language, audio, or robot state?', 'Aligned example or trajectory', 'Retrieval, classification, generation, or prediction metrics', 'Ignoring timestamp error or generated-label quality'],
            ['Manipulation', 'Does tactile input improve closed-loop task behavior?', 'Episode or repeated real-robot trial', 'Success, recovery, time, damage, and intervention rate', 'Reporting perception accuracy without a touch-disabled task baseline'],
          ],
        },
      },
      {
        heading: 'Minimum evaluation contract for tactile manipulation',
        body: [
          'A useful task-level comparison fixes the gripper or hand, object set, initial-state distribution, controller budget, tactile preprocessing, vision inputs, and success rule. It then repeats trials across relevant disturbances and reports both aggregate results and failure categories.',
        ],
        bullets: [
          'No-touch or disabled-touch baseline on the same robot and task',
          'Repeated trials across objects, poses, contact conditions, and disturbances',
          'Latency from physical contact through sensing, inference, command, and actuation',
          'Calibration drift, sensor replacement, wear, and reinitialization procedure',
          'Failure taxonomy: miss, slip, jam, drop, excess force, timeout, or unsafe contact',
        ],
      },
      {
        heading: 'How to use the directory',
        body: [
          'Filter by benchmark type, task, sensor, and year, then open the primary paper and official project or code page. Record the exact version you use. “Open source” on a project page does not automatically establish the license of every dataset, model weight, or bundled asset.',
          'The evidence-boundary column is deliberate. It prevents a benchmark’s strongest reported result from being generalized beyond its sensor, robot, task, split, or publication status.',
        ],
      },
    ],
    faqs: [
      { question: 'What is a tactile robotics benchmark?', answer: 'It is a reproducible evaluation contract for a tactile perception, representation, or robot-control question. It specifies inputs, hardware, data splits, metrics, baselines, and evaluation conditions.' },
      { question: 'Can benchmark scores be compared across tactile sensors?', answer: 'Only when both systems use a shared protocol that controls sensor mounting, calibration, data, robot, task, metric, and evaluation version. Otherwise the numbers describe different experiments.' },
      { question: 'Is a tactile dataset automatically a benchmark?', answer: 'No. A dataset supplies observations. A benchmark adds defined tasks, splits, metrics, baselines, and evaluation code or instructions.' },
      { question: 'Which baseline matters most for tactile manipulation?', answer: 'Use the same robot, task, controller budget, and visual inputs with the tactile pathway disabled. That isolates whether touch improves the task outcome.' },
    ],
    relatedLinks: [
      { label: 'Tactile datasets', href: '/datasets', description: 'Compare the underlying data, collection units, licenses, and split risks.' },
      { label: 'Tactile sensors', href: '/sensors', description: 'Compare the hardware signals and integration boundaries behind benchmark inputs.' },
      { label: 'Tactile manipulation', href: '/tactile-manipulation', description: 'Connect perception metrics to closed-loop robot behavior.' },
      { label: 'Tactile foundation models', href: '/tactile-foundation-models', description: 'Review representation, prediction, and transfer claims.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'Follow the signal-to-action stack.' },
      { label: 'Research index', href: '/research-index', description: 'Browse source-backed research records and limitations.' },
    ],
    sources: [
      { label: 'HT-Bench preprint', href: 'https://arxiv.org/abs/2606.19161' },
      { label: 'Sparsh and TacBench project', href: 'https://sparsh-ssl.github.io/' },
      { label: 'ObjectFolder benchmark project', href: 'https://objectfolder.stanford.edu/' },
      { label: 'RCT dataset and benchmark project', href: 'https://faerber-lab.github.io/RCT/' },
      { label: 'ManiSkill-ViTac 2025 paper', href: 'https://arxiv.org/abs/2411.12503' },
      { label: 'TactiDex preprint', href: 'https://arxiv.org/abs/2607.09190' },
    ],
    paperBriefIds: ['ht-bench-full-hand-tactile-representations-2026'],
  },
  {
    path: '/sensors',
    title: 'Tactile Sensors for Robots: Technology Directory',
    description:
      'Compare tactile sensors for robot hands, grippers, and skins by sensing principle, signal, form factor, rate, integration, access, and evidence boundary.',
    h1: 'Tactile sensors for robots compared',
    kicker: 'Source-reviewed sensor directory',
    intent: 'Technical directory for tactile sensors for robots, tactile sensor robot hand, robot gripper sensors, optical tactile sensors, and magnetic tactile skins.',
    published: '2026-08-19',
    updated: '2026-08-19',
    priority: 0.92,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['tactile sensors for robots', 'tactile sensor robot hand', 'robot gripper tactile sensor', 'vision-based tactile sensor', 'magnetic tactile skin', 'soft tactile sensor'],
    quickAnswer: [
      'A robot tactile sensor converts physical contact into measurable signals such as images, pressure, normal and shear force, vibration, temperature, or magnetic-field change. The best sensor is the one whose signal, geometry, rate, durability, and interface match the task.',
      'Vision-based sensors provide dense contact images but need a camera, lighting, compliant surface, and inference pipeline. Magnetic skins can be thin and fast but still require magnetometers, calibration strategy, and protection from mounting and field variation.',
      'Do not select a sensor from spatial resolution alone. Compare contact coverage, shear sensitivity, latency, force range, drift, replaceability, wear, wiring, middleware, and closed-loop task evidence.',
    ],
    sections: [
      {
        heading: 'Robot tactile sensor taxonomy',
        body: [
          'Tactile sensors should first be grouped by physical transduction principle and deployment geometry. A fingertip image sensor, magnetic skin patch, distributed palm array, and whole-body safety surface solve different contact problems even if all are called tactile sensors.',
        ],
        table: {
          headers: ['Sensor family', 'Raw observation', 'Typical strength', 'Integration cost', 'Evidence to request'],
          rows: [
            ['Vision-based tactile', 'Camera image of a deforming gel or internal markers', 'Dense local contact geometry and reusable computer-vision tooling', 'Camera volume, lighting, gel wear, image bandwidth, learned calibration', 'Raw frame rate, contact area, replacement repeatability, force or slip validation'],
            ['Magnetic skin', 'Magnetometer response to a magnetized elastomer or embedded magnets', 'Thin, fast, replaceable contact surfaces and three-axis cues', 'Magnetic layout, sensor-to-skin spacing, field interference, calibration', 'Cross-instance transfer, drift, overload behavior, mounting sensitivity'],
            ['Resistive / capacitive array', 'Taxel-level resistance or capacitance change', 'Distributed pressure coverage and compact electronics', 'Routing, crosstalk, hysteresis, curvature, protective layers', 'Taxel pitch, force range, sampling architecture, bend and temperature effects'],
            ['Fluid-filled biomimetic', 'Electrode impedance, fluid pressure, vibration, and temperature', 'Multimodal fingertip sensing with compliant contact', 'Mechanical maintenance, nonlinear calibration, platform adapters', 'Per-modality bandwidth, force reconstruction, skin replacement, task results'],
          ],
        },
      },
      {
        heading: 'Selection starts from the contact event',
        body: [
          'Choose the signal from the failure the robot must prevent or recover from. Fine insertion may need local contact geometry and shear. Fragile grasping may prioritize stable normal-force cues and low-latency slip detection. Whole-body safety may prefer broad coverage and robust event detection over fingertip-scale images.',
        ],
        bullets: [
          'Task: contact detection, force control, slip recovery, texture, pose, insertion, or collision safety',
          'Geometry: fingertip, finger link, palm, gripper pad, arm, torso, curved shell, or flexible surface',
          'Signal path: analog front end, camera stream, embedded processor, timestamp, bus, ROS 2 message, and controller',
          'Maintenance: gel or skin replacement, calibration, cleaning, wear, overload, temperature, and cable strain',
        ],
      },
      {
        heading: 'Specifications are not task performance',
        body: [
          'A manufacturer or paper may report frame rate, taxel pitch, force error, or durability under a controlled setup. Those figures describe that configuration. Mounting, protective layers, contact material, robot vibration, preprocessing, inference, and controller timing can change the useful result.',
          'For procurement or experiment design, preserve the source URL and exact model. Where a reviewed primary source does not state a rate or specification, this directory says so instead of inferring a family-wide value.',
        ],
      },
      {
        heading: 'Minimum validation before robot deployment',
        body: [
          'Validate the complete sensor-to-action loop on the target robot. First measure no-contact drift, contact repeatability, saturation, and timing. Then run the real task with touch enabled and disabled, including sensor replacement and disturbed contacts.',
        ],
        bullets: [
          'Timestamp stability and end-to-end latency under full robot load',
          'Repeatability across sensor instances, skins, gels, mounts, and days',
          'Normal, shear, slip, or contact-state accuracy under the intended materials',
          'Closed-loop task improvement plus false-positive and failure-recovery behavior',
        ],
      },
    ],
    faqs: [
      { question: 'What tactile sensors are used in robot hands?', answer: 'Common choices include vision-based tactile fingertips, magnetic skins, distributed force arrays, and multimodal biomimetic fingertips. The right choice depends on hand geometry, contact task, control rate, and maintenance constraints.' },
      { question: 'Are vision-based tactile sensors force sensors?', answer: 'They produce images of a deforming interface. Force can be estimated after calibration or learned mapping, but a raw tactile image is not automatically a calibrated force measurement.' },
      { question: 'What is a taxel?', answer: 'A taxel is a tactile sensing element in an array, analogous to a pixel only at the level of spatial indexing. Taxels can measure different physical quantities and may not have independent responses.' },
      { question: 'Which tactile sensor has the best resolution?', answer: 'There is no task-independent winner. Spatial resolution must be considered with field of view, force or shear sensitivity, latency, bandwidth, durability, calibration, and closed-loop evidence.' },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'Connect individual sensors to distributed robot surfaces.' },
      { label: 'Robot hand tactile sensors', href: '/applications/robot-hand-tactile-sensor', description: 'Map fingertip, finger, and palm coverage to manipulation tasks.' },
      { label: 'Tactile sensor benchmark', href: '/guides/tactile-sensor-benchmark-robot-manipulation', description: 'Build a fair task-based sensor comparison.' },
      { label: 'Tactile benchmarks', href: '/benchmarks', description: 'Review shared evaluation suites and evidence boundaries.' },
      { label: 'ROS 2 tactile sensing', href: '/guides/ros2-tactile-sensing', description: 'Trace sensor data through logging, replay, and robot middleware.' },
      { label: 'Tactile manipulation', href: '/tactile-manipulation', description: 'See how contact signals affect robot actions.' },
    ],
    sources: [
      { label: 'DIGIT paper', href: 'https://arxiv.org/abs/2005.14679' },
      { label: 'ReSkin primary project article', href: 'https://ai.meta.com/blog/reskin-a-versatile-replaceable-low-cost-skin-for-ai-research-on-tactile-perception/' },
      { label: 'AnySkin paper', href: 'https://arxiv.org/abs/2409.08276' },
      { label: 'GelSlim 4.0 paper', href: 'https://arxiv.org/abs/2409.19770' },
      { label: 'TacTip review', href: 'https://arxiv.org/abs/2105.14455' },
      { label: 'Insight paper', href: 'https://www.nature.com/articles/s42256-021-00439-3' },
    ],
    paperBriefIds: ['open-source-magnetic-tactile-calibration-2024', 'full-hand-tactile-sensing-2025'],
  },
  {
    path: '/tactile-manipulation',
    title: 'Tactile Manipulation for Robot Hands and Grippers',
    description:
      'Learn how tactile manipulation turns contact, pressure, shear, and slip into closed-loop robot actions for grasping, insertion, dexterity, and Physical AI.',
    h1: 'Tactile manipulation: from contact to robot action',
    kicker: 'Tactile AI pillar',
    intent: 'Pillar guide for tactile manipulation, touch-guided robot manipulation, tactile robot control, dexterous manipulation, and contact-rich robotics.',
    published: '2026-08-19',
    updated: '2026-08-19',
    priority: 0.93,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['tactile manipulation', 'touch-guided robot manipulation', 'tactile robot control', 'contact-rich manipulation', 'dexterous manipulation tactile sensing', 'robot grasp slip detection'],
    quickAnswer: [
      'Tactile manipulation is robot manipulation that uses measured contact to estimate physical state and change an action. The loop is contact → sensor → tactile representation → state estimate or policy → robot command → new contact.',
      'Touch is most useful after vision becomes ambiguous: during grasp closure, slip, occluded insertion, deformable-object handling, and contacts whose force or stability cannot be inferred reliably from an external image.',
      'A tactile model is not enough. Useful manipulation requires synchronized robot state, low-latency sensing, a controller or policy that can act on touch, and task-level evidence against a no-touch baseline.',
    ],
    sections: [
      {
        heading: 'The tactile manipulation control loop',
        body: [
          'Physical contact changes a sensor surface or taxel array. The system timestamps and preprocesses that signal, estimates a contact state or embedding, then changes grip force, pose, trajectory, or recovery mode. The action creates the next contact observation, closing the loop.',
        ],
        table: {
          headers: ['Layer', 'Question', 'Typical output', 'Failure if omitted'],
          rows: [
            ['Contact and sensor', 'What happened at the interface?', 'Pressure, shear, slip cue, vibration, image, or contact event', 'The controller acts without direct physical evidence'],
            ['Alignment and representation', 'Which robot state and action produced the touch?', 'Timestamped feature, contact map, or multimodal latent', 'The model learns spurious or delayed associations'],
            ['State or policy', 'What does contact mean for the current task?', 'Pose correction, stability estimate, tactile subgoal, or action', 'Rich touch data never changes behavior'],
            ['Control and recovery', 'How should the robot respond now?', 'Force, velocity, joint, gripper, or mode command', 'Detection arrives but cannot prevent a drop, jam, or unsafe force'],
          ],
        },
      },
      {
        heading: 'Where tactile manipulation changes the task',
        body: [
          'Touch should be added where it resolves a physical uncertainty. More sensor channels are not automatically useful; the controller must connect a specific tactile event to a specific action or recovery rule.',
        ],
        bullets: [
          'Grasp stabilization: detect incipient slip and adjust grip before a drop',
          'Insertion and assembly: infer contact direction, jamming, seating, and alignment under occlusion',
          'In-hand manipulation: track local object motion while fingers reorient or roll an object',
          'Deformable and fragile objects: regulate contact without relying on appearance alone',
          'Surface following and tool use: maintain contact state across geometry and disturbances',
        ],
      },
      {
        heading: 'Model roles in tactile manipulation',
        body: [
          'A tactile encoder compresses sensor observations. A state estimator predicts variables such as contact location, pose, force, or slip. A policy maps observations to actions. A world model predicts future contact under candidate actions. These roles may share a backbone, but the labels are not interchangeable.',
          'Foundation-model language should be reserved for systems with broad pretraining and demonstrated downstream transfer. A strong policy on a small task suite can be valuable without being a foundation model.',
        ],
      },
      {
        heading: 'Evidence ladder for touch-guided control',
        body: [
          'Evidence becomes stronger as it moves from sensor visualization to real robot outcomes. The most useful result connects a tactile signal to an action and then shows repeatable improvement under held-out objects, disturbances, sensor replacement, or other deployment-relevant variation.',
        ],
        bullets: [
          'Level 1: raw signal responds to contact under controlled loading',
          'Level 2: perception metric on independent contacts, objects, or sensors',
          'Level 3: offline policy or prediction result on held-out trajectories',
          'Level 4: closed-loop robot improvement over a matched no-touch baseline',
          'Level 5: repeated transfer across tasks, hardware instances, and real operating conditions',
        ],
      },
      {
        heading: 'Open research problems',
        body: [
          'Tactile manipulation still faces hardware diversity, limited shared datasets, inconsistent evaluation, calibration drift, contact-sequence leakage, and weak transfer across sensors and embodiments. Whole-hand and humanoid systems also add bandwidth, wiring, coverage, and safety constraints.',
          'The practical research direction is not touch instead of vision. It is aligned vision, language, proprioception, and touch with an evaluation that shows which modality changes which physical outcome.',
        ],
      },
    ],
    faqs: [
      { question: 'What is tactile manipulation?', answer: 'It is robot manipulation that uses measured contact to estimate physical state and update actions such as grip force, pose, trajectory, or recovery mode.' },
      { question: 'Why is touch useful when a robot already has cameras?', answer: 'Cameras can lose contact information under occlusion and often cannot directly observe pressure, shear, slip, seating, or hidden local motion. Touch supplies evidence at the physical interface.' },
      { question: 'Does tactile sensing always improve manipulation?', answer: 'No. Improvement depends on sensor placement, signal quality, synchronization, latency, model, controller, and task. It should be shown against a matched no-touch baseline.' },
      { question: 'Is tactile manipulation the same as haptics?', answer: 'They overlap but are not identical. Tactile manipulation focuses on sensing and controlling robot-object contact; haptics can also include rendering force or touch back to a human operator.' },
    ],
    relatedLinks: [
      { label: 'Robot manipulation', href: '/robot-manipulation', description: 'Start with the broad grasping, insertion, dexterity, learning, and evaluation map.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'Follow the full sensing, representation, model, and action stack.' },
      { label: 'Visuo-tactile robotics', href: '/visuo-tactile', description: 'Combine external vision with local contact evidence.' },
      { label: 'Tactile sensors', href: '/sensors', description: 'Compare the physical inputs used by manipulation systems.' },
      { label: 'Tactile benchmarks', href: '/benchmarks', description: 'Evaluate perception and task outcomes under reproducible protocols.' },
      { label: 'Tactile datasets', href: '/datasets', description: 'Find aligned contact, vision, robot-state, and action data.' },
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'Place contact feedback inside multimodal Physical AI.' },
      { label: 'Slip detection', href: '/guides/slip-detection-robot-hand', description: 'Trace slip signals into grasp recovery.' },
    ],
    sources: [
      { label: 'Sparsh and TacBench paper', href: 'https://arxiv.org/abs/2410.24090' },
      { label: 'ManiSkill-ViTac 2025 challenge paper', href: 'https://arxiv.org/abs/2411.12503' },
      { label: 'FreeTacMan project', href: 'https://opendrivelab.com/FreeTacMan' },
      { label: 'VTDexManip project', href: 'https://lqts.github.io/VTDexManip/' },
      { label: 'TactiDex preprint', href: 'https://arxiv.org/abs/2607.09190' },
    ],
    paperBriefIds: ['freetacman-robot-free-visuotactile-data-collection-2025', 'dream-tac-tactile-world-action-model-2026'],
  },
  {
    path: '/research/eu-roboskin-project',
    title: 'EU ROBOSKIN Project (2009-2012): History and Research',
    description:
      'A source-backed record of the EU FP7 ROBOSKIN project, its robot-skin research scope, funding, partners, 2013 Springer paper, and relationship to RoboSkin.ai.',
    h1: 'The EU FP7 ROBOSKIN project: history, scope and sources',
    kicker: 'Historical research project',
    intent: 'Entity and disambiguation page for the ROBOSKIN project, EU robot skin research, FP7-231500, and the 2013 ROBOSKIN conference paper.',
    published: '2026-08-20',
    updated: '2026-08-20',
    priority: 0.8,
    changeFrequency: 'monthly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['ROBOSKIN project', 'EU ROBOSKIN project', 'FP7-231500', 'robot skin research project', 'large-area tactile skin', 'The ROBOSKIN Project Challenges and Results'],
    quickAnswer: [
      'ROBOSKIN was a European Union FP7 research project on skin-based technologies and robot capabilities. CORDIS records grant agreement 231500, a project period from 1 May 2009 to 30 April 2012, and coordination by the University of Genoa.',
      'The project investigated tactile feedback from robotic skin covering large areas of a robot body. A 2013 Springer conference chapter documented its challenges and reported results.',
      'The former EU ROBOSKIN consortium and the current RoboSkin.ai website are separate entities. RoboSkin.ai did not participate in the FP7 project and does not claim endorsement by its authors, partners, Springer Nature, or the European Commission.',
    ],
    sections: [
      {
        heading: 'Verified project record',
        body: [
          'The European Commission CORDIS record is the controlling source for the grant identity, programme, dates, coordinator, participants, and funding. It lists ROBOSKIN under the FP7 information and communication technologies programme and the cognitive systems, interaction, and robotics topic.',
          'The project is closed. Historical university profiles and publication databases can preserve useful context, but their dates or programme labels may differ; this page therefore uses CORDIS for the formal grant record.',
        ],
        table: {
          headers: ['Field', 'Verified record', 'Source boundary'],
          rows: [
            ['Grant agreement', '231500', 'European Commission CORDIS'],
            ['Project period', '1 May 2009 to 30 April 2012', 'European Commission CORDIS'],
            ['Programme', 'FP7-ICT; cognitive systems, interaction, and robotics', 'European Commission CORDIS'],
            ['Coordinator', 'Universita degli Studi di Genova, Italy', 'European Commission CORDIS'],
            ['Total cost', 'EUR 4,668,535', 'CORDIS reporting record'],
            ['EU contribution', 'EUR 3,557,139', 'CORDIS reporting record'],
          ],
        },
      },
      {
        heading: 'What the project set out to investigate',
        body: [
          'The Springer chapter describes the project goal as developing and demonstrating robot capabilities based on tactile feedback from robotic skin covering large areas of the robot body. The research problem was not just a sensitive material sample: it included the availability of embedded tactile technology at a scale suitable for robot experiments.',
          'The stated application direction included robots operating more effectively and safely in unconstrained environments and interacting or cooperating with people and other robots. Those are historical project objectives, not claims that every capability reached commercial deployment.',
        ],
      },
      {
        heading: 'Institutions recorded by CORDIS',
        body: [
          'CORDIS names the University of Genoa as coordinator and records participation by EPFL, the University of Cagliari, the Italian Institute of Technology, the University of Hertfordshire, the University of Wales Newport, and TechOnYou Srl.',
          'The 2013 conference chapter lists authors spanning several of those institutions. Author order and institutional participation should be taken from the original publication and CORDIS records rather than inferred from later web pages.',
        ],
      },
      {
        heading: 'The 2013 conference paper',
        body: [
          'The chapter “The ROBOSKIN Project: Challenges and Results” appears in the ROMANSY 19 proceedings, volume 544 of the CISM International Centre for Mechanical Sciences series, on pages 351-358. Springer records DOI 10.1007/978-3-7091-1379-0_43 and publication in 2013.',
          'The chapter is a primary project-era source. RoboSkin.ai links to the publisher record and a university research profile so readers can verify the title, author list, abstract, venue, pagination, and DOI.',
        ],
      },
      {
        heading: 'What this historical record does not prove',
        body: [
          'A project objective or prototype-era result does not automatically establish present-day product availability, body-scale deployment, durability, safety certification, dataset access, or performance on modern tactile-learning benchmarks.',
          'For current technical decisions, use the historical project to understand the development of large-area tactile skin, then verify modern sensors, datasets, benchmarks, and closed-loop robot evidence separately.',
        ],
        bullets: [
          'Do not treat an old project goal as a current commercial specification',
          'Do not infer affiliation between RoboSkin.ai and the former consortium',
          'Do not transfer a result across robots, sensor generations, or tasks without new evidence',
          'Cite the Springer DOI for the paper and CORDIS grant 231500 for the formal project record',
        ],
      },
    ],
    faqs: [
      { question: 'Is RoboSkin.ai the website of the EU ROBOSKIN project?', answer: 'No. RoboSkin.ai is an independent research and intelligence platform. It did not participate in the former FP7 consortium and does not claim endorsement by the project partners.' },
      { question: 'When did the EU ROBOSKIN project run?', answer: 'CORDIS records a start date of 1 May 2009 and an end date of 30 April 2012.' },
      { question: 'Who coordinated the ROBOSKIN project?', answer: 'The European Commission CORDIS record names Universita degli Studi di Genova in Italy as coordinator.' },
      { question: 'What did the ROBOSKIN project research?', answer: 'It investigated skin-based tactile technologies and robot capabilities supported by tactile feedback across large areas of a robot body.' },
      { question: 'Where is the main project paper?', answer: 'Springer Nature Link hosts the 2013 conference chapter under DOI 10.1007/978-3-7091-1379-0_43.' },
    ],
    relatedLinks: [
      { label: 'Robot skin', href: '/robot-skin', description: 'Read the current system-level definition and technology map.' },
      { label: 'Humanoid robot skin', href: '/humanoid-robot-skin', description: 'Connect historical large-area skin research to present humanoid tactile stacks.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'Follow touch signals from sensing into representations, models, and robot actions.' },
      { label: 'Robot skin papers', href: '/research/robot-skin-papers', description: 'Browse source-backed paper routes and evidence limits.' },
      { label: 'Tactile research index', href: '/research-index', description: 'Compare modern sensing principles, modalities, form factors, and limitations.' },
      { label: 'Editorial policy', href: '/editorial-policy', description: 'Review source hierarchy, correction, and evidence-boundary rules.' },
    ],
    sources: [
      { label: 'European Commission CORDIS project record for grant 231500', href: 'https://cordis.europa.eu/project/id/231500' },
      { label: 'European Commission CORDIS reporting record', href: 'https://cordis.europa.eu/project/id/231500/reporting' },
      { label: 'Springer chapter: The ROBOSKIN Project: Challenges and Results', href: 'https://link.springer.com/chapter/10.1007/978-3-7091-1379-0_43' },
      { label: 'University of Hertfordshire publication record', href: 'https://researchprofiles.herts.ac.uk/en/publications/the-roboskin-project-challenges-and-results/' },
      { label: 'University of Hertfordshire historical project record', href: 'https://researchprofiles.herts.ac.uk/en/projects/roboskin/' },
    ],
  },
  {
    path: '/visuo-tactile',
    title: 'Visuo-Tactile Robotics: Perception, Data and Manipulation',
    description:
      'Understand visuo-tactile robotics: how robots align vision and touch for contact perception, representation learning, world models, and manipulation.',
    h1: 'Visuo-tactile robotics: combining sight and touch',
    kicker: 'Multimodal tactile AI pillar',
    intent: 'Pillar guide for visuo-tactile perception, visuo-tactile manipulation, vision touch fusion, multimodal tactile AI, and robot learning.',
    published: '2026-08-19',
    updated: '2026-08-19',
    priority: 0.92,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'technology',
    keywords: ['visuo-tactile', 'visuo-tactile perception', 'visuo-tactile manipulation', 'vision touch fusion robotics', 'multimodal tactile AI', 'visuo-tactile representation learning'],
    quickAnswer: [
      'Visuo-tactile robotics combines external visual observations with touch measured at the robot-object interface. Vision explains scene context and approach; touch explains what happens during physical contact.',
      'The two modalities must be aligned by time, robot state, contact event, and task. Simply concatenating an image embedding and tactile embedding does not prove that the model uses contact information.',
      'Visuo-tactile systems support material understanding, contact localization, grasp stability, insertion, dexterous manipulation, and action-conditioned world models. Each role needs a different evaluation protocol.',
    ],
    sections: [
      {
        heading: 'Why vision and touch are complementary',
        body: [
          'Vision offers broad spatial context before contact, but can be occluded by the hand, gripper, or object. Touch is local and contact-dependent, but reveals deformation, slip, pressure, shear, surface interaction, and hidden motion after contact begins.',
        ],
        table: {
          headers: ['Question', 'Vision contributes', 'Touch contributes', 'Combined use'],
          rows: [
            ['Where should the robot move?', 'Scene, object, pose, free space, and semantic context', 'Local contact onset and boundary', 'Approach visually, then correct from contact'],
            ['Is the grasp stable?', 'Object motion and gross hand-object geometry', 'Slip, shear, pressure distribution, and local deformation', 'Detect instability that is visually occluded or delayed'],
            ['Is an insertion aligned?', 'Hole, connector, and tool pose before occlusion', 'Contact direction, jamming, seating, and force-related state', 'Use touch for the final millimeters and recovery'],
            ['What will happen after an action?', 'Future scene and object appearance', 'Future contact state, slip, and local physical response', 'Build action-conditioned visuo-tactile predictions'],
          ],
        },
      },
      {
        heading: 'Four visuo-tactile model roles',
        body: [
          'Visuo-tactile is a modality description, not one model architecture. The same data can support cross-modal representation learning, state estimation, action policies, or future prediction. Claims should name the role and evaluation target.',
        ],
        bullets: [
          'Representation: align visual and tactile examples in a reusable embedding space',
          'Perception: estimate material, contact location, object pose, force, slip, or stability',
          'Policy: map current vision, touch, and robot state to an action',
          'World model: predict future visual and tactile state under a candidate action',
        ],
      },
      {
        heading: 'Alignment is the hidden infrastructure',
        body: [
          'A visually observed object and a tactile frame are useful as a pair only when the system knows which contact, pose, action, and time produced them. Camera clocks, tactile frame rates, robot joint states, actions, and force measurements can drift or arrive at different rates.',
          'Datasets should preserve contact sequences and trajectories, not only extracted frames. That allows users to keep correlated events together during splitting and reconstruct the action-to-contact timeline.',
        ],
        bullets: [
          'Hardware timestamps or measured clock offsets for every modality',
          'Robot pose, joints, gripper state, and executed action aligned to contact',
          'Contact-start, contact-end, slip, recovery, and task-outcome events',
          'Split manifests grouped by trajectory, object, material, sensor, or task',
        ],
      },
      {
        heading: 'How to prove that touch helps',
        body: [
          'A multimodal model can ignore one input and still perform well from dataset bias. Use modality ablations, shuffled or delayed touch controls, occlusion and disturbance tests, and a matched vision-only baseline. For manipulation, report whether the added tactile path changes task success, recovery, force, or damage rather than only representation metrics.',
        ],
      },
      {
        heading: 'Relationship to tactile AI and Physical AI',
        body: [
          'Visuo-tactile perception sits inside the broader tactile AI stack. Language can add task semantics, proprioception supplies the robot’s internal state, and touch grounds the system in physical contact. Together they support Physical AI systems that must act under real-world uncertainty.',
          'A visuo-tactile world model is one specialized branch. It predicts future multimodal state; it is not synonymous with every vision-touch encoder or manipulation policy.',
        ],
      },
    ],
    faqs: [
      { question: 'What is visuo-tactile perception?', answer: 'It is the joint use of visual and tactile observations to estimate properties or contact states that either modality alone may represent incompletely.' },
      { question: 'What is visuo-tactile manipulation?', answer: 'It is robot manipulation in which both vision and touch influence actions, such as approach, grasp stabilization, insertion correction, reorientation, or recovery.' },
      { question: 'How should vision and touch data be synchronized?', answer: 'Use measured timestamps or clock offsets and align both modalities with robot pose, joint state, gripper state, action, and contact events. Preserve trajectories so alignment can be audited.' },
      { question: 'Is a visuo-tactile model a world model?', answer: 'Not necessarily. A world model predicts future state conditioned on action. A visuo-tactile encoder or policy may fuse sight and touch without predicting the future.' },
    ],
    relatedLinks: [
      { label: 'Tactile manipulation', href: '/tactile-manipulation', description: 'Connect fused perception to closed-loop robot actions.' },
      { label: 'Visuo-tactile world models', href: '/guides/visuo-tactile-world-models-robot-manipulation', description: 'Compare action-conditioned visual and tactile prediction systems.' },
      { label: 'Tactile datasets', href: '/datasets', description: 'Find aligned touch, vision, language, robot-state, and action resources.' },
      { label: 'Tactile foundation models', href: '/tactile-foundation-models', description: 'Separate representations, policies, and predictive model roles.' },
      { label: 'Tactile benchmarks', href: '/benchmarks', description: 'Evaluate multimodal alignment, transfer, and task outcomes.' },
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'Place sight and touch inside multimodal embodied intelligence.' },
    ],
    sources: [
      { label: 'Touch and Go paper', href: 'https://arxiv.org/abs/2211.12498' },
      { label: 'TVL project', href: 'https://tactile-vlm.github.io/' },
      { label: 'ObjectFolder project and benchmarks', href: 'https://objectfolder.stanford.edu/' },
      { label: 'FreeTacMan project', href: 'https://opendrivelab.com/FreeTacMan' },
      { label: 'Sparsh project and TacBench', href: 'https://sparsh-ssl.github.io/' },
    ],
    paperBriefIds: ['freetacman-robot-free-visuotactile-data-collection-2025', 'feelworld-visuo-tactile-world-model-2026'],
  },
  {
    path: '/humanoid-robots',
    title: 'Humanoid Robots: Physical AI, Hands & Tactile Sensing',
    description:
      'Understand humanoid robots through perception, robot learning, whole-body control, dexterous hands, safety, tactile sensing, and Physical AI evidence.',
    h1: 'Humanoid robots: intelligence, manipulation and touch',
    kicker: 'High-interest robotics pillar',
    intent: 'Broad definition and research map for humanoid robots, humanoid robotics, general-purpose robots, robot hands, whole-body control, and Physical AI.',
    published: '2026-08-20',
    updated: '2026-08-20',
    priority: 0.96,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'applications',
    keywords: ['humanoid robots', 'humanoid robotics', 'Physical AI robots', 'general-purpose robots', 'humanoid robot hands', 'humanoid robot manipulation', 'whole-body control', 'humanoid tactile sensing'],
    quickAnswer: [
      'A humanoid robot is a physical robot whose body plan or capabilities are designed around human-scale environments, often including a torso, arms, hands or grippers, and legs or another mobile base.',
      'The humanoid robotics stack combines perception, embodied reasoning, planning, whole-body control, manipulation, hardware, data, simulation, and safety. A human-like shape does not by itself make a robot autonomous or general purpose.',
      'Touch matters when a humanoid must grasp, insert, hand over, balance on uncertain support, or detect contact with a person or object. Robot skin and tactile sensors provide contact evidence that vision and proprioception may not expose directly.',
    ],
    sections: [
      {
        heading: 'What makes a robot humanoid',
        body: [
          'Humanoid usually describes embodiment rather than intelligence. A system may resemble a person in body layout while still executing narrow, pre-programmed, teleoperated, or carefully staged tasks. Useful comparisons must separate body form, mobility, manipulation, autonomy, and evidence.',
          'Human-centered environments motivate the form factor: doors, shelves, tools, stairs, workstations, and handover spaces were designed around human reach and motion. That creates opportunities for shared infrastructure but also difficult requirements for balance, dexterity, reliability, energy use, and safe contact.',
        ],
      },
      {
        heading: 'The humanoid robotics stack',
        body: [
          'A humanoid is a system of coupled layers. Progress in one layer does not prove readiness in the others, so research and product claims should identify the complete tested stack.',
        ],
        table: {
          headers: ['Layer', 'Primary job', 'Questions to verify', 'Touch connection'],
          rows: [
            ['Perception', 'Estimate people, objects, geometry, motion, and contact context', 'Which sensors, conditions, latency, and failure cases were tested?', 'Touch adds local pressure, shear, slip, and contact events'],
            ['Reasoning and planning', 'Translate goals into feasible task and motion sequences', 'Is planning online, scripted, or assisted by a human?', 'Contact state can confirm whether a planned step physically succeeded'],
            ['Whole-body control', 'Coordinate balance, locomotion, reach, and manipulation', 'Which body, terrain, speed, load, and disturbances were evaluated?', 'Foot and body contact can expose support and collision state'],
            ['Hands and end effectors', 'Grasp, insert, reorient, operate tools, and hand over objects', 'Is the result gripper-level, multi-finger, bimanual, or full-body?', 'Fingertip and palm sensing supports grasp and slip feedback'],
            ['Safety and evaluation', 'Limit hazardous behavior and measure repeatability', 'Are stops, recovery, human proximity, force, and failure rates reported?', 'Distributed contact sensing can contribute to a layered safety system'],
          ],
        },
      },
      {
        heading: 'High-interest research lanes',
        body: [
          'Current humanoid coverage spans foundation models, vision-language-action policies, embodied reasoning, whole-body control, dexterous manipulation, simulation, synthetic data, teleoperation, and safety. These labels describe different engineering roles and should not be collapsed into one ranking.',
        ],
        bullets: [
          'Whole-body locomotion and loco-manipulation across uneven or constrained spaces',
          'Dexterous and bimanual manipulation with hands, grippers, tools, and deformable objects',
          'Robot learning from demonstrations, human video, simulation, and multi-robot datasets',
          'Vision-language-action models and embodied reasoning for instruction-conditioned behavior',
          'Safety, reliability, cycle time, recovery, maintainability, and human-robot interaction',
        ],
      },
      {
        heading: 'Why touch is a strategic gap',
        body: [
          'Vision is valuable before contact and proprioception measures the robot’s internal configuration, but neither directly measures every event at a covered fingertip, palm, foot, arm, or body surface. Contact can be occluded, compliant, distributed, or too local to infer reliably from an external camera.',
          'The tactile route is not touch instead of vision. It is synchronized vision, language, proprioception, force or torque, and surface touch, followed by an action or safety response whose value is tested against a matched baseline.',
        ],
      },
      {
        heading: 'How to evaluate humanoid claims',
        body: [
          'A useful humanoid result identifies the embodiment, task, environment, autonomy level, sensing inputs, control frequency, number of trials, baseline, intervention policy, and failure modes. A demonstration video can establish that an event occurred; it does not establish generality, reliability, or deployment readiness.',
        ],
        bullets: [
          'Separate tabletop manipulation, mobile manipulation, and whole-body humanoid control',
          'Record whether the system was autonomous, teleoperated, reset by a person, or selected from multiple trials',
          'Report task success with speed, force, damage, recovery, and out-of-distribution conditions where relevant',
          'Treat company demonstrations, preprints, peer-reviewed papers, benchmarks, and deployments as different evidence levels',
        ],
      },
      {
        heading: '2026 field signals and evidence boundaries',
        body: [
          'The International Federation of Robotics lists AI and autonomy among its 2026 industry trends and discusses humanoid reliability and efficiency as conditions for industrial competition. NVIDIA’s official humanoid materials emphasize data, simulation, foundation models, onboard compute, dexterous hands, and deployment workflows. Google DeepMind’s Gemini Robotics 2 announcement describes VLA, embodied reasoning, whole-body control, and manipulation across multiple embodiments.',
          'These are important field signals, not proof that all humanoids share the same capabilities. RoboSkin.ai uses them to map the stack, then routes touch-specific claims to source-backed robot-skin, hand, dataset, benchmark, and manipulation pages.',
        ],
      },
    ],
    faqs: [
      { question: 'What is a humanoid robot?', answer: 'A humanoid robot uses a human-related body plan or capability set to operate in human-scale environments. The term describes embodiment and does not automatically mean the robot is autonomous or general purpose.' },
      { question: 'Why do humanoid robots need tactile sensing?', answer: 'Touch can expose contact, pressure, shear, slip, seating, support, and collision events at hands, feet, arms, and body surfaces when vision or proprioception is incomplete.' },
      { question: 'Are humanoid robots the same as Physical AI?', answer: 'No. Humanoids are one embodiment of Physical AI. Physical AI also includes other robots and autonomous machines that perceive, reason, and act in the physical world.' },
      { question: 'What should a humanoid robot benchmark report?', answer: 'It should identify the robot, task, environment, autonomy level, inputs, baseline, trials, success criteria, interventions, and failure modes. Hardware and software versions also matter.' },
    ],
    relatedLinks: [
      { label: 'AI and robotics', href: '/ai-robotics', description: 'Place humanoid embodiment inside the full AI perception, policy, control, and feedback loop.' },
      { label: 'Humanoid robot skin', href: '/humanoid-robot-skin', description: 'Map whole-hand, arm, foot, and body tactile sensing.' },
      { label: 'Robot manipulation', href: '/robot-manipulation', description: 'Follow grasping, insertion, dexterity, and contact-rich tasks.' },
      { label: 'Robot VLA models', href: '/robot-vla-models', description: 'Understand vision-language-action models and where touch fits.' },
      { label: 'Physical AI', href: '/physical-ai', description: 'Connect humanoid embodiment to physical-world perception and action.' },
      { label: 'Robot hand tactile sensors', href: '/applications/robot-hand-tactile-sensor', description: 'Compare fingertip, finger, palm, and full-hand sensing roles.' },
      { label: 'Tactile datasets', href: '/datasets', description: 'Find robot, sensor, task, modality, format, and license records.' },
      { label: 'Humanoid locomotion touch brief', href: '/research/tac4loco-plantar-tactile-humanoid-locomotion-2026', description: 'Review source-bounded plantar tactile evidence.' },
    ],
    sources: [
      { label: 'International Federation of Robotics 2026 trends', href: 'https://ifr.org/ifr-press-releases/news/top-5-global-robotics-trends-2026' },
      { label: 'International Federation of Robotics humanoid position paper', href: 'https://ifr.org/ifr-press-releases/news/humanoid-robots-vision-and-reality-paper-published-by-ifr' },
      { label: 'Google DeepMind Gemini Robotics 2', href: 'https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/' },
      { label: 'NVIDIA humanoid robots technical overview', href: 'https://www.nvidia.com/en-us/use-cases/humanoid-robots/' },
      { label: 'NVIDIA Isaac GR00T reference humanoid announcement', href: 'https://nvidianews.nvidia.com/news/nvidia-open-humanoid-robot-reference-design' },
    ],
    paperBriefIds: ['tac4loco-plantar-tactile-humanoid-locomotion-2026', 'ht-bench-full-hand-tactile-representations-2026', 'humanoid-visual-tactile-action-dataset-2025'],
  },
  {
    path: '/robot-vla-models',
    title: 'Robot VLA Models: Vision-Language-Action for Robotics',
    description:
      'Learn how robot vision-language-action models connect instructions and observations to actions, and where touch, world models, data, and evaluation fit.',
    h1: 'Robot VLA models: from vision and language to action',
    kicker: 'High-interest robot learning pillar',
    intent: 'Definition and comparison guide for robot VLA models, vision-language-action policies, action interfaces, embodied reasoning boundaries, and tactile VLA systems.',
    published: '2026-08-20',
    updated: '2026-08-20',
    priority: 0.95,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'technology',
    keywords: ['robot VLA models', 'vision-language-action model', 'VLA robotics', 'vision language action policy', 'robot action model', 'multimodal robot policy', 'tactile VLA'],
    quickAnswer: [
      'A robot vision-language-action model, usually shortened to VLA, uses visual observations and language instructions to produce or condition robot actions. Implementations differ in action representation, training data, embodiment coverage, control rate, and whether a separate planner or controller is required.',
      'A VLA is not automatically a world model or an embodied reasoning system. A world model predicts future state; embodied reasoning can decompose and monitor tasks; a VLA maps observations and instructions toward physical action.',
      'Touch can extend a VLA during contact-rich manipulation by adding pressure, shear, slip, deformation, or contact-state evidence. The useful test is whether tactile input changes closed-loop outcomes under matched conditions.',
    ],
    sections: [
      {
        heading: 'What enters and leaves a robot VLA',
        body: [
          'The common high-level description is vision plus language to action, but real systems also use robot state, action history, camera geometry, embodiment identifiers, depth, force, tactile signals, or a high-level plan. The output may be joint commands, end-effector motion, action chunks, discrete tokens, trajectories, or inputs to another controller.',
          'Because the interface differs, model names and parameter counts do not create a fair performance ranking. Readers need the task, robot, data, action space, inference setting, and evaluation protocol.',
        ],
      },
      {
        heading: 'VLA, VLM, world model and embodied reasoning',
        body: [
          'These model categories can be connected inside one system, but they answer different questions. Keeping the roles separate makes research comparisons more useful.',
        ],
        table: {
          headers: ['Model role', 'Core question', 'Typical output', 'Touch opportunity'],
          rows: [
            ['Vision-language model', 'What is in the scene and what does the instruction mean?', 'Text, labels, plans, spatial or semantic representations', 'Describe contact context or interpret tactile-language pairs'],
            ['Vision-language-action model', 'What should the robot do next?', 'Robot action, action token, trajectory, or action chunk', 'Use live touch to refine contact-rich actions'],
            ['World or world-action model', 'What state may follow this action?', 'Predicted visual, tactile, latent, reward, or contact future', 'Predict slip, force-related state, or future tactile observations'],
            ['Embodied reasoning system', 'How should a long task be decomposed, monitored, and recovered?', 'Subgoals, tool calls, constraints, or task status', 'Use contact as evidence that a physical step succeeded or failed'],
          ],
        },
      },
      {
        heading: 'Data and embodiment determine the model boundary',
        body: [
          'Robot data is heterogeneous: cameras, calibration, joint layouts, control spaces, grippers, hands, task labels, demonstration quality, and reset policies differ across platforms. A multi-embodiment model must represent those differences rather than assume that all actions share the same meaning.',
          'Dataset size alone does not establish coverage. Evaluate which robots, tasks, environments, failure cases, sensor streams, and licenses are present, and whether test splits prevent leakage from repeated trajectories or objects.',
        ],
      },
      {
        heading: 'Where tactile sensing fits',
        body: [
          'Most VLA descriptions start with images and instructions. Contact-rich tasks create a second timescale: visual planning may operate relatively slowly while slip, force, or local deformation can require faster feedback. A tactile pathway can enter the main policy, a specialized contact controller, a predicted future, or a high-frequency correction layer.',
          'T-Rex and ReTouch are 2026 preprints that investigate tactile-reactive or tactile-predictive VLA designs for dexterous manipulation. Their source-reported results belong to their own robots, datasets, tasks, baselines, and evaluation settings; they are not universal VLA rankings.',
        ],
      },
      {
        heading: 'How to evaluate a robot VLA',
        body: [
          'A robust evaluation should identify the training resources, robot embodiment, task family, visual conditions, action interface, control rate, inference hardware, intervention rules, and real-robot trial protocol. Generalization should name what changed: object, scene, instruction, robot, sensor, task, or dynamics.',
        ],
        bullets: [
          'Compare against matched policy and no-language or no-touch ablations where the claim requires them',
          'Report task completion, speed, recovery, safety constraints, and physical side effects rather than only offline loss',
          'Separate simulation, replay, benchmark, staged demonstration, and repeated real-robot evidence',
          'Check whether the model, code, weights, data, and evaluation procedure are actually accessible',
        ],
      },
      {
        heading: 'Current model ecosystem',
        body: [
          'Google DeepMind describes Gemini Robotics 2 as a VLA for whole-body and dexterous robot control, paired with a separate embodied reasoning model. NVIDIA publishes Isaac GR00T as a family of open foundation models for generalized humanoid reasoning and skills. Hugging Face LeRobot exposes multiple policy families, datasets, evaluation environments, and 2026 integrations for VLAs and world-model policies.',
          'RoboSkin.ai does not treat those official descriptions as proof of equivalent capability. This page owns the VLA and action-policy role; the robot foundation-model directory owns broad pretraining, transfer, access, and evidence comparisons, while tactile foundation-model, world-model, dataset, benchmark, and manipulation pages hold narrower technical evidence.',
        ],
      },
    ],
    faqs: [
      { question: 'What is a robot VLA model?', answer: 'A robot vision-language-action model uses visual observations and language instructions to produce or condition robot actions. Architectures and action interfaces vary, so the term does not specify one model design.' },
      { question: 'Is a VLA the same as a robot foundation model?', answer: 'Not always. A VLA may be trained as a broad reusable foundation model or for a narrower robot and task set. Foundation-model claims require evidence for transfer, adaptation, or reuse.' },
      { question: 'Do robot VLA models use touch?', answer: 'Some do, but many are vision-language-action systems without live tactile input. Touch may be fused into the policy, used by a fast correction layer, or predicted by a world model.' },
      { question: 'How should VLA models be compared?', answer: 'Compare them only after aligning robot embodiment, tasks, inputs, action space, data, baselines, control rate, and real-robot evaluation. Unlike settings should not be collapsed into a leaderboard.' },
    ],
    relatedLinks: [
      { label: 'AI and robotics', href: '/ai-robotics', description: 'Place VLA policies inside the full perception, reasoning, control, action, and feedback loop.' },
      { label: 'Robot foundation models', href: '/robot-foundation-models', description: 'Compare broader model roles, training data, embodiment transfer, access, and evidence.' },
      { label: 'Tactile foundation models', href: '/tactile-foundation-models', description: 'Compare touch representations, predictive models, and policy roles.' },
      { label: 'Robot learning', href: '/robot-learning', description: 'Connect VLA policies to demonstrations, datasets, training paradigms, and evaluation.' },
      { label: 'Visuo-tactile world models', href: '/guides/visuo-tactile-world-models-robot-manipulation', description: 'Review action-conditioned contact prediction and planning evidence.' },
      { label: 'Robot manipulation', href: '/robot-manipulation', description: 'Connect model outputs to grasping, insertion, dexterity, and recovery.' },
      { label: 'Humanoid robots', href: '/humanoid-robots', description: 'Place VLA models inside the full humanoid hardware and control stack.' },
      { label: 'Tactile datasets', href: '/datasets', description: 'Audit robot, sensor, task, signal, format, and access coverage.' },
      { label: 'Tactile benchmarks', href: '/benchmarks', description: 'Separate shared evaluation protocols from dataset access.' },
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'Map multimodal inputs, contact logs, models, and action loops.' },
    ],
    sources: [
      { label: 'Google DeepMind Gemini Robotics 2', href: 'https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/' },
      { label: 'Google DeepMind Gemini Robotics model overview', href: 'https://deepmind.google/models/gemini-robotics/' },
      { label: 'NVIDIA Isaac GR00T developer overview', href: 'https://developer.nvidia.com/isaac/gr00t' },
      { label: 'Hugging Face LeRobot v0.6 release', href: 'https://huggingface.co/blog/lerobot-release-v060' },
      { label: 'Physical Intelligence pi0 technical report', href: 'https://www.physicalintelligence.company/download/pi0.pdf' },
      { label: 'T-Rex tactile-reactive manipulation preprint', href: 'https://arxiv.org/abs/2606.17055' },
      { label: 'ReTouch contact-rich manipulation preprint', href: 'https://arxiv.org/abs/2608.01824' },
    ],
    paperBriefIds: ['dream-tac-tactile-world-action-model-2026', 'feelworld-visuo-tactile-world-model-2026', 'sparsh-x-multisensory-touch-representations-2025'],
  },
  {
    path: '/robot-manipulation',
    title: 'Robot Manipulation: Learning, Grasping, Touch & Dexterity',
    description:
      'Explore robot manipulation across grasping, dexterous hands, insertion, robot learning, VLA policies, force control, tactile feedback, and evaluation.',
    h1: 'Robot manipulation: learning, control and tactile feedback',
    kicker: 'High-interest robotics task pillar',
    intent: 'Broad pillar for robot manipulation, robotic manipulation, dexterous manipulation, robot grasping, contact-rich tasks, manipulation learning, and tactile feedback.',
    published: '2026-08-20',
    updated: '2026-08-20',
    priority: 0.95,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'applications',
    keywords: ['robot manipulation', 'robotic manipulation', 'dexterous manipulation', 'robot grasping', 'contact-rich manipulation', 'robot hand control', 'force control robotics', 'manipulation learning'],
    quickAnswer: [
      'Robot manipulation is the process of using a robot arm, hand, gripper, or whole body to change the state of an object or environment through actions such as grasping, moving, inserting, turning, folding, or tool use.',
      'A manipulation system combines perception, state estimation, planning or policy learning, robot control, end-effector hardware, data, and evaluation. Contact-rich tasks also need evidence about force, slip, deformation, seating, and recovery.',
      'Tactile sensing is valuable after contact begins or vision becomes occluded. It can support grasp stabilization, insertion correction, deformable-object handling, dexterity, and failure recovery when the controller can act on the signal in time.',
    ],
    sections: [
      {
        heading: 'The robot manipulation stack',
        body: [
          'Manipulation begins before contact with scene understanding and motion planning, then becomes a contact and control problem as the hand or gripper reaches the object. A complete system needs a defined observation, action, end effector, controller or policy, task objective, and evaluation protocol.',
        ],
        bullets: [
          'Perception: objects, geometry, materials, people, obstacles, and contact context',
          'Planning or policy: task sequence, grasp, trajectory, action chunk, or recovery choice',
          'Control: position, velocity, impedance, force, torque, or learned closed-loop command',
          'End effector: parallel gripper, suction, multi-finger hand, soft gripper, or tool',
          'Feedback: vision, proprioception, force or torque, tactile arrays, and task outcome',
        ],
      },
      {
        heading: 'Manipulation task families',
        body: [
          'A model that succeeds at pick-and-place has not automatically solved insertion, deformable objects, tool use, or multi-finger dexterity. Task families create different sensing, control, and evaluation requirements.',
        ],
        table: {
          headers: ['Task family', 'Physical challenge', 'Useful feedback', 'Evidence to report'],
          rows: [
            ['Pick, place, and regrasp', 'Pose error, grasp stability, occlusion, and object variation', 'Vision, proprioception, slip, pressure distribution', 'Objects, poses, trials, drops, speed, and recovery'],
            ['Insertion and assembly', 'Jamming, tight tolerance, seating, and hidden contact', 'Force, torque, contact direction, tactile state', 'Tolerance, clearance, forces, failures, and completion criteria'],
            ['Dexterous in-hand manipulation', 'Many contacts, underactuation, rolling, sliding, and reorientation', 'Full-hand touch, joint state, local slip and shear', 'Hand, objects, contact coverage, success, and intervention'],
            ['Deformable-object handling', 'State is high-dimensional and changes under contact', 'Vision, distributed touch, force, and action history', 'Material range, initial states, damage, generalization, and repeatability'],
            ['Tool use and long-horizon tasks', 'Sequencing, constraints, changing contact modes, and recovery', 'Language, vision, contact confirmation, and task progress', 'Autonomy, subtask success, resets, time, and failure taxonomy'],
          ],
        },
      },
      {
        heading: 'Hands, grippers and whole-body manipulation',
        body: [
          'A two-finger gripper can be reliable and easier to control for many industrial tasks. Multi-finger hands add contact options and human-tool compatibility but also increase sensing, calibration, action-space, control, and maintenance complexity. Whole-body manipulation adds balance, mobility, reach, and environmental contacts.',
          'Compare systems by the task and embodiment they actually test, not by assuming that more degrees of freedom always produce better manipulation.',
        ],
      },
      {
        heading: 'Learning, VLA policies and world models',
        body: [
          'Modern manipulation research includes imitation learning, reinforcement learning, diffusion or flow-based policies, vision-language-action models, and predictive world or world-action models. These methods can share data and components while serving different roles.',
          'Language can specify a task, vision can establish scene context, proprioception can expose robot configuration, and touch can ground the policy in physical contact. A world model may predict what follows an action, while a controller still needs to execute and correct the motion.',
        ],
      },
      {
        heading: 'When tactile feedback changes the task',
        body: [
          'Tactile feedback is most defensible when the experiment isolates what changes after adding touch. A matched vision-only or no-touch baseline, synchronized inputs, latency reporting, disturbance tests, and closed-loop outcomes help show whether the contact pathway is doing useful work.',
          'T-Rex investigates tactile-reactive VLA manipulation, while ReTouch investigates online-refined tactile prediction for contact-rich dexterity. Both are 2026 preprints with source-specific robots, datasets, baselines, and tasks. Their reported results should not be transferred to other systems without new evidence.',
        ],
      },
      {
        heading: 'How to compare manipulation results',
        body: [
          'A credible comparison aligns the task, robot, end effector, observations, training data, action budget, controller rate, objects, environment, and evaluation procedure. It also states whether failures were retried, demonstrations were selected, or a person intervened.',
        ],
        bullets: [
          'Use task success together with time, force, drops, damage, recovery, and safety constraints',
          'Separate perception metrics from real-robot task outcomes',
          'Group train and test splits by trajectory, object, scene, sensor, or embodiment when leakage is possible',
          'Treat a staged demonstration, benchmark score, preprint result, and production deployment as different evidence levels',
        ],
      },
    ],
    faqs: [
      { question: 'What is robot manipulation?', answer: 'Robot manipulation is the use of an arm, hand, gripper, tool, or whole body to intentionally change an object or environment through physical action.' },
      { question: 'What is dexterous manipulation?', answer: 'Dexterous manipulation uses coordinated contacts and motion to perform tasks such as reorientation, multi-finger control, tool use, or handling objects with tight physical constraints.' },
      { question: 'Why is tactile sensing useful for robot manipulation?', answer: 'Touch exposes local contact, pressure, shear, slip, deformation, seating, and hidden motion after contact begins, especially when the hand or object occludes vision.' },
      { question: 'How should robot manipulation systems be evaluated?', answer: 'Align the robot, end effector, task, inputs, data, controller, objects, trials, success criteria, interventions, and failure reporting before comparing results.' },
    ],
    relatedLinks: [
      { label: 'AI and robotics', href: '/ai-robotics', description: 'Place manipulation inside the full perception, planning, policy, control, and feedback loop.' },
      { label: 'Tactile manipulation', href: '/tactile-manipulation', description: 'Follow the contact-to-action loop in detail.' },
      { label: 'Robot learning', href: '/robot-learning', description: 'Compare demonstrations, reinforcement, datasets, simulation, and tactile learning.' },
      { label: 'Robot VLA models', href: '/robot-vla-models', description: 'Understand instruction-conditioned robot policies and model roles.' },
      { label: 'Humanoid robots', href: '/humanoid-robots', description: 'Connect manipulation to hands, whole-body control, and Physical AI.' },
      { label: 'Robot hand tactile sensors', href: '/applications/robot-hand-tactile-sensor', description: 'Map fingertip, finger, palm, and full-hand sensing.' },
      { label: 'Slip detection', href: '/guides/slip-detection-robot-hand', description: 'Trace slip evidence into grasp correction and recovery.' },
      { label: 'Tactile sensor benchmark', href: '/guides/tactile-sensor-benchmark-robot-manipulation', description: 'Compare sensors by task and evidence boundary.' },
      { label: 'Tactile datasets', href: '/datasets', description: 'Find aligned observations, actions, robots, sensors, and licenses.' },
      { label: 'Tactile benchmarks', href: '/benchmarks', description: 'Review shared tasks, splits, metrics, baselines, and protocols.' },
    ],
    sources: [
      { label: 'Google DeepMind Gemini Robotics 2', href: 'https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/' },
      { label: 'T-Rex tactile-reactive manipulation preprint', href: 'https://arxiv.org/abs/2606.17055' },
      { label: 'ReTouch contact-rich manipulation preprint', href: 'https://arxiv.org/abs/2608.01824' },
      { label: 'Nature Machine Intelligence full-hand tactile sensing paper', href: 'https://www.nature.com/articles/s42256-025-01053-3' },
      { label: 'ManiSkill-ViTac challenge paper', href: 'https://arxiv.org/abs/2411.12503' },
      { label: 'FreeTacMan project', href: 'https://opendrivelab.com/FreeTacMan' },
    ],
    paperBriefIds: ['ht-bench-full-hand-tactile-representations-2026', 'freetacman-robot-free-visuotactile-data-collection-2025', 'dream-tac-tactile-world-action-model-2026', 't-rex-tactile-reactive-dexterous-manipulation-2026', 'hitac-wam-hierarchical-tactile-world-action-model-2026', 'tactidex-tactile-guided-dexterous-benchmark-2026'],
  },
  {
    path: '/robot-learning',
    title: 'Robot Learning: Models, Datasets & Real-World Robotics',
    description:
      'Learn how robots learn from demonstrations, reinforcement, datasets, simulation, and touch, with source-backed guidance for real-world evaluation.',
    h1: 'Robot learning: data, models and real-world evaluation',
    kicker: 'High-interest robotics pillar',
    intent: 'Definition and research map for robot learning, imitation learning, reinforcement learning, robot datasets, sim-to-real transfer, policy training, and tactile learning.',
    published: '2026-08-20',
    updated: '2026-08-20',
    priority: 0.94,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'resources',
    keywords: ['robot learning', 'robotics machine learning', 'imitation learning robotics', 'reinforcement learning robots', 'robot learning datasets', 'sim-to-real robotics', 'robot policy learning', 'tactile robot learning', 'LeRobot'],
    quickAnswer: [
      'Robot learning is the use of data and experience to train robots to perceive, predict, or act instead of specifying every behavior as a fixed rule. The training signal may come from demonstrations, rewards, self-supervision, simulation, human feedback, or combinations of these sources.',
      'A useful robot-learning claim must name the robot, observations, action space, data, task, training method, evaluation split, autonomy level, and real-world trial protocol. Model size or dataset size alone does not establish physical capability.',
      'Touch matters when success depends on hidden contact state. Tactile observations can expose pressure, shear, slip, seating, deformation, and contact transitions that vision and proprioception may not measure directly.',
    ],
    sections: [
      {
        heading: 'The robot-learning loop',
        body: [
          'Robot learning connects observations to actions through a training objective and an evaluation protocol. Observations may include cameras, depth, language, proprioception, force, torque, or tactile signals. Actions may be joint commands, end-effector motion, gripper state, trajectories, or action chunks.',
          'The loop is only as reliable as its data and evaluation. Demonstration quality, timing, calibration, resets, interventions, failed attempts, and hardware changes can all alter what the learned policy actually represents.',
        ],
        bullets: [
          'Collect synchronized observations, robot state, actions, task context, and failure metadata',
          'Train a policy, representation, reward model, dynamics model, or reusable foundation model',
          'Evaluate on held-out tasks, objects, scenes, robots, sensors, or physical conditions',
          'Measure real-robot success, speed, recovery, force, damage, and intervention instead of only offline loss',
        ],
      },
      {
        heading: 'Major learning paradigms',
        body: [
          'Robot-learning labels describe different supervision and optimization choices. Many practical systems combine several of them, so comparisons should identify the exact training and deployment role.',
        ],
        table: {
          headers: ['Approach', 'Learning signal', 'Typical strength', 'Evidence boundary'],
          rows: [
            ['Imitation learning', 'Expert or teleoperated demonstrations', 'Directly learns behaviors represented in the demonstrations', 'Sensitive to demonstration coverage and distribution shift'],
            ['Reinforcement learning', 'Reward from interaction or simulation', 'Can optimize behavior through trial and feedback', 'Reward design, safety, sample cost, and sim-to-real transfer must be reported'],
            ['Offline robot learning', 'Previously collected trajectories', 'Reuses data without new online exploration during training', 'Cannot assume the logged data covers every useful action or failure'],
            ['Self-supervised representation learning', 'Structure inside unlabeled or weakly labeled observations', 'Can create reusable visual, tactile, or multimodal features', 'Representation scores do not automatically prove closed-loop task value'],
            ['Vision-language-action policy', 'Robot trajectories paired with images and instructions', 'Connects task language and observations to actions', 'Embodiment, action interface, data mix, and real-robot evaluation determine scope'],
          ],
        },
      },
      {
        heading: 'Data is part of the robot system',
        body: [
          'Open X-Embodiment, DROID, and the LeRobot ecosystem illustrate different routes toward reusable robot data: cross-embodiment aggregation, a large real-world manipulation dataset, and a standardized open data and tooling ecosystem. They are complementary examples, not interchangeable benchmarks.',
          'A dataset record should expose the robot, sensor streams, control interface, task labels, trajectory unit, timing, calibration, collection policy, train-test split, access path, and license. Without those fields, scale is difficult to interpret and reuse is harder to audit.',
        ],
      },
      {
        heading: 'Simulation and sim-to-real transfer',
        body: [
          'Simulation can generate experience, perturbations, labels, and repeatable evaluation without exposing hardware to every trial. Transfer to a physical robot still depends on geometry, dynamics, contact, sensing, latency, control, and observation differences between the simulator and the deployed system.',
          'Report what was randomized, adapted, calibrated, or fine-tuned, and separate simulation success from repeated physical trials. A simulator benchmark can test a method under controlled conditions; it does not by itself establish real-world reliability.',
        ],
      },
      {
        heading: 'Tactile robot learning',
        body: [
          'Touch can enter robot learning as raw tactile images, force or pressure arrays, compact contact representations, predicted future observations, a reward signal, or a fast correction pathway. The right representation depends on the sensor, task, controller rate, and data available.',
          'ManiSkill-ViTac provides a primary-source example of a simulation benchmark focused on visuo-tactile manipulation. Physical tactile datasets and full-hand benchmarks add different evidence. Results should stay attached to their robot, sensor, task, split, and protocol.',
        ],
        bullets: [
          'Synchronize touch with camera frames, pose, joint state, action, and contact events',
          'Compare against matched no-touch or shuffled-touch baselines where tactile value is claimed',
          'Test occlusion, slip, insertion, deformable objects, or disturbances that make contact information relevant',
          'Report sensor calibration, wear, drift, replacement, and latency when they can affect the learned behavior',
        ],
      },
      {
        heading: 'How to evaluate robot-learning claims',
        body: [
          'Evaluation should make the claimed generalization axis explicit. A new object, background, instruction, robot, sensor, task, or dynamics setting tests a different kind of transfer. Combining them into one broad label hides the actual boundary.',
        ],
        table: {
          headers: ['Question', 'What to record', 'Why it matters'],
          rows: [
            ['What was learned?', 'Policy, representation, reward, dynamics, plan, or controller role', 'Prevents different model roles from being ranked as if they were identical'],
            ['What data was used?', 'Robots, tasks, trajectories, modalities, failures, licenses, and splits', 'Defines the experience available to the model'],
            ['What changed at test time?', 'Object, scene, instruction, embodiment, sensor, task, or physics', 'Names the actual generalization claim'],
            ['How physical was the evidence?', 'Replay, simulation, staged demo, repeated real-robot trials, or deployment', 'Separates offline performance from physical reliability'],
            ['What happened when it failed?', 'Retries, resets, intervention, damage, safety stops, and recovery', 'Exposes operational cost and robustness'],
          ],
        },
      },
      {
        heading: 'Open tooling and the 2026 ecosystem',
        body: [
          'Hugging Face describes LeRobot as an open robotics ecosystem for models, datasets, and tools. Its official v0.6.0 release expands policy evaluation and model-development workflows. These releases are useful infrastructure signals; any capability claim still needs the named policy, dataset, robot, task, and evaluation result.',
          'Google DeepMind’s Gemini Robotics materials represent another branch of the field: models intended to connect multimodal understanding and robot action. RoboSkin.ai keeps those broad model developments connected to the narrower question of when tactile evidence improves contact-rich behavior.',
        ],
      },
    ],
    faqs: [
      { question: 'What is robot learning?', answer: 'Robot learning uses data or experience to train robot perception, prediction, or action instead of specifying every behavior as a fixed rule.' },
      { question: 'What is the difference between imitation learning and reinforcement learning for robots?', answer: 'Imitation learning learns from demonstrated behavior. Reinforcement learning improves behavior using a reward signal from interaction or simulation. Systems can combine both.' },
      { question: 'What makes a robot-learning dataset useful?', answer: 'It should identify the robot, observations, actions, task context, timing, calibration, trajectory unit, collection policy, splits, access path, and license.' },
      { question: 'Why does robot learning need tactile data?', answer: 'It needs tactile data when physical success depends on pressure, shear, slip, seating, deformation, or contact transitions that other sensors do not measure directly.' },
      { question: 'How should sim-to-real results be judged?', answer: 'State what was trained in simulation, what was randomized or adapted, which physical robot and tasks were tested, how many trials were run, and which failures or interventions occurred.' },
    ],
    relatedLinks: [
      { label: 'AI and robotics', href: '/ai-robotics', description: 'Place learning methods inside the complete model, robot, action, and feedback system.' },
      { label: 'Robot foundation models', href: '/robot-foundation-models', description: 'Compare reusable model roles, data, embodiment transfer, access, and evidence.' },
      { label: 'Robot VLA models', href: '/robot-vla-models', description: 'Place vision-language-action policies inside the broader robot-learning stack.' },
      { label: 'Robot manipulation', href: '/robot-manipulation', description: 'Connect learning methods to grasping, insertion, dexterity, and contact-rich tasks.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'Follow the path from touch signals to robot perception and action.' },
      { label: 'Tactile datasets', href: '/datasets', description: 'Filter source-reviewed resources by robot, sensor, task, modality, and license.' },
      { label: 'Tactile benchmarks', href: '/benchmarks', description: 'Review tasks, protocols, metrics, baselines, and evidence boundaries.' },
      { label: 'Tactile foundation models', href: '/tactile-foundation-models', description: 'Separate reusable tactile representations, predictive models, and policies.' },
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'Connect learned robot behavior to multimodal physical-world feedback.' },
      { label: 'Humanoid robots', href: '/humanoid-robots', description: 'Map learning, control, hands, locomotion, safety, and tactile sensing.' },
    ],
    sources: [
      { label: 'Hugging Face LeRobot v0.6.0', href: 'https://huggingface.co/blog/lerobot-release-v060' },
      { label: 'Hugging Face LeRobot documentation', href: 'https://huggingface.co/docs/lerobot/index' },
      { label: 'Open X-Embodiment', href: 'https://arxiv.org/abs/2310.08864' },
      { label: 'DROID robot manipulation dataset', href: 'https://arxiv.org/abs/2403.12945' },
      { label: 'Google DeepMind Gemini Robotics', href: 'https://deepmind.google/models/gemini-robotics/' },
      { label: 'ManiSkill-ViTac', href: 'https://arxiv.org/abs/2411.12503' },
    ],
    paperBriefIds: ['ht-bench-full-hand-tactile-representations-2026', 'freetacman-robot-free-visuotactile-data-collection-2025', 'dream-tac-tactile-world-action-model-2026', 't-rex-tactile-reactive-dexterous-manipulation-2026', 'robotacdex-humanoid-visual-tactile-action-dataset-2026'],
  },
  {
    path: '/robot-hands',
    title: 'Robot Hands: Dexterity, Sensors & Comparison Guide',
    description:
      'Compare robot hands and grippers by actuation, sensing, control, task fit, and evidence. Learn how tactile robot hands support dexterous manipulation.',
    h1: 'Robot hands: dexterity, sensing and evidence',
    kicker: 'Robotics hardware pillar',
    intent: 'Technical category guide for robot hands, robotic hands, humanoid robot hands, dexterous hands, tactile robot hands, and robot hand versus gripper searches.',
    published: '2026-08-21',
    updated: '2026-08-21',
    priority: 0.94,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'technology',
    keywords: ['robot hands', 'robotic hands', 'humanoid robot hands', 'dexterous robot hand', 'tactile robot hand', 'robot hand sensors', 'five-finger robot hand', 'robot hand comparison', 'robot gripper vs robot hand', 'dexterous manipulation'],
    quickAnswer: [
      'A robot hand is an end effector with fingers or multiple articulated contacts designed to grasp, reorient, manipulate, or use objects. The term covers simple adaptive hands as well as highly actuated anthropomorphic systems.',
      'A multi-finger hand can create more contact configurations than a two-finger gripper, but it also increases mechanical, sensing, calibration, control, data, and maintenance complexity. More joints do not guarantee better task performance.',
      'Tactile sensors on fingertips, fingers, and palms can expose contact location, pressure, shear, slip, and grasp state after vision becomes occluded. Their value should be tested through closed-loop task outcomes, not sensitivity claims alone.',
    ],
    sections: [
      {
        heading: 'Robot hand, adaptive hand, or gripper?',
        body: [
          'End-effectors should be selected for the work they must perform. A parallel gripper can be reliable for repetitive pick-and-place, while a multi-finger hand can support more grasp shapes, in-hand motion, and tools designed for people. Adaptive or underactuated hands sit between these categories by allowing several joints to conform with fewer independently controlled actuators.',
          'The words hand, gripper, dexterous, and anthropomorphic do not establish capability by themselves. A defensible comparison names the joints and actuators, sensing, payload and object range, control interface, cycle time, durability, task protocol, and failure behavior actually tested.',
        ],
        table: {
          headers: ['End-effector class', 'Typical advantage', 'Typical engineering cost', 'Where touch can help'],
          rows: [
            ['Parallel or two-finger gripper', 'Simple action space and repeatable opposing contact for suitable objects', 'Limited grasp geometry and in-hand reconfiguration', 'Detect first contact, seating, slip, and grip imbalance'],
            ['Adaptive or underactuated hand', 'Passive or coupled conformance around varied shapes', 'Internal joint state and contact distribution may be harder to infer', 'Reveal which fingers contacted and how load is distributed'],
            ['Fully or highly actuated multi-finger hand', 'More controllable contacts for reorientation and human-tool compatibility', 'Larger action space, calibration burden, data demand, and maintenance surface', 'Support contact-rich policies, slip response, and grasp-state estimation'],
            ['Soft hand or soft gripper', 'Compliance can reduce geometric precision requirements and peak contact', 'Material behavior, wear, hysteresis, and precise state estimation can be difficult', 'Measure distributed deformation and contact across compliant surfaces'],
          ],
        },
      },
      {
        heading: 'The robot-hand technology stack',
        body: [
          'A robot hand is a coupled mechatronic and software system. Mechanical design sets reachable contact configurations; actuation and transmission determine controllability; sensors expose joint and contact state; the controller turns those signals into coordinated motion; and the policy or planner selects actions for a task.',
        ],
        bullets: [
          'Mechanics: finger count, joint layout, thumb opposition, compliance, workspace, and replaceable contact surfaces',
          'Actuation: electric, tendon-driven, pneumatic, hydraulic, direct-drive, geared, or underactuated mechanisms',
          'State sensing: encoders, current, force or torque, fingertip touch, finger and palm arrays, and external vision',
          'Control: position, impedance, force, synergy, trajectory, policy, or layered high- and low-frequency control',
          'Integration: wrist interface, power, communication, calibration, robot middleware, logging, and safety behavior',
        ],
      },
      {
        heading: 'How to compare robot hands without a misleading leaderboard',
        body: [
          'Degrees of freedom and actuator count describe architecture, not universal dexterity. Payload, fingertip force, speed, repeatability, tactile coverage, compliance, environmental tolerance, power, mass, maintenance, software access, and task evidence all matter. Values from different test methods should not be placed in one ranked table without aligning definitions and conditions.',
          'For procurement or research selection, record whether each specification is a manufacturer statement, a calibrated measurement, a peer-reviewed result, an independent benchmark, or an observation from a demonstration. Unknown fields should stay unknown rather than being inferred from a product image or marketing name.',
        ],
        table: {
          headers: ['Comparison field', 'What to record', 'Evidence check'],
          rows: [
            ['Kinematics and actuation', 'Controllable joints, coupled joints, actuators, workspace, and control modes', 'Use current manuals, interface documentation, or a named experimental setup'],
            ['Physical operating range', 'Mass, dimensions, payload, force, speed, environmental and duty constraints', 'Keep units and test conditions; do not mix peak and continuous values'],
            ['Sensing', 'Joint state, force or torque, tactile modality, coverage, rate, calibration, and replaceability', 'Separate built-in sensing from optional or research-added sensors'],
            ['Software and data', 'API, middleware, command interface, logs, simulator, examples, and license', 'Verify the exact hardware and software version'],
            ['Task evidence', 'Objects, trials, success criteria, speed, interventions, failures, and baseline', 'Treat official demos, preprints, peer review, and independent tests as different evidence levels'],
          ],
        },
      },
      {
        heading: 'Tactile sensing across fingertips, fingers, and palms',
        body: [
          'A fingertip sensor can resolve local contact for insertion, slip response, or texture-related tasks. Finger and palm sensing can expose load paths and contacts that a fingertip-only layout misses. Whole-hand systems increase coverage but create routing, calibration, durability, bandwidth, and representation challenges.',
          'The Nature Machine Intelligence full-hand tactile sensing work and the HT-Bench/HandTouch preprint are useful research examples, but they answer different questions. The first demonstrates an integrated full-hand sensing approach; the second proposes data and evaluation tracks for learned full-hand representations. Neither source proves that one sensor or representation is best for every hand and task.',
        ],
      },
      {
        heading: 'Robot hands in humanoid and dexterous manipulation research',
        body: [
          'Google DeepMind’s Gemini Robotics 2 announcement reports experiments across whole-body Apollo hardware, a multi-finger Sharpa hand, and a Franka Duo gripper setup. Those are official developer-reported evaluations, not an independent cross-hand benchmark. They show why embodiment and end-effector must remain attached to every task result.',
          'TactiDex, HRDexDB, and related preprints investigate tactile skill transfer or reusable hand data. Their datasets, robots, sensors, object sets, and protocols differ, so reported results should remain source-bounded rather than being converted into a universal hand ranking.',
        ],
        table: {
          headers: ['Research asset', 'Hand or sensing role', 'What it can support', 'Boundary'],
          rows: [
            ['HT-Bench / HandTouch', 'Full-hand tactile data and learned representation evaluation', 'Cross-task tactile representation research', '2026 preprint with named sensors, tasks, splits, and evaluation tracks'],
            ['TactiDex', 'Aligned human tactile and kinematic state for tactile-guided dexterous transfer', 'Single- and bimanual skill-transfer research', '2026 preprint; results belong to its capture and robot deployment setup'],
            ['HRDexDB', 'Human and multiple robot-hand grasp records with tactile, visual, and kinematic data', 'Cross-hand grasp and contact research', '2026 preprint; scale and coverage do not by themselves prove policy transfer'],
            ['Gemini Robotics 2', 'Official manipulation evaluation across different end effectors and embodiments', 'VLA and whole-body system research context', 'Developer-reported task results, not a neutral robot-hand benchmark'],
          ],
        },
      },
      {
        heading: 'Evidence checklist for a tactile robot hand',
        body: [
          'A useful tactile-hand evaluation starts with a task that genuinely depends on contact: occluded grasping, slip, insertion, reorientation, deformable objects, handover, or disturbance recovery. It then aligns the hand, objects, sensors, controller, trial count, success definition, and no-touch baseline.',
        ],
        bullets: [
          'Report tactile placement, modality, rate, calibration, latency, wear, and missing-contact regions',
          'Synchronize touch with joint state, camera frames, action commands, and task events',
          'Compare matched touch and no-touch conditions when claiming a tactile benefit',
          'Record drops, excessive force, damage, retries, human intervention, and recovery as well as task success',
        ],
      },
    ],
    faqs: [
      { question: 'What is a robot hand?', answer: 'A robot hand is an end effector with fingers or multiple articulated contacts used to grasp, reorient, manipulate, or operate objects. Designs range from adaptive hands to highly actuated anthropomorphic systems.' },
      { question: 'Is a robot hand better than a robot gripper?', answer: 'Not universally. A gripper may be simpler and more repeatable for constrained tasks. A multi-finger hand can offer more contact configurations and tool compatibility but increases control, sensing, data, and maintenance complexity.' },
      { question: 'Why do robot hands need tactile sensors?', answer: 'Tactile sensors can expose local contact, pressure distribution, shear, slip, and seating after the fingers occlude the object or external cameras cannot see the contact state.' },
      { question: 'How should robot hands be compared?', answer: 'Align kinematics, actuation, physical limits, sensing, software, task, objects, trials, success criteria, interventions, failures, and evidence level. Do not rank hands by degrees of freedom alone.' },
    ],
    relatedLinks: [
      { label: 'AI and robotics', href: '/ai-robotics', description: 'Connect hand embodiment and sensing to robot policies, control, and physical outcomes.' },
      { label: 'Humanoid robots', href: '/humanoid-robots', description: 'Place hands inside whole-body Physical AI systems.' },
      { label: 'Robot manipulation', href: '/robot-manipulation', description: 'Connect end-effectors to grasping, insertion, reorientation, and tool use.' },
      { label: 'Robot hand tactile sensors', href: '/applications/robot-hand-tactile-sensor', description: 'Compare fingertip, finger, palm, and full-hand sensing roles.' },
      { label: 'Tactile manipulation', href: '/tactile-manipulation', description: 'Follow the closed-loop path from contact to corrective action.' },
      { label: 'Robot VLA models', href: '/robot-vla-models', description: 'Understand instruction-conditioned policies and embodiment boundaries.' },
      { label: 'Robotics datasets', href: '/robotics-datasets', description: 'Find broader manipulation, teleoperation, and multi-embodiment data resources.' },
      { label: 'Tactile datasets', href: '/datasets', description: 'Use the dedicated touch-data directory.' },
    ],
    sources: [
      { label: 'Nature Machine Intelligence full-hand tactile sensing paper', href: 'https://www.nature.com/articles/s42256-025-01053-3' },
      { label: 'HT-Bench full-hand tactile representation preprint', href: 'https://arxiv.org/abs/2606.19161' },
      { label: 'TactiDex tactile-guided dexterous benchmark preprint', href: 'https://arxiv.org/abs/2607.09190' },
      { label: 'HRDexDB multi-hand grasp database preprint', href: 'https://arxiv.org/abs/2604.14944' },
      { label: 'Google DeepMind Gemini Robotics 2', href: 'https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/' },
    ],
    paperBriefIds: ['ht-bench-full-hand-tactile-representations-2026', 'full-hand-tactile-sensing-2025', 't-rex-tactile-reactive-dexterous-manipulation-2026', 'tactidex-tactile-guided-dexterous-benchmark-2026'],
  },
  {
    path: '/robot-safety',
    title: 'Robot Safety: Standards, Sensors & Evidence',
    description:
      'Understand industrial and humanoid robot safety, ISO 10218 scope, risk reduction, collision and contact sensing, validation, and robot-skin evidence boundaries.',
    h1: 'Robot safety: standards, sensing and validation',
    kicker: 'Robotics assurance pillar',
    intent: 'Technical orientation for robot safety, humanoid robot safety, industrial robot safety, collaborative robot safety, collision detection, safety sensors, and robot skin safety searches.',
    published: '2026-08-21',
    updated: '2026-08-21',
    priority: 0.93,
    changeFrequency: 'monthly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['robot safety', 'humanoid robot safety', 'industrial robot safety', 'collaborative robot safety', 'robot collision detection', 'robot safety sensors', 'robot skin safety', 'ISO 10218 2025', 'human robot contact safety'],
    quickAnswer: [
      'Robot safety is a system-level discipline covering hazard identification, risk assessment, inherently safer design, protective measures, validated controls, integration, operating procedures, maintenance, and incident response. No single sensor makes a robot safe.',
      'ISO 10218-1:2025 addresses industrial robots, while ISO 10218-2:2025 addresses industrial robot applications and robot cells. Their scope should not be applied automatically to every service, medical, public-space, or research humanoid system.',
      'Robot skin and tactile sensors can contribute contact or collision information, but their safety role depends on coverage, detection threshold, latency, diagnostics, failure behavior, control integration, validation, and the applicable regulatory and standards context.',
    ],
    sections: [
      {
        heading: 'Safety is a layered system, not a sensor feature',
        body: [
          'A complete robot-safety argument starts with the intended use and foreseeable misuse, identifies hazards throughout the lifecycle, estimates risk, applies risk-reduction measures, and verifies that the resulting system behaves as required. Mechanical limits, motion planning, control architecture, protective equipment, sensing, human procedures, and maintenance can all contribute.',
          'Terms such as collaborative, compliant, soft, force-limited, autonomous, or covered in robot skin are not safety certifications. They describe possible design properties whose effect must be evaluated in the final application and environment.',
        ],
        table: {
          headers: ['Layer', 'Role', 'Evidence to retain'],
          rows: [
            ['Intended use and hazard analysis', 'Define people, tasks, environment, lifecycle, misuse, and hazardous events', 'Assumptions, hazard log, risk assessment method, and unresolved risks'],
            ['Inherently safer design', 'Reduce hazard through geometry, mass, energy, speed, force, access, or mechanical constraints', 'Design requirements, calculations, drawings, and test records'],
            ['Protective and control measures', 'Limit or stop hazardous behavior and detect relevant conditions', 'Architecture, performance requirements, diagnostics, latency, fault tests, and validation'],
            ['Information and operations', 'Set training, procedures, inspection, maintenance, and residual-risk communication', 'Manuals, training records, checklists, change control, and incident records'],
          ],
        },
      },
      {
        heading: 'What ISO 10218:2025 covers',
        body: [
          'The public ISO record describes ISO 10218-1:2025 as safety requirements for industrial robots and ISO 10218-2:2025 as the companion standard for industrial robot applications and robot cells. The ISO robotics overview also lists ISO/TS 15066:2016 for collaborative industrial robot applications.',
          'Scope matters. The public ISO 10218-1 page lists exclusions, including service and medical applications. A humanoid used in a factory cell may intersect industrial-robot requirements differently from a service humanoid in a home, hospital, or public space. Determine the applicable edition, jurisdiction, product category, integrator responsibilities, and conformity route with qualified safety and legal professionals.',
          'This page is a technical research map, not legal advice, a risk assessment, or a certification decision. The full paid standards and applicable local rules—not this summary—control formal compliance work.',
        ],
      },
      {
        heading: 'Industrial, collaborative, and humanoid safety are not interchangeable',
        body: [
          'Industrial robot safety often assumes a defined application, cell, tooling, workpiece, integration, and operating mode. Collaborative applications require evaluation of how people and the robot share a workspace. A mobile or humanoid platform can add locomotion, balance, batteries, whole-body contact, changing environments, general-purpose tools, learned behavior, and human proximity.',
          'Those added capabilities broaden the hazard and validation surface. A humanoid benchmark can help make performance measurable, but performance benchmarking is not the same as demonstrating safety compliance.',
        ],
        table: {
          headers: ['Context', 'Typical system boundary', 'Additional questions'],
          rows: [
            ['Industrial robot application', 'Robot, end effector, workpiece, cell, safeguards, and operating procedures', 'Who integrated the cell, which modes exist, and how are changes validated?'],
            ['Collaborative industrial application', 'Shared or sequential workspace with specified collaborative operations', 'Which hazards, contact cases, speeds, forces, separation functions, and foreseeable misuse were assessed?'],
            ['Mobile or humanoid robot', 'Whole mobile body, manipulation, environment, software, people, and changing tasks', 'How are falls, balance loss, body contact, tool use, learned behavior, communications, and recovery handled?'],
          ],
        },
      },
      {
        heading: 'Where collision, force, and robot-skin sensing fit',
        body: [
          'External perception can monitor people and obstacles before contact. Joint torque, motor current, force-torque sensors, proximity sensors, bumpers, and surface tactile arrays can expose different parts of a collision or contact event. Their coverage and failure modes differ, so they may complement one another.',
          'Robot skin is particularly relevant to distributed surface contact that a wrist sensor may not localize. But a research tactile array should not be described as a safety-rated protective device unless its claimed function, architecture, diagnostics, fault response, and validation satisfy the applicable requirements.',
        ],
        bullets: [
          'Map blind spots, joints, seams, tools, carried objects, hands, feet, and replaceable covers',
          'Measure detection threshold, spatial coverage, response time, end-to-end stopping response, drift, wear, and fault behavior',
          'Test expected contact as well as sensor disconnection, saturation, partial damage, timing faults, and communication loss',
          'Validate the complete sensing-to-control chain in the final robot application',
        ],
      },
      {
        heading: 'Evidence and benchmark boundaries',
        body: [
          'NIST’s Humanoid Robot Baseline Performance Benchmark project proposes low-footprint locomotion and manipulation tasks with quantifiable performance metrics and common comparison. It can improve measurement discipline and adoption readiness, but NIST does not present that project page as a safety certification scheme.',
          'Research papers can establish sensor behavior or robot performance under named conditions. Manufacturer material can document intended features. A conformity assessment, application risk assessment, and validated safety function answer different questions. RoboSkin.ai labels these evidence levels instead of combining them into one safety claim.',
        ],
      },
      {
        heading: 'Robot-safety validation checklist',
        body: [
          'Validation should trace each safety-related requirement to a method, acceptance criterion, result, and retained record. Software, model, payload, tooling, speed, environment, sensor, network, and operating-mode changes may invalidate earlier assumptions and need controlled review.',
        ],
        bullets: [
          'Name the applicable standard, edition, clause-owned requirement, local rule, and responsible party',
          'Trace hazards to design measures, protective measures, residual risks, and verification evidence',
          'Test normal operation, foreseeable misuse, faults, recovery, maintenance, and degraded sensing',
          'Retain versioned configurations, calibration, test equipment, raw logs, failures, interventions, and approvals',
        ],
      },
    ],
    faqs: [
      { question: 'What does robot safety include?', answer: 'Robot safety includes intended-use definition, hazard analysis, risk assessment, inherently safer design, protective measures, validated controls, integration, procedures, maintenance, and incident response.' },
      { question: 'Does ISO 10218:2025 cover every humanoid robot?', answer: 'No. ISO 10218-1:2025 covers industrial robots and ISO 10218-2:2025 covers industrial robot applications and cells. The applicable requirements for a humanoid depend on its use, product category, jurisdiction, integration, and other standards or regulations.' },
      { question: 'Can robot skin make a humanoid safe?', answer: 'Robot skin can contribute contact information, but no single sensor makes a humanoid safe. Its role depends on coverage, latency, diagnostics, failure response, control integration, validation, and the rest of the risk-reduction system.' },
      { question: 'Is a humanoid performance benchmark a safety certification?', answer: 'No. A performance benchmark can make locomotion or manipulation results comparable. Safety certification and application risk assessment address different requirements and evidence.' },
    ],
    relatedLinks: [
      { label: 'AI and robotics', href: '/ai-robotics', description: 'Place model behavior, low-level control, physical safeguards, and feedback in one system map.' },
      { label: 'Humanoid robots', href: '/humanoid-robots', description: 'Map embodiment, control, manipulation, sensing, and evidence.' },
      { label: 'Humanoid robot skin', href: '/humanoid-robot-skin', description: 'Review whole-body tactile coverage and safety-layer boundaries.' },
      { label: 'Robot skin', href: '/robot-skin', description: 'Understand distributed tactile surfaces and system integration.' },
      { label: 'Robot hands', href: '/robot-hands', description: 'Connect end-effector sensing to contact-rich tasks and safe handling.' },
      { label: 'Physical AI and touch', href: '/physical-ai-touch', description: 'Place contact evidence inside multimodal embodied systems.' },
      { label: 'Robot manipulation', href: '/robot-manipulation', description: 'Review contact tasks, failure modes, and outcome reporting.' },
      { label: 'ISO 10218:2025 scope brief', href: '/news/iso-10218-2025-industrial-robot-safety-scope', description: 'Read the public-source scope summary and compliance boundary.' },
      { label: 'NIST humanoid benchmark brief', href: '/news/nist-humanoid-baseline-performance-benchmark-2026', description: 'Separate a performance-benchmark proposal from a safety determination.' },
    ],
    sources: [
      { label: 'ISO 10218-1:2025 public standard record', href: 'https://www.iso.org/standard/73933.html' },
      { label: 'ISO robotics standards overview', href: 'https://www.iso.org/cms/live/live/en/sites/isoorg/home/sectors/engineering/robotics.html' },
      { label: 'NIST Humanoid Robot Baseline Performance Benchmark', href: 'https://www.nist.gov/el/intelligent-systems-division-73500/humanoid-robot-baseline-performance-benchmark' },
      { label: 'NIST Robotics program', href: 'https://www.nist.gov/el/robotics' },
      { label: 'NIST humanoid performance standards video', href: 'https://www.nist.gov/video/how-performance-standards-can-pave-way-humanoid-adoption' },
    ],
  },
  {
    path: '/robotics-datasets',
    title: 'Robotics Datasets for Robot Learning & Manipulation',
    description:
      'Compare robotics datasets by robot, task, modality, action space, timing, access, and license. Find robot learning, manipulation, teleoperation, VLA, and humanoid data.',
    h1: 'Robotics datasets: data for robot learning and evaluation',
    kicker: 'Robot data pillar',
    intent: 'Structured guide for robotics datasets, robot learning datasets, manipulation datasets, LeRobot datasets, VLA training data, teleoperation data, and humanoid datasets.',
    published: '2026-08-21',
    updated: '2026-08-21',
    priority: 0.95,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'resources',
    keywords: ['robotics datasets', 'robot learning datasets', 'robot manipulation datasets', 'LeRobot datasets', 'VLA training data', 'robot teleoperation dataset', 'humanoid robot dataset', 'robot demonstration data', 'multi-embodiment robot data'],
    quickAnswer: [
      'A robotics dataset is a structured collection of robot observations, states, actions, task context, outcomes, or environment records used to train, evaluate, or reproduce robotic systems.',
      'Useful dataset scale is not only the number of frames or trajectories. Robot embodiment, action interface, task diversity, failures, calibration, timing, train-test splits, access, and license determine what can be learned or compared.',
      'This page covers broad robot learning, manipulation, teleoperation, VLA, and humanoid data. RoboSkin.ai’s /datasets directory remains the specialized hub for tactile and visuo-tactile robotics datasets.',
    ],
    sections: [
      {
        heading: 'Robotics datasets and tactile datasets serve different scopes',
        body: [
          'Broad robotics datasets may contain cameras, depth, proprioception, actions, language, rewards, demonstrations, or simulator state without any surface touch. A tactile dataset requires measured tactile data or a clearly defined contact-related modality and should document the sensor and synchronization contract.',
          'RoboSkin.ai therefore keeps two canonical hubs. This page maps the broad robot-data ecosystem; /datasets provides tactile-specific records and filters. Cross-modal resources can appear in both only when each page adds distinct fields and explanation rather than duplicate copy.',
        ],
        table: {
          headers: ['Hub', 'Primary scope', 'Minimum useful fields', 'Use it when'],
          rows: [
            ['Robotics datasets', 'Robot learning, manipulation, teleoperation, VLA, humanoid, simulation, and evaluation data', 'Robot, task, observations, actions, collection policy, trajectories, splits, access, license', 'Comparing broad training or evaluation resources'],
            ['Tactile robotics datasets', 'Touch, pressure, force-related, tactile image, slip, contact, and visuo-tactile data', 'Sensor, placement, calibration, rate, synchronization, robot, task, actions, splits, license', 'A claim depends on measured touch or contact state'],
          ],
        },
      },
      {
        heading: 'The fields every robot dataset record should expose',
        body: [
          'A dataset should be understandable before download and reproducible after it. Counts need a unit—episodes, trajectories, frames, steps, hours, tasks, or robots—and those units are not interchangeable. Access and license should be checked against the current repository or dataset card rather than inferred from the paper abstract.',
        ],
        bullets: [
          'Identity: dataset name, institution, version, release date, paper, repository, dataset URL, and maintainers',
          'Embodiment: robot, hand or gripper, kinematics, controller, action space, and hardware version',
          'Observations: cameras, depth, language, proprioception, force, touch, audio, events, calibration, and units',
          'Collection: teleoperation or policy, operator instructions, task definitions, resets, failures, interventions, and quality control',
          'Structure: episode unit, counts, timing, synchronization, file format, schema, train-test splits, and checksums',
          'Governance: access status, license, usage restrictions, privacy, safety, known gaps, and update history',
        ],
      },
      {
        heading: 'Source-backed dataset ecosystem map',
        body: [
          'The resources below illustrate different dataset strategies. The descriptions are based on their primary papers or official project materials; they are not a single leaderboard.',
        ],
        table: {
          headers: ['Resource', 'Scope', 'Primary-source signal', 'Boundary to verify'],
          rows: [
            ['Open X-Embodiment', 'Aggregated multi-embodiment robot learning data', 'Research paper describes cross-institution robot data and generalist-policy experiments', 'Individual source datasets, embodiments, action mappings, and licenses differ'],
            ['DROID', 'Large real-world robot manipulation dataset', 'Paper documents diverse manipulation collection across settings and tasks', 'Read the current project and dataset records for exact access, version, schema, and license'],
            ['LeRobot datasets', 'Open tooling and standardized dataset format for robot episodes', 'Official documentation and Dataset v3 materials describe storage and loading conventions', 'Quality and rights remain dataset-specific; format compatibility is not capability evidence'],
            ['RoboTacDex', 'Humanoid visual-tactile-action data on Unitree G1', 'The 2026 preprint reports 6,000 trajectories, 19 tasks, 23 skills, and 22 objects', 'The abstract says open sourcing is forthcoming; verify present access and license before claiming availability'],
            ['HRDexDB', 'Human and multi-robot-hand grasp data', 'The 2026 preprint reports 1,400 grasps across 100 objects with tactile, visual, and kinematic records', 'Scale, hand coverage, data quality, splits, and downstream transfer remain protocol-specific'],
          ],
        },
      },
      {
        heading: 'Teleoperation, demonstrations, corrections, and autonomous rollouts',
        body: [
          'Teleoperation can capture action demonstrations and recovery behavior, but the dataset also contains the operator interface, latency, viewpoint, embodiment constraints, and skill distribution. Autonomous rollouts can add policy-generated successes and failures, while human corrections can target states the current policy handles poorly.',
          'Hugging Face’s LeRobot v0.6 announcement describes rollout tooling and a DAgger-style human-correction workflow. That is an official software capability description, not evidence that every resulting dataset is high quality or that a trained policy will generalize to a new robot.',
        ],
      },
      {
        heading: 'Training data and benchmark data should not leak into each other',
        body: [
          'A dataset can support pretraining, fine-tuning, offline evaluation, simulation, or a shared benchmark. The split must match the claim. Random frame splits can leak nearly identical moments from one trajectory into train and test sets; repeated objects or scenes can also inflate an apparent generalization result.',
        ],
        table: {
          headers: ['Claim', 'Useful held-out unit', 'What to disclose'],
          rows: [
            ['New visual conditions', 'Scene, camera, lighting, or background', 'Which conditions changed and whether geometry or tasks repeated'],
            ['New objects', 'Object identity or category', 'Seen categories, object instances, poses, and physical properties'],
            ['New tasks', 'Task or skill composition', 'Instruction templates, subtasks, rewards, and overlap with training demonstrations'],
            ['New embodiments', 'Robot, hand, gripper, sensor, or action interface', 'Retargeting, calibration, adaptation, and embodiment identifiers'],
            ['Tactile transfer', 'Sensor, mounting, material, object, and contact regime', 'Touch preprocessing, rate, synchronization, drift, and no-touch baseline'],
          ],
        },
      },
      {
        heading: 'How RoboSkin.ai will maintain dataset records',
        body: [
          'Dataset pages should separate paper claims, repository facts, and editorial normalization. A paper may announce intended release; only the live project or repository can confirm current access. A license field should be copied from a current authoritative source, with version and retrieval date where possible.',
          'Records should retain unknown values, version changes, and source links. This prevents missing metadata from being silently converted into facts and makes the directory more useful for both search engines and AI retrieval systems.',
        ],
        bullets: [
          'One stable entity page per dataset, linked to topics, papers, sensors, robots, tasks, and benchmarks',
          'Filterable normalized fields backed by visible primary-source citations',
          'Clear labels for available, announced, restricted, archived, or unknown access',
          'Change history for schema, URLs, license, checksums, and source status',
        ],
      },
    ],
    faqs: [
      { question: 'What is a robotics dataset?', answer: 'It is a structured collection of robot observations, states, actions, task context, outcomes, or environment records used for training, evaluation, or reproducibility.' },
      { question: 'What makes a robot learning dataset useful?', answer: 'It should document the robot, observations, action space, tasks, timing, calibration, collection policy, failures, episode unit, splits, access, license, and known limitations.' },
      { question: 'Is the number of frames enough to compare robotics datasets?', answer: 'No. Frames, steps, trajectories, episodes, hours, tasks, objects, and robots measure different things. Diversity, quality, synchronization, failures, splits, and rights also determine usefulness.' },
      { question: 'Where are tactile robotics datasets on RoboSkin.ai?', answer: 'Use /datasets for the specialized tactile and visuo-tactile directory. This /robotics-datasets page covers the broader robot-learning, manipulation, teleoperation, VLA, and humanoid ecosystem.' },
      { question: 'Can an announced dataset be described as open?', answer: 'Only after a current authoritative source provides access and a license. A paper saying that data will be released is not proof that it is presently downloadable or reusable.' },
    ],
    relatedLinks: [
      { label: 'AI and robotics', href: '/ai-robotics', description: 'Connect training data to AI models, robot policies, evaluation, and real-world feedback.' },
      { label: 'Tactile robotics datasets', href: '/datasets', description: 'Browse the dedicated touch-data hub and its normalized fields.' },
      { label: 'Robot learning', href: '/robot-learning', description: 'Connect data to training methods, evaluation, and sim-to-real evidence.' },
      { label: 'Robot teleoperation', href: '/robot-teleoperation', description: 'Follow the path from operator demonstrations to policy training data.' },
      { label: 'Robot VLA models', href: '/robot-vla-models', description: 'Understand how multimodal robot data conditions action models.' },
      { label: 'Robot hands', href: '/robot-hands', description: 'Map hand embodiments, sensing, and dexterous data needs.' },
      { label: 'Tactile benchmarks', href: '/benchmarks', description: 'Separate training resources from shared evaluation protocols.' },
      { label: 'Research index', href: '/research-index', description: 'Browse source-reviewed papers, briefs, tables, and machine-readable exports.' },
    ],
    sources: [
      { label: 'Open X-Embodiment paper', href: 'https://arxiv.org/abs/2310.08864' },
      { label: 'DROID robot manipulation dataset paper', href: 'https://arxiv.org/abs/2403.12945' },
      { label: 'Hugging Face LeRobot Dataset v3', href: 'https://huggingface.co/blog/lerobot-datasets-v3' },
      { label: 'Hugging Face LeRobot v0.6', href: 'https://huggingface.co/blog/lerobot-release-v060' },
      { label: 'RoboTacDex humanoid visual-tactile-action dataset preprint', href: 'https://arxiv.org/abs/2606.31836' },
      { label: 'HRDexDB multi-hand grasp database preprint', href: 'https://arxiv.org/abs/2604.14944' },
    ],
    paperBriefIds: ['robotacdex-humanoid-visual-tactile-action-dataset-2026', 'tactidex-tactile-guided-dexterous-benchmark-2026', 'freetacman-robot-free-visuotactile-data-collection-2025', 'ht-bench-full-hand-tactile-representations-2026'],
  },
  {
    path: '/robot-world-models',
    title: 'Robot World Models: Prediction, Planning & Control',
    description:
      'Learn how robot world models predict future states for planning and control, how they differ from VLA and foundation models, and where tactile prediction fits.',
    h1: 'Robot world models: prediction for physical action',
    kicker: 'Robot learning model pillar',
    intent: 'Definition and evidence guide for robot world models, world models for robotics, world-action models, predictive robot models, learned dynamics, and tactile world models.',
    published: '2026-08-21',
    updated: '2026-08-21',
    priority: 0.94,
    changeFrequency: 'weekly',
    schemaType: 'DefinedTerm',
    visualKey: 'technology',
    keywords: ['robot world models', 'world models for robotics', 'robot world model', 'world action model', 'predictive robot model', 'learned robot dynamics', 'world model robot manipulation', 'tactile world model', 'Physical AI world model'],
    quickAnswer: [
      'A robot world model predicts how an environment, robot state, observation, reward, or contact state may change after an action. The prediction can be in pixels, tactile observations, explicit state, or a learned latent representation.',
      'A world model is not automatically a robot policy, VLA, foundation model, or planner. Those components can share a backbone or be combined, but prediction, action selection, language grounding, and reusable pretraining are different roles.',
      'The decisive evidence is not whether a rollout looks plausible. It is whether prediction supports better planning, control, data efficiency, recovery, or task outcomes under a named robot, task, horizon, baseline, and real-world protocol.',
    ],
    sections: [
      {
        heading: 'What a robot world model predicts',
        body: [
          'A world model represents a transition: given a current state or observation and a candidate action, what may happen next? Some systems predict one step; others roll forward over a horizon. Some generate camera or tactile observations, while others predict compact latent state, object pose, contact, reward, or terminal conditions.',
          'The target determines the evaluation. Pixel similarity may be useful for visual prediction but may miss contact geometry or task-critical errors. A latent model may plan effectively without reconstructing every image detail, but its internal state needs task-level validation.',
        ],
        table: {
          headers: ['Prediction space', 'Typical output', 'Useful evaluation', 'Important limitation'],
          rows: [
            ['Observation-space model', 'Future RGB, depth, tactile image, audio, or multimodal frame', 'Prediction metrics plus task use', 'Plausible images can hide physically wrong state'],
            ['State-space model', 'Pose, velocity, contact, force-related state, slip, or task variables', 'Calibrated state error and downstream control', 'Requires measured or estimated state labels'],
            ['Latent world model', 'Compact learned future representation', 'Planning value, probes, ablations, and closed-loop outcome', 'Latent quality cannot be judged from visualization alone'],
            ['Reward or value model', 'Predicted success, progress, preference, or return', 'Ranking quality and policy outcomes', 'Can exploit narrow labels or miss unmodeled hazards'],
          ],
        },
      },
      {
        heading: 'World model, VLA, foundation model, and policy',
        body: [
          'These labels describe different functions even when one system performs several of them. A VLA maps vision and language toward robot actions. A policy selects an action. A world model predicts consequences. A planner searches or selects among possibilities. A foundation-model claim concerns breadth and transfer from pretraining, not a particular prediction target.',
        ],
        table: {
          headers: ['Component', 'Primary question', 'Typical output', 'Required evidence'],
          rows: [
            ['World model', 'What may follow this action?', 'Predicted state, observation, latent, reward, or contact future', 'Forecast quality and downstream planning or control value'],
            ['Robot policy or VLA', 'What action should the robot execute?', 'Command, token, trajectory, or action chunk', 'Closed-loop task outcomes and generalization boundary'],
            ['Planner or embodied reasoner', 'Which sequence or subgoal should be attempted?', 'Action candidates, subgoals, constraints, or task status', 'Search quality, feasibility, execution, monitoring, and recovery'],
            ['Foundation model', 'What reusable knowledge transfers across settings?', 'Representation, prediction, action, or multiple interfaces', 'Breadth of data, held-out transfer, adaptation cost, and accessible artifacts'],
          ],
        },
      },
      {
        heading: 'How world models enter robot control',
        body: [
          'A controller can use a world model to score candidate actions, plan a trajectory, estimate whether a goal is reachable, synthesize training experience, provide an auxiliary learning objective, or detect a mismatch between predicted and measured state. The model may run online or only during training.',
          'Long rollouts compound errors, while short horizons may miss delayed consequences. Replanning from new measurements can reduce accumulation, but latency and model uncertainty still matter. Real robots also expose contacts, wear, delays, and disturbances that may be underrepresented in training data.',
        ],
        bullets: [
          'State the prediction horizon, observation history, action conditioning, and replanning frequency',
          'Expose whether the model is used during training, planning, online control, or only visualization',
          'Compare against a policy without the world-model pathway and against appropriate planning baselines',
          'Measure physical task value, compute and latency, failure detection, and behavior under distribution shift',
        ],
      },
      {
        heading: 'The 2026 open model ecosystem signal',
        body: [
          'Hugging Face’s official LeRobot v0.6 release describes integrations for world-model policies including VLA-JEPA, LingBot-VA, and FastWAM, together with evaluation tooling. This is evidence that open robotics infrastructure is adding world-model workflows; it is not evidence that the named models are directly comparable or solve every real-world task.',
          'Each model still needs its own primary paper, code or weights, dataset, robot, action space, benchmark, and real-robot evaluation. Ecosystem support can improve reproducibility without replacing capability evidence.',
        ],
      },
      {
        heading: 'Tactile and visuo-tactile world models',
        body: [
          'Touch becomes valuable after contact begins, when cameras may be occluded and small physical changes can decide success. A tactile world model may predict a future tactile image, contact state, slip, force-related variable, or tactile subgoal conditioned on action. A visuo-tactile model predicts or fuses both visual and tactile futures.',
          'Dream-Tac, TouchWorld, ViTacWorld, FeelWorld, and HiTac-WAM are specialized 2026 preprints with different targets, horizons, sensors, robots, control roles, and baselines. They should not be compressed into a single score. RoboSkin.ai’s dedicated visuo-tactile guide holds the source-level comparison.',
        ],
      },
      {
        heading: 'World-model evidence checklist',
        body: [
          'A useful result identifies the training data, observation and action interfaces, target representation, horizon, uncertainty, compute, robot, task, baseline, and real-world trial protocol. It also reports what happens when prediction is wrong.',
        ],
        table: {
          headers: ['Evidence question', 'What to report', 'Why it matters'],
          rows: [
            ['Does it predict?', 'Target, horizon, metric, calibration, held-out split, and qualitative failures', 'Shows what future state the model actually captures'],
            ['Does planning use it?', 'Candidate generation, objective, constraints, replanning, and compute budget', 'Separates a predictive visualization from an operational planner'],
            ['Does it improve the robot?', 'Matched baseline, tasks, trials, success, speed, force, recovery, and interventions', 'Connects prediction to physical utility'],
            ['Does it transfer?', 'New objects, scenes, tasks, robots, sensors, and adaptation method', 'Defines rather than implies generalization'],
            ['Is it reproducible?', 'Paper, code, weights, data, configuration, seeds, logs, and hardware', 'Allows independent inspection of the result'],
          ],
        },
      },
    ],
    faqs: [
      { question: 'What is a robot world model?', answer: 'It is a model that predicts how robot state, environment state, observations, rewards, or contact may change after an action.' },
      { question: 'Is a robot world model the same as a VLA?', answer: 'No. A VLA maps visual and language context toward actions. A world model predicts consequences. One system can include both roles, but the labels are not interchangeable.' },
      { question: 'How are robot world models evaluated?', answer: 'Evaluate the prediction target and horizon, then test whether the model improves planning, control, data efficiency, recovery, or task outcomes under matched physical conditions.' },
      { question: 'What is a tactile world model?', answer: 'It predicts future tactile observations or contact-related state conditioned on action, sometimes together with visual state, so planning or control can reason about physical contact.' },
      { question: 'Does a plausible generated video prove a useful world model?', answer: 'No. Visual plausibility can hide physically wrong geometry, contact, timing, or action consequences. Downstream planning and repeated real-robot evidence are required for stronger claims.' },
    ],
    relatedLinks: [
      { label: 'AI and robotics', href: '/ai-robotics', description: 'Place consequence prediction inside the complete perception, policy, control, and feedback loop.' },
      { label: 'Visuo-tactile world models', href: '/guides/visuo-tactile-world-models-robot-manipulation', description: 'Compare contact-aware predictive models at the primary-source level.' },
      { label: 'Robot VLA models', href: '/robot-vla-models', description: 'Separate consequence prediction from instruction-conditioned action.' },
      { label: 'Robot learning', href: '/robot-learning', description: 'Place world models inside the broader data and training loop.' },
      { label: 'Robot manipulation', href: '/robot-manipulation', description: 'Connect predictions to grasping, insertion, dexterity, and recovery.' },
      { label: 'Tactile foundation models', href: '/tactile-foundation-models', description: 'Separate reusable pretraining claims from predictive model roles.' },
      { label: 'Tactile AI', href: '/tactile-ai', description: 'Map sensing, representation, prediction, policy, and control.' },
      { label: 'Robotics datasets', href: '/robotics-datasets', description: 'Review the data contracts behind predictive robot models.' },
    ],
    sources: [
      { label: 'Hugging Face LeRobot v0.6', href: 'https://huggingface.co/blog/lerobot-release-v060' },
      { label: 'Dream-Tac tactile world-action model preprint', href: 'https://arxiv.org/abs/2606.08737' },
      { label: 'TouchWorld tactile world model preprint', href: 'https://arxiv.org/abs/2607.07287' },
      { label: 'ViTacWorld visuo-tactile world model preprint', href: 'https://arxiv.org/abs/2607.22530' },
      { label: 'FeelWorld hierarchical contact prediction preprint', href: 'https://arxiv.org/abs/2607.24267' },
      { label: 'HiTac-WAM hierarchical tactile world-action model preprint', href: 'https://arxiv.org/abs/2608.19574' },
    ],
    paperBriefIds: ['hitac-wam-hierarchical-tactile-world-action-model-2026', 'dream-tac-tactile-world-action-model-2026', 'feelworld-visuo-tactile-world-model-2026'],
  },
  {
    path: '/robot-teleoperation',
    title: 'Robot Teleoperation: Demonstrations, Data & Learning',
    description:
      'Learn how robot teleoperation captures demonstrations for robot learning and VLA training, including interfaces, synchronization, quality control, limits, and evaluation.',
    h1: 'Robot teleoperation: from human demonstration to robot data',
    kicker: 'Robot data collection pillar',
    intent: 'Technical guide for robot teleoperation, humanoid teleoperation, robot demonstration data, imitation learning data collection, teleoperation interfaces, and VLA training data.',
    published: '2026-08-21',
    updated: '2026-08-21',
    priority: 0.92,
    changeFrequency: 'weekly',
    schemaType: 'TechArticle',
    visualKey: 'applications',
    keywords: ['robot teleoperation', 'humanoid robot teleoperation', 'robot demonstration data', 'teleoperation robotics', 'imitation learning data collection', 'VLA training data', 'robot data collection', 'robot retargeting', 'robot learning demonstrations'],
    quickAnswer: [
      'Robot teleoperation is remote or mediated human control of a robot through interfaces such as joysticks, teach pendants, motion capture, wearable devices, cameras, handheld end effectors, or bilateral systems. Teleoperated behavior is not autonomous behavior.',
      'For robot learning, teleoperation can generate aligned observations and actions, but useful data also requires calibration, timing, task definitions, resets, failures, operator context, quality control, schema, access, and license.',
      'Demonstrations do not become a capable policy automatically. Training must account for action representation, embodiment, coverage, compounding errors, evaluation splits, interventions, and repeated real-robot testing.',
    ],
    sections: [
      {
        heading: 'What robot teleoperation controls',
        body: [
          'Teleoperation can command a mobile base, arm pose, joint motion, gripper, dexterous hand, whole humanoid body, or a high-level subtask. The operator may watch direct video, stereo or depth views, a digital twin, or the physical robot. Some systems provide haptic or force feedback; others are one-way.',
          'The interface changes the data. A low-dimensional joystick, handheld gripper, motion-capture rig, exoskeleton, and bilateral master device encode different human intent and produce different action distributions. Dataset records should preserve that acquisition contract.',
        ],
        table: {
          headers: ['Interface family', 'Typical command', 'Strength', 'Data limitation to record'],
          rows: [
            ['Joystick or gamepad', 'Base, end-effector, gripper, or mode commands', 'Portable and familiar', 'Low-dimensional mapping and operator-specific mode switches'],
            ['Teach pendant or kinesthetic teaching', 'Waypoints, joint motion, or physically guided pose', 'Direct connection to industrial workflows or robot geometry', 'May be slow, robot-specific, or unsuitable for free whole-body motion'],
            ['Motion capture or wearable interface', 'Human pose, hand pose, or joint targets retargeted to the robot', 'Can capture natural coordinated motion', 'Human-robot morphology, occlusion, calibration, and retargeting errors'],
            ['Bilateral or haptic master', 'Position or force-related commands with feedback', 'Can expose contact to the operator', 'Cost, stability, latency, scaling, and master-slave mismatch'],
            ['Handheld data-collection device', 'End-effector pose and gripper state without the full robot', 'Can lower collection friction and move data capture away from a robot cell', 'Requires reliable calibration and later embodiment mapping'],
          ],
        },
      },
      {
        heading: 'The demonstration-to-policy pipeline',
        body: [
          'A teleoperation recording is a source trajectory, not a finished learning asset. The complete pipeline aligns sensors and commands, segments tasks, records outcomes and failure context, validates the episode, converts it to a stable schema, splits it without leakage, trains a model, and tests the model in closed loop.',
        ],
        bullets: [
          'Specify task, object, environment, operator instruction, success criteria, and reset policy',
          'Calibrate and synchronize cameras, depth, proprioception, hand state, force or touch, commands, and timestamps',
          'Record latency, packet loss, control modes, interventions, discarded episodes, failures, and operator identity or experience when relevant',
          'Normalize episodes and action spaces while preserving raw data, units, coordinate frames, and provenance',
          'Train and evaluate with splits that isolate the claimed objects, scenes, tasks, operators, or embodiments',
        ],
      },
      {
        heading: 'Teleoperation data is not autonomous capability',
        body: [
          'A teleoperated demonstration proves that a person and interface could make the robot perform the task under those conditions. It does not prove that a learned policy can perceive the same state, recover from error, or act safely without the operator.',
          'A policy trained by imitation can encounter states absent from expert demonstrations because small prediction errors compound during execution. Corrective demonstrations, interactive data collection, recovery examples, and policy rollouts can target this gap, but they still require an explicit intervention policy and fair evaluation.',
        ],
      },
      {
        heading: 'Current open data-collection signals',
        body: [
          'The official Hugging Face Grabette article describes a handheld gripper-and-camera device that records data in the standard LeRobot dataset format. It is an example of collecting manipulation demonstrations without keeping a full robot in the loop during every recording. The transfer value still depends on calibration, task coverage, observation and action mapping, and later robot evaluation.',
          'The LeRobot v0.6 release describes rollout tools and DAgger-style human corrections. FreeTacMan investigates wearable, robot-free visuo-tactile data collection. DROID and Open X-Embodiment represent broader real-robot and multi-embodiment data strategies. These resources solve different parts of the pipeline and should not be treated as identical teleoperation systems.',
        ],
      },
      {
        heading: 'Touch and force feedback in teleoperation',
        body: [
          'Touch can be recorded as robot-side training data, returned to the operator as haptic feedback, or both. Robot-side tactile data can label contact onset, slip, pressure distribution, or grasp state. Haptic feedback can help a person adjust motion, but the master device, scaling, delay, and feedback modality shape what the operator feels.',
          'For imitation learning, synchronize tactile observations with the action that preceded the contact and the corrective action that followed it. A contact stream without robot state, timestamps, or action context is much harder to use for closed-loop policy learning.',
        ],
      },
      {
        heading: 'Quality and evaluation checklist',
        body: [
          'Data quality is a measured property, not a consequence of collection volume. Before training, inspect timing, calibration, missing streams, task labels, duplicated episodes, operator shortcuts, failures, and inconsistent resets. Before a capability claim, test the learned policy on the physical robot under a protocol that distinguishes autonomous success from human correction.',
        ],
        table: {
          headers: ['Stage', 'What to verify', 'Failure if omitted'],
          rows: [
            ['Capture', 'Calibration, clocks, latency, commands, observations, raw units, and failure flags', 'The trajectory can look complete while actions and observations are misaligned'],
            ['Curation', 'Episode boundaries, outcomes, duplicates, exclusions, class balance, and operator distribution', 'The model learns shortcuts or the dataset overstates coverage'],
            ['Training', 'Action representation, normalization, history, embodiment mapping, and intervention handling', 'The learned interface differs from the deployed robot'],
            ['Evaluation', 'Autonomy, objects, scenes, trials, resets, interventions, recovery, force, damage, and time', 'A staged or corrected run is reported as autonomous capability'],
            ['Release', 'Schema, version, documentation, access, license, checksums, and known limitations', 'Other teams cannot audit or legally reuse the data'],
          ],
        },
      },
    ],
    faqs: [
      { question: 'What is robot teleoperation?', answer: 'Robot teleoperation is remote or mediated human control of a robot through an interface such as a joystick, teach pendant, motion-capture system, wearable device, handheld end effector, or bilateral master.' },
      { question: 'Is a teleoperated robot autonomous?', answer: 'No. Teleoperation shows human-controlled behavior. Autonomous capability requires the robot policy to perceive and act without the operator under a defined evaluation protocol.' },
      { question: 'How does teleoperation create robot-learning data?', answer: 'It records synchronized observations, robot state, human commands, actions, task context, and outcomes. Those episodes are calibrated, quality-checked, normalized, split, and used to train and evaluate a policy.' },
      { question: 'What limits learning from teleoperation?', answer: 'Limits include interface bias, latency, morphology mismatch, narrow task coverage, inconsistent operators, missing failures, action retargeting, compounding policy errors, and evaluation leakage.' },
      { question: 'Why record tactile data during teleoperation?', answer: 'Touch can expose contact onset, pressure, shear, slip, seating, and corrective behavior that cameras may miss, but it must be synchronized with robot state and actions to support learning.' },
    ],
    relatedLinks: [
      { label: 'AI and robotics', href: '/ai-robotics', description: 'Connect human demonstrations to robot data, policy learning, deployment, and feedback.' },
      { label: 'Robotics datasets', href: '/robotics-datasets', description: 'Review broad robot-data fields, splits, access, and license.' },
      { label: 'Robot learning', href: '/robot-learning', description: 'Connect demonstrations to imitation, correction, evaluation, and transfer.' },
      { label: 'Robot VLA models', href: '/robot-vla-models', description: 'Understand how images, language, state, and actions enter generalist policies.' },
      { label: 'Robot manipulation', href: '/robot-manipulation', description: 'Place demonstrations inside grasping, insertion, dexterity, and tool-use tasks.' },
      { label: 'Robot hands', href: '/robot-hands', description: 'Map end-effector interfaces, sensing, and dexterous action spaces.' },
      { label: 'Tactile datasets', href: '/datasets', description: 'Find touch-specific data resources and sensor metadata.' },
      { label: 'FreeTacMan research brief', href: '/research/freetacman-robot-free-visuotactile-data-collection-2025', description: 'Review wearable robot-free visuo-tactile collection evidence.' },
    ],
    sources: [
      { label: 'Hugging Face Grabette data-collection article', href: 'https://huggingface.co/blog/grabette' },
      { label: 'Hugging Face LeRobot v0.6', href: 'https://huggingface.co/blog/lerobot-release-v060' },
      { label: 'FreeTacMan project', href: 'https://opendrivelab.com/FreeTacMan' },
      { label: 'DROID robot manipulation dataset paper', href: 'https://arxiv.org/abs/2403.12945' },
      { label: 'Open X-Embodiment paper', href: 'https://arxiv.org/abs/2310.08864' },
      { label: 'Hugging Face LeRobot Dataset v3', href: 'https://huggingface.co/blog/lerobot-datasets-v3' },
    ],
    paperBriefIds: ['robotacdex-humanoid-visual-tactile-action-dataset-2026', 'freetacman-robot-free-visuotactile-data-collection-2025', 'humanoid-visual-tactile-action-dataset-2025'],
  },
];

export function getSeoTopicPage(path: string) {
  return seoTopicPages.find((page) => page.path === path);
}
