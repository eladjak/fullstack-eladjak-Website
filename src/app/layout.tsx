import { GeistSans } from "geist/font/sans";
import { Assistant, Heebo } from "next/font/google";
import { type Metadata } from "next";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { AuthProvider } from "@/lib/auth";
import { StructuredData, structuredDataGenerators } from "@/components/seo/structured-data";
import { WebVitalsReporter } from "@/components/analytics/web-vitals-reporter";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { LocaleProvider } from "@/components/providers/locale-provider";
import "@/styles/globals.css";

const heebo = Heebo({
  subsets: ['hebrew'],
  variable: '--font-heebo',
});

const assistant = Assistant({
  subsets: ['hebrew'],
  variable: '--font-assistant',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elad Ya'akobovitch | Full-Stack Developer",
    template: "%s | Elad Ya'akobovitch",
  },
  description: "Full-Stack Developer specializing in Next.js, React, and TypeScript. Building modern web applications with creative vision and business insight.",
  keywords: ["Full-Stack Developer", "Next.js", "React", "TypeScript", "Web Development", "Israel", "JavaScript", "Software Engineer"],
  authors: [{ name: "Elad Ya'akobovitch", url: SITE_URL }],
  creator: "Elad Ya'akobovitch",
  publisher: "Elad Ya'akobovitch",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Elad Ya'akobovitch | Full-Stack Developer",
    description: "Full-Stack Developer specializing in Next.js, React, and TypeScript",
    type: "website",
    url: SITE_URL,
    siteName: "Elad Ya'akobovitch Portfolio",
    locale: "he_IL",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Elad Ya'akobovitch - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elad Ya'akobovitch | Full-Stack Developer",
    description: "Full-Stack Developer specializing in Next.js, React, and TypeScript",
    images: [`${SITE_URL}/og-image.png`],
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
        <StructuredData data={structuredDataGenerators.person("Elad Ya'akobovitch", SITE_URL, "Full-Stack Developer & Software Engineer")} />
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Elad Portfolio" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <WebVitalsReporter />
        <LocaleProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <Navigation />
              <div className="pt-16">
                {children}
              </div>
              <Footer />
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
