import { VEDIC_PRACTICES } from "@/components/vedicHealing/content";
import { VedicHeading, VedicSection } from "@/components/vedicHealing/ui";

export default function WhatIsVedicHealing() {
  return (
    <VedicSection id="what-is" className="bg-[#F7F4EE]">
      <VedicHeading
        eyebrow="Understanding the practice"
        title="What Is Vedic Healing?"
        subtitle="Vedic traditions developed holistic ways of caring for a person. A session may draw on one or more of these practices, always as wellness guidance — never as a medical treatment."
      />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VEDIC_PRACTICES.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl border border-[#E8E2D6] bg-white p-5 shadow-[0_8px_24px_rgba(26,26,74,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(26,26,74,0.08)]"
          >
            <span className="mb-4 block h-1 w-8 rounded-full bg-[#C9A06A]" aria-hidden />
            <h3 className="text-[16px] font-semibold text-[#1A1A4A]">{item.title}</h3>
            <p className="mt-2 text-[13px] leading-6 text-[#5C5C7A]">{item.description}</p>
          </li>
        ))}
      </ul>
    </VedicSection>
  );
}
