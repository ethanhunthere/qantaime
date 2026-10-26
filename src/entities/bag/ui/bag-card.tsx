"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Bag, CartItem } from "@/shared/types";
import { formatCurrency } from "@/shared/lib";
import { useLanguage } from "@/features/language";
import { useCart } from "@/features/cart";

export interface BagCardProps {
  bag: Bag;
  onQuickView?: (bag: Bag) => void;
}

function getCategoryLabel(
  category: string,
  slug: string,
  t: {
    catWallet: string;
    catBriefcase: string;
    catTote: string;
    catCrossbody: string;
    catWeekender: string;
    catBackpack: string;
    catLuxury: string;
  }
): string {
  if (slug.includes("cardholder") || slug.includes("porte-monnaie") || slug.includes("wallet")) {
    return t.catWallet;
  }
  switch (category) {
    case "briefcase":
      return t.catBriefcase;
    case "tote":
      return t.catTote;
    case "crossbody":
      return t.catCrossbody;
    case "weekender":
      return t.catWeekender;
    case "backpack":
      return t.catBackpack;
    default:
      return t.catLuxury;
  }
}

export function BagCard({ bag, onQuickView }: BagCardProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const currentColor = bag.colors[activeColorIdx] || bag.colors[0];
  const categoryLabel = getCategoryLabel(bag.category, bag.slug, t);

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
    <article className="group flex flex-col bg-[var(--bg-surface)] border border-[var(--border-strong)] hover:border-[var(--text-primary)] transition-[box-shadow] duration-150 shadow-xs hover:shadow-md overflow-hidden">
      {/* Product Image Frame — Strict 1:1 Square with Paint Isolation */}
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

        {/* Clear Category Badge so users instantly know what each bag is */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] font-semibold bg-[var(--text-primary)] text-[var(--bg-canvas)] border border-[var(--border-subtle)] shadow-xs">
            {categoryLabel}
          </span>
          {bag.isBestseller && (
            <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.12em] bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-strong)] shadow-xs">
              {t.bestseller}
            </span>
          )}
        </div>

        {/* Quick View trigger */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(bag)}
            className="absolute bottom-2.5 right-2.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150 px-2.5 sm:px-3 py-1 sm:py-1.5 font-sans font-medium text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-strong)] shadow-sm hover:bg-[var(--bg-surface-active)] min-h-[32px] flex items-center touch-manipulation cursor-pointer"
          >
            {t.quickInspect}
          </button>
        )}
      </div>

      {/* Bag Details: Rich, Distinct, Art-Directed Hierarchy */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 sm:gap-3.5">
        <div className="space-y-1.5">
          {/* Category Micro-tag + Capacity */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
            <span className="uppercase tracking-[0.14em] font-medium text-[var(--accent-cognac)]">
              {categoryLabel}
            </span>
            {bag.capacityLiters > 0 && (
              <span className="tabular-nums tracking-wider text-[var(--text-muted)]">
                {bag.capacityLiters} L
              </span>
            )}
          </div>

          {/* Bold Distinct Bag Title */}
          <h3 className="font-sans font-semibold text-[15px] sm:text-[16px] uppercase tracking-[0.05em] text-[var(--text-primary)] leading-tight truncate">
            <Link
              href={`/bags/${bag.slug}`}
              className="hover:underline decoration-1 underline-offset-4 transition-all"
            >
              {bag.name}
            </Link>
          </h3>

          {/* Distinctive Silhouette & Function Tagline */}
          <p className="font-sans text-xs text-[var(--text-secondary)] line-clamp-1 leading-normal">
            {bag.tagline}
          </p>

          {/* High-Contrast Price */}
          <div className="pt-1">
            <p className="font-mono font-bold text-[15px] sm:text-[16px] tabular-nums tracking-[0.02em] text-[var(--text-primary)]">
              {formatCurrency(bag.priceEur)}
            </p>
          </div>
        </div>

        {/* Color Swatches with Active Color Name Display */}
        <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border-subtle)] text-[10px] font-mono">
          <span className="text-[var(--text-secondary)] truncate max-w-[150px] sm:max-w-[180px]">
            {t.leatherLabel} <strong className="text-[var(--text-primary)] font-medium">{currentColor.name}</strong>
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {bag.colors.map((color, idx) => (
              <button
                key={color.id}
                onClick={() => setActiveColorIdx(idx)}
                className="py-1 inline-flex items-center justify-center touch-manipulation cursor-pointer"
                title={color.name}
                aria-label={`${t.selectColorAria} ${color.name}`}
              >
                <span
                  className={`w-4 sm:w-5 h-2.5 rounded-none border transition-all ${
                    idx === activeColorIdx
                      ? "border-[var(--text-primary)] ring-1 ring-[var(--text-primary)] scale-110"
                      : "border-[var(--border-strong)] opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-2">
          <button
            onClick={handleQuickAdd}
            className="flex-1 flex items-center justify-center gap-1.5 h-10 sm:h-9 px-3 font-sans font-medium text-[11px] uppercase tracking-[0.16em] bg-[var(--text-primary)] text-[var(--bg-canvas)] hover:opacity-90 active:scale-[0.98] transition-[transform,opacity] duration-100 cursor-pointer select-none touch-manipulation"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.addToCarry}</span>
          </button>
          <Link
            href={`/bags/${bag.slug}`}
            className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 border border-[var(--border-strong)] hover:bg-[var(--bg-surface-raised)] text-[var(--text-primary)] transition-transform duration-100 active:scale-95 touch-manipulation"
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
