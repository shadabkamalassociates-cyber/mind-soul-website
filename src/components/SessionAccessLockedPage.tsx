"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import {
  fetchAllLiveSessions,
  fetchAllRecordedSessions,
  mapSessionForDetailPage,
  mapSessionForRecordedUi,
  type SessionUiContext,
} from "@/services/sessionsService";

export type SessionAccessVariant = "live" | "recorded";

type LockedPreview = {
  sessionId: string;
  title: string;
  image: string;
  badgeLabel: string;
  meta: { key: string; label: ReactNode }[];
};

const VARIANT_CONTENT: Record<
  SessionAccessVariant,
  {
    topBarLabel: string;
    subtitle: string;
    benefits: string[];
    otherSessionsHref: string;
    otherSessionsLabel: string;
    loginOtherSessionsHref: string;
  }
> = {
  live: {
    topBarLabel: "Session Access",
    subtitle:
      "This session is locked. Complete payment to get full access and join the session.",
    benefits: [
      "Get full access to the live session",
      "Interact with the expert in real-time",
      "Session recording and materials after the session",
    ],
    otherSessionsHref: "/live-sessions",
    otherSessionsLabel: "View Other Sessions",
    loginOtherSessionsHref: "/live-sessions",
  },
  recorded: {
    topBarLabel: "Recording Access",
    subtitle:
      "This recording is locked. Complete payment to unlock lifetime access and start watching.",
    benefits: [
      "Get lifetime access to the full recording",
      "Learn at your own pace anytime",
      "HD quality with certificate included",
    ],
    otherSessionsHref: "/live-sessions#recorded-sessions",
    otherSessionsLabel: "View Other Recordings",
    loginOtherSessionsHref: "/live-sessions#recorded-sessions",
  },
};

function LockedLockIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="2" fill="white" fillOpacity="0.95" />
      <path
        d="M8 10V8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8V10"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9.5 14.5L14.5 19.5M14.5 14.5L9.5 19.5"
        stroke="#3D3D8F"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#C9A06A" fillOpacity="0.15" />
      <path
        d="M8 12.2L10.6 14.8L16 9.4"
        stroke="#C9A06A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarBadgeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4.5L14.2 9.3L19.5 10.1L15.8 13.7L16.7 19L12 16.6L7.3 19L8.2 13.7L4.5 10.1L9.8 9.3L12 4.5Z"
        fill="#6B4EFF"
        fillOpacity="0.18"
        stroke="#6B4EFF"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4.5L5 7.5V12C5 16.5 8.2 20.2 12 21.5C15.8 20.2 19 16.5 19 12V7.5L12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 3L5 14H12L11 21L19 10H12L13 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9.5 9.2C9.8 8.1 10.7 7.3 12 7.3C13.5 7.3 14.5 8.3 14.5 9.6C14.5 11.2 12 11.5 12 13.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.8" r="0.8" fill="currentColor" />
    </svg>
  );
}

function SessionAccessTopBar({
  label,
  backHref,
}: {
  label: string;
  backHref: string;
}) {
  return (
    <div className="border-b border-[#E8EAF4] bg-white">
      <div className="mx-auto flex max-w-[720px] items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A]"
        >
          <span aria-hidden>←</span>
          {label}
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#5C5C7A] transition hover:text-[#3D3D8F]"
        >
          <HelpIcon />
          Need help?
        </Link>
      </div>
    </div>
  );
}

async function mapPreviewFromApi(
  variant: SessionAccessVariant,
  slug: string,
  sessionUiContext: SessionUiContext,
): Promise<LockedPreview | null> {
  if (variant === "live") {
    const sessions = await fetchAllLiveSessions();
    const found = sessions.find(
      (s) => s.slug === slug || String(s.id ?? s._id) === slug,
    );
    if (!found) return null;

    const mapped = mapSessionForDetailPage(found, sessionUiContext);
    return {
      sessionId: mapped.sessionId,
      title: mapped.title,
      image: mapped.image,
      badgeLabel: "Live",
      meta: [
        { key: "date", label: mapped.date },
        { key: "time", label: `${mapped.time} (${mapped.duration})` },
        { key: "expert", label: mapped.expert },
        {
          key: "price",
          label: (
            <span className="font-semibold text-[#3D3D8F]">{mapped.price}</span>
          ),
        },
      ],
    };
  }

  const sessions = await fetchAllRecordedSessions();
  const found = sessions.find(
    (s) => s.slug === slug || String(s.id ?? s._id) === slug,
  );
  if (!found) return null;

  const mapped = mapSessionForRecordedUi(found, sessionUiContext);
  return {
    sessionId: mapped.sessionId,
    title: mapped.title,
    image: mapped.image,
    badgeLabel: "Recorded",
    meta: [
      { key: "duration", label: mapped.durationLabel },
      { key: "expert", label: mapped.expert },
      { key: "access", label: mapped.access },
      {
        key: "price",
        label: (
          <span className="font-semibold text-[#3D3D8F]">{mapped.price}</span>
        ),
      },
    ],
  };
}

export function SessionAccessLockedPage({
  variant,
  slug,
  sessionUiContext,
}: {
  variant: SessionAccessVariant;
  slug: string;
  sessionUiContext: SessionUiContext;
}) {
  const content = VARIANT_CONTENT[variant];
  const [preview, setPreview] = useState<LockedPreview | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(true);

  useEffect(() => {
    let cancelled = false;

    mapPreviewFromApi(variant, slug, sessionUiContext)
      .then((result) => {
        if (!cancelled) setPreview(result);
      })
      .finally(() => {
        if (!cancelled) setLoadingPreview(false);
      });

    return () => {
      cancelled = true;
    };
  }, [variant, slug, sessionUiContext]);

  return (
    <main className="min-h-screen bg-[#F8F9FC] text-[#1A1A4A]">
      <Header />
      <SessionAccessTopBar
        label={content.topBarLabel}
        backHref={content.otherSessionsHref}
      />

      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-[720px]">
          <div className="rounded-[24px] border border-[#E8EAF4] bg-white px-5 py-8 shadow-[0_20px_60px_rgba(26,26,74,0.07)] sm:px-8 sm:py-10">
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-br from-[#6B4EFF] to-[#3D3D8F] shadow-[0_12px_32px_rgba(107,78,255,0.28)]">
                <LockedLockIcon />
              </div>

              <h1
                className="text-[26px] font-semibold leading-tight text-[#1A1A4A] sm:text-[32px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                You have not paid for this session
              </h1>
              <p className="mx-auto mt-3 max-w-[520px] text-[14px] leading-7 text-[#5C5C7A] sm:text-[15px]">
                {content.subtitle}
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#E8EAF4] bg-[#FAFBFE]">
              {loadingPreview ? (
                <div className="flex min-h-[140px] items-center justify-center text-[14px] text-[#8A8AA8]">
                  Loading session details...
                </div>
              ) : preview ? (
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-[160px] w-full shrink-0 sm:h-auto sm:w-[220px]">
                    <Image
                      src={preview.image}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="220px"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-[#3D3D8F] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A06A]" />
                      {preview.badgeLabel}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 sm:px-5 sm:py-5">
                    <h2 className="text-[16px] font-semibold leading-snug text-[#1A1A4A] sm:text-[17px]">
                      {preview.title}
                    </h2>

                    <ul className="mt-4 space-y-2.5 text-[13px] text-[#5C5C7A]">
                      {preview.meta.map((item) => (
                        <li key={item.key} className="flex items-center gap-2.5">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A06A]" />
                          <span>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-6 text-center text-[14px] text-[#5C5C7A]">
                  Session details are unavailable, but you can still complete
                  purchase from your cart.
                </div>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-[#E8EAF4] bg-[#F3F0FF] px-4 py-5 sm:px-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <StarBadgeIcon />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-[#1A1A4A]">
                    Why should you pay?
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {content.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2.5 text-[13px] leading-6 text-[#5C5C7A]"
                      >
                        <span className="mt-0.5 shrink-0">
                          <CheckIcon />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {preview?.sessionId ? (
                <AddToCartButton
                  sessionId={preview.sessionId}
                  label="Pay Now & Unlock Session"
                  redirect
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6B4EFF] to-[#3D3D8F] py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(61,61,143,0.22)] transition hover:opacity-95 disabled:opacity-60"
                />
              ) : (
                <Link
                  href="/cart"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6B4EFF] to-[#3D3D8F] py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(61,61,143,0.22)] transition hover:opacity-95"
                >
                  Pay Now & Unlock Session
                </Link>
              )}

              <Link
                href={content.otherSessionsHref}
                className="flex w-full items-center justify-center rounded-xl border border-[#3D3D8F]/30 bg-white py-3.5 text-[14px] font-semibold text-[#3D3D8F] transition hover:bg-[#F4F2FA]"
              >
                {content.otherSessionsLabel}
              </Link>
            </div>

            <div className="mt-8 grid gap-4 border-t border-[#EEF0F8] pt-6 sm:grid-cols-3">
              {[
                {
                  icon: <ShieldIcon />,
                  title: "Secure Payment",
                  desc: "Your payment is 100% safe",
                },
                {
                  icon: <BoltIcon />,
                  title: "Instant Access",
                  desc: "Get access immediately",
                },
                {
                  icon: <HelpIcon />,
                  title: "Need Help?",
                  desc: "Contact our support team",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 text-left sm:flex-col sm:items-center sm:text-center"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F8F9FC] text-[#3D3D8F]">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1A1A4A]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-5 text-[#8A8AA8]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export function SessionLoginRequiredPage({
  variant,
}: {
  variant: SessionAccessVariant;
}) {
  const content = VARIANT_CONTENT[variant];

  return (
    <main className="min-h-screen bg-[#F8F9FC] text-[#1A1A4A]">
      <Header />
      <SessionAccessTopBar
        label={content.topBarLabel}
        backHref={content.loginOtherSessionsHref}
      />

      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-[720px]">
          <div className="rounded-[24px] border border-[#E8EAF4] bg-white px-5 py-8 text-center shadow-[0_20px_60px_rgba(26,26,74,0.07)] sm:px-8 sm:py-10">
            <div className="mx-auto mb-5 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-br from-[#6B4EFF] to-[#3D3D8F] shadow-[0_12px_32px_rgba(107,78,255,0.28)]">
              <LockedLockIcon />
            </div>

            <h1
              className="text-[26px] font-semibold leading-tight text-[#1A1A4A] sm:text-[32px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Sign in to continue
            </h1>
            <p className="mx-auto mt-3 max-w-[520px] text-[14px] leading-7 text-[#5C5C7A] sm:text-[15px]">
              Please sign in to your SoulSensei account to verify your
              enrollment and access this session.
            </p>

            <div className="mt-8 space-y-3">
              <Link
                href="/login"
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#6B4EFF] to-[#3D3D8F] py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(61,61,143,0.22)] transition hover:opacity-95"
              >
                Sign In
              </Link>
              <Link
                href={content.loginOtherSessionsHref}
                className="flex w-full items-center justify-center rounded-xl border border-[#3D3D8F]/30 bg-white py-3.5 text-[14px] font-semibold text-[#3D3D8F] transition hover:bg-[#F4F2FA]"
              >
                {content.otherSessionsLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
