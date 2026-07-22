"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { LiveSession } from "@/data/liveSessions";

const tabs = [
  { id: "about", label: "About Session" },
  { id: "get", label: "What You'll Get" },
  { id: "who", label: "Who Should Join" },
  { id: "flow", label: "Session Flow" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
];

const consultationTypes = [
  {
    label: "Video Call",
    desc: "Face-to-face via secure video",
    icon: <VideoIcon />,
  },
  {
    label: "Audio Call",
    desc: "Voice-only consultation",
    icon: <PhoneIcon />,
  },
  {
    label: "Chat",
    desc: "Real-time text guidance",
    icon: <ChatIcon />,
  },
  {
    label: "WhatsApp",
    desc: "Chat on WhatsApp",
    icon: <WhatsAppIcon />,
  },
  {
    label: "Email Report",
    desc: "Detailed written insights",
    icon: <MailIcon />,
  },
  {
    label: "Live Session",
    desc: "Join interactive live class",
    icon: <LiveIcon />,
  },
  {
    label: "Recorded Session",
    desc: "Watch anytime access",
    icon: <PlayIcon />,
  },
  {
    label: "In-person",
    desc: "Meet at the studio",
    icon: <UserIcon />,
  },
];

const priceFeatures = [
  { label: "90 mins Live Session", icon: <ClockIcon /> },
  { label: "Personalized Guidance", icon: <SparkIcon /> },
  { label: "Interactive Q&A", icon: <ChatIcon /> },
  { label: "Session Recording Access", icon: <PlayIcon /> },
  { label: "Follow-up Notes", icon: <MailIcon /> },
];

export default function SessionDetailPage({ session }: { session: LiveSession }) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-[#E8EAF4] bg-[#F8F9FC]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-4 py-3 text-[12px] text-[#5C5C7A] sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-[#1A1A4A]">
            Home
          </Link>
          <span className="text-[#C5C5D5]">&gt;</span>
          <Link href="/live-sessions" className="hover:text-[#1A1A4A]">
            Live Sessions
          </Link>
          <span className="text-[#C5C5D5]">&gt;</span>
          <span className="font-medium text-[#1A1A4A] line-clamp-1">{session.title}</span>
        </div>
      </div>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_340px] lg:gap-10 lg:px-8 lg:py-10">
          {/* Left */}
          <div className="min-w-0">
            {/* Hero image */}
            <div className="relative h-[220px] w-full overflow-hidden rounded-2xl sm:h-[280px] lg:h-[320px]">
              <Image
                src={session.image}
                alt=""
                fill
                unoptimized
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
              <span className="absolute left-4 top-4 rounded-md bg-[#C9A06A] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                {session.category}
              </span>
              <button
                type="button"
                aria-label="Save"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1A1A4A] shadow-md"
              >
                <HeartIcon />
              </button>
            </div>

            <h1
              className="mt-6 text-[28px] font-semibold leading-tight text-[#3D3D8F] sm:text-[34px] lg:text-[38px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {session.title}
            </h1>
            <p className="mt-3 max-w-[720px] text-[14px] leading-[1.75] text-[#5C5C7A] sm:text-[15px]">
              {session.subtitle}
            </p>

            {/* Quick info */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: <CalendarIcon />, label: "Date", value: session.date },
                { icon: <ClockIcon />, label: "Time", value: session.time },
                { icon: <HourglassIcon />, label: "Duration", value: session.duration },
                { icon: <GlobeIcon />, label: "Languages", value: session.languages },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-2.5 rounded-xl border border-[#E8EAF4] bg-[#F8F9FC] px-3 py-3"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF0FA] text-[#C9A06A]">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#8A8AA8]">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[12px] font-semibold leading-snug text-[#1A1A4A]">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Host bar */}
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#E8EAF4] bg-white px-4 py-4 shadow-[0_4px_16px_rgba(26,26,74,0.04)] sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#EEF0FA] ring-2 ring-[#E8EAF4]">
                  <Image
                    src={session.avatar}
                    alt={session.expert}
                    fill
                    unoptimized
                    className="object-cover object-top"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#1A1A4A]">{session.expert}</p>
                  <p className="text-[12px] text-[#8A8AA8]">{session.role}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
                    <span className="inline-flex items-center gap-1 font-semibold text-[#C9A06A]">
                      <StarIcon /> {session.rating}{" "}
                      <span className="font-medium text-[#8A8AA8]">
                        ({session.reviews} Reviews)
                      </span>
                    </span>
                    <span className="text-[#5C5C7A]">
                      Experience:{" "}
                      <span className="font-semibold text-[#1A1A4A]">{session.experience}</span>
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href="/experts"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-[#3D3D8F]/35 px-5 py-2.5 text-[13px] font-semibold text-[#3D3D8F] transition hover:bg-[#F4F2FA]"
              >
                View Expert Profile →
              </Link>
            </div>

            {/* Tabs */}
            <div className="mt-8 overflow-x-auto border-b border-[#E8EAF4]">
              <div className="flex min-w-max gap-1">
                {tabs.map((tab) => {
                  const active = activeTab === tab.id;
                  const label =
                    tab.id === "reviews" ? `${tab.label} (${session.reviews})` : tab.label;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-3 py-3 text-[13px] font-medium transition sm:px-4 ${
                        active ? "text-[#1A1A4A]" : "text-[#8A8AA8] hover:text-[#1A1A4A]"
                      }`}
                    >
                      {label}
                      {active && (
                        <span className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-[#C9A06A]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* About */}
            <div className="mt-7">
              <h2
                className="text-[22px] font-semibold text-[#3D3D8F] sm:text-[24px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                About This Session
              </h2>
              <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_240px]">
                <div className="space-y-4 text-[14px] leading-[1.8] text-[#5C5C7A]">
                  {session.about.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                <aside className="rounded-2xl border border-[#E8D9C4] bg-[#FBF6EE] px-5 py-5">
                  <Image
                    src="/experts-page/lotus-gold.png"
                    alt=""
                    width={22}
                    height={22}
                    unoptimized
                  />
                  <p
                    className="mt-3 text-[14px] italic leading-relaxed text-[#1A1A4A]"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    &ldquo;{session.quote}&rdquo;
                  </p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C9A06A]">
                    — {session.quoteAttr}
                  </p>
                </aside>
              </div>
            </div>

            {/* Topics */}
            <div className="mt-10">
              <h2
                className="text-[22px] font-semibold text-[#3D3D8F] sm:text-[24px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Topics We Will Cover
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {session.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2.5 text-[14px] text-[#1A1A4A]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F3E8D4] text-[#C9A06A]">
                      <CheckIcon />
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {/* Consultation types */}
            <div className="mt-10">
              <div className="flex items-center gap-3">
                <h2
                  className="text-[22px] font-semibold text-[#3D3D8F] sm:text-[24px]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Consultation Types Available
                </h2>
                <span className="hidden h-px flex-1 bg-gradient-to-r from-[#C9A06A]/50 to-transparent sm:block" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {consultationTypes.map((item) => (
                  <div
                    key={item.label}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-[#E4E2EF] bg-white px-3 py-3.5 text-center shadow-[0_2px_10px_rgba(26,26,74,0.03)] transition hover:-translate-y-0.5 hover:border-[#3D3D8F]/25 hover:shadow-[0_8px_22px_rgba(26,26,74,0.08)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF0FA] text-[#3D3D8F] transition group-hover:bg-[#3D3D8F] group-hover:text-white">
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-[#1A1A4A] sm:text-[13px]">
                        {item.label}
                      </p>
                      <p className="mt-0.5 hidden text-[10px] leading-snug text-[#6B6B8A] sm:block sm:text-[11px]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {/* Price card */}
            <div className="relative overflow-hidden rounded-2xl border border-[#E8EAF4] bg-white p-5 shadow-[0_10px_36px_rgba(26,26,74,0.08)] sm:p-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 opacity-[0.08]">
                <Image src="/contact-mandala-gold.png" alt="" fill unoptimized className="object-contain" sizes="128px" />
              </div>
              <p className="text-[32px] font-semibold leading-none text-[#1A1A4A] sm:text-[36px]">
                {session.price}
              </p>
              <p className="mt-1.5 text-[12px] text-[#8A8AA8]">Inclusive of all taxes</p>

              <ul className="mt-5 space-y-2.5">
                {priceFeatures.map((f) => (
                  <li key={f.label} className="flex items-center gap-2.5 text-[13px] text-[#1A1A4A]">
                    <span className="text-[#C9A06A]">{f.icon}</span>
                    {f.label}
                  </li>
                ))}
              </ul>

              <Link
                href={`/cart?session=${session.slug}`}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D3D8F] px-5 py-3.5 text-[14px] font-semibold text-white transition hover:bg-[#2F2F70]"
              >
                Book This Session →
              </Link>
              <button
                type="button"
                className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#3D3D8F]/35 bg-white px-5 py-3 text-[13px] font-semibold text-[#3D3D8F] transition hover:bg-[#F4F2FA]"
              >
                Send as a Gift
              </button>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-[#8A8AA8]">
                <span className="inline-flex items-center gap-1">
                  <ShieldIcon /> 100% Secure Payment
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckIcon /> Easy Cancellation
                </span>
              </div>
            </div>

            {/* Expert mini card */}
            <div className="rounded-2xl border border-[#E8EAF4] bg-white p-5 shadow-[0_6px_24px_rgba(26,26,74,0.05)]">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#EEF0FA]">
                  <Image
                    src={session.avatar}
                    alt={session.expert}
                    fill
                    unoptimized
                    className="object-cover object-top"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#1A1A4A]">
                    {session.expert}
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3D3D8F] text-white">
                      <CheckTinyIcon />
                    </span>
                  </p>
                  <p className="text-[12px] text-[#8A8AA8]">{session.role}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-[#5C5C7A]">
                <span>
                  Exp: <strong className="text-[#1A1A4A]">{session.experience}</strong>
                </span>
                <span className="inline-flex items-center gap-1 text-[#C9A06A]">
                  <StarIcon /> {session.rating}
                </span>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-[#5C5C7A]">
                Verified expert guiding seekers with clarity, compassion, and
                deep Vedic insight.
              </p>
              <Link
                href="/experts"
                className="mt-3 inline-flex text-[13px] font-semibold text-[#1A1A4A] hover:text-[#3D3D8F]"
              >
                View Full Profile →
              </Link>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#E8EAF4] pt-4 text-[11px]">
                {[
                  { label: "Seats Left", value: session.seatsLeft },
                  { label: "Bookings", value: session.bookings },
                  { label: "Session ID", value: session.sessionId },
                  { label: "Category", value: session.category },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-[#F8F9FC] px-2.5 py-2">
                    <p className="text-[#8A8AA8]">{s.label}</p>
                    <p className="mt-0.5 font-semibold text-[#1A1A4A]">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Help */}
            <div className="rounded-2xl border border-[#DDE0F2] bg-[#EEF0FA] p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3D3D8F] text-white">
                <HeadsetIcon />
              </span>
              <h3 className="mt-3 text-[16px] font-semibold text-[#3D3D8F]">Need Help?</h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#5C5C7A]">
                Our support team is here if you have questions about booking or
                this session.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#3D3D8F]/35 bg-white px-4 py-2 text-[12px] font-semibold text-[#3D3D8F] transition hover:bg-white/80"
              >
                Contact Support →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20S4.5 15 4.5 9.5C4.5 7 6.5 5 9 5C10.5 5 11.5 5.8 12 6.8C12.5 5.8 13.5 5 15 5C17.5 5 19.5 7 19.5 9.5C19.5 15 12 20 12 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="6" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4V7M16 4V7M5 10H19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 8.5V12.5L15 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HourglassIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 4H17M7 20H17M8 4C8 8 11 10 12 12C13 10 16 8 16 4M8 20C8 16 11 14 12 12C13 14 16 16 16 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 12H20M12 4C10 7 10 17 12 20C14 17 14 7 12 4Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3.5L14.2 9.2L20.2 9.8L15.6 13.8L17.1 19.7L12 16.6L6.9 19.7L8.4 13.8L3.8 9.8L9.8 9.2L12 3.5Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckTinyIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3L19 6.5V11.5C19 16 15.5 19.5 12 21C8.5 19.5 5 16 5 11.5V6.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3L13.5 9L19.5 10.5L13.5 12L12 18L10.5 12L4.5 10.5L10.5 9L12 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
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

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8.5 4.5H7C5.9 4.5 5 5.4 5 6.5V7.5C5 14.4 10.6 20 17.5 20H18.5C19.6 20 20.5 19.1 20.5 18V16.5L17.2 15.4L15.5 17.2C13.2 16 11 13.8 9.8 11.5L11.6 9.8L10.5 6.5H8.5V4.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 6.5C5 5.7 5.7 5 6.5 5H17.5C18.3 5 19 5.7 19 6.5V14.5C19 15.3 18.3 16 17.5 16H10L6 19V16H6.5C5.7 16 5 15.3 5 14.5V6.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4.5C7.9 4.5 4.5 7.8 4.5 11.8C4.5 13.2 4.9 14.5 5.6 15.6L4.5 19.5L8.5 18.4C9.6 19 10.8 19.4 12 19.4C16.1 19.4 19.5 16.1 19.5 12C19.5 7.9 16.1 4.5 12 4.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 7L12 12.5L19.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 7C4.5 9.5 4.5 14.5 7 17M17 7C19.5 9.5 19.5 14.5 17 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 9L16 12L10 15V9Z" fill="currentColor" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 20C6 16.5 8.5 14 12 14C15.5 14 18 16.5 18 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 13V12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="3" y="12" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="17" y="12" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
