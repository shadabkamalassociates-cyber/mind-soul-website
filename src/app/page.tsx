import type { ReactNode } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";
import FeaturedLiveSessions from "@/components/FeaturedLiveSessions";
import SoulExperts from "@/components/SoulExperts";
import WhySoulSensei from "@/components/WhySoulSensei";
import TransformationPrograms from "@/components/TransformationPrograms";
import UpcomingRetreats from "@/components/UpcomingRetreats";
import BlogInsights from "@/components/BlogInsights";
import CommunityReviews from "@/components/CommunityReviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { StarIcon } from "@/components/Icons";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white">
      {/* First screen — exact 2nd sc: indigo + white */}
      <div className="relative bg-white text-[#1A1A4A]">
        <Header />

        <section className="relative">
          <div className="mx-auto grid max-w-[1280px] items-center gap-6 px-6 pt-8 pb-0 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10 lg:pt-10">
            {/* LEFT */}
            <div className="relative z-10 flex w-full min-w-0 flex-col justify-center py-2 lg:py-6 lg:pb-16">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4A4A8A] sm:text-[12px]">
                Live • Elevate • Deep Healing • Real Transformation
              </p>

              <h1
                className="max-w-[520px] text-[36px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#1A1A4A] sm:text-[44px] lg:text-[48px] xl:text-[52px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Transform Your Mind,{" "}
                <span className="text-[#3D3D8F]">Heal Your Soul,</span>{" "}
                Rediscover Yourself
              </h1>

              <p className="mt-5 max-w-[440px] text-[15px] leading-[1.7] text-[#5C5C7A] sm:text-[16px]">
                Join thousands on a journey of self-discovery, healing and
                spiritual growth with our transformational sessions.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1A1A4A] px-6 py-3.5 text-[14px] font-semibold text-white transition hover:bg-[#2A2A6A]"
                >
                  Book a Session
                  <ArrowRight />
                </a>
                <a
                  href="#programs"
                  className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#1A1A4A] bg-white px-6 py-3.5 text-[14px] font-semibold text-[#1A1A4A] transition hover:bg-[#F4F4FA]"
                >
                  Explore Programs
                  <ArrowRight />
                </a>
              </div>
            </div>

            {/* RIGHT — shorter image, soft merge into white */}
            <div className="relative z-10 w-full min-w-0 pb-6 lg:pb-4">
              <div className="relative mx-auto aspect-[16/11] w-full max-w-[540px] overflow-hidden rounded-r-[24px] rounded-bl-[24px] rounded-tl-none sm:max-w-[580px] lg:ml-auto lg:max-w-none">
                <Image
                  src="/hero-right.png"
                  alt="Woman meditating at sunrise among mountains and candles"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-[center_35%]"
                  sizes="(max-width: 1024px) 90vw, 560px"
                />
                {/* Soft merge into left white */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[28%] bg-gradient-to-r from-white via-white/70 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[18%] bg-gradient-to-t from-white/80 to-transparent lg:from-white/50" />

                {/* Live session card */}
                <div className="absolute bottom-4 right-4 z-10 w-[min(100%,220px)] rounded-2xl bg-white p-3.5 shadow-[0_10px_40px_rgba(26,26,74,0.18)] sm:bottom-5 sm:right-5 sm:w-[230px] sm:p-4">
                  <p className="text-[13px] font-semibold leading-snug text-[#1A1A4A]">
                    Live Healing Session
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#6B6B8A]">
                    with Ananda Devi
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-[1px] text-[#1A1A4A]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>
                      <span className="text-[11px] font-medium text-[#5C5C7A]">
                        4.9 (2.1K)
                      </span>
                    </div>
                    <a
                      href="#join"
                      className="shrink-0 rounded-lg bg-[#1A1A4A] px-3.5 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#2A2A6A]"
                    >
                      Join Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar — overlaps bottom like 2nd sc */}
          <div className="relative z-20 -mt-2 w-full border-t border-[#E8E8F0] bg-white lg:-mt-10">
            <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 overflow-x-auto px-6 py-5 sm:px-8 sm:py-6 lg:px-10">
              <Stat icon={<SessionsIcon />} value="10K+" label="Sessions Held" />
              <Stat icon={<LotusIcon />} value="15K+" label="Lives Touched" />
              <Stat icon={<ExpertsIcon />} value="200+" label="Healing Experts" />
              <Stat icon={<StarOutlineIcon />} value="4.9" label="Average Rating" />
              <Stat icon={<ReviewsIcon />} value="1000+" label="5-Star Reviews" />
            </div>
          </div>
        </section>
      </div>

      <div className="bg-white">
        <CategoryBar />
      </div>

      <FeaturedLiveSessions />
      <SoulExperts />
      <WhySoulSensei />
      <TransformationPrograms />
      <UpcomingRetreats />
      <BlogInsights />
      <CommunityReviews />
      <FAQ />
      <Footer />
    </main>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex min-w-fit shrink-0 items-center gap-2.5">
      <span className="flex shrink-0 text-[#1A1A4A]" aria-hidden>
        {icon}
      </span>
      <p className="whitespace-nowrap text-[14px] leading-none sm:text-[15px]">
        <span className="font-bold text-[#1A1A4A]">{value}</span>{" "}
        <span className="font-medium text-[#1A1A4A]">{label}</span>
      </p>
    </div>
  );
}

function SessionsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 3V7M16 3V7M4 10H20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LotusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M14 22C14 22 6 16 6 11C6 8 8.5 6 11 6C12.3 6 13.3 6.7 14 7.5C14.7 6.7 15.7 6 17 6C19.5 6 22 8 22 11C22 16 14 22 14 22Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M14 7.5C14 7.5 11 11 11 14.5C11 16.5 12.3 18 14 18C15.7 18 17 16.5 17 14.5C17 11 14 7.5 14 7.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.75"
      />
      <path d="M14 18V23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ExpertsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M3.5 19C3.5 16.5 5.5 14.5 9 14.5C12.5 14.5 14.5 16.5 14.5 19"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M14.5 14.8C15.5 14.6 16.3 14.5 17 14.5C19.8 14.5 21.5 16 21.5 18.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarOutlineIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L14.2 8.5L20 9.2L15.8 13.2L17 19L12 16.2L7 19L8.2 13.2L4 9.2L9.8 8.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReviewsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L14.2 8.5L20 9.2L15.8 13.2L17 19L12 16.2L7 19L8.2 13.2L4 9.2L9.8 8.5L12 3Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}
