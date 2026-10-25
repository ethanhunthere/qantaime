"use client";

import React, { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "../model/language-context";
import { Language } from "@/shared/config/translations";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const current = availableLanguages.find((l) => l.code === language) || availableLanguages[0];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-[38px] text-xs font-mono bg-[var(--bg-surface-raised)] hover:bg-[var(--bg-surface-active)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all select-none touch-manipulation"
        aria-label="Ndrysho Gjuhën / Select Language"
      >
        <span className="text-sm">{current.flag}</span>
        {!compact && <span className="font-medium uppercase">{current.code}</span>}
        <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1 w-40 bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl z-50 py-1 font-mono text-xs">
            {availableLanguages.map((item) => (
              <button
                key={item.code}
                onClick={() => {
                  setLanguage(item.code as Language);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 min-h-[40px] text-left hover:bg-[var(--bg-surface-active)] transition-colors touch-manipulation ${
                  item.code === language
                    ? "font-bold text-[var(--accent-cognac)] bg-[var(--bg-surface-raised)]"
                    : "text-[var(--text-primary)]"
                }`}
              >
                <span>{item.flag}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
