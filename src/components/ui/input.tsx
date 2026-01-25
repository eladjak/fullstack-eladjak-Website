'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, helperText, ...props }, ref) => {
    const inputId = React.useId();
    const helperTextId = `${inputId}-helper`;

    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            // Base styles - Material Design 3 aligned
            "flex w-full rounded-md border bg-background px-3 py-2",
            "text-sm ring-offset-background file:border-0 file:bg-transparent",
            "file:text-sm file:font-medium placeholder:text-muted-foreground",
            // Focus states - WCAG AA compliant
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            // Disabled state
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Error state
            error
              ? "border-destructive focus-visible:ring-destructive"
              : "border-input",
            className
          )}
          ref={ref}
          aria-invalid={error}
          aria-describedby={helperText ? helperTextId : undefined}
          {...props}
        />
        {helperText && (
          <p
            id={helperTextId}
            className={cn(
              "mt-1 text-xs",
              error ? "text-destructive" : "text-muted-foreground"
            )}
            role={error ? "alert" : undefined}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
