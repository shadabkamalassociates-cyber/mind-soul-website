"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { SessionCategory } from "@/data/categories";
import type { LiveSession } from "@/data/liveSessions";

export default function CategorySessionsPage({
  category,
  sessions,
}: {
  category: SessionCategory;
  sessions: LiveSession[];
}) {
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
            {sessions.length} session{sessions.length === 1 ? "" : "s"} available
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          {sessions.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {sessions.map((session) => (
                <SessionCard key={session.slug} session={session} />
              ))}
            </div>
          ) : (
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

function SessionCard({ session }: { session: LiveSession }) {
  return (
    <Link href={`/live-sessions/${session.slug}`} className="block h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E8EAF4] bg-white shadow-[0_6px_20px_rgba(26,26,74,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(26,26,74,0.10)]">
        <div className="relative h-[118px] w-full overflow-hidden sm:h-[128px]">
          <Image
            src={session.image}
            alt=""
            fill
            unoptimized
            className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute left-2.5 top-2.5 rounded bg-[#C9A06A] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
            {session.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-3.5 pb-3 pt-3 sm:px-4 sm:pb-3.5 sm:pt-3">
          <h3
            className="text-[14px] font-semibold leading-snug text-[#3D3D8F] sm:text-[15px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {session.title}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            <div className="relative h-7 w-7 overflow-hidden rounded-full bg-[#EEF0FA] ring-2 ring-white">
              <Image
                src={session.avatar}
                alt={session.expert}
                fill
                unoptimized
                className="object-cover object-top"
                sizes="28px"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-[#1A1A4A]">
                with {session.expert}
              </p>
              <p className="text-[10px] text-[#8A8AA8]">{session.role}</p>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#5C5C7A] sm:text-[11px]">
            <span>{session.date}</span>
            <span>{session.time.split(" - ")[0]}</span>
            <span>{session.duration}</span>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-[#EEF0FA] pt-2.5 mt-3">
            <span className="text-[14px] font-semibold text-[#1A1A4A]">
              {session.price}
            </span>
            <span className="text-[12px] font-semibold text-[#3D3D8F]">
              View details →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
