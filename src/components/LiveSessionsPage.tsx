"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { liveSessions } from "@/data/liveSessions";
import { sessionCategories } from "@/data/categories";

const features = [
  {
    title: "Expert Guidance",
    desc: "Learn from verified mentors",
    icon: <GradIcon />,
  },
  {
    title: "Live & Interactive",
    desc: "Ask questions in real-time",
    icon: <VideoIcon />,
  },
  {
    title: "Secure Platform",
    desc: "Private & encrypted sessions",
    icon: <ShieldIcon />,
  },
  {
    title: "Flexible Timings",
    desc: "Morning to late evening",
    icon: <ClockIcon />,
  },
];

const categories = [
  { id: "all", label: "All" },
  ...sessionCategories.map((c) => ({ id: c.slug, label: c.label })),
];

const sessions = liveSessions.map((s) => ({
  slug: s.slug,
  category: s.category,
  categoryId: s.categoryId,
  title: s.title,
  expert: s.expert,
  role: s.role,
  avatar: s.avatar,
  date: s.date,
  time: s.time,
  duration: s.duration,
}));

export default function LiveSessionsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return sessions.filter((s) => {
      const catOk = activeCategory === "all" || s.categoryId === activeCategory;
      const q = query.trim().toLowerCase();
      const qOk =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.expert.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [activeCategory, query]);

  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-4 pt-12 pb-10 sm:px-6 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:pt-16 lg:pb-12">
          <div className="relative z-10 max-w-[580px]">
            <h1
              className="text-[40px] font-semibold leading-[1.1] text-[#3D3D8F] sm:text-[48px] lg:text-[52px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Live Sessions
            </h1>
            <p
              className="mt-3 text-[18px] font-medium text-[#C9A06A] sm:text-[20px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Real-time Guidance. Real Transformation.
            </p>
            <p className="mt-4 max-w-[520px] text-[14px] leading-[1.75] text-[#5C5C7A] sm:text-[15px]">
              Join live interactive sessions with verified experts. Get
              real-time guidance, ask questions, and experience profound
              transformation from the comfort of your home.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-4">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A06A]/35 text-[#C9A06A]">
                    {f.icon}
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold text-[#1A1A4A] sm:text-[13px]">
                      {f.title}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-[#8A8AA8]">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto hidden h-[300px] w-full max-w-[460px] lg:block lg:h-[340px] lg:justify-self-end">
            <Image
              src="/contact-mandala-gold.png"
              alt=""
              fill
              unoptimized
              priority
              className="object-contain object-center"
              sizes="460px"
            />
          </div>
        </div>
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
                placeholder="Search sessions, topics or experts..."
                className="w-full rounded-xl border border-[#E0E2EE] bg-white py-3 pl-10 pr-4 text-[13px] text-[#1A1A4A] outline-none placeholder:text-[#A0A0B8] focus:border-[#3D3D8F]"
              />
            </div>

            <select className="rounded-xl border border-[#E0E2EE] bg-white px-3 py-3 text-[13px] text-[#1A1A4A] outline-none lg:w-[160px]">
              <option>All Categories</option>
              <option>Astrology</option>
              <option>Numerology</option>
              <option>Tarot</option>
              <option>Meditation</option>
            </select>
            <select className="rounded-xl border border-[#E0E2EE] bg-white px-3 py-3 text-[13px] text-[#1A1A4A] outline-none lg:w-[150px]">
              <option>All Languages</option>
              <option>English</option>
              <option>Hindi</option>
            </select>
            <select className="rounded-xl border border-[#E0E2EE] bg-white px-3 py-3 text-[13px] text-[#1A1A4A] outline-none lg:w-[140px]">
              <option>Select Date</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3D3D8F] px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-[#2F2F70]"
            >
              <SearchIcon />
              Search
            </button>
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

      {/* Upcoming sessions */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-7 flex items-end justify-between gap-4">
            <h2
              className="text-[26px] font-semibold text-[#3D3D8F] sm:text-[30px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Upcoming Live Sessions
            </h2>
            <Link
              href="#sessions"
              className="shrink-0 text-[13px] font-semibold text-[#1A1A4A] hover:text-[#3D3D8F]"
            >
              View All Sessions →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {filtered.map((session) => (
              <SessionCard key={session.slug} session={session} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-[14px] text-[#8A8AA8]">
              No sessions found. Try a different search or category.
            </p>
          )}
        </div>
      </section>

      {/* Personalized CTA */}
      <section className="bg-white px-4 pb-8 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-2xl bg-[#1A1A4A]">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] opacity-40 lg:block">
            <Image
              src="/contact-mandala-gold.png"
              alt=""
              fill
              unoptimized
              className="object-contain object-right"
              sizes="480px"
            />
          </div>
          <div className="relative z-10 flex flex-col items-start gap-5 px-6 py-9 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="flex max-w-[640px] items-start gap-4">
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#C9A06A]">
                <PeopleIcon />
              </span>
              <div>
                <h3
                  className="text-[22px] font-semibold text-white sm:text-[24px]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Looking for a Personalised Experience?
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/80 sm:text-[14px]">
                  Book a private 1-on-1 session with our verified experts for
                  deeper guidance tailored to your unique journey.
                </p>
              </div>
            </div>
            <Link
              href="/#book"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#E8C69F] via-[#C9A06A] to-[#B8925E] px-6 py-3 text-[13px] font-semibold text-[#1A1A4A] transition hover:brightness-105 sm:text-[14px]"
            >
              Book a Private Session →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#EEF0FA]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:justify-between lg:gap-8 lg:px-8 lg:py-12">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#3D3D8F] text-white sm:flex">
              <LotusMiniIcon />
            </span>
            <div>
              <h3
                className="text-[20px] font-semibold text-[#3D3D8F] sm:text-[22px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Never Miss a Live Session
              </h3>
              <p className="mt-1 text-[13px] text-[#5C5C7A]">
                Subscribe to get weekly updates on upcoming sessions and
                exclusive invites.
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-[480px] flex-col gap-2.5 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-xl border border-[#D8DAE8] bg-white px-4 py-3 text-[13px] text-[#1A1A4A] outline-none placeholder:text-[#A0A0B8] focus:border-[#3D3D8F]"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3D3D8F] px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-[#2F2F70]"
            >
              Subscribe Now →
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

type Session = (typeof sessions)[number];

function SessionCard({ session }: { session: Session }) {
  return (
    <Link href={`/live-sessions/${session.slug}`} className="block h-full">
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E8EAF4] bg-white shadow-[0_6px_20px_rgba(26,26,74,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(26,26,74,0.10)]">
      <div className="relative h-[118px] w-full overflow-hidden sm:h-[128px]">
        <Image
          src="/live-sessions/astrology-card.png"
          alt=""
          fill
          unoptimized
          className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-2.5 top-2.5 rounded bg-[#C9A06A] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
          {session.category}
        </span>
        <button
          type="button"
          aria-label="Save session"
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#1A1A4A] shadow-sm transition hover:bg-white"
        >
          <HeartOutlineIcon />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-3 pt-3 sm:px-4 sm:pb-3.5 sm:pt-3">
        <h3
          className="text-[14px] font-semibold leading-snug text-[#3D3D8F] sm:text-[15px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {session.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <div className="relative h-7 w-7 overflow-hidden rounded-full bg-[#EEF0FA] ring-2 ring-white">
            <Image
              src={session.avatar}
              alt={session.expert}
              fill
              unoptimized
              className="object-cover object-top"
              sizes="28px"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-[#1A1A4A]">
              with {session.expert}
            </p>
            <p className="text-[10px] text-[#8A8AA8]">{session.role}</p>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#5C5C7A] sm:text-[11px]">
          <span className="inline-flex items-center gap-1">
            <CalendarIcon />
            {session.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockSmallIcon />
            {session.time}
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-[#E8EAF4] pt-2.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5C5C7A]">
            <HourglassIcon />
            {session.duration}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#3D3D8F] px-2.5 py-1.5 text-[11px] font-semibold text-white transition group-hover:bg-[#2F2F70]">
            Book Now →
          </span>
        </div>
      </div>
    </article>
    </Link>
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

function GradIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 10L12 5L21 10L12 15L3 10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 12V16.5C9 18 15 18 17 16.5V12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="6.5" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M15.5 10.5L20.5 8V16L15.5 13.5V10.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3L19 6.5V11.5C19 16 15.5 19.5 12 21C8.5 19.5 5 16 5 11.5V6.5L12 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 8V12.5L15 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3L13.5 9L19.5 10.5L13.5 12L12 18L10.5 12L4.5 10.5L10.5 9L12 3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function StarMiniIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3.5L14.2 9.2L20.2 9.8L15.6 13.8L17.1 19.7L12 16.6L6.9 19.7L8.4 13.8L3.8 9.8L9.8 9.2L12 3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function HashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 5L7 19M17 5L15 19M5 9H19M4 15H18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CardsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="4" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9 6H18C18.5 6 19 6.5 19 7V18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function LotusMiniIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 7C10.5 9 8.5 9.5 7 8.5C8 11 10 12.5 12 13.5C14 12.5 16 11 17 8.5C15.5 9.5 13.5 9 12 7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 11L12 4L20 11V19C20 19.5 19.5 20 19 20H5C4.5 20 4 19.5 4 19V11Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function HeartMiniIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20S4.5 15 4.5 9.5C4.5 7 6.5 5 9 5C10.5 5 11.5 5.8 12 6.8C12.5 5.8 13.5 5 15 5C17.5 5 19.5 7 19.5 9.5C19.5 15 12 20 12 20Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function HeartOutlineIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20S4.5 15 4.5 9.5C4.5 7 6.5 5 9 5C10.5 5 11.5 5.8 12 6.8C12.5 5.8 13.5 5 15 5C17.5 5 19.5 7 19.5 9.5C19.5 15 12 20 12 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#C9A06A]">
      <rect x="5" y="6" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4V7M16 4V7M5 10H19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ClockSmallIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#C9A06A]">
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 8.5V12.5L15 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HourglassIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#C9A06A]">
      <path d="M7 4H17M7 20H17M8 4C8 8 11 10 12 12C13 10 16 8 16 4M8 20C8 16 11 14 12 12C13 14 16 16 16 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 19C4 15.5 6.2 13.5 9 13.5C11.8 13.5 14 15.5 14 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M14.5 19C14.8 16.5 16 15 18 15C19.2 15 20 15.5 20.5 16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
