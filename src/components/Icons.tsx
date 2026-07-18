import type { ReactNode } from "react";

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="logoGold" x1="0" y1="0" x2="36" y2="36">
          <stop stopColor="#F0D78C" />
          <stop offset="0.5" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#9B754D" />
        </linearGradient>
      </defs>
      <path
        d="M18 4C18 4 10 12.5 10 18.5C10 22.5 13.5 25.5 18 25.5C22.5 25.5 26 22.5 26 18.5C26 12.5 18 4 18 4Z"
        stroke="url(#logoGold)"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M18 8C18 8 13 14 13 18C13 20.8 15.2 23 18 23C20.8 23 23 20.8 23 18C23 14 18 8 18 8Z"
        fill="url(#logoGold)"
        opacity="0.35"
      />
      <path
        d="M18 25.5V31"
        stroke="url(#logoGold)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M12 31H24"
        stroke="url(#logoGold)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="18" cy="17.5" r="2" fill="url(#logoGold)" />
    </svg>
  );
}

export function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function BagIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 8H18L19 21H5L6 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V7C9 5.343 10.343 4 12 4C13.657 4 15 5.343 15 7V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowCircle({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border border-current/40 ${className}`}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M6 0.5L7.53 4.2L11.5 4.55L8.5 7.15L9.4 11L6 9L2.6 11L3.5 7.15L0.5 4.55L4.47 4.2L6 0.5Z" />
    </svg>
  );
}

export function LivesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4.5 9 4.5C10.5 4.5 11.5 5.2 12 6C12.5 5.2 13.5 4.5 15 4.5C17.5 4.5 20 6.5 20 9.5C20 14.5 12 21 12 21Z"
        stroke="#D4AF37"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExpertsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="#D4AF37" strokeWidth="1.4" />
      <circle cx="16" cy="9" r="2.5" stroke="#D4AF37" strokeWidth="1.4" />
      <path
        d="M3.5 19C3.5 16.5 5.5 14.5 9 14.5C12.5 14.5 14.5 16.5 14.5 19"
        stroke="#D4AF37"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M14.5 14.8C15.5 14.6 16.3 14.5 17 14.5C19.8 14.5 21.5 16 21.5 18.2"
        stroke="#D4AF37"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RatingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L14.2 8.5L20 9.2L15.8 13.2L17 19L12 16.2L7 19L8.2 13.2L4 9.2L9.8 8.5L12 3Z"
        stroke="#D4AF37"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CountriesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="#D4AF37" strokeWidth="1.4" />
      <path d="M3.5 12H20.5" stroke="#D4AF37" strokeWidth="1.4" />
      <path
        d="M12 3.5C14.5 6.5 15.5 9.5 15.5 12C15.5 14.5 14.5 17.5 12 20.5C9.5 17.5 8.5 14.5 8.5 12C8.5 9.5 9.5 6.5 12 3.5Z"
        stroke="#D4AF37"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="#D4AF37" strokeWidth="1.3" />
      <rect x="11" y="2" width="5" height="5" rx="1" stroke="#D4AF37" strokeWidth="1.3" />
      <rect x="2" y="11" width="5" height="5" rx="1" stroke="#D4AF37" strokeWidth="1.3" />
      <rect x="11" y="11" width="5" height="5" rx="1" stroke="#D4AF37" strokeWidth="1.3" />
    </svg>
  );
}

/* Category line icons */
const stroke = "#D4AF37";
const sw = 1.3;

export const categoryIcons: Record<string, ReactNode> = {
  Meditation: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 6C14 6 9 11 9 15.5C9 18.5 11.2 20.5 14 20.5C16.8 20.5 19 18.5 19 15.5C19 11 14 6 14 6Z" stroke={stroke} strokeWidth={sw} />
      <path d="M14 20.5V24" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <path d="M10 24H18" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  ),
  Tarot: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="8" y="4" width="12" height="20" rx="1.5" stroke={stroke} strokeWidth={sw} />
      <path d="M14 10L15.5 13.5H19L16.2 15.7L17.2 19.5L14 17.2L10.8 19.5L11.8 15.7L9 13.5H12.5L14 10Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    </svg>
  ),
  Healing: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 5V23M5 14H23" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <circle cx="14" cy="14" r="9" stroke={stroke} strokeWidth={sw} />
    </svg>
  ),
  Astrology: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="5" stroke={stroke} strokeWidth={sw} />
      <path d="M14 3V6M14 22V25M3 14H6M22 14H25M6.5 6.5L8.5 8.5M19.5 19.5L21.5 21.5M21.5 6.5L19.5 8.5M8.5 19.5L6.5 21.5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  ),
  Manifestation: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4L16.5 11H24L18 15.5L20.5 23L14 18.5L7.5 23L10 15.5L4 11H11.5L14 4Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    </svg>
  ),
  Reiki: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 5C14 5 8 12 8 17C8 20.3 10.7 23 14 23C17.3 23 20 20.3 20 17C20 12 14 5 14 5Z" stroke={stroke} strokeWidth={sw} />
      <path d="M11 14H17M14 11V17" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  ),
  Breathwork: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 14C7 10 10 10 14 14C18 18 21 18 24 14" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <path d="M4 19C7 15 10 15 14 19C18 23 21 23 24 19" stroke={stroke} strokeWidth={sw} strokeLinecap="round" opacity="0.6" />
      <path d="M4 9C7 5 10 5 14 9C18 13 21 13 24 9" stroke={stroke} strokeWidth={sw} strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  "Past Life": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="8" stroke={stroke} strokeWidth={sw} />
      <path d="M14 6V14L19 17" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Chakra: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="3" stroke={stroke} strokeWidth={sw} />
      <circle cx="14" cy="14" r="7" stroke={stroke} strokeWidth={sw} opacity="0.7" />
      <circle cx="14" cy="14" r="10.5" stroke={stroke} strokeWidth={sw} opacity="0.4" />
    </svg>
  ),
  Kundalini: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 24C14 24 8 20 8 15C8 11 11 9 14 7C17 9 20 11 20 15C20 20 14 24 14 24Z" stroke={stroke} strokeWidth={sw} />
      <path d="M14 7V4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <circle cx="14" cy="3" r="1.2" fill={stroke} />
    </svg>
  ),
  "Akashic Records": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M7 6H21V22H7V6Z" stroke={stroke} strokeWidth={sw} />
      <path d="M10 10H18M10 14H18M10 18H15" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  ),
};
