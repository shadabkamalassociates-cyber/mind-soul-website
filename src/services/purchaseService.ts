import type { CheckoutPayload, SessionPurchase } from "@/types/purchase";
import { apiPost, extractData } from "@/services/apiClient";

/** Checkout all items currently in the user's cart */
export async function checkoutCart(body: CheckoutPayload = {}) {
  const res = await apiPost("/payment/checkout", {
    payment_type: "full",
    coupon_code: null,
    notes: null,
    ...body,
  });
  return extractData<SessionPurchase>(res);
}

/** @deprecated Backend exposes /payment/checkout, not /session-purchase/create */
export async function createSessionPurchase(body: CheckoutPayload & { session_id?: string }) {
  return checkoutCart({
    payment_type: body.payment_type,
    coupon_code: body.coupon_code,
    notes: body.notes,
  });
}
