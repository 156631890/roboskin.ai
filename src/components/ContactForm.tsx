'use client';

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { site } from '@/content/site';

type ContactFormState = {
  fullName: string;
  company: string;
  email: string;
  useCase: string;
  message: string;
  timeline: string;
  phone: string;
  requestType: string;
  requestedAsset: string;
  website: string;
};

const initialState = (requestType = 'general', requestedAsset = ''): ContactFormState => ({
  fullName: '',
  company: '',
  email: '',
  useCase: '',
  message: '',
  timeline: '',
  phone: '',
  requestType,
  requestedAsset,
  website: '',
});

type ContactFormProps = {
  requestType?: string;
  requestedAsset?: string;
};

export default function ContactForm({ requestType, requestedAsset }: ContactFormProps) {
  const searchParams = useSearchParams();
  const effectiveRequestType = requestType ?? searchParams.get('requestType') ?? 'general';
  const effectiveRequestedAsset = requestedAsset ?? searchParams.get('requestedAsset') ?? '';

  const [form, setForm] = useState<ContactFormState>(initialState(effectiveRequestType, effectiveRequestedAsset));
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  function updateField(field: keyof ContactFormState, value: string) {
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

    setStatus('submitting');
    setFeedback('');

    const response = await fetch('/api/contact', {
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
        <label className="grid gap-2 text-sm text-slate-200">
          Full name
          <input
            required
            value={form.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            className="rounded-xl border border-cyan-200/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Company / Organization
          <input
            required
            value={form.company}
            onChange={(event) => updateField('company', event.target.value)}
            className="rounded-xl border border-cyan-200/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Work email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="rounded-xl border border-cyan-200/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Use case
          <input
            required
            value={form.useCase}
            onChange={(event) => updateField('useCase', event.target.value)}
            placeholder="Robotic gripper, humanoid hand, prosthetic..."
            className="rounded-xl border border-cyan-200/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-200">
          Timeline
          <input
            value={form.timeline}
            onChange={(event) => updateField('timeline', event.target.value)}
            placeholder="Prototype this quarter, production next year..."
            className="rounded-xl border border-cyan-200/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Phone
          <input
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="rounded-xl border border-cyan-200/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-slate-200">
        Message
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          className="rounded-xl border border-cyan-200/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-200">
          Request type
          <select
            value={form.requestType}
            onChange={(event) => updateField('requestType', event.target.value)}
            className="rounded-xl border border-cyan-200/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
          >
            <option value="general">General</option>
            <option value="demo">Demo</option>
            <option value="datasheet">Datasheet</option>
            <option value="integration">Integration</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Requested asset
          <input
            value={form.requestedAsset}
            onChange={(event) => updateField('requestedAsset', event.target.value)}
            placeholder="RS-1000 Sensor Array"
            className="rounded-xl border border-cyan-200/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-6 py-3 text-sm font-bold text-slate-950 transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? 'Sending...' : 'Send request'}
      </button>

      <div className="min-h-6 text-sm">
        {feedback && (
          <p className={status === 'error' ? 'text-rose-300' : 'text-cyan-100'}>
            {feedback}
          </p>
        )}
      </div>

      <p className="text-sm text-slate-300">
        For direct inquiries: <a className="text-cyan-200" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
      </p>
    </form>
  );
}
