import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import WaveSection from "@/components/sections/WaveSection";
import ShowcaseSection from "@/components/sections/ShowcaseSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full">
      <HeroSection />
      <StatsSection />
      <WaveSection />
      <ShowcaseSection />
    </main>
  );
}
