"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { resetCart } from "@/store/slices/cartSlice";
import type { AuthUser } from "@/types/auth";

function display(value: unknown, fallback = "—") {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

function fullName(user: AuthUser) {
  const name = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  return name || user.name || "Member";
}

function location(user: AuthUser) {
  const parts = [user.city, user.state, user.country].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, hydrated } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#E8E9F0] text-[#8A8AA8]">
        Loading...
      </main>
    );
  }

  const name = fullName(user);
  const loc = location(user);
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  const isActive = user.status === "ACTIVE";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4F5FB] text-[#1A1A4A]">
      <Header />

      <section className="relative overflow-hidden">
        {/* Atmosphere */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#E4E7F8_0%,#F4F5FB_55%,#F4F5FB_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#C9A06A]/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#3D3D8F]/10 blur-3xl"
        />

        <div className="relative mx-auto flex min-h-[calc(100vh-180px)] max-w-[720px] flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <nav className="mb-8 flex items-center justify-center gap-2 text-[12px] text-[#7A7A96]">
            <Link href="/" className="transition hover:text-[#1A1A4A]">
              Home
            </Link>
            <span className="text-[#C5C5D5]">/</span>
            <span className="font-medium text-[#1A1A4A]">Profile</span>
          </nav>

          <article className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_24px_60px_rgba(26,26,74,0.08)] backdrop-blur-sm">
            {/* Top accent band */}
            <div className="h-28 bg-[linear-gradient(135deg,#2F2F75_0%,#3D3D8F_45%,#5A4A8A_100%)] sm:h-32">
              <div
                aria-hidden
                className="h-full w-full opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 30%, rgba(201,160,106,0.55), transparent 40%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.25), transparent 35%)",
                }}
              />
            </div>

            <div className="relative px-6 pb-8 pt-0 sm:px-10 sm:pb-10">
              {/* Avatar overlapping the band */}
              <div className="-mt-14 flex flex-col items-center text-center sm:-mt-16">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-[linear-gradient(135deg,#E8C69F,#C9A06A,#9B754D)] opacity-90" />
                  <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#3D3D8F] text-[28px] font-semibold text-white ring-4 ring-white sm:h-32 sm:w-32 sm:text-[32px]">
                    {typeof user.profile_image === "string" &&
                    user.profile_image ? (
                      <Image
                        src={user.profile_image}
                        alt={name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      initials || "U"
                    )}
                  </div>
                </div>

                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C9A06A]">
                  {display(user.role, "USER")}
                </p>

                <h1
                  className="mt-2 text-[32px] font-semibold leading-none tracking-[-0.02em] text-[#1A1A4A] sm:text-[40px]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {name}
                </h1>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${
                      isActive
                        ? "bg-[#E8F6EE] text-[#1B7A45]"
                        : "bg-[#FFF4E5] text-[#B56B00]"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? "bg-[#1B7A45]" : "bg-[#B56B00]"
                      }`}
                    />
                    {display(user.status, "PENDING")}
                  </span>
                  <span className="inline-flex rounded-full bg-[#EEF0FA] px-3 py-1 text-[12px] font-semibold text-[#3D3D8F]">
                    {user.profile_completed
                      ? "Profile complete"
                      : "Profile incomplete"}
                  </span>
                </div>

                <div className="mt-6 w-full max-w-md space-y-2.5 text-[14px] text-[#5C5C7A]">
                  {user.email ? (
                    <p className="flex items-center justify-center gap-2 break-all">
                      <MailIcon />
                      <span>{user.email}</span>
                    </p>
                  ) : null}
                  {user.phone ? (
                    <p className="flex items-center justify-center gap-2">
                      <PhoneIcon />
                      <span>{user.phone}</span>
                    </p>
                  ) : null}
                  {loc ? (
                    <p className="flex items-center justify-center gap-2">
                      <PinIcon />
                      <span>{loc}</span>
                    </p>
                  ) : null}
                </div>

                <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
                  <Link
                    href="/live-sessions"
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-[#3D3D8F] px-4 text-[14px] font-semibold text-white transition hover:bg-[#2F2F75]"
                  >
                    Explore sessions
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(logout());
                      dispatch(resetCart());
                      router.replace("/login");
                    }}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-[#D8DAE8] bg-white px-4 text-[14px] font-semibold text-[#1A1A4A] transition hover:border-[#3D3D8F] hover:text-[#3D3D8F]"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6.5h16v11H4v-11Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m5 7 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.2 4.8c.4-.9 1.5-1.2 2.3-.7l1.4.9c.7.4.9 1.3.5 2l-.7 1.2a1.4 1.4 0 0 0 .2 1.7l2.7 2.7c.5.5 1.2.6 1.7.2l1.2-.7c.7-.4 1.6-.2 2 .5l.9 1.4c.5.8.2 1.9-.7 2.3l-1.3.6c-1 .4-2.2.2-3.2-.4-2-1.2-3.9-3-5.4-5.4-1-1.5-1.6-3.2-1.2-4.6l.6-1.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
