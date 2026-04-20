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

export const dockerGuide: AgentGuideData = {
  slug: "docker",
  agentName: "Docker",
  agentNameHe: "Docker — השרת שלך בקופסאות",
  tagline: "containers, docker-compose, והארכיטקטורה שמאפשרת רשת סוכנים ב-VPS אחד",
  heroDescription:
    "Docker הוא כלי container runtime שמאפשר לארוז כל שירות — עם התלויות שלו, הגרסה שלו, והקונפיגורציה שלו — ליחידה אטומית שרצה זהה בכל מקום. Compose מוסיף שכבת תזמור לכמה containers ביחד (network + volumes + env). אצלי כל רשת הסוכנים (10 שירותים) רצה ב-docker-compose יחיד על VPS של Hetzner — אבל אצלך Docker יכול להיות הבסיס לכל dev environment, CI/CD, staging, production, או home-lab. מי שמבין docker-compose, יכול להקים את רוב הדברים שמוצגים בשאר המדריכים.",
  badgeText: "2026 · Containers & Compose · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/docker",
  heroBgImage: "/images/guides/guide-docker-hero.jpg",
  stats: [
    { label: "containers אצלי", value: "14" },
    { label: "uptime", value: "99.7%" },
    { label: "עלות שרת בסיס", value: "5€/חודש" },
    { label: "compose files", value: "1" },
  ],
  paradigmTitle: "למה Docker הוא הבסיס של כל הרשת",
  paradigmSub:
    "בלי containers, להריץ 10 שירותים שונים על שרת אחד זה סיוט של תלויות. עם docker-compose, זה קובץ YAML אחד.",
  paradigmShifts: [
    {
      before: "להתקין Python 3.10 + 3.11 + 3.12 על אותו שרת",
      after: "כל שירות בקונטיינר עם הגרסה שלו. אפס קונפליקטים.",
      icon: Layers,
    },
    {
      before: "מעבר שרת = שעות של הגדרה מחדש",
      after: "git pull + docker compose up -d = הכל חוזר בדקות",
      icon: GitBranch,
    },
    {
      before: "crash של שירות אחד מפיל את כל השרת",
      after: "container מבודד. נפילה של Qdrant לא נוגעת ב-Kami.",
      icon: Shield,
    },
    {
      before: "backup = לזכור איזה packages היו מותקנים",
      after: "volumes + compose.yml = backup מלא ב-git",
      icon: Archive,
    },
  ],
  whoIsThisFor: [
    {
      title: "מפתחים שמרימים שרת ראשון",
      description:
        "לא רוצה ללכת לאיבוד ב-nginx configs, systemd, ו-virtualenv. Docker מפשט את הכל.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "תחזוקת home lab",
      description:
        "Raspberry Pi, NAS, או VPS קטן. Compose file אחד שמחזיר הכל אחרי restart.",
      icon: HardDrive,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "צוותי DevOps קטנים",
      description:
        "לפני שמשקיעים ב-Kubernetes, docker-compose מספק 80% מהערך ב-5% מהמורכבות.",
      icon: Users,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "כל מי שמקים רשת סוכנים",
      description:
        "Kami, Kaylee, CrewAI, Qdrant, Delegator — כולם דורשים תשתית מבודדת. Docker עושה את זה בקלות.",
      icon: Boxes,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "compose", label: "docker-compose" },
    { id: "networking", label: "רשתות" },
    { id: "volumes", label: "אחסון" },
    { id: "production", label: "production" },
    { id: "debugging", label: "ניפוי" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Container,
      title: "מה זה Docker? התמונה המעשית",
      subtitle: "container אחד = שירות אחד, אטומי ומבודד",
      description:
        "Docker הוא container runtime (מבוסס Linux namespaces + cgroups) שמאפשר לארוז תהליך עם כל התלויות שלו לאטום אחד שרץ זהה בכל מקום: על Mac של מפתח, על GitHub Actions, ועל VPS של Hetzner.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על container כמו 'מכונה וירטואלית קטנה, מהירה וזולה'. במקום להתקין Postgres ישירות על השרת, אתם מריצים docker run postgres — והוא רץ מבודד, בגרסה מדויקת, ואפשר למחוק אותו בלי להשאיר עקבות. מכונה וירטואלית לוקחת 30 שניות לעלות; container לוקח שניה.",
      content: [
        "container = תהליך מבודד עם file system, network, ו-process tree משלו",
        "image = תבנית ממנה מריצים container (כמו class → object)",
        "Dockerfile = סקריפט שמייצר image (FROM base, COPY files, RUN commands, CMD entrypoint)",
        "Docker Hub = registry ציבורי של images מוכנות (nginx, postgres, python, וכו')",
        "תאימות: Linux native; Mac + Windows רצים דרך VM קטן (Docker Desktop / colima / OrbStack)",
      ],
      tips: [
        "OrbStack חוסך 50% מה-RAM לעומת Docker Desktop ב-Mac — worth the switch",
        "`docker ps` מראה מה רץ; `docker logs -f <name>` מראה stdout חי",
      ],
      codeExample: {
        label: "Dockerfile בסיסי ל-Node service",
        code: "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nEXPOSE 3000\nCMD [\"node\", \"dist/index.js\"]",
      },
    },
    {
      id: "compose",
      icon: Boxes,
      title: "docker-compose: תזמור של כמה שירותים",
      subtitle: "קובץ YAML אחד שמגדיר את כל הרשת",
      description:
        "docker-compose.yml מאפשר להגדיר כמה שירותים שרצים יחד, עם networks, volumes, env vars ו-dependencies. פקודה אחת — docker compose up -d — מרימה את הכל.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "במקום 10 פקודות docker run, כותבים קובץ YAML שמגדיר את כל השירותים (Kami, Qdrant, Delegator וכו'), ופקודה אחת מרימה את כולם יחד. שינוי בקובץ → docker compose up -d → רק מה שהשתנה מתעדכן.",
      content: [
        "services: כל שירות מוגדר עם image/build, ports, environment, volumes, depends_on",
        "networks: ברירת מחדל נוצרת אוטומטית — כל container יכול להגיע לשני בשם השירות",
        "volumes: מוגדרים ברמת compose, משותפים בין services, נשמרים בין restarts",
        "env_file: .env נטען אוטומטית; אפשר override לכל service",
        "profiles: להריץ רק חלק מהשירותים (compose --profile dev up)",
        "healthcheck: Docker בודק אם container 'חי' — depends_on יכול להמתין ל-healthy",
      ],
      tips: [
        "תשמרו את compose.yml ב-git, ואת ה-.env בחוץ (להוסיף ל-.gitignore)",
        "השתמשו ב-restart: unless-stopped בכל שירות — הוא יחזור אחרי reboot",
        "עדיף network אחד גלובלי מאשר חמישה — פחות בלבול, dns-resolution פשוט",
      ],
      codeExample: {
        label: "compose.yml מינימלי לרשת סוכנים",
        code: "version: '3.9'\nservices:\n  qdrant:\n    image: qdrant/qdrant:latest\n    restart: unless-stopped\n    ports: ['6333:6333']\n    volumes: ['./data/qdrant:/qdrant/storage']\n  kami:\n    build: ./kami\n    restart: unless-stopped\n    depends_on: [qdrant]\n    env_file: .env\n    ports: ['3001:3001']",
      },
    },
    {
      id: "networking",
      icon: Network,
      title: "רשתות ו-DNS פנימי",
      subtitle: "איך containers מדברים אחד עם השני",
      description:
        "Docker יוצר רשת וירטואלית פרטית בין ה-containers. כל שירות נגיש בשם השירות (kami, qdrant), בלי להחשף לאינטרנט.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      beginner:
        "כשיש לכם שני containers באותו compose, Kami יכול לפנות ל-Qdrant דרך http://qdrant:6333 — כאילו qdrant הוא שם שרת חוקי. זה קורה אוטומטית, אין צורך להגדיר DNS.",
      content: [
        "bridge network (ברירת מחדל) = רשת פרטית בין כל ה-services ב-compose",
        "service discovery: name של service = hostname פנימי. http://kami:3001 עובד",
        "ports: X:Y מפרסם את Y הפנימי ל-X חיצוני (רק אם צריך גישה מבחוץ)",
        "host mode (network_mode: host) = container משתמש ברשת של host. מהיר יותר, פחות מבודד",
        "external networks: אפשר לחבר כמה compose files לאותה רשת (לדוגמה, monitoring נפרד)",
      ],
      tips: [
        "אל תחשפו לאינטרנט כל port. רק את Delegator (reverse proxy) או nginx",
        "לפתרון בעיות רשת: docker exec -it <name> ping <other-service>",
        "Caddy או Traefik כ-reverse proxy חוסכים קונפיגורציה ידנית של nginx",
      ],
    },
    {
      id: "volumes",
      icon: HardDrive,
      title: "אחסון מתמיד: volumes ו-bind mounts",
      subtitle: "איפה שומרים state שלא ייעלם אחרי restart",
      description:
        "Container file system הוא ephemeral — נמחק ב-restart. כדי לשמור state (database, logs, configs) צריך volume או bind mount.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "בלי volume, כל container מתחיל נקי אחרי restart — כאילו מעולם לא היה. עם volume, Docker שומר את התוכן של תיקייה ספציפית בתוך ה-container על ה-host. ככה Qdrant זוכר את הזיכרון של Kami גם אחרי reboot של השרת.",
      content: [
        "named volume: docker שומר במקום פנימי (/var/lib/docker/volumes/). קל לגבות, קשה לערוך ידנית",
        "bind mount: ממפה תיקייה ב-host ישירות ל-container. נוח ל-dev, מותיר שליטה ב-permissions",
        "tmpfs: בזיכרון בלבד. נשטף ב-restart. שימושי ל-cache זמני",
        "backup strategy: docker run --rm -v vol:/data -v $(pwd):/b alpine tar czf /b/vol.tar.gz /data",
        "permissions: ללא UID matching, כתיבה מ-container יוצרת קבצים ב-root — לדעת את זה מראש",
        "אצלי: /opt/ai-factory/data/ מרכז את כל ה-bind mounts — קל לגבות, קל להעביר שרת",
      ],
      tips: [
        "השתמשו ב-:ro (read-only) כשאפשר — מונע שגיאות של over-write",
        "Qdrant + Postgres חייבים named volumes (או bind עם fsync סדיר) — אחרת fsync איטי",
        "רוטציית לוגים: הוסיפו driver: json-file + max-size: 10m + max-file: 3 ב-logging",
      ],
      codeExample: {
        label: "backup של volume אחד",
        code: "docker run --rm \\\n  -v kami_data:/source:ro \\\n  -v $(pwd)/backups:/backup \\\n  alpine tar czf /backup/kami-$(date +%F).tar.gz -C /source .",
      },
    },
    {
      id: "production",
      icon: Shield,
      title: "להריץ בייצור: אבטחה ו-reliability",
      subtitle: "מה חייבים להוסיף לפני שחושפים port 443",
      description:
        "Docker בייצור דורש מספר חזיתות: אבטחה (לא root, limits, secrets), reliability (healthchecks, restart policies, monitoring), ו-deployment (CI/CD, rollback).",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      beginner:
        "Dev vs Production: ב-dev אפשר להריץ container כ-root, לחשוף כל port, ולשכוח logs. ב-production כל אחד מאלה יכול להפיל שירות או לחשוף דאטה. יש checklist ברור.",
      content: [
        "user: הוסיפו USER node/appuser ב-Dockerfile. רוב image bases מגיעות עם user לא-root",
        "secrets: docker secrets או Vault; אף פעם לא לפרסם .env ל-git, גם לא 'לפי-שבריר-של-שניה'",
        "limits: deploy.resources.limits.memory + cpus — מונעים container רעב מלהפיל שרת",
        "healthcheck: CMD-SHELL curl -f http://localhost:PORT/health || exit 1",
        "logging driver: json-file עם max-size/max-file, או syslog/gelf למערכות ריכוזיות",
        "updates: Watchtower (automatic) או Dependabot (manual PR) — בחירה בין נוחות לבקרה",
        "reverse proxy: Caddy עם Let's Encrypt אוטומטי, או Traefik עם docker labels",
        "firewall: UFW/iptables חוסמים את כל ה-ports חוץ מ-22/80/443",
      ],
      tips: [
        "לא לייצא Docker socket דרך HTTP. אם צריך remote management — Portainer עם אימות + TLS",
        "תבדקו images עם trivy או grype — חולשות CVE נפוצות מאוד ב-base images ישנות",
        "אל תעלו ל-public registries עם API keys embedded — scanners יודעים לחפש",
      ],
    },
    {
      id: "debugging",
      icon: Terminal,
      title: "ניפוי באגים: הכלים שחוסכים שעות",
      subtitle: "מה לעשות כשcontainer לא עולה",
      description:
        "רוב הבעיות ב-Docker הן misconfiguration של volumes, networks או env. יש רצף בדיקות שפותר 80% מהמקרים.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "docker compose logs -f <service> — stdout+stderr חיים של service",
        "docker inspect <container> — כל ה-config, כולל network settings, volumes, env",
        "docker exec -it <container> sh — shell בתוך ה-container (אם יש sh)",
        "docker stats — ראיית CPU/RAM/IO בזמן אמת של כל ה-containers",
        "docker events — event stream של start/stop/die. עוזר להבין למה container נופל",
        "dive <image> — tool חיצוני, מראה layer-by-layer מה ה-image מכילה (ומה אפשר לחתוך)",
        "docker system df — כמה מקום תופסים images/volumes/build cache",
      ],
      tips: [
        "אם container נופל מיד אחרי start — docker logs זה הצעד הראשון, תמיד",
        "docker compose config מריץ YAML parser ומראה איך ה-compose באמת ייראה",
        "אחרי ניסויים: docker system prune -a --volumes ינקה את כל מה שלא בשימוש",
      ],
    },
  ],
  resources: [
    {
      title: "Docker Docs",
      description: "התיעוד הרשמי — ברור, מעודכן, עם דוגמאות מעשיות",
      href: "https://docs.docker.com",
      icon: BookOpen,
    },
    {
      title: "Awesome Compose",
      description: "מאגר דוגמאות של compose files לכל shift",
      href: "https://github.com/docker/awesome-compose",
      icon: Github,
    },
    {
      title: "OrbStack",
      description: "Docker Desktop אלטרנטיבה — קל ומהיר ב-Mac",
      href: "https://orbstack.dev",
      icon: ExternalLink,
    },
    {
      title: "Dive",
      description: "חקירת layers ב-image — להבין איפה התפיחה",
      href: "https://github.com/wagoodman/dive",
      icon: Github,
    },
    {
      title: "Caddy",
      description: "Reverse proxy עם HTTPS אוטומטי",
      href: "https://caddyserver.com",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Qdrant",
      description: "איך Qdrant רץ ב-docker-compose (דוגמה אמיתית מהרשת שלי)",
      href: "/guide/qdrant",
      icon: BookOpen,
    },
  ],
  ctaTitle: "רוצים להקים רשת שלמה ב-docker-compose?",
  ctaSub:
    "הקוד של הרשת שלי פתוח. התחילו מ-compose.yml, התאימו את ה-.env, והרימו את הכל בפקודה אחת.",
  primaryCta: {
    label: "Docker Docs",
    href: "https://docs.docker.com/compose/gettingstarted",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "דברו איתי על VPS setup",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "כל רשת הסוכנים שלי (10 שירותים, 14 containers, Qdrant עם אלפי וקטורים) רצה ב-docker-compose יחיד על VPS של Hetzner ב-5€/חודש. המדריך הזה בנוי על הניסיון של הקמה מחדש של הרשת הזו 3 פעמים במהלך שנתיים, כולל migration מ-ARM ל-x86 ושחזור אחרי crash של disk.",
};
