"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui";
import { useLanguage } from "@/features/language";

export function HeroAtelier() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
      {/* Editorial Header & Human Artisan Statement */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-10 sm:pb-14 text-center space-y-6 sm:space-y-8">
        {/* Subtle Provenance Marker */}
        <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[var(--accent-cognac)]">
          <span>{t.heroBadge}</span>
          <span className="text-[var(--text-muted)] select-none">/</span>
          <span className="text-[var(--text-secondary)]">KOSOVË</span>
        </div>

        {/* Monumental Headline */}
        <h1 className="font-sans font-medium uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.04em] leading-[1.05] sm:leading-[1.0] text-[#1A1614] max-w-5xl mx-auto text-balance">
          {t.heroTitle}
        </h1>

        {/* Humanized Subhead */}
        <p className="font-sans font-normal text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
          {t.heroSubtitle}
        </p>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          <Link href="#catalog" className="w-full sm:w-auto">
            <Button size="lg" variant="primary" className="w-full sm:w-auto min-w-[200px] min-h-[48px] rounded-none">
              {t.heroCtaCatalog}
            </Button>
          </Link>
          <Link href="#craftsmanship" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px] min-h-[48px] rounded-none">
              {t.heroCtaFlagship}
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Showcase Photography — Wide Panoramic Frame */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16">
        <div className="relative aspect-16/10 sm:aspect-21/9 w-full bg-[var(--bg-surface-raised)] border border-[var(--border-strong)] overflow-hidden shadow-lg group">
          <Image
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=2000&q=85"
            alt="Çantë lëkure e punuar me dorë në punishten tonë në Prishtinë"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
          />

          {/* Understated Caption on Image */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#1A1614]/85 text-white px-3 py-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] border border-white/10">
            L&apos;Arche : Lëkurë e Plotë / Punuar në Prishtinë
          </div>
        </div>

        {/* 4-Pillar Workshop Principles Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 sm:pt-8 border-t border-[var(--border-subtle)] mt-6 sm:mt-8 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
              [ 01 ] PUNISHTJA
            </span>
            <p className="text-[#1A1614] font-medium text-[11px] sm:text-xs">
              {t.heroAssemblyVal}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
              [ 02 ] LËKURA
            </span>
            <p className="text-[#1A1614] font-medium text-[11px] sm:text-xs">
              {t.heroTanneryVal}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
              [ 03 ] AKSESORËT
            </span>
            <p className="text-[#1A1614] font-medium text-[11px] sm:text-xs">
              {t.heroHardwareVal}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
              [ 04 ] DËRGESA
            </span>
            <p className="text-[#1A1614] font-medium text-[11px] sm:text-xs">
              Kosovë, Shqipëri & Diasporë
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
