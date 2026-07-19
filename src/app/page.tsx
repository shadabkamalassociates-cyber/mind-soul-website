import type { ReactNode } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";
import FeaturedLiveSessions from "@/components/FeaturedLiveSessions";
import SoulExperts from "@/components/SoulExperts";
import TransformationPrograms from "@/components/TransformationPrograms";
import CommunityReviews from "@/components/CommunityReviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { ArrowCircle, StarIcon } from "@/components/Icons";

const avatars = [
  { bg: "linear-gradient(145deg, #e8c69f, #8b6914)", initial: "A" },
  { bg: "linear-gradient(145deg, #f0d4a8, #9b754d)", initial: "M" },
  { bg: "linear-gradient(145deg, #d4af37, #6b4423)", initial: "S" },
  { bg: "linear-gradient(145deg, #c9a06a, #7a5a2e)", initial: "K" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white">
      <Header />

      <section className="relative">
        {/* Hero — less top margin, smaller right image */}
        <div className="mx-auto grid max-w-[1400px] items-center gap-5 px-6 pt-6 pb-2 sm:px-8 sm:pt-7 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:px-10 lg:pt-8 xl:px-12">
          {/* LEFT */}
          <div className="animate-fade-up relative z-10 w-full min-w-0 py-1 lg:py-2">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#D4AF37] sm:mb-4 sm:text-[11px] lg:text-[12px]">
              Live Guidance • Deep Healing • Real Transformation
            </p>

            <h1
              className="text-[34px] font-medium leading-[1.12] text-white sm:text-[42px] lg:text-[48px] xl:text-[52px]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Transform Your Mind,
              <br />
              <span className="gold-gradient-text">Heal Your Soul,</span>
              <br />
              Rediscover Yourself
            </h1>

            <p className="animate-fade-up-delay mt-4 max-w-[400px] text-[13px] leading-[1.7] text-[#A8A8A8] sm:text-[14px] lg:mt-5 lg:text-[15px]">
              Join thousands on a journey of self-discovery, healing and
              spiritual growth with India&apos;s most trusted experts.
            </p>

            <div className="animate-fade-up-delay-2 mt-6 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-3.5 lg:mt-8">
              <a
                href="#book"
                className="btn-gold inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-[13px] font-semibold sm:px-6 sm:py-3.5 sm:text-[14px]"
              >
                Book A Session
                <ArrowCircle className="border-black/30 text-[#1a1208]" />
              </a>
              <a
                href="#experts"
                className="btn-outline-gold inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-[13px] font-medium sm:px-6 sm:py-3.5 sm:text-[14px]"
              >
                Explore Experts
                <ArrowCircle className="border-[#D4AF37]/50 text-[#E8C69F]" />
              </a>
            </div>
          </div>

          {/* RIGHT — slightly larger image */}
          <div className="animate-fade-in relative flex w-full min-w-0 justify-center lg:justify-end">
            <div className="relative aspect-[4/3.15] w-full max-w-[460px] overflow-hidden sm:max-w-[500px] lg:max-w-[540px] xl:max-w-[560px]">
              <Image
                src="/hero-meditation.png"
                alt="Meditative silhouette with golden mandala over mountains"
                fill
                priority
                className="object-cover object-[center_30%]"
                sizes="(max-width: 1024px) 90vw, 560px"
                quality={95}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#05070A] via-[#05070A]/40 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-[#05070A] to-transparent" />

              {/* Trust card — bottom right */}
              <div className="glass-card absolute bottom-1 right-3 z-10 w-[min(100%,200px)] rounded-xl p-3 pt-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.55)] sm:bottom-2 sm:right-4 sm:w-[220px] sm:rounded-2xl sm:p-3.5 sm:pt-4">
                <p className="text-[11px] font-medium leading-snug text-white sm:text-[12px]">
                  Trusted by 50,000+ Souls Worldwide
                </p>

                <div className="mt-2.5 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {avatars.map((a) => (
                      <div
                        key={a.initial}
                        className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0a0b10] text-[9px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[10px]"
                        style={{ background: a.bg }}
                      >
                        {a.initial}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-[2px] text-[#D4AF37]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#A0A0A0]">
                      4.9{" "}
                      <span className="text-[#777]">(10k+ reviews)</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats — 60% width, left aligned */}
        <div className="relative z-10 w-full bg-[#05070A] pt-3 pb-4 lg:pt-4 lg:pb-5">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
            <div className="flex w-full max-w-none items-center justify-between gap-3 overflow-x-auto sm:w-[60%] sm:justify-between sm:gap-4 sm:overflow-visible">
              <Stat icon={<LotusIcon />} value="50,000+" label="Lives Transformed" />
              <Stat icon={<MedalIcon />} value="300+" label="Verified Experts" />
              <Stat icon={<StarOutlineIcon />} value="4.9" label="Average Rating" />
              <Stat icon={<GlobeIcon />} value="100+" label="Countries" />
            </div>
          </div>
        </div>

        <CategoryBar />
      </section>

      <FeaturedLiveSessions />
      <SoulExperts />
      <TransformationPrograms />
      <CommunityReviews />
      <FAQ />
      <Footer />
    </main>
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
    <div className="flex min-w-fit shrink-0 items-center gap-2 sm:gap-2.5">
      <span className="flex shrink-0 text-[#D4AF37]" aria-hidden>
        {icon}
      </span>
      <p className="whitespace-nowrap text-[13px] leading-none sm:text-[14px] lg:text-[15px]">
        <span className="font-semibold text-white">{value}</span>{" "}
        <span className="font-normal text-[#A8A8A8]">{label}</span>
      </p>
    </div>
  );
}

function LotusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M14 22C14 22 6 16 6 11C6 8 8.5 6 11 6C12.3 6 13.3 6.7 14 7.5C14.7 6.7 15.7 6 17 6C19.5 6 22 8 22 11C22 16 14 22 14 22Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M14 7.5C14 7.5 11 11 11 14.5C11 16.5 12.3 18 14 18C15.7 18 17 16.5 17 14.5C17 11 14 7.5 14 7.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
        opacity="0.75"
      />
      <path d="M14 18V23" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M9 9.5L7 3H10.5L12 6.5L13.5 3H17L15 9.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function StarOutlineIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L14.2 8.5L20 9.2L15.8 13.2L17 19L12 16.2L7 19L8.2 13.2L4 9.2L9.8 8.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.35" />
      <path d="M3.5 12H20.5" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M12 3.5C14.5 6.5 15.5 9.5 15.5 12C15.5 14.5 14.5 17.5 12 20.5C9.5 17.5 8.5 14.5 8.5 12C8.5 9.5 9.5 6.5 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
      />
    </svg>
  );
}
