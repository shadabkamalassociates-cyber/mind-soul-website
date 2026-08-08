"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store";
import { hydrateAuth, checkAuth } from "@/store/slices/authSlice";

export default function ReduxProvider({
  children,
}: {
  children: ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;
    store.dispatch(hydrateAuth());
    store.dispatch(checkAuth());
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
