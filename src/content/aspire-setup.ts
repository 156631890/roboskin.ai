import type { ProgrammingPage } from '@/content/programming-pages';

const revision = 'fa00f0ef2bc1d91d594b9aa502c22133c9f538f7';
const tree = `https://github.com/NVlabs/ASPIRE/blob/${revision}`;
export const aspireSetup: ProgrammingPage = {
  path: '/guides/aspire-libero-pro-setup',
  title: 'ASPIRE v1.0: LIBERO-Pro Setup and Evaluation Boundaries',
  h1: 'ASPIRE v1.0: Check the Host and Evaluation Before Running',
  description: 'Review ASPIRE LIBERO-Pro host requirements, gated SAM3 access, saved versus seeded evaluation, and the limits of structural checks and agent-generated code.',
  kicker: 'Simulation reproduction planning',
  intent: 'Plan a source-checked ASPIRE LIBERO-Pro reproduction without confusing setup validation, seed coverage or demos with measured task reliability.',
  published: '2026-10-17', updated: '2026-10-17', priority: 0.7, changeFrequency: 'monthly', schemaType: 'TechArticle', visualKey: 'resources',
  keywords: ['ASPIRE LIBERO Pro setup requirements', 'ASPIRE saved vs seeded evaluation', 'ASPIRE Codex Claude Code robot skills'],
  verification: 'Documentation inspection at commit fa00f0ef2bc1d91d594b9aa502c22133c9f538f7. RoboSkin.ai did not install or run ASPIRE, download gated weights, call a model API, accept dataset terms, or operate a robot. Proposed review steps are not completed experiments.',
  quickAnswer: ['ASPIRE v1.0 packages workflows for coding agents, but a usable skill file is only one part of a reproduction. Confirm the host, model access, simulator and evaluation state policy before authorizing a run. Treat author-reported success, structural validation and physical demonstrations as different kinds of evidence.'],
  sections: [
    {id: 'release', heading: 'A version update, not a first release or new paper', body: [
      'The ASPIRE v1.0 commit has a committer timestamp of October 16, 2026 at 03:57:48 UTC and an author timestamp on October 15. The original paper was submitted to arXiv on June 30, 2026. Use the fixed commit below when comparing setup instructions; do not describe this update as ASPIRE first becoming public.',
      'The versioned README packages iterative-debugging and evosearch skills for Codex and Claude Code, alongside simulation and real-robot recipes and demonstrations. Its 99% claim is author-reported benchmark evidence, not a RoboSkin experiment or a hardware reliability rate. Added demo material does not establish that a new independent physical validation occurred.'
    ], links: [{label: 'Versioned release commit', href: `https://github.com/NVlabs/ASPIRE/commit/${revision}`}, {label: 'Original paper and submission history', href: 'https://arxiv.org/abs/2607.00272'}]},
    {id: 'host', heading: 'Check the provider host before interpreting a bootstrap result', body: [
      'The host guide requires uv on PATH and a working NVIDIA driver. The base cuRobo bootstrap supplies an nvcc wheel, so its base path does not require a system CUDA toolkit. That statement does not extend to the BEHAVIOR runtime below.',
      'SAM3 weights are gated. Access approval and an authorized Hugging Face credential are separate prerequisites: a credential alone does not grant model access. A bootstrap can finish before model loading later fails with 401. We did not request access or download weights.'
    ], table: {headers: ['Readiness question', 'Evidence to retain before a trial'], rows: [
      ['Which host and GPU?', 'Operating system, GPU, driver and available resources; keep a dated inventory rather than assuming a laptop is sufficient.'],
      ['Which provider is blocked?', 'Distinguish package installation from permission to load the model; redact credentials from logs.'],
      ['Which runtime?', 'Identify LIBERO-Pro or BEHAVIOR explicitly before applying installation advice.']
    ]}, links: [{label: 'Pinned host requirements', href: `${tree}/docs/host-setup.md`}]},
    {id: 'libero', heading: 'LIBERO-Pro: preserve the runtime and check rendering', body: [
      'The LIBERO-Pro bootstrap initializes pinned submodules and a frozen .venv-libero environment. The guide discourages unpinned upgrades as an ad hoc repair. Offscreen rendering also requires libEGL.so.1; an NVIDIA driver alone is insufficient.',
      'EGL device selection ignores CUDA_VISIBLE_DEVICES. The guide uses MUJOCO_EGL_DEVICE_ID as well to select the rendering GPU. Resource contention can look like a depth or point-cloud failure, so record GPU placement before attributing every failure to the generated policy.'
    ], links: [{label: 'Pinned LIBERO-Pro setup and GPU selection', href: `${tree}/docs/libero-pro.md`}]},
    {id: 'behavior', heading: 'BEHAVIOR is a separate resource and terms decision', body: [
      'The host guide additionally lists Python 3.11, a CUDA 12.x toolkit, glibc 2.35+, NVIDIA Vulkan support, about 12 GB for the environment and 40 GB for data, and 32 GB RAM. A CUDA 13 toolkit alone is rejected for that path.',
      'The documented launch accepts the Omniverse EULA through OmniGibson; the dataset bootstrap requires explicit BEHAVIOR Data Bundle terms acceptance. Review those prerequisites before execution. The guide also warns that only one Isaac process can run at a time on its single-GPU bench. These are documented assumptions, not a universal performance guarantee.'
    ], links: [{label: 'BEHAVIOR-specific host prerequisites', href: `${tree}/docs/host-setup.md#behavior-1k-isaac-sim-hosts`}]},
    {id: 'evaluation', heading: 'Separate structural validation from task success', body: [
      'The LIBERO-Pro validation plans check resets, schemas, movement/hold ticks, close and resume behavior. Smoke uses seed 1; nightly uses seeds 1–3. These structural gates do not establish that manipulation tasks succeeded.',
      'Default saved initialization selects (seed - 1) % N from a finite state set, typically 50. Higher seed numbers can therefore repeat earlier states. Seeded initialization samples through the environment RNG without restoring a saved state afterward; constrained tasks can still repeat layouts. The guide warns that older buggy seeded runs restored saved state 0. Record init_mode and the actual state coverage, not just a large seed count.'
    ], table: {headers: ['Your proposed claim', 'What the evidence must establish'], rows: [
      ['The environment is usable', 'Which structural checks passed on which runtime; do not label them task-completion results.'],
      ['The program generalizes across layouts', 'Initialization mode, distinct initial states and held-out coverage; count repeated states explicitly.'],
      ['The method works on a robot', 'A separately authorized physical protocol, trial outcomes and interventions; simulation or a demo link cannot substitute.']
    ]}},
    {id: 'code', heading: 'Coding-agent skills and watchdogs are not a security boundary', body: [
      'The README states that generated Python has full import access. Trial processes and watchdogs are not a security sandbox. An agent skill packages instructions; it does not constrain everything imported code can read or execute.',
      'For a proposed simulation trial, define isolation, network access, allowed data and a stop condition before running generated programs. Keep simulation agents separated from physical hardware. Review the actual execution environment with its operator; this guide does not validate a sandbox or authorize a real-robot procedure.'
    ], links: [{label: 'Pinned README: coding-agent packaging and execution warning', href: `${tree}/README.md`}]},
    {id: 'record', heading: 'Write a reproduction manifest before spending compute', body: [
      'Our suggested manifest fixes the repository revision, runtime lock, task IDs, initialization mode, discovery seeds, held-out evaluation seeds and output directory. Also record the coding-agent version, selected model, permitted tools and approved budget. Fill these fields from the intended run; do not copy a headline result into an empty local results table.',
      'Keep failed installation, blocked model access, structural failure and unsuccessful manipulation as separate outcomes. Preserve the first generated program and its later revisions. If a program was selected after trying several candidates, state that selection procedure beside the final evaluation.',
      'A result summary should identify attempted tasks, completed tasks, resets, interventions and missing outputs. Compare like-for-like conditions before discussing improvements. We have no local success rate, runtime, cost or hardware result to report.'
    ]},
    {id: 'scope', heading: 'Compare the interface being adapted', body: [
      'ASPIRE organizes discoverable robot skills and executable programs. Our InterEvolve brief instead examines test-time reward-program search around a frozen humanoid controller. Both make program-level artifacts important, but their control interfaces and evaluation protocols are not interchangeable.',
      'Use this checklist to decide what must be verified before a simulation reproduction. For a research evidence review, share the exact paper or version and the unresolved claim; do not treat a setup document as a tactile sensor selection or hardware procurement recommendation.'
    ], contextLinks: [{before: 'Read the separate ', label: 'InterEvolve reward-program analysis', href: '/news/interevolve-reward-program-humanoid-manipulation', after: ' for the frozen-controller boundary.'}, {before: 'The ', label: 'Physical AI overview', href: '/physical-ai', after: ' places models, programs, control and measured feedback in the wider system.'}]}
  ],
  faqs: [
    {question: 'Does a passed setup check reproduce the reported 99%?', answer: 'No. Environment checks, benchmark task success and physical reliability need different evidence. The percentage is attributed to the authors; RoboSkin.ai has not reproduced it.'},
    {question: 'Do different seed numbers guarantee different initial scenes?', answer: 'No. Saved states can wrap, and procedural placement constraints can also produce repeated layouts. Retain the initialization mode and observed state coverage in the evaluation record.'}
  ],
  relatedLinks: [
    {label: 'Physical AI system boundaries', href: '/physical-ai', description: 'Separate reasoning, control, sensing and measured outcomes.'},
    {label: 'InterEvolve reward-program analysis', href: '/news/interevolve-reward-program-humanoid-manipulation', description: 'A different program interface around a frozen humanoid controller.'},
    {label: 'Robotics programming learning path', href: '/robotics-programming', description: 'Find the existing programming and data-processing resources.'},
    {label: 'Request a research evidence review', href: '/research-services', description: 'Bring a specific source, version and unresolved research question.'}
  ],
  sources: [
    {label: 'ASPIRE v1.0 commit; checked October 17, 2026', href: `https://github.com/NVlabs/ASPIRE/commit/${revision}`},
    {label: 'Versioned README, claims and code-execution boundary', href: `${tree}/README.md`},
    {label: 'Versioned host prerequisites', href: `${tree}/docs/host-setup.md`},
    {label: 'Versioned LIBERO-Pro setup and evaluation semantics', href: `${tree}/docs/libero-pro.md`},
    {label: 'ASPIRE paper and version history', href: 'https://arxiv.org/abs/2607.00272'}
  ]
};
