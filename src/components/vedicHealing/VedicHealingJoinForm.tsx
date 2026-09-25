"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import CongratulationsDialog from "@/components/CongratulationsDialog";
import {
  checkCommunityJoinPaymentStatus,
  COMMUNITY_JOIN_PRICE_INR,
  purchaseCommunityJoinWithRazorpay,
} from "@/services/communityJoinService";
import { ApiError } from "@/services/apiClient";
import { getStoredUser } from "@/lib/authStorage";
import { useAppSelector } from "@/store/hooks";
import type { AuthUser } from "@/types/auth";
import "@/components/communityJoin/community-popup.css";

export default function VedicHealingJoinForm() {
  const router = useRouter();
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const authHydrated = useAppSelector((s) => s.auth.hydrated);
  const isLoggedIn = Boolean(token);
  const [error, setError] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const submitLockRef = useRef(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const profileDetails = useMemo(
    () => ({
      name:
        [user?.first_name, user?.last_name].filter(Boolean).join(" ").trim() ||
        String(user?.name || "").trim(),
      email: String(user?.email || "").trim(),
      whatsapp: String(
        user?.phone || user?.whatsapp_number || user?.alternate_phone || "",
      ).trim(),
    }),
    [user],
  );

  useEffect(() => {
    if (!isLoggedIn) return;
    const storedUser = user || getStoredUser<AuthUser>();
    setDetails({
      name:
        [storedUser?.first_name, storedUser?.last_name].filter(Boolean).join(" ").trim() ||
        String(storedUser?.name || "").trim() ||
        profileDetails.name,
      email: String(storedUser?.email || "").trim() || profileDetails.email,
      whatsapp: String(
        storedUser?.phone ||
          storedUser?.whatsapp_number ||
          storedUser?.alternate_phone ||
          "",
      ).trim() || profileDetails.whatsapp,
    });
  }, [isLoggedIn, user, profileDetails.name, profileDetails.email, profileDetails.whatsapp]);

  useEffect(() => {
    if (!authHydrated || !isLoggedIn) return;
    let cancelled = false;
    checkCommunityJoinPaymentStatus()
      .then((res) => {
        if (!cancelled && res?.success === true) setShowCongrats(true);
      })
      .catch(() => {
        // Keep the form available if payment status cannot be confirmed.
      });
    return () => {
      cancelled = true;
    };
  }, [authHydrated, isLoggedIn]);

  function update(field: "name" | "email" | "whatsapp", value: string) {
    const next = field === "whatsapp" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setDetails((prev) => ({ ...prev, [field]: next }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitLockRef.current || isPaying) return;

    setError(null);
    const name = details.name.trim();
    const email = details.email.trim();
    const whatsapp = details.whatsapp.replace(/\D/g, "").slice(0, 10);

    if (!name || !email || !whatsapp) {
      setError("Please enter your name, email and phone to continue payment.");
      return;
    }
    if (whatsapp.length !== 10) {
      setError("Please enter a 10-digit WhatsApp number.");
      return;
    }

    submitLockRef.current = true;
    setIsPaying(true);
    try {
      await purchaseCommunityJoinWithRazorpay(
        { name, email, whatsapp },
        "vedic_healing",
      );

      if (typeof window !== "undefined" && window.oaiq) {
        window.oaiq("measure", "order_created", { type: "contents" });
      }

      try {
        const status = await checkCommunityJoinPaymentStatus();
        if (status?.success === true) {
          setShowCongrats(true);
          return;
        }
      } catch {
        // Razorpay checkout already succeeded.
      }

      setShowCongrats(true);
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

  return (
    <>
      <div className="just99-lead-card">
        <h2 className="just99-lead-title">Join the Healing Community</h2>
        <p className="just99-lead-subtitle">
          Pay just ₹{COMMUNITY_JOIN_PRICE_INR} to join our community
        </p>
        <p className="just99-lead-webinar">
          <span className="just99-lead-webinar-label">Upcoming Webinar</span>
          <span className="just99-lead-webinar-dates">Comming Soon</span>
        </p>

        <form onSubmit={onSubmit} className="just99-lead-form">
          <LeadField
            label="Full Name"
            value={details.name}
            placeholder="Full name"
            icon={<UserFieldIcon />}
            onChange={(value) => update("name", value)}
          />
          <LeadField
            label="Email Address"
            value={details.email}
            placeholder="Email address"
            type="email"
            inputMode="email"
            icon={<EmailFieldIcon />}
            onChange={(value) => update("email", value)}
          />
          <LeadField
            label="WhatsApp Number"
            value={details.whatsapp}
            placeholder="WhatsApp number"
            type="tel"
            maxLength={10}
            minLength={10}
            inputMode="numeric"
            icon={<PhoneFieldIcon />}
            onChange={(value) => update("whatsapp", value)}
          />
          {error ? (
            <p className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[12px] text-[#B42318]">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isPaying}
            className="just99-lead-submit disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPaying ? "Opening payment..." : "Pay Now"}
          </button>
        </form>

        <ul className="just99-lead-checks">
          <li>
            <GoldCheckIcon />
            One-time payment of ₹{COMMUNITY_JOIN_PRICE_INR}
          </li>
          <li>
            <GoldCheckIcon />
            Lifetime community access
          </li>
        </ul>

        <p className="just99-lead-safe">
          <LockMiniIcon />
          Your details are 100% safe with us.
        </p>
      </div>

      {showCongrats ? (
        <div className="community-popup-overlay fixed inset-0 z-[250] overflow-y-auto overscroll-contain">
          <div className="flex min-h-full items-center justify-center p-3 py-6 sm:p-4">
            <button
              type="button"
              aria-label="Close congratulations"
              className="fixed inset-0 bg-[#1a1240]/55 backdrop-blur-[6px]"
              onClick={() => {
                setShowCongrats(false);
                router.push("/");
              }}
            />
            <div className="relative z-10 w-full max-w-[440px]">
              <CongratulationsDialog
                onClose={() => {
                  setShowCongrats(false);
                  router.push("/");
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function LeadField({
  label,
  value,
  placeholder,
  type = "text",
  inputMode,
  icon,
  maxLength,
  minLength,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
  inputMode?: "text" | "email" | "tel" | "numeric";
  icon: React.ReactNode;
  maxLength?: number;
  minLength?: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="just99-lead-field">
      <span className="just99-lead-field-icon" aria-hidden>
        {icon}
      </span>
      <span className="sr-only">{label}</span>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        maxLength={maxLength}
        minLength={minLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="just99-lead-input"
        autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "name"}
      />
    </label>
  );
}

function UserFieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.2 19.2c.9-3.3 3.5-5.1 6.8-5.1s5.9 1.8 6.8 5.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneFieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 3.8h8c.9 0 1.6.7 1.6 1.6v13.2c0 .9-.7 1.6-1.6 1.6H8c-.9 0-1.6-.7-1.6-1.6V5.4c0-.9.7-1.6 1.6-1.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M10.5 18.2h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function EmailFieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.2 7.2 12 12.4 19.8 7.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GoldCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7.1" fill="currentColor" />
      <path
        d="M4.7 8.15 6.9 10.3 11.3 5.7"
        stroke="#1b1b4d"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockMiniIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="11" width="12" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.4 11V8.4a3.6 3.6 0 0 1 7.2 0V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
