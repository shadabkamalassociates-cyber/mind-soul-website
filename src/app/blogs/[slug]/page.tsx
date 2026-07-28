import type { Metadata } from "next";
import BlogDetailClient from "@/components/BlogDetailClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ")} | SoulSensei Blog`,
    description: "Blog article",
  };
}

export default async function BlogDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
