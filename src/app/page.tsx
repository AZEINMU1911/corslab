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

/**
 * `src/app/page.tsx` is a Server Component by default (notice there is no
 * `"use client"` at the top of this file).
 *
 * Why this matters:
 * - Server Components run on the Node.js server, not in the browser.
 * - That means we can safely read server-only environment variables
 *   (like `STRAPI_API_TOKEN` inside `fetchAPI`) without exposing secrets.
 * - Data fetching can happen "close to the source" (Strapi) before the page is
 *   rendered, which keeps the client bundle smaller.
 *
 * Pattern used here:
 * - Define a small async function (`getHomePageData`) that knows how to fetch
 *   this page's CMS data.
 * - Make the page component itself `async` so it can `await` that data and pass
 *   the results down as props to client components that need it.
 */

/**
 * Fetch the CMS data needed to render the homepage.
 *
 * Deep-populate (Strapi v5):
 * - Strapi will not automatically include nested components, relations, or media.
 * - `populate=*` is often only 1-level deep; nested components can still come back
 *   "closed" (present, but missing their internal fields).
 * - We use explicit deep-populate paths to "open the doors" we need, e.g.:
 *   `populate[HeroSection][populate][Main][populate]=*`
 *   This is required because hero media lives under `HeroSection.Main`.
 */
async function getHomePageData() {
  const query =
    "populate[HeroSection][populate][Main][populate]=*&" +
    "populate[HeroSection][populate][MaklonButton][populate]=*&" +
    "populate[AboutSection][populate]=*&" +
    "populate[ShowcaseSection][populate][Product][populate]=*&" +
    "populate[ProcessSection][populate]=*&" +
    "populate[FAQSection][populate]=*";

  const res = await fetchAPI(`/api/homepage?${query}`);

  // Server Component logs appear in the terminal running `npm run dev`.
  console.log("🔍 FULL STRAPI RESPONSE:", JSON.stringify(res, null, 2));

  return res?.data;
}

// 2. Make the component async
export default async function Home() {
  // 3. Fetch the data
  const strapiData = await getHomePageData();

  // Debug
  console.log("🔥 Strapi Data Received:", strapiData ? "Yes" : "No");

  return (
    <main className="min-h-screen flex flex-col w-full">
      <MainHero data={strapiData?.HeroSection} />
      {/* Shared CMS source */}
      <HeroSection data={strapiData?.AboutSection} />
      <ProductBillboard data={strapiData?.AboutSection} />
      <VisionMission data={strapiData?.AboutSection} />
      {/* Shared CMS source */}
      <WaveSection />
      <ShowcaseSection data={strapiData?.ShowcaseSection} />
      <ProcessSection data={strapiData?.ProcessSection} />
      <FAQSection data={strapiData?.FAQSection} />
      <CertificationSection />
      <ContactSection />
    </main>
  );
}
