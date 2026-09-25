import Link from "next/link";
import { primaryButtonClass, secondaryButtonClass } from "@/components/vedicHealing/ui";

export default function VedicHealingCTA() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#3D3D8F] via-[#2A2A6A] to-[#1A1A4A] px-6 py-14 text-center sm:px-10 sm:py-16">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#C9A06A]/20 blur-2xl"
          aria-hidden
        />
        <h2
          className="relative text-[32px] font-medium leading-tight text-white sm:text-[44px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Begin Your Journey Within
        </h2>
        <p className="relative mx-auto mt-4 max-w-[560px] text-[15px] leading-7 text-white/80 sm:text-[16px]">
          Take a moment for yourself. Explore ancient wisdom, reconnect with your inner balance and begin your personalized healing journey.
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/live-sessions" className={`${primaryButtonClass} bg-white text-[#1A1A4A] hover:bg-[#F7F4EE]`}>
            Book a Healing Session
          </Link>
          <a href="#experts" className={`${secondaryButtonClass} border-white/30 bg-transparent text-white hover:bg-white/10`}>
            Explore Our Experts
          </a>
        </div>
      </div>
    </section>
  );
}
