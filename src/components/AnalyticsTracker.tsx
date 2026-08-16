'use client';

import { track } from '@vercel/analytics';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const referralSources: Array<[string, string]> = [
  ['google.', 'Google'],
  ['bing.com', 'Bing'],
  ['chatgpt.com', 'ChatGPT'],
  ['perplexity.ai', 'Perplexity'],
  ['claude.ai', 'Claude'],
  ['copilot.microsoft.com', 'Microsoft Copilot'],
];

function cleanLabel(value: string) {
  return value.replace(/\s+/g, ' ').trim().slice(0, 80);
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const referrer = document.referrer.toLowerCase();
    const referral = referralSources.find(([domain]) => referrer.includes(domain));

    if (referral) {
      track('Referral Landing', { source: referral[1], path: pathname });
    }
  }, [pathname]);

  useEffect(() => {
    const seen = new Set<number>();

    function trackScrollDepth() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const depth = Math.round((window.scrollY / scrollable) * 100);
      [25, 50, 75].forEach((threshold) => {
        if (depth >= threshold && !seen.has(threshold)) {
          seen.add(threshold);
          track('Reading Depth', { depth: threshold, path: pathname });
        }
      });
    }

    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    return () => window.removeEventListener('scroll', trackScrollDepth);
  }, [pathname]);

  useEffect(() => {
    function trackIntent(event: MouseEvent) {
      const anchor = (event.target as HTMLElement).closest('a');
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      const label = cleanLabel(anchor.textContent ?? '');
      const properties = { from: pathname, target: url.pathname, label };

      if (url.hostname === 'wa.me') {
        track('WhatsApp Intent', properties);
        return;
      }

      if (url.pathname === '/contact') {
        const requestType = url.searchParams.get('requestType') ?? 'general';
        track(requestType === 'research' ? 'Submit Source Intent' : 'Contact Intent', {
          ...properties,
          request_type: requestType,
        });
        return;
      }

      if (url.pathname === '/research-index.csv' || url.pathname === '/research-index.json') {
        track('Research Data Open', { ...properties, format: url.pathname.endsWith('.csv') ? 'CSV' : 'JSON' });
        return;
      }

      if (url.pathname.startsWith('/reports/') && url.pathname.endsWith('.pdf')) {
        track('Sample Report Download', properties);
        return;
      }

      if (url.pathname === '/research-services') {
        track('Research Services Open', properties);
        return;
      }

      if (url.origin !== window.location.origin && !url.protocol.startsWith('mailto')) {
        track('Source Open', { ...properties, source_domain: url.hostname });
        return;
      }

      if (/^\/research\/[^/]+$/.test(url.pathname)) {
        track('Research Brief Open', properties);
        return;
      }

      if (/^\/news\/[^/]+$/.test(url.pathname)) {
        track('News Brief Open', properties);
      }
    }

    document.addEventListener('click', trackIntent);
    return () => document.removeEventListener('click', trackIntent);
  }, [pathname]);

  return null;
}
