"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import type { BlogArticle } from "@/types/blog";
import { blogArticles } from "@/data/blogs";

type BlogDetailPageProps = {
  article: BlogArticle;
};

export default function BlogDetailPage({ article }: BlogDetailPageProps) {
  const related = blogArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  const moreRelated =
    related.length < 3
      ? [
          ...related,
          ...blogArticles
            .filter(
              (a) =>
                a.slug !== article.slug &&
                !related.some((r) => r.slug === a.slug),
            )
            .slice(0, 3 - related.length),
        ]
      : related;

  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      <article className="mx-auto max-w-[860px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A]"
        >
          ← Back to Blog
        </Link>

        <span className="mt-6 inline-block rounded bg-[#C9A06A] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
          {article.category}
        </span>

        <h1
          className="mt-4 text-[32px] font-semibold leading-[1.15] text-[#3D3D8F] sm:text-[40px] lg:text-[44px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#8A8AA8]">
          <span>{article.date}</span>
          <span className="text-[#D0D2E0]">•</span>
          <span>{article.readTime}</span>
          <span className="text-[#D0D2E0]">•</span>
          <span>By {article.author}</span>
        </div>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#E8EAF4] shadow-[0_8px_32px_rgba(26,26,74,0.08)]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover object-center"
            sizes="860px"
            priority
            quality={95}
          />
        </div>

        <div className="mt-8 space-y-5">
          {article.content.map((paragraph, i) => (
            <p
              key={i}
              className="text-[15px] leading-[1.85] text-[#5C5C7A] sm:text-[16px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
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
