import type { CreateSessionPayload, Session } from "@/types/session";
import type { RecordedVideo } from "@/types/recordedVideo";
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

function resolveRecordedCategory(session: Session, ctx?: SessionUiContext) {
  const label = resolveCategory(session, ctx);
  return label === "Live Session" ? "Recorded Session" : label;
}

function formatRecordedDuration(minutes: unknown) {
  const mins = Number(minutes) || 0;
  if (mins >= 60) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const duration = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
    const durationLabel = m > 0 ? `${h}h ${m}m` : `${h}h`;
    return { duration, durationLabel };
  }
  return {
    duration: `00:${String(mins).padStart(2, "0")}:00`,
    durationLabel: `${mins} min`,
  };
}

function formatPrice(price: unknown) {
  if (price == null || price === "") return "—";
  const s = String(price);
  return s.startsWith("₹") ? s : `₹${s}`;
}

function resolveExpert(session: Session, ctx?: SessionUiContext) {
  const firstName =
    typeof session.expert_first_name === "string"
      ? session.expert_first_name.trim()
      : "";
  const lastName =
    typeof session.expert_last_name === "string"
      ? session.expert_last_name.trim()
      : "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const profileImage =
    typeof session.expert_profile_image === "string" &&
    session.expert_profile_image.trim()
      ? session.expert_profile_image.trim()
      : undefined;

  if (fullName) {
    return {
      name: fullName,
      role: "SoulSensei Expert",
      avatar: profileImage || DEFAULT_EXPERT_AVATAR,
    };
  }

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
      avatar: profileImage || DEFAULT_EXPERT_AVATAR,
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

export async function fetchAllRecordedSessions() {
  const res = await apiGet(
    "/sessions/fetch-all?session_type=RECORDED",
    false,
  );
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

export function mapSessionForRecordedUi(
  session: Session,
  ctx?: SessionUiContext,
): RecordedVideo {
  const base = mapSessionForUi(session, ctx);
  const { duration, durationLabel } = formatRecordedDuration(
    session.duration_minutes,
  );
  const description = base.description || base.subtitle;

  return {
    slug: base.slug,
    title: base.title,
    subtitle: base.subtitle || description.slice(0, 120),
    description,
    category: resolveRecordedCategory(session, ctx),
    categoryId: base.categoryId,
    image: base.image,
    heroImage: base.image,
    duration,
    durationLabel,
    rating: String(session.average_rating ?? "4.9"),
    reviews: String(session.total_reviews ?? "0"),
    students: session.max_participants
      ? String(session.max_participants)
      : "—",
    price: formatPrice(session.price),
    expert: base.expert,
    expertRole: base.role,
    expertAvatar: base.avatar,
    expertBio: `${base.expert} is a verified SoulSensei expert in ${resolveRecordedCategory(session, ctx)}.`,
    expertStats: [
      { label: "Experience", value: "10+" },
      { label: "Students", value: "—" },
      { label: "Rating", value: String(session.average_rating ?? "4.9") },
    ],
    level: "All Levels",
    language: String(session.language ?? "English"),
    access: "Lifetime",
    lastUpdated: new Date().toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    }),
    lessons: [
      {
        id: "1",
        title: base.title,
        duration: durationLabel,
        active: true,
        completed: false,
      },
    ],
    lessonCount: 1,
    features: [
      { label: "Lifetime Access", icon: "infinity" },
      { label: "HD Quality", icon: "hd" },
      { label: "Certificate Included", icon: "cert" },
      { label: "Downloadable", icon: "download" },
    ],
    about: description
      ? [
          description,
          "Learn at your own pace with lifetime access to this recorded session from a verified SoulSensei expert.",
        ]
      : [base.subtitle],
    reviewsList: [],
  };
}

export type UiRecordedVideo = ReturnType<typeof mapSessionForRecordedUi>;

export type { Session };
export type UiSession = ReturnType<typeof mapSessionForUi>;
