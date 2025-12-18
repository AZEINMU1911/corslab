"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

/**
 * WaveSection
 * - Creates a long scroll region (`h-[250vh]`) with a sticky full-viewport stage.
 * - Uses `scrollYProgress` to choreograph a simple sequence:
 *   1) Zoom/round → full-bleed video container
 *   2) Fade logo out
 *   3) Slide/fade headline in
 *
 * Common edits:
 * - Video: update `src="/assets/wave.mp4"`
 * - Copy: update the `<h2>` headline text
 * - Timing: tweak the `useTransform` ranges below
 */
export default function WaveSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress is scoped to this section's container.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Container "intro" — scale up and remove rounded corners as the section enters.
  const containerScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const containerRadius = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  // Logo → headline transition — logo fades out, headline fades/slides in.
  const logoOpacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.4, 0.7], [150, 0]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-roxy-white">
      {/* Sticky stage that stays fixed while the scroll progress animates the content. */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: containerScale, borderRadius: containerRadius }}
          className="relative w-full h-full max-h-screen bg-roxy-black overflow-hidden shadow-2xl"
        >
          {/* Background layer: looping video + vignette-style radial overlay. */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            src="/assets/wave.mp4"
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-60" />

          {/* Foreground layer: centered logo (early) then headline (later). */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 z-10">
            {/* Logo phase */}
            <motion.div
              style={{ opacity: logoOpacity }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-32 h-32 md:w-48 md:h-48">
                <Image
                  src="/CoslabWhite.png"
                  alt="Roxy Coslab Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Headline phase */}
            <motion.div
              style={{ opacity: headlineOpacity, y: headlineY }}
              className="max-w-6xl text-left"
            >
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-medium text-white leading-[1.05] tracking-tight">
                Manufacturing excellence where global standards meet your unique
                brand vision.
              </h2>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
