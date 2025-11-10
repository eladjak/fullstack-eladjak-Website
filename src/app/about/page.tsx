'use client';

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Globe, BookOpen, Code, Coffee } from "lucide-react";
import { useMetaTags } from '@/hooks/useMetaTags';

export default function AboutPage() {
  useMetaTags({
    title: 'About Elad Ya\'akobovitch | Full-Stack Developer',
    description: 'Learn about my journey from arts and business to full-stack development. Combining technical expertise with creative vision.',
    image: 'https://avatars.githubusercontent.com/u/108827199?v=4',
    type: 'profile'
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-8 text-center"
            >
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  About Me
                </h1>
                <h2 className="text-2xl font-semibold text-primary">
                  Elad Ya'akobovitch
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  39-year-old Full-Stack Developer with John Bryce College certification.
                  Combining technical skills with creative vision and business insight.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3 max-w-4xl">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-secondary/50"
                >
                  <Code className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Technical Skills</h3>
                  <p className="text-gray-500 text-center">
                    Expertise in modern web technologies and full-stack development.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-secondary/50"
                >
                  <BookOpen className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Continuous Learning</h3>
                  <p className="text-gray-500 text-center">
                    Always exploring new technologies and best practices.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-secondary/50"
                >
                  <Coffee className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Problem Solving</h3>
                  <p className="text-gray-500 text-center">
                    Turning complex challenges into elegant solutions.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="prose max-w-3xl mt-8 text-left"
              >
                <h2 className="text-2xl font-bold mb-4">Who Am I?</h2>
                <p className="text-gray-500 mb-6">
                  I'm a 39-year-old Full-Stack Developer, graduate of John Bryce College. My path to software development wasn't conventional - I started in the arts and creative fields, and continued through business and marketing. This multidisciplinary experience taught me to think creatively about technical problems and see the bigger picture beyond code.
                </p>

                <h2 className="text-2xl font-bold mb-4">Experience & Expertise</h2>
                <p className="text-gray-500 mb-4">
                  Over the years, I've developed a variety of projects:
                </p>
                <ul className="text-gray-500 mb-6 list-disc pl-6">
                  <li><strong>HaDerech</strong> - A complete interactive learning platform with course systems, community forums, and practice simulators. Built with Next.js 14, TypeScript, Supabase, and AI integrations.</li>
                  <li><strong>Customer Management Systems</strong> - Business applications for managing clients and tasks with Angular and JavaScript</li>
                  <li><strong>EduTech Solutions</strong> - Educational technology platforms</li>
                  <li><strong>Useful Tools</strong> - Like an interactive Hebrew-Gregorian calendar</li>
                </ul>
                <p className="text-gray-500 mb-6">
                  My main expertise is in <strong>Next.js, React, TypeScript, Node.js, and Supabase</strong>, but I'm also proficient in Angular, PostgreSQL, and working with modern APIs.
                </p>
                <p className="text-gray-500 mb-6">
                  Beyond technology, my experience as a creator, content developer, and businessman taught me to listen to clients, understand real needs, and build solutions that work not just technically, but also from a business perspective.
                </p>

                <h2 className="text-2xl font-bold mb-4">My Approach</h2>
                <p className="text-gray-500 mb-4">
                  My development approach is simple: <strong>quality over quantity, results over hours</strong>.
                </p>
                <p className="text-gray-500 mb-6">
                  I believe good code is clean, documented, and maintainable. My job as a developer isn't just to write code that works, but to build solutions that are easy to upgrade, maintain, and extend.
                </p>

                <h3 className="text-xl font-bold mb-3">What Makes Me Unique:</h3>
                <ul className="text-gray-500 mb-6 list-disc pl-6">
                  <li><strong>Maturity & Life Experience</strong> - Professional and responsible approach to projects</li>
                  <li><strong>Self-Learning</strong> - Always up-to-date with the latest technologies</li>
                  <li><strong>Creative Thinking</strong> - Out-of-the-box solutions thanks to multidisciplinary background</li>
                  <li><strong>Results-Oriented</strong> - Focus on what matters, not on hours worked</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">What I'm Looking For</h2>
                <p className="text-gray-500 mb-4">
                  I'm seeking opportunities to work on interesting and challenging projects - whether it's SaaS development, interactive applications, or complex business systems.
                </p>
                <p className="text-gray-500 mb-6">
                  I'm particularly interested in projects in education, social tech, and developing tools that help people grow.
                </p>
                <p className="text-gray-500">
                  If you're looking for an experienced and responsible developer who brings not just technical knowledge, but also business vision and creative thinking - I'd love to hear from you.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex space-x-4 mt-8"
              >
                <a
                  href="https://github.com/eladjak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/eladjak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="mailto:elad@hiteclearning.co.il"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
                <a
                  href="https://fullstack-eladjak.co.il"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800"
                >
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Website</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
