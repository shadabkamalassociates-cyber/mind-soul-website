"use client";

import { useMemo } from "react";
import { notFound } from "next/navigation";
import ExpertProfileDetail from "@/components/ExpertProfileDetail";
import { getExpertBySlug } from "@/data/experts";

export default function ExpertProfileClient({ slug }: { slug: string }) {
  const staticExpert = useMemo(() => getExpertBySlug(slug), [slug]);

  if (staticExpert) {
    return <ExpertProfileDetail expert={staticExpert} />;
  }

  const looksLikeApiId =
    /^[0-9a-f-]{36}$/i.test(slug) || /^\d+$/.test(slug) || slug.length > 8;

  if (!looksLikeApiId) {
    notFound();
  }

  return <ExpertProfileDetail expertId={slug} />;
}
