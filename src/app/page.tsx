import { getAllBags } from "@/entities/bag";
import { StoreView } from "@/views/store-view";

export default async function HomePage() {
  const bags = await getAllBags();

  return <StoreView bags={bags} />;
}
