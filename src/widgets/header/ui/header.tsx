"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Sun, Moon } from "lucide-react";
import { useCart } from "@/features/cart";
import { useLanguage, LanguageSwitcher } from "@/features/language";

export function Header() {
  const { totalItemsCount, openCart } = useCart();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-canvas)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
      {/* Top micro-announcement banner */}
      <div className="bg-[var(--bg-surface-raised)] border-b border-[var(--border-subtle)] px-3 sm:px-4 py-1.5 text-center overflow-hidden">
        <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] truncate sm:whitespace-normal">
          {t.topAnnouncement}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="group flex items-center">
            <span className="font-sans font-medium uppercase text-[15px] sm:text-[16px] md:text-[18px] tracking-[0.24em] sm:tracking-[0.28em] text-[#1A1614] group-hover:opacity-75 transition-opacity">
              {t.brandName}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          <Link href="/#catalog" className="hover:text-[var(--text-primary)] transition-colors">
            {t.navWorks}
          </Link>
          <Link href="/bags/arche-briefcase" className="hover:text-[var(--text-primary)] transition-colors">
            {t.navBriefcases}
          </Link>
          <Link href="/bags/flaneur-tote" className="hover:text-[var(--text-primary)] transition-colors">
            {t.navTotes}
          </Link>
          <Link href="/bags/nomade-weekender" className="hover:text-[var(--text-primary)] transition-colors">
            {t.navWeekenders}
          </Link>
          <Link href="#craftsmanship" className="hover:text-[var(--text-primary)] transition-colors">
            {t.navProvenance}
          </Link>
        </nav>

        {/* Right utilities: Language switcher + Theme toggle + Cart trigger */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <button
            onClick={toggleTheme}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors active:scale-95 touch-manipulation"
            aria-label="Toggle light / dark stone mode"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={openCart}
            className="min-h-[40px] flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-[var(--bg-surface-raised)] hover:bg-[var(--bg-surface-active)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all active:scale-95 select-none touch-manipulation"
            aria-label={`View Cart (${totalItemsCount} items)`}
          >
            <ShoppingBag className="w-4 h-4 text-[var(--text-primary)]" />
            <span className="font-sans font-medium text-[11px] uppercase tracking-[0.18em] hidden sm:inline">{t.cartButton}</span>
            <span className="font-mono text-[11px] font-normal tabular-nums px-1.5 py-0.5 bg-[var(--text-primary)] text-[var(--bg-canvas)]">
              {totalItemsCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="md:hidden min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-95 touch-manipulation"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation with backdrop */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-5 space-y-4 shadow-xl">
          <nav className="flex flex-col divide-y divide-[var(--border-subtle)] font-sans font-medium text-[12px] uppercase tracking-[0.18em] text-[var(--text-primary)]">
            <Link
              href="/#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 flex items-center justify-between hover:text-[var(--accent-cognac)]"
            >
              <span>{t.navWorks}</span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">20 Modele</span>
            </Link>
            <Link
              href="/bags/arche-briefcase"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 flex items-center justify-between hover:text-[var(--accent-cognac)]"
            >
              <span>{t.navBriefcases}</span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">Porte-Documents</span>
            </Link>
            <Link
              href="/bags/flaneur-tote"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 flex items-center justify-between hover:text-[var(--accent-cognac)]"
            >
              <span>{t.navTotes}</span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">Totes</span>
            </Link>
            <Link
              href="/bags/nomade-weekender"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 flex items-center justify-between hover:text-[var(--accent-cognac)]"
            >
              <span>{t.navWeekenders}</span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">48H</span>
            </Link>
            <Link
              href="#craftsmanship"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 flex items-center justify-between hover:text-[var(--accent-cognac)]"
            >
              <span>{t.navProvenance}</span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">Atelier</span>
            </Link>
          </nav>

          <div className="pt-2 flex items-center justify-between border-t border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Gjuha / Language:</span>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
