"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import CartPage from "@/components/CartPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCartItem, fetchCart } from "@/store/slices/cartSlice";
import { fetchSessions } from "@/store/slices/sessionsSlice";
import { fetchRecordedSessions } from "@/store/slices/recordedSessionsSlice";

export default function CartPageClient({ sessionSlug }: { sessionSlug?: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector((s) => s.auth.token);
  const hydrated = useAppSelector((s) => s.auth.hydrated);
  const cartState = useAppSelector((s) => s.cart);
  const sessionsState = useAppSelector((s) => s.sessions);
  const recordedState = useAppSelector((s) => s.recordedSessions);
  const addedRef = useRef(false);

  useEffect(() => {
    if (!hydrated) return;

    if (!token) {
      const returnUrl = `/cart${sessionSlug ? `?session=${sessionSlug}` : ""}`;
      router.replace(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
      return;
    }

    // Sync cart from API only when local cart is empty (avoid wiping freshly added items)
    if (cartState.items.length === 0 && cartState.actionStatus !== "loading") {
      dispatch(fetchCart());
    }

    if (sessionsState.status === "idle") dispatch(fetchSessions());
    if (recordedState.status === "idle") dispatch(fetchRecordedSessions());
  }, [
    hydrated,
    token,
    dispatch,
    router,
    sessionSlug,
    cartState.items.length,
    cartState.actionStatus,
    sessionsState.status,
    recordedState.status,
  ]);

  const allSessions = useMemo(
    () => [...sessionsState.items, ...recordedState.items],
    [sessionsState.items, recordedState.items],
  );

  useEffect(() => {
    if (!token || !sessionSlug || addedRef.current || allSessions.length === 0) {
      return;
    }

    const found = allSessions.find(
      (s) => s.slug === sessionSlug || String(s.id ?? s._id) === sessionSlug,
    );
    if (!found) return;

    addedRef.current = true;
    dispatch(
      addCartItem({
        session_id: String(found.id ?? found._id),
        quantity: 1,
        sessionSnapshot: found,
      }),
    );
  }, [token, sessionSlug, allSessions, dispatch]);

  return <CartPage />;
}
