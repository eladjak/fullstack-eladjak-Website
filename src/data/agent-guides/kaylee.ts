import {
  Server,
  Activity,
  Shield,
  Terminal,
  Cpu,
  HardDrive,
  Wrench,
  Eye,
  Github,
  ExternalLink,
  BookOpen,
  Users,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  Gauge,
  RefreshCw,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const kayleeGuide: AgentGuideData = {
  slug: "kaylee",
  agentName: "Kaylee",
  agentNameHe: "סוכנת תשתית אוטונומית",
  tagline: "מי שומר על השרת שלך ב-3 בבוקר? סוכנת AI שלא ישנה",
  heroDescription: "קיילי היא סוכנת בינה מלאכותית אוטונומית שאחראית על התחזוקה של כל רשת הסוכנים שלי — 24 שעות ביממה, 7 ימים בשבוע, בלי הפסקה. תחת מכסה המנוע היא מבוססת על OpenClaw — טכנולוגיה שכבשה את הרשת לאחרונה: מדובר בסוכן AI שיכול לבצע כמעט כל פעולה שתבקשו ממנו בסביבת שרת (להפעיל שירותים, לבדוק לוגים, לתקן הגדרות, אפילו לערוך קוד) בצורה אוטונומית. OpenClaw רץ עם שכבת בינה של Gemini Flash (גרסה חינמית של Google), ויש לו גישה מלאה לכלים הקריטיים של השרת: containers (דרך Docker), שירותי מערכת (systemd), ומערכת הקבצים. אבל היתרון שלו הוא גם החולשה שלו — הוא שולח הרבה בקשות למודלי ה-AI במקביל, מה שהופך שימוש לא מבוקר בו לפוטנציאל יקר מאוד. לכן חשוב להגדיר לו מראש גבולות: רשימת פעולות מותרות (whitelist), אזורים אסורים, ומגבלות על תקציב. אצלי קיילי מדברת ב-Telegram (הבוט @kylie_elad_bot), שומרת על 10 שירותים בו-זמנית, ומעירה אותי רק כשהיא באמת לא יודעת מה לעשות. אצלכם היא יכולה להיות תחליף ל-on-call, מסדרת לוגים אוטומטית, או סוכנת תחזוקה כללית לכל סביבת שרתים שתפקידה לשמור על יציבות.",
  badgeText: "2026 · ניטור + ריפוי עצמי · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/kaylee",
  heroBgImage: "/images/guides/guide-kaylee-hero.jpg",
  stats: [
    { label: "בדיקות אוטומטיות", value: "5m" },
    { label: "ריפוי עצמי", value: "10m" },
    { label: "כלים פעילים", value: "50+" },
    { label: "זמן אבחון ממוצע", value: "<3s" },
  ],
  paradigmTitle: "DevOps שישן בלילה",
  paradigmSub:
    "במקום להתעורר ב-PagerDuty, יש לך סוכנת עם גישה מלאה שמטפלת בדברים בעצמה ומדווחת לך בבוקר.",
  paradigmShifts: [
    {
      before: "להתעורר ב-3 בבוקר בגלל אלרט Grafana",
      after: "קיילי ניסתה restart, תיקנה, ודיווחה בבוקר 'היה ויש לוג'",
      icon: Activity,
    },
    {
      before: "לחפש באיזה container רץ מה, למצוא לוג, לאבחן",
      after: "אחד על אחד: 'מה מצב delegator?' → אבחון מלא + המלצה",
      icon: Terminal,
    },
    {
      before: "כתיבת Ansible/Chef/Pulumi לכל דבר",
      after: "הסברה בעברית: 'תריצי docker restart על X, בדקי health' → מבוצע",
      icon: Wrench,
    },
    {
      before: "תשכח לעדכן docker images חודשים",
      after: "בדיקה שבועית + דוח + המלצה 'יש 3 updates חשובים'",
      icon: RefreshCw,
    },
  ],
  whoIsThisFor: [
    {
      title: "מנהלי עצמאים",
      description:
        "אין DevOps צוות, יש שרת אחד-שניים. קיילי היא הצוות.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "מפתחים שמתעצבנים מ-YAML",
      description: "תכתבו בעברית מה צריך, קיילי תבצע — בלי Ansible playbooks.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "חברות קטנות עם שרת קריטי",
      description:
        "Monitoring אוטומטי, ריפוי עצמי, לוג של כל פעולה. בסיס של SOC-1.",
      icon: Shield,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "מי שרוצה ללמוד DevOps",
      description:
        "קיילי מסבירה בעברית מה היא עושה ולמה. לימוד תוך כדי עבודה.",
      icon: Lightbulb,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "install", label: "התקנה" },
    { id: "tools", label: "כלים" },
    { id: "cron", label: "Cron" },
    { id: "heal", label: "ריפוי" },
    { id: "safety", label: "אבטחה" },
    { id: "advanced", label: "מתקדם" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Server,
      title: "מה זה Kaylee?",
      subtitle: "OpenClaw agent עם תפקיד DevOps — על הפרויקט שלך",
      description:
        "קיילי רצה כקונטיינר דוקר על VPS, עם בולט Gemini 2.5 Flash (חינמי) כמנוע LLM, וגישה מלאה לכלי לינוקס דרך shell tools של OpenClaw.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "קיילי היא סוכנת AI שיש לה 'ידיים אמיתיות' על השרת שלך. אתם אומרים לה מה לבדוק או לעשות, והיא מבצעת — כמו אדמין מערכת, רק שהיא עונה בעברית, זמינה תמיד, ולא לוקחת חופשה.",
      content: [
        "OpenClaw agent (מבוסס Claude Agent SDK) רץ ב-docker container",
        "LLM: Gemini 2.5 Flash (חינמי דרך Google AI Studio) — בתשלום אפשר להחליף ל-Claude Sonnet",
        "גישה מלאה ל-bash, docker CLI, systemd, file I/O (עם allowlist)",
        "Interface: Telegram bot (@kylie_elad_bot) + webhook endpoint :18789",
        "מקבלת הודעות ישירות, או דרך delegator/kami כ-relay",
        "כל פעולה שמבוצעת — נרשמת ב-memory עם metadata",
      ],
      tips: [
        "קיילי לא מסרבת בקלות. אם ביקשתם להעלות container שלא קיים, היא תכתוב docker-compose יציב עם מתנה ותבקש אישור",
      ],
    },
    {
      id: "install",
      icon: Zap,
      title: "התקנה על VPS קיים",
      subtitle: "הגישה שלה מתחילה מחבילת docker",
      description:
        "קיילי מותקנת כקונטיינר שרץ על הקבוצה openclaw. העלאה על שרת Ubuntu 22+ לוקחת ~10 דקות.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "צריך שרת (VPS 5-20€ לחודש) ו-Telegram bot token חינמי. מהשרת מריצים פקודת docker אחת ו-זהו.",
      content: [
        "git clone של OpenClaw repo → cd openclaw",
        "docker-compose.yml קיים — מגדיר את הקונטיינר + mounted volumes לעבודה",
        "קובץ SYSTEM_OVERRIDE.md — האישיות והכללים של קיילי",
        "CLAUDE.md → איך היא חושבת על הפרויקט",
        "ENV: GEMINI_API_KEY, TELEGRAM_BOT_TOKEN, DELEGATOR_URL",
        "docker-compose up -d → בתוך 30 שניות פעילה, עונה בטלגרם",
      ],
      codeExample: {
        label: "Docker Compose של Kaylee",
        code: 'services:\n  openclaw:\n    image: openclaw/agent:latest\n    volumes:\n      - /opt/openclaw/data:/home/node/.openclaw\n      - /var/run/docker.sock:/var/run/docker.sock\n    environment:\n      - GEMINI_API_KEY=${GEMINI_API_KEY}\n      - TELEGRAM_BOT_TOKEN=${TG_TOKEN}\n    ports: ["18789:3000"]\n    restart: unless-stopped',
      },
      tips: [
        "mount של /var/run/docker.sock נותן לה שליטה מלאה ב-docker — חובה להגביל מי יכול לשלוח לה הודעות",
      ],
    },
    {
      id: "tools",
      icon: Terminal,
      title: "הכלים שעומדים לרשותה",
      subtitle: "מ-docker ps ועד grep ל-logs, הכל בפקודה אחת בעברית",
      description:
        "OpenClaw הטמיע 50+ tools מוכנים: bash, file read/write, docker commands, systemctl, curl, grep.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      content: [
        "bash: פקודה חופשית (עם allowlist — לא rm -rf /)",
        "docker: ps, logs, restart, inspect, stats, exec, pull",
        "systemctl: is-active, status, restart, enable, logs",
        "file_read / file_write: עם allowlist לנתיבים מסוימים",
        "curl / network: בדיקת endpoints חיצוניים ופנימיים",
        "git: status, log, diff, pull (על repo של הפרויקט)",
        "ffmpeg + yt-dlp + ImageMagick — גם מדיה אפשרית",
      ],
      tips: [
        "כל כלי מוגבל דרך allowlist ב-config. אסור לה למחוק קבצים ב-/etc, למשל",
        "אפשר להוסיף tools משלכם — write_to_pagerduty, slack_post, whatsapp_via_kami",
      ],
    },
    {
      id: "cron",
      icon: Gauge,
      title: "ניטור תזמוני — heartbeat + health + cleanup",
      subtitle: "שלוש רמות של מעקב שרצות ברקע",
      description:
        "לקיילי יש שלושה crons שרצים אוטומטית. זה מה שהופך אותה ממתשאלת לסוכנת אמיתית.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      beginner:
        "זה כמו שיש לך שמירה שעושה סיבוב בבניין כל 5 דקות, 10 דקות ושעה. כל אחד בודק דברים אחרים — מי בבית, מה נשבר, מה מתלכלך.",
      content: [
        "heartbeat cron */5 min — בודק health של כל 10 הסוכנים ברשת; כותב ב-agent_status collection",
        "self-heal cron */10 min — אם שירות נפל, מנסה restart אוטומטי (עד 3 פעמים)",
        "auto-kaylee-reports cron */5 min — סורק journalctl ל-events, מסכם ומעלה ל-dashboard",
        "morning report 08:00 — דוח בריאות יומי: דיסק, RAM, load, containers healthy",
        "evening cleanup 22:00 — ניקוי /tmp, docker prune, log rotation",
      ],
      tips: [
        "כל הcrons כתובים ב-bash פשוט — קלים להוספה ושינוי",
        "אם cron נופל, הוא יעלה שוב תוך 5 דק' דרך ה-heartbeat",
      ],
      codeExample: {
        label: "Self-heal logic בקצרה",
        code: 'for container in ${CRITICAL}; do\n  if ! docker ps | grep -q "$container"; then\n    docker restart $container || alert_kaylee "failed to restart $container"\n  fi\ndone',
      },
    },
    {
      id: "heal",
      icon: RefreshCw,
      title: "ריפוי עצמי (Self-Healing)",
      subtitle: "Hermes-style — זיהוי, אבחון, תיקון, אימות",
      description:
        "בלב של קיילי יש pattern של Hermes: מזהה בעיה, מנסה תיקון, מאמת שעובד, ורק אם לא — מעיר את האדם.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      beginner:
        "נניח שירות של קאמי נופל. קיילי רואה את זה תוך 10 דקות (דרך cron), מנסה restart, בודקת שחזר לעבוד, ומדווחת לדשבורד 'היה, חזר'. רק אם 3 נסיונות נכשלו — היא שולחת לכם התראה ישירה.",
      content: [
        "Detection — heartbeat מגלה שירות ב-fail state",
        "Diagnosis — Gemini מנתח את ה-logs של הקונטיינר (tail -100)",
        "Repair — מנסה פעולות מרשימה: restart, pull+up, rebuild, reset",
        "Verification — בודק שה-service חזר ל-active ו-health endpoint מחזיר 200",
        "Escalation — אחרי 3 נסיונות נכשלים, שולחת alert דרך Kami ל-WhatsApp",
        "Learning — שומרת ב-healing_history collection איזה תיקון עבד על איזו בעיה",
      ],
      tips: [
        "אחרי חודש-חודשיים היא יודעת יחסית את דפוסי הבעיות שלכם — התיקונים נהיים מהירים יותר",
        "כל ריפוי נרשם עם timestamp + root cause + action — אפשר לבקש דוח חודשי",
      ],
    },
    {
      id: "safety",
      icon: Shield,
      title: "אבטחה: מה אסור לקיילי",
      subtitle: "Allowlist, בקרה, ו-audit trail",
      description:
        "גישה מלאה ל-docker זה חרב פיפיות. חשוב להבין מה הגדרתי שלא תעשה.",
      color: "from-red-600 to-rose-500",
      difficulty: "advanced",
      content: [
        "אסור rm -rf על נתיבים קריטיים (/, /etc, /boot, /home של משתמשים אחרים)",
        "אסור docker system prune -af — רק prune -f (ללא --all)",
        "אסור להתקין packages חדשים דרך apt/npm/pip ללא אישור אנושי",
        "אסור לכתוב ל-/etc/passwd, /etc/ssh, /var/lib/postgresql",
        "כל פעולה משמעותית → POST ל-audit log + report ב-dashboard",
        "WhatsApp relay דרך Kami בלבד — לא גישה ישירה ל-Green API",
      ],
      tips: [
        "ההגדרה הכי חשובה: allowlist של מי יכול לשלוח לה הודעות. ברירת מחדל: רק מספר הטלגרם של אלעד",
        "כל הפעולות נשמרות ב-Qdrant collection — אפשר לבצע forensic audit רטרואקטיבי",
      ],
    },
    {
      id: "advanced",
      icon: Cpu,
      title: "טיפים מתקדמים",
      subtitle: "מה שלמדנו אחרי 4 חודשי שימוש",
      description:
        "הניואנסים שהופכים בוט DevOps לסוכנת DevOps אמיתית.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "SYSTEM_OVERRIDE.md חם — קיילי טוענת אותו מחדש כל הודעה, לא צריך restart כדי לעדכן כללים",
        "Multi-VPS — אפשר להריץ kaylee על כל VPS ולתת להם לקשר דרך delegator",
        "חוק שתיקה בלוח השנה — קיילי מבינה שבת, חגים, ימי זיכרון; לא מפריעה",
        "Draft mode — כשחסום פרסום, דיווחים נשמרים כ-draft ונשלחים אחרי",
        "Gemini הוא לא מושלם — הוא לפעמים מסתכל על עצמו עם ביטחון מוגזם. Reality check של תוצאות חובה",
        "Local fallback — אם Gemini API למטה, אפשר להחליף ל-Ollama (gemma3:4b) — שפה פחות טובה אבל עובד",
      ],
      tips: [
        "תן לה 'פאנל שליטה' ב-dashboard — אפשר לראות מה היא עשתה ולהפעיל פעולות בלחיצה",
      ],
    },
  ],
  resources: [
    {
      title: "OpenClaw on GitHub",
      description: "ה-framework שעליו קיילי בנויה — מבוסס Claude Agent SDK",
      href: "https://github.com/openclaw/openclaw",
      icon: Github,
    },
    {
      title: "Gemini API",
      description: "ה-LLM של קיילי — חינמי ברוב המקרים",
      href: "https://ai.google.dev",
      icon: ExternalLink,
    },
    {
      title: "Telegram Bot API",
      description: "לממשק הצ'אט של קיילי",
      href: "https://core.telegram.org/bots/api",
      icon: ExternalLink,
    },
    {
      title: "Qdrant",
      description: "מאגר הזיכרון של קיילי — היסטוריית תיקונים וסטטוסים",
      href: "https://qdrant.tech",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Kami",
      description: "הסוכן שקיילי מתקשרת איתו דרך הגשר",
      href: "/guide/kami",
      icon: BookOpen,
    },
    {
      title: "המדריך ל-Hermes",
      description: "Pattern הריפוי העצמי שקיילי מיישמת",
      href: "/guide/hermes",
      icon: BookOpen,
    },
  ],
  ctaTitle: "רוצה DevOps שישן בלילה?",
  ctaSub:
    "OpenClaw פתוח, Gemini חינמי, ו-VPS זול. תוך שעה קיילי שומרת עליכם.",
  primaryCta: {
    label: "התקינו את OpenClaw",
    href: "https://github.com/openclaw/openclaw",
    icon: Github,
  },
  secondaryCta: {
    label: "תאמו ייעוץ",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "קיילי היא הסוכנת שאחראית לשמור על יתר הרשת. היא רצה 24/7 על VPS יחיד ומנטרת 10 שירותים במקביל, מבצעת self-healing על תקלות מוכרות, ומעירה אדם רק כשהיא לא יודעת מה לעשות. המדריך מציג את הארכיטקטורה של SRE agent שאפשר לאמץ לכל production stack — קטן כגדול.",
};
