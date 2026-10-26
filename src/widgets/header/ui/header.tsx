"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Menu, X, Sun, Moon } from "lucide-react";
import { useCart } from "@/features/cart";
import { useLanguage, LanguageSwitcher } from "@/features/language";

export function Header() {
  const { totalItemsCount, openCart } = useCart();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("atelier_theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (stored === "dark" || (!stored && prefersDark)) {
        setIsDark(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDark(false);
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // Storage access or SSR
    }
  }, []);

  const toggleTheme = () => {
    // Add transitioning class to smoothly morph all surfaces and borders
    document.documentElement.classList.add("theme-transitioning");

    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        try {
          localStorage.setItem("atelier_theme", "dark");
        } catch {
          // Storage blocked
        }
      } else {
        document.documentElement.classList.remove("dark");
        try {
          localStorage.setItem("atelier_theme", "light");
        } catch {
          // Storage blocked
        }
      }
      return next;
    });

    // Remove transition class after animation finishes so normal micro-interactions stay 0ms
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 280);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="group flex items-center py-1">
            {/* Light Mode Logo (Espresso Brown) */}
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={44}
              height={44}
              priority
              style={{ width: "auto", height: "auto" }}
              className="h-9 sm:h-11 object-contain transition-opacity group-hover:opacity-80 dark:hidden"
            />
            {/* Dark Mode Logo (Pure White) */}
            <Image
              src="/images/logo-white.png"
              alt="Logo"
              width={44}
              height={44}
              priority
              style={{ width: "auto", height: "auto" }}
              className="h-9 sm:h-11 object-contain transition-opacity group-hover:opacity-80 hidden dark:block"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
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

        {/* Right utilities: Language switcher + Theme toggle + Cart trigger */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <button
            onClick={toggleTheme}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors active:scale-95 touch-manipulation cursor-pointer"
            aria-label={t.toggleTheme}
            title={t.toggleTheme}
          >
            <span className="relative w-4 h-4 flex items-center justify-center">
              <Sun
                className={`w-4 h-4 absolute transition-all duration-300 ${
                  isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50 pointer-events-none"
                }`}
              />
              <Moon
                className={`w-4 h-4 absolute transition-all duration-300 ${
                  isDark ? "opacity-0 rotate-90 scale-50 pointer-events-none" : "opacity-100 rotate-0 scale-100"
                }`}
              />
            </span>
          </button>

          <button
            onClick={openCart}
            className="min-h-[40px] flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-[var(--bg-surface-raised)] hover:bg-[var(--bg-surface-active)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all active:scale-95 select-none touch-manipulation cursor-pointer"
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
            className="md:hidden min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-95 touch-manipulation cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation with backdrop */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-4 py-5 space-y-4 shadow-xl">
          <nav className="flex flex-col divide-y divide-[var(--border-subtle)] font-sans font-medium text-[12px] uppercase tracking-[0.18em] text-[var(--text-primary)]">
            <Link
              href="/#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 flex items-center justify-between hover:text-[var(--accent-cognac)]"
            >
              <span>{t.navWorks}</span>
            </Link>
            <Link
              href="/#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 flex items-center justify-between hover:text-[var(--accent-cognac)]"
            >
              <span>{t.navBriefcases}</span>
            </Link>
            <Link
              href="/bags/porte-monnaie-cardholder"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 flex items-center justify-between hover:text-[var(--accent-cognac)]"
            >
              <span>{t.navTotes}</span>
            </Link>
          </nav>

          <div className="pt-2 flex items-center justify-between border-t border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">{t.languageLabel}</span>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
