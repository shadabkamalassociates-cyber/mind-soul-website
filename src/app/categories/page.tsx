import type { Metadata } from "next";
import CategoriesPageClient from "@/components/CategoriesPageClient";

export const metadata: Metadata = {
  title: "Categories | SoulSensei",
  description:
    "Browse SoulSensei session categories and find guidance that fits your journey.",
};

export default function CategoriesIndexPage() {
  return <CategoriesPageClient />;
}
