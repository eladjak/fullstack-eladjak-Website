import {
  Container,
  Boxes,
  Network,
  HardDrive,
  GitBranch,
  Shield,
  Layers,
  Terminal,
  Zap,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Users,
  Mail,
  Settings,
  Activity,
  Archive,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const dockerGuideEn: AgentGuideData = {
  slug: "docker",
  agentName: "Docker",
  agentNameHe: "Docker — Containerize Your Server",
  category: "infra",
  logoImage: "/images/guide-logos/docker-logo.png",
  tagline: "containers, docker-compose, and the architecture that lets an entire agent network live on a single VPS",
  heroDescription:
    "Docker is one of the most important technologies to emerge from the software world in the last decade, and it is what allows most of today's cloud services and AI agents to run the way they do. At its core, Docker solves a simple but painful problem: every software service needs a specific environment to run (a particular language version, specific libraries, network settings), and when you try to install several services on the same machine they collide — and what worked yesterday stops working tomorrow. Docker solves this by packaging each service into its own isolated 'box' (a container), which holds everything the service needs — so it runs exactly the same on every machine, in every environment. Docker's extension called docker-compose lets you define many boxes together in a single file, spin them all up with one command, and manage the network between them — much like a conductor with an orchestra. For me (Elad), the entire agent network featured on this site (ten different services such as [Kami](/en/guide/kami), [Kaylee](/en/guide/kaylee), [Qdrant](/en/guide/qdrant), and [Delegator](/en/guide/delegator)) runs on a single docker-compose deployment on a Hetzner CPX11 (~€4.75/month, 2 vCPU · 2GB RAM). For you, Docker can be the foundation of any project: from a local dev environment, through a CI/CD pipeline, all the way to a full production service in the cloud. Once you understand docker-compose, most of what the other guides show becomes something you can build yourself.",
  badgeText: "2026 · Containers & Compose · Practical guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/docker",
  heroBgImage: "/images/guides/guide-docker-hero.jpg",
  videoUrl: "/videos/guides/docker.mp4",
  stats: [
    { label: "containers I run", value: "14" },
    { label: "uptime", value: "99.7%" },
    { label: "base server cost", value: "~€4.75/month" },
    { label: "compose files", value: "1" },
  ],
  paradigmTitle: "Why Docker is the foundation of the whole network",
  paradigmSub:
    "Without containers, running 10 different services on one server is a dependency nightmare. With docker-compose, it is a single YAML file.",
  paradigmShifts: [
    {
      before: "Installing Python 3.10 + 3.11 + 3.12 on the same server",
      after: "Every service in its own container with its own version. Zero conflicts.",
      icon: Layers,
    },
    {
      before: "Moving servers = hours of reconfiguration",
      after: "git pull + docker compose up -d = everything is back in minutes",
      icon: GitBranch,
    },
    {
      before: "A single service crash takes the whole server down",
      after: "Isolated container. A Qdrant crash never touches Kami.",
      icon: Shield,
    },
    {
      before: "Backup = remembering which packages were installed",
      after: "volumes + compose.yml = full backup in git",
      icon: Archive,
    },
  ],
  whoIsThisFor: [
    {
      title: "Developers spinning up their first server",
      description:
        "You don't want to get lost in nginx configs, systemd, and virtualenvs. Docker makes the whole thing simpler.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Home lab maintainers",
      description:
        "Raspberry Pi, NAS, or a small VPS. One compose file that brings everything back after a reboot.",
      icon: HardDrive,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Small DevOps teams",
      description:
        "Before you invest in Kubernetes, docker-compose gives you 80% of the value for 5% of the complexity.",
      icon: Users,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Anyone building an agent network",
      description:
        "Kami, Kaylee, CrewAI, Qdrant, Delegator — they all demand isolated infrastructure. Docker makes that easy.",
      icon: Boxes,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "compose", label: "docker-compose" },
    { id: "networking", label: "Networking" },
    { id: "volumes", label: "Storage" },
    { id: "production", label: "Production" },
    { id: "debugging", label: "Debugging" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Container,
      title: "What is Docker? The practical picture",
      subtitle: "One container = one service, atomic and isolated",
      description:
        "Docker is a container runtime — a sort of meta-operating-system that lets you take any software process together with everything it needs (a language version, libraries, config files) and pack it all into a single, sealed little box called a container. That container runs exactly the same on my Hetzner server, on your laptop, and inside a GitHub Actions job — because it carries everything it needs with it. Behind the scenes Docker uses Linux mechanisms (namespaces and cgroups) that provide kernel-level isolation, so it feels like a virtual machine — but is much lighter and faster.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "Picture a ship's cargo: every container at sea is a sealed box with its own contents — the port doesn't need to know what's inside, only how to lift and set it down. Docker does the same thing for software. Instead of installing Postgres directly on your server and praying it won't clash with whatever else is already there, you run `docker run postgres` — it comes up almost instantly, runs in isolation, and can be deleted at the end without leaving a trace. A regular virtual machine takes 30 seconds to boot; a container takes one.",
      content: [
        "Container — an isolated process with its own filesystem, its own network address, and its own process tree. As if it had a tiny private computer inside the bigger one",
        "Image — the template a container is started from. Like a blueprint of a house from which you can build any number of identical houses (the same relationship as between a class in code and an object created from it)",
        "Dockerfile — a plain text file describing how to build the image. It's a step-by-step recipe: which base to start from (FROM), which files to copy in (COPY), which commands to run (RUN), and what to launch when the container boots (CMD)",
        "Docker Hub — the world's public library of ready-made images (nginx, postgres, python, and thousands more). One line of code and you have a database server running",
        "Compatibility — on Linux it runs natively; on Mac and Windows it runs inside a tiny virtual machine behind the scenes (via Docker Desktop, Colima, OrbStack, or Podman). Note: Docker Desktop is free for personal use and small businesses, but requires a paid license for large enterprises (over 250 employees or $10M annual revenue); Podman and Colima are fully open-source with no such restriction",
      ],
      tips: [
        "Mac users — OrbStack ($8/mo personal, $18/mo business) cuts memory usage roughly in half vs. Docker Desktop and feels noticeably faster; Colima is a fully open-source, completely free alternative if you prefer OSS",
        "`docker ps` shows which containers are currently running; `docker logs -f <name>` streams their output in real time — two commands you will use every single day",
      ],
      codeExample: {
        label: "A basic Dockerfile for a Node service",
        code: "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nEXPOSE 3000\nCMD [\"node\", \"dist/index.js\"]",
      },
    },
    {
      id: "compose",
      icon: Boxes,
      title: "docker-compose: orchestrating multiple services",
      subtitle: "One YAML file that defines the entire network",
      description:
        "docker-compose is a Docker extension that handles the next natural problem: once you have more than one service, running each container by hand with its own command becomes a headache. Instead, you write a single text file in YAML (named `docker-compose.yml`) that describes every service in the network — which image each one uses, which folders it has access to, which ports it listens on, and even who depends on whom. Since Compose v2 (bundled into Docker as the `compose` plugin — no need to install the old standalone `docker-compose` binary) the command is `docker compose up -d` (with a space, not a hyphen), and it brings them all up together in the right order on the same private network. It is like a conductor cueing every player at the same time.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "My compose.yml holds the entire agent network: [Kami](/en/guide/kami), [Kaylee](/en/guide/kaylee), [Qdrant](/en/guide/qdrant), [Delegator](/en/guide/delegator), [Hermes](/en/guide/hermes), and more. Instead of 10 separate commands, it's a single file. Change a setting and run `docker compose up -d` — only what actually changed is updated, everything else keeps running uninterrupted. That developer experience makes it possible to build serious systems without the operational headache.",
      content: [
        "services — the heart of the file. Each service is defined with its image (or an instruction to build one from a Dockerfile), exposed ports (`ports`), environment variables (`environment`), mounted folders (`volumes`), and who must come up before it (`depends_on`)",
        "networks — the default creates a shared private network automatically. The result: every container can reach its siblings just by using the service name, as if it were a real domain name",
        "volumes (persistent storage) — defined at the compose level, shared between services, and surviving container restarts. This is where any data that must persist is stored",
        "env_file — point to a `.env` file and it is loaded automatically into every service. You can still override it per-service when needed",
        "profiles — a mechanism that lets you run only a subset of services (for example: `compose --profile dev up` brings up just the dev services). Useful for different environments",
        "healthcheck — Docker probes every few seconds whether the container is 'alive and responding'. You can wire this to `depends_on` so the next service only starts after its predecessor is actually ready (not merely 'running')",
      ],
      tips: [
        "Keep `compose.yml` in git, but keep the `.env` file out of git (add it to `.gitignore`) — it contains secrets",
        "Add `restart: unless-stopped` to every service. That way after a server reboot (power outage, OS update) everything comes back on its own, no intervention needed",
        "Prefer one shared network over five separate ones — less confusion, and name-based discovery stays simple",
      ],
      codeExample: {
        label: "A minimal compose.yml for an agent network",
        code: "# Compose v2 — the 'version' field is no longer required\nservices:\n  qdrant:\n    image: qdrant/qdrant:latest\n    restart: unless-stopped\n    ports: ['6333:6333']\n    volumes: ['./data/qdrant:/qdrant/storage']\n  kami:\n    build: ./kami\n    restart: unless-stopped\n    depends_on: [qdrant]\n    env_file: .env\n    ports: ['3001:3001']",
      },
    },
    {
      id: "networking",
      icon: Network,
      title: "Networks and internal DNS",
      subtitle: "How containers talk to each other",
      description:
        "A Docker network is a virtual private network that is created automatically inside the server and connects all containers running together in the same docker-compose. The magic is that every service gets a valid name on that network — [Kami](/en/guide/kami) can reach [Qdrant](/en/guide/qdrant) simply at `http://qdrant:6333`, as if the word 'qdrant' were a real server address. This is called Service Discovery, and it saves us the headache of handing out private IPs or running our own DNS server.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      beginner:
        "Think of it this way: when you bring up a compose, Docker builds a closed 'courtyard' around all the services. Inside that courtyard they all talk freely and know each other by name. Outside — to the open internet — nothing is exposed unless you explicitly open a port. That gives you built-in safety: a config mistake doesn't automatically expose your database to the world.",
      content: [
        "Bridge network — the compose default. A single private network that connects every service defined in the file, without any extra configuration",
        "Service Discovery — the service name you wrote in compose automatically becomes a network address. `http://kami:3001` works from inside any other container on the network",
        "Ports — the `X:Y` setting means 'open internal port Y through external port X'. The key point: only expose a service if you want it reachable from outside — most internal services should not be exposed at all",
        "Host mode (`network_mode: host`) — the container 'squats' directly on the host network. Faster, but you lose isolation. Use only when you must (extreme network performance or monitoring tools)",
        "External networks — a way to connect several compose files to the same shared network. Useful when you have a separate monitoring stack or want services in one file to talk to services in another",
      ],
      tips: [
        "Don't expose ports casually — expose only what truly needs to be reachable from outside. In my setup, only the [Delegator](/en/guide/delegator) (which acts as the reverse proxy — the front-facing server that receives all traffic and routes it internally) and nginx are exposed to the world",
        "For network debugging — `docker exec -it <name> ping <other-service>` checks whether service A can see service B. It's the first step whenever something won't connect",
        "Caddy or Traefik as a reverse proxy saves a lot of pain — they hook into Docker labels and generate HTTPS certificates automatically from Let's Encrypt, without touching nginx by hand",
      ],
    },
    {
      id: "volumes",
      icon: HardDrive,
      title: "Persistent storage: volumes and bind mounts",
      subtitle: "Where to store state so it survives a restart",
      description:
        "A container's internal filesystem is ephemeral by nature — on every restart it is wiped clean and recreated from scratch. That is by design: a container is meant to be disposable, not to remember things. But what about the data that must persist (databases, logs, config files)? That is where two mechanisms come in: Volumes (storage managed by Docker) and Bind Mounts (a direct mapping of a folder from the host into the container). Both keep content that outlives the container itself.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "Without volumes, every container that starts is as if it 'never existed' — empty memory, zero history. With a volume, Docker persists the contents of specific folders outside the container, on the host itself. That is how [Qdrant](/en/guide/qdrant) remembers every memory [Kami](/en/guide/kami) has accumulated, even after the server reboots — none of the conversations I've had with it get erased.",
      content: [
        "Named volume — Docker stores the content in its own internal location (`/var/lib/docker/volumes/`). Very easy to back up and restore, but hard to edit by hand without Docker",
        "Bind mount — maps a folder on the host directly onto a path inside the container. Very convenient for development (you can edit files from either side) and leaves you in full control of permissions",
        "tmpfs — RAM-only storage. Wiped on every restart, but extremely fast. Useful for temporary cache that doesn't need to be remembered",
        "Backup strategy — the magic command: `docker run --rm -v vol:/data -v $(pwd):/b alpine tar czf /b/vol.tar.gz /data`. It spins up a temporary container, creates a compressed archive of the volume, and deletes itself. One line, a complete backup",
        "Permissions — important to know: without matching user IDs (UID), files the container creates in a bind mount will show up on the host owned by root. Plan for this up front so you don't get stuck later",
        "In my setup, every bind mount lives under `/opt/ai-factory/data/` — a consistent layout that is easy to back up and migrate between servers in a single move",
      ],
      tips: [
        "Use `:ro` (read-only) whenever a container only needs to read, not write — it protects against accidental overwrites",
        "Qdrant and Postgres require named volumes (or a bind mount with `fsync` configured correctly) — otherwise disk writes will be slow and performance will suffer",
        "Log rotation — add `driver: json-file` with `max-size: 10m` and `max-file: 3` to every service. Without it, logs balloon until they fill the disk (happened to me once, not fun)",
      ],
      codeExample: {
        label: "Back up a single volume",
        code: "docker run --rm \\\n  -v kami_data:/source:ro \\\n  -v $(pwd)/backups:/backup \\\n  alpine tar czf /backup/kami-$(date +%F).tar.gz -C /source .",
      },
    },
    {
      id: "production",
      icon: Shield,
      title: "Running in production: security and reliability",
      subtitle: "What you must add before you open port 443",
      description:
        "Production is the distance between 'it works on my machine' and 'it works 24/7 on the open internet with real users'. In production Docker demands attention on three axes: security (don't run as root, set resource limits, manage secrets properly), reliability (health checks, restart policies, monitoring), and deployment (a CI/CD pipeline, the ability to roll back to a previous version). Every one of them matters — and skipping any one of them tends to collect its bill at exactly the wrong moment.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      beginner:
        "The difference between development and production: in development you can run a container as root, expose every port, and never look at logs. In production any one of those can crash your service or leak user data. The good news is there is a clear checklist — once you walk through it once, it becomes a reflex.",
      content: [
        "Non-root user — add `USER node` or `USER appuser` in the Dockerfile. Most official images (node, python, etc.) already ship with a ready user. Without it, any breach of the container = root inside it",
        "Secrets management — use Docker secrets or Vault. Never commit a `.env` file to git, not even for a second (it stays in history and automated scanners find it within minutes)",
        "Resource limits — under `deploy.resources.limits` set `memory` and `cpus` for every service. This prevents one misbehaving container (memory leak, runaway process) from taking down the whole server",
        "Healthcheck — add something like `CMD-SHELL curl -f http://localhost:PORT/health || exit 1`. Docker runs it every few seconds, and if the service stops responding it will restart it on its own",
        "Logging driver — `json-file` with `max-size` and `max-file` for small servers; `syslog` or `gelf` when you have a central monitoring system collecting logs from many machines",
        "Automatic updates — Watchtower watches for new images and updates automatically (convenient but risky). Alternatively, Dependabot opens a PR for manual review (slower, but safer)",
        "Reverse proxy — a front-facing server that receives all traffic and routes it internally. Caddy installs HTTPS certificates automatically from Let's Encrypt with no configuration; Traefik does it through Docker labels",
        "Firewall — UFW or iptables block every port except 22 (SSH), 80 (HTTP), and 443 (HTTPS). The right default: deny everything, open only what you need",
      ],
      tips: [
        "Never expose the Docker socket over HTTP — that is literally handing over the keys to the kingdom. For remote management use Portainer with proper auth and full TLS encryption",
        "Scan your images with trivy or grype — they flag known vulnerabilities (CVEs). Old images are full of them, especially anything that has not been updated",
        "Never push an image to a public registry with API keys baked in. Automated scanners crawl Docker Hub constantly looking for exactly that — they will find it before you finish blinking",
      ],
    },
    {
      id: "debugging",
      icon: Terminal,
      title: "Debugging: the tools that save hours",
      subtitle: "What to do when a container won't come up",
      description:
        "Most of the problems you will hit with Docker are not bugs in Docker itself — they are misconfigured volumes, networks, or environment variables. The good news: there is an ordered sequence of checks that resolves roughly 80% of cases within a few minutes. After years of working with Docker, I've settled into a routine that always starts from the same command and only moves on if it has to.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "`docker compose logs -f <service>` — streams the service's live output (stdout + stderr). The `-f` (follow) says 'keep showing every new line as it arrives'. Always the first tool",
        "`docker inspect <container>` — returns every setting of the container as JSON: network config, mounted volumes, environment variables. Perfect when you suspect the configuration isn't what you thought it was",
        "`docker exec -it <container> sh` — opens a shell inside the container itself (if one is installed). That lets you check from the inside whether files are where they should be and what is actually configured",
        "`docker stats` — a live view of CPU, memory, and network usage across every container at once. Essential for spotting who is hogging resources and who is starved",
        "`docker events` — a real-time stream of events: what came up, what fell over, what got restarted. Very helpful for understanding when and why a container crashed",
        "dive — an external tool that shows an image layer-by-layer and reveals what you can trim. A Node image can drop from 1GB to 200MB once you know where to cut",
        "`docker system df` — shows how much disk is occupied by images, volumes, and build cache. Handy when the server starts filling up",
      ],
      tips: [
        "If a container falls over immediately after starting — `docker logs` is always the first step. 99% of the time the message explaining exactly what went wrong is in the last few lines",
        "`docker compose config` validates the YAML file and shows how the compose will actually look after environment variables are loaded. Perfect for catching syntax mistakes before running",
        "After a week of experiments — `docker system prune -a --volumes` wipes everything unused (images, volumes, orphaned networks). Careful: it deletes permanently, so run it only after you've confirmed there's no backup you still need",
      ],
    },
  ],
  resources: [
    {
      title: "Docker Docs",
      description: "The official docs — clear, up to date, with practical examples",
      href: "https://docs.docker.com",
      icon: BookOpen,
    },
    {
      title: "Awesome Compose",
      description: "A catalog of compose file examples for every kind of stack",
      href: "https://github.com/docker/awesome-compose",
      icon: Github,
    },
    {
      title: "OrbStack",
      description: "A Docker Desktop alternative — light and fast on Mac",
      href: "https://orbstack.dev",
      icon: ExternalLink,
    },
    {
      title: "Dive",
      description: "Explore image layers — understand where the bloat is",
      href: "https://github.com/wagoodman/dive",
      icon: Github,
    },
    {
      title: "Caddy",
      description: "A reverse proxy with automatic HTTPS",
      href: "https://caddyserver.com",
      icon: ExternalLink,
    },
    {
      title: "The Qdrant guide",
      description: "How Qdrant runs in docker-compose (a real example from my network)",
      href: "/en/guide/qdrant",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Want to spin up a full network with docker-compose?",
  ctaSub:
    "The code for my network is open. Start from compose.yml, tweak the .env, and bring everything up with a single command.",
  primaryCta: {
    label: "Docker Docs",
    href: "https://docs.docker.com/compose/gettingstarted",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "Talk to me about your VPS setup",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "My entire agent network (10 services, 14 containers, Qdrant holding thousands of vectors) runs in a single docker-compose on a Hetzner CPX11 VPS for about €4.75/month. This guide is built on the experience of rebuilding that network three times over two years, including a migration from ARM to x86 and a recovery after a disk crash.",
};
