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

const HUB_HEALTH_URL = 'https://hub.eladjak.com/health';
const HUB_TIMEOUT_MS = 5_000;
// Cache health for 60s on the fetch layer; route revalidates every 5min anyway.
const HUB_REVALIDATE_S = 60;

type AgentStatusValue = 'ok' | 'down' | 'unknown';

interface AgentNetworkHealth {
  total: number;
  healthy: number;
  statuses: Record<string, AgentStatusValue>;
  last_checked: string;
  hub_reachable: boolean;
  error?: string;
  note?: string;
}

function normalizeStatus(raw: unknown): AgentStatusValue {
  if (raw === true) return 'ok';
  if (raw === false) return 'down';
  if (typeof raw !== 'string') return 'unknown';
  const v = raw.toLowerCase().trim();
  if (v === 'ok' || v === 'healthy' || v === 'up' || v === 'green' || v === 'alive') {
    return 'ok';
  }
  if (v === 'down' || v === 'fail' || v === 'failed' || v === 'red' || v === 'dead' || v === 'error') {
    return 'down';
  }
  return 'unknown';
}

function parseHubHealth(json: unknown, fetchedAt: string): AgentNetworkHealth {
  if (!json || typeof json !== 'object') {
    return {
      total: 0,
      healthy: 0,
      statuses: {},
      last_checked: fetchedAt,
      hub_reachable: true,
      note: 'Hub responded with non-object payload',
    };
  }

  const data = json as Record<string, unknown>;
  const statuses: Record<string, AgentStatusValue> = {};
  let total: number | undefined;
  let healthy: number | undefined;

  // Shape 1 (preferred): { agents: { total, healthy, statuses: { name: 'ok' | ... } } }
  if (data.agents && typeof data.agents === 'object') {
    const agentsObj = data.agents as Record<string, unknown>;
    if (typeof agentsObj.total === 'number') total = agentsObj.total;
    if (typeof agentsObj.healthy === 'number') healthy = agentsObj.healthy;
    if (agentsObj.statuses && typeof agentsObj.statuses === 'object') {
      for (const [name, value] of Object.entries(
        agentsObj.statuses as Record<string, unknown>
      )) {
        statuses[name] = normalizeStatus(value);
      }
    }
  }

  // Shape 2: { services: [{ name, status }, ...] }
  if (Array.isArray(data.services)) {
    const services = data.services as Array<Record<string, unknown>>;
    for (const svc of services) {
      const name = typeof svc.name === 'string' ? svc.name : null;
      if (!name) continue;
      const status = normalizeStatus(svc.status ?? svc.healthy);
      // Don't clobber a status already set from preferred shape.
      if (!(name in statuses)) statuses[name] = status;
    }
    if (total === undefined) total = services.length;
    if (healthy === undefined) {
      healthy = services.filter((s) => normalizeStatus(s.status ?? s.healthy) === 'ok').length;
    }
  }

  // Shape 3 (flat): { total, healthy }
  if (typeof data.total === 'number' && total === undefined) total = data.total;
  if (typeof data.healthy === 'number' && healthy === undefined) healthy = data.healthy;

  // If we couldn't parse anything meaningful, be honest about it.
  if (total === undefined && healthy === undefined && Object.keys(statuses).length === 0) {
    return {
      total: 0,
      healthy: 0,
      statuses: {},
      last_checked: fetchedAt,
      hub_reachable: true,
      note: 'Hub reachable but response shape was not recognized',
    };
  }

  return {
    total: total ?? Object.keys(statuses).length,
    healthy: healthy ?? Object.values(statuses).filter((s) => s === 'ok').length,
    statuses,
    last_checked: fetchedAt,
    hub_reachable: true,
  };
}

async function fetchAgentNetworkHealth(): Promise<AgentNetworkHealth> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), HUB_TIMEOUT_MS);
  const fetchedAt = new Date().toISOString();

  try {
    const res = await fetch(HUB_HEALTH_URL, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
      next: { revalidate: HUB_REVALIDATE_S },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return {
        total: 0,
        healthy: 0,
        statuses: {},
        last_checked: fetchedAt,
        hub_reachable: false,
        error: `HTTP ${res.status}`,
      };
    }

    const json: unknown = await res.json();
    return parseHubHealth(json, fetchedAt);
  } catch (err) {
    clearTimeout(timeoutId);
    const isAbort =
      err instanceof Error &&
      (err.name === 'AbortError' || err.message.toLowerCase().includes('abort'));
    return {
      total: 0,
      healthy: 0,
      statuses: {},
      last_checked: fetchedAt,
      hub_reachable: false,
      error: isAbort ? 'timeout' : err instanceof Error ? err.message : 'unknown',
    };
  }
}

export const dynamic = 'force-static';
export const revalidate = 300;

export async function GET() {
  let posts: ReturnType<typeof getAllMDXPosts> = [];
  try {
    posts = getAllMDXPosts();
  } catch {
    posts = [];
  }

  const health = await fetchAgentNetworkHealth();

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
      health,
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
