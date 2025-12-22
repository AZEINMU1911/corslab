"use client";

// --- Imports ---

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// --- Main Component ---

export default function WaveSection() {
  // 1. Create a long scroll region with a sticky stage.
  // Why: It lets us choreograph a simple narrative while the user scrolls.
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Scope scroll progress to this section so animation timing stays local.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3. Container intro: scale up and remove rounded corners as the section enters.
  const containerScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const containerRadius = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  // 4. Transition: logo fades out, headline fades/slides in.
  const logoOpacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.4, 0.7], [150, 0]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-roxy-white">
      {/* --- Sticky Stage --- */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: containerScale, borderRadius: containerRadius }}
          className="relative w-full h-full max-h-screen bg-roxy-black overflow-hidden shadow-2xl"
        >
          {/* --- Background Layer (Video + Vignette) --- */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            src="/assets/wave.mp4"
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-60" />

          {/* --- Foreground Layer (Logo → Headline) --- */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 z-10">
            {/* --- Logo Phase --- */}
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

            {/* --- Headline Phase --- */}
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
