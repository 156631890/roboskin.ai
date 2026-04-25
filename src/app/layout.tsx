import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/content/site";
import {
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildPageMetadata,
  buildWebsiteJsonLd,
  pageSeo,
} from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const homeMetadata = buildPageMetadata('/');

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...homeMetadata,
  title: {
    default: `${pageSeo['/'].title} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  authors: [{ name: site.name }],
  category: 'Tactile AI',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f6f1e8" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <JsonLd data={buildGraphJsonLd([buildOrganizationJsonLd(), buildWebsiteJsonLd()])} />
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
