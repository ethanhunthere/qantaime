"use client";

import React, { useState, useTransition } from "react";
import { Lock } from "lucide-react";
import { useCart } from "@/features/cart";
import { submitOrderAction } from "../api/submit-order";
import { ActionState, OrderConfirmation } from "@/shared/types";
import { Button, Input } from "@/shared/ui";
import { OrderSummaryCard } from "@/entities/order";
import { PaymentMethodSelector } from "./payment-method-selector";
import { useLanguage } from "@/features/language";

export function CheckoutForm() {
  const { items, subtotalEur, discountEur, shippingEur, totalEur, clearCart } = useCart();
  const { t } = useLanguage();
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
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 sm:p-6 md:p-8">
      {/* Contact Section */}
      <div className="space-y-4">
        <h3 className="font-sans font-medium uppercase text-sm tracking-[0.06em] text-[#1A1614] pb-2 border-b border-[var(--border-subtle)]">
          {t.collectorInfo}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="fullName"
            name="fullName"
            label={t.fullName}
            placeholder="p.sh. Alban Kastrati"
            required
            error={state?.errors?.fullName?.[0]}
          />
          <Input
            id="email"
            name="email"
            type="email"
            label={t.emailAddress}
            placeholder="alban@kastrati-atelier.com"
            required
            error={state?.errors?.email?.[0]}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="addressLine1"
            name="addressLine1"
            label={t.address}
            placeholder="Rruga Nënë Tereza 14"
            required
            error={state?.errors?.addressLine1?.[0]}
          />
          <Input
            id="addressLine2"
            name="addressLine2"
            label={t.suite}
            placeholder="Kati 3, Banesa 8"
            error={state?.errors?.addressLine2?.[0]}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            id="city"
            name="city"
            label={t.city}
            placeholder="Tiranë / Prishtinë"
            required
            error={state?.errors?.city?.[0]}
          />
          <Input
            id="postalCode"
            name="postalCode"
            label={t.postalCode}
            placeholder="10000"
            required
            error={state?.errors?.postalCode?.[0]}
          />
          <Input
            id="country"
            name="country"
            label={t.country}
            placeholder="Shqipëri / Kosovë"
            required
            error={state?.errors?.country?.[0]}
          />
        </div>
        <Input
          id="phone"
          name="phone"
          type="tel"
          label={t.phone}
          placeholder="+355 69 123 4567"
          required
          error={state?.errors?.phone?.[0]}
        />
      </div>

      {/* Handled Transit */}
      <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
        <h3 className="font-sans font-medium uppercase text-sm tracking-[0.06em] text-[#1A1614]">
          {t.transitTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="flex items-start gap-3 p-3.5 border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] cursor-pointer hover:border-[var(--border-strong)]">
            <input type="radio" name="shippingMethod" value="courier" defaultChecked className="mt-1 accent-[var(--accent-cognac)]" />
            <div className="text-xs font-mono">
              <p className="font-semibold text-[var(--text-primary)]">{t.courierWhiteGlove}</p>
              <p className="text-[var(--text-secondary)]">24h Express</p>
            </div>
          </label>
          <label className="flex items-start gap-3 p-3.5 border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] cursor-pointer hover:border-[var(--border-strong)]">
            <input type="radio" name="shippingMethod" value="express" className="mt-1 accent-[var(--accent-cognac)]" />
            <div className="text-xs font-mono">
              <p className="font-semibold text-[var(--text-primary)]">{t.expressAir}</p>
              <p className="text-[var(--text-secondary)]">2-3 Ditë</p>
            </div>
          </label>
          <label className="flex items-start gap-3 p-3.5 border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] cursor-pointer hover:border-[var(--border-strong)]">
            <input type="radio" name="shippingMethod" value="standard" className="mt-1 accent-[var(--accent-cognac)]" />
            <div className="text-xs font-mono">
              <p className="font-semibold text-[var(--text-primary)]">{t.standardGround}</p>
              <p className="text-[var(--text-secondary)]">4-5 Ditë</p>
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
          <span>{t.encryptedGateway}</span>
        </div>
        <Button
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isPending}
          disabled={items.length === 0}
          className="w-full sm:w-auto min-h-[48px] touch-manipulation"
        >
          {paymentMethod === "stripe_bank" ? t.confirmCommission : "Konfirmo Porosinë"}
        </Button>
      </div>
    </form>
  );
}
