export type CheckoutPayload = {
  payment_type?: string;
  coupon_code?: string | null;
  notes?: string | null;
};

/** @deprecated Use CheckoutPayload — purchase is cart checkout on backend */
export type CreatePurchasePayload = CheckoutPayload & {
  session_id?: string;
  quantity?: number;
};

export type SessionPurchase = {
  id?: string;
  session_id?: string;
  payment_type?: string;
  quantity?: number;
  status?: string;
  amount?: number | string;
  [key: string]: unknown;
};
