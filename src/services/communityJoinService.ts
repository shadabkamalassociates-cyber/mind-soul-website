import { apiPost } from "@/services/apiClient";
import { openRazorpayCheckout } from "@/lib/razorpayCheckout";

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
  details: CommunityJoinDetails,
  source = "website_popup",
) {
  return apiPost(
    "/community/join-lead",
    {
      name: details.name,
      email: details.email,
      phone: details.whatsapp,
      source,
    },
    false,
  );
}

export async function createCommunityJoinOrder(details: CommunityJoinDetails) {
  return apiPost<CommunityJoinOrderResponse>(
    "/payment/community-join/create",
    {
      name: details.name,
      email: details.email,
      phone: details.whatsapp,
      payment_type: "full",
      amount: 99,
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

export async function purchaseCommunityJoinWithRazorpay(
  details: CommunityJoinDetails,
  source = "website_popup",
) {
  try {
    await submitCommunityJoinLead(details, source);
  } catch {
    // Lead capture is best-effort; payment can still proceed.
  }

  const createRes = await createCommunityJoinOrder(details);
  const order = createRes.razorpayOrder;

  if (!createRes.success || !order?.id || !order.key) {
    throw new Error(
      createRes.message || "Unable to start payment. Please try again later.",
    );
  }

  const payment = await openRazorpayCheckout({
    key: order.key,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    name: "Cosmic Guruji",
    description: "Healing Community — Lifetime Access",
    prefill: {
      name: details.name,
      email: details.email,
      contact: details.whatsapp,
    },
  });

  await verifyCommunityJoinPayment(payment);

  return createRes;
}
