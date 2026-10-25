"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, RotateCcw, X, ChevronDown, Check } from "lucide-react";
import { FilterState } from "@/shared/types";
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

  const handleReset = () => {
    onFilterChange({
      category: "all",
      search: "",
      sortBy: "curated",
      maxPrice: 2500,
    });
  };

  const isFiltered = filters.search !== "" || filters.sortBy !== "curated";

  const currentSortLabel =
    sortOptions.find((o) => o.id === filters.sortBy)?.label || t.sortCurated;

  return (
    <div className="w-full space-y-2">
      {/* Single Unified Control Panel (Search Box + Filters) with Crisp High-Contrast Borders */}
      <div className="w-full bg-[var(--bg-surface)] border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full">
          {/* Search Input — High Contrast Light Theme Architecture */}
          <div className="group/input relative flex-1 w-full">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-none bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-zinc-100 pointer-events-none shrink-0 transition-colors group-focus-within/input:bg-zinc-950 group-focus-within/input:text-white dark:group-focus-within/input:bg-white dark:group-focus-within/input:text-zinc-950">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="search"
              placeholder={t.searchPlaceholder}
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full h-12 sm:h-13 pl-14 pr-10 font-sans text-sm tracking-[0.01em] bg-white dark:bg-[#141416] text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-zinc-950 dark:focus:border-zinc-200 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 shadow-xs focus:shadow-sm transition-all [appearance:none] [-webkit-appearance:none]"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, search: "" })}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-mono text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors cursor-pointer outline-none focus:outline-none flex items-center gap-1"
                title="Pastro kërkimin"
                aria-label="Pastro kërkimin"
              >
                <X className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline uppercase">Pastro</span>
              </button>
            )}
          </div>

          {/* Custom Bespoke Luxury Sort Dropdown */}
          <div ref={sortRef} className="relative md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setSortOpen((prev) => !prev)}
              className="h-12 sm:h-13 w-full md:w-auto min-w-[210px] px-4 flex items-center justify-between gap-3 bg-white dark:bg-[#141416] hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-950 dark:hover:border-zinc-300 transition-all font-sans text-xs uppercase tracking-[0.12em] font-medium outline-none focus:outline-none focus:ring-0 ring-0 cursor-pointer select-none"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
            >
              <div className="flex items-center gap-2 truncate">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 tracking-widest hidden md:inline">
                  {t.sortLabel}
                </span>
                <span className="font-semibold truncate">{currentSortLabel}</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-500 shrink-0 transition-transform duration-200 ${
                  sortOpen ? "rotate-180 text-zinc-950 dark:text-zinc-100" : ""
                }`}
              />
            </button>

            {/* Custom Modern Floating Popover */}
            {sortOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full mt-1.5 w-full sm:w-64 bg-white dark:bg-[#141416] border border-zinc-900 dark:border-zinc-700 shadow-xl z-50 py-1 font-sans divide-y divide-zinc-100 dark:divide-zinc-800 animate-in fade-in slide-in-from-top-1 duration-150"
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
                          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 font-bold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      }`}
                    >
                      <span className="truncate pr-2">{opt.label}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-zinc-950 dark:text-zinc-50 shrink-0" />
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
