'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

const TESTIMONIAL_COUNT = 4;
const RATINGS = [5, 5, 5, 5];
const AVATARS = ['SC', 'DL', 'MS', 'YB'];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const t = useTranslations('testimonials');

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % TESTIMONIAL_COUNT);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + TESTIMONIAL_COUNT) % TESTIMONIAL_COUNT);
  }, []);

  // Auto-advance every 9 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 9000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const rating = RATINGS[current] ?? 5;
  const avatar = AVATARS[current] ?? '';

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
    <section
      id="testimonials"
      className="w-full py-16 md:py-24 lg:py-32 bg-muted/30 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container px-4 md:px-6">
        <ScrollAnimate>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              {t('subtitle')}
            </p>
          </div>
        </ScrollAnimate>

        <div className="relative max-w-3xl mx-auto" role="region" aria-label="Client testimonials carousel">
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
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="relative p-8 md:p-10 rounded-2xl bg-card border border-border/50 shadow-lg">
                  {/* Quote icon */}
                  <Quote
                    className="absolute top-4 right-4 h-10 w-10 text-primary/10"
                    aria-hidden="true"
                  />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6 italic">
                    &ldquo;{t(`items.${current}.content`)}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {t(`items.${current}.name`)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t(`items.${current}.role`)} {t('at')} {t(`items.${current}.company`)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: TESTIMONIAL_COUNT }).map((_, index) => (
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
