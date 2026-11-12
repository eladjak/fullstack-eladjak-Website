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
    imageAlt: string;
  };
  formatsOther: { title: string; lead: string };
  media: {
    previewBadge: string;
    title: string;
    text: string;
  };
  field: { label: string; date: string };
  aboutPhotoAlt: string;
  bookingAside: string[];
}

const he: LecturesCopyV2 = {
  hero: {
    line1: 'בינה מלאכותית,',
    line2: 'מוסברת כמו שצריך',
    facts: ['בעברית פשוטה', 'הרצאה, סדנה או בוקר שלם', 'מותאם לקהל שלכם'],
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
        suggestLabel: 'סדרת מפגשים לצוות, או סדנה מעשית',
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
    lead: 'מפגש שנבנה מתוך עולם הלימוד: הכלי מוצג כעזר לחיפוש ולסידור, והלימוד, הבירור וההכרעה נשארים אצל הלומד.',
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
    imageAlt: 'איור: שתי חברותות בבית מדרש בערב, ספרי גמרא פתוחים, ואחד הלומדים מצביע מטאבלט אל הדף',
  },
  formatsOther: { title: 'עוד שלוש מסגרות', lead: 'כל אחת נבנית מחדש לפי הקבוצה, ואפשר לשלב.' },
  media: {
    previewBadge: 'נראה רק בתצוגה המקדימה',
    title: 'כאן ייכנס צילום או וידאו אמיתי שלך מרצה',
    text: 'מקום שמור לתמונה או לקטע קצר מההרצאה של 11.11 מול הקהל. באתר החי המסגרת הזאת לא מוצגת עד שיגיע חומר אמיתי.',
  },
  field: { label: 'מהשטח', date: 'נובמבר 2026' },
  aboutPhotoAlt: 'אלעד יעקובוביץ׳',
  bookingAside: ['רוב השאלות בלחיצה אחת', 'אפשר לענות בקול על שאלת המטרה', 'אין התחייבות במילוי'],
};

const en: LecturesCopyV2 = {
  hero: {
    line1: 'Artificial intelligence,',
    line2: 'explained properly',
    facts: ['Plain language', 'A talk, a workshop or a full morning', 'Shaped for your audience'],
    sceneLabel: 'A lamp turns on over an open book; one line is highlighted and linked to its source',
  },
  audiences: {
    eyebrowParents: 'And for parents: what children meet online, and how to talk with them about it.',
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
        suggestLabel: 'A series of team sessions, or a hands-on workshop',
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
    lead: 'Built from inside the world of learning: the tool is presented as an aid for searching and organising, while study, clarification and the ruling stay with the learner.',
    partsTitle: 'How the morning is built',
    parts: [
      { title: 'Part one: essence', text: 'What the machine does when it "answers", the difference between predicting words and understanding, and where the line of trust lies.' },
      { title: 'Part two: tools', text: 'Tools for finding sources and organising a sugya in Gemara and halacha, and a simple method to check every source against the original.' },
    ],
    respectTitle: 'Agreed in advance',
    respect: [
      'Examples and images are fitted to the audience',
      'Practice can run on one shared screen, for filtered devices',
      'What goes into the content, and what stays out, is decided together',
    ],
    imageAlt: 'Illustration: two study pairs in a beit midrash in the evening, open Gemara volumes, one learner pointing from a tablet to the page',
  },
  formatsOther: { title: 'Three more formats', lead: 'Each one is rebuilt for the group, and they can be combined.' },
  media: {
    previewBadge: 'Visible in the preview only',
    title: 'A real photo or video of you lecturing goes here',
    text: 'Reserved for a photo or a short clip from the 11.11 lecture in front of the audience. On the live site this frame is hidden until real material arrives.',
  },
  field: { label: 'From the field', date: 'November 2026' },
  aboutPhotoAlt: 'Elad Yakobovich',
  bookingAside: ['Most questions take one tap', 'You can answer the goal question by voice', 'No commitment'],
};

export const LECTURES_COPY_V2: Record<LecturesLocale, LecturesCopyV2> = { he, en };
