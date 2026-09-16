'use client';

import Link from 'next/link';
import { useRef, useState, type FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@vercel/analytics';
import AntiSpamChallenge from './AntiSpamChallenge';

export default function NewsletterApiForm() {
  const path = usePathname();
  const [token, setToken] = useState('');
  const [challengeKey, setChallengeKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(false);
  const inFlight = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    const data = new FormData(event.currentTarget);
    setBusy(true); setError(false); setFeedback('');
    track('Newsletter Subscribe Attempt', { path, placement: 'footer' });
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(12000),
        body: JSON.stringify({ email: data.get('email'), consent: data.get('consent') === 'on', website: data.get('website'), path, challengeToken: token }),
      });
      const body = await response.json();
      if (!response.ok || body.ok !== true || !['pending', 'unchanged'].includes(body.status)) throw new Error(body.error || 'Signup could not be confirmed. Please retry or use RSS.');
      setFeedback(body.message);
      track('Newsletter Request Accepted', { path, result: body.status });
    } catch (err) { setError(true); setFeedback(err instanceof Error ? err.message : 'Signup could not be confirmed. Please use RSS or retry.'); }
    finally { inFlight.current = false; setBusy(false); setToken(''); setChallengeKey((key) => key + 1); }
  }
  return <form id="newsletter-signup" className="newsletter-form" onSubmit={submit}>
    <label htmlFor="newsletter-email">Weekly Tactile Robotics Research Brief</label>
    <p>One weekly email with research, dataset releases and reproduction notes. Buttondown manages the list. Confirm your email to join; each brief includes an unsubscribe link.</p>
    <input name="website" aria-hidden="true" tabIndex={-1} autoComplete="off" className="hidden" />
    <div><input id="newsletter-email" name="email" type="email" maxLength={254} autoComplete="email" placeholder="Email address" required aria-describedby="newsletter-feedback" />
      <button type="submit" disabled={busy || !token}>{busy ? 'Submitting…' : 'Send confirmation email'}</button></div>
    <label className="newsletter-consent"><input name="consent" type="checkbox" required /> I want the weekly brief. <Link href="/privacy">Privacy</Link></label>
    <AntiSpamChallenge key={challengeKey} action="newsletter" onToken={setToken} />
    <span id="newsletter-feedback" role={error ? 'alert' : 'status'} aria-live="polite">{feedback}</span>
    <p>Already signed up? Use the link in your confirmation email or a previous brief. <Link href="/contact?requestType=other">Get help or request removal</Link>. <a href="/rss">RSS is always available</a>.</p>
    <noscript>Email signup requires JavaScript for the anti-spam check. Use RSS or contact us for help.</noscript>
  </form>;
}
