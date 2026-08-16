type ResearchTopicInput = {
  title: string;
  category: string;
  technicalFocus: string[];
};

export type TopicPillarLink = {
  label: string;
  href: string;
};

export function getResearchTopicLinks(post: ResearchTopicInput): TopicPillarLink[] {
  const text = [post.title, post.category, ...post.technicalFocus].join(' ').toLowerCase();
  const links: TopicPillarLink[] = [];

  if (/dataset|benchmark|data collection|logging|corpus/.test(text)) {
    links.push({ label: 'Datasets', href: '/datasets' });
  }
  if (/foundation|representation|world model|world-action|imitation|policy|learning|prediction/.test(text)) {
    links.push({ label: 'Tactile foundation models', href: '/tactile-foundation-models' });
  }
  if (/humanoid|full-hand|whole-hand|robot hand|robotic hand|whole-arm|forearm|body/.test(text)) {
    links.push({ label: 'Humanoid robot skin', href: '/humanoid-robot-skin' });
  }
  if (/skin|e-skin|tactile sensor|force sensing|tactile array|contact sensing/.test(text)) {
    links.push({ label: 'Robot skin', href: '/robot-skin' });
  }

  links.push({ label: 'Tactile AI', href: '/tactile-ai' });

  if (/physical ai|embodied|manipulation|control|world|action|slip|grasp|robot/.test(text)) {
    links.push({ label: 'Physical AI + touch', href: '/physical-ai-touch' });
  }

  return links.filter((link, index) => links.findIndex((candidate) => candidate.href === link.href) === index);
}
