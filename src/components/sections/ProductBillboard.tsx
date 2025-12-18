"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

/**
 * ProductBillboard
 * - Full-width image billboard with subtle vertical parallax on scroll.
 * - Decorative corner "plus" marks are inline SVGs (no icon dependency).
 *
 * Common edits:
 * - Billboard image: update `src="/assets/4.jpg"`
 * - Parallax strength: tweak the `imageY` range below
 */
export default function ProductBillboard() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Moves the image slower than the page scroll to create depth.
  const imageY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[80vh] overflow-hidden bg-roxy-white"
    >
      {/* Parallax image layer. */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src="/assets/4.jpg"
          alt="Cosmetic Billboard"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      <div className="absolute top-12 left-12 text-white/80">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <div className="absolute bottom-12 right-12 text-white/80">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
    </section>
  );
}
