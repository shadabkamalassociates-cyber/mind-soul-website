"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ExpertProfile } from "@/data/experts";

const navItems = [
  { id: "about", label: "About", icon: <UserIcon /> },
  { id: "services", label: "Services", icon: <GridIcon /> },
  { id: "consultation", label: "Consultation", icon: <ChatIcon /> },
  { id: "experience", label: "Experience", icon: <BriefcaseIcon /> },
  { id: "reviews", label: "Reviews", icon: <StarIcon /> },
  { id: "gallery", label: "Gallery", icon: <ImageIcon /> },
  { id: "faqs", label: "FAQs", icon: <HelpIcon /> },
];

const consultationTypes = [
  {
    label: "Video Call",
    desc: "Face-to-face consultation via secure video call.",
    icon: <VideoIcon />,
  },
  {
    label: "Audio Call",
    desc: "Connect through voice call for your session.",
    icon: <PhoneIcon />,
  },
  {
    label: "Chat",
    desc: "Real-time chat session for quick guidance.",
    icon: <ChatIcon />,
  },
  {
    label: "WhatsApp",
    desc: "Chat on WhatsApp for convenient consultation.",
    icon: <WhatsAppIcon />,
  },
  {
    label: "Email Report",
    desc: "Detailed written report with personalized insights.",
    icon: <MailIcon />,
  },
  {
    label: "Live Session",
    desc: "Join live group sessions and get your answers.",
    icon: <LiveIcon />,
  },
  {
    label: "Recorded Session",
    desc: "Access recorded sessions at your convenience.",
    icon: <PlayIcon />,
  },
  {
    label: "In-person Consultation",
    desc: "Meet in person for a deeper connection.",
    icon: <UserIcon />,
  },
];

export default function ExpertProfileDetail({ expert }: { expert: ExpertProfile }) {
  const [activeNav, setActiveNav] = useState("about");
  const firstName = expert.name.replace(/^Dr\.\s*/, "").split(" ")[0];

  return (
    <main className="min-h-screen bg-[#F8F9FC] text-[#1A1A4A]">
      <Header />

      {/* Profile Hero + Header — 2nd screenshot exact circle-wrap curve */}
      <section className="relative bg-[#F8F9FC]">
        <div className="relative h-[230px] overflow-hidden sm:h-[270px] lg:h-[290px]">
          <Image
            src="/experts-page/profile-hero.png"
            alt=""
            fill
            className="object-cover object-[center_28%]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E2A]/70 via-[#1A1A4A]/35 to-transparent" />
          <div className="absolute right-0 top-0 hidden h-full w-[50%] opacity-60 lg:block">
            <Image
              src="/bg-mandala.png"
              alt=""
              fill
              unoptimized
              className="object-contain object-right"
              sizes="580px"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          {/* Pull up over hero */}
          <div className="relative -mt-[118px] sm:-mt-[130px] lg:-mt-[148px]">
            {/* ===== Mobile / tablet (stacked) ===== */}
            <div className="flex flex-col items-center lg:hidden">
              <div className="relative z-30">
                <div className="relative h-[150px] w-[150px] sm:h-[168px] sm:w-[168px]">
                  <div className="absolute inset-0 rounded-full bg-[#E8E4F5] p-[5px] shadow-[0_14px_40px_rgba(14,14,42,0.3)] ring-[6px] ring-white sm:p-[6px] sm:ring-[7px]">
                    <div className="relative h-full w-full overflow-hidden rounded-full">
                      <Image
                        src={expert.image}
                        alt={expert.name}
                        fill
                        className="object-cover object-top"
                        sizes="168px"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-[2.5px] border-white bg-[#1A1A4A] text-white shadow-md sm:h-9 sm:w-9">
                    <LotusIcon />
                  </div>
                </div>
              </div>

              <div className="relative z-20 mt-[-32px] w-full rounded-2xl border border-[#E8EAF4] bg-white px-5 pb-5 pt-12 text-center shadow-[0_12px_40px_rgba(26,26,74,0.10)] sm:px-7 sm:pb-6 sm:pt-14">
                <ProfileHeaderContent expert={expert} />
              </div>
            </div>

            {/* ===== Desktop: circle + curved white wrap ===== */}
            <div className="relative hidden lg:block" style={{ paddingLeft: 94 }}>
              {/* Avatar — center sits on white card's left edge */}
              <div className="absolute left-0 top-0 z-30 h-[172px] w-[172px]">
                <div className="absolute inset-0 rounded-full bg-[#E8E4F5] p-[6px] shadow-[0_14px_40px_rgba(14,14,42,0.3)] ring-[7px] ring-white">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      className="object-cover object-top"
                      sizes="172px"
                    />
                  </div>
                </div>
                <div className="absolute bottom-1.5 right-1.5 z-10 flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] border-white bg-[#1A1A4A] text-white shadow-md">
                  <LotusIcon />
                </div>
              </div>

              {/* White card — circular notch on left edge wraps the avatar */}
              <div
                className="expert-curve-card relative z-20 rounded-2xl border border-[#E8EAF4] bg-white pb-6 pl-[110px] pr-8 pt-7 shadow-[0_12px_40px_rgba(26,26,74,0.10)]"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(circle 98px at 0px 86px, transparent 96px, #000 98px)",
                  maskImage:
                    "radial-gradient(circle 98px at 0px 86px, transparent 96px, #000 98px)",
                }}
              >
                <ProfileHeaderContent expert={expert} align="left" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl border border-[#E4E2F0] bg-[#F4F2FA] md:grid-cols-5">
            {[
              { icon: <UserIcon />, label: "Profession", value: expert.profession },
              { icon: <CalendarIcon />, label: "Experience", value: expert.experienceDetail },
              { icon: <PeopleIcon />, label: "Clients Guided", value: expert.clients },
              { icon: <VideoIcon />, label: "Sessions Completed", value: expert.sessions },
              { icon: <StarIcon />, label: "Ratings", value: expert.rating },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className={[
                  "flex flex-col items-center justify-center gap-1 px-2 py-4 text-center sm:gap-1.5 sm:py-5",
                  "border-b border-[#E4E2F0] md:border-b-0",
                  idx !== 4 ? "md:border-r md:border-[#E4E2F0]" : "",
                ].join(" ")}
              >
                <span className="text-[#1A1A4A]">{stat.icon}</span>
                <p className="text-[10px] font-medium text-[#8A8AA8] sm:text-[11px]">{stat.label}</p>
                <p className="text-[12px] font-semibold text-[#1A1A4A] sm:text-[13px]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main 3-column layout */}
      <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr_280px] lg:gap-8">
          {/* Left nav */}
          <aside className="hidden lg:block">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[13px] font-medium transition ${
                    activeNav === item.id
                      ? "bg-[#1A1A4A] text-white shadow-md"
                      : "text-[#5C5C7A] hover:bg-white hover:text-[#1A1A4A]"
                  }`}
                >
                  <span className={activeNav === item.id ? "text-white" : "text-[#3D3D8F]"}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Center - About */}
          <div className="min-w-0">
            <div className="rounded-2xl border border-[#E8EAF4] bg-white px-6 py-7 sm:px-8 sm:py-8">
              <div className="flex items-center gap-3">
                <Image
                  src="/experts-page/lotus-gold.png"
                  alt=""
                  width={22}
                  height={22}
                  unoptimized
                />
                <h2
                  className="text-[22px] font-semibold text-[#1A1A4A] sm:text-[24px]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  About {expert.name}
                </h2>
              </div>

              <div className="mt-5 space-y-4 text-[13px] leading-[1.85] text-[#4A4A6A] sm:text-[14px]">
                {expert.about.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {expert.highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-[#E8EAF4] bg-[#FAFBFF] px-4 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EDEAF8] text-[#3D3D8F]">
                        <LotusIcon />
                      </span>
                      <div>
                        <h4 className="text-[13px] font-semibold text-[#1A1A4A]">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-[12px] leading-relaxed text-[#5C5C7A]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar - Professional Details */}
          <aside>
            <div className="relative overflow-hidden rounded-2xl border border-[#E8EAF4] bg-white px-5 py-6">
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 opacity-[0.06]">
                <Image src="/bg-mandala.png" alt="" fill unoptimized className="object-contain" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#1A1A4A]">Professional Details</h3>

              <DetailRow label="Profession" value={expert.profession} />
              <DetailRow label="Years of Experience" value={expert.experienceDetail} />

              <div className="mt-4 border-t border-[#E8EAF4] pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3D3D8F]">
                  Education
                </p>
                <ul className="mt-2 space-y-1">
                  {expert.education.map((e) => (
                    <li key={e} className="text-[12px] text-[#4A4A6A]">
                      • {e}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 border-t border-[#E8EAF4] pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3D3D8F]">
                  Certifications
                </p>
                <ul className="mt-2 space-y-1">
                  {expert.certifications.map((c) => (
                    <li key={c} className="text-[12px] text-[#4A4A6A]">
                      • {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 border-t border-[#E8EAF4] pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3D3D8F]">
                  Specialization
                </p>
                <ul className="mt-2 space-y-1">
                  {expert.specializations.map((s) => (
                    <li key={s} className="text-[12px] text-[#4A4A6A]">
                      • {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Services Offered */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="text-[28px] font-semibold text-[#1A1A4A] sm:text-[32px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Services Offered
            </h2>
            <div className="mt-4 flex items-center justify-center gap-3 sm:gap-4">
              <span className="h-px w-16 bg-[#C9A06A]/60 sm:w-24" />
              <Image src="/experts-page/lotus-gold.png" alt="" width={20} height={20} unoptimized />
              <span className="h-px w-16 bg-[#C9A06A]/60 sm:w-24" />
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {expert.services.map((service, index) => (
              <article
                key={service.title}
                className="relative rounded-2xl border border-[#E4E2EF] bg-white px-4 pb-5 pt-12 text-center shadow-[0_2px_16px_rgba(26,26,74,0.05)]"
              >
                <div className="absolute left-1/2 top-0 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1A1A4A] text-white shadow-[0_6px_20px_rgba(26,26,74,0.22)]">
                  <ServiceCardIcon index={index} />
                </div>
                <h3
                  className="text-[15px] font-semibold leading-snug text-[#1A1A4A] sm:text-[16px]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {service.title}
                </h3>
                <p className="mx-auto mt-2.5 max-w-[220px] text-[12px] leading-[1.65] text-[#5C5C7A]">
                  {service.desc}
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#1A1A4A] px-5 py-2 text-[12px] font-medium text-[#1A1A4A] transition hover:bg-[#1A1A4A] hover:text-white"
                >
                  Know More <ArrowIcon />
                </button>
              </article>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              href="/#book"
              className="inline-flex items-center gap-2 rounded-full bg-[#1A1A4A] px-8 py-3 text-[13px] font-semibold text-white transition hover:bg-[#2A2A6A]"
            >
              View All Services <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center text-[28px] font-semibold text-[#1A1A4A] sm:text-[32px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Consultation Types
          </h2>

          <div className="mt-5 flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-px w-16 bg-[#C9A06A]/60 sm:w-24" />
            <Image
              src="/experts-page/lotus-gold.png"
              alt=""
              width={20}
              height={20}
              unoptimized
              className="opacity-95"
            />
            <span className="h-px w-16 bg-[#C9A06A]/60 sm:w-24" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {consultationTypes.map((type) => (
              <div
                key={type.label}
                className="flex min-h-[96px] items-center gap-4 rounded-2xl border border-[#E4E2EF] bg-white px-5 py-5 shadow-[0_2px_12px_rgba(26,26,74,0.04)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F0F2F8] text-[#3D3D8F]">
                  {type.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold leading-snug text-[#1A1A4A]">
                    {type.label}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-[1.55] text-[#6B6B8A]">
                    {type.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#1A1A4A] px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2
                className="text-[24px] font-semibold text-white sm:text-[28px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Ready to Transform Your Life?
              </h2>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/80">
                Book a session with {firstName} and take the first step towards
                clarity, healing, and transformation.
              </p>
              <Link
                href="/#book"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E8C69F] via-[#C9A06A] to-[#A67C4A] px-6 py-3 text-[14px] font-semibold text-[#1A1A4A] shadow-[0_8px_24px_rgba(201,160,106,0.35)] transition hover:brightness-105"
              >
                Book Your Session Now <ArrowIcon />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <TrustBadge icon={<ShieldIcon />} title="100% Secure" desc="Encrypted sessions" />
              <TrustBadge
                icon={<StarIcon />}
                title="Trusted Expert"
                desc={expert.experienceDetail + " experience"}
              />
              <TrustBadge
                icon={<HeartIcon />}
                title="Satisfaction"
                desc="Thousands of happy clients"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProfileHeaderContent({
  expert,
  align = "center",
}: {
  expert: ExpertProfile;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <>
      <span className="inline-flex items-center gap-1.5 rounded-md border border-[#D8DAE8] bg-[#F3F4F8] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-[#3D3D8F] sm:text-[9px]">
        <CheckIcon /> Verified Expert
      </span>

      <h1
        className="mt-2.5 text-[26px] font-semibold leading-[1.15] text-[#1A1A4A] sm:text-[32px] lg:text-[36px]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {expert.name}
      </h1>

      <div
        className={`mt-2.5 flex items-center gap-2.5 ${center ? "justify-center" : "justify-start"}`}
      >
        <span className="h-px w-12 bg-[#C9A06A]/80 sm:w-16" />
        <Image src="/experts-page/lotus-gold.png" alt="" width={15} height={15} unoptimized />
        <span className="h-px w-12 bg-[#C9A06A]/80 sm:w-16" />
      </div>

      <p
        className="mt-2 text-[12px] font-medium tracking-wide text-[#C5A35E] sm:text-[13px]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {expert.titles}
      </p>

      <div className="mt-5 rounded-xl border border-[#E8EAF4] bg-white px-3 py-4 sm:px-4 sm:py-5">
        <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-4">
          <ContactItem icon={<PhoneIcon />} label="Mobile" value={expert.phone} />
          <ContactItem icon={<WhatsAppIcon />} label="WhatsApp" value={expert.whatsapp} />
          <ContactItem icon={<MailIcon />} label="Email" value={expert.email} />
          <ContactItem icon={<LocationIcon />} label="Location" value={expert.location} />
        </div>

        <div
          className={`mt-4 flex items-center gap-2 border-t border-[#E8EAF4] pt-3.5 ${center ? "justify-center" : "justify-start"}`}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[#1A1A4A]">
            <GlobeMiniIcon />
          </span>
          <p className="text-[11px] text-[#5C5C7A] sm:text-[12px]">
            <span className="font-semibold text-[#1A1A4A]">Languages Spoken</span>
            <span className="mx-1.5 text-[#C5C5D5]">|</span>
            {expert.languages.join(", ")}
          </p>
        </div>
      </div>
    </>
  );
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 text-left sm:border-r sm:border-[#E8EAF4] sm:px-3 sm:last:border-r-0">
      <span className="mt-0.5 shrink-0 text-[#1A1A4A]">{icon}</span>
      <div className="min-w-0">
        <p className="truncate text-[12px] font-semibold text-[#1A1A4A] sm:text-[13px]">{value}</p>
        <p className="mt-0.5 text-[10px] font-medium text-[#8A8AA8]">{label}</p>
      </div>
    </div>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-[#3D3D8F]">{icon}</span>
      <p className="text-[11px] text-[#8A8AA8]">{label}</p>
      <p className="text-[13px] font-semibold text-[#1A1A4A]">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8AA8]">
        {label}
      </p>
      <p className="mt-0.5 text-[13px] font-medium text-[#1A1A4A]">{value}</p>
    </div>
  );
}

function TrustBadge({
  icon,
  title,
  desc,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white">
        {icon}
      </span>
      <div>
        <p className="text-[13px] font-semibold text-white">{title}</p>
        <p className="text-[11px] text-white/70">{desc}</p>
      </div>
    </div>
  );
}


function ServiceCardIcon({ index }: { index: number }) {
  const icons = [
    <BookIcon key="book" />,
    <ChartIcon key="chart" />,
    <LotusIcon key="lotus" />,
    <MandalaIcon key="mandala" />,
  ];
  return icons[index % icons.length];
}

function BookIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 5H18V19H6V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 5V19M6 8H4V17H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 16V11M12 16V7M17 16V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MandalaIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12 5V19M5 12H19M7.5 7.5L16.5 16.5M16.5 7.5L7.5 16.5" stroke="currentColor" strokeWidth="1.2" />
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

function LotusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 7C10.5 9 8.5 9.5 7 8.5C8 11 10 12.5 12 13.5C14 12.5 16 11 17 8.5C15.5 9.5 13.5 9 12 7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeMiniIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 12H20M12 3.5C14.5 6.5 14.5 17.5 12 20.5M12 3.5C9.5 6.5 9.5 17.5 12 20.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6 20C6 16.5 8.5 14 12 14C15.5 14 18 16.5 18 20"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="6" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4V7M16 4V7M5 10H19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M4 19C4 15.5 6.2 13.5 9 13.5C11.8 13.5 14 15.5 14 19"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="17" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 10L21 7V17L16 14V10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4L14.2 9.2L20 9.8L15.5 13.6L16.8 19.5L12 16.6L7.2 19.5L8.5 13.6L4 9.8L9.8 9.2L12 4Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="14" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 6H19V16H9L5 19V6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="8" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 8V6C9 5.2 9.8 4 12 4C14.2 4 15 5.2 15 6V8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" />
      <path d="M4 16L9 12L13 15L20 10V19H4V16Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9.5 9.5C9.5 8.1 10.7 7 12 7C13.3 7 14.5 8.1 14.5 9.5C14.5 10.5 13.8 11.2 12.9 11.6C12.3 11.9 12 12.4 12 13V13.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 4.5H9L10.5 8.5L8.5 10C9.5 12.5 11.5 14.5 14 15.5L15.5 13.5L19.5 15V17.5C19.5 18.3 18.8 19 18 19C10.1 19 4 12.9 4 5C4 4.2 4.7 3.5 5.5 3.5H6.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4C7.6 4 4 7.6 4 12C4 13.5 4.4 14.9 5.1 16.1L4 20L8 18.9C9.2 19.6 10.6 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 8L12 13L20 8" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21C12 21 19 14.5 19 9.5C19 6.5 16.5 4 12 4C7.5 4 5 6.5 5 9.5C5 14.5 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 5V3M12 21V19M5 12H3M21 12H19M7 7L5.5 5.5M18.5 18.5L17 17M7 17L5.5 18.5M18.5 5.5L17 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="currentColor" />
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

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20.5C12 20.5 4 15 4 9.5C4 6.5 6.5 4 9.5 4C11.2 4 12 5 12 5C12 5 12.8 4 14.5 4C17.5 4 20 6.5 20 9.5C20 15 12 20.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
