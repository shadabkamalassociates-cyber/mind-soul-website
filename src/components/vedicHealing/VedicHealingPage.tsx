import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HealingApproaches from "@/components/vedicHealing/HealingApproaches";
import HealingExperts from "@/components/vedicHealing/HealingExperts";
import HealingJourney from "@/components/vedicHealing/HealingJourney";
import PersonalizedHealing from "@/components/vedicHealing/PersonalizedHealing";
import VedicHealingCTA from "@/components/vedicHealing/VedicHealingCTA";
import VedicHealingFAQ from "@/components/vedicHealing/VedicHealingFAQ";
import VedicHealingHero from "@/components/vedicHealing/VedicHealingHero";
import VedicHealingIntro from "@/components/vedicHealing/VedicHealingIntro";
import VedicHealingTestimonials from "@/components/vedicHealing/VedicHealingTestimonials";
import WhatIsVedicHealing from "@/components/vedicHealing/WhatIsVedicHealing";
import WhyVedicHealing from "@/components/vedicHealing/WhyVedicHealing";

export default function VedicHealingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FBF9F6] text-[#1A1A4A]">
      <Header />
      <VedicHealingHero />
      <VedicHealingIntro />
      <WhatIsVedicHealing />
      <HealingApproaches />
      <HealingJourney />
      <WhyVedicHealing />
      <HealingExperts />
      <PersonalizedHealing />
      <VedicHealingTestimonials />
      <VedicHealingFAQ />
      <VedicHealingCTA />
      <Footer />
    </main>
  );
}
