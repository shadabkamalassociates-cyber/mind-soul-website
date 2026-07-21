"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LogoIcon } from "@/components/Icons";

const exploreLinks = [
  { label: "Live Sessions", href: "/#sessions" },
  { label: "Soul Experts", href: "/#experts" },
  { label: "Programs", href: "/#programs" },
  { label: "Membership", href: "/#membership" },
  { label: "Events", href: "/#events" },
  { label: "Blog", href: "/#blog" },
  { label: "Gift Cards", href: "/#gift-cards" },
];

const supportLinks = [
  { label: "Help Center", href: "/#help" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Refund Policy", href: "/#refund" },
];

const programs = [
  {
    title: "7-Day Mind Detox",
    desc: "Reset your mind and release negativity",
  },
  {
    title: "21-Day Chakra Healing",
    desc: "Balance your energy centers deeply",
  },
  {
    title: "Manifestation Masterclass",
    desc: "Attract abundance, clarity & purpose",
  },
  {
    title: "Soul Alignment Program",
    desc: "Align with your highest self",
  },
];

const stats = [
  { icon: <HeartIcon />, label: "50,000+ Lives Transformed" },
  { icon: <MedalIcon />, label: "300+ Verified Experts" },
  { icon: <StarOutlineIcon />, label: "4.9 Average Rating" },
  { icon: <GlobeIcon />, label: "100+ Countries" },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-white pt-8 pb-5 sm:pt-10 lg:pt-12">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Newsletter */}
        <div className="footer-newsletter mb-10 flex flex-col gap-5 rounded-2xl p-5 sm:mb-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6 lg:p-7">
          <div className="flex items-start gap-3.5 sm:items-center sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#3D3D8F] sm:h-14 sm:w-14">
              <LotusWhite />
            </div>
            <div>
              <h3
                className="text-[20px] font-medium leading-tight text-[#1A1A4A] sm:text-[24px] lg:text-[26px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Stay Inspired, Stay Connected
              </h3>
              <p className="mt-1 max-w-md text-[12px] leading-relaxed text-[#5C5C7A] sm:text-[13px]">
                Subscribe to our newsletter and get latest updates, events &amp;
                offers straight to your inbox.
              </p>
            </div>
          </div>

          <form
            className="flex w-full flex-col gap-2.5 sm:max-w-[420px] sm:flex-row sm:items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="footer-email-input h-11 w-full rounded-lg px-4 text-[13px] text-[#1A1A4A] outline-none placeholder:text-[#8A8AA8] sm:flex-1"
              required
            />
            <button
              type="submit"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1A1A4A] px-5 text-[13px] font-semibold whitespace-nowrap text-white transition hover:bg-[#2A2A6A]"
            >
              Subscribe Now
              <ArrowRight />
            </button>
          </form>
        </div>

        {/* Main columns */}
        <div className="grid grid-cols-1 gap-8 border-b border-[#E4E2EF] pb-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6 xl:gap-8">
          {/* Brand */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <LogoIcon className="shrink-0" variant="indigo" />
              <div className="flex flex-col leading-none">
                <span className="text-[20px] font-semibold text-[#1A1A4A]">
                  SoulSensei
                </span>
                <span className="mt-[3px] text-[8.5px] font-medium tracking-[0.2em] text-[#5B5B9A] uppercase">
                  Awaken. Heal. Transform.
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-[12px] leading-[1.7] text-[#5C5C7A] sm:text-[13px]">
              India&apos;s most trusted platform for spiritual growth, healing and
              self-discovery — connecting you with verified experts for real
              transformation.
            </p>
            <div className="mt-5 space-y-2.5 border-t border-[#3D3D8F]/15 pt-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2.5 text-[12px] text-[#1A1A4A] sm:text-[13px]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDEAF8] text-[#3D3D8F]">
                    {s.icon}
                  </span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <FooterHeading>Explore</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer-link group inline-flex items-center gap-1.5 text-[13px]"
                  >
                    {link.label}
                    <ChevronTiny className="opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-3">
            <FooterHeading>Our Programs</FooterHeading>
            <ul className="mt-4 space-y-3.5">
              {programs.map((p) => (
                <li key={p.title}>
                  <Link href="/#programs" className="block transition hover:opacity-90">
                    <p className="text-[13px] font-medium text-[#1A1A4A]">{p.title}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-[#6B6B88]">
                      {p.desc}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#programs"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A]"
            >
              View All Programs
              <ArrowRight />
            </Link>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <FooterHeading>Support</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link text-[13px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow + CTA */}
          <div className="lg:col-span-2">
            <FooterHeading>Follow Us</FooterHeading>
            <p className="mt-3 text-[12px] leading-relaxed text-[#5C5C7A]">
              Join our community and stay connected on social media.
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              <SocialBtn label="Facebook">
                <FacebookIcon />
              </SocialBtn>
              <SocialBtn label="Instagram">
                <InstagramIcon />
              </SocialBtn>
              <SocialBtn label="YouTube">
                <YouTubeIcon />
              </SocialBtn>
              <SocialBtn label="WhatsApp">
                <WhatsAppIcon />
              </SocialBtn>
            </div>

            <div className="footer-cta-card relative mt-6 overflow-hidden rounded-xl p-4">
              <div className="relative z-10 max-w-[70%]">
                <h4
                  className="text-[16px] font-medium leading-snug text-[#1A1A4A]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Begin Your Transformation
                </h4>
                <p className="mt-1 text-[11px] leading-snug text-[#5C5C7A]">
                  Discover peace, purpose, and the real you.
                </p>
                <Link
                  href="/#start"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#1A1A4A] px-3.5 py-2 text-[12px] font-semibold text-white transition hover:bg-[#2A2A6A]"
                >
                  Start Your Journey
                  <ArrowRight />
                </Link>
              </div>
              <div className="pointer-events-none absolute right-[-8px] bottom-[-4px] h-[88px] w-[88px] sm:h-[96px] sm:w-[96px]">
                <Image
                  src="/footer-lotus.png"
                  alt=""
                  fill
                  className="object-contain object-bottom"
                  sizes="96px"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 pt-5 text-[11px] text-[#5C5C7A] sm:flex-row sm:justify-between sm:gap-3 sm:text-[12px]">
          <div className="flex items-center gap-2">
            <LogoIcon className="h-5 w-5 scale-75" variant="indigo" />
            <span>© 2025 SoulSensei. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1.5">
            <LotusTiny />
            <span>
              Made with <span className="text-[#3D3D8F]">💜</span> for your
              transformation
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/privacy"
              className="font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A] hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="text-[#C8C6DC]">|</span>
            <Link
              href="/terms"
              className="font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A] hover:underline"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <LotusTiny />
      <h4
        className="text-[16px] font-medium text-[#1A1A4A] sm:text-[17px]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {children}
      </h4>
    </div>
  );
}

function SocialBtn({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`#${label.toLowerCase()}`}
      aria-label={label}
      className="footer-social flex h-9 w-9 items-center justify-center rounded-full"
    >
      {children}
    </a>
  );
}

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronTiny({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M3.5 2L6.5 5L3.5 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LotusTiny() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 13C8 13 3.5 9.5 3.5 6.5C3.5 4.8 4.8 3.5 6.3 3.5C7.1 3.5 7.7 3.9 8 4.4C8.3 3.9 8.9 3.5 9.7 3.5C11.2 3.5 12.5 4.8 12.5 6.5C12.5 9.5 8 13 8 13Z"
        stroke="#3D3D8F"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <path d="M8 10.5V14" stroke="#3D3D8F" strokeWidth="1.15" strokeLinecap="round" />
    </svg>
  );
}

function LotusWhite() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20C12 20 5 14.5 5 10C5 7.5 7 6 9 6C10.2 6 11.1 6.6 12 7.5C12.9 6.6 13.8 6 15 6C17 6 19 7.5 19 10C19 14.5 12 20 12 20Z"
        stroke="white"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 13.5C8 13.5 2.5 9.5 2.5 5.8C2.5 3.7 4 2.5 5.7 2.5C6.7 2.5 7.5 3 8 3.7C8.5 3 9.3 2.5 10.3 2.5C12 2.5 13.5 3.7 13.5 5.8C13.5 9.5 8 13.5 8 13.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="9.5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M6 6.5L5 2H7.2L8 4.5L8.8 2H11L10 6.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarOutlineIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 2L9.5 6.2L14 6.7L10.8 9.5L11.7 14L8 11.7L4.3 14L5.2 9.5L2 6.7L6.5 6.2L8 2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.5 8H13.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M8 2.5C9.8 4.5 10.5 6.2 10.5 8C10.5 9.8 9.8 11.5 8 13.5C6.2 11.5 5.5 9.8 5.5 8C5.5 6.2 6.2 4.5 8 2.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23 12.2s0-3.4-.4-5c-.2-1-.9-1.7-1.9-1.9C18.7 5 12 5 12 5s-6.7 0-8.7.3c-1 .2-1.7.9-1.9 1.9C1 8.8 1 12.2 1 12.2s0 3.4.4 5c.2 1 .9 1.7 1.9 1.9 2 .3 8.7.3 8.7.3s6.7 0 8.7-.3c1-.2 1.7-.9 1.9-1.9.4-1.6.4-5 .4-5zM9.8 15.5v-6.6l5.7 3.3-5.7 3.3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3A9.9 9.9 0 0012 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm5.2 14.2c-.2.6-1.2 1.1-1.9 1.2-.5.1-1.1.1-1.8-.1-1.1-.3-2.4-.9-3.6-1.9-2.1-1.7-3.5-3.9-3.7-5.7-.1-.8.3-1.7.9-2.1.3-.2.6-.3.9-.3h.7c.2 0 .5 0 .6.5l.9 2.2c.1.2 0 .5-.2.7l-.4.5c-.2.2-.4.4-.2.7.5.8 1.3 1.6 2.1 2.1.3.2.6.1.8-.1l.6-.7c.2-.2.5-.3.7-.2l2.2.9c.4.2.5.4.4.7z" />
    </svg>
  );
}
