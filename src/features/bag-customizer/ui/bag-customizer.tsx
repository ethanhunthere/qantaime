"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Bag, CartItem } from "@/shared/types";
import { formatCurrency } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { useCart } from "@/features/cart";
import { useLanguage } from "@/features/language";

interface BagCustomizerProps {
  bag: Bag;
}

export function BagCustomizer({ bag }: BagCustomizerProps) {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [selectedColor, setSelectedColor] = useState(bag.colors[0]);
  const [selectedHardware, setSelectedHardware] = useState(bag.hardwareOptions[0]);
  const [monogram, setMonogram] = useState("");
  const [enableMonogram, setEnableMonogram] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const MONOGRAM_FEE_EUR = 45;
  const unitPrice = bag.priceEur + (enableMonogram && monogram.trim().length > 0 ? MONOGRAM_FEE_EUR : 0);

  const handleAddToCart = () => {
    const finalMonogram = enableMonogram && monogram.trim().length > 0 ? monogram.trim().toUpperCase() : undefined;
    const cartItemId = `${bag.id}-${selectedColor.id}-${selectedHardware.id}-${finalMonogram || "none"}`;

    const cartItem: CartItem = {
      id: cartItemId,
      bagId: bag.id,
      bagName: bag.name,
      slug: bag.slug,
      color: selectedColor,
      hardware: selectedHardware,
      monogram: finalMonogram,
      unitPriceEur: unitPrice,
      quantity: 1,
      image: selectedColor.image,
    };

    addItem(cartItem);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 sm:p-6 md:p-8">
      {/* Visual Preview Frame */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)]">
        <Image
          src={selectedColor.image}
          alt={`${bag.name} in ${selectedColor.name}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-all duration-300"
        />
        {enableMonogram && monogram.trim().length > 0 && (
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#1A1614] text-[#d4af37] px-2.5 sm:px-3 py-1 font-mono text-xs tracking-[0.20em] uppercase font-normal border border-[#d4af37]/40 shadow-lg">
            INITIALS: {monogram.trim().toUpperCase()}
          </div>
        )}
      </div>

      {/* Configuration Controls */}
      <div className="space-y-5 sm:space-y-6">
        {/* Color Choice */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-[var(--text-secondary)]">
              {t.patinaStep}
            </span>
            <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
              {selectedColor.name}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
            {bag.colors.map((color) => {
              const isSelected = color.id === selectedColor.id;
              return (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`flex items-center gap-2.5 p-2 sm:p-2.5 min-h-[44px] border text-left transition-all touch-manipulation rounded-none ${
                    isSelected
                      ? "border-[#1A1614] bg-[var(--bg-surface-raised)] ring-1 ring-[#1A1614]"
                      : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <span
                    className="w-5 h-3 rounded-none border border-[var(--border-strong)] shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs font-mono text-[var(--text-primary)] truncate">
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hardware Finishing */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-[var(--text-secondary)]">
              {t.hardwareStep}
            </span>
            <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
              {selectedHardware.name}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {bag.hardwareOptions.map((hw) => {
              const isSelected = hw.id === selectedHardware.id;
              return (
                <button
                  key={hw.id}
                  onClick={() => setSelectedHardware(hw)}
                  className={`p-2.5 min-h-[44px] flex items-center justify-center text-xs font-mono border text-center transition-all touch-manipulation rounded-none ${
                    isSelected
                      ? "border-[#1A1614] bg-[var(--bg-surface-raised)] font-medium ring-1 ring-[#1A1614]"
                      : "border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-secondary)]"
                  }`}
                >
                  {hw.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bespoke Hot-Stamping Monogram */}
        <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
          <label className="flex items-center gap-2 cursor-pointer select-none min-h-[36px] touch-manipulation">
            <input
              type="checkbox"
              checked={enableMonogram}
              onChange={(e) => setEnableMonogram(e.target.checked)}
              className="accent-[var(--accent-cognac)] w-4 h-4 cursor-pointer"
            />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)]">
              {t.monogramCheck}
            </span>
          </label>

          {enableMonogram && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <input
                type="text"
                maxLength={3}
                placeholder="ABC"
                value={monogram}
                onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                className="w-28 h-11 px-3 text-center uppercase tracking-widest font-mono text-base sm:text-sm bg-[var(--bg-surface-raised)] border border-[var(--border-strong)] text-[var(--text-primary)] focus-visible:border-[var(--text-primary)]"
              />
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                {t.monogramDesc}
              </span>
            </div>
          )}
        </div>

        {/* Pricing Summary & Action */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
              {t.totalPrice}
            </span>
            <p className="font-mono text-2xl font-bold tabular-nums text-[var(--text-primary)]">
              {formatCurrency(unitPrice)}
            </p>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={handleAddToCart}
            className="w-full sm:w-auto min-w-[220px] min-h-[48px] rounded-none"
          >
            {isAddedFeedback ? (
              <span className="flex items-center gap-1.5 text-stone-300">
                <Check className="w-4 h-4" /> {t.addedToCarry}
              </span>
            ) : (
              t.addToCarry
            )}
          </Button>
        </div>

        {/* Guarantee and dispatch indicators */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[var(--text-muted)] pt-3 border-t border-[var(--border-subtle)]">
          <span className="tracking-wider uppercase">
            [AUTENTICITET I GARANTUAR]
          </span>
          <span className="tracking-wider uppercase">
            [DËRGESË E SIGURUAR ME KORRIER]
          </span>
        </div>
      </div>
    </div>
  );
}
