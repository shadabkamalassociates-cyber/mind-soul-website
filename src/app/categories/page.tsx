import type { Metadata } from "next";
import CategoriesPageClient from "@/components/CategoriesPageClient";

export const metadata: Metadata = {
  title: "Categories | Cosmicguruji",
  description:
    "Browse Cosmicguruji session categories and find guidance that fits your journey.",
};

export default function CategoriesIndexPage() {
  return <CategoriesPageClient />;
}
