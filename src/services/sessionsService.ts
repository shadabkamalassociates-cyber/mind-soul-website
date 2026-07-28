import type { CreateSessionPayload, Session } from "@/types/session";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
  extractData,
  extractList,
} from "@/services/apiClient";

const DEFAULT_SESSION_IMAGE = "/live-sessions/astrology-card.png";
const DEFAULT_EXPERT_AVATAR = "/experts-page/expert-1-cutout.png";

export type SessionUiContext = {
  categoryById?: Map<string, string>;
  expertById?: Map<
    string,
    { name: string; role: string; avatar: string }
  >;
};

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function readNestedName(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (value && typeof value === "object" && "name" in value) {
    const name = (value as { name?: unknown }).name;
    if (typeof name === "string" && name.trim()) return name.trim();
  }
  return undefined;
}

function resolveCategory(session: Session, ctx?: SessionUiContext) {
  const fromApi =
    readNestedName(session.category) ??
    (typeof session.category_name === "string" ? session.category_name : undefined);

  if (fromApi && !isUuid(fromApi)) return fromApi;

  const id = String(session.category_id ?? "");
  const fromMap = ctx?.categoryById?.get(id);
  if (fromMap) return fromMap;
  if (id && !isUuid(id)) return id;

  return "Live Session";
}

function resolveExpert(session: Session, ctx?: SessionUiContext) {
  const fromApi =
    (typeof session.expert_name === "string" ? session.expert_name : undefined) ??
    readNestedName(session.expert);

  const id = String(session.expert_id ?? "");
  const fromMap = ctx?.expertById?.get(id);
  if (fromMap) return fromMap;

  if (fromApi && !isUuid(fromApi)) {
    return {
      name: fromApi,
      role: "SoulSensei Expert",
      avatar: DEFAULT_EXPERT_AVATAR,
    };
  }

  return {
    name: "SoulSensei Expert",
    role: "Verified Guide",
    avatar: DEFAULT_EXPERT_AVATAR,
  };
}

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

export function mapSessionForUi(session: Session, ctx?: SessionUiContext) {
  const id = String(session.id ?? session._id ?? "");
  const title = String(session.title ?? "Untitled Session");
  const start = session.start_time ? new Date(String(session.start_time)) : null;
  const expert = resolveExpert(session, ctx);
  const thumbnail = String(session.thumbnail ?? "").trim();

  return {
    id,
    slug: session.slug ?? id,
    categoryId: String(session.category_id ?? ""),
    category: resolveCategory(session, ctx),
    title,
    subtitle: String(session.description ?? "").slice(0, 120),
    expert: expert.name,
    role: expert.role,
    avatar: expert.avatar,
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
    image: thumbnail || DEFAULT_SESSION_IMAGE,
    description: String(session.description ?? ""),
    raw: session,
  };
}

export type { Session };
export type UiSession = ReturnType<typeof mapSessionForUi>;
