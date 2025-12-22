"use client";

// --- Imports ---

import { motion } from "framer-motion";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/media";
import type { MainHeroData } from "@/types";

// --- Main Component ---

export default function MainHero({ data }: { data?: MainHeroData }) {
  // 1. Extract media URLs from the nested `Main` component.
  // Why: Strapi groups hero fields under `HeroSection.Main`, so we "open the door" (`Main`) first.
  const bgUrl =
    getStrapiMedia(data?.Main?.BackgroundImage?.url ?? null) || "/assets/1.jpg";
  const logoUrl =
    getStrapiMedia(data?.Main?.Logo?.url ?? null) || "/CoslabWhite.png";

  // 2. Extract copy (with fallbacks to prevent a blank/white-screen hero).
  const headline =
    data?.Main?.Headline || "Build Your Beauty Brand with a Trusted Lab";
  const subhead =
    data?.Main?.Subheading ||
    "Roxy CosLab - Trusted OEM for Skincare & Bodycare.";
  const btnText = data?.MaklonButton?.Title || "Start Maklon Now";

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gray-900">
      {/* --- Background Layer --- */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Why: `unoptimized` avoids dev-time failures when Strapi runs on localhost/127.0.0.1 and Next Image optimization cannot reach it reliably. */}
        <Image
          src={bgUrl}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* --- Content Layer --- */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto space-y-8">
        {/* --- Logo --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-24 h-24 md:w-32 md:h-32 mb-4"
        >
          <Image
            src={logoUrl}
            alt="Logo"
            fill
            className="object-contain mix-blend-screen"
            unoptimized={true}
          />
        </motion.div>

        {/* --- Headline --- */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-tight drop-shadow-lg"
        >
          {headline}
        </motion.h1>

        {/* --- Subheading --- */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-white/90 font-light tracking-wide drop-shadow-md"
        >
          {subhead}
        </motion.p>

        {/* --- Primary CTA --- */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 px-8 py-3 bg-[#E8DCCF] text-[#1E1E1E] font-semibold text-sm uppercase tracking-widest rounded-sm hover:bg-white transition-colors shadow-lg"
        >
          {btnText}
        </motion.button>
      </div>
    </section>
  );
}
