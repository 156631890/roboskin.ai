import { hasChatGptSourceTag } from './referral-attribution.mjs';

export const analyticsConsentKey = 'roboskin-google-analytics-consent';

export function canUseGoogleAnalytics(measurementId, hostname) {
  return /^G-[A-Z0-9]+$/.test(measurementId || '') && hostname === 'roboskin.ai';
}

export function analyticsPageUrl(value) {
  try {
    const url = new URL(value);
    if (!['https:', 'http:'].includes(url.protocol)) return '';
    return url.origin + url.pathname;
  } catch {
    return '';
  }
}

export function analyticsReferrer(value) {
  const clean = analyticsPageUrl(value);
  if (!clean) return '';
  const url = new URL(clean);
  return url.hostname === 'roboskin.ai' ? clean : url.origin + '/';
}

// Only these published campaign tokens can enter GA4; arbitrary query values never do.
export const resourceCampaign = 'roboskin-resources-20261007';
const campaignChannels = new Map([
  ['x', 'social'], ['reddit', 'social'], ['github', 'referral'], ['newsletter', 'email'],
]);

export function analyticsCampaign(value, referrer = '') {
  try {
    const url = new URL(value);
    if (url.origin !== 'https://roboskin.ai') return {};
    const params = url.searchParams;
    const source = params.get('utm_source');
    const medium = params.get('utm_medium');
    const campaign = params.get('utm_campaign');
    // ChatGPT links can carry only this source tag. Recover it when the browser
    // supplies no referrer, without exposing other query values or inventing a
    // campaign name. GoogleAnalytics applies these fields only at initialization.
    if (!referrer.trim() && hasChatGptSourceTag(value)) {
      return { campaign_source: 'chatgpt.com', campaign_medium: 'referral' };
    }
    if (['utm_source', 'utm_medium', 'utm_campaign'].some(key => params.getAll(key).length !== 1)) return {};
    if (campaign !== resourceCampaign || !campaignChannels.has(source) || campaignChannels.get(source) !== medium) return {};
    return { campaign_source: source, campaign_medium: medium, campaign_name: campaign };
  } catch {
    return {};
  }
}

const sensorEvaluationResources = new Map([
  ['/resources/tactile-sensor-evaluation-template.csv', ['sensor-evaluation-template', 'resource_download']],
  ['/resources/gelsight-digit-comparison-protocol.csv', ['gelsight-digit-protocol', 'resource_download']],
  ['/resources/gelsight-digit-comparison-trials.csv', ['gelsight-digit-trials', 'resource_download']],
  ['/resources/gelsight-digit-comparison-slip-events.csv', ['gelsight-digit-slip-events', 'resource_download']],
  ['/resources/gelsight-digit-comparison-instructions.txt', ['gelsight-digit-instructions', 'resource_open']],
]);

// Shared fixed IDs keep both analytics providers on the same public resource list.
export function sensorEvaluationResource(pathname) {
  const resource = sensorEvaluationResources.get(pathname);
  return resource ? { id: resource[0], event: resource[1] } : null;
}

const resourceLinks = new Map([
  ['/robot-vla-models', ['vla-models', 'resource_open']],
  ['/vla/models', ['vla-model-comparison', 'resource_open']],
  ['/vla/timeline', ['vla-research-timeline', 'resource_open']],
  ['/robot-foundation-models', ['robot-foundation-models', 'resource_open']],
  ['/robot-world-models', ['robot-world-models', 'resource_open']],
  ['/robot-skin', ['robot-skin-guide', 'resource_open']],
  ['/tactile-ai', ['tactile-ai-guide', 'resource_open']],
  ['/benchmarks', ['benchmark-directory', 'resource_open']],
  ['/datasets', ['dataset-directory', 'resource_open']],
  ['/sensors', ['sensor-directory', 'resource_open']],
  ['/tactile-ai#experiment-worksheet', ['experiment-worksheet', 'resource_open']],
  ['/resources/tactile-experiment-worksheet.csv', ['experiment-worksheet', 'resource_download']],
  ['/guides/gelsight-vs-digit', ['gelsight-digit-comparison', 'resource_open']],
  ['/guides/optical-tactile-sensor-maintenance', ['optical-sensor-maintenance', 'resource_open']],
  ['/guides/optical-vs-capacitive-tactile-sensors', ['optical-capacitive-comparison', 'resource_open']],
  ['/sensors/melexis-tactaxis', ['melexis-tactaxis', 'resource_open']],
  ['/sensors/robotiq-tsf-85', ['robotiq-tsf-85', 'resource_open']],
  ['/research/bench2dex-visuo-tactile-bimanual-benchmark-2026', ['bench2dex-review', 'resource_open']],
  ['/news/cartesian-hand-all-linear-in-hand-manipulation', ['cartesian-hand-review', 'resource_open']],
  ['/guides/ros2-tactile-sensing', ['ros2-guide', 'resource_open']],
  ['/guides/python-tactile-data-processing', ['python-guide', 'resource_open']],
  ['/guides/lerobot-dataset-format', ['lerobot-guide', 'resource_open']],
  ['/guides/tactile-sensor-calibration', ['calibration-guide', 'resource_open']],
  ['/guides/visuo-tactile-world-models-robot-manipulation', ['world-model-comparison', 'resource_open']],
  ['/tactile-foundation-models', ['tactile-models', 'resource_open']],
  ['/guides/slip-detection-robot-hand', ['slip-guide', 'resource_open']],
  ['/applications/robot-hand-tactile-sensor', ['hand-sensing-guide', 'resource_open']],
  ['/research-index.csv', ['research-index', 'resource_download']],
  ['/research-index.json', ['research-index', 'resource_download']],
  ['/experiment-results.csv', ['experiment-evidence', 'resource_download']],
  ['/resources/tactile-dataset-selection-checklist.csv', ['dataset-checklist', 'resource_download']],
  ...sensorEvaluationResources,
  ['/tutorials/lerobot-validation/lerobot-numeric-validation.zip', ['lerobot-numeric-validation', 'resource_download']],
  ['/tutorials/lerobot-loader/lerobot-official-loader.zip', ['lerobot-official-loader', 'resource_download']],
]);

// Return only public route IDs and paths; never anchor text, form fields or queries.
export function analyticsResourceEvent(location, href) {
  try {
    const from = new URL(location);
    const to = new URL(href, from);
    if (from.origin !== 'https://roboskin.ai' || to.origin !== from.origin) return null;
    if (from.pathname === to.pathname && from.hash === to.hash) return null;
    const fragmentResource = to.hash ? resourceLinks.get(to.pathname + to.hash) : undefined;
    // A table of contents jump is not another resource open. Explicit resources
    // such as the experiment worksheet can still be opened within their page.
    if (from.pathname === to.pathname && !fragmentResource) return null;
    const resource = fragmentResource || resourceLinks.get(to.pathname);
    if (!resource) return null;
    return {
      name: resource[1],
      parameters: { resource_id: resource[0], from_path: from.pathname, target_path: to.pathname },
    };
  } catch {
    return null;
  }
}

// One owner for page_view: enhanced measurement must remain off in the GA stream.
export function createPageViewTracker(send) {
  let previousPage = '';
  return {
    reset() { previousPage = ''; },
    track({ location, title, referrer }) {
      const page = analyticsPageUrl(location);
      if (!page || page === previousPage) return false;
      const properties = {
        page_location: page,
        page_title: title,
        page_referrer: previousPage || analyticsReferrer(referrer),
      };
      send('set', properties);
      send('event', 'page_view', properties);
      previousPage = page;
      return true;
    },
  };
}
