'use client';

import { track } from '@vercel/analytics';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getNewsletterConfig, validateNewsletterSignup } from '@/lib/newsletter-config.mjs';
import { growthBatchForPath, newsletterBatch } from '@/lib/growth-batches.mjs';
import NewsletterApiForm from './NewsletterApiForm';

type NewsletterConfig = NonNullable<ReturnType<typeof getNewsletterConfig>>;

const newsletterConfig = getNewsletterConfig(
  process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT,
  process.env.NEXT_PUBLIC_NEWSLETTER_VERIFIED_ON,
  process.env.NEXT_PUBLIC_NEWSLETTER_UNSUBSCRIBE_URL,
);

function NewsletterUnavailable() {
  return (
    <section id="newsletter-signup" className="newsletter-form newsletter-form-unavailable" aria-labelledby="newsletter-unavailable-title">
      <h2 id="newsletter-unavailable-title" className="newsletter-form-title">Newsletter is not open yet</h2>
      <p>The weekly tactile robotics research brief is being prepared. No email address is collected here while signup is unavailable.</p>
      <div className="newsletter-form-links">
        <a href="/rss">
          Follow research updates via RSS <span aria-hidden="true">↗</span>
        </a>
      </div>
      <span role="status">Use the RSS feed for current research and news updates.</span>
    </section>
  );
}

function NewsletterProviderForm({ config }: { config: NewsletterConfig }) {
  const pathname = usePathname();
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('Confirm your address with Buttondown to complete signup.');
  const inFlight = useRef(false);
  useEffect(() => {
    const reset = () => { inFlight.current = false; setSubmitting(false); };
    window.addEventListener('pageshow', reset);
    return () => window.removeEventListener('pageshow', reset);
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const error = validateNewsletterSignup(data.get('email'), data.get('consent') === 'on', data.get('website'));
    if (error || inFlight.current) {
      event.preventDefault();
      if (error) setFeedback(error);
      return;
    }
    inFlight.current = true;
    track('Newsletter Subscribe Attempt', {
      placement: 'footer',
      destination: 'provider',
      path: pathname,
      batch: newsletterBatch,
      source_batch: growthBatchForPath(pathname),
    });
    setSubmitting(true);
    setFeedback(`Opening signup at ${config.providerHost}…`);
    track('Newsletter Provider Handoff', { placement: 'footer', provider_domain: config.providerHost, path: pathname, batch: newsletterBatch, source_batch: growthBatchForPath(pathname) });
  }

  return (
    <form
      id="newsletter-signup"
      className="newsletter-form"
      action={config.endpoint}
      method="post"
      onSubmit={handleSubmit}
    >
      <label htmlFor="newsletter-email">Weekly Tactile Robotics Research Brief</label>
      <p>
        One concise email with new tactile research and evidence boundaries. Signup is processed by {config.providerHost};
        follow the provider&apos;s next step to complete signup. This page does not mark an address as subscribed.
      </p>
      <div>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          maxLength={254}
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
      <label className="newsletter-consent"><input type="checkbox" name="consent" required /> I agree to receive the weekly brief. Unsubscribe using the link in each email.</label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" hidden aria-hidden="true" />
      <p><a href={config.unsubscribeUrl}>Manage or cancel your subscription at Buttondown</a>. Existing subscribers are handled by the provider; submitting this form does not confirm a new subscription.</p>
      <span id="newsletter-feedback" role="status" aria-live="polite">
        {feedback}
      </span>
    </form>
  );
}

export default function NewsletterSignup() {
  if (process.env.NEXT_PUBLIC_NEWSLETTER_API_ENABLED === 'true') return <NewsletterApiForm />;
  if (!newsletterConfig) return <NewsletterUnavailable />;
  return <NewsletterProviderForm config={newsletterConfig} />;
}
