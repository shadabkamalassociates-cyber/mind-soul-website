import Header from "@/components/Header";
import HeroBannerCarousel from "@/components/HeroBannerCarousel";
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
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <div className="relative w-full bg-[#ffffff]">
        <Header />

        <HeroBannerCarousel />
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
