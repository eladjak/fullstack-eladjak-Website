'use client';

import { Github, Linkedin, Mail, Globe, Heart, Code2, ArrowUp, Download } from 'lucide-react';
import Link from 'next/link';
import { SocialLink } from './social-link';
import { useLocale, useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { NewsletterSignup } from '@/components/widgets/NewsletterSignup';
import dynamic from 'next/dynamic';
import { toggleLocaleInPath } from '@/lib/locale-path';

const AgentNetworkStatus = dynamic(
  () => import('@/components/widgets/AgentNetworkStatus').then((m) => m.AgentNetworkStatus),
  { ssr: false }
);

export default function Footer() {
  const locale = useLocale();
  const tFooter = useTranslations('footer');
  const tNav = useTranslations('nav');
  const footerPath = (path: string) =>
    locale === 'en' ? toggleLocaleInPath(path, 'en') : path;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerNavLinks = [
    { href: footerPath('/'), label: tNav('home') },
    { href: footerPath('/services'), label: tNav('services') },
    { href: footerPath('/projects'), label: tNav('projects') },
    { href: footerPath('/blog'), label: tNav('blog') },
    { href: footerPath('/about'), label: tNav('about') },
    { href: footerPath('/contact'), label: tNav('contact') },
    { href: footerPath('/thanks'), label: tNav('thanks') },
    { href: footerPath('/guide'), label: tNav('guides') },
  ];

  const cvHref = '/cv-elad-yaakobovitch.html';

  return (
    <footer className="footer-plate relative w-full border-t border-border/30 backdrop-blur-sm" role="contentinfo">
      {/* Decorative gradient line at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container px-4 md:px-6 pt-12 pb-24 md:pt-16 md:pb-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <ScrollAnimate>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Code2 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-glow">Elad Ya&apos;akobovitch</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                {tFooter('description')}
              </p>
              <div className="flex gap-3">
                <SocialLink href="https://github.com/eladjak" icon={Github} label="GitHub Profile" />
                <SocialLink href="https://linkedin.com/in/eladjak" icon={Linkedin} label="LinkedIn Profile" />
                <SocialLink href="mailto:eladhiteclearning@gmail.com" icon={Mail} label="Send Email" />
                <SocialLink href="https://fullstack-eladjak.co.il" icon={Globe} label="Portfolio Website" />
              </div>
              <div className="mt-4 pt-4 border-t border-border/30 text-xs text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground/80">{tFooter('relatedProjects')}</p>
                <ul className="space-y-0.5">
                  <li><a href="https://www.eladjak.com" target="_blank" rel="noopener noreferrer" className="wow-underline inline-block hover:text-primary transition-colors">{tFooter('personalHub')}</a></li>
                  <li><a href="https://www.sipurai.ai" target="_blank" rel="noopener noreferrer" className="wow-underline inline-block hover:text-primary transition-colors">{tFooter('aiStorybooks')}</a></li>
                  <li><a href="https://ohlove.co.il" target="_blank" rel="noopener noreferrer" className="wow-underline inline-block hover:text-primary transition-colors">{tFooter('relationshipArt')}</a></li>
                  <li><a href="https://www.facebook.com/eladjak1" target="_blank" rel="noopener noreferrer" className="wow-underline inline-block hover:text-primary transition-colors">Facebook</a></li>
                  <li><a href="https://www.youtube.com/@KamiMesenger" target="_blank" rel="noopener noreferrer" className="wow-underline inline-block hover:text-primary transition-colors">YouTube</a></li>
                </ul>
              </div>
            </div>
          </ScrollAnimate>

          {/* Navigation */}
          <ScrollAnimate delay={0.05}>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {tFooter('navigation')}
              </h3>
              <ul className="space-y-2">
                {footerNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="wow-underline inline-block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={cvHref}
                    download
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                    aria-label={tFooter('downloadCv')}
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    {tFooter('downloadCv')}
                  </a>
                </li>
              </ul>
            </div>
          </ScrollAnimate>

          {/* Tech Stack */}
          <ScrollAnimate delay={0.15}>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {tFooter('builtWith')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="brand-chip inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200 cursor-default"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </ScrollAnimate>

          {/* Newsletter */}
          <ScrollAnimate delay={0.2}>
            <NewsletterSignup />
          </ScrollAnimate>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            &copy; {currentYear} {tFooter('copyright')}
            <Heart className="h-3 w-3 text-destructive inline" aria-hidden="true" />
            {tFooter('andCoffee')}
          </p>

          <div className="flex items-center gap-3">
            {/* Live agent network status */}
            <AgentNetworkStatus />

            {/* Accessibility statement, IS 5568 requirement */}
            <Link
              href={footerPath('/accessibility')}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1"
            >
              {tFooter('accessibilityStatement')}
            </Link>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1"
              aria-label={tFooter('scrollToTop')}
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
              {tFooter('backToTop')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
