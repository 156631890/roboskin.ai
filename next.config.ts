import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure for GitHub Pages
  // Remove basePath for now - we'll handle it in deployment
  images: {
    unoptimized: true,
  },

  // Disable powered by header
  poweredByHeader: false,

  // Optimize for production
  compress: true,

  // Strict mode
  reactStrictMode: true,
};

export default nextConfig;
