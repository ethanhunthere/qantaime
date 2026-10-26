"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/features/cart";
import { useLanguage } from "@/features/language";
import { formatCurrency } from "@/shared/lib";

export function MobileFloatingCart() {
  const pathname = usePathname();
  const { totalItemsCount, totalEur, openCart, isOpen } = useCart();
  const { t } = useLanguage();

  // Hide on checkout, product details (has its own sticky action bar), or when cart is already open / empty
  if (totalItemsCount === 0 || isOpen || pathname === "/checkout" || pathname?.startsWith("/bags/")) {
    return null;
  }

  return (
    <aside
      aria-label="Mobile Cart Quick Access"
      className="md:hidden fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-3 right-3 z-30 pointer-events-auto"
    >
      <button
        type="button"
        onClick={openCart}
        className="w-full min-h-[52px] px-4 py-2.5 flex items-center justify-between bg-[var(--text-primary)] text-[var(--bg-canvas)] shadow-2xl border border-[var(--border-strong)] active:scale-[0.98] transition-transform duration-100 touch-manipulation cursor-pointer select-none"
        aria-label={`${t.yourCarry}: ${totalItemsCount} ${totalItemsCount === 1 ? t.modelSingular : t.modelPlural}, ${formatCurrency(totalEur)}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5 text-[var(--bg-canvas)]" />
            <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--accent-ochre)] text-black text-[10px] font-mono font-bold flex items-center justify-center">
              {totalItemsCount}
            </span>
          </div>
          <div className="flex flex-col text-left truncate">
            <span className="font-sans font-medium text-[10px] uppercase tracking-[0.16em] text-[var(--bg-canvas)] opacity-90 truncate">
              {t.yourCarry}
            </span>
            <span className="font-mono text-xs font-semibold tabular-nums text-[var(--bg-canvas)]">
              {formatCurrency(totalEur)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-sans font-semibold text-xs uppercase tracking-[0.14em] text-[var(--bg-canvas)] pl-3 border-l border-[var(--border-subtle)] shrink-0">
          <span>{t.proceedCheckout}</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </div>
      </button>
    </aside>
  );
}
