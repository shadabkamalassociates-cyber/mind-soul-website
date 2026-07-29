import type { CartItem } from "@/types/cart";
import type { Session } from "@/types/session";
import {
  getCartItemId,
  getCartSessionId,
} from "@/services/paymentService";
import { mapSessionForUi, type UiSession } from "@/services/sessionsService";

export type CartLineUi = {
  cartItemId: string;
  sessionId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  expert: string;
  duration: string;
  language: string;
  sessionType: "LIVE" | "RECORDED";
  detailHref: string;
  date?: string;
  time?: string;
};

function parsePrice(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value.replace(/[^\d.]/g, "")) || 0;
  return 0;
}

function detectSessionType(
  item: CartItem,
  session?: Session,
): "LIVE" | "RECORDED" {
  const raw = String(
    item.session_type ??
      session?.session_type ??
      item.session?.session_type ??
      "",
  ).toUpperCase();
  if (raw.includes("RECORD")) return "RECORDED";
  if (raw.includes("LIVE")) return "LIVE";
  return "RECORDED";
}

function resolveSession(
  item: CartItem,
  sessions: Session[],
  snapshots: Record<string, Session>,
): Session | undefined {
  const sessionId = getCartSessionId(item);
  if (!sessionId) return undefined;

  return (
    sessions.find(
      (s) => String(s.id ?? s._id) === sessionId || s.slug === sessionId,
    ) ??
    snapshots[sessionId] ??
    (item.session as Session | undefined)
  );
}

function formatApiSchedule(startTime?: unknown) {
  if (!startTime) return undefined;
  const start = new Date(String(startTime));
  if (Number.isNaN(start.getTime())) return undefined;
  return {
    date: start.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: start.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export function mapCartItemForUi(
  item: CartItem,
  sessions: Session[],
  snapshots: Record<string, Session> = {},
): CartLineUi | null {
  const sessionId = getCartSessionId(item);
  if (!sessionId) return null;

  const matched = resolveSession(item, sessions, snapshots);
  const ui: UiSession | null = matched ? mapSessionForUi(matched) : null;
  const sessionType = detectSessionType(item, matched);
  const slug = ui?.slug ?? sessionId;
  const detailHref =
    sessionType === "RECORDED"
      ? `/recorded-videos/${slug}`
      : `/live-sessions/${slug}`;

  const cartItemId = getCartItemId(item) || `local-${sessionId}`;
  const apiSchedule = formatApiSchedule(item.start_time);

  return {
    cartItemId,
    sessionId,
    title: ui?.title ?? String(item.title ?? item.session?.title ?? "Session"),
    image:
      ui?.image ??
      String(
        item.thumbnail ??
          item.session?.thumbnail ??
          "/live-sessions/astrology-card.png",
      ),
    price: parsePrice(
      item.unit_price ?? item.final_price ?? item.price ?? matched?.price ?? ui?.price,
    ),
    quantity: Number(item.quantity ?? 1),
    expert:
      ui?.expert ??
      String(
        item.expert_first_name || item.expert_last_name
          ? [item.expert_first_name, item.expert_last_name].filter(Boolean).join(" ")
          : item.session?.expert_name ??
          [item.session?.expert_first_name, item.session?.expert_last_name]
            .filter(Boolean)
            .join(" ") ??
          "Cosmicguruji Expert",
      ),
    duration:
      ui?.duration ??
      String(
        item.duration_minutes
          ? `${item.duration_minutes} min`
          : matched?.duration_minutes
            ? `${matched.duration_minutes} min`
            : "—",
      ),
    language: String(
      item.language ?? matched?.language ?? item.session?.language ?? "English",
    ),
    sessionType,
    detailHref,
    date: ui?.date ?? apiSchedule?.date,
    time: ui?.time ?? apiSchedule?.time,
  };
}

export function mapCartItemsForUi(
  items: CartItem[],
  sessions: Session[],
  snapshots: Record<string, Session> = {},
): CartLineUi[] {
  return items
    .map((item) => mapCartItemForUi(item, sessions, snapshots))
    .filter((item): item is CartLineUi => item != null);
}
