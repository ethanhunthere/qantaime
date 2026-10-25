"use client";

import React, { useState } from "react";
import { Plus, Check, AlertCircle } from "lucide-react";
import { Bag } from "@/shared/types";
import { CmsColorItem, ColorDraft } from "./cms-color-item";

interface CmsFormProps {
  onSuccess: (newBag: Bag) => void;
  existingBags?: Bag[];
}

export function CmsForm({ onSuccess, existingBags = [] }: CmsFormProps) {
  const [name, setName] = useState("");
  const [priceEur, setPriceEur] = useState("");
  const [colors, setColors] = useState<ColorDraft[]>([
    { name: "E Zezë", hex: "#141416", image: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAddColor = () => {
    setColors((prev) => [...prev, { name: "Kafe", hex: "#2b1e1a", image: "" }]);
  };

  const handleRemoveColor = (idx: number) => {
    if (colors.length <= 1) return;
    setColors((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleColorChange = (idx: number, field: keyof ColorDraft, val: string) => {
    setColors((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, [field]: val } : c))
    );
  };

  const handleFileUpload = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Fotoja është shumë e madhe. Maksimumi është 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (dataUrl) handleColorChange(idx, "image", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDuplicateFromExisting = (bag: Bag) => {
    setName(bag.name);
    setPriceEur(bag.priceEur.toString());
    setColors(
      bag.colors.map((c) => ({
        name: `${c.name} (Variant i Ri)`,
        hex: c.hex,
        image: c.image,
      }))
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim()) {
      setErrorMsg("Ju lutem shënoni emrin e çantës.");
      return;
    }

    const price = parseFloat(priceEur);
    if (isNaN(price) || price < 0) {
      setErrorMsg("Ju lutem shënoni një çmim të vlefshëm në Euro.");
      return;
    }

    if (colors.some((c) => !c.name.trim() || !c.image.trim())) {
      setErrorMsg("Çdo ngjyrë duhet të ketë emrin dhe foton e saj.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/bags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), priceEur: price, colors }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Dështoi publikimi i çantës.");
      }

      setSuccessMsg(`Çanta "${data.bag.name}" u publikua me sukses në dyqan!`);
      setName("");
      setPriceEur("");
      setColors([{ name: "E Zezë", hex: "#141416", image: "" }]);
      onSuccess(data.bag);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Ndodhi një gabim.";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {existingBags.length > 0 && (
        <div className="p-3 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2.5">
          <span className="text-[11px] font-mono text-[var(--text-secondary)]">
            Posto variant të ri për një model ekzistues:
          </span>
          <select
            onChange={(e) => {
              const found = existingBags.find((b) => b.id === e.target.value);
              if (found) handleDuplicateFromExisting(found);
            }}
            defaultValue=""
            className="text-xs font-mono bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-2.5 py-1.5 text-[var(--text-primary)] outline-none cursor-pointer"
          >
            <option value="" disabled>Zgjidh modelin ekzistues...</option>
            {existingBags.map((b) => (
              <option key={b.id} value={b.id}>{b.name} ({b.priceEur} €)</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-medium">
            Emri i Çantës *
          </label>
          <input
            type="text"
            required
            placeholder="p.sh. Çanta Dore Monaco"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 px-3 text-sm font-sans bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-primary)] outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-medium">
            Çmimi në Euro (€) *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="p.sh. 145"
            value={priceEur}
            onChange={(e) => setPriceEur(e.target.value)}
            className="w-full h-11 px-3 text-sm font-mono bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-primary)] outline-none"
          />
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold">
              Ngjyrat & Fotot
            </h3>
            <p className="text-[11px] font-mono text-[var(--text-muted)]">
              Mund të shtoni sa ngjyra dhe foto të dëshironi për këtë model.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddColor}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium uppercase tracking-wider bg-[var(--bg-surface-raised)] border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-active)] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Shto Ngjyrë Tjetër</span>
          </button>
        </div>

        <div className="space-y-3">
          {colors.map((color, idx) => (
            <CmsColorItem
              key={idx}
              color={color}
              index={idx}
              canRemove={colors.length > 1}
              onRemove={handleRemoveColor}
              onChange={handleColorChange}
              onFileUpload={handleFileUpload}
            />
          ))}
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto min-w-[240px] h-12 px-6 bg-[var(--text-primary)] text-[var(--bg-canvas)] font-sans font-medium text-xs uppercase tracking-[0.18em] hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 select-none"
        >
          {isLoading ? <span>Duke publikuar...</span> : <span>Publiko Çantën në Dyqan</span>}
        </button>
      </div>
    </form>
  );
}
