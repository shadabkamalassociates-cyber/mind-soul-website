"use client";

import { useState } from "react";
import { VEDIC_FAQS } from "@/components/vedicHealing/content";
import { VedicHeading, VedicSection } from "@/components/vedicHealing/ui";

export default function VedicHealingFAQ() {
  const [openId, setOpenId] = useState<string | null>(VEDIC_FAQS[0].id);

  return (
    <VedicSection id="faq" className="bg-[#F7F4EE]">
      <VedicHeading eyebrow="Questions" title="Frequently Asked Questions" />

      <div className="mx-auto mt-10 max-w-[800px] divide-y divide-[#E8E2D6] overflow-hidden rounded-2xl border border-[#E8E2D6] bg-white">
        {VEDIC_FAQS.map((item) => {
          const open = openId === item.id;
          return (
            <div key={item.id}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
              >
                <span className="text-[15px] font-semibold text-[#1A1A4A]">{item.question}</span>
                <span className="text-[20px] leading-none text-[#C9A06A]" aria-hidden>
                  {open ? "−" : "+"}
                </span>
              </button>
              {open ? (
                <p className="px-5 pb-5 text-[14px] leading-7 text-[#5C5C7A] sm:px-6">{item.answer}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </VedicSection>
  );
}
