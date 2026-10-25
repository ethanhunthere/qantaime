import { Metadata } from "next";
import { getAllBags } from "@/entities/bag/server";
import { CmsView } from "@/views/cms-view";

export const metadata: Metadata = {
  title: "Paneli i Dyqanit (CMS) — QANTAIME",
  description: "Postoni dhe menaxhoni çantat dhe variantet e ngjyrave.",
};

export const dynamic = "force-dynamic";

export default async function CmsPage() {
  const bags = await getAllBags();
  return <CmsView initialBags={bags} />;
}
