"use client";

import { useRef } from "react";
import Image from "next/image";

type Article = {
  id: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
};

const GAP = 16;

const articles: Article[] = [
  {
    id: "1",
    title: "10 Powerful Morning Rituals for Inner Peace",
    date: "May 10, 2025",
    readTime: "5 min read",
    image: "/blog/blog-1.png",
  },
  {
    id: "2",
    title: "Understanding Your Chakras: A Complete Guide",
    date: "May 8, 2025",
    readTime: "7 min read",
    image: "/blog/blog-2.png",
  },
  {
    id: "3",
    title: "How to Manifest Abundance in 21 Days",
    date: "May 5, 2025",
    readTime: "6 min read",
    image: "/blog/blog-3.png",
  },
  {
    id: "4",
    title: "The Power of Forgiveness in Healing",
    date: "May 3, 2025",
    readTime: "4 min read",
    image: "/blog/blog-4.png",
  },
  {
    id: "5",
    title: "Meditation Techniques for Beginners",
    date: "May 1, 2025",
    readTime: "5 min read",
    image: "/blog/blog-5.png",
  },
];

export default function BlogInsights() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-blog-card]");
    if (!card) return;
    const amount = card.getBoundingClientRect().width + GAP;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section id="blog" className="relative w-full bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <h2
              className="text-[28px] font-medium leading-tight text-[#3D3D8F] sm:text-[34px] lg:text-[40px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              From Our Blog & Insights
            </h2>
            <p className="mt-1.5 text-[13px] text-[#5C5C7A] sm:text-[14px]">
              Wisdom for your everyday life
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="#all-articles"
              className="text-[13px] font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A]"
            >
              View All Articles
            </a>
            <div className="flex items-center gap-2">
              <CarouselBtn direction="prev" onClick={() => scrollByCard(-1)} />
              <CarouselBtn direction="next" onClick={() => scrollByCard(1)} />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="relative">
          <button
            type="button"
            aria-label="Previous articles"
            onClick={() => scrollByCard(-1)}
            className="carousel-side-btn-light absolute top-1/2 left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next articles"
            onClick={() => scrollByCard(1)}
            className="carousel-side-btn-light absolute top-1/2 right-0 z-20 hidden translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronRight />
          </button>

          <div
            ref={scrollerRef}
            className="blog-scroller flex gap-4 overflow-x-auto scroll-smooth"
          >
            {articles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between sm:hidden">
          <a href="#all-articles" className="text-[13px] font-medium text-[#3D3D8F]">
            View All Articles
          </a>
          <div className="flex items-center gap-2">
            <CarouselBtn direction="prev" onClick={() => scrollByCard(-1)} />
            <CarouselBtn direction="next" onClick={() => scrollByCard(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ article }: { article: Article }) {
  return (
    <article
      data-blog-card
      className="blog-card group relative flex shrink-0 flex-col overflow-hidden rounded-xl border border-[#E4E2EF] shadow-[0_4px_20px_rgba(26,26,74,0.06)]"
    >
      <div className="relative aspect-[3/3.6] w-full overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 80vw, (max-width: 1280px) 33vw, 20vw"
          quality={95}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-3.5 sm:p-4">
          <h3 className="text-[14px] font-semibold leading-snug text-white sm:text-[15px]">
            {article.title}
          </h3>
          <p className="mt-1.5 text-[11px] text-white/75 sm:text-[12px]">
            {article.date}
            <span className="mx-1.5 text-white/40">•</span>
            {article.readTime}
          </p>
        </div>
      </div>
    </article>
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
      className="carousel-nav-btn-light flex h-9 w-9 items-center justify-center rounded-full"
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
