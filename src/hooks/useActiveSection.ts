'use client';

import { useState, useEffect } from 'react';

const SECTION_IDS = ['hero', 'skills', 'projects', 'testimonials', 'cta'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Hook that tracks which section is currently visible in the viewport.
 * Uses IntersectionObserver for efficient scroll tracking.
 * Returns the id of the active section or null if none is in view.
 */
export function useActiveSection(): SectionId | null {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const visibilityMap = new Map<SectionId, number>();

    for (const sectionId of SECTION_IDS) {
      const element = document.getElementById(sectionId);
      if (!element) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visibilityMap.set(sectionId, entry.intersectionRatio);
          }

          // Find the section with the highest visibility ratio
          let maxRatio = 0;
          let maxSection: SectionId | null = null;

          for (const [id, ratio] of visibilityMap) {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxSection = id;
            }
          }

          if (maxSection && maxRatio > 0) {
            setActiveSection(maxSection);
          }
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: '-64px 0px 0px 0px', // Account for fixed nav height
        }
      );

      observer.observe(element);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, []);

  return activeSection;
}
