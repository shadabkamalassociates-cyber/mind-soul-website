import { VEDIC_STEPS } from "@/components/vedicHealing/content";
import { VedicHeading, VedicSection } from "@/components/vedicHealing/ui";

export default function HealingJourney() {
  return (
    <VedicSection id="journey" className="bg-[#F7F4EE]">
      <VedicHeading
        eyebrow="How it works"
        title="Your Healing Journey"
        subtitle="A clear path from the first conversation to practices you can keep."
      />

      <ol className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {VEDIC_STEPS.map((item) => (
          <li
            key={item.step}
            className="rounded-2xl border border-[#E8E2D6] bg-white p-6 shadow-[0_8px_24px_rgba(26,26,74,0.04)]"
          >
            <p
              className="text-[28px] font-medium text-[#C9A06A]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {item.step}
            </p>
            <h3 className="mt-3 text-[18px] font-semibold text-[#1A1A4A]">{item.title}</h3>
            <p className="mt-2 text-[14px] leading-6 text-[#5C5C7A]">{item.description}</p>
          </li>
        ))}
      </ol>
    </VedicSection>
  );
}
