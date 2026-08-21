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
