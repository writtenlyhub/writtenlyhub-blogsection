import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload';

const isVercel = process.env.VERCEL === '1';

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: isVercel ? ['sharp'] : [],
  outputFileTracingIncludes: isVercel ? {
    '/**/*': ['./node_modules/**/*.node', './node_modules/@img/**/*']
  } : undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'sought-burton-alert-jury.trycloudflare.com',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'www.writtenlyhub.com',
        pathname: '/api/media/file/**',
      }
    ],
  },
  async headers() {
    return [
      {
        // Global headers for all routes
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
          // HSTS is included; Note: In a true prod environment, consider adding this conditionally or ensuring it's only over HTTPS
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
      {
        // Frontend strict CSP (Report-Only)
        source: '/((?!admin|api).*)',
        headers: [
          { 
            key: 'Content-Security-Policy-Report-Only', 
            value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';" 
          }
        ],
      },
      {
        // Payload Admin permissive CSP (Report-Only)
        source: '/admin/(.*)',
        headers: [
          { 
            key: 'Content-Security-Policy-Report-Only', 
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';" 
          }
        ],
      }
    ];
  },
};

import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
export default withBundleAnalyzer(withPayload(nextConfig));
// trigger restart
// trigger restart 2
