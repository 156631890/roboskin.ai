'use client';

import { track } from '@vercel/analytics';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { site } from '@/content/site';

type InquiryState = {
  fullName: string;
  company: string;
  email: string;
  role: string;
  projectType: string;
  robotPlatform: string;
  researchQuestion: string;
  timeline: string;
  budget: string;
  ndaRequired: boolean;
  website: string;
  consent: boolean;
};

const emptyInquiry: InquiryState = {
  fullName: '',
  company: '',
  email: '',
  role: '',
  projectType: 'RoboSkin Research Sprint',
  robotPlatform: '',
  researchQuestion: '',
  timeline: 'Within 2 weeks',
  budget: 'US$1,500 pilot Sprint',
  ndaRequired: false,
  website: '',
  consent: false,
};

const contactFormEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

function buildMailtoHref(form: InquiryState) {
  const body = [
    `Name: ${form.fullName}`,
    `Company: ${form.company}`,
    `Work email: ${form.email}`,
    `Role: ${form.role || 'Not provided'}`,
    `Project: ${form.projectType}`,
    `Robot / sensor platform: ${form.robotPlatform || 'Not provided'}`,
    `Timeline: ${form.timeline}`,
    `Budget: ${form.budget}`,
    `NDA requested: ${form.ndaRequired ? 'Yes' : 'No'}`,
    '',
    'Decision question:',
    form.researchQuestion,
  ].join('\n');

  return `mailto:${site.contact.inquiryEmail}?subject=${encodeURIComponent('RoboSkin Research Sprint inquiry')}&body=${encodeURIComponent(body)}`;
}

export default function CommercialInquiryForm() {
  const [form, setForm] = useState<InquiryState>(emptyInquiry);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  function updateField<K extends keyof InquiryState>(field: K, value: InquiryState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function openEmailFallback() {
    window.location.href = buildMailtoHref(form);
    setStatus('success');
    setFeedback('Your email app should open with the inquiry prepared. Review it there before sending.');
    track('Research Services Email Fallback', { project_type: form.projectType });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.website) {
      setStatus('success');
      setFeedback('Thanks. We received your inquiry and will reply within 2 business days.');
      return;
    }

    if (!form.consent) {
      setStatus('error');
      setFeedback('Please confirm that RoboSkin.ai may contact you about this inquiry.');
      return;
    }

    setStatus('submitting');
    setFeedback('');
    track('Research Services Form Submit', {
      project_type: form.projectType,
      timeline: form.timeline,
      budget: form.budget,
    });

    if (!contactFormEndpoint) {
      openEmailFallback();
      return;
    }

    try {
      const response = await fetch(contactFormEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          requestType: 'commercial-research',
          formName: 'RoboSkin Research Services',
          _subject: 'New RoboSkin Research Sprint inquiry',
        }),
      });

      if (!response.ok) {
        openEmailFallback();
        return;
      }
    } catch (error) {
      void error;
      openEmailFallback();
      return;
    }

    setStatus('success');
    setFeedback('Thanks. We received your inquiry and will reply within 2 business days with fit and scope.');
    track('Research Services Form Success', { project_type: form.projectType });
    setForm(emptyInquiry);
  }

  return (
    <form className="commercial-inquiry-form" onSubmit={handleSubmit}>
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        name="website"
        value={form.website}
        onChange={(event) => updateField('website', event.target.value)}
      />

      <div className="commercial-form-grid">
        <label>
          Full name
          <input required autoComplete="name" value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} />
        </label>
        <label>
          Company or lab
          <input required autoComplete="organization" value={form.company} onChange={(event) => updateField('company', event.target.value)} />
        </label>
        <label>
          Work email
          <input required type="email" autoComplete="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
        </label>
        <label>
          Role
          <input autoComplete="organization-title" value={form.role} onChange={(event) => updateField('role', event.target.value)} placeholder="Engineering, product, strategy, investment..." />
        </label>
        <label>
          Research product
          <select value={form.projectType} onChange={(event) => updateField('projectType', event.target.value)}>
            <option>RoboSkin Research Sprint</option>
            <option>Tactile dataset and benchmark scan</option>
            <option>Sensor, hand, or company landscape</option>
            <option>Custom tactile intelligence project</option>
          </select>
        </label>
        <label>
          Robot or sensor platform
          <input value={form.robotPlatform} onChange={(event) => updateField('robotPlatform', event.target.value)} placeholder="Optional" />
        </label>
        <label>
          Preferred timeline
          <select value={form.timeline} onChange={(event) => updateField('timeline', event.target.value)}>
            <option>Within 2 weeks</option>
            <option>Within 1 month</option>
            <option>Within 1 quarter</option>
            <option>Exploring only</option>
          </select>
        </label>
        <label>
          Budget range
          <select value={form.budget} onChange={(event) => updateField('budget', event.target.value)}>
            <option>US$1,500 pilot Sprint</option>
            <option>US$1,500 to US$5,000</option>
            <option>US$5,000 to US$15,000</option>
            <option>Scope before budget</option>
          </select>
        </label>
      </div>

      <label>
        What decision should the research support?
        <textarea
          required
          rows={6}
          value={form.researchQuestion}
          onChange={(event) => updateField('researchQuestion', event.target.value)}
          placeholder="Describe the decision, the evidence you already have, and the output your team needs."
        />
      </label>

      <label className="commercial-checkbox">
        <input type="checkbox" checked={form.ndaRequired} onChange={(event) => updateField('ndaRequired', event.target.checked)} />
        <span>An NDA is required before sharing detailed project context.</span>
      </label>

      <label className="commercial-checkbox">
        <input required type="checkbox" checked={form.consent} onChange={(event) => updateField('consent', event.target.checked)} />
        <span>RoboSkin.ai may use these details to assess fit, prepare scope, and contact me about this inquiry.</span>
      </label>

      <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Request scope and availability'}
      </button>

      <div className="commercial-form-feedback" role={status === 'error' ? 'alert' : 'status'} aria-live="polite">
        {feedback ? <p data-error={status === 'error' ? 'true' : undefined}>{feedback}</p> : null}
      </div>
    </form>
  );
}
