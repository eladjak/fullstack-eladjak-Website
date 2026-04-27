import {
  Cloud,
  Shield,
  Network,
  Lock,
  Zap,
  GitBranch,
  Terminal,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Users,
  Mail,
  Globe,
  Server,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const cloudflareTunnelGuideEn: AgentGuideData = {
  slug: "cloudflare-tunnel",
  agentName: "Cloudflare Tunnel",
  agentNameHe: "Cloudflare Tunnel — Expose a Service Without Opening a Port",
  category: "infra",
  brandIconSlug: "cloudflare",
  brandIconColor: "F38020",
  heroBgImage: "/images/guides/guide-cloudflare-tunnel-hero.jpg",
  tagline: "the tunnel your VPS opens to Cloudflare — and gets a public domain without a single open port",
  heroDescription:
    "Cloudflare Tunnel (formerly known as Argo Tunnel, today simply 'Tunnel') is a fully free Cloudflare service that solves one of the biggest problems of a personal VPS: how to expose a service to the world without opening any ports, without worrying about DDoS, and without buying a static IP. The idea is brilliantly simple — instead of the internet connecting to your server, your server reaches out and creates a 'tunnel' to Cloudflare. All requests for your domain hit Cloudflare (which has a CDN of 300+ datacenters), and Cloudflare passes them through the tunnel to your server. The result: port 443 on your server stays hermetically sealed, but users get a working site with HTTPS, CDN, and DDoS protection — for free. For me (Elad), the domain `hub.eladjak.com` points in DNS to Cloudflare, and a small daemon called `cloudflared` running on my Hetzner VPS manages the tunnel. Every request to `hub.eladjak.com` goes through Cloudflare, enters via the tunnel, and reaches an internal nginx on port 80 — without any port being open on the server to the outside world. It is a paradigm shift: you've moved from 'how do I secure an open port' to 'there is no open port'.",
  badgeText: "2026 · Zero-Trust Networking · Practical guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/cloudflare-tunnel",
  stats: [
    { label: "open ports on the server", value: "0" },
    { label: "cost", value: "free" },
    { label: "CF datacenters", value: "300+" },
    { label: "install time", value: "5 min" },
  ],
  paradigmTitle: "An outbound tunnel instead of an inbound door",
  paradigmSub:
    "Instead of opening a firewall port and praying nobody breaks in, the server itself reaches out to Cloudflare. There's nothing to break.",
  paradigmShifts: [
    {
      before: "Open port 443, pray there's no vulnerability",
      after: "Zero open ports, but a public domain still works",
      icon: Lock,
    },
    {
      before: "DDoS = server falls, you pay for the bandwidth",
      after: "Cloudflare absorbs the DDoS, your server never sees it",
      icon: Shield,
    },
    {
      before: "Dynamic IP / NAT = no public domain",
      after: "Tunnel reaches out from the server — IP doesn't matter",
      icon: Network,
    },
    {
      before: "SSL cert = certbot + maintenance",
      after: "Cloudflare handles HTTPS automatically",
      icon: Cloud,
    },
  ],
  whoIsThisFor: [
    {
      title: "Anyone running a server at home or on a Raspberry Pi",
      description:
        "No static IP, behind your ISP's NAT. With Tunnel, everything works without asking the ISP for anything.",
      icon: Server,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Devs who want a quick demo URL",
      description:
        "Run a local app and get a public domain in minutes. Perfect for showing clients without deploying.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Anyone worried about DDoS",
      description:
        "Cloudflare absorbs attacks of tens of Tbps. Your tiny VPS won't even see a ping.",
      icon: Shield,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Teams that need zero-trust",
      description:
        "Cloudflare Access lets you require auth (Google/GitHub/SSO) before anyone reaches an internal service. No VPN.",
      icon: Lock,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "setup", label: "Install" },
    { id: "config", label: "Config" },
    { id: "access", label: "Access (zero-trust)" },
    { id: "use-cases", label: "Use cases" },
    { id: "vs-alternatives", label: "Alternatives" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Cloud,
      title: "How a reverse tunnel works",
      subtitle: "Who initiates the connection — and why it changes everything",
      description:
        "The magic of Cloudflare Tunnel is that the direction of the connection is reversed from the traditional. In a regular setup, the internet connects to your server — meaning you need an open port, a public IP, and an even stronger firewall. In a tunnel, your server is the one that initiates the connection to Cloudflare — exactly like a browser connecting to a website. The implication: your firewall only sees 'outbound' traffic (which is always allowed), not 'inbound' (which is the dangerous direction). All requests start at Cloudflare's CDN and travel through the open tunnel to the server — but no one on the internet can talk directly to the server. It is invisible.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "Think about it like this: a house with an open door (port 443) needs guards, rules, locks. With Tunnel, there is no door at all — but you have an external representative (Cloudflare) who steps out of the house through a vent, receives guests, and forwards their messages inside through internal communication. Burglars can stand outside as long as they want — there's no door to break in.",
      content: [
        "cloudflared — the daemon running on your server. A small binary (~50 MB) whose only job is to hold an open connection to Cloudflare and forward traffic. Needs only a systemd service",
        "Tunnel — the connection itself, identified by UUID. You create it once and then point at it via DNS",
        "Ingress rules — define how every request that arrives via the tunnel is routed. For example: `hub.eladjak.com` → `http://localhost:3710`",
        "Automatic DNS CNAME — Cloudflare can create the DNS record for the tunnel automatically. You just declare in one command that `hub.example.com` belongs to tunnel X",
        "No public IP needed — the server can be behind your home ISP's NAT, or on a Raspberry Pi with a dynamic IP. The tunnel works as long as outbound connectivity exists",
        "Doubled-up traffic: client request hits Cloudflare → through the tunnel to the server → returned via the same channel. CF claim it's actually faster than direct in most cases thanks to their network",
      ],
      tips: [
        "I literally have no port open to the world except 22 (SSH, key-only) — and that includes the domains serving the site. Everything goes through the Tunnel",
        "Cloudflare's free tier is absurdly generous — no bandwidth limit, no tunnel limit, no DNS records limit. One of the best offers in cloud",
      ],
      codeExample: {
        label: "Simple config: domain → local service",
        code: "# ~/.cloudflared/config.yml\ntunnel: 12345678-abcd-...  # the tunnel UUID\ncredentials-file: /etc/cloudflared/12345678-abcd-...json\n\ningress:\n  - hostname: hub.eladjak.com\n    service: http://localhost:3710\n  - hostname: api.eladjak.com\n    service: http://localhost:3001\n  # the last rule must always be a catch-all\n  - service: http_status:404",
      },
    },
    {
      id: "setup",
      icon: Terminal,
      title: "Install: from zero to a live domain in 5 minutes",
      subtitle: "Step-by-step on Ubuntu/Debian",
      description:
        "Installing Cloudflare Tunnel is among the fastest setups in DevOps. You need: a domain managed by Cloudflare (moving nameservers takes ~24h, but it's free), a Cloudflare account (free), and a VPS with sudo access. Everything is done via CLI, and after the first activation `systemd` handles auto-start.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "1. Install cloudflared — add Cloudflare's apt repo: `curl -L https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null` (see official docs for the latest commands)",
        "2. Authenticate with Cloudflare — `cloudflared tunnel login`. Opens a browser (or shows a URL to copy) where you pick which domain the tunnel can manage",
        "3. Create the tunnel — `cloudflared tunnel create my-vps`. You get a UUID and a credentials file saved under `~/.cloudflared/`",
        "4. Write config.yml — define which hostnames route to which internal services (see example above)",
        "5. Create DNS — `cloudflared tunnel route dns my-vps hub.eladjak.com`. This auto-creates a CNAME record pointing to the tunnel",
        "6. Run as a service — `cloudflared service install` creates a systemd unit that starts at every boot",
        "7. Verify — `systemctl status cloudflared` and `journalctl -u cloudflared -f` for monitoring",
      ],
      tips: [
        "If your domain is at a different registrar (Namecheap, GoDaddy, isoc.org.il for Israeli domains), first move the nameservers to Cloudflare. They give you 2 NS records to set at the registrar",
        "Israeli `.co.il` domains work great with Cloudflare. You need to move nameservers via isoc.org.il — a 24-hour but free process",
        "Cloudflare Zero Trust requires a one-time enable of 'Cloudflare Tunnels' in the dashboard under 'Zero Trust'. Their free tier includes 50 users",
      ],
      codeExample: {
        label: "Full install in 7 commands",
        code: "# 1. Install cloudflared (Debian/Ubuntu)\ncurl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb\nsudo dpkg -i cloudflared.deb\n\n# 2. Authenticate with Cloudflare\ncloudflared tunnel login\n\n# 3. Create a tunnel\ncloudflared tunnel create my-vps\n# Creates a UUID, prints: 'Created tunnel my-vps with id <UUID>'\n\n# 4. Set up config.yml (see example above)\nsudo nano /etc/cloudflared/config.yml\n\n# 5. Create the DNS record\ncloudflared tunnel route dns my-vps hub.example.com\n\n# 6. Run as a systemd service\nsudo cloudflared service install\nsudo systemctl enable --now cloudflared\n\n# 7. Verify\nsudo systemctl status cloudflared\ncurl -I https://hub.example.com",
      },
    },
    {
      id: "config",
      icon: GitBranch,
      title: "config.yml: advanced routing",
      subtitle: "Same tunnel — hundreds of services if you want",
      description:
        "config.yml is the file that defines the tunnel's behavior. You can route by hostname (like domains in nginx), by path, or by both. For me, a single tunnel serves 10+ different domains, each one going to a different Docker container.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "ingress — an array of rules. Each rule is checked in order; the first that matches wins. Always end with a catch-all `service: http_status:404`",
        "hostname — matches by domain. Supports wildcards: `*.example.com` catches every subdomain",
        "path — in addition to hostname, can match by regex on path: `path: ^/api/.*`",
        "service — what to do. Usually `http://localhost:PORT`, but also `https://`, `tcp://` (for DB connections), `unix:///path` (Unix sockets), and `http_status:CODE`",
        "originRequest — traffic settings: `noTLSVerify: true` (if the internal service uses an invalid cert), `httpHostHeader` (replace the Host header), `connectTimeout`",
        "tunnel: hello-world — built-in test service. `service: hello_world` returns a Cloudflare page proving the tunnel works",
        "Reload — to update config without downtime: `systemctl reload cloudflared`. It re-reads the file without dropping connections",
      ],
      tips: [
        "Always add `path: \"^/(metrics|admin)\"` with `service: http_status:403` to block sensitive endpoints — even if the service itself doesn't protect them",
        "Cloudflare Tunnels also support non-HTTP — you can expose SSH (`tcp://localhost:22`) or DB (`tcp://localhost:5432`) over the tunnel. Access is only available via cloudflared client on the connecting machine",
        "VS Code has a 'Cloudflare Tunnel' extension that shows active tunnels and lets you edit configs from inside the IDE",
      ],
      codeExample: {
        label: "Full config.yml: 4 domains, path security, and WebSocket",
        code: "tunnel: 12345678-abcd-...\ncredentials-file: /etc/cloudflared/12345678-abcd-...json\n\n# Defaults applied to every rule\noriginRequest:\n  connectTimeout: 30s\n  noTLSVerify: false\n\ningress:\n  # 1. Internal dashboard — requires Cloudflare Access\n  - hostname: dashboard.example.com\n    service: http://localhost:3000\n\n  # 2. Public API — but blocks /admin\n  - hostname: api.example.com\n    path: ^/admin/?\n    service: http_status:403\n  - hostname: api.example.com\n    service: http://localhost:3001\n\n  # 3. WebSocket service\n  - hostname: ws.example.com\n    service: http://localhost:3710\n    originRequest:\n      noHappyEyeballs: true  # helpful for WebSockets\n\n  # 4. Wildcard for every other subdomain\n  - hostname: '*.example.com'\n    service: http://localhost:8080\n\n  # Required catch-all\n  - service: http_status:404",
      },
    },
    {
      id: "access",
      icon: Lock,
      title: "Cloudflare Access: zero-trust without VPN",
      subtitle: "Require auth before reaching the application at all",
      description:
        "Cloudflare Access is the Tunnel extension that turns it into a zero-trust gateway. Instead of your application handling login, Cloudflare itself requires the user to identify (via Google, GitHub, enterprise SSO, or an email one-time-pin) — and only if they pass does the request reach your service. The free tier includes 50 users, which makes it perfect for private dashboards, admin panels, or dev tools you want to be reachable from anywhere but only by you.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "Application — in the Zero Trust dashboard, you create an 'application' representing the domain/path. For example `dashboard.example.com`",
        "Policies — rules for who's allowed. 'Allow if email ends with @company.com', 'Allow if user is in GitHub org X', 'Require MFA'",
        "Identity providers — Google, GitHub, GitLab, Okta, Azure AD, SAML — all the big ones supported for free",
        "JWT validation — after a user authenticates, Cloudflare attaches a JWT to the request. Your service can validate it if it wants to know who the user is",
        "Service tokens — for automation (CI/CD, scripts). You get client_id + client_secret instead of human auth",
        "Browser-based SSH — Cloudflare lets you connect via SSH through the browser, with SSO auth. Bonus: no need to hold an SSH key on the device",
        "Audit log — Cloudflare logs every login. In their dashboard you can see who logged in from where and when",
      ],
      tips: [
        "My internal agent network dashboard is protected by Access — only one email is allowed (mine). If I want to give a colleague access — I add an email in the dashboard, that's it",
        "Access blocks _before_ the request reaches the tunnel. It's an extra security layer — if there's a vulnerability in the app, the attacker never reaches it",
        "For API endpoints you want to protect without a browser — use service tokens. In curl: `-H 'CF-Access-Client-Id: ...' -H 'CF-Access-Client-Secret: ...'`",
      ],
    },
    {
      id: "use-cases",
      icon: Globe,
      title: "Practical use cases",
      subtitle: "Not just for exposing public sites",
      description:
        "Cloudflare Tunnel is powerful any time you need to expose something internal to the world. Here are the most common uses I've seen with myself and with clients.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "Home server — expose Plex, Home Assistant, Nextcloud from home to the internet. No port forwarding on the router, no DDNS",
        "VPS with a domain — expose an app on a VPS without a static IP or SSL. The domain points at Cloudflare, which forwards through the tunnel",
        "Local development demo — show a client an app running on your localhost. `cloudflared tunnel --url http://localhost:3000` gives you a temporary URL in 10 seconds",
        "Remote MySQL/Postgres — internal DB that needs to be reachable from an external BI tool. Instead of a VPN — Tunnel + Access + service token",
        "Webhook receiver — a temporary tunnel to receive webhooks from an external system during development. Much nicer than free ngrok (whose URL changes every time)",
        "Multi-region serving — hub.eladjak.com is served from the Cloudflare datacenter in Tel Aviv for users in Israel, and from Frankfurt for users in Europe. Automatically, for free",
        "GitHub Actions runner — a runner that runs on your server and receives jobs from GitHub. Instead of opening a port — a tunnel",
      ],
      tips: [
        "The CLI allows ad-hoc tunnels with no setup: `cloudflared tunnel --url http://localhost:3000`. Returns `https://random-words.trycloudflare.com` for a few hours. Excellent for testing",
        "If you use Cloudflare Pages for static + Tunnel for your API, you have a complete stack with no other cloud provider",
        "Tunnels are idempotent — if the config file changes, the upgrade is smooth. You can change routing in production without downtime",
      ],
    },
    {
      id: "vs-alternatives",
      icon: Network,
      title: "Alternatives: ngrok, Tailscale, FRP",
      subtitle: "When to pick which",
      description:
        "Cloudflare Tunnel isn't alone in the market, but it has the most generous free tier and the easiest setup for a VPS that serves web. Here's a comparison to the popular alternatives.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "ngrok — the veteran alternative. Free tier limited to a changing URL and 1 connection. Excellent for dev and short-lived webhooks; for production you have to pay",
        "Tailscale — VPN mesh. Excellent for connecting private machines (lab, home computer, VPS), but doesn't expose to the wide world — requires both sides to be in the tailnet",
        "Self-hosted FRP / WireGuard — open source, free. Requires a cloud server with a public IP to act as a relay. More work but zero vendor dependency",
        "Inlets — a more open-model alternative. Requires your own relay server",
        "Cloudflare Tunnel — free without limits, DDoS protection, CDN, and Access for everything. The only downside: you depend on Cloudflare (if they're down, so are you). 2-3 such cases happened in 2024-2025",
        "Quick comparison: for local dev → ngrok or free cloudflared. For production on a VPS → Cloudflare Tunnel. For an office with a few machines → Tailscale. For full self-managed setup → WireGuard",
      ],
      tips: [
        "You don't have to pick just one — I have Cloudflare Tunnel for what needs to be public, and Tailscale to connect my laptop to the VPS for work (SSH, debugging)",
        "Don't rely on a single foreign service for everything. Free is nice, but a backup = the ability to switch to nginx + an open port if Cloudflare goes down",
        "Cloudflare Pro ($20/month) unlocks more features: WAF rules, image optimization, mobile optimization. Worth it if the site is a revenue source",
      ],
    },
  ],
  resources: [
    {
      title: "Cloudflare Tunnel Docs",
      description: "The official docs — well-organized with examples",
      href: "https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/",
      icon: BookOpen,
    },
    {
      title: "Zero Trust Dashboard",
      description: "Where you manage tunnels, applications, and policies",
      href: "https://one.dash.cloudflare.com/",
      icon: ExternalLink,
    },
    {
      title: "cloudflared on GitHub",
      description: "The open-source code of the daemon — worth knowing what's running",
      href: "https://github.com/cloudflare/cloudflared",
      icon: Github,
    },
    {
      title: "Tailscale",
      description: "An alternative for an internal VPN — not for the public web",
      href: "https://tailscale.com",
      icon: ExternalLink,
    },
    {
      title: "Cloudflare Free Plan",
      description: "The most generous free offer on the internet — see what's included",
      href: "https://www.cloudflare.com/plans/",
      icon: ExternalLink,
    },
    {
      title: "The nginx guide",
      description: "When you still want nginx on the server (yes, usually even with a Tunnel)",
      href: "/en/guide/nginx",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Want to move your server to a tunnel?",
  ctaSub:
    "I have no port open except 22, and every domain works. I can move your server to a Tunnel in 30 minutes.",
  primaryCta: {
    label: "Tunnel Quickstart",
    href: "https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "Book a VPS migration time",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "All my domains (fullstack-eladjak.co.il, hub.eladjak.com, and others) go through Cloudflare Tunnel, and no port besides SSH is open on Hetzner. I made the switch in early 2025 and never went back. This guide is built on my live config plus helping 3 clients migrate.",
};
