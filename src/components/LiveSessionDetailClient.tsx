"use client";

import { useEffect, useMemo } from "react";
import { notFound } from "next/navigation";
import SessionDetailPage from "@/components/SessionDetailPage";
import {
  SessionAccessLockedPage,
  SessionLoginRequiredPage,
} from "@/components/SessionAccessLockedPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  mapCategoryForUi,
} from "@/store/slices/categoriesSlice";
import { fetchExperts } from "@/store/slices/expertsSlice";
import { fetchSessionById } from "@/store/slices/sessionsSlice";
import { mapExpertForUi } from "@/services/expertsService";
import {
  mapSessionForDetailPage,
  type SessionUiContext,
} from "@/services/sessionsService";

export default function LiveSessionDetailClient({ slug }: { slug: string }) {
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector((s) => s.categories);
  const expertState = useAppSelector((s) => s.experts);
  const sessionState = useAppSelector((s) => s.sessions);

  useEffect(() => {
    if (categoryState.status === "idle") dispatch(fetchCategories());
    if (expertState.status === "idle") dispatch(fetchExperts());
    dispatch(fetchSessionById(slug));
  }, [slug, categoryState.status, expertState.status, dispatch]);

  const sessionUiContext = useMemo((): SessionUiContext => {
    return {
      categoryById: new Map(
        categoryState.items.map((c) => {
          const ui = mapCategoryForUi(c);
          return [ui.id, ui.label];
        }),
      ),
      expertById: new Map(
        expertState.items.map((e) => {
          const ui = mapExpertForUi(e);
          return [
            ui.id,
            { name: ui.name, role: ui.title, avatar: ui.image },
          ];
        }),
      ),
    };
  }, [categoryState.items, expertState.items]);

  const session = useMemo(() => {
    const found = sessionState.selected;
    if (!found) return null;
    return mapSessionForDetailPage(found, sessionUiContext);
  }, [sessionState.selected, sessionUiContext]);

  const isLoading =
    sessionState.status === "loading" ||
    (sessionState.status === "idle" && !sessionState.selected);

  const isPaymentRequired = sessionState.selectedErrorStatus === 403;
  const isLoginRequired = sessionState.selectedErrorStatus === 401;

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9FC] text-[#8A8AA8]">
        Loading session...
      </main>
    );
  }

  if (isPaymentRequired) {
    return (
      <SessionAccessLockedPage
        variant="live"
        slug={slug}
        sessionUiContext={sessionUiContext}
      />
    );
  }

  if (isLoginRequired) {
    return <SessionLoginRequiredPage variant="live" />;
  }

  if (sessionState.error && !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4 text-center text-[#B42318]">
        {sessionState.error}
      </main>
    );
  }

  if (!session) notFound();

  return <SessionDetailPage session={session} />;
}
