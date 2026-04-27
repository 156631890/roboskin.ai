'use client';

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { site } from '@/content/site';

type ContactFormState = {
  fullName: string;
  company: string;
  email: string;
  robotPlatform: string;
  targetSurface: string;
  useCase: string;
  interfaceNeeds: string;
  message: string;
  timeline: string;
  phone: string;
  requestType: string;
  requestedAsset: string;
  website: string;
  consent: boolean;
};

const initialState = (requestType = 'general', requestedAsset = ''): ContactFormState => ({
  fullName: '',
  company: '',
  email: '',
  robotPlatform: '',
  targetSurface: '',
  useCase: '',
  interfaceNeeds: '',
  message: '',
  timeline: '',
  phone: '',
  requestType,
  requestedAsset,
  website: '',
  consent: false,
});

type ContactFormProps = {
  requestType?: string;
  requestedAsset?: string;
};

const contactFormEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

function displayValue(value: string) {
  return value.trim() || 'Not provided';
}

function buildMailtoHref(form: ContactFormState) {
  const subject = `RoboSkin ${form.requestType} request from ${form.company || form.fullName}`;
  const body = [
    `Full name: ${form.fullName}`,
    `Company / organization: ${form.company}`,
    `Work email: ${form.email}`,
    `Phone: ${displayValue(form.phone)}`,
    `Request type: ${form.requestType}`,
    `Requested asset: ${displayValue(form.requestedAsset)}`,
    `Robot platform: ${displayValue(form.robotPlatform)}`,
    `Target surface: ${displayValue(form.targetSurface)}`,
    `Use case: ${displayValue(form.useCase)}`,
    `Interface needs: ${displayValue(form.interfaceNeeds)}`,
    `Timeline: ${displayValue(form.timeline)}`,
    '',
    'Message:',
    form.message,
  ].join('\n');

  return `mailto:${site.contact.primaryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm({ requestType, requestedAsset }: ContactFormProps) {
  const searchParams = useSearchParams();
  const effectiveRequestType = requestType ?? searchParams.get('requestType') ?? 'general';
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
      setFeedback(`Your email client should open a prepared message to ${site.contact.primaryEmail}.`);
      return;
    }

    try {
      const response = await fetch(contactFormEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setStatus('error');
        setFeedback('Something went wrong. Please email us at ' + site.contact.primaryEmail + '.');
        return;
      }

      setStatus('success');
      setFeedback('Thanks. We received your request and will reply within 2 business days.');
      setForm(initialState(effectiveRequestType, effectiveRequestedAsset));
    } catch {
      setStatus('error');
      setFeedback('The form could not connect. Please email us at ' + site.contact.primaryEmail + '.');
    }
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

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-soft">Start with the essentials</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Route your RoboSkin.ai inquiry</h2>
        <p className="mt-2 text-sm leading-relaxed text-soft">
          A short request is enough to begin. Add project details only when they help route a brief, partnership, or strategic conversation.
        </p>
      </div>

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
        <label className="grid gap-2 text-sm text-soft">
          Request type
          <select
            value={form.requestType}
            onChange={(event) => updateField('requestType', event.target.value)}
            className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
          >
            <option value="general">General</option>
            <option value="brief">Brief / report request</option>
            <option value="partnership">Partnership / sponsorship</option>
            <option value="acquisition">Strategic acquisition</option>
            <option value="demo">Demo</option>
            <option value="datasheet">Datasheet</option>
            <option value="integration">Integration</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm text-soft">
        Message
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          placeholder="Tell us whether you want the brief, a partnership discussion, sponsorship, research collaboration, or a strategic acquisition conversation."
          className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
        />
      </label>

      <details className="rounded-2xl border border-white/8 bg-[#0d1016] p-4">
        <summary className="cursor-pointer text-sm font-semibold text-white">Project details <span className="font-normal text-soft">(optional)</span></summary>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-soft">
            Requested asset
            <input
              value={form.requestedAsset}
              onChange={(event) => updateField('requestedAsset', event.target.value)}
              placeholder="State of Tactile AI, Humanoid Tactile Stack Map, RoboSkin Index..."
              className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </label>
          <label className="grid gap-2 text-sm text-soft">
            Phone
            <input
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </label>
          <label className="grid gap-2 text-sm text-soft">
            Robot platform
            <input
              value={form.robotPlatform}
              onChange={(event) => updateField('robotPlatform', event.target.value)}
              placeholder="Humanoid hand, gripper, cobot arm..."
              className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </label>
          <label className="grid gap-2 text-sm text-soft">
            Target surface
            <input
              value={form.targetSurface}
              onChange={(event) => updateField('targetSurface', event.target.value)}
              placeholder="Fingertips, palm, curved shell, gripper pads..."
              className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </label>
          <label className="grid gap-2 text-sm text-soft">
            Use case
            <input
              value={form.useCase}
              onChange={(event) => updateField('useCase', event.target.value)}
              placeholder="Industry report, robot hand, tactile dataset, strategic acquisition..."
              className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </label>
          <label className="grid gap-2 text-sm text-soft">
            Interface / SDK needs
            <input
              value={form.interfaceNeeds}
              onChange={(event) => updateField('interfaceNeeds', event.target.value)}
              placeholder="ROS 2, Python, C++, logging, replay..."
              className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </label>
          <label className="grid gap-2 text-sm text-soft md:col-span-2">
            Timeline
            <input
              value={form.timeline}
              onChange={(event) => updateField('timeline', event.target.value)}
              placeholder="Prototype this quarter, production next year..."
              className="rounded-xl border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 text-white outline-none transition placeholder:text-[#6f7786] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </label>
        </div>
      </details>

      <label className="flex items-start gap-3 rounded-2xl border border-white/8 bg-[#0d1016] p-4 text-sm leading-relaxed text-soft">
        <input
          required
          type="checkbox"
          checked={form.consent}
          onChange={(event) => updateField('consent', event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-[var(--bg-soft)]"
        />
        <span>
          RoboSkin may contact me about this request and use the details above to route it to the right research, partnership, or strategic contact.
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
        For direct inquiries: <a className="text-accent hover:text-[#7dd3fc]" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
      </p>
    </form>
  );
}
