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
      setFeedback('Something went wrong. Please email us at ' + site.contact.directEmail + '.');
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
        <label className="grid gap-2 text-sm text-[#4f5560]">
          Full name
          <input
            required
            value={form.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            className="rounded-xl border border-[#d9d3c8] bg-[#fbfaf7] px-4 py-3 text-[#111318] outline-none transition placeholder:text-[#8b9099] focus:border-[#c8d5ff] focus:ring-2 focus:ring-[#c8d5ff]/50"
          />
        </label>
        <label className="grid gap-2 text-sm text-[#4f5560]">
          Company / Organization
          <input
            required
            value={form.company}
            onChange={(event) => updateField('company', event.target.value)}
            className="rounded-xl border border-[#d9d3c8] bg-[#fbfaf7] px-4 py-3 text-[#111318] outline-none transition placeholder:text-[#8b9099] focus:border-[#c8d5ff] focus:ring-2 focus:ring-[#c8d5ff]/50"
          />
        </label>
        <label className="grid gap-2 text-sm text-[#4f5560]">
          Work email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="rounded-xl border border-[#d9d3c8] bg-[#fbfaf7] px-4 py-3 text-[#111318] outline-none transition placeholder:text-[#8b9099] focus:border-[#c8d5ff] focus:ring-2 focus:ring-[#c8d5ff]/50"
          />
        </label>
        <label className="grid gap-2 text-sm text-[#4f5560]">
          Use case
          <input
            required
            value={form.useCase}
            onChange={(event) => updateField('useCase', event.target.value)}
            placeholder="Robotic gripper, humanoid hand, prosthetic..."
            className="rounded-xl border border-[#d9d3c8] bg-[#fbfaf7] px-4 py-3 text-[#111318] outline-none transition placeholder:text-[#8b9099] focus:border-[#c8d5ff] focus:ring-2 focus:ring-[#c8d5ff]/50"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-[#4f5560]">
          Timeline
          <input
            value={form.timeline}
            onChange={(event) => updateField('timeline', event.target.value)}
            placeholder="Prototype this quarter, production next year..."
            className="rounded-xl border border-[#d9d3c8] bg-[#fbfaf7] px-4 py-3 text-[#111318] outline-none transition placeholder:text-[#8b9099] focus:border-[#c8d5ff] focus:ring-2 focus:ring-[#c8d5ff]/50"
          />
        </label>
        <label className="grid gap-2 text-sm text-[#4f5560]">
          Phone
          <input
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="rounded-xl border border-[#d9d3c8] bg-[#fbfaf7] px-4 py-3 text-[#111318] outline-none transition placeholder:text-[#8b9099] focus:border-[#c8d5ff] focus:ring-2 focus:ring-[#c8d5ff]/50"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-[#4f5560]">
        Message
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          className="rounded-xl border border-[#d9d3c8] bg-[#fbfaf7] px-4 py-3 text-[#111318] outline-none transition placeholder:text-[#8b9099] focus:border-[#c8d5ff] focus:ring-2 focus:ring-[#c8d5ff]/50"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-[#4f5560]">
          Request type
          <select
            value={form.requestType}
            onChange={(event) => updateField('requestType', event.target.value)}
            className="rounded-xl border border-[#d9d3c8] bg-[#fbfaf7] px-4 py-3 text-[#111318] outline-none transition focus:border-[#c8d5ff] focus:ring-2 focus:ring-[#c8d5ff]/50"
          >
            <option value="general">General</option>
            <option value="demo">Demo</option>
            <option value="datasheet">Datasheet</option>
            <option value="integration">Integration</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm text-[#4f5560]">
          Requested asset
          <input
            value={form.requestedAsset}
            onChange={(event) => updateField('requestedAsset', event.target.value)}
            placeholder="RS-1000 Sensor Array"
            className="rounded-xl border border-[#d9d3c8] bg-[#fbfaf7] px-4 py-3 text-[#111318] outline-none transition placeholder:text-[#8b9099] focus:border-[#c8d5ff] focus:ring-2 focus:ring-[#c8d5ff]/50"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex rounded-xl bg-[#2e5bff] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(46,91,255,0.18)] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? 'Sending...' : 'Send request'}
      </button>

      <div className="min-h-6 text-sm">
        {feedback && (
          <p className={status === 'error' ? 'text-rose-600' : 'text-[#2446c8]'}>
            {feedback}
          </p>
        )}
      </div>

      <p className="text-sm text-[#4f5560]">
        For direct inquiries: <a className="text-[#2e5bff] hover:text-[#2446c8]" href={`mailto:${site.contact.directEmail}`}>{site.contact.directEmail}</a>
      </p>
    </form>
  );
}
