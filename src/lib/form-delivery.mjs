/** An HTTP 2xx alone is not a delivery receipt. Includes existing FormSubmit AJAX. */
export function isDeliveryReceipt(body) {
  return Boolean(body && ((body.ok === true && body.status === 'accepted' && typeof body.receiptId === 'string' && body.receiptId.length > 0) || body.success === 'true' || body.success === true));
}

export function validateInquiry(payload) {
  if (payload.website) return 'Please leave the website field empty.';
  if (typeof payload.email !== 'string' || payload.email.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) return 'Enter a valid email address.';
  if (!payload.fullName?.trim() || !payload.company?.trim() || !(payload.researchQuestion ?? payload.message)?.trim()) return 'Complete the required fields.';
  if (!payload.consent) return 'Please confirm that we may reply to this inquiry.';
  if (Object.values(payload).some(value => typeof value === 'string' && value.length > 10000)) return 'Please keep each field under 10,000 characters.';
  return null;
}

export function parseContactEndpoint(value) {
  if (value === '/api/contact') return value;
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) return null;
    return url.hostname === 'formsubmit.co' && /^\/ajax\/[^/]+$/.test(url.pathname) ? url.href : null;
  } catch { return null; }
}

/** Keeps the UI text and transport result consistent for both inquiry forms. */
export async function submitInquiry(endpoint, payload, fetcher = fetch) {
  const error = validateInquiry(payload);
  if (error) return { ok: false, error };
  const destination = parseContactEndpoint(endpoint);
  if (!destination) return { ok: false, error: 'Online delivery is unavailable. Your inquiry has not been sent. Use a direct contact link below.' };
  try {
    await deliverInquiry(destination, { ...payload, email: payload.email.trim(), _honey: payload.website }, fetcher);
    return { ok: true };
  } catch {
    return { ok: false, error: 'Delivery could not be confirmed. Your text is preserved; retry or use a direct contact link. A timed-out request may still have reached the service.' };
  }
}

export async function deliverInquiry(endpoint, payload, fetcher = fetch) {
  const response = await fetcher(endpoint, {
    method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(12000),
  });
  const body = await response.json().catch(() => null);
  if (!response.ok || !isDeliveryReceipt(body)) throw new Error('Submission could not be confirmed. Your details are still here. Retry or use the email draft below.');
  return body;
}
