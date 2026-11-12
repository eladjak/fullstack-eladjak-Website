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
    videoSlotNote: string;
    play: string;
    pause: string;
    captionsLabel: string;
    filmLabel: string;
    soundOn: string;
    soundOff: string;
    transcript: string;
    transcriptLines: string[];
  };
  audiences: { eyebrowParents: string; panels: AudiencePanel[]; suggestPrefix: string };
  torah: {
    label: string;
    title: string;
    image: string;
    imageAlt: string;
    lead: string;
    partsTitle: string;
    parts: { title: string; text: string }[];
    respectTitle: string;
    respect: string[];
  };
  formatsOther: { title: string; lead: string };
  index: { title: string; lead: string };
  /** Real photos from the 11.11.2026 lecture. Participants' faces are blurred until the
   *  organiser (Ortamai) confirms publishing them; Elad is never blurred. */
  fieldPhotos: {
    items: { src: string; alt: string }[];
    caption: string;
    creditBefore: string;
    creditName: string;
    creditUrl: string;
    privacyNote: string;
  };
  field: { label: string; date: string };
  aboutPhotoAlt: string;
  bookingAside: string[];
  /** Real quotes only, with name, role and the person's consent. Empty = section not rendered. */
  faqChat: {
    lead: string;
    name: string;
    status: string;
    intro: string;
    pick: string;
    more: string;
    restart: string;
    allList: string;
    typing: string;
    logLabel: string;
    notFound: string;
    notFoundCta: string;
    avatarAlt: string;
    you: string;
    elad: string;
  };
  testimonialsTitle: string;
  testimonials: { quote: string; name: string; role: string }[];
}

const he: LecturesCopyV2 = {
  hero: {
    line1: 'בינה מלאכותית לקבוצה שלכם,',
    line2: 'מוסברת על הדוגמאות שלכם',
    facts: ['בעברית פשוטה', 'הרצאה, סדנה או בוקר שלם'],
    sceneLabel: 'אלעד על במה מול קהל, באור זרקור',
    videoSlotNote: 'תצוגה מקדימה בלבד: כאן ייכנס סרטון הפתיחה (30 שניות)',
    play: 'הפעלת הסרטון',
    pause: 'עצירת הסרטון',
    captionsLabel: 'כתוביות בעברית',
    filmLabel: 'סרטון פתיחה: אלעד מרצה מול קהל',
    soundOn: 'הפעלת קול',
    soundOff: 'השתקה',
    transcript: 'מה נאמר בסרטון',
    transcriptLines: [
      'בינה מלאכותית זה לא קסם, וזה גם לא מפחיד.',
      'אני מראה לכם מה היא באמת יודעת לעשות, ומה לא.',
      'ואז אנחנו מתרגלים, ביחד, על דוגמאות מהעולם שלכם.',
      'יוצאים עם כלים שאפשר להשתמש בהם כבר מחר בבוקר.',
      'בואו נדבר.',
    ],
  },
  audiences: {
    eyebrowParents: 'וגם להורים: מה הילדים פוגשים, ואיך מדברים איתם על זה.',
    suggestPrefix: 'מה מתאים כאן:',
    panels: [
      {
        id: 'torah',
        tab: 'קהל תורני',
        image: '/images/lectures-classroom.webp',
        imageAlt: 'איור: כיתת מחשבים באור יום, עם שורת חלונות גדולים ונוף של מגדלי העיר. אלעד מצביע על מסך של אחד המשתתפים, גברים בכיפות יושבים מול המחשבים ואחד מהם שואל שאלה',
        suggest: 'torah',
        suggestLabel: 'בוקר לקהל תורני: מהות וכלים',
      },
      {
        id: 'org',
        tab: 'צוות בארגון',
        image: '/images/lectures-aud-team.webp',
        imageAlt: 'איור: חדר ישיבות באור יום. אלעד מסביר ליד מסך גדול, ושמונה אנשי צוות סביב שולחן עם מחשבים ומחברות; שניים מהם מחייכים ומנסים משהו יחד במחשב',
        suggest: 'series',
        suggestLabel: 'סדרת מפגשים לצוות',
      },
      {
        id: 'school',
        tab: 'צוות חינוך',
        image: '/images/lectures-aud-school.webp',
        imageAlt: 'איור: חדר מורים אחר הצהריים. אלעד יושב עם מורים ומורות סביב שולחן עם טאבלטים, מחברות וכוסות קפה, ואחת המורות מראה את הטאבלט שלה לחברתה',
        suggest: 'workshop',
        suggestLabel: 'סדנה מעשית לצוות',
      },
      {
        id: 'community',
        tab: 'קהילה',
        image: '/images/lectures-aud-community.webp',
        imageAlt: 'איור: אולם קהילתי אחר הצהריים. אלעד על הבמה מול קהל מבוגר, גברים בצד אחד של המעבר ונשים בצד השני, ואחת המשתתפות מרימה יד לשאול',
        suggest: 'talk',
        suggestLabel: 'הרצאה בגובה העיניים',
      },
    ],
  },
  torah: {
    label: 'קהל תורני',
    title: 'לקהילות, לבתי מדרש ולמגידי שיעור',
    image: '/images/lectures-studio.webp',
    imageAlt: 'איור: חדר סדנה נעים באור יום. משתתפים יושבים בחצי מעגל וכותבים במחברות, אלעד יושב על כיסא גבוה ומדבר, ובצד שולחן כיבוד עם קפה, מאפים, פירות ופרחים',
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
  fieldPhotos: {
    items: [
      {
        src: '/images/lectures-field-01.webp',
        alt: 'אלעד עומד ליד מסך ההקרנה בכיתת מחשבים ומסביר שקופית בשם "טרנספורמר, בפשטות". מימין משתתפים בכיפות יושבים מול מחשבים, ומאחוריהם חלונות גדולים עם נוף של מגדלי העיר.',
      },
      {
        src: '/images/lectures-field-02.webp',
        alt: 'אלעד יושב בעמדת המרצה בצד הכיתה ומקשיב לשאלה. משתתף מבוגר בשורה של המחשבים מסביר בתנועת יד, ובחלונות נוף העיר.',
      },
      {
        src: '/images/lectures-field-04.webp',
        alt: 'שורות של משתתפים מקהל תורני בכיתת המחשבים, מקשיבים ומסתכלים קדימה אל המסך.',
      },
    ],
    caption: 'צילומים מההרצאה ב-11 בנובמבר 2026, בכיתת מחשבים עם נוף לעיר.',
    creditBefore: 'ההרצאה התקיימה דרך',
    creditName: 'Ortamai',
    creditUrl: 'https://ortamai.com',
    privacyNote: 'פני המשתתפים טושטשו כדי לשמור על פרטיותם.',
  },
  field: { label: 'מההרצאה האחרונה', date: '11 בנובמבר 2026' },
  aboutPhotoAlt: 'אלעד יעקובוביץ׳',
  bookingAside: ['רוב השאלות בלחיצה אחת', 'אפשר לענות בקול על שאלת המטרה', 'אין התחייבות במילוי'],
  faqChat: {
    lead: 'בחרו שאלה, והתשובה מגיעה כמו בשיחה. כל התשובות כתובות מראש ומופיעות גם ברשימה המלאה מתחת.',
    name: 'אלעד יעקובוביץ׳',
    status: 'עונה מתוך השאלות הנפוצות',
    intro: 'היי, אני אלעד. בחרו שאלה למטה ואענה כאן. ואם השאלה שלכם לא ברשימה, כתבו לי בטופס ונדבר.',
    pick: 'שאלות שאנשים שואלים אותי:',
    more: 'עוד {n} שאלות',
    restart: 'מההתחלה',
    allList: 'כל השאלות והתשובות ברשימה אחת',
    typing: 'אלעד כותב',
    logLabel: 'שיחה עם אלעד על הרצאות וסדנאות',
    notFound: 'לא מצאתם את השאלה שלכם?',
    notFoundCta: 'כתבו לי בטופס',
    avatarAlt: 'אלעד יעקובוביץ׳',
    you: 'שאלתם',
    elad: 'אלעד עונה',
  },
  testimonialsTitle: 'מה אמרו משתתפים',
  testimonials: [],
};

const en: LecturesCopyV2 = {
  hero: {
    line1: 'AI for your group,',
    line2: 'explained with your own examples',
    facts: ['Plain language', 'A talk, a workshop or a full morning'],
    sceneLabel: 'Elad on a stage in front of an audience, under a spotlight',
    videoSlotNote: 'Preview only: the 30-second opening film goes here',
    play: 'Play the film',
    pause: 'Pause the film',
    captionsLabel: 'English captions',
    filmLabel: 'Opening film: Elad lecturing to an audience',
    soundOn: 'Turn sound on',
    soundOff: 'Mute',
    transcript: 'What is said in the film',
    transcriptLines: [
      'AI is not magic, and it is not scary either.',
      "I show you what it can really do, and what it can't.",
      'Then we practise together, on examples from your own world.',
      'You leave with tools you can use tomorrow morning.',
      "Let's talk.",
    ],
  },
  audiences: {
    eyebrowParents: 'And for parents: what children encounter online, and how to talk with them about it.',
    suggestPrefix: 'What fits here:',
    panels: [
      {
        id: 'torah',
        tab: 'Torah-observant audiences',
        image: '/images/lectures-classroom.webp',
        imageAlt: 'Illustration: a computer classroom in daylight with a row of large windows and a view of the city towers. Elad points at a participant’s screen; men in kippot sit at the computers and one of them asks a question',
        suggest: 'torah',
        suggestLabel: 'A morning for Torah-observant audiences: essence and tools',
      },
      {
        id: 'org',
        tab: 'Team at work',
        image: '/images/lectures-aud-team.webp',
        imageAlt: 'Illustration: a meeting room in daylight. Elad explains beside a large screen to eight colleagues around a table with laptops and notebooks; two of them smile as they try something together',
        suggest: 'series',
        suggestLabel: 'A series of team sessions',
      },
      {
        id: 'school',
        tab: 'Educators',
        image: '/images/lectures-aud-school.webp',
        imageAlt: 'Illustration: a staff room in the afternoon. Elad sits with teachers around a table with tablets, notebooks and coffee cups, and one teacher shows her tablet to a colleague',
        suggest: 'workshop',
        suggestLabel: 'A hands-on staff workshop',
      },
      {
        id: 'community',
        tab: 'Community',
        image: '/images/lectures-aud-community.webp',
        imageAlt: 'Illustration: a community hall in the afternoon. Elad on stage facing older adults, men on one side of the aisle and women on the other, one woman raising her hand to ask',
        suggest: 'talk',
        suggestLabel: 'A talk in plain language',
      },
    ],
  },
  torah: {
    label: 'Torah-observant audiences',
    title: 'For communities, study halls and teachers',
    image: '/images/lectures-studio.webp',
    imageAlt: 'Illustration: a cozy workshop room in daylight. Participants sit in a half circle writing in notebooks, Elad talks from a tall stool, and a refreshments table with coffee, pastries, fruit and flowers stands to the side',
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
  fieldPhotos: {
    items: [
      {
        src: '/images/lectures-field-01.webp',
        alt: 'Elad stands by the projection screen in a computer classroom, explaining a slide titled "Transformer, simply". On the right, participants in kippot sit at computers, with large windows and a view of the city towers behind them.',
      },
      {
        src: '/images/lectures-field-02.webp',
        alt: 'Elad sits at the lecturer desk at the side of the classroom, listening to a question. An older participant in the row of computers explains with a hand gesture; the windows show the city.',
      },
      {
        src: '/images/lectures-field-04.webp',
        alt: 'Rows of participants from a Torah-observant audience in the computer classroom, listening and looking ahead at the screen.',
      },
    ],
    caption: 'Photos from the lecture on 11 November 2026, in a computer classroom overlooking the city.',
    creditBefore: 'The lecture was held through',
    creditName: 'Ortamai',
    creditUrl: 'https://ortamai.com',
    privacyNote: "Participants' faces are blurred to protect their privacy.",
  },
  field: { label: 'From my latest lecture', date: '11 November 2026' },
  aboutPhotoAlt: 'Elad Yakobovich',
  bookingAside: ['Most questions take one tap', 'You can answer the goal question by voice', 'No commitment'],
  faqChat: {
    lead: 'Pick a question and the answer arrives like a chat. Every answer is written in advance and also appears in the full list below.',
    name: 'Elad Yakobovich',
    status: 'Answers from the common questions',
    intro: 'Hi, I am Elad. Pick a question below and I will answer here. If yours is not on the list, write to me in the form and we will talk.',
    pick: 'Questions people ask me:',
    more: '{n} more questions',
    restart: 'Start over',
    allList: 'All questions and answers in one list',
    typing: 'Elad is typing',
    logLabel: 'Conversation with Elad about talks and workshops',
    notFound: 'Did not find your question?',
    notFoundCta: 'Write to me in the form',
    avatarAlt: 'Elad Yakobovich',
    you: 'You asked',
    elad: 'Elad answers',
  },
  testimonialsTitle: 'What participants said',
  testimonials: [],
};

export const LECTURES_COPY_V2: Record<LecturesLocale, LecturesCopyV2> = { he, en };
