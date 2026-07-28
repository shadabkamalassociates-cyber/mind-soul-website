import type { Metadata } from "next";
import RecordedVideosPage from "@/components/RecordedVideosPage";

export const metadata: Metadata = {
  title: "Recorded Videos | SoulSensei",
  description:
    "Access premium recorded spiritual sessions — meditation, astrology, healing, and more with lifetime access.",
};

export default function RecordedVideosRoute() {
  return <RecordedVideosPage />;
}
