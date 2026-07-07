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
  agentNameHe: "Hermes / גארדאקס — סוכן-העובד של הרשת",
  category: "agent",
  logoImage: "/images/guide-logos/hermes-logo.png",
  tagline: "גארדאקס — הסוכן-עובד של הרשת: מחקר, סקרייפינג, מדיה ומדע-נתונים",
  heroDescription: "ברשת שלי היום, Hermes הוא גארדאקס — הדמות מהקומיקס לצד קאמי, קיילי, בוקס וסוליס, וגם סוכן-הסטודיו/העובד של הרשת: סוכן-מומחה אוטונומי שמקבל משימות מ-[Claude Code](/claude-code) (המתזמר) ומחזיר תוצר מובנה. תחומי-האחריות שלו: מחקר (research), סקרייפינג של מידע מהאינטרנט (scrape), יצירת נכסים ויזואליים ומדיה (media generation), ניתוחי-נתונים (data-science), הרצת cron, והאצלת משימות-קוד לסוכני-קוד כמו codex/opencode. הוא רץ על Gemini חינמי ומשוחח בטלגרם בטקסט ובקול דרך הבוט @elad_hermes_bot. חשוב להבין את חלוקת-העבודה: כתיבת-תוכן ופוסטים שייכים היום ל-[ראנץ'](/guide/ranch) (סוכן-התוכן); Hermes מספק לו את המדיה והאיורים, אבל את הקופי כותב ראנץ'. השם 'Hermes' נשאר כי הסוכן צמח מתוך דפוס self-healing (ריפוי-עצמי) של תשתית — אבל היום ה-ריפוי-העצמי של הרשת חי בעיקר ב-[שכבת-האוטונומיה](/guide/autonomy) (remediation.py + הצעות-תיקון של [אורורה/Oracle](/guide/orchestration)), ו-Hermes עצמו הוא קודם-כל סוכן-העובד. אצלכם זה דפוס כללי לכל רשת-סוכנים: רכיב headless חסר-ממשק שעושה את 'העבודה הכבדה' (מחקר, סקרייפינג, מדיה, נתונים) ומחזיר תוצר נקי למתזמר — בלי להעמיס על ממשק-האנוש.",
  badgeText: "2026 · סוכן-עובד אוטונומי · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/hermes",
  heroBgImage: "/images/guides/guide-hermes-hero.jpg",
  videoUrl: "/videos/guides/hermes.mp4",
  stats: [
    { label: "תפקיד", value: "סוכן-עובד" },
    { label: "מודל", value: "Gemini חינמי" },
    { label: "ערוץ", value: "Telegram" },
    { label: "תחומי-ליבה", value: "מחקר/מדיה/נתונים" },
  ],
  paradigmTitle: "העבודה הכבדה לא צריכה את ממשק-האנוש",
  paradigmSub:
    "מחקר, סקרייפינג, מדיה וניתוח-נתונים הם 'עבודה כבדה'. Hermes הוא הסוכן-העובד שמקבל אותם מהמתזמר ומחזיר תוצר מובנה — בלי להעמיס על קאמי.",
  paradigmShifts: [
    {
      before: "המתזמר מנסה גם לתכנן וגם לבצע מחקר/סקרייפינג/מדיה בעצמו",
      after: "Hermes הוא סוכן-עובד ייעודי שמקבל את המשימה ומחזיר תוצר מובנה",
      icon: RefreshCw,
    },
    {
      before: "מדיה ואיורים מעורבבים עם כתיבת-הקופי באותו סוכן",
      after: "Hermes מספק מדיה/איורים; את הקופי כותב [ראנץ'](/guide/ranch) — חלוקת-עבודה נקייה",
      icon: Lightbulb,
    },
    {
      before: "כל קריאת-AI עולה כסף — גם משימת-עבודה שגרתית",
      after: "Hermes רץ על Gemini חינמי, כך שהעבודה הכבדה כמעט לא עולה",
      icon: Shield,
    },
    {
      before: "סוכן-עובד שמחזיר 'עשיתי' בלי הוכחה",
      after: "תוצר מובנה (JSON) שניתן למעקב, חזרה ובדיקה",
      icon: Activity,
    },
  ],
  whoIsThisFor: [
    {
      title: "צוותי SRE קטנים",
      description:
        "Senior שמוצף בתורנויות? Pattern של self-healing מוריד את העומס משמעותית תוך שבוע.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "מנהלים עצמאיים עם שרת קריטי",
      description:
        "אחד-שניים שרתים, הרבה שירותים. Hermes שומר עליהם גם כשאתם בחופש.",
      icon: Shield,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "מי שבונה מוצר multi-tenant",
      description:
        "לקוחות לא צריכים לדעת על התקלות שלכם. Hermes דואג שלא ידעו.",
      icon: Users,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "מפתחי agents",
      description:
        "Pattern בסיסי לכל agent שמבצע פעולות בעולם האמיתי — צריך fallback ואימות.",
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
      title: "מה זה Hermes? סוכן-העובד של הרשת",
      subtitle: "רכיב headless שמקבל משימת-עבודה מהמתזמר, מבצע, ומחזיר תוצר מובנה",
      description:
        "Hermes הוא סוכן-העובד (worker agent) של הרשת — הרכיב חסר-הממשק שעושה את 'העבודה הכבדה' מטעם המתזמר. הוא לא מדבר עם אלעד ישירות כמו [Kami](/guide/kami); הוא מקבל משימה מובנית מ-[Claude Code](/claude-code) ומחזיר תוצר נקי. תחומי-האחריות: מחקר (research), סקרייפינג של מידע (scrape), יצירת מדיה ונכסים ויזואליים (media_gen), ניתוחי-נתונים (data_science), הרצת cron, והאצלת משימות-קוד לסוכני-קוד אחרים (codex_exec). הוא רץ על Gemini חינמי ומשוחח בטלגרם בטקסט ובקול דרך @elad_hermes_bot. הערה היסטורית: השם 'Hermes' צמח מדפוס self-healing (ריפוי-עצמי) של תשתית, ובהמשך המדריך מפורטים חמשת השלבים של אותו דפוס כי הוא עדיין רעיון-יסוד חשוב — אבל היום ה-ריפוי-העצמי החי של הרשת חי ב-[שכבת-האוטונומיה](/guide/autonomy) (remediation.py + הצעות-תיקון של אורורה), לא ב-Hermes. Hermes עצמו הוא קודם-כל הסוכן-העובד.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על משרד עם מנהל ועם 'איש-עשה-הכל' מוכשר במיוחד. המנהל (המתזמר) לא רץ בעצמו לחפש מידע, לעבד נתונים או להכין גרפיקה — הוא מעביר את זה ל-איש-העשה-הכל, שיוצא, עושה את העבודה, וחוזר עם תוצאה מסודרת. Hermes הוא בדיוק ה-איש-עשה-הכל הזה ברשת: צריך מחקר על נושא? סקרייפינג של אתר? איור או תמונה? ניתוח של טבלת-נתונים? המתזמר שולח את המשימה ל-Hermes, ו-Hermes מחזיר תוצר מוכן. הוא עובד ברקע, לא מדבר ישירות עם אלעד, ורץ על מודל חינמי — כך שהעבודה הכבדה כמעט לא עולה כסף.",
      content: [
        "מחקר (research) — איסוף וסיכום מידע על נושא מטעם המתזמר; מחזיר תקציר מובנה, לא 'חיפוש גולמי'",
        "סקרייפינג (scrape) — שליפת מידע ממקורות-אינטרנט (דפים, ליסטינגים, נתונים ציבוריים) והחזרתו מסודר",
        "מדיה ונכסים (media_gen) — יצירת איורים, תמונות ונכסים ויזואליים (דרך Gemini/nano-banana). חשוב: את המדיה Hermes מספק; את הקופי שמלווה אותה כותב [ראנץ'](/guide/ranch)",
        "מדע-נתונים (data_science) — עיבוד וניתוח של נתונים, חישובים, ותובנות שנכתבות ל-[האב-ידע](/guide/orchestration) או לתיבת-הנכנס",
        "cron + codex_exec — הרצת משימות מתוזמנות, והאצלת משימות-קוד לסוכני-קוד אחרים (codex/opencode) כשצריך 'ידיים' של מתכנת",
        "ערוץ: Telegram @elad_hermes_bot (טקסט+קול דרך Gemini TTS) + שער-המודלים; רץ על Gemini חינמי",
      ],
      tips: [
        "סוכן-עובד טוב הוא חסר-ממשק בכוונה: הוא לא מתווכח עם המשתמש, הוא מקבל משימה מובנית ומחזיר תוצר מובנה. ההפרדה הזו בין 'מי שמדבר עם האדם' (Kami) ל'מי שעושה את העבודה' (Hermes) היא מה ששומר על הרשת נקייה",
        "חלוקת-העבודה מול [ראנץ'](/guide/ranch) קריטית: Hermes = מדיה/מחקר/נתונים, ראנץ' = כתיבת-תוכן ופוסטים. אל תתנו לסוכן-העובד לכתוב קופי — זה תפקיד נפרד",
      ],
    },
    {
      id: "pattern",
      icon: Zap,
      title: "דפוס הריפוי-העצמי בפירוט — 5 השלבים שמהם Hermes צמח",
      subtitle: "רקע: כל שלב פשוט ובדיק בנפרד; יחד הם יוצרים לולאה של ריפוי-עצמי",
      description:
        "הסקשנים הבאים מתארים את דפוס ה-self-healing שממנו השם 'Hermes' צמח — הוא נשאר במדריך כי הוא רעיון-יסוד חשוב לכל מערכת אוטונומית. הערה: ברשת שלי היום ה-ריפוי-העצמי החי לא יושב ב-Hermes אלא ב-[שכבת-האוטונומיה](/guide/autonomy) (remediation.py + הצעות-התיקון של אורורה/Oracle); קראו את המדריך ההוא ליישום העדכני. היופי בדפוס הוא שכל שלב הוא פונקציה קצרה שאפשר לבדוק בנפרד — ובגלל זה אפשר להתחיל מגרסה מינימלית ולהרחיב בהדרגה. זו בדיוק הגישה של SRE בגוגל: מערכת שמתקנת את עצמה נבנית משלבים קטנים ובטוחים, לא ממערכת ענק אחת.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      beginner:
        "הרעיון כולו הוא לולאה פשוטה של חמישה שלבים, בדיוק כמו רופא: לבדוק אם משהו לא בסדר (זיהוי), להבין מה הבעיה (אבחון), לתת תרופה (תיקון), לוודא שהמטופל באמת הבריא (אימות), ולזכור מה עבד כדי שבפעם הבאה יהיה מהר יותר (למידה). היופי הוא שכל שלב הוא חתיכה קטנה ובדיקה בנפרד, אז אפשר להתחיל מגרסה צנועה של שעת עבודה ולגדול בהדרגה. אצלי (אלעד) ככה נראית מערכת שמתקנת את עצמה בלי שאני צריך לקום באמצע הלילה.",
      content: [
        "שלב 1 — Detection: [cron](/guide/dashboard) job שרץ כל 5 דקות, עובר על רשימת שירותים ומריץ healthcheck פשוט (docker inspect, curl /health, systemctl is-active). אם משהו לא ירוק — קופץ לשלב הבא",
        "שלב 2 — Diagnosis: לוקחים tail -100 של ה-log הרלוונטי ושולחים ל-[Claude](/claude-code) או Gemini עם prompt קצר: 'זה log של שירות שנפל. מה ה-root cause? מה תמליץ לתקן?' — התשובה מגיעה מסווגת (OOM, port conflict, network, config) כדי שהשלב הבא יידע לבחור פעולה",
        "שלב 3 — Repair: לפי הקטגוריה של האבחנה בוחרים פעולה מה-whitelist. OOM → restart. Port conflict → recreate. חשוב: רק פעולה אחת בכל איטרציה (לא לשנות הכל בבת אחת — אם זה עובד, רוצים לדעת מה עבד)",
        "שלב 4 — Verification: ממתינים 30 שניות (startup), ואז בודקים שלושה דברים: (א) health endpoint מחזיר 200 + JSON תקין, (ב) זמן תגובה סביר, (ג) אין ERROR חדש ב-log של הדקה האחרונה. רק אם כל השלושה תקינים — 'התיקון עבד'",
        "שלב 5 — Learn: רושמים ל-collection בשם healing_history ב-[Qdrant](/guide/qdrant) רשומה עם ה-symptom כ-embedding + הפעולה שעבדה + timestamp. בפעם הבאה שיש סימפטום דומה — חיפוש סמנטי מוצא אותו ומנסה קודם את הפעולה המנצחת (חיסכון של 2 ניסיונות מיותרים)",
        "שלב 6 — Escalate (רק אם 3 הניסיונות נכשלו): שולחים התראה דרך ה-[Delegator](/guide/delegator) — email ב-non-urgent, SMS ב-critical, ודרך [Kami](/guide/kami) בוואטסאפ ל-immediate. להתראה מצורף runbook מלא של מה שנוסה",
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
        "ברגע שאתם נותנים לסקריפט אוטומטי הרשאה להריץ פקודות על production — אתם חייבים להגדיר בדיוק מה מותר ומה אסור. ה-whitelist של Hermes הוא קובץ JSON קטן שמכיל את רשימת הפעולות המותרות — בלעדיו Hermes לא יעשה כלום. זה ההבדל בין מערכת שמאפשרת לכם לישון בלילה לבין מערכת שמוחקת לכם את ה-VPS בטעות.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      beginner:
        "דמיינו שאתם משאירים מפתחות של הבית לידיד שיבוא להאכיל את החתול. אתם לא נותנים לו גם את הצוואה, גם את הכספת, וגם גישה לחשבון הבנק — רק את המפתח לדלת ולמחסן של האוכל. ה-whitelist זה בדיוק אותו רעיון: רשימה מצומצמת של 'אלה הפעולות הבטוחות שאתם רשאים לנסות'. 'docker restart' — כן (הכי גרוע שיכול לקרות, השירות עולה חזרה). 'rm -rf /' — אסור לעולם. כלל האצבע: כל פעולה ב-whitelist חייבת להיות idempotent — כלומר, להריץ אותה פעמיים לא גורם יותר נזק מהרצה אחת.",
      content: [
        "CONTAINER_RESTART — `docker restart <name>`: הפעולה הכי בטוחה, idempotent והכי שימושית (מתאימה ל-80% מהתקלות של [Docker](/guide/docker))",
        "CONTAINER_RECREATE — `docker compose up -d --force-recreate <name>`: מאפס לגמרי את ה-state, טוב לתקלות של קונקשן שנתקע או memory leak",
        "SYSTEMD_RESTART — `systemctl restart <service>`: ל-services שלא רצים ב-container (nginx, postgres מקומי, [Ollama](/guide/ollama))",
        "IMAGE_PULL — `docker pull + recreate`: מושך גרסה חדשה. זהירות: זה שינוי version, לא רק restart — לא לכלול ב-auto-heal בלי אישור מראש",
        "CACHE_CLEAR — מוחק תיקיות tmp/cache ידועות (למשל כשה-disk מתמלא ושירות נתקע). רשימה סגורה של paths — בלי wildcard",
        "CONNECTION_RESET — restart של networking stack; משתמשים בו רק כש-healthcheck חיצוני (מ-[Dashboard](/guide/dashboard)) נכשל, ולא פנימי",
        "אסור (מחוץ ל-whitelist): rm, dd, mkfs, chown/chmod של /etc, apt/yum install, kernel operations, שינויי firewall. אם Hermes חושב שצריך את זה — הוא עושה escalate לאדם",
      ],
      tips: [
        "התחילו עם whitelist של 3 פעולות בלבד (restart, recreate, cache_clear). רק אחרי חודש של עבודה יציבה — להרחיב. אצלי (אלעד) התחלתי עם whitelist אגרסיבי מדי והייתי צריך לרסן אותו אחרי ש-Hermes 'תיקן' משהו שלא באמת היה שבור",
        "כל פעולה ב-whitelist חייבת להיות idempotent. אם אין לכם מושג מה זה — חשבו: 'אם Hermes יריץ את זה 5 פעמים ברצף, האם ייגרם נזק?' אם כן — לא מכניסים ל-whitelist",
      ],
    },
    {
      id: "verification",
      icon: Eye,
      title: "Verification — המפתח לאמינות אמיתית",
      subtitle: "התיקון עבד רק אם אפשר להוכיח שהוא עבד — לא מספיק ש'הפקודה רצה'",
      description:
        "הטעות הכי נפוצה של צוותי SRE מתחילים: 'עשיתי restart, הפקודה החזירה 0, זה בטח בסדר'. לא. Verification היא היכולת להוכיח שאחרי התיקון השירות באמת חי, באמת מגיב ובאמת עושה את מה שהוא צריך לעשות. זה ההבדל בין Hermes שעובד לבין סקריפט שרץ בלילה ומרדים אתכם עם הרגשה שהכל בסדר — עד שבבוקר מגלים שה-API החזיר 500 כל הלילה.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "זה אולי החלק הכי חשוב, ורוב האנשים מזלזלים בו. הטעות הקלאסית: 'הפעלתי מחדש את השירות, הפקודה רצה, אז בטח הכל בסדר'. לא בהכרח. אימות זה ההבדל בין 'הפקודה רצה' ל'המטופל באמת הבריא'. כמו רופא שלא מסתפק בלרשום תרופה אלא חוזר לבדוק שהחום ירד באמת. אצלי (אלעד) אני משקיע באימות יותר קוד מאשר בתיקון עצמו — כי זה בדיוק מה שקובע אם אני ישן בשקט או מגלה בבוקר שהאתר החזיר שגיאות כל הלילה בזמן ש'הכל נראה ירוק'.",
      content: [
        "health endpoint חייב להחזיר 200 + JSON במבנה הצפוי (לא רק status=ok — גם שדות חובה כמו version, uptime)",
        "זמן תגובה מתחת ל-threshold סביר (שירות שעונה תוך 5 שניות במקום 200ms הוא 'לא בריא' גם אם הוא חזר)",
        "tail של ה-log בתוך 30 שניות אחרי התיקון לא מכיל ERROR חדשים (אם חזר עם אותה שגיאה — התיקון לא הצליח)",
        "אם זה API — request-response sanity check עם payload סינטטי (POST לאנדפוינט test, לראות שה-roundtrip עובד)",
        "אם זה DB — פשוט SELECT 1 לקריאה, ו-transaction קטן של write+rollback כדי לוודא שגם כתיבה עובדת",
        "זמן המתנה: 30 שניות אחרי התיקון לפני שמתחילים לבדוק (startup period) — אחרת תופסים את השירות באמצע booting וחושבים בטעות שהוא שבור",
      ],
      tips: [
        "זכרו את המשפט 'ה-verification הוא חצי מהערך' — הרבה צוותים מקדישים 90% ל-detect+fix ו-10% ל-verify. אצלי (אלעד) היחס הפוך: verify תופס יותר קוד מ-fix, כי הוא קובע אם אתם מתעוררים בלילה או לא",
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
      beginner:
        "בלי זיכרון, Hermes הוא טכנאי שמגיע בכל פעם מאפס ולא זוכר ששבוע שעבר כבר פתר את אותה תקלה בדיוק. עם זיכרון, הוא הופך לטכנאי ותיק שאומר 'אה, את הבעיה הזאת אני מכיר — נסה את זה קודם'. כל תיקון מוצלח נשמר, ובפעם הבאה שמופיע סימפטום דומה, חיפוש מהיר 'לפי משמעות' מוצא את הפתרון שעבד בעבר ומנסה אותו ראשון. התוצאה אצלי (אלעד): אחרי חצי שנה אחוז התיקונים שמצליחים מהניסיון הראשון קפץ מ-60% ל-85% — בלי לשנות שורת קוד, רק בזכות שהמערכת זוכרת.",
      content: [
        "collection בשם healing_history ב-[Qdrant](/guide/qdrant) (cosine distance, 768 dimensions עם gemini-embedding-001)",
        "שדות ברשומה: {ts, service, symptom_embedding, action_taken, success, duration_ms}",
        "ה-embedding של הסימפטום מורכב משני חלקים: תיאור קצר של הבעיה (מה-diagnosis של ה-LLM) + tail של 20 שורות מה-log",
        "לפני כל פעולת תיקון Hermes עושה semantic search ב-collection — 'מצא לי 3 תקלות הכי דומות שקרו בעבר'",
        "אם נמצאה התאמה עם score > 0.8 ו-success=true — מנסים קודם את אותו תיקון (חוסך 2 ניסיונות כושלים)",
        "דוח שבועי אוטומטי שנשלח ל-[Dashboard](/guide/dashboard): 'Top 5 problem-action pairs' — חושף patterns שחוזרים על עצמם ומזמין אתכם לתקן את הבעיה המקורית",
      ],
      tips: [
        "ככל שה-memory גדל, יותר תקלות מקבלות תיקון ב-attempt הראשון — אצלי (אלעד) אחרי 6 חודשים success rate עלה מ-~60% ל-~85% בלי שינוי קוד, רק בזכות הזיכרון",
        "הדוח השבועי הוא הנכס הכי שווה — אם תקלה X מופיעה 12 פעמים בשבוע, זה סימן שלא באמת תיקנתם אותה; התייחסו ל-healing_history כמו ל-backlog של באגים",
      ],
    },
    {
      id: "escalation",
      icon: AlertTriangle,
      title: "Escalation — מתי נכון להעיר אתכם (וכמה שפחות)",
      subtitle: "הזהב של self-healing: להתריע רק כשזה באמת שווה השינה שלכם",
      description:
        "Escalation הוא last resort — הרגע שבו Hermes מרים ידיים ואומר 'אני לא מצליח, תעזור/י'. כל הרעיון של Hermes הוא לצמצם את ההתראות ל-10% מהמקרים — רק לדברים חדשים ומעניינים. אם Hermes שולח יותר מדי התראות — זה סימן שה-whitelist או ה-memory לא טובים מספיק, לא סימן ש'הכלי רועש'. PagerDuty starter עולה 21 דולר למשתמש בחודש (וחלופות מודרניות כמו BetterStack, Grafana OnCall או Squadcast עולות אפילו פחות); Hermes עולה 0 וחוסך גם את השינה.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      beginner:
        "escalation זה הרגע שבו Hermes מרים ידיים ואומר 'אני לא מצליח לבד, תעזרו לי'. וזה כל היופי: כל המטרה היא שהרגע הזה יקרה כמה שפחות. דמיינו שומר לילה טוב — הוא לא מתקשר אליכם על כל רעש, רק כשבאמת קרה משהו שהוא לא יכול לטפל בו. אם Hermes מעיר אתכם הרבה, זה לא 'הכלי רועש' — זה סימן שצריך ללמד אותו לטפל ביותר מקרים לבד. אצלי (אלעד) הוא מעיר אותי פעם-פעמיים בשבוע, ותמיד על משהו שבאמת לא ראיתי קודם. וזה מחליף שירות התראות שעולה עשרות דולרים בחודש — בחינם.",
      content: [
        "3 ניסיונות כושלים — כל פעולה מה-whitelist נוסתה, שום דבר לא החזיר את השירות (זה הטריגר הכי נפוץ ל-escalation)",
        "Service DOWN > 10 דקות — גם אם עוד לא נוסו 3 פעמים; 10 דקות של downtime זה כבר ערך שדורש עין אנושית",
        "Data loss risk — סיטואציה שעלולה לגרום לאובדן נתונים (disk full קריטי, DB corruption, מסמכי [Qdrant](/guide/qdrant) לא נגישים) — Hermes לא נוגע, רק מתריע",
        "Cascade — אם 2+ שירותים נופלים באותו זמן, זה סימן לבעיה סביבתית (network, hardware, power) — Hermes לא ינסה לתקן אחד ולהחמיר את המצב; הוא מתריע מיד",
        "Alert channels מדורגים: email ל-non-urgent (סיכום יומי), SMS ל-critical (שירות חיוני down), וואטסאפ דרך [Kami](/guide/kami) ל-immediate (cascade או data loss). זה מחליף את PagerDuty ב-0 שקל",
        "Runbook מצורף אוטומטית לכל alert — 'ניסיתי: restart (נכשל כי X), recreate (נכשל כי Y), cache clear (לא רלוונטי). ה-log אומר Z. תיקונים דומים בעבר: [רשימה מה-healing_history]'",
      ],
      tips: [
        "הכלל שלי (אלעד): אם Hermes העיר אותי בלילה, זה משהו שלא ראיתי מעולם. עדיף שירות שיהיה down 20 דקות ואני אחקור לאט מאשר שאתפוצץ מ-60 התראות זהות על אותו restart",
        "המטריקה הכי חשובה אחרי 'uptime' היא 'escalation rate per week' — אצלי היא 1-2 בשבוע. אם אצלכם זה 20, משהו ב-whitelist צריך להתעבות",
      ],
    },
    {
      id: "advanced",
      icon: Wrench,
      title: "אינטגרציה עם הרשת שלכם — Hermes הוא Pattern, לא שירות",
      subtitle: "איך מטמיעים את הגישה בתוך הסוכנים והשירותים הקיימים",
      description:
        "הערה חשובה: ה-pattern של Hermes (זיהוי→אבחון→תיקון→אימות→למידה) הוא דפוס שיושב בתוך הסוכנים והשירותים עצמם — cron jobs, webhook handlers או מודול בקוד — לא שירות מרכזי אחד. זה דווקא יתרון: self-healing אפקטיבי מפוזר בתוך כל רכיב. עדכון 2026: בנוסף לדפוס ה-self-healing שממנו צמח השם, היום ברשת שלי Hermes הוא גם סוכן-הסטודיו/העובד של הרשת — הרכיב חסר-הממשק שמייצר נכסים, מנתח נתונים ומריץ קוד מטעם המתזמר. שני הצדדים חיים יחד: הדפוס שמחזיק את השרת חי, והסוכן שמייצר עליו תוצרים.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "נקודה חשובה להבנה: Hermes הוא לא 'תוכנה אחת' שאתם מתקינים, אלא שיטה — דרך חשיבה שאפשר לשתול בתוך כל סוכן ושירות שכבר יש לכם. כמו הרגל בריא שאפשר ללמד כל עובד בצוות, לא מחלקה נפרדת. אצלי (אלעד) אותה שיטת ריפוי-עצמי יושבת בתוך [Kaylee](/guide/kaylee) ובתוך ה-[Delegator](/guide/delegator), בלי לשנות את הארכיטקטורה שלהם. הסעיף הזה טכני יותר, אבל הרעיון פשוט: כל רכיב שיודע לבדוק את עצמו, לתקן את עצמו וללמוד מטעויותיו — הוא רכיב שאפשר לסמוך עליו.",
      content: [
        "Hermes כסוכן-סטודיו (הרשת שלי, 2026): רכיב headless שמקבל משימות מ-[Claude Code](/claude-code) (המתזמר) ומחזיר תוצר מובנה — יצירת נכסים ויזואליים, ניתוחי-נתונים (data-science), והאצלת משימות-קוד לסוכני-קוד אחרים. רץ על Gemini חינמי, ומשוחח בטלגרם בטקסט ובקול (Gemini TTS).",
        "חלוקת-עבודה ברשת: [Kami](/guide/kami) = ממשק-אנוש (וואטסאפ), Claude Code = תזמור-פיתוח, Hermes = סטודיו/עובד, [Kaylee](/guide/kaylee) = אמינות/תשתית + הפצה. כל אחד מכיר את כולם ומאציל למתאים — זו ה'מפת הרמוניה' של הרשת.",
        "אצלי (אלעד), ה-pattern של Hermes מיושם בתוך [Kaylee](/guide/kaylee) (self-heal cron שרץ על ה-OpenClaw engine שלה) ובתוך ה-[Delegator](/guide/delegator) (auto-heal executor שמזהה כשל באחד מה-endpoints)",
        "אפשר להוסיף לכל סוכן ברשת — [Kami](/guide/kami), [Box](/guide/box), [Adopter](/guide/adopter), [CrewAI](/guide/crewai) — את אותו pattern בלי שינויי ארכיטקטורה",
        "Health endpoints: תנאי סף. כל שירות חייב לחשוף /health שמחזיר JSON עם {status, version, uptime}. בלי זה — אין verification אמיתי",
        "Centralized logs: `journalctl` ב-Linux, `docker logs` ב-[Docker](/guide/docker) — אלה הכלים הבסיסיים של Hermes ל-diagnosis. אם יש לכם Loki או Datadog — עוד יותר טוב",
        "Integration ל-PagerDuty/BetterStack/Grafana OnCall (או Jira Service Management, הגלגול של Opsgenie אחרי הרכישה של Atlassian): לא חובה (Hermes מחליף אותם ב-90% מהמקרים), אבל אפשר לחבר ל-escalation path כ-fallback נוסף",
        "[Dashboard](/guide/dashboard) endpoint: /health/agents מציג את מצב כל השירותים בזמן אמת. זה ה-UI שלכם מול כל הרשת — פתוח בלשונית של הדפדפן כל היום",
        "שילוב עם [n8n](/guide/n8n) או [Aider](/guide/aider): Hermes יכול להפעיל flows של n8n כחלק מ-repair (למשל 'restart + הודעה ב-Slack'), או לבקש מ-Aider לתקן קוד אוטומטית כשה-build נכשל",
      ],
      tips: [
        "אל תיישמו את Hermes מ-scratch ביום הראשון. התחילו מ-3 שורות bash: `docker ps | grep unhealthy && docker restart $name`, הוסיפו health check, ואז לאט-לאט עוברים ל-Go או Python. אצלי (אלעד) הגרסה הראשונה הייתה 80 שורות והגרסה הנוכחית מעל 2000 — אבל הערך הגיע כבר מהגרסה הראשונה",
        "ה-pattern עובד גם על stacks שלא קשורים ל-AI כלל — nginx + postgres + redis מקבלים אותו טיפול: detect → diagnose → fix (מתוך whitelist קצר) → verify → learn. זה לא רק לסוכנים",
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
      title: "המדריך לשכבת-האוטונומיה",
      description: "איפה הריפוי-העצמי החי של הרשת חי היום — remediation + Oracle",
      href: "/guide/autonomy",
      icon: BookOpen,
    },
    {
      title: "המדריך לתזמור-רשת",
      description: "חלוקת-העבודה: מי מתזמר, מי עובד, מי כותב תוכן",
      href: "/guide/orchestration",
      icon: BookOpen,
    },
    {
      title: "המדריך ל-Qdrant",
      description: "המאגר של healing_history — הזיכרון של דפוס הריפוי",
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
  ctaTitle: "להתחיל עם Hermes — זה לא רק קוד",
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
    "Hermes תיקן אצלי 40+ תקלות בחצי שנה — בלי שידעתי שהיה משהו. הגישה הזו הפכה את ה-VPS ל-'fire and forget'. המדריך מבוסס על כישלונות אמיתיים — התחלתי עם whitelist אגרסיבי מדי והיה צריך לרסן אותו.",
};
