"use client";

import React, { useState } from "react";
import { Building2, CreditCard, ShieldCheck } from "lucide-react";
import { Input } from "@/shared/ui";
import { useLanguage } from "@/features/language";

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onChangeMethod: (method: "stripe_bank" | "card" | "apple_pay" | "wire") => void;
  errors?: Record<string, string[]>;
}

export function PaymentMethodSelector({
  selectedMethod,
  onChangeMethod,
  errors,
}: PaymentMethodSelectorProps) {
  const { t } = useLanguage();
  const [iban, setIban] = useState("");
  const [holder, setHolder] = useState("");
  const [bic, setBic] = useState("");

  const handleIbanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\s+/g, "").toUpperCase();
    const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
    setIban(formatted);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
      <div className="flex items-center justify-between pb-1">
        <h3 className="font-sans font-medium uppercase text-sm tracking-[0.06em] text-[var(--text-primary)]">
          {t.paymentTitle}
        </h3>
        <span className="text-[10px] font-mono text-[var(--accent-cognac)] uppercase tracking-wider flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Stripe Verified
        </span>
      </div>

      {/* Grid of payment options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Stripe Pay with Bank (Primary) */}
        <label
          className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-[border-color,box-shadow] duration-100 ${
            selectedMethod === "stripe_bank"
              ? "border-[var(--text-primary)] bg-[var(--bg-surface-raised)] ring-1 ring-[var(--text-primary)]"
              : "border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--bg-surface)]"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="stripe_bank"
            checked={selectedMethod === "stripe_bank"}
            onChange={() => onChangeMethod("stripe_bank")}
            className="mt-1 accent-[var(--accent-cognac)]"
          />
          <div className="text-xs font-mono">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
              <Building2 className="w-4 h-4 text-[var(--accent-cognac)]" />
              <span>{t.stripeBankTitle}</span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {t.stripeBankSub}
            </p>
          </div>
        </label>

        {/* Credit Card */}
        <label
          className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-[border-color,box-shadow] duration-100 ${
            selectedMethod === "card"
              ? "border-[var(--text-primary)] bg-[var(--bg-surface-raised)] ring-1 ring-[var(--text-primary)]"
              : "border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--bg-surface)]"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={selectedMethod === "card"}
            onChange={() => onChangeMethod("card")}
            className="mt-1 accent-[var(--accent-cognac)]"
          />
          <div className="text-xs font-mono">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
              <CreditCard className="w-4 h-4 text-[var(--text-secondary)]" />
              <span>{t.cardTitle}</span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {t.cardSub}
            </p>
          </div>
        </label>

        {/* Apple Pay */}
        <label
          className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-[border-color,box-shadow] duration-100 ${
            selectedMethod === "apple_pay"
              ? "border-[var(--text-primary)] bg-[var(--bg-surface-raised)] ring-1 ring-[var(--text-primary)]"
              : "border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--bg-surface)]"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="apple_pay"
            checked={selectedMethod === "apple_pay"}
            onChange={() => onChangeMethod("apple_pay")}
            className="mt-1 accent-[var(--accent-cognac)]"
          />
          <div className="text-xs font-mono">
            <p className="font-semibold text-[var(--text-primary)]">Apple Pay</p>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {t.fastBiometric}
            </p>
          </div>
        </label>

        {/* Traditional Wire */}
        <label
          className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-[border-color,box-shadow] duration-100 ${
            selectedMethod === "wire"
              ? "border-[var(--text-primary)] bg-[var(--bg-surface-raised)] ring-1 ring-[var(--text-primary)]"
              : "border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--bg-surface)]"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="wire"
            checked={selectedMethod === "wire"}
            onChange={() => onChangeMethod("wire")}
            className="mt-1 accent-[var(--accent-cognac)]"
          />
          <div className="text-xs font-mono">
            <p className="font-semibold text-[var(--text-primary)]">{t.directWire}</p>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {t.wireInvoice}
            </p>
          </div>
        </label>
      </div>

      {/* Conditional Sub-form for Stripe Bank Payment */}
      {selectedMethod === "stripe_bank" && (
        <div className="p-5 bg-[var(--bg-surface-raised)] border border-[var(--border-strong)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest border border-[var(--border-strong)] px-1.5 py-0.5">
                SECURE
              </span>
              <span className="text-xs font-mono font-medium text-[var(--text-primary)] uppercase tracking-wider">
                {t.stripeBankTitle}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
              SEPA, ACH & FINANCIAL CONNECTIONS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="stripeBankHolder"
              name="stripeBankHolder"
              label={t.accountHolder}
              placeholder="p.sh. Alban Berisha"
              value={holder}
              onChange={(e) => setHolder(e.target.value)}
              error={errors?.stripeBankHolder?.[0]}
              required
            />
            <Input
              id="stripeBankBic"
              name="stripeBankBic"
              label={t.bicSwift}
              placeholder="p.sh. PRBKXKPRXXX"
              value={bic}
              onChange={(e) => setBic(e.target.value.toUpperCase())}
            />
          </div>

          <Input
            id="stripeBankIban"
            name="stripeBankIban"
            label={t.accountIban}
            placeholder="XK05 1501 0000 1234 5678"
            value={iban}
            onChange={handleIbanChange}
            error={errors?.stripeBankIban?.[0]}
            required
          />

          <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)] space-y-1.5 leading-relaxed">
            <p className="font-semibold text-[var(--text-primary)]">
              {t.stripeAuth}
            </p>
            <p>{t.stripeNotice}</p>
          </div>
        </div>
      )}
    </div>
  );
}
