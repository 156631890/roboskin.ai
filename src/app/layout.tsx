import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { site } from "@/content/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "RoboSkin.ai | Tactile Sensor Skin for Robotics",
    template: "%s | RoboSkin.ai"
  },
  description: "RoboSkin.ai builds tactile sensor skin and integration support for robotics teams, OEM programs, and research deployments.",
  keywords: [
    "robotic skin",
    "tactile sensors",
    "flexible tactile sensors",
    "integration",
    "robotics",
    "prosthetics",
    "humanoid robots",
    "robotic grippers",
    "tactile sensing"
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: "RoboSkin.ai | Tactile Sensor Skin for Robotics",
    description: "RoboSkin.ai builds tactile sensor skin and integration support for robotics teams.",
    siteName: site.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RoboSkin.ai tactile sensor skin for robotics"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "RoboSkin.ai | Tactile Sensor Skin for Robotics",
    description: "RoboSkin.ai builds tactile sensor skin and integration support for robotics teams.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code"
  },
  alternates: {
    canonical: site.url
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#06080c" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
