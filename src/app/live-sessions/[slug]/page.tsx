import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SessionDetailPage from "@/components/SessionDetailPage";
import { getLiveSession, getLiveSessionSlugs } from "@/data/liveSessions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLiveSessionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const session = getLiveSession(slug);
  if (!session) return { title: "Session | SoulSensei" };
  return {
    title: `${session.title} | SoulSensei`,
    description: session.subtitle,
  };
}

export default async function LiveSessionDetailRoute({ params }: Props) {
  const { slug } = await params;
  const session = getLiveSession(slug);
  if (!session) notFound();
  return <SessionDetailPage session={session} />;
}
