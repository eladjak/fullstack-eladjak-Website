'use client';

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Globe, BookOpen, Code, Coffee } from "lucide-react";
import { useMetaTags } from '@/hooks/useMetaTags';

export default function AboutPage() {
  useMetaTags({
    title: 'About Me | Full-Stack Developer',
    description: 'Learn more about my journey, skills, and experience as a full-stack developer.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
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
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Passionate about creating elegant solutions to complex problems through code.
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
                className="prose max-w-2xl mt-8"
              >
                <h2 className="text-2xl font-bold mb-4">My Journey</h2>
                <p className="text-gray-500 mb-6">
                  With several years of experience in full-stack development, I've worked on a wide range of projects from small business websites to large-scale enterprise applications. My passion lies in creating intuitive, performant, and scalable web applications that solve real-world problems.
                </p>
                <p className="text-gray-500">
                  I specialize in modern web technologies including React, Next.js, Node.js, and various cloud platforms. I'm particularly interested in building responsive, accessible applications that provide excellent user experiences across all devices and platforms.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex space-x-4 mt-8"
              >
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
                <a
                  href="https://yourwebsite.com"
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
