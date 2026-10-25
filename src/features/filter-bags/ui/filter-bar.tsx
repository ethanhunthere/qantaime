"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, RotateCcw, X, ChevronDown, Check } from "lucide-react";
import { BagCategory, FilterState } from "@/shared/types";
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

  const categories: { id: BagCategory; label: string }[] = [
    { id: "all", label: t.allWorks },
    { id: "briefcase", label: t.catBriefcase },
    { id: "tote", label: t.catTote },
    { id: "weekender", label: t.catWeekender },
    { id: "crossbody", label: t.catCrossbody },
    { id: "backpack", label: t.catBackpack },
  ];

  const sortOptions: { id: FilterState["sortBy"]; label: string }[] = [
    { id: "curated", label: t.sortCurated },
    { id: "price-asc", label: t.sortPriceAsc },
    { id: "price-desc", label: t.sortPriceDesc },
    { id: "capacity", label: t.sortCapacity },
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

  const handleCategoryClick = (cat: BagCategory) => {
    onFilterChange({ ...filters, category: cat });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleSelectSort = (sortBy: FilterState["sortBy"]) => {
    onFilterChange({ ...filters, sortBy });
    setSortOpen(false);
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

  const currentSortLabel =
    sortOptions.find((o) => o.id === filters.sortBy)?.label || t.sortCurated;

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
                className={`px-3.5 py-2 sm:py-1.5 font-sans font-medium text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-all whitespace-nowrap min-h-[36px] flex items-center touch-manipulation cursor-pointer border-0 outline-none focus:outline-none focus-visible:outline-none ring-0 ${
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

        {/* Bottom tier: Search input + Custom Luxury Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[var(--border-subtle)]">
          {/* Search Input with inline clear */}
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="search"
              placeholder={t.searchPlaceholder}
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full h-11 pl-9 pr-9 font-sans text-base sm:text-xs bg-[var(--bg-surface-raised)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-[var(--text-primary)] outline-none focus:outline-none focus:ring-0"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, search: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer outline-none"
                title="Pastro kërkimin"
                aria-label="Pastro kërkimin"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Custom Bespoke Luxury Sort Dropdown */}
          <div ref={sortRef} className="relative flex-1 sm:flex-none">
            <button
              type="button"
              onClick={() => setSortOpen((prev) => !prev)}
              className="h-11 w-full sm:w-auto min-w-[210px] px-3.5 flex items-center justify-between gap-3 bg-[var(--bg-surface-raised)] hover:bg-[var(--bg-surface-active)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all font-sans text-xs uppercase tracking-[0.12em] outline-none focus:outline-none focus:ring-0 cursor-pointer select-none"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
            >
              <div className="flex items-center gap-2 truncate">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                <span className="text-[10px] text-[var(--text-muted)] tracking-widest hidden md:inline">
                  {t.sortLabel}
                </span>
                <span className="font-medium truncate">{currentSortLabel}</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${
                  sortOpen ? "rotate-180 text-[var(--text-primary)]" : ""
                }`}
              />
            </button>

            {/* Custom Modern Floating Popover */}
            {sortOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full mt-1.5 w-full sm:w-64 bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl z-50 py-1 font-sans divide-y divide-[var(--border-subtle)] animate-in fade-in slide-in-from-top-1 duration-150"
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
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs uppercase tracking-[0.10em] transition-colors cursor-pointer outline-none focus:outline-none ${
                        isSelected
                          ? "bg-[var(--bg-surface-raised)] text-[var(--text-primary)] font-semibold"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-active)]"
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
          {totalResults} {totalResults === 1 ? "Model" : "Modele"}
        </span>
        {isFiltered ? (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 font-sans font-medium text-[11px] uppercase tracking-[0.16em] text-[var(--text-primary)] hover:opacity-70 transition-opacity cursor-pointer outline-none focus:outline-none"
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
