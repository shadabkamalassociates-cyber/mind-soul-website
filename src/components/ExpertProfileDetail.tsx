"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExpertReviewsSection from "@/components/ExpertReviewsSection";
import type { ExpertProfile } from "@/data/experts";
import { experts as staticExperts } from "@/data/experts";
import {
  fetchExpertByIdFromAll,
  resolveExpertImage,
  resolveExpertSpecialization,
} from "@/services/expertsService";
import { ApiError } from "@/services/apiClient";
import type { Expert } from "@/types/expert";

type ExpertProfileDetailProps = {
  expert?: ExpertProfile;
  expertId?: string;
};

export default function ExpertProfileDetail({
  expert,
  expertId,
}: ExpertProfileDetailProps) {
  if (expertId) {
    return <ExpertProfileDetailLoader expertId={expertId} />;
  }

  if (expert) {
    return <ExpertProfileDetailView expert={expert} />;
  }

  notFound();
}

function ExpertProfileDetailLoader({ expertId }: { expertId: string }) {
  const [expert, setExpert] = useState<ExpertProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMissing, setIsMissing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadExpert() {
      setIsLoading(true);
      setIsMissing(false);
      setError(null);
      setExpert(null);

      try {
        const data = await fetchExpertByIdFromAll(expertId);
        if (cancelled) return;
        setExpert(mapApiExpertToProfile(data));
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          setIsMissing(true);
        } else {
          setError(
            err instanceof ApiError
              ? err.message
              : err instanceof Error
                ? err.message
                : "Failed to load expert",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadExpert();

    return () => {
      cancelled = true;
    };
  }, [expertId]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4 text-[#8A8AA8]">
        Loading expert profile...
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4 text-center text-[#B42318]">
        {error}
      </main>
    );
  }

  if (isMissing || !expert) notFound();

  return <ExpertProfileDetailView expert={expert} />;
}

function parseListField(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((s) => s.trim()).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function hasDisplayValue(value: unknown): boolean {
  if (value == null) return false;
  const text = String(value).trim();
  if (!text) return false;
  const normalized = text.replace(/[—–−]/g, "-").toLowerCase();
  if (
    normalized === "-" ||
    normalized === "n/a" ||
    normalized === "na" ||
    normalized === "no bio provided" ||
    normalized === "no bio provided."
  ) {
    return false;
  }
  if (/^0+(\.0+)?$/.test(normalized)) return false;
  if (/^0+(\.0+)?\s*\/\s*5/.test(normalized)) return false;
  return true;
}

function pushHighlight(
  list: { title: string; desc: string }[],
  title: string,
  value: unknown,
) {
  if (typeof value === "string" && value.trim()) {
    list.push({ title, desc: value.trim() });
  }
}

function findStaticExpertMatch(expert: Expert): ExpertProfile | undefined {
  const email = String(expert.email ?? "").trim().toLowerCase();
  if (email) {
    const byEmail = staticExperts.find(
      (item) => item.email.trim().toLowerCase() === email,
    );
    if (byEmail) return byEmail;
  }

  const apiName = [expert.first_name, expert.last_name]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!apiName) return undefined;

  return staticExperts.find(
    (item) =>
      item.name.replace(/\s+/g, " ").trim().toLowerCase() === apiName,
  );
}

function buildAboutParagraphs(expert: Expert): string[] {
  const rawParts = [expert.about, expert.bio, expert.why_started, expert.mission]
    .filter((v): v is string => typeof v === "string" && hasDisplayValue(v))
    .flatMap((text) =>
      text
        .split(/\r?\n\r?\n+/)
        .map((p) => p.replace(/\r\n/g, " ").replace(/\s+/g, " ").trim())
        .filter((para) => hasDisplayValue(para)),
    );

  const seen = new Set<string>();
  const unique: string[] = [];
  for (const para of rawParts) {
    const key = para.toLowerCase().slice(0, 120);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(para);
    }
  }

  return unique;
}

function mapExpertServices(
  expert: Expert,
  staticMatch?: ExpertProfile,
): { title: string; desc: string }[] {
  if (staticMatch?.services.length) {
    return staticMatch.services;
  }

  const titles = [
    ...parseListField(expert.certifications),
    ...parseListField(expert.specialization),
  ];

  const seen = new Set<string>();
  const services: { title: string; desc: string }[] = [];

  for (const title of titles) {
    const key = title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    services.push({
      title,
      desc: `Personalized ${title} sessions designed to support your healing, clarity, and transformation.`,
    });
  }

  return services;
}

function formatExpertLocation(
  ...parts: (string | null | undefined)[]
): string {
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const part of parts) {
    const value = String(part ?? "").trim();
    if (!value) continue;
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(value);
  }

  return unique.join(", ") || "India";
}

function mapApiExpertToProfile(expert: Expert): ExpertProfile {
  const id = String(expert.id ?? expert._id ?? "");
  const name =
    [expert.first_name, expert.last_name]
      .filter(Boolean)
      .map((part) => String(part).trim())
      .filter(Boolean)
      .join(" ") ||
    String(expert.name ?? "Expert").trim();

  const email = String(expert.email ?? "")
    .trim()
    .toLowerCase();
  const staticMatch =
    (email
      ? staticExperts.find((item) => item.email.trim().toLowerCase() === email)
      : undefined) ||
    staticExperts.find((item) => {
      const apiName = name.replace(/\s+/g, " ").trim().toLowerCase();
      return (
        Boolean(apiName) &&
        item.name.replace(/\s+/g, " ").trim().toLowerCase() === apiName
      );
    });

  const categoryNames = Array.isArray(expert.categories)
    ? expert.categories
        .map((category) => {
          if (category && typeof category === "object" && "name" in category) {
            return String((category as { name?: unknown }).name ?? "").trim();
          }
          return String(category ?? "").trim();
        })
        .filter(Boolean)
    : [];

  const languages = Array.isArray(expert.languages)
    ? expert.languages.map(String).map((s) => s.trim()).filter(Boolean)
    : typeof expert.languages === "string" && expert.languages
      ? expert.languages.split(",").map((s) => s.trim()).filter(Boolean)
      : ["English", "Hindi"];

  const education = Array.isArray(expert.education)
    ? expert.education.map(String).map((s) => s.trim()).filter(Boolean)
    : typeof expert.education === "string" && expert.education
      ? [expert.education.trim()].filter(Boolean)
      : [];

  const certifications = Array.isArray(expert.certifications)
    ? expert.certifications.map(String).map((s) => s.trim()).filter(Boolean)
    : typeof expert.certifications === "string" && expert.certifications
      ? [expert.certifications.trim()].filter(Boolean)
      : [];

  const specializations =
    categoryNames.length > 0
      ? categoryNames
      : typeof expert.specialization === "string" && expert.specialization
        ? [expert.specialization]
        : [];

  const aboutParts = [
    expert.about,
    expert.bio,
    expert.why_started,
    expert.mission,
  ]
    .filter((v) => typeof v === "string" && v.trim())
    .map(String);

  const primarySpecialization =
    categoryNames[0] ||
    (typeof expert.specialization === "string" ? expert.specialization : "") ||
    "Guidance";

  return {
    slug: id,
    name,
    role: String(
      expert.professional_title || expert.profession || expert.role || "EXPERT",
    ).toUpperCase(),
    experience:
      expert.experience_years != null
        ? `${expert.experience_years}+ YEARS EXPERIENCE`
        : "EXPERIENCED GUIDE",
    bio: String(
      [expert.bio, expert.about].find((value) => hasDisplayValue(value)) ||
        `${name} is a verified Cosmicguruji expert ready to guide your journey.`,
    ).trim(),
    specialization: primarySpecialization,
    experienceDetail:
      expert.experience_years != null
        ? `${expert.experience_years}+ Years`
        : "",
    image: resolveExpertImage(expert),
    titles: String(
      expert.professional_title ||
        expert.profession ||
        expert.role ||
        "Cosmicguruji Expert",
    ).trim(),
    profession: String(expert.profession || expert.role || "Expert").trim(),
    clients: "",
    sessions:
      expert.total_sessions != null ? String(expert.total_sessions) : "",
    rating: `${expert.average_rating ?? "0.00"}/5 (${expert.total_reviews ?? 0}+)`,
    phone: String(expert.phone || expert.whatsapp_number || "—").trim(),
    whatsapp: String(expert.whatsapp_number || expert.phone || "—").trim(),
    email: String(expert.email || "—").trim(),
    location: formatExpertLocation(expert.city, expert.state, expert.country),
    languages,
    education,
    certifications,
    specializations,
    about: buildAboutParagraphs(expert),
    highlights: (() => {
      const items: { title: string; desc: string }[] = [];
      pushHighlight(items, "Why I Started", expert.why_started);
      pushHighlight(items, "My Mission", expert.mission);
      pushHighlight(items, "My Approach", expert.client_approach);
      pushHighlight(items, "What Makes Me Different", expert.uniqueness);
      return items;
    })(),
    services: mapExpertServices(expert, staticMatch),
    consultationTypes: staticMatch?.consultationTypes,
  };
}

function FadeScroll({
  children,
  className,
  dark,
  fadeFrom = "from-white",
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  fadeFrom?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [atEnd, setAtEnd] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const overflow = el.scrollHeight > el.clientHeight + 2;
      setCanScroll(overflow);
      setAtEnd(!overflow || el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [children]);

  return (
    <div className={`relative flex min-h-0 flex-col ${className ?? ""}`}>
      <div
        ref={ref}
        className={`min-h-0 flex-1 ${dark ? "expert-card-scroll-dark" : "expert-card-scroll"}`}
      >
        {children}
      </div>
      {canScroll && !atEnd && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t ${fadeFrom} to-transparent`}
        />
      )}
    </div>
  );
}

function highlightsGridClass(count: number) {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-2 lg:grid-cols-4";
}

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

export function ExpertProfileDetailView({ expert }: { expert: ExpertProfile }) {
  const firstName = expert.name.replace(/^Dr\.\s*/, "").split(" ")[0];
  const displayName = expert.name.replace(/^Cosmicguruji\s+/i, "").trim();
  const fullName = `Cosmicguruji ${displayName}`;
  const enabledConsultations = expert.consultationTypes
    ? consultationTypes.filter((type) =>
        expert.consultationTypes!.includes(type.label),
      )
    : consultationTypes;

  const visibleHighlights = expert.highlights.filter((item) =>
    hasDisplayValue(item.desc),
  );
  const visibleServices = expert.services.filter(
    (service) =>
      hasDisplayValue(service.title) || hasDisplayValue(service.desc),
  );
  const uniquenessHighlight = visibleHighlights.find(
    (item) => item.title === "What Makes Me Different",
  );
  const missionHighlight = visibleHighlights.find(
    (item) => item.title === "My Mission",
  );
  const wisdomSupport = hasDisplayValue(missionHighlight?.desc)
    ? missionHighlight!.desc
    : hasDisplayValue(expert.bio)
      ? expert.bio
      : "";

  const profileStats: { value: string; label: string }[] = [];
  if (hasDisplayValue(expert.sessions)) {
    profileStats.push({ value: expert.sessions, label: "Sessions" });
  }
  if (hasDisplayValue(expert.clients)) {
    profileStats.push({ value: expert.clients, label: "Clients" });
  }
  if (hasDisplayValue(expert.rating)) {
    profileStats.push({
      value: expert.rating.split("/")[0]?.trim() || expert.rating,
      label: "Rating",
    });
  }

  const stats: { icon: ReactNode; value: string; label: string }[] = [];
  if (hasDisplayValue(expert.sessions)) {
    stats.push({ icon: <VideoIcon />, value: expert.sessions, label: "Sessions Completed" });
  }
  if (hasDisplayValue(expert.clients)) {
    stats.push({ icon: <PeopleIcon />, value: expert.clients, label: "Clients Guided" });
  }
  if (hasDisplayValue(expert.experienceDetail)) {
    stats.push({
      icon: <CalendarIcon />,
      value: expert.experienceDetail,
      label: "Years Experience",
    });
  }
  stats.push({ icon: <ShieldIcon />, value: "100%", label: "Confidential" });
  if (hasDisplayValue(expert.rating)) {
    stats.push({ icon: <StarIcon />, value: expert.rating, label: "Ratings" });
  }

  const aboutParagraphs = expert.about.filter((para) => hasDisplayValue(para));
  const summaryAbout =
    aboutParagraphs.length > 0
      ? aboutParagraphs.slice(0, 1)
      : [expert.bio].filter((text) => hasDisplayValue(text));
  const whyChooseBio = aboutParagraphs[0] ?? (hasDisplayValue(expert.bio) ? expert.bio : null);
  const showKnowMore = aboutParagraphs.length > 1;
  const showFullAbout = aboutParagraphs.length > 1;

  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      {/* Hero — cosmic background image visible (2nd sc) */}
      <section
        className="relative min-h-[300px] overflow-hidden sm:min-h-[320px]"
        style={{
          backgroundImage: "url('/experts-page/cosmic-hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Light overlay — left side only for text readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1A0533]/82 via-[#2E004B]/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0533]/40 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-[1040px] px-4 pb-20 pt-7 sm:px-6 sm:pb-[5.5rem] sm:pt-8 lg:px-8 lg:pb-24 lg:pt-9">
          <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-center lg:gap-7">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="relative h-[118px] w-[118px] sm:h-[132px] sm:w-[132px] lg:h-[148px] lg:w-[148px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F0DDB8] to-[#A67C4A] p-[3px] shadow-[0_0_32px_rgba(212,175,55,0.3)]">
                  <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-[#2E004B]/40">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="148px"
                    />
                  </div>
                </div>
                {hasDisplayValue(expert.experienceDetail) && (
                  <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-[#D4AF37]/50 bg-[#2E004B]/90 px-2.5 py-0.5 text-[9px] font-semibold text-[#F0DDB8] shadow-lg backdrop-blur-sm sm:text-[10px]">
                    <CheckIcon />
                    {expert.experienceDetail} Experience
                  </div>
                )}
              </div>
            </div>

            {/* Hero copy */}
            <div className="min-w-0 flex-1 text-center lg:text-left">
              <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Welcome to Cosmicguruji
                <Image src="/just99/star.png" alt="" width={12} height={12} unoptimized />
              </p>

              <h1
                className="mt-2 text-[26px] font-semibold leading-[1.1] text-white sm:text-[32px] lg:text-[36px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                <span className="text-[#D4AF37]">Cosmicguruji </span>
                {displayName}
              </h1>

              <p
                className="mt-1.5 text-[13px] font-medium italic text-[#E8C69F] sm:text-[14px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {expert.titles}
              </p>

              {hasDisplayValue(expert.bio) && (
                <p className="mx-auto mt-3 max-w-[500px] text-[12px] leading-[1.65] text-white/75 sm:text-[13px] lg:mx-0">
                  {expert.bio}
                </p>
              )}

              {(hasDisplayValue(expert.location) || expert.languages.length > 0) && (
                <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  {hasDisplayValue(expert.location) && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] text-white/85 backdrop-blur-sm">
                      <LocationIcon /> {expert.location}
                    </span>
                  )}
                  {expert.languages.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] text-white/85 backdrop-blur-sm">
                      <GlobeMiniIcon /> {expert.languages.join(", ")}
                    </span>
                  )}
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                <Link
                  href="/#book"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F0DDB8] via-[#D4AF37] to-[#A67C4A] px-5 py-2.5 text-[12px] font-semibold text-[#2E004B] shadow-[0_6px_20px_rgba(212,175,55,0.3)] transition hover:brightness-105"
                >
                  <CalendarIcon /> Book Consultation
                </Link>
                {visibleServices.length > 0 && (
                  <a
                    href="#expert-services"
                    className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/8 px-5 py-2.5 text-[12px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/14"
                  >
                    Explore Services <ArrowIcon />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar — overlaps hero, compact */}
      <section className="relative z-10 mx-auto max-w-[920px] px-4 sm:px-6 lg:px-8">
        <div
          className={[
            "-mt-10 grid grid-cols-2 gap-0 overflow-hidden rounded-xl border border-[#E8EAF4] bg-white shadow-[0_12px_36px_rgba(46,0,75,0.1)] sm:-mt-12",
            stats.length >= 5
              ? "md:grid-cols-5"
              : stats.length === 4
                ? "md:grid-cols-4"
                : stats.length === 3
                  ? "md:grid-cols-3"
                  : "md:grid-cols-2",
          ].join(" ")}
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={[
                "flex flex-col items-center justify-center px-2 py-3.5 text-center sm:py-4",
                idx !== stats.length - 1 ? "md:border-r md:border-[#EEF0FA]" : "",
                idx % 2 === 0 && idx < stats.length - 1 ? "border-r border-[#EEF0FA] md:border-r" : "",
                idx < stats.length - 2 ? "border-b border-[#EEF0FA] md:border-b-0" : "",
                idx === stats.length - 1 && stats.length % 2 === 1
                  ? "col-span-2 md:col-span-1"
                  : "",
              ].join(" ")}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDEAF8] text-[#3D3D8F]">
                {stat.icon}
              </span>
              <p className="mt-1.5 text-[15px] font-semibold leading-none text-[#2E004B] sm:text-[16px]">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] text-[#6B6B8A]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About — row height follows the blue card; left/middle match and scroll */}
      <section id="expert-about" className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch lg:gap-6">
          <div className="relative h-full lg:col-span-5">
            <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#E8EAF4] bg-white p-5 shadow-[0_4px_24px_rgba(46,0,75,0.05)] sm:p-6 lg:absolute lg:inset-0">
              <div className="shrink-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  About Me +
                </p>
                <h2
                  className="mt-2 text-[22px] font-semibold leading-tight text-[#2E004B] sm:text-[24px]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  About {fullName}
                </h2>
                <p className="mt-1 text-[12px] text-[#8A8AA8]">Who am I in short</p>
              </div>

              {summaryAbout.length > 0 && (
                <FadeScroll className="mt-4 min-h-0 flex-1 max-lg:max-h-[220px]">
                  <div className="space-y-3 text-justify text-[13px] leading-[1.75] text-[#4A4A6A]">
                    {summaryAbout.map((para, index) => (
                      <p key={`about-${index}`}>{para}</p>
                    ))}
                  </div>
                </FadeScroll>
              )}

              {showKnowMore && (
                <p className="mt-2 shrink-0 text-[11px] text-[#8A8AA8]">
                  +{aboutParagraphs.length - 1} more in full profile below
                </p>
              )}

              {showKnowMore && (
                <div className="mt-auto shrink-0 pt-4">
                  <a
                    href="#expert-about-full"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#2E004B]/12 bg-[#F7F5FC] px-4 py-2.5 text-[12px] font-semibold text-[#2E004B] transition hover:border-[#D4AF37]/40 sm:w-auto"
                  >
                    Know More About Me <ArrowIcon />
                  </a>
                </div>
              )}
            </article>
          </div>

          <div className="relative h-full lg:col-span-4">
            <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#E8EAF4] bg-white p-5 shadow-[0_4px_24px_rgba(46,0,75,0.05)] sm:p-6 lg:absolute lg:inset-0">
              <h3
                className="shrink-0 text-[16px] font-semibold text-[#2E004B]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Professional Details
              </h3>

              <div className="mt-4 shrink-0 grid grid-cols-2 items-start gap-x-3 gap-y-1 sm:gap-x-5 sm:gap-y-0">
                <DetailRow label="Profession" value={expert.profession} />
                <DetailRow label="Experience" value={expert.experienceDetail} />
                <DetailRow label="Location" value={expert.location} />
                <DetailRow label="Languages" value={expert.languages.join(", ")} />
                <DetailRow label="Education" value={expert.education.join(" • ")} />
              </div>

              {(expert.specializations.length > 0 || expert.certifications.length > 0) && (
                <FadeScroll className="mt-4 min-h-0 flex-1 border-t border-[#EEF0FA] pt-4 max-lg:max-h-[200px]">
                  {expert.specializations.length > 0 && (
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A8AA8]">
                        Core Specializations
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {expert.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="rounded-full border border-[#E8EAF4] bg-[#FAFBFF] px-3 py-1 text-[11px] font-medium text-[#4A4A6A]"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {expert.certifications.length > 0 && (
                    <div className={expert.specializations.length > 0 ? "mt-4" : ""}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A8AA8]">
                        Certifications
                      </p>
                      <ul className="mt-2.5 space-y-1.5">
                        {expert.certifications.map((cert) => (
                          <li key={cert} className="flex items-start gap-2 text-[11px] text-[#4A4A6A]">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#D4AF37]" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </FadeScroll>
              )}

              {profileStats.length > 0 && (
                <div
                  className={`mt-auto grid shrink-0 gap-2 border-t border-[#EEF0FA] pt-4 ${
                    profileStats.length === 1
                      ? "grid-cols-1"
                      : profileStats.length === 2
                        ? "grid-cols-2"
                        : "grid-cols-3"
                  }`}
                >
                  {profileStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl bg-[#FAFBFF] px-2 py-2.5 text-center"
                    >
                      <p className="text-[13px] font-semibold leading-tight text-[#2E004B] sm:text-[14px]">
                        {item.value}
                      </p>
                      <p className="mt-0.5 text-[10px] text-[#8A8AA8]">{item.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>

          <article
            className="relative flex min-h-0 flex-col overflow-hidden rounded-2xl lg:col-span-3 lg:min-h-[400px] lg:max-h-[560px]"
            style={{
              backgroundImage: "url('/experts-page/cosmic-hero-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#2E004B]/30 via-[#2E004B]/50 to-[#1A0533]/90" />
            <div className="relative flex h-full min-h-0 flex-col p-5 sm:p-6">
              <div className="shrink-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                  Words of Wisdom
                </p>
                {hasDisplayValue(expert.titles) && (
                  <p className="mt-2 text-[12px] italic text-white/75">{expert.titles}</p>
                )}
              </div>

              <FadeScroll
                dark
                fadeFrom="from-[#1A0533]"
                className="mt-4 min-h-0 flex-1 max-lg:max-h-[260px]"
              >
                <div>
                  <span className="text-[28px] leading-none text-[#D4AF37]">&ldquo;</span>
                  <p
                    className="mt-1 text-[15px] font-medium leading-snug text-white"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    The stars incline us, they do not bind us.
                  </p>
                  {hasDisplayValue(wisdomSupport) && (
                    <p className="mt-3 text-justify text-[11px] leading-relaxed text-white/80">
                      {wisdomSupport}
                    </p>
                  )}
                </div>

                {uniquenessHighlight && (
                  <div className="mt-4 rounded-xl border border-white/15 bg-white/10 px-3.5 py-3 backdrop-blur-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#F0DDB8]">
                      {uniquenessHighlight.title}
                    </p>
                    <p className="mt-1.5 text-justify text-[11px] leading-relaxed text-white/80">
                      {uniquenessHighlight.desc}
                    </p>
                  </div>
                )}
              </FadeScroll>
            </div>
          </article>
        </div>

        {visibleHighlights.length > 0 && (
          <div
            className={`mt-5 grid items-stretch gap-3 ${highlightsGridClass(visibleHighlights.length)}`}
          >
            {visibleHighlights.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-2xl border border-[#E8EAF4] bg-white px-4 py-4 shadow-[0_4px_24px_rgba(46,0,75,0.04)] sm:px-5 sm:py-5"
              >
                <div className="flex shrink-0 items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EDEAF8] text-[#3D3D8F]">
                    <LotusIcon />
                  </span>
                  <h4 className="text-[13px] font-semibold leading-snug text-[#2E004B]">
                    {item.title}
                  </h4>
                </div>
                <FadeScroll className="mt-3 h-[158px]" fadeFrom="from-white">
                  <p className="text-justify text-[12px] leading-relaxed text-[#5C5C7A]">
                    {item.desc}
                  </p>
                </FadeScroll>
              </article>
            ))}
          </div>
        )}

        {showFullAbout && (
          <div
            id="expert-about-full"
            className="mt-8 rounded-2xl border border-[#E8EAF4] bg-white px-6 py-8 shadow-[0_8px_32px_rgba(46,0,75,0.05)] sm:px-8"
          >
            <SectionHeading title="More About Me" />
            <div className="mt-8 space-y-4 text-justify text-[13px] leading-[1.85] text-[#4A4A6A] sm:text-[14px]">
              {aboutParagraphs.map((para, index) => (
                <p key={`full-about-${index}`}>{para}</p>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Services Offered */}
      {visibleServices.length > 0 && (
        <section id="expert-services" className="bg-[#F7F5FC] py-12 sm:py-16">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="What I Offer"
              title="Services Offered"
            />

            <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {visibleServices.map((service, index) => {
                const featured = index === 0;
                return (
                  <article
                    key={`${service.title}-${index}`}
                    className={[
                      "relative flex h-full flex-col rounded-2xl px-4 py-5 text-center transition hover:-translate-y-0.5 sm:px-5 sm:py-5",
                      featured
                        ? "bg-gradient-to-br from-[#2E004B] via-[#3D1068] to-[#2E004B] text-white shadow-[0_12px_36px_rgba(46,0,75,0.25)]"
                        : "border border-[#E4E2EF] bg-white shadow-[0_4px_20px_rgba(46,0,75,0.06)] hover:border-[#D4AF37]/35",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        featured
                          ? "bg-[#D4AF37]/20 text-[#F0DDB8]"
                          : "bg-[#EDEAF8] text-[#3D3D8F]",
                      ].join(" ")}
                    >
                      <ServiceCardIcon index={index} />
                    </span>
                    <FadeScroll
                      dark={featured}
                      fadeFrom={featured ? "from-[#2E004B]" : "from-white"}
                      className="mt-3 h-[176px]"
                    >
                      {hasDisplayValue(service.title) && (
                        <h3
                          className={[
                            "text-[15px] font-semibold leading-snug sm:text-[16px]",
                            featured ? "text-white" : "text-[#2E004B]",
                          ].join(" ")}
                          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                        >
                          {service.title}
                        </h3>
                      )}
                      {hasDisplayValue(service.desc) && (
                        <p
                          className={[
                            "mx-auto mt-2 text-justify text-[12px] leading-[1.6]",
                            featured ? "text-white/75" : "text-[#5C5C7A]",
                          ].join(" ")}
                        >
                          {service.desc}
                        </p>
                      )}
                    </FadeScroll>
                    {featured ? (
                      <Link
                        href="/#book"
                        className="mt-3 inline-flex shrink-0 items-center justify-center gap-1 self-center rounded-full bg-[#D4AF37] px-4 py-1.5 text-[12px] font-semibold text-[#2E004B] transition hover:brightness-105"
                      >
                        Book Now <ArrowIcon />
                      </Link>
                    ) : (
                      <div className="mt-3 h-[30px] shrink-0" aria-hidden />
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Consultation Types */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Choose Your Path" title="Consultation Types" />

          <div className="mt-10 grid grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-4">
            {enabledConsultations.map((type) => (
              <div
                key={type.label}
                className="group flex h-full flex-col rounded-2xl border border-[#E4E2EF] bg-white px-3 py-4 text-center shadow-[0_2px_12px_rgba(46,0,75,0.04)] transition hover:border-[#D4AF37]/35 hover:shadow-[0_8px_24px_rgba(46,0,75,0.08)] sm:px-4 sm:py-5"
              >
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F2F8] text-[#3D3D8F] transition group-hover:bg-[#EDEAF8] sm:h-11 sm:w-11">
                  {type.icon}
                </span>
                <p className="mt-2 text-[12px] font-semibold text-[#2E004B] sm:mt-3 sm:text-[14px]">
                  {type.label}
                </p>
                <p className="mt-1 text-[10px] leading-relaxed text-[#6B6B8A] sm:mt-1.5 sm:text-[11px]">
                  {type.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose — dark banner */}
      <section className="bg-[#2E004B] py-6 sm:py-8">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center sm:gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left">
            <div className="w-full max-w-lg">
              <h2
                className="text-[20px] font-semibold leading-snug text-white sm:text-[24px] lg:text-[26px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Why Choose {fullName}?
              </h2>
              {whyChooseBio && (
                <p className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-white/70 sm:text-[13px]">
                  {whyChooseBio}
                </p>
              )}
              <Link
                href="/#book"
                className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F0DDB8] via-[#D4AF37] to-[#A67C4A] px-5 py-2 text-[12px] font-semibold text-[#2E004B] shadow-[0_6px_20px_rgba(212,175,55,0.28)] transition hover:brightness-105 sm:px-5 sm:py-2.5 sm:text-[13px]"
              >
                Book Your Consultation <ArrowIcon />
              </Link>
            </div>
            <div className="grid w-full grid-cols-4 gap-2 sm:gap-3 lg:w-auto lg:gap-5">
              <WhyChooseItem icon={<StarIcon />} label="Trusted Expert" />
              <WhyChooseItem icon={<ShieldIcon />} label="100% Secure" />
              <WhyChooseItem icon={<PeopleIcon />} label="Happy Clients" />
              <WhyChooseItem icon={<HeartIcon />} label="Satisfaction" />
            </div>
          </div>
        </div>
      </section>

      <ExpertReviewsSection expertSlug={expert.slug} ratingLabel={expert.rating} />

      {/* Journey CTA — compact */}
      <section className="bg-gradient-to-br from-[#F7F5FC] via-[#EDEAF8] to-[#F7F5FC] py-8 sm:py-10">
        <div className="mx-auto max-w-[920px] rounded-2xl border border-[#E8EAF4]/80 bg-white/40 px-5 py-6 sm:px-7 sm:py-7">
          <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[1fr_140px] lg:gap-6">
            <div className="text-center lg:text-left">
              <h2
                className="text-[22px] font-semibold leading-tight text-[#2E004B] sm:text-[26px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Start Your Journey Towards a Better Tomorrow
              </h2>
              <p className="mx-auto mt-2 max-w-md text-[12px] leading-relaxed text-[#5C5C7A] sm:text-[13px] lg:mx-0">
                Book a session with {firstName} and take the first step towards clarity,
                healing, and transformation.
              </p>
              <Link
                href="/#book"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2E004B] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_18px_rgba(46,0,75,0.18)] transition hover:bg-[#3D1068]"
              >
                Book Consultation Now <ArrowIcon />
              </Link>
            </div>
            <div className="relative mx-auto h-[120px] w-[120px] sm:h-[140px] sm:w-[140px] lg:mx-0 lg:justify-self-end">
              <Image
                src="/just99/meditate.png"
                alt=""
                fill
                unoptimized
                className="object-contain"
                sizes="140px"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="text-center">
      {eyebrow && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
          {eyebrow}
        </p>
      )}
      <h2
        className={`${eyebrow ? "mt-2" : ""} text-[28px] font-semibold text-[#2E004B] sm:text-[32px]`}
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {title}
      </h2>
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-[#D4AF37]/60 sm:w-24" />
        <Image src="/just99/lotus.png" alt="" width={22} height={22} unoptimized />
        <span className="h-px w-16 bg-[#D4AF37]/60 sm:w-24" />
      </div>
    </div>
  );
}

function WhyChooseItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center sm:gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#F0DDB8] sm:h-10 sm:w-10 lg:h-11 lg:w-11">
        {icon}
      </span>
      <p className="text-[9px] font-medium leading-tight text-white/85 sm:text-[11px] lg:text-[12px]">
        {label}
      </p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!hasDisplayValue(value)) return null;

  return (
    <div className="mt-2.5 border-b border-[#F3F4FA] pb-2.5 sm:last:border-b-0 sm:last:pb-0">
      <p className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#8A8AA8] sm:text-[10px]">
        {label}
      </p>
      <p className="mt-0.5 text-[11px] font-medium leading-snug text-[#1A1A4A] sm:text-[12px]">
        {value}
      </p>
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
