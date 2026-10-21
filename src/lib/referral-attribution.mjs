// Return fixed labels only. Never forward a referrer's path or arbitrary UTM values.
const referralDomains = [
  ['bing.com', 'Bing'],
  ['chatgpt.com', 'ChatGPT'],
  ['chat.openai.com', 'ChatGPT'],
  ['perplexity.ai', 'Perplexity'],
  ['claude.ai', 'Claude'],
  ['copilot.microsoft.com', 'Microsoft Copilot'],
];

export function hasChatGptSourceTag(location) {
  try {
    const url = new URL(location);
    return url.origin === 'https://roboskin.ai'
      && url.searchParams.getAll('utm_source').length === 1
      && url.searchParams.get('utm_source') === 'chatgpt.com';
  } catch {
    return false;
  }
}

export function referralLandingSource(location, referrer = '') {
  // A source tag can recover missing attribution, but cannot replace a known
  // document referrer or turn an internal navigation into a new AI referral.
  if (!referrer.trim()) return hasChatGptSourceTag(location) ? 'ChatGPT' : null;
  try {
    const url = new URL(referrer);
    if (!['https:', 'http:'].includes(url.protocol)) return null;
    const host = url.hostname;
    if (/(^|\.)google\.(?:com|[a-z]{2}|com\.[a-z]{2}|co\.[a-z]{2})$/.test(host)) return 'Google';
    return referralDomains.find(([domain]) => host === domain || host.endsWith(`.${domain}`))?.[1] ?? null;
  } catch {
    return null;
  }
}
