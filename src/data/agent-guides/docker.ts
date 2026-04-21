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
  category: "infra",
  logoImage: "/images/guide-logos/docker-logo.png",
  tagline: "containers, docker-compose, והארכיטקטורה שמאפשרת רשת סוכנים ב-VPS אחד",
  heroDescription:
    "Docker היא אחת מהטכנולוגיות החשובות ביותר שצמחו בעולם התוכנה בעשור האחרון, והיא זו שמאפשרת לרוב שירותי הענן והסוכנים החכמים של היום לעבוד כמו שהם עובדים. בבסיסה, Docker פותרת בעיה פשוטה אבל כאובה: כל שירות תוכנה דורש סביבה מסוימת כדי לרוץ (גרסה מסוימת של שפה, ספריות ספציפיות, הגדרות רשת), וכשמנסים להתקין כמה שירותים על אותו שרת — הם מתנגשים, ומה שעבד אתמול מפסיק לעבוד מחר. Docker פותרת את זה על ידי אריזה של כל שירות ל'קופסה' מבודדת משלו (באנגלית: container — קונטיינר), שמכילה את הכל מה שהשירות צריך — וכך הוא רץ בדיוק אותו דבר על כל מחשב, בכל סביבה. ההרחבה של Docker שנקראת docker-compose מאפשרת להגדיר כמה קופסאות יחד בקובץ אחד, להרים את כולן בפקודה אחת, ולנהל את הרשת ביניהן — ממש כמו מנצח תזמורת. אצלי (אלעד) כל רשת הסוכנים שמופיעה באתר הזה (עשרה שירותים שונים כמו [Kami](/guide/kami), [Kaylee](/guide/kaylee), [Qdrant](/guide/qdrant), ו-[Delegator](/guide/delegator)) רצה בהתקנה אחת של docker-compose על Hetzner CPX11 בכ-4.75€ לחודש (2 vCPU · 2GB RAM). אצלכם, Docker יכולה להיות הבסיס לכל פרויקט: מסביבת פיתוח מקומית, דרך pipeline של CI/CD, ועד שירות ייצור מלא בענן. אחרי שמכירים את docker-compose, רוב מה שמוצג בשאר המדריכים הופך להיות אפשרי בעצמכם.",
  badgeText: "2026 · Containers & Compose · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/docker",
  heroBgImage: "/images/guides/guide-docker-hero.jpg",
  videoUrl: "/videos/guides/docker.mp4",
  stats: [
    { label: "containers אצלי", value: "14" },
    { label: "uptime", value: "99.7%" },
    { label: "עלות שרת בסיס", value: "~4.75€/חודש" },
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
        "Docker זו מערכת הפעלה-על (container runtime) שמאפשרת לקחת תהליך תוכנה כלשהו יחד עם כל הסביבה שהוא צריך (גרסת שפה, ספריות, קבצי תצורה) ולארוז את הכל ל'קופסה' אחת סגורה וקטנה — שנקראת container (קונטיינר). הקונטיינר הזה רץ בדיוק אותו דבר אצלי (אלעד) על השרת ב-Hetzner, אצלכם על המחשב, ובתוך GitHub Actions — כי הוא נושא איתו את כל מה שהוא צריך. מאחורי הקלעים Docker מנצלת מנגנונים של Linux (namespaces ו-cgroups) שמאפשרים בידוד ברמת הליבה, אז זה מרגיש כמו מכונה וירטואלית — אבל הרבה יותר קל ומהיר.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "דמיינו מטען של ספינה: כל קונטיינר בים הוא קופסה אטומה עם סחורה פנימית משלה — הנמל לא צריך לדעת מה יש בתוכה, רק איך להרים ולהניח אותה. Docker עושה בדיוק את זה לתוכנה. במקום להתקין Postgres ישירות על השרת ולהתפלל שזה לא יתנגש עם מה שכבר רץ שם, אתם מריצים `docker run postgres` — והוא קם כמעט מיד, רץ מבודד, ואפשר למחוק אותו בסוף בלי להשאיר עקבות. מכונה וירטואלית רגילה לוקחת 30 שניות לעלות; קונטיינר לוקח שנייה.",
      content: [
        "Container (קונטיינר) — תהליך מבודד עם מערכת קבצים משלו, כתובת רשת משלו, ועץ תהליכים משלו. כאילו יש לו מחשב קטן ופרטי בתוך המחשב הגדול",
        "Image (אימג') — התבנית שממנה מריצים קונטיינר. כמו שרטוט של בית שממנו אפשר לבנות אינסוף בתים זהים (אותו קשר שיש בין מחלקה בתכנות לעצם שנוצר ממנה)",
        "Dockerfile — קובץ טקסט פשוט שמתאר איך בונים את האימג'. זה מתכון שלב-אחר-שלב: מאיזה בסיס להתחיל (FROM), אילו קבצים להכניס (COPY), אילו פקודות להריץ (RUN), ומה להפעיל כשהקונטיינר עולה (CMD)",
        "Docker Hub — הספרייה הציבורית של העולם לאימג'ים מוכנים (nginx, postgres, python ועוד אלפים). שורה אחת בקוד ויש לכם שרת דאטאבייס שרץ",
        "תאימות — על Linux זה עובד טבעי לחלוטין; על Mac ו-Windows זה רץ בתוך מכונה וירטואלית קטנטנה מאחורי הקלעים (באמצעות Docker Desktop, Colima, OrbStack, או Podman). שימו לב: Docker Desktop חינמי לשימוש אישי ולעסקים קטנים, אבל דורש רישיון בארגונים גדולים (מעל 250 עובדים או 10M$ הכנסה שנתית); Podman ו-Colima פתוחים לחלוטין בחינם ללא מגבלה",
      ],
      tips: [
        "משתמשי Mac — OrbStack (8$ לחודש אישי / 18$ לחודש עסקי) חוסך כ-50% מצריכת הזיכרון לעומת Docker Desktop ומהיר יותר באופן מורגש; Colima היא אלטרנטיבה פתוחה חינמית לגמרי לאלה שמעדיפים קוד פתוח",
        "`docker ps` מראה אילו קונטיינרים רצים כרגע; `docker logs -f <name>` מציג את הפלט שלהם בזמן אמת — שני פקודות שתשתמשו בהן כל יום",
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
        "docker-compose זו הרחבה של Docker שמטפלת בבעיה הטבעית הבאה: כשיש לכם יותר משירות אחד, להריץ כל קונטיינר ידנית בפקודה נפרדת זה כאב ראש. במקום זה, כותבים קובץ טקסט אחד בפורמט YAML (קובץ בשם `docker-compose.yml`) שמתאר את כל השירותים ברשת — איזה אימג' לכל אחד, לאילו תיקיות יש גישה, באילו פורטים הם מקשיבים, ואפילו מי תלוי במי. מאז Compose v2 (שמובנה בתוך Docker עצמה כתוסף `compose` — לא צריך להתקין את הבינארי הישן `docker-compose` בנפרד) הפקודה היא `docker compose up -d` (עם רווח, לא מקף) — והיא מרימה את כולם יחד, בסדר הנכון, על אותה רשת פרטית. זה כמו מנצח של תזמורת שמקריא את התווים לכולם בו-זמנית.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "אצלי (אלעד) ב-compose.yml יש את כל רשת הסוכנים: [Kami](/guide/kami), [Kaylee](/guide/kaylee), [Qdrant](/guide/qdrant), [Delegator](/guide/delegator), [Hermes](/guide/hermes) ועוד. במקום 10 פקודות נפרדות, יש קובץ אחד. שינוי הגדרה בקובץ ואז `docker compose up -d` — ורק מה שבאמת השתנה מתעדכן, כל השאר ממשיך לרוץ בלי הפסקה. זו חוויית פיתוח שמאפשרת לבנות מערכות רציניות בלי כאב ראש תפעולי.",
      content: [
        "services — הלב של הקובץ. כל שירות מוגדר עם האימג' שלו (או הוראה לבנות אחד מ-Dockerfile), הפורטים שייחשפו (`ports`), משתני סביבה (`environment`), תיקיות מחוברות (`volumes`), ומי חייב לעלות לפניו (`depends_on`)",
        "networks (רשתות) — ברירת המחדל יוצרת רשת פרטית משותפת אוטומטית. התוצאה: כל קונטיינר יכול להגיע לאחיו פשוט לפי שם השירות, כאילו זו כתובת אינטרנט חוקית",
        "volumes (אחסון מתמיד) — מוגדרים ברמת ה-compose, משותפים בין שירותים, ושורדים אתחול של הקונטיינר. שם נשמר כל הדאטה שחייבת להישאר",
        "env_file — מצביעים על קובץ `.env` והוא נטען אוטומטית לכל השירותים. אפשר לבצע דריסה לכל שירות בנפרד כשצריך",
        "profiles — מנגנון שמאפשר להריץ רק חלק מהשירותים (לדוגמה: `compose --profile dev up` יריץ רק את שירותי הפיתוח). שימושי לסביבות שונות",
        "healthcheck (בדיקת בריאות) — Docker בודק כל כמה שניות אם הקונטיינר 'חי ומגיב'. אפשר לחבר ל-`depends_on` כך שהשירות הבא יתחיל רק אחרי שקודמו באמת מוכן (ולא רק 'רץ')",
      ],
      tips: [
        "שמרו את `compose.yml` בתוך גיט, אבל השאירו את קובץ ה-`.env` מחוץ לגיט (הוסיפו אותו ל-`.gitignore`) — הוא מכיל סודות",
        "הוסיפו `restart: unless-stopped` לכל שירות. ככה אחרי אתחול של השרת (תקלת חשמל, עדכון מערכת) הכל יחזור לעבוד לבד, בלי התערבות",
        "עדיף רשת אחת משותפת מאשר חמש רשתות נפרדות — פחות בלבול, וזיהוי שמות פנימי פשוט יותר",
      ],
      codeExample: {
        label: "compose.yml מינימלי לרשת סוכנים",
        code: "# Compose v2 — שדה version כבר לא נדרש\nservices:\n  qdrant:\n    image: qdrant/qdrant:latest\n    restart: unless-stopped\n    ports: ['6333:6333']\n    volumes: ['./data/qdrant:/qdrant/storage']\n  kami:\n    build: ./kami\n    restart: unless-stopped\n    depends_on: [qdrant]\n    env_file: .env\n    ports: ['3001:3001']",
      },
    },
    {
      id: "networking",
      icon: Network,
      title: "רשתות ו-DNS פנימי",
      subtitle: "איך containers מדברים אחד עם השני",
      description:
        "רשת Docker (network) זו רשת וירטואלית פרטית שנוצרת אוטומטית בתוך השרת, ומחברת את כל הקונטיינרים שרצים יחד בתוך אותו docker-compose. הקסם הוא שכל שירות זוכה לשם חוקי ברשת הזו — [Kami](/guide/kami) יכול לפנות ל-[Qdrant](/guide/qdrant) פשוט דרך `http://qdrant:6333`, כאילו המילה 'qdrant' היא כתובת שרת אמיתית. הדבר הזה נקרא Service Discovery (זיהוי שירותים), והוא חוסך מאיתנו את כל כאב הראש של להגדיר כתובות IP פנימיות או שרת DNS משלנו.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      beginner:
        "תחשבו על זה ככה: כשמקימים compose, Docker בונה סביב כל השירותים 'חצר פנימית' סגורה. בתוך החצר, כולם מדברים בחופשיות ומכירים אחד את השני לפי שם. החוצה — לאינטרנט הפתוח — לא חשוף שום דבר, אלא אם אתם מבקשים זאת במפורש על ידי פתיחת פורט. זה מקנה לכם ביטחון מובנה: טעות בהגדרה לא חושפת אוטומטית את בסיס הנתונים שלכם לעולם.",
      content: [
        "Bridge network (רשת גשר) — ברירת המחדל של compose. רשת פרטית אחת שמחברת את כל השירותים שמוגדרים באותו קובץ, בלי הגדרה נוספת",
        "Service Discovery — שם השירות שהגדרתם ב-compose הופך אוטומטית לכתובת ברשת. `http://kami:3001` יעבוד מתוך כל קונטיינר אחר ברשת",
        "Ports (פורטים) — ההגדרה `X:Y` אומרת 'תפתח את הפורט Y הפנימי דרך הפורט X החיצוני'. חשוב להבין: רק אם אתם רוצים גישה מבחוץ לשירות — ברוב המקרים שירותי פנים לא צריכים להיחשף כלל",
        "Host mode (`network_mode: host`) — מצב שבו הקונטיינר 'מתנחל' על רשת המארח ישירות. יותר מהיר, אבל אין יותר בידוד. השתמשו בזה רק כשחייבים (ביצועי רשת קיצוניים או כלי ניטור)",
        "External networks (רשתות חיצוניות) — דרך לחבר כמה קבצי compose לאותה רשת משותפת. שימושי כשיש מערך ניטור נפרד או כשרוצים לאפשר לשירותים בקובץ אחד לדבר עם שירותים בקובץ אחר",
      ],
      tips: [
        "אל תחשפו פורטים סתם — חשפו רק את מה שחייב להיגיש מבחוץ. אצלי (אלעד) רק ה-[Delegator](/guide/delegator) שמשמש כ-reverse proxy (שרת קדמי שמקבל את כל התעבורה ומנתב פנימה) ו-nginx חשופים לעולם",
        "לאבחון בעיות רשת — `docker exec -it <name> ping <other-service>` יבדוק אם שירות א' רואה את שירות ב'. זה הצעד הראשון כשמשהו לא מתחבר",
        "Caddy או Traefik כ-reverse proxy חוסכים המון כאב — הם מתחברים ל-Docker labels ומייצרים תעודות HTTPS אוטומטית מ-Let's Encrypt, בלי להתעסק עם nginx ידנית",
      ],
    },
    {
      id: "volumes",
      icon: HardDrive,
      title: "אחסון מתמיד: volumes ו-bind mounts",
      subtitle: "איפה שומרים state שלא ייעלם אחרי restart",
      description:
        "מערכת הקבצים הפנימית של קונטיינר היא זמנית במהותה (ephemeral) — בכל אתחול של הקונטיינר היא נמחקת ונולדת מחדש נקייה לחלוטין. זה בכוונה: קונטיינר נועד להיות 'בר-החלפה' ולא לזכור דברים. אבל מה עם הדאטה שכן חייבת להישמר (בסיסי נתונים, לוגים, קבצי הגדרה)? כאן נכנסים שני מנגנונים: Volume (אחסון מנוהל על ידי Docker) ו-Bind Mount (חיבור ישיר של תיקייה מהשרת הפיזי אל תוך הקונטיינר). שניהם שומרים תוכן שחוצה את גבולות החיים של הקונטיינר עצמו.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "בלי Volume, כל קונטיינר שמתחיל הוא כאילו 'מעולם לא היה' — זכרון ריק, אפס היסטוריה. עם Volume, Docker שומר תוכן של תיקיות מסוימות מחוץ לקונטיינר, על השרת עצמו. ככה [Qdrant](/guide/qdrant) זוכר את כל הזיכרון שצבר [Kami](/guide/kami) גם אחרי שהשרת אותחל, וכל השיחות שעברתי איתו לא נמחקות.",
      content: [
        "Named volume (נפח עם שם) — Docker שומר את התוכן במיקום פנימי משלו (`/var/lib/docker/volumes/`). קל מאוד לגבות ולשחזר, אבל קשה לערוך ידנית בלי Docker",
        "Bind mount (הצמדת תיקייה) — ממפה תיקייה בשרת הפיזי ישירות אל נקודה בתוך הקונטיינר. נוח מאוד לפיתוח (אפשר לערוך קבצים בשני הכיוונים) ומשאיר לכם שליטה מלאה בהרשאות",
        "tmpfs — אחסון זיכרון-בלבד (RAM). נמחק בכל אתחול, אבל מהיר מאוד. שימושי למטמון (cache) זמני של דברים שאין צורך לזכור",
        "אסטרטגיית גיבוי — פקודת קסם: `docker run --rm -v vol:/data -v $(pwd):/b alpine tar czf /b/vol.tar.gz /data`. זה מרים קונטיינר זמני, יוצר ארכיון דחוס של הנפח, ומוחק את עצמו. שורה אחת, גיבוי מלא",
        "הרשאות — חשוב לדעת: בלי התאמת מזהי משתמש (UID), קבצים שהקונטיינר ייצור ב-bind mount יופיעו בשרת עם בעלים root. תכננו את זה מראש כדי לא להיתקע",
        "אצלי (אלעד) כל ה-bind mounts מרוכזים תחת `/opt/ai-factory/data/` — מבנה אחיד שקל לגבות ולהעביר בין שרתים בתרגיל אחד",
      ],
      tips: [
        "השתמשו ב-`:ro` (read-only, קריאה בלבד) בכל פעם שקונטיינר רק צריך לקרוא ולא לכתוב — מגן בפני שגיאות של דריסה בטעות",
        "Qdrant ו-Postgres חייבים named volumes (או bind mount עם הגדרת `fsync` נכונה) — אחרת כתיבות לדיסק יהיו איטיות וזה יפגע בביצועים",
        "סיבוב לוגים — הוסיפו לכל שירות `driver: json-file` יחד עם `max-size: 10m` ו-`max-file: 3`. בלי זה הלוגים יתפחו עד שימלאו את הדיסק (קרה לי פעם, זה לא נעים)",
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
        "הרצה בייצור (production) זו המרחק בין 'זה עובד אצלי במחשב' ל'זה עובד 24/7 באינטרנט עם משתמשים אמיתיים'. בייצור Docker דורשת טיפול בשלושה צירים: אבטחה (לא להריץ כ-root, לשים מגבלות משאבים, לנהל סודות נכון), אמינות (בדיקות בריאות, מדיניות אתחול, ניטור), ופריסה (מערכת CI/CD, יכולת חזרה לגרסה קודמת). כל אחד מהם חיוני — והוויתור על אחד מהם משלם את המחיר ברגע הלא נכון.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      beginner:
        "ההבדל בין פיתוח לייצור: בפיתוח אפשר להריץ קונטיינר בהרשאות על (root), לחשוף כל פורט, ולא להסתכל על לוגים. בייצור כל אחד מהדברים האלה יכול להפיל את השירות או לחשוף דאטה של משתמשים. הטוב הוא שיש צ'קליסט ברור — פעם שעוברים עליו פעם אחת, זה הופך לרפלקס.",
      content: [
        "משתמש לא-root — הוסיפו `USER node` או `USER appuser` ב-Dockerfile. רוב אימג'ים הרשמיים (node, python וכו') כבר מגיעים עם משתמש מוכן. בלי זה, פריצה לקונטיינר = הרשאות על בתוכו",
        "ניהול סודות — השתמשו ב-Docker secrets או ב-Vault. אסור לשים קובץ `.env` בגיט, אפילו לא לשנייה אחת (הוא יישאר בהיסטוריה וסורקים אוטומטיים ימצאו אותו בתוך דקות)",
        "מגבלות משאבים — תחת `deploy.resources.limits` תקבעו `memory` ו-`cpus` לכל שירות. זה מונע מקונטיינר שפועל מחוץ לנורמה (דליפת זיכרון, תקלה) להפיל את כל השרת",
        "Healthcheck (בדיקת בריאות) — מוסיפים פקודה בסגנון `CMD-SHELL curl -f http://localhost:PORT/health || exit 1`. Docker יריץ אותה כל כמה שניות, ואם השירות מפסיק להגיב — יפעיל אותו מחדש לבד",
        "דרייבר לוגים — `json-file` עם `max-size` ו-`max-file` לשרתים קטנים; `syslog` או `gelf` כשיש מערכת ניטור מרכזית שאוספת לוגים ממספר שרתים",
        "עדכונים אוטומטיים — Watchtower עוקב אחרי אימג'ים חדשים ומעדכן אוטומטית (נוח אבל מסוכן). לחלופין Dependabot פותח PR לבדיקה ידנית (איטי יותר, אבל בטוח יותר)",
        "Reverse proxy — שרת קדמי שמקבל את כל התעבורה ומנתב פנימה. Caddy מתקין תעודות HTTPS אוטומטית מ-Let's Encrypt בלי הגדרה; Traefik עושה את זה דרך Docker labels",
        "חומת אש — UFW או iptables חוסמים את כל הפורטים חוץ מ-22 (SSH), 80 (HTTP), ו-443 (HTTPS). ברירת המחדל הנכונה: חסום הכל, פתח רק מה שצריך",
      ],
      tips: [
        "אל תחשפו את ה-Docker socket דרך HTTP בשום מקרה — זו נתינת מפתחות ממלכה. לניהול מרחוק השתמשו ב-Portainer עם אימות והצפנה מלאה (TLS)",
        "סרקו את האימג'ים שלכם עם trivy או grype — אלו כלים שמזהים חולשות ידועות (CVE). באימג'ים ישנים החולשות נפוצות מאוד, במיוחד באלה שלא עודכנו",
        "אל תעלו בשום אופן אימג' ל-registry ציבורי עם מפתחות API מובנים פנימה. יש סורקים אוטומטיים שסורקים את Docker Hub כל הזמן ומחפשים בדיוק את זה — הם ימצאו לפני שתספיקו למצמץ",
      ],
    },
    {
      id: "debugging",
      icon: Terminal,
      title: "ניפוי באגים: הכלים שחוסכים שעות",
      subtitle: "מה לעשות כש-container לא עולה",
      description:
        "רוב הבעיות שתפגשו עם Docker הן לא באגים של Docker עצמה — אלא הגדרה לא נכונה של נפחים (volumes), רשתות (networks) או משתני סביבה. החדשות הטובות: יש רצף בדיקות מסודר שפותר בערך 80% מהמקרים בתוך כמה דקות. אצלי (אלעד) אחרי שנים של עבודה עם Docker, פיתחתי שגרה קבועה שמתחילה תמיד מאותה פקודה ומתקדמת הלאה רק אם צריך.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "`docker compose logs -f <service>` — מציג את הפלט החי של השירות (stdout + stderr). ה-`-f` (follow) אומר 'תמשיך להראות כל שורה חדשה שמגיעה'. זה תמיד הכלי הראשון",
        "`docker inspect <container>` — מחזיר את כל ההגדרות של הקונטיינר ב-JSON: הגדרות רשת, אילו נפחים מחוברים, אילו משתני סביבה יש. מושלם כשיש חשד שההגדרה לא מה שחשבתם",
        "`docker exec -it <container> sh` — פותח טרמינל בתוך הקונטיינר עצמו (אם יש בו shell מותקן). ככה אפשר לבדוק מבפנים אם הקבצים נמצאים במקום ומה מוגדר בפועל",
        "`docker stats` — תצוגה חיה של צריכת CPU, זיכרון ורשת של כל הקונטיינרים במקביל. חיוני לזיהוי מי 'שולט' ומי 'רעב'",
        "`docker events` — זרם של אירועים בזמן אמת: מה עלה, מה נפל, מה אותחל. עוזר מאוד להבין מתי ולמה קונטיינר קרס",
        "dive — כלי חיצוני שמציג את האימג' שכבה-אחר-שכבה (layer-by-layer) ומגלה מה אפשר לחתוך. אימג' של Node יכול לצנוח מ-1GB ל-200MB אם יודעים איפה לחתוך",
        "`docker system df` — מראה כמה מקום על הדיסק תופסים אימג'ים, נפחים ומטמון בנייה. מועיל כשהשרת מתחיל להיות מלא",
      ],
      tips: [
        "אם קונטיינר נופל מיד אחרי שהוא עולה — `docker logs` זה הצעד הראשון, תמיד. ב-99% מהמקרים ההודעה שמסבירה בדיוק את הבעיה תהיה בשורות האחרונות",
        "`docker compose config` מריץ בדיקת תקינות של קובץ ה-YAML ומציג איך הקומפוז באמת ייראה אחרי טעינת משתני הסביבה. מושלם לתפיסה של טעויות תחביר לפני ההרצה",
        "אחרי שבוע של ניסויים — `docker system prune -a --volumes` מנקה הכל מה שלא בשימוש (אימג'ים, נפחים, רשתות זנוחות). זהירות: זה מוחק לצמיתות, אז הריצו רק אחרי שווידאתם שאין גיבוי שצריך",
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
    "כל רשת הסוכנים שלי (10 שירותים, 14 containers, Qdrant עם אלפי וקטורים) רצה ב-docker-compose יחיד על Hetzner CPX11 בכ-4.75€/חודש. המדריך הזה בנוי על הניסיון של הקמה מחדש של הרשת הזו 3 פעמים במהלך שנתיים, כולל migration מ-ARM ל-x86 ושחזור אחרי crash של disk.",
};
