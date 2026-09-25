import Image from "next/image";
import { VedicSection } from "@/components/vedicHealing/ui";

export default function VedicHealingIntro() {
  return (
    <VedicSection id="introduction" className="bg-white">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[28px] border border-[#E8E2D6] bg-[#F7F4EE] shadow-[0_16px_40px_rgba(26,26,74,0.08)]">
            <Image
              src="/just99/hero-portrait.png"
              alt="Meditation beside still water, with a lotus of light"
              width={900}
              height={900}
              className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[480px]"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C9A06A]">
            The tradition
          </p>
          <h2
            className="mt-3 text-[30px] font-medium leading-[1.15] text-[#1A1A4A] sm:text-[38px] lg:text-[44px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Ancient Wisdom. Personalized Healing.
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-[#5C5C7A] sm:text-[16px]">
            Vedic healing is rooted in ancient Indian wisdom. It looks at the person as a whole — mind, body, emotions, and energy — and seeks a quieter, more balanced relationship between them.
          </p>
          <p className="mt-4 text-[15px] leading-7 text-[#5C5C7A] sm:text-[16px]">
            No two people arrive with the same story. Healing is personalized because your experiences, needs, and patterns are your own. A session is shaped around what you are living now, not a fixed script.
          </p>
        </div>
      </div>
    </VedicSection>
  );
}
