"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  fetchVerifiedExperts,
  getExpertCardBio,
  mapExpertForUi,
  type UiExpert,
} from "@/services/expertsService";
import { ApiError } from "@/services/apiClient";

const heroFeatures = [
  {
    title: "Verified Experts",
    desc: "Carefully selected & verified",
    icon: <VerifiedIcon />,
  },
  {
    title: "Trusted Guidance",
    desc: "Safe, confidential & ethical sessions",
    icon: <ShieldIcon />,
  },
  {
    title: "Holistic Approach",
    desc: "Mind, body & soul transformation",
    icon: <LotusSmallIcon />,
  },
];

const stats = [
  { icon: <StatLotusIcon />, value: "300+", label: "Expert Guides" },
  { icon: <StatLotusIcon />, value: "100+", label: "Healing Practices" },
  { icon: <StatPeopleIcon />, value: "1,00,000+", label: "Happy Seekers" },
  { icon: <StatGlobeIcon />, value: "20+", label: "Countries Served" },
];

export default function ExpertsPageClient() {
  const [experts, setExperts] = useState<UiExpert[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "succeeded" | "failed">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadExperts() {
      setStatus("loading");
      setError(null);

      try {
        const data = await fetchVerifiedExperts();
        if (!cancelled) {
          setExperts(data.map(mapExpertForUi));
          setStatus("succeeded");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : err instanceof Error
                ? err.message
                : "Failed to load experts",
          );
          setStatus("failed");
        }
      }
    }

    loadExperts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-[1400px] items-center gap-6 px-3 pt-8 pb-10 sm:px-4 lg:grid-cols-[1fr_1.2fr] lg:gap-2 lg:px-5 lg:pt-10 lg:pb-12">
          <div className="relative z-10 max-w-[520px] lg:pl-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A06A]">
              OUR EXPERTS —
            </p>
            <h1
              className="mt-3 text-[34px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#3D3D8F] sm:text-[40px] lg:text-[44px]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Guided by Experts.
              <br />
              Transformed by Wisdom.
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A06A]/70" />
              <Image
                src="/experts-page/lotus-gold.png"
                alt=""
                width={18}
                height={18}
                unoptimized
              />
              <span className="h-px w-10 bg-[#C9A06A]/70" />
            </div>
            <p className="mt-5 max-w-[460px] text-[14px] leading-[1.75] text-[#5C5C7A] sm:text-[15px]">
              Connect with verified guides for clarity, healing, and
              transformation — curated for your unique journey.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
              {heroFeatures.map((f) => (
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

          <div className="relative mx-auto hidden h-[300px] w-full max-w-[520px] lg:block lg:h-[360px] lg:justify-self-end">
            <Image
              src="/experts-page/hero.png"
              alt=""
              fill
              priority
              className="object-contain object-center"
              sizes="520px"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-[#F8F9FC] px-4 py-12 sm:px-5 sm:py-14 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <span className="h-px w-12 bg-[#C9A06A] sm:w-16" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] sm:text-[13px]">
                <span className="text-[#C9A06A]">MEET OUR </span>
                <span className="text-[#3D3D8F]">EXPERT TEAM</span>
              </p>
              <span className="h-px w-12 bg-[#3D3D8F] sm:w-16" />
            </div>
            <h2
              className="mt-4 text-[34px] font-semibold leading-[1.12] text-[#3D3D8F] sm:text-[40px] lg:text-[44px]"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                color: "#3D3D8F",
              }}
            >
              Experts Who Inspire Transformation
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3 sm:gap-4">
              <span className="h-px w-24 bg-[#C9A06A]/60 sm:w-32" />
              <Image
                src="/experts-page/lotus-gold.png"
                alt=""
                width={30}
                height={30}
                unoptimized
                className="opacity-95"
              />
              <span className="h-px w-24 bg-[#C9A06A]/60 sm:w-32" />
            </div>
          </div>

          {status === "loading" && experts.length === 0 && (
            <p className="mt-10 text-center text-[14px] text-[#8A8AA8]">
              Loading experts...
            </p>
          )}

          {error && (
            <p className="mt-4 text-center text-[13px] text-[#B42318]">
              {error}
            </p>
          )}

          <div className="mt-10 grid auto-rows-fr gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>

          {status !== "loading" && experts.length === 0 && (
            <p className="mt-10 text-center text-[14px] text-[#8A8AA8]">
              No experts available yet.
            </p>
          )}

          <div className="expert-stats-bar mt-8 grid grid-cols-2 gap-x-6 gap-y-7 rounded-2xl border border-[#E8EAF4] bg-white px-5 py-7 shadow-[0_8px_30px_rgba(30,36,101,0.06)] sm:px-8 sm:py-8 lg:mt-10 lg:grid-cols-4 lg:gap-x-10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3.5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EDEAF8] text-[#1A1A4A] sm:h-[60px] sm:w-[60px]">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[20px] font-semibold leading-none text-[#1E2465] sm:text-[22px]">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[12px] text-[#6B6B8A] sm:text-[13px]">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — zen banner (matches About page design) */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-[#F7F5FC]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 75% at 28% 50%, rgba(255,255,255,0.95) 0%, rgba(247,245,252,0.45) 55%, transparent 78%)",
            }}
          />

          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] lg:block xl:w-[36%]">
            <Image
              src="/about/cta-right.png"
              alt=""
              fill
              unoptimized
              className="object-cover object-[right_center] opacity-90"
              sizes="40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#F7F5FC]/25 to-[#F7F5FC]" />
            <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-l from-transparent to-[#F7F5FC]" />
          </div>

          <div className="relative z-10 flex max-w-[580px] flex-col items-start px-6 py-14 text-left sm:px-10 sm:py-16 lg:max-w-[52%] lg:px-14 lg:py-[72px]">
            <h2
              className="text-[28px] font-semibold leading-[1.25] text-[#3D3D8F] sm:text-[34px] lg:text-[36px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Ready to begin your journey?
            </h2>
            <p className="mt-4 max-w-[420px] text-[14px] leading-[1.7] text-[#3A3A4A] sm:text-[15px]">
              Create an account to explore professionals, read verified reviews,
              and book your first session.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-start gap-3.5">
              <Link
                href="/#start"
                className="inline-flex min-w-[140px] items-center justify-center rounded-xl bg-[#3D3D8F] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(61,61,143,0.28)] transition hover:bg-[#2F2F75] hover:shadow-[0_10px_28px_rgba(61,61,143,0.35)]"
              >
                Get Started
              </Link>
              <Link
                href="/experts"
                className="inline-flex min-w-[140px] items-center justify-center rounded-xl border-[1.5px] border-[#3D3D8F] bg-white/80 px-7 py-3.5 text-[14px] font-semibold text-[#3D3D8F] backdrop-blur-sm transition hover:bg-[#3D3D8F] hover:text-white"
              >
                Explore Experts
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1A1A4A]">
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[min(42%,360px)] lg:block">
          <Image
            src="/about/cta-left.png"
            alt=""
            fill
            unoptimized
            className="object-cover object-[left_center] opacity-90"
            sizes="360px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1A1A4A]/35 to-[#1A1A4A]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-6 py-8 sm:px-8 sm:py-9 lg:flex-row lg:items-center lg:px-10">
          <div className="lg:pl-[min(34%,280px)]">
            <p className="text-[16px] font-medium text-white sm:text-[17px]">
              Need help finding the right expert?
            </p>
            <Link
              href="/contact"
              className="mt-1 inline-block text-[13px] text-white/70 underline underline-offset-2 transition hover:text-white"
            >
              Visit Contact Page
            </Link>
          </div>
          <a
            href="https://cosmicguruji.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-white/80 transition hover:text-white"
          >
            https://cosmicguruji.com/
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ExpertCard({ expert }: { expert: UiExpert }) {
  const bio = getExpertCardBio(expert.bio);

  return (
    <Link href={`/experts/${expert.slug}`} className="block h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_8px_28px_rgba(26,26,74,0.10)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(26,26,74,0.14)] sm:rounded-[20px]">
        <div className="relative shrink-0 bg-[#F7F6FB] pt-3">
          <span className="absolute left-3 top-3 z-20 rounded-[3px] bg-[#3D3D8F] px-2 py-[4px] text-[7px] font-bold uppercase tracking-[0.1em] text-white sm:left-3.5 sm:top-3.5 sm:text-[7.5px]">
            {expert.experience}
          </span>
          <div className="relative mx-auto h-[215px] w-full sm:h-[225px]">
            <Image
              src="/experts-page/frame.png"
              alt=""
              fill
              className="z-0 scale-[1.38] object-contain object-center sm:scale-[1.42]"
              sizes="(max-width: 768px) 90vw, 340px"
            />
            <div className="absolute inset-x-[3%] bottom-0 top-[6%] z-[1] sm:top-[5%]">
              <Image
                src={expert.image}
                alt={expert.name}
                fill
                unoptimized
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 85vw, 320px"
              />
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col bg-[#1A1A4A] px-4 pb-4 pt-4 text-center sm:px-5 sm:pb-5">
          <div className="shrink-0">
            <h3
              className="text-[17px] font-semibold leading-tight text-white sm:text-[18px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {expert.name}
            </h3>
            <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#C9A06A] sm:text-[9px]">
              {expert.title}
            </p>
          </div>

          <p className="mx-auto mt-2.5 line-clamp-3 min-h-[2.5rem] max-w-[250px] text-[11px] leading-[1.55] text-white/85 sm:min-h-[2.75rem] sm:text-[11.5px]">
            {bio}
          </p>

          <div className="my-3 flex shrink-0 items-center justify-center gap-2.5">
            <span className="h-px w-12 bg-[#C9A06A]/50" />
            <span className="h-[4px] w-[4px] rotate-45 bg-[#C9A06A]" />
            <span className="h-px w-12 bg-[#C9A06A]/50" />
          </div>

          <div className="mx-auto flex w-fit max-w-[240px] flex-col gap-2 sm:max-w-[250px]">
            <ExpertCardDetailRow
              label="Specialization"
              value={expert.specialization}
              icon={<MiniLotusIcon />}
            />
            <ExpertCardDetailRow
              label="Experience"
              value={expert.experience}
              icon={<CalendarMiniIcon />}
            />
          </div>

          <div className="mt-auto pt-4">
            <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/75 px-5 py-1.5 text-[11px] font-medium text-white transition group-hover:bg-white/10 sm:px-5 sm:py-2 sm:text-[12px]">
              View Profile
              <ArrowIcon />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ExpertCardDetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-start gap-2 text-left">
      <span className="mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center text-[#C9A06A]">
        {icon}
      </span>
      <p className="min-w-0 text-[11px] leading-snug text-white/90">
        <span className="font-semibold text-[#C9A06A]">{label}:</span> {value}
      </p>
    </div>
  );
}

function VerifiedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l7 2.5v5.2c0 4.2-2.8 7.8-7 9.3-4.2-1.5-7-5.1-7-9.3V5.5L12 3Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 12l1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3.5l7 2.5v5.2c0 4.2-2.8 7.8-7 9.3-4.2-1.5-7-5.1-7-9.3V6L12 3.5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function LotusSmallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20c2.5-3 4-6 4-9a4 4 0 10-8 0c0 3 1.5 6 4 9Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 20c-3.5-2.2-6-5-6-8.5A3.5 3.5 0 0112 9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 20c3.5-2.2 6-5 6-8.5A3.5 3.5 0 0012 9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function StatLotusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20c2.5-3 4-6 4-9a4 4 0 10-8 0c0 3 1.5 6 4 9Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function StatPeopleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 18c.8-2.6 2.8-4 5.5-4s4.7 1.4 5.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function StatGlobeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 12h16M12 4c2.5 2.5 3.5 5 3.5 8s-1 5.5-3.5 8c-2.5-2.5-3.5-5-3.5-8s1-5.5 3.5-8Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MiniLotusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 19c2-2.4 3.2-4.8 3.2-7.2a3.2 3.2 0 10-6.4 0c0 2.4 1.2 4.8 3.2 7.2Z" fill="currentColor" />
    </svg>
  );
}
function CalendarMiniIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4v4M16 4v4M4 11h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
