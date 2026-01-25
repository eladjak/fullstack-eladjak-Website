'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, ...props }, ref) => {
    const textareaId = React.useId();
    const helperTextId = `${textareaId}-helper`;

    return (
      <div className="w-full">
        <textarea
          className={cn(
            // Base styles - Material Design 3 aligned
            "flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2",
            "text-sm ring-offset-background placeholder:text-muted-foreground",
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
Textarea.displayName = "Textarea";

export { Textarea };
