"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/media";
import type { MainHeroData } from "@/types";

export default function MainHero({ data }: { data?: MainHeroData }) {
  // 1. FIX: Dig into 'data.Main' to find the images
  const bgUrl =
    getStrapiMedia(data?.Main?.BackgroundImage?.url ?? null) || "/assets/1.jpg";
  const logoUrl =
    getStrapiMedia(data?.Main?.Logo?.url ?? null) || "/CoslabWhite.png";

  // 2. Text is also inside 'Main'
  const headline =
    data?.Main?.Headline || "Build Your Beauty Brand with a Trusted Lab";
  const subhead =
    data?.Main?.Subheading ||
    "Roxy CosLab - Trusted OEM for Skincare & Bodycare.";
  const btnText = data?.MaklonButton?.Title || "Start Maklon Now";

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gray-900">
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/*
          `unoptimized` is a friendly localhost fix.
          It tells Next.js Image: "Don't proxy/resize this on the Next server — just let the browser fetch the URL directly."
          This avoids common dev-time issues when Strapi media + Next image optimization disagree about `localhost` (IPv4 vs IPv6).
        */}
        <Image
          src={bgUrl}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          unoptimized={true} // Fix: Bypasses Next.js server optimization to prevent localhost networking errors.
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto space-y-8">
        {/* Logo */}
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
            unoptimized={true} // Fix: Bypasses Next.js server optimization to prevent localhost networking errors.
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-tight drop-shadow-lg"
        >
          {headline}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-white/90 font-light tracking-wide drop-shadow-md"
        >
          {subhead}
        </motion.p>

        {/* Button */}
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
