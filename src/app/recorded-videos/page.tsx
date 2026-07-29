import { redirect } from "next/navigation";

export default function RecordedVideosRoute() {
  redirect("/live-sessions#recorded-sessions");
}
