import type { CreateSessionPayload, Session } from "@/types/session";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
  extractData,
  extractList,
} from "@/services/apiClient";

export async function fetchAllSessions() {
  const res = await apiGet("/sessions/fetch-all", false);
  return extractList<Session>(res);
}

export async function fetchSessionsByCategory(categoryId: string | number) {
  const res = await apiGet(
    `/sessions/fetch-by-category/${categoryId}`,
    false,
  );
  return extractList<Session>(res);
}

export async function fetchSessionsByExpert(expertId: string | number) {
  const res = await apiGet(`/sessions/fetch-by-expert/${expertId}`, false);
  return extractList<Session>(res);
}

export async function createLiveSession(body: CreateSessionPayload) {
  return apiPost("/sessions/live/create", body);
}

export async function createRecordedSession(body: CreateSessionPayload) {
  return apiPost("/sessions/recorded/create", body);
}

export async function updateSession(
  id: string | number,
  body: Partial<CreateSessionPayload>,
) {
  return apiPut(`/sessions/update/${id}`, body);
}

export async function deleteSessions(ids: Array<string | number>) {
  return apiDelete("/sessions/delete", ids);
}

export async function fetchSessionById(id: string | number) {
  // No dedicated fetch-by-id in API list — fall back to list filter
  const all = await fetchAllSessions();
  const found = all.find(
    (s) => String(s.id ?? s._id) === String(id) || s.slug === String(id),
  );
  return found ?? null;
}

export function mapSessionForUi(session: Session) {
  const id = String(session.id ?? session._id ?? "");
  const title = String(session.title ?? "Untitled Session");
  const start = session.start_time ? new Date(String(session.start_time)) : null;

  return {
    id,
    slug: session.slug ?? id,
    categoryId: String(session.category_id ?? ""),
    category: String(session.category_id ?? ""),
    title,
    subtitle: String(session.description ?? "").slice(0, 120),
    expert: String(
      (session as { expert_name?: string }).expert_name ??
        session.expert_id ??
        "Expert",
    ),
    role: "SoulSensei Expert",
    avatar: String(session.thumbnail || "/experts-page/expert-1-cutout.png"),
    date: start
      ? start.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "TBA",
    time: start
      ? start.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "TBA",
    duration: session.duration_minutes
      ? `${session.duration_minutes} min`
      : "—",
    price: session.price != null ? String(session.price) : "—",
    image: String(session.thumbnail || "/live-sessions/astrology-card.png"),
    description: String(session.description ?? ""),
    raw: session,
  };
}

export type { Session };
export type UiSession = ReturnType<typeof mapSessionForUi>;
