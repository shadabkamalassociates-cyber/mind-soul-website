"use client";

import { useEffect, useMemo } from "react";
import { notFound } from "next/navigation";
import RecordedVideoDetailPage from "@/components/RecordedVideoDetailPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  mapCategoryForUi,
} from "@/store/slices/categoriesSlice";
import { fetchExperts } from "@/store/slices/expertsSlice";
import { fetchRecordedSessions } from "@/store/slices/recordedSessionsSlice";
import { mapExpertForUi } from "@/services/expertsService";
import {
  mapSessionForRecordedUi,
  type SessionUiContext,
} from "@/services/sessionsService";

export default function RecordedVideoDetailClient({ slug }: { slug: string }) {
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector((s) => s.categories);
  const expertState = useAppSelector((s) => s.experts);
  const recordedState = useAppSelector((s) => s.recordedSessions);

  useEffect(() => {
    if (categoryState.status === "idle") dispatch(fetchCategories());
    if (expertState.status === "idle") dispatch(fetchExperts());
    if (recordedState.status === "idle") dispatch(fetchRecordedSessions());
  }, [
    categoryState.status,
    expertState.status,
    recordedState.status,
    dispatch,
  ]);

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

  const video = useMemo(() => {
    const found = recordedState.items.find(
      (s) => s.slug === slug || String(s.id ?? s._id) === slug,
    );
    if (!found) return null;
    return mapSessionForRecordedUi(found, sessionUiContext);
  }, [recordedState.items, slug, sessionUiContext]);

  const relatedVideos = useMemo(() => {
    return recordedState.items
      .filter((s) => s.slug !== slug && String(s.id ?? s._id) !== slug)
      .map((s) => mapSessionForRecordedUi(s, sessionUiContext))
      .slice(0, 5);
  }, [recordedState.items, slug, sessionUiContext]);

  const isLoading =
    recordedState.status === "loading" ||
    (recordedState.status === "idle" && recordedState.items.length === 0);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0C1E] text-white/70">
        Loading recording...
      </main>
    );
  }

  if (recordedState.error && !video) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0C1E] px-4 text-center text-[#B42318]">
        {recordedState.error}
      </main>
    );
  }

  if (!video) notFound();

  return (
    <RecordedVideoDetailPage video={video} relatedVideos={relatedVideos} />
  );
}
