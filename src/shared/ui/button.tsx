"use client";

import React from "react";
import { cn } from "../lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium uppercase tracking-[0.18em] transition-all duration-150 select-none whitespace-nowrap outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--accent-cognac)] focus-visible:ring-offset-2";

    const variantStyles = {
      primary:
        "bg-[var(--text-primary)] text-[var(--bg-canvas)] hover:opacity-90 shadow-sm",
      secondary:
        "bg-[var(--bg-surface-raised)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-active)] border border-[var(--border-subtle)]",
      outline:
        "bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)] hover:bg-[var(--bg-surface-raised)]",
      ghost:
        "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)]",
      accent:
        "bg-[var(--accent-cognac)] text-white hover:brightness-105 shadow-sm",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-[11px]",
      md: "h-11 px-5 text-[11px]",
      lg: "h-13 px-7 text-[11px]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
