"use client";

import React, { useState, useTransition } from "react";
import { Lock } from "lucide-react";
import { useCart } from "@/features/cart";
import { submitOrderAction } from "../api/submit-order";
import { ActionState, OrderConfirmation } from "@/shared/types";
import { Button, Input } from "@/shared/ui";
import { OrderSummaryCard } from "@/entities/order";
import { PaymentMethodSelector } from "./payment-method-selector";

export function CheckoutForm() {
  const { items, subtotalEur, discountEur, shippingEur, totalEur, clearCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState<OrderConfirmation> | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"stripe_bank" | "card" | "apple_pay" | "wire">("stripe_bank");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitOrderAction(
        items,
        subtotalEur,
        discountEur,
        shippingEur,
        totalEur,
        null,
        formData
      );
      setState(result);
      if (result.success) {
        clearCart();
      }
    });
  };

  if (state?.success && state.data) {
    return (
      <div className="space-y-6">
        <div className="p-4 bg-green-900/10 border border-green-800/30 text-green-900 dark:text-green-300 text-sm font-mono">
          {state.message}
        </div>
        <OrderSummaryCard order={state.data} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 md:p-8">
      {/* Contact Section */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg tracking-tight text-[var(--text-primary)] pb-2 border-b border-[var(--border-subtle)]">
          1. Collector & Delivery Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="fullName"
            name="fullName"
            label="Full Legal Name"
            placeholder="Alexandra Vance"
            required
            error={state?.errors?.fullName?.[0]}
          />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address for Manifest"
            placeholder="alexandra@vance-atelier.com"
            required
            error={state?.errors?.email?.[0]}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="addressLine1"
            name="addressLine1"
            label="Street Address"
            placeholder="42 Rue de l'Université"
            required
            error={state?.errors?.addressLine1?.[0]}
          />
          <Input
            id="addressLine2"
            name="addressLine2"
            label="Apartment / Suite (Optional)"
            placeholder="Floor 3, Door A"
            error={state?.errors?.addressLine2?.[0]}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            id="city"
            name="city"
            label="City"
            placeholder="Paris"
            required
            error={state?.errors?.city?.[0]}
          />
          <Input
            id="postalCode"
            name="postalCode"
            label="Postal / ZIP"
            placeholder="75007"
            required
            error={state?.errors?.postalCode?.[0]}
          />
          <Input
            id="country"
            name="country"
            label="Country"
            placeholder="France"
            required
            error={state?.errors?.country?.[0]}
          />
        </div>
        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Courier Contact Phone"
          placeholder="+33 6 12 34 56 78"
          required
          error={state?.errors?.phone?.[0]}
        />
      </div>

      {/* Handled Transit */}
      <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
        <h3 className="font-serif text-lg tracking-tight text-[var(--text-primary)]">
          2. Handled Transit
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="flex items-start gap-3 p-3.5 border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] cursor-pointer hover:border-[var(--border-strong)]">
            <input type="radio" name="shippingMethod" value="courier" defaultChecked className="mt-1 accent-[var(--accent-cognac)]" />
            <div className="text-xs font-mono">
              <p className="font-semibold text-[var(--text-primary)]">White-Glove Courier</p>
              <p className="text-[var(--text-secondary)]">24h Express Insured</p>
            </div>
          </label>
          <label className="flex items-start gap-3 p-3.5 border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] cursor-pointer hover:border-[var(--border-strong)]">
            <input type="radio" name="shippingMethod" value="express" className="mt-1 accent-[var(--accent-cognac)]" />
            <div className="text-xs font-mono">
              <p className="font-semibold text-[var(--text-primary)]">Priority Air</p>
              <p className="text-[var(--text-secondary)]">2-3 Business Days</p>
            </div>
          </label>
          <label className="flex items-start gap-3 p-3.5 border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] cursor-pointer hover:border-[var(--border-strong)]">
            <input type="radio" name="shippingMethod" value="standard" className="mt-1 accent-[var(--accent-cognac)]" />
            <div className="text-xs font-mono">
              <p className="font-semibold text-[var(--text-primary)]">Standard Ground</p>
              <p className="text-[var(--text-secondary)]">4-5 Business Days</p>
            </div>
          </label>
        </div>
      </div>

      {/* Payment Selection with Stripe Bank Payment */}
      <PaymentMethodSelector
        selectedMethod={paymentMethod}
        onChangeMethod={setPaymentMethod}
        errors={state?.errors}
      />

      {state?.message && !state.success && (
        <p className="text-xs font-mono text-red-600 bg-red-100/10 p-3 border border-red-500/30">
          {state.message}
        </p>
      )}

      {/* Action Footer */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Lock className="w-3.5 h-3.5 text-green-600" />
          <span>256-Bit Encrypted Stripe Infrastructure</span>
        </div>
        <Button
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isPending}
          disabled={items.length === 0}
          className="w-full sm:w-auto"
        >
          {paymentMethod === "stripe_bank" ? "Authorize Bank Payment with Stripe" : "Confirm Commission"}
        </Button>
      </div>
    </form>
  );
}
