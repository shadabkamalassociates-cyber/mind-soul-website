import type { Metadata } from "next";
import LoginPage from "@/components/LoginPage";

export const metadata: Metadata = {
  title: "Login | SoulSensei",
  description:
    "Login with your phone number, verify OTP, and continue your cosmic journey with SoulSensei.",
};

export default function LoginRoute() {
  return <LoginPage />;
}
