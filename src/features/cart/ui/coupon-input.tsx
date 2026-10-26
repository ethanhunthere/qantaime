"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useCart } from "../model/cart-context";

export function CouponInput() {
  const { couponCode, discountPercent, applyCoupon, removeCoupon } = useCart();
  const [inputVal, setInputVal] = useState("");
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const res = applyCoupon(inputVal);
    setFeedback({ message: res.message, isError: !res.success });
    if (res.success) {
      setInputVal("");
    }
  };

  if (couponCode) {
    return (
      <div className="flex items-center justify-between p-2.5 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] text-xs font-mono">
        <div className="flex items-center gap-2 text-[var(--text-primary)]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-cognac)]">[APPLIED]</span>
          <span>Privilege Code: <strong>{couponCode}</strong> ({discountPercent}% off)</span>
        </div>
        <button
          onClick={removeCoupon}
          className="text-[var(--text-muted)] hover:text-red-600 p-0.5"
          aria-label="Remove privilege code"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Privilege code (e.g. ATELIER10)"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setFeedback(null);
            }}
            className="w-full h-10 sm:h-9 px-3 uppercase text-base sm:text-xs font-mono bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus-visible:border-[var(--text-primary)] outline-none"
          />
        </div>
        <button
          type="submit"
          className="h-10 sm:h-9 px-3 text-xs uppercase tracking-wider font-mono bg-[var(--bg-surface-raised)] hover:bg-[var(--bg-surface-active)] text-[var(--text-primary)] border border-[var(--border-subtle)] transition-transform duration-100 active:scale-95 touch-manipulation min-w-[70px]"
        >
          Apply
        </button>
      </form>
      {feedback && (
        <p className={`text-[11px] font-mono ${feedback.isError ? "text-red-600" : "text-green-700"}`}>
          {feedback.message}
        </p>
      )}
    </div>
  );
}
