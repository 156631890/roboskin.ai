import type { SeoTopicPage } from '@/content/seo-topic-pages';

const etaPaper = 'https://arxiv.org/html/2610.27613v1';
const astraPaper = 'https://arxiv.org/html/2610.26846v1';
const etaCode = 'https://github.com/No-518/Tactile-ETA/tree/e7e5efbd42d3be7532ff5eb940a3cb015c2f7818';
const astraCode = 'https://github.com/ccyydd/TacTalent/tree/75441c18c3054b6032c4923f4047b9deaef26694';
const auditResource = '/resources/tactile-icl/v2026.10.28';

export const tactileIclComparisonPage: SeoTopicPage = {
  path: '/guides/tactile-in-context-learning-tactile-eta-vs-gpt-6-astra',
  title: 'Tactile In-Context Learning: Tactile-ETA and TacTalent',
  description: 'Compare two Astra tactile-control setups, separate simulation from small hardware trials, and reproduce an offline audit of 24 demonstration segments.',
  h1: 'Tactile In-Context Learning: Tactile-ETA and TacTalent’s GPT-6 Astra Setup',
  kicker: 'Research comparison / Context, control and evidence',
  intent: 'Compare two tactile in-context robot-control setups and design a matched test of demonstration frame selection.',
  published: '2026-10-22',
  updated: '2026-10-28',
  revisionNote: 'October 28, 2026: added a reproducible offline audit of two pinned Lift Bottle demonstrations, 24 action segments and 96 published image strips, plus a versioned experiment kit. Paper results retain the October 22 source review. RoboSkin has not run either controller or the proposed A/B/C task-success experiment.',
  priority: 0.8,
  changeFrequency: 'monthly',
  schemaType: 'TechArticle',
  visualKey: 'technology',
  keywords: ['tactile in-context learning', 'Tactile-ETA', 'GPT-6 Astra tactile control', 'TacTalent', 'tactile demonstration frame selection'],
  startHere: {
    heading: 'Compare the evidence or check the inputs',
    links: [
      { label: 'Compare methods and action interfaces', href: '#methods-and-interfaces', description: 'See what each setup receives, changes and executes.' },
      { label: 'Inspect the executed input audit', href: '#published-input-audit', description: 'Check observed counts, pixel agreement, source revisions and limits.' },
      { label: 'Plan a matched A/B/C experiment', href: '#matched-reproduction-plan', description: 'Download code, the report and blank outcome records.' },
    ],
  },
  quickAnswer: [
    'Tactile-ETA and TacTalent both use GPT-6 Astra, with different context and control designs. Tactile-ETA supplies action-aligned tactile demonstrations and robot tools to a frozen agent. TacTalent uses Astra with RoboICL to generate action sequences from scene images, tactile images and demonstration context. Compare these configured systems, not the model name alone.',
    'Tactile-ETA isolates the value of adding touch to the same two demonstrations: mean simulation success rises from 15.75% to 24.00% across four tasks. TacTalent reports 93.8% on UniVTAC and 81.8% on OpenViTac with vision and touch, under a different evaluation. These percentages do not establish a winner between the two setups.',
    'The hardware evidence is much smaller: Tactile-ETA reports 6/10 successes with one multimodal demonstration per task versus 0/10 without demonstrations, pooled across two tasks. Both conditions receive current touch. TacTalent reports simulation only. The next useful experiment is a matched comparison of endpoints, endpoints plus peak-change frames, and complete tactile sequences.',
    'RoboSkin independently checked the released inputs for two Lift Bottle episodes: 24 action segments, 96 image strips and 228 panels matched the raw data. This is an offline input audit, not a reproduction of robot success. The script, full report and experiment records are available below.',
  ],
  sections: [
    {
      id: 'methods-and-interfaces',
      heading: 'What is actually being compared?',
      body: [
        'In-context learning conditions a model through examples supplied at inference; it does not mean updating model weights. The useful comparison is between two ways to package experience and connect a general model to a robot. Neither study establishes that an unconfigured chat model can control arbitrary hardware.',
        'Tactile-ETA’s main configuration identifies gpt-6-astra with low reasoning effort. TacTalent’s method configuration identifies gpt-6-astra with xhigh effort. Shared model naming therefore does not imply matched inference settings, camera inputs, prompts, action budgets or execution code.',
      ],
      table: {
        headers: ['Dimension', 'Tactile-ETA', 'TacTalent: Astra direct tactile-image control'],
        rows: [
          ['Current inputs', 'In simulation: task text, head/wrist camera observations, bilateral touch, robot state and tool execution feedback. The hardware study uses wrist and third-person cameras.', 'Task text, configured scene cameras, end-effector/proprioceptive state and, in V+T mode, two fingertip tactile RGB images. Wrist-camera availability depends on the task.'],
          ['Demonstration format', 'Complete expert episodes split at action boundaries. Camera views, motion records and selected bilateral tactile observations cover the same interval.', 'Selected observation/action/receipt/result blocks from successful trajectories, plus bounded online interaction memory. Demonstration and online images share an input interface.'],
          ['Number of demonstrations', 'Main simulation: two complete expert episodes per task. Hardware: one recorded human demonstration per task.', '12 tasks: one trajectory with 12 blocks. Six class/selection tasks: two trajectories with five blocks each. Insert Block v2: three trajectories with five blocks each. A block is not a separate demonstration.'],
          ['Model updates', 'Frozen agent; adaptation through context, without task-specific parameter updates.', 'Inference with Astra, without task-specific policy training; demonstrations remain in context. This is the study’s setup, not an audit of closed model weights.'],
          ['Action interface', 'In simulation, tools such as observe and move_to; move_to specifies an end-effector target and optional gripper command for the underlying controller.', 'Ordered seven-dimensional commands: translation increment, rotation increment and gripper target. A benchmark adapter executes them and returns observations and a receipt.'],
          ['Where touch changes', 'The key controlled comparison adds historical touch to demonstrations while retaining current touch and the same execution interface.', 'Vision-only versus V+T removes/adds tactile images in both demonstration context and online observations. It does not isolate demonstration touch alone.'],
          ['Evidence scope', 'Four simulated tasks and a separate two-task hardware study.', '19 simulated tasks across UniVTAC and OpenViTac; physical-robot validation remains open.'],
        ],
      },
      links: [
        { label: 'Tactile-ETA v1 §3: context and robot tools', href: `${etaPaper}#S3` },
        { label: 'Tactile-ETA v1 Appendix F: simulation tool interface', href: `${etaPaper}#A6.T9` },
        { label: 'TacTalent v1 §3: observations, demonstrations and actions', href: `${astraPaper}#S3` },
        { label: 'TacTalent v1 Table 5: per-task demonstration counts', href: `${astraPaper}#A1.T5` },
        { label: 'Tactile-ETA pinned configuration and implementation', href: etaCode },
        { label: 'TacTalent pinned method configuration and implementation', href: astraCode },
      ],
      contextLinks: [{ before: 'For the distinction between training, demonstrations and execution feedback, see the ', label: 'robot learning guide', href: '/robot-learning', after: '.' }],
    },
    {
      id: 'eta-simulation',
      heading: 'Simulation: what Tactile-ETA’s controlled comparison shows',
      body: [
        'Table 1 of Tactile-ETA uses 100 rollouts per task and condition, with matched initial conditions. The comparison below keeps the same two expert demonstrations, current sensory inputs and execution interface. It changes whether tactile observations are included in those demonstrations. Both columns receive current vision and touch.',
        'The mean gain is 8.25 percentage points, not a uniform gain on every task: Lift Can changes from 3/100 to 2/100. The native Lift Can success predicate is a pose condition; it should not be reinterpreted as a separate test of stable suspended lifting.',
      ],
      table: {
        headers: ['Simulated task', 'Visual-motion demonstrations', 'Tactile-ETA demonstrations'],
        rows: [
          ['Insert Tube', '15/100 (15%)', '32/100 (32%)'],
          ['Lift Can', '3/100 (3%)', '2/100 (2%)'],
          ['Lift Bottle', '27/100 (27%)', '36/100 (36%)'],
          ['Pull Out Key', '18/100 (18%)', '26/100 (26%)'],
          ['Mean of four task rates', '15.75%', '24.00%'],
        ],
      },
      links: [
        { label: 'Source: Tactile-ETA v1 Table 1', href: `${etaPaper}#S4.T1` },
        { label: 'Native success predicates and evaluation boundaries', href: `${etaPaper}#A1.SS4` },
      ],
    },
    {
      id: 'astra-simulation',
      heading: 'Simulation: what the TacTalent Astra study reports',
      body: [
        'The separate Astra study evaluates eight UniVTAC tasks and eleven OpenViTac tasks. Each input setting has 210 sampled evaluation episodes: 80 on UniVTAC and 130 on OpenViTac. Most tasks have ten episodes; Insert Block v2 has thirty, covering three shapes. The table reports task-equal mean success, not a pooled 210-trial success rate.',
        'The vision-only condition omits tactile images from both demonstrations and online observations. V+T supplies them in both places. This comparison measures their combined contribution within this setup; it cannot identify how much comes from historical demonstrations versus current touch.',
      ],
      table: {
        headers: ['Simulation suite', 'Episodes per input setting', 'Vision only', 'Vision + touch'],
        rows: [
          ['UniVTAC, eight tasks', '80; ten per task', '76.3% task mean', '93.8% task mean'],
          ['OpenViTac, eleven tasks', '130; ten per task except thirty for Insert Block v2', '80.6% task mean', '81.8% task mean'],
        ],
      },
      subsections: [{
        heading: 'Why 93.8% versus 24.0% is not a method ranking',
        body: [
          'These papers do not run the two systems under one shared protocol. They differ in task coverage, sampled scenes, demonstration selection, camera configuration, reasoning effort, context management and action execution. TacTalent also documents a relaxed Grasp Chip success criterion. Even overlapping task names do not establish identical evaluation conditions.',
          'Most TacTalent task rates are based on ten episodes, so one outcome changes a task rate by ten percentage points. The paper calls for more scenes, sampling seeds and repeated executions. Its reported comparisons with specialist policies also use those policies’ published benchmark results; they are not a new matched rerun by RoboSkin.',
        ],
      }],
      links: [
        { label: 'TacTalent v1 Table 1: UniVTAC results', href: `${astraPaper}#S5.T1` },
        { label: 'TacTalent v1 Table 2: OpenViTac results', href: `${astraPaper}#S5.T2` },
        { label: 'Evaluation setup and small-sample limitations', href: `${astraPaper}#S4` },
        { label: 'TacTalent v1 §8: simulation and generalization limits', href: `${astraPaper}#S8` },
      ],
    },
    {
      id: 'physical-robot-evidence',
      heading: 'Real robots: ten trials per condition, across two tasks',
      body: [
        'Tactile-ETA’s hardware study uses a reBot Arm B601-RS, a vitai GF225 tactile gripper, an Orbbec wrist camera and a RealSense D435i third-person camera. Both conditions receive current vision, touch and robot state. The intervention is one whole multimodal human demonstration per task versus no demonstration, with fixed model parameters.',
        'The ten-trial headline means five Wipe Board trials plus five Pick Up Chips trials in each condition: twenty trials across both conditions. It does not mean ten trials per task. It also does not isolate tactile demonstration content from the visual and motion information added alongside it.',
      ],
      table: {
        headers: ['Physical task', 'No demonstration', 'One Tactile-ETA demonstration', 'Human-evaluated success'],
        rows: [
          ['Wipe Board', '0/5', '3/5', 'Target writing removed and eraser moved away to expose the cleaned region.'],
          ['Pick Up Chips', '0/5', '3/5', 'Chip lifted clear and held without visible breakage or dropping; support and its base remain on the table.'],
          ['Combined descriptive total', '0/10 (0%)', '6/10 (60%)', 'Two different tasks pooled; not a deployment reliability estimate.'],
          ['TacTalent Astra study', 'No physical trials reported', 'No physical trials reported', 'All reported evaluations are simulation.'],
        ],
      },
      subsections: [{
        heading: 'What the small sample cannot establish',
        body: [
          'One additional success or failure changes a five-trial task rate by twenty percentage points. These observations motivate larger, task-specific tests; they do not establish stable performance across objects, days, sensor wear, robots or operators. A 0/5 baseline does not establish that the baseline can never succeed.',
          'Keep this hardware evidence separate from both papers’ simulation tables. Neither reading public code nor watching a rollout video constitutes an independent control-performance reproduction. RoboSkin has performed only the separate offline input audit described below.',
        ],
      }],
      links: [
        { label: 'Tactile-ETA v1 Appendix E: hardware, five-trial counts and success criteria', href: `${etaPaper}#A5` },
        { label: 'TacTalent v1 §8: physical validation remains necessary', href: `${astraPaper}#S8` },
      ],
    },
    {
      id: 'tactile-frame-selection',
      heading: 'More tactile frames are not necessarily better',
      body: [
        'Tactile-ETA Table 3 changes only the tactile representation inside the same two Lift Bottle demonstrations. Action segments, visual observations, motion records and current sensing remain fixed. Every condition has 100 rollouts. “No demo tactile” still has current tactile sensing.',
        'The selected representation always keeps the action endpoints. When a change threshold is reached, it also retains the single adjacent-frame pair around the largest normalized bilateral change. Both fingertips use the same selected times; after deduplication, each fingertip has at most four observations per segment. This is more specific than selecting arbitrary interesting frames.',
      ],
      table: {
        headers: ['Historical tactile representation', 'Lift Bottle result', 'Scope of the observation'],
        rows: [
          ['No demonstration touch', '27/100 (27%)', 'Visual-motion demonstration baseline; online touch retained.'],
          ['Endpoints only', '27/100 (27%)', 'Beginning and end of each action segment.'],
          ['All frames', '2/100 (2%)', 'Dense historical tactile representation in this configuration.'],
          ['Endpoints + selected change pair', '36/100 (36%)', 'Action-aligned sparse representation used by Tactile-ETA.'],
        ],
      },
      subsections: [{
        heading: 'Engineering interpretation, rather than a universal law',
        body: [
          'Choose context around contact transitions and the action they explain. Preserve timing and left/right alignment, and measure how frame packaging changes image count, token use, delay and task outcomes. Keep the complete recorded sequence available for inspection even when the model receives a sparse view.',
          'This single-task result does not prove that dense touch always harms performance or that the selector transfers to every sensor. Redundancy, image scaling and context competition are possible explanations to test, not mechanisms established by the success table. The ablation concerns historical demonstration images; it is not a reason to reduce the sampling rate of a fast tactile controller.',
        ],
      }],
      links: [
        { label: 'Tactile-ETA v1 Table 3: the frame-representation ablation', href: `${etaPaper}#S4.T3` },
        { label: 'Tactile-ETA v1 §3.2: endpoint and change-pair selection', href: `${etaPaper}#S3.SS2` },
        { label: 'Appendix B: selector settings and tactile packaging', href: `${etaPaper}#A2` },
      ],
    },
    {
      id: 'published-input-audit',
      heading: 'Executed input audit: what the released Lift Bottle files contain',
      body: [
        'On October 28, 2026, RoboSkin ran an offline inspector on UniVTAC episodes 0 and 1 for Lift Bottle and Tactile-ETA’s corresponding published demonstration manifest and PNG strips. The source revisions are pinned: UniVTAC e1aee7b and Tactile-ETA e7e5efb. The two HDF5 files total 944,306,887 bytes; full revision IDs, exact file and script hashes, and the execution environment are in the report.',
        'The check decoded all 2,780 images in the head, wrist and bilateral tactile streams across 695 recorded rows. It matched 228 panels in all 96 released image strips pixel for pixel against the raw decoded images, excluding the 30-pixel label band. End-effector and joint states at segment boundaries matched the manifest. The published tactile selections were ordered, unique, within their action segments and shared across fingertips, with endpoints retained.',
      ],
      table: {
        headers: ['Observed or counted input', 'Result across two episodes', 'What this number means'],
        rows: [
          ['Raw episodes and action segments', '348 + 347 rows; 12 + 12 segments', 'Two source episodes, not 24 independent robot trials.'],
          ['A: segment endpoints', '48 appearances per fingertip', 'Counted from the raw segment boundaries; not submitted to a model.'],
          ['B: published selected observations', '66 appearances per fingertip', 'Released selections and image pixels checked; optical features and peak-selection algorithm not recomputed.'],
          ['C: all recorded segment observations', '717 appearances per fingertip', 'Includes 22 repeated boundary rows. There are 695 unique raw rows; C was not submitted to a model.'],
          ['Published visual/tactile strips', '96 strips; 228 panels matched', 'The report includes each strip hash so future conditions can share identical demonstration vision.'],
        ],
      },
      subsections: [{
        heading: 'A concrete segment and the audit’s limits',
        body: [
          'Episode 0, segment 1 spans recorded steps 110–238. The published tactile steps are [110, 234, 236, 238]; A/B/C contain 2/4/65 observations per fingertip. This is an input-packaging difference that can be inspected before purchasing model inference or running a robot.',
          'These are context appearances, not token counts, API image counts, latency measurements or success-rate improvements. Simulation steps are not measured wall-clock timestamps. The source episodes are labeled successful upstream; this check did not rerun a task success predicate. It ran no simulator, policy, online controller or physical hardware, and it does not establish full-dataset quality.',
          'Use the kit’s explicit download command to retrieve about 0.97 GB of pinned public inputs, then rerun offline. The ZIP contains RoboSkin’s code, report, hashes and templates; it does not redistribute the source datasets or images. Five synthetic rejection tests check the inspector’s behavior and do not add robot evidence.',
        ],
      }],
      links: [
        { label: 'Read the complete observed input-audit report (JSON)', href: `${auditResource}/input-audit.json` },
        { label: 'Download all 24 segment records and fixed vision hashes (CSV)', href: `${auditResource}/segment-audit.csv`, download: true },
        { label: 'Download the audit code and experiment kit (ZIP)', href: `${auditResource}/tactile-context-reproduction-kit.zip`, download: true },
        { label: 'Read the commands, scope and limitations', href: `${auditResource}/README.txt` },
        { label: 'Inspect the standalone audit code', href: `${auditResource}/inspect_release.py`, download: true },
        { label: 'Pinned upstream HDF5 inputs', href: 'https://huggingface.co/datasets/byml/UniVTAC/tree/e1aee7b0c95543b535e0146b2de3ee1bc6ddaabd/isaac51/lift_bottle/hdf5' },
        { label: 'Pinned upstream processed demonstration inputs', href: 'https://github.com/No-518/Tactile-ETA/tree/e7e5efbd42d3be7532ff5eb940a3cb015c2f7818/demonstrations/lift_bottle' },
      ],
    },
    {
      id: 'matched-reproduction-plan',
      heading: 'Next experiment: matched tasks, matched vision, three tactile contexts',
      body: [
        'This is a proposed RoboSkin evaluation protocol, not an experiment already run. Start with the published Lift Bottle task to check the reported ablation, then repeat on the other tasks before making a broader claim. First compare frame selection within one fixed controller setup; compare two controller stacks only in a separately documented study.',
        'Reuse the same two source demonstration episodes, action segmentation, visual images, robot-state records and action records. Keep the visual image bytes, resolution, camera views and ordering identical across conditions. Keep the online observation policy and tactile packaging fixed. Online trajectories can diverge after different actions, so actual later camera frames cannot be guaranteed identical in closed-loop trials.',
      ],
      table: {
        headers: ['Condition', 'Demonstration touch supplied to the model', 'What stays fixed'],
        rows: [
          ['A — endpoints', 'First and last tactile observation of every action segment.', 'Tasks, demonstration episodes, visual input construction, action segmentation and online sensing policy.'],
          ['B — endpoints + peak-change pair', 'A plus the adjacent pair at the largest bilateral normalized change when the pinned threshold is reached; deduplicate and retain time order.', 'The same inputs and settings as A; record selector revision and selected timestamps.'],
          ['C — full sequence', 'All recorded tactile frames in the same segment, in timestamp order.', 'The same visual images and controller; report changed image/token load and any resizing or context truncation.'],
        ],
      },
      bullets: [
        'Pin the simulator, task assets, success predicate, controller, model identifier, reasoning effort, prompts and API settings. For a historical reproduction, record any unavailable model snapshot or dependency instead of silently substituting it.',
        'Use the same evaluation scene/seed list for A, B and C, with separate rollouts and a randomized or counterbalanced run order. To reproduce Tactile-ETA’s reported table, plan 100 initial conditions per task and representation; additional repeats should follow a stated precision and compute budget.',
        'Predeclare timeouts, failure categories, intervention rules and how infrastructure failures are handled. Keep attempted trials in the ledger; report invalid runs and any rerun policy separately from robot failures.',
        'Keep common inference and action limits. Log image dimensions, actual tactile frame counts, prompt size, API time, executed actions and context overflow. If C exceeds the interface limit, record that limitation; a truncated sequence must not be labeled “all frames.”',
        'Report successes/attempts for every task and condition, uncertainty intervals and paired scene outcomes. Separate API errors, contact failures, invalid commands and task failures. Do not hide task differences inside a single average.',
        'For offline input comparisons, replay identical recorded observations to all variants. Label those results as offline action analysis, separate from closed-loop task success. For hardware follow-up, add per-task repetitions across sessions and preserve independent success assessment.',
      ],
      links: [
        { label: 'Download the dedicated A/B/C experiment kit', href: `${auditResource}/tactile-context-reproduction-kit.zip`, download: true },
        { label: 'Read the proposed configuration and unresolved settings (JSON)', href: `${auditResource}/experiment-config.json` },
        { label: 'Download the trial ledger with empty outcome fields (CSV)', href: `${auditResource}/trial-ledger.csv`, download: true },
      ],
      contextLinks: [{ before: 'For other contact-sensing experiments, the general ', label: 'tactile experiment worksheet', href: '/tactile-ai#experiment-worksheet', after: ' remains available. The dedicated kit above already includes task, scene, repetition, condition, model settings, image/token load, latency, outcome and failure fields. Its three example rows are planned runs with no observed outcomes.' }],
    },
    {
      id: 'source-and-reuse',
      heading: 'How to use and cite this comparison',
      body: [
        'Use this page to select a context representation and identify the controls missing from a fair experiment. Cite the original paper and its exact table for its success rates; cite this version for the cross-study interface comparison, offline input audit and proposed evaluation design. Both research sources are v1 preprints, so later revisions may change their claims. The claim ledger separates author-reported results, locally observed inputs and proposed experiments.',
        'The linked repositories were inspected at the revisions below on October 22, 2026. Source inspection establishes what the released materials describe; it does not establish a successful installation, controller execution, measured latency on your system or physical robot reproduction. The TacTalent results are the research authors’ evaluation, not an OpenAI robotics certification or benchmark guarantee.',
        'Neither a simulator’s controller frequency nor a stream’s sampling rate is the model’s decision frequency. Tactile-ETA makes decisions between motion segments; TacTalent executes generated action sequences through its adapter. Hardware integration still needs an appropriate controller, coordinate conventions, calibration and independently verified execution behavior.',
      ],
      links: [
        { label: 'Download a citation for this version (BibTeX; no DOI assigned)', href: `${auditResource}/citation.bib`, download: true },
        { label: 'Download the claim-to-source ledger (CSV)', href: `${auditResource}/claim-ledger.csv`, download: true },
        { label: 'Tactile-ETA source snapshot e7e5efb', href: etaCode },
        { label: 'TacTalent source snapshot 75441c1', href: astraCode },
        { label: 'How AI models connect to robot control and feedback', href: '/ai-robotics' },
        { label: 'Contact feedback in tactile manipulation', href: '/tactile-manipulation' },
      ],
    },
  ],
  faqs: [
    { question: 'Is Tactile-ETA an alternative model to GPT-6 Astra?', answer: 'No. Its main evaluated setup uses GPT-6 Astra as the frozen agent. This page compares Tactile-ETA’s context and tool design with the separate TacTalent study’s Astra/RoboICL control setup, not two independent model families.' },
    { question: 'Do the reported percentages show which setup is better?', answer: 'No. Task sets, cameras, demonstrations, reasoning effort, scene samples and execution interfaces differ. Tactile-ETA’s 15.75% to 24.00% result is a within-study demonstration-touch comparison; TacTalent’s 93.8% and 81.8% are separate simulation suite means.' },
    { question: 'What does Tactile-ETA’s ten-trial hardware result mean?', answer: 'Each condition has five Wipe Board and five Pick Up Chips trials. One multimodal demonstration per task yields 6/10 combined successes versus 0/10 without demonstrations. Both conditions have current touch. This small sample does not establish deployment reliability or isolate historical touch from the rest of the demonstration.' },
    { question: 'Should a robot agent always receive fewer tactile frames?', answer: 'No. Tactile-ETA reports 2/100 for all demonstration frames and 36/100 for its selected representation on Lift Bottle, under one fixed setup. Test endpoints, endpoints plus a peak-change pair and full sequences under matched conditions before generalizing.' },
  ],
  relatedLinks: [
    { label: 'Robot learning', href: '/robot-learning', description: 'Separate parameter training, context examples and current feedback.' },
    { label: 'AI and robotics', href: '/ai-robotics', description: 'Map the model, action interface, controller and physical feedback loop.' },
    { label: 'Tactile manipulation', href: '/tactile-manipulation', description: 'Connect contact observations to task-specific control decisions.' },
    { label: 'Tactile experiment worksheet', href: '/tactile-ai#experiment-worksheet', description: 'Record proposed settings and later observations without conflating them.' },
  ],
  sources: [
    { label: 'Wang et al.: Embodied Task Agents Can Perform Fine Manipulation through Tactile In-Context Learning, arXiv 2610.27613v1', href: etaPaper },
    { label: 'Yang et al.: GPT-6 Astra Is a Native Visuo-Tactile Policy for Contact-Rich Manipulation, arXiv 2610.26846v1', href: astraPaper },
    { label: 'Tactile-ETA official code, reviewed revision e7e5efb', href: etaCode },
    { label: 'TacTalent official code, reviewed revision 75441c1', href: astraCode },
  ],
};
