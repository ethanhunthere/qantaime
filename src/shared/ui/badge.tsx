import React from "react";
import { cn } from "../lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "accent" | "outline";
}

export function Badge({ className, variant = "neutral", children, ...props }: BadgeProps) {
  const styles = {
    neutral: "bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
    accent: "bg-[var(--accent-cognac)] text-white",
    outline: "border border-[var(--border-strong)] text-[var(--text-primary)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-medium select-none",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
