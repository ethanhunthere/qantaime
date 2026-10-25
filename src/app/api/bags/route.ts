import { NextRequest, NextResponse } from "next/server";
import {
  fetchAllBagsMerged,
  readCustomBags,
  createBag,
  deleteBagById,
} from "@/entities/bag/model/store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const onlyCustom = searchParams.get("custom") === "true";

    const bags = onlyCustom ? readCustomBags() : fetchAllBagsMerged();
    return NextResponse.json({ success: true, bags });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, priceEur, colors } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Emri i çantës është i detyrueshëm." },
        { status: 400 }
      );
    }

    const price = Number(priceEur);
    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { success: false, error: "Ju lutem shënoni një çmim të vlefshëm në Euro." },
        { status: 400 }
      );
    }

    if (!Array.isArray(colors) || colors.length === 0) {
      return NextResponse.json(
        { success: false, error: "Ju lutem shtoni të paktën një ngjyrë dhe foto për çantën." },
        { status: 400 }
      );
    }

    const newBag = createBag({
      name: name.trim(),
      priceEur: price,
      colors: colors.map((c: { name?: string; hex?: string; image?: string }) => ({
        name: (c.name || "E Zezë").trim(),
        hex: c.hex || "#18181b",
        image: (c.image || "").trim() || "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
      })),
    });

    return NextResponse.json({ success: true, bag: newBag }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Mungon ID-ja e çantës." },
        { status: 400 }
      );
    }

    const deleted = deleteBagById(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Çanta nuk u gjet ose nuk mund të fshihet." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
