import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategorySessionsPage from "@/components/CategorySessionsPage";
import { getCategory, getCategorySlugs } from "@/data/categories";
import { getSessionsByCategory } from "@/data/liveSessions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category | SoulSensei" };
  return {
    title: `${category.label} | SoulSensei`,
    description: `Live sessions related to ${category.label}.`,
  };
}

export default async function CategoryRoute({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const sessions = getSessionsByCategory(slug);
  return <CategorySessionsPage category={category} sessions={sessions} />;
}
