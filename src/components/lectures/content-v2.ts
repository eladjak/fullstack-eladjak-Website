/**
 * Additional copy for the v2 layout of /lectures (hero tiers, audience panels,
 * the Torah-learning morning, speaker-media slot). Same truth rule as content.ts:
 * only facts Elad has given; no testimonials, counts, logos or prices.
 */
import type { AudienceId, LecturesLocale } from './content';

export interface AudiencePanel {
  id: Exclude<AudienceId, 'other' | 'parents'>;
  tab: string;
  image: string;
  imageAlt: string;
  /** Format id to suggest for this audience. */
  suggest: 'torah' | 'talk' | 'workshop' | 'series';
  suggestLabel: string;
}

export interface LecturesCopyV2 {
  hero: {
    line1: string;
    line2: string;
    facts: string[];
    sceneLabel: string;
  };
  audiences: { eyebrowParents: string; panels: AudiencePanel[]; suggestPrefix: string };
  torah: {
    label: string;
    title: string;
    lead: string;
    partsTitle: string;
    parts: { title: string; text: string }[];
    respectTitle: string;
    respect: string[];
  };
  formatsOther: { title: string; lead: string };
  index: { title: string; lead: string };
  media: {
    previewBadge: string;
    title: string;
    text: string;
  };
  field: { label: string; date: string };
  aboutPhotoAlt: string;
  bookingAside: string[];
  /** Real quotes only, with name, role and the person's consent. Empty = section not rendered. */
  testimonialsTitle: string;
  testimonials: { quote: string; name: string; role: string }[];
}

const he: LecturesCopyV2 = {
  hero: {
    line1: 'בינה מלאכותית לקבוצה שלכם,',
    line2: 'מוסברת על הדוגמאות שלכם',
    facts: ['בעברית פשוטה', 'הרצאה, סדנה או בוקר שלם'],
    sceneLabel: 'מנורה נדלקת מעל ספר פתוח, שורה אחת מסומנת ומחוברת למקור שלה',
  },
  audiences: {
    eyebrowParents: 'וגם להורים: מה הילדים פוגשים, ואיך מדברים איתם על זה.',
    suggestPrefix: 'מה מתאים כאן:',
    panels: [
      {
        id: 'torah',
        tab: 'בית מדרש',
        image: '/images/lectures-aud-torah.webp',
        imageAlt: 'איור: שתי חברותות בבית מדרש בערב, ספרי גמרא פתוחים על שולחן עץ, ואחד הלומדים מצביע מטאבלט אל הדף',
        suggest: 'torah',
        suggestLabel: 'בוקר ללומדי תורה: מהות וכלים',
      },
      {
        id: 'org',
        tab: 'צוות בארגון',
        image: '/images/lectures-aud-team.webp',
        imageAlt: 'איור: צוות של שישה אנשים סביב שולחן ישיבות בשעת ערב, שניים מהם צוחקים מול מחשב נייד',
        suggest: 'series',
        suggestLabel: 'סדרת מפגשים לצוות',
      },
      {
        id: 'school',
        tab: 'צוות חינוך',
        image: '/images/lectures-aud-school.webp',
        imageAlt: 'איור: חמישה מורים ומורות בחדר מורים אחרי שעות הלימודים, אחת מהן מראה לאחרים משהו במחשב',
        suggest: 'workshop',
        suggestLabel: 'סדנה מעשית לצוות',
      },
      {
        id: 'community',
        tab: 'קהילה',
        image: '/images/lectures-aud-community.webp',
        imageAlt: 'איור: ערב הרצאה באולם קהילתי, מרצה נראה מגבו מול קהל מגוון שיושב על כיסאות, באור של שרשרת נורות',
        suggest: 'talk',
        suggestLabel: 'הרצאה בגובה העיניים',
      },
    ],
  },
  torah: {
    label: 'לומדי תורה',
    title: 'בוקר לרבנים, לאברכים ולמגידי שיעור',
    lead: 'מפגש שמכבד את עולם הלימוד: הכלי מוצג כעזר לחיפוש ולסידור מקורות, ולא כמי שפוסק. הלימוד והבירור נשארים אצלכם ואצל רבותיכם.',
    partsTitle: 'מבנה הבוקר',
    parts: [
      { title: 'חלק ראשון: המהות', text: 'מה המכונה הזאת עושה כשהיא "עונה", מה ההבדל בין חיזוי מילים להבנה, ואיפה עובר הגבול של מה שאפשר לסמוך עליו.' },
      { title: 'חלק שני: הכלים', text: 'כלים לחיפוש מקורות ולסידור סוגיה בגמרא ובהלכה, ושיטה פשוטה לבדוק כל מקור שהכלי מביא מול המקור עצמו.' },
    ],
    respectTitle: 'מה מתאמים מראש',
    respect: [
      'הדוגמאות והתמונות במצגת מותאמות לקהל',
      'אפשר לתרגל על מסך משותף, למי שיש מכשיר מסונן',
      'מה נכנס לתוכן ומה נשאר בחוץ, נקבע יחד בשיחה',
    ],
  },
  index: { title: 'ארבע מסגרות', lead: 'כל מסגרת נבנית לפי הקבוצה, ואפשר לשלב.' },
  formatsOther: { title: 'עוד שלוש מסגרות', lead: 'כל אחת נבנית מחדש לפי הקבוצה, ואפשר לשלב.' },
  media: {
    previewBadge: 'נראה רק בתצוגה המקדימה',
    title: 'כאן ייכנס צילום או סרטון אמיתי שלך מרצה',
    text: 'מקום שמור לתמונה או לקטע קצר שלך מול קהל. נעבד אותו בעדינות: חיתוך, צבע ואור, בלי להוסיף קהל ובלי לשנות את מה שקרה. באתר החי המסגרת הזאת לא מוצגת עד שיגיע חומר אמיתי.',
  },
  field: { label: 'מהשטח', date: 'נובמבר 2026' },
  aboutPhotoAlt: 'אלעד יעקובוביץ׳',
  bookingAside: ['רוב השאלות בלחיצה אחת', 'אפשר לענות בקול על שאלת המטרה', 'אין התחייבות במילוי'],
  testimonialsTitle: 'מה אמרו משתתפים',
  testimonials: [],
};

const en: LecturesCopyV2 = {
  hero: {
    line1: 'AI for your group,',
    line2: 'explained with your own examples',
    facts: ['Plain language', 'A talk, a workshop or a full morning'],
    sceneLabel: 'A lamp turns on over an open book; one line is highlighted and linked to its source',
  },
  audiences: {
    eyebrowParents: 'And for parents: what children encounter online, and how to talk with them about it.',
    suggestPrefix: 'What fits here:',
    panels: [
      {
        id: 'torah',
        tab: 'Study hall',
        image: '/images/lectures-aud-torah.webp',
        imageAlt: 'Illustration: two study pairs in a beit midrash in the evening, open Gemara volumes on a wooden table, one learner pointing from a tablet to the page',
        suggest: 'torah',
        suggestLabel: 'A morning for Torah learners: essence and tools',
      },
      {
        id: 'org',
        tab: 'Team at work',
        image: '/images/lectures-aud-team.webp',
        imageAlt: 'Illustration: a team of six around a meeting table at dusk, two of them laughing at a laptop',
        suggest: 'series',
        suggestLabel: 'A series of team sessions',
      },
      {
        id: 'school',
        tab: 'Educators',
        image: '/images/lectures-aud-school.webp',
        imageAlt: 'Illustration: five teachers in a staff room after hours, one showing the others something on her laptop',
        suggest: 'workshop',
        suggestLabel: 'A hands-on staff workshop',
      },
      {
        id: 'community',
        tab: 'Community',
        image: '/images/lectures-aud-community.webp',
        imageAlt: 'Illustration: an evening talk in a community hall, the speaker seen from behind facing a mixed seated audience under string lights',
        suggest: 'talk',
        suggestLabel: 'A talk in plain language',
      },
    ],
  },
  torah: {
    label: 'Torah learners',
    title: 'A morning for rabbis, kollel scholars and teachers',
    lead: 'A session that respects the world of learning: the tool is shown as an aid for finding and organising sources, never as a posek. Study and clarification stay with you and your teachers.',
    partsTitle: 'How the morning is built',
    parts: [
      { title: 'Part one: essence', text: 'What the machine does when it "answers", the difference between predicting words and understanding, and where the line of trust lies.' },
      { title: 'Part two: tools', text: 'Tools for finding sources and organising a sugya in Gemara and halacha, and a simple method to check every source against the original.' },
    ],
    respectTitle: 'Agreed in advance',
    respect: [
      'Examples and images are fitted to the audience',
      'Practice can run on one shared screen, for those with filtered devices',
      'What goes into the content, and what stays out, is decided together',
    ],
  },
  index: { title: 'Four formats', lead: 'Each one is shaped around the group, and they can be combined.' },
  formatsOther: { title: 'Three more formats', lead: 'Each one is rebuilt for the group, and they can be combined.' },
  media: {
    previewBadge: 'Visible in the preview only',
    title: 'A real photo or video of you lecturing goes here',
    text: 'Reserved for a photo or a short clip of you in front of an audience. It will get a light touch only: crop, colour and light, no added crowd, nothing that changes what happened. On the live site this frame is hidden until real material arrives.',
  },
  field: { label: 'From the field', date: 'November 2026' },
  aboutPhotoAlt: 'Elad Yakobovich',
  bookingAside: ['Most questions take one tap', 'You can answer the goal question by voice', 'No commitment'],
  testimonialsTitle: 'What participants said',
  testimonials: [],
};

export const LECTURES_COPY_V2: Record<LecturesLocale, LecturesCopyV2> = { he, en };
