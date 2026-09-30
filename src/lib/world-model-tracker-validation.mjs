const modalities = ['vision', 'touch', 'proprioception', 'action', 'reward', 'latent'];
const releases = ['released', 'announced', 'none', 'unknown'];
const authorChecks = ['not-contacted', 'contacted', 'confirmed', 'corrected'];
const fields = ['id', 'name', 'paperTitle', 'sourceUrl', 'releaseDate', 'institutions', 'predicts', 'tactileSensor', 'robotPlatform', 'realRobotEval', 'openSource', 'evidenceLevel', 'verdict', 'briefUrl', 'sources', 'lastVerified', 'authorCheck'];

function requireValue(condition, message) {
  if (!condition) throw new TypeError(message);
}

function objectKeys(value, expected, path) {
  requireValue(value !== null && typeof value === 'object' && !Array.isArray(value), `${path}: expected object`);
  requireValue(Object.keys(value).length === expected.length && expected.every((key) => Object.hasOwn(value, key)), `${path}: unexpected or missing fields`);
}

function text(value) {
  return typeof value === 'string' && value.length > 0 && value.trim() === value;
}

function date(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function url(value) {
  if (!text(value)) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' && !!parsed.hostname && !parsed.username && !parsed.password;
  } catch { return false; }
}

function stringArray(value) {
  return Array.isArray(value) && value.every(text) && new Set(value).size === value.length;
}

/** Validate untrusted JSON before exposing typed tracker entries. */
export function assertTrackerEntries(value) {
  requireValue(Array.isArray(value) && value.length > 0, 'tracker: expected non-empty array');
  const ids = new Set();
  for (const [index, entry] of value.entries()) {
    const path = `tracker[${index}]`;
    objectKeys(entry, fields, path);
    requireValue(text(entry.id) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id) && !ids.has(entry.id), `${path}.id: invalid or duplicate`);
    ids.add(entry.id);
    for (const key of ['name', 'verdict']) requireValue(text(entry[key]), `${path}.${key}: expected text`);
    for (const key of ['paperTitle', 'tactileSensor', 'robotPlatform']) requireValue(entry[key] === null || text(entry[key]), `${path}.${key}: expected text or null`);
    requireValue(url(entry.sourceUrl), `${path}.sourceUrl: expected HTTPS URL`);
    requireValue(entry.releaseDate === null || date(entry.releaseDate), `${path}.releaseDate: invalid date`);
    requireValue(date(entry.lastVerified), `${path}.lastVerified: invalid date`);
    requireValue(entry.releaseDate === null || entry.releaseDate <= entry.lastVerified, `${path}: verification precedes release`);
    requireValue(stringArray(entry.institutions), `${path}.institutions: expected unique strings`);
    requireValue(stringArray(entry.predicts) && entry.predicts.every((item) => modalities.includes(item)), `${path}.predicts: invalid modalities`);
    requireValue(stringArray(entry.sources) && entry.sources.length > 0 && entry.sources.every(url) && entry.sources.includes(entry.sourceUrl), `${path}.sources: expected HTTPS sources including sourceUrl`);
    requireValue(entry.briefUrl === null || (text(entry.briefUrl) && /^\/(research|news|guides)\/[a-z0-9-]+$/.test(entry.briefUrl)), `${path}.briefUrl: invalid internal path`);
    requireValue(entry.verdict.split(/\s+/).length <= 30, `${path}.verdict: exceeds 30 words`);
    requireValue(authorChecks.includes(entry.authorCheck), `${path}.authorCheck: invalid status`);
    objectKeys(entry.realRobotEval, ['has', 'taskCount', 'rolloutsPerSetting'], `${path}.realRobotEval`);
    requireValue(entry.realRobotEval.has === null || typeof entry.realRobotEval.has === 'boolean', `${path}.realRobotEval.has: expected boolean or null`);
    for (const key of ['taskCount', 'rolloutsPerSetting']) {
      const count = entry.realRobotEval[key];
      requireValue(count === null || (Number.isInteger(count) && count > 0), `${path}.realRobotEval.${key}: expected positive integer or null`);
      requireValue(entry.realRobotEval.has === true || count === null, `${path}: counts require real-robot evidence`);
    }
    objectKeys(entry.openSource, ['code', 'data', 'weights', 'license'], `${path}.openSource`);
    for (const key of ['code', 'data', 'weights']) requireValue(releases.includes(entry.openSource[key]), `${path}.openSource.${key}: invalid release status`);
    requireValue(entry.openSource.license === null || text(entry.openSource.license), `${path}.openSource.license: expected text or null`);
    requireValue(['A', 'B', 'C', 'D'].includes(entry.evidenceLevel), `${path}.evidenceLevel: invalid level`);
    if (entry.evidenceLevel === 'A') requireValue(entry.realRobotEval.has === true && entry.openSource.code === 'released', `${path}: A requires real-robot evaluation and released code`);
    if (entry.evidenceLevel === 'B') requireValue(entry.realRobotEval.has === true && ['announced', 'none'].includes(entry.openSource.code), `${path}: B requires real-robot evaluation and explicitly unreleased code`);
    if (entry.evidenceLevel === 'C') requireValue(entry.realRobotEval.has === false, `${path}: C requires simulation-only evidence`);
  }
}
