import type { Metadata } from "next";
import Profile from "@/components/Profile";

export const metadata: Metadata = {
  title: "My Profile | Cosmicguruji",
  description: "View and manage your Cosmicguruji account profile.",
};

export default function ProfileRoute() {
  return <Profile />;
}
