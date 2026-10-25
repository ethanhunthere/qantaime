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
      {/* Architectural Archival Rule Header */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          <span className="text-[#1A1614] font-medium tracking-[0.20em]">
            [ATELIER 01 — PARIS & MILANO]
          </span>
          <span className="hidden sm:inline text-[var(--text-muted)]">
            L&apos;ARCHE BRUTALIST LEATHERWORK
          </span>
          <span className="tabular-nums text-[#1A1614]">
            ANNUAL ARCHIVE — 150 PIECES
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        {/* Main Monolithic Headline */}
        <div className="max-w-5xl mb-8 sm:mb-12">
          <h1 className="font-sans font-medium uppercase text-3xl sm:text-5xl lg:text-7xl xl:text-8xl tracking-[0.04em] leading-[0.98] sm:leading-[0.95] text-[#1A1614] text-balance">
            {t.heroTitle}
          </h1>
          <p className="mt-4 sm:mt-6 font-sans font-normal text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Asymmetrical Gallery & Specifications Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Hero Visual Frame (Monolithic Flagship) */}
          <div className="lg:col-span-8 relative">
            <div className="relative aspect-16/10 sm:aspect-16/9 w-full bg-[var(--bg-surface-raised)] border border-[var(--border-strong)] overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=85"
                alt="L'Arche Briefcase in hand-burnished French box calfskin"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* Architectural Technical Legend at Base of Image */}
              <div className="absolute bottom-0 inset-x-0 bg-[#1A1614]/90 text-white p-3 sm:p-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-sans font-medium tracking-[0.20em] uppercase text-[11px] sm:text-xs">
                    L&apos;ARCHE PORTE-DOCUMENTS
                  </p>
                  <p className="font-mono text-stone-300 text-[10px] mt-0.5">
                    BOX CALFSKIN / NOIR ÉBÈNE / 10.5 L
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-stone-300 text-[10px] uppercase tracking-wider block">
                    PRICE
                  </span>
                  <span className="font-mono font-normal text-white text-xs sm:text-sm tabular-nums">
                    €1,450.00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Editorial & Action Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
            {/* Macro Craft Detail Frame */}
            <div className="relative aspect-4/3 w-full bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
                alt="Saddle-stitch leathercraft close-up"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center filter grayscale contrast-105"
              />
              <div className="absolute top-2 left-2 bg-[#1A1614] text-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest">
                MACRO SPEC 0.38MM
              </div>
            </div>

            {/* Atelier Technical Matrix */}
            <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-baseline border-b border-[var(--border-subtle)] pb-2">
                <span className="text-[var(--text-muted)] uppercase text-[10px] tracking-wider">
                  {t.heroTannery}
                </span>
                <span className="text-[#1A1614] font-normal text-[11px]">
                  {t.heroTanneryVal}
                </span>
              </div>
              <div className="flex justify-between items-baseline border-b border-[var(--border-subtle)] pb-2">
                <span className="text-[var(--text-muted)] uppercase text-[10px] tracking-wider">
                  {t.heroAssembly}
                </span>
                <span className="text-[#1A1614] font-normal text-[11px]">
                  {t.heroAssemblyVal}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[var(--text-muted)] uppercase text-[10px] tracking-wider">
                  {t.heroHardware}
                </span>
                <span className="text-[#1A1614] font-normal text-[11px]">
                  {t.heroHardwareVal}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link href="#catalog" className="w-full">
                <Button size="lg" variant="primary" className="w-full min-h-[46px] rounded-none">
                  {t.heroCtaCatalog}
                </Button>
              </Link>
              <Link href="/bags/arche-briefcase" className="w-full">
                <Button size="lg" variant="outline" className="w-full min-h-[46px] gap-2 rounded-none">
                  <span>{t.heroCtaFlagship}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
