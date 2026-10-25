"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/features/cart";
import { CheckoutForm } from "@/features/checkout";
import { formatCurrency } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { useLanguage } from "@/features/language";

export function CheckoutView() {
  const { items, subtotalEur, discountEur, shippingEur, totalEur } = useCart();
  const { t } = useLanguage();
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 space-y-6">
        <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-12 space-y-6">
          <div className="w-12 h-12 bg-[var(--bg-surface-raised)] border border-[var(--border-strong)] flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-[#1A1614]" />
          </div>
          <div className="space-y-2">
            <h1 className="font-sans font-medium uppercase text-xl sm:text-2xl tracking-[0.06em] leading-[1.05] text-[#1A1614]">
              {t.emptyCarry}
            </h1>
            <p className="text-xs font-mono text-[var(--text-secondary)]">
              {t.emptyCarryDesc}
            </p>
          </div>
          <Link href="/" className="inline-block">
            <Button variant="primary" size="md" className="rounded-none">
              {t.heroCtaCatalog}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-16 space-y-6 sm:space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors min-h-[32px]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.navWorks}</span>
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)] font-medium">{t.checkoutTitle}</span>
      </div>

      {/* Mobile Collapsible Summary Banner */}
      <div className="lg:hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden shadow-xs">
        <button
          onClick={() => setShowMobileSummary((prev) => !prev)}
          className="w-full flex items-center justify-between p-4 text-xs font-mono text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] transition-colors touch-manipulation"
          aria-expanded={showMobileSummary}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[var(--accent-cognac)]" />
            <span className="font-medium">{t.yourCarry} ({items.length})</span>
            {showMobileSummary ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
          <span className="font-bold tabular-nums text-sm text-[#1A1614]">{formatCurrency(totalEur)}</span>
        </button>

        {showMobileSummary && (
          <div className="p-4 border-t border-[var(--border-subtle)] space-y-4 bg-[var(--bg-surface-raised)]">
            <div className="divide-y divide-[var(--border-subtle)] space-y-2.5">
              {items.map((item) => (
                <div key={item.id} className="pt-2 flex justify-between gap-3 text-xs font-mono">
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{item.bagName}</p>
                    <p className="text-[var(--text-secondary)] text-[10px]">
                      {item.color.name} / Sasia: {item.quantity}
                    </p>
                  </div>
                  <span className="tabular-nums font-medium text-[var(--text-primary)]">
                    {formatCurrency(item.unitPriceEur * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--border-subtle)] pt-3 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>{t.subtotal}</span>
                <span className="tabular-nums">{formatCurrency(subtotalEur)}</span>
              </div>
              {discountEur > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>{t.privilegeDiscount}</span>
                  <span className="tabular-nums">-{formatCurrency(discountEur)}</span>
                </div>
              )}
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>{t.courierTransit}</span>
                <span className="tabular-nums">
                  {shippingEur === 0 ? t.complimentary : formatCurrency(shippingEur)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Secure Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>

        {/* Right: Itemized Carry Breakdown (Desktop persistent) */}
        <div className="hidden lg:block lg:col-span-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-6">
          <h2 className="font-sans font-medium uppercase text-sm tracking-[0.06em] text-[#1A1614] pb-3 border-b border-[var(--border-subtle)]">
            {t.yourCarry} ({items.length} {items.length === 1 ? "Model" : "Modele"})
          </h2>

          <div className="divide-y divide-[var(--border-subtle)] space-y-3">
            {items.map((item) => (
              <div key={item.id} className="pt-3 flex justify-between gap-3 text-xs font-mono">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{item.bagName}</p>
                  <p className="text-[var(--text-secondary)] text-[11px]">
                    {item.color.name} / {item.hardware.name}
                  </p>
                  {item.monogram && (
                    <p className="text-[var(--accent-cognac)] text-[10px]">
                      Iniciale: [{item.monogram}]
                    </p>
                  )}
                  <span className="text-[var(--text-muted)] text-[10px]">
                    Sasia: {item.quantity}
                  </span>
                </div>
                <div className="text-right">
                  <span className="tabular-nums font-medium text-[var(--text-primary)]">
                    {formatCurrency(item.unitPriceEur * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="border-t border-[var(--border-subtle)] pt-4 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{t.subtotal}</span>
              <span className="tabular-nums">{formatCurrency(subtotalEur)}</span>
            </div>
            {discountEur > 0 && (
              <div className="flex justify-between text-green-700">
                <span>{t.privilegeDiscount}</span>
                <span className="tabular-nums">-{formatCurrency(discountEur)}</span>
              </div>
            )}
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{t.courierTransit}</span>
              <span className="tabular-nums">
                {shippingEur === 0 ? t.complimentary : formatCurrency(shippingEur)}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold text-[var(--text-primary)] pt-3 border-t border-[var(--border-subtle)]">
              <span>{t.totalEstimated}</span>
              <span className="tabular-nums">{formatCurrency(totalEur)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
