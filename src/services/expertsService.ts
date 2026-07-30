import { experts as staticExperts } from "@/data/experts";
import type { Expert } from "@/types/expert";
import {
  ApiError,
  apiDelete,
  apiGet,
  apiPatch,
  apiPut,
  extractData,
  extractList,
} from "@/services/apiClient";

/** List API omits profile fields; keep display labels in sync with full profiles. */
const EXPERT_SPECIALIZATION_BY_EMAIL: Record<string, string> = {
  "visiontoreality.com@gmail.com": "Training & Education",
  "shivalaxmi.jgd555@gmail.com": "Occult Science & Energy Healing",
  "09jyotirajput1@gmail.com": "Vedic Astrology, Numerology & Tarot Reading",
};

const EXPERT_TITLE_BY_EMAIL: Record<string, string> = {
  "visiontoreality.com@gmail.com": "Mind Trainer & Motivational Speaker",
  "shivalaxmi.jgd555@gmail.com": "Psychic Medium & Healer",
  "09jyotirajput1@gmail.com": "Hypnotherapist",
};

function normalizeExpertEmail(email: unknown): string {
  return String(email ?? "")
    .trim()
    .toLowerCase();
}

function findStaticExpertMatch(expert: Expert) {
  const email = normalizeExpertEmail(expert.email);
  if (email) {
    const byEmail = staticExperts.find(
      (item) => normalizeExpertEmail(item.email) === email,
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

function formatSpecialization(value: string): string {
  const trimmed = value.trim().replace(/,\s*$/, "");
  if (!trimmed) return trimmed;

  if (trimmed.toLowerCase() === "occult science") {
    return "Occult Science & Energy Healing";
  }

  return trimmed;
}

export function resolveExpertTitle(expert: Expert): string {
  const fromApi =
    (typeof expert.professional_title === "string" &&
      expert.professional_title.trim()) ||
    (typeof expert.profession === "string" && expert.profession.trim()) ||
    "";

  if (fromApi) return fromApi.replace(/,\s*$/, "");

  const email = normalizeExpertEmail(expert.email);
  if (email && EXPERT_TITLE_BY_EMAIL[email]) {
    return EXPERT_TITLE_BY_EMAIL[email];
  }

  const staticMatch = findStaticExpertMatch(expert);
  if (staticMatch?.role) {
    return staticMatch.role;
  }

  return "Expert";
}

export function resolveExpertSpecialization(expert: Expert): string {
  const fromApi =
    typeof expert.specialization === "string" ? expert.specialization.trim() : "";
  if (fromApi) return formatSpecialization(fromApi);

  const email = normalizeExpertEmail(expert.email);
  if (email && EXPERT_SPECIALIZATION_BY_EMAIL[email]) {
    return EXPERT_SPECIALIZATION_BY_EMAIL[email];
  }

  const staticMatch = findStaticExpertMatch(expert);
  if (staticMatch?.specialization) {
    return staticMatch.specialization;
  }

  const profession =
    typeof expert.profession === "string" ? expert.profession.trim() : "";
  if (profession) return profession;

  const title =
    typeof expert.professional_title === "string"
      ? expert.professional_title.trim().replace(/,\s*$/, "")
      : "";
  if (title) return title;

  return "Spiritual Guidance";
}

export async function fetchAllExperts() {
  const res = await apiGet("/experts/fetch-all", false);
  return extractList<Expert>(res);
}

export async function fetchExpertById(id: string | number) {
  const res = await apiGet(`/experts/fetch-by-id/${id}`, false);
  return extractData<Expert>(res);
}

export async function fetchVerifiedExperts() {
  const res = await apiGet("/experts/fetch-all?status=VERIFIED", false);
  return extractList<Expert>(res);
}

export async function fetchExpertByIdFromAll(id: string | number) {
  try {
    return await fetchExpertById(id);
  } catch (err) {
    if (!(err instanceof ApiError) || err.status !== 404) {
      throw err;
    }
  }

  const res = await apiGet(
    `/experts/fetch-all?id=${encodeURIComponent(String(id))}`,
    false,
  );
  const list = extractList<Expert>(res);
  const fromList =
    list.find((item) => String(item.id ?? item._id ?? "") === String(id)) ??
    list[0];

  if (fromList) return fromList;

  // fetch-all?id= returns data as a single object, not an array
  const single = extractData<Expert>(res);
  if (single && typeof single === "object" && (single.id ?? single._id)) {
    return single;
  }

  throw new ApiError("Expert not found", 404);
}

export async function fetchBlockedExperts(_id?: string | number) {
  // Backend route is /experts/fetch-blocked-users (no :id required)
  const res = await apiGet("/experts/fetch-blocked-users", false);
  return extractList<Expert>(res);
}

export async function updateExpert(id: string | number, body: unknown) {
  return apiPut(`/experts/update/${id}`, body);
}

export async function deleteExperts(ids: Array<string | number>) {
  return apiDelete("/experts/delete", ids);
}

export async function blockExpert(
  id: string | number,
  body: { user_id: string | number; reason: string },
) {
  // Backend accepts PATCH (POST returns Cannot POST)
  return apiPatch(`/experts/block/${id}`, body);
}

export async function verifyExpert(
  id: string | number,
  body: { user_id: string | number; status: string; reason: string },
) {
  // Backend accepts PATCH (POST returns Cannot POST)
  return apiPatch(`/experts/verify/${id}`, body);
}

export function getExpertCardBio(bio: string): string {
  const fallback = "Verified SoulSensei expert ready to guide your journey.";
  const normalized = bio.replace(/\s+/g, " ").trim();
  if (!normalized) return fallback;

  const jaiGurudevMarker = /jai\s*gurudev\s*ji\s*maharaj/i;
  const markerMatch = normalized.match(jaiGurudevMarker);
  if (markerMatch && markerMatch.index !== undefined) {
    const periodIdx = normalized.indexOf(".", markerMatch.index);
    if (periodIdx !== -1) {
      return normalized.slice(0, periodIdx + 1).trim();
    }
  }

  const firstSentence = normalized.match(/^[^.!?]+[.!?]/);
  if (firstSentence) {
    return firstSentence[0].trim();
  }

  return normalized.length > 140
    ? `${normalized.slice(0, 137).trim()}...`
    : normalized;
}

export function mapExpertForUi(expert: Expert) {
  const id = String(expert.id ?? expert._id ?? "");
  const name =
    (typeof expert.name === "string" && expert.name) ||
    [expert.first_name, expert.last_name].filter(Boolean).join(" ") ||
    "Expert";

  const title = resolveExpertTitle(expert);

  const experienceYears = expert.experience_years;
  const experience =
    experienceYears != null && experienceYears !== ""
      ? `${experienceYears}+ Years`
      : "—";

  const normalizeText = (value: unknown) =>
    String(value ?? "")
      .replace(/\s+/g, " ")
      .trim();

  return {
    id,
    slug: id,
    name: normalizeText(name),
    email: String(expert.email ?? ""),
    phone: String(expert.phone ?? ""),
    title: normalizeText(title),
    bio: normalizeText(expert.bio ?? expert.about),
    image: String(
      expert.profile_image || "/experts-page/expert-1-cutout.png",
    ),
    experience,
    specialization: resolveExpertSpecialization(expert),
    rating: String(expert.average_rating ?? "0.00"),
    isVerified: Boolean(expert.is_verified),
    verificationStatus: String(expert.verification_status ?? ""),
    raw: expert,
  };
}

export type UiExpert = ReturnType<typeof mapExpertForUi>;
