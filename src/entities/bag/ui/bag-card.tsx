"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Bag, CartItem } from "@/shared/types";
import { formatCurrency } from "@/shared/lib";
import { Badge } from "@/shared/ui";
import { useLanguage } from "@/features/language";
import { useCart } from "@/features/cart";

export interface BagCardProps {
  bag: Bag;
  onQuickView?: (bag: Bag) => void;
}

export function BagCard({ bag, onQuickView }: BagCardProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const currentColor = bag.colors[activeColorIdx] || bag.colors[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem: CartItem = {
      id: `${bag.id}-${currentColor.id}-${bag.hardwareOptions[0]?.id || "default"}`,
      bagId: bag.id,
      bagName: bag.name,
      slug: bag.slug,
      color: currentColor,
      hardware: bag.hardwareOptions[0],
      unitPriceEur: bag.priceEur,
      quantity: 1,
      image: currentColor.image,
    };

    addItem(cartItem);
  };

  return (
    <article className="group flex flex-col bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all duration-300 shadow-xs hover:shadow-md overflow-hidden">
      {/* Product Image Frame — Strict 1:1 Square with Hardware Paint Isolation */}
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--bg-surface-raised)] border-b border-[var(--border-subtle)] [isolation:isolate] [contain:paint]">
        <Link href={`/bags/${bag.slug}`} className="relative block w-full h-full overflow-hidden">
          <Image
            src={currentColor.image}
            alt={`${bag.name} in ${currentColor.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] select-none"
          />
        </Link>

        {/* Authenticity Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {bag.isBestseller && <Badge variant="accent">{t.iconicBadge}</Badge>}
          {bag.isNewArrival && <Badge variant="neutral">{t.newEditionBadge}</Badge>}
        </div>

        {/* Quick View trigger */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(bag)}
            className="absolute bottom-2.5 right-2.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150 px-2.5 sm:px-3 py-1 sm:py-1.5 font-sans font-medium text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-strong)] shadow-sm hover:bg-[var(--bg-surface-active)] min-h-[32px] flex items-center touch-manipulation"
          >
            {t.quickInspect}
          </button>
        )}
      </div>

      {/* Bag Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3.5 sm:gap-4">
        {/* Bag Title & Price */}
        <div className="space-y-1">
          <h3 className="font-sans font-medium text-[14px] uppercase tracking-[0.08em] text-[var(--text-primary)] truncate">
            <Link href={`/bags/${bag.slug}`} className="hover:text-[var(--text-secondary)] transition-colors">
              {bag.name}
            </Link>
          </h3>

          <p className="font-mono font-normal text-[12px] tabular-nums tracking-[0.04em] text-[var(--text-secondary)]">
            {formatCurrency(bag.priceEur)}
          </p>
        </div>

        {/* Architectural Patina Swatches */}
        <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
          <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-mono">
            {t.colorLabel}
          </span>
          <div className="flex items-center gap-1.5">
            {bag.colors.map((color, idx) => (
              <button
                key={color.id}
                onClick={() => setActiveColorIdx(idx)}
                className="py-1 inline-flex items-center justify-center touch-manipulation group/swatch cursor-pointer"
                title={color.name}
                aria-label={`Zgjidh ${color.name}`}
              >
                <span
                  className={`w-4 sm:w-5 h-2 rounded-none border transition-all ${
                    idx === activeColorIdx
                      ? "border-[var(--text-primary)] shadow-xs scale-105"
                      : "border-[var(--border-strong)] opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Footer of Card: Direct Actions */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-2">
          <button
            onClick={handleQuickAdd}
            className="flex-1 flex items-center justify-center gap-1.5 h-10 sm:h-9 px-3 font-sans font-medium text-[11px] uppercase tracking-[0.18em] bg-[var(--text-primary)] text-[var(--bg-canvas)] hover:opacity-90 active:scale-[0.98] transition-all select-none touch-manipulation"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.addToCarry}</span>
          </button>
          <Link
            href={`/bags/${bag.slug}`}
            className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-raised)] text-[var(--text-primary)] transition-colors active:scale-95 touch-manipulation"
            title={t.viewDetails}
            aria-label={t.viewDetails}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
