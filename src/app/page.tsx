import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full">
      <HeroSection />
      <StatsSection />
    </main>
  );
}
