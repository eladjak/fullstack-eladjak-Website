# 🚀 Setup Guide - Portfolio Website

## ✅ מה כבר מוכן:

- ✅ Supabase credentials configured
- ✅ GitHub token configured
- ✅ CRON_SECRET generated (secure random string)
- ✅ All code committed and pushed
- ✅ Branch: `claude/explore-website-analysis-011CUpUdo7SQLdNcafdkEA2P`

---

## 🔑 מפתחות שחסרים (אופציונלי):

### 1. OpenAI API Key (לפיצ'רי AI)

**אם אתה רוצה את פיצ'רי ה-AI (Code optimizer, Blog generator):**

1. **הירשם ל-OpenAI:**
   - לך ל: https://platform.openai.com/signup
   - צור חשבון (או התחבר)

2. **צור API Key:**
   - לך ל: https://platform.openai.com/api-keys
   - לחץ "Create new secret key"
   - שמור את המפתח (זה יוצג רק פעם אחת!)

3. **הוסף ל-.env.local:**
   ```bash
   OPENAI_API_KEY=sk-proj-...
   ```

   ⚠️ **חשוב:** השתמש ב-`OPENAI_API_KEY` (ללא NEXT_PUBLIC_) כדי לשמור על המפתח בצד השרת בלבד!

4. **מחירים:**
   - GPT-4: ~$0.03 per 1K tokens
   - GPT-3.5-Turbo: ~$0.002 per 1K tokens
   - Free tier: $5 credit לחשבונות חדשים

**אם לא רוצה AI עכשיו:**
- פשוט השאר ריק
- הפיצ'רים לא יעבדו אבל האתר יעבוד נורמלי

---

### 2. Perspective API Key (לmoderation של comments)

**אם אתה רוצה בדיקת toxicity אוטומטית בcomments:**

1. **הירשם ל-Google Cloud:**
   - לך ל: https://console.cloud.google.com
   - צור project חדש

2. **הפעל Perspective API:**
   - לך ל: https://console.cloud.google.com/apis/library/commentanalyzer.googleapis.com
   - לחץ "Enable"

3. **צור API Key:**
   - לך ל: https://console.cloud.google.com/apis/credentials
   - "Create Credentials" → "API Key"
   - העתק את המפתח

4. **הוסף ל-.env.local:**
   ```bash
   PERSPECTIVE_API_KEY=AIza...
   ```

**אם לא רוצה moderation עכשיו:**
- פשוט השאר ריק
- Comments יעבדו בלי בדיקת toxicity

---

### 3. Resend API Key (למיילים)

**אם אתה רוצה לקבל מיילים מטופס יצירת קשר:**

1. **הירשם ל-Resend:**
   - לך ל: https://resend.com/signup
   - צור חשבון חינמי

2. **צור API Key:**
   - לך ל: https://resend.com/api-keys
   - "Create API Key"
   - שמור את המפתח

3. **אמת את הדומיין שלך (אופציונלי):**
   - לך ל: https://resend.com/domains
   - הוסף `fullstack-eladjak.co.il`
   - עדכן DNS records (TXT, CNAME)

4. **הוסף ל-.env.local:**
   ```bash
   RESEND_API_KEY=re_...
   ```

**Free tier:**
- 100 מיילים ליום
- 3,000 מיילים לחודש
- מספיק לפורטפוליו!

**אם לא רוצה מיילים עכשיו:**
- פשוט השאר ריק
- טופס יצירת קשר לא יעבוד (אבל אפשר להוסיף אחר כך)

---

## 🌐 Deploy ל-Vercel:

### שיטה 1: דרך UI (הכי פשוט)

1. **התחבר ל-Vercel:**
   - לך ל: https://vercel.com
   - התחבר עם GitHub

2. **Import Project:**
   - לחץ "Add New..." → "Project"
   - בחר את `fullstack-eladjak-Website`
   - Configure Project:
     - Framework Preset: **Next.js**
     - Root Directory: `./`
     - Build Command: `pnpm build`
     - Output Directory: `.next`

3. **הוסף Environment Variables:**
   ```
   לחץ "Environment Variables" ולהוסף:

   NEXT_PUBLIC_SUPABASE_URL=https://jwfjvuvkiderhzitixng.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   GITHUB_TOKEN=github_pat_...
   GITHUB_USERNAME=eladjak
   CRON_SECRET=tgHv19KT8tFB0V9w8NnvzFmmUP1HUJHuR+5qBoF15MU=
   CONTACT_EMAIL=elad@hiteclearning.co.il
   NEXT_PUBLIC_SITE_URL=https://fullstack-eladjak.co.il
   NEXT_PUBLIC_SITE_NAME=Elad Ya'akobovitch - Full-Stack Developer

   (רק אם יש לך):
   NEXT_PUBLIC_OPENAI_API_KEY=sk-...
   PERSPECTIVE_API_KEY=AIza...
   RESEND_API_KEY=re_...
   ```

4. **Deploy:**
   - לחץ "Deploy"
   - המתן ~3-5 דקות
   - הצלחה! 🎉

5. **הגדר Custom Domain:**
   - Project Settings → Domains
   - הוסף: `fullstack-eladjak.co.il`
   - עדכן DNS:
     ```
     Type: CNAME
     Name: @
     Value: cname.vercel-dns.com
     ```

---

### שיטה 2: דרך CLI (למתקדמים)

```bash
# התקן Vercel CLI
npm i -g vercel

# התחבר
vercel login

# Deploy
vercel --prod

# הגדר environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... (כל השאר)
```

---

## 🧪 בדיקה לאחר Deploy:

### 1. בדוק שהאתר עובד:
```
https://your-project.vercel.app
```

### 2. בדוק GitHub Sync:
```bash
curl -X POST \
  -H "Authorization: Bearer tgHv19KT8tFB0V9w8NnvzFmmUP1HUJHuR+5qBoF15MU=" \
  https://your-project.vercel.app/api/cron/sync-github
```

אמור לחזור:
```json
{
  "success": true,
  "message": "Successfully synced 13 repositories",
  "count": 13,
  "timestamp": "..."
}
```

### 3. בדוק שהפרויקטים מופיעים:
```
https://your-project.vercel.app/projects
```

---

## 🐛 Troubleshooting:

### אם הבניה נכשלת:

**בעיה: TypeScript errors**
```bash
# בדוק locally
pnpm typecheck

# אם יש שגיאות, תקן אותן
```

**בעיה: ESLint errors**
```bash
# בדוק locally
pnpm lint

# תקן אוטומטית
pnpm lint:fix
```

**בעיה: Missing dependencies**
```bash
# ודא שכל הdependencies מותקנים
pnpm install
```

### אם Cron Job לא עובד:

1. בדוק ב-Vercel Dashboard:
   - Project → Settings → Cron Jobs
   - ודא שרואים: `/api/cron/sync-github`

2. בדוק logs:
   - Project → Deployments → (בחר deployment) → Functions
   - חפש שגיאות

3. בדוק Authorization:
   - ודא ש-CRON_SECRET זהה בכל מקום
   - בדוק ש-GITHUB_TOKEN תקף

---

## 📊 Monitoring:

### Vercel Analytics (מובנה):
- Project → Analytics
- רואים: Page views, Performance, Web Vitals

### Supabase Dashboard:
- https://app.supabase.com/project/jwfjvuvkiderhzitixng
- רואים: Database queries, Auth users, Storage

### GitHub Actions (אופציונלי):
- אפשר להוסיף workflow ל-CI/CD
- אוטומטי runs tests לפני deploy

---

## 🎯 הצעדים הבאים:

1. **Deploy ל-Vercel** (בצע עכשיו!)
2. **בדוק שהכל עובד**
3. **הוסף תוכן:**
   - כתוב 2-3 blog posts
   - הוסף screenshots לפרויקטים
   - צור דף Services מפורט
4. **הוסף API keys** (כשתהיה מוכן):
   - OpenAI (לAI features)
   - Resend (למיילים)
   - Perspective (לmoderation)
5. **Phase 1: Testing** (אחרי deploy)

---

## 💡 Tips:

- **Preview Deployments:** כל push ליוצר preview URL
- **Rollback:** אפשר לחזור לגרסאות קודמות בקליק
- **Environment Variables:** אפשר environment שונה לProduction/Preview
- **Analytics:** Vercel Analytics חינמי ומובנה
- **Custom Domain:** זה פשוט, פשוט עקוב אחרי ההוראות

---

**מוכן? יאללה deploy! 🚀**

אם יש בעיות, אני כאן לעזור!
