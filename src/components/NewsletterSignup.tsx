'use client';

import { track } from '@vercel/analytics';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { site } from '@/content/site';

const newsletterEndpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

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
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('Confirm by email. Unsubscribe at any time.');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    track('Newsletter Submit', {
      placement: 'footer',
      destination: newsletterEndpoint ? 'buttondown' : 'whatsapp',
    });

    if (!newsletterEndpoint) {
      event.preventDefault();
      window.location.href = buildWhatsAppSubscriptionHref(email);
      setFeedback('WhatsApp should open a prepared subscription request. Review it there before sending.');
      track('Newsletter WhatsApp Open', { placement: 'footer' });
      return;
    }

    setSubmitting(true);
    setFeedback('Opening the secure email-confirmation step…');
    track('Newsletter Provider Handoff', { placement: 'footer', provider: 'buttondown' });
  }

  return (
    <form
      className="newsletter-form"
      action={newsletterEndpoint || undefined}
      method={newsletterEndpoint ? 'post' : undefined}
      onSubmit={handleSubmit}
    >
      <label htmlFor="newsletter-email">Weekly Robotics Research Brief</label>
      <p>One concise email: new tactile research, evidence boundaries, and the pages worth reading.</p>
      <div>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Work email"
          aria-describedby="newsletter-feedback"
        />
        {newsletterEndpoint && <input type="hidden" name="embed" value="1" />}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Opening…' : 'Subscribe'}
        </button>
      </div>
      <span id="newsletter-feedback" role="status" aria-live="polite">
        {feedback}
      </span>
    </form>
  );
}
