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

const programLinks = [
  { label: "All Programs", href: "#programs" },
  { label: "7-Day Programs", href: "#programs" },
  { label: "21-Day Programs", href: "#programs" },
  { label: "Masterclasses", href: "#programs" },
  { label: "Workshops", href: "#programs" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "#careers" },
  { label: "Press & Media", href: "#press" },
  { label: "Affiliate Program", href: "#affiliate" },
];

const supportLinks = [
  { label: "Help Center", href: "#help" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "#refund" },
  { label: "Community Guidelines", href: "#guidelines" },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section id="faq" className="relative w-full overflow-hidden bg-[#F4F2FA] py-10 sm:py-12 lg:py-14">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.5fr)_auto] lg:items-center lg:gap-10 xl:gap-12">
          {/* Left — FAQ card */}
          <div className="faq-panel w-full rounded-2xl px-5 py-5 sm:px-6 sm:py-6 lg:max-w-[420px]">
            <h2 className="mb-4 text-[17px] font-semibold text-black sm:text-[18px]">
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
                      <span className="text-[13px] font-medium leading-snug text-black sm:text-[14px]">
                        {item.question}
                      </span>
                      <span
                        className="faq-plus flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#D8D5EA] text-[16px] leading-none font-normal text-black"
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
                        <p className="pb-3.5 pr-2 text-[12px] leading-[1.7] text-[#333333] sm:text-[13px]">
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
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:gap-x-8 xl:gap-x-10">
            <LinkColumn title="Programs" links={programLinks} />
            <LinkColumn title="Company" links={companyLinks} />
            <LinkColumn title="Support" links={supportLinks} />
          </div>

          {/* Right — decorative image */}
          <div className="relative mx-auto hidden h-[200px] w-[180px] shrink-0 lg:mx-0 lg:block xl:h-[220px] xl:w-[200px]">
            <Image
              src="/footer-meditate.png"
              alt="Meditative silhouette with golden mandala"
              fill
              unoptimized
              className="object-contain object-center"
              sizes="200px"
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
      <h3 className="text-[14px] font-semibold text-black sm:text-[15px]">{title}</h3>
      <ul className="mt-3.5 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[12px] text-[#333333] transition hover:text-black sm:text-[13px]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
