import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';

// Explicit AI crawlers we want indexing the full site (no /api, /admin etc.).
// Listing each one (vs. relying on the wildcard) makes the policy machine-readable
// and removes ambiguity for AI search engines that look for their own UA name.
const AI_USER_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Applebot-Extended',
  'Applebot',
  'cohere-ai',
  'CCBot',
  'Bytespider',
  'FacebookBot',
  'Meta-ExternalAgent',
  'Amazonbot',
  'DuckAssistBot',
  'YouBot',
];

const COMMON_DISALLOW = ['/api/', '/admin/', '/_next/', '/private/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: COMMON_DISALLOW,
      },
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: COMMON_DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
