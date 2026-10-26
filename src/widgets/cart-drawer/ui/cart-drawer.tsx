"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Drawer, Button } from "@/shared/ui";
import { formatCurrency } from "@/shared/lib";
import { useCart, CartItemRow, CouponInput } from "@/features/cart";
import { useLanguage } from "@/features/language";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    removeItem,
    subtotalEur,
    discountEur,
    shippingEur,
    totalEur,
  } = useCart();
  const { t } = useLanguage();

  return (
    <Drawer isOpen={isOpen} onClose={closeCart} title={t.yourCarry} position="right">
      {items.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
          <div className="w-12 h-12 rounded-none bg-[var(--bg-surface-raised)] border border-[var(--border-strong)] flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-[var(--text-primary)]" />
          </div>
          <div className="space-y-1">
            <p className="font-sans font-medium uppercase text-base tracking-[0.06em] text-[var(--text-primary)]">{t.emptyCarry}</p>
            <p className="text-xs font-mono text-[var(--text-secondary)]">
              {t.emptyCarryDesc}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={closeCart}>
            {t.heroCtaCatalog}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-between">
          {/* Scrollable Items */}
          <div className="divide-y divide-[var(--border-subtle)] overflow-y-auto pr-1">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Footer & Totals */}
          <div className="pt-6 border-t border-[var(--border-subtle)] space-y-4 mt-6">
            <CouponInput />

            <div className="space-y-2 font-mono text-xs">
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
              <div className="flex justify-between font-mono text-[12px] tabular-nums tracking-[0.04em] text-[var(--text-primary)] pt-2 border-t border-[var(--border-subtle)] items-baseline">
                <span className="font-sans font-medium uppercase text-[11px] tracking-[0.18em]">{t.totalEstimated}</span>
                <span className="font-mono text-sm tabular-nums">{formatCurrency(totalEur)}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/checkout" onClick={closeCart} className="block w-full">
                <Button size="lg" variant="primary" className="w-full min-h-[52px] touch-manipulation rounded-none flex items-center justify-center gap-2 cursor-pointer shadow-md">
                  <span>{t.proceedCheckout}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
