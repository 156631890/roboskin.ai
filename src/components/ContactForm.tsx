'use client';

import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { track } from '@vercel/analytics';
import { site } from '@/content/site';
import AntiSpamChallenge from '@/components/AntiSpamChallenge';
import { parseContactEndpoint, submitInquiry } from '@/lib/form-delivery.mjs';

type RequestType = 'partnership' | 'research' | 'correction' | 'other';

type ContactFormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  requestType: RequestType;
  requestedAsset: string;
  budgetSignal: string;
  intendedUse: string;
  website: string;
  message: string;
  consent: boolean;
};

const initialState = (requestType: RequestType = 'research', requestedAsset = ''): ContactFormState => ({
  fullName: '',
  company: '',
  email: '',
  phone: '',
  requestType,
  requestedAsset,
  budgetSignal: '',
  intendedUse: '',
  website: '',
  message: '',
  consent: false,
});

type ContactFormProps = {
  requestType?: string;
  requestedAsset?: string;
};

const contactFormEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
const onlineDeliveryAvailable = Boolean(parseContactEndpoint(contactFormEndpoint));

function normalizeRequestType(value: string | null | undefined, fallback: RequestType = 'research'): RequestType {
  if (!value) {
    return fallback;
  }

  switch (value) {
    case 'partnership':
    case 'research':
    case 'correction':
    case 'other':
      return value;
    case 'datasheet':
      return 'research';
    case 'integration':
    case 'demo':
      return 'partnership';
    case 'general':
      return 'research';
    default:
      return 'other';
  }
}

function displayValue(value: string) {
  return value.trim() || 'Not provided';
}

function buildMessage(form: ContactFormState) {
  return [
    `RoboSkin.ai ${form.requestType} note`,
    '',
    `Full name: ${form.fullName}`,
    `Company / organization: ${form.company}`,
    `Work email: ${form.email}`,
    `Phone: ${form.phone || 'Not provided'}`,
    `Request type: ${form.requestType}`,
    `Requested asset: ${displayValue(form.requestedAsset)}`,
    `Source / context: ${form.budgetSignal || 'Not provided'}`,
    `Intended use: ${form.intendedUse || 'Not provided'}`,
    '',
    'Message:',
    form.message,
  ].join('\n');

}

function buildWhatsAppHref(form: ContactFormState) {
  return `https://wa.me/${site.contact.whatsappDial}?text=${encodeURIComponent(buildMessage(form))}`;
}

export default function ContactForm({ requestType, requestedAsset }: ContactFormProps) {
  const searchParams = useSearchParams();
  const effectiveRequestType = normalizeRequestType(requestType ?? searchParams.get('requestType'));
  const effectiveRequestedAsset = requestedAsset ?? searchParams.get('requestedAsset') ?? '';

  const [form, setForm] = useState<ContactFormState>(initialState(effectiveRequestType, effectiveRequestedAsset));
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const inFlight = useRef(false);
  const [challengeToken, setChallengeToken] = useState('');
  const [challengeKey, setChallengeKey] = useState(0);

  function updateField<K extends keyof ContactFormState>(field: K, value: ContactFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  useEffect(() => {
    setForm(initialState(effectiveRequestType, effectiveRequestedAsset));
  }, [effectiveRequestType, effectiveRequestedAsset]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus('submitting');
    setFeedback('');
    track('Contact Form Submit', { request_type: form.requestType });
    try {
      const result = await submitInquiry(contactFormEndpoint, { ...form, challengeToken });
      if (!result.ok) {
        setStatus('error');
        setFeedback(result.error ?? 'Delivery could not be confirmed. Please use a direct contact link.');
        return;
      }
      setStatus('success');
      setFeedback('The delivery service accepted your inquiry. We aim to reply within two business days; this acknowledgement does not confirm inbox delivery.');
      track('Contact Form Success', { request_type: form.requestType });
      setForm(initialState(effectiveRequestType, effectiveRequestedAsset));
    } finally { inFlight.current = false; setChallengeToken(''); setChallengeKey(key => key + 1); }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {!onlineDeliveryAvailable && <p className="text-sm text-soft" role="note">Online sending is unavailable. You can prepare your note below, then review and send it using the email or WhatsApp link. Filling in this form does not send a message.</p>}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        name="website"
        value={form.website}
        onChange={(event) => updateField('website', event.target.value)}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-soft">
          Full name
          <input
            required
            value={form.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </label>
        <label className="grid gap-2 text-sm text-soft">
          Company / Organization
          <input
            required
            value={form.company}
            onChange={(event) => updateField('company', event.target.value)}
            className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </label>
        <label className="grid gap-2 text-sm text-soft">
          Work email
          <input
            required
            maxLength={254}
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-soft">
          Requested asset
          <input
            value={form.requestedAsset}
            onChange={(event) => updateField('requestedAsset', event.target.value)}
            placeholder="Article, source, correction, or topic..."
            className="rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-3 text-[var(--text)] outline-none transition placeholder:text-[#8b8378] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </label>
        <label className="grid gap-2 text-sm text-soft">
          Intended use
          <input
            value={form.intendedUse}
            onChange={(event) => updateField('intendedUse', event.target.value)}
            placeholder="Lab project, article, research note, or page topic..."
            className="rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-3 text-[var(--text)] outline-none transition placeholder:text-[#8b8378] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </label>
        <label className="grid gap-2 text-sm text-soft">
          Source / context
          <input
            value={form.budgetSignal}
            onChange={(event) => updateField('budgetSignal', event.target.value)}
            placeholder="Source URL, correction context, timeline, or partnership scope"
            className="rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-3 text-[var(--text)] outline-none transition placeholder:text-[#8b8378] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-soft">
          Phone
          <input
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-soft">
        Message
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-soft">
          Request type
          <select
            value={form.requestType}
            onChange={(event) => updateField('requestType', normalizeRequestType(event.target.value))}
            className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
          >
            <option value="research">Research / information request</option>
            <option value="correction">Correction or source suggestion</option>
            <option value="partnership">Editorial collaboration</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>

      <label className="contact-consent">
        <input
          required
          type="checkbox"
          checked={form.consent}
          onChange={(event) => updateField('consent', event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-[var(--bg-soft)]"
        />
        <span>
          RoboSkin may contact me about this research note, correction, collaboration, or general request and use the details above to route the message appropriately.
        </span>
      </label>

      {contactFormEndpoint === '/api/contact' ? <AntiSpamChallenge key={challengeKey} action="contact" onToken={setChallengeToken} /> : null}
      <button
        type="submit"
        disabled={!onlineDeliveryAvailable || status === 'submitting'}
        className="btn-primary"
      >
        {status === 'submitting' ? 'Sending...' : 'Send request'}
      </button>

      <div className="min-h-6 text-sm" role={status === 'error' ? 'alert' : 'status'} aria-live="polite">
        {feedback && (
          <p className={status === 'error' ? 'text-rose-400' : 'text-[#ff9b73]'}>
            {feedback}
          </p>
        )}
      </div>

      <p className="text-sm text-soft">
        Review your prepared note in <a className="text-accent hover:text-[#ff9b73]" href={`mailto:${site.contact.inquiryEmail}?subject=${encodeURIComponent('RoboSkin research inquiry')}&body=${encodeURIComponent(buildMessage(form))}`}>your email app</a> or <a className="text-accent hover:text-[#ff9b73]" href={buildWhatsAppHref(form)} target="_blank" rel="noreferrer">WhatsApp {site.contact.whatsapp}</a>. You choose when to send it there.
      </p>
    </form>
  );
}

