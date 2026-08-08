import type { Metadata } from "next";
import CategorySessionsClient from "@/components/CategorySessionsClient";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Category ${slug} | Cosmicguruji`,
    description: "Live sessions related to this category.",
  };
}

export default async function CategoryRoute({ params }: Props) {
  const { slug } = await params;
  return <CategorySessionsClient categoryId={slug} />;
}
