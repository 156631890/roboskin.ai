const publicHosts = new Set(['roboskin.ai', 'www.roboskin.ai']);
const eventNames = new Set([
  'Referral Landing', 'Tutorial Visit', 'Tutorial Open', 'Reading Depth',
  'Experiment Worksheet Download', 'Tutorial Example Download', 'Evidence CSV Download',
  'Dataset Checklist Download', 'Sensor Evaluation Template Download', 'Sample Report Download',
  'Research Data Open', 'Research Services Open', 'Contact Intent', 'WhatsApp Intent',
  'Submit Source Intent',
]);
const pending = [];

export function canUseGeoInflow(websiteId, hostname) {
  return typeof websiteId === 'string' && /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(websiteId) && publicHosts.has(hostname);
}

function publicPath(value) {
  try {
    const url = new URL(value, 'https://roboskin.ai');
    if (!publicHosts.has(url.hostname) || /^\/(api|membership|weekly-reports|account|auth|login|checkout)(\/|$)/.test(url.pathname)) return null;
    return url.pathname;
  } catch { return null; }
}

// Drop query strings, fragments and external referrer paths before collection.
export function geoBeforeSend(_type, payload) {
  if (!payload || !publicHosts.has(payload.hostname)) return null;
  const path = publicPath(payload.url);
  if (path === null) return null;
  let referrer = '';
  try {
    const url = new URL(payload.referrer);
    if (url.protocol === 'https:' || url.protocol === 'http:') referrer = url.origin;
  } catch { /* A direct visit has no referrer. */ }
  return { ...payload, url: path, referrer };
}

export function geoEvent(name, properties) {
  if (!eventNames.has(name)) return null;
  const data = {};
  for (const key of ['path', 'from', 'target']) {
    if (key === 'target' && name === 'WhatsApp Intent') continue;
    if (typeof properties?.[key] === 'string') {
      const path = publicPath(properties[key]);
      if (path !== null) data[key] = path;
    }
  }
  // Never mirror free text, link labels, emails, phone numbers or form contents.
  if (name === 'Reading Depth' && [25, 50, 75].includes(properties?.depth)) data.depth = properties.depth;
  if (name === 'Referral Landing' && ['ChatGPT', 'Perplexity', 'Claude', 'Microsoft Copilot', 'Bing', 'Google'].includes(properties?.source)) data.source = properties.source;
  return { name, data };
}

export function trackGeoEvent(name, properties) {
  if (typeof window === 'undefined' || !publicHosts.has(window.location.hostname)) return;
  if (publicPath(window.location.href) === null) return;
  const event = geoEvent(name, properties);
  if (!event) return;
  if (window.umami) {
    try { Promise.resolve(window.umami.track(event.name, event.data)).catch(() => {}); } catch { /* Optional telemetry. */ }
  } else if (pending.length < 50) pending.push(event);
}

export function flushGeoEvents() {
  if (typeof window === 'undefined' || !window.umami) return;
  for (const event of pending.splice(0)) trackGeoEvent(event.name, event.data);
}
