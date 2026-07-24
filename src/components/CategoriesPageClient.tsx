"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  mapCategoryForUi,
} from "@/store/slices/categoriesSlice";
import { fetchSessions } from "@/store/slices/sessionsSlice";

export default function CategoriesPageClient() {
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector((s) => s.categories);
  const sessionState = useAppSelector((s) => s.sessions);

  useEffect(() => {
    if (categoryState.status === "idle") dispatch(fetchCategories());
    if (sessionState.status === "idle") dispatch(fetchSessions());
  }, [categoryState.status, sessionState.status, dispatch]);

  const categories = useMemo(
    () => categoryState.items.map(mapCategoryForUi),
    [categoryState.items],
  );

  const sessionCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const session of sessionState.items) {
      const key = String(session.category_id ?? "");
      if (!key) continue;
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
  }, [sessionState.items]);

  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />
      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <h1
          className="text-[32px] font-semibold text-[#3D3D8F] sm:text-[40px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Categories
        </h1>
        <p className="mt-3 max-w-[560px] text-[14px] text-[#5C5C7A] sm:text-[15px]">
          Choose a category to see all related live sessions.
        </p>

        {categoryState.status === "loading" && categories.length === 0 && (
          <p className="mt-10 text-[14px] text-[#8A8AA8]">Loading categories...</p>
        )}

        {categoryState.error && (
          <p className="mt-10 text-[14px] text-[#B42318]">{categoryState.error}</p>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = sessionCounts.get(cat.id) ?? 0;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="rounded-2xl border border-[#E8EAF4] bg-white px-5 py-4 transition hover:border-[#3D3D8F]/35 hover:shadow-[0_8px_24px_rgba(26,26,74,0.08)]"
              >
                <p className="text-[15px] font-semibold text-[#1A1A4A]">
                  {cat.label}
                </p>
                <p className="mt-1 text-[12px] text-[#8A8AA8]">
                  {count} session{count === 1 ? "" : "s"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}
