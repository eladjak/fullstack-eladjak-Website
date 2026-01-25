'use client';

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  className?: string;
}

/**
 * Reusable Social Link Component
 *
 * FIXES:
 * - DRY violation: Was repeated 7 times across page.tsx and about.tsx
 * - Accessibility: Proper aria-label and sr-only text
 * - Design system: Uses design tokens instead of hardcoded colors
 * - Focus management: WCAG AA compliant focus ring
 */
export function SocialLink({ href, icon: Icon, label, className }: SocialLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('https');

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        // Material Design 3 styles
        "inline-flex h-10 w-10 items-center justify-center rounded-full",
        "border border-border bg-card text-card-foreground",
        "transition-colors duration-200",
        "hover:bg-primary hover:text-primary-foreground hover:border-primary",
        // Focus management - WCAG AA
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      aria-label={label}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
