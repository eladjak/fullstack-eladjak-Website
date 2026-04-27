import {
  Cog,
  Activity,
  Terminal,
  Shield,
  GitBranch,
  RefreshCw,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Users,
  Mail,
  Server,
  Zap,
  AlertCircle,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const systemdGuide: AgentGuideData = {
  slug: "systemd",
  agentName: "systemd",
  agentNameHe: "systemd — מנהל השירותים של לינוקס המודרני",
  category: "infra",
  brandIconSlug: "",
  heroBgImage: "/images/guides/guide-systemd-hero.jpg",
  tagline: "איך להפוך כל סקריפט לשירות שעולה אוטומטית, מתחזק את עצמו ומפיק לוגים — ב-25 שורות INI",
  heroDescription:
    "systemd הוא מנהל התהליכים והשירותים של רוב הפצות לינוקס המודרניות (Ubuntu, Debian, CentOS, Fedora, Arch — כולן). בלי systemd, כל פעם שאתם רוצים להריץ סקריפט שיעלה אוטומטית בכל boot, יקום מחדש אם נפל, ויקבל הגבלות זיכרון/CPU — הייתם צריכים לכתוב הרבה קוד מלוכלך עם cron, screen, supervisord ו-init.d. עם systemd, כל זה הופך לקובץ טקסט קטן בסגנון INI של 10-20 שורות, ופקודה אחת. אצלי (אלעד) על ה-Hetzner VPS, systemd מנהל את כל 13 סוכני המיקרו-שירותים שלי: כל אחד הוא systemd unit נפרד, מתחיל אוטומטית, מתעד לוגים מרכזיים ב-journalctl, ומתחיל מחדש לבד אם הוא קורס. בנוסף, systemd-timer מחליף לי את cron עם סינטקס ברור יותר והיסטוריית הפעלות, ו-systemd-resolved מטפל ב-DNS. הוא לא הכלי הפופולרי ביותר בקרב חובבי 'Unix פילוסופיה' (יש מי שאוהב init scripts קלאסיים), אבל המציאות היא שאם אתם בעולם לינוקס בייצור — אתם משתמשים ב-systemd. המדריך הזה יראה לכם את החלק שבו תשתמשו ב-90% מהזמן: יצירת service units, ניהול דרך systemctl, וקריאת לוגים ב-journalctl.",
  badgeText: "2026 · Service Manager · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/systemd",
  stats: [
    { label: "שירותים אצלי", value: "13" },
    { label: "auto-restart", value: "כן" },
    { label: "logs (יומי)", value: "~500MB" },
    { label: "boot time", value: "<10s" },
  ],
  paradigmTitle: "להפוך סקריפט מ'אני מריץ ידנית' ל'תשתית'",
  paradigmSub:
    "ההבדל בין hobby project לאפליקציה רצינית הוא לא הקוד — אלא איך הוא רץ.",
  paradigmShifts: [
    {
      before: "`python app.py &` ב-screen ולקוות שלא יקרוס",
      after: "systemctl service שמתחיל מחדש אוטומטית",
      icon: RefreshCw,
    },
    {
      before: "cron עם '> /var/log/myapp.log 2>&1'",
      after: "systemd-timer + journalctl מובנה",
      icon: Activity,
    },
    {
      before: "אחרי reboot — לזכור להריץ הכול מחדש",
      after: "systemctl enable — הכול עולה לבד",
      icon: Server,
    },
    {
      before: "אין בקרת זיכרון, סקריפט אחד מפיל הכול",
      after: "MemoryMax, CPUQuota — הגנה מובנית",
      icon: Shield,
    },
  ],
  whoIsThisFor: [
    {
      title: "כל מי שמריץ סקריפט Python/Node על שרת",
      description:
        "במקום `nohup` ו-`screen`, systemd עושה את הכול טוב יותר — auto-restart, לוגים, ניטור.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "מי שמרים סוכני AI על VPS",
      description:
        "כל סוכן = systemd service. אם אחד נופל, רק הוא מתחיל מחדש. שאר הרשת ממשיכה לעבוד.",
      icon: Users,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "צוותים שחוזרים מ-Docker לסקריפטים",
      description:
        "לא כל אפליקציה צריכה Docker. systemd נותן בידוד, restart וניטור — בלי overhead של containers.",
      icon: Cog,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "מי שעדיין משתמש ב-cron",
      description:
        "systemd-timer מציע סינטקס ברור יותר, היסטוריית הפעלות, ויכולת tracking של failures.",
      icon: Activity,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "service-unit", label: "service unit" },
    { id: "systemctl", label: "systemctl" },
    { id: "journalctl", label: "journalctl" },
    { id: "timers", label: "timers" },
    { id: "advanced", label: "מתקדם" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Cog,
      title: "מה זה systemd? המנהל של התהליכים",
      subtitle: "PID 1 — התהליך הראשון, האחראי על כל השאר",
      description:
        "systemd הוא מה שלינוקס מריץ ראשון אחרי שהליבה (kernel) עולה — הוא תהליך מספר 1 (PID 1), והאחריות שלו היא להעלות את כל שאר השירותים שהשרת צריך. ה'init system' הקלאסי הוחלף בהדרגה ב-systemd ברוב ההפצות מ-2015 ואילך, והוא מציע הרבה יותר מסתם 'הפעל סקריפטים בסדר X': ניהול תלויות בין שירותים, מקביליות (services שלא תלויים זה בזה עולים יחד), בדיקות בריאות אוטומטיות, גבולות משאבים, וניהול לוגים מרכזי. הוא שנוי במחלוקת בקהילת לינוקס (יש שטוענים שהוא 'גדול מדי' ופוגע בפילוסופיית Unix), אבל בפועל — הוא מה שתפגשו על כל שרת ייצור.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על זה כמו על ראש משק בית גדול: האחראי הזה דואג שהמכבסה תרוץ, שהבישול ייעשה בזמן, שהמחשב יידלק כשצריך, ואם משהו מתקלקל — הוא מתקן ולא מחכה שהבעלים יחזור הביתה. systemd עושה את זה לכל השרת.",
      content: [
        "Unit — היחידה הבסיסית. כל שירות, timer, mount, target — הכול unit. מוגדר בקובץ `.service`, `.timer`, `.mount` וכו'",
        "Service — סוג של unit שמייצג תהליך שצריך לרוץ. הסוג הנפוץ ביותר. אצלי יש 13 כאלה",
        "Target — מצב של המערכת. לדוגמה `multi-user.target` = הכול למעט GUI. שירותים אומרים 'אני רוצה להתחיל אחרי target X'",
        "Unit files — קבצי טקסט קטנים בסגנון INI. נמצאים ב-`/etc/systemd/system/` (אדמין) או `/usr/lib/systemd/system/` (חבילות)",
        "Cgroups — מנגנון של הליבה ש-systemd משתמש בו לבידוד תהליכים. כל service רץ ב-cgroup משלו, כך שאפשר להגביל זיכרון/CPU בנפרד",
        "PID 1 — systemd עצמו רץ כתהליך 1, וכל שאר השירותים הם 'ילדים' שלו. אם הוא קורס — השרת נופל. בפועל זה לא קורה",
      ],
      tips: [
        "אם אתם על Ubuntu/Debian/Fedora — אתם משתמשים ב-systemd. אין צורך במאמץ התקנה",
        "Alpine Linux ו-Void Linux משתמשים ב-OpenRC במקום. הם פופולריים בקונטיינרים בגלל גודל קטן",
      ],
    },
    {
      id: "service-unit",
      icon: GitBranch,
      title: "Service Unit: הקובץ שמגדיר שירות",
      subtitle: "20 שורות שהופכות סקריפט לתשתית",
      description:
        "Service unit הוא קובץ INI פשוט שמתאר איך להריץ את השירות שלכם. שלוש סקציות עיקריות: [Unit] (תיאור ותלויות), [Service] (איך להריץ — פקודה, משתמש, restart policy), ו-[Install] (איפה ב-boot order להפעיל). אצלי כל אחד מ-13 הסוכנים מוגדר בקובץ כזה ב-`/etc/systemd/system/`.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "[Unit] Description — תיאור קצר באנגלית שמופיע ב-`systemctl status`",
        "[Unit] After — תלויות. למשל `After=network.target postgresql.service` אומר 'חכה שהרשת ו-Postgres יעלו לפני שאתה מתחיל'",
        "[Service] Type — `simple` (ברירת מחדל, התהליך רץ ב-foreground), `forking` (מתפצל ויוצא — ל-daemons ישנים), `notify` (מודיע ל-systemd כשהוא מוכן), `oneshot` (רץ פעם אחת ויוצא)",
        "[Service] ExecStart — הפקודה להרצה. תמיד נתיב מלא: `/usr/bin/python3 /opt/myapp/app.py`",
        "[Service] User/Group — איזה משתמש מריץ. נסו תמיד לא root. צרו משתמש ייעודי לכל שירות",
        "[Service] Restart — `always` (תמיד), `on-failure` (רק אם קרס), `no` (לא). לסוכנים שלי תמיד `always`",
        "[Service] RestartSec — כמה לחכות לפני restart. אצלי 5 שניות — מהיר, אבל לא מציף את ה-CPU אם משהו רע במיוחד",
        "[Service] Environment / EnvironmentFile — משתני סביבה. EnvironmentFile מצביע על קובץ `.env` (לא קובץ shell — צריך פורמט פשוט)",
        "[Install] WantedBy — מתי להפעיל. כמעט תמיד `multi-user.target` (אחרי שכל השאר עלה)",
      ],
      tips: [
        "אחרי כל שינוי ב-unit file: `systemctl daemon-reload` — systemd צריך לקרוא מחדש את כל ה-unit files",
        "אצלי כל unit שומר את ה-stdout/stderr ל-journalctl אוטומטית. לא צריך להגדיר `StandardOutput=` — זוהי ברירת המחדל",
        "אם השירות שלכם מקשיב לפורט מתחת ל-1024 (כמו 80 או 443), צריך `AmbientCapabilities=CAP_NET_BIND_SERVICE`. עדיף שזה יהיה מאחורי nginx ולא ישירות",
      ],
      codeExample: {
        label: "service unit מלא לסוכן Python",
        code: "# /etc/systemd/system/kami-agent.service\n[Unit]\nDescription=Kami WhatsApp Agent\nAfter=network.target postgresql.service redis.service\nRequires=postgresql.service\nWants=redis.service\n\n[Service]\nType=simple\nUser=kami\nGroup=kami\nWorkingDirectory=/opt/kami\nEnvironmentFile=/opt/kami/.env\nExecStart=/opt/kami/.venv/bin/python -m kami.main\nRestart=always\nRestartSec=5s\n\n# מגבלות משאבים\nMemoryMax=512M\nCPUQuota=50%\n\n# אבטחה\nNoNewPrivileges=true\nPrivateTmp=true\nProtectSystem=strict\nReadWritePaths=/opt/kami/data /var/log/kami\n\n# logging\nStandardOutput=journal\nStandardError=journal\nSyslogIdentifier=kami\n\n[Install]\nWantedBy=multi-user.target",
      },
    },
    {
      id: "systemctl",
      icon: Terminal,
      title: "systemctl: הפקודות שתשתמשו בהן בכל יום",
      subtitle: "start, stop, status, enable, disable",
      description:
        "systemctl היא ה-CLI לניהול systemd. רוב מה שתעשו הן פקודות פשוטות מאוד שתחזרו עליהן עשרות פעמים ביום. הנה הסט שמספיק ל-95% מהזמן.",
      color: "from-purple-600 to-violet-500",
      difficulty: "beginner",
      content: [
        "`systemctl start <service>` — הפעלה חד-פעמית. השירות עולה, אבל לא יחזור אחרי reboot",
        "`systemctl enable <service>` — מסמן 'הפעל אוטומטית בכל boot'. עדיין לא מתחיל עכשיו",
        "`systemctl enable --now <service>` — מסמן + מתחיל עכשיו. זה מה שאני משתמש בו כמעט תמיד",
        "`systemctl stop <service>` — עוצר. שולח SIGTERM (חינני), מחכה 90s, ואם השירות לא נעצר — שולח SIGKILL",
        "`systemctl restart <service>` — stop + start ברצף. הדרך הסטנדרטית לעדכן הגדרות",
        "`systemctl reload <service>` — אם השירות תומך ב-reload (טוען config בלי לעצור). נדיר",
        "`systemctl status <service>` — מציג מצב נוכחי + 10 שורות לוגים אחרונות. הדבר הראשון לבדוק כשמשהו לא עובד",
        "`systemctl list-units --failed` — מציג רק את השירותים שכרגע במצב failed. אצלי תמיד שווה לבדוק",
        "`systemctl daemon-reload` — אחרי שינוי קובץ unit, צריך לבקש מ-systemd לקרוא אותו מחדש",
      ],
      tips: [
        "קיצור שאני אוהב: `sc` כ-alias ל-`systemctl`. הוסיפו `alias sc='sudo systemctl'` ב-`.bashrc`",
        "כדי לראות את כל ה-units שאצלכם: `systemctl list-units --type=service --all` — מציג רצים, עצורים, ו-failed",
        "`systemctl edit <service>` פותח עורך ויוצר drop-in override (קובץ נפרד שדורס שדות). בטוח יותר מלערוך את הקובץ המקורי",
      ],
      codeExample: {
        label: "workflow טיפוסי של פריסה",
        code: "# 1. כתבו את ה-unit file\nsudo nano /etc/systemd/system/kami-agent.service\n\n# 2. אמרו ל-systemd לקרוא אותו\nsudo systemctl daemon-reload\n\n# 3. הפעילו וסמנו כאוטומטי\nsudo systemctl enable --now kami-agent\n\n# 4. ודאו שעובד\nsudo systemctl status kami-agent\n# Active: active (running) since ...\n\n# 5. עדכון בעתיד (אחרי git pull):\nsudo systemctl restart kami-agent\nsudo systemctl status kami-agent\n\n# 6. אם משהו דפוק, רואים מה קרה:\nsudo journalctl -u kami-agent -n 50 --no-pager",
      },
    },
    {
      id: "journalctl",
      icon: Activity,
      title: "journalctl: לוגים מרכזיים, חיפוש מהיר",
      subtitle: "כל הלוגים של כל השירותים — במקום אחד, עם שאילתות",
      description:
        "journalctl הוא הכלי לקריאת הלוגים ש-systemd אוסף. כל מה שהשירותים שלכם כותבים ל-stdout או stderr נכנס לשם אוטומטית, יחד עם metadata עשיר (timestamp מדויק, PID, יחידה, משתמש). אפשר לחפש לפי כל אחד מהם, לסנן זמנים, לעקוב בזמן אמת — וכל זה בכלי אחד.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "`journalctl -u kami-agent` — כל הלוגים של השירות הזה, מההתחלה. ארוך, אבל מקיף",
        "`journalctl -u kami-agent -f` — follow, בזמן אמת. הכלי הראשון ל-debug של שירות פעיל",
        "`journalctl -u kami-agent -n 100` — 100 שורות אחרונות בלבד. מהיר",
        "`journalctl -u kami-agent --since '1 hour ago'` — רק מה שקרה בשעה האחרונה. תומך ב-`yesterday`, `2 hours ago`, `2026-04-27 10:00`",
        "`journalctl -u kami-agent -p err` — רק הודעות ברמת error או חמורה יותר. priorities: emerg, alert, crit, err, warning, notice, info, debug",
        "`journalctl -u kami-agent --grep 'timeout'` — חיפוש regex בתוך הלוגים. `--grep` תומך ב-regex מלא",
        "`journalctl -u kami-agent -o json-pretty` — output בפורמט JSON עם metadata מלא. שימושי לעיבוד עם `jq`",
        "`journalctl --disk-usage` — כמה מקום הלוגים תופסים. `journalctl --vacuum-size=500M` מנקה ל-500MB",
        "`journalctl --list-boots` — רשימת ה-boots. `-b -1` מציג את הלוגים מה-boot הקודם (שימושי ל-debug של קריסות)",
      ],
      tips: [
        "תמיד הוסיפו `--no-pager` לסקריפטים — אחרת journalctl פותח less ומחכה ל-Q",
        "אם השרת קטן ב-disk, הוסיפו ל-`/etc/systemd/journald.conf`: `SystemMaxUse=500M` ו-`SystemMaxFileSize=50M`. אחרת לוגים יכולים לאכול את כל הדיסק",
        "לוגים מכמה units יחד: `journalctl -u kami -u kaylee -u box -f` — שלושה סוכנים בזמן אמת ב-stream אחד",
      ],
      codeExample: {
        label: "פקודות journalctl שימושיות",
        code: "# הלוגים של השעה האחרונה, רק errors\nsudo journalctl -u kami-agent --since '1 hour ago' -p err\n\n# מעקב בזמן אמת על כל הסוכנים\nsudo journalctl -u kami -u kaylee -u box -u hermes -f\n\n# חיפוש exception ב-24 השעות האחרונות\nsudo journalctl -u kami-agent --since today --grep 'Exception|Traceback'\n\n# ייצוא יומי ל-JSON לניתוח נתונים\nsudo journalctl -u kami-agent --since today -o json > kami-today.jsonl\n\n# בדיקת קריסה: לוגים מה-boot שלפני הקריסה\nsudo journalctl -b -1 -u kami-agent",
      },
    },
    {
      id: "timers",
      icon: Zap,
      title: "Timers: ה-cron של 2026",
      subtitle: "תזמון משימות עם היסטוריה, נראות וטוב יותר מ-cron",
      description:
        "systemd-timers הם החלופה המודרנית ל-cron. במקום קובץ יחיד עם syntax עתיק (`* * * * *`), כל משימה מתוזמנת היא שני קבצים: `myjob.service` (מה לעשות) ו-`myjob.timer` (מתי). היתרונות על cron: היסטוריה מלאה (`journalctl -u myjob.timer`), restart אם נכשל, ויכולות מתקדמות כמו 'הפעל פעם בשבוע ב-2 לפנות בוקר, רק אם השרת היה למעלה אז'.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "OnCalendar — תזמון לפי זמן. סינטקס ברור יותר מ-cron: `OnCalendar=daily`, `OnCalendar=*-*-* 03:00:00`, `OnCalendar=Mon..Fri 09:00`",
        "OnBootSec — כמה זמן אחרי boot להפעיל. `OnBootSec=5min` = 5 דקות אחרי שהשרת עלה",
        "OnUnitActiveSec — מרווח מההפעלה האחרונה. `OnUnitActiveSec=1h` = כל שעה אחרי הריצה הקודמת",
        "Persistent — אם השרת היה down בזמן שהיה אמור להפעיל, הוא יפעיל מיד אחרי boot. תכונה שאין ב-cron",
        "RandomizedDelaySec — מוסיף עיכוב אקראי. שימושי כדי לא להפעיל 100 שירותים בדיוק באותה שנייה",
        "`systemctl list-timers` — מציג את כל ה-timers, מתי הופעלו לאחרונה, ומתי יופעלו הבא",
        "השוואה: cron נשאר טוב לסקריפטים אישיים פשוטים. systemd-timer עדיף לכל דבר רציני בשרת",
      ],
      tips: [
        "תמיד ודאו שיש `Persistent=true` ב-timer לגיבוי (backup) — אחרת, אם השרת היה כבוי בזמן שהיה אמור לרוץ, תפספסו אותו לחלוטין",
        "לבדיקת תזמון: `systemd-analyze calendar 'Mon..Fri 09:00'` — מציג מתי בדיוק הוא יפעל בפעמים הבאות",
      ],
      codeExample: {
        label: "timer + service לגיבוי יומי",
        code: "# /etc/systemd/system/pg-backup.service\n[Unit]\nDescription=Daily PostgreSQL backup\n\n[Service]\nType=oneshot\nUser=postgres\nExecStart=/usr/local/bin/pg-backup.sh\n\n# /etc/systemd/system/pg-backup.timer\n[Unit]\nDescription=Run pg-backup daily at 03:00\n\n[Timer]\nOnCalendar=*-*-* 03:00:00\nRandomizedDelaySec=10min\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n\n# הפעלה:\n# sudo systemctl enable --now pg-backup.timer\n# בדיקה:\n# systemctl list-timers pg-backup.timer\n# journalctl -u pg-backup.service",
      },
    },
    {
      id: "advanced",
      icon: Shield,
      title: "מתקדם: sandboxing, resource limits וסודות",
      subtitle: "הופך את systemd לתחליף קל ל-Docker בהרבה מקרים",
      description:
        "אחת התכונות המודרניות של systemd היא היכולת לבודד שירותים בלי Docker — דרך מנגנונים של הליבה (namespaces, cgroups, capabilities). אם הפרויקט שלכם לא דורש containerization מלא (אין צורך לבנות image, לשתף עם אחרים), systemd יכול לתת לכם 80% מהבידוד של Docker בכמה שורות.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "MemoryMax / MemoryHigh — תקרת זיכרון. אם השירות חורג, OOM-killer יהרוג אותו (ו-systemd יפעיל מחדש)",
        "CPUQuota — אחוז CPU מקסימלי. `CPUQuota=50%` = חצי ליבה אחת לכל היותר",
        "TasksMax — מקסימום threads/processes. מונע fork bombs",
        "ProtectSystem=strict — מערכת הקבצים לקריאה בלבד. רק תיקיות שאתם מציינים ב-`ReadWritePaths` ניתנות לכתיבה",
        "ProtectHome=true — חוסם גישה ל-`/home`. שירות שלא צריך — לא ייגע",
        "PrivateTmp=true — `/tmp` נפרד לכל שירות. בידוד בין שירותים שכותבים שם",
        "NoNewPrivileges=true — חוסם privilege escalation. גם אם יש חולשה — אי אפשר להפוך ל-root",
        "DynamicUser=true — systemd יוצר משתמש זמני במהלך ההפעלה ומוחק אחר כך. אין צורך ליצור user ידנית",
        "LoadCredential — סודות מקובץ או socket, בלי ש'יישבו' ב-environment כל הזמן",
        "systemd-analyze security <service> — נותן ציון אבטחה (0-10) ומציע שיפורים. כלי חובה",
      ],
      tips: [
        "הריצו `systemd-analyze security kami-agent` על כל שירות — תקבלו רשימת שיפורים אוטומטית. אצלי שיפרתי את כל הסוכנים מציון 4 ל-1.5 (נמוך יותר = בטוח יותר)",
        "לסודות (API keys), השתמשו ב-`LoadCredential` במקום ב-`Environment`. כך הם לא מופיעים ב-`systemctl show` או ב-`/proc/<pid>/environ`",
      ],
      codeExample: {
        label: "service מאובטח עם sandboxing מלא",
        code: "[Service]\n# בידוד של מערכת קבצים\nProtectSystem=strict\nProtectHome=true\nPrivateTmp=true\nReadWritePaths=/var/lib/kami /var/log/kami\n\n# בידוד פרוצסים\nNoNewPrivileges=true\nProtectKernelTunables=true\nProtectKernelModules=true\nProtectControlGroups=true\nRestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX\nRestrictNamespaces=true\nLockPersonality=true\nMemoryDenyWriteExecute=true\nRestrictRealtime=true\n\n# מגבלות משאבים\nMemoryMax=512M\nCPUQuota=50%\nTasksMax=100\n\n# סודות\nLoadCredential=anthropic-key:/etc/kami/secrets/anthropic.key\n# בקוד: $CREDENTIALS_DIRECTORY/anthropic-key",
      },
    },
  ],
  resources: [
    {
      title: "systemd Documentation",
      description: "התיעוד הרשמי — מקיף, גם אם קצת מאיים בהתחלה",
      href: "https://www.freedesktop.org/wiki/Software/systemd/",
      icon: BookOpen,
    },
    {
      title: "DigitalOcean systemd Tutorials",
      description: "המדריכים הקלים ביותר להבנה. התחילו כאן",
      href: "https://www.digitalocean.com/community/tutorials/systemd-essentials-working-with-services-units-and-the-journal",
      icon: BookOpen,
    },
    {
      title: "ArchWiki systemd",
      description: "המדריך המקיף ביותר. אם אתם רוצים להבין הכול לעומק",
      href: "https://wiki.archlinux.org/title/Systemd",
      icon: ExternalLink,
    },
    {
      title: "systemd by Example",
      description: "דוגמאות אמיתיות של units לכל סיטואציה",
      href: "https://systemd-by-example.com/",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Docker",
      description: "האלטרנטיבה הפופולרית — מתי לבחור מה",
      href: "/guide/docker",
      icon: BookOpen,
    },
    {
      title: "המדריך ל-Cloudflare Tunnel",
      description: "להריץ את cloudflared כ-systemd service",
      href: "/guide/cloudflare-tunnel",
      icon: BookOpen,
    },
  ],
  ctaTitle: "צריכים עזרה להפוך סקריפט לשירות?",
  ctaSub:
    "אצלי 13 סוכנים רצים כ-systemd services עם uptime של 99.9%. אני יכול להעביר את הסקריפטים שלכם ל-services של ייצור.",
  primaryCta: {
    label: "systemd Quick Reference",
    href: "https://www.shellhacks.com/systemd-systemctl-managing-services-and-units-cheat-sheet/",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "תאמו systemd setup",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "אצלי על Hetzner VPS, systemd מנהל 13 שירותים שונים — מ-Python agents, דרך Node webhooks ועד Go workers. uptime ממוצע: 99.9%. כל אחד מהשירותים מבודד עם resource limits ו-sandboxing, וכשמשהו נופל — הוא קם לבד בתוך 5 שניות. המדריך הזה הוא כל מה שצברתי באלף שעות של ניהול ייצור על Linux.",
};
