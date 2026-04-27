import { NextResponse } from 'next/server';
import { allGuides } from '@/data/agent-guides';
import { SKILLS } from '@/data/skills-universe';
import { getAllMDXPosts } from '@/lib/mdx';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';

const SERVICES = [
  {
    name: 'AI Automation & Chatbots',
    nameHe: 'אוטומציה ופתרונות AI',
    price: 'from ₪5,000',
    description:
      'Smart chatbots, AI workflow automation, OpenAI/Claude integrations, AI-driven analytics.',
  },
  {
    name: 'Full-Stack Development',
    nameHe: 'פיתוח Full-Stack',
    price: 'from ₪3,000',
    description:
      'Modern Next.js + React + TypeScript apps end-to-end, with RTL/Hebrew support and SEO.',
  },
  {
    name: 'EdTech Platforms',
    nameHe: 'פתרונות EdTech',
    price: 'contact for quote',
    description:
      'Interactive learning platforms with AI tutoring, progress tracking, and adaptive content.',
  },
  {
    name: 'AI & Dev Workshops',
    nameHe: 'סדנאות AI ופיתוח',
    price: 'from ₪2,000',
    description:
      'Hands-on workshops on Claude Code, agent networks, and AI-augmented engineering.',
  },
  {
    name: 'WhatsApp Automation',
    nameHe: 'אוטומציית WhatsApp',
    price: 'from ₪3,500',
    description:
      '24/7 WhatsApp AI agents — auto-replies, scheduling, reminders, CRM integration.',
  },
];

const AGENTS = [
  'kami',
  'kaylee',
  'box',
  'hermes',
  'delegator',
  'adopter',
  'dashboard',
  'gmail-reader',
  'gcal-writer',
  'gdrive-reader',
  'whatsapp-cloud',
  'claude-code',
  'crewai',
];

export const dynamic = 'force-static';
export const revalidate = 300;

export async function GET() {
  let posts: ReturnType<typeof getAllMDXPosts> = [];
  try {
    posts = getAllMDXPosts();
  } catch {
    posts = [];
  }

  const blogPosts = posts.map((p) => ({
    slug: p.slug,
    title: p.frontmatter.titleHe || p.frontmatter.title,
    title_en: p.frontmatter.title,
    url: `${SITE}/blog/${p.slug}`,
    date: p.frontmatter.date,
    tags: p.frontmatter.tags ?? [],
  }));

  const guides = allGuides.map((g) => ({
    slug: g.slug,
    name: g.agentName,
    name_he: g.agentNameHe,
    url: `${SITE}/guide/${g.slug}`,
    description: g.tagline,
    category: g.category ?? 'agent',
  }));

  const skills = SKILLS.map((s) => ({
    id: s.id,
    label: s.label,
    category: s.category,
    level: s.level ?? null,
    description: s.description ?? null,
  }));

  const body = {
    version: '1.0',
    agent_owner: 'Elad Yaakobovitch',
    site: SITE,
    generated_at: new Date().toISOString(),
    capabilities: {
      skills,
      guides,
      blog_posts: blogPosts,
      services: SERVICES,
    },
    agent_network: {
      hub_url: 'https://hub.eladjak.com',
      // Delegator is firewall-blocked externally; route via hub.
      delegator_url: 'https://hub.eladjak.com/delegator',
      agents: AGENTS,
    },
    contact: {
      email: 'eladhiteclearning@gmail.com',
      whatsapp: 'https://wa.me/972525427474',
      site: SITE,
    },
  };

  return NextResponse.json(body, {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
