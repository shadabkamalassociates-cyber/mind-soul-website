"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  purchaseCommunityJoinWithRazorpay,
  type CommunityJoinDetails,
} from "@/services/communityJoinService";

type Step = "offer" | "form" | "pay" | "success";

type CommunityJoinExperienceProps = {
  variant: "popup" | "page";
  source?: "website_popup" | "just99_landing";
  onClose?: () => void;
};

const features = [
  { icon: <LotusIcon />, title: "Inner Healing", desc: "Find peace within you" },
  { icon: <PeopleIcon />, title: "Community", desc: "Connect with like-minded souls" },
  { icon: <MeditateIcon />, title: "Live Sessions", desc: "Weekly healing & meditation" },
  { icon: <StarIcon />, title: "Positive Energy", desc: "Daily guidance for a better you" },
];

const perks = [
  { icon: <GiftIcon />, title: "Lifetime Access", desc: "One Time Payment" },
  { icon: <HeadsetIcon />, title: "Live Healing Sessions", desc: "Weekly Live Interaction" },
  { icon: <PeopleIcon />, title: "Supportive Community", desc: "Connect & Share" },
  { icon: <HeartIcon />, title: "Daily Guidance", desc: "Uplift Your Journey" },
];

export default function CommunityJoinExperience({
  variant,
  source = "website_popup",
  onClose,
}: CommunityJoinExperienceProps) {
  const [step, setStep] = useState<Step>("offer");
  const [details, setDetails] = useState<CommunityJoinDetails>({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const isPage = variant === "page";

  useEffect(() => {
    if (!isPage) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isPage]);

  function resetFlow() {
    setStep("offer");
    setError(null);
    onClose?.();
  }

  function onJoinClick() {
    setError(null);
    setStep("form");
  }

  function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setStep("pay");
  }

  async function onPayNow() {
    setError(null);
    setIsPaying(true);
    try {
      await purchaseCommunityJoinWithRazorpay(details, source);
      setStep("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Payment could not be completed. Please try again.",
      );
    } finally {
      setIsPaying(false);
    }
  }

  const shell = (
    <div
      role={isPage ? "main" : "dialog"}
      aria-modal={isPage ? undefined : true}
      aria-labelledby="community-popup-title"
      className={
        isPage
          ? "just99-shell community-popup relative flex h-full min-h-0 w-full flex-col overflow-hidden"
          : "community-popup community-popup-animate relative flex max-h-[min(90vh,640px)] w-full max-w-[820px] flex-col overflow-hidden rounded-[20px] border border-white/70 shadow-[0_24px_70px_rgba(46,22,80,0.38)]"
      }
    >
      <div className="community-popup-accent" aria-hidden />
      <Sparkles />

      {!isPage && onClose ? (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 z-40 flex h-8 w-8 items-center justify-center rounded-full border border-[#E8DDF5] bg-white/95 text-[#4B2475] shadow-[0_4px_12px_rgba(75,36,117,0.12)] transition hover:border-[#4B2475] hover:bg-[#4B2475] hover:text-white"
        >
          <CloseIcon />
        </button>
      ) : isPage ? (
        <Link
          href="/"
          aria-label="Back to home"
          className="absolute right-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-[#E8DDF5] bg-white/95 text-[#4B2475] shadow-[0_4px_12px_rgba(75,36,117,0.12)] transition hover:border-[#4B2475] hover:bg-[#4B2475] hover:text-white lg:right-6 lg:top-6"
        >
          <CloseIcon />
        </Link>
      ) : null}

      <div className="just99-main community-popup-body grid min-h-0 flex-1 overflow-hidden lg:grid-cols-2">
        <div
          className={
            isPage
              ? "community-popup-left just99-left relative flex flex-col justify-center overflow-y-auto px-6 py-8 sm:px-10 lg:px-14 xl:px-20"
              : "community-popup-left relative overflow-y-auto px-4 py-4 sm:px-5 sm:py-4"
          }
        >
          <div className="community-popup-vine community-popup-vine-left" aria-hidden />
          <div className="community-popup-vine community-popup-vine-right" aria-hidden />

          <div className={`relative z-[1] ${isPage ? "just99-left-inner mx-auto w-full max-w-2xl lg:mx-0" : ""}`}>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="community-logo-ring">
                <Image
                  src="https://res.cloudinary.com/dgnztzmzp/image/upload/v1785323232/logo_-_icon_fbp439.png"
                  alt=""
                  width={isPage ? 48 : 36}
                  height={isPage ? 48 : 36}
                  unoptimized
                  className={isPage ? "h-12 w-12" : "h-9 w-9"}
                />
              </span>
              <div>
                <p className={isPage ? "community-brand-name text-base sm:text-lg" : "community-brand-name"}>
                  COSMIC GURUJI
                </p>
                <p className={isPage ? "community-brand-tag text-[9px] sm:text-[10px]" : "community-brand-tag"}>
                  Spreading Light, Healing Lives
                </p>
              </div>
            </div>

            <div className={`${isPage ? "mt-8" : "mt-4"} text-center lg:text-left`}>
              <div className="flex items-center justify-center gap-2 lg:justify-start">
                <span className="community-popup-line" />
                <span
                  className={
                    isPage
                      ? "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A7AA8]"
                      : "text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8A7AA8]"
                  }
                >
                  Join Our
                </span>
                <span className="community-popup-line" />
              </div>

              <div className="mt-3 flex flex-wrap items-end justify-center gap-x-3 gap-y-0 lg:justify-start">
                <h1
                  id="community-popup-title"
                  className={
                    isPage
                      ? "text-[40px] font-semibold leading-none text-[#3B1C5B] sm:text-[48px] lg:text-[56px]"
                      : "text-[28px] font-semibold leading-none text-[#3B1C5B] sm:text-[30px]"
                  }
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Healing
                </h1>
                <p
                  className={
                    isPage
                      ? "community-popup-script text-[48px] leading-[0.95] sm:text-[56px] lg:text-[64px]"
                      : "community-popup-script text-[38px] leading-[0.95] sm:text-[42px]"
                  }
                >
                  Community
                </p>
              </div>

              <p className={isPage ? "mt-4 text-base font-semibold text-[#5A3D8C] sm:text-lg" : "mt-2.5 text-[12px] font-semibold text-[#5A3D8C]"}>
                Heal. Connect. Grow Together.
              </p>
              <p
                className={
                  isPage
                    ? "mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#7A6B96] sm:text-base lg:mx-0"
                    : "mx-auto mt-1.5 max-w-[300px] text-[10px] leading-relaxed text-[#7A6B96] lg:mx-0 lg:max-w-none sm:text-[11px]"
                }
              >
                A sacred space to heal your mind, uplift your soul and connect with
                like-minded souls.
              </p>
            </div>

            <div
              className={
                isPage
                  ? "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4"
                  : "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:gap-1.5"
              }
            >
              {features.map((item) => (
                <div key={item.title} className="community-feature-card">
                  <span className="community-feature-icon">{item.icon}</span>
                  <p
                    className={
                      isPage
                        ? "mt-2 text-xs font-semibold leading-tight text-[#3B1C5B] sm:text-sm"
                        : "mt-1.5 text-[10px] font-semibold leading-tight text-[#3B1C5B]"
                    }
                  >
                    {item.title}
                  </p>
                  <p
                    className={
                      isPage
                        ? "mt-1 text-[10px] leading-snug text-[#8A7AA8] sm:text-xs"
                        : "mt-0.5 text-[8px] leading-snug text-[#8A7AA8]"
                    }
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={
            isPage
              ? "community-popup-right just99-right relative flex min-h-[320px] flex-col justify-center overflow-y-auto border-t border-[#E4D8F5]/80 px-6 py-8 sm:px-10 lg:border-t-0 lg:border-l lg:px-12 xl:px-16"
              : "community-popup-right relative flex min-h-[280px] flex-col overflow-y-auto border-t border-[#E4D8F5]/80 px-4 py-4 sm:px-5 lg:border-t-0 lg:border-l"
          }
        >
          <div className={isPage ? "just99-offer-wrap mx-auto w-full max-w-md" : "h-full"}>
            {step === "offer" && <OfferPanel onJoin={onJoinClick} large={isPage} />}
            {step === "form" && (
              <FormPanel
                details={details}
                setDetails={setDetails}
                onSubmit={onFormSubmit}
                onBack={() => setStep("offer")}
                large={isPage}
              />
            )}
            {step === "pay" && (
              <PayPanel
                details={details}
                error={error}
                isPaying={isPaying}
                onPay={onPayNow}
                onBack={() => setStep("form")}
                large={isPage}
              />
            )}
            {step === "success" && <SuccessPanel onClose={resetFlow} large={isPage} />}
          </div>
        </div>
      </div>

      <div className={isPage ? "community-popup-perks shrink-0 px-6 py-3 lg:px-10" : "community-popup-perks shrink-0 px-4 py-2.5"}>
        <div className={isPage ? "community-popup-perks-inner just99-perks" : "community-popup-perks-inner"}>
          {perks.map((item) => (
            <div key={item.title} className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="community-perk-icon">{item.icon}</span>
              <div className="min-w-0">
                <p className={isPage ? "truncate text-xs font-semibold text-[#3B1C5B] sm:text-sm" : "truncate text-[10px] font-semibold text-[#3B1C5B]"}>
                  {item.title}
                </p>
                <p className={isPage ? "truncate text-[10px] text-[#8A7AA8] sm:text-xs" : "truncate text-[8px] text-[#8A7AA8]"}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={
          isPage
            ? "community-popup-footer shrink-0 px-6 py-3 text-center text-xs leading-snug text-white/95 sm:text-sm lg:px-10"
            : "community-popup-footer shrink-0 px-3 py-2.5 text-center text-[10px] leading-snug text-white/95"
        }
      >
        <span className="inline-flex items-center justify-center gap-2">
          <LotusMini />
          Be a part of a loving community that uplifts and inspires you every day.
          <LotusMini />
        </span>
      </div>
    </div>
  );

  if (isPage) {
    return <div className="just99-page">{shell}</div>;
  }

  return shell;
}

function OfferPanel({ onJoin, large = false }: { onJoin: () => void; large?: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className={`community-offer-card ${large ? "just99-offer-card" : ""}`}>
        <div className="community-offer-ribbon">
          <span>Special Offer</span>
        </div>

        <div className={large ? "community-offer-body just99-offer-body" : "community-offer-body"}>
          <div className="community-only-row">
            <SparkleTiny />
            <span className="community-only-text">Only</span>
            <SparkleTiny />
          </div>

          <div className="community-price-block">
            <p className={`community-popup-price ${large ? "just99-price" : ""}`}>
              <span className="community-popup-price-symbol">₹</span>
              <span className="community-popup-price-amount">99</span>
            </p>
          </div>

          <p className="community-payment-badge">One Time Payment</p>

          <div className="community-access-box">
            <span className="community-access-icon">
              <ShieldLockIcon />
            </span>
            <div className="community-access-copy">
              <p className="community-access-title">Lifetime Community Access</p>
              <p className="community-access-desc">Pay once & stay connected forever</p>
            </div>
          </div>

          <JoinNowButton onClick={onJoin} large={large} />

          <div className="community-trust-row">
            <span className="community-trust-item">
              <span className="community-trust-icon">
                <ShieldMini />
              </span>
              Secure Payment
            </span>
            <span className="community-trust-divider" aria-hidden />
            <span className="community-trust-item">
              <span className="community-trust-icon">
                <BoltIcon />
              </span>
              Instant Access
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function JoinNowButton({
  onClick,
  label = "Join Now",
  large = false,
}: {
  onClick: () => void;
  label?: string;
  large?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`community-join-btn ${large ? "just99-join-btn" : ""}`}
    >
      <span className="community-join-btn-left">
        <PeopleIcon />
      </span>
      <span className="community-join-btn-label">{label}</span>
      <span className="community-join-btn-arrow">
        <ArrowIcon />
      </span>
    </button>
  );
}

function FormPanel({
  details,
  setDetails,
  onSubmit,
  onBack,
  large = false,
}: {
  details: CommunityJoinDetails;
  setDetails: (value: CommunityJoinDetails) => void;
  onSubmit: (e: FormEvent) => void;
  onBack: () => void;
  large?: boolean;
}) {
  return (
    <div className={`community-form-panel ${large ? "community-form-panel-lg" : ""}`}>
      <div className="community-form-header">
        <h2 className="community-form-title">Your Details</h2>
        <p className="community-form-subtitle">Fill in your details to continue to payment.</p>
      </div>

      <form onSubmit={onSubmit} className="community-form">
        <PopupField label="Full Name" required>
          <input
            required
            type="text"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            placeholder="Enter your full name"
            className="community-popup-input"
          />
        </PopupField>
        <PopupField label="WhatsApp Number" required>
          <input
            required
            type="tel"
            value={details.whatsapp}
            onChange={(e) => setDetails({ ...details, whatsapp: e.target.value })}
            placeholder="+91 98765 43210"
            className="community-popup-input"
          />
        </PopupField>
        <PopupField label="Email Address" required>
          <input
            required
            type="email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            placeholder="you@email.com"
            className="community-popup-input"
          />
        </PopupField>

        <div className="community-form-actions">
          <button type="submit" className={`community-join-btn ${large ? "just99-join-btn" : ""}`}>
            <span className="community-join-btn-left">
              <PeopleIcon />
            </span>
            <span className="community-join-btn-label">Continue</span>
            <span className="community-join-btn-arrow">
              <ArrowIcon />
            </span>
          </button>
          <button type="button" onClick={onBack} className="community-form-back-btn">
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

function PayPanel({
  details,
  error,
  isPaying,
  onPay,
  onBack,
  large = false,
}: {
  details: CommunityJoinDetails;
  error: string | null;
  isPaying: boolean;
  onPay: () => void;
  onBack: () => void;
  large?: boolean;
}) {
  return (
    <div className="flex h-full flex-col py-1">
      <h2
        className={large ? "text-2xl font-semibold text-[#3B1C5B]" : "text-[18px] font-semibold text-[#3B1C5B]"}
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Complete Payment
      </h2>
      <p className={large ? "mt-2 text-sm text-[#7A6B96]" : "mt-1 text-[11px] text-[#7A6B96]"}>
        Review your details and pay ₹99 for lifetime access.
      </p>

      <div className={`mt-4 space-y-2 rounded-xl border border-[#E4D8F5] bg-[#FAF6FF] p-4 text-[#5A3D8C] ${large ? "text-sm" : "text-[11px]"}`}>
        <p>
          <strong>Name:</strong> {details.name}
        </p>
        <p>
          <strong>WhatsApp:</strong> {details.whatsapp}
        </p>
        <p>
          <strong>Email:</strong> {details.email}
        </p>
        <p className="border-t border-[#E4D8F5] pt-2">
          <strong>Amount:</strong>{" "}
          <span className="community-popup-price community-popup-price-sm">
            <span className="community-popup-price-symbol">₹</span>
            <span className="community-popup-price-amount">99</span>
          </span>
        </p>
      </div>

      {error && (
        <p className="mt-2 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[11px] text-[#B42318]">
          {error}
        </p>
      )}

      <div className="mt-auto space-y-2 pt-3">
        <button
          type="button"
          onClick={onPay}
          disabled={isPaying}
          className="community-join-btn disabled:opacity-70"
        >
          <span className="community-join-btn-left">
            <ShieldMini />
          </span>
          <span className="community-join-btn-label">
            {isPaying ? "Processing..." : "Pay Now ₹99"}
          </span>
          <span className="community-join-btn-arrow">
            <ArrowIcon />
          </span>
        </button>
        <button
          type="button"
          onClick={onBack}
          disabled={isPaying}
          className="community-form-back-btn disabled:opacity-60"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
}

function SuccessPanel({ onClose, large = false }: { onClose: () => void; large?: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-4 text-center">
      <span className={`flex items-center justify-center rounded-full bg-[#E8F6EE] text-[#2F9B63] ${large ? "h-16 w-16" : "h-14 w-14"}`}>
        <CheckIcon />
      </span>
      <h2
        className={large ? "mt-4 text-2xl font-semibold text-[#3B1C5B]" : "mt-3 text-[20px] font-semibold text-[#3B1C5B]"}
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Welcome to the Community!
      </h2>
      <p className={large ? "mt-3 max-w-sm text-sm leading-relaxed text-[#7A6B96]" : "mt-2 max-w-[240px] text-[11px] leading-relaxed text-[#7A6B96]"}>
        Payment received. You now have lifetime access to our healing community.
      </p>
      <button type="button" onClick={onClose} className="community-join-btn mt-5 max-w-[260px]">
        <span className="community-join-btn-left">
          <StarIcon />
        </span>
        <span className="community-join-btn-label">Continue</span>
        <span className="community-join-btn-arrow">
          <ArrowIcon />
        </span>
      </button>
    </div>
  );
}

function Sparkles() {
  return (
    <div className="community-popup-sparkles pointer-events-none absolute inset-0 z-[2]" aria-hidden>
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className={`community-sparkle community-sparkle-${i + 1}`} />
      ))}
    </div>
  );
}

function SparkleTiny() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden className="text-[#C5A059]">
      <path d="M8 1L9.2 6.2L14 7.4L9.2 8.6L8 14L6.8 8.6L2 7.4L6.8 6.2L8 1Z" fill="currentColor" />
    </svg>
  );
}

function PopupField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="community-form-field">
      <span className="community-form-label">
        {label}
        {required && <span className="community-form-required"> *</span>}
      </span>
      {children}
    </label>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LotusMini() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#C5A059]">
      <path d="M12 20c2.5-3 4-6 4-9a4 4 0 10-8 0c0 3 1.5 6 4 9Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function LotusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20c2.5-3 4-6 4-9a4 4 0 10-8 0c0 3 1.5 6 4 9Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 19C4 15.5 6.2 13.5 9 13.5C11.8 13.5 14 15.5 14 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function MeditateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 14C8.5 11.5 10 10 12 10C14 10 15.5 11.5 17 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6 18H18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3.5L14.2 9.2L20 9.8L15.6 13.8L17 19L12 16.2L7 19L8.4 13.8L4 9.8L9.8 9.2L12 3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="10" width="16" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 10V20M4 10H20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 14V11C4 7.1 7.1 4 11 4H13C16.9 4 20 7.1 20 11V14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20S4.5 15 4.5 9.5C4.5 7 6.5 5 9 5C10.5 5 11.5 5.8 12 6.8C12.5 5.8 13.5 5 15 5C17.5 5 19.5 7 19.5 9.5C19.5 15 12 20 12 20Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldLockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3L19 6.5V11.5C19 16 15.5 19.5 12 21C8.5 19.5 5 16 5 11.5V6.5L12 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ShieldMini() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3L19 6.5V11.5C19 16 15.5 19.5 12 21C8.5 19.5 5 16 5 11.5V6.5L12 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M13 2L5 14H12L11 22L19 10H12L13 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
