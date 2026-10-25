import { Bag } from "@/shared/types";
import { fetchAllBagsMerged } from "./store";

export async function getAllBags(): Promise<Bag[]> {
  return fetchAllBagsMerged();
}

export async function getBagBySlug(slug: string): Promise<Bag | null> {
  const allBags = fetchAllBagsMerged();
  const bag = allBags.find((b) => b.slug === slug);
  return bag || null;
}
