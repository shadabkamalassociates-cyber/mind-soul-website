import type { Metadata } from "next";
import CommunityJoinExperience from "@/components/communityJoin/CommunityJoinExperience";

export const metadata: Metadata = {
  title: "Join Healing Community — Just ₹11 | Cosmic Guruji",
  description:
    "Join Cosmic Guruji Healing Community for just ₹11. Lifetime access, live healing sessions, and a supportive spiritual community.",
  openGraph: {
    title: "Healing Community — Just ₹11",
    description:
      "Heal. Connect. Grow Together. One-time payment of ₹11 for lifetime community access.",
  },
};

export default function Just99Page() {
  return <CommunityJoinExperience variant="page" source="just99_landing" />;
}
