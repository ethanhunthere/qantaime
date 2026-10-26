import React from "react";
import { Bag } from "@/shared/types";
import { BagGrid } from "@/widgets/bag-grid";
import { HeroBanner } from "@/widgets/hero-banner";

interface StoreViewProps {
  bags: Bag[];
}

export function StoreView({ bags }: StoreViewProps) {
  return (
    <div className="flex flex-col w-full">
      <HeroBanner />
      <BagGrid initialBags={bags} />
    </div>
  );
}
