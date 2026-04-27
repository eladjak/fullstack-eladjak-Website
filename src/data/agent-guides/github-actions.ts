import {
  Workflow,
  GitBranch,
  Zap,
  Shield,
  Terminal,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Users,
  Mail,
  Activity,
  Package,
  CheckCircle,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const githubActionsGuide: AgentGuideData = {
  slug: "github-actions",
  agentName: "GitHub Actions",
  agentNameHe: "GitHub Actions — CI/CD שמובנה לתוך הריפו",
  category: "infra",
  brandIconSlug: "github",
  brandIconColor: "2088FF",
  heroBgImage: "/images/guides/guide-github-actions-hero.jpg",
  tagline: "כל push מריץ tests, builds ו-deploys — בלי שרת CI נפרד, בחינם לפרויקטים פתוחים",
  heroDescription:
    "GitHub Actions זו מערכת CI/CD (continuous integration / continuous deployment) שמובנית ישירות בתוך GitHub. CI/CD זה השם של אוטומציה שכל פעם שאתם דוחפים קוד, המערכת רצה בדיקות (tests), בונה את האפליקציה (build), ואם הכל תקין — פורסת אותה לייצור (deploy). פעם, להקים pipeline כזה דרש שרת CI נפרד (Jenkins, TeamCity), שעות הגדרה, ותחזוקה מתמשכת. עם GitHub Actions, זה קובץ YAML אחד בתוך הריפו (`.github/workflows/`) ו-GitHub עצמם מריצים את כל הפעולות על שרתים שלהם — בחינם לפרויקטים פתוחים, ועם 2,000 דקות חינמיות לחודש לפרויקטים פרטיים. אצלי (אלעד) GitHub Actions בונה את האתר הזה (Next.js) כל פעם שדוחפים ל-main, פורס אותו אוטומטית ל-Vercel, מריץ TypeScript checks, ובודק שאין secrets שיצאו בטעות לקוד. בנוסף יש לי actions שמתזמנים מטלות יומיות (cron triggers), פותחים PRs אוטומטית כשתלות מתעדכנת (Dependabot), וכל זה בלי שרת אחד שלי. זה הכלי שעושה את ההבדל בין 'אני מפתח לבד' ל-'יש לי תהליך מקצועי'.",
  badgeText: "2026 · CI/CD · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/github-actions",
  stats: [
    { label: "workflows אצלי", value: "12+" },
    { label: "דקות חינם / חודש", value: "2,000" },
    { label: "deploy time אתר", value: "~90s" },
    { label: "עלות לפתוח", value: "0" },
  ],
  paradigmTitle: "CI/CD בלי שרת CI",
  paradigmSub:
    "במקום להקים Jenkins, להגדיר agents, ולתחזק. הקובץ במשנה הוא ההגדרה. שאר העבודה — של GitHub.",
  paradigmShifts: [
    {
      before: "Jenkins server, 2 שרתי build, תחזוקה",
      after: "קובץ YAML אחד, GitHub מריצים",
      icon: Workflow,
    },
    {
      before: "deploy ידני: ssh, git pull, restart",
      after: "git push → 90 שניות → live",
      icon: Rocket,
    },
    {
      before: "תלויות מתיישנות, security alerts מתעלמים",
      after: "Dependabot פותח PR, CI מריץ tests",
      icon: Shield,
    },
    {
      before: "מטלה יומית = cron על שרת אישי",
      after: "schedule trigger ב-Actions — בלי שרת",
      icon: Activity,
    },
  ],
  whoIsThisFor: [
    {
      title: "מפתחים שעובדים לבד",
      description:
        "אתם הכי צריכים אוטומציה — אין מי שיבדוק קוד עליכם. CI שמריץ tests = network שלכם.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "צוותים קטנים שמתחזקים פתוחים",
      description:
        "Open source על GitHub = Actions בחינם, ללא הגבלה. תוך כדי, מקבלים contributors שמרגישים בנוח לפתוח PRs כי יש tests אוטומטיים.",
      icon: Github,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "מי שעוד עושה deploy ידני",
      description:
        "אם אתם עדיין `git pull && pm2 restart`, זה הזמן. אוטומציה = פחות באגים בייצור.",
      icon: Terminal,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "כל מי שיש לו mono-repo",
      description:
        "matrix builds (Node 18 + 20 + 22 במקביל), per-package workflows, deploy רק למה שהשתנה. Actions עושה את כל זה.",
      icon: Package,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "first-workflow", label: "workflow ראשון" },
    { id: "deploy-nextjs", label: "deploy ל-Vercel" },
    { id: "secrets", label: "סודות ו-OIDC" },
    { id: "advanced", label: "מתקדם" },
    { id: "tips", label: "טיפים מהשטח" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Workflow,
      title: "מה זה GitHub Actions: workflow, jobs, steps",
      subtitle: "המבנה ההיררכי שכל קובץ YAML מתאר",
      description:
        "GitHub Actions בנוי משלוש רמות. Workflow = קובץ YAML אחד שמופעל על אירוע (push, PR, schedule, manual). Jobs = יחידות עבודה בתוך workflow שיכולות לרוץ במקביל או ברצף. Steps = פקודות בתוך job. כל job רץ על runner — מכונה וירטואלית חדשה לחלוטין שגיטהאב מספקים, עם Linux/Windows/macOS לבחירה. אחרי שה-workflow מסתיים, ה-runner נמחק — הכל clean slate בכל ריצה.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על workflow כמו על מתכון: 'כשהקמח מתאים' (event), 'תכין בצק' (job 1), 'תוסיף שוקולד' (step), 'תאפה' (job 2). כל הוראה כתובה. כל פעם שתפעילו את המתכון, תקבלו מיד מטבח חדש לחלוטין, ובסוף — תוצאה אחידה. זה בדיוק GitHub Actions.",
      content: [
        "Workflow file — קובץ YAML ב-`.github/workflows/<name>.yml` בריפו שלכם. שם הקובץ = שם ה-workflow",
        "Trigger (`on:`) — מתי להריץ. `push`, `pull_request`, `schedule` (cron), `workflow_dispatch` (manual)",
        "Jobs — כל job רץ על runner נפרד. ברירת מחדל: במקביל. אפשר לציין `needs:` ליצירת תלויות",
        "Steps — בתוך כל job, רשימה ממוספרת של פעולות. כל step יכול להיות `run:` (פקודת shell) או `uses:` (action שכתוב מראש)",
        "Actions — חבילות קוד מובנות מראש. `actions/checkout@v4` (להוריד את הקוד), `actions/setup-node@v4` (להתקין Node), ועוד אלפי actions ב-GitHub Marketplace",
        "Runners — מכונות שמריצות את ה-jobs. ברירת מחדל: GitHub-hosted (חינם עד 2,000 דקות/חודש לprivate). אפשר גם self-hosted על השרת שלכם",
        "Artifacts — קבצים שmove נשמרים בין jobs או נשמרים אחרי ה-workflow. שימושי ל-build outputs",
      ],
      tips: [
        "Actions Marketplace הוא זהב — לפני שאתם כותבים action משלכם, תחפשו. כמעט תמיד מישהו כבר עשה",
        "תוודאו שאתם מקבעים גרסאות של actions: `actions/checkout@v4` ולא `actions/checkout@main`. אחרת ה-workflow שלכם יכול להישבר אם הם משחררים breaking change",
      ],
    },
    {
      id: "first-workflow",
      icon: GitBranch,
      title: "workflow ראשון: TypeScript check על כל PR",
      subtitle: "5 דקות מ-zero לCI אמיתי",
      description:
        "הדרך הכי טובה ללמוד היא לראות workflow פשוט שעושה משהו אמיתי. הדוגמה הזו מריצה `tsc --noEmit` ו-`eslint` על כל push ועל כל PR — כך שאף פעם לא ימזגו לref שלא עובר type-check.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "צרו תיקייה: `mkdir -p .github/workflows`",
        "צרו קובץ: `.github/workflows/ci.yml`",
        "כתבו את ה-YAML (ראו דוגמה למטה)",
        "Commit + push: `git add .github && git commit -m 'add CI' && git push`",
        "Open GitHub → Actions tab — תראו את ה-workflow רץ. סיום סביב דקה",
        "מעכשיו, כל push מפעיל אותו אוטומטית. PRs יראו ✅ או ❌ ליד הסטטוס",
        "אפשר להוסיף branch protection ב-GitHub Settings: 'require status checks to pass before merging' — עכשיו אי אפשר למזג בלי CI ירוק",
      ],
      tips: [
        "תתחילו פשוט — typecheck + lint זה 80% מהערך. tests מאוחר יותר, deploy אחרי שיש tests",
        "אם ה-CI נופל, GitHub שולחים אימייל אוטומטית. אפשר לכבות את זה בהגדרות חשבון GitHub אם זה מציק",
      ],
      codeExample: {
        label: ".github/workflows/ci.yml — typecheck + lint על כל push",
        code: "name: CI\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  typecheck:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n\n      - name: Setup Node\n        uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n          cache: 'npm'\n\n      - name: Install dependencies\n        run: npm ci\n\n      - name: TypeScript check\n        run: npx tsc --noEmit\n\n      - name: Lint\n        run: npx eslint . --max-warnings=0",
      },
    },
    {
      id: "deploy-nextjs",
      icon: Rocket,
      title: "Deploy של Next.js ל-Vercel אוטומטית",
      subtitle: "דחיפה ל-main = פריסה לייצור תוך דקה וחצי",
      description:
        "אחרי ש-CI עובד, השלב הבא הוא deploy אוטומטי. Vercel תומכים ב-GitHub integration שעושה deploy על כל push בלי workflow מיוחד — אבל אם אתם רוצים שליטה מלאה (deploy רק אחרי tests עוברים, ל-environment ספציפי, עם build args מותאמים), workflow YAML נותן את זה.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "אופציה A: Vercel GitHub integration (הקלה) — פשוט מחברים את הריפו לפרויקט ב-Vercel, וזה מתחיל לעבוד אוטומטית. אין צורך ב-workflow כלל",
        "אופציה B: workflow מותאם — שולטים מתי לעשות deploy. ה-workflow למטה מריץ tests קודם, ורק אם הם עוברים — שולח ל-Vercel",
        "Vercel Token — צריך טוקן API מ-Vercel (vercel.com/account/tokens). שמרו אותו ב-GitHub Secrets בשם `VERCEL_TOKEN`",
        "Vercel Org ID + Project ID — מ-`.vercel/project.json` אחרי `vercel link`. שמרו ב-secrets בשמות `VERCEL_ORG_ID` ו-`VERCEL_PROJECT_ID`",
        "Preview vs Production — `vercel deploy` יוצר preview deployment עם URL ייחודי; `vercel deploy --prod` עושה deploy לדומיין הראשי",
        "Comments על PR — אפשר להוסיף `actions/github-script@v7` שיכתוב קומנט ב-PR עם ה-preview URL",
        "Rollback — אם משהו לא טוב, ב-Vercel דשבורד אפשר לעשות rollback בלחיצה אחת ל-deployment קודם",
      ],
      tips: [
        "אצלי על האתר הזה (Next.js): tests + typecheck רצים ב-CI, ואחר כך אוטומטית Vercel עושה deploy. ב-90% מהמקרים, מ-push ל-live פחות מ-2 דקות",
        "Vercel הם הקלים ביותר ל-Next.js, אבל אותו workflow עובד עם Cloudflare Pages, Netlify, ו-Railway — רק עם הקבוקים שלהם",
      ],
      codeExample: {
        label: "deploy ל-Vercel רק אחרי tests עוברים",
        code: "name: Deploy\n\non:\n  push:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: '20', cache: 'npm' }\n      - run: npm ci\n      - run: npx tsc --noEmit\n      - run: npm test --if-present\n\n  deploy:\n    needs: test  # רץ רק אם test הצליח\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: '20' }\n\n      - name: Install Vercel CLI\n        run: npm install --global vercel@latest\n\n      - name: Pull Vercel env\n        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}\n        env:\n          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}\n          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}\n\n      - name: Build\n        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}\n\n      - name: Deploy to Vercel\n        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}",
      },
    },
    {
      id: "secrets",
      icon: Shield,
      title: "סודות ו-OIDC: לא לשים API keys בקוד",
      subtitle: "איך לתת ל-CI גישה ל-cloud בלי לשים שם credentials סטטיים",
      description:
        "כל workflow שעושה deploy צריך גישה לאיזשהו cloud (Vercel, AWS, Cloudflare). הדרך הישנה היא טוקנים סטטיים שנשמרים ב-GitHub Secrets — זה עובד אבל לא אופטימלי (טוקן שדלף = גישה לחשבון). הדרך המודרנית היא OIDC (OpenID Connect): GitHub מנפיקים JWT ייחודי לכל workflow, ואתם מגדירים ב-cloud trust ש'אם ה-JWT הזה הגיע מהrepo X, branch Y, אתה יכול להניח שזה אני'.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      content: [
        "GitHub Secrets — מקום שמור להגדרות רגישות. Settings → Secrets and variables → Actions. גישה רק מתוך workflows, לא נראה בלוגים",
        "Repository secrets — לכל הריפו. Organization secrets — לכל הארגון. Environment secrets — רק ל-deployment ל-environment ספציפי",
        "OIDC for AWS — במקום AWS access key, מגדירים IAM role עם trust policy שמקבל GitHub OIDC JWTs. Workflow יוצר token, AWS מאמתים אותו, נותנים credentials זמניים",
        "OIDC for GCP — דומה. Workload Identity Federation. ב-GCP מגדירים pool שמקבל GitHub provider",
        "OIDC for Cloudflare — Cloudflare תומכים ב-OIDC ל-deployments בעבודה",
        "סודות שמיועדים לפיתוח — `.env.local` שלא ב-git. רק במכונה שלכם",
        "תרשו את ה-actions שאתם משתמשים — Settings → Actions → 'Allow specific actions'. תוסיפו רק את אלה שאתם מכירים. מנע supply chain attacks",
      ],
      tips: [
        "אצלי כל ה-secrets ב-GitHub Secrets, ולעולם לא ב-`.env` שלא בlocal. אם פעם אחת יוצא secret לקוד, הוא בהיסטוריה לנצח. סורקים אוטומטיים יבחינו תוך דקות",
        "GitHub יש לו Secret Scanning שדוחה pushים שכוללים API keys מוכרים (AWS, OpenAI, Anthropic, ועוד). תוודאו שזה מופעל בריפו",
      ],
      codeExample: {
        label: "OIDC ל-AWS — בלי access keys סטטיים",
        code: "name: Deploy to AWS\n\non:\n  push:\n    branches: [main]\n\npermissions:\n  id-token: write   # נדרש ל-OIDC\n  contents: read\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Configure AWS credentials via OIDC\n        uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole\n          aws-region: us-east-1\n          # אין צורך ב-AWS_ACCESS_KEY_ID או SECRET!\n\n      - name: Deploy\n        run: |\n          aws s3 sync ./dist s3://my-bucket --delete\n          aws cloudfront create-invalidation \\\n            --distribution-id ${{ vars.CF_DIST_ID }} \\\n            --paths '/*'",
      },
    },
    {
      id: "advanced",
      icon: Zap,
      title: "מתקדם: matrix, reusable, self-hosted",
      subtitle: "הפיצ'רים שעושים את ההבדל",
      description:
        "אחרי שיש workflow בסיסי שעובד, הנה הפיצ'רים שיעלו אתכם רמה.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "Matrix builds — להריץ את אותו job עם שילובי משתנים שונים. למשל Node 18, 20, 22 + Linux, Windows, macOS = 9 ריצות במקביל. תופס בעיות תאימות מיד",
        "Reusable workflows — workflow שאפשר לקרוא ל-`uses: org/repo/.github/workflows/x.yml@main`. מצוין כשיש 10 ריפוס שעושים אותם דברים",
        "Composite actions — לקבץ כמה steps ל-action יחיד שאפשר לקרוא לו מ-workflows שונים. שמירה על DRY",
        "Cache — `actions/cache@v4` שומר תיקיות בין ריצות. למשל `node_modules` או `target/` של Rust. חוסך דקות בכל workflow",
        "Concurrency — `concurrency: { group: deploy, cancel-in-progress: true }` — אם פוש חדש מגיע, מבטל את הקודם. מונע race conditions ב-deploy",
        "Self-hosted runners — להריץ את ה-jobs על השרת שלכם במקום על GitHub. שימושי לעבודה כבדה, גישה לרשת פנימית, או בקרת עלות",
        "Issue/PR automation — actions שעונות אוטומטית על PRs ('thanks for the contribution!'), מתייגות issues, סוגרות issues ישנים",
      ],
      tips: [
        "matrix exclude — אם יש שילוב שלא רוצים (Windows + Node 18), אפשר ב-`exclude` להוציא אותו",
        "self-hosted runner על שרת VPS = workflow שיכול לדבר עם הסוכנים הפנימיים שלכם, לעשות deploy ל-Docker, וכו'. אבל שימו לב: ה-action runs על השרת שלכם, אז הקפידו ש-CI runs רק מ-PRs מאמינים",
        "ה-actions/cache שלכם יכול לחסוך 40-60% מזמן ה-CI. תמיד תוודאו שהוא נטען לפני npm install",
      ],
    },
    {
      id: "tips",
      icon: CheckCircle,
      title: "טיפים מהשטח",
      subtitle: "מה למדתי בשלוש שנים של GitHub Actions",
      description:
        "אחרי שלוש שנים של שימוש בGitHub Actions, אלה הדברים שאני הייתי רוצה לדעת בהתחלה.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "תמיד תקבעו `timeout-minutes` על job. ברירת מחדל היא 6 שעות — workflow תקוע יכול לאכול את כל הדקות החינמיות שלכם",
        "תמיד תוסיפו `permissions:` ב-workflow level. ברירת מחדל הוא 'read all', אבל לעבודה ספציפית צריך פחות. עקרון least-privilege",
        "השתמשו ב-`workflow_dispatch` להפעלה ידנית עם inputs. שימושי לdeploys לסביבות שונות בלי לדחוף קוד",
        "לוגי GitHub Actions נמחקים אחרי 90 יום. אם משהו חשוב — שמרו artifacts או pushו ל-S3 בסוף",
        "Composite action משלכם נוצר בריפו `org/composite-actions` עם `action.yml` בתיקייה. אחר כך כל הריפוס בארגון יכולים לקרוא לו",
        "תוסיפו `if: failure()` ל-step אחרון שמודיע ל-Slack/Discord. ככה אתם יודעים מיד אם CI נופל",
        "פתחו את GitHub Actions Tab לפעמים ותראו: 'most-run workflows'. תפתיעו את עצמכם בכמה דקות בזבזתם, ויש מה לשפר",
      ],
      tips: [
        "תקראו את ה-billing page של GitHub פעם בחודש — `Settings → Billing → Plans and usage`. אם פתאום אתם משלמים על Actions, סימן שמשהו לא יעיל",
        "Dependabot ו-Renovate הם actions בעצמם. תפעילו את אחד מהם בריפו - הוא יפתח PRs אוטומטית כשיש עדכוני security",
      ],
    },
  ],
  resources: [
    {
      title: "GitHub Actions Documentation",
      description: "התיעוד הרשמי — מקיף ומעודכן",
      href: "https://docs.github.com/en/actions",
      icon: BookOpen,
    },
    {
      title: "GitHub Actions Marketplace",
      description: "אלפי actions מוכנים. תחפשו לפני שאתם כותבים",
      href: "https://github.com/marketplace?type=actions",
      icon: Github,
    },
    {
      title: "act (test locally)",
      description: "כלי שמריץ Actions במחשב שלכם — חוסך זמן בפיתוח workflow",
      href: "https://github.com/nektos/act",
      icon: Github,
    },
    {
      title: "actions/checkout",
      description: "ה-action הראשון בכל workflow — להוריד את הקוד",
      href: "https://github.com/actions/checkout",
      icon: Github,
    },
    {
      title: "Awesome Actions",
      description: "רשימה מאורגנת של actions שווים",
      href: "https://github.com/sdras/awesome-actions",
      icon: Github,
    },
    {
      title: "המדריך ל-Vercel",
      description: "deploy של Next.js — איך זה עובד עם Actions",
      href: "/guide/vercel",
      icon: BookOpen,
    },
  ],
  ctaTitle: "צריכים help להגדיר CI/CD?",
  ctaSub:
    "קמת CI טוב חוסך שעות בשבוע ומונע באגים בייצור. אני יכול להגדיר את כל ה-pipeline שלכם בשעה.",
  primaryCta: {
    label: "GitHub Actions Quickstart",
    href: "https://docs.github.com/en/actions/quickstart",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "תאמו CI/CD setup",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "אצלי 12+ workflows רצים על הריפוס שלי: כל אתר עם CI מלא, deploy אוטומטי ל-Vercel, מטלות יומיות שמתזמנות עצמן, ו-Dependabot שעדכן דברים. הכל בחינם (פתוחים) או בתוך מסגרת ה-2,000 דקות החינמיות. המדריך הזה הוא תמצית של 3 שנות שימוש פעיל בכלי, על משהו ב-100 ריפוס שונים.",
};
