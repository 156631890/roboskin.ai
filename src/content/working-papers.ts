const releasePath = '/publications/interaction-as-the-interface/v0.2';

export const interactionPaper = {
  path: '/papers/interaction-as-the-interface',
  title: 'Interaction as the Interface',
  subtitle: 'A Belief-Space Framework for Generalist Embodied Intelligence',
  version: '0.2',
  date: '2026-09-27',
  displayDate: '27 September 2026',
  status: 'Research proposal',
  summary:
    'When should a robot gather more information before acting? An action–outcome interface, an analytical decision example, and a reproducible synthetic benchmark examine when a diagnostic action is worth its cost.',
  downloads: {
    pdf: `${releasePath}/interaction-as-the-interface-v0.2.pdf`,
    source: `${releasePath}/interaction-as-the-interface-v0.2.tex`,
    benchmark: `${releasePath}/roboskin-interaction-reproduction-v0.2.zip`,
    readme: `${releasePath}/README.md`,
    manifest: `${releasePath}/manifest.json`,
  },
} as const;

export const workingPaperEvidence = [
  {
    title: 'Analytical example',
    status: 'Derived and checked',
    text: 'The binary decision rule was checked against explicit outcome enumeration. It is a standard Bayesian information-value calculation.',
  },
  {
    title: 'Synthetic benchmark',
    status: 'Executed and reproduced',
    text: 'Parameters, seeds, code, and numerical outputs are available. A separate local rerun reproduced all five numerical CSV files.',
  },
  {
    title: 'Learning architecture',
    status: 'Proposed',
    text: 'The broader belief, prediction, and control interface has not been implemented or trained as a complete model.',
  },
  {
    title: 'Robot performance',
    status: 'Not evaluated',
    text: 'Physical-robot performance, cross-embodiment transfer, and emergent capabilities have not been demonstrated.',
  },
] as const;
