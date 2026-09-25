import { VEDIC_REASONS } from "@/components/vedicHealing/content";
import { VedicHeading, VedicSection } from "@/components/vedicHealing/ui";

export default function WhyVedicHealing() {
  return (
    <VedicSection className="bg-white">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <VedicHeading
          align="left"
          eyebrow="Why begin"
          title="Why Begin Your Vedic Healing Journey?"
          subtitle="These practices are offered as supportive wellness guidance. They are not a promise of cure, and they do not replace medical care."
        />

        <ul className="grid gap-3 sm:grid-cols-2">
          {VEDIC_REASONS.map((reason) => (
            <li
              key={reason}
              className="flex items-start gap-3 rounded-2xl border border-[#E8E2D6] bg-[#FBF9F6] px-4 py-4"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C9A06A]/15 text-[#8A6A32]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 12.5 10 16.5 18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[14px] font-medium leading-6 text-[#1A1A4A]">{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </VedicSection>
  );
}
