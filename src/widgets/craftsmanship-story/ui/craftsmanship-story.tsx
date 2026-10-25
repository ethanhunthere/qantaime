"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/features/language";

export function CraftsmanshipStory() {
  const { t } = useLanguage();

  const pillars = [
    {
      code: "01 / TAN",
      title: t.craftTanningTitle,
      desc: t.craftTanningDesc,
    },
    {
      code: "02 / SEAM",
      title: t.craftStitchingTitle,
      desc: t.craftStitchingDesc,
    },
    {
      code: "03 / EDGE",
      title: t.craftBeeswaxTitle,
      desc: t.craftBeeswaxDesc,
    },
    {
      code: "04 / CARE",
      title: t.craftRestorationTitle,
      desc: t.craftRestorationDesc,
    },
  ];

  return (
    <section id="craftsmanship" className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#1A1614] block">
            [ATELIER DOSSIER — CRAFTSMANSHIP STANDARDS]
          </span>
          <h2 className="font-sans font-medium uppercase text-2xl sm:text-4xl lg:text-5xl tracking-[0.06em] leading-[1.05] text-[#1A1614] text-balance">
            {t.craftTitle}
          </h2>
          <p className="text-xs sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {t.craftDesc}
          </p>
        </div>

        {/* 4 Pillars Architectural Dossier Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-5 sm:p-6 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)] block border-b border-[var(--border-subtle)] pb-2">
                  {pillar.code}
                </span>
                <h3 className="font-sans font-medium uppercase text-sm tracking-[0.08em] text-[#1A1614]">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-2">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Atmospheric Workshop Imagery */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2 sm:pt-4">
          <div className="relative aspect-3/2 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
              alt="Artisan inspects full-grain leather hide"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-3/2 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
              alt="Milled brass hardware fittings"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-3/2 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
              alt="Finished briefcase with hand-burnished edges"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
