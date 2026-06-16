import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/home/hero";
import StatsBar from "@/components/home/stats-bar";
import FeatureCards from "@/components/home/feature-cards";
import OpportunitySpotlight from "@/components/home/opportunity-spotlight";
import CTASection from "@/components/home/cta-section";
import TrustBar from "@/components/home/trust-bar";

export default function HomePage() {
  return (
    <div className="bg-[#FAFAF8]">
      <Navbar />
      <Hero />
      <StatsBar />
      <FeatureCards />
      <OpportunitySpotlight />
      <CTASection />
      <TrustBar />
      <Footer />
    </div>
  );
}
