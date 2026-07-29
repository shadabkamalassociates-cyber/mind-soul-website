export type SessionPurchase = {
  session_id?: string | number;
  payment_status?: string | null;
  purchase_status?: string | null;
};

export function isPaidPurchase(purchase: SessionPurchase) {
  const paymentStatus = String(purchase.payment_status ?? "").toUpperCase();
  const purchaseStatus = String(purchase.purchase_status ?? "").toLowerCase();

  return (
    paymentStatus === "SUCCESS" ||
    paymentStatus === "PARTIALLY_PAID" ||
    purchaseStatus === "confirmed"
  );
}

export function getPaidSessionIds(purchases: SessionPurchase[]) {
  return new Set(
    purchases
      .filter(isPaidPurchase)
      .map((purchase) => String(purchase.session_id ?? ""))
      .filter(Boolean),
  );
}
