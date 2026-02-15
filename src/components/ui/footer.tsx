'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe, Heart, Code2, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { SocialLink } from './social-link';

const footerLinks = {
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  tools: [
    { href: '/ai-tools', label: 'AI Tools' },
    { href: '/whiteboard', label: 'Whiteboard' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t bg-card/50 backdrop-blur-sm">
      {/* Decorative gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Elad Ya&apos;akobovitch</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Full-Stack Developer specializing in modern web applications.
              Building creative solutions with Next.js, React, and TypeScript.
            </p>
            <div className="flex gap-3">
              <SocialLink href="https://github.com/eladjak" icon={Github} label="GitHub Profile" />
              <SocialLink href="https://linkedin.com/in/eladjak" icon={Linkedin} label="LinkedIn Profile" />
              <SocialLink href="mailto:elad@hiteclearning.co.il" icon={Mail} label="Send Email" />
              <SocialLink href="https://fullstack-eladjak.co.il" icon={Globe} label="Portfolio Website" />
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Tools & Features
            </h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Built With
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            &copy; {currentYear} Elad Ya&apos;akobovitch. Built with
            <Heart className="h-3 w-3 text-destructive inline" aria-hidden="true" />
            and lots of coffee.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
