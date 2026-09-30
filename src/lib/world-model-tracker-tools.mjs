export const trackerPath = '/world-models/tracker';
export const trackerUrl = `https://roboskin.ai${trackerPath}`;

export function latestTrackerReview(entries) {
  return entries.reduce((latest, entry) => entry.lastVerified > latest ? entry.lastVerified : latest, '');
}

export function selectTrackerEntries(entries, { modality = '', evidence = '', code = '' } = {}) {
  return entries.filter((entry) =>
    (!modality || entry.predicts.includes(modality)) &&
    (!evidence || entry.evidenceLevel === evidence) &&
    (!code || entry.openSource.code === code),
  ).sort((left, right) =>
    (right.releaseDate ?? '').localeCompare(left.releaseDate ?? '') || left.id.localeCompare(right.id),
  );
}

export function buildWorldModelTrackerDataset(entries) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': `${trackerUrl}#dataset`,
    name: 'Tactile World Model Tracker',
    url: trackerUrl,
    description: 'Editorial review preview of robotic world models that predict or use touch, contact and force. Records distinguish hardware, real-robot evaluation and verified artifact availability; updated as sources are checked.',
    creator: { '@type': 'Organization', '@id': 'https://roboskin.ai/#organization', name: 'RoboSkin.ai', url: 'https://roboskin.ai/' },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    dateModified: latestTrackerReview(entries),
    inLanguage: 'en',
    isAccessibleForFree: true,
    keywords: ['tactile world models', 'robot manipulation', 'contact prediction', 'visuo-tactile learning'],
    measurementTechnique: 'Source review of versioned papers and official project pages; editorial review pending; no independent hardware replication.',
    variableMeasured: ['Model', 'First publication date', 'Predicted modalities', 'Tactile sensor', 'Robot platform', 'Real-robot evaluation', 'Artifact availability', 'Evidence availability grade'],
    citation: [...new Set(entries.flatMap((entry) => entry.sources))],
  };
}
