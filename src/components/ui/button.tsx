'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    // CRITICAL FIX: variant and size props were declared but never used!
    // This caused outline buttons to render as default buttons.

    // Variant styles - Material Design 3 aligned
    const variantStyles = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:text-primary",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
    };

    // Size styles - Material Design 3 spacing
    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 py-1 text-xs",
      lg: "h-12 px-6 py-3 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        className={cn(
          // Base styles with proper focus management (WCAG AA)
          "inline-flex items-center justify-center rounded-md font-medium",
          "ring-offset-background transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // Apply variant and size
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
