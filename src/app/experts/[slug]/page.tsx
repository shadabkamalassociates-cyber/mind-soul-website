import type { Metadata } from "next";
import ExpertProfileClient from "@/components/ExpertProfileClient";
import { experts, getExpertBySlug } from "@/data/experts";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return experts.map((expert) => ({ slug: expert.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);
  if (expert) {
    return {
      title: `${expert.name} | cosmicgurujii Experts`,
      description: expert.bio,
    };
  }
  return {
    title: "Expert Profile | cosmicgurujii",
    description: "View expert profile on cosmicgurujii.",
  };
}

export default async function ExpertProfilePage({ params }: Props) {
  const { slug } = await params;
  return <ExpertProfileClient slug={slug} />;
}
