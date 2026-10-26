import React from "react";
import { cn } from "../lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-xs uppercase tracking-wider font-medium text-[var(--text-secondary)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full h-11 px-3.5 bg-[var(--bg-surface)] text-[var(--text-primary)] text-base sm:text-sm border border-[var(--border-subtle)] outline-none",
            "focus-visible:border-[var(--text-primary)] focus-visible:ring-1 focus-visible:ring-[var(--text-primary)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
