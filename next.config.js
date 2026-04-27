
/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'iknuvjmvwblzzsmcizlp.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Content-Security-Policy is now set per-request by src/middleware.ts
          // with a fresh nonce so we can drop 'unsafe-inline' from script-src.
          // The middleware matcher excludes /api, /_next/static, /images, etc.,
          // and those responses don't execute scripts so they don't need CSP.
          // The remaining headers below apply globally.
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  }
};
export default config;