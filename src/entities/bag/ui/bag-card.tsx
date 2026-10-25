"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bag } from "@/shared/types";
import { formatCurrency, formatDimensions } from "@/shared/lib";
import { Badge } from "@/shared/ui";

export interface BagCardProps {
  bag: Bag;
  onQuickView?: (bag: Bag) => void;
}

export function BagCard({ bag, onQuickView }: BagCardProps) {
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const currentColor = bag.colors[activeColorIdx] || bag.colors[0];

  return (
    <article className="group flex flex-col bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all duration-200">
      {/* Product Image Frame */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[var(--bg-surface-raised)] border-b border-[var(--border-subtle)]">
        <Link href={`/bags/${bag.slug}`} className="block w-full h-full">
          <Image
            src={currentColor.image}
            alt={`${bag.name} in ${currentColor.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {bag.isBestseller && <Badge variant="accent">Iconic</Badge>}
          {bag.isNewArrival && <Badge variant="neutral">New Edition</Badge>}
        </div>

        {/* Quick View trigger */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(bag)}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 px-3 py-1.5 text-xs uppercase tracking-wider font-medium bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-strong)] shadow-sm hover:bg-[var(--bg-surface-active)]"
          >
            Quick Inspect
          </button>
        )}
      </div>

      {/* Bag Details */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <h3 className="font-serif text-lg tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-cognac)] transition-colors">
              <Link href={`/bags/${bag.slug}`}>{bag.name}</Link>
            </h3>
            <span className="font-mono text-sm font-medium tabular-nums text-[var(--text-primary)]">
              {formatCurrency(bag.priceEur)}
            </span>
          </div>

          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-3">
            {bag.tagline}
          </p>

          {/* Color variant dots */}
          <div className="flex items-center gap-2 pt-1 border-t border-[var(--border-subtle)]">
            <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-mono">
              Color:
            </span>
            <div className="flex items-center gap-1.5">
              {bag.colors.map((color, idx) => (
                <button
                  key={color.id}
                  onClick={() => setActiveColorIdx(idx)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    idx === activeColorIdx
                      ? "ring-1 ring-offset-1 ring-[var(--text-primary)] scale-110"
                      : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: color.hex, borderColor: "var(--border-strong)" }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-[var(--text-muted)] font-mono ml-auto">
              {bag.colors[activeColorIdx]?.name}
            </span>
          </div>
        </div>

        {/* Technical specs line */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] tabular-nums">
          <span>{bag.capacityLiters} L</span>
          <span>{formatDimensions(bag.dimensions)}</span>
        </div>
      </div>
    </article>
  );
}
