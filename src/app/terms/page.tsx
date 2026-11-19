import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalDocument, LegalSection, legalLinkClass } from '@/components/ui/legal-document';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il').replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'תנאי שימוש | Elad Postiz',
  description: 'תנאי השימוש של Elad Postiz, מערכת אישית לתזמון פרסומים.',
  alternates: { canonical: `${SITE_URL}/terms/` },
};

export default function TermsPage() {
  return (
    <LegalDocument title="תנאי שימוש" englishTitle="Terms of Service">
      <section lang="he" dir="rtl" className="space-y-8">
        <h2 className="text-2xl font-bold text-foreground">הגרסה בעברית</h2>
        <LegalSection title="מטרת המערכת">
          <p>תנאים אלה חלים על <bdi dir="ltr">Elad Postiz</bdi> בלבד, מערכת אישית לתזמון פרסומים המותקנת בשרת של אלעד בכתובת <bdi dir="ltr">content-social.eladjak.com</bdi>. אלעד משתמש במערכת לתזמון ולהעלאה של תוכן לחשבונות שלו בלבד.</p>
          <p>מפעיל המערכת: אלעד יעקובוביץ&apos; - הדרכה פיתוח ויצירה (עוסק פטור), <bdi dir="ltr">Elad Ya’akobovitch</bdi>.</p>
        </LegalSection>
        <LegalSection title="תוכן וחשבונות">
          <p>השימוש במערכת מיועד לתוכן שבבעלות אלעד או שקיבל הרשאה להשתמש בו, תוך כיבוד זכויות של אחרים ותנאי השימוש של הפלטפורמות המחוברות.</p>
        </LegalSection>
        <LegalSection title="גישה ופרסום">
          <p>חיבור החשבונות והפרסום תלויים בזמינות הפלטפורמות. תוכן שכבר פורסם מנוהל בפלטפורמת היעד.</p>
        </LegalSection>
        <LegalSection title="פרטיות ויצירת קשר">
          <p>מידע על עיבוד הנתונים מופיע ב<Link className={legalLinkClass} href="/privacy/">מדיניות הפרטיות</Link>. לשאלות אפשר לפנות אל <a className={legalLinkClass} href="mailto:eladjak@gmail.com"><bdi dir="ltr">eladjak@gmail.com</bdi></a>.</p>
        </LegalSection>
      </section>
      <section id="english" lang="en" dir="ltr" className="scroll-mt-24 space-y-8 border-t border-border pt-10">
        <h2 className="text-2xl font-bold text-foreground">Terms of Service</h2>
        <p className="text-sm text-muted-foreground">Updated: 19 November 2026</p>
        <LegalSection title="Purpose">
          <p>These terms apply only to Elad Postiz, a personal scheduling app hosted on Elad’s server at content-social.eladjak.com. Elad uses this integration to schedule and upload content to his own accounts only.</p>
          <p>Operator: <bdi dir="rtl">אלעד יעקובוביץ&apos; - הדרכה פיתוח ויצירה (עוסק פטור)</bdi>, Elad Ya’akobovitch.</p>
        </LegalSection>
        <LegalSection title="Content and accounts">
          <p>The app is intended for content Elad owns or is authorized to use, respecting others’ rights and the terms of the connected platforms.</p>
        </LegalSection>
        <LegalSection title="Access and publication">
          <p>Connecting accounts and publishing depend on platform availability. Content already published is managed on the destination platform.</p>
        </LegalSection>
        <LegalSection title="Privacy and contact">
          <p>See the <Link className={legalLinkClass} href="/privacy/">Privacy Policy</Link> for information about data processing. For questions, contact <a className={legalLinkClass} href="mailto:eladjak@gmail.com">eladjak@gmail.com</a>.</p>
        </LegalSection>
      </section>
    </LegalDocument>
  );
}
