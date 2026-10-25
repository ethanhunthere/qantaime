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
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-canvas)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
      {/* Top micro-announcement banner */}
      <div className="bg-[var(--bg-surface-raised)] border-b border-[var(--border-subtle)] px-4 py-1.5 text-center">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)]">
          {t.topAnnouncement}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex flex-col">
            <span className="font-sans font-medium uppercase text-[16px] md:text-[18px] tracking-[0.28em] text-[#1A1614] group-hover:opacity-75 transition-opacity">
              {t.brandName}
            </span>
            <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-[var(--text-muted)] mt-0.5">
              {t.brandSubtitle}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
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
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          <button
            onClick={toggleTheme}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors active:scale-95"
            aria-label="Toggle light / dark stone mode"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={openCart}
            className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-surface-raised)] hover:bg-[var(--bg-surface-active)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all active:scale-95 select-none"
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
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-4">
          <nav className="flex flex-col gap-3 font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[var(--text-primary)]">
            <Link href="/#catalog" onClick={() => setMobileMenuOpen(false)} className="py-1">
              {t.navWorks}
            </Link>
            <Link href="/bags/arche-briefcase" onClick={() => setMobileMenuOpen(false)} className="py-1">
              {t.navBriefcases}
            </Link>
            <Link href="/bags/flaneur-tote" onClick={() => setMobileMenuOpen(false)} className="py-1">
              {t.navTotes}
            </Link>
            <Link href="/bags/nomade-weekender" onClick={() => setMobileMenuOpen(false)} className="py-1">
              {t.navWeekenders}
            </Link>
            <Link href="#craftsmanship" onClick={() => setMobileMenuOpen(false)} className="py-1">
              {t.navProvenance}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
