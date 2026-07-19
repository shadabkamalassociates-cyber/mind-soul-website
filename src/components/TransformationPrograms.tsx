import Image from "next/image";

type Program = {
  id: string;
  title: string;
  description: string;
  duration: string;
  glow: string;
  tint: string;
};

const programs: Program[] = [
  {
    id: "1",
    title: "7-Day Mind Detox",
    description: "Reset your mind and release negativity",
    duration: "7 Days Program",
    glow: "rgba(80, 140, 255, 0.55)",
    tint: "hue-rotate(200deg) saturate(1.2)",
  },
  {
    id: "2",
    title: "21-Day Chakra Healing",
    description: "Balance your energy centers deeply",
    duration: "21 Days Program",
    glow: "rgba(160, 90, 255, 0.55)",
    tint: "hue-rotate(260deg) saturate(1.35)",
  },
  {
    id: "3",
    title: "Manifestation Masterclass",
    description: "Attract abundance, clarity & purpose",
    duration: "5 Days Program",
    glow: "rgba(255, 170, 60, 0.5)",
    tint: "hue-rotate(15deg) saturate(1.4) brightness(1.05)",
  },
  {
    id: "4",
    title: "Soul Alignment Program",
    description: "Align with your highest self",
    duration: "14 Days Program",
    glow: "rgba(60, 200, 190, 0.5)",
    tint: "hue-rotate(150deg) saturate(1.25)",
  },
];

const features = [
  "Verified & Experienced Experts",
  "100% Safe & Confidential",
  "Live Interactive Sessions",
  "Personalized Guidance",
  "Trusted by 50,000+ People",
];

export default function TransformationPrograms() {
  return (
    <section id="programs" className="relative w-full bg-[#05070A] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="programs-panel rounded-2xl px-5 py-6 sm:rounded-3xl sm:px-7 sm:py-8 lg:px-9 lg:py-9">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[0.85fr_2.2fr_0.95fr] lg:items-center lg:gap-7 xl:gap-9">
            {/* Left intro */}
            <div className="max-w-sm lg:max-w-none">
              <h2
                className="text-[26px] font-medium leading-[1.15] text-white sm:text-[30px] lg:text-[32px] xl:text-[36px]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Our Transformation
                <br />
                Programs
              </h2>
              <p className="mt-3 text-[13px] leading-[1.65] text-[#A8A8A8] sm:text-[14px]">
                Curated programs to help you heal, grow and manifest your best
                life.
              </p>
              <a
                href="#all-programs"
                className="programs-explore-btn mt-5 inline-flex items-center rounded-lg px-4 py-2.5 text-[13px] font-medium sm:mt-6"
              >
                Explore All Programs
              </a>
            </div>

            {/* Program cards */}
            <div className="program-cards-row flex gap-3 overflow-x-auto pb-1 sm:gap-3.5 lg:overflow-visible lg:pb-0">
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-3.5 sm:gap-4 lg:pl-1">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-[12px] leading-snug text-[#C9A06A] sm:text-[13px]"
                >
                  <CheckBadge />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="program-card group flex w-[150px] shrink-0 flex-col overflow-hidden rounded-xl sm:w-[160px] lg:w-auto lg:min-w-0 lg:flex-1">
      <div className="relative aspect-[3/3.4] w-full overflow-hidden">
        <Image
          src="/hero-meditation.png"
          alt={program.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          style={{ filter: program.tint }}
          sizes="160px"
          quality={80}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${program.glow} 0%, transparent 65%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-[#0a0b10]/50 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col bg-[#0a0b10] px-2.5 pb-3 pt-2.5 sm:px-3 sm:pb-3.5">
        <h3 className="text-[12px] font-semibold leading-snug text-white sm:text-[13px]">
          {program.title}
        </h3>
        <p className="mt-1 text-[10px] leading-snug text-[#9A9A9A] sm:text-[11px]">
          {program.description}
        </p>
        <p className="mt-auto pt-2.5 text-[10px] font-medium text-[#D4AF37] sm:text-[11px]">
          {program.duration}
        </p>
      </div>
    </article>
  );
}

function CheckBadge() {
  return (
    <span
      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/70 bg-[#D4AF37]/15"
      aria-hidden
    >
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
        <path
          d="M2 5.2L4.1 7.3L8 2.8"
          stroke="#D4AF37"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
