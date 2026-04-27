import type { Metadata } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';

export const metadata: Metadata = {
  title: 'הצהרת נגישות | אלעד יעקובוביץ\'',
  description:
    'הצהרת נגישות אתר fullstack-eladjak.co.il לפי תקן ישראלי IS 5568 ו-WCAG 2.1 רמה AA.',
  alternates: {
    canonical: `${SITE_URL}/accessibility`,
    languages: { 'he-IL': `${SITE_URL}/accessibility` },
  },
};

export default function AccessibilityPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <article className="prose prose-invert prose-headings:font-heebo prose-headings:font-bold max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">הצהרת נגישות</h1>
        <p className="text-muted-foreground mb-8">
          עודכן: 27 באפריל 2026
        </p>

        <h2>מחויבותנו לנגישות</h2>
        <p>
          אתר fullstack-eladjak.co.il (להלן: &quot;האתר&quot;) פועל לעמוד בדרישות תקנות
          שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג-2013,
          ובתקן הישראלי <strong>ת&quot;י 5568</strong> ברמה AA, וכן בקווי המנחה
          הבינלאומיים <strong>WCAG 2.1 רמה AA</strong>.
        </p>

        <h2>התאמות נגישות באתר</h2>
        <ul>
          <li>תאימות מלאה לקוראי מסך (NVDA, JAWS, VoiceOver)</li>
          <li>ניווט מלא במקלדת (Tab, Shift+Tab, Enter, Esc)</li>
          <li>קישור &quot;דלג לתוכן הראשי&quot; בראש כל עמוד</li>
          <li>ניגודיות צבעים בסיסית של 4.5:1 לטקסט רגיל ו-3:1 לטקסט גדול</li>
          <li>טקסט חלופי (alt) לכל התמונות המידעיות</li>
          <li>מבנה כותרות סמנטי תקני (h1, h2, h3)</li>
          <li>RTL מלא לכל התוכן בעברית, LTR לתוכן באנגלית</li>
          <li>תמיכה בהקטנה והגדלה של טקסט עד 200% ללא אובדן תוכן</li>
          <li>כיבוד הגדרת המערכת <code>prefers-reduced-motion</code> — אנימציות
            יבוטלו אם המשתמש מבקש זאת</li>
          <li>תוויות ברורות לכל שדות הטופס וקישורים</li>
        </ul>

        <h2>תוכן שאינו נגיש (אם רלוונטי)</h2>
        <p>
          סקציית <strong>יקום הכישורים</strong> (<code>/skills-universe</code>) היא
          הדמיה תלת-ממדית אינטראקטיבית. ההדמיה עצמה אינה נגישה לחלוטין למשתמשי
          מקלדת ולקוראי מסך — אך ניתן לדלג עליה ולהמשיך לתוכן הטקסטואלי. תוכן
          המידע המופיע בה זמין במלואו בעמוד <a href="/guide">המדריכים</a> בצורה
          טקסטואלית ונגישה.
        </p>

        <h2>הסדרי נגישות לעיון בעמדה ציבורית</h2>
        <p>
          האתר הוא דיגיטלי בלבד ואינו מחזיק עמדה פיזית פתוחה לציבור.
        </p>

        <h2>פניות בנושא נגישות</h2>
        <p>
          נתקלת בבעיית נגישות באתר? אשמח לדעת. פנייתך תטופל תוך זמן סביר.
        </p>
        <ul>
          <li>אימייל: <a href="mailto:eladhiteclearning@gmail.com">eladhiteclearning@gmail.com</a></li>
          <li>WhatsApp: <a href="https://wa.me/972525427474">052-542-7474</a></li>
          <li>טופס יצירת קשר: <a href="/contact">/contact</a></li>
        </ul>

        <h2>רכז הנגישות</h2>
        <p>
          <strong>אלעד יעקובוביץ&apos;</strong> · אימייל:{' '}
          <a href="mailto:eladhiteclearning@gmail.com">eladhiteclearning@gmail.com</a>
        </p>

        <h2>הצהרה זו תקפה ל</h2>
        <p>
          כלל עמודי האתר תחת הדומיין <code>fullstack-eladjak.co.il</code>, כולל
          תתי-דומיינים אם קיימים. ההצהרה נסקרת מחדש לפחות אחת לשנה ובכל שינוי
          מהותי במבנה האתר.
        </p>
      </article>
    </main>
  );
}
