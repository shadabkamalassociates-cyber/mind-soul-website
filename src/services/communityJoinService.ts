import { apiPost } from "@/services/apiClient";
import { openRazorpayCheckout } from "@/lib/razorpayCheckout";

/** Community join price in INR (Just ₹99 offer). Override via NEXT_PUBLIC_COMMUNITY_JOIN_AMOUNT. */
export const COMMUNITY_JOIN_PRICE_INR = Number(
  process.env.NEXT_PUBLIC_COMMUNITY_JOIN_AMOUNT ?? "99",
);

export type CommunityJoinDetails = {
  name: string;
  email: string;
  whatsapp: string;
};

type CommunityJoinOrderResponse = {
  success?: boolean;
  message?: string;
  razorpayOrder?: {
    id: string;
    amount: number;
    currency: string;
    key: string;
  };
};

export async function submitCommunityJoinLead(
  details: CommunityJoinDetails & {
    first_name?: string;
    last_name?: string;
  },
  source = "website_popup",
) {
  return apiPost(
    "/community/join-lead",
    {
      name: details.name,
      first_name: details.first_name,
      last_name: details.last_name,
      email: details.email,
      phone: details.whatsapp,
      source,
    },
    false,
  );
}

export async function createCommunityJoinOrder(
  details: CommunityJoinDetails,
  source = "website_popup",
) {
  return apiPost<CommunityJoinOrderResponse>(
    "/payment/community-join/create",
    {
      name: details.name,
      email: details.email,
      phone: details.whatsapp,
      payment_type: "full",
      amount: COMMUNITY_JOIN_PRICE_INR,
      source,
      notes: JSON.stringify({
        type: "community_membership",
        name: details.name,
        email: details.email,
        whatsapp: details.whatsapp,
      }),
    },
    false,
  );
}

export async function verifyCommunityJoinPayment(body: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  return apiPost("/payment/community-join/verify-payment", body, false);
}

export type CommunityPaymentStatusResponse = {
  success?: boolean;
  message?: string;
  payment?: unknown;
};

/** Checks whether the current user already has a successful community join payment. */
export async function checkCommunityJoinPaymentStatus() {
  return apiPost<CommunityPaymentStatusResponse>(
    "/community/verify-payment",
    {},
    true,
  );
}

function maskKeyId(key: string) {
  if (!key || key.length < 12) return "[redacted]";
  return `${key.slice(0, 12)}...`;
}

export async function purchaseCommunityJoinWithRazorpay(
  details: CommunityJoinDetails,
  source = "website_popup",
) {
  try {
    await submitCommunityJoinLead(details, source);
  } catch {
    // Lead capture is best-effort; payment can still proceed.
  }

  const createRes = await createCommunityJoinOrder(details, source);
  const order = createRes.razorpayOrder;

  if (!createRes.success || !order?.id || !order.key) {
    throw new Error(
      createRes.message || "Unable to start payment. Please try again later.",
    );
  }

  console.log("[community-join] opening Razorpay checkout", {
    order_id: order.id,
    amount_paise: order.amount,
    currency: order.currency,
    key_id: maskKeyId(order.key),
    mode: order.key.startsWith("rzp_live") ? "live" : "test",
    source,
  });

  const payment = await openRazorpayCheckout({
    key: order.key,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency || "INR",
    name: "Cosmic Guruji",
    description: "Healing Community — Lifetime Access",
    prefill: {
      name: details.name,
      email: details.email,
      contact: details.whatsapp,
    },
  });

  console.log("[community-join] Razorpay handler response", {
    order_id: payment.razorpayOrderId,
    payment_id: payment.razorpayPaymentId,
    has_signature: Boolean(payment.razorpaySignature),
  });

  await verifyCommunityJoinPayment(payment);

  return createRes;
}
