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
    <section id="retreats" className="relative w-full overflow-hidden bg-[#05070A] py-10 sm:py-12 lg:py-14">
      <div className="pointer-events-none absolute -left-24 bottom-10 h-[300px] w-[300px] opacity-[0.16]">
        <Image src="/bg-mandala.png" alt="" fill className="object-contain object-left" sizes="300px" quality={80} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <h2
              className="text-[28px] font-medium leading-tight text-white sm:text-[34px] lg:text-[40px]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Upcoming Spiritual Retreats
            </h2>
            <p className="mt-1.5 text-[13px] text-[#A8A8A8] sm:text-[14px]">
              Discover the upcoming experiences and expeditions.
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="#all-retreats"
              className="text-[13px] font-medium text-[#C8C8C8] transition hover:text-[#E8C69F]"
            >
              View All Retreats
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
            aria-label="Previous retreats"
            onClick={() => scrollByCard(-1)}
            className="carousel-side-btn absolute top-1/2 left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next retreats"
            onClick={() => scrollByCard(1)}
            className="carousel-side-btn absolute top-1/2 right-0 z-20 hidden translate-x-1/2 -translate-y-1/2 lg:flex"
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

        <div className="mt-5 flex items-center justify-between sm:hidden">
          <a href="#all-retreats" className="text-[13px] font-medium text-[#C8C8C8]">
            View All Retreats
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

function RetreatCard({ retreat }: { retreat: Retreat }) {
  return (
    <article
      data-retreat-card
      className="retreat-card group relative flex shrink-0 flex-col overflow-hidden rounded-xl"
    >
      <div className="relative aspect-[3/3.6] w-full overflow-hidden">
        <Image
          src={retreat.image}
          alt={retreat.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 80vw, (max-width: 1280px) 33vw, 20vw"
          quality={95}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-3.5 sm:p-4">
          <h3 className="text-[15px] font-semibold leading-snug text-white sm:text-[16px]">
            {retreat.title}
          </h3>
          <p className="mt-1 text-[12px] text-[#D8D8D8] sm:text-[13px]">{retreat.dates}</p>
          <p className="mt-0.5 text-[11px] text-[#A8A8A8] sm:text-[12px]">{retreat.location}</p>
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
      className="carousel-nav-btn flex h-9 w-9 items-center justify-center rounded-full"
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
