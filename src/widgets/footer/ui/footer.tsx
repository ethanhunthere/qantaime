"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage, LanguageSwitcher } from "@/features/language";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        {/* Top Minimal Tier */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
          {/* Logo & Brand Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={32}
              height={32}
              style={{ width: "auto", height: "auto" }}
              className="h-8 object-contain transition-opacity group-hover:opacity-80"
            />
            <span className="font-sans font-medium uppercase text-[15px] sm:text-[16px] tracking-[0.28em] text-[var(--text-primary)]">
              {t.brandName}
            </span>
          </Link>

          {/* Simple Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            <Link href="/#catalog" className="hover:text-[var(--text-primary)] transition-colors">
              Të Gjitha
            </Link>
            <Link href="/#catalog" className="hover:text-[var(--text-primary)] transition-colors">
              Çanta Luksoze
            </Link>
            <Link href="/bags/porte-monnaie-cardholder" className="hover:text-[var(--text-primary)] transition-colors">
              Kuleta
            </Link>
            <Link href="/checkout" className="hover:text-[var(--text-primary)] transition-colors">
              Porosia
            </Link>
          </nav>

          {/* Compact Language Switcher */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher compact />
          </div>
        </div>

        {/* Bottom Minimal Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[var(--text-muted)] text-center sm:text-left">
          <p>© {new Date().getFullYear()} {t.allRightsReserved}</p>
          <p className="tracking-wider uppercase text-[10px]">Dërgesë e Siguruar me Korrier VIP</p>
        </div>
      </div>
    </footer>
  );
}
