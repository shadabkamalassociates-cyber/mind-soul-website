import type { Metadata } from "next";
import ExpertsPageClient from "@/components/ExpertsPageClient";

export const metadata: Metadata = {
  title: "Experts | Cosmicguruji",
  description:
    "Meet verified Cosmicguruji experts for guidance, healing, and transformation.",
};

export default function ExpertsPage() {
  return <ExpertsPageClient />;
}
