"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const quickLinks = [
  { label: "Book a Session", href: "/#book" },
  { label: "Become an Expert", href: "/experts" },
  { label: "View Programs", href: "/#programs" },
  { label: "Membership Plans", href: "/#membership" },
  { label: "Help Center", href: "/#help" },
];

const officeHours = [
  { day: "Monday - Saturday", time: "9:00 AM - 8:00 PM" },
  { day: "Sunday", time: "Closed" },
  { day: "Public Holidays", time: "Limited Hours" },
];

export default function ContactPage() {
  const [agreed, setAgreed] = useState(false);
  const [subject, setSubject] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#EEF0FA]">
        <div className="relative mx-auto max-w-[1400px] px-4 pt-8 pb-6 sm:px-6 sm:pt-9 sm:pb-7 lg:px-8 lg:pt-10 lg:pb-8">
          <div className="grid items-center gap-5 lg:grid-cols-[1fr_0.95fr] lg:gap-8">
            <div className="relative z-10 max-w-[560px]">
              <h1
                className="text-[34px] font-semibold leading-[1.1] text-[#3D3D8F] sm:text-[40px] lg:text-[44px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Contact Us
              </h1>

              <div className="mt-3 flex items-center gap-3">
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

              <p className="mt-3 max-w-[480px] text-[14px] leading-[1.65] text-[#5C5C7A] sm:text-[15px]">
                We&apos;re here to help you on your journey towards healing,
                growth, and transformation
              </p>
            </div>

            <div className="relative mx-auto hidden h-[220px] w-full max-w-[400px] bg-transparent lg:block lg:h-[260px] lg:justify-self-end">
              <Image
                src="/contact-mandala-gold.png"
                alt=""
                fill
                unoptimized
                priority
                className="bg-transparent object-contain object-center"
                sizes="480px"
              />
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="border-y border-[#E0E2F0] bg-[#E8EAF6]">
          <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 py-2.5 text-[12px] text-[#5C5C7A] sm:px-6 lg:px-8">
            <HomeMiniIcon />
            <Link href="/" className="hover:text-[#1A1A4A]">
              Home
            </Link>
            <span className="text-[#C5C5D5]">&gt;</span>
            <span className="font-medium text-[#1A1A4A]">Contact Us</span>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#F8F9FC]">
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-11">
          <div className="mx-auto max-w-[680px]">
            <div className="overflow-hidden rounded-xl border border-[#E8EAF4] bg-white shadow-[0_6px_24px_rgba(26,26,74,0.05)]">
              <div className="h-0.5 bg-gradient-to-r from-[#3D3D8F] via-[#C9A06A] to-[#3D3D8F]" />
              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <div>
                  <h2
                    className="text-[22px] font-semibold text-[#3D3D8F] sm:text-[24px]"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Send Us a Message
                  </h2>
                  <p className="mt-1.5 text-[13px] leading-snug text-[#5C5C7A]">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="contact-form mt-5 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Full Name *">
                    <input
                      required
                      type="text"
                      placeholder="Enter your full name"
                      className="contact-input"
                    />
                  </Field>
                  <Field label="Email Address *">
                    <input
                      required
                      type="email"
                      placeholder="Enter your email"
                      className="contact-input"
                    />
                  </Field>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Phone Number *">
                    <input
                      required
                      type="tel"
                      placeholder="Enter your phone number"
                      className="contact-input"
                    />
                  </Field>
                  <Field label="Subject *">
                    <select
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="contact-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27%3E%3Cpath d=%27M1 1l5 5 5-5%27 stroke=%27%238A8AA8%27 stroke-width=%271.5%27 fill=%27none%27 stroke-linecap=%27round%27/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-9"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      <option value="general">General Inquiry</option>
                      <option value="session">Book a Session</option>
                      <option value="expert">Become an Expert</option>
                      <option value="support">Support</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                </div>

                <Field label="Your Message *">
                  <textarea
                    required
                    rows={3}
                    placeholder="Write your message here..."
                    className="contact-input min-h-[88px] resize-y"
                  />
                </Field>

                <div className="flex flex-col gap-3 pt-0.5 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-start gap-2 text-[12px] leading-snug text-[#5C5C7A]">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#C8CAD8] accent-[#1A1A4A]"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/terms" className="font-medium text-[#1A1A4A] underline-offset-2 hover:underline">
                      Terms &amp; Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-medium text-[#1A1A4A] underline-offset-2 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                <p className="flex shrink-0 items-center gap-1.5 text-[11px] text-[#8A8AA8] sm:text-[12px]">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#E8F6EE] text-[#2F9B63]">
                    <CheckMiniIcon />
                  </span>
                  Your info is safe with us.
                </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#3D3D8F] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#2F2F70]"
                >
                  Send Message
                  <ArrowIcon />
                </button>
              </form>
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="mx-auto mt-8 grid max-w-[1100px] gap-5 md:grid-cols-3 lg:mt-10 lg:gap-6">
            {/* Office Hours */}
            <div className="rounded-2xl border border-[#E8EAF4] bg-white px-5 py-6 shadow-[0_6px_24px_rgba(26,26,74,0.05)] transition hover:border-[#D8DAEA] hover:shadow-[0_8px_28px_rgba(26,26,74,0.08)] sm:px-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3D3D8F] text-white">
                <ClockIcon />
              </span>
              <h3
                className="mt-4 text-[18px] font-semibold text-[#3D3D8F]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Office Hours
              </h3>
              <ul className="mt-4 space-y-2.5">
                {officeHours.map((row) => (
                  <li
                    key={row.day}
                    className="flex items-center justify-between gap-3 text-[13px]"
                  >
                    <span className="text-[#5C5C7A]">{row.day}</span>
                    <span className="font-semibold text-[#1A1A4A]">{row.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[12px] leading-relaxed text-[#8A8AA8]">
                Our support team is available during office hours to assist you.
              </p>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-[#E8EAF4] bg-white px-5 py-6 shadow-[0_6px_24px_rgba(26,26,74,0.05)] transition hover:border-[#D8DAEA] hover:shadow-[0_8px_28px_rgba(26,26,74,0.08)] sm:px-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3D3D8F] text-white">
                <PeopleIcon />
              </span>
              <h3
                className="mt-4 text-[18px] font-semibold text-[#3D3D8F]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between gap-2 text-[13px] text-[#5C5C7A] transition hover:text-[#1A1A4A]"
                    >
                      {link.label}
                      <ChevronRightIcon />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs */}
            <div className="rounded-2xl border border-[#E8EAF4] bg-white px-5 py-6 shadow-[0_6px_24px_rgba(26,26,74,0.05)] transition hover:border-[#D8DAEA] hover:shadow-[0_8px_28px_rgba(26,26,74,0.08)] sm:px-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3D3D8F] text-white">
                <FaqIcon />
              </span>
              <h3
                className="mt-4 text-[18px] font-semibold text-[#3D3D8F]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Frequently Asked Questions
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-[#5C5C7A]">
                Find quick answers to common questions about sessions, bookings,
                and our programs.
              </p>
              <Link
                href="/#faq"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#3D3D8F]/30 px-5 py-2 text-[13px] font-medium text-[#3D3D8F] transition hover:border-[#3D3D8F] hover:bg-[#F4F2FA]"
              >
                View FAQs
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative bg-[#E8EAF0]">
        <div className="relative h-[320px] w-full overflow-hidden sm:h-[380px] lg:h-[420px]">
          <iframe
            title="SoulSensei Office Location"
            src="https://maps.google.com/maps?q=Sector%2062%20Noida&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-[0.95]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="absolute left-4 top-1/2 z-10 w-[min(100%-2rem,320px)] -translate-y-1/2 rounded-2xl border border-[#E8EAF4] bg-white p-5 shadow-[0_12px_40px_rgba(26,26,74,0.14)] sm:left-8 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF0FA] text-[#1A1A4A]">
                <LocationIcon />
              </span>
              <div>
                <p className="text-[14px] font-semibold text-[#1A1A4A]">
                  SoulSensei Wellness Pvt. Ltd.
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-[#5C5C7A]">
                  A-42, Sector 62, Noida,
                  <br />
                  Uttar Pradesh 201301, India
                </p>
                <a
                  href="https://maps.google.com/?q=Sector+62+Noida"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#3D3D8F] hover:underline"
                >
                  View on Google Maps
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#5C5C7A]">
        {label}
      </span>
      {children}
    </label>
  );
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6-5.2 6-10.2A6 6 0 0 0 6 10.8C6 15.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8V12.5L15 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 19C4 15.5 6.2 13.5 9 13.5C11.8 13.5 14 15.5 14 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M14.5 19C14.8 16.5 16 15 18 15C19.2 15 20 15.5 20.5 16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function FaqIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 9.5C8 7.5 9.6 6 12 6C14.2 6 15.8 7.3 15.8 9.2C15.8 11 14.5 11.8 13.2 12.5C12.5 12.9 12 13.4 12 14.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17.5" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M4 2.5L7.5 6L4 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckMiniIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeMiniIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#1A1A4A]">
      <path d="M4 11L12 4L20 11V19C20 19.5 19.5 20 19 20H5C4.5 20 4 19.5 4 19V11Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
