import React from "react";
import { Bag } from "@/shared/types";
import { formatDimensions, formatWeight } from "@/shared/lib";

export interface BagSpecsTableProps {
  bag: Bag;
}

export function BagSpecsTable({ bag }: BagSpecsTableProps) {
  const specs = [
    { label: "Leather Grade", value: bag.leatherType },
    { label: "Internal Lining", value: bag.liningMaterial },
    { label: "Dimensions (W × H × D)", value: formatDimensions(bag.dimensions) },
    { label: "Volumetric Capacity", value: `${bag.capacityLiters.toFixed(1)} Liters` },
    { label: "Dry Weight", value: formatWeight(bag.weightGrams) },
    { label: "Hardware Finishing", value: bag.hardwareOptions.map((h) => h.name).join(" / ") },
  ];

  return (
    <div className="w-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <div className="px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-raised)]">
        <h4 className="text-xs uppercase tracking-widest font-mono text-[var(--text-secondary)]">
          Architectural Blueprint & Material Composition
        </h4>
      </div>
      <dl className="divide-y divide-[var(--border-subtle)]">
        {specs.map((item) => (
          <div key={item.label} className="grid grid-cols-1 sm:grid-cols-3 px-4 py-3 text-xs">
            <dt className="font-mono text-[var(--text-muted)] uppercase tracking-wider">{item.label}</dt>
            <dd className="sm:col-span-2 text-[var(--text-primary)] font-medium mt-1 sm:mt-0 tabular-nums">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
