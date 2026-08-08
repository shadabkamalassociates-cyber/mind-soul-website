"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useAppSelector } from "@/store/hooks";
import { submitCommunityJoinLead } from "@/services/communityJoinService";
import BannerJoinLeadForm from "@/components/BannerJoinLeadForm";

type HeroSlide = {
  src: string;
  alt: string;
  /** Page path (e.g. `/live-sessions`) or full URL (e.g. `https://...`). Omit when only capturing a lead. */
  href?: string;
  label?: string;
  openInNewTab?: boolean;
  /** POST join-lead with logged-in user details on click (no page redirect) */
  captureLead?: boolean;
  /** Open name/email/phone join form modal on click */
  openJoinForm?: boolean;
};

/** Update images and links here */
const heroSlides: HeroSlide[] = [
  {
    src: "/works/CosmiGurujibanner.png",
    alt: "Cosmic Guruji — Healing Spirituality. Heal your mind. Awaken your soul.",
    label: "Join Cosmic Guruji healing sessions",
    captureLead: true,
  },
  {
    src: "/works/CosmicGurujibannerRE.png",
    alt: "Cosmic Guruji — Live sessions and spiritual guidance",
    label: "Explore live sessions",
    openJoinForm: true,
  },
  {
    src: "/works/Cosmic-Guruji-banner-RE1.png",
    alt: "Cosmic Guruji — Transform your mind and soul",
    label: "Meet our experts",
    openJoinForm: true,
  },
];

const AUTOPLAY_MS = 4000;

export default function HeroBannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [joinFormOpen, setJoinFormOpen] = useState(false);
  const total = heroSlides.length;
  const user = useAppSelector((s) => s.auth.user);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + total) % total);
    },
    [total],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (total <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [total]);

  const prefillName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <section
      className="relative mx-auto w-full max-w-[1400px] overflow-hidden bg-[#ffffff]"
      aria-roledescription="carousel"
      aria-label="Featured banners"
    >
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <div
              key={slide.src}
              className="relative w-full shrink-0"
              aria-hidden={index !== activeIndex}
            >
              <BannerLink
                slide={slide}
                user={user}
                onOpenJoinForm={() => setJoinFormOpen(true)}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  width={1983}
                  height={793}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className="hero-banner-image block h-auto w-full cursor-pointer"
                />
              </BannerLink>
            </div>
          ))}
        </div>

        {total > 1 && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-3 sm:px-4">
            <button
              type="button"
              aria-label="Previous banner"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                goPrev();
              }}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#3D3D8F] shadow-md transition hover:bg-white"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next banner"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                goNext();
              }}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#3D3D8F] shadow-md transition hover:bg-white"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        )}
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center gap-2 py-3">
          {heroSlides.map((slide, index) => (
            <button
              key={`dot-${slide.src}`}
              type="button"
              aria-label={`Go to banner ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-7 bg-[#3D3D8F]"
                  : "w-2.5 bg-[#3D3D8F]/30 hover:bg-[#3D3D8F]/50"
              }`}
            />
          ))}
        </div>
      )}

      <BannerJoinLeadForm
        open={joinFormOpen}
        onClose={() => setJoinFormOpen(false)}
        initialName={prefillName}
        initialEmail={String(user?.email || "")}
        initialPhone={String(user?.phone || "")}
      />
    </section>
  );
}

type AuthUserLike = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
} | null;

function BannerLink({
  slide,
  user,
  onOpenJoinForm,
  children,
}: {
  slide: HeroSlide;
  user: AuthUserLike;
  onOpenJoinForm: () => void;
  children: ReactNode;
}) {
  const className = "block w-full cursor-pointer";
  const label = slide.label ?? slide.alt;
  const href = slide.href ?? "";
  const isExternal =
    href.startsWith("http://") || href.startsWith("https://");

  async function captureLead() {
    if (!user) return;

    const first_name = String(user.first_name || "").trim();
    const last_name = String(user.last_name || "").trim();
    const email = String(user.email || "").trim();
    const phone = String(user.phone || "").trim();
    const name = [first_name, last_name].filter(Boolean).join(" ").trim();

    if (!email || !phone || !name) return;

    try {
      await submitCommunityJoinLead(
        {
          name,
          first_name,
          last_name,
          email,
          whatsapp: phone,
        },
        "website_banner",
      );
    } catch {
      // Best-effort lead capture — stay on page either way.
    }
  }

  if (slide.openJoinForm) {
    return (
      <button
        type="button"
        className={className}
        aria-label={label}
        onClick={onOpenJoinForm}
      >
        {children}
      </button>
    );
  }

  // Lead-only banner: call API, do not navigate.
  if (slide.captureLead) {
    return (
      <button
        type="button"
        className={className}
        aria-label={label}
        onClick={() => {
          void captureLead();
        }}
      >
        {children}
      </button>
    );
  }

  if (!href) {
    return <div className={className}>{children}</div>;
  }

  if (isExternal || slide.openInNewTab) {
    return (
      <a
        href={href}
        className={className}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={label}>
      {children}
    </Link>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={
          direction === "left"
            ? "M10 3.5L5.5 8L10 12.5"
            : "M6 3.5L10.5 8L6 12.5"
        }
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
