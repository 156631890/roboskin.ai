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
