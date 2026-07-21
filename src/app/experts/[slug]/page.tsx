import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExpertProfileDetail from "@/components/ExpertProfileDetail";
import { experts, getExpertBySlug } from "@/data/experts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return experts.map((expert) => ({ slug: expert.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);
  if (!expert) return { title: "Expert Not Found | SoulSensei" };

  return {
    title: `${expert.name} | SoulSensei Experts`,
    description: expert.bio,
  };
}

export default async function ExpertProfilePage({ params }: Props) {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);

  if (!expert) notFound();

  return <ExpertProfileDetail expert={expert} />;
}
