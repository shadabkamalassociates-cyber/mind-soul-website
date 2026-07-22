"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLiveSession } from "@/data/liveSessions";

const upsells = [
  {
    title: "Detailed Kundli Report",
    desc: "Complete birth chart analysis with remedies.",
    price: "₹599",
    icon: <ChartIcon />,
  },
  {
    title: "Gemstone Recommendation",
    desc: "Personalized gemstone guidance for you.",
    price: "₹399",
    icon: <GemIcon />,
  },
  {
    title: "Puja & Remedy Kit",
    desc: "Sacred items and rituals for balance.",
    price: "₹799",
    icon: <LampIcon />,
  },
];

const whyBook = [
  "Verified & Experienced Astrologers",
  "Private 1-on-1 Live Sessions",
  "100% Confidential & Secure",
  "Instant Booking & Confirmation",
  "Money Back Guarantee*",
];

const trustBadges = [
  { label: "100% Secure Payments", icon: <ShieldIcon /> },
  { label: "24/7 Customer Support", icon: <HeadsetIcon /> },
  { label: "Privacy Protected", icon: <LockIcon /> },
  { label: "Trusted by Thousands", icon: <UsersIcon /> },
];

function parsePrice(price: string): number {
  return Number(price.replace(/[^\d]/g, "")) || 0;
}

function formatInr(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function CartPage({ sessionSlug }: { sessionSlug?: string }) {
  const session =
    (sessionSlug ? getLiveSession(sessionSlug) : undefined) ??
    getLiveSession("2024-astrology-predictions-remedies");

  const [qty, setQty] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [removed, setRemoved] = useState(false);

  const unit = session ? parsePrice(session.price) : 1499;
  const platformFee = 99;
  const subtotal = removed ? 0 : unit * qty;
  const total = removed ? 0 : subtotal + platformFee;

  const details = useMemo(() => {
    if (!session) return [];
    return [
      { icon: <ClockIcon />, label: "Duration", value: session.duration },
      { icon: <VideoIcon />, label: "Consultation Type", value: "Video Call" },
      { icon: <GlobeIcon />, label: "Language", value: session.languages },
      { icon: <UserIcon />, label: "Astrologer", value: session.expert },
      { icon: <CalendarIcon />, label: "Date", value: session.date },
      { icon: <ClockIcon />, label: "Time", value: session.time },
    ];
  }, [session]);

  if (!session) {
    return (
      <main className="min-h-screen bg-[#F8F9FC]">
        <Header />
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold text-[#3D3D8F]">Cart is empty</h1>
          <Link href="/live-sessions" className="mt-4 inline-block text-[#3D3D8F]">
            Browse Live Sessions →
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F9FC] text-[#1A1A4A]">
      <Header />

      <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Title */}
        <div className="text-center">
          <h1
            className="text-[34px] font-semibold text-[#3D3D8F] sm:text-[40px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Your Cart
          </h1>
          <p className="mt-2 text-[13px] text-[#5C5C7A] sm:text-[14px]">
            Review your session details and proceed to secure checkout.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#C9A06A]/70 sm:w-24" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#C9A06A]" />
            <span className="h-px w-16 bg-[#C9A06A]/70 sm:w-24" />
          </div>
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-[1fr_360px] lg:gap-8">
          {/* Left */}
          <div className="space-y-6">
            {/* Selected session */}
            <div className="rounded-2xl border border-[#E8EAF4] bg-white p-5 shadow-[0_6px_24px_rgba(26,26,74,0.05)] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-[16px] font-semibold text-[#3D3D8F] sm:text-[17px]">
                  Your Selected Session
                </h2>
                <Link
                  href={`/live-sessions/${session.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8DAE8] bg-white px-3 py-1.5 text-[12px] font-medium text-[#1A1A4A] transition hover:border-[#3D3D8F]/40"
                >
                  <EditIcon /> Edit Session
                </Link>
              </div>

              {!removed ? (
                <>
                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:gap-5">
                    <div className="relative h-[120px] w-full shrink-0 overflow-hidden rounded-xl sm:h-[140px] sm:w-[140px]">
                      <Image
                        src={session.image}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="140px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[16px] font-semibold text-[#3D3D8F] sm:text-[17px]">
                          {session.title}
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#3D3D8F] px-2 py-0.5 text-[10px] font-semibold text-white">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#7CF0A8]" />
                          Live
                        </span>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {details.map((d) => (
                          <li
                            key={d.label}
                            className="flex items-start gap-2 text-[12px] text-[#5C5C7A] sm:text-[13px]"
                          >
                            <span className="mt-0.5 text-[#3D3D8F]">{d.icon}</span>
                            <span>
                              <span className="font-medium text-[#1A1A4A]">{d.label}:</span>{" "}
                              {d.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8EAF4] pt-4">
                    <p className="text-[22px] font-semibold text-[#1A1A4A]">
                      {formatInr(unit)}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center overflow-hidden rounded-lg border border-[#D8DAE8]">
                        <button
                          type="button"
                          aria-label="Decrease"
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          className="px-3 py-2 text-[#1A1A4A] hover:bg-[#F4F2FA]"
                        >
                          −
                        </button>
                        <span className="min-w-[28px] text-center text-[13px] font-semibold">
                          {qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase"
                          onClick={() => setQty((q) => q + 1)}
                          className="px-3 py-2 text-[#1A1A4A] hover:bg-[#F4F2FA]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove"
                        onClick={() => setRemoved(true)}
                        className="rounded-lg p-2 text-[#1A1A4A] hover:bg-[#F4F2FA]"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-6 py-8 text-center">
                  <p className="text-[14px] text-[#5C5C7A]">Your cart is empty.</p>
                  <Link
                    href="/live-sessions"
                    className="mt-3 inline-flex text-[13px] font-semibold text-[#3D3D8F]"
                  >
                    Browse Live Sessions →
                  </Link>
                </div>
              )}
            </div>

            {/* Security banner */}
            <div className="relative overflow-hidden rounded-2xl bg-[#1A1A4A] px-5 py-5 sm:px-6">
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[40%] opacity-20">
                <Image
                  src="/live-sessions/astrology-card.png"
                  alt=""
                  fill
                  unoptimized
                  className="object-cover object-right"
                  sizes="280px"
                />
              </div>
              <div className="relative z-10 flex items-start gap-3 sm:items-center sm:gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white">
                  <ShieldIcon />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-white sm:text-[16px]">
                    Secure &amp; Verified Astrologers
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/80 sm:text-[13px]">
                    All our astrologers are experienced, verified and dedicated to
                    providing you the best guidance.
                  </p>
                </div>
              </div>
            </div>

            {/* Upsells */}
            <div>
              <div className="text-center">
                <h2
                  className="text-[22px] font-semibold text-[#3D3D8F] sm:text-[24px]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  You May Also Like
                </h2>
                <div className="mt-3 flex items-center justify-center gap-3">
                  <span className="h-px w-12 bg-[#C9A06A]/70" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-[#C9A06A]" />
                  <span className="h-px w-12 bg-[#C9A06A]/70" />
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {upsells.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col items-center rounded-2xl border border-[#E8EAF4] bg-white px-4 py-5 text-center shadow-[0_4px_16px_rgba(26,26,74,0.04)]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#3D3D8F] text-[#3D3D8F]">
                      {item.icon}
                    </span>
                    <p className="mt-3 text-[14px] font-semibold text-[#1A1A4A]">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-[#6B6B8A]">
                      {item.desc}
                    </p>
                    <p className="mt-3 text-[15px] font-semibold text-[#1A1A4A]">
                      {item.price}
                    </p>
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center gap-1 rounded-lg border border-[#3D3D8F] px-4 py-1.5 text-[12px] font-semibold text-[#3D3D8F] transition hover:bg-[#3D3D8F] hover:text-white"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {/* Order summary */}
            <div className="rounded-2xl border border-[#E8EAF4] bg-white p-5 shadow-[0_8px_28px_rgba(26,26,74,0.06)] sm:p-6">
              <h2 className="text-[16px] font-semibold text-[#3D3D8F]">Order Summary</h2>

              {!removed && (
                <div className="mt-4 flex items-center gap-3 border-b border-[#E8EAF4] pb-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={session.image}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium text-[#1A1A4A]">
                      {session.title} — {session.duration}
                    </p>
                  </div>
                  <p className="shrink-0 text-[13px] font-semibold text-[#1A1A4A]">
                    {formatInr(subtotal)}
                  </p>
                </div>
              )}

              <div className="mt-4 space-y-2.5 text-[13px]">
                <div className="flex justify-between text-[#5C5C7A]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1A1A4A]">{formatInr(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#5C5C7A]">
                  <span className="inline-flex items-center gap-1">
                    Platform Fee <InfoIcon />
                  </span>
                  <span className="font-medium text-[#1A1A4A]">
                    {removed ? formatInr(0) : formatInr(platformFee)}
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-[#E8EAF4] pt-4">
                <div className="flex items-end justify-between">
                  <span className="text-[14px] font-semibold text-[#1A1A4A]">
                    Total Amount
                  </span>
                  <span className="text-[24px] font-semibold text-[#1A1A4A]">
                    {formatInr(total)}
                  </span>
                </div>
                <p className="mt-1 text-right text-[11px] text-[#8A8AA8]">
                  (Inclusive of all taxes)
                </p>
              </div>
            </div>

            {/* Coupon */}
            <div className="rounded-2xl border border-[#E8EAF4] bg-white p-5 shadow-[0_6px_20px_rgba(26,26,74,0.05)]">
              <p className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1A1A4A]">
                <TicketIcon /> Have a Coupon Code?
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="min-w-0 flex-1 rounded-xl border border-[#E0E2EE] px-3 py-2.5 text-[13px] outline-none focus:border-[#3D3D8F]"
                />
                <button
                  type="button"
                  className="rounded-xl bg-[#3D3D8F] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#2F2F70]"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-[#E8EAF4] bg-white p-5 shadow-[0_6px_20px_rgba(26,26,74,0.05)]">
              <button
                type="button"
                disabled={removed}
                className="inline-flex w-full flex-col items-center justify-center rounded-xl bg-[#3D3D8F] px-5 py-3.5 text-white transition hover:bg-[#2F2F70] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="inline-flex items-center gap-2 text-[14px] font-semibold">
                  <LockIcon /> Proceed to Payment
                </span>
                <span className="mt-0.5 text-[10px] text-white/70">Secure Checkout</span>
              </button>
              <p className="mt-4 text-center text-[11px] text-[#8A8AA8]">We accept</p>
              <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
                {[
                  { name: "Visa", icon: <VisaIcon /> },
                  { name: "Mastercard", icon: <MastercardIcon /> },
                  { name: "RuPay", icon: <RupayIcon /> },
                  { name: "UPI", icon: <UpiIcon /> },
                  { name: "Paytm", icon: <PaytmIcon /> },
                ].map((p) => (
                  <span
                    key={p.name}
                    title={p.name}
                    className="flex h-8 min-w-[52px] items-center justify-center rounded-md border border-[#E0E2EE] bg-white px-2.5"
                  >
                    {p.icon}
                  </span>
                ))}
              </div>
            </div>

            {/* Why book */}
            <div className="rounded-2xl border border-[#E8EAF4] bg-white p-5 shadow-[0_6px_20px_rgba(26,26,74,0.05)]">
              <h3 className="text-[15px] font-semibold text-[#3D3D8F]">Why Book With Us?</h3>
              <ul className="mt-3 space-y-2.5">
                {whyBook.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[12px] text-[#5C5C7A]">
                    <span className="mt-0.5 text-[#1A1A4A]">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10px] text-[#8A8AA8]">*T&amp;C Apply</p>
            </div>
          </aside>
        </div>

        {/* Trust badges */}
        <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-[#E8EAF4] bg-white px-4 py-6 sm:grid-cols-4 sm:px-6">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF0FA] text-[#1A1A4A]">
                {b.icon}
              </span>
              <p className="text-[11px] font-medium text-[#1A1A4A] sm:text-[12px]">{b.label}</p>
            </div>
          ))}
        </div>

        {/* Help */}
        <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[#E8EAF4] bg-white px-5 py-5 shadow-[0_4px_16px_rgba(26,26,74,0.04)] sm:gap-6 sm:px-8 sm:py-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF0FA] text-[#1A1A4A]">
            <PhoneIcon />
          </span>
          <p className="min-w-0 flex-1 text-[13px] leading-[1.7] tracking-[0.01em] text-[#5C5C7A] sm:text-[14px] sm:leading-[1.75]">
            Need Help? Call or WhatsApp us at{" "}
            <a href="tel:+919876543210" className="font-semibold text-[#1A1A4A]">
              +91 98765 43210
            </a>
            .{" "}
            <span className="text-[#6B6B88]">
              Our support team is available 24/7 to assist you.
            </span>
          </p>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:brightness-105"
          >
            <WhatsAppIcon />
          </a>
        </div>
      </section>

      {/* Branding strip */}
      <section className="relative overflow-hidden bg-[#1A1A4A] py-12 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <Image
            src="/live-sessions/astrology-card.png"
            alt=""
            fill
            unoptimized
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 px-4">
          <p
            className="text-[20px] font-semibold text-[#C9A06A] sm:text-[24px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Guidance • Clarity • Empowerment
          </p>
          <p className="mt-2 text-[13px] text-white/80">
            Your journey to a better tomorrow starts here.
          </p>
        </div>
      </section>

      <Footer />
    </main>
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

function VideoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="7" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14.5 10.5L20 8V16L14.5 13.5V10.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
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

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 19C6 15.8 8.5 14 12 14C15.5 14 18 15.8 18 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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

function EditIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 16.5V20H7.5L18 9.5L14.5 6L4 16.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 7H19M9 7V5H15V7M8 7V19H16V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3L19 6.5V11.5C19 16 15.5 19.5 12 21C8.5 19.5 5 16 5 11.5V6.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19V11M12 19V5M19 19V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GemIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4L18 10L12 20L6 10L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function LampIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 20H15M10 16H14C14 13 16 12 16 9C16 6.8 14.2 5 12 5C9.8 5 8 6.8 8 9C8 12 10 13 10 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#8A8AA8]">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10V16M12 7.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 9V6H21V9C19.5 9 18.5 10 18.5 11.5C18.5 13 19.5 14 21 14V17H3V14C4.5 14 5.5 13 5.5 11.5C5.5 10 4.5 9 3 9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 13V12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="3" y="12" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="17" y="12" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 19C4 15.5 6.2 13.5 9 13.5C11.8 13.5 14 15.5 14 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8.5 4.5H7C5.9 4.5 5 5.4 5 6.5V7.5C5 14.4 10.6 20 17.5 20H18.5C19.6 20 20.5 19.1 20.5 18V16.5L17.2 15.4L15.5 17.2C13.2 16 11 13.8 9.8 11.5L11.6 9.8L10.5 6.5H8.5V4.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3C7.03 3 3 6.9 3 11.7C3 13.3 3.5 14.8 4.3 16.1L3.2 20L7.3 18.9C8.5 19.6 10 20 11.5 20H12C16.97 20 21 16.1 21 11.3C21 6.5 16.97 3 12 3ZM16.6 14.9C16.4 15.4 15.5 15.9 14.9 16C14.4 16.1 13.7 16.1 13.1 15.9C12.7 15.8 12.1 15.6 11.4 15.2C9.3 14.2 7.9 12.1 7.8 11.9C7.7 11.8 6.9 10.7 6.9 9.6C6.9 8.5 7.5 7.9 7.7 7.7C7.9 7.5 8.1 7.5 8.2 7.5H8.6C8.8 7.5 9 7.5 9.1 7.9C9.3 8.4 9.7 9.5 9.8 9.6C9.8 9.7 9.9 9.9 9.8 10.1C9.7 10.3 9.6 10.4 9.5 10.5L9.2 10.8C9.1 10.9 9 11.1 9.1 11.3C9.3 11.6 9.8 12.3 10.4 12.9C11.2 13.6 11.9 13.9 12.2 14C12.4 14.1 12.6 14.1 12.7 14L13.1 13.5C13.2 13.4 13.4 13.3 13.6 13.4C13.8 13.5 14.8 14 15 14.1C15.2 14.2 15.4 14.2 15.4 14.4C15.5 14.5 15.5 15 15.3 15.5H16.6V14.9Z" />
    </svg>
  );
}

function VisaIcon() {
  return (
    <svg width="34" height="12" viewBox="0 0 48 16" aria-hidden>
      <text
        x="0"
        y="12.5"
        fill="#1A1F71"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="13"
        fontWeight="900"
        letterSpacing="1"
        fontStyle="italic"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg width="28" height="18" viewBox="0 0 38 24" aria-hidden>
      <circle cx="14" cy="12" r="8.5" fill="#EB001B" />
      <circle cx="24" cy="12" r="8.5" fill="#F79E1B" />
      <path
        fill="#FF5F00"
        d="M19 5.4c2 1.5 3.3 3.9 3.3 6.6s-1.3 5.1-3.3 6.6c-2-1.5-3.3-3.9-3.3-6.6s1.3-5.1 3.3-6.6z"
      />
    </svg>
  );
}

function RupayIcon() {
  return (
    <svg width="44" height="14" viewBox="0 0 58 18" aria-hidden>
      <text
        x="0"
        y="13"
        fill="#097B3B"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="11.5"
        fontWeight="700"
        letterSpacing="0.4"
      >
        RuPay
      </text>
      <circle cx="49.5" cy="9" r="5.2" fill="#ED6B23" />
      <circle cx="53.5" cy="9" r="5.2" fill="#097B3B" fillOpacity="0.9" />
    </svg>
  );
}

function UpiIcon() {
  return (
    <svg width="38" height="14" viewBox="0 0 50 18" aria-hidden>
      <path fill="#097939" d="M2 1.5h3.4L14.5 16.5H11L2 1.5z" />
      <path fill="#ED752E" d="M12.2 1.5h3.4L25 16.5h-3.5L12.2 1.5z" />
      <text
        x="27"
        y="13.2"
        fill="#1A1A4A"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="11"
        fontWeight="700"
      >
        UPI
      </text>
    </svg>
  );
}

function PaytmIcon() {
  return (
    <svg width="40" height="14" viewBox="0 0 52 18" aria-hidden>
      <text
        x="0"
        y="13.2"
        fill="#00BAF2"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="12"
        fontWeight="800"
        letterSpacing="-0.2"
      >
        paytm
      </text>
    </svg>
  );
}
