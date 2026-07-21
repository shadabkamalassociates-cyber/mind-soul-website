import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | SoulSensei",
  description: "Read the terms and conditions for using SoulSensei services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      {/* Hero */}
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
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 max-w-[560px] text-[13px] leading-relaxed text-white/85 sm:text-[14px]">
              Please read these terms carefully before using SoulSensei platform
              and services.
            </p>

            <nav className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-white/70">
              <a href="/" className="hover:text-white">
                Home
              </a>
              <ChevronRight />
              <a href="/privacy" className="hover:text-white">
                Legal
              </a>
              <ChevronRight />
              <span className="text-white/95">Terms &amp; Conditions</span>
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
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-white/10 backdrop-blur-[2px]">
                <div className="flex h-full w-full items-center justify-center">
                  <WhiteLotusIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-8">
            {/* Sidebar */}
            <aside className="rounded-2xl bg-[#F4F2FA] px-5 py-5 sm:px-6 sm:py-6">
              <h3 className="text-[15px] font-semibold text-[#3D3D8F]">
                On This Page
              </h3>

              <ul className="mt-4 space-y-2.5">
                {[
                  "1. Introduction",
                  "2. Acceptance of Terms",
                  "3. Definitions",
                  "4. About Mind Soul",
                  "5. Platform Overview",
                  "6. User Eligibility",
                  "7. User Registration",
                  "8. Account Security",
                  "9. Services Offered",
                  "10. Professional Responsibility",
                  "11. Payments & Pricing",
                  "12. Refund & Cancellation",
                  "13. User Responsibilities",
                  "14. Prohibited Activities",
                  "15. Intellectual Property",
                  "16. Disclaimers",
                  "17. Limitation of Liability",
                  "18. Termination",
                  "19. Governing Law",
                  "20. Changes to Terms",
                  "21. Contact Us",
                ].map((item) => {
                  const idx = item.split(".")[0];
                  const label = item.split(".").slice(1).join(".").trim();
                  return (
                    <li key={item}>
                      <a
                        href="#"
                        className="flex items-start gap-3 text-[12px] leading-snug text-[#333333] hover:text-[#1A1A4A]"
                      >
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#E4E2EF] bg-white">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C9A06A]" />
                        </span>
                        <span>
                          <span className="mr-1 font-semibold text-[#3D3D8F]">
                            {idx}.
                          </span>
                          {label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 rounded-xl bg-white p-4 border border-[#E4E2EF]">
                <h4 className="text-[13px] font-semibold text-[#1A1A4A]">
                  Need Help?
                </h4>
                <p className="mt-1 text-[12px] leading-relaxed text-[#5C5C7A]">
                  If you have any questions about these Terms, feel free to
                  reach out to us.
                </p>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#3D3D8F] bg-white py-2.5 text-[12px] font-semibold text-[#3D3D8F] transition hover:bg-[#3D3D8F] hover:text-white"
                >
                  Contact Support <ArrowRight />
                </button>
              </div>
            </aside>

            {/* Main */}
            <div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-[#E4E2EF] bg-white px-6 py-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F2FA] text-[#3D3D8F]">
                      <CalendarIcon />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3D3D8F]">
                        Effective Date: 28 May 2025
                      </p>
                      <p className="mt-2 text-[12px] leading-relaxed text-[#5C5C7A]">
                        This Effective Date applies to all terms contained in
                        this page.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E4E2EF] bg-white px-6 py-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F2FA] text-[#3D3D8F]">
                      <InfoIcon />
                    </span>
                    <p className="text-[12px] leading-relaxed text-[#5C5C7A]">
                      By using Mind Soul, you agree to be bound by these Terms
                      &amp; Conditions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-6 text-[14px] leading-[1.8] text-[#2A2A3A]">
                <Section
                  num={1}
                  title="Introduction"
                  body={`These Terms & Conditions ("Terms") govern your access to and use of the Mind Soul website, mobile application, and related services. By accessing or using Mind Soul, you agree to be bound by these Terms, together with our Privacy Policy, Refund Policy, and any service-specific terms that may be applicable on the platform.`}
                />
                <Section
                  num={2}
                  title="Acceptance of Terms"
                  body={`By using Mind Soul, you confirm that you are legally capable of entering into a binding agreement under applicable law, or that you are using the platform under the supervision and consent of a parent or guardian. If you do not agree to these Terms, you must immediately stop using the platform.`}
                />
                <Section
                  num={3}
                  title="Definitions"
                  body={`For purposes of these Terms, "Mind Soul" means the platform, brand, software, services, tools, interfaces, content, and related features available by the company. "User" means any person who visits, accesses, registers, or uses Mind Soul, whether through a guest, registered member, or purchasing customer.`}
                />
                <Section
                  num={4}
                  title="About Mind Soul"
                  body={`Mind Soul operates as an online marketplace and technology layer connecting users with independent wellness professionals. The platform is intended to support emotional wellbeing, self-development, and informed choice. While Mind Soul offers independent service guidance, the ultimate decisions remain with the user.`}
                />
                <Section
                  num={5}
                  title="Platform Overview"
                  body={`The platform may allow users to browse service categories, filter professionals by expertise, read descriptions, check availability, compare pricing, book therapy sessions, join online counseling calls, and make payments. Mind Soul aims to support secure payments.`}
                />
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E4E2EF] bg-white px-7 py-3 text-[13px] font-semibold text-[#3D3D8F] hover:bg-[#F4F2FA]"
                >
                  Read Full Terms &amp; Conditions <ChevronDown />
                </button>
              </div>

              {/* CTA Banner */}
              <div className="mt-10 rounded-2xl bg-[#1A1A4A] px-6 py-8 sm:px-8 sm:py-10">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A06A]">
                      <GoldLotusIcon />
                    </div>
                    <div className="text-left">
                      <h3
                        className="text-[18px] font-semibold leading-tight text-white sm:text-[20px]"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      >
                        Your Well-being Matters to Us
                      </h3>
                      <p className="mt-2 max-w-[420px] text-[13px] leading-relaxed text-white/85">
                        Mind Soul is here to support your journey towards
                        healing, growth, and inner peace.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/#book"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E8C69F] via-[#C9A06A] to-[#A67C4A] px-7 py-3 text-[14px] font-semibold text-[#1A1A4A] shadow-[0_10px_30px_rgba(201,160,106,0.25)] transition hover:brightness-105"
                  >
                    Book a Session Now <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Section({ num, title, body }: { num: number; title: string; body: string }) {
  return (
    <section className="flex gap-4">
      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F2FA] text-[13px] font-semibold text-[#1A1A4A]">
        {num}
      </div>
      <div>
        <h3 className="text-[15px] font-semibold text-[#3D3D8F]">{title}</h3>
        <p className="mt-2">{body}</p>
      </div>
    </section>
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

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4.5 6.2L8 9.8L11.5 6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8H12.2M9.3 4.8L12.2 8L9.3 11.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="6" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4V7M16 4V7M5 10H19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 10.5V16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="7.7" r="1" fill="currentColor" />
    </svg>
  );
}

function GoldLotusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#C9A06A]">
      <path
        d="M12 7C10.5 9 8.5 9.5 7 8.5C8 11 10 12.5 12 13.5C14 12.5 16 11 17 8.5C15.5 9.5 13.5 9 12 7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 13.5V18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function WhiteLotusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-white">
      <path
        d="M12 7C10.5 9 8.5 9.5 7 8.5C8 11 10 12.5 12 13.5C14 12.5 16 11 17 8.5C15.5 9.5 13.5 9 12 7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 13.5V18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
