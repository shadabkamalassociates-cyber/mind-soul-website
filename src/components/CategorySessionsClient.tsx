"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  mapCategoryForUi,
} from "@/store/slices/categoriesSlice";
import { fetchSessionsByCategory } from "@/store/slices/sessionsSlice";
import { mapSessionForUi } from "@/services/sessionsService";

export default function CategorySessionsClient({
  categoryId,
}: {
  categoryId: string;
}) {
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector((s) => s.categories);
  const sessionState = useAppSelector((s) => s.sessions);

  useEffect(() => {
    if (categoryState.status === "idle") dispatch(fetchCategories());
    dispatch(fetchSessionsByCategory(categoryId));
  }, [categoryId, categoryState.status, dispatch]);

  const category = useMemo(() => {
    const found = categoryState.items
      .map(mapCategoryForUi)
      .find((c) => c.id === categoryId || c.slug === categoryId);
    return found ?? { id: categoryId, slug: categoryId, label: "Category" };
  }, [categoryState.items, categoryId]);

  const sessions = useMemo(
    () => sessionState.items.map(mapSessionForUi),
    [sessionState.items],
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
                  <Link
                    key={session.slug}
                    href={`/live-sessions/${session.slug}`}
                    className="block h-full"
                  >
                    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E8EAF4] bg-white shadow-[0_6px_20px_rgba(26,26,74,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(26,26,74,0.10)]">
                      <div className="relative h-[118px] w-full overflow-hidden sm:h-[128px]">
                        <Image
                          src={
                            session.image ||
                            "/live-sessions/astrology-card.png"
                          }
                          alt=""
                          fill
                          unoptimized
                          className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <span className="absolute left-2.5 top-2.5 rounded bg-[#C9A06A] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
                          {category.label}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col px-3.5 pb-3 pt-3 sm:px-4">
                        <h3
                          className="text-[14px] font-semibold leading-snug text-[#3D3D8F] sm:text-[15px]"
                          style={{
                            fontFamily: "var(--font-playfair), Georgia, serif",
                          }}
                        >
                          {session.title}
                        </h3>
                        <p className="mt-2 text-[12px] text-[#8A8AA8]">
                          {session.date} · {session.time}
                        </p>
                      </div>
                    </article>
                  </Link>
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
