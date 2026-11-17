import type { Metadata } from "next";
import ThirdEyeCoursePage from "@/components/thirdEyeCourse/ThirdEyeCoursePage";

export const metadata: Metadata = {
  title: "Third Eye Awakening Course",
  description:
    "A guided Third Eye (Ajna) awakening course with meditation, energy practices and lifetime access. One-time enrollment for ₹3,000.",
  openGraph: {
    title: "Third Eye Awakening Course | Cosmicguruji",
    description:
      "Activate inner vision, expand awareness and deepen spiritual growth with Cosmic Guruji’s Third Eye Awakening Course.",
    images: [{ url: "/courses/third-eye/hero.jpg" }],
  },
};

export default function ThirdEyeAwakeningRoute() {
  return <ThirdEyeCoursePage />;
}
