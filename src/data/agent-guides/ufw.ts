import {
  Shield,
  Lock,
  Network,
  Terminal,
  Activity,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Users,
  Mail,
  Server,
  AlertCircle,
  Eye,
  Layers,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const ufwGuide: AgentGuideData = {
  slug: "ufw",
  agentName: "UFW",
  agentNameHe: "UFW — חומת אש פשוטה ל-Ubuntu בפקודה אחת",
  category: "infra",
  brandIconSlug: "",
  heroBgImage: "/images/guides/guide-ufw-hero.jpg",
  tagline: "Uncomplicated Firewall — שלוש פקודות בין שרת חשוף לשרת מוגן",
  heroDescription:
    "UFW (ראשי תיבות של Uncomplicated Firewall — חומת אש לא מסובכת) זה כלי command-line ל-Ubuntu שעוטף את iptables של לינוקס בסינטקס פשוט וברור. iptables עצמו הוא הכלי הסטנדרטי לחומת אש בלינוקס מאז שנות ה-2000 — חזק מאוד, אבל מורכב להחריד (פקודות עם 6 פרמטרים, chains ו-tables וpolicies). UFW לוקח את כל הכוח הזה ומציע ממשק שאפשר ללמוד ב-5 דקות: 'תרשה SSH', 'תחסום הכל אחר', 'תפעיל'. זה בדיוק מה שצריך לרוב הליסעריםם של VPS אישי. אצלי (אלעד) על Hetzner UFW הוא הקו הראשון של ההגנה: הוא חוסם הכל מלבד SSH (22), HTTP (80, ל-Let's Encrypt), ו-HTTPS (443). כל ה-13 הסוכנים שרצים על פורטים פנימיים 3700-3900 לא נגישים מהאינטרנט בכלל — UFW פשוט מתעלם מבקשות אליהם. זה משלים את Cloudflare Tunnel באופן מושלם: אם משהו ב-Tunnel נשבר ויש פתאום פורט פתוח — UFW עדיין חוסם. שתי שכבות הגנה במקום אחת. המדריך הזה יראה לכם את 5 הפקודות שתשתמשו בהן ב-100% מהזמן ואת ההגדרות הנפוצות שכל VPS בייצור צריך.",
  badgeText: "2026 · Linux Firewall · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/ufw",
  stats: [
    { label: "פורטים פתוחים אצלי", value: "3" },
    { label: "פקודות שצריך לדעת", value: "5" },
    { label: "התקנה", value: "מובנית" },
    { label: "עלות", value: "חינם" },
  ],
  paradigmTitle: "ברירת מחדל: חסום הכל",
  paradigmSub:
    "השאלה הנכונה היא לא 'מה אני חוסם' אלא 'מה אני _מתיר_'. UFW הופך את החשיבה הזו לפקודות.",
  paradigmShifts: [
    {
      before: "מאות פקודות iptables עם syntax מסובך",
      after: "`ufw allow 22/tcp` — פקודה ברורה",
      icon: Terminal,
    },
    {
      before: "שרת חשוף — 'מי בכלל יודע עליו?'",
      after: "שרת חסום — אפילו אם יודעים, אין כניסה",
      icon: Lock,
    },
    {
      before: "פתחתי פורט לבדיקה ושכחתי לסגור",
      after: "`ufw status` מראה הכל — אין הפתעות",
      icon: Eye,
    },
    {
      before: "חוקים נמחקים אחרי reboot",
      after: "`ufw enable` שומר אוטומטית, חוזר אחרי boot",
      icon: Shield,
    },
  ],
  whoIsThisFor: [
    {
      title: "כל מי שמרים VPS חדש",
      description:
        "צעד 1 על שרת חדש: SSH, צעד 2: UFW. בלי זה אתם מציעים לאינטרנט להציץ.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "מפתחים שעוברים מ-PaaS לשרת",
      description:
        "ב-Vercel/Heroku אין firewall — הספק מטפל. על VPS, אתם מטפלים. UFW עושה את זה פשוט.",
      icon: Server,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "סטודנטים ל-Linux",
      description:
        "iptables זה כאב ראש. UFW עוטף אותו בסינטקס שילדה בת 10 יכולה להבין.",
      icon: Layers,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "צוותים שצריכים DevSecOps",
      description:
        "חומת אש = חובה ב-compliance. UFW מספק את זה בלי overhead של פתרונות enterprise.",
      icon: Shield,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "essentials", label: "5 הפקודות" },
    { id: "real-world", label: "תרחישים" },
    { id: "advanced", label: "מתקדם" },
    { id: "troubleshooting", label: "ניפוי" },
    { id: "alternatives", label: "אלטרנטיבות" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Shield,
      title: "מה זה firewall ולמה צריך אותו",
      subtitle: "השומר הראשון בכניסה לרשת שלכם",
      description:
        "Firewall (חומת אש) זו תוכנה שיושבת בכניסה לכרטיס הרשת ובודקת כל packet שמגיע — אם הוא תואם לחוק שמתיר את הכניסה, היא מעבירה הלאה; אם לא, היא זורקת אותו לפח. בלי firewall, כל שירות שאזין על השרת שלכם פתוח לעולם — וזה כולל פורטים שאתם בכלל לא ידעתם שפתוחים (כמו דאטאבייס שניסיתם פעם, או שירות פיתוח ששכחתם לסגור). על VPS חדש, סורקי הרשת של האינטרנט ימצאו אתכם תוך דקות, וינסו לפרוץ. UFW הופך את ההגנה הזו לפשוטה: ברירת מחדל 'חסום הכל', אתם מתירים רק מה שצריך.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על UFW כמו על שומר במשרד: יש רשימה של אנשים שמותר להם להיכנס (פורטים שמותרים), וכל מי שלא ברשימה — לא נכנס, אפילו אם הוא מתעקש. בלי שומר, כל אחד יכול להיכנס בלי לעצור — כולל כאלה שמחפשים בעיות.",
      content: [
        "Packet — היחידה הבסיסית של תעבורת רשת. כל בקשה HTTP, כל ping, כל חיבור SSH — מורכב מ-packets",
        "Port — מספר בין 0-65535 שמזהה איזה שירות מאזין. 22 = SSH, 80 = HTTP, 443 = HTTPS, 5432 = Postgres, ועוד אלפים",
        "TCP / UDP — שני סוגי תעבורה. TCP = אמין (HTTP, SSH); UDP = מהיר (DNS, video). UFW מטפל בשניהם",
        "Inbound vs Outbound — תעבורה נכנסת (מהאינטרנט אליכם) ויוצאת (מכם החוצה). UFW ברירת מחדל מתיר outbound, חוסם inbound",
        "Rule — חוק. 'תרשה TCP על port 22 מכל מקום' = רוב ה-VPSים. אפשר להוסיף הגבלות (רק מ-IP מסוים, רק בזמנים מסוימים)",
        "iptables / nftables — המנגנון של הליבה ש-UFW משתמש בו מאחורי הקלעים. iptables ב-Ubuntu 20.04 ומטה, nftables ב-22.04 ומעלה",
      ],
      tips: [
        "UFW כבר מותקן ב-Ubuntu desktop וserver. אבל הוא לא מופעל כברירת מחדל — צריך `ufw enable` ידני",
        "אם אתם משתמשים ב-Docker — שימו לב שLDocker יודע לפתוח פורטים בעקיפת UFW. צריך הגדרה מיוחדת (ראו סעיף advanced)",
      ],
    },
    {
      id: "essentials",
      icon: Terminal,
      title: "5 הפקודות שתשתמשו בהן 100% מהזמן",
      subtitle: "ufw status, allow, deny, delete, enable",
      description:
        "רוב מה שתעשו עם UFW זה חמש פקודות פשוטות. אם תכירו אותן, אתם מסודרים ל-99% מהמקרים.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "`ufw status` — מציג מצב נוכחי + רשימת חוקים. הוסיפו `verbose` כדי לראות גם logging ו-default policies",
        "`ufw allow <port>` — מוסיף חוק שמתיר. `ufw allow 22/tcp` או פשוט `ufw allow ssh` (UFW מכיר שמות שירותים)",
        "`ufw deny <port>` — חוסם פורט מפורש. שימושי כדי לחסום משהו שהיה מותר",
        "`ufw delete <rule_number>` — מוחק חוק. תקבלו מספרים מ-`ufw status numbered`",
        "`ufw enable` / `ufw disable` — מפעיל/מכבה. אזהרה: enable יכול לחתוך לכם SSH אם לא הוספתם חוק לפני!",
        "`ufw reset` — מוחק את כל החוקים ומכבה. שימושי להתחלה נקייה",
        "`ufw default deny incoming` / `ufw default allow outgoing` — קובע ברירות מחדל. תמיד תריצו את שניהם בהתחלה",
      ],
      tips: [
        "תמיד תריצו `ufw allow ssh` לפני `ufw enable` — אחרת תחתכו את עצמכם וייאלצו לדבר עם hosting provider לקונסול חירום",
        "UFW תומך בשמות שירותים: `ufw allow ssh`, `ufw allow http`, `ufw allow https`. הוא יודע מאיזה port זה",
        "`ufw status verbose` הרבה יותר אינפורמטיבי מ-`ufw status` רגיל. תרגלו את עצמכם להריץ את verbose",
      ],
      codeExample: {
        label: "setup ראשוני של VPS חדש",
        code: "# 1. ודאו ש-UFW מותקן (Ubuntu/Debian)\nsudo apt install -y ufw\n\n# 2. ברירות מחדל בריאות\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\n\n# 3. תרשו את הפורטים שצריך\nsudo ufw allow ssh        # 22, חיוני!\nsudo ufw allow http       # 80, ל-Let's Encrypt\nsudo ufw allow https      # 443\n\n# 4. הפעילו את UFW\nsudo ufw enable\n# Y לאישור (אזהרה: זה יכול לנתק SSH אם שכחתם)\n\n# 5. בדיקה\nsudo ufw status verbose\n# Status: active\n# Default: deny (incoming), allow (outgoing)\n# 22/tcp                     ALLOW IN    Anywhere\n# 80/tcp                     ALLOW IN    Anywhere\n# 443/tcp                    ALLOW IN    Anywhere",
      },
    },
    {
      id: "real-world",
      icon: Network,
      title: "תרחישים מהשטח",
      subtitle: "ההגדרות שכל VPS בייצור צריך",
      description:
        "אחרי שלמדתם את הבסיס, בואו נראה מה אתם באמת תעשו. הנה ה-setupים הנפוצים ביותר על שרת ייצור.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "VPS עם web app — `allow ssh + http + https`. זה הסטאק הסטנדרטי, מתאים לרוב המקרים",
        "VPS עם Cloudflare Tunnel — `allow ssh בלבד`. כל השאר עובר דרך המנהרה ואין צורך לפתוח פורטים נוספים",
        "Postgres חיצוני (לא ידוע מה זה אומר) — `ufw allow from 1.2.3.4 to any port 5432`. פותח את הפורט רק ל-IP ספציפי",
        "SSH על פורט לא סטנדרטי — `ufw allow 2222/tcp`. ב-`/etc/ssh/sshd_config` תשנו `Port 2222`. מסנן 99% מהבוטים",
        "rate limiting על SSH — `ufw limit ssh`. UFW אוטומטית חוסם IP שמנסה להתחבר 6 פעמים ב-30 שניות. הגנה מצוינת מ-brute force",
        "אפליקציה פנימית — אל תפתחו את הפורט שלה כלל. תשימו אותה מאחורי nginx על פורט 80/443. אצלי כל 13 הסוכנים על פורטים 3700-3900 לא חשופים בכלל",
        "Webhook receiver עם whitelist — אם יודעים שהשירות שמתקשר אליכם מכתובת מסוימת, `ufw allow from <range> to any port <port>`",
      ],
      tips: [
        "אצלי על Hetzner: `allow ssh limit + allow 80 + allow 443`. שום דבר אחר. כל הסוכנים פנימיים",
        "אם אתם מאחורי VPN של החברה (Tailscale, WireGuard), אפשר להגיד ל-UFW לאפשר רק מה-VPN: `ufw allow in on tailscale0`. אז אפילו SSH פתוח רק דרך הVPN",
        "תוסיפו `ufw allow from 10.0.0.0/8` כדי לאפשר הכל מ-private network. שימושי במולטי-server setups",
      ],
      codeExample: {
        label: "הגדרה מלאה של VPS עם Cloudflare Tunnel",
        code: "#!/bin/bash\n# Setup מלא של firewall ל-VPS עם CF Tunnel\nset -euo pipefail\n\n# רענון UFW\nsudo ufw --force reset\n\n# ברירות מחדל\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\n\n# SSH עם rate limiting (חוסם brute force אוטומטית)\nsudo ufw limit ssh comment 'SSH with rate limiting'\n\n# כיוון שיש לנו Cloudflare Tunnel, אין צורך ב-80/443\n# כל התעבורה הציבורית עוברת דרך cloudflared (outbound)\n\n# אם רוצים גישה מ-Tailscale (VPN פנימי)\nsudo ufw allow in on tailscale0 comment 'Tailscale internal'\n\n# הפעלה\nsudo ufw enable\n\n# בדיקה סופית\nsudo ufw status verbose\n# צפוי לראות:\n# 22/tcp (LIMIT IN)\n# Anywhere on tailscale0 (ALLOW IN)\n# וזה הכל. אפס פורטים אחרים פתוחים לאינטרנט.",
      },
    },
    {
      id: "advanced",
      icon: Layers,
      title: "מתקדם: profiles, IPv6, ו-Docker",
      subtitle: "מה שצריך לדעת כשהבסיס לא מספיק",
      description:
        "אחרי שיש לכם את הבסיס, יש כמה מקרים שדורשים תשומת לב מיוחדת — בעיקר Docker (שמסביב את UFW), IPv6 (שכבר 'דיפולט' ב-2026), ו-application profiles.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      content: [
        "Application profiles — UFW מכיר שמות של אפליקציות פופולריות. `ufw app list` מציג את הזמינים. `ufw allow OpenSSH` במקום `ufw allow 22/tcp`",
        "IPv6 — `/etc/default/ufw` יש שם `IPV6=yes` (ברירת מחדל ב-2026). בדקו תמיד שזה דלוק, אחרת תוקפים יכולים להגיע דרך IPv6 וUFW לא יחסום",
        "Docker עוקף UFW — Docker עורך את iptables ישירות, ו-UFW לא יודע על זה. פורט שאתם 'מסביבים' עם `docker run -p 80:80` יהיה פתוח גם אם UFW אומר 'no'",
        "פתרון 1 ל-Docker — תהיו `127.0.0.1:80:80` במקום `80:80` בקובץ docker-compose. ככה הפורט פתוח רק ל-localhost ו-UFW לא רלוונטי",
        "פתרון 2 ל-Docker — חבילת `ufw-docker` שעוטפת את UFW עם הגדרות מודעות-ל-Docker. מתקינים פעם אחת ושוכחים",
        "Logging — `ufw logging on` רושם packets שנדחו ל-`/var/log/ufw.log`. שימושי כדי לראות מי מנסה לפרוץ. אבל יכול לגדול מהר — מומלץ `medium` או `low`",
        "Conditional rules — `ufw allow from 1.2.3.4 to any port 22 proto tcp` — מאפשר SSH רק מ-IP ספציפי. שימושי לאדמינים מקבועים",
      ],
      tips: [
        "אם אתם משתמשים ב-Docker עם UFW, תעשו 1.5 דקות הוספה של `ufw-docker`. אצלי זה מנע פעם אחת חשיפת DB לעולם",
        "תוסיפו `comment 'מה זה'` לכל חוק. אחרי 6 חודשים, כשתחזרו לראות את ה-rules — תזכרו למה הוספתם כל אחד",
      ],
      codeExample: {
        label: "טיפול ב-Docker שלא יעקוף את UFW",
        code: "# אופציה 1: bind ל-localhost ב-docker-compose\nservices:\n  postgres:\n    image: postgres:16\n    ports:\n      - '127.0.0.1:5432:5432'  # רק localhost — UFW לא רלוונטי\n  api:\n    image: my-api\n    ports:\n      - '127.0.0.1:3000:3000'  # פנימי בלבד, nginx יעשה proxy\n\n# אופציה 2: ufw-docker (התקנה חד-פעמית)\nsudo wget -O /usr/local/bin/ufw-docker \\\n  https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker\nsudo chmod +x /usr/local/bin/ufw-docker\nsudo ufw-docker install\nsudo systemctl restart ufw\n\n# עכשיו אפשר לחסום פורטים ספציפיים של containers\nsudo ufw-docker allow my-container 80/tcp\nsudo ufw-docker delete allow my-container 80/tcp",
      },
    },
    {
      id: "troubleshooting",
      icon: AlertCircle,
      title: "ניפוי באגים: מה לעשות כשמשהו לא עובד",
      subtitle: "השגיאות הנפוצות ופתרונן",
      description:
        "רוב הבעיות עם UFW הן או 'חסמתי משהו שהייתי צריך' או 'נשארתי בחוץ אחרי enable'. הנה האבחון המסודר.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "'איבדתי SSH אחרי enable' — אם יש לכם hosting עם web console (Hetzner, DigitalOcean), פתחו אותו ותריצו `ufw allow ssh` ואז `ufw reload`. אם לא — צריך לפנות לתמיכה",
        "'הוסיפיתי allow ועדיין חסום' — בדקו `ufw status numbered`. אולי יש חוק deny שקודם בסדר. בUFW, חוקים נבדקים לפי סדר",
        "'הפורט פתוח מבחוץ אבל לא מבפנים' — UFW מטפל באינטרפייס נכנס בלבד. אם השירות לא מאזין על 0.0.0.0 (רק על 127.0.0.1), הוא לא יראה תעבורה חיצונית",
        "'לא מוצא את ה-rule שאני רוצה למחוק' — `ufw status numbered` מספר אותם. `ufw delete <number>` מוחק לפי מספר. או `ufw delete allow ssh` למחיקה מפורשת",
        "'IPv6 לא חסום' — `cat /etc/default/ufw | grep IPV6`. אם זה `IPV6=no`, שנו ל-`yes` והריצו `ufw disable && ufw enable`",
        "Logs — `tail -f /var/log/ufw.log` מראה מה נחסם בזמן אמת. שימושי כדי לראות אם בקשה הגיעה ונחסמה",
        "`iptables -L -n -v` — מראה את ה-rules בפורמט iptables הגולמי. שימושי כשאתם חושדים שמשהו עוקף את UFW",
      ],
      tips: [
        "תמיד תוודאו שיש console גישה (web KVM ב-VPS שלכם) לפני שמשנים firewall. זה הרשת הביטחון",
        "לפני שאתם מאשרים שינוי גדול, תריצו `ufw show added` — הוא מציג מה ייכנס תוקף בריענון הבא, בלי להפעיל",
      ],
    },
    {
      id: "alternatives",
      icon: Activity,
      title: "אלטרנטיבות: nftables, firewalld, fail2ban",
      subtitle: "מה עוד יש בסיסטם הLinux",
      description:
        "UFW הוא הבחירה הברורה ל-Ubuntu/Debian, אבל יש כלים אחרים שמתאימים לסיטואציות שונות.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "iptables — הכלי הקלאסי. UFW עוטף אותו. אם אתם רוצים שליטה מלאה (חוקים מורכבים, NAT), iptables ישירות. אבל ה-syntax הוא משהו אחר",
        "nftables — היורש המודרני של iptables. מובנה ב-kernel מ-Ubuntu 22.04 ומעלה. UFW כעת משתמש בו מאחורי הקלעים",
        "firewalld — האלטרנטיבה של Red Hat/CentOS/Fedora. מבוסס zones, יותר מתקדם מ-UFW. אם אתם על RHEL — זה ברירת המחדל",
        "fail2ban — לא חומת אש, אבל משלים אותה. סורק לוגים ומוסיף אוטומטית IPs שמנסים לפרוץ ל-firewall. ההגנה הכי טובה מ-brute force",
        "CrowdSec — ה'דור הבא' של fail2ban. משתף בלעדים גלובלי של IPs מסוכנים. חינמי לקהילה, מצוין לשרתי ייצור",
        "iptables-persistent — אם אתם מעדיפים iptables גולמי, החבילה הזו שומרת חוקים אחרי reboot",
        "השוואה: לדסקטופ ולשרתים פשוטים → UFW. ל-server עם דרישות מורכבות → nftables ישירות. ל-RHEL → firewalld. תמיד בשילוב עם → fail2ban או CrowdSec",
      ],
      tips: [
        "אצלי הקומבינציה: UFW + fail2ban + Cloudflare WAF (חלק מהחינם). שלוש שכבות הגנה בלי תשלום",
        "אל תפעילו שני firewalls יחד (UFW + firewalld למשל). הם יסתבכו ויגרמו לבאגים מוזרים",
      ],
    },
  ],
  resources: [
    {
      title: "Ubuntu UFW Documentation",
      description: "התיעוד הרשמי — קצר וברור",
      href: "https://help.ubuntu.com/community/UFW",
      icon: BookOpen,
    },
    {
      title: "DigitalOcean UFW Tutorial",
      description: "המדריך הכי מומלץ למתחילים",
      href: "https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu",
      icon: BookOpen,
    },
    {
      title: "ufw-docker",
      description: "התוסף שפותר את הבעיה של Docker עוקף UFW",
      href: "https://github.com/chaifeng/ufw-docker",
      icon: Github,
    },
    {
      title: "fail2ban",
      description: "ההשלמה החובה ל-UFW — בלוקים אוטומטיים על brute force",
      href: "https://www.fail2ban.org/",
      icon: ExternalLink,
    },
    {
      title: "CrowdSec",
      description: "הגנה קולקטיבית — שותפי IP גלובלי של תוקפים",
      href: "https://www.crowdsec.net/",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Cloudflare Tunnel",
      description: "אם משתמשים ב-Tunnel, צריך עוד פחות פורטים פתוחים",
      href: "/guide/cloudflare-tunnel",
      icon: BookOpen,
    },
  ],
  ctaTitle: "צריכים hardening לשרת?",
  ctaSub:
    "סקירה של 30 דקות יכולה להציל אתכם מ-disaster. אני יכול לעבור על ה-UFW + ה-SSH + ה-fail2ban אצלכם.",
  primaryCta: {
    label: "UFW Manpage",
    href: "https://manpages.ubuntu.com/manpages/jammy/man8/ufw.8.html",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "תאמו security audit",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "אצלי על Hetzner UFW מאפשר 3 פורטים בלבד (SSH limit, 80, 443) — וזה אחד הדברים שגורם לי לישון בשקט בלילה. בנוסף יש fail2ban שחוסם אוטומטית כל IP שניסה לפרוץ ב-SSH יותר מ-3 פעמים. שילוב פשוט, פתרון של 5 דקות, אפס פריצות מאז 2023.",
};
