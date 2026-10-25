"use client";

import React from "react";
import Link from "next/link";
import { NewsletterForm } from "@/features/newsletter";
import { useLanguage, LanguageSwitcher } from "@/features/language";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Manifesto & Newsletter */}
          <div className="md:col-span-6 space-y-4">
            <span className="font-sans font-medium uppercase text-[16px] md:text-[18px] tracking-[0.28em] text-[#1A1614] block">
              {t.brandName}
            </span>
            <p className="text-xs font-mono leading-relaxed max-w-md text-[var(--text-secondary)]">
              {t.footerDesc}
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-primary)] block mb-2 font-medium">
                {t.newsletterTitle}
              </span>
              <NewsletterForm />
            </div>
          </div>

          {/* Workshop Addresses */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[11px] uppercase tracking-widest text-[var(--text-primary)] font-semibold block">
              {t.salonsTitle}
            </span>
            <div className="space-y-1">
              <p className="text-[var(--text-primary)] font-medium">Atelier Paris</p>
              <p className="text-[var(--text-muted)]">14 Rue de Verneuil, 75007 Paris</p>
              <p className="text-[var(--text-muted)]">Me takim privat</p>
            </div>
            <div className="space-y-1 pt-2">
              <p className="text-[var(--text-primary)] font-medium">Laboratorio Milano</p>
              <p className="text-[var(--text-muted)]">Via Solferino 19, 20121 Milano</p>
              <p className="text-[var(--text-muted)]">E Martë — E Shtunë</p>
            </div>
          </div>

          {/* Navigation Links & Language */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[#1A1614] block">
              Dokumentacioni & Gjuha
            </span>
            <ul className="space-y-2 font-sans font-medium text-[11px] uppercase tracking-[0.18em]">
              <li>
                <Link href="#craftsmanship" className="hover:text-[#1A1614] transition-colors">
                  {t.navProvenance}
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="hover:text-[#1A1614] transition-colors">
                  {t.catalogTitle}
                </Link>
              </li>
              <li>
                <span className="text-[var(--text-muted)]">Protokolli i Mirëmbajtjes</span>
              </li>
            </ul>

            <div className="pt-3">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block mb-1">
                Zgjidh Gjuhën / Select Language
              </span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[var(--text-muted)] text-center sm:text-left">
          <p>© {new Date().getFullYear()} {t.allRightsReserved}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-6 text-center sm:text-right">
            <span>Kushtet e Porosisë</span>
            <span>Privatësia</span>
            <span>Dërgesa me Korrier VIP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
