"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const quickContacts = [
  {
    label: "Call Us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    icon: <PhoneIcon />,
  },
  {
    label: "Email Us",
    value: "support@soulsensei.in",
    href: "mailto:support@soulsensei.in",
    icon: <MailIcon />,
  },
  {
    label: "WhatsApp Us",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
    icon: <WhatsAppIcon />,
  },
];

const contactInfo = [
  {
    title: "Phone",
    value: "+91 98765 43210",
    note: "Mon - Sat: 9:00 AM - 8:00 PM",
    icon: <PhoneIcon />,
  },
  {
    title: "WhatsApp",
    value: "+91 98765 43210",
    note: "Mon - Sat: 9:00 AM - 8:00 PM",
    icon: <WhatsAppIcon />,
  },
  {
    title: "Email",
    value: "support@soulsensei.in",
    note: "We reply within 24 hours",
    icon: <MailIcon />,
  },
  {
    title: "Office Address",
    value: "SoulSensei Wellness Pvt. Ltd.",
    note: "A-42, Sector 62, Noida,\nUttar Pradesh 201301, India",
    icon: <LocationIcon />,
  },
];

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
        <div className="relative mx-auto max-w-[1400px] px-4 pt-12 pb-10 sm:px-6 sm:pt-14 sm:pb-12 lg:px-8 lg:pt-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
            <div className="relative z-10 max-w-[560px]">
              <h1
                className="text-[40px] font-semibold leading-[1.1] text-[#1A1A4A] sm:text-[48px] lg:text-[52px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Contact Us
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

              <p className="mt-5 text-[14px] leading-[1.75] text-[#5C5C7A] sm:text-[15px]">
                We&apos;re here to help you on your journey towards healing,
                growth, and transformation
              </p>

              <div className="mt-8 flex flex-wrap gap-8 sm:gap-10">
                {quickContacts.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex flex-col items-center text-center transition hover:opacity-90"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1A1A4A] shadow-[0_2px_10px_rgba(26,26,74,0.06)] sm:h-16 sm:w-16">
                      {item.icon}
                    </span>
                    <p className="mt-2.5 text-[12px] font-semibold text-[#1A1A4A] sm:text-[13px]">
                      {item.value}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#8A8AA8]">{item.label}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative mx-auto hidden h-[300px] w-full max-w-[480px] bg-transparent lg:block lg:h-[360px] lg:justify-self-end">
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
          <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 py-3 text-[12px] text-[#5C5C7A] sm:px-6 lg:px-8">
            <HomeMiniIcon />
            <Link href="/" className="hover:text-[#1A1A4A]">
              Home
            </Link>
            <span className="text-[#C5C5D5]">&gt;</span>
            <span className="font-medium text-[#1A1A4A]">Contact Us</span>
          </div>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="bg-[#F8F9FC]">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            {/* Form */}
            <div className="rounded-2xl border border-[#E8EAF4] bg-white px-5 py-7 shadow-[0_8px_30px_rgba(26,26,74,0.06)] sm:px-8 sm:py-8">
              <h2
                className="text-[26px] font-semibold text-[#1A1A4A] sm:text-[28px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Send Us a Message
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#5C5C7A] sm:text-[14px]">
                Have a question or need assistance? Fill out the form and our
                team will get back to you.
              </p>

              <form onSubmit={onSubmit} className="mt-7 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
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

                <div className="grid gap-4 sm:grid-cols-2">
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
                    rows={5}
                    placeholder="Write your message here..."
                    className="contact-input min-h-[130px] resize-y"
                  />
                </Field>

                <label className="flex items-start gap-2.5 pt-1 text-[12px] leading-relaxed text-[#5C5C7A] sm:text-[13px]">
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

                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A1A4A] px-6 py-3.5 text-[14px] font-semibold text-white transition hover:bg-[#2A2A6A]"
                >
                  Send Message
                  <ArrowIcon />
                </button>

                <p className="flex items-center justify-center gap-2 pt-1 text-[12px] text-[#5C5C7A]">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E8F6EE] text-[#2F9B63]">
                    <CheckMiniIcon />
                  </span>
                  Your information is safe with us.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div className="rounded-2xl border border-[#E8EAF4] bg-white px-5 py-7 shadow-[0_8px_30px_rgba(26,26,74,0.06)] sm:px-7 sm:py-8">
              <h2
                className="text-[26px] font-semibold text-[#1A1A4A] sm:text-[28px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Contact Information
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#5C5C7A] sm:text-[14px]">
                Reach out to us through any of the following channels.
              </p>

              <div className="mt-7 space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF0FA] text-[#1A1A4A]">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8AA8]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[14px] font-semibold text-[#1A1A4A]">
                        {item.value}
                      </p>
                      <p className="mt-0.5 whitespace-pre-line text-[12px] leading-relaxed text-[#5C5C7A]">
                        {item.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Three info cards */}
          <div className="mt-8 grid gap-5 md:grid-cols-3 lg:mt-10 lg:gap-6">
            {/* Office Hours */}
            <div className="rounded-2xl border border-[#E8EAF4] bg-white px-5 py-6 shadow-[0_6px_24px_rgba(26,26,74,0.05)] sm:px-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1A1A4A] text-white">
                <ClockIcon />
              </span>
              <h3
                className="mt-4 text-[18px] font-semibold text-[#1A1A4A]"
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
            <div className="rounded-2xl border border-[#E8EAF4] bg-white px-5 py-6 shadow-[0_6px_24px_rgba(26,26,74,0.05)] sm:px-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1A1A4A] text-white">
                <PeopleIcon />
              </span>
              <h3
                className="mt-4 text-[18px] font-semibold text-[#1A1A4A]"
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
            <div className="rounded-2xl border border-[#E8EAF4] bg-white px-5 py-6 shadow-[0_6px_24px_rgba(26,26,74,0.05)] sm:px-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1A1A4A] text-white">
                <FaqIcon />
              </span>
              <h3
                className="mt-4 text-[18px] font-semibold text-[#1A1A4A]"
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
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#1A1A4A]/30 px-5 py-2 text-[13px] font-medium text-[#1A1A4A] transition hover:border-[#1A1A4A] hover:bg-[#F4F2FA]"
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
      <span className="mb-1.5 block text-[12px] font-semibold text-[#1A1A4A]">
        {label}
      </span>
      {children}
    </label>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 4.5H7C5.9 4.5 5 5.4 5 6.5V7.5C5 14.4 10.6 20 17.5 20H18.5C19.6 20 20.5 19.1 20.5 18V16.5L17.2 15.4L15.5 17.2C13.2 16 11 13.8 9.8 11.5L11.6 9.8L10.5 6.5H8.5V4.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 7L12 12.5L19.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4.5C7.9 4.5 4.5 7.8 4.5 11.8C4.5 13.2 4.9 14.5 5.6 15.6L4.5 19.5L8.5 18.4C9.6 19 10.8 19.4 12 19.4C16.1 19.4 19.5 16.1 19.5 12C19.5 7.9 16.1 4.5 12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 10.2C9.5 11.6 10.8 13.1 12.4 13.8L13.8 12.6C14 12.4 14.3 12.4 14.5 12.6L16 13.6C16.2 13.8 16.2 14.1 16.1 14.3C15.5 15.2 14.4 15.7 13.2 15.5C10.5 15 8.2 12.6 7.8 9.9C7.7 8.7 8.2 7.6 9.1 7C9.3 6.9 9.6 6.9 9.8 7.1L10.8 8.6C11 8.8 11 9.1 10.8 9.3L9.2 10.2Z"
        fill="currentColor"
      />
    </svg>
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
