"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Small Logo */}
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={32}
            height={32}
            style={{ width: "auto", height: "auto" }}
            className="h-7 sm:h-8 object-contain"
          />
        </Link>

        {/* 3 Navigation Texts */}
        <nav className="flex items-center gap-6 sm:gap-8 font-sans font-medium text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          <Link href="/#catalog" className="hover:text-[var(--text-primary)] transition-colors">
            Të Gjitha
          </Link>
          <Link href="/#catalog" className="hover:text-[var(--text-primary)] transition-colors">
            Çanta Luksoze
          </Link>
          <Link href="/bags/porte-monnaie-cardholder" className="hover:text-[var(--text-primary)] transition-colors">
            Kuleta
          </Link>
        </nav>
      </div>
    </footer>
  );
}
