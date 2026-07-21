import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Experts | SoulSensei",
  description:
    "Meet SoulSensei's verified spiritual guides, meditation coaches, and energy healers dedicated to your transformation.",
};

export default function ExpertsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
