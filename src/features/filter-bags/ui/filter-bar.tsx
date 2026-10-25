"use client";

import React from "react";
import { Search, SlidersHorizontal, RotateCcw, X } from "lucide-react";
import { BagCategory, FilterState } from "@/shared/types";
import { useLanguage } from "@/features/language";

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
}

export function FilterBar({ filters, onFilterChange, totalResults }: FilterBarProps) {
  const { t } = useLanguage();

  const categories: { id: BagCategory; label: string }[] = [
    { id: "all", label: t.allWorks },
    { id: "briefcase", label: t.catBriefcase },
    { id: "tote", label: t.catTote },
    { id: "weekender", label: t.catWeekender },
    { id: "crossbody", label: t.catCrossbody },
    { id: "backpack", label: t.catBackpack },
  ];

  const handleCategoryClick = (cat: BagCategory) => {
    onFilterChange({ ...filters, category: cat });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, sortBy: e.target.value as FilterState["sortBy"] });
  };

  const handleReset = () => {
    onFilterChange({
      category: "all",
      search: "",
      sortBy: "curated",
      maxPrice: 2500,
    });
  };

  const isFiltered =
    filters.category !== "all" ||
    filters.search !== "" ||
    filters.sortBy !== "curated";

  return (
    <div className="w-full space-y-2.5">
      {/* Control Panel (Constant height, zero layout shift) */}
      <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 sm:p-4 space-y-3 sm:space-y-4 shadow-xs">
        {/* Top tier: Category tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar w-full -mx-1 px-1 touch-pan-x">
          {categories.map((cat) => {
            const isActive = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-3 py-2 sm:py-1.5 font-sans font-medium text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-all whitespace-nowrap min-h-[36px] flex items-center touch-manipulation cursor-pointer ${
                  isActive
                    ? "bg-[var(--text-primary)] text-[var(--bg-canvas)] shadow-xs"
                    : "bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-active)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Bottom tier: Search input + Sorting selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[var(--border-subtle)]">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="search"
              placeholder={t.searchPlaceholder}
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full h-11 pl-9 pr-9 font-sans text-base sm:text-xs bg-[var(--bg-surface-raised)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus-visible:border-[var(--text-primary)] outline-none"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, search: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                title="Pastro kërkimin"
                aria-label="Pastro kërkimin"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
              <span className="font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] whitespace-nowrap hidden sm:inline">
                {t.sortLabel}
              </span>
              <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="h-11 flex-1 sm:flex-none px-3 font-sans text-base sm:text-[11px] uppercase tracking-[0.10em] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] border border-[var(--border-subtle)] outline-none focus-visible:border-[var(--text-primary)] cursor-pointer"
              >
                <option value="curated">{t.sortCurated}</option>
                <option value="price-asc">{t.sortPriceAsc}</option>
                <option value="price-desc">{t.sortPriceDesc}</option>
                <option value="capacity">{t.sortCapacity}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Meta Information Bar (Placed below panel — prevents any panel height change) */}
      <div className="flex items-center justify-between min-h-[22px] px-1 text-xs font-mono text-[var(--text-secondary)]">
        <span className="tabular-nums text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
          {totalResults} {totalResults === 1 ? "Model" : "Modele"}
        </span>
        {isFiltered ? (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 font-sans font-medium text-[11px] uppercase tracking-[0.16em] text-[var(--text-primary)] hover:opacity-70 transition-opacity cursor-pointer"
            title="Pastro të gjithë filtrat"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.resetFilters}</span>
          </button>
        ) : (
          <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] opacity-60">
            Koleksioni i plotë
          </span>
        )}
      </div>
    </div>
  );
}
