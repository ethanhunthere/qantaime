"use client";

import React from "react";
import { Bag } from "@/shared/types";
import { formatDimensions, formatWeight } from "@/shared/lib";
import { useLanguage } from "@/features/language";

export interface BagSpecsTableProps {
  bag: Bag;
}

export function BagSpecsTable({ bag }: BagSpecsTableProps) {
  const { t } = useLanguage();

  const specs = [
    { label: t.dimensions, value: formatDimensions(bag.dimensions) },
    { label: t.material, value: `${bag.leatherType}, ${bag.liningMaterial}` },
    { label: t.hardware, value: bag.hardwareOptions.map((h) => h.name).join(", ") },
    { label: t.condition, value: t.conditionVal },
    { label: t.serialCode, value: `QA-${bag.id.toUpperCase()}-2026` },
    { label: t.capacityAndWeight, value: `${bag.capacityLiters.toFixed(1)} L — ${formatWeight(bag.weightGrams)}` },
  ];

  return (
    <div className="w-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-raised)]">
        <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
          {t.specsTitle}
        </h4>
      </div>
      <dl className="divide-y divide-[var(--border-subtle)]">
        {specs.map((item) => (
          <div key={item.label} className="grid grid-cols-1 sm:grid-cols-3 px-3.5 sm:px-4 py-2 sm:py-2.5 font-mono font-normal text-[11px] sm:text-[12px] tracking-[0.02em]">
            <dt className="text-[var(--text-muted)] uppercase text-[10px] sm:text-[11px]">{item.label}</dt>
            <dd className="sm:col-span-2 text-[var(--text-primary)] tabular-nums mt-0.5 sm:mt-0 break-words">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
