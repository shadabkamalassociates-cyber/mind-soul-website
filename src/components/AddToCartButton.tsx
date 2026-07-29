"use client";

import { useAddToCart } from "@/hooks/useAddToCart";

type AddToCartButtonProps = {
  sessionId: string;
  label?: string;
  className?: string;
  redirect?: boolean;
  variant?: "primary" | "dark" | "inline";
  quantity?: number;
  discount?: number;
  metadata?: Record<string, unknown> | null;
};

export default function AddToCartButton({
  sessionId,
  label = "Book Now",
  className,
  redirect = true,
  variant = "primary",
  quantity = 1,
  discount = 0,
  metadata = null,
}: AddToCartButtonProps) {
  const { addToCart, loading } = useAddToCart();

  const baseClass =
    variant === "dark"
      ? "flex w-full items-center justify-center rounded-lg bg-[#4A4AE2] py-3 text-[14px] font-semibold text-white transition hover:bg-[#3A3AD2] disabled:opacity-60"
      : variant === "inline"
        ? "inline-flex shrink-0 items-center rounded-md bg-[#3D3D8F] px-2.5 py-1 text-[10px] font-semibold text-white transition hover:bg-[#2F2F70] disabled:opacity-60 sm:text-[11px]"
        : "flex flex-1 items-center justify-center rounded-lg bg-[#3D3D8F] py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#2F2F70] disabled:opacity-60";

  return (
    <button
      type="button"
      disabled={loading || !sessionId}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void addToCart(sessionId, { redirect, quantity, discount, metadata });
      }}
      className={className ?? baseClass}
    >
      {loading ? "Adding..." : label}
    </button>
  );
}
