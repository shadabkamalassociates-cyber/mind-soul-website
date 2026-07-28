"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@/components/Icons";
import {
  fetchVerifiedExperts,
  mapExpertForUi,
  type UiExpert,
} from "@/services/expertsService";
import { ApiError } from "@/services/apiClient";

const GAP = 16;

function formatReviewCount(count: unknown) {
  const value = Number(count) || 0;
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return String(value);
}

export default function SoulExperts() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [experts, setExperts] = useState<UiExpert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadExperts() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchVerifiedExperts();
        if (!cancelled) {
          setExperts(data.map(mapExpertForUi));
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : err instanceof Error
                ? err.message
                : "Failed to load experts",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadExperts();
    return () => {
      cancelled = true;
    };
  }, []);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-expert-card]");
    if (!card) return;
    const amount = card.getBoundingClientRect().width + GAP;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section id="experts" className="relative w-full overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <h2
              className="text-[28px] font-medium leading-tight text-[#3D3D8F] sm:text-[34px] lg:text-[40px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Meet Our Soul Experts
            </h2>
            <p className="mt-1.5 text-[13px] text-[#5C5C7A] sm:text-[14px]">
              Learn from certified and experienced spiritual guides.
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/experts"
              className="text-[13px] font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A]"
            >
              View All Experts
            </Link>
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
            aria-label="Previous experts"
            onClick={() => scrollByCard(-1)}
            className="carousel-side-btn-light absolute top-1/2 left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next experts"
            onClick={() => scrollByCard(1)}
            className="carousel-side-btn-light absolute top-1/2 right-0 z-20 hidden translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronRight />
          </button>

          {isLoading && (
            <p className="py-12 text-center text-[14px] text-[#8A8AA8]">
              Loading experts...
            </p>
          )}

          {!isLoading && error && (
            <p className="py-12 text-center text-[14px] text-[#B42318]">
              {error}
            </p>
          )}

          {!isLoading && !error && experts.length === 0 && (
            <p className="py-12 text-center text-[14px] text-[#8A8AA8]">
              No verified experts available yet. Check back soon.
            </p>
          )}

          {!isLoading && !error && experts.length > 0 && (
            <div
              ref={scrollerRef}
              className="expert-scroller flex gap-4 overflow-x-auto scroll-smooth"
            >
              {experts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between sm:hidden">
          <Link href="/experts" className="text-[13px] font-medium text-[#3D3D8F]">
            View All Experts
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

function ExpertCard({ expert }: { expert: UiExpert }) {
  const reviews = formatReviewCount(expert.raw?.total_reviews);

  return (
    <article
      data-expert-card
      className="expert-card group relative flex shrink-0 flex-col overflow-hidden rounded-xl"
    >
      <div className="expert-photo relative aspect-[4/2.6] w-full overflow-hidden">
        <Image
          src={expert.image}
          alt={expert.name}
          fill
          unoptimized
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 78vw, (max-width: 900px) 50vw, 16vw"
          quality={90}
        />
        <span className="expert-verified absolute right-2 bottom-2 z-20 flex h-5 w-5 items-center justify-center rounded-full sm:h-[22px] sm:w-[22px]">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path
              d="M2 5.2L4.1 7.3L8 2.8"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="flex flex-col bg-white p-2.5">
        <h3 className="text-[13px] font-semibold leading-snug text-[#3D3D8F] sm:text-[14px]">
          {expert.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-[#5C5C7A]">{expert.title}</p>

        <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-[#5C5C7A] sm:text-[11px]">
          <span className="flex items-center gap-1">
            <StarIcon className="text-[#3D3D8F]" />
            <span className="text-[#3D3D8F]">
              {expert.rating}{" "}
              <span className="text-[#8A8AA8]">({reviews})</span>
            </span>
          </span>
          <span className="flex items-center gap-1 text-[#3D3D8F]">
            <ClockIcon />
            {expert.experience}
          </span>
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

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.25" stroke="#3D3D8F" strokeWidth="1.2" />
      <path
        d="M7 4.5V7L8.75 8.5"
        stroke="#3D3D8F"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
