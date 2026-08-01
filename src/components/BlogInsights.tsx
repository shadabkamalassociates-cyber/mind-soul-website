"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { getBlogArticles } from "@/data/blogs";
import { ApiError } from "@/services/apiClient";
import type { BlogArticle } from "@/types/blog";

const GAP = 16;

export default function BlogInsights() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadBlogs() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getBlogArticles();
        if (!cancelled) setArticles(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : err instanceof Error
                ? err.message
                : "Failed to load blog articles",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadBlogs();
    return () => {
      cancelled = true;
    };
  }, []);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-blog-card]");
    if (!card) return;
    const amount = card.getBoundingClientRect().width + GAP;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section id="blog" className="blog-insights-section relative w-full overflow-hidden bg-gradient-to-br from-[#F8F2FD] via-[#EDE4F8] to-[#ECE4F8] py-10 sm:py-12 lg:py-14">
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <h2
              className="text-[28px] font-medium leading-tight text-[#3B1C5B] sm:text-[34px] lg:text-[40px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              From Our Blog & Insights
            </h2>
            <p className="mt-1.5 text-[13px] text-[#6B5B8A] sm:text-[14px]">
              Wisdom for your everyday life
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/blogs"
              className="text-[13px] font-medium text-[#4B2475] transition hover:text-[#C5A059]"
            >
              View All Articles
            </Link>
            <div className="flex items-center gap-2">
              <CarouselBtn direction="prev" onClick={() => scrollByCard(-1)} />
              <CarouselBtn direction="next" onClick={() => scrollByCard(1)} />
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Previous articles"
            onClick={() => scrollByCard(-1)}
            className="blog-carousel-side-btn absolute top-1/2 left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next articles"
            onClick={() => scrollByCard(1)}
            className="blog-carousel-side-btn absolute top-1/2 right-0 z-20 hidden translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronRight />
          </button>

          {isLoading && (
            <p className="py-12 text-center text-[14px] text-[#8A8AA8]">
              Loading articles...
            </p>
          )}

          {!isLoading && error && (
            <p className="py-12 text-center text-[14px] text-[#B42318]">
              {error}
            </p>
          )}

          {!isLoading && !error && articles.length === 0 && (
            <p className="py-12 text-center text-[14px] text-[#8A8AA8]">
              No blog articles available yet. Check back soon.
            </p>
          )}

          {!isLoading && !error && articles.length > 0 && (
            <div
              ref={scrollerRef}
              className="blog-scroller flex gap-4 overflow-x-auto scroll-smooth"
            >
              {articles.map((article) => (
                <div key={article.id} data-blog-card className="blog-card shrink-0">
                  <BlogCard article={article} variant="overlay" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between sm:hidden">
          <Link href="/blogs" className="text-[13px] font-medium text-[#4B2475]">
            View All Articles
          </Link>
          <div className="flex items-center gap-2">
            <CarouselBtn direction="prev" onClick={() => scrollByCard(-1)} />
            <CarouselBtn direction="next" onClick={() => scrollByCard(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselBtn({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous" : "Next"}
      onClick={onClick}
      className="blog-carousel-btn flex h-9 w-9 items-center justify-center rounded-full"
    >
      {direction === "prev" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M10 3.5L5.5 8L10 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
