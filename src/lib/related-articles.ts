type RelatedArticle = {
  id: string;
  title: string;
  category: string;
  technicalFocus: string[];
  date: string;
};

function normalize(value: string) {
  return value.normalize('NFKC').toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(world) action (models?)\b/g, '$1 $2')
    .replace(/\bslippage\b/g, 'slip')
    .replace(/\b(models|datasets|sensors|benchmarks|hands|robots|grippers|demonstrations)\b/g, (word) => word.slice(0, -1))
    .trim();
}

// These site-wide terms describe too much of the library to establish a reading recommendation.
const broadTerms = new Set([
  'robotics', 'robot learning', 'robot manipulation', 'robot hand', 'robot gripper',
  'robot control', 'robotics software', 'tactile ai', 'tactile robotics', 'tactile hardware',
  'tactile sensing', 'tactile sensor', 'tactile feedback', 'tactile manipulation',
  'robot skin', 'electronic skin', 'physical ai', 'embodied ai', 'contact rich manipulation',
  'dexterous manipulation', 'reinforcement learning', 'imitation learning', 'sim to real',
  'sim to real reinforcement learning', 'sim to real imitation learning',
]);

const genericResourceWords = new Set([
  'dataset', 'benchmark', 'data', 'tactile', 'robot', 'robotics', 'humanoid',
  'visuo', 'visual', 'learning', 'model', 'and', 'collection', 'evaluation',
  'protocol', 'protocols', 'split', 'splits',
]);

function isBroadTerm(term: string) {
  if (broadTerms.has(term)) return true;
  const words = term.split(' ');
  return words.some((word) => ['dataset', 'benchmark', 'data'].includes(word))
    && words.every((word) => genericResourceWords.has(word));
}

// Match specific subjects in metadata, independently of the broad navigation links.
const subjects = {
  worldModels: /\bworld model\b/,
  vla: /\bvlas?\b|\bvision language action\b/,
  datasets: /\bdataset\b|\bdata collection\b/,
  benchmarks: /\bbenchmark\b|\bevaluation protocol\b/,
  demonstrations: /\bteleoperation\b|\bteleop\b|\bdemonstration\b/,
  slip: /\bslip\b|\bregrasp(?:ing)?\b/,
  calibration: /\bcalibration\b/,
  magnetic: /\bmagnetic\b|\bhall effect\b/,
  capacitive: /\bcapacitive\b/,
  optical: /\b(?:optical|opto|vision based) tactile\b|\bgelsight\b/,
  neuromorphic: /\bneuromorphic\b|\bspiking\b|\bevent based\b/,
  fullHand: /\bfull hand\b|\bwhole hand\b/,
  humanoids: /\bhumanoid\b/,
  dexterity: /\bdexterous\b|\bdexterity\b/,
  grasp: /\bgrasp(?:ing)?\b|\bregrasp(?:ing)?\b/,
  proprioception: /\bproprioceptive\b|\bproprioception\b/,
  locomotion: /\blocomo(?:tion|tor)\b|\bplantar\b|\bsole pressure\b/,
  damage: /\bself healing\b|\bdamage (?:recovery|tolerance|sensing)\b/,
  softSkin: /\bsoft (?:robotic )?(?:skin|material)\b|\bsoft e skin\b/,
  safety: /\brobot safety\b|\biso 10218\b|\bfunctional safety\b/,
  ros: /\bros 2\b|\bros2\b/,
  representations: /\btactile (?:foundation model|representation|encoders?)\b|\btouch representation\b/,
  cables: /\bcable\b/,
  forceSensing: /\bforce sensing\b|\bforce sensor\b/,
};

function signals(article: RelatedArticle) {
  const category = normalize(article.category);
  const focus = new Set(article.technicalFocus.map(normalize).filter((term) => !isBroadTerm(term)));
  const text = normalize([article.title, article.category, ...article.technicalFocus].join(' '));
  return { category, focus, subjects: Object.entries(subjects).filter(([, pattern]) => pattern.test(text)).map(([subject]) => subject) };
}

/** Recommend only articles with a shared specific subject, focus phrase, or category. */
export function getRelatedArticles<T extends RelatedArticle>(article: RelatedArticle, candidates: T[], limit = 3): T[] {
  const source = signals(article);
  const seen = new Set<string>([article.id]);

  return candidates
    .filter((candidate) => {
      if (seen.has(candidate.id)) return false;
      seen.add(candidate.id);
      return true;
    })
    .map((candidate) => {
      const target = signals(candidate);
      const sharedFocus = [...source.focus].filter((term) => target.focus.has(term)).length;
      const sharedSubjects = source.subjects.filter((subject) => target.subjects.includes(subject));
      const specificSubjects = sharedSubjects.filter((subject) => !['datasets', 'benchmarks'].includes(subject)).length;
      const sharedCategory = source.category === target.category && !isBroadTerm(source.category) ? 1 : 0;
      const specificScore = sharedFocus * 3 + specificSubjects * 2 + sharedCategory;
      // Resource type can strengthen an existing connection, but cannot create one on its own.
      const resourceBonus = sharedSubjects.length - specificSubjects;
      return { article: candidate, score: specificScore > 0 ? specificScore + resourceBonus : 0 };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.article.date.localeCompare(a.article.date) || a.article.id.localeCompare(b.article.id))
    .slice(0, Math.max(0, limit))
    .map(({ article: related }) => related);
}
