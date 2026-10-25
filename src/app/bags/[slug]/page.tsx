import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBagBySlug, getAllBags } from "@/entities/bag/server";
import { BagDetailView } from "@/views/bag-detail-view";

interface BagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const bags = await getAllBags();
  return bags.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: BagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const bag = await getBagBySlug(slug);

  if (!bag) {
    return {
      title: "Silhouette Not Found",
    };
  }

  return {
    title: `${bag.name} — ${bag.tagline}`,
    description: bag.description,
    openGraph: {
      title: `${bag.name} | QANTAIME`,
      description: bag.description,
      images: bag.images.map((img) => ({ url: img })),
    },
  };
}

export default async function BagDetailPage({ params }: BagPageProps) {
  const { slug } = await params;
  const bag = await getBagBySlug(slug);

  if (!bag) {
    notFound();
  }

  return <BagDetailView bag={bag} />;
}
