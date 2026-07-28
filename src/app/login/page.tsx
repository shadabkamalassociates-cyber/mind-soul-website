import type { Metadata } from "next";
import { Suspense } from "react";
import LoginPage from "@/components/LoginPage";

export const metadata: Metadata = {
  title: "Login | SoulSensei",
  description:
    "Login with your phone number, verify OTP, and continue your cosmic journey with SoulSensei.",
};

export default function LoginRoute() {
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
