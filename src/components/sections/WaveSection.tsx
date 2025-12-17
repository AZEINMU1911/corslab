"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function WaveSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 1. CONTAINER SCALE: Expands to full width early (by 30%)
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  // 2. LOGO SEQUENCE:
  // Visible at start, fades OUT completely between 30% and 40%
  const logoOpacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);

  // 3. TEXT SEQUENCE ("Movie Credits" Style):
  // Starts invisible/low. Rises UP from the bottom.
  // Starts moving at 45% (after logo is gone), lands at 70%.
  // Stays locked in place from 70% to 100% so you can read it.

  // Opacity: Quick fade in so it doesn't "pop"
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  // Vertical Movement: Starts 150px down, slides UP to 0px
  const textY = useTransform(scrollYProgress, [0.4, 0.7], [150, 0]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-roxy-white">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, borderRadius }}
          className="relative w-full h-full max-h-screen bg-roxy-black overflow-hidden shadow-2xl"
        >
          {/* VIDEO BACKGROUND */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            src="/assets/wave.mp4"
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-60" />

          {/* CONTENT CONTAINER */}
          {/* Aligned to the LEFT (items-start) */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 z-10">
            {/* A. LOGO (Centered Absolutely) */}
            {/* Kept separate so it doesn't mess up the text alignment */}
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

            {/* B. TEXT (Left Aligned & Sliding Up) */}
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
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
