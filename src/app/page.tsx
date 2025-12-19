// --- Imports ---

import { fetchAPI } from "@/lib/api";
import MainHero from "@/components/sections/MainHeroSection";
import HeroSection from "@/components/sections/HeroSection";
import ProductBillboard from "@/components/sections/ProductBillboard";
import VisionMission from "@/components/sections/VisionMission";
import WaveSection from "@/components/sections/WaveSection";
import ShowcaseSection from "@/components/sections/ShowcaseSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import CertificationSection from "@/components/sections/CertificationSection";
import ContactSection from "@/components/sections/ContactSection";

// --- Data Fetching (Server Component) ---

// Why: `src/app/page.tsx` is a Server Component by default (no `"use client"`),
// so it can safely read server-only env vars (e.g. `STRAPI_API_TOKEN`) and fetch
// directly from Strapi without exposing secrets to the browser.

async function getHomePageData() {
  // 1. Build an explicit deep-populate query (Strapi v5 does not auto-populate nested components/media).
  // Why: `populate=*` is often only 1-level deep; nested objects can look "present" but contain `null` media.
  const query =
    "populate[HeroSection][populate][Main][populate]=*&" +
    "populate[HeroSection][populate][MaklonButton][populate]=*&" +
    "populate[AboutSection][populate]=*&" +
    "populate[ShowcaseSection][populate][Product][populate]=*&" +
    "populate[ProcessSection][populate]=*&" +
    "populate[FAQSection][populate]=*";

  // 2. Fetch the page document from Strapi (server-only token handled by `fetchAPI`).
  const res = await fetchAPI(`/api/homepage?${query}`);

  // 3. Debugging is safe here (Server Component logs go to the dev server terminal).
  console.log("🔍 FULL STRAPI RESPONSE:", JSON.stringify(res, null, 2));

  return res?.data;
}

// --- Main Component ---

export default async function Home() {
  // 1. Fetch CMS data before rendering so child components receive stable props.
  const strapiData = await getHomePageData();

  // 2. Quick "did we get anything?" sanity check.
  console.log("🔥 Strapi Data Received:", strapiData ? "Yes" : "No");

  return (
    <main className="min-h-screen flex flex-col w-full">
      {/* --- Hero (CMS) --- */}
      <MainHero data={strapiData?.HeroSection} />

      {/* --- About (Shared CMS Source) --- */}
      <HeroSection data={strapiData?.AboutSection} />
      <ProductBillboard data={strapiData?.AboutSection} />
      <VisionMission data={strapiData?.AboutSection} />

      {/* --- Transitional Visual (Static) --- */}
      <WaveSection />

      {/* --- Showcase (CMS) --- */}
      <ShowcaseSection data={strapiData?.ShowcaseSection} />

      {/* --- Process (CMS) --- */}
      <ProcessSection data={strapiData?.ProcessSection} />

      {/* --- FAQ (CMS) --- */}
      <FAQSection data={strapiData?.FAQSection} />

      {/* --- Trust + Contact (Static/Client) --- */}
      <CertificationSection />
      <ContactSection />
    </main>
  );
}
