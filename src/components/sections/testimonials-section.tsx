'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Cohen',
    role: 'Product Manager',
    company: 'TechStart IL',
    content:
      'Elad delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise in React and Next.js made the development process smooth and efficient.',
    rating: 5,
    avatar: 'SC',
  },
  {
    id: 2,
    name: 'David Levi',
    role: 'CEO',
    company: 'EduTech Solutions',
    content:
      'Working with Elad on our educational platform was a great experience. He brought creative solutions to complex problems and delivered a high-quality product on time.',
    rating: 5,
    avatar: 'DL',
  },
  {
    id: 3,
    name: 'Maya Shapira',
    role: 'CTO',
    company: 'Digital Innovations',
    content:
      'Elad combines strong technical skills with excellent communication. He understood our business needs and translated them into a beautiful, functional application.',
    rating: 5,
    avatar: 'MS',
  },
  {
    id: 4,
    name: 'Yoni Berger',
    role: 'Founder',
    company: 'StartupHub',
    content:
      'The portfolio website Elad built for us is both visually stunning and incredibly fast. His use of modern technologies like Three.js and Framer Motion added a premium feel to the project.',
    rating: 5,
    avatar: 'YB',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = testimonials[current];
  if (!testimonial) return null;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/30 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            What People Say
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Feedback from clients and collaborators
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-2 rounded-full bg-card border border-border shadow-md hover:bg-primary hover:text-primary-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-2 rounded-full bg-card border border-border shadow-md hover:bg-primary hover:text-primary-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Testimonial Card */}
          <div className="relative min-h-[280px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={testimonial.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-full"
              >
                <div className="relative p-8 md:p-10 rounded-2xl bg-card border border-border/50 shadow-lg">
                  {/* Quote icon */}
                  <Quote className="absolute top-4 right-4 h-10 w-10 text-primary/10" aria-hidden="true" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  index === current
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === current ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
