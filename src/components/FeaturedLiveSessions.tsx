"use client";

import { useRef } from "react";
import Image from "next/image";
import { StarIcon } from "@/components/Icons";

type Session = {
  id: string;
  title: string;
  expert: string;
  rating: string;
  reviews: string;
  duration: string;
  price: string;
  glow: string;
  tint: string;
};

const GAP = 20;

const sessions: Session[] = [
  {
    id: "1",
    title: "Heal Anxiety & Overthinking",
    expert: "Dr. Rashmi Muthukrishnan",
    rating: "4.9",
    reviews: "2.1K",
    duration: "60 Min",
    price: "₹799",
    glow: "rgba(80, 140, 255, 0.55)",
    tint: "hue-rotate(200deg) saturate(1.2)",
  },
  {
    id: "2",
    title: "Inner Child Healing",
    expert: "Meera Krishnan",
    rating: "4.8",
    reviews: "1.8K",
    duration: "45 Min",
    price: "₹699",
    glow: "rgba(160, 90, 255, 0.55)",
    tint: "hue-rotate(260deg) saturate(1.35)",
  },
  {
    id: "3",
    title: "Manifest Your Dream Life",
    expert: "Ananya Sharma",
    rating: "4.9",
    reviews: "3.2K",
    duration: "60 Min",
    price: "₹899",
    glow: "rgba(255, 170, 60, 0.5)",
    tint: "hue-rotate(15deg) saturate(1.4) brightness(1.05)",
  },
  {
    id: "4",
    title: "Break Free from Trauma",
    expert: "Priya Desai",
    rating: "4.7",
    reviews: "1.5K",
    duration: "90 Min",
    price: "₹999",
    glow: "rgba(60, 200, 190, 0.5)",
    tint: "hue-rotate(150deg) saturate(1.25)",
  },
  {
    id: "5",
    title: "Find Your Life Purpose",
    expert: "Vikram Singh",
    rating: "4.9",
    reviews: "2.4K",
    duration: "60 Min",
    price: "₹849",
    glow: "rgba(212, 175, 55, 0.45)",
    tint: "hue-rotate(35deg) saturate(1.3) brightness(1.05)",
  },
  {
    id: "6",
    title: "Release Emotional Blocks",
    expert: "Sanya Kapoor",
    rating: "4.8",
    reviews: "1.9K",
    duration: "75 Min",
    price: "₹749",
    glow: "rgba(220, 100, 160, 0.5)",
    tint: "hue-rotate(300deg) saturate(1.3)",
  },
];

export default function FeaturedLiveSessions() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-session-card]");
    if (!card) return;
    const amount = card.getBoundingClientRect().width + GAP;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section id="book" className="relative w-full bg-[#05070A] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37] sm:text-[12px]">
              <span className="live-dot relative inline-block h-2 w-2 rounded-full bg-[#D4AF37]" />
              Live Now
            </p>
            <h2
              className="text-[28px] font-medium leading-tight text-white sm:text-[34px] lg:text-[40px]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Featured Live Sessions
            </h2>
            <p className="mt-1.5 text-[13px] text-[#A8A8A8] sm:text-[14px]">
              Join immersive sessions with expert guidance
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="#all-sessions"
              className="text-[13px] font-medium text-[#C8C8C8] transition hover:text-[#E8C69F]"
            >
              View All Sessions
            </a>
            <div className="flex items-center gap-2">
              <CarouselBtn direction="prev" onClick={() => scrollByCard(-1)} />
              <CarouselBtn direction="next" onClick={() => scrollByCard(1)} />
            </div>
          </div>
        </div>

        {/* Carousel — overflow hidden so no half cards peek */}
        <div className="relative">
          <button
            type="button"
            aria-label="Previous sessions"
            onClick={() => scrollByCard(-1)}
            className="carousel-side-btn absolute top-1/2 left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next sessions"
            onClick={() => scrollByCard(1)}
            className="carousel-side-btn absolute top-1/2 right-0 z-20 hidden translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronRight />
          </button>

          <div
            ref={scrollerRef}
            className="session-scroller flex gap-5 overflow-x-auto scroll-smooth"
          >
            {sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between sm:hidden">
          <a href="#all-sessions" className="text-[13px] font-medium text-[#C8C8C8]">
            View All Sessions
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

function SessionCard({ session }: { session: Session }) {
  return (
    <article
      data-session-card
      className="session-card group relative flex shrink-0 flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[3/3.8] w-full overflow-hidden">
        <Image
          src="/hero-meditation.png"
          alt={session.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          style={{ filter: session.tint }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          quality={90}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 38%, ${session.glow} 0%, transparent 65%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/25 to-transparent" />

        <span className="absolute top-3 left-3 z-10 rounded-md bg-[#E1251B] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
          Live
        </span>

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-3 sm:p-3.5">
          <h3 className="text-[15px] font-semibold leading-snug text-white sm:text-[16px]">
            {session.title}
          </h3>
          <p className="mt-0.5 text-[12px] text-[#C8C8C8]">{session.expert}</p>

          <div className="mt-2.5 flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#C8C8C8] sm:text-[12px]">
              <span className="flex items-center gap-1">
                <StarIcon className="text-[#D4AF37]" />
                {session.rating}{" "}
                <span className="text-[#888]">({session.reviews})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon />
                {session.duration}
              </span>
            </div>
            <span className="shrink-0 text-[16px] font-semibold text-white sm:text-[17px]">
              {session.price}
            </span>
          </div>

          <a
            href="#book"
            className="session-book-btn mt-3 flex w-full items-center justify-center rounded-lg py-2.5 text-[13px] font-semibold text-[#1a1208]"
          >
            Book Now
          </a>
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

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.25" stroke="#D4AF37" strokeWidth="1.2" />
      <path
        d="M7 4.5V7L8.75 8.5"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
