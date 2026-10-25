import React from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";
import { OrderConfirmation } from "@/shared/types";
import { formatCurrency } from "@/shared/lib";

export function OrderSummaryCard({ order }: { order: OrderConfirmation }) {
  return (
    <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
            Order Reference
          </span>
          <p className="font-mono text-base font-semibold text-[var(--text-primary)]">
            {order.orderId}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
            Estimated Delivery
          </span>
          <p className="font-mono text-xs font-medium text-[var(--text-primary)]">
            {order.estimatedDeliveryDate}
          </p>
        </div>
      </div>

      {/* Itemized List */}
      <div className="space-y-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="relative w-16 h-16 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] shrink-0 overflow-hidden">
              <Image src={item.image} alt={item.bagName} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-sm text-[var(--text-primary)] truncate">{item.bagName}</h4>
              <p className="text-[11px] font-mono text-[var(--text-secondary)]">
                {item.color.name} • {item.hardware.name}
              </p>
              {item.monogram && (
                <p className="text-[10px] font-mono text-[var(--accent-cognac)]">
                  Monogram: [{item.monogram}]
                </p>
              )}
            </div>
            <div className="text-right font-mono text-xs tabular-nums text-[var(--text-primary)]">
              <span>{item.quantity} × {formatCurrency(item.unitPriceEur)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stripe Bank Settlement Manifest */}
      {order.stripePaymentDetails && (
        <div className="p-4 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-[var(--accent-cognac)]">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4" /> Stripe Bank Transfer Authorized
            </span>
            <span className="text-[10px] bg-green-900/10 text-green-700 dark:text-green-400 px-2 py-0.5 border border-green-700/20 uppercase font-semibold">
              {order.stripePaymentDetails.status}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
            <div>
              <span className="text-[var(--text-muted)] block text-[10px]">Debited Account</span>
              <span className="text-[var(--text-primary)] font-medium">{order.stripePaymentDetails.maskedIban}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block text-[10px]">Financial Clearinghouse</span>
              <span className="text-[var(--text-primary)] font-medium">{order.stripePaymentDetails.bankName}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block text-[10px]">Stripe Payment Intent</span>
              <span className="text-[var(--text-secondary)]">{order.stripePaymentDetails.stripePaymentIntentId}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block text-[10px]">SEPA Mandate Identifier</span>
              <span className="text-[var(--text-secondary)]">{order.stripePaymentDetails.mandateReference}</span>
            </div>
          </div>
        </div>
      )}

      {/* Totals */}
      <div className="border-t border-[var(--border-subtle)] pt-4 space-y-2 font-mono text-xs">
        <div className="flex justify-between text-[var(--text-secondary)]">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatCurrency(order.subtotalEur)}</span>
        </div>
        {order.discountEur > 0 && (
          <div className="flex justify-between text-green-700">
            <span>Atelier Privilege Discount</span>
            <span className="tabular-nums">-{formatCurrency(order.discountEur)}</span>
          </div>
        )}
        <div className="flex justify-between text-[var(--text-secondary)]">
          <span>Courier Shipping</span>
          <span className="tabular-nums">{order.shippingEur === 0 ? "Complimentary" : formatCurrency(order.shippingEur)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold text-[var(--text-primary)] pt-2 border-t border-[var(--border-subtle)]">
          <span>Total Settled</span>
          <span className="tabular-nums">{formatCurrency(order.totalEur)}</span>
        </div>
      </div>
    </div>
  );
}
