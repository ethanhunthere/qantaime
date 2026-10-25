"use client";

import React from "react";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { CartItem } from "@/shared/types";
import { formatCurrency } from "@/shared/lib";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  return (
    <div className="flex gap-3 sm:gap-4 py-3.5 sm:py-4 border-b border-[var(--border-subtle)] items-start">
      {/* Thumbnail */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] shrink-0 overflow-hidden">
        <Image src={item.image} alt={item.bagName} fill className="object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <h4 className="font-sans font-medium uppercase text-xs tracking-[0.08em] text-[var(--text-primary)] leading-tight truncate">
          {item.bagName}
        </h4>
        <div className="text-[10px] sm:text-[11px] font-mono text-[var(--text-secondary)] space-y-0.5">
          <p>Leather: {item.color.name}</p>
          <p>Hardware: {item.hardware.name}</p>
          {item.monogram && (
            <p className="text-[var(--accent-cognac)] font-medium">Monogram: [{item.monogram}]</p>
          )}
        </div>

        {/* Stepper + Price */}
        <div className="flex items-center justify-between pt-1.5 sm:pt-2">
          <div className="flex items-center border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 sm:p-2 min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center hover:bg-[var(--bg-surface-active)] text-[var(--text-secondary)] touch-manipulation"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-xs font-mono tabular-nums text-[var(--text-primary)]">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 sm:p-2 min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center hover:bg-[var(--bg-surface-active)] text-[var(--text-secondary)] touch-manipulation"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs font-semibold tabular-nums text-[var(--text-primary)]">
              {formatCurrency(item.unitPriceEur * item.quantity)}
            </span>
          </div>
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-[var(--text-muted)] hover:text-red-600 transition-colors touch-manipulation -mr-1"
        title="Remove item"
        aria-label="Remove item"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
