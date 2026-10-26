"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useLanguage } from "@/features/language";

export function HeroBanner() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-6 sm:pb-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-[var(--bg-surface)]/80 backdrop-blur-sm border border-[var(--border-strong)] p-6 sm:p-10 md:p-12 shadow-sm overflow-hidden"
      >
        {/* Subtle decorative hairline grid accent */}
        <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-[var(--border-subtle)] opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-t border-r border-[var(--border-subtle)] opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5 sm:space-y-6">
          {/* Architectural Coordinate Tag */}
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.20em] bg-[var(--text-primary)] text-[var(--bg-canvas)] font-medium">
              {t.heroBadge}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)] tracking-wider hidden sm:inline">
              [ 100% GENUINE LEATHER • ATELIER ARCHIVE ]
            </span>
          </motion.div>

          {/* Prominent Architectural Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-sans font-semibold uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.04em] leading-[1.02] text-[var(--text-primary)]"
          >
            {t.heroTitle}
          </motion.h1>

          {/* Elegant Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* CTA + Quick Anchor Link */}
          <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="#catalog"
              className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 sm:px-7 font-sans font-medium text-xs uppercase tracking-[0.18em] bg-[var(--text-primary)] text-[var(--bg-canvas)] hover:opacity-90 active:scale-[0.98] transition-all select-none touch-manipulation cursor-pointer"
            >
              <span>{t.heroCtaCatalog}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* 3-Column Micro Specification Strip */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-mono text-xs"
        >
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <span className="text-[var(--accent-cognac)] font-bold uppercase tracking-wider">01.</span>
            <span className="text-[var(--text-muted)] uppercase text-[10px]">{t.heroTannery}:</span>
            <span className="text-[var(--text-primary)] font-medium truncate">{t.heroTanneryVal}</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <span className="text-[var(--accent-cognac)] font-bold uppercase tracking-wider">02.</span>
            <span className="text-[var(--text-muted)] uppercase text-[10px]">{t.heroHardware}:</span>
            <span className="text-[var(--text-primary)] font-medium truncate">{t.heroHardwareVal}</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <span className="text-[var(--accent-cognac)] font-bold uppercase tracking-wider">03.</span>
            <span className="text-[var(--text-muted)] uppercase text-[10px]">{t.courierTransit}:</span>
            <span className="text-[var(--text-primary)] font-medium truncate">{t.complimentaryCourier}</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
