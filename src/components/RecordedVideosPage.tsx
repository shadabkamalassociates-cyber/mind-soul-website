"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecordedVideoCard from "@/components/RecordedVideoCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRecordedSessions } from "@/store/slices/recordedSessionsSlice";
import { mapSessionForRecordedUi } from "@/services/sessionsService";

const heroFeatures = [
  { value: "500+", label: "Premium Videos" },
  { value: "Lifetime", label: "Access" },
  { value: "HD", label: "Quality" },
  { value: "Cert", label: "Included" },
];

export default function RecordedVideosPage() {
  const dispatch = useAppDispatch();
  const recordedState = useAppSelector((s) => s.recordedSessions);

  useEffect(() => {
    if (recordedState.status === "idle") {
      dispatch(fetchRecordedSessions());
    }
  }, [recordedState.status, dispatch]);

  const videos = useMemo(
    () => recordedState.items.map((s) => mapSessionForRecordedUi(s)),
    [recordedState.items],
  );

  const recent = useMemo(() => {
    return [...recordedState.items]
      .sort((a, b) => {
        const aTime = new Date(String(a.created_at ?? 0)).getTime();
        const bTime = new Date(String(b.created_at ?? 0)).getTime();
        return bTime - aTime;
      })
      .slice(0, 6)
      .map((s) => mapSessionForRecordedUi(s));
  }, [recordedState.items]);

  const isLoading =
    recordedState.status === "loading" ||
    (recordedState.status === "idle" && videos.length === 0);

  return (
    <main className="min-h-screen bg-[#F8F9FC] text-[#1A1A4A]">
      <Header />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-4 pt-10 pb-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:pt-12 lg:pb-14">
          <div className="relative z-10 max-w-[560px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A06A]">
              Recorded Videos —
            </p>
            <h1
              className="mt-3 text-[34px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#3D3D8F] sm:text-[42px] lg:text-[46px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Premium Recordings for Your Spiritual Journey
            </h1>
            <p className="mt-4 max-w-[500px] text-[14px] leading-[1.8] text-[#5C5C7A] sm:text-[15px]">
              Access expert-led recorded sessions anytime — learn at your pace with
              lifetime access, HD quality, and certificates of completion.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {heroFeatures.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-[#E8EAF4] bg-[#F8F9FC] px-3 py-3 text-center"
                >
                  <p
                    className="text-[18px] font-semibold text-[#3D3D8F]"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {f.label === "Premium Videos" && videos.length > 0
                      ? `${videos.length}+`
                      : f.value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#8A8AA8]">
                    {f.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto hidden h-[300px] w-full max-w-[480px] lg:block lg:h-[340px]">
            <Image
              src="/about/hero.png"
              alt=""
              fill
              unoptimized
              priority
              className="rounded-2xl object-cover object-center shadow-[0_16px_48px_rgba(26,26,74,0.12)]"
              sizes="480px"
            />
          </div>
        </div>
      </section>

      {isLoading && (
        <p className="py-16 text-center text-[14px] text-[#8A8AA8]">
          Loading recordings...
        </p>
      )}

      {!isLoading && recordedState.error && (
        <p className="py-16 text-center text-[14px] text-[#B42318]">
          {recordedState.error}
        </p>
      )}

      {!isLoading && !recordedState.error && recent.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
            <h2
              className="mb-6 text-[22px] font-semibold text-[#3D3D8F] sm:text-[26px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Recently Added
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
              {recent.map((v) => (
                <RecordedVideoCard key={`recent-${v.slug}`} video={v} variant="recent" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#F8F9FC]">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
          <h2
            className="mb-6 text-[22px] font-semibold text-[#3D3D8F] sm:text-[26px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            All Recordings
          </h2>

          {!isLoading && !recordedState.error && videos.length > 0 ? (
            <div className="mx-auto grid w-full max-w-[1080px] gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {videos.map((v) => (
                <RecordedVideoCard key={v.slug} video={v} variant="featured" />
              ))}
            </div>
          ) : !isLoading && !recordedState.error ? (
            <p className="py-12 text-center text-[14px] text-[#8A8AA8]">
              No recordings available yet.
            </p>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}
