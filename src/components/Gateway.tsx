"use client";

import { useEffect } from "react";

/**
 * מסך הכניסה.
 *
 * למה זה קומפוננטה זעירה שרק טוענת סקריפט, ולא רכיב React מלא:
 *
 *  - השער חייב להיות מסוגל לרוץ גם באתרים שאינם React. אותו `gateway.js`
 *    בדיוק משרת את ההאב האישי, את הפורטפוליו ואת ההאב התפעולי שמוגש
 *    משירות פייתון. גרסה אחת, לא שלוש שמתפצלות.
 *
 *  - הוא נטען אחרי שהדף כבר אינטראקטיבי (`defer`) ומצייר את עצמו מעל הכל.
 *    התוכן קיים ב-DOM מתחתיו כל הזמן: אם הסקריפט נכשל, אם JS כבוי, או אם
 *    סורק מגיע — האתר פשוט נטען כרגיל. שער כניסה לעולם לא יחסום תוכן.
 *
 *  - `sessionStorage` דואג שזה יקרה פעם אחת בביקור. שער של ארבע שניות בכל
 *    ניווט הופך במהירות לעונש, ולכן הוא רץ רק בכניסה הראשונה.
 */
export default function Gateway({
  theme,
}: {
  theme: "personal" | "ops" | "portfolio";
}): null {
  useEffect(() => {
    const w = window as unknown as {
      Gateway?: { mount: (o: { theme: string }) => void };
    };
    if (w.Gateway) {
      w.Gateway.mount({ theme });
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-gateway="1"]',
    );
    const onReady = () => w.Gateway?.mount({ theme });
    if (existing) {
      existing.addEventListener("load", onReady, { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = "/gateway.js";
    s.defer = true;
    s.dataset.gateway = "1";
    s.addEventListener("load", onReady, { once: true });
    document.head.appendChild(s);
  }, [theme]);

  return null;
}
