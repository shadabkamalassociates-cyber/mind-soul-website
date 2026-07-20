"use client";

import { useState } from "react";
import Image from "next/image";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    id: "1",
    question: "What is SoulSensei?",
    answer:
      "SoulSensei is India's trusted platform for spiritual growth, healing and self-discovery. We connect you with verified experts for live sessions in meditation, tarot, reiki, astrology and more.",
  },
  {
    id: "2",
    question: "How can SoulSensei help you in your journey?",
    answer:
      "Through curated live sessions, transformation programs and one-on-one guidance, SoulSensei helps you heal emotional blocks, find clarity and grow with expert support at every step.",
  },
  {
    id: "3",
    question: "Is my data and session information safe?",
    answer:
      "Yes. Your privacy is our priority. All session data and personal information are encrypted and handled with strict confidentiality standards.",
  },
  {
    id: "4",
    question: "Can I reschedule my live session?",
    answer:
      "Yes. You can reschedule your live session from your bookings dashboard, subject to the expert's availability and our reschedule policy.",
  },
];

const exploreLinks = [
  { label: "All Categories", href: "#categories" },
  { label: "Soul Experts", href: "#experts" },
  { label: "Live Sessions", href: "#book" },
  { label: "Retreats", href: "#retreats" },
  { label: "Blog", href: "#blog" },
];

const programLinks = [
  { label: "All Programs", href: "#programs" },
  { label: "7-Day Programs", href: "#programs" },
  { label: "21-Day Programs", href: "#programs" },
  { label: "Masterclasses", href: "#programs" },
  { label: "Workshops", href: "#programs" },
];

const companyLinks = [
  { label: "About Us", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Press & Media", href: "#press" },
  { label: "Affiliate Program", href: "#affiliate" },
];

const supportLinks = [
  { label: "Help Center", href: "#help" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Refund Policy", href: "#refund" },
  { label: "Community Guidelines", href: "#guidelines" },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section id="faq" className="relative w-full overflow-hidden bg-[#05070A] py-8 sm:py-10 lg:py-12">
      <div className="pointer-events-none absolute -right-24 top-6 h-[280px] w-[280px] opacity-[0.15]">
        <Image src="/bg-mandala.png" alt="" fill className="object-contain object-right" sizes="280px" quality={80} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.45fr_1.35fr_0.55fr] lg:gap-8 xl:gap-10">
          {/* Left — FAQ card */}
          <div className="faq-panel w-full rounded-2xl px-5 py-5 sm:px-6 sm:py-6">
            <h2 className="mb-3 text-[16px] font-semibold text-white sm:text-[17px]">
              Frequently Asked Questions
            </h2>

            <div>
              {faqs.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`faq-item ${isOpen ? "is-open" : ""}`}
                  >
                    <button
                      type="button"
                      className="faq-trigger flex w-full items-center justify-between gap-3 py-3.5 text-left"
                      aria-expanded={isOpen}
                      onClick={() => toggle(item.id)}
                    >
                      <span className="text-[13px] leading-snug text-[#E8E8E8] sm:text-[14px]">
                        {item.question}
                      </span>
                      <span
                        className="faq-plus shrink-0 text-[18px] leading-none font-light text-[#D4AF37]"
                        aria-hidden
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-3.5 pr-6 text-[12px] leading-[1.65] text-[#A0A0A0] sm:text-[13px]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center — nav columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 sm:gap-x-5 lg:gap-x-6 xl:gap-x-8">
            <LinkColumn title="Explore" links={exploreLinks} />
            <LinkColumn title="Programs" links={programLinks} />
            <LinkColumn title="Company" links={companyLinks} />
            <LinkColumn title="Support" links={supportLinks} />
          </div>

          {/* Right — decorative image */}
          <div className="relative mx-auto hidden h-[220px] w-full max-w-[220px] lg:mx-0 lg:block lg:h-[240px] lg:max-w-none xl:h-[260px]">
            <Image
              src="/footer-meditate.png"
              alt="Meditative silhouette with golden mandala"
              fill
              className="object-contain object-center"
              sizes="220px"
              quality={95}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[14px] font-semibold text-white sm:text-[15px]">{title}</h3>
      <ul className="mt-3.5 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[12px] text-[#D0D0D0] transition hover:text-[#E8C69F] sm:text-[13px]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
