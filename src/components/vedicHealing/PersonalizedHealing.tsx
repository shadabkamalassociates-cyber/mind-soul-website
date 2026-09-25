import Image from "next/image";
import Link from "next/link";
import { primaryButtonClass } from "@/components/vedicHealing/ui";

const points = [
  "Self-awareness",
  "Balance",
  "Mindfulness",
  "Personal growth",
  "Emotional wellbeing",
  "Inner connection",
];

export default function PersonalizedHealing() {
  return (
    <section className="relative overflow-hidden bg-[#1A1A4A] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-[28px]">
          <Image
            src="/just99/why-join-chakra.png"
            alt="A seated meditation with a golden energy mandala"
            width={800}
            height={900}
            className="h-[340px] w-full object-cover sm:h-[440px]"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C9A06A]">
            Made for you
          </p>
          <h2
            className="mt-3 text-[30px] font-medium leading-[1.15] text-white sm:text-[40px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Your Healing Journey Is Personal
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-white/75 sm:text-[16px]">
            Every person arrives with a different history, a different pace, and a different hope. Vedic Healing meets that difference. The work is less about following a formula and more about returning to yourself with patience.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {points.map((point) => (
              <li key={point} className="text-[14px] text-white/90">
                <span className="mr-2 text-[#C9A06A]" aria-hidden>
                  ·
                </span>
                {point}
              </li>
            ))}
          </ul>
          <Link href="/live-sessions" className={`${primaryButtonClass} mt-8 bg-white text-[#1A1A4A] hover:bg-[#F7F4EE]`}>
            Begin Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
