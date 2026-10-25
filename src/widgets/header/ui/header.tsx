"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Sun, Moon } from "lucide-react";
import { useCart } from "@/features/cart";

export function Header() {
  const { totalItemsCount, openCart } = useCart();
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
          Edition 2026 • Complimentary Insured Courier Shipping Worldwide • Handcrafted in Paris & Milan
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-xl sm:text-2xl tracking-tight font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cognac)] transition-colors">
              ATELIER VÉLOCE
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-[var(--text-muted)] -mt-1">
              Architectural Carry Goods
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
            Works Catalog
          </Link>
          <Link href="/bags/arche-briefcase" className="hover:text-[var(--text-primary)] transition-colors">
            L&apos;Arche Briefcase
          </Link>
          <Link href="/bags/nomade-weekender" className="hover:text-[var(--text-primary)] transition-colors">
            48H Holdall
          </Link>
          <Link href="#craftsmanship" className="hover:text-[var(--text-primary)] transition-colors">
            Provenance
          </Link>
        </nav>

        {/* Right utilities: Theme toggle + Cart trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors active:scale-95"
            aria-label="Toggle light / dark stone mode"
            title="Toggle light / dark stone mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={openCart}
            className="flex items-center gap-2.5 px-3.5 py-2 bg-[var(--bg-surface-raised)] hover:bg-[var(--bg-surface-active)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all active:scale-95 select-none"
            aria-label={`View Cart (${totalItemsCount} items)`}
          >
            <ShoppingBag className="w-4 h-4 text-[var(--text-primary)]" />
            <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">Carry</span>
            <span className="font-mono text-xs font-bold tabular-nums px-1.5 py-0.2 bg-[var(--text-primary)] text-[var(--bg-canvas)] rounded-full">
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
          <nav className="flex flex-col gap-3 text-sm font-mono uppercase tracking-wider text-[var(--text-primary)]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[var(--accent-cognac)]"
            >
              All Works
            </Link>
            <Link
              href="/bags/arche-briefcase"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[var(--accent-cognac)]"
            >
              L&apos;Arche Briefcase
            </Link>
            <Link
              href="/bags/nomade-weekender"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[var(--accent-cognac)]"
            >
              Le Nomade 48H
            </Link>
            <Link
              href="#craftsmanship"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[var(--accent-cognac)]"
            >
              Provenance & Tanning
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
