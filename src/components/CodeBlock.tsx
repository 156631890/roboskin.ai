'use client';

import { useState } from 'react';

export default function CodeBlock({ label, language, value }: { label: string; language: string; value: string }) {
  const [status, setStatus] = useState('');
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus('Copied');
    } catch {
      setStatus('Copy unavailable. Select the code and copy it manually.');
    }
  }
  return (
    <div className="tutorial-code">
      <div className="tutorial-code-toolbar"><span>{label}</span><button type="button" onClick={copyCode} aria-label={`Copy ${label}`}>Copy code</button></div>
      <pre tabIndex={0} aria-label={label}><code className={`language-${language}`}>{value}</code></pre>
      <span className="tutorial-copy-status" role="status" aria-live="polite">{status}</span>
    </div>
  );
}
