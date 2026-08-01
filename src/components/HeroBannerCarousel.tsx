"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";

type HeroSlide = {
  src: string;
  alt: string;
  /** Page path (e.g. `/live-sessions`) or full URL (e.g. `https://...`) */
  href: string;
  label?: string;
  openInNewTab?: boolean;
};

/** Update images and links here */
const heroSlides: HeroSlide[] = [
  {
    src: "/CosmicGurujibanner.png",
    alt: "Cosmic Guruji — Healing Spirituality. Heal your mind. Awaken your soul.",
    href: "/live-sessions",
    label: "Join Cosmic Guruji healing sessions",
  },
  {
    src: "/cosmic-guruji-banner.png",
    alt: "Cosmic Guruji — Live sessions and spiritual guidance",
    href: "/live-sessions",
    label: "Explore live sessions",
  },
  {
    src: "/cosmic-guruji-banner@2x.png",
    alt: "Cosmic Guruji — Transform your mind and soul",
    href: "/experts",
    label: "Meet our experts",
  },
];

const AUTOPLAY_MS = 4000;

export default function HeroBannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = heroSlides.length;

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
              <BannerLink slide={slide}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  width={1983}
                  height={793}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className="hero-banner-image block h-auto w-full  cursor-pointer"
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
    </section>
  );
}

function BannerLink({
  slide,
  children,
}: {
  slide: HeroSlide;
  children: ReactNode;
}) {
  const className = "block w-full cursor-pointer";
  const label = slide.label ?? slide.alt;
  const isExternal =
    slide.href.startsWith("http://") || slide.href.startsWith("https://");

  if (isExternal || slide.openInNewTab) {
    return (
      <a
        href={slide.href}
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
    <Link href={slide.href} className={className} aria-label={label}>
      {children}
    </Link>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M10 3.5L5.5 8L10 12.5" : "M6 3.5L10.5 8L6 12.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
