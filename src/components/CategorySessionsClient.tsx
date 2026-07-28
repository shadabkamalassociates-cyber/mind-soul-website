"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveSessionCard from "@/components/LiveSessionCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  mapCategoryForUi,
} from "@/store/slices/categoriesSlice";
import { fetchExperts } from "@/store/slices/expertsSlice";
import { fetchSessionsByCategory } from "@/store/slices/sessionsSlice";
import { mapExpertForUi } from "@/services/expertsService";
import {
  mapSessionForUi,
  type SessionUiContext,
} from "@/services/sessionsService";

export default function CategorySessionsClient({
  categoryId,
}: {
  categoryId: string;
}) {
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector((s) => s.categories);
  const sessionState = useAppSelector((s) => s.sessions);
  const expertState = useAppSelector((s) => s.experts);

  useEffect(() => {
    if (categoryState.status === "idle") dispatch(fetchCategories());
    if (expertState.status === "idle") dispatch(fetchExperts());
    dispatch(fetchSessionsByCategory(categoryId));
  }, [categoryId, categoryState.status, expertState.status, dispatch]);

  const category = useMemo(() => {
    const found = categoryState.items
      .map(mapCategoryForUi)
      .find((c) => c.id === categoryId || c.slug === categoryId);
    return found ?? { id: categoryId, slug: categoryId, label: "Category" };
  }, [categoryState.items, categoryId]);

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

  const sessions = useMemo(
    () =>
      sessionState.items.map((s) => mapSessionForUi(s, sessionUiContext)),
    [sessionState.items, sessionUiContext],
  );

  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />

      <section className="border-b border-[#EEF0FA] bg-[#F8F9FC]">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#C9A06A]">
            Category
          </p>
          <h1
            className="mt-2 text-[32px] font-semibold text-[#3D3D8F] sm:text-[40px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {category.label}
          </h1>
          <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-[#5C5C7A] sm:text-[15px]">
            Explore live sessions curated for{" "}
            <span className="font-medium text-[#1A1A4A]">{category.label}</span>.
            Book the guidance that matches where you are right now.
          </p>
          <p className="mt-4 text-[13px] font-medium text-[#8A8AA8]">
            {sessionState.status === "loading"
              ? "Loading..."
              : `${sessions.length} session${sessions.length === 1 ? "" : "s"} available`}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          {sessionState.status === "loading" && (
            <p className="py-16 text-center text-[14px] text-[#8A8AA8]">
              Loading sessions...
            </p>
          )}

          {sessionState.error && (
            <p className="py-16 text-center text-[14px] text-[#B42318]">
              {sessionState.error}
            </p>
          )}

          {!sessionState.error &&
            sessionState.status !== "loading" &&
            sessions.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {sessions.map((session) => (
                  <LiveSessionCard key={session.slug} session={session} />
                ))}
              </div>
            )}

          {!sessionState.error &&
            sessionState.status !== "loading" &&
            sessions.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#D8DAE8] bg-[#F8F9FC] px-6 py-16 text-center">
                <p className="text-[15px] font-medium text-[#1A1A4A]">
                  No sessions in this category yet
                </p>
                <p className="mt-2 text-[13px] text-[#8A8AA8]">
                  Check back soon, or browse all live sessions.
                </p>
                <Link
                  href="/live-sessions"
                  className="mt-5 inline-flex rounded-xl bg-[#3D3D8F] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#2F2F70]"
                >
                  View All Live Sessions
                </Link>
              </div>
            )}

          <div className="mt-10 text-center">
            <Link
              href="/live-sessions"
              className="text-[13px] font-semibold text-[#3D3D8F] hover:text-[#1A1A4A]"
            >
              ← Back to all live sessions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
