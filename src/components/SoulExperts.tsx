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
    reviews: "2.1K",
    image: "/experts/expert-1.jpg",
  },
  {
    id: "2",
    name: "Meera Krishnan",
    specialty: "Meditation Guide",
    experience: "12+ Years",
    rating: "4.8",
    reviews: "1.8K",
    image: "/experts/expert-2.jpg",
  },
  {
    id: "3",
    name: "Ananya Sharma",
    specialty: "Tarot & Intuitive Guide",
    experience: "10+ Years",
    rating: "4.9",
    reviews: "3.2K",
    image: "/experts/expert-3.jpg",
  },
  {
    id: "4",
    name: "Priya Desai",
    specialty: "Astrologer & Coach",
    experience: "8+ Years",
    rating: "4.7",
    reviews: "1.5K",
    image: "/experts/expert-4.jpg",
  },
  {
    id: "5",
    name: "Vikram Singh",
    specialty: "Breathwork Facilitator",
    experience: "11+ Years",
    rating: "4.9",
    reviews: "2.4K",
    image: "/experts/expert-5.jpg",
  },
  {
    id: "6",
    name: "Sanya Kapoor",
    specialty: "Chakra Healing Expert",
    experience: "9+ Years",
    rating: "4.8",
    reviews: "1.9K",
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
    <section id="experts" className="relative w-full bg-[#05070A] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#D4AF37] uppercase sm:text-[12px]">
              <MeditateMark />
              Meet Our Experts
            </p>
            <h2
              className="text-[28px] font-medium leading-tight text-white sm:text-[34px] lg:text-[40px]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Meet Our Soul Experts
            </h2>
            <p className="mt-1.5 text-[13px] text-[#A8A8A8] sm:text-[14px]">
              Learn from verified and experienced spiritual guides.
            </p>
          </div>

          <a
            href="#all-experts"
            className="expert-view-all inline-flex shrink-0 items-center gap-2 self-start rounded-full px-4 py-2.5 text-[13px] font-medium sm:self-auto"
          >
            View All Experts
            <ArrowRight />
          </a>
        </div>

        {/* Cards */}
        <div className="relative">
          <button
            type="button"
            aria-label="Previous experts"
            onClick={() => scrollByCard(-1)}
            className="carousel-side-btn absolute top-[38%] left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 cursor-pointer lg:flex"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next experts"
            onClick={() => scrollByCard(1)}
            className="carousel-side-btn absolute top-[38%] right-0 z-20 hidden translate-x-1/2 -translate-y-1/2 cursor-pointer lg:flex"
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

        {/* Bottom tagline */}
        <div className="experts-tagline mt-10 flex items-center justify-center gap-4 sm:mt-12 sm:gap-5">
          <div className="experts-line experts-line-left hidden sm:block" />
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="experts-lotus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11">
              <LotusMark />
            </span>
            <div>
              <p
                className="text-[15px] font-medium text-[#D4AF37] sm:text-[17px]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Guided by wisdom. Driven by purpose.
              </p>
              <p className="mt-0.5 text-[12px] text-[#A0A0A0] sm:text-[13px]">
                Our experts are here to help you heal, grow and transform.
              </p>
            </div>
          </div>
          <div className="experts-line experts-line-right hidden sm:block" />
        </div>
      </div>
    </section>
  );
}

function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <article
      data-expert-card
      className="expert-card group flex shrink-0 flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[4/3.9] w-full overflow-hidden">
        <Image
          src={expert.image}
          alt={expert.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 78vw, (max-width: 900px) 50vw, 20vw"
          quality={85}
        />
        <span className="expert-verified absolute right-2.5 bottom-2.5 z-20 flex h-5 w-5 items-center justify-center rounded-full sm:h-6 sm:w-6">
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

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3 sm:px-4 sm:pb-4 sm:pt-3.5">
        <h3 className="text-[13px] font-semibold leading-snug text-white sm:text-[14px]">
          {expert.name}
        </h3>
        <p className="mt-1 text-[11px] font-medium text-[#D4AF37] sm:text-[12px]">
          {expert.specialty}
        </p>

        <div className="expert-card-divider mt-3 mb-3" />

        <div className="flex items-center justify-between gap-2 text-[11px] text-[#C9A06A] sm:text-[12px]">
          <span className="flex items-center gap-1">
            <StarIcon className="text-[#D4AF37]" />
            {expert.rating}{" "}
            <span className="text-[#888]">({expert.reviews})</span>
          </span>
          <span className="flex items-center gap-1">
            <PersonIcon />
            {expert.experience}
          </span>
        </div>
      </div>
    </article>
  );
}

function MeditateMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
      <path
        d="M8 4.2C8 4.2 6.2 6.2 6.2 7.8C6.2 8.8 7 9.5 8 9.5C9 9.5 9.8 8.8 9.8 7.8C9.8 6.2 8 4.2 8 4.2Z"
        stroke="#D4AF37"
        strokeWidth="1"
      />
      <path d="M8 9.5V12" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" />
      <path d="M5.5 11.5C6.2 10.8 7 10.5 8 10.5C9 10.5 9.8 10.8 10.5 11.5" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function LotusMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 14.5C9 14.5 3.5 10.2 3.5 6.8C3.5 4.8 5 3.5 6.7 3.5C7.6 3.5 8.3 4 9 4.6C9.7 4 10.4 3.5 11.3 3.5C13 3.5 14.5 4.8 14.5 6.8C14.5 10.2 9 14.5 9 14.5Z"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M9 11.5V15.5" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="4.5" r="2.25" stroke="#D4AF37" strokeWidth="1.15" />
      <path
        d="M2.75 12C2.75 9.9 4.55 8.25 7 8.25C9.45 8.25 11.25 9.9 11.25 12"
        stroke="#D4AF37"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
        stroke="currentColor"
        strokeWidth="1.3"
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
