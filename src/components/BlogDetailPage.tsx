"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import type { BlogArticle } from "@/types/blog";

type BlogDetailPageProps = {
  article: BlogArticle;
  relatedArticles?: BlogArticle[];
};

export default function BlogDetailPage({
  article,
  relatedArticles = [],
}: BlogDetailPageProps) {
  const moreRelated = relatedArticles.slice(0, 3);
  const hasHtmlContent = /<[a-z][\s\S]*>/i.test(article.htmlContent.trim());

  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      <article className="mx-auto max-w-[860px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <header className="space-y-5">
          <div className="flex items-center gap-4">
            <Link
              href="/blogs"
              aria-label="Back to Blog"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E0E2EE] bg-white text-[#3D3D8F] shadow-[0_2px_8px_rgba(26,26,74,0.06)] transition hover:border-[#3D3D8F]/25 hover:bg-[#F8F9FC] hover:text-[#1A1A4A]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M15 6L9 12L15 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <span className="inline-flex w-fit rounded bg-[#C9A06A] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
              {article.category}
            </span>
          </div>

          <h1
            className="text-[32px] font-semibold leading-[1.15] text-[#3D3D8F] sm:text-[40px] lg:text-[44px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#8A8AA8]">
            <span>{article.date}</span>
            <span className="text-[#D0D2E0]">•</span>
            <span>{article.readTime}</span>
            <span className="text-[#D0D2E0]">•</span>
            <span>By {article.author}</span>
            {typeof article.views === "number" && (
              <>
                <span className="text-[#D0D2E0]">•</span>
                <span>{article.views.toLocaleString()} views</span>
              </>
            )}
          </div>
        </header>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#E8EAF4] shadow-[0_8px_32px_rgba(26,26,74,0.08)]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            unoptimized
            className="object-cover object-center"
            sizes="860px"
            priority
            quality={95}
          />
        </div>

        {article.shortDescription && (
          <p className="mt-8 border-l-[3px] border-[#C9A06A] pl-4 text-[16px] font-medium leading-[1.75] text-[#5C5C7A] sm:text-[17px]">
            {article.shortDescription}
          </p>
        )}

        <div className="mt-8">
          {hasHtmlContent ? (
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: article.htmlContent }}
            />
          ) : (
            <div className="blog-prose">
              {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>

        {article.categorySlug && (
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[#E8EAF4] pt-8">
            <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#8A8AA8]">
              Category
            </span>
            <Link
              href={`/blogs?category=${encodeURIComponent(article.categorySlug)}`}
              className="inline-flex items-center rounded-full border border-[#D8DAE8] bg-[#F8F9FC] px-3.5 py-1.5 text-[12px] font-medium text-[#3D3D8F] transition hover:border-[#3D3D8F]/40 hover:bg-white"
            >
              {article.category}
            </Link>
          </div>
        )}
      </article>

      {moreRelated.length > 0 && (
        <section className="border-t border-[#E8EAF4] bg-[#F8F9FC]">
          <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
            <h2
              className="mb-7 text-[24px] font-semibold text-[#3D3D8F] sm:text-[28px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {moreRelated.map((a) => (
                <BlogCard key={a.slug} article={a} variant="listing" />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
