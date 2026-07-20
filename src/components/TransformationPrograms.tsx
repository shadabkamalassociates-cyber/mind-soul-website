import Image from "next/image";
import { ArrowCircle } from "@/components/Icons";

type Program = {
  id: string;
  title: string;
  description: string;
  duration: string;
  glow: string;
  tint: string;
  image: string;
};

const programs: Program[] = [
  {
    id: "1",
    title: "7-Day Mind Detox",
    description: "Reset your mind and release negativity",
    duration: "7 Days Program",
    glow: "rgba(80, 140, 255, 0.55)",
    tint: "none",
    image: "/programs/program-detox.png",
  },
  {
    id: "2",
    title: "21-Day Chakra Healing",
    description: "Balance your energy centers deeply",
    duration: "21 Days Program",
    glow: "rgba(160, 90, 255, 0.55)",
    tint: "none",
    image: "/programs/program-chakra.png",
  },
  {
    id: "3",
    title: "Manifestation Masterclass",
    description: "Attract abundance, clarity & purpose",
    duration: "5 Days Program",
    glow: "rgba(255, 170, 60, 0.5)",
    tint: "none",
    image: "/programs/program-manifest.png",
  },
  {
    id: "4",
    title: "Soul Alignment Program",
    description: "Align with your highest self",
    duration: "14 Days Program",
    glow: "rgba(60, 200, 190, 0.5)",
    tint: "none",
    image: "/programs/program-alignment.png",
  },
];

const perks = [
  "Unlimited live sessions",
  "Premium experts access",
  "Exclusive workshops",
  "Priority booking",
  "Community access",
];

const workSteps = [
  {
    number: "01",
    icon: "/works/step-1.png",
    title: "Choose Your Expert",
    description: "Select from 300+ verified experts",
  },
  {
    number: "02",
    icon: "/works/step-2.png",
    title: "Select Your Session",
    description: "Pick a session that matches your needs",
  },
  {
    number: "03",
    icon: "/works/step-3.png",
    title: "Join Live Session",
    description: "Connect live and interact with your expert",
  },
  {
    number: "04",
    icon: "/works/step-4.png",
    title: "Begin Transformation",
    description: "Apply learnings and transform your life",
  },
];

const trustStats = [
  { icon: "/works/stat-1.png", value: "50,000+", label: "Lives Transformed" },
  { icon: "/works/stat-2.png", value: "300+", label: "Verified Experts" },
  { icon: "/works/stat-3.png", value: "1M+", label: "Sessions Completed" },
  { icon: "/works/stat-4.png", value: "100+", label: "Countries" },
  { icon: "/works/stat-5.png", value: "4.9", label: "Average Rating" },
];

export default function TransformationPrograms() {
  return (
    <section
      id="programs"
      className="relative w-full bg-[#05070A] py-8 sm:py-9 lg:py-10"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="programs-panel relative overflow-hidden rounded-2xl px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-6">
          <div className="pointer-events-none absolute -left-28 -bottom-24 h-[320px] w-[320px] opacity-[0.16]">
            <Image src="/bg-mandala.png" alt="" fill className="object-contain object-left" sizes="320px" quality={80} />
          </div>
          <div className="relative z-10">
          {/* Header — matches 1st sc */}
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-[520px]">
              <h2
                className="text-[28px] font-medium leading-[1.1] text-white sm:text-[32px] lg:text-[36px]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Our Transformation Programs
              </h2>
              <p className="mt-2 text-[13px] leading-[1.55] text-[#8F929D] sm:text-[14px]">
                Curated programs to help you heal, grow and manifest your best
                life.
              </p>
            </div>

            <a
              href="#all-programs"
              className="mt-1 hidden items-center gap-2 text-[13px] font-medium text-[#C8C8C8] transition hover:text-[#E8C69F] sm:flex"
            >
              <span>View All Programs</span>
              <ArrowCircle className="h-[20px] w-[20px] text-[#E8C69F]" />
            </a>
          </div>

          {/* Full-width cards row — no empty right space */}
          <div className="program-cards-row mt-5 flex gap-3 overflow-x-auto pb-1 lg:gap-3.5 lg:overflow-visible lg:pb-0">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
            <MembershipCard />
          </div>
          </div>
        </div>

        <HowSoulSenseiWorks />
      </div>
    </section>
  );
}

function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="program-card group relative flex w-[168px] shrink-0 flex-col overflow-hidden rounded-xl sm:w-[180px] lg:w-auto lg:min-w-0 lg:flex-1">
      <div className="relative aspect-[3/3.35] w-full overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 180px, 18vw"
          quality={95}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 38%, ${program.glow} 0%, transparent 65%)`,
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-[#0a0b10]/50 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col bg-[#0a0b10] px-3 pb-3 pt-2.5">
        <h3 className="text-[14px] font-semibold leading-[1.2] text-white sm:text-[15px]">
          {program.title}
        </h3>
        <p className="mt-1 text-[11px] leading-[1.4] text-[#9A9A9A] sm:text-[12px]">
          {program.description}
        </p>
        <p className="mt-auto pt-2.5 text-[11px] font-medium text-[#D4AF37] sm:text-[12px]">
          {program.duration}
        </p>
      </div>
    </article>
  );
}

function MembershipCard() {
  return (
    <aside className="program-card relative flex w-[280px] shrink-0 overflow-hidden rounded-xl bg-[#0a0b10] sm:w-[300px] lg:w-auto lg:min-w-0 lg:flex-[1.65]">
      <div className="relative min-h-[220px] w-full flex-1 sm:min-h-[240px]">
        <Image
          src="/programs/program-plus.png"
          alt="SoulSensei Plus"
          fill
          className="object-cover object-[82%_center]"
          sizes="(max-width: 1024px) 300px, 28vw"
          quality={95}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0d0a12] via-[#0d0a12]/90 via-50% to-[#0d0a12]/20" />

        <div className="relative z-10 flex h-full flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
          <h3 className="max-w-[160px] text-[15px] font-semibold leading-[1.2] text-[#D4AF37] sm:text-[16px]">
            Become a SoulSensei Plus
          </h3>

          <ul className="mt-4 flex flex-col gap-2">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 text-[12px] text-[#B0B0B0] sm:text-[13px]"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/10">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2 5.2L4.1 7.3L8 2.8"
                      stroke="#D4AF37"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-auto w-fit rounded-lg bg-gradient-to-r from-[#F0D78C] via-[#D4AF37] to-[#C18A4C] px-5 py-2.5 text-[13px] font-semibold text-[#1a1208] hover:brightness-[1.05]"
          >
            Join Membership
          </button>
        </div>
      </div>
    </aside>
  );
}

function HowSoulSenseiWorks() {
  return (
    <div className="works-panel relative mt-5 overflow-hidden rounded-2xl">
      {/* Full mandala background for How SoulSensei Works */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/bg-mandala.png"
          alt=""
          fill
          className="object-cover object-left opacity-[0.55]"
          sizes="1400px"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070A]/55 via-[#05070A]/75 to-[#05070A]/92" />
      </div>

      <div className="relative z-10 px-5 pt-5 pb-4 sm:px-6 lg:px-7 lg:pt-6">
        <h3
          className="text-[24px] font-medium leading-none text-white sm:text-[28px]"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          How SoulSensei Works
        </h3>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {workSteps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex items-start gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="shrink-0">
                    <p className="text-[12px] font-semibold tracking-[0.18em] text-[#D4AF37]">
                      {step.number}
                    </p>
                    <div className="relative mt-2 h-[52px] w-[52px]">
                      <Image
                        src={step.icon}
                        alt=""
                        fill
                        className="object-contain"
                        sizes="46px"
                        quality={95}
                      />
                    </div>
                  </div>

                  <div className="pt-[18px]">
                    <h4 className="text-[15px] font-semibold leading-tight text-white">
                      {step.title}
                    </h4>
                    <p className="mt-1 max-w-[165px] text-[12px] leading-[1.45] text-[#9DA0A8]">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < workSteps.length - 1 ? (
                  <div className="works-connector mt-[25px] hidden lg:flex" aria-hidden>
                    <span className="works-connector-line" />
                    <span className="works-connector-arrow">→</span>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="works-trust-row relative z-10 px-5 py-4 sm:px-6 lg:px-7">
        <div className="works-trust-title-row">
          <span className="works-trust-line" />
          <span className="works-trust-title">TRUSTED BY SOULS WORLDWIDE</span>
          <span className="works-trust-line" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
          {trustStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2.5">
              <div className="relative h-[22px] w-[22px] shrink-0">
                <Image
                  src={stat.icon}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="22px"
                  quality={95}
                />
              </div>
              <div>
                <p className="text-[20px] font-semibold leading-none text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] leading-none text-[#8F929D]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
