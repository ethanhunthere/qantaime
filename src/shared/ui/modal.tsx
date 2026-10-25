"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-lenis-prevent="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] as const }}
            className="relative z-10 w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl p-6 md:p-8 overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
              {title && (
                <h3 className="text-sm uppercase tracking-widest font-medium text-[var(--text-primary)]">
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="ml-auto p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors active:scale-95"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto pt-6" style={{ overscrollBehavior: "contain" }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
