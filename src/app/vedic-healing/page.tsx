import type { Metadata } from "next";
import VedicHealingPage from "@/components/vedicHealing/VedicHealingPage";

export const metadata: Metadata = {
  title: {
    absolute: "Vedic Healing | Reconnect With Your Inner Balance",
  },
  description:
    "Explore personalized Vedic Healing practices including meditation, energy healing, chakra balancing, mantra, breathwork and spiritual wellness guidance.",
  openGraph: {
    title: "Vedic Healing | Reconnect With Your Inner Balance",
    description:
      "Explore personalized Vedic Healing practices including meditation, energy healing, chakra balancing, mantra, breathwork and spiritual wellness guidance.",
  },
};

export default function VedicHealingRoute() {
  return <VedicHealingPage />;
}
