"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, LANGUAGE_LABELS } from "@/shared/config/translations";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.sq;
  availableLanguages: { code: Language; label: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "atelier_lang_v1";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default is "sq" (Shqip) as requested by user
  const [language, setLanguageState] = useState<Language>("sq");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language;
      if (stored && (stored === "sq" || stored === "en" || stored === "it")) {
        setLanguageState(stored);
      }
    } catch {
      // Storage access blocked or SSR
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage error ignored
    }
  };

  const availableLanguages = [
    { code: "sq" as Language, ...LANGUAGE_LABELS.sq },
    { code: "en" as Language, ...LANGUAGE_LABELS.en },
    { code: "it" as Language, ...LANGUAGE_LABELS.it },
  ];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
