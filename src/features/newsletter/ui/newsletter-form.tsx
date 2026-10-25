"use client";

import React, { useState, useTransition } from "react";
import { subscribeNewsletterAction } from "../api/subscribe";
import { ActionState } from "@/shared/types";
import { Button } from "@/shared/ui";

export function NewsletterForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    startTransition(async () => {
      const res = await subscribeNewsletterAction(null, formData);
      setState(res);
      if (res.success) {
        form.reset();
      }
    });
  };

  return (
    <div className="w-full max-w-md space-y-3">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          name="email"
          type="email"
          required
          placeholder="Private dispatch address..."
          className="flex-1 h-11 px-3.5 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] text-base sm:text-xs font-mono text-[var(--text-primary)] focus-visible:border-[var(--text-primary)] outline-none"
        />
        <Button
          type="submit"
          variant="secondary"
          size="md"
          isLoading={isPending}
        >
          Subscribe
        </Button>
      </form>
      {state?.message && (
        <p className={`text-xs font-mono ${state.success ? "text-green-700 dark:text-green-400" : "text-red-600"}`}>
          {state.message}
        </p>
      )}
    </div>
  );
}
