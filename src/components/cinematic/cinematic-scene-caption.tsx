'use client';

import { useLocale } from 'next-intl';

/**
 * CinematicSceneCaption, the readable copy that "rests" inside each flight scene.
 *
 * A generously-spaced band that separates the real portfolio sections and gives
 * the camera a long dwell. It carries the scene's eyebrow + title (NOT an <h1>, * the page's single H1 lives in HeroSection). Text sits on a soft glass card so
 * it is fully readable over any bright frame, this is the direct fix for the #1
 * complaint ("text too fast, cramped, cut off"): the band is tall, the copy is
 * centered with room to breathe, and it fades in slowly as its scene arrives.
 *
 * `data-scene` lets the flight engine (and a future audio bed) know which scene
 * the visitor is reading. Decorative-but-readable: it uses <p> not headings.
 */

interface Copy {
  eyebrow: { he: string; en: string };
  title: { he: string; en: string };
  body: { he: string; en: string };
}

const CAPTIONS: Record<string, Copy> = {
  approach: {
    eyebrow: { he: 'המסע מתחיל', en: 'The journey begins' },
    title: { he: 'נקודת אור אחת בחלל', en: 'One point of light' },
    body: {
      he: 'הכול מתחיל מרעיון בודד. גלול פנימה, המצלמה טסה קדימה אל תוך העולם.',
      en: 'It all starts with a single spark. Scroll inward, the camera flies forward into the world.',
    },
  },
  fleet: {
    eyebrow: { he: 'רשת חיה', en: 'A living network' },
    title: { he: 'מפעיל אחד. צי שלם.', en: 'One operator. A whole fleet.' },
    body: {
      he: 'מהמרכז מתגלה קונסטלציה של סוכני AI, כל צומת סוכן, מחוברים בקווי אור, פועמים יחד.',
      en: 'From the core, a constellation of AI agents unfolds, each node an agent, wired in light, pulsing as one.',
    },
  },
  projects: {
    eyebrow: { he: 'מה שנבנה', en: 'What gets built' },
    title: { he: 'שכונות של אור', en: 'Districts of light' },
    body: {
      he: 'האתרים, האפליקציות והמערכות, כל אחד מגדל זוהר בעיר. אנחנו טסים דרכם.',
      en: 'The sites, the apps, the systems, each a glowing tower in the city. We fly straight through them.',
    },
  },
  trust: {
    eyebrow: { he: 'אמון', en: 'Trust' },
    title: { he: 'האולם שמהדהד', en: 'The hall that resonates' },
    body: {
      he: 'המלצות, שותפויות, אנשים אמיתיים. הרגע החם של המסע.',
      en: 'Recommendations, partnerships, real people. The warm chamber of the journey.',
    },
  },
  gate: {
    eyebrow: { he: 'הצעד הבא', en: 'The next step' },
    title: { he: 'השער פתוח', en: 'The gate is open' },
    body: {
      he: 'הגענו. הדלת מוארת ופתוחה, בוא נדבר על מה שנבנה יחד.',
      en: 'We have arrived. The doorway is lit and open, let’s talk about what we build together.',
    },
  },
};

export default function CinematicSceneCaption({ scene }: { scene: keyof typeof CAPTIONS }) {
  const locale = useLocale();
  const lang: 'he' | 'en' = locale === 'en' ? 'en' : 'he';
  const c = CAPTIONS[scene];
  if (!c) return null;

  return (
    // `data-cj-anchor` marks this as a flight anchor: the engine lines the scene's
    // held frame to the moment THIS band is centred in the viewport, so the caption
    // always rests on ITS scene (fixes the "trust caption over the towers" drift).
    // `data-cj-caption` is the inner card the engine fades in/out on its OWN
    // viewport proximity, so two captions are never on screen at once and there is
    // a quiet breathing gap between them.
    <div
      data-scene={scene}
      data-cj-anchor={scene}
      className="cj-caption-band relative z-[1] flex min-h-[92dvh] w-full items-center justify-center px-6 py-24"
    >
      <div className="cj-caption cj-caption-card mx-auto max-w-xl px-8 py-11 text-center sm:px-11 sm:py-12">
        <p className="cj-eyebrow mx-auto mb-5 inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary sm:text-xs">
          {c.eyebrow[lang]}
        </p>
        <p className="text-balance text-3xl font-extrabold leading-[1.12] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] sm:text-4xl md:text-[2.85rem]">
          {c.title[lang]}
        </p>
        <p className="mx-auto mt-5 max-w-md text-pretty text-base leading-[1.75] text-white/75 sm:text-[1.05rem]">
          {c.body[lang]}
        </p>
      </div>
    </div>
  );
}
