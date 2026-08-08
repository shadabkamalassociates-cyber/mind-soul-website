import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Experts | Cosmicguruji",
  description:
    "Meet Cosmicguruji's verified spiritual guides, meditation coaches, and energy healers dedicated to your transformation.",
};

export default function ExpertsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
