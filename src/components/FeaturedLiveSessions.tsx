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
  image: string;
};

const GAP = 16;

const sessions: Session[] = [
  {
    id: "1",
    title: "Heal Anxiety & Overthinking",
    expert: "Dr. Rashmi Madhulakshman",
    rating: "4.9",
    reviews: "2.1k",
    duration: "60 Min",
    price: "₹799",
    image: "/sessions/session-1.jpg",
  },
  {
    id: "2",
    title: "Energy Healing & Aura Cleansing",
    expert: "Sanjay Sethi",
    rating: "4.9",
    reviews: "2.4k",
    duration: "60 Min",
    price: "₹699",
    image: "/sessions/session-2.jpg",
  },
  {
    id: "3",
    title: "Tarot Guidance For Life Clarity",
    expert: "Meenakshi Mehra",
    rating: "4.9",
    reviews: "1.6k",
    duration: "60 Min",
    price: "₹599",
    image: "/sessions/session-3.jpg",
  },
  {
    id: "4",
    title: "Release Stress & Emotional Blocks",
    expert: "Sulkaman Ejaz",
    rating: "4.9",
    reviews: "1.0k",
    duration: "60 Min",
    price: "₹699",
    image: "/sessions/session-4.jpg",
  },
  {
    id: "5",
    title: "Kundalini Awakening Session",
    expert: "Swami Anant",
    rating: "4.9",
    reviews: "1.7k",
    duration: "60 Min",
    price: "₹799",
    image: "/sessions/session-5.jpg",
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
    <section id="book" className="relative w-full overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <h2
              className="text-[28px] font-medium leading-tight text-[#3D3D8F] sm:text-[34px] lg:text-[40px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Featured Live Sessions
            </h2>
            <p className="mt-1.5 text-[13px] text-[#5C5C7A] sm:text-[14px]">
              Join immersive sessions with expert guidance
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="#all-sessions"
              className="text-[13px] font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A]"
            >
              View All Sessions
            </a>
            <div className="flex items-center gap-2">
              <CarouselBtn direction="prev" onClick={() => scrollByCard(-1)} />
              <CarouselBtn direction="next" onClick={() => scrollByCard(1)} />
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            type="button"
            aria-label="Previous sessions"
            onClick={() => scrollByCard(-1)}
            className="carousel-side-btn-light absolute top-1/2 left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next sessions"
            onClick={() => scrollByCard(1)}
            className="carousel-side-btn-light absolute top-1/2 right-0 z-20 hidden translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronRight />
          </button>

          <div
            ref={scrollerRef}
            className="session-scroller flex gap-4 overflow-x-auto scroll-smooth"
          >
            {sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between sm:hidden">
          <a href="#all-sessions" className="text-[13px] font-medium text-[#3D3D8F]">
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
      className="session-card group relative flex shrink-0 flex-col overflow-hidden rounded-xl border border-[#E4E2EF] bg-white shadow-[0_4px_20px_rgba(26,26,74,0.06)]"
    >
      <div className="relative aspect-[4/2.6] w-full overflow-hidden bg-[#F7F6FB]">
        <Image
          src={session.image}
          alt={session.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          quality={90}
        />

        <span className="absolute top-2 left-2 z-10 rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase bg-[#E1251B]">
          Live
        </span>
      </div>

      <div className="flex flex-col p-2.5">
        <h3 className="text-[13px] font-semibold leading-snug text-[#1A1A4A] sm:text-[14px]">
          {session.title}
        </h3>
        <p className="mt-0.5 text-[11px] text-[#5C5C7A]">{session.expert}</p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-[#5C5C7A] sm:text-[11px]">
            <span className="flex items-center gap-1">
              <StarIcon className="text-[#3D3D8F]" />
              {session.rating}{" "}
              <span className="text-[#8A8AA8]">({session.reviews})</span>
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon />
              {session.duration}
            </span>
          </div>
          <span className="shrink-0 text-[14px] font-semibold text-[#1A1A4A] sm:text-[15px]">
            {session.price}
          </span>
        </div>

        <a
          href="#book"
          className="session-book-btn mt-2 flex w-full items-center justify-center rounded-md py-2 text-[12px] font-semibold text-white"
        >
          Book Now
        </a>
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

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
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
