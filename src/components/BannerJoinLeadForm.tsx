"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { purchaseCommunityJoinWithRazorpay } from "@/services/communityJoinService";
import "@/components/communityJoin/community-popup.css";

type BannerJoinLeadFormProps = {
  open: boolean;
  onClose: () => void;
  initialName?: string;
  initialEmail?: string;
  initialPhone?: string;
};

function ReadOnlyField({
  label,
  value,
  placeholder,
}: {
  label: string;
  value: string;
  placeholder: string;
}) {
  return (
    <div className="block">
      <span className="mb-1.5 block text-xs font-medium text-[#5A3D8C]">
        {label}
      </span>
      <div
        aria-readonly="true"
        className="community-popup-input w-full cursor-not-allowed select-none bg-[#F3F0FA] text-[#3B1C5B] opacity-90"
      >
        {value.trim() || (
          <span className="text-[#A89BC4]">{placeholder}</span>
        )}
      </div>
    </div>
  );
}

export default function BannerJoinLeadForm({
  open,
  onClose,
  initialName = "",
  initialEmail = "",
  initialPhone = "",
}: BannerJoinLeadFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const submitLockRef = useRef(false);

  const name = initialName.trim();
  const email = initialEmail.trim();
  const phone = initialPhone.trim();

  useEffect(() => {
    if (!open) return;
    setError(null);
    setSubmitting(false);
    submitLockRef.current = false;
  }, [open, initialName, initialEmail, initialPhone]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (submitLockRef.current || submitting) return;

    setError(null);

    if (!name || !email || !phone) {
      setError(
        "Your profile is missing name, email or phone. Please update your account first.",
      );
      return;
    }

    submitLockRef.current = true;
    setSubmitting(true);
    try {
      await purchaseCommunityJoinWithRazorpay(
        {
          name,
          email,
          whatsapp: phone,
        },
        "website_banner",
      );
      onClose();
      router.push("/congratulations");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Payment could not be completed. Please try again.",
      );
    } finally {
      submitLockRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain">
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
        <button
          type="button"
          aria-label="Close form"
          className="fixed inset-0 bg-[#00000096]/65 backdrop-blur-[6px]"
          onClick={onClose}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="banner-join-lead-title"
          className="community-popup community-popup-modal community-popup-animate relative z-10 w-full max-w-[420px] overflow-hidden rounded-[20px] border border-white/70 bg-white/90 p-5 shadow-[0_32px_80px_rgba(76,29,149,0.22)] backdrop-blur-xl sm:rounded-[28px] sm:p-6"
        >
          <div className="community-popup-glow-border" aria-hidden />
          <div className="community-popup-accent" aria-hidden />

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-[#6B5B8C] transition hover:bg-[#F3EEFA] hover:text-[#3B1C5B]"
          >
            ×
          </button>

          <div className="pr-8">
            <h2
              id="banner-join-lead-title"
              className="text-xl font-semibold text-[#3B1C5B]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Join Cosmic Guruji
            </h2>
            <p className="mt-1 text-sm text-[#7A6B96]">
              Confirm your account details and pay ₹99 for lifetime access.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-5 space-y-3">
            <ReadOnlyField
              label="Full Name"
              value={name}
              placeholder="Not available on your profile"
            />

            <ReadOnlyField
              label="Email"
              value={email}
              placeholder="Not available on your profile"
            />

            <ReadOnlyField
              label="Phone"
              value={phone}
              placeholder="Not available on your profile"
            />

            {error && (
              <p className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[11px] text-[#B42318]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !name || !email || !phone}
              className="community-join-btn mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="community-join-btn-label">
                {submitting ? "Processing..." : "Join Now"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
