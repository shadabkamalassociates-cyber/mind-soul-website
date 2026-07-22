"use client";

import CartPage from "@/components/CartPage";

export default function CartPageClient({ sessionSlug }: { sessionSlug?: string }) {
  return <CartPage sessionSlug={sessionSlug} />;
}
