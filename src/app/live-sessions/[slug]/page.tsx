import type { Metadata } from "next";
import LiveSessionDetailClient from "@/components/LiveSessionDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ")} | Cosmicguruji`,
    description: "Live session details",
  };
}

export default async function LiveSessionDetailRoute({ params }: Props) {
  const { slug } = await params;
  return <LiveSessionDetailClient slug={slug} />;
}
