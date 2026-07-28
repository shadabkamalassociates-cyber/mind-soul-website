"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { categoryIcons, GridIcon } from "./Icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  mapCategoryForUi,
} from "@/store/slices/categoriesSlice";

const BACKEND_ORIGIN =
  (process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://backend.apnasmartgate.com/api").replace(
    /\/api$/,
    "",
  );

function CategoryIcon({
  name,
  iconUrl,
}: {
  name: string;
  iconUrl?: string | null;
}) {
  if (iconUrl) {
    const src = iconUrl.startsWith("http")
      ? iconUrl
      : `${BACKEND_ORIGIN}${iconUrl.startsWith("/") ? iconUrl : `/${iconUrl}`}`;

    return (
      <Image
        src={src}
        alt=""
        width={28}
        height={28}
        unoptimized
        className="h-6 w-6 object-contain sm:h-7 sm:w-7"
      />
    );
  }

  return (
    <span className="flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7">
      {categoryIcons[name] ?? categoryIcons.Healing}
    </span>
  );
}

export default function CategoryBar() {
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector((s) => s.categories);

  useEffect(() => {
    if (categoryState.status === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoryState.status, dispatch]);

  const categories = categoryState.items.map(mapCategoryForUi);
  const isLoading =
    categoryState.status === "loading" ||
    (categoryState.status === "idle" && categories.length === 0);

  return (
    <div className="relative z-20 w-full bg-white px-4 pb-5 pt-1 lg:px-8">
      <div className="category-bar mx-auto flex max-w-[1400px] items-center gap-1 rounded-2xl px-2 py-2.5 sm:gap-2 sm:px-4 sm:py-3">
        <div className="flex flex-1 items-center justify-between gap-1 overflow-x-auto pb-0.5 sm:gap-0">
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="flex min-w-[72px] shrink-0 flex-col items-center gap-1 rounded-xl px-2 py-1.5 sm:min-w-0 sm:flex-1"
              >
                <span className="h-6 w-6 animate-pulse rounded-full bg-[#E8EAF4] sm:h-7 sm:w-7" />
                <span className="h-2.5 w-12 animate-pulse rounded bg-[#E8EAF4]" />
              </div>
            ))}

          {!isLoading &&
            categories.map((cat, index) => {
              const isActive = index === 0;

              return (
                <Link
                  key={cat.id}
                  href={`/live-sessions?category=${encodeURIComponent(cat.id)}`}
                  className={`category-item flex min-w-[72px] shrink-0 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-center transition sm:min-w-0 sm:flex-1 ${
                    isActive
                      ? "bg-[#1A1A4A]/[0.08] text-[#1A1A4A]"
                      : "text-[#5C5C7A]"
                  }`}
                >
                  <CategoryIcon name={cat.label} iconUrl={cat.icon} />
                  <span className="whitespace-nowrap text-[10px] font-medium tracking-wide sm:text-[11px]">
                    {cat.label}
                  </span>
                </Link>
              );
            })}
        </div>

        <Link
          href="/live-sessions"
          className="ml-1 flex shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-[#1A1A4A]/40 bg-[#1A1A4A]/[0.04] px-2.5 py-2 text-[#1A1A4A] transition hover:border-[#1A1A4A]/70 hover:bg-[#1A1A4A]/10 sm:px-3 sm:py-2.5"
        >
          <GridIcon />
          <span className="whitespace-nowrap text-[9px] font-medium tracking-wide sm:text-[10px]">
            All Categories
          </span>
        </Link>
      </div>
    </div>
  );
}
