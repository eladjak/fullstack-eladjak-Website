'use client';

import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode[];
  /** Auto-advance interval in ms (0 = disabled) */
  autoPlay?: number;
  /** Show navigation dots */
  showDots?: boolean;
  /** Show arrow buttons */
  showArrows?: boolean;
  /** Items visible at once per breakpoint */
  itemsPerView?: { mobile: number; tablet: number; desktop: number };
  /** Gap between items in px */
  gap?: number;
  className?: string;
}

export function Carousel({
  children,
  autoPlay = 0,
  showDots = true,
  showArrows = true,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 24,
  className = '',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(itemsPerView.mobile);
  const [containerWidth, setContainerWidth] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = children.length;
  const maxIndex = Math.max(0, totalItems - visibleItems);

  // Measure container width
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Responsive items per view
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleItems(itemsPerView.desktop);
      } else if (width >= 768) {
        setVisibleItems(itemsPerView.tablet);
      } else {
        setVisibleItems(itemsPerView.mobile);
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, [itemsPerView]);

  // Clamp index when visibleItems changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex],
  );

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (autoPlay <= 0) return;
    timerRef.current = setInterval(goNext, autoPlay);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, goNext]);

  // Pause auto-play on hover
  const pauseAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const resumeAutoPlay = () => {
    if (autoPlay <= 0) return;
    timerRef.current = setInterval(goNext, autoPlay);
  };

  // Touch/swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]!.clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0]!.clientX;
    if (Math.abs(diff) > 50) {
      const isRTL = document.documentElement.dir === 'rtl';
      if (isRTL ? diff < 0 : diff > 0) goNext();
      else goPrev();
    }
  };

  // Calculate pixel-based dimensions
  const totalGap = gap * (visibleItems - 1);
  const itemWidthPx = containerWidth > 0
    ? (containerWidth - totalGap) / visibleItems
    : 0;
  const slideOffset = currentIndex * (itemWidthPx + gap);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Track */}
      <div ref={containerRef} className="overflow-hidden" role="region" aria-label="Carousel">
        <motion.div
          className="flex"
          style={{ gap: `${gap}px` }}
          animate={{ x: -slideOffset }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{ width: itemWidthPx > 0 ? `${itemWidthPx}px` : `${100 / visibleItems}%` }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${totalItems}`}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Arrows */}
      {showArrows && totalItems > visibleItems && (
        <>
          <button
            onClick={goPrev}
            className="absolute top-1/2 -translate-y-1/2 start-0 -ms-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 border border-border/50 backdrop-blur-sm text-foreground/70 hover:text-foreground hover:bg-background shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Previous slide"
          >
            <ChevronRight className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
          </button>
          <button
            onClick={goNext}
            className="absolute top-1/2 -translate-y-1/2 end-0 -me-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 border border-border/50 backdrop-blur-sm text-foreground/70 hover:text-foreground hover:bg-background shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Next slide"
          >
            <ChevronLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && totalItems > visibleItems && (
        <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Carousel pagination">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-foreground/20 hover:bg-foreground/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
