import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { GlobalJsonLd } from "@/components/seo/GlobalJsonLd";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com'),
  title: {
    default: "WrittenlyHub Blog",
    template: "%s | WrittenlyHub",
  },
  description: "Insightful articles, expert guides, and SEO strategies to grow your business.",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "WrittenlyHub Blog",
    description: "Insightful articles, expert guides, and SEO strategies to grow your business.",
    url: "/",
    siteName: "WrittenlyHub",
    images: [
      {
        url: "/images/og/default-og.webp",
        width: 1200,
        height: 630,
        alt: "WrittenlyHub Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WrittenlyHub Blog",
    description: "Insightful articles, expert guides, and SEO strategies to grow your business.",
    creator: "@WrittenlyHub",
    site: "@WrittenlyHub",
    images: ["/images/og/default-og.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: '#fe6b00',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

import { draftMode } from 'next/headers';
import { PreviewBanner } from '@/components/ui/PreviewBanner';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="alternate" type="application/rss+xml" title="WrittenlyHub Blog RSS Feed" href="/feed.xml" />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <GlobalJsonLd />
        {isDraftMode && <PreviewBanner />}
        <SmoothScrollProvider>
          <Header />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
