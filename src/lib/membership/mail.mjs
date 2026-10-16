export function createMailer(config, fetcher = fetch) {
  return async function send({ to, subject, text, key }) {
    const response = await fetcher('https://api.resend.com/emails', {
      method: 'POST', signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${config.mailKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': key },
      body: JSON.stringify({ from: config.mailFrom, to: [to], subject, text }),
    });
    if (!response.ok) throw new Error('Report email delivery failed');
    const result = await response.json();
    if (!result.id) throw new Error('Missing report email receipt');
    return result.id;
  };
}
