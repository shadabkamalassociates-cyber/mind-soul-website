"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import BlogDetailPage from "@/components/BlogDetailPage";
import {
  fetchAllBlogs,
  fetchBlogBySlug,
  mapBlogForUi,
} from "@/services/blogsService";
import type { BlogArticle } from "@/types/blog";

export default function BlogDetailClient({ slug }: { slug: string }) {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMissing, setIsMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadArticle() {
      setIsLoading(true);
      setIsMissing(false);
      setArticle(null);
      setRelatedArticles([]);

      try {
        const blog = await fetchBlogBySlug(slug);
        if (cancelled) return;

        const mapped = mapBlogForUi(blog);
        setArticle(mapped);

        try {
          const allBlogs = await fetchAllBlogs();
          if (cancelled) return;

          const related = allBlogs
            .filter(
              (item) =>
                item.slug !== slug &&
                String(item.id ?? "") !== slug &&
                String(item.id ?? "") !== String(blog.id ?? ""),
            )
            .map((item) => mapBlogForUi(item))
            .filter((item) => item.category === mapped.category)
            .slice(0, 3);

          setRelatedArticles(related);
        } catch {
          if (!cancelled) setRelatedArticles([]);
        }
      } catch {
        if (!cancelled) setIsMissing(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadArticle();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-[#8A8AA8]">
        Loading article...
      </main>
    );
  }

  if (isMissing || !article) notFound();

  return <BlogDetailPage article={article} relatedArticles={relatedArticles} />;
}
