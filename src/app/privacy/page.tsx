import type { Metadata } from 'next';
import { LegalDocument, LegalSection, legalLinkClass } from '@/components/ui/legal-document';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il').replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'מדיניות פרטיות | Elad Postiz',
  description: 'מדיניות הפרטיות של Elad Postiz, מערכת אישית לתזמון פרסומים.',
  alternates: { canonical: `${SITE_URL}/privacy/` },
};

export default function PrivacyPage() {
  return (
    <LegalDocument title="מדיניות פרטיות" englishTitle="Privacy Policy">
      <section lang="he" dir="rtl" className="space-y-8">
        <h2 className="text-2xl font-bold text-foreground">הגרסה בעברית</h2>
        <LegalSection title="על המערכת">
          <p>מדיניות זו חלה על <bdi dir="ltr">Elad Postiz</bdi> בלבד, מערכת אישית לתזמון פרסומים המותקנת בשרת של אלעד בכתובת <bdi dir="ltr">content-social.eladjak.com</bdi>. אלעד משתמש במערכת לתזמון ולהעלאה של תוכן לחשבונות שלו בלבד.</p>
          <p>מפעיל המערכת: אלעד יעקובוביץ&apos; - הדרכה פיתוח ויצירה (עוסק פטור), <bdi dir="ltr">Elad Ya’akobovitch</bdi>.</p>
        </LegalSection>
        <LegalSection title="איזה מידע מעובד ולמה">
          <p>לאחר מתן הרשאה, המערכת מתחברת לחשבונות <bdi dir="ltr">TikTok</bdi>, <bdi dir="ltr">YouTube</bdi>, <bdi dir="ltr">Meta (Facebook/Instagram)</bdi> ו־<bdi dir="ltr">LinkedIn</bdi>. לפי ההרשאות והמידע שהפלטפורמה מחזירה, היא מעבדת מזהה חשבון, שם ותמונת פרופיל, וכן אסימוני גישה ורענון לפי הצורך.</p>
          <p>המערכת מעבדת גם פוסטים אישיים, קובצי מדיה, טקסטים, מועדי פרסום וסטטוס פרסום, בהתאם להרשאות שניתנו. המידע משמש לחיבור החשבונות, להכנה ולתזמון של תוכן ולבדיקת מצב הפרסום.</p>
        </LegalSection>
        <LegalSection title="שמירה והעברת מידע">
          <p>נתוני המערכת נשמרים במסד הנתונים <bdi dir="ltr">Postiz PostgreSQL</bdi>, וקובצי מדיה נשמרים באופן מקומי בשרת של אלעד. המידע אינו נמכר או משותף לשימוש עצמאי של צדדים שלישיים. פלטפורמות היעד מקבלות את התוכן שנבחר ואת המידע הנחוץ להעלאה או לפרסום שאושרו.</p>
        </LegalSection>
        <LegalSection title="ניתוק, מחיקה ויצירת קשר">
          <p>אפשר לנתק חשבון או לבטל את ההרשאה דרך הפלטפורמה הרלוונטית. לבקשת מחיקת מידע או לשאלות אפשר לפנות אל <a className={legalLinkClass} href="mailto:eladjak@gmail.com"><bdi dir="ltr">eladjak@gmail.com</bdi></a>. עותקים שכבר פורסמו מנוהלים בפלטפורמת היעד.</p>
        </LegalSection>
      </section>
      <section id="english" lang="en" dir="ltr" className="scroll-mt-24 space-y-8 border-t border-border pt-10">
        <h2 className="text-2xl font-bold text-foreground">Privacy Policy</h2>
        <p className="text-sm text-muted-foreground">Updated: 19 November 2026</p>
        <LegalSection title="About the app">
          <p>This policy applies only to Elad Postiz, a personal scheduling app hosted on Elad’s server at content-social.eladjak.com. Elad uses this integration to schedule and upload content to his own accounts only.</p>
          <p>Operator: <bdi dir="rtl">אלעד יעקובוביץ&apos; - הדרכה פיתוח ויצירה (עוסק פטור)</bdi>, Elad Ya’akobovitch.</p>
        </LegalSection>
        <LegalSection title="Information and its use">
          <p>With authorization, the app connects to TikTok, YouTube, Meta (Facebook/Instagram), and LinkedIn accounts. Depending on the permissions and what the platform returns, it processes the account identifier, name and profile image, as well as access and refresh tokens where applicable.</p>
          <p>It also processes personal posts, media, captions, schedules and publication status according to the permissions granted. This information is used to connect accounts, prepare and schedule content, and check publication status.</p>
        </LegalSection>
        <LegalSection title="Storage and sharing">
          <p>App data is stored in the Postiz PostgreSQL database, and media files are stored locally on Elad’s self-hosted server. Information is not sold or shared for independent third-party use. Destination platforms receive the selected content and data needed for authorized upload or publication.</p>
        </LegalSection>
        <LegalSection title="Disconnect, deletion and contact">
          <p>An account can be disconnected or its authorization revoked through the relevant platform. For deletion requests or questions, contact <a className={legalLinkClass} href="mailto:eladjak@gmail.com">eladjak@gmail.com</a>. Copies already published are managed on the destination platform.</p>
        </LegalSection>
      </section>
    </LegalDocument>
  );
}
