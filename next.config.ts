import type { NextConfig } from "next";

const serverRuntime = process.env.ROBOSKIN_RUNTIME === 'server';
const newsletterEnabled = process.env.NEWSLETTER_ENABLED === 'true';
const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || '';
if ((newsletterEnabled || contactEndpoint === '/api/contact') && (!serverRuntime || !process.env.TURNSTILE_SECRET_KEY || !process.env.TURNSTILE_HOSTNAME || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)) {
  throw new Error('Server forms require ROBOSKIN_RUNTIME=server and configured Turnstile keys/hostname.');
}
if (newsletterEnabled && !process.env.BUTTONDOWN_API_KEY) throw new Error('Newsletter activation requires BUTTONDOWN_API_KEY.');
if (contactEndpoint === '/api/contact' && !process.env.CONTACT_WEBHOOK_URL) throw new Error('Contact activation requires CONTACT_WEBHOOK_URL.');

const nextConfig: NextConfig = {
  ...(serverRuntime ? {} : { output: 'export' as const }),
  env: { NEXT_PUBLIC_NEWSLETTER_API_ENABLED: String(newsletterEnabled) },

  images: {
    unoptimized: true,
  },

  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
