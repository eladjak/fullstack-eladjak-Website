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

---

## המשך פיתוח - הנחיות לסשן הבא

### מה נעשה (סשנים 19+22 מרץ 2026)
- **סשן 19:** דף שירותים חדש (5 שירותים עם מחירים), SEO מלא (JSON-LD, hreflang, geo targeting), נגישות (skip-to-content, reduced-motion, focus-visible), 11 תמונות פרויקטים, RTL logical properties, WhatsApp CTA בהירו, React Doctor 83/100
- **סשן 22:** Hero חדש עם תמונת GitHub אמיתית (ProfileAvatar) + FloatingTechIcons, StatsBar עם מונים מונפשים, תוכן מעודכן מקורות חיים, OG images מ-Gemini, דף /claude-code הועבר מה-Hub, h-screen→h-dvh, תרגומים HE/EN

### מצב נוכחי
- **Build:** עובר נקי (22+ routes)
- **Deploy:** Vercel, דומיין fullstack-eladjak.co.il
- **Stack:** Next.js 14, TypeScript, Tailwind, Framer Motion
- **נגישות:** skip-to-content, reduced-motion, focus-visible, aria-labels
- **SEO:** JSON-LD, OG/Twitter cards, hreflang, geo targeting
- **i18n:** HE+EN מלא בכל הדפים

### מה עדיין צריך לעשות

#### עדיפות גבוהה
1. **עוד פרויקטים ב-Showcase** — הוספת screenshots אמיתיים (agent-browser או Gemini), live preview links, ו-interactive demos לפרויקטים קיימים
2. **בלוג עם תוכן אמיתי** — לאלעד 6 בלוגים ו-83+ פוסטים. לייבא תוכן אמיתי (meharoshelhadaf, צוות תעלומה, ועוד), לא רק mock data
3. **טופס יצירת קשר** — כרגע Resend API (כשיש key) + mailto fallback. לשקול FormSubmit.co או שירות אחר שעובד בלי setup

#### עדיפות בינונית
4. **ביצועים** — Lighthouse audit, Core Web Vitals, bundle size optimization
5. **Mobile responsiveness** — fine-tuning לכל הדפים, בדיקה עם agent-browser
6. **SEO per-page** — meta tags ייחודיים לכל דף (כרגע חלק משתפים את אותו meta)
7. **Scheduling integration** — Calendly/Cal.com עם CTA "Book a Call"
8. **CV download** — כפתור להורדת קורות חיים (PDF)

#### עדיפות נמוכה
9. **Testimonials** — כשיהיו לקוחות אמיתיים, להחליף placeholders
10. **E2E tests** — Playwright לזרימות קריטיות
11. **Blog strategy** — social media integration, homepage visibility

### תזכורות חשובות
- **עיצוב:** Stitch MCP לדפים/סקשנים חדשים, Gemini (nano-banana-poster) לתמונות
- **נתוני קורות חיים:** כבר משולבים - hero, stats, skills, about. מקור: resume של אלעד
- **WhatsApp:** 052-542-7474 (972525427474)
- **Email:** eladhiteclearning@gmail.com
- **React Doctor:** 83/100 — לשמור או לשפר
- **npm ולא bun** — bun לא עובד ב-Windows MSYS


---

## Iteration Protocol (MANDATORY)

This project follows the global iteration protocol:
- Reference: `~/.claude/rules/iteration-protocol.md`
- Update `PROGRESS.md` every 10-15 exchanges
- End every session with verification + HTML review
- Non-negotiable: PROGRESS.md must be updated before session ends
