"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Bag, CartItem } from "@/shared/types";
import { BagCustomizer } from "@/features/bag-customizer";
import { BagSpecsTable } from "@/entities/bag";
import { useLanguage } from "@/features/language";
import { useCart } from "@/features/cart";
import { formatCurrency } from "@/shared/lib";
import { Button } from "@/shared/ui";

interface BagDetailViewProps {
  bag: Bag;
}

export function BagDetailView({ bag }: BagDetailViewProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();

  const handleMobileQuickAdd = () => {
    const defaultColor = bag.colors[0];
    const defaultHw = bag.hardwareOptions[0];
    const cartItem: CartItem = {
      id: `${bag.id}-${defaultColor.id}-${defaultHw?.id || "default"}`,
      bagId: bag.id,
      bagName: bag.name,
      slug: bag.slug,
      color: defaultColor,
      hardware: defaultHw,
      unitPriceEur: bag.priceEur,
      quantity: 1,
      image: defaultColor.image,
    };
    addItem(cartItem);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-16 space-y-8 sm:space-y-12 pb-24 lg:pb-16">
      {/* Breadcrumb navigation */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-[var(--text-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors min-h-[32px]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.navWorks}</span>
        </Link>
        <span>/</span>
        <span className="uppercase text-[var(--text-secondary)]">{bag.category}</span>
        <span>/</span>
        <span className="text-[var(--text-primary)] font-medium truncate max-w-[200px] sm:max-w-none">{bag.name}</span>
      </div>

      {/* Main Grid: Customizer Left & Narrative Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Interactive Customizer & Images */}
        <div id="customizer" className="lg:col-span-7">
          <BagCustomizer bag={bag} />
        </div>

        {/* Narrative & Craftsmanship Blueprint */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          <div>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[var(--accent-cognac)] block mb-1">
              Modeli {bag.category}
            </span>
            <h1 className="font-sans font-medium uppercase text-2xl sm:text-3xl lg:text-4xl tracking-[0.06em] leading-[1.05] text-[#1A1614]">
              {bag.name}
            </h1>
            <p className="font-sans font-normal text-xs sm:text-[14px] text-[#736B62] tracking-[0.02em] uppercase mt-1.5 sm:mt-2">
              {bag.tagline}
            </p>
          </div>

          <div className="font-sans font-light text-[13px] sm:text-[14px] leading-[1.65] tracking-[0.01em] text-[#736B62] space-y-3">
            <p>{bag.description}</p>
          </div>

          {/* Key Architectural Features */}
          <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-[var(--text-primary)]">
              Specifikimet Kryesore
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[var(--text-secondary)]">
              {bag.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2">
                  <span className="text-[var(--text-muted)] select-none">/</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Artisan Notes */}
          <div className="p-3.5 sm:p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-[var(--text-primary)]">
              Shënime & Veçori të Modelit
            </h4>
            <ul className="space-y-1.5 text-xs font-mono text-[var(--text-secondary)]">
              {bag.craftsmanshipNotes.map((note, idx) => (
                <li key={idx} className="leading-relaxed flex items-start gap-2">
                  <span className="text-[var(--text-muted)] select-none">[{String(idx + 1).padStart(2, "0")}]</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Specifications Blueprint Table */}
          <BagSpecsTable bag={bag} />
        </div>
      </div>

      {/* Mobile Sticky Quick Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3.5 bg-[var(--bg-canvas)] border-t border-[var(--border-strong)] z-30 shadow-lg flex items-center justify-between gap-3 pb-[calc(0.85rem+env(safe-area-inset-bottom,0px))]">
        <div>
          <span className="text-[9px] font-mono uppercase text-[var(--text-muted)] block">Çmimi</span>
          <p className="font-mono font-bold text-lg tabular-nums text-[#1A1614]">
            {formatCurrency(bag.priceEur)}
          </p>
        </div>
        <Button
          size="md"
          variant="primary"
          onClick={handleMobileQuickAdd}
          className="flex-1 max-w-[200px] min-h-[44px] flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{t.addToCarry}</span>
        </Button>
      </div>
    </div>
  );
}
