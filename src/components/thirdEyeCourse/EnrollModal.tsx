"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/services/apiClient";
import { purchaseThirdEyeCourseWithRazorpay } from "@/services/courseJoinService";
import { THIRD_EYE_COURSE } from "./content";

type EnrollModalProps = {
  open: boolean;
  onClose: () => void;
};

const inputCls =
  "w-full rounded-xl border border-[#E6D9F5] bg-[#FBF8FF] px-3.5 py-3 text-sm text-[#211936] outline-none placeholder:text-[#9A8BB0] focus:border-[#6842A6]";

export default function EnrollModal({ open, onClose }: EnrollModalProps) {
  const router = useRouter();
  const lockRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });

  useEffect(() => {
    if (!open) return;
    setError(null);
    setSubmitting(false);
    lockRef.current = false;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (lockRef.current || submitting) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const whatsapp = form.whatsapp.replace(/\D/g, "");

    if (!name || !email || whatsapp.length < 10) {
      setError("Please enter your name, a valid email, and a 10-digit mobile number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    lockRef.current = true;
    setSubmitting(true);
    setError(null);

    try {
      await purchaseThirdEyeCourseWithRazorpay({ name, email, whatsapp });
      onClose();
      router.push("/congratulations");
    } catch (err) {
      if (err instanceof Error && err.message === "Payment cancelled") {
        setError("Payment was cancelled. You can try again when you are ready.");
      } else if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Unable to complete enrollment. Please try again.");
      }
      lockRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#24133F]/55 backdrop-blur-[2px]"
        aria-label="Close enrollment"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enroll-title"
        className="relative z-10 w-full max-w-[440px] rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6842A6]">
          Secure checkout
        </p>
        <h2
          id="enroll-title"
          className="mt-1 text-[22px] font-semibold text-[#24133F]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Enroll in {THIRD_EYE_COURSE.name}
        </h2>
        <p className="mt-1 text-sm text-[#5B4B73]">
          One-time payment of ₹{THIRD_EYE_COURSE.priceInr.toLocaleString("en-IN")}
        </p>

        <form className="mt-5 space-y-3.5" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[#5B4B73]">Full name</span>
            <input
              required
              className={inputCls}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[#5B4B73]">Email</span>
            <input
              required
              type="email"
              className={inputCls}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@email.com"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[#5B4B73]">Mobile number</span>
            <input
              required
              inputMode="numeric"
              className={inputCls}
              value={form.whatsapp}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  whatsapp: e.target.value.replace(/\D/g, "").slice(0, 10),
                }))
              }
              placeholder="10-digit WhatsApp number"
            />
          </label>

          {error ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#7C4DFF] to-[#4B2A9A] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(104,66,166,0.35)] disabled:opacity-60"
          >
            {submitting ? "Opening secure payment…" : `Pay ₹${THIRD_EYE_COURSE.priceInr.toLocaleString("en-IN")}`}
          </button>
          <p className="text-center text-[11px] text-[#8A7BA3]">100% Secure Payment · Razorpay</p>
        </form>
      </div>
    </div>
  );
}
