"use client";

import React from "react";
import { Trash2, Upload } from "lucide-react";

export interface ColorDraft {
  name: string;
  hex: string;
  image: string;
}

interface CmsColorItemProps {
  color: ColorDraft;
  index: number;
  canRemove: boolean;
  onRemove: (idx: number) => void;
  onChange: (idx: number, field: keyof ColorDraft, val: string) => void;
  onFileUpload: (idx: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PRESET_COLORS = [
  { name: "E Zezë", hex: "#141416" },
  { name: "Kafe e Errët", hex: "#2b1e1a" },
  { name: "Konjak", hex: "#7d4824" },
  { name: "Krem", hex: "#d8c4b6" },
  { name: "Ulli", hex: "#3b4238" },
];

export function CmsColorItem({
  color,
  index,
  canRemove,
  onRemove,
  onChange,
  onFileUpload,
}: CmsColorItemProps) {
  return (
    <div className="p-3.5 bg-[var(--bg-surface)] border border-[var(--border-strong)] space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium text-[var(--text-primary)] uppercase">
          Ngjyra #{index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-1 text-[var(--text-muted)] hover:text-red-600 transition-colors cursor-pointer"
            title="Hiq këtë ngjyrë"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] font-mono text-[var(--text-secondary)]">Emri i Ngjyrës</label>
          <input
            type="text"
            required
            placeholder="p.sh. E Zezë Klasike"
            value={color.name}
            onChange={(e) => onChange(index, "name", e.target.value)}
            className="w-full h-9 px-2.5 text-xs font-sans bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] text-[var(--text-primary)] outline-none"
          />
          <div className="flex flex-wrap gap-1 pt-1">
            {PRESET_COLORS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  onChange(index, "name", p.name);
                  onChange(index, "hex", p.hex);
                }}
                className="px-1.5 py-0.5 text-[9px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono text-[var(--text-secondary)]">Kodi / Nuanca</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color.hex}
              onChange={(e) => onChange(index, "hex", e.target.value)}
              className="w-9 h-9 p-0.5 border border-[var(--border-strong)] bg-[var(--bg-surface-raised)] cursor-pointer"
            />
            <input
              type="text"
              value={color.hex}
              onChange={(e) => onChange(index, "hex", e.target.value)}
              className="flex-1 h-9 px-2.5 text-xs font-mono bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] text-[var(--text-primary)] outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5 pt-1">
        <label className="text-[11px] font-mono text-[var(--text-secondary)]">
          Fotoja e Çantës (Vendos URL ose Ngarko nga Pajisja) *
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            required
            placeholder="https://... ose zgjidh foto nga telefoni"
            value={color.image.startsWith("data:") ? "[Foto e Ngarkuar nga Pajisja]" : color.image}
            onChange={(e) => onChange(index, "image", e.target.value)}
            className="flex-1 h-9 px-2.5 text-xs font-mono bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] text-[var(--text-primary)] outline-none truncate"
          />
          <label className="h-9 px-3 flex items-center justify-center gap-1.5 bg-[var(--bg-surface-raised)] hover:bg-[var(--bg-surface-active)] border border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-mono cursor-pointer shrink-0">
            <Upload className="w-3.5 h-3.5" />
            <span>Zgjidh Foto</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onFileUpload(index, e)}
              className="hidden"
            />
          </label>
        </div>

        {color.image && (
          <div className="flex items-center gap-3 pt-1.5">
            <div className="relative w-14 h-14 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={color.image} alt="Pamje paraprake" className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
              Fotoja u ngarkua me sukses.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
