import {
  Shield,
  Lock,
  Network,
  Terminal,
  Activity,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Users,
  Mail,
  Server,
  AlertCircle,
  Eye,
  Layers,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const ufwGuideEn: AgentGuideData = {
  slug: "ufw",
  agentName: "UFW",
  agentNameHe: "UFW — Simple Ubuntu Firewall In One Command",
  category: "infra",
  brandIconSlug: "",
  tagline: "Uncomplicated Firewall — three commands between an exposed server and a hardened one",
  heroDescription:
    "UFW (short for Uncomplicated Firewall) is a command-line tool for Ubuntu that wraps Linux's iptables in clear, simple syntax. iptables itself is the standard Linux firewall tool since the early 2000s — extremely powerful, but punishingly complex (commands with 6 parameters, chains and tables and policies). UFW takes all that power and exposes it through an interface you can learn in 5 minutes: 'allow SSH', 'block everything else', 'enable'. That is exactly what most personal-VPS users need. For me (Elad) on Hetzner, UFW is the first line of defense: it blocks everything except SSH (22), HTTP (80, for Let's Encrypt), and HTTPS (443). All 13 agents running on internal ports 3700-3900 are not reachable from the internet at all — UFW simply ignores requests to them. It complements Cloudflare Tunnel perfectly: if something in the Tunnel breaks and a port suddenly opens — UFW still blocks. Two layers of defense instead of one. This guide will show you the 5 commands you'll use 100% of the time and the common configurations every production VPS needs.",
  badgeText: "2026 · Linux Firewall · Practical guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/ufw",
  stats: [
    { label: "open ports I run", value: "3" },
    { label: "commands to know", value: "5" },
    { label: "install", value: "built-in" },
    { label: "cost", value: "free" },
  ],
  paradigmTitle: "Default: deny everything",
  paradigmSub:
    "The right question isn't 'what do I block' but 'what do I _allow_'. UFW turns that mindset into commands.",
  paradigmShifts: [
    {
      before: "Hundreds of iptables commands with arcane syntax",
      after: "`ufw allow 22/tcp` — one clear command",
      icon: Terminal,
    },
    {
      before: "Exposed server — 'who even knows about it?'",
      after: "Locked-down server — even if they know, they can't get in",
      icon: Lock,
    },
    {
      before: "Opened a port for a quick test, forgot to close it",
      after: "`ufw status` shows everything — no surprises",
      icon: Eye,
    },
    {
      before: "Rules are wiped after a reboot",
      after: "`ufw enable` saves automatically, comes back after boot",
      icon: Shield,
    },
  ],
  whoIsThisFor: [
    {
      title: "Anyone spinning up a fresh VPS",
      description:
        "Step 1 on a new server: SSH. Step 2: UFW. Without it you're inviting the internet to peek in.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Devs migrating from PaaS to a server",
      description:
        "On Vercel/Heroku there is no firewall — the provider handles it. On a VPS, you do. UFW makes that simple.",
      icon: Server,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Linux students",
      description:
        "iptables is a headache. UFW wraps it in syntax a 10-year-old could read.",
      icon: Layers,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Teams that need DevSecOps",
      description:
        "A firewall = compliance requirement. UFW provides it without enterprise solution overhead.",
      icon: Shield,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "essentials", label: "5 commands" },
    { id: "real-world", label: "Real scenarios" },
    { id: "advanced", label: "Advanced" },
    { id: "troubleshooting", label: "Debugging" },
    { id: "alternatives", label: "Alternatives" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Shield,
      title: "What is a firewall and why you need one",
      subtitle: "The first guard at the entrance to your network",
      description:
        "A firewall is software that sits at your network card's entrance and inspects every packet that arrives — if it matches an allow rule, it passes through; if not, it gets dropped. Without a firewall, every service listening on your server is open to the world — including ports you didn't even know were open (like a database you tried once or a dev service you forgot to stop). On a fresh VPS, internet scanners will find you within minutes and try to break in. UFW makes that defense simple: default 'block everything', you allow only what you need.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "Think of UFW like a guard at an office: there's a list of people allowed in (allowed ports), and anyone not on the list — doesn't get in, no matter how hard they push. Without a guard, anyone can walk in unchecked — including the ones looking for trouble.",
      content: [
        "Packet — the basic unit of network traffic. Every HTTP request, every ping, every SSH connection — is built from packets",
        "Port — a number between 0-65535 that identifies which service is listening. 22 = SSH, 80 = HTTP, 443 = HTTPS, 5432 = Postgres, plus thousands more",
        "TCP / UDP — two traffic types. TCP = reliable (HTTP, SSH); UDP = fast (DNS, video). UFW handles both",
        "Inbound vs Outbound — incoming traffic (from the internet to you) and outgoing (from you outward). UFW by default allows outbound, blocks inbound",
        "Rule — a rule. 'Allow TCP on port 22 from anywhere' = most VPSes. You can add restrictions (only from a specific IP, only at certain times)",
        "iptables / nftables — the kernel mechanism UFW uses behind the scenes. iptables on Ubuntu 20.04 and below, nftables on 22.04 and above",
      ],
      tips: [
        "UFW is already installed on Ubuntu desktop and server. But it isn't enabled by default — needs a manual `ufw enable`",
        "If you use Docker — note that Docker can open ports bypassing UFW. Special handling required (see advanced section)",
      ],
    },
    {
      id: "essentials",
      icon: Terminal,
      title: "The 5 commands you'll use 100% of the time",
      subtitle: "ufw status, allow, deny, delete, enable",
      description:
        "Most of what you'll do with UFW boils down to five simple commands. Know them and you're set for 99% of cases.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "`ufw status` — shows current state + rule list. Add `verbose` to also see logging and default policies",
        "`ufw allow <port>` — adds a rule that allows. `ufw allow 22/tcp` or just `ufw allow ssh` (UFW knows service names)",
        "`ufw deny <port>` — explicitly blocks a port. Useful to block something that was previously allowed",
        "`ufw delete <rule_number>` — removes a rule. You get numbers from `ufw status numbered`",
        "`ufw enable` / `ufw disable` — turns on/off. Warning: enable can cut your SSH if you didn't add a rule first!",
        "`ufw reset` — wipes all rules and disables. Useful for a clean start",
        "`ufw default deny incoming` / `ufw default allow outgoing` — sets defaults. Always run both at the start",
      ],
      tips: [
        "Always run `ufw allow ssh` before `ufw enable` — otherwise you cut yourself off and have to talk to the hosting provider for an emergency console",
        "UFW supports service names: `ufw allow ssh`, `ufw allow http`, `ufw allow https`. It knows which port",
        "`ufw status verbose` is much more informative than plain `ufw status`. Train yourself to run verbose",
      ],
      codeExample: {
        label: "Initial setup of a new VPS",
        code: "# 1. Make sure UFW is installed (Ubuntu/Debian)\nsudo apt install -y ufw\n\n# 2. Sane defaults\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\n\n# 3. Allow what you need\nsudo ufw allow ssh        # 22, critical!\nsudo ufw allow http       # 80, for Let's Encrypt\nsudo ufw allow https      # 443\n\n# 4. Enable UFW\nsudo ufw enable\n# Y to confirm (warning: this can cut SSH if you forgot)\n\n# 5. Verify\nsudo ufw status verbose\n# Status: active\n# Default: deny (incoming), allow (outgoing)\n# 22/tcp                     ALLOW IN    Anywhere\n# 80/tcp                     ALLOW IN    Anywhere\n# 443/tcp                    ALLOW IN    Anywhere",
      },
    },
    {
      id: "real-world",
      icon: Network,
      title: "Real-world scenarios",
      subtitle: "The configs every production VPS needs",
      description:
        "After learning the basics, let's see what you'll actually do. Here are the most common setups on a production server.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "VPS with a web app — `allow ssh + http + https`. The standard stack, suitable for most cases",
        "VPS with a Cloudflare Tunnel — `allow ssh only`. Everything else flows through the tunnel and no other ports need opening",
        "External Postgres — `ufw allow from 1.2.3.4 to any port 5432`. Opens the port only to a specific IP",
        "SSH on a non-standard port — `ufw allow 2222/tcp`. In `/etc/ssh/sshd_config` change `Port 2222`. Filters 99% of bots",
        "rate limiting on SSH — `ufw limit ssh`. UFW automatically blocks an IP that tries to connect 6 times in 30 seconds. Excellent brute-force defense",
        "Internal app — don't open its port at all. Put it behind nginx on 80/443. My 13 agents on ports 3700-3900 are not exposed at all",
        "Webhook receiver with whitelist — if you know the calling service comes from a specific range, `ufw allow from <range> to any port <port>`",
      ],
      tips: [
        "On my Hetzner: `allow ssh limit + allow 80 + allow 443`. Nothing else. All agents are internal",
        "If you're behind a company VPN (Tailscale, WireGuard), you can tell UFW to allow only from the VPN: `ufw allow in on tailscale0`. Then even SSH is only open through the VPN",
        "Add `ufw allow from 10.0.0.0/8` to allow everything from a private network. Useful in multi-server setups",
      ],
      codeExample: {
        label: "Full firewall config for a VPS with Cloudflare Tunnel",
        code: "#!/bin/bash\n# Full firewall setup for a VPS with CF Tunnel\nset -euo pipefail\n\n# Reset UFW\nsudo ufw --force reset\n\n# Defaults\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\n\n# SSH with rate limiting (auto-blocks brute force)\nsudo ufw limit ssh comment 'SSH with rate limiting'\n\n# Because we have Cloudflare Tunnel, we don't need 80/443\n# All public traffic flows through cloudflared (outbound)\n\n# If we want access from Tailscale (internal VPN)\nsudo ufw allow in on tailscale0 comment 'Tailscale internal'\n\n# Enable\nsudo ufw enable\n\n# Final check\nsudo ufw status verbose\n# Expected:\n# 22/tcp (LIMIT IN)\n# Anywhere on tailscale0 (ALLOW IN)\n# That's it. Zero other ports open to the internet.",
      },
    },
    {
      id: "advanced",
      icon: Layers,
      title: "Advanced: profiles, IPv6, and Docker",
      subtitle: "What you need to know when the basics aren't enough",
      description:
        "After you have the basics, a few cases need special attention — mainly Docker (which bypasses UFW), IPv6 (default in 2026), and application profiles.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      content: [
        "Application profiles — UFW knows the names of popular apps. `ufw app list` shows the available ones. `ufw allow OpenSSH` instead of `ufw allow 22/tcp`",
        "IPv6 — `/etc/default/ufw` has an `IPV6=yes` (default in 2026). Always check it's on, otherwise attackers can come in over IPv6 and UFW won't block",
        "Docker bypasses UFW — Docker writes iptables directly, and UFW doesn't know about it. A port you 'open' with `docker run -p 80:80` will be open even if UFW says 'no'",
        "Docker fix 1 — bind to `127.0.0.1:80:80` instead of `80:80` in docker-compose. Then the port is only open to localhost and UFW is irrelevant",
        "Docker fix 2 — the `ufw-docker` package wraps UFW with Docker-aware rules. Install once and forget",
        "Logging — `ufw logging on` writes denied packets to `/var/log/ufw.log`. Useful to see who's trying to break in. But can grow fast — `medium` or `low` is recommended",
        "Conditional rules — `ufw allow from 1.2.3.4 to any port 22 proto tcp` — allows SSH only from a specific IP. Useful for fixed admins",
      ],
      tips: [
        "If you use Docker with UFW, take 1.5 minutes to install `ufw-docker`. It once prevented me from accidentally exposing a DB to the world",
        "Add `comment 'what this is'` to every rule. After 6 months when you come back to look at the rules, you'll remember why each one was added",
      ],
      codeExample: {
        label: "Handling Docker so it doesn't bypass UFW",
        code: "# Option 1: bind to localhost in docker-compose\nservices:\n  postgres:\n    image: postgres:16\n    ports:\n      - '127.0.0.1:5432:5432'  # localhost only — UFW irrelevant\n  api:\n    image: my-api\n    ports:\n      - '127.0.0.1:3000:3000'  # internal only, nginx will proxy\n\n# Option 2: ufw-docker (one-time install)\nsudo wget -O /usr/local/bin/ufw-docker \\\n  https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker\nsudo chmod +x /usr/local/bin/ufw-docker\nsudo ufw-docker install\nsudo systemctl restart ufw\n\n# Now you can manage container ports specifically\nsudo ufw-docker allow my-container 80/tcp\nsudo ufw-docker delete allow my-container 80/tcp",
      },
    },
    {
      id: "troubleshooting",
      icon: AlertCircle,
      title: "Debugging: what to do when something doesn't work",
      subtitle: "Common errors and their fixes",
      description:
        "Most UFW problems are either 'I blocked something I needed' or 'I locked myself out after enable'. Here's the orderly diagnosis.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "'Lost SSH after enable' — if you have hosting with a web console (Hetzner, DigitalOcean), open it and run `ufw allow ssh` then `ufw reload`. If not — contact support",
        "'Added allow but still blocked' — check `ufw status numbered`. Maybe there's a deny rule earlier. In UFW, rules are checked in order",
        "'The port is open from outside but not from inside' — UFW handles inbound interfaces only. If the service isn't listening on 0.0.0.0 (only on 127.0.0.1), it won't see external traffic",
        "'Can't find the rule I want to delete' — `ufw status numbered` numbers them. `ufw delete <number>` removes by number. Or `ufw delete allow ssh` for explicit removal",
        "'IPv6 not blocked' — `cat /etc/default/ufw | grep IPV6`. If `IPV6=no`, change to `yes` and run `ufw disable && ufw enable`",
        "Logs — `tail -f /var/log/ufw.log` shows what's blocked in real time. Useful to see whether a request arrived and was dropped",
        "`iptables -L -n -v` — shows the rules in raw iptables format. Useful when you suspect something is bypassing UFW",
      ],
      tips: [
        "Always make sure you have console access (web KVM at your VPS) before changing the firewall. It's the safety net",
        "Before confirming a big change, run `ufw show added` — it shows what'll take effect on the next refresh, without enabling",
      ],
    },
    {
      id: "alternatives",
      icon: Activity,
      title: "Alternatives: nftables, firewalld, fail2ban",
      subtitle: "What else exists in the Linux ecosystem",
      description:
        "UFW is the obvious choice for Ubuntu/Debian, but there are other tools that suit different situations.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "iptables — the classic tool. UFW wraps it. If you want full control (complex rules, NAT), use iptables directly. But the syntax is something else",
        "nftables — the modern successor to iptables. Built into the kernel since Ubuntu 22.04. UFW now uses it behind the scenes",
        "firewalld — the Red Hat/CentOS/Fedora alternative. Zone-based, more advanced than UFW. If you're on RHEL — that's the default",
        "fail2ban — not a firewall, but a great companion. It scans logs and automatically adds IPs that try to break in to the firewall. The best brute-force protection",
        "CrowdSec — the 'next generation' of fail2ban. Shares a global blocklist of dangerous IPs. Free for community, excellent for production servers",
        "iptables-persistent — if you prefer raw iptables, this package keeps rules across reboot",
        "Comparison: for desktop and simple servers → UFW. For a server with complex requirements → nftables directly. For RHEL → firewalld. Always combined with → fail2ban or CrowdSec",
      ],
      tips: [
        "My combo: UFW + fail2ban + Cloudflare WAF (part of free). Three layers of defense at no cost",
        "Don't run two firewalls together (UFW + firewalld for example). They'll tangle and cause weird bugs",
      ],
    },
  ],
  resources: [
    {
      title: "Ubuntu UFW Documentation",
      description: "The official docs — short and clear",
      href: "https://help.ubuntu.com/community/UFW",
      icon: BookOpen,
    },
    {
      title: "DigitalOcean UFW Tutorial",
      description: "The most recommended beginner tutorial",
      href: "https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu",
      icon: BookOpen,
    },
    {
      title: "ufw-docker",
      description: "The plugin that fixes Docker bypassing UFW",
      href: "https://github.com/chaifeng/ufw-docker",
      icon: Github,
    },
    {
      title: "fail2ban",
      description: "Mandatory companion to UFW — auto-blocks brute force",
      href: "https://www.fail2ban.org/",
      icon: ExternalLink,
    },
    {
      title: "CrowdSec",
      description: "Collective defense — global IP blocklist of attackers",
      href: "https://www.crowdsec.net/",
      icon: ExternalLink,
    },
    {
      title: "The Cloudflare Tunnel guide",
      description: "If you use a Tunnel, you need even fewer open ports",
      href: "/en/guide/cloudflare-tunnel",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Need server hardening?",
  ctaSub:
    "A 30-minute review can save you from disaster. I can audit your UFW + SSH + fail2ban.",
  primaryCta: {
    label: "UFW Manpage",
    href: "https://manpages.ubuntu.com/manpages/jammy/man8/ufw.8.html",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "Book a security audit",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "On my Hetzner UFW allows only 3 ports (SSH limit, 80, 443) — and that's one of the things that lets me sleep at night. There's also fail2ban that automatically bans any IP that tries SSH brute-force more than 3 times. A simple combo, a 5-minute fix, zero breaches since 2023.",
};
