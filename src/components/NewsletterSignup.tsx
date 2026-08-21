'use client';

import { track } from '@vercel/analytics';
import { useState } from 'react';
import { parseNewsletterEndpoint } from '@/lib/newsletter-config.mjs';

type NewsletterConfig = NonNullable<ReturnType<typeof parseNewsletterEndpoint>>;

const newsletterConfig = parseNewsletterEndpoint(process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT);

function NewsletterUnavailable() {
  return (
    <section className="newsletter-form newsletter-form-unavailable" aria-labelledby="newsletter-unavailable-title">
      <h2 id="newsletter-unavailable-title" className="newsletter-form-title">Newsletter is not open yet</h2>
      <p>We are preparing the research brief. No email address is collected here while signup is unavailable.</p>
      <div className="newsletter-form-links">
        <a href="/feed.xml" type="application/rss+xml">
          Follow research updates via RSS <span aria-hidden="true">↗</span>
        </a>
      </div>
      <span role="status">Use the RSS feed for current research and news updates.</span>
    </section>
  );
}

function NewsletterProviderForm({ config }: { config: NewsletterConfig }) {
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('No subscription is counted on this page alone.');

  function handleSubmit() {
    track('Newsletter Subscribe Attempt', {
      placement: 'footer',
      destination: 'provider',
    });
    setSubmitting(true);
    setFeedback(`Opening signup at ${config.providerHost}…`);
    track('Newsletter Provider Handoff', { placement: 'footer', provider_domain: config.providerHost });
  }

  return (
    <form
      className="newsletter-form"
      action={config.endpoint}
      method="post"
      onSubmit={handleSubmit}
    >
      <label htmlFor="newsletter-email">Weekly Robotics Research Brief</label>
      <p>
        One concise email with new tactile research and evidence boundaries. Signup is processed by {config.providerHost};
        follow the provider&apos;s next step to complete signup. This page does not mark an address as subscribed.
      </p>
      <div>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Work email"
          aria-describedby="newsletter-feedback"
        />
        <input type="hidden" name="embed" value="1" />
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

export default function NewsletterSignup() {
  if (!newsletterConfig) return <NewsletterUnavailable />;
  return <NewsletterProviderForm config={newsletterConfig} />;
}
