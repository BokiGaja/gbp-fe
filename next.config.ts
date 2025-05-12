import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['gbp-strapi.s3.eu-central-1.amazonaws.com'],
  },
  /* config options here */
};

export default withNextIntl(nextConfig);
