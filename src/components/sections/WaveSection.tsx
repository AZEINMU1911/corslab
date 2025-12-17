"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function WaveSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Track Scroll Progress relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 2. Map scroll to animations
  // Scale: Grows from 90% size to 100% full width
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);
  // Radius: Sharpens from rounded corners to flat edges
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], [24, 0]);

  // Logo Opacity: Fades OUT quickly as you scroll in
  const logoOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);
  const logoY = useTransform(scrollYProgress, [0.2, 0.5], [0, -50]); // Moves up slightly while fading

  // Text Opacity: Fades IN after the logo is gone
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.7], [100, 0]); // Moves up from bottom

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-roxy-white">
      {/* Sticky wrapper to keep video in view while we perform the animation */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* The Expandable Video Container */}
        <motion.div
          style={{ scale, borderRadius }}
          className="relative w-full h-full max-h-screen bg-roxy-black overflow-hidden shadow-2xl"
        >
          {/* PLACEHOLDER VIDEO BACKGROUND */}
          {/* Once you have your .mp4, replace this div with: 
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" src="/your-video.mp4" /> 
          */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-roxy-graphite)_0%,_#000000_100%)] opacity-80" />

          {/* Optional: Animated Gradient to simulate 'water' movement if no video yet */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />

          {/* CENTER CONTENT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            {/* A. The Logo (Fades Out) */}
            <motion.div
              style={{ opacity: logoOpacity, y: logoY }}
              className="absolute"
            >
              {/* This is the 'R' Icon placeholder */}
              <svg
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1"
                className="opacity-90"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
              <p className="mt-4 text-white font-mono tracking-[0.3em] text-sm">
                COSLAB
              </p>
            </motion.div>

            {/* B. The Text (Rises Up) */}
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="max-w-5xl"
            >
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-medium text-white leading-[1.1] tracking-tight">
                Manufacturing excellence <br />
                <span className="text-roxy-graphite italic font-light">
                  where global standards
                </span>{" "}
                <br />
                meet your unique brand vision.
              </h2>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
