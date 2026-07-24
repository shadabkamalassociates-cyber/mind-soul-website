import type { Expert } from "@/types/expert";
import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPut,
  extractData,
  extractList,
} from "@/services/apiClient";

/**
 * Expert APIs (verified against backend):
 * GET    /experts/fetch-all
 * GET    /experts/fetch-by-id/:id
 * GET    /experts/fetch-verified-users   → { users: [] }
 * GET    /experts/fetch-blocked-users   → { users: [] }  (no :id)
 * PUT    /experts/update/:id
 * DELETE /experts/delete                body: [ids]
 * PATCH  /experts/block/:id             body: { user_id, reason }
 * PATCH  /experts/verify/:id            body: { user_id, status, reason }
 */

export async function fetchAllExperts() {
  // NOTE: plural /experts — /expert/fetch-all returns 404
  const res = await apiGet("/experts/fetch-all", false);
  return extractList<Expert>(res);
}

export async function fetchExpertById(id: string | number) {
  const res = await apiGet(`/experts/fetch-by-id/${id}`, false);
  return extractData<Expert>(res);
}

export async function fetchVerifiedExperts() {
  const res = await apiGet("/experts/fetch-verified-users", false);
  return extractList<Expert>(res);
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

export function mapExpertForUi(expert: Expert) {
  const id = String(expert.id ?? expert._id ?? "");
  const name =
    (typeof expert.name === "string" && expert.name) ||
    [expert.first_name, expert.last_name].filter(Boolean).join(" ") ||
    "Expert";

  const title =
    (typeof expert.professional_title === "string" &&
      expert.professional_title) ||
    (typeof expert.profession === "string" && expert.profession) ||
    (typeof expert.role === "string" && expert.role) ||
    "Expert";

  const experienceYears = expert.experience_years;
  const experience =
    experienceYears != null && experienceYears !== ""
      ? `${experienceYears}+ Years`
      : "—";

  return {
    id,
    slug: id,
    name: String(name),
    email: String(expert.email ?? ""),
    phone: String(expert.phone ?? ""),
    title: String(title),
    bio: String(expert.bio ?? expert.about ?? ""),
    image: String(
      expert.profile_image || "/experts-page/expert-1-cutout.png",
    ),
    experience,
    specialization: String(expert.specialization ?? "—"),
    rating: String(expert.average_rating ?? "0.00"),
    isVerified: Boolean(expert.is_verified),
    verificationStatus: String(expert.verification_status ?? ""),
    raw: expert,
  };
}

export type UiExpert = ReturnType<typeof mapExpertForUi>;
