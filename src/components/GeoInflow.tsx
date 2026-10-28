'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { canUseGeoInflow, flushGeoEvents, geoBeforeSend } from '@/lib/geoinflow.mjs';

declare global {
  interface Window {
    roboskinGeoBeforeSend?: typeof geoBeforeSend;
  }
}

const websiteId = process.env.NEXT_PUBLIC_GEOINFLOW_WEBSITE_ID;

export default function GeoInflow() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!canUseGeoInflow(websiteId, window.location.hostname)) return;
    window.roboskinGeoBeforeSend = geoBeforeSend;
    setEnabled(true);
  }, []);

  if (!enabled) return null;
  return <Script
    id="roboskin-geoinflow"
    src="https://stats.roboskin.ai/script.js"
    strategy="afterInteractive"
    data-website-id={websiteId}
    data-domains="roboskin.ai,www.roboskin.ai"
    data-before-send="roboskinGeoBeforeSend"
    data-exclude-search="true"
    data-exclude-hash="true"
    data-do-not-track="true"
    onReady={flushGeoEvents}
  />;
}
