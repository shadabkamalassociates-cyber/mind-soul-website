import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SoulSensei",
  description:
    "Empowering minds and enriching souls. Learn about SoulSensei's mission, offerings, and commitment to trusted wellbeing.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
