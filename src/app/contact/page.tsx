import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | SoulSensei",
  description:
    "Get in touch with SoulSensei for sessions, support, and spiritual guidance.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
