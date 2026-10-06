'use client';

import Script from 'next/script';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { analyticsConsentKey, analyticsPageUrl, analyticsReferrer, canUseGoogleAnalytics, createPageViewTracker } from '@/lib/google-analytics.mjs';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
type Consent = 'granted' | 'denied';

function disableTracking(disabled: boolean) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = disabled;
}

function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (name !== '_ga' && !name.startsWith('_ga_')) continue;
    for (const domain of ['', `; domain=${window.location.hostname}`, '; domain=.roboskin.ai']) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax; Secure`;
    }
  }
}

export function AnalyticsSettingsButton() {
  if (!measurementId) return null;
  return <button type="button" className="analytics-settings" onClick={() => window.dispatchEvent(new Event('roboskin:analytics-settings'))}>Analytics settings</button>;
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [showChoices, setShowChoices] = useState(false);
  const initialized = useRef(false);
  const tracker = useRef(createPageViewTracker((...args: unknown[]) => window.gtag?.(...args)));

  useEffect(() => {
    if (!canUseGoogleAnalytics(measurementId, window.location.hostname)) return;
    setEnabled(true);
    let saved: string | null = null;
    try { saved = localStorage.getItem(analyticsConsentKey); } catch { /* Ask again when storage is unavailable. */ }
    setConsent(saved === 'granted' || saved === 'denied' ? saved : null);
    setShowChoices(saved !== 'granted' && saved !== 'denied');
    const open = () => setShowChoices(true);
    window.addEventListener('roboskin:analytics-settings', open);
    return () => window.removeEventListener('roboskin:analytics-settings', open);
  }, []);

  useEffect(() => {
    if (!enabled || consent !== 'granted') return;
    disableTracking(false);
    window.dataLayer ??= [];
    // Google tag's command queue expects the standard arguments object.
    // eslint-disable-next-line prefer-rest-params
    window.gtag ??= function () { window.dataLayer!.push(arguments); };
    if (!initialized.current) {
      window.gtag('consent', 'default', {
        analytics_storage: 'granted', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied',
      });
      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        send_page_view: false,
        page_location: analyticsPageUrl(window.location.href),
        page_referrer: analyticsReferrer(document.referrer),
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_expires: 60 * 60 * 24 * 90,
      });
      initialized.current = true;
    }
    // Next updates the route metadata during navigation; read the title after commit.
    const frame = requestAnimationFrame(() => tracker.current.track({
      location: window.location.href, title: document.title, referrer: document.referrer,
    }));
    return () => cancelAnimationFrame(frame);
  }, [consent, enabled, pathname]);

  function choose(value: Consent) {
    try { localStorage.setItem(analyticsConsentKey, value); } catch { /* Keep the choice for this page session. */ }
    if (value === 'denied') {
      disableTracking(true);
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
      clearAnalyticsCookies();
      tracker.current.reset();
    } else if (initialized.current) {
      disableTracking(false);
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    }
    setConsent(value);
    setShowChoices(false);
  }

  if (!enabled) return null;
  return <>
    {consent === 'granted' && <Script id="roboskin-google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />}
    {showChoices && <section className="analytics-consent" aria-label="Google Analytics preferences">
      <div>
        <strong>Help us improve RoboSkin.ai</strong>
        <p>Allow Google Analytics cookies to measure visits and useful pages? Your choice is optional and can be changed in the footer. <Link href="/privacy">Privacy policy</Link></p>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" onClick={() => choose('denied')}>Decline</button>
        <button type="button" onClick={() => choose('granted')}>Allow analytics</button>
      </div>
    </section>}
  </>;
}
