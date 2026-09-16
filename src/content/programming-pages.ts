import type { SeoTopicPage } from '@/content/seo-topic-pages';

export type ProgrammingSection = Omit<SeoTopicPage['sections'][number], 'links'> & {
  id: string;
  code?: { label: string; language: string; value: string }[];
  links?: { label: string; href: string; download?: boolean }[];
  image?: { src: string; alt: string; caption: string; width: number; height: number };
};
export type ProgrammingPage = Omit<SeoTopicPage, 'sections'> & {
  sections: ProgrammingSection[];
  verification: string;
};

export const starterKitCommit = '7bf81d2575e3ef4b62034f4771daf948033b4d76';
const kit = 'https://github.com/roboskin-ai/ros2-tactile-starter-kit';
const download = '/tutorials/python-tactile';
const overview = { label: 'Robotics programming learning path', href: '/robotics-programming', description: 'Connect first programs, middleware and sensor feedback.' };
const pythonPractice = { label: 'Process synthetic tactile data with Python', href: '/guides/python-tactile-data-processing', description: 'Run a CSV quality check, generate plots and export teaching contact events.' };
const rosPractice = { label: 'Publish and replay tactile messages in ROS 2', href: '/guides/ros2-tactile-sensing', description: 'Source-checked starter-kit walkthrough; local ROS runtime validation is pending.' };

export const roboticsProgramming: ProgrammingPage = {
  path: '/robotics-programming',
  title: 'Robotics Programming: Python, ROS 2 & Projects',
  h1: 'Robotics Programming: From First Code to Sensor Feedback',
  description: 'Start robotics programming with Python, ROS 2 and sensor feedback. Follow a hardware-free tactile data exercise, then explore messages, replay and robot learning.',
  kicker: 'Programming & tutorials',
  intent: 'A single beginner overview for robotics programming, robot programming and programming robots.',
  updated: '2026-09-16', priority: 0.8, changeFrequency: 'monthly', schemaType: 'TechArticle', visualKey: 'resources',
  keywords: ['robotics programming', 'robot programming', 'programming robots', 'Python robotics', 'ROS 2'],
  verification: 'The Python project below has been run in a clean environment. The ROS 2 walkthrough identifies its source checks, upstream build evidence and unexecuted runtime steps separately.',
  quickAnswer: ['Robotics programming connects observations to decisions, control and fresh feedback. You can learn its data and communication foundations on a laptop before working with a robot.'],
  sections: [
    {
      id: 'what-is-robotics-programming', heading: 'What is robotics programming?',
      body: ['Robotics programming is the work of turning a task into software that senses the world, estimates the current state, chooses what to do, and checks the result. A fixed sequence can be useful, but a physical robot also has to deal with uncertain measurements and changing conditions.', 'Think of a gripper picking up a cup. Perception locates the cup; state processing combines observations with the arm position; planning chooses an approach; control tracks a target; feedback reveals whether contact happened. A failed observation, stale timestamp or unexpected force can change the next decision. This tutorial path starts with that observation and feedback layer.'],
      table: { headers: ['Stage', 'Programming task', 'First exercise'], rows: [
        ['Perception', 'Read and interpret sensors.', 'Load values, units and validity flags from a CSV.'],
        ['State processing', 'Associate measurements with time and geometry.', 'Validate timestamps and reconstruct the taxel grid.'],
        ['Planning', 'Choose a path or task sequence under constraints.', 'Study a planner in a documented simulator after learning the data interface.'],
        ['Control', 'Track targets using repeated feedback.', 'Learn the difference between a target, an actuator command and an observation.'],
        ['Feedback', 'Compare what happened with what was expected.', 'Inspect threshold events and replay the observations that caused them.'],
      ] },
    },
    {
      id: 'python-and-cpp', heading: 'Python or C++: choose by the work',
      body: ['Python is a practical starting point for data inspection, plots, tests, research tooling and many ROS 2 nodes. Basic functions, lists, files, exceptions and virtual environments are enough for the Python exercise here.', 'C++ is common in hardware interfaces, performance-sensitive processing and controllers. It offers more explicit control over memory and execution costs, at the price of a more demanding build and debugging workflow. A Python program may also call compiled numerical libraries.', 'A language choice is not a real-time guarantee. Scheduling, middleware, allocations, operating-system configuration and worst-case execution time all affect deadlines. Measure the complete system against its requirements before making a timing claim.'],
    },
    {
      id: 'tools', heading: 'Know which layer each tool belongs to',
      body: ['A useful robot programming stack contains several kinds of tools. They complement each other; installing a middleware package does not provide a robot model, motion planner or trained policy.'],
      table: { headers: ['Category', 'Examples', 'Responsibility'], rows: [
        ['Languages', 'Python, C++', 'Express algorithms, application logic and interfaces.'],
        ['Middleware', 'ROS 2', 'Connect nodes with typed messages, discovery, services and actions; provide inspection tools.'],
        ['Simulation', 'Gazebo', 'Model environments and robot dynamics with stated approximations; simulated results still need physical validation.'],
        ['Motion planning', 'MoveIt 2', 'Plan movements with robot geometry, kinematics and collision constraints.'],
        ['Learning tools', 'PyTorch and task-specific robot-learning libraries', 'Train and evaluate representations or policies against documented data and action spaces.'],
        ['Recording and inspection', 'rosbag2, CSV tools, Matplotlib', 'Preserve observations, examine failures and compare reproducible runs.'],
      ] },
      links: [
        { label: 'Official ROS 2 documentation', href: 'https://docs.ros.org/en/lyrical/' },
        { label: 'Gazebo tutorials: first simulation', href: 'https://gazebosim.org/docs/latest/tutorials/' },
        { label: 'MoveIt 2 getting started', href: 'https://moveit.picknik.ai/main/doc/tutorials/getting_started/getting_started.html' },
        { label: 'PyTorch beginner tutorials', href: 'https://docs.pytorch.org/tutorials/beginner/basics/intro.html' },
      ],
    },
    {
      id: 'without-hardware', heading: 'A learning route without a robot',
      body: ['Begin with files: read a small dataset, validate its shape and draw an output you can inspect. Next, learn the same concepts in a stream: publish synthetic messages, monitor them and record them. Then stop the publisher and replay the recording so the inputs can be examined again.', 'Synthetic messages test software plumbing. They do not simulate a physical sensor or prove a robot can perform a task. When you need geometry and dynamics, follow an official simulator tutorial with its own supported ROS and simulator versions.'],
      bullets: ['First: finish the Python exercise and explain every unknown value in its output.', 'Next: use the ROS 2 walkthrough on its declared Linux/ROS combination and record your own runtime evidence.', 'Then: connect observations to robot-learning concepts, dataset access conditions and evaluation splits before training a model.'],
    },
    {
      id: 'projects', heading: 'Work with Robot Data',
      body: ['Start with the Python CSV project: inspect missing values, generate plots and explain the resulting contact events. Then run the LeRobot numeric checker to understand how episodes, timestamps and state/action dimensions fit together. Both exercises include synthetic data, actual outputs and behavior tests; neither needs a robot, tactile sensor, ROS installation or GPU.', 'When preparing your own data, use the collection guide to plan demonstrations, synchronization and failure labels. Compare original dataset fields and access terms before adapting a recording for a particular learning policy.'],
      links: [pythonPractice,
        { label: 'Inspect LeRobot episodes, timestamps and numeric data', href: '/guides/lerobot-dataset-format' },
        { label: 'Plan demonstrations and compare UMI with GELLO', href: '/robot-teleoperation' },
        { label: 'Find robot and tactile datasets with documented access', href: '/datasets' },
      ],
    },
    {
      id: 'tactile-feedback', heading: 'Add Tactile Feedback',
      body: ['Begin with a quantity you can interpret: an image baseline, reconstructed depth and estimated force require different references. The DIGIT and GelSight Mini calibration guide explains those boundaries and provides a blank recording template; it is source-based guidance, not a hardware experiment.', 'Use the Python exercise to preserve missing values and inspect synthetic contact events. Then follow the ROS 2 message workflow to understand transport and replay before integrating a sensor. The ROS runtime steps remain explicitly unverified locally.'],
      links: [
        { label: 'Plan DIGIT and GelSight Mini calibration', href: '/guides/tactile-sensor-calibration' },
        pythonPractice, rosPractice,
        { label: 'Connect tactile observations to manipulation tasks', href: '/tactile-manipulation' },
      ],
    },
    {
      id: 'touch-and-learning', heading: 'From a signal to tactile AI and robot learning',
      body: ['Once a sensor stream has stable units, timestamps, geometry and validity semantics, it can support features such as contact location or changes in a tactile pattern. Those features may become observations for manipulation, supervision for representation learning, or evaluation signals.', 'The threshold exercise here is a transparent teaching rule, not a trained tactile model or calibrated contact detector. Real tactile AI needs sensor-specific calibration, synchronized robot observations, suitable labels, held-out data and a stated task. A dataset directory helps find candidates, but each original dataset defines its own fields and license.'],
      links: [
        { label: 'How robot learning uses observations and actions', href: '/robot-learning' },
        { label: 'Explore tactile AI methods and evidence', href: '/tactile-ai' },
        { label: 'Compare tactile datasets and access conditions', href: '/datasets' },
      ],
    },
  ],
  faqs: [
    { question: 'What should I learn first?', answer: 'Start with Python functions, sequences, file handling, exceptions and basic tests. Then practice timestamps, coordinate systems and missing-data handling before adding ROS 2 nodes.' },
    { question: 'What environment do I need?', answer: 'The Python exercise was verified with CPython 3.13.3 and Matplotlib 3.10.6 on Windows x64. The ROS walkthrough targets Ubuntu 26.04 with ROS 2 Lyrical; it is a separate setup with a different verification scope.' },
    { question: 'Can I start programming robots without a robot?', answer: 'Yes. Data processing, synthetic messages, recording and replay teach useful interfaces without hardware. They do not establish hardware compatibility or physical task performance.' },
    { question: 'Do I need machine learning for every robot program?', answer: 'No. File processing, state machines, planning and feedback can use explicit rules. Add learning when you have a suitable task, data and evaluation protocol.' },
  ],
  relatedLinks: [pythonPractice, rosPractice, { label: 'Robot learning', href: '/robot-learning', description: 'Understand demonstrations, policies and evaluation.' }],
  sources: [{ label: 'ROS 2 Lyrical documentation', href: 'https://docs.ros.org/en/lyrical/' }, { label: 'Python tutorial', href: 'https://docs.python.org/3/tutorial/' }],
};

export const ros2Tutorial: ProgrammingPage = {
  path: '/guides/ros2-tactile-sensing', title: 'ROS 2 Tactile Sensing: Publish, Inspect, Record & Replay',
  h1: 'ROS 2 tactile sensing: from synthetic messages to replay',
  description: 'Build the RoboSkin ROS 2 starter kit, inspect normalized tactile arrays and use rosbag2 to record and replay. Includes verified source references and explicit runtime limits.',
  kicker: 'ROS 2 tutorial', intent: 'An executable, version-scoped tactile message and recording walkthrough.',
  updated: '2026-09-16', priority: 0.76, changeFrequency: 'monthly', schemaType: 'TechArticle', visualKey: 'resources',
  keywords: ['ROS 2 tactile sensing', 'robot skin ROS 2', 'tactile data pipeline', 'rosbag tactile data'],
  verification: 'Source checked at 7bf81d2 on 2026-09-16. Four contract tests and Python compilation passed locally. Upstream Lyrical CI built the packages and inspected the interface. Launch, live messages, recording and replay were not executed in this Windows environment, which has no ROS 2 installation or Linux runtime.',
  quickAnswer: ['Publish a deterministic synthetic array, inspect its contract, record one topic and replay it with the publisher stopped. No robot, hardware driver or actuator command is involved.'],
  sections: [
    {
      id: 'environment', heading: '1. Use one ROS and operating-system combination',
      body: ['This walkthrough targets Ubuntu 26.04 (Resolute), Bash and ROS 2 Lyrical. The starter-kit CI uses osrf/ros:lyrical-desktop; the upstream image is based on Ubuntu Resolute. Do not mix these commands with a Humble, Jazzy or Kilted workspace.', 'Follow the official Lyrical Ubuntu installation guide to configure UTF-8, the Ubuntu repositories and the ROS apt source, then install the desktop packages and development tools below. This requires administrator access on that Linux environment. Run rosdep init only on a fresh installation; skip it if rosdep is already initialized.', 'These installation and runtime commands are source-checked instructions, not a local ROS execution transcript. The upstream CI result covers building and interface inspection only.'],
      code: [{ label: 'Ubuntu 26.04 / Bash — after configuring the official ROS apt repository', language: 'bash', value: 'sudo apt update\nsudo apt install ros-lyrical-desktop ros-dev-tools git\nsource /opt/ros/lyrical/setup.bash\nsudo rosdep init  # once per fresh rosdep installation\nrosdep update\nprintenv ROS_DISTRO' }],
      links: [
        { label: 'Official Lyrical Ubuntu installation instructions', href: 'https://docs.ros.org/en/lyrical/Get-Started/Installation/Ubuntu-Install-Debs.html' },
        { label: 'Official installation source (if the documentation site is unavailable)', href: 'https://github.com/ros2/ros2_documentation/blob/lyrical/source/Get-Started/Installation/Ubuntu-Install-Debs.rst' },
        { label: 'Inspect the successful starter-kit CI run', href: `${kit}/actions/runs/32648006098` },
      ],
    },
    {
      id: 'build', heading: '2. Get the inspected code and build the workspace',
      body: ['Use a new workspace. Pin the inspected commit so the interface and commands below remain reviewable. rosdep reads the actual package manifests; colcon builds the message package and the Python demo. Source the resulting overlay in every terminal that uses these packages.'],
      code: [{ label: 'Clone, pin, resolve dependencies and build', language: 'bash', value: `mkdir -p ~/roboskin_ws/src\ncd ~/roboskin_ws/src\ngit clone ${kit}.git\ncd ros2-tactile-starter-kit\ngit checkout ${starterKitCommit}\ncd ~/roboskin_ws\nsource /opt/ros/lyrical/setup.bash\nrosdep install --from-paths src --ignore-src -r -y\ncolcon build --symlink-install\nsource install/setup.bash\nros2 interface show roboskin_tactile_msgs/msg/TactileArray` }],
      links: [{ label: 'Read the pinned package manifests and code', href: `${kit}/tree/${starterKitCommit}/src` }],
    },
    {
      id: 'publish', heading: '3. Publish a synthetic tactile field',
      body: ['The launch file starts synthetic_publisher and contract_monitor from roboskin_tactile_demo. Its exposed launch arguments are rows, columns and publish_rate_hz. The default is a 4 × 4 grid with a requested timer rate of 10 Hz.', 'The values come from sine and cosine functions in the source. They are deterministic normalized signals for integration exercises, not sensor measurements or physics simulation. A requested timer rate is not a measured sampling-rate guarantee.'],
      code: [
        { label: 'Terminal A — leave the publisher and monitor running', language: 'bash', value: 'cd ~/roboskin_ws\nsource /opt/ros/lyrical/setup.bash\nsource install/setup.bash\nros2 launch roboskin_tactile_demo demo.launch.py rows:=4 columns:=4 publish_rate_hz:=10.0' },
        { label: 'Terminal B — inspect one message with compatible QoS', language: 'bash', value: 'cd ~/roboskin_ws\nsource /opt/ros/lyrical/setup.bash\nsource install/setup.bash\nros2 topic info /tactile/array --verbose\nros2 topic echo /tactile/array --once --qos-reliability best_effort --qos-durability volatile' },
      ],
    },
    {
      id: 'contract', heading: '4. Read shape, units, validity and time correctly',
      body: ['The type is roboskin_tactile_msgs/msg/TactileArray, an experimental reference implementation rather than an official ROS standard. It is not a completed hardware driver or evidence of compatibility with a commercial sensor.', 'The monitor checks dimensions, array lengths and validity bytes, then reports pressure-channel statistics every tenth accepted frame. It does not check all semantic errors: channel units, nonfinite numbers, clock synchronization, calibration and geometry still need separate inspection. The channel name pressure does not make its normalized values physical pressure.'],
      table: { headers: ['Field or concept', 'Meaning in this demo'], rows: [
        ['rows / columns', '4 / 4 by default; 16 logical taxels.'],
        ['channels / units', 'pressure, shear_x, shear_y; all three units are normalized. No newtons or pascals.'],
        ['values / valid', '48 channel-major values and 16 validity bytes by default. 1 = usable; 0 = masked/invalid.'],
        ['Flattening', '((channel * rows) + row) * columns + column. Read channel order from each message.'],
        ['header.frame_id / sensor_id', 'demo_tactile_surface / demo_surface. A name alone does not provide TF geometry.'],
        ['Sampling time', 'For real acquisition, the measurement time. Here header.stamp is the ROS clock read after synthetic values are computed; there is no physical sample.'],
        ['Receive time', 'A subscriber-side timestamp on arrival. The included monitor does not record it. A bag timestamp must be interpreted with its recording and middleware semantics.'],
        ['End-to-end latency', 'Requires a defined start and end, compatible clocks and measured timestamps. Neither the publisher rate nor this monitor measures sensor-to-action latency.'],
      ] },
      links: [{ label: 'Read the exact experimental message contract', href: `${kit}/blob/${starterKitCommit}/docs/message-contract.md` }],
    },
    {
      id: 'record', heading: '5. Record the topic with rosbag2',
      body: ['Keep Terminal A running. In Terminal B, record the topic using the repository’s best-effort, volatile QoS override. This path follows the actual cloned directory name, ros2-tactile-starter-kit.', 'Let messages arrive, then press Ctrl+C in Terminal B so rosbag2 closes the recording. Inspect the bag information and verify the topic, type and a nonzero message count. Counts and storage metadata depend on your run; no example count is asserted here. Choose a new output directory if tactile_demo already exists.'],
      code: [{ label: 'Terminal B — record, stop with Ctrl+C, then inspect', language: 'bash', value: 'cd ~/roboskin_ws\nros2 bag record --topics /tactile/array \\\n  --qos-profile-overrides-path src/ros2-tactile-starter-kit/src/roboskin_tactile_demo/config/rosbag2_qos_overrides.yaml \\\n  -o tactile_demo\n# Press Ctrl+C before running the next command.\nros2 bag info tactile_demo' }],
      links: [{ label: 'Official Lyrical recording and playback tutorial', href: 'https://docs.ros.org/en/lyrical/ROS-Framework/interfaces/Working-with-interfaces/Recording-And-Playing-Back-Data/Recording-And-Playing-Back-Data.html' }],
    },
    {
      id: 'replay', heading: '6. Stop live publishing, then replay',
      body: ['Press Ctrl+C in Terminal A to stop both launched nodes. Start only the monitor there. Play the recording in Terminal B after the monitor has started. This prevents live and recorded messages from mixing on the same topic.', 'The replay preserves the recorded header stamps while publication happens later. A wall-clock subtraction against an old stamp measures age plus other effects, not the original live transport latency. This monitor does not use simulation time or compute latency, so the exercise does not require --clock.'],
      code: [
        { label: 'Terminal A — monitor only, after stopping the launch', language: 'bash', value: 'cd ~/roboskin_ws\nsource /opt/ros/lyrical/setup.bash\nsource install/setup.bash\nros2 run roboskin_tactile_demo contract_monitor' },
        { label: 'Terminal B — replay', language: 'bash', value: 'cd ~/roboskin_ws\nros2 bag play tactile_demo \\\n  --qos-profile-overrides-path src/ros2-tactile-starter-kit/src/roboskin_tactile_demo/config/rosbag2_qos_overrides.yaml' },
      ],
    },
    {
      id: 'evidence', heading: '7. What was actually verified',
      body: ['On 2026-09-16, we cloned commit 7bf81d2, read the message, package entry points, launch file, publisher, monitor and QoS configuration, and ran the four dependency-free contract tests with CPython 3.13.3 on Windows. Python compilation also passed. The output below is from that local contract-test run; it is not ROS terminal output.', 'GitHub Actions run 32648006098 reports successful dependency installation, colcon build and generated-interface inspection in osrf/ros:lyrical-desktop for this exact commit. We inspected the workflow and run/job results. That workflow does not launch the demo or record and replay a bag.', 'This local environment has no ROS 2 installation, Docker runtime or installed WSL distribution. The launch, inspection, recording and playback commands above remain unexecuted here. There is no claimed live message output, timing measurement, hardware test or calibration result.'],
      code: [{ label: 'Actual local dependency-free test output (duration omitted)', language: 'text', value: 'test_demo_is_explicitly_synthetic_and_normalized ... ok\ntest_message_fields_and_layout_rule_are_published ... ok\ntest_qos_matches_ros_sensor_data_profile_shape ... ok\ntest_sample_frame_is_a_complete_two_by_two_grid ... ok\nRan 4 tests\nOK' }],
      links: [{ label: 'Run the same source contract tests', href: `${kit}/blob/${starterKitCommit}/tests/test_contract.py` }, pythonPractice],
    },
    {
      id: 'troubleshooting', heading: 'Troubleshooting by symptom',
      body: ['Work through these checks before changing the interface or treating an empty stream as a sensor fault.'],
      table: { headers: ['Symptom', 'Check and next step'], rows: [
        ['ros2 or a package cannot be found', 'Source /opt/ros/lyrical/setup.bash and ~/roboskin_ws/install/setup.bash in that terminal. Check the first colcon error if the overlay was not built.'],
        ['rosdep reports an existing default sources file', 'Skip rosdep init on that installation; run rosdep update. Do not repeatedly initialize it.'],
        ['Echo or recording receives no data', 'Check that Terminal A is alive, both terminals use the same ROS_DOMAIN_ID and middleware environment, and the subscriber uses best-effort / volatile QoS. Inspect ros2 topic info --verbose.'],
        ['QoS file does not exist', 'Run from ~/roboskin_ws and use src/ros2-tactile-starter-kit/…; a differently named clone needs a correspondingly different path.'],
        ['Bag output directory already exists', 'Choose a new -o directory. Preserve recordings you still need.'],
        ['Monitor prints nothing during a short replay', 'It reports every tenth accepted frame. Inspect the bag count and use topic echo to inspect a shorter stream. Start the monitor before playback.'],
        ['Unexpected shape, units or invalid values', 'Compare lengths with rows × columns × channels; inspect units and validity. Do not turn invalid taxels into zero or interpret normalized data as force.'],
        ['Replay appears to contain extra frames', 'Stop the live publisher before playback and check for other publishers on the same topic.'],
      ] },
    },
  ],
  faqs: [
    { question: 'Is this a hardware driver or standard message?', answer: 'No. It is an Apache-2.0 experimental message and synthetic publisher. Hardware acquisition, calibration, compatibility and actuator control have not been implemented or verified by this tutorial.' },
    { question: 'Can I use the CSV from the repository as a captured run?', answer: 'No. sample_data/tactile_frame.csv is a separate 2 × 2, four-row synthetic fixture, not a recording of the default 4 × 4 publisher.' },
    { question: 'How do I inspect data before learning ROS 2?', answer: 'Use the Python tactile data exercise. It has independent synthetic time-series data, explicit validity checks and actual generated results, without a ROS dependency.' },
  ],
  relatedLinks: [overview, pythonPractice, { label: 'Dataset reproduction evidence', href: '/datasets', description: 'Check access, licenses and splits before choosing training data.' }, { label: 'RoboSkin ROS 2 starter kit', href: kit, description: 'Open the Apache-2.0 code and its source history.' }],
  sources: [{ label: 'Pinned starter-kit source', href: `${kit}/tree/${starterKitCommit}` }, { label: 'Upstream build and interface check', href: `${kit}/actions/runs/32648006098` }],
};

export const pythonTactileTutorial: ProgrammingPage = {
  path: '/guides/python-tactile-data-processing',
  title: 'Process Tactile Sensor Data with Python: CSV, Heatmaps and Contact Events',
  h1: 'Process Tactile Sensor Data with Python: CSV, Heatmaps and Contact Events',
  description: 'Run a hardware-free Python exercise with synthetic tactile CSV data. Validate missing values and timestamps, plot a heatmap, detect teaching contact events and export results.',
  kicker: 'Python tutorial', intent: 'A complete beginner tactile data processing project with reproducible outputs.',
  updated: '2026-09-16', priority: 0.78, changeFrequency: 'monthly', schemaType: 'TechArticle', visualKey: 'resources',
  keywords: ['Python tactile data processing', 'tactile CSV', 'tactile heatmap', 'Python robotics'],
  verification: 'Executed in a fresh virtual environment on Windows x64 with CPython 3.13.3, Matplotlib 3.10.6 and NumPy 2.5.3. Twelve behavior tests passed. The plots and downloadable results below were produced by the supplied script, not drawn as a demonstration.',
  quickAnswer: ['Read a 47-row synthetic CSV describing 12 frames of a 2 × 2 array. Preserve missing data, plot the usable values and export three teaching contact-event segments. No robot, tactile sensor, GPU or ROS installation is required.'],
  sections: [
    {
      id: 'download', heading: '1. Download a small, complete project',
      body: ['The archive includes process_tactile.py, synthetic_tactile.csv, the deterministic data generator, tests, dependency files, licenses and reference results. Extract it into a new directory before running the commands below.', 'Matplotlib is the only top-level dependency; its installed dependencies include NumPy. requirements.txt pins Matplotlib, while requirements-lock.txt records every installed dependency from the verified environment. The CSV is independent teaching data: the starter kit’s single 2 × 2 frame has no time series or missing examples, so it cannot demonstrate event boundaries.'],
      links: [
        { label: 'Download the complete Python project (.zip)', href: `${download}/python-tactile-project.zip`, download: true },
        { label: 'Download process_tactile.py', href: `${download}/process_tactile.py`, download: true },
        { label: 'Download synthetic_tactile.csv', href: `${download}/synthetic_tactile.csv`, download: true },
        { label: 'Minimum dependencies', href: `${download}/requirements.txt`, download: true },
        { label: 'Verified dependency lock', href: `${download}/requirements-lock.txt`, download: true },
      ],
    },
    {
      id: 'run', heading: '2. Run it in an isolated Python environment',
      body: ['Open a terminal inside the extracted python-tactile folder. The Windows commands below match the verified platform and do not require PowerShell activation scripts. Use CPython 3.13.3 for the closest match to the recorded run.', 'The POSIX equivalent is provided for readers on Linux or macOS; that platform was not executed in this verification. The script uses a noninteractive plotting backend, so no display server or GUI is needed. Results overwrite files of the same name in the selected output directory.'],
      code: [
        { label: 'Windows PowerShell — verified command sequence', language: 'powershell', value: 'python -m venv .venv\n.venv\\Scripts\\python.exe -m pip install -r requirements-lock.txt\n.venv\\Scripts\\python.exe process_tactile.py --input synthetic_tactile.csv --output results --threshold 0.6\n.venv\\Scripts\\python.exe -m unittest discover -s . -p "test_*.py" -v' },
        { label: 'Linux / macOS equivalent — not executed here', language: 'bash', value: 'python3 -m venv .venv\n.venv/bin/python -m pip install -r requirements-lock.txt\n.venv/bin/python process_tactile.py --input synthetic_tactile.csv --output results --threshold 0.6\n.venv/bin/python -m unittest discover -s . -p "test_*.py" -v' },
        { label: 'Actual script output with the supplied CSV', language: 'text', value: 'frames=12 events=3 unknown_frames=3\nwrote processed.csv, frames.csv, contact_events.csv, summary.json, heatmap.png, timeline.png' },
      ],
    },
    {
      id: 'fields', heading: '3. Read the data contract before the numbers',
      body: ['Each CSV row describes one taxel at one synthetic time. A taxel is a single sensing element in the logical array. The grid has two rows and two columns; a missing row in the file becomes an unknown cell in that frame.', 'The sequence was hand-designed and generated by generate_sample.py. It is neither real acquisition nor a physical simulation. Its 100 ms spacing is a chosen fixture interval, not a measured sensor rate.'],
      table: { headers: ['Field', 'Contract'], rows: [
        ['timestamp_ns', 'Integer nanoseconds from the synthetic sequence origin. Repeated across taxels in a frame; nonnegative and nondecreasing in file order. Not Unix time, receive time or measured latency.'],
        ['sensor_id', 'teaching_surface for this file. This small processor accepts one sensor per input.'],
        ['row / column', 'Zero-based logical taxel coordinates in the declared 2 × 2 grid, not physical positions.'],
        ['value', 'A dimensionless teaching signal in [0, 1] when usable. A blank is missing.'],
        ['unit', 'normalized. The processor rejects other units rather than silently applying the same threshold to force or pressure.'],
        ['valid', '1 means usable at source; 0 means invalid or masked. The loader still checks a value marked 1 for missing, nonfinite or out-of-range data.'],
      ] },
      links: [{ label: 'Inspect or download the deterministic data generator', href: `${download}/generate_sample.py`, download: true }],
    },
    {
      id: 'quality', heading: '4. Preserve uncertainty during quality checks',
      body: ['load_frames rejects duplicate timestamp/taxel pairs, negative or backwards timestamps, noninteger times, invalid coordinates, mixed sensors, unsupported units and invalid validity flags. It does not silently sort a malformed recording.', 'A missing taxel, blank value, nonfinite number, out-of-range normalized number or valid=0 becomes an unknown usable value. The raw text and source validity flag remain in processed.csv; unknown usable_value cells are blank, not zero.', 'The supplied data has one invalid flag, one absent taxel and one blank numeric value. It produces 48 output cells: 45 usable and three unknown. Frames containing only subthreshold observations are called clear only when all taxels are usable.'],
      links: [{ label: 'Download the processed cells and quality statuses', href: `${download}/results/processed.csv`, download: true }, { label: 'Read the actual run summary', href: `${download}/results/summary.json`, download: true }],
    },
    {
      id: 'plots', heading: '5. Inspect the heatmap and time series',
      body: ['The script deliberately plots the first incomplete frame: 0.4 s. Its unusable 0.95 entry is gray and labelled unknown. It does not appear as high contact or as a zero-valued taxel.', 'The color scale is fixed to [0, 1] and labelled as a normalized teaching signal. It is not pressure in pascals or force in newtons.'],
      image: { src: `${download}/results/heatmap.png`, width: 960, height: 640, alt: 'Generated 2 by 2 synthetic tactile heatmap at 0.4 seconds: the upper-left cell is gray and unknown; the other three cells are 0.10.', caption: 'Actual output of process_tactile.py. Gray preserves the invalid cell instead of imputing zero.' },
      links: [{ label: 'Download the generated heatmap', href: `${download}/results/heatmap.png`, download: true }],
    },
    {
      id: 'events', heading: '6. Apply a transparent teaching threshold',
      body: ['A frame is contact when at least one usable taxel is greater than or equal to 0.6. It is clear when every taxel is usable and below the threshold. Otherwise it is unknown. A known high taxel can establish a threshold crossing even when another cell is missing, but incomplete low values cannot establish absence of contact.', 'Unknown frames split events. A gap longer than --max-gap-ms (150 by default) also splits them. If an event begins without a preceding clear frame, left_censored is true: its true start was not observed. If it ends at unknown data, a time gap or the recording boundary, right_censored is true.', 'The output has three segments: 0.2–0.3 s, 0.5 s, and 0.9–1.0 s. observed_span_ms measures the span between observed contact frames, not physical contact duration. The first two segments end at unknown frames; the last has a clear observation at 1.1 s. Missing data may divide one physical contact into multiple observed segments.', 'This rule has no hardware calibration, hysteresis, denoising or validated detection accuracy. Changing --threshold is an experiment in this fixture, not a sensor calibration procedure.'],
      image: { src: `${download}/results/timeline.png`, width: 1280, height: 640, alt: 'Generated synthetic time series showing five threshold-contact frames, three unknown frames, and a dashed teaching threshold at 0.6 normalized units.', caption: 'Actual time-series output. Points avoid implying interpolation across unknown observations.' },
      links: [{ label: 'Download contact_events.csv', href: `${download}/results/contact_events.csv`, download: true }, { label: 'Download frames.csv', href: `${download}/results/frames.csv`, download: true }, { label: 'Download the generated timeline', href: `${download}/results/timeline.png`, download: true }],
    },
    {
      id: 'ros-bridge', heading: '7. Carry the contract into ROS 2 and dataset work',
      body: ['The starter kit uses a channel-major TactileArray message with rows, columns, channel names, units and one validity byte per taxel. This exercise shares the concepts of ordered taxels and explicit validity, but is not a direct export of that ROS stream.', 'For a future single-channel adapter, values would be arranged as ((channel × rows) + row) × columns + column, with channels=[signal] and units=[normalized]. Map unknown cells to valid=0 and define their numeric payload convention with the consumer; never treat a placeholder as a measurement. A multichannel stream needs a deliberate policy because the starter kit has a per-taxel, not per-channel, validity mask.', 'Document a ROS clock domain and frame geometry before adapting timestamp_ns or sensor_id. Do not label this elapsed synthetic timestamp as a physical measurement or use it to calculate latency. No CSV-to-ROS publisher is included or claimed here; the ROS guide supplies the actual starter-kit publishing and recording workflow.', 'For research data, inspect the original schema, data license, calibration, sequence boundaries and split policy before adapting this reader. The tiny synthetic fixture is a software exercise, not a tactile learning benchmark.'],
      links: [rosPractice, { label: 'Find tactile datasets and check their access evidence', href: '/datasets' }, { label: 'Connect observations to robot learning', href: '/robot-learning' }],
    },
    {
      id: 'tests-and-license', heading: 'Tests, troubleshooting and licenses',
      body: ['The 12 behavior tests cover invalid high values, missing and nonfinite values, range violations, missing cells, partial-frame contact, duplicates, malformed timestamps, layout and unit rejection, inclusive threshold crossings, unknown boundaries, time gaps, empty input and invalid parameters. They run without importing Matplotlib.', 'If installation fails, check your Python version and the wheel availability for your operating system. If the script prints Input error, inspect the identified line before changing the grid or unit. A CSV opened and resaved by a spreadsheet can change integer timestamps or headers; keep an untouched copy.', 'Code and original tutorial documentation are Apache-2.0. The independently generated synthetic CSV and original generated results are CC0-1.0. The starter kit remains a separate Apache-2.0 project and retains its own authorship. This tutorial is by the RoboSkin.ai editorial team; it does not attribute its teaching data to research-paper authors.'],
      links: [{ label: 'Download the behavior tests', href: `${download}/test_process_tactile.py`, download: true }, { label: 'Code license: Apache-2.0', href: `${download}/LICENSE.txt`, download: true }, { label: 'Synthetic data and results license: CC0-1.0', href: `${download}/DATA-LICENSE.txt`, download: true }, { label: 'Project README', href: `${download}/README.md`, download: true }],
    },
    {
      "id": "robot-data-next",
      "heading": "8. Connect quality checks to calibration and episodes",
      "body": [
        "These independently generated normalized CSV signals are not calibrated force. For real sensors, first choose and validate an image, depth or force target, then preserve the raw unit, calibration revision and validity mask.",
        "For robot-learning exports, segment observations and actions into episodes and check timing and vector dimensions. The separate LeRobot numeric fixture also uses a small logical array, but has its own schema and arbitrary-unit contract; it is not a direct conversion of this CSV."
      ],
      "links": [
        {
          "label": "Plan DIGIT and GelSight Mini calibration",
          "href": "/guides/tactile-sensor-calibration"
        },
        {
          "label": "Inspect LeRobot episodes, timestamps and validation",
          "href": "/guides/lerobot-dataset-format"
        },
        {
          "label": "Plan demonstration capture and failure labels",
          "href": "/robot-teleoperation"
        }
      ]
    },
  ],
  faqs: [
    { question: 'Does a zero mean missing data?', answer: 'No. Zero is a possible valid normalized value. Missing and invalid values remain unknown, with an explicit status and a blank usable_value in the processed CSV.' },
    { question: 'Are these values pressure or force?', answer: 'No. They are dimensionless synthetic teaching values. No conversion to newtons or pascals is justified by this exercise.' },
    { question: 'Can I use the threshold on my sensor?', answer: 'Not without a separate sensor-specific design and validation. The 0.6 threshold demonstrates event logic only; it is not a calibrated detector.' },
  ],
  relatedLinks: [overview, rosPractice, { label: 'Tactile dataset directory', href: '/datasets', description: 'Choose real research data with documented sources and licenses.' }],
  sources: [{ label: 'Python csv module', href: 'https://docs.python.org/3/library/csv.html' }, { label: 'Matplotlib image API', href: 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.imshow.html' }, { label: 'Starter-kit message semantics', href: `${kit}/blob/${starterKitCommit}/docs/message-contract.md` }],
};

export const programmingPages = [roboticsProgramming, ros2Tutorial, pythonTactileTutorial];
