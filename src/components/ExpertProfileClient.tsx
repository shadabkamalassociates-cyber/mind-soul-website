"use client";

import { useEffect, useMemo } from "react";
import { notFound } from "next/navigation";
import ExpertProfileDetail from "@/components/ExpertProfileDetail";
import { getExpertBySlug, type ExpertProfile } from "@/data/experts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchExpertById } from "@/store/slices/expertsSlice";
import type { Expert } from "@/types/expert";

function toProfile(expert: Expert): ExpertProfile {
  const id = String(expert.id ?? "");
  const name =
    [expert.first_name, expert.last_name].filter(Boolean).join(" ") ||
    String(expert.name ?? "Expert");

  const languages = Array.isArray(expert.languages)
    ? expert.languages.map(String)
    : typeof expert.languages === "string" && expert.languages
      ? expert.languages.split(",").map((s) => s.trim())
      : ["English", "Hindi"];

  const education = Array.isArray(expert.education)
    ? expert.education.map(String)
    : typeof expert.education === "string" && expert.education
      ? [expert.education]
      : [];

  const certifications = Array.isArray(expert.certifications)
    ? expert.certifications.map(String)
    : typeof expert.certifications === "string" && expert.certifications
      ? [expert.certifications]
      : [];

  const specializations =
    typeof expert.specialization === "string" && expert.specialization
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
      expert.bio ||
        expert.about ||
        "Verified SoulSensei expert ready to guide your journey.",
    ),
    specialization: String(expert.specialization || "Guidance"),
    experienceDetail:
      expert.experience_years != null
        ? `${expert.experience_years}+ Years`
        : "—",
    image: String(expert.profile_image || "/experts-page/expert-1-cutout.png"),
    titles: String(
      expert.professional_title ||
        expert.profession ||
        expert.role ||
        "SoulSensei Expert",
    ),
    profession: String(expert.profession || expert.role || "Expert"),
    clients: "—",
    sessions: String(expert.total_sessions ?? "—"),
    rating: `${expert.average_rating ?? "0.00"}/5 (${expert.total_reviews ?? 0}+)`,
    phone: String(expert.phone || expert.whatsapp_number || "—"),
    whatsapp: String(expert.whatsapp_number || expert.phone || "—"),
    email: String(expert.email || "—"),
    location: [expert.city, expert.state, expert.country]
      .filter(Boolean)
      .join(", ") || "India",
    languages,
    education,
    certifications,
    specializations,
    about:
      aboutParts.length > 0
        ? aboutParts
        : [
            `${name} is a verified SoulSensei expert dedicated to helping seekers with clarity and transformation.`,
          ],
    highlights: [
      {
        title: "Why I Started",
        desc: String(expert.why_started || "To support seekers on their growth journey."),
      },
      {
        title: "My Mission",
        desc: String(expert.mission || "Empower lasting clarity, healing, and confidence."),
      },
      {
        title: "My Approach",
        desc: String(
          expert.client_approach ||
            "Compassionate, practical guidance tailored to each person.",
        ),
      },
      {
        title: "What Makes Me Different",
        desc: String(
          expert.uniqueness ||
            "A personalized, trustworthy approach rooted in care and clarity.",
        ),
      },
    ],
    services: [
      {
        title: "1:1 Consultation",
        desc: "Personalized guidance session tailored to your goals and questions.",
      },
      {
        title: "Live Session",
        desc: "Join interactive live sessions for real-time insight and support.",
      },
    ],
  };
}

export default function ExpertProfileClient({ slug }: { slug: string }) {
  const staticExpert = useMemo(() => getExpertBySlug(slug), [slug]);
  const dispatch = useAppDispatch();
  const { selected, error, status } = useAppSelector((s) => s.experts);

  const isStatic = Boolean(staticExpert);
  const looksLikeApiId =
    !isStatic &&
    (/^[0-9a-f-]{36}$/i.test(slug) || /^\d+$/.test(slug) || slug.length > 8);

  useEffect(() => {
    if (!isStatic && looksLikeApiId) {
      dispatch(fetchExpertById(slug));
    }
  }, [dispatch, isStatic, looksLikeApiId, slug]);

  if (staticExpert) {
    return <ExpertProfileDetail expert={staticExpert} />;
  }

  if (!looksLikeApiId) {
    notFound();
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4 text-center text-[#B42318]">
        {error}
      </main>
    );
  }

  if (!selected || String(selected.id) !== slug) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4 text-[#8A8AA8]">
        {status === "loading" || !selected
          ? "Loading expert profile..."
          : "Expert not found"}
      </main>
    );
  }

  return <ExpertProfileDetail expert={toProfile(selected)} />;
}
