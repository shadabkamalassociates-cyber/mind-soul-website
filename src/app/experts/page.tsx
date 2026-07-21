import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const heroFeatures = [
  {
    title: "Verified Experts",
    desc: "Carefully selected & verified",
    icon: <VerifiedIcon />,
  },
  {
    title: "Trusted Guidance",
    desc: "Safe, confidential & ethical sessions",
    icon: <ShieldIcon />,
  },
  {
    title: "Holistic Approach",
    desc: "Mind, body & soul transformation",
    icon: <LotusSmallIcon />,
  },
];

const experts = [
  {
    slug: "dr-ananya-sharma",
    name: "Dr. Ananya Sharma",
    role: "FOUNDER & SPIRITUAL GUIDE",
    experience: "10+ YEARS EXPERIENCE",
    bio: "A renowned spiritual guide helping seekers find inner peace, purpose, and profound transformation.",
    specialization: "Spiritual Guidance",
    experienceDetail: "10+ Years",
    image: "/experts-page/expert-2-cutout.png",
  },
  {
    slug: "dr-kavita-mehta",
    name: "Dr. Kavita Mehta",
    role: "MEDITATION & MINDFULNESS COACH",
    experience: "8+ YEARS EXPERIENCE",
    bio: "Certified meditation coach specializing in mindfulness, stress relief, and emotional balance.",
    specialization: "Meditation & Mindfulness",
    experienceDetail: "8+ Years",
    image: "/experts-page/expert-1-cutout.png",
  },
  {
    slug: "dr-riya-desai",
    name: "Dr. Riya Desai",
    role: "CHAKRA & ENERGY HEALER",
    experience: "12+ YEARS EXPERIENCE",
    bio: "Expert chakra healer dedicated to balancing your energy centers for holistic wellbeing.",
    specialization: "Chakra & Energy Healing",
    experienceDetail: "12+ Years",
    image: "/experts-page/expert-3-cutout.png",
  },
];

const stats = [
  { icon: <StatLotusIcon />, value: "300+", label: "Expert Guides" },
  { icon: <StatLotusIcon />, value: "100+", label: "Healing Practices" },
  { icon: <StatPeopleIcon />, value: "1,00,000+", label: "Happy Seekers" },
  { icon: <StatGlobeIcon />, value: "20+", label: "Countries Served" },
];

export default function ExpertsPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-[1400px] items-center gap-6 px-3 pt-8 pb-10 sm:px-4 lg:grid-cols-[1fr_1.2fr] lg:gap-2 lg:px-5 lg:pt-10 lg:pb-12">
          <div className="relative z-10 max-w-[520px] lg:pl-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A06A]">
              OUR EXPERTS —
            </p>
            <h1
              className="mt-3 text-[34px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A4A] sm:text-[40px] lg:text-[44px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Guided by Experts.
              <br />
              Driven by Purpose.
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-12 bg-[#C9A06A]/60 sm:w-14" />
              <Image
                src="/experts-page/lotus-gold.png"
                alt=""
                width={22}
                height={22}
                unoptimized
                className="opacity-90"
              />
              <span className="h-px w-12 bg-[#C9A06A]/60 sm:w-14" />
            </div>

            <p className="mt-5 text-[14px] leading-[1.75] text-[#5C5C7A] sm:text-[15px]">
              Our team of verified experts is dedicated to guiding you toward
              clarity, healing, and lasting transformation through wisdom,
              compassion, and deep spiritual insight.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-4">
              {heroFeatures.map((feature) => (
                <div key={feature.title} className="flex flex-col gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3D3D8F]/25 text-[#3D3D8F]">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1A1A4A]">
                      {feature.title}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-[#7A7A9A]">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[260px] w-full sm:h-[320px] lg:-mr-2 lg:h-[380px]">
            <Image
              src="/experts-page/hero.png"
              alt="Experts meditating on a mountain at sunrise"
              fill
              className="object-cover object-center lg:object-right"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-white via-white/80 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-white/70 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* Expert Team + Stats */}
      <section className="bg-[#F8F9FC] px-4 py-12 sm:px-5 sm:py-14 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <span className="h-px w-12 bg-[#C9A06A] sm:w-16" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] sm:text-[13px]">
                <span className="text-[#C9A06A]">MEET OUR </span>
                <span className="text-[#1A1A4A]">EXPERT TEAM</span>
              </p>
              <span className="h-px w-12 bg-[#1A1A4A] sm:w-16" />
            </div>
            <h2
              className="mt-4 text-[34px] font-semibold leading-[1.12] text-[#1A1A4A] sm:text-[40px] lg:text-[44px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#1A1A4A" }}
            >
              Experts Who Inspire Transformation
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3 sm:gap-4">
              <span className="h-px w-24 bg-[#C9A06A]/60 sm:w-32" />
              <Image
                src="/experts-page/lotus-gold.png"
                alt=""
                width={30}
                height={30}
                unoptimized
                className="opacity-95"
              />
              <span className="h-px w-24 bg-[#C9A06A]/60 sm:w-32" />
            </div>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {experts.map((expert) => (
              <ExpertCard key={expert.name} expert={expert} />
            ))}
          </div>

          <div className="expert-stats-bar mt-8 grid grid-cols-2 gap-x-6 gap-y-7 rounded-2xl border border-[#E8EAF4] bg-white px-5 py-7 shadow-[0_8px_30px_rgba(30,36,101,0.06)] sm:px-8 sm:py-8 lg:mt-10 lg:grid-cols-4 lg:gap-x-10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3.5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EDEAF8] text-[#1A1A4A] sm:h-[60px] sm:w-[60px]">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[20px] font-semibold leading-none text-[#1E2465] sm:text-[22px]">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[12px] text-[#6B6B8A] sm:text-[13px]">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A4A]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-12 sm:px-8 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-16">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="relative h-[150px] w-[130px] shrink-0 sm:h-[175px] sm:w-[155px] lg:h-[200px] lg:w-[175px]">
              <Image
                src="/experts-page/lotus-gold.png"
                alt=""
                fill
                unoptimized
                className="object-contain opacity-[0.28]"
                sizes="(max-width: 1024px) 130px, 170px"
              />
            </div>

            <div className="text-center lg:text-left">
              <h2
                className="text-[26px] font-semibold leading-tight text-white sm:text-[30px] lg:text-[34px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Ready to Begin Your Journey?
              </h2>
              <p className="mt-3 max-w-[480px] text-[14px] leading-relaxed text-white sm:text-[15px] lg:text-[16px]">
                Connect with our experts and take the first step towards
                clarity, peace, and transformation.
              </p>
            </div>
          </div>

          <Link
            href="/#book"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#E8C69F] via-[#C9A06A] to-[#B8925E] px-7 py-3.5 text-[14px] font-semibold text-[#1A1A4A] shadow-[0_8px_24px_rgba(201,160,106,0.35)] transition hover:brightness-105 sm:px-8 sm:py-4 sm:text-[15px]"
          >
            Connect with an Expert
            <ArrowIcon />
          </Link>
        </div>
      </section>

    </main>
  );
}

type Expert = {
  slug: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  specialization: string;
  experienceDetail: string;
  image: string;
};

function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Link href={`/experts/${expert.slug}`} className="block h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_8px_28px_rgba(26,26,74,0.10)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(26,26,74,0.14)] sm:rounded-[20px]">
        {/* Top — portrait + frame (2nd sc: straight edge, no bulb) */}
        <div className="relative bg-[#F7F6FB] pb-5 pt-3">
          <span className="absolute left-3 top-3 z-20 rounded-[3px] bg-[#1A1A4A] px-2 py-[4px] text-[7px] font-bold uppercase tracking-[0.1em] text-white sm:left-3.5 sm:top-3.5 sm:text-[7.5px]">
            {expert.experience}
          </span>

          <div className="relative mx-auto h-[190px] w-full sm:h-[200px]">
            <Image
              src="/experts-page/frame.png"
              alt=""
              fill
              className="z-0 scale-[1.35] object-contain object-center sm:scale-[1.4]"
              sizes="(max-width: 768px) 90vw, 340px"
            />
            <div className="absolute inset-x-[4%] bottom-0 top-[4%] z-[1]">
              <Image
                src={expert.image}
                alt={expert.name}
                fill
                unoptimized
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 85vw, 320px"
              />
            </div>
          </div>

          {/* Lotus circle sits on the straight join */}
          <div className="absolute bottom-0 left-1/2 z-30 flex h-[34px] w-[34px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border border-[#C9A06A] bg-[#1A1A4A] shadow-[0_3px_10px_rgba(0,0,0,0.22)] sm:h-[36px] sm:w-[36px]">
            <CardLotusIcon />
          </div>
        </div>

        {/* Bottom — compact indigo info */}
        <div className="relative flex flex-1 flex-col bg-[#1A1A4A] px-4 pb-4 pt-6 text-center sm:px-5 sm:pb-5 sm:pt-7">
          <h3
            className="text-[17px] font-semibold leading-tight text-white sm:text-[18px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {expert.name}
          </h3>
          <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#C9A06A] sm:text-[9px]">
            {expert.role}
          </p>
          <p className="mx-auto mt-2.5 line-clamp-3 max-w-[250px] text-[11px] leading-[1.55] text-white/85 sm:text-[11.5px]">
            {expert.bio}
          </p>

          <div className="my-3 flex items-center justify-center gap-2.5">
            <span className="h-px w-12 bg-[#C9A06A]/50" />
            <span className="h-[4px] w-[4px] rotate-45 bg-[#C9A06A]" />
            <span className="h-px w-12 bg-[#C9A06A]/50" />
          </div>

          <div className="mx-auto w-full max-w-[230px] space-y-1.5 text-left">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-[#C9A06A]">
                <MiniLotusIcon />
              </span>
              <p className="text-[11px] leading-snug text-white/90">
                <span className="font-semibold text-[#C9A06A]">Specialization:</span>{" "}
                {expert.specialization}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-[#C9A06A]">
                <CalendarMiniIcon />
              </span>
              <p className="text-[11px] leading-snug text-white/90">
                <span className="font-semibold text-[#C9A06A]">Experience:</span>{" "}
                {expert.experienceDetail}
              </p>
            </div>
          </div>

          <span className="mt-4 inline-flex items-center justify-center gap-1.5 self-center rounded-full border border-white/75 px-5 py-1.5 text-[11px] font-medium text-white transition group-hover:bg-white/10 sm:mt-4 sm:px-5 sm:py-2 sm:text-[12px]">
            View Profile
            <ArrowIcon />
          </span>
        </div>
      </article>
    </Link>
  );
}

function CardLotusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 6.5C10.2 8.8 8 9.4 6.2 8.2C7.4 11.2 9.6 13 12 14.2C14.4 13 16.6 11.2 17.8 8.2C16 9.4 13.8 8.8 12 6.5Z"
        stroke="white"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.2V17.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6 20C6 16.5 8.5 14 12 14C15.5 14 18 16.5 18 20"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M16 5L17.5 7L20 7.5L17.5 8L16 10L14.5 8L12 7.5L14.5 7L16 5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L19 6.5V11.5C19 16 15.5 19.5 12 21C8.5 19.5 5 16 5 11.5V6.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LotusSmallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 8C10 10 8 10 6 9C7 12 9 14 12 15C15 14 17 12 18 9C16 10 14 10 12 8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M12 15V18"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatLotusIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 7C10.5 9 8.5 9.5 7 8.5C8 11 10 12.5 12 13.5C14 12.5 16 11 17 8.5C15.5 9.5 13.5 9 12 7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M12 13.5V17"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatPeopleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 19C4 15.5 6.2 13.5 9 13.5C11.8 13.5 14 15.5 14 19"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="17" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M14.5 19C14.8 16.5 16 15 18 15C19.2 15 20 15.5 20.5 16.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatGlobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 12H20M12 4C10 7 10 17 12 20C14 17 14 7 12 4Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function MiniLotusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 8C10 10 8 10 6 9C7 12 9 14 12 15C15 14 17 12 18 9C16 10 14 10 12 8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarMiniIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="6" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 4V7M16 4V7M5 10H19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
