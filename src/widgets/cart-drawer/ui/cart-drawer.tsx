"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Drawer, Button } from "@/shared/ui";
import { formatCurrency } from "@/shared/lib";
import { useCart, CartItemRow, CouponInput } from "@/features/cart";

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

  return (
    <Drawer isOpen={isOpen} onClose={closeCart} title="Your Atelier Carry" position="right">
      {items.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-[var(--text-muted)]" />
          </div>
          <div className="space-y-1">
            <p className="font-serif text-lg text-[var(--text-primary)]">Your carry is currently empty.</p>
            <p className="text-xs font-mono text-[var(--text-secondary)]">
              Explore our architectural bag collection to select your piece.
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={closeCart}>
            Explore Silhouettes
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
                <span>Subtotal</span>
                <span className="tabular-nums">{formatCurrency(subtotalEur)}</span>
              </div>
              {discountEur > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Privilege Discount</span>
                  <span className="tabular-nums">-{formatCurrency(discountEur)}</span>
                </div>
              )}
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Courier Transit</span>
                <span className="tabular-nums">
                  {shippingEur === 0 ? "Complimentary" : formatCurrency(shippingEur)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[var(--text-primary)] pt-2 border-t border-[var(--border-subtle)]">
                <span>Estimated Total</span>
                <span className="tabular-nums">{formatCurrency(totalEur)}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/checkout" onClick={closeCart} className="block w-full">
                <Button size="lg" variant="primary" className="w-full justify-between group">
                  <span>Proceed to Commission</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
