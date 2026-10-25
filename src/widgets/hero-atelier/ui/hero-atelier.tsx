"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/shared/ui";
import { useLanguage } from "@/features/language";

export function HeroAtelier() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Monastic Editorial Copy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] text-[11px] font-mono tracking-widest uppercase text-[var(--accent-cognac)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cognac)]" />
            {t.heroBadge}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-[var(--text-primary)] text-balance">
            {t.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl font-normal">
            {t.heroSubtitle}
          </p>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link href="#catalog">
              <Button size="lg" variant="primary">
                {t.heroCtaCatalog}
              </Button>
            </Link>
            <Link href="/bags/arche-briefcase">
              <Button size="lg" variant="outline" className="gap-2">
                <span>{t.heroCtaFlagship}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Provenance Micro-Indicators */}
          <div className="pt-8 border-t border-[var(--border-subtle)] grid grid-cols-3 gap-6 font-mono text-xs">
            <div>
              <p className="text-[var(--text-muted)] uppercase tracking-wider text-[10px]">{t.heroTannery}</p>
              <p className="text-[var(--text-primary)] font-medium mt-0.5">{t.heroTanneryVal}</p>
            </div>
            <div>
              <p className="text-[var(--text-muted)] uppercase tracking-wider text-[10px]">{t.heroAssembly}</p>
              <p className="text-[var(--text-primary)] font-medium mt-0.5">{t.heroAssemblyVal}</p>
            </div>
            <div>
              <p className="text-[var(--text-muted)] uppercase tracking-wider text-[10px]">{t.heroHardware}</p>
              <p className="text-[var(--text-primary)] font-medium mt-0.5">{t.heroHardwareVal}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Artifact */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-4/5 w-full bg-[var(--bg-surface-raised)] border border-[var(--border-strong)] shadow-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80"
              alt="L'Arche Briefcase in hand-burnished French box calfskin"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center"
            />
            {/* Architectural overlay caption */}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur-xs text-white border border-white/10 flex justify-between items-center text-xs font-mono">
              <div>
                <p className="font-semibold tracking-wider uppercase text-[11px]">L&apos;Arche Briefcase</p>
                <p className="text-zinc-400 text-[10px]">Box Calfskin • 10.5 L</p>
              </div>
              <span className="text-[#d4af37] font-semibold tabular-nums">€1,450</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
