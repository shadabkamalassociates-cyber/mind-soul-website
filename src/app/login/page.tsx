"use client";

import { Suspense } from "react";
import LoginPage from "@/components/LoginPage";
import Profile from "@/components/Profile";
import { useAppSelector } from "@/store/hooks";

export default function LoginRoute() {
  const { user, hydrated } = useAppSelector((s) => s.auth);

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#E8E9F0] text-[#8A8AA8]">
        Loading...
      </main>
    );
  }

  if (user) {
    return <Profile />;
  }

  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#E8E9F0] text-[#8A8AA8]">
          Loading...
        </main>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
