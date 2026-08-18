"use client";

import { useRef } from "react";
import Image from "next/image";

type Retreat = {
  id: string;
  title: string;
  dates: string;
  location: string;
  image: string;
};

const GAP = 16;

const retreats: Retreat[] = [
  {
    id: "1",
    title: "Rishikesh Retreat",
    dates: "May 20 - May 25, 2024",
    location: "Rishikesh, India",
    image: "/retreats/retreat-1.png",
  },
  {
    id: "2",
    title: "Bali Healing Retreat",
    dates: "June 10 - June 16, 2024",
    location: "Bali, Indonesia",
    image: "/retreats/retreat-2.png",
  },
  {
    id: "3",
    title: "Himalayan Retreat",
    dates: "July 5 - July 12, 2024",
    location: "Himachal, India",
    image: "/retreats/retreat-3.png",
  },
  {
    id: "4",
    title: "Goa Wellness Retreat",
    dates: "Aug 15 - Aug 20, 2024",
    location: "Goa, India",
    image: "/retreats/retreat-4.png",
  },
  {
    id: "5",
    title: "Nepal Meditation Retreat",
    dates: "Sep 8 - Sep 14, 2024",
    location: "Nepal",
    image: "/retreats/retreat-5.png",
  },
];

export default function UpcomingRetreats() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-retreat-card]");
    if (!card) return;
    const amount = card.getBoundingClientRect().width + GAP;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section
      id="retreats"
      className="relative w-full overflow-hidden bg-white py-8 sm:py-12 lg:py-14"
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10 xl:px-12">
        <div className="mb-5 sm:mb-8">
          <div className="flex items-start justify-between gap-3 sm:items-end sm:gap-4">
            <div className="min-w-0 flex-1">
              <h2
                className="text-[24px] font-medium leading-tight text-[#3D3D8F] sm:text-[34px] lg:text-[40px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Upcoming Spiritual Retreats
              </h2>
              <p className="mt-1 text-[12px] leading-relaxed text-[#5C5C7A] sm:mt-1.5 sm:text-[14px]">
                Discover the upcoming experiences and expeditions.
              </p>
              <a
                href="#all-retreats"
                className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-semibold text-[#3D3D8F] sm:hidden"
              >
                View All Retreats
                <ArrowRightIcon />
              </a>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <a
                href="#all-retreats"
                className="text-[13px] font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A]"
              >
                View All Retreats
              </a>
              <div className="flex items-center gap-2">
                <CarouselBtn direction="prev" onClick={() => scrollByCard(-1)} />
                <CarouselBtn direction="next" onClick={() => scrollByCard(1)} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — 2-column grid */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {retreats.slice(0, 4).map((retreat) => (
            <RetreatCard key={retreat.id} retreat={retreat} compact />
          ))}
        </div>

        {/* Tablet+ — carousel */}
        <div className="relative hidden sm:block">
          <button
            type="button"
            aria-label="Previous retreats"
            onClick={() => scrollByCard(-1)}
            className="carousel-side-btn-light absolute top-1/2 left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next retreats"
            onClick={() => scrollByCard(1)}
            className="carousel-side-btn-light absolute top-1/2 right-0 z-20 hidden translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronRight />
          </button>

          <div
            ref={scrollerRef}
            className="retreat-scroller flex gap-4 overflow-x-auto scroll-smooth"
          >
            {retreats.map((retreat) => (
              <RetreatCard key={retreat.id} retreat={retreat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RetreatCard({
  retreat,
  compact = false,
}: {
  retreat: Retreat;
  compact?: boolean;
}) {
  return (
    <article
      data-retreat-card
      className="retreat-card group relative flex shrink-0 flex-col overflow-hidden rounded-2xl border border-[#E4E2EF] shadow-[0_4px_20px_rgba(26,26,74,0.06)] transition hover:border-[rgba(61,61,143,0.22)] hover:shadow-[0_10px_28px_rgba(26,26,74,0.12)]"
    >
      <div
        className={`relative w-full overflow-hidden ${
          compact ? "aspect-[3/3.2]" : "aspect-[3/3.6]"
        }`}
      >
        <Image
          src={retreat.image}
          alt={retreat.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
          sizes={
            compact
              ? "(max-width: 640px) 46vw, 260px"
              : "(max-width: 640px) 80vw, (max-width: 1280px) 33vw, 20vw"
          }
          quality={95}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

        <div
          className={`absolute inset-x-0 bottom-0 z-10 flex flex-col ${
            compact ? "p-2.5" : "p-3.5 sm:p-4"
          }`}
        >
          <h3
            className={`font-semibold leading-snug text-white ${
              compact ? "text-[12px] line-clamp-2" : "text-[15px] sm:text-[16px]"
            }`}
          >
            {retreat.title}
          </h3>
          <p
            className={`mt-0.5 text-white/90 ${
              compact ? "text-[10px] line-clamp-1" : "mt-1 text-[12px] sm:text-[13px]"
            }`}
          >
            {retreat.dates}
          </p>
          <p
            className={`text-white/70 ${
              compact ? "text-[9px] line-clamp-1" : "mt-0.5 text-[11px] sm:text-[12px]"
            }`}
          >
            {retreat.location}
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
