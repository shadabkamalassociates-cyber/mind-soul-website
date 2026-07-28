"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { blogArticles, getBlogCategories } from "@/data/blogs";

const categories = [{ id: "all", label: "All" }, ...getBlogCategories().map((c) => ({ id: c, label: c }))];

const heroFeatures = [
  {
    title: "Curated Wisdom",
    desc: "Handpicked articles for your journey",
    icon: <BookIcon />,
  },
  {
    title: "Practical Guides",
    desc: "Actionable rituals & techniques",
    icon: <SparkIcon />,
  },
  {
    title: "Soulful Insights",
    desc: "Mind, body & spirit perspectives",
    icon: <LotusIcon />,
  },
];

const heroStats = [
  { value: `${blogArticles.length}+`, label: "Articles" },
  { value: `${getBlogCategories().length}`, label: "Topics" },
  { value: "5 min", label: "Avg. Read" },
];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return blogArticles.filter((article) => {
      const catOk = activeCategory === "all" || article.category === activeCategory;
      const q = query.trim().toLowerCase();
      const qOk =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [activeCategory, query]);

  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#F7F6FB]">
        <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-[#3D3D8F]/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-[#C9A06A]/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-[#EDEAF8]/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 pt-10 pb-12 sm:px-6 sm:pt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-8 lg:pt-14 lg:pb-16">
          <div className="relative z-10 max-w-[540px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A06A]">
              Blog & Insights —
            </p>
            <h1
              className="mt-3 text-[34px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#3D3D8F] sm:text-[42px] lg:text-[46px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Stories That Inspire.
              <br />
              Wisdom That Transforms.
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A06A]/70" />
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A06A]/30 bg-white/80 text-[#C9A06A]">
                <LotusIcon />
              </span>
              <span className="h-px w-10 bg-[#C9A06A]/70" />
            </div>

            <p className="mt-5 max-w-[480px] text-[14px] leading-[1.8] text-[#5C5C7A] sm:text-[15px]">
              Explore thoughtful articles on wellness, spirituality, meditation,
              and personal growth — crafted to bring clarity, healing, and
              transformation to your everyday life.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#E4E2EF] bg-white/80 px-4 py-2.5 shadow-[0_4px_16px_rgba(26,26,74,0.04)] backdrop-blur-sm"
                >
                  <p
                    className="text-[18px] font-semibold leading-none text-[#3D3D8F] sm:text-[20px]"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#8A8AA8]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3">
              {heroFeatures.map((f) => (
                <div key={f.title} className="flex items-start gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C9A06A]/30 bg-white text-[#C9A06A]">
                    {f.icon}
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold text-[#1A1A4A] sm:text-[13px]">
                      {f.title}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-snug text-[#8A8AA8] sm:text-[11px]">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <BlogHeroVisual />

          <div className="relative mx-auto w-full max-w-[420px] lg:hidden">
            <div className="overflow-hidden rounded-2xl border border-[#E8EAF4] bg-white shadow-[0_12px_32px_rgba(26,26,74,0.08)]">
              <div className="relative h-[160px] w-full overflow-hidden">
                <Image
                  src={blogArticles[0].image}
                  alt={blogArticles[0].title}
                  fill
                  className="object-cover object-center"
                  sizes="420px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A4A]/60 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded bg-[#C9A06A] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
                  {blogArticles[0].category}
                </span>
                <p
                  className="absolute inset-x-0 bottom-0 px-4 pb-3.5 text-[15px] font-semibold leading-snug text-white"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {blogArticles[0].title}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E4E2EF] to-transparent" />
      </section>

      {/* Search + Filters */}
      <section className="border-y border-[#E8EAF4] bg-[#F8F9FC]">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 rounded-2xl border border-[#E8EAF4] bg-white p-3 shadow-[0_6px_24px_rgba(26,26,74,0.05)] lg:flex-row lg:items-center lg:gap-3 lg:p-3.5">
            <div className="relative min-w-0 flex-1">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8AA8]">
                <SearchIcon />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, topics..."
                className="w-full rounded-xl border border-[#E0E2EE] bg-white py-3 pl-10 pr-4 text-[13px] text-[#1A1A4A] outline-none placeholder:text-[#A0A0B8] focus:border-[#3D3D8F]"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-medium transition sm:text-[13px] ${
                    active
                      ? "border-[#3D3D8F] bg-[#3D3D8F] text-white"
                      : "border-[#D8DAE8] bg-white text-[#1A1A4A] hover:border-[#3D3D8F]/40"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-7 flex items-end justify-between gap-4">
            <h2
              className="text-[26px] font-semibold text-[#3D3D8F] sm:text-[30px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Latest Articles
            </h2>
            <p className="shrink-0 text-[13px] text-[#8A8AA8]">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {filtered.map((article) => (
                <BlogCard key={article.slug} article={article} variant="listing" />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-[14px] text-[#8A8AA8]">
              No articles found. Try a different search or category.
            </p>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[#EEF0FA]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:justify-between lg:gap-8 lg:px-8 lg:py-12">
          <div className="text-center lg:text-left">
            <h3
              className="text-[20px] font-semibold text-[#3D3D8F] sm:text-[22px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Stay Inspired
            </h3>
            <p className="mt-1 text-[13px] text-[#5C5C7A]">
              Get weekly wisdom delivered to your inbox — articles, rituals, and
              insights for your spiritual journey.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-[480px] flex-col gap-2.5 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-xl border border-[#E0E2EE] bg-white px-4 py-3 text-[13px] text-[#1A1A4A] outline-none placeholder:text-[#A0A0B8] focus:border-[#3D3D8F]"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#3D3D8F] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[#2F2F70]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16.5 16.5L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BlogHeroVisual() {
  const featured = blogArticles.slice(0, 3);

  return (
    <div className="relative mx-auto hidden h-[360px] w-full max-w-[520px] lg:block lg:h-[400px] lg:justify-self-end">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.12]">
        <Image
          src="/contact-mandala-gold.png"
          alt=""
          width={320}
          height={320}
          unoptimized
          className="object-contain"
        />
      </div>

      <div className="absolute left-0 top-6 z-10 w-[58%] overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_16px_40px_rgba(26,26,74,0.12)]">
        <div className="relative h-[130px] w-full overflow-hidden">
          <Image
            src={featured[0].image}
            alt={featured[0].title}
            fill
            className="object-cover object-center"
            sizes="300px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A4A]/50 to-transparent" />
          <span className="absolute left-3 top-3 rounded bg-[#C9A06A] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
            {featured[0].category}
          </span>
        </div>
        <div className="px-3.5 py-3">
          <p
            className="line-clamp-2 text-[13px] font-semibold leading-snug text-[#3D3D8F]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {featured[0].title}
          </p>
          <p className="mt-1 text-[10px] text-[#8A8AA8]">
            {featured[0].readTime}
          </p>
        </div>
      </div>

      <div className="absolute right-0 top-0 z-20 w-[52%] overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_20px_48px_rgba(26,26,74,0.14)]">
        <div className="relative h-[120px] w-full overflow-hidden">
          <Image
            src={featured[1].image}
            alt={featured[1].title}
            fill
            className="object-cover object-center"
            sizes="280px"
          />
          <span className="absolute left-3 top-3 rounded bg-[#3D3D8F] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
            {featured[1].category}
          </span>
        </div>
        <div className="px-3.5 py-3">
          <p
            className="line-clamp-2 text-[12px] font-semibold leading-snug text-[#3D3D8F]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {featured[1].title}
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 left-[18%] z-30 w-[64%] overflow-hidden rounded-2xl border border-[#E8EAF4] bg-gradient-to-br from-[#3D3D8F] to-[#1A1A4A] p-4 shadow-[0_18px_44px_rgba(26,26,74,0.2)]">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#C9A06A]">
          Featured Read
        </p>
        <p
          className="mt-1.5 line-clamp-2 text-[14px] font-semibold leading-snug text-white"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {featured[2].title}
        </p>
        <p className="mt-2 text-[10px] text-white/70">
          {featured[2].date} • {featured[2].readTime}
        </p>
      </div>

      <div className="pointer-events-none absolute -right-2 bottom-16 z-0 h-24 w-24 rounded-full border border-[#C9A06A]/20 bg-[#C9A06A]/10" />
      <div className="pointer-events-none absolute left-8 top-2 z-0 h-16 w-16 rounded-full border border-[#3D3D8F]/10 bg-[#3D3D8F]/5" />
    </div>
  );
}

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 4.5H14C15.1 4.5 16 5.4 16 6.5V19.5C16 18.1 14.9 17 13.5 17H5V4.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 4.5H17C18.1 4.5 19 5.4 19 6.5V19.5C19 18.1 17.9 17 16.5 17H8V4.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3L13.5 9L19.5 10.5L13.5 12L12 18L10.5 12L4.5 10.5L10.5 9L12 3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function LotusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4C10 7 8 8 5 8.5C7 10 8.5 12 9 15C10.5 12.5 12 11.5 15 11C13 13.5 12 16 12 20C12 16 11 13.5 9 11C12 11.5 13.5 12.5 15 15C15.5 12 17 10 19 8.5C16 8 14 7 12 4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
