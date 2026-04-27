import {
  Network,
  Shield,
  Zap,
  GitBranch,
  Layers,
  Terminal,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Users,
  Mail,
  Activity,
  Server,
  Lock,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const nginxGuide: AgentGuideData = {
  slug: "nginx",
  agentName: "Nginx",
  agentNameHe: "Nginx — שרת הקצה שמסדר את כל התעבורה",
  category: "infra",
  brandIconSlug: "nginx",
  tagline: "reverse proxy, SSL termination, ו-load balancing — כל מה שעומד לפני האפליקציה שלכם",
  heroDescription:
    "Nginx (קוראים אותו 'engine-x') הוא שרת web ו-reverse proxy בקוד פתוח שמריץ ב-2026 כשליש מכל אתרי האינטרנט בעולם, וזה לא במקרה. הוא מהיר במיוחד (יודע לטפל ב-10,000 חיבורים מקבילים על שרת קטן), זולל מעט מאוד RAM (50MB טיפוסיים), ויציב לאללה — אצלי (אלעד) אותו תהליך nginx רץ חודשים ברצף בלי שצריך לאתחל אותו אפילו פעם אחת. התפקיד הקלאסי שלו הוא 'reverse proxy' (פרוקסי הפוך): שרת שעומד בקצה ה-VPS שלכם, מקבל את כל הבקשות שמגיעות מהאינטרנט, ומחליט לאיזה שירות פנימי לנתב כל אחת. אצלי על Hetzner VPS nginx מקבל את כל הבקשות שמגיעות ל-`fullstack-eladjak.co.il`, `hub.eladjak.com`, ועוד עשרה תתי-דומיינים — ומנתב כל אחת לקונטיינר הנכון מבין 13 הסוכנים שרצים על הפורטים הפנימיים 3700-3900. בנוסף הוא דואג ל-SSL/HTTPS (התעודות עצמן מ-Let's Encrypt בחינם), דוחס תשובות, ומגיש קבצים סטטיים מהר יותר מכל שרת אפליקציה. אלטרנטיבות פופולריות (Caddy, Traefik) נוחות יותר להגדרה, אבל nginx נשאר הסטנדרט בגלל שהוא בכל מקום ויש לו תיעוד עצום. אם אתם בונים שרת רציני — תכירו אותו.",
  badgeText: "2026 · Reverse Proxy · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/nginx",
  stats: [
    { label: "תת-דומיינים אצלי", value: "10+" },
    { label: "חיבורים מקבילים", value: "10k+" },
    { label: "צריכת RAM", value: "~50MB" },
    { label: "uptime nginx", value: "99.99%" },
  ],
  paradigmTitle: "למה צריך שרת לפני השרת",
  paradigmSub:
    "האפליקציה שלכם לא צריכה לדעת על SSL, על דחיסה, או על rate limiting. nginx עושה את זה לפני שהבקשה מגיעה אליה.",
  paradigmShifts: [
    {
      before: "כל אפליקציה מקשיבה ב-:443 ומטפלת ב-SSL בעצמה",
      after: "nginx מקבל את הכל ומנתב פנימה ב-HTTP פשוט",
      icon: Lock,
    },
    {
      before: "10 שירותים = 10 דומיינים = 10 הגדרות SSL",
      after: "nginx + certbot = תעודה אחת, התחדשות אוטומטית",
      icon: Shield,
    },
    {
      before: "shutdown לעדכון = downtime לכל המשתמשים",
      after: "blue/green דרך nginx upstream — אפס downtime",
      icon: GitBranch,
    },
    {
      before: "בוטים ו-DDoS מציפים את האפליקציה",
      after: "rate limiting ב-nginx — האפליקציה לא רואה אותם בכלל",
      icon: Activity,
    },
  ],
  whoIsThisFor: [
    {
      title: "כל מי שמרים VPS עם יותר משירות אחד",
      description:
        "ברגע שיש לכם API + דשבורד + לנדינג, צריך מישהו שיחלק להם את התעבורה לפי דומיין/נתיב.",
      icon: Server,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "מפתחים שעוברים מ-Vercel/Netlify",
      description:
        "פתאום צריך SSL, דחיסה, redirects. nginx עושה את כל מה שPlatform-as-a-Service עשה בשבילכם.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "צוותים שצריכים rate limiting/security",
      description:
        "להגן על API מבוטים, לחסום מדינות, להגביל בקשות לפי IP. כל זה ב-nginx, בלי לגעת בקוד.",
      icon: Shield,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "מי שרוצה להבין איך האינטרנט עובד",
      description:
        "nginx זה שכבת התשתית של רוב האינטרנט. ללמוד אותו = ללמוד איך תעבורת web באמת זורמת.",
      icon: Network,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "reverse-proxy", label: "reverse proxy" },
    { id: "ssl", label: "SSL/HTTPS" },
    { id: "advanced", label: "מתקדם" },
    { id: "alternatives", label: "אלטרנטיבות" },
    { id: "debugging", label: "ניפוי" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Server,
      title: "מה זה Nginx? התפקיד של 'שרת הקצה'",
      subtitle: "השרת הראשון שכל בקשה פוגשת",
      description:
        "Nginx הוא תוכנה שמתקינים על השרת ושמטרתה אחת: לשבת בפורטים הציבוריים (80 ל-HTTP, 443 ל-HTTPS), לקבל את כל הבקשות מהאינטרנט, ולעשות איתן משהו חכם — להגיש קובץ סטטי, לנתב לאפליקציה פנימית, או לדחות אותן. זה שונה משרת אפליקציה רגיל (Node, Python, Go) שמתעסק בלוגיקה עסקית; nginx בנוי במיוחד לטיפול בכמויות עצומות של חיבורים פתוחים בו-זמנית, בלי להשתמש בתהליך נפרד לכל חיבור (event-driven). זה מה שמאפשר לו לטפל ביותר תעבורה על אותה חומרה.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על זה כמו על פקיד הקבלה במשרד גדול: כל מי שנכנס מהדלת מגיע אליו קודם, והוא זה שמחליט לאיזה חדר להפנות אותו. הוא לא עושה את העבודה עצמה — הוא רק מנתב. בלי הפקיד הזה, כל אורח היה צריך לדעת איפה כל אחד יושב, ויהיה כאוס. nginx זה הפקיד של האינטרנט.",
      content: [
        "Server block — הגדרה של 'אתר' ב-nginx. אומרת: 'כשמישהו פונה לדומיין X, תעשה Y'. אפשר להגדיר עשרות בלוקים על אותו שרת, כל אחד לדומיין שונה",
        "Location block — בתוך server block, אפשר להגדיר התנהגות שונה לפי הנתיב. `/api` מנתב לאפליקציה, `/static` מגיש קבצים, `/` מנתב למשהו אחר",
        "Upstream — קבוצה של שרתי backend שאפשר לפזר ביניהם תעבורה (load balancing). שימושי כשיש כמה instances של אותה אפליקציה",
        "Proxy pass — הפקודה הקסומה: `proxy_pass http://localhost:3001` — שולחת את הבקשה לשירות הפנימי הזה ומחזירה את התשובה למשתמש",
        "Static files — nginx מצוין בלהגיש קבצים מדיסק (HTML, CSS, JS, תמונות). 100x מהר יותר מ-Node או Python",
        "Worker processes — nginx מריץ כמה תהליכים מקבילים, אחד לכל ליבת CPU. ככה הוא מנצל את כל החומרה ביעילות",
      ],
      tips: [
        "ב-Ubuntu/Debian: `apt install nginx` — מתקין כשירות שעולה אוטומטית בכל אתחול",
        "הקבצים ב-`/etc/nginx/`. הקובץ הראשי `nginx.conf`, והאתרים ב-`sites-available/` עם symlink ל-`sites-enabled/`",
        "אחרי כל שינוי בתצורה: `nginx -t` (בדיקת תחביר) ואז `systemctl reload nginx` (טעינה חמה, בלי downtime)",
      ],
      codeExample: {
        label: "server block בסיסי",
        code: "server {\n    listen 80;\n    server_name example.com www.example.com;\n\n    location / {\n        root /var/www/example;\n        index index.html;\n        try_files $uri $uri/ =404;\n    }\n\n    # לוגים נפרדים לאתר הזה\n    access_log /var/log/nginx/example.access.log;\n    error_log /var/log/nginx/example.error.log;\n}",
      },
    },
    {
      id: "reverse-proxy",
      icon: Network,
      title: "Reverse Proxy: לב השימוש המודרני",
      subtitle: "איך מנתבים תעבורה לעשרות שירותים פנימיים",
      description:
        "Reverse proxy זה השם הטכני לתפקיד הקלאסי של nginx ב-2026: לעמוד מול האינטרנט, לקבל את כל הבקשות, ולנתב אותן ל-backend הפנימי המתאים. 'הפוך' (reverse) כי בניגוד ל-proxy רגיל ש'מסתיר' את הלקוח (כמו VPN), reverse proxy מסתיר את השרתים — הלקוח חושב שהוא מדבר עם שרת אחד, אבל בפועל יש מאחוריו עשרות. אצלי (אלעד) nginx מקבל בקשות לעשרות תת-דומיינים שונים ומנתב כל אחת לקונטיינר Docker שונה שרץ על פורט פנימי.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "proxy_pass — הפקודה המרכזית. `proxy_pass http://localhost:3001/` — לוקח את הבקשה ושולח אותה לשירות הפנימי",
        "proxy_set_header — מעביר מידע על הלקוח המקורי לשירות הפנימי (`X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`). חשוב כדי שהאפליקציה תדע מי באמת פנה אליה",
        "WebSocket support — `proxy_http_version 1.1` + `proxy_set_header Upgrade` ו-`Connection`. בלי זה, חיבורי WebSocket יישברו",
        "Buffering — nginx ברירת מחדל אוסף את כל התשובה לפני שהוא שולח. ל-streaming (SSE, video) צריך `proxy_buffering off`",
        "Timeouts — `proxy_read_timeout` חשוב לבקשות ארוכות (LLM, video processing). ברירת המחדל 60 שניות, לעיתים צריך הרבה יותר",
        "Path-based routing — אותו דומיין יכול לנתב לפי נתיב: `/api/v1` → service A, `/api/v2` → service B, `/` → frontend",
      ],
      tips: [
        "תמיד תוסיפו את הסלאש בסוף proxy_pass: `proxy_pass http://x:3001/` (עם /) זה שונה מ-`proxy_pass http://x:3001` (בלי). ההבדל הוא איך הנתיב מועבר. תקראו את התיעוד פעם אחת והדפיסו",
        "לקבצי upload גדולים, הוסיפו `client_max_body_size 100M;` בתוך ה-server block. ברירת המחדל 1M — קטן מדי לרוב המקרים",
        "אצלי כל קובץ הגדרה לשירות יושב ב-`/etc/nginx/sites-available/<service>.conf` — קל לערוך, לראות diff בגיט, ולהפעיל/לכבות בנפרד",
      ],
      codeExample: {
        label: "reverse proxy מלא לסוכן ב-Docker",
        code: "# /etc/nginx/sites-available/hub.eladjak.com.conf\nserver {\n    listen 443 ssl http2;\n    server_name hub.eladjak.com;\n\n    ssl_certificate     /etc/letsencrypt/live/hub.eladjak.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/hub.eladjak.com/privkey.pem;\n\n    client_max_body_size 50M;\n\n    location / {\n        proxy_pass http://127.0.0.1:3710/;\n        proxy_http_version 1.1;\n        proxy_set_header Host              $host;\n        proxy_set_header X-Real-IP         $remote_addr;\n        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n\n        # תמיכה ב-WebSocket\n        proxy_set_header Upgrade    $http_upgrade;\n        proxy_set_header Connection 'upgrade';\n\n        # timeouts לבקשות LLM ארוכות\n        proxy_read_timeout 300s;\n        proxy_send_timeout 300s;\n    }\n}\n\n# redirect מ-HTTP ל-HTTPS\nserver {\n    listen 80;\n    server_name hub.eladjak.com;\n    return 301 https://$host$request_uri;\n}",
      },
    },
    {
      id: "ssl",
      icon: Lock,
      title: "SSL/HTTPS עם Let's Encrypt",
      subtitle: "תעודה חינם, מתחדשת אוטומטית, על כל דומיין",
      description:
        "Let's Encrypt היא רשות תעודות (Certificate Authority) חינמית שמספקת תעודות SSL לכל דומיין שאתם הבעלים שלו. הכלי הסטנדרטי לקבלה והתחדשות שלהן הוא certbot. הזרימה: certbot מבקש תעודה → Let's Encrypt מבקש להוכיח שאתם הבעלים (יוצר קובץ זמני בנתיב מסוים בשרת) → אחרי הוכחה, מקבלים תעודה ל-90 יום שמתחדשת אוטומטית כל 60 יום. כל זה רץ ברקע ואתם לא צריכים לדעת על זה.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "התקנה: `apt install certbot python3-certbot-nginx` (מומלץ — האינטגרציה עם nginx אוטומטית)",
        "הוצאת תעודה ראשונה: `certbot --nginx -d example.com -d www.example.com`. certbot עורך לכם את ה-nginx config אוטומטית",
        "התחדשות אוטומטית — `apt install certbot` כבר מתקין systemd timer שרץ פעמיים ביום. אפשר לבדוק עם `systemctl list-timers | grep certbot`",
        "Wildcard certificate (`*.example.com`) — דורש DNS challenge במקום HTTP. `certbot --manual --preferred-challenges dns -d '*.example.com'`",
        "TLS גרסאות — תכבו 1.0 ו-1.1 (פגיעים). הגדירו `ssl_protocols TLSv1.2 TLSv1.3`",
        "HSTS — header שאומר לדפדפן 'תמיד תשתמש ב-HTTPS לדומיין הזה'. הוסיפו `add_header Strict-Transport-Security 'max-age=31536000; includeSubDomains' always;`",
        "OCSP stapling — מאיץ את handshake ה-SSL. `ssl_stapling on; ssl_stapling_verify on;`",
      ],
      tips: [
        "Mozilla מספקים גנרטור תצורת SSL: ssl-config.mozilla.org — תבחרו את הגרסה של nginx, תקבלו תצורה אופטימלית מאובטחת",
        "אל תשכחו לפתוח פורט 80 ב-firewall גם אחרי שעברתם ל-HTTPS — Let's Encrypt צריך אותו לאימות התחדשות",
        "אם אתם מאחורי Cloudflare — אפשר לבחור 'Full (strict)' ב-Cloudflare ועדיין להשתמש ב-Let's Encrypt על השרת, או להשתמש בתעודת Cloudflare Origin (15 שנה, חינם)",
      ],
      codeExample: {
        label: "התקנה ראשונית של HTTPS על דומיין",
        code: "# 1. וודאו ש-DNS מצביע על השרת\ndig +short example.com\n# צריך להחזיר את ה-IP של ה-VPS\n\n# 2. התקנת certbot עם plugin של nginx\nsudo apt update\nsudo apt install -y certbot python3-certbot-nginx\n\n# 3. הוצאת תעודה (גם עורך את ה-nginx config!)\nsudo certbot --nginx \\\n  -d example.com -d www.example.com \\\n  --email you@example.com \\\n  --agree-tos --no-eff-email\n\n# 4. בדיקה שהתחדשות אוטומטית עובדת\nsudo certbot renew --dry-run\n\n# 5. בדיקת ציון אבטחה\n# https://www.ssllabs.com/ssltest/analyze.html?d=example.com",
      },
    },
    {
      id: "advanced",
      icon: Zap,
      title: "מתקדם: rate limiting, caching, load balancing",
      subtitle: "הפיצ'רים שהופכים את nginx לכלי הגנה ואופטימיזציה",
      description:
        "אחרי שנינו פתרנו את reverse proxy ו-SSL, nginx מציע עוד שכבה של יכולות שיכולות לחסוך הרבה כסף ולהגן על האפליקציה: rate limiting (הגבלת בקשות לפי IP — מונע DDoS וbot abuse), caching (שמירת תשובות בזיכרון — חוסכת קריאות ל-DB), ו-load balancing (פיזור תעבורה בין כמה backends — גם להגדלת תפוקה וגם לאיזון נפילות).",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      content: [
        "Rate limiting — `limit_req_zone` מגדיר 'אזור' (zone) של IPs עם תקרה. למשל '10 בקשות לשנייה לכל IP'. אחר כך `limit_req zone=...` מפעיל אותו על location מסוים",
        "Connection limiting — `limit_conn_zone` מגביל מספר חיבורים פתוחים מאותו IP. שימושי נגד slow-loris attack",
        "Caching — `proxy_cache_path` מגדיר מטמון על דיסק (ב-`/var/cache/nginx/`). אחר כך `proxy_cache zone_name` במיקום ספציפי. תשובה ראשונה איטית, השאר מהירות-מאוד",
        "Load balancing — `upstream` מגדיר קבוצת שרתים. ברירת המחדל round-robin, אפשר `least_conn` (שולח לשרת עם הכי פחות חיבורים) או `ip_hash` (תמיד אותו IP לאותו שרת — sticky sessions)",
        "Gzip / Brotli — דחיסת תשובות. `gzip on; gzip_types text/css application/json application/javascript;` חוסך 70-90% מנפח התעבורה",
        "Geo blocking — חסימת מדינות לפי IP. `geo $country { default ok; include /etc/nginx/blocked-countries.conf; }` ואז `if ($country = blocked) { return 403; }`",
        "Custom error pages — `error_page 500 502 503 504 /50x.html;` — דף יפה במקום הודעת nginx גנרית",
      ],
      tips: [
        "rate limiting מצוין נגד botnets, אבל זהירות: שימו אותו על endpoints כבדים בלבד (login, search) — לא על דף הבית. אחרת תחסמו משתמשים אמיתיים",
        "Cache של API responses זה החלום — אבל וודאו שאתם מטפלים נכון ב-cache invalidation. כלל הברזל: בדיקה אחת אם המידע מתעדכן או לא, אז להחליט",
        "Load balancing יעיל אם יש 2+ instances של אותה אפליקציה. עם instance אחד, nginx פשוט מחזיר ל-backend הזה כל פעם — אין הבדל",
      ],
      codeExample: {
        label: "rate limiting + caching + load balancing",
        code: "# הגדרות גלובליות (http block)\nlimit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;\n\nproxy_cache_path /var/cache/nginx levels=1:2\n  keys_zone=api_cache:10m max_size=1g\n  inactive=60m use_temp_path=off;\n\nupstream api_backends {\n    least_conn;\n    server 127.0.0.1:3001 weight=2;\n    server 127.0.0.1:3002 weight=1;\n    server 127.0.0.1:3003 backup;  # רק אם הראשונים נופלים\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name api.example.com;\n\n    location /search {\n        # rate limit עם burst של 20\n        limit_req zone=api burst=20 nodelay;\n\n        # cache של 5 דקות\n        proxy_cache api_cache;\n        proxy_cache_valid 200 5m;\n        proxy_cache_use_stale error timeout updating;\n        add_header X-Cache-Status $upstream_cache_status;\n\n        proxy_pass http://api_backends;\n    }\n}",
      },
    },
    {
      id: "alternatives",
      icon: GitBranch,
      title: "Caddy, Traefik, ו-מתי לבחור מה",
      subtitle: "nginx הוא הסטנדרט, אבל לא תמיד הבחירה הנכונה",
      description:
        "ב-2026 יש שלוש בחירות מרכזיות ל-reverse proxy על שרת אישי: nginx (הוותיק, הסטנדרט), Caddy (החדש, פשוט בטירוף), ו-Traefik (מובנה ל-Docker). כל אחד מהם יעבוד טוב — השאלה היא מה הסיבוך שאתם מוכנים לשלם תמורת איזה כוח. אצלי (אלעד) השרתים הראשונים שלי היו על nginx, ואז עברתי ל-Caddy ולא חזרתי. אבל nginx עדיין הסטנדרט בתעשייה ואתם תפגשו אותו אצל לקוחות.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "Caddy — הקובץ נקרא Caddyfile, פורמט פשוט מאוד. שורה אחת = SSL מ-Let's Encrypt אוטומטית, בלי certbot, בלי הגדרה. מצוין ל-side projects ולפרויקטים אישיים",
        "Traefik — מתחבר אוטומטית ל-Docker labels. מוסיפים `traefik.http.routers.x.rule=Host('x.com')` לקונטיינר, וטראפיק מנתב אליו אוטומטית. מצוין ל-Docker-only setups",
        "nginx — היכולת הכי גדולה, התיעוד הכי גדול, התמיכה בכל מקום. אבל צריך llearn יותר, התעודות דורשות certbot נפרד",
        "ביצועים — שלושתם דומים בעומס תקין. nginx מנצח קצת בעומס קיצוני, Caddy שני, Traefik שלישי. ברוב המקרים ההבדל לא משמעותי",
        "OpenResty — הרחבה של nginx עם Lua מובנה. מאפשרת לוגיקה מתקדמת ב-config. לאלה שצריכים API gateway רציני",
        "HAProxy — אופציה רביעית, מתמחה ב-load balancing TCP/HTTP. מהיר ויציב במיוחד, אבל פחות נפוץ ל-reverse proxy של HTTP פשוט",
      ],
      tips: [
        "אם אתם מתחילים פרויקט חדש ב-2026 ורוצים פשוט — תתחילו מ-Caddy. אם אתם בונים משהו שיגיע לייצור רציני או לקוחות — תלמדו nginx",
        "אצלי המעבר מ-nginx ל-Caddy חסך 70% מהקוד. במקום 50 שורות nginx config לכל שירות — 3 שורות Caddyfile",
        "Cloudflare Tunnel + Caddy/nginx על השרת זו קומבינציה מנצחת — תקבלו DDoS protection, CDN, ו-SSL מ-Cloudflare, ועדיין שליטה מלאה ב-routing על השרת",
      ],
      codeExample: {
        label: "השוואה: אותו setup ב-Caddy מול nginx",
        code: "# Caddyfile (5 שורות לקונפיג מלא של 2 שירותים)\nhub.eladjak.com {\n    reverse_proxy localhost:3710\n}\napi.eladjak.com {\n    reverse_proxy localhost:3001 localhost:3002\n}\n\n# ====================================\n# nginx (אותו דבר ~30 שורות + certbot setup)\n# server { ... } x 2 כפי שראיתם בסעיף ה-reverse proxy",
      },
    },
    {
      id: "debugging",
      icon: Terminal,
      title: "ניפוי באגים: לוגים, בדיקת תצורה, וכלים",
      subtitle: "כשמשהו לא עובד — מאיפה מתחילים",
      description:
        "רוב הבעיות עם nginx הן הגדרה שגויה (סלאש שכוח, header שלא מועבר, פורט לא נכון), או DNS/firewall/SSL. nginx נותן לכם לוגים מצוינים אם יודעים איפה לחפש, וכמה כלים פשוטים שפותרים 90% מהמקרים תוך דקות.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "`nginx -t` — בודק תקינות תחבירית של כל קבצי ה-config. תמיד להריץ לפני reload. אם זה לא עובר, nginx ימשיך עם התצורה הישנה",
        "`systemctl reload nginx` — טעינה חמה. אפס downtime, רק אם `nginx -t` עבר. אם משהו דפוק — `systemctl status nginx` יראה איפה",
        "`/var/log/nginx/access.log` — כל בקשה שהגיעה: IP, נתיב, תשובה, זמן. `tail -f` בזמן אמת לראות תעבורה",
        "`/var/log/nginx/error.log` — שגיאות. אם משהו לא עובד, פה תמצאו את הסיבה. שגיאות SSL, timeouts, upstream down — הכל פה",
        "`curl -I https://example.com` — בודק את ה-headers שmnginx מחזיר. רואים סטטוס, redirects, שמירה במטמון",
        "`openssl s_client -connect example.com:443 -servername example.com` — בודק את תעודת ה-SSL: מי הוציא אותה, מתי פגה, אילו פרוטוקולים תומכים",
        "ssllabs.com — בודק את האבטחה של ה-SSL שלכם. מטרה: A או A+",
      ],
      tips: [
        "כשמשהו לא עובד, צעד 1 תמיד: `tail -f /var/log/nginx/error.log` ואז תפתחו את הדף בדפדפן. השגיאה תופיע מיד",
        "ב-nginx, הסדר של directives חשוב — `location` יותר ספציפי קודם, פחות ספציפי אחר כך. כשמשהו 'מוזר' קורה, וודאו שה-location הנכון מטופל",
        "תוסיפו לכל server block: `add_header X-Served-By 'nginx-prod' always;`. ככה כשאתם מנסים לפתור בעיה, אתם רואים מיד מאיזה שרת הגיעה התשובה",
      ],
    },
  ],
  resources: [
    {
      title: "Nginx Docs",
      description: "התיעוד הרשמי — מקיף אבל קצת יבש. תקראו את המבוא",
      href: "https://nginx.org/en/docs/",
      icon: BookOpen,
    },
    {
      title: "Mozilla SSL Config Generator",
      description: "תצורת SSL אופטימלית מוכנה להעתקה — לפי גרסת nginx",
      href: "https://ssl-config.mozilla.org/",
      icon: ExternalLink,
    },
    {
      title: "DigitalOcean nginx tutorials",
      description: "המדריכים הכי טובים בעברית-קלה לכל נושא",
      href: "https://www.digitalocean.com/community/tags/nginx",
      icon: BookOpen,
    },
    {
      title: "Caddy",
      description: "אלטרנטיבה פשוטה יותר עם SSL אוטומטי",
      href: "https://caddyserver.com",
      icon: ExternalLink,
    },
    {
      title: "Let's Encrypt",
      description: "תעודות SSL חינם — עם certbot זה 5 דקות עבודה",
      href: "https://letsencrypt.org",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Cloudflare Tunnel",
      description: "אלטרנטיבה ל-nginx + פתיחת פורטים — הכל בלי לחשוף את ה-VPS",
      href: "/guide/cloudflare-tunnel",
      icon: BookOpen,
    },
  ],
  ctaTitle: "צריכים עזרה בהגדרת nginx?",
  ctaSub:
    "קונפיג של nginx זה דבר שמשתלם להשקיע בו פעם אחת ולעבוד איתו שנים. אני יכול להגדיר לכם את הכל בשעה.",
  primaryCta: {
    label: "Nginx Beginners Guide",
    href: "https://nginx.org/en/docs/beginners_guide.html",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "תאמו setup של VPS",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "אצלי על Hetzner VPS nginx מנתב 10+ תת-דומיינים ל-13 קונטיינרים שונים, מטפל ב-SSL מ-Let's Encrypt, וחי שנים ברצף בלי תחזוקה. בעבר עברתי ל-Caddy לחלק מהפרויקטים האישיים, אבל nginx נשאר הסטנדרט שאני ממליץ עליו לכל פרויקט שעובד עם לקוחות. המדריך הזה מבוסס על שנים של setupים והדבקה.",
};
