import {
  Cloud,
  Rocket,
  Zap,
  GitBranch,
  Globe,
  Terminal,
  Github,
  ExternalLink,
  BookOpen,
  Users,
  Mail,
  Activity,
  Layers,
  Shield,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const vercelGuideEn: AgentGuideData = {
  slug: "vercel",
  agentName: "Vercel",
  agentNameHe: "Vercel — Deploy Next.js In 90 Seconds",
  category: "infra",
  brandIconSlug: "vercel",
  brandIconColor: "FFFFFF",
  heroBgImage: "/images/guides/guide-vercel-hero.jpg",
  tagline: "git push → live site. Global CDN, automatic SSL, preview deployments. Generous free tier.",
  heroDescription:
    "Vercel is the most powerful platform in 2026 for deploying Next.js sites — no accident, it was built by the people who create Next.js itself. But it also supports React, Vue, Svelte, Astro, and static sites. Its concept is brilliantly simple: you connect a GitHub repo, and every push to main automatically builds and deploys to your domain — within 90 seconds. Every PR gets a preview deployment with a unique URL, so you can show clients versions before merge. Global CDN, free SSL, built-in analytics, and zero servers to maintain. For me (Elad), this site (fullstack-eladjak.co.il) has been on Vercel since 2023, alongside 5+ landing pages and other projects. The free tier is very generous (100 GB bandwidth, unlimited builds, unlimited deploys) — enough for most personal projects and freelancers. The next tier (Pro $20/month) unlocks more advanced features (extended analytics, teams, password protection for previews). The big upside: you don't deal with a VPS, with nginx, with SSL, or with deploy scripts. You just write code — Vercel handles the rest. The downside: vendor lock and platform tie-in. But for pure frontend projects, the simplicity is worth it.",
  badgeText: "2026 · Next.js Deployment · Practical guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/vercel",
  stats: [
    { label: "projects I run", value: "5+" },
    { label: "deploy time", value: "~90s" },
    { label: "free bandwidth", value: "100 GB" },
    { label: "uptime", value: "99.99%" },
  ],
  paradigmTitle: "Deploy without thinking about the server",
  paradigmSub:
    "No yaml, no Dockerfile, no SSH. git push is the deploy. The platform handles the rest.",
  paradigmShifts: [
    {
      before: "VPS + nginx + certbot + pm2 + git pull script",
      after: "git push → live in 90 seconds",
      icon: Rocket,
    },
    {
      before: "Show a client = expensive staging server",
      after: "Every PR gets an automatic preview URL",
      icon: GitBranch,
    },
    {
      before: "Check if it's alive = ssh + curl",
      after: "Vercel Dashboard shows everything in real time",
      icon: Activity,
    },
    {
      before: "High latency for overseas users",
      after: "Vercel CDN in 100+ regions automatically",
      icon: Globe,
    },
  ],
  whoIsThisFor: [
    {
      title: "Next.js developers",
      description:
        "Vercel was built specifically for Next.js. ISR, server actions, edge functions — all out of the box.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Freelancers shipping client sites",
      description:
        "Each client gets a separate Vercel project, separate billing, separate access. Clean management without thinking.",
      icon: Users,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Landing-page teams",
      description:
        "Preview deployments let marketers/designers see changes before merge. Real collaboration.",
      icon: GitBranch,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Anyone who doesn't want DevOps",
      description:
        "If you build pure frontend, Vercel saves 100% of the infra work. You're free to focus on UX.",
      icon: Cloud,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "deploy", label: "First deploy" },
    { id: "features", label: "Features" },
    { id: "edge", label: "Edge Functions" },
    { id: "pricing", label: "Pricing & limits" },
    { id: "alternatives", label: "Alternatives" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Cloud,
      title: "What is Vercel and why it differs from AWS",
      subtitle: "A frontend platform, not a generic cloud",
      description:
        "Vercel is a PaaS (Platform as a Service) specifically for modern web frontends and serverless functions. Unlike AWS/GCP/Azure that offer endless generic services (VMs, databases, ML, etc.), Vercel focuses on one thing: deploying modern websites in seconds. The company was founded in 2015 (as 'ZEIT', renamed Vercel in 2020) by the team that created Next.js — which is why it has the best support in the world for that framework. But it also supports every other frontend framework, including plain static HTML sites.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "Think of Vercel like Netlify (but faster and with more features) or GitHub Pages (but with backend and server-side rendering). You give them code — they give you a live site with a domain, SSL, and CDN. No servers, no SSH, no /var/log.",
      content: [
        "Build & Deploy automatically — connect a GitHub/GitLab/Bitbucket repo, and Vercel starts building automatically on every push",
        "Preview deployments — every branch and PR gets a unique URL. For example `myapp-feature-x.vercel.app`",
        "Edge Network — the site is served from 100+ global regions. Low latency from anywhere",
        "Serverless Functions — `/api/*` in your project automatically becomes an AWS Lambda. No setup needed",
        "Edge Functions — a faster Lambda variant that runs at the closest location to the user. Excellent for personalized content",
        "Vercel KV / Postgres / Blob — managed DB services. Convenient, but pricey relative — usually Supabase/Neon are better",
        "Analytics & Speed Insights — built-in. You see page views, Core Web Vitals, and real user metrics",
      ],
      tips: [
        "Vercel is free for hobby and personal projects. Once you make money from the site ('commercial'), technically you should move to Pro ($20/month)",
        "If you build a purely static site (HTML/CSS/JS), Vercel works but might be overkill — Cloudflare Pages or Netlify can be simpler",
      ],
    },
    {
      id: "deploy",
      icon: Rocket,
      title: "First deploy: 5 minutes",
      subtitle: "From git repo to live site",
      description:
        "Getting started with Vercel is among the fastest in the world. If you have a Next.js project that works locally, you're 5 minutes from your first deploy.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "1. Create an account at vercel.com — easy with GitHub login",
        "2. New Project → Import Git Repository — choose your repo",
        "3. Vercel automatically detects the framework (Next.js, React, Vue, etc.) and configures build settings",
        "4. Quick review of the settings — root directory, build command (`next build`), output directory",
        "5. Add Environment Variables — if you have API keys, add them here (not in code!)",
        "6. Deploy — takes 60-120 seconds. At the end, you get a URL like `myapp.vercel.app`",
        "7. Add a custom domain — Settings → Domains. Add the domain, Vercel gives DNS instructions",
        "8. Automatically — every push to the main branch from now on does an automatic deploy",
      ],
      tips: [
        "Add `.vercel/` to `.gitignore` (it's only created if you run the `vercel` CLI locally)",
        "Environment variables can be set per-environment (Production, Preview, Development). Useful for giving different keys to different environments",
        "If a build fails, open the deploy in the Vercel Dashboard — the logs there are very clear, you see exactly the error line",
      ],
      codeExample: {
        label: "Vercel CLI for command-line deploy",
        code: "# Global install\nnpm i -g vercel\n\n# In the project folder\nvercel login\nvercel link  # links the folder to an existing project\n\n# Deploy to preview (unique URL)\nvercel\n\n# Deploy to production\nvercel --prod\n\n# Watch production logs in real time\nvercel logs --follow\n\n# Roll back to a previous deployment\nvercel rollback\n\n# List deployments\nvercel ls\n\n# Remove an old deployment\nvercel remove <deployment-url>",
      },
    },
    {
      id: "features",
      icon: Layers,
      title: "Advanced features",
      subtitle: "What makes Vercel feel professional",
      description:
        "After your first deploy, there's a whole layer of features that make daily work much better.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "Preview Deployments — every PR gets a unique URL. You can send to a client, CEO, design team for approval before merge",
        "Branch Protection — you can wire Vercel deploys as a status check in GitHub. Doesn't merge if the build fails",
        "Instant rollback — if you pushed a buggy build to production, one click in the dashboard rolls back to the previous deploy. Within seconds",
        "Environment Variables — managed in Vercel UI. Can be updated without redeploy",
        "Headers & Redirects — defined in `vercel.json` or `next.config.js`. For example `/old-page → /new-page` 301",
        "Cron Jobs — Vercel supports scheduled functions. Defined in `vercel.json`, runs daily/hourly",
        "Image Optimization — `next/image` works automatically. Images served as WebP/AVIF, optimal sizes, lazy",
        "Analytics — shows top pages, top countries, devices, and real Core Web Vitals. Free tier includes limited monthly events",
      ],
      tips: [
        "Add the preview-deployment link to your PR template — even though Vercel auto-comments, it's still worth it",
        "Vercel Analytics is nice but partial — for deeper reports, also run Plausible/Umami alongside",
        "Cron jobs in free Vercel = once per day only. For more frequent cron, you need Pro",
      ],
      codeExample: {
        label: "vercel.json with redirects, headers, and cron",
        code: "{\n  \"redirects\": [\n    {\n      \"source\": \"/old-blog/:slug\",\n      \"destination\": \"/blog/:slug\",\n      \"permanent\": true\n    }\n  ],\n  \"headers\": [\n    {\n      \"source\": \"/(.*)\",\n      \"headers\": [\n        { \"key\": \"X-Frame-Options\", \"value\": \"DENY\" },\n        { \"key\": \"X-Content-Type-Options\", \"value\": \"nosniff\" }\n      ]\n    }\n  ],\n  \"crons\": [\n    {\n      \"path\": \"/api/daily-digest\",\n      \"schedule\": \"0 9 * * *\"\n    }\n  ]\n}",
      },
    },
    {
      id: "edge",
      icon: Zap,
      title: "Edge Functions vs Serverless Functions",
      subtitle: "Two ways to run code in Vercel's cloud",
      description:
        "Vercel supports two types of functions. The distinction matters — it affects latency, cold starts, and capabilities.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "Serverless Functions (default) — run on AWS Lambda. Support every Node.js API, can connect to a DB, full runtime. Cold start ~200-500ms",
        "Edge Functions — run on Cloudflare Workers (V8 isolates). Very fast (cold start <50ms), in every global region. But limited: only Web APIs, no FS, code size up to 1 MB",
        "Edge Runtime — to choose: in a Next.js page/route file, `export const runtime = 'edge'`. Then it runs on edge",
        "Middleware — always runs on edge. Suitable for authentication, redirects, headers. Runs before every request",
        "When to use edge — simple, personalized requests (geolocation), redirects, A/B tests. Anything that doesn't need direct DB or heavy compute",
        "When to use serverless — DB connections, heavy library, operations longer than 30 seconds, or that need more than the Web APIs subset",
        "Streaming — Edge Functions support streaming responses. Excellent for AI streaming (OpenAI/Anthropic). The response begins arriving immediately, before fully complete",
      ],
      tips: [
        "If your site is mostly static content + a little API, edge runtime can give incomprehensibly low latency (10-30ms globally)",
        "Edge functions are limited in memory (128 MB) and runtime (30s). If your app needs more — stay on serverless",
      ],
      codeExample: {
        label: "Next.js route with edge runtime for AI streaming",
        code: "// app/api/chat/route.ts\nimport { OpenAIStream, StreamingTextResponse } from 'ai';\nimport OpenAI from 'openai';\n\n// Important — tells Vercel to run on Edge\nexport const runtime = 'edge';\n\nconst openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\nexport async function POST(req: Request) {\n  const { messages } = await req.json();\n\n  const response = await openai.chat.completions.create({\n    model: 'gpt-4o',\n    messages,\n    stream: true,\n  });\n\n  // Streaming back to client — character by character\n  const stream = OpenAIStream(response);\n  return new StreamingTextResponse(stream);\n}",
      },
    },
    {
      id: "pricing",
      icon: Activity,
      title: "Pricing: what's free, when to move to Pro",
      subtitle: "The economics of Vercel",
      description:
        "Vercel is generous with the free tier, but there are limits. It's important to know what's included and what isn't — otherwise you'll be surprised by a bill.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "Hobby (free) — 100 GB bandwidth/month, 100h serverless function execution, 6,000 build minutes, unlimited deploys. Non-commercial use",
        "Pro ($20/month) — 1 TB bandwidth, 1,000h functions, 24,000 build minutes, password-protected previews, advanced analytics. Most freelancers and businesses",
        "Enterprise (custom) — SLA, multi-tenant management, audit logs. For large companies",
        "Bandwidth — if you exceed it, the charge is $0.40/GB. A viral site can get expensive",
        "Function execution — measured in GB-hours (memory × time). If you run ML or heavy compute, it adds up fast",
        "Image optimization — free in Hobby up to 1,000 source images. Beyond that, charged",
        "Edge Middleware — limited to 1M free invocations. Beyond that, $0.65 per million",
        "Vercel KV / Postgres / Blob — separate services with separate billing. Usually pricier than Supabase or Neon",
      ],
      tips: [
        "Set a Spend Limit in account settings. Mine is fixed at $5 — if something blows up, I lose $5 max, not $500",
        "Bandwidth = the big one. With my 5+ projects on Hobby I'm still under 50% of the 100 GB. But a viral site can burn it all in a day",
        "If you're a business, invest in Pro — $20/month isn't expensive and you get more peace of mind (real analytics, password protection, organized billing)",
      ],
    },
    {
      id: "alternatives",
      icon: Globe,
      title: "Alternatives: Cloudflare Pages, Netlify, Railway",
      subtitle: "When to pick which",
      description:
        "Vercel is the best for Next.js, but not the only choice. Quick comparison.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "Cloudflare Pages — generous free tier (500 builds/month, unlimited bandwidth!), Workers/D1 in the same ecosystem. Less seamless Next.js support than Vercel, but excellent for static sites and Workers",
        "Netlify — the longtime rival. Very similar to Vercel, maybe a touch slower. Free tier 100GB bandwidth (like Vercel)",
        "Railway — if you want a cloud with a full backend (Postgres, Redis), Railway is more 'modern Heroku'. Costs $5/month base",
        "Render — similar to Railway. Another full-stack PaaS alternative",
        "Fly.io — small VMs in regions. More control, but more work. Good for backends",
        "Self-hosted VPS + nginx + GitHub Actions — full control, zero vendor lock, but more work. Good if you have DevOps",
        "Comparison: for Next.js → Vercel. For static sites → Cloudflare Pages. For full-stack → Railway. For full control → VPS",
      ],
      tips: [
        "My best mix: Vercel for frontend sites (including this one), VPS on Hetzner for the 13 agents that need 24/7 backend in production",
        "If you build with Next.js with API routes that do a lot — consider whether to split into separate frontend (Vercel) + separate backend (Railway/VPS). More complex, but better cost control",
      ],
    },
  ],
  resources: [
    {
      title: "Vercel Documentation",
      description: "The official docs — among the best in the industry",
      href: "https://vercel.com/docs",
      icon: BookOpen,
    },
    {
      title: "Next.js on Vercel",
      description: "The Next.js-specific guide",
      href: "https://vercel.com/docs/frameworks/nextjs",
      icon: BookOpen,
    },
    {
      title: "Vercel Templates",
      description: "Hundreds of ready-to-deploy templates with one click",
      href: "https://vercel.com/templates",
      icon: ExternalLink,
    },
    {
      title: "Cloudflare Pages",
      description: "The most prominent alternative — unlimited bandwidth in free tier",
      href: "https://pages.cloudflare.com/",
      icon: ExternalLink,
    },
    {
      title: "Vercel CLI",
      description: "Command-line tool for deploys and management",
      href: "https://vercel.com/docs/cli",
      icon: Github,
    },
    {
      title: "The GitHub Actions guide",
      description: "How to wire deploys into CI/CD",
      href: "/en/guide/github-actions",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Need help moving a site to Vercel?",
  ctaSub:
    "From a VPS with nginx to Vercel = an hour of work. I can move your site, set up custom domains, and SSL.",
  primaryCta: {
    label: "Vercel Get Started",
    href: "https://vercel.com/new",
    icon: Rocket,
  },
  secondaryCta: {
    label: "Book a Vercel migration",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "This site (fullstack-eladjak.co.il) has been on Vercel since 2023, with 22+ routes and an average deploy time of 90 seconds. I have 5+ additional projects on Vercel — across all of them, I pay $0 (within the Hobby tier). This guide is built on three years of active use and migrating 10+ sites from VPS.",
};
