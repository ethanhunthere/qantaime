"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/features/cart";
import { CheckoutForm } from "@/features/checkout";
import { formatCurrency } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { useLanguage } from "@/features/language";

export function CheckoutView() {
  const { items, subtotalEur, discountEur, shippingEur, totalEur } = useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8 text-[var(--text-muted)]" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl text-[var(--text-primary)]">{t.emptyCarry}</h1>
          <p className="text-xs font-mono text-[var(--text-secondary)]">
            {t.emptyCarryDesc}
          </p>
        </div>
        <Link href="/">
          <Button variant="primary" size="md">
            {t.heroCtaCatalog}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.navWorks}</span>
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)] font-medium">{t.checkoutTitle}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Secure Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>

        {/* Right: Itemized Carry Breakdown */}
        <div className="lg:col-span-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-6">
          <h2 className="font-serif text-lg tracking-tight text-[var(--text-primary)] pb-3 border-b border-[var(--border-subtle)]">
            {t.yourCarry} ({items.length} {items.length === 1 ? "Model" : "Modele"})
          </h2>

          <div className="divide-y divide-[var(--border-subtle)] space-y-3">
            {items.map((item) => (
              <div key={item.id} className="pt-3 flex justify-between gap-3 text-xs font-mono">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{item.bagName}</p>
                  <p className="text-[var(--text-secondary)] text-[11px]">
                    {item.color.name} • {item.hardware.name}
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
