"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * MainHeroSection (above-the-fold hero)
 * - Full-viewport background image with dark overlay for legibility
 * - Centered logo, headline, supporting copy, and a primary CTA button
 *
 * Common edits:
 * - Background image: update `src="/assets/1.jpg"`
 * - Headline/subcopy/CTA label: update the text nodes below
 * - Animation: tweak the `motion.*` initial/animate/transition props
 */
export default function MainHero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background layer: image + subtle dark overlay. */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/1.jpg"
          alt="Cosmetic Lab Setup"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Foreground layer: stacked logo → headline → subcopy → CTA. */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-24 h-24 md:w-32 md:h-32 mb-4"
        >
          <Image
            src="/CoslabWhite.png"
            alt="Roxy Coslab Logo"
            fill
            className="object-contain mix-blend-screen"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-tight drop-shadow-lg"
        >
          Build Your Beauty Brand <br />
          with a <span className="text-white">Trusted Lab</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-white/90 font-light tracking-wide drop-shadow-md"
        >
          Roxy CosLab - Trusted OEM for Skincare & Bodycare.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 px-8 py-3 bg-[#E8DCCF] text-[#1E1E1E] font-semibold text-sm uppercase tracking-widest rounded-sm hover:bg-white transition-colors shadow-lg"
        >
          Start Maklon Now
        </motion.button>
      </div>
    </section>
  );
}
