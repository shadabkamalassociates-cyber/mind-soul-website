import type { Metadata } from "next";
import { Suspense } from "react";
import LiveSessionsPage from "@/components/LiveSessionsPage";

export const metadata: Metadata = {
  title: "Sessions | SoulSensei",
  description:
    "Browse live interactive sessions and premium recorded videos with verified SoulSensei experts.",
};

function SessionsFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white text-[#8A8AA8]">
      Loading sessions...
    </main>
  );
}

export default function LiveSessionsRoute() {
  return (
    <Suspense fallback={<SessionsFallback />}>
      <LiveSessionsPage />
    </Suspense>
  );
}
