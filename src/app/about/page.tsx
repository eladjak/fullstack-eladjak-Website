'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  BookOpen,
  Code,
  Coffee,
  Briefcase,
  GraduationCap,
  Palette,
  Rocket,
  Heart,
} from 'lucide-react';
import { SocialLink } from '@/components/ui/social-link';
import { useMetaTags } from '@/hooks/useMetaTags';

const highlights = [
  {
    icon: Code,
    title: 'Technical Skills',
    description: 'Expertise in modern web technologies and full-stack development.',
  },
  {
    icon: BookOpen,
    title: 'Continuous Learning',
    description: 'Always exploring new technologies and best practices.',
  },
  {
    icon: Coffee,
    title: 'Problem Solving',
    description: 'Turning complex challenges into elegant solutions.',
  },
];

const timeline = [
  {
    icon: Palette,
    year: 'Early Career',
    title: 'Arts & Creative Fields',
    description: 'Started in arts and creative fields, developing a strong eye for design and user experience.',
  },
  {
    icon: Briefcase,
    year: 'Mid Career',
    title: 'Business & Marketing',
    description: 'Gained valuable business acumen and client management skills in marketing and entrepreneurship.',
  },
  {
    icon: GraduationCap,
    year: 'Education',
    title: 'John Bryce College',
    description: 'Completed Full-Stack Development certification, mastering modern web technologies.',
  },
  {
    icon: Rocket,
    year: 'Present',
    title: 'Full-Stack Developer',
    description: 'Building modern web applications with Next.js, React, TypeScript, and AI integrations.',
  },
];

const uniqueTraits = [
  {
    title: 'Maturity & Life Experience',
    description: 'Professional and responsible approach to projects',
  },
  {
    title: 'Self-Learning',
    description: 'Always up-to-date with the latest technologies',
  },
  {
    title: 'Creative Thinking',
    description: 'Out-of-the-box solutions thanks to multidisciplinary background',
  },
  {
    title: 'Results-Oriented',
    description: 'Focus on what matters, not on hours worked',
  },
];

export default function AboutPage() {
  useMetaTags({
    title: "About Elad Ya'akobovitch | Full-Stack Developer",
    description:
      "Learn about my journey from arts and business to full-stack development. Combining technical expertise with creative vision.",
    image: 'https://avatars.githubusercontent.com/u/108827199?v=4',
    type: 'profile',
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-8 text-center"
            >
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">About Me</h1>
                <h2 className="text-2xl font-semibold text-primary">Elad Ya&apos;akobovitch</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Full-Stack Developer with John Bryce College certification. Combining technical
                  skills with creative vision and business insight.
                </p>
              </div>

              {/* Highlights */}
              <div className="grid gap-6 md:grid-cols-3 max-w-4xl w-full">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex flex-col items-center space-y-3 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="w-full py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">My Journey</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
                A non-conventional path to software development
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative flex gap-6 pb-10 last:pb-0"
                >
                  {/* Timeline line */}
                  {index < timeline.length - 1 && (
                    <div className="absolute left-6 top-14 w-px h-full bg-border" />
                  )}

                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-primary">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">Experience & Expertise</h2>
                <p className="text-muted-foreground mb-4">
                  Over the years, I&apos;ve developed a variety of projects:
                </p>
                <ul className="text-muted-foreground mb-6 space-y-2 list-none">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">--</span>
                    <span>
                      <strong>HaDerech</strong> - A complete interactive learning platform with
                      course systems, community forums, and practice simulators. Built with Next.js,
                      TypeScript, Supabase, and AI integrations.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">--</span>
                    <span>
                      <strong>Customer Management Systems</strong> - Business applications for
                      managing clients and tasks with Angular and JavaScript
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">--</span>
                    <span>
                      <strong>EduTech Solutions</strong> - Educational technology platforms
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">--</span>
                    <span>
                      <strong>Useful Tools</strong> - Like an interactive Hebrew-Gregorian calendar
                    </span>
                  </li>
                </ul>

                <p className="text-muted-foreground mb-6">
                  My main expertise is in{' '}
                  <strong>Next.js, React, TypeScript, Node.js, and Supabase</strong>, but I&apos;m also
                  proficient in Angular, PostgreSQL, and working with modern APIs.
                </p>
                <p className="text-muted-foreground mb-8">
                  Beyond technology, my experience as a creator, content developer, and businessman
                  taught me to listen to clients, understand real needs, and build solutions that
                  work not just technically, but also from a business perspective.
                </p>
              </motion.div>

              {/* What Makes Me Unique */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">What Makes Me Unique</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {uniqueTraits.map((trait, index) => (
                    <motion.div
                      key={trait.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-4 rounded-lg border border-border/50 bg-card/50 hover:border-primary/30 transition-colors duration-200"
                    >
                      <h3 className="font-semibold text-sm text-primary mb-1">{trait.title}</h3>
                      <p className="text-sm text-muted-foreground">{trait.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Looking For */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10"
              >
                <div className="flex items-start gap-4">
                  <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold mb-3">What I&apos;m Looking For</h2>
                    <p className="text-muted-foreground mb-3">
                      I&apos;m seeking opportunities to work on interesting and challenging projects -
                      whether it&apos;s SaaS development, interactive applications, or complex business
                      systems.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      I&apos;m particularly interested in projects in education, social tech, and
                      developing tools that help people grow.
                    </p>
                    <p className="text-muted-foreground">
                      If you&apos;re looking for an experienced and responsible developer who brings not
                      just technical knowledge, but also business vision and creative thinking - I&apos;d
                      love to hear from you.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="w-full py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4"
            >
              <h3 className="text-xl font-semibold">Connect With Me</h3>
              <div className="flex gap-3">
                <SocialLink
                  href="https://github.com/eladjak"
                  icon={Github}
                  label="GitHub Profile"
                />
                <SocialLink
                  href="https://linkedin.com/in/eladjak"
                  icon={Linkedin}
                  label="LinkedIn Profile"
                />
                <SocialLink
                  href="mailto:elad@hiteclearning.co.il"
                  icon={Mail}
                  label="Send Email"
                />
                <SocialLink
                  href="https://fullstack-eladjak.co.il"
                  icon={Globe}
                  label="Portfolio Website"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
