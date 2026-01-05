import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://roboskin.ai'),
  title: {
    default: "RoboSkin.ai - Advanced Artificial Skin Technology for Robotics",
    template: "%s | RoboSkin.ai"
  },
  description: "Revolutionary bio-inspired artificial skin technology equipping robots with human-level tactile perception. Leading research in graphene sensors, neuromorphic processing, and self-healing materials.",
  keywords: [
    "robotic skin",
    "tactile sensors",
    "artificial skin",
    "haptic feedback",
    "graphene sensors",
    "neuromorphic computing",
    "robotics",
    "prosthetics",
    "surgical robots",
    "industrial automation",
    "self-healing materials",
    "multimodal sensing",
    "NASA technology",
    "quantum tunneling sensors",
    "bio-inspired robotics"
  ],
  authors: [{ name: "RoboSkin.ai Research Team" }],
  creator: "RoboSkin.ai",
  publisher: "RoboSkin.ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://roboskin.ai",
    title: "RoboSkin.ai - Advanced Artificial Skin Technology for Robotics",
    description: "Revolutionary bio-inspired artificial skin technology equipping robots with human-level tactile perception.",
    siteName: "RoboSkin.ai",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RoboSkin.ai - Advanced Robotic Tactile Systems"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "RoboSkin.ai - Advanced Artificial Skin Technology for Robotics",
    description: "Revolutionary bio-inspired artificial skin technology equipping robots with human-level tactile perception.",
    images: ["/twitter-image.jpg"],
    creator: "@roboskin_ai"
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
    canonical: "https://roboskin.ai"
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
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
