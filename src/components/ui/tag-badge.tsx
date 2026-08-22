'use client';

import * as React from "react";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TagBadgeProps {
  tag: string;
  variant?: 'default' | 'outline' | 'solid';
  showIcon?: boolean;
  className?: string;
}

/**
 * Reusable Tag Badge Component
 *
 * FIXES:
 * - Inconsistent tag colors across blog posts, blog cards, and project cards
 * - Creates unified tag styling following Material Design 3
 * - Proper semantic HTML with accessibility
 */
export function TagBadge({
  tag,
  variant = 'default',
  showIcon = true,
  className
}: TagBadgeProps) {
  const variantStyles = {
    // `brand-chip` carries the plate + foreground explicitly. `bg-primary/10`
    // was silently generating no rule at all, so this pill had no background
    // and its contrast tracked whatever was behind it.
    default: "brand-chip",
    outline: "bg-transparent text-primary border-primary",
    solid: "bg-primary text-primary-foreground border-transparent",
  };

  return (
    <span
      className={cn(
        // Base styles - Material Design 3
        "inline-flex items-center gap-1 rounded-full border px-3 py-1",
        "text-sm font-medium transition-colors",
        variantStyles[variant],
        className
      )}
    >
      {showIcon && <Tag className="h-3 w-3" aria-hidden="true" />}
      {tag}
    </span>
  );
}
