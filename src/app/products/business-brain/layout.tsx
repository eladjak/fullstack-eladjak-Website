import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מוח עסקי — עוזר ניהול עסקי בוואטסאפ",
  description:
    "עוזר AI אישי בוואטסאפ שמכיר את העסק שלך: דו\"ח בוקר, תזכורות לידים וסיכום יום. ומאחוריו בן-אדם. הקמה מלאה + ליווי חודשי, החל מ-₪390 לחודש למייסדים.",
  openGraph: {
    title: "מוח עסקי — עוזר ניהול עסקי בוואטסאפ",
    description:
      "הסוכן האישי שמכיר את העסק שלך ועונה בוואטסאפ. מזכירה חלקית: ₪7,800 לחודש. המוח העסקי שלך: מ-₪390.",
    images: ["/images/business-brain-hero.jpg"],
  },
};

export default function BusinessBrainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
