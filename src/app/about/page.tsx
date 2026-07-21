import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const offerCards = [
  {
    title: "Curated Experts",
    desc: "Psychologists, therapists, counselors, coaches, meditation & yoga teachers, energy healers, astrologers, numerologists, Vastu consultants and more.",
    icon: <ExpertsOfferIcon />,
  },
  {
    title: "Flexible Sessions",
    desc: "Book online counseling, one-off consultations, ongoing therapy sessions, live coaching, or self-paced digital programs and courses.",
    icon: <CalendarOfferIcon />,
  },
  {
    title: "Secure Experience",
    desc: "Streamlined booking, encrypted session links, integrated payments, reminders, and transparent pricing with no surprise costs.",
    icon: <ShieldOfferIcon />,
  },
  {
    title: "Resources & Community",
    desc: "Guided meditations, workbooks, and educational content to support emotional wellbeing between sessions.",
    icon: <BookOfferIcon />,
  },
];

const steps = [
  {
    n: "1",
    title: "Discover",
    desc: "Use filters to find professionals by speciality, language, availability, or price.",
    icon: <SearchStepIcon />,
  },
  {
    n: "2",
    title: "Compare",
    desc: "Read verified profiles, qualifications, service details, and real user reviews.",
    icon: <CompareStepIcon />,
  },
  {
    n: "3",
    title: "Book & Pay",
    desc: "Reserve your preferred slot with secure checkout and instant confirmation.",
    icon: <CalendarStepIcon />,
  },
  {
    n: "4",
    title: "Engage",
    desc: "Join sessions via secure links and experience meaningful, private conversations.",
    icon: <VideoStepIcon />,
  },
  {
    n: "5",
    title: "Follow-up",
    desc: "Access resources, manage bookings, and continue your journey from your dashboard.",
    icon: <HeartStepIcon />,
  },
];

const trustItems = [
  "Identity Verification",
  "Credential Review",
  "Platform Onboarding",
  "Ongoing Quality Checks",
  "Transparent Profiles",
];

const audiences = [
  {
    title: "Seeking clarity",
    desc: "When life feels heavy and you need grounded perspective.",
    icon: <BrainIcon />,
  },
  {
    title: "Ready to grow",
    desc: "For those building better habits, energy, and purpose.",
    icon: <BoltIcon />,
  },
  {
    title: "Healing journeys",
    desc: "Support through emotional release and spiritual care.",
    icon: <LotusSmallIcon />,
  },
  {
    title: "Quiet restoration",
    desc: "Rest, reset, and reconnect with your inner calm.",
    icon: <MoonIcon />,
  },
];

const whyChoose = [
  {
    title: "Clarity",
    desc: "Transparent profiles, reviews, and pricing so you always know what to expect.",
    icon: <ClarityIcon />,
  },
  {
    title: "Choice",
    desc: "Hundreds of verified experts across modalities — find the right fit for you.",
    icon: <ChoiceIcon />,
  },
  {
    title: "Convenience",
    desc: "Book, pay, and join from anywhere. Your journey fits around your life.",
    icon: <ConvenienceIcon />,
  },
  {
    title: "Privacy",
    desc: "Your sessions and data stay protected with secure, respectful care.",
    icon: <PrivacyIcon />,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F7F6FB]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 pt-10 pb-12 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-6 lg:px-10 lg:pt-14 lg:pb-16">
          <div className="relative z-10 max-w-[480px]">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4B4BA8]">
              About SoulSensei
            </p>
            <h1
              className="text-[36px] font-semibold leading-[1.18] tracking-[-0.02em] text-[#3D3D8F] sm:text-[42px] lg:text-[46px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Empowering Minds.
              <br />
              Enriching Souls.
            </h1>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#5C5C7A] sm:text-[16px]">
              SoulSensei is a trusted space for self-discovery, healing, and
              spiritual growth — connecting you with India&apos;s most caring
              experts through live sessions, programs, and community.
            </p>
            <Link
              href="/#experts"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#1A1A4A] px-6 py-3.5 text-[14px] font-semibold text-white transition hover:bg-[#2A2A6A]"
            >
              Explore Experts
              <ArrowIcon />
            </Link>
          </div>

          <div className="relative h-[280px] w-full sm:h-[340px] lg:h-[400px]">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/about/hero.png"
                alt="Meditative silhouette overlooking misty mountains at sunrise"
                fill
                priority
                unoptimized
                className="object-cover object-[center_45%]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              {/* Merge into background — left & right */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[32%] bg-gradient-to-r from-[#F7F6FB] via-[#F7F6FB]/80 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[28%] bg-gradient-to-l from-[#F7F6FB] via-[#F7F6FB]/75 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-[#F7F6FB]/50 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-[#F7F6FB]/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:px-10">
          <div>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#EDEAF8]">
              <LotusMissionIcon />
            </div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B5BA8]">
              Our Mission
            </p>
            <h2
              className="text-[26px] font-semibold leading-[1.25] text-[#3D3D8F] sm:text-[30px] lg:text-[32px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Accessible wellness.
              <br />
              Meaningful change.
            </h2>
            <p className="mt-3.5 text-[14px] leading-[1.7] text-black sm:text-[15px]">
              We built SoulSensei so quality guidance isn&apos;t limited by
              location or gatekeeping. Whether you&apos;re seeking calm,
              healing, or deeper purpose — support should feel approachable and
              human.
            </p>
            <p className="mt-3 text-[14px] leading-[1.7] text-black sm:text-[15px]">
              Every expert on our platform is carefully reviewed. Every session
              is designed around trust, clarity, and care — so you can focus on
              what matters most: your growth.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[480px]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]">
              <Image
                src="/about/mission.png"
                alt="Stacked stones and purple lotus on reflective water"
                fill
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 480px"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-white/80 to-transparent" />
            </div>

            <div className="absolute bottom-4 right-3 z-10 max-w-[220px] rounded-2xl bg-[#1A1A4A] p-4 shadow-[0_16px_40px_rgba(26,26,74,0.28)] sm:bottom-5 sm:right-4 sm:max-w-[240px] sm:p-5">
              <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <HeartWhiteIcon />
              </div>
              <p className="text-[13px] font-medium leading-[1.5] text-white sm:text-[14px]">
                We believe every mind deserves care — and every soul deserves a
                safe place to grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer — 1st sc 4-column */}
      <section className="bg-[#F8F7FC] py-8 sm:py-10 lg:py-11">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 divide-y divide-[#DDDAE8] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {offerCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col items-center px-5 py-6 text-center sm:px-6 sm:py-5 lg:px-7"
              >
                <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-[#EDEAF8] text-[#5B4BA8]">
                  {card.icon}
                </div>
                <h3 className="text-[15px] font-bold text-[#3D3D8F] sm:text-[16px]">
                  {card.title}
                </h3>
                <p className="mt-2.5 max-w-[220px] text-[12.5px] leading-[1.55] text-black sm:text-[13px]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — 1st sc style */}
      <section className="bg-white pt-12 pb-4 sm:pt-14 sm:pb-5 lg:pt-16 lg:pb-6">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
          <h2
            className="mx-auto max-w-[520px] text-center text-[28px] font-semibold leading-[1.25] text-[#1A1A4A] sm:text-[34px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Simple steps to support that fits
          </h2>

          {/* Desktop: icons + dotted arrows */}
          <div className="mt-10 hidden lg:block">
            <div className="flex items-start">
              {steps.map((step, index) => (
                <div key={step.n} className="flex min-w-0 flex-1 items-start">
                  <div className="flex w-full flex-col items-center px-1 text-center xl:px-2">
                    <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-[1.5px] border-[#4B4BA8]/55 bg-[#F5F3FB] text-[#1A1A4A]">
                      {step.icon}
                    </div>
                    <h3 className="mt-5 text-[15px] font-bold tracking-[-0.01em] text-[#1A1A4A]">
                      {step.n}. {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-[175px] text-[12.5px] leading-[1.55] text-[#5C5C7A]">
                      {step.desc}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="mt-[32px] flex w-5 shrink-0 justify-center text-[#4B4BA8] xl:w-7"
                      aria-hidden
                    >
                      <DottedArrow />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile / tablet */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:hidden">
            {steps.map((step) => (
              <div key={step.n} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-[#4B4BA8]/55 bg-[#F5F3FB] text-[#1A1A4A]">
                  {step.icon}
                </div>
                <h3 className="mt-4 text-[15px] font-bold text-[#1A1A4A]">
                  {step.n}. {step.title}
                </h3>
                <p className="mt-2 max-w-[280px] text-[13px] leading-[1.6] text-[#5C5C7A]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust banner — 1st UI */}
      <section className="bg-white pt-2 pb-8 sm:pt-3 sm:pb-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
          <div
            className="relative overflow-hidden rounded-[22px] px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-8"
            style={{
              background:
                "linear-gradient(115deg, #2A1F5C 0%, #3D2A7A 42%, #4B3A8F 72%, #5A4599 100%)",
            }}
          >
            {/* Soft leaf / floral watermark */}
            <div
              className="pointer-events-none absolute -right-8 top-1/2 hidden h-[140%] w-[42%] -translate-y-1/2 opacity-[0.14] lg:block"
              aria-hidden
            >
              <svg viewBox="0 0 200 280" fill="none" className="h-full w-full">
                <path
                  d="M100 20C100 20 40 80 40 140C40 180 70 220 100 260C130 220 160 180 160 140C160 80 100 20 100 20Z"
                  stroke="white"
                  strokeWidth="1.2"
                />
                <path
                  d="M100 40C100 40 55 90 55 140C55 175 75 205 100 235C125 205 145 175 145 140C145 90 100 40 100 40Z"
                  stroke="white"
                  strokeWidth="1"
                  opacity="0.7"
                />
                <path d="M100 20V260" stroke="white" strokeWidth="1" />
                <path
                  d="M70 100C85 115 100 120 100 120M130 100C115 115 100 120 100 120M65 150C85 160 100 165 100 165M135 150C115 160 100 165 100 165"
                  stroke="white"
                  strokeWidth="1"
                  opacity="0.6"
                />
              </svg>
            </div>

            <div className="relative z-10 grid items-center gap-7 lg:grid-cols-[auto_1.15fr_0.85fr] lg:gap-8 xl:gap-10">
              {/* Shield */}
              <div className="mx-auto flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-[96px] sm:w-[96px] lg:mx-0">
                <ShieldLargeIcon />
              </div>

              {/* Copy */}
              <div className="text-center lg:text-left">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 sm:text-[11px]">
                  Trust, Safety &amp; Verification
                </p>
                <h2
                  className="mt-2 text-[24px] font-semibold leading-[1.2] text-white sm:text-[28px] lg:text-[30px]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Your trust is our foundation
                </h2>
                <p className="mt-3 max-w-[520px] text-[13px] leading-[1.65] text-white/80 sm:text-[14px] lg:mx-0 mx-auto">
                  Every professional on SoulSensei goes through identity checks,
                  credential reviews, and platform onboarding before they can
                  offer sessions.
                </p>
                <p className="mt-2 max-w-[520px] text-[13px] leading-[1.65] text-white/80 sm:text-[14px] lg:mx-0 mx-auto">
                  We continuously monitor quality and keep profiles transparent
                  — so you can book with confidence and focus on your journey.
                </p>
              </div>

              {/* Checklist */}
              <ul className="mx-auto w-full max-w-[280px] space-y-2.5 lg:mx-0 lg:max-w-none">
                {trustItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6B5BA8]">
                      <CheckWhiteIcon />
                    </span>
                    <span className="text-[13px] font-medium text-white sm:text-[14px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-[#F8F7FC] py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
          <h2
            className="text-center text-[28px] font-semibold text-[#1A1A4A] sm:text-[34px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Support for every journey
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="flex gap-4 rounded-2xl border border-[#E4E2EF] bg-white p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EDEAF8] text-[#4B4BA8]">
                  {a.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#1A1A4A]">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-[1.55] text-[#6B6B88]">
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-white py-8 sm:py-10 lg:py-11">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
          <h2
            className="mx-auto max-w-[560px] text-center text-[26px] font-semibold leading-[1.25] text-[#1A1A4A] sm:text-[30px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Care that&apos;s clear, convenient &amp; compassionate
          </h2>

          <div className="mx-auto mt-6 grid max-w-[900px] gap-5 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-6 lg:mt-7">
            {whyChoose.map((item) => (
              <div key={item.title} className="flex gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EDEAF8] text-[#4B4BA8]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#1A1A4A]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-[1.6] text-[#6B6B88]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment + Emergency — 2nd sc cards */}
      <section className="bg-[#F4F2FA] py-8 sm:py-10">
        <div className="mx-auto grid max-w-[1200px] gap-4 px-4 sm:gap-5 sm:px-6 lg:grid-cols-2 lg:px-10">
          {/* Left card */}
          <div className="flex items-center gap-4 rounded-[20px] bg-[#EDEAF6] px-5 py-5 sm:gap-5 sm:px-6 sm:py-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E0DBF0] text-[#5B3FA0] sm:h-[68px] sm:w-[68px]">
              <HandsHeartIcon />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-[#1A1A4A] sm:text-[16px]">
                Our Commitment to Responsible Care
              </p>
              <p className="mt-2 text-[13px] leading-[1.65] text-[#2A2A3A] sm:text-[13.5px]">
                SoulSensei is not an emergency or crisis service and does not
                replace medical or psychiatric treatment. We encourage users in
                urgent situations to seek immediate in-person help. For everyday
                mental wellness, SoulSensei helps you locate appropriate
                professionals and resources to support recovery, growth, and
                wellbeing.
              </p>
            </div>
          </div>

          {/* Right card */}
          <div className="flex items-center gap-4 rounded-[20px] bg-[#EDEAF6] px-5 py-5 sm:gap-5 sm:px-6 sm:py-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E0DBF0] text-[#5B3FA0] sm:h-[68px] sm:w-[68px]">
              <PhoneSignalIcon />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-[#1A1A4A] sm:text-[16px]">
                In an emergency?
              </p>
              <p className="mt-2 text-[13px] leading-[1.65] text-[#2A2A3A] sm:text-[13.5px]">
                If you or someone you know is in crisis, please contact local
                emergency services or a helpline immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — 2nd sc style banner */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-[#F7F5FC]">
          {/* Soft ambient glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(247,245,252,0.4) 55%, transparent 75%)",
            }}
          />

          {/* Left image — plant & stones, merge inward */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[38%] lg:block xl:w-[36%]">
            <Image
              src="/about/cta-left.png"
              alt=""
              fill
              unoptimized
              className="object-cover object-[left_center] opacity-90"
              sizes="40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F7F5FC]/25 to-[#F7F5FC]" />
            <div className="absolute inset-y-0 right-0 w-[55%] bg-gradient-to-r from-transparent to-[#F7F5FC]" />
          </div>

          {/* Right image — lotus & candle, merge inward */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] lg:block xl:w-[36%]">
            <Image
              src="/about/cta-right.png"
              alt=""
              fill
              unoptimized
              className="object-cover object-[right_center] opacity-90"
              sizes="40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#F7F5FC]/25 to-[#F7F5FC]" />
            <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-l from-transparent to-[#F7F5FC]" />
          </div>

          {/* Center content */}
          <div className="relative z-10 mx-auto flex max-w-[540px] flex-col items-center px-6 py-14 text-center sm:px-8 sm:py-16 lg:py-[72px]">
            <h2
              className="text-[28px] font-semibold leading-[1.25] text-[#3D3D8F] sm:text-[34px] lg:text-[36px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Ready to begin your journey?
            </h2>
            <p className="mt-4 max-w-[420px] text-[14px] leading-[1.7] text-[#3A3A4A] sm:text-[15px]">
              Create an account to explore professionals, read verified reviews,
              and book your first session.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/#start"
                className="inline-flex min-w-[140px] items-center justify-center rounded-xl bg-[#3D3D8F] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(61,61,143,0.28)] transition hover:bg-[#2F2F75] hover:shadow-[0_10px_28px_rgba(61,61,143,0.35)]"
              >
                Get Started
              </Link>
              <Link
                href="/#experts"
                className="inline-flex min-w-[140px] items-center justify-center rounded-xl border-[1.5px] border-[#3D3D8F] bg-white/80 px-7 py-3.5 text-[14px] font-semibold text-[#3D3D8F] backdrop-blur-sm transition hover:bg-[#3D3D8F] hover:text-white"
              >
                Explore Experts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About footer bar */}
      <footer className="bg-[#1A1A4A]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-6 py-8 sm:px-8 sm:py-9 lg:flex-row lg:items-center lg:px-10">
          <div>
            <p className="text-[16px] font-medium text-white sm:text-[17px]">
              Need help finding the right match?
            </p>
            <Link
              href="/#contact"
              className="mt-1 inline-block text-[13px] text-white/70 underline underline-offset-2 transition hover:text-white"
            >
              Visit Contact Page
            </Link>
          </div>
          <a
            href="mailto:support@soulsensei.com"
            className="text-[14px] text-white/80 transition hover:text-white"
          >
            support@soulsensei.com
          </a>
          <div className="hidden text-white/50 lg:block">
            <MeditateFooterIcon />
          </div>
        </div>
      </footer>
    </main>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
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

function DottedArrow() {
  return (
    <svg width="36" height="12" viewBox="0 0 36 12" fill="none" aria-hidden>
      <path
        d="M2 6H28"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="2.5 3"
        strokeLinecap="round"
      />
      <path
        d="M26 2.5L31.5 6L26 9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LotusMissionIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20C12 20 5 14.5 5 10C5 7.5 7 6 9 6C10.2 6 11.1 6.6 12 7.5C12.9 6.6 13.8 6 15 6C17 6 19 7.5 19 10C19 14.5 12 20 12 20Z"
        stroke="#6B5BA8"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartWhiteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20C12 20 4 14 4 9C4 6.5 6 4.5 8.5 4.5C10 4.5 11.2 5.3 12 6.5C12.8 5.3 14 4.5 15.5 4.5C18 4.5 20 6.5 20 9C20 14 12 20 12 20Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExpertsOfferIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M3.5 19C3.5 16.5 5.5 14.5 9 14.5C12.5 14.5 14.5 16.5 14.5 19"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarOfferIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 3V7M16 3V7M4 10H20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 14H10M14 14H16M8 17H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ShieldOfferIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L5 6V11C5 16 8.5 19.5 12 21C15.5 19.5 19 16 19 11V6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15.5 9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookOfferIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 5.5C4 4.7 4.7 4 5.5 4H11V18H5.5C4.7 18 4 17.3 4 16.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M20 5.5C20 4.7 19.3 4 18.5 4H13V18H18.5C19.3 18 20 17.3 20 16.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M13 4V18" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SearchStepIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 20L16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CompareStepIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 19C4 16.5 6 14.5 9 14.5C11 14.5 12.5 15.3 13.5 16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CalendarStepIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 3V7M16 3V7M4 10H20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function VideoStepIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 10L21 7.5V16.5L16 14V10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function HeartStepIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20C12 20 4 14 4 9C4 6.5 6 4.5 8.5 4.5C10 4.5 11.2 5.3 12 6.5C12.8 5.3 14 4.5 15.5 4.5C18 4.5 20 6.5 20 9C20 14 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldLargeIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L5 6V11C5 16 8.5 19.5 12 21C15.5 19.5 19 16 19 11V6L12 3Z"
        stroke="white"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15.5 9.5"
        stroke="white"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckWhiteIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 4C7 4 5.5 5.5 5.5 7.5C4 8 3 9.5 3 11.2C3 13.5 4.8 15.2 7 15.5V19H10V12.5C10 10 11.5 8.5 13.5 8.5H14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M15 4C17 4 18.5 5.5 18.5 7.5C20 8 21 9.5 21 11.2C21 13.5 19.2 15.2 17 15.5V19H14V12.5C14 10.5 13 9 11.5 8.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M13 2L5 13H11L10 22L19 10H13L13 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function LotusSmallIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 19C12 19 6 14.5 6 10.5C6 8.5 7.5 7 9.2 7C10.2 7 11 7.5 12 8.4C13 7.5 13.8 7 14.8 7C16.5 7 18 8.5 18 10.5C18 14.5 12 19 12 19Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 13.5C16.5 15.5 14 17 11.2 17C7.4 17 4.2 13.9 4.2 10.2C4.2 7.5 5.8 5.2 8.2 4.2C6.5 8.5 9.5 13 14.5 13.5C15.7 13.6 16.9 13.6 18 13.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M16 4L16.5 5.5L18 6L16.5 6.5L16 8L15.5 6.5L14 6L15.5 5.5L16 4Z" fill="currentColor" />
    </svg>
  );
}

function ClarityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ChoiceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 6H20M8 12H20M8 18H20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="4.5" cy="6" r="1.2" fill="currentColor" />
      <circle cx="4.5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="4.5" cy="18" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ConvenienceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 17H14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PrivacyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="10" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.5 10V7.5C8.5 5.5 10 4 12 4C14 4 15.5 5.5 15.5 7.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HandsHeartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      {/* Heart */}
      <path
        d="M12 10.8C12 10.8 10.4 9.2 9.3 9.2C8.1 9.2 7.2 10.1 7.2 11.2C7.2 13.2 12 16.2 12 16.2C12 16.2 16.8 13.2 16.8 11.2C16.8 10.1 15.9 9.2 14.7 9.2C13.6 9.2 12 10.8 12 10.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Left hand */}
      <path
        d="M3.8 17.2C5.5 15.6 8.2 15 11.2 16.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4.5 19.8C6.5 18 9 17.5 11.5 18.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Right hand */}
      <path
        d="M20.2 17.2C18.5 15.6 15.8 15 12.8 16.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19.5 19.8C17.5 18 15 17.5 12.5 18.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneSignalIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 3.5H11L12.8 8L10.6 9.4C11.5 11.2 13.2 12.9 15.2 13.9L16.7 11.6L21 13.2V16C21 17.1 20.1 18 19 18C11.8 18 6 12.2 6 5C6 3.9 6.9 3 8 3.5H8.5Z"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 4.5C17.8 5.4 18.8 6.7 19.2 8.2"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <path
        d="M16.8 6.8C17.5 7.3 18 8 18.2 8.8"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MeditateFooterIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="10" r="4" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M12 28C12 22 15 18 20 18C25 18 28 22 28 28"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path d="M14 24H26" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
