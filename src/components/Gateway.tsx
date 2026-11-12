"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Landing pages that people reach from a shared link (WhatsApp, email) and that
 * must open straight on their content: no entry screen, no music control.
 * The lectures page is sent to Torah-observant audiences and community groups; a cinematic gate
 * with sound is the wrong first impression there.
 */
const NO_GATE_PREFIXES = ["/lectures", "/en/lectures"];

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
 *    סורק מגיע, האתר פשוט נטען כרגיל. שער כניסה לעולם לא יחסום תוכן.
 *
 *  - `sessionStorage` דואג שזה יקרה פעם אחת בביקור. שער של ארבע שניות בכל
 *    ניווט הופך במהירות לעונש, ולכן הוא רץ רק בכניסה הראשונה.
 */
export default function Gateway({
  theme,
}: {
  theme: "personal" | "ops" | "portfolio";
}): null {
  const pathname = usePathname() ?? "";
  const skip = NO_GATE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  useEffect(() => {
    if (skip) return;
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
  }, [theme, skip]);

  return null;
}
