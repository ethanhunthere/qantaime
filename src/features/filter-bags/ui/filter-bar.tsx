"use client";

import React from "react";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { BagCategory, FilterState } from "@/shared/types";

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
}

const CATEGORIES: { id: BagCategory; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "briefcase", label: "Porte-Documents" },
  { id: "tote", label: "Totes" },
  { id: "weekender", label: "Holdalls / 48H" },
  { id: "crossbody", label: "Slings" },
  { id: "backpack", label: "Daypacks" },
];

export function FilterBar({ filters, onFilterChange, totalResults }: FilterBarProps) {
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
    <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 space-y-4">
      {/* Top tier: Category tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[var(--text-primary)] text-[var(--bg-canvas)] font-semibold shadow-xs"
                    : "bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-active)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[var(--text-muted)] tabular-nums">
            {totalResults} {totalResults === 1 ? "Silhouette" : "Silhouettes"}
          </span>
          {isFiltered && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs font-mono text-[var(--accent-cognac)] hover:underline ml-2"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom tier: Search input + Sorting selector */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
          <input
            type="search"
            placeholder="Search by silhouette, calfskin, or hardware..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full h-10 pl-9 pr-3 text-xs font-mono bg-[var(--bg-surface-raised)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus-visible:border-[var(--text-primary)] outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-xs font-mono text-[var(--text-secondary)] whitespace-nowrap">
              Order:
            </span>
            <select
              value={filters.sortBy}
              onChange={handleSortChange}
              className="h-10 px-3 text-xs font-mono bg-[var(--bg-surface-raised)] text-[var(--text-primary)] border border-[var(--border-subtle)] outline-none focus-visible:border-[var(--text-primary)]"
            >
              <option value="curated">Curated Atelier Selection</option>
              <option value="price-asc">Price: Ascending</option>
              <option value="price-desc">Price: Descending</option>
              <option value="capacity">Capacity (Liters)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
