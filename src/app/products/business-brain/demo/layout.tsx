import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מוח עסקי לארגונים, הדגמה אינטראקטיבית",
  description:
    "הדגמה חיה של המוח העסקי לתנועות וארגונים: מעקב תורמים, לוגיסטיקת כנסים, תיאום מתנדבים וסיכומי הנהלה, בממשק צ'אט. נתונים לדוגמה בלבד.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BusinessBrainDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
