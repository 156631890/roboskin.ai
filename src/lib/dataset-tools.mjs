/** @typedef {import('./robotics-datasets').RoboticsDatasetEntry} Dataset */
import { datasetAudit, getDatasetEvidence } from './dataset-evidence.mjs';

/** Normalize only equivalent labels for the original physical DIGIT sensor.
 * Simulation, Digit 360 and DIGIT Pinki retain their own evidence boundaries.
 * @param {string} label
 */
export function datasetSensorLabel(label) {
  return ['digit', 'digit vision-based tactile sensor'].includes(label.trim().toLowerCase())
    ? 'DIGIT' : label;
}

/** @param {Dataset} entry @param {string} query */
export function matchesDatasetQuery(entry, query) {
  const text = [entry.name, ...entry.institution, ...entry.robot, ...entry.sensor,
    ...entry.tasks, ...entry.modalities, String(entry.year)].join(' ').toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean).every((term) => text.includes(term));
}

/** @param {string | number | string[]} value */
export function csvCell(value) {
  let text = Array.isArray(value) ? value.join('; ') : String(value ?? '');
  // Keep source text from being interpreted as a spreadsheet formula.
  if (/^\s*[=+@-]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

/** @param {Dataset[]} entries @param {string} pathname */
export function buildDatasetCsv(entries, pathname) {
  const fields = ['id', 'name', 'institution', 'year', 'robot', 'sensor', 'modalities',
    'sampleCount', 'tasks', 'objectCategories', 'dataFormat', 'license', 'licenseUrl',
    'availability', 'sourceReviewed', 'paperUrl', 'projectUrl', 'datasetUrl', 'githubUrl',
    'authors', 'firstPublished', 'paperVersion', 'dataOrigin', 'codeLicense', 'assetLicense', 'modelLicense', 'generalization'];
  const evidenceFields = ['access', 'accessCheckedAt', 'publicFileScale', 'verificationScope', 'dataLicense', 'licenseStatus', 'splitStatus', 'splitDetails', 'revision'];
  const rows = entries.map((entry) => [...fields.map((field) => entry[field] ?? ''),
    ...evidenceFields.map(field => getDatasetEvidence(entry)[field] ?? ''),
    `https://roboskin.ai${pathname}#dataset-${entry.id}`]);
  return '\uFEFF' + [[...fields, ...evidenceFields, 'directoryRecordUrl'], ...rows]
    .map((row) => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
}

/** @param {Dataset} entry @param {string} pathname */
export function buildDatasetCitation(entry, pathname) {
  const edition = pathname === '/datasets' ? ` Directory audit ${datasetAudit.version}; access checked ${getDatasetEvidence(entry).accessCheckedAt}.` : '';
  return `RoboSkin.ai Editorial Team. ${entry.name} — directory record. Source reviewed ${entry.sourceReviewed}.${edition} https://roboskin.ai${pathname}#dataset-${entry.id}\nOriginal research: ${entry.paperUrl}\nThis cites the directory record; cite the original authors and follow the dataset's own reuse terms when using their work.`;
}

/** A source reference, not a fabricated author list or author-approved BibTeX. */
export function buildOriginalDatasetReference(entry) {
  return `${entry.name} (${entry.year}). Original dataset: ${entry.datasetUrl ?? entry.projectUrl ?? entry.paperUrl}\nPrimary paper and authoritative author citation: ${entry.paperUrl}\nUse the original authors' citation instructions for research use. This source reference does not attribute their dataset to RoboSkin.ai.`;
}
