import React from "react";
import { Bag } from "@/shared/types";
import { HeroAtelier } from "@/widgets/hero-atelier";
import { BagGrid } from "@/widgets/bag-grid";
import { CraftsmanshipStory } from "@/widgets/craftsmanship-story";

interface StoreViewProps {
  bags: Bag[];
}

export function StoreView({ bags }: StoreViewProps) {
  return (
    <div className="flex flex-col w-full">
      <HeroAtelier />
      <BagGrid initialBags={bags} />
      <CraftsmanshipStory />
    </div>
  );
}
