"use client";

import { useRef } from "react";
import Image from "next/image";
import { StarIcon } from "@/components/Icons";

type Expert = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: string;
  reviews: string;
  image: string;
};

const GAP = 16;

const experts: Expert[] = [
  {
    id: "1",
    name: "Dr. Rashmi Muthukrishnan",
    specialty: "Psychologist & Healer",
    experience: "8+ Years",
    rating: "4.9",
    reviews: "2.3K",
    image: "/sessions/session-1.jpg",
  },
  {
    id: "2",
    name: "Meenakshi Mishra",
    specialty: "Tarot Reader & Healer",
    experience: "10+ Years",
    rating: "4.9",
    reviews: "1.8K",
    image: "/sessions/session-3.jpg",
  },
  {
    id: "3",
    name: "Sanjay Sethi",
    specialty: "Energy Healer",
    experience: "12+ Years",
    rating: "4.8",
    reviews: "1.6K",
    image: "/sessions/session-2.jpg",
  },
  {
    id: "4",
    name: "Sukhaman Bajwa",
    specialty: "Spiritual Coach",
    experience: "9+ Years",
    rating: "4.9",
    reviews: "1.5K",
    image: "/sessions/session-4.jpg",
  },
  {
    id: "5",
    name: "Swami Anant",
    specialty: "Meditation Guru",
    experience: "15+ Years",
    rating: "4.9",
    reviews: "2.7K",
    image: "/sessions/session-5.jpg",
  },
  {
    id: "6",
    name: "Aparna Sharma",
    specialty: "Astrologer",
    experience: "7+ Years",
    rating: "4.8",
    reviews: "1.2K",
    image: "/experts/expert-6.jpg",
  },
];

export default function SoulExperts() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-expert-card]");
    if (!card) return;
    const amount = card.getBoundingClientRect().width + GAP;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section id="experts" className="relative w-full overflow-hidden bg-[#05070A] py-10 sm:py-12 lg:py-14">
      <div className="pointer-events-none absolute -right-20 top-16 h-[300px] w-[300px] opacity-[0.18] lg:-right-10">
        <Image src="/bg-mandala.png" alt="" fill className="object-contain object-right" sizes="300px" quality={80} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Header — same pattern as Featured Live Sessions */}
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <h2
              className="text-[28px] font-medium leading-tight text-white sm:text-[34px] lg:text-[40px]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Meet Our Soul Experts
            </h2>
            <p className="mt-1.5 text-[13px] text-[#A8A8A8] sm:text-[14px]">
              Learn from certified and experienced spiritual guides.
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="#all-experts"
              className="text-[13px] font-medium text-[#C8C8C8] transition hover:text-[#E8C69F]"
            >
              View All Experts
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
            aria-label="Previous experts"
            onClick={() => scrollByCard(-1)}
            className="carousel-side-btn absolute top-1/2 left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next experts"
            onClick={() => scrollByCard(1)}
            className="carousel-side-btn absolute top-1/2 right-0 z-20 hidden translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <ChevronRight />
          </button>

          <div
            ref={scrollerRef}
            className="expert-scroller flex gap-4 overflow-x-auto scroll-smooth"
          >
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between sm:hidden">
          <a href="#all-experts" className="text-[13px] font-medium text-[#C8C8C8]">
            View All Experts
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

function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <article
      data-expert-card
      className="expert-card group relative flex shrink-0 flex-col overflow-hidden rounded-xl"
    >
      {/* Same image height as Featured Live Sessions */}
      <div className="expert-photo relative aspect-[4/2.6] w-full overflow-hidden bg-black">
        <div className="expert-glow pointer-events-none absolute inset-x-[8%] top-[12%] z-0 aspect-square rounded-full" />
        <Image
          src={expert.image}
          alt={expert.name}
          fill
          className="relative z-10 object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 78vw, (max-width: 900px) 50vw, 16vw"
          quality={90}
        />
        <span className="expert-verified absolute right-2 bottom-2 z-20 flex h-5 w-5 items-center justify-center rounded-full sm:h-[22px] sm:w-[22px]">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path
              d="M2 5.2L4.1 7.3L8 2.8"
              stroke="#1a1208"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="flex flex-col bg-[#0a0c10] p-2.5">
        <h3 className="text-[13px] font-semibold leading-snug text-white sm:text-[14px]">
          {expert.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-[#C8C8C8]">{expert.specialty}</p>

        <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-[#C8C8C8] sm:text-[11px]">
          <span className="flex items-center gap-1">
            <StarIcon className="text-[#EAB308]" />
            <span className="text-[#EAB308]">
              {expert.rating}{" "}
              <span className="text-[#888]">({expert.reviews})</span>
            </span>
          </span>
          <span className="flex items-center gap-1 text-[#EAB308]">
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
      className="carousel-nav-btn flex h-9 w-9 items-center justify-center rounded-full"
    >
      {direction === "prev" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.25" stroke="#EAB308" strokeWidth="1.2" />
      <path
        d="M7 4.5V7L8.75 8.5"
        stroke="#EAB308"
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
