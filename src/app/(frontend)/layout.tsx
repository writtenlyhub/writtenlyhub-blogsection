import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
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
  openGraph: {
    title: "WrittenlyHub Blog",
    description: "Insightful articles, expert guides, and SEO strategies to grow your business.",
    url: "/",
    siteName: "WrittenlyHub",
    images: [
      {
        url: "/images/og/default-og.jpg",
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
    images: ["/images/og/default-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" rel="stylesheet" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="alternate" type="application/rss+xml" title="WrittenlyHub Blog RSS Feed" href="/feed.xml" />
        <meta name="theme-color" content="#fe6b00" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SmoothScrollProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
