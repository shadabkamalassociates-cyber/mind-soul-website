"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearCartItems,
  clearPurchaseMessage,
  fetchCart,
  removeCartItem,
} from "@/store/slices/cartSlice";
import { mapCartItemsForUi } from "@/lib/cartUi";
import { purchaseSessionWithRazorpay } from "@/services/purchaseService";
import { ApiError } from "@/services/apiClient";

function formatInr(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

function formatSchedule(date?: string, time?: string, duration?: string) {
  if (date && date !== "TBA") {
    const shortDate = date.replace(/,\s*\d{4}$/, "");
    const shortTime = time?.replace(/\s*IST$/i, "").trim();
    return shortTime ? `${shortDate} • ${shortTime}` : shortDate;
  }
  if (duration && duration !== "—") return `On demand • ${duration}`;
  return "Schedule shared after booking";
}

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((s) => s.cart);
  const token = useAppSelector((s) => s.auth.token);
  const hydrated = useAppSelector((s) => s.auth.hydrated);
  const sessionsState = useAppSelector((s) => s.sessions);
  const recordedState = useAppSelector((s) => s.recordedSessions);

  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && token) {
      void dispatch(fetchCart());
    }
  }, [dispatch, hydrated, token]);

  const allSessions = useMemo(
    () => [...sessionsState.items, ...recordedState.items],
    [sessionsState.items, recordedState.items],
  );

  const lines = useMemo(
    () =>
      mapCartItemsForUi(
        cartState.items,
        allSessions,
        cartState.sessionSnapshots,
      ),
    [cartState.items, allSessions, cartState.sessionSnapshots],
  );
  const sessionPrice =
    cartState.subtotal > 0
      ? cartState.subtotal
      : lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const taxesAndFees =
    cartState.total > cartState.subtotal && cartState.subtotal > 0
      ? Math.round(cartState.total - cartState.subtotal)
      : Math.round(sessionPrice * 0.18);
  const toBePaid = cartState.total > 0 ? cartState.total : sessionPrice + taxesAndFees;

  const isLoading =
    !hydrated ||
    (Boolean(token) && cartState.status === "loading") ||
    (Boolean(token) && cartState.status === "idle");
  const isEmpty =
    hydrated &&
    !isLoading &&
    cartState.status === "succeeded" &&
    lines.length === 0 &&
    !purchaseMessage;
  const isCheckoutComplete = Boolean(purchaseMessage);

  async function handleRemove(cartItemId: string, sessionId: string) {
    setRemovingId(cartItemId);
    try {
      await dispatch(removeCartItem({ itemId: cartItemId, sessionId })).unwrap();
    } finally {
      setRemovingId(null);
    }
  }

  async function handlePayNow() {
    if (lines.length === 0) return;

    setIsPaying(true);
    setPayError(null);
    setPurchaseMessage(null);
    dispatch(clearPurchaseMessage());

    try {
      for (const line of lines) {
        await purchaseSessionWithRazorpay({
          session_id: line.sessionId,
          payment_type: "full",
          quantity: line.quantity,
          coupon_code: coupon.trim() || null,
          notes: null,
        });
      }

      try {
        await dispatch(clearCartItems()).unwrap();
      } catch {
        // verify-payment already removes paid sessions; full clear is best-effort
        void dispatch(fetchCart());
      }

      setPurchaseMessage("Payment successful! Your session purchase is confirmed.");
    } catch (err) {
      setPayError(
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Payment failed",
      );
    } finally {
      setIsPaying(false);
    }
  }

  if (isEmpty && !isCheckoutComplete) {
    return (
      <main className="min-h-screen bg-[#F8F9FC] text-[#1A1A4A]">
        <Header />
        <div className="mx-auto max-w-md px-4 py-16 text-center sm:py-20">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A]"
          >
            <BackIcon /> Back
          </button>

          <div className="rounded-2xl border border-[#E8EAF4] bg-white px-6 py-10 shadow-[0_8px_32px_rgba(26,26,74,0.06)] sm:px-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F1FA] text-[#3D3D8F]">
              <CartEmptyIcon />
            </div>
            <h1
              className="text-[26px] font-semibold text-[#3D3D8F] sm:text-[28px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Your cart is empty
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-[#5C5C7A]">
              Browse sessions and tap Book Now to add items here.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/live-sessions"
                className="rounded-full bg-[#3D3D8F] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#2F2F70]"
              >
                Browse Sessions
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F9FC] pb-28 text-[#1A1A4A]">
      <Header />

      <div className="mx-auto max-w-[1120px] px-4 pt-6 sm:px-5 lg:px-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-[15px] font-medium text-[#3D3D8F] transition hover:text-[#1A1A4A]"
        >
          <BackIcon />
          Your cart
        </button>

        {purchaseMessage && (
          <div className="mb-5 rounded-xl border border-[#86EFAC] bg-[#F0FDF4] px-4 py-3 text-[14px] text-[#166534]">
            {purchaseMessage}
          </div>
        )}

        {(payError || cartState.error) && !isEmpty && (
          <div className="mb-5 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-[14px] text-[#B91C1C]">
            {payError ?? cartState.error}
          </div>
        )}

        {isLoading && (
          <p className="mb-4 text-[14px] text-[#5C5C7A]">Loading cart...</p>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-10">
          <section>
            <h2
              className="mb-4 text-[18px] font-semibold text-[#3D3D8F] sm:text-[20px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Summary
            </h2>
            <div className="space-y-3">
              {lines.map((line) => (
                <article
                  key={line.cartItemId}
                  className="rounded-2xl border border-[#E8EAF4] bg-white p-4 shadow-[0_4px_20px_rgba(26,26,74,0.04)] sm:p-5"
                >
                  <div className="flex gap-4">
                    <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-[#F0F1FA] sm:h-[96px] sm:w-[96px]">
                      <Image
                        src={line.image}
                        alt={line.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            href={line.detailHref}
                            className="line-clamp-2 text-[15px] font-semibold leading-snug text-[#1A1A4A] hover:text-[#3D3D8F] hover:underline sm:text-[16px]"
                          >
                            {line.title}
                          </Link>
                          <p className="mt-1 text-[13px] text-[#5C5C7A]">
                            {line.expert}
                          </p>
                          <p className="mt-1 text-[12px] text-[#8A8AA8]">
                            {formatSchedule(line.date, line.time, line.duration)}
                          </p>
                        </div>
                        <p className="shrink-0 text-[15px] font-semibold text-[#3D3D8F]">
                          {line.price <= 0 ? (
                            <span className="text-[#C9A06A]">Free</span>
                          ) : (
                            formatInr(line.price * line.quantity)
                          )}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          aria-label="Remove from cart"
                          disabled={
                            cartState.actionStatus === "loading" ||
                            removingId === line.cartItemId
                          }
                          onClick={() => void handleRemove(line.cartItemId, line.sessionId)}
                          className="rounded-lg p-2 text-[#8A8AA8] transition hover:bg-[#F0F1FA] hover:text-[#3D3D8F] disabled:opacity-50"
                        >
                          {removingId === line.cartItemId ? (
                            <span className="text-[11px] font-medium">...</span>
                          ) : (
                            <TrashIcon />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="hidden lg:block">
            <PriceBreakdown
              sessionPrice={sessionPrice}
              taxesAndFees={taxesAndFees}
              toBePaid={toBePaid}
              couponOpen={couponOpen}
              coupon={coupon}
              onToggleCoupon={() => setCouponOpen((v) => !v)}
              onCouponChange={setCoupon}
            />
          </aside>
        </div>

        <div className="mt-8 lg:hidden">
          <PriceBreakdown
            sessionPrice={sessionPrice}
            taxesAndFees={taxesAndFees}
            toBePaid={toBePaid}
            couponOpen={couponOpen}
            coupon={coupon}
            onToggleCoupon={() => setCouponOpen((v) => !v)}
            onCouponChange={setCoupon}
          />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E8EAF4] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-4 py-4 sm:px-5 lg:px-6">
          <div>
            <p className="text-[22px] font-bold leading-none text-[#3D3D8F] sm:text-[24px]">
              {formatInr(toBePaid)}
            </p>
            <p className="mt-1 text-[11px] text-[#8A8AA8] sm:text-[12px]">
              Incl. Taxes &amp; Fees
            </p>
          </div>
          <button
            type="button"
            disabled={isPaying || lines.length === 0}
            onClick={() => void handlePayNow()}
            className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-[#3D3D8F] px-8 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#2F2F70] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[160px]"
          >
            {isPaying ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </main>
  );
}

function PriceBreakdown({
  sessionPrice,
  taxesAndFees,
  toBePaid,
  couponOpen,
  coupon,
  onToggleCoupon,
  onCouponChange,
}: {
  sessionPrice: number;
  taxesAndFees: number;
  toBePaid: number;
  couponOpen: boolean;
  coupon: string;
  onToggleCoupon: () => void;
  onCouponChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="rounded-2xl border border-[#E8EAF4] bg-white p-5 shadow-[0_4px_20px_rgba(26,26,74,0.04)]">
        <div className="space-y-3 text-[14px]">
          <div className="flex items-center justify-between text-[#5C5C7A]">
            <span>Session price</span>
            <span className="font-medium text-[#1A1A4A]">{formatInr(sessionPrice)}</span>
          </div>
          <div className="flex items-center justify-between text-[#5C5C7A]">
            <span className="inline-flex items-center gap-1.5">
              Taxes and Fees
              <InfoIcon />
            </span>
            <span className="font-medium text-[#1A1A4A]">{formatInr(taxesAndFees)}</span>
          </div>
        </div>
        <div className="my-4 border-t border-[#E8EAF4]" />
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold text-[#1A1A4A]">To be paid</span>
          <span className="text-[18px] font-bold text-[#3D3D8F]">{formatInr(toBePaid)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleCoupon}
        className="mt-4 text-[13px] text-[#3D3D8F] underline underline-offset-2 hover:text-[#1A1A4A]"
      >
        Do you have a coupon code?
      </button>

      {couponOpen && (
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={coupon}
            onChange={(e) => onCouponChange(e.target.value)}
            placeholder="Enter coupon code"
            className="min-w-0 flex-1 rounded-xl border border-[#E0E2EE] bg-white px-3 py-2.5 text-[13px] text-[#1A1A4A] outline-none placeholder:text-[#A0A0B8] focus:border-[#3D3D8F]"
          />
        </div>
      )}
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 6L8 12L14 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 7H19M9 7V5H15V7M8 7V19H16V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#A0A0B8]">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10V16M12 7.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CartEmptyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6H20L19 14H8L7 6H6M6 6L5 3H3M8 18C8.55228 18 9 17.5523 9 17C9 16.4477 8.55228 16 8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18ZM18 18C18.5523 18 19 17.5523 19 17C19 16.4477 18.5523 16 18 16C17.4477 16 17 16.4477 17 17C17 17.5523 17.4477 18 18 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
