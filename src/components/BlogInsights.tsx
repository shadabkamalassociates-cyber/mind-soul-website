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
    <section id="blog" className="blog-insights-section relative w-full overflow-hidden bg-gradient-to-br from-[#F8F2FD] via-[#EDE4F8] to-[#ECE4F8] py-8 sm:py-12 lg:py-14">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10 xl:px-12">
        <div className="mb-5 sm:mb-8">
          <div className="flex items-start justify-between gap-3 sm:items-end sm:gap-4">
            <div className="min-w-0 flex-1">
              <h2
                className="text-[24px] font-medium leading-tight text-[#3B1C5B] sm:text-[34px] lg:text-[40px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                From Our Blog & Insights
              </h2>
              <p className="mt-1 text-[12px] text-[#6B5B8A] sm:mt-1.5 sm:text-[14px]">
                Wisdom for your everyday life
              </p>
              <Link
                href="/blogs"
                className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-semibold text-[#4B2475] sm:hidden"
              >
                View All Articles
                <ArrowRightIcon />
              </Link>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/blogs"
                className="text-[13px] font-medium text-[#4B2475] transition hover:text-[#C5A059]"
              >
                View All Articles
              </Link>
              {articles.length > 1 && (
                <div className="flex items-center gap-2">
                  <CarouselBtn direction="prev" onClick={() => scrollByCard(-1)} />
                  <CarouselBtn direction="next" onClick={() => scrollByCard(1)} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          {articles.length > 1 && (
            <>
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
            </>
          )}

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
            <>
              {/* Mobile — compact 2-column grid */}
              <div className="grid grid-cols-2 gap-3 sm:hidden">
                {articles.slice(0, 4).map((article) => (
                  <div key={article.id} data-blog-card className="blog-card-mobile shrink-0">
                    <BlogCard article={article} variant="overlay" compact />
                  </div>
                ))}
              </div>

              {/* Tablet+ — carousel */}
              <div
                ref={scrollerRef}
                className="blog-scroller hidden gap-4 overflow-x-auto scroll-smooth sm:flex"
              >
                {articles.map((article) => (
                  <div key={article.id} data-blog-card className="blog-card shrink-0">
                    <BlogCard article={article} variant="overlay" />
                  </div>
                ))}
              </div>
            </>
          )}
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

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
