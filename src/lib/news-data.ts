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
    id: 'tactilelab-shear-sensitive-simulation',
    title: 'TactileLab: what simulated tactile flow adds to robot manipulation',
    seoTitle: 'TactileLab: Shear-Sensitive Tactile Simulation',
    seoDescription: 'Understand TactileLab tactile flow, its sticking-contact assumption and the sensor-transfer checks needed before using it for robot manipulation.',
    excerpt: 'The November 5 preprint connects shear-sensitive simulation with physical manipulation. Its contact assumption and sensor translation define where to test next.',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-11-08', updated: '2026-11-08', sourceDate: '2026-11-05',
    readTime: '4 min read', category: 'Tactile simulation',
    image: '/generated/authority/roboskin-index-cover.webp',
    imageAlt: 'RoboSkin research index editorial cover.',
    imageCaption: 'RoboSkin editorial illustration; not a TactileLab experiment or hardware photograph.',
    evidenceStatus: 'Preprint and project-page review. No simulator installation, policy execution or hardware reproduction by RoboSkin.',
    sourceTitle: 'TactileLab arXiv v1, November 5, 2026',
    sourceUrl: 'https://arxiv.org/abs/2611.07881v1',
    sources: [
      { title: 'TactileLab v1: methods and limitations', url: 'https://arxiv.org/html/2611.07881v1' },
      { title: 'Official TactileLab project and artifact status', url: 'https://yijionglin.github.io/tactilelab/' },
    ],
    technicalFocus: ['TactileLab', 'tactile simulation', 'simulated tactile flow', 'sim-to-real', 'dexterous manipulation'],
    content: `# TactileLab: what simulated tactile flow adds to robot manipulation

TactileLab is a November 5, 2026 preprint about learning contact-rich manipulation with simulated touch. It combines contact depth with a motion-based representation of tangential contact, then translates real sensor images into that representation. The practical question is whether the simulated observation remains meaningful on the sensor and contact conditions you intend to use.

## What the new paper establishes

The [v1 manuscript](https://arxiv.org/html/2611.07881v1) describes an IsaacLab-based, rigid-body approach to simulated tactile flow and author-run physical demonstrations of dual-arm and in-hand manipulation. Its transfer method assumes sticking contact. Abrupt disturbances or slipping can violate that assumption; the authors leave integrating slip into the simulation as an open problem. They also report poor flow recovery with markerless GelSight Mini, highlighting the need for observable tangential deformation.

The [official project page](https://yijionglin.github.io/tactilelab/) still displays code as coming soon in our November 8 review. We verified the paper separately; an outdated paper button does not mean the manuscript is unavailable. No runnable release, checkpoint or software license was verified, and RoboSkin has not reproduced the demonstrations.

## Choose an observation before choosing a simulator

RoboSkin analysis: a simulator should be selected for the decision its output supports. Contact location can help decide where to move; changing contact can help decide when to adjust a command. Neither field automatically provides a calibrated force measurement. Define the target decision and the meaning of every channel before comparing policies.

| Your experiment needs | Proposed acceptance question |
| --- | --- |
| Contact location | Does the estimated contact region track a reference interaction across different placements? |
| Tangential motion | Does the signal preserve direction when the contact moves and when the camera view changes? |
| Recovery from sliding | Can the pipeline identify loss of its sticking-contact assumption rather than treating it as ordinary deformation? |
| A new tactile sensor | Does its image stream expose the motion cue that the translator expects? |

These are our proposed checks, not published TactileLab benchmark results. A convincing rendered field is insufficient if the downstream controller receives a stale, misaligned or semantically different observation.

## Separate sensor translation from policy transfer

Evaluate the observation mapping before attributing an end-to-end failure to the policy. Keep the same recorded interaction and examine the raw sensor image, translated field, timestamps and predicted action together. A translator failure and a controller failure require different remedies.

Then reserve a separate trial group for the complete control loop. Log contact loss, recovery attempts, interventions and final outcomes. If contact changes beyond the method's documented scope, label that trial explicitly rather than silently removing it from the denominator. Match task and hardware conditions before comparing success rates with another system.

## A useful first experiment

Start with a small contact task whose success can be judged independently of the tactile image. Define a stable-contact condition and a deliberate perturbation condition. Record whether the representation remains useful in each, and keep unsuccessful trials. This makes the experiment informative even when the method does not transfer.

Once an implementation is available, pin its commit, simulator version and sensor mapping. A code link alone will not establish that those components run together. Use the [tactile manipulation guide](/tactile-manipulation#tactilelab-contact-assumption) for the contact-assumption record, and the [sensor directory](/sensors) to compare sensing interfaces. For a different, already documented simulation-data example, inspect the [DexSuite subset](/datasets#dataset-dexsuite-lift-scripted).

## Evidence boundary

This is source-based reporting plus a proposed evaluation workflow. It is not a claim of general slip robustness, calibrated shear-force accuracy or verified deployment on your robot. The useful next step is to test whether the observation contract survives your contact conditions.
`,
  },
  {
    id: 'vtam-visuo-tactile-world-action-model',
    title: 'VTAM v2: a tactile world-action model without tactile pretraining',
    seoTitle: 'VTAM v2: Tactile World-Action Model Explained',
    seoDescription: 'Read the November VTAM revision: video pretraining, task-level tactile adaptation, inference boundaries and a practical plan for comparing robot policies.',
    excerpt: 'VTAM’s November 5 revision separates video pretraining from tactile adaptation. We explain that distinction and how to assess its inference and transfer claims.',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-11-08', updated: '2026-11-08', sourceDate: '2026-11-05',
    readTime: '4 min read', category: 'Tactile world models',
    image: '/generated/authority/roboskin-index-cover.webp',
    imageAlt: 'RoboSkin research index editorial cover.',
    imageCaption: 'RoboSkin editorial illustration; not a VTAM architecture diagram or experimental result.',
    evidenceStatus: 'arXiv v2 source review; author-reported experiments. No model installation, inference or robot test by RoboSkin.',
    sourceTitle: 'VTAM arXiv v2, revised November 5, 2026',
    sourceUrl: 'https://arxiv.org/abs/2603.23481v2',
    sources: [{ title: 'VTAM v2: architecture, task protocols and ablations', url: 'https://arxiv.org/html/2603.23481v2' }],
    technicalFocus: ['VTAM', 'visuo-tactile world-action model', 'tactile pretraining', 'contact-rich manipulation', 'robot world models'],
    content: `# VTAM v2: a tactile world-action model without tactile pretraining

VTAM's November 5 revision describes a world-action model that adapts a pretrained video backbone using task demonstrations. “Without tactile pretraining” does not mean without pretrained weights, tactile observations or robot training. That distinction is the starting point for deciding whether the method fits a lab with limited contact data.

## Read the revision as a training and inference contract

The [v2 manuscript](https://arxiv.org/html/2603.23481v2) first adapts visual and tactile future prediction, then trains an action expert jointly with the backbone. A tactile optical-flow proxy provides auxiliary supervision; it is not a calibrated force sensor. At inference, the method avoids full video denoising. The authors evaluate eight simulated tasks and four physical tasks across two robot/sensor configurations. Their encoder-transfer evidence should not be read as an untouched robot policy transferring to any sensor.

The paper was first submitted on March 24; November 5 is the revision date. This article reviews v2 rather than presenting the work as a new November invention. We have not run its code, verified a reusable checkpoint or reproduced its latency measurements.

## Compare three different costs

RoboSkin analysis: a useful model comparison separates preparation, training and runtime. A method can reduce one without reducing all three. Record costs at the level where your team will incur them.

| Stage | Record before comparing |
| --- | --- |
| Preparation | Available pretrained weights, terms, sensor representation and the work needed to align demonstrations |
| Adaptation | Task examples, training hardware, optimization time and which components change |
| Runtime | Observation encoding, action generation, communication, command execution and the age of each observation |

A headline inference multiplier cannot decide whether a controller meets your loop deadline. Match hardware, precision, compilation, input resolution and action-chunk length, then time the complete path. Keep warm-up separate from steady operation and report a distribution rather than a single favorable run.

## Ask whether the policy actually uses touch

A policy accepting a tactile tensor is not proof that contact affects its action. A useful evaluation compares the same task and demonstration budget under visual-only, visual-plus-touch and controlled tactile perturbation conditions. State which weights and other inputs remain fixed; otherwise the comparison mixes changes in sensing with changes in model capacity or training.

Define what a meaningful response would look like before testing. For example, a contact change might require a pause, a small correction or a release. Inspect whether the action responds at the right time, and whether that response improves the independently judged task outcome. Attention plots can help investigate behavior, but they are not a substitute for that outcome test.

## Keep sensor transfer and robot transfer separate

An encoder can preserve useful information from a second sensor while the action policy still needs demonstrations for that robot and task. Treat those as separate experiments. Document sensor geometry, calibration, frame alignment, robot action space and task setup, then state exactly which component was reused without training.

For a first comparison, choose one task and one sensor that your lab can reproduce consistently. Keep a held-out set of contact conditions and log failures as carefully as successes. Expand to another sensor only after the original observation and action contract is stable. This isolates the adaptation work that a broad transfer claim can hide.

## Where VTAM belongs in the research map

Use the [VTAM evidence record](/robot-world-models#world-model-vtam) to inspect the prediction and action interface alongside other world models. The [VLA directory](/robot-vla-models) covers language-conditioned policy choices, while the [tactile dataset directory](/datasets) helps identify the demonstrations and reuse conditions available to you. These are different selection tasks; a model name alone does not answer all of them.

Our conclusion is a research recommendation: assess VTAM when you want to study task-level tactile adaptation of a video-pretrained system. Its reported experiments do not establish general superiority, universal sensor transfer or a production-ready robot controller.
`,
  },
  {
    id: 'touchscale-dataset-release-and-robot-learning',
    title: 'TouchScale dataset: separate the 500-hour study from available data',
    seoTitle: 'TouchScale Dataset: Release, License & Robot Use',
    seoDescription: 'Check TouchScale’s 500-hour paper against its 100-hour data card, gated access and noncommercial license before planning tactile robot learning.',
    excerpt: 'The November 2 paper revision supports a timely dataset review. The study corpus, currently described release and robot action labels require separate checks.',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-11-08', updated: '2026-11-08', sourceDate: '2026-11-02',
    readTime: '4 min read', category: 'Tactile datasets',
    image: '/generated/authority/roboskin-index-cover.webp',
    imageAlt: 'RoboSkin research index editorial cover.',
    imageCaption: 'RoboSkin editorial illustration; not a TouchScale recording or experiment.',
    evidenceStatus: 'Paper v3, public data-card page and repository metadata review. The revision-specific README required authentication. No gated payload access or training.',
    sourceTitle: 'TouchScale arXiv v3, November 2, 2026',
    sourceUrl: 'https://arxiv.org/abs/2610.10288v3',
    sources: [
      { title: 'TouchScale v3: methods and limitations', url: 'https://arxiv.org/html/2610.10288v3' },
      { title: 'TouchScale official project', url: 'https://touch-scale.github.io/' },
      { title: 'Public dataset card and access conditions', url: 'https://huggingface.co/datasets/2077AIDataFoundation/TouchScale' },
    ],
    technicalFocus: ['TouchScale dataset', 'tactile dataset', 'visual-tactile learning', 'egocentric touch', 'dataset license'],
    content: `# TouchScale dataset: separate the 500-hour study from available data

TouchScale pairs human visual observations with touch for representation and robot-learning research. Its November 2 paper revision describes a 500-hour study corpus, while the public dataset card checked on November 8 still describes a 100-hour release. Plan around the artifact you can access and inspect, not just the number in the paper title.

## What the sources currently say

The [v3 paper](https://arxiv.org/html/2610.10288v3) studies synchronized human vision and touch, with downstream robot evaluation limited to one platform and four manipulation tasks. It explicitly says the human dataset does not include action labels. Human tactile supervision and robot action supervision therefore remain different resources.

The [public data-card page](https://huggingface.co/datasets/2077AIDataFoundation/TouchScale) describes 100 hours and 15,324 episodes, labels the data CC BY-NC 4.0, and requires acceptance of access conditions. Its stated plan to release all 500 hours before November is not evidence that the full release occurred. The host API reported revision 74914cc2e11d0a7f37ddbe5d57db4fe4e14a0a7e, but the revision-specific README required authentication. We inspected public metadata only and did not accept conditions or download gated payloads.

## Make the release scope part of the experiment

RoboSkin analysis: write three separate entries in your experiment record: the paper's collection, the provider's described release and the episodes your loader actually decodes. If those quantities differ, retain all three. Replacing the paper total with a subset total can misdescribe the study; replacing the subset total with the paper total can misdescribe your training data.

| Decision | Evidence to retain |
| --- | --- |
| Can we obtain the data? | Host, access conditions, exact revision and the observed access result |
| Can we reuse it for this project? | Dataset terms and any separate code, model or asset terms |
| Can our pipeline read it? | One complete decoded episode, field meanings, timestamps and missing values |
| Can it train our policy directly? | Actual action labels or a documented additional robot-training stage |

The [TouchScale directory record](/datasets#dataset-touchscale) keeps these distinctions visible in the same comparison and export workflow used for other datasets. It is an evidence record, not a mirror of the gated files.

## Human observations are useful without being robot commands

Contact observations can support representation learning or an intermediate prediction objective. A robot policy also needs an action target that matches its embodiment and controller. Do not silently rename human motion, task descriptions or contact maps as robot actions to satisfy a loader's schema.

Before adapting a trainer, list which inputs and targets already exist and which must come from another source. Preserve the provenance of any inferred target. If robot demonstrations are added later, record their collection protocol separately; a successful run on the combined pipeline should not be attributed to the human dataset alone.

## Design a comparison that answers your question

To investigate the value of tactile supervision, hold the downstream task and evaluation conditions fixed. Compare a baseline against the additional training stage and record the data actually used. If your access covers a subset, describe that experiment as a subset experiment rather than a reproduction of the full study.

Reserve complete sessions or other appropriate collection groups for evaluation, and inspect the split for repeated interactions. Report failures and missing channels alongside successful episodes. A larger advertised corpus cannot compensate for a split that allows nearly identical observations into training and evaluation.

## What to check next

Recheck the host for a changed release manifest, pin that revision and inspect a permitted sample before scaling a download. Keep access permission distinct from license suitability; an accepted access request does not remove noncommercial restrictions.

For format preparation, use the [LeRobot dataset guide](/guides/lerobot-dataset-format) as a schema checklist, without assuming TouchScale is already a compatible robot-action dataset. For the control question, read [tactile manipulation](/tactile-manipulation). Our review establishes what the public sources state and what remains unverified, not a reproduced model result or a guaranteed transfer benefit.
`,
  },
  {
    id: 'tactus-tactile-glove-data-collection',
    title: 'Tactus tactile glove: reading the evidence before collecting robot learning data',
    seoTitle: 'Tactus Glove: Touch and Pose Data Evidence',
    seoDescription: 'Read Tactus force and pose metrics with their calibration conditions, then plan session records, causal tracking and a separate robot-transfer evaluation.',
    excerpt: 'A new sensing-glove preprint raises a practical question: what must a human demonstration record preserve before it can support contact-aware robot learning?',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-31', updated: '2026-11-04', sourceDate: '2026-10-29',
    readTime: '7 min read', category: 'Tactile data collection',
    image: '/generated/news/tactus-data-evidence.png',
    imageAlt: 'RoboSkin evaluation diagram separating contact measurement, hand pose, calibration and a later robot transfer test.',
    imageCaption: 'Original editorial evaluation framework. This is not a Tactus product image, disclosed architecture or experimental result.',
    evidenceStatus: 'Preprint and measurement-method review; no glove test, dataset download or robot-policy reproduction by RoboSkin.',
    sourceTitle: 'Tactus: Tactile & Pose Sensing Glove for Natural Dexterity Data Collection',
    sourceUrl: 'https://arxiv.org/abs/2610.39076v1',
    sources: [
      { title: 'Tactus v1: original manuscript, October 29, 2026', url: 'https://arxiv.org/html/2610.39076v1' },
      { title: 'NIST: measurement process characterization', url: 'https://www.itl.nist.gov/div898/handbook/mpc/section1/mpc1.htm' },
      { title: 'LeRobotDataset v3.0: schema and episode metadata', url: 'https://huggingface.co/docs/lerobot/lerobot-dataset-v3' },
    ],
    technicalFocus: ['tactile glove', 'capacitive tactile sensing', 'hand pose tracking', 'session calibration', 'robot learning data'],
    content: `# Tactus tactile glove: reading the evidence before collecting robot learning data

Tactus is a sensing-glove preprint from Meta Reality Labs Research, submitted on October 29, 2026. It combines capacitive touch sensing with inertial-assisted hand tracking. The useful question for robot learning is how to qualify a demonstration stream: contact measurements, hand geometry and an eventual robot action each need their own evidence.

This article separates a short source review from RoboSkin's proposed evaluation workflow. We have not used the glove or reproduced its experiments. A public dataset release, reusable implementation and commercial availability were not established by the manuscript review; a paper link should not be treated as a download or purchase route.

## The measurements that need their qualifiers

The [original manuscript](https://arxiv.org/html/2610.39076v1) reports the following. Preserve the measurement definition when comparing another system.

| Reported item | Condition that belongs beside it |
| --- | --- |
| 0.59 N minimum detectable force | 95% confidence; the fingertip force comparison used three participants |
| 11.0 mm fingertip relative error | Offline trajectory optimization with wrist translation alignment; not online absolute position accuracy |
| Session calibration | Supplements factory calibration to account for wearer and session variation |

Detection threshold, regression error and pose error answer different questions. A low detectable force does not establish equally low error across the working range. A relative hand-pose score does not establish where the hand is in a robot's world frame. These distinctions should govern the experiment before any headline number enters a procurement comparison.

## Start from the decision a recording must support

RoboSkin analysis: a demonstration can serve several purposes. A perception model might need a contact/no-contact label. A manipulation policy needs observations aligned with an action target. A retargeting pipeline needs a mapping between a human hand and a robot hand. A world-model experiment needs a defined prediction horizon and a way to test predicted outcomes. Recording more channels does not automatically satisfy all four contracts.

Write one concrete acceptance question first. For example: can a model trained on these recordings distinguish a stable hold from the beginning of an object movement on a new recording session? That question suggests what to label, which sessions to hold out and which mistakes matter. It is more assessable than asking whether a glove produces high-quality data in general.

If the intended use is imitation learning, define the action representation before collection. Human joint positions, robot joint targets and object-relative contact goals are different targets. A file containing accurate hand positions may still lack the robot commands needed by a particular trainer. Keep the recorded observations intact so a later mapping can be audited or replaced.

## Treat calibration as part of the dataset

The [NIST measurement-process framework](https://www.itl.nist.gov/div898/handbook/mpc/section1/mpc1.htm) distinguishes reference measurements, bias and variability. That is a useful starting point for a glove evaluation: ask both whether readings agree with a reference and whether that agreement survives repeated use. One accurate sample cannot answer the second question.

Our proposed collection record would attach a calibration identifier to every episode. Store the reference instrument, loading geometry, units, fitted coefficients, unloaded baseline and the times of calibration and recording. Record whether a correction was applied during acquisition or later. Preserve raw readings alongside corrected outputs where the acquisition system permits it.

Evaluate repeatability within one wearing session separately from changes after removing and replacing the glove. A fresh fit can alter the measurement conditions without changing the nominal hardware. A model trained across sessions needs to know whether a change in signal came from the object, the wearer or the calibration procedure. Treat a missing calibration record as missing evidence, not as proof that no correction was necessary.

For a small pilot, we would reserve a reference interaction at the beginning and end of each session. Inspect the residuals before pooling sessions. The acceptance limit should come from the intended task: a coarse contact detector and a force-sensitive manipulation target should not inherit the same tolerance simply because they share a sensor.

### Why two force-error tables cannot be merged

The paper uses two different calibration and comparison procedures. Section IV-A estimates pressure across the glove from per-sensor transfer functions and then applies a session correction. Section V-B compares learned, multi-channel fingertip normal-force regressors against a Nano-17 reference in lighter-force pressing trials. Their error values do not describe the same estimator, contact region or loading range. [Calibration and tactile protocols](https://arxiv.org/html/2610.39076v1).

The comparison also does not show one glove winning every metric: the authors report a slightly lower fingertip point error for JQ, while Tactus has the lower minimum detectable force. A selection decision should identify which error matters to the intended recording, rather than combine the best number from each table into a synthetic specification.

For a proposed procurement record, keep the estimator, loaded region, force range, reference, session correction and held-out grouping beside each metric. Request residuals under the intended conditions before adopting a headline threshold. The [tactile calibration guide](/guides/tactile-sensor-calibration) provides the broader distinction between a fitted mapping, repeatability and an independently checked measurement.

## Keep causal and offline pose streams separate

Offline processing can use observations that arrive after the instant being estimated. That can be appropriate for curating a demonstration, while an online controller must act using information available at its decision time. Both outputs may be useful, but they belong in separate columns with separate descriptions.

For a robot-control experiment, our recommendation is to retain the causal estimate, its timestamp and its availability time. If an offline trajectory is used as a training label, identify it as a reconstructed target. Otherwise, a model can appear to work with a signal that the deployed controller could never receive at the same moment.

Check coordinate conventions as carefully as error magnitudes. Document the wrist frame, camera frame, object frame and any robot reference frame. Store the transformations and their calibration versions. A hand articulation estimate can be internally consistent while the entire hand is displaced relative to the object. For a contact task, those failure modes should be scored separately.

## An episode contract worth checking before a large collection

The following table is a RoboSkin proposal, not the released Tactus file schema. It makes the evidence needed by a downstream team explicit.

| Field group | Proposed record | Reason to retain it |
| --- | --- | --- |
| Identity | Episode, session, glove revision and calibration ID | Prevent accidental mixing of incompatible conditions |
| Timing | Capture time, clock source, dropped samples and synchronization method | Detect lag and gaps across modalities |
| Contact | Raw signal, calibrated value, units and sensor-location map | Distinguish a measurement from a derived label |
| Pose | Coordinate frame, causal/offline flag and tracking validity | Prevent future information or frame mismatch in a controller input |
| Outcome | Independent task annotation and intervention log | Separate a successful recording from a successful manipulation |
| Split | Participant, session, object and task grouping | Evaluate the intended kind of generalization |

If exporting to LeRobot, inspect the actual schema rather than assuming that the format supplies these fields. The [v3 documentation](https://huggingface.co/docs/lerobot/lerobot-dataset-v3) describes shared Parquet and video files with episode boundaries resolved through metadata. That storage organization helps locate samples; it does not define a glove's calibration or human-to-robot mapping for you.

## Test transfer as a second experiment

Our suggested pilot has three gates. First, verify measurement integrity against a reference under the intended contact conditions. Second, train and evaluate a bounded perception task using held-out sessions or participants. Third, test whether the resulting signal improves a robot task with a matched no-touch baseline. Passing one gate should not be reported as passing the next.

Keep the robot, objects, training budget and success definition fixed in that last comparison. Include failed attempts and interventions in the denominator. A transfer result should also specify what was changed to bridge the embodiments: contact-location mapping, sensor normalization, action retargeting or additional robot demonstrations. Without that record, it is difficult to tell which part of the system produced an improvement.

For practical planning, the next useful artifact is a small, inspectable episode with its calibration and timing record. Use our [sensor task-selection guide](/sensors#human-demonstration-gloves) to define the measurement requirements, then the [tactile dataset index](/datasets) to compare available records. The companion [DexSuite data review](/news/dexsuite-tactile-simulation-lerobot-data) examines a different evidence stage: inspecting a public simulated tactile dataset before treating it as training-ready.


Evidence and editorial review: November 4, 2026. Original publication date retained.
`,
  },
  {
    id: 'dexsuite-tactile-simulation-lerobot-data',
    title: 'DexSuite brings tactile simulation to dexterous learning: what the released data contains',
    seoTitle: 'DexSuite: Tactile Simulation and LeRobot Data',
    seoDescription: 'Inspect DexSuite tactile data, action semantics and collection splits; distinguish the accessible MIT code from dataset and third-party asset licenses.',
    excerpt: 'The new DexSuite paper links simulation, teleoperation and evaluation. We inspect one public tactile subset and separate framework claims from verified file metadata.',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-31', updated: '2026-11-04', sourceDate: '2026-10-27',
    readTime: '8 min read', category: 'Simulation and datasets',
    image: '/generated/news/dexsuite-data-evidence.png',
    imageAlt: 'Editorial diagram separating a simulation framework, a benchmark and a versioned dataset with distinct verification gates.',
    imageCaption: 'Original RoboSkin.ai evidence map. Counts and performance are not encoded in this conceptual diagram; it is not a DexSuite experiment figure.',
    evidenceStatus: 'Preprint and official documentation reviewed; one pinned dataset manifest and metadata files inspected. No trajectory replay, training or hardware validation.',
    sourceTitle: 'DexSuite: An All-in-One Framework for Dexterous Manipulation Across Arms, Hands, and Tasks',
    sourceUrl: 'https://arxiv.org/abs/2610.37799v1',
    sources: [
      { title: 'DexSuite v1 paper, October 27, 2026', url: 'https://arxiv.org/html/2610.37799v1' },
      { title: 'Official DexSuite project and dataset links', url: 'https://dexsuiteorg.github.io/' },
      { title: 'DexSuite documentation reviewed October 31, 2026', url: 'https://dexsuite.readthedocs.io/en/latest/' },
      { title: 'Current source repository and software license, checked November 4', url: 'https://github.com/anashoussaini/Dexsuite' },
      { title: 'DexSuite package listing and its repository link', url: 'https://pypi.org/project/dexsuite/' },
      { title: 'Pinned scripted Lift tactile dataset card', url: 'https://huggingface.co/datasets/dexsuite/lift_franka_franka_umi_tacticle_scripted/blob/f4be6e95af40843da39cd5a88d8bd736393dd59c/README.md' },
      { title: 'Pinned dataset schema: meta/info.json', url: 'https://huggingface.co/datasets/dexsuite/lift_franka_franka_umi_tacticle_scripted/blob/f4be6e95af40843da39cd5a88d8bd736393dd59c/meta/info.json' },
      { title: 'Pinned controller action layout', url: 'https://huggingface.co/datasets/dexsuite/lift_franka_franka_umi_tacticle_scripted/blob/f4be6e95af40843da39cd5a88d8bd736393dd59c/meta/action_layout.json' },
      { title: 'LeRobotDataset v3.0 storage and episode indexing', url: 'https://huggingface.co/docs/lerobot/lerobot-dataset-v3' },
    ],
    technicalFocus: ['DexSuite', 'tactile simulation', 'LeRobot dataset', 'dexterous manipulation', 'tactile datasets'],
    content: `# DexSuite brings tactile simulation to dexterous learning: what the released data contains

DexSuite's October 27, 2026 preprint presents a Genesis-based manipulation framework connecting robot configurations, teleoperation, simulated touch and evaluation. For a team looking for a LeRobot dataset with tactile channels, the immediate opportunity is a concrete file inspection: determine which subset contains the required observations and how its recorded actions should be interpreted before starting a training run.

RoboSkin reviewed the paper and official documentation, then fetched the public manifest, dataset card and JSON metadata for one version-pinned scripted Lift subset on October 31. This is a metadata inspection. We did not download its trajectory shards or videos, execute the simulator, replay an episode, train a policy or test real hardware.

## Three scopes that should not be collapsed

The [v1 paper](https://arxiv.org/html/2610.37799v1) reports 30 framework tasks, 10 arms and 12 end-effectors. Its benchmark contains 16 task-embodiment pairs; the associated corpus contains 4,700 successful simulated episodes. Those are three different scopes: configurable environments, evaluated combinations and recorded demonstrations. None is a count of independently verified real-robot deployments.

The [official project page](https://dexsuiteorg.github.io/) separates the corpus into 700 human-teleoperated, 1,200 scripted and 2,800 machine-generated episodes. Human teleoperation here still controls a simulated robot. Preserve collection origin when assembling a training mixture; the word human does not convert a simulated contact signal into a physical measurement.

There is also a version boundary. The [documentation landing page](https://dexsuite.readthedocs.io/en/latest/) displayed 26 tasks, 16 arms and robots, and 11 end-effectors in the October 31 review. The [repository README](https://github.com/anashoussaini/Dexsuite), read November 4, advertises 31 tasks, ten arms plus six integrated robots, and eleven end-effectors. These are dated inventories with different categories, not a single fixed benchmark count. We have not enumerated an installed release; the paper's 16 evaluated task-embodiment pairs remain a separate scope.

## What we could inspect directly

The concrete dataset is [dexsuite/lift_franka_franka_umi_tacticle_scripted](https://huggingface.co/datasets/dexsuite/lift_franka_franka_umi_tacticle_scripted/tree/f4be6e95af40843da39cd5a88d8bd736393dd59c), pinned to revision f4be6e95af40843da39cd5a88d8bd736393dd59c. The spelling tacticle is part of the upstream repository identifier and is retained in the link.

Its [card](https://huggingface.co/datasets/dexsuite/lift_franka_franka_umi_tacticle_scripted/blob/f4be6e95af40843da39cd5a88d8bd736393dd59c/README.md) describes scripted successful Lift demonstrations with a Franka arm and UMI-style tactile gripper. The license metadata is Apache-2.0. That statement is scoped to this dataset card; it is not a verified license for every simulator asset, package or dataset in the wider project.

| Inspected file | Recorded value | What the inspection establishes |
| --- | --- | --- |
| meta/info.json | LeRobot v3.0; 20 Hz; 200 episodes; 15,030 frames | Declared metadata, not an independent recount of trajectory rows |
| Feature schema | Left and right force_grid arrays: 12 by 32, float32 | The named tactile feature and shape are declared |
| Feature schema | Front and wrist RGB video: 224 by 224 | Camera shape is declared; video decoding was not tested |
| meta/action_layout.json | Nine action values: seven manipulator values and two gripper values | Controller segments are explicit; the nine values are not nine robot joint angles |
| Public file manifest | Parquet data and episode metadata, JSON metadata and MP4 files | File paths exist in the listing; payload completeness remains untested |

The [action-layout file](https://huggingface.co/datasets/dexsuite/lift_franka_franka_umi_tacticle_scripted/blob/f4be6e95af40843da39cd5a88d8bd736393dd59c/meta/action_layout.json) names OSCPoseAbsoluteQuatController for the manipulator segment and JointPositionController for the gripper segment. A trainer must preserve that distinction. Matching tensor width alone is insufficient to establish matching action meaning.

## The observation-action boundary is a practical trap

The dataset card states that frame t stores the observation before action t. Its final success flag describes the transition triggered by the last action; the terminal state itself is not stored. That is a small documentation detail with a large consequence for any code that expects every action to have a following observation in the same episode.

RoboSkin analysis: do not silently pair the final action with the first observation of the next episode. Decide explicitly whether the loader drops that transition, represents the next observation as unavailable, or obtains it through a separately validated replay. A padded terminal observation may be useful to a particular model, but it should stay marked as padding rather than recorded evidence.

The [LeRobot v3 documentation](https://huggingface.co/docs/lerobot/lerobot-dataset-v3) explains that episode boundaries are reconstructed from metadata while multiple episodes share storage files. Counting Parquet files therefore cannot recover the episode count. Inspect the episode index and offsets, then check how the chosen loader resolves temporal windows near both ends of a sequence.

## Simulated tactile values need a simulation-specific interpretation

The paper describes FlexiTac-style simulated pads and says tactile observations are included in scripted tactile configurations. It does not justify assuming that every episode in every release has the same contact channels. Our file check narrows that claim to one named subset with explicit tactile features.

For an experiment, record how the simulated quantity maps to the intended input. A spatial array can support a contact-learning study without being interchangeable with an optical fingertip image or a calibrated physical force sensor. Shape compatibility is only the first check. Coordinate frame, normalization, contact law, sample timing and the controller's response all affect what a learned model can use.

Our recommendation is to begin with a channel-level inspection before a full policy comparison. Plot unloaded intervals and contact intervals, compare left and right pads, and check whether the signal changes at the same step as the relevant action and object motion. Those are proposed checks; we have not performed them on the trajectory payload in this review.

## Successful demonstrations are not a measured deployment success rate

A collection selected for successful episodes is a training resource. It cannot by itself estimate the probability of success across all attempted rollouts. That estimate needs the evaluation protocol and an attempt denominator that includes failures and interventions. Keep collection yield, training-set size and policy success in separate fields in a report.

For a fair contact ablation, we would hold the task, embodiment, visual inputs, training episodes and evaluation seeds fixed while changing access to tactile inputs. Compare the same policy family under the same compute budget. Also check whether ground-truth simulator state is available to one model but not another; a state-based baseline and an image-based policy are different observation conditions.

Keep each task's result visible before averaging. A model that improves pickup while failing release may have a different practical value from one that makes a small improvement across the entire sequence. Report the failure stage and intervention rule alongside the final success fraction. This is an evaluation design recommendation, not a new DexSuite result.

### Match the held-out unit to the claim

An episode split asks whether a policy handles new episodes from the represented collection process. A collector split asks a different question: whether behavior transfers beyond the demonstrator or policy that generated the training data. An embodiment split changes the robot and action interpretation as well. Label the intended generalization before selecting the split.

Our proposed review would list the task, embodiment, collection tier and collector revision for each group. Keep all frames from an episode together, then decide which additional groups must remain unseen. If a subset lacks the metadata needed for that separation, report the limit instead of describing a random frame split as cross-collector transfer. This is an evaluation design, not evidence that leakage occurred in the published benchmark. See the [LeRobot format guide](/guides/lerobot-dataset-format) for the separate storage and sequence-boundary checks.

## A bounded adoption sequence

First, freeze the dataset revision and the intended simulator/package version. Save the schema, action layout, card and license evidence with the experiment configuration. The repository returned 404 during our October 31 review, but the [official project](https://dexsuiteorg.github.io/) now links a readable [source repository](https://github.com/anashoussaini/Dexsuite), checked November 4. That changes its access status; it does not establish a successful installation or reproduction.

The repository's [LICENSE](https://github.com/anashoussaini/Dexsuite/blob/main/LICENSE) identifies MIT for its software. Its [third-party notice](https://github.com/anashoussaini/Dexsuite/blob/main/THIRD_PARTY_LICENSES.md) separately lists model and asset terms, including non-commercial research/education restrictions for PartNet-Mobility objects. Do not apply the software license to every scene asset or to the separately versioned dataset. This review reads the notices; it does not clear a particular commercial use.

Second, inspect one complete episode with the chosen loader. Confirm lengths, timestamps, action meanings, terminal handling and the tactile feature values. Define a held-out split by episode or the relevant collection grouping before training; random adjacent frames do not form an independent contact evaluation. The inspected metadata declares a train split covering all 200 episodes, so a research split remains an explicit experiment choice.

Third, run a small reproducibility experiment and preserve failures. Only after those checks should a team scale the training mixture or investigate physical transfer. A simulation result can guide that work, but the real robot introduces a separate sensor, controller and contact environment that must be tested.

The [DexSuite entry in our tactile dataset directory](/datasets#dataset-dexsuite-lift-scripted) now preserves this subset's format, license marker and inspection limits. Use the [benchmark guide](/benchmarks) to plan comparisons, and the [Tactus glove evidence review](/news/tactus-tactile-glove-data-collection) for the complementary problem of qualifying physical human-demonstration measurements.


Evidence and editorial review: November 4, 2026. Original publication date retained.
`,
  },
  {
    id: 'neura-neuron-ai-touch-memory-pla',
    title: 'NEURA Neuron AI: what touch, audio and memory add to robot action',
    seoTitle: 'NEURA Neuron AI: Touch, Memory and PLA Evidence',
    seoDescription: 'Review Neuron AI touch, memory and local inference claims, the dated laundry demonstration limits and practical evidence for a customer evaluation.',
    excerpt: 'NEURA presents a multisensory robot model. We separate its public claims from open research, explain memory versus learning, and outline the evidence still needed.',
    category: 'Multimodal robot learning',
    image: '/generated/news/neura-neuron-ai-touch-memory-pla.png',
    imageAlt: 'Editorial diagram separating multisensory robot inputs and temporal context from the tests needed to measure contact success, recovery and latency.',
    imageCaption: 'Original RoboSkin.ai conceptual diagram based on public claims. It is not a disclosed Neuron AI architecture, experimental result or NEURA product image.',
    sourceTitle: 'NEURA Robotics introduces Neuron AI — official announcement',
    sourceUrl: 'https://neura-robotics.com/neura-robotics-introduces-neuron-ai/',
    sources: [
      { title: 'NEURA official announcement — October 14, 2026', url: 'https://neura-robotics.com/neura-robotics-introduces-neuron-ai/' },
      { title: 'Manufacturer event recap, October 31, 2026', url: 'https://neura-robotics.com/nvidia-gtc-berlin-2026-recap/' },
      { title: 'Neuron AI official product description', url: 'https://neura-robotics.com/neuron-ai/' },
      { title: 'Background paper: OpenVLA', url: 'https://arxiv.org/abs/2406.09246' },
      { title: 'Background paper: MimicTouch', url: 'https://arxiv.org/abs/2310.16917' },
      { title: 'Background paper: DexTouch-WM', url: 'https://arxiv.org/abs/2609.20649' },
    ],
    technicalFocus: ['tactile sensing', 'multimodal robot learning', 'robot memory', 'vision-language-action'],
    sourceDate: '2026-10-14',
    evidenceStatus: 'Company announcement · no public Neuron AI paper or reproducible benchmark located in this review · related papers are independent background',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-15',
    updated: '2026-11-04',
    readTime: '8 min read',
    content: `# NEURA Neuron AI: what touch, audio and memory add to robot action

NEURA introduced Neuron AI on October 14, 2026. Its [product description](https://neura-robotics.com/neuron-ai/) presents a Perception-Language-Action, or PLA, model combining 3D vision, touch, audio, robot state and language with memory. For tactile robotics, the interesting question is whether additional observations change what a robot does when contact is hidden, ambiguous or unsuccessful.

This is an evidence review of a company announcement, not a review of a Neuron AI research paper. The original October 15 review did not locate a public Neuron AI manuscript or a reproducible comparative benchmark. A November 4 check of the official announcement, product description and October 31 event recap still leaves the methods, matched benchmark and implementation of memory unresolved in those materials. The three papers below provide independent research context; NEURA has not identified them as components of its system in the materials reviewed.

## What NEURA has announced

The [official release](https://neura-robotics.com/neura-robotics-introduces-neuron-ai/) describes training from real robot interactions, simulation-expanded data and human demonstrations, and claims operation across five robot embodiments. Customers would fine-tune skills and distribute them through Neuraverse, with optional sharing supporting later model development. NEURA emphasizes the time needed to learn a useful skill, but the announcement does not supply a matched baseline for that measure.

The [product page](https://neura-robotics.com/neuron-ai/) describes tactile and force-torque signals entering the model, temporal alignment of modalities, and inference on the robot. It does not provide the sensor-to-action latency distribution, compute specification or controlled modality ablations needed to assess those claims. Local inference alone does not establish that a contact-control deadline is met.

## Public evidence and open questions

| Evidence item | Status in this review | What would make it assessable |
| --- | --- | --- |
| Named model and multisensory design | Described by the manufacturer | Architecture, input specification and training objective |
| Neuron AI research paper | Not located in the checked materials | Public manuscript with methods and evaluation protocol |
| Reusable implementation | Code and weights not verified as released | Versioned repository, checkpoints and license |
| Performance advantage | No reproducible comparative benchmark located | Matched hardware, tasks, training budgets and attempt counts |
| Memory and adaptation | Implementation details remain unresolved | Memory horizon, reset behavior and whether weights change during use |

These are limits of the available evidence, not proof that the company lacks internal results. They also prevent an honest ranking against a named VLA model. A demonstration can establish that one sequence was executed; a performance claim needs the distribution of successes, failures and interventions across repeated attempts.

## Why touch, sound and history are different signals

RoboSkin analysis: consider a connector hidden behind a robot hand. Vision may establish the approach pose while leaving the final contact state uncertain. Touch could indicate slip or growing resistance; sound could suggest an engagement event; recent observations could preserve the target location through occlusion. Each cue answers a different question, and each can also be wrong.

A useful controller must handle disagreement. An audible click without the expected force change should not automatically count as success. Similarly, a remembered object location should lose confidence if another object may have moved it. A practical evaluation should therefore include misleading sounds, sensor dropouts and changes during occlusion, alongside clean demonstrations.

The PLA label is not itself an evaluation result. To compare systems, inspect the actual input channels, history representation, action output and control loop. Do not assume that every system described as a VLA processes only one frame or lacks robot-state inputs. Our [robot VLA guide](/robot-vla-models) provides the broader category context; [visuo-tactile manipulation](/visuo-tactile) focuses on how visual and contact evidence interact.

## Three related papers, and what each can answer

These are background readings, not Neuron AI papers or evidence of a NEURA partnership. Their published results must not be transferred to Neuron AI.

| Paper | Research contribution | Useful comparison question |
| --- | --- | --- |
| [OpenVLA](https://arxiv.org/abs/2406.09246) — first submitted June 2024 | An open, 7B vision-language-action model trained on 970,000 real robot demonstrations, with released code and checkpoints | Is the candidate system documented well enough to reproduce a task-specific baseline? |
| [MimicTouch](https://arxiv.org/abs/2310.16917) — first submitted October 2023; revised February 2025 | Uses human tactile demonstrations for imitation learning and online residual reinforcement learning to address the human-to-robot gap | Does adaptation change the policy, and what does it add beyond tactile observation alone? |
| [DexTouch-WM](https://arxiv.org/abs/2609.20649) — September 2026 preprint | Studies action-conditioned tactile world models using aligned human and robot touch data | Do better predictions translate into better closed-loop robot actions? |

[OpenVLA's paper](https://arxiv.org/abs/2406.09246) is useful as a disclosure reference: model, training data and adaptation procedures are concrete objects that another team can inspect. Its existence does not establish a fair performance comparison with a proprietary multisensory model; that still requires a shared protocol.

[MimicTouch](https://arxiv.org/abs/2310.16917) makes the learning distinction explicit by describing online residual reinforcement learning. That is a more specific claim than remembering observations. The relevant engineering questions include the adaptation budget, safe exploration constraints and evaluation on unseen objects.

[DexTouch-WM](https://arxiv.org/abs/2609.20649) provides context for combining human touch with robot data. Its reported improvements in predicting future observations should be assessed separately from downstream policy success. Our [DexTouch-WM evidence review](/research/dextouch-wm-human-touch-world-model-2026) discusses that separation in more detail. RoboSkin has not reproduced the experiments in any of these papers.

## Memory does not automatically mean online learning

A robot can maintain a history buffer or recurrent state while its model weights remain fixed. That is memory during inference. A team can also collect deployment data and train a later model version; that is an update between deployments. Online learning is a third possibility: the policy changes using new experience during operation.

Those mechanisms need different tests. For memory, vary the length of an occlusion, interrupt a task and test the reset boundary between episodes. For offline updates, compare frozen model versions on the same held-out tasks. If online adaptation is claimed, measure improvement against a no-update control and check whether previously learned skills regress. None of these outcomes follows merely from adding the word memory to a product description.

### Keep an acceptance record across resets and updates

For a proposed customer evaluation, record the model and skill version, memory reset rule and permitted data flow before the run. These three boundaries answer different questions:

| Change under review | Keep fixed | Evidence to request |
| --- | --- | --- |
| Object moves during occlusion | Model version and task | Whether remembered state is revised after contradictory observation |
| A new episode or operator begins | Model and hardware | Whether relevant history persists or is deliberately cleared |
| A fleet skill is updated | Held-out task set and scoring | Which version changed and whether earlier skills regress |

These are proposed acceptance checks, not controls NEURA has demonstrated or promised to expose. Local inference describes where an action is computed; it does not by itself establish the behavior of training, telemetry or optional data sharing. Keep those questions separate from a contact-latency test. Our [robot learning guide](/robot-learning) distinguishes demonstrations, adaptation and deployed feedback.

## A proposed touch-and-memory evaluation

The following is a RoboSkin evaluation proposal, not an experiment we have performed or a description of NEURA's test setup. It could guide a request for a vendor evaluation or a future open implementation.

Start with three bounded manipulation tasks: grasp an object after brief occlusion, seat a connector, and recover from a controlled slip. Fix the robot, objects, vision, language instructions and compute budget. Use independently verified task completion rather than the policy's own success declaration.

| Condition | Contact observations | Temporal context | Question |
| --- | --- | --- | --- |
| A | Disabled | Disabled | What can the instantaneous baseline accomplish? |
| B | Enabled | Disabled | What does touch add at the same history setting? |
| C | Disabled | Enabled | What does history add without touch? |
| D | Enabled | Enabled | Do touch and history provide complementary benefits? |

Hold audio fixed for this comparison, then test it separately with clean sound, background noise and misleading contact sounds. Train or adapt each variant comparably; simply blanking a sensor at inference can measure a distribution shift rather than the benefit of that modality. If the vendor cannot expose these controls, describe the result as a black-box system evaluation rather than an architectural ablation.

Randomize conditions and object order, reserve unseen objects, and publish every attempt, including timeouts and human recoveries. Report full-task success, peak contact force, recovery time, intervention rate and sensor-to-command latency with median and tail values. Predefine force limits and safe stop rules. For memory, include an object moved during occlusion so remembering an outdated state is not rewarded.

## What to watch at the planned demonstration

The original [October 14 announcement](https://neura-robotics.com/neura-robotics-introduces-neuron-ai/) scheduled an eleven-minute 4NE1 laundry-handling demonstration for October 20–22. It was a future event when this article was published; the following is a dated follow-up, not a new publication claim.

### November 4 follow-up: the manufacturer's event recap

NEURA's [October 31 recap](https://neura-robotics.com/nvidia-gtc-berlin-2026-recap/) reports repeated autonomous handling sequences by 4NE1 Wheels during the show. It also states that the appliances' wash and dry programs were shortened to about ten seconds for the demonstration. The approximately eleven-minute sequence therefore should not be presented as an ordinary full-duration household wash-and-dry cycle.

This is manufacturer reporting. We have not independently reviewed every run, counted all attempts or verified interventions from complete logs. The recap adds an account of the event, but does not supply the matched modality ablation or failure denominator needed to quantify Neuron AI's advantage. A customer evaluation still needs a fixed task definition, complete attempt accounting and the intended appliance conditions.

## Continue the research

- [Physical AI and touch: sensing-to-action context](/physical-ai-touch)
- [Robot world models: prediction and control](/robot-world-models)
- [Robot learning: demonstrations and policy adaptation](/robot-learning)
- [RoboSkin research index](/research)

Original source review: October 15, 2026. Official-source follow-up: November 4, 2026. Manufacturer statements, independent papers and RoboSkin's proposed tests are distinguished throughout. No affiliation with NEURA or independent validation of Neuron AI is claimed.
`,
  },
  {
    id: 'activewam-active-vision-world-action-model',
    title: 'ActiveWAM makes camera motion part of the robot action',
    seoTitle: 'ActiveWAM Unifies Camera and Bimanual Robot Actions',
    seoDescription: 'Separate ActiveWAM camera control, retained history, physical trial denominators and timing stages before evaluating active robot perception.',
    excerpt: 'ActiveWAM treats where a robot looks as part of the same action sequence as bimanual manipulation, while using transformed video histories only during training.',
    category: 'Active robot perception',
    image: '/generated/news/activewam-active-vision-world-action-model.png',
    imageAlt: 'Diagram showing camera history and task evidence flowing into a world-action model that jointly commands a pan-tilt head and two robot arms.',
    imageCaption: 'Original RoboSkin.ai schematic of ActiveWAM\'s retain-and-acquire loop. It is explanatory artwork, not an experimental image.',
    sourceTitle: 'ActiveWAM: Evidence-Aware Active Vision for World-Action Models',
    sourceUrl: 'https://arxiv.org/abs/2610.01698',
    sources: [
      { title: 'ActiveWAM arXiv v1 record', url: 'https://arxiv.org/abs/2610.01698' },
      { title: 'Full ActiveWAM v1 paper', url: 'https://arxiv.org/html/2610.01698v1' },
      { title: 'Official ActiveWAM project page', url: 'https://icr-lab.github.io/ActiveWAM/' },
    ],
    technicalFocus: ['active vision', 'world-action model', 'bimanual manipulation', 'camera control'],
    sourceDate: '2026-10-01',
    evidenceStatus: 'Preprint · arXiv v1 · 50-task simulation benchmark · 300 physical trials across five methods · current code availability unverified in November 4 review',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-04',
    updated: '2026-11-04',
    readTime: '5 min read',
    content: `# ActiveWAM makes camera motion part of the robot action

Beijing Institute of Technology researchers released ActiveWAM on October 1, 2026, a world-action model that predicts bimanual motion and a two-axis pan-tilt camera trajectory together. The central engineering question is simple: when a robot can move its eyes, can it learn where to look without losing evidence it saw a moment ago? ActiveWAM answers with a finite video history, training-time history transformations and one 16-dimensional arm-and-head action space. [Paper and version record](https://arxiv.org/abs/2610.01698).

## Key takeaways

- RoboTwin-AV extends all 50 RoboTwin 2.0 tasks with executable camera control and evaluates 100 episodes per task, seed and condition across three seeds.
- Under combined appearance and initial-camera-pose shifts, ActiveWAM reports 53.3% success versus 33.3% for Fast-WAM, a 20.0 percentage-point difference.
- On three physical kitchen sequences, ActiveWAM completes 30 of 60 trials; the system still uses prescribed stage switching and a fixed-focal-length camera.

## Retain old evidence, acquire the next view

The policy receives nine 240×320 RGB frames, robot state, camera pose, calibration and acquisition metadata. It produces two six-degree-of-freedom arm increments, two gripper commands and two camera increments. A stay command lets the camera hold a useful view rather than move continuously.

During training, a frozen Wan2.2-TI2V-5B video prior partially transforms recorded histories. Task-weighted feature preservation and temporal correspondence losses constrain the transformation so important cues and visible motion remain. The original action continuation is kept as the target. At deployment, the system uses raw camera history and does not decode a predicted future video. In other words, the video model is a co-training instrument, not a runtime visual simulator. [Method and deployment design](https://arxiv.org/html/2610.01698v1).

The authors also introduce RoboTwin-AV. Its gaze collector can use simulator-only masks and depth to create active-vision demonstrations, but those privileged inputs are withheld at evaluation. Each of the 50 tasks uses 100 successful training trajectories. Test failures and timeouts remain in the 100-episode evaluation sets.

## Results under the reported protocol

ActiveWAM reaches 80.3% in the clean RoboTwin-AV condition, 60.7% under appearance shifts, 65.0% under initial head-pose shifts and 53.3% when both shifts are applied. Fast-WAM scores 76.3%, 41.7%, 56.0% and 33.3%, respectively. Removing history inversion reduces the compound result to 41.7%, an 11.6-point gap; removing the full history reduces it to 34.0%.

The physical setup is an AirbotPlay fixed-base dual-arm platform with a RealSense D455 on a two-DoF head. Three kitchen sequences each receive 20 attempts per method: cucumber slicing, egg frying and ingredient mixing. ActiveWAM completes 7, 11 and 12 full sequences, or 30 of 60. Fast-WAM completes 1, 6 and 7, or 14 of 60. That is a 26.7-point absolute difference, but it does not represent an unattended end-to-end kitchen system: policies are separately trained for segments, transitions are prescribed, and human inter-segment actions are outside the evaluation.

## RoboSkin analysis

ActiveWAM is not a tactile system. Its value for [robot world models](/robot-world-models) is the treatment of sensing motion as an action with physical consequences. A pan-tilt camera can reacquire an occluded target, but leaving a useful view also creates a memory problem. This retain-and-acquire framing is relevant to [visuo-tactile manipulation](/visuo-tactile), where cameras and touch sensors likewise reveal different parts of a contact state over time.

The failure audit is as useful as the headline result. Of 30 failed ActiveWAM physical trials, 12 are labeled manipulation errors, 10 premature terminations, five camera field-of-view failures and three hardware issues. Moving the camera does not remove contact-control or termination problems; it changes which failures remain visible. These categories use the 30 failed trials as their denominator. They describe observed failure labels, not established root causes or percentages of all 60 attempts. [Physical protocol and failure analysis](https://arxiv.org/html/2610.01698v1).

### Choose a camera-control check that matches the task

For a proposed evaluation, record when the target and destination are both observable, how old the retained evidence is, and whether a camera move interrupts useful manipulation. More head movement is not inherently better: a stable view can be the correct sensing action.

Compare a locked camera, a declared rule-based camera strategy and the learned strategy under matched observations and task scoring. Log unsuccessful reacquisition and timeouts, not only examples where an occluded object becomes visible again. If camera reach prevents a view, report that mechanical limit separately from a policy that fails to request an available view. These are suggested checks, not an additional ActiveWAM experiment. The [visuo-tactile evaluation guide](/guides/visuo-tactile-world-models-robot-manipulation) provides the broader separation between observation quality and completed actions.

## Limitations and availability

This is an arXiv v1 preprint, and RoboSkin.ai did not reproduce the experiments. The physical evaluation uses one fixed-base platform, one camera arrangement and three composed kitchen sequences. The authors report three timing quantities that should stay separate:

| Reported timing | Stage | What it does not establish |
| --- | --- | --- |
| About 165 ms on RTX 4090 | Model action inference | A complete physical response-time distribution |
| About 15 Hz | Effective updates with action chunking | A fresh full model evaluation for every command |
| 25 Hz | Interpolated robot commands | 25 new independent visual decisions per second |

For integration, request capture, inference, command and observed-motion timestamps on a declared clock relationship. The table reports the paper's quantities; RoboSkin has not measured them. The authors report only a short history window and no automatic high-level stage transition.

The official project page displayed a “Coming Soon” code link in the original October 4 review. It could not be read during the November 4 follow-up, so that old observation is not a current release-status claim. Current training code, checkpoint and software-license availability remain unverified in this review; retain the project link for a direct check. The arXiv manuscript uses arXiv's perpetual non-exclusive distribution license.

## Sources and related resources

- [ActiveWAM v1, submitted October 1, 2026](https://arxiv.org/abs/2610.01698)
- [Full method, benchmarks and physical protocol](https://arxiv.org/html/2610.01698v1)
- [Official ActiveWAM project page](https://icr-lab.github.io/ActiveWAM/)
- [RoboSkin guide to visuo-tactile world models](/guides/visuo-tactile-world-models-robot-manipulation)


Evidence and editorial review: November 4, 2026. Original publication date retained.
`,
  },
  {
    id: 'radmcs-underwater-haptic-diver-guidance',
    title: 'RADMCS steers scuba divers with low-thrust haptic cues',
    seoTitle: 'RADMCS Tests Thruster Haptics for Scuba Divers',
    seoDescription: "Separate RADMCS cue detection, supervised wall following and ocean fit tests; review signal validity, human intervention and prototype evidence limits.",
    excerpt: 'A tank-mounted wearable robot uses two underwater thrusters as directional haptic cues, but its wall-following behavior depends on a distance estimate that failed in one documented run.',
    category: 'Wearable haptics',
    image: '/generated/news/radmcs-underwater-haptic-diver-guidance.png',
    imageAlt: 'Diagram showing two tank-mounted underwater thrusters turning a diver toward or away from a wall according to camera distance error.',
    imageCaption: 'Original RoboSkin.ai schematic of the RADMCS distance-to-thrust feedback loop. It is explanatory artwork, not an experiment photograph.',
    sourceTitle: 'Towards Physical Underwater Robotic Assistance for Scuba Diver Movement in Confined Spaces',
    sourceUrl: 'https://arxiv.org/abs/2610.01906',
    sources: [
      { title: 'RADMCS arXiv v1 record', url: 'https://arxiv.org/abs/2610.01906' },
      { title: 'Full RADMCS v1 paper', url: 'https://arxiv.org/html/2610.01906v1' },
    ],
    technicalFocus: ['underwater haptics', 'wearable robotics', 'force feedback', 'human-robot interaction'],
    sourceDate: '2026-10-01',
    evidenceStatus: 'Preprint · arXiv v1 · IRB in-water study with eight participants across different subsets · CC BY 4.0 manuscript · no code or data release verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-04',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# RADMCS steers scuba divers with low-thrust haptic cues

In an October 1, 2026 preprint, University of Minnesota researchers Demetrious T. Kutzke and Junaed Sattar describe RADMCS: a wearable underwater robot that straps to a scuba tank and uses two thrusters to cue a diver to turn toward or away from a surface. An IRB-approved study involved eight participants across several pool and ocean tests. The most stable quantitative finding is perceptual: approximately 10% of maximum thrust was enough to produce detectable motion in the tested configurations. [Paper and version record](https://arxiv.org/abs/2610.01906).

## Key takeaways

- RADMCS is a haptic navigation aid, not a propulsive exoskeleton: its thrusters perturb the diver so the diver responds with their own motion.
- Pool threshold tests use four participants split across three thruster configurations; ocean threshold tests use two participants in two configurations.
- A seven-participant pool wall-following study exposes a critical dependency: when visual distance estimation is lost, the last thrust command can persist.

## From camera distance to physical cue

RADMCS carries two Blue Robotics T200 thrusters in either longitudinal or transverse arrangements with 225 mm or 325 mm spacing. A camera estimates distance to a target surface. After exponential filtering and a dead zone, the controller maps distance error to differential thruster commands. The tested setup uses a practical sensing range of 1.5 m and clips larger errors.

The mechanism deliberately closes the loop through a person. A positive or negative thrust moment asks the diver to yaw; it does not autonomously translate the diver to a coordinate. That distinction matters for [haptic interfaces](/physical-ai-touch): the relevant output is a perceivable, directional body cue, not robot trajectory accuracy.

## What the participant study shows

Eight divers participated overall, but not every person completed every test. In the pool, two participants tested the 225 mm longitudinal and transverse layouts, while two different participants tested the 325 mm transverse layout. Facility time prevented collection for the 325 mm longitudinal configuration. Participants were neutrally buoyant at 1.8 m depth and reported when they first perceived the force during ascending and descending PWM sweeps.

Open-water threshold testing used two participants, 5 m from shore at 1.5 m depth, with both 325 mm layouts. Despite 0.25–0.5 m wave-height variation, the reported perceptible level again clustered around 10% of maximum thrust. The authors explicitly leave two explanations unresolved: divers may have confused environmental motion with robot feedback, or the device may couple strongly enough that directional cues remain distinct.

The closed-water distance-maintaining test used seven participants wearing blackout masks beside a 7 m tarp carrying AprilGrid targets at 1 m intervals. In one illustrated run, participant P2 completed the course in 89.89 s while responding to left and right cues. In the P8 example, distance estimates disappeared at about 12 s and never recovered; the controller retained a high left-turn command until the 43.28 s run ended. The paper therefore supports guided movement when the estimate is stable, not robust autonomous wall following under arbitrary underwater vision.

## RoboSkin analysis

RADMCS is a useful counterexample to the idea that more force always makes a haptic cue better. A low, detectable threshold can conserve power and reduce intrusive motion, but perception reliability becomes the dominant safety constraint. The controller needs an explicit stale-signal policy before the device can be treated as a dependable [wearable robotics](/applications) platform.

The sample structure also matters. “Eight participants” is the union of the study, not the denominator for every result. Threshold findings, wall-following examples and a form-fit test come from different subsets. Reporting those boundaries keeps a promising prototype from sounding like a validated navigation product.

## Limitations and availability

This is an arXiv v1 preprint, not an independently validated dive system, and RoboSkin.ai did not test it. The paper reports a qualitative ocean form-fit trial with one participant at up to 80% thrust. The apparatus shifted, moved regulator hoses forward and created a painful pinch point near the participant's head. Those observations are design constraints, not cosmetic issues.

Distance sensing used structured AprilGrid targets rather than natural reef geometry for the pool control study. The tarp warped in circulation currents, autofocus affected measurements, and one documented run preserved an unsafe stale command after tracking loss. The manuscript is available under CC BY 4.0. The November 4 paper review did not verify an official code repository, CAD package, dataset or software license through the reviewed sources.

## Separate cue perception from supervised navigation

The approximate 10% threshold uses the manufacturer's T200 thrust/PWM relationship at the stated supply voltage. It is not a measurement of force transmitted to the diver's skin, nor an accuracy score for identifying cue direction. Mounting, buoyancy and environmental motion affect the body response. The [full protocol](https://arxiv.org/html/2610.01906v1) also states that a safety diver accompanied the blackout-mask pool runs and intervened to prevent lateral deviation beyond one meter. A successful illustrated course therefore includes supervision; it is not an unattended navigation result.

| Evidence layer | Receiving-team review question |
| --- | --- |
| Distance observation | Was the visual estimate valid and current when each command was issued? |
| Physical cue | Was the quantity a commanded thrust, measured body load or participant-reported sensation? |
| Human response | Did the participant identify the intended direction, and how was that response recorded? |
| Navigation outcome | Which runs needed intervention, and were tracking loss and incomplete runs counted? |
| Wearable fit | Did mounting movement, hose interference or discomfort change the interpretation? |

The one-person ocean fit exercise used forward thrust for swimming assistance; it was not the seven-person pool wall-following protocol. Its much higher thrust setting cannot be combined with the perception threshold into one operating recommendation.

For a future evaluation, record observation age, command expiry, intervention and task outcome separately. A candidate stale-signal policy would need its own supervised validation; this paper does not establish a safe timeout or recovery rule. These are research-review questions, not instructions for operating a diving device. The [tactile AI evidence chain](/tactile-ai#contact-evidence-chain) distinguishes haptic output to a person from learned tactile perception and robot feedback.

## Sources and related resources

- [RADMCS v1, submitted October 1, 2026](https://arxiv.org/abs/2610.01906)
- [Full system and human-study protocol](https://arxiv.org/html/2610.01906v1)
- [RoboSkin overview of force and touch in Physical AI](/physical-ai-touch)
- [RoboSkin robot-safety resources](/robot-safety)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these systems or reproduced their experiments.*
`,
  },
  {
    id: 'humanoidtoolbench-tool-selection-mobile-execution',
    title: 'HumanoidToolBench separates tool choice from task completion',
    seoTitle: 'HumanoidToolBench Tests Tool Choice and Execution',
    seoDescription: "Read HumanoidToolBench event rates, shared-source demonstrations and action chunks correctly; separate fine-tuned hardware results from simulation.",
    excerpt: 'HumanoidToolBench tracks contact, correct selection, lifting and final success across stationary and mobile Unitree G1 tool-use tasks instead of collapsing them into one score.',
    category: 'Humanoid benchmarks',
    image: '/generated/news/humanoidtoolbench-tool-selection-mobile-execution.png',
    imageAlt: 'Diagram showing a humanoid progressing through candidate contact, correct tool selection, tool lift, target contact and task success.',
    imageCaption: "Original RoboSkin.ai schematic of recorded tool-use events. Episodes can recover from a wrong first contact; the drawing is not a strictly nested probability funnel or benchmark frame.",
    sourceTitle: 'HumanoidToolBench: Benchmarking Humanoid Tool Use from Selection to Mobile Execution',
    sourceUrl: 'https://arxiv.org/abs/2610.02089',
    sources: [
      {"title": "HumanoidToolBench evaluation and data contracts, revision 3fec9bd", "url": "https://github.com/SNU-PI/HumanoidToolBench/tree/3fec9bd36933a1648ff7f95468c983f3452243a0"},
      { title: 'HumanoidToolBench arXiv v1 record', url: 'https://arxiv.org/abs/2610.02089' },
      { title: 'Full HumanoidToolBench v1 paper', url: 'https://arxiv.org/html/2610.02089v1' },
      { title: 'Official HumanoidToolBench project', url: 'https://snu-pi.github.io/HumanoidToolBench/' },
      { title: 'Official evaluation toolkit', url: 'https://github.com/SNU-PI/HumanoidToolBench' },
    ],
    technicalFocus: ['humanoid tool use', 'robot benchmark', 'mobile manipulation', 'demonstration dataset'],
    sourceDate: '2026-10-01',
    evidenceStatus: 'Preprint · arXiv v1 · 18-task simulation benchmark · 40 reported real-robot test trials per policy · MIT evaluation code · CC BY-NC 4.0 dataset',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-04',
    updated: "2026-11-04",
    readTime: "6 min read",
    content: `# HumanoidToolBench separates tool choice from task completion

Researchers from Seoul National University, the University of Massachusetts Amherst and Google Research released HumanoidToolBench on October 1, 2026. The benchmark asks a Unitree G1 to infer which tool can accomplish a goal, grasp it and use it, sometimes while moving along a table. Its 18 tasks, 55 tool assets and 3,094-trajectory ToolBook dataset make the hand-to-object chain measurable instead of treating “tool use” as a single opaque success bit. [Paper and version record](https://arxiv.org/abs/2610.02089).

## Key takeaways

- Three scenarios—BallMove, BallRetrieve and IceBreak—combine with three execution levels and standard or decoy tool sets to form 18 conditions.
- ToolBook contains 3,003 simulation trajectories and 91 curated real-robot trajectories collected by eight experienced teleoperators.
- The released evaluation toolkit is MIT-licensed, while ToolBook is CC BY-NC 4.0 and third-party assets retain their own terms.

## An evaluation funnel for physical tool use

Each scene contains one suitable tool, two irrelevant objects and, in decoy mode, a misleading tool that differs in task-relevant length, shape, mass or compliance. Instructions describe the goal but do not name the tool. Level L0 ends when the correct tool is lifted 8 cm. L1 adds stationary execution. L2 moves the task target so the robot must locomote while carrying the tool.

The environment records five events: any candidate contact, correct first contact, correct-tool lift, tool-target contact and final success. These events help separate selection from grasping and contact execution, but they are not a strictly nested funnel: an episode can touch the wrong tool first and later lift the correct one. “Correct first contact” is still a proxy—it does not prove semantic reasoning—but it shows where a policy begins to diverge from the intended sequence.

ToolBook is built from 1,959 L1/L2 simulation attempts that yielded 1,200 successful demonstrations. The authors cut 1,803 L0 prefixes from attempts in which the correct tool was lifted, including 614 attempts that later failed. Adding 91 real L1 demonstrations gives exactly 3,094 trajectories. [Dataset construction and protocol](https://arxiv.org/html/2610.02089v1).

## What the scores reveal

Simulation evaluation uses one trained policy instance and 100 episodes per task. FastWAM's standard-mode L1 success is 76%, 57% and 86% across the three scenarios, but its mobile L2 results fall to 9%, 20% and 69%. In decoy mode, the corresponding L1 scores are 75%, 45% and 82%; L2 scores are 8%, 11% and 61%. The benchmark changes both target layout and locomotion demand at L2, so the drop cannot be attributed to walking alone.

Averaged across scenarios and L1/L2, FastWAM contacts some candidate in 99.8% of standard episodes and makes the correct tool its first contact in 87.7%, yet completes only 52.8%. Under decoys those values are 100%, 74.7% and 47.0%. Contact is easy; preserving the right grasp and applying the tool is the larger gap.

Real evaluation covers L1 BallMove and BallRetrieve, each in two modes, with ten trials per cell. GR00T N1.7 succeeds in 18 of 40 trials; FastWAM also succeeds in 18 of 40; ACT succeeds in four. Each policy first receives 5,000 additional fine-tuning updates on the 91 real demonstrations. These are small adapted, platform-specific trials, not zero-shot transfer or estimates of general humanoid tool competence.

## RoboSkin analysis

The strongest contribution is the intermediate event record. It lets researchers connect [robot-hand contact](/robot-hands) to final behavior: a policy may visually select the right object but fail at lift, maintain contact yet miss the target, or complete a stationary task and fail once whole-body motion is introduced.

Focused probes also warn against over-interpreting success. GR00T N1.7's correct first-contact rate falls from 85% to 74% on unseen BallMove tools and from 59% to 36% on BallRetrieve. In one fixed IceBreak scene, an unrelated instruction still triggers task execution in 84 of 100 rollouts, compared with 77 under the intended instruction. That is evidence of scene-policy shortcuts, not language-grounded tool reasoning.

## Availability and replication boundaries

The official repository, rechecked at revision 3fec9bd on November 4, provides the evaluation environment, recording validator and 100-episode protocol, with links to the paper's ACT and Diffusion Policy checkpoints. The maintainers report about two hours and 1 GB of outputs for one condition on their workstation GPU using the released ACT policy, roughly a day and a half and 15 GB for all 18 conditions sequentially. Other policies can take longer; this is not RoboSkin timing. Training pipelines are not included.

The paper is an arXiv v1 preprint. RoboSkin.ai inspected the published paper, project and repository but did not run the GPU benchmark or physical robot tests. Tool assets, third-party models and controller components carry separate terms; users should not infer that the dataset's non-commercial license covers every dependency.

## Use an event ledger rather than a success funnel

For a new evaluation, retain each episode's event flags and timestamps alongside final success. The reported percentages count episodes containing an event; dividing correct-tool lifts by correct first contacts does not yield a valid transition probability, because those sets can contain different episodes. Likewise, L0 and L1 use different termination rules. A successful tool lift does not predict a conditional L1 completion rate. [Protocol and analysis](https://arxiv.org/pdf/2610.02089v1).

Two less visible contracts also affect comparison:

| Contract | What to record before comparing policies |
| --- | --- |
| Demonstration identity | Parent collection attempt for each L0 prefix, full trajectory and rerendered view; related slices should not be treated as independent samples in a proposed train/test split |
| Observation and action timing | Image timestamp, inference completion, chunk length and next observation; the 50 Hz command stream does not imply 50 fresh model decisions per second |
| Robot interface | The evaluator's 32-value state and 36-value action order, rather than assuming raw joint recordings or hardware actions have the same shape |

The paper executes chunks without temporal ensembling: ACT's 100 steps span two seconds at 50 Hz, versus 0.8 seconds for GR00T's 40. That difference can change how long a policy acts before it sees a disturbed tool again. It should accompany performance comparisons, not be mistaken for measured inference latency.

The [versioned dataset guide](https://github.com/SNU-PI/HumanoidToolBench/blob/3fec9bd36933a1648ff7f95468c983f3452243a0/data/README.md) additionally distinguishes the raw 43-joint simulation observation and a 35-value hardware supervision contract. Padding a vector does not verify semantic compatibility. Code is MIT; recordings are CC BY-NC 4.0, and external assets retain their own terms. No payload download or execution was performed here. The [humanoid evaluation map](/humanoid-robots#observation-planning-control) connects these contracts to whole-body deployment questions.

## Sources and related resources

- [HumanoidToolBench v1, submitted October 1, 2026](https://arxiv.org/abs/2610.02089)
- [Full task, dataset and evaluation paper](https://arxiv.org/html/2610.02089v1)
- [Official project and result tables](https://snu-pi.github.io/HumanoidToolBench/)
- [MIT-licensed evaluation toolkit and replication requirements](https://github.com/SNU-PI/HumanoidToolBench)
- [RoboSkin robotics dataset directory](/robotics-datasets)
- [RoboSkin benchmark directory](/benchmarks)

*Source review updated November 4, 2026. Original publication dates are retained. Results are reported by the authors; RoboSkin has not run these systems.*
`,
  },
  {
    id: 'interevolve-reward-program-humanoid-manipulation',
    title: 'InterEvolve searches reward programs instead of retraining a humanoid',
    seoTitle: 'InterEvolve Searches Humanoid Reward Programs at Test Time',
    seoDescription: "Separate InterEvolve reward search, replayed latent prompts and feedback control; interpret task-family cost, fixed verification and transfer limits.",
    excerpt: 'InterEvolve uses an LLM, numerical tuning and parallel simulation to revise staged reward programs while keeping the Unitree G1 control policy fixed.',
    category: 'Humanoid loco-manipulation',
    image: '/generated/news/interevolve-reward-program-humanoid-manipulation.png',
    imageAlt: 'Diagram showing an LLM editing staged reward code, simulation verification and a frozen humanoid controller executing the selected program.',
    imageCaption: 'Original RoboSkin.ai schematic of InterEvolve\'s reward-program search loop. It is explanatory artwork, not a robot experiment frame.',
    sourceTitle: 'InterEvolve: Test-Time Evolution of Reward Programs for Humanoid Loco-Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2610.02196',
    sources: [
      { title: 'InterEvolve arXiv v1 record', url: 'https://arxiv.org/abs/2610.02196' },
      { title: 'Full InterEvolve v1 paper', url: 'https://arxiv.org/html/2610.02196v1' },
      { title: 'Official InterEvolve project page', url: 'https://sirui-xu.github.io/InterEvolve/' },
    ],
    technicalFocus: ['humanoid loco-manipulation', 'reward program search', 'test-time adaptation', 'whole-body control'],
    sourceDate: '2026-10-01',
    evidenceStatus: 'Preprint · arXiv v1 · simulation search over eight task families · physical G1 demonstrations · project videos public · no code, data or software license verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-04',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# InterEvolve searches reward programs instead of retraining a humanoid

University of Illinois Urbana-Champaign researchers released InterEvolve on October 1, 2026. The system adapts a frozen humanoid controller to new contact-rich tasks by changing the reward program that queries it, rather than updating policy weights. An LLM edits program stages, CMA-ES tunes numerical constants, and parallel simulation verifies proposals. The reported macro-average rises from 34.6% for a tuned initial agent program to 86.5% after evolution. [Paper and version record](https://arxiv.org/abs/2610.02196).

## Key takeaways

- An object-aware forward-backward behavioral foundation model turns rewards into latent prompts for one fixed Unitree G1 controller.
- Full InterEvolve reports 86.5% macro-average simulation success across eight task families. The reported 2.1 GPU-hours and 0.23 million LLM tokens cover a complete evolution run for one family, not the combined eight-family experiment.
- Real-robot demonstrations use an RGB-D camera on the robot, but perception, state estimation and policy inference run on an off-board GPU workstation.

## Evolve the interface, not the weights

The motor model starts with a frozen body prior and adds object-aware residual networks trained on retargeted OMOMO and GRAB interactions. After holding out 50 clips for each of four box-like objects, 3,866 clips remain for training. At test time, a reward is projected against a state bank into a latent prompt that elicits behavior from the fixed policy.

A reward program can contain multiple stages, completion conditions, weights and thresholds. DeepSeek-V4-Flash revises the program structure from simulator feedback, while CMA-ES calibrates constants. Each valid proposal receives 192 tuning rollouts; top candidates receive a separate 192-rollout confirmation evaluation. Verified programs become a text skill library that later tasks can retrieve. [Method, search budget and evaluation details](https://arxiv.org/html/2610.02196v1).

This is adaptation through task specification. It can expose behavior already present in the controller, but it does not manufacture a missing motor primitive. The same distinction appears in contact-rich [Physical AI](/physical-ai): better objectives can coordinate pushing, lifting and carrying only if the underlying control distribution contains usable versions of those motions.

## What improved—and what did not

Across eight large-box task families, the initial agent program with numerical tuning reaches 34.6% success. The full method reaches 86.5%. Removing CMA-ES reduces that result to 51.6%; forcing one stage reduces it to 44.7%; removing targeted edits, multi-scenario testing or scene context produces 68.9%, 68.4% and 78.7%.

The progression is not monotonically successful. Full success moves from 32.2% initially to 75.0%, 76.8%, 73.6% and finally 86.5% over four rounds. The smoother “earned criteria” metric rises every round, but a change that fixes one criterion can temporarily break another when all conditions must hold in the same rollout.

Skill-library reuse is tested on three composite tasks with ten episodes each. The full library completes 8/10 relocate, 4/10 stack and 5/10 carry-place-kick episodes. With no library those counts are 0/10, 0/10 and 1/10. These cells are small and task-specific, but they show that verified task descriptions can be reusable artifacts.

## RoboSkin analysis

The ablations make stage structure and calibration inseparable. A high-level program such as approach, grasp, carry and release is not sufficient if its thresholds do not match the robot and scene. Conversely, numerical tuning cannot repair a single-stage objective that confuses contact acquisition with task completion. This is directly relevant to [humanoid manipulation](/humanoid-robots), where each phase changes which contacts are desirable.

The 86.5% figure is a simulation macro-average, not a hardware success rate. The project page shows autonomous G1 executions, including repeated kicks, but one kick sequence uses motion-capture box pose. Other demonstrations use robot-mounted RGB-D input with off-board computation. The paper does not publish a broad table of repeated physical success counts comparable to the simulation study.

## Limitations and availability

InterEvolve spends inference-time compute on LLM calls, CMA-ES and hundreds of simulator rollouts per candidate. It does not replan reward code in real time during hardware execution. Results are bounded by the pretrained motor repertoire, reward feature bank, available scene measurements and simulator fidelity. Transfer to different objects can require manual program adaptation; unchanged large-box programs show large drops on several objects.

This is an arXiv v1 preprint, and RoboSkin.ai did not run the simulator or robot. The official project publishes explanatory material and videos. The November 4 review did not verify an official implementation, trained-controller download, dataset release or software license through that project page. The manuscript is distributed under arXiv's perpetual non-exclusive license.

## Keep reward search, prompt replay and feedback separate

Three different processes sit behind an InterEvolve hardware demonstration. The [deployment appendix](https://arxiv.org/html/2610.02196v1#A4.SS8) describes a latent sequence obtained from a simulated rollout and replayed step by step on the robot. The controller still responds to current proprioception and estimated object state. Thus replaying prompts is neither online LLM program revision nor blind playback of joint commands.

| Process | Changes during the process | What stays fixed |
| --- | --- | --- |
| Simulation search | Program stages, constants and the external text library | Pretrained controller, source bank and task-verification criteria |
| Hardware prompt replay | Which stored latent prompt is supplied at each step | The selected sequence and pretrained motor policy |
| Feedback execution | Motor output based on current robot and object estimates | Available sensing, trained repertoire and controller interface |

The verifier is critical: maximizing a reward is not enough if a robot can earn it while standing still. Independent task criteria score the actual outcome, and changing reward code must not redefine those criteria. Search and final evaluation use different scenes but the same bounded perturbation distribution; this is not an unrestricted generalization test.

For a proposed physical replication, record the prompt sequence, object mesh, pose estimator, confidence gate and timing. The paper's camera pipeline can pause when pose confidence is insufficient, and one kick demonstration uses motion capture. Geometric proximity features are not measured contact forces. Objects new to reward search may also have appeared in motor pretraining, so record novelty at both stages. These distinctions fit the [humanoid observation-to-control map](/humanoid-robots#observation-planning-control) and prevent the simulated 86.5% result or one-family compute budget from becoming a hardware capability claim.

## Sources and related resources

- [ASPIRE simulation setup and evaluation boundaries](/guides/aspire-libero-pro-setup)
- [InterEvolve v1, submitted October 1, 2026](https://arxiv.org/abs/2610.02196)
- [Full architecture, ablations and deployment details](https://arxiv.org/html/2610.02196v1)
- [Official InterEvolve project page and videos](https://sirui-xu.github.io/InterEvolve/)
- [RoboSkin humanoid robotics overview](/humanoid-robots)
- [RoboSkin robot learning resources](/robot-learning)

*Source review updated November 4, 2026. Original publication dates are retained. Results are reported by the authors; RoboSkin has not run these systems.*
`,
  },
  {
    id: 'reactive-humanoid-multi-contact-hand-bracing',
    title: "Reactive multi-contact planning selects a humanoid hand brace in about 10 ms",
    seoTitle: "Humanoid Hand Bracing: Planner Time vs Physical Recovery",
    seoDescription: "Distinguish 9.7 ms hand-contact planning from motion, touchdown detection and recovery; review modeled stability and the limited hardware comparison.",
    excerpt: 'A two-stage planner previews reachable hand contacts with a learned post-impact stability model, letting a humanoid brace against nearby surfaces before foot-only recovery fails.',
    category: 'Humanoid contact control',
    image: '/generated/news/reactive-humanoid-multi-contact-hand-bracing.png',
    imageAlt: 'Diagram showing a pushed humanoid comparing nearby wall contacts and selecting a hand brace with the largest recovery region.',
    imageCaption: 'Original RoboSkin.ai schematic of learned-stability hand-contact planning. It is explanatory artwork, not an experimental photograph.',
    sourceTitle: 'Reactive Humanoid Multi-Contact Using Learned Stability Models',
    sourceUrl: 'https://arxiv.org/abs/2610.00823',
    sources: [
      { title: 'Reactive Multi-Contact arXiv v1 record', url: 'https://arxiv.org/abs/2610.00823' },
      { title: 'Full Reactive Multi-Contact v1 paper', url: 'https://arxiv.org/html/2610.00823v1' },
    ],
    technicalFocus: ['humanoid hand contacts', 'push recovery', 'learned stability model', 'reactive bracing'],
    sourceDate: '2026-09-30',
    evidenceStatus: 'Preprint · arXiv v1 · simulation impulse search · 32 alternating hardware pushes · no code or dataset release verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-03',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# Reactive multi-contact planning selects a humanoid hand brace in about 10 ms

Researchers at the Florida Institute for Human and Machine Cognition and the University of West Florida released a reactive humanoid contact planner on September 30, 2026. Instead of asking the feet to absorb every push, it samples reachable hand contacts on nearby surfaces and estimates which brace will provide the most post-impact control. The learned stability approximation reduces a 388 ms numerical planning path to 9.7 ms in the authors’ benchmark. [Paper and version record](https://arxiv.org/abs/2610.00823).

## Key takeaways

- The planner first chooses a surface region, then a point inside that region, using predicted Center of Pressure control authority after hand impact.
- Three simulation scenarios show average impulse resilience gains of 89% over foot-only recovery and 17% over choosing the closest reachable brace.
- Hardware evidence covers 32 alternating pushes: two standing protocols with ten pushes each and one walking protocol with twelve pushes.

## From reachable wall to useful brace

The problem is not merely finding a wall. A reachable point can place the arm in a configuration with little capacity to redirect the whole-body load. The system therefore rolls a reduced centroidal model through pre-impact, impact and post-impact phases. Candidate points are scored by the size and direction of the feasible post-impact Center of Pressure region.

Computing that region from inverse kinematics and linear programs for every candidate would increase planning time. The reported comparison concerns this computation, not the entire physical response. The paper trains separate neural networks for five foot-and-hand contact permutations. Their inputs include planar contact geometry, center-of-mass position and robot posture summaries; their 18-dimensional output approximates the feasible region. Per-rollout region computation falls from 0.65 ms to 0.13 ms and avoids a reported 13 ms inverse-kinematics solve. With 14 rollouts per side, the full comparison is 9.7 ms for the learned path versus 388 ms for numerical optimization. [Model and planner details](https://arxiv.org/html/2610.00823v1).

## Results under the reported conditions

In simulation, maximum sustainable impulses are reported for standing, sideways walking and backward walking. Foot-only recovery handles 15.6, 17.7 and 23.0 N·s. The closest-contact baseline reaches 25.8, 36.4 and 26.6 N·s, while optimized bracing reaches 29.4, 42.3 and 32.1 N·s. Recomputing each relative gain gives an average 89.0% over no brace and 16.9% over the naive brace, consistent with the rounded abstract values.

The hardware study alternates baseline and optimized trials rather than measuring a calibrated external impulse. The authors use capture-point-error slope at push time as a proxy and report less than 5% variation between the paired datasets. In the ten-push multi-surface standing test, choosing a front wall instead of the nearer slanted surface reduces average recovery time by 57%. In a second ten-push standing test, shifting one hand about 12 cm along a wall reduces it by 29%. Averaging those two reported reductions produces the abstract’s 43% standing figure. In twelve walking pushes, hand bracing reaches high stability in 316 ms versus 384 ms without hand contact, an 18% reduction. The walking baseline consists of pushes that did not trigger replanning; it is not a randomized, force-matched intervention comparison.

## RoboSkin analysis

The engineering contribution is a contact-selection layer between perception and whole-body control. It does not add tactile skin, but it makes surface contact an active recovery resource: geometry decides where contact is possible, and the stability model estimates what that contact can do. That makes the work relevant to [humanoid robot contact design](/humanoid-robots) and to teams connecting [Physical AI touch](/physical-ai-touch) with [robot safety](/robot-safety).

The benchmark also shows why “nearest reachable” is a weak policy. In the sideways simulation there is only one surface, yet moving the contact by 14.9 cm improves impulse resilience by 16%. Contact placement, not just contact availability, changes the recovery envelope.

## Limitations and availability

This is an arXiv v1 preprint, and RoboSkin.ai has not reproduced the results. The learned models receive only partial information about the full robot configuration; reported feasible-region RMSE ranges from 0.89 to 2.62 cm across contact modes. The controller relies on reduced-order dynamics, does not directly measure hardware push magnitude, and observed only about 55 ms of hand contact in the walking test. The paper identifies contact-detection latency and unmodeled arm momentum after release as open issues.

The arXiv manuscript is available under CC BY 4.0. No official project page, implementation repository, training data, model weights or software license was verified, so the publication should not be read as a reproducible software release.

## Measure the full path from disturbance to confirmed support

A fast contact choice can still be followed by stale geometry, arm travel or delayed touchdown recognition. In the [reported implementation](https://arxiv.org/html/2610.00823v1), planar regions come from depth processing at 30 Hz. Replanning also requires a disturbance threshold and a minimum three-second interval between plans. The 9.7 ms computation therefore does not describe a continuously refreshed 100 Hz physical reflex.

| Stage | Distinct evidence needed |
| --- | --- |
| Surface observation | Geometry timestamp, occlusion and assumed surface properties |
| Contact selection | Planning duration and whether a new plan was actually triggered |
| Arm motion | Command-to-touchdown time and tracking error |
| Support confirmation | Detection rule and time; this study infers contact from hand position and velocity relative to the plane |
| Recovery and release | Whole-body error through contact and after the arm leaves the surface |

The paper's geometric contact detector is not tactile force feedback. Its brief walking contact and tracking effects after release show why a planner benchmark cannot substitute for the remaining measurements. Similarly, a centimeter-scale region RMSE is an average prediction error under sampled configurations, not a bound on every possible disturbance.

For an integration review, keep assumed friction, impact model, contact geometry and controller limits with each result. A surface being reachable does not establish its ability to bear the intended load. The [humanoid evidence map](/humanoid-robots#observation-planning-control) helps separate these questions without turning this research into a certified recovery or safety system.

## Sources and related resources

- [Reactive Humanoid Multi-Contact v1, submitted September 30, 2026](https://arxiv.org/abs/2610.00823)
- [Full planning, simulation and hardware protocol](https://arxiv.org/html/2610.00823v1)
- [RoboSkin guide to tactile feedback for Physical AI](/guides/tactile-feedback-for-physical-ai)

*Source review updated November 4, 2026. Original publication dates are retained. Results are reported by the authors; RoboSkin has not run these systems.*
`,
  },
  {
    id: 'continual-6dof-grasp-synthesis-memory',
    title: 'Continual 6-DoF grasping learns from outcomes without weight updates',
    seoTitle: 'Continual 6-DoF Grasping Uses Outcome Memory',
    seoDescription: "Assess memory-based grasp adaptation, outcome labels and recall budgets; separate sequential tests, merged memories and the current public code release.",
    excerpt: 'A memory-based grasp pipeline turns successes, failures and optional demonstrations into immediate proposal and score changes instead of repeatedly fine-tuning a network.',
    category: 'Adaptive robot grasping',
    image: '/generated/news/continual-6dof-grasp-synthesis-memory.png',
    imageAlt: 'Diagram showing grasp attempts feeding outcome memory and demonstration memory before the robot selects a new six-degree-of-freedom grasp.',
    imageCaption: 'Original RoboSkin.ai schematic of outcome-scored and demonstration-recalled grasp adaptation. It is explanatory artwork, not an experimental figure.',
    sourceTitle: 'Continual Learning for 6-DoF Grasp Synthesis via Experience and Demonstrations',
    sourceUrl: 'https://arxiv.org/abs/2610.01301',
    sources: [
      { title: 'Continual 6-DoF Grasping arXiv v1 record', url: 'https://arxiv.org/abs/2610.01301' },
      { title: 'Full Continual 6-DoF Grasping v1 paper', url: 'https://arxiv.org/html/2610.01301v1' },
      { title: 'Official Continual 6-DoF Grasping project', url: 'https://giuschio.github.io/cl_grasping/' },
    ],
    technicalFocus: ['continual grasp learning', '6-DoF grasp synthesis', 'outcome memory', 'demonstration recall'],
    sourceDate: '2026-10-01',
    evidenceStatus: "CoRL 2026 paper · arXiv v1 · public benchmark/model documentation and MIT code licenses reviewed · no payload or execution verified",
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-03',
    updated: "2026-11-04",
    readTime: "6 min read",
    content: `# Continual 6-DoF grasping learns from outcomes without weight updates

ETH Zurich researchers released a continual-learning system for single-view 6-DoF grasp synthesis on October 1, 2026. The CoRL 2026 paper keeps its neural encoder fixed after deployment. Successful and failed grasps update a local memory-based score, while optional user demonstrations contribute new candidates through geometric registration. The evaluation includes more than 1,500 physical grasp attempts. [Paper and version record](https://arxiv.org/abs/2610.01301).

## Key takeaways

- A 32-dimensional geometric embedding lets nearby successes and failures update a Beta posterior for each proposed grasp without backpropagation.
- A second memory registers demonstrated grasps onto similar object regions, adding candidates that fixed contact-normal or top-down heuristics miss.
- After at most 50 adaptation attempts per category, the system exceeds 90% grasp success in five of six physical object groups, but reaches only 68.3% on pliers.

## How the two memories change grasping

The base system follows a sample-and-score pipeline. It builds grasp candidates from a partial point cloud, encodes a local patch around each candidate and ranks the candidates before collision checking. Deployment outcomes are automatically labeled from gripper width and written to scoring memory. At the next scene, nearby memory entries adjust the estimated success probability rather than changing the encoder weights.

Demonstration recall addresses a different failure. If the geometric sampler never proposes the needed pose, better scoring cannot recover it. The user can provide a grasp, which is stored with local shape descriptors and later transferred to geometrically similar regions. This division is important: outcome memory refines selection among available candidates; demonstration memory expands the candidate set. [Method and evaluation protocol](https://arxiv.org/html/2610.01301v1).

## Simulation and physical evidence

The main category-wise simulation comparison uses 443 unseen objects across ten categories, with 2,500 attempts per category for the base and full adaptation methods. Before online adaptation, the proposed base averages 94.6%, compared with 92.9% for EdgeGraspNet. Category-specific full adaptation raises the average to 98.1%; scoring-only reaches 97.1%, while recall-only reaches 85.6%. That ablation suggests the non-parametric scorer drives most average improvement, while recall remains useful for missing proposal modes.

The physical setup uses a Franka Panda, parallel-jaw gripper and RealSense D435i. Fifty-four objects form one 13-object control set and five challenge groups: mugs and bowls, kitchen tools, pliers, screwdrivers and toys. Each category has 20 fixed evaluation scenes per method. Because scenes contain multiple objects, the number of attempts varies with how quickly a method clears a scene; “more than 1,500” is therefore the supported total, not a uniform trials-per-cell claim.

After at most 50 adaptation attempts and a demonstration after each failure, success moves from 80.0% to 93.2% on controls, 92.7% to 100% on mugs and bowls, 77.4% to 91.3% on kitchen tools, 62.5% to 68.3% on pliers, 85.7% to 96.0% on screwdrivers and 83.6% to 94.4% on toys. A merged memory evaluated on 20 mixed scenes reaches 89.6% grasp success and clears all scenes, versus 72.4% success and 85.0% scene clearance for the base model.

## RoboSkin analysis

The most useful result is not the five “over 90%” categories in isolation. Pliers expose what local geometry cannot resolve: one instance needs a strategy that conflicts with the others, so pooled evidence favors the majority and repeatedly fails the exception. This is a practical warning for [robot grasp learning](/robot-learning): a memory can adapt immediately, but only if its similarity space separates the states that demand different contact strategies.

The work also separates contact proposal from contact evaluation, a useful design pattern for [robot hands](/robot-hands). Failures caused by low friction or uneven mass can update scores; failures caused by missing depth geometry may require a demonstrated pose or another sensor. Teams working on [slip-aware robot hands](/guides/slip-detection-robot-hand) should not treat a binary gripper-width label as a substitute for direct slip or force observations.

## Limitations and availability

The experiments use one parallel-jaw platform and geometry-only observations. Reflective, transparent and metallic surfaces can corrupt depth, and memory cannot recover geometry absent from the input. Recall workload grows with demonstrations under a fixed time budget; the reported sequential simulation memory ends at 1.35 MB, which is not total system memory. Larger deployments would need to measure the resulting recall tradeoff. The study focuses on difficult object categories rather than systematic variation in sensor noise or contact dynamics.

The November 4 review found that the official project now links public [benchmark code](https://github.com/giuschio/graspcl-benchmark-public/tree/3a77d13e2774e39beb4b8468c9e6b25bb429244c) and [model code](https://github.com/giuschio/graspcl-model-public/tree/a70396107067d3894624b359107b17470cbb97ef), both carrying MIT software licenses. Their READMEs describe simulation and Panda integration, and link base/adapted modules and synthetic training data. Those external payloads were not downloaded or verified here; third-party object assets and submodules require their own checks. Source documentation is available, but RoboSkin has not executed the code or reproduced the experiments.

## Version the memory as carefully as the neural checkpoint

A frozen encoder does not make the deployed behavior fixed. Outcome memory changes candidate scores, while demonstration memory can introduce a previously absent grasp. The weighted Beta update uses similarity-weighted evidence and source-dependent weighting; its score should not be treated as a calibrated probability of safe completion. A demonstrated pose can also receive a positive label without an executed success. [Scoring, recall and evaluation appendices](https://arxiv.org/html/2610.01301v1).

| Evidence layer | What a receiving team should retain |
| --- | --- |
| Observation and label | Point cloud, gripper-width outcome, label origin and any independently observed slip or failed lift |
| Adaptation state | Encoder revision, offline memory, accumulated outcomes and demonstrated poses |
| Evaluation boundary | Whether feedback was permitted, which object instances were held out and when memory was frozen |
| Search budget | Candidate source, recall budget, missed registrations and time spent per demonstration |

The sequential simulation visits ten categories in one order. The mixed-scene hardware result instead merges independently adapted category memories. Both are useful, but the latter does not test uninterrupted lifelong adaptation on a physical robot. Report those protocols separately when evaluating forgetting or conflicting examples.

The implementation also trades recall coverage for bounded time: a fixed recall budget is divided among stored demonstrations. Increasing memory can therefore reduce search time per item even without increasing the total runtime. Record missed proposals as well as failed executions; a higher score cannot rescue a grasp that was never generated.

The public model README specifies a Panda-specific grasp-center frame, rather than the robot flange, and separates base from adapted modules. A different gripper requires more than changing a width value. The [robot-learning adaptation checklist](/robot-learning#learning-change-contract) keeps memory changes, parameter updates and runtime conditioning distinct. When direct contact observations are needed, compare the measured signals and access boundaries in the [tactile dataset directory](/datasets).

## Sources and related resources

- [Continual 6-DoF Grasping v1, submitted October 1, 2026](https://arxiv.org/abs/2610.01301)
- [Full method, tables and limitations](https://arxiv.org/html/2610.01301v1)
- [Official project page and videos](https://giuschio.github.io/cl_grasping/)
- [RoboSkin tactile manipulation overview](/tactile-manipulation)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these research systems or robot experiments.*
`,
  },
  {
    id: 'jfm-rigid-soft-finger-jacobian-flow',
    title: 'JFM learns a resolution-consistent Jacobian for a rigid-soft finger',
    seoTitle: 'JFM Models a Tendon-Driven Rigid-Soft Finger',
    seoDescription: "Assess JFM’s data splits, clock pairing and inverse-command test; resolution-consistent prediction is distinct from physical closed-loop validation.",
    excerpt: "Jacobian Flow Matching models tendon-to-joint sensitivity as a continuous field and reduces sampling-dependent prediction error on the authors’ recorded finger trajectories.",
    category: 'Soft robotic hands',
    image: '/generated/news/jfm-rigid-soft-finger-jacobian-flow.png',
    imageAlt: 'Diagram showing tendon commands entering a continuous Jacobian field and producing consistent finger-joint motion at dense and sparse sampling intervals.',
    imageCaption: 'Original RoboSkin.ai schematic of resolution-consistent Jacobian flow for a rigid-soft finger. It is explanatory artwork, not an experimental figure.',
    sourceTitle: 'Learning a Resolution-Consistent Jacobian Field for Bio-Inspired Rigid-Soft Finger',
    sourceUrl: 'https://arxiv.org/abs/2610.01668',
    sources: [
      { title: 'Rigid-Soft Finger JFM arXiv v1 record', url: 'https://arxiv.org/abs/2610.01668' },
      { title: 'Full Rigid-Soft Finger JFM v1 paper', url: 'https://arxiv.org/html/2610.01668v1' },
    ],
    technicalFocus: ['rigid-soft finger', 'Jacobian flow matching', 'tendon-driven actuation', 'proprioceptive modeling'],
    sourceDate: '2026-10-01',
    evidenceStatus: 'Preprint under journal review · arXiv v1 · one physical finger · about 10,000 samples · open-loop validation only · no code or data release verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-03',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# JFM learns a resolution-consistent Jacobian for a rigid-soft finger

Researchers in China released Jacobian Flow Matching (JFM) on October 1, 2026 for modeling a tendon-driven, rigid-soft robotic finger. The method learns actuator-to-joint sensitivity as a continuous field rather than a pointwise mapping tied to one sampling interval. On the authors’ finger, it reduces average single-step RMSE by more than 53% and keeps multi-step predictions more stable when observations become sparse. [Paper and version record](https://arxiv.org/abs/2610.01668).

## Key takeaways

- The finger combines 3D-printed phalanges, PTFE-coated joint interfaces, a silicone capsule with woven ligaments and a tendon transmission network.
- The collection totals about 10,000 physical samples, split 80/10/10 for training, validation and testing, with hand pose at 45 Hz and servo state at 55 Hz aligned by nearest timestamps.
- The reported results validate prediction and open-loop command recovery; closed-loop ODE control, multi-finger coordination and out-of-plane motion remain future work.

## Why a point Jacobian is not enough

Rigid-soft fingers are difficult to model because the same tendon command can produce different motion depending on pose, friction, backlash, hysteresis and viscoelastic state. A discrete learned Jacobian can fit observed endpoints at one controller rate yet behave unpredictably when an optimizer queries intermediate states or a slower sensor produces larger steps.

JFM normalizes each observed transition into a unit-time flow. Conditional Flow Matching supplies intermediate states between the start and end poses, and a consistency loss discourages the network from depending mainly on the starting anchor. The learned field can then serve either a single pointwise update or an ODE rollout that subdivides a command. The paper compares the training objectives with matched TinyTransformer and LSTM backbones and evaluates pointwise and ODE inference separately. [Architecture and physical data pipeline](https://arxiv.org/html/2610.01668v1).

## What the numbers establish

For single-step servo-to-angle prediction, JFM reduces global average RMSE by 57.27% with the TinyTransformer and 53.68% with the LSTM. Under the 0.015 RMSE threshold, 96.2% of TinyTransformer JFM samples qualify versus 77.9% for its baseline; the LSTM comparison is 96.1% versus 78.8%. These are distribution-level results across three joints, not a task success rate.

Resolution tests use 160 held-out trajectories. At stride 1, pointwise and integrated predictions are close. At stride 8, ODE inference reduces median RMSE by 14.43% and variance by 24.87% relative to the pointwise mode. This supports the specific claim that the field remains useful when a transition is subdivided or samples are skipped.

An open-loop inverse test optimizes tendon commands for target joint motion. It reports overall RMSE 1.4151, mean angular error −0.2576° and standard deviation 1.39°. The model smooths abrupt commands to zero at hard stops because those boundary conditions are not explicit in its continuous field. Pointwise inference takes about 3.5 ms per query on the reported workstation, but the paper does not report a closed-loop ODE controller running on hardware.

## RoboSkin analysis

The paper addresses a quiet integration problem for [robot hands](/robot-hands): perception and control rarely run at identical, perfectly stable rates. A model that changes behavior when the update interval changes can make calibration results misleading. JFM’s value is therefore less about another predictor score and more about a testable consistency condition across controller resolutions.

The recorded signals are proprioceptive, including glove-based finger orientation and servo state, not tactile measurements. Contact, friction and material effects are absorbed as disturbances within the training distribution rather than measured explicitly. For teams combining compliant mechanisms with [robot-hand tactile sensors](/applications/robot-hand-tactile-sensor), the next question is whether direct contact observations improve the field or reveal regimes where a local first-order model breaks down.

## Limitations and availability

Evidence comes from one finger, flexion motion and one hardware/data pipeline. The method assumes mechanical characteristics change slowly within a trial. It has not been directly validated on pneumatic hands, silicone hands, multi-finger coordination or out-of-plane motion. Sparse-sampling results are open-loop prediction tests, and the inverse test does not demonstrate closed-loop task completion.

The manuscript is an arXiv v1 preprint under review at Robotics and Autonomous Systems. It describes ROS 2 bags converted to HDF5, but no public dataset URL, code repository, model checkpoint, CAD package or implementation license was verified. The arXiv page itself does not grant rights to an absent implementation.

## Separate interpolation, inference timing and physical validation

JFM normalizes an observed transition into a unit interval. Its intermediate training states and integrated queries are model constructions, not newly measured high-rate finger motion or an independently calibrated instantaneous physical Jacobian. Likewise, evaluating strides of 1, 4 and 8 on held-out recorded trajectories tests sampling consistency; it does not test arbitrary communication delays or a replacement mechanism. [Method and evaluation details](https://arxiv.org/html/2610.01668v1).

Three checks matter before incorporating this field into a controller:

- **Data independence:** identify the split unit and keep complete capture sequences, sessions or replacement-hardware trials together as appropriate. The reported sample split alone does not establish generalization to a new day, person or finger.
- **Timing and units:** inspect nearest-timestamp pairing between the glove and servo streams; record query mode, solver work and the age of the observations. A pointwise query time excludes the rest of a physical control loop.
- **Executed motion:** distinguish reconstructing recorded tendon commands from applying them and measuring tracking, hard-stop behavior and contact under a new load. The inverse test reported here supplies the former, not closed-loop task completion.

These are proposed follow-up checks. Retain separate angular-error and physical-task criteria, and repeat calibration when tendon tension or contact mechanics changes. A useful motion model can support [gripper integration](/robot-grippers#contact-evidence), but does not itself supply contact sensing, a force limit or grasp reliability.

## Sources and related resources

- [Rigid-Soft Finger JFM v1, submitted October 1, 2026](https://arxiv.org/abs/2610.01668)
- [Full method, data details and evaluation](https://arxiv.org/html/2610.01668v1)
- [RoboSkin tactile sensor calibration guide](/guides/tactile-sensor-calibration)
- [RoboSkin robot manipulation hub](/robot-manipulation)

*Source review updated November 4, 2026. Original publication dates are retained. Experiments are attributed to their authors; RoboSkin did not reproduce the hardware, execute the models or inspect downloaded experimental payloads.*
`,
  },
  {
    id: 'skelewam-sparse-skeleton-world-action-model',
    title: 'SkeleWAM compresses manipulation into a sparse 3D skeleton',
    seoTitle: 'SkeleWAM Uses Sparse 3D Skeletons for Manipulation',
    seoDescription: "Separate SkeleWAM training supervision, action consensus and measured outcomes; inspect landmark calibration, executed horizons and layout failures.",
    excerpt: 'SkeleWAM replaces visual-future reconstruction with robot joints, object centers and interaction points, using future geometry as training-only supervision.',
    category: 'Robot world models',
    image: '/generated/news/skelewam-sparse-skeleton-world-action-model.png',
    imageAlt: 'Diagram showing RGB-D observations converted to a sparse three-dimensional skeleton of robot joints, object centers and interaction points before action generation.',
    imageCaption: 'Original RoboSkin.ai schematic of SkeleWAM’s sparse geometric state. It is explanatory artwork, not an experimental figure.',
    sourceTitle: 'SkeleWAM: Skeleton World-Action Modeling for Efficient Robotic Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2610.02120',
    sources: [
      { title: 'SkeleWAM arXiv v1 record', url: 'https://arxiv.org/abs/2610.02120' },
      { title: 'Full SkeleWAM v1 paper', url: 'https://arxiv.org/html/2610.02120v1' },
      { title: 'Official SkeleWAM project', url: 'https://skelewam-project.github.io/' },
    ],
    technicalFocus: ['world action model', 'sparse 3D skeleton', 'interaction points', 'robot manipulation'],
    sourceDate: '2026-10-01',
    evidenceStatus: 'Preprint · arXiv v1 · 10,030 LIBERO-Plus variants · 100 physical trials per evaluated method · project demos public · no code release verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-03',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# SkeleWAM compresses manipulation into a sparse 3D skeleton

Peking University researchers released SkeleWAM on October 1, 2026, asking whether a world action model needs to predict pixels at all. The model converts RGB-D observations and robot proprioception into a sparse 3D skeleton of robot joints, object centers and interaction points. It jointly learns actions and future skeletons during training, then removes the future-prediction branch at inference. [Paper and version record](https://arxiv.org/abs/2610.02120).

## Key takeaways

- The RGB-D model has about 57.1 million parameters and reports 85.9% on 10,030 LIBERO-Plus perturbation variants, 3.7 points above the compared Cosmos-Policy result.
- Removing future-skeleton supervision reduces success from 85.9% to 80.1%, even though both variants use the same action-only inference path.
- On five ARX R5 tasks with 20 trials each, SkeleWAM records 89/100 successes; the margin over Cosmos-Policy is two percentage points.

## A geometry-first world state

Many world action models predict a future video or a latent produced by a visual encoder. Those targets can preserve appearance that is unrelated to control while leaving contact geometry implicit. SkeleWAM instead builds object centers and manipulation-relevant interaction points from RGB-D, adds robot keypoints from forward kinematics and expresses them in a shared robot-centric frame.

A shared world expert processes the current skeleton and language. Separate flow-matching heads predict a 32-step action chunk and eight future skeleton states. The future head is training-only. At inference, Medoid Action Consensus samples three trajectories, compares their first ten motion steps and executes the representative candidate rather than averaging possibly incompatible actions. The default controller executes 16 actions before rebuilding the skeleton. [Architecture and ablations](https://arxiv.org/html/2610.02120v1).

## Results and comparison boundaries

The main simulation benchmark covers seven perturbation categories. SkeleWAM reaches 93.4% under camera changes, 71.9% for robot initial-state changes, 89.1% for language, 94.7% for lighting, 96.0% for background, 93.9% for noise and 66.6% for layout, averaging 85.9%. Cosmos-Policy reports 82.2% overall and 75.8% for camera perturbations. However, π0.5 reaches 84.1% on layout changes versus SkeleWAM’s 66.6%; sparse geometry does not eliminate spatial-generalization failures.

The privileged sim-state skeleton reaches 87.7%, only 1.8 points above RGB-D overall, but still only 69.0% on layout. That indicates perception error is not the sole cause of the layout weakness. The policy itself must generalize to different spatial arrangements.

Physical evaluation uses an ARX R5 with external and wrist-mounted RealSense cameras. Across Open Drawer, Close Drawer, Stack Blocks, Stack Bowls and Put Block in Drawer, SkeleWAM reports 80%, 90%, 90%, 95% and 90%, respectively—89 successes across 100 trials. Cosmos-Policy totals 87/100, Fast-WAM 83/100 and π0.5 76/100 under the authors’ setup. This is a useful hardware check, but the two-success margin over Cosmos-Policy is small and no confidence interval is supplied.

## RoboSkin analysis

SkeleWAM’s editorially important result is the ablation, not only the leaderboard. Centers alone score 82.3%; interaction points alone score 77.7%; combining them scores 85.9%. Static location and task-relevant contact geometry carry complementary information. That is a practical design clue for [robot world models](/robot-world-models) and [contact-rich manipulation](/robot-manipulation): a compact state should preserve both where an object is and where the policy can act on it.

The system is not tactile. Interaction points are inferred from RGB-D rather than measured through touch. A [visuo-tactile world model](/guides/visuo-tactile-world-models-robot-manipulation) could use the skeleton as a geometric backbone while adding force, slip or contact-state evidence that cameras cannot recover under occlusion.

## Limitations and availability

The manuscript is an arXiv v1 preprint, and RoboSkin.ai has not reproduced it. Training and evaluation use one RTX 4090 in the reported implementation, but training time and end-to-end control latency are not given. Hardware evidence covers one arm, five tabletop tasks and 20 trials per task. The benchmark’s strongest weakness is layout change, and the real-world comparison is too small to establish broad superiority.

The official project provides figures, result tables and recorded demonstrations. The November 4 project review did not verify an implementation repository, checkpoint, training dataset, perception model package or software license. The paper is posted under CC BY-NC-ND 4.0, which covers the manuscript rather than establishing terms for implementation assets.

## Action consensus is not a contact or outcome check

Three sampled trajectories can agree and still be wrong about the object. MAC selects a representative motion; it does not simulate and score each candidate's physical consequence. The future-skeleton branch is removed at deployment, and the training attention design keeps action and future branches from attending to each other. Thus the method should not be presented as an online counterfactual planner. [Architecture and MAC protocol](https://arxiv.org/html/2610.02120v1).

| Interface | What to verify in a proposed integration |
| --- | --- |
| Landmark construction | Camera calibration, shared frame, node identity/order and behavior when a point is missing or occluded |
| Consensus selection | Normalization and which motion coordinates enter the distance; agreement does not establish grasp retention |
| Executed prefix | Sixteen executed steps versus the ten-step comparison window; record the next actual observation |
| Physical confirmation | Measured object/task outcome after the action, rather than confidence inferred from sample agreement |

Sampling and replanning are not monotonic performance knobs. The reported ablation peaks at three candidates rather than five or ten. Executing five steps before replanning also scores below the sixteen-step default. Those results are setup-specific, but they rule out a simple claim that more sampling or more frequent replanning always improves performance.

For a new object, retain the RGB-D estimate, landmark identities and action prefix with the outcome. A proposed test should include occlusion and a changed layout, since the privileged-state comparison still struggles with layout changes. Geometric point proximity is not measured force, slip or successful contact. The [world-model interface comparison](/robot-world-models#prediction-runtime-contracts) separates this training-only prediction role from online tactile forecasts and action scoring.

## Sources and related resources

- [SkeleWAM v1, submitted October 1, 2026](https://arxiv.org/abs/2610.02120)
- [Full methods, benchmark and hardware tables](https://arxiv.org/html/2610.02120v1)
- [Official project page and recorded demonstrations](https://skelewam-project.github.io/)
- [RoboSkin guide to tactile world models](/guides/visuo-tactile-world-models-robot-manipulation)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these models or robot experiments.*
`,
  },
  {
    id: 'tacdyn-wam-implicit-tactile-dynamics',
    title: 'TacDyn-WAM predicts contact dynamics without generating future touch pixels',
    seoTitle: 'TacDyn-WAM Predicts Implicit Tactile Dynamics',
    seoDescription: "Read TacDyn-WAM single-pass prediction, cached tactile context and action-chunk timing; distinguish per-task data from pretrained backbone dependencies.",
    excerpt: 'TacDyn-WAM separates visual futures from implicit tactile dynamics, replacing iterative tactile-pixel generation with a contact-aware latent target.',
    category: 'Tactile world models',
    image: '/generated/news/tacdyn-wam-implicit-tactile-dynamics.png',
    imageAlt: 'Diagram showing camera and tactile clips entering separate future-prediction experts before guiding a robot action policy.',
    imageCaption: 'Original RoboSkin.ai schematic of TacDyn-WAM\'s separate visual and tactile prediction paths. It is explanatory artwork, not an experimental figure.',
    sourceTitle: 'TacDyn-WAM: Learning Implicit Tactile Dynamics in a Heterogeneous Visuo-Tactile World Action Model',
    sourceUrl: 'https://arxiv.org/abs/2610.00638',
    sources: [
      { title: 'TacDyn-WAM arXiv v1 record', url: 'https://arxiv.org/abs/2610.00638' },
      { title: 'Full TacDyn-WAM v1 paper', url: 'https://arxiv.org/html/2610.00638v1' },
      { title: 'Official TacDyn-WAM project', url: 'https://enyi-bean.github.io/TacDyn-WAM-Page/' },
    ],
    technicalFocus: ['tactile world action model', 'implicit contact dynamics', 'visuo-tactile manipulation', 'UniVTAC'],
    sourceDate: '2026-09-30',
    evidenceStatus: 'Preprint · arXiv v1 · eight-task simulation benchmark · 100 physical trials per evaluated policy · project videos public · code coming soon',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-02',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# TacDyn-WAM predicts contact dynamics without generating future touch pixels

Researchers led by Tsinghua University's Institute for AI Industry Research released TacDyn-WAM on September 30, 2026. The world action model predicts how contact representations will evolve instead of reconstructing future tactile images through iterative denoising. It reports 81.5% average success on eight UniVTAC tasks using the benchmark demonstrations, then 71.0% across five physical tasks without its extra pretraining stage and 85.0% with that stage. [Paper and version record](https://arxiv.org/abs/2610.00638).

## Key takeaways

- TacRep learns a tactile target space from four-frame clips; an Implicit Tactile Dynamics Expert predicts future representations and their changes at several horizons in one forward pass.
- A separate read-only tactile memory describes current contact. The action expert can therefore use both present touch and a forecast of contact evolution.
- The real-robot study uses five tasks, 60 demonstrations per task and 20 trials per policy per task. The reported 85.0% is 85 successes per 100 trials when the published per-task percentages are summed.

## What changed

Most tactile world models inherit a video-generation objective. That preserves spatial detail, but the target can be brittle: a small shift in contact location may alter many tactile pixels even when the physical trend—deepening, sliding or rotating—remains predictable. TacDyn-WAM assigns vision and touch different target spaces. A visual expert predicts future visual latents, while the tactile expert predicts TacRep features and feature changes. Joint attention lets the two experts exchange information without forcing touch into a camera-oriented reconstruction space. [Architecture and training stages](https://arxiv.org/html/2610.00638v1).

The tactile loss covers 49 patches per sensor and upweights patches whose representation changes more. A compact understanding path also compresses a frozen AnyTouch2 encoding into ten tokens. The model is trained in stages: tactile representation learning, tactile-world grounding, tactile–action alignment and joint training.

## Results under the reported conditions

On UniVTAC, each of eight tasks is evaluated with 100 rollouts. TacDyn-WAM averages 81.5%. The paper groups the 83.1% N0-VTLA and 84.5% N0-TWAM results separately because those systems use large-scale visuo-tactile trajectory pretraining. TacDyn-WAM uses the provided per-task demonstrations for this comparison; it is therefore close in outcome, but not evidence that the systems have equal training cost or generality.

Ablations give the clearest evidence for the target design. Replacing TacRep with the base model's reconstruction-oriented Cosmos VAE reduces the average to 62.0%; a static DINOv2 target reaches 74.0%. Removing the tactile world model gives 67.9%, while removing current-state tactile memory gives 71.3%. These are absolute percentage-point comparisons within the authors' common protocol.

For hardware tests, a Franka Research 3 uses Xense sensors on both gripper fingers plus wrist and third-person cameras. Across Stack Cups, Remove Plug, Insert Plug, Unscrew Cup Lid and Wipe Whiteboard, the variant without extra visuo-tactile trajectory pretraining records 71/100 successes. Pretraining on a 6,000-trajectory OmniViTac subset, with the 300 task demonstrations also used in early stages, raises the total to 85/100. On one A100, the paper reports 484 ms for a 50-action chunk versus 1,338 ms for an optimized 40-action LingBot-VA chunk; that is a system-specific latency comparison, not a universal real-time guarantee.

## RoboSkin analysis

The useful engineering idea is not simply “latent is faster.” Contact images can be visually different while encoding the same corrective direction. A dynamics-aware target can focus capacity on what the controller needs next. That makes TacDyn-WAM relevant to [visuo-tactile world models](/guides/visuo-tactile-world-models-robot-manipulation) and to teams designing a [tactile manipulation](/tactile-manipulation) loop with distinct perception and action timescales.

The benchmark comparison also needs care. The 81.5% simulation average trails the full N0 models, and the physical gains come from one vision-based tactile sensor family. The paper explicitly leaves force sensors and taxel arrays for future work. Cross-sensor robustness is therefore unproven.

## Limitations and availability

TacDyn-WAM is an arXiv v1 preprint and RoboSkin.ai has not reproduced the results. Hardware evidence covers one parallel gripper, five tasks and randomized but laboratory-controlled starts. The official project publishes tables and a downloadable demo video, and still labels code “coming soon” in the November 4 review; no public training code, weights, real-robot dataset or implementation license was verified. The paper's arXiv license does not supply those missing rights.

## Single-pass touch prediction is not single-pass robot feedback

The tactile expert avoids iterative tactile-image generation, but the complete policy still denoises actions over ten steps. Its latent dynamics and current-touch memory are computed for the observation/chunk, then reused during action generation. Reusing that representation does not inject a newly measured contact after every generated command. [Implementation and timing protocol](https://arxiv.org/html/2610.00638v1).

| Quantity | Meaning in the reported implementation | What it does not measure |
| --- | --- | --- |
| 484 ms | Median of thirty warmed input-tensor-to-GPU-chunk runs on an A100 | Complete sensor-to-motion delay, startup or communication |
| Fifty actions | Generated chunk length | Fifty new tactile observations |
| Thirty-two actions | Hardware prefix executed before another query | A universally specified contact-feedback frequency |
| About 9.7 ms per action | Chunk time divided by fifty | The time until a changed contact can influence a new action |

The training-data label also needs precision. Using only benchmark demonstrations for task training does not mean training every component from scratch: the system builds on pretrained visual, tactile and generative components. The additional hardware pretraining stage includes target-task demonstrations before later per-task fine-tuning, so its improvement is not evidence of transfer to unseen target tasks.

For a reproduction, first document the sensor preprocessing and target-data access. Xense difference images and simulated raw tactile backgrounds use different normalization paths; copying a subtraction step across them can change the input. Then compare complete task sets and matched checkpoints: some published baseline means omit unreported tasks, while the paper's controlled ablations answer a narrower question. The [runtime comparison](/robot-world-models#prediction-runtime-contracts) provides the corresponding observation-age and executed-prefix checks.

## Sources and related resources

- [TacDyn-WAM v1, submitted September 30, 2026](https://arxiv.org/abs/2610.00638)
- [Full methods, ablations, latency and physical protocol](https://arxiv.org/html/2610.00638v1)
- [Official project and result tables](https://enyi-bean.github.io/TacDyn-WAM-Page/)
- [RoboSkin robot world models guide](/robot-world-models)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these models or robot experiments.*
`,
  },
  {
    id: 'touchtherm-tactile-thermal-digital-twins',
    title: 'TouchTherm gives digital twins tactile texture and cooling dynamics',
    seoTitle: 'TouchTherm Builds Tactile-Thermal Digital Twins',
    seoDescription: "Distinguish TouchTherm tactile rendering from collision mechanics and cooling from contact heat transfer; review calibration and held-out evidence.",
    excerpt: 'TouchTherm augments coarse collision meshes with registered tactile micro-height fields and time-varying surface temperature for multimodal simulation.',
    category: 'Tactile simulation',
    image: '/generated/news/touchtherm-tactile-thermal-digital-twins.png',
    imageAlt: 'Diagram of a scanned object carrying separate collision mesh, tactile microtexture and time-varying thermal field layers.',
    imageCaption: 'Original RoboSkin.ai schematic of a TouchTherm-style multimodal object asset. It is explanatory artwork, not an experimental figure.',
    sourceTitle: 'TouchTherm: Building Multimodal Digital Twins of Objects for Tactile and Thermal Rendering',
    sourceUrl: 'https://arxiv.org/abs/2610.01943',
    sources: [
      { title: 'TouchTherm arXiv v1 record', url: 'https://arxiv.org/abs/2610.01943' },
      { title: 'Full TouchTherm v1 paper', url: 'https://arxiv.org/html/2610.01943v1' },
      { title: 'Official anonymous TouchTherm project', url: 'https://anonymous-research1.github.io/' },
    ],
    technicalFocus: ['tactile simulation', 'thermal rendering', 'digital twins', 'GelSight microgeometry'],
    sourceDate: '2026-10-01',
    evidenceStatus: 'Preprint · arXiv v1 · 20 reconstructed objects · tactile, thermal and VR demonstrations · code and object assets promised after acceptance',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-02',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# TouchTherm gives digital twins tactile texture and cooling dynamics

ShanghaiTech University researchers released TouchTherm on October 1, 2026. The pipeline turns a physical object into a simulation asset with three registered layers: a coarse visual/collision mesh, local micro-height fields for optical tactile rendering and a dynamic surface-temperature field. Tests cover 20 objects, with held-out 30- and 45-second thermal predictions and synthetic-to-real tactile recognition. [Paper and version record](https://arxiv.org/abs/2610.01943).

## Key takeaways

- Structured-light geometry handles object shape and collision, while photometric-stereo normals recover contact-scale relief without making the collision mesh extremely dense.
- Multiview infrared videos record natural cooling after controlled heating. A physics-regularized model identifies surface diffusion and ambient relaxation, then a graph-based rollout advances the temperature field.
- TouchTherm raises synthetic-to-real Top-1 object recognition from 20.0% to 34.0% in the reported setup, an absolute gain of 14.0 percentage points, but the classifier uses only 20 object classes.

## From a scan to a multisensory asset

The acquisition stack combines an EinScan Pro 2X V2 structured-light scanner, smartphone image stacks under varied illumination, HIKMICRO P09 thermal cameras and a GelSight Mini for validation and per-object amplitude calibration. Normal maps are registered to the coarse mesh, transformed into a local tangent frame and integrated into micro-height residuals. At contact time, the renderer combines those residuals with coarse indentation. [Full reconstruction method](https://arxiv.org/html/2610.01943v1).

For temperature, multiple cameras observe a heated object cooling. The method fuses visible measurements onto surface points, represents spatial connectivity with a graph operator and fits two physical parameters. The network helps reconstruct unobserved regions and identify the parameters; runtime rollout retains the graph and coefficients rather than the neural field.

## Results under the reported conditions

The tactile comparison uses three contacts per object across 20 objects. Its tactile ablation reports mean G-SSIM/HF-NCC scores of 0.0701/0.0911, versus 0.0480/0.0116 for coarse geometry and 0.0629/0.0081 for direct image-space height integration. Real-to-real repeatability is higher than real-to-sim similarity, so the result supports an improvement over those two renderers, not photorealistic equivalence to a physical sensor.

Thermal evaluation uses a separate 60-second training capture for each object's parameters and 15 overlapping test windows per object: 300 windows at each horizon. Surface-temperature MAE is 0.465 °C at 30 seconds and 0.592 °C at 45 seconds. Removing ambient relaxation increases MAE to 0.820 °C and 1.083 °C; removing surface diffusion changes the headline MAE little, which the authors interpret as ambient exchange driving global cooling while diffusion adds smaller local gains.

For recognition, a ResNet-18 trains on 90 simulated contacts per object and validates on ten. Six seeds use identical contact configurations. One hundred real images calibrate the renderer globally; a separate 20 real images per object are held out for evaluation, and no real image trains the classifier. Top-1/Top-3/Macro-F1 improve from 20.0/35.0/13.4% with coarse geometry to 34.0/63.0/29.3% with TouchTherm. A separate VR demo with ten participants reports perception and comfort ratings, but it is a small usability demonstration rather than a robotics task benchmark.

## RoboSkin analysis

TouchTherm moves tactile simulation from “object mesh plus sensor model” toward an object-side contact asset. That separation matters: the geometry needed for stable collision can stay coarse while the [vision-based tactile sensor](/sensors/gelsight-mini) queries finer surface relief. Temperature adds another field that could support material-aware teleoperation or [Physical AI touch data](/physical-ai-touch), although no temperature-conditioned robot policy is evaluated.

The half-day-per-object estimate for each acquisition modality is also an integration warning. Scaling beyond 20 objects requires automation of manual illumination, 2D–3D correspondences, heat excitation and calibration. The paper demonstrates a pipeline, not a ready-made large catalog.

## Limitations and availability

TouchTherm is an arXiv v1 preprint under double-anonymous review, and RoboSkin.ai has not reproduced it. Manual registration and one-time per-object GelSight amplitude calibration remain in the workflow. Recognition uses one optical tactile sensor style; thermal feedback is demonstrated in VR rather than on a robot controller.

The official project exposes videos and method descriptions. It states that code, reconstructed object assets and the simulation pipeline will be released upon acceptance. The November 4 review found the same future-release statement; no downloadable archive, repository, dataset license or software license was verified through that page. The paper itself uses arXiv's perpetual non-exclusive license, which is not an implementation license.

## Validate appearance, mechanics and heat transfer separately

A better-looking tactile image does not establish better friction or deformation mechanics. In TouchTherm, the fine micro-height layer changes rendered tactile appearance while the coarse mesh remains responsible for collision. Similarly, the fitted cooling field models surface evolution under the observed conditions; it does not implement bidirectional heat exchange between an object and a touching sensor. [Method and limitations](https://arxiv.org/html/2610.01943v1).

| Asset layer | Evidence supplied | Separate test needed for a new application |
| --- | --- | --- |
| Coarse geometry | Registered object shape and collision surface | Contact geometry and mechanical response under the intended load |
| Micro-height field | Improved optical tactile appearance and object recognition | Whether texture-dependent friction or slip behavior is represented |
| Thermal field | Held-out natural-cooling surface temperatures | Temperature changes caused by actual sensor contact and heat exchange |

The real-data budget must include reconstruction and calibration. No real image trains the recognition classifier, but real measurements build the object assets, set per-object tactile amplitude and calibrate rendering color. Synthetic classifier training therefore does not mean zero real acquisition effort.

Metric alignment is another boundary. Tactile similarity permits a bounded rotation and translation alignment before scoring, so it is not a direct test of raw pose-registration accuracy. The thermal test windows overlap within the same objects; three hundred windows are not three hundred independent objects or physical trials.

For a proposed robot study, retain acquisition/calibration revisions and choose a downstream measurement that matches the intended use: tactile recognition, slip response or contact heating. None can be substituted for another merely because they share one digital asset. The [world-model map](/robot-world-models#prediction-runtime-contracts) places this rendering pipeline separately from an action policy.

## Sources and related resources

- [TouchTherm v1, submitted October 1, 2026](https://arxiv.org/abs/2610.01943)
- [Full 20-object tactile and thermal evaluation](https://arxiv.org/html/2610.01943v1)
- [Official project and demonstrations](https://anonymous-research1.github.io/)
- [RoboSkin tactile sensor guide](/guides/tactile-sensor-for-robots)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these models or robot experiments.*
`,
  },
  {
    id: 'ditto-x-reverse-dexterous-teleoperation',
    title: 'DITTO-X makes a robot hand align the operator before takeover',
    seoTitle: 'DITTO-X Adds Reverse Dexterous Teleoperation',
    seoDescription: "Review DITTO-X takeover signals, per-hand feedback, six-user study and successful-intervention selection; distinguish reported episodes from verified downloads.",
    excerpt: 'DITTO-X runs an actuated hand exoskeleton in both directions, rendering robot contact to a human and matching the operator to the robot before intervention.',
    category: 'Haptic teleoperation',
    image: '/generated/news/ditto-x-reverse-dexterous-teleoperation.png',
    imageAlt: 'Diagram showing bidirectional control between a dexterous robot hand and an actuated human hand exoskeleton during policy takeover.',
    imageCaption: 'Original RoboSkin.ai schematic of DITTO-X bidirectional authority transfer. It is explanatory artwork, not an experimental image.',
    sourceTitle: 'DITTO-X: Forward and Reverse Teleoperation for Dexterous Manipulation and Human Intervention',
    sourceUrl: 'https://arxiv.org/abs/2610.00781',
    sources: [
      { title: 'DITTO-X arXiv v1 record', url: 'https://arxiv.org/abs/2610.00781' },
      { title: 'Full DITTO-X v1 paper', url: 'https://arxiv.org/html/2610.00781v1' },
      { title: 'Official DITTO-X project', url: 'https://tml.stanford.edu/ditto-x/' },
    ],
    technicalFocus: ['haptic teleoperation', 'dexterous hands', 'human intervention', 'DAgger'],
    sourceDate: '2026-09-30',
    evidenceStatus: "Preprint · v1 · six-person study · hand-dependent feedback · project artifact links still pending at November 4 source check",
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-02',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# DITTO-X makes a robot hand align the operator before takeover

Stanford and Columbia researchers released DITTO-X on September 30, 2026. The actuated exoskeleton sends a person's finger motion to three commercial dexterous hands, renders hand-dependent force and contact feedback, and can reverse direction so the operator follows the robot's commanded finger configuration before control transfers. In a six-person study, that matched takeover improved a contact-rich tool-use intervention from 27.7% to 78.3% success against a tracking-glove baseline. [Paper and version record](https://arxiv.org/abs/2610.00781).

## Key takeaways

- Forward teleoperation renders hand-dependent force feedback. The evaluated Sharpa configuration also supplies fingertip vibration; that contact-event channel is not listed for Wuji 2 or Inspire.
- Reverse teleoperation maps the robot's commanded hand configuration back to the exoskeleton before takeover, reducing the pose jump that can release a held object.
- The project describes 1,888 episodes and more than 16 hours at 30 Hz, but its Code, Dataset and Hardware Guide controls all still say “coming soon.”

## How bidirectional control works

DITTO-X aligns actuator axes with human finger joints. Index and middle fingers can map joint-to-joint on the 22-DoF Sharpa and 20-DoF Wuji 2 hands. Thumb motion is retargeted in task space, and the six-DoF Inspire hand receives a lower-dimensional flexion mapping. The exoskeleton independently tracks thumb, index and middle fingers; robot ring and little fingers are coupled to the middle-finger motion. Feedback differs by hand: Table I lists contact-event vibration for Sharpa only. Motor-current-derived torque is an estimate, not a measured surface pressure map. [Hardware and mapping details](https://arxiv.org/html/2610.00781v1).

During autonomous execution, the robot's current command is projected back onto the exoskeleton. A keyboard request initiates the takeover process; actual transfer is gated by departure of the human joints from the independently maintained projection. Following the command does not prove that the physical robot achieved that pose. Safety measures reported by the authors include software joint limits, motor-current limits below 200 mA with torque no greater than 0.08 N·m, and an emergency stop.

## Results under the reported conditions

Six participants completed blinded size and compliance discrimination, regular tool-use teleoperation and mid-policy intervention. With both feedback modes, size discrimination is 86.1% and compliance discrimination 91.7%, against 33.3% chance. Removing either force or vibration reduces the scores; the experiment supports complementarity within this prototype, not a universal ranking of haptic modalities.

For collecting tong-use demonstrations, DITTO-X succeeds on 70.0% of trials versus 46.7% for the Manus Pro tracking glove, a 23.3-point gap. Mean time per success falls from 85.5 to 56.1 seconds. In intervention, success is 78.3% versus 27.7%, while time per success falls from 97.4 to 35.7 seconds. The size/compliance tasks use six trials per condition per participant; tool-use and intervention protocols specify ten. These are repeated measurements from six people. The project reports intervention success as a mean of participant rates, not a pooled numerator out of 60. Intervention begins with the tool already grasped, whereas full collection includes acquiring it.

Policy tests use 30 paired starting configurations per task. Before DAgger, DITTO-X data produces final-stage success of 63.3% on tong use, 63.3% on raspberry placement and 40.0% on battery insertion; Manus data yields 13.3%, 43.3% and 36.7%. After two DAgger rounds retaining 20 successful interventions per round, the DITTO-X policies reach 86.7%, 93.3% and 90.0%. The paper also quantity-matches extra demonstrations. Failed interventions are excluded from training; the policies encounter interface-specific failure states. This comparison addresses data volume but does not isolate every cause of the interface advantage.

## RoboSkin analysis

The most important change is at the authority boundary. Conventional human intervention switches the controller, but the operator may begin with fingers in a different pose from the robot. With a dexterous hand already holding a tool or fragile object, that mismatch is itself a disturbance. DITTO-X treats body alignment as part of [robot teleoperation](/robot-teleoperation), while force and contact feedback give the operator evidence that cameras can lose under occlusion.

The interface also shows why haptics should be evaluated downstream. Better blind discrimination is useful, but the stronger evidence is that contact-aware demonstrations produce better autonomous policies and that matched interventions cover failure states. This connects human feedback to the broader [robot learning](/robot-learning) pipeline.

## Limitations and availability

DITTO-X is an arXiv v1 preprint and RoboSkin.ai has not reproduced its hardware or results. The main user study has six participants, most policy experiments use the Sharpa hand, and mappings still require known hand kinematics and per-hand scaling. The design is not demonstrated on full-body teleoperation or unknown hands.

The official page says it releases the DITTO-Human Dataset: 847 teleoperated, 379 human-intervened and 662 autonomous episodes, totaling 1,888. The October 2 check found Code, Dataset and Hardware Guide controls marked coming soon. The November 4 project HTML and scripts still expose those controls without working artifact links. No downloadable episodes, repository or license was verified. The paper's CC BY-NC-ND 4.0 license does not license absent code or hardware files.

## What must an intervention log preserve?

A takeover request and an executed takeover are separate events. For a pilot on another hand, preserve the policy command, measured robot joints, projected human configuration, measured operator joints, request time and actual authority change. Record which feedback channels the operator received. Otherwise a smooth video cannot show whether an alignment delay, tracking error or missing cue caused a failure.

The [study protocol](https://arxiv.org/html/2610.00781v1) also separates the six-person interface experiment from policy data collected by one proficient operator. Policy evaluations use 30 paired initial states per task, including at least ten out-of-distribution placements. Wuji and Inspire demonstrate additional hand mappings, but their DAgger evaluations remain future work. Prototype current limits and an emergency stop do not constitute a safety certification.

For the next collection campaign, retain attempted, accepted and discarded corrections with reasons. Evaluate a frozen policy on independently specified starts, and report operator assistance separately. This is a proposed collection record, not a claim that RoboSkin has validated DITTO-X hardware. The [teleoperation signal-role comparison](/robot-teleoperation#contact-signal-roles) explains why operator haptics and policy tactile observations need different fields.

## Sources and related resources

- [DITTO-X v1, submitted September 30, 2026](https://arxiv.org/abs/2610.00781)
- [Full user study, policy evaluation and safety details](https://arxiv.org/html/2610.00781v1)
- [Official project and dataset composition](https://tml.stanford.edu/ditto-x/)
- [RoboSkin tactile feedback guide](/guides/tactile-feedback-for-physical-ai)

*Evidence review updated November 4, 2026. Original publication dates are retained. We inspected sources and public metadata; we did not run these robot systems or download their training archives.*
`,
  },
  {
    id: 'flashdexretarget-multi-motion-dexterous-data',
    title: 'FlashDexRetarget trains one policy across many human hand motions',
    seoTitle: 'FlashDexRetarget Scales Dexterous Motion Retargeting',
    seoDescription: "Interpret FlashDexRetarget cumulative motion conversion, success-filtered errors, compute budgets and selected hardware replay before planning data generation.",
    excerpt: 'FlashDexRetarget amortizes physics-based retargeting across a motion collection, using object geometry, hand-contact distance and future references.',
    category: 'Dexterous data generation',
    image: '/generated/news/flashdexretarget-multi-motion-dexterous-data.png',
    imageAlt: 'Diagram showing many human hand-object motion references feeding one policy that generates trajectories for two robot hands.',
    imageCaption: 'Original RoboSkin.ai schematic of multi-reference dexterous retargeting. It is explanatory artwork, not an experimental figure.',
    sourceTitle: 'FlashDexRetarget: Accelerating Dexterous Manipulation Data Generation through Multi-Motion Retargeting',
    sourceUrl: 'https://arxiv.org/abs/2610.01849',
    sources: [
      { title: 'FlashDexRetarget arXiv v1 record', url: 'https://arxiv.org/abs/2610.01849' },
      { title: 'Full FlashDexRetarget v1 paper', url: 'https://arxiv.org/html/2610.01849v1' },
      { title: 'Official FlashDexRetarget project', url: 'https://davian-robotics.github.io/FlashDexRetarget/' },
    ],
    technicalFocus: ['dexterous retargeting', 'human demonstrations', 'multi-reference reinforcement learning', 'robot data generation'],
    sourceDate: '2026-10-01',
    evidenceStatus: 'Preprint · arXiv v1 · Isaac Sim evaluation on two robot hands · qualitative physical replay · project videos public · code coming soon',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-02',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# FlashDexRetarget trains one policy across many human hand motions

KAIST AI and Holiday Robotics researchers released FlashDexRetarget on October 1, 2026. Instead of optimizing a new controller for every human hand-object motion, the framework trains a shared reference-conditioned reinforcement-learning policy across a collection. On a 50-motion XHand benchmark, it reports 90% cumulative SPIDER motion conversion in 29 GPU-hours; the evaluated CHORD implementation reaches 46% in 2,847 GPU-hours. [Paper and version record](https://arxiv.org/abs/2610.01849).

## Key takeaways

- The main benchmark contains 25 single-object and 25 two-object motions from HOT3D, TACO and OakInk2, evaluated in Isaac Sim on RTX 3090 GPUs.
- Object point clouds, hand-to-object distance features and the next ten reference frames help one policy distinguish geometry, contact intent and motion direction.
- The 2,847-to-29 GPU-hour comparison is 98.2 times under the authors' setup. It supports the paper's “up to 100×” wording, but it is not a general speed guarantee against every retargeting system.

## What changed

Physics-based retargeting asks a robot hand to reproduce the demonstrated object motion through contacts that are feasible for its own kinematics. Single-motion optimization repeats that process for every clip. FlashDexRetarget distributes reference trajectories across parallel environments and trains one off-policy controller. Successful rollouts become robot trajectories, so optimization cost is shared across motions. [Method and evaluation protocol](https://arxiv.org/html/2610.01849v1).

Each wrist-local observation includes 128 surface points for the current simulated object and next reference pose. Robot signed-distance queries and unsigned reference distances describe geometric proximity to the object; they are not tactile force measurements. A temporal encoder compresses hand and object states from the next ten reference frames into a 128-dimensional vector. Separate left- and right-hand actor-critic pairs receive hand-specific rewards, which matters when each hand manipulates a different object.

The training algorithm adapts FlashSAC with a replay buffer enlarged from 10 million to 50 million transitions and a critic hidden dimension increased from 256 to 1,024. This is a substantial configuration, and the compute comparison includes algorithm and architecture choices rather than isolating a single trick.

## Results under the reported conditions

For XHand, FlashDexRetarget reports SPIDER/ManipTrans-object/ManipTrans success of 0.90/0.86/0.86, 10.95 mm mean object-position error on SPIDER-successful trajectories and 29 GPU-hours. Do as I Do reaches 0.36 SPIDER in 66 GPU-hours; DexMachina reaches 0.48 in 447; CHORD reaches 0.46 in 2,847. The 44-percentage-point difference from CHORD is on cumulative SPIDER conversion. For Sharpa Wave Hand, FlashDexRetarget reports 0.72/0.70/0.70 and 33 GPU-hours, versus CHORD's 0.50/0.22/0.00 and 3,314 GPU-hours.

Metric choice matters. SPIDER averages object errors and can overstate success when one object in a two-object motion barely moves. The authors therefore use the stricter object-only ManipTrans criterion for ablations. RoboSkin analysis: preserving both numbers is more informative than repeating the 90% headline alone.

Scaling tests train on 200, 500 and 1,000 references for 600 million environment steps. The project page reports more than 600 of 1,000 motions converted, but the paper does not present a universal conversion fraction across arbitrary motion distributions. Physical replay shows wiping a board, pouring into a pan and closing a lid. No trial count, failure rate or closed-loop policy adaptation is reported for those hardware demonstrations, so they establish executability examples rather than a quantitative sim-to-real benchmark.

## RoboSkin analysis

FlashDexRetarget targets a practical bottleneck between human-motion collections and [dexterous robot hands](/robot-hands): a demonstration is not usable robot data until contact and object motion are feasible for a specific embodiment. Amortizing that conversion can matter more than slightly improving one hand's single-clip fit.

The future-reference encoder is also an important contact insight. One pose cannot distinguish whether a hand is about to wipe, pour or close. By exposing the upcoming motion and object geometry, the controller can prepare for contact rather than chase it frame by frame. That complements tactile data collection even though the method itself uses simulated geometry and state rather than physical tactile sensor input.

## Limitations and availability

FlashDexRetarget is an arXiv v1 preprint, and RoboSkin.ai has not run the code or reproduced the metrics. Main results are simulation-based, use three source datasets and two robot hands, and compare methods under the authors' selected preprocessing and success definitions. Real-world evidence is qualitative replay of three tasks.

The official project publishes videos, method details and tables but labels code “coming soon.” The November 4 recheck still found the code control marked coming soon. No repository, trained policy, converted trajectory archive or implementation license was verified. The paper is CC BY 4.0; that license covers the article, not unreleased software or third-party source datasets.

## Conversion coverage is not final-policy reliability

The evaluation counts a reference as converted once training has produced a successful stored rollout. It does not require the final checkpoint to repeat every converted motion. A high conversion fraction can therefore coexist with failures when the final policy is rerun. It also says nothing by itself about a new reference outside the training collection. [Metric and storage protocol](https://arxiv.org/html/2610.01849v1).

| Quantity | What was measured | Additional evidence needed for deployment |
| --- | --- | --- |
| Cumulative conversion | References with a successful stored trajectory during training | Repeated trials of the chosen frozen policy |
| Position/orientation error | Error on the successful-trajectory subset | Failures and excluded motions, not just low errors among successes |
| GPU-hours | Training under the selected stopping rules and budgets | Hardware, preprocessing and inference costs for the intended setup |
| Physical demonstration | Replay of selected successful trajectories | Closed-loop policy trials, perception failures and recovery |

Per-motion baselines stop after success while failed runs consume their budgets. The shared policy uses privileged simulated state and future reference frames, not future camera observations. A practical conversion review should preserve the original motion ID, filtering reason, stopping condition and selected rollout; then test repetition and unseen references separately. See the [teleoperation and retargeting evidence comparison](/robot-teleoperation#contact-signal-roles) before treating generated trajectories as measured demonstrations.

## Sources and related resources

- [FlashDexRetarget v1, submitted October 1, 2026](https://arxiv.org/abs/2610.01849)
- [Full benchmark, metrics and scaling study](https://arxiv.org/html/2610.01849v1)
- [Official project and demonstration videos](https://davian-robotics.github.io/FlashDexRetarget/)
- [RoboSkin robotics datasets guide](/robotics-datasets)

*Evidence review updated November 4, 2026. Original publication dates are retained. We inspected sources and public metadata; we did not run these robot systems or download their training archives.*
`,
  },
  {
    id: 'tacex-tactile-curiosity-robot-exploration',
    title: 'TacEx makes tactile uncertainty a target for robot exploration',
    seoTitle: 'TacEx Uses Tactile Curiosity for Robot Exploration',
    seoDescription: "Separate TacEx’s reward-free collection, offline learning and rewarded VLA steering; check current code access, evaluation windows and physical-safety limits.",
    excerpt: 'TacEx decomposes model uncertainty by sensing modality and rewards uncertainty in touch, steering robot learning toward contact-rich experience.',
    category: 'Tactile robot learning',
    image: '/generated/news/tacex-tactile-curiosity-robot-exploration.png',
    imageAlt: 'Diagram of a robot gripper using tactile uncertainty to choose contact-rich exploration instead of free-space motion.',
    imageCaption: 'Original RoboSkin.ai schematic of tactile-directed curiosity. It is explanatory artwork, not an experimental figure.',
    sourceTitle: 'Tactile Curiosity Drives Robot Interaction',
    sourceUrl: 'https://arxiv.org/abs/2609.40134',
    sources: [
      { title: "Current v3, revised October 13, 2026", url: "https://arxiv.org/html/2609.40134v3" },
      { title: "Author-linked implementation, reviewed revision d268cdb", url: "https://github.com/klemensiten/tacex/tree/d268cdb0d769fc9868fe37af462f81ef59c4412c" },
      { title: 'TacEx arXiv v1 record', url: 'https://arxiv.org/abs/2609.40134' },
      { title: 'Full TacEx v1 paper', url: 'https://arxiv.org/html/2609.40134v1' },
    ],
    technicalFocus: ['tactile exploration', 'intrinsic motivation', 'contact-rich reinforcement learning', 'VLA post-training'],
    sourceDate: '2026-09-30',
    evidenceStatus: "CoRL 2026 according to author sources · arXiv v3 reviewed · simulation-only · public code documentation inspected, not executed",
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-01',
    updated: "2026-11-04",
    readTime: "6 min read",
    content: `# TacEx makes tactile uncertainty a target for robot exploration

Researchers from ETH Zurich and the University of California, Berkeley submitted TacEx on September 30, 2026. This update reviews the October 13 v3 and the current author-linked implementation; the authors identify the work as accepted at CoRL 2026. The framework separates a learned dynamics model's uncertainty into visual, tactile and latent-state components, then lets a robot prioritize uncertainty in touch. The reported experiments show more contact-rich reward-free exploration and more sample-efficient post-training of a frozen vision-language-action policy, but all tests are in simulation. [Paper and version record](https://arxiv.org/abs/2609.40134).

## Key takeaways

- TacEx changes the exploration objective, not merely the policy input: ensemble disagreement about future tactile observations becomes an intrinsic reward.
- Reward-free collection is evaluated across five random seeds. VLA post-training covers eight contact-rich LIBERO-90 tasks and ten seeds, with 500,000 environment steps for most tasks and one million for task 69.
- The paper reports curves rather than a single aggregate success claim. Tactile-plus-visual uncertainty gives the highest reported mean final return on each of the five tasks in the extended comparison, but the benefit varies by task.

## What changed

Standard curiosity methods reward predictive uncertainty wherever it occurs. In manipulation, that can spend a large budget on novel motion through empty space. TacEx instead models uncertainty separately for visual features, tactile force maps and the fused latent state. Weighting the tactile term more heavily biases the policy toward states where contact dynamics are unknown. [Method and experiments](https://arxiv.org/html/2609.40134v1).

The first experiment removes task reward entirely. A simulated parallel-jaw gripper explores scenes with one object and then four objects. After collection, the replay buffer is frozen, relabelled with a sparse pick-and-place reward and used to train Soft Actor-Critic offline. Tactile-weighted variants interact with and attempt to grasp objects more often than variants without tactile disagreement. Adding visual disagreement gives an effective object count near two, while tactile-only curiosity is closer to one. This entropy-derived measure describes the distribution of grasps, not the number of distinct tasks solved.

The second experiment applies the same idea to a pretrained policy. A lightweight learner predicts noise for a frozen diffusion-based VLA; the base VLA still consumes its original image, proprioception and language inputs. TacEx gives the noise-steering learner and critics tactile observations and augments the online task reward with an intrinsic disagreement bonus. This is post-training around a frozen policy, not tactile pretraining of the VLA itself.

## Results under the reported conditions

The LIBERO study uses task IDs 58, 69, 61, 77, 55, 21, 56 and 20. The simulated Panda gripper receives 32 × 64 × 3 tactile force maps and 64 × 64 images. Every main comparison uses the same pretrained policy checkpoint and per-task interaction budget. The authors report mean evaluation return with standard-error bands across ten seeds.

Five tasks receive the most extensive baseline comparison: ketchup, soup and butter into a tray; a book into the back of a caddy; and turning on a stove before placing a frying pan. Tactile-plus-visual disagreement has the highest reported mean final return on all five. Additional controls aggregate the taxels into one signal, replace SAC with PPO or update the diffusion action head. The spatial tactile-plus-visual variant remains strongest under the displayed protocol.

RoboSkin verification: the paper does not publish one numerical average across all eight tasks, so this article does not manufacture one from plotted curves. It also distinguishes tactile input from tactile-directed exploration. The ablation shows that adding touch to the learner state helps, while the best variants additionally predict spatial tactile outcomes as the disagreement target.

## What this means for tactile robotics

RoboSkin analysis: TacEx treats a tactile sensor as a guide to where the robot should collect experience. That is different from using touch only after contact has already occurred. For [contact-rich manipulation](/tactile-manipulation), it could make data collection more intentional by spending fewer transitions away from objects.

The multi-object result also exposes a useful design trade-off. Tactile-only curiosity can over-focus on one reliable source of contact; combining vision and touch maintains broader scene coverage. A deployment may therefore need adaptive modality weights rather than one permanent setting. That question links exploration design to the wider [robot-learning pipeline](/robot-learning), not just sensor choice.

## Limitations and availability

The current v3 and author project describe a CoRL 2026 paper; RoboSkin.ai has not reproduced it. The study uses simulated force maps, one parallel-jaw gripper and no fragile or deformable objects. It does not test tactile noise, calibration drift, sensor wear, safe-force constraints or physical resets. Contact-seeking curiosity by itself does not prevent unsafe contact.

The authors state that the representation could accept vision-based tactile images, but no multi-finger hand or real sensor is evaluated. The November 4 review found the [author project](https://kiten.me/projects/tacex/) and its linked [public implementation](https://github.com/klemensiten/tacex), superseding the original release-status note. The README describes both experimental pipelines and upstream submodules. The reviewed root and README did not establish a project-wide software license; a missing root LICENSE file and empty API license metadata are evidence limits, not proof about every file. Checkpoints, data payloads and end-to-end execution were not verified. The paper’s CC BY 4.0 license does not license separate software, data or dependencies.

## Separate the training objective from the deployment contract

The [current v3 methods and appendices](https://arxiv.org/html/2609.40134v3) distinguish three stages that should not share one “reward-free” label:

| Stage | What changes or stays fixed | Evidence to record |
| --- | --- | --- |
| Curiosity-driven collection | A policy explores with intrinsic disagreement and no task reward | Contact coverage and interaction distribution, including unsuccessful exploration |
| Offline downstream learning | A fixed buffer is relabelled with a pick-and-place reward | Dataset identity and evaluation protocol; no new training interactions |
| Diffusion steering | A learned noise policy uses touch and task reward around a frozen VLA | Environment interactions, optimization updates and the unchanged base checkpoint |

Bonus weights control which prediction disagreement is rewarded; they do not by themselves specify everything the policy observes. Changing a tactile weight to zero is therefore not automatically a no-touch input baseline. Likewise, “final return” in Figure 6 is averaged over the final 10% of the logged training horizon, whereas normalized area under the curve covers the full horizon. Neither is a physical production success rate.

The public README adds a practical accounting issue: for replay-based steering, its max_steps configuration counts gradient updates, while environment steps are logged separately. Record the code revision and both counters before comparing an interaction budget. The examples were inspected as documentation, not executed by RoboSkin.

Finally, seeking uncertain contact is not a force limiter. The study does not separate real sensor noise, drift or wear from unfamiliar contact dynamics, and has no physical fragile-object validation. Proposed hardware work would need independent contact limits, reset accounting and sensor calibration. The [manipulation decision map](/robot-manipulation#contact-decisions) keeps exploration objectives separate from tested control and task completion.

## Sources and related resources

- [TacEx arXiv v1, submitted September 30, 2026](https://arxiv.org/abs/2609.40134)
- [Full method, hyperparameters, ablations and limitations](https://arxiv.org/html/2609.40134v1)
- [RoboSkin tactile AI overview](/tactile-ai)
- [RoboSkin visuo-tactile learning guide](/visuo-tactile)

*Source review updated November 4, 2026. Original publication dates are retained. Results belong to the cited authors; RoboSkin has not run these systems or downloaded their experimental payloads.*
`,
  },
  {
    id: 'occludex-visuo-tactile-self-occlusion-dexterity',
    title: 'OccluDex fuses 3D geometry and touch when robot hands block the view',
    seoTitle: 'OccluDex Handles Self-Occlusion with Vision and Touch',
    seoDescription: "Review OccluDex binary-contact inputs, frozen representation transfer and matched-view hardware tests; distinguish masking, unseen scales and force feedback.",
    excerpt: 'OccluDex pretrains a 3D visuo-tactile encoder on human demonstrations, then freezes it for dexterous policies operating under hand-induced occlusion.',
    category: 'Visuo-tactile dexterity',
    image: '/generated/news/occludex-visuo-tactile-self-occlusion-dexterity.png',
    imageAlt: 'Diagram of a dexterous hand occluding an object while partial 3D geometry and fingertip contact tokens feed a shared encoder.',
    imageCaption: 'Original RoboSkin.ai schematic of OccluDex input fusion. It is explanatory artwork, not an experimental image.',
    sourceTitle: 'OccluDex: Hierarchical 3D Visuo-Tactile Representation Learning for Egocentric Dexterous Manipulation under Self-Occlusion',
    sourceUrl: 'https://arxiv.org/abs/2609.39017',
    sources: [
      { title: 'OccluDex arXiv v1 record', url: 'https://arxiv.org/abs/2609.39017' },
      { title: 'Full OccluDex v1 paper', url: 'https://arxiv.org/html/2609.39017v1' },
    ],
    technicalFocus: ['3D visuo-tactile learning', 'self-occlusion', 'dexterous manipulation', 'sim-to-real transfer'],
    sourceDate: '2026-09-30',
    evidenceStatus: 'Preprint · arXiv v1 · simulation plus 40 physical trials · zero-shot transfer on one Shadow Hand · no public code or dataset verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-01',
    updated: "2026-11-04",
    readTime: "6 min read",
    content: `# OccluDex fuses 3D geometry and touch when robot hands block the view

Researchers from Shanghai Jiao Tong University, Tongji University and the Chinese University of Hong Kong, Shenzhen released OccluDex on September 30, 2026. The framework combines partial egocentric point clouds with local touch so a dexterous hand can continue estimating object geometry and contact while its own fingers hide the scene. The authors report 17/20 successful physical faucet trials and 14/20 object-reorientation trials after simulation training, without real-world fine-tuning. [Paper and version record](https://arxiv.org/abs/2609.39017).

## Key takeaways

- A hierarchical masked autoencoder learns global 3D structure at multiple scales, then fuses 19 tactile contact tokens with high-level geometric features.
- Pretraining uses 1,690 human manipulation sequences containing 409,035 synchronized visual-tactile frames from three subjects.
- Simulation averages 100 evaluation episodes per setting and three policy seeds. Physical evaluation uses two unseen objects per task and ten trials per object, giving 40 trials in total.

## What changed

An egocentric camera stays aligned with the manipulating body, but the hand itself often blocks the contact region. Completing the hidden shape from vision can be ambiguous, while touch alone is local and says little about the rest of the object. OccluDex gives the two signals different jobs: multiscale point-cloud tokens preserve global geometry, and sensor-specific tactile tokens preserve localized contact.

During pretraining, the model masks portions of both modalities and reconstructs them. The encoder progressively merges 512, 256 and 64 point groups, then cross-attends the final geometric tokens with 19 tactile tokens. The decoder is discarded after pretraining; the encoder remains frozen while Proximal Policy Optimization learns the downstream controller. [Architecture and protocol](https://arxiv.org/html/2609.39017v1).

The human dataset uses a head-mounted Intel RealSense D435i and a WiseGlove with 19 tactile channels, synchronized at 30 Hz. Three contributors provide 565, 565 and 560 sequences. Pretraining runs on two RTX 4080 GPUs. The downstream simulated Shadow Hand receives a 4,096-point partial cloud, 19 binary contacts and 48 proprioceptive values at each control step.

## Results and the percentage-point check

Faucet rotation uses three training faucet geometries and tests scales of 0.9 and 1.1 as unseen conditions. OccluDex reports 99.9% success on seen faucets and 86.6% on the unseen scales. Tabletop reorientation trains on ten YCB objects and holds out six; success is 75.1% on seen objects and 83.3% on held-out objects.

The paper's abstract says OccluDex is 8.3% higher on seen cases and 12.6% higher on unseen cases than the strongest baselines. RoboSkin recalculated those statements from Table III. Averaging the two tasks gives OccluDex 87.5% seen success versus 79.2% for the strongest per-task baseline, a difference of 8.3 percentage points. For unseen cases, 84.95% versus 72.4% produces 12.55 points, which rounds to 12.6. These are absolute percentage-point gaps, not relative percentage gains.

The physical platform uses a right Shadow Hand with 19 force-sensitive resistors, a RealSense D435i and closed-loop control at 10 Hz. The tactile electronics sample at 1 kHz before binarization; depth arrives at 30 Hz. Two unseen objects are used for each task. Faucet rotation succeeds in 17/20 trials, while 180-degree tabletop reorientation succeeds in 14/20.

## What this means for robot hands

RoboSkin analysis: the result is useful because it tests a failure caused by the robot's own embodiment. More external cameras can reduce occlusion in a laboratory, but a [dexterous robot hand](/robot-hands) operating from an onboard view still needs local evidence when fingers cover the object. OccluDex uses touch as that local evidence without asking the tactile stream to reconstruct the entire shape.

The ablation strengthens this interpretation. Removing touch drops faucet success by 45.7 points on seen instances and 48.0 points on unseen scales under the authors' ablation protocol. Removing the point cloud also hurts, but less consistently. The two modalities are complementary rather than interchangeable, which fits the broader [visuo-tactile learning](/visuo-tactile) design problem.

## Limitations and availability

OccluDex is an arXiv v1 manuscript submitted to IEEE, and RoboSkin.ai has not reproduced it. The physical study is 40 trials on one Shadow Hand setup. The real camera pose is matched to simulation, no point-cloud perturbation or dynamics randomization is used, and the policy sees binary contacts rather than rich tactile images or forces. The authors also note that training the full encoder jointly with PPO was infeasible on their hardware; the from-scratch comparison therefore uses a simplified architecture.

The November 4 paper and arXiv review did not verify a project page, public code, dataset, trained model or implementation license through those sources. The article is CC BY 4.0, but its manuscript license does not establish reuse rights for implementation assets or data.

## Check contact semantics before transferring the frozen encoder

Nineteen tactile channels do not provide nineteen calibrated force estimates to this policy. Each channel is thresholded into contact/no-contact before embedding. That can reduce sensitivity to force magnitude, but also removes information needed to distinguish a light touch from excessive pressure. Channel identity, placement and threshold convention remain part of the input contract. [Tactile representation and physical setup](https://arxiv.org/html/2609.39017v1).

| Boundary | What remains to be checked on another system |
| --- | --- |
| Human glove to robot hand | Correspondence between the nineteen contact regions and the robot's sensing locations |
| Pretraining to control | The representation is frozen; a downstream PPO policy is still trained for the task |
| Simulation to hardware | Camera pose, contact preprocessing and control timing; matched viewpoints are not unrestricted camera transfer |
| Task score to force regulation | Successful rotation/reorientation does not establish force accuracy or overload protection |

The random masking objective is explicitly not a simulator of physical self-occlusion. It teaches cross-modal structure, while the downstream experiment tests a particular camera/hand configuration. Likewise, an unseen faucet scale and a held-out YCB object are different generalization axes; their scores should not be collapsed into universal unseen-object capability.

The manuscript's simulation setup describes a full revolution for both tasks, while its abstract and explicit hardware criterion describe at least 180 degrees for object reorientation. The physical counts above use the stated hardware criterion; a reproduction should resolve the simulation goal before comparing protocols.

A proposed transfer check should retain timestamp alignment, channel order, contact thresholds and camera extrinsics with each policy checkpoint. The [learning-change comparison](/robot-learning#learning-change-contract) distinguishes this frozen encoder plus trained policy from memory adaptation and visual goal conditioning.

## Sources and related resources

- [OccluDex arXiv v1, submitted September 30, 2026](https://arxiv.org/abs/2609.39017)
- [Full data, baselines, ablations and hardware protocol](https://arxiv.org/html/2609.39017v1)
- [RoboSkin robot manipulation overview](/robot-manipulation)
- [RoboSkin tactile sensor directory](/sensors)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these research systems or robot experiments.*
`,
  },
  {
    id: 'membrane-coupled-delta-array-micro-object-manipulation',
    title: 'A stretchable membrane lets a delta array manipulate sub-pitch objects',
    seoTitle: 'Membrane-Coupled Delta Array Moves Smaller Objects',
    seoDescription: "Separate visual-feedback routing from learned membrane control; compare final-position criteria, simulation timing, coupled motion and hardware transfer limits.",
    excerpt: 'A nylon-spandex membrane couples 64 three-axis delta robots into a continuous surface, removing actuator spacing as a hard object-size floor.',
    category: 'Soft manipulation hardware',
    image: '/generated/news/membrane-coupled-delta-array-micro-object-manipulation.png',
    imageAlt: 'Diagram of an eight-by-eight delta robot array deforming a continuous membrane to move objects smaller than the actuator spacing.',
    imageCaption: 'Original RoboSkin.ai schematic of the membrane-coupled array. It is explanatory artwork, not a photograph of the prototype.',
    sourceTitle: 'Making Waves: A Membrane-Coupled Delta Array for Manipulating Objects Below the Actuator Spacing',
    sourceUrl: 'https://arxiv.org/abs/2609.39652',
    sources: [
      { title: 'Making Waves arXiv v1 record', url: 'https://arxiv.org/abs/2609.39652' },
      { title: 'Full Making Waves v1 paper', url: 'https://arxiv.org/html/2609.39652v1' },
    ],
    technicalFocus: ['distributed manipulation', 'soft robotic surface', 'delta robot array', 'sim-to-real control'],
    sourceDate: '2026-09-30',
    evidenceStatus: 'Preprint · arXiv v1 · physical 192-DoF platform · 50 learned-policy hardware trials · no public code, CAD or data verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-01',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# A stretchable membrane lets a delta array manipulate sub-pitch objects

Researchers spanning IT University of Copenhagen and Carnegie Mellon University released a membrane-coupled delta array on September 30, 2026. The prototype links an 8 × 8 grid of three-degree-of-freedom delta robots with stretchable fabric, turning 64 discrete supports into one deformable contact surface. It manipulates objects from 15 to 90 millimeters on hardware even though neighboring actuators are 43.3 millimeters apart. [Paper and version record](https://arxiv.org/abs/2609.39652).

## Key takeaways

- Sixty-four delta robots provide 192 controlled degrees of freedom beneath a 263 × 325 mm nylon-spandex membrane.
- Predefined local primitives, supervised by visual tracking and replanning, route 15 mm cubes, while a learned policy moves five 30–90 mm objects to target positions in 50 physical trials.
- The learned policy reaches 76% hardware success versus 100% for identical start-goal cases in simulation; fine placement remains the main transfer gap.

## What changed

Distributed manipulation arrays normally require an object to bridge several actuators. Their center-to-center spacing therefore becomes a lower limit on object size. This design inserts a continuous interface: an 80/20 nylon-spandex sheet, 0.4 mm thick, mounted at neutral strain across the actuator tips. Small objects rest on the fabric between tips rather than falling through the grid.

Each delta uses three 100 mm-stroke linear actuators, a compliant TPU/PETG parallel mechanism and position feedback. Sixteen modular 2 × 2 units form the full array. Four 1080p cameras running at 30 frames per second track objects with OpenCV image moments and AprilTags. The fabric can be relaxed to cradle an object or stretched to create local slope, curvature and strain. [Hardware and control details](https://arxiv.org/html/2609.39652v1).

The authors describe the surface as a displacement field rather than 192 independent motors. Quasi-static fields tilt, translate, dilate or bend the membrane. Cyclic fields create traveling waves. Local cell primitives can move several sub-pitch objects concurrently, while larger objects use a neighborhood of tips for translation and rotation.

## From 192 motors to a compact action space

Directly exploring 192 actuator coordinates destabilized the simulated soft body. The learned controller instead acts on low-order discrete cosine transform coefficients. It commands either the whole array or a ring around the tracked object. All policies train for one million MuJoCo steps and are evaluated over 392 held-out episodes covering 49 EGAD shapes.

A 19-delta neighborhood using three-axis motion reaches 95.1% simulation success, with a 3.5 mm median final error and 8.4 mm 90th-percentile error. The whole-array controller reaches a similar 93.5%, but its median and 90th-percentile errors are 6.5 and 14.2 mm. Thus “halves the placement error” refers to the median changing from 6.5 to 3.5 mm, a 46.2% reduction, not a doubled success rate.

For physical transfer, the 19-delta policy is deployed without adaptation on five objects sized 30, 45, 60, 75 and 90 mm. Each receives ten start-goal trials, and the identical cases are replayed in simulation. Hardware succeeds on 38/50 trials, or 76%; simulation records 50/50. Mean final error is 19.4 mm on hardware versus 3.46 mm in simulation.

## What this means for contact hardware

RoboSkin analysis: the membrane is not a sensor, but it behaves like a mechanically continuous contact layer. It fills the spatial gaps between actuators, much as [robot skin](/robot-skin) fills sensing gaps across a body. That suggests an engineering pattern in which a compliant interface performs useful spatial interpolation before perception or control software runs.

The paper also points directly to the missing next layer. The learned observation contains object position, goal, actuator state and object size, but no geometry or contact measurement. Concave features sometimes catch on real tips, a failure absent from the convex-hull simulation. Adding [tactile sensing](/sensors) at the tips or estimating contact through vision could let the policy distinguish rolling, sliding and snagging instead of treating them as unobserved disturbance.

## Limitations and availability

This is an arXiv v1 preprint, and RoboSkin.ai has not reproduced the system. The 15 mm result comes from predefined primitives with tracking, retries and route updates; the learned-policy transfer covers 30–90 mm. Hardware trials total 50, with ten per object. The nylon-spandex membrane is nonlinear, anisotropic and subject to wrinkling, boundary loads, motor backlash and manufacturing tolerance. The simulation uses an idealized flex surface and convex-hull collision geometry, which helps explain the fine-placement gap.

The manuscript does not link an official project page, public controller code, MuJoCo environment, CAD package, bill of materials, dataset or implementation license. The arXiv article is CC BY 4.0; that article license does not establish reuse terms for separate hardware or software assets, which were not verified in this review.

## State the control layer and success criterion before comparing accuracy

The small-object demonstration and learned-policy evaluation answer different questions. Routing holds a predefined transfer primitive until tracking confirms movement; stalled transfers can be retried and the graph route revised. Calling the whole process open-loop would hide that feedback. The learned controller instead chooses a low-dimensional deformation field from the tracked state. [Routing and policy methods](https://arxiv.org/html/2609.39652v1).

| Evaluation | Feedback and comparison | Boundary to retain |
| --- | --- | --- |
| 15 mm-object routing | Visual confirmation, retries and graph replanning | Demonstrated routes do not establish arbitrary final pose or independent simultaneous operation |
| Learned physical transfer | Final-position error below 20 mm after 100 steps; 38 of 50 trials | A closest approach is not the final held position; orientation is not the reported goal metric |
| Local versus whole-array policy | Both use 27 action parameters | Allocating them locally changes spatial resolution, so this is not simply a comparison of motor count |

The physical policy runs at 5 Hz; the paper’s 2 kHz value describes simulation physics. Neither the camera frame rate nor that simulator rate establishes contact-to-command latency. The membrane also couples neighboring motions and has strain and edge constraints, so concurrent objects need a combined-load evaluation.

For adoption, specify final position, orientation, holding interval, allowed retries and surface condition before collecting trials. Log snagging and edge failures separately from transient proximity to the goal. These proposed checks extend the [gripper/contact acceptance guide](/robot-grippers#contact-evidence); the array is a manipulation surface, not a tactile skin or a commercial gripper rating.

## Sources and related resources

- [Making Waves arXiv v1, submitted September 30, 2026](https://arxiv.org/abs/2609.39652)
- [Full hardware, workspace, policy and transfer evaluation](https://arxiv.org/html/2609.39652v1)
- [RoboSkin electronic-skin overview](/e-skin)
- [RoboSkin Physical AI guide](/physical-ai)

*Source review updated November 4, 2026. Original publication dates are retained. Experiments are attributed to their authors; RoboSkin did not reproduce the hardware, execute the models or inspect downloaded experimental payloads.*
`,
  },
  {
    id: 'funco-grasp-cross-embodiment-dexterous-grasping',
    title: 'FunCo-Grasp transfers grasp structure across different robot hands',
    seoTitle: 'FunCo-Grasp Transfers Grasps Across Robot Hands',
    seoDescription: "Inspect FunCo-Grasp functional annotations, IK realization and held-out hand tests; separate warm generation time from complete physical grasp execution.",
    excerpt: 'FunCo-Grasp maps unlike robot hands into shared functional parts and canonical frames before generating an executable dexterous grasp.',
    category: 'Cross-embodiment grasping',
    image: '/generated/news/funco-grasp-cross-embodiment-dexterous-grasping.png',
    imageAlt: 'Diagram aligning different robot hand morphologies to shared fingertip, distal, middle, proximal, metacarpal and wrist roles.',
    imageCaption: 'Original RoboSkin.ai schematic of functional correspondence across hands. It is explanatory artwork, not a generated grasp result.',
    sourceTitle: 'Function beyond Form: Functional Correspondence for Cross-Embodiment Dexterous Grasp Generation',
    sourceUrl: 'https://arxiv.org/abs/2609.39006',
    sources: [
      { title: 'FunCo-Grasp arXiv v1 record', url: 'https://arxiv.org/abs/2609.39006' },
      { title: 'Full FunCo-Grasp v1 paper', url: 'https://arxiv.org/html/2609.39006v1' },
      { title: 'Official FunCo-Grasp project page', url: 'https://zblzz.github.io/FunCo-Grasp-Web/' },
      { title: 'Official FunCo-Grasp repository placeholder', url: 'https://github.com/zblzz/FunCo-Grasp' },
    ],
    technicalFocus: ['cross-embodiment grasping', 'dexterous robot hands', 'functional correspondence', 'diffusion grasp generation'],
    sourceDate: '2026-09-30',
    evidenceStatus: 'Preprint · arXiv v1 · seven-hand simulation and 200 physical trials · project page public · repository is a placeholder without code or license',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-10-01',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# FunCo-Grasp transfers grasp structure across different robot hands

Researchers from Southern University of Science and Technology, KTH Royal Institute of Technology, Shanghai Jiao Tong University and Rysen Robotics released FunCo-Grasp on September 30, 2026. The method assigns physically different links to shared functional roles, then expresses those roles in canonical local frames before generating a grasp. One model reaches 84/100 successes on ApexHand and 68/100 on Revo2, two hand designs not used for training. [Paper and version record](https://arxiv.org/abs/2609.39006).

## Key takeaways

- The model trains on 14,011 grasps from ShadowHand, Allegro and Barrett, then evaluates four unseen simulation hands without target-hand grasp data or fine-tuning.
- Average simulated success is 92.40% on the three seen hands and 74.02% on ApexHand, XHand, LeapHand and Robotiq-3F.
- The physical total is 152/200 trials across ApexHand and Revo2. The official repository existed at verification time but contained only a 13-byte “Comming soon” README and no license.

## What changed

Cross-embodiment grasp models face a representation mismatch. A thumb tip and an opposing finger may play similar roles on two hands even when their link names, topology and axes differ. FunCo-Grasp introduces Functional Part Alignment to map links into fingertip, distal, middle, proximal, metacarpal and wrist roles. Canonical Frame Alignment then gives those roles shared forward, closing and lateral directions.

A graph encoder combines the aligned hand's geometry, roles and kinematics. A frozen object encoder supplies local shape features. A diffusion model generates the spatial arrangement of the functional parts, and inverse kinematics converts those target positions into wrist and joint configurations. Adapting a new hand requires its geometry, kinematics and a one-time role annotation, but not new grasp demonstrations. [Method and evaluation](https://arxiv.org/html/2609.39006v1).

The filtered CMapDataset split contains 48 training objects and ten held-out objects. Training grasps comprise 3,754 Allegro, 6,242 Barrett and 4,015 ShadowHand examples. Each hand-object simulation pair is evaluated in three runs of 100 newly generated grasps. A grasp succeeds if it survives six directional disturbances and finishes with less than two centimeters of object displacement.

## Results and baseline boundaries

On seen hands, FunCo-Grasp averages 92.40%. That is below UniMorphGrasp's paper-reported 94.00% but above locally evaluated T(R,O) Grasp at 91.07%. UniMorphGrasp had no published results for the four unseen hands. On those unseen embodiments, FunCo-Grasp averages 74.02%, compared with 66.50% for CEDex, the strongest available all-four baseline in the table.

The alignment ablation is especially revealing. Removing Functional Part Alignment reduces unseen-hand success from 74.02% to 33.90%; removing canonical frames lowers it to 19.40%; removing both reaches 0.95%. Seen-hand performance moves by less than 2.3 points in the same ablations. Functional correspondence therefore matters most when morphology changes, rather than simply increasing capacity on familiar hands.

The authors also report a weakness: successful grasp diversity is 0.293 radians, lower than 0.401 for T(R,O), 0.450 for D(R,O) and 0.512 for CEDex under the cited protocols. The model is fast at 0.16 seconds per grasp on the reported workstation, but it produces a narrower set of configurations.

## Physical tests on unseen hand designs

Both physical platforms mount an unseen hand on a UR5 arm and use a RealSense D435i. Each trial captures fresh RGB-D data, segments the object with SAM2 and generates a grasp. Ten objects receive ten random placements per hand. ApexHand succeeds 84/100 times and Revo2 succeeds 68/100, yielding 152/200, or 76.00%, overall. Per-object counts range from 5/10 to 10/10 on ApexHand and 4/10 to 9/10 on Revo2.

RoboSkin analysis: this is a grasp-generation result, not a full manipulation policy. It shows that an explicit functional schema can bridge [robot hand](/robot-hands) geometries, but the downstream test is lift-and-hold rather than in-hand reorientation, tool use or tactile recovery. A future system could combine this morphology transfer with [contact-aware manipulation](/tactile-manipulation) after the grasp closes.

## Limitations and availability

FunCo-Grasp is an arXiv v1 preprint, and RoboSkin.ai has not reproduced it. The one-time functional annotation is described as lightweight but not timed or evaluated for annotator consistency. Baseline provenance is mixed: most methods use released checkpoints under the authors' local protocol, while UniMorphGrasp values come from its paper. The model also depends on object segmentation and does not consume tactile feedback.

The [official project page](https://zblzz.github.io/FunCo-Grasp-Web/) exposes explanations, figures, tables and videos. The previously identified [official GitHub repository](https://github.com/zblzz/FunCo-Grasp) still contained only a 13-byte README saying “Comming soon” in the November 4 root-directory and README check; no implementation files, model weights, dataset package or software license were verified there. The arXiv record uses the non-exclusive distribution license, which does not grant an open-source software license.

## A transferable representation still needs an embodiment contract

No target-hand fine-tuning does not mean no target-hand work. The model needs the hand's geometry, kinematic description and functional annotations. These define both what each part means and the local axes in which interactions are represented. A mislabeled closing axis changes the problem before grasp generation begins. [Functional alignment and realization](https://arxiv.org/html/2609.39006v1).

The final inverse-kinematics step fits functional-part positions, rather than explicitly matching every predicted part orientation. Consequently, inspect the realized joint configuration and contact geometry as well as the model's predicted arrangement. The separate simulation disturbance test and physical lift-and-hold test supply evidence that IK output alone cannot.

| Integration record | Why it changes the interpretation |
| --- | --- |
| URDF, meshes and functional annotation revision | Establishes the actual target embodiment and coordinate conventions |
| Predicted versus realized part positions | Exposes conversion error between the generated arrangement and joint commands |
| Object observation and segmentation | Identifies perception failures separately from grasp-generation failures |
| Generation and execution timing | Separates warm model/IK computation from acquisition, startup and physical motion |

The reported 0.16 seconds includes encoding, generation and IK after warm-up, but excludes loading, one-time compilation, I/O and simulation. It is not an end-to-end pick cycle. Finger-length experiments also keep palm geometry, topology and joint axes fixed; they do not establish arbitrary mechanical redesign transfer.

For a proposed comparison, retain unsuccessful candidates and realized configurations under the same object placements. Report per-hand and per-object results before pooling them. The [robot-learning evidence map](/robot-learning#learning-change-contract) separates morphology annotation from online learning and tactile feedback.

## Sources and related resources

- [FunCo-Grasp arXiv v1, submitted September 30, 2026](https://arxiv.org/abs/2609.39006)
- [Full training, baselines, ablations and physical protocol](https://arxiv.org/html/2609.39006v1)
- [Official project page with videos and results](https://zblzz.github.io/FunCo-Grasp-Web/)
- [Official repository placeholder](https://github.com/zblzz/FunCo-Grasp)
- [RoboSkin dexterous manipulation guide](/robot-manipulation)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these research systems or robot experiments.*
`,
  },
  {
    id: 'tarl-tactile-reward-learning-demonstrations',
    title: 'TaRL learns contact-rich rewards from tactile demonstrations',
    seoTitle: 'TaRL Learns Rewards from Tactile Demonstrations',
    seoDescription: "Separate TaRL progress labels, normalized touch, reward transfer and policy training; interpret physical results with their undisclosed trial denominator.",
    excerpt: 'TaRL regresses task progress from successful and failed tactile demonstrations, then uses that signal to shape contact-rich reinforcement learning.',
    category: 'Tactile reward learning',
    image: '/generated/news/tarl-tactile-reward-learning-demonstrations.png',
    imageAlt: 'Diagram of tactile deformation sequences becoming a learned progress reward for downstream robot reinforcement learning.',
    imageCaption: 'Original RoboSkin.ai schematic of the TaRL reward-learning pipeline. It is explanatory artwork, not an experimental figure.',
    sourceTitle: 'TaRL: Learning General and Physical Rewards from Tactile Demonstrations',
    sourceUrl: 'https://arxiv.org/abs/2609.36785',
    sources: [
      { title: 'TaRL arXiv v1 record', url: 'https://arxiv.org/abs/2609.36785' },
      { title: 'Full TaRL v1 paper', url: 'https://arxiv.org/html/2609.36785v1' },
      { title: 'Official TaRL project page', url: 'https://embodiedai-ntu.github.io/tarl/' },
    ],
    technicalFocus: ['tactile reward learning', 'contact-rich reinforcement learning', 'tactile demonstrations', 'visuo-tactile learning'],
    sourceDate: '2026-09-29',
    evidenceStatus: 'Preprint · arXiv v1 · simulation and two real-world tasks · project videos public · no code or dataset release verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-30',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# TaRL learns contact-rich rewards from tactile demonstrations

Researchers from National Taiwan University and Delta Electronics released Tactile Reward Learning, or TaRL, on September 29, 2026. TaRL learns a dense progress signal from sequences of tactile deformation maps, then adds that signal to reinforcement learning for contact-rich tasks. The reported gains include nut-threading success rising from 34% to 56% in simulation and cube pickup rising from 37% to 97% on a physical robot. [Paper and version record](https://arxiv.org/abs/2609.36785).

## Key takeaways

- TaRL treats touch as reward supervision, not only as a policy observation. Successful, rewound and failed tactile sequences teach a temporally causal model to estimate task progress; this is not a causal-effect estimate.
- The simulation reward model uses 200 successful and 800 failed demonstrations per task. Real-world reward learning uses 40 successful and 40 failed trajectories per task, while the offline policy dataset contains another 90 successful and 90 failed trajectories.
- The real-world percentages are averaged across three random seeds, but the manuscript does not state the number of inference trials per seed. The 60-point cube-pickup gain therefore lacks a disclosed evaluation denominator.

## What changed

Reward engineering is a persistent bottleneck in reinforcement learning. A sparse success flag gives little guidance before a task is complete, while a hand-written dense reward can favor the wrong behavior. Video-based reward models offer another route, but scene appearance does not reliably expose whether a grasp is firm or whether contact force is correctly directed.

TaRL replaces the video sequence with tactile deformation maps from two fingertips. A shared three-layer convolutional encoder processes each map, and a causal Transformer estimates progress using only the history available at that step. Successful demonstrations receive a target that rises with time; failed demonstrations receive zero. Rewound successful sequences teach the model that undoing progress should reduce the reward. [Method details](https://arxiv.org/html/2609.36785v1).

The learned value is a shaping reward. It supplements rather than replaces the task's basic sparse or stage reward, and it is trained separately for each task. In simulation, policies use Proximal Policy Optimization. The physical SO-101 arm experiments use Implicit Q-Learning on a fixed dataset, so their improvement is an offline-policy result rather than evidence of unrestricted online exploration.

## Results under the reported conditions

The simulated suite covers box placement, peg insertion, gear assembly and nut threading with a Franka Panda. Demonstrations are collected at one object position, while policies and reward quality are evaluated at other positions. The most concrete final-success comparison is nut threading: 34% without TaRL and 56% with it, an increase of 22 percentage points. Held-out reward tests use 50 successful and 150 failed trajectories for both in-domain and out-of-distribution positions.

The authors also compare TaRL with ReWiND, a visual reward learner using the same high-level progress-regression recipe. Visual features shift when the object moves, while the tactile representation remains more similar across positions. Combining visual and tactile rewards improves learning further on the three compared tasks, supporting the narrower claim that the modalities contribute different signals.

On the physical robot, cube pickup and peg insertion each use 80 demonstrations for the reward model and 180 different trajectories for offline policy learning. The cube-pickup score rises from 37% to 97%. For peg insertion, the paper separates pickup and insertion: TaRL adds 45 and 10 percentage points respectively. Those results are reported across three training seeds, but no test-rollout count or confidence interval is supplied.

## What this means for robotics

RoboSkin analysis: TaRL moves tactile sensing one step upstream in the learning stack. Instead of asking a policy to discover how touch relates to success, it first converts contact history into an explicit training signal. This could be useful when teams have [tactile demonstrations](/datasets) but cannot write a trustworthy force-aware reward.

The method also exposes a scaling trade-off. Its reward model is local enough to tolerate position changes and, in one box-to-can experiment, a new object instance. That experiment transfers the reward while training a policy on the new task; it is not zero-shot transfer of the robot policy. Yet it still needs task-specific successful and failed touch sequences. It is not a general tactile foundation reward, and it does not eliminate data collection for a new behavior.

## Limitations and availability

TaRL is an arXiv v1 preprint, and RoboSkin.ai has not reproduced its experiments. The comparisons use specified baselines and training recipes; simulation and hardware use different RL algorithms. The physical study covers two tasks on one SO-101 setup, and the missing inference-trial denominator limits statistical interpretation of its largest percentage gain.

The [official project page](https://embodiedai-ntu.github.io/tarl/) provides method explanations, plots and videos. The November 4 recheck did not identify a public implementation repository, downloadable demonstrations, trained reward models or a software/data license. The arXiv manuscript's availability does not make those implementation assets reusable.

## What does a progress reward actually certify?

Successful trajectories receive elapsed-fraction targets, while failed trajectories receive zero throughout. These are supervision conventions: a partial but useful contact in a failed demonstration is not labeled as partial progress. Rewound examples add a temporal ordering signal, but do not supply independent physical measurements of how close every state is to success. [Training-label construction](https://arxiv.org/html/2609.36785v1).

The preprocessing normalizes deformation by each sequence's maximum. Consequently, equal normalized values need not represent equal physical loads. The model also samples a fixed history rather than consuming every recorded frame. A useful reward curve therefore cannot serve as a calibrated force ceiling or prove that brief contact events are preserved.

For a new task, document three separate checks: whether the progress labels match the desired behavior; whether the transferred reward ranks held-out successes and failures; and whether a newly trained, frozen policy completes the task without assistance. Retain reward weights, task reward, failure examples and per-seed rollout counts. TaRL adds a learned term to the task reward; this does not establish a general guarantee that the original optimal policy is preserved. The [vision–touch evaluation guide](/visuo-tactile#training-and-runtime-touch) distinguishes reward quality from perception and control outcomes.

## Sources and related resources

- [TaRL arXiv v1, submitted September 29, 2026](https://arxiv.org/abs/2609.36785)
- [Full method, data counts and evaluation](https://arxiv.org/html/2609.36785v1)
- [Official TaRL project page and videos](https://embodiedai-ntu.github.io/tarl/)
- [RoboSkin guide to tactile manipulation](/tactile-manipulation)
- [RoboSkin robot-learning overview](/robot-learning)

*Source review updated November 4, 2026. Original publication dates are retained. Findings are attributed to their authors; we did not run these systems or verify dataset payloads.*
`,
  },
  {
    id: 'haco-haptic-active-compliance-dexterous-manipulation',
    title: 'HACo grounds dexterous actions in touch and joint torque',
    seoTitle: 'HACo Haptic Active Compliance for Dexterous Robots',
    seoDescription: "Trace HACo compliant action targets, cumulative ablations and physical trials. Inspect the public code and two-second sample without assuming full data access.",
    excerpt: 'HACo learns compliant bimanual actions from regulated demonstrations and conditions them on fingertip tactile signals plus hand-joint torque.',
    category: 'Force-aware dexterity',
    image: '/generated/news/haco-haptic-active-compliance-dexterous-manipulation.png',
    imageAlt: 'Diagram of fingertip tactile maps and joint-torque histories grounding compliant bimanual robot actions.',
    imageCaption: 'Original RoboSkin.ai schematic of HACo haptic active compliance. It is explanatory artwork, not a laboratory image.',
    sourceTitle: 'HACo: Learning Haptic Active Compliance for Force-Aware Dexterous Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2609.36596',
    sources: [
      { title: "Public HACo code and sample metadata, inspected November 4", url: "https://github.com/OpenDriveLab/HACo/tree/44a3fb4607bea9ba9353a722ac6a3405ce3318f1" },
      { title: 'HACo arXiv v1 record', url: 'https://arxiv.org/abs/2609.36596' },
      { title: 'Full HACo v1 paper', url: 'https://arxiv.org/html/2609.36596v1' },
      { title: 'Official HACo project page', url: 'https://opendrivelab.github.io/Haco-Page/' },
    ],
    technicalFocus: ['active compliance', 'dexterous manipulation', 'fingertip tactile sensing', 'joint torque'],
    sourceDate: '2026-09-29',
    evidenceStatus: "Preprint · v1 physical-task results · public code and sample metadata inspected November 4 · no execution or full-data verification",
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-30',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# HACo grounds dexterous actions in touch and joint torque

Researchers from the University of Hong Kong, the Beijing Academy of Artificial Intelligence and Johns Hopkins University released HACo on September 29, 2026. HACo stands for Haptic Active Compliance: a dexterous policy that learns force-regulating motion from compliant demonstrations and conditions action generation on fingertip touch plus joint torque. Across five physical tasks and 20 trials per task, the authors report an 83% mean success rate versus 35% for the strongest evaluated baseline. [Paper and version record](https://arxiv.org/abs/2609.36596).

## Key takeaways

- HACo records controller-executable compliant actions, rather than copying either force-blind operator commands or the robot's constrained observed motion.
- Its five-task mean is 83%, based on 83 successes in 100 rollouts. T-Rex records 35/100, GR00T with appended tactile features 22/100 and unmodified GR00T 15/100 under the paper's protocol.
- The study uses 100 demonstrations per task on one dual-UR5, dual-Sharpa-hand platform. A November 4 source check found public code and sample metadata; the full demonstration corpus and HACo checkpoints remain unverified.

## What changed

Contact creates a supervision problem. A nominal teleoperation command preserves the operator's intent but can keep pushing after an object blocks motion. The measured robot configuration has the opposite defect: it records what physically happened but omits the command-state offset that maintained force.

HACo's data-collection controller regulates the arm through Cartesian admittance and adjusts hand references using fingertip force. It saves the resulting compliant arm and hand targets as executable actions. For the hand, the difference between compliant commands and observed joint positions becomes an auxiliary “compliant intent” target. The model therefore learns both the executable motion reference and evidence of the blocked motion that generated contact load. [Method details](https://arxiv.org/html/2609.36596v1).

The haptic encoder has two inputs. Ten fingertip tokens combine a short history of local wrench readings with current deformation maps. A second stream embeds 44 joint-torque values. Finger and joint identity preserve the hand's kinematic structure before gated cross-attention lets action tokens query the haptic representation. HACo predicts motion references, not explicit target forces.

## A benchmark built around force-sensitive failure

The real-world benchmark covers inserting one playing card into another hand's grasp, opening a book to an interior page, drawing on a balloon, unscrewing a bottle cap and squeezing toothpaste onto a brush. Each method gets 20 physical trials on every task. HACo records 18, 17, 14, 19 and 15 successes, for 83/100 overall.

The strongest comparison method, T-Rex, totals 35/100. Its best tasks are cap removal and toothpaste, where sustained load dominates; the paper argues that its cached visual context and tactile-only refinement may be less responsive to abrupt force transitions. GR00T improves from 15% to 22% when tactile features are simply concatenated, well below HACo's action-aligned haptic fusion.

Ablations separate the ingredients. Removing all haptic input lowers the mean from 83% to 27%. Tactile-only input reaches 68%, joint torque alone reaches 45%, and using both without their coupled encoding reaches 70%. Removing compliant-intent supervision produces 73%; additionally replacing compliant actions with nominal commands lowers it to 59%. This is a cumulative ablation, not a separate estimate of the action representation alone. The full method also reports 19% lower mean fingertip force than the nominal-action variant over contact-active samples.

## What this means for robotics

RoboSkin analysis: the useful contribution is the link between sensing and action semantics. More touch channels alone do not tell a model how to yield, maintain traction or stop loading a fragile surface. HACo structures both the demonstrations and the policy so that contact evidence can change an executable motion reference.

The baseline comparison still needs care. HACo and the GR00T variants inherit GR00T N1.7 pretraining, while T-Rex and ViTacFormer have different architectures and pretraining. The table is a system-level comparison, not a controlled proof that one fusion block alone creates the 48-point gap. The within-HACo ablations give cleaner evidence for the value of coupled haptic input and compliant targets.

## Limitations and availability

HACo is an arXiv v1 preprint, and RoboSkin.ai has not reproduced it. The study uses one robot configuration, 100 task-specific demonstrations per task and no reported confidence intervals. It also depends on force-regulated teleoperation. The authors identify limited whole-hand coverage as an open problem because palm and phalange contacts must be inferred indirectly from joint torque.

The [official project page](https://opendrivelab.github.io/Haco-Page/) includes task videos, exact rollout counts, ablations and documented failures. The September 30 check found its Code control disabled. On November 4, the page links the [public HACo repository](https://github.com/OpenDriveLab/HACo). At commit [44a3fb4](https://github.com/OpenDriveLab/HACo/tree/44a3fb4607bea9ba9353a722ac6a3405ce3318f1), we inspected README, license and sample metadata, not executable behavior or binary payloads. The root code license is Apache-2.0; that does not establish the terms of pretrained checkpoints, all data or third-party dependencies. The README requires GR00T N1.7 and Cosmos Reason2 assets. Full training data and HACo weights were not verified.

## What crosses the controller boundary?

The compliant-intent difference between commanded and observed joints is an auxiliary training target; it is not an extra offset to add to the executed action. HACo already predicts the compliant motion reference. Adding the residual again would change the method. The hand regulator's virtual gain is also not a measurement of an object's material stiffness. [Paper method](https://arxiv.org/html/2609.36596v1). For a broader data comparison, the [tactile dataset directory](/datasets) separates released subsets from paper-described collections.

The public [sample metadata](https://github.com/OpenDriveLab/HACo/blob/44a3fb4607bea9ba9353a722ac6a3405ce3318f1/dataset/sample/meta/info.json) describes one episode, 60 frames at 30 Hz: a two-second clip, not 60 demonstrations. Its 150 action fields include wrist targets, observed joints, compliant joints and their differences. The README's inference adapter returns compliant joint targets for execution; the storage vector is not a 150-dimensional motor command. We have not downloaded or replayed the sample payload.

Before adapting it, write down which fields supervise learning, which feed inference and which reach the controller. Then specify coordinate frames, units, saturation and stale-command handling for your hardware. This is a proposed integration check, not a validated HACo deployment. Compare these roles in the [tactile manipulation control interface](/tactile-manipulation#contact-information-and-command-interfaces).

## Sources and related resources

- [HACo arXiv v1, submitted September 29, 2026](https://arxiv.org/abs/2609.36596)
- [Full architecture, protocol and limitations](https://arxiv.org/html/2609.36596v1)
- [Official project page, videos and result tables](https://opendrivelab.github.io/Haco-Page/)
- [RoboSkin robot-hands overview](/robot-hands)
- [RoboSkin visuo-tactile learning guide](/visuo-tactile)

*Evidence review updated November 4, 2026. The original paper and article dates are retained; source inspection is not a RoboSkin.ai reproduction.*
`,
  },
  {
    id: 'single-element-tackiness-tactile-sensor',
    title: 'A single-element tactile sensor separates pressure from tackiness',
    seoTitle: 'Single-Element Tactile Sensor Measures Tackiness',
    seoDescription: "Interpret a Hall sensor’s compression and pull-off signals; distinguish peak stress, separation work, scripted handling and replacement calibration.",
    excerpt: 'A soft magnet and one Hall sensor generate opposite-polarity signals for compression and pull-off, enabling continuous pressure and tackiness tracking.',
    category: 'Electronic skin hardware',
    image: '/generated/news/single-element-tackiness-tactile-sensor.png',
    imageAlt: 'Cross-section diagram of a Hall-effect tactile sensor bending inward under pressure and outward during adhesive pull-off.',
    imageCaption: 'Original RoboSkin.ai schematic of the reported magneto-mechanical sensing principle. It is not an experimental image or calibrated plot.',
    sourceTitle: 'A robust single-sensing-element tactile sensor for concurrent pressure and tackiness detection with real-time signal decoupling capability',
    sourceUrl: 'https://arxiv.org/abs/2609.36558',
    sources: [
      { title: 'Pressure-and-tackiness sensor arXiv v1 record', url: 'https://arxiv.org/abs/2609.36558' },
      { title: 'Full pressure-and-tackiness sensor v1 PDF', url: 'https://arxiv.org/pdf/2609.36558' },
    ],
    technicalFocus: ['tackiness sensing', 'Hall-effect tactile sensor', 'electronic skin', 'bidirectional force sensing'],
    sourceDate: '2026-09-29',
    evidenceStatus: 'Preprint · arXiv v1 · laboratory sensor characterization and scripted robot demonstrations · no implementation files verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-30',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# A single-element tactile sensor separates pressure from tackiness

Researchers at Sun Yat-sen University and Helmholtz-Zentrum Dresden-Rossendorf released a single-element tactile sensor for concurrent pressure and tackiness measurement on September 29, 2026. A soft magnet moves toward one Hall sensor during compression and away from it during adhesive pull-off, putting the two force directions on opposite sides of a stable electrical baseline. The authors report ranges of 0–150 kilopascals for pressure and 0–33 kilopascals for outward pulling stress. [Paper and version record](https://arxiv.org/abs/2609.36558).

## Key takeaways

- One magnet and one Hall element track inward pressure and outward pull-off at the same contact location; signal polarity separates the two modes without a learned decoder.
- Reported response/recovery times are 33.2/33.5 milliseconds for pressure and 21.8/10.3 milliseconds for outward pull-off under the paper's laboratory setup.
- The sensor survives more than 50,000 cycles near 63 kPa pressure and repeated robot touch tests, but the authors say its replaceable upper layer can still fail under large pull-off loads.

## What changed

Tackiness is not the same as friction or normal pressure. Measuring it requires monitoring the whole press-and-retract sequence: contact pressure, dwell time, retraction speed, peak pull-off stress and sometimes the energy dissipated before separation. Stacking separate sensing layers can introduce cross-talk, while a pressure-only skin loses the tensile half of the interaction.

The reported device uses an elastic polydimethylsiloxane structure. A 0.3-millimeter membrane carries a soft neodymium-iron-boron/PDMS magnet above a fixed Hall sensor. Compression reduces their distance and raises the measured magnetic signal; adhesive pull-off bulges the surface outward and lowers it. A PDMS-filled melamine sponge extends the pressure range by adding compressive resistance. [Design and experiments](https://arxiv.org/pdf/2609.36558).

This is a single-point prototype, not a spatial skin array. Its value is the shared transducer and baseline-separated waveform. The researchers vary membrane support height and magnet thickness to trade sensitivity against range, then choose a configuration that accommodates both compression and tensile deformation.

## Characterization and robot demonstrations

The optimized sensor covers 0–150 kPa compression and 0–33 kPa pull-off stress. The paper reports a stable no-load baseline over ten hours, more than 50,000 loading/unloading cycles at roughly 63 kPa and 5,000 pull-off trials. Hammer strikes did not damage the tested device or erase its ability to detect a lightly contaminated finger. These are author-run laboratory tests, not a standardized independent durability certification.

The response-time test uses a 6-volt sensor supply, while most characterization uses 5 volts and robot demonstrations use 2 volts. That matters because the paper also notes that sensitivity changes with supply voltage. Range and timing figures should therefore be read as properties of the reported configurations, not universal ratings for every integration.

For manipulation, the team mounts the sensor on a two-finger electric gripper attached to a commercial arm. Scripted grasps distinguish a clean bottle from one carrying double-sided tape: the contaminated object produces a pull-off signal, after which the authors clean the bottle before handling it again. They also describe opening and closing the gripper to weaken adhesion when cleaning is unavailable. This does not demonstrate an autonomous policy that locates a clean grasp area. A separate robot-hand demonstration touches seven PDMS samples with different base-to-crosslinker ratios. Three runs reproduce their tackiness order at fast retraction speed.

## What this means for robotics

RoboSkin analysis: the device adds a contact property that most [electronic skins](/e-skin) do not expose. A gripper may need to know not only that contact exists but whether a lightweight object will remain attached after opening. The opposing-polarity signal is also attractive for embedded systems because separation does not depend on a complex multimodal inference model.

Pull-off amplitude is not a complete material label, however. At slower separation speeds, the stickiest PDMS sample produces a lower peak than expected but the greatest separation energy. The paper concludes that integrating the full force-distance curve can be more accurate than ranking surfaces by peak pull-off alone. Robot software would therefore need controlled contact conditions or richer temporal features for reliable material comparison.

## Limitations and availability

This work is an arXiv v1 preprint, and RoboSkin.ai has not reproduced it. Robot motions are predefined, and the manuscript does not report repeated end-to-end task success rates. The present device is one sensing element with commercial Hall packaging. The authors describe miniaturization and arrays as future work.

Large adhesive loads can damage the upper structure despite its compression durability; replacement is possible, but the design is not yet maintenance-free. The arXiv record and manuscript were accessible during verification, while the November 4 review of those sources identified no official project page, fabrication repository, CAD package, raw dataset or implementation license.

## Define adhesion measurement and successful release separately

Signal polarity answers a narrower question than material identification: whether the structure is compressed or pulled outward relative to its baseline. Converting that signal to stress requires the tested calibration and contact geometry. The paper’s sensor-selection study also reports the best of three devices for a range comparison; that is not a manufacturing-yield result. [Characterization and selection protocol](https://arxiv.org/pdf/2609.36558).

For an adhesive-part handling trial, keep four records separate:

| Record | What to hold fixed or measure | What it establishes |
| --- | --- | --- |
| Contact preparation | Surface condition, contact area, preload and dwell | Whether two pull-off trials are comparable |
| Retraction | Displacement and speed alongside calibrated load | Peak pull-off and force–distance work, which can rank samples differently |
| Release | Independent observation of complete separation and final part location | Whether opening the gripper actually released the object |
| Reset | No-load baseline, supply voltage and upper-layer condition | Whether the next reading uses a comparable sensor state |

These are proposed acceptance records, not additional author experiments. A voltage–time integral is not automatically separation energy, and a large compression-cycle count does not establish survival under large adhesive loads. After replacing the upper layer, repeat the relevant calibration before comparing material labels or setting control thresholds. Use the [gripper contact-evidence framework](/robot-grippers#contact-evidence) to distinguish a useful release signal from a complete manipulation result.

## Sources and related resources

- [Sensor arXiv v1, submitted September 29, 2026](https://arxiv.org/abs/2609.36558)
- [Full fabrication, characterization and robot tests](https://arxiv.org/pdf/2609.36558)
- [RoboSkin electronic-skin guide](/e-skin)
- [RoboSkin tactile sensor directory](/sensors)

*Source review updated November 4, 2026. Original publication dates are retained. Experiments are attributed to their authors; RoboSkin did not reproduce the hardware, execute the models or inspect downloaded experimental payloads.*
`,
  },
  {
    id: 'wrench-act-direct-wrench-control-manipulation',
    title: 'Wrench-ACT makes force and torque the robot policy action',
    seoTitle: 'Wrench-ACT Uses Direct Wrench Actions for Manipulation',
    seoDescription: "Review Wrench-ACT wrench inputs and outputs, operator-assisted peg setup, task results, policy/controller rates and limits of force-based evaluation.",
    excerpt: 'Wrench-ACT pairs force-reflecting bilateral demonstrations with an ACT policy that directly commands a six-dimensional target wrench.',
    category: 'Force-control learning',
    image: '/generated/news/wrench-act-direct-wrench-control-manipulation.png',
    imageAlt: 'Diagram of bilateral force-feedback demonstrations training an ACT policy that outputs a six-dimensional wrench to a force controller.',
    imageCaption: 'Original RoboSkin.ai schematic of Wrench-ACT data collection and control. It is explanatory artwork, not an experimental figure.',
    sourceTitle: 'Wrench-ACT: Enhancing Robot Policies for Contact Rich Behavior Using Direct Wrench Control',
    sourceUrl: 'https://arxiv.org/abs/2609.37552',
    sources: [
      { title: 'Wrench-ACT arXiv v1 record', url: 'https://arxiv.org/abs/2609.37552' },
      { title: 'Full Wrench-ACT v1 paper', url: 'https://arxiv.org/html/2609.37552v1' },
    ],
    technicalFocus: ['direct wrench control', 'force-feedback teleoperation', 'contact-rich manipulation', 'imitation learning'],
    sourceDate: '2026-09-29',
    evidenceStatus: 'Preprint · arXiv v1 · five UR5e tasks · 50 rollouts per task-policy pair · demonstration release promised, not verified public',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-30',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# Wrench-ACT makes force and torque the robot policy action

Researchers from Siemens and the University of Technology Nuremberg released Wrench-ACT on September 29, 2026. The system modifies the usual imitation-learning contract: instead of predicting a target position and letting controller error create contact force, its Action Chunking with Transformers policy outputs a six-dimensional force/torque wrench directly. With matching force-reflecting demonstrations, it averages 76.8% success across five contact-rich tasks versus 40% for a position-policy baseline. [Paper and version record](https://arxiv.org/abs/2609.37552).

## Key takeaways

- Direct wrench output works best only when the demonstrations contain intentional wrench commands. Converting ordinary position demonstrations into approximate wrenches averages 28.8% in the same action space.
- The main table evaluates four collection/action combinations on five tasks with 50 rollouts each: 1,000 physical evaluation rollouts in total.
- The paper promises more than 1,000 wrench-action demonstrations on a companion site upon publication, but no public companion URL, archive or license was verified with the v1 release.

## What changed

Position policies command where the tool should go. During contact, a Cartesian impedance controller turns the pose error into force. That is useful but indirect: two identical target poses can produce very different interaction loads as geometry and stiffness change.

Wrench-ACT removes the pose target from the learned action. Three RGB streams, measured follower wrench, robot position and velocity, and gripper state enter a single-task ACT model. Its seven-dimensional output contains a six-axis target wrench plus the gripper command. The inner robot controller runs at 500 Hz, policy inference near 50 Hz, and observations are collected at 60 Hz. The force-mode interface retains velocity damping; the learned wrench is not a direct motor-torque command. The latest policy target is held between predictions. [Method and controller](https://arxiv.org/html/2609.37552v1).

Data collection is the other half of the design. In the bilateral setup, a human pushes a leader arm and feels the follower's reaction. The measured leader wrench becomes the action label. A second dataset uses a Meta Quest position interface and Cartesian impedance control. The authors also translate each dataset into the opposite action representation, producing four policy conditions that separate the collection interface from the learned output.

## Results and the matched-data effect

The five tasks are peg insertion, fuse clipping, fan insertion, industrial-connector mating and pen writing. In the peg setup, a person holds the peg to ensure grasp acquisition; the transfer and insertion phases are autonomous. The peg result therefore does not measure autonomous pickup-to-insertion. Bilateral data plus wrench output records 74%, 88%, 58%, 80% and 84%, averaging 76.8%. The conventional VR-data/position-action condition records 6%, 96%, 8%, 12% and 78%, averaging 40%.

That headline average hides two qualifications. Wrench-ACT is lower on fuse clipping, 88% versus 96%, and only three task differences are statistically significant after the paper's multiple-comparison correction: peg, fan and industrial-connector insertion. Pen writing and fuse clipping do not establish a significant advantage.

The cross-condition table is more revealing. A wrench policy trained on wrenches reconstructed from VR position trajectories averages 28.8%. A position policy derived from bilateral wrench data averages 34.8%. The strongest outcome appears when the interface and action agree: humans deliberately command force, and the policy predicts the same quantity.

An inference-rate ablation on the industrial connector reports 80% at 50 Hz, 36% at 30 Hz, 20% at 15 and 5 Hz, and 12% at 1 Hz. The nominal result uses 50 trials; each reduced-rate condition uses 25. When the paper support under the pen is raised 2.5 centimeters, the bilateral-wrench policy falls from 84% to 76%, while the VR-position policy falls from 78% to 24%.

## What this means for robotics

RoboSkin analysis: Wrench-ACT is evidence for aligning a [teleoperation](/robot-teleoperation) interface with the quantity a policy must control. Merely logging a force/torque sensor alongside position commands does not mean the dataset contains deliberate force strategy. For contact-rich data, action provenance matters as much as the presence of force channels.

Direct wrench control is not a universal replacement for pose actions. The authors deliberately choose tasks where interaction force is central, and they state that incidental-contact tasks may not benefit. The system also depends on a capable inner force loop and a mechanically compliant setup; the learned policy is only one layer of the control stack.

## Limitations and availability

Wrench-ACT is an arXiv v1 preprint, and RoboSkin.ai has not reproduced it. All experiments use one UR5e-based setup and single-task models trained from scratch. Datasets contain 200–300 episodes per task and interface, but operator count is not stated. The force-reflecting collection rig is substantially more specialized than common handheld or VR capture systems.

The v1 introduction and abstract promise demonstrations upon publication, while its conclusion describes a release alongside the work. The November 4 arXiv record check did not resolve a concrete companion archive or its terms. Public payload, code, checkpoints and reuse licenses remain unverified; neither sentence alone proves access.

## Record assistance and outcome alongside force

Low force can mean that the task was never completed. The paper summarizes a high-percentile force from each rollout, and discusses low-force fan failures that did not finish insertion. That statistic is not a damage test or a general safety result. [Evaluation details](https://arxiv.org/html/2609.37552v1).

For a comparison on your task, keep three records together: who established the initial grasp; whether the required insertion, release or writing outcome occurred; and the force trace with units, reference frame and timestamps. Declare any reset or intervention before counting a trial. Keep the measured wrench, demonstrated target wrench and controller-adjusted command in separate fields.

This proposed review prevents an easier starting condition or an incomplete low-force attempt from looking like improved manipulation. It does not add tests to the authors' study. Use the [control-interface comparison](/tactile-manipulation#contact-information-and-command-interfaces) before choosing a demonstration format.

## Sources and related resources

- [Wrench-ACT arXiv v1, submitted September 29, 2026](https://arxiv.org/abs/2609.37552)
- [Full controller, tasks and cross-condition results](https://arxiv.org/html/2609.37552v1)
- [RoboSkin guide to robot manipulation](/robot-manipulation)
- [RoboSkin Physical AI and touch guide](/physical-ai-touch)

*Evidence review updated November 4, 2026. The original paper and article dates are retained; source inspection is not a RoboSkin.ai reproduction.*
`,
  },
  {
    id: 'univlat-whole-body-tactile-vla-humanoid',
    title: 'Uni-VLaT gives humanoid VLA policies whole-body touch',
    seoTitle: 'Uni-VLaT Whole-Body Tactile VLA for Humanoids',
    seoDescription: "Trace Uni-VLaT sensor channels, pooled tokens, action chunks and 500 Hz control; review checkpoint selection, participant coverage and tactile limits.",
    excerpt: 'Uni-VLaT adapts pretrained humanoid VLA policies with textile electronic skin across eight body regions and predicts future touch, body state and visual features during training.',
    category: 'Whole-body tactile learning',
    image: '/generated/news/univlat-whole-body-tactile-vla-humanoid.png',
    imageAlt: 'Diagram of eight tactile regions on a humanoid feeding a VLA policy and three future-representation prediction heads.',
    imageCaption: 'Original RoboSkin.ai schematic of Uni-VLaT whole-body tactile adaptation. It is explanatory artwork, not an experimental image.',
    sourceTitle: 'Uni-VLaT: Whole-Body Tactile Adaptation of VLA Policies for Humanoid Loco-Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2609.35450',
    sources: [
      { title: 'Uni-VLaT arXiv v1 record', url: 'https://arxiv.org/abs/2609.35450' },
      { title: 'Full Uni-VLaT v1 paper', url: 'https://arxiv.org/html/2609.35450v1' },
      { title: 'Official Uni-VLaT project page', url: 'https://ggkiller-air.github.io/Uni-VLaT/' },
    ],
    technicalFocus: ['whole-body tactile sensing', 'humanoid VLA adaptation', 'electronic skin', 'loco-manipulation'],
    sourceDate: '2026-09-28',
    evidenceStatus: "Preprint · arXiv v1 · five real-robot tasks · project media reviewed · implementation and weights unverified",
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-29',
    updated: "2026-11-04",
    readTime: "6 min read",
    content: `# Uni-VLaT gives humanoid VLA policies whole-body touch

Researchers from Tsinghua University, Beihang University, the Communication University of China and the University of Hong Kong released Uni-VLaT on September 28, 2026. The method adapts pretrained vision-language-action policies to a Unitree G1 humanoid with distributed textile electronic skin, then uses touch as an anchor for predicting future tactile, proprioceptive and visual representations. In five real-robot tasks, the authors report a 75% average success rate. [Paper and version record](https://arxiv.org/abs/2609.35450).

## Key takeaways

- Uni-VLaT reaches 75% average success over five tasks, versus 32% without tactile input, 68% with touch but no prediction and 69% with tactile-only prediction.
- The main Isaac-GR00T comparison uses 20 physical rollouts per task and configuration, with 289 retained demonstrations across five tasks; the separate pi-0.5 comparison uses 10 rollouts per task and configuration.
- The tactile system covers eight torso, shoulder, back and arm regions. Its values are pressure-related ADC readings in arbitrary units, not calibrated force measurements.

## What changed

Appending touch to a VLA policy does not guarantee that the model connects contact with body motion and scene change. Uni-VLaT encodes a four-frame tactile history into eight learned tokens, mixes those tokens with proprioceptive and action tokens inside the policy, and adds three training-only heads. Those heads predict four future tactile, proprioceptive and visual representations.

The deployed system keeps the tactile pathway and action generator but discards the predictive heads. A pretrained SONIC controller converts each generated 64-dimensional motion token into coordinated whole-body commands. The vision-language model stays frozen while the action expert, state encoder and tactile modules are fine-tuned. [Method details](https://arxiv.org/html/2609.35450v1#S4).

The hardware is a Unitree G1 with stereo RGB, proprioception and custom JQ Industries textile electronic skin. Sensors cover the chest, central back, both shoulders, both upper-back regions and both arms. Circumferential sleeve readings are pooled to reduce sensitivity to sleeve rotation, which also reduces the spatial detail available around the arm.

## Results under the reported conditions

With Isaac-GR00T as the policy backbone, the no-touch baseline averages 32% across Back-Tap Walking, Table Sweeping, Basket Loading, Human-Robot Hugging and Composed Cleanup. Adding tactile input without prediction raises the average to 68%. Tactile-only future prediction reaches 69%, and the complete three-modality objective reaches 75%.

The task breakdown matters. Back-Tap Walking rises from 0% without touch to 85% with Uni-VLaT because contact itself is the instruction to walk or stop. Table Sweeping rises from 45% to 75%, while Basket Loading rises from 30% to 80%. Human-Robot Hugging reaches 80%, and the three-stage Composed Cleanup task reaches 55%. Each headline percentage in the main table corresponds to 20 real-robot rollouts. [Evaluation table](https://arxiv.org/html/2609.35450v1#S5.SS3).

The cross-backbone study reports the same directional gains with pi-0.5: 0% to 90% on Back-Tap Walking, 30% to 60% on Table Sweeping and 30% to 60% on Basket Loading. Those configurations use ten rollouts, so their percentage resolution is ten points. A from-scratch diffusion-policy baseline is not assigned a success rate because three checkpoints failed the authors' SONIC pre-execution safety screen.

## What this means for robotics

RoboSkin analysis: whole-body tactile sensing changes what a humanoid can observe, especially when contact is broad, occluded or outside the hands. The important result is not merely the 43-point gap over the no-touch baseline. The smaller 7-point gap over touch without prediction suggests that most of the gain comes from making contact directly observable, while multimodal future supervision adds a further task-dependent benefit.

For teams building [electronic skin](/e-skin) systems, the study also illustrates a practical representation choice: divide the body into stable regions, preserve temporal change, and avoid treating every taxel as an interchangeable flat vector. The trade-off is that pooling and arbitrary-unit readings do not yield calibrated forces or fine contact mechanics.

## Limitations and availability

Uni-VLaT is an arXiv v1 preprint, and RoboSkin.ai has not reproduced it. Evaluation uses one humanoid, five tasks and about 50 demonstrations per task. The paper reports rollout counts but not confidence intervals. Results mix a discrete touch-triggered behavior with sustained manipulation, so the five-task average should not be read as one uniform capability measure.

The original September 29 review found coming-soon text on the [official project page](https://ggkiller-air.github.io/Uni-VLaT/). The November 4 recheck found paper and task media, but did not verify an implementation, dataset, checkpoint or software license. The earlier placeholder text should not be treated as the current release status. The arXiv manuscript license does not grant rights to unreleased implementation assets.

## A fast joint controller does not make the VLA a fast tactile reflex

The appendix distinguishes several clocks and representations. There are 624 effective sensing channels, pooled across eight body regions into eight learned tokens. These are not interchangeable counts. Four tactile frames synchronized at 50 Hz span 60 ms; the future-prediction targets are training supervision, not future observations supplied at runtime. [System and deployment details](https://arxiv.org/html/2609.35450v1).

| Layer | Reported behavior | Interpretation boundary |
| --- | --- | --- |
| Tactile acquisition | Nominal 100 Hz acquisition, synchronized to a 50 Hz stream | Arbitrary-unit values do not establish calibrated contact force |
| VLA output | 40 motion tokens, spanning 0.8 seconds at 50 Hz | This is a predicted action horizon, not an inference-frequency claim |
| New model request | Roughly 0.4 seconds after the preceding result; elapsed prefixes are skipped | Actual observation age also depends on inference and scheduling |
| Low-level control | 500 Hz controller | This does not mean the VLA or its tactile reasoning runs at 500 Hz |

The physical G1 has no dexterous hands in this study; hand-state placeholders maintain an interface rather than document actuated fingers. Sleeve pooling also loses circumferential detail while retaining axial information. These choices should be checked against a new task before treating the model as a drop-in whole-body skin controller.

Evaluation design matters as much as timing. All retained demonstrations are used for training without a separate validation split, and checkpoint selection uses physical rollout performance. A new study should predefine checkpoint selection and hold out participants, mounts and scenes. The hugging task uses one training participant and two evaluation participants; it does not establish safe contact forces. Cleanup's stage score must also remain separate from binary full-task completion. See the [humanoid evaluation map](/humanoid-robots#observation-planning-control) for a record connecting sensing, action and outcome.

## Sources and related resources

- [Uni-VLaT arXiv v1, submitted September 28, 2026](https://arxiv.org/abs/2609.35450)
- [Full method, task definitions and results](https://arxiv.org/html/2609.35450v1)
- [Official project page and real-robot videos](https://ggkiller-air.github.io/Uni-VLaT/)
- [RoboSkin guide to tactile manipulation](/tactile-manipulation)

*Source review updated November 4, 2026. Original publication dates are retained. Results are reported by the authors; RoboSkin has not run these systems.*
`,
  },
  {
    id: 'uvta-human-tactile-demonstrations-dexterous-manipulation',
    title: 'UVTA scales dexterous policies with human tactile demonstrations',
    seoTitle: 'UVTA Human Tactile Data for Dexterous Manipulation',
    seoDescription: "Review UVTA per-task co-training, staged scores and the public 5,749-episode manifest; separate code and data licenses, auxiliary touch targets and deployment.",
    excerpt: "UVTA co-trains human and robot vision-touch-action data with a separate policy for each task. The public release now has code and a dataset manifest, with limits distinct from the paper corpus.",
    category: 'Human tactile data',
    image: '/generated/news/uvta-human-tactile-demonstrations-dexterous-manipulation.png',
    imageAlt: 'Diagram of human tactile demonstrations and robot demonstrations entering a shared visual tactile action model.',
    imageCaption: 'Original RoboSkin.ai schematic of UVTA cross-embodiment co-training. It is explanatory artwork, not an experimental figure.',
    sourceTitle: 'Unified Visual-Tactile-Action Modeling from Human Demonstrations for Dexterous Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2609.34182',
    sources: [
      { title: "Public UVTA dataset manifest, inspected November 4", url: "https://huggingface.co/datasets/Chopper233/UVTA/blob/2c6f691a46482be6be51d876d3d5bc79194f1aa1/MANIFEST.json" },
      { title: 'UVTA arXiv v1 record', url: 'https://arxiv.org/abs/2609.34182' },
      { title: 'Full UVTA v1 paper', url: 'https://arxiv.org/html/2609.34182v1' },
      { title: 'Official UVTA project page', url: 'https://uni-vta.github.io/' },
      { title: 'Official UVTA repository link', url: 'https://github.com/uni-vta/UVTA' },
    ],
    technicalFocus: ['human tactile demonstrations', 'visual tactile action modeling', 'dexterous manipulation', 'cross-embodiment learning'],
    sourceDate: '2026-09-28',
    evidenceStatus: "Preprint · v1 · public code and dataset manifest inspected November 4 · 5,749 listed episodes · payloads and runtime unverified",
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-29',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# UVTA scales dexterous policies with human tactile demonstrations

Researchers from Shanghai Jiao Tong University, the Beijing Institute for General Artificial Intelligence, Sharpa Robotics and Beijing Institute of Technology released Unified Visual-Tactile-Action Modeling, or UVTA, on September 28, 2026. The system co-trains on human and robot interaction data so that large volumes of human touch can improve a robot policy without treating human joint motion as directly executable robot commands. [Paper and version record](https://arxiv.org/abs/2609.34182).

## Key takeaways

- The paper reports 1,000 human and 150 robot demonstrations per task, or 5,750 total. The currently published manifest instead lists 5,749 unique episodes; the release distinction is explained below.
- The full model averages 70% stage-wise success over 10 physical trials per task, compared with 29% for the strongest reported baseline and 42% without future-tactile prediction.
- The November 4 check found a public code repository and Hugging Face dataset metadata. We inspected their documentation and manifest, not archive contents, model weights or robot execution.

## What changed

UVTA starts with a wearable capture system: a passive 22-degree-of-freedom hand exoskeleton records finger motion, two VIVE trackers recover wrist pose, a wrist camera captures RGB and four force-sensing regions on each fingertip produce a 20-dimensional tactile vector. The authors map these human observations into the same numerical representation used by a 22-degree-of-freedom Sharpa Wave robot hand.

The model turns the current wrist image into a 384-dimensional visual token and the tactile input into a 20-dimensional token. Their concatenated 404-dimensional representation feeds a diffusion action head and a tactile regression head. Both human and robot sequences supervise the shared representation, but deployment decodes only robot actions. The future-tactile head is an auxiliary learning objective; its prediction is not a force target passed to the controller. [Architecture and dataset](https://arxiv.org/html/2609.34182v1#S3).

A separate policy is trained for each task. This is co-training rather than direct teleoperation transfer. Human hand actions still provide a learning signal, while embodiment-specific normalization and robot demonstrations teach the executable action space. Human and robot batches are sampled equally with replacement, not in proportion to their raw corpus sizes. The action head predicts 16 steps and executes eight before replanning from new visual and tactile observations.

## What the real-robot evaluation found

The five tasks are page flipping, bayonet light-bulb insertion, toggle-switch operation, tactile ball classification and liquid transfer. Every method receives the same wrist RGB, fingertip touch and right-arm/right-hand action space, and each result averages ten real-robot trials with randomized object positions or heights.

UVTA reports an unweighted average of 70%: 83% on page flipping, 80% on the light bulb, 88% on the toggle switch, 56% on ball classification and 44% on liquid transfer. The strongest baseline, T-Rex, averages 29%; RDP averages 14%, and ViTacFormer averages 1%. Removing the future-tactile head but retaining touch reduces the average to 42%, while the vision-only ablation reaches 26%. [Full comparison](https://arxiv.org/html/2609.34182v1#S5.SS2).

These are stage-wise scores, not purely binary task completion. For example, page turning assigns partial credit for separating pages or turning multiple pages before awarding full credit for turning exactly one. That scoring makes intermediate progress visible, but it also means the headline percentages should not be interpreted as 35 complete successes out of 50 trials.

The scaling experiment holds 150 robot demonstrations per task fixed and evaluates three tasks as human data grows. The average moves from 0% with no human trajectories to 8%, 29%, 51% and 84% with 250, 500, 750 and 1,000 human trajectories. The largest reported step occurs between 750 and 1,000, but only three of the five tasks are included in this scaling curve.

## What this means for robotics

RoboSkin analysis: UVTA treats human touch as representation supervision rather than pretending away the embodiment gap. That is valuable for [robot datasets](/datasets), because people can generate diverse contact sequences much faster than they can teleoperate a high-dimensional robot hand.

The study also shows why dataset totals need context. The 5,000 human demonstrations provide variety, while 750 robot demonstrations anchor executable behavior. Human data did not replace robot data in this experiment; it complemented it. The method therefore supports a hybrid scaling strategy, not a claim that tactile robot demonstrations are unnecessary.

## Limitations and availability

UVTA is an arXiv v1 preprint, and RoboSkin.ai has not reproduced it. Evaluation uses one fixed-base North robot, one Sharpa Wave embodiment and five tasks. Touch is measured only at four regions per fingertip, so palm contact, shear and distributed whole-hand pressure are not represented. Ten trials per task also make small score differences uncertain.

The September 29 review found the linked repository unavailable. On November 4, the [project page](https://uni-vta.github.io/) links a public [UVTA repository](https://github.com/uni-vta/UVTA) and [dataset page](https://huggingface.co/datasets/Chopper233/UVTA). At code commit 74f4270142cf3778a7103f04bbb922daa2597fd4, the root license is MIT; the dataset card separately states Apache-2.0. These declarations do not replace checks of bundled assets and third-party dependencies. No archives or checkpoints were downloaded, and no installation was performed.

## What the public release actually describes

Our read-only inspection of the [dataset manifest](https://huggingface.co/datasets/Chopper233/UVTA/blob/2c6f691a46482be6be51d876d3d5bc79194f1aa1/MANIFEST.json) found 28 tar shards totaling 482,351,124,480 listed bytes. Its unique episode IDs comprise 5,000 human and 749 robot episodes: page flipping has 149 robot episodes, while the other four tasks have 150 each. This verifies metadata counts, not successful extraction, payload integrity or policy compatibility.

The [release README](https://github.com/uni-vta/UVTA/tree/74f4270142cf3778a7103f04bbb922daa2597fd4) describes Zarr v2 episodes inside those archives. The 20-dimensional tactile field is already pooled fingertip data, not raw tactile images or a whole-hand pressure map. Pose observations, pose action targets, hand state and hand actions are separate fields. Hardware environment, kinematics and vendor SDK components are not included in the repository.

Before reuse, pin the code and dataset revisions, record the artifact-specific terms, and inspect a permitted sample's keys, units and episode boundaries. Reconcile training settings too: the manuscript describes 300 epochs, while the current README uses 500 for the light-bulb task. A live wrist pose still anchors relative action execution even though proprioception is excluded from the model's conditioning. None of these observations demonstrates a working installation. The [teleoperation data guide](/robot-teleoperation#contact-signal-roles) shows how to keep measured, mapped and auxiliary tactile signals distinct.

## Sources and related resources

- [UVTA arXiv v1, submitted September 28, 2026](https://arxiv.org/abs/2609.34182)
- [Full data, method and evaluation](https://arxiv.org/html/2609.34182v1)
- [Official UVTA project page](https://uni-vta.github.io/)
- [RoboSkin visuo-tactile learning guide](/visuo-tactile)

*Evidence review updated November 4, 2026. Original publication dates are retained. We inspected sources and public metadata; we did not run these robot systems or download their training archives.*
`,
  },
  {
    id: 'tacgoosebumps-shear-encoding-tactile-sensor',
    title: 'TacGooseBumps adds shear cues to normal-only tactile sensors',
    seoTitle: 'TacGooseBumps Shear Encoding for Tactile Sensors',
    seoDescription: "Assess TacGooseBumps surface geometry, clock alignment and damage criteria; shear-dependent patterns are distinct from calibrated force or retrofit reliability.",
    excerpt: 'TacGooseBumps retrofits ordinary pressure arrays with an electronics-free dome film that converts tangential loading into learnable spatial patterns.',
    category: 'Tactile sensor hardware',
    image: '/generated/news/tacgoosebumps-shear-encoding-tactile-sensor.png',
    imageAlt: 'Diagram showing tangential force tilting elastomer domes and redistributing pressure across a normal-only tactile array.',
    imageCaption: 'Original RoboSkin.ai schematic of the TacGooseBumps mechanical encoding principle. It is explanatory artwork, not a calibrated force diagram.',
    sourceTitle: 'TacGooseBumps (TacGB): Retrofitting Normal-Only Tactile Sensors with Shear Encoding for Learning Contact-Rich Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2609.34006',
    sources: [
      { title: 'TacGooseBumps arXiv v1 record', url: 'https://arxiv.org/abs/2609.34006' },
      { title: 'Full TacGooseBumps v1 paper', url: 'https://arxiv.org/html/2609.34006v1' },
    ],
    technicalFocus: ['shear encoding', 'tactile sensor retrofit', 'contact-rich imitation learning', 'electronic skin'],
    sourceDate: '2026-09-27',
    evidenceStatus: 'Preprint · arXiv v1 · four physical robot tasks · no official code, CAD, dataset or software license verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-29',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# TacGooseBumps adds shear cues to normal-only tactile sensors

University of California, Berkeley researchers released TacGooseBumps, or TacGB, on September 27, 2026. TacGB is a removable film of elastomeric domes that sits on an existing normal-pressure array. Tangential loading tilts each dome and redistributes pressure across neighboring taxels, giving a learned policy repeatable shear-dependent patterns without new electronics or explicit force reconstruction. [Paper and version record](https://arxiv.org/abs/2609.34006).

## Key takeaways

- On USB insertion, the bare pressure array succeeds in 15 of 20 rollouts, versus 19 of 20 with an off-the-shelf TacGB layer and 18 of 20 with molded domes.
- On bayonet light-bulb insertion, success rises from 15 of 25 to 24 of 25; the 36-percentage-point gain is measured over 20 nominal and five out-of-distribution trials.
- TacGB does not measure calibrated shear force. It mechanically encodes tangential interaction into a pressure-map pattern that an end-to-end policy may learn.

## What changed

Many thin electronic skins primarily report normal pressure. Adding true multi-axis sensing usually requires co-designed structures, electronics and calibration. TacGB instead changes the surface above an existing array. Each dome spans several taxels; shear causes a leading-edge increase and trailing-edge decrease in the native pressure map.

The team tests both molded domes and inexpensive cabinet bumpers. Neither variant needs one-to-one dome-to-taxel registration. Policies receive the same kind of pressure-map tensor as before, so the retrofit changes the observation physics without requiring a new electrical interface. [Mechanical design](https://arxiv.org/html/2609.34006v1#S3).

Two collection pipelines test the idea. USB and light-bulb insertion use a FANUC LR Mate arm, a rigid gripper and a 32-by-32 commercial capacitive array. Egg transfer and whiteboard drawing use a handheld iPhUMI setup with 12-by-32 open-source FlexiTac arrays and a compliant robot gripper.

## Results beyond binary success

For USB insertion, the researchers collect 100 demonstrations for each of three surfaces: bare, off-the-shelf TacGB and molded TacGB. Each policy receives the same 20 deployment initializations. Success is 75%, 95% and 90% respectively. Mean time among successful trials decreases from 29.3 seconds to 27.1 and 26.7 seconds. A surface-only control, where the robot wears the domes but the policy does not receive their pressure maps, does not reproduce a consistent gain: the three vision-only surface conditions report 60%, 65% and 55% success.

For the bayonet light bulb, the off-the-shelf layer raises total success from 15/25 to 24/25. Nominal trials improve from 13/20 to 20/20, while the five changed-height/free-rotation trials improve from 2/5 to 4/5. Those five out-of-distribution episodes are too few for a stable standalone percentage, so the article preserves the counts. [Insertion evaluation](https://arxiv.org/html/2609.34006v1#S4).

Egg transfer exposes a limitation of binary success. Both policies complete 25/25 rollouts, yet two of the five repeatedly used eggs in the bare-sensor condition develop visible cracks. Each egg receives five trials, so this is not a count of two failures among 25 independent fresh objects. An external cup sensor—not an input to the policy—shows mean peak readout falling 66%, from 0.77 to 0.26, while mean contact-transfer duration rises from 0.99 to 3.84 seconds with TacGB. These readings are an external load proxy, not calibrated impact force.

On whiteboard drawing, each policy is evaluated over 20 rollouts. TacGB improves ink coverage and reduces perpendicular path deviation in this setup. Its pressure map is tared during the first three seconds with the marker already held, so the resulting signal is not absolute grasp force.

## What this means for robotics

RoboSkin analysis: TacGB demonstrates a useful middle layer between sensor hardware and learned representation. If a policy needs a repeatable cue rather than a calibrated wrench, mechanical preprocessing may be cheaper than redesigning the sensor stack. This is particularly relevant to [robot skin](/robot-skin) systems where thickness, wiring and integration time are hard constraints.

The engineering caveat is equally important. Pattern separability can help a policy while remaining unsuitable for safety limits, force control or comparison across sensors. A dome layer may also change friction and compliance; the paper's surface-only controls reduce that concern for the tested tasks but do not eliminate it across materials and geometries.

## Limitations and availability

TacGooseBumps is an arXiv v1 preprint, and RoboSkin.ai has not reproduced it. Repeated deployment rollouts reuse a trained policy and therefore do not measure variability across independently trained seeds. The authors explicitly call for studies that vary dome geometry, material and layout while separating training, object and rollout variation.

The November 4 source review did not verify an official project page, public code repository, CAD or mold files, training data, checkpoints or software license. The paper demonstrates off-the-shelf and lab-made surfaces, but it does not yet provide a packaged bill of materials or a calibrated shear-transfer function.

## A retrofit still changes the measurement and evaluation contract

Avoid treating unchanged electronics as unchanged sensing. The tested off-the-shelf and molded layers have different dome sizes and spacing; neither requires exact dome-to-taxel registration, but both change contact mechanics. Replacing a pad can therefore change the pressure patterns used by a policy even when its tensor shape is identical. The paper does not establish that an existing policy transfers unchanged to any replacement surface. [Design and collection methods](https://arxiv.org/html/2609.34006v1).

The handheld collection pipeline also aligns separately recorded phone and tactile streams using a single estimated time offset. That is different from shared-clock acquisition and does not by itself measure time-varying drift. Before reuse, document the dome revision, installation, sensor baseline, acquisition clocks and alignment residual around actual contact events.

| Task outcome | An incomplete criterion | A more informative acceptance record |
| --- | --- | --- |
| Insertion | Reaching the target pose | Seating, locking or connection, according to the task; the bulb study requires illumination and locking |
| Fragile transfer | Arriving at the destination | Damage per object, repeated-use history and contact duration alongside completed trials |
| Sustained contact | A lower pressure-map value | Tare conditions, coverage/path error and an independent load reference when force matters |

This is a proposed evaluation checklist. Surface friction, compliance, policy training and tactile input can all affect outcomes; an improvement on one task does not identify a calibrated shear-transfer function. Compare the [contact evidence required for a gripper](/robot-grippers#contact-evidence) before deciding whether encoded patterns are sufficient for the intended controller.

## Sources and related resources

- [TacGooseBumps arXiv v1, submitted September 27, 2026](https://arxiv.org/abs/2609.34006)
- [Full design, controls and four-task evaluation](https://arxiv.org/html/2609.34006v1)
- [RoboSkin tactile sensor guide](/sensors)
- [RoboSkin electronic-skin overview](/e-skin)

*Source review updated November 4, 2026. Original publication dates are retained. Experiments are attributed to their authors; RoboSkin did not reproduce the hardware, execute the models or inspect downloaded experimental payloads.*
`,
  },
  {
    id: 'dextag-tactile-guided-dexterous-retargeting',
    title: 'DexTaG uses human touch to guide dexterous policy retargeting',
    seoTitle: 'DexTaG Tactile-Guided Dexterous Retargeting',
    seoDescription: "Separate DexTaG human-touch rewards, simulated actor observations and tactile-free hardware control; review retry denominators and artifact-specific access.",
    excerpt: 'DexTaG records full-hand tactile maps during human tool use, rewards simulated robot contact patterns during retargeting and distills a vision-proprioception controller.',
    category: 'Dexterous policy learning',
    image: '/generated/news/dextag-tactile-guided-dexterous-retargeting.png',
    imageAlt: 'Diagram showing a tactile glove guiding simulated reinforcement learning before distillation to a tactile-free robot controller.',
    imageCaption: 'Original RoboSkin.ai schematic of the DexTaG training and deployment pipeline. It is explanatory artwork, not an experiment screenshot.',
    sourceTitle: 'DexTaG: Tactile-as-Guidance in Reinforcement Learning for Dexterous Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2609.33882',
    sources: [
      { title: 'DexTaG arXiv v1 record', url: 'https://arxiv.org/abs/2609.33882' },
      { title: 'Full DexTaG v1 paper', url: 'https://arxiv.org/html/2609.33882v1' },
      { title: 'Official DexTaG project page', url: 'https://dextag.github.io/' },
      { title: 'Official DexTaG MIT-licensed repository', url: 'https://github.com/UMass-Embodied-AGI/DexTaG' },
    ],
    technicalFocus: ['tactile-guided reinforcement learning', 'dexterous retargeting', 'human demonstrations', 'open-source robot learning'],
    sourceDate: '2026-09-27',
    evidenceStatus: "Preprint · v1 · root code MIT · data/checkpoint links documented · payloads, third-party terms and runtime unverified",
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-29',
    updated: "2026-11-04",
    readTime: "6 min read",
    content: `# DexTaG uses human touch to guide dexterous policy retargeting

Researchers from the University of Massachusetts Amherst and Genesis AI released DexTaG on September 27, 2026. DexTaG records human hand motion and a 24-by-32 tactile glove map, uses those contact patterns to shape reinforcement-learning retargeting in simulation, and then distills the result into a controller that runs on a real xArm7 and WUJI hand without tactile sensing. [Paper and version record](https://arxiv.org/abs/2609.33882).

## Key takeaways

- The dataset contains 100 marker-pen and 140 hammer demonstrations. One retargeter is trained across all trajectories for each object rather than fitting a separate policy to every demonstration.
- In the five-seed tactile-reward ablation, trajectory completion reaches 87.5% for the marker and 76.8% for the hammer, versus 24.7% and 27.6% without tactile rewards.
- The official MIT-licensed repository includes simulation training code and links to a 209 MB demonstration archive plus two 21 MB pretrained retargeters. Real-robot control code and student checkpoints are not described as released.

## What changed

DexTaG uses human tactile readings as training guidance, not as a sensor stream for the deployed robot. A WUJI glove records five electromagnetic fingertip poses, wrist motion and a full-hand pressure map. After background correction, the authors retarget the human motion to a robot reference and align glove regions with about 700 simulated tactile points on the WUJI robot hand.

The reinforcement-learning reward has two tactile components. One uses the recorded glove map to decide which fingertips should approach the object. The other compares normalized, smoothed simulated and human contact maps. Because the maps are independently normalized, the reward matches contact pattern rather than absolute force magnitude. [Tactile-guidance method](https://arxiv.org/html/2609.33882v1#S3.SS2).

A PPO retargeter learns marker and hammer tool use in Genesis. It observes the motion reference, simulated state, simulated tactile map and a future-reference window. Behavior cloning with DAgger then distills the teacher into a student that sees joint angles, a target object trajectory, a wrist-camera point cloud and recent proprioception/action history.

## Results and the retry denominator

Across five training seeds, the complete tactile reward reaches 87.5% plus or minus 4.0 points of trajectory completion on the marker, compared with 48.6% for geometry-gated contact and 24.7% without tactile rewards. On the hammer, the reported figures are 76.8% plus or minus 27.7, 29.9% plus or minus 5.5 and 27.6% plus or minus 0.1. One seed fails to acquire the hammer and completes only about 27% of the reference, contributing to the large variance. These percentages measure the fraction tracked before termination, not the fraction of fully successful trials. [Reward ablation](https://arxiv.org/html/2609.33882v1#S4.SS1).

OakInk2 does not supply the measured glove-touch references used in the two-tool study, so this scaling test does not establish the contribution of human tactile guidance. For OakInk2, DexTaG trains one policy per object and compares it with per-trajectory ManipTrans policies. Its trajectory-weighted completion is 67.5% with one reference and 67.2% with all references. ManipTrans with the WUJI hand falls from 58.5% to 30.0%. The compute budgets are not matched: each DexTaG policy trains for 24 hours and each ManipTrans policy for eight hours on an NVIDIA L40S. Sharing policies nevertheless reduces the authors' estimated aggregate training from 1,632 to 72 policy-hours across 204 trajectories.

Real-world reporting requires special care. The primary table evaluates 30 training-set references per object with up to three attempts each and keeps the furthest stage reached. Hammer pickup, functional grasp and placement are 22/30, 17/30 and 15/30. Marker figures are 21/30, 13/30 and 10/30. Per recorded attempt, full placement is 15/83 for the hammer and 10/86 for the marker. The best-of-three percentage measures recovery with limited retries, not single-attempt reliability.

## What this means for robotics

RoboSkin analysis: DexTaG offers a pragmatic answer to an embodiment mismatch. Human contact maps do not have to become robot tactile inputs; they can instead define what a plausible grasp should feel like during simulation training. That makes touch useful even when the deployed hand lacks sensors.

The limitation is feedback at runtime. After distillation, the controller has no direct tactile measurement of slip or unexpected contact, although visual and proprioceptive feedback may reveal their consequences, so the pipeline transfers a contact-informed behavior prior rather than delivering tactile closed-loop control. It complements, rather than replaces, sensorized [dexterous manipulation](/tactile-manipulation).

## Limitations and availability

DexTaG is an arXiv v1 preprint, and RoboSkin.ai has not reproduced it. The real-world references come from the training set, initial objects are manually placed and the headline physical result permits up to three attempts. The controller targets one xArm7-WUJI embodiment and two tools; adapting another hand requires new robot models, tactile mapping and retargeted demonstrations.

The [official repository](https://github.com/UMass-Embodied-AGI/DexTaG) is public. At the November 4 check, commit b4f5fd0f443969c02c1d6cde86de09c487d163b2 carries an MIT root code license. This does not automatically license the separately linked data, checkpoints or third-party assets. Its README links a 209 MB demonstration archive and 21 MB pretrained retargeters for both tools, and documents training, evaluation and distillation. The repository notes that the tactile simulator depends on a specific Genesis fork. Readers should separately verify Google Drive file access and licenses for bundled meshes or third-party assets before redistribution. The [tactile dataset directory](/datasets) compares these access and reuse conditions across related resources.

## Which tactile signal is removed in the ablation?

The ablation described as without tactile removes human-reference tactile rewards and privileged critic information. The actor still receives its current simulated tactile map. It is not a comparison between all touch and no touch. [Actor, critic and ablation definitions](https://arxiv.org/html/2609.33882v1).

| Stage | Contact information | Interpretation |
| --- | --- | --- |
| Human recording | Background-corrected glove measurements | A measured demonstration signal |
| Simulated retargeting | Penetration-derived contact estimates mapped to glove regions | A modeled contact pattern, not measured robot pressure |
| Reward and critic | Human reference and normalized correspondence | Guidance during training; normalization removes absolute-force equivalence |
| Physical student | Vision, proprioception/history and a supplied target object trajectory | No tactile sensor input; the future target must still be provided |

Changing the hand requires more than loading a URDF: inspect mesh sampling, region correspondence, retargeting and controller configuration. Before comparing teachers and students, also check their termination rules and split protocols; the paper's student and teacher evaluations do not share every condition. Public source availability is not a completed installation, payload-license check or hardware reproduction. Use the [collection signal-role guide](/robot-teleoperation#contact-signal-roles) to document the transition from measured human touch to simulated guidance.

## Sources and related resources

- [DexTaG arXiv v1, submitted September 27, 2026](https://arxiv.org/abs/2609.33882)
- [Full method, ablations and real-world protocol](https://arxiv.org/html/2609.33882v1)
- [Official project page](https://dextag.github.io/)
- [MIT-licensed code, data links and retargeter checkpoints](https://github.com/UMass-Embodied-AGI/DexTaG)
- [RoboSkin robot-learning guide](/robot-learning)

*Evidence review updated November 4, 2026. Original publication dates are retained. We inspected sources and public metadata; we did not run these robot systems or download their training archives.*
`,
  },
  {
    id: 'blind-grasp-reflex-proprioceptive-dexterous-hand',
    title: 'A blind grasp reflex lets a dexterous hand feel through proprioception',
    seoTitle: 'Blind Grasp Reflex for Proprioceptive Dexterous Hands',
    seoDescription: "Distinguish Blind Grasp Reflex’s retry-window and per-attempt results; examine command-error inputs, grasp-score handshakes and physical validation limits.",
    excerpt: 'MIT, Seoul National University and Yonsei researchers train a hand-local policy that reacts to contact through joint encoders, without fingertip tactile sensors. The strongest evidence is simulated; the hardware study is qualitative.',
    category: 'Proprioceptive dexterity',
    image: '/generated/news/blind-grasp-reflex-proprioceptive-dexterous-hand.png',
    imageAlt: 'Diagram of a robot arm reaching visually before a dexterous hand closes using joint error as implicit contact feedback.',
    imageCaption: 'Original RoboSkin.ai schematic of the Blind Grasp Reflex division between visual reaching and proprioceptive grasping. It is explanatory artwork, not an experimental image.',
    sourceTitle: 'See to Reach, Feel to Grasp: Learning A Blind Grasp Reflex for Anthropomorphic Robotic Hands',
    sourceUrl: 'https://arxiv.org/abs/2609.31323',
    sources: [
      { title: 'Blind Grasp Reflex arXiv v1 record', url: 'https://arxiv.org/abs/2609.31323' },
      { title: 'Full v1 method, results and limitations', url: 'https://arxiv.org/html/2609.31323v1' },
      { title: 'Official Blind Grasp Reflex project page', url: 'https://blindgraspreflex.github.io/' },
    ],
    technicalFocus: ['proprioceptive contact feedback', 'dexterous grasping', 'anthropomorphic robot hands', 'sim-to-real learning'],
    sourceDate: '2026-09-25',
    evidenceStatus: "Preprint · simulation with retry-window and per-attempt metrics · qualitative hardware examples · implementation link unverified",
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-28',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# A blind grasp reflex lets a dexterous hand feel through proprioception

Researchers from the Massachusetts Institute of Technology, Seoul National University and Yonsei University released Blind Grasp Reflex on September 25, 2026. The system separates visually guided reaching from a hand-local grasp controller that uses only joint positions and motor-command errors. It treats tracking error as an implicit sign of contact, so the hand can react without cameras or fingertip tactile sensors during closure. [Paper and version record](https://arxiv.org/abs/2609.31323).

## Key takeaways

- On 3,028 simulated GraspXL objects, the modular policy reports 95% success within a 30-second window that permits regrasping, versus 97% for the end-to-end baseline. The separate per-attempt success is 85% for both methods.
- When an object is moved during closure, Blind Grasp Reflex reaches 92% versus 8% in a dynamic test using ten approximately spherical YCB objects within the trained workspace.
- The hardware section shows successful grasps on 29 objects, but it does not provide repeated trial counts or a physical success rate. Those demonstrations should not be compared directly with the simulation percentages.

## What changed

The method gives the arm and hand different jobs. A perception-driven arm controller moves the palm toward an estimated object pose. Once the hand is in range, a reflex policy closes its 20-degree-of-freedom Robotis HX5-D20-MRT hand. The hand observes a five-frame history of joint position and measured-minus-commanded position error. The reference is the low-level, velocity-limited joint command, which can differ from the policy’s requested target. A stalled finger can therefore become an implicit contact signal, but its meaning depends on the actuator and controller.

Training uses a privileged teacher with simulated object state, then distills the behavior into a student that sees only proprioception. The policy runs at 11.9 Hz, above a 1 kHz low-level joint loop, and the authors report roughly four GPU-hours on one NVIDIA L40S. [Method details](https://arxiv.org/html/2609.31323v1#S3).

This is not tactile sensing in the usual robot-skin sense. It does not measure pressure distribution, shear, slip or contact location directly. It infers contact from how the mechanism fails to follow a command. That distinction matters for readers comparing the work with [tactile manipulation](/tactile-manipulation) systems.

## Results under the reported conditions

On 78 YCB objects, Blind Grasp Reflex reaches 96% simulated success and the end-to-end reinforcement-learning baseline reaches 98%. On the larger 3,028-object GraspXL set, the figures are 95% and 97%. These outcomes allow retries within 30 seconds and require a two-second hold within 10 cm of the target. They are not first-attempt grasp rates; the paper separately reports 85% per attempt for both methods.

The separation matters more under intervention. In the paper's dynamic-object evaluation, an external motion changes the object during closure. The reflex policy succeeds in 92% of cases, while the end-to-end baseline succeeds in 8%. In a separate object-pose generalization test, the figures are 90% and 15%. These are results from the authors' simulator, not an independent benchmark or a physical disturbance study. [Evaluation tables](https://arxiv.org/html/2609.31323v1#S4).

The authors also test whether a learned grasp score tracks the analytic Ferrari-Canny metric. Across 15,097 simulated episodes, the mean of within-episode Spearman correlations is 0.77; the reported subsets are 0.78 for 14,346 successful episodes and 0.61 for 751 failures. Correlation supports the training signal, but it does not prove equivalent force closure on hardware.

## What this means for robotics

RoboSkin analysis: the architecture resembles a biological division of labor. Vision gets the limb near the target; fast local feedback handles uncertain contact. A frozen hand policy can therefore be paired with several unseen arm controllers without retraining the full perception-to-action stack. That modularity could make [robot hands](/robot-hands) easier to integrate.

The practical trade-off is observability. Encoder error is inexpensive and available on many hands, but it combines contact, friction, backlash, saturation and controller dynamics. A grasp reflex may be robust enough to close around an object while remaining unable to estimate why a finger stopped. Tasks that depend on incipient slip, contact geometry or force regulation still need richer sensing.

## Limitations and availability

Blind Grasp Reflex is an arXiv v1 preprint, and RoboSkin.ai has not reproduced it. The strongest quantitative evidence is in simulation. The project page shows hardware examples on 29 objects but gives no per-object trial count, failure count or physical success percentage. The arm still relies on perception to reach the target; “blind” describes the hand policy during grasping, not the entire robot.

At publication time, the [official project page](https://blindgraspreflex.github.io/) labelled code as “Coming Soon”; the November 4 review still finds that label rather than an implementation link. No public training environment, weights, dataset or software license was verified. The manuscript is available under CC BY 4.0, which licenses the paper rather than unreleased implementation assets.

## What should a grasp score authorize?

The learned score coordinates the hand and arm through a reversible state machine: a high score can permit lifting, while a lower score can return the system to reaching or regrasping. Correlation with an analytic grasp metric does not calibrate the score as a probability of safe retention. A receiving arm controller must therefore define what it does at each transition, including release and timeout. [Controller and ablations](https://arxiv.org/html/2609.31323v1).

| Integration record | Why it matters |
| --- | --- |
| Policy target, low-level command and measured joint state | The error proxy changes with command shaping, saturation, stiffness and friction |
| Score thresholds and executed arm transition | A high score is a coordination signal, not a measured payload or slip margin |
| Attempt count, retry window, hold criterion and interventions | A recovered episode and a first-attempt grasp answer different reliability questions |

The authors’ controller ablation reinforces that dependence: halving the permitted joint-command velocity reduces the reported YCB window success from 96% to 76%. A transferred checkpoint therefore needs its controller configuration recorded, not just the hand model. The reported cross-arm examples also keep the hand policy; they do not establish transfer to a different hand mechanism.

For a new application, test retention during the intended motion and record failures alongside successful demonstrations. This is proposed acceptance work, not a result supplied by the 29-object hardware showcase. The [manipulation decision map](/robot-manipulation#contact-decisions) separates implicit contact evidence from measured force, policy decisions and completed tasks.

## Sources and related resources

- [Blind Grasp Reflex arXiv v1, submitted September 25, 2026](https://arxiv.org/abs/2609.31323)
- [Full method and evaluation](https://arxiv.org/html/2609.31323v1)
- [Official project page and videos](https://blindgraspreflex.github.io/)
- [RoboSkin robot learning guide](/robot-learning)

*Source review updated November 4, 2026. Original publication dates are retained. Results belong to the cited authors; RoboSkin has not run these systems or downloaded their experimental payloads.*
`,
  },
  {
    id: 'tactic-tactile-encoder-fusion-benchmark',
    title: 'TACTIC finds no single best tactile encoder for contact-rich manipulation',
    seoTitle: 'TACTIC Tactile Encoder and Fusion Benchmark',
    seoDescription: "Read TACTIC encoder adaptation, random versus temporal CLIP sampling, task-stage criteria and selected robustness tests; public metadata is not a reproduction.",
    excerpt: 'TACTIC crosses five tactile encoders with five conditioning methods on four real robot tasks. Its central result is conditional: the best combination changes with the contact problem.',
    category: 'Tactile learning benchmark',
    image: '/generated/news/tactic-tactile-encoder-fusion-benchmark.png',
    imageAlt: 'Matrix diagram crossing five tactile encoders with five policy fusion methods before four contact-rich robot tasks.',
    imageCaption: 'Original RoboSkin.ai schematic of the TACTIC 5-by-5 encoder and conditioning study. It is explanatory artwork, not a reproduction of the paper figures.',
    sourceTitle: 'TACTIC: Understanding Tactile Encoders and Conditioning for Contact-rich Robot Manipulation Policies',
    sourceUrl: 'https://arxiv.org/abs/2609.30969',
    sources: [
      { title: 'TACTIC arXiv v1 record', url: 'https://arxiv.org/abs/2609.30969' },
      { title: 'Full TACTIC v1 paper', url: 'https://arxiv.org/html/2609.30969v1' },
      { title: 'Official TACTIC project page', url: 'https://utn-air.github.io/TACTIC/' },
      { title: 'Official TACTIC dataset collection', url: 'https://huggingface.co/collections/UTN-AIR/tactic' },
    ],
    technicalFocus: ['tactile encoders', 'multimodal policy fusion', 'contact-rich manipulation', 'robot datasets'],
    sourceDate: '2026-09-25',
    evidenceStatus: "Preprint · v1 · public four-dataset metadata inspected November 4 · payloads untested · code still marked coming soon",
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-28',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# TACTIC finds no single best tactile encoder for contact-rich manipulation

Researchers led by the University of Technology Nuremberg released TACTIC on September 25, 2026. TACTIC is a real-robot study of how five tactile encoders and five policy-conditioning methods interact across wiping, USB-C insertion and screw insertion. After 2,180 evaluation rollouts, the answer is not a universal winner: encoder and fusion choices depend on the task. [Paper and version record](https://arxiv.org/abs/2609.30969).

## Key takeaways

- TACTIC evaluates 25 encoder-conditioning combinations on four tasks, with 20 rollouts per main-study condition; selected robustness conditions use ten.
- The simplest ResNet18 plus concatenation reaches 80% termination on USB-C insertion, compared with 55% for the vision-only policy in that task.
- Four public dataset metadata files list 410 episodes in total; their payloads were not downloaded or decoded in our review. The project page still labels policy code “coming soon.”

## What changed

Many tactile-policy papers change the sensor representation and fusion mechanism at the same time, making the source of an improvement hard to identify. TACTIC instead fixes an Action Chunking with Transformers policy and crosses five encoders—ResNet18, SARL, UniT, Sparsh and T3—with concatenation, FiLM, gated cross-attention, CLIP-R random cross-modal sampling and CLIP-T temporally structured sampling. These are contrastive sampling schemes, not replacement versus token-conditioning mechanisms.

The hardware uses two Franka FR3 arms in a leader-follower collection setup. The follower has two DIGIT sensors on a Franka Hand, an Intel RealSense D405 at the wrist and a D435 side camera. The team collects about 100 demonstrations per task at 30 Hz, using four pairs of replaceable DIGIT cartridges to introduce sensor variation. The policy predicts 120-step action chunks. [Experimental setup](https://arxiv.org/html/2609.30969v1#S4).

## What the real-robot study found

USB-C insertion favors the uncomplicated baseline: ResNet18 with feature concatenation reaches 80% termination, while vision-only reaches 55%. Screw insertion instead favors semantic alignment, with Sparsh-CLIP-T and T3-CLIP-T each reaching 90% termination under the reported protocol. On other tasks, the same CLIP-style mechanisms can reduce performance. That reversal is the paper's main engineering result.

The authors also introduce out-of-distribution “disco” lighting. The selected non-CLIP variants fail under that visual shift, while some Sparsh-plus-CLIP configurations preserve partial performance; the robustness test does not rerun all 25 combinations. Each out-of-distribution condition uses ten trials, so these percentages have wider uncertainty than the 20-rollout main ablations. [Results and OOD analysis](https://arxiv.org/html/2609.30969v1#S5).

The headline count needs careful interpretation. The 2,180 figure is evaluation rollouts across policies and conditions, not the size of the imitation-learning dataset. The [official Hugging Face collection](https://huggingface.co/collections/UTN-AIR/tactic) currently lists four datasets—screw, board, vase and USB-C—with 104, 102, 101 and 103 episodes respectively, or 410 episodes total. On November 4, the four cards declare MIT and their metadata specifies 30 fps. Six image fields include side and wrist views, two DIGIT streams and two blank-reference streams; they do not establish six physical cameras. The README bodies contain only license metadata, limiting usage documentation.

## What this means for robotics

RoboSkin analysis: “use a pretrained tactile encoder” is not enough of a recipe. The representation must preserve the contact information a task needs, and the policy must expose that information in a useful way. A semantic alignment layer may help when tactile and visual observations share a stable task concept, but it can also discard continuous detail needed for surface interaction.

For teams building [visuo-tactile](/visuo-tactile) policies, TACTIC argues for a small task-specific ablation before scaling data collection. A simpler encoder can outperform a larger pretrained model, especially when latency, cartridge changes and cross-device variation matter more than broad representation learning.

## Limitations and availability

TACTIC is an arXiv v1 preprint, and RoboSkin.ai has not reproduced its 2,180 rollouts. The study uses one robot family, DIGIT sensors and four tasks. There is no confidence interval around most reported success rates, and 20 trials per setting cannot resolve small differences reliably. Performance under new sensor geometries or policies remains unknown.

The [project page](https://utn-air.github.io/TACTIC/) marks code as “coming soon.” The four public dataset cards and metadata were readable and declare MIT. We did not verify archive integrity, decoding, training compatibility or any separately governed dependencies. The arXiv manuscript uses arXiv's submission license; that does not license unreleased training code.

## Choose the task criterion before choosing an encoder

TACTIC separates grasp, attempt, completion and termination. In its USB-C task, completion means reaching the correct position, not necessarily forcing the connector fully into the port. Neither that stage nor termination establishes electrical continuity. A purchasing or integration test needs its own measurable seating criterion. [Task definitions and training details](https://arxiv.org/html/2609.30969v1).

The encoders also have different adaptation histories. Some are trained or adapted and then frozen; the ordinary ResNet baseline is jointly trained with the policy. T3 retains its original preprocessing, whereas other configurations subtract a blank-sensor reference. CLIP-R and CLIP-T differ in batch construction and size. Preserve these choices when comparing results instead of attributing every difference to model size or fusion alone.

For a small pilot, record sensor cartridge, blank-reference capture, backbone revision, trainable layers, temporal sampling, fusion, task-stage criteria and trial counts. Select a configuration on development tasks, then evaluate it on separately specified conditions. Error bars across tasks do not quantify repeated-training uncertainty, and an attention visualization does not establish why a policy is robust. The [visuo-tactile evidence map](/visuo-tactile#training-and-runtime-touch) places this policy benchmark alongside representation and contact-estimation studies.

## Sources and related resources

- [TACTIC arXiv v1, submitted September 25, 2026](https://arxiv.org/abs/2609.30969)
- [Full methods, ablations and limitations](https://arxiv.org/html/2609.30969v1)
- [Official project page](https://utn-air.github.io/TACTIC/)
- [Official four-dataset collection](https://huggingface.co/collections/UTN-AIR/tactic)
- [RoboSkin tactile dataset directory](/datasets)

*Source review updated November 4, 2026. Original publication dates are retained. Findings are attributed to their authors; we did not run these systems or verify dataset payloads.*
`,
  },
  {
    id: 'vistacalign-human-robot-tactile-demonstrations',
    title: 'VisTacAlign turns human touch into robot training data',
    seoTitle: 'VisTacAlign Human-to-Robot Tactile Demonstrations',
    seoDescription: "Review VisTacAlign task-specific alignment, force-proportional units, comparison conditions and action timing; separate signal matching from calibration.",
    excerpt: 'VisTacAlign retargets a human glove and stereo camera rig into a tactile robot hand’s observation space, then co-trains one policy on human and robot demonstrations.',
    category: 'Visuo-tactile learning',
    image: '/generated/news/vistacalign-human-robot-tactile-demonstrations.png',
    imageAlt: 'Diagram mapping human glove touch and stereo video into robot taxel signals and robot-rendered depth for shared policy training.',
    imageCaption: 'Original RoboSkin.ai schematic of VisTacAlign human-to-robot observation alignment. It is explanatory artwork, not an experimental figure.',
    sourceTitle: 'VisTacAlign: Co-Training Dexterous Policies on Tactile Human and Robot Demonstrations',
    sourceUrl: 'https://arxiv.org/abs/2609.30959',
    sources: [
      { title: 'VisTacAlign arXiv v1 record', url: 'https://arxiv.org/abs/2609.30959' },
      { title: 'Full VisTacAlign v1 paper', url: 'https://arxiv.org/html/2609.30959v1' },
      { title: 'Official VisTacAlign project page', url: 'https://vis-tac-align.github.io/' },
    ],
    technicalFocus: ['human robot demonstration alignment', 'tactile imitation learning', 'dexterous manipulation', 'multimodal robot policies'],
    sourceDate: '2026-09-25',
    evidenceStatus: 'Preprint · arXiv v1 · real-robot evaluation · project lists paper and code as coming soon',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-28',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# VisTacAlign turns human touch into robot training data

ETH Zurich and Stanford University researchers released VisTacAlign on September 25, 2026. The method records human hand motion, stereo video and capacitive glove signals, maps them into a 17-degree-of-freedom tactile robot hand's observation space, and co-trains a diffusion policy with ordinary robot demonstrations. The goal is to make fast human demonstrations usable without pretending that human and robot sensing are naturally identical. [Paper and version record](https://arxiv.org/abs/2609.30959).

## Key takeaways

- In the drill task, 26 aligned human demonstrations added to 26 robot demonstrations raise reported lift success from 50% to 70%.
- In Lego insertion, 50 human plus 30 robot demonstrations reach 80% over 20 trials, compared with 10% for 30 robot demonstrations alone.
- The alignment is task-specific and compresses each fingertip to one normal-load signal in force-proportional taxel units, not calibrated Newtons. It does not preserve full taxel geometry or shear.

## What changed

Human demonstrations are fast to collect but differ from robot data in embodiment, camera geometry and contact signals. VisTacAlign tackles both visual and tactile mismatch. It retargets the glove pose to an ORCA Hand, renders a robot-textured hand into the human stereo sequence and recomputes depth. Separately, it maps capacitive glove measurements into the range of the robot's fingertip taxels.

The resulting human observations and robot observations train the same 23.5-million-parameter diffusion transformer. The policy predicts 64 action steps, executes the first 32—about 1.1 seconds—and replans. The authors report 269 milliseconds per inference on an RTX 4080. Human glove data arrives at 60 Hz, stereo video at 20 Hz and robot tactile data at 30 Hz. [Architecture and implementation](https://arxiv.org/html/2609.30959v1#S3).

## Results and comparison conditions

For drill pickup, 26 robot demonstrations alone reach 50% lift success. Adding 26 aligned human demonstrations raises the result to 70%. In the low-robot-data setting, ten robot demonstrations reach 35%; adding 26 human demonstrations without tactile alignment produces 30%, while adding aligned touch reaches 55%. This comparison supports the alignment mechanism more directly than the larger-data result.

The strawberry task combines 124 human and 84 robot demonstrations. Over ten trials for each fruit size, the multimodal policy reaches 90%, 80% and 70% on small, medium and large strawberries. A robot-only policy without tactile input reaches 60%, 70% and 0%. Both human-data inclusion and tactile input change in this comparison; it does not isolate either contribution alone. The paper does not quantify strawberry damage, so the numbers measure task completion rather than gentle handling.

For Lego insertion, 50 human plus 30 robot demonstrations reach 80% across 20 trials; 30 robot demonstrations alone reach 10%. Removing visual retargeting from the combined-data pipeline reduces success to 10–25% at comparable robot-data budgets, while the full alignment reaches 40–60%. Removing tactile input from the best configuration costs ten percentage points. [Task results and ablations](https://arxiv.org/html/2609.30959v1#S4).

The alignment diagnostics are also useful. For thumb and index touch distributions, the reported Kolmogorov-Smirnov distances fall from 0.33 and 0.42 to 0.08 and 0.08. A domain classifier drops from 92% to 58%, near but not at 50% chance. Visual Chamfer distance falls from 13.3 to 10.2 mm, while the 10 mm F-score rises from 0.40 to 0.59.

## What this means for robotics

RoboSkin analysis: VisTacAlign turns embodiment mismatch into an explicit engineering step instead of asking a large policy to absorb it implicitly. That is promising for [robot teleoperation](/robot-teleoperation) programs where human collection is two to three times faster than robot teleoperation, as the authors report.

The method is not a universal human-to-robot converter. Its force mapping is fitted per task from separate human and robot force samples, and it still requires a short robot recording. Teams should budget for calibration whenever the object, glove fit, fingertip material or sensor gain changes.

## Limitations and availability

VisTacAlign is an arXiv v1 preprint labeled “under review” for ICRA 2027; it should not be described as an accepted conference paper. RoboSkin.ai has not reproduced it. The study covers three short-horizon, mostly quasi-static tasks. Per-fingertip scalar pooling discards pressure layout and shear information, and there is no comparison against learning a shared latent space without handcrafted mappings.

The [official project page](https://vis-tac-align.github.io/) labels both paper and code “coming soon,” even though the arXiv manuscript is available. The November 4 recheck did not verify a code repository, dataset, checkpoint or software license. The paper carries CC BY-NC-ND 4.0; this does not authorize unrestricted modification or commercial reuse of the manuscript.

## Signal alignment does not establish physical force equivalence

The mapping is fitted separately for each task using unpaired human and robot contact samples. Zero contact remains zero; a finger absent from the robot reference contacts is mapped to zero. Outputs remain within the convex hull of reference robot samples. That mathematical range constraint does not establish a safe physical force limit. Robot training data and deployed robot observations are not passed through this human-data transform. [Alignment method](https://arxiv.org/html/2609.30959v1).

A lower domain-classification score shows that selected representations are harder to distinguish; it is not a force-calibration certificate. The visual comparison also uses Apple Vision Pro as pseudo-ground-truth rather than independent metrology. Keep these diagnostics separate from physical task outcomes.

For adaptation, retain the human and robot contact sample distributions, units, zeroing method and per-finger coverage. Check that a new object or glove fit remains within the reviewed conditions. The static mapping preserves each frame's timing but cannot repair incorrectly aligned acquisition clocks. Thirty-hertz taxel sampling, 269 ms inference and roughly 1.1 seconds of executed actions before replanning describe different parts of the pipeline; none alone establishes fast force feedback. Compare the [observation and execution roles](/robot-teleoperation#contact-signal-roles) before specifying a controller.

## Sources and related resources

- [VisTacAlign arXiv v1, submitted September 25, 2026](https://arxiv.org/abs/2609.30959)
- [Full method and real-robot evaluation](https://arxiv.org/html/2609.30959v1)
- [Official project page](https://vis-tac-align.github.io/)
- [RoboSkin DIGIT sensor profile](/sensors/digit)
- [RoboSkin robot learning guide](/robot-learning)

*Evidence review updated November 4, 2026. Original publication dates are retained. We inspected sources and public metadata; we did not run these robot systems or download their training archives.*
`,
  },
  {
    id: 'phase-tactile-retrieval-few-shot-insertion',
    title: 'PHASE retrieves tactile insertion experience one contact phase at a time',
    seoTitle: 'PHASE Tactile Retrieval for Few-Shot Insertion',
    seoDescription: "Separate PHASE’s offline phase retrieval from runtime insertion; inspect prior versus target data, 100-trial denominators and shifted-start limitations.",
    excerpt: 'OMRON SINIC X and University of Tokyo researchers segment insertion demonstrations by tactile-proprioceptive contact phase, then retrieve matching prior segments for few-shot policy learning.',
    category: 'Few-shot tactile insertion',
    image: '/generated/news/phase-tactile-retrieval-few-shot-insertion.png',
    imageAlt: 'Diagram dividing peg insertion into tactile contact phases before retrieving matching demonstrations for an action policy.',
    imageCaption: 'Original RoboSkin.ai schematic of PHASE phase detection, retrieval and few-shot policy training. It is explanatory artwork, not an experimental image.',
    sourceTitle: 'PHASE: Compliance-Enabled Tactile Phase Retrieval for Few-Shot Insertion Learning',
    sourceUrl: 'https://arxiv.org/abs/2609.30889',
    sources: [
      { title: 'PHASE arXiv v1 record', url: 'https://arxiv.org/abs/2609.30889' },
      { title: 'Official PHASE project page', url: 'https://omron-sinicx.github.io/phase/' },
      { title: 'OMRON SINIC X IROS 2026 announcement', url: 'https://www.omron.com/sinicx/en/news/2026/09/iros2026/' },
    ],
    technicalFocus: ['tactile phase retrieval', 'few-shot insertion', 'compliant robot wrists', 'imitation learning'],
    sourceDate: '2026-09-25',
    evidenceStatus: 'IROS 2026 paper · arXiv v1 · real-robot evaluation · no public code or dataset verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-28',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# PHASE retrieves tactile insertion experience one contact phase at a time

Researchers from OMRON SINIC X and the University of Tokyo released PHASE on September 25, 2026. Accepted at IROS 2026, PHASE uses a compliant wrist and tactile-proprioceptive signals to split insertion demonstrations into contact phases, retrieve relevant portions of prior experience and adapt a new policy using four target demonstrations alongside selected experience from a 122-demonstration prior. [Official project page](https://omron-sinicx.github.io/phase/).

## Key takeaways

- With four target demonstrations per peg shape, PHASE reaches 77% success in the normal-start evaluation, 13 percentage points above the strongest 64% comparison.
- Under unseen starting positions, PHASE reaches 47%, compared with 17% for the strongest baseline—a 30-point gap under the reported setup.
- The evaluation uses one UR5e, one compliant wrist, a 3-by-3 tactile array and 20 trials per shape. Code and data were not publicly linked.

## What changed

Demonstration retrieval usually compares entire trajectories. PHASE argues that contact-rich insertion is better compared in stages. A masked tactile-proprioceptive encoder called MAT3 represents contact, while a soft wrist makes the phases physically observable. Offline segmentation places a boundary after the full demonstration’s torque peak when a subsequent stability condition is met, with a fallback to the interval end. This is not a causal runtime detector that knows the future peak.

Fast Dynamic Time Warping then compares like phases between four target demonstrations and a pool of 122 prior demonstrations. The retrieved segments train an Action Chunking with Transformers policy. This avoids forcing an entire prior trajectory to match when only its search or insertion segment resembles the target. [Method and paper links](https://omron-sinicx.github.io/phase/).

## Results under the reported conditions

The physical setup uses a UR5e arm, a soft compliant wrist, a 3-by-3 PapillArray, wrist force-torque sensing and HTC VIVE gripper-pose tracking. Circle and square pegs supply the 122 prior demonstrations. Rectangle, oval and hexagon are absent from that prior but still have four target demonstrations each: this is few-shot adaptation, not zero-shot transfer. Target-only and retrieval policies use the target examples; BC-Prior is trained only on the prior. Each method has 20 trials per shape, 100 in total.

Under the normal-start protocol, the target-only policy reaches 50%. Training on all prior data without retrieval reaches 64%; single state-action-pair retrieval reaches 56%; whole-trajectory retrieval reaches 64%; fixed-window retrieval reaches 55%; PHASE reaches 77%. Success means full insertion within 60 seconds. The relevant aggregate gain is 13 percentage points over the strongest 64% baselines, not a 13% relative improvement or superiority on every peg shape.

When start positions are perturbed by up to plus or minus 2 cm along each horizontal axis outside the demonstrated starting poses, target-only falls to 0%, the no-retrieval prior baseline reaches 17%, single retrieval 2%, full retrieval 14%, fixed-window retrieval 16% and PHASE 47%. The 30-point margin over 17% suggests that phase-level matching helps most when a policy must first recover contact before insertion.

## What this means for robotics

RoboSkin analysis: PHASE treats compliance as part of perception. The soft wrist changes the measured response to contact, making the phases more observable in the authors’ setup; that does not establish fixture protection or force safety across assemblies. That coupling between mechanism and learning is relevant to [robot manipulation](/robot-manipulation) systems that cannot rely on vision after the peg enters a fixture.

The work also offers a practical data strategy. Instead of discarding old demonstrations because a new peg is different, teams can reuse the segments whose contact dynamics match. But the reuse benefit depends on recognizable phases. Tasks with repeated impacts, slip or more than two stable contact stages may require a learned or multi-boundary segmenter.

## Limitations and availability

PHASE is an IROS 2026 conference paper with an arXiv v1 record, and RoboSkin.ai has not reproduced it. Results come from a single arm, wrist and 3-by-3 tactile configuration. Twenty trials per shape limit precision, and the five peg geometries do not establish transfer to threaded, flexible or high-force assembly.

The [official project page](https://omron-sinicx.github.io/phase/) provides paper, poster and video links. It does not link public code, trained policies or a demonstration dataset, and no software or data license was verified. The earlier [OMRON SINIC X announcement](https://www.omron.com/sinicx/en/news/2026/09/iros2026/) remains a source route, but returned an access restriction on the November 4 recheck. The accessible author paper and project identify IROS 2026; none of these constitutes independent experimental validation.

## Distinguish offline segmentation from runtime observation

The retrieval representation and the deployed policy do different work. PHASE’s offline bidirectional encoder can use expert-action tokens from complete demonstrations. The runtime policy does not receive those future expert actions. Phase matching prepares training examples; it is not a claim that the robot retrieves and chains prior segments online. [Methods and evaluation](https://arxiv.org/html/2609.30889v1).

| Training component | What to preserve when adapting it |
| --- | --- |
| Torque-based segmentation | Signal definition, peak/stability rule and fallback cases; heuristic termination is not verified boundary-label accuracy |
| Retrieved prior segments | Segment identity, phase alignment and masks; train each as an independent trajectory rather than crossing artificial boundaries |
| Complete target demonstrations | Their real search-to-insert transition and target-specific evidence, even for shapes absent from the prior |
| Runtime observation | Tactile, wrist and pose channels, their clocks and frames; do not assume tactile-only deployment |

The best aggregate score also hides object differences: PHASE records 18/20 on circles versus BC-Prior’s 19/20, and 14/20 on hexagons versus single-pair retrieval’s 15/20. Its overall 77/100 is useful evidence, but not a guarantee for each geometry. The short demonstration durations are separate from the 60-second evaluation limit.

For a new fixture, record protective stops, timeout, drift and recovery as well as insertion. The paper identifies those failures and does not supply a general uncertainty estimator or large-offset recovery policy. Use the [manipulation decision map](/robot-manipulation#contact-decisions) to distinguish a better training-data selection method from measured execution reliability.

## Sources and related resources

- [PHASE arXiv v1, submitted September 25, 2026](https://arxiv.org/abs/2609.30889)
- [Official PHASE project page, paper, poster and video](https://omron-sinicx.github.io/phase/)
- [OMRON SINIC X IROS 2026 announcement](https://www.omron.com/sinicx/en/news/2026/09/iros2026/)
- [RoboSkin tactile sensor benchmark guide](/guides/tactile-sensor-benchmark-robot-manipulation)
- [RoboSkin tactile manipulation hub](/tactile-manipulation)

*Source review updated November 4, 2026. Original publication dates are retained. Results belong to the cited authors; RoboSkin has not run these systems or downloaded their experimental payloads.*
`,
  },
  {
    id: 'da-grd-tactile-grasp-recovery',
    title: 'DA-GRD uses sparse touch to recover a grasp after the object moves',
    seoTitle: 'DA-GRD: Tactile Grasp Recovery After Object Motion',
    seoDescription: "Read DA-GRD’s grasp-coverage stopping rule, success-conditioned probe counts and planar recovery limits before comparing contact cost or task reliability.",
    excerpt: 'A*STAR, NTU and Tsinghua researchers stop tactile exploration when the remaining object poses support the same grasp. Real hardware reaches 71.7% lift success, but only 38.3% task-conditioned success.',
    category: 'Tactile grasp recovery',
    image: '/generated/news/da-grd-tactile-grasp-recovery.png',
    imageAlt: 'Diagram showing a stale visual grasp, sparse tactile probes and a recovered robot grasp in the DA-GRD pipeline.',
    imageCaption: 'Original RoboSkin.ai schematic of DA-GRD belief updating and grasp-aware stopping. It is explanatory artwork, not an experimental image.',
    sourceTitle: 'DA-GRD: Decision-Aware Grasp-Relevant Disambiguation for tactile recovery under perception-to-execution mismatches',
    sourceUrl: 'https://arxiv.org/abs/2609.29065',
    sources: [
      { title: 'DA-GRD arXiv v1 submission record', url: 'https://arxiv.org/abs/2609.29065' },
      { title: 'DA-GRD v1 method, experiments and limitations', url: 'https://arxiv.org/html/2609.29065v1' },
    ],
    technicalFocus: ['active tactile exploration', 'grasp recovery', 'touch-based localization', 'robot manipulation'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'Preprint · arXiv v1 · simulation and real-robot evaluation · no public code verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-27',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# DA-GRD uses sparse touch to recover a grasp after the object moves

Researchers from A*STAR's Institute of Advanced Intelligence and Computing, Nanyang Technological University and Tsinghua University released DA-GRD on September 24, 2026. Decision-Aware Grasp-Relevant Disambiguation addresses a specific failure: vision selects a grasp, the object moves before execution, and the robot must recover without another camera observation. The method probes with touch until the remaining object-pose hypotheses support a common executable grasp. [Paper and version record](https://arxiv.org/abs/2609.29065).

## Key takeaways

- In MuJoCo, the principal DA-GRD variant reaches 84.7% physical lift success across ten objects, compared with 63.7% for a fixed 15-scan baseline using the same planar belief representation.
- The mean of the ten per-object probe averages on lift-success episodes is 4.13, 72.5% below a fixed 15-probe budget. Initial-grasp successes count as zero additional probes; this is not an all-attempt time saving.
- On a UR5, 60 trials across six objects produce 71.7% lift success but 38.3% task-conditioned success. The gap shows that lifting an object is easier than recovering the originally intended grasp.

## What changed

DA-GRD does not try to reconstruct a complete object pose before acting. It starts from the remembered RGB-D point cloud and task-conditioned grasp produced by a visual-language and AnyGrasp pipeline. When that grasp becomes stale, contact or free-space observations update a weighted 256-particle belief over planar translation and yaw.

Candidate probes approach vertically or horizontally. The selector evaluates a counterfactual miss and surface novelty, balanced against motion and repeat costs; it does not calculate a full expectation over every possible hit and miss outcome. A grasp-aware stopping rule executes once enough of the belief mass supports a common grasp. This is different from fixed tactile scanning, which spends the same interaction budget whether or not the next touch changes the decision.

## Results under the reported conditions

The simulation applies translations up to plus or minus 5 cm on each planar axis and yaw changes up to plus or minus 45 degrees to ten rigid objects. Each object has 100 shared perturbation episodes per method. A lift counts as physically successful when the robot raises the target by 5 cm. DA-GRD's main policy reaches 84.7%, versus 9.1% for the unrecovered stale grasp, 21.2% for the original XY-only scan baseline, and 63.7% after that baseline receives the same SE(2) belief. [Full evaluation](https://arxiv.org/html/2609.29065v1#S4).

The stricter task-conditioned measure asks whether the final grasp is also consistent with the grasp originally selected for the task. On that measure, DA-GRD reaches 57.3%, while the adapted fixed-scan baseline reaches 49.2%. A pose-sensitive DA-GRD variant reaches a similar 57.6% but uses 7.70 probes on average, compared with 4.13 for grasp-aware stopping.

The physical setup uses a UR5, a Robotiq 2F-140 gripper, two finger-mounted force-sensitive resistors for lateral contact and a wrist FT300 sensor for vertical contact. Across ten trials on each of six objects, lift success ranges from 60% to 80%; task-conditioned success ranges from 30% to 50%. The overall averages are 71.7% and 38.3%, with a reported mean of 4.20 probes across the six per-object averages. Probe count alone does not include the duration of each contact, motion or reset.

## What this means for robotics

RoboSkin analysis: the useful idea is that touch should resolve the action, not necessarily the entire scene. If multiple object poses all imply an acceptable grasp, further localization spends time and risks moving the object without improving the decision. That principle could reduce the interaction cost of [tactile manipulation](/tactile-manipulation) systems that operate after occlusion or scene change.

The real-world result also argues for reporting more than a binary lift score. A controller can pick an object up while missing the requested handle, orientation or functional region. Keeping physical and task-conditioned success separate makes contact-aware recovery easier to evaluate honestly.

## Limitations and availability

DA-GRD is an arXiv v1 preprint, and RoboSkin.ai has not reproduced it. The belief only covers planar SE(2) motion. Complex non-planar shapes can produce different three-dimensional contacts that look identical after projection; partial remembered geometry can preserve the same ambiguity. The physical implementation also uses both fingertip contact switches and a wrist force-torque sensor, so “sparse touch” does not mean sensor-free deployment.

The November 4 review of the paper and arXiv record did not verify an official project repository, dataset, checkpoint or software license. The arXiv record provides the manuscript under its selected submission license, which does not by itself release implementation code.

## A stopping threshold is not a calibrated success probability

DA-GRD first attempts the remembered grasp. If it succeeds, the episode needs no additional exploration, but it has still made physical contact. After failure, a geometric belief over planar poses guides probing and stopping. The reported 70% grasp-coverage threshold concerns posterior mass compatible with a candidate grasp; it does not mean that 70% of physical attempts will succeed. Sensor errors, incomplete geometry and motion caused by probing can break that interpretation. [Decision rule and protocol](https://arxiv.org/html/2609.29065v1).

| Report separately | Avoid substituting |
| --- | --- |
| Initial grasp, added probes and final grasp | “Zero probes” for contact-free execution |
| Lift success and intended grasp consistency | Any pickup for task completion |
| Per-object successful-episode probe mean | An average over all attempted episodes or wall-clock cost |
| Geometric posterior coverage | Calibrated confidence in retention, damage avoidance or task success |

For a deployment comparison, keep failures, timeouts, probe duration, recovery motion and interventions in the same attempted-episode ledger. A faster successful subset can coexist with expensive failures. The paper’s fixed-scan and decision-aware methods also differ in selection, refinement and stopping, so the aggregate gap does not isolate stopping alone.

This suggested evaluation extends the [manipulation decision map](/robot-manipulation#contact-decisions). Preserve planar assumptions and contact-sensor calibration when adapting the method; a lower uncertainty over projected poses does not recover unobserved height, tilt or contact normals.

## Sources and related resources

- [DA-GRD arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.29065)
- [Full method, protocols and limitations](https://arxiv.org/html/2609.29065v1)
- [RoboSkin tactile sensing guide](/sensors)
- [RoboSkin robot manipulation research](/robot-manipulation)

*Source review updated November 4, 2026. Original publication dates are retained. Results belong to the cited authors; RoboSkin has not run these systems or downloaded their experimental payloads.*
`,
  },
  {
    id: 'torque-observation-alignment-direct-drive-grasping',
    title: 'Torque-change alignment transfers a simulated grasp policy to a direct-drive hand',
    seoTitle: 'Torque Alignment for Zero-Shot Direct-Drive Grasping',
    seoDescription: "Review 9-DoF torque-change grasping, the 62.2% versus 100% alignment ablation, 210-trial protocol and limits of current-derived contact cues.",
    excerpt: 'Sogang University researchers calibrate motor current, subtract consecutive torque readings and inject measured noise. The hand succeeds in 208 of 210 object trials without vision or tactile sensors.',
    category: 'Proprioceptive grasping',
    image: '/generated/news/torque-observation-alignment-direct-drive-grasping.png',
    imageAlt: 'Diagram showing motor current calibration, torque differencing and noise injection before a direct-drive gripper policy transfers from simulation.',
    imageCaption: 'Original RoboSkin.ai schematic of the torque-observation alignment pipeline. It does not depict the paper\'s hardware or measured signals.',
    sourceTitle: 'Simple Torque-Observation Alignment for Zero-Shot Sim-to-Real Grasping with a Direct-Drive Gripper',
    sourceUrl: 'https://arxiv.org/abs/2609.29031',
    sources: [
      { title: 'Torque-observation alignment arXiv v1 record', url: 'https://arxiv.org/abs/2609.29031' },
      { title: 'Full v1 hardware, ablations and limitations', url: 'https://arxiv.org/html/2609.29031v1' },
      { title: 'Sogang RIM Lab publication listing', url: 'https://rim.sogang.ac.kr/publications' },
    ],
    technicalFocus: ['direct-drive grippers', 'proprioceptive contact sensing', 'sim-to-real transfer', 'reinforcement learning'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'Preprint · arXiv v1 · real-robot evaluation · no public implementation verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-27',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# Torque-change alignment transfers a simulated grasp policy to a direct-drive hand

Sogang University researchers released a torque-observation alignment method on September 24, 2026 for zero-shot transfer to a multifingered direct-drive gripper. Instead of adding tactile sensors, the method turns motor current into a contact cue: it calibrates the torque scale, differences consecutive readings to suppress offset, and injects measured noise during simulation training. The deployed policy then uses only joint positions and torque changes. [Paper and version record](https://arxiv.org/abs/2609.29031).

## Key takeaways

- The complete method records 100% success on nine in-distribution object variants, with ten physical trials per object.
- Across 21 objects and 210 trials, it succeeds 208 times: 100% on nine training-shape objects and 98.3% on 12 objects with unseen geometry, material or surface properties.
- Torque differencing removes a slowly varying baseline, but also hides sustained absolute load. The result should not be read as a replacement for calibrated force or tactile sensing in every task.

## What changed

Direct-drive actuators expose interaction through motor current, but a policy trained on ideal simulated torque sees the wrong distribution on hardware. The paper separates that gap into scale, offset and noise.

First, a dynamometer estimates a motor-type-specific current-to-torque constant. Second, both simulator and robot feed the policy the change in torque from one 50 ms step to the next rather than the absolute reading. If the hardware bias changes slowly, subtraction cancels most of it. Third, Gaussian noise fitted from the dynamometer measurements is injected during training.

A privileged teacher learns in simulation, then a student policy is distilled for deployment. Training uses three object families—cuboids, cylinders and spheres—with three sizes each. The student runs at 20 Hz and controls a three-finger, nine-degree-of-freedom direct-drive gripper through grasp, lift and hold stages.

## Results under the reported conditions

The ablation evaluates five observation variants on nine in-distribution objects, ten trials per object and condition. A position-only student reaches 15.6% on hardware despite 68.9% simulated success. Absolute torque with noise reaches 26.7%. Scale calibration plus differencing without injected noise reaches 62.2%; only the full scale, difference and noise condition reaches 100%. These are observation-alignment variants, some sharing trained policies, not five independent training methods. [Ablation and protocol](https://arxiv.org/html/2609.29031v1#S3.SS1).

The broader evaluation adds 12 out-of-distribution household objects. The full method succeeds on all 90 in-distribution trials and 118 of 120 out-of-distribution trials, for 208 of 210 overall. The two failures are a light bulb and a tennis ball; the light bulb tilts and falls during holding, and the tennis ball slips during lifting. The separate ablation discussion of wrong-scale overtravel and noiseless oscillation should not be substituted for these two full-method failures.

These are repeated trials from a prescribed non-contact starting condition on a fixed gripper. The objects are within its workspace, and the test does not include arm motion, clutter, deformable-object safety or arbitrary initial hand-object geometry.

## What this means for robotics

RoboSkin analysis: for direct-drive hands, actuator telemetry can serve as a low-cost contact channel if the learning pipeline respects how that telemetry changes between simulation and hardware. Scale calibration and temporal differencing are simple enough to inspect, unlike a learned black-box adaptation layer.

The result also draws a useful boundary between [proprioceptive contact detection](/robot-learning) and [robot skin](/robot-skin). Torque changes can reveal contact onset and changing load throughout the mechanism, but they do not localize pressure across a surface or preserve static force. Engineers should choose between them based on the task state that must be observed.

## Limitations and availability

This is an arXiv v1 preprint, not an independently reproduced system. Training runs for 2,000 iterations on an RTX 5090, but the paper does not establish that GPU as a minimum requirement. Calibration is tied to the tested motor type and dynamometer conditions; variation across individual motors and operating temperatures remains unknown.

The authors explicitly note that differenced torque suppresses sustained load and assumes slowly varying offsets. Faster dynamics may need more compensation. No official public code, trained policy, calibration dataset, CAD package or software license was verified in this review. The Sogang RIM Lab page lists the publication, but listing a paper is not an implementation release.

## Which alignment operation addresses which error?

A current-to-torque fit does not supply a surface contact map. Keep the three operations separate when assessing whether the method fits your hand:

| Operation | What the paper changes | What remains to check on another hand |
| --- | --- | --- |
| Scale calibration | Fits motor current to torque using a dynamometer | Motor instance, temperature, load range and the reference used |
| Consecutive differencing | Supplies torque change rather than absolute torque | Lost static-load information and whether offsets vary slowly enough |
| Noise injection | Adds measurement-informed variation during training | Noise under your acquisition, filtering and operating conditions |

The last column is an integration checklist, not a demonstrated transfer result. [Paper methods and limitations](https://arxiv.org/html/2609.29031v1) support the distinction between calibration and policy training: zero-shot policy transfer still uses physical calibration evidence. Compare this indirect signal with [measured tactile contact and controller inputs](/tactile-manipulation#contact-information-and-command-interfaces).

## Sources and related resources

- [arXiv v1 record, submitted September 24, 2026](https://arxiv.org/abs/2609.29031)
- [Full method, 210-trial evaluation and limitations](https://arxiv.org/html/2609.29031v1)
- [Sogang RIM Lab publication list](https://rim.sogang.ac.kr/publications)
- [RoboSkin guide to full-hand sensing](/robot-hands)

*Evidence review updated November 4, 2026. The original paper and article dates are retained; source inspection is not a RoboSkin.ai reproduction.*
`,
  },
  {
    id: 'outcome-sensitive-impact-aware-dexterous-catching',
    title: 'Outcome-sensitive search teaches a dexterous hand to catch with less impact',
    seoTitle: 'Outcome-Sensitive Search for Dexterous Robot Catching',
    seoDescription: "Read outcome-sensitive catching through separate repair, completion and impact metrics; examine simulated error validation and physical transfer limits.",
    excerpt: 'A simulation-only study searches the short pre-contact motion window where small action changes alter impact. Its imitation policy beats the privileged teacher, but physical contact transfer remains untested.',
    category: 'Impact-aware manipulation',
    image: '/generated/news/outcome-sensitive-impact-aware-dexterous-catching.png',
    imageAlt: 'Diagram of a fast object approaching a dexterous hand, a highlighted pre-contact motion window and a lower-impact catch trajectory.',
    imageCaption: 'Original RoboSkin.ai schematic of outcome-sensitive motion search for catching. It is not a simulator frame or experimental result.',
    sourceTitle: 'Outcome-Sensitive Motion Search for Impact-Aware Dexterous Catching',
    sourceUrl: 'https://arxiv.org/abs/2609.29020',
    sources: [
      { title: 'Outcome-Sensitive Motion Search arXiv v1 record', url: 'https://arxiv.org/abs/2609.29020' },
      { title: 'Full v1 simulation protocol, results and limitations', url: 'https://arxiv.org/html/2609.29020v1' },
    ],
    technicalFocus: ['dexterous catching', 'impact-aware contact', 'imitation learning', 'demonstration search'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'Preprint · arXiv v1 · simulation only · no public code verified',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-27',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# Outcome-sensitive search teaches a dexterous hand to catch with less impact

Researchers spanning Taiyuan University of Technology, Hong Kong Polytechnic University, Southern University of Science and Technology, Great Bay University, KTH and Chery's Kaiyang Laboratory released Outcome-Sensitive Motion Search on September 24, 2026. The simulation method edits a short pre-contact motion window where small action changes strongly affect both interception and impact, then uses selected simulated rollouts to train an observation-restricted imitation policy. Its observation interface is intended for deployment, but hardware deployment was not evaluated. [Paper and version record](https://arxiv.org/abs/2609.29020).

## Key takeaways

- The final imitation policy reaches 90.3% task success, 5.1 percentage points above the privileged reinforcement-learning teacher and 6.5 points above success-only imitation.
- Mean peak simulated impact among completed catches is 37.3 N for the full method, 8.6% below the teacher's 40.8 N. Missed or dropped catches are excluded from those force averages.
- Every result is in MuJoCo. The paper explicitly says robustness to real perception and contact mismatch remains unverified without a physical arm-hand experiment.

## What changed

A teacher that catches an object is not automatically a good source of demonstrations. It may fail on some launch conditions, and two motions that both complete a catch can create very different relative speed, impact force and follow-through.

The authors define an outcome-sensitive window around the motion immediately before contact. They learn a task-conditioned manifold of successful eight-step arm-action snippets, project teacher motions into it, and search along local geodesic directions. Search can refine a successful catch to reduce impact or repair a teacher failure. Candidate snippets are inserted back into a full rollout and kept only if the complete catch succeeds under a modeled imitation-student action error.

The simulation uses a 7-DoF xArm7 and a 17-DoF ORCA Hand at 50 Hz. Objects vary across ten shape-size combinations, 40 to 60 g mass and roughly 2.8 to 5.0 m/s launch speed. Three source datasets contain 20,000 successful, 20,000 successful and 20,000 mixed teacher rollouts respectively. The constructed set contains 99,328 successful simulated demonstrations, including perturbed executions. Baselines are expanded to the same count; this is not a count of independent physical catches.

## Results under the reported conditions

The study separates catch completion from impact-aware task success. A catching-only teacher completes 92.5% of catches but satisfies all impact criteria in just 0.4%, with 160.1 N mean peak force. Adding impact objectives gives the privileged teacher 90.7% completion, 85.2% task success and 40.8 N peak force. This is a reminder that “caught” and “caught softly” are different outcomes. [Protocol and thresholds](https://arxiv.org/html/2609.29020v1#S5.SS1).

Final policies are trained with three seeds and evaluated on the same 3,000 held-out task conditions. At matched dataset size, success-only imitation reaches 83.8% task success and 41.1 N peak force. Refinement alone lowers force to 36.2 N but reaches 83.2% success. Repair alone reaches 88.5% success and 42.7 N. Combining repair and refinement reaches 90.3% and 37.3 N.

The full policy improves all ten shape-size combinations, with its largest reported gain—14.5 percentage points—on the large box. An ablation also shows that conditional geodesic search produces 44.3% repair, 59.8% refinement and 90.3% student success, versus 5.6%, 8.3% and 83.4% for direct action perturbations.

## What this means for robotics

RoboSkin analysis: the contribution is a data-selection method for the moment when contact dynamics matter most. Rather than treating a full trajectory as uniformly valuable, it concentrates computation on the pre-contact segment that controls impact and grasp stability. That idea could complement [tactile world models](/tactile-foundation-models) by identifying which action windows deserve denser sensing and validation.

The paper also shows why success-only data can be misleading for contact-rich work. In this simulation, optimizing catching without the impact objectives produces similar completion but much larger impact. For fragile objects or human-facing manipulation, force, relative velocity and follow-through should remain visible metrics beside task success.

## Limitations and availability

Outcome-Sensitive Motion Search is an arXiv v1 preprint and a simulation-only result. Candidate selection depends on simulated contact dynamics and an error model calibrated from one imitation policy. The search cannot recover behavior outside the learned motion manifold, including failures that require different finger control or post-contact recovery.

No official project page, repository, dataset download, trained model or software license was verified. The manuscript is readable through arXiv, but the 99,328 demonstrations described in the experiment are not thereby a publicly downloadable dataset. RoboSkin.ai has not run the simulator or reproduced the numbers.

## Keep demonstration repair and policy evaluation separate

The 44.3% repair rate concerns task conditions where the original teacher failed. The 91.8% demonstration coverage concerns conditions represented by successful unperturbed rollouts. The final policy's 90.3% task success is another experiment, on held-out conditions. None of these percentages is interchangeable. [Construction and evaluation tables](https://arxiv.org/html/2609.29020v1#S5).

| Stage | What the method can change or observe |
| --- | --- |
| Offline motion search | Privileged simulator state and event alignment; replace the short arm-motion segment while the teacher controls the fingers |
| Candidate validation | Execute complete simulated rollouts with modeled student action errors; retain qualified successes |
| Final policy execution | Observe a restricted history, predict an action chunk, execute its first action and replan at 50 Hz |
| Hardware transfer | Still requires evidence for perception, contact dynamics, force measurement and executed recovery |

The distinction explains an otherwise surprising result: unperturbed-only selection covers more conditions, yet its resulting policy performs worse than the full method. A demonstration that succeeds precisely in simulation may be sensitive to the execution errors of the learner.

For evaluation, retain both the 93.6% catch-completion rate and the stricter 90.3% task-success rate, then label impact averages as conditional on completion. A low mean force among retained catches does not bound the forces of failures or the worst case. No tactile-skin benefit is measured here: any proposal to add touch is a new system design requiring its own test. The [robot-hand evidence guide](/robot-hands#mechanics-measurement-task) connects those control metrics to the mechanical and sensing properties that a physical hand must actually provide.

## Sources and related resources

- [arXiv v1 record, submitted September 24, 2026](https://arxiv.org/abs/2609.29020)
- [Full simulation setup, results and limitations](https://arxiv.org/html/2609.29020v1)
- [RoboSkin dexterous manipulation overview](/tactile-manipulation)
- [RoboSkin robot learning resources](/robot-learning)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not built or run these systems.*
`,
  },
  {
    id: 'body-grounded-replanning-physical-manipulation',
    title: 'Body-grounded replanning lets joint load change the robot strategy',
    seoTitle: 'Body-Grounded Replanning for Physical Robot Adaptation',
    seoDescription: "Separate body-triggered strategy selection from dynamics planning; review raw effort, matched baselines and active-motion versus elapsed-time metrics.",
    excerpt: 'Microsoft Research Asia, Waseda, Chiba and NII researchers move proprioceptive evidence into high-level replanning. Hardware success reaches 96.3%, while LLM pause time is excluded.',
    category: 'Physical AI planning',
    image: '/generated/news/body-grounded-replanning-physical-manipulation.png',
    imageAlt: 'Diagram showing joint effort and contact events triggering a high-level strategy change in a robot manipulation task.',
    imageCaption: 'Original RoboSkin.ai schematic of body-state-triggered manipulation replanning. It is explanatory artwork, not a robot experiment image.',
    sourceTitle: 'Body-Grounded Replanning for Physically Adaptive Manipulation',
    sourceUrl: 'https://arxiv.org/abs/2609.30024',
    sources: [
      { title: 'Body-Grounded Replanning arXiv v1 record', url: 'https://arxiv.org/abs/2609.30024' },
      { title: 'Full v1 method, tables and limitations', url: 'https://arxiv.org/html/2609.30024v1' },
      { title: 'Author-provided qualitative experiment video', url: 'https://youtu.be/_qclDPyHm4U' },
    ],
    technicalFocus: ['proprioceptive feedback', 'contact-aware replanning', 'physical AI', 'LLM robot planning'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'Preprint · arXiv v1 · simulation and real-robot evaluation · qualitative contact-task extension',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-27',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# Body-grounded replanning lets joint load change the robot strategy

Researchers at Microsoft Research Asia–Tokyo, Waseda University, Chiba University and Japan's National Institute of Informatics released Body-Grounded Replanning on September 24, 2026. The framework turns joint position, actuator effort, contact and recent execution history into high-level evidence: when the current motion becomes physically unsuitable, GPT-4o-mini selects another strategy while the task objective and low-level controller remain unchanged. [Paper and version record](https://arxiv.org/abs/2609.30024).

## Key takeaways

- In ten real-robot reaching conditions, body-grounded replanning and an environment-only search baseline both reach 96.3% success; the main advantage is faster restricted completion, 24.57 seconds versus 28.18 seconds.
- A rule-based controller using the same body-state events reaches 66.3%, showing that detecting strain or contact is not equivalent to choosing the right alternative.
- The three contact-rich tasks—button pressing, box-lid opening and lint-roller extraction—are qualitative demonstrations without repeated success rates.

## What changed

Most manipulation planners ask whether a trajectory is geometrically feasible. This work adds a second question: is the strategy physically suitable for the robot's current body state? A path may still reach the target while producing high joint effort, approaching a joint limit or encountering contact earlier than expected.

The monitor records per-joint position, velocity and effort plus binary contact at 20 Hz. Current measurements and a learned short-horizon prediction trigger events such as high effort, limited mobility, no progress or early contact. GPT-4o-mini, run at temperature zero, receives the current strategy, joint-level state, recent execution statistics, event summary, history and a manually defined menu of alternative strategies. Its structured choice changes the high-level motion while leaving the low-level controller in place.

## Results under the reported conditions

The controlled simulation uses a Franka Panda and generates 100 paired episodes for each of ten load or asymmetric-mobility conditions. The body-grounded method maintains 90% to 99% success and records the lowest mean joint-torque norm in every condition. Across all ten simulated conditions, overall success is 96.7%, compared with 88.5% for the rule-based body-state baseline. [Full results](https://arxiv.org/html/2609.30024v1#S5).

The hardware study uses a CRANE-X7 with Dynamixel actuators. Environment-only search, rules and body-grounded replanning each receive eight trials per condition under a 45-second execution budget. The body-grounded and environment-only methods both average 96.3% success; rules average 66.3%. Body grounding has the lowest restricted completion time in nine of ten conditions and the lowest overall mean at 24.57 seconds. Its average actuator-effort norm is also lowest—2.18 versus 2.28 and 2.33—but it wins that metric in only five of ten individual conditions.

Restricted completion time assigns the full 45 seconds to failures and excludes LLM inference pauses. That makes the metric useful for combining reliability and active robot time, but it is not end-to-end wall-clock latency. The paper does not publish a separate distribution for network or model response time.

The authors also show one execution each for obstacle-avoiding button pressing, box-lid opening and lint-roller extraction. Contact or impeded motion triggers a strategy change and task completion in the shown sequences. These examples demonstrate interface reuse, not a quantified manipulation benchmark.

## What this means for robotics

RoboSkin analysis: body-grounded replanning moves [proprioceptive and contact signals](/sensors) above the servo layer. Instead of only correcting torque locally, the robot can decide that the entire approach direction, posture or action order is wrong for its current physical condition.

The comparison with environment-only search is equally important. Both succeed at the same rate on hardware, so the evidence supports efficiency and physical suitability more strongly than raw completion. A production system would also need bounded fallback behavior when the language model is slow, unavailable or selects an unsafe strategy.

## Limitations and availability

This is an arXiv v1 preprint. The high-level strategy set and event thresholds are manually defined, tasks are short-horizon, and the strongest repeated evaluation is controlled reaching rather than the three contact-rich demonstrations. Hardware effort uses raw Dynamixel readings, not calibrated joint torque, so values are only compared within that platform.

The paper links an author-provided [qualitative video](https://youtu.be/_qclDPyHm4U), and Figure 3 supplies prompt text, but no executable integration package, public code repository, logs, dataset or software license was verified. A printed prompt is not a reproduced deployment. GPT-4o-mini is an external hosted model, and the evaluation excludes its inference pauses from active execution time. RoboSkin.ai has not reproduced the system.

## Record the event, the strategy and both elapsed-time clocks

The learned predictor is a short-horizon joint-state estimator that informs one effort-near-limit trigger. It is not a world model that evaluates the physical consequences of arbitrary candidate actions. The language model chooses from nine predefined strategies, and only the structured strategy field controls the robot; explanatory text is not executed as a motor command. [Monitor and replanning method](https://arxiv.org/html/2609.30024v1).

At 20 Hz, a fifteen-step monitoring window covers 0.75 seconds, while ten-step persistence and cooldown rules each span 0.5 seconds. These are different from language-model response time. The reported completion metric excludes those inference pauses, so it cannot establish end-to-end cycle time.

| Record | Why it matters |
| --- | --- |
| Body trace and event | Distinguishes raw effort or contact evidence from an inferred event label |
| Strategy choice and allowed menu | Shows whether the response was available under the same constraints |
| Motion-only time | Reproduces the paper's active execution metric and failure-horizon penalty |
| Wall-clock time and pauses | Exposes model/network delay, waiting and actual task duration |

Hardware effort is a raw Dynamixel quantity, not calibrated joint torque, contact force or energy consumption. The rule baseline also lacks the continuous body context supplied to the language model. A comparison therefore tests the complete information-and-selection design, not whether language models are uniquely necessary for adaptation.

For a proposed receiving test, log rejected choices and unavailable responses as well as successful strategy changes, with a separately defined fallback. That is evaluation guidance, not a capability implemented or tested here. The [prediction/control comparison](/robot-world-models#prediction-runtime-contracts) places this method beside world-action systems without relabeling it as one.

## Sources and related resources

- [arXiv v1 record, submitted September 24, 2026](https://arxiv.org/abs/2609.30024)
- [Full framework, tables and limitations](https://arxiv.org/html/2609.30024v1)
- [Author-provided experiment video](https://youtu.be/_qclDPyHm4U)
- [RoboSkin Physical AI overview](/physical-ai)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these models or robot experiments.*
`,
  },
  {
    id: 'polyumi-visual-tactile-audio-demonstration-interface',
    title: 'PolyUMI records vision, touch and contact audio in one wireless interface',
    seoTitle: 'PolyUMI: Visual-Tactile-Audio Robot Demonstrations',
    seoDescription: "Distinguish PolyUMI slip-control and VisTA experiments, validation protocols, synchronization and finger-only BOM from complete integration and reproduction.",
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
    updated: "2026-11-04",
    readTime: "6 min read",
    content: `# PolyUMI records vision, touch and contact audio in one wireless interface

Researchers at Northwestern University, TU Darmstadt, Hessian.AI and the Robotics Institute Germany released PolyUMI on September 24, 2026. The wireless handheld interface records wrist vision, optical touch, contact audio and proprioception, then moves the same sensing finger to a robot end effector. The authors evaluate separate object classifiers and a slip-control policy, alongside a companion VisTA policy for contact-rich manipulation. [Paper and version record](https://arxiv.org/abs/2609.29760).

## Key takeaways

- The authors estimate $235.96 in sensing-finger parts and four hours of assembly, excluding the base UMI gripper, robot end effector and integration; moving it between the handheld collector and robot takes about ten minutes.
- In a ten-trial slip-control ablation using a diffusion U-Net trained on 80 demonstrations, vision, touch and audio succeed 8/10 times, versus 2/10 for vision alone. This is a small task-specific experiment, not a general success rate.
- The public repository is useful but not yet a clean reproduction package: several author-specific dependencies remain placeholder links, and its README lists an older tactile stream specification than the paper. [Repository notes](https://github.com/polyumi/PolyUMI-platform).

## What changed

Portable demonstration tools usually record what a camera sees and how the tool moves. PolyUMI adds signals that expose the physical interaction itself. Its curved-mirror optical finger observes a deformable reflective skin; a piezo contact microphone records structure-borne vibration; a fisheye GoPro supplies wrist vision; and SLAM plus ArUco markers recover the handheld pose and gripper opening.

The paper reports 20 fps tactile video at 1152 by 648 pixels, 16 kHz mono contact audio and 60 fps wrist video at 1920 by 1080. The streams are aligned to a 10 Hz policy clock. Images use a two-step history, while audio becomes a log-Mel spectrogram covering roughly the latest 0.5 seconds. On the robot, those 10 Hz policy commands are interpolated into joint torques at 1 kHz by a Cartesian impedance controller.

VisTA does not collapse every sensor to one vector before fusion. Modality-specific encoders produce 294 tokens across vision, touch, audio and robot state. An eight-layer transformer mixes those tokens across sensor, space and time, and an 18-layer flow-matching model predicts chunks of 16 relative end-effector actions.

## Results under the reported conditions

The experiments answer different questions, so their numbers should not be combined into one headline score. A tactile-image classifier reaches 92.3% accuracy over five printed surface patterns, using scene-separated training and test images. This is not a test of arbitrary unseen object categories. For a closed box holding gears, thin screws or thick screws, sensor combinations without audio reach 42% to 44% accuracy; adding contact audio lifts each tested combination to about 80%. Training uses 20 demonstrations per class and validation uses ten across three seeds; the best validation checkpoint is selected. That validation score should not be described as an additional independent held-out test. [Object-inference protocol](https://arxiv.org/html/2609.29760v1#S4.SS2).

Slip control is a ten-trial ablation. The robot must let a screwdriver rotate under gravity, then catch it within ten degrees of vertical. Vision-touch-audio succeeds 8/10, touch-audio 7/10, vision-touch and vision-audio 3/10 each, touch 3/10, vision 2/10 and audio alone 0/10.

For complete manipulation, VisTA reaches 75% full success on board wiping and 100% when partial completion is included. On lightbulb turning, however, every evaluated method reaches at least 80%, and the vision-only diffusion policy performs best. The authors explicitly interpret this as a task where clear visual state makes extra contact sensing less useful. [Official results summary](https://polyumi-vista.github.io/#experiments).

## What this means for robotics

RoboSkin analysis: PolyUMI's most important contribution is not a universal multimodal-policy win. It is a practical bridge between demonstration and deployment. Sharing the same finger preserves sensing geometry, while live contact audio gives the human demonstrator feedback during collection. That can reduce two shifts at once: what the operator can perceive and what the policy later observes.

The results also reinforce a useful design rule for [visuo-tactile learning](/visuo-tactile): choose sensors by hidden task state. Audio dominates the sealed-box classification, touch plus audio helps rapid slip control, and extra modalities add little when the goal remains visually obvious.

## Limitations and availability

PolyUMI is an arXiv v1 preprint, not an independently reproduced system. Manipulation trials use one Franka setup and modest evaluation counts. The off-the-shelf Franka Hand also required modification for 200 Hz continuous gripper positioning.

The GitHub repository has an MIT root software license and contains hardware, firmware, ingestion, ROS 2 and policy tooling. That root license does not establish all third-party hardware or dataset terms. Its README still describes an anonymized review copy, but the public repository now has a visible commit history. Its documentation says several private forks are represented by links that will not resolve until a camera-ready release, so a fresh clone cannot complete every documented setup step today. Training was only tested on an RTX 6000 Ada with 48 GB; the authors estimate at least 32 GB of GPU memory.

There is also a source mismatch worth checking before procurement: the paper and project page report 20 fps tactile video at 1152 by 648, while the current repository README says 10 fps at 540 by 480. That may reflect an older configuration, but no versioned explanation was visible. Teams should treat the manuscript specification as experimental context and verify the repository configuration they can actually build.

## Match the experiment and the clock before reusing a result

The 8/10 slip result belongs to the diffusion U-Net experiment, not the VisTA flow-matching model. Wiping and bulb turning evaluate VisTA; object inference uses classifiers. Naming the sensor combination alone is insufficient to identify the trained model or evaluation protocol. [Separate experimental setups](https://arxiv.org/html/2609.29760v1).

Sharing a physical sensing finger preserves geometry, but it does not automatically synchronize the camera, audio and commands. The pipeline aligns observations using the highest-latency stream and skips early predicted actions according to measured and calibrated delays. Its ten-hertz action grid, predicted chunk of 16 actions, execution of the first three and one-kilohertz impedance loop are distinct quantities.

An integration record should therefore include capture and receive timestamps, alignment and delay calibration, dropped samples, executed action indices and controller settings. Keep the reported finger-only bill of materials separate from assembly, host compute, the UMI gripper and robot hardware. Resolve the paper/README image-rate mismatch against the actual build revision before procuring parts. These are proposed checks, not a RoboSkin installation. The [teleoperation guide](/robot-teleoperation#contact-signal-roles) compares this shared-sensor route with cross-embodiment signal mapping.

## Sources and related resources

- [PolyUMI arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.29760)
- [Full methods and evaluation](https://arxiv.org/html/2609.29760v1)
- [Official PolyUMI and VisTA project](https://polyumi-vista.github.io/)
- [Official MIT-licensed repository](https://github.com/polyumi/PolyUMI-platform)
- [RoboSkin tactile dataset directory](/datasets)

*Evidence review updated November 4, 2026. Original publication dates are retained. We inspected sources and public metadata; we did not run these robot systems or download their training archives.*
`,
  },
  {
    id: 'propra-fingertip-sensor-pretraining',
    title: 'PROPRA anchors pre-touch and tactile signals to robot state and future actions',
    seoTitle: 'PROPRA Pretrains Proximity and Tactile Robot Sensors',
    seoDescription: "Review PROPRA pretraining, policy fine-tuning, sampling differences and task-specific results; distinguish future-action training anchors from runtime inputs.",
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
    updated: "2026-11-04",
    readTime: "6 min read",
    content: `# PROPRA anchors pre-touch and tactile signals to robot state and future actions

Researchers at Japan's National Institute of Advanced Industrial Science and Technology and the CNRS-AIST Joint Robotics Laboratory introduced PROPRA on September 24, 2026. Short for PROprioceptive-and-PRoactive Anchoring, the method pretrains separate encoders for reflective proximity and pressure-sensitive tactile histories by aligning each with the robot's current state and upcoming actions. On four real-robot tasks, it reports a 75.0% average success rate. [Paper and version record](https://arxiv.org/abs/2609.29822).

## Key takeaways

- Proximity sensing becomes informative during approach, while tactile pressure responds after contact. PROPRA gives both a continuously changing sensorimotor anchor without directly forcing the two sensor embeddings together.
- Across three seeds and 20 trials per seed, PROPRA averages 75.0% versus 71.7% for image-anchored pretraining and 72.1% for image anchoring plus direct tactile-proximity pairing.
- The improvement is not uniform: the image anchor reaches 76.7% on OpenLid versus 73.3% for PROPRA, and code is still labeled “soon.” [Official project](https://tomohiromotoda.github.io/nia.propra/).

## Why naive sensor fusion is not enough

The AIST gripper carries three tactile and six proximity channels. Each encoder receives 0.5 seconds of history. Proximity varies as the fingers approach an object; tactile stays near baseline until contact. After contact, the relationship reverses. In the authors' demonstrations, at least one sensor stays near its stationary value in more than half of the pretraining samples.

Simple concatenation does not consistently help in this experiment. Adding both raw histories to the vision-and-state diffusion policy raises average success from 30.4% to 40.4%, but MovePen falls from 31.7% to 20.0% and OpenLid also underperforms vision alone. This comparison motivates task-specific fusion checks; it does not isolate sparsity as the sole cause of a failure.

PROPRA aligns each sensor encoder independently to an anchor containing the current end-effector pose, gripper opening and next ten subsampled actions, spanning about 1.67 seconds. The contrastive objective never directly pairs tactile and proximity. After pretraining, the sensor encoders are fine-tuned end-to-end with the imitation policy; the anchor and its encoder are removed. The frozen encoders described in the representation probes are a separate evaluation setting.

## Results under the reported protocol

The real-robot evaluation uses a UR5e on PickCup, PickSponge, MovePen and OpenLid, with 50 demonstrations per task according to the manuscript’s Section V-A. The project page still says 20 per task; this unresolved source discrepancy should be checked before planning a reproduction. Every policy condition is trained with three seeds and evaluated for 20 trials per seed. PROPRA reaches 81.7% on both pickup tasks, 63.3% on MovePen and 73.3% on OpenLid. The corresponding image-anchor scores are 75.0%, 75.0%, 60.0% and 76.7%. [Complete comparison table](https://arxiv.org/html/2609.29822v1#S6).

The average lead is 2.9 percentage points over the strongest image-plus-pair variant, or 3.3 points over plain image anchoring, and the paper notes that per-task differences fall within variation across seeds. A fair reading is that PROPRA is competitive and strongest where sensor responses are sparse, not that it wins every manipulation setting.

Representation probes add a more specific result. Over the two seconds before contact, a linear predictor on the frozen proximity embedding achieves the highest time-to-contact R-squared on three of four tasks. On PickSponge it reaches 0.440 versus 0.377 for the image anchor. On MovePen, the image-plus-pair condition is slightly higher, 0.554 versus 0.544.

The authors also collect 100 additional execution episodes per task. After zero-point alignment to compensate for proximity-sensor drift, PROPRA remains positive on every task and seed when a predictor fitted on demonstrations is transferred without refitting. That preprocessing caveat matters: this is not calibration-free deployment.

## What this means for robotics

RoboSkin analysis: PROPRA offers a useful alternative to treating camera features as the universal alignment target. A robot's own state and intended action exist throughout the trajectory, including moments when an individual [tactile sensor](/sensors) is silent. This can be especially useful for custom fingertips that do not match large visual-tactile foundation-model hardware.

The paper also supplies a warning for multimodal [robot learning](/robot-learning): an added channel does not help just because it measures contact. The learning objective must tell the model when that channel carries information. Separating pre-touch and post-contact phases may matter as much as increasing sensor resolution.

## Limitations and availability

PROPRA is an arXiv v1 preprint evaluated on one gripper, one robot and four grasp-oriented tasks. It does not compare directly with large-scale tactile foundation models, and its pretraining requires recorded robot states and future action segments as anchors. Those future segments are not required at inference. Pretraining takes about three to four hours and policy training about eight hours on one NVIDIA H200 with 141 GB of memory, which is a demanding reference configuration rather than a minimum requirement.

The official project page provides the paper and videos under a CC BY-SA 4.0 page license, but its code link reads “soon.” The November 4 recheck still found Code (soon), without verifying a training repository, model weights, demonstration download or software license. RoboSkin.ai has not reproduced the experiments.

## Separate the anchor, sampling recipe and control loop

The proposed training recipe weights selected proximity/contact-transition samples more heavily and adds hard negatives. Image-anchored baselines sample uniformly. The reported comparison therefore changes the sampling recipe as well as the anchor; it cannot assign the entire success difference to proprioception and future actions alone. [Sampling and policy integration](https://arxiv.org/html/2609.29822v1).

| Quantity | Role | What it does not establish |
| --- | --- | --- |
| Sensor history | Fifty samples from a 100 Hz stream, covering 0.5 seconds | A 100 Hz policy or actuator loop |
| Future action anchor | Recorded training context, removed during deployment | Access to future actions at inference |
| Time-to-contact probe | Regression on frozen proximity features | A deployed collision-avoidance controller |
| Policy success | Three seeds, 20 trials per seed and task | Uniform superiority across tasks or sensors |

The contact threshold used for the probe is in sensor AD units, not a calibrated force limit. Drift alignment remains part of the new-episode analysis. For reuse, log zeroing, sensor-history alignment and the exact sampler; compare anchor choices under a matched sampler if that is the question being tested. Report probe accuracy and task completion separately. These are proposed controls, not experiments performed by RoboSkin. See the [training and runtime distinctions](/visuo-tactile#training-and-runtime-touch).

## Sources and related resources

- [PROPRA arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.29822)
- [Full method, tables and limitations](https://arxiv.org/html/2609.29822v1)
- [Official PROPRA project](https://tomohiromotoda.github.io/nia.propra/)
- [RoboSkin tactile foundation models guide](/tactile-foundation-models)

*Source review updated November 4, 2026. Original publication dates are retained. Findings are attributed to their authors; we did not run these systems or verify dataset payloads.*
`,
  },
  {
    id: 'whole-hand-force-regulation-without-tactile-sensors',
    title: 'Whole-hand force regulation tracks contact without tactile sensors',
    seoTitle: 'Whole-Hand Force Regulation Without Tactile Sensors',
    seoDescription: "Separate whole-hand geometry-based contact estimates, force-solver timing, 30 Hz pose updates and the limits of three physical recovery runs.",
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
    updated: "2026-11-04",
    readTime: "5 min read",
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

There is a measurable speed-coverage trade-off. Allowing one candidate per link gives a 227 Hz force solve and 90.9% success; five candidates peaks at 93.2%; seven slows to 66 Hz and falls to 91.9%. The selected five-contact setting has a mean solve time whose reciprocal is about 84 Hz. That computation benchmark is not the physical controller update rate: the hardware contact search and solve run once per 30 Hz tracked pose, paired with joint state at the image timestamp.

Hardware uses a 7-DoF Flexiv Rizon 4 arm, a 20-DoF Robotis 5F hand, one RealSense D455, an Intel i9-13900K and an RTX 4090. The hand's fingertip tactile sensors are present but unused. A Pringles can and two boxes are pushed or taken during the three runs. Six of eight losses are recovered autonomously; the other two leave the arm workspace and require a person to reposition the object and restart. These demonstrations show autonomous transitions, but three runs are not a comparative hardware benchmark.

## What this means for robot skin

RoboSkin analysis: this work is a useful counterexample to the claim that every contact-control problem requires dense skin. If the object model, pose tracker and hand kinematics are reliable, geometry can infer likely contacts over surfaces that have no taxels at all.

That does not eliminate the case for [robot skin](/). It relocates it. A suitably placed and calibrated tactile layer could supply local evidence of contact or slip when geometry is uncertain; which quantities it measures depends on the sensor and estimator. Geometry offers broad coverage; touch offers physical confirmation. A hybrid system could use this controller as a contact prior and tactile residuals to correct model error.

## Limitations and availability

The method requires an object model from CAD or a short RGB-D scan and a maintained six-degree-of-freedom pose. Heavy occlusion breaks contact estimation. Thin objects are especially sensitive because millimeter-scale pose error can flip a sampled point to the far side and reverse the estimated normal.

Force allocation is quasi-static. It does not explicitly compensate gravity, inertia or external wrenches, even though friction is expected to resist unmodeled loads. Simulation disables gravity, and hardware disturbances are manual rather than standardized.

The project supplies the paper, videos and detailed results. Its code link is labeled “Soon”; no repository, data package or software license was verified on September 26, and the November 4 project-page check still shows that pending code control. The project-page content is CC BY-SA 4.0, which licenses that page, not unreleased controller code. RoboSkin.ai has not reproduced the system.

## Check stale state before trusting the force command

The rendered force arrows are commands, not measured contact forces. Contact locations come from geometry, so a plausible visualization does not independently verify the physical force distribution. The paper also retains the last feasible command when the optimization fails, starting from zero before a feasible solution exists. [Controller and hardware timing](https://arxiv.org/html/2609.30082v1).

For an integration review, ask how old the object pose may be, which joint sample it is paired with, and how a failed solve or lost tracker is signaled. Record any human repositioning separately from automatic regrasp. These are proposed acceptance questions; the paper does not establish a validated stale-data watchdog for a new platform.

Use the [tactile manipulation interface comparison](/tactile-manipulation#contact-information-and-command-interfaces) to distinguish a geometry-derived contact hypothesis from a measured force input, a desired force and the controller that executes it.

## Sources and related resources

- [arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.30082)
- [Full controller and evaluation](https://arxiv.org/html/2609.30082v1)
- [Official project and uncut hardware runs](https://sangminkim-99.github.io/reactive-grasp-whole-hand/)
- [RoboSkin dexterous robot hands guide](/robot-hands)

*Evidence review updated November 4, 2026. The original paper and article dates are retained; source inspection is not a RoboSkin.ai reproduction.*
`,
  },
  {
    id: 'res-hil-human-guided-residual-rl-manipulation',
    title: 'Res-HIL learns corrections around a frozen manipulation policy',
    seoTitle: 'Res-HIL: Human-Guided Residual RL for Manipulation',
    seoDescription: "Review Res-HIL intervention labels, duplicate replay roles and human-time costs; separate frozen base weights, residual updates and successful-cycle timing.",
    excerpt: "Res-HIL uses interventions as corrective targets and reward shaping around a frozen base policy. Review task evidence, residual updates and the remaining human workload.",
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
    updated: "2026-11-04",
    readTime: "6 min read",
    content: `# Res-HIL learns corrections around a frozen manipulation policy

Researchers at Siemens and the Technical University of Munich introduced Res-HIL on September 24, 2026, for sample-efficient adaptation of contact-rich robot skills. Instead of replacing a behavior-cloning policy during online learning, the method freezes it and trains a residual correction. Human interventions supervise that correction and penalize the autonomous actions that led toward failure. [Paper and version record](https://arxiv.org/abs/2609.30023).

## Key takeaways

- Every online method starts from 20 demonstrations; frozen ACT and unguided ResFiT reference policies also receive 100-demonstration variants.
- After ten minutes, Res-HIL reports 100%, 64%, 50%, 66% and 92% success across five task conditions. HIL-SERL reaches 90%, 30%, 10%, 0% and 0% under the same table.
- Final evaluations use 50 fixed randomized configurations and three training repetitions under a stated intervention criterion. That is substantial real-robot evidence, but not independent validation across people or platforms.

## What changed

Human-in-the-loop reinforcement learning can adapt a robot online, but changing the entire policy risks discarding useful behavior already learned from demonstrations. Residual learning preserves that base and learns only an additive correction. Res-HIL combines the two ideas while addressing an unstable start: the residual output layer is initialized to zero, so the deployed action initially equals the base action.

During training, the operator takes over when failure, damage or an unrecoverable deviation seems likely, and releases control after returning the robot to a recoverable state. The human action becomes a target residual relative to the frozen base. Res-HIL also applies decaying penalties to autonomous steps immediately before the first two intervention segments, turning each correction into both a supervised example and a reward-shaping signal.

Two replay buffers organize online experience and demonstration/intervention samples, with intervention transitions represented in both. Training batches draw equally from the buffers. A TD3 actor-critic objective learns the residual; the reported 7 Hz is the robot control frequency, not an optimizer-update rate. Behavior cloning matches human corrections, and a magnitude penalty discourages unnecessarily large changes.

## Results under the reported conditions

The five conditions are easy and hard peg insertion, vent-lid insertion, and cable manipulation with two or three cameras. The base ACT policy uses 20 demonstrations. Online budgets are 20 minutes for easy peg insertion and 45 minutes for the other tasks. Each evaluation uses the same 50 predefined randomized starts across methods, and every online experiment is repeated three times. [Protocol and full tables](https://arxiv.org/html/2609.30023v1#S4).

After ten minutes, Res-HIL is already the strongest reported method on every condition. Final success is 100%, 96%, 100%, 88% and 100%. The 20-demonstration ACT base reaches 36%, 28%, 44%, 46% and 70%; ACT with 100 demonstrations reaches 84%, 60%, 80%, 80% and 92%.

HIL-SERL eventually reaches 100%, 94% and 84% on the three insertion tasks but 0% on both cable conditions. The shared vent criterion requires edge-first insertion; it would be 100% if pushing the lid directly through were counted. Res-HIL averages 5.46 seconds across successful task episodes, compared with 5.83 seconds for 100-demonstration ACT and 7.73 seconds for 20-demonstration ACT. HIL-SERL is faster on the insertion tasks it solves, so Res-HIL's strength is coverage rather than the fastest motion everywhere.

The ablation is narrower than the main evaluation. On easy peg insertion, removing zero initialization doubles convergence time from eight to 16 minutes. Removing intervention-aware reward shaping prevents convergence within 30 minutes and finishes at 92%. The paper says direct residual supervision is critical, but these component tests do not establish identical effects on the long-horizon cable tasks.

## What this means for robotics

RoboSkin analysis: Res-HIL is relevant to [contact-rich manipulation](/tactile-manipulation) even though its policy observes cameras and proprioception rather than tactile arrays. It treats rare contact failures as correction opportunities instead of asking a new policy to rediscover the entire behavior online.

For tactile systems, the same architecture could preserve a visual-proprioceptive base while a residual learns corrections from touch. But that extension remains an inference, not a result in this paper. The study does not test tactile input, force feedback or whether interventions transfer between operators.

The comparison with 100 demonstrations also needs context. The authors estimate collecting 100 demonstrations takes about 30 minutes for peg insertion, 45 minutes for vent insertion and 60 minutes for cable manipulation. Res-HIL reduces initial demonstrations, but it adds online robot time plus a human who monitors and occasionally takes control. Sample efficiency is therefore a trade between offline demonstration and supervised online interaction, not zero human effort.

## Limitations and availability

Res-HIL is an arXiv v1 preprint on one robot setup. Interventions follow a stated qualitative criterion; the reviewed paper does not establish an operator-count or cross-operator evaluation. The paper reports that intervention ratios fall during training, but operator-to-operator variation, delayed takeover and safety outside the tested fixtures remain unknown.

The paper acknowledges that concurrent FTC and HiL-ResRL methods were not reproduced because they appeared shortly before submission. Comparisons therefore cover the listed baselines rather than every current human-guided residual approach.

The official project page provides task videos and a method overview. No public code repository, checkpoint, training data or software license was verified through the project page in the November 4 check. The paper itself is available under CC BY 4.0; that license does not make absent implementation artifacts available. RoboSkin.ai has not run the training system.

## An intervention is both a control decision and a training label

The human supplies a complete action, and the learning target subtracts the frozen base action to obtain the desired residual. Intervention timing also shapes rewards on preceding autonomous transitions. Those two signals depend on the operator's judgment; an intervention does not independently prove which earlier action caused the problem. [Method and protocol](https://arxiv.org/html/2609.30023v1).

The online replay buffer contains autonomous and human-controlled transitions. Intervention transitions also enter the demonstration buffer alongside initial demonstrations, and each training batch samples equally from the two buffers. Record those sampling roles instead of adding buffer sizes as if they were disjoint unique experiences.

| Cost or outcome | What to retain in a proposed study |
| --- | --- |
| Demonstrations | Collection time, unique episodes and initialization checkpoint |
| Supervision | Monitoring duration, takeovers, resets and operator identity |
| Adaptation | Online interaction, optimizer updates, residual magnitude and policy versions |
| Evaluation | Frozen evaluation policy, fixed starts, failed trials and elapsed time |

The intervention fraction measures time under human control because transitions have equal duration. It does not count the attention needed while the robot runs autonomously or the labor of resetting scenes. Similarly, 5.46 seconds averages successful episodes; it is not throughput after failures, retries and human work.

Zero initialization preserves the base behavior only at the start. A residual magnitude penalty encourages small corrections but is not a hard bound on future commands or evidence of safe exploration. The paper does not establish transfer across intervention operators, so operator composition and takeover rules should be explicit in a receiving test. See the [learning-change comparison](/robot-learning#learning-change-contract) for the distinction between fixed base weights and a changing complete policy.

## Sources and related resources

- [Res-HIL arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.30023)
- [Full method, evaluation and ablations](https://arxiv.org/html/2609.30023v1)
- [Official Res-HIL project and videos](https://iavorskaiamariia.github.io/Res-HIL-website/)
- [RoboSkin robot manipulation guide](/robot-manipulation)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these research systems or robot experiments.*
`,
  },
  {
    id: 'tactilestep-sole-pressure-humanoid-locomotion',
    title: 'TactileStep closes the loop on Unitree G1 sole pressure',
    seoTitle: 'TactileStep: Sole Tactile Feedback for Humanoid Locomotion',
    seoDescription: "Interpret TactileStep force, center-of-pressure and area features; separate sampling delay, impact definitions and near-robot sound from broad claims.",
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
    evidenceStatus: "CoRL 2026 Spotlight identified by project · arXiv v1 reviewed · implementation unverified",
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-25',
    updated: "2026-11-04",
    readTime: "6 min read",
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

The original September 25 review found “Code Soon” on the project page. The November 4 recheck found paper, media and a CoRL 2026 Spotlight designation, but did not verify a repository, weights, training environments or sensor dataset. [Official availability](https://tactilestep.github.io/).

## Check what each sole feature actually represents

The compact features are useful precisely because they discard detail. Their semantics must survive a change of insole, mounting or calibration. The [feature and evaluation appendices](https://arxiv.org/html/2609.28959v1) show why a small numeric vector is not a complete measurement of foot-ground mechanics.

| Feature | Transformation | Possible misreading |
| --- | --- | --- |
| Normal force | Calibrated raw readings are summed, normalized and clipped | A saturated value is not an uncapped impact measurement |
| Center of pressure | Weighted location is set to zero below a low-force threshold | Zero can indicate an unloaded foot rather than centered support |
| Contact-area ratio | Fraction of taxels exceeding an activation threshold | This is not a directly measured continuous geometric contact patch |

At 25 Hz, samples are nominally 40 ms apart. Less than 1 ms of processing and transmission after acquisition does not remove that sampling interval or model/control delay. The 100 Hz comparison addresses two tested conditions; it does not prove that every impact transient is captured faithfully.

Metric definitions also differ across settings: simulation uses the maximum over a landing window, while the physical protocol uses the first rising edge in the insole-derived force. Its sound measurement is peak A-weighted level near the lower leg under a fixed microphone setup, not workplace exposure or an efficiency measurement. The energy trade-off remains important even when contact is quieter.

A proposed acceptance record should retain insole revision, calibration, feature thresholds, timestamps and terrain/microphone geometry with each trial. Recheck these after remounting or wear rather than transferring the paper's best percentage to a new surface. The [humanoid sensing and control comparison](/humanoid-robots#observation-planning-control) places these features alongside model decisions and physical outcomes.

## Sources and related resources

- [TactileStep arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.28959)
- [Full methods, evaluation and limitations](https://arxiv.org/html/2609.28959v1)
- [Official TactileStep project](https://tactilestep.github.io/)
- [RoboSkin tactile sensors guide](/sensors)

*Source review updated November 4, 2026. Original publication dates are retained. Results are reported by the authors; RoboSkin has not run these systems.*
`,
  },
  {
    id: 'anthropomimetic-forearm-carpal-stiffness',
    title: 'An open robotic forearm tests how eight carpal bones redirect wrist stiffness',
    seoTitle: 'Open Anthropomimetic Forearm Tests Carpal Wrist Stiffness',
    seoDescription: "Interpret carpal-wrist stiffness direction, single-build statistics and quasi-static tests; inspect assembly repeatability and file-specific release terms.",
    excerpt: 'A University of Electro-Communications team compares anatomically shaped, fused and ellipsoidal wrist skeletons. Its open release includes CAD, printable parts, firmware and analysis data under file-specific licenses.',
    category: 'Soft robotic hardware',
    image: '/generated/news/anthropomimetic-forearm-carpal-stiffness.png',
    imageAlt: 'Diagram comparing independently articulated carpal bones, a fused proximal row and an ellipsoidal wrist skeleton under tendon loading.',
    imageCaption: 'Original RoboSkin.ai schematic of the three wrist configurations. It simplifies the anatomy and is not an experimental photograph.',
    sourceTitle: 'Anthropomimetic Soft Robotic Forearm with Independently Articulated Carpal Bones Enabling Human-Like Adaptive Stiffness Modulability',
    sourceUrl: 'https://arxiv.org/abs/2609.29176',
    sources: [
      {"title": "Forearm hardware and file-license map, reviewed revision da5103e", "url": "https://github.com/TogoLab/anthropomimetic-forearm-carpal-stiffness/tree/da5103e04a3798a591024c528c0e6d169e783f93"},
      { title: 'Anthropomimetic forearm arXiv v1 record', url: 'https://arxiv.org/abs/2609.29176' },
      { title: 'Full v1 paper, methods and limitations', url: 'https://arxiv.org/html/2609.29176v1' },
      { title: 'Official CAD, firmware, analysis and data repository', url: 'https://github.com/TogoLab/anthropomimetic-forearm-carpal-stiffness' },
    ],
    technicalFocus: ['anthropomimetic forearm', 'robot wrist stiffness', 'open robot hardware', 'compliant fingertips'],
    sourceDate: '2026-09-24',
    evidenceStatus: 'Preprint · arXiv v1 · open hardware and data',
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-25',
    updated: "2026-11-04",
    readTime: "5 min read",
    content: `# An open robotic forearm tests how eight carpal bones redirect wrist stiffness

Researchers at the University of Electro-Communications in Tokyo released an anthropomimetic soft robotic forearm on September 24, 2026, to test how carpal-bone structure changes wrist stiffness. The prototype reproduces eight independently movable carpal bones, 22 actuated muscles, 13 finger degrees of freedom and a three-degree-of-freedom wrist. Its open companion repository includes CAD, printable parts, firmware, measured data and analysis code. [Paper and version record](https://arxiv.org/abs/2609.29176).

## Key takeaways

- The study compares one anatomical wrist, a fused proximal carpal row and a geometric ellipsoidal skeleton under four muscle-activation patterns.
- With the anatomical skeleton, switching from finger-only to combined wrist-and-finger activation rotates the stiffness ellipse by 48.2 degrees; a permutation test reports p equals 0.0038.
- The linked release includes mechanical, control and analysis materials, but licenses differ by file: derived bone models and fingertip molds use CC BY-SA 2.1 JP, while the authors' other materials use CC BY 4.0. [Repository and license map](https://github.com/TogoLab/anthropomimetic-forearm-carpal-stiffness).

## What changed

Many robot wrists simplify the human carpus into one or two joints. This forearm instead uses CT-derived bone geometry, knitted polyethylene ligaments, tendon sheaths, a printed triangular fibrocartilage complex and dual-layer silicone fingertips. Nineteen muscles use tendon transmission; three intrinsic thumb muscles enable opposition. The assembled hand can grasp while its wrist moves, but the research question is mechanical rather than task-level autonomy.

To isolate morphology, every active muscle receives the same 0.6 N tension. A force gauge deflects the wrist 3 mm from 12 directions at 30-degree intervals, while motion capture samples at 100 Hz. The team runs eight trials per activation condition and direction, fits a stiffness ellipse, then separately records 20 repetitions per condition of motion between selected carpal bones.

That protocol matters when interpreting the result: the paper tests whether structure can redirect stiffness under uniform inputs. It does not optimize tendon forces or show an autonomous [robot hand](/robot-hands) choosing stiffness for a manipulation task.

## What the stiffness experiment found

For the anatomical skeleton, finger-muscle activation places the low-stiffness axis near the human dart-throwing direction. Combined wrist-and-finger activation instead aligns the high-stiffness axis with that direction. The observed 48.2-degree major-axis shift exceeded 4,982 of 5,000 shuffled-label outcomes.

Fusing the proximal row changes that behavior. Under finger activation, minimum-axis stiffness rises from 80.1 N/m for the anatomical skeleton to 149.5 N/m for the fused skeleton, and the low-stiffness direction moves away from the dart-throwing range. The ellipsoidal skeleton is stiffer overall, reaching major-axis values from 282.2 to 518.3 N/m under finger-only and wrist-only activation, but its ellipse orientation stays between about 86 and 96 degrees across conditions.

The carpal-motion test provides a narrower mechanistic result. Activation condition significantly changes relative rotation and translation at the proximal carpal row, while the midcarpal changes do not reach significance. The paper treats the latter as a supporting trend rather than a confirmed effect. [Stiffness and motion results](https://arxiv.org/html/2609.29176v1#S3).

## What this means for robotics

RoboSkin analysis: high stiffness alone is not the same as useful stiffness. The ellipsoidal wrist has the highest measured major-axis stiffness across the tested activation conditions, but changes its stiffness direction little. Stiffness is resistance per displacement, not a destructive strength or payload rating. For contact-rich manipulation, morphology that changes where the hand yields may reduce how much active control is needed before [tactile feedback](/tactile-manipulation) reacts.

The open hardware is also valuable as a reproducibility package. Engineers can inspect the bone and jig CAD, bill of materials, Dynamixel firmware and analysis scripts instead of inferring construction from figures. Those artifacts support a more specific reproduction plan, although their presence alone does not establish that a second build will reproduce the result.

## Limitations and availability

All stiffness measurements are quasi-static. The paper does not evaluate impacts, fast grasp corrections, hammering, autonomous manipulation success or repeated builds. Every reported result comes from one physical prototype. Assembly jigs and current control improve consistency within that build, but cannot establish inter-build variation.

The repository was publicly accessible on September 25 and contained analysis data, Python code, PlatformIO firmware, CAD, STL files, a bill of materials and video. Multiple licenses apply, so “open hardware” does not mean every file has the same reuse terms. Users must preserve the share-alike license for the derived BodyParts3D components where applicable. RoboSkin.ai did not fabricate or test the design.

## What a second build would need to reproduce

The experiment asks whether morphology redirects resistance under controlled tendon activation. It does not show an online controller selecting the best stiffness for each task. The 100 Hz motion-capture stream measures the experiment; it is not a demonstrated adaptation rate. [Methods and supplementary assembly notes](https://arxiv.org/html/2609.29176v1).

Three records would make a reproduction interpretable:

1. **Mechanical state:** record bone revision, ligament attachment and resting length, tendon route, fingertip construction and neutral pose. The authors' jigs control several of these variables; a nominally identical CAD model alone does not.
2. **Measurement and exclusions:** preserve loading direction, contact reference, force/displacement synchronization and every repeated measurement. The analysis excludes negative stiffness and values below 5 N/m for stated measurement reasons. Report exclusions instead of presenting the retained ellipse as all observations.
3. **Repeatability level:** distinguish repeated pushes on one assembly from rebuilding the assembly. The permutation result addresses within-build variation; dynamic impacts and variation among separately built forearms remain different tests.

For a task-specific design decision, ask which direction should yield and which should resist, then evaluate that choice under the intended motion. A large stiffness value can be undesirable along a direction that must accommodate misalignment. This is an engineering interpretation, not a manipulation-performance result from the paper.

As reviewed on November 4, the [versioned release](https://github.com/TogoLab/anthropomimetic-forearm-carpal-stiffness/tree/da5103e04a3798a591024c528c0e6d169e783f93) retains separate licenses for anatomy-derived parts and the specified original materials. Check the file map alongside the [robot-hand mechanics comparison](/robot-hands#mechanics-measurement-task); no analysis scripts or hardware were executed for this review.

## Sources and related resources

- [arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.29176)
- [Full paper and supplementary material](https://arxiv.org/html/2609.29176v1)
- [Official open-hardware repository](https://github.com/TogoLab/anthropomimetic-forearm-carpal-stiffness)
- [RoboSkin soft robotic skin overview](/applications/soft-robotic-skin)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not built or run these systems.*
`,
  },
  {
    id: 'camp-cooperative-arm-hand-motion-planning',
    title: 'CAMP plans arm motion and hand shape together in constrained spaces',
    seoTitle: 'CAMP Arm-Hand Motion Planning: Results and Code Status',
    seoDescription: "Separate CAMP geometric feasibility, sampled-path validation and physical task completion; interpret solver timing, static scenes and contact limits.",
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
    evidenceStatus: "Preprint · arXiv v1 · author code page promises future release · executable planner unverified",
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-25',
    updated: "2026-11-04",
    readTime: "6 min read",
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

The official project page supplies videos and detailed tables, but identifies itself as an anonymous submission even though arXiv lists the authors. Its Code link states that implementation is planned after paper acceptance. The November 4 recheck found the same future-release statement; no repository, implementation license or downloadable planner was verified. [Official code statement](https://camp-armhand.github.io/code.html). RoboSkin.ai has not run CAMP.

## Three different contracts between a feasible path and a completed task

Finding a collision-free hand shape at each arm waypoint does not prove that those shapes connect continuously. CAMP's hand search and local arm relaxation address this missing connection. Its final collision check is another distinct step, not a consequence that follows automatically from approximate geometry. [Method and evaluation](https://arxiv.org/html/2609.29021v1).

| Contract | What the study supplies | What a new application must establish |
| --- | --- | --- |
| Scene and goal | Known static obstacles and a manually screened goal configuration | Current scene geometry, calibration and an appropriate task goal |
| Path feasibility | Capsule/SDF-guided search followed by exact MuJoCo geometry checks | Whether the executed robot tracks the validated path under model error |
| Task completion | Reaching a prescribed pose or pregrasp | Successful grasp, actuation or force-controlled contact after arrival |

Solver timing is averaged over successful and failed problems, while normalized path length describes successful trials only. They have different denominators. The ten repeated batches quantify variation across sampled planning problems, not training seeds. A shorter normalized joint path also does not directly establish lower energy or faster complete application cycles.

The reported 1 cm collision margin belongs to one experimental setup. It should not become a universal allowance for perception error, dynamic obstacles or compliant contact. A receiving test would retain the scene revision, goal-selection method, planning and validation durations, tracking error and eventual task outcome separately.

CAMP uses a fixed arm-hand platform, not a walking humanoid. It is relevant to the [humanoid integration map](/humanoid-robots#observation-planning-control) as an example of the approach-planning layer, while its results should remain scoped to its own embodiment. Tactile feedback after approach is an additional integration question, not a demonstrated CAMP capability.

## Sources and related resources

- [CAMP arXiv v1, submitted September 24, 2026](https://arxiv.org/abs/2609.29021)
- [Full CAMP methods and evaluation](https://arxiv.org/html/2609.29021v1)
- [Official project and videos](https://camp-armhand.github.io/)
- [RoboSkin robot-hands guide](/robot-hands)

*Source review updated November 4, 2026. Original publication dates are retained. Results are reported by the authors; RoboSkin has not run these systems.*
`,
  },
  {
    id: 'support-enhanced-granular-jamming-gripper',
    title: 'A support rod turns granular jamming into a continuum-robot gripper',
    seoTitle: 'Support-Enhanced Granular-Jamming Gripper: Test Results',
    seoDescription: "Compare granular-gripper capture regions with reaching error; review v2 evidence, volume-based fill ratios and the missing end-to-end task denominator.",
    excerpt: 'The design couples a compliant membrane and particles with a direct load path at a bending robot tip. Mechanical tests are quantitative; the complete autonomous sequence is demonstrated without a reported success rate.',
    category: 'Adaptive grippers',
    image: '/generated/news/support-enhanced-granular-jamming-gripper.png',
    imageAlt: 'Diagram showing an unjammed particle-filled membrane conforming around an object before vacuum and an internal rod form a load path.',
    imageCaption: 'Original RoboSkin.ai schematic of the granular-jamming sequence. It is an explanatory graphic, not an experimental photograph.',
    sourceTitle: 'A Support-Enhanced Granular-Jamming Gripper for RL-based Grasping with Continuum Manipulators',
    sourceUrl: 'https://arxiv.org/abs/2609.29093',
    sources: [
      { title: "Current v2, revised September 25, 2026", url: "https://arxiv.org/html/2609.29093v2" },
      { title: 'Granular-jamming gripper arXiv v1 record', url: 'https://arxiv.org/abs/2609.29093' },
      { title: 'Full v1 design, tests and deployment paper', url: 'https://arxiv.org/html/2609.29093v1' },
    ],
    technicalFocus: ['granular-jamming gripper', 'continuum robot', 'mechanical adaptation', 'sim-to-real reinforcement learning'],
    sourceDate: '2026-09-24',
    evidenceStatus: "Preprint · arXiv v2 reviewed November 4 · separate mechanical and reaching tests · no repeated complete-task success rate or implementation assets verified",
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-25',
    updated: "2026-11-04",
    readTime: "6 min read",
    content: `# A support rod turns granular jamming into a continuum-robot gripper

Danyu Liu and colleagues released a support-enhanced granular-jamming gripper on September 24, 2026, for tendon-driven continuum manipulators. A flexible membrane and mobile particles conform during contact; vacuum locks that shape, while an internal rod promotes enclosure and carries load back to the bending robot tip. In a matched 10-trial mechanical test, the supported gripper completed 10 lifts and holds versus six without the rod. [Paper and version record](https://arxiv.org/abs/2609.29093).

## Key takeaways

- The reported 100% versus 60% result is one 10-trial configuration comparison with a common object, approach and vacuum condition. It is not a broad autonomous success rate.
- Shape tests vary sharply: sphere 10/10, hexagonal prism 9/10, cylinder and cube 8/10 each, and triangular pyramid 1/10.
- A reinforcement-learning controller reaches with 4.23 cm terminal RMSE over 16 physical rollouts, but it controls only the tendon-driven approach. Passive mechanics form the grasp and a task layer switches the vacuum. [Design and deployment results](https://arxiv.org/html/2609.29093v1#S6).

## What changed

Continuum manipulators reach through confined spaces by bending rather than rotating rigid joints, but that compliance makes their end-effector pose difficult to reproduce. A conventional rigid gripper can fail when tendon friction, hysteresis or external loading leaves a small residual error.

The proposed end effector adds a support rod inside a particle-filled membrane. Before vacuum, the rod provides a boundary against which the membrane can wrap, transmits continued approach force and helps develop a deeper enclosure. After evacuation, it creates a more direct load path instead of asking the membrane alone to retain the object.

The team compares natural-rubber and thermoplastic-polyurethane membranes, three particle types and three fill ratios. The selected design uses natural rubber, thermoplastic-rubber spheres and a 50% nominal filling ratio, defined as loose-particle volume divided by the membrane’s natural uncompressed interior volume—not a mass fraction. The paper says the thermoplastic-rubber fill lowers gripper mass relative to polystyrene while retaining the same measured success, but does not report the absolute mass. [Configuration study](https://arxiv.org/html/2609.29093v1#S4.SS2).

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

Tests cover a limited set of objects, approach orientations and contact offsets. The support geometry is not optimized, broader three-dimensional pose variation is not evaluated and the absolute gripper mass is unreported. The current v2 title page lists the Hong Kong Embodied AI Lab and the Chinese University of Hong Kong for most authors, and Zhejiang University for Wei Tang. This updates the earlier v1-based affiliation note; funding acknowledgements are not substituted for affiliations.

The first version was submitted September 24; the current v2 is dated September 25 and was reviewed November 4. The reviewed paper and arXiv record did not identify an official project page, CAD, bill of materials, controller repository, dataset or license for implementation assets. RoboSkin.ai has not reproduced the hardware or policy.

## Evaluate the overlap between reaching error and a usable grasp

A scalar reaching RMSE and a capture-region plot cannot be combined into a full-task success rate. One aggregates distance error over reaches; the other samples object-specific contact conditions with manual or fixed motion. A reach can be close in distance yet approach from an unfavorable orientation, or pass through a usable region without settling long enough to form enclosure. [Current v2 system and evaluation](https://arxiv.org/html/2609.29093v2).

For a deployment trial, define one complete attempt and keep the same object and setup identifiers through each stage:

| Stage | Record for each attempt |
| --- | --- |
| Reach and settle | Position, orientation, residual motion and whether the intended contact region was reached |
| Form and retain contact | Continued compression, pneumatic state, lift/hold outcome and loss of enclosure |
| Transfer and release | Retention through the motion, final destination, release and any intervention |

This is a proposed combined test, not a denominator supplied by the paper. Do not multiply the separate ten-trial mechanical result by a reaching score. The support-rod comparison also combines several mechanical effects; it does not isolate one load-path mechanism. For a different object, membrane replacement or approach direction, repeat the conditional capture tests before treating the previous map as applicable. The [gripper selection framework](/robot-grippers#contact-evidence) separates passive adaptation from measured contact and executed feedback.

## Sources and related resources

- [arXiv v1 record, submitted September 24, 2026](https://arxiv.org/abs/2609.29093)
- [Full gripper design and evaluation](https://arxiv.org/html/2609.29093v1)
- [RoboSkin soft robotic skin guide](/applications/soft-robotic-skin)
- [RoboSkin robot manipulation guide](/robot-manipulation)

*Source review updated November 4, 2026. Original publication dates are retained. Experiments are attributed to their authors; RoboSkin did not reproduce the hardware, execute the models or inspect downloaded experimental payloads.*
`,
  },
  {
    id: 'internw0-contact-aware-world-model-pipetting',
    title: "InternW0 links asynchronous world prediction with contact-aware pipetting",
    seoTitle: "InternW0: Contact-Aware Pipetting Results and Model Access",
    seoDescription: "Review InternW0 cached prediction, action clocks and release scope; distinguish public simulation assets from unverified contact-aware pipetting reproduction.",
    excerpt: "Shanghai AI Laboratory combines slower world prediction with faster action updates and contact-aware post-training. Its laboratory results require careful separation of task progress, full completion and model-side latency.",
    category: "Contact-aware world models",
    image: "/generated/news/internw0-asynchronous-contact-control.png",
    imageAlt: "Diagram separating InternW0's slower video prediction, cached context updated by observations, and faster contact-aware action generation.",
    imageCaption: "Original RoboSkin.ai schematic based on InternW0 v1. The reported action-path timing excludes asynchronous video-plan generation. Not an experiment image.",
    sourceTitle: "InternW0: A Foundational Physical World Model for Efficient Real-World Interactions",
    sourceUrl: "https://arxiv.org/abs/2609.27656",
    sources: [{"title": "InternW0 source release, revision eceefc3", "url": "https://github.com/InternRobotics/InternW0/tree/eceefc35b26d131c67048cb2cf26fecbee5ea5a5"}, {"title": "InternW0 v1 technical report and results", "url": "https://arxiv.org/html/2609.27656v1"}, {"title": "Official InternW0 project and availability", "url": "https://internrobotics.github.io/internw0"}],
    technicalFocus: ["robot world models", "contact-aware manipulation", "dexterous manipulation", "egocentric robot learning"],
    sourceDate: "2026-09-23",
    evidenceStatus: "Technical report · arXiv v1 · simulation code/model documentation reviewed · contact-aware hardware assets excluded from reviewed release",
    author: "RoboSkin.ai Editorial Team",
    date: "2026-09-25",
    updated: "2026-11-04",
    readTime: "6 min read",
    content: `# InternW0 links asynchronous world prediction with contact-aware pipetting

Shanghai AI Laboratory's Physical Intelligence Team introduced InternW0, a foundational physical world model for efficient real-world interactions, in a technical report submitted to arXiv on September 23, 2026. The system separates slower video prediction from faster action generation and adds force and tactile channels during contact-aware post-training. Its dexterous pipetting experiment connects world-model research to tool contact, but the headline laboratory scores measure task progress rather than complete-workflow success. [Paper and submission record](https://arxiv.org/abs/2609.27656).

## Key takeaways

- InternW0 reuses predictive video context while updating actions from incoming observations. Force and tactile histories can condition the action expert during downstream post-training.
- The five-stage pipetting task reports 65.3% average progress over 15 trials, versus 46.7% for π0.5 and 18.7% for Fast-WAM. These percentages do not mean that the complete procedure succeeded that often.
- The paper reports 7,233.5 pretraining hours and 60.73 ms critical-path action latency on RTX 5090D. Neither figure describes a downloadable tactile dataset or an end-to-end robot control guarantee; current code and model entry points have narrower scope than the paper’s contact-aware experiments. [Real-robot results](https://arxiv.org/html/2609.27656v1#S5), [efficiency](https://arxiv.org/html/2609.27656v1#S6) and [project page](https://internrobotics.github.io/internw0).

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

The September 25 review found disabled release buttons. By November 4, the [official project](https://internrobotics.github.io/internw0) links a public repository and a three-checkpoint Hugging Face collection. The [versioned repository documentation](https://github.com/InternRobotics/InternW0/tree/eceefc35b26d131c67048cb2cf26fecbee5ea5a5) describes RoboTwin and LIBERO training/evaluation adapters and explicitly excludes force/tactile, real-robot and laboratory assets. Code is MIT with third-party exceptions. The [Base model card](https://huggingface.co/InternRobotics/InternW0-Base) labels its weights MIT, but describes an initialization requiring target-domain post-training and separate Wan/DINO assets, not a ready-to-run pipetting controller. No checkpoint payload, EgoLab archive or hardware execution was verified here.

## Use two clocks and a release-specific action contract

The video expert and action expert do different jobs. The video branch supplies future context without directly consuming robot-specific candidate actions. The action branch uses that context and current observations to generate commands. This is not, by itself, an interface for testing several candidate commands and comparing their predicted consequences. [Architecture](https://arxiv.org/html/2609.27656v1#S2.SS1).

For a proposed integration, record both the age of the cached video plan and the timestamp of the observation used by the latest action query. Also retain query completion, executed-prefix length and the next observation. A fast action response can still use older predictive context; a freshly generated plan can still precede a long unobserved action segment.

| Contract | Check before transferring a result |
| --- | --- |
| State/action vector | Thirty-seven slots include absent channels masked out of training; zero padding is not a valid zero-valued command |
| Contact extension | Measured histories condition the downstream model; predicted contact outputs are expected feedback, not automatically force-controller references |
| Released evaluator | Default LIBERO evaluation executes sixteen actions per chunk; changing that count changes the protocol |
| Physical outcome | Ordered subtask progress, full completion and instrument accuracy require separate evidence |

The [release evaluation guide](https://github.com/InternRobotics/InternW0/blob/eceefc35b26d131c67048cb2cf26fecbee5ea5a5/docs/EVALUATION.md) names the required simulation assets and evaluation records. Its README says paper benchmark numbers were not rerun during release validation. Public files make inspection possible, but do not independently reproduce the paper's hardware claims. See the [world-model interface map](/robot-world-models#prediction-runtime-contracts) for matched timing and outcome comparisons.

## Sources and related resources

- [InternW0 arXiv v1, submitted September 23, 2026](https://arxiv.org/abs/2609.27656)
- [Technical report and experimental tables](https://arxiv.org/html/2609.27656v1)
- [Official InternW0 project](https://internrobotics.github.io/internw0)
- [RoboSkin datasets directory](/datasets)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these models or robot experiments.*
`,
  },
  {
    id: 'glotouch-global-local-haptic-search',
    title: 'GLoTouch lets one parallel gripper search and identify objects without external vision',
    seoTitle: 'GLoTouch: Haptic Object Search Without External Vision',
    seoDescription: "Review GLoTouch’s known-mesh search, matching-quality gates and 50-trial hardware result; separate development recognition from complete retrieval.",
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

The robot then places the probe in a holder. Bilateral visuotactile depth maps and jaw aperture form a local TouchSet for each candidate. A finite-window matcher compares width, depth and acquisition mode against synthetic observations generated from the target STL. The decision checks absolute matching quality, the best-versus-second-best margin and sufficient tactile evidence before grasping; it does not simply choose the lowest loss regardless of evidence.

This division matters: the probe covers a larger workspace, while the fingertips collect spatially resolved geometry only after an object is found. The same gripper remains available for the final grasp.

## Results under the reported conditions

In simulation, each of five targets was tested 20 times in randomized five-object layouts. GLoTouch completed 84 of 100 retrievals. A separate global-search ablation found all five objects within a 5-meter motion budget in 55% of 100 layouts, compared with 30% for random descent. That is a scene-discovery metric, not the end-to-end success rate.

The local matching component was also isolated on 60 target-and-phase samples from five physical objects. Width and action alone achieved 41 of 60 correct top-1 matches. Adding local depth raised this to 47 of 60; the complete matcher reached 54 of 60. These are development-set samples that reuse different subsets of contact sequences, so 60 should not be read as 60 independently collected objects or an unseen-object test.

On hardware, every target was evaluated in 10 randomized scenes. The Flexiv arm and Xense gripper retrieved 38 of 50 targets, or 76%. Apple was retrieved in all 10 trials, while Train succeeded in 5 of 10. Confusion between Train and Truck, object motion during probing and toppling during clamping were reported failure modes.

## What this means for robotics

RoboSkin analysis: GLoTouch is a useful integration pattern for haptic search. It reserves high-resolution [visuotactile sensing](/sensors) for the stage where local geometry is valuable, and uses cheaper tool-mediated force contact for global coverage. A detachable probe may be easier to service than a large tactile array and leaves the end effector free for manipulation.

The method is not touch-only in the broadest sense: it relies on proprioception, wrist wrench sensing, known robot-to-container registration and a pre-existing target mesh. It also assumes top access and objects resting on the container floor. Deployments in cluttered bins would need safeguards for entanglement, stacked objects and accumulated pose error. Those integration conditions are at least as important as the recognition score for teams building [tactile manipulation](/tactile-manipulation) systems.

## Limitations and availability

This is a preprint, not an independently reproduced result, and RoboSkin.ai has not run the system. Evaluation uses one arm-gripper configuration and five printed objects. The global stage depends on a wrist force-torque sensor; the passive probe does not turn an otherwise sensorless gripper into a contact detector. The paper also assumes a known scene cardinality and does not evaluate transparent versus opaque objects as separate conditions because external vision is excluded from control.

The November 4 review of the arXiv record and v1 paper still did not verify a linked implementation repository, data archive or applicable release license. The manuscript’s planned code release is not sufficient evidence of an available, reusable payload. This is a limit of the reviewed sources, not a claim that no other release can exist.

## Define when the contact evidence is insufficient

A low matching loss alone is not a trustworthy object identity. GLoTouch combines tactile depth, aperture and acquisition geometry, then checks evidence coverage and separation from the next candidate. The paper’s alternative losses use different scales, so their numerical margins are not interchangeable confidence values. Nor does a 54/60 development-set matcher imply that search, identification and lifting each succeed 90% of the time. [Matching protocol and ablations](https://arxiv.org/html/2609.27695v1).

For an integration review, keep three decisions separate:

- **Contact localization:** retain probe geometry, wrist tare, coordinate registration and whether probing moved the object. The paper’s 0.37 mm center error on one square calibration case does not establish general object-pose accuracy.
- **Identity selection:** retain the candidate meshes, sufficient-contact check, absolute fit and relative margin. An unfamiliar object or poor observation requires an explicit unresolved state, rather than an assumed match.
- **Task completion:** record the selected target, grasp, lift and any toppling or intervention. Revalidate the contact map if the object moves between search and grasp.

These are proposed receiving checks. The 84/100 simulation result includes runtime failures, while the 55% scene-discovery result measures finding all five objects within a motion budget. Neither can replace the physical 38/50 end-to-end result. Compare this known-geometry search with the other signal and decision roles in the [manipulation guide](/robot-manipulation#contact-decisions), rather than treating “without external vision” as an absence of cameras, geometry priors or calibration.

## Sources

- [arXiv v1 record, submitted September 23, 2026](https://arxiv.org/abs/2609.27695)
- [Full GLoTouch v1 paper](https://arxiv.org/html/2609.27695v1)

*Source review updated November 4, 2026. Original publication dates are retained. Results belong to the cited authors; RoboSkin has not run these systems or downloaded their experimental payloads.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-24',
    updated: "2026-11-04",
    readTime: "5 min read",
    sourceDate: '2026-09-23',
    evidenceStatus: "Preprint · known-object simulation and physical evaluation · current implementation release not verified",
  },
  {
    id: 'copre-proprioceptive-contact-detection',
    title: 'CoPRE detects weak robot contact from proprioception without force labels',
    seoTitle: 'CoPRE: Weak Contact Detection for Low-Cost Robot Arms',
    seoDescription: "Review CoPRE detection windows, calibration trade-offs and newly linked MIT implementation; distinguish a confirmed alarm from measured force or a safety stop.",
    excerpt: 'CoPRE learns the expected joint-torque response from contact-free motion and scores the residual through a noise-weighted Jacobian. It improves recall on ARX and G1 arms, with robot-specific calibration and unquantified downstream task success.',
    category: 'Proprioceptive touch',
    image: '/generated/news/copre-proprioceptive-contact-detection.png',
    imageAlt: 'Diagram showing contact-free robot motion training a torque predictor, followed by residual scoring and a contact-triggered retreat.',
    imageCaption: 'Original RoboSkin.ai explanation of CoPRE. Forces and detector traces are schematic rather than measured trial data.',
    sourceTitle: 'CoPRE: Improving Sensitivity in Proprioceptive Contact Detection for Low-Cost Robot Arms',
    sourceUrl: 'https://arxiv.org/abs/2609.27381',
    sources: [
      {"title": "CoPRE implementation, reviewed revision e6449cd", "url": "https://github.com/copre-arm/copre/tree/e6449cdd9b217886f08b71529136b3827b3dda0d"},
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

RoboSkin analysis: CoPRE shows how proprioception can provide a useful contact channel when adding [tactile sensors](/sensors) is impractical. A contact alarm can be used by a controller to stop motion, update a spatial belief and choose another attempt; the controller must define and validate that response. That makes the method relevant to [robot safety](/robot-safety) and contact-aware manipulation, especially on platforms that already expose joint state and motor-current-derived torque estimates.

It is not a substitute for calibrated force measurement. The detector produces a contact score and confirmed alarm. Its fitted equivalent-force vector is a scoring proxy, not validated force magnitude or localization, and it does not provide a pressure map. Its strongest engineering value may be as a protective or task-state signal layered under a policy, not as complete tactile perception.

## Limitations and availability

This is an arXiv v1 preprint and RoboSkin.ai has not reproduced it. The detector needs robot-specific training and calibration. Generalization to new payloads, motion distributions and contacts on other arm links was not tested. Sustained contact may enter the history and reduce the residual. The two contact-guided tasks are qualitative demonstrations, so the paper does not establish a numerical task-success improvement.

The [official CoPRE page](https://copre-arm.github.io/) provides project videos, result summaries, ablation tables and a path-free index of the 90 recordings. Its own documentation says the CSV tables are presentation summaries, not raw logs, and that model seeds reuse physical trials. The September 24 availability check found no implementation link. By November 4, the page links a public [CoPRE implementation at e6449cd](https://github.com/copre-arm/copre/tree/e6449cdd9b217886f08b71529136b3827b3dda0d), with training, calibration, replay and streaming interfaces under a root MIT license. Its reference tests use synthetic signals and analytically assigned model parameters, not released physical recordings or pretrained robot weights. Dependency and robot-model licenses remain separate. We inspected the files without installing or executing them.

## A detection window is not a measured stopping delay

With the same G1 predictor and thresholds, recall falls from 82.2% in a 0.50-second evaluation window to 20.7% in a 0.10-second window. The clock begins at a geometric contact-plane reference, not an independently measured physical onset. The result therefore cannot be converted into a guaranteed reaction time from the 20 ms sample interval. [Evaluation-window ablation](https://arxiv.org/html/2609.27381v1#S5).

For integration, separate three decisions. First, choose and document the motion distribution used for contact-free calibration. Second, validate the alarm with a held-out contact protocol and explicit deadline. Third, test the application response—including stop, retreat, latch and restart—because a detected event alone does not execute those actions.

The public package makes two relevant distinctions in its [pinned documentation](https://github.com/copre-arm/copre/blob/e6449cdd9b217886f08b71529136b3827b3dda0d/README.md): an alarm can clear during continued contact, and the application owns the motion response. Its [numerical-verification notes](https://github.com/copre-arm/copre/blob/e6449cdd9b217886f08b71529136b3827b3dda0d/reproduction/README.md) also state that generic pooled-time calibration does not automatically impose the paper's separate motion-family budgets or cross-fitting. Running a default example would therefore not reproduce the published experiment.

Record readiness, score, threshold, confirmation, reference event and executed response separately. Use the [mechanics-and-measurement comparison](/robot-hands#mechanics-measurement-task) when deciding whether an end-effector needs direct tactile sensing as well as arm-level contact alarms. This is a proposed integration check, not a certified protective system.

## Sources

- [arXiv v1 record, submitted September 23, 2026](https://arxiv.org/abs/2609.27381)
- [Full CoPRE v1 paper](https://arxiv.org/html/2609.27381v1)
- [Official project and experiment page](https://copre-arm.github.io/)
- [Official notes on the downloadable evidence files](https://copre-arm.github.io/assets/data/README.txt)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not built or run these systems.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-24',
    updated: "2026-11-04",
    readTime: "6 min read",
    sourceDate: '2026-09-23',
    evidenceStatus: "Preprint · physical contact detection · MIT implementation inspected · physical reproduction unverified",
  },
  {
    id: 'berkeley-quad-hand-asymmetric-qdd-design',
    title: 'Berkeley QUAD Hand trades finger symmetry for backdrivability and sustained force',
    seoTitle: 'Berkeley QUAD Hand: Asymmetric QDD Robot Hand Design',
    seoDescription: "Understand QUAD Hand posture coverage, zero-current backdrive tests and calculated heating; compare passive coupling with measured control performance.",
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

For backdrivability, the actuators received zero current, setting minimum commanded stiffness. A force gauge slowly pressed each fingertip until the actuator visibly rotated, with 15 trials at one tested posture per joint. Thumb and index base joints averaged around 50 gram-force. The coupled middle and ring fingers were near 250 gram-force. These are movement-onset loads under that passive test. They are not the resolution, accuracy or bandwidth of a calibrated force sensor or active controller.

The sustained-load test applied 3 N at one fingertip for five minutes, plus a 6 N condition with both ulnar fingers loaded. Resistive heating was derived from measured quadrature-axis current and manufacturer phase resistance. Because the larger ulnar motor's phase resistance is much lower, the design reported up to a 96-fold reduction in calculated heat energy per finger. The comparison is specific to those actuators, loads, positions and the electrical-loss model.

## What this means for robotics

RoboSkin analysis: the interesting contribution is architectural, not a new grasp controller. Asymmetry gives the designer another way to allocate mass, palm volume and thermal capacity. Passive linkage behavior can respond immediately to contact, while backdrivable joints make active compliance easier to observe and control. This can complement [robot-hand](/robot-hands) tactile systems rather than replace them.

The approach also creates coupled-control questions. One actuator influences two fingers, and linkage geometry changes mechanical advantage across the workspace. A learning policy or controller must model that state-dependent coupling. Adding fingertip or palm [tactile sensing](/sensors) would help separate commanded motion from actual contact, which the authors identify as future work.

## Limitations and availability

This review uses the arXiv v1 paper; the current official project identifies IEEE Humanoids 2026 acceptance. RoboSkin.ai has not reproduced the prototype. The hand was rapidly prototyped with 3D-printed ulnar transmission parts that yield before the larger motor reaches stall torque. Force tests cover one position per joint even though linkage mechanics vary with position. Peak fingertip force was deliberately not compared, and the approximately 5-kilogram lift shown in supplemental media is an example rather than a repeated benchmark.

The [official project page](https://benudavis.github.io/berkeley-quadhand/) provides videos, design illustrations, an interactive grasp viewer and the paper. The November 4 recheck still found no CAD, bill-of-materials or control-package link on that page. A manuscript license does not establish rights to unprovided design files; a build package and its hardware terms remain unverified.

## Separate passive sensitivity from controlled load performance

A backdrivable joint can move under a small external load while its controller is inactive. Once a controller holds position, its gains, current limits and sensing determine the response. Treat the passive threshold as one mechanical observation, then request a separate active-control evaluation. The same distinction applies to the ulnar linkage: passive adaptation changes finger motion but does not independently measure or regulate each contact. [Evaluation methods](https://arxiv.org/html/2609.27240v1).

| Published measurement | Different question for integration |
| --- | --- |
| Movement onset at zero current | What force error and response delay occur under the intended active controller? |
| Current-derived resistive heat over five minutes | What temperatures occur at the motor, housing and contact surface under the actual duty cycle? |
| Static grasp and opposition poses | Can the system acquire, retain and manipulate uncertain objects repeatedly? |
| Shared-actuator loading | How does load divide between fingers as contact geometry and linkage position change? |

The combined 6 N ulnar condition should not be read as an equal 3 N load on each finger: the authors interpret its current trace as consistent with the ring finger carrying most of the load. Nor does lower calculated resistive loss establish a safe surface temperature. These distinctions help a buyer choose which measurements to request without converting the 96-fold model result into a general thermal or efficiency rating.

For the [hand-selection comparison](/robot-hands#mechanics-measurement-task), keep mechanical yield, continuous loading and controller behavior separate. The supplemental lift remains a demonstration, not a rated payload or endurance test.

## Sources

- [arXiv v1 record, submitted September 23, 2026](https://arxiv.org/abs/2609.27240)
- [Full Berkeley QUAD Hand v1 paper](https://arxiv.org/html/2609.27240v1)
- [Official Berkeley QUAD Hand project page](https://benudavis.github.io/berkeley-quadhand/)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not built or run these systems.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-24',
    updated: "2026-11-04",
    readTime: "5 min read",
    sourceDate: '2026-09-23',
    evidenceStatus: "Author-reported hardware study · v1 reviewed · project identifies Humanoids 2026 · build package unverified",
  },
  {
    id: 'lima-asynchronous-diffusion-dexterous-manipulation',
    title: 'LiMA separates slow visual imagination from faster dexterous action refinement',
    seoTitle: 'LiMA: Asynchronous Diffusion for Dexterous Manipulation',
    seoDescription: "Separate LiMA cached intent, denoising allocation and amortized latency; inspect task definitions, visual failures and the limits of its physical evidence.",
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
- Despite language about reacting to physical changes, the evaluated system is vision-and-proprioception based. The limitations section names tactile integration as future work. [Methods and limitations](https://arxiv.org/html/2609.28431v1).

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

The [official LiMA page](https://ccdcs.github.io/LiMA_repo/) provides the paper, method graphics and task videos. The November 4 review did not verify source code, training data, model weights or a project-specific implementation license through that page. Paper and media access should be distinguished from runnable assets; a page-template license would not establish the terms of separately released software, data or weights.

## Separate refresh cadence, compute allocation and task meaning

Two ratios in LiMA describe different decisions. Refreshing the Dreamer once every four Refiner updates controls how often intent is renewed. The reported 3:7 slow–fast configuration allocates denoising work. Neither ratio is a measured sensor-to-actuator deadline. The 325 ms average distributes one Dreamer pass across four chunks; it does not state the worst delay when a new plan is needed. [Scheduling, ablations and timing](https://arxiv.org/html/2609.28431v1).

| Question | Evidence needed beyond the headline average |
| --- | --- |
| How old is the intent? | Timestamp of the observation used by the cached Dreamer output |
| When can a disturbance affect motion? | Latest Refiner observation, generated chunk, executed prefix and next query |
| Is compute actually concurrent? | Execution trace; the paper leaves further parallel/multi-GPU deployment to future work |
| What counts as task completion? | Ordered goals, physical materials and every failed or interrupted attempt |

Task names also require reading their definitions. Make Coffee uses simulated pouring motions rather than actual liquid transfer, for hardware protection. Its score does not measure dispensing volume, spillage or hot-liquid handling. Roll T-shirt failures include pinching empty space, while package assembly is affected by camera coverage and transparent parts. These examples motivate a contact-observability test; they do not demonstrate tactile capability.

The paper's six-task progress average is 78.9%. The current project abstract says 78.5% while displaying the same per-task table; this article retains the paper/table value and does not invent a reconciliation. Neither progress figure is the 85/120 complete-task result.

The [learning-change checklist](/robot-learning#learning-change-contract) helps separate pretrained weights, task-specific training, cached intent and current observations when budgeting a receiving experiment.

## Sources

- [arXiv v1 record, submitted September 23, 2026](https://arxiv.org/abs/2609.28431)
- [Full LiMA v1 paper](https://arxiv.org/html/2609.28431v1)
- [Official LiMA project page](https://ccdcs.github.io/LiMA_repo/)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these research systems or robot experiments.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-24',
    updated: "2026-11-04",
    readTime: "6 min read",
    sourceDate: '2026-09-23',
    evidenceStatus: 'Preprint · arXiv v1 · project page inspected',
  },
  {
    id: 'better-curriculum-tactile-reflex-fragile-grasping',
    title: 'A tactile reflex becomes the teacher for fragile grasping',
    seoTitle: 'Better Curriculum: Tactile Reflex Data for Fragile Grasping',
    seoDescription: "Separate Better Curriculum’s demonstration controller, tactile-free learner and runtime gripper arbiter; review trial counts, contact proxies and timing.",
    excerpt: "Better Curriculum uses tactile feedback to shape demonstrations for RGB-and-proprioception policies. Its optional runtime gripper arbiter remains a separate source of disturbance correction.",
    category: 'Tactile robot learning',
    image: '/generated/news/better-curriculum-tactile-reflex.png',
    imageAlt: "Diagram showing tactile-reflex demonstration collection, a tactile-free student policy and a separate runtime gripper arbiter.",
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

RoboSkin analysis: touch can improve a policy using RGB and proprioception without becoming another runtime modality of that learned policy. That matters when production hardware cannot carry the training sensor, or when a fast controller can generate cleaner contact behavior than a human operator. It also reframes [robot demonstration data](/datasets): the controller that creates the trajectory can be as important as model size.

The disturbance result prevents a stronger conclusion. A tactile-free policy may respond through its available visual and proprioceptive observations, but it does not provide the same measured tactile correction during an executing action chunk. Contact-critical systems may still need a low-latency loop, whether from [tactile sensors](/sensors), motor current or a force-torque sensor. Here the runtime arbiter controls gripper behavior; it is not evidence of a validated whole-arm safety system.

## Limitations and availability

This is an arXiv v1 preprint and RoboSkin.ai has not reproduced it. The tactile controller signal is a dimensionless vision-tactile proxy, not a calibrated force measurement in Newtons. The approximately 0.5 N deformation observation describes the cup, not the controller's internal value. Collection order was not randomized, and the three outcome labels come from video rather than force ground truth.

The official project page exposes the paper, diagrams and videos. The November 4 review still finds an author’s general GitHub profile rather than a verified dedicated code, dataset or model download. No asset license was established from those reviewed materials. Reproduction therefore requires details and artifacts beyond the visible project page.

## Track who controls the gripper at each stage

“Curriculum” here means changing the distribution of demonstrated behavior, not a schedule that presents progressively harder training examples. The robot logs the follower’s realized seven-dimensional action trajectory after the reflex has shaped it. That distinction matters: storing only the human’s raw command would omit the correction the student is supposed to learn. The same operator sees tactile feedback in both manual and reflex-assisted collection. [Collection protocol and appendices](https://arxiv.org/html/2609.25887v1).

| Stage | Role of touch | Separate acceptance question |
| --- | --- | --- |
| Demonstration collection | A deterministic reflex changes gripper behavior; realized actions are logged | Are corrections and observations aligned, and are all rejected demonstrations counted? |
| Learned policy | ACT or pi0.5 consumes RGB and proprioception | Does the policy retain the demonstrated behavior on held-out trials? |
| Optional runtime arbiter | A tactile loop interprets close/open intent and controls the gripper | Does it release correctly and retain contact during tested disturbances? |

The 30 selected manual demonstrations out of 100 are a curation choice, not a 30% collection-success estimate. Similarly, 20/20 retention in the main disturbance run is not a zero-failure guarantee: four additional training seeds report 79 retained grasps out of 80 with the arbiter, versus 42/80 without it. Keep those repeat runs distinct from the headline single-seed comparison.

Nominal 25 Hz capture does not establish fresh camera input at every control step. Record observation timestamps, policy-query times, action chunks and gripper overrides when adapting the pipeline. Contact-quality occupancy is a frame-level proxy, not calibrated newtons or a complete-trial success rate. These checks connect the method to the [manipulation decision map](/robot-manipulation#contact-decisions), without treating demonstration quality as a replacement for runtime feedback.

## Sources

- [arXiv v1 record, submitted September 22, 2026](https://arxiv.org/abs/2609.25887)
- [Full Better Curriculum v1 paper](https://arxiv.org/html/2609.25887v1)
- [Official project page](https://shayfeng.github.io/better-curriculum/)

*Source review updated November 4, 2026. Original publication dates are retained. Results belong to the cited authors; RoboSkin has not run these systems or downloaded their experimental payloads.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-23',
    updated: "2026-11-04",
    readTime: "5 min read",
    sourceDate: '2026-09-22',
    evidenceStatus: 'Preprint · arXiv v1 · project page inspected',
  },
  {
    id: 'visforce-visual-force-grounding-dexterous-manipulation',
    title: 'VisForce draws force goals into a dexterous robot policy',
    seoTitle: 'VisForce: Visual Force Grounding for Dexterous Manipulation',
    seoDescription: "Assess VisForce actuator-force cues, offline goals and user-selected stages; distinguish learned joint commands from autonomous sequencing and force regulation.",
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

Current-force arrows are placed at fingertip pixels in the wrist view. The desired force is rendered onto a hand-and-object foreground goal image. GroundingDINO and SAM2 remove its background offline, while a MuJoCo model and edge-based Chamfer alignment connect the simulated hand to camera geometry. VisForce updates the SigLIP visual encoder and applies rank-16 LoRA to the larger model components.

## Results under the reported conditions

The study collects 25 to 30 demonstrations for each of four tasks and evaluates every policy in 20 independent trials. For medium-force grasping, VisForce lifts an egg in 14 of 20 trials and a toothpaste tube in 16 of 20. The visual-force plus text-goal baseline reaches 8 of 20 and 4 of 20 respectively; the state-force plus text-goal baseline reaches 7 and 1.

The three multi-stage tasks make desired force part of task progress. VisForce obtains 70% final success for cup insertion followed by bottle pouring, 55% for grasping tongs and transferring bread, and 40% for a slip-triggered peg-in-hole task with 1-millimeter clearance. The unmodified pi0.5 baseline records 20%, 5% and 5%. A visual-input ablation without cross-attention records 10%, 5% and 15%, suggesting that simply drawing arrows is not the whole contribution.

These are final-stage successes, not average subtask completion. The same hardware, training demonstrations and 20-trial count make the within-paper comparisons useful, while the limited task set and trial count leave wide uncertainty for deployment.

## What this means for robotics

RoboSkin analysis: visual grounding offers a practical interface between structured signals and pretrained visual backbones. Instead of asking a VLA to infer that the fifth number belongs to a particular finger, the representation encodes that relationship spatially. Similar interfaces could combine force, slip or [robot skin](/robot-skin) regions with goal images.

However, localization depends on calibration and hand geometry. The visual cue does not remove the need to understand what the underlying sensor measures. Actuator load can include transmission friction and dynamics that differ from fingertip contact. For direct contact-force control, a calibrated [tactile sensor](/sensors) or force-torque estimate may still be required.

## Limitations and availability

This is a preprint, not independent validation, and RoboSkin.ai has not reproduced it. Experiments use one arm-hand configuration, four tasks and up to 30 demonstrations per task. Goal segmentation is performed offline, so the reported setup does not establish an online open-world goal-generation pipeline. Inference used an NVIDIA RTX A6000; latency and control frequency during deployment were not reported as a full end-to-end budget.

The November 4 arXiv and full-text review did not verify a project page, code repository, dataset or model checkpoint through those sources. The paper's Creative Commons license covers the manuscript, not unlisted software or training assets. This review establishes paper access, not runnable implementation availability.

## The user supplies the stage; the model produces joint actions

VisForce's current subtask is specified by the user. The corresponding instruction and prepared goal image are then retrieved automatically. This is a useful conditioning interface, but it is not evidence that the policy independently recognizes every phase or chooses the next desired force. The goal image is selected from a reference demonstration and retains the hand and manipulated object after background removal. [Goal construction and inference protocol](https://arxiv.org/html/2609.25785v1).

The model outputs a twelve-dimensional delta joint action for the arm and hand. Rendering a desired force does not turn that output into a directly commanded fingertip-force vector or a verified force servo. The arrow direction comes from hand geometry, while its magnitude encodes an actuator scalar.

| Receiving check | Failure it can distinguish |
| --- | --- |
| Subtask selection and goal-image identity | A wrong stage or reference rather than an action-model failure |
| Camera/hand alignment and cue threshold | Misplaced or suppressed force cues |
| Actuator reading versus contact measurement | Transmission/load effects rather than fingertip force accuracy |
| Observation, inference and action timestamps | Recording rate versus actual response delay |

Uncertainty remains large at twenty trials. The paper reports 95% Wilson intervals of 48.1–85.5% for cup/pouring, 34.2–74.2% for tong transfer and 21.9–61.3% for peg insertion. These describe the small reported samples, not guaranteed operating ranges. A matched receiving test should also record incorrect stage choices, drops, damage and failed transitions instead of counting only final successes.

Use the [robot-learning comparison](/robot-learning#learning-change-contract) to distinguish runtime goal conditioning from learning new parameters or receiving measured tactile feedback.

## Sources

- [arXiv v1 record, submitted September 22, 2026](https://arxiv.org/abs/2609.25785)
- [Full VisForce v1 paper](https://arxiv.org/html/2609.25785v1)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these research systems or robot experiments.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-23',
    updated: "2026-11-04",
    readTime: "5 min read",
    sourceDate: '2026-09-22',
    evidenceStatus: "Preprint · arXiv v1 · paper reviewed · implementation assets not verified",
  },
  {
    id: 'cablevla-tactile-cable-routing-vla',
    title: 'CableVLA combines cable topology with tactile residual control',
    seoTitle: 'CableVLA: Tactile VLA Results for Cable Routing',
    seoDescription: "Inspect CableVLA contact-history gating, executed action chunks and simulation labels; separate transfer preparation from limited hardware success evidence.",
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

RoboSkin analysis: CableVLA is a useful architecture pattern for deformable-object manipulation. Global visual planning can remain relatively slow and semantic, while [tactile sensing](/sensors) supplies a correction gated by recent contact history. Freezing the parent restricts which model parameters are trained; it does not itself impose a safe magnitude on the residual action.

The data scale reveals the cost. Rich labels come from simulation, and the real system must reproduce camera geometry, tactile calibration and cable behavior closely enough for those representations to transfer. Teams comparing [robotics datasets](/datasets) should distinguish the millions of sampled windows from the smaller count of independent episodes and physical trials.

## Limitations and availability

This is an arXiv v1 preprint, and RoboSkin.ai has not run the code or hardware. The real test contains only 10 trials per method and still exposes a large simulation-to-real gap. The authors identify grasp alignment, viewpoint mismatch, arm compliance and cable dynamics as failure sources. Target-domain fine-tuning was not used in the zero-shot comparison.

The November 4 review of the arXiv record and full paper did not verify public code, a project page, dataset download, checkpoints or an implementation license through those sources. The counts document internal research assets; they do not establish that those assets are downloadable.

## A history gate is not an instantaneous force controller

The residual gate checks whether any valid taxel crosses the threshold anywhere in the most recent 25-frame window. A recent contact can therefore keep the gate open even when the latest frame has no contact. With no qualifying history, the tactile residual becomes zero; the topology-conditioned parent still supplies actions. This is different from checking current force before every command. [Gate definition and deployment procedure](https://arxiv.org/html/2609.25606v1).

| Interface | What the paper specifies | What it does not establish |
| --- | --- | --- |
| Topology student | Four visual observations; privileged simulator labels supervise training | Access to simulator-only future labels on the real robot |
| Tactile history | Twenty-five frames aligned to a 30 Hz observation grid | A new policy inference or force-limit check every 1/30 second |
| Action correction | Residual over the first eight actions of a sixteen-action parent chunk | A safety bound on the residual merely because the parent weights are frozen |
| Execution | Commit eight corrected actions before replanning | Fresh tactile correction after every individual committed action |

The synthetic normal-force map is constructed from contact proxies, while slip and motion labels come from simulation. Those labels help train a representation; they are not additional quantities measured by the physical array. Retain label origin and preprocessing when comparing the simulated event scores with a real sensor test.

Zero-shot transfer here means no target-domain weight adaptation. The physical setup still required calibration and enhanced illumination, and the paper describes a separate grasp diagnostic that motivated the lighting change. Its ten-trial comparison is conditional on that preparation. A proposed reproduction should record camera alignment, initial history acquisition, calibration, lighting and failure counts alongside the policy checkpoint. The [contact evidence comparison](/tactile-ai#contact-evidence-chain) separates this action interface from offline encoders and simulated contact solvers.

## Sources

- [arXiv v1 record, submitted September 22, 2026](https://arxiv.org/abs/2609.25606)
- [Full CableVLA v1 paper](https://arxiv.org/html/2609.25606v1)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these systems or reproduced their experiments.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-23',
    updated: "2026-11-04",
    readTime: "5 min read",
    sourceDate: '2026-09-22',
    evidenceStatus: 'Preprint · arXiv v1 · paper-only release',
  },
  {
    id: 'cartesian-hand-all-linear-in-hand-manipulation',
    title: 'The Cartesian Hand replaces finger joints with seven linear axes',
    seoTitle: 'Cartesian Hand: Specs, Cost, Code & CAD',
    seoDescription: 'Explore the 7-DoF Cartesian Hand: dimensions, author-estimated build cost, versioned code and CAD, and the limits of its 350 configured-object trials.',
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
      { title: 'Cartesian Hand control stack, reviewed revision 83b738e', url: 'https://github.com/generalroboticslab/Cartesian_Hand/tree/83b738e8c7bf3b74e08e36250492d774aa432324' },
      { title: 'Cartesian Hand hardware guide and bill of materials', url: 'https://github.com/generalroboticslab/Cartesian_Hand/blob/83b738e8c7bf3b74e08e36250492d774aa432324/hardware/README.md' },
      { title: 'Cartesian Hand repository license', url: 'https://github.com/generalroboticslab/Cartesian_Hand/blob/83b738e8c7bf3b74e08e36250492d774aa432324/LICENSE' },
    ],
    technicalFocus: ['dexterous robot hands', 'in-hand manipulation', 'prismatic joints', 'robot hardware'],
    content: `# The Cartesian Hand replaces finger joints with seven linear axes

Duke University's General Robotics Lab introduced the Cartesian Hand in a preprint submitted on September 22, 2026. Instead of imitating an articulated human hand, the 850-gram end effector stacks two independently actuated parallel grippers and lets four fingertips translate along fixed axes. The seven-degree-of-freedom mechanism targets objects with threads, pivots, guides, plungers and triggers. [Paper and version record](https://arxiv.org/abs/2609.25696).

## Specifications and build cost at a glance

These author-reported values describe the paper's hand. They are not an offer to sell a completed unit or measurements from a RoboSkin build. The versioned code and CAD are linked below; the released control stack is distinct from the implementation used in the paper.

| Property | Paper-reported value | Scope |
| --- | --- | --- |
| Mechanism | 7 linear degrees of freedom | Four fingertip slides, two gripper openings and one separation axis |
| Mass and closed dimensions | 850 g; approximately 166 × 100 × 76 mm | The reported assembly |
| Travel | 65 mm fingertips; 52 mm gripper opening and separation | Joint travel, not object workspace |
| Joint speed | Approximately 60 mm/s | Not an object-operation cycle time |
| Static hold | 2 kg with one gripper | The reported bottle test, not a dynamic payload rating |
| Build cost | Approximately US$500 | Author estimate for a complete hand; not a current supplier quote |
| Evaluation | 350/350 trials across 35 configured objects | 10 trials each; prescribed starts and object-specific setup |

Read the [paper's methods and experiments](https://arxiv.org/html/2609.25696v1), then inspect the [versioned CAD files](https://github.com/generalroboticslab/Cartesian_Hand/tree/83b738e8c7bf3b74e08e36250492d774aa432324/hardware/CAD), [bill of materials and assembly guide](https://github.com/generalroboticslab/Cartesian_Hand/blob/83b738e8c7bf3b74e08e36250492d774aa432324/hardware/README.md) and [control-stack README](https://github.com/generalroboticslab/Cartesian_Hand/blob/83b738e8c7bf3b74e08e36250492d774aa432324/README.md). The reproduction limits and receiving checks remain in the sections below.

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

It also highlights where touch would add value. Joint thresholds can detect resistance, but they cannot identify which surface made contact or separate desired tool load from a collision. Adding compact [tactile sensors](/sensors) is a possible route to observing those missing contact variables. Whether it enables automatic parameter selection, slip response or better force limiting would require a new integrated evaluation; it is not a capability demonstrated here.

## Limitations and availability

This is an arXiv v1 preprint and RoboSkin.ai has not built the hand. The object set is structured, the starting poses are controlled, and the procedures use manually selected parameters. The platform does not observe object pose, contact location or contact force. Claims should therefore remain about repeatable mechanism-specific manipulation, not open-world hand autonomy.

## Code, CAD and build resources

The repository that was unavailable at our September 23 check is now public. On October 17, we verified revision [83b738e](https://github.com/generalroboticslab/Cartesian_Hand/tree/83b738e8c7bf3b74e08e36250492d774aa432324), committed October 10, and its root [Apache-2.0 license](https://github.com/generalroboticslab/Cartesian_Hand/blob/83b738e8c7bf3b74e08e36250492d774aa432324/LICENSE). Use these versioned resources when evaluating a build:

| Reader task | Official resource | What to check |
| --- | --- | --- |
| Inspect software and installation | [Control-stack README](https://github.com/generalroboticslab/Cartesian_Hand/blob/83b738e8c7bf3b74e08e36250492d774aa432324/README.md) | Linux, Python and native build requirements; hardware, mock and MuJoCo entry points |
| Find parts and assembly instructions | [Hardware guide and bill of materials](https://github.com/generalroboticslab/Cartesian_Hand/blob/83b738e8c7bf3b74e08e36250492d774aa432324/hardware/README.md) | Required tools, print settings, wiring, assembly and zeroing |
| Inspect mechanical files | [CAD directory](https://github.com/generalroboticslab/Cartesian_Hand/tree/83b738e8c7bf3b74e08e36250492d774aa432324/hardware/CAD) | STEP parts and Fusion 360 design files; adapt tolerances to the build |
| Review operating limits | [Hardware status and known issues](https://github.com/generalroboticslab/Cartesian_Hand/blob/83b738e8c7bf3b74e08e36250492d774aa432324/docs/hardware.md) | Configuration, calibration and travel-limit checks before driving the hand |

The release does not independently reproduce the paper’s 350 trials. Its README explicitly describes a rewritten control stack, not the software used for those results, and says the transcribed manipulation tasks have not been completed on their physical objects. The mock and MuJoCo examples also contain no objects to manipulate. A completed simulation program therefore does not establish a successful grasp. RoboSkin.ai has inspected the public files but has not run this software or built the hand.

For evaluating contact feedback in a future build, use the [robot-hand tactile sensor selection guide](/applications/robot-hand-tactile-sensor); the released hand should not be described as having that added tactile capability.

## Linear finger motion does not make object control linear

The constant Jacobian relates seven joint displacements to fingertip reference positions. Turning a cap still depends on where the fingers engage, whether they slip, and how the cap constrains motion. Thus a simpler kinematic model reduces one planning problem without solving contact estimation. A useful receiving test separates these layers. [Kinematics and manipulation methods](https://arxiv.org/html/2609.25696v1).

| Layer | Evidence to retain for a new object |
| --- | --- |
| Joint motion | Measured travel, direction, zero reference and tracking error for the actual build |
| Contact inference | The low-velocity contact rule, commanded effort and object geometry; distinguish object resistance from a joint stop or binding |
| Object operation | Configured starting pose and primitive, setup attempts, then separate evaluation trials with object-specific completion criteria |
| Application outcome | A separate measurement of the quantity that matters, such as dispensed volume or fastener torque |

The paper's detector recognizes sustained low joint velocity while movement is commanded. It can estimate a width or diameter from closure position, but that estimate depends on contact geometry and deformation. It is not a force sensor. Likewise, opening a cap or moving a plunger does not itself establish metering accuracy.

The November 4 recheck of the pinned hardware notes also matters: software travel limits, encoder scaling and zero references require build-specific verification, and the released task stack is distinct from the paper's implementation. Keep successful program execution separate from successful physical manipulation. Use the [robot-hand evidence comparison](/robot-hands#mechanics-measurement-task) to connect a build's mechanics, observations and completed task rather than transferring the paper's 350/350 result to an untested assembly.

## Sources

- [arXiv v1 record, submitted September 22, 2026](https://arxiv.org/abs/2609.25696)
- [Full Cartesian Hand v1 paper](https://arxiv.org/html/2609.25696v1)
- [Official General Robotics Lab project page](https://generalroboticslab.com/cartesian_handv1)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not built or run these systems.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-23',
    updated: "2026-11-07",
    readTime: "6 min read",
    sourceDate: '2026-09-22',
    evidenceStatus: 'Preprint · arXiv v1 · public code/CAD · reproduction unverified',
  },
  {
    id: 'spectrobot-high-bandwidth-single-point-tactile-sensing',
    title: 'SpectRobot turns single-point vibration into tactile policy input',
    seoTitle: 'SpectRobot Tactile Sensing: Bandwidth, Results and Data',
    seoDescription: "Distinguish SpectRobot sampling, spectrogram history and motor updates; review complete-sort denominators, public implementation and reproducibility limits.",
    excerpt: 'Wormsensing and Hugging Face researchers encode remote vibration sensors as spectrograms for a robot policy. Longer history mattered more than extending the tested band from 10 to 100 kHz.',
    category: 'Tactile sensing hardware',
    image: '/generated/news/spectrobot-single-point-spectrogram.png',
    imageAlt: 'Diagram showing one mechanically coupled sensor converted into a time-frequency spectrogram and combined with vision in a robot policy.',
    imageCaption: 'Original RoboSkin.ai explanation of SpectRobot v1. The diagram summarizes the signal path and is not an experiment image.',
    sourceTitle: 'Learning tactile perception from high-bandwidth single-point sensing',
    sourceUrl: 'https://arxiv.org/abs/2609.24621',
    sources: [
      {"title": "SpectRobot implementation, reviewed revision b4cf724", "url": "https://github.com/spectrobot-project/spectrobot/tree/b4cf7249378941d26ac26d96f256941a6c9e730f"},
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

The September 22 check found only the project website repository. On November 4, we also inspected the public [SpectRobot implementation at b4cf724](https://github.com/spectrobot-project/spectrobot/tree/b4cf7249378941d26ac26d96f256941a6c9e730f). It contains a LeRobot integration, sensor configuration, acquisition code and Teensy firmware, with a root Apache-2.0 license. Its README documents Teensy/ADS8688 and openDAQ paths; this review did not install, run or benchmark them. The linked Hugging Face profile contains many separate datasets and models. Identify the exact assets, feature names and individual reuse terms; the code license does not establish every dataset or checkpoint license.

## A shared image shape does not preserve the measurement contract

Two 224-by-224 images can encode different frequency ranges, histories, amplitude windows and mechanical responses. A policy expects the representation it learned, not merely the same tensor dimensions. The public [implementation README](https://github.com/spectrobot-project/spectrobot/blob/b4cf7249378941d26ac26d96f256941a6c9e730f/README.md) makes observation-key consistency explicit; acquisition and preprocessing settings need an equally clear record.

| Record | Why it matters |
| --- | --- |
| Sensor, attachment and gripper revision | Structural coupling changes the vibration reaching the measurement point |
| Sample rate, analog conditioning and spectral window | These determine what signal enters the spectrogram before resizing |
| History length, amplitude mapping and timestamp | They determine which events are visible and how recent the observation is |
| Feature names and policy revision | They connect the recorded stream to the input the model was trained to consume |

Preserve the evaluation denominator too. The reported overall sorting rate includes grasp and drop failures; the confusion matrices include only boxes delivered to a bin. A classification percentage computed from delivered boxes answers a narrower question than complete robot-task success. [Data collection and results](https://arxiv.org/html/2609.24621v1#S3).

Finally, the stored spectrogram videos cannot reconstruct the discarded raw vibration waveform. A later experiment with another filter or spectral window may require new collection. Nor does one dynamic channel establish static force, contact localization or multi-contact load sharing. Compare that observable with other [hand sensing and mechanics choices](/robot-hands#mechanics-measurement-task), then define the measurement and task evidence your application actually needs.

## Sources

- [SpectRobot arXiv record, submitted September 21, 2026](https://arxiv.org/abs/2609.24621)
- [SpectRobot v1 methods, results and availability statements](https://arxiv.org/html/2609.24621v1)
- [Official SpectRobot repository](https://github.com/spectrobot-project/spectrobot-project.github.io)
- [Public SpectRobot datasets and models profile](https://huggingface.co/jogarulfop)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not built or run these systems.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: "2026-11-04",
    readTime: "5 min read",
    sourceDate: '2026-09-21',
    evidenceStatus: "Preprint · physical sorting study · Apache-2.0 implementation inspected · reproduction unverified",
  },
  {
    id: 'tactile-jepa-topology-aware-electronic-skin-pretraining',
    title: 'Tactile-JEPA pretrains electronic-skin encoders on taxel topology',
    seoTitle: 'Tactile-JEPA Results, Datasets, Code and Limitations',
    seoDescription: "Review Tactile-JEPA topology requirements, sensor-specific training and offline policy error; distinguish original results from the repository follow-up.",
    excerpt: "Tactile-JEPA learns sensor-specific encoders with graph-based masking. Review the original perception and policy results separately from a later repository training recipe.",
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

- Tactile-JEPA learns from unlabeled time windows and known taxel connectivity, predicting hidden taxel embeddings from visible context with both local and global graph masks.
- Across three public datasets, it reports a 6.3% reduction in force RMSE and a 20.8% reduction in in-hand orientation RMSE against the strongest comparison for those metrics.
- It is not best on every original-paper downstream result. On DECO-50 policy learning, MAE pretraining records 0.4400 normalized-action RMSE versus 0.4634 for Tactile-JEPA; lower is better. [Tables II and III](https://arxiv.org/html/2609.24385v1#S4).

## What changed

Distributed electronic skins produce multivariate time series from taxels placed across hands, feet or bodies. Their geometry is often sparse and irregular. Tactile-JEPA represents those taxels as a connectivity graph. A local target mask grows from a seed along connected neighbors; a global mask samples across the surface. The model receives the remaining context and predicts embeddings for the hidden regions. Equal local and global masking is intended to preserve fine contact details and whole-surface state.

The encoder uses 192-dimensional embeddings and three attention heads, with 12 blocks for Xela/DECO and eight for the tactile-socks experiments. The paper freezes pretrained encoders for most perception tests, then trains task-specific heads. Pretraining used four NVIDIA A100 80 GB GPUs and took 0.7 to 6.1 hours depending on the dataset and task. [Architecture and compute](https://arxiv.org/html/2609.24385v1#S3).

## Three datasets, three evidence types

| Dataset | Sensor and scale | Evaluated use |
| --- | --- | --- |
| Sparsh-skin | Xela uSkin, 368 three-axis taxels, 100 Hz, 4.6 hours | Object class, force and in-hand pose |
| Tactile socks | Two piezoresistive socks, 453 total taxels, 14 Hz, 5.9 hours | Human action and full-body pose |
| DECO-50 subset | Two Inspire hands, 2,124 taxels, 30 Hz, 16.6 hours | Visuo-tactile assembly policy |

On Sparsh-skin, Tactile-JEPA reports total force RMSE of 14.05 cN versus 15.00 cN for end-to-end training, the strongest alternative in that row. Orientation RMSE is 5.48 degrees versus 6.92 degrees for BYOL. On tactile socks, action accuracy is 96.91% versus 95.63% for DINO, and full-body pose RMSE is 13.42 radians versus 13.78. These are means across repeated training runs, and selected top-two comparisons use a one-sided Welch test with three pretraining seeds and no multiple-comparison correction.

The original policy table requires a different reading. Tactile-JEPA improves over vision-only, random tactile embeddings and an end-to-end tactile encoder, but MAE is better on the reported DECO-50 action RMSE. The paper's stronger claim is stable performance across heterogeneous datasets: BYOL or MAE collapses on some datasets, while Tactile-JEPA trains under one mask configuration.

## What this means for robot skin

RoboSkin analysis: representing taxel layout explicitly is a sound fit for conformable [robot skin](/robot-skin), where physical neighbors need not share adjacent array indices. The local-global mask result also suggests that pretraining should preserve both a contact patch and the state of the wider surface. This is relevant to [tactile foundation models](/tactile-foundation-models), but the evidence is still sensor-family-specific rather than a universal encoder.

Integration is not plug-and-play. DECO-50 groups four or five neighboring taxels to make attention over 2,124 channels affordable. Magnetic data receives baseline correction; piezoresistive data uses different normalization. Dataset coordinates are also missing for DECO-50, so grouping and topology construction must be supplied by the implementation. The [datasets directory](/datasets) can help compare these data contracts before reuse.

## Limitations and availability

This is a preprint, and RoboSkin.ai has not rerun the experiments. All headline improvements are within the selected datasets, task heads and splits. The policy score is imitation-action error, not a physical task success rate. A lower action RMSE also does not by itself prove safer or more reliable contact.

The paper links a public repository. The November 4 review supersedes the earlier README-access description: the repository now documents Tactile-JEPA datasets, preparation, training presets and downstream evaluation. Its pretrained-model entry remains TBD. The [license at the reviewed revision](https://github.com/E-Kovtun/tactile/blob/ffb4db04080d98ff6b61dad04ba0bc0a49f8bd28/LICENSE.md) is Creative Commons Attribution-NonCommercial 4.0; third-party datasets and assets retain their own terms. Documentation was reviewed, but no training, download or checkpoint execution was performed.

## Reuse the training recipe without assuming a universal checkpoint

Tactile-JEPA needs known taxel connectivity to sample masks during pretraining, but does not require numerical three-dimensional taxel coordinates. The graph is not needed by the downstream encoder; learned taxel identities and the expected input ordering still are. That distinction does not establish transfer to a different sensor layout without adaptation. The paper trains separate encoders for the datasets and, for the socks, separate task settings. It tests a reusable method rather than one checkpoint shared unchanged across all sensors. [Method and evaluation](https://arxiv.org/html/2609.24385v1).

| Reuse question | Evidence to retain |
| --- | --- |
| Which taxel is this? | Channel order, connectivity, grouped cells, baseline and normalization conventions |
| How much time is represented? | Ten frames at 100 Hz, three at 30 Hz or five at 14 Hz are different input windows |
| What is predicted? | Masked embeddings during pretraining; task-specific targets after training a head |
| What generalization is tested? | Whole demonstrations, objects, sessions and sensor layouts are different split units |
| What does the policy metric mean? | Offline error over twelve hand-action dimensions and sixteen future steps; not robot task completion |

The Sparsh-skin classification split partitions trajectories within the collected object set, rather than establishing unseen-object recognition. DECO splits whole demonstrations. Short-window representation learning should also not be confused with forecasting future tactile observations; a downstream head can consume a longer sequence of encoded windows.

The current [pinned README](https://github.com/E-Kovtun/tactile/blob/ffb4db04080d98ff6b61dad04ba0bc0a49f8bd28/README.md) now documents a separate, revised DECO training recipe. It reports action RMSE 0.43880 ± 0.00185 against MAE 0.43996 ± 0.00288. These are author-reported follow-up results, not replacements for the original paper's table. The spread is the standard deviation across twelve heads from three pretraining seeds, not a confidence interval or twelve independent encoder trainings. The numerical difference alone does not establish a statistically reliable advantage.

A receiving experiment should pin the recipe, split and checkpoint together. The README also identifies exploratory mixed-source socks presets that include held-out pose splits; those are not interchangeable with train-only task baselines. The [tactile AI comparison](/tactile-ai#contact-evidence-chain) keeps representation error separate from physical control evidence.

## Sources

- [Tactile-JEPA arXiv record, submitted September 21, 2026](https://arxiv.org/abs/2609.24385)
- [Tactile-JEPA v1 methods, datasets and results](https://arxiv.org/html/2609.24385v1)
- [Author-linked code repository and license](https://github.com/E-Kovtun/tactile)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these systems or reproduced their experiments.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: "2026-11-04",
    readTime: "6 min read",
    sourceDate: '2026-09-21',
    evidenceStatus: 'Preprint · arXiv v1 · code inspected',
  },
  {
    id: 'touch2robot-tactile-feedback-human-demonstrations',
    title: 'Touch2Robot adds simulated robot contact to human demonstrations',
    seoTitle: 'Touch2Robot: Tactile Demonstration Results and Limits',
    seoDescription: "Read Touch2Robot binary contact regions, F1 and onset-delay metrics alongside staged task scores; distinguish visual feedback from measured tactile control.",
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

The evaluation metric is completion, not always binary success. Rotation, wiped area and drawer displacement are scaled toward a task goal. Pick-and-place awards 25% for each of reach, pick, move and place. Ten attempts per task per operator are collected under each interface and replayed on the physical robot without filtering by replay outcome. The main collection-quality paragraph does not state the operator count.

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

This is a preprint and RoboSkin.ai has not reproduced it. The November 4 project-page recheck found public demonstrations and explanatory material but did not identify a public code repository, dataset download or software license. The paper does not establish that the full collection system can be reconstructed from public assets alone.

## Separate contact accuracy from interface timing

The method compares binary contact across eight semantic regions: four fingers and four palm regions. It excludes the unmatched fifth human finger. Thresholded contact agreement is not pressure calibration or shear matching. The physical contact F1 of 44.19 is not the percentage of frames classified correctly; the 6.38% false-positive rate uses actual negative cases as its denominator. [Method and metric definitions](https://arxiv.org/html/2609.24660v1).

The 30 Hz display, approximately 122 ms end-to-end feedback delay, 1.12 ms retargeter computation and 857.4 ms contact-onset error measure different things. The onset metric excludes pairs with a missing onset, so read it together with detection metrics rather than treating it as complete contact reliability. Simulation agreement with human preferences also has a different reference from agreement with physical robot sensors.

For a collection pilot, retain measured glove contacts, simulated robot contacts, tracked object poses and exactly what feedback was displayed. Test missed and spurious contacts as well as delay. Distillation augments 30 teacher trajectories per task into 400 rollouts; those are not 400 independent human demonstrations. This proposed evidence record helps separate collection quality from training volume and downstream autonomy. See [contact-signal roles in teleoperation](/robot-teleoperation#contact-signal-roles).

## Sources

- [Touch2Robot arXiv record, submitted September 21, 2026](https://arxiv.org/abs/2609.24660)
- [Touch2Robot v1 methods, tables and appendix](https://arxiv.org/html/2609.24660v1)
- [Official Touch2Robot project page](https://touch2robot.github.io/)

*Evidence review updated November 4, 2026. Original publication dates are retained. We inspected sources and public metadata; we did not run these robot systems or download their training archives.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: "2026-11-04",
    readTime: "5 min read",
    sourceDate: '2026-09-21',
    evidenceStatus: 'Preprint · arXiv v1',
  },
  {
    id: 'when-touch-matters-cluttered-dexterous-grasping',
    title: 'When Does Touch Matter tests tactile and wrench feedback in clutter',
    seoTitle: 'When Does Touch Matter? Dexterous Grasping Results',
    seoDescription: "Interpret grasping success per episode, policy-visible touch and shared compliance; review the v2 results, recovery limits and available trial browser.",
    excerpt: 'A USC and University of New Mexico study holds demonstrations and control fixed while varying policy-visible sensing. The advantage grows in confined, cluttered scenes.',
    category: 'Dexterous manipulation benchmarks',
    image: '/generated/news/when-touch-matters-sensing-ablation.png',
    imageAlt: 'Diagram comparing vision-only, wrench, taxel and combined robot grasp policies across increasing clutter and contact ambiguity.',
    imageCaption: 'Original RoboSkin.ai summary of the paper’s sensing ablation. It is not a reconstruction of a physical trial.',
    sourceTitle: 'When Does Touch Matter? Charting the Vision-Interaction Gap in Cluttered Dexterous Grasping',
    sourceUrl: 'https://arxiv.org/abs/2609.24068',
    sources: [
      { title: "Current v2, revised October 13, 2026", url: "https://arxiv.org/html/2609.24068v2" },
      { title: 'When Does Touch Matter arXiv record', url: 'https://arxiv.org/abs/2609.24068' },
      { title: 'When Does Touch Matter v1 evaluation', url: 'https://arxiv.org/html/2609.24068v1' },
      { title: 'Official interaction-aware grasping project', url: 'https://interaction-dex-grasp.github.io/' },
    ],
    technicalFocus: ['dexterous grasping', 'distributed fingertip taxels', 'wrench estimation', 'cluttered manipulation'],
    content: `# When Does Touch Matter tests tactile and wrench feedback in clutter

University of Southern California and University of New Mexico researchers released “When Does Touch Matter?” on September 21, 2026. The October 13 v2 retains the main results. The study asks a narrow but important question: when does policy-visible interaction sensing improve on RGB-D geometry for target-oriented dexterous grasping in clutter? It holds demonstrations, action space and compliant control fixed while varying whether the learned policy sees estimated wrenches, fingertip taxels or both. [Paper and version record](https://arxiv.org/abs/2609.24068).

## Key takeaways

- The combined vision, wrench and taxel policy succeeds in 24/25 trials, versus 14/25 for vision-only, across five physical scene conditions.
- On the three nested confined conditions, the combined policy scores 15/15 while vision-only scores 6/15. On easier or less ambiguous conditions, the gap is small or absent.
- Every controlled policy still uses the same wrench-based compliant controller. The ablation changes what the learned policy observes, not whether the robot physically responds compliantly to contact. [Design and Table I](https://arxiv.org/html/2609.24068v1#S4).

## What changed

The xArm7 carries a 16-DoF LEAP Hand with four PaXini fingertip pads, providing 508 three-axis taxels. Motor currents and hand Jacobians estimate four fingertip wrenches and one aggregated wrist wrench. Two Intel RealSense cameras provide RGB-D views. Grounding DINO and SAM 2 produce target masks, which are converted into a 1,024-point target-context cloud.

A diffusion policy predicts 16 steps of end-effector pose and hand-joint references on a 10 Hz command grid, executing eight before replanning. This command rate is not a claim of ten fresh model queries per second. Taxels are encoded with a two-layer attention model; wrench and proprioception are supplied directly. All variants use the same 320 demonstrations, 90/10 split, 300 training epochs and compliance controller. [System details](https://arxiv.org/html/2609.24068v1#S4).

## Where the interaction gap appears

| Policy-visible input | Overall physical success |
| --- | ---: |
| Vision only | 14/25 (56%) |
| Vision plus wrench | 15/25 (60%) |
| Vision plus taxels | 18/25 (72%) |
| Vision plus wrench plus taxels | 24/25 (96%) |

The combined result is not simply the sum of two sensors. Estimated wrench exposes weak or obstructed loading and can trigger an early regrasp. The taxel field describes how support is distributed across fingers. In the three progressively harder conditions, the combined policy stays at 5/5 while the stronger single-interaction result reaches only 3/5, 4/5 and 3/5.

The study covers 200 physical trials across eight policy variants, five conditions and five trials per cell. Each trial permits repeated autonomous grasp attempts, so 24/25 is episode-level success rather than first-attempt reliability. The headline comparison still has only five trials per scene. Manual resets introduce small placement variation, and confidence intervals are not reported for the success table.

An external vision-only ClutterDexGrasp reproduction is not included in the matched physical table. The authors report that its zero-shot hardware deployment produced unsafe rapid motion and downward pushing that required an emergency stop. The manuscript describes deployment without its admittance controller, while the current project’s implementation note says arm and hand compliance were enabled in the preliminary probe. These accounts do not establish an identical tested configuration. Treat this as an implementation warning, not a matched performance or safety comparison.

## What this means for robot hands

RoboSkin analysis: the main contribution is a demand-conditioned comparison, not a claim that every grasp needs touch. Vision-only ties the combined policy at 4/5 in the open small-object scene. Interaction sensing becomes decisive when confinement, occlusion and grasp sensitivity accumulate. That distinction helps teams decide where [robot-hand tactile sensing](/robot-hands) is worth integration effort.

The ablation also warns against treating “force” and “tactile” as interchangeable. Wrench estimates provide compact load cues; distributed taxels provide contact geometry. The strongest policy uses both, which aligns with the design questions in the [tactile manipulation guide](/tactile-manipulation) and [robot gripper sensor guide](/applications/robot-gripper-tactile-sensor).

## Limitations and availability

The experiment uses one LEAP Hand embodiment, one PaXini sensor class and five engineered tabletop conditions. The thick fingertips limit access to narrow gaps. Complete target occlusion can defeat relocalization, and the policy can stall locally without explicit progress monitoring. Execution-time statistics condition on successful episodes and therefore have survivorship bias.

This is a preprint, and RoboSkin.ai has not reproduced the trials. On November 4, the official page provides a browser described as covering all 50 Vision-only and Ours trials, including failures. This is a subset of the 200-trial study, not a verified complete release. We did not watch or independently score every recording. No public training code, policy checkpoint or demonstration dataset was identified in the reviewed project page.

## Keep policy sensing and physical compliance separate

The [v2 control description](https://arxiv.org/html/2609.24068v2) makes three interfaces distinct. Current-derived wrench estimates feed the common admittance controller; enabled wrench channels also enter the learned policy; taxel measurements enter the policy but not that low-level controller. Removing a policy input therefore does not remove every physical use of interaction information.

| Evaluation question | Hold fixed | Measure separately |
| --- | --- | --- |
| Does the policy benefit from touch? | Demonstrations, controller and task criteria | Completion with and without policy-visible channels |
| Does recovery improve? | Reset procedure and permitted attempts | First-attempt result, retries, interventions and timeout |
| Does the system remain usable in occlusion? | Sensor placement and target definition | Lost-target events, stalls and recovery outcome |

For a replication, record acquisition clocks, reference-command timing and controller feedback separately. The 10 Hz command grid and eight executed steps per chunk do not mean that every model query supplies fresh tactile correction at 10 Hz. Log the executed references and resulting motion. Finally, retain unsuccessful episodes in timing and recovery reports: successful-only durations can hide a slow or stalled failure. These are proposed measurements, not a claim that the published system was retested here. See the [vision–touch evaluation framework](/visuo-tactile#training-and-runtime-touch).

## Sources

- [When Does Touch Matter arXiv record, submitted September 21, 2026](https://arxiv.org/abs/2609.24068)
- [When Does Touch Matter v1 methods, tables and limitations](https://arxiv.org/html/2609.24068v1)
- [Official interaction-aware grasping project page](https://interaction-dex-grasp.github.io/)

*Source review updated November 4, 2026. Original publication dates are retained. Findings are attributed to their authors; we did not run these systems or verify dataset payloads.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: "2026-11-04",
    readTime: "5 min read",
    sourceDate: '2026-09-21',
    evidenceStatus: "Preprint · arXiv v2 reviewed November 4 · episode-level trials · project trial browser inspected, not independently rescored",
  },
  {
    id: 'zerotouch-tactile-supervision-visual-grasp-control',
    title: 'ZeroTouch learns visual grasp-force control from tactile supervision',
    seoTitle: 'ZeroTouch: Visual Grasp Control, Force Errors and Limits',
    seoDescription: "Evaluate ZeroTouch current-force and target errors separately from threshold stopping; review sensor-reference limits, hidden loads and grasp-control scope.",
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

The November 4 recheck of the paper and arXiv record did not verify project-specific code, checkpoint or dataset downloads. The work remains a preprint, and RoboSkin has not reproduced it. For another use of human touch data, compare the distinct action-conditioned experiments in [DexTouch-WM](/research/dextouch-wm-human-touch-world-model-2026); its objective differs from ZeroTouch's grasp-force estimator.

## Audit the two predictions and the stopping decision separately

A stopping rule can work even when its inputs share a bias. If both the predicted current compression and target shift by the same amount, their crossing can remain unchanged. That algebra explains why a successful grasp is insufficient evidence of calibrated force prediction; it does not imply that the two errors always cancel. [Prediction and termination limits](https://arxiv.org/html/2609.21726v1).

| Evidence layer | Suggested acceptance record |
| --- | --- |
| Reference | Sensor revision, axis/sign convention, calibration and uncertainty |
| Current wrench | Per-axis error and bias, grouped by episode and load condition |
| Desired target | Eligible pre-contact inputs, target construction and signed error |
| Closure decision | Crossing time, stop command, measured compression and overshoot |
| Physical outcome | Lift/hold result, slip, damage and any intervention |

These are proposed engineering checks. The study’s settled-force target comes from successful lift-and-hold examples; it does not define a damage threshold for a new object. Keep target-construction failures and operating conditions visible when building a new dataset. Load-shift images also vary in grasp and closure, so attention maps and qualitative examples cannot isolate the cause of a changed force estimate. An independent reference and a matched task test answer different questions. Compare [inferred contact and runtime touch](/visuo-tactile#training-and-runtime-touch) before deciding whether visual estimation fits the application.

## Sources

- [ZeroTouch arXiv record: September 18, 2026](https://arxiv.org/abs/2609.21726)
- [ZeroTouch v1: methods, tables and limitations](https://arxiv.org/html/2609.21726v1)

*Source review updated November 4, 2026. Original publication dates are retained. Findings are attributed to their authors; we did not run these systems or verify dataset payloads.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: "2026-11-04",
    readTime: "6 min read",
    sourceDate: '2026-09-18',
    evidenceStatus: 'Preprint · arXiv v1',
  },
  {
    id: 'crisp-contact-simulation-geometry-solvers-release',
    title: 'CRISP details contact simulation for tight-tolerance robot assembly',
    seoTitle: 'CRISP Robot Simulation: Contact Results, Access and License',
    seoDescription: "Evaluate CRISP collision and solver evidence, ambiguous contact-force distributions and versioned research access before using simulated tactile signals.",
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

## Stable motion does not identify a unique pressure distribution

CRISP's stacking example makes an important tactile-data distinction: when contact forces are underdetermined, CANAL and SubADMM can produce different force distributions while both maintain stable motion. The appendix describes concentrated versus more distributed support forces. A visually plausible stack is therefore insufficient evidence that a predicted local pressure pattern matches a physical skin. [Appendix D](https://arxiv.org/html/2609.21761v1).

| Layer to validate | Proposed receiving-team record |
| --- | --- |
| Geometry | Collision representation, supported shape pair, discretization and any convex approximation |
| Mechanical assumptions | Friction, compliance assumptions, timestep and imposed motion |
| Numerical solution | Solver, iteration budget, residuals, convergence failures and warm-start state |
| Reported metric | Contact-point penetration, geometric overlap or motion outcome, with its exact sampling rule |
| Sensor interpretation | Mapping from simulated contacts to sensing locations, measured calibration target and unresolved ambiguity |

For a pressure-array or optical-skin simulator, the last row requires an additional sensor model and physical reference measurements. Solver contact forces are not automatically equivalent to a measured taxel output. Likewise, a low geometric penetration value is not a force-calibration result or a guarantee that a learned policy will transfer.

The November 4 [repository revision](https://github.com/INRoL/crisp/tree/3d47426cac6f001b16f8d613339383c144029e88) continues to describe example integration with a prebuilt package. Current solver documentation warns that reaching an iteration limit does not establish convergence, and a stagnation threshold is not a relative-accuracy certificate. The [1.1.1 release notes](https://inrol.github.io/crisp/docs/release-notes/) now describe corrected contact-stiffness handling in N/m and updated examples. That software change is separate from the paper's evaluation and makes version matching material to a reproduction.

The earlier versioned observations above remain historical; reproduce with a matched binary, headers, examples and license record rather than an unpinned latest download. No package was installed or executed for this review. See the [tactile AI evidence chain](/tactile-ai#contact-evidence-chain) before treating synthetic mechanics as measured training data.

## Sources

- [CRISP arXiv v1](https://arxiv.org/html/2609.21761v1)
- [Official project and documentation](https://inrol.github.io/crisp/)
- [Public repository and versioned packages](https://github.com/INRoL/crisp)
- [Reviewed license](https://github.com/INRoL/crisp/blob/fc0684bdb3f325ab1586fc6df987c15839f08733/LICENSE)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these systems or reproduced their experiments.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: "2026-11-04",
    readTime: "6 min read",
    sourceDate: '2026-09-18',
    evidenceStatus: 'Preprint · arXiv v1',
  },
  {
    id: 'agile-wam-tactile-world-action-model-robot-control',
    title: 'Agile-WAM pairs fast touch prediction with robot actions',
    seoTitle: 'Agile-WAM: Tactile Robot Control, Results and Latency',
    seoDescription: "Assess Agile-WAM predictive-loss ablations, action prefixes and recovery evidence; retain baseline differences and unresolved timing discrepancies.",
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

The November 4 recheck of the [official project](https://hanchuzhou.github.io/TARO_project_page/) found task demonstrations and the same code “coming soon” label recorded in September. No linked checkpoint or experiment-dataset download was verified there. The arXiv record does not state peer-reviewed acceptance. RoboSkin reviewed the paper and project, but did not run the model or reproduce any robot trials.

Use the [benchmark directory](/benchmarks) to compare protocols and the [tactile sensor guide](/sensors) to check hardware assumptions. The cover is an original explanatory diagram, not an experimental image.

## Test predictive learning and physical recovery as different claims

A predictive objective can improve a policy even when no candidate-action search occurs at deployment. Agile-WAM transforms the current fused observation through six flow steps; those steps do not acquire six new tactile measurements. A next-frame tactile target is supervision for anticipation, not proof that the robot checks contact after every executed action. [Method and ablations](https://arxiv.org/html/2609.20761v1).

The most informative ablation holds latent capacity fixed while removing prediction losses. It addresses whether the training objective helps beyond a larger representation. Broader baseline comparisons ask a different question: VITA-VT is the authors' tactile extension, and their Tactile-WAM comparison reproduces its core attention design inside the selected benchmark implementation. These are not interchangeable with testing every upstream released stack under its original protocol.

| Evaluation question | Evidence to retain in a proposed replication |
| --- | --- |
| Does prediction help learning? | Equal-capacity ablation, identical data and checkpoint-selection rule |
| Can the robot recover? | Initial failure, corrective attempts, interventions and final outcome for every trial |
| Is feedback fast enough? | Sensor timestamp, inference start/end, eight-action prefix duration and next observation |
| Does the interface transfer? | Sensor modality, calibration and pressure/force channel meanings |

The demonstrations deliberately include corrective behavior, and the project shows selected recoveries. Those examples do not supply a conditional success rate after an initial failure. A new evaluation should count those attempts rather than infer general recovery from a successful video. Retain the paper's best-checkpoint simulation reporting and the unresolved timing discrepancy when comparing systems in the [world-model runtime map](/robot-world-models#prediction-runtime-contracts).

## Sources

- [Agile-WAM arXiv record, submitted September 17, 2026](https://arxiv.org/abs/2609.20761)
- [Agile-WAM v1: methods, task counts and inference table](https://arxiv.org/html/2609.20761v1)
- [Official project: demonstrations and code status](https://hanchuzhou.github.io/TARO_project_page/)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these models or robot experiments.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: "2026-11-04",
    readTime: "6 min read",
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
    seoDescription: "Evaluate TouchSight label provenance, active-taxel errors and generated-video splits; distinguish glove units, geometric contact and physical force calibration.",
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

On September 20, RoboSkin verified a public, ungated [Hugging Face file listing](https://huggingface.co/datasets/chuqiaoLyu/Xspark-HumanTouch/tree/81822a10cac5def2638db546eaeced581d71a8b5) containing Parquet, video and metadata files. Its [pinned README](https://huggingface.co/datasets/chuqiaoLyu/Xspark-HumanTouch/blob/81822a10cac5def2638db546eaeced581d71a8b5/README.md) still describes roughly 100 hours, warns that uploading is ongoing, and lists an AIGC edition as in preparation. The README defers licensing to [ModelScope, whose dataset page displays CC-BY-NC-4.0](https://www.modelscope.cn/datasets/chuqiaoLyu/Xspark-HumanTouch). That condition was displayed during the earlier review; the November 4 text fetch did not expose a readable ModelScope license, so current terms require confirmation before reuse. Noncommercial restrictions matter for reuse; it does not license unreleased TwinTouch data or model weights. We did not decode the complete payload or independently total its duration.

The November 4 HumanTouch README still describes an approximately 100-hour initial subset, ongoing uploads and an AIGC edition in preparation. No dedicated TwinTouch-20H download or TouchSight checkpoint/code release was verified in the paper and linked materials reviewed. The public HumanTouch files should not be presented as the complete 500-hour training set or as a confirmed TwinTouch release.

## Why the distinction matters

RoboSkin analysis: generated appearance may help reuse expensive measured labels, but the resulting predictions need provenance. Store whether each field is measured, geometry-derived, generated or predicted; preserve episode relationships and excluded sensor channels. The [LeRobot format guide](/guides/lerobot-dataset-format) and [tactile calibration guide](/guides/tactile-sensor-calibration) explain useful integration checks without certifying compatibility with this release.

TouchSight remains a preprint. The reviewed study does not demonstrate a robot policy trained on its predictions, and RoboSkin has not reproduced it. Compare [DexTouch-WM’s separate human-to-robot world-model experiments](/research/dextouch-wm-human-touch-world-model-2026) before equating a contact estimator with action-conditioned robot dynamics.

## What would validate a predicted contact field for reuse?

A useful evaluation must preserve the origin of both the image and its label. Keep the captured episode and generated derivative in the same split, retain rejected-generation reasons, and carry the valid-taxel mask. Treating padding or unreliable channels as correct zero predictions would change the metric denominator. [Split, mask and loss definitions](https://arxiv.org/html/2609.20414v1).

There are also distinct thresholds: the paper uses one raw glove unit to derive contact labels and five units for its active-taxel evaluation. Neither is a Newton-valued acceptance threshold. The current [HumanTouch acquisition description](https://xsparkai.com/sparklab/humantouch/) explicitly describes normalized relative contact activity rather than calibrated pressure, force or object load. A colorful prediction should therefore retain the source units and calibration limits.

For downstream use, select a permitted held-out recording with independent contact references, evaluate missing and spurious contact as well as active-region error, and stratify results by occlusion and material. Then test the intended robot behavior separately; a contact-estimation improvement does not establish safer grasping. The scaling study uses seen glove-test tasks, while natural bare-hand examples lack measured tactile labels. The [visuo-tactile method comparison](/visuo-tactile#training-and-runtime-touch) separates this estimation route from policies that consume measured touch.

## Sources

- [TouchSight arXiv record, September 17, 2026](https://arxiv.org/abs/2609.20414)
- [TouchSight v1: TwinTouch construction, metrics and appendix](https://arxiv.org/html/2609.20414v1)
- [SparkLab HumanTouch acquisition and release description](https://xsparkai.com/sparklab/humantouch/)
- [HumanTouch public repository at the reviewed revision](https://huggingface.co/datasets/chuqiaoLyu/Xspark-HumanTouch/tree/81822a10cac5def2638db546eaeced581d71a8b5)
- [ModelScope HumanTouch repository; license observed during the earlier review](https://www.modelscope.cn/datasets/chuqiaoLyu/Xspark-HumanTouch)

*Source review updated November 4, 2026. Original publication dates are retained. Findings are attributed to their authors; we did not run these systems or verify dataset payloads.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-22',
    updated: "2026-11-04",
    readTime: "6 min read",
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
      "Read FibTac’s motion-dependent sensing, task splits and open-loop pneumatics; distinguish classification, flow estimation and verified release permissions.",
    excerpt:
      'Purdue researchers use the same fiber array to grasp objects and sense contact. The peer-reviewed study reports air and water experiments, with separate protocols for objects, liquids, and granular media.',
    content: `# FibTac combines pneumatic gripping and tactile sensing

**Research news — paper published August 31, 2026; first reviewed September 11; source review updated November 4, 2026**

FibTac is a pneumatic gripper that uses carbon fibers both to manipulate objects and to sense their interaction with the environment. Researchers at Purdue University describe the system in a peer-reviewed paper published in npj Robotics on August 31, 2026. Its useful distinction is the shared mechanical structure: the fibers do the grasping, while an internal camera reads their movement as tactile information. [Read the paper](https://www.nature.com/articles/s44182-026-00112-0).

The laboratory results cover chess-piece identification, liquid classification, granular-material classification, underwater object recognition, and water-flow estimation. These are separate experiments with different training sets and conditions. A single accuracy number would obscure what the gripper has actually demonstrated.

## How a fiber gripper senses touch

Carbon fibers are embedded in silicone inside a waterproof housing. Pneumatic pressure deforms the silicone membrane, translating and reorienting the rigid fibers to grasp or release an object; the fibers themselves are not the compliant bending element. The camera observes fiber-tip motion, which also changes when an object or surrounding medium resists that movement. Learned models use these image sequences for classification or regression.

This combines actuation and sensing in a compact contact structure. It also makes the signal depend on how the robot moves: liquid tests use active grasp–release cycles, whereas the granular tests move the gripper vertically with passive fibers. The sensing protocol is part of the measurement, not just a detail of the demonstration.

The authors report a payload up to 186 g and more than 3,000 actuation cycles without observable damage under their tested conditions. These establish a laboratory operating range; they do not establish an industrial lifetime or a payload rating across arbitrary objects. The [paper’s results and methods](https://www.nature.com/articles/s44182-026-00112-0#Sec2) describe the tested hardware and procedures.

## What the classification results measure

The following values are author-reported results from the paper. Clips, held-out samples, and online manipulation trials are kept separate because they are different evaluation units.

| Experiment | Classes and data protocol | Reported result | Interpretation |
| --- | --- | --- | --- |
| Chess-piece recognition | Six piece types; 105 clips per class, with 20% reserved for validation; a separate online manipulation evaluation uses 20 trials in total | 100% in the 20 online trials | A small online cohort, not 100% accuracy across arbitrary grasped objects |
| Liquid classification | Water, honey, syrup, dish liquid, oil, and an empty reference; 220 training and 20 test clips per class | Approximately 97.5% classification accuracy | Six classes include the empty reference; this is not six different liquids |
| Granular-material classification | Flour, beans, rice, oats, and sugar; 200 clips per class with 10% for validation, plus 20 test samples per class | Approximately 90% classification accuracy | Passive fibers sense resistance during robot-driven vertical movement |
| Underwater object classification | Four objects; 110 clips per object, including 10 validation and 10 test clips per object | 100% classification accuracy | A controlled four-object underwater experiment; three objects are artificial replicas and one is seaweed |

The chess experiment’s 20 online trials should not be substituted for the larger clip-based training and validation collection. Likewise, the underwater result does not imply that the gripper can identify unseen marine objects. These distinctions matter when comparing FibTac with other [robotic gripper tactile sensors](/applications/robot-gripper-tactile-sensor).

## Why motion and medium matter

For liquids, the gripper alternates grasp and release every second, collecting the resistance pattern over two cycles. For granular media, the robot moves vertically with a 4 cm amplitude and a 1.4-second period without pneumatic actuation. These motions actively expose material-dependent signals to the fiber array.

The flow experiment adds a different task: regression against measured water-flow conditions. The collection uses seven angles from 0° to 90° in 15° increments, 20 flow levels, and 12 clips per condition, allocated as nine training, one validation, and two test clips. The reference flow-meter values are volumetric flow in L/min; they should not be described as water velocity in m/s. See the [flow-sensing methods](https://www.nature.com/articles/s44182-026-00112-0).

For an engineering reader, this makes FibTac a candidate for studying coupled grasping and active tactile perception in wet or compliant environments. A comparison should match motion, fluid or material, camera settings, object set, and train/test separation before attributing a result solely to the sensor design.

## What can be inspected or reproduced today?

The authors’ [FibTac repository](https://github.com/xvvzhang/FibTac) provides evaluation notebooks for five tasks and links external data and checkpoints. The November 4 root and README review still describes validation/test assets rather than a complete training-data release. RoboSkin reviewed the repository and its instructions but did not download the external data or rerun the models.

The paper and repository point to different Google Drive folders. Both are source-provided links; their contents and equivalence were not independently verified in this review. A reproducer should first confirm that the selected notebook, checkpoint, and evaluation split belong together. The November 4 GitHub root has no license file and its license metadata is empty, so the paper’s open-access status should not be treated as a software or data license.

## Limits to carry into a comparison

The paper discusses practical constraints, including camera-cable fragility, the tradeoff between gripping strength and fine sensing, and generalization to unseen objects or environments. Those constraints are consequential for a combined actuator and sensor: changing stiffness or fiber geometry may improve one function while changing the other.

RoboSkin did not conduct these laboratory experiments. The article synthesizes the authors’ paper and public repository, and the cover is an illustration. For alternative contact structures, see [soft robotic skin](/applications/soft-robotic-skin) and the [tactile sensor benchmark guide](/benchmarks). For a different approach that reconstructs contact geometry from sparse electrical measurements, compare [TacPrint’s controlled grasping results](/research/tacprint-wearable-tactile-contact-reproduction-2026).

## Sensing does not automatically close the pneumatic control loop

FibTac’s active sensing uses timed pneumatic commands and predefined robot waypoints. In the chess example, classification selects a predefined destination; it does not establish a controller that continuously adjusts grasp pressure from measured contact. The camera’s 60 fps is an acquisition setting, not evidence of a 60 Hz robot feedback loop. [Control and experimental methods](https://www.nature.com/articles/s44182-026-00112-0).

There is also a model-selection boundary in the flow experiment: the methods select the model using the lowest test-set MAE. That score therefore should not be presented as performance on an untouched final holdout. A new comparison should reserve an additional evaluation set, freeze model selection first and preserve the grouping by angle, flow condition and capture sequence. This is a proposed evaluation design; RoboSkin has not rerun the model.

For a new gripper or medium, record commanded pressure, robot motion, camera timing, fiber geometry and the actual outcome alongside the predicted class or flow. Recheck those relationships after replacing the membrane or fibers. Include unfamiliar objects and an explicit rejection decision instead of assuming every input belongs to a known class. The paper itself reports unreliable weight estimation, so successful classification must not be converted into a calibrated weight or contact-force claim. See the [contact-evidence comparison](/robot-grippers#contact-evidence) for the separate tests needed before using a sensor output in control.

## Sources

- [Athar et al.: FibTac, npj Robotics, August 31, 2026](https://www.nature.com/articles/s44182-026-00112-0)
- [Purdue MARS Lab research listing](https://www.purduemars.com/research)
- [FibTac evaluation repository, reviewed revision](https://github.com/xvvzhang/FibTac/tree/3f2d29848c1d0eeddd89605259a19d1188241bb0)

*Source review updated November 4, 2026. Original publication dates are retained. Experiments are attributed to their authors; RoboSkin did not reproduce the hardware, execute the models or inspect downloaded experimental payloads.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-11',
    updated: "2026-11-04",
    readTime: "6 min read",
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
      "Inspect TWINS body-surface demonstrations, assistant contact cues and compliance changes; separate 219 sensing cells, tracking error and task evidence.",
    excerpt:
      'AIST’s wearable dual-arm system records pressure and proximity on the hands, arms, and chest. Its public hardware release makes the embodiment inspectable, while policy evidence remains qualitative.',
    content: `# TWINS captures touch beyond the robot hand

**Research news — preprint submitted August 3, 2026; release status reviewed September 11, 2026**

TWINS is a wearable demonstration system designed to capture manipulation that uses the arms and chest as well as the hands. A team at Japan’s National Institute of Advanced Industrial Science and Technology, AIST, pairs a human-operated wearable with a robot that shares its joint configuration and dimensions. Tactile cells record pressure and proximity across both systems’ contact surfaces. The [August 3 preprint](https://arxiv.org/abs/2608.01733) reports a small demonstration-learning study, not a peer-reviewed success-rate benchmark.

There is a concrete release update to accompany the paper: the [official project page](https://mmurooka.github.io/twins-project-page/) now links a hardware repository with robot descriptions and assembly resources. The project’s learning-code link still says “Coming soon” in the November 4 review. Those are different levels of access and should be evaluated separately.

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

That is useful for understanding the mechanical embodiment. It does not establish that the experiment’s training implementation, checkpoints, or 40 demonstrations have been released. The November 4 official-page review still finds the learning-code link labeled forthcoming. RoboSkin reviewed those listings but did not build the hardware, download all linked fabrication resources, or reproduce a policy.

For a lab considering a similar collection system, the first questions are practical: can the human demonstrate with the same reachable contact geometry, do pressure and proximity remain calibrated after mounting, and does the robot have enough compliance to tolerate imperfect replay? A follow-up evaluation should count attempted and successful trials, report object changes, and compare identical policies with and without the tactile input.

## Where TWINS fits in tactile robot learning

TWINS addresses demonstration capture over a large contact surface. [TacPrint](/research/tacprint-wearable-tactile-contact-reproduction-2026) addresses a related problem at the fingertip: transferring local contact geometry from a human demonstration to a robot. The two projects differ in sensor technology, embodiment, and evaluation protocol, so their reported measurements should not be ranked as if they were one benchmark.

For the surrounding architecture, see [robot teleoperation](/robot-teleoperation), [robot learning](/robot-learning), and [robot hands](/robot-hands). The evidence here is author-reported and preliminary; the contribution is a concrete interface for contact-rich demonstrations and an inspectable hardware release.

## Record who creates each contact event

Some demonstrated contacts are deliberate instructions from an assistant. In the paper, forearm contact cues release, while touching a gripper can trigger a ball-placement response. These interactions show a learned response within the collection protocol; they do not establish unrestricted recognition of object state or human intent. Adaptive Holding also couples different objects with different contact locations. Object identity and contact location are not independently varied generalization tests. [Task procedures and observations](https://arxiv.org/html/2608.01733v1).

| Protocol detail | Why a receiving lab needs it |
| --- | --- |
| Assistant touch and object presentation | Separates an intentional cue from incidental contact or an autonomous task transition |
| Pressure and proximity channels | Preserves the distinction between two measurements at each of the 219 locations |
| Padding on the object and chest | Records a mechanical change that affects friction, compliance and holding behavior |
| Demonstration and command timing | Distinguishes 10 Hz recording from tracking delay and policy execution |
| Drops, resets and incomplete attempts | Makes qualitative demonstrations auditable without inventing a success rate |

Matching joint geometry makes motion transfer easier, but does not make the wearable and robot equally compliant. The authors added sponge to both the held object and the chest after observing holding difficulties. That intervention changes the physical interaction; its effect should not be credited to learning alone.

A proposed follow-up should preserve cell identity, mounting, normalization, assistant actions and padding revisions with each demonstration. Evaluate object and contact-location changes separately, and count all attempted rollouts under a fixed success rule. The [tactile AI comparison](/tactile-ai#contact-evidence-chain) places TWINS at the collection interface, distinct from an encoder benchmark or a validated autonomous manipulation product.

## Sources

- [Kitamura et al.: TWINS preprint, August 3, 2026](https://arxiv.org/abs/2608.01733)
- [TWINS full paper and experimental protocol](https://arxiv.org/html/2608.01733v1)
- [AIST authors’ TWINS project page](https://mmurooka.github.io/twins-project-page/)
- [TWINS-Hardware at the reviewed revision](https://github.com/isri-aist/TWINS-Hardware/tree/fe9b8090edd8601798dbc618e1d9a9711a8c9697)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these systems or reproduced their experiments.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-09-11',
    updated: "2026-11-04",
    readTime: "6 min read",
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
      "Compare Gemini Robotics 2 model interfaces, chart aggregation, access and safety-evaluation limits; distinguish embodied reasoning from robot action control.",
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

DeepMind says one Gemini Robotics 2 checkpoint controlled three embodiments: an Apptronik Apollo 2 with Inspire hands, an Apollo 2 with SharpaWave hands, and a Franka Duo with a Robotiq gripper. The values below were checked against the company’s three original charts. Whole-body and gripper bars average multiple tasks within each named skill category; multi-finger bars describe individual tasks. Do not pool these rows as eleven equivalent trials or average them into a universal dexterity score.

| Embodiment and reported task or skill category | Provider-reported chart percentage |
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

DeepMind describes On-Device 2 as taking text, images, and numerical proprioception and returning numerical robot actions. The company reports adaptation to new bi-arm embodiments in a few hours, typically using fewer than 200 examples in its experiments. Adaptation time and the amount of demonstration data are different quantities. The On-Device 2 card primarily evaluates standing bi-arm manipulation; the main VLA’s mobile whole-body demonstrations should not be attributed to this smaller model. Its model card also states two important limitations: weaker generalization outside the training distribution and difficulty controlling high-degree-of-freedom robots.

Local inference may reduce dependence on network connectivity and latency, but “on-device” is not itself a latency guarantee. The public model card does not publish a universal end-to-end control frequency across supported robot hardware.

## The tactile question: dexterous is not the same as tactile

The release demonstrates hands and grippers, but the public announcement and On-Device 2 model card describe vision, language, and proprioception—not tactile arrays or robot-skin signals—as model inputs. RoboSkin.ai therefore does not classify this release as a tactile foundation model.

That boundary is strategically useful. Multi-finger tasks such as tying, sealing, and tool handling are exactly where contact state, shear, slip, and distributed force can matter. The release establishes a strong vision-to-action reference point; it does not show whether touch improves the reported tasks. A future comparison should document the sensor stack and test the same policy with and without tactile input.

For the contact layer, compare the [robot hands guide](/robot-hands), [tactile AI architecture](/tactile-ai), and [robot manipulation overview](/robot-manipulation).

## Safety evidence is also layered

DeepMind’s separate safety report evaluates agentic safety and uncertainty handling, including when an embodied-reasoning agent should refuse, ask for help, or call a safety tool. The report explicitly says it does not evaluate the certified functional-safety architecture, redundancy, or real-time guarantees needed for a compliant physical deployment.

That is the correct system boundary. Semantic safety can decide that a request is unsafe. Hardware and control safety must still make the robot stop predictably when a hazardous condition occurs. See the [robot safety map](/robot-safety) for the distinction between AI behavior, protective sensing, control functions, integration, and validation.

## Choose the interface before choosing a model name

The [ER 2 model card](https://deepmind.google/models/model-cards/gemini-robotics-er-2/) identifies multimodal inputs but **text output**. A plan, generated tool request or success judgment still needs an application that interprets it, a suitable action-producing policy, and a controller. API access to ER 2 is therefore not access to the Gemini Robotics 2 VLA weights. The [On-Device 2 card](https://deepmind.google/models/model-cards/gemini-robotics-on-device-2/) instead specifies numerical robot actions as output. These are different integration contracts.

| Proposed evaluation | Evidence to establish first | Result that would remain insufficient |
| --- | --- | --- |
| Reasoning over a recorded scene | Exact reasoning model, observation sequence, task and expected text/tool response | A plausible plan without execution or independently checked task state |
| Control on a selected embodiment | Authorized policy access, observation/action mapping, calibration and allowed operating conditions | A result from another hand or a different family member |
| Local adaptation | Target embodiment, demonstration coverage, adaptation procedure and actual timing measurements | The words “on-device” or “fewer examples” without the tested configuration |

This is an editorial planning aid, not a procedure we ran. The provider's access descriptions above belong to the July release and the reviewed cards; we have not checked entitlement through an account or called the API. The ER 2 card also limits safety-critical use, so a planning experiment should not be presented as permission to rely on the model for a protective function.

The [safety report](https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf) separates several evidence types. Its multi-turn uncertainty study uses an emulated VLA interface, not a physical robot or physics simulation. A different study involves an actual Apollo 2, while another monitors a proxy agent's recorded observations. Those experiments must retain their own apparatus and denominators. In particular, periodically deciding whether to continue a task does not establish a fast protective-stop response. See the [foundation-model readiness comparison](/robot-foundation-models#model-evaluation-entry-points) before equating semantic reasoning, action generation and verified execution.

## Evidence boundary

This article analyzes Google DeepMind’s own release post, model cards, and safety report. The success rates are provider-reported results, not independent replications, and should not be transferred to other robots or task protocols. RoboSkin.ai did not test the models. No public source reviewed here establishes tactile input, model-weight access for the VLA, general commercial availability, or certified deployment safety.

## Sources

- [Google DeepMind: Gemini Robotics 2 brings whole body intelligence to robots](https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/)
- [Google DeepMind: Gemini Robotics ER 2 model card](https://deepmind.google/models/model-cards/gemini-robotics-er-2/)
- [Google DeepMind: Gemini Robotics On-Device 2 model card](https://deepmind.google/models/model-cards/gemini-robotics-on-device-2/)
- [Google DeepMind: Gemini Robotics 2 safety evaluations](https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf)

*Source and chart review updated November 4, 2026. The original July announcement and this article’s original publication date remain separate. No API, model or robot test was performed.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-08-21',
    updated: "2026-11-04",
    readTime: "7 min read",
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
      "Review LeRobot v0.6 rollout evidence, correction recording, version compatibility and model licensing; separate framework support from verified robot outcomes.",
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

The shared label needs qualification: “world model” is not one fixed architecture. For a useful comparison, record what the model predicts, whether prediction runs at test time, how actions condition the prediction, and whether the imagined state is evaluated against actual robot outcomes. The [robot world models guide](/robot-world-models) organizes those questions.

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

## Pin the recording mode before interpreting a rollout

The [v0.6.0 rollout configuration](https://github.com/huggingface/lerobot/blob/30da8e687a6dfc617fcd94afc367ac7071c376ce/src/lerobot/rollout/configs.py) makes a consequential distinction: DAgger defaults to recording correction windows, while the optional continuous mode also records autonomous behavior. A file called an episode can therefore be a correction segment rather than a complete task attempt. The [versioned deployment guide](https://huggingface.co/docs/lerobot/v0.6.0/inference) describes these separate modes; we inspected documentation and code, not hardware behavior.

| Evidence being retained | What it can answer | What requires a separate record |
| --- | --- | --- |
| Correction-only segment | What the operator demonstrated during that intervention | The preceding failed attempt, autonomous time and task outcome |
| Continuous autonomous and correction frames | When control changed and what was recorded around it | Whether the correction met an independently defined success rule |
| Reward-model score or generated annotation | What that estimator inferred from its inputs | Actual completion, contact state or an adjudicated label |
| Simulation evaluation | Performance under the selected environment and protocol | Real hardware transfer and the effects of calibration, delay or contact |

For a proposed evaluation, retain attempt IDs separately from file/segment IDs, identify intervention start and end, and record who or what determined completion. Otherwise a collection of useful corrections can be mistaken for autonomous successes. The intervention flag is provenance, not a success label. Selected highlights also omit whatever falls outside the saved interval.

Compatibility needs the same discipline. The release replaces GR00T N1.5 support with N1.7 and directs users retaining N1.5 to LeRobot v0.5.1. A framework version, model checkpoint and preprocessing configuration form a set; substituting one item is not a like-for-like rerun. Check camera keys, units, action convention, normalization, policy state reset and evaluation seeds before comparing outputs.

The inspected [code license](https://github.com/huggingface/lerobot/blob/30da8e687a6dfc617fcd94afc367ac7071c376ce/LICENSE) contains Apache-2.0 terms and third-party notices. It does not license every integrated checkpoint, dataset or simulator. Recording strategies also have upload behavior, so identify storage destination and authorization before executing them; optional cloud training is a separate service decision. No install, upload, paid compute or robot operation was performed for this review. The [foundation-model entry-point guide](/robot-foundation-models#model-evaluation-entry-points) separates framework availability from a usable policy and a validated application.

## Evidence boundary

This article summarizes Hugging Face’s official LeRobot v0.6.0 announcement and linked project repository. Model, dataset-loading, and benchmark claims are release-author claims unless a separate paper is named. RoboSkin.ai did not independently reproduce the six environments, speed measurements, model results, or hardware workflows. Availability may differ by model license, checkpoint, simulator dependency, and compute requirement.

## Sources

- [Hugging Face: LeRobot v0.6.0 — Imagine, Evaluate, Improve](https://huggingface.co/blog/lerobot-release-v060)
- [GitHub: huggingface/lerobot](https://github.com/huggingface/lerobot)

*Documentation and pinned-source review updated November 4, 2026. This remains an analysis of the July v0.6.0 release, not a claim that it is the latest version or a reproduced deployment.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-08-21',
    updated: "2026-11-04",
    readTime: "7 min read",
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
      "Review the NIST humanoid benchmark proposal, intervention reporting and comparison limits; distinguish task performance from application safety evidence.",
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

The November 4 review found that the public page still carries a May 15, 2026 update and describes the apparatus as under development with participation being sought from manufacturers, researchers, and test facilities. NIST said designs and 3D models would be published and results would be collected under agreed data-sharing arrangements, with aggregate results intended to characterize the state of the art.

The reviewed page does not establish that those planned artifacts or aggregate results are available; this review did not verify a final protocol or named-robot score release. It summarizes an official project page, not a final standard, peer-reviewed benchmark paper, or completed ranking. RoboSkin.ai has not participated in the protocol design or tested a humanoid on the apparatus.

## Define the comparison before collecting a score

A useful procurement question is not simply whether a humanoid can complete a course. It is whether a result describes the operating mode and conditions that a receiving team intends to evaluate. NIST's broader [robotics measurement program](https://www.nist.gov/el/robotics) connects application requirements to contextual performance metrics. The following is a proposed review record, not a published NIST scoring sheet.

| Proposed record field | Comparison error it prevents |
| --- | --- |
| Task, apparatus revision and environment | Treating different geometry or contact conditions as the same test |
| Robot, end effector, payload and software revision | Attributing an integration change solely to a model or sensor |
| Autonomy mode and operator assistance | Combining autonomous, remotely controlled and physically assisted runs |
| Attempt start, completion and interruption rules | Removing difficult attempts or resets from the denominator |
| Contacts, falls, recovery and task outcome | Treating successful completion as proof that every intermediate event was acceptable |
| Unattempted or unreported tasks | Converting missing evidence into either zero capability or an assumed pass |

For example, compare a remotely guided run with another remotely guided run under the same protocol; label a separate autonomous run separately. If touch is the research variable, retain the same task, command limits, success rule and intervention policy, and document what changes when the tactile pathway is disabled. A benchmark title cannot substitute for that experimental design.

NIST's [performance-standards talk description](https://www.nist.gov/video/how-performance-standards-can-pave-way-humanoid-adoption) connects repeated, explicitly defined outcomes to reliability assessment. That supports careful trial accounting; it does not turn a short run with no observed failures into a universal safety guarantee. The [safety evidence handoff](/robot-safety#safety-evidence-handoff) separates a capability result from a protective-function validation record.

## Source

- [NIST: Humanoid Robot Baseline Performance Benchmark](https://www.nist.gov/el/intelligent-systems-division-73500/humanoid-robot-baseline-performance-benchmark)

*Public-source review updated November 4, 2026. Original publication dates are retained. RoboSkin has not tested the benchmark or performed a conformity assessment.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-08-21',
    updated: "2026-11-04",
    readTime: "6 min read",
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
      "Map ISO 10218 robot and application scope, mobile-system gaps and evidence ownership; distinguish public standard summaries from validated safety functions.",
    excerpt:
      'ISO 10218-1:2025 addresses the industrial robot before system integration, while Part 2 addresses applications and robot cells; neither makes a sensor alone a certified safety system.',
    content: `# ISO 10218:2025 separates industrial robot design from application integration

**Public standard-scope guide — ISO 10218-1:2025 published February 2025**

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

This article is based on ISO’s public records for both parts, its robotics-sector overview and the separately linked personal-care/service-robot records. RoboSkin.ai did not access or reproduce the paid full text of ISO 10218-1:2025 or ISO 10218-2:2025. It does not give legal advice, certify a robot, or claim that robot skin satisfies any clause. The A3 article below is included as secondary industry context; ISO remains the primary source for the standard’s identity and public scope.

## Turn a component claim into an application evidence request

The public [Part 2 record](https://www.iso.org/standard/73934.html) covers integration and the application lifecycle, not just selection of an arm. Both parts also identify mobility-related hazards of robots on mobile platforms as outside their stated coverage. An industrial manipulator mounted on a mobile base therefore needs a separate scope review; citing the arm's standard does not settle the mobile system's hazards.

| Claim offered by a supplier | Additional evidence to request for the intended application |
| --- | --- |
| The arm follows a named standard | Exact edition, product configuration and boundaries of the documented claim |
| The skin detects contact | Covered locations, measured quantity, calibration and conditions of use |
| The system stops after detection | The defined protective function, complete signal path and application-specific validation record |
| A new cover or model is compatible | Change-impact assessment identifying which prior assumptions and evidence still apply |

This is an editorial evidence-request framework, not a clause checklist or a declaration that any specific device complies. The responsible integrator must connect the applicable requirements to the actual robot, tools, environment and operating modes. Keep detection delay, decision/communication delay and physical stopping response distinct; a sensor refresh specification alone cannot describe that entire path.

A different product category also requires a different source check. ISO's [published ISO 13482:2014 record](https://www.iso.org/standard/53820.html) concerns personal-care robots, while its [proposed successor](https://www.iso.org/standard/83498.html) is listed as a final draft under development in this review. Do not present that draft as an already published replacement or assume that either scope covers medical devices. The [robot safety evidence handoff](/robot-safety#safety-evidence-handoff) shows how to keep edition, claim owner, system boundary and unresolved evidence together.

## Sources

- [ISO: ISO 10218-1:2025 — Safety requirements for industrial robots](https://www.iso.org/standard/73933.html)
- [ISO: Robotics standards overview](https://www.iso.org/cms/live/live/en/sites/isoorg/home/sectors/engineering/robotics.html)
- [Association for Advancing Automation: updated ISO 10218 overview](https://www.automate.org/robotics/news/updated-iso-10218-major-advancements-in-industrial-robot-safety-standards-now-available)

*Public-source review updated November 4, 2026. Original publication dates are retained. RoboSkin has not tested the benchmark or performed a conformity assessment.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-08-21',
    updated: "2026-11-04",
    readTime: "6 min read",
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
    seoDescription: 'Compare yarn-layer trade-offs, junction stress, step response and robot reaction timing before evaluating a textile capacitive sensing surface.',
    excerpt:
      'A new textile capacitive robot-skin study shows that adding twisted-yarn layers improves pressure sensitivity and strength while shortening proximity range.',
    content: `# Twisted-yarn robot skin gains pressure sensitivity but loses proximity range

**Research news brief — August 18, 2026. Evidence reviewed November 3–4, 2026.**

A preprint submitted on August 14 tests how yarn architecture changes the behavior of textile capacitive sensors for robotic skin. The researchers built one-, two-, and four-layer structures from silver-coated yarns insulated with polydimethylsiloxane (PDMS), then compared pressure, proximity, mechanical, cyclic, thermal, and robot-integration behavior.

The most useful result is a design tradeoff. More twisted-yarn layers increased electrode overlap, pressure sensitivity, tensile strength, and elongation. The same change reduced the reported proximity range. A robot-skin designer therefore cannot assume that the architecture with the strongest contact signal is also the best non-contact sensor.

## What the researchers changed

The study holds the basic material system constant and changes the number of twisted yarn layers. The reported effective electrode-overlap area grows from 0.25 mm² in the one-layer structure to 1.0 mm² with two layers and 4.0 mm² with four layers. That makes the four-layer overlap 16 times the one-layer value. The overlap area describes the capacitive geometry; it is not the localized single-fiber area used to normalize the applied stress. Keep those denominators separate when comparing sensitivity. [Methods III-B–C](https://arxiv.org/html/2608.14406v1).

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

The researchers assembled a 4 × 4 textile matrix with an active area of about 30 × 30 mm² and roughly 10 mm spacing between sensing points. The matrix readout uses PSoC CapSense. A separate yarn-sensor integration on a Franka Emika Panda uses an FDC1004 converter and microcontroller; the paper describes different implementations rather than one identical acquisition chain for every result. Across its demonstrations the team shows:

- mapping touch across the textile array;
- triggering an evasive robot motion when proximity crossed a threshold; and
- distinguishing a rigid gear contact from a human hand using threshold-based safety logic.

The paper reports about 403 milliseconds of end-to-end reaction latency in the prototype. That value includes the demonstrated sensing and control path; it is not a universal response time for textile robot skin. The demonstrations use threshold rules rather than a learned tactile model, so this work belongs primarily to the robot-skin and signal-to-control layers—not yet to tactile foundation models.

### Compare the timing quantities before choosing a layer

| Quantity | What it describes | What it cannot establish alone |
| --- | --- | --- |
| Electrical excitation frequency | The capacitance measurement condition | How quickly a robot reacts |
| Step rise and recovery | A transient sensor response under the stated load | Full settling during each periodic cycle |
| Periodic modulation | Whether repeated loading produces a detectable signal | An independent settled measurement for every cycle |
| Robot reaction latency | The demonstrated acquisition-to-action path | The same latency on a different controller or mount |

For an integration trial, choose the required pre-contact distance and contact quantity separately. Keep the yarn configuration, mounting tension, converter settings, reference geometry and decision threshold with each run. Recheck both outputs after remounting; a stronger contact response should not silently relax the pre-contact requirement. This is a proposed evaluation procedure, not a test performed by RoboSkin.ai. The [calibration guide](/guides/tactile-sensor-calibration) helps define the reference, while the [ROS 2 pipeline review](/research/ros2-kilted-tactile-pipeline-2026) separates raw acquisition, processed outputs and action records.

## What this adds to the tactile intelligence stack

The study is valuable because it connects yarn geometry to two different sensing modes and then carries the design into a robot experiment. It makes the chain visible: textile architecture changes capacitance, capacitance produces pressure or proximity signals, and threshold logic turns those signals into robot behavior.

For the broader system context, start with the [robot skin definition](/robot-skin), compare the [humanoid robot skin stack](/humanoid-robot-skin), and see how measured touch becomes inference and action in the [tactile AI guide](/tactile-ai). The [flexible tactile sensor array guide](/guides/flexible-tactile-sensor-array) explains scaling, wiring, calibration, and coverage tradeoffs.

## Evidence limits

This review uses arXiv v1, whose manuscript states submission to IEEE Transactions on Instrumentation and Measurement. It does not verify a subsequent journal decision or a final journal version. The evidence comes from one research prototype and a small 4 × 4 matrix. The robot demonstrations show threshold-based behaviors, not learned generalization, certified safety, or whole-body humanoid deployment.

The study also does not establish manufacturing yield across large textile surfaces, repeatable performance over complex curvature, resistance to abrasion and contamination, or transfer across users and environmental conditions. Those questions remain necessary before treating the design as a deployable safety skin.

## Practical questions

- Does adding yarn layers improve every sensing mode? No. It improved the reported pressure sensitivity and mechanical strength but reduced proximity range.
- Is 5 Hz the same as a 200 ms response time? No. The paper reports detectable periodic response up to 5 Hz, while step rise and recovery were each about 0.9 seconds.
- Does the robot demo use tactile AI? It uses contact and proximity signals in a robot-control loop, but the demonstrated decision logic is threshold-based rather than a learned model.
- Is this full-body humanoid skin? No. The paper reports a small textile matrix and separate yarn-sensor robot demonstrations, not whole-body coverage.

## Source boundary

This brief summarizes the authors' arXiv preprint and adds RoboSkin.ai analysis. All measurements belong to the reported experimental setup. The cover image is an editorial illustration, not a paper figure. RoboSkin.ai is not affiliated with the authors, their institutions, arXiv, or IEEE.

## Source

- [arXiv: Effect of Twisted-Yarn Architecture on Pressure and Proximity Sensing Characteristics of Textile Capacitive Sensors for Robotic Skin](https://arxiv.org/abs/2608.14406)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-08-18',
    updated: '2026-11-04',
    readTime: '6 min read',
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
    seoTitle: 'EIT–Pneumatic Robot Skin: Localization and Force Limits',
    seoDescription: 'Separate the EIT testbed from chest integration, pad-level force from localization, and reported reconstruction speed from robot control.',
    excerpt:
      'A 2026 preprint combines electrical impedance tomography with pneumatic sensing to improve force reconstruction across a large-area humanoid robot skin.',
    content: `# Hybrid robot skin combines EIT location maps with pneumatic force sensing

**Research news brief — August 2026. Evidence reviewed November 3–4, 2026.**

The May 27, 2026 arXiv manuscript, whose metadata states acceptance to ICRA 2026, proposes a hybrid robotic skin that combines electrical impedance tomography (EIT) with pneumatic pressure sensing. EIT supplies spatial information about where contact changes the conductive surface; four sealed pneumatic pads supply a more stable estimate of net force. The authors use the two signals together to correct a known weakness of large-area EIT skin: sensitivity can vary with contact location.

## What the researchers built

Two configurations need to stay distinct. The indentation testbed is 200 × 200 mm with a 5 × 5 electrode arrangement. The chest-mounted version is 280 × 280 mm with 32 electrodes and four pneumatic pads; it reconstructs EIT images at 100 Hz using a precomputed matrix. The structures use 3D printing and conductive coatings, with separate electronics, pressure sensors and tubing. [Hardware III and Demonstration V](https://arxiv.org/html/2605.28468v1).

The processing path is deliberately modest. A Tikhonov-regularized inverse reconstruction produces the spatial EIT map. Each pneumatic pad is calibrated against ground-truth force. The pad signal then rescales the reconstructed conductivity image so the final map retains location cues while using the pneumatic estimate for force magnitude.

## Reported result

In load-cell indentation experiments, the paper reports that the coefficient of variation for sensitivity non-uniformity fell from 0.31 for the EIT-only baseline to 0.14 for the hybrid method. That is a reduction in variation within the authors' test protocol, not a universal accuracy claim.

| Reported item | Value | Why it matters |
| --- | --- | --- |
| Humanoid chest skin area | 280 × 280 mm | Demonstrates a body-scale patch rather than a fingertip-only sensor. |
| Chest-version EIT electrodes | 32 | Boundary measurements reconstruct contact over a continuous surface. |
| Pneumatic pads | 4 | Each pad contributes an independent net-force estimate. |
| EIT reconstruction rate | 100 Hz | Shows the reported visualization pipeline can run in real time. |
| Testbed sensitivity variation | 0.31 → 0.14 coefficient of variation | The hybrid calibration reduced location-dependent non-uniformity in the reported indentation test. |

## Why the two modalities complement each other

EIT can infer where conductivity changed across a flexible surface, but inverse reconstruction is sensitive to nonlinearity, fabrication variation, and the gap between simulation and the physical skin. Pneumatic sensing is mechanically simple and sensitive to total load, but one air chamber cannot determine where inside that chamber contact occurred.

The hybrid design assigns each modality the job it handles better. EIT preserves spatial structure. Air pressure anchors the force estimate. For whole-body robot skin, that division may be more practical than expecting one sensing mechanism to deliver coverage, localization, force accuracy, compliance, and simple fabrication by itself.

## Multi-contact evidence

The authors also pressed two locations sequentially on the same pneumatic pad. The pressure signal followed the sum of the contacts, while the EIT image retained spatial cues. This supports a limited conclusion: the pad can continue estimating aggregate load during more than one contact. It does not mean the pneumatic channel alone separates the force applied at each individual point.

### Keep localization, load and reconstruction quality separate

A proposed acceptance record should retain three outputs: the estimated contact region, the force summed within each pad and the reconstructed spatial distribution. Check each against its own reference. A visually sharper map need not have a better force estimate; a correct total load need not allocate that load correctly among several contacts.

For a repeatable comparison, record the pad geometry, electrode layout, forward mesh, reconstruction settings, pressure-force calibration and synchronized raw observations. Include interior, boundary and overlap conditions in the declared evaluation set. After changing the cover or pad assembly, recheck the relevant calibration instead of treating the previous map as a portable specification. These are editorial evaluation questions, not additional experiments reported by the authors.

The [sensor calibration guide](/guides/tactile-sensor-calibration) provides a place to define units and error references. The [3D-printed tactile sensor guide](/guides/3d-printed-tactile-sensors) separates printable structures from the remaining acquisition and integration work.

## What this does not prove yet

This review uses the arXiv v1 manuscript. Its metadata states ICRA 2026 acceptance; conference status does not establish independent replication or a product benchmark. The paper identifies lower sensitivity near overlap regions between pads; because the current fusion relies heavily on the pneumatic estimate, errors there can bias reconstruction. The humanoid demonstration shows sensing and logging, but it does not evaluate a closed-loop safety controller, long-duration abrasion, cleaning, field repair, temperature drift, or production lifetime.

Location-aware correction near pad overlaps, adaptive measurement patterns and continual learning are proposed follow-up directions in the Discussion. They should not be presented as validated features of the reported demonstration.

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
    updated: '2026-11-04',
    readTime: '5 min read',
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
      "A three-channel textile combines touch localization, pressure and wearable robot commands. Review the signal, power and six-class evaluation boundaries.",
    excerpt:
      'A Nano Energy paper reports a textile artificial skin that locates touch, measures pressure, and controls a robot arm with a three-channel architecture.',
    content: `# Self-powered textile artificial skin uses three channels for touch and robot control

**News brief — originally published July 27, 2026. Evidence and engineering interpretation reviewed November 4, 2026.**

A paper available online in Nano Energy on July 22 reports a textile-based artificial skin designed to reduce two practical burdens in wearable tactile interfaces: the number of signal channels and dependence on an external power source for touch localization. The research team combines triboelectric and resistive sensing in a fabric structure, then demonstrates the interface in robot-arm control and marine-debris classification.

## What the researchers reported

The textile artificial skin uses an S-shaped, series-connected triboelectric array above a resistive sensing layer. When a user touches the textile, voltage ratios measured at two terminal resistors identify the touch position. A third resistive channel measures contact pressure.

This division gives the system three signal channels for both spatial addressing and pressure sensing. The triboelectric layer generates its localization signal from mechanical interaction, while the carbon-nanotube and silicone resistive layer provides the pressure measurement.

The publisher describes a nylon textile structure and reports a 94.5% success rate for distinguishing six debris classes with deep learning. That is the authors’ reported aggregate, not RoboSkin.ai testing. The accessible abstract does not provide the evaluation denominator, train/test split or a field-deployment protocol; the number cannot establish end-to-end marine-cleanup performance or recognition of unfamiliar debris.

## From touch input to robot-arm commands

The artificial skin was worn as a human-robot interface rather than installed as full-body robot skin. Touch position mapped to three-axis motion and rotational commands for a robot arm. Pressure magnitude controlled how long a command was executed.

That distinction matters. The work demonstrates a soft, wearable controller that converts touch and pressure into robot actions. It does not demonstrate a robot whose entire surface is covered by the textile or a robot that autonomously interprets distributed contact over its body.

## Why this matters for artificial skin

Large tactile arrays often face a wiring problem: increasing the number of sensing locations can increase channel count, connectors, acquisition hardware, and failure points. The three-channel architecture is therefore interesting as a readout strategy, not only as a new material.

The research also connects sensing to an application loop. Position and pressure are not presented as isolated bench signals; they become commands for a robotic system. For wearable teleoperation, field robotics, and other human-robot interfaces, that system-level connection may be as important as peak sensor sensitivity.

## Three channels: separate the signal, estimate and command

Three acquisition channels are a wiring property, not three independent force taxels or a spatial-resolution specification. The [publisher’s abstract and highlights](https://www.sciencedirect.com/science/article/pii/S2211285526005379) describe two different transduction mechanisms. Follow each signal to its actual use before comparing this interface with a robot-mounted tactile array.

| Layer | What the paper reports | What an integration test would still need to establish |
| --- | --- | --- |
| Touch localization | A ratio of triboelectric signals at two terminal resistors identifies position | Position error across the worn surface, including repeat touches and changed mounting tension |
| Pressure observation | A separate carbon-nanotube/silicone resistive layer responds to contact pressure | Calibration, loading/unloading behavior and separation from bending or fabric stretch |
| Robot command | Position selects motion or rotation; pressure changes command duration | Command latency, stale-input handling and the behavior when a touch is lost or ambiguous |
| Debris classification | A learned six-class result in the authors’ experiment | Evaluation units, held-out objects, confusion between classes and failure handling outside that set |

The last column is a proposed evaluation plan, not a list of tests we performed or a claim that the authors omitted them from the full paper. Full methods were not available in this review. In particular, a robot moving in response to a human touch does not demonstrate feedback from contact between the robot and its environment.

For a wearable controller, first specify whether a sustained press should keep a command active, change its duration or stop it. Then record the textile signal, inferred input and outgoing command on a common timeline. Test this interface under the intended mounting and environmental conditions before treating its output as a calibrated control input. Separate sensing energy from the energy used by acquisition, communication and actuation. The [electronic-skin mechanism guide](/electronic-skin#measurement-chain) explains why the material’s electrical response and the final physical measurement require separate evidence.

## What this does not prove yet

The original July brief described an in-press pre-proof. The current publisher record identifies Nano Energy, volume 157, October 2026, article 112233. This is a bibliographic update to an existing study, not a newly discovered experiment. The 94.5% result belongs to the authors’ six-class debris experiment and should not be read as open-world recognition performance.

The term self-powered applies to the triboelectric sensing and addressing mechanism. It does not mean the robot arm, computing hardware, communications, or complete control system operates without external energy. The public report also does not establish long-term saltwater durability, field maintenance intervals, calibration stability, or performance after repeated damage.

## Where this fits next

The [flexible tactile sensor array guide](/guides/flexible-tactile-sensor-array) explains the trade-offs among taxel count, wiring, scan rate, calibration, and coverage. The [electronic skin overview](/e-skin) places textile and triboelectric approaches within the broader e-skin category. For deployment questions, compare the interface with the [robot hand tactile sensor guide](/applications/robot-hand-tactile-sensor) and the normalized records in the [RoboSkin Tactile Research Index](/research-index).

## Practical questions

- Why are three channels notable? They carry touch-location and pressure information without assigning one independent readout channel to every sensing position.
- Is the whole interface self-powered? No. The paper's self-powered claim concerns the triboelectric sensing mechanism, not every part of the robot-control stack.
- Is this full-body robot skin? No. The reported demonstration is a wearable textile human-robot interface.
- What should be tested next? Long-duration environmental exposure, calibration drift, latency, repeatability, scaling to more locations, and performance outside the six reported debris classes.

## Source boundary

This brief summarizes the publisher’s abstract, highlights and article metadata, rechecked November 4, 2026, and adds explicitly proposed RoboSkin.ai evaluation guidance. The publisher’s full methods were not accessible in this review; no fabric, robot-control interface or classifier was tested. The reported architecture and results belong to the cited study. The cover image is an editorial illustration, not a photograph or figure from the experiment. RoboSkin.ai is not affiliated with the authors or publisher.

## Source

- [Nano Energy: A Self-powered Minimal-Channel Addressable Textile-Based Artificial Skin for Wearable Human-Robot Interfaces](https://doi.org/10.1016/j.nanoen.2026.112233)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-07-27',
    updated: "2026-11-04",
    readTime: "5 min read",
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
    seoTitle: 'Underwater Self-Healing Skin: Recovery and Repair Limits',
    seoDescription: 'Distinguish electrical restoration, mechanical healing and post-repair calibration in the NUS underwater sensor study, with practical acceptance checks.',
    excerpt:
      'NUS researchers combined self-powered touch sensing, damage detection, and underwater self-repair in one electronic skin system for soft robotics and marine machines.',
    content: `# Underwater self-healing electronic skin combines touch, damage detection, and repair

**News brief - July 2026. Evidence reviewed November 3–4, 2026.**

NUS published its institutional report on July 17, 2026; the associated Advanced Materials paper was first published on April 18, 2026. The work describes a self-healing magnetoelectric sensory system that can sense touch and proximity, detect damage, and recover after damage in both air and water. The research targets a practical weakness in electronic skin: a soft sensor may perform well when new but lose value quickly if a puncture, cut, or harsh environment disables it.

## What the researchers reported

The system combines a damage-sensing layer with an electromagnetic sensing layer. Both use a stretchable, self-healing elastomer with liquid-metal conductors. The NUS team demonstrated the technology in a smart diving glove and in a robotic hand that grasped objects under water while monitoring damage.

The university reports that the material reached up to 92% elastic recovery. Under mild heating, it reached about 82% healing efficiency in air after seven days and nearly 100% under water after ten days. After needle punctures, the sensor recovered its original electrical performance within seconds; larger cuts required contact pressure and a longer healing period.

### What recovered, and under which conditions?

The paper defines mechanical healing efficiency as post-healing elongation divided by initial elongation. It is not the fraction of damaged robots repaired or a task-success rate. Electrical restoration after minor damage and recovery under substantial repeated deformation are also different endpoints: the authors describe a longer healing period for the latter. [Sections 2.2–2.3 and 4.4](https://advanced.onlinelibrary.wiley.com/doi/full/10.1002/adma.202523052).

| Evidence to request | Keep in the record | Decision it informs |
| --- | --- | --- |
| Electrical continuity | Damage type, signal baseline and recovery interval | Whether a readable electrical path has returned |
| Mechanical recovery | Original and healed reference, environment, temperature and duration | Whether the assembly tolerates the intended deformation |
| Measurement after repair | Calibration revision, reference inputs and residual error | Whether readings remain useful for the intended quantity |
| Task after repair | Eligible cases, interventions and repeated damage history | Whether the robot can resume the intended operation |

The last two rows are proposed integration checks, not additional results from this study. A maintenance decision should retain them separately rather than declare the whole assembly ready when one signal returns.

## Why this matters for robot skin

Robot skin is exposed by design. It sits on hands, grippers, arms, soft bodies, and contact surfaces where abrasion, cuts, moisture, and repeated deformation are normal operating conditions. That makes recovery behavior as important as initial sensitivity.

The research also connects three functions that are often evaluated separately: sensing the environment, detecting damage to the sensor itself, and restoring useful operation. For field robots, this could reduce the gap between a laboratory material sample and a maintainable sensing surface.

## What this does not prove yet

The work does not establish commercial readiness, indefinite underwater service, or suitability for every marine robot. In the robot-hand demonstration, severe damage could require manual intervention or replacement. The paper also examines proximity through relative motion of magnetic components; this is not evidence of universal obstacle detection. Self-powered transduction does not establish that processing, wireless transmission, indicators or robot actuation need no energy. [Sections 2.4–2.5](https://advanced.onlinelibrary.wiley.com/doi/full/10.1002/adma.202523052). The reported healing conditions and time scales also differ by damage type. Readers should separate rapid electrical recovery after a puncture from longer material healing after a severe cut.

## Where this fits next

Compare this result with the [single-material soft robotic skin research brief](/research/single-material-soft-robotic-skin-2025), which examines multimodal sensing and damage awareness across a flexible surface. The broader [e-skin guide](/e-skin) explains how electronic skin relates to robot skin, tactile sensing, and Physical AI.

For a repair decision, use the [calibration guide](/guides/tactile-sensor-calibration) to specify the post-repair reference and the [flexible array guide](/guides/flexible-tactile-sensor-array) to record mounting and service constraints. Keep a damaged component out of the intended task until its relevant acceptance conditions are met; the article supplies no universal threshold or certification.

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
    updated: '2026-11-04',
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
    seoDescription: "Inspect TouchWorld six-task results, cached subgoals and residual action timing; separate predictive contact metrics, physical success and release evidence.",
    id: 'touchworld-tactile-foundation-model-dexterous-manipulation-2026',
    title: 'TouchWorld separates tactile prediction from fast contact correction in robot manipulation',
    seoTitle: 'TouchWorld Tactile Foundation Model for Robot Manipulation',
    excerpt:
      'The TouchWorld preprint proposes a hierarchical tactile foundation model that combines contact prediction with fast feedback for dexterous, contact-rich robot tasks.',
    content: `# TouchWorld separates tactile prediction from fast contact correction in robot manipulation

**Research explanation — original July 2026 report; November 4 source review uses the July 9 v2 manuscript.**

TouchWorld is a July 2026 preprint that treats touch as both a prediction target and a fast feedback signal for dexterous robot manipulation. Its central idea is that high-level task reasoning and low-level contact correction should not be forced into one control loop running at one speed.

## What the preprint proposes

The system uses a hierarchy with vision-language subtask planning, tactile world-model prediction, visuo-tactile action generation, and a tactile-conditioned refinement policy. The high-level layer predicts executable subtasks and tactile subgoals. The lower-level policy uses recent tactile and proprioceptive feedback to correct local errors such as slip, misalignment, unstable grasping, or force mismatch.

The predictive component is first pretrained on [EgoTouch](/datasets#dataset-egotouch), a human bimanual dataset with synchronized egocentric and wrist video, hand pose, and wearable pressure maps, before robot-specific fine-tuning. The [TouchWorld model record](/robot-vla-models#model-touchworld) connects that training claim to its exact primary-source boundary; it does not imply that every module is trained on EgoTouch or that the hosted dataset upload is complete.

The paper also defines a [six-task real-robot evaluation protocol](/benchmarks#benchmark-touchworld-real-robot) with clean and human-perturbation settings. It reports 200 teleoperated training trajectories and 100 evaluation rollouts per task. This is an author-defined, single-platform protocol rather than an independent cross-model leaderboard.

Across six long-horizon, contact-rich manipulation tasks, the authors report 65.0% average success in the clean setting and 53.7% under human perturbations. Those results were 15.7 and 18.5 percentage points above the strongest baseline reported in the paper.

## Why this matters for tactile AI

Vision and language can describe a task and guide a hand toward an object, while contact observations can help resolve physical states that are ambiguous in images. Once a plug meets a socket, a cup begins to slip, or a soft object deforms, the controller needs evidence from the physical interaction itself.

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

This explanation reviews the arXiv v2 manuscript and official project, and adds clearly identified RoboSkin.ai integration analysis. The results have not been independently validated by RoboSkin.ai and should be interpreted within the authors' reported setup.

## Read the six tasks before using the average

The [July 9 v2 manuscript](https://arxiv.org/html/2607.07287v2) and [official project](https://phanes-lab.github.io/TouchWorld-website/) report the following percentages. These are the authors' results on their platform, not RoboSkin measurements or evidence about another hand.

| Task | Clean success (%) | Human-perturbation success (%) |
| --- | --- | --- |
| Water Flower | 72 | 60 |
| Tabletop Clearing | 76 | 62 |
| Cup Insertion | 66 | 52 |
| Power Plug Insertion | 45 | 35 |
| Pot Wiping | 70 | 57 |
| Tissue Pulling | 61 | 56 |
| Reported mean | 65.0 | 53.7 |

The paper states 100 evaluation rollouts per task, but does not clearly allocate that count between the two conditions. Do not infer 100 trials per condition or reconstruct a total denominator from the percentages. The reported mean differences from FTP-1 are percentage-point differences, not relative percentage improvements. The weaker insertion results also matter when choosing a target application.

Contact-prediction scores answer another question: temporal contact accuracy, contact IoU and volumetric IoU assess held-out subgoal predictions. They are not calibrated force errors, physical task success or evidence of safe contact. A receiving evaluation needs the contact threshold and aggregation rule before reproducing those metrics.

## Separate cached predictions from executed feedback

TouchWorld trains its planner, goal predictor, action policy and residual refiner in separate stages. The goal predictor is conditioned on observations and subtask context; its stated interface is not a simulator queried with arbitrary candidate actions. Goals are cached and refreshed when the task phase changes meaningfully, rather than regenerated at every low-level step. [Architecture and implementation](https://arxiv.org/html/2607.07287v2).

The nominal policy predicts 32-step chunks. The residual mechanism looks ahead over sixteen actions and commits four before refreshing. Its 58-dimensional correction subspace covers selected wrist and hand coordinates; it does not modify every entry in the nominal 120-dimensional action representation, which also contains reserved dimensions. These counts specify an interface, not a measured control frequency. The reviewed sources do not establish an end-to-end latency budget or a universal Hz rate for the complete hierarchy.

This distinction changes an integration test. Log observation age, cached-goal version, nominal chunk, residual update and actually committed commands on the same timeline. Evaluate failures when the goal or planner is unavailable separately from ordinary trials; an implemented fallback is not a quantified recovery guarantee. These are proposed checks, not tests performed here. The [tactile AI evidence chain](/tactile-ai#contact-evidence-chain) compares prediction, representation and action interfaces without turning their different metrics into a leaderboard.

## Human pretraining does not remove robot adaptation

EgoTouch pretraining applies to the predictive module, followed by robot-specific data and training. The shared pressure-map representation does not make human and robot sensing layouts interchangeable. The authors explicitly retain calibration, normalization and adaptation requirements when changing sensors or hand morphology.

The reviewed [TouchAnything repository](https://github.com/Jianyi2004/TouchAnything/tree/d74f9ef5c189a957b7ff72781a0c998e41b45a56) concerns a related data/prediction project, not a verified release of TouchWorld's complete controller. Its README still warns that the EgoTouch upload may be incomplete. Its MIT code license does not establish the dataset's or TouchWorld checkpoints' terms. This review did not download the dataset, verify complete checkpoint availability or execute either project.

## Source

- [arXiv: TouchWorld - A Predictive and Reactive Tactile Foundation Model for Dexterous Manipulation](https://arxiv.org/abs/2607.07287)
- [TouchWorld official project page](https://phanes-lab.github.io/TouchWorld-website/)
- [arXiv: TouchAnything and the EgoTouch dataset](https://arxiv.org/abs/2605.13083)
- [TouchAnything official repository and EgoTouch release notes](https://github.com/Jianyi2004/TouchAnything)
- [EgoTouch official Hugging Face repository](https://huggingface.co/datasets/zhouzhoujy/EgoTouch)

*Source review updated November 4, 2026. Original publication dates are retained. Research results are author-reported; RoboSkin has not run these systems or reproduced their experiments.*
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-07-20',
    updated: "2026-11-04",
    readTime: "6 min read",
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
    seoTitle: 'Mechanochromic Tactile Sensing: Colour and Calibration',
    seoDescription: 'Understand colour-changing tactile sensing, its evidence limits and the optical, calibration and timing checks needed before robot integration.',
    excerpt:
      'A Queen Mary-led mechanochromic sensor converts contact, strain, and pressure into visible color fields that a standard camera can observe in real time.',
    content: `# Color-changing tactile sensor turns robot contact into real-time pressure maps

**Historical news brief - July 2026. Evidence reviewed November 3–4, 2026.**

A colour-changing sensing material can make deformation visible to a camera. Turning that observation into a calibrated contact quantity remains a separate engineering question. This review explains the distinction using the July 3, 2026 paper and Queen Mary's institutional report, then provides an original evaluation plan for teams considering a camera-based sensing surface.

## What the researchers reported

The university describes a mechanochromic surface whose structural colour changes under mechanical interaction. A standard USB camera reads the resulting spatial patterns. The report presents this as a way to encode contact information in the material's optical response and reduce reconstruction complexity. Its real-time wording does not provide a numeric sensor-to-controller latency in the material reviewed here. [Queen Mary report](https://www.qmul.ac.uk/news/latest-news/2026/science-and-engineering/se/robots-can-now-see-touch-thanks-to-a-new-colour-changing-tactile-sensor.html).

The [paper's public PMC copy](https://pmc.ncbi.nlm.nih.gov/articles/PMC13330820/) adds a crucial distinction: direct colour visualization is not the same as a calibrated pressure estimate. The authors combine measured hue–strain behavior with finite-element modeling for strain maps. Their writing/drawing pressure test uses a 3 mm stylus, a selected layer-thickness ratio and a load-cell reference normalized by the stylus area. These conditions support a particular measurement, not a universal colour-to-force conversion.

The Discussion also identifies angle-dependent colour shifts: changing curvature or camera distance can affect calibration. Cyclic fatigue and possible hue–strain hysteresis remain future investigations. These source-specific limits make mounting, optical geometry and service checks relevant rather than optional assumptions. No full robot-loop latency or clinical validation is established by this review.

## Why this matters for robot skin

The integration question shifts from counting electrical channels to defining an optical measurement. The camera observes an image; a physical interpretation needs a reference and a known configuration. A visible colour difference alone does not identify whether a change arose from contact, material deformation or the acquisition conditions.

For a proposed evaluation, separate the stages below. This table is editorial guidance, not a reported experiment or an assertion that the prototype failed these checks.

| Stage | Record before comparing runs | Question to resolve |
| --- | --- | --- |
| Contact and material | Fixture, surface state, mounting and load reference | Which physical condition changed? |
| Optical acquisition | Camera position, lighting, exposure and colour settings | Are images comparable under the same acquisition setup? |
| Interpretation | Raw image, mapping method and calibration revision | Which quantity is estimated, in what units? |
| Decision | Consumer, threshold or model, timestamps and fallback | What action uses the estimate, and when? |

Preserve raw images alongside derived values. If the colour-to-quantity mapping changes later, the original observation helps distinguish a processing revision from a different contact. The [calibration guide](/guides/tactile-sensor-calibration) explains why an image baseline, geometric reconstruction and force reference answer different questions.

### A small evaluation that separates the causes

Start with a fixed optical setup and a declared mechanical reference. Repeat the same reference condition before changing the load or geometry. Then vary one acquisition condition while holding the mechanical reference fixed. This proposed comparison asks whether the output follows the intended input or an uncontrolled change; it supplies no result or universal acceptable tolerance.

Next, test the combinations that the intended task will produce. A mapping established under one contact shape or mounting condition should not silently become a specification for all surfaces. Keep repeated trials and held-out conditions separate, and retain examples where interpretation is uncertain.

Finally, time the complete observation-to-decision path. An image arriving quickly and an action occurring quickly are separate events. Record acquisition, processing and consumer timing with a defined clock relationship before making a controller-rate claim.

## What this does not prove yet

The institutional description does not establish service life, reliable performance after contamination or remounting, industrial availability, or suitability for medical use. Application possibilities in a university story are not clinical validation or a procurement specification.

Nor does simpler optical encoding remove the need for calibration, electronics, software or maintenance. Compare complete configurations against the same task and reference. Do not infer that every camera-based tactile sensor uses an equally costly reconstruction method, or that this route is universally faster or cheaper.

## Where this fits next

The [tactile sensing technology map](/technology) places optical encoding beside other sensing mechanisms. The [robot gripper tactile sensor guide](/applications/robot-gripper-tactile-sensor) connects the measurement to grasp stability and integration. For service planning, use the [optical sensor maintenance guide](/guides/optical-tactile-sensor-maintenance) to separate surface changes, imaging faults and calibration checks.

## Practical questions

- **Does a colour image directly give force?** A physical estimate needs an appropriate calibration and independent reference; visual contrast alone is not a force-accuracy claim.
- **Does real-time mean a verified robot-loop rate?** No complete numeric timing result was established in the source scope of this review.
- **What should a team request?** Raw and processed examples, calibration conditions, repeated and held-out measurements, acquisition settings and timing definitions.
- **What should happen after replacement?** Recheck the observation and mapping under the new assembly rather than assuming the previous calibration transfers unchanged.

## Source boundary

The mechanism and experimental conditions are attributed to Queen Mary's report and the paper's Results, Discussion and Methods, read through its public PMC copy. The direct publisher route was inaccessible; no access restriction was bypassed. The evaluation plan is RoboSkin.ai editorial analysis. We did not fabricate or operate the sensor, reproduce the paper, validate a clinical application or verify current product availability.

## Sources

- [Queen Mary University of London: Robots can now see touch through a color-changing tactile sensor](https://www.qmul.ac.uk/news/latest-news/2026/science-and-engineering/se/robots-can-now-see-touch-thanks-to-a-new-colour-changing-tactile-sensor.html)
- [Science Advances paper DOI](https://doi.org/10.1126/sciadv.aee5236)
- [Public PMC copy: High-resolution real-time mechanochromic tactile sensors](https://pmc.ncbi.nlm.nih.gov/articles/PMC13330820/)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-07-20',
    updated: '2026-11-04',
    readTime: '5 min read',
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
    seoTitle: 'Single-Pixel Tactile Skin: Readout and Reconstruction Limits',
    seoDescription: 'Separate single-output tactile acquisition, reconstructed maps, classification and robot control using the public SPTS preprint and an evaluation checklist.',
    excerpt:
      'A flexible 10 x 10 tactile array uses compressive sampling and one summed output channel to reduce wiring and readout demands for responsive robot skin.',
    content: `# Single-pixel tactile skin targets the wiring bottleneck in large-area robot touch

**Historical news brief - July 2026. Evidence reviewed November 3–4, 2026.**

Single-Pixel Tactile Skin uses a shared output to reconstruct observations from many sensing locations. “Single pixel” names the readout approach, not a skin containing one physical contact element. Its effective reconstruction rate should also remain separate from the time needed to make and execute a robot decision.

## What the paper reported

The public [November 21, 2025 preprint](https://arxiv.org/abs/2511.16898) describes a 10 × 10 resistive array with per-cell weighting electronics, shared control/clock lines and a summed analog output. A learned tactile dictionary supports reconstruction from successive measurements. The publisher route is retained below, but its current full text was inaccessible in this review; the detailed checks here refer to the author preprint, not an assumed identical journal version.

The preprint evaluates 17 objects with 10 indentations each. It reports at least 98% classification accuracy at 20 measurements and an effective 3,500 FPS. A separate impact experiment uses 25 measurements per reconstruction and reports approximately 23 frames during an 8 ms bounce. These are author results with different measurement settings, not one combined operating specification. The methods also describe overlapping classification windows and voting; reconstructed frames are not automatically independent trials. [Preprint Results and Methods](https://arxiv.org/pdf/2511.16898).

## Why this matters for robot skin

The design moves part of the information-selection problem into acquisition. That makes the evaluation question more specific than “how fast is the sensor?” A team needs to know how much observation is collected, how reconstruction uses it, and when a sufficiently reliable result becomes available for its task.

| Stage | Quantity to report | Boundary to preserve |
| --- | --- | --- |
| Acquire projections | Number and timing of measurements | One summed value is not a complete spatial map |
| Reconstruct contact | Settings, retained observations and reconstruction time | An effective frame rate is not full controller latency |
| Classify or localize | Task, reference, evaluation unit and decision time | A class label and contact-location error are different metrics |
| Act on the result | Consumer, action timing and physical outcome | A sensing experiment is not a closed-loop task-success result |

This is an editorial reporting framework. It does not add timing measurements to the paper. The [ROS 2 tactile data pipeline](/research/ros2-kilted-tactile-pipeline-2026) explains how raw, processed and decision records can retain their identities through a software system.

### Choose the measurement budget for the decision

Suppose an integration team first needs approximate contact location, then a more detailed shape estimate. It can evaluate those as separate decisions, each with its own reference and acceptable uncertainty. An early estimate should not inherit the quality of a later reconstruction that used more evidence.

Keep the selected measurement budget, reconstruction revision and input interval with each output. When comparing two settings, hold the physical task and outcome definition constant. Record incomplete, uncertain and incorrect outputs as well as successful ones. This proposed procedure prevents a comparison from silently changing both the evidence available and the task being scored.

## What this does not prove yet

The study does not establish a universally sufficient number of measurements for arbitrary contact patterns. A useful adoption check would include unfamiliar objects, changed mounting and simultaneous contacts under a declared evaluation split. These are proposed tests, not failures observed by RoboSkin.ai.

Shared readout also does not mean electronics or wiring disappear. An integration plan still needs power, configuration, synchronization and diagnosis. Ask how a team would distinguish a changed sensing element from a shared acquisition or reconstruction problem, and what calibration evidence remains valid after service.

Do not compare reconstructed contact support with force accuracy. The former concerns where contact is identified; the latter requires a physical reference, units and an error definition. The [calibration guide](/guides/tactile-sensor-calibration) helps make that distinction explicit.

## Where this fits next

The [robot skin definition guide](/robot-skin) explains why coverage matters. The [flexible array guide](/guides/flexible-tactile-sensor-array) addresses installed geometry and integration. For a different readout design, the [OpenTac interpretation](/research/opentac-custom-tactile-skins-readout-limits-2026) distinguishes partial sampling from full-array acquisition; the two methods should not be ranked by an unqualified maximum-rate figure.

## Practical questions

- **Is there only one sensing location?** No. The shared output carries information from an array.
- **Is 3,500 FPS a robot control rate?** No complete sensing-to-actuation rate follows from the quoted effective reconstruction figure.
- **Can a few measurements always replace a full scan?** Choose and validate the budget for the observation and task; do not assume one setting transfers to all contacts.
- **What should a reproducibility record contain?** Source version, array configuration, raw measurements, reconstruction settings, evaluation split, timing definitions and failure cases.

## Source boundary

RoboSkin.ai read the public preprint's results and methods. We did not operate the sensor, run its reconstruction code, download a dataset or verify current code/data licensing. The publisher's present version status was not established, so the earlier statement describing it as an unedited early article is not repeated as a current fact.

## Sources

- [Communications Engineering: Single-Pixel Tactile Skin via compressive sampling](https://www.nature.com/articles/s44172-026-00697-2)
- [arXiv preprint: Single-Pixel Tactile Skin via Compressive Sampling](https://arxiv.org/abs/2511.16898)
- [Public author preprint PDF](https://arxiv.org/pdf/2511.16898)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-07-20',
    updated: '2026-11-04',
    readTime: '4 min read',
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
    seoTitle: 'IFR 2024 Robot Sales: Logistics and Tactile Adoption Limits',
    seoDescription: 'What IFR 2024 service robot data and Amazon Vulcan show about contact sensing, item eligibility and logistics pilot evaluation.',
    excerpt:
      'IFR sample data shows professional service robot sales reached almost 200,000 units in 2024, while Amazon Vulcan shows why contact sensing and tactile control matter in logistics.',
    content: `# Service robot sales reached almost 200,000 units: logistics makes tactile AI practical

**Historical news brief - June 2026. Evidence reviewed November 3, 2026.**

The near-200,000 figure describes professional service robot sales in IFR's 2024 supplier sample. It is not a count of tactile robots or a current estimate of the market for electronic skin. For a logistics team, the useful question is narrower: which handling steps require contact information that its existing vision and motion systems do not provide?

## Source findings

IFR's October 7, 2025 release states that professional service robot sales reached almost 200,000 units in 2024, with 102,900 in transportation and logistics. That category consists mainly of mobile robots transporting and handling goods. These are sample data from 294 suppliers, not projected to the whole industry. The figures should not be compared directly across annual reports because the sample changes. These are historical report figures, not a November 2026 market update. [IFR release](https://ifr.org/ifr-press-releases/news/service-robots-see-global-growth-boom).

Amazon's May 9, 2025 technical account describes a separate system: Vulcan uses force/torque sensing at its end-of-arm tools alongside vision to interact with crowded fabric storage pods. Its pick workflow checks eligibility, monitors extraction and can pass difficult cases to a human. That is evidence about one company's manipulation design, not the sensing architecture of the IFR population. [Amazon Science](https://www.amazon.science/blog/how-amazons-vulcan-robots-use-touch-to-plan-and-execute-motions).

Amazon's product story describes different pick and stow tools and advertises handling approximately 75% of the item types it stores. That describes item coverage in Amazon's account; it is not a 75% task-success rate, a result for arbitrary warehouses or an independent RoboSkin test. [Amazon's Vulcan description](https://www.aboutamazon.com/news/operations/amazon-vulcan-robot-pick-stow-touch).

## RoboSkin analysis

Keep three decisions separate: moving goods through a facility, manipulating an individual item and interpreting contact during that manipulation. A mobile transport installation may create no requirement for a tactile gripper. A picking station may benefit from force feedback without needing a distributed skin array. A hand manipulating a fragile or shifting object may need information about where contact occurs as well as the resultant load.

This distinction changes the adoption question. Start with the failed operation and the missing observation, then choose the measurement. Do not start with the market total and infer a sensor purchase. The [tactile manipulation guide](/tactile-manipulation) explains the path from observation to controller action; the [sensor selection guide](/guides/how-to-choose-a-tactile-sensor) helps compare the required outputs.

| Proposed operation | Question for the team | Evidence to collect |
| --- | --- | --- |
| Move a loaded tote | Is the problem navigation, payload stability or item contact? | Failure records that separate those causes |
| Insert an item into a crowded bin | Which contacts are intended, and which require retreat? | Synchronized pose, contact observation and action traces |
| Extract a selected item | Did the robot take the correct item without disturbing another? | Independent outcome labels and recovery records |
| Handle an out-of-scope item | Can the system identify its limit and complete a handoff? | Eligibility rule, escalation event and final disposition |

This table is an editorial evaluation framework. It does not describe new measurements of Vulcan or prescribe a universal warehouse design.

## Engineering implications

Define the denominator before comparing a pilot. Report all presented cases, the cases judged eligible, attempted operations, completed operations, damage events and human interventions separately. A system can improve success among attempted cases simply by rejecting more difficult cases. That may be a useful operating choice, but its coverage and labor consequences should remain visible.

Retain the exact observation-to-action sequence for failures. A force threshold recorded after an item is damaged does not demonstrate timely prevention. Separate acquisition time, processing delay, controller response and physical recovery. The [calibration guide](/guides/tactile-sensor-calibration) provides a place to define the force reference and coordinate frame rather than treating a raw channel as a calibrated load.

Include service conditions in the pilot: changed packaging, contaminated contact surfaces, tool replacement and recalibration. Compare performance under those declared conditions rather than extrapolating a clean demonstration to continuous operation. No specific uptime, return on investment or safety certification follows from the sources cited here.

## What the sources do not prove

IFR's sampled sales total does not measure tactile-sensor penetration, installed robotic skin area or the addressable market for a particular product. Amazon's account does not establish a universal best sensor, an open implementation or a transferable success rate for another warehouse.

The practical conclusion is to identify a contact-dependent failure and test a bounded intervention. Preserve the eligibility and handoff policy alongside the success metric. RoboSkin.ai reviewed public sources; it did not operate Vulcan, inspect Amazon's internal logs or conduct a logistics pilot.

## Sources

- [IFR: Service robots see global growth boom](https://ifr.org/ifr-press-releases/news/service-robots-see-global-growth-boom)
- [Amazon: Vulcan robot uses touch for picking and stowing](https://www.aboutamazon.com/news/operations/amazon-vulcan-robot-pick-stow-touch)
- [Amazon Science: How Vulcan robots use touch](https://www.amazon.science/blog/how-amazons-vulcan-robots-use-touch-to-plan-and-execute-motions)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-06-22',
    updated: '2026-11-03',
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
    seoDescription: 'Use a 2025 Cambridge-UCL skin study to separate material response, contact estimation and robot control, with evidence limits and integration checks.',
    excerpt:
      'A joint Cambridge-UCL study shows that large-area e-skin progress depends on sensing, wiring, calibration, damage tolerance, and control integration working together.',
    content: `# Electronic skin research is becoming a robot skin systems problem

**Historical news brief - June 2026. Evidence reviewed November 3, 2026.**

An electronic skin can produce a recognizable response in a material experiment without providing a calibrated, timely observation for a robot controller. The engineering work lies in the connections between those stages. This article uses a 2025 joint Cambridge-UCL study as a bounded example, then sets out an editorial framework for evaluating that transition.

## Source findings

UCL's June 12, 2025 report describes a conductive gelatin-based hydrogel cast into a hand shape, with 32 electrodes at the wrist. The team varied electrode configurations and used physical stimuli to train a model to distinguish contact types. UCL describes more than 860,000 pathways and more than 1.7 million pieces of information; these are not counts of discrete, independently calibrated taxels placed across a robot hand. The report also says durability improvements and further real-world robot-task tests remain future work. [UCL research report](https://www.ucl.ac.uk/news/2025/jun/improved-electronic-skin-gives-robots-human-touch).

This review could reread the UCL account, but not the complete publisher methods through the available access route. It therefore does not derive a new scan rate, accuracy specification or service lifetime from the institutional summary. The existing [single-material skin interpretation](/research/single-material-soft-robotic-skin-2025) treats electrode configurations, measurement channels and scan modes in greater detail; its numerical method claims should be read with their cited evidence scope.

The third source below concerns a separate 2026 Cambridge-only graphene/liquid-metal 3D-force study included as contextual reading. It was reported in March 2026 and is not evidence for the 2025 joint Cambridge-UCL hydrogel study. Keeping those identities separate prevents a later result from being silently assigned to an earlier design.

## RoboSkin analysis

Treat the sensing system as a chain of transformations. An electrical change becomes a recorded observation; a model maps that observation to an estimate; a controller uses the estimate for a decision. Each transition needs a definition of what is preserved and what may be lost.

| Stage | Question to resolve | Example of an unsupported shortcut |
| --- | --- | --- |
| Material response | Which physical inputs affect the signal? | Calling every signal change a force measurement |
| Acquisition | Which configuration, reference and timestamp produced the sample? | Treating sequential scans as simultaneous contacts |
| Estimation | Which labels and held-out conditions validate the output? | Extending stimulus classification to calibrated magnitude |
| Control | Which decision uses the output, with what delay and fallback? | Calling offline recognition closed-loop robot control |
| Service | What changes after damage, replacement or remounting? | Treating continued response as unchanged calibration |

These are proposed review questions, not additional reported experiments. A team can use them to identify the next missing piece of evidence without declaring an entire material route ready or unsuitable.

## Engineering implications

Begin with one decision the robot needs to make. For example, detecting that contact happened is different from estimating its location, measuring load or determining whether an object is slipping. Assign a reference and an acceptance criterion to that decision. The [technology overview](/technology) distinguishes sensing mechanisms; the [calibration guide](/guides/tactile-sensor-calibration) helps specify the relation between a raw observation and a physical estimate.

Next, define the transfer conditions. A model trained on one material sample and fixture may need a new check after changes in shape, mounting, temperature or electronics. Keep sensor identity, geometry, reference inputs and model revision together. Otherwise a changed baseline can be mistaken for a changed contact.

Finally, connect the observation to a replayable action record. Include rejected or uncertain estimates rather than saving only clean successful examples. A controller that can ignore an unreliable channel under declared conditions is a different system from one that assumes every sample is valid. The [tactile manipulation guide](/tactile-manipulation) provides the wider control context.

## What the sources do not prove

The UCL account does not establish a purchasable skin system, a validated maintenance interval, clinical benefit or a universal human-equivalent sense of touch. Demonstrating several stimulus responses also does not prove that all can be separated simultaneously under arbitrary combinations.

For procurement or replication planning, request the acquisition configuration, calibration and evaluation split, tested geometries, timing boundaries and post-service checks. Missing evidence should remain a named question. RoboSkin.ai did not fabricate the material, run a classifier or test robot behavior in this review.

## Sources

- [University of Cambridge: Robotic skin gives robots a human-like sense of touch](https://www.cam.ac.uk/stories/robotic-skin)
- [UCL: Improved electronic skin gives robots a human touch](https://www.ucl.ac.uk/news/2025/jun/improved-electronic-skin-gives-robots-human-touch)
- [Cambridge Engineering: 2026 graphene/liquid-metal 3D-force study (contextual reading)](https://elec.eng.cam.ac.uk/news/cambridge-research-breakthrough-gives-robots-a-human-like-sense-of-touch/)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-06-22',
    updated: '2026-11-03',
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
    seoTitle: 'Full-Hand Tactile Sensing: Coverage, Pixels and Control',
    seoDescription: 'Compare F-TAC Hand, Sparsh and Digit 360 by coverage, pixel scale and evaluation scope, without confusing optical sensing with force accuracy.',
    excerpt:
      'A historical comparison of F-TAC Hand, Sparsh and Digit 360 separates coverage, visual sampling and task evidence for robot hand integrators.',
    content: `# Full-hand tactile sensing moves robot hands beyond vision-only control

**Historical news brief - June 2026. Evidence reviewed November 3, 2026.**

Distributed touch can expose contacts at the palm and sides of fingers that fingertip-only sensing does not directly observe. The useful comparison is what those observations allow a controller to do. A sensor count, image scale and benchmark score answer different parts of that question.

## Key data points

The F-TAC Hand paper was published on June 9, 2025. It describes 17 vision-based tactile sensors, approximately 70% hand-surface coverage and a calibrated visual scale of 0.1 mm per pixel. Its manipulation evaluation includes 600 trials across 60 object combinations. These are author-reported results from the study configuration; they do not establish complete surface coverage, a universal success rate or force-measurement accuracy. [Nature Machine Intelligence paper](https://www.nature.com/articles/s42256-025-01053-3).

Meta's October 31, 2024 announcement concerns separate projects. It describes Sparsh pretraining on more than 460,000 tactile images and a six-task benchmark. For Digit 360 it advertises over 18 sensing features, detection of forces as small as 1 mN and an optical field described as over 8 million taxels. Those are the publisher's terms and claims, not independently measured specifications or directly comparable counts of physical sensor modules. [Meta FAIR announcement](https://ai.meta.com/blog/fair-robotics-open-source/).

| Published quantity | What it describes | What it does not establish |
| --- | --- | --- |
| F-TAC Hand coverage | Active sensing area on the reported hand | Every task-relevant contact is observed |
| F-TAC Hand pixel scale | Spatial calibration of visual readout | Force accuracy or universal contact discrimination |
| F-TAC Hand trial count | Size of the reported manipulation evaluation | Independent environments or arbitrary-object performance |
| Sparsh image count | Pretraining material | Number of robot-action demonstrations |
| Digit 360 optical taxels | An optical sensing description in Meta's announcement | That many separate calibrated force cells |

## RoboSkin analysis

These projects address different layers. F-TAC Hand integrates sensing with a hand and its behavior. Sparsh addresses representations learned from tactile images. Digit 360 addresses a multimodal fingertip; Digit Plexus is described as an integration platform. They should not be ranked on one density scale or treated as one experiment.

For an integrator, the important boundary is between available observations and observations actually used by the policy. More coverage can reveal a previously hidden contact, but it can also add acquisition, synchronization and processing work. Compare complete configurations under the same task instead of combining the best hardware number from one project with the best learning result from another.

## What this means for robot hands

Map contact over the whole manipulation sequence: approach, initial grasp, repositioning, recovery and release. Mark active areas, seams and blind regions at the relevant joint positions. Then identify which estimate each contact supports and which action can use it.

The [robot hand tactile sensor route](/applications/robot-hand-tactile-sensor) owns the general coverage decision. For paper-specific hardware and measurement boundaries, use the [F-TAC Hand interpretation](/research/full-hand-tactile-sensing-2025). This news page provides historical context across projects rather than another full hardware guide.

## What this does not prove yet

The phrase “vision-based tactile sensor” means that cameras can read deformation inside the contact sensor. It does not mean the robot must use an external scene camera, nor does it prove that scene vision is unnecessary. Removing a scene camera and removing all optical sensing are different claims.

Similarly, a force-detection threshold is not an accuracy bound, and a visual pixel scale is not a force threshold. A fair comparison names the reference, contact geometry, coordinate frame and error metric. The [calibration guide](/guides/tactile-sensor-calibration) develops that measurement record.

## Where this fits next

The [Dream-Tac tactile world model](/research/dream-tac-tactile-world-action-model-2026) interpretation distinguishes predictive outputs from policy and timing results. The [ROS 2 tactile data pipeline](/research/ros2-kilted-tactile-pipeline-2026) addresses a different requirement: observations must retain enough context to be synchronized and replayed. Neither linked article turns a hardware specification into a guaranteed task outcome.

## Practical questions

- **What is the task's missing observation?** Identify whether it is contact presence, location, direction, magnitude or motion before comparing density.
- **What is the evaluation unit?** Keep object combinations, repeated trials, images and training episodes separate.
- **What changes after service?** Record replacement, remounting and calibration changes before comparing a new run with the original result.
- **What happens when a channel is missing?** State whether the controller detects the condition and which fallback has actually been evaluated.

## What readers should take away

Choose coverage around the contacts and decisions that matter. A useful comparison record includes the installed configuration, observations consumed, timing boundaries, task denominator and failure cases. This is an editorial planning recommendation, not an additional F-TAC Hand or Meta experiment.

## Source boundary

RoboSkin.ai reviewed the F-TAC Hand publisher article and Meta's dated announcement. All performance statements remain attributed to those sources. We did not run the hardware, download models, verify current procurement or licensing, or establish a service-life or safety claim. Historical release plans are not presented as current availability.

## Sources

- [Nature Machine Intelligence: Embedding high-resolution touch across robotic hands](https://www.nature.com/articles/s42256-025-01053-3)
- [Meta FAIR: Advancing embodied AI through touch perception](https://ai.meta.com/blog/fair-robotics-open-source/)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-06-22',
    updated: '2026-11-03',
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
    seoTitle: 'IFR 2024 Industrial Robots: Installation and Tactile Limits',
    seoDescription: 'Read 542,000 industrial robot installations as historical market context, then define a task-level sensing trial without inferring tactile adoption.',
    excerpt:
      'Historical IFR installation data provides context for task-level sensing decisions; it does not measure tactile adoption or a market for robot skin.',
    content: `# Global robot installations passed 542,000 units: why Physical AI needs touch

**Historical news brief - June 2026. Evidence reviewed November 3–4, 2026.**

IFR's 542,000 figure counts industrial robots installed in 2024. It does not count tactile-equipped robots or establish demand for a particular skin technology. The practical question for an automation team is whether a specific operation lacks contact information, and whether a sensing change can improve that operation under its actual constraints.

## Key data points

The September 25, 2025 [IFR release](https://ifr.org/ifr-press-releases/news/global-robot-demand-in-factories-doubles-over-10-years) reports 542,000 new industrial installations in 2024 and an operational stock of 4.664 million. It describes 2024 as the second-highest installation year in its series. Asia accounted for 74% of new deployments, Europe 16% and the Americas 9%; China accounted for 295,000 installations, or 54%. These rounded shares need not sum to exactly 100%.

| Historical measure | Reported value | Correct comparison boundary |
| --- | --- | --- |
| New installations worldwide in 2024 | 542,000 | An annual flow, not the number of all robots in use |
| Operational industrial-robot stock in 2024 | 4.664 million | Installed population, not new purchases that year |
| Asia share of new deployments | 74% | Geographic share of installations, not tactile adoption |
| China installations | 295,000; 54% of global deployments | A market-specific count and share, not a sensor requirement |

The release's forecasts are dated expectations, not observed later outcomes. This article retains the original historical reporting period rather than presenting those numbers as a current November 2026 market estimate. The separate [service-robot logistics brief](/news/service-robots-200000-units-logistics-tactile-ai) covers a different reporting category and supplier-sample scope; do not add the two series into a tactile market total.

## RoboSkin analysis

An installed robot and an unmet sensing need are different units of analysis. A repetitive operation with controlled fixtures may already have adequate feedback. Another operation may lose useful information once a part contacts a gripper or tool. Start with that missing observation, not a market-size multiplier.

Consider a proposed insertion retrofit. A team should distinguish locating the part, detecting initial contact, estimating loading direction and recognizing a failed insertion. Those decisions may need different observations. A wrist force/torque measurement and a distributed contact map are not interchangeable, and adding both is not automatically justified. The [sensor selection guide](/guides/how-to-choose-a-tactile-sensor) helps connect the decision to an output and reference. The [electronic skin overview](/electronic-skin) separates sensing materials and surface coverage from the complete measurement and control system.

Use the following planning sequence before treating a large installed base as a business case:

1. **Name the failure.** Record the operation, part condition and consequence. Separate perception, fixture, actuator and contact-observation failures.
2. **Define the missing observation.** State which decision would change if the robot knew contact location, load, motion or another quantity.
3. **Check the integration path.** Identify mechanical space, acquisition, calibration, timestamping and the controller interface that would consume the signal.
4. **Choose a comparison.** Keep the task, eligibility rules and outcome definitions consistent when comparing configurations.
5. **Include service work.** Count remounting, replacement, recalibration and troubleshooting in the proposed operating process.

This is an editorial retrofit framework, not an IFR finding or a completed RoboSkin pilot. It makes the next evidence request specific without assuming that every industrial robot requires full-body skin.

### What would make a pilot result useful?

Keep both task outcomes and operating effort visible. A configuration that completes more eligible trials may also reject more incoming cases or require more maintenance. Record those changes rather than reporting only success among selected attempts. Define how retries and human interventions are counted before comparing results.

For example, a proposed trial record can contain the part/fixture condition, sensor and calibration revision, eligible/attempted/completed outcome, intervention reason and recovery time. These are suggested fields, with no measured value supplied here. The [tactile manipulation guide](/tactile-manipulation) connects observations to action; the [calibration guide](/guides/tactile-sensor-calibration) defines the measurement reference.

## What readers should take away

Use industrial-robot statistics for historical market context. Use task-level evidence to choose sensing. An annual installation count cannot answer which surface needs coverage, how much delay a controller can tolerate or whether a proposed retrofit pays for its maintenance.

The next useful document is a bounded evaluation plan: the operation, missing observation, comparison conditions, outcome denominator and service assumptions. If those are unknown, preserve them as questions rather than converting a large market figure into a capability or revenue claim.

## Source boundary

RoboSkin.ai reread IFR's public release and added original evaluation guidance. It did not produce the installation statistics, measure tactile adoption, run a factory pilot or calculate a return on investment. The release does not substantiate a general claim that industrial growth causes demand for a specific tactile product.

## Sources

- [IFR: World Robotics 2025 industrial robots report](https://ifr.org/ifr-press-releases/news/global-robot-demand-in-factories-doubles-over-10-years)
`,
    author: 'RoboSkin.ai Editorial Team',
    date: '2026-06-22',
    updated: '2026-11-04',
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
