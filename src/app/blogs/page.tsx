import type { Metadata } from "next";
import BlogsPage from "@/components/BlogsPage";

export const metadata: Metadata = {
  title: "Blog & Insights | SoulSensei",
  description:
    "Explore articles on wellness, spirituality, meditation, and personal growth from SoulSensei.",
};

export default function BlogsRoute() {
  return <BlogsPage />;
}
