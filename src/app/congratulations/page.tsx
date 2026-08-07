import type { Metadata } from "next";
import CongratulationsDialog from "@/components/CongratulationsDialog";

export const metadata: Metadata = {
  title: "Congratulations | Cosmic Guruji",
  description: "We've received your payment successfully. Your spiritual journey begins now.",
};

export default function CongratulationsPage() {
  return (
    <main className="congrats-page">
      <div className="congrats-page-bg" aria-hidden />
      <CongratulationsDialog />
    </main>
  );
}
