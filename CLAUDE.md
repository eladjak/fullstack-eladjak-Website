# 💻 פרויקט: אתר מפתח Full-Stack + AI

## התפקיד שלך
אתה מפתח ומעצב אתרי תיק עבודות מרשימים.

## המשימה
לבנות אתר תיק עבודות שמציג את היכולות שלי כמפתח Full-Stack עם התמחות ב-AI.

---

## 🔴 חובה בכל סשן:

### בהתחלה:
1. קרא את `PROGRESS.md` - לראות מה נבנה ומה חסר
2. בדוק את הקוד הקיים
3. הצג: "סטטוס האתר, סקשנים שהושלמו, הצעד הבא?"

### במהלך העבודה:
- תעד כל שינוי קוד
- שמור התקדמות כל 10-15 הודעות
- אם הקונטקסט מתמלא - עדכן PROGRESS.md ודחוס

### בסיום:
- עדכן `PROGRESS.md` עם: קבצים, סקשנים, באגים, TODO

---

## טכנולוגיות:
- Next.js 14+
- TypeScript
- Tailwind CSS
- Framer Motion לאנימציות
- bun

## סקשנים באתר:
- Hero מרשים עם אנימציות
- About Me
- Skills & Technologies
- Projects Portfolio
- AI/Claude Integration demos
- Blog (אופציונלי)
- Contact

## עקרונות:
- עיצוב מודרני ויצירתי
- אינטראקציות מעניינות
- ביצועים מעולים
- קוד נקי (זה גם תיק עבודות!)
- SEO
- Dark/Light mode

---

## UI/Design Tools (MANDATORY - Feb 2026)

### Google Stitch MCP (USE FOR ALL UI WORK)
Before designing ANY UI component, page, or layout:
1. Use Stitch MCP tools: `build_site`, `get_screen_code`, `get_screen_image`
2. Generate designs in stitch.withgoogle.com first, then pull code via MCP
3. Use `/enhance-prompt` skill to optimize prompts for Stitch
4. Use `/design-md` skill to document design decisions
5. Use `/react-components` skill to convert Stitch designs to React

### Available Design Skills
- `/stitch-loop` - Generate multi-page sites from a single prompt
- `/enhance-prompt` - Refine UI ideas into Stitch-optimized prompts
- `/design-md` - Create design documentation from Stitch projects
- `/react-components` - Convert Stitch screens to React components
- `/shadcn-ui` - shadcn/ui component integration guidance
- `/remotion` - Create walkthrough videos from designs
- `/omc-frontend-ui-ux` - Designer-developer UI/UX agent

### Rule: NEVER design UI from scratch with Claude tokens. Always use Stitch MCP or v0.dev first!

## Design & Quality Stack (Feb 2026)

### Mandatory Design Workflow
1. **Stitch MCP** - Design screens BEFORE coding UI
2. **ReactBits** (reactbits.dev) - Animated interactive components
3. **shadcn/ui** - Base UI primitives

### Quality Gates (run before completing ANY UI task)
- React Doctor: `npx -y react-doctor@latest .` (security, perf, correctness, architecture)
- TypeScript: `bunx tsc --noEmit`
- Accessibility: check aria-labels, keyboard nav, focus states

### Animation Rules
- Framer Motion or CSS transforms only
- Max 200ms for feedback animations
- No width/height/top/left animations - use transform/opacity

---

## Agent Tools & MCP (חובה!)

### לפני כתיבת קוד
- **Context7 MCP**: `resolve-library-id` → `query-docs` - לבדוק API/syntax עדכני
- **Octocode MCP**: `githubSearchCode` - לחפש implementations אמיתיים ב-GitHub
- **DeepWiki MCP**: `ask_question` - לשאול על ריפו ספציפי

### לעבודת UI (אם רלוונטי)
- **Stitch MCP**: `build_site` / `get_screen_code` - לעיצוב לפני קוד
- **ReactBits**: reactbits.dev - קומפוננטות אנימטיביות

### בסיום כל איטרציה
1. עדכן PROGRESS.md עם מה שנעשה בפועל
2. הרץ typecheck: `bunx tsc --noEmit`
3. ודא build עובד לפני commit
4. commit עם הודעה: `feat/fix/refactor: תיאור באנגלית`
