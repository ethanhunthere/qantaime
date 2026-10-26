"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, RotateCcw, X, ChevronDown, Check } from "lucide-react";
import { FilterState, BagCategory } from "@/shared/types";
import { useLanguage } from "@/features/language";

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
}

export function FilterBar({ filters, onFilterChange, totalResults }: FilterBarProps) {
  const { t } = useLanguage();
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortOptions: { id: FilterState["sortBy"]; label: string }[] = [
    { id: "curated", label: t.sortCurated },
    { id: "price-asc", label: t.sortPriceAsc },
    { id: "price-desc", label: t.sortPriceDesc },
  ];

  const categoryOptions: { id: BagCategory; label: string }[] = [
    { id: "all", label: t.allWorks },
    { id: "wallet", label: t.catWallet },
    { id: "tote", label: t.catTote },
    { id: "crossbody", label: t.catCrossbody },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    }
    if (sortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleSelectSort = (sortBy: FilterState["sortBy"]) => {
    onFilterChange({ ...filters, sortBy });
    setSortOpen(false);
  };

  const handleSelectCategory = (category: BagCategory) => {
    onFilterChange({ ...filters, category });
  };

  const handleReset = () => {
    onFilterChange({
      category: "all",
      search: "",
      sortBy: "curated",
      maxPrice: 2500,
    });
  };

  const isFiltered = filters.category !== "all" || filters.search !== "" || filters.sortBy !== "curated";

  const currentSortLabel =
    sortOptions.find((o) => o.id === filters.sortBy)?.label || t.sortCurated;

  return (
    <div className="w-full space-y-2">
      {/* Horizontal Scrollable Category Chips for 1-Thumb Mobile Selection */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-0.5 px-0.5 touch-pan-x">
        {categoryOptions.map((cat) => {
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat.id)}
              className={`min-h-[38px] px-3.5 whitespace-nowrap text-xs font-mono uppercase tracking-[0.08em] border select-none transition-transform duration-100 active:scale-95 cursor-pointer shrink-0 touch-manipulation flex items-center justify-center ${
                isActive
                  ? "bg-[var(--text-primary)] text-[var(--bg-canvas)] border-[var(--text-primary)] font-semibold shadow-xs"
                  : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Single Unified Control Panel (Search Box + Filters) with Crisp High-Contrast Borders */}
      <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-strong)] p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full">
          {/* Search Input — High Contrast Light Theme Architecture */}
          <div className="group/input relative flex-1 w-full">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-none bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] pointer-events-none shrink-0 group-focus-within/input:bg-[var(--text-primary)] group-focus-within/input:text-[var(--bg-canvas)]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="search"
              placeholder={t.searchPlaceholder}
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full h-12 sm:h-13 pl-14 pr-12 font-sans text-base sm:text-sm tracking-[0.01em] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-strong)] hover:border-[var(--text-primary)] focus:border-[var(--text-primary)] outline-none focus:outline-none ring-0 shadow-xs [appearance:none] [-webkit-appearance:none]"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, search: "" })}
                className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[36px] min-h-[36px] p-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface-raised)] hover:bg-[var(--bg-surface-active)] cursor-pointer outline-none flex items-center justify-center gap-1 touch-manipulation"
                title={t.clearSearch}
                aria-label={t.clearSearch}
              >
                <X className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline uppercase">{t.clear}</span>
              </button>
            )}
          </div>

          {/* Custom Bespoke Luxury Sort Dropdown */}
          <div ref={sortRef} className="relative md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setSortOpen((prev) => !prev)}
              className="h-12 sm:h-13 w-full md:w-auto min-w-[210px] px-4 flex items-center justify-between gap-3 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-raised)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-[var(--text-primary)] font-sans text-xs uppercase tracking-[0.12em] font-medium outline-none focus:outline-none focus:ring-0 ring-0 cursor-pointer select-none"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
            >
              <div className="flex items-center gap-2 truncate">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0" />
                <span className="text-[10px] text-[var(--text-muted)] tracking-widest hidden md:inline">
                  {t.sortLabel}
                </span>
                <span className="font-semibold truncate">{currentSortLabel}</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0 transition-transform duration-150 ${
                  sortOpen ? "rotate-180 text-[var(--text-primary)]" : ""
                }`}
              />
            </button>

            {/* Custom Modern Floating Popover */}
            {sortOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full mt-1.5 w-full sm:w-64 bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl z-50 py-1 font-sans divide-y divide-[var(--border-subtle)]"
              >
                {sortOptions.map((opt) => {
                  const isSelected = filters.sortBy === opt.id;
                  return (
                    <button
                      key={opt.id}
                      role="option"
                      aria-selected={isSelected}
                      type="button"
                      onClick={() => handleSelectSort(opt.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs uppercase tracking-[0.10em] cursor-pointer outline-none focus:outline-none ${
                        isSelected
                          ? "bg-[var(--bg-surface-raised)] text-[var(--text-primary)] font-bold"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)]"
                      }`}
                    >
                      <span className="truncate pr-2">{opt.label}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[var(--text-primary)] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid Meta Information Bar (Placed below panel — prevents any panel height change) */}
      <div className="flex items-center justify-between min-h-[22px] px-1 text-xs font-mono text-[var(--text-secondary)]">
        <span className="tabular-nums text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
          {totalResults} {totalResults === 1 ? t.modelSingular : t.modelPlural}
        </span>
        {isFiltered ? (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 font-sans font-medium text-[11px] uppercase tracking-[0.16em] text-[var(--text-primary)] hover:opacity-70 transition-opacity cursor-pointer outline-none focus:outline-none"
            title={t.resetAllFilters}
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.resetFilters}</span>
          </button>
        ) : (
          <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] opacity-60">
            {t.completeCollection}
          </span>
        )}
      </div>
    </div>
  );
}
