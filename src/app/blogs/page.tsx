import type { Metadata } from "next";
import BlogsPage from "@/components/BlogsPage";

export const metadata: Metadata = {
  title: "Blog & Insights | Cosmicguruji",
  description:
    "Explore articles on wellness, spirituality, meditation, and personal growth from Cosmicguruji.",
};

export default function BlogsRoute() {
  return <BlogsPage />;
}
