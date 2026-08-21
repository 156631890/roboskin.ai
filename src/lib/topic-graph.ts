type ResearchTopicInput = {
  title: string;
  category: string;
  technicalFocus: string[];
};

export type TopicPillarLink = {
  label: string;
  href: string;
};

const MAX_TOPIC_LINKS = 6;
const TACTILE_LINK_RESERVE = 2;

const vlaPattern = /\bvlas?\b|vision[\s-]+language[\s-]+action/;
const worldModelPattern = /\bworld[\s-]+(?:action[\s-]+)?models?\b|\bworld[\s-]+action\b/;
const robotLearningPattern = /\brobot(?:ic)?[\s-]+learning\b|\bimitation(?:[\s-]+learning)?\b|\breinforcement[\s-]+learning\b|\bpolicy[\s-]+learning\b|\blearned[\s-]+polic(?:y|ies)\b/;
const datasetPattern = /\bdatasets?\b|\bdata[\s-]+(?:collection|corpus)\b|\bcorpus\b|\bbenchmarks?\b/;
const benchmarkPattern = /\bbenchmarks?\b|\bleaderboard\b|\bevaluation[\s-]+protocol\b/;
const teleoperationPattern = /\btele[\s-]?operation\b|\bteleop\b|\bdemonstrations?\b/;
const humanoidPattern = /\bhumanoids?\b/;
const manipulationPattern = /\bmanipulation\b|\bdexter(?:ity|ous)\b|\bgrasp(?:ing)?\b|\binsertion\b|\bloco[\s-]+manipulation\b/;
const robotHandPattern = /\brobot(?:ic)?[\s-]+hands?\b|\bdexterous[\s-]+hands?\b|\bgrippers?\b|\bend[\s-]+effectors?\b|\bfull[\s-]+hand\b/;
const robotSafetyPattern = /\brobot(?:ic)?[\s-]+safety\b|\bindustrial[\s-]+robot[\s-]+safety\b|\bfunctional[\s-]+safety\b|\bsafety[\s-]+skin\b/;
const physicalAiPattern = /\bphysical[\s-]+ai\b|\bembodied[\s-]+ai\b|\bembodied[\s-]+intelligence\b/;
const genericAiRoboticsPattern = /\bai[\s-]+(?:and[\s-]+)?robotics\b|\brobot(?:ic)?[\s-]+ai\b|\bartificial[\s-]+intelligence[\s-]+(?:in|for)[\s-]+robotics\b|\brobot(?:s|ic|ics)?\b/;

// A tactile child is added only when the article metadata explicitly describes touch or contact.
// Word boundaries keep terms such as "reinforcement" from being mistaken for "force".
const tactileContextPattern = /\btactile\b|\btouch\b|\bskin\b|\be[\s-]?skin\b|\btaxels?\b|\bslip\b|\bforce\b|\bpressure\b|\bcontact\b|\bhaptic\b/;
const tactileSensorPattern = /\btactile[\s-]+sensors?\b|\btactile[\s-]+sensing\b|\bforce[\s-]+sensing\b|\bpressure[\s-]+sensing\b|\bcontact[\s-]+sensing\b|\btactile[\s-]+arrays?\b|\btaxels?\b|\boptical[\s-]+tactile\b|\bmagnetic[\s-]+tactile\b/;
const robotSkinPattern = /\brobot(?:ic)?[\s-]+skin\b|\bhumanoid[\s-]+robot[\s-]+skin\b|\belectronic[\s-]+skin\b|\be[\s-]?skin\b|\btactile[\s-]+skin\b|\blarge[\s-]+area[\s-]+skin\b/;
const tactileModelPattern = /\btactile[\s-]+(?:foundation[\s-]+)?models?\b|\btactile[\s-]+representation\b|\bvisuo[\s-]+tactile[\s-]+models?\b|\bworld[\s-]+(?:action[\s-]+)?models?\b|\bworld[\s-]+action\b/;
const visuoTactilePattern = /\bvisuo[\s-]+tactile\b|\bvisual[\s-]+tactile\b|\bvision[\s-]+touch\b/;

function addUniqueLink(links: TopicPillarLink[], link: TopicPillarLink) {
  if (!links.some((candidate) => candidate.href === link.href)) {
    links.push(link);
  }
}

export function getResearchTopicLinks(post: ResearchTopicInput): TopicPillarLink[] {
  const text = [post.title, post.category, ...post.technicalFocus].join(' ').toLowerCase();
  const broadLinks: TopicPillarLink[] = [];
  const tactileLinks: TopicPillarLink[] = [];

  if (vlaPattern.test(text)) {
    addUniqueLink(broadLinks, { label: 'Robot VLA models', href: '/robot-vla-models' });
  }
  if (worldModelPattern.test(text)) {
    addUniqueLink(broadLinks, { label: 'Robot world models', href: '/robot-world-models' });
  }
  if (robotLearningPattern.test(text)) {
    addUniqueLink(broadLinks, { label: 'Robot learning', href: '/robot-learning' });
  }
  if (datasetPattern.test(text)) {
    addUniqueLink(broadLinks, { label: 'Robotics datasets', href: '/robotics-datasets' });
  }
  if (teleoperationPattern.test(text)) {
    addUniqueLink(broadLinks, { label: 'Robot teleoperation', href: '/robot-teleoperation' });
  }
  if (humanoidPattern.test(text)) {
    addUniqueLink(broadLinks, { label: 'Humanoid robots', href: '/humanoid-robots' });
  }
  if (manipulationPattern.test(text)) {
    addUniqueLink(broadLinks, { label: 'Robot manipulation', href: '/robot-manipulation' });
  }
  if (robotHandPattern.test(text)) {
    addUniqueLink(broadLinks, { label: 'Robot hands', href: '/robot-hands' });
  }
  if (robotSafetyPattern.test(text)) {
    addUniqueLink(broadLinks, { label: 'Robot safety', href: '/robot-safety' });
  }
  if (physicalAiPattern.test(text)) {
    addUniqueLink(broadLinks, { label: 'Physical AI', href: '/physical-ai' });
  }
  if (broadLinks.length === 0 && (genericAiRoboticsPattern.test(text) || tactileContextPattern.test(text))) {
    addUniqueLink(broadLinks, { label: 'AI and robotics', href: '/ai-robotics' });
  }

  if (tactileContextPattern.test(text)) {
    addUniqueLink(tactileLinks, { label: 'Tactile AI', href: '/tactile-ai' });

    if (datasetPattern.test(text)) {
      addUniqueLink(tactileLinks, { label: 'Tactile datasets', href: '/datasets' });
    }
    if (benchmarkPattern.test(text)) {
      addUniqueLink(tactileLinks, { label: 'Tactile benchmarks', href: '/benchmarks' });
    }
    if (tactileModelPattern.test(text)) {
      addUniqueLink(tactileLinks, { label: 'Tactile foundation models', href: '/tactile-foundation-models' });
    }
    if (humanoidPattern.test(text)) {
      addUniqueLink(tactileLinks, { label: 'Humanoid robot skin', href: '/humanoid-robot-skin' });
    }
    if (manipulationPattern.test(text)) {
      addUniqueLink(tactileLinks, { label: 'Tactile manipulation', href: '/tactile-manipulation' });
    }
    if (visuoTactilePattern.test(text)) {
      addUniqueLink(tactileLinks, { label: 'Visuo-tactile robotics', href: '/visuo-tactile' });
    }
    if (tactileSensorPattern.test(text)) {
      addUniqueLink(tactileLinks, { label: 'Tactile sensors', href: '/sensors' });
    }
    if (robotSkinPattern.test(text) || tactileSensorPattern.test(text)) {
      addUniqueLink(tactileLinks, { label: 'Robot skin', href: '/robot-skin' });
    }
    if (physicalAiPattern.test(text)) {
      addUniqueLink(tactileLinks, { label: 'Physical AI + touch', href: '/physical-ai-touch' });
    }
  }

  const broadLimit = tactileLinks.length > 0
    ? MAX_TOPIC_LINKS - Math.min(TACTILE_LINK_RESERVE, tactileLinks.length)
    : MAX_TOPIC_LINKS;
  const selectedBroadLinks = broadLinks.slice(0, broadLimit);
  const selectedTactileLinks = tactileLinks.slice(0, MAX_TOPIC_LINKS - selectedBroadLinks.length);

  return [...selectedBroadLinks, ...selectedTactileLinks]
    .filter((link, index, links) => links.findIndex((candidate) => candidate.href === link.href) === index)
    .slice(0, MAX_TOPIC_LINKS);
}
