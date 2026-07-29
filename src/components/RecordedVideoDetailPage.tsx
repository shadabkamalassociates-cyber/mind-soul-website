"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import type { RecordedVideo } from "@/types/recordedVideo";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "instructor", label: "Instructor" },
  { id: "reviews", label: "Reviews" },
  { id: "qa", label: "Q&A" },
  { id: "resources", label: "Resources" },
];

type RecordedVideoDetailPageProps = {
  video: RecordedVideo;
  relatedVideos?: RecordedVideo[];
};

export default function RecordedVideoDetailPage({
  video,
  relatedVideos = [],
}: RecordedVideoDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [expanded, setExpanded] = useState(false);
  const [activeLesson, setActiveLesson] = useState(
    video.lessons.find((l) => l.active)?.id ?? video.lessons[0]?.id,
  );

  const related = relatedVideos.slice(0, 5);

  return (
    <main className="min-h-screen bg-[#0B0C1E] text-white">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-white/10 bg-[#0B0C1E]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-4 py-3 text-[12px] text-white/60 sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/live-sessions#recorded-sessions" className="hover:text-white">Sessions</Link>
          <span>/</span>
          <span className="line-clamp-1 font-medium text-white">{video.title}</span>
        </div>
      </div>

      {/* Video + Course Content */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_340px] lg:gap-8 lg:px-8 lg:py-8">
          <div className="min-w-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              <Image
                src={video.heroImage || video.image}
                alt={video.title}
                fill
                unoptimized
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <button
                  type="button"
                  aria-label="Play video"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#3D3D8F] shadow-xl transition hover:scale-105"
                >
                  <PlayIcon />
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/90 to-transparent px-4 py-3">
                <button type="button" aria-label="Play" className="text-white"><PlaySmallIcon /></button>
                <button type="button" aria-label="Volume" className="text-white"><VolumeIcon /></button>
                <span className="text-[11px] text-white/80">15:24 / {video.duration}</span>
                <div className="mx-2 h-1 flex-1 rounded-full bg-white/20">
                  <div className="h-full w-[18%] rounded-full bg-[#4A4AE2]" />
                </div>
                <span className="text-[10px] text-white/60">HD</span>
                <button type="button" aria-label="Fullscreen" className="text-white"><FullscreenIcon /></button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-start gap-3">
              <h1
                className="text-[26px] font-semibold leading-tight text-white sm:text-[32px] lg:text-[36px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {video.title}
              </h1>
              {video.badge && (
                <span className="mt-1 rounded bg-[#C9A06A] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#1A1A4A]">
                  {video.badge}
                </span>
              )}
            </div>
            <p className="mt-2 text-[14px] text-white/60">{video.subtitle}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-white/70">
              <span className="inline-flex items-center gap-1">
                <StarIcon />
                {video.rating} ({video.reviews} reviews)
              </span>
              <span>{video.students} students</span>
              <span>{video.durationLabel}</span>
              <span>Updated {video.lastUpdated}</span>
              <span>{video.language}</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {video.features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#16172B] px-3 py-2.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C9A06A]/40 text-[#C9A06A]">
                    <FeatureIcon type={f.icon} />
                  </span>
                  <span className="text-[11px] font-medium text-white/80">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Content Sidebar */}
          <aside className="rounded-xl border border-white/10 bg-[#16172B] p-4 lg:sticky lg:top-6 lg:self-start">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-semibold text-white">Course Content</h2>
                <p className="mt-0.5 text-[11px] text-white/50">
                  {video.lessonCount} Lessons · {video.durationLabel}
                </p>
              </div>
              <button type="button" className="text-[11px] font-medium text-[#C9A06A]">
                Expand All
              </button>
            </div>
            <ul className="max-h-[360px] space-y-1 overflow-y-auto pr-1">
              {video.lessons.map((lesson, i) => {
                const isActive = lesson.id === activeLesson;
                return (
                  <li key={lesson.id}>
                    <button
                      type="button"
                      onClick={() => setActiveLesson(lesson.id)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left transition ${
                        isActive ? "bg-[#4A4AE2]/20 border border-[#4A4AE2]/40" : "hover:bg-white/5"
                      }`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[10px] text-white/50">
                        {lesson.completed ? <CheckIcon /> : i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`truncate text-[12px] ${isActive ? "font-semibold text-white" : "text-white/80"}`}>
                          {lesson.title}
                        </p>
                        <p className="text-[10px] text-white/40">{lesson.duration}</p>
                      </div>
                      <ChevronDownIcon />
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4A4AE2] py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#3A3AD2]"
              >
                <CheckIcon />
                Mark as Complete
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 py-2.5 text-[13px] font-medium text-white/80 transition hover:bg-white/5"
              >
                <DownloadIcon />
                Download All
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-white/10 bg-[#0B0C1E]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 border-b-2 px-4 py-3.5 text-[13px] font-medium transition ${
                  activeTab === tab.id
                    ? "border-[#C9A06A] text-white"
                    : "border-transparent text-white/50 hover:text-white/80"
                }`}
              >
                {tab.label}
                {tab.id === "reviews" && ` (${video.reviews})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="bg-[#0B0C1E]">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_300px] lg:gap-10 lg:px-8 lg:py-10">
          <div className="min-w-0">
            {activeTab === "overview" && (
              <>
                <h2 className="text-[18px] font-semibold text-white">About This Video</h2>
                <div className="mt-3 space-y-3 text-[14px] leading-[1.8] text-white/65">
                  {(expanded ? video.about : video.about.slice(0, 2)).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="mt-2 text-[13px] font-medium text-[#C9A06A]"
                >
                  {expanded ? "Show less" : "Show more"}
                </button>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {[
                    { label: "Level", value: video.level || "All Levels" },
                    { label: "Category", value: video.category },
                    { label: "Duration", value: video.durationLabel },
                    { label: "Language", value: video.language },
                    { label: "Access", value: video.access || "Lifetime" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-white/10 bg-[#16172B] px-3 py-3 text-center"
                    >
                      <p className="text-[10px] uppercase tracking-[0.1em] text-white/40">{item.label}</p>
                      <p className="mt-1 text-[12px] font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "instructor" && (
              <div className="rounded-xl border border-white/10 bg-white p-5 text-[#1A1A4A]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#EEF0FA]">
                    <Image src={video.expertAvatar} alt={video.expert} fill unoptimized className="object-cover object-top" sizes="80px" />
                  </div>
                  <div>
                    <h2 className="text-[20px] font-semibold text-[#3D3D8F]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                      {video.expert}
                    </h2>
                    <p className="mt-0.5 text-[13px] text-[#C9A06A]">{video.expertRole}</p>
                    <p className="mt-3 text-[14px] leading-relaxed text-[#5C5C7A]">{video.expertBio}</p>
                    <div className="mt-4 flex flex-wrap gap-4">
                      {video.expertStats.map((s) => (
                        <div key={s.label}>
                          <p className="text-[16px] font-semibold text-[#3D3D8F]">{s.value}</p>
                          <p className="text-[11px] text-[#8A8AA8]">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <Link href="/experts" className="mt-4 inline-flex text-[13px] font-semibold text-[#3D3D8F] hover:text-[#1A1A4A]">
                      View Full Profile →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-[18px] font-semibold text-white">Student Reviews</h2>
                    <p className="mt-1 flex items-center gap-1 text-[14px] text-white/70">
                      <StarIcon />
                      {video.rating} average rating
                    </p>
                  </div>
                  <button type="button" className="text-[13px] font-medium text-[#C9A06A]">
                    Write a Review
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {video.reviewsList.map((r) => (
                    <div key={r.id} className="rounded-xl border border-white/10 bg-[#16172B] p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="relative h-9 w-9 overflow-hidden rounded-full">
                          <Image src={r.avatar} alt={r.name} fill className="object-cover" sizes="36px" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-white">{r.name}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: r.rating }).map((_, i) => (
                              <StarIcon key={i} />
                            ))}
                          </div>
                        </div>
                        {r.completed && (
                          <span className="ml-auto rounded bg-[#4A4AE2]/30 px-2 py-0.5 text-[9px] font-medium text-[#9B9BFF]">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-[12px] leading-relaxed text-white/60">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(activeTab === "qa" || activeTab === "resources") && (
              <p className="py-8 text-center text-[14px] text-white/50">
                {activeTab === "qa" ? "No questions yet. Be the first to ask!" : "Downloadable resources will appear here after enrollment."}
              </p>
            )}
          </div>

          {/* Right sidebar features */}
          <aside className="hidden space-y-3 lg:block">
            {[
              { label: "Certificate of Completion", icon: <CertIcon /> },
              { label: "Ask Questions", icon: <ChatIcon /> },
              { label: "Download Resources", icon: <DownloadIcon /> },
              { label: "Share with Community", icon: <ShareIcon /> },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#16172B] px-4 py-3"
              >
                <span className="text-[#C9A06A]">{item.icon}</span>
                <span className="text-[13px] text-white/80">{item.label}</span>
              </div>
            ))}
            <div className="mt-4 rounded-xl border border-[#C9A06A]/30 bg-[#16172B] p-4">
              <p className="text-[22px] font-semibold text-white">{video.price}</p>
              <AddToCartButton
                sessionId={video.sessionId}
                label="Book Now →"
                variant="dark"
              />
            </div>
          </aside>
        </div>
      </section>

      {/* You May Also Like */}
      {related.length > 0 && (
        <section className="border-t border-white/10 bg-[#0B0C1E]">
          <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
            <h2
              className="mb-6 text-[22px] font-semibold text-white sm:text-[26px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              You May Also Like
            </h2>
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {related.map((v) => (
                <Link key={v.slug} href={`/recorded-videos/${v.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                    <Image src={v.image} alt={v.title} fill className="object-cover transition group-hover:scale-[1.03]" sizes="220px" />
                    <span className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[9px] text-white">{v.duration}</span>
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-[12px] font-semibold text-white">{v.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-[10px] text-white/50">
                    <StarIcon />
                    {v.rating} · {v.expert}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-[#1A1A4A]">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <Image src="/contact-mandala-gold.png" alt="" fill unoptimized className="object-contain object-right" sizes="600px" />
        </div>
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-5 px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2
            className="text-[24px] font-semibold text-white sm:text-[28px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Transform Your Life With Consistent Practice
          </h2>
          <Link
            href="/live-sessions#recorded-sessions"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E8C69F] via-[#C9A06A] to-[#B8925E] px-6 py-3 text-[14px] font-semibold text-[#1A1A4A] transition hover:brightness-105"
          >
            Explore More Recordings →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5V18.5L18.5 12L8 5.5Z" />
    </svg>
  );
}

function PlaySmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5V18.5L18.5 12L8 5.5Z" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 9V15H8L13 19V5L8 9H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 8V4H8M16 4H20V8M20 16V20H16M8 20H4V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#C9A06A" aria-hidden className="inline shrink-0">
      <path d="M12 3.5L14.2 9.2L20.2 9.8L15.6 13.8L17.1 19.7L12 16.6L6.9 19.7L8.4 13.8L3.8 9.8L9.8 9.2L12 3.5Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#4A4AE2]">
      <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-white/30">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4V16M12 16L8 12M12 16L16 12M4 20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 10H16M8 14H12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6H20V16H8L4 20V6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.2 10.8L15.8 6.2M8.2 13.2L15.8 17.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function FeatureIcon({ type }: { type: string }) {
  if (type === "hd") return <span className="text-[10px] font-bold">HD</span>;
  if (type === "cert") return <CertIcon />;
  if (type === "download") return <DownloadIcon />;
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 12L16 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
