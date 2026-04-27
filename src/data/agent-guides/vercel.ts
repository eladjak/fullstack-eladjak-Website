import {
  Cloud,
  Rocket,
  Zap,
  GitBranch,
  Globe,
  Terminal,
  Github,
  ExternalLink,
  BookOpen,
  Users,
  Mail,
  Activity,
  Layers,
  Shield,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const vercelGuide: AgentGuideData = {
  slug: "vercel",
  agentName: "Vercel",
  agentNameHe: "Vercel — פלטפורמה לדפלוי Next.js בדקה וחצי",
  category: "infra",
  brandIconSlug: "vercel",
  tagline: "git push → אתר חי. CDN גלובלי, SSL אוטומטי, preview deployments. החינמי נדיב.",
  heroDescription:
    "Vercel היא הפלטפורמה החזקה ביותר ב-2026 ל-deploy של אתרי Next.js — לא מקרה, היא נבנתה על ידי האנשים שיוצרים את Next.js עצמו. אבל היא תומכת גם ב-React, Vue, Svelte, Astro, ו-static sites. הקונספט שלה גאוני בפשטות שלו: אתם מחברים את ה-GitHub repo, וכל push ל-main אוטומטית בונה ופורס לדומיין שלכם — תוך 90 שניות. כל PR מקבל preview deployment עם URL ייחודי, כך שאפשר להראות ללקוחות גרסאות לפני merge. CDN גלובלי, SSL חינמי, אנליטיקס מובנה, ואפס שרתים לתחזוקה. אצלי (אלעד) האתר הזה (fullstack-eladjak.co.il) רץ על Vercel מאז 2023, יחד עם 5+ landing pages ופרויקטים נוספים. החינמי נדיב מאוד (100GB bandwidth, builds ללא הגבלה, deploys ללא הגבלה) — מספיק לרוב פרויקטים אישיים ופרילנסרים. השלב הבא (Pro $20/חודש) פותח features מתקדמות (אנליטיקס מורחב, קבוצות, password protection ל-previews). היתרון הגדול: אתם לא מתעסקים ב-VPS, ב-nginx, ב-SSL, או ב-deploy scripts. אתם רק כותבים קוד — Vercel דואג לכל השאר. החיסרון: vendor lock וקשר עם הפלטפורמה. אבל לפרויקטים פרונט-end טהורים, הפשטות שווה את זה.",
  badgeText: "2026 · Next.js Deployment · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/vercel",
  stats: [
    { label: "פרויקטים אצלי", value: "5+" },
    { label: "deploy time", value: "~90s" },
    { label: "bandwidth חינם", value: "100GB" },
    { label: "uptime", value: "99.99%" },
  ],
  paradigmTitle: "Deploy בלי לחשוב על השרת",
  paradigmSub:
    "אין yaml, אין dockerfile, אין SSH. git push זה ה-deploy. הפלטפורמה עושה את השאר.",
  paradigmShifts: [
    {
      before: "VPS + nginx + certbot + pm2 + git pull script",
      after: "git push → live ב-90 שניות",
      icon: Rocket,
    },
    {
      before: "להראות ללקוח = staging server יקר",
      after: "כל PR מקבל preview URL אוטומטי",
      icon: GitBranch,
    },
    {
      before: "בודק אם הוא חי = ssh + curl",
      after: "Vercel Dashboard מציג הכל בזמן אמת",
      icon: Activity,
    },
    {
      before: "Latency גבוה ללקוחות חו\"ל",
      after: "CDN של Vercel ב-100+ אזורים אוטומטית",
      icon: Globe,
    },
  ],
  whoIsThisFor: [
    {
      title: "מפתחי Next.js",
      description:
        "Vercel נבנתה ספציפית ל-Next.js. תמיכה ב-ISR, server actions, edge functions — הכל עובד מהקופסה.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "פרילנסרים שמעבירים אתרים",
      description:
        "כל לקוח מקבל פרויקט נפרד ב-Vercel, חשבון נפרד, חיוב נפרד. ניהול מסודר בלי לחשוב.",
      icon: Users,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "צוותי landing pages",
      description:
        "preview deployments מאפשרים לאיש שיווק/עיצוב לראות שינויים לפני merge. שיתוף פעולה אמיתי.",
      icon: GitBranch,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "מי שלא רוצה DevOps",
      description:
        "אם אתם בונים פרונט בלבד, Vercel חוסך 100% מעבודת התשתית. תהיו free to focus על UX.",
      icon: Cloud,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "deploy", label: "deploy ראשון" },
    { id: "features", label: "פיצ'רים" },
    { id: "edge", label: "Edge Functions" },
    { id: "pricing", label: "מחיר ומגבלות" },
    { id: "alternatives", label: "אלטרנטיבות" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Cloud,
      title: "מה זה Vercel ולמה זה שונה מ-AWS",
      subtitle: "פלטפורמה לפרונט, לא ענן כללי",
      description:
        "Vercel היא PaaS (Platform as a Service) ספציפית לאתרי web frontend ו-serverless functions. בניגוד ל-AWS/GCP/Azure שמציעים אינסוף שירותים גנריים (VMs, databases, ML, וכו'), Vercel מתמקדת בדבר אחד: לפרוס אתרים מודרניים בכמה שניות. החברה נוסדה ב-2015 (בשם 'ZEIT', שונה ל-Vercel ב-2020) על ידי הצוות שיצר את Next.js — ולכן יש לה תמיכה הכי טובה בעולם ל-framework הזה. אבל היא תומכת גם בכל framework פרונט אחר, כולל אתרים סטטיים פשוטים ב-HTML.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על Vercel כמו על Netlify (אבל יותר מהיר ועם יותר פיצ'רים) או GitHub Pages (אבל עם backend ו-server-side rendering). אתם נותנים להם את הקוד — הם נותנים לכם אתר חי עם דומיין, SSL, ו-CDN. אין שרתים, אין SSH, אין /var/log.",
      content: [
        "Build & Deploy אוטומטי — מחברים GitHub/GitLab/Bitbucket repo, ו-Vercel מתחיל לבנות אוטומטית בכל push",
        "Preview deployments — כל branch ו-PR מקבל URL ייחודי. למשל `myapp-feature-x.vercel.app`",
        "Edge Network — האתר מוגש מ-100+ אזורים גלובליים. latency נמוך מכל מקום בעולם",
        "Serverless Functions — `/api/*` בpyrojeקט שלכם הופך אוטומטית ל-AWS Lambda. אין צורך להגדיר",
        "Edge Functions — variant מהיר יותר של Lambda שרץ במקום הקרוב ביותר ללקוח. מצוין למידע אישי",
        "Vercel KV / Postgres / Blob — שירותי DB מנוהלים. נוחים, אבל יקרים יחסית — בדרך כלל עדיף Supabase/Neon",
        "Analytics & Speed Insights — מובנה. רואים page views, Core Web Vitals, ו-real user metrics",
      ],
      tips: [
        "Vercel חינמי לפרויקטים hobby ו-personal. ברגע שאתם מרוויחים מהאתר ('commercial'), טכנית צריך לעבור ל-Pro ($20/חודש)",
        "אם אתם בונים אתר סטטי בלבד (HTML/CSS/JS), Vercel עובד אבל אולי overkill — Cloudflare Pages או Netlify יכולים להיות פשוטים יותר",
      ],
    },
    {
      id: "deploy",
      icon: Rocket,
      title: "Deploy ראשון: 5 דקות",
      subtitle: "מ-git repo לאתר חי",
      description:
        "ההתחלה ב-Vercel היא מהמהירות בעולם. אם יש לכם פרויקט Next.js שעובד מקומית, אתם 5 דקות מ-deploy ראשון.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "1. צרו חשבון ב-vercel.com — אפשר עם GitHub login",
        "2. New Project — Import Git Repository — בחרו את הריפו שלכם",
        "3. Vercel מזהה אוטומטית את ה-framework (Next.js, React, Vue, וכו') ומגדיר build settings",
        "4. סקירה מהירה של ההגדרות — root directory, build command (`next build`), output directory",
        "5. Add Environment Variables — אם יש לכם API keys, הוסיפו אותם פה (לא בקוד!)",
        "6. Deploy — לוקח 60-120 שניות. בסוף, מקבלים URL כמו `myapp.vercel.app`",
        "7. הוספת custom domain — Settings → Domains. מוסיפים את הדומיין, Vercel נותן הוראות DNS",
        "8. אוטומטית — כל push לbranches=main מהיום עושה deploy אוטומטי",
      ],
      tips: [
        "תוסיפו ל-`.gitignore` את `.vercel/` (נוצר ידנית רק אם רצים `vercel CLI` מקומית)",
        "Environment variables אפשר להגדיר ל-3 רמות: Production, Preview, Development. שימושי כדי לתת מפתחות שונים לסביבות שונות",
        "אם הבילד נכשל, פתחו את ה-deploy ב-Vercel Dashboard — הלוגים שם מאוד ברורים, רואים בדיוק את שורת ה-error",
      ],
      codeExample: {
        label: "Vercel CLI לdeploy מהcommand line",
        code: "# התקנה גלובלית\nnpm i -g vercel\n\n# בתוך תיקיית הפרויקט\nvercel login\nvercel link  # מחבר את התיקייה לפרויקט קיים\n\n# Deploy ל-preview (URL ייחודי)\nvercel\n\n# Deploy לproduction\nvercel --prod\n\n# צפייה בlogs בזמן אמת של production\nvercel logs --follow\n\n# rollback לdeployment קודם\nvercel rollback\n\n# רשימת deployments\nvercel ls\n\n# מחיקת deployment ישן\nvercel remove <deployment-url>",
      },
    },
    {
      id: "features",
      icon: Layers,
      title: "פיצ'רים מתקדמים",
      subtitle: "הדברים שהופכים את Vercel למקצועי",
      description:
        "אחרי ה-deploy הראשון, יש שכבה שלמה של פיצ'רים שעושים את העבודה היומית הרבה יותר טובה.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "Preview Deployments — כל PR מקבל URL ייחודי. אפשר לשלוח ללקוח, מנכ\"ל, צוות עיצוב לאישור לפני merge",
        "Branch Protection — יכולת לחבר Vercel deploys כסטטוס check ב-GitHub. לא ממזגים אם ה-build נופל",
        "Rollback מיידי — אם פוסטרתם דביב ל-production, לחיצה אחת בdashboard חוזר לdeploy הקודם. תוך שניות",
        "Environment Variables — מנוהלות ב-Vercel UI. ניתן לעדכן בלי redeploy",
        "Headers & Redirects — מוגדרים ב-`vercel.json` או `next.config.js`. למשל `/old-page → /new-page` 301",
        "Cron Jobs — Vercel תומכים ב-scheduled functions. הגדרה ב-`vercel.json`, רץ פעם ביום/שעה",
        "Image Optimization — `next/image` עובד אוטומטית. תמונות נטענות בפורמט WebP/AVIF, גודל אופטימלי, lazy",
        "Analytics — מציג top pages, top countries, devices, וCore Web Vitals אמיתיים. החינמי כולל מספר מוגבל של events לחודש",
      ],
      tips: [
        "תוסיפו ל-PR template את הקישור ל-preview deployment — למרות שVercel מוסיף קומנט אוטומטי, זה עדיין שווה",
        "Vercel Analytics נחמד אבל חלקי — לדוחות עמוקים יותר, כדאי גם Plausible/Umami לצד",
        "Cron jobs ב-Vercel חינמי = פעם ביום בלבד. ל-cron יותר תכוף, צריך Pro",
      ],
      codeExample: {
        label: "vercel.json עם redirects, headers, ו-cron",
        code: "{\n  \"redirects\": [\n    {\n      \"source\": \"/old-blog/:slug\",\n      \"destination\": \"/blog/:slug\",\n      \"permanent\": true\n    }\n  ],\n  \"headers\": [\n    {\n      \"source\": \"/(.*)\",\n      \"headers\": [\n        { \"key\": \"X-Frame-Options\", \"value\": \"DENY\" },\n        { \"key\": \"X-Content-Type-Options\", \"value\": \"nosniff\" }\n      ]\n    }\n  ],\n  \"crons\": [\n    {\n      \"path\": \"/api/daily-digest\",\n      \"schedule\": \"0 9 * * *\"\n    }\n  ]\n}",
      },
    },
    {
      id: "edge",
      icon: Zap,
      title: "Edge Functions vs Serverless Functions",
      subtitle: "שתי דרכים להריץ קוד בענן של Vercel",
      description:
        "Vercel תומכת בשני סוגי functions. ההבחנה ביניהם חשובה — היא משפיעה על latency, cold starts, ויכולות.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "Serverless Functions (default) — רצות על AWS Lambda. תומכות בכל Node.js APIs, יכולות להתחבר ל-DB, סביבת ריצה מלאה. cold start ~200-500ms",
        "Edge Functions — רצות על Cloudflare Workers (V8 isolates). מאוד מהירות (cold start <50ms), בכל אזור גלובלי. אבל מוגבלות: רק Web APIs, אין FS, גודל קוד עד 1MB",
        "Edge Runtime — לבחור: בקובץ Next.js page/route, `export const runtime = 'edge'`. אז הוא רץ על edge",
        "Middleware — תמיד רץ על edge. מתאים לauthentication, redirects, headers. רץ לפני כל בקשה",
        "מתי edge — בקשות פשוטות, אישיות (geolocation), redirects, A/B tests. כל מה שלא דורש DB ישיר או חישוב כבד",
        "מתי serverless — חיבור ל-DB, library קשה, פעולות שלוקחות יותר מ-30 שניות, או שצריכות יותר ממוצב פיתוח של Web APIs",
        "Streaming — Edge Functions תומכות ב-streaming responses. מצוין לAI streaming (OpenAI/Anthropic).' התשובה מתחילה להגיע מיידית, גם לפני שכלך הסתיימה",
      ],
      tips: [
        "אם האתר שלכם הוא בעיקר תוכן סטטי + מעט API, edge runtime יכול לתת latency שהוא בלתי-נתפס נמוך (10-30ms עולמית)",
        "edge functions מוגבלות בזיכרון (128MB) ובזמן ריצה (30s). אם האפליקציה שלכם זקוקה ליותר — תשארו בserverless",
      ],
      codeExample: {
        label: "Next.js route עם edge runtime לAI streaming",
        code: "// app/api/chat/route.ts\nimport { OpenAIStream, StreamingTextResponse } from 'ai';\nimport OpenAI from 'openai';\n\n// חשוב — מורה ל-Vercel להריץ על Edge\nexport const runtime = 'edge';\n\nconst openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\nexport async function POST(req: Request) {\n  const { messages } = await req.json();\n\n  const response = await openai.chat.completions.create({\n    model: 'gpt-4o',\n    messages,\n    stream: true,\n  });\n\n  // Streaming back to client — character by character\n  const stream = OpenAIStream(response);\n  return new StreamingTextResponse(stream);\n}",
      },
    },
    {
      id: "pricing",
      icon: Activity,
      title: "תמחור: מה החינמי, מתי לעבור ל-Pro",
      subtitle: "הכלכלה של Vercel",
      description:
        "Vercel נדיבים בחינמי, אבל יש מגבלות. חשוב לדעת מה כלול ומה לא — אחרת תופתעו בחיוב.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "Hobby (חינם) — 100GB bandwidth/חודש, 100h serverless function execution, 6,000 build minutes, deploys ללא הגבלה. שימוש לא-מסחרי",
        "Pro ($20/חודש) — 1TB bandwidth, 1,000h functions, 24,000 build minutes, password-protected previews, advanced analytics. רוב הפרילנסרים והעסקים",
        "Enterprise (מותאם) — SLA, ניהול מרובה, audit logs. לחברות גדולות",
        "Bandwidth — אם אתם חורגים, החיוב הוא $0.40/GB. אתר ויראלי יכול להיות יקר",
        "Function execution — נמדד ב-GB-hours (זיכרון × זמן). אם אתם מריצים ML או חישובים כבדים, זה מצטבר מהר",
        "Image optimization — חינם בHobby עד 1,000 source images. מעבר לזה, בחיוב",
        "Edge Middleware — מוגבל ב-1M invocations חינם. מעבר לזה, $0.65 לכל מיליון",
        "Vercel KV / Postgres / Blob — שירותים נפרדים בחיוב. בדרך כלל יותר יקרים מ-Supabase או Neon",
      ],
      tips: [
        "תוודאו שיש Spend Limit ב-account settings. אצלי הוא קבוע ל-$5 — אם משהו פוצץ, אני מפסיד $5 מקסימום, לא $500",
        "Bandwidth = הגדול. אצלי 5+ פרויקטים ב-Hobby עדיין מתחת ל-50% מה-100GB. אבל אתר ויראלי יכול לפוצץ את הכל ביום",
        "אם אתם בעסק, השקיעו ב-Pro - $20/חודש לא יקר ויש לכם יותר ראש שקט (analytics רציני, password protection, billing מסודר)",
      ],
    },
    {
      id: "alternatives",
      icon: Globe,
      title: "אלטרנטיבות: Cloudflare Pages, Netlify, Railway",
      subtitle: "מתי לבחור מה",
      description:
        "Vercel הוא הכי טוב ל-Next.js, אבל לא היחיד. הנה השוואה מהירה.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "Cloudflare Pages — חינמי נדיב (500 builds/חודש, unlimited bandwidth!), workers/D1 בקוסטס. תמיכה בNext.js פחות חלקה מVercel, אבל מצוינת לאתרים סטטיים ול-Workers",
        "Netlify — היריב הוותיק. דומה מאוד לVercel, אולי קצת פחות מהיר. החינמי 100GB bandwidth (כמו Vercel)",
        "Railway — אם אתם רוצים ענן עם backend מלא (Postgres, Redis), Railway זה יותר 'Heroku מודרני'. עולה $5/חודש בסיס",
        "Render — דומה ל-Railway. עוד אלטרנטיבת PaaS לצד full-stack",
        "Fly.io — VMs קטנות באזורים. שולטים יותר, אבל יותר עבודה. טוב לbackends",
        "VPS עצמי + nginx + GitHub Actions — שליטה מלאה, אפס vendor lock, אבל עבודה. טוב אם יש לכם DevOps",
        "השוואה: לNext.js → Vercel. לאתרים סטטיים → Cloudflare Pages. לfull-stack → Railway. לcontrol מלא → VPS",
      ],
      tips: [
        "אצלי השילוב הטוב ביותר: Vercel לאתרי פרונט (זה כולל את האתר הזה), VPS על Hetzner ל-13 הסוכנים שצריכים backend בייצור 24/7",
        "אם אתם בנויים ב-Next.js עם API routes שעושים הרבה — שקלו האם לפרק לאתר נפרד (Vercel) + backend נפרד (Railway/VPS). יותר מורכב, אבל יותר control על עלויות",
      ],
    },
  ],
  resources: [
    {
      title: "Vercel Documentation",
      description: "התיעוד הרשמי — אחד הטובים בתעשייה",
      href: "https://vercel.com/docs",
      icon: BookOpen,
    },
    {
      title: "Next.js on Vercel",
      description: "המדריך הספציפי ל-Next.js",
      href: "https://vercel.com/docs/frameworks/nextjs",
      icon: BookOpen,
    },
    {
      title: "Vercel Templates",
      description: "מאות תבניות מוכנות לdeploy בלחיצה",
      href: "https://vercel.com/templates",
      icon: ExternalLink,
    },
    {
      title: "Cloudflare Pages",
      description: "האלטרנטיבה הכי בולטת — bandwidth ללא הגבלה בחינם",
      href: "https://pages.cloudflare.com/",
      icon: ExternalLink,
    },
    {
      title: "Vercel CLI",
      description: "כלי command line לdeploy וניהול",
      href: "https://vercel.com/docs/cli",
      icon: Github,
    },
    {
      title: "המדריך ל-GitHub Actions",
      description: "איך לחבר deploys ל-CI/CD",
      href: "/guide/github-actions",
      icon: BookOpen,
    },
  ],
  ctaTitle: "צריכים help להעביר אתר ל-Vercel?",
  ctaSub:
    "מהvps עם nginx ל-Vercel = שעה עבודה. אני יכול להעביר את האתר שלכם, להגדיר custom domain, וSSL.",
  primaryCta: {
    label: "Vercel Get Started",
    href: "https://vercel.com/new",
    icon: Rocket,
  },
  secondaryCta: {
    label: "תאמו migration ל-Vercel",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "האתר הזה (fullstack-eladjak.co.il) רץ על Vercel מאז 2023, עם 22+ routes ו-deploy time ממוצע של 90 שניות. בנוסף יש לי 5+ פרויקטים נוספים ב-Vercel — לכולם יחד אני משלם $0 (בתוך מסגרת ה-Hobby). המדריך הזה מבוסס על שלוש שנות שימוש פעיל ומיגרציה של 10+ אתרים מ-VPS.",
};
