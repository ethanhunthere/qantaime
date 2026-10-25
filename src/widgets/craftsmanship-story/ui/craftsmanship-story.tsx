"use client";

import React from "react";
import Image from "next/image";
import { Scissors, Shield, Compass, Sparkles } from "lucide-react";
import { useLanguage } from "@/features/language";

export function CraftsmanshipStory() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Compass,
      title: t.craftTanningTitle,
      desc: t.craftTanningDesc,
    },
    {
      icon: Scissors,
      title: t.craftStitchingTitle,
      desc: t.craftStitchingDesc,
    },
    {
      icon: Sparkles,
      title: t.craftBeeswaxTitle,
      desc: t.craftBeeswaxDesc,
    },
    {
      icon: Shield,
      title: t.craftRestorationTitle,
      desc: t.craftRestorationDesc,
    },
  ];

  return (
    <section id="craftsmanship" className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-cognac)]">
            {t.craftPhilosophy}
          </span>
          <h2 className="font-sans font-medium uppercase text-3xl sm:text-4xl lg:text-5xl tracking-[0.06em] leading-[1.05] text-[#1A1614] text-balance">
            {t.craftTitle}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {t.craftDesc}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] space-y-3"
              >
                <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-cognac)]">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-sans font-medium uppercase text-sm tracking-[0.06em] text-[#1A1614]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Atmospheric Workshop Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
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
