import React from "react";
import Image from "next/image";
import { Scissors, Shield, Compass, Sparkles } from "lucide-react";

export function CraftsmanshipStory() {
  const pillars = [
    {
      icon: Compass,
      title: "Santa Croce sull'Arno Tanning",
      desc: "Our Vachetta and bullhide are conditioned with natural chestnut, mimosa, and quebracho tannins over sixty days in revolving wooden vats, preserving the authentic grain topography.",
    },
    {
      icon: Scissors,
      title: "Hand Saddle-Stitched Seams",
      desc: "Two needles and natural waxed French linen thread pass through every awl punch hole in opposing directions. If one thread ever wears through, the seam remains structurally intact.",
    },
    {
      icon: Sparkles,
      title: "Beeswax & Edge Burnishing",
      desc: "Raw edges receive six progressive coats of pigmented mineral dye followed by hand-friction burnishing with pure organic beeswax, sealing the fibers against humidity.",
    },
    {
      icon: Shield,
      title: "Lifelong Atelier Restoration",
      desc: "Every piece includes our workshop certificate. Send your bag to our Parisian atelier every 36 months for complimentary deep conditioning, re-stitching, and hardware replating.",
    },
  ];

  return (
    <section id="craftsmanship" className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-cognac)]">
            Philosophy & Provenance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--text-primary)] text-balance">
            Designed to Acquire Character Rather Than Wear.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            In an era of disposable mass production, Atelier Véloce builds carry goods that outlive seasonal fashion. We treat leather as an architectural material — measuring tension, weight distribution, and aging resilience down to the tenth of a millimeter.
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
                <h3 className="font-serif text-lg text-[var(--text-primary)]">
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
