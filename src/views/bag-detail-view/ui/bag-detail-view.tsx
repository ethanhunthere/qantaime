import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Bag } from "@/shared/types";
import { BagCustomizer } from "@/features/bag-customizer";
import { BagSpecsTable } from "@/entities/bag";

interface BagDetailViewProps {
  bag: Bag;
}

export function BagDetailView({ bag }: BagDetailViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Works</span>
        </Link>
        <span>/</span>
        <span className="uppercase text-[var(--text-secondary)]">{bag.category}</span>
        <span>/</span>
        <span className="text-[var(--text-primary)] font-medium">{bag.name}</span>
      </div>

      {/* Main Grid: Customizer Left & Narrative Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Interactive Customizer & Images */}
        <div className="lg:col-span-7">
          <BagCustomizer bag={bag} />
        </div>

        {/* Narrative & Craftsmanship Blueprint */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-cognac)] block mb-1">
              {bag.category} Silhouette
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
              {bag.name}
            </h1>
            <p className="text-sm font-mono text-[var(--text-secondary)] mt-2">
              {bag.tagline}
            </p>
          </div>

          <div className="prose text-xs text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>{bag.description}</p>
          </div>

          {/* Key Architectural Features */}
          <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-[var(--text-primary)]">
              Architectural Specifications
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[var(--text-secondary)]">
              {bag.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-cognac)] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Artisan Notes */}
          <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-[var(--text-primary)]">
              Workshop Atelier Notes
            </h4>
            <ul className="space-y-1.5 text-xs font-mono text-[var(--text-secondary)]">
              {bag.craftsmanshipNotes.map((note, idx) => (
                <li key={idx} className="leading-relaxed">
                  • {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Full Specifications Blueprint Table */}
          <BagSpecsTable bag={bag} />
        </div>
      </div>
    </div>
  );
}
