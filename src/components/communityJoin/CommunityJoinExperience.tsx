"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Header from "@/components/Header";
import Just99LandingSections from "@/components/communityJoin/Just99LandingSections";
import {
  purchaseCommunityJoinWithRazorpay,
  type CommunityJoinDetails,
} from "@/services/communityJoinService";
import {
  JUST99_ASSETS,
  JUST99_FEATURES,
  JUST99_PERKS,
} from "@/components/communityJoin/just99Assets";

type Step = "offer" | "form" | "pay" | "success";

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
          ? "just99-shell just99-shell-fit relative flex min-h-0 w-full flex-1 flex-col overflow-hidden"
          : "community-popup community-popup-animate relative flex max-h-[min(90vh,640px)] w-full max-w-[820px] flex-col overflow-hidden rounded-[20px] border border-white/70 shadow-[0_24px_70px_rgba(46,22,80,0.38)]"
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
            ? "just99-main just99-main-landing relative grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[0.95fr_0.75fr]"
            : "just99-main grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[1.18fr_0.82fr]"
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

        <div className="just99-left community-popup-left relative flex min-h-0 flex-col justify-center overflow-hidden">
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
                  <button type="button" onClick={onJoinClick} className="just99-hero-join-btn">
                    Join Now
                    <SparkleTiny />
                  </button>
                  <button type="button" className="just99-hero-watch-btn">
                    <PlayIcon />
                    Watch Intro
                  </button>
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

        <div className="just99-right community-popup-right relative flex min-h-0 flex-col justify-center overflow-hidden">
          <div className={`just99-offer-wrap ${isPage ? "just99-offer-wrap-landing" : ""}`}>
            {step === "offer" && (
              <OfferPanel onJoin={onJoinClick} compact={!isPage} landing={isPage} />
            )}
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

      <div className={`just99-bottom shrink-0 ${isPage ? "just99-bottom-landing" : "just99-bottom-popup"}`}>
        <div className="just99-perks-bar community-popup-perks shrink-0">
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

      {isPage ? <Just99LandingSections /> : null}
    </div>
  );

  if (isPage) {
    return (
      <div className="just99-landing just99-landing-fit">
        <div className="just99-site-header shrink-0">
          <Header />
        </div>
        <div className="just99-page just99-page-fit">{shell}</div>
      </div>
    );
  }

  return shell;
}

function OfferPanel({
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
