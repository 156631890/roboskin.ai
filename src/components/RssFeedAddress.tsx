'use client';

import { useRef, useState } from 'react';

export default function RssFeedAddress({ feedUrl }: { feedUrl: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState('Copy this address into your RSS reader.');

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(feedUrl);
      setFeedback('Feed address copied. Paste it into your RSS reader to subscribe.');
    } catch {
      inputRef.current?.focus();
      inputRef.current?.select();
      setFeedback('Automatic copying is unavailable. Copy the selected address using your device’s copy command.');
    }
  }

  return (
    <div className="mt-8">
      <label htmlFor="rss-feed-address" className="block text-sm font-semibold">RSS feed address</label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          ref={inputRef}
          id="rss-feed-address"
          type="url"
          value={feedUrl}
          readOnly
          onFocus={(event) => event.currentTarget.select()}
          aria-describedby="rss-copy-feedback"
          className="min-w-0 flex-1 border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 py-3 font-mono text-sm"
        />
        <button type="button" onClick={copyAddress} className="btn-primary">Copy feed address</button>
      </div>
      <p id="rss-copy-feedback" role="status" aria-live="polite" className="mt-3 text-sm leading-relaxed text-soft">
        {feedback}
      </p>
    </div>
  );
}
