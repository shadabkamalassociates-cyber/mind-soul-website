"use client";

import { useEffect, useState } from "react";
import { fetchMyPurchases } from "@/services/paymentService";
import { getPaidSessionIds } from "@/lib/sessionPurchase";

export function usePurchasedSessionIds() {
  const [purchasedSessionIds, setPurchasedSessionIds] = useState<Set<string>>(
    new Set(),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const purchases = await fetchMyPurchases();
        if (!cancelled) {
          setPurchasedSessionIds(getPaidSessionIds(purchases));
        }
      } catch {
        if (!cancelled) setPurchasedSessionIds(new Set());
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { purchasedSessionIds, loadingPurchases: loading };
}
