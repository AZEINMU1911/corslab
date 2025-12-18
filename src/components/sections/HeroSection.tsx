"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

/**
 * HeroSection (secondary hero statement)
 * - Large typographic headline + short supporting paragraph
 * - Decorative "plus" icon in the corner (brand motif used elsewhere)
 *
 * Common edits:
 * - Copy: update the `<motion.h1>` and `<motion.p>` text
 * - Motion: tweak the `transition` props for intro timing
 */
export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center px-6 overflow-hidden">
      {/* Decorative corner icon. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-12 left-6 md:left-12 text-roxy-black"
      >
        <Plus size={24} strokeWidth={1.5} />
      </motion.div>

      {/* Centered headline + supporting paragraph. */}
      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold text-roxy-black leading-[1.1] tracking-tight"
        >
          Roxy CosLab{" "}
          <span className="font-light text-roxy-graphite mx-2">—</span> is{" "}
          <br />
          Your Trusted Partner.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 max-w-2xl mx-auto text-roxy-graphite text-lg md:text-xl font-light leading-relaxed"
        >
          We blend{" "}
          <span className="font-medium text-roxy-black">
            Clinical Precision
          </span>{" "}
          with{" "}
          <span className="font-medium text-roxy-black">Practical Luxury</span>.
          The premier OEM partner for skincare and bodycare brands.
          </motion.p>
      </div>
    </section>
  );
}
