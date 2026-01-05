/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for GitHub Pages static export
  output: 'export',

  images: {
    unoptimized: true,
  },

  // Disable powered by header
  poweredByHeader: false,

  // Optimize for production
  compress: true,

  // Strict mode
  reactStrictMode: true,

  // Disable TypeScript checking for build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable ESLint for build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
