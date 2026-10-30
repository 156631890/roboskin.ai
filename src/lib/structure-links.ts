export type HubLink = { href: string; label: string };

export const homeTopicHubs = [
  { href: '/sensors', label: 'tactile sensing', description: '17 sensors with published specs' },
  { href: '/datasets', label: 'tactile datasets', description: '25 datasets by sensor type and task' },
  { href: '/robot-vla-models', label: 'VLA robotics', description: '11 models compared on touch input' },
  { href: '/robot-skin', label: 'robot skin', description: 'Materials, sensing and vendors' },
  { href: '/robot-grippers', label: 'robot gripper', description: 'Types, selection and vendors' },
  { href: '/humanoid-robot-companies', label: 'humanoid robot companies', description: 'Tracked companies and tactile approaches' },
];

export const relatedHubLinks: Record<string, HubLink[]> = {
  '/sensors': [{ href: '/datasets', label: 'tactile datasets' }, { href: '/benchmarks', label: 'tactile robotics benchmarks' }],
  '/datasets': [{ href: '/sensors', label: 'tactile sensing' }, { href: '/benchmarks', label: 'tactile robotics benchmarks' }],
  '/benchmarks': [{ href: '/sensors', label: 'tactile sensing' }, { href: '/datasets', label: 'tactile datasets' }],
  '/robot-vla-models': [{ href: '/robot-foundation-models', label: 'robot foundation model' }],
  '/robot-foundation-models': [{ href: '/datasets', label: 'tactile datasets' }],
  '/physical-ai-touch': [{ href: '/sensors', label: 'tactile sensing' }],
};

/** Rule order is intentional. An existing body link suppresses insertion, not priority. */
export function getArticleHubLink(content: string): HubLink | undefined {
  const rules = [
    { pattern: /\b(?:tactile sensors?|GelSight|DIGIT|TacTip)\b/i, href: '/sensors', label: 'tactile sensing' },
    { pattern: /\b(?:datasets?|LeRobot|Open X-Embodiment)\b/i, href: '/datasets', label: 'tactile datasets' },
    { pattern: /\b(?:VLA|vision-language-action)\b/i, href: '/robot-vla-models', label: 'VLA robotics' },
    { pattern: /\b(?:electronic skin|e-skin)\b/i, href: '/electronic-skin', label: 'electronic skin' },
  ];
  const prose = content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const rule = rules.find(({ pattern }) => pattern.test(prose));
  if (!rule) return undefined;
  const destinations = [...content.matchAll(/\]\(([^)]+)\)/g)].map((match) => {
    try { return new URL(match[1], 'https://roboskin.ai').pathname; } catch { return ''; }
  });
  if (destinations.includes(rule.href)) return undefined;
  return { href: rule.href, label: rule.label };
}
