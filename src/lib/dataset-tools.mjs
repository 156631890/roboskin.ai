/** @typedef {import('./robotics-datasets').RoboticsDatasetEntry} Dataset */

/** @param {Dataset} entry @param {string} query */
export function matchesDatasetQuery(entry, query) {
  const text = [entry.name, ...entry.institution, ...entry.robot, ...entry.sensor,
    ...entry.tasks, ...entry.modalities, String(entry.year)].join(' ').toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean).every((term) => text.includes(term));
}

/** @param {string | number | string[]} value */
function csvCell(value) {
  let text = Array.isArray(value) ? value.join('; ') : String(value ?? '');
  // Keep source text from being interpreted as a spreadsheet formula.
  if (/^\s*[=+@-]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

/** @param {Dataset[]} entries @param {string} pathname */
export function buildDatasetCsv(entries, pathname) {
  const fields = ['id', 'name', 'institution', 'year', 'robot', 'sensor', 'modalities',
    'sampleCount', 'tasks', 'objectCategories', 'dataFormat', 'license', 'licenseUrl',
    'availability', 'sourceReviewed', 'paperUrl', 'projectUrl', 'datasetUrl', 'githubUrl'];
  const rows = entries.map((entry) => [...fields.map((field) => entry[field] ?? ''),
    `https://roboskin.ai${pathname}#dataset-${entry.id}`]);
  return '\uFEFF' + [[...fields, 'directoryRecordUrl'], ...rows]
    .map((row) => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
}

/** @param {Dataset} entry @param {string} pathname */
export function buildDatasetCitation(entry, pathname) {
  return `RoboSkin.ai Editorial Team. ${entry.name} — directory record. Source reviewed ${entry.sourceReviewed}. https://roboskin.ai${pathname}#dataset-${entry.id}\nOriginal research: ${entry.paperUrl}\nThis cites the directory record; cite the original authors and follow the dataset's own reuse terms when using their work.`;
}
