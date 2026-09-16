/**
 * @typedef {Readonly<{ endpoint: string, providerHost: string }>} NewsletterConfig
 */

/**
 * @param {string | undefined} value
 * @returns {NewsletterConfig | null}
 */
export function parseNewsletterEndpoint(value) {
  const candidate = value?.trim();
  if (!candidate) return null;

  try {
    const url = new URL(candidate);
    if (url.protocol !== 'https:' || url.username || url.password || url.search) return null;

    const hostname = url.hostname.toLowerCase().replace(/\.$/, '');
    const providerHost = hostname.replace(/^www\./, '');
    const ipLiteral = /^\d{1,3}(?:\.\d{1,3}){3}$/.test(providerHost) || providerHost.includes(':');
    if (!providerHost || !providerHost.includes('.') || providerHost === 'localhost' || providerHost.endsWith('.localhost') || ipLiteral) {
      return null;
    }

    url.hash = '';
    url.hostname = hostname;
    return {
      endpoint: url.toString(),
      providerHost,
    };
  } catch {
    return null;
  }
}

/** Enable only after the provider's confirmation and unsubscribe flow was verified. */
export function getNewsletterConfig(endpoint, verifiedOn, unsubscribeUrl) {
  const parsed = parseNewsletterEndpoint(endpoint);
  const unsubscribe = parseNewsletterEndpoint(unsubscribeUrl);
  if (!parsed || !unsubscribe || !/^\d{4}-\d{2}-\d{2}$/.test(verifiedOn ?? '')) return null;
  const verifiedDate = new Date(`${verifiedOn}T00:00:00Z`);
  if (!Number.isFinite(verifiedDate.getTime()) || verifiedDate.toISOString().slice(0, 10) !== verifiedOn || verifiedDate > new Date()) return null;
  if (parsed.providerHost !== 'buttondown.com' || unsubscribe.providerHost !== 'buttondown.com'
    || !/^\/api\/emails\/embed-subscribe\/[^/]+\/?$/.test(new URL(parsed.endpoint).pathname)) return null;
  return { ...parsed, unsubscribeUrl: unsubscribe.endpoint, verifiedOn };
}

export function validateNewsletterSignup(email, consent, honey) {
  if (honey) return 'Please leave the website field empty.';
  if (typeof email !== 'string' || email.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Enter a valid email address.';
  if (!consent) return 'Please agree to receive the weekly research brief.';
  return null;
}
