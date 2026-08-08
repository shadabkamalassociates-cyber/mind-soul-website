import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Cosmicguruji",
  description:
    "Empowering minds and enriching souls. Learn about Cosmicguruji's mission, offerings, and commitment to trusted wellbeing.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
