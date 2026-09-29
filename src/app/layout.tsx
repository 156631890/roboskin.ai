import { finalSeoTitle, SEO_TITLE_TEMPLATE } from '@/lib/seo-budget.mjs';
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./contact-edition.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import JsonLd from "@/components/JsonLd";
import { site } from "@/content/site";
import {
  buildGraphJsonLd,
  buildEditorialLeadJsonLd,
  buildOrganizationJsonLd,
  buildPageMetadata,
  buildWebsiteJsonLd,
  pageSeo,
} from "@/lib/seo";

const manrope = localFont({
  src: "./fonts/manrope-latin-variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const ibmPlexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const homeMetadata = buildPageMetadata('/');

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...homeMetadata,
  title: {
    default: finalSeoTitle(pageSeo['/'].title),
    template: SEO_TITLE_TEMPLATE,
  },
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="alternate" type="application/rss+xml" title="RoboSkin.ai Research and News" href="/feed.xml" />
        <link rel="describedby" type="text/markdown" href="/llms.txt" />
        <meta name="google-adsense-account" content="ca-pub-8231924120348302" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8231924120348302"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#181917" />
      </head>
      <body
        className={`${manrope.variable} ${ibmPlexMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <JsonLd data={buildGraphJsonLd([buildOrganizationJsonLd(), buildEditorialLeadJsonLd(), buildWebsiteJsonLd()])} />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navigation />
        <main id="main-content" className="flex-grow">{children}</main>
        <Footer />
        <AnalyticsTracker />
        <Analytics />
      </body>
    </html>
  );
}
