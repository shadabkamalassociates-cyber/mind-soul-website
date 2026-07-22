import type { Metadata } from "next";
import LiveSessionsPage from "@/components/LiveSessionsPage";

export const metadata: Metadata = {
  title: "Live Sessions | SoulSensei",
  description:
    "Join live interactive sessions with verified SoulSensei experts for real-time guidance and transformation.",
};

export default function LiveSessionsRoute() {
  return <LiveSessionsPage />;
}
