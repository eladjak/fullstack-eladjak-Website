import {
  Activity,
  RefreshCw,
  Shield,
  Zap,
  Gauge,
  AlertTriangle,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Cpu,
  HeartPulse,
  Wrench,
  Users,
  Mail,
  Eye,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const hermesGuide: AgentGuideData = {
  slug: "hermes",
  agentName: "Hermes",
  agentNameHe: "שירותים שמתקנים את עצמם",
  logoImage: "/images/guide-logos/hermes-logo.png",
  tagline: "Self-healing — תקלות לא צריכות להעיר אתכם",
  heroDescription: "Hermes הוא CLI של self-healing infrastructure כתוב ב-Go (v0.8.0 אצלי). הפילוסופיה: whitelist של פעולות מותרות + verification-after-fix + למידה מתקלות חוזרות. ארכיטקטורה בת חמישה שלבים: detect → diagnose → fix → verify → learn. רץ כ-cron או webhook responder, שומר היסטוריה ב-SQLite/JSON. אצלי הוא מבצע autoheal ל-Kami ול-OpenClaw — אבל אצלך זה pattern שאפשר לאמץ עם כל CLI (או אפילו bash scripts): חמשת השלבים מתאימים לכל מערכת production, לא רק לסוכני AI.",
  badgeText: "2026 · Self-Healing Infrastructure · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/hermes",
  heroBgImage: "/images/guides/guide-hermes-hero.jpg",
  stats: [
    { label: "זמן תיקון ממוצע", value: "<90s" },
    { label: "נסיונות לפני escalation", value: "3" },
    { label: "סוגי תיקונים", value: "12+" },
    { label: "success rate", value: "~85%" },
  ],
  paradigmTitle: "תקלות לא צריכות להעיר אתכם",
  paradigmSub:
    "90% מהתקלות הן אותן 10 בעיות שחוזרות. Hermes פותר אותן לבד, ומעיר אתכם רק למשהו חדש.",
  paradigmShifts: [
    {
      before: "PagerDuty ב-03:00 על docker container שקרס",
      after: "Hermes ניסה restart, עבד, שלח email בבוקר 'היה ותוקן'",
      icon: RefreshCw,
    },
    {
      before: "להריץ את אותו script תיקון חמישית השבוע",
      after: "Hermes שומר 'מה עבד על מה' ומיישם אוטומטית",
      icon: Lightbulb,
    },
    {
      before: "PAgeRDuty, Opsgenie, VictorOps — $100+/חודש",
      after: "Hermes פתוח, ציבורי, חוקי תיקון כ-JSON",
      icon: Shield,
    },
    {
      before: "Monitoring ללא action = רעש",
      after: "Monitoring + action pipeline = פתרון אמיתי",
      icon: Activity,
    },
  ],
  whoIsThisFor: [
    {
      title: "צוותי SRE קטנים",
      description:
        "Senior שמוצף בתורנויות? Pattern של self-healing מוריד משמעותית את העומס תוך שבוע.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "מנהלי עצמאים עם שרת קריטי",
      description:
        "אחד-שניים שרתים, הרבה שירותים. Hermes שומר עליהם גם כשאתה בחופש.",
      icon: Shield,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "מי שבונה מוצר multi-tenant",
      description:
        "Customers לא צריכים לדעת על תקלות שלכם. Hermes שומר שלא ידעו.",
      icon: Users,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "מפתחי agents",
      description:
        "Pattern בסיסי לכל agent שעושה פעולות בעולם האמיתי — צריך fallback ואימות.",
      icon: Code2,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "pattern", label: "Pattern" },
    { id: "whitelist", label: "Whitelist" },
    { id: "verification", label: "Verification" },
    { id: "memory", label: "Memory" },
    { id: "escalation", label: "Escalation" },
    { id: "advanced", label: "מתקדם" },
  ],
  sections: [
    {
      id: "what-is",
      icon: HeartPulse,
      title: "מה זה Hermes?",
      subtitle: "Pattern, לא רק קוד — 5 שלבים של ריפוי",
      description:
        "Hermes הוא שם למערכת של 5 שלבים: Detect → Diagnose → Repair → Verify → Learn. אפשר ליישם בכל שפה, בכל stack.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "beginner",
      beginner:
        "Hermes כמו טכנאי שגר במבנה שלכם. כל כמה דקות הוא עושה סיבוב, בודק שהכל עובד. כשמשהו נשבר, הוא מנסה לתקן לפי ספר הוראות שיש לו. אם עובד — סובב הלאה. אם לא — מעיר אתכם.",
      content: [
        "Detect — ניטור רציף (healthcheck, journalctl, docker ps)",
        "Diagnose — זיהוי ה-root cause (לא רק הסימפטום)",
        "Repair — פעולת תיקון מ-whitelist (restart, rebuild, pull+up)",
        "Verify — בדיקה שהתיקון באמת עבד (health=200, response valid)",
        "Learn — רישום ל-memory של 'מה עבד על מה' להפעם הבאה",
        "Escalate — רק אחרי 3 נסיונות כושלים — alert אנושי",
      ],
    },
    {
      id: "pattern",
      icon: Zap,
      title: "ה-Pattern בפירוט",
      subtitle: "5 שלבים, כל אחד עם אחריות ברורה",
      description:
        "Each step is simple and testable. Combined, they form a self-healing loop.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      content: [
        "שלב 1: Detection — cron כל 5 דק' מריץ healthcheck על כל שירות",
        "שלב 2: Diagnosis — Gemini/Claude מנתח את ה-logs האחרונים (tail -100)",
        "שלב 3: Repair — בוחר פעולה מ-whitelist לפי ה-diagnosis",
        "שלב 4: Verification — בדיקה ש-health endpoint חזר ל-200 + במקרה של API — response valid",
        "שלב 5: Learn — INSERT ל-healing_history: {service, symptom, action, success}",
        "כישלון — שלב 6: Escalate אחרי 3 נסיונות → email/SMS/WhatsApp",
      ],
      codeExample: {
        label: "Loop ראשי",
        code: "for service in SERVICES:\n  status = check_health(service)\n  if status.healthy: continue\n  \n  diagnosis = diagnose_with_llm(service, status.logs)\n  for action in WHITELIST[diagnosis.category]:\n    apply(action)\n    if check_health(service).healthy:\n      record(service, diagnosis, action, success=True)\n      break\n  else:\n    alert_human(service, diagnosis)",
      },
    },
    {
      id: "whitelist",
      icon: Shield,
      title: "Whitelist של תיקונים",
      subtitle: "מה Hermes רשאי לעשות — ומה לא",
      description:
        "החשיבות של whitelist: Hermes עושה דברים עם השלכות. חייב לקבוע מה מותר.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      beginner:
        "דמיינו רשימה של 'כן, עם זה בסדר לנסות' ו'לא, לעולם'. זה ה-whitelist. למשל: 'docker restart' — כן. 'rm -rf /var' — לא בחיים.",
      content: [
        "CONTAINER_RESTART — docker restart <name> (safe, idempotent)",
        "CONTAINER_RECREATE — docker compose up -d --force-recreate (reset state)",
        "SYSTEMD_RESTART — systemctl restart <service>",
        "IMAGE_PULL — docker pull + recreate (פוטנציאל gotcha — version change)",
        "CACHE_CLEAR — מנקה tmp/cache directories ידועים",
        "CONNECTION_RESET — sudo systemctl restart networking (רק אם healthcheck חיצוני נכשל)",
        "אסור: rm, dd, mkfs, chown של /etc, package install/remove, kernel operations",
      ],
      tips: [
        "התחילו עם whitelist קטן של 3 פעולות. תרחיבו רק אחרי שרואים שהן עובדות יציב",
        "כל פעולה בwhitelist צריכה להיות idempotent — שאפשר להריץ פעמיים בלי נזק",
      ],
    },
    {
      id: "verification",
      icon: Eye,
      title: "אימות — המפתח לאמינות",
      subtitle: "התיקון עבד רק אם אפשר להוכיח",
      description:
        "הבעיה הנפוצה: 'ניסיתי restart, נראה בסדר' — בלי לבדוק שזה באמת עובד.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "health endpoint must return 200 + expected JSON shape",
        "response time < threshold (לא תלוי או איטי)",
        "log tail לא מכיל errors חדשים בתוך 30 שניות אחרי התיקון",
        "אם API — request-response sanity check עם payload סינטטי",
        "אם DB — simple SELECT 1 ו-write transaction",
        "זמן המתנה: 30 שניות לפני verification (startup period)",
      ],
      codeExample: {
        label: "Verify בסיסי",
        code: "def verify(service):\n    sleep(30)  # allow warmup\n    r = requests.get(f'http://{service}/health', timeout=5)\n    if r.status_code != 200: return False\n    if 'ok' not in r.json(): return False\n    logs = docker_logs(service, since='1min ago')\n    if any('ERROR' in l for l in logs): return False\n    return True",
      },
    },
    {
      id: "memory",
      icon: Cpu,
      title: "Memory — מה עבד קודם",
      subtitle: "Qdrant collection של תיקונים היסטוריים",
      description:
        "ככל שעובר הזמן, Hermes לומד אילו תיקונים עובדים על אילו בעיות.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "advanced",
      content: [
        "healing_history collection ב-Qdrant",
        "שדות: {ts, service, symptom_embedding, action, success}",
        "embedding של הסימפטום — description + tail של logs",
        "לפני פעולה: חיפוש סמנטי אחר תקלות דומות בעבר",
        "אם מצא מעל 80% דמיון + success=true — מנסה אותו תיקון קודם",
        "דוח שבועי: 'Top 5 problem-action pairs' — מראה patterns",
      ],
      tips: [
        "ככל שמערך ה-memory גדל, יותר תקלות מקבלות תיקון מוכר — ה-pattern הופך חכם יותר",
      ],
    },
    {
      id: "escalation",
      icon: AlertTriangle,
      title: "Escalation — מתי להעיר אתכם",
      subtitle: "חוקי ברור: רק אם אין פתרון אוטומטי ידוע",
      description:
        "הכי חשוב לא להציף אתכם. escalation הוא last resort.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "3 attempts failed — כל נסיון תיקון מ-whitelist נכשל",
        "Service DOWN > 10 min — גם אם לא נוסו 3 פעמים, אם down יותר מדי",
        "Data loss risk — סיטואציה שעלולה לגרום לאובדן נתונים (disk, corruption)",
        "Cascade — אם 2+ שירותים נופלים באותו זמן (root cause מסובך)",
        "Alert channels: email ראשון, SMS רק ל-critical, WhatsApp ל-immediate",
        "Runbook attached — Hermes מצרף ל-alert 'מה ניסיתי, מה לא עבד, מה הלוג אומר'",
      ],
      tips: [
        "היחס שלי: אם Hermes העיר אותי, זה משהו שלא ראיתי מעולם. עדיף לחקור איטי מאשר לפספס",
      ],
    },
    {
      id: "advanced",
      icon: Wrench,
      title: "אינטגרציה עם הרשת שלכם",
      subtitle: "Hermes לא שירות — זה Pattern",
      description:
        "אין docker container בשם hermes (זה היה בעבר cosmetic). זה pattern שיושב בתוך הסוכנים שלכם.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "אצלי, Hermes מיושם בתוך Kaylee (self-heal cron) ובתוך delegator (auto-heal executor)",
        "אפשר להוסיף לכל agent שאר הרשת — pattern שקוף",
        "Health endpoints — כל שירות חייב לחשוף /health שמחזיר JSON עם status",
        "Centralized log — journalctl ב-linux, docker logs ב-container — הכלים הבסיסיים",
        "Integration ל-PagerDuty/Opsgenie — לא חובה, אבל אפשר להוסיף ל-escalation path",
        "Dashboard — /health/agents מציג את מצב כל השירותים בזמן אמת",
      ],
      tips: [
        "אל תיישמו את Hermes מ-scratch. תתחילו מ-docker restart + health check בלופ cron. תרחיבו מכאן",
      ],
    },
  ],
  resources: [
    {
      title: "הקוד ברשת של אלעד",
      description: "Hermes מיושם בתוך Kaylee + delegator",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Site Reliability Engineering (Google)",
      description: "הספר הקלאסי — מאיפה הרעיונות האלה הגיעו",
      href: "https://sre.google/sre-book/table-of-contents",
      icon: ExternalLink,
    },
    {
      title: "Docker Healthcheck docs",
      description: "איך לבנות healthchecks טובים בקונטיינרים",
      href: "https://docs.docker.com/engine/reference/builder/#healthcheck",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Kaylee",
      description: "הסוכנת שמיישמת Hermes על ה-VPS שלי",
      href: "/guide/kaylee",
      icon: BookOpen,
    },
    {
      title: "המדריך ל-Qdrant",
      description: "המאגר של healing_history — הזיכרון של Hermes",
      href: "/guide/qdrant",
      icon: BookOpen,
    },
    {
      title: "שיחת ייעוץ SRE",
      description: "רוצים Hermes ב-infrastructure שלכם?",
      href: "/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "להתחיל עם Hermes זה לא רק קוד",
  ctaSub:
    "זה שינוי בגישה — מ-reactive ל-autonomous. מוכנים לראות איך בונים את זה?",
  primaryCta: {
    label: "איך Kaylee משתמשת בזה",
    href: "/guide/kaylee",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "שיחת ייעוץ",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "Hermes תיקן אצלי 40+ תקלות בחצי שנה — בלי שאני יודע שהיה משהו. הגישה הזו הפכה את ה-VPS ל-'fire and forget'. המדריך מבוסס על כישלונות אמיתיים — התחלתי עם whitelist אגרסיבי מדי והיה צריך לרסן אותו.",
};
