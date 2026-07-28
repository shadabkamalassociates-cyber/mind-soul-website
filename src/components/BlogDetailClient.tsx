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
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-[860px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <div className="h-4 w-28 animate-pulse rounded bg-[#E8EAF4]" />
          <div className="mt-6 h-5 w-24 animate-pulse rounded bg-[#E8EAF4]" />
          <div className="mt-4 h-12 w-full max-w-[640px] animate-pulse rounded bg-[#E8EAF4]" />
          <div className="mt-4 h-4 w-72 animate-pulse rounded bg-[#E8EAF4]" />
          <div className="mt-8 aspect-[16/9] w-full animate-pulse rounded-2xl bg-[#E8EAF4]" />
          <div className="mt-8 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-[#E8EAF4]" />
            <div className="h-4 w-full animate-pulse rounded bg-[#E8EAF4]" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-[#E8EAF4]" />
          </div>
        </div>
      </main>
    );
  }

  if (isMissing || !article) notFound();

  return <BlogDetailPage article={article} relatedArticles={relatedArticles} />;
}
