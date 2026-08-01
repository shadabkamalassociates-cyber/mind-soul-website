import Link from "next/link";
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";
import FeaturedLiveSessions from "@/components/FeaturedLiveSessions";
import SoulExperts from "@/components/SoulExperts";
import WhySoulSensei from "@/components/WhySoulSensei";
import TransformationPrograms from "@/components/TransformationPrograms";
import UpcomingRetreats from "@/components/UpcomingRetreats";
import BlogInsights from "@/components/BlogInsights";
import CommunityReviews from "@/components/CommunityReviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white">
      <div className="relative bg-[#ECE4F8] text-[#1A1A4A]">
        <Header />

        <section className="relative w-full overflow-hidden bg-[#ECE4F8]">
          <Link
            href="/live-sessions"
            className="block w-full"
            aria-label="Join Cosmic Guruji healing sessions"
          >
            <img
              src="/CosmicGurujibanner.png"
              alt="Cosmic Guruji — Healing Spirituality. Heal your mind. Awaken your soul."
              width={1983}
              height={793}
              decoding="async"
              fetchPriority="high"
              className="hero-banner-image block h-auto w-full"
            />
          </Link>
        </section>
      </div>

      <div className="bg-white">
        <CategoryBar />
      </div>

      <FeaturedLiveSessions />
      {/* <SoulExperts /> */}
      <WhySoulSensei />
      <TransformationPrograms />
      <UpcomingRetreats />
      <BlogInsights />
      <CommunityReviews />
      <FAQ />
      <Footer />
    </main>
  );
}
