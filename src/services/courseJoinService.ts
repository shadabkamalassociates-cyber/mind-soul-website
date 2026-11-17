import { apiPost } from "@/services/apiClient";
import { openRazorpayCheckout } from "@/lib/razorpayCheckout";
import { THIRD_EYE_COURSE } from "@/components/thirdEyeCourse/content";

export type CourseJoinDetails = {
  name: string;
  email: string;
  whatsapp: string;
};

type CourseJoinOrderResponse = {
  success?: boolean;
  message?: string;
  razorpayOrder?: {
    id: string;
    amount: number;
    currency: string;
    key: string;
  };
};

export async function purchaseThirdEyeCourseWithRazorpay(
  details: CourseJoinDetails,
) {
  const createRes = await apiPost<CourseJoinOrderResponse>(
    "/community/join-payment",
    {
      name: details.name,
      email: details.email,
      phone: details.whatsapp,
      payment_type: "full",
      amount: THIRD_EYE_COURSE.priceInr,
      source: THIRD_EYE_COURSE.source,
      notes: JSON.stringify({
        type: "third_eye_course",
        course: THIRD_EYE_COURSE.name,
        name: details.name,
        email: details.email,
        whatsapp: details.whatsapp,
      }),
    },
    true,
  );

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
    currency: order.currency || "INR",
    name: "Cosmic Guruji",
    description: THIRD_EYE_COURSE.name,
    prefill: {
      name: details.name,
      email: details.email,
      contact: details.whatsapp,
    },
  });

  await apiPost(
    "/community/confirm-payment",
    {
      razorpayOrderId: payment.razorpayOrderId,
      razorpayPaymentId: payment.razorpayPaymentId,
      razorpaySignature: payment.razorpaySignature,
    },
    true,
  );

  return createRes;
}
