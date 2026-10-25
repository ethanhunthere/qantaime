"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, PackagePlus, ListFilter } from "lucide-react";
import { Bag } from "@/shared/types";
import { CmsForm, CmsBagList } from "@/features/cms";

interface CmsViewProps {
  initialBags: Bag[];
}

export function CmsView({ initialBags }: CmsViewProps) {
  const [bags, setBags] = useState<Bag[]>(initialBags);
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");

  const fetchBags = async () => {
    try {
      const res = await fetch("/api/bags");
      const data = await res.json();
      if (data.success && Array.isArray(data.bags)) {
        setBags(data.bags);
      }
    } catch (err) {
      console.error("Failed to load bags:", err);
    }
  };

  const handleBagAdded = (newBag: Bag) => {
    setBags((prev) => [newBag, ...prev]);
    setActiveTab("list");
  };

  const handleBagDeleted = (id: string) => {
    setBags((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-20 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kthehu në Dyqan</span>
          </Link>
          <h1 className="font-sans font-medium uppercase text-2xl sm:text-3xl tracking-[0.06em] text-[var(--text-primary)]">
            Paneli i Menaxhimit (CMS)
          </h1>
          <p className="text-xs font-mono text-[var(--text-secondary)] mt-1">
            Postoni modele të reja dhe ngjyra të ndryshme me foto dhe çmim.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center border border-[var(--border-strong)] bg-[var(--bg-surface-raised)] p-1">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
              activeTab === "create"
                ? "bg-[var(--text-primary)] text-[var(--bg-canvas)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <PackagePlus className="w-3.5 h-3.5" />
            <span>Shto Çantë</span>
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
              activeTab === "list"
                ? "bg-[var(--text-primary)] text-[var(--bg-canvas)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Çantat ({bags.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-strong)] p-4 sm:p-6 md:p-8 shadow-xs">
        {activeTab === "create" ? (
          <div>
            <div className="pb-4 mb-6 border-b border-[var(--border-subtle)]">
              <h2 className="font-sans font-medium uppercase text-base tracking-wider text-[var(--text-primary)]">
                Formulari i Publikimit të Çantës
              </h2>
              <p className="text-xs font-mono text-[var(--text-secondary)] mt-0.5">
                Vendosni vetëm emrin, çmimin, ngjyrën dhe fotot. Asgjë më tepër.
              </p>
            </div>
            <CmsForm onSuccess={handleBagAdded} existingBags={bags} />
          </div>
        ) : (
          <CmsBagList
            bags={bags}
            onBagDeleted={handleBagDeleted}
            onRefresh={fetchBags}
          />
        )}
      </div>
    </div>
  );
}
