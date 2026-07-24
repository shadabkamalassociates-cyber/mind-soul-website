"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store";
import { hydrateAuth } from "@/store/slices/authSlice";

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
    storeRef.current?.dispatch(hydrateAuth());
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
