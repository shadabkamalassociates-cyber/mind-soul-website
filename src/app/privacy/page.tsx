import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Cosmicguruji",
  description: "Read how Cosmicguruji collects, uses, and protects your personal information.",
};

const sections = [
  {
    num: 1,
    title: "Introduction",
    body: "This Privacy Policy explains how Cosmicguruji collects, uses, stores, and protects your personal information when you use our website, mobile experiences, and related services.",
  },
  {
    num: 2,
    title: "Information We Collect",
    body: "We may collect information you provide directly, such as your name, email address, phone number, account details, booking information, and payment-related metadata. We may also collect technical data such as device type, browser, IP address, and usage analytics.",
  },
  {
    num: 3,
    title: "How We Use Information",
    body: "We use your information to create and manage accounts, process bookings and payments, connect you with experts, provide customer support, improve platform performance, send service-related communications, and maintain platform security.",
  },
  {
    num: 4,
    title: "Sharing of Information",
    body: "We may share limited information with verified experts to deliver booked services, with payment processors to complete transactions, and with service providers who help us operate the platform. We do not sell your personal information.",
  },
  {
    num: 5,
    title: "Data Security",
    body: "We use reasonable administrative, technical, and organizational safeguards to protect personal information. However, no online system can be guaranteed to be completely secure.",
  },
  {
    num: 6,
    title: "Your Choices",
    body: "You may update account details, request support regarding your data, or stop using the platform at any time. Where applicable, you may also request correction or deletion of certain personal information.",
  },
  {
    num: 7,
    title: "Contact Us",
    body: "If you have questions about this Privacy Policy or how your data is handled, please contact us through the Contact page on Cosmicguruji.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      <section className="relative overflow-hidden bg-[#1A1A4A] pt-14 pb-10 sm:pt-16 sm:pb-14 lg:pt-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_70%_20%,rgba(201,160,106,0.18),transparent_55%)]" />
        </div>

        <div className="relative mx-auto flex max-w-[1400px] flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="max-w-[640px]">
            <div className="flex items-center gap-3">
              <div className="h-[6px] w-[6px] rounded-full bg-[#C9A06A]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                Legal
              </p>
            </div>

            <h1
              className="mt-3 text-[40px] font-semibold leading-[1.1] text-white sm:text-[48px] lg:text-[56px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Privacy Policy
            </h1>
            <p className="mt-3 max-w-[560px] text-[13px] leading-relaxed text-white/85 sm:text-[14px]">
              Learn how we collect, use, and protect your personal information on
              Cosmicguruji.
            </p>

            <nav className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight />
              <span className="text-white/95">Privacy Policy</span>
            </nav>
          </div>

          <div className="relative hidden h-[250px] w-[420px] lg:block">
            <Image
              src="/bg-mandala.png"
              alt=""
              fill
              unoptimized
              className="object-contain object-right opacity-60"
              sizes="420px"
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="rounded-2xl border border-[#E4E2EF] bg-[#F4F2FA] px-6 py-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3D3D8F]">
              Effective Date: 29 July 2026
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#5C5C7A]">
              By using Cosmicguruji, you agree to the practices described in this
              Privacy Policy.
            </p>
          </div>

          <div className="mt-8 space-y-6 text-[14px] leading-[1.8] text-[#2A2A3A]">
            {sections.map((section) => (
              <section key={section.num} className="flex gap-4">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F2FA] text-[13px] font-semibold text-[#1A1A4A]">
                  {section.num}
                </div>
                <div>
                  <h2 className="text-[15px] font-semibold text-[#3D3D8F]">
                    {section.title}
                  </h2>
                  <p className="mt-2">{section.body}</p>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 rounded-full border border-[#E4E2EF] bg-white px-6 py-3 text-[13px] font-semibold text-[#3D3D8F] hover:bg-[#F4F2FA]"
            >
              Read Terms & Conditions
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E8C69F] via-[#C9A06A] to-[#A67C4A] px-6 py-3 text-[13px] font-semibold text-[#1A1A4A]"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
