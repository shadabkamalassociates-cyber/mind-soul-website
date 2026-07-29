import type { CheckoutPayload } from "@/types/purchase";
import { apiPost } from "@/services/apiClient";
import { openRazorpayCheckout } from "@/lib/razorpayCheckout";

export type SessionPurchaseCreateResponse = {
  success?: boolean;
  message?: string;
  purchase?: Record<string, unknown>;
  razorpayOrder?: {
    id: string;
    amount: number;
    currency: string;
    key: string;
  };
  amountBreakdown?: {
    totalAmount?: number;
    [key: string]: unknown;
  };
};

export type CreateSessionPurchasePayload = CheckoutPayload & {
  session_id: string;
  quantity?: number;
};

export async function createSessionPurchase(
  body: CreateSessionPurchasePayload,
) {
  return apiPost<SessionPurchaseCreateResponse>(
    "/payment/session-purchase/create",
    {
      payment_type: "full",
      quantity: 1,
      coupon_code: null,
      notes: null,
      ...body,
    },
  );
}

export async function verifySessionPayment(body: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  return apiPost("/payment/session-purchase/verify-payment", body);
}

export async function purchaseSessionWithRazorpay(
  body: CreateSessionPurchasePayload,
) {
  const createRes = await createSessionPurchase(body);
  const order = createRes.razorpayOrder;

  if (!createRes.success || !order?.id || !order.key) {
    throw new Error(createRes.message || "Failed to create payment order");
  }

  const payment = await openRazorpayCheckout({
    key: order.key,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    description: "SoulSensei session purchase",
  });

  await verifySessionPayment(payment);

  return createRes;
}

/** @deprecated Use purchaseSessionWithRazorpay */
export async function checkoutCart(body: CheckoutPayload = {}) {
  return apiPost("/payment/checkout", {
    payment_type: "full",
    coupon_code: null,
    notes: null,
    ...body,
  });
}
