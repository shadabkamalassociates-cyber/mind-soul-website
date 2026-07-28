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
  
  // console.log(sessions,"+++++++++++++++");

  const isLoading =
    sessionState.status === "loading" ||
    (sessionState.status === "idle" && sessions.length === 0);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-session-card]");
    if (!card) return;
    const amount = card.getBoundingClientRect().width + GAP;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section id="book" className="relative w-full overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <h2
              className="text-[28px] font-medium leading-tight text-[#3D3D8F] sm:text-[34px] lg:text-[40px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Upcoming Live Sessions
            </h2>
            <p className="mt-1.5 text-[13px] text-[#5C5C7A] sm:text-[14px]">
              Join immersive sessions with expert guidance
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/live-sessions"
              className="text-[13px] font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A]"
            >
              View All Sessions
            </Link>
            <div className="flex items-center gap-2">
              <CarouselBtn direction="prev" onClick={() => scrollByCard(-1)} />
              <CarouselBtn direction="next" onClick={() => scrollByCard(1)} />
            </div>
          </div>
        </div>


        

        <div className="relative">
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

          {isLoading && (
            <p className="py-12 text-center text-[14px] text-[#8A8AA8]">
              Loading sessions...
            </p>
          )}

          {!isLoading && sessionState.error && (
            <p className="py-12 text-center text-[14px] text-[#B42318]">
              {sessionState.error}
            </p>
          )}

          {!isLoading && !sessionState.error && sessions.length === 0 && (
            <p className="py-12 text-center text-[14px] text-[#8A8AA8]">
              No upcoming sessions right now. Check back soon.
            </p>
          )}

          {!isLoading && !sessionState.error && sessions.length > 0 && (
            <div
              ref={scrollerRef}
              className="session-scroller flex gap-4 overflow-x-auto scroll-smooth"
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

        <div className="mt-5 flex items-center justify-between sm:hidden">
          <Link href="/live-sessions" className="text-[13px] font-medium text-[#3D3D8F]">
            View All Sessions
          </Link>
          <div className="flex items-center gap-2">
            <CarouselBtn direction="prev" onClick={() => scrollByCard(-1)} />
            <CarouselBtn direction="next" onClick={() => scrollByCard(1)} />
          </div>
        </div>
      </div>
    </section>
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
