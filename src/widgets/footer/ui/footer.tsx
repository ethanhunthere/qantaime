"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/features/language";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Small Logo with Smooth Cross-fade */}
        <Link href="/" className="group inline-flex items-center">
          <div className="relative h-[22px] w-[22px] sm:h-[26px] sm:w-[26px] shrink-0">
            {/* Light Mode Logo */}
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              sizes="(max-width: 640px) 22px, 26px"
              className="object-contain opacity-100 dark:opacity-0 group-hover:opacity-80 dark:group-hover:opacity-0"
            />
            {/* Dark Mode Logo */}
            <Image
              src="/images/logo-white.png"
              alt="Logo"
              fill
              sizes="(max-width: 640px) 22px, 26px"
              className="object-contain opacity-0 dark:opacity-100 group-hover:opacity-0 dark:group-hover:opacity-80"
            />
          </div>
        </Link>

        {/* 3 Navigation Texts */}
        <nav className="flex items-center gap-6 sm:gap-8 font-sans font-medium text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          <Link href="/#catalog" className="hover:text-[var(--text-primary)] transition-colors">
            {t.navWorks}
          </Link>
          <Link href="/#catalog" className="hover:text-[var(--text-primary)] transition-colors">
            {t.navBriefcases}
          </Link>
          <Link href="/bags/porte-monnaie-cardholder" className="hover:text-[var(--text-primary)] transition-colors">
            {t.navTotes}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
