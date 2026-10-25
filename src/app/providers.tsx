"use client";

import React from "react";
import { CartProvider } from "@/features/cart";
import { LanguageProvider } from "@/features/language";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>{children}</CartProvider>
    </LanguageProvider>
  );
}
