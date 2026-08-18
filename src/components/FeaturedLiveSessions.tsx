"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import LiveSessionCard from "@/components/LiveSessionCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  mapCategoryForUi,
} from "@/store/slices/categoriesSlice";
import { fetchExperts } from "@/store/slices/expertsSlice";
import { fetchSessions } from "@/store/slices/sessionsSlice";
import { mapExpertForUi } from "@/services/expertsService";
import {
  mapSessionForUi,
  type SessionUiContext,
} from "@/services/sessionsService";

const GAP = 16;

export default function FeaturedLiveSessions() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector((s) => s.categories);
  const sessionState = useAppSelector((s) => s.sessions);
  const expertState = useAppSelector((s) => s.experts);

  useEffect(() => {
    if (categoryState.status === "idle") dispatch(fetchCategories());
    if (sessionState.status === "idle") dispatch(fetchSessions());
    if (expertState.status === "idle") dispatch(fetchExperts());
  }, [categoryState.status, sessionState.status, expertState.status, dispatch]);

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

  const isLoading =
    sessionState.status === "loading" ||
    (sessionState.status === "idle" && sessions.length === 0);

  const showCarousel =
    !isLoading && !sessionState.error && sessions.length > 1;

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-session-card]");
    if (!card) return;
    const amount = card.getBoundingClientRect().width + GAP;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section
      id="book"
      className="relative w-full overflow-hidden bg-white py-8 sm:py-12 lg:py-14"
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10 xl:px-12">
        <div className="mb-5 sm:mb-8">
          <div className="flex items-start justify-between gap-3 sm:items-end sm:gap-4">
            <div className="min-w-0 flex-1">
              <h2
                className="text-[24px] font-medium leading-tight text-[#3D3D8F] sm:text-[34px] lg:text-[40px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Upcoming Live Sessions
              </h2>
              <p className="mt-1 text-[12px] leading-relaxed text-[#5C5C7A] sm:mt-1.5 sm:text-[14px]">
                Join immersive sessions with expert guidance
              </p>
              <Link
                href="/live-sessions"
                className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-semibold text-[#3D3D8F] transition hover:text-[#1A1A4A] sm:hidden"
              >
                View All Sessions
                <ArrowRightIcon />
              </Link>
            </div>

            {showCarousel && (
              <div className="flex shrink-0 items-center gap-2 sm:hidden">
                <CarouselBtn direction="prev" onClick={() => scrollByCard(-1)} />
                <CarouselBtn direction="next" onClick={() => scrollByCard(1)} />
              </div>
            )}

            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/live-sessions"
                className="text-[13px] font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A]"
              >
                View All Sessions
              </Link>
              {showCarousel && (
                <div className="flex items-center gap-2">
                  <CarouselBtn direction="prev" onClick={() => scrollByCard(-1)} />
                  <CarouselBtn direction="next" onClick={() => scrollByCard(1)} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          {showCarousel && (
            <>
              <button
                type="button"
                aria-label="Previous sessions"
                onClick={() => scrollByCard(-1)}
                className="carousel-side-btn-light absolute top-1/2 left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                aria-label="Next sessions"
                onClick={() => scrollByCard(1)}
                className="carousel-side-btn-light absolute top-1/2 right-0 z-20 hidden translate-x-1/2 -translate-y-1/2 lg:flex"
              >
                <ChevronRight />
              </button>
            </>
          )}

          {isLoading && (
            <div className="session-scroller flex gap-3 overflow-x-auto scroll-smooth sm:gap-4">
              {[0, 1].map((key) => (
                <SessionSkeletonCard key={key} />
              ))}
            </div>
          )}

          {!isLoading && sessionState.error && (
            <SessionStateCard
              tone="error"
              title="Unable to load sessions"
              description={sessionState.error}
              actionHref="/live-sessions"
              actionLabel="Try Live Sessions page"
            />
          )}

          {!isLoading && !sessionState.error && sessions.length === 0 && (
            <SessionStateCard
              tone="empty"
              title="No upcoming sessions right now"
              description="New live healing sessions are added regularly. Check back soon or browse all sessions."
              actionHref="/live-sessions"
              actionLabel="Browse Sessions"
            />
          )}

          {!isLoading && !sessionState.error && sessions.length > 0 && (
            <div
              ref={scrollerRef}
              className="session-scroller -mx-1 flex gap-3 overflow-x-auto scroll-smooth px-1 sm:mx-0 sm:gap-4 sm:px-0"
            >
              {sessions.map((session) => (
                <div
                  key={session.slug}
                  data-session-card
                  className="session-card shrink-0"
                >
                  <LiveSessionCard session={session} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SessionStateCard({
  tone,
  title,
  description,
  actionHref,
  actionLabel,
}: {
  tone: "empty" | "error";
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
}) {
  const isError = tone === "error";

  return (
    <article
      className={`mx-auto max-w-md rounded-2xl border px-5 py-8 text-center shadow-sm sm:max-w-lg sm:px-8 sm:py-10 ${
        isError
          ? "border-[#FECACA] bg-gradient-to-br from-[#FEF2F2] to-[#FFF7F7]"
          : "border-[#E8EAF4] bg-gradient-to-br from-[#F8F9FD] via-white to-[#F3F0FA]"
      }`}
    >
      <div
        className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_8px_24px_rgba(26,26,74,0.08)] ${
          isError ? "bg-white text-[#B42318]" : "bg-white text-[#3D3D8F]"
        }`}
      >
        {isError ? <AlertIcon /> : <SessionsEmptyIcon />}
      </div>
      <h3
        className="text-[17px] font-semibold text-[#3D3D8F] sm:text-[18px]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-[#5C5C7A]">
        {description}
      </p>
      <Link
        href={actionHref}
        className="mt-5 inline-flex items-center justify-center rounded-full bg-[#3D3D8F] px-5 py-2.5 text-[12px] font-semibold tracking-wide text-white shadow-[0_8px_20px_rgba(61,61,143,0.22)] transition hover:bg-[#2f2f75]"
      >
        {actionLabel}
      </Link>
    </article>
  );
}

function SessionSkeletonCard() {
  return (
    <div
      data-session-card
      className="session-card shrink-0 overflow-hidden rounded-2xl border border-[#E8EAF4] bg-white shadow-[0_4px_16px_rgba(26,26,74,0.06)]"
    >
      <div className="aspect-[16/10] animate-pulse bg-gradient-to-br from-[#EEF0FA] to-[#E4E2EF]" />
      <div className="space-y-3 px-3.5 py-3">
        <div className="h-4 w-4/5 animate-pulse rounded bg-[#EEF0FA]" />
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 animate-pulse rounded-full bg-[#EEF0FA]" />
          <div className="space-y-1.5">
            <div className="h-3 w-24 animate-pulse rounded bg-[#EEF0FA]" />
            <div className="h-2.5 w-16 animate-pulse rounded bg-[#EEF0FA]" />
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-[#EEF0FA] pt-3">
          <div className="h-3 w-28 animate-pulse rounded bg-[#EEF0FA]" />
          <div className="h-7 w-20 animate-pulse rounded-full bg-[#EEF0FA]" />
        </div>
      </div>
    </div>
  );
}

function CarouselBtn({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous" : "Next"}
      onClick={onClick}
      className="carousel-nav-btn-light flex h-9 w-9 items-center justify-center rounded-full"
    >
      {direction === "prev" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
}

function SessionsEmptyIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 3.5V6.5M16 3.5V6.5M4 9.5H20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8.5 13H12M8.5 16H15.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 8V12.5M12 16H12.01M10.3 4.5H13.7L20.5 17.5C21.2 18.9 20.2 20.5 18.7 20.5H5.3C3.8 20.5 2.8 18.9 3.5 17.5L10.3 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M10 3.5L5.5 8L10 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
