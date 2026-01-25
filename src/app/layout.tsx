import { GeistSans } from "geist/font/sans";
import { Assistant, Heebo } from "next/font/google";
import { type Metadata } from "next";
import Navigation from "@/components/ui/navigation";
import { AuthProvider } from "@/lib/auth";
import "@/styles/globals.css";

const heebo = Heebo({
  subsets: ['hebrew'],
  variable: '--font-heebo',
});

const assistant = Assistant({
  subsets: ['hebrew'],
  variable: '--font-assistant',
});

export const metadata: Metadata = {
  title: "Elad Ya'akobovitch | Full-Stack Developer",
  description: "Full-Stack Developer specializing in Next.js, React, and TypeScript. Building modern web applications with creative vision and business insight.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Elad Ya'akobovitch | Full-Stack Developer",
    description: "Full-Stack Developer specializing in Next.js, React, and TypeScript",
    type: "website",
    url: "https://fullstack-eladjak.co.il",
    siteName: "Elad Ya'akobovitch Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${heebo.variable} ${assistant.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          <Navigation />
          <div className="pt-16">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
