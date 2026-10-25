"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "../lib/cn";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: "right" | "left";
}

export function Drawer({ isOpen, onClose, title, children, position = "right" }: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const slideVariants = {
    closed: {
      x: position === "right" ? "100%" : "-100%",
      transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] as const },
    },
    open: {
      x: 0,
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex" data-lenis-prevent="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Drawer container */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={slideVariants}
            className={cn(
              "relative z-10 w-full max-w-full sm:max-w-md h-full bg-[var(--bg-canvas)] shadow-2xl flex flex-col border-hairline overflow-hidden",
              position === "right" ? "ml-auto border-l" : "mr-auto border-r"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <h2 className="font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[#1A1614] truncate pr-2">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] -mr-2 -my-2 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors active:scale-95 touch-manipulation"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content with safe area bottom padding */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]" style={{ overscrollBehavior: "contain" }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
