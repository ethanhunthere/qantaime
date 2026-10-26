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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const isDocDark = document.documentElement.classList.contains("dark");
      setIsDark(isDocDark);
      setMounted(true);

      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handleMediaChange = (e: MediaQueryListEvent) => {
        const stored = localStorage.getItem("atelier_theme");
        if (!stored) {
          if (e.matches) {
            document.documentElement.classList.add("dark");
            setIsDark(true);
          } else {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
          }
        }
      };
      mq.addEventListener("change", handleMediaChange);
      return () => mq.removeEventListener("change", handleMediaChange);
    } catch {
      // Storage access or SSR
    }
  }, []);

  const setThemeMode = (targetDark: boolean) => {
    // 1. Immediately update DOM class for zero-delay frame-0 paint
    if (targetDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // 2. Update React state
    setIsDark(targetDark);
    // 3. Persist asynchronously in microtask without blocking the render pipeline
    queueMicrotask(() => {
      try {
        localStorage.setItem("atelier_theme", targetDark ? "dark" : "light");
      } catch {
        // Storage blocked
      }
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo (Instant Synchronous Switch, Zero Layout Shift) */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="group flex items-center py-1">
            <div className="relative h-7 w-7 sm:h-9 sm:w-9 shrink-0">
              {/* Light Mode Logo (Espresso Brown) */}
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                sizes="(max-width: 640px) 28px, 36px"
                priority
                className="object-contain opacity-100 dark:opacity-0 group-hover:opacity-80 dark:group-hover:opacity-0"
              />
              {/* Dark Mode Logo (Pure White) */}
              <Image
                src="/images/logo-white.png"
                alt="Logo"
                fill
                sizes="(max-width: 640px) 28px, 36px"
                priority
                className="object-contain opacity-0 dark:opacity-100 group-hover:opacity-0 dark:group-hover:opacity-80"
              />
            </div>
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
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          {/* Architectural Segmented Theme Control: [ ☼ Light | ☾ Dark ] */}
          <div
            role="group"
            aria-label={t.toggleTheme}
            className="flex items-center p-0.5 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-full"
          >
            <button
              type="button"
              onClick={() => setThemeMode(false)}
              className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-[transform,opacity] duration-100 cursor-pointer active:scale-95 ${
                mounted && !isDark
                  ? "bg-[var(--text-primary)] text-[var(--bg-canvas)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              aria-label={t.themeLight}
              title={t.themeLight}
              aria-pressed={!isDark}
            >
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </button>
            <button
              type="button"
              onClick={() => setThemeMode(true)}
              className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-[transform,opacity] duration-100 cursor-pointer active:scale-95 ${
                mounted && isDark
                  ? "bg-[var(--text-primary)] text-[var(--bg-canvas)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              aria-label={t.themeDark}
              title={t.themeDark}
              aria-pressed={isDark}
            >
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </button>
          </div>

          <button
            onClick={openCart}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-2 px-3 py-2 bg-[var(--bg-surface-raised)] hover:bg-[var(--bg-surface-active)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-transform duration-100 active:scale-95 select-none touch-manipulation cursor-pointer"
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
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-95 touch-manipulation cursor-pointer"
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
              className="py-3.5 min-h-[48px] flex items-center justify-between hover:text-[var(--accent-cognac)] touch-manipulation"
            >
              <span>{t.navWorks}</span>
            </Link>
            <Link
              href="/#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3.5 min-h-[48px] flex items-center justify-between hover:text-[var(--accent-cognac)] touch-manipulation"
            >
              <span>{t.navBriefcases}</span>
            </Link>
            <Link
              href="/bags/porte-monnaie-cardholder"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3.5 min-h-[48px] flex items-center justify-between hover:text-[var(--accent-cognac)] touch-manipulation"
            >
              <span>{t.navTotes}</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="py-3.5 min-h-[48px] flex items-center justify-between text-left hover:text-[var(--accent-cognac)] touch-manipulation cursor-pointer"
            >
              <span>{t.yourCarry}</span>
              <span className="font-mono text-[11px] tabular-nums px-2 py-0.5 bg-[var(--text-primary)] text-[var(--bg-canvas)]">
                {totalItemsCount}
              </span>
            </button>
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
