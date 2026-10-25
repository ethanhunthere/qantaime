"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Bag, FilterState } from "@/shared/types";
import { BagCard, BagSpecsTable } from "@/entities/bag";
import { FilterBar } from "@/features/filter-bags";
import { Modal, Button } from "@/shared/ui";
import { formatCurrency } from "@/shared/lib";
import { useLanguage } from "@/features/language";

interface BagGridProps {
  initialBags: Bag[];
}

export function BagGrid({ initialBags }: BagGridProps) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    search: "",
    sortBy: "curated",
    maxPrice: 2500,
  });

  const [inspectBag, setInspectBag] = useState<Bag | null>(null);

  const filteredBags = useMemo(() => {
    return initialBags
      .filter((bag) => {
        if (filters.category !== "all" && bag.category !== filters.category) {
          return false;
        }
        if (filters.search.trim()) {
          const q = filters.search.toLowerCase();
          const matches =
            bag.name.toLowerCase().includes(q) ||
            bag.tagline.toLowerCase().includes(q) ||
            bag.leatherType.toLowerCase().includes(q) ||
            bag.hardwareOptions.some((h) => h.name.toLowerCase().includes(q));
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.priceEur - b.priceEur;
        if (filters.sortBy === "price-desc") return b.priceEur - a.priceEur;
        if (filters.sortBy === "capacity") return b.capacityLiters - a.capacityLiters;
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [initialBags, filters]);

  return (
    <section id="catalog" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6 sm:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-[var(--accent-cognac)] block">
            {t.catalogTitle}
          </span>
          <h2 className="font-sans font-medium uppercase text-2xl sm:text-3xl md:text-4xl tracking-[0.06em] leading-[1.05] text-[#1A1614] mt-1">
            {t.catalogSubtitle}
          </h2>
        </div>
        <p className="text-xs font-mono text-[var(--text-secondary)] max-w-md">
          {t.catalogDesc}
        </p>
      </div>

      {/* Unified Page-Level Control Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        totalResults={filteredBags.length}
      />

      {/* Product Grid */}
      {filteredBags.length === 0 ? (
        <div className="p-8 sm:p-12 text-center border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
          <p className="font-sans font-medium uppercase text-base tracking-[0.06em] text-[#1A1614]">
            {t.noBagsFound}
          </p>
          <p className="text-xs font-mono text-[var(--text-secondary)]">
            {t.noBagsSubtitle}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredBags.map((bag) => (
            <BagCard
              key={bag.id}
              bag={bag}
              onQuickView={(b) => setInspectBag(b)}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {inspectBag && (
        <Modal
          isOpen={!!inspectBag}
          onClose={() => setInspectBag(null)}
          title={`Planimetria: ${inspectBag.name}`}
        >
          <div className="space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
              <div>
                <h3 className="font-sans font-medium uppercase text-lg sm:text-xl tracking-[0.06em] text-[#1A1614]">{inspectBag.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{inspectBag.tagline}</p>
              </div>
              <span className="font-mono text-lg sm:text-xl font-bold tabular-nums text-[var(--text-primary)]">
                {formatCurrency(inspectBag.priceEur)}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              {inspectBag.description}
            </p>

            <BagSpecsTable bag={inspectBag} />

            <div className="pt-2 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-2.5">
              <Button variant="outline" size="sm" onClick={() => setInspectBag(null)} className="w-full sm:w-auto min-h-[42px] rounded-none">
                Mbyll
              </Button>
              <Link href={`/bags/${inspectBag.slug}`} className="w-full sm:w-auto">
                <Button variant="primary" size="sm" className="w-full sm:w-auto min-h-[42px] rounded-none">
                  {t.acquirePiece}
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
