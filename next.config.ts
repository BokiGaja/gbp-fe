import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Disable image optimization globally to avoid Vercel 402 errors
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gbp-strapi.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
};

export default withNextIntl(nextConfig);
