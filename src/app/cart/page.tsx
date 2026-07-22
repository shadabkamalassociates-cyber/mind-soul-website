import type { Metadata } from "next";
import CartPageClient from "@/components/CartPageClient";

export const metadata: Metadata = {
  title: "Your Cart | SoulSensei",
  description: "Review your session details and proceed to secure checkout.",
};

type Props = { searchParams: Promise<{ session?: string }> };

export default async function CartRoute({ searchParams }: Props) {
  const { session } = await searchParams;
  return <CartPageClient sessionSlug={session} />;
}
