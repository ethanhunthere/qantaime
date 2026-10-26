"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Bag, CartItem } from "@/shared/types";
import { BagCustomizer, CustomizationState } from "@/features/bag-customizer";
import { useLanguage } from "@/features/language";
import { useCart } from "@/features/cart";
import { formatCurrency } from "@/shared/lib";
import { Button } from "@/shared/ui";

interface BagDetailViewProps {
  bag: Bag;
}

export function BagDetailView({ bag }: BagDetailViewProps) {
  const { t } = useLanguage();
  const { addItem, openCart } = useCart();
  const [customization, setCustomization] = useState<CustomizationState>({
    color: bag.colors[0],
    hardware: bag.hardwareOptions[0],
    unitPrice: bag.priceEur,
  });

  const handleMobileQuickAdd = () => {
    const cartItemId = `${bag.id}-${customization.color.id}-${customization.hardware.id}`;
    const cartItem: CartItem = {
      id: cartItemId,
      bagId: bag.id,
      bagName: bag.name,
      slug: bag.slug,
      color: customization.color,
      hardware: customization.hardware,
      unitPriceEur: customization.unitPrice,
      quantity: 1,
      image: customization.color.image,
    };
    addItem(cartItem);
    openCart();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-28 lg:pb-16 space-y-4 sm:space-y-6">
      {/* Minimal Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors min-h-[36px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.navWorks}</span>
        </Link>
      </div>

      {/* Luxury Bag / Wallet Name Header */}
      <div className="pb-2 border-b border-[var(--border-subtle)]">
        <h1 className="font-sans font-medium uppercase text-2xl sm:text-3xl lg:text-4xl tracking-[0.06em] text-[var(--text-primary)]">
          {bag.name}
        </h1>
      </div>

      {/* Images & Visual Customizer */}
      <div id="customizer" className="w-full">
        <BagCustomizer bag={bag} onCustomizationChange={setCustomization} />
      </div>

      {/* Mobile Sticky Quick Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3.5 bg-[var(--bg-canvas)] border-t border-[var(--border-strong)] z-30 shadow-2xl flex items-center justify-between gap-3 pb-[calc(0.85rem+env(safe-area-inset-bottom,0px))]">
        <div className="min-w-0 pr-1">
          <span className="text-[11px] font-sans font-medium uppercase tracking-[0.06em] text-[var(--text-primary)] block truncate max-w-[150px]">
            {bag.name}
          </span>
          <p className="font-mono font-bold text-lg tabular-nums text-[var(--text-primary)] leading-tight">
            {formatCurrency(customization.unitPrice)}
          </p>
        </div>
        <Button
          size="md"
          variant="primary"
          onClick={handleMobileQuickAdd}
          className="flex-1 max-w-[210px] min-h-[46px] flex items-center justify-center gap-1.5 touch-manipulation rounded-none shadow-sm cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t.addToCarry}</span>
        </Button>
      </div>
    </div>
  );
}
