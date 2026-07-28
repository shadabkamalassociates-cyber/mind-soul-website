import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailPage from "@/components/BlogDetailPage";
import { getBlog, getBlogSlugs } from "@/data/blogs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlog(slug);
  if (!article) return { title: "Article Not Found | SoulSensei" };

  return {
    title: `${article.title} | SoulSensei Blog`,
    description: article.excerpt,
  };
}

export default async function BlogDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlog(slug);
  if (!article) notFound();

  return <BlogDetailPage article={article} />;
}
