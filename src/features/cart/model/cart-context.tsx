"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { CartItem } from "@/shared/types";
import { constantTimeStringCompare } from "@/shared/lib";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  couponCode: string | null;
  discountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  totalItemsCount: number;
  subtotalEur: number;
  discountEur: number;
  shippingEur: number;
  totalEur: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "atelier_cart_v1";

const VALID_COUPONS: Record<string, number> = {
  ATELIER10: 10,
  MILANO: 15,
  ARCHITECT: 20,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // Ignore storage parse errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        // Storage limit exceeded or disabled
      }
    }
  }, [items, isLoaded]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, newItem];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
    setDiscountPercent(0);
  };

  const applyCoupon = (rawCode: string) => {
    const trimmed = rawCode.trim().toUpperCase();
    for (const [code, discount] of Object.entries(VALID_COUPONS)) {
      if (constantTimeStringCompare(code, trimmed)) {
        setCouponCode(code);
        setDiscountPercent(discount);
        return { success: true, message: `Privilege code applied: ${discount}% courtesy discount.` };
      }
    }
    return { success: false, message: "Invalid or expired courtesy code." };
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setDiscountPercent(0);
  };

  const totalItemsCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const subtotalEur = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPriceEur * item.quantity, 0),
    [items]
  );

  const discountEur = useMemo(() => (subtotalEur * discountPercent) / 100, [subtotalEur, discountPercent]);

  // Complimentary courier shipping on luxury orders over 500 EUR
  const shippingEur = useMemo(() => {
    if (subtotalEur === 0 || subtotalEur >= 500) return 0;
    return 35;
  }, [subtotalEur]);

  const totalEur = useMemo(() => Math.max(0, subtotalEur - discountEur + shippingEur), [
    subtotalEur,
    discountEur,
    shippingEur,
  ]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((prev) => !prev),
        couponCode,
        discountPercent,
        applyCoupon,
        removeCoupon,
        totalItemsCount,
        subtotalEur,
        discountEur,
        shippingEur,
        totalEur,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
