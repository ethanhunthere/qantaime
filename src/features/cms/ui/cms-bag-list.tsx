"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ExternalLink, RefreshCw } from "lucide-react";
import { Bag } from "@/shared/types";
import { formatCurrency } from "@/shared/lib";

interface CmsBagListProps {
  bags: Bag[];
  onBagDeleted: (id: string) => void;
  onRefresh: () => void;
}

export function CmsBagList({ bags, onBagDeleted, onRefresh }: CmsBagListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`A jeni të sigurt që dëshironi të fshini çantën "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/bags?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Dështoi fshirja.");
      }
      onBagDeleted(id);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Dështoi fshirja.";
      alert(msg);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold">
            Çantat në Dyqan ({bags.length})
          </h3>
          <p className="text-[11px] font-mono text-[var(--text-muted)]">
            Të gjitha modelet e listuara në katalogun e faqes kryesore.
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] cursor-pointer"
          title="Rifresko listën"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {bags.length === 0 ? (
        <div className="p-8 text-center border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <p className="text-xs font-mono text-[var(--text-secondary)]">Nuk ka asnjë çantë të listuar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {bags.map((bag) => {
            const firstColor = bag.colors[0];
            const isCustom = bag.id.startsWith("bag-");
            return (
              <div
                key={bag.id}
                className="flex gap-3 p-3 bg-[var(--bg-surface)] border border-[var(--border-strong)] items-start"
              >
                <div className="relative w-20 h-20 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] shrink-0 overflow-hidden">
                  {firstColor?.image && (
                    <Image
                      src={firstColor.image}
                      alt={bag.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-sans font-medium text-xs uppercase tracking-wider text-[var(--text-primary)] truncate">
                      {bag.name}
                    </h4>
                    {isCustom && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        E RE
                      </span>
                    )}
                  </div>

                  <p className="font-mono text-xs font-bold text-[var(--text-primary)]">
                    {formatCurrency(bag.priceEur)}
                  </p>

                  <div className="flex items-center gap-1 pt-1">
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">Ngjyrat:</span>
                    <div className="flex items-center gap-1">
                      {bag.colors.map((c) => (
                        <span
                          key={c.id}
                          title={c.name}
                          className="w-3 h-3 border border-[var(--border-strong)]"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Link
                      href={`/bags/${bag.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Shiko</span>
                    </Link>
                    {isCustom && (
                      <button
                        onClick={() => handleDelete(bag.id, bag.name)}
                        disabled={deletingId === bag.id}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{deletingId === bag.id ? "Duke fshirë..." : "Fshij"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
