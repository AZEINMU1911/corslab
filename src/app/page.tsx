import MainHero from "@/components/sections/MainHeroSection";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import ProductBillboard from "@/components/sections/ProductBillboard";
import VisionMission from "@/components/sections/VisionMission";
import WaveSection from "@/components/sections/WaveSection";
import ShowcaseSection from "@/components/sections/ShowcaseSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import CertificationSection from "@/components/sections/CertificationSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full">
      <MainHero />
      <HeroSection />
      <StatsSection />
      <ProductBillboard />
      <VisionMission />
      <WaveSection />
      <ShowcaseSection />
      <ProcessSection />
      <FAQSection />
      <CertificationSection />
    </main>
  );
}
