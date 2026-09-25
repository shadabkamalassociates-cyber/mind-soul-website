import Image from "next/image";
import { StarIcon } from "@/components/Icons";
import { VEDIC_TESTIMONIALS } from "@/components/vedicHealing/content";
import { VedicHeading, VedicSection } from "@/components/vedicHealing/ui";

export default function VedicHealingTestimonials() {
  return (
    <VedicSection className="bg-white">
      <VedicHeading
        eyebrow="Community"
        title="Stories From Our Community"
        subtitle="Reflections from people who have sat with these practices. Experiences vary, and these words are not a promise of a particular result."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {VEDIC_TESTIMONIALS.map((item) => (
          <article
            key={item.name}
            className="flex h-full flex-col rounded-2xl border border-[#E8E2D6] bg-[#FBF9F6] p-6"
          >
            <div className="flex gap-1 text-[#C9A06A]">
              {Array.from({ length: item.rating }).map((_, index) => (
                <StarIcon key={index} />
              ))}
            </div>
            <p className="mt-4 flex-1 text-[14px] leading-7 text-[#3D3D8F]">“{item.text}”</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full">
                <Image src={item.image} alt="" fill className="object-cover object-top" sizes="44px" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#1A1A4A]">{item.name}</p>
                <p className="text-[12px] text-[#8A8AA8]">{item.place}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </VedicSection>
  );
}
