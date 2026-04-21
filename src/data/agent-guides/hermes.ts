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
  heroDescription: "Hermes הוא CLI של self-healing infrastructure כתוב ב-Go (v0.8.0 אצלי). הפילוסופיה: whitelist של פעולות מותרות + verification-after-fix + למידה מתקלות חוזרות. ארכיטקטורה בת חמישה שלבים: detect → diagnose → fix → verify → learn. רץ כ-cron או webhook responder, שומר היסטוריה ב-SQLite/JSON. אצלי הוא מבצע autoheal ל-[Kami](/guide/kami) ול-OpenClaw (ה-engine של [Kaylee](/guide/kaylee)) — אבל אצלך זה pattern שאפשר לאמץ עם כל CLI (או אפילו bash scripts): חמשת השלבים מתאימים לכל מערכת production, לא רק לסוכני AI.",
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
      before: "PagerDuty, Opsgenie, VictorOps — $100+/חודש",
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
        "אחד-שניים שרתים, הרבה שירותים. Hermes שומר עליהם גם כשאתם בחופש.",
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
      title: "מה זה Hermes? רופא שגר במיון של השרת שלכם",
      subtitle: "CLI ב-Go שמזהה תקלה, מאבחן, מתקן, מאמת, ולומד — בלי להעיר אתכם",
      description:
        "Hermes הוא CLI של self-healing infrastructure — כלי שכתוב בשפת Go ורץ על השרת כמו חבר מהצוות שלא ישן. הרעיון פשוט אבל חזק: 90% מהתקלות ב-production הן אותן 10 בעיות שחוזרות (container שנפל, חיבור רשת שנתקע, דיסק שהתמלא). Hermes מזהה את התבנית הזו, ובמקום להעיר אתכם בכל פעם — מפעיל רצף של חמישה שלבים: detect (זיהוי), diagnose (אבחון), fix (תיקון), verify (אימות), ו-learn (למידה לקראת הפעם הבאה). אצלי (אלעד) הוא מבצע autoheal ל-[Kami](/guide/kami) ול-OpenClaw (המנוע של [Kaylee](/guide/kaylee)), אבל זה pattern שאפשר לאמץ בכל stack — לא רק לסוכני AI, אלא לכל שירות production. החיסכון האמיתי הוא בשנת הלילה שלכם ובחשבון ה-PagerDuty שלא יגיע יותר.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על זה ככה: במקום שה-on-call שלכם ישלם $100 בחודש ל-PagerDuty, ויתעורר ב-03:00 כדי לעשות `docker restart` למה שנופל כל שלישי בלילה — Hermes הוא כמו מטפל שמתקן את עצמו. הוא יושב על השרת, בודק כל 5 דקות שהכל חי, וכשמשהו נשבר הוא עושה את הדבר ההגיוני הראשון (למשל restart), בודק שזה באמת עבד, ורושם לעצמו 'זה עבד — בפעם הבאה שזה קורה, אני יודע מה לעשות'. רק אם שלושה ניסיונות נכשלו הוא שולח לכם התראה — ואז אתם יודעים שזה באמת משהו חדש ומעניין, לא עוד תקלה משעממת.",
      content: [
        "Detect — ניטור רציף של השירותים ([cron](/guide/dashboard) כל 5 דקות שרץ healthcheck על כל מה שחשוב: docker ps, journalctl, בקשת /health על כל endpoint — המקבילה ל-SRE בגוגל, בקטן)",
        "Diagnose — זיהוי ה-root cause, לא רק הסימפטום. Hermes לוקח את 100 השורות האחרונות מה-log, שולח ל-LLM ([Claude](/claude-code) או Gemini) עם prompt 'מה השתבש כאן?' — ומקבל אבחנה ברורה",
        "Fix — מפעיל פעולה מה-whitelist (restart, recreate, pull+up, cache clear). זה קריטי: Hermes לא יכול להריץ כל דבר — רק פעולות שסומנו מראש כבטוחות ו-idempotent",
        "Verify — לא מספיק שהפקודה רצה; צריך להוכיח שהשירות באמת חזר לעבוד. Hermes מחכה 30 שניות, שולח בקשת health, בודק שהתשובה תקינה, ומוודא שאין שגיאות חדשות ב-log",
        "Learn — כל תיקון מוצלח נשמר כ-embedding ב-[Qdrant](/guide/qdrant) (collection בשם healing_history). בפעם הבאה שתקלה דומה קורית — Hermes כבר יודע מה עבד",
        "Escalate — רק אחרי 3 ניסיונות כושלים, או אם 2+ שירותים נופלים במקביל (cascade) — התראה אנושית עם runbook מצורף: 'ניסיתי X, Y, Z, זה מה שה-log אומר'",
      ],
      tips: [
        "אל תתחילו עם CLI חיצוני מסובך — הקוד הראשוני של Hermes היה 80 שורות Python שרצות ב-[cron](/guide/dashboard). רק אחרי שה-pattern הוכיח את עצמו עברתי ל-Go",
        "ה-pattern הזה מתחבר מצוין ל-[Docker](/guide/docker) + [Qdrant](/guide/qdrant) + [Delegator](/guide/delegator) — ראו את ה-advanced section למטה",
      ],
    },
    {
      id: "pattern",
      icon: Zap,
      title: "ה-Pattern בפירוט — איך מחברים את 5 השלבים",
      subtitle: "כל שלב פשוט ובדיק בנפרד; יחד הם יוצרים לולאה של ריפוי עצמי",
      description:
        "היופי ב-pattern של Hermes הוא שכל שלב הוא פונקציה קצרה שאפשר לבדוק בנפרד — ובגלל זה אפשר להתחיל עם גרסה מינימלית (שעה של עבודה) ולהרחיב בהדרגה. זו בדיוק הגישה של SRE בגוגל: מערכת שמתקנת את עצמה נבנית משלבים קטנים ובטוחים, לא ממערכת ענק אחת.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      content: [
        "שלב 1 — Detection: [cron](/guide/dashboard) job שרץ כל 5 דקות, עובר על רשימת שירותים, ומריץ healthcheck פשוט (docker inspect, curl /health, systemctl is-active). אם משהו לא ירוק — קופץ לשלב הבא",
        "שלב 2 — Diagnosis: לוקחים tail -100 של ה-log הרלוונטי ושולחים ל-[Claude](/claude-code) או Gemini עם prompt קצר: 'זה log של שירות שנפל. מה ה-root cause? מה תמליץ לתקן?' — התשובה מגיעה מסווגת (OOM, port conflict, network, config) כדי שהשלב הבא יידע לבחור פעולה",
        "שלב 3 — Repair: לפי הקטגוריה של האבחנה בוחרים פעולה מה-whitelist. OOM → restart. Port conflict → recreate. חשוב: רק פעולה אחת בכל איטרציה (לא לשנות הכל בבת אחת — אם עובד, רוצים לדעת מה עבד)",
        "שלב 4 — Verification: ממתינים 30 שניות (startup), ואז בודקים שלושה דברים: (א) health endpoint מחזיר 200 + JSON תקין, (ב) זמן תגובה סביר, (ג) אין ERROR חדש ב-log של הדקה האחרונה. רק אם כל השלושה תקינים — זה 'התיקון עבד'",
        "שלב 5 — Learn: רושמים ל-[Qdrant](/guide/qdrant) collection בשם healing_history רשומה עם ה-symptom כ-embedding + הפעולה שעבדה + timestamp. בפעם הבאה שיש סימפטום דומה — חיפוש סמנטי מוצא אותו ומנסה קודם את הפעולה המנצחת (חיסכון של 2 ניסיונות מיותרים)",
        "שלב 6 — Escalate (רק אם 3 הניסיונות נכשלו): שולחים התראה דרך ה-[Delegator](/guide/delegator) — email ב-non-urgent, SMS ב-critical, ודרך [Kami](/guide/kami) ב-WhatsApp ל-immediate. בהתראה מצורף runbook מלא של מה שנוסה",
      ],
      codeExample: {
        label: "Loop ראשי",
        code: "for service in SERVICES:\n  status = check_health(service)\n  if status.healthy: continue\n  \n  diagnosis = diagnose_with_llm(service, status.logs)\n  for action in WHITELIST[diagnosis.category]:\n    apply(action)\n    if check_health(service).healthy:\n      record(service, diagnosis, action, success=True)\n      break\n  else:\n    alert_human(service, diagnosis)",
      },
    },
    {
      id: "whitelist",
      icon: Shield,
      title: "Whitelist — מה מותר ל-Hermes לעשות (והכי חשוב: מה אסור)",
      subtitle: "ה-whitelist הוא חגורת הבטיחות של כל מערכת self-healing",
      description:
        "ברגע שאתם נותנים לסקריפט אוטומטי הרשאה להריץ פקודות על production — אתם חייבים להגדיר בדיוק מה מותר ומה אסור. ה-whitelist של Hermes הוא קובץ JSON קטן שמכיל את רשימת הפעולות המותרות — בלעדיו Hermes לא יעשה כלום. זה ההבדל בין מערכת שמרדימה אתכם בלילה לבין מערכת שמוחקת לכם את ה-VPS בטעות.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      beginner:
        "דמיינו שאתם משאירים מפתחות של הבית לידיד שיבוא להאכיל את החתול. אתם לא נותנים לו גם את הצוואה, גם את הכספת, וגם גישה לחשבון הבנק — רק את המפתח לדלת ולמחסן של האוכל. ה-whitelist זה בדיוק אותו רעיון: רשימה מצומצמת של 'אלה הפעולות הבטוחות שאתם רשאים לנסות'. 'docker restart' — כן (הכי גרוע, השירות עולה חזרה). 'rm -rf /' — אסור לעולם. כלל האצבע: כל פעולה ב-whitelist חייבת להיות idempotent — כלומר, להריץ אותה פעמיים לא גורם נזק יותר מהרצה אחת.",
      content: [
        "CONTAINER_RESTART — `docker restart <name>`: הפעולה הכי בטוחה, idempotent, הכי שימושית (מתאימה ל-80% מהתקלות של [Docker](/guide/docker))",
        "CONTAINER_RECREATE — `docker compose up -d --force-recreate <name>`: מאפס לגמרי את ה-state, טוב לתקלות של קונקשן שנתקע או memory leak",
        "SYSTEMD_RESTART — `systemctl restart <service>`: ל-services שלא רצים ב-container (nginx, postgres מקומי, [Ollama](/guide/ollama))",
        "IMAGE_PULL — `docker pull + recreate`: מושך גרסה חדשה. זהירות: זה שינוי version, לא רק restart — לא לכלול ב-auto-heal בלי אישור מראש",
        "CACHE_CLEAR — מוחק תיקיות tmp/cache ידועות (למשל כשה-disk מתמלא ושירות נתקע). רשימה סגורה של paths — לא wildcard",
        "CONNECTION_RESET — restart של networking stack; משתמשים רק כש-healthcheck חיצוני (מ-[Dashboard](/guide/dashboard)) נכשל ולא פנימי",
        "אסור (מחוץ ל-whitelist): rm, dd, mkfs, chown/chmod של /etc, apt/yum install, kernel operations, שינויי firewall. אם Hermes חושב שצריך את זה — הוא עושה escalate לאדם",
      ],
      tips: [
        "התחילו עם whitelist של 3 פעולות בלבד (restart, recreate, cache_clear). רק אחרי חודש של עבודה יציבה — להרחיב. אצלי (אלעד) התחלתי עם whitelist אגרסיבי מדי והייתי צריך לרסן אותו אחרי ש-Hermes 'תיקן' משהו שלא באמת היה שבור",
        "כל פעולה ב-whitelist חייבת להיות idempotent. אם אין מושג מה זה — תחשבו: 'אם Hermes יריץ את זה 5 פעמים ברצף, האם ייגרם נזק?' אם כן — לא מכניסים ל-whitelist",
      ],
    },
    {
      id: "verification",
      icon: Eye,
      title: "Verification — המפתח לאמינות אמיתית",
      subtitle: "התיקון עבד רק אם אפשר להוכיח שהוא עבד — לא מספיק ש'הפקודה רצה'",
      description:
        "הטעות הכי נפוצה של צוותי SRE מתחילים: 'עשיתי restart, הפקודה החזירה 0, זה בטח בסדר'. לא. Verification זו היכולת להוכיח שאחרי התיקון השירות באמת חי, באמת מגיב, ובאמת עושה את מה שהוא צריך לעשות. זה ההבדל בין Hermes שעובד לבין סקריפט שרץ בלילה ומרדים אתכם עם הרגשה שהכל בסדר — עד שבבוקר מגלים שה-API החזיר 500 כל הלילה.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "health endpoint חייב להחזיר 200 + JSON במבנה הצפוי (לא רק status=ok — גם שדות חובה כמו version, uptime)",
        "זמן תגובה מתחת ל-threshold סביר (שירות שעונה תוך 5 שניות במקום 200ms זה 'לא בריא' גם אם הוא חזר)",
        "tail של ה-log בתוך 30 שניות אחרי התיקון לא מכיל ERROR חדשים (אם חזר עם אותה שגיאה — התיקון לא הצליח)",
        "אם זה API — request-response sanity check עם payload סינטטי (POST לאנדפוינט test, לראות שה-roundtrip עובד)",
        "אם זה DB — פשוט SELECT 1 לקריאה, ו-transaction קטן של write+rollback לוודא שגם כתיבה עובדת",
        "זמן המתנה: 30 שניות אחרי התיקון לפני שמתחילים לבדוק (startup period) — אחרת תופסים את השירות באמצע booting וחושבים בטעות שהוא שבור",
      ],
      tips: [
        "תרגמו את המשפט 'ה-verification הוא חצי מהערך' — הרבה צוותים מקדישים 90% ל-detect+fix ו-10% ל-verify. אצלי (אלעד) היחס הפוך: verify תופס יותר קוד מ-fix, כי הוא קובע האם אתם מתעוררים בלילה או לא",
        "ל-agents (כמו [Kami](/guide/kami) ו-[Kaylee](/guide/kaylee)) — verify חייב לכלול בדיקת יכולת אמיתית: לא רק 'ה-container חי', אלא 'שלחתי הודעת test דרך webhook — קיבלתי תשובה תקינה'",
      ],
      codeExample: {
        label: "Verify בסיסי",
        code: "def verify(service):\n    sleep(30)  # allow warmup\n    r = requests.get(f'http://{service}/health', timeout=5)\n    if r.status_code != 200: return False\n    if 'ok' not in r.json(): return False\n    logs = docker_logs(service, since='1min ago')\n    if any('ERROR' in l for l in logs): return False\n    return True",
      },
    },
    {
      id: "memory",
      icon: Cpu,
      title: "Memory — הזיכרון שהופך את Hermes לחכם יותר כל שבוע",
      subtitle: "collection ב-Qdrant שזוכר מה עבד על מה — חיפוש סמנטי של תיקונים היסטוריים",
      description:
        "בלי זיכרון, Hermes הוא אוסף של סקריפטים שרצים בלופ. עם זיכרון — הוא הופך למשהו שלומד מהרשת שלכם. כל תיקון מוצלח נשמר כ-embedding ב-[Qdrant](/guide/qdrant), ובפעם הבאה שמופיעה תקלה דומה — חיפוש סמנטי של 40ms מוצא את הפעולה שעבדה בעבר. זה ההבדל בין מערכת סטטית למערכת שנעשית חכמה יותר עם כל תקלה.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "advanced",
      content: [
        "collection בשם healing_history ב-[Qdrant](/guide/qdrant) (cosine distance, 768 dimensions עם gemini-embedding-001)",
        "שדות ברשומה: {ts, service, symptom_embedding, action_taken, success, duration_ms}",
        "ה-embedding של הסימפטום מורכב משני חלקים: תיאור קצר של הבעיה (מה-diagnosis של ה-LLM) + tail של 20 שורות מה-log",
        "לפני כל פעולת תיקון: Hermes עושה semantic search ב-collection — 'מצא לי 3 תקלות הכי דומות שקרו בעבר'",
        "אם מצא התאמה עם score > 0.8 ו-success=true — מנסה קודם את אותו תיקון (חוסך 2 ניסיונות כושלים)",
        "דוח שבועי אוטומטי שנשלח ל-[Dashboard](/guide/dashboard): 'Top 5 problem-action pairs' — חושף patterns שחוזרים על עצמם ומזמין אתכם לתקן את הבעיה המקורית",
      ],
      tips: [
        "ככל שה-memory גדל, יותר תקלות מקבלות תיקון ב-attempt הראשון — אצלי (אלעד) אחרי 6 חודשים success rate עלה מ-~60% ל-~85% בלי שינוי קוד, רק בזכות הזיכרון",
        "הדוח השבועי הוא הנכס הכי שווה — אם תקלה X מופיעה 12 פעמים בשבוע, זה סימן שלא באמת תיקנת אותה; תתייחסו ל-healing_history כמו ל-backlog של באגים",
      ],
    },
    {
      id: "escalation",
      icon: AlertTriangle,
      title: "Escalation — מתי נכון להעיר אתכם (וכמה שפחות)",
      subtitle: "הזהב של self-healing: להתריע רק כשזה באמת שווה השינה שלכם",
      description:
        "Escalation הוא last resort — הרגע שבו Hermes מרים ידיים ואומר 'אני לא מצליח, תעזור/י'. כל הרעיון של Hermes הוא לצמצם את ההתראות ל-10% מהמקרים — רק לדברים חדשים ומעניינים. אם Hermes שולח יותר מדי התראות — זה סימן שה-whitelist או ה-memory לא טובים מספיק, לא סימן ש'הכלי רועש'. PagerDuty עולה $29/user/חודש; Hermes עולה 0 וחוסך גם את השינה.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "3 ניסיונות כושלים — כל פעולה מה-whitelist נוסתה, שום דבר לא החזיר את השירות (זה הטריגר הכי נפוץ ל-escalation)",
        "Service DOWN > 10 דקות — גם אם עוד לא נוסו 3 פעמים; 10 דקות של downtime זה כבר ערך שדורש עין אנושית",
        "Data loss risk — סיטואציה שעלולה לגרום לאובדן נתונים (disk full קריטי, DB corruption, מסמכי [Qdrant](/guide/qdrant) לא נגישים) — Hermes לא נוגע, רק מתריע",
        "Cascade — אם 2+ שירותים נופלים באותו זמן, זה סימן לבעיה סביבתית (network, hardware, power) — Hermes לא ינסה לתקן אחד ולהחמיר את המצב; מתריע מיד",
        "Alert channels מדורגים: email ל-non-urgent (סיכום יומי), SMS ל-critical (שירות חיוני down), WhatsApp דרך [Kami](/guide/kami) ל-immediate (cascade או data loss). זה מחליף את PagerDuty ב-0₪",
        "Runbook מצורף אוטומטית לכל alert — 'ניסיתי: restart (נכשל כי X), recreate (נכשל כי Y), cache clear (לא רלוונטי). ה-log אומר Z. תיקונים דומים בעבר: [רשימה מה-healing_history]'",
      ],
      tips: [
        "הכלל שלי (אלעד): אם Hermes העיר אותי בלילה, זה משהו שלא ראיתי מעולם. עדיף שירות שיהיה down 20 דקות ואני אחקור איטי מאשר שאתפוצץ מ-60 התראות זהות על אותו restart",
        "המטריקה הכי חשובה אחרי 'uptime' היא 'escalation rate per week' — אצלי היא 1-2 בשבוע. אם אצלכם זה 20, משהו ב-whitelist צריך להתעבות",
      ],
    },
    {
      id: "advanced",
      icon: Wrench,
      title: "אינטגרציה עם הרשת שלכם — Hermes הוא Pattern, לא שירות",
      subtitle: "איך מטמיעים את הגישה בתוך הסוכנים והשירותים הקיימים",
      description:
        "הערה חשובה: אין container בשם 'hermes' שרץ בפני עצמו (זה היה מצב קודם שהתברר כ-cosmetic בלבד). ה-pattern של Hermes יושב בתוך הסוכנים והשירותים עצמם — בתור cron jobs, webhook handlers, או כמודול בקוד. זה דווקא יתרון: מערכת self-healing אפקטיבית לא צריכה להיות שירות מרכזי, אלא יכולה להיות מפוזרת בתוך כל רכיב.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "אצלי (אלעד), ה-pattern של Hermes מיושם בתוך [Kaylee](/guide/kaylee) (self-heal cron שרץ על ה-OpenClaw engine שלה) ובתוך ה-[Delegator](/guide/delegator) (auto-heal executor שמזהה כשל באחד מה-endpoints)",
        "אפשר להוסיף לכל סוכן ברשת — [Kami](/guide/kami), [Box](/guide/box), [Adopter](/guide/adopter), [CrewAI](/guide/crewai) — את אותו pattern בלי שינויי ארכיטקטורה",
        "Health endpoints: תנאי סף. כל שירות חייב לחשוף /health שמחזיר JSON עם {status, version, uptime}. בלי זה — אין verification אמיתי",
        "Centralized logs: `journalctl` ב-Linux, `docker logs` ב-[Docker](/guide/docker) — אלה הכלים הבסיסיים של Hermes ל-diagnosis. אם יש לכם Loki או Datadog — עוד יותר טוב",
        "Integration ל-PagerDuty/Opsgenie: לא חובה (Hermes יחליף אותם ב-90%), אבל אפשר לחבר ל-escalation path כ-fallback נוסף",
        "[Dashboard](/guide/dashboard) endpoint: /health/agents מציג את מצב כל השירותים בזמן אמת. זה ה-UI שלכם מול כל הרשת — פתוח במונה טור כל היום",
        "שילוב עם [n8n](/guide/n8n) או [Aider](/guide/aider): Hermes יכול להפעיל flows של n8n כחלק מ-repair (למשל 'restart + הודעה ב-Slack'), או לבקש מ-Aider לתקן קוד אוטומטית כשה-build נכשל",
      ],
      tips: [
        "אל תיישמו את Hermes מ-scratch ביום הראשון. התחילו מ-3 שורות bash: `docker ps | grep unhealthy && docker restart $name`, הוסיפו health check, ואז לאט לאט עוברים ל-Go או Python. אצלי (אלעד) הגרסה הראשונה הייתה 80 שורות והגרסה הנוכחית מעל 2000 — אבל הערך הגיע כבר מהגרסה הראשונה",
        "ה-pattern עובד גם על stacks לא-AI לחלוטין — nginx + postgres + redis מקבלים את אותה טיפה: detect → diagnose → fix (מתוך whitelist קצר) → verify → learn. זה לא רק לסוכנים",
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
