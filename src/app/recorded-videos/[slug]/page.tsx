import type { Metadata } from "next";
import RecordedVideoDetailClient from "@/components/RecordedVideoDetailClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Recorded Video | Cosmicguruji",
  description: "Watch premium recorded spiritual sessions on Cosmicguruji.",
};

export default async function RecordedVideoDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  return <RecordedVideoDetailClient slug={slug} />;
}
