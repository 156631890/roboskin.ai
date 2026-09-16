'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type Turnstile = { render: (element: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void };
declare global { interface Window { turnstile?: Turnstile } }

export default function AntiSpamChallenge({ action, onToken }: { action: 'contact' | 'newsletter'; onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useRef(onToken);
  callback.current = onToken;
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => {
    if (!ready || !ref.current || !window.turnstile || !sitekey) return;
    const api = window.turnstile;
    const id = api.render(ref.current, {
      sitekey, action, theme: 'dark', size: 'flexible',
      callback: (token: string) => { setFailed(false); callback.current(token); },
      'expired-callback': () => callback.current(''),
      'error-callback': () => { callback.current(''); setFailed(true); },
    });
    return () => api.remove(id);
  }, [ready, sitekey, action]);
  if (!sitekey) return null;
  return <div className="min-w-0 max-w-full">
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setReady(true)} onError={() => setFailed(true)} />
    <div ref={ref} />
    {failed ? <p role="alert">The anti-spam check could not load. Reload or use the direct email route.</p> : null}
  </div>;
}
