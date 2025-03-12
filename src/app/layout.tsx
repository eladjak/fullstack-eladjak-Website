import { GeistSans } from "geist/font/sans";
import { Assistant, Heebo } from "next/font/google";
import { type Metadata } from "next";
import Navigation from "@/components/ui/navigation";
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
  title: "John Doe | Full-Stack Developer",
  description: "Professional portfolio showcasing full-stack development projects and expertise",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${heebo.variable} ${assistant.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Navigation />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
