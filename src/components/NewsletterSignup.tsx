'use client';

import { track } from '@vercel/analytics';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { site } from '@/content/site';

const newsletterEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

function buildWhatsAppSubscriptionHref(email: string) {
  const message = [
    'RoboSkin.ai Weekly Robotics Research Brief request',
    '',
    `Subscriber email: ${email}`,
    'Please add this address to the research brief list.',
  ].join('\n');

  return `https://wa.me/${site.contact.whatsappDial}?text=${encodeURIComponent(message)}`;
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setFeedback('');
    track('Newsletter Submit', { placement: 'footer' });

    if (!newsletterEndpoint) {
      window.location.href = buildWhatsAppSubscriptionHref(email);
      setStatus('success');
      setFeedback('WhatsApp should open a prepared subscription request. Review it there before sending.');
      track('Newsletter WhatsApp Open', { placement: 'footer' });
      return;
    }

    try {
      const response = await fetch(newsletterEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Newsletter subscriber',
          company: 'RoboSkin.ai reader',
          email,
          phone: '',
          requestType: 'newsletter',
          requestedAsset: 'Weekly Robotics Research Brief',
          budgetSignal: 'Footer newsletter form',
          intendedUse: 'Weekly robotics research updates',
          website: '',
          message: 'Newsletter subscription request',
          consent: true,
        }),
      });

      if (!response.ok) throw new Error('Subscription endpoint returned an error');

      setEmail('');
      setStatus('success');
      setFeedback('Subscription request received.');
      track('Newsletter Success', { placement: 'footer' });
    } catch {
      window.location.href = buildWhatsAppSubscriptionHref(email);
      setStatus('success');
      setFeedback('WhatsApp should open a prepared subscription request. Review it there before sending.');
      track('Newsletter WhatsApp Open', { placement: 'footer' });
    }
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email">Weekly Robotics Research Brief</label>
      <p>One concise email: new tactile research, evidence boundaries, and the pages worth reading.</p>
      <div>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Work email"
          aria-describedby="newsletter-feedback"
        />
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting…' : 'Subscribe'}
        </button>
      </div>
      <span id="newsletter-feedback" role={status === 'error' ? 'alert' : 'status'}>
        {feedback || 'No spam. Unsubscribe by email or message at any time.'}
      </span>
    </form>
  );
}
