"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { UiSession } from "@/services/sessionsService";

const FALLBACK_AVATAR = "/experts-page/expert-1-cutout.png";

type LiveSessionCardProps = {
  session: UiSession;
};

export default function LiveSessionCard({ session }: LiveSessionCardProps) {
  return (
    <Link href={`/live-sessions/${session.slug}`} className="block">
      <article className="group flex flex-col overflow-hidden rounded-xl border border-[#E8EAF4] bg-white shadow-[0_4px_16px_rgba(26,26,74,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,26,74,0.10)]">
        <div className="relative aspect-[2/1] w-full overflow-hidden bg-gradient-to-br from-[#141432] via-[#1A1A4A] to-[#252560]">
          <Image
            src={session.image}
            alt={session.title}
            fill
            unoptimized
            className="object-contain object-center p-1 transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute left-2 top-2 max-w-[calc(100%-2.75rem)] truncate rounded bg-[#C9A06A] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.1em] text-white">
            {session.category}
          </span>
          <button
            type="button"
            aria-label="Save session"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#1A1A4A] shadow-sm transition hover:bg-white"
          >
            <HeartOutlineIcon />
          </button>
        </div>

        <div className="flex flex-col px-3 pb-2.5 pt-2">
          <h3
            className="line-clamp-2 text-[13px] font-semibold leading-[1.3] text-[#3D3D8F] sm:text-[14px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {session.title}
          </h3>

          <div className="mt-1.5 flex items-center gap-1.5">
            <ExpertAvatar src={session.avatar} alt={session.expert} />
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold text-[#1A1A4A]">
                with {session.expert}
              </p>
              <p className="truncate text-[9px] text-[#8A8AA8]">{session.role}</p>
            </div>
          </div>

          <div className="mt-1.5 flex items-center justify-between gap-2 border-t border-[#E8EAF4] pt-1.5">
            <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1 text-[9px] text-[#5C5C7A] sm:text-[10px]">
              <span className="inline-flex shrink-0 items-center gap-1">
                <CalendarIcon />
                {session.date}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1">
                <ClockSmallIcon />
                {session.time}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1">
                <HourglassIcon />
                {session.duration}
              </span>
            </div>
            <span className="inline-flex shrink-0 items-center rounded-md bg-[#3D3D8F] px-2.5 py-1 text-[10px] font-semibold text-white transition group-hover:bg-[#2F2F70] sm:text-[11px]">
              Book Now →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ExpertAvatar({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_AVATAR);

  useEffect(() => {
    setImgSrc(src || FALLBACK_AVATAR);
  }, [src]);

  return (
    <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-[#EEF0FA] ring-1 ring-white">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        unoptimized
        onError={() => setImgSrc(FALLBACK_AVATAR)}
        className="object-cover object-top"
        sizes="24px"
      />
    </div>
  );
}

function HeartOutlineIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M12 20.5C12 20.5 4.5 14.5 4.5 9.5C4.5 7.2 6.2 5.5 8.5 5.5C10 5.5 11.3 6.3 12 7.5C12.7 6.3 14 5.5 15.5 5.5C17.8 5.5 19.5 7.2 19.5 9.5C19.5 14.5 12 20.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect
        x="5"
        y="6"
        width="14"
        height="13"
        rx="2"
        stroke="#C9A06A"
        strokeWidth="1.6"
      />
      <path
        d="M8 4V7M16 4V7M5 10H19"
        stroke="#C9A06A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockSmallIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="7.5" stroke="#C9A06A" strokeWidth="1.6" />
      <path
        d="M12 8.5V12.5L15 14"
        stroke="#C9A06A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HourglassIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M7 4H17M7 20H17M8 4C8 8 11 10 12 12C13 10 16 8 16 4M8 20C8 16 11 14 12 12C13 14 16 16 16 20"
        stroke="#C9A06A"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
