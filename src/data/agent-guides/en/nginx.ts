import {
  Network,
  Shield,
  Zap,
  GitBranch,
  Layers,
  Terminal,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Users,
  Mail,
  Activity,
  Server,
  Lock,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const nginxGuideEn: AgentGuideData = {
  slug: "nginx",
  agentName: "Nginx",
  agentNameHe: "Nginx — The Edge Server That Sorts All Traffic",
  category: "infra",
  brandIconSlug: "nginx",
  brandIconColor: "009639",
  heroBgImage: "/images/guides/guide-nginx-hero.jpg",
  tagline: "reverse proxy, SSL termination, and load balancing — everything that sits in front of your application",
  heroDescription:
    "Nginx (pronounced 'engine-x') is an open-source web server and reverse proxy that as of 2026 runs roughly a third of all websites in the world, and that is no accident. It is exceptionally fast (handles 10,000 concurrent connections on a small server), uses very little RAM (typically 50MB), and is rock-solid stable — for me (Elad), the same nginx process runs for months on end without ever needing a restart. Its classic role is 'reverse proxy': a server that sits at the edge of your VPS, receives every request from the internet, and decides which internal service to route each one to. On my Hetzner VPS, nginx receives every request hitting `fullstack-eladjak.co.il`, `hub.eladjak.com`, and a dozen subdomains — and routes each one to the right Docker container among 13 agents running on internal ports 3700-3900. It also handles SSL/HTTPS (the certificates themselves are free from Let's Encrypt), compresses responses, and serves static files faster than any application server. Popular alternatives (Caddy, Traefik) are easier to configure, but nginx remains the standard because it is everywhere and the documentation is enormous. If you build a serious server — get to know it.",
  badgeText: "2026 · Reverse Proxy · Practical guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/nginx",
  stats: [
    { label: "subdomains I run", value: "10+" },
    { label: "concurrent connections", value: "10k+" },
    { label: "RAM footprint", value: "~50MB" },
    { label: "nginx uptime", value: "99.99%" },
  ],
  paradigmTitle: "Why you need a server in front of your server",
  paradigmSub:
    "Your application doesn't need to know about SSL, compression, or rate limiting. nginx handles all that before the request ever reaches it.",
  paradigmShifts: [
    {
      before: "Every app listens on :443 and handles SSL itself",
      after: "nginx accepts everything and forwards in plain HTTP",
      icon: Lock,
    },
    {
      before: "10 services = 10 domains = 10 SSL setups",
      after: "nginx + certbot = one cert, auto-renewing",
      icon: Shield,
    },
    {
      before: "Shutdown for an upgrade = downtime for everyone",
      after: "blue/green via nginx upstream — zero downtime",
      icon: GitBranch,
    },
    {
      before: "Bots and DDoS flood the application",
      after: "rate limiting in nginx — the app never sees them",
      icon: Activity,
    },
  ],
  whoIsThisFor: [
    {
      title: "Anyone running a VPS with more than one service",
      description:
        "Once you have an API + a dashboard + a landing page, you need someone to split traffic by domain/path.",
      icon: Server,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Devs migrating from Vercel/Netlify",
      description:
        "Suddenly you need SSL, compression, redirects. nginx does everything Platform-as-a-Service used to do for you.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Teams that need rate limiting/security",
      description:
        "Protect APIs from bots, geo-block countries, throttle by IP. All in nginx, without touching the code.",
      icon: Shield,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Anyone who wants to understand the web",
      description:
        "nginx is the infrastructure layer of most of the internet. Learning it = learning how web traffic actually flows.",
      icon: Network,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "reverse-proxy", label: "Reverse proxy" },
    { id: "ssl", label: "SSL/HTTPS" },
    { id: "advanced", label: "Advanced" },
    { id: "alternatives", label: "Alternatives" },
    { id: "debugging", label: "Debugging" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Server,
      title: "What is Nginx? The role of the 'edge server'",
      subtitle: "The first server every request meets",
      description:
        "Nginx is a piece of software you install on a server with a single purpose: sit on the public ports (80 for HTTP, 443 for HTTPS), receive every request from the internet, and do something smart with them — serve a static file, route to an internal application, or reject them. That's different from a regular application server (Node, Python, Go) which is busy with business logic; nginx is built specifically to handle huge numbers of concurrent open connections without spawning a process per connection (event-driven). That is what lets it serve more traffic on the same hardware.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "Think of it like the receptionist in a big office: everyone who walks in goes to them first, and they decide which room to direct them to. They don't do the actual work — they just route. Without that receptionist, every guest would need to know where everyone sits, and it would be chaos. nginx is the internet's receptionist.",
      content: [
        "Server block — a 'site' definition in nginx. Says: 'when someone hits domain X, do Y'. You can define dozens of blocks on one server, each for a different domain",
        "Location block — inside a server block, you can define different behavior per path. `/api` routes to an app, `/static` serves files, `/` routes elsewhere",
        "Upstream — a group of backend servers you can spread traffic across (load balancing). Useful when you have multiple instances of the same app",
        "Proxy pass — the magic command: `proxy_pass http://localhost:3001` — sends the request to that internal service and returns the response to the user",
        "Static files — nginx is excellent at serving files from disk (HTML, CSS, JS, images). 100x faster than Node or Python",
        "Worker processes — nginx runs several worker processes in parallel, one per CPU core. That's how it efficiently uses all the hardware",
      ],
      tips: [
        "On Ubuntu/Debian: `apt install nginx` — installs as a service that auto-starts on every reboot",
        "Files live in `/etc/nginx/`. The main file is `nginx.conf`, sites in `sites-available/` with a symlink to `sites-enabled/`",
        "After every config change: `nginx -t` (syntax check) and then `systemctl reload nginx` (hot reload, no downtime)",
      ],
      codeExample: {
        label: "A basic server block",
        code: "server {\n    listen 80;\n    server_name example.com www.example.com;\n\n    location / {\n        root /var/www/example;\n        index index.html;\n        try_files $uri $uri/ =404;\n    }\n\n    # Per-site logs\n    access_log /var/log/nginx/example.access.log;\n    error_log /var/log/nginx/example.error.log;\n}",
      },
    },
    {
      id: "reverse-proxy",
      icon: Network,
      title: "Reverse Proxy: the heart of modern usage",
      subtitle: "How to route traffic to dozens of internal services",
      description:
        "Reverse proxy is the technical name for nginx's classic role in 2026: stand in front of the internet, receive all requests, and route them to the right internal backend. 'Reverse' because unlike a regular proxy that 'hides' the client (like a VPN), a reverse proxy hides the servers — the client thinks it's talking to one server, but there are actually dozens behind it. On my setup, nginx receives requests for dozens of subdomains and routes each one to a different Docker container running on an internal port.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "proxy_pass — the central command. `proxy_pass http://localhost:3001/` — takes the request and forwards it to the internal service",
        "proxy_set_header — passes information about the original client to the internal service (`X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`). Important so the application knows who actually made the request",
        "WebSocket support — `proxy_http_version 1.1` + the `Upgrade` and `Connection` headers. Without these, WebSocket connections will break",
        "Buffering — by default nginx collects the entire response before sending. For streaming (SSE, video) you need `proxy_buffering off`",
        "Timeouts — `proxy_read_timeout` matters for long requests (LLM, video processing). Default is 60s, often you need much more",
        "Path-based routing — the same domain can route by path: `/api/v1` → service A, `/api/v2` → service B, `/` → frontend",
      ],
      tips: [
        "Always include the trailing slash in proxy_pass: `proxy_pass http://x:3001/` (with /) is different from `proxy_pass http://x:3001` (without). The difference is how the path is forwarded. Read the docs once and pin it",
        "For large file uploads add `client_max_body_size 100M;` inside the server block. The default 1M is too small for most cases",
        "For me, every per-service config lives in `/etc/nginx/sites-available/<service>.conf` — easy to edit, easy to diff in git, easy to enable/disable individually",
      ],
      codeExample: {
        label: "Full reverse proxy to a Dockerized agent",
        code: "# /etc/nginx/sites-available/hub.eladjak.com.conf\nserver {\n    listen 443 ssl http2;\n    server_name hub.eladjak.com;\n\n    ssl_certificate     /etc/letsencrypt/live/hub.eladjak.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/hub.eladjak.com/privkey.pem;\n\n    client_max_body_size 50M;\n\n    location / {\n        proxy_pass http://127.0.0.1:3710/;\n        proxy_http_version 1.1;\n        proxy_set_header Host              $host;\n        proxy_set_header X-Real-IP         $remote_addr;\n        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n\n        # WebSocket support\n        proxy_set_header Upgrade    $http_upgrade;\n        proxy_set_header Connection 'upgrade';\n\n        # Timeouts for long LLM requests\n        proxy_read_timeout 300s;\n        proxy_send_timeout 300s;\n    }\n}\n\n# Redirect HTTP to HTTPS\nserver {\n    listen 80;\n    server_name hub.eladjak.com;\n    return 301 https://$host$request_uri;\n}",
      },
    },
    {
      id: "ssl",
      icon: Lock,
      title: "SSL/HTTPS with Let's Encrypt",
      subtitle: "Free certificates, auto-renewing, on every domain",
      description:
        "Let's Encrypt is a free Certificate Authority that issues SSL certs for any domain you own. The standard tool for issuing and renewing them is certbot. The flow: certbot requests a cert → Let's Encrypt asks you to prove ownership (creates a temporary file at a specific path on your server) → after verification, you receive a 90-day cert that auto-renews every 60 days. All of this runs in the background and you don't have to think about it.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "Install: `apt install certbot python3-certbot-nginx` (recommended — automatic nginx integration)",
        "Issue first cert: `certbot --nginx -d example.com -d www.example.com`. certbot edits your nginx config for you",
        "Auto-renewal — `apt install certbot` already installs a systemd timer that runs twice a day. Verify with `systemctl list-timers | grep certbot`",
        "Wildcard certificates (`*.example.com`) — require the DNS challenge instead of HTTP. `certbot --manual --preferred-challenges dns -d '*.example.com'`",
        "TLS versions — disable 1.0 and 1.1 (vulnerable). Set `ssl_protocols TLSv1.2 TLSv1.3`",
        "HSTS — header that tells the browser 'always use HTTPS for this domain'. Add `add_header Strict-Transport-Security 'max-age=31536000; includeSubDomains' always;`",
        "OCSP stapling — speeds up the SSL handshake. `ssl_stapling on; ssl_stapling_verify on;`",
      ],
      tips: [
        "Mozilla provides an SSL config generator: ssl-config.mozilla.org — pick your nginx version and get an optimal, secure config",
        "Don't forget to keep port 80 open in the firewall even after moving to HTTPS — Let's Encrypt needs it for renewal verification",
        "If you're behind Cloudflare you can pick 'Full (strict)' in Cloudflare and still use Let's Encrypt on the server, or use a Cloudflare Origin certificate (15 years, free)",
      ],
      codeExample: {
        label: "Initial HTTPS setup for a domain",
        code: "# 1. Make sure DNS points to the server\ndig +short example.com\n# Should return the VPS IP\n\n# 2. Install certbot with the nginx plugin\nsudo apt update\nsudo apt install -y certbot python3-certbot-nginx\n\n# 3. Issue cert (also edits the nginx config!)\nsudo certbot --nginx \\\n  -d example.com -d www.example.com \\\n  --email you@example.com \\\n  --agree-tos --no-eff-email\n\n# 4. Verify auto-renewal works\nsudo certbot renew --dry-run\n\n# 5. Check the security score\n# https://www.ssllabs.com/ssltest/analyze.html?d=example.com",
      },
    },
    {
      id: "advanced",
      icon: Zap,
      title: "Advanced: rate limiting, caching, load balancing",
      subtitle: "The features that turn nginx into a defense and optimization tool",
      description:
        "After we've solved reverse proxy and SSL, nginx offers another layer of capabilities that can save real money and protect the application: rate limiting (capping requests per IP — prevents DDoS and bot abuse), caching (storing responses in memory — cuts DB calls), and load balancing (spreading traffic across multiple backends — both for throughput and failover).",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      content: [
        "Rate limiting — `limit_req_zone` defines a 'zone' of IPs with a ceiling. For example '10 requests per second per IP'. Then `limit_req zone=...` activates it on a specific location",
        "Connection limiting — `limit_conn_zone` caps the number of open connections per IP. Useful against slow-loris attacks",
        "Caching — `proxy_cache_path` defines a disk cache (under `/var/cache/nginx/`). Then `proxy_cache zone_name` in a specific location. First response slow, the rest blazing fast",
        "Load balancing — `upstream` defines a server group. Default is round-robin, you can pick `least_conn` (sends to the server with fewest connections) or `ip_hash` (always the same IP to the same server — sticky sessions)",
        "Gzip / Brotli — response compression. `gzip on; gzip_types text/css application/json application/javascript;` cuts 70-90% of bandwidth",
        "Geo blocking — block countries by IP. `geo $country { default ok; include /etc/nginx/blocked-countries.conf; }` and then `if ($country = blocked) { return 403; }`",
        "Custom error pages — `error_page 500 502 503 504 /50x.html;` — a nice page instead of the generic nginx message",
      ],
      tips: [
        "Rate limiting is excellent against botnets, but be careful: apply it only to expensive endpoints (login, search) — not to the home page. Otherwise you'll block real users",
        "Caching API responses is the dream — but make sure you handle cache invalidation correctly. The iron rule: one check whether the data updates, then decide",
        "Load balancing only helps with 2+ instances of the same app. With one instance, nginx just forwards to that backend every time — no difference",
      ],
      codeExample: {
        label: "rate limiting + caching + load balancing",
        code: "# Global config (http block)\nlimit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;\n\nproxy_cache_path /var/cache/nginx levels=1:2\n  keys_zone=api_cache:10m max_size=1g\n  inactive=60m use_temp_path=off;\n\nupstream api_backends {\n    least_conn;\n    server 127.0.0.1:3001 weight=2;\n    server 127.0.0.1:3002 weight=1;\n    server 127.0.0.1:3003 backup;  # only if the others are down\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name api.example.com;\n\n    location /search {\n        # rate limit with burst of 20\n        limit_req zone=api burst=20 nodelay;\n\n        # 5-minute cache\n        proxy_cache api_cache;\n        proxy_cache_valid 200 5m;\n        proxy_cache_use_stale error timeout updating;\n        add_header X-Cache-Status $upstream_cache_status;\n\n        proxy_pass http://api_backends;\n    }\n}",
      },
    },
    {
      id: "alternatives",
      icon: GitBranch,
      title: "Caddy, Traefik, and when to pick which",
      subtitle: "nginx is the standard, but not always the right choice",
      description:
        "In 2026 there are three main reverse-proxy choices for a personal server: nginx (the veteran, the standard), Caddy (the new one, ridiculously simple), and Traefik (built for Docker). Each will work well — the question is how much complexity you're willing to pay for how much power. My early servers were all on nginx, and then I switched to Caddy and never looked back. But nginx remains the industry standard, and you'll meet it at clients.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "Caddy — the file is called Caddyfile, an extremely simple format. One line = automatic SSL from Let's Encrypt, no certbot, no setup. Excellent for side projects and personal projects",
        "Traefik — auto-connects to Docker labels. Add `traefik.http.routers.x.rule=Host('x.com')` to a container and Traefik routes to it automatically. Great for Docker-only setups",
        "nginx — the most capability, the largest documentation, available everywhere. But you have to learn more, and certificates require a separate certbot",
        "Performance — all three are similar under normal load. nginx wins slightly under extreme load, Caddy second, Traefik third. In most cases the difference is insignificant",
        "OpenResty — an nginx extension with embedded Lua. Allows advanced logic in config. For people who need a serious API gateway",
        "HAProxy — a fourth option, specialized in TCP/HTTP load balancing. Especially fast and stable, but less common as a plain HTTP reverse proxy",
      ],
      tips: [
        "Starting a new project in 2026 and want simple? — start with Caddy. Building something that will reach serious production or clients? — learn nginx",
        "My move from nginx to Caddy cut 70% of the config code. Instead of 50 lines of nginx config per service — 3 lines of Caddyfile",
        "Cloudflare Tunnel + Caddy/nginx on the server is a winning combo — DDoS protection, CDN, and SSL from Cloudflare, while still keeping full control of routing on the server",
      ],
      codeExample: {
        label: "Comparison: same setup in Caddy vs nginx",
        code: "# Caddyfile (5 lines for a full config of 2 services)\nhub.eladjak.com {\n    reverse_proxy localhost:3710\n}\napi.eladjak.com {\n    reverse_proxy localhost:3001 localhost:3002\n}\n\n# ====================================\n# nginx (same thing ~30 lines + certbot setup)\n# server { ... } x 2 like the reverse proxy section showed",
      },
    },
    {
      id: "debugging",
      icon: Terminal,
      title: "Debugging: logs, config check, and tools",
      subtitle: "When something doesn't work — where to start",
      description:
        "Most nginx problems are misconfiguration (forgotten slash, header that wasn't passed, wrong port), or DNS/firewall/SSL. nginx gives you excellent logs if you know where to look, plus a few simple tools that solve 90% of cases in minutes.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "`nginx -t` — checks the syntax of every config file. Always run before reload. If it doesn't pass, nginx keeps running with the old config",
        "`systemctl reload nginx` — hot reload. Zero downtime, only if `nginx -t` passed. If something is broken — `systemctl status nginx` shows where",
        "`/var/log/nginx/access.log` — every request that arrived: IP, path, status, time. `tail -f` to watch traffic in real time",
        "`/var/log/nginx/error.log` — errors. If something doesn't work, this is where you find why. SSL errors, timeouts, upstream down — it's all here",
        "`curl -I https://example.com` — checks the headers nginx returns. You see status, redirects, caching",
        "`openssl s_client -connect example.com:443 -servername example.com` — inspects the SSL cert: who issued it, when it expires, which protocols are supported",
        "ssllabs.com — checks your SSL security. Goal: A or A+",
      ],
      tips: [
        "When something doesn't work, step 1 always: `tail -f /var/log/nginx/error.log` and then open the page in the browser. The error appears immediately",
        "In nginx, the order of directives matters — more specific `location` first, less specific after. When something 'weird' happens, verify the right location is matched",
        "Add to every server block: `add_header X-Served-By 'nginx-prod' always;`. That way when you're trying to debug, you immediately see which server the response came from",
      ],
    },
  ],
  resources: [
    {
      title: "Nginx Docs",
      description: "The official docs — comprehensive but a bit dry. Read the intro",
      href: "https://nginx.org/en/docs/",
      icon: BookOpen,
    },
    {
      title: "Mozilla SSL Config Generator",
      description: "Optimal SSL config ready to copy — by nginx version",
      href: "https://ssl-config.mozilla.org/",
      icon: ExternalLink,
    },
    {
      title: "DigitalOcean nginx tutorials",
      description: "The clearest tutorials in plain language for every topic",
      href: "https://www.digitalocean.com/community/tags/nginx",
      icon: BookOpen,
    },
    {
      title: "Caddy",
      description: "A simpler alternative with automatic SSL",
      href: "https://caddyserver.com",
      icon: ExternalLink,
    },
    {
      title: "Let's Encrypt",
      description: "Free SSL certs — with certbot it's 5 minutes of work",
      href: "https://letsencrypt.org",
      icon: ExternalLink,
    },
    {
      title: "The Cloudflare Tunnel guide",
      description: "An alternative to nginx + opening ports — all without exposing the VPS",
      href: "/en/guide/cloudflare-tunnel",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Need help configuring nginx?",
  ctaSub:
    "An nginx config is the kind of thing that pays to invest in once and use for years. I can set yours up in an hour.",
  primaryCta: {
    label: "Nginx Beginners Guide",
    href: "https://nginx.org/en/docs/beginners_guide.html",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "Book a VPS setup",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "On my Hetzner VPS, nginx routes 10+ subdomains to 13 different containers, handles SSL from Let's Encrypt, and runs for years on end without maintenance. I've moved a few personal projects to Caddy, but nginx remains the standard I recommend for any project working with clients. This guide is built on years of setups and patches.",
};
