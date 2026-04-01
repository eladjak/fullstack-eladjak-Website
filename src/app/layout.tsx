import { GeistSans } from "geist/font/sans";
import { Assistant, Heebo } from "next/font/google";
import { type Metadata, type Viewport } from "next";
import { StructuredData, structuredDataGenerators } from "@/components/seo/structured-data";
import { WebVitalsReporter } from "@/components/analytics/web-vitals-reporter";
import { ClientLayout } from "@/components/providers/client-layout";
import "@/styles/globals.css";

const heebo = Heebo({
  subsets: ['hebrew'],
  variable: '--font-heebo',
  display: 'swap',
  preload: true,
});

const assistant = Assistant({
  subsets: ['hebrew'],
  variable: '--font-assistant',
  display: 'swap',
  preload: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
    template: "%s | אלעד יעקובוביץ'",
  },
  description: "מפתח Full-Stack מומחה ל-Next.js, React ו-TypeScript. בניית אפליקציות ווב מודרניות עם אינטגרציית AI, עיצוב יצירתי וחשיבה עסקית. מגדל העמק, ישראל.",
  keywords: [
    "מפתח Full-Stack",
    "מפתח אתרים",
    "פיתוח אתרים",
    "Next.js",
    "React",
    "TypeScript",
    "בניית אתרים",
    "פיתוח אפליקציות",
    "מפתח ווב ישראל",
    "אינטגרציית AI",
    "פיתוח תוכנה",
    "Full-Stack Developer Israel",
    "אלעד יעקובוביץ'",
    "בניית אתרים מגדל העמק",
  ],
  authors: [{ name: "אלעד יעקובוביץ'", url: SITE_URL }],
  creator: "אלעד יעקובוביץ'",
  publisher: "אלעד יעקובוביץ'",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  alternates: {
    canonical: SITE_URL,
    languages: {
      'he-IL': SITE_URL,
      'en': `${SITE_URL}/en`,
    },
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    title: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
    description: "מפתח Full-Stack מומחה ל-Next.js, React ו-TypeScript. בניית אפליקציות ווב, פתרונות AI ואוטומציה עסקית.",
    type: "website",
    url: SITE_URL,
    siteName: "אלעד יעקובוביץ' - תיק עבודות",
    locale: "he_IL",
    images: [
      {
        url: 'https://avatars.githubusercontent.com/u/108827199?v=4',
        width: 460,
        height: 460,
        alt: "אלעד יעקובוביץ' - מפתח Full-Stack ומומחה AI | ישראל",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
    description: "מפתח Full-Stack מומחה ל-Next.js, React ו-TypeScript. בניית אפליקציות ווב ופתרונות AI.",
    images: ['https://avatars.githubusercontent.com/u/108827199?v=4'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'theme-color': '#050810',
  },
};

export const viewport: Viewport = {
  themeColor: '#050810',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${GeistSans.variable} ${heebo.variable} ${assistant.variable}`}>
      <head>
        <StructuredData data={structuredDataGenerators.website()} />
        <StructuredData data={structuredDataGenerators.person("אלעד יעקובוביץ'", SITE_URL, "מפתח Full-Stack ומומחה AI")} />
        <StructuredData data={structuredDataGenerators.localBusiness()} />
        {/* Preload critical above-the-fold image */}
        <link rel="preload" href="/images/hero-dev.jpg" as="image" />
        {/* hreflang for Hebrew site */}
        <link rel="alternate" hrefLang="he-IL" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="אלעד יעקובוביץ'" />
        <link rel="apple-touch-icon" href="https://avatars.githubusercontent.com/u/108827199?v=4" />
        {/* Geo targeting for Israel */}
        <meta name="geo.region" content="IL" />
        <meta name="geo.placename" content="Migdal HaEmek" />
        <meta name="content-language" content="he" />
      </head>
      <body className="min-h-dvh bg-background font-sans antialiased">
        <WebVitalsReporter />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
