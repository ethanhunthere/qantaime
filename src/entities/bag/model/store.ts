import fs from "fs";
import path from "path";
import { Bag, ColorVariant } from "@/shared/types";
import { MOCK_BAGS } from "./mock-bags";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "custom-bags.json");

function ensureFileExists(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Failed to initialize custom-bags.json:", err);
  }
}

export function readCustomBags(): Bag[] {
  try {
    ensureFileExists();
    if (!fs.existsSync(FILE_PATH)) return [];
    const content = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(content) as Bag[];
  } catch (err) {
    console.error("Error reading custom-bags.json:", err);
    return [];
  }
}

export function writeCustomBags(bags: Bag[]): void {
  try {
    ensureFileExists();
    fs.writeFileSync(FILE_PATH, JSON.stringify(bags, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing custom-bags.json:", err);
  }
}

export interface CreateBagInput {
  name: string;
  priceEur: number;
  colors: {
    name: string;
    hex: string;
    image: string;
  }[];
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function createBag(input: CreateBagInput): Bag {
  const customBags = readCustomBags();
  const baseSlug = slugify(input.name) || "qanta";
  const uniqueId = `bag-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;

  const mappedColors: ColorVariant[] = input.colors.map((c, idx) => ({
    id: `col-${idx}-${Date.now().toString(36)}`,
    name: c.name.trim() || `Ngjyra ${idx + 1}`,
    hex: c.hex || "#18181b",
    image: c.image || "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
  }));

  const newBag: Bag = {
    id: uniqueId,
    slug,
    name: input.name.trim(),
    tagline: "Model i ri origjinal me lëkurë natyrale",
    category: "all",
    priceEur: Number(input.priceEur),
    capacityLiters: 16,
    weightGrams: 850,
    dimensions: {
      widthMm: 380,
      heightMm: 280,
      depthMm: 120,
    },
    leatherType: "Lëkurë Natyrale",
    liningMaterial: "Pambuk Natyral i Përforcuar",
    hardwareOptions: [
      { id: "hw-palladium", name: "Metal Argjend i Lëmuar", finish: "palladium" },
      { id: "hw-brass", name: "Metal i Artë Klasik", finish: "brass" },
    ],
    colors: mappedColors,
    description: `${input.name} është një model luksoz i përzgjedhur me përkushtim për elegancë të përditshme dhe jetëgjatësi.`,
    craftsmanshipNotes: [
      "Përzgjedhje e lëkurës origjinale me strukturë rezistente",
      "Përfundime të qëndrueshme me prerje precize",
    ],
    features: [
      "Hapësirë e bollshme për organizim të përditshëm",
      "Rrip i rregullueshëm dhe komod",
    ],
    inStock: true,
    isNewArrival: true,
    isBestseller: false,
    images: mappedColors.map((c) => c.image),
    rating: 5,
    reviewsCount: 1,
  };

  customBags.unshift(newBag);
  writeCustomBags(customBags);
  return newBag;
}

export function deleteBagById(id: string): boolean {
  const customBags = readCustomBags();
  const filtered = customBags.filter((b) => b.id !== id);
  if (filtered.length === customBags.length) return false;
  writeCustomBags(filtered);
  return true;
}

export function fetchAllBagsMerged(): Bag[] {
  const customBags = readCustomBags();
  return [...customBags, ...MOCK_BAGS];
}
