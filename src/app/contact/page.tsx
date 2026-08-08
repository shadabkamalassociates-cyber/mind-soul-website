import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Cosmicguruji",
  description:
    "Get in touch with Cosmicguruji for sessions, support, and spiritual guidance.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
