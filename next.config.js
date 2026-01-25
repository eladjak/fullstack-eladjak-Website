
/** @type {import("next").NextConfig} */
const config = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false, // Enable type checking during builds
  },
  // Empty turbopack config to silence Next.js 16 warning
  turbopack: {},
  webpack: (config, { isServer }) => {
    config.stats = "verbose";
    return config;
  },
  // Removed output: "export" to enable full Next.js features (API routes, ISR, etc.)
};
export default config;