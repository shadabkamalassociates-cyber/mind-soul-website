"use client";

import { useState } from "react";

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
    question: "How can SoulSensei help you in your spiritual journey?",
    answer:
      "Through curated live sessions, transformation programs and one-on-one guidance, SoulSensei helps you heal emotional blocks, find clarity and grow with expert support at every step.",
  },
  {
    id: "3",
    question: "Who is a Soul Sensei? How can I interact with them?",
    answer:
      "A Soul Sensei is a verified spiritual guide or healer on our platform. You can explore their profiles, book sessions, and join live interactive experiences with them.",
  },
  {
    id: "4",
    question: "What is a SoulSession? How can I sign up for one?",
    answer:
      "A SoulSession is a live guided experience with an expert. Browse Featured Live Sessions or Meet Our Soul Experts, pick a session, and book instantly to join.",
  },
  {
    id: "5",
    question:
      "Can I access the Live sessions and content shared if I live outside India?",
    answer:
      "Yes. SoulSensei sessions are accessible globally. As long as you have a stable internet connection, you can join live sessions and access shared content from anywhere.",
  },
  {
    id: "6",
    question: "Does SoulSensei have an app?",
    answer:
      "You can access SoulSensei fully on the web today. A dedicated mobile app experience is on the way to make booking and joining sessions even easier.",
  },
  {
    id: "7",
    question: "How do I contact someone from the SoulSensei Team?",
    answer:
      "Reach out through the Contact / Support option on the website, or email our team. We typically respond within 24–48 hours.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("1");

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section id="faq" className="relative w-full bg-[#05070A] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-[90%] sm:w-[70%]">
        <h2
          className="mb-5 text-center text-[24px] font-medium leading-tight text-white sm:mb-6 sm:text-[30px] lg:text-[34px]"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          Frequently Asked Questions
        </h2>

        <div className="faq-panel">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="faq-trigger flex w-full items-center justify-between gap-3 py-3.5 text-left sm:py-4"
                  aria-expanded={isOpen}
                  onClick={() => toggle(item.id)}
                >
                  <span
                    className={`text-[13px] leading-snug sm:text-[15px] ${
                      isOpen ? "font-medium text-[#F0D78C]" : "text-[#E4E4E4]"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`faq-chevron-btn flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    <ChevronDown />
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-3.5 pr-10 text-[12px] leading-[1.65] text-[#A0A0A0] sm:pb-4 sm:text-[13px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M4.5 6.75L9 11.25L13.5 6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
