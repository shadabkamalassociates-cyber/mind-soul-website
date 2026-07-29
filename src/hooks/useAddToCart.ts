"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCartItem } from "@/store/slices/cartSlice";

type AddToCartOptions = {
  quantity?: number;
  discount?: number;
  metadata?: Record<string, unknown> | null;
  redirect?: boolean;
};

export function useAddToCart() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector((s) => s.auth.token);
  const sessionsState = useAppSelector((s) => s.sessions);
  const recordedState = useAppSelector((s) => s.recordedSessions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findSessionSnapshot = useCallback(
    (sessionId: string) => {
      const all = [...sessionsState.items, ...recordedState.items];
      return all.find(
        (s) => String(s.id ?? s._id) === sessionId || s.slug === sessionId,
      );
    },
    [sessionsState.items, recordedState.items],
  );

  const addToCart = useCallback(
    async (sessionId: string, options?: AddToCartOptions) => {
      if (!sessionId) {
        setError("Session not found");
        return { ok: false as const, reason: "missing" as const };
      }

      if (!token) {
        const returnUrl =
          typeof window !== "undefined"
            ? window.location.pathname + window.location.search
            : "/";
        router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
        return { ok: false as const, reason: "auth" as const };
      }

      setLoading(true);
      setError(null);
      try {
        const sessionSnapshot = findSessionSnapshot(sessionId);
        await dispatch(
          addCartItem({
            session_id: sessionId,
            quantity: options?.quantity ?? 1,
            discount: options?.discount ?? 0,
            metadata: options?.metadata ?? null,
            sessionSnapshot,
          }),
        ).unwrap();

        if (options?.redirect !== false) {
          router.push("/cart");
        }
        return { ok: true as const };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to add to cart";
        setError(message);
        return { ok: false as const, reason: "error" as const, message };
      } finally {
        setLoading(false);
      }
    },
    [dispatch, router, token, findSessionSnapshot],
  );

  return { addToCart, loading, error, isAuthenticated: Boolean(token) };
}
