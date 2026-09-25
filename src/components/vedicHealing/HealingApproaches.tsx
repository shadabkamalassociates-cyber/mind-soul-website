import { VEDIC_APPROACHES } from "@/components/vedicHealing/content";
import { ApproachIcon } from "@/components/vedicHealing/icons";
import { VedicHeading, VedicSection } from "@/components/vedicHealing/ui";

export default function HealingApproaches() {
  return (
    <VedicSection id="approaches" className="bg-white">
      <VedicHeading
        eyebrow="Practices"
        title="Explore the Path to Inner Balance"
        subtitle="Each path is a way of listening more closely — to breath, sound, energy, and the life you are already living."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VEDIC_APPROACHES.map((item) => (
          <article
            key={item.title}
            className="group flex h-full flex-col rounded-2xl border border-[#E8E2D6] bg-[#FBF9F6] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C9A06A]/50 hover:bg-white hover:shadow-[0_18px_40px_rgba(61,61,143,0.08)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#3D3D8F] shadow-sm ring-1 ring-[#E8E2D6] transition group-hover:bg-[#3D3D8F] group-hover:text-white">
              <ApproachIcon name={item.icon} />
            </span>
            <h3
              className="mt-5 text-[20px] font-medium text-[#1A1A4A]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-[14px] leading-6 text-[#5C5C7A]">{item.description}</p>
            <a
              href="#journey"
              className="mt-5 inline-flex text-[13px] font-semibold text-[#3D3D8F] transition group-hover:text-[#C9A06A]"
            >
              Learn More
              <span aria-hidden className="ml-1 transition group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </article>
        ))}
      </div>
    </VedicSection>
  );
}
