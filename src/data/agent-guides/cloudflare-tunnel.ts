import {
  Cloud,
  Shield,
  Network,
  Lock,
  Zap,
  GitBranch,
  Terminal,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Users,
  Mail,
  Globe,
  Server,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const cloudflareTunnelGuide: AgentGuideData = {
  slug: "cloudflare-tunnel",
  agentName: "Cloudflare Tunnel",
  agentNameHe: "Cloudflare Tunnel — לחשוף שירות בלי לפתוח פורט",
  category: "infra",
  brandIconSlug: "cloudflare",
  tagline: "המנהרה ש-VPS שלכם פותח אל Cloudflare — ומקבל דומיין ציבורי בלי שום פורט פתוח",
  heroDescription:
    "Cloudflare Tunnel (היה ידוע בעבר כ-Argo Tunnel, היום פשוט 'Tunnel') הוא שירות חינמי לחלוטין של Cloudflare שפותר את אחת הבעיות הכי גדולות של VPS אישי: איך חושפים שירות לעולם בלי לפתוח פורטים, בלי לדאוג ל-DDoS, ובלי לקנות IP סטטי. האידיאה גאונית בפשטות שלה — במקום שהאינטרנט יתחבר לשרת שלכם, השרת שלכם יוצא ויוצר 'מנהרה' אל Cloudflare. כל הבקשות לדומיין שלכם מגיעות ל-Cloudflare (שיש להם רשת CDN של 300+ datacenters), ו-Cloudflare מעביר אותן דרך המנהרה לשרת. התוצאה: הפורט 443 על השרת שלכם נשאר סגור הרמטית, אבל המשתמשים מקבלים אתר תקין עם HTTPS, CDN, ו-DDoS protection — בחינם. אצלי (אלעד) דומיין `hub.eladjak.com` מצביע ב-DNS על Cloudflare, וטפ-דמון בשם `cloudflared` שרץ על ה-VPS שלי בHetzner מנהל את המנהרה. כל בקשה ל-`hub.eladjak.com` עוברת דרך Cloudflare, נכנסת דרך המנהרה, ומגיעה ל-nginx פנימי על פורט 80 — בלי שאף פורט בכלל פתוח על השרת לעולם החיצוני. זה שינוי פרדיגמה: עברתם מ-'איך לאבטח פורט פתוח' ל-'אין פורט פתוח'.",
  badgeText: "2026 · Zero-Trust Networking · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/cloudflare-tunnel",
  stats: [
    { label: "פורטים פתוחים בשרת", value: "0" },
    { label: "עלות", value: "חינם" },
    { label: "datacenters CF", value: "300+" },
    { label: "התקנה", value: "5 דקות" },
  ],
  paradigmTitle: "מנהרה החוצה במקום דלת פתוחה פנימה",
  paradigmSub:
    "במקום לפתוח פורט ב-firewall ולהתפלל שלא יפרצו, השרת מתקשר בעצמו ל-Cloudflare. אין מה לפרוץ.",
  paradigmShifts: [
    {
      before: "פותחים פורט 443, מתפללים שאין חולשה",
      after: "אפס פורטים פתוחים, אבל יש דומיין ציבורי",
      icon: Lock,
    },
    {
      before: "DDoS = השרת נופל, אתם משלמים על תעבורה",
      after: "Cloudflare סופג את ה-DDoS, השרת לא רואה בכלל",
      icon: Shield,
    },
    {
      before: "IP דינמי / NAT = אין דומיין ציבורי",
      after: "המנהרה יוצאת מהשרת — IP לא משנה",
      icon: Network,
    },
    {
      before: "תעודת SSL = certbot + תחזוקה",
      after: "Cloudflare מטפל ב-HTTPS אוטומטית",
      icon: Cloud,
    },
  ],
  whoIsThisFor: [
    {
      title: "מי שמרים שרת בבית או על Raspberry Pi",
      description:
        "אין IP סטטי, מאחורי NAT של ספק אינטרנט. עם Tunnel, הכל מסתדר בלי לבקש מהספק שום דבר.",
      icon: Server,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "מפתחים שרוצים demo URL מהיר",
      description:
        "להריץ אפליקציה מקומית ולקבל לה דומיין ציבורי תוך דקות. מצוין להראות ללקוחות בלי deploy.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "כל מי שמודאג מ-DDoS",
      description:
        "Cloudflare סופגים מתקפות של עשרות Tbps. ה-VPS הקטן שלכם לא יראה אפילו פינג.",
      icon: Shield,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "צוותים שצריכים zero-trust",
      description:
        "Cloudflare Access מאפשר לדרוש אימות (Google/GitHub/SSO) לפני שמישהו מגיע לשירות פנימי. בלי VPN.",
      icon: Lock,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "setup", label: "התקנה" },
    { id: "config", label: "הגדרה" },
    { id: "access", label: "Access (zero-trust)" },
    { id: "use-cases", label: "use-cases" },
    { id: "vs-alternatives", label: "אלטרנטיבות" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Cloud,
      title: "איך מנהרה הפוכה עובדת",
      subtitle: "מי מתחיל את הקשר — ולמה זה משנה הכל",
      description:
        "הקסם של Cloudflare Tunnel הוא שכיוון הקשר הפוך מהמסורתי. בארכיטקטורה רגילה, האינטרנט מתחבר לשרת — מה שאומר שאתם חייבים פורט פתוח, IP ציבורי, ו-firewall שעוד יותר חזק. במנהרה, השרת שלכם הוא זה שמתחיל את הקשר אל Cloudflare — בדיוק כמו שדפדפן מתחבר לאתר. המשמעות: ה-firewall שלכם רואה רק 'יציאה החוצה' (שזה מה שתמיד מותר), ולא 'כניסה פנימה' (שזה מה שמסוכן). כל הבקשות מתחילות ב-CDN של Cloudflare, ועוברות דרך המנהרה הפתוחה לשרת — אבל אף אחד באינטרנט לא יכול ליצור קשר ישיר עם השרת. הוא בלתי נראה.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על זה ככה: בית עם דלת פתוחה (פורט 443) דורש שומר, חוקים, מנעולים. עם Tunnel, אין דלת בכלל — אבל יש לכם נציג חיצוני (Cloudflare) שיוצא מהבית דרך פתח אוורור, מקבל ממנו אורחים, ומעביר את ההודעות שלהם פנימה דרך תקשורת פנימית. גנבים יכולים לעמוד בחוץ כמה שירצו — אין דלת לפרוץ.",
      content: [
        "cloudflared — הדמון שרץ על השרת שלכם. בינארי קטן (~50MB) שכל מה שהוא עושה זה להחזיק חיבור פתוח ל-Cloudflare ולהעביר תעבורה. נדרש ל-systemd שירות בלבד",
        "מנהרה (tunnel) — הקשר עצמו, מזוהה לפי UUID. אתם יוצרים אותו פעם אחת ואחר כך מצביעים עליו ב-DNS",
        "ingress rules — הגדרה איך כל בקשה שמגיעה מהמנהרה מנותבת. לדוגמה: `hub.eladjak.com` → `http://localhost:3710`",
        "DNS CNAME אוטומטי — Cloudflare יודע ליצור את ה-DNS record של המנהרה אוטומטית. אתם רק רושמים בפקודה אחת ש-`hub.example.com` שייך למנהרה X",
        "אין צורך ב-IP ציבורי — השרת יכול להיות ב-NAT של ספק האינטרנט בבית, או על Raspberry Pi עם דינמי-IP. המנהרה עובדת כל עוד יש חיבור החוצה",
        "תעבורה כפולה: בקשת לקוח מגיעה ל-Cloudflare → דרך המנהרה לשרת → נחזרת לאותו ערוץ. CF טוענים שזה מהיר יותר מ-direct ברוב המקרים בזכות הרשת שלהם",
      ],
      tips: [
        "אצלי באמת אין שום פורט פתוח לעולם חוץ מ-22 (SSH, רק עם key) — וזה כולל את הדומיינים שמשרתים את האתר. הכל דרך Tunnel",
        "Cloudflare זה החינם נדיב להחריד — אין הגבלת bandwidth, אין הגבלת מנהרות, אין הגבלת DNS records. זו אחת מההצעות הכי טובות בענן",
      ],
      codeExample: {
        label: "הגדרה פשוטה: דומיין → שירות מקומי",
        code: "# קובץ ~/.cloudflared/config.yml\ntunnel: 12345678-abcd-...  # ה-UUID של המנהרה\ncredentials-file: /etc/cloudflared/12345678-abcd-...json\n\ningress:\n  - hostname: hub.eladjak.com\n    service: http://localhost:3710\n  - hostname: api.eladjak.com\n    service: http://localhost:3001\n  # rule אחרון תמיד catch-all\n  - service: http_status:404",
      },
    },
    {
      id: "setup",
      icon: Terminal,
      title: "התקנה: מ-0 לדומיין חי תוך 5 דקות",
      subtitle: "צעד-אחר-צעד, על Ubuntu/Debian",
      description:
        "ההתקנה של Cloudflare Tunnel היא מהמהירות בעולם DevOps. אתם צריכים: דומיין שמנוהל ב-Cloudflare (לעבור nameservers זה תהליך 24-שעות, אבל חינם), חשבון Cloudflare (חינמי), ו-VPS עם גישת sudo. הכל נעשה דרך CLI, ואחרי ההפעלה הראשונית — `systemd` מנהל את zip ההפעלה האוטומטית.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "1. התקנת cloudflared — הוסיפו את ה-repo של Cloudflare ל-apt: `curl -L https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null` (ראו תיעוד רשמי לפקודות העדכניות)",
        "2. אימות מול Cloudflare — `cloudflared tunnel login`. זה פותח דפדפן (או נותן URL להעתקה) שבו בוחרים איזה דומיין מאפשרים למנהרה לנהל",
        "3. יצירת מנהרה — `cloudflared tunnel create my-vps`. מקבלים UUID וקובץ credentials שנשמר ב-`~/.cloudflared/`",
        "4. כתיבת config.yml — מגדירים אילו hostnames מנותבים לאילו שירותים פנימיים (ראו דוגמה למעלה)",
        "5. יצירת DNS — `cloudflared tunnel route dns my-vps hub.eladjak.com`. זה יוצר אוטומטית CNAME record שמצביע על המנהרה",
        "6. הפעלה כשירות — `cloudflared service install` יוצר systemd unit שמתחיל אוטומטית בכל boot",
        "7. בדיקה — `systemctl status cloudflared` ו-`journalctl -u cloudflared -f` למעקב",
      ],
      tips: [
        "אם הדומיין שלכם אצל ספק אחר (Namecheap, GoDaddy, isoc.org.il לדומיינים ישראליים), קודם תעבירו את ה-nameservers ל-Cloudflare. הם נותנים לכם 2 NS שאתם מציבים אצל הרשם",
        "דומיינים ישראליים `.co.il` עובדים מצוין עם Cloudflare. נדרש להעביר nameservers דרך isoc.org.il — תהליך 24 שעות אבל חופשי",
        "Cloudflare Zero Trust דורש להפעיל פעם אחת את 'Cloudflare Tunnels' בדשבורד תחת 'Zero Trust'. החינמי שלהם כולל 50 משתמשים",
      ],
      codeExample: {
        label: "התקנה מלאה ב-7 פקודות",
        code: "# 1. התקנת cloudflared (Debian/Ubuntu)\ncurl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb\nsudo dpkg -i cloudflared.deb\n\n# 2. אימות מול Cloudflare\ncloudflared tunnel login\n\n# 3. יצירת מנהרה\ncloudflared tunnel create my-vps\n# יוצר UUID, מציג: 'Created tunnel my-vps with id <UUID>'\n\n# 4. הגדרת config.yml (ראו דוגמה למעלה)\nsudo nano /etc/cloudflared/config.yml\n\n# 5. יצירת DNS record\ncloudflared tunnel route dns my-vps hub.example.com\n\n# 6. הפעלה כשירות systemd\nsudo cloudflared service install\nsudo systemctl enable --now cloudflared\n\n# 7. בדיקה\nsudo systemctl status cloudflared\ncurl -I https://hub.example.com",
      },
    },
    {
      id: "config",
      icon: GitBranch,
      title: "config.yml: ניתוב מתקדם",
      subtitle: "אותו tunnel — מאות שירותים, אם רוצים",
      description:
        "config.yml הוא הקובץ שמגדיר את ההתנהגות של המנהרה. אפשר לנתב לפי hostname (כמו דומיינים ב-nginx), לפי path, או לפי שני התנאים יחד. אצלי (אלעד) המנהרה היחידה משרתת 10+ דומיינים שונים, כל אחד לקונטיינר Docker אחר.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "ingress — מערך של rules. כל rule בודק לפי הסדר; הראשון שמתאים — מבצע. תמיד שמים rule catch-all בסוף עם `service: http_status:404`",
        "hostname — תואם לפי דומיין. תומך ב-wildcards: `*.example.com` יתפוס כל subdomain",
        "path — בנוסף ל-hostname, אפשר לפי regex על נתיב: `path: ^/api/.*`",
        "service — מה לעשות. בדרך כלל `http://localhost:PORT`, אבל יש גם `https://`, `tcp://` (לחיבורי DB), `unix:///path` (Unix sockets), ו-`http_status:CODE`",
        "originRequest — הגדרות תעבורה: `noTLSVerify: true` (אם השירות הפנימי משתמש בתעודה לא תקנית), `httpHostHeader` (להחליף את ה-Host header), `connectTimeout`",
        "tunnel: hello-world — שירות מובנה לבדיקות. `service: hello_world` נותן דף Cloudflare שמראה שהמנהרה עובדת",
        "כפילות — כדי לעדכן config בלי downtime: `systemctl reload cloudflared`. הוא קורא את הקובץ מחדש בלי להפיל חיבורים",
      ],
      tips: [
        "תמיד תוסיפו `path: \"^/(metrics|admin)\"` עם `service: http_status:403` לחסום endpoints רגישים — אפילו אם השירות עצמו לא מגן עליהם",
        "Cloudflare Tunnels תומכות גם ב-non-HTTP — אפשר לחשוף SSH (`tcp://localhost:22`) או DB (`tcp://localhost:5432`) דרך המנהרה. גישה רק עם cloudflared client על המחשב המתחבר",
        "ב-VS Code יש תוסף 'Cloudflare Tunnel' שמראה את המנהרות הפעילות ומאפשר לערוך config מתוך IDE",
      ],
      codeExample: {
        label: "config.yml מלא: 4 דומיינים, אבטחת path, ו-WebSocket",
        code: "tunnel: 12345678-abcd-...\ncredentials-file: /etc/cloudflared/12345678-abcd-...json\n\n# הגדרות ברירת מחדל לכל ה-rules\noriginRequest:\n  connectTimeout: 30s\n  noTLSVerify: false\n\ningress:\n  # 1. דשבורד פנימי — דורש Cloudflare Access\n  - hostname: dashboard.example.com\n    service: http://localhost:3000\n\n  # 2. API ציבורי — אבל חוסם /admin\n  - hostname: api.example.com\n    path: ^/admin/?\n    service: http_status:403\n  - hostname: api.example.com\n    service: http://localhost:3001\n\n  # 3. שירות עם WebSocket\n  - hostname: ws.example.com\n    service: http://localhost:3710\n    originRequest:\n      noHappyEyeballs: true  # מועיל ל-WebSockets\n\n  # 4. wildcard לכל שאר ה-subdomains\n  - hostname: '*.example.com'\n    service: http://localhost:8080\n\n  # catch-all חובה\n  - service: http_status:404",
      },
    },
    {
      id: "access",
      icon: Lock,
      title: "Cloudflare Access: zero-trust בלי VPN",
      subtitle: "לדרוש אימות לפני שבכלל מגיעים לאפליקציה",
      description:
        "Cloudflare Access היא ההרחבה של Tunnel שהופכת אותה ל-zero-trust gateway. במקום שהאפליקציה שלכם תטפל בלוגין, Cloudflare עצמם דורשים מהמשתמש להוכיח את עצמו (דרך Google, GitHub, SSO ארגוני, או one-time-pin לאימייל) — ורק אם עבר, הם מעבירים את הבקשה לשירות שלכם. החינמי כולל 50 משתמשים, מה שעושה את זה מושלם לדשבורדים פרטיים, פאנלים אדמיניסטרטיביים, או כלי dev שאתם רוצים שיהיו זמינים מכל מקום אבל רק לכם.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "Application — בדשבורד Zero Trust, יוצרים 'application' שמייצג את הדומיין/path. למשל `dashboard.example.com`",
        "Policies — חוקים מי מורשה. 'Allow if email ends with @company.com', 'Allow if user is in GitHub org X', 'Require MFA'",
        "Identity providers — Google, GitHub, GitLab, Okta, Azure AD, SAML — כל הגדולים נתמכים בחינם",
        "JWT validation — אחרי שמשתמש עובר אימות, Cloudflare מצרף JWT לבקשה. השירות שלכם יכול לבדוק אותו אם רוצה לדעת מי המשתמש",
        "Service tokens — לאוטומציה (CI/CD, סקריפטים). מקבלים client_id + client_secret במקום אימות אנושי",
        "Browser-based SSH — Cloudflare מאפשרים לחבר ל-SSH דרך הדפדפן, עם אימות SSO. יתרון: אין צריך להחזיק SSH key פיזי",
        "Audit log — Cloudflare מתעד כל login. אצלם בדשבורד אפשר לראות מי נכנס מאיפה ומתי",
      ],
      tips: [
        "אצלי (אלעד) הדשבורד הפנימי של רשת הסוכנים מוגן ב-Access — רק אימייל אחד מורשה (שלי). אם בא לי לתת גישה לעמית — מוסיף אימייל בדשבורד, וזה מסתדר",
        "Access חוסם _לפני_ שהבקשה מגיעה למנהרה. זה שכבת אבטחה נוספת — אם יש חולשה באפליקציה, התוקף בכלל לא מגיע אליה",
        "ל-API endpoints שאתם רוצים להגן בלי דפדפן — השתמשו ב-service tokens. ב-curl: `-H 'CF-Access-Client-Id: ...' -H 'CF-Access-Client-Secret: ...'`",
      ],
    },
    {
      id: "use-cases",
      icon: Globe,
      title: "Use cases מעשיים",
      subtitle: "לא רק לחשיפת אתר ציבורי",
      description:
        "Cloudflare Tunnel עוצמתי בכל פעם שאתם צריכים לחשוף משהו פנימי לעולם. הנה השימושים הכי נפוצים אצלי ואצל לקוחות שלי.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "Home server — לחשוף Plex, Home Assistant, Nextcloud מהבית לאינטרנט. בלי לפתוח פורטים בראוטר, בלי DDNS",
        "VPS עם דומיין — חשיפת אפליקציה ב-VPS בלי IP סטטי או SSL. הדומיין מצביע על Cloudflare שמעביר דרך המנהרה",
        "Local development demo — להראות ללקוח את האפליקציה שרצה אצלכם ב-localhost. `cloudflared tunnel --url http://localhost:3000` נותן URL זמני תוך 10 שניות",
        "Remote MySQL/Postgres — DB פנימי שצריך להיות נגיש לכלי BI חיצוני. במקום VPN — Tunnel + Access + service token",
        "Webhook receiver — מנהרה זמנית כדי לקבל webhooks ממערכת חיצונית בזמן פיתוח. הרבה יותר נוח מ-ngrok החינמי (שיש לו URL שמשתנה כל פעם)",
        "מספר אזורים — אצלי (אלעד) hub.eladjak.com מוגש מ-Cloudflare datacenter בתל אביב למשתמשים בישראל, ומ-פרנקפורט למשתמשים מאירופה. אוטומטית, בחינם",
        "GitHub Actions runner — runner שרץ על השרת שלכם ומקבל jobs מ-GitHub. במקום לפתוח port — מנהרה",
      ],
      tips: [
        "ה-CLI מאפשר מנהרה זמנית בלי הגדרה: `cloudflared tunnel --url http://localhost:3000`. נותן `https://random-words.trycloudflare.com` לכמה שעות. מצוין לבדיקות",
        "אם אתם משתמשים ב-Cloudflare Pages לאתר סטטי + Tunnel ל-API שלכם, אתם מקבלים stack מלא בלי שום cloud provider אחר",
        "מנהרות הן idempotent — אם הקובץ config מתחלף, השדרוג חלק. אפשר לשנות routing בייצור בלי downtime",
      ],
    },
    {
      id: "vs-alternatives",
      icon: Network,
      title: "אלטרנטיבות: ngrok, Tailscale, FRP",
      subtitle: "מתי לבחור מה",
      description:
        "Cloudflare Tunnel הוא לא היחיד בשוק, אבל הוא הכי נדיב חינם והכי קל להגדרה ל-VPS שמשרת web. הנה השוואה לאלטרנטיבות הפופולריות.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "ngrok — אלטרנטיבה הוותיקה. החינמי מוגבל ל-URL שמשתנה ול-1 חיבור. לטובת dev ו-webhooks קצרים מצוין; לייצור — צריך תשלום",
        "Tailscale — VPN mesh. מצוין לחיבור בין מכונות פרטיות (lab, מחשב בית, VPS), אבל לא חושף לעולם הרחב — דורש שלל הצדדים יתחברו ל-tailnet",
        "FRP / WireGuard עצמי — open source, free. דורש שרת cloud עם IP ציבורי שמשמש כ-relay. יותר עבודה אבל אפס תלות בספק",
        "Inlets — אלטרנטיבה ישראלית/אירופית עם מודל פתוח יותר. דורש שרת relay משלך",
        "Cloudflare Tunnel — חינם ללא הגבלה, DDoS protection, CDN, ו-Access לכל דבר. החיסרון היחיד: אתם תלויים ב-Cloudflare (אם יש להם downtime — האתר שלכם למטה). ב-2024-2025 היו 2-3 מקרים כאלה",
        "השוואה מהירה: לdev local → ngrok או cloudflared חינמי. לייצור על VPS → Cloudflare Tunnel. למשרד עם כמה מכונות → Tailscale. להגדרה עצמאית מלאה → WireGuard",
      ],
      tips: [
        "לא חייבים לבחור אחד — אצלי יש Cloudflare Tunnel למה שצריך להיות ציבורי, ו-Tailscale לחיבור בין הלפטופ שלי ל-VPS לעבודה (SSH, debugging)",
        "אל תסתמכו על שירות זר אחד לכל. חינם זה נחמד, אבל גיבוי = יכולת לעבור ל-nginx + פורט פתוח אם Cloudflare נופל",
        "Cloudflare Pro ($20/חודש) פותח פיצ'רים נוספים: WAF rules, image optimization, mobile optimization. שווה אם האתר זה מקור הכנסה",
      ],
    },
  ],
  resources: [
    {
      title: "Cloudflare Tunnel Docs",
      description: "התיעוד הרשמי — מסודר ועם דוגמאות",
      href: "https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/",
      icon: BookOpen,
    },
    {
      title: "Zero Trust Dashboard",
      description: "המקום שבו מנהלים מנהרות, applications, ו-policies",
      href: "https://one.dash.cloudflare.com/",
      icon: ExternalLink,
    },
    {
      title: "cloudflared on GitHub",
      description: "הקוד הפתוח של ה-daemon — שווה לדעת מה רץ אצלכם",
      href: "https://github.com/cloudflare/cloudflared",
      icon: Github,
    },
    {
      title: "Tailscale",
      description: "אלטרנטיבה ל-VPN פנימי — לא ל-public web",
      href: "https://tailscale.com",
      icon: ExternalLink,
    },
    {
      title: "Cloudflare Free Plan",
      description: "ההצעה החינמית מהנדיבות באינטרנט — פירוט יכולות",
      href: "https://www.cloudflare.com/plans/",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-nginx",
      description: "מתי עדיין צריך nginx על השרת (כן, בדרך כלל גם עם Tunnel)",
      href: "/guide/nginx",
      icon: BookOpen,
    },
  ],
  ctaTitle: "רוצים להעביר את השרת לטאנל?",
  ctaSub:
    "אצלי אין שום פורט פתוח חוץ מ-22, וכל הדומיינים עובדים. אני יכול להעביר את השרת שלכם ל-Tunnel תוך 30 דקות.",
  primaryCta: {
    label: "Tunnel Quickstart",
    href: "https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "תאמו זמן ל-VPS migration",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "כל הדומיינים שלי (fullstack-eladjak.co.il, hub.eladjak.com, ועוד) עוברים דרך Cloudflare Tunnel, ושום פורט מלבד SSH לא פתוח על ה-Hetzner. עברתי ל-setup הזה בתחילת 2025 ולא חזרתי. המדריך הזה מבוסס על ההגדרה הפעילה אצלי + עזרה ל-3 לקוחות לעבור גם הם.",
};
