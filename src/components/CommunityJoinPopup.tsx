"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  purchaseCommunityJoinWithRazorpay,
  type CommunityJoinDetails,
} from "@/services/communityJoinService";

type Step = "offer" | "form" | "pay" | "success";

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

export default function CommunityJoinPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("offer");
  const [details, setDetails] = useState<CommunityJoinDetails>({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  function dismissPopup() {
    setIsOpen(false);
    setStep("offer");
    setError(null);
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
      await purchaseCommunityJoinWithRazorpay(details);
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

  if (!isOpen) return null;

  return (
    <div className="community-popup-overlay fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-3">
      <button
        type="button"
        aria-label="Close popup"
        className="absolute inset-0 bg-[#2E1650]/65 backdrop-blur-[6px]"
        onClick={dismissPopup}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="community-popup-title"
        className="community-popup community-popup-animate relative z-10 flex max-h-[min(90vh,640px)] w-full max-w-[820px] flex-col overflow-hidden rounded-[20px] border border-white/70 shadow-[0_24px_70px_rgba(46,22,80,0.38)]"
      >
        <div className="community-popup-accent" aria-hidden />

        <Sparkles />

        <button
          type="button"
          aria-label="Close"
          onClick={dismissPopup}
          className="absolute right-3 top-3 z-40 flex h-8 w-8 items-center justify-center rounded-full border border-[#E8DDF5] bg-white/95 text-[#4B2475] shadow-[0_4px_12px_rgba(75,36,117,0.12)] transition hover:border-[#4B2475] hover:bg-[#4B2475] hover:text-white"
        >
          <CloseIcon />
        </button>

        <div className="community-popup-body grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[1.08fr_0.92fr]">
          {/* Left */}
          <div className="community-popup-left relative overflow-y-auto px-4 py-4 sm:px-5 sm:py-4">
            <div className="community-popup-vine community-popup-vine-left" aria-hidden />
            <div className="community-popup-vine community-popup-vine-right" aria-hidden />

            <div className="relative z-[1] flex items-center gap-2.5">
              <span className="community-logo-ring">
                <Image
                  src="https://res.cloudinary.com/dgnztzmzp/image/upload/v1785323232/logo_-_icon_fbp439.png"
                  alt=""
                  width={36}
                  height={36}
                  unoptimized
                  className="h-9 w-9"
                />
              </span>
              <div>
                <p className="community-brand-name">COSMIC GURUJI</p>
                <p className="community-brand-tag">Spreading Light, Healing Lives</p>
              </div>
            </div>

            <div className="relative z-[1] mt-4 text-center lg:text-left">
              <div className="flex items-center justify-center gap-2 lg:justify-start">
                <span className="community-popup-line" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8A7AA8]">
                  Join Our
                </span>
                <span className="community-popup-line" />
              </div>

              <div className="mt-2 flex flex-wrap items-end justify-center gap-x-2 gap-y-0 lg:justify-start">
                <h2
                  id="community-popup-title"
                  className="text-[28px] font-semibold leading-none text-[#3B1C5B] sm:text-[30px]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Healing
                </h2>
                <p className="community-popup-script text-[38px] leading-[0.95] sm:text-[42px]">
                  Community
                </p>
              </div>

              <p className="mt-2.5 text-[12px] font-semibold text-[#5A3D8C]">
                Heal. Connect. Grow Together.
              </p>
              <p className="mx-auto mt-1.5 max-w-[300px] text-[10px] leading-relaxed text-[#7A6B96] lg:mx-0 lg:max-w-none sm:text-[11px]">
                A sacred space to heal your mind, uplift your soul and connect with
                like-minded souls.
              </p>
            </div>

            <div className="relative z-[1] mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:gap-1.5">
              {features.map((item) => (
                <div key={item.title} className="community-feature-card">
                  <span className="community-feature-icon">{item.icon}</span>
                  <p className="mt-1.5 text-[10px] font-semibold leading-tight text-[#3B1C5B]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[8px] leading-snug text-[#8A7AA8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="community-popup-right relative flex min-h-[280px] flex-col overflow-y-auto border-t border-[#E4D8F5]/80 px-4 py-4 sm:px-5 lg:border-t-0 lg:border-l">
            {step === "offer" && <OfferPanel onJoin={onJoinClick} />}
            {step === "form" && (
              <FormPanel
                details={details}
                setDetails={setDetails}
                onSubmit={onFormSubmit}
                onBack={() => setStep("offer")}
              />
            )}
            {step === "pay" && (
              <PayPanel
                details={details}
                error={error}
                isPaying={isPaying}
                onPay={onPayNow}
                onBack={() => setStep("form")}
              />
            )}
            {step === "success" && <SuccessPanel onClose={dismissPopup} />}
          </div>
        </div>

        <div className="community-popup-perks shrink-0 px-4 py-2.5">
          <div className="community-popup-perks-inner">
            {perks.map((item) => (
              <div key={item.title} className="flex min-w-0 items-center gap-2">
                <span className="community-perk-icon">{item.icon}</span>
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold text-[#3B1C5B]">{item.title}</p>
                  <p className="truncate text-[8px] text-[#8A7AA8]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="community-popup-footer shrink-0 px-3 py-2.5 text-center text-[10px] leading-snug text-white/95">
          <span className="inline-flex items-center justify-center gap-2">
            <LotusMini />
            Be a part of a loving community that uplifts and inspires you every day.
            <LotusMini />
          </span>
        </div>
      </div>
    </div>
  );
}

function OfferPanel({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="community-offer-card">
        <div className="community-offer-ribbon">Special Offer</div>

        <div className="community-offer-body">
          <div className="community-only-row">
            <SparkleTiny />
            <span>Only</span>
            <SparkleTiny />
          </div>
          <p className="community-popup-price mt-1">
            <span className="community-popup-price-symbol">₹</span>
            <span className="community-popup-price-amount">99</span>
          </p>
          <p className="community-payment-badge mx-auto mt-2 w-fit rounded-full px-3.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-white">
            One Time Payment
          </p>

          <div className="community-access-box mt-3">
            <span className="community-access-icon">
              <ShieldLockIcon />
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[#3B1C5B]">Lifetime Community Access</p>
              <p className="text-[9px] leading-snug text-[#7A6B96]">
                Pay once & stay connected forever
              </p>
            </div>
          </div>

          <JoinNowButton onClick={onJoin} />

          <div className="mt-3 flex items-center justify-center gap-3 text-[9px] font-medium text-[#8A7AA8]">
            <span className="inline-flex items-center gap-1.5">
              <span className="community-trust-icon"><ShieldMini /></span>
              Secure Payment
            </span>
            <span className="h-3 w-px bg-[#D8C4EF]" />
            <span className="inline-flex items-center gap-1.5">
              <span className="community-trust-icon"><BoltIcon /></span>
              Instant Access
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function JoinNowButton({ onClick, label = "Join Now" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick} className="community-join-btn mt-4">
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
}: {
  details: CommunityJoinDetails;
  setDetails: (value: CommunityJoinDetails) => void;
  onSubmit: (e: FormEvent) => void;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full flex-col py-1">
      <h3
        className="text-[18px] font-semibold text-[#3B1C5B]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Your Details
      </h3>
      <p className="mt-1 text-[11px] text-[#7A6B96]">
        Fill in your details to continue to payment.
      </p>

      <form onSubmit={onSubmit} className="mt-4 flex flex-1 flex-col space-y-3">
        <PopupField label="Full Name *">
          <input
            required
            type="text"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            placeholder="Enter your full name"
            className="community-popup-input"
          />
        </PopupField>
        <PopupField label="WhatsApp Number *">
          <input
            required
            type="tel"
            value={details.whatsapp}
            onChange={(e) => setDetails({ ...details, whatsapp: e.target.value })}
            placeholder="+91 98765 43210"
            className="community-popup-input"
          />
        </PopupField>
        <PopupField label="Email Address *">
          <input
            required
            type="email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            placeholder="you@email.com"
            className="community-popup-input"
          />
        </PopupField>

        <div className="mt-auto space-y-2 pt-2">
          <button type="submit" className="community-join-btn">
            <span className="community-join-btn-left">
              <PeopleIcon />
            </span>
            <span className="community-join-btn-label">Continue</span>
            <span className="community-join-btn-arrow">
              <ArrowIcon />
            </span>
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full rounded-full border border-[#D8C4EF] py-2 text-[11px] font-semibold text-[#4B2475] hover:bg-[#F3EAFD]"
          >
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
}: {
  details: CommunityJoinDetails;
  error: string | null;
  isPaying: boolean;
  onPay: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full flex-col py-1">
      <h3
        className="text-[18px] font-semibold text-[#3B1C5B]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Complete Payment
      </h3>
      <p className="mt-1 text-[11px] text-[#7A6B96]">
        Review your details and pay ₹99 for lifetime access.
      </p>

      <div className="mt-4 space-y-1.5 rounded-xl border border-[#E4D8F5] bg-[#FAF6FF] p-3 text-[11px] text-[#5A3D8C]">
        <p><strong>Name:</strong> {details.name}</p>
        <p><strong>WhatsApp:</strong> {details.whatsapp}</p>
        <p><strong>Email:</strong> {details.email}</p>
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
          className="w-full rounded-full border border-[#D8C4EF] py-2 text-[11px] font-semibold text-[#4B2475] hover:bg-[#F3EAFD] disabled:opacity-60"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
}

function SuccessPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F6EE] text-[#2F9B63]">
        <CheckIcon />
      </span>
      <h3
        className="mt-3 text-[20px] font-semibold text-[#3B1C5B]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Welcome to the Community!
      </h3>
      <p className="mt-2 max-w-[240px] text-[11px] leading-relaxed text-[#7A6B96]">
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

function PopupField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.05em] text-[#6B5B8A]">
        {label}
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
