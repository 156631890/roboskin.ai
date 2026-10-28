Canonical URL: https://roboskin.ai/robot-teleoperation

[Home](https://roboskin.ai/) /  Robot teleoperation data: collection and quality checks

Robot data collection pillar

# Robot teleoperation data: collection and quality checks

Collect robot teleoperation data for learning: compare UMI and GELLO, then check action labels, synchronization, episode quality, splits and licenses.

Published 2026-08-21 | Updated 2026-10-28 by [RoboSkin.ai Editorial Team](https://roboskin.ai/editorial-policy)

October 28, 2026: added a pinned DROID action-target trace, a measured-motion comparison and downloadable action-contract records. These are source checks, not a DROID loader or hardware run; earlier collection evidence is retained.

[Check the action contract](https://roboskin.ai/robot-teleoperation#trace-action-targets)
[Browse research](https://roboskin.ai/research)
[Submit a source](https://roboskin.ai/contact?requestType=research)

![Robot hand, gripper, and assistive surface examples connected by blue tactile sensing signals.](https://roboskin.ai/generated/pages/application-contexts.webp)

Application-context visual for robot skin, e-skin, and tactile AI use cases.

## Build usable demonstration episodes

-   [Trace a real action target](https://roboskin.ai/robot-teleoperation#trace-action-targets)

    See the difference between a stored field, training transform and robot command.

-   [Check a teleoperation episode](https://roboskin.ai/robot-teleoperation#teleoperation-data-checklist)

    Inspect timing, outcomes and reuse conditions before training.

-   [Compare UMI and GELLO](https://roboskin.ai/robot-teleoperation#section-umi-and-gello-collect-different-kinds-of-demonstrations)

    Compare collection hardware, data and tactile limits.


On this page

1.  [Trace the action target before collecting or converting data](https://roboskin.ai/robot-teleoperation#trace-action-targets)
2.  [Robot teleoperation data collection: episode-quality checklist](https://roboskin.ai/robot-teleoperation#teleoperation-data-checklist)
3.  [Passive observation vs teleoperation data for robot learning](https://roboskin.ai/robot-teleoperation#passive-observation-vs-teleoperation-data-for-robot-learning)
4.  [Choose data by the training task](https://roboskin.ai/robot-teleoperation#section-choose-data-by-the-training-task)
5.  [What robot teleoperation controls](https://roboskin.ai/robot-teleoperation#section-what-robot-teleoperation-controls)
6.  [The demonstration-to-policy pipeline](https://roboskin.ai/robot-teleoperation#section-the-demonstration-to-policy-pipeline)
7.  [Teleoperation data is not autonomous capability](https://roboskin.ai/robot-teleoperation#section-teleoperation-data-is-not-autonomous-capability)
8.  [Current open data-collection signals](https://roboskin.ai/robot-teleoperation#section-current-open-data-collection-signals)
9.  [Touch and force feedback in teleoperation](https://roboskin.ai/robot-teleoperation#section-touch-and-force-feedback-in-teleoperation)
10.  [Quality and evaluation checklist](https://roboskin.ai/robot-teleoperation#section-quality-and-evaluation-checklist)
11.  [Robot Data Collection: from a demonstration to an export](https://roboskin.ai/robot-teleoperation#section-robot-data-collection-from-a-demonstration-to-an-export)
12.  [UMI vs GELLO: two routes to robot demonstration data](https://roboskin.ai/robot-teleoperation#section-umi-and-gello-collect-different-kinds-of-demonstrations)

Short answer

## What you need to know

1.   1

    Robot teleoperation data pairs recorded observations and robot state with human-controlled commands or action targets. To use it for learning, document the action interface, align clocks, retain resets and interventions, check episode quality, and define evaluation splits and reuse terms. Teleoperation demonstrates human control, not autonomous policy capability.

2.   2

    Robot teleoperation is remote or mediated human control of a robot through interfaces such as joysticks, teach pendants, motion capture, wearable devices, cameras, handheld end effectors, or bilateral systems. Teleoperated behavior is not autonomous behavior.

3.   3

    For robot learning, teleoperation can generate aligned observations and actions, but useful data also requires calibration, timing, task definitions, resets, failures, operator context, quality control, schema, access, and license.

4.   4

    Demonstrations do not become a capable policy automatically. Training must account for action representation, embodiment, coverage, compounding errors, evaluation splits, interventions, and repeated real-robot testing.


Topic 01

## Trace the action target before collecting or converting data

A field named action is not a complete control specification. Trace one record through its producing software and training loader to the intended robot interface. Dimension, units, reference frame, absolute versus incremental meaning, rotation representation and observation-to-action timing all belong in that record.

DROID provides a concrete source-inspected example. Its public schema lists a seven-element action and several action\_dict fields. The pinned policy-learning example instead constructs a ten-element target: three Cartesian-position values, six values representing rotation, and one gripper position. It marks these targets absolute and leaves the gripper dimension out of normalization. This is a particular training pipeline, not a claim that every DROID user has the same target.

| Evidence | What the inspected material says | What to do with it |
| --- | --- | --- |
| DROID serialized schema | Seven-element action; separate commanded Cartesian/joint position and velocity fields, plus observed state. | Record the exact raw field. The docs’ short “6x joint velocities” comment is insufficient to specify a controller and is not used here as a verified joint-action contract. |
| DROID pinned transform | droid\_dataset\_transform builds 3 + 6 + 1 values from action\_dict.cartesian\_position and gripper\_position. | Pin the transform and normalization. A ten-element rotation representation cannot be sent as ten robot joint commands. |
| DROID pinned loader | The example selects two exterior cameras and filters for success trajectories by default. A later transform slices action\[1:\] within its prepared window. | Inspect camera selection, filtering and temporal alignment in the actual training recipe; source inspection alone does not validate a loaded batch. |
| Tactile-ETA released demonstrations | Measured end-effector/joint transitions and recorded simulation steps; original actuator/tool commands are marked unavailable. | Useful for historical context; do not relabel measured displacement as the original control command. |

### A practical collection checkpoint

Before a larger collection session, complete the action-contract sheet and replay a small pilot batch through the intended loader. Retain a visible success, a failure or intervention, and a missing/stale-data case where available. Keep attempts and exclusions in the ledger; do not collect only a polished demonstration video.

Define acceptance thresholds from the target robot and task, then record who checked them and what is still unresolved. This is an engineering planning aid, not a safety certification or a claim that RoboSkin has tested your controller. The DROID findings above are source inspection on October 28, 2026; no DROID training or hardware run was performed.

-   [DROID official data schema](https://droid-dataset.github.io/droid/the-droid-dataset.html)
-   [Pinned DROID target construction, lines 27–38](https://github.com/droid-dataset/droid_policy_learning/blob/9a29c832b4c81bf38401111f5e4cdddaca217581/robomimic/utils/rlds_utils.py#L27-L38)
-   [Pinned DROID loader and camera/filter settings](https://github.com/droid-dataset/droid_policy_learning/blob/9a29c832b4c81bf38401111f5e4cdddaca217581/examples/droid_dataloader.py)
-   [Tactile-ETA preparation: recorded motion and unavailable commands](https://github.com/No-518/Tactile-ETA/blob/e7e5efbd42d3be7532ff5eb940a3cb015c2f7818/scripts/univtac/prepare_demonstrations.py)
-   [Download the action-contract sheet (CSV)](https://roboskin.ai/resources/robot-data/v2026.10.28/action-contract.csv)
-   [Download the complete decision kit with instructions](https://roboskin.ai/resources/robot-data/v2026.10.28/robot-data-decision-kit.zip)
-   [Choose an existing dataset before scaling new collection](https://roboskin.ai/robot-learning#robot-data-starting-points)

Topic 02

## Robot teleoperation data collection: episode-quality checklist

Define the learning data contract before choosing an interface. Direct robot teleoperation can record commands for a particular embodiment; original UMI instead uses an instrumented handheld gripper and reconstructs trajectories for later policy deployment. Neither raw video nor a controller joint angle is automatically a calibrated tactile measurement.

Review a small set of recorded episodes before scaling collection. Inspect the streams together, preserve failures and corrections, and document what was commanded versus what the robot measured. Passing file validation alone does not show that the resulting policy succeeds on a physical robot.

| Collection check | What the episode should document | What to verify |
| --- | --- | --- |
| Action meaning | Command and measured state, control mode, units, frames, gripper range and retargeting. | The targets match the policy and deployment controller. |
| Clock alignment | Observation, state, command and optional tactile timestamps with capture-rate metadata. | Replay exposes missing frames, offsets and stale sensor values. |
| Task coverage | Task label, objects, setup, resets, failures, interventions and operator context. | The retained episodes represent the conditions the policy will face. |
| Contact evidence | Sensor identity, placement, calibration and raw versus inferred touch fields. | An added tactile channel is valid, synchronized and supported by the learning method. |
| Release and evaluation | Dataset version, access, license and held-out split definition. | The release can be used for your purpose without leaking repeated episodes into evaluation. |

-   [Compare the original UMI and GELLO collection systems](https://roboskin.ai/robot-teleoperation#section-umi-and-gello-collect-different-kinds-of-demonstrations)
-   [Validate LeRobot fields, timestamps and conversion](https://roboskin.ai/guides/lerobot-dataset-format)
-   [Choose existing robot learning data before collecting more](https://roboskin.ai/robot-learning#choose-robot-learning-data)

Topic 03

## Passive observation vs teleoperation data for robot learning

Passive observation data can show what a human did and how a scene changed. Teleoperation can additionally record the commands sent to a particular robot alongside its measured state. That observation-action pairing is the key distinction for policy training: ordinary video does not directly tell you which robot command produced each transition.

These are complementary data sources. R3M pretrains visual representations on Ego4D human video and uses the representation for downstream robot policy learning. It does not make the original videos a dataset of measured robot actions. The R3M paper is an example of representation pretraining followed by task learning, not proof that every imitation-learning recipe can train from unlabelled video.

UMI is a third case: an instrumented handheld demonstration interface. Its gripper-mounted camera and trajectory-processing pipeline provide more structure than passive video, while collection can happen away from a robot. GELLO instead controls a robot through a joint-based interface. The table summarizes the original projects and R3M sources checked on September 19, 2026; RoboSkin has not run these hardware systems.

| Data source | Observations and action information | Collection hardware | Contact-information boundary |
| --- | --- | --- | --- |
| Passive human video | Images and temporal changes; optional text or annotations. Robot action targets are absent unless separately inferred or supplied. | An existing video corpus can be studied without a robot; acquiring footage needs a camera and appropriate permissions. | Visible contact is not a measurement of force, slip or an occluded contact patch. |
| Original UMI | Visual observations, reconstructed relative end-effector trajectories and gripper width; later robot deployment requires a compatible policy interface. | Handheld parallel-jaw gripper and mounted camera; no robot at every demonstration site. | Original UMI does not provide a default calibrated force or tactile stream. |
| Original GELLO | Controller joint measurements mapped to robot commands, plus the observations actually recorded by the robot setup. | Joint-encoder controller matched to the robot and a robot for physical demonstrations; cameras are separate. | Joint commands do not establish contact force. Record additional calibrated sensing if the task needs it. |
| Teleoperation with added tactile sensing | Aligned commands, measured state and recorded touch; haptic feedback to the operator is an independent design choice. | A suitable robot, interface and tactile sensor with a documented capture pipeline. | Preserve raw units, calibration, validity and clocks. A recorded tactile channel does not prove a trained policy uses it. |

-   [R3M: visual pretraining from human video](https://arxiv.org/abs/2203.12601)
-   [UMI: demonstration and policy interface](https://arxiv.org/abs/2402.10329)
-   [GELLO: joint-based teleoperation design](https://arxiv.org/html/2309.13037v2)

Topic 04

## Choose data by the training task

For visual representation learning, video may be useful before robot action labels are available. For supervised action imitation, first establish the action representation and its alignment with observations. For contact-sensitive insertion or grasp adjustment, decide whether touch supplies an observation, a training label, operator feedback or an evaluation signal; each role requires different records.

Consider inserting a plug. A passive clip shows motion and visible outcome. A teleoperation log can also preserve the commanded motion and measured robot state. Tactile sensing can add a local contact observation when the camera cannot see the mating surfaces. To compare these sources, hold out objects or scenes, report autonomous success separately from intervention, and state which streams the deployed policy actually receives. This is an experimental design example, not a RoboSkin hardware result.

-   Before collecting: specify the task, embodiment, observation streams and whether actions are measured, commanded or reconstructed.
-   Before merging: check camera calibration, coordinate frames, capture and receive times, missing streams, action dimensions and units.
-   Before training: preserve failed and interrupted episodes with reasons; document exclusions and split by the intended generalization claim.
-   Before reporting: separate data-format validity, useful demonstrations and independently evaluated policy performance.

-   [Validate LeRobot episode and timestamp fields](https://roboskin.ai/guides/lerobot-dataset-format)
-   [Practice tactile validity checks with a small Python dataset](https://roboskin.ai/guides/python-tactile-data-processing)
-   [Compare available tactile datasets and access limits](https://roboskin.ai/datasets)

Topic 05

## What robot teleoperation controls

Teleoperation can command a mobile base, arm pose, joint motion, gripper, dexterous hand, whole humanoid body, or a high-level subtask. The operator may watch direct video, stereo or depth views, a digital twin, or the physical robot. Some systems provide haptic or force feedback; others are one-way.

The interface changes the data. A low-dimensional joystick, handheld gripper, motion-capture rig, exoskeleton, and bilateral master device encode different human intent and produce different action distributions. Dataset records should preserve that acquisition contract.

| Interface family | Typical command | Strength | Data limitation to record |
| --- | --- | --- | --- |
| Joystick or gamepad | Base, end-effector, gripper, or mode commands | Portable and familiar | Low-dimensional mapping and operator-specific mode switches |
| Teach pendant or kinesthetic teaching | Waypoints, joint motion, or physically guided pose | Direct connection to industrial workflows or robot geometry | May be slow, robot-specific, or unsuitable for free whole-body motion |
| Motion capture or wearable interface | Human pose, hand pose, or joint targets retargeted to the robot | Can capture natural coordinated motion | Human-robot morphology, occlusion, calibration, and retargeting errors |
| Bilateral or haptic master | Position or force-related commands with feedback | Can expose contact to the operator | Cost, stability, latency, scaling, and master-slave mismatch |
| Handheld data-collection device | End-effector pose and gripper state without the full robot | Can lower collection friction and move data capture away from a robot cell | Requires reliable calibration and later embodiment mapping |

Topic 06

## The demonstration-to-policy pipeline

A teleoperation recording is a source trajectory, not a finished learning asset. The complete pipeline aligns sensors and commands, segments tasks, records outcomes and failure context, validates the episode, converts it to a stable schema, splits it without leakage, trains a model, and tests the model in closed loop.

-   Specify task, object, environment, operator instruction, success criteria, and reset policy
-   Calibrate and synchronize cameras, depth, proprioception, hand state, force or touch, commands, and timestamps
-   Record latency, packet loss, control modes, interventions, discarded episodes, failures, and operator identity or experience when relevant
-   Normalize episodes and action spaces while preserving raw data, units, coordinate frames, and provenance
-   Train and evaluate with splits that isolate the claimed objects, scenes, tasks, operators, or embodiments

Topic 07

## Teleoperation data is not autonomous capability

A teleoperated demonstration proves that a person and interface could make the robot perform the task under those conditions. It does not prove that a learned policy can perceive the same state, recover from error, or act safely without the operator.

A policy trained by imitation can encounter states absent from expert demonstrations because small prediction errors compound during execution. Corrective demonstrations, interactive data collection, recovery examples, and policy rollouts can target this gap, but they still require an explicit intervention policy and fair evaluation.

Topic 08

## Current open data-collection signals

The official Hugging Face Grabette article describes a handheld gripper-and-camera device that records data in the standard LeRobot dataset format. It is an example of collecting manipulation demonstrations without keeping a full robot in the loop during every recording. The transfer value still depends on calibration, task coverage, observation and action mapping, and later robot evaluation.

The LeRobot v0.6 release describes rollout tools and DAgger-style human corrections. FreeTacMan investigates wearable, robot-free visuo-tactile data collection. DROID and Open X-Embodiment represent broader real-robot and multi-embodiment data strategies. These resources solve different parts of the pipeline and should not be treated as identical teleoperation systems.

Topic 09

## Touch and force feedback in teleoperation

Touch can be recorded as robot-side training data, returned to the operator as haptic feedback, or both. Robot-side tactile data can label contact onset, slip, pressure distribution, or grasp state. Haptic feedback can help a person adjust motion, but the master device, scaling, delay, and feedback modality shape what the operator feels.

For imitation learning, synchronize tactile observations with the action that preceded the contact and the corrective action that followed it. A contact stream without robot state, timestamps, or action context is much harder to use for closed-loop policy learning.

The Missing Touch study maps GelSight Mini contact images to a 32-DoF cutaneous display and reports more natural and consistent trajectories in two 2-DoF tasks. It did not train an autonomous policy, so its learning relevance is a demonstration-quality implication rather than a measured policy-success gain. PRISM provides a separate collection perspective by combining exoskeleton, tracker, and VR interfaces across industrial tasks, while limiting tactile sensing to an unspecified subset of episodes.

Origami describes S1 as a skill-capture glove recording 20 finger joint angles with encoders, fingertip and palm pressure, and wrist-camera video on a shared timeline. Its matched glove/robot joint arrangement maps measured angles to corresponding robot position targets. This preserves joint correspondence, but wearer hand size and robot fingertip geometry can still change contact location and pressure distribution. The manufacturer says its contact-alignment model remains in development.

The reported 30 tasks demonstrate people wearing S1, not autonomous robot success. The OptiTrack check covers index, middle and ring fingertip positions in the glove wrist frame in one recording; it does not establish universal whole-hand accuracy. The product page offers Request access, not a verified downloadable dataset. These are manufacturer reports, not RoboSkin hardware tests.

Before procurement, request wearer-specific fitting/calibration records, sensor layouts and units, raw capture/receive timestamps, clock offsets and validity flags. Preserve glove observations separately from commanded and measured robot joints. Require an object-specific contact-transfer check across wearer sizes and robot fingertips, plus written export, reuse and availability terms.

-   [Origami S1: capture, calibration and contact-alignment limits](https://www.origami-robotics.com/blog/a-million-hours-of-what)
-   [S1 product access information](https://www.origami-robotics.com/s1)
-   [Compare robot-hand geometry and sensing](https://roboskin.ai/robot-hands)

Topic 10

## Quality and evaluation checklist

Data quality is a measured property, not a consequence of collection volume. Before training, inspect timing, calibration, missing streams, task labels, duplicated episodes, operator shortcuts, failures, and inconsistent resets. Before a capability claim, test the learned policy on the physical robot under a protocol that distinguishes autonomous success from human correction.

| Stage | What to verify | Failure if omitted |
| --- | --- | --- |
| Capture | Calibration, clocks, latency, commands, observations, raw units, and failure flags | The trajectory can look complete while actions and observations are misaligned |
| Curation | Episode boundaries, outcomes, duplicates, exclusions, class balance, and operator distribution | The model learns shortcuts or the dataset overstates coverage |
| Training | Action representation, normalization, history, embodiment mapping, and intervention handling | The learned interface differs from the deployed robot |
| Evaluation | Autonomy, objects, scenes, trials, resets, interventions, recovery, force, damage, and time | A staged or corrected run is reported as autonomous capability |
| Release | Schema, version, documentation, access, license, checksums, and known limitations | Other teams cannot audit or legally reuse the data |

Topic 11

## Robot Data Collection: from a demonstration to an export

Define an episode before recording: task instruction, start/reset condition, expected outcome and failure categories. Record observations and operator commands separately so an action target cannot be mistaken for a measured robot state. Preserve raw streams and a capture manifest alongside any training export.

Time synchronization belongs in acquisition. Save sensor capture time, host receive time and clock domains; estimate offsets using a documented synchronization method and inspect residual alignment. A resampled episode timestamp is a training index, not a measurement of end-to-end latency.

Before exporting, inspect dropped frames, duplicate or reversed timestamps, changed array dimensions, stale observations, saturation and invalid tactile samples. Label failed trajectories, interventions and recovery segments with reasons. Retain their provenance whether the training recipe includes or excludes them; do not silently call every recorded episode a success.

For training export, record state/action names, units, coordinate frames, episode boundaries, task text and outcome labels. Split by the intended generalization claim before computing training statistics. The linked LeRobot exercise checks a numeric subset with synthetic data; it does not validate videos, policy compatibility or the quality of a physical demonstration.

-   [Inspect LeRobot episodes, timestamps and validation](https://roboskin.ai/guides/lerobot-dataset-format)
-   [Compare robot and tactile datasets](https://roboskin.ai/datasets)
-   [Build the programming and data foundations](https://roboskin.ai/robotics-programming)

Topic 12

## UMI vs GELLO: two routes to robot demonstration data

Original UMI and GELLO are complementary collection approaches. UMI moves demonstration capture into a handheld gripper; GELLO maps a human-operated joint controller to a robot arm. The comparison below is scoped to the original project and paper, checked on September 16, 2026. It does not generalize later tactile variants to the originals.

| Aspect | Original UMI | Original GELLO |
| --- | --- | --- |
| Collection method | Human directly manipulates handheld grippers; the robot is not required at every collection site. | Operator moves a smaller controller with a kinematic structure matched to the target robot; joint measurements drive teleoperation. |
| Hardware requirements | Handheld parallel-jaw gripper and mounted GoPro; the processing pipeline reconstructs trajectories. Deployment later needs a suitable robot and mapping. | 3D-printed controller with encoder-equipped servos, a communication interface and a supported robot for physical demonstrations; cameras are separate observation hardware. |
| Data produced | Visual observations, reconstructed end-effector trajectories and gripper width used by the collection/policy pipeline. This is not automatically a LeRobot export. | Controller joint targets and recorded robot observations; camera streams depend on the capture setup. Define action/state mappings before conversion. |
| Force / tactile information | The original UMI system is not a default tactile-sensor system. Video and gripper width do not supply calibrated contact force. | Encoder position and mechanical resistance at the controller are not a calibrated tactile stream. Additional sensing and alignment are required for force/touch labels. |
| Main quality question | Is pose reconstruction reliable, is timing aligned and is the trajectory feasible for the deployment embodiment? | Are joint mapping, offsets, robot observations and camera/command timing correct for the matched embodiment? |

-   [UMI original project: hardware and data collection](https://umi-gripper.github.io/)
-   [GELLO original paper and hardware scope](https://arxiv.org/abs/2309.13037)
-   [GELLO official software and acquisition setup](https://github.com/wuphilipp/gello_software)
-   [Inspect LeRobot episodes, timestamps and validation](https://roboskin.ai/guides/lerobot-dataset-format)

Editorial review

Written by [RoboSkin.ai Editorial Team](https://roboskin.ai/editorial-policy). Source-reported findings and RoboSkin.ai analysis are kept separate.

Reading a paper is not an independent reproduction. Code execution, replay and hardware testing are separate evidence types; look for a dated record and its stated conditions before treating a result as tested by RoboSkin.ai.

This review does not imply product availability, certification, laboratory affiliation or measured performance by RoboSkin.ai.

Editorial lead: [Steven Yang](https://roboskin.ai/about#editorial-lead).

[How evidence is checked](https://roboskin.ai/editorial-policy#evidence-method)
[Report a source or attribution issue](https://roboskin.ai/contact?requestType=research)

Related routes

[AI and robotics  Connect human demonstrations to robot data, policy learning, deployment, and feedback.](https://roboskin.ai/ai-robotics)
[Robotics datasets  Review broad robot-data fields, splits, access, and license.](https://roboskin.ai/robotics-datasets)
[Robot learning  Connect demonstrations to imitation, correction, evaluation, and transfer.](https://roboskin.ai/robot-learning)
[Robot VLA models  Understand how images, language, state, and actions enter generalist policies.](https://roboskin.ai/robot-vla-models)
[Robot manipulation  Place demonstrations inside grasping, insertion, dexterity, and tool-use tasks.](https://roboskin.ai/robot-manipulation)
[Robot hands  Map end-effector interfaces, sensing, and dexterous action spaces.](https://roboskin.ai/robot-hands)
[Tactile datasets  Find touch-specific data resources and sensor metadata.](https://roboskin.ai/datasets)
[The Missing Touch research brief  Review spatial cutaneous feedback, participant evidence, and the autonomous-policy boundary.](https://roboskin.ai/research/missing-touch-spatial-tactile-feedback-teleoperation-2026)
[PRISM research brief  Review the industrial collection design, tactile subset, and pending release status.](https://roboskin.ai/research/prism-contact-rich-industrial-skill-dataset-2026)
[FreeTacMan research brief  Review wearable robot-free visuo-tactile collection evidence.](https://roboskin.ai/research/freetacman-robot-free-visuotactile-data-collection-2025)

Source paths

[R3M human-video pretraining paper — checked 2026-09-19 \->](https://arxiv.org/abs/2203.12601)
[UMI original paper — checked 2026-09-19 \->](https://arxiv.org/abs/2402.10329)
[UMI original project — checked 2026-09-19 \->](https://umi-gripper.github.io/)
[GELLO original paper — checked 2026-09-16 \->](https://arxiv.org/abs/2309.13037)
[The Missing Touch spatial tactile feedback preprint \->](https://arxiv.org/abs/2608.19372)
[PRISM industrial skill dataset preprint \->](https://arxiv.org/abs/2608.17962)
[Hugging Face Grabette data-collection article \->](https://huggingface.co/blog/grabette)
[Hugging Face LeRobot v0.6 \->](https://huggingface.co/blog/lerobot-release-v060)
[FreeTacMan project \->](https://opendrivelab.com/FreeTacMan)
[DROID robot manipulation dataset paper \->](https://arxiv.org/abs/2403.12945)
[Open X-Embodiment paper \->](https://arxiv.org/abs/2310.08864)
[Hugging Face LeRobot Dataset v3 \->](https://huggingface.co/blog/lerobot-datasets-v3)

Paper routes

## Start with source-backed RoboSkin briefs

[![RoboSkin.ai visual](https://roboskin.ai/generated/authority/tactile-ai-loop.webp)  Robot teleoperation / 2026-08-22  The Missing Touch tests spatial tactile feedback in robot teleoperation  A GelSight Mini and 32-DoF fingertip display made two teleoperation tasks more natural and consistent, but no autonomous robot policy was trained or evaluated.](https://roboskin.ai/research/missing-touch-spatial-tactile-feedback-teleoperation-2026)
[![RoboSkin.ai visual](https://roboskin.ai/generated/authority/roboskin-index-cover.webp)  Tactile datasets / 2026-08-22  PRISM maps 5,000+ contact-rich industrial robot trajectories  PRISM reports 5,000+ robot trajectories across 25+ industrial tasks, but tactile observations cover only a subset and the announced dataset download is not yet available.](https://roboskin.ai/research/prism-contact-rich-industrial-skill-dataset-2026)
[![RoboSkin.ai visual](https://roboskin.ai/generated/authority/humanoid-stack-map-cover.webp)  Tactile datasets / 2026-08-22  RoboTacDex maps 6,000+ humanoid visual-tactile trajectories  RoboTacDex reports 6,000+ Unitree G1 trajectories across 19 tasks, an author-reported 23 skills, and 22 objects, but public dataset access remains pending.](https://roboskin.ai/research/robotacdex-humanoid-visual-tactile-action-dataset-2026)
[![RoboSkin.ai visual](https://roboskin.ai/generated/authority/authority-hero-tactile-stack.webp)  Tactile Data / 2026-08-22  FreeTacMan robot-free visuo-tactile data collection for tactile AI  A research note on FreeTacMan, robot-free visuo-tactile datasets, tactile AI data collection, and why robot skin models need contact diversity.](https://roboskin.ai/research/freetacman-robot-free-visuotactile-data-collection-2025)
[![RoboSkin.ai visual](https://roboskin.ai/generated/authority/humanoid-stack-map-cover.webp)  Tactile Data / 2026-08-22  GIST humanoid visual-tactile-action dataset maps 101.9K soft-object samples  The GIST preprint reports 101.9K visual-tactile-action samples for towel and sponge manipulation, with dense hand touch, two camera views, and explicit access limits.](https://roboskin.ai/research/humanoid-visual-tactile-action-dataset-2025)

Common questions

## FAQ for this topic

 01

### Can passive video replace teleoperation data?

Passive video can support representation learning, but it does not directly supply synchronized robot action targets. Using it for policy learning requires a suitable learning objective, inferred or additional action information, and evaluation on the target robot.

 02

### Is UMI the same as passive video collection?

No. Original UMI uses an instrumented handheld gripper and a trajectory-processing pipeline to provide a structured demonstration and policy interface. It can collect away from a robot, but its original design does not include a default calibrated tactile or force stream.

 03

### What is robot teleoperation?

Robot teleoperation is remote or mediated human control of a robot through an interface such as a joystick, teach pendant, motion-capture system, wearable device, handheld end effector, or bilateral master.

 04

### Is a teleoperated robot autonomous?

No. Teleoperation shows human-controlled behavior. Autonomous capability requires the robot policy to perceive and act without the operator under a defined evaluation protocol.

 05

### How does teleoperation create robot-learning data?

It records synchronized observations, robot state, human commands, actions, task context, and outcomes. Those episodes are calibrated, quality-checked, normalized, split, and used to train and evaluate a policy.

 06

### What limits learning from teleoperation?

Limits include interface bias, latency, morphology mismatch, narrow task coverage, inconsistent operators, missing failures, action retargeting, compounding policy errors, and evaluation leakage.

 07

### Why record tactile data during teleoperation?

Touch can expose contact onset, pressure, shear, slip, seating, and corrective behavior that cameras may miss, but it must be synchronized with robot state and actions to support learning.
