'use client';

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { site } from '@/content/site';

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

function buildMailtoHref(form: ContactFormState) {
  const subject = `RoboSkin.ai ${form.requestType} note from ${form.company || form.fullName}`;
  const body = [
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

  return `mailto:${site.contact.ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm({ requestType, requestedAsset }: ContactFormProps) {
  const searchParams = useSearchParams();
  const effectiveRequestType = normalizeRequestType(requestType ?? searchParams.get('requestType'));
  const effectiveRequestedAsset = requestedAsset ?? searchParams.get('requestedAsset') ?? '';

  const [form, setForm] = useState<ContactFormState>(initialState(effectiveRequestType, effectiveRequestedAsset));
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  function updateField<K extends keyof ContactFormState>(field: K, value: ContactFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  useEffect(() => {
    setForm(initialState(effectiveRequestType, effectiveRequestedAsset));
  }, [effectiveRequestType, effectiveRequestedAsset]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.website) {
      setStatus('success');
      setFeedback('Thanks. We received your request and will reply within 2 business days.');
      return;
    }

    if (!form.consent) {
      setStatus('error');
      setFeedback('Please confirm that RoboSkin may contact you about this request.');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    if (!contactFormEndpoint) {
      window.location.href = buildMailtoHref(form);
      setStatus('success');
      setFeedback(`Your email client should open a prepared message to ${site.contact.ownerEmail}.`);
      return;
    }

    let response: Response;

    try {
      response = await fetch(contactFormEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
    } catch (error) {
      void error;
      window.location.href = buildMailtoHref(form);
      setStatus('success');
      setFeedback(`Your email client should open a prepared message to ${site.contact.ownerEmail}.`);
      return;
    }

    if (!response.ok) {
      setStatus('error');
      setFeedback('Something went wrong. Please email us at ' + site.contact.primaryEmail + '.');
      return;
    }

    setStatus('success');
    setFeedback('Thanks. We received your request and will reply within 2 business days.');
    setForm(initialState(effectiveRequestType, effectiveRequestedAsset));
  }

  return (
    <form className="glass-card space-y-5 p-6 md:p-8" onSubmit={handleSubmit}>
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

      <label className="flex items-start gap-3 rounded-2xl border border-white/8 bg-[#0d1016] p-4 text-sm leading-relaxed text-soft">
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

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? 'Sending...' : 'Send request'}
      </button>

      <div className="min-h-6 text-sm" role={status === 'error' ? 'alert' : 'status'} aria-live="polite">
        {feedback && (
          <p className={status === 'error' ? 'text-rose-400' : 'text-[#7dd3fc]'}>
            {feedback}
          </p>
        )}
      </div>

      <p className="text-sm text-soft">
        For direct inquiries: <a className="text-accent hover:text-[#7dd3fc]" href={`mailto:${site.contact.ownerEmail}`}>{site.contact.ownerEmail}</a>
      </p>
    </form>
  );
}

