'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';

type Report = { id: string; title: string; summary: string; sourceCutoff: string; publishedAt: string;
  content?: { introduction: string; sections: { heading: string; analysis: string; implications: string; limitations: string; sourceIds: string[] }[];
    sources: { id: string; title: string; url: string; checkedAt: string }[] } };
type Account = { email: string; emailDelivery: boolean; interval: string; unit: string; mode: string; checkoutEnabled: boolean;
  subscription: { status: string; periodEnd: string } | null; reports: Report[] };
const date = (value: string) => new Date(value).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric' });

async function request(body: Record<string, unknown>) {
  const response = await fetch('/api/membership', { method: 'POST', credentials: 'same-origin', cache: 'no-store',
    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(60000) });
  const result = await response.json();
  if (!response.ok) throw Object.assign(new Error(result.error || 'Please try again.'), { status: response.status });
  return result;
}

export default function ReportMembership({ checkoutEnabled }: { checkoutEnabled: boolean }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [challenge, setChallenge] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<Report | null>(null);
  const [consent, setConsent] = useState(false);
  const running = useRef(false);
  const refresh = useCallback(async () => {
    try {
      const next = await request({ action: 'account' });
      setAccount(next);
      if (!next.subscription) setReport(null);
    }
    catch (error) {
      if ((error as { status?: number }).status !== 401) throw error;
      setAccount(null); setReport(null);
    }
  }, []);
  useEffect(() => {
    refresh().catch(error => setFeedback(error.message)).finally(() => setLoading(false));
    if (new URLSearchParams(window.location.search).has('checkout')) {
      setFeedback('Checking payment status. If your payment is still processing, use Refresh payment status in a moment.');
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [refresh]);
  async function run(work: () => Promise<void>) {
    if (running.current) return;
    running.current = true; setBusy(true); setFeedback('');
    try { await work(); } catch (error) { setFeedback(error instanceof Error ? error.message : 'Please try again.'); }
    finally { running.current = false; setBusy(false); }
  }
  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void run(async () => {
      if (challenge) {
        await request({ action: 'confirm', challenge, code: data.get('code') });
        setChallenge(''); await refresh(); setFeedback('Email verified. Signing in does not start a paid subscription.');
      } else {
        const result = await request({ action: 'login', email });
        setChallenge(result.challenge); setFeedback('Check your inbox for an eight-digit code. It expires in 10 minutes.');
      }
    });
  }
  return <div className="mt-6 space-y-5">
    {loading ? <p role="status">Checking your membership…</p> : !account ? <form onSubmit={signIn} className="space-y-4">
      <p>Verify your email to continue. Signing in does not start a paid subscription. We will email you a sign-in code; no password is needed.</p>
      <label className="block" htmlFor="report-email">Email address</label>
      <input className="w-full rounded border bg-transparent p-3" id="report-email" type="email" maxLength={254} autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} required disabled={Boolean(challenge) || busy} />
      {challenge && <><label className="block" htmlFor="report-code">Eight-digit sign-in code</label><input className="w-full rounded border bg-transparent p-3" id="report-code" name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{8}" maxLength={8} required /></>}
      <button className="btn-primary" disabled={busy}>{busy ? 'Please wait…' : challenge ? 'Verify email' : 'Email me a sign-in code'}</button>
      {challenge && <button className="block underline" type="button" disabled={busy} onClick={() => { setChallenge(''); setFeedback(''); }}>Use another email or request a new code</button>}
    </form> : <>
      <p>Signed in as <strong>{account.email}</strong>.</p>
      {account.subscription ? <>
        <p role="status">{account.subscription.status === 'canceling' ? 'Renewal canceled. Paid report access ends' : 'Paid report access through'} {date(account.subscription.periodEnd)} (UTC).</p>
        <h3 className="text-xl font-semibold">Your report library</h3>
        {account.reports.length ? <ul className="space-y-3">{account.reports.map(item => <li key={item.id} className="rounded border p-4">
          <button className="text-left font-semibold underline" disabled={busy} onClick={() => void run(async () => { setReport(await request({ action: 'report', id: item.id })); })}>{item.title}</button>
          <p className="mt-2">{item.summary}</p><p className="mt-2 text-sm">Published {date(item.publishedAt)} · Sources through {date(item.sourceCutoff)}</p>
        </li>)}</ul> : <p>No report is available yet. Please contact support.</p>}
      </> : <>
        <p role="status">No active paid report subscription is confirmed. Access starts after payment is confirmed.</p>
        {checkoutEnabled && account.checkoutEnabled ? <>
          <label className="flex gap-3"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} />
            <span>I agree to US$9.90 every {account.unit}, plus applicable tax, renewing automatically until canceled, and the subscription Terms. Reports arrive weekly.</span></label>
          <button className="btn-primary" disabled={busy || !consent} onClick={() => void run(async () => {
            const result = await request({ action: 'checkout', consent: `${account.interval}:9.90:USD:v1` });
            const url = new URL(result.url);
            if (url.protocol !== 'https:' || url.hostname !== 'pancake.waffo.ai') throw new Error('Unexpected payment destination.');
            window.location.assign(url.href);
          })}>{account.mode === 'test' ? 'Open Waffo test checkout' : `Continue to payment — US$9.90/${account.unit}`}</button>
        </> : <p>New subscriptions are currently closed.</p>}
      </>}
      <button className="underline" disabled={busy} onClick={() => void run(async () => { await refresh(); setFeedback('Payment status refreshed.'); })}>Refresh payment status</button>
      <label className="flex gap-3"><input type="checkbox" checked={account.emailDelivery} disabled={busy} onChange={event => {
        const checked = event.target.checked;
        void run(async () => { await request({ action: 'preferences', emailDelivery: checked }); setAccount({ ...account, emailDelivery: checked }); setFeedback('Email preference saved. Billing is unchanged.'); });
      }} />Send weekly report notifications by email</label>
      <p className="text-sm">Turning off emails does not cancel your paid subscription. Use the Waffo billing link below to stop renewal.</p>
      <button className="underline" disabled={busy} onClick={() => void run(async () => { await request({ action: 'logout' }); setAccount(null); setReport(null); setConsent(false); })}>Sign out</button>
    </>}
    <p role="status" aria-live="polite">{feedback}</p>
    {report?.content && <section className="space-y-6 rounded-lg border p-5" aria-label="Selected report">
      <h3 className="text-2xl font-semibold">{report.title}</h3><p>{report.content.introduction}</p>
      {report.content.sections.map((section, index) => <section key={index} className="space-y-3">
        <h4 className="text-xl font-semibold">{section.heading}</h4><p className="whitespace-pre-line">{section.analysis}</p>
        <p><strong>Implications:</strong> {section.implications}</p><p><strong>Limitations:</strong> {section.limitations}</p>
        <p className="text-sm">Sources: {section.sourceIds.join(', ')}</p>
      </section>)}
      <h4 className="text-xl font-semibold">Source register</h4>
      <ul className="space-y-3">{report.content.sources.map(source => <li key={source.id}><a className="underline" href={source.url} rel="noreferrer">[{source.id}] {source.title}</a> · Checked {date(source.checkedAt)}</li>)}</ul>
      <button className="underline" onClick={() => setReport(null)}>Close report</button>
    </section>}
  </div>;
}
