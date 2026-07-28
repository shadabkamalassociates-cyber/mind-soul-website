import type { Metadata } from "next";
import BlogDetailClient from "@/components/BlogDetailClient";
import { fetchBlogBySlug, mapBlogForUi } from "@/services/blogsService";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await fetchBlogBySlug(slug);
    const article = mapBlogForUi(blog);

    return {
      title: `${article.title} | SoulSensei Blog`,
      description: article.shortDescription || article.excerpt,
    };
  } catch {
    return {
      title: `${slug.replace(/-/g, " ")} | SoulSensei Blog`,
      description: "Blog article",
    };
  }
}

export default async function BlogDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
