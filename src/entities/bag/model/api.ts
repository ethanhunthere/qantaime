import { Bag } from "@/shared/types";
import { MOCK_BAGS } from "./mock-bags";

export async function getAllBags(): Promise<Bag[]> {
  // Simulates server-side database retrieval with 0 overhead
  return MOCK_BAGS;
}

export async function getBagBySlug(slug: string): Promise<Bag | null> {
  const bag = MOCK_BAGS.find((b) => b.slug === slug);
  return bag || null;
}
