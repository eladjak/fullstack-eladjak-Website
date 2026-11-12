/**
 * Copy for /lectures and /en/lectures.
 *
 * Every factual line here was checked against Elad's own records (11.11.2026 lecture
 * notes, the site's about/timeline copy). No testimonials, client logos, participant
 * counts or prices are stated on purpose: add them only when Elad supplies them.
 */

export type LecturesLocale = 'he' | 'en';

export type AudienceId = 'org' | 'school' | 'community' | 'torah' | 'parents' | 'other';
export type FormatId = 'talk' | 'workshop' | 'torah' | 'series';

export interface LectureFormat {
  id: FormatId;
  title: string;
  duration: string;
  forWhom: string;
  summary: string;
  takeaways: string[];
  featured?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Option<T extends string = string> {
  value: T;
  label: string;
  hint?: string;
}

export interface LecturesCopy {
  meta: { title: string; description: string };
  hero: {
    kicker: string;
    title: string;
    lead: string;
    cta: string;
    secondary: string;
    note: string;
    imageAlt: string;
  };
  audiences: { title: string; lead: string; items: { id: AudienceId; label: string; text: string }[] };
  formats: { title: string; lead: string; leaveWith: string; ask: string; items: LectureFormat[] };
  recent: { title: string; text: string; bullets: string[]; imageAlt: string };
  how: { title: string; steps: { title: string; text: string }[] };
  about: { title: string; lines: string[]; link: string };
  faq: { title: string; items: FaqItem[] };
  form: FormCopy;
}

export interface FormCopy {
  title: string;
  lead: string;
  stepOf: (n: number, total: number) => string;
  next: string;
  back: string;
  skip: string;
  submit: string;
  sending: string;
  otherLabel: string;
  otherPlaceholder: string;
  draftSaved: string;
  clearDraft: string;
  questions: {
    audience: { label: string; help: string; options: Option<AudienceId>[] };
    size: { label: string; help: string; options: Option[] };
    format: { label: string; help: string; options: Option[] };
    dates: {
      label: string;
      help: string;
      from: string;
      to: string;
      flexible: string;
      error: string;
    };
    place: { label: string; help: string; cityLabel: string; cityPlaceholder: string; options: Option[] };
    goal: {
      label: string;
      help: string;
      placeholder: string;
      micStart: string;
      micStop: string;
      micListening: string;
      micUnsupported: string;
      micDenied: string;
    };
    contact: {
      label: string;
      help: string;
      name: string;
      namePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      org: string;
      orgPlaceholder: string;
      errorName: string;
      errorReach: string;
      errorEmail: string;
      privacy: string;
    };
  };
  requiredChoice: string;
  review: string;
  success: { title: string; text: string; again: string };
  error: { title: string; text: string; retry: string; edit: string; whatsapp: string; email: string };
}

const he: LecturesCopy = {
  meta: {
    title: 'הרצאות וסדנאות בינה מלאכותית',
    description:
      'הרצאות וסדנאות בינה מלאכותית בעברית פשוטה, לצוותים, בתי ספר, קהילות וקהל תורני: מה זה AI, איך משתמשים בו נכון, ותרגול מעשי עם כלים אמיתיים.',
  },
  hero: {
    kicker: 'הרצאות וסדנאות',
    title: 'בינה מלאכותית, מוסברת כמו שצריך',
    lead: 'בוקר אחד שבו הקבוצה שלכם מבינה מה זה בעצם AI, איפה הוא טועה, ואיך משתמשים בו מחר בבוקר בעבודה שלכם. בלי ז׳רגון, עם הדגמות חיות ותרגול מעשי.',
    cta: 'קבלו הצעה להרצאה',
    secondary: 'מה אפשר להזמין',
    note: 'מתאים גם למי שמעולם לא פתח כלי AI.',
    imageAlt:
      'איור של קבוצת לומדים, רובם בכיפות ואחד בכובע, סביב שולחן עץ עם ספרים פתוחים ומחשב נייד, ומנחה שמסביר להם באור מנורה חמה',
  },
  audiences: {
    title: 'למי זה מתאים',
    lead: 'התוכן נבנה מחדש לכל קבוצה: הדוגמאות לקוחות מהעולם שלכם, לא מהעולם של מתכנתים.',
    items: [
      { id: 'org', label: 'צוותים בארגונים', text: 'איך חוסכים זמן בכתיבה, בסיכום ובניתוח, בלי לחשוף מידע רגיש.' },
      { id: 'school', label: 'בתי ספר וצוותי חינוך', text: 'מה התלמידים כבר עושים עם AI, ואיך מורים משתמשים בו בהכנת חומרים.' },
      { id: 'community', label: 'קהילות וקבוצות מבוגרים', text: 'היכרות רגועה עם הכלים, וזהירות מהונאות ומזיופים בקול ובווידאו.' },
      { id: 'torah', label: 'רבנים, אברכים ובתי מדרש', text: 'איך פועלת בינה מלאכותית, ואיך אפשר להיעזר בה בחיפוש ובסידור מקורות בגמרא ובהלכה.' },
      { id: 'parents', label: 'הורים', text: 'מה הילדים פוגשים, מה כדאי לדעת, ואיך מדברים איתם על זה.' },
    ],
  },
  formats: {
    title: 'ארבע דרכים להזמין',
    lead: 'כל מסגרת נבנית לפי הקבוצה. אפשר גם לשלב.',
    leaveWith: 'עם מה יוצאים',
    ask: 'בקשת הצעה למפגש הזה',
    items: [
      {
        id: 'torah',
        featured: true,
        title: 'בינה מלאכותית ללומדי תורה: מהות וכלים',
        duration: 'בוקר של כשלוש שעות',
        forWhom: 'רבנים, אברכים, מגידי שיעור ובתי מדרש',
        summary:
          'החצי הראשון עוסק במהות: מה המכונה הזאת עושה באמת כשהיא "עונה", מה ההבדל בין חיזוי מילים להבנה, ואיפה עובר הגבול של מה שאפשר לסמוך עליו. החצי השני מעשי: כלים לחיפוש ולסידור מקורות בלימוד גמרא והלכה, ואיך מאמתים מראה מקום וציטוט מול המקור עצמו, בהקשר שלו. הכלים הם עזר ללימוד, לא תחליף לעיון או לפסיקה.',
        takeaways: [
          'הבנה ברורה של מה הכלי יודע ומה הוא רק מנחש',
          'שיטה לבדוק שמראה המקום והציטוט מדויקים, וקריאה שלהם בהקשר',
          'כלים שעובדים בעברית, מוכנים לשימוש כבר באותו יום',
          'הכלי עוזר לחפש ולסדר. ההכרעה נשארת אצלכם',
        ],
      },
      {
        id: 'talk',
        title: 'הרצאה: בינה מלאכותית בשפה פשוטה',
        duration: 'שעה וחצי עד שעתיים',
        forWhom: 'כל קהל, גם גדול',
        summary:
          'מאיפה זה הגיע, איך זה עובד בלי נוסחאות, למה זה לפעמים ממציא, ואיך שומרים על עצמנו מזיופים ומהונאות. עם הדגמות חיות על המסך.',
        takeaways: ['תמונה ברורה של מה זה AI ומה לא', 'שלושה שימושים שאפשר לנסות מחר', 'כללי זהירות פשוטים'],
      },
      {
        id: 'workshop',
        title: 'סדנה מעשית: עובדים עם AI',
        duration: 'חצי יום, עם הפסקה',
        forWhom: 'קבוצות קטנות ובינוניות',
        summary:
          'מתרגלים לפי מה שמתאים לקבוצה: כל אחד על המכשיר שלו, או יחד על מסך משותף. מנסחים בקשות טובות, מסכמים מסמך אמיתי, יוצרים טיוטה, ובודקים את התוצאה ביחד.',
        takeaways: ['כלי שעובד, למי שרוצה להמשיך לבד', 'איך מנסחים בקשה שמקבלת תשובה טובה', 'דף תרגול להמשך בבית'],
      },
      {
        id: 'series',
        title: 'סדרת מפגשים לצוות',
        duration: 'שלושה עד ארבעה מפגשים',
        forWhom: 'צוותים בארגון או במוסד',
        summary:
          'כל מפגש מתמקד בתהליך עבודה אחד של הצוות שלכם, ובונים אותו ביחד עם הכלים. בין המפגשים מתרגלים על משימות אמיתיות.',
        takeaways: ['תהליכי עבודה שנבנו על המשימות שלכם', 'נהלי שימוש בטוח בצוות', 'תרגול בין המפגשים על משימות אמיתיות'],
      },
    ],
  },
  recent: {
    title: 'מהשטח',
    text: 'בנובמבר 2026 העברתי בוקר של שלוש שעות וחצי על בינה מלאכותית לקבוצת מבוגרים מקהל דתי. בנינו את המפגש כך שכל אחד יוצא עם משהו שהוא עשה בעצמו.',
    bullets: [
      'החלק הראשון בלי מחשבים: היסטוריה קצרה, איך זה עובד, ואיפה זה טועה',
      'אחר כך פותחים כלי ביחד ומתרגלים, צעד אחר צעד',
      'דף תרגול מודפס, ומצגת שמתאימה לקהל, כולל קטעי שמע בקול גבר בלבד',
    ],
    imageAlt: 'איור של שולחן עץ עם ספר גדול פתוח, טלפון, כוס תה ומשקפי קריאה, באור מנורה חם',
  },
  how: {
    title: 'איך זה עובד',
    steps: [
      { title: 'שיחה קצרה', text: 'רבע שעה בטלפון: מי הקבוצה, מה חשוב לכם, ומה כדאי לא לפתוח.' },
      { title: 'תוכן תפור', text: 'אני בונה את המצגת והתרגילים לפי הקהל שלכם, ושולח לכם לעיון לפני.' },
      { title: 'המפגש', text: 'הסבר, הדגמות חיות ותרגול. צריך מקרן, רמקול ואינטרנט יציב.' },
      { title: 'אחרי', text: 'המצגת, דף התרגול וקישורים לכלים נשארים אצלכם.' },
    ],
  },
  about: {
    title: 'מי מעביר',
    lines: [
      'אלעד יעקובוביץ׳, מפתח ומהנדס בינה מלאכותית. בונה מערכות AI ואוטומציה לעסקים ולארגונים.',
      'לפני כן ניהל במשך 12 שנה עסק עצמאי, ולכן מסביר טכנולוגיה בשפה פשוטה ועניינית.',
      'בוגר מסלול Full-Stack של John Bryce בהצטיינות, ומלמד מתוך מה שהוא עושה בפועל, לא מתוך שקפים של אחרים.',
    ],
    link: 'עוד עליי',
  },
  faq: {
    title: 'שאלות נפוצות',
    items: [
      {
        q: 'צריך ידע קודם במחשבים או בבינה מלאכותית?',
        a: 'לא. ההרצאה מתחילה מאפס ומסבירה כל מושג במילים פשוטות. בסדנה המעשית מספיק לדעת לפתוח אפליקציה בטלפון. מי שכבר משתמש בכלים יקבל דרכים לעבוד איתם טוב יותר ולבדוק את התשובות שלהם.',
      },
      {
        q: 'האם התוכן מתאים לקהל דתי או חרדי?',
        a: 'כן. הדוגמאות, התמונות וקטעי השמע מותאמים לקהל מראש, ובשיחה הראשונה עוברים יחד על מה מתאים ומה עדיף להשאיר בחוץ. במפגש לרבנים ולאברכים יש גם דיון עקרוני במהות של הכלי, לא רק הדרכה טכנית, והכלי מוצג כעזר לחיפוש ולסידור ולא כמי שמכריע.',
      },
      {
        q: 'מה צריך להביא ומה צריך במקום?',
        a: 'במקום: מקרן או מסך גדול, רמקול וחיבור יציב לאינטרנט. בסדנה המעשית מי שרוצה מביא טלפון או מחשב נייד. למי שיש מכשיר מסונן, או שמעדיף לא לפתוח חשבון, נבנה את התרגול על מסך משותף; את זה מתאמים מראש בשיחה. אם אין אינטרנט במקום, נבנה את המפגש כך שיעבוד גם בלעדיו.',
      },
      {
        q: 'כמה זה עולה?',
        a: 'המחיר תלוי במשך המפגש, בגודל הקבוצה ובמיקום, ולכן אין מחירון קבוע באתר. ממלאים את הטופס בתחתית העמוד, בכדקה, ומקבלים הצעה מסודרת אחרי שיחה קצרה. אין התחייבות במילוי הטופס.',
      },
      {
        q: 'איפה מתקיימים המפגשים?',
        a: 'בדרך כלל אצלכם, במקום שבו הקבוצה נפגשת ממילא. אם מתאים יותר מפגש מרחוק, נבדוק את זה יחד בשיחה. סדנה מעשית עובדת הכי טוב פנים אל פנים, כי אפשר לעזור לכל משתתף ליד המסך שלו.',
      },
      {
        q: 'מה נשאר אצל המשתתפים אחרי המפגש?',
        a: 'המצגת, דף תרגול עם התרגילים שעשינו, וקישורים לכלים שהוצגו. כך אפשר לחזור על התרגול בבית ולהמשיך מאותה נקודה, גם בלי מנחה לידכם.',
      },
    ],
  },
  form: {
    title: 'קבלו הצעה',
    lead: 'כמה שאלות קצרות, רובן בלחיצה, כדי שאוכל להכין הצעה. על רוב השאלות אפשר לדלג.',
    stepOf: (n, total) => `שאלה ${n} מתוך ${total}`,
    next: 'הבא',
    back: 'הקודם',
    skip: 'עוד לא יודעים, דלגו',
    submit: 'שלחו בקשה להצעה',
    sending: 'שולח...',
    otherLabel: 'אחר',
    otherPlaceholder: 'כתבו במילים שלכם',
    draftSaved: 'התשובות נשמרות בדפדפן הזה בזמן שאתם ממלאים.',
    clearDraft: 'נקו והתחילו מחדש',
    questions: {
      audience: {
        label: 'מי הקהל?',
        help: 'בחרו את מה שהכי קרוב. אפשר לכתוב "אחר".',
        options: [
          { value: 'org', label: 'צוות בארגון' },
          { value: 'school', label: 'בית ספר או צוות חינוכי' },
          { value: 'community', label: 'קהילה או קבוצת מבוגרים' },
          { value: 'torah', label: 'רבנים, אברכים, בית מדרש' },
          { value: 'parents', label: 'הורים' },
          { value: 'other', label: 'אחר' },
        ],
      },
      size: {
        label: 'כמה משתתפים בערך?',
        help: 'הערכה מספיקה.',
        options: [
          { value: 'up-to-15', label: 'עד 15' },
          { value: '16-40', label: '16 עד 40' },
          { value: '41-100', label: '41 עד 100' },
          { value: '100+', label: 'יותר מ־100' },
        ],
      },
      format: {
        label: 'מה מתאים לכם?',
        help: 'אם אתם לא בטוחים, נחליט יחד בשיחה.',
        options: [
          { value: 'talk', label: 'הרצאה', hint: 'שעה וחצי עד שעתיים' },
          { value: 'workshop', label: 'סדנה מעשית', hint: 'חצי יום' },
          { value: 'torah', label: 'בוקר ללומדי תורה', hint: 'מהות וכלים' },
          { value: 'series', label: 'סדרת מפגשים', hint: 'לצוות' },
          { value: 'unsure', label: 'עוד לא יודעים' },
        ],
      },
      dates: {
        label: 'מתי בערך?',
        help: 'טווח תאריכים, או "גמיש".',
        from: 'מתאריך',
        to: 'עד תאריך',
        flexible: 'אנחנו גמישים',
        error: 'תאריך הסיום צריך להיות אחרי תאריך ההתחלה.',
      },
      place: {
        label: 'איפה?',
        help: 'עיר או יישוב, ואיך תעדיפו להיפגש.',
        cityLabel: 'עיר או יישוב',
        cityPlaceholder: 'למשל: בית שמש',
        options: [
          { value: 'onsite', label: 'אצלנו במקום' },
          { value: 'remote', label: 'מרחוק, בשיחת וידאו' },
          { value: 'unsure', label: 'עוד לא ידוע' },
        ],
      },
      goal: {
        label: 'מה הייתם רוצים שהקבוצה תצא איתו?',
        help: 'אפשר לכתוב, או ללחוץ על המיקרופון ופשוט לדבר. הטקסט יופיע בתיבה ותוכלו לתקן אותו.',
        placeholder: 'למשל: שיבינו מה זה בעצם, וידעו לחפש מקורות בלי ליפול על תשובות מומצאות',
        micStart: 'דברו במקום לכתוב',
        micStop: 'סיום הקלטה',
        micListening: 'מקשיב... דברו בחופשיות',
        micUnsupported: 'הדפדפן הזה לא תומך בהקלטה. אפשר להקליד, או להשתמש במיקרופון של המקלדת בטלפון.',
        micDenied: 'אין הרשאה למיקרופון. אפשר לאשר אותה בהגדרות הדפדפן, או פשוט להקליד.',
      },
      contact: {
        label: 'איך חוזרים אליכם?',
        help: 'שם, ולפחות טלפון או מייל.',
        name: 'שם מלא',
        namePlaceholder: 'למשל: ישראל ישראלי',
        phone: 'טלפון',
        phonePlaceholder: '050-0000000',
        email: 'מייל',
        emailPlaceholder: 'name@example.com',
        org: 'ארגון, מוסד או קהילה (לא חובה)',
        orgPlaceholder: 'למשל: כולל בוקר בבית שמש',
        errorName: 'נא לכתוב שם.',
        errorReach: 'נא להשאיר טלפון או מייל, כדי שאוכל לחזור אליכם.',
        errorEmail: 'כתובת המייל נראית לא תקינה. בדקו שיש בה @ ונקודה.',
        privacy: 'הפרטים ישמשו רק לחזרה אליכם בנוגע לבקשה, והם נשלחים אליי במייל. הטיוטה נשמרת במכשיר הזה עד שתשלחו או תנקו אותה.',
      },
    },
    requiredChoice: 'בחרו אחת מהאפשרויות, או כתבו ב"אחר".',
    review: 'בדקו ושלחו',
    success: {
      title: 'הבקשה הגיעה',
      text: 'תודה! אלעד יחזור אליכם בטלפון או במייל, ונקבע שיחה קצרה כדי לבנות את המפגש.',
      again: 'שליחת בקשה נוספת',
    },
    error: {
      title: 'השליחה לא הצליחה',
      text: 'הבקשה עדיין פתוחה במסך הזה. אפשר לנסות שוב, לחזור לעריכה, או לשלוח בוואטסאפ או במייל.',
      retry: 'לנסות שוב',
      edit: 'חזרה לעריכה',
      whatsapp: 'לשלוח בוואטסאפ',
      email: 'לשלוח במייל',
    },
  },
};

const en: LecturesCopy = {
  meta: {
    title: 'AI Talks and Workshops',
    description:
      'AI talks and workshops in plain language for teams, schools, communities and Torah learners: what AI is, how to use it wisely, and hands-on practice.',
  },
  hero: {
    kicker: 'Talks and workshops',
    title: 'Artificial intelligence, explained properly',
    lead: 'One morning in which your group understands what AI actually is, where it gets things wrong, and how to use it in your own work the very next day. No jargon, with live demos and hands-on practice.',
    cta: 'Get a proposal',
    secondary: 'What you can book',
    note: 'Suitable even for people who have never opened an AI tool.',
    imageAlt:
      'Illustration of a group of learners, most wearing kippot and one a black hat, around a wooden table with open books and a laptop, a facilitator explaining under warm lamp light',
  },
  audiences: {
    title: 'Who it is for',
    lead: 'Each session is rebuilt for its group: the examples come from your world, not from programmers.',
    items: [
      { id: 'org', label: 'Teams in organisations', text: 'Save time on writing, summarising and analysis without exposing sensitive data.' },
      { id: 'school', label: 'Schools and educators', text: 'What students already do with AI, and how teachers use it to prepare materials.' },
      { id: 'community', label: 'Communities and adult groups', text: 'A calm introduction to the tools, and how to spot voice and video fakes and scams.' },
      { id: 'torah', label: 'Rabbis, scholars and study halls', text: 'How AI works, and how it can help find and organise sources in Gemara and halacha.' },
      { id: 'parents', label: 'Parents', text: 'What children meet online, what to know, and how to talk with them about it.' },
    ],
  },
  formats: {
    title: 'Four ways to book',
    lead: 'Every format is shaped around the group. They can also be combined.',
    leaveWith: 'Participants leave with',
    ask: 'Request a proposal for this',
    items: [
      {
        id: 'torah',
        featured: true,
        title: 'AI for Torah scholars: essence and tools',
        duration: 'A morning of about three hours',
        forWhom: 'Rabbis, kollel scholars, teachers and study halls',
        summary:
          'The first half is about essence: what the machine really does when it "answers", the difference between predicting words and understanding, and where the line of trust lies. The second half is practical: tools for finding and organising sources in Gemara and halacha study, and how to verify a citation and its wording against the original, in context. The tools are an aid to learning, not a substitute for study or for psak.',
        takeaways: [
          'A clear sense of what the tool knows and what it only guesses',
          'A practical method for checking citations and their context against the original source',
          'Tools that work in Hebrew, ready to use the same day',
          'The tool helps search and organise. The ruling stays with you',
        ],
      },
      {
        id: 'talk',
        title: 'Talk: AI in plain language',
        duration: '90 minutes to two hours',
        forWhom: 'Any audience, including large ones',
        summary:
          'Where it came from, how it works without formulas, why it sometimes makes things up, and how to protect ourselves from fakes and scams. With live demos on screen.',
        takeaways: ['A clear picture of what AI is and is not', 'Three uses to try tomorrow', 'Simple safety rules'],
      },
      {
        id: 'workshop',
        title: 'Hands-on workshop: working with AI',
        duration: 'Half a day, with a break',
        forWhom: 'Small and medium groups',
        summary:
          'Practice fits the group: each person on their own device, or together on a shared screen. We write good requests, summarise a real document, draft something, and check the result together.',
        takeaways: ['A working tool, for those who want to continue on their own', 'How to write a request that gets a good answer', 'A practice sheet to continue at home'],
      },
      {
        id: 'series',
        title: 'A series for your team',
        duration: 'Three to four sessions',
        forWhom: 'Teams in an organisation or institution',
        summary:
          'Each session focuses on one of your team’s real work processes, and we build it together with the tools. Between sessions the team practises on real tasks.',
        takeaways: ['Workflows built on your own tasks', 'Safe-use guidelines for the team', 'Practice between sessions on real tasks'],
      },
    ],
  },
  recent: {
    title: 'From the field',
    text: 'In November 2026 I gave a three-and-a-half-hour morning on AI to a group of adults from a religious community. The session was built so that everyone left with something they had done themselves.',
    bullets: [
      'The first part with no computers: a short history, how it works, and where it goes wrong',
      'Then we open a tool together and practise, step by step',
      'A printed practice sheet and slides suited to the audience, including audio clips in a male voice only',
    ],
    imageAlt: 'Illustration of a wooden table with a large open book, a phone, a cup of tea and reading glasses in warm lamp light',
  },
  how: {
    title: 'How it works',
    steps: [
      { title: 'A short call', text: 'Fifteen minutes on the phone: who the group is, what matters to you, and what to leave out.' },
      { title: 'Tailored content', text: 'I build the slides and exercises for your audience and send them for review beforehand.' },
      { title: 'The session', text: 'Explanation, live demos and practice. A projector, a speaker and stable internet are needed.' },
      { title: 'Afterwards', text: 'The slides, the practice sheet and links to the tools stay with you.' },
    ],
  },
  about: {
    title: 'Who teaches',
    lines: [
      'Elad Yakobovich, developer and AI engineer. He builds AI systems and automation for businesses and organisations.',
      'Before that he ran his own business for 12 years, so he explains technology in plain, practical language.',
      'A John Bryce Full-Stack graduate with honours, he teaches from what he actually builds, not from other people’s slides.',
    ],
    link: 'More about me',
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Do participants need prior knowledge of computers or AI?',
        a: 'No. The talk starts from zero and explains every idea in plain words. For the hands-on workshop it is enough to know how to open an app on a phone. People who already use the tools get better ways to work with them and to check their answers.',
      },
      {
        q: 'Is the content suitable for a religious or Haredi audience?',
        a: 'Yes. Examples, images and audio are adapted to the audience in advance, and in the first call we go over what fits and what is better left out. The session for rabbis and scholars also includes a discussion of what the tool is in principle, not only technical training, and the tool is presented as an aid for searching and organising, never as the one who decides.',
      },
      {
        q: 'What should participants bring, and what is needed on site?',
        a: 'On site: a projector or large screen, a speaker and a stable internet connection. For the hands-on workshop, whoever wishes brings a phone or a laptop. For people with filtered devices, or who prefer not to open an account, practice runs on a shared screen; we arrange this in advance on the call. If there is no internet on site, the session is built to work without it.',
      },
      {
        q: 'How much does it cost?',
        a: 'The price depends on the length of the session, the size of the group and the location, so there is no fixed price list on the site. Fill in the form at the bottom of the page, it takes about a minute, and you will get a proper proposal after a short call. Filling in the form commits you to nothing.',
      },
      {
        q: 'Where do sessions take place?',
        a: 'Usually at your place, where the group already meets. If a remote session suits you better, we will look at it together on the call. A hands-on workshop works best face to face, because each participant can be helped at their own screen.',
      },
      {
        q: 'What do participants keep after the session?',
        a: 'The slides, a practice sheet with the exercises we did, and links to the tools that were shown. That way they can repeat the practice at home and continue from the same point, even without a facilitator next to them.',
      },
    ],
  },
  form: {
    title: 'Get a proposal',
    lead: 'A few short questions, mostly one tap each, so I can prepare a proposal. Most can be skipped.',
    stepOf: (n, total) => `Question ${n} of ${total}`,
    next: 'Next',
    back: 'Back',
    skip: 'Not sure yet, skip',
    submit: 'Send request',
    sending: 'Sending...',
    otherLabel: 'Other',
    otherPlaceholder: 'In your own words',
    draftSaved: 'Your answers are kept in this browser while you fill them in.',
    clearDraft: 'Clear and start over',
    questions: {
      audience: {
        label: 'Who is the audience?',
        help: 'Pick the closest one. You can write "other".',
        options: [
          { value: 'org', label: 'A team in an organisation' },
          { value: 'school', label: 'A school or educators' },
          { value: 'community', label: 'A community or adult group' },
          { value: 'torah', label: 'Rabbis, scholars, a study hall' },
          { value: 'parents', label: 'Parents' },
          { value: 'other', label: 'Other' },
        ],
      },
      size: {
        label: 'Roughly how many participants?',
        help: 'An estimate is fine.',
        options: [
          { value: 'up-to-15', label: 'Up to 15' },
          { value: '16-40', label: '16 to 40' },
          { value: '41-100', label: '41 to 100' },
          { value: '100+', label: 'More than 100' },
        ],
      },
      format: {
        label: 'What suits you?',
        help: 'If you are not sure, we will decide together on the call.',
        options: [
          { value: 'talk', label: 'A talk', hint: '90 minutes to 2 hours' },
          { value: 'workshop', label: 'Hands-on workshop', hint: 'Half a day' },
          { value: 'torah', label: 'Morning for Torah learners', hint: 'Essence and tools' },
          { value: 'series', label: 'A series of sessions', hint: 'For a team' },
          { value: 'unsure', label: 'Not sure yet' },
        ],
      },
      dates: {
        label: 'Roughly when?',
        help: 'A date range, or "flexible".',
        from: 'From',
        to: 'Until',
        flexible: 'We are flexible',
        error: 'The end date must be after the start date.',
      },
      place: {
        label: 'Where?',
        help: 'Town or city, and how you would like to meet.',
        cityLabel: 'Town or city',
        cityPlaceholder: 'e.g. Beit Shemesh',
        options: [
          { value: 'onsite', label: 'At our place' },
          { value: 'remote', label: 'Remote, by video call' },
          { value: 'unsure', label: 'Not known yet' },
        ],
      },
      goal: {
        label: 'What should the group leave with?',
        help: 'Type, or tap the microphone and just speak. The text appears in the box and you can correct it.',
        placeholder: 'e.g. understand what it really is, and search sources without falling for invented answers',
        micStart: 'Speak instead of typing',
        micStop: 'Stop recording',
        micListening: 'Listening... speak freely',
        micUnsupported: 'This browser does not support recording. You can type, or use your phone keyboard’s microphone.',
        micDenied: 'No microphone permission. You can allow it in the browser settings, or just type.',
      },
      contact: {
        label: 'How do we reach you?',
        help: 'A name, and at least a phone or an email.',
        name: 'Full name',
        namePlaceholder: 'e.g. Sarah Cohen',
        phone: 'Phone',
        phonePlaceholder: '050-0000000',
        email: 'Email',
        emailPlaceholder: 'name@example.com',
        org: 'Organisation, institution or community (optional)',
        orgPlaceholder: 'e.g. Morning kollel, Beit Shemesh',
        errorName: 'Please write a name.',
        errorReach: 'Please leave a phone or an email so I can get back to you.',
        errorEmail: 'That email address looks wrong. Check it has an @ and a dot.',
        privacy: 'Your details are used only to reply about your request, and reach me by email. The draft stays on this device until you send or clear it.',
      },
    },
    requiredChoice: 'Pick one of the options, or write under "Other".',
    review: 'Review and send',
    success: {
      title: 'Your request arrived',
      text: 'Thank you! Elad will get back to you by phone or email, and we will set a short call to shape the session.',
      again: 'Send another request',
    },
    error: {
      title: 'Sending failed',
      text: 'Your request is still open on this screen. Try again, go back to edit, or send by WhatsApp or email.',
      retry: 'Try again',
      edit: 'Back to edit',
      whatsapp: 'Send on WhatsApp',
      email: 'Send by email',
    },
  },
};

export const LECTURES_COPY: Record<LecturesLocale, LecturesCopy> = { he, en };

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
export const CONTACT = {
  whatsapp: '972525427474',
  phoneDisplay: '052-542-7474',
  email: 'eladhiteclearning@gmail.com',
};
