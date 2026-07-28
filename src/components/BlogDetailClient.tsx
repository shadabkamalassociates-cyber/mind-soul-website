"use client";

import { useEffect, useMemo } from "react";
import { notFound } from "next/navigation";
import BlogDetailPage from "@/components/BlogDetailPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBlogBySlug, fetchBlogs } from "@/store/slices/blogsSlice";
import { mapBlogForUi } from "@/services/blogsService";
import { blogArticles } from "@/data/blogs";

export default function BlogDetailClient({ slug }: { slug: string }) {
  const dispatch = useAppDispatch();
  const blogsState = useAppSelector((s) => s.blogs);

  useEffect(() => {
    if (blogsState.status === "idle" && !blogsState.selected) {
      dispatch(fetchBlogBySlug(slug));
    }
    if (blogsState.items.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [blogsState.status, blogsState.selected, blogsState.items.length, slug, dispatch]);

  const article = useMemo(() => {
    if (blogsState.selected) {
      return mapBlogForUi(blogsState.selected);
    }
    const fromList = blogsState.items.find(
      (b) => b.slug === slug || String(b.id) === slug,
    );
    if (fromList) return mapBlogForUi(fromList);
    return blogArticles.find((b) => b.slug === slug) ?? null;
  }, [blogsState.selected, blogsState.items, slug]);

  const relatedArticles = useMemo(() => {
    const apiMapped = blogsState.items
      .filter((b) => b.slug !== slug && String(b.id) !== slug)
      .map((b) => mapBlogForUi(b));
    const pool = apiMapped.length > 0 ? apiMapped : blogArticles;
    if (!article) return pool.slice(0, 3);
    return pool
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .slice(0, 3);
  }, [blogsState.items, slug, article]);

  const isLoading =
    blogsState.status === "loading" &&
    !article &&
    blogsState.items.length === 0;

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-[#8A8AA8]">
        Loading article...
      </main>
    );
  }

  if (!article) notFound();

  return <BlogDetailPage article={article} relatedArticles={relatedArticles} />;
}
