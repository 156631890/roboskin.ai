Canonical URL: https://roboskin.ai/robot-learning

[Home](https://roboskin.ai/) /  Robot learning data: datasets, formats and evaluation

High-interest robotics pillar

# Robot learning data: datasets, formats and evaluation

Choose robot learning data by task, action space and sensor coverage. Find datasets, check formats and licenses, and plan held-out robot evaluation.

Published 2026-08-20 | Updated 2026-10-28 by [RoboSkin.ai Editorial Team](https://roboskin.ai/editorial-policy)

October 28, 2026: added a five-entry, source-linked dataset decision matrix, a one-episode inspection workflow and downloadable decision records. Earlier research sections, sources and dates are retained.

[Choose a dataset starting point](https://roboskin.ai/robot-learning#robot-data-starting-points)
[Browse research](https://roboskin.ai/research)
[Submit a source](https://roboskin.ai/contact?requestType=research)

![Organized robot skin learning library with technical cards, tactile sensor samples, and research screens.](https://roboskin.ai/generated/pages/resources-library.webp)

Resource-library visual for public learning routes and technical references.

## Find and check robot learning data

-   [Choose a dataset starting point](https://roboskin.ai/robot-learning#robot-data-starting-points)

    Compare five source-linked routes by task, format, rights and first check.

-   [Inspect one episode before scaling](https://roboskin.ai/robot-learning#one-episode-preflight)

    Download decision and action-contract records with evidence fields.

-   [Find broader dataset sources](https://roboskin.ai/robotics-datasets)

    Explore the directory after narrowing your task and embodiment.


On this page

1.  [Choose a dataset starting point for your task](https://roboskin.ai/robot-learning#robot-data-starting-points)
2.  [How to choose robot learning data](https://roboskin.ai/robot-learning#choose-robot-learning-data)
3.  [Make a decision from one inspected episode](https://roboskin.ai/robot-learning#one-episode-preflight)
4.  [The robot-learning loop](https://roboskin.ai/robot-learning#section-the-robot-learning-loop)
5.  [Major learning paradigms](https://roboskin.ai/robot-learning#section-major-learning-paradigms)
6.  [Data is part of the robot system](https://roboskin.ai/robot-learning#section-data-is-part-of-the-robot-system)
7.  [Simulation and sim-to-real transfer](https://roboskin.ai/robot-learning#section-simulation-and-sim-to-real-transfer)
8.  [Tactile robot learning](https://roboskin.ai/robot-learning#section-tactile-robot-learning)
9.  [How to evaluate robot-learning claims](https://roboskin.ai/robot-learning#section-how-to-evaluate-robot-learning-claims)
10.  [Open tooling and the 2026 ecosystem](https://roboskin.ai/robot-learning#section-open-tooling-and-the-2026-ecosystem)
11.  [Collective experience learning: what does “without human corrections” remove?](https://roboskin.ai/robot-learning#collective-experience-learning-fert)
12.  [DexOAK: from human hand-object motion to robot references](https://roboskin.ai/robot-learning#dexoak-object-aware-retargeting)

Short answer

## What you need to know

1.   1

    Robot learning data includes observations, robot state, actions, task context and outcomes used to train or evaluate a robot model. Start with the task and action interface, then check sensing, timing, held-out splits, access and license. Dataset size alone does not establish that the data fits your robot.

2.   2

    Robot learning is the use of data and experience to train robots to perceive, predict, or act instead of specifying every behavior as a fixed rule. The training signal may come from demonstrations, rewards, self-supervision, simulation, human feedback, or combinations of these sources.

3.   3

    A useful robot-learning claim must name the robot, observations, action space, data, task, training method, evaluation split, autonomy level, and real-world trial protocol. Model size or dataset size alone does not establish physical capability.

4.   4

    Touch matters when success depends on hidden contact state. Tactile observations can expose pressure, shear, slip, seating, deformation, and contact transitions that vision and proprioception may not measure directly.


Topic 01

## Choose a dataset starting point for your task

For a cross-embodiment mixture, start with Open X-Embodiment; for varied scenes on a common Franka platform, inspect DROID; for WidowX manipulation, inspect BridgeData V2. Use the small LeRobot exercise to learn the storage contract, or the UniVTAC example to inspect simulated tactile context. These are different routes, not a ranking of interchangeable datasets.

The five-entry shortlist below was source-checked on October 28, 2026. “Use when” and “first check” are RoboSkin selection guidance. Upstream descriptions remain attributed; only the specifically identified local exercises were run. Follow the original release for data and rights.

| Starting point | Use when | Input boundary | First check |
| --- | --- | --- | --- |
| Open X-Embodiment | You need a mixture of robot embodiments and are prepared to define a per-dataset adapter. | RLDS episodes; cameras, state fields and action conventions vary across constituent datasets. The RT-1-X checkpoint interface is not a schema for every dataset. | Choose one constituent dataset in the official inventory, inspect an episode with the official notebook, and record its action units and split before mixing it with others. |
| DROID | You need varied real-world manipulation scenes on a common Franka platform. | The documented RLDS schema exposes three camera views, observed state and action\_dict commands. A pinned policy-loader example constructs a 10-dimensional absolute target from Cartesian position, a 6D rotation representation and gripper position. | Start with the official visualizer or 100-episode subset, then trace the exact loader's command representation and camera selection. The subset size is provider-reported, not a download measured by RoboSkin. |
| BridgeData V2 | You need goal- or language-conditioned manipulation examples on the WidowX platform. | Robot observations, states, actions and language; camera/depth coverage varies. Teleoperated demonstrations and scripted pick-and-place rollouts are separate collections. | Choose demonstrations or scripted rollouts deliberately, inspect the available camera views, then pin the conversion and loader used for the training target. |
| LeRobot koch\_pick\_place\_1\_lego example | You need a bounded exercise to inspect LeRobot v3 storage and loader behavior before choosing training data. | Two camera streams; six-element state and action vectors. The pinned metadata declares robot\_type unknown and does not establish physical units. No tactile feature is declared. | Use RoboSkin's existing episode-0 exercise: 445 rows, two decoded video streams and five complete official-loader samples. Read the dated report and its limits. |
| UniVTAC / Tactile-ETA Lift Bottle inputs | You need a public simulated example of action-aligned camera and bilateral tactile context. | Head/wrist RGB, bilateral marker RGB, measured end-effector/joint state and simulation steps. The released demonstration describes measured motion; original actuator/tool commands are not available in that package. | Run the accompanying offline audit of upstream episodes 0 and 1. It checks 24 segments and released strip pixels against the raw data, without policy inference. |

### Open X-Embodiment: access and evidence

RLDS episodes; download and loading examples in the official repository.

Repository: Apache-2.0 for software; CC BY 4.0 for other repository materials. Inspect the selected constituent dataset's own terms and citation; do not assign one inferred license to the whole mixture.

Source inspection on 2026-10-28. No dataset payload or training run was checked in this review.

Reconsider this route if: The intended subset has unresolved action semantics, rights, or a held-out evaluation boundary.

-   [Original access route](https://github.com/google-deepmind/open_x_embodiment/blob/9eeb68b989efbcf474e8fb9019e01d02b962a604/README.md#dataset-access)
-   [Official repository at 9eeb68b: access, constituent inventory and licensing](https://github.com/google-deepmind/open_x_embodiment/blob/9eeb68b989efbcf474e8fb9019e01d02b962a604/README.md)

### DROID: access and evidence

RLDS for training; separate raw high-resolution/stereo files. The documentation advertises a 100-episode RLDS debugging subset (~2 GB).

The v2 paper states CC BY 4.0 for the dataset. Keep dataset rights separate from the software license and any later annotation release.

Documentation, v2 paper and pinned loader source inspected on 2026-10-28. The DROID loader was not executed and no DROID episode was downloaded in this review.

Reconsider this route if: A seven-number array is being treated as seven joint targets without tracing the producing transform and controller.

-   [Original access route](https://droid-dataset.github.io/droid/the-droid-dataset.html)
-   [DROID paper v2: platform and dataset license](https://arxiv.org/html/2403.12945v2)
-   [Pinned action transform](https://github.com/droid-dataset/droid_policy_learning/blob/9a29c832b4c81bf38401111f5e4cdddaca217581/robomimic/utils/rlds_utils.py#L27-L38)
-   [Pinned loader: absolute targets, camera selection and filters](https://github.com/droid-dataset/droid_policy_learning/blob/9a29c832b4c81bf38401111f5e4cdddaca217581/examples/droid_dataloader.py)

### BridgeData V2: access and evidence

Raw JPEG/PNG/pickle files; processed 256 × 256 TFDS/RLDS option. A file container is not an action-unit specification.

The official project states CC BY 4.0 for all data. The training repository's software terms are separate.

Official project and pinned training README inspected on 2026-10-28. No raw archive, converter or policy was run in this review.

Reconsider this route if: You need a tactile stream or all four camera views and have not confirmed them in the chosen episodes.

-   [Original access route](https://rail.eecs.berkeley.edu/datasets/bridge_release/data/)
-   [Official composition, hardware, camera coverage and data license](https://rail-berkeley.github.io/bridgedata/)
-   [Pinned raw/TFDS loading routes](https://github.com/rail-berkeley/bridge_data_v2/blob/bc60a35b701a12021c8c95e9d8601274d3acd928/README.md#data)

### LeRobot koch\_pick\_place\_1\_lego example: access and evidence

LeRobot v3 Parquet and MP4 shards with episode metadata.

The pinned dataset card declares Apache-2.0. It does not supply a complete robot/controller contract.

Pinned card re-read on 2026-10-28; file/loader results are the separate recorded RoboSkin run of 2026-10-25, not a new run today.

Reconsider this route if: The repository name is being used to infer verified robot identity, units, calibration or suitability for another policy.

-   [Original access route](https://huggingface.co/datasets/lerobot/koch_pick_place_1_lego/tree/afc0b3e54679cb8a94283fbab5a4ccf0d405f10b)
-   [Pinned card and metadata](https://huggingface.co/datasets/lerobot/koch_pick_place_1_lego/blob/afc0b3e54679cb8a94283fbab5a4ccf0d405f10b/README.md)
-   [RoboSkin's dated loader exercise and limits](https://roboskin.ai/guides/lerobot-dataset-format)

### UniVTAC / Tactile-ETA Lift Bottle inputs: access and evidence

Pinned HDF5 episodes plus Tactile-ETA JSON and PNG strips.

The pinned UniVTAC dataset card declares MIT; Tactile-ETA's demonstration README attributes these processed inputs to that release. Review separately any simulator, model or task-asset terms.

Actual local input audit on 2026-10-28. This does not reproduce a success rate, run a selector's feature computation, or test a physical robot.

Reconsider this route if: You need measured physical contact, original commanded actions or an independently reproduced control result.

-   [Original access route](https://huggingface.co/datasets/byml/UniVTAC/tree/e1aee7b0c95543b535e0146b2de3ee1bc6ddaabd/isaac51/lift_bottle)
-   [Pinned UniVTAC card](https://huggingface.co/datasets/byml/UniVTAC/blob/e1aee7b0c95543b535e0146b2de3ee1bc6ddaabd/README.md)
-   [Pinned demonstration provenance](https://github.com/No-518/Tactile-ETA/blob/e7e5efbd42d3be7532ff5eb940a3cb015c2f7818/demonstrations/README.md)
-   [Pinned preparation code: measured motion and nominal timing](https://github.com/No-518/Tactile-ETA/blob/e7e5efbd42d3be7532ff5eb940a3cb015c2f7818/scripts/univtac/prepare_demonstrations.py)

-   [Download the five-entry selection matrix (CSV)](https://roboskin.ai/resources/robot-data/v2026.10.28/selection-matrix.csv)
-   [Read the versioned matrix with per-entry sources (JSON)](https://roboskin.ai/resources/robot-data/v2026.10.28/selection-matrix.json)
-   [For a broader source inventory, open the robotics dataset directory](https://roboskin.ai/robotics-datasets)
-   [For physical tactile data, compare the specialized tactile directory](https://roboskin.ai/datasets)

Topic 02

## How to choose robot learning data

First decide what you want to learn: a visual or tactile representation, an action policy, a reward or a dynamics model. Human video, robot demonstrations and tactile records can serve different roles; a video dataset is not automatically a set of executable robot-action targets.

Use the checklist before downloading or converting data. Follow the original dataset for access and license terms, and the format guide for storage and field conventions. A common format does not make different robots, action units or train-test splits interchangeable.

When considering human hand-object recordings, read the [DexOAK retargeting and replay evidence checklist](https://roboskin.ai/robot-learning#dexoak-object-aware-retargeting) before treating reconstructed motion as executable robot training data.

| Decision | What to inspect | Why it changes your choice |
| --- | --- | --- |
| Task and embodiment | Robot, end effector, objects, tasks, resets and failed attempts. | Reject data that does not represent the behavior or hardware you need. |
| Action contract | Command versus measured state, joint or end-effector space, units, frames and gripper convention. | Similar field names do not establish compatible action targets. |
| Sensor and timing contract | Camera, proprioception, touch, timestamps, calibration and missing observations. | A recorded modality must be aligned and supported by the training recipe. |
| Access and reuse | Original download, version, dataset license and separate code or model terms. | Public metadata does not establish that files are downloadable or reusable for your purpose. |
| Evaluation split | Held-out objects, scenes, tasks, operators or embodiments and repeated trajectories. | Match the split to the transfer claim and avoid training-test leakage. |

-   [Find broad robotics datasets and their original sources](https://roboskin.ai/robotics-datasets)
-   [Compare tactile datasets by task and release evidence](https://roboskin.ai/datasets)
-   [Inspect LeRobot episode fields and conversion checks](https://roboskin.ai/guides/lerobot-dataset-format)
-   [Plan new demonstration collection](https://roboskin.ai/robot-teleoperation#teleoperation-data-checklist)

Topic 03

## Make a decision from one inspected episode

Before downloading a full collection, choose one candidate and write down the target task, embodiment and policy interface. Inspect one accessible episode as a screening step. A clean episode can justify a larger sample; it cannot establish that an entire dataset is suitable.

The downloadable decision record separates source claims from your observations and leaves unanswered fields empty. Keep the source revision and evidence location with each decision. Do not turn “not checked” into “absent,” or a file-format pass into training readiness.

| Check | Evidence to retain | Decision it supports |
| --- | --- | --- |
| Access and rights | Exact release, file path, download result and dataset terms; code/model terms separately. | Can this candidate be inspected and reused for the intended purpose? |
| Action target | Raw field → transform → training target → controller; units, frame, gripper range and temporal offset. | Can the policy consume and execute this target, or is an adapter still missing? |
| Time and observations | Episode boundaries, camera/touch keys, valid masks, missing samples and the provenance of each timestamp. | Are the selected streams usable for this task? Nominal timestamps do not establish physical synchronization. |
| Coverage and split | Objects, scenes, people/sessions, failed attempts, repeated trajectories and holdout grouping. | What is represented, and what new evidence is required before a transfer claim? |
| Decision | Inspect further, adapt, hold or reject; link the reason to the evidence and name the next check. | A recorded selection decision; never a universal quality score. |

-   [Download the decision and action-contract workbook (ZIP, CSV files)](https://roboskin.ai/resources/robot-data/v2026.10.28/robot-data-decision-kit.zip)
-   [Run the existing LeRobot public-episode check](https://roboskin.ai/guides/lerobot-dataset-format#public-episode)
-   [Inspect the measured-motion versus commanded-action example](https://roboskin.ai/robot-teleoperation#trace-action-targets)
-   [Inspect the tactile demonstration audit](https://roboskin.ai/guides/tactile-in-context-learning-tactile-eta-vs-gpt-6-astra#published-input-audit)

Topic 04

## The robot-learning loop

Robot learning connects observations to actions through a training objective and an evaluation protocol. Observations may include cameras, depth, language, proprioception, force, torque, or tactile signals. Actions may be joint commands, end-effector motion, gripper state, trajectories, or action chunks.

The loop is only as reliable as its data and evaluation. Demonstration quality, timing, calibration, resets, interventions, failed attempts, and hardware changes can all alter what the learned policy actually represents.

-   Collect synchronized observations, robot state, actions, task context, and failure metadata
-   Train a policy, representation, reward model, dynamics model, or reusable foundation model
-   Evaluate on held-out tasks, objects, scenes, robots, sensors, or physical conditions
-   Measure real-robot success, speed, recovery, force, damage, and intervention instead of only offline loss

Topic 05

## Major learning paradigms

Robot-learning labels describe different supervision and optimization choices. Many practical systems combine several of them, so comparisons should identify the exact training and deployment role.

| Approach | Learning signal | Typical strength | Evidence boundary |
| --- | --- | --- | --- |
| Imitation learning | Expert or teleoperated demonstrations | Directly learns behaviors represented in the demonstrations | Sensitive to demonstration coverage and distribution shift |
| Reinforcement learning | Reward from interaction or simulation | Can optimize behavior through trial and feedback | Reward design, safety, sample cost, and sim-to-real transfer must be reported |
| Offline robot learning | Previously collected trajectories | Reuses data without new online exploration during training | Cannot assume the logged data covers every useful action or failure |
| Self-supervised representation learning | Structure inside unlabeled or weakly labeled observations | Can create reusable visual, tactile, or multimodal features | Representation scores do not automatically prove closed-loop task value |
| Vision-language-action policy | Robot trajectories paired with images and instructions | Connects task language and observations to actions | Embodiment, action interface, data mix, and real-robot evaluation determine scope |

Topic 06

## Data is part of the robot system

Open X-Embodiment, DROID, and the LeRobot ecosystem illustrate different routes toward reusable robot data: cross-embodiment aggregation, a large real-world manipulation dataset, and a standardized open data and tooling ecosystem. They are complementary examples, not interchangeable benchmarks.

A dataset record should expose the robot, sensor streams, control interface, task labels, trajectory unit, timing, calibration, collection policy, train-test split, access path, and license. Without those fields, scale is difficult to interpret and reuse is harder to audit.

Topic 07

## Simulation and sim-to-real transfer

Simulation can generate experience, perturbations, labels, and repeatable evaluation without exposing hardware to every trial. Transfer to a physical robot still depends on geometry, dynamics, contact, sensing, latency, control, and observation differences between the simulator and the deployed system.

Report what was randomized, adapted, calibrated, or fine-tuned, and separate simulation success from repeated physical trials. A simulator benchmark can test a method under controlled conditions; it does not by itself establish real-world reliability.

ADEPT is a current source-bounded example: it pretrains generic object reposing in simulation, then trains each embodiment and downstream task independently before transferring student policies to two physical workbench systems without real-world fine-tuning. Its use of “zero-shot sim-to-real” does not mean zero-shot transfer to a new hand, sensor, task, or robot.

SoftMimicGen adapts a small library of deformable-object demonstrations into successful simulated trajectories for policy training. Its three real-robot comparisons distinguish simulation-only and joint training; the towel result ties the real-only baseline. The source review separates generation acceptance, policy success and the RGB-D deployment pathway from untested tactile claims.

-   [SoftMimicGen: method, real-robot evidence and tactile limits](https://roboskin.ai/research/softmimicgen-synthetic-data-sim-to-real-2026)

Topic 08

## Tactile robot learning

Tactile in-context learning uses examples in the model input rather than updating its parameters. Tactile-ETA pairs action segments with before-and-after camera views, robot state and tactile observations; it retains tactile endpoints and selected change frames in ordered demonstrations. The frozen agent also receives current sensing and execution feedback.

In four simulated tasks, the authors keep two expert demonstrations, current inputs and the execution interface fixed. Adding tactile observations inside the demonstrations raises mean success from 15.75% to 24%, with 100 trials per task and condition; not every task improves. On Wipe Board and Pick Up Chips, each condition has current vision and touch: one aligned multimodal demonstration versus none yields 3/5 versus 0/5 successes per task. This is not a touch-versus-no-touch comparison or an industrial reliability estimate.

Decisions occur between motion segments, so this context does not replace fast tactile feedback control during execution. These are author-reported results from the October 20, 2026 v1 preprint, with source and code inspection updated October 22; RoboSkin has not run the controller or reproduced the results. Task coverage and hardware samples are small.

A separate Lift Bottle ablation in the same v1 holds the two demonstrations, their visual-motion content and current sensing fixed: endpoints yield 27/100 successes, all historical tactile frames 2/100, and endpoints plus a selected change pair 36/100. This supports testing action-aligned frame selection, not a general claim that dense touch is harmful. The separate TacTalent Astra study changes touch in both demonstrations and online inputs, so its modality comparison answers a different question.

Touch can enter robot learning as raw tactile images, force or pressure arrays, compact contact representations, predicted future observations, a reward signal, or a fast correction pathway. The right representation depends on the sensor, task, controller rate, and data available.

ManiSkill-ViTac provides a primary-source example of a simulation benchmark focused on visuo-tactile manipulation. Physical tactile datasets and full-hand benchmarks add different evidence. Results should stay attached to their robot, sensor, task, split, and protocol.

UniVTAC makes those units explicit: 205,826 samples pretrain a tactile encoder, 400 paper-reported trajectories train eight task policies, the September inventory lists 800 task HDF5 files for each of Isaac Sim 4.5 and 5.1, and 450 physical demonstrations support three real-world tasks. Evaluation rollouts are outcomes rather than additional training data.

In ADEPT, the tactile pathway is limited to five vision-based fingertips on one Flexiv-Sharpa student. The paper reports 3/10 vision-only versus 8/10 visuo-tactile final success in one matched insertion condition with ten trials per modality. This is useful causal evidence inside that condition, not proof of cross-sensor or cross-hand transfer.

-   Synchronize touch with camera frames, pose, joint state, action, and contact events
-   Compare against matched no-touch or shuffled-touch baselines where tactile value is claimed
-   Test occlusion, slip, insertion, deformable objects, or disturbances that make contact information relevant
-   Report sensor calibration, wear, drift, replacement, and latency when they can affect the learned behavior

| Role of tactile data | What changes? | What to check before reuse |
| --- | --- | --- |
| Fine-tuning | An optimizer changes model parameters using training records. | Separate training and held-out episodes; retain sensor calibration and the action contract. |
| Demonstrations in context | Examples condition a fixed model at inference. | Keep observations aligned with actions, segment order and outcomes; distinguish recorded touch from current touch. |
| Execution feedback | New observations inform the next decision or controller correction. | Measure observation age, decision interval and actuation latency; a supplied touch stream alone does not establish a fast control loop. |

-   [Tactile-ETA v1: controlled comparisons, limitations and hardware protocol](https://arxiv.org/html/2610.27613v1)
-   [Compare Tactile-ETA and the TacTalent Astra setup, with a matched frame-selection plan](https://roboskin.ai/guides/tactile-in-context-learning-tactile-eta-vs-gpt-6-astra)
-   [Inspect episode fields, timing and action conventions](https://roboskin.ai/guides/lerobot-dataset-format)
-   [Connect tactile feedback to manipulation outcomes](https://roboskin.ai/tactile-manipulation)
-   [Scope a robot-data and integration evidence review](https://roboskin.ai/research-services)

Topic 09

## How to evaluate robot-learning claims

Evaluation should make the claimed generalization axis explicit. A new object, background, instruction, robot, sensor, task, or dynamics setting tests a different kind of transfer. Combining them into one broad label hides the actual boundary.

| Question | What to record | Why it matters |
| --- | --- | --- |
| What was learned? | Policy, representation, reward, dynamics, plan, or controller role | Prevents different model roles from being ranked as if they were identical |
| What data was used? | Robots, tasks, trajectories, modalities, failures, licenses, and splits | Defines the experience available to the model |
| What changed at test time? | Object, scene, instruction, embodiment, sensor, task, or physics | Names the actual generalization claim |
| How physical was the evidence? | Replay, simulation, staged demo, repeated real-robot trials, or deployment | Separates offline performance from physical reliability |
| What happened when it failed? | Retries, resets, intervention, damage, safety stops, and recovery | Exposes operational cost and robustness |

Topic 10

## Open tooling and the 2026 ecosystem

Hugging Face describes LeRobot as an open robotics ecosystem for models, datasets, and tools. Its official v0.6.0 release expands policy evaluation and model-development workflows. These releases are useful infrastructure signals; any capability claim still needs the named policy, dataset, robot, task, and evaluation result.

Google DeepMind’s Gemini Robotics materials represent another branch of the field: models intended to connect multimodal understanding and robot action. RoboSkin.ai keeps those broad model developments connected to the narrower question of when tactile evidence improves contact-rich behavior.

Topic 11

## Collective experience learning: what does “without human corrections” remove?

The October 19, 2026 preprint by Chao Yu, Shu’ang Yu and colleagues at Tsinghua University, AgiBot and Infinigence AI names three distinct pieces: collective experience learning (CEL), the shared-policy learning paradigm; failure-guided experience retrieval fine-tuning (FERT), its algorithm; and FATS, the fault-tolerant asynchronous training system.

FERT uses observations before a failed execution ends to retrieve successful fleet segments. Their recorded actions become prioritized supervised fine-tuning targets. Compared with imitation learning from new expert demonstrations, it changes the source and selection of action supervision; it still learns by fitting successful actions.

“Without additional expert corrections” applies after expert SFT and HG-DAgger initialization. Humans still label episode outcomes and reset environments. Inputs include RGB views and proprioception, not tactile skin. This is not unattended learning.

The authors evaluate each policy/task over 120 trials split between two held-out AgiBot G2 robots. That tests other instances of the same platform, not cross-model transfer. Holding collection time per robot fixed gives larger fleets more total experience, so fleet size alone cannot explain the gains. These are author experiments, not RoboSkin tests. Source review: October 20, 2026, v1.

-   Budget initial demonstrations and corrective teleoperation separately from ongoing outcome labeling, resets, maintenance and failed-run review. Ask for operator time per successful episode before estimating labor savings.
-   Keep robot identity, policy version, outcome labels, failed-query provenance and retrieved-success provenance in the data contract. Audit retrieval quality and prevent held-out robot data from entering training.
-   To isolate a fleet-size effect, compare equal total data or interaction budgets as well as equal time per robot. Predefine task success, intervention rules and held-out instances.

-   [CEL paper v1: FERT, human supervision and evaluation protocol](https://arxiv.org/html/2610.25736v1)
-   [Learning from Fleet Experience: paper and version history](https://arxiv.org/abs/2610.25736)
-   [CEL author project page](https://cel-robot-learning.github.io/)
-   [Inspect the teleoperation data contract](https://roboskin.ai/robot-teleoperation#teleoperation-data-checklist)
-   [Compare VLA action interfaces and evidence](https://roboskin.ai/robot-vla-models)
-   [Scope a research and integration evidence review](https://roboskin.ai/research-services)

Topic 12

## DexOAK: from human hand-object motion to robot references

DexOAK (Object-Aware Kinematic Retargeting) uses structured human hand-object motion capture to produce robot wrist and joint references. Its inputs include human keypoints and object geometry, not arbitrary video or tactile sensor recordings. Contact-aware geometry is not a measured touch signal.

An interaction-graph optimizer supplies training references. A learned retargeter then generates references without solving each new frame, with contact and collision objectives refining the mapping. A separate residual reinforcement-learning stage corrects dynamics; a plausible hand pose alone is not an executable trajectory.

The authors report 46/56 successful open-loop replays on a UR5 with a right Allegro hand across Take out, Close gate, Pour, Unplug and Cut. They select the first successful simulation rollout per policy, then repeat it four times. Objects are manually reset near the simulated starting pose. This measures repeatability after selection, not end-to-end success over arbitrary human inputs; failed simulation policies can reduce the hardware denominator.

The project page shows seven tasks: the five main-table tasks plus held-out Close Laptop and Press Button, each reported at 10/12 hardware replays. Those two use a frozen retargeter but still receive task-specific RL. The seven-task showcase and five-task 46/56 total therefore describe different sets.

Reviewed October 20, 2026 against the October 19 v1 preprint and author project page. These are author experiments, not RoboSkin reproduction results. The project’s GitHub label has no repository destination and is marked pending; code, weights, release terms and runnable reproduction are unverified.

For a data-conversion decision, keep a record of what each stage adds or removes. The checklist below is editorial guidance: require evidence for the intended robot and task before budgeting a conversion pipeline, and preserve failed or rejected inputs alongside the retained trajectories.

| Handoff | What to retain | Acceptance question |
| --- | --- | --- |
| Human recording to reference | Object geometry and motion, hand keypoints, frames, units, timing and source reuse terms. | Can the target hand reach the required contacts without penetration or impossible joints? |
| Reference to simulated rollout | Reference version, robot model, dynamics assumptions, RL budget, seeds and all attempted sequences. | Does the downstream controller execute the object interaction, and how often does refinement fail? |
| Simulation to hardware replay | Selection rule, excluded policies, unique trajectories, repeat counts, resets and outcome definitions. | Is the reported result conditional on a successful simulation, and does it tolerate realistic starting-state changes? |
| Replay to reusable robot data | Commanded targets versus measured state, timestamps, observations, failures and split membership. | Can a learner consume these records without confusing reference motion with executed actions or leaking repeated trajectories across splits? |

-   [DexOAK v1: method and hardware protocol](https://arxiv.org/html/2610.26762v1)
-   [Author project: main and held-out demonstrations](https://fspinola.github.io/dexoak/)
-   [Human observations versus recorded robot actions](https://roboskin.ai/robot-teleoperation#passive-observation-vs-teleoperation-data-for-robot-learning)
-   [Check robot episode fields before conversion](https://roboskin.ai/guides/lerobot-dataset-format)
-   [Scope a robot-data evidence review](https://roboskin.ai/research-services)

Related routes

[Passive observation versus teleoperation data  Choose between video pretraining, structured handheld demonstrations and recorded robot actions.](https://roboskin.ai/robot-teleoperation#passive-observation-vs-teleoperation-data-for-robot-learning)
[AI and robotics  Place learning methods inside the complete model, robot, action, and feedback system.](https://roboskin.ai/ai-robotics)
[Robot platforms and embodiments  Separate training coverage, evaluation hardware, configuration identity, and demonstration-only evidence.](https://roboskin.ai/robots)
[Robot foundation models  Compare reusable model roles, data, embodiment transfer, access, and evidence.](https://roboskin.ai/robot-foundation-models)
[VLA robotics: models, code and tactile feedback  Place vision-language-action policies inside the broader robot-learning stack.](https://roboskin.ai/robot-vla-models)
[Robot manipulation  Connect learning methods to grasping, insertion, dexterity, and contact-rich tasks.](https://roboskin.ai/robot-manipulation)
[Tactile AI  Follow the path from touch signals to robot perception and action.](https://roboskin.ai/tactile-ai)
[Tactile datasets  Filter source-reviewed resources by robot, sensor, task, modality, and license.](https://roboskin.ai/datasets)
[Tactile benchmarks  Review tasks, protocols, metrics, baselines, and evidence boundaries.](https://roboskin.ai/benchmarks)
[Tactile foundation models  Separate reusable tactile representations, predictive models, and policies.](https://roboskin.ai/tactile-foundation-models)
[Physical AI and touch  Connect learned robot behavior to multimodal physical-world feedback.](https://roboskin.ai/physical-ai-touch)
[Humanoid robots  Map learning, control, hands, locomotion, safety, and tactile sensing.](https://roboskin.ai/humanoid-robots)
[ADEPT visuo-tactile dexterity  Review an embodiment-specific RL and sim-to-real result with a matched tactile ablation.](https://roboskin.ai/research/adept-visuo-tactile-dexterity-rl-2026)
[UniVTAC tactile simulation and learning  Trace encoder samples, policy trajectories, hosted task episodes, physical demonstrations, and evaluation rollouts as separate evidence.](https://roboskin.ai/research/univtac-platform-encoder-benchmark-2026)

Source paths

[Hugging Face LeRobot v0.6.0 \->](https://huggingface.co/blog/lerobot-release-v060)
[Hugging Face LeRobot documentation \->](https://huggingface.co/docs/lerobot/index)
[Open X-Embodiment \->](https://arxiv.org/abs/2310.08864)
[DROID robot manipulation dataset \->](https://arxiv.org/abs/2403.12945)
[Google DeepMind Gemini Robotics \->](https://deepmind.google/models/gemini-robotics/)
[ManiSkill-ViTac \->](https://arxiv.org/abs/2411.12503)
[ADEPT reinforcement-learning preprint \->](https://arxiv.org/abs/2608.19182)
[UniVTAC simulation, representation, and benchmark preprint \->](https://arxiv.org/abs/2602.10093)

Paper routes

## Start with source-backed RoboSkin briefs

[![RoboSkin.ai visual](https://roboskin.ai/generated/authority/state-of-tactile-ai-cover.webp)  Tactile AI / 2026-09-19  UniVTAC separates tactile simulation, representation learning, and policy evaluation  Choose the matching code branch and dataset before using UniVTAC. This guide separates its tactile encoder, simulation benchmark, public downloads and paper-reported physical results.](https://roboskin.ai/research/univtac-platform-encoder-benchmark-2026)
[![RoboSkin.ai visual](https://roboskin.ai/generated/authority/tactile-ai-loop.webp)  Robot learning / 2026-08-22  ADEPT reports a 3/10 to 8/10 tactile ablation on dexterous insertion  ADEPT reports 3/10 vision-only versus 8/10 visuo-tactile final success in one matched Flexiv-Sharpa insertion condition, with ten physical trials per condition.](https://roboskin.ai/research/adept-visuo-tactile-dexterity-rl-2026)
[![RoboSkin.ai visual](https://roboskin.ai/generated/authority/state-of-tactile-ai-cover.webp)  Tactile AI / 2026-08-22  HT-Bench full-hand tactile benchmark for robot manipulation  HT-Bench v2 pairs egocentric vision with millions of full-hand tactile frames, corrects the vision-to-tactile metric split, and adds four real-robot evaluations.](https://roboskin.ai/research/ht-bench-full-hand-tactile-representations-2026)
[![RoboSkin.ai visual](https://roboskin.ai/generated/authority/authority-hero-tactile-stack.webp)  Tactile Data / 2026-08-22  FreeTacMan robot-free visuo-tactile data collection for tactile AI  A research note on FreeTacMan, robot-free visuo-tactile datasets, tactile AI data collection, and why robot skin models need contact diversity.](https://roboskin.ai/research/freetacman-robot-free-visuotactile-data-collection-2025)
[![RoboSkin.ai visual](https://roboskin.ai/generated/authority/tactile-ai-loop.webp)  Tactile AI / 2026-08-15  Dream-Tac: A Unified Tactile World Action Model for Contact-Rich Robot Manipulation  Dream-Tac models action-conditioned tactile futures for contact-rich robot manipulation, showing why robot skin data needs prediction, not only reaction.](https://roboskin.ai/research/dream-tac-tactile-world-action-model-2026)
[![RoboSkin.ai visual](https://roboskin.ai/generated/authority/roboskin-index-cover.webp)  Tactile manipulation / 2026-08-22  T-Rex adds high-rate tactile reaction to dexterous robot policies  T-Rex reports a 100-hour collection and a 30-point gap over EgoScale; its official release now provides code, checkpoints, and an approximately 50-hour public subset.](https://roboskin.ai/research/t-rex-tactile-reactive-dexterous-manipulation-2026)
[![RoboSkin.ai visual](https://roboskin.ai/generated/authority/humanoid-stack-map-cover.webp)  Tactile datasets / 2026-08-22  RoboTacDex maps 6,000+ humanoid visual-tactile trajectories  RoboTacDex reports 6,000+ Unitree G1 trajectories across 19 tasks, an author-reported 23 skills, and 22 objects, but public dataset access remains pending.](https://roboskin.ai/research/robotacdex-humanoid-visual-tactile-action-dataset-2026)

Common questions

## FAQ for this topic

 01

### What is robot learning?

Robot learning uses data or experience to train robot perception, prediction, or action instead of specifying every behavior as a fixed rule.

 02

### What is the difference between imitation learning and reinforcement learning for robots?

Imitation learning learns from demonstrated behavior. Reinforcement learning improves behavior using a reward signal from interaction or simulation. Systems can combine both.

 03

### What makes a robot-learning dataset useful?

It should identify the robot, observations, actions, task context, timing, calibration, trajectory unit, collection policy, splits, access path, and license.

 04

### Why does robot learning need tactile data?

It needs tactile data when physical success depends on pressure, shear, slip, seating, deformation, or contact transitions that other sensors do not measure directly.

 05

### How should sim-to-real results be judged?

State what was trained in simulation, what was randomized or adapted, which physical robot and tasks were tested, how many trials were run, and which failures or interventions occurred.
