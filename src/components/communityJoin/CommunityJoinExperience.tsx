"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Header from "@/components/Header";
import CongratulationsDialog from "@/components/CongratulationsDialog";
import Just99LandingSections from "@/components/communityJoin/Just99LandingSections";
import {
  checkCommunityJoinPaymentStatus,
  COMMUNITY_JOIN_PRICE_INR,
  purchaseCommunityJoinWithRazorpay,
} from "@/services/communityJoinService";
import { ApiError } from "@/services/apiClient";
import { useAppSelector } from "@/store/hooks";
import {
  JUST99_ASSETS,
  JUST99_FEATURES,
  JUST99_PERKS,
} from "@/components/communityJoin/just99Assets";
import "./community-popup.css";

type Step = "offer" | "form";

type CommunityJoinExperienceProps = {
  variant: "popup" | "page";
  source?: "website_popup" | "just99_landing";
  onClose?: () => void;
};

export default function CommunityJoinExperience({
  variant,
  source = "website_popup",
  onClose,
}: CommunityJoinExperienceProps) {
  const router = useRouter();
  const user = useAppSelector((s) => s.auth.user);
  const [step, setStep] = useState<Step>("offer");
  const [error, setError] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const submitLockRef = useRef(false);
  const isPage = variant === "page";

  const profileDetails = useMemo(
    () => ({
      name:
        [user?.first_name, user?.last_name].filter(Boolean).join(" ").trim() ||
        String(user?.name || "").trim(),
      email: String(user?.email || "").trim(),
      whatsapp: String(user?.phone || "").trim(),
    }),
    [user],
  );
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  useEffect(() => {
    setFormDetails((prev) => ({
      name: prev.name || profileDetails.name,
      email: prev.email || profileDetails.email,
      whatsapp: prev.whatsapp || profileDetails.whatsapp,
    }));
  }, [profileDetails.name, profileDetails.email, profileDetails.whatsapp]);

  useEffect(() => {
    if (!isPage) return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const prev = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    const syncBodyScroll = () => {
      if (step === "form") {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        return;
      }
      document.body.style.overflow = mediaQuery.matches ? "hidden" : "";
      document.documentElement.style.overflow = mediaQuery.matches ? "hidden" : "";
    };

    syncBodyScroll();
    mediaQuery.addEventListener("change", syncBodyScroll);

    return () => {
      mediaQuery.removeEventListener("change", syncBodyScroll);
      document.body.style.overflow = prev;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [isPage, step]);

  useEffect(() => {
    if (!isPage) return;

    let cancelled = false;

    async function verifyExistingPayment() {
      try {
        const res = await checkCommunityJoinPaymentStatus();
        console.log("res++++++++++++++++*************", res);
        if (!cancelled && res?.success === true) {
          setShowCongrats(true);
        }
      } catch {
        // Keep the Just99 page when verification fails or payment is pending.
      }
    }

    void verifyExistingPayment();

    return () => {
      cancelled = true;
    };
  }, [isPage]);

  function onJoinClick() {
    setError(null);
    setFormDetails({
      name: profileDetails.name,
      email: profileDetails.email,
      whatsapp: profileDetails.whatsapp,
    });
    setStep("form");
  }

  function updateFormDetail(field: "name" | "email" | "whatsapp", value: string) {
    setFormDetails((prev) => ({ ...prev, [field]: value }));
  }

  useEffect(() => {
    if (!isPage || step !== "form") return;
    const panel = document.querySelector(".just99-offer-wrap-landing-form");
    panel?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [isPage, step]);

  function handleCongratsClose() {
    setShowCongrats(false);
    onClose?.();
    if (isPage) {
      router.push("/");
    }
  }

  async function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitLockRef.current || isPaying) return;

    setError(null);

    const name = formDetails.name.trim();
    const email = formDetails.email.trim();
    const whatsapp = formDetails.whatsapp.trim();
    if (!name || !email || !whatsapp) {
      setError("Please enter your full name, email and WhatsApp number.");
      return;
    }

    submitLockRef.current = true;
    setIsPaying(true);
    try {
      await purchaseCommunityJoinWithRazorpay(
        { name, email, whatsapp },
        source,
      );

      // Confirm membership via community verify endpoint before showing congrats.
      try {
        const status = await checkCommunityJoinPaymentStatus();
        if (status?.success === true) {
          if (isPage) {
            setShowCongrats(true);
          } else {
            onClose?.();
            router.push("/congratulations");
          }
          return;
        }
      } catch {
        // Fall through — Razorpay checkout already succeeded.
      }

      if (isPage) {
        setShowCongrats(true);
      } else {
        onClose?.();
        router.push("/congratulations");
      }
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Payment could not be completed. Please try again.",
      );
    } finally {
      submitLockRef.current = false;
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
          ? `just99-shell just99-shell-fit relative flex w-full flex-1 flex-col overflow-visible lg:min-h-0${step === "form" ? " just99-shell-form-step lg:overflow-visible" : " lg:overflow-hidden"}`
          : "community-popup community-popup-animate community-popup-responsive relative flex w-full flex-col overflow-hidden rounded-[16px] border border-white/70 shadow-[0_24px_70px_rgba(46,22,80,0.38)] sm:rounded-[20px]"
      }
    >
      {!isPage && <div className="community-popup-accent" aria-hidden />}
      {isPage && <Just99BackgroundDecor />}
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
      ) : null}

      <div
        className={
          isPage
            ? `just99-main just99-main-landing relative grid flex-none grid-cols-1 overflow-x-hidden overflow-y-visible lg:min-h-0 lg:grid-cols-[0.95fr_0.75fr]${step === "form" ? " just99-main-landing-form-step lg:flex-none lg:overflow-visible" : " lg:flex-1 lg:overflow-hidden"}`
            : "just99-main just99-main-popup relative flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto lg:grid lg:grid-cols-[1.18fr_0.82fr] lg:overflow-hidden"
        }
      >
        {isPage ? (
          <div className="just99-hero-center just99-hero-center-landing" aria-hidden>
            <div className="just99-hero-ripple-rings" />
            <div className="just99-hero-portrait-glow" />
            <div className="just99-hero-portrait-ring">
              <div className="just99-hero-portrait-crescent" aria-hidden />
              <Image
                src={JUST99_ASSETS.heroPortrait}
                alt=""
                width={640}
                height={640}
                unoptimized
                className="just99-hero-portrait-img"
                priority
              />
            </div>
          </div>
        ) : null}

        <div
          className={`just99-left community-popup-left relative flex min-h-0 flex-col justify-center overflow-visible lg:overflow-hidden ${isPage ? "" : "hidden lg:flex"}`}
        >
          <div className="just99-left-inner relative z-[1]">
            {!isPage ? (
              <div className="just99-brand-row">
                <span className="community-logo-ring">
                  <Image
                    src="https://res.cloudinary.com/dgnztzmzp/image/upload/v1785323232/logo_-_icon_fbp439.png"
                    alt=""
                    width={40}
                    height={40}
                    unoptimized
                    className="h-10 w-10"
                  />
                </span>
                <div>
                  <p className="community-brand-name">COSMIC GURUJI</p>
                  <p className="community-brand-tag">Spreading Light, Healing Lives</p>
                </div>
              </div>
            ) : null}

            <div className={`just99-hero ${isPage ? "just99-hero-landing" : ""}`}>
              {isPage ? (
                <div className="just99-join-row just99-join-row-landing">
                  <span className="just99-join-ornament" aria-hidden>
                    <span className="just99-join-line" />
                    <span className="just99-join-spark">✦</span>
                    <span className="just99-join-line" />
                  </span>
                  <span className="just99-join-label">JOIN OUR</span>
                  <Just99Asset src={JUST99_ASSETS.lotus} size={16} className="just99-join-lotus" />
                  <span className="just99-join-ornament" aria-hidden>
                    <span className="just99-join-line" />
                    <span className="just99-join-spark">✦</span>
                    <span className="just99-join-line" />
                  </span>
                </div>
              ) : (
                <div className="just99-join-row">
                  <span className="community-popup-line" />
                  <span className="just99-join-label">Join Our</span>
                  <span className="community-popup-line" />
                </div>
              )}

              <div className="just99-headline">
                <h1 id="community-popup-title" className="just99-healing">
                  Healing
                </h1>
                <p className="just99-community">Community</p>
              </div>

              {!isPage ? (
                <div className="just99-lotus-divider" aria-hidden>
                  <span className="just99-divider-line" />
                  <Just99Asset src={JUST99_ASSETS.lotus} size={18} className="just99-lotus-icon" />
                  <span className="just99-divider-line" />
                </div>
              ) : null}

              <p className="just99-tagline">Heal. Connect. Grow Together.</p>
              {isPage ? (
                <div className="just99-hero-divider" aria-hidden>
                  <span className="just99-hero-divider-dots">···</span>
                  <span className="just99-hero-divider-spark">✦</span>
                  <span className="just99-hero-divider-dots">···</span>
                </div>
              ) : null}
              <p className="just99-desc">
                A sacred space to heal your mind, uplift your soul and connect with
                like-minded souls.
              </p>

              {isPage ? (
                <div className="just99-hero-actions">
                 
                </div>
              ) : null}
            </div>

            <div className={`just99-features ${isPage ? "just99-features-hidden" : ""}`}>
              {!isPage
                ? JUST99_FEATURES.map((item) => (
                    <div key={item.title} className="community-feature-card">
                      <span className="just99-feature-icon-wrap">
                        <Just99Asset src={item.image} size={36} />
                      </span>
                      <p className="community-feature-title">{item.title}</p>
                      <p className="community-feature-desc">{item.desc}</p>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        <div
          className={`just99-right community-popup-right relative flex min-h-0 flex-col justify-center ${isPage && step === "form" ? "items-center overflow-visible" : ""} ${isPage ? "overflow-visible lg:overflow-hidden" : "order-first flex-1 overflow-visible lg:order-none lg:overflow-hidden"}`}
        >
          {!isPage && (
            <div className="just99-popup-mobile-head lg:hidden">
              <p className="just99-popup-mobile-brand">Cosmic Guruji</p>
              <h2 className="just99-popup-mobile-title">Healing Community</h2>
              <p className="just99-popup-mobile-sub">
                Lifetime access for ₹{COMMUNITY_JOIN_PRICE_INR}
              </p>
            </div>
          )}
          <div
            className={`just99-offer-wrap ${
              isPage
                ? step === "form"
                  ? "just99-offer-wrap-landing-form"
                  : "just99-offer-wrap-landing"
                : "just99-offer-wrap-popup"
            }`}
          >
            {step === "offer" && (
              <JoinOfferPanel
                onJoin={onJoinClick}
                compact={!isPage}
                landing={isPage}
              />
            )}
            {step === "form" && (
              <FormPanel
                details={formDetails}
                onChange={updateFormDetail}
                error={error}
                isPaying={isPaying}
                onSubmit={onFormSubmit}
                onBack={() => setStep("offer")}
                large={isPage}
                landing={isPage}
              />
            )}
          </div>
        </div>
      </div>

      <div
        className={`just99-bottom shrink-0 ${isPage ? "just99-bottom-landing" : "just99-bottom-popup"}${isPage && step === "form" ? " just99-bottom-form-step" : ""} ${!isPage ? "just99-bottom-popup-mobile" : ""}`}
      >
        <div
          className={`just99-perks-bar community-popup-perks shrink-0 ${!isPage ? "just99-perks-bar-popup" : ""}`}
        >
          <div className="community-popup-perks-inner just99-perks">
            {JUST99_PERKS.map((item) => (
              <div key={item.title} className="just99-perk-item">
                <span className="just99-perk-icon-wrap">
                  <Just99Asset src={item.image} size={isPage ? 22 : 22} />
                </span>
                <div className="min-w-0">
                  <p className="just99-perk-title">{item.title}</p>
                  <p className="just99-perk-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!isPage ? (
          <div className="just99-footer community-popup-footer shrink-0">
            <span className="inline-flex items-center justify-center gap-2">
              <Just99Asset src={JUST99_ASSETS.lotus} size={12} className="just99-footer-lotus" />
              Be a part of a loving community that uplifts and inspires you every day.
              <Just99Asset src={JUST99_ASSETS.lotus} size={12} className="just99-footer-lotus" />
            </span>
          </div>
        ) : null}
      </div>

      {isPage ? (
        <div className={step === "form" ? "just99-landing-sections-form-step" : undefined}>
          <Just99LandingSections />
        </div>
      ) : null}

      {isPage && showCongrats ? (
        <div className="community-popup-overlay fixed inset-0 z-[250] overflow-y-auto overscroll-contain">
          <div className="flex min-h-full items-center justify-center p-3 py-6 sm:p-4">
            <button
              type="button"
              aria-label="Close congratulations"
              className="fixed inset-0 bg-[#1a1240]/55 backdrop-blur-[6px]"
              onClick={handleCongratsClose}
            />
            <div className="relative z-10 w-full max-w-[440px]">
              <OfferPanel onClose={handleCongratsClose} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );

  if (isPage) {
    return (
      <div
        className={`just99-landing just99-landing-fit${step === "form" ? " just99-landing-form-step" : ""}`}
      >
        <div className="just99-site-header shrink-0">
          <Header />
        </div>
        <div
          className={`just99-page just99-page-fit min-h-0 flex-none${step === "form" ? " just99-page-form-step lg:flex-none lg:overflow-visible" : " lg:flex-1"}`}
        >
          {shell}
        </div>
      </div>
    );
  }

  return shell;
}

function OfferPanel({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <CongratulationsDialog onClose={onClose} />
    </div>
  );
}

function JoinOfferPanel({
  onJoin,
  compact = false,
  landing = false,
}: {
  onJoin: () => void;
  compact?: boolean;
  landing?: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <div
        className={`community-offer-card just99-offer-card ${compact ? "just99-offer-card-popup" : ""} ${landing ? "just99-offer-card-landing" : ""}`}
      >
        <div className="community-offer-ribbon">
          <span>✦ Special Offer ✦</span>
        </div>

        <div className="community-offer-body just99-offer-body">
          <div className="community-only-row">
            <SparkleTiny />
            <span className="community-only-line" aria-hidden />
            <span className="community-only-text">Only</span>
            <span className="community-only-line" aria-hidden />
            <SparkleTiny />
          </div>

          <div className="community-price-block">
            <span className="community-price-glow" aria-hidden />
            <p className="community-popup-price just99-price">
              <span className="community-popup-price-symbol">₹</span>
              <span className="community-popup-price-amount">
                {COMMUNITY_JOIN_PRICE_INR}
              </span>
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

          <JoinNowButton onClick={onJoin} large useAssetIcon={!landing} sparkle />

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
  useAssetIcon = false,
  sparkle = false,
}: {
  onClick: () => void;
  label?: string;
  large?: boolean;
  useAssetIcon?: boolean;
  sparkle?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`community-join-btn ${large ? "just99-join-btn" : ""}`}
    >
      <span className="community-join-btn-left">
        {sparkle ? (
          <SparkleTiny />
        ) : useAssetIcon ? (
          <Just99Asset src={JUST99_ASSETS.community} size={22} />
        ) : (
          <PeopleIcon />
        )}
      </span>
      <span className="community-join-btn-label">{label}</span>
      <span className="community-join-btn-arrow">
        <ArrowIcon />
      </span>
    </button>
  );
}

function Just99Asset({
  src,
  size,
  className = "",
}: {
  src: string;
  size: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      unoptimized
      className={`just99-asset-img object-contain ${className}`.trim()}
      style={{ width: size, height: size }}
    />
  );
}

function Just99BackgroundDecor() {
  return (
    <div className="just99-bg-decor pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <Image
        src={JUST99_ASSETS.vine}
        alt=""
        width={180}
        height={462}
        unoptimized
        className="just99-bg-vine just99-bg-vine-left object-contain"
      />
      <Image
        src={JUST99_ASSETS.vine}
        alt=""
        width={180}
        height={462}
        unoptimized
        className="just99-bg-vine just99-bg-vine-right object-contain"
      />
      <div className="just99-bg-mountains" />
    </div>
  );
}

function FormInputField({
  label,
  value,
  placeholder,
  type = "text",
  inputMode,
  landing = false,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
  inputMode?: "text" | "email" | "tel" | "numeric";
  landing?: boolean;
  onChange: (value: string) => void;
}) {
  const inputClassName = landing
    ? "box-border w-full min-w-0 rounded-xl border border-[#e4d8f5] bg-white px-3 py-2.5 text-[14px] leading-snug text-[#3B1C5B] outline-none transition placeholder:text-[#A89BC4] focus:border-[#8b5fbf] focus:ring-2 focus:ring-[#8b5fbf]/15 sm:px-3.5 sm:py-3 sm:text-[15px]"
    : "community-popup-input w-full bg-white text-[#3B1C5B]";

  const field = (
    <input
      type={type}
      inputMode={inputMode}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClassName}
      autoComplete={
        type === "email" ? "email" : type === "tel" ? "tel" : "name"
      }
    />
  );

  if (landing) {
    return (
      <div className="w-full min-w-0">
        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#5a3d8c]">
          {label}
        </label>
        {field}
      </div>
    );
  }

  return (
    <div className="community-form-field">
      <label className="community-form-label">{label}</label>
      {field}
    </div>
  );
}

function FormPanel({
  details,
  onChange,
  error,
  isPaying,
  onSubmit,
  onBack,
  large = false,
  landing = false,
}: {
  details: { name: string; email: string; whatsapp: string };
  onChange: (field: "name" | "email" | "whatsapp", value: string) => void;
  error: string | null;
  isPaying: boolean;
  onSubmit: (e: FormEvent) => void;
  onBack: () => void;
  large?: boolean;
  landing?: boolean;
}) {
  const canPay = Boolean(
    details.name.trim() && details.email.trim() && details.whatsapp.trim(),
  );

  if (landing) {
    return (
      <div className="box-border w-full min-w-0 max-w-[380px] px-1 sm:px-0">
        <div className="box-border w-full min-w-0 rounded-[22px] border border-[#8B5FBF]/55 bg-white p-4 shadow-[0_14px_40px_rgba(75,36,117,0.12)] sm:p-5">
          <div className="mb-3 sm:mb-4">
            <h2
              className="text-[20px] font-semibold leading-tight text-[#3b1c5b] sm:text-[22px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Your Details
            </h2>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#7a6b96] sm:text-[13px]">
              Enter your details — Razorpay secure payment of ₹
              {COMMUNITY_JOIN_PRICE_INR} for lifetime access.
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex w-full min-w-0 flex-col gap-3">
            <FormInputField
              label="Full Name"
              value={details.name}
              placeholder="Enter your full name"
              landing
              onChange={(value) => onChange("name", value)}
            />
            <FormInputField
              label="Email Address"
              value={details.email}
              placeholder="Enter your email address"
              type="email"
              inputMode="email"
              landing
              onChange={(value) => onChange("email", value)}
            />
            <FormInputField
              label="WhatsApp Number"
              value={details.whatsapp}
              placeholder="Enter your WhatsApp number"
              type="tel"
              inputMode="tel"
              landing
              onChange={(value) => onChange("whatsapp", value)}
            />

            {error && (
              <p className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[11px] leading-relaxed text-[#B42318]">
                {error}
              </p>
            )}

            <div className="mt-1 flex w-full min-w-0 flex-col gap-2">
              <button
                type="submit"
                disabled={isPaying || !canPay}
                className="flex w-full min-w-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#4c1d95] px-4 py-3 text-[13px] font-bold tracking-[0.14em] text-white uppercase shadow-[0_8px_24px_rgba(76,29,149,0.28)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70 sm:text-[14px]"
              >
                <PeopleIcon />
                {isPaying ? "Opening payment..." : `Pay ₹${COMMUNITY_JOIN_PRICE_INR}`}
                <ArrowIcon />
              </button>
              <button
                type="button"
                onClick={onBack}
                disabled={isPaying}
                className="w-full rounded-full border border-[#d8c4ef] bg-white/80 px-4 py-2.5 text-[13px] font-semibold text-[#4b2475] transition hover:bg-[#f3eafd] disabled:opacity-60"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`community-form-panel community-step-panel ${large ? "community-form-panel-lg" : ""}`}
    >
      <div className="community-form-header">
        <h2 className="community-form-title">Your Details</h2>
        <p className="community-form-subtitle">
          Enter your details — Razorpay secure payment of ₹
          {COMMUNITY_JOIN_PRICE_INR} for lifetime access.
        </p>
      </div>

      <form onSubmit={onSubmit} className="community-form">
        <FormInputField
          label="Full Name"
          value={details.name}
          placeholder="Enter your full name"
          onChange={(value) => onChange("name", value)}
        />
        <FormInputField
          label="Email Address"
          value={details.email}
          placeholder="Enter your email address"
          type="email"
          inputMode="email"
          onChange={(value) => onChange("email", value)}
        />
        <FormInputField
          label="WhatsApp Number"
          value={details.whatsapp}
          placeholder="Enter your WhatsApp number"
          type="tel"
          inputMode="tel"
          onChange={(value) => onChange("whatsapp", value)}
        />

        {error && (
          <p className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[11px] text-[#B42318]">
            {error}
          </p>
        )}

        <div className="community-form-actions">
          <button
            type="submit"
            disabled={isPaying || !canPay}
            className={`community-join-btn disabled:cursor-not-allowed disabled:opacity-70 ${large ? "just99-join-btn" : ""}`}
          >
            <span className="community-join-btn-left">
              <PeopleIcon />
            </span>
            <span className="community-join-btn-label">
              {isPaying
                ? "Opening payment..."
                : `Pay ₹${COMMUNITY_JOIN_PRICE_INR}`}
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
            Back
          </button>
        </div>
      </form>
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

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 5.5L11 8L7 10.5V5.5Z" fill="currentColor" />
    </svg>
  );
}

function SparkleTiny() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden className="text-[#C5A059]">
      <path d="M8 1L9.2 6.2L14 7.4L9.2 8.6L8 14L6.8 8.6L2 7.4L6.8 6.2L8 1Z" fill="currentColor" />
    </svg>
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
